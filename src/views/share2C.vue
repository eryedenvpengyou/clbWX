<template>
  <div class="share2C">
    <img class="img" :src="icon"   />
    <div class="down">
      请长按上方二维码关注公众号“财连帮”后，可登录财联邦系统
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        icon:'',
        icon2B: require("../assets/img/share.jpg"),
        icon2C: require("../assets/img/share2C-2.jpg"),
        iconProd: require("../assets/img/share2C-2.jpg")
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
        document.setTitle('提示页面');
      }, 1);
    },
    mounted(){
      this.distribute();
    },
    methods:{
      distribute(){
          let _this = this;
          if(location.pathname === '/2c/'){
            _this.icon = _this.icon2C;
          }else if(location.pathname === '/prod/'){
            _this.icon = _this.iconProd;
          }else{
            _this.icon = _this.icon2B;
          }
      }
    }


  }

</script>

<style lang="less">
  .share2C{
    position: absolute;
    background-color: white;
    width: 100%;
    min-height: 100%;

  .img{
    width: 60%;
    height:40%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 40%;
  }

  .down{
    margin-left: 20%;
    margin-right: 20%;
    text-align: center;
    font-size: 1.7rem;
    letter-spacing: 2px;
  }
  }

</style>
