let category_id = 0;
let sorted_type = 0;
let cost_end = 150000;
let cost_start = 0;
let flowers = [];
let packaging = [];
let discount_type = 0;
let page = 0;
let paginations = 0;

getCategories();

function getCategories() {
    $.ajax({
        url: '/api/categories/get',
        type: 'GET',
        success: function (msg) {
            console.log(msg['message']);
            drawCategories(msg['message']);
        }
    });
}

function drawCategories(msg) {
    for (let i = 0; i < msg.length; i++) {
        let category = catalog_category_card.cloneNode(true);
        category.id = '';
        category.style.display = 'block';

        let cat_name = category.getElementsByClassName('catalog_category_item')[0];
        cat_name.innerText = msg[i]['name'];
        if (i === 0) {
            cat_name.classList.add('_active');
            category.classList.add('all');
        }
        category.style.display = 'inline-block';
        category.onclick = function () {
            document.getElementsByClassName('_active')[0].classList.remove('_active');
            cat_name.classList.add('_active');
            if (category.classList.contains('all')) {
                category_id = 0;
            } else {
                category_id = msg[i]['id'];
            }
            loadProducts();
            console.log('category_id:', category_id);
        }
        catalog_category_place.append(category);
    }

}

loadProducts();

/* Правильная подгрузка продуктов */
function loadProducts() {
    console.log(category_id);
    $('.slider_item_card').remove();
    let data = {
        'category_id': category_id,
        'sorted_type': sorted_type,
        'discount_type': discount_type,
        'cost_start': cost_start,
        'cost_end': cost_end,
        'flowers': flowers,
        'packaging': packaging,
        'page': 0,
    }
    $.ajax({
        url: '/site/products/smart',
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (msg) {
            console.log(msg);
            drawProducts(msg['message']['products']);
            paginations = msg['message']['pages'];
        }
    });

}


let packages = document.getElementsByClassName('packages_inp');
for (let i = 0; i < packages.length; i++) {
    packages[i].onchange = function () {

        if (packages[i].checked) {
            packaging.push(Number(packages[i].value));
        } else {
            packaging = removeItemAll(packaging, Number(packages[i].value));
        }
        console.log(packaging);
    }
}


loadFlowers();

function loadFlowers() {
    $.ajax({
        url: '/api/flowers/get',
        type: 'GET',
        success: function (msg) {
            console.log(msg);
            drawFlowers(msg['message']);
        }
    })
}

function drawFlowers(flower) {
    for (let i = 0; i < flower.length; i++) {
        let fl = choose_flower.cloneNode(true);
        fl.id = '';
        let name = fl.getElementsByClassName('name_flower')[0];
        let checkbox = fl.getElementsByClassName('checkbox_for_choose_flower')[0];
        checkbox.onchange = function () {

            if (checkbox.checked) {
                flowers.push(checkbox.value);
            } else {
                flowers = removeItemAll(flowers, checkbox.value);
            }
            console.log(flowers);
        }
        name.innerText = flower[i]['name'];
        checkbox.value = flower[i]['name'];
        fl.style.display = 'block';
        flowers_place.append(fl);
    }
}


startsorting.onclick = function () {
    startSorting();
}


function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

function startSorting() {
    cost_min = price_min.value;
    cost_max = price_max.value;
    loadProducts();
}

function drawProducts(msg) {
    for (let i = 0; i < msg.length; i++) {
        let box = createProduct(msg[i]);
        box.style.display = 'inline-block';
        document.getElementById('item_card_place').append(box);
    }
    console.log(paginations);
    for (let i = 0; i < paginations; i++) {
        let pagination = pagination_item.cloneNode(true);
        pagination.id = '';
        let pag_num = pagination.getElementsByClassName('pagination_num')[0];
        pag_num.innerText = i;
        pagination.style.display = 'inline-block';
        pag_place.append(pagination);
    }

}