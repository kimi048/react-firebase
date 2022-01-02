import React, { Component } from 'react'
import firebase, { usersCollection,functions } from "../../utils/firebase";

class LoginForm extends Component {
  
  state = {
    register: true,
    user: {
      email: '',
      password: ''
    }
  }

  handleForm = (e) => {
    e.preventDefault();
    const { email } = this.state.user;
    const { password } = this.state.user;

    if (this.state.register) {
      ///register
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
          this.handleStoreRegisterUser(response);
        console.log(response)
        }).catch(e => {
          console.log(e);
      })
      console.log(this.state)
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
        }).catch(e => {
          console.log(e);
      })
      console.log(this.state)
    }
  }
  
  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState( prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }))
  }

  handleLogout = () => {
    firebase.auth().signOut().then(() => {
        console.log("user logged out")
      }
    )
  }

  handleGetUserInfo = () => {
    let getUser = firebase.auth().currentUser;
    if (getUser) {
      getUser.getIdTokenResult().then(res => {
        console.log(res)
      })
      console.log(getUser)
    } else {
      console.log("no-user info")
    }
  }

  handleUpdateEmail = () => {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider
      .credential('newemail@gmail.com', 'testing123');
    if (getUser) {
      getUser.reauthenticateWithCredential(credential).then(res => {
        getUser.updateEmail("jobs@gmail.com");
      })
    }
  }

  handleUpdateProfile = () => {
    let getUser = firebase.auth().currentUser;
    getUser.updateProfile({
      displayName: "jobs",
      photoURL:"https://aaa.com/photo.jpg"
    }).then(() => {
      console.log(getUser);
    })
  }

  handleGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)
       })
      .catch((e) => {
        console.log(e)
      })
  }

  handleStoreRegisterUser = (data) => {
    usersCollection.doc(data.user.uid).set({
      email:data.user.email
    }).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e);
    })
  }

  handleCallableFunction = () => {
    console.log("trigger function");
    const addLog = functions.httpsCallable('addLog');
    addLog({
      message:"hello this is a new message"
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e)=>this.handleForm(e)}>
          <div className='form-group'>
            <label>Email</label>
            <input type="text" className='form-control' name="email" onChange={(e) => this.changeHandler(e)} />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="password" className='form-control' name="password" onChange={(e) => this.changeHandler(e)} />
          </div>
          <button type="submit" className='btn btn-primary'>
            {this.state.register ? 'Register' : "Sign in" }
          </button>
        </form>
        <hr />
        <button onClick={() => this.handleLogout()}>Logout</button>
        <hr />
        <button onClick={() => this.handleGetUserInfo()}>Ask about the user</button>
        <hr />
        <button onClick={() => this.handleUpdateEmail()}>Update user email</button>
        <hr />
        <button onClick={() => this.handleUpdateProfile()}>Update user profile</button>
        <hr />
        <button onClick={() => this.handleGoogleSignin()}>Google signin</button>
        <hr />
        <button onClick={() => this.handleCallableFunction()}>TRIGGER CLOUD FUNCTION</button>
      </div>
    )
  }
}

export default LoginForm;
