let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

let cartSection = document.getElementById("cart__items"); // ===> completer les attributs data-id...
cartSection.setAttribute;

function fetchProduct() {
  fetch("http://localhost:3000/api/products")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      console.log(products);

      cart.forEach((element) => {
        for (let i = 0; i < products.length; i++) {
          if (element.id == products[i]._id) {
            console.log("yo ça marche !!", products[i]);
            insertElements(products[i]);

            // let color = document.createElement("p");
            // color.innerText = `${cart.color}`;
          } else {
            console.log("non");
          }
        }
      });
    });
}

function insertElements(element) {
  let product = document.createElement("article");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("cart__item__img");
  let img = document.createElement("img");
  img.setAttribute("src", `${element.imageUrl}`);
  img.setAttribute("alt", `${element.altTxt}`);
  let contentContainer = document.createElement("div");
  contentContainer.classList.add("cart__item__content");
  let cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  let productName = document.createElement("h2");
  productName.innerText = `${element.name}`;
  // let color = document.createElement("p");
  // color.innerText = `${cart.color}`;
  let price = document.createElement("p");
  price.innerText = `${element.price} €`;
  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  let cardItemContentSettingsQuantity = document.createElement("div");
  cardItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  let quantity = document.createElement("p");
  quantity.innerText = `Qté : {}`;
  let input = document.createElement("input");
  input.setAttribute("type", `number`);
  input.setAttribute("name", `itemQuantity`);
  input.setAttribute("min", `1`);
  input.setAttribute("max", `100`);
  input.setAttribute("value", ``); //à completer
  input.classList.add("itemQuantity");
  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  let deleteItem = document.createElement("div");
  deleteItem.classList.add("deleteItem");
  deleteItem.innerText = "Supprimer";

  cartSection.append(product);
  product.append(imgContainer, contentContainer);
  imgContainer.append(img);
  contentContainer.append(cartItemContentDescription, cartItemContentSettings);
  cartItemContentDescription.append(productName, /*color,*/ price);
  cartItemContentSettings.append(
    cardItemContentSettingsQuantity,
    cartItemContentSettingsDelete
  );
  cardItemContentSettingsQuantity.append(quantity, input);
  cartItemContentSettingsDelete.append(deleteItem);
}

fetchProduct();

//a faire ! couleur/quantité manquants
