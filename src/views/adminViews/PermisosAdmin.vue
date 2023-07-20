<template>
 <v-container>
  <v-row class="justify-md-center pt-5 pb-5">
        <p class="text-h4">Permisos Roles</p>    
      </v-row>
  <v-row>
    <v-col cols="6">

      <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          Administrador
        </div>
        <div class="text-caption">
             <v-list>
      <v-list-item
        v-for="itemMenu in ListaMenusAdmin"
        :key="itemMenu.IdMenu"
        :value="itemMenu.Nombre"
        color="primary"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox 
            v-model="itemMenu.EsHabilitado" 
            :label="itemMenu.Nombre"
            @change="handleAdminCheck(itemMenu.IdMenu)"
            ></v-checkbox>
        </template>
      </v-list-item>
    </v-list>  
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
       <v-btn type="submit" 
                    color="deep-purple"
                    variant="tonal"
                    @click="realizarCambioMenuEstAdmin()"
                    block class=" mt-2">Grabar</v-btn>  
    </v-card-actions>
  </v-card>
</v-col>
    <v-col cols="6">

      <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          Vendedor
        </div>
        <div class="text-caption">
      <v-list>
      <v-list-item
        v-for="itemMenu in ListaMenusVendedor"
        :key="itemMenu.IdMenu"
        :value="itemMenu"
        color="black"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-checkbox 
            v-model="itemMenu.EsHabilitado" 
            :label="itemMenu.Nombre"
            @change="handleVendedorCheck(itemMenu.IdMenu)" 
            color="deep-purple"></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
        
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
    <v-btn type="submit" 
                    variant="tonal"
                    color="deep-purple"
                    @click="realizarCambioMenuEstVendedor()"
                    block class=" mt-2">Grabar</v-btn>     
    </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
 
  
</v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'
 export default {
    data: () => ({
      ListaMenusAdmin : [],
      ListaMenusVendedor: [],
      DatosCambioMenuEstAdmin : {
        idRol : 2,
        listaCambioMenuEstAdmin : []
      },
       DatosCambioMenuEstVendedor : {
        idRol : 1,
        listaCambioMenuEstVendedor : []
      }
    }),
    computed:{
      ...mapState('menurol',['ListaMenuRol']),
      ...mapState('permisos',['exitoCambioAdmin','exitoCambioVendedor'])
    },
    methods:{
      ...mapActions('menurol',['obtenerMenuRol','limpiarMenuRol']),
      ...mapActions('permisos',['EditarCambioMenuEstAdmin','EditarCambioMenuEstVendedor']),
      
      async realizarCambioMenuEstAdmin(){
        
        await this.EditarCambioMenuEstAdmin(this.DatosCambioMenuEstAdmin);
        console.log('ejectadooooo admin')
        console.log(this.exitoCambioAdmin)
        if(this.exitoCambioAdmin){
          this.DatosCambioMenuEstAdmin.listaCambioMenuEstAdmin = []
          //this.ListaMenusAdmin = []
          //await this.limpiarMenuRol()
          //await this.obtenerMenuRol(2);
          //this.ListaMenusAdmin = this.ListaMenuRol
          Swal.fire({
                          icon: 'success',
                          text: `Actualizado Correctamente`,
                          })
        }
      },
      async realizarCambioMenuEstVendedor(){

        await this.EditarCambioMenuEstVendedor(this.DatosCambioMenuEstVendedor);
        console.log('ejectadooooo vendedor')
        console.log(this.exitoCambioVendedor)
        if(this.exitoCambioVendedor ){
          this.DatosCambioMenuEstVendedor.listaCambioMenuEstVendedor = []
          //this.ListaMenusVendedor = []
          //await this.limpiarMenuRol()
          // await this.obtenerMenuRol(1);
          //console.log(this.ListaMenusVendedor)
          //this.ListaMenusVendedor = this.ListaMenuRol
          Swal.fire({
                          icon: 'success',
                          text: `Actualizado Correctamente`,
                          })

        }
      },
      handleAdminCheck(IdMenuAdmin){
        const MenuSelect = this.ListaMenusAdmin.filter( e => { return e.IdMenu == IdMenuAdmin } )[0]
        let MenuEditSelect = {
          IdMenu : MenuSelect.IdMenu,
          EsHabilitado :MenuSelect.EsHabilitado
        }
        this.DatosCambioMenuEstAdmin.listaCambioMenuEstAdmin.push(MenuEditSelect)
      },
      handleVendedorCheck(IdMenuVendedor){
        let MenuSelect = this.ListaMenusVendedor.filter( e => { return e.IdMenu == IdMenuVendedor } )[0]
        let MenuEditSelect = {
          IdMenu : MenuSelect.IdMenu,
          EsHabilitado : MenuSelect.EsHabilitado
        }
        this.DatosCambioMenuEstVendedor.listaCambioMenuEstVendedor.push(MenuEditSelect)
        }
    },
    async beforeMount(){
      await this.obtenerMenuRol(2);
      this.ListaMenusAdmin = this.ListaMenuRol
      await this.obtenerMenuRol(1);
      this.ListaMenusVendedor = this.ListaMenuRol
    }
  }
  
</script>

<style scoped>
.v-label {
  color: black  !important;;
}
</style>