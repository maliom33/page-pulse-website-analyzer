import pytest

from app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config.update(TESTING=True)
    with app.test_client() as client:
        yield client


def test_analyze_requires_url(client):
    response = client.post('/api/analyze', json={})
    assert response.status_code == 400
    payload = response.get_json()
    assert payload['success'] is False


def test_analyze_rejects_invalid_url(client):
    response = client.post('/api/analyze', json={'url': 'not a url'})
    assert response.status_code == 400
    payload = response.get_json()
    assert payload['success'] is False
