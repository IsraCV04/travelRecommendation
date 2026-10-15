function getRecommendations(){
    const apiURL = "./travel_recommendation_api.json"
    fetch(apiURL)
        .then(response => {
            if(!response.ok){
                throw new Error('HTTP Error: ${response.status}')
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(error))
}