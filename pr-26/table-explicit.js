// Початковий варіант із пункту 4: п'ять клітинок створюються окремо.
export function renderTable(data) {
    const body = document.getElementById('postings');
    body.replaceChildren();
    for (const model of data) {
        const row = document.createElement('tr');
        const contentCell = document.createElement('td');
        contentCell.textContent = model.content;
        row.appendChild(contentCell);
        const fromCell = document.createElement('td');
        fromCell.textContent = model.from;
        row.appendChild(fromCell);
        const toCell = document.createElement('td');
        toCell.textContent = model.to;
        row.appendChild(toCell);
        const typeCell = document.createElement('td');
        typeCell.textContent = model.deliveryType;
        row.appendChild(typeCell);
        const weightCell = document.createElement('td');
        weightCell.textContent = model.weight;
        row.appendChild(weightCell);
        body.appendChild(row);
    }
}
