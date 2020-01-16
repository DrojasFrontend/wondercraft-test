const api_url = 'https://api.jsonbin.io/b/5e1aa891b236b871b3605dd6/1';

var products = document.getElementById('products');

function getJson() {
    fetch(api_url)
        .then(res => res.json())
        .then(dataJson => {
            getProducts(dataJson)
            //console.log(countDataJson)
        })
}

// Format Price
function formatPrice(price) {
    var price = price / 100;
    return price
}

// Load Data Products
function getProducts(dataJson) {

    // Order Products by Name
    dataJson.data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    
    const countDataJson = dataJson.data.length;
        for(var i = 0; i < countDataJson; i++ ) {
            products.innerHTML += `
                <figure>
                    <a href="#" id="${dataJson.data[i].id}">
                        <img src="${dataJson.data[i].image}" alt="${dataJson.data[i].name}">
                        <figcaption>
                            <p>${dataJson.data[i].name}</p>
                            <span>
                                ${formatPrice(dataJson.data[i].price)}
                            </span>
                        </figcaption>
                    </a>
                </figure>
            `
            console.log(dataJson.data[i].name)
        }

}

getJson();
