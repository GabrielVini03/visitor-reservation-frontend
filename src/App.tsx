import './App.css';
import { Fragment } from 'react';
import Router from './routes/index';
import 'bulma/css/bulma.css';

import React from 'react';
import Bulma from './styles/bulma.';

function App() {
  return (
    <Fragment>
      <Bulma /> <Router />
    </Fragment>
  );
}

export default App;
