function buttonCart() {
    let buttons = document.querySelectorAll('.addTrip')
    for(let i = 0; i < buttons.length; i ++) {
        buttons[i].addEventListener('click', function() {
            console.log(('CLICK oKKKKKK BUTONNNNNNNN'));
            let price = Number(buttons[i].previousElementSibling.previousElementSibling.textContent)
            console.log('PRICE ===>', price);
            let hour = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.textContent
            console.log('HOUR ===>', hour);

            let arrival = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            console.log('ARRIVAL ===>', arrival);

            let departure = buttons[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            console.log('DEPARTURE ===>', departure);


            fetch('http://localhost:3000/carts/newCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({departure: departure, arrival: arrival, date: hour, price: price}),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                        // document.querySelector('#cartContainer').innerHTML += `
                        // <span class="cities">${data.carts.departure} > ${data.carts.arrival}</span>
                        // <span class="hour"> ${data.carts.date}</span>
                        // <span class="price">${data.carts.price}$</span>
                        // <button class="deleteCart" id='${data.carts.date}'>✖</button>`;
                    // deleteCart();
                    window.location.assign('cart.html')
                });

                
                // declarer dep arr date price 
                
            })
    }
}




function showTrips(data) {
    if(data.trips.length) {
    
        console.log('IF FONCTION', data.trips);
    
        for(let trip of data.trips) {
    
            console.log('FOR FONCTION', trip);

            const hours = new Date(trip.date).getHours()
            const minutes = new Date(trip.date).getMinutes()

            const date = `${hours}:${minutes}`
    
            document.querySelector('#resultContainer').innerHTML += `
            <div class="result">
        <span class="cities">${trip.departure}</span> <span> > </span> <span>${trip.arrival}</span>
        <span class="hour"> ${date}</span>
        <span class="price">${trip.price}</span>  <span> $ </span>
        <span class="addTrip" id="${trip.date}">Book</span>
    </div>`
            
        }

        // buttonCart()

        // fonction change page boutton
    } else {

        console.log('ELSE FONCTION');
        document.querySelector('#list').innerHTML = `
        <div id="list" class="card">
        <img src="./images/notfound.png" />
        <p id="tripNotFound">Trip not found</p>
        <div id="resultContainer"></div>
        </div>`
    }
}



function tripHome() {

    document.querySelector('#searchTrip').addEventListener('click', function() {
    
        const departure = document.querySelector('#departure').value
        const arrival = document.querySelector('#arrival').value
        const dateReq = document.querySelector('#date').value
        const newDate = new Date(dateReq)
        const date = newDate.toLocaleDateString()
    
        console.log('click OK !!');
    
        fetch('http://localhost:3000/trips/searchTrips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({departure: departure, arrival: arrival, date: date}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.trips);
    
            if(document.querySelector('#tripNotFound') && document.querySelector('img')){
    
                console.log('PREMIER IF');
                
                document.querySelector('#tripNotFound').remove()
                document.querySelector('img').remove()
                showTrips(data)
                buttonCart()
    
            } else {
    
                console.log('PREMIER ELSE');
                document.querySelector('#list').innerHTML = `<div id="resultContainer"></div>`
                showTrips(data)
                buttonCart()
    
            }
        })
    })
}

tripHome()


