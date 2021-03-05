const request = await fetch(endpoint).then(blob => blob.json()).then(date =>console.log(data));

function findMatches(wordToMatch, foods) {
    return foods.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex)
    });
}
function displayMatch(){
   const matchArray = findMatches(this.value, foods);
   const html = matchArray.map(place => {
    return `
    <li> 
    <span class="name"> ${place.name} </span>
    <span class="category"> ${place.category} </span> 
    <span class="address"> ${place.address_line_1}, ${place.city}, ${place.zip} </span> 
    </li>`
   }).join('');
   suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);
const foods = await request.json()