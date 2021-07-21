import json

import requests

address = 'http://45.12.19.118:80'


def is_mobile(user_agent):
    return 'mobile' in str(user_agent).lower()


def complete_request_with_data(path):
    data = {}
    url = address + path
    resp = requests.get(url, data)
    return json.loads(resp.text)


def complete_request(req, path):
    data = {}
    for item in req.args:
        data[item] = req.args.get(item)
    url = address + path
    resp = requests.get(url, data)
    return json.loads(resp.text)


def complete_request_post(data, path):
    url = address + path
    data['image'] = data['image'][data['image'].find(','):]
    resp = requests.post(url, data)
    return json.loads(resp.text)


def complete_request_with_parameters(params, path):
    url = address + path
    resp = requests.get(url, params)
    return json.loads(resp.text)


def complete_request_post_with_parameters(params, path):
    url = address + path
    headers = {
        'Content-Type': 'application/json'
    }
    resp = requests.post(url, data=json.dumps(params, ensure_ascii=False), headers=headers)
    print(resp.request.headers)
    return resp.text
