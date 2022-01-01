import React, { Component } from 'react'
import firebase, { usersRef } from '../../utils/firebase';
import { Link } from "react-router-dom";

class ListUploads extends Component {
  state = {
    images: null
  }

  componentDidMount() {
    this.handleGetAll();

  }

  handleGetAll = () => {
    usersRef.listAll().then(data => {
      let imagesArray = [];
      data.items.forEach(itemRef => {
        // imagesArray.push(itemRef);
        itemRef.getDownloadURL().then(url => {
          imagesArray.push({
            name: itemRef.name,
            link: url
          });
          this.setState({ images: imagesArray });
        })
      })
    })
  }

  handleDelete = (name) => {
    usersRef.child(name).delete().then(() => {
      console.log("deleted!!");
      this.handleGetAll();
    })
  }

  render() {
    return (
      <div>
        {this.state.images ?
          this.state.images.map((item,i) => (
            <div key={i}><strong>{item.name}</strong>
              <Link to={{ pathname: item.link }} target="_blank">OPEN IT</Link>
              {/* <br /> */}
              {/* <img src={item.link} alt={item.name} width="300"/> */}
              <div onClick={ () => this.handleDelete(item.name) }>DELETE</div>
            </div> 
          ))
        : null}
      </div>
    )
  }
}

export default ListUploads;
