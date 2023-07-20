import axios from "axios"

const UnidadMedidaStore = {
    namespaced: true,
    state : () => ({
        ListaUnidadMedida : [],        
    }),
    actions : {       
        async obtenerUnidadMedidas({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
              "/unidadMedidas/obtenerUnidadMedidas"
              ,
              {}
              ,
              {
                headers
              }
            );
            commit("OBTENER_UNIDADMEDIDAS", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
       
      
     
    },
    mutations : {
        OBTENER_UNIDADMEDIDAS(state , data){
          state.ListaUnidadMedida = data
        },
      },
}

export default UnidadMedidaStore;