import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { LOCATION, TARGET_INDOOR_TEMPERATURE, EMITTER_TYPE, HOUSE_CONSTRUCTION_YEAR, HEATED_AREA_M2 }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='md'
          >
            <AppBar title="Confirm you entry" />
            <List>
              <ListItem>
                <ListItemText primary="LOCATION" secondary={LOCATION} />
              </ListItem>
              <ListItem>
                <ListItemText primary="TARGET_INDOOR_TEMPERATURE" secondary={TARGET_INDOOR_TEMPERATURE} />
              </ListItem>
              <ListItem>
                <ListItemText primary="EMITTER_TYPE" secondary={EMITTER_TYPE} />
              </ListItem>
              <ListItem>
                <ListItemText primary="HOUSE_CONSTRUCTION_YEAR" secondary={HOUSE_CONSTRUCTION_YEAR} />
              </ListItem>
              <ListItem>
                <ListItemText primary="HEATED_AREA_M2" secondary={HEATED_AREA_M2} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirm</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
