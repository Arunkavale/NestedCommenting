import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore ,applyMiddleware} from 'redux';

import reducers from './reducers';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk';

const MyAppWithStore = () => (
    <Provider store={createStore(reducers , applyMiddleware(thunk))}>
      <App />
    </Provider>
  );


ReactDOM.render(<MyAppWithStore />,document.querySelector('#root'))
