import pytest

from analyzer import Analyzer, InvalidUrlError, NonHtmlResponseError, TimeoutError


class DummyResponse:
    def __init__(self, text, status_code=200, headers=None):
        self.text = text
        self.status_code = status_code
        self.headers = headers or {'content-type': 'text/html; charset=utf-8'}


def test_normalize_url_adds_https(monkeypatch):
    analyzer = Analyzer(timeout=1)
    normalized = analyzer._normalize_url('example.com')
    assert normalized.startswith('https://')


def test_invalid_url_raises(monkeypatch):
    analyzer = Analyzer(timeout=1)
    with pytest.raises(InvalidUrlError):
        analyzer._normalize_url('not a url')


def test_count_missing_alt_images():
    analyzer = Analyzer(timeout=1)
    from bs4 import BeautifulSoup

    soup = BeautifulSoup('<html><body><img src="a.png"><img src="b.png" alt=""></body></html>', 'html.parser')
    assert analyzer._count_missing_alt_images(soup) == 2


def test_count_visible_words_ignores_script_and_style():
    analyzer = Analyzer(timeout=1)
    from bs4 import BeautifulSoup

    soup = BeautifulSoup('<html><body>Hello <script>ignored</script>world<style>ignore</style></body></html>', 'html.parser')
    assert analyzer._count_visible_words(soup) == 2
