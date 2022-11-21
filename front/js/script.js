/******** index ***********/

const productSection = document.getElementById("items");

//get array products, then browse it & display the html with createProduct()

fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    for (let i = 0; i < products.length; i++) {
      createProduct(products[i]);
    }
  })
  .catch((err) => {
    console.error("ERREUR CRITIQUE");
    let errorMessage = document.createElement("p");
    errorMessage.innerText =
      "Veuillez nous excuser, il nous ai impossible d'afficher les articles pour le moment";
    productSection.append(errorMessage);
  });


// HTML elements/attributes/nodes

function createProduct(product) {
  let productLink = document.createElement("a");
  productLink.setAttribute("href", `./product.html?id=${product._id}`);
  let article = document.createElement("article");
  let productImg = document.createElement("img");
  productImg.setAttribute("src", `${product.imageUrl}`);
  productImg.setAttribute("alt", `${product.altTxt}`);
  let productName = document.createElement("h3");
  productName.classList.add("productName");
  productName.innerText = `${product.name}`;
  let productDescription = document.createElement("p");
  productDescription.classList.add("productDescription");
  productDescription.innerText = `${product.description}`;

  productSection.append(productLink);
  productLink.append(article);
  article.append(productImg, productName, productDescription);
}
