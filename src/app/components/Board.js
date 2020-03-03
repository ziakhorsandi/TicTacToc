import React, { Component, Children } from 'react';
import Node from './Node';
import {Consumer} from '../Context';

export default class Board extends Component {
  constructor(){
    super();
    this.createTheBoard=this.createTheBoard.bind(this);
  }
  
  createTheBoard(len,statusArr){
    let item=[];
    let sub=[];
    for (let i = 0; i < statusArr.length; i++) {
      if(i%len == 0){
        item.push(<br/>)
      }
      item.push(
          <Node id={i} initVal={statusArr[i]} />
      );
    }
    // for (let i = 0; i < len; i++) {
    //   for (let j = 0; j < len; j++) {
    //     sub.push();
    //     sub.push(<Node id={i} initVal={statusArr[i]} />)
    //   }
    //   item.push(sub);
    //   sub=[];
    // }
    // console.log(item)
    return item; 
  }
  render() {
    return(
      <Consumer>
        {value=>{
          const {squareLen,dispatch,statusArr,currentPlayer} =value;

          return(
            <React.Fragment>
              <div style={{}}>
                {this.createTheBoard(squareLen,statusArr)}
              </div>
              {/* <button onClick={()=>dispatch({type:'CHANGE_H'})}>Click</button> */}
            </React.Fragment>

          )
        }}
      </Consumer>
    )
  }
}
