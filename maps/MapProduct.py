import json

from flask import Blueprint, request

import utils

product_app = Blueprint('product_app', __name__)


@product_app.route('/api/product/create')
def api_product_create():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/products/get')
def api_products_get():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/products/sort_from_min_to_max')
def api_products_sort_from_min_to_max():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/products/sort_from_max_to_min')
def api_products_sort_from_max_to_min():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/product/get')
def api_product_get():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/product/edit')
def api_product_edit():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/product/add_discount_type')
def api_add_discount_type():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/product/remove_discount_type')
def api_remove_discount_type():
    pass
    return utils.complete_request(request, request.path)


@product_app.route('/api/product/remove')
def api_product_remove():
    return utils.complete_request(request, request.path)


@product_app.route('/site/products/smart', methods=['POST'])
def site_products_smart():
    return utils.complete_request_post({'info': request.data}, request.path)


@product_app.route('/site/likeds/products')
def site_likeds_products():
    return utils.complete_request(request, request.path)


@product_app.route('/api/products/add_image', methods=['POST'])
def api_product_add_new_image():
    return utils.complete_request_post(json.loads(request.data), request.path)


@product_app.route('/api/products/remove_image')
def api_product_remove_image():
    return utils.complete_request(request, request.path)


@product_app.route('/api/products/edit_image', methods=['POST'])
def api_user_edit_image():
    return utils.complete_request_post(json.loads(request.data), request.path)
