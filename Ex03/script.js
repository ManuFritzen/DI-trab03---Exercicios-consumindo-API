document.getElementById("fetchButton").addEventListener("click", fetchData);
document.getElementById("showTableButton").addEventListener("click", showTable);

let selectedOption;
let responseData;

async function fetchData() {
    const selectElement = document.getElementById('metadataSelect');
    selectedOption = selectElement.value;

    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedOption}')`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        responseData = await response.json();
        displayData(responseData, selectedOption);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
}

async function showTable() {
    if (!selectedOption) {
        alert('Escolha um tipo de consulta primeiro.');
        return;
    }

    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedOption}')/Valores`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displayData(data, selectedOption);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
}

function displayData(data, selectedOption) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (data.value && data.value.length > 0) {
        const table = document.createElement('table');
        table.className = 'table-style';

        const headerRow = table.createTHead().insertRow(0);

        const columnNames = Object.keys(data.value[0]);
        columnNames.forEach(columnName => {
            const th = document.createElement('th');
            th.textContent = columnName;
            headerRow.appendChild(th);
        });

        data.value.forEach(item => {
            const row = table.insertRow();
            columnNames.forEach(columnName => {
                const cell = row.insertCell();
                cell.textContent = item[columnName];
            });
        });

        resultDiv.appendChild(table);
    } else {
        resultDiv.textContent = 'Nenhum dado encontrado.';
    }
}
