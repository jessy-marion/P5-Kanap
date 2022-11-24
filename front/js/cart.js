/*********** cart ***********/

//get data inside the LocalStorage
const cart = JSON.parse(localStorage.getItem("cart"));

let cartSection = document.getElementById("cart__items");
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerText = `0`;

let totalPrice = document.getElementById("totalPrice");
let allPrices = [];
let productId = [];
let dataOrder = {
  contact: {},
  products: productId,
};

//regex
let onlyLetters = /^[a-z,.'-]+$/i; 
let numbersAndLetters = /^[a-z\d\s,'-]+$/i;
let emailRegEx = /[\w-]+[\w\.-]*@[\w-]{2,}\.[a-z-]+/i;

//fetch the api and insert HTML/DOM elements of the selected products
function fetchProduct() {
  fetch("http://localhost:3000/api/products")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      
      displayingCart(products);
    })
}

// calculate price/quantity & display the cart
function displayingCart(products) {
  if (cart) {    
  cartSection.innerText = "";
  totalPrice.innerText = "0"; 
  allPrices = [];
  cart.forEach((article, index) => {
    for (let i = 0; i < products.length; i++) {
      if (article.id == products[i]._id) {
        insertElements(products[i], article);
        allPrices.push(products[i].price * article.quantity);
      }
    }
  });
  totalPrice.innerText = `${allPrices.reduce((acc, obj) => {
    return acc + obj;
  })}`;
  totalQuantity.innerText = `${cart.reduce((acc, obj) => {
    return acc + obj.quantity;
  }, 0)}`;
}
}

// ordering & get orderId
function order() {
  let order = document.getElementById("order");
  order.addEventListener("click", (e) => {
    e.preventDefault();

    JSON.parse(localStorage.getItem("cart")).forEach((id, i) => {
      productId.push(JSON.parse(localStorage.getItem("cart"))[i].id);
    });

    //post to server & redirection
    fetch( 
      "http://localhost:3000/api/products/order",
      {
        method: "POST",
        body: JSON.stringify(dataOrder),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
        window.location.href = `./confirmation.html?id=${data.orderId}`
    });
   

    
  });
}

//form validation
function form() {
  let firstName = document.getElementById("firstName");
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  firstName.addEventListener("change", (e) => { 
    if (onlyLetters.test(e.target.value)) {
      dataOrder.contact.firstName = e.target.value;
      firstNameErrorMsg.innerText = "";
    } else {
      firstNameErrorMsg.innerText = `${e.target.value} n'est pas un prénom valide`;
    }
  });

  let lastName = document.getElementById("lastName");
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  lastName.addEventListener("change", (e) => {
    if (onlyLetters.test(e.target.value)) {
      dataOrder.contact.lastName = e.target.value;
      lastNameErrorMsg.innerText = "";
    } else {
      lastNameErrorMsg.innerText = `${e.target.value} n'est pas un nom valide`;
    }
  });

  let address = document.getElementById("address");
  let addressErrorMsg = document.getElementById("addressErrorMsg");

  address.addEventListener("change", (e) => {
    if (numbersAndLetters.test(e.target.value)) {
      dataOrder.contact.address = e.target.value;
      addressErrorMsg.innerText = "";
    } else {
      addressErrorMsg.innerText = `${e.target.value} n'est pas une adresse valide`;
    }
  });

  let city = document.getElementById("city");
  let cityErroMsg = document.getElementById("cityErrorMsg");

  city.addEventListener("change", (e) => {
    if (onlyLetters.test(e.target.value)) {
      dataOrder.contact.city = e.target.value;
      cityErroMsg.innerText = "";
    } else {
      cityErroMsg.innerText = `${e.target.value} n'est pas un lieu valide`;
    }
  });

  let email = document.getElementById("email");
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  email.addEventListener("change", (e) => {
    if (emailRegEx.test(e.target.value)) {
      dataOrder.contact.email = e.target.value;
      emailErrorMsg.innerText = "";
    } else {
      emailErrorMsg.innerText = `${e.target.value} n'est pas une adresse mail valide`;
    }
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
  quantity.innerText = `Qté : `; // !!!!
  let input = document.createElement("input");
  input.setAttribute("type", `number`);
  input.setAttribute("name", `itemQuantity`);
  input.setAttribute("min", `1`);
  input.setAttribute("max", `100`);
  input.setAttribute("value", `0`); 
  input.classList.add("itemQuantity");
  input.value = `${cart.quantity}`
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

  change(input, quantity, cart);
  del(deleteItem, cart);
}

//change the quantity of a product in the cart
function change(element, quantity, selectedProduct) {
  element.addEventListener("change", (e) => {
    if (
      element.closest("article").dataset.id == selectedProduct.id &&
      element.closest("article").dataset.color == selectedProduct.color
    ) {
      if (e.target.value <= 100) {
        
      cart[cart.indexOf(selectedProduct)].quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
    

      selectedProduct.quantity = parseInt(e.target.value);
      fetchProduct();
      // quantity.innerText = `Qté : ${
      //   cart[cart.indexOf(selectedProduct)].quantity 
      // }`;
    }
    }
  });
}

// delete a product in the cart
function del(element, selectedProduct) {
  element.addEventListener("click", () => {

    if (
      element.closest("article").dataset.id == selectedProduct.id &&
      element.closest("article").dataset.color == selectedProduct.color &&
      cart.length > 1
    ) {
      cart.splice(cart.indexOf(selectedProduct), 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      element.closest("article").remove();
      fetchProduct();

      allPrices.splice(cart.indexOf(selectedProduct), 1);
      totalPrice.innerText = `${allPrices.reduce((acc, obj) => {
        return acc + obj;
      })}`;
      totalQuantity.innerText = `${cart.reduce((acc, obj) => {
        return acc + obj.quantity;
      }, 0)}`;
    }
    else if (cart.length == 1) {
      cart.splice(cart.indexOf(selectedProduct), 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.clear();
      element.closest("article").remove();
      allPrices = [];
      totalPrice.innerText = "0"
      totalQuantity.innerText = "0"

    }
  });
}


if (cart) {       
  fetchProduct(); 
  totalQuantity.innerText = `${cart.reduce((acc, obj) => {
    return acc + obj.quantity;
  }, 0)}`;
} else {
  totalQuantity.innerText = "0";
}


form();
order();
