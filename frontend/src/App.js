import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
    <NavBar />
    <h1>Hello from App Component</h1>
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
    </>
  );
}

export default App;
