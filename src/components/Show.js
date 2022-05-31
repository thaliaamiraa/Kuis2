import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ruang: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('ruangan').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          ruang: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('ruangan').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Ruangan List</Link></h4>
            <h3 class="panel-title">
              {this.state.ruang.koderuanagn}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Nama Ruangan :</dt>
              <dd>{this.state.ruang.nama}</dd>
              <dt>Lokasi Ruangan:</dt>
              <dd>{this.state.ruang.lokasi}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
