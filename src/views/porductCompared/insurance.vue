<template>
  <div class="insurance">
    <div class="cardList">
      <div class="cardTitle">被保人信息</div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="性别" :options="options1" v-model="option1" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>*</span>
          <span>年龄</span>
        </div>
        <input type="tel" placeholder="请输入" v-model="inputAge" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="是否吸烟" :options="options2" v-model="option2" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" style="border: none">
        <group>
          <span>*</span>
          <popup-radio title="国籍" :options="optionsNations" v-model="optionsNation" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    <div class="cardList">
      <div class="cardTitle">
        <span>{{fromCompare.itemName}}</span>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="缴费年限" :options="options4" v-model="option4" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="缴费方式" :options="options5" v-model="option5" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="币种" :options="options6" v-model="option6" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>*</span>
          <span>金额</span>
        </div>
        <input type="number" placeholder="请输入" v-model="inputMoney" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="金额类型" :options="options10" v-model="option10" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="fromCompare.minClassName==='高端医疗'">
        <group>
          <popup-radio title="保障级别" :options="options7" v-model="option7" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="fromCompare.minClassName==='高端医疗'">
        <group>
          <popup-radio title="保障区域" :options="options8" v-model="option8" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="fromCompare.minClassName==='高端医疗'">
        <group>
          <popup-radio title="自费选项" :options="options9" v-model="option9" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    <div class="footButton1" v-if="fromCompare">
      <div class="desc" @click="getAmount(true)">
        <span>保费测算</span>
        <span>{{yearPermium}}</span>
      </div>
      <div class="desc"@click="goPlan(false)">
        <span>生成电子计划书</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,PopupRadio} from 'vux';
  import _ from 'lodash';
  import config from '../../api/config';

  export default {
      components:{
        Group,PopupRadio
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
          document.setTitle('电子计划书');
        }, 1);
      },
      data () {
        return {
          inputMoney:'',
          select:1,
          inputAge:'',
          option1:null,
          options1:[{key:'M',value:'男'},{key:'F',value:'女'}],
          option2:null,
          options2:[{key:'Y',value:'是'},{key:'N',value:'否'}],
          option4:null,
          options4:this.$store.state.passParam.yearPeriod1,
          option5:null,
          options5:this.$store.state.passParam.payMethods,
          option6:null,
          options6:this.$store.state.passParam.currencyList,
          option7:null,
          options7:this.$store.state.passParam.securityLevel,
          option8:null,
          options8:this.$store.state.passParam.securityArea,
          option9:null,
          options9:this.$store.state.passParam.selfpay,
          options10:[],
          option10:null,
          optionsNations:[],
          optionsNation:null,
          fromCompare:this.$store.state.passParam?this.$store.state.passParam:'',
          fill:false,
          amount:null,
          yearPermium:null,
          appUserInfo:''
        }
      },
      mounted(){
        this.getCLBCode();
        let url = '/api/cmn/productionCalcPremium';

        if(window.localStorage.isApp ==='Y'){     //如果是app需要重新取一下个人信息
          let fetchurl = '/api/wxAccount/testGetOpenId';
          this.$post(fetchurl, {})
            .then(response=> {
            if (response.success == true) {
               this.appUserInfo = response.rows[0];
            }
          })
        }

      },
      computed:{
        isFullFill:function(){
          if(this.inputMoney&&this.inputAge&&this.option1&&this.option2&&this.option4&&this.option5&&this.option6){
            return true;
          }
          return false;
        }
      },
      methods:{
        getArray(array,attr1,attr2){
          let Array = [];
          array.forEach((value,item)=>{
            value.key = value[attr1];
            value.value = value[attr2];
            Array.push(value);
          });
          return Array;
        },
        getValueList(array){
          let options1 = [];
          array.forEach((value,item)=> {
            let options = {
              value: value.meaning + "",
              key: value.value
            };
            options1.push(options);
          });
          return options1;
        },
        getCLBCode(){
          let _this = this,
            url = '/api/clb/common/clbCode',
            param = {
              currencyList: "PUB.CURRENCY",
              genderList: "HR.EMPLOYEE_GENDER",
              moneyTypeList: "PLN.AMOUNT_TYPE",
              nationList: "PUB.NATION",
              payMethodList: "CMN.PAY_METHOD"
            };
          _this.$post(url, param).then(response=> {
            if (response) {
              _this.options10 = _this.getArray(JSON.parse(response).moneyTypeList,'value','meaning');
              _this.optionsNations = _this.getValueList(JSON.parse(response).nationList);
              let array = [];
              for(let a of this.$store.state.passParam.currencyList){
                for(let b of _this.getArray(JSON.parse(response).currencyList,'value','description') ){
                  if(a === b.key){
                    array.push(b);
                  }
                }
              }
              _this.options6 = array;
            }
          })
        },
        getArrayValue(array,key){
          return array.filter(x=>{
            return x.key ===key;
          })[0].value;
        },

        getAmount(isShowToast){
          return new Promise(resolve=>{

          let _this = this,channelIdValue,url = '/api/cmn/productionCalcPremium';
          if(window.localStorage.isApp ==='Y'){
            channelIdValue = _this.appUserInfo.relatedPartyId;
          }else{
            channelIdValue = JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
          }

            let params = {
              livingCity:null,
              age:_this.inputAge,
              channelId:channelIdValue,
              currency:_this.option6,
              coverage:parseInt(_this.inputMoney),
              gender:_this.option1,
              itemId:_this.$store.state.passParam.product[0].key,
              securityLevel:_this.option7,
              selfpay:_this.option9,
              productionAgeLimit:_this.option4,
              paymentMethod:_this.option5,
              smokeFlag:_this.option2
            };


            if(_this.option10==='IP'){
              _this.yearPermium  = params.coverage+_this.getArrayValue(_this.options6,params.currency);
              if(isNaN(params.coverage) === true){
                _this.yearPermium = "测算失败";
                _this.$vux.toast.text('资料不足,测算失败','center');
              }
              resolve(_this.yearPermium);
              return;
            }



              if(!_this.isFullFill){
                _this.$vux.toast.text('请完善信息','center');
                return;
              }
              _this.$post(url,params).then(response=>{
                if(response.success){
                  _this.yearPermium = response.rows[0].stagePermium.toFixed(2)+_this.getArrayValue(_this.options6,params.currency);
                  resolve(_this.yearPermium);
                } else if(isShowToast){
                  console.log('保费测算'+isShowToast);
                  _this.$vux.toast.show({text:response.message});
                  resolve('');
                }else{
                  resolve('');
                }
              })



            });
        },

        goPlan: _.debounce(
          function(isShowToast){
            this.getAmount(isShowToast).then(response=>{
              this.createPlan();
            })
          }, 400
        ),
//        goPlan(isShowToast){
//          this.getAmount(isShowToast).then(response=>{
//            this.createPlan();
//          })
//        },
        createPlan(){
          let _this = this;
          if(!_this.isFullFill){
            _this.$vux.toast.text('请完善信息!','center');
            return;
          }
          let params = {
              age : _this.inputAge,
              gender:_this.option1,
              itemCode:_this.fromCompare.itemId,
              payMethod:_this.option5,
              smokeFlag:_this.option2,
              currency:_this.option6,
              coverage: _this.inputMoney,
              nationalityClass:_this.optionsNation,
              productionAgeLimit:_this.option4,
              yearPermium:_this.yearPermium,
              amountType:_this.option10,
              itemName:_this.$store.state.passParam.itemName,
              supplierName:_this.$store.state.passParam.supplierName,
              passPar:{
                currencies:_this.options6,
                payMethods:_this.options5,
                optionsYear:_this.$store.state.passParam.yearPeriod,
                amountTypes:_this.options10
              }
            };
            _this.$store.commit('setProductInfo',params);
            _this.$router.push({name:'plan'});
        }
      }
    }
</script>

<style lang="scss">
  /*@import "../../assets/css/common.scss";*/
  .weui-cells_radio{
    width:100%;
    p{
      margin:0.5em;
    }
  }
  .vux-cell-placeholder{
    position: relative!important;
    margin-top: 0px!important;
    color: #999!important;
  }
  .vux-cell-value{
    position: relative!important;
    margin-top: 0px!important;
    color: #999!important;
  }
  .insurance{
    position: absolute;
    background: white;
    padding-bottom:55px;


    .cardList{
      width: 100%;
      box-sizing: border-box;
      .cardTitle{
        display: block;
        line-height: 45px;
        font-size: 1.6rem;
        padding-left: 15px;
        background: #F4F4F7;
      }
      .inputLine{
        line-height: 44px;
      }
      .information{
        width: calc(100% - 15px);
        position: relative;
        margin-left: 15px;
        border-bottom: 1px solid rgba(233,233,233,.8);
        display:inline-block;
        .label{
          width: 25%;
          display:inline-block;
          span:nth-child(1){
            color:white;
          }
        }
        .input{
          border: none;
          outline: none;
          line-height: 30px;
          width: calc(73% - 12px);
          text-align: right;
          font-size: 1.4rem;
          padding: 0;
          padding-top: -1px;
          padding-right: 12px;
          color: #999;
          &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
             color: #999;
           }
        }
        .weui-cells{
          width: calc(100vw - 15px);
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
        }
        .weui-cell{
          padding-left: 10px;
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

        &:after{
           height: 10px;
           width:10px;
           margin-top: -7px;
         }
        }
      }
    }
    .footButton{
      width: 100%;
      text-align: center;
      border-top:1px solid gainsboro;
      background: #fff;
      color: #333;
      font-size: 1.2rem;
      position: fixed;
      z-index: 11;
      bottom: 0;
      left: 0;
      padding: 5px 0;
      .desc{
        width:49%;
        span{
          display: block;
          line-height: 20px;
          &:nth-child(2){
           color:#E6A914;
           font-size: 1.4rem;
         }
        }
      }
    }
    .footButton1{
      width: 100%;
      text-align: center;
      border-top:1px solid gainsboro;
      background: #fff;
      color: #333;
      font-size: 1.6rem;
      position: fixed;
      z-index: 11;
      bottom: 0;
      left: 0;
      display:flex;
      align-items:center;
      .desc{
        width:50%;
        span{
          display: block;
          line-height: 20px;
        }
        &:nth-child(2){
           display: flex;
           height: 50px;
           background: #E6A914;
           align-items: center;
           justify-content: center;
           color: #fff;
        }
      }
    }
  }
</style>
