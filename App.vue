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
        <div ref="canvas" class="vf-container"></div>
    </main>
</template>
<script>
    // ts2json 根据 t2j.config.json 配置产出的 JSON 文件
    import vfjson from './vf-json/index.json'
    export default {
      name: 'app',
      methods: {
        initEngine(option = {}) {
          //错误计数
          let errorLoadCount = 0;
          function createVF() {
            const vf = new VF(option);

            //详细的接口，可搜索：IVFEngine -> EngineAPI
            vf.onReady = option.onReady
            vf.onError = option.onError
            vf.onMessage = option.onMessage
            vf.onDispose = option.onDispose
            vf.onSceneCreate = option.onSceneCreate
          }
          function loadScript(index){
            var cdn = option.vfvars.cdns.default;
            var s = document.createElement('script');
            s.async = false;
            s.src = cdn[index] + '/vf/engine/vf-engine-v' + option.engineVersion + '/vf.js?v=' + option.fixVersion;
            s.addEventListener('load', loadComplete, false);
            s.addEventListener('error', loadError, false);
            document.body.appendChild(s);
          }
          function loadComplete() {
            removeEvent(this);
            createVF();
          }
          function loadError() {
            removeEvent(this);
            if(errorLoadCount>3){
              throw ' [LOG VF] vf.js load error';
              return;
            }
            loadScript(1);
            errorLoadCount++;
          }
          function removeEvent(thisObj){
            thisObj.parentNode.removeChild(thisObj);
            thisObj.removeEventListener('load', loadComplete, false);
            thisObj.removeEventListener('error', loadError, false);
          }
          loadScript(0);
        },
        onVFReady() {},
        onVFError() {},
        onVFMessage() {},
        onVFDispose() {},
        onVFSceneCreate() {}
      },
      mounted() {
        /*
        * VF引擎配置文档: http://wiki.vipkid.com.cn/pages/viewpage.action?pageId=109175790
        * */
        let isProd = true;
        this.initEngine({
          src: vfjson,
          debug: true,
          bgcolor: '0xffffff',
          engineVersion: "0.0.39",
          container: this.$refs.canvas,
          onReady: this.onVFReady,
          onError: this.onVFError,
          onMessage: this.onVFMessage,
          onDispose: this.onVFDispose,
          onSceneCreate: this.onVFSceneCreate,
          vfvars: {
            cdns: {
              default:[
                isProd? 'https://s.vipkidstatic.com/':"",
                isProd? 'https://s.vipkidresource.com/':"",
              ],
              image:[
                isProd? 'https://img.vipkidstatic.com/':"",
                isProd? 'https://img.vipkidresource.com/':"",
              ],
              media:[
                isProd? 'https://media.vipkidstatic.com/':"",
                isProd? 'https://media.vipkidresource.com/':"",
              ],
              wx:[
                isProd? 'https://wx.vipkidstatic.com/':"",
                isProd? 'https://wx.vipkidresource.com/':"",
              ],
            }
          },
        });
      }
    }
</script>
