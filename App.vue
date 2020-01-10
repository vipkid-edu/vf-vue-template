<style lang="scss">
    .app-page {
        width: 979px;
        height: 555px;
        margin: 0 auto;

        > div {
            border: 2px solid red;
            box-sizing: border-box;
            width: 100%;
            height: 100%;

            canvas {
                position: static!important;
            }
        }
    }
</style>

<template>
    <main class="app-page">
        <div ref="canvas"></div>
    </main>
</template>

<script>
    import engineJSON from './vf-json'

    export default {
      name: 'app',
      methods: {
        initEngine() {
          new VF(this.$refs.canvas, {
            src: engineJSON,
            bgcolor: '0xffffff',
            conversionData: {}
          })
        }
      },
      mounted() {
        this.initEngine();
      }
    }
</script>
