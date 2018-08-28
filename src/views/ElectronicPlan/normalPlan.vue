<template>
  <div class="normalPlan">
    <div class="cardList">
      <div class="cardTitle">被保人信息</div>
      <div class="information inputLine">
        <div class="label">
          <!--<span style="color: #fff;">*</span>-->
          <span>被保人姓名</span>
        </div>
        <input type="text" placeholder="请输入" v-model="name" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="国籍" :options="optionsNations" v-model="optionsNation1" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="居住地" :options="optionsNations1" v-model="optionsAddress1" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="productClass !== 'highMedical'">
        <group>
          <span>*</span>
          <popup-radio title="性别" :options="options1" v-model="option1" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine"> <!-- v-if="productClass !== 'highMedical'"-->
        <div class="label">
          <!--<span>*</span>-->
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
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="保单回溯" :options="optionsBack" v-model="optionBack" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="inputRow">
        <div class="label">
          <span>*</span>
          出生日期:</div>
        <group>
          <datetime v-model="value" format="YYYY-MM-DD" :min-year=1900 :title="title" placeholder="请选择"></datetime>
        </group>
      </div>
      <div class="information" style="border: none;">
        <group>
          <span>*</span>
          <popup-radio title="被保人" :options="options3" v-model="option3" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    <div class="cardList" v-if="option3 ==='Y'">
      <div class="cardTitle">投保人信息</div>
      <div class="information inputLine">
        <div class="label">
          <!--<span>*</span>-->
          <span>投保人姓名</span>
        </div>
        <input type="text" placeholder="请输入" v-model="name1" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="国籍" :options="optionsNations" v-model="optionsNation2" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="居住地" :options="optionsNations1" v-model="optionsAddress2" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="性别" :options="options1" v-model="option11" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <!--<span>*</span>-->
          <span>年龄</span>
        </div>
        <input type="tel" placeholder="请输入" v-model="inputAge2" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="是否吸烟" :options="options2" v-model="option15" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="inputRow">
        <div class="label">
          <span>*</span>
          出生日期:</div>
        <group>
          <datetime v-model="value1" format="YYYY-MM-DD" :title="title" :min-year=1900 placeholder="请选择"></datetime>
        </group>
      </div>
    </div>
    <div class="cardList">
      <div class="cardTitle">产品信息</div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="产品公司" :options="productLists" v-model="product" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="产品" :options="productList" v-model="productItem" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="年期" :options="options4" v-model="option4" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information"  v-if="productClass !== 'highMedical'"> <!--高端医疗不显示缴费方式-->
        <group>
          <span>*</span>
          <popup-radio title="缴费方式" :options="options5" v-model="option5" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="productClass !== 'highMedical'">
        <group>
          <span>*</span>
          <popup-radio title="金额类型" :options="optionsClass" v-model="optionClass" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine" v-if="productClass !== 'highMedical'">
        <div class="label">
          <!--<span>*</span>-->
          <span>金额</span>
        </div>
        <input type="number" placeholder="请输入" v-model="amount" class="input">
      </div>
      <div class="information">
        <group>
          <span>*</span>
          <popup-radio title="缴费币种" :options="currencies" v-model="currency" placeholder="请选择"></popup-radio>
        </group>
      </div>

      <!--高端医疗展示-->
      <div v-if=" productClass === 'highMedical'">
        <div class="information">
          <group>
            <popup-radio title="保障级别" :options="optionsLevel" v-model="optionLevel" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="保障区域" :options="optionsArea" v-model="optionArea" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="自费选项" :options="optionsSelf" v-model="optionSelf" placeholder="请选择"></popup-radio>
          </group>
        </div>
      </div>

      <!--普通保险-->
      <div v-if="productClass ==='normal'">
      <div class="information">
        <group>
          <popup-radio title="附加险" :options="options2" v-model="option7" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="是否提现" :options="options2" v-model="option8" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="高端医疗" :options="options2" v-model="option9" placeholder="请选择"></popup-radio>
        </group>
      </div>
      </div>
      <!--选择附加险-->
      <div class="cardList" v-if="option7==='Y'">
      <div class="cardTitle">附加险信息</div>
      <div class="information">
        <group>
          <popup-radio title="附加险" :options="options71" v-model="option71" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    </div>
    <div class="cardList" v-if="option8==='Y'">
      <div class="cardTitle">添加提取</div>
      <div class="information">
        <group>
          <popup-radio title="提取类型" :options="options81" v-model="option81" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="提取方式" :options="options82" v-model="option82" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>提取年数</span>
        </div>
        <input type="number" placeholder="从第几年开始" v-model="yearFrom" class="input">
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>提取年数</span>
        </div>
        <input type="number" placeholder="到第几年" v-model="yearTo" class="input">
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>提取金额</span>
        </div>
        <input type="text" placeholder="请输入" v-model="amountYear" class="input">
      </div>
    </div>
    <div class="cardList" v-if="option9==='Y'">
      <div class="cardTitle">添加高端医疗</div>
      <div class="information">
        <group>
          <popup-radio title="产品名称" :options="options91" v-model="option91" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="保障级别" :options="optionsLevel" v-model="option92" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="保障地区" :options="optionsArea" v-model="option93" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="自付选项" :options="optionsSelf" v-model="option94" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    <div class="footButton">
      <div class="desc" @click="getAmount()">
        <span>保费</span>
        <span style="color:#E6A914">{{amount1}}</span>
      </div>
      <div class="desc" @click="submitPlan()">
        <span>提交计划书申请</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,XAddress,Datetime,ChinaAddressV3Data,Cell,Value2nameFilter as value2name,PopupRadio} from 'vux'

  export default {
    components: {
      Group,
      XAddress,
      Datetime,
      Cell,
      PopupRadio
    },
    data () {
      return {
        yearFrom: '',
        yearTo: '',
        amountYear: '',
        comment: '',
        amount: '',
        amount1: '',
        optionsBack: [],
        optionBack: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}][1].key,
        productName: [],
        productClass:'normal',   //normal,highMedical,lifeInsurance
        currencies: this.$store.state.passParam.currencyList,
        currency: '',
        productLists: [],
        product: '',
        productList: [],
        productItem: '',
        title: '',
        value: '',
        value1: '',
        optionsNation2: '',
        optionsNation1: '',
        optionsNations: [],
        optionsNations1: [],
        optionsAddress2: '',
        optionsAddress1: '',
        optionsAddresses: [],
        disagree: require('../../assets/register/icon_unselect@3x.png'),
        agree: require('../../assets/register/icon_select@3x.png'),
        right: require('../../assets/course/icon_right@3x.png'),
        select: 2,
        name: '',
        name1: '',
        inputAge: '',
        inputAge2: '',
        option1: '',
        option11: '',
        options1: [{key: 'F', value: '女'}, {key: 'M', value: '男'}],
        option2: '',
        options2: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}],
        option3: [{key: 'N', value: '是投保人'}, {key: 'Y', value: '不是投保人'}][0].key,
        options3: [{key: 'N', value: '是投保人'}, {key: 'Y', value: '不是投保人'}],
        option4: '',
        options4: this.$store.state.passParam.yearPeriod1,
        option5: '',
        option15: '',
        options5: this.$store.state.passParam.payMethods,
        option6: '',
        options6: [],
        option7: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}][1].key,
        option71: '',
        options71: [],
        option8: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}][1].key,
        option81: '',
        options81: [],
        option82: '',
        options82: [],
        option9: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}][1].key,
        option91: '',
        options91: [],
        option92: '',
        options92: [],
        option93: '',
        options93: [],
        option94: '',
        options94: [],
        optionLevel: null,
        optionsLevel: this.$store.state.passParam.securityLevel,
        optionArea: null,
        optionsArea: this.$store.state.passParam.securityArea,
        optionSelf: null,
        optionsSelf: this.$store.state.passParam.selfpay,
        fromCompare: this.$store.state.passParam ? this.$store.state.passParam : '',
        objectVersionNumber: this.$store.state.passParam.objectVersionNumber,
        originCurrencies: [],
        optionsClass: [],
        optionClass: '',
        midClassName: this.$store.state.passParam.midClassName,
        minClassName: this.$store.state.passParam.minClassName,
        minClass: this.$store.state.passParam.minClass,
        supplierId: '',
        isSubmit:false,
        appUserInfo:'',
        channelIdValue:'',
        amountName: ''
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
      };

      setTimeout(function () {
        document.setTitle('普通计划书');
      }, 1);
    },
    async mounted(){
      await this.getProductCompanyList().then(response=> {
        this.getProductList(this.$store.state.passParam.supplierId);
        this.getCLBCode();
      });

      if(this.$store.state.passParam.minClassName === '高端医疗'){            //高端医疗
        this.productClass = 'highMedical';
      }else if(this.$store.state.passParam.midClassName === '万用寿险'){     //产品中分类
        this.productClass = 'lifeInsurance';
      }else{
        this.productClass = 'normal';
      }

      if(window.localStorage.isApp ==='Y'){
        let fetchurl = '/api/wxAccount/testGetOpenId';
        this.$post(fetchurl, {})
          .then(response=> {
          if (response.success == true) {
          this.channelIdValue = response.rows[0].relatedPartyId;
        }
      })
      }else{
         this.channelIdValue = JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
      }
    },
    watch: {
      option91: function (value) {
        this.optionsLevel = [];
        this.optionsArea = [];
        this.optionsSelf = [];
        this.option92 = '';
        this.option93 = '';
        this.option94 = '';
        this.options91.forEach((value1, item)=> {
          if (value1.key === value) {
            this.optionsArea = value1.prdItemSecurityPlan.length > 0 ? this.getArray(value1.prdItemSecurityPlan, 'securityRegion', 'securityRegion') : [];
            this.optionsLevel = value1.prdItemSecurityPlan.length > 0 ? this.getArray(JSON.parse(JSON.stringify(value1.prdItemSecurityPlan)), 'securityLevel', 'securityLevel') : [];
            this.optionsSelf = value1.prdItemSelfpayList.length > 0 ? this.getArray(value1.prdItemSelfpayList, 'selfpayId', 'selfpay') : [];
          }
        })
      },
      amount (value) {
        if (this.optionClass === 'IP') {
          this.amount1 = value + this.amountName;
        }
      },
      optionClass (value) {
        if (this.amount && value === 'IP') {
          this.amount1 = this.amount + this.amountName;
        } else {
          this.amount1 = '';
        }
      },
      currency (value) {
        this.originCurrencies.map(item => {
          if (item.key === value) {
            console.log(item.value)
            this.amountName = item.value
          }
        })
        if (this.amount && this.optionClass === 'IP') {
          this.amount1 = this.amount + this.amountName;
        } else {
          this.amount1 = '';
        }
      },
      product: function (value) {      //切换公司
        this.productItem = '';
        this.option91 = '';
        this.options91 = [];

        //选择不同的公司重置
        this.option4 ="";
        this.option5 ="";
        this.option7 ="N";
        this.option8 ="N";
        this.option9 ="N";
        this.option71="";
        this.currency = "";
        this.amount = '';
        this.amount1 = '';
        this.optionClass = '';

        this.getProductList(value);
      },

      getArray(array,attr1,attr2){
        let Array = [];
        array.forEach((value,item)=>{
          value.key = value[attr1];
          value.value = value[attr2];
          Array.push(value);
        });
        return Array;
      },

      productItem: function (value) {    //切换产品

        this.currencies = [];
        this.options4 = [];
        this.options5 = [];
        this.option91 = '';

        this.option4 ="";
        this.option5 ="";
        this.option7 ="N";
        this.option8 ="N";
        this.option9 ="N";
        this.option71="";
        this.amount = '';
        this.amount1 = '';
        this.optionClass = '';

        this.currency = "";
        this.optionsLevel = [];
        this.optionsArea = [];
        this.optionsSelf = [];

        this.productList.forEach((value1, item)=> {

          if (value1.key === value) {
            this.minClass = value1.minClass;
            this.optionsSelf = value1.prdItemSelfpayList.length>0?this.getArray(value1.prdItemSelfpayList,'selfpayId','selfpay'):[];
            if(value1.minClassName === '高端医疗'){            //高端医疗
              this.productClass = 'highMedical';
              this.optionsArea = value1.prdItemSecurityPlan.length > 0 ? this.getArray(value1.prdItemSecurityPlan, 'securityRegion', 'securityRegion') : [];
              this.optionsLevel = value1.prdItemSecurityPlan.length > 0 ? this.getArray(JSON.parse(JSON.stringify(value1.prdItemSecurityPlan)), 'securityLevel', 'securityLevel') : [];
              this.optionsSelf = value1.prdItemSelfpayList.length>0?this.getArray(value1.prdItemSelfpayList,'selfpay','selfpay'):[];
            }else if(value1.midClassName === '万用寿险'){     //产品中分类
              this.productClass = 'lifeInsurance';
            }else{
              this.productClass = 'normal';
            }

            let array = [];
            let currencies = value1.prdItemPaymode.length > 0 ? value1.prdItemPaymode.map(x=> {
              return x.currencyCode;
            }) : [];
            for (let a of currencies) {
              for (let b of this.originCurrencies) {
                if (a === b.key) {
                  array.push(b);
                }
              }
            }
            this.currencies = array;
            if (value1.prdItemSublineList.length > 0) {
              let list = []
              value1.prdItemSublineList.map(item => {
                list.push(item.sublineItemName)
              })
              this.options4 = list;
            }
//            this.options4 = value1.prdItemSublineList.length > 0 ? this.getArray(value1.prdItemSublineList,'sublineItemName','sublineId'):[];


//            if(window.localStorage.isApp === 'Y'){
//              alert(JSON.stringify(this.options4));
//            }

            this.options5 = [
                {value: '半年缴', key: 'SAP', name: value1.halfyear},
                {value: '整缴',   key: 'WP',  name: value1.fullyear},
                {value: '月缴',   key: 'MP',  name: value1.onemonth},
                {value: '年缴',   key: 'AP',  name: value1.oneyear},
                {value: '季缴',   key: 'QP',  name: value1.quarter}]
              .filter(x=> {
                return x.name === 'Y'
              });
            this.objectVersionNumber = value1.objectVersionNumber;
            this.supplierId = value1.supplierId
          }
        });
      }
    },
    methods: {
      getArray(array, attr1, attr2){
        let Array = [];
        array.forEach((value, item)=> {
          value.key = value[attr1];
          value.value = value[attr2] + "";
          Array.push(value);
        });
        return Array;
      },
      getAmount(){
        let _this = this,url = '/api/cmn/productionCalcPremium';

        let  params = {
          livingCity: '',
          livingCountry: _this.optionsAddress1,
          minClass: _this.minClass,
          age: _this.inputAge,
          channelId: _this.channelIdValue,
          currency: _this.currency,
          coverage: parseInt(_this.amount || 0) || null,
          securityLevel: _this.optionLevel,
          securityArea: _this.optionArea,
          selfpay: _this.optionSelf,
          productionAgeLimit: _this.option4,
          paymentMethod: _this.option5,
          smokeFlag: _this.option2,
          gender:_this.option1,
          itemId:_this.productItem
          };
        if (_this.productClass === 'highMedical') {
          if(!(params.age&&params.currency&&params.productionAgeLimit&&params.smokeFlag&&params.livingCountry&&params.securityArea&&params.securityLevel&&params.selfpay)){
            _this.$vux.toast.show({text:'请完善信息!'});
            return;
          }
        } else {
          if(!(params.age&&params.currency&&params.coverage&&params.productionAgeLimit&&params.paymentMethod&&params.smokeFlag&&params.gender)){
            _this.$vux.toast.show({text:'请完善信息!'});
            return;
          }
        }
        _this.$post(url, params).then(response=> {

          if (response.success) {
            _this.amount1 = response.rows[0].stagePermium.toFixed(2)+_this.getArrayValue(_this.currencies,params.currency);
          } else {
            _this.$vux.toast.show({text:response.message});
            _this.amount1 = '';
          }
        })
      },
      getArrayValue(array,key){
        return array.filter(x=>{
          return x.key ===key;
        })[0].value;
      },

      //获取产品列表
      getProductList(value){
        let _this = this,
          params = {
            bigClassName: "保险",
            enabledFlag: "Y",
            page: 1,
            pageSize:100,
            itemId: "",
            supplierId: value,
            unAdditionalRiskFlag: ""
          },
          url = '/api/production/headerlist',
          GDProduct = [],
          attachProduct = [];

          _this.$vux.loading.show({text: 'loading'});
          _this.productList = [];
        let array = [];
        _this.$post(`${url}?page=1&pageSize=100`, params).then(response=> {
          _this.$vux.loading.hide();
          if (response) {
            let responseFilter = response.rows.filter(x=>{           //不包括附加险
              return x.midClassName!=='附加险';
            });

            response.rows.forEach((value, item)=> {
              value.key = value.itemId;
              value.value = value.itemName + "";
//              _this.productList.push(value);
              if (value.midClassName !=='附加险' &&   value.enabledFlag=='Y' ) {
                _this.productList.push(value);
              }
              if (value.minClassName === '高端医疗' && value.attribute1 =='Y' && value.enabledFlag=='Y') {
                GDProduct.push(value);
              }
              if ((value.midClassName === '附加险' || value.attribute1 =='Y') &&  value.enabledFlag=='Y') {
                attachProduct.push(value);
              }
            });

          }
          for (let a of _this.$store.state.passParam.currencyList) {
            for (let b of this.originCurrencies) {
              if (a === b.key) {
                array.push(b);
              }
            }
          }
          this.currencies = array;
          _this.options91 = GDProduct;



          _this.options71 = attachProduct;
          _this.option4 = '';
          _this.options4 = _this.$store.state.passParam.yearPeriod1;
//          if(window.localStorage.isApp === 'Y'){
//            alert(JSON.stringify(this.options4));
//          }
          _this.option5 = '';
          _this.options5 = _this.$store.state.passParam.payMethods;
          _this.currency = '';
          _this.optionLevel = '';
          _this.optionsLevel = _this.$store.state.passParam.securityLevel;
          _this.optionArea = '';
          _this.optionsArea = _this.$store.state.passParam.securityArea;
          _this.optionSelf = '';
          _this.optionsSelf = _this.$store.state.passParam.selfpay;

        })
      },
      getProductCompanyList(){
        return new Promise((resolve, reject)=> {
          let _this = this;
          _this.$post('/api/supplier/queryAll', {type: 'PC'}).then(response=> {
            response.rows.forEach((value, item)=> {
              value.key = value.supplierId;
              value.value = value.name + "";
              _this.productLists.push(value);
            });
            _this.product = this.$store.state.passParam.company[0].key;
            resolve(response.supplierId);
          })
        })
      },
     getValueList(array){
      let options1 = [];
      array.forEach((value, item)=> {
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
          cityList: "PUB.CITY",
          backtrackFlagList: "PLN.BACK_TRACK",
          currencyList: "PUB.CURRENCY",
          extractType: "PLN.EXTRACT_TYPE",
          extractWay: "PLN.EXTRACT_METHOD",
          genderList: "HR.EMPLOYEE_GENDER",
          moneyTypeList: "PLN.AMOUNT_TYPE",
          nationList: "PUB.NATION",
          payMethodList: "CMN.PAY_METHOD"
        };
      _this.$post(url, param).then(response=> {
        if (response) {
          _this.optionsClass = _this.getValueList(JSON.parse(response).moneyTypeList);
          _this.options82 = _this.getValueList(JSON.parse(response).extractWay);
          _this.options81 = _this.getValueList(JSON.parse(response).extractType);
          _this.optionsAddresses = _this.getValueList(JSON.parse(response).cityList);
          _this.optionsNations = _this.getValueList(JSON.parse(response).nationList);
          _this.optionsNations1 = _this.getValueList(JSON.parse(response).nationList);
          _this.optionsBack = _this.getValueList(JSON.parse(response).backtrackFlagList);
          let array = [];
          _this.originCurrencies = _this.getValueList(JSON.parse(response).currencyList);
          for (let a of _this.$store.state.passParam.currencyList) {
            for (let b of _this.originCurrencies) {
              if (a === b.key) {
                array.push(b);
              }
            }
          }
          _this.currencies = array;
          _this.optionsNation1 = _this.optionsNations[0].key;
          _this.optionsNation2 = _this.optionsNations1[0].key;
          _this.productItem = _this.$store.state.passParam.product[0].key;
          _this.supplierId = _this.$store.state.passParam.company[0].key;
        }
      })
    },
    getCurrentDate(){
      let date = new Date(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        day = date.getDate(),
        hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
        minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getHours(),
        seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds(),
        milliseconds = date.getMilliseconds() > 99 ? date.getSeconds() : '0' + date.getSeconds();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    submitPlan(){
      let _this = this,
        plnPlanRequestAdtlRiskList = [],
        plnPlanRequestExtractList = [];
      if(_this.isSubmit){
        return;
      }
      _this.isSubmit = true;
      _this.$vux.loading.show({text:'正在提交...'});
      if (_this.option3 === 'N') {
        _this.name1 = _this.name;
        _this.value1 = _this.value;
        _this.option11 = _this.option1;
        _this.optionsNation2 = _this.optionsNation1;
        _this.optionsAddress2 = _this.optionsAddress1;
        _this.option15 = _this.option2;
      }
      if (_this.option7 === 'Y') {
        plnPlanRequestAdtlRiskList = [{
          comments: _this.comment,
          itemId: _this.option71,
          lineId: null,
          objectVersionNumber: null,
          planId: ""
        }];
      }
      if (_this.option8 === 'Y') {
        plnPlanRequestExtractList = [
          {
            amount: _this.amountYear,
            lineId: null,
            objectVersionNumber: null,
            planId: "",
            yearFrom: _this.yearFrom,
            yearTo: _this.yearTo
          }];
      }
      let param = {
          additionalRiskFlag:                   _this.option7,
          advancedMedicalFlag:                  _this.option9,
          advancedMedicalItemId:                _this.option91,
          advancedMedicalSecurityArea:          _this.option93,
          advancedMedicalSecurityLevel:         _this.option92,
          advancedMedicalSelfpayId:             _this.option94,
          backtrackFlag:                        _this.optionBack,
          crawlerFlag:                          'Y',
          extractFlag:                          _this.option8,
          extractMethod:                        _this.option82,
          extractType:                          _this.option81,
          amount:                               _this.amount || 0,
          amountType:                           _this.optionClass,
          channelId:                            JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
          city: '',
          downloadFlag:                         'N',
          channelName:                          JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
          currency:                             _this.currency,
          insurantBirth:                        _this.value + " 00:00:00",
          insurantGender:                       _this.option1,
          insurantName:                         _this.name,
          insurantNationality:                  _this.optionsNation1,
          insurantResidence:                    _this.optionsAddress1,
          insurantSmokeFlag:                    _this.option2,
          itemId:                               _this.productItem,
          objectVersionNumber:                  _this.objectVersionNumber,
          payMethod:                            _this.option5,
          planId: '',
          plnPlanRequestAdtlRiskList:           plnPlanRequestAdtlRiskList,
          plnPlanRequestExtractList:            plnPlanRequestExtractList,
          policyHolderBirth:                    _this.value1 + " 00:00:00",
          policyHolderGender:                   _this.option11,
          policyHolderName:                     _this.name1,
          policyHolderNationality:              _this.optionsNation2,
          policyHolderResidence:                _this.optionsAddress2,
          policyHolderSmokeFlag:                _this.option15,
          policyInsurantSameFlag:               _this.option3,
          province: '',
          requestDate:                          _this.getCurrentDate(),
          requestType:                          '一般申请',
          securityArea:                         '',
          securityLevel:                        '',
          selfpayId:                            '',
          supplierName:                         _this.supplierId + "",
          sublineId:                            _this.option4
        },
        url = "/api/plan/requestSubmit";
      if (_this.productClass === 'highMedical') {
        if(!(_this.inputAge&&_this.currency&&_this.option4&&_this.option2&&_this.optionsAddress1&&_this.optionArea&&_this.optionLevel&&_this.optionSelf&&_this.value)) {
          _this.$vux.loading.hide();
          _this.isSubmit = false;
          _this.$vux.toast.show({text: '请完善信息!'});
          return;
        }
      } else {
        if(!(param.backtrackFlag&&param.amount&&param.amountType&&param.currency&&param.insurantBirth&&param.insurantGender&&param.insurantName&&param.insurantNationality
            &&param.insurantResidence&&param.insurantSmokeFlag&&param.policyHolderBirth&&param.policyHolderGender&&param.policyHolderName&&param.policyHolderNationality
            &&param.policyHolderResidence&&param.policyHolderSmokeFlag&&_this.value)) {
          _this.$vux.loading.hide();
          _this.isSubmit = false;
          _this.$vux.toast.show({text: '请完善信息!'});
          return;
      } }
      param.sublineId = this.$store.state.passParam.yearPeriod.filter(item => {
        return item.value == _this.option4
      })[0].sublineId;
      _this.$post(url, param).then(response=> {
        _this.isSubmit = false;
        _this.$vux.loading.hide();
       if(response.success){
         _this.$vux.toast.show({text:response.message});
         _this.$router.push('planList');
       }else{
         _this.$vux.toast.show({text:response.message});
       }
      })
    },
    clearValue8 (value) {
      this.$data.value8 = ''
    }
  },
    destroyed(){
      this.$vux.loading.hide();
    }
  }
</script>

<style lang="scss">
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

  .dp-container{
    display: block;
    .scroller-item{
      display: block;
    }
  }
  .normalPlan{
    position: absolute;
    background: white;
    margin-bottom:55px;
    padding-bottom:55px;
    height:auto;

    .cardList{
      width: 100%;
      box-sizing: border-box;
      .cardTitle{
        display: block;
        line-height: 40px;
        font-size: 1.6rem;
        padding-left: 15px;
        background: #F4F4F7;
      }
      .inputLine{
        line-height: 44px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .information{
        width: calc(100% - 15px);
        position: relative;
        margin-left: 15px;
        border-bottom: 1px solid rgba(233,233,233,.8);
        .label{
          width: 25%;
          display: inline-block;
          span:nth-child(1){
            color:#333;
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
           margin-top: 8px;
           color: white;
         }
      }
      .vux-label{
        font-size: 1.4rem;
        color: #333;
      }
      .weui-cell{
        padding-left:10px;
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

    .inputRow{
      height: 40px;
      width: calc(100% - 15px);
      margin-left: 15px;
      position: relative;
      line-height: 40px;
      display: -ms-flexbox;
      display: inline-block;
      vertical-align: middle;
      -ms-flex-align: center;
      padding: 5px 0;
      border-bottom: 1px solid rgba(233, 233, 233, 0.8);
      .label{
        width: 30%;
        display: inline-block;
        font-size: 1.4rem;
        span:nth-child(1){
          color: white
        }
      }
      .weui-cells{
        width: 68%;
        display: inline-block;
        position: absolute;
        top: 5px;
        height: 30px;
        left: 30%;
        vertical-align: middle;
        line-height: 40px;
        margin: 0;
      }
      .weui-cell {
        line-height: 10px;
        text-decoration: none;
        width: 100%;
        display: inline-block;
        text-align: right;
        padding: 0;
        font-size: 1.4rem;
      }
      .weui-cells:after{
        border:none;
      }
      .weui-cells:before{
        border:none;
      }
      .vux-cell-box:before{
        border-top:none;
      }
      .vux-popup-picker-select {
        width: 100%;
        position: relative;
        padding-right: 10px;
        box-sizing: border-box;
        font-size: 1.3rem;
        text-align: right !important;
      }
      .weui-cell_access .weui-cell__ft {
         padding-right: 8px;
        position: relative;
        /*text-align: left;*/
      }
      .weui-cell_access .weui-cell__ft:after{
        display: none;
      }
    }
  }
  .footButton{
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
