<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            @click="obtenerCuponPorId()"
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
              <v-col cols="12">
                <v-text-field
                  label="Codigo Cupon*"
                  required
                  v-model="cupon.Codigo"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-text-field
                  label="Porcentaje Descuento*"
                  required
                  v-model="cupon.PorcentajeDescuento"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Fecha Vencimiento*"
                  placeholder="yyyy/mm/dd"
                  required
                  v-model="cupon.FechaVencimiento"
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
        PropIdCupon: {
          type: Number,
          default : 0
        }
    },
    data () {
      return {
        dialog: false,
        cupon : {
            IdCupon : 0,
            Codigo : '',
            PorcentajeDescuento : 0 ,
            FechaVencimiento: '',
            EsHabilitado: '',
        }
      }
    },
    computed:{
      ...mapState( 'cupon', {CuponEdit : 'CuponEdit'})
    },
    methods:{
      ...mapActions('cupon',['registrarCupon','obtenerCupon','editarCupon']),
      async AccionAgregarEditar(){
        if(this.typeAction == "A"){          
          await this.registrarCupon(this.cupon);
        }else{
          await this.editarCupon(this.cupon);
        }
        this.dialog = false
      },
      async obtenerCuponPorId(){ 
        if(this.typeAction == "A"){
          this.cupon.Codigo = "";
          this.cupon.FechaVencimiento = "";
          this.cupon.PorcentajeDescuento = "";          
        }else{
          await this.obtenerCupon(this.PropIdCupon)
             this.cupon.IdCupon = this.CuponEdit.IdCupon;
             this.cupon.Codigo = this.CuponEdit.Codigo;
             this.cupon.FechaVencimiento = this.CuponEdit.FechaVencimiento;
             this.cupon.PorcentajeDescuento = this.CuponEdit.PorcentajeDescuento;
         }
      }
    }
  }
</script>