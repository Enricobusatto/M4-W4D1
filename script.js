function fetchProducts() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTA4MDE1ODYsImV4cCI6MTc1MjAxMTE4Nn0.xhkKzesrQbsg05eG0q_X5718-KDBF6O110MAHGmTcKo"
        }
    })
        .then(response => (response.json()))
        .then(data => {
            console.log(data);
            createCards(data);
        });
}

function createCards(shoes) {
    const row = document.querySelector(".row");
    shoes.map(shoe => {

        const col = document.createElement("div");
        col.classList.add("col", "col-3-md", "rounded", "mb-4");
        row.append(col);

        const card = document.createElement("div");
        card.classList.add("card", "h-80", "shadow", "border-0");
        col.append(card);

        const cardImg = document.createElement("img");
        cardImg.src = shoe.imageUrl;
        cardImg.classList.add("card-img-top", "rounded", "img-fluid");
        cardImg.alt = shoe.name;
        card.append(cardImg);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.append(cardBody);

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "fw-bold", "mt-2");
        cardTitle.innerText = shoe.name;
        cardBody.append(cardTitle);

        const cardText = document.createElement("p");
        cardText.classList.add("card-text", "mt-2");
        cardText.innerText = shoe.description;
        cardBody.append(cardText);

        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-text", "text-success", "fw-bold", "fs-3");
        cardPrice.innerText = shoe.price + "€";
        cardBody.append(cardPrice);

        const cardBtns = document.createElement("div");
        cardBtns.classList.add("d-flex", "gap-2");
        cardBody.append(cardBtns);

        const cardBtnAddToCart = document.createElement("button");
        cardBtnAddToCart.classList.add("btn", "btn-primary");
        cardBtnAddToCart.innerText = "Aggiungi al carrello";
        cardBtns.append(cardBtnAddToCart);

        const cardBtnDetails = document.createElement("button");
        cardBtnDetails.classList.add("btn", "btn-secondary");
        cardBtnDetails.innerText = "Dettagli";
        cardBtnDetails.addEventListener("click", () => {
            window.location.href = `details.html?id=${shoe._id}`;
        });

        cardBtns.append(cardBtnDetails);



        return col;
        console.log(shoe.name, shoe.description, shoe.imageUrl, shoe.brand, shoe.price
        )
    })

}
fetchProducts();



// fetch("https://striveschool-api.herokuapp.com/api/product/"),
//     headers {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTA4MDE1ODYsImV4cCI6MTc1MjAxMTE4Nn0.xhkKzesrQbsg05eG0q_X5718-KDBF6O110MAHGmTcKo"
// }


// Modal
//     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                     ...
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="button" class="btn btn-primary">Save changes</button>
//                 </div>
//             </div>
//         </div>
//     </div>