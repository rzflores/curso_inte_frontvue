import axios from "axios"

let baseMenuUrl = 'http://localhost:4000/menu/'
const MenuStore = {
    namespaced: true,
    state : () => ({
        ListaMenuRol : [],        
    }),
    actions : {       
        async obtenerMenuRol({ commit , rootState },IdRol){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
                baseMenuUrl+"obtenerMenusRol"
              ,
              {
                IdRol 
              }
              ,
              {
                headers
              }
            );
            commit("OBTENER_MENU_ROL", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerMenuRolFiltrado({ commit , rootState },IdRol){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
                baseMenuUrl+"obtenerMenusRol"
              ,
              {
                IdRol 
              }
              ,
              {
                headers
              }
            );
            commit("OBTENER_MENU_ROL_FILTRADO", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async limpiarMenuRol({ commit }){
          commit('LIMPIAR_MENU_ROL')
        }
      
     
    },
    mutations : {
        OBTENER_MENU_ROL(state , data){
          state.ListaMenuRol = data
        },
        LIMPIAR_MENU_ROL(state){
          state.ListaMenuRol = []
        },
        OBTENER_MENU_ROL_FILTRADO(state,data){
          state.ListaMenuRol = data.filter(item => item.EsHabilitado === true)
        }
      },
}

export default MenuStore;