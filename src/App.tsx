import './App.css';
import { Fragment } from 'react';
import Router from './routes/index';
import 'bulma/css/bulma.css';

import React from 'react';
import Global from './styles/global';

function App() {
  return (
    <Fragment>
      <Global /> <Router />
    </Fragment>
  );
}

export default App;
