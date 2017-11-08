/* Descripcion: Clase que valida el token y la autenticidad del mismo
   Autor: Carlos Agudelo
   Contacto: agudelo.carlos@hotmail.es
   Fecha de creación: 10 de Junio
   Fecha de modificacion: 10 de Junio */

  import SecretConstant from './SecretsConstant'

  // Define y exporta la clase
  export default function SelectApp(app) {

    var api
      switch(app){
        case 'technology_form':
          api = SecretConstant.TECHNOLOGY_API
          break;
        default:
          api = SecretConstant.PP_API
      }
      return api
  }