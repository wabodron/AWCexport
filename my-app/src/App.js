import CustomerInput from './components/CustomerInput'
import Email from './components/Email'
import React from 'react';
import AddressInput from './components/AddressInput'
import SearchResults from './components/SearchResults'
import { connect } from 'react-redux'
import { clear, setValue } from 'actions'
import { Button } from 'react-bootstrap'
import AccountView from './components/AccountView'


// Technically this shouldn't be a 'stateful component' 
// Stateless components generally are defined as a const variable assigned to an anonymous function that returns the JSX.

class App extends React.Component {
  //this component just creates the layout of the app
  render () {
    return <div style={{padding: "25px"}}>
      <h3>Sales Quotes</h3>
      <input onChange={(e) => {
        if (e.target.value === '/') {
          this.props.setValue('4CTEST    ') 
          }
        }}
      />
      <br/>
      <Button bsStyle='danger' onClick={() => {
        this.props.clear(); 
        this.props.setValue('')
        }}
      >Clear</Button>
      <CustomerInput />
      <Email />
      <AddressInput />
      <SearchResults />
      <br />
      <AccountView />
    </div>
  }
}

function mapStateToProps(state) {
  return {account: state.Search.account }
}

const mapDispatchToProps = {
  clear,
  setValue
}

export default connect(mapStateToProps, mapDispatchToProps)(App);