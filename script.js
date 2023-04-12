document.querySelector('#searchTrip').addEventListener('click', function() {

    // document.querySelectorAll('#result').remove()

	const departure = document.querySelector('#departure').value
    const arrival = document.querySelector('#arrival').value
	const dateReq = document.querySelector('#date').value

    console.log('TYPE OF DATE VALUE', typeof(dateReq));

    const newDate = new Date(dateReq)

    const date = newDate.toLocaleDateString()

    console.log(departure);
    console.log(arrival);
    console.log(date);

    console.log('click OK !!');

    fetch('http://localhost:3000/trips/searchTrips', {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({departure: departure, arrival: arrival, date: date}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.trips);
        if(data.trips.length) {

            console.log('IF', data.trips);

            document.querySelector('#tripNotFound').remove()
            document.querySelector('img').remove()

            for(let trip of data.trips) {

                console.log('FOR', trip);

                document.querySelector('#resultContainer').innerHTML += `
                <div class="result">
            <span class="cities">${trip.departure} > ${trip.arrival}</span>
            <span class="hour"> ${trip.date}</span>
            <span class="price">${trip.price}$</span>
            <span><a href="cart.html">Book</a></span>
        </div>`
                
            }
        } else {
            document.querySelector('#tripNotFound').textContent = 'Trip not found'
        }
    })
})