<template>
  <div>
    <v-footer padless app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Blog Tech</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Foot",
  components: {},
})
export default class Foot extends Vue {}
</script>