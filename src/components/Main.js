//require('../styles/style.scss');

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RemoteContainer from '../containers/RemoteContainer';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

class AppComponent extends React.Component {
  render() {

    return (
      <MuiThemeProvider>
      <div>
        <RemoteContainer/>
      </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
