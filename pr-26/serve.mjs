import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,sep,extname} from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
createServer(async (req,res) => {
    let relative;
    try { relative = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
    catch { res.writeHead(400).end(); return; }
    if (relative === '/') relative = '/index.html';
    // Доступні лише статичні файли інтерфейсу в корені практичної.
    const path = resolve(root,'.'+relative);
    if (!path.startsWith(root+sep) || !types[extname(path)] || relative.slice(1).includes('/')) {
        res.writeHead(404).end('Not found'); return;
    }
    try { const content = await readFile(path); res.writeHead(200,{'Content-Type':types[extname(path)]}); res.end(content); }
    catch { res.writeHead(404).end('Not found'); }
}).listen(3000,'127.0.0.1',()=>console.log('Сторінка: http://localhost:3000'));
