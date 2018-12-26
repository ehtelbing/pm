

var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';

var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//作业区加载
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
// 下一步接收人
var nextSprStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'nextSprStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    },
    listeners: {
        load: function (store, records, success, eOpts) {
            if( store.getAt(0)==undefined){
                Ext.getCmp('nextPer').select(''); return;
            }else{
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                Ext.getCmp('nextPer').select(store.first());
            }

        }

    }
});
var gridStore=Ext.create('Ext.data.Store',{
   id:'gridStore',
    autoLoad: true,
    fields: ['ID_GUID', 'ORGCODE','ORGNAME','DEPTCODE','DEPTNAME','ZYCODE','ZYNAME','EQUCODE','V_EQUNAME','EQUTYPE',
    'V_EQUTYPENAME','REPAIRCONTENT','PLANHOUR','REPAIRTYPE','REPAIRTYPENAME','INPERCODE','INPERNAME','INDATE',
        'STATE','STATENAME','REMARK','V_FLOWCODE','V_FLOWTYPE','MXCODE','PLANTYPE','V_YEAR', 'V_MONTH'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET'
        }
    }
});
var npanel=Ext.create('Ext.panel.Panel',{
    id:'npanel',
    region:'north',
    frame: true,
    border: false,
    layout:'column',
    items:[{xtype:'combobox',id:'ck',store: ckStore,fieldLabel: '厂矿',editable: false,labelWidth: 70,
        displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',queryMode: 'local',style: ' margin: 5px 0px 0px 10px',
        labelAlign: 'right',width: 250},
        {xtype:'combobox',id:'zyq', store: zyqStore,editable: false,queryMode: 'local',fieldLabel: '作业区',labelAlign: 'right',
         displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',labelWidth: 80,width: 250,style: ' margin: 5px 0px 0px 10px'},
        , {
            xtype: 'combo',
            id: 'nextPer',
            fieldLabel: '下一步接收人',
            editable: false,
            style: ' margin: 5px 0px 0px 10px',
            labelWidth: 80,
            width: 220,
            value: '',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            store: nextSprStore,
            queryMode: 'local'
        },
        {xtype:'button',id:'addbtn',text: '查询',icon:imgpath + '/search.png',style: ' margin: 5px 0px 0px 10px',handler: OnButtonQuery},
        {xtype: 'button',icon: imgpath + '/add.png',text:'手工添加',style: ' margin: 5px 0px 0px 10px', handler: OnButtonPlanAddClicked},
        // {xtype: 'button',text: '模型选择',icon: imgpath + '/add.png',style: ' margin: 5px 0px 0px 10px',handler: OnButtonSelectClicked},
        {xtype: 'button', text: '修改',icon: imgpath + '/edit.png',style: ' margin: 5px 0px 0px 10px', handler: OnButtonEditClicked},
        {xtype: 'button', text: '作废',icon: imgpath + '/delete1.png',style: ' margin: 5px 0px 0px 10px', handler: OnButtonDelete},
        {xtype: 'button',text: '上报',icon: imgpath + '/accordion_collapse.png',style: ' margin: 5px 0px 0px 10px',handler: OnButtonUp},
        {xtype: 'button',text: '导出Excel',icon: imgpath + '/accordion_collapse.png',style: ' margin: 5px 0px 0px 10px',handler: OnButtonExportClicked}
    ]

});

var cpanel=Ext.create('Ext.grid.Panel',{
   id:'cpanel',
    region:'center',
    border: false,
    store: 'gridStore',
    columnLines: true,
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: 'yearid', align: 'center', width: 100, dataIndex: 'YEARID',hidden:true},
        {text: 'ID_GUID', align: 'center', width: 100, dataIndex: 'ID_GUID',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATE',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATENAME'},
        {text: '厂矿', align: 'center', width: 120, dataIndex: 'ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'ZYNAME'},
        {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
        {text: '设备类型名称', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME',hidden:true},
        {text: '年份', align: 'center', width: 70, dataIndex: 'V_YEAR'},
        {text: '计划停机月份', align: 'center', width: 100, dataIndex: 'V_MONTH'},
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'PLANHOUR'},
        {text: '检修类别', align: 'center', width: 100, dataIndex: 'REPAIRTYPENAME'},

        {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERNAME'},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERCODE',hidden:true},
        {
            text: '录入时间',
            align: 'center',
            width: 150,
            dataIndex: 'INDATE',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
        }
    ]
});
Ext.onReady(function(){
   Ext.create('Ext.container.Viewport',{
       id:'main',
       layout:'border',
       items:[npanel,cpanel]
   }) ;
    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.getCmp('ck').on('select',function(){
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
        OnButtonQuery;
    });
    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        OnButtonQuery();
    });
    Ext.getCmp('zyq').on('select',function(){
        OnButtonQuery;
    });

});

//查询
function OnButtonQuery(){

        Ext.data.StoreManager.lookup('gridStore').load({
            params: {
                V_V_ORGCODE:  Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ZY: ''
            }
        });
    _selectNextSprStore();
}

//手工添加
function OnButtonPlanAddClicked(){
   window.open(AppUrl+'page/PM_030212/addYearPlan.html?CK=' + Ext.getCmp("ck").getValue() +
       "&ZYQ=" + Ext.getCmp("zyq").getValue()+'&YEARGUID='+'new', '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no')
}

//模型选择
function OnButtonSelectClicked(){
     window.open(AppUrl + 'page/PM_030212/selModel.html?CK=' + Ext.getCmp("ck").getValue() +
        "&ZYQ=" + Ext.getCmp("zyq").getValue()+'','', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
}

//修改
function OnButtonEditClicked(){
    var record= Ext.getCmp('cpanel').getSelectionModel().getSelection();
    if (record.length != 1) {
        alert("请选择一条数据操作");
        return false;
    }
    if(record[0].get('STATE')!='10'){
        alert('此计划已上报无法修改');
        return false;
    }
    if(record[0].raw.INPERCODE!=Ext.util.Cookies.get('v_personcode')){
        alert("此条数据不是有当前用户录入，无权修改");
        return false;
    }else{
    window.open(AppUrl+'page/PM_030212/addYearPlan.html?CK=' + Ext.getCmp("ck").getValue() +
        "&ZYQ=" + Ext.getCmp("zyq").getValue()+'&YEARGUID='+record[0].get('ID_GUID'), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no')
    }
}
//作废
function OnButtonDelete(){
    var records = Ext.getCmp('cpanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要作废吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'dxfile/PM_PLAN_YEAR_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_GUID: records[i].get('ID_GUID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.RET == 'SUCCESS') {//成功，会传回true
                               alert("作废成功");
                                OnButtonQuery();
                            }
                        }
                    });
                }
            }
        }
    });

}

//上报
function OnButtonUp(){
    var records = Ext.getCmp('cpanel').getSelectionModel().getSelection();
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_SEND',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID: records[i].get('ID_GUID'),
                    V_V_ORGCODE: records[i].get('ORGCODE'),
                    V_V_DEPTCODE: records[i].get('DEPTCODE'),
                    V_V_FLOWCODE: '上报',
                    V_V_PLANTYPE: 'YEAR',
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText).list[0];

                    if (resp.V_INFO == '成功') {
                        Ext.Ajax.request({
                            url: AppUrl + 'Activiti/StratProcess',
                            async: false,
                            method: 'post',
                            params: {
                                parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('ID_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('REPAIRCONTENT'), records[i].get('YEARID'), "请审批！", "YearPlan"],
                                processKey: processKey,
                                businessKey: records[i].get('ID_GUID'),
                                V_STEPCODE: 'Start',
                                V_STEPNAME: V_STEPNAME,
                                V_IDEA: '请审批！',
                                V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                                V_INPER: Ext.util.Cookies.get('v_personcode')
                            },
                            success: function (response) {
                                if (Ext.decode(response.responseText).ret == 'OK') {

                                } else if (Ext.decode(response.responseText).error == 'ERROR') {
                                    Ext.Msg.alert('提示', '该流程发起失败！');
                                }
                            }
                        });
                        i_err++;

                        if (i_err == records.length) {
                            OnButtonQuery();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: resp.V_INFO,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function (btn) {
                                OnButtonQuery();
                            }
                        });
                    }
                },
                failure: function (response) {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: response.responseText,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            OnButtonQuery();
                        }
                    })
                }
            });
    }

}
// 审批人
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'YearPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}


// 导出Excel
function OnButtonExportClicked(){

    document.location.href = AppUrl + 'dxfile/YEAR_EXPORT_EXCEL?V_V_ORGCODE=' + Ext.getCmp('ck').getValue()
        + '&V_V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
        + '&V_V_PERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_V_ZY=' + '0';
}