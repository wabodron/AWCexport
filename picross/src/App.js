import React, { Component } from 'react';
import './App.css'
import Grid from './grid'
import { connect }from 'react-redux'

class App extends Component {
  constructor() {
    super();
    this.state ={
      solved: false,
      data: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    };
  }

  export() {
    let data = this.state.data;
    console.log(Object.values(this.props.grid))
    Object.values(this.props.grid).map((block, index) => {
      let i = Math.floor(index/5);
      let j = index % 5;
      data[i][j] = block.colored ? 1 : 0;
      return '';
    })
    console.log(data);
    this.setState({data: data})
  }
  render() {
    

    return (
      <div className='body'>
        
        <Grid data={this.state.data}/>

        <button onClick={ (e) => {
          e.preventDefault();
          this.export();
        }}>
          Export
          </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grid: state
  }
}

export default connect(mapStateToProps)(App);