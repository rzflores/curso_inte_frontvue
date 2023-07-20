import axios from "axios"

const EnvioStore = {
    namespaced: true,
    state : () => ({
      guiaGuardada : null
    }),
    actions : {       
        async enviarProductos({ commit , rootState } , datosEnvio){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };

            const response = await axios.post(
              "/envio/realizarEnvio"
              ,{
                FechaSalida: datosEnvio.fechaSalida,
                FechaLlegada: datosEnvio.fechaLlegada,
                NombreConductor: datosEnvio.nombreConductor,
                CelularConductor: datosEnvio.celularConductor,
                PlacaVehiculo: datosEnvio.placaVehiculo,
                IdUsuario: datosEnvio.idUsuario,
                IdSucursalOrigen: datosEnvio.idSucursalOrigen,
                IdSucursalDestino: datosEnvio.idSucursalDestino,
                ListaDetalleEnvio: datosEnvio.listaDetalleEnvio
              },{
                headers
              });
            console.log(response.data.data)  
            commit("REGISTRAR_ENVIO", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async limpiarEstadoGuia({ commit }){
          commit("LIMPIAR_ESTADO_GUIA")
        }
        
        
        
    },
    mutations : {
        REGISTRAR_ENVIO(state , data){
          state.guiaGuardada = data
        },
        LIMPIAR_ESTADO_GUIA(state){
          state.guiaGuardada = null
        }
        
      },
}

export default EnvioStore;