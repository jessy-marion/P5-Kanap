/*********** confirmation ***********/

//remove localStorage
localStorage.removeItem("cart");

//get orderId in the Url
const orderId = new URL(window.location.href).searchParams.get("id");

//confirmation message
let idMessage = document.getElementById("orderId");
idMessage.innerText = `${orderId}`