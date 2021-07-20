import json

from flask import Blueprint, request, session

import utils

busket_app = Blueprint('busket_app', __name__)


@busket_app.route('/api/busket/create')
def api_busket_create():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/buskets/get')
def api_buskets_get():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/edit')
def api_busket_edit():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/add_product')
def api_busket_add_product():
    resp = utils.complete_request(request, request.path)
    if 'busket_id' not in session:
        session['busket_id'] = resp['busket']['id']
        print(session['busket_id'])
    return resp


@busket_app.route('/api/busket/remove_product_key')
def api_busket_remove_product_key():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/remove_product_count')
def api_busket_remove_product_count():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/clear')
def api_busket_clear():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/remove')
def api_busket_remove():
    return utils.complete_request(request, request.path)


@busket_app.route('/api/busket/get_by_busket_id')
def api_busket_get_by_busket_id():
    return utils.complete_request(request, request.path)



@busket_app.route('/api/busket/get_by_user')
def api_busket_get_by_user():
    return utils.complete_request(request, request.path)



@busket_app.route('/api/busket/choice_purchase_type')
def api_busket_choice_purchase_type():
    return utils.complete_request(request, request.path)
