

function getRecommendations(){
    const divInfo = document.getElementById('info');
    const results = document.getElementById('results');
    const userSearch = document.getElementById('recommendationInput').value.toLowerCase().trim();
    const apiURL = "travel_recommendation_api.json"
    
    divInfo.innerHTML = "";
    results.innerHTML = '';

    fetch(apiURL)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then(recommendations => {
            if (userSearch.includes('beach')){
                const beaches = recommendations.beaches;
                beaches.forEach(beach => {
                    results.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}" class="card-image">
                                        <h3 class="card-title">${beach.name}</h3>
                                        <p class="card-description">${beach.description}</p>`
                });  
            }else if(userSearch.includes('temple')){
                const temples = recommendations.temples;
                temples.forEach(temple => {
                    results.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}" class="card-image">
                                        <h3 class="card-title">${temple.name}</h3>
                                        <p class="card-description">${temple.description}</p>`
                }); 
            }else if (userSearch.includes('country') || userSearch.includes('countries')){
                const countries = recommendations.countries;
                countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.innerHTML += `
                            <div class="recommendation-card">
                                <img src="${city.imageUrl}" alt="${city.name}" class="card-image">
                                <h3 class="card-title">${city.name}</h3>
                                <p class="card-description">${city.description}</p>
                            </div>`;
                    });
                });
            }else{
                console.log('Invalid search');
                results.innerHTML += "<p>Invalid Search</p> ";
            }
            
        })
        .catch(error => console.error(error))
}

const searchButton = document.getElementById('btnSearch');
searchButton.onclick = getRecommendations;


function clearResults() {
    document.getElementById('recommendationInput').value = "";
    document.getElementById('results').innerHTML = "";
}

const clearButton = document.getElementById('btnClear');
clearButton.addEventListener('click', clearResults);



