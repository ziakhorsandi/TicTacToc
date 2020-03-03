import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Consumer} from '../Context';

export default class Node extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Consumer>
        {value=>{
          const {currentPlayer,dispatch}=value;
          return(
            <span 
              className="d-flex justify-content-center align-items-center"
              style={{
                width:"10vw" , 
                height:"10vh",
                float:'left',
                border :'1px solid black',
                cursor:'pointer',
              }}
              onClick={()=>{
                
                if(this.props.initVal!='')return;
                dispatch({type:'CHANGE_PLAYER'});
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
  initVal:PropTypes.string.isRequired
}

