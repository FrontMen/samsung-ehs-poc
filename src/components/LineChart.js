import React from 'react';
import { Line } from 'react-chartjs-2';

let EHS_ID;

const getData = ({ values }) => {
  const { LOCATION, TARGET_INDOOR_TEMPERATURE, EMITTER_TYPE, HOUSE_CONSTRUCTION_YEAR, HEATED_AREA_M2 } = values;
  const plottedTemps = [-20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const lwsTemps = [-20, -15, -10, -7, -2, 2, 7, 10, 15, 20];
  const EHS = {
    AE050RXYDEG: {
      35: [3.40, 4.26, 4.90, 5.10, 4.95, 4.80, 5.00, 5.46, 6.23, 7.00],
      55: [null, null, 4.15, 4.67, 4.12, 3.84, 4.30, 4.76, 5.51, 6.25],
    },
    AE080RXYDEG: {
      35: [5.33, 6.25, 7.49, 7.35, 7.18, 7.00, 8.00, 8.79, 10.10, 11.41],
      55: [null, null, 6.33, 5.71, 6.03, 5.85, 7.10, 7.45, 8.76, 10.08],
    },
    AE120RXYDEG: {
      35: [9.35, 10.49, 11.56, 12.00, 11.40, 10.80, 12.00, 13.25, 15.32, 17.40],
      55: [null, null, 9.78, 9.87, 9.88, 9.92, 11.30, 11.58, 13.33, 15.08],
    },
    AE160RXYDEG: {
      35: [11.30, 12.87, 14.11, 14.60, 13.90, 13.20, 16.00, 17.38, 19.69, 22.00],
      55: [null, null, 11.94, 12.86, 11.63, 10.03, 15.00, 15.12, 17.23, 19.33],
    },
  }

  const locations = {'Barcelona': {designTemp: 2, rangeValue: 0}, 'Vilnius': {designTemp: 0, rangeValue: 1}};
  const heatingLoads = {'old':[90, 180], 'medium':[70, 90], 'new':[40, 60]};
  const houseHeatingLoadRangeValue = locations[LOCATION].rangeValue;
  const houseDesignTemp = locations[LOCATION].designTemp;
  const getHeatingLoadAtLocation = () => (HEATED_AREA_M2 * heatingLoads[HOUSE_CONSTRUCTION_YEAR][houseHeatingLoadRangeValue]) / 1000;
  const houseHeatingLoadAtLocation = [{x: houseDesignTemp, y: getHeatingLoadAtLocation()}];

  const getEhsId = () => {
    return Object.keys(EHS).reduce((acc, id) => {
      if (!acc) {
        if (houseDesignTemp === 2) {
          if (EHS[id][EMITTER_TYPE][5] > houseHeatingLoadAtLocation[0].y) acc = id;
        }
        if (houseDesignTemp === 0) {
          const y = (EHS[id][EMITTER_TYPE][4] + EHS[id][EMITTER_TYPE][5]) / 2
          if (y > houseHeatingLoadAtLocation[0].y) acc = id;
        }
      }
      return acc;
    }, '');
  }

  const getDynamicData = (ehsId, lwt) => lwsTemps.map((lwsTemp, i) => { 
    return {x: lwsTemp, y: EHS[ehsId][lwt][i]}
  });

  // const getHouseHeatingLoadData = () => {
  //   const x = getHouseHeatingLoadAtLocation() / (TARGET_INDOOR_TEMPERATURE - getHouseDesignTemp());
  //   const data = plottedTemps.map((temp) => { return {x: temp, y: x*(TARGET_INDOOR_TEMPERATURE-temp)}});
  //   return data;
  // }

  EHS_ID = getEhsId();
  let data;
  if (EHS_ID) {
    data = {
      labels: plottedTemps,
      datasets: [
        // {
        //   label: "AE050RXYDEG - " + EMITTER_TYPE,
        //   backgroundColor: "transparent",
        //   borderColor: "lightgrey",
        //   data: getDynamicData("AE050RXYDEG", EMITTER_TYPE),
        // }, 
        // {
        //   label: "AE080RXYDEG - " + EMITTER_TYPE,
        //   backgroundColor: "transparent",
        //   borderColor: "lightgrey",
        //   data: getDynamicData("AE080RXYDEG", EMITTER_TYPE),
        // }, 
        // {
        //   label: "AE120RXYDEG - " + EMITTER_TYPE,
        //   backgroundColor: "transparent",
        //   borderColor: "lightgrey",
        //   data: getDynamicData("AE120RXYDEG", EMITTER_TYPE),
        // }, 
        // {
        //   label: "AE160RXYDEG - " + EMITTER_TYPE,
        //   backgroundColor: "transparent",
        //   borderColor: "lightgrey",
        //   data: getDynamicData("AE160RXYDEG", EMITTER_TYPE),
        // }, 
        {
          label: EHS_ID + " - " + EMITTER_TYPE,
          backgroundColor: "transparent",
          borderColor: "blue",
          data: getDynamicData(EHS_ID, EMITTER_TYPE),
        }, 
        {
          label: `House in ${LOCATION}`,
          backgroundColor: "green",
          borderColor: "green",
          data: houseHeatingLoadAtLocation,
        },
        // {
        //   label: `House Heating Load`,
        //   backgroundColor: "lightgrey",
        //   borderColor: "lightgrey",
        //   data: getHouseHeatingLoadData(),
        // }, 
      ]
    };
  }

  return data;
}

const options = {
  tension: .25,
};

const LineChart = (values) => (
  (getData(values)) 
    ? <>
        <h4>We determined that the following EHS is best suited for the given environment.</h4>
        <h3><strong>EHS ID: {EHS_ID}</strong></h3>
        <Line data={getData(values)} options={options} />
        <br />
      </>
    : <h4>All installations of single EHS solutions are out of range.</h4>
);

export default LineChart;