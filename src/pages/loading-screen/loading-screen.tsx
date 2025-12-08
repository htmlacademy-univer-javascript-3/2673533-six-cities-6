import { Helmet } from 'react-helmet-async';
import Header from '../../components/shared-components/header/header';
import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Loading</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--loading">
        <div className="page__loading-container container">
          <section className="loading">
            <div className="loading__spinner"></div>
            <h1 className="loading__title">Loading...</h1>
            <div className="loading__message">
              <p className="loading__text">Fetching some data from server. Please wait🙂</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoadingScreen;
