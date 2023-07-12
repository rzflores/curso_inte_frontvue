import axios from "axios"

const PermisoStore = {
    namespaced: true,
    state : () => ({
   
    }),
    actions : {       
        async obtenerSucursales({ commit }){
          try {
            const response = await axios.post(
              "http://localhost:4000/sucursal/obtenerSucursales"
            );
            commit("OBTENER_SUCURSALES", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerSucursal({ commit ,  rootState },IdSucursal){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "http://localhost:4000/sucursal/obtenerSucursal"
            ,{
              idSucursal : IdSucursal
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_SUCURSAL", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async registrarSucursal({ dispatch, rootState},sucursal){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "http://localhost:4000/sucursal/registrarSucursal",
              { 
                Nombre: sucursal.Nombre,
                CelularSucursal: sucursal.CelularSucursal,
                Direccion: sucursal.Direccion,
                Referencia: sucursal.Referencia
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerSucursales')
          } catch (error) {
            console.log(error.response);
          }
        },
        async editarSucursal({ dispatch, rootState},sucursal){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "http://localhost:4000/sucursal/editarSurcursal",
              { 
                IdSucursal : sucursal.IdSucursal,
                Nombre: sucursal.Nombre,
                CelularSucursal: sucursal.CelularSucursal,
                Direccion: sucursal.Direccion,
                Referencia: sucursal.Referencia
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerSucursales')
          } catch (error) {
            console.log(error.response);
          }
        }
    },
    mutations : {
        OBTENER_SUCURSALES(state , data){
          state.ListaSucursales = data
        },
        OBTENER_SUCURSAL(state,data){
          state.SucursalEdit = data
        }
      },
}

export default PermisoStore;