const firstApiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC')`;
const secondApiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2011')`;
const thirdApiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2017')`;

document.getElementById('btnPromiseAny').addEventListener('click', async () => {
    const apiUrls = [firstApiUrl, secondApiUrl, thirdApiUrl];
    try {
        const result = await Promise.any(apiUrls.map(apiUrl => fetch(apiUrl).then(response => response.json())));
        document.getElementById('resultPromiseAny').innerText = JSON.stringify(result);
    } catch (error) {
        document.getElementById('resultPromiseAny').innerText = `Erro: ${error.message}`;
    }
});

document.getElementById('btnPromiseRace').addEventListener('click', async () => {
    const apiUrls = [firstApiUrl, secondApiUrl, thirdApiUrl];

    try {
        const result = await Promise.race(apiUrls.map(apiUrl => fetch(apiUrl).then(response => response.json())));
        document.getElementById('resultPromiseRace').innerText = JSON.stringify(result);
    } catch (error) {
        document.getElementById('resultPromiseRace').innerText = `Erro: ${error.message}`;
    }
});

document.getElementById('btnPromiseAll').addEventListener('click', async () => {
    const apiUrls = [firstApiUrl, secondApiUrl, thirdApiUrl];

    try {
        const results = await Promise.all(apiUrls.map(apiUrl => fetch(apiUrl).then(response => response.json())));
        document.getElementById('resultPromiseAll').innerText = JSON.stringify(results);
    } catch (error) {
        document.getElementById('resultPromiseAll').innerText = `Erro: ${error.message}`;
    }
});
