import {  createStore  } from 'vuex'

import axios from "axios"
import SucursalStore from './sucursales'
import CuponStore from './cupones'
import RolStore from './roles'
import UsuarioStore from './usuarios'
import CategoriaStore from './categorias'
import UnidadMedidaStore from './unidades'
import ProductoStore from './productos'
import MenuStore from './menus'
import ReporteStore from './reportes'
import EnvioStore from './envios'
import VentaStore from './ventas'
import PermisoStore from './permisos'

const store = createStore({
    state(){
        return{
           Usuario : {},
           MensajeError : "", 
        }
    },
    actions : {
        async loginUsuario({ commit } , usuario) {
            try {
              const response = await axios.post(
                "http://localhost:4000/auth/login",
                { 
                  NombreUsuario : usuario.NombreUsuario ,
                  Contrasenia : usuario.Contrasenia ,
                  IdSucursal : usuario.SelectedItem 

                }
              );
              console.log(response.data.data)
              commit("LOGIN", response.data.data);
            } catch (error) {
              console.log(error.response);
              commit("MENSAJE" , error.response.data.mensaje)
            }
        },
        async logoutUsuario({ commit }){
          commit("LOGOUT")
        },
        async limpiarMsgError({commit}){
          commit("LIMPIAR_MSGERROR")
        }
    },
    mutations : {
        LOGIN(state, data) {
            state.Usuario = data;
        },
        LOGOUT(state){
          state.Usuario = {}
        },
        MENSAJE(state,data){
          state.MensajeError = data
        },
        LIMPIAR_MSGERROR(state){
          state.MensajeError = ""
        }
      },
      modules: {
        sucursal : SucursalStore,
        cupon : CuponStore,
        rol : RolStore,
        usuario: UsuarioStore,
        categoria: CategoriaStore,
        unidadmedida : UnidadMedidaStore,
        producto : ProductoStore,
        menurol: MenuStore,
        reporte : ReporteStore,
        envio : EnvioStore,
        venta: VentaStore,
        permisos : PermisoStore
      }
    
})

export default store;