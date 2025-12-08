import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/shared-components/header/header';
import './not-found-screen.css'

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Not found</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <div className="not-found__number">404</div>
            <h1 className="not-found__title">Page not found</h1>
            <p className="not-found__description">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="not-found__actions">
              <Link
                className="not-found__button button"
                to={AppRoute.Main}
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
