import { Helmet } from 'react-helmet-async';
import Header from '../../components/shared-components/header/header';

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
      <main className="page__main page__main--not-found">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Something went wrong...</h1>
            <div className="login__form form">
              <button className="login__text" onClick={restarter}>Try again🙂</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ErrorScreen;
