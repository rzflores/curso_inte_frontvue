<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar Usuarios</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-usuarios 
                  titleDialog="Agregar Usuario" 
                  nameIcon="mdi-plus"
                  >
                  </modal-dialog-usuarios>

   
  </v-row>
  <v-row class="justify-md-center pt-4">
  <v-table
            fixed-header
            height="300px"

        >
            <thead>
            <tr>
                <th class="text-left">
                    Nombres
                </th>
                <th class="text-left">
                    Apellidos
                </th>
                <th class="text-left">
                    Celular
                </th>
                <th class="text-left">
                    Usuario
                </th>
                <th class="text-left">
                    Habilitado
                </th>
                <th class="text-left">
                    Rol
                </th>
                <th class="text-left">
                    Surcursal
                </th>
                <th class="text-left">
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in desserts"
                :key="item.key"
            >
                <td>{{ item.nombres }}</td>
                <td>{{ item.apellidos }}</td>
                <td>{{ item.celular }}</td>
                <td>{{ item.usuario }}</td>
                <td>{{ item.habilitado }}</td>
                <td>{{ item.habilitado }}</td>
                <td>{{ item.habilitado }}</td>
                <td> 
                  <v-container> 
                  <v-row>
                    <v-col cols="6">
                      <modal-dialog-usuarios 
                      titleDialog="Editar Usuario" 
                      nameIcon="mdi-square-edit-outline"
                      >
                      </modal-dialog-usuarios>
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
import ModalDialogUsuarios from '../../components/ModalDialogUsuarios.vue'
export default {
 components : {
  ModalDialogUsuarios
 }, 
 data () {
      return {      
        desserts: [
          {
            nombres: 'pepito',
            apellidos: "flores",
            celular : "998442211",
            usuario : "user1021",
            habilitado : true,
            rol : "Administrador",
            sucursal : "Almacen",
          },
          {
            nombres: 'test',
            apellidos: "flores",
            celular : "998442211",
            usuario : "user1021",
            habilitado : false,
             rol : "Vendedor",
            sucursal : "Almacen",
          }
        ],
      }
    },
     
}
</script>

<style>

</style>