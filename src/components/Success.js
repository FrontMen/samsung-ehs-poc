import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import LineChart from './LineChart';
import Button from '@material-ui/core/Button';

export class Success extends Component {
  exit = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.resetStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='md'
          >
            <AppBar title="Success" />
            <h1>Thank You For Your Submission</h1>
            <LineChart values={this.props.values} />
            <Button
              color="#fff"
              variant="contained"
              onClick={this.back}
            >Back</Button>
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.exit}
            >Close</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;
