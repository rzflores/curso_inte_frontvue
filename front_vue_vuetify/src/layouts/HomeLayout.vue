<template>
   <v-app>
   <v-toolbar
        dark        
        class="bg-deep-purple"  
        app      
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Vuetify</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
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
        <router-link to="/home/catalogo"><v-list-item prepend-icon="mdi-view-dashboard" title="Catalogo"></v-list-item></router-link>       
        <router-link to="/home/ventas"><v-list-item prepend-icon="mdi-view-dashboard" title="Ventas"></v-list-item></router-link>       
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
export default {
  components :{
  },
  data(){
    return {
       drawer : false
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