const api_url="https://api.jsonbin.io/b/5e1aa891b236b871b3605dd6/1";var products=document.getElementById("products");function getJson(){fetch(api_url).then(n=>n.json()).then(n=>{getProducts(n)})}function formatPrice(n){return n=n/100}function bestSeller(n){return n=n.includes("Brazil Cachoeira")}function getProducts(n){n.data.sort(function(n,a){return n.name.localeCompare(a.name)});const a=n.data.length;for(var t=0;t<a;t++){document.getElementsByClassName("product");bestSeller(n.data[t].name)?products.innerHTML+=`\n                <figure class="product">\n                    <span class="best-seller tada">\n                        BEST SELLER\n                    </span>\n                    <a href="#" id="${n.data[t].id}">\n                        <img src="${n.data[t].image}" alt="${n.data[t].name}">\n                        <figcaption>\n                            <p>${n.data[t].name}</p>\n                            <span>\n                                ${formatPrice(n.data[t].price)}\n                            </span>\n                        </figcaption>\n                    </a>\n                </figure>\n            `:products.innerHTML+=`\n                <figure class="product">\n                    <a href="#" id="${n.data[t].id}">\n                        <img src="${n.data[t].image}" alt="${n.data[t].name}">\n                        <figcaption>\n                            <p>${n.data[t].name}</p>\n                            <span>\n                                ${formatPrice(n.data[t].price)}\n                            </span>\n                        </figcaption>\n                    </a>\n                </figure>\n            `}}getJson();