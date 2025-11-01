import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Not found</title>
      </Helmet>

      <main className='page__main page__main--not-found'>
        <h1>404. Page not found</h1>
        <Link to="/">Back to main page</Link>
      </main>
    </div>
  );
}

export default NotFoundScreen;