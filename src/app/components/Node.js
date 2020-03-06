import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Consumer} from '../Context';

export default class Node extends Component {
  constructor(props){
    super(props);
    this.state={
      color:''
    }
  }
  componentDidMount(){
    
  }
  setColor(p){
    if(p=='X'){
      this.setState({
        color:'text-success'
      });
    }else if(p=='O'){
      this.setState({
        color:'text-primary'
      });
    }
  }
  render() {
    return (
      <Consumer>
        {value=>{
          const {currentPlayer,dispatch}=value;
          return(
            <span 
              className={`font-weight-bold d-flex justify-content-center align-items-center ${this.state.color} ${this.props.bgColor}`}
              style={{
                width:"70px" , 
                height:"70px",
                float:'left',
                border :'1px solid #d6d8d9',
                cursor:'pointer'
              }}
              onClick={()=>{
                if(this.props.initVal!='')return;
                this.setColor(currentPlayer);
                dispatch({type:'KICK',id:this.props.id,player:currentPlayer});
              }}
            >
              {this.props.initVal}
            </span>
          )
        }}
      </Consumer>
    )
  }
}
Node.propTypes={
  id:PropTypes.number.isRequired,
  initVal:PropTypes.string.isRequired,
  bgColor:PropTypes.string.isRequired
}

