import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

