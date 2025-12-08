import { Helmet } from 'react-helmet-async';
import Header from '../../components/shared-components/header/header';
import './error-screen.css';

type ErrorScreenProps = {
  restarter: () => void;
}

function ErrorScreen({ restarter } : ErrorScreenProps): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Error</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--error">
        <div className="page__error-container container">
          <section className="error">
            <h1 className="error__title">Something went wrong with loading data from server...</h1>
            <div className="error__form form">
              <button className="error__button button" onClick={restarter}>
                Try again
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ErrorScreen;
