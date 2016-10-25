import { connect } from 'react-redux';
import { buttonClick, scanDevice, getDeviceInfo } from '../actions/actions';
import Remote from '../components/Remote';

const mapStateToProps = (state) => {
  return {
    deviceList: state.remoteReducer.deviceList,
    newAdded: state.remoteReducer.newAdded,
    deviceInfo: state.remoteReducer.deviceInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBtnClick: (host, btnId) => {
      if (host) {
        dispatch(buttonClick(host, btnId));
      }
    },
    onScanClick: () => {
      dispatch(scanDevice());
    },
    getDeviceInfo: (host) => {
      dispatch(getDeviceInfo(host));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Remote);

