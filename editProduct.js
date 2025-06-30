const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTA4MDE1ODYsImV4cCI6MTc1MjAxMTE4Nn0.xhkKzesrQbsg05eG0q_X5718-KDBF6O110MAHGmTcKo"
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const brandInput = document.querySelector("#brand");
const imageUrlInput = document.querySelector("#imageUrl");
const priceInput = document.querySelector("#price");
const productId = new URLSearchParams(window.location.search).get("id");
console.log("Product ID:", productId);

async function getProduct() {
    try {

        const res = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${authorization}`,
            },
        });
        const data = await res.json();
        console.log(data);
        productInput(data);
    }
    catch (e) {
        console.error("Error fetching product:", e);
    }

}


async function productInput(product) {
    nameInput.value = product.name;
    descriptionInput.value = product.description;
    brandInput.value = product.brand;
    imageUrlInput.value = product.imageUrl;
    priceInput.value = product.price;
}
async function addProduct() {
    const data = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: parseFloat(priceInput.value),
    };
    console.log("Adding product:", data);
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${authorization}`,
                    'Content-Type': "application/json",
                },
            }
        );
        window.location.href = "backOffice.html";
    } catch (e) {
        console.log("Error fetching products:", e);
    }
}
getProduct();