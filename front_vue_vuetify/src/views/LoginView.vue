<template>
<v-container class="LoginContainer" fluid fill-height>
    <v-row  align="center" justify="center">    
        <v-col cols="12" sm="8" md="6">
            <v-card
                class="mx-auto"
                max-width="400">
                <v-img
                class="align-end text-white"
                height="250"
                src="https://eresdeportista.com/wp-content/uploads/2019/09/suplementos-deportivos-370x247.jpg"
                cover
                >
                </v-img>
                <v-container align="center" justify="center" >
                    <h2>Login</h2>
                     <v-divider class="pt-2"></v-divider>
                </v-container>
                <v-card-text>
                <v-sheet width="300" class="mx-auto">
                    <v-form fast-fail @submit.prevent @submit="loginUsuario()">
                    <v-text-field
                        v-model="firstName"
                        label="Usuario"
                        :rules="firstNameRules"
                    ></v-text-field>

                    <v-text-field
                        v-model="lastName"
                        label="Contraseña"
                        :rules="lastNameRules"
                    ></v-text-field>

                    <v-select
                    label="Sucursales"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    :rules="SurcursalesRules"
                    ></v-select>

                    <v-btn type="submit" 
                    block class="mt-2">Ingresar</v-btn>
                    </v-form>
                 </v-sheet>
                </v-card-text>
            </v-card>
        </v-col>    
    </v-row>
</v-container>  
</template>
<script>
export default {
    data: () => ({
      firstName: '',
      usuarioValidate : false,
      firstNameRules: [
        value => {
          if (value?.length > 0){            
            return true
          }           
          return 'Campo Obligatorio.'
        },
      ],
      lastName: '',
      lastNameRules: [
        value => {
           if (value?.length > 0) return true
          return 'Campo Obligatorio.'
        },
      ],
      sucursales: '',
      SurcursalesRules: [
        value => {
           if (value?.length > 0) return true
          return 'Campo Obligatorio.'
        },
      ],
    }),
    methods : {
        loginUsuario(){
              this.$router.push('/home')
        }

    }
}
</script>
<style scoped>
.LoginContainer{
    margin-top: 3%;
}
</style>