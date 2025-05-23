"use strict";(self["webpackChunkvue_antd_pro"]=self["webpackChunkvue_antd_pro"]||[]).push([[142],{80142:function(e,a,t){t.r(a),t.d(a,{default:function(){return v}});t(73210);var r=function(){var e=this,a=this,t=a._self._c;return t("a-card",{attrs:{bordered:!1}},[t("div",{staticClass:"table-page-search-wrapper"},[t("a-form",{attrs:{layout:"inline"}},[t("a-row",{attrs:{gutter:48}},[t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"会员邮箱"}},[t("a-input",{attrs:{"allow-clear":""},model:{value:a.queryParam.email,callback:function(e){a.$set(a.queryParam,"email",e)},expression:"queryParam.email"}})],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"实名状态"}},[t("a-select",{attrs:{placeholder:"请选择","default-value":"0"},model:{value:a.queryParam.status,callback:function(e){a.$set(a.queryParam,"status",e)},expression:"queryParam.status"}},[t("a-select-option",{attrs:{value:"1"}},[a._v("已实名")]),t("a-select-option",{attrs:{value:"2"}},[a._v("未实名")])],1)],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"开始日期"}},[t("a-date-picker",{attrs:{placeholder:"开始日期",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD",allowClear:""},model:{value:a.queryParam.startDate,callback:function(e){a.$set(a.queryParam,"startDate","string"===typeof e?e.trim():e)},expression:"queryParam.startDate"}})],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"结束日期"}},[t("a-date-picker",{attrs:{placeholder:"结束日期",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD","disabled-date":a.disabledDate,allowClear:""},model:{value:a.queryParam.endDate,callback:function(e){a.$set(a.queryParam,"endDate","string"===typeof e?e.trim():e)},expression:"queryParam.endDate"}})],1)],1),t("a-col",{attrs:{md:a.advanced?24:8,sm:24}},[t("span",{staticClass:"table-page-search-submitButtons",style:a.advanced&&{float:"right",overflow:"hidden"}||{}},[t("a-button",{attrs:{type:"primary"},on:{click:function(e){return a.$refs.table.refresh(!0)}}},[a._v("查询")]),t("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return e.queryParam={}}}},[a._v("重置")])],1)])],1)],1)],1),t("s-table",{ref:"table",attrs:{size:"default",rowKey:"id",columns:a.columns,data:a.loadData,showPagination:"auto",scroll:{x:"max-content"},bordered:""},scopedSlots:a._u([{key:"fgs",fn:function(e){return t("span",{},[a._v(" "+a._s("1"==e?"是":"否")+" ")])}},{key:"yyzx",fn:function(e){return t("span",{},[a._v(" "+a._s("1"==e?"是":"否")+" ")])}},{key:"action",fn:function(e,r){return t("span",{},[[t("a",{on:{click:function(e){return a.modifyLevel(r)}}},[a._v("修改等级")])],t("a-divider",{attrs:{type:"vertical"}}),t("a-popconfirm",{attrs:{title:"是否改变该用户状态？","ok-text":"Yes","cancel-text":"No"},on:{confirm:function(e){return a.confirm(r)}}},[t("a",[a._v(a._s("2"==r.status?"解冻":"冻结"))])])],2)}}])}),t("a-modal",{attrs:{title:"修改用户收益",visible:a.upVisible,"confirm-loading":a.confirmLoading},on:{ok:a.handleOk,cancel:a.handleCancel}},[t("a-form-model",{attrs:{model:a.upUserModel}},[t("a-form-model-item",{attrs:{label:"推荐收益"}},[t("a-select",{attrs:{placeholder:"请选择推荐收益"},model:{value:a.upUserModel.tjsy,callback:function(e){a.$set(a.upUserModel,"tjsy",e)},expression:"upUserModel.tjsy"}},[t("a-select-option",{attrs:{value:"1"}},[a._v(" 是 ")]),t("a-select-option",{attrs:{value:"2"}},[a._v(" 否 ")])],1)],1),t("a-form-model-item",{attrs:{label:"分红收益"}},[t("a-select",{attrs:{placeholder:"请选择分红收益"},model:{value:a.upUserModel.fhsy,callback:function(e){a.$set(a.upUserModel,"fhsy",e)},expression:"upUserModel.fhsy"}},[t("a-select-option",{attrs:{value:"1"}},[a._v(" 是 ")]),t("a-select-option",{attrs:{value:"2"}},[a._v(" 否 ")])],1)],1)],1)],1),t("a-modal",{attrs:{visible:a.editLevel,title:"修改等级"},on:{ok:function(e){return a.handleOks()},cancel:a.handleCancels}},[t("a-form",{attrs:{model:a.formState}},[t("a-form-item",{attrs:{label:"选择等级"}},[t("a-select",{attrs:{placeholder:"please select your zone"},model:{value:a.formState.level,callback:function(e){a.$set(a.formState,"level",e)},expression:"formState.level"}},a._l(a.level,(function(e){return t("a-select-option",{key:e.value,attrs:{value:e.value}},[a._v(a._s(e.label))])})),1)],1)],1)],1),t("create-member-form",{ref:"createModal",on:{ok:function(e){return a.$refs.table.refresh(!0)}}})],1)},l=[],o=t(82165),s=t(70206),n=t(30381),u=t.n(n),i=t(46077),m=[{title:"uid",dataIndex:"id"},{title:"邮箱",dataIndex:"email"},{title:"余额",dataIndex:"amount"},{title:"状态",dataIndex:"realStatus",customRender:function(e){return"1"===e?"实名":"未实名"}}],c={name:"TableList",components:{STable:o.m7,Ellipsis:o.mH,CreateMemberForm:i.Z},data:function(){var e=this;return this.columns=m,{editLevel:!1,formState:{level:"0",id:""},confirmLoading:!1,upVisible:!1,advanced:!1,queryParam:{},upUserModel:{tjsy:"1",fhsy:"1",id:""},loadData:function(a){var t=Object.assign({},a,e.queryParam);return(0,s.tK)(t).then((function(e){return e.data}))}}},methods:{disabledDate:function(e){if(this.queryParam.startDate)return e<u()(this.queryParam.startDate)}}},d=c,f=t(1001),p=(0,f.Z)(d,r,l,!1,null,null,null),v=p.exports},46077:function(e,a,t){t.d(a,{Z:function(){return c}});t(68309);var r=function(){var e=this,a=e._self._c;return a("a-modal",{attrs:{title:e.ruleForm&&e.ruleForm.id?"编辑会员":"新增会员",width:640,visible:e.visible,confirmLoading:e.loading},on:{ok:e.confirmHandler,cancel:e.cancelHandler}},[a("a-spin",{attrs:{spinning:e.loading}},[a("a-form-model",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-col":{span:5},"wrapper-col":{span:15}}},[a("a-form-model-item",{attrs:{label:"会员名称",prop:"name"}},[a("a-input",{attrs:{placeholder:"请输入会员名称",allowClear:""},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}})],1),a("a-form-model-item",{attrs:{label:"会员手机号码",prop:"phone"}},[a("a-input",{attrs:{placeholder:"请输入会员手机号码",allowClear:""},model:{value:e.ruleForm.phone,callback:function(a){e.$set(e.ruleForm,"phone",a)},expression:"ruleForm.phone"}})],1),a("a-form-model-item",{attrs:{label:"会员等级",prop:"userLevel"}},[a("a-select",{attrs:{allowClear:"",placeholder:"请选择会员等级"},model:{value:e.ruleForm.userLevel,callback:function(a){e.$set(e.ruleForm,"userLevel",a)},expression:"ruleForm.userLevel"}},e._l(e.userLevelArr,(function(t){return a("a-select-option",{key:t.value,attrs:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1)],1),a("a-form-model-item",{attrs:{label:"推荐人",prop:"tjr"}},[a("a-input",{attrs:{placeholder:"请输入推荐人",allowClear:""},model:{value:e.ruleForm.tjr,callback:function(a){e.$set(e.ruleForm,"tjr",a)},expression:"ruleForm.tjr"}})],1),a("a-form-model-item",{attrs:{label:"运营中心",prop:"yyzx"}},[a("a-radio-group",{attrs:{"default-value":"1"},model:{value:e.ruleForm.yyzx,callback:function(a){e.$set(e.ruleForm,"yyzx",a)},expression:"ruleForm.yyzx"}},[a("a-radio",{attrs:{value:"1"}},[e._v(" 是 ")]),a("a-radio",{attrs:{value:"2"}},[e._v(" 否 ")])],1)],1),a("a-form-model-item",{attrs:{label:"分公司",prop:"fgs"}},[a("a-radio-group",{attrs:{"default-value":"1"},model:{value:e.ruleForm.fgs,callback:function(a){e.$set(e.ruleForm,"fgs",a)},expression:"ruleForm.fgs"}},[a("a-radio",{attrs:{value:"1"}},[e._v(" 是 ")]),a("a-radio",{attrs:{value:"2"}},[e._v(" 否 ")])],1)],1)],1)],1)],1)},l=[],o=t(70206),s=[{value:"1",label:"个人代理"},{value:"2",label:"企业代理"},{value:"3",label:"县级代理"},{value:"4",label:"城市代理"},{value:"5",label:"省级代理"}],n={data:function(){return{visible:!1,loading:!1,ruleForm:{},rules:{name:[{required:!0,message:"请输入会员名称",trigger:"blur"}],phone:[{required:!0,message:"请输入会员手机号码",trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"请输入正确的手机号码"}],userLevel:[{required:!0,message:"请选择会员等级",trigger:"change"}],yyzx:[{required:!0,message:"请选择运营中心"}],fgs:[{required:!0,message:"请选择分公司"}],tjr:[{required:!0,message:"请输入推荐人",trigger:"blur"}]},userLevelArr:s}},methods:{open:function(e){var a=this;e.userLevel&&(e.userLevel=e.userLevel+""),this.ruleForm=e,this.visible=!0,setTimeout((function(){a.$refs.ruleForm.clearValidate()}),100)},cancelHandler:function(){this.visible=!1},confirmHandler:function(){var e=this;this.$refs.ruleForm.validate((function(a){a&&(e.loading=!0,(0,o.createOrUpdateMember)(e.ruleForm).then((function(){e.loading=!1,e.$notification.success({message:"成功提示",description:"".concat(e.ruleForm.id?"编辑":"创建","会员成功")}),e.visible=!1,e.$emit("ok")})).catch((function(){e.loading=!1})))}))}}},u=n,i=t(1001),m=(0,i.Z)(u,r,l,!1,null,null,null),c=m.exports}}]);