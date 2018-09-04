import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Routes from './routes'
import './index.css';
import store from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
