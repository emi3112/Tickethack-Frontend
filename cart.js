let priceCount = document.querySelectorAll(".price").value;

function deleteCart() {
	for (let i = 0; i < document.querySelectorAll('.deleteCart').length; i++) {
		document.querySelectorAll('.deleteCart')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/carts/deleteCart/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

for (let i = 0; i < document.querySelectorAll('.addTrip').length; i++) {
    document.querySelectorAll('.addTrip')[i].addEventListener('click',
      function () {
        console.log(this);
        const date = document.querySelector('.hour').value;
    window.location.assign('cart.html')


	fetch('http://localhost:3000/carts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({date}),
	}).then(response => response.json())
		.then(data => {
				document.querySelector('#cartContainer').innerHTML += `
                <span class="cities">${data.carts.departure} > ${data.carts.arrival}</span>
                <span class="hour"> ${data.carts.date}</span>
                <span class="price">${data.carts.price}$</span>
                <button class="deleteCart" id='${data.carts.date}'>✖</button>`;
            deleteCart();
		});
      }
    );
   }

	
