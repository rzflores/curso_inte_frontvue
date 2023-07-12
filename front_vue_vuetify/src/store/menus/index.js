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
       
      
     
    },
    mutations : {
        OBTENER_MENU_ROL(state , data){
          state.ListaMenuRol = data
        },
      },
}

export default MenuStore;