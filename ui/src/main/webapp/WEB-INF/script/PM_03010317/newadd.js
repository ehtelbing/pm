
/**
 * create by hrb 2019/6/24
 */
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
var retEquDif;
/*新版的从月计划添加周计划*/
if(location.href.split('?')[1]!=undefined){
    WeekYear=Ext.urlDecode(location.href.split("?")[1]).Oyear;
    WeekMonth=Ext.urlDecode(location.href.split("?")[1]).Omonth;
    V_V_ORGCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_ORGCODE;
    V_V_DEPTCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_DEPTCODE;
    V_V_EQUTYPE=Ext.urlDecode(location.href.split("?")[1]).V_V_EQUTYPE=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_EQUTYPE;
    V_V_EQUCODE=Ext.urlDecode(location.href.split("?")[1]).V_V_EQUCODE=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_EQUCODE;
    V_V_ZY=Ext.urlDecode(location.href.split("?")[1]).V_V_ZY=="0"?'%':Ext.urlDecode(location.href.split("?")[1]).V_V_ZY;
    WEEK=Ext.urlDecode(location.href.split("?")[1]).WEEK;
    startUpTime=Ext.urlDecode(location.href.split("?")[1]).startUpTime;
    endUpTime=Ext.urlDecode(location.href.split("?")[1]).endUpTime;
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
    Ext.QuickTips.init();
    //store
    //月计划gridStore
    var mgridStore = Ext.create('Ext.data.Store', {
        id : 'mgridStore',
        pageSize : 50,
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
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE','V_EQUCODE','WBSCODE','WBSNAME'],

        proxy: {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SELECT',
            url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SELECT_N',
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
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST','V_EQUCODE','V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE','V_EQUCODE'],
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
    var hChoGrid= Ext.create('Ext.grid.Panel', {
        id : 'hChoGrid',
        store : hChoGridStore,
        region:'center',
        border: true,
        split: true,
        columnLines: true,
        autoScroll:true,
        // selType: 'checkboxmodel',
        columns : [
            {text : '序号',xtype : 'rownumberer',width : 50,sortable : false}
            ,{text : '删除',dataIndex : 'V_GUID',align : 'left',width : 100, renderer : delCorDef}
            , {text : '单位',dataIndex : 'V_DEPTNAME',align : 'left',width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷状态', dataIndex : 'V_STATENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷类型', dataIndex : 'V_SOURCENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '设备', dataIndex : 'V_EQUNAME', align : 'left', width : 200, renderer : CreateGridColumnTd},
            {text : '缺陷日期', dataIndex : 'D_DEFECTDATE', align : 'right', width : 200, renderer : CreateGridColumnTime},
            {text : '缺陷明细', dataIndex : 'V_DEFECTLIST', align : 'left', width : 700, renderer : CreateGridColumnTd},
            {text : '设备位置', dataIndex : 'V_EQUSITE', align : 'left', width : 300, renderer : CreateGridColumnTd},
            {text : '负责人', dataIndex : 'V_PERNAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '处理意见', dataIndex : 'V_IDEA', align : 'left', renderer : CreateGridColumnTd}]
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
        //frame:true,
        border:false,
        title:'已选择缺陷',
        items:[hChoGrid]
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
            {text : '单位',dataIndex : 'V_DEPTNAME',align : 'left',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷状态',dataIndex : 'V_STATENAME',align : 'left',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷类型',dataIndex : 'V_SOURCENAME',align : 'left',width : 100,renderer : CreateGridColumnTd},
            {text : '缺陷日期',dataIndex : 'D_DEFECTDATE',align : 'right',width : 200,renderer : CreateGridColumnTime},
            {text : '缺陷明细',dataIndex : 'V_DEFECTLIST',align : 'left',width : 700,renderer : CreateGridColumnTd},
            {text : '设备',dataIndex : 'V_EQUNAME',align : 'left',width : 200,renderer : CreateGridColumnTd},
            {text : '设备位置',dataIndex : 'V_EQUSITE',align : 'left',width : 300,renderer : CreateGridColumnTd},
            {text : '负责人',dataIndex : 'V_PERNAME',align : 'left',width : 100,renderer : CreateGridColumnTd},
            {text : '处理意见',dataIndex : 'V_IDEA',align : 'left',renderer : CreateGridColumnTd}
        ],
        tbar:[
            {
                xtype: 'button',
                text: '选择',
                handler : AddmDef
            }
        ]
        // ,listeners : {
        //     itemclick: AddmDef //itemdblclick
        // }
    });
    var mfGridPanel=Ext.create('Ext.panel.Panel',{
        id:'mfGridPanel',
        layout:'border',
        region:'east',
        width:'45%',
        split: true,
        //frame:true,
        border:false,
        title:'月计划关联的缺陷',
        // items:[mdGridPanel]
        items:[mdGridPanel]
    });
    var topPanel=Ext.create('Ext.panel.Panel',{
        id:'topPanel',
        layout:'border',
        region:'north',
        frame:true,
        split: true,
        height:'45%',
        border:false,
        // collapsible: true,
        items:[haveChoDef,mfGridPanel]
    });
//月计划审批完成查找
    var mGridPanel = Ext.create('Ext.grid.Panel', {
        id:'mGridPanel',
        // title:'月计划审批完成查找',
        // region: 'east',
        // width:'60%',
        region:'center',
        border: false,
        store:mgridStore,
        autoScroll:true,
        // selType:'checkboxmodel',
        tbar: [
            {xtype:'combobox',id: 'mnf',allowBlank: false,fieldLabel: '年份',store: myearStore,displayField: 'displayField',valueField:
                    'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype:'combobox',id: 'myf',allowBlank: false,fieldLabel: '月份',store: monthStore,displayField: 'displayField',valueField:
                    'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype: 'textfield',id:'jhmc',fieldLabel: '计划名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:205,value:''},
            {xtype: 'button', id:'monthsel',text: '查询', margin: '10 0 5 10',icon:imgpath + '/search.png',handler:query}
        ],
        columns:[
            {text: '序号', align: 'right', width: 50, xtype: 'rownumberer'},
            {text: '厂矿', align: 'left', width: 150, dataIndex: 'V_ORGNAME',renderer : CreateGridColumnTd},
            {text: '车间名称', align: 'left', width: 200, dataIndex: 'V_DEPTNAME',renderer : CreateGridColumnTd},
            {text: '专业', align: 'left', width: 150, dataIndex: 'V_REPAIRMAJOR_CODE',renderer : CreateGridColumnTd},
            {text: '设备名称', align: 'left', width: 200, dataIndex: 'V_EQUNAME',renderer : CreateGridColumnTd},
            {text: '检修内容', align: 'left', width: 300, dataIndex: 'V_CONTENT',renderer : CreateGridColumnTd},
            {text: '计划停机日期', align: 'right', width: 200, dataIndex: 'V_STARTTIME',
                renderer: rendererTime},
            {text: '计划竣工日期', align: 'right', width: 200, dataIndex: 'V_ENDTIME',
                renderer: rendererTime},
            {text: '计划工期（小时）', align: 'right', width:200, dataIndex: 'V_HOUR',renderer : CreateGridColumnTd}
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

    //缺陷待选表格
    var dGridPanel = Ext.create('Ext.grid.Panel', {
        id : 'dGridPanel',
        store : gridStore,
        region:'center',
        border: true,
        columnLines: true,
        autoScroll:true,
        selType: 'checkboxmodel',
        tbar: [
            {id: 'qxzt', xtype: 'combo', store: sqxzt, editable: false, fieldLabel: '缺陷类型', labelWidth:70, width: 180,
                displayField: 'V_SOURCENAME', valueField: 'V_SOURCECODE', queryMode: 'local', baseCls: 'margin-bottom'},
            {xtype : 'button', id:'otherdefsel', text : '查询', handler :otherdefsel}// _selectOverhaulApply
            ,{xtype : 'button', id:'addotherdef', text : '缺陷添加', handler :Select}],// _selectOverhaulApply
        columns : [
            {text : '序号',xtype : 'rownumberer',width : 50,sortable : false}
            , {text : '单位',dataIndex : 'V_DEPTNAME',align : 'left',width : 100, renderer : CreateGridColumnTd},
            {text : 'WBS编码', dataIndex : 'WBSCODE', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '维修工程项目名称', dataIndex : 'WBSNAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷状态', dataIndex : 'V_STATENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷类型', dataIndex : 'V_SOURCENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷日期', dataIndex : 'D_DEFECTDATE', align : 'left', width : 200, renderer : CreateGridColumnTime},
            {text : '设备', dataIndex : 'V_EQUNAME', align : 'left', width : 200, renderer : CreateGridColumnTd},
            {text : '缺陷明细', dataIndex : 'V_DEFECTLIST', align : 'left', width : 700, renderer : CreateGridColumnTd},
            {text : '设备编码', dataIndex : 'V_EQUCODE', hidden:true,align : 'left', width : 700, renderer : CreateGridColumnTd},
            {text : '设备位置', dataIndex : 'V_EQUSITE', align : 'left', width : 300, renderer : CreateGridColumnTd},
            {text : '负责人', dataIndex : 'V_PERNAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '处理意见', dataIndex : 'V_IDEA', align : 'right', renderer : CreateGridColumnTd}],
        listeners : {
            itemdblclick :tbitemclick
            // ,itemclick: Select
        }
    });
    var tabpanel=Ext.create('Ext.tab.Panel',{
        id:'tabpanel',
        region:'center',
        activeTab:0,
        enableTabScroll:true,
        items:[
            {
                id:'monthid',
                title:'月计划审批完成查找',
                layout:'border',
                border:false,
                frame:true,
                autoScroll:true,
                // items:[mGridPanel,mdGridPanel],
                items:[mGridPanel],
                listeners: { activate: action1 }

            },{
                id:'otherdef',
                title:'其它缺陷',
                border:false,
                frame:true,
                autoScroll:true,
                items:[dGridPanel],
                listeners: { activate: action2 }
            }

        ]
    });
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[topPanel,tabpanel]
    });
    loadStore();
    query();
    var org_code=Ext.util.Cookies.get("v_orgCode");
    createWGuid(org_code);

    Ext.data.StoreManager.lookup('mgridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
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

});

function turnPage(){
    var owidth = window.document.body.offsetWidth - 550;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_03010318/index.html?MONGUID="+MGUID
        +'&WEEKGUID='+WEEKGUID+'&WeekYear='+WeekYear+'&WeekMonth='+WeekMonth+'&WSIGN='+0
        +"&WEEK=" + WEEK
        +'&startUpTime='+ startUpTime
        +'&endUpTime='+endUpTime,'','_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
//已选中关联周计划缺陷删除
function delCorDefect(defGuid){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_DEFECTTOWEEK_DEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_WEEKGUID:WEEKGUID,
            DEF_GUID: defGuid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET =='SUCCESS') {
                haveChLoad(WEEKGUID);
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
function rendererTime(value, metaData){
    metaData.style="text-align:right";
    //return value.split(".")[0];
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style="text-align:right";
    var time=value.split('.')[0];
    //return time;
    return '<div data-qtip="' + value + '" >' + value + '</div>';
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
function loadStore(){
    Ext.getCmp("mnf").select(WeekYear);
    Ext.getCmp("myf").select(WeekMonth);
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
                clear_def_old(WEEKGUID,org);
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
    var defitem=Ext.getCmp("dGridPanel").getSelectionModel().getSelection();
    if(defitem.length<=0){
        alert("请选择至少一条缺陷"); return false;
    }
    var equdef=defitem[0].data.V_EQUCODE;
    for(var i=0;i<defitem.length;i++){
        if(defitem[i].data.V_EQUCODE!=equdef){
            alert("请选择设备相同的缺陷"); return false;
        }
    }
    choequ(equdef);
    if(retEquDif==1){
        return false;
    }
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

    if(WEEKGUID!=""){
        if (CLEARDATE == 'SUCCESS') {
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
                        V_V_WEEKGUID: WEEKGUID,
                        V_N_DEFECTGUID: defrecord[i].data.V_GUID,
                        V_INPER: Ext.util.Cookies.get("v_personcode"),
                        V_DEFECTSTATE: defrecord[i].data.V_STATECODE
                    },
                    success: function (resp) {
                        var data = Ext.decode(resp.responseText);//后台返回的值
                        if (data.RET == 'SUCCESS') {
                            haveChLoad(WEEKGUID);
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
    }
}

//月计划缺陷添加
function AddmDef(){
    choequ (MEQUCODE);
    if(retEquDif==1){
        return false;
    }
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

    if (WEEKGUID != "") {
        if (CLEARDATE == 'SUCCESS') {

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
                        V_V_WEEKGUID: WEEKGUID,
                        V_N_DEFECTGUID: defrecord[i].data.V_GUID,
                        V_INPER: Ext.util.Cookies.get("v_personcode"),
                        V_DEFECTSTATE: defrecord[i].data.V_STATECODE
                    },
                    success: function (resp) {
                        var data = Ext.decode(resp.responseText);//后台返回的值
                        if (data.RET == 'SUCCESS') {
                            haveChLoad(WEEKGUID);
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
            V_WEEKGUID:WEEKGUID
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
function turnPage(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_03010318/index.html?MONGUID="+MGUID
        +'&WEEKGUID='+WEEKGUID+'&WeekYear='+WeekYear+'&WeekMonth='+WeekMonth+'&WSIGN='+0
        +"&WEEK=" + WEEK
        +'&startUpTime='+ startUpTime
        +'&endUpTime='+endUpTime,'','_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
        V_V_EQUCODE:MEQUCODE,
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
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth +
        ',top=10px,left=10px,resizable=yes');

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
            V_WEEKGUID:WEEKGUID,
            DEF_GUID: defGuid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET =='SUCCESS') {
                haveChLoad(WEEKGUID);
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
function choequ(equcode){
    retEquDif=0;
    var haveDefS=Ext.data.StoreManager.lookup('hChoGridStore').data.items;
    if(haveDefS.length>0){
        if(Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUCODE!=equcode){
            alert("当前设备与已选择设备不一致，请从新选择！");
            retEquDif=1;
            return false;
        }
    }
}
function action1(tab) {
    tab.on('activate', function (tab) {

    });
}
function action2(tab){
    tab.on('activate',function(tab){

    });
}