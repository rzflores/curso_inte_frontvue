<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
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
              <v-col cols="6">
                <v-text-field
                  label="Nombre*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="6"
              >
                <v-text-field
                  label="Celular*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Direccion*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Referencia*"
                  required
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
            @click="dialog = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props :{
        titleDialog : String,
        nameIcon : String
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>