import axios from "axios"


let baseSucursalUrl = 'http://localhost:4000/sucursal/';

const SucursalStore = {
    namespaced: true,
    state : () => ({
           ListaSucursales : [],
           SucursalEdit: {}
    }),
    actions : {       
        async obtenerSucursales({ commit }){
          try {
            const response = await axios.post(
              baseSucursalUrl + "obtenerSucursales"
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
              baseSucursalUrl+"obtenerSucursal"
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
              baseSucursalUrl+"registrarSucursal",
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
              baseSucursalUrl+"editarSurcursal",
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

export default SucursalStore;