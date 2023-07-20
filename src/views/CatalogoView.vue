<template>
    <v-container>
                <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Buscar productos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model="filtroProducto"
                @click:append-inner="filtrarProductos"
            ></v-text-field>
            <div class="d-flex flex-row flex-wrap">             
              <div v-for="producto in ListaProductos" 
                    :key="producto.IdProducto" 
                    >
                <CardProducts  :itemProducto="producto" />
              </div>
            </div>

    </v-container>    
   
</template>
<script>
import CardProducts from '@/components/CardProducts.vue'
import { mapActions, mapState } from 'vuex'

export default {
    components : { 
        CardProducts 
        },
    data () {
      return {
        filtroProducto : "",
        loaded: false,
        loading: false,
      }
    },
    computed:{
      ...mapState('producto',['ListaProductos']),    },
    methods: {
      ...mapActions('producto',['obtenerProductos','obtenerProductosLike']),
      onClick () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
      async filtrarProductos(){
        await this.obtenerProductosLike(this.filtroProducto)
        console.log(this.ListaProductos)
      }
    },
    async beforeMount(){
      await this.obtenerProductos()
    }  
}
</script>