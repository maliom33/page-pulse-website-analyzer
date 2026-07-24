import re
import time
from typing import Dict, Any

import requests
from bs4 import BeautifulSoup

from validators import is_html_content_type, normalize_url


class AnalyzerError(Exception):
    """Base exception for analyzer failures."""


class InvalidUrlError(AnalyzerError):
    """Raised when the URL is invalid."""


class TimeoutError(AnalyzerError):
    """Raised when the request exceeds the allowed time."""


class NetworkError(AnalyzerError):
    """Raised on DNS or connection errors."""


class NonHtmlResponseError(AnalyzerError):
    """Raised when the server returns a non-HTML response."""


class Analyzer:
    def __init__(self, timeout=10):
        self.timeout = timeout

    def analyze(self, url: str) -> Dict[str, Any]:
        normalized_url = self._normalize_url(url)
        start_time = time.perf_counter()

        try:
            response = requests.get(
                normalized_url,
                timeout=self.timeout,
                headers={
                    'User-Agent': (
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                        'AppleWebKit/537.36 (KHTML, like Gecko) '
                        'Chrome/125.0 Safari/537.36'
                    )
                },
            )
        except requests.exceptions.Timeout as exc:
            raise TimeoutError('The request timed out.') from exc
        except requests.exceptions.ConnectionError as exc:
            raise NetworkError('DNS or connection error.') from exc
        except requests.exceptions.RequestException as exc:
            raise NetworkError('Network error while fetching the page.') from exc

        elapsed_ms = round((time.perf_counter() - start_time) * 1000)

        if not is_html_content_type(response.headers.get('content-type')):
            raise NonHtmlResponseError('The target URL did not return HTML content.')

        soup = self._build_soup(response.text)

        title = self._extract_title(soup)
        meta_description = self._extract_meta_description(soup)
        h1_count = len(soup.find_all('h1'))
        missing_alt_images = self._count_missing_alt_images(soup)
        word_count = self._count_visible_words(soup)

        return {
            'status': response.status_code,
            'response_time': f'{elapsed_ms} ms',
            'title': title,
            'meta_description': meta_description,
            'h1_count': h1_count,
            'missing_alt_images': missing_alt_images,
            'word_count': word_count,
        }

    def _normalize_url(self, url: str) -> str:
        try:
            return normalize_url(url)
        except ValueError as exc:
            raise InvalidUrlError(str(exc)) from exc

    def _build_soup(self, html_text):
        """Build a BeautifulSoup document using lxml when available and fall back gracefully."""
        try:
            return BeautifulSoup(html_text, 'lxml')
        except Exception:
            return BeautifulSoup(html_text, 'html.parser')

    def _extract_title(self, soup) -> str:
        title_tag = soup.title
        if title_tag and title_tag.get_text(strip=True):
            return title_tag.get_text(strip=True)
        return ''

    def _extract_meta_description(self, soup) -> str:
        meta_tag = soup.find('meta', attrs={'name': re.compile(r' description', re.I)})
        if meta_tag and meta_tag.get('content'):
            return meta_tag.get('content').strip()
        return ''

    def _count_missing_alt_images(self, soup) -> int:
        images = soup.find_all('img')
        missing_alt = 0
        for image in images:
            alt = image.get('alt')
            if alt is None or not str(alt).strip():
                missing_alt += 1
        return missing_alt

    def _count_visible_words(self, soup) -> int:
        for tag in soup(['script', 'style', 'noscript']):
            tag.decompose()

        text = soup.get_text(' ', strip=True)
        words = re.findall(r'\b\w+\b', text)
        return len(words)
