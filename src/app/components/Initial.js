import React, { Component } from 'react';
import Radio from './layout/Radio.js';
import {Consumer} from '../Context';

export default class Initial extends Component {
  render() {
    return(
      <Consumer>
        {value=>{
          const {dispatch} =value;
          return (
            <article
              className="d-flex justify-cuntent-center align-items-center"
              style={{
                height:'100vh'
              }}
            >
                <form className="card card-body col-10 col-lg-8 m-auto" 
                  onSubmit={(e)=>{
                    e.preventDefault();
                    console.log(e.currentTarget)
                    dispatch({type:'START',len:3});
                  }}
                >
                  <h3>
                    <span className='text-danger'>Tic </span>
                    <span className='text-warning'>Tac </span>
                    <span className='text-info'>Toc</span>
                  </h3>
                  <p className="text-success">Choose the game box size</p>
      
                  <div className="ml-3 text-black-50">
                    <Radio value={3} val={'Small ( 3 x 3 )'} id={'customRadio1'} />
                    <Radio value={4} val={'Medium ( 4 x 4 )'} id={'customRadio2'} />
                    <Radio value={5} val={'Large ( 5 x 5 )'} id={'customRadio3'} />
                  </div>
                  
                  {/* <button type="button" className="btn btn-info mt-3 p-0">Start</button> */}
                  <input type="submit" value={'start'} className="btn btn-info mt-3 p-0"/>
                </form>
            </article>
          )
        }}
      </Consumer>
    )
    
  }
}
