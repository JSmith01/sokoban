import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { useHashLocation } from 'wouter/use-hash-location';
import { Router } from 'wouter';

const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <Router hook={useHashLocation}>
            <App />
        </Router>
    </Provider>
  </StrictMode>,
)
