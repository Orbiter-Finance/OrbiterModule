#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import json
from getpass import getpass
from urllib import request
from urllib.request import urlopen

API_CHARSET = 'UTF-8'
API_HOST = 'http://localhost:3002'
API_MISS_PRIVATE_KEY_ADDRESSES = API_HOST + '/maker/miss_private_key_addresses'
API_MAKER_PRIVATEKEYS = API_HOST + '/maker/privatekeys'


def getMakerAddresses():
    resp = urlopen(API_MISS_PRIVATE_KEY_ADDRESSES)
    result = json.load(resp)
    if 'data' not in result:
        return []
    return result['data']


def postPrivateKeys(pks):
    headers = {'Accept-Charset': API_CHARSET,
               'Content-Type': 'application/json'}
    data = bytes(json.dumps(pks), API_CHARSET)
    req = request.Request(url=API_MAKER_PRIVATEKEYS,
                          data=data, headers=headers, method='POST')
    resp = urlopen(req).read()
    print(resp)


privateKeys = {}
for item in getMakerAddresses():
    pk = getpass('Please input [' + item + '] private key!\r\n:')
    privateKeys[item] = pk

postPrivateKeys(privateKeys)
