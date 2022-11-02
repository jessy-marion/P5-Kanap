//get data on the LocalStorage
const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart[0].id);

let cartSection = document.getElementById("cart__items");
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerText = `${cart.reduce((acc, obj) => {
  return acc + obj.quantity;
}, 0)}`;
let totalPrice = document.getElementById("totalPrice");
totalPrice.innerText = `${cart.reduce((acc, obj) => {
  return acc + obj.price;
}, 0)}`;

//fetch the api and insert HTML/DOM elements of the selected products
function fetchProduct() {
  fetch("http://localhost:3000/api/products")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      console.log(products);

      cart.forEach((element, index) => {
        for (let i = 0; i < products.length; i++) {
          if (element.id == products[i]._id) {
            insertElements(products[i], cart[index]);
          } else {
            console.log("non");
          }
        }
      });
    });
}

//insert HTML/ DOM elements
function insertElements(element, cart) {
  let product = document.createElement("article");
  product.classList.add("cart__item");
  product.setAttribute("data-id", `${cart.id}`);
  product.setAttribute("data-color", `${cart.color}`);
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
  let color = document.createElement("p");
  color.innerText = `${cart.color}`;
  let price = document.createElement("p");
  price.innerText = `${element.price} €`;
  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  let cardItemContentSettingsQuantity = document.createElement("div");
  cardItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  let quantity = document.createElement("p");
  quantity.innerText = `Qté : ${cart.quantity}`;
  let input = document.createElement("input");
  input.setAttribute("type", `number`);
  input.setAttribute("name", `itemQuantity`);
  input.setAttribute("min", `1`);
  input.setAttribute("max", `100`);
  input.setAttribute("value", `0`); //à completer
  input.classList.add("itemQuantity");
  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  let deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.innerText = "Supprimer";

  cartSection.append(product);
  product.append(imgContainer, contentContainer);
  imgContainer.append(img);
  contentContainer.append(cartItemContentDescription, cartItemContentSettings);
  cartItemContentDescription.append(productName, color, price);
  cartItemContentSettings.append(
    cardItemContentSettingsQuantity,
    cartItemContentSettingsDelete
  );
  cardItemContentSettingsQuantity.append(quantity, input);
  cartItemContentSettingsDelete.append(deleteItem);

  change(input);
  del(deleteItem, cart);
}

//changes the quantity of a product in the cart
function change(tag, cart) {
  tag.addEventListener("change", () => {
    console.log("test");
    console.log(tag.closest("article"));
  });
}
// delete a product in the cart
function del(tag, cart) {
  tag.addEventListener("click", () => {
    console.log(cart.color);
    console.log(tag.closest("article").dataset.id);
    if (
      tag.closest("article").dataset.id == cart.id &&
      tag.closest("article").dataset.color == cart.color
    ) {
      localStorage.clear(); // supprimer seulement le produit selectionné
    } else {
      console.error("non");
    }
    tag.closest("article").remove();
  });
}

fetchProduct();
