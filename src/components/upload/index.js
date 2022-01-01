import React, { Component } from 'react';
import firebase, { usersRef,usersCollection } from '../../utils/firebase';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.pauseRef = React.createRef();
    this.resumeRef = React.createRef();
    this.cancelRef = React.createRef();

    
    this.state = {
      image: null,
      url: '',
      progress: 0
    }

  }
  componentDidMount() {
    const imageRef = usersRef.child('Screen Shot 2021-12-07 at 1.55.58.png');
    imageRef.getDownloadURL()
      .then(downloadURL => {
        console.log("FILE AVAILABLE AT:", downloadURL)
      }).catch(e => {
        console.log(e);
        switch (e.code) {
          case "storage/object-not-found":
            console.log("sorry image not found");
            break;
          default:
            console.log("error by default");
            break;
        }
      });
    imageRef.getMetadata().then(data => {
      console.log(data);
    }).catch(e => console.log(e));
  }

  handleUpload = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { image } = this.state;
    const metadata = {
      customMetadata: {
        hello:'its me!'
      }
    }

    const uploadTask = usersRef.child(`${image.name}`).put(image,metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
        switch (snapshot.state) {
          case "canceled":
            console.log("user canceled");
            break;
          case "error":
            console.log("error happened");
            break;
          case "paused":
            console.log("paused");
            break;
          case "running":
            console.log("running");
            break;
          case "success":
            console.log("success");
            break;
          default:
            console.log("default");
        }
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
        this.setState({ progress: 0 });
      },
      () => {
        console.log(uploadTask.snapshot.ref);

        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => console.log(downloadURL))
        
        let getUser = firebase.auth().currentUser;
        usersCollection.doc(getUser.uid).update({
          image:uploadTask.snapshot.ref.name
        });
      }
    );

    this.pauseRef.current.addEventListener('click', () => {
      uploadTask.pause();
    })

    this.resumeRef.current.addEventListener('click', () => {
      uploadTask.resume();
    })

    this.cancelRef.current.addEventListener('click', () => {
      uploadTask.cancel();
    })
    
    // uploadTask.then(() => {
    //     console.log("file uploaded")
    //   }).catch(e => {
    //     console.log(e)
    //   });
  }

  handleChange = (e) => { 
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleUpload}>
          <progress value={this.state.progress} max="100"/>
          <div className='form-group'>
            <label>File</label>
            <input className='form-control' type="file" onChange={this.handleChange} />
          </div>
          <button type="submit" className='btn btn-primary' >upload File</button>
        </form>
        <hr />
        <div className='form-group'>
          <button className='btn btn-primary' ref={this.pauseRef}>Pause</button>
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' ref={this.resumeRef}>Resume</button>
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' ref={this.cancelRef}>Cancel</button>
        </div>
      </div>
    )
  }
}
export default Upload;