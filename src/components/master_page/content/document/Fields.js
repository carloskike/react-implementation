import React from 'react';
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import DocumentAction from '../../../../actions/DocumentAction'
import DocumentStore from '../../../../stores/DocumentStore'

import UploadComponent from './UploadComponent'
import ValidateComponent from './ValidateComponent'
import Loading from '../../../Loading'
import MessageFlash from '../../../MessageFlash'
import Constant from '../../../../utils/Constants'

@ReactMixin.decorate(Reflux.connect(DocumentStore, 'fields'))
export default class Fields extends React.Component {

  constructor(){
  	super()
  }

  componentWillMount(){
    if(this.props.data){
      DocumentAction.FetchDocuments(this.props.data)
    }else{
      DocumentAction.FetchDocuments(0)
    }
  }

  sendFinishedHandler(){
    if(this.props.data){
      DocumentAction.FinishValidate(this.props.data)
    }else{
      DocumentAction.FinishLoad()
    }
  }

  refuseDocument(){
    DocumentAction.RefuseDocument(this.props.data)
  }

  render() {

    if(this.state.fields){

      let fields
      let buttons 
      let messageAlert 

      if(this.state.fields.data.length == 0){
        fields = <center><div class="alert alert-info"><strong>NO TIENE DOCUMENTOS PARA CARGAR</strong></div></center>
      }else{
        if(localStorage.role == Constant.ROLE_BENEFICIARY){
          fields = this.state.fields.data.map((field) => {
            return(
              <UploadComponent data={field} />
            )
          }) 
        }else{
          fields = this.state.fields.data.map((field) => {
            return(
              <ValidateComponent data={field} />
            )
          }) 
          if(!localStorage.role.includes("admin")){
            buttons = <div>
                        <button class="btn btn-primary pull-right" onClick={this.sendFinishedHandler.bind(this)} >FINALIZAR VALIDACIÓN</button>         
                        <button class="btn btn-primary pull-left" onClick={this.refuseDocument.bind(this)} >RECHAZAR DOCUMENTOS</button>
                      </div>
          }
          
        }  
      } 

      if(localStorage.role == Constant.ROLE_BENEFICIARY){
        if(this.state.fields.data[0].get_validated_all){
          messageAlert =
                        <div class="alert alert-success alert-document">
                          <center><strong>SUS DOCUMENTOS FUERON VALIDADOS SATISFACTORIAMENTE</strong></center>
                        </div>  
        }else{
          if(this.state.fields.data[0].get_refuse){
            messageAlert =
                        <div class="alert alert-warning alert-document">
                          <center><strong>SUS DOCUMENTOS FUERON RECHAZADOS</strong></center>
                        </div> 
          }else{
            if(this.state.fields.data[0].get_pending_validated){
              messageAlert =
                            <div class="alert alert-warning alert-document">
                              <center><strong>SUS DOCUMENTOS NO HAN SIDO REVISADOS, O TIENE OBSERVACIONES PENDIENTES REVISE POR FAVOR</strong></center>
                            </div>
              buttons = <button class="btn btn-primary pull-right" onClick={this.sendFinishedHandler.bind(this)} >ACTUALIZAR DOCUMENTOS</button> 
            }else{
              if(this.state.fields.data[0].get_upload_obligatory_all){
                messageAlert =
                              <div class="alert alert-success alert-document">
                                <center><strong>YA HAS CARGADO LOS DOCUMENTOS OBLIGATORIOS PARA QUE SEAN VALIDADOS HAZ CLIC EN EL BOTON FINALIZAR CARGA DOCUMENTOS</strong></center>
                              </div> 
                buttons = <button class="btn btn-primary pull-right" onClick={this.sendFinishedHandler.bind(this)} >FINALIZAR CARGA DOCUMENTOS</button> 

              }else{
                messageAlert =                      
                              <div class="alert alert-danger alert-document">
                                <center><strong>NO HA CARGADO LOS DOCUMENTOS OBLIGATORIOS</strong></center>
                              </div>    
              }
            }
          }
        }
      }

      return (
        <div >
          {messageAlert}
          {fields}
          {buttons}
          {messageAlert}
        </div>
      )
    }else{
      return(
        <Loading />
      )
    }
  }
}