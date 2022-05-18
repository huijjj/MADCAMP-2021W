import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root.js';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'paybooc',
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <Root />
  </MuiThemeProvider>,
  document.getElementById('root')
);

