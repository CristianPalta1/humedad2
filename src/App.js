import React, { Component } from "react";
import firebase from "firebase";
import LOGO from "./logo-universidad-del-cauca.png";
import SLIDER from "./slider.jpg";
import "./App.css";

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

var seco = false;

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
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">
            <img
              src={LOGO}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
              loading="lazy"
            />
            Humedad
          </div>
        </nav>
        <div className="Body">
          <div className="row">
            <div className="col-6">
              <div className="text-center">
                <p className="Title">Proyecto sensor humedad</p>
              </div>
              <img src={SLIDER} width="680" height="300" />
            </div>
            <div className="col-6">
              <div className="text-center">
                <p className="Title">Datos del sensor en tiempo real</p>
              </div>
              <div>
                <p>
                  Se recibe los datos del sensor. Y se compara con los datos
                  preestablecidos para saber si esta muy humedo o muy seco de
                  esta manera prender una motobomba
                </p>
              </div>
              <p>Kimolemtros recorridos: {this.state.humidity}</p>
              <div>
                {seco ? (
                  <div className="row text-center ">
                    <p style = {{marginRight: 50}}>El suelo esta muy seco se activara motobomba</p>
                    <img
                      src={LOGO}
                      width="30"
                      height="30"
                      class="d-inline-block align-top"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="row text-center">
                    <p>El suelo esta muy humedo se desactivara la motobomba</p>
                    <img
                      src={LOGO}
                      width="30"
                      height="30"
                      class="d-inline-block align-top"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
