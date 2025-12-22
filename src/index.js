import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store_fr from './gerer_les_projets_freelance/store_fr';
import App_fr from './gerer_les_projets_freelance/app_freelance';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store_fr}> 
       <BrowserRouter basename="/projet_freelance">
            <App_fr /> 
        </BrowserRouter>
        </Provider> 
            
  </React.StrictMode>
);