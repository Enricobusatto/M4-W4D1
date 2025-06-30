const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productImage = document.getElementById('productImage');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const productId = new URLSearchParams(window.location.search).get("id");
const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTA4MDE1ODYsImV4cCI6MTc1MjAxMTE4Nn0.xhkKzesrQbsg05eG0q_X5718-KDBF6O110MAHGmTcKo"

async function fetchProductDetails() {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${authorization}`,
            },
        });
        const product = await response.json();
        console.log(product);

        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}
fetchProductDetails();

function displayProductDetails(product) {
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    productBrand.textContent = `Brand: ${product.brand}`;
    productPrice.textContent = `Price: ${product.price}€`;
}
