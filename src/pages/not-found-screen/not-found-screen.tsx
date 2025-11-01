import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Not found</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404. Page not found</h1>
            <div className="login__form form">
              <p className="login__text">The page you are looking for does not exist.</p>
              <Link
                className="login__submit form__submit button"
                to="/"
                style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
              >
                Back to main page
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;