import * as React from 'react';
import './App.css';
import Test from './components/Test'

import logo from './logo.svg';  
import SearchResults from './components/SearchResults';

interface IAppState {
  SearchV: boolean;
  ResultsV: boolean;
  account: Object[];
  input: string;
}

interface IAppProps {

}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      SearchV: false,
      ResultsV: false,
      account: [{}],
      input: ''
    }
  }
  public render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </div>
        <div>
          <p>
            <Test name="Will" />
            <SearchResults 
              setInput={(input: string) => this.setState({input: input})}
              hideSearch={() => this.setState({SearchV: false})} 
              hideResults={() => this.setState({ResultsV: false})} 
              setAccount={(account: Object[]) => this.setState({ account: account})} 
              searchField = {['criteria']}
            />
          </p>
        </div>
      </div>
    );
  }
}

export default App;