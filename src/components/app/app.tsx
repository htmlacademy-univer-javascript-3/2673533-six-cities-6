import MainScreen from '../../pages/MainScreen/MainScreen';

type AppProps = {
  placesCount: number;
}

function App({placesCount}: AppProps): JSX.Element {
  return (
    <MainScreen placesCount={placesCount}/>
  );
}

export default App;
