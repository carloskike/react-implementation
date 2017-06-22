import $ from 'jquery'
import React from 'react';
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import DocumentAction from '../../../../actions/DocumentAction'
import DocumentStore from '../../../../stores/DocumentStore'

import MessageFlash from '../../../../components/MessageFlash'

import Constant from '../../../../utils/Constants'

@ReactMixin.decorate(Reflux.connect(DocumentStore, 'response'))
export default class ListDocuments extends React.Component {

  constructor(){
  	super()
  }

  sendDocumentSave(ev){
    ev.preventDefault()   
    DocumentAction.SaveDocument(this.getParams())
  }

  getParams(){
    var obj = {};
    obj['name'] = $('#name').val()
    obj['description'] = $('#description').val()
    obj['legalization'] = $('#type').prop('checked')
    obj['obligatory'] = $('#require').prop('checked')
    return obj
  }

  validateFields(){    
    if($('#name').val() == '' || $('#description').val() == ''){
      return false
    }else{
      return true
    }
  }

  render() {
    return (
      <div class="">
        <div class="page-title">
          <div class="x_title">
            <h3>CREAR DOCUMENTO</h3>
          </div>
          <div class="x_content">
            <div class="component well">
              <form onSubmit={this.sendDocumentSave.bind(this)} >
                <MessageFlash data={this.state.response} />
                <div class="form-group">
                  <label for="name">NOMBRE: </label>
                  <input type="text" id="name" class="form-control" placeholder="NOMBRE DOCUMENTO" />
                </div>
                <div class="form-group">
                  <label for="description">DESCRIPCIÓN: </label>
                  <input type="text" id="description" class="form-control" placeholder="DESCRIPCIÓN DOCUMENTO" />
                </div>
                <div class="row">
                  <div class="col col-md-4">
                    <label class="pull-right">LEGALIZACIÓN: <input type="checkbox" id="type" /></label>
                  </div>
                  <div class="col col-md-4">
                    <label class="pull-right">OBLIGATORIO: <input type="checkbox" id="require" /></label>
                  </div>
                  <div class="col col-md-4">
                    <input type="submit" class="btn btn-primary btn-sm pull-right" value="GUARDAR" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>        
    )
  }
}
