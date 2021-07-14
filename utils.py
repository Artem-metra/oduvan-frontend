import json

import requests


address = 'http://45.12.19.118:80'

def is_mobile(user_agent):
    return 'mobile' in str(user_agent).lower()


def complete_request(req, path):
    data = {}
    for item in req.args:
        data[item] = req.args.get(item)
    print(data)
    url = address + path
    resp = requests.get(url, data)
    return resp.text