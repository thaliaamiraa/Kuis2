import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      koderuangan: '',
      nama: '',
      lokasi: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('ruangan').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const ruang = doc.data();
        this.setState({
          key: doc.id,
          koderuangan: ruang.koderuangan,
          nama: ruang.nama,
          lokasi: ruang.lokasi
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ruang:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { koderuangan, nama, lokasi  } = this.state;

    const updateRef = firebase.firestore().collection('ruangan').doc(this.state.key);
    updateRef.set({
      koderuangan,
      nama,
      lokasi
    }).then((docRef) => {
      this.setState({
        key: '',
        koderuangan: '',
        nama: '',
        lokasi: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Ruangan
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Ruangan List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="koderuangan">Kode Raunagn:</label>
                <input type="text" class="form-control" name="koderuangan" value={this.state.koderuangan} onChange={this.onChange} placeholder="Kode Ruangan" />
              </div>
              <div class="form-group">
                <label for="nama">Nama Ruangan:</label>
               < input type="text" class="form-control" name="nama" value={this.state.nama} onChange={this.onChange} placeholder="Nama Ruangan" />
              </div>
              <div class="form-group">
                <label for="lokasi">Lokasi Ruangan:</label>
                <input type="text" class="form-control" name="lokasi" value={this.state.lokasi} onChange={this.onChange} placeholder="Lokasi Ruangan" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
