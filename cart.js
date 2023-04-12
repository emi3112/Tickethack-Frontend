// let priceCount = document.querySelectorAll(".price").value;

// function deleteCart() {
// 	for (let i = 0; i < document.querySelectorAll('.deleteCart').length; i++) {
// 		document.querySelectorAll('.deleteCart')[i].addEventListener('click', function () {
// 			fetch(`http://localhost:3000/carts/deleteCart/${this.id}`, { method: 'DELETE' })
// 				.then(response => response.json())
// 				.then(data => {
// 					if (data.result) {
// 						this.parentNode.remove();
// 					}
// 				});
// 		});
// 	}
// }





function getCarts() {
	fetch('http://localhost:3000/carts/showCarts').then(response => response.json()).then(data => {
		if(data.carts) {
			console.log(data.carts);
			document.querySelector('.p0').remove()
			document.querySelector('.p1').remove()
			for(let cart of data.carts) {
				document.querySelector('#pageContainer').innerHTML += `
				<div id="myCart">
				    <h1>
			   	         My cart
				    </h1>
				        <div class="cartContainer">
				  <span class="cities">${cart.departure} > ${cart.arrival}</span>
					<span class="hour"> ${cart.date}</span>
					<span class="price">${cart.price}</span>  <span> $ </span>
					<button class="deleteCart">✖</button>
				</div>
				<div id="cost">
				  <div id="total">
					<span>Total</span>
					<span id="count"> 103 </span>  <span> $ </span>
			    </div>
				</div>
			  	    <a href="booking.html">Purchase</a>
				</div>
			    </div> 
		    `
			}
		}
	})
}

getCarts()