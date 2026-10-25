import {loadData} from './api.js';
import {renderTable} from './table.js';

export async function refresh() {
    const status = document.getElementById('status');
    const button = document.getElementById('refresh');
    button.disabled = true;
    status.textContent = 'Завантаження відправлень…';
    try {
        const data = await loadData();
        renderTable(data);
        status.textContent = data.length ? `Завантажено відправлень: ${data.length}` : 'Відправлень поки немає.';
    } catch (error) {
        document.getElementById('postings').replaceChildren();
        status.textContent = `Не вдалося завантажити відправлення. ${error.message}`;
    } finally {
        button.disabled = false;
    }
}
document.getElementById('refresh').addEventListener('click', refresh);
refresh();
