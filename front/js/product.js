/******** product ***********/

let colorsChoice = document.getElementById("colors");
let quantityInput = document.getElementById("quantity");

//Get the id of the selected product on the URL
const productID = new URL(window.location.href).searchParams.get("id");


// fetch the api and take only the selected product/object
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
      

      // color/quantity selection & save the datas in an object
      // let color = null;
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
        if (/*color != null &&*/ color != "" && quantity > 0) {
          let product = {
            id: selectedProduct._id,
            color: color,
            quantity: parseInt(quantity),
          };
          
          addCart(product);
        } else {
          console.error("pas de quantité ni couleurs");
        }

        
      });
    })
    .catch((err) => {
      console.error("ERREUR CRITIQUE");
      });
}

// HTML elements/attributes/nodes
function insertElements(product) {
  document.title = `${product.name}`;

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

//take the object and convert it in JSON
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//create an array on the LocalStorage or convert JSON => obj
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

//get the product
function addCart(product) {
  let cart = getCart();
  
  let foundProduct = cart.find(
    (element) => element._id == product._id && element.color == product.color
  );
  

  if (foundProduct != undefined) {
    foundProduct.quantity += product.quantity
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

fetchProduct();


