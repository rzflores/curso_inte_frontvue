<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            @click="obtenerSucursalPorId()"
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
                  label="Nombre*"
                  required
                  v-model="sucursal.Nombre"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-text-field
                  label="Celular*"
                  required
                  v-model="sucursal.CelularSucursal"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Direccion*"
                  required
                  v-model="sucursal.Direccion"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Referencia*"
                  required
                  v-model="sucursal.Referencia"
                ></v-text-field>
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
        PropIdSucursal: {
          type: Number,
          default : 0
        }
    },
    data () {
      return {
        dialog: false,
        sucursal : {
            IdSucursal : 0,
            Nombre : '',
            CelularSucursal : 0 ,
            Direccion: '',
            Referencia: '',
        }
      }
    },
    computed:{
      ...mapState( 'sucursal', {SucursalEdit : 'SucursalEdit'})
    },
    methods:{
      ...mapActions('sucursal',['registrarSucursal','obtenerSucursal','editarSucursal']),
      async AccionAgregarEditar(){
        if(this.typeAction == "A"){          
          await this.registrarSucursal(this.sucursal);
        }else{
          await this.editarSucursal(this.sucursal);
        }
        this.dialog = false
      },
      async obtenerSucursalPorId(){ 
        if(this.typeAction == "A"){
          this.sucursal.Nombre = "";
          this.sucursal.CelularSucursal = "";
          this.sucursal.Direccion = "";
          this.sucursal.Referencia = "";
        }else{
          await this.obtenerSucursal(this.PropIdSucursal)
           console.log(this.SucursalEdit)
             this.sucursal.IdSucursal = this.SucursalEdit.IdSucursal;
             this.sucursal.Nombre = this.SucursalEdit.Nombre;
             this.sucursal.CelularSucursal = this.SucursalEdit.CelularSucursal;
             this.sucursal.Direccion = this.SucursalEdit.Direccion;
             this.sucursal.Referencia = this.SucursalEdit.Referencia;
         }
        }         
    },
    
    
    
  }
</script>