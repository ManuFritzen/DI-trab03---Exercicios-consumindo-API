 // Caminho relativo para o arquivo JSON local
 const jsonPath = '../paises.json';

 // Função para obter e exibir os dados do país selecionado
 function getCountryData() {
     const select = document.getElementById('countries');
     const selectedCountryName = select.value;

     fetch(jsonPath)
         .then(response => response.json())
         .then(data => {
             const selectedCountry = data.find(country => country.nome_pais === selectedCountryName);
             const countryDataDiv = document.getElementById('countryData');
             
             // Limpar dados anteriores
             countryDataDiv.innerHTML = '';

             // Exibir os dados do país selecionado
             for (const key in selectedCountry) {
                 const p = document.createElement('p');
                 p.innerHTML = `<strong>${key}:</strong> ${selectedCountry[key]}`;
                 countryDataDiv.appendChild(p);
             }
         })
         .catch(error => console.error('Erro ao obter dados do país:', error));
 }

 document.addEventListener('DOMContentLoaded', function () {
     // Função para buscar e preencher o select com os países
     function fetchCountries() {
         fetch(jsonPath)
             .then(response => response.json())
             .then(data => {
                 const select = document.getElementById('countries');
                 data.forEach(country => {
                     const option = document.createElement('option');
                     option.value = country.nome_pais;
                     option.text = country.nome_pais;
                     select.appendChild(option);
                 });
             })
             .catch(error => console.error('Erro ao buscar países:', error));
     }

     // Chamar a função para preencher o select quando a página carregar
     fetchCountries();
 });