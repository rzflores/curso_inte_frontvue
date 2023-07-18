import axios from "axios"

const ReporteStore = {
    namespaced: true,
    state : () => ({
      ListaReporteStock : [],
      ListaReporteVencimiento : []
    }),
    actions : {       
        async realizarReporteStock({ commit , rootState } , filtroStock ){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "http://localhost:4000/reporte/obtenerReporteStock"
              ,{
                Nombre : filtroStock.Nombre,
                Descripcion : filtroStock.Descripcion,
                IdCategoria : filtroStock.IdCategoria
              },{
                headers
              });
              console.log(response.data.data)
            commit("OBTENER_REPORTE_STOCK", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async realizarReporteVencimiento({ commit ,  rootState },filtroVencimiento){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "http://localhost:4000/reporte/obtenerReporteVencimiento"
            ,{
              Nombre : filtroVencimiento.Nombre,
              Descripcion: filtroVencimiento.Descripcion,
              IdCategoria: filtroVencimiento.IdCategoria,
              FechaInicio : filtroVencimiento.FechaInicio,
              FechaFin : filtroVencimiento.FechaFin
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_REPORTE_VECIMIENTO", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
       
     
    },
    mutations : {
        OBTENER_REPORTE_STOCK(state , data){
          state.ListaReporteStock = data
        },
        OBTENER_REPORTE_VECIMIENTO(state,data){
          state.ListaReporteVencimiento = data
        }
      },
}

export default ReporteStore;