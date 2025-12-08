import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { store } from './store';
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction } from './store/api-actions';
import HistoryRouter from './components/routes/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </HistoryRouter>
  </HelmetProvider>
);
