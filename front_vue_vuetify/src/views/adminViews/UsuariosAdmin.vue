<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar Usuarios</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-usuarios 
                  titleDialog="Agregar Usuario" 
                  nameIcon="mdi-plus"
                  typeAction="A"
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
                v-for="usu in ListaUsuarios"
                :key="usu.IdUsuario"
            >
                <td>{{ usu.Nombres }}</td>
                <td>{{ usu.Apellidos }}</td>
                <td>{{ usu.Celular }}</td>
                <td>{{ usu.NombreUsuario }}</td>
                <td>{{ usu.EsHabilitado }}</td>
                <td>{{ usu.Rol.Nombre }}</td>
                <td>{{ usu.Sucursal.Nombre }}</td>
                <td> 
                  <v-container> 
                  <v-row>
                    <v-col cols="6">
                      <modal-dialog-usuarios 
                      titleDialog="Editar Usuario" 
                      nameIcon="mdi-square-edit-outline"
                       typeAction="E"
                      :PropIdUsuario="usu.IdUsuario"
                      >
                      </modal-dialog-usuarios>
                    </v-col>
                    <v-col cols="6">
                      <v-switch v-model="usu.EsHabilitado" @click="cambiarEstado(usu.IdUsuario)" label="" inset></v-switch>
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
import { mapActions , mapState } from 'vuex'
import ModalDialogUsuarios from '../../components/ModalDialogUsuarios.vue'
export default {
 components : {
  ModalDialogUsuarios
 }, 
 data () {
      return {      
      }
    },
  computed:{
  ...mapState('usuario',{ ListaUsuarios : 'ListaUsuarios',UsuarioEdit :'UsuarioEdit'})
 },   
 methods:{
   ...mapActions( 'usuario' , ['obtenerUsuarios','obtenerUsuario','editarUsuario']),
    async cambiarEstado(IdUsuario){
      await this.obtenerUsuario(IdUsuario)
      this.UsuarioEdit.EsHabilitado = !this.UsuarioEdit.EsHabilitado;
      await this.editarUsuario(this.UsuarioEdit)
    }
 },   
 async beforeMount(){
      await this.obtenerUsuarios()
     
    }      
}
</script>

<style>

</style>