import {
  BUTTON_CLICK,
  BUTTON_UP,
  BUTTON_DOWN,
  BUTTON_LEFT,
  BUTTON_RIGHT,
  DEVICE_FOUND,
  DEVICE_INFO
} from '../actions/const';

const initialState = {
  deviceList: []
};

const handleAction = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case BUTTON_CLICK:
      //process
      newState = Object.assign({}, state);
      newState.keyPressed = action.btnId;
      return newState;
      break;
    case DEVICE_FOUND:
      newState = Object.assign({}, state);
      if (newState.deviceList.indexOf(action.data) === -1){
        newState.deviceList.push( action.data );
        newState.newAdded = action.data;
      }
      else{
        return state;
      }
      return newState;
    case DEVICE_INFO:
      newState = Object.assign({}, state);
      newState.deviceInfo = action.data;
      return newState;
    default:
      break;
  }
  return state;
}

export default handleAction;

