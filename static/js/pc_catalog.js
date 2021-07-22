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

// Получим категории
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

GetUser();

// Отрисовка категорий
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
    console.log(cost_start, cost_end);
    $('.delete_card').remove();
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
    /* Рендж для регулировки цен */
    price_controller.onchange = function () {
        console.log(price_controller.value);
        price_max.value = price_controller.value;
    }
    /* Проверки при изменении цены */
    price_min.onchange = function () {
        console.log(price_min.value);
        if (price_min.value < 0) {
            price_min.value = 0;
        }
        if (price_min.value > price_max.value) {
            price_min.value = price_max.value - 1;
        }
    }
    price_max.onchange = function () {
        if (price_max.value < 0) {
            price_max.value = price_min.value + 1;
        }
        if (price_max.value < price_min.value) {
            price_max.value = price_min.value + 1;
        }
    }

    /* Выпадающий список с сортировками по названиям, по цене и т.д */
    chevron_for_list.onclick = function () {
        if (chevron_list.classList.contains('_active')) {
            sorted_select_items_list.className = '';
            chevron_list.classList.remove('_active');
        } else {
            sorted_select_items_list.className = '_active';
            chevron_list.classList.add('_active');
            let sorted_list = sorted_select_items_list.cloneNode(true);
            console.log(sorted_list);
            let sorted_item = sorted_list.getElementsByClassName('sorted_select_item');
            console.log(sorted_item);
            for (let i = 0; i < sorted_item.length; i++) {
                sorted_item[i].onclick = function () {
                    console.log('O da', sorted_item[i]);
                    alert(sorted_item[i].innerText);
                }
            }
        }
    }

    throw_off.onclick = function () {
        category_id = 0;
        sorted_type = 0;
        cost_end = 150000;
        cost_start = 0;
        flowers = [];
        packaging = [];
        discount_type = 0;
        price_max.value = 100000;
        price_min.value = 0;

        // let checkboxes = document.getElementsByClassName('custom-checkbox');
        let checkboxes = document.getElementsByClassName('checkbox_for_choose_flower');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxes[i].checked = false;
            }
        }
        loadProducts();
    }


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
        // let fl = choose_flower.cloneNode(true);
        // fl.id = '';
        // let name = fl.getElementsByClassName('name_flower')[0];
        // let checkbox = fl.getElementsByClassName('checkbox_for_choose_flower')[0];
        // // выбор на чекбоксы
        // checkbox.id = '';
        // checkbox.id = 'flowers-' + i;
        // let name_flower = fl.getElementsByClassName('name_flower')[0];
        // let newId =  'flowers-' + i;
        // name_flower.setAttribute('for', newId);
        // checkbox.onchange = function () {
        //     if (checkbox.checked) {
        //         flowers.push(checkbox.value);
        //     } else {
        //         flowers = removeItemAll(flowers, checkbox.value);
        //     }
        //     console.log(flowers);
        // }
        // name.innerText = flower[i]['name'];
        // checkbox.value = flower[i]['name'];
        // fl.style.display = 'flex';
        // flowers_place.append(fl);

        let fl = choose_flower.cloneNode(true);
        fl.id = '';
        let name = fl.getElementsByClassName('name_flower')[0];
        let checkbox = fl.getElementsByClassName('checkbox_for_choose_flower')[0];
        checkbox.id = '';
        let name_flower = fl.getElementsByClassName('lab_desc')[0];
        let newId = 'flowers-' + i;
        name_flower.setAttribute('for', newId);
        checkbox.id = 'flowers-' + i;
        // name_flower.for = 'flowers' + i;
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
        fl.style.display = 'flex';
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
    console.log('Дашло!');
    cost_start = Number(price_min.value);
    cost_end = Number(price_max.value);

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