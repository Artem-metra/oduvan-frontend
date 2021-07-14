# from backend_app import *
from flask import Flask, request, abort, session, json, render_template
import utils

app = Flask(__name__)


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
        return render_template('createorder.html')
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
