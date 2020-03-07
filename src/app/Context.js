
import React, { Component } from 'react';
const Context=React.createContext(null);

export class Provider extends Component {
  constructor(){
    super();
    this.state={
      colorArr:[],
      winner:'',
      p1_result:[],
      p2_result:[],
      historyArr:[],
      statusArr:[],
      winArr:[],
      squareLen:5,
      currentPlayer:'X',
      currentMove:0,
      dispatch: action =>{
        this.setState(this.reducer.bind(this,this.state,action))
      }
    }
    this.calculateWinArray=this.calculateWinArray.bind(this);
    this.setResultArray=this.setResultArray.bind(this);
    this.initStatusArray=this.initStatusArray.bind(this);
    this.allInit=this.allInit.bind(this);
    // this.calculateWinArray();
    this.players={p1:'X',p2:'O'};
  }


  //==========Initialize the status Array
  initStatusArray(state){
    let len=state.squareLen;
    let arr=[];
    for (let i = 0; i < len*len; i++){
      arr.push('');
    }
    return{
      ...state,
      statusArr:Object.assign([],arr),
      colorArr:Object.assign([],arr)
    }
  }

  //========Calculating winArray and results arrays
  calculateWinArray(state){
    let winAr=[];
    let len=state.squareLen;

    // -------- create model Array (2 dimensional)
    let modelArr=[];
    for (let i = 0; i < len; i++){
      modelArr[i]=[];
    }
    //---------  fill Model Array with model ids
    let k=0;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        modelArr[i][j]=k;
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
          subArr1.push(modelArr[i][j]);
        }
        if(i+j==len-1){
          subArr2.push(modelArr[i][j]);
        }
        subArrVer.push(modelArr[i][j]);
        subArrHor.push(modelArr[j][i]);
      }
      winAr.push(subArrVer,subArrHor);
      subArrVer=[];
      subArrHor=[];
    }
    winAr.push(subArr1,subArr2);
    
    return{
      ...state,
      winArr:Object.assign([],winAr)
    }
  }
 
  //========Set result array for each player
  setResultArray(state){
    let arr=[];
    // console.log('this.state.winArr', this.state.winArr)
    for (let i = 0; i < state.winArr.length; i++) {
      arr.push(0);
    }
    return{
      ...state,
      p1_result:Object.assign([],arr),
      p2_result:Object.assign([],arr)
    };
  }

  //=======All initialization
  allInit(len){
    let state={
      ...this.state,
      colorArr:[],
      winner:'',
      p1_result:[],
      p2_result:[],
      historyArr:[],
      statusArr:[],
      winArr:[],
      squareLen:len,
      currentPlayer:'X',
      currentMove:0
    }
    state={
      ...this.initStatusArray(state)
    }
    state={
      ...this.calculateWinArray(state)
    }
    state={
      ...this.setResultArray(state)
    }
    return state;

  }
  ///////////-----------LifeCycle-------///////////
  componentWillMount(){
    this.setState(
      this.allInit(this.state.squareLen)
    );
  }
  /////////////////////---------///////////////////
  reducer(state,action){
    switch (action.type) {
      case 'KICK':

        if(state.winner!='') return;
        //----------icrease move counter
        state.currentMove=state.currentMove+1;
        //------------set status array
        state.statusArr[action.id]=action.player

        //--------for result
        let winRow=-1;

        for (let i = 0; i < state.winArr.length; i++) {
          for (let j = 0; j < state.squareLen; j++) {
            if(action.id==state.winArr[i][j]){
              if(state.currentPlayer==this.players.p1){
                state.p1_result[i]++;
                if(state.p1_result[i]==state.squareLen){
                  state.winner=this.players.p1;
                  winRow=i;
                  break;
                }
              }
              if(state.currentPlayer==this.players.p2){
                state.p2_result[i]++;
                if(state.p2_result[i]==state.squareLen){
                  state.winner=this.players.p2;
                  winRow=i;
                  break;
                }
              }
              
            }
          }
        }
        //----set the colorArr for the winner
        if(winRow!=-1){
          for (let i = 0; i < state.winArr[winRow].length; i++) {
            state.colorArr[state.winArr[winRow][i]]='bg-warning';
          }
        }
        
        //----------change the player
        if(state.currentPlayer==this.players.p1){
          state.currentPlayer=this.players.p2;
        }else{
          state.currentPlayer=this.players.p1;
        }
        //----------set history array
        state.historyArr.push({
          moveNum:state.currentMove,
          p:state.currentPlayer,
          stArr:Object.assign([], state.statusArr),
          p1:Object.assign([], state.p1_result),
          p2:Object.assign([], state.p2_result)
        });
        
        if(state.winner!=''){
          state.historyArr=[];
        };
        return state
      case 'HIS_BACK':
          
          state.statusArr=Object.assign([], state.historyArr[action.move-1].stArr);
          state.p1_result=Object.assign([], state.historyArr[action.move-1].p1);
          state.p2_result=Object.assign([], state.historyArr[action.move-1].p2);
          state.currentPlayer=state.historyArr[action.move-1].p;

          state.currentMove=action.move;
          let popTimes=state.historyArr.length-action.move;
          
          for (let i = 0; i <popTimes ; i++) {
            state.historyArr.pop();
          }
          
        return state
      case 'RESET':
        return this.allInit(state.squareLen);
      case 'START':
        return this.allInit(action.len);
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