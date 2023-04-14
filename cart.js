function cartBasket() {
  const basket = document.querySelectorAll(".price");
  let basketValue = 0;

  for (let i = 0; i < basket.length; i++) {
    basketValue += parseFloat(basket[i].textContent);
  }
  document.querySelector("#count").textContent = basketValue;
  deleteCart();
}


function deleteCart() {
  let buttonsDelete =  document.querySelectorAll(".deleteCart")
  let counterDeleted = document.querySelector("#count").textContent
  for (let i = 0; i < buttonsDelete.length; i++) {
    buttonsDelete[i].addEventListener("click", function () {
        fetch(`http://localhost:3000/carts/deleteCart/${this.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              this.parentNode.remove();
              counterDeleted -= parseFloat(buttonsDelete[i].previousElementSibling.previousElementSibling.textContent);
            }
          });
      });
  }
  cartHome()
}

function cartHome() {
	
	fetch('http://localhost:3000/carts/showCarts').then(response => response.json()).then( data => {
		if(!data.carts.length) {
			document.querySelector('#pageContainer').innerHTML = `
			<p class="p0">No tickets in your cart.</p>
			<p class="p1">Why not plan a trip?</p>`
		} else {
			document.querySelector('#pageContainer').innerHTML = `
			<div id="myCart">
			<h1>
			My cart
			</h1>
			<div id="cart"></div>
			<div id="cost">
			    <div id="total">
					<span>Total</span>
					<span id="count"> </span> <span> $ </span>
			</div>
			    <a href="booking.html">Purchase</a>
			</div>
			</div>
		</div> `;

      for (let cart of data.carts) {
        document.querySelector("#cart").innerHTML += `
			<div class="cartContainer">
                <span class="cities">${cart.departure} > ${cart.arrival}</span>
                <span class="hour"> ${cart.date}</span>
                <span class="price">${cart.price}</span>  <span> $ </span>
                <button class="deleteCart" id="${cart.date}" >✖</button>
            </div> `;
      }
      cartBasket();
      deleteCart();
      
    }
  });}

  cartHome()








