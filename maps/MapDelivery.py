import datetime

from flask import Blueprint, request


delivery_app = Blueprint('delivery_app', __name__)


@delivery_app.route('/api/delivery/create')
def api_delivery_create():
    pass

@delivery_app.route('/api/deliveries/get')
def api_deliveries_get():
    pass


@delivery_app.route('/api/delivery/get')
def api_delivery_get():
    pass


@delivery_app.route('/api/delivery/edit')
def api_delivery_edit():
    pass



@delivery_app.route('/api/delivery/remove')
def api_delivery_remove():
    pass


@delivery_app.route('/api/delivery/get_info')
def api_delivery_get_info():
    pass


@delivery_app.route('/api/delivery/closed')
def api_delivery_closed():
    pass