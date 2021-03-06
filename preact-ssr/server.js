import {h} from 'preact';
import {render} from 'preact-render-to-string';
import App from './src/App';
import getFacts from './src/facts';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
const app = new express();

app.use(express.static(path.resolve(__dirname, '../public')));

const index = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8');

app.get('/facts', cors(), (req, res) => {
    const a = [{
        text: '文本1'
    }, {
        text: '文本2'
    }];
    res.json(a);
})

app.get('/ssr', (req, res) => {
    getFacts().then(facts => {
        const html = render(< App facts={facts} />);
        const factsHtml = index.replace('<!-- :: APP :: -->', html);
        const finalHtml = factsHtml.replace('/** ::FACTS:: **/', JSON.stringify(facts));
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(finalHtml);
    })
})

app.listen(8091, '127.0.0.1', () => {
    console.log('server begin on 8091');
});