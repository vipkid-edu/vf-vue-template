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
    import vfjson from './vf-json/index.json'
    export default {
      name: 'app',
      methods: {
        initEngine(option) {
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
          container: this.$refs.canvas,
          engineVersion: "0.0.39", //引擎使用的版本
          fixVersion:'1',
          bgcolor: '0xffffff',
          src: vfjson, // 两种写法，可以直接将数据传入，也可以传入一个URL地址
          // src: './vf-json/index.json', //设置模板数据源地址
          conversionData: undefined,//需要转换的动态数据
          debug: true,
          language: 'zh-CN',
          // wmode : "transparent", /不填写，不会处理透明，默认白色背景
          // scaleMode: 'showAll'//不填写，根据配置数据读取 'showAll', 'noScale','cover','contain'
          vfvars: {
            useNativeAudio: true, //业务线动态设置,是否使用原生播放
            cdns:{ //必选,引擎库的cdn地址,正式环境需要设置,测试环境设置''
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
          plugs: [
            //{ id: "BoardDrawPlug", role: 1 }, //内置插件,开启画板 role 1老师 2学生
            //{ id:"SliderEditorPlug", className:'upper-canvas'}, //互动课件业务特殊处理鼠标事件
          ],
          onReady: this.onVFReady,
          onError: this.onVFError,
          onMessage: this.onVFMessage,
          onDispose: this.onVFDispose,
          onSceneCreate: this.onVFSceneCreate
        });
      }
    }
</script>
