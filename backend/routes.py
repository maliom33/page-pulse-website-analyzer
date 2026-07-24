from flask import Blueprint, jsonify, request

from analyzer import Analyzer, AnalyzerError, InvalidUrlError, NetworkError, NonHtmlResponseError, TimeoutError

bp = Blueprint('main', __name__)


@bp.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        payload = request.get_json(silent=True) or {}
        url = payload.get('url', '')

        if not url or not isinstance(url, str):
            return jsonify({'success': False, 'message': 'A valid URL is required.'}), 400

        analyzer = Analyzer(timeout=10)
        data = analyzer.analyze(url)

        return jsonify({'success': True, 'data': data}), 200
    except InvalidUrlError as exc:
        return jsonify({'success': False, 'message': str(exc)}), 400
    except TimeoutError as exc:
        return jsonify({'success': False, 'message': str(exc)}), 408
    except NetworkError as exc:
        return jsonify({'success': False, 'message': str(exc)}), 502
    except NonHtmlResponseError as exc:
        return jsonify({'success': False, 'message': str(exc)}), 415
    except AnalyzerError as exc:
        return jsonify({'success': False, 'message': str(exc)}), 500
    except Exception as exc:  # pragma: no cover - safety net
        return jsonify({'success': False, 'message': 'Internal server error.'}), 500


def register_routes(app):
    app.register_blueprint(bp)
