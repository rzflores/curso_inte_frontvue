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

const store = createStore({
    state(){
        return{
           Usuario : {}, 
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
            }
        },
    },
    mutations : {
        LOGIN(state, data) {
            state.Usuario = data;
        },
      },
      modules: {
        sucursal : SucursalStore,
        cupon : CuponStore,
        rol : RolStore,
        usuario: UsuarioStore,
        categoria: CategoriaStore,
        unidadmedida : UnidadMedidaStore,
        producto : ProductoStore,
        menurol: MenuStore
      }
    
})

export default store;