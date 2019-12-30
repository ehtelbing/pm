var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
//年份
for (var i = thisYear - 4; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
months.push({displayField: '全部', valueField: '%'});
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    //厂矿计划数据加载
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

    var wxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxlxStore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC', 'V_ZYJC', 'V_LX', 'V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //state
    var stateStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'stateStore',
        fields: ['V_STATECODE', 'V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_STATE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 100,
        autoLoad: false,
        fields: ['I_ID','V_GUID','V_GUID_UP','V_YEAR','V_MONTH','V_ORGCODE','V_ORGNAME',
            'V_DEPTCODE','V_DEPTNAME','V_PORJECT_CODE','V_PORJECT_NAME','V_INMAN','V_DEPTNAME','V_SPECIALTY','V_SPECIALTYNAME',
            'V_SPECIALTYMANCODE','V_SPECIALTYMAN','V_WXTYPECODE','V_WXTYPENAME','V_CONTENT','V_MONEYBUDGET',
            'V_REPAIRDEPTCODE','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_INMAN','V_INMANCODE','V_INDATE',
            'V_STATENAME','V_QSTEXT','DEFNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });

    //缺陷明细store
    var qxGridStore=Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'qxGridStore',
        fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
            'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
            'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
            'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG','DEF_SOLVE','BJ_STUFF','PASSNUM','NOPASSNUM'
            ,'DEFILENUM','PASS_STATE','PASS_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'PM_03/PM_03_PROJECT_DEFECT_SEL',
            url: AppUrl + 'dxfile/PM_03_PROJECT_DEFECT_SEL_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        titleAlign: 'center',
        //frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear(),// + 1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        },{
            xtype: 'combo',
            id: 'month',
            fieldLabel: '月份',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 70,
            width: 255,
            displayField: 'displayField',
            valueField: 'valueField',
            value: dt.getMonth()+1,
            store: monthStore,
            queryMode: 'local'
            /*,listeners:{
                select:function(){
                    }
            }*/
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 75,
            width: 250
        },{
            xtype: 'combo',
            id: 'zyq',
            store: zyqStore,
            fieldLabel: '作业区',
            labelAlign: 'right',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 75,
            width: 255,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
             queryMode: 'local'
            /*, listeners: {
                change: function (field, newValue, oldValue) {
                }
            }*/
        },{
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '专 业',
            margin: '5 5 5 5',
            displayField: 'V_ZYMC',
            valueField: 'V_GUID',
            labelWidth: 75,
            labelAlign: 'right'
        },{
          xtype:'combo',
          id:'state',
          store:stateStore,
          editable:false,
          queryMode:'local',
          fieldLabel:'状  态',
            margin:'5 5 5 5',
            displayField: 'V_STATENAME',
            valueField: 'V_STATECODE',
            labelWidth: 75,
            labelAlign: 'right'
        },
            /*{
            xtype: 'label',
            id: "budget",
            style: ' margin: 8px 0px 0px 10px'
        },*/ {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        }, /*{
            xtype: 'button',
            text: '查看甘特图',
            icon: imgpath + '/search.png',
            listeners: {click: OnBtnGauntt}
        },*/ {
            xtype: 'button',
            text: '导出',
            icon: imgpath + '/accordion_collapse.png',
            listeners: {click: OnButtonOut}
        }
        ]
    });
    var panel2 = Ext.create('Ext.Panel', {
        id: 'panel2',
        region: 'north',
        width: '100%',
        titleAlign: 'center',
        //frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:3px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            xtype: 'label',
            id: "budget",
            style: ' margin: 8px 0px 0px 20px'
        }]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '流程详细', width: 150, dataIndex: 'V_GUID', align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
                }},
            {text:'缺陷详情',width:150,dataIndex:'V_GUID',align:'center',renderer:OperaTion},
            {text: '工程状态', width: 150, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft},
            {text: '工程编码', width: 150, dataIndex: 'V_PORJECT_CODE', align: 'center', renderer: atleft},
            {text: '工程名称', width: 150, dataIndex: 'V_PORJECT_NAME', align: 'center', renderer: atleft},
            /* {text: '维修类型', width: 100, dataIndex: 'V_WXTYPENAME', align: 'center', renderer: atleft},*/
            {text: '专业', width: 120, dataIndex: 'V_SPECIALTYNAME', align: 'center', renderer: atleft},
            {text: '工程请示内容', width: 200, dataIndex: 'V_QSTEXT', align: 'center', renderer: atleft},
            {text: '计划作业区', width: 150, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
            {text: '上报人', width: 150, dataIndex: 'V_INMAN', align: 'center', renderer: atleft},
            /*{text: '维修费用', width: 100, dataIndex: 'V_MONEYBUDGET', align: 'center', renderer: atright},*/
            {text: '开工时间', width: 130, dataIndex: 'V_BDATE', align: 'center', renderer: timelfet},
            {text: '竣工时间', width: 130, dataIndex: 'V_EDATE', align: 'center', renderer: timelfet}],
        listeners : {
            itemdblclick : itemClick
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    /*缺陷明细窗口*/
    //缺陷
    var delgrid=Ext.create('Ext.grid.Panel',{
        id:'delgrid',
        region:'center',
        columnLines:true,
        border:false,
        store: qxGridStore,
        autoScroll:true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '附件详情',width: 120, dataIndex: 'V_GUID',align: 'center',renderer:OnLookDefect},
            {text:'解决方案',width:140,dataIndex:'DEF_SOLVE',align:'center',renderer:atleft},
            {text:'备件材料',width:140,dataIndex:'BJ_STUFF',align:'center',renderer:atleft},
            {text: '缺陷code',width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
            {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft,hidden:true},
            {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
            {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}

        ]
        ,
        height:395,
        width: '100%',
        tbar: [
            '缺陷明细'
            ,{ xtype: 'tbfill' }
        ]
    });
    var defDetWin=Ext.create('Ext.window.Window',{
        id:'defDetWin',
        width:560,
        height:450,
        title:'缺陷明细',
        frame:true,
        closeAction:'hide',
        closable:true,
        layout:'border',
        items:[delgrid]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        // items: [panel,panel2, grid]
        items: [panel, grid]
    });

    Ext.getCmp('year').on('select', function () {
        QueryBudget();
        OnButtonQuery();
    });
    Ext.getCmp('month').on('select', function () {
        QueryBudget();
        OnButtonQuery();
    });
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
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


    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

//作业区加载数据
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('zyStore').load();
        QueryBudget();
        OnButtonQuery();
    });
    //作业区改变
    Ext.getCmp('zyq').on('select', function () {
        QueryBudget();
        OnButtonQuery();
    });
    Ext.data.StoreManager.lookup("zyStore").on('load',function(store, records){
        store.insert(0,{V_ZYMC:'全部',V_GUID:'%'});
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup("zyStore").getAt(0));
    });
    Ext.getCmp('zy').on('select',function(){
        QueryBudget();
        OnButtonQuery();
    });
    Ext.data.StoreManager.lookup('stateStore').on('load',function(store,records){
        store.insert(0,{V_STATENAME:'全部',V_STATECODE:'%'});
        Ext.getCmp('state').select(Ext.data.StoreManager.lookup("stateStore").getAt(0));
    });

});

//缺陷详情
function OperaTion(value,metaDate,record,rowIndex,colIndex,store){
    metaDate.style="text-align:center;";
    return '<a href="javascript:_delDetail(\''+value+'\')" >'+record.data.DEFNUM+'</a>';
}

//缺陷详情查找
function _delDetail(wxguid){
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params:{
            V_V_PROJECT_GUID:wxguid
        }
    });
    Ext.getCmp('defDetWin').show();
}

//查看缺陷附件详情
function OnLookDefect(value,metaDate,record){
    metaDate.style="text-align:center;";
    return '<a href="javascript:LookDefect(\''+value+'\')" >'+record.data.DEFILENUM+'</a>';
}

function LookDefect(guid){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight + 100;
    window.open(AppUrl + 'page/DefectPic/index.html?V_V_GUID=' + guid , '', 'height=' + oheight + ',width=' + owidth +
        ',top=10px,left=10px,resizable=yes' );
}

function _preViewProcess(businessKey) {

    var ProcessInstanceId = '';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            businessKey: businessKey
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.msg == 'Ok') {
                ProcessInstanceId = data.InstanceId;
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
    })

    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}

function QueryBudget() {
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_PLAN_BUDGETANDUSE_YEAR_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
                //   Ext.getCmp('panel').setTitle(Ext.getCmp('year').getValue() + '年份' + Ext.getCmp('ck').rawValue + '大修年计划查询');
                Ext.getCmp('panel').setTitle(Ext.getCmp('year').getValue() + '年份外委计划查询');
                Ext.getCmp('budget').setText('年预算费用：' + resp.list[0].V_BUDGET_CK + '万元；已用费用：' + resp.list[0].V_BUDGET_USE
                    + '万元；剩余费用：' + resp.list[0].V_BUDGET_Y + '万元；')
            }
        }
    });
}

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_MONTH = Ext.getCmp('month').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPT = Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_STATE = Ext.getCmp('state').getValue();
    store.proxy.extraParams.V_V_ZY = Ext.getCmp('zy').getValue();
    store.proxy.extraParams.V_V_PERCODE =  Ext.util.Cookies.get('v_personcode');
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function OnButtonQuery() {
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_MONTH: Ext.getCmp('month').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPT: Ext.getCmp('zyq').getValue(),
            V_V_STATE: Ext.getCmp('state').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function OnButtonOut() {
    var V_V_YEAR=Ext.getCmp('year').getValue();
    var V_V_MONTH=Ext.getCmp('month').getValue() == "%" ? "all" : Ext.getCmp('month').getValue();
    var V_V_ORGCODE=Ext.getCmp('ck').getValue() == "%" ? "all" : Ext.getCmp('ck').getValue();
    var V_V_DEPT=Ext.getCmp('zyq').getValue() == "%" ? "all" : Ext.getCmp('zyq').getValue();
    var V_V_STATE=Ext.getCmp('state').getValue() == "%" ? "all" : Ext.getCmp('state').getValue();
    var V_V_ZY=Ext.getCmp('zy').getValue() == "%" ? "all" : Ext.getCmp('zy').getValue();
    var V_V_PERCODE=Ext.util.Cookies.get('v_personcode');
    document.location.href = AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_Excel?V_V_YEAR='+ V_V_YEAR
        + '&V_V_MONTH=' + V_V_MONTH + '&V_V_ORGCODE=' +V_V_ORGCODE + '&V_V_DEPT=' +V_V_DEPT
        + '&V_V_STATE=' + V_V_STATE + '&V_V_ZY=' + V_V_ZY+ '&V_V_PERCODE=' + V_V_PERCODE;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:right;";
    //return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
//维修工单详情
function itemClick(s, record, item, index, e, eOpts) {

    if(record.data.V_GUID!=null&&record.data.V_GUID!=undefined){
        var wxguid=record.data.V_GUID;
        var owidth = window.screen.availWidth;
        var oheight = window.screen.availHeight - 50;
        var ret = window.open(AppUrl + 'page/PM_030201/wxDetail.html?V_GUID='
            + wxguid
            +  '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
    }
}
