import axios from "axios"
import MenuStore  from '../menus/index'

const PermisoStore = {
    namespaced: true,
    state : () => ({
      exitoCambioAdmin : false,
      exitoCambioVendedor : false,
      listaMenuRolAdmin : [],
      listaMenuRolVendedor : []
    }),
    actions : {       
        async EditarCambioMenuEstAdmin({ commit , rootState  },DatosCambioMenuEstAdmin){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/menu/cambiarEstadoMenus"
            ,{
              IdRol : DatosCambioMenuEstAdmin.idRol,
              ListaMenus : DatosCambioMenuEstAdmin.listaCambioMenuEstAdmin
            },{
              headers
            });
            //console.log(response.data.data)
            if(response.data.data == true){
              commit("CAMBIAR_ESTADO_ADMIN")
              await MenuStore.dispatch('obtenerMenuRol',2)

            }
          } catch (error) {
            console.log(error.response);
          }
        },
        async EditarCambioMenuEstVendedor({ commit , rootState },DatosCambioMenuEstVendedor){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/menu/cambiarEstadoMenus"
            ,{
              IdRol : DatosCambioMenuEstVendedor.idRol,
              ListaMenus : DatosCambioMenuEstVendedor.listaCambioMenuEstVendedor
            },{
              headers
            });
            if(response.data.data === true){
              commit("CAMBIAR_ESTADO_VENDEDOR")
              await MenuStore.dispatch('obtenerMenuRol',1)
            }
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerMenuRolAdmin({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
                "/menu/obtenerMenusRol"
              ,
              {
                IdRol : 2
              }
              ,
              {
                headers
              }
            );
            commit("OBTENER_MENU_ROL_ADMIN", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerMenuRolVendedor({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
                "/menu/obtenerMenusRol"
              ,
              {
                IdRol : 1
              }
              ,
              {
                headers
              }
            );
            commit("OBTENER_MENU_ROL_VENDEDOR", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
    },
    mutations : {
      CAMBIAR_ESTADO_ADMIN(state){
        state.exitoCambioAdmin = true;
      },
      CAMBIAR_ESTADO_VENDEDOR(state){
        state.exitoCambioVendedor = true;
      },
      OBTENER_MENU_ROL_ADMIN(state , data){
        state.listaMenuRolAdmin = data
      },
      OBTENER_MENU_ROL_VENDEDOR(state , data){
        state.listaMenuRolVendedor = data
      }
    },
}

export default PermisoStore;