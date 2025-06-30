const tableBody = document.querySelector("tbody");
const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTA4MDE1ODYsImV4cCI6MTc1MjAxMTE4Nn0.xhkKzesrQbsg05eG0q_X5718-KDBF6O110MAHGmTcKo"
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const brandInput = document.querySelector("#brand");
const imageUrlInput = document.querySelector("#imageUrl");
const priceInput = document.querySelector("#price");


async function fetchProducts() {
    try {
        const result = await fetch("https://striveschool-api.herokuapp.com/api/product/",
            {
                headers: {
                    Authorization: `Bearer ${authorization}`,
                },
            }
        );
        const data = await result.json();
        console.log(data);
        renderProducts(data);
    } catch (e) {
        console.log("Error fetching products:", e);
    }
}

fetchProducts();

function renderProducts(products) {
    tableBody.innerHTML = ""; 
    const productTr = products.map(product => createTableRow(product));
    tableBody.append(...productTr)

}



function createTableRow(product) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.innerText = product.name;
    tdName.classList.add("align-middle");

    const tdDescription = document.createElement("td");
    tdDescription.innerText = product.description;
    tdDescription.classList.add("align-middle");

    const tdBrand = document.createElement("td");
    tdBrand.innerText = product.brand;
    tdBrand.classList.add("align-middle");

    const tdImage = document.createElement("td");
    const img = document.createElement("img");
    tdImage.appendChild(img);
    img.src = product.imageUrl;
    img.alt = product.name;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.classList.add("img-fluid", "rounded");

    const tdPrice = document.createElement("td");
    tdPrice.innerText = product.price;
    tdPrice.classList.add("align-middle");

    const tdActions = document.createElement("td");
    const btnEdit = document.createElement("a");
    btnEdit.classList.add("btn", "btn-primary", "w-100", "mb-2");
    btnEdit.innerText = "Edit";
    btnEdit.href = `editProduct.html?id=${product._id}`;
    tdActions.appendChild(btnEdit);
    tdActions.classList.add("align-middle");

    

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger","w-100", "mt-2");
    btnDelete.innerText = "Delete";
    tdActions.appendChild(btnDelete);
    btnDelete.addEventListener("click", async () => {
        try {
            await fetch(`https://striveschool-api.herokuapp.com/api/product/${product._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authorization}`,
                },
            });
            await fetchProducts();
        } catch (e) {
            console.log("Error deleting product:", e);
        }
    });

    tr.append(tdName, tdDescription, tdBrand, tdImage, tdPrice, tdActions);
    return tr;
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
        await fetch("https://striveschool-api.herokuapp.com/api/product/",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${authorization}`,
                    'Content-Type': "application/json",
                },
            }
        );
        await fetchProducts();
    } catch (e) {
        console.log("Error fetching products:", e);
    }
}



