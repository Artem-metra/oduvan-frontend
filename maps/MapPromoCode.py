from flask import Blueprint, request

import utils

promo_code_app = Blueprint('promo_code_app', __name__)


@promo_code_app.route('/api/promo_code/create_promo_code')
def create_promo_code():
    pass
    return utils.complete_request(request, request.path)


@promo_code_app.route('/api/promo_code/get_promo_code')
def get_promo_code():
    pass
    return utils.complete_request(request, request.path)
