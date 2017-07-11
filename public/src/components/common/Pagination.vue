<template>
    <div class="text-xs-center">
        <v-pagination v-bind:length.number="Math.ceil(totalItems / limit)" v-model="this_page" v-on:input="changed"></v-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                this_page: 1,
                prev_page: 1,
                number: Math.ceil(this.totalItems / this.limit)
            }
        },
        props: ['page', 'total', 'limit'],
        methods: {
          changed(e) {
              if(this.prev_page !== this.this_page){
                  this.$emit('updatePageIndex', e);
                  this.prev_page = e;
              }
          }
        },
        computed: {
            totalItems() {
                return this.$store.getters.getTotalItems;
            }
        }
    }
</script>