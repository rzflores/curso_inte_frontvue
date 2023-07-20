import axios from "axios"

const CuponStore = {
    namespaced: true,
    state : () => ({
        ListaCupones : [],
        CuponEdit: {},
        MensajeErrorCupon : "", 
    }),
    actions : {       
        async obtenerCupones({ commit , rootState }){
          try {
            const headers = {
                'token': rootState.Usuario.Token
              };

            const response = await axios.post(
              "/cupon/obtenerCupones"
              ,
              {}
              ,
              {
                headers
              }
            );
            commit("OBTENER_CUPONES", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerCupon({ commit ,  rootState },IdCupon){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/cupon/obtenerCupon"
            ,{
                IdCupon
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_CUPON", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async registrarCupon({ dispatch, rootState},cupon){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/cupon/registrarCupon",
              { 
                Codigo: cupon.Codigo,
                PorcentajeDescuento: cupon.PorcentajeDescuento,
                FechaVencimiento: cupon.FechaVencimiento,
                EsHabilitado: cupon.EsHabilitado
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerCupones')
          } catch (error) {
            console.log(error.response);
          }
        },
        async editarCupon({ dispatch, rootState},cupon){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/cupon/editarCupon",
              { 
                IdCupon : cupon.IdCupon,
                Codigo: cupon.Codigo,
                PorcentajeDescuento: cupon.PorcentajeDescuento,
                FechaVencimiento: cupon.FechaVencimiento,
                EsHabilitado: cupon.EsHabilitado
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerCupones')
          } catch (error) {
            console.log(error.response);
          }
        },
        async verificarCupon({ commit ,  rootState },codigoCupon){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/cupon/verificarCupon"
            ,{
              CodigoCupon : codigoCupon
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_CUPON", response.data.data);
          } catch (error) {
            console.log(error.response);
            commit("MENSAJE" , error.response.data.mensaje)
          }
        },
        async limpiarMsgError({commit}){
          commit("LIMPIAR_MSGERROR")
        }
    },
    mutations : {
        OBTENER_CUPONES(state , data){
          state.ListaCupones = data
        },
        OBTENER_CUPON(state,data){
          state.CuponEdit = data
        },
        MENSAJE(state,data){
          state.MensajeErrorCupon = data
        },
        LIMPIAR_MSGERROR(state){
          state.MensajeErrorCupon = ""
        }
      },
}

export default CuponStore;