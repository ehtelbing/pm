Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

var rootVisible = 'F';//树的根节点是否可见
var multipul = 'F';//是否为多选
var I_DEPTID ;
if(location.href.split('?')[1]!=undefined){
    rootVisible = Ext.urlDecode(location.href.split('?')[1]).rootVisible;
    multipul = Ext.urlDecode(location.href.split('?')[1]).multipul;
    I_DEPTID = Ext.urlDecode(location.href.split('?')[1]).I_DEPTID;
}

Ext.onReady(function(){
   Ext.getBody().mask('<p>页面载入中...</p>');

   var baseDeptStore = Ext.create('Ext.data.TreeStore',{
       storeId : 'baseDeptStore' ,
       autoLoad : false,
       loading : false,
       root : {},
       pageSize : 20,
       fields : ['I_DEPTID','V_DEPTCODE','V_DEPTNAME','V_DEPTCODE_UP','V_DEPTSMALLNAME','V_DEPTFULLNAME','V_DEPTTYPE','I_ORDERID','I_FLAG','V_SAP_DEPT','V_SAP_WORK','V_SAP_JHGC','V_SAP_YWFW','D_DATE_EDITTIME','V_DEPT_WBS','V_WBS_NUM','V_WXJH_REPAIRGUID'],
       proxy : {
           url : AppUrl+'Ydj/selectBaseDept',
           type : 'ajax',
           async : true,
           actionMethods : {
               read : 'POST'
           },
           extraParams : {},
           reader : {
               type : 'json',
               root : 'list',
               totalProperty : 'total'
           }
       },
       listeners : {
           load : function (store,node,records,successful,eOpts) {
               setTimeout('_expandSelectALL()',200);
           }
       }
   });

   var buttonPanel = Ext.create('Ext.Panel',{
       id : 'buttonPanel',
       defaults : {
          style : 'margin : 2px;'
       } ,
       items : [{
           xtype : 'button',
           text : '保存',
           handler : _moveBaseDept
       },{
           xtype : 'button',
           text : '关闭',
           handler : _close
       }]
   });

   var baseDeptPanel = Ext.create('Ext.tree.Panel',{
       id : 'baseDeptPanel',
       store : baseDeptStore,
       title : '部门信息',
       rootVisible : false,//树的根节点可见
       hideHeaders : true, //隐藏表头
       rowLines : false,
       columnLines : false,
       frame:true,
       animate:!Ext.isIE,//树加载动画
       selModel:{
           selType:'checkboxmodel',
           mode:'SINGLE'
       },
       columns : [{
           xtype : 'treecolumn',
           text : '部门名称',
           dataIndex : 'V_DEPTNAME',
           style : 'text-align : center;',
           flex : 1
       }],
       viewConfig :{
           emptyText : '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>'
       },
       listeners:{
           itemblclick:function(panel,record,item,index,e,eOpts){
               _moveBaseDept();
           }
       }
   });
   Ext.create('Ext.container.Viewport',{
       layout : {
           type : 'border',
           regionWeights : {
              west : -1,
              east : -1,
              north : 1,
              south : 1
           }
       },
       defaults : {
           border : false
       } ,
       items : [{
           region : 'north',
           items : [buttonPanel]
       },{
           region : 'center',
           layout : 'fit',
           items : [baseDeptPanel]
       }]
   });
   _init();
});

function _init(){
    for(var i = 0;i < Ext.data.StoreManager.getCount();i++){
        if(Ext.data.StoreManager.getAt(i).isLoading()){
            return;
        }
    }
    _selectBaseDept();
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');
    for(var i = 0; i < baseDeptStore.getCount(); i++) {

        var record = baseDeptStore.getAt(i);
        if(record.get('I_DEPTID') == I_DEPTID) baseDeptStore.remove(i);
    }

    Ext.getBody().unmask();
}

function _selectBaseDept(){
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');
    baseDeptStore.currentPage = 1;
    baseDeptStore.load();
}

function _expandSelectALL(){
    Ext.getCmp('baseDeptPanel').expandAll();
}

function _moveBaseDept(){
    var records = Ext.getCmp('baseDeptPanel').getSelectionModel().getSelection();
    if(records.length == 0){
        Ext.MessageBox.alert('提示','请选中要移动的位置');
        return ;
    }
    if(multipul =='T'){
        var baseDeptList = new Array();
        for(var i = 0;i < records.length ;i++){
            baseDeptList.push(records[i].data);
        }
        parent.returnValue = baseDeptList;
    }else{
        if(records[0].get('I_DEPTID') == I_DEPTID){
            Ext.MessageBox.alert('错误','该项为移动项,请重新选择');
            return;
        }else{
            parent.returnValue = records[0].data;
        }

    }
    _close();
}

function _close(){
    parent.win.close();
}