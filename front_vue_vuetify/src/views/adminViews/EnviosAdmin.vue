<template>
   <v-container>
      <v-row class="justify-md-center pt-5 pb-5">
        <p class="text-h4">Programar envio</p>    
      </v-row>

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
            <v-col cols="4">
               <v-select
                  label="Tipo de Movimiento"
                  :items="['Entrada', 'Salida']"
                  required
                ></v-select>
            </v-col>      
            <v-col cols="4">
                <v-select
                  label="Origen Sucursal*"
                  :items="['Origen 1', 'Origen 2']"
                  required
                ></v-select>
            </v-col>  
            <v-col cols="4">
                <v-select
                  label="Destino Sucursal*"
                  :items="['Sucursal 1', 'Sucursal 2']"
                  required
                ></v-select> 
            </v-col>        
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-date-picker class="pt-2"
                           title="" 
                           input-text="Fecha Salida" 
                           hide-actions="false"  
                           header="Fecha Salida:"
                           input-mode="keyboard"
                           ></v-date-picker>      
            </v-col>      
            <v-col cols="6">
                  <v-date-picker class="pt-2"
                           title="" 
                           input-text="Fecha Llegada" 
                           hide-actions="false"  
                           header="Fecha Llegada:"
                           input-mode="keyboard"
                           ></v-date-picker>      
            </v-col>  
          </v-row>
          <v-row>
            <v-col cols="4">
                  <v-text-field
                  label="Nombre de Conductor*"
                  required
                ></v-text-field>
            </v-col>  
             <v-col cols="4">
                <v-text-field
                  label="Celular del Conductor*"
                  required
                ></v-text-field>     
            </v-col>    
            <v-col cols="4">
                <v-text-field
                  label="Celular del Conductor*"
                  required
                ></v-text-field>     
            </v-col>       
        </v-row>
        <v-row>
        <v-col cols="12">
                <v-btn  type="submit" 
                    color="deep-purple"
                    block class=" mt-2">Programar Envio</v-btn>    
                <v-btn  type="submit" 
                    color="deep-purple"
                    disabled
                    block class=" mt-2">Imprimir Guia</v-btn>        
        </v-col>        
        </v-row>

    </v-container>    
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
    
  export default {
    components : {
      VDataTable,
      VDatePicker
    },
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