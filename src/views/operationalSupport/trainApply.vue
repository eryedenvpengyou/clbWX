<template>
  <div class="trainApply">

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>申请人</div>
      <input class="right" placeholder="请输入" v-model="applier" />
    </div>
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
      <input class="right" placeholder="请输入" v-model="contactEmail" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>申请培训内容</div>
      <input class="right" placeholder="请输入" v-model="applyContent" />
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>培训开始时间</div>
      <group>
        <datetime v-model="startTime" format="YYYY/MM/DD HH:mm" :title="startTitle" :start-date="dateTime" :min-hour="hours" placeholder="请选择"></datetime>
      </group>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>培训结束时间</div>
      <group>
        <datetime v-model="endTime" format="YYYY/MM/DD HH:mm" :title="startTitle" :start-date="dateTime" :min-hour="hours" placeholder="请选择"></datetime>
      </group>
    </div>


    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>参与人性质</div>
      <input class="right" placeholder="请输入" v-model="participatoryNature" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预期参与人数</div>
      <input class="right" placeholder="请输入" v-model="predictNumber" />
    </div>

    <div class="whole"><div class="left">指定培训讲师</div>
      <input class="right" placeholder="请输入" v-model="applyTeacher" />
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>详细地址</div>
      <group>
        <x-address :title="startTitle"  v-model="detailedAddress" row-value :list="addressData" hide-district placeholder="请选择"></x-address>
      </group>
    </div>


    <div class="whole" style="height: 51px;"><div class="left"></div>
      <input class="right" placeholder="请输入详细地址" v-model="inputAddress" />
    </div>

    <div class="comment_up">其他要求</div>
    <input class="bottom" v-model="comment" />

    <div class="button">
      <div class="button_left" @click="goBack">取消</div>
      <div class="button_right" @click="goApply">提交</div>
    </div>

    <div v-transfer-dom>
      <confirm v-model="show1" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
      </confirm>
    </div>

    <div v-transfer-dom>
      <confirm v-model="show2" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
      </confirm>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { Group,Datetime,Confirm,XAddress,PopupRadio,TransferDomDirective as TransferDom } from 'vux';
export default {
  directives: {
    TransferDom
  },
  components:{
    Group,
    Datetime,
    Confirm,
    XAddress,
    PopupRadio
  },
  data(){
    return{
      applier:null,
      isSubmit:false,
      dateTime:null,
      hours:null,
      phoneCodeList:[],
      phoneCodes:[],
      phoneCode:"",
      contactPhone:null,
      contactEmail:null,
      applyContent:null,
      participatoryNature:null,
      startTime:null,
      endTime:null,
      startTitle:"",
      comment:null,
      predictNumber:null,
      applyTeacher:null,
      detailedAddress:[],
      inputAddress:null,
//      icon:require("../../assets/logo.png"),
      show1:false,
      show2:false,
      title1:"是否确认取消？",
      title2:"是否确认提交申请？",
      addressData:[],
      channelId:null
    }
  },
  beforeCreate(){
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
        document.setTitle('培训申请');
      }, 1);
    var vm=this;
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    Date.prototype.format = function (format) {   //格式化时间
      var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    };
    vm.$post('/api/clb/common/clbCode',{
      "cities": "PUB.CITY",
      "provinces": "PUB.PROVICE",
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function (response) {
      var detail=JSON.parse(response);
      for(let i in detail.provinces){
        let example={};
        example.name=detail.provinces[i].meaning;
        example.value=detail.provinces[i].value;
        example.codeValueId=detail.provinces[i].codeValueId;
        vm.addressData.push(example);
      }
      for(let i in detail.cities){
        let example={};
        example.name=detail.cities[i].meaning;
        example.value=detail.cities[i].value;
        example.parent=detail.cities[i].parentValue;
        example.codeValueId=detail.cities[i].codeValueId;
        vm.addressData.push(example);
      }
      vm.phoneCodes=detail.phoneCodes;
      for(let i in vm.phoneCodes){
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.phoneCode=vm.phoneCodeList[0];
      vm.getCurrentDate();

    }),function(response){
      console.log("接口出错了");
    };
  },
  methods:{
    goBack:function(){
      var vm=this;
      vm.show1=true;

    },
    goApply:function(){
      var vm=this;
      vm.show2=true;
    },
    onCancel1:function(){
      var vm=this;
      vm.show1=false;
    },
    getCurrentDate(){
      let date = new Date(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        day = date.getDate(),
        hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
        minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getHours(),
        seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      this.hours = Number(hours);
      this.dateTime =  year + '-' + month + '-' + day;
    },
    onConfirm1:function(){
      var vm=this;
      vm.show1=false;
      vm.$router.go(-1);
    },
    onCancel2:function(){
      var vm=this;
      vm.show2=false;
    },
    onConfirm2:function(){
      var vm=this;
      if(vm.isSubmit){
        return
      }
      vm.isSubmit = true;
      var phoneCode=null;
      for(let i in vm.phoneCodes){
        if(vm.phoneCode===vm.phoneCodes[i].meaning){
          phoneCode=vm.phoneCodes[i].value;
        }
      }
      if(vm.applier===null||vm.applier===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"申请人不能为空"});
      }else if(vm.contactPhone===null||vm.contactPhone===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"联系人手机不能为空"});
      }else if(vm.contactEmail===null||vm.contactEmail===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"联系人邮箱不能为空"});
      }else if(vm.applyContent===null||vm.applyContent===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"申请培训内容不能为空"});
      }else if(vm.startTime===null||vm.startTime===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"培训开始时间不能为空"});
      }else if(vm.endTime===null||vm.endTime===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"培训结束时间不能为空"});
      }else if(new Date(vm.startTime).getTime()<new Date().getTime()){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"培训开始时间不能早于当前时间"});
      }else if(new Date(vm.endTime).getTime()<new Date(vm.startTime).getTime()){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"培训结束时间不能早于培训开始时间"});
      }else if(vm.participatoryNature===null||vm.participatoryNature===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"培训人性质不能为空"});
      }else if(vm.predictNumber===null||vm.predictNumber===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"预期参与人数不能为空"});
      }else if(vm.detailedAddress===null||vm.detailedAddress===''){
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"省市地址不能为空"});
      }else if(vm.inputAddress===null||vm.inputAddress==='') {
        vm.isSubmit = false;
        vm.$vux.toast.show({text:"详细地址不能为空"});
      } else {
        if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.contactPhone)))) {
          vm.isSubmit = false;
          vm.$vux.toast.show({text:'手机号码有误'});
          }else if(phoneCode==='00852'&&(vm.contactPhone.length!=8)) {
          vm.isSubmit = false;
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00853'&&(vm.contactPhone.length!=8)) {
          vm.isSubmit = false;
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00886'&&(vm.contactPhone.length!=9)) {
          vm.isSubmit = false;
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.contactEmail)) {
          vm.isSubmit = false;
          vm.$vux.toast.show({text:'联系人邮箱有误'});
        }else {
          var list=[];
          var date=new Date(vm.startTime);
          list.push(date.toJSON());
          var startTime=date.format('yyyy-MM-dd hh:mm:ss');
          date=new Date(vm.endTime);
          list.push(date.toJSON());
          var endTime=date.format('yyyy-MM-dd hh:mm:ss');
          vm.$post('/api/support/submit', {
            "channelId":vm.channelId,
            "createrName":vm.applier,
            "phoneCode":phoneCode,
            "prefix":phoneCode,
            "province":vm.detailedAddress[0],
            "city":vm.detailedAddress[1],
            "contactPhone":vm.contactPhone,
            "contactEmail":vm.contactEmail,
            "trainContent":vm.applyContent,
            "trainDate":list,
            "trainStartDate":startTime,
            "trainEndDate":endTime,
            "trainMainType":vm.participatoryNature,
            "trainPeopleNum":vm.predictNumber,
            "trainTeacher":vm.applyTeacher,
            "trainAddress":vm.inputAddress,
            "supportType":"TRAIN",
            "trainOther":vm.comment
          }).then(function (response) {
            vm.isSubmit = false;
            if(response.success===true){
              vm.$vux.toast.show({text:'提交申请已成功'});
//              setTimeout(function () {
                vm.$router.go(-1);
//              },2000);

            }else{
              vm.$vux.toast.show({text:'提交申请失败'});
            }
          }), function (response) {
            console.log("接口出错了");
          };
        }
        }
    },

  }
}
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }
.trainApply{
  width: 100%;
  background-color: white;
  min-height: 100%;
  position: absolute;
  font-size:1.3rem;
  overflow-x:hidden;

.weui-cells:before {
  border-top: none;
}

.weui-cells:after {
  left: 10px;
  border-bottom: 2px solid #D9D9D9;
}

.vux-x-icon {
  fill: #999999;
  padding-right: 10px;
}

.weui-cell_access .weui-cell__ft {
  padding-right: 13px;
  font-size: 1.3rem;
}

.weui-cells {
  font-size: 1.3rem;
}

.weui-cell_access .weui-cell__ft:after {
  height: 10px;
  width: 10px;
  margin-top:-7px;
}

a {
  text-decoration: none;
  padding:0;
}

.whole {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  line-height: 50px;
  padding:0 0 0 15px;
  /*min-height: 4rem;*/
  /*margin: 10px 0px 1rem 1rem;*/
  border-bottom: 1px solid #D9D9D9;
  width:100%;
  box-sizing: border-box;
}

.left {
  display: inline-block;
  width: 40%;
  align-items: center;
  color: #333333;
}
.middle{
  display: inline-block;
  width: 40%;
  margin-top:-10px;

.weui-cells:before{
  border-top:none;
}
.weui-cells:after{
  border-bottom: none;
}
.weui-cell{
  padding: 0px;
}
.weui-cell_access .weui-cell__ft{
  padding: 0px;
  margin-bottom: 10px;
  font-size:1.3rem;
}
.weui-cell_access .weui-cell__ft:after{
  content: normal;
}

}

.right {
  border: 0px;
  display: inline-block;
  width: 60%;
  text-align: right;
  padding-right: 1rem;
  height: 3rem;
  outline: none;
  font-size: 1.3rem;

}
.whole_new {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  /*min-height: 3rem;*/
  /*margin: 10px 0px 1rem 1rem;*/
  line-height: 50px;
  padding:0 1rem 0 15px;
  border-bottom: 1px solid #D9D9D9;
  width:100%;
  box-sizing:border-box;
  .weui-cell{
    padding:0;
  }
  .left {
    display: inline-block;
    align-items: center;
    /*padding-top: 10px;*/
    color: #333333;
  }

.weui-cells {
  width: calc(~"60vw");
  display: inline-block;
  float: right;
  margin-top:0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.weui-cells:after {
  border-bottom: none;
}
.vux-cell-box:before{
  border-top: none;
}
  .vux-popup-picker-value {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 55vw;
  }

}

.comment_up {
  margin-left: 1rem;
  position: relative;
  color:#333333;
  padding:5px 0;
}

.bottom{
  border-bottom: solid 1px #e5e5e5;
  border-left: none;
  border-top: none;
  border-right: none;
  width: calc(~"100% - 10px");
  height: 3.15rem;
  margin-left: 10px;
  outline: none;
  box-sizing: border-box;
  font-size: 1.3rem;
}
  .button{
    display: flex;
    display: -webkit-flex;
    font-size: 1.7rem;
    /*margin:1rem;*/
  }
  .button_left{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 4rem;
    background-color:white ;
    border:solid 1px #D1D1D1;
    /*padding-top: 1.5rem;*/
    border-radius: 5px;
    margin:1rem;
  }
  .button_right {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 4rem;
    background-color: #E6A913;
    color: white;
    /*padding-top: 1.5rem;*/
    border: solid 1px #E6A913;
    border-radius: 5px;
    margin: 1rem;
  }
}
</style>
