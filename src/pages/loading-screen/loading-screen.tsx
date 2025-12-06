import { Helmet } from 'react-helmet-async';
import HeaderLogo from '../../components/header-logo/header-logo';
import HeaderNav from '../../components/header-nav/header-nav';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Loading</title>
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
            <h1 className="login__title">Loading...</h1>
            <div className="login__form form">
              <p className="login__text">Fetching some data from server. Please wait🙂</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoadingScreen;
