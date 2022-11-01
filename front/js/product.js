const productID = new URL(window.location.href).searchParams.get("id");

let colorsChoice = document.getElementById("colors");
let quantityInput = document.getElementById("quantity");

function fetchProduct() {
  fetch("http://localhost:3000/api/products")
    .then((res) => {
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
      insertElements(selectedProduct);

      let color = "none";
      colorsChoice.addEventListener("change", (e) => {
        color = e.target.value;
      });
      let quantity = 0;
      quantityInput.addEventListener(
        "input",
        (e) => (quantity = e.target.value)
      );
      const addToCartBtn = document.getElementById("addToCart");
      addToCartBtn.addEventListener("click", (e) => {
        let product = {
          id: selectedProduct._id,
          price: selectedProduct.price,
          color: color,
          quantity: parseInt(quantity),
        };

        addCart(product);
      });
    });
}

function insertElements(product) {
  let imgContainer = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.setAttribute("src", `${product.imageUrl}`);
  productImg.setAttribute("alt", `${product.altTxt}`);

  let productName = document.getElementById("title");
  productName.innerText = `${product.name}`;
  let productPrice = document.getElementById("price");
  productPrice.innerText = `${product.price}`;
  let productDescription = document.getElementById("description");
  productDescription.innerText = `${product.description}`;

  for (let i = 0; i < product.colors.length; i++) {
    let colors = document.createElement("option");
    colors.setAttribute("value", `${product.colors[i]}`);
    colors.innerText = `${product.colors[i]}`;
    colorsChoice.append(colors);
  }
  imgContainer.append(productImg);
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addCart(product) {
  let cart = getCart();
  console.log(cart);
  let foundProduct = cart.find(
    (element) => element._id == product._id && element.color == product.color
  );
  console.log(foundProduct);

  if (foundProduct != undefined) {
    foundProduct.quantity += foundProduct.quantity;
    console.log(foundProduct);
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

fetchProduct();
