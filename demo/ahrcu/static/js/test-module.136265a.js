webpackJsonp([14],{1010:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mt-cell",{attrs:{title:"页面",to:"test-page-1",value:"this test page 1"}}),t._v(" "),n("mt-cell",{attrs:{title:"store"},model:{value:t.testIndexStoreText,callback:function(e){t.testIndexStoreText=e},expression:"testIndexStoreText"}}),t._v(" "),n("mt-cell",{attrs:{title:"操作","is-link":"",value:"点我可以更新 store"},nativeOn:{click:function(e){t.updateStore(e)}}})],1)},staticRenderFns:[]}},1011:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mt-cell",{attrs:{title:"页面",to:"test-page-1",value:"this test page 2"}})],1)},staticRenderFns:[]}},452:function(t,e,n){function s(t){n(843)}var o=n(1)(n(664),n(1010),s,null,null);t.exports=o.exports},453:function(t,e,n){function s(t){n(844)}var o=n(1)(n(665),n(1011),s,null,null);t.exports=o.exports},664:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(72),o=n.n(s),r=n(5);e.default={data:function(){return{}},created:function(){},computed:o()({},n.i(r.b)(["testIndexStoreText"])),components:{},methods:{updateStore:function(){this.$store.dispatch("updateTestIndexStoreText","更新了..."+ +new Date)}}}},665:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(5);e.default={data:function(){return{}},created:function(){},computed:{},components:{},methods:{}}},701:function(t,e,n){e=t.exports=n(33)(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"test-page-1.vue",sourceRoot:""}])},702:function(t,e,n){e=t.exports=n(33)(!0),e.push([t.i,"h1{text-align:center}","",{version:3,sources:["/Users/zhangkun/Documents/Work/AHRCU/Code/ahrcu-app-h5/src/pages/test-page-2.vue"],names:[],mappings:"AAAA,GACE,iBAAmB,CACpB",file:"test-page-2.vue",sourcesContent:["h1 {\n  text-align: center;\n}"],sourceRoot:""}])},843:function(t,e,n){var s=n(701);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(280)("52f84c13",s,!0)},844:function(t,e,n){var s=n(702);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(280)("5a297a35",s,!0)}});
//# sourceMappingURL=test-module.136265a.js.map