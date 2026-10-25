export function createCell(fieldName, model) {
    const cell = document.createElement('td');
    const value = model[fieldName];
    cell.textContent = value == null ? '' : String(value);
    return cell;
}

export function renderTable(data) {
    const body = document.getElementById('postings');
    const columns = document.querySelectorAll('#table-header th[x-column]');
    body.replaceChildren();
    for (const model of data) {
        const row = document.createElement('tr');
        for (const column of columns) {
            row.appendChild(createCell(column.getAttribute('x-column'), model));
        }
        body.appendChild(row);
    }
}
