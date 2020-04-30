<style lang="scss">
    .app-page {
        canvas {
            border-radius: 10px;
            border: 2px solid gainsboro;

            top: 50% !important;
            transform: translateY(-50%) !important;
        }
    }
</style>

<template>
    <main class="app-page">
        <VF :src="vfjson" :debug="false"></VF>
    </main>
</template>
<script>
    import VFComponent from '@vf.js/vue' // 有关 VF 组件的用法请参阅: https://github.com/vipkid-edu/vf-vue
    import vfjson from './vf-json/index.json' // ts2json 根据 t2j.config.json 配置产出的 JSON 文件

    export default {
      name: 'app',
      components: { VF: VFComponent },
      data() {
        return {
          vfjson,
        }
      }
    }
</script>
