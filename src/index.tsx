import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  </React.StrictMode>
);
