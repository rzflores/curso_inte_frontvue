import axios from "axios"

const CategoriaStore = {
    namespaced: true,
    state : () => ({
        ListaCategorias : [],        
    }),
    actions : {       
        async obtenerCategorias({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
              "http://localhost:4000/categoria/obtenerCategorias"
              ,
              {}
              ,
              {
                headers
              }
            );
            commit("OBTENER_CATEGORIAS", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
       
      
     
    },
    mutations : {
        OBTENER_CATEGORIAS(state , data){
          state.ListaCategorias = data
        },
      },
}

export default CategoriaStore;