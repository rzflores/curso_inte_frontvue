import axios from "axios"


const ProductoStore = {
    namespaced: true,
    state : () => ({
      ListaProductos : [],
      ProductoEdit: {}
    }),
    actions : {       
        async obtenerProductos({ commit , rootState }){
          try {

            const headers = {
              'token': rootState.Usuario.Token
            };

            console.log(rootState.Usuario.Sucursal.IdSucursal)
            const response = await axios.post(
              "/producto/obtenerProductos"
              ,
              {
                IdSucursal : rootState.Usuario.Sucursal.IdSucursal
              },
              {
                headers
              }
            );
            commit("OBTENER_PRODUCTOS", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerProducto({ commit ,  rootState },IdProducto){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/producto/obtenerProducto"
            ,{
              IdProducto 
            },{
              headers
            });
            console.log(response.data.data)
            commit("OBTENER_PRODUCTO", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
        async registrarProducto({ dispatch, rootState},producto){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/producto/registrarProducto",
              { 
                NombreProducto: producto.NombreProducto,
                DescripcionCorta: producto.DescripcionCorta,
                DescripcionLarga: producto.DescripcionLarga,
                PrecioUnitario: producto.PrecioUnitario,
                StockActual:producto.StockActual,
                UrlImagen:producto.UrlImagen,
                FechaVencimiento:producto.FechaVencimiento,
                IdCategoria:producto.IdCategoria,
                IdUnidadMedida:producto.IdUnidadMedida,
                IdSucursal: rootState.Usuario.Sucursal.IdSucursal,
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerProductos')
          } catch (error) {
            console.log(error.response);
          }
        },
        async editarProducto({ dispatch, rootState},producto){
          try {
            const headers = {
              'Content-Type': 'application/json',
              'token': rootState.Usuario.Token
            };
            const response = await axios.post(
              "/producto/editarProducto",
              { 
                IdProducto : producto.IdProducto,
                NombreProducto: producto.NombreProducto,
                DescripcionCorta: producto.DescripcionCorta,
                DescripcionLarga: producto.DescripcionLarga,
                PrecioUnitario: producto.PrecioUnitario,
                StockActual:producto.StockActual,
                UrlImagen:producto.UrlImagen,
                FechaVencimiento:producto.FechaVencimiento,
                IdCategoria:producto.IdCategoria,
                IdUnidadMedida:producto.IdUnidadMedida,
                IdSucursal: rootState.Usuario.Sucursal.IdSucursal,
              },{
                headers
              }
            );
            console.log(response.data.data)
            dispatch('obtenerProductos')
          } catch (error) {
            console.log(error.response);
          }
        },
        async obtenerProductosLike({ commit , rootState },filtroProducto ){
          try {

            const headers = {
              'token': rootState.Usuario.Token
            };

            const response = await axios.post(
              "/producto/obtenerProductosLikeNombre"
              ,
              {
                IdSucursal : rootState.Usuario.Sucursal.IdSucursal,
                NombreProducto: filtroProducto
              },
              {
                headers
              }
            );
            console.log(response.data.data)
            commit("OBTENER_PRODUCTOS", response.data.data);
          } catch (error) {
            console.log(error.response);
          }
        },
    },
    mutations : {
        OBTENER_PRODUCTOS(state , data){
          state.ListaProductos = data
        },
        OBTENER_PRODUCTO(state,data){
          state.ProductoEdit = data
        }
      },
}

export default ProductoStore;