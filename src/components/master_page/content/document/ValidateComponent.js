import $ from 'jquery'
import React from 'react'

import UploadInput from './UploadInput'

import DocumentAction from '../../../../actions/DocumentAction'

import Constant from '../../../../utils/Constants'

export default class ValidateComponent extends React.Component {

  constructor(){
  	super()
  }

  onSubmitValidate(ev){
    ev.preventDefault()
    let form_data = $(ev.target).serializeArray()
    let data = this.getParams(form_data[0].value)
    console.log(data)
    DocumentAction.SendValidate(data)
  }

  getParams(idForm){
    var obj ={};
    obj['id_form'] = idForm;
    obj['pre_validation'] = $('#'+idForm+' input[name=pre_validation]').prop('checked')
    obj['final_validation'] = $('#'+idForm+' input[name=final_validation]').prop('checked')
    obj['observation'] = $('#'+idForm+' input[name=observation]').val()
    return obj
  }

  render() {     
    return(
      <div class="component well">
        <form onSubmit={this.onSubmitValidate.bind(this)} id={this.props.data.id} enctype="multipart/form-data">
          <input type="hidden" name="id_form" value={this.props.data.id} />
          <div class="row">
            <div class="col col-md-12">
              <h4><strong>{this.props.data.document_name}</strong></h4>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-2">
              <label>DOCUMENTO:</label>
            </div>
            <div class="col col-md-6">
              <a href={'ftp://192.168.1.2/'+this.props.data.file_url} target="_blank" >{this.props.data.file_file_name}</a>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-2">
              <label>VALIDACIÓN UNO:</label>
            </div>
            <div class="col col-md-1">
              <input type="checkbox" name="pre_validation" name="pre_validation" />
            </div>
            <div class="col col-md-2">
              <label>VALIDACIÓN DOS:</label>
            </div>
            <div class="col col-md-1">
              <input type="checkbox" name="final_validation" />
            </div>
            <div class="col col-md-6">
              <label class="control-label">OBSERVACIONES: </label>
              <input type="text" name="observation" id={this.props.data.document_id} value={this.props.data.observation} />
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <input type="submit" value="ENVIAR" class="btn btn-primary btn-sm pull-right" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}