

var yguidList=[];
var proGuid="";
//厂矿
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
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('ck').select(store.first());
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
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('zyq').select(store.first());
        }
    }
});

//专业加载
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
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
    },
    listeners: {
        load: function (store, records) {
            store.insert(0,{V_GUID:'%',V_ZYMC:'全部'});
            Ext.getCmp('zy').select(store.first());
            queryGrid();
        }
    }
});
var prozyStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'prozyStore',
    fields: ['V_GUID', 'V_ZYMC','V_ZYJC','V_LX','V_ORDER'],
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
    },
    listeners:{
        load:function(store,records){
            store.insert(0,{V_ZYMC:'全部',V_GUID:'%'});
            Ext.getCmp('prozy').select(store.first());

        }
    }
});
var gridStore=Ext.create('Ext.data.Store',{
    id:'gridStore',
    autoLoad: false,
    fields: ['ID_GUID', 'ORGCODE','ORGNAME','DEPTCODE','DEPTNAME','ZYCODE','ZYNAME','EQUCODE','V_EQUNAME','EQUTYPE','',
        'V_EQUTYPENAME','REPAIRCONTENT','PLANHOUR','REPAIRTYPE','REPAIRTYPENAME','INPERCODE','INPERNAME','INDATE',
        'STATE','V_BASENAME','REMARK','V_FLOWCODE','V_FLOWTYPE','MXCODE','PLANTYPE','V_YEAR', 'V_MONTH',
        'PLANTJMONTH','PLANJGMONTH','WXTYPECODE','WXTYPENAME','PTYPECODE','PTYPENAME','PLANDAY','REDEPTCODE','REDEPTNAME',
        'FZPERCODE','FZPERNAME','SGTYPECODE','SGTYPENAME','SCLBCODE','SCLBNAME','PRO_NAME','YEARID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_SEL_FX',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var proStore=Ext.create('Ext.data.Store',{
    id:'proStore',
    autoLoad:false,
    fields:['ID','V_GUID','V_GUID_UP','V_YEAR','V_MONTH','V_ORGCODE','V_ORGNAME',
        'V_DEPTCODE','V_DEPTNAME','V_PORJECT_CODE','V_PORJECT_NAME','V_WBS','V_WBS_TXT',
        'V_SPECIALTY','V_SPECIALTYNAME','V_SPECIALTY_ZX','V_SPECIALTY_ZXNAME','V_SPECIALTYMANCODE','V_SPECIALTYMAN',
        'V_WXTYPECODE','V_WXTYPENAME','V_JHLB','V_SCLB','V_CPZL','V_CPGX','V_SGFS','V_ZBFS','V_SZ','V_SFXJ',
        'V_CONTENT','V_MONEYBUDGET','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_LEVEL','V_INMANCODE','V_INDATE','V_SUMTIME',
        'V_SUMDATE','V_MONEY','V_TYPE','V_SGMONEY','V_BJMONEY','V_CLMONEY'
    ],
    proxy:{
        type:'ajax',
        async:false,
        url:AppUrl+'dxfile/PRO_PM_03_PLAN_PROJECT_BYFX',
        actionMethods:{
            read:'POST'
        },
        reader:{
            type:'json',
            root:'list'
        }
    }

});
var northpanel=Ext.create('Ext.panel.Panel',{
    id:'northpanel',
    layout:'column',
    height:45,
    frame:true,
    border:false,
    region:'north',
    items:[
        {xtype:'combobox',id:'ck',store: ckStore,fieldLabel: '厂矿',editable: false,labelWidth: 80,
            displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',queryMode: 'local',style: ' margin: 10px 0px 0px 10px',
            labelAlign: 'right',width: 250},
        {xtype:'combobox',id:'zyq', store: zyqStore,editable: false,queryMode: 'local',fieldLabel: '作业区',labelAlign: 'right',
            displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',labelWidth: 80,width: 250,style: ' margin: 10px 0px 0px 10px'},
        {xtype:'combobox',id: 'zy',labelAlign: 'right',width: 250,labelWidth: 80, allowBlank: false, store: zyStore, editable: false,
            queryMode: 'local', fieldLabel: '专业', displayField: 'V_ZYMC',style: ' margin: 10px 0px 0px 10px',
            valueField: 'V_GUID'
        },{
            id: 'begintime',
            xtype: 'datefield',
            fieldLabel: '申请日期',
            format: 'Y/m',
            editable: false,
            labelWidth: 55,
            queryMode: 'local',
            value: new Date(),
             style: ' margin: 10px 0px 0px 10px',
            labelAlign: 'right',
            width: 180
        },{
            id: 'endtime',
            xtype: 'datefield',
            fieldLabel: '至',
            format: 'Y/m',
            editable: false,
            labelWidth: 55,
            queryMode: 'local',
            value: new Date(),
            //baseCls: 'margin-bottom',
            style: ' margin: 10px 0px 0px 10px',
            labelAlign: 'right',
            width: 180
        },{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid,
            style: 'margin: 12px 0px 0px 10px'
        },{
            xtype: 'button',
            text: '关联放行计划',
            icon: imgpath + '/accordion_collapse.png',
            handler: _fangxingjihua,
            style: 'margin: 12px 0px 0px 10px'
        }
        // ,{
        //     xtype: 'button',
        //     text: '导出excel',
        //     icon: imgpath + '/excel.gif',
        //     width: 100,
        //     style: 'margin: 12px 0px 0px 10px',
        //     listeners: {
        //         click: ExcelButton
        //     }
        // }


    ]
});
var centerpanel=Ext.create('Ext.grid.Panel',{
    id:'centerpanel',
    layout:'column',
    region:'center',
    columnLines:true,
    selType: 'checkboxmodel',
    autoScroll:true,
    store:gridStore,
    columns:[
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: 'yearid', align: 'center', width: 100, dataIndex: 'YEARID',hidden:true},
        {text: 'ID_GUID', align: 'center', width: 100, dataIndex: 'ID_GUID',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATE',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_BASENAME'},
        {text: '项目名称', align: 'center', width: 100, dataIndex:'PRO_NAME'},
        {text: '年份', align: 'center', width: 70, dataIndex: 'V_YEAR'},
        {text: '计划停机月份', align: 'center', width: 100, dataIndex: 'V_MONTH'},
        // {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATENAME'},
        {text: '厂矿', align: 'center', width: 120, dataIndex: 'ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'ZYNAME'},
        {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
        {text: '设备类型名称', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME',hidden:true},
        {text:'检修内容',align:'center',width:150,dataIndex:'REPAIRCONTENT'},

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
    init();
    Ext.create('Ext.container.Viewport',{
       id:'main',
        layout:'border',
        items:[northpanel,centerpanel]
    });

    var proPanel=Ext.create('Ext.panel.Panel',{
        id:'proPanel',
        region:'north',
        layout:'column',
        height:37,
        frame:true,
        border:false,
        defaults:{
          // style:'margin:5px 5px 5px 5px',
            labelAlign:'right'
        },
        items:[
            {xtype:'textfield',id:'proname',text:'工程名',width:180,labelWidth:60,labelAlign:'right',value:'',emptyValue:'工程名称',style:'margin:5px 5px 5px 15px',},
            {xtype: 'combo',
                id: "prozy",
                store: prozyStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '专业',
                displayField: 'V_ZYMC',
                valueField: 'V_GUID',
                labelWidth: 80,
                width: 250},
            {xtype:'button',id:'proQuery',text:'查询',icon:imgpath + '/search.png',width:80,style:'margin:5px 5px 5px 5px',handler:selProGrid}
        ]
    });
    var proGrid=Ext.create('Ext.grid.Panel',{
        id:'proGrid',
        layout:'column',
        columnLines:true,
        store:proStore,
        autoScroll:true,
        selModel : {
            selType : 'rowmodel',
            mode : 'SINGLE'
        },
        columns:[
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            // {text: '工程状态', width: 140, dataIndex: 'V_STATENAME', align: 'center',renderer:atleft},
            {text: '工程编码', width: 200, dataIndex: 'V_GUID', align: 'center',renderer:atleft,hidden:true},
            {text: '工程编码', width: 200, dataIndex: 'V_PORJECT_CODE', align: 'center',renderer:atleft},
            {text: '工程名称', width: 200, dataIndex: 'V_PORJECT_NAME', align: 'center',renderer:atleft},
            {text: '维修类型', width: 100, dataIndex: 'V_WXTYPENAME', align: 'center',renderer:atleft},
            {text: '专业', width: 100, dataIndex: 'V_SPECIALTYNAME', align: 'center',renderer:atleft},
            {text: '维修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center',renderer:atleft},
            {text: '维修费用（万元）', width: 120, dataIndex: 'V_MONEYBUDGET', align: 'center',renderer:atleft},
            {text: '开工时间', width: 140, dataIndex: 'V_BDATE', align: 'center',renderer:timelfet},
            {text: '竣工时间', width: 140, dataIndex: 'V_EDATE', align: 'center',renderer:timelfet}
        ]
        ,listeners:{
            itemdblclick:function(view, record, item){
                proGuid= record.data.V_GUID;
                inRelevance();
                Ext.getCmp('proWin').close();
            }
    }
    });
    var proWin=Ext.create('Ext.window.Window',{
        id:'proWin',
        closeAction:'hide',
        width:750,
        height:450,
        autoScroll:true,
        items:[proPanel,proGrid]
    })

});

function init(){
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
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:right;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}
//查询
function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_SDATE: Ext.getCmp('begintime').getSubmitValue(),
            V_EDATE: Ext.getCmp('endtime').getSubmitValue()
        }
    });
}

//关联放行计划
function _fangxingjihua(){
    var recode=Ext.getCmp('centerpanel').getSelectionModel().getSelection();
    if(recode.length<=0){
        return alert('请至少选择一条数据');
    }

    for(var i=0;i<recode.length;i++){
        yguidList.push(recode[i].data.ID_GUID);
    }
    Ext.getCmp('proWin').show();
    Ext.data.StoreManager.lookup('prozyStore').load();
    Ext.data.StoreManager.lookup('proStore').load({
        params:{
            V_PRONAME:Ext.getCmp('proname').getValue(),
            V_ZY:Ext.getCmp('prozy').getValue(),
            V_V_YEAR:''//Ext.getCmp('proname').getValue()
        }
    });

}
//弹出窗口大修查询
function selProGrid(){
    Ext.data.StoreManager.lookup('proStore').load({
        params:{
            V_PRONAME:Ext.getCmp('proname').getValue(),
            V_ZY:Ext.getCmp('prozy').getValue(),
            V_V_YEAR:''//Ext.getCmp('proname').getValue()
        }
    });
}
//写入关联表
function inRelevance(){
    var ylog=yguidList.length;
    for(var j=0;j<ylog;j++){
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/YEAR_TO_PROGUID_FX_INSERT',
            method: 'POST',
            async: false,
            params: {
                V_YEARGUID: yguidList[j],
                V_PROGUID: proGuid,
                V_INPERCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (ret) {
                var resp = Ext.decode(ret.responseText);
                if (resp.ret == 'SUCCESS') {
                    alert("保存成功");
                } else if(resp.ret=="HAVE DATA"){
                    alert("已有关联数据");
                }else{
                    alert("保存失败");
                }
            }
        });
    }
}
//导出excel表格
function ExcelButton(){

}