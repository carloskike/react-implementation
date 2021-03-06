/*  Descripcion: Clase de tipo Store que contiene los llamados Ajax al servidor backend del aplicativo para 
                 la manipulacion del master page del aplicativo (Menus, submenus, información principal)
    Autor: Carlos Agudelo
    Contacto: agudelo.carlos@hotmail.es
    Fecha de creación: 6 de Mayo del 2017
    Fecha de modificacion: 23 de Junio 2017 */

// Importa las librerias externas necesarias para el manejo de la arquitectura
import $ from 'jquery'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'

// Importa los componentes propios necesarios
import MasterPageAction from '../actions/MasterPageAction'

// Importa las clases necesarias donde se almacenas las contantes del aplicativo
import SecretConstant from '../utils/SecretsConstant'
import Constant from '../utils/Constants'

// Define la clase
let MasterPageStore = Reflux.createStore({
  listenables: [MasterPageAction],

  // Realiza la peticion de login al api del aplicativo
  FetchInformation: function(){
  	$.ajax({
      cache: false,
      context: this,
      url: SecretConstant.HOST_API+'/users?id=' + localStorage.id,
      method: 'GET',
      success: function(response, textStatus, xhr){ 
        if(response){
          this.trigger(response)
        }else {
          browserHistory.push('/error_page/500')
        }
      },  
      error: function(textStatus, xhr){
        browserHistory.push('/error_page/500')
        $(".loader").hide();
      }
    });
  },

  GetCourse: function(id){
    $.ajax({
      cache: false,
      context: this,
      url: SecretConstant.HOST_API+'/courses?id=' + id,
      method: 'GET',
      success: function(response, textStatus, xhr){ 
        if(response){
          this.trigger(response)
        }else {
          browserHistory.push('/error_page/500')
        }
      },  
      error: function(textStatus, xhr){
        browserHistory.push('/error_page/500')
        $(".loader").hide();
      }
    });
  }

})

// Exporta la clase
export default MasterPageStore