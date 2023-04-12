let priceCount = document.querySelectorAll(".price").value;

//CREATE CART
/*fetch("http://localhost:3000/searchTrips")
  .then((response) => response.json())
  .then((data) => {
    if (data.Trips) {
      for (let i = 0; i < data.Trips.length; i++) {
        document.querySelector("#cartContainer").innerHTML += `
            <div class="cartContainer">
            <span class="cities">${data.Trips[i].departure} > ${data.Trips[i].arrival}</span>
            <span class="hour"> 16:23</span>
            <span class="price">${data.Trips[i].price}$</span>
            <button class="deleteCart" id="${data.Trips[i].departure}" >✖</button>
           </div>`
      }
      deleteCart()
    }
  });*/

//DELETE TRIP
/*function deleteCart() {
  for (let i = 0; i < document.querySelectorAll(".deleteCart").length; i++) {
    document
      .querySelectorAll(".deleteCart")
      [i].addEventListener("click", function () {
        fetch(`http://localhost:3000/trips/searchTrips/${this.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              this.parentNode.remove();
              return (document.querySelector("#count").textContent =
                priceCount);
            }
          });
      });
  }
}*/

//ADD CART
document.querySelector(".addTrip").addEventListener("click", function () {
  const tripCities = document.querySelector("#cities").value;
  const tripHour = document.querySelector("#hour").value;
  const tripPrice = document.querySelector("#price").value;

  fetch("http://localhost:3000/searchTrips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      departure: departure,
      arrival: arrival,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector("#cartContainer").innerHTML += `
        <span class="cities">${tripCities}</span>
        <span class="hour">${tripHour}</span>
        <span class="price">${tripHour}</span>
        <button class="deleteCart">✖</button>`
        document.querySelector("#count").textContent = priceCount
        //DELETE
        for (let i = 0; i < document.querySelectorAll(".delete").length; i++) {
          document.querySelectorAll(".delete")
            [i].addEventListener("click", function () {
              this.parentNode.remove();
              return (document.querySelector("#count").textContent =
                priceCount -= priceCount);
            });
        }
      }
    });
});
