import React, { Component } from 'react';
import Radio from './layout/Radio.js';
import {Consumer} from '../Context';
// import {Link} from 'react-router-dom'

export default class Initial extends Component {
  constructor(){
    super();
    this.state={
      len:3
    }
  }
  componentDidMount(){
    document.querySelector('#customRadio1').setAttribute("checked", "checked");
  }
  changeLen(l){
    this.setState({
      len:parseInt(l)
    });
  }
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
                    dispatch({type:'START',len:this.state.len});
                    this.props.history.push('/board')
                  }}
                >
                  <h3>
                    <span className='text-danger'>Tic </span>
                    <span className='text-warning'>Tac </span>
                    <span className='text-info'>Toc</span>
                  </h3>
                  <p className="text-success">Choose the game box size</p>
      
                  <div className="ml-3 text-black-50">
                    <Radio changeLen={this.changeLen.bind(this)} value={3} val={'Small ( 3 x 3 )'} id={'customRadio1'} />
                    <Radio changeLen={this.changeLen.bind(this)} value={4} val={'Medium ( 4 x 4 )'} id={'customRadio2'} />
                    <Radio changeLen={this.changeLen.bind(this)} value={5} val={'Large ( 5 x 5 )'} id={'customRadio3'}  />
                  </div>
                  
                  {/* <Link to={`board/${this.state.len}`}>
                    <button type="button" className="btn btn-info mt-3 p-0">Start</button>
                  </Link> */}
      
                  <input type="submit" value={'start'} className="btn btn-info mt-3 p-0"/>
                </form>
            </article>
          )
        }}
      </Consumer>
    )
    
  }
}
