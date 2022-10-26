const productID = new URL(window.location.href).searchParams.get("id");
console.log(productID);

fetch("http://localhost:3000/api/products")
  .then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i]._id === productID) {
        return value[i];
      }
    }
  })
  .then((selectedProduct) => {
    console.log(selectedProduct);
    //
    let imgContainer = document.querySelector(".item__img");
    //
    let productImg = document.createElement("img");
    productImg.setAttribute("src", `${selectedProduct.imageUrl}`);
    productImg.setAttribute("alt", `${selectedProduct.altTxt}`);

    let productName = document.querySelector("#title");
    productName.innerHTML = `${selectedProduct.name}`;
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = `${selectedProduct.price}`;
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = `${selectedProduct.description}`;
    let productColor = document.querySelector("#colors");
    //

    //ajouter les couleurs

    //
    imgContainer.append(productImg);
  });
