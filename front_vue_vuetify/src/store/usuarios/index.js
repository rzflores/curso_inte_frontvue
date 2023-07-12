import axios from "axios"

let baseUsuarioUrl = 'http://localhost:4000/usuario/';


const UsuarioStore = {
    namespaced: true,
    state : () => ({
      ListaUsuarios : [],
      UsuarioEdit: {}
    }),
    actions : {       
        async obtenerUsuarios({ commit , rootState }){
          try {
            const headers = {              
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              baseUsuarioUrl + "obtenerUsuarios"
              ,{}
              ,{ 
                headers 
              }
            );
            commit("OBTENER_USUARIOS", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerUsuario({ commit ,  rootState },IdUsuario){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              baseUsuarioUrl+"obtenerUsuario"
            ,{
              IdUsuario 
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_USUARIO", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async registrarUsuario({ dispatch, rootState},usuario){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            
            const response = await axios.post(
              baseUsuarioUrl + "registrarUsuario",
              { 
                Nombres: usuario.Nombres,
                Apellidos: usuario.Apellidos,
                Celular: usuario.Celular,
                NombreUsuario : usuario.NombreUsuario ,
                Contrasena:  usuario.Contrasena,
                EsHabilitado : usuario.EsHabilitado ,
                IdRol: usuario.IdRol,
                IdSucursal : usuario.IdSucursal 
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerUsuarios')
          } catch (error) {
            console.log(error.response);
          }
        },
        async editarUsuario({ dispatch, rootState},usuario){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              baseUsuarioUrl + "editarUsuario",
              { 
                IdUsuario : usuario.IdUsuario,
                Nombres: usuario.Nombres,
                Apellidos: usuario.Apellidos,
                Celular: usuario.Celular,
                NombreUsuario : usuario.NombreUsuario ,
                Contrasena:  usuario.Contrasena,
                EsHabilitado : usuario.EsHabilitado ,
                IdRol: usuario.IdRol,
                IdSucursal : usuario.IdSucursal 
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerUsuarios')
          } catch (error) {
            console.log(error.response);
          }
        }
    },
    mutations : {
        OBTENER_USUARIOS(state , data){
          state.ListaUsuarios = data
        },
        OBTENER_USUARIO(state,data){
          state.UsuarioEdit = data
        }
      },
}

export default UsuarioStore;