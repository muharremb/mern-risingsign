import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import * as picActions from './store/pics';
import jwtFetch from './store/jwt';


const initialState = {
  

}

let store = configureStore(initialState);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.picActions = picActions;
  window.jwtFetch = jwtFetch;


}


function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);