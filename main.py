from flask import Flask, request, jsonify
import yaml

app = Flask(__name__, static_url_path='/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

YML_FILE_PATH = 'data.yml'
QNA_YML_FILE_PATH = 'qna.yml'

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/qna', methods=['GET', 'POST'])
def qna():
    if(request.method == 'GET'):
        return app.send_static_file('qna.html')
    elif(request.method == 'POST'):
        data = request.json
        with open(QNA_YML_FILE_PATH, 'w') as outfile:
            yaml.dump(data, outfile, default_flow_style=False)
        return jsonify(data)



@app.route('/success', methods=['GET'])
def success():
    return app.send_static_file('success.html')

@app.route('/data', methods=['POST'])
def data():
    data = request.json
    with open(YML_FILE_PATH, 'w') as outfile:
        yaml.dump(data, outfile, default_flow_style=False)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)