var V_GUID = "" ;
var num=0;
var tabIndex = 0;
var V_V_GUID_COPY = '';
var personStoreLoad = false;
var initLoad = true;
var taskId = '';
var V_STEPCODE = '';

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
        items : [
            {
                xtype:'textfield',
                id:'lxbh',
                fieldLabel: '流程编号',
                labelWidth: 70,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                dataIndex : 'flow_code'
            },
            {
                xtype: 'hidden',
                id: 'tabid'
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
                icon: imgpath + '/saved.png',
                handler: batchAgree
            },
            {
                xtype: 'button',
                text: '批量驳回',
                width : 100,
                id:'dagr',
                icon: imgpath + '/cross.png',
                handler: batchDisAgree
            }
        ]
    });

    var tabpanel = Ext.create("Ext.tab.Panel",{
       id:'tabpanel' ,
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                Ext.ComponentManager.get("tabid").setValue(Ext
                    .getCmp('tabpanel').getActiveTab().down("hidden")
                    .getValue());
                Ext.getCmp('page').store.currentPage = 1;
                gridStore.load({
                    params:{
                        PersonCode:  Ext.util.Cookies.get('v_personcode'),
                        FlowType:Ext.getCmp('tabpanel').getActiveTab().down("hidden").getValue(),
                        FlowCode:Ext.getCmp('lxbh').getValue()
                    }
                });

                if(Ext.getCmp('tabpanel').getActiveTab().down("hidden").getValue()=='WORK'){//工单流程
                    Ext.getCmp('dagr').hide();
                    Ext.getCmp('agr').hide();
                }else{
                    Ext.getCmp('dagr').show();
                    Ext.getCmp('agr').show();
                }
            }
        }
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
                return '<a href=javascript:_dealWith(\'' + record.data.ProcessDefinitionKey + '\',\'' + record.data.TaskDefinitionKey + '\',\''
                    + record.data.BusinessKey + '\',\'' + record.data.ProcessInstanceId + '\')>' + '办理' + '</a>&nbsp;&nbsp;&nbsp;' +
                    '<a href="#" onclick="_preViewProcess(\'' + record.data.ProcessInstanceId + '\')">' + '查看流程' + '</a>';
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
            items : [ buttonPanel, tabpanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ overhaulApplyPanel ]
        } ]
    });

    addTab();
    _init();
});

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
        FlowType:Ext.getCmp('tabpanel').getActiveTab().down("hidden").getValue(),
        FlowCode:Ext.getCmp('lxbh').getValue()
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
    if(record.length<=0){
        alert("请选择数据")
    }
    for(var i=0;i<record.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
            type: 'ajax',
            method: 'POST',
            params: {
                businessKey: record[i].data.BusinessKey,
                userCode: Ext.util.Cookies.get('v_personcode')
            },
            success: function (resp) {
                var mata = Ext.decode(resp.responseText);//后台返回的值
                taskId = mata.taskId;
                V_STEPCODE = data.TaskDefinitionKey;
                for(var m = 0;m<record.length;m++){
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/TaskComplete',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            taskId: taskId,
                            idea: '通过',
                            parName: [ "flow_yj"],
                            parVal: [ '通过'],
                            processKey :record[m].data.ProcessDefinitionKey,
                            businessKey : record[m].data.BusinessKey,
                            V_STEPCODE : V_STEPCODE,
                            V_STEPNAME : record[n].data.TaskDefinitionKey,
                            V_IDEA : '请审批',
                            V_NEXTPER : '',
                            V_INPER : Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.ret == '任务提交成功') {
                                for(var n = 0;n<record.length;n++){
                                    Ext.Ajax.request({
                                        url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                                        method: 'POST',
                                        async: false,
                                        params: {
                                            'V_V_ORDERID': record[n].data.BusinessKey,
                                            'V_V_PROCESS_NAMESPACE': 'WeekPlan',
                                            'V_V_PROCESS_CODE': record[n].data.ProcessDefinitionKey,
                                            'V_V_STEPCODE': V_STEPCODE,
                                            'V_V_STEPNEXT_CODE': record[n].data.TaskDefinitionKey
                                        },
                                        success: function (ret) {
                                            OnPageLoad();
                                            var resp = Ext.JSON.decode(ret.responseText);
                                            if (resp.V_INFO == 'success') {
                                                OnPageLoad();
                                            }
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.alert('提示', '任务提交失败');
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

            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });

    }

}

function batchDisAgree(){
    var record=Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
    if(record.length<=0){
        alert("请选择数据")
    }
    for(var i=0;i<record.length;i++){
            Ext.Ajax.request({
                url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
                type: 'ajax',
                method: 'POST',
                params: {
                    businessKey: record[i].data.BusinessKey,
                    userCode: Ext.util.Cookies.get('v_personcode')
                },
                success: function (resp) {
                    var mata = Ext.decode(resp.responseText);//后台返回的值
                    taskId = mata.taskId;
                    for(var m = 0;m<record.length;m++){
                        Ext.Ajax.request({
                            url: AppUrl + 'Activiti/TaskComplete',
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                taskId: taskId,
                                idea: '不通过',
                                parName: [ "flow_yj"],
                                parVal: [ '驳回'],
                                processKey :record[m].data.ProcessDefinitionKey,
                                businessKey : record[m].data.BusinessKey,
                                V_STEPCODE : 'end',
                                V_STEPNAME : '驳回',
                                V_IDEA : '驳回',
                                V_NEXTPER : '',
                                V_INPER : Ext.util.Cookies.get('v_personcode')
                            },
                            success: function (response) {
                                OnPageLoad();
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

                },
                failure: function (response) {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: response.responseText,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });

    }

}

function addTab() {
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_FLOW_TYPE_SEL',
        method: 'POST',
        async: false,
        params: {

        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            resp = resp.list;
            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id : 'tabpanel'+i,
                    title: resp[i].V_FLOWTYPE_NAME,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].V_FLOWTYPE_CODE
                    }]
                })
            }
            Ext.ComponentManager.get("tabpanel").setActiveTab(0);
        }

    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            PersonCode:  Ext.util.Cookies.get('v_personcode'),
            FlowType:Ext.getCmp('tabpanel').getActiveTab().down("hidden").getValue(),
            FlowCode:Ext.getCmp('lxbh').getValue()
        };
    });
}