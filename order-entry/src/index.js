import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './node_modules/reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// you might notice that this is in a node_modules folder. the ukranian guy did this to help with sorting his app and importing things. one can import index.js files from a folder within a node modules folder by simply importing '{the folde name}'
// this is nice because you no longer need to worry about relative locations.



// this fancy thing  just creates the store as something that i can view in with the redux Devtools chrome extension
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
  ));

ReactDOM.render(
        //the Provider (imported from 'react-redux' gives its 'children' access to the store much like line 25 gives the console access to the store.)
        <Provider store={store}>
            <App />
        </Provider>
    , document.getElementById('root'));


//gives console access to the store. (store.getState() is a useful function here if you didn't want to use the DevTools extension)
window.store = store



// one thing i didn't do in my page is implement a router. its not too hard, but ukrainian udemy guy uses an old version so don't be confused when that doesn't work. 
// they completely redid the router library
// https://redux.js.org/advanced/usagewithreactrouter

