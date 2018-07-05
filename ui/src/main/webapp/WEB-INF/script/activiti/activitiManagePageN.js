Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['originator', 'CreateTime', 'remark',
            'Name','flow_code','ProcessDefinitionName','ProcessInstanceId','TaskDefinitionKey','ProcessDefinitionKey','BusinessKey','startName','MATERIALNAME'
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
        frame:true,
        region:'north',
        defaults : {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout:'column',
        items : [{ xtype:'textfield',id:'lxbh',fieldLabel: '流程编号',labelWidth: 70,labelAlign: 'right'},
            { xtype: 'hidden',id: 'tabid'},
            {xtype: 'button',text: '查询', width : 70,icon: imgpath + '/search.png',handler:QueryGrid}
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store : gridStore,
        id:'grid',
        frame : true,
        columnLines : true,
        /*selModel: {
            selType: 'checkboxmodel'
        },*/
        region:'center',
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
                return  '<a href="#" onclick="_preViewProcess(\'' + record.data.ProcessInstanceId + '\',\'' + record.data.BusinessKey + '\')">' + '流程管理' + '</a>' +
                    '&nbsp;&nbsp;&nbsp;<a href="#" onclick="_cancelFlow(\'' + record.data.BusinessKey + '\',\'' + record.data.ProcessDefinitionKey + '\',\'' + record.raw.flow_type + '\')">' + '删除流程' + '</a>';
            }
        }, {
            text: '流程类型',
            dataIndex: 'ProcessDefinitionName',
            align: 'center',
            width: 150
        }, {
            text: '流程编号',
            dataIndex: 'flow_code',
            align: 'center',
            width: 200
        }, {
            text: '流程步骤',
            dataIndex: 'Name',
            align: 'center',
            width: 200
        }, {
            text: '摘要',
            dataIndex: 'remark',
            align: 'center',
            width: 300
        },  {
            text: '发起人',
            dataIndex: 'startName',
            align: 'center',
            width: 100
        }, {
            text: '发起时间',
            dataIndex: 'CreateTime',
            align: 'center',
            width: 200,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0, 10);
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

    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'north',
        listeners: {
            tabchange: function () {
                Ext.ComponentManager.get("tabid").setValue(Ext.getCmp('tabpanel').getActiveTab().id);
                QueryGrid();
            }
        }
    });

    var	form = Ext.create('Ext.form.Panel', {
        title: '部署流程',
        width: '100%',
        height:'100%',
        bodyPadding: 10,
        frame: true,
        defaults:{
            labelWidth:80
        },
        items: [
            {
                xtype: 'textfield',
                name: 'deployName',
                fieldLabel: '发布名称',
                allowBlank: false
            },
            {
                xtype: 'filefield',
                name: 'processFile',
                id: 'processFile',
                fieldLabel: '流程文件名',
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择文件...'
            }],

        buttons: [{
            text: '发布',
            handler: function() {
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url:AppUrl + 'Activiti/ModelDeployProcess',
                        waitMsg: '请等待...',
                        success: function(fp, o) {

                        },
                        failure: function(form, action) {
                            if(action.result.ret=="部署流程成功"){
                                Ext.Msg.alert("消息","发布成功");
                            }
                        }
                    });
                }
            }
        }]
    });

    var startPanel = Ext.create('Ext.Panel', {
        title:'发起流程',
        id : 'startPanel',
        width: '100%',
        height:'100%',
        autoScroll: true,
        frame:true,
        region:'center',
        layout:'border',
        items : [        ]
    });

    var Panel = Ext.create('Ext.Panel', {
        title:'流程管理',
        id : 'Panel',
        width: '100%',
        height:'100%',
        autoScroll: true,
        frame:true,
        region:'center',
        layout:'border',
        items : [buttonPanel,tabpanel,grid
        ]
    });

    var endPanel = Ext.create('Ext.Panel', {
        title:'放弃流程',
        id : 'endPanel',
        width: '100%',
        height:'100%',
        autoScroll: true,
        frame:true,
        region:'center',
        layout:'border',
        items : [        ]
    });

    var tabpanelW = Ext.create("Ext.tab.Panel", {
        id: 'tabpanelW',
        region: 'center',
        width: '100%',
        height:'100%',
        items:[form,startPanel,Panel,endPanel]/*,
        listeners: {
            tabchange: function () {
                Ext.ComponentManager.get("tabid").setValue(Ext.getCmp('tabpanel').getActiveTab().id);
                QueryGrid();
            }
        }*/
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [ tabpanelW]
    });


    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            PersonCode :'ActivitiManage',
            FlowType :Ext.getCmp('tabid').getValue(),
            FlowCode : Ext.getCmp('lxbh').getValue(),
            Page :  Ext.getCmp('page').store.currentPage,
            PageSize :  Ext.getCmp('page').store.pageSize
        }
    });

    QueryTab();
});

function QueryTab(){
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode:'ActivitiManage',
            FlowCode:Ext.getCmp('lxbh').getValue()
        },
        success: function (response) {
            var resp=Ext.decode(response.responseText);
            if(resp.list.length>0){
                for(var i=0;i<resp.list.length;i++){
                    Ext.ComponentManager.get("tabpanel").add({
                        id : resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                Ext.ComponentManager.get("tabpanel").setActiveTab(0);
            }
        }
    });
    Ext.getBody().unmask();
}


function QueryGrid(){
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup("gridStore").load({
        PersonCode :'ActivitiManage',
        FlowType : Ext.getCmp('tabid').getValue(),
        FlowCode : Ext.getCmp('lxbh').getValue(),
        Page :  Ext.getCmp('page').store.currentPage,
        PageSize :  Ext.getCmp('page').store.pageSize
    });
}

function _preViewProcess(ProcessInstanceId,BusinessKey) {
    var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210302/index.html?ProcessInstanceId='
        +  ProcessInstanceId+'&BusinessKey='+BusinessKey+'&flowtype='+Ext.ComponentManager.get("tabpanel").getActiveTab().id, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
}
function _cancelFlow(BusinessKey,ProcessDefinitionKey,flow_type) {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/DeleteProcessInstance',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_BUSINESSKEY: BusinessKey
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.msg == "删除成功") {
                QueryGrid();
                /*Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_ACTIVITI_DELETE',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_BusinessKey: BusinessKey,
                        V_V_FlowType: flow_type
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);
                        if (resp.V_INFO == 'success') {
                            Ext.Ajax.request({
                                url: AppUrl + 'cjy/PM_ACTIVITI_STEP_LOG_SET',
                                type: 'ajax',
                                method: 'POST',
                                params: {
                                    V_V_BUSINESS_GUID: BusinessKey,
                                    V_V_PROCESS_GUID: ProcessDefinitionKey,
                                    V_V_STEPCODE: '',
                                    V_V_STEPNAME: '',
                                    V_V_IDEA: '删除流程',
                                    V_V_NEXTPER: '',
                                    V_V_INPER: Ext.util.Cookies.get('v_personcode')
                                },
                                success: function (response) {
                                    var resp = Ext.decode(response.responseText);
                                    if (resp.RET == 'success') {
                                        alert("删除成功");
                                        QueryGrid();
                                    } else {
                                        alert("记录日志失败");
                                    }
                                }
                            });
                        } else {
                            alert('删除数据失败');
                        }
                    }
                });*/
            } else {
                alert('删除失败');
            }
        }
    });
}