let category_id = 0;
let sorted_type = 1;
let cost_end = 150000;
let cost_start = 0;
let flowers = [];
let packaging = [];
let discount_type = 0;
let paginations = 0;



function Preloader(status) {
    if (status === 1) {
        document.getElementById('preloader').style.display = 'block';
        document.getElementById('content_catalog').style.display = 'none';
    } else {
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('content_catalog').style.display = 'block';
    }

}

function EmptyProducts() {
        message_for_empty.innerText = 'Товаров не найдено';
        Preloader(1);
        document.getElementById('lds-roller').style.display = 'none';
}




getCategories();


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
                div.style.padding = '16px 0';
                let item = document.createElement('a');
                item.style.fontSize = '65px';
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



function drawCategories(msg) {
    for (let i = 0; i < msg.length; i++) {
        let category = catalog_category_card.cloneNode(true);
        category.id = '';
        category.style.display = 'block';

        let cat_name = category.getElementsByClassName('catalog_category_item')[0];
        cat_name.innerText = msg[i]['name'];
        if (sub_category === msg[i]['id']) {
            cat_name.classList.add('_active');
            vse.classList.remove('_active');
        }
        console.log(sub_category, msg[i]['id']);
        category.style.display = 'inline-block';
        vse.onclick = function () {
            document.getElementsByClassName('_active')[0].classList.remove('_active');
            document.getElementsByClassName('active_page')[0].classList.remove('active_page');
            vse.classList.add('_active');
            sub_category = 0;
            page = 1;
            $('.delete_cat').remove();
            $('.delete_subcat').remove();
           place_bread.innerHTML +=  `/ <a href="/catalog?category_id=${id}" class="active_page delete_cat">${breadcoast[0]}</a>` + ' / ' + `<a href="/catalog?category_id=${id}&sub_category=0" class="active_page delete_cat">Все</a>`;
            loadProducts();
        }
        category.onclick = function () {
            document.getElementsByClassName('active_page')[0].classList.remove('active_page');
            $('.delete_subcat').remove();
            document.getElementsByClassName('_active')[0].classList.remove('_active');
            cat_name.classList.add('_active');
            page = 1;
            sub_category = msg[i]['id'];
            place_bread.innerHTML += `<a href="/catalog?category_id=${id}&sub_category=${msg[i]['id']}" class="active_page catalog_category_card delete_subcat">
            <span style="color:#293048"> / </span>${msg[i]['name']}</a>`;
            loadProducts();
        }
        catalog_category_place.append(category);
        console.log('Высота', catalog_category_place.offsetHeight);
        // place_top_cats.style.paddingTop = catalog_category_place.offsetHeight + 5 + 'px';
        place_top_cats.style.paddingBottom = '40px';
    }


}


loadProducts();

function loadProducts() {
    Preloader(1);
    minPrice();
    maxPrice();
    console.log(cost_start, cost_end);
    $('.delete_card').remove();
    console.log('sub_category, category, page', sub_category, id, page);
    let data = {
        'category_id': id,
        'sub_category': sub_category,
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
            console.log('Продкуты каталога', msg);
            if (msg['message']['products'].length === 0) {
                EmptyProducts();
            } else {
                document.getElementById('lds-roller').style.display = 'block';
                message_for_empty.innerText = ' ';
                $('.delete_paginations').remove();
                paginations = Number(msg['message']['pages']);
                page = Number(msg['message']['page']);
                drawProducts(msg['message']['products']);
            }
        }
    });

    // filter_place.onclick = function () {
    //     outdoingListCatalog();
    // }

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
        location.reload();
    }
}


// let packages = document.getElementsByClassName('packages_inp');
// for (let i = 0; i < packages.length; i++) {
//     packages[i].onchange = function () {
//
//         if (packages[i].checked) {
//             packaging.push(Number(packages[i].value));
//         } else {
//             packaging = removeItemAll(packaging, Number(packages[i].value));
//         }
//         console.log(packaging);
//     }
// }

if (id === 28) loadFlowers();

function loadFlowers() {
    filter_place.style.display = 'block';
    $.ajax({
        url: '/api/flowers/get',
        type: 'GET',
        success: function (msg) {
            console.log(msg);
            drawFlowers(msg['message']);
            // Хлебные крошки
            let breadcoast = BreadCoast(id);
            console.log(breadcoast);
           place_bread.innerHTML += `/ <a href="/catalog?category_id=${id}" class="active_page delete_cat">${breadcoast[0]}</a>`;
        }
    })
}


function drawFlowers(flower) {
    for (let i = 0; i < flower.length; i++) {
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


loadPackages();

function loadPackages() {
    $.ajax({
        url: '/api/packages/get',
        type: "GET",
        success: function (msg) {
            console.log('packages', msg);
            drawPackages(msg['message']['packages']);
        }
    })
}


function drawPackages(packages) {
    for (let i = 0; i < packages.length; i++) {
        let box = choose_pack.cloneNode(true);
        box.id = '';
        let name = box.getElementsByClassName('name_flower')[0];
        let checkbox = box.getElementsByClassName('checkbox_for_choose_flower')[0];
        checkbox.id = '';
        let name_flower = box.getElementsByClassName('lab_desc')[0];
        let newId = 'packaging-' + i;
        name_flower.setAttribute('for', newId);
        checkbox.id = 'packaging-' + i;
        checkbox.onchange = function () {
            if (checkbox.checked) {
                packaging.push(Number(checkbox.value));
            } else {
                packaging = removeItemAll(packaging, Number(checkbox.value));
            }
            console.log('packages', packaging);
        }
        name.innerText = packages[i]['name'];
        checkbox.value = packages[i]['id'];
        box.style.display = 'flex';
        packages_place.append(box);
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
    Preloader(0);
}


// Получение миниальной цены товара в категории
function minPrice() {
    let start_cost = 0;
    let data = {
        'sub_category': sub_category,
        'category_id': id,
    }
    $.ajax({
        url: '/api/min_price_for_category',
        type: "GET",
        data: data,
        async: false,
        success: function (msg) {
            console.log(msg);
            start_cost = msg['message']['min_cost'];
            price_min.value = start_cost;
            price_controller.setAttribute('min', start_cost);
            /* Рендж для регулировки цен */
            price_controller.oninput = function () {
                price_max.value = price_controller.value;
            }
            /* Проверки при изменении цены */
            price_min.onchange = function () {
                if (Number(price_min.value) < start_cost) {
                    price_min.value = start_cost;
                }
                if (Number(price_min.value) > Number(price_max.value)) {
                    price_min.value = start_cost;
                }
            }
        }
    })
    cost_start = start_cost;
}

// Получение максимальной цены товара в категории
function maxPrice() {
    console.log('cat_id', id);
    let endcost = 0;
    let data = {
        'sub_category': sub_category,
        'category_id': id,
    }
    $.ajax({
        url: '/api/max_price_for_category',
        type: "GET",
        data: data,
        async: false,
        success: function (msg) {
            console.log(msg);
            endcost = msg['message']['max_cost'];
            price_max.value = endcost;
            price_controller.setAttribute('max', Number(msg['message']['max_cost']));
            price_controller.value = endcost;
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
    cost_end = endcost;
}





appear_about_pressing.style.display = 'none';
sorted_select_items_list.style.display = 'none';
filter_place.onclick = function (){
    let inputs = document.getElementsByClassName('sorted_po');
    for (let i = 0; i < inputs.length; i++) {
        if (i + 1 !== sorted_type) {
            inputs[i].style.display = 'block';
        } else {
            inputs[i].style.display = 'none';
        }
        inputs[i].onclick = function () {
            sorted_type = i + 1;
            console.log('st', sorted_type);
            sorted_select_items_list.className = '';
            chevron_list.classList.remove('_active');
            active_sorted.innerText = inputs[i].getAttribute('placeholder');
        }
    }
    let display = appear_about_pressing.style.display;
    if(display === 'none'){
        appear_about_pressing.style.display = 'block';
        my_class_img.style.transform = 'rotate(180deg)';
        my_class_img.style.transition = 'transform .3s';
    }else {
        appear_about_pressing.style.display = 'none';
        my_class_img.style.transform = 'rotate(0deg)';
        my_class_img.style.transition = 'transform .3s';
    }

    if(sorted_select_items_list.style.display === 'none'){
        sorted_select_items_list.style.display = 'block';
        // sorted_select_items.style.top = '35px';
        // sorted_select_items.style.right = '10px';
        // height_increase.style.height = '180px';
        // my_privat_mar.style.marginTop = '-180px';
        // height_increase.style.width = '50%';

    }else {
        sorted_select_items_list.style.display = 'none';
        // height_increase.style.height = '0';
        // height_increase.style.height = '180px';
        // my_privat_mar.style.marginTop = '-180px';
        // height_increase.style.width = '50%';
    }
}