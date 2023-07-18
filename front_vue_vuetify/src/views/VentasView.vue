<template>
   <v-container>
         <v-autocomplete
          v-model="selectedProducto"
          :items="optionsProductos"
          item-title="text"
          item-value="value"
          label="Buscar producto"
          append-icon="mdi-magnify"
          variant="solo"
          density="compact"
          dense
          hide-details
          no-data-text="Sin Stock de  Productos"
          @change="changeProducto"
      ></v-autocomplete>

          <v-btn type="submit" 
                    color="deep-purple"
                    @click="agregarProducto()"
                    block class=" mt-2">Agregar</v-btn>        
                  
        <v-table
            fixed-header
            height="300px"
        >
            <thead>
            <tr>
                <th class="text-left">
                    Nombre Producto
                </th>
                <th class="text-left">
                    Precio
                </th>
                <th class="text-left">
                    Cantidad
                </th>
                <th class="text-left">
                    SubTotal
                </th>
                <th class="text-left">
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in productosVenta"
                :key="item.key"
            >
                <td>{{ item.nombreProducto }}</td>
                <td>{{ item.precioProducto }}</td>
                <td width="300px"> 
                    <v-text-field >
                    <template v-slot:append>
                    <v-icon 
                      @click="aumentarCantidad(item.idProducto)"
                      color="red">
                        mdi-plus
                    </v-icon>
                    </template>
                    {{ item.cantidadProducto }}
                    <template v-slot:prepend>
                    <v-icon
                      @click="disminuirCantidad(item.idProducto)" 
                      color="green">
                        mdi-minus
                    </v-icon>
                    </template>
                    </v-text-field>
                </td>
                <td><p>{{ item.subTotalProducto }}</p></td>
                <td> 
                     <v-btn
                        @click="quitarProducto(item.indiceProducto)"
                        class="ma-2"
                        color="purple"
                        icon="mdi-cancel"
                    ></v-btn>
                </td>
            </tr>           
            </tbody>
        </v-table>
         <v-row>
            <v-col cols="8">
            </v-col>      
            <v-col cols="4">
             <v-row>
              <v-text-field clearable v-model="codigoCupon" label="Cupon" prepend-icon="mdi-ticket-percent"></v-text-field>
               <v-btn
                        class="ma-2"
                        color="purple"
                        icon="mdi-plus"
                        @click="aplicarCupon()"
                    ></v-btn>
               </v-row>    
            </v-col>        
        </v-row>
          <v-row>
            <v-col cols="8">
            </v-col>      
            <v-col cols="2">
              Precio Final
            </v-col>  
            <v-col cols="2">
               S/.{{ calcularTotalVenta }}     
            </v-col>        
        </v-row>
         <v-row>
            <v-col cols="8">
            </v-col>      
            <v-col cols="2">
              Precio con Cupon
            </v-col>  
            <v-col cols="2">
               S/.{{ totalDescuento }}     
            </v-col>        
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn  type="submit" 
                    color="deep-purple"
                    :disabled="esHabilitadoVender"
                    @click="realizarVentaProducto()"
                    block class=" mt-2">Finalizar Compra</v-btn>    
                <v-btn  type="submit" 
                    color="deep-purple"
                    :disabled="esHabilitadoBoleta"
                    @click="imprimirBoleta()"
                    block class=" mt-2">Imprimir Boleta</v-btn>        
            </v-col>        
        </v-row>

    </v-container>    
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { mapActions, mapState } from 'vuex'
import { imprimirBoletaPdf } from '@/helpers/imprimirPdf'
import Swal from 'sweetalert2'

  export default {
    components : {
      VDataTable
    },
    data () {
      return {
        contadorProductos: 0,
        selectedProducto: "",
        optionsProductos: [],
        esHabilitadoBoleta : true,
        esHabilitadoVender : false,
        datosVenta:{
          totalVenta : 0,
          fechaVenta : new Date().toISOString().substr(0, 10),
          idCupon: null,
          listaDetalleVenta : []
        },
        productosVenta: [],
        codigoCupon : "",
        totalDescuento : 0
      }
    },
    computed:{
         ...mapState({ UsuarioLogin : 'Usuario' }),
         ...mapState('producto',['ProductoEdit','ListaProductos']),
         ...mapState('venta',['boletaGuardada']),
         ...mapState('cupon',['MensajeErrorCupon','CuponEdit']),
         calcularTotalVenta() {
            this.reiniciarTotalVenta()
            this.productosVenta.forEach(item => {
              this.datosVenta.totalVenta +=  parseFloat(item.subTotalProducto) ;
            });
            return this.datosVenta.totalVenta;
        },
       
    },
    methods: {
      ...mapActions('producto',['obtenerProducto','obtenerProductos']),
      ...mapActions('venta',['realizarVenta','limpiarEstadoBoleta']),
      ...mapActions('cupon',['verificarCupon','limpiarMsgError']),
      changeProducto(){
        console.log('Selected option:', this.selectedProducto);
      },
      reiniciarTotalVenta(){
        this.datosVenta.totalVenta = 0;
      },
      async agregarProducto(){
        await this.obtenerProducto(this.selectedProducto);

        let itemProductoVenta = {
            indiceProducto : this.contadorProductos++,
            idProducto: this.ProductoEdit.IdProducto,
            nombreProducto: this.ProductoEdit.NombreProducto,
            precioProducto : this.ProductoEdit.PrecioUnitario,
            cantidadProducto: 1,
            subTotalProducto: this.ProductoEdit.PrecioUnitario
        }
        
        this.productosVenta.push(itemProductoVenta);
      },
      async realizarVentaProducto(){
        this.datosVenta.listaDetalleVenta = [];
        this.productosVenta.forEach( itemProducto => {
           let item = {
            Cantidad : itemProducto.cantidadProducto,
            SubTotal : itemProducto.subTotalProducto,
            IdProducto : itemProducto.idProducto
           } 
           this.datosVenta.listaDetalleVenta.push(item)
        })

        console.log(this.datosVenta)
        await this.realizarVenta(this.datosVenta);

        if(this.boletaGuardada != null){
          this.esHabilitadoBoleta = false;
          this.esHabilitadoVender = true;
           Swal.fire({
                icon: 'success',
                text: `Venta Existosa`,
                })
        }
      },
      async imprimirBoleta(){
        imprimirBoletaPdf( this.datosVenta , this.productosVenta , this.boletaGuardada , this.CuponEdit )
        this.esHabilitadoBoleta = true;
        this.esHabilitadoVender = false;
        this.datosVenta.listaDetalleVenta = []
        this.productosVenta = []
        this.totalDescuento = 0;
        this.codigoCupon = "";
        await this.limpiarEstadoBoleta();
      },
      aumentarCantidad(idProducto){
        this.productosVenta.forEach( item => {
            if(item.idProducto === idProducto){
              item.cantidadProducto++
              item.subTotalProducto = item.cantidadProducto * item.precioProducto
              }
        })
      },
      disminuirCantidad(idProducto){
        this.productosVenta.forEach( item => {
          if(item.cantidadProducto === 1){
              item.cantidadProducto = 1;
          }else{
            if(item.idProducto === idProducto){
              item.cantidadProducto--
              item.subTotalProducto = item.subTotalProducto - item.precioProducto
            }
          }  
        })
      },
      quitarProducto(idxProducto){
         this.productosVenta =  this.productosVenta.filter(item => item.indiceProducto !== idxProducto);
      },
      async aplicarCupon(){
          await this.verificarCupon(this.codigoCupon)
          if(this.MensajeErrorCupon != "")
          {
             Swal.fire({
                icon: 'error',
                text: `${this.MensajeErrorCupon}`,
                })
             await this.limpiarMsgError()
             this.codigoCupon = "";
          }else{
              this.totalDescuento =  this.datosVenta.totalVenta - (this.datosVenta.totalVenta * (parseFloat(this.CuponEdit.PorcentajeDescuento)/100))
          }
      }

    },
    async beforeMount(){
       
       await this.obtenerProductos()
       this.optionsProductos = this.ListaProductos
       .filter(e => e.StockActual > 0)
       .map( e =>
                    ({ text : `${e.NombreProducto}/${e.UnidadMedida.Numero}${e.UnidadMedida.NombreGramajeCorto}/${e.Categoria.Nombre}` , value: e.IdProducto })
       )
       this.productosVenta.forEach(item => {
          item.subTotalProducto = item.cantidadProducto * item.precioProducto
       })
    }
  }
  
</script>