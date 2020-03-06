
import React from 'react'

export default function Header(props) {
  return (
    <div className="alert alert-info mx-lg-5 mt-2 mb-4" role="alert" >
      <h6 className="">
        The winner is : 
        <span className={`${props.winCl} font-weight-bold `}> {props.win} </span>
      </h6>
      <p className="display-5" >It s <span className={`${props.turnCl}`}>{props.currentPlayer}</span> turn</p>
    </div>
  )
}
