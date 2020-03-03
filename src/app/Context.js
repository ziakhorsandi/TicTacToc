
import React, { Component } from 'react';
const Context=React.createContext(null);

export class Provider extends Component {
  constructor(){
    super();
    this.state={
      statusArr:[],
      winArr:[],
      squareLen:3,
      currentPlayer:'X',
      dispatch: action =>{
        this.setState(this.reducer.bind(this,this.state,action))
      }
    }
    this.calculateWinArray();
    // this.initStatusArray();
    
  }
  initStatusArray(){
    let len=this.state.squareLen;
    let arr=[];
    for (let i = 0; i < len*len; i++){
      arr.push('');
    }
    this.setState({
      statusArr:arr
    });
  }
  calculateWinArray(){
    let {winArr,statusArr}=this.state;
    let len=this.state.squareLen;

    // -------- create model Array (2 dimensional)
    let modelArr=[];
    for (let i = 0; i < len; i++){
      modelArr[i]=[];
    }
    //---------  fill Model Array with model ids
    let k=0;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        modelArr[i][j]={id:k , player:'X'};
        k++;
      }
    }
    //--------- fill winArray
    let subArrVer=[];
    let subArrHor=[];
    let subArr1=[];
    let subArr2=[];
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if(i==j) {
          subArr1.push({id:modelArr[i][j],player:null});
        }
        if(i+j==len-1){
          subArr2.push({id:modelArr[i][j],player:null});
        }
        subArrVer.push({id:modelArr[i][j],player:null});
        subArrHor.push({id:modelArr[j][i],player:null});
        subArrHor.push(
          
          modelArr[j][i].id
        );
      }
      winArr.push(subArrVer,subArrHor);
      winArr.push(subArrHor);
      subArrVer=[];
      subArrHor=[];
    }
    winArr.push(subArr1,subArr2);

    // console.log('modelArr : ',modelArr)
    // console.log('statusArr : ',statusArr)
  }

  componentWillMount(){
    
    this.initStatusArray();
    // console.log(this.state.statusArr);
    // console.log(this.state.winArr);

    // history:[
    //   {movNum:1,p:'X',statusArr},
    //   {movNum:2,p:'O',statusArr},
    // ];

  }

  reducer(state,action){
    switch (action.type) {
      case 'KICK':
        state.statusArr[action.id]=action.player
        return state
      case 'CHANGE_PLAYER':
        if(state.currentPlayer=='X'){
          state.currentPlayer="O";
        }else{
          state.currentPlayer="X";
        }
        return state
      case 'CHANGE_H':
        state.statusArr=['v','v','v','v','v','v','v','v','v'];
        return state
      default:
        return(state);
    }
  }
  
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer=Context.Consumer;