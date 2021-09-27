import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='md'
          >
            <h1>Determine optimal EHS</h1>
            <h4>We need some basic information to determine the optimal EHS</h4>
            <AppBar title="Enter User Details" />
            <FormControl fullWidth>
              <InputLabel>LOCATION</InputLabel>
              <Select
                value={values.LOCATION}
                label="LOCATION"
                onChange={handleChange('LOCATION')}
              >
                <MenuItem value={'Barcelona'}>Barcelona</MenuItem>
                <MenuItem value={'Vilnius'}>Vilnius</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>TARGET INDOOR TEMPERATURE</InputLabel>
              <Select
                value={values.TARGET_INDOOR_TEMPERATURE}
                label="TARGET_INDOOR_TEMPERATURE"
                onChange={handleChange('TARGET_INDOOR_TEMPERATURE')}
              >
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>EMITTER TYPE</InputLabel>
              <Select
                value={values.EMITTER_TYPE}
                label="EMITTER TYPE"
                onChange={handleChange('EMITTER_TYPE')}
              >
                <MenuItem value={35}>Under Floor Heating (UFH)</MenuItem>
                <MenuItem value={55}>Radiator</MenuItem>
                <MenuItem value={55}>Radiator and UFH</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>HOUSE CONSTRUCTION YEAR</InputLabel>
              <Select
                value={values.HOUSE_CONSTRUCTION_YEAR}
                label="HOUSE_CONSTRUCTION_YEAR"
                onChange={handleChange('HOUSE_CONSTRUCTION_YEAR')}
              >
                <MenuItem value={'old'}>1977 and older</MenuItem>
                <MenuItem value={'medium'}>from 1978 to 1995</MenuItem>
                <MenuItem value={'new'}>1995 and newer</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              placeholder="HEATED AREA IN M2"
              label="Heated area in m2"
              onChange={handleChange('HEATED_AREA_M2')}
              defaultValue={values.HEATED_AREA_M2}
              margin="normal"
              fullWidth
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
