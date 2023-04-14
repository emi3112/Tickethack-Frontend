// ================================================= CONSTANTE DIV ===============================================

// div qui contient les nouveaux trajets
const newCartContainer = 
`<div id="myCart">
    <h1>
        My cart
    </h1>
    <div id="cart"></div>
    <div id="cost">
	<div id="total">
		<span>Total</span>
		<span id="count"> </span> <span> $ </span>
    </div>
	    <span id="purchaseButton" type="submit">Purchase</span>
    </div>
    </div>
</div> `


// div panier vide
const noDivCart = 
`<p class="p0">No tickets in your cart.</p>
<p class="p1">Why not plan a trip?</p>
`

// ===================================================== NEW CART DATA =====================================================

// prend en paramètre la data du fetch show cart (find)
function loopNewCart(data) {
	for (let cart of data.carts) {
		// ajoute data perso pour chaque carte existante de la db 
		document.querySelector("#cart").innerHTML += `
		<div class="cartContainer">
			<span class="cities">${cart.departure} > ${cart.arrival}</span>
			<span class="hour"> ${cart.date}</span>
			<span class="price">${cart.price}</span>  <span> $ </span>
			<button class="deleteCart" id="${cart.date}" >✖</button>
		</div> `;
	}
}
// =============================================== FETCH SI AFFICHE CARTS OU NO CARTS ======================================

function newFetch() {
	fetch('http://localhost:3000/carts/showCarts').then(response => response.json()).then( data => {
		if(!data.carts.length) {
			// no traject
			document.querySelector('#pageContainer').innerHTML = noDivCart
		} else {
			// new container cart traject 
			document.querySelector('#pageContainer').innerHTML = newCartContainer
			// new cart add with function
			loopNewCart(data)
			// active purchase button
			const purchase = document.getElementById('purchaseButton')
			purchaseButton(purchase, data)
		}
		// rappel de delete pour réactiver les addListenner
		deleteCart();
		// rappel de calcul du total du panier
		totalPrice()
	});
}
// call fetch
newFetch()



// ========================================= FONCTION DELETE CART =================================================

function deleteCart() {
	let buttonsDelete =  document.querySelectorAll(".deleteCart")
    // let counterDeleted = document.querySelector("#count").textContent

	// loop sur tous les boutons delete du container cart
    for (let i = 0; i < buttonsDelete.length; i++) {
		buttonsDelete[i].addEventListener("click", function () {
        fetch(`http://localhost:3000/carts/deleteCart/${this.id}`, 
		{method: "DELETE",})
            .then((response) => response.json())
            .then((data) => {
				// {result: true, length: data.length} ==> return quand fetch la cart avec bouton 
				if (data.result === true && data.length > 0) {
					this.parentNode.remove();
					// rappel recalcul total quand on remove la cart 
					totalPrice()
				} else {
					// remet le cart vide si pas de data.length
					document.querySelector('#pageContainer').innerHTML = noDivCart			
				}
				});
		});
	}
}
	
	
// ========================================= FONCTION TOTAL PRICE =================================================

function totalPrice() {

	// ajoute chaque prix en les transformant en number (car string quand fetch)
    const basket = document.querySelectorAll(".price");
    let basketValue = 0;
	
    for (let i = 0; i < basket.length; i++) {
    basketValue += parseFloat(basket[i].textContent);
    }
    document.querySelector("#count").textContent = basketValue;
}


// ================================== FONCTION PURCHASE BUTTON CLICK ============================================
// function buttonCart() {
//     let buttons = document.querySelectorAll('.addTrip')
//     for(let i = 0; i < buttons.length; i ++) {
//         buttons[i].addEventListener('click', function() {
//             console.log(('CLICK oKKKKKK BUTONNNNNNNN'));
//             let price = Number(buttons[i].previousElementSibling.previousElementSibling.textContent)
//             console.log('PRICE ===>', price);
//             let hour = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.textContent
//             console.log('HOUR ===>', hour);

//             let arrival = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
//             console.log('ARRIVAL ===>', arrival);

//             let departure = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
//             console.log('DEPARTURE ===>', departure);


//             fetch('http://localhost:3000/carts/newCart', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({departure: departure, arrival: arrival, date: hour, price: price}),
//             }).then(response => response.json())
//                 .then(data => {
//                     console.log(data);
//                     window.location.assign('cart.html')
//                 });
//             })
//     }
// }


// function purchaseButton(purchase, data) {
//         purchase.addEventListener('click', function() {
//             console.log('CLICKKKKKKKK')
// 			for(let cart of data.carts)  {
// 				const departure = cart.departure
// 				const arrival = cart.arrival
// 				const date = cart.date
// 				const price = cart.price
				
// 				fetch('http://localhost:3000/carts/newCart', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({departure: departure, arrival: arrival, date: date, price: price}),
//                 }).then(response => response.json())
//                 .then(data => {
//                     console.log(data);
//                 });
//             }
// 			// window.location.assign('booking.html')
// 	})
// }


