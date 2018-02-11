import { h, render } from 'preact';
import App from './App';
import getFacts from './facts';

if (window.__facts__) {
    renderApp(window.__facts__);
} else {
    getFacts().then(renderApp);
}

function renderApp(facts) {
    render(
        <App facts={facts}/>,
        document.querySelector('body'),
        document.querySelector('#root')
    );
}

