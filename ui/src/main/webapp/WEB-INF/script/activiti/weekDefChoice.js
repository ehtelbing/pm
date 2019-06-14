var WeekYear="";
var WeekMonth="";
var V_V_ORGCODE="";
var V_V_DEPTCODE="";
var V_V_EQUTYPE="";
var V_V_EQUCODE="";
var V_V_ZY="";
var WEEK="";
var MCK="";
var WEEKGUID="";
var startUpTime="";
var endUpTime="";
var MGUID="";
var MEQUCODE="";
var MONUPDATE="";
var CLEARDATE="";
if(location.href.split('?')[1]!=undefined){
    V_WEEKPLAN_GUID=Ext.urlDecode(location.href.split("?")[1]).V_WEEKPLAN_GUID;
    WeekYear=Ext.urlDecode(location.href.split("?")[1]).Oyear;
    WeekMonth=Ext.urlDecode(location.href.split("?")[1]).Omonth;
    V_V_ORGCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_ORGCODE;
    V_V_DEPTCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_DEPTCODE;
    V_V_EQUTYPE=Ext.urlDecode(location.href.split("?")[1]).V_V_EQUTYPE=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_EQUTYPE;
    V_V_EQUCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_EQUCODE=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_EQUCODE;
    V_V_ZY=Ext.urlDecode(location.href.split("?")[1]).V_V_ZY=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_ZY;
    // WEEK=Ext.urlDecode(location.href.split("?")[1]).WEEK;
    // startUpTime=Ext.urlDecode(location.href.split("?")[1]).startUpTime;
    // endUpTime=Ext.urlDecode(location.href.split("?")[1]).endUpTime;
}
//年份
var date=new Date();
var yearList=[];
var selesign="";
for(var i=date.getFullYear();i<date.getFullYear()+1;i++){
    yearList.push({displayField: i, valueField: i})
}yearList.push({displayField: '全部', valueField: '%'});
var myearStore=Ext.create('Ext.data.Store',{
    id:'myearStore',
    fields: ['displayField', 'valueField'],
    data:yearList,
    proxy:{
        type:'memory',
        reader:{
            type:'json'
        }
    }
});
//月份
var monthList=[];
for(var i=1;i<=12;i++){
    monthList.push({displayField: i, valueField: i});
}
monthList.push({displayField: '全部', valueField: '%'});
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: monthList,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
Ext.onReady(function(){
    //月计划gridStore
    var mgridStore = Ext.create('Ext.data.Store', {
        id : 'mgridStore',
        pageSize : 15,
        autoLoad : false,
        fields :['I_ID', 'V_GUID', 'V_YEAR', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE',
            'V_EQUNAME', 'V_REPAIRMAJOR_CODE', 'V_CONTENT', 'V_STARTTIME', 'V_ENDTIME',
            'V_HOUR', 'V_REPAIRDEPT_CODE', 'V_REPAIRDEPT_NAME', 'V_INDATE',
            'V_INPER', 'INPERNAME', 'V_FLOWCODE', 'V_FLOWORDER', 'V_FLOWTYPE',
            'V_JHMX_GUID', 'V_BZ'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'dxfile/PM_03_PLAN_SEL_TOWEEK',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });
    //缺陷类型
    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sqxzt',
        fields: ['I_ID',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCETABLE',
            'V_SOURCEREMARK',
            'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('qxzt').select('defct01');
                otherdefsel();
            }
        }
    });
    //月计划缺陷 关联表 PM_DEFECTTOWORKORDER
    var mfromdefStore= Ext.create('Ext.data.Store', {
        id: 'mfromdefStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SEL_RE_MONTH2',
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
    //月计划缺陷 关联表 YEAR_TO_MONTH
    var mdefStore= Ext.create('Ext.data.Store', {
        id: 'mdefStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SEL_RE_MONTH',
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
    //其他缺陷查询
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SELECT',
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
    //周计划已关联缺陷
    var hChoGridStore= Ext.create('Ext.data.Store', {
        id: 'hChoGridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_DEFECTTOWEEK_SEL',
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
    //月计划关联缺陷gird+tool

    //月计划缺陷表格tool
    var mdtoolPanel=Ext.create('Ext.panel.Panel',{
        id:'mdtoolPanel',
        layout:'column',
        region:'north',
        frame:true,
        border:false,
        height:'18%',
        autoScroll:true,
        defaults:{
            labelAlign:'right',
            margin:'5 5 5 10'
        },
        items:[
            // {
            //     id: 'qxzt',
            //     xtype: 'combo',
            //     store: sqxzt,
            //     editable: false,
            //     fieldLabel: '缺陷类型',
            //     labelWidth:70,
            //     width: 180,
            //     displayField: 'V_SOURCENAME',
            //     valueField: 'V_SOURCECODE',
            //     queryMode: 'local',
            //     baseCls: 'margin-bottom'
            // },{
            //     xtype : 'button',
            //     text : '查询',
            //     handler : _selectOverhaulApply
            // },
            {
                xtype: 'button',
                text: '选择',
                handler : AddmDef
            }
        ]
    });
    //月计划关联缺陷grid
    var mdGridPanel = Ext.create('Ext.grid.Panel', {
        id : 'mdGridPanel',
        // store : mgridStore,
        region:'center',
        split: true,
        border: true,
        columnLines: true,
        autoScroll:true,
        selType: 'checkboxmodel',
        columns : [ {
            text : '序号',
            xtype : 'rownumberer',
            width : 50,
            sortable : false
        },
            {text : '单位',dataIndex : 'V_DEPTNAME',align : 'center',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷状态',dataIndex : 'V_STATENAME',align : 'center',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷类型',dataIndex : 'V_SOURCENAME',align : 'center',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷日期',dataIndex : 'D_DEFECTDATE',align : 'center',width : 200,renderer : CreateGridColumnTime},
            {text : '缺陷明细',dataIndex : 'V_DEFECTLIST',align : 'center',width : 700,renderer : CreateGridColumnTd},
            {text : '设备',dataIndex : 'V_EQUNAME',align : 'center',width : 200,renderer : CreateGridColumnTd},
            {text : '设备位置',dataIndex : 'V_EQUSITE',align : 'center',width : 300,renderer : CreateGridColumnTd},
            {text : '负责人',dataIndex : 'V_PERNAME',align : 'center',width : 100,renderer : CreateGridColumnTd},
            {text : '处理意见',dataIndex : 'V_IDEA',align : 'center',renderer : CreateGridColumnTd}
        ]
        // ,listeners : {
        //     itemclick: AddmDef //itemdblclick
        // }
    });

    //月计划缺陷查询模版
    var mfGridPanel=Ext.create('Ext.panel.Panel',{
        id:'mfGridPanel',
        layout:'border',
        region:'center',
        width:'45%',
        split: true,
        frame:true,
        border:false,
        title:'月计划关联的缺陷',
        // items:[mdGridPanel]
        items:[mdtoolPanel,mdGridPanel]
    });

    //月计划grid_tool
    var toolPanel=Ext.create("Ext.panel.Panel",{
        id:'toolPanel' ,
        layout:'column',
        frame:true,
        region:'north',
        border:false,
        height:'18%',
        autoScroll:true,
        items:[
            {xtype:'combobox',id: 'mnf',allowBlank: false,fieldLabel: '年份',store: myearStore,displayField: 'displayField',valueField: 'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype:'combobox',id: 'myf',allowBlank: false,fieldLabel: '月份',store: monthStore,displayField: 'displayField',valueField: 'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype: 'textfield',id:'jhmc',fieldLabel: '计划名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:205,value:''},
            {xtype: 'button', id:'monthsel',text: '查询', margin: '10 0 5 10',icon:imgpath + '/search.png',handler:query}
            // ,{xtype: 'button', text: '其他缺陷选择', margin: '10 0 5 10',icon: imgpath +'/add.png', handler:OtherDefselect}
        ]
    });
    var mGridPanel = Ext.create('Ext.grid.Panel', {
        id:'mGridPanel',
        region: 'center',
        border: false,
        store:mgridStore,
        autoScroll:true,
        selType:'checkboxmodel',
        columns:[
            {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
            {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
            {text: '车间名称', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
            {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
            {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
            {text: '检修内容', align: 'center', width: 100, dataIndex: 'V_CONTENT'},
            {text: '计划停机日期', align: 'center', width: 100, dataIndex: 'V_STARTTIME',
                renderer: rendererTime},
            {text: '计划竣工日期', align: 'center', width: 100, dataIndex: 'V_ENDTIME',
                renderer: rendererTime},
            {text: '计划工期（小时）', align: 'center', width: 100, dataIndex: 'V_HOUR'}
        ],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                defPanelLoad(record.data.V_GUID);
                MGUID=record.data.V_GUID;
                MCK=record.data.V_ORGCODE;
                MEQUCODE=record.data.V_EQUCODE;
            }
        }
        ,
        bbar:["->",
            {
                id:'page',
                xtype: 'pagingtoolbar',
                store:mgridStore,
                width:'100%',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }
        ]
    });

    //月查找模块
    var monthPanel=Ext.create('Ext.panel.Panel',{
        id:'monthPanel',
        layout:'border',
        region:'west',
        frame:true,
        split: true,
        width:'65%',
        border:false,
        title:'月计划审批完成查找',
        items:[toolPanel,mGridPanel]
    });
    //上模块
    var topPanel=Ext.create('Ext.panel.Panel',{
        id:'topPanel',
        layout:'border',
        region:'north',
        frame:true,
        split: true,
        height:'45%',
        border:false,
        collapsible: true,
        items:[monthPanel,mfGridPanel]
    });
    //其他缺陷模块
    var otherDeftool=Ext.create('Ext.panel.Panel',{
        id:'otherDeftool',
        layout:'column',
        region:'north',
        frame:true,
        border:false,
        height:'10%',
        autoScroll:true,
        defaults:{
            labelAlign:'right',
            margin:'5 5 5 10'
        },
        items:[
            {
                id: 'qxzt',
                xtype: 'combo',
                store: sqxzt,
                editable: false,
                fieldLabel: '缺陷类型',
                labelWidth:70,
                width: 180,
                displayField: 'V_SOURCENAME',
                valueField: 'V_SOURCECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },{
                xtype : 'button',
                id:'otherdefsel',
                text : '查询',
                handler :otherdefsel// _selectOverhaulApply
            }
            ,{
                xtype : 'button',
                id:'addotherdef',
                text : '缺陷添加',
                handler :Select// _selectOverhaulApply
            }
        ]
    });
    var dGridPanel = Ext.create('Ext.grid.Panel', {
        id : 'dGridPanel',
        store : gridStore,
        region:'center',
        border: true,
        columnLines: true,
        autoScroll:true,
        selType: 'checkboxmodel',
        columns : [
            {text : '序号',xtype : 'rownumberer',width : 50,sortable : false}
            , {text : '单位',dataIndex : 'V_DEPTNAME',align : 'center',width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷状态', dataIndex : 'V_STATENAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷类型', dataIndex : 'V_SOURCENAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷日期', dataIndex : 'D_DEFECTDATE', align : 'center', width : 200, renderer : CreateGridColumnTime
            }, {text : '缺陷明细', dataIndex : 'V_DEFECTLIST', align : 'center', width : 700, renderer : CreateGridColumnTd
            }, {text : '设备', dataIndex : 'V_EQUNAME', align : 'center', width : 200, renderer : CreateGridColumnTd
            }, {text : '设备位置', dataIndex : 'V_EQUSITE', align : 'center', width : 300, renderer : CreateGridColumnTd
            }, {text : '负责人', dataIndex : 'V_PERNAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '处理意见', dataIndex : 'V_IDEA', align : 'center', renderer : CreateGridColumnTd
            }],
        listeners : {
            itemdblclick :tbitemclick
            // ,itemclick: Select
        }
    });
    var otherDefPanel=Ext.create('Ext.panel.Panel',{
        id:'otherDefPanel',
        layout:'border',
        region:'west',
        split: true,
        width:'55%',
        frame:true,
        border:false,
        title:'其他缺陷查找',
        items:[otherDeftool,dGridPanel]
    });
    var hChoGrid= Ext.create('Ext.grid.Panel', {
        id : 'hChoGrid',
        store : hChoGridStore,
        region:'center',
        border: true,
        columnLines: true,
        autoScroll:true,
        // selType: 'checkboxmodel',
        columns : [
            {text : '序号',xtype : 'rownumberer',width : 50,sortable : false}
            ,{text : '删除',dataIndex : 'V_GUID',align : 'center',width : 100, renderer : delCorDef}
            , {text : '单位',dataIndex : 'V_DEPTNAME',align : 'center',width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷状态', dataIndex : 'V_STATENAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷类型', dataIndex : 'V_SOURCENAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '缺陷日期', dataIndex : 'D_DEFECTDATE', align : 'center', width : 200, renderer : CreateGridColumnTime
            }, {text : '缺陷明细', dataIndex : 'V_DEFECTLIST', align : 'center', width : 700, renderer : CreateGridColumnTd
            }, {text : '设备', dataIndex : 'V_EQUNAME', align : 'center', width : 200, renderer : CreateGridColumnTd
            }, {text : '设备位置', dataIndex : 'V_EQUSITE', align : 'center', width : 300, renderer : CreateGridColumnTd
            }, {text : '负责人', dataIndex : 'V_PERNAME', align : 'center', width : 100, renderer : CreateGridColumnTd
            }, {text : '处理意见', dataIndex : 'V_IDEA', align : 'center', renderer : CreateGridColumnTd
            }]
        // ,listeners : {
        //     itemdblclick : itemclick
        // }
        ,tbar:[
            {
                xtype:'button',
                text:'确定选择',
                handler:turnPage
            }
        ]

    });
    //已选择模块
    var haveChoDef=Ext.create('Ext.panel.Panel',{
        id:'haveChoDef',
        layout:'border',
        region:'center',
        split: true,
        width:'45%',
        frame:true,
        border:false,
        title:'已选择缺陷',
        items:[hChoGrid]
    });
    //下模块
    var downPanel=Ext.create('Ext.panel.Panel',{
        id:'downPanel',
        layout:'border',
        region:'center',
        height:'55%',
        split: true,
        frame:true,
        border:false,
        collapsible: true,
        items:[otherDefPanel,haveChoDef]
    });
    //main
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[topPanel,downPanel]
    });
    loadStore();
    query();
    haveChLoad(V_WEEKPLAN_GUID);
    // createWGuid(org_code);
});
function loadStore(){
    Ext.getCmp("mnf").select(WeekYear);
    Ext.getCmp("myf").select(WeekMonth);
}
function rendererTime(value, metaData){
    return value.split(".")[0];
}
function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    var time=value.split('.')[0];
    return time;
}


function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}
//月计划查找
function query() {
    Ext.data.StoreManager.lookup("mgridStore").currentPage=1;
    Ext.data.StoreManager.lookup('mgridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('mnf').getValue(),//V_V_YEAR,
            V_V_QUARTER: '%',
            V_V_MONTH:Ext.getCmp('myf').getValue(),//'%',
            V_V_PLANTYPE: 'MONTH',
            V_V_ORGCODE: V_V_ORGCODE,

            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_EQUTYPE: V_V_EQUTYPE,
            V_V_EQUCODE: V_V_EQUCODE,
            V_V_ZY: V_V_ZY,
            V_V_CONTENT: '',//V_V_JXNR,
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: 1,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}
//周计划guid创建或查找
function createWGuid(org){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_03_PLAN_WEEK_CREATE',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHGUID: MGUID,
            V_V_DEFECTGUID:'',
            V_V_ORGCODE:org,
            V_V_PERCODE:Ext.util.Cookies.get("v_personcode")
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET != ""||data.RET!=undefined) {
                WEEKGUID=data.RET;
                // clear_def_old(WEEKGUID,org);
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
//原有未保存的缺陷清除
function clear_def_old(WEEK_GUID,org_code){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_DEFECTTOWEEK_DELALL_OLD',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHGUID: MGUID,
            V_V_WEEKGUID:WEEK_GUID,
            V_INPER:Ext.util.Cookies.get("v_personcode"),
            V_DEFECTSTATE:""
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET='SUCCESS') {
                CLEARDATE='SUCCESS';
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
// 月计划表格点击事件
function defPanelLoad(monthGuid){
    selesign=0;
    //缺陷查找下拉条件加载
    Ext.data.StoreManager.lookup("sqxzt").load();
    //月计划关联缺陷查找
    defsel(monthGuid);
    if(Ext.data.StoreManager.lookup('mdefStore').data.length==0){ //关联表 YEAR_TO_MONTH
        mfromDefSel(monthGuid);
        Ext.getCmp('mdGridPanel').reconfigure(Ext.data.StoreManager.lookup('mfromdefStore')); //PM_DEFECTTOWORKORDER
        var  chgrid=Ext.getCmp('mdGridPanel');
        chgrid.store.reload();
        Ext.getCmp('mdGridPanel').getView().refresh();
    }else{
        Ext.getCmp('mdGridPanel').reconfigure(Ext.data.StoreManager.lookup('mdefStore'));
        var  chgrid=Ext.getCmp('mdGridPanel');
        chgrid.store.reload();
        Ext.getCmp('mdGridPanel').getView().refresh();
    }
}
//月计划下缺陷来源缺陷添加的缺陷查找
function mfromDefSel(mguid){
    var MfdefStore=Ext.data.StoreManager.lookup('mfromdefStore'); //PM_DEFECTTOWORKORDER
    MfdefStore.proxy.extraParams = {
        V_MONTHGUID:mguid
    };
    MfdefStore.load();
}
//月计划缺陷查找
function defsel(monthGuid){ //关联表 YEAR_TO_MONTH
    var MdefStore=Ext.data.StoreManager.lookup('mdefStore');
    MdefStore.proxy.extraParams = {
        V_MONTHGUID:monthGuid,
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: '',
        V_V_PAGESIZE: ''
    };
    MdefStore.load();
}
//缺陷选择
function Select(){
    var org=MCK==""?Ext.util.Cookies.get("v_orgCode"):MCK;
    if(MGUID==""){
        Ext.Msg.show({
            title: '提示',
            msg: '并未关联月计划，是否关联?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
            fn: function (button) {
                if (button == "ok") {
                    return false;
                }
                else{
                    newCreatWeek(org);
                }

            }
        });
    }
    else{
        weekReMonth();
        if (MONUPDATE == 'SUCCESS') {
            newCreatWeek(org);
        }
    }

}
function newCreatWeek(org){

    if(V_WEEKPLAN_GUID!=""){
        // if (CLEARDATE == 'SUCCESS') {
        var defrecord = Ext.getCmp("dGridPanel").getSelectionModel().getSelection();
        if (defrecord.length == 0) {
            alert('请选择至少一条缺陷记录');
            return false;
        }
        for (var i = 0; i < defrecord.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_DEFECTTOWEEK_IN',
                type: 'ajax',
                method: 'POST',
                async: false,
                params: {
                    V_V_MONTHGUID: MGUID,
                    V_V_WEEKGUID: V_WEEKPLAN_GUID,
                    V_N_DEFECTGUID: defrecord[i].data.V_GUID,
                    V_INPER: Ext.util.Cookies.get("v_personcode"),
                    V_DEFECTSTATE: defrecord[i].data.V_STATECODE
                },
                success: function (resp) {
                    var data = Ext.decode(resp.responseText);//后台返回的值
                    if (data.RET == 'SUCCESS') {
                        haveChLoad(V_WEEKPLAN_GUID);
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
        // }
    }
}

//月计划缺陷添加
function AddmDef(){
    var org=MCK==""?Ext.util.Cookies.get("v_orgCode"):MCK;
    if(MGUID==""){
        Ext.Msg.show({
            title: '提示',
            msg: '并未关联月计划，是否关联?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
            fn: function (button) {
                if (button == "ok") {
                    return false;
                }
                else{
                    newCreatWeek2(org);
                }
            }
        });
    }
    else{
        weekReMonth();
        if (MONUPDATE == 'SUCCESS') {
            newCreatWeek2(org);
        }
    }
}
function newCreatWeek2(org){

    if (V_WEEKPLAN_GUID != "") {
        // if (CLEARDATE == 'SUCCESS') {

        var defrecord = Ext.getCmp("mdGridPanel").getSelectionModel().getSelection();
        if (defrecord.length == 0) {
            alert('请选择至少一条缺陷记录');
            return false;
        }
        for (var i = 0; i < defrecord.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_DEFECTTOWEEK_IN',
                type: 'ajax',
                method: 'POST',
                async: false,
                params: {
                    V_V_MONTHGUID: MGUID,
                    V_V_WEEKGUID: V_WEEKPLAN_GUID,
                    V_N_DEFECTGUID: defrecord[i].data.V_GUID,
                    V_INPER: Ext.util.Cookies.get("v_personcode"),
                    V_DEFECTSTATE: defrecord[i].data.V_STATECODE
                },
                success: function (resp) {
                    var data = Ext.decode(resp.responseText);//后台返回的值
                    if (data.RET == 'SUCCESS') {
                        haveChLoad(V_WEEKPLAN_GUID);
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
        // }
    }
}
function weekReMonth(){
    //周计划关联月计划修改
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_03_PLAN_WEEK_UPDATE',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHGUID: MGUID,
            V_V_DEFECTGUID:'',
            V_WEEKGUID:V_WEEKPLAN_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET ='SUCCESS') {
                MONUPDATE='SUCCESS';
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

function _selectOverhaulApply(){
    if(selesign==0){
        defsel();
    }
    else{
        if(MGUID=="") {
            otherdefsel();//mdefsel();
        }
        else{
            mEDefSel();
        }
    }
}
//其他缺陷查找
function otherdefsel(){  //mdefsel(){
    var agridStore =Ext.data.StoreManager.lookup('gridStore');
    agridStore.proxy.extraParams = {
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: '',//Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: ''//Ext.getCmp('page').store.pageSize
    };
    agridStore.load();
}
// 其他缺陷月计划设备下
function mEDefSel(){

    var egridStore =Ext.data.StoreManager.lookup('mEgridStore');
    egridStore.proxy.extraParams = {
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_EQUCODE:MEQUCODE,
        V_V_PAGE: '',//Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE:''//Ext.getCmp('page').store.pageSize
    };
    egridStore.load();
}
function itemclick(s, record, item, index, e, eOpts) {

}
function tbitemclick(s, record, item, index, e, eOpts) {

    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index1.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}
function retClose(){
    window.close;
    window.opener.query();
    this.window.close()
}

function haveChLoad(WGUID){

    var wStore=Ext.data.StoreManager.lookup('hChoGridStore');
    wStore.proxy.extraParams = {
        V_WEEKGUID:WGUID
    };
    wStore.load();
}
function delCorDef(value, metaDate, record, rowIndex, colIndex, store) {

    var id = 'ddef' + value;
    Ext.defer(function () {
        Ext.widget('button', {
            icon: dxImgPath + '/accept.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 110,
            text: '删除',
            margin: 'padding:10px 50px 10px 10px;',
            handler: function () {
                // onJjfa(record.data.V_GUID, record.data.V_EQUCODE);
                delCorDefect(value);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
}

function delCorDefect(defGuid){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_DEFECTTOWEEK_DEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_WEEKGUID:V_WEEKPLAN_GUID,
            DEF_GUID: defGuid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET =='SUCCESS') {
                haveChLoad(V_WEEKPLAN_GUID);
                // turnPage();
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
function turnPage(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_PM_03_PLAN_WEEK_MAINDEF_UPDATE',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            WEEK_GUID:V_WEEKPLAN_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET =='SUCCESS') {
                window.opener.getNewDefDate(V_WEEKPLAN_GUID);
                window.close();
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