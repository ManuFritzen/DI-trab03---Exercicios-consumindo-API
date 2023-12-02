 const jsonPath = '../paises.json';

 function getCountryData() {
     const select = document.getElementById('countries');
     const selectedCountryName = select.value;

     fetch(jsonPath)
         .then(response => response.json())
         .then(data => {
             const selectedCountry = data.find(country => country.nome_pais === selectedCountryName);
             const countryDataDiv = document.getElementById('countryData');
             
             countryDataDiv.innerHTML = '';

             for (const key in selectedCountry) {
                 const p = document.createElement('p');
                 p.innerHTML = `<strong>${key}:</strong> ${selectedCountry[key]}`;
                 countryDataDiv.appendChild(p);
             }
         })
         .catch(error => console.error('Erro ao obter dados do país:', error));
 }

 document.addEventListener('DOMContentLoaded', function () {
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

     fetchCountries();
 });