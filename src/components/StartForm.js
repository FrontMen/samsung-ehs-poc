import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export class StartForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <Button
          color="primary"
          variant="contained"
          onClick={this.continue}
        >Start</Button>
      </MuiThemeProvider>
    );
  }
}

export default StartForm;
