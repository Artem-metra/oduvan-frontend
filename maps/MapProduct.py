import json

from flask import Blueprint, request

product_app = Blueprint('product_app', __name__)


@product_app.route('/api/product/create')
def api_product_create():
    pass


@product_app.route('/api/products/get')
def api_products_get():
    pass


@product_app.route('/api/products/sort_from_min_to_max')
def api_products_sort_from_min_to_max():
    pass


@product_app.route('/api/products/sort_from_max_to_min')
def api_products_sort_from_max_to_min():
    pass


@product_app.route('/api/product/get')
def api_product_get():
    pass


@product_app.route('/api/product/edit')
def api_product_edit():
    pass


@product_app.route('/api/product/add_discount_type')
def api_add_discount_type():
    pass


@product_app.route('/api/product/remove_discount_type')
def api_remove_discount_type():
    pass


@product_app.route('/api/product/remove')
def api_product_remove():
    pass


@product_app.route('/site/products/smart', methods=['POST'])
def site_products_smart():
    pass