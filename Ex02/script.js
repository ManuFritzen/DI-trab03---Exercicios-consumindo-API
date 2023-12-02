const getElement = (id) => document.getElementById(id);
const fetchAndDisplay = async (url, elementId, errorMessage, dataProcessor) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        dataProcessor(data, elementId);
    } catch (error) {
        alert(errorMessage);
        console.error(error);
    }
};
const displayResult = (data, elementId) => {
    const element = getElement(elementId);
    element.innerHTML = JSON.stringify(data, null, 2);
};

getElement("searchZipCodeButton").addEventListener("click", () => {
    const zipCode = getElement("zipcode").value;
    const url = `https://brasilapi.com.br/api/cep/v1/${zipCode}`;
    fetchAndDisplay(url, "zipCodeResult", "CEP não encontrado", displayResult);
});

getElement("searchTaxIdButton").addEventListener("click", () => {
    const taxId = getElement("tax-id").value;
    const url = `https://brasilapi.com.br/api/cnpj/v1/${taxId}`;
    fetchAndDisplay(url, "taxIdResult", "CNPJ não encontrado", displayResult);
});

getElement("searchAreaCodeButton").addEventListener("click", () => {
    const areaCode = getElement("area-code").value;
    const url = `https://brasilapi.com.br/api/ddd/v1/${areaCode}`;
    fetchAndDisplay(url, "areaCodeResult", "DDD não encontrado", displayResult);
});

fetchAndDisplay("https://brasilapi.com.br/api/cptec/v1/cidade/rio%20grande", "part1Result", "Cidade não encontrada", (cities, elementId) => {
    const city = cities.find(c => c.estado === "RS" && c.nome === "Rio Grande");
    if (city) getElement(elementId).innerHTML = `${city.nome}-${city.estado}`;
});

fetchAndDisplay("https://brasilapi.com.br/api/ibge/uf/v1/mg", "part2Result", "Estado não encontrado", (stateInfo, elementId) => {
    const { nome, sigla, regiao: { nome: regiaoNome, sigla: regiaoSigla } } = stateInfo;
    getElement(elementId).innerHTML = `${nome}-${sigla}, ${regiaoNome}-${regiaoSigla}`;
});

fetchAndDisplay("https://brasilapi.com.br/api/taxas/v1/cdi", "part3Result", "Taxa não encontrada", (cdiValue, elementId) => {
    const { nome, valor } = cdiValue;
    getElement(elementId).innerHTML = `${nome} - ${valor}`;
});

const fetchDataAndValidate = async (inputId, url, dataProcessor, validSetter) => {
    const inputValue = getElement(inputId).value;
    const fullUrl = `https://brasilapi.com.br/api/${url}/${inputValue}`;
    try {
        const response = await fetch(fullUrl);
        const responseData = await response.json();
        validSetter(responseData.message === undefined || responseData.message === null);
        dataProcessor(responseData);
    } catch (error) {
        console.error(error);
    }
};

const searchZipCode = () => fetchDataAndValidate("zipcode", "cep/v1", (zipCodeResponse) => {
    
}, (valid) => zipCodeValid = valid);

const searchTaxId = () => fetchDataAndValidate("tax-id", "cnpj/v1", (taxIdResponse) => {
    
}, (valid) => taxIdValid = valid);

const searchAreaCode = () => fetchDataAndValidate("area-code", "ddd/v1", (areaCodeResponse) => {
    
}, (valid) => areaCodeValid = valid);

const createFormResponse = () => {
    const div = getElement("exercise2");
    const divResponse = document.createElement("div");
    divResponse.className = "form-response";
    divResponse.id = "formResponse";

    const addInfoSection = (title, data) => {
        const sectionTitle = document.createElement("h2");
        sectionTitle.innerText = title;
        sectionTitle.className = "lateral-padding";
        divResponse.appendChild(sectionTitle);

        for (const [key, value] of Object.entries(data)) {
            const infoParagraph = document.createElement("p");
            infoParagraph.innerText = `${key}: ${value}`;
            divResponse.appendChild(infoParagraph);
        }
    };

    
    div.appendChild(divResponse);
};

getElement("formButton").disabled = true;
getElement("formButton").addEventListener("click", () => {
    const formResponse = getElement("formResponse");
    if (formResponse) formResponse.remove();
    createFormResponse();
});

const validateFormResponses = () => {
    getElement("formButton").disabled = !(zipCodeValid && taxIdValid && areaCodeValid);
};

const formatDate = (date) => date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);