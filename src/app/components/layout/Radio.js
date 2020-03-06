import React from 'react'

export default function Radio(props) {
  return (
    <div className="custom-control custom-radio ">
      <input 
        value={props.value}
        type="radio" 
        id={props.id} 
        name="customRadio" 
        className="custom-control-input"
      />
      <label className="custom-control-label" htmlFor={props.id}>{props.val}</label>
    </div>
  )
}
