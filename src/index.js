import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import GameLoop from './Components/GameLoop.js';
import { store } from './Store/store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <GameLoop />
  </Provider>,
  document.getElementById('root')
);