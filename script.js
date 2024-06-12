async function fetchCSV() {
    const response = await fetch('names.csv');
    const data = await response.text();
    return data;
}

function csvToJSON(csv) {
    const lines = csv.trim().split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const currentline = lines[i].split(',').map(item => item.trim());
        result.push({ name: currentline[0] }); // Assuming each line has only one name
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
