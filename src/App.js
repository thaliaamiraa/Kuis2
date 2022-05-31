import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('ruangan');
    this.unsubscribe = null;
    this.state = {
      ruangan: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const ruangan = [];
    querySnapshot.forEach((doc) => {
      const { koderuangan, nama, lokasi } = doc.data();
      ruangan.push({
        key: doc.id,
        doc, // DocumentSnapshot
        koderuangan,
        nama,
        lokasi,
      });
    });
    this.setState({
      ruangan
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Menu Ruangan
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Tambah Ruangan</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Kode Ruangan</th>
                  <th>Nama Ruangan</th>
                  <th>Lokasi Ruangan</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ruangan.map(ruang =>
                  <tr>
                    <td><Link to={`/show/${ruang.key}`}>{ruang.koderuangan}</Link></td>
                    <td>{ruang.nama}</td>
                    <td>{ruang.lokasi}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
