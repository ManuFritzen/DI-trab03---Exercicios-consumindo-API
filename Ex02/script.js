const apiUrl = 'https://brasilapi.com.br/api/';

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = JSON.stringify(results, null, 2);
}

function getRandomCep() {
    fetch(apiUrl + 'cep/v2') 
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Erro ao obter CEP aleatório:', error));
}

function getRandomCnpj() {
    fetch(apiUrl + 'cnpj/v1')
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Erro ao obter CNPJ aleatório:', error));
}

function getRandomWeather() {
    fetch(apiUrl + 'cptec/v1/clima/previsao')
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Erro ao obter previsão do tempo aleatória:', error));
}

function handleSubmit(event, endpoint) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryParam = formData.get(formData.keys().next().value);

    fetch(apiUrl + endpoint + '/v1/' + queryParam)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error(`Erro ao obter dados para ${endpoint}:`, error));
}