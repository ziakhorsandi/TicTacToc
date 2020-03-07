import React, { Component } from 'react'

export default class Radio extends Component {
  render() {
    return (
      <div className="custom-control custom-radio ">
        <input 
          value={this.props.value}
          type="radio" 
          id={this.props.id} 
          name="customRadio" 
          className="custom-control-input"
          onChange={(e)=>{
            this.props.changeLen(e.target.value);
          }}
        />
        <label className="custom-control-label" htmlFor={this.props.id}>{this.props.val}</label>
      </div>
    )
  }
}

