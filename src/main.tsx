import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';

import { DataContextProvider } from './dataContext';
import { Page } from './Page';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <DataContextProvider>
      <Page />
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
