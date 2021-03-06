//const request = await fetch(endpoint).then(blob => blob.json()).then(date =>console.log(data));

async function windowActions() {
  const search = document.querySelector("#search");
//  const radio = document.querySelector("#searchBy");
  const searchByName = document.querySelector("#name");
  const searchByFoodType = document.querySelector("#foodType");
  const searchByZipCode = document.querySelector("#zipCode");
  const filteredList = document.querySelector("#filteredList");

  let filteredPlaces = [];
  let searchType = "name";

  function findMatches(wordToMatch, places) {
    return places.filter(place => {
      const regex = new RegExp(wordToMatch, "gi");
      return place.name.match(regex);
    });
  }
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function displayMatch() {
    fetch("/api")
      .then(res => res.json())
      .then(json => {
        filteredPlaces = findMatches(search.value, json);
        removeChildren(filteredList);
        filteredPlaces.forEach(place => {
          filteredList.insertAdjacentHTML(
            "beforeend",
            `<li class='card mt-4'>
              <div class="card-content">
                  <div class="content">
                      <p class="title is-3">${place.name}</p>
                      <p class="subtitle is-5">${place.category}</p>
                      <address>${place.address_line_1}<br/>${place.address_line_2}<br/>
                          ${place.city}, ${place.state}. ${place.zip}</address>
                  </div>
              </div>
              </li>`
          );
        });
      });
  }

  search.addEventListener("change", displayMatch);
  search.addEventListener("keyup", displayMatch);
//  radio.addEventListener("change", displayMatch);
}
window.onload = windowActions;
