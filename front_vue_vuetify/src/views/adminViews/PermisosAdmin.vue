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
        v-for="(item, i) in MenusAdmin"
        :key="i"
        :value="item"
        color="primary"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox :label="item.text"></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
    </v-col>
    <v-col cols="6">
    <v-list>
      <v-list-subheader><h2>Vendedor</h2></v-list-subheader>

      <v-list-item
        v-for="(item, i) in MenusVendedor"
        :key="i"
        :value="item"
        color="black"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox :label="item.text" color="deep-purple"></v-checkbox>
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
 export default {
    data: () => ({
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
  }
</script>

<style scoped>
.v-label {
  color: black  !important;;
}
</style>