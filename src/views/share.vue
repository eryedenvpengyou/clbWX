<template>
  <div class="share">
    <div class="helpImg">
      <img :src="helpImg" @click="showNotify()" alt="">
    </div>
    <div class="backGround" id="picture">
      <div class="descText">
        <span>{{userName}}</span>邀请你加入财联邦，一起赚佣金~
      </div>
      <div class="codeImg">
        <div id="qrcode" style="display: inline-block;margin-bottom: 10px" ref="qrcode"></div>
        <span style="font-size: 14px">扫一扫,注册成为财联邦用户</span>
      </div>
    </div>

    <div class="dragBg" v-if="isShowNotify"></div>
    <div class="helpFrame" v-if="isShowNotify">
      <div class="closeImg">
        <img :src="closeImg" alt="" @click="showNotify()">
      </div>
      <div class="notify">
        <span>邀请说明</span>
        <span class="explain">1.新用户通过手机微信扫描您的二维码注册成功后，每次成功签单，您都将获得一定数额的介绍费作为奖励，介绍费多少随订单金额大小而变化。</span>
        <span class="explain">2.该二维码仅对未注册的新用户有效。</span>
      </div>
    </div>

    <div class="picture">
      <img src="" id="getPicture" alt="" style="width: 100%;">
    </div>
    <div class="down">
      长按保存或者发送给好友
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return {
        isShare:false,
        icon: require("../assets/img/share.jpg"),
        closeImg: require("../assets/img/icon_close@2x.png"),
        helpImg: require("../assets/img/helpImg.png"),
        isShowNotify:false,
        userName:JSON.parse(window.localStorage.userInfo).user.userName,
        i:false,
        link:''
      }
    },
    created(){
      document.setTitle = function (t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
          setTimeout(function () {
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }

      setTimeout(function () {
        document.setTitle('我的二维码');
      }, 1);
    },
    mounted(){
      this.distribute().then(response=>{
        this.createCode();
      });
    },
    methods:{
      distribute(){
        return new Promise(resolve=>{
          let _this = this;
          if(location.pathname === '/2c/'){
            _this.link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa2aed130f0ac5169&redirect_uri=https%3a%2f%2fweixin.fortunefed.com%2f2c%2f%23%2f%3froute%3dregister%26page%3d'+JSON.parse(window.localStorage.userInfoc).user.relatedPartyId+'%26userId%3d'+JSON.parse(window.localStorage.userInfoc).user.userId+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            _this.userName = JSON.parse(window.localStorage.userInfoc).user.userName;
          }else if(location.pathname === '/prod/'){
            _this.link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2d1adc59469ebe12&redirect_uri=https%3a%2f%2fweixin.fortunefed.com%2fprod%2f%23%2f%3froute%3dregister%26page%3d'+JSON.parse(window.localStorage.userInfo).user.relatedPartyId+'%26userId%3d'+JSON.parse(window.localStorage.userInfo).user.userId+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            _this.userName = JSON.parse(window.localStorage.userInfo).user.userName;
          }else{
            _this.link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a7d8fead458d831&redirect_uri=https%3a%2f%2fweixin.fortunefed.com%2f%23%2f%3froute%3dregister%26page%3d'+JSON.parse(window.localStorage.userInfo).user.relatedPartyId+'%26userId%3d'+JSON.parse(window.localStorage.userInfo).user.userId+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            _this.userName = JSON.parse(window.localStorage.userInfo).user.userName;
          }
          resolve(true);
        });
      },
      htmlToPicture(){
        let _this = this;
        _this.isShare = true;
        _this.html2canvas(document.getElementById('picture'), {
          scale: 2,
          onrendered: function (canvas) {
//            console.log(canvas.toDataURL());
            document.getElementById('getPicture').src = canvas.toDataURL();
            document.getElementById('picture').style.display = 'none';
          }
        })
      },
      createCode(){
        if(this.i==false){
          var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 150,//设置宽高
            height: 150
          });
          qrcode.makeCode(this.link);
          this.htmlToPicture();
        }
        this.i = true;
      },
      showNotify(){
        let _this = this;
        _this.isShowNotify = !_this.isShowNotify;
      }
    }
  }

</script>

<style lang="scss">
  .share{
    position: absolute;
    background-color: white;
    width:100%;
    height: 100%;
    .helpImg {
      width: 100%;
      text-align: right;
      line-height: 40px;
      padding-right: 10px;
      box-sizing: border-box;

      img {
        height: 30px;
        display: inline;
        vertical-align: middle;
      }
    }
    .down{
      position: absolute;
      width: 100%;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
    .backGround {
      position: absolute;
      width: 100%;
      padding-top:20px;
      box-sizing: border-box;
      height: calc(100vh - 100px);
      background-size: contain;
      background-image:url('../assets/img/codeBG.png');
      .descText {
        padding: 5px 15px;
        font-size: 18px;
        text-align:center;
        span {
          color: red;
        }
      }
      .codeImg {
        text-align: center;
        margin-top:40px;
      .img {
        width: 50%;
        display: inline-block;
      }

      span {
        width: 100%;
        display: inline-block;
      }

    }

    /*.down {*/
      /*text-align: center;*/
      /*font-size: 1.7rem;*/
      /*letter-spacing: 2px;*/
      /*position: absolute;*/
      /*width: 100%;*/
      /*bottom: 0;*/
      /*line-height: 45px;*/
    /*}*/
    }
  .dragBg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    top: 0;
    opacity: .7;
  }

  .helpFrame {
    width: 90vw;
    position: fixed;
    z-index: 10;
    left: 5vw;
    top: 30vh;
    background: white;
    padding: 10px 10px 40px 10px;
    box-sizing: border-box;

  .closeImg {
    width: 100%;
    text-align: right;

  img {
    height: 20px;
  }

  }
  .notify {
    padding: 0 5px;

  span:nth-child(1) {
    display: block;
    text-align: center;
    font-size: 1.6rem;
    line-height: 40px;
  }

  .explain {
    display: block;
    padding-bottom: 15px;
  }

  }
  }
  }

</style>
