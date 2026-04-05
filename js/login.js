function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user === "thungan" && pass === "123"){

window.location.href = "cashier.html";

}else{

document.getElementById("popup").style.display="flex";

}

}

function closePopup(){

document.getElementById("popup").style.display="none";

}
