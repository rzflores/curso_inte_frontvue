<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            @click="obtenerUsuarioPorId()"
            class="ma-2"
            color="purple"
            :icon="nameIcon" 
            v-bind="props"
        >
        </v-btn>
      </template>
      <v-card>
        <v-card-title align="center">
          <span class="text-h5">{{ titleDialog }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Nombres*"
                  v-model="usuario.Nombres"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Apellidos*"
                  v-model="usuario.Apellidos"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Usuario*"
                  v-model="usuario.NombreUsuario"
                  required
                ></v-text-field>
                 </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="usuario.Contrasena"
                  label="Contraseña*"
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="4">
                <v-text-field
                  v-model="usuario.Celular"
                  label="Celular*"
                  required
                ></v-text-field>
              </v-col>
             <v-col cols="6">
               <v-select
                  label="Rol"
                  v-model="usuario.IdRol"
                  :items="SelectRoles"
                  item-title="text"
                  item-value="value"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6">
               <v-select
                  label="Sucursal"
                  v-model="usuario.IdSucursal"
                  :items="SelectSucursales"
                  item-title="text"
                  item-value="value"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="AccionAgregarEditar()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    props :{
        titleDialog : String,
        nameIcon : String,
        typeAction: String,
        PropIdUsuario: {
          type: Number,
          default : 0
        }
    },
    data () {
      return {
        dialog: false,
        SelectRoles : [],
        SelectSucursales: [],
        usuario : {
            IdUsuario : 0,
            Nombres : '',
            Apellidos : '' ,
            Celular: '',
            NombreUsuario: '',
            Contrasena: '',
            EsHabilitado : '', 
            IdRol : '',
            IdSucursal: ''           
        }
      }
    },
    computed:{
      ...mapState('usuario', {UsuarioEdit : 'UsuarioEdit'}),
      ...mapState('rol',{ListaRoles : 'ListaRoles' }),
      ...mapState('sucursal', ['ListaSucursales'])
    },
    methods:{
      ...mapActions('usuario',['registrarUsuario','obtenerUsuario','editarUsuario']),
      ...mapActions('rol',['obtenerRoles']),
      ...mapActions('sucursal',['obtenerSucursales']),
      async AccionAgregarEditar(){
        if(this.typeAction == "A"){          
          await this.registrarUsuario(this.usuario);
        }else{
          await this.editarUsuario(this.usuario);
        }
        this.dialog = false
      },
      async obtenerUsuarioPorId(){ 
        if(this.typeAction == "A"){
          this.usuario.Nombres = "";
          this.usuario.Apellidos = "";
          this.usuario.NombreUsuario = "";          
          this.usuario.Contrasena = "";
          this.usuario.Celular= "";
          this.usuario.IdRol = "";
          this.usuario.IdSucursal =""
        }else{
          
          await this.obtenerUsuario(this.PropIdUsuario)
             this.usuario.IdUsuario = this.UsuarioEdit.IdUsuario;
             this.usuario.Nombres = this.UsuarioEdit.Nombres;
             this.usuario.Apellidos = this.UsuarioEdit.Apellidos;
             this.usuario.NombreUsuario = this.UsuarioEdit.NombreUsuario;          
             this.usuario.Contrasena = this.UsuarioEdit.Contrasena;
             this.usuario.Celular= this.UsuarioEdit.Celular;
             this.usuario.IdRol = this.UsuarioEdit.Rol.IdRol;
             this.usuario.IdSucursal =this.UsuarioEdit.Sucursal.IdSucursal
         }
      }
    },
   async beforeMount(){
      await this.obtenerRoles();
      this.SelectRoles = this.ListaRoles.map( e => 
                    ({ text : e.Nombre , value: e.IdRol })
       )
       await this.obtenerSucursales();
         this.SelectSucursales = this.ListaSucursales.map( e => 
                    ({ text : e.Nombre , value: e.IdSucursal })
       )
      
   } 
  
  }
</script>