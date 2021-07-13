import datetime
import json

from flask import Blueprint, request

shop_app = Blueprint('shop_app', __name__)


@shop_app.route('/api/shop/create')
def api_shop_create():
    pass

@shop_app.route('/api/shops/get')
def api_shops_get():
    pass


@shop_app.route('/api/shop/get')
def api_shop_get():
    pass


@shop_app.route('/api/shop/add_product')
def api_shop_add():
    pass

@shop_app.route('/api/shop/edit')
def api_shop_edit():
    pass

@shop_app.route('/api/shop/remove')
def api_shop_remove():
    pass