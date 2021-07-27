let category_id = 0;
let sorted_type = 1;
let cost_end = 150000;
let cost_start = 0;
let flowers = [];
let packaging = [];
let discount_type = 0;
let page = 1;
let paginations = 0;


getCategories();

// Получим категории
function getCategories() {
    let data = {
        'category_id': id,
    }
    $.ajax({
        url: '/api/categories/get',
        data: data,
        type: 'GET',
        success: function (msg) {
            console.log(msg['message']);
            for (let i = 0; i < msg['message']['top_categories'].length; i++) {
                let div = document.createElement('div');
                div.style.padding = '8px 0';
                let item = document.createElement('a');
                item.href = 'catalog?category_id=' + msg['message']['top_categories'][i]['id'];
                if (msg['message']['top_categories'][i]['id'] === id) {
                    item.className = 'catalog_zag _active_cat';
                } else {
                    item.className = 'catalog_zag';
                }

                item.innerText = msg['message']['top_categories'][i]['name'];
                div.append(item);
                place_top_cats.append(div);
            }
            drawCategories(msg['message']['categories']);
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

            document.getElementsByClassName('active_page')[0].classList.remove('active_page');
            $('.delete_subcat').remove();
            document.getElementsByClassName('_active')[0].classList.remove('_active');
            cat_name.classList.add('_active');
            if (category.classList.contains('all')) {
                category_id = 0;
                $('.delete_cat').remove();
                let breadcoast = BreadCoast(id);
                console.log(breadcoast);
                place_bread.innerHTML += `<a href="/catalog?category_id=${id}" class="active_page">${breadcoast[0]}</a>`;

            } else {
                category_id = msg[i]['id'];
                place_bread.innerHTML += `<span style="text-transform: uppercase;font-weight: 600;color:#F877AD" class="active_page catalog_category_card delete_subcat">
<span style="color:#293048"> / </span>${msg[i]['name']}</span>`;
            }
            loadProducts();
        }
        catalog_category_place.append(category);
        console.log('Высота', catalog_category_place.offsetHeight);
        place_top_cats.style.paddingTop = catalog_category_place.offsetHeight + 5 + 'px';
        place_top_cats.style.paddingBottom = '30px';
        // //Сортировка по параметрам
        // let inputs = document.getElementsByClassName('sorted_po');
        // for (let i = 1; i < inputs.length + 1; i++) {
        //     inputs[i].onclick = function () {
        //         sorted_type = i;
        //         console.log('sorted_type', sorted_type);
        //         if ([i] !== sorted_type) {
        //             active_sorted.innerText = inputs[i].getAttribute('placeholder');
        //             console.log(inputs[i].getAttribute('placeholder'));
        //             inputs[i].style.display = 'none';
        //             sorted_select_items_list.className = '';
        //             chevron_list.classList.remove('_active');
        //         }
        //     }
        // }
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
        'page': page,
    }
    $.ajax({
        url: '/site/products/smart',
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (msg) {
            console.log(msg);
            $('.delete_paginations').remove();
            paginations = Number(msg['message']['pages']);
            drawProducts(msg['message']['products']);
        }
    });


    /* Выпадающий список с сортировками по названиям, по цене и т.д */
    chevron_for_list.onclick = function () {
        let inputs = document.getElementsByClassName('sorted_po');
        console.log('inputs', inputs);
        for (let i = 1; i < inputs.length + 1; i++) {
            console.log(i, sorted_type);
            if (i !== sorted_type) {
                inputs[i - 1].style.display = 'block';
            } else {
                inputs[i - 1].style.display = 'none';
            }
        }
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
        sorted_type = 1;
        flowers = [];
        packaging = [];
        discount_type = 0;
        price_max.value = cost_end;
        price_min.value = cost_start;

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
            minPrice();
            maxPrice();
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
                flowers.push(Number(checkbox.value));
            } else {
                flowers = removeItemAll(flowers, Number(checkbox.value));
            }
            console.log(flowers);
        }
        name.innerText = flower[i]['name'];
        checkbox.value = flower[i]['id'];
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

    for (let i = 1; i < paginations + 1; i++) {
        let pagination = pagination_item.cloneNode(true);
        pagination.id = '';
        pagination.classList.add('delete_paginations');
        let pag_num = pagination.getElementsByClassName('pagination_num')[0];
        pag_num.innerText = i;
        if (i === page) {
            pagination.classList.add('_active');
        }
        pagination.style.display = 'inline-block';
        pagination.onclick = function () {
            page = i;
            loadProducts();
        }
        pag_place.append(pagination);
    }
}

// Хлебные крошки
let breadcoast = BreadCoast(id);
console.log(breadcoast);
place_bread.innerHTML += `/ <a href="/catalog?category_id=${id}" class="active_page delete_cat">${breadcoast[0]}</a>`;

// Получение миниальной цены товара в категории
function minPrice() {
    let data = {
        'category_id': id,
    }
    $.ajax({
        url: '/api/min_price_for_category',
        type: "GET",
        data: data,
        success: function (msg) {
            console.log(msg);
            cost_start = msg['message']['min_cost'];
            price_min.value = msg['message']['min_cost'];
            price_controller.setAttribute('min', Number(msg['message']['min_cost']));

            /* Рендж для регулировки цен */
            price_controller.oninput = function () {
                console.log(price_controller.value);
                price_max.value = price_controller.value;
            }
            /* Проверки при изменении цены */
            price_min.onchange = function () {
                console.log(price_min.value);
                if (Number(price_min.value) < msg['message']['min_cost']) {
                    price_min.value = Number(msg['message']['min_cost']);
                }
                if (Number(price_min.value) > Number(price_max.value)) {
                    price_min.value = Number(msg['message']['min_cost']);
                }
            }
        }
    })
}

// Получение максимальной цены товара в категории
function maxPrice() {
    let data = {
        'category_id': id,
    }
    $.ajax({
        url: '/api/max_price_for_category',
        type: "GET",
        data: data,
        success: function (msg) {
            console.log(msg);
            cost_end = msg['message']['max_cost'];
            price_max.value = msg['message']['max_cost'];
            price_controller.setAttribute('max', Number(msg['message']['max_cost']));
            price_max.onchange = function () {
                if (Number(price_max.value) < Number(price_min.value)) {
                    price_max.value = Number(price_min.value + price_max.value++);
                }
                if (Number(price_max.value) > msg['message']['max_cost']) {
                    price_max.value = msg['message']['max_cost'];
                }
            }
        }
    })
}






