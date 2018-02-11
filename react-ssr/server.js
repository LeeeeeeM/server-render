import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/App';
import getFacts from './src/facts';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
const app = new express();

const index = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8');

app.get('/facts', cors(), (req, res) => {
    const a = [{
        text: '文本1'
    }, {
        text: '文本2'
    }];
    res.json(a);
})

app.get('/', (req, res) => {
    getFacts().then(facts => {
        const html = renderToString(< App facts={facts} />);
        const finalHtml = index.replace('<!-- :: APP :: -->', html);
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(finalHtml);
    })
})

app.listen(8091, '127.0.0.1', () => {
    console.log('server begin on 8091');
});