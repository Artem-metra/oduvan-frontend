# from backend_app import *
from flask import Flask, request, abort, session, json, render_template
import utils
from maps.MapArticle import article_app
from maps.MapBusket import busket_app
from maps.MapCategory import category_app
from maps.MapDeal import deal_app
from maps.MapDelivery import delivery_app
from maps.MapFlower import flower_app
from maps.MapPayment import payment_app
from maps.MapPosition import position_app
from maps.MapProduct import product_app
from maps.MapPromoCode import promo_code_app
from maps.MapShop import shop_app
from maps.MapStaff import staff_app
from maps.MapUser import user_app

app = Flask(__name__)

app.register_blueprint(promo_code_app)
app.register_blueprint(category_app)
app.register_blueprint(product_app)
app.register_blueprint(busket_app)
app.register_blueprint(deal_app)
app.register_blueprint(payment_app)
app.register_blueprint(shop_app)
app.register_blueprint(staff_app)
app.register_blueprint(article_app)
app.register_blueprint(flower_app)
app.register_blueprint(user_app)
app.register_blueprint(delivery_app)
app.register_blueprint(position_app)


# Index
@app.route('/')
def index():
    if utils.is_mobile(request.user_agent):
        return render_template('index.html')
    else:
        return render_template('pc_index.html')


# Catalog
@app.route('/catalog')
def catalog():
    if utils.is_mobile(request.user_agent):
        return render_template('catalog.html')
    else:
        return render_template('pc_catalog.html')


# favorites
@app.route('/favorites')
def favorites():
    if utils.is_mobile(request.user_agent):
        return render_template('favourites.html')
    else:
        return render_template('pc_favourites.html')


# product
@app.route('/product')
def product():
    id = request.values.get('id', 0, int)
    if utils.is_mobile(request.user_agent):
        return render_template('product.html', id=id)
    else:
        return render_template('pc_product.html', id=id)


# createorder
@app.route('/createorder')
def createorder():
    if utils.is_mobile(request.user_agent):
        return render_template('createorder.html')
    else:
        return render_template('pc_createorder.html')


# cabinet
@app.route('/cabinet')
def cabinet():
    if utils.is_mobile(request.user_agent):
        return render_template('cabinet.html')
    else:
        return render_template('pc_cabinet.html')


# blog main page
@app.route('/blog')
def blog():
    if utils.is_mobile(request.user_agent):
        return render_template('blog.html')
    else:
        return render_template('pc_blog.html')


# article blog
@app.route('/article')
def article():
    if utils.is_mobile(request.user_agent):
        return render_template('article.html')
    else:
        return render_template('pc_article.html')


# @app.before_request
# def redirect_on_api():
#     #    return utils.complete_request(request, request.path)
#     pass


if __name__ == '__main__':
    app.run(debug=True)
