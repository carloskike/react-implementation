/*  Descripcion: Componente que renderiza la funcionalidad de autentificación en la plataforma
    Autor: Carlos Agudelo
    Contacto: agudelo.carlos@hotmail.es
    Fecha de creación: 6 de Mayo del 2017
    Fecha de modificacion: 29 de Junio 2017 */

// importa las librerias externas necesarias
import $ from 'jquery'
import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

// importa las librerias externas necesarias
import LoginAction from '../actions/LoginAction.js'
import LoginStore from '../stores/LoginStore.js'

// importa los componentes necesarios
import MessageFlash from '../components/MessageFlash'
import Bubbles from '../components/login/Bubbles'
import Logo from '../components/login/Logo'

import { Link } from 'react-router'


// inicializa el mixing que es la variable donde se alojara el contenido del objeto que retorna la respuesta en el store
@ReactMixin.decorate(Reflux.connect(LoginStore, 'login'))
export default class Registration extends React.Component {

  constructor(){
  	super()
  }

  // Metodo que envia captura la solicitud de autentificacion en plataforma
  onSubmitRegistration(ev){
  	ev.preventDefault()
  	let form_data = $(ev.target).serializeArray()
  	if(form_data[4].value == form_data[5].value){
  	  let data = {
		'name': form_data[0].value,
		'surname': form_data[1].value,
	  	'document_type': form_data[2].value,
	  	'document_number': form_data[3].value,
	  	'email': form_data[4].value
	  }
	  LoginAction.Register(data)
  	}else{
	  swal("ERROR", 'LOS CORREOS ELECTRONICOS NO COINCIDEN', "error")
	}

  }

  // Retorna el componente
  render() {
	return(
	  <div class="custom-style">
	    <div class="wrapper habeas">
	      <center>
		    <MessageFlash data={this.state.login} />
		    <Logo />
		  </center>
		  <div class="custom-container">
		  	<h1 class="form-title">REGISTRO</h1>
		    <form class="custom-form" onSubmit={this.onSubmitRegistration.bind(this)}>
		      <input type="text" name="name" class="form-control" placeholder="PRIMER NOMBRE" required="" />
					<input type="text" name="surname" class="form-control" placeholder="PRIMER APELLIDO" required="" />

		      <select name="document_type" class="form-control" required="">
		      	<option value="">TIPO DE DOCUMENTO</option>
		        <option value="TI">TARJETA DE IDENTIDAD</option>
		        <option value="CC">CEDULA DE CIUDADANÍA</option>
		        <option value="CE">CÉDULA DE EXTRANJERÍA</option>>
		        <option value="PS">PASAPORTE</option>
		      </select>
		      <input type="text" name="document_number" class="form-control" placeholder="NÚMERO DE DOCUMENTO" required="" />
		      <input type="text" name="email" class="form-control" placeholder="CORREO ELECTRONICO" required="" />
		      <input type="text" name="conf_email" class="form-control" placeholder="CONFIRMAR CORREO ELECTRONICO" required="" />
			  <button type="submit" id="login-button">REGISTRAR</button>
				<br/>
				<p>
					<Link class="mg-right" to='login'>Iniciar Sesión </Link>
					<Link to='reset'>Reestablecer Contraseña</Link>
				</p>
			</form>
		  </div>
		  <Bubbles />
		</div>
	  </div>
	);
  }
}