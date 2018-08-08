import React, { Component } from 'react';
import AccountCodeInput from './components/AccountCodeInput'
import EmailInput from './components/EmailInput';

class App extends Component {
  constructor() {
    super();
    this.state = {
      account: {}
    }
  }

  setAccount = ( payload ) => this.setState({ account: payload})

  render() {
    return (
      <div>
        <AccountCodeInput setAccount= {this.setAccount} account={this.state.account}/>
        <AccountCodeInput setAccount= {this.setAccount} account={this.state.account}/>
        <EmailInput setAccount= {this.setAccount} account={this.state.account}/>
        <EmailInput setAccount= {this.setAccount} account={this.state.account}/>
      </div>
    );
  }
}

export default App;
