<template>
   <v-app>
   <v-toolbar
        dark        
        class="bg-deep-purple"  
        app      
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Bienvenido {{ LoginUsuario.Nombres }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="logout()" icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
  </v-toolbar>
  
  <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"        
        app
        v-model="drawer"
        temporary
      >
     <v-list color="transparent">
        <router-link to="/homeAdmin/catalogoAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Catalogo"></v-list-item></router-link>       
        <router-link to="/homeAdmin/sucursalesAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Sucursales"></v-list-item></router-link>       
        <router-link to="/homeAdmin/usuariosAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Usuarios"></v-list-item></router-link>       
        <router-link to="/homeAdmin/cuponesAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Cupones"></v-list-item></router-link>       
        <router-link to="/homeAdmin/permisosAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Permisos"></v-list-item></router-link>       
        <router-link to="/homeAdmin/enviosAdmin"><v-list-item prepend-icon="mdi-view-dashboard" title="Envios"></v-list-item></router-link>       
        <router-link to="/homeAdmin/reporteStock"><v-list-item prepend-icon="mdi-view-dashboard" title="Reporte Stock"></v-list-item></router-link>       
        <router-link to="/homeAdmin/reporteVencimiento"><v-list-item prepend-icon="mdi-view-dashboard" title="Reporte Vencimiento"></v-list-item></router-link>       
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
  </v-navigation-drawer>
      
  <v-content>  
     <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components :{
  },
  data(){
    return {
       drawer : false
    }

  },
  computed:{
    ...mapState({
      LoginUsuario : 'Usuario'
    })
  },
  methods:{
    logout(){
       this.LoginUsuario = {};
       this.$router.push('/')
    }
  }
}
</script>

<style>
a {
    text-decoration: none
}
 .router-link-exact-active{
  color: white;
 }


</style>