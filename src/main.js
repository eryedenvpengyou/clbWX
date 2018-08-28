// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource';


// import App from './App'
import router from './router'
import store from './vuex/store'
import axios from '../node_modules/axios';
import config from './api/config';
import echart from './assets/js/echarts.min.js';
import html2canvas from './assets/js/html2canvas.min.js';
import CLBService from './common/serivce.js';
import httpRequest from './assets/js/httpRequest.js';
import CPdf from './components/CPdf.vue';
import  { LoadingPlugin,ConfirmPlugin,ToastPlugin} from 'vux';
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin );
Vue.prototype.config = config;
Vue.prototype.echart = echart;
Vue.prototype.html2canvas = html2canvas;
Vue.prototype.axios = axios;
Vue.use(httpRequest);
Vue.use(CLBService);
Vue.use(VueResource);


Vue.component(CPdf.name,CPdf);
new Vue({
  el: '#app',
  router,
  store,
  config,
  axios,
  echart,
  html2canvas,
  render: h => h('router-view'),
  mounted () {
    console.log(this);
  },
  //beforeRouteEnter(to, from, next) {
  //  next(vm=> {
  beforeCreate(){
    var vm = this;
      vm.$getToken().then(response=> {
        this.$getOpenId().then(response=> {
          if(window.localStorage.isApp ==='N') {
            if (location.pathname === '/2c/') {
              this.$checkWXAccount().then(response=>{
                if(!response){
                  vm.$router.replace('authentication');
                }else{
                  vm.$router.replace(window.localStorage.page);
                }
              });
            } else {
              this.$checkWXAccount().then(response=>{
                console.debug(response);
                if(!response){
                  //if(location.hash.split('=')[1]) {
                  //  vm.$router.replace(window.localStorage.page);
                  //}else{
                  //  vm.$router.replace('register');

                    //走这里进的是自主注册
                    vm.$router.replace({name: 'register', params: {from: 'independent'}});
                  //}
                }else{
                  vm.$router.replace(window.localStorage.page);
                }
              });
            }
          }else{
            vm.$router.replace(window.localStorage.page);
          }
        });
      }, function () {
        vm.$vux.toast.show({text: 'token获取失败'});
        vm.$router.push('/');
      });

      if (location.pathname === '/2c/') {
        var url = window.location.href.split('#')[0];
        vm.$configWx(url, ['onMenuShareAppMessage', 'onMenuShareTimeline']);
        vm.$wechat.ready(function () {
          vm.$wechat.onMenuShareTimeline({
            title: '财联邦', // 分享标题
            link: 'https://weixin.fortunefed.com/#/share2C', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          vm.$wechat.onMenuShareAppMessage({
            title: '财联邦', // 分享标题
            desc: '', // 分享描述
            link: 'https://weixin.fortunefed.com/2c/#/share2C', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      } else {
        var url = window.location.href.split('#')[0];
        vm.$configWx(url, ['onMenuShareAppMessage', 'onMenuShareTimeline']);
        vm.$wechat.ready(function () {
          vm.$wechat.onMenuShareTimeline({
            title: '财联邦', // 分享标题
            link: 'https://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          vm.$wechat.onMenuShareAppMessage({
            title: '财联邦', // 分享标题
            desc: '', // 分享描述
            link: 'https://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      }
    }
});



