import React, { Component, Children } from 'react';
import Node from './Node';
import {Consumer} from '../Context';
import Header from './Header.js'

export default class Board extends Component {
  constructor(){
    super();
    this.createTheBoard=this.createTheBoard.bind(this);
  }
  
  createTheBoard(len,statusArr,colorArr){
    let item=[];
    let sub=[];

    for (let i = 0; i < len*len; i++) {
      sub.push(<Node id={i} initVal={statusArr[i]} bgColor={colorArr[i]} />);
      if(i%len==len-1){
        item.push(<div>{sub}</div>);
        sub=[];
      }
    }
    return item;
  }
  setWinner(win,currentPlayer){
    let arr=[];
    if(win=='' && currentPlayer=='X'){
      arr.push('text-warning','text-success','No Winner');
    }
    if(win=='' && currentPlayer=='O'){
      arr.push('text-warning','text-primary','No Winner');
    }
    if(win=='X' ){
      arr.push('text-success','text-primary',win);
    }
    if(win=='O' ){
      arr.push('text-primary','text-success',win);
    }
    return (<Header winCl={arr[0]} turnCl={arr[1]} win={arr[2]} currentPlayer={currentPlayer}/>);
  }
  render() {
    return(
      <Consumer>
        {value=>{
          const {squareLen,dispatch,statusArr,historyArr,currentPlayer,winner,colorArr} =value;
          return(
            <React.Fragment>
              {this.setWinner(winner,currentPlayer)}
              
              
              <div className="d-flex flex-column mx-1 mx-lg-5">
                <div className='d-flex flex-column align-items-center mb-4'>
                  <div className="d-flex flex-column align-items-center " 
                    style={{border:"1px solid #d6d8d9"}} 
                    >
                    {this.createTheBoard(squareLen,statusArr,colorArr)}
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center btn-group-vertical">
                  <button 
                    className="btn btn-warning"
                    onClick={()=>dispatch({type:'RESET'})}
                    >
                    Reset
                  </button>
                  {historyArr.map(btn=>(
                    <button 
                      className="btn btn-light font-italic"
                      onClick={()=>dispatch({type:'HIS_BACK',move:btn.moveNum})}
                      >
                      Back to move #{btn.moveNum}
                    </button>
                    ))}
                  <button 
                    className="btn btn-info"
                    onClick={()=>this.props.history.push('/')}
                    >
                    Back To Menu
                  </button>
                </div>
              </div>
            </React.Fragment>

          )
        }}
      </Consumer>
    )
  }
}
