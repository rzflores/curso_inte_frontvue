import axios from "axios"

const RolStore = {
    namespaced: true,
    state : () => ({
        ListaRoles : [],        
    }),
    actions : {       
        async obtenerRoles({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
              "/rol/obtenerRoles"
              ,
              {}
              ,
              {
                headers
              }
            );
            commit("OBTENER_ROLES", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
       
      
     
    },
    mutations : {
        OBTENER_ROLES(state , data){
          state.ListaRoles = data
        },
      },
}

export default RolStore;