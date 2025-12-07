import { Helmet } from 'react-helmet-async';
import HeaderLogo from '../../components/shared-components/header-logo/header-logo';
import HeaderNav from '../../components/shared-components/header-nav/header-nav';

function ErrorScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Error</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Something went wrong...</h1>
            <div className="login__form form">
              <p className="login__text">Try restarting the page🙂</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ErrorScreen;
