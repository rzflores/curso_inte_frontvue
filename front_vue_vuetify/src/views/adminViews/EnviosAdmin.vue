<template>
   <v-container>
      <v-row class="justify-md-center pt-5 pb-5">
        <p class="text-h4">Programar envio</p>    
      </v-row>
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
                v-for="item in productosEnvio"
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
            <v-col cols="6">
                <v-text-field
                  label="Origen Sucursal*"
                  v-model="this.UsuarioLogin.Sucursal.Nombre"
                  disabled
                  required
                  variant="outlined"
                ></v-text-field>
            </v-col>  
            <v-col cols="6">
                <v-select
                  label="Destino Sucursal*"
                  :items="SelectSucursales"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  v-model="datosEnvio.idSucursalDestino"
                  required
                ></v-select> 
            </v-col>        
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field type="date" v-model="datosEnvio.fechaSalida" label="Fecha Salida"></v-text-field>
            </v-col>      
            <v-col cols="6">
                <v-text-field type="date" v-model="datosEnvio.fechaLlegada" label="Fecha Llegada"></v-text-field>
            </v-col>  
          </v-row>
          <v-row>
            <v-col cols="4">
                  <v-text-field
                  v-model="datosEnvio.nombreConductor"
                  label="Nombre de Conductor*"
                  required
                ></v-text-field>
            </v-col>  
             <v-col cols="4">
                <v-text-field
                  v-model="datosEnvio.celularConductor"
                  label="Celular del Conductor*"
                  required
                ></v-text-field>     
            </v-col>    
            <v-col cols="4">
                <v-text-field
                  label="Placa Vehiculo*"
                  v-model="datosEnvio.placaVehiculo"
                  required
                ></v-text-field>     
            </v-col>       
        </v-row>
        <v-row>
        <v-col cols="12">
                <v-btn  type="submit" 
                    color="deep-purple"
                    :disabled="esHabilitadoProgramar"
                    @click="realizarEnvioProducto()"
                    block class=" mt-2">Programar Envio</v-btn>    
                <v-btn  type="submit" 
                    color="deep-purple"
                    :disabled="this.esHabilitadoGuia"
                    @click="imprirGuiaRemision()"
                    block class=" mt-2">Imprimir Guia</v-btn>        
        </v-col>        
        </v-row>

    </v-container>    
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { mapActions, mapState } from 'vuex'
import { imprimirGuiaPdf } from '@/helpers/imprimirPdf'
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
        esHabilitadoGuia : true,
        esHabilitadoProgramar : false,
        datosEnvio:{
          fechaSalida : new Date().toISOString().substr(0, 10),
          fechaLlegada : new Date().toISOString().substr(0, 10),
          nombreConductor: "",
          celularConductor:"",
          placaVehiculo:"",
          idUsuario: null,
          idSucursalOrigen: null,
          nombreSucOrigen : "",
          idSucursalDestino: null,
          nombreSucDestino: "",
          listaDetalleEnvio : []
        },
        SelectSucursales : [],
        productosEnvio: [],

      }
    },
     methods: {
      ...mapActions('sucursal',['obtenerSucursales']),
      ...mapActions('producto',['obtenerProducto','obtenerProductos']),
      ...mapActions('envio',['enviarProductos','limpiarEstadoGuia']),
      changeProducto(){
        console.log('Selected option:', this.selectedProducto);
      },
      async agregarProducto(){
        await this.obtenerProducto(this.selectedProducto);

        let itemProductoEnvio = {
            indiceProducto : this.contadorProductos++,
            idProducto: this.ProductoEdit.IdProducto,
            nombreProducto: this.ProductoEdit.NombreProducto,
            precioProducto : this.ProductoEdit.PrecioUnitario,
            cantidadProducto: 1,
            subTotalProducto: this.ProductoEdit.PrecioUnitario
        }
        
        this.productosEnvio.push(itemProductoEnvio);
      },
      async realizarEnvioProducto(){
        this.datosEnvio.idSucursalOrigen = this.UsuarioLogin.Sucursal.IdSucursal;
        this.datosEnvio.idUsuario = this.UsuarioLogin.IdUsuario
        this.datosEnvio.listaDetalleEnvio = [];
        this.productosEnvio.forEach( itemProducto => {
           let item = {
            Cantidad : itemProducto.cantidadProducto,
            SubTotal : itemProducto.subTotalProducto,
            IdProducto : itemProducto.idProducto
           } 
           this.datosEnvio.listaDetalleEnvio.push(item)
        })
        await this.enviarProductos(this.datosEnvio);

        if(this.guiaGuardada != null){
          this.esHabilitadoGuia = false;
          this.esHabilitadoProgramar = true;
           Swal.fire({
                icon: 'success',
                text: `Envio Registrado`,
                })
        }
      },
      async imprirGuiaRemision(){
         
          this.datosEnvio.nombreSucOrigen =this.UsuarioLogin.Sucursal.Nombre;

        const itemSeleccionado = this.SelectSucursales.find(
            item => item.value === this.datosEnvio.idSucursalDestino
        );
        this.datosEnvio.nombreSucDestino =itemSeleccionado.text;
        imprimirGuiaPdf( this.datosEnvio , this.productosEnvio , this.guiaGuardada )
        this.esHabilitadoGuia = true;
        this.esHabilitadoProgramar = false;
        await this.limpiarEstadoGuia();
      },
      aumentarCantidad(idProducto){
        this.productosEnvio.forEach( item => {
            if(item.idProducto === idProducto){
              item.cantidadProducto++
              item.subTotalProducto = item.cantidadProducto * item.precioProducto
              }
        })
      },
      disminuirCantidad(idProducto){
        this.productosEnvio.forEach( item => {
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
         this.productosEnvio =  this.productosEnvio.filter(item => item.indiceProducto !== idxProducto);
      }
    },
    computed:{
         ...mapState( 'sucursal', ['ListaSucursales']) ,
         ...mapState({ UsuarioLogin : 'Usuario' }),
         ...mapState('producto',['ProductoEdit','ListaProductos']),
         ...mapState('envio',['guiaGuardada']),
    },
    async beforeMount(){
       await this.obtenerSucursales()
       this.SelectSucursales = this.ListaSucursales.map( e => 
                    ({ text : e.Nombre , value: e.IdSucursal })
       )
       await this.obtenerProductos()
       this.optionsProductos = this.ListaProductos
       .filter(e => e.StockActual > 0)
       .map( e =>
                    ({ text : `${e.NombreProducto}/${e.UnidadMedida.Numero}${e.UnidadMedida.NombreGramajeCorto}/${e.Categoria.Nombre}` , value: e.IdProducto })
       )
       this.productosEnvio.forEach(item => {
          item.subTotalProducto = item.cantidadProducto * item.precioProducto
       })
    }
  }
  
</script>