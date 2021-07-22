from flask import Blueprint, request, session

import utils

basket_app = Blueprint('basket_app', __name__)


@basket_app.route('/api/basket/create')
def api_basket_create():
    resp = utils.complete_request(request, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp


@basket_app.route('/api/baskets/get')
def api_baskets_get():
    return utils.complete_request(request, request.path)


@basket_app.route('/api/basket/edit')
def api_basket_edit():
    return utils.complete_request(request, request.path)


@basket_app.route('/api/basket/add_product')
def api_basket_add_product():
    return utils.complete_request(request, request.path)


@basket_app.route('/api/basket/remove_product_key')
def api_basket_remove_product_key():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'basket_id' not in params.keys():
        if 'basket_id' in session:
            params = {'basket_id': session['basket_id']}
        else:
            return 'error'
    resp = utils.complete_request(params, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp


@basket_app.route('/api/basket/remove_product_count')
def api_basket_remove_product_count():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'basket_id' not in params.keys():
        if 'basket_id' in session:
            params = {'basket_id': session['basket_id']}
        else:
            return 'error'
    resp = utils.complete_request(params, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp


@basket_app.route('/api/basket/clear')
def api_basket_clear():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'basket_id' not in params.keys():
        if 'basket_id' in session:
            params = {'basket_id': session['basket_id']}
        else:
            return 'error'
    resp = utils.complete_request(params, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp


@basket_app.route('/api/basket/remove')
def api_basket_remove():
    return utils.complete_request(request, request.path)


@basket_app.route('/api/basket/get_by_basket_id')
def api_basket_get_by_basket_id():
    return utils.complete_request(request, request.path)



@basket_app.route('/api/basket/get_by_user')
def api_basket_get_by_user():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'basket_id' not in params.keys():
        if 'basket_id' in session:
            params = {'basket_id': session['basket_id']}
        else:
            return 'error'
    resp = utils.complete_request(params, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp


@basket_app.route('/api/basket/choice_purchase_type')
def api_basket_choice_purchase_type():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'basket_id' not in params.keys():
        if 'basket_id' in session:
            params = {'basket_id': session['basket_id']}
        else:
            return 'error'
    resp = utils.complete_request(params, request.path)
    if 'basket_id' not in session:
        session['basket_id'] = resp['basket']['id']
    return resp