<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Cupones</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-cupones 
                  titleDialog="Agregar Cupon" 
                  nameIcon="mdi-plus"
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
                v-for="item in desserts"
                :key="item.key"
            >
                <td>{{ item.codigoCupon }}</td>
                <td>{{ item.porcentajeDescuento }}</td>
                <td>{{ item.fechaVencimiento }}</td>
                <td>{{ item.esHabilitado }}</td>
                <td>
                  <v-container> 
                  <v-row>
                    <v-col cols="6">
                      <modal-dialog-cupones 
                      titleDialog="Editar Cupon" 
                      nameIcon="mdi-square-edit-outline"
                      >
                      </modal-dialog-cupones>
                    </v-col>
                    <v-col cols="6">
                      <v-switch label="" inset></v-switch>
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
export default {
 components : {
  ModalDialogCupones
 }, 
 data () {
      return {      
        desserts: [
          {
            codigoCupon: 'XP2-12',
            porcentajeDescuento: "10.3",
            fechaVencimiento : "12/10/2023",
            esHabilitado : true
          },
          {
            codigoCupon: 'XP2-12',
            porcentajeDescuento: "20.4",
            fechaVencimiento : "12/10/2023",
            esHabilitado : false
          }
        ],
      }
    },
     
}
</script>

<style>

</style>