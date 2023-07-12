<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Cupones</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-cupones 
                  titleDialog="Agregar Cupon" 
                  nameIcon="mdi-plus"
                   typeAction="A"
                  >
                  </modal-dialog-cupones>
  </v-row>
  <v-row class="justify-md-center pt-4">
  <v-table
            fixed-header
            height="300px"

        >
            <thead>
            <tr>
                <th class="text-left">
                    Codigo 
                </th>
                <th class="text-left">
                    Porcentaje Descuento
                </th>
                <th class="text-left">
                    fecha Vencimiento
                </th>
                <th class="text-left">
                    Habilitado
                </th>
                <th>
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="cupon in ListaCupones"
                :key="cupon.IdCupon"
            >
                <td>{{ cupon.Codigo }}</td>
                <td>{{ cupon.PorcentajeDescuento }}</td>
                <td>{{ cupon.FechaVencimiento }}</td>
                <td>{{ cupon.EsHabilitado }}</td>
                <td>
                  <v-container> 
                  <v-row>
                    <v-col cols="6">
                      <modal-dialog-cupones 
                      titleDialog="Editar Cupon" 
                      nameIcon="mdi-square-edit-outline"
                      typeAction="E"
                      :PropIdCupon="cupon.IdCupon"
                      >
                      </modal-dialog-cupones>
                    </v-col>
                    <v-col cols="6">
                      <v-switch  v-model="cupon.EsHabilitado" @click="cambiarEstado(cupon.IdCupon)" label="" inset></v-switch>
                    </v-col>
                  </v-row>
                  </v-container>
                </td>
            </tr>           
            </tbody>
        </v-table>
  </v-row>
  
</v-container>
</template>

<script>
import ModalDialogCupones from '../../components/ModalDialogCupones.vue'
import { mapActions , mapState } from 'vuex'

export default {
 components : {
  ModalDialogCupones
 }, 
 data () {
      return {      
       
      }
    },
  computed:{
  ...mapState('cupon',{ ListaCupones : 'ListaCupones', CuponEdit :'CuponEdit'})
 },   
 methods:{
   ...mapActions( 'cupon' , ['obtenerCupones','editarCupon','obtenerCupon']),
  async cambiarEstado(IdCupon){
    await this.obtenerCupon(IdCupon)
    this.CuponEdit.EsHabilitado = !this.CuponEdit.EsHabilitado;
    await this.editarCupon(this.CuponEdit)
  }
 },   
 async beforeMount(){
      
      await this.obtenerCupones()
      
     
    }   
        
}
</script>

<style>

</style>