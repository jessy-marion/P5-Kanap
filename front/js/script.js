const productSection = document.querySelector("#items");

fetch("http://localhost:3000/api/products")
  .then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    let products = value;
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      let productLink = document.createElement("a");
      productLink.setAttribute("href", `./product.html?id=${products[i]._id}`);
      let article = document.createElement("article");
      let productImg = document.createElement("img");
      productImg.setAttribute("src", `${products[i].imageUrl}`);
      productImg.setAttribute("alt", `${products[i].altTxt}`);
      let productName = document.createElement("h3");
      productName.classList.add("productName");
      productName.innerHTML = `${products[i].name}`;
      let productDescription = document.createElement("p");
      productDescription.classList.add("productDescription");
      productDescription.innerHTML = `${products[i].description}`;

      productSection.append(productLink);
      productLink.append(article);
      article.append(productImg, productName, productDescription);
    }
  })
  .catch((err) => {
    console.error("ERREUR CRITIQUE");
    let errorMessage = document.createElement("p");
    errorMessage.innerHTML =
      "Veuillez nous excuser, il nous ai impossible d'afficher les articles pour le moment";
    productSection.append(errorMessage);
  });

// function createProduct() {
//   let productLink = document.createElement("a"); //no sabe
//   let article = document.createElement("article");
//   let productImg = document.createElement("img");
//   productImg.setAttribute("src", `${products[i].imageUrl}`);
//   productImg.setAttribute("alt", `${products[i].altTxt}`);
//   let productName = document.createElement("h3");
//   productName.classList.add("productName");
//   let productDescription = document.createElement("p");
//   productDescription.classList.add("productDescription");

//   productSection.append(productLink);
//   productLink.append(article);
//   article.append(productImg, productName, productDescription);
// }
