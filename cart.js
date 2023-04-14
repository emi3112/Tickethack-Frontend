function deleteCart() {
  for (let i = 0; i < document.querySelectorAll(".deleteCart").length; i++) {
    document
      .querySelectorAll(".deleteCart")
      [i].addEventListener("click", function () {
        fetch(`http://localhost:3000/carts/deleteCart/${this.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              this.parentNode.remove();
              return (document.querySelector("#count").textContent = basketValue -= parseFloat(basketValue[i].previousElementSibling.previousElementSibling.textContent));

            }
          });
      });
  }
}

fetch("http://localhost:3000/carts/showCarts")
  .then((response) => response.json())
  .then((data) => {
    if (data.carts) {
      //console.log(data.carts);

      document.querySelector(".p0").remove();
      document.querySelector(".p1").remove();

      document.querySelector("#pageContainer").innerHTML = `
		<div id="myCart">
			<h1>My cart</h1>
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
      //deleteCart();
      
    }
  });

function cartBasket() {
  const basket = document.querySelectorAll(".price");
  let basketValue = 0;

  for (let i = 0; i < basket.length; i++) {
    basketValue += parseFloat(basket[i].textContent);
  }
  document.querySelector("#count").textContent = basketValue;
  deleteCart();
}
