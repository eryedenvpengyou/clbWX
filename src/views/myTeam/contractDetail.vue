<template>
  <div class="contractDetail">

    <div class="block">
      <div class="head">结算信息</div>
      <div class="content">
        <div class="label">是否结算</div>
        <div class="text">{{contractDetail.settleFlag}}</div>
      </div>
      <div class="content">
        <div class="label">结算方式</div>
        <div class="text">{{contractDetail.settleTypeCode}}</div>
      </div>
      <div class="content">
        <div class="label">结算账户</div>
        <div class="text">{{contractDetail.settleAccount}}</div>
      </div>
      <div class="content">
        <div class="label">合同方式</div>
        <div class="text">{{contractDetail.contractApproach}}</div>
      </div>
      <div class="content">
        <div class="label">特别处理</div>
        <div class="text">{{contractDetail.specialTreatment}}</div>
      </div>
      </div>

    <div class="new_block">
      <div class="head">佣金分成</div>
      <div class="information">
        <group>
          <popup-radio title="分成方式" :options="typeList" v-model="type" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="show">
        <group v-if="showLevel">
          <popup-radio title="渠道等级" :options="levelList" v-model="level" placeholder="请选择"></popup-radio>
        </group>
        <div class="content" v-if="!showLevel" style="background-color: white;margin-left: -1rem">
          <div class="label">渠道等级</div>
          <div class="text" style="margin-right: 10px">暂无渠道等级</div>
        </div>
      </div>
      <div class="content" style="padding-bottom: 10px">
          <div class="btn" @click="goSpecial">查看佣金分成</div>
      </div>
    </div>

    <div class="new_block">
      <div class="head">利益分配</div>
      <div class="content" v-for="item in benefitDetail">
        <div class="label">{{item.name}}</div>
        <div class="text1">{{item.role}}</div>
        <div class="text">{{item.benefit}}</div>
      </div>
      </div>





    </div>

</template>

<script type="text/ecmascript-6">
  import {Group,PopupRadio} from 'vux';
export default {
  components:{
    Group,PopupRadio
  },
  data(){
    return{
      channelContractId:this.$route.query.channelContractId,
      channelId:this.$route.query.channelId,
      typeList:['自定义','选择渠道等级'],
      levelList:[],
      type:null,
      level:null,
      contractDetail:[],
      rateDetail:[],
      benefitDetail:[],
      approachList:[],
      contractRoles:[],
      settleAccountList:[],
      settlementList:[],
      channelLevel:[],
      show:false,
      showLevel:false,
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
    }
    document.body.appendChild(i);
  }

  setTimeout(function(){
    document.setTitle('合约详情');
  }, 1);
},
  mounted(){
     var vm=this;
     vm.$post('/api/clb/common/clbCode',{
       "approachList":"CNL.CONTRACT_APPROACH",
       "contractRoles":"CNL.CONTRACT_ROLE",
       "settleAccountList":"CNL.SETTLE_ACCOUNT",
       "settlementList":"SPE.SETTLEMENT_METHOD"
     }).then(function(response){
       var response=JSON.parse(response);
       vm.approachList=response.approachList;
       vm.contractRoles=response.contractRoles;
       vm.settleAccountList=response.settleAccountList;
       vm.settlementList=response.settlementList;
       vm.$post('/api/channel/personal/contract',{
         "channelContractId":vm.channelContractId,
         "channelId":vm.channelId
       }).then(function(response){
         if(response){
           if(response.total>0){
             vm.contractDetail=response.rows[0];
             vm.approachList.forEach(function(item,index){
               if(item.value===vm.contractDetail.contractApproach){
                 vm.contractDetail.contractApproach=item.meaning;
               }
             })
             vm.settleAccountList.forEach(function(item,index){
               if(item.value===vm.contractDetail.settleAccount){
                 vm.contractDetail.settleAccount=item.meaning;
               }
             })
             if(vm.contractDetail.settleFlag==='N'){
               vm.contractDetail.settleFlag="否";
             }
             if(vm.contractDetail.settleFlag==='Y'){
               vm.contractDetail.settleFlag="是";
             }

             vm.settlementList.forEach(function(item,index){
               if(item.value===vm.contractDetail.settleTypeCode){
                 vm.contractDetail.settleTypeCode=item.meaning;
               }
             })
           }else{
             vm.$vux.toast.show({text:'暂无数据'});
           }
           }else{
           vm.$vux.toast.show({text:'暂无数据'});
         }

       },function(response){

       });
       vm.$post('/api/cmn/channel/ratio/query',{
         "channelId":vm.channelId
       }).then(function(response){
       if(response){
         if(reaponse.total>0){
           vm.showLevel=true;
           vm.channelLevel=response.rows;
           response.rows.forEach(function(value,item){
             value.key=value[ratioId];
             value.value=value[ratioName];
             vm.levelList.push(value);
           });
         }
       }
       },function(response){

       });
       vm.$post('/api/channel/personal/contract/role',{
         "channelContractId":vm.channelContractId,
         "channelId":vm.channelId
       }).then(function(response){
         if(response){
           if(response.total>0){
             vm.benefitDetail=response.rows;
             for(let i in vm.benefitDetail){
               vm.benefitDetail[i].benefit=(vm.benefitDetail[i].benefit*100).toFixed(2)+"%";
               for(let j in vm.contractRoles){
                 if(vm.contractRoles[j].value===vm.benefitDetail[i].role){
                   vm.benefitDetail[i].role=vm.contractRoles[j].meaning;
                 }
               }
             }
           }else{
             vm.$vux.toast.show({text:'暂无数据'});
           }
         }else{
           vm.$vux.toast.show({text:'暂无数据'});
         }



       },function(response){

       })

     },function(response){

     })
  },
  watch:{
    type:function(newVal,oldVal){
      var vm=this;
      if(newVal==='选择渠道等级'){
        vm.show=true;
      }else if(newVal==='自定义'){
        vm.show=false;
      }
    }
  },
  methods:{
    goSpecial(){
      var vm=this;
      if(vm.type===null){
        vm.$vux.toast.show({text:"请选择分成方式"});
      }else{
        if(vm.type==='自定义'){
          var screen={
            'channelContractId':vm.channelContractId,
            'channelId':vm.channelId,
            'defineRateFlag':'Y'
          }
          console.log(JSON.stringify(screen));
          vm.$router.push({path:'/special',query:{'screen':JSON.stringify(screen)}});
        }else{
          if(vm.showLevel){
            if(vm.type==='选择渠道等级'&& vm.level===null){ //渠道等级为空
              vm.$vux.toast.show({text:"请选择渠道等级"});
            }else{  //渠道等级不为空
              var name=null;
              for(let i in vm.channelLevel){
                if(vm.channelLevel[i].ratioId===vm.level){
                  name=vm.channelLevel[i].ratioName;
                }
              }
              var screen={
                'channelContractId':vm.channelContractId,
                'channelId':vm.channelId,
                'defineRateFlag':'N',
                'partyType':'CHANNEL',
                'rateLevelId':vm.level,
                'rateLevelName':name
              }
              vm.$router.push({path:'/special',query:{'screen':JSON.stringify(screen)}});
            }
          }else{   //可选择渠道等级为空
            var screen={
              'channelContractId':vm.channelContractId,
              'channelId':vm.channelId,
              'defineRateFlag':'N',
              'partyType':'CHANNEL',
              'rateLevelId':null,
              'rateLevelName':null
            }
            vm.$router.push({path:'/special',query:{'screen':JSON.stringify(screen)}});
          }

        }

      }

    }
  }
}
</script>

<style lang="less">
  .contractDetail{
    width:100%;
  .block{
    width:100%;
    background: white;
  .head{
    width: 100%;
    line-height: 45px;
    font-size: 1.6rem;
    color: #000;
    background: #f4f4f4;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .content{
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
  .label{
    width: 30%;
    display:inline-block;
  }
  .text{
    display: inline-block;
    float: right;
  }
  }
  }
  .new_block{
    width:100%;
    background: white;
  .head{
    width: 100%;
    line-height: 45px;
    font-size: 1.6rem;
    color: #000;
    background: #f4f4f4;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .information{
    width: 100%;
    position: relative;
    margin-left: 15px;
    /*border-bottom: 1px solid rgba(233,233,233,.8);*/
    display:inline-block;

  .label{
    width: 25%;
    display:inline-block;
  span:nth-child(1){
    color:white;
  }
  }
  .weui-cells{
    width:95%;
    box-sizing: border-box;
    margin-top: 0;
    font-size: 1.4rem;
    line-height: 24px;
  &:before{
     border-top: none;
   }
  &:after{
     border-bottom: none;
   }
  span:nth-child(1){
    position: absolute;
    margin-top: 9px;
    color: white;
  }
  }
  .vux-label{
    font-size: 1.4rem;
    color: #333;
    width:95%;
  }
  .weui-cell{
    padding-left: 0px;
  &:before{
     border-top:none;
   }
  &:after{
     border-bottom:none;
   }
  }
  p{
    margin:0;
  }
  .weui-cell_access .weui-cell__ft{
    font-size:1.4rem;
    padding-right:25px;
  &:after{
     height: 10px;
     width:10px;
     margin-top: -7px;
   }
  }
  }
  .content:nth-child(2n+1){
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
    background-color:#fbfbfb;

  .label{
    width: 30%;
    display:inline-block;
  }
  .text1{
    width:40%;
    display:inline-block;
    text-align: center;
  }
  .text{
    display: inline-block;
    float: right;
  }
  .btn{
    text-align: center;
    border:solid 1px #E5B33E;
    border-radius: 5px;
    background-color: white;
  }
  }
  .content:nth-child(2n){
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
    background-color:white;
  .label{
    width: 30%;
    display:inline-block;
  }
  .text1{
    width:40%;
    display:inline-block;
    text-align: center;
  }
  .text{
    display: inline-block;
    float: right;
  }
  .btn{
    text-align: center;
    border:solid 1px #E5B33E;
    border-radius: 5px;
    background-color: white;
  }
  }
  }
  }

</style>
