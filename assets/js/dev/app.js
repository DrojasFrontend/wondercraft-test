const api_url = 'https://api.jsonbin.io/b/5e1aa891b236b871b3605dd6/1';

var products = document.getElementById('products');

// Load Data
function getJson() {
    fetch(api_url)
        .then(res => res.json())
        .then(dataJson => {
            spinner();
            getProducts(dataJson)
            //console.log(countDataJson)
        })
}

// Preloading Gif
function spinner() {
    var spinner = document.getElementById('spinner')
    spinner.classList.add("hidden");
}

// Format Price
function formatPrice(price) {
    var price = price / 100;
    return price
}

// Add Img Best Seller
function bestSeller(name) {
    var name = name.includes('Brazil Cachoeira');    
    return name;
}

//console.log(bestSeller('Brazil'))


// Load Data Products
function getProducts(dataJson) {

    // Order Products by Name
    dataJson.data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    
    const countDataJson = dataJson.data.length;
        for(var i = 0; i < countDataJson; i++ ) {

            if(bestSeller(dataJson.data[i].name)) {
                products.innerHTML += `
                <figure class="product">
                    <span class="best-seller tada">
                        BEST SELLER
                    </span>
                    <a href="#" id="${dataJson.data[i].id}">
                        <img src="${dataJson.data[i].image}" srcset="${dataJson.data[i].image}" 1280w alt="${dataJson.data[i].name}" size="(max-width: 1280px) 100vw">
                        <figcaption>
                            <p>${dataJson.data[i].name}</p>
                            <span>
                                ${formatPrice(dataJson.data[i].price)}
                            </span>
                        </figcaption>
                    </a>
                </figure>
            `
            } else {
                products.innerHTML += `
                <figure class="product">
                    <a href="#" id="${dataJson.data[i].id}">
                        <img src="${dataJson.data[i].image}" srcset="${dataJson.data[i].image}" 1280w alt="${dataJson.data[i].name}" size="(max-width: 1280px) 100vw">
                        <figcaption>
                            <p>${dataJson.data[i].name}</p>
                            <span>
                                $ ${formatPrice(dataJson.data[i].price)}
                            </span>
                        </figcaption>
                    </a>
                </figure>
            `
            }
            //console.log(dataJson.data[i].name)
        }
}

getJson();

setTimeout(function(){
    document.getElementById('comment').classList.add('visible');
}, 3000);



