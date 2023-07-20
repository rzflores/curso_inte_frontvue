<template>
<v-container class="LoginContainer" fluid fill-height>
    <v-row  align="center" justify="center">    
        <v-col cols="12" sm="8" md="6">
            <v-card
                class="mx-auto"
                max-width="400">
                <v-img
                class="align-end text-white"
                height="250"
                src="https://eresdeportista.com/wp-content/uploads/2019/09/suplementos-deportivos-370x247.jpg"
                cover
                >
                </v-img>
                <v-container align="center" justify="center" >
                    <h2>Login</h2>
                     <v-divider class="pt-2"></v-divider>
                </v-container>
                <v-card-text>
                <v-sheet width="300" class="mx-auto">
                    <v-form @submit.prevent @submit="logearUsuario()">
                        <v-text-field
                            v-model="usuario.NombreUsuario"
                            label="Usuario"
                        ></v-text-field>

                        <v-text-field
                            v-model="usuario.Contrasenia"
                            label="Contraseña"
                        ></v-text-field>

                        <v-select
                        label="Sucursales"
                        v-model="usuario.SelectedItem"
                        :items="SelectSucursales"
                        item-title="text"
                        item-value="value"
                        ></v-select>

                        <v-btn type="submit" 
                        color="deep-purple" 
                        block class="mt-2">Ingresar</v-btn>
                    </v-form>
                 </v-sheet>
                </v-card-text>
            </v-card>
        </v-col>    
    </v-row>
</v-container>  
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    data () {
      return{
        usuario : {
            NombreUsuario : '',
            Contrasenia : '',
            SelectedItem : ''
        },
        SelectSucursales : [],
       
      }
    } ,
    methods : {
        ...mapActions(['loginUsuario','limpiarMsgError']),
        ...mapActions('sucursal',['obtenerSucursales']),

         async logearUsuario(){             
             await this.loginUsuario(this.usuario)
             if(Object.entries(this.UsuarioLogin) == 0)
             {
                this.$router.push('/')
             }else{
                 if( this.UsuarioLogin.Rol.IdRol == 1 ){
                    
                    this.$router.push('/homeAdmin')
                 }else{
                    this.$router.push('/home')
                 }   
             }

             if(this.MsgError != ""){
                Swal.fire({
                icon: 'error',
                text: `${this.MsgError}`,
                })
                await this.limpiarMsgError();
             }
         },
        
    },
    computed: {
        ...mapState({ UsuarioLogin : 'Usuario' , MsgError:"MensajeError"}),
        ...mapState( 'sucursal', ['ListaSucursales'])    
    },
    async beforeMount(){
       await this.obtenerSucursales()
       this.SelectSucursales = this.ListaSucursales.map( e => 
                    ({ text : e.Nombre , value: e.IdSucursal })
       )
    }

    
}
</script>
<style scoped>
.LoginContainer{
    margin-top: 3%;
}
</style>