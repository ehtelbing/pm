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
        frame:true,
        region:'north',
        defaults : {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout:'column',
        items : [{ xtype:'textfield',id:'lxbh',fieldLabel: '流程编号',labelWidth: 70,labelAlign: 'right'},
                { xtype: 'hidden',id: 'tabid'},
                {xtype: 'button',text: '查询', width : 70,icon: imgpath + '/search.png',handler:QueryGrid},
                {xtype: 'button',text: '批量通过',width : 100,id:'agr',icon: imgpath + '/saved.png',handler:AgreeData},
                {xtype: 'button',text: '批量驳回',width : 100,id:'dagr', icon: imgpath + '/cross.png' }
                 ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store : gridStore,
        id:'grid',
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel'
        },
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


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [ buttonPanel,tabpanel,grid]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            PersonCode : Ext.util.Cookies.get('v_personcode'),
            FlowType :Ext.getCmp('tabid').getValue(),
            FlowCode : Ext.getCmp('lxbh').getValue(),
            Page :  Ext.getCmp('page').store.currentPage,
            PageSize :  Ext.getCmp('page').store.pageSize
        }
    });

    QueryTab();
    QuerySum();
});

function QueryTab(){
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode:Ext.util.Cookies.get('v_personcode'),
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

function QuerySum(){
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
                Ext.getCmp('buttonPanel').setTitle('我的待办任务共（'+num+'）条');
            }
        }
    });
}

function QueryGrid(){
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup("gridStore").load({
        PersonCode : Ext.util.Cookies.get('v_personcode'),
        FlowType : Ext.getCmp('tabid').getValue(),
        FlowCode : Ext.getCmp('lxbh').getValue(),
        Page :  Ext.getCmp('page').store.currentPage,
        PageSize :  Ext.getCmp('page').store.pageSize
    });
}

function _preViewProcess(ProcessInstanceId) {
    var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
     window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        +  ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
}

function _dealWith(ProcessDefinitionKey,TaskDefinitionKey,BusinessKey,ProcessInstanceId) {
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
                window.open(AppUrl + 'page'+V_URL+'?V_ORDERGUID='+ BusinessKey+ '&TaskDefinitionKey='+ TaskDefinitionKey +'&ProcessDefinitionKey='+ProcessDefinitionKey +'&ProcessInstanceId='+ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
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

/*
* 批量通过
* */
function AgreeData(){
    var BusinessKeysData=[];
    var record=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(record.length>0){
        for(var i=0;i<record.length;i++){
            BusinessKeysData.push(record[i].data.BusinessKey);
        }
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskCompleteList',
            type: 'ajax',
            method: 'POST',
            params: {
                V_IDEA: "通过",
                V_INPER:Ext.util.Cookies.get('v_personcode'),
                FlowType: Ext.getCmp('tabid').getValue(),
                BusinessKeys:BusinessKeysData
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
            }
        });
    }else{
        alert("请选择审批数据！");
        return ;
    }

}