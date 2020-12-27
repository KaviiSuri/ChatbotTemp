from flask import Flask, request, jsonify
import yaml

app = Flask(__name__)

YML_FILE_PATH = 'data.yml'

@app.route('/', methods=['POST'])
def index():
    data = request.json
    with open(YML_FILE_PATH, 'w') as outfile:
        yaml.dump(data, outfile, default_flow_style=False)
    return jsonify(data)

if __name__ == '__main__':
    app.run()