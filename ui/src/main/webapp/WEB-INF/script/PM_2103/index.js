var tabpage = '';
var tabturn = '';

var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
Ext.onReady(function () {


    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['originator', 'CreateTime', 'remark',
            'Name', 'flow_code', 'ProcessDefinitionName', 'ProcessInstanceId', 'TaskDefinitionKey', 'ProcessDefinitionKey', 'BusinessKey', 'startName', 'MATERIALNAME',
            'EQUNAME', 'PLANSTART', 'PLANEND', 'PLANHOUR', 'flow_type', 'OPERANAME', 'ORGNAME', 'DEPTNAME', 'ZYNAME'
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
        id: 'buttonPanel',
        frame: true,
        region: 'north',
        defaults: {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout: 'column',
        items: [{xtype: 'textfield', id: 'lxbh', fieldLabel: '流程编号', labelWidth: 70, labelAlign: 'right'},
            {xtype: 'hidden', id: 'tabid'},
            {
                xtype: 'combo',
                id: 'zy',
                allowBlank: false,
                store: zyStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '专业',
                displayField: 'V_BASENAME',
                valueField: 'V_SPECIALTYCODE', labelAlign: 'right',
                labelWidth: 60, width: 190
            },
            {xtype: 'button', text: '查询', width: 70, icon: imgpath + '/search.png', handler: QueryGrid},
            {xtype: 'button', text: '批量通过', width: 100, id: 'agr', icon: imgpath + '/saved.png', handler: AgreeData},
            {xtype: 'button', text: '批量驳回', width: 100, id: 'dagr', icon: imgpath + '/cross.png', handler: DisAgreeData}
        ], listeners: {
            render: function () {
                if (Ext.util.Cookies.get('v_orgCode') == "9900") {
                    Ext.getCmp('dagr').hide();
                    Ext.getCmp('dagr').hidden = true;
                }
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store: gridStore,
        id: 'grid',
        frame: true,
        columnLines: true,
        autoScroll: true,
        selModel: {
            selType: 'checkboxmodel'
        },
        region: 'center',
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
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
        }
            , {
                text: '流程类型',
                dataIndex: 'ProcessDefinitionName',
                align: 'center',
                width: 150,
                hidden: true
            }
            , {
                text: '流程步骤',
                dataIndex: 'Name',
                align: 'center',
                width: 150
            }
            , {
                text: '流程编号',
                dataIndex: 'flow_code',
                align: 'center',
                width: 120
            }
            , {
                text: '厂矿',
                dataIndex: 'ORGNAME',
                align: 'center',
                width: 150
            }
            , {
                text: '设备名称',
                dataIndex: 'EQUNAME',
                align: 'center',
                width: 200
            }
            , {
                text: '计划内容',
                dataIndex: 'remark',
                align: 'center',
                width: 300
            }
            , {
                text: '专业',
                dataIndex: 'ZYNAME',
                align: 'center',
                width: 82
            },
            {
                text: '工序',
                dataIndex: 'OPERANAME',
                align: 'center',
                width: 82
                // ,renderer:function(){ if(Ext.getCmp('tabpanel').getActiveTab().id=='WORK'){
                // grid.columns[10].hide();
                // }}
                // ,renderer:function(){ if(Ext.getCmp('tabpanel').getActiveTab().id=='WORK'){
                //         this.hidden=true;
                //     }}
            }
            , {
                text: '开始时间',
                dataIndex: 'PLANSTART',
                align: 'center',
                width: 200
            }, {
                text: '结束时间',
                dataIndex: 'PLANEND',
                align: 'center',
                width: 200
            }, {
                text: '计划工期（h)',
                dataIndex: 'PLANHOUR',
                align: 'center',
                width: 100
            }
            , {
                text: '发起人',
                dataIndex: 'startName',
                align: 'center',
                width: 100
            },
            {
                text: '作业区',
                dataIndex: 'DEPTNAME',
                align: 'center',
                width: 300
            }
            , {
                text: '发起时间',
                dataIndex: 'CreateTime',
                align: 'center',
                width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    return value.substring(0, 10);
                }
            }
            , {
                text: '备件消耗',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 100
            }
            , {
                text: '流程类型',
                dataIndex: 'flow_type',
                align: 'center',
                width: 100,
                hidden: true

            }
        ],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: 1701,//'100%',
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
                tabpage = Ext.getCmp('tabpanel').getActiveTab().id;
                Ext.ComponentManager.get("tabid").setValue(Ext.getCmp('tabpanel').getActiveTab().id);
                QuerySum();
                QueryGrid();
            }
        }
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [buttonPanel, tabpanel, grid]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowType: tabpage,//Ext.getCmp('tabid').getValue(),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue(),
            Page: Ext.getCmp('page').store.currentPage,
            PageSize: Ext.getCmp('page').store.pageSize
        }
    });
    QueryTab();
    QuerySum();
    Ext.data.StoreManager.lookup('zyStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTNEXTCODE: '%'//Ext.getCmp('zyq').getValue()
        }
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.ComponentManager.get("zy").store.insert(0, {
            'V_SPECIALTYCODE': '%',
            'V_BASENAME': '--全部--'
        });
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });

});


function QueryTab() {
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("tabpanel").add({
                        id: resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                if (tabturn == '') {
                    Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage == '' ? 'WORK' : tabpage);
                } else {
                    Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage = tabturn);
                }

            }
        }
    });
}

function QueryTabW() {
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("tabpanel").add({
                        id: resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                // if(tabturn==''){
                Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage = "WeekPlan");
                // }else{
                //     Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage=tabturn);
                // }
            }
        }
    });
}


function QueryTabYT() {
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("tabpanel").add({
                        id: resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                // if(tabturn==''){
                Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage = "WeekPlan01");
                // }else{
                //     Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage=tabturn);
                // }
            }
        }
    });
}

function QueryTabY() {
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("tabpanel").add({
                        id: resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage = "MonthPlan");
            }
        }
    });
}
function QueryTabMain() {
    Ext.ComponentManager.get("tabpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskTypeNum',
        type: 'ajax',
        method: 'POST',
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            FlowCode: Ext.getCmp('lxbh').getValue(),
            ZyType: Ext.getCmp('zy').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("tabpanel").add({
                        id: resp.list[i].code,
                        title: resp.list[i].name
                    });
                }
                Ext.ComponentManager.get("tabpanel").setActiveTab(tabpage = "MaintainPlan");
            }
        }
    });
}
function QuerySum() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskListSum',
        method: 'POST',
        async: false,
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.msg == 'Ok') {
                num = resp.total;
                Ext.getCmp('buttonPanel').setTitle('我的待办任务共（' + num + '）条');
            }
        }
    });
}

function QueryGrid() {
    Ext.data.StoreManager.lookup("gridStore").load({
        PersonCode: Ext.util.Cookies.get('v_personcode'),
        FlowType: tabpage,//Ext.getCmp('tabid').getValue(),
        FlowCode: Ext.getCmp('lxbh').getValue(),
        ZyType: Ext.getCmp('zy').getValue(),
        Page: Ext.getCmp('page').store.currentPage,
        PageSize: Ext.getCmp('page').store.pageSize
    });
}

function _preViewProcess(ProcessInstanceId) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}

function _dealWith(ProcessDefinitionKey, TaskDefinitionKey, BusinessKey, ProcessInstanceId) {
    tabturn = tabpage;
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
                var V_URL = data.list[0].V_URL;
                var owidth = window.screen.availWidth;
                var oheight = window.screen.availHeight - 50;
                window.open(AppUrl + 'page' + V_URL + '?V_ORDERGUID=' + BusinessKey + '&TaskDefinitionKey=' + TaskDefinitionKey + '&ProcessDefinitionKey=' + ProcessDefinitionKey + '&ProcessInstanceId=' + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
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
function AgreeData() {
    // var BusinessKeysData=[];
    if (Ext.getCmp('tabid').getValue() == 'WeekPlan') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var FlowType = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                FlowType.push(record[i].data.flow_type)
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchAgreeForWeek',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    FlowType: FlowType
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QueryGrid();
                }
            });

        } else {
            alert("请选择审批数据！");
            return;
        }
    } else if (Ext.getCmp('tabid').getValue() == 'MonthPlan') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var FlowType = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                FlowType.push(record[i].data.flow_type);
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchAgreeForMonth',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    FlowType: FlowType
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QuerySum();
                    QueryGrid();
                }
            });
        } else {
            alert("请选择审批数据！");
            return;
        }
    } else if (Ext.getCmp('tabid').getValue() == 'WORK') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var ProcessInstanceIdData = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                ProcessInstanceIdData.push(record[i].data.ProcessInstanceId);
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchAgreeForWork',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    ProcessInstanceId: ProcessInstanceIdData
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QuerySum();
                    QueryGrid();
                }
            });
        } else {
            alert("请选择审批数据！");
            return;
        }

    }


}

/*
 * 批量驳回
 * */
function DisAgreeData() {
    //var BusinessKeysData=[];
    if (Ext.getCmp('tabid').getValue() == 'WeekPlan') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var ProcessInstanceIdData = [];
            var FlowType = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                ProcessInstanceIdData.push(record[i].data.ProcessInstanceId);
                FlowType.push(record[i].data.flow_type);
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchDisAgreeForWeek',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    ProcessInstanceId: ProcessInstanceIdData,
                    FlowType: FlowType
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QuerySum();
                    QueryGrid();
                }
            });
        } else {
            alert("请选择审批数据！");
            return;
        }
    } else if (Ext.getCmp('tabid').getValue() == 'MonthPlan') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var ProcessInstanceIdData = [];
            var FlowType = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                ProcessInstanceIdData.push(record[i].data.ProcessInstanceId);
                FlowType.push(record[i].data.flow_type);
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchDisAgreeForMonth',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    ProcessInstanceId: ProcessInstanceIdData,
                    FlowType: FlowType
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QuerySum();
                    QueryGrid();
                }
            });
        } else {
            alert("请选择审批数据！");
            return;
        }
    } else if (Ext.getCmp('tabid').getValue() == 'WORK') {
        var record = Ext.getCmp('grid').getSelectionModel().getSelection();
        var num = 0;
        var fnum = 0;
        if (record.length > 0) {
            var BusinessKeysData = [];
            var ProcessDefinitionKeyData = [];
            var ProcessInstanceIdData = [];
            for (var i = 0; i < record.length; i++) {
                BusinessKeysData.push(record[i].data.BusinessKey);
                ProcessDefinitionKeyData.push(record[i].data.ProcessDefinitionKey);
                ProcessInstanceIdData.push(record[i].data.ProcessInstanceId);
            }

            Ext.Ajax.request({
                url: AppUrl + 'cjy/batchDisAgreeForWork',
                async: false,
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_ORDERGUID: BusinessKeysData,
                    ProcessDefinitionKey: ProcessDefinitionKeyData,
                    ProcessInstanceId: ProcessInstanceIdData
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);
                    alert(data.mes);
                    QuerySum();
                    QueryGrid();
                }
            });
        } else {
            alert("请选择审批数据！");
            return;
        }
    }

}

function OnPageLoad() {
    window.location.reload();
}