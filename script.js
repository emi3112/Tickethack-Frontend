function showTrips(data) {
    if(data.trips.length) {
    
        console.log('IF FONCTION', data.trips);
    
        for(let trip of data.trips) {
    
            console.log('FOR FONCTION', trip);
    
            document.querySelector('#resultContainer').innerHTML += `
            <div class="result">
        <span class="cities">${trip.departure} > ${trip.arrival}</span>
        <span class="hour"> ${trip.date}</span>
        <span class="price">${trip.price}$</span>
        <span class="addTrip">Book</span>
    </div>`
            
        }
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

        } else {

            console.log('PREMIER ELSE');
            document.querySelector('#list').innerHTML = `<div id="resultContainer"></div>`
            showTrips(data)

        }
    })
})


