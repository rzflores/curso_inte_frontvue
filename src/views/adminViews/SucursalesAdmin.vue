<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Sucursales</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-sucursales 
                  titleDialog="Agregar Sucursal" 
                  nameIcon="mdi-plus"
                  typeAction="A"
                  >
                  </modal-dialog-sucursales>
  </v-row>
  <v-row class="justify-md-center pt-4">
  <v-table
            fixed-header
            height="350px"
        >
            <thead>
            <tr>
                <th class="text-left">
                    Nombre Sucursal
                </th>
                <th class="text-left">
                    Celular
                </th>
                <th class="text-left">
                    Dirección
                </th>
                <th class="text-left">
                    Referencia
                </th>
                <th>
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="sucursal in ListaSucursales"
                :key="sucursal.IdSucursal"
            >
                <td>{{ sucursal.Nombre }}</td>
                <td>{{ sucursal.CelularSucursal }}</td>
                <td>{{ sucursal.Direccion }}</td>
                <td>{{ sucursal.Referencia }}</td>
                <td> 
                  <modal-dialog-sucursales 
                  titleDialog="Editar Sucursal" 
                  nameIcon="mdi-square-edit-outline"
                  typeAction="E"
                  :PropIdSucursal="sucursal.IdSucursal"
                  >
                  </modal-dialog-sucursales>
                </td>
            </tr>           
            </tbody>
        </v-table>
  </v-row>
  
</v-container>
</template>

<script>
import ModalDialogSucursales from '../../components/ModalDialogSucursales.vue'
import { mapActions , mapState } from 'vuex'


export default {
 components : {
  ModalDialogSucursales
 }, 
 data () {
      return {      
       
       
      }
    },
 computed:{
  ...mapState('sucursal',{ ListaSucursales : 'ListaSucursales',})
 },   
 methods:{
   ...mapActions( 'sucursal' , ['obtenerSucursales']),
 
 },   
 async beforeMount(){
      await this.obtenerSucursales()
     
    }   
     
}
</script>

<style>

</style>