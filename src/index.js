import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import App from './containers/App'
import ReduxToastr from 'react-redux-toastr';

var initialState = {
}


let store = configureStore(initialState)

render(
  <Provider store={store}>
    <div>
      <App />
      <ReduxToastr
        timeOut={1000}
        newestOnTop={false}
        position="top-left"/>
    </div>
  </Provider>,
  document.getElementById('root')
);
