import re
from urllib.parse import urlparse


def normalize_url(raw_url):
    """Validate a URL and prepend https:// when the scheme is missing."""
    if not raw_url or not isinstance(raw_url, str):
        raise ValueError('A valid URL is required.')

    value = raw_url.strip()
    if not value:
        raise ValueError('A valid URL is required.')

    if '://' not in value:
        value = f'https://{value}'

    parsed = urlparse(value)
    if parsed.scheme not in {'http', 'https'}:
        raise ValueError('Only http and https URLs are supported.')

    if not parsed.netloc:
        raise ValueError('Malformed URL. Please provide a valid URL.')

    hostname = parsed.hostname or ''
    if not hostname or not is_valid_hostname(hostname):
        raise ValueError('Malformed URL. Please provide a valid URL.')

    return value


def is_html_content_type(content_type):
    if not content_type:
        return False

    return 'text/html' in content_type.lower() or 'application/xhtml+xml' in content_type.lower()


def is_valid_hostname(hostname):
    if not hostname:
        return False

    if hostname.startswith('.') or hostname.endswith('.'):
        return False

    if hostname.lower() in {'localhost'}:
        return True

    pattern = re.compile(r'^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$')
    return bool(pattern.match(hostname))
