<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            @click="obtenerProductoPorId()"
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
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Nombre del Producto*"
                  required
                  v-model="producto.NombreProducto"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  label="Categoria"
                  :items="SelectCategorias"
                  item-title="text"
                  item-value="value"
                  v-model="producto.IdCategoria"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  label="Descripcion Corta*"
                  required
                  v-model="producto.DescripcionCorta"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea 
                 label="Descripcion Larga*"
                 required
                 v-model="producto.DescripcionLarga"
                 >
                </v-textarea>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  label="Url Imagen*"
                  required
                  v-model="producto.UrlImagen"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Precio Unitario*"
                  required
                  v-model="producto.PrecioUnitario"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
               <v-select
                  label="Unidad medidas"
                  :items="SelectUnidadMedidas"
                  item-title="text"
                  item-value="value"
                  v-model="producto.IdUnidadMedida"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Fecha Vencimiento*"
                  required
                  v-model="producto.FechaVencimiento"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Stock*"
                  required
                   v-model="producto.StockActual"
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
        PropIdProducto: {
          type: Number,
          default : 0
        }
    },
    data () {
      return {
        dialog: false,
        SelectCategorias : [],
        SelectUnidadMedidas : [],
        producto : {
            IdProducto : 0,
            NombreProducto : '',
            DescripcionCorta : 0 ,
            DescripcionLarga: '',
            PrecioUnitario: '',
            StockActual: '',
            UrlImagen : '',
            FechaVencimiento: '',
            IdCategoria:'',
            IdUnidadMedida:'',
        }
      }
    },
    computed:{
      ...mapState('categoria',['ListaCategorias' ]),
      ...mapState('unidadmedida', ['ListaUnidadMedida']),
      ...mapState( 'producto', { ProductoEdit : 'ProductoEdit'})
    },
    methods:{
      ...mapActions('categoria',['obtenerCategorias']),
      ...mapActions('unidadmedida',['obtenerUnidadMedidas']),
      ...mapActions('producto',['registrarProducto','obtenerProducto','editarProducto']),
      async AccionAgregarEditar(){
        if(this.typeAction == "A"){          
          await this.registrarProducto(this.producto);
        }else{
          await this.editarProducto(this.producto);
        }
        this.dialog = false
      },
      async obtenerProductoPorId(){ 
        if(this.typeAction == "A"){
          this.producto.NombreProducto = "";
          this.producto.FechaVencimiento = "";
          this.producto.DescripcionCorta = "";          
          this.producto.DescripcionLarga = "";  
          this.producto.PrecioUnitario = "";  
          this.producto.StockActual = "";
          this.producto.UrlImagen = "";
          this.producto.FechaVencimiento = "";
          this.producto.IdCategoria = "";
          this.producto.IdUnidadMedida = "";
        }else{
          await this.obtenerProducto(this.PropIdProducto)
          console.log(this.ProductoEdit)
             this.producto.IdProducto = this.ProductoEdit.IdProducto;
             this.producto.NombreProducto = this.ProductoEdit.NombreProducto;
             this.producto.FechaVencimiento = this.ProductoEdit.FechaVencimiento;
             this.producto.DescripcionCorta = this.ProductoEdit.DescripcionCorta;
             this.producto.DescripcionLarga = this.ProductoEdit.DescripcionLarga;
             this.producto.PrecioUnitario = this.ProductoEdit.PrecioUnitario;
             this.producto.StockActual = this.ProductoEdit.StockActual;
             this.producto.UrlImagen = this.ProductoEdit.UrlImagen;
             this.producto.FechaVencimiento = this.ProductoEdit.FechaVencimiento;
             this.producto.IdCategoria = this.ProductoEdit.Categoria.IdCategoria;
             this.producto.IdUnidadMedida = this.ProductoEdit.UnidadMedida.IdUnidadMedida;


         }
      }
    },
    async beforeMount(){
      await this.obtenerCategorias();
      this.SelectCategorias = this.ListaCategorias.map( e => 
                    ({ text : e.Nombre , value: e.IdCategoria })
       )
       await this.obtenerUnidadMedidas();
      this.SelectUnidadMedidas = this.ListaUnidadMedida.map( e => 
                    ({ text : e.Numero + ' ' + e.NombreGramajeLargo , value: e.IdUnidadMedida })
       )
    }
  }
</script>