import React, { Component } from 'react'
import { carsCollection,firebaseTimestamp } from "../../utils/firebase";


class Form extends Component {
  
  state = {
    brand: "",
    color: "",
    price: "",
    available: ""
  }

  handleForm = (e) => {
    e.preventDefault();
    console.log(this.state);
    // add to the db
    carsCollection.add({
      ...this.state,
      available: this.state.available=="true"?true:false,
      price: parseInt(this.state.price),
      createdAt:firebaseTimestamp()
    }).then(data => {
     console.log(data) 
    }).catch(e => {
      console.log(e)
    })
  }

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(e.target);
    this.setState({[name]:value})
  }
  
  render() {
    return (
      <div>
        <form onSubmit={(e)=>this.handleForm(e)}>
          <div className='form-group'>
            <label>Brand</label>
            <input type="text" className='form-control' name="brand" onChange={(e) => this.changeHandler(e)} />
          </div>
          <div className='form-group'>
            <label>Color</label>
            <input type="text" className='form-control' name="color" onChange={(e) => this.changeHandler(e)} />
          </div>
          <div className='form-group'>
            <label>Price</label>
            <input type="text" className='form-control' name="price" onChange={(e) => this.changeHandler(e)} />
          </div>
          <div className='form-group'>
            <label>Available</label>
            <select className='form-control' name="available" onChange={(e) => this.changeHandler(e)}>

              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
          </div>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
        <hr />
      </div>
    )
  }
}
export default Form;