from flask import Flask, render_template, request, jsonify
from predict import predictions

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    body = request.get_json()
    doc1, doc2 = body['doc1'], body['doc2']
    res = predictions([doc1, doc2])
    return jsonify(res)
