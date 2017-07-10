import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fieldModel from './restore.js';
import { newSudoku } from './restore.js'



class Square extends React.Component {

  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Squareinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      className:'square-input'
  };
  
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event) {
  const x = this.props.reactKey;
  const y = this.props.idRow;
  const currentV = Number(event.target.value);
  console.log(y)
  this.setState({className:'square-input'});
  this.setState({value:event.target.value});

  for (var i = 0; i < fieldModel.fieldModel.length; i++) {
    var X=fieldModel.fieldModel[i][x];
    var Y=fieldModel.fieldModel[y][i];
    if ((currentV===X || currentV===Y) &&
      event.target.value!==' '
      ) 
      {
        this.setState({className:'square-input-red'});
      }
  }
  console.log(event.target.value)
}

  render() {
    return (
      <input className={this.state.className} value={this.state.value} onChange={this.handleChange}>
        
      </input>
    );
  }
}

class RefreshButton extends React.Component {
  render() {
    return (
      <button className="refresh" onClick={() => this.props.onClick()} >
      </button>
    );
  }
}


class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      arr: fieldModel.fieldModel
    }
  }

  handleClick() {
    newSudoku()
    const arr = this.state.arr;
    this.setState({arr: arr});
  }

  renderRefreshButton() {
    return (
        <RefreshButton  
          onClick={() => this.handleClick()} 
        />
      );
  }

  renderSquare(i,index) {
    return <Square key={index.toString()} value={i} />;
  }

  renderSquareinput(i,index,I) {
    return <Squareinput key={index.toString()} idRow={I} reactKey={index.toString()} />;
  }

  render() {
    return (
      <div>
      {this.renderRefreshButton()}
          {
            this.state.arr.map((V,I,A) => 
            <div key={I}  className="board-row">
              {V.map((v,i,a) => (v ===' ') ? this.renderSquareinput(v,i,I) : this.renderSquare(v,i))}
            </div>
          )}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);