import React, { Component } from 'react'
import { carsCollection, employeeRef } from "../../utils/firebase";
import { firebaselooper } from "../../utils/tools";
import Form from './form';


class Cars extends Component {

  state = {
    cars:null
  }

  getAllTheCars() {
    carsCollection
      .orderBy("createdAt","desc")
      .get()
      .then(snapshot => {
        const cars = firebaselooper(snapshot);
        console.log(cars);
        this.setState({cars});
     }).catch(e => {
      console.log(e);
    })
  }

  componentDidMount() {
    this.getAllTheCars();

    //get doc by id
    // carsCollection.doc('v4Ocdq33lq1HCayxmD7v')
    //   .get()
    //   .then(snapshot => {
    //   console.log(snapshot.data());
    // })
    
    // employeeRef.get().then((snapshot) => { 
    //   const employees = firebaselooper(snapshot);
    //   console.log(employees);
    // })
  }

  handleCarData = (cars) => (
    cars ?
      cars.map((data, i) => (
        <tr key={i}>
          <th>{data.id}</th>
          <th>{data.brand}</th>
          <th>{data.color}</th>
          <th>{data.price}</th>
        </tr>
      ))
      : null
  )

  render() {
    const cars = this.state.cars;
    return (
      <div>
        <Form/>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>color</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {this.handleCarData(cars)}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Cars;