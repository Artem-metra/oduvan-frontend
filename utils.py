import json

import requests

address = 'http://45.12.19.118:80'


def is_mobile(user_agent):
    return 'mobile' in str(user_agent).lower()


def complete_request(req, path):
    data = {}
    for item in req.args:
        data[item] = req.args.get(item)
    url = address + path
    resp = requests.get(url, data)
    return json.loads(resp.text)


# TODO: неправильная передача запроса
def complete_request_post(data, path):
    url = address + path
    print(data)
    resp = requests.post(url, data)
    print(resp.text)
    return json.loads(resp.text)


def complete_request_with_parameters(params, path):
    url = address + path
    resp = requests.get(url, params)
    return json.loads(resp.text)
