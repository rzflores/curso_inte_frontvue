<template>
 <v-container>
  <v-row class="justify-md-center pt-5 pb-5">
        <p class="text-h4">Permisos Roles</p>    
      </v-row>
  <v-row>
    <v-col cols="6">
    <v-list>
      <v-list-subheader><h2>Administrador</h2></v-list-subheader>

      <v-list-item
        v-for="(itemMenu, i) in ListaMenusAdmin"
        :key="i"
        :value="itemMenu.Nombre"
        color="primary"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox v-model="itemMenu.EsHabilitado" :label="itemMenu.Nombre"></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
    </v-col>
    <v-col cols="6">
    <v-list>
      <v-list-subheader><h2>Vendedor</h2></v-list-subheader>

      <v-list-item
        v-for="(itemMenu, i) in ListaMenusVendedor"
        :key="i"
        :value="itemMenu"
        color="black"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox v-model="itemMenu.EsHabilitado" :label="itemMenu.Nombre" color="deep-purple"></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
    </v-col>
  </v-row>
  <v-row>
  <v-btn type="submit" 
                    color="deep-purple"
                    block class=" mt-2">Grabar</v-btn>     

  </v-row>
 
 
  
</v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
 export default {
    data: () => ({
      ListaMenusAdmin : [],
      ListaMenusVendedor: [],
      MenusAdmin: [
        { text: 'Catalogo Productos' },
        { text: 'Cupones' },
        { text: 'Sucursales'},
        { text: 'Envios'},
        { text: 'Permisos'},
        { text: 'Usuarios'},
        { text: 'Reporte Stock'},
        { text: 'Reporte Vencimiento'},
      ],
      MenusVendedor:[
        { text: 'Catalogo' },
        { text: 'Ventas' },
      ]
    }),
    computed:{
      ...mapState('menurol',['ListaMenuRol'])
    },
    methods:{
      ...mapActions('menurol',['obtenerMenuRol'])
    },
    async beforeMount(){
      await this.obtenerMenuRol(1);
      this.ListaMenusAdmin = this.ListaMenuRol
      console.log(this.ListaMenusAdmin)
      await this.obtenerMenuRol(2);
      this.ListaMenusVendedor = this.ListaMenuRol
      console.log(this.ListaMenusAdmin)
    }
  }
  
</script>

<style scoped>
.v-label {
  color: black  !important;;
}
</style>