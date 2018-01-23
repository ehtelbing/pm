var V_GUID = "" ;
var num=0;
var V_V_GUID_COPY = '';
var personStoreLoad = false;
var initLoad = true;
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if(i<10)
    {
        months.push({displayField: '0'+i, valueField: '0'+i});
    }else{
        months.push({displayField: i, valueField: i});
    }

}
var STATEDATA = [{ displayField: '全部', valueField: '%' },{ displayField: '已整改', valueField: '已整改' },{ displayField: '未整改', valueField: '未整改' }
    ,{ displayField: '未反馈', valueField: '未反馈' }];
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

    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果


//流程类型
    var lclxStore= Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'lclxStore',
        fields: ['V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PM_FLOW_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['originator', 'CreateTime', 'remark',
            'Name','flow_code','ProcessDefinitionName','ProcessInstanceId','TaskDefinitionKey','ProcessDefinitionKey','BusinessKey','startName'
        ],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Activiti/QueryTaskList',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });



    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        title:'我的待办任务（'+num+'）条',
        width:'100%',
        defaults : {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout:'column',
        items : [{
            xtype: 'combo',
            id: 'lclx',
            fieldLabel: '流程类型',
            editable: false,
            labelWidth: 55,
            width:200,
            displayField: 'V_FLOWTYPE_NAME',
            valueField: 'V_FLOWTYPE_CODE',
            store: lclxStore,
            queryMode: 'local'
        },
            {
                xtype: 'button',
                text: '查询',
                width : 70,
                icon: imgpath + '/search.png',
                handler: OnPageLoad
            },
            {
                xtype: 'button',
                text: '批量通过',
                width : 100,
                id:'agr',
                icon: imgpath + '/search.png',
                handler: batchAgree
            },
            {
                xtype: 'button',
                text: '批量驳回',
                width : 100,
                id:'dagr',
                icon: imgpath + '/search.png',
                handler: batchDisAgree
            }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel'/*,
            mode: 'SIMPLE'*/
        },
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '操作',
            dataIndex: 'V_ORDERID',
            width: 155,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:_dealWith(\'' + record.data.ProcessDefinitionKey + '\',\'' + record.data.TaskDefinitionKey + '\',\'' + record.data.BusinessKey + '\',\'' + record.data.ProcessInstanceId + '\')>' + '办理' + '</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick="_preViewProcess(\'' + record.data.ProcessInstanceId + '\')">' + '查看流程' + '</a>';
            }
        }, {
            text : '流程类型',
            dataIndex : 'ProcessDefinitionName',
            align : 'center',
            width : 150
        },{
            text : '流程编号',
            dataIndex : 'flow_code',
            align : 'center',
            width : 200
        },{
            text : '流程步骤',
            dataIndex : 'Name',
            align : 'center',
            width : 200
        },{
            text : '摘要',
            dataIndex : 'remark',
            align : 'center',
            width : 300
        },{
            text : '发起人',
            dataIndex : 'startName',
            align : 'center',
            width : 100
        },{
            text : '发起时间',
            dataIndex : 'CreateTime',
            align : 'center',
            width : 200,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var viewProcessGridPanel = Ext.create('Ext.grid.Panel', {
        id : 'viewProcessGridPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGEL'
        },
        columns : [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '流程步骤',
            dataIndex: 'V_FLOW_TYPE',
            align: 'center',
            width: 120
        }, {
            text: '审批人',
            dataIndex: 'V_ACTIVITI_CODE',
            align: 'center',
            width: 150

        },{
            text: '审批时间',
            dataIndex: 'V_ACTIVITI_NAME',
            align: 'center',
            width: 150
        }, {
            text: '意见',
            dataIndex: 'V_INPER_NAME',
            align: 'center',
            width: 80
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });



    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: '100%',
                    height: 350,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [  {
            region : 'north',
            border : false,
            items : [ buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('lclxStore').on('load', function () {
        Ext.data.StoreManager.lookup('lclxStore').insert(0, {
            'V_FLOWTYPE_CODE' : '全部',
            'V_FLOWTYPE_NAME' : '全部'
        });
        Ext.getCmp("lclx").select(Ext.data.StoreManager.lookup('lclxStore').getAt(0));
        Ext.getCmp('dagr').hide();
        Ext.getCmp('agr').hide();
        _init();
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            PersonCode:  Ext.util.Cookies.get('v_personcode'),
            FlowType:Ext.getCmp('lclx').getValue()

        }
    });

    Ext.ComponentManager.get("lclx").on("change", function () {
        OnPageLoad();
        if(Ext.getCmp('lclx').getValue()=='全部'||Ext.getCmp('lclx').getValue()=='WORK'){//工单流程
            Ext.getCmp('dagr').hide();
            Ext.getCmp('agr').hide();
        }else{
            Ext.getCmp('dagr').show();
            Ext.getCmp('agr').show();
        }
    });

})

function _init()
{

    if(initLoad)
    {
        initLoad = false;
        OnPageLoad();
        Ext.getBody().unmask();//去除页面笼罩
    }


}

function _preViewProcess(ProcessInstanceId)
{
    var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
    +  ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');

}

function _dealWith(ProcessDefinitionKey,TaskDefinitionKey,BusinessKey,ProcessInstanceId)
{
    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_EQU_REPAIR_FLOW_MENU_SEL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_PROCESS_KEY: ProcessDefinitionKey,
            V_V_FLOW_STEP: TaskDefinitionKey


        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                var V_URL =  data.list[0].V_URL;
                var owidth = window.screen.availWidth;
                var oheight =  window.screen.availHeight - 50;
                var ret = window.open(AppUrl + 'page'+V_URL+'?V_ORDERGUID='+ BusinessKey+ '&TaskDefinitionKey='+ TaskDefinitionKey +'&ProcessDefinitionKey='+ProcessDefinitionKey +'&ProcessInstanceId='+ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');


            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })


}


function OnPageLoad() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        PersonCode:  Ext.util.Cookies.get('v_personcode'),
        FlowType:Ext.getCmp('lclx').getValue()
    };
    gridStore.currentPage = 1;
    gridStore.load();

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskListSum',
        method: 'POST',
        async : false,
        params:{
            PersonCode:  Ext.util.Cookies.get('v_personcode')
        },
        success:function(resp){
            var resp=Ext.decode(resp.responseText);
            if(resp.msg=='Ok'){
                num=resp.total;
                Ext.getCmp('buttonPanel').setTitle('我的待办任务（'+num+'）条');

            }
        }
    });
}
function batchAgree(){
    var record=Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
}

function batchDisAgree(){
    var record=Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
}
