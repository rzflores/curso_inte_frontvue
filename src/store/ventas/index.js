import axios from "axios"

const VentaStore = {
    namespaced: true,
    state : () => ({
      boletaGuardada : null
    }),
    actions : {       
      async realizarVenta({ commit , rootState } , datosVenta){
        try {
          const headers = {
            'Content-Type': 'application/json',
            'token': rootState.Usuario.Token
          };

          const response = await axios.post(
            "/venta/realizarVenta"
            ,{
              TotalVenta: datosVenta.totalVenta,
              FechaVenta: datosVenta.fechaVenta,
              IdCupon: datosVenta.idCupon,
              ListaDetalleVenta: datosVenta.listaDetalleVenta,
            },{
              headers
            });
          console.log(response.data.data)  
          commit("REGISTRAR_VENTA", response.data.data);
        } catch (error) {
          console.log(error.response);
        }
      },
      async limpiarEstadoBoleta({ commit }){
        commit("LIMPIAR_ESTADO_VENTA")
      }
    },
    mutations : {
        REGISTRAR_VENTA(state , data){
          state.boletaGuardada = data
        },
        LIMPIAR_ESTADO_VENTA(state){
          state.boletaGuardada = null
        }
      },
}

export default VentaStore;