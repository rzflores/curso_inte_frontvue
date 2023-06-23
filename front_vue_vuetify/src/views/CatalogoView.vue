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

             <v-row class="pl-2 pr-2">
                <CardProducts />
                <CardProducts />
                <CardProducts />
                <CardProducts />
                <CardProducts />
                <CardProducts />
            </v-row>
    </v-container>    
   
</template>
<script>
import CardProducts from '@/components/CardProducts.vue'
export default {
    components : { 
        CardProducts 
        },
    data () {
      return {
        loaded: false,
        loading: false,
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