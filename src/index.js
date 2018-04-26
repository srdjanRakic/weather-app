import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import promiseFinally from 'promise.prototype.finally';
import stores from './stores';

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();

// No data can be mutated outside of stores
useStrict(true);

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
registerServiceWorker();
