var win;
var returnValue;
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

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    //已有根节点则加载树的根节点，无需root创建

    var baseDeptStore = Ext.create('Ext.data.TreeStore',{
       storeId : 'baseDeptStore',
       autoLoad : false,
       loading : false,
       root : {},//保证autoLoad有效
       pageSize : 20,
       fields : ['I_DEPTID','V_DEPTCODE','V_DEPTNAME','V_DEPTCODE_UP','V_DEPTSMALLNAME','V_DEPTFULLNAME','V_DEPTTYPE','I_ORDERID','I_FLAG','V_SAP_DEPT','V_SAP_WORK','V_SAP_JHGC','V_SAP_YWFW','D_DATE_EDITTIME','V_DEPT_WBS','V_WBS_NUM','V_WXJH_REPAIRGUID'],
       proxy : {
           url : AppUrl+'Ydj/selectBaseDept',
           type : 'ajax',
           async : false,
           actionMethods : {
               read : 'POST'
           },
           extraParams : {},
           reader : {
               type : 'json',
               root : 'list',
               totalProperty : 'total'
           }
       }
    });

    var buttonPanel = Ext.create('Ext.Panel',{
        id : 'buttonPanel',
        defaults : {
            style : 'margin :2px;'
        },
        items : [{
            xtype : 'button',
            text : '新增根节点',
            handler : _preInsertBaseDeptRoot
        },{
            xtype : 'button',
            text : '新增下一级',
            handler : _preInsertBaseDept
        },{
            xtype : 'button',
            text : '修改',
            handler : _preUpdateBaseDept
        },{
            xtype : 'button',
            text : '删除',
            handler : _deleteBaseDept
        },{
            xtype : 'button',
            text : '移动',
            handler : _preMoveBaseDept
        }]
    });
    var baseDeptPanel = Ext.create('Ext.tree.Panel',{
        id : 'baseDeptPanel',
        store : baseDeptStore,
        title : '部门管理',
        rootVisible : false,//根节点显示
        hideHeaders : false,//是否隐藏标头
        rowLines : true,//是否有下划线分割
        animate : !Ext.isIE,
        frame : true,
        columnLines : true,
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SINGLE'
        },
        columns : [{
            xtype : 'treecolumn',
            text : '部门名称',
            dataIndex : 'V_DEPTNAME',
            style : 'text-align : center;',
            flex : 3
        },{
            text : '部门编码',
            dataIndex : 'V_DEPTCODE',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '上级部门编码',
            dataIndex : 'V_DEPTCODE_UP',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '部门简称',
            dataIndex : 'V_DEPTSMALLNAME',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '部门全称',
            dataIndex : 'V_DEPTFULLNAME',
            style : 'text-align : center;',
            flex : 2
        },{
            text : '部门类型',
            dataIndex : 'V_DEPTTYPE',
            style : 'text-align : center',
            flex : 3
        },{
            text : '部门排序',
            dataIndex : 'I_ORDERID',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '启用标识',
            dataIndex : 'I_FLAG',
            style : 'text-align : center;',
            flex : 1
        },{
            text : 'SAP部门编码',
            dataIndex : 'V_SAP_DEPT',
            style : 'text-align : center;',
            flex : 1
        },{
            text : 'SAP维护工厂',
            dataIndex : 'V_SAP_WORK',
            style : 'text-align : center;',
            flex : 1
        },{
            text : 'SAP计划工厂',
            dataIndex : 'V_SAP_JHGC',
            style : 'text-align : center;',
            flex : 1
        },{
            text : 'SAP业务范围',
            dataIndex : 'V_SAP_YWFW',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '数据生成时间',
            dataIndex : 'D_DATE_EDITTIME',
            style : 'text-align : center;',
            flex : 2
        },{
            text : 'wbs生成码',
            dataIndex : 'V_DEPT_WBS',
            style : 'text-align : center;',
            flex : 1
        },{
            text : 'wbs单位序号',
            dataIndex : 'V_WBS_NUM',
            style : 'text-align : center;',
            flex : 1
        },{
            text : '维修计划检修单位guid',
            dataIndex : 'V_WXJH_REPAIRGUID',
            style : 'text-align : center;',
            flex : 2
        }],
        viewConfig : {
            emptyText : '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection : true
        },
        listeners:{
            beforeitemexpand : function (node,eOpts) {
                baseDeptStore.proxy.extraParams = {
                    'V_DEPTCODE_UP' : node.get('V_DEPTCODE')
                };
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
        },
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
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');
    Ext.getCmp('baseDeptPanel').expandAll();
    Ext.getBody().unmask();
}
function _selectBaseDeptStore(){
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');//找到数据集
    baseDeptStore.currentPage = 1;
    baseDeptStore.load();//加载
}
function _preInsertBaseDeptRoot(){

    returnValue = null;
    win = Ext.create('Ext.window.Window',{
        title : '新增根节点界面',
        modal : true,
        autoShow : true,
        maximized : false,
        maximizable : true,
        width : 560,
        height : 440,
        html : '<iframe src="' + AppUrl + 'page/SysManage/SM000104/index.html" style="width: 100%; height: 100%;" frameborder="0"></iframe>',
        listeners : {
            close : function(panel,eOpts){
                if(returnValue != null){
                    Ext.MessageBox.alert('添加','成功！');
                    _selectBaseDeptStore();
                    Ext.getCmp('baseDeptPanel').expandAll();
                }
            }
        }
    });
}
function _preInsertBaseDept(){
    var records = Ext.getCmp('baseDeptPanel').getSelectionModel().getSelection();
    if(records.length == 0){
         Ext.MessageBox.alert('错误','请选择上级目录');
         return;
    }
    returnValue = null;
    win = Ext.create('Ext.window.Window',{
        title : '新增下一级界面',
        modal : true,
        autoShow : true,
        maximized : false,
        maximizable : true,
        width : 560,
        height : 440,
        html : '<iframe src="' + AppUrl + 'page/SysManage/SM000101/index.html?V_DEPTCODE=' + records[0].get('V_DEPTCODE') + '" style="width: 100%; height: 100%;" frameborder="0"></iframe>',
        listeners : {
            close : function(panel,eOpts){
                if(returnValue != null){
                    var result = returnValue;
                    result.expandable = true;
                    records[0].appendChild(result);
                    records[0].expand();
                    Ext.MessageBox.alert('添加','成功！');
                }
            }
        }
    });
}
function _preUpdateBaseDept(){
    var records = Ext.getCmp('baseDeptPanel').getSelectionModel().getSelection();
    if(records.length == 0){
        Ext.MessageBox.alert('错误','请选中修改项！');
        return;
    }
    returnValue = null;
    win = Ext.create('Ext.window.Window',{
        title : '修改界面',
        modal : true,
        autoShow : true,
        maximized : false,
        maximizable : true,
        width : 560,
        height : 420,
        html : '<iframe src="' + AppUrl + 'page/SysManage/SM000102/index.html?I_DEPTID=' + records[0].get('I_DEPTID') +'&V_DEPTCODE_UP='+records[0].get('V_DEPTCODE_UP')+ '" style="width: 100%; height: 100%;" frameborder="0"></iframe>',
        listeners : {
            close : function (panel,eOpts) {
                if(returnValue != null){
                    var result = returnValue;
                    for(var key in result){
                        records[0].set(key,result[key]);
                    }
                    Ext.MessageBox.alert('修改','成功！');
                }
            }
        }
    });
}
function _deleteBaseDept(){
    var records = Ext.getCmp('baseDeptPanel').getSelectionModel().getSelection();
    if(records.length == 0){
        Ext.MessageBox.alert('错误','请选中删除项');
        return;
    }
    returnValue = null;
    Ext.MessageBox.show({
        title : '弹窗',
        msg : '删除',
        buttons : Ext.MessageBox.YESNO,
        icon : Ext.MessageBox.QUESTION,
        fn : function (btn) {
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url : AppUrl + 'Ydj/deleteBaseDept',
                    async : false,
                    params : {
                        'I_DEPTID' : records[0].get('I_DEPTID')
                    },
                    callback : function (options,success,response) {
                        if(success){
                            var data = Ext.decode(response.responseText);
                            if(data.success){
                                records[0].remove();
                                Ext.MessageBox.alert('删除','成功！');
                            }else {
                                Ext.MessageBox.alert('删除','失败！');
                            }
                        }else {
                            Ext.MessageBox.alert('错误','数据异常，请稍候重试！');
                        }
                    }
                });
            }
        }
    });
}

var recordsMove ;
function _preMoveBaseDept(){
    var records = Ext.getCmp('baseDeptPanel').getSelectionModel().getSelection();
    if(records.length == 0){
        Ext.MessageBox.alert('错误','请选中移动项');
        return;
    }
    recordsMove = records;
    returnValue = null;
    win =Ext.create('Ext.window.Window',{
        title : '移动界面',
        modal : true,
        autoShow :true,
        maximized :false,
        maximizable : true,
        width : 560,
        height : 440,
        html :'<iframe src = "'+ AppUrl + 'page/SysManage/SM000103/index.html?rootVisible=T&multipul=F&I_DEPTID='+records[0].get('I_DEPTID')+'" style="width: 100%; height: 100%;" frameborder="0"></iframe>',
        listeners : {
            close : function(panel,eOpts){
                if(returnValue != null){
                    var storeResult = returnValue;
                    Ext.MessageBox.show({
                       title : '提示',
                       msg : '请确认移动',
                       buttons : Ext.MessageBox.YESNO,
                       icon : Ext.MessageBox.QUESTION,
                       fn : function (btn){
                           if(btn == 'yes'){
                               Ext.Ajax.request({
                                   url : AppUrl + 'Ydj/moveBaseDept',
                                   async : false,
                                   params : {
                                       'I_DEPTID' : records[0].get('I_DEPTID'),
                                       'V_DEPTCODE' : records[0].get('V_DEPTCODE'),
                                       'V_DEPTCODE_UP' :storeResult.V_DEPTCODE
                                   },
                                   callback : function(options,success,response){
                                       if(success){
                                           var data = Ext.decode(response.responseText);
                                           if(data.baseDept != null){
                                               var moveResult = data.baseDept;
                                               for(var key in moveResult){
                                                   records[0].set(key,moveResult[key]);
                                               }

                                               var rootNode = Ext.data.StoreManager.lookup("baseDeptStore").getRootNode();
                                               var parentNode = rootNode;
                                               if(storeResult.I_DEPTID != ''){
                                                   parentNode = rootNode.findChild('I_DEPTID',storeResult.I_DEPTID,true);
                                               }
                                               parentNode.appendChild(records[0]);
                                               parentNode.expand();
                                               Ext.MessageBox.alert('移动','成功！');
                                           }else{
                                               Ext.MessageBox.alert('错误', '服务异常！');
                                           }
                                       }else{
                                           Ext.MessageBox.alert('错误', '服务异常！');
                                       }
                                   }
                               })
                           }
                       }
                    });
                }
            }
        }
    });
}
