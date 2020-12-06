import React, { Component } from "react";
import firebase from "firebase";

// import image from '../images/haderpartida.jpg'

const firebaseConfig = {
  apiKey: "AIzaSyDRxPEdlUpboeMdtwjzMtriJg6QxZJcDJ0",
  authDomain: "proyectohumedad-a68df.firebaseapp.com",
  databaseURL: "https://proyectohumedad-a68df-default-rtdb.firebaseio.com",
  projectId: "proyectohumedad-a68df",
  storageBucket: "proyectohumedad-a68df.appspot.com",
  messagingSenderId: "217970932633",
  appId: "1:217970932633:web:fba24cb6ebcc52ac693108",
  measurementId: "G-NLJKEPRX40",
};

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      formulario: {
        nombre: "",
        apellido: "",
        informacion: "",
        celular: "",
        correo: "",
      },
      humidity: 0,
    };
  }

  componentWillMount() {
    const humedad = firebase.database().ref().child("ESP32").child("Corriente");
    humedad.on("value", (snapshot) => {
      this.setState({
        humidity: snapshot.val(),
      });
    });
    console.log(humedad);
  }

  render() {
    return (
      <React.Fragment>
        <div className="imagen-fondo">
          <h1>Bienvenido a una nueva partida</h1>
        </div>
        <div className="row">
          <div className="col-6 drch">
            Kimolemtros recorridos: {this.state.humidity} <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
