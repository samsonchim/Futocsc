async function fetchCSV() {
    const response = await fetch('names.csv');
    const data = await response.text();
    return data;
}

function csvToJSON(csv) {
    const lines = csv.trim().split('\n');
    const result = [];
    const headers = lines[0].split(',').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
        const currentline = lines[i].split(',').map(item => item.trim());
        if (currentline.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
    }

    return result;
}

async function searchName() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const csvData = await fetchCSV();
    const jsonData = csvToJSON(csvData);
    const results = jsonData.filter(record => record.name.toLowerCase().includes(searchInput));

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const div = document.createElement('div');
            div.textContent = `Name: ${result.name}`;
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.textContent = 'No results found';
    }
}
