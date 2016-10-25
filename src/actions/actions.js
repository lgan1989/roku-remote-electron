const ipc = require('electron').ipcRenderer;
const {parseString} = require('xml2js');


import {
  BUTTON_CLICK,
  DEVICE_FOUND,
  DEVICE_INFO
} from './const';

const ACTION_MAP = {
  BUTTON_HOME: 'home',
  BUTTON_BACK: 'back',
  BUTTON_SELECT: 'select',
  BUTTON_UP: 'up',
  BUTTON_DOWN: 'down',
  BUTTON_LEFT: 'left',
  BUTTON_RIGHT: 'right'
};

function requestSent(btnId) {
  return {
    type : BUTTON_CLICK,
    btnId: btnId
  }
}

function deviceFound(data) {
  return {
    type: DEVICE_FOUND,
    data: data
  }
}

function deviceInfo(data) {
  return {
    type: DEVICE_INFO,
    data: data
  }
}

//http://172.18.5.94:8060
//

export const getDeviceInfo = (host) => {
  return dispatch => {
    return fetch (`http://${host}/query/device-info` , {
      method: 'GET',
    })
    .then(response => response.text())
    .then(response => {
      parseString(response, (err, result) => {
        dispatch(deviceInfo(result['device-info']))
      });
    })
  }
}

export const buttonClick = (host, btnId) => {
  return dispatch => {
    const key = ACTION_MAP[btnId];
    return fetch (`http://${host}/keypress/${key}` , {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: '',
      mode: 'no-cors'
    })
    .then(() => dispatch(requestSent(btnId)))
  }
}

export const scanDevice = () => {
  return dispatch => {
    ipc.send('scan-device');
    ipc.on('device-found', (sender, response) => {
      dispatch( deviceFound(response) );
    });
  }
}
