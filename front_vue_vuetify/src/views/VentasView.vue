<template>
   <v-container>
        <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
        <v-btn type="submit" 
                    color="deep-purple"
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
                v-for="item in desserts"
                :key="item.key"
            >
                <td>{{ item.nameProduct }}</td>
                <td>{{ item.precio }}</td>
                <td width="300px"> 
                    <v-text-field >
                    <template v-slot:append>
                    <v-icon color="red">
                        mdi-plus
                    </v-icon>
                    </template>
                    1
                    <template v-slot:prepend>
                    <v-icon color="green">
                        mdi-minus
                    </v-icon>
                    </template>
                    </v-text-field>
                </td>
                <td>{{ item.precio }}</td>
                <td> 
                     <v-btn
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
              <v-text-field clearable label="Cupon" prepend-icon="mdi-ticket-percent"></v-text-field>
               <v-btn
                        class="ma-2"
                        color="purple"
                        icon="mdi-plus"
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
               S/.80.00     
            </v-col>        
        </v-row>
         <v-row>
            <v-col cols="8">
            </v-col>      
            <v-col cols="2">
              Precio con Cupon
            </v-col>  
            <v-col cols="2">
               S/.80.00     
            </v-col>        
        </v-row>
        <v-row>
            <v-col cols="3">             
            </v-col>      
            <v-col cols="3">
            </v-col>  
            <v-col cols="6">
                <v-btn  type="submit" 
                    color="deep-purple"
                    block class=" mt-2">Finalizar Compra</v-btn>    
                <v-btn  type="submit" 
                    color="deep-purple"
                    disabled
                    block class=" mt-2">Imprimir Boleta</v-btn>        
            </v-col>        
        </v-row>

    </v-container>    
</template>

<script>
  export default {
    data () {
      return {
        loaded: false,
        loading: false,
        desserts: [
          {
            nameProduct: 'Frozen Yogurt',
            precio: 159,
          },
          {
            nameProduct: 'Ice cream sandwich',
            precio: 237,
          }
        ],
      }
    },
     methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
  
</script>