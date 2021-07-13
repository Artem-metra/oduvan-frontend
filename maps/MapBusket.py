import json

from flask import Blueprint, request

busket_app = Blueprint('busket_app', __name__)


@busket_app.route('/api/busket/create')
def api_busket_create():
    pass


@busket_app.route('/api/buskets/get')
def api_buskets_get():
    pass


@busket_app.route('/api/busket/get')
def api_busket_get():
    pass


@busket_app.route('/api/busket/edit')
def api_busket_edit():
    pass


@busket_app.route('/api/busket/add_product')
def api_busket_add_product():
    pass


@busket_app.route('/api/busket/remove_product_key')
def api_busket_remove_product_key():
    pass


@busket_app.route('/api/busket/remove_product_count')
def api_busket_remove_product_count():
    pass


@busket_app.route('/api/busket/clear')
def api_busket_clear():
    pass


@busket_app.route('/api/busket/remove')
def api_busket_remove():
    pass
