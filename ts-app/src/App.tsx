import * as React from 'react';
import './App.css';

interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

interface IState {
  currentEnthusiasm: number;
  rotation: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentEnthusiasm: props.enthusiasmLevel || 1,
      rotation: 0
    };
  }

  public onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  public onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);




  public render() {
    // const {name} = this.props;
    // const { currentEnthusiasm } = this.state
    // if (currentEnthusiasm <= 0 ) {
    //   throw new Error("You could be a little more enthusiastic. :D");
    // }

    // function getExclamationMarks(numChars: number) {
    //   return Array(numChars + 1).join('!');
    // }    
    return <div>
            {/* <div className="app">
              <div className="greeting">
                Hello {name + getExclamationMarks(currentEnthusiasm)}
              </div>
              <button onClick={this.onDecrement}>-</button>
              <button onClick={this.onIncrement}>+</button>
            </div> */}
          </div>
  }

  public updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({currentEnthusiasm});
  }
}

export default App;
