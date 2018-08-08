import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { App } from "./Components/App"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
    HashRouter, 
    Route, 
    Switch,  
    NavLink,
    BrowserRouter
} from 'react-router-dom'
import TestComponent from './remote-components/TestComponent';

//Store
export var store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
  ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <NavLink to='/Test'>Test</NavLink>
                <NavLink to='/'>Home</NavLink>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route path='/Test' component={TestComponent} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

window.store = store;

/*
 * 
 *   connect([mapStateToProps(state, [ownProps]): stateProps], [mapDispatchToProps(dispatch, [ownProps]): dispatchProps], [mergeProps(stateProps, dispatchProps, ownProps): props], [options])
 *  NB: mapStateToProps is optionally passed "ownProps" by connect. otherwise, this.props would be inaccessible.
 */
