document.querySelector('#searchTrip').addEventListener('click', function() {
	const departure = document.querySelector('#departure').value
    const arrival = document.querySelector('#arrival').value
	const date = document.querySelector('#date').value

    console.log('click OK !!');

    fetch('http://localhost:3000/trips/searchTrips', {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({departure: departure, arrival: arrival, date: date}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.Trips);
    })
})