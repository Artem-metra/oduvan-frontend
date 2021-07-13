from flask import Blueprint, request

payment_app = Blueprint('payment_app', __name__)


@payment_app.route('/api/payment/create')
def api_payment_create():
    pass