import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('ruangan');
    this.state = {
      koderuangan: '',
      nama: '',
      lokasi: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { koderuangan, nama, lokasi } = this.state;

    this.ref.add({
      koderuangan,
      nama,
      lokasi
    }).then((docRef) => {
      this.setState({
        koderuangan: '',
        nama: '',
        lokasi: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { koderuangan, nama, lokasi  } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add ruang
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">ruang List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="koderuangan">Kode Raunagn:</label>
                <input type="text" class="form-control" name="koderuangan" value={koderuangan} onChange={this.onChange} placeholder="Kode Ruangan" />
              </div>
              <div class="form-group">
                <label for="nama">Nama Ruangan:</label>
               < input type="text" class="form-control" name="nama" value={nama} onChange={this.onChange} placeholder="Nama Ruangan" />
              </div>
              <div class="form-group">
                <label for="lokasi">Lokasi Ruangan:</label>
                <input type="text" class="form-control" name="lokasi" value={lokasi} onChange={this.onChange} placeholder="Lokasi Ruangan" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
