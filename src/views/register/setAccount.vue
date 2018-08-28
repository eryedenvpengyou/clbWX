<template>
  <div class="setAccount">
    <div class="telPhoneNum">
      <img :src="user" alt="" class="message">
      <input type="text" v-model="channelName" placeholder="请输入渠道名">
      <div class="line"></div>
    </div>
    <div class="telPhoneNum">
      <img :src="user" alt="" class="message">
      <input type="text" v-model="userName" :placeholder="defaultName">
      <div class="line"></div>
    </div>
    <div class="telPhoneNum">
      <img :src="key1" alt="" class="message">
      <input type="password" v-model="password" placeholder="请设置密码">
      <div class="line"></div>
    </div>
    <div class="telPhoneNum">
      <img :src="key1" alt="" class="message">
      <input type="password" v-model="confirmPassword"  placeholder="请再次输入密码">
      <div class="line"></div>
    </div>
    <div class="modelButton" :style="isTrue1?'background:#E6A913':'background:#f7e5b8'" @click="confirm()">
      <span>确认</span>
    </div>
    <toast v-model="showToast" type="text" width="20em" :time="1500">{{displayText}}</toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'vux';
  export default{
    components:{
      Toast
    },
    watch:{
      channelName:function(value){
        if(this.isChange){
          this.userName = value;
        }
      },
      userName:function(value){
        if(this.channelName!==value){
          this.isChange = false;
        }
      }
    },
    created(){
    document.setTitle = function(t) {
      document.title = t;
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function() {
        setTimeout(function(){
          i.remove();
        }, 9)
      };
      document.body.appendChild(i);
    };

    setTimeout(function(){
      document.setTitle('设置账号');
    }, 1);
  },
    data(){
      return{
        message:require('../../assets/register/icon_message@3x.png'),
        user:require('../../assets/register/icon_user@3x.png'),
        key1:require('../../assets/register/icon_password@3x.png'),
        show:false,
        defaultName:'请输入用户名',
        channelName:'',
        userName:'',
        password:'',
        showToast:false,
        confirmPassword:'',
        isTrue:false,
        displayText:'',
        userInfo:this.$route.query.accountInfo,
        isChange:true
      }
    },
    mounted(){
      console.log('userInfo'+this.userInfo);
    },
    methods:{
      checkUser:function(value,type){
        if(type===2){
          if(this.userName&&(/^[0-9a-zA-Z]*$/g.test(this.userName))){
            return;
          }
        }if(type===2){
          if(value){
            return;
          }
        }else{
          if(value ===this.password){
            return;
          }
        }
        this.$vux.toast.show({text:'用户名不规范'});
      },
      setPassword(){
        let _this = this,
          url = '/api/public/user/regest',
          params,from = '';

          if(this.$route.params.from === 'independent'){    //从注册页面
             from = 'REGISTED';
          }else{
             from = 'APPROVED';
          }

          params = {
            channelName:_this.channelName,
            channelSource:'WEIXIN',
            chineseName:_this.channelName,
            contactPerson:_this.channelName,
            parentChannelId:null,
            parentUserId:null,
            contactPhone:_this.userInfo.phone,
            phoneCode:_this.userInfo.phoneCode,
//            statusCode:'REGISTED',  //正常注册传registed
            statusCode:from,   //二维码注册的时候传approved
            defineRateFlag:"Y",
            user:{
              password:_this.password,
              phone:_this.userInfo.phone,
              phoneCode:_this.userInfo.phoneCode,
              repPassword:_this.confirmPassword,
              userName:_this.userName,
              userType:'CHANNEL',
              wechatOpenid:_this.userInfo.wechatOpenid,
              backgroundAppid:_this.config.appId,
              verifiCode:_this.userInfo.verification
            }
          };

//          alert(JSON.stringify(params));

        if(_this.userInfo.page){
          params.parentChannelId = _this.userInfo.page;
          params.parentUserId = _this.userInfo.userId;
        }
        console.log(params);
        _this.$post(url,params).then(response=>{
          _this.showToast =true;
            if(response.success){
              window.localStorage.userInfo = JSON.stringify(response);
              localStorage.sessionIdb = response.sessionId;
              window.localStorage.wechatOpenid = params.wechatOpenid;
              _this.displayText = '注册成功';
              history.replaceState(null, null, document.URL);
              setTimeout(function(){
                  if(_this.userInfo.page){
                    _this.$router.push('share2C')
                  }else{
                    _this.$router.push(window.localStorage.page)
                  }
              },1000
              );
//             _this.$wechat.closeWindow();
            }else{
              _this.displayText = response.message;
            }
        })
      },
      confirm(){
        if(this.isTrue){
          this.setPassword();
        }
      }
    },
    computed:{
      isTrue1:function(){
        if(this.channelName&&this.userName&&this.password&&this.confirmPassword&&this.confirmPassword===this.password){
          this.isTrue = true;
          return this.isTrue;
        }
        this.isTrue = false;
        return this.isTrue;
      }
    }
  }
</script>

<style lang="scss">
  .setAccount {
    width: 100%;
    position: absolute;
    background: white;
    min-height: 100%;
    .telPhoneNum {
      width: 90%;
      padding: 25px 0 14px 10%;
      font-size: 1.5rem;
      color: #333;
      position:relative;
      .line{
        width: 80%;
        height: 1px;
        position: absolute;
        right: 10%;
        bottom: 0;
        background-image: linear-gradient(to right, #fff, #e5e5e5 15%, #e5e5e5 85%, #fff);
      }
      .message{
        width: 25px;
        position: relative;
        bottom: -8px;
      }
      .input2{
        &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #333;
        }
      }
      /*input:nth-child(2){*/
        /*width: calc(100% - 45px);*/
        /*border: none;*/
        /*background: none;*/
        /*padding: 0;*/
        /*line-height: 30px;*/
        /*outline: none;*/
        /*margin-left: 10px;*/
        /*font-size: 1.5rem;*/
        /*&::-webkit-input-placeholder, textarea::-webkit-input-placeholder {*/
           /*color: #333;*/
         /*}*/
      /*}*/
      input{
        width: calc(100% - 45px);
        border: none;
        background: none;
        padding: 0;
        line-height: 30px;
        outline: none;
        margin-left: 10px;
        font-size: 1.5rem;
      }
    }
  .modelButton{
    width: 80%;
    text-align: center;
    margin-left: 10%;
    line-height: 45px;
    /*background: #f7e5b8;*/
    border-radius: 25px;
    font-size: 1.8rem;
    color: white;
    margin-top: 53px;
    letter-spacing: 1px;
  }
  }
</style>
