from flask import Flask, jsonify, request

app = Flask(__name__)

app.register_blueprint(model, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8804, debug=False)
