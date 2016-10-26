import React from 'react';
import {TextField, RaisedButton, RadioButtonGroup, RadioButton, SelectField, MenuItem, FloatingActionButton} from 'material-ui';
import {BUTTON_HOME, BUTTON_SELECT, BUTTON_BACK, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT} from '../actions/const';
import {List, ListItem} from 'material-ui/List';
import SettingsRemote from 'material-ui/svg-icons/action/settings-remote';
import {toastr} from 'react-redux-toastr';
import ActionInfo from 'material-ui/svg-icons/action/info';
const ipc = require('electron').ipcRenderer;

const styles = {
  block: {
    maxWidth: 250
  },
  radioGroup: {
    float: 'left',
    width: 200
  },
  hostConfg: {
    float: 'left',
    width: '100%',
    clear: 'both'
  },
  hostContainer: {
    flat: 'left'
  },
  radioButton: {
    marginBottom: 16
  },
  buttonContainer: {
    float: 'left',
    width: '100%'
  },
  scanButton: {
    position: 'absolute',
    marginTop: 25,
    marginLeft: 20
  },
  logo: {
    width: 300,
    height: 'auto',
    padding: 20,
    marginLeft: -20
  },
  infoContainer: {
    float: 'left',
    marginTop: 10
  }
};
class Remote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option: 'select'
    };
    this.deviceList = this.props.deviceList.map(d=>d);
    const keyMaps = {
      Up: BUTTON_UP,
      Down: BUTTON_DOWN,
      Left: BUTTON_LEFT,
      Right: BUTTON_RIGHT,
      Backspace: BUTTON_BACK,
      Esc: BUTTON_HOME,
      Enter: BUTTON_SELECT
    };
    ipc.on('key-pressed', (sender, message) => {
      this.props.onBtnClick(this.state.host, keyMaps[message]);
    });
  }

  _onOptionChange(evt, value) {
    this.setState({option: value});
  }

  _onHostSelected(evt, value) {
    this.setState({selectedHost: value, host: this.props.deviceList[value]});
    this.props.getDeviceInfo(this.props.deviceList[value]);
  }

  _scan() {
    this.props.onScanClick();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.deviceList.length > this.deviceList.length){
      toastr.success('Device found', this.props.newAdded);
      this.deviceList = this.props.deviceList.map(d=>d);
    }
  }

  render() {
    return (
      <div className="remoteContainer">
        <img style={styles.logo} src="./src/images/roku.svg"/>
        <div style={styles.hostConfig}>
          <RadioButtonGroup
            name="hostOption"
            defaultSelected="select"
            style={styles.radioGroup}
            onChange={this._onOptionChange.bind(this)}
          >
            <RadioButton
              value="manual"
              label="Set manually"
              style={styles.radioButton}
            />
            <RadioButton
              value="select"
              label="Selected from"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <div style={styles.hostContainer}>
            {
            this.state.option === 'select' ?
            (
            <div>
              <SelectField
                floatingLabelText="IP Address"
                value={this.state.selectedHost}
                onChange={this._onHostSelected.bind(this)}
              >
                {
                this.props.deviceList.map( (device,idx) =>
                <MenuItem key={idx} value={idx} primaryText={device} />
                )
                }
              </SelectField>
              <FloatingActionButton
                style={styles.scanButton} mini={true}
                onClick={this._scan.bind(this)}
              >
                <SettingsRemote />
              </FloatingActionButton>
            </div>
            )
            :
            <TextField
              hintText="Device's IP address"
            />
            }
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <RaisedButton label="HOME" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_HOME)} />
          <RaisedButton label="SELECT" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_SELECT)} />
          <RaisedButton label="BACK" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_BACK)} />
          <RaisedButton label="UP" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_UP)} />
          <RaisedButton label="DOWN" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_DOWN)} />
          <RaisedButton label="LEFT" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_LEFT)} />
          <RaisedButton label="RIGHT" onClick={()=>this.props.onBtnClick(this.state.host, BUTTON_RIGHT)} />
        </div>
        <div style={styles.infoContainer}>
          {
          this.props.deviceInfo ?
            <List>
              <ListItem primaryText={this.props.deviceInfo['serial-number']} leftIcon={<ActionInfo />} />
              <ListItem primaryText={this.props.deviceInfo['model-number']} leftIcon={<ActionInfo/>} />
              <ListItem primaryText={this.props.deviceInfo['model-name']} leftIcon={<ActionInfo/>} />
              <ListItem primaryText={this.props.deviceInfo['software-version']} leftIcon={<ActionInfo/>} />
              <ListItem primaryText={this.props.deviceInfo['software-build']} leftIcon={<ActionInfo/>} />
            </List>
            : null
          }
        </div>
      </div>
      );
}
}


export default Remote;

