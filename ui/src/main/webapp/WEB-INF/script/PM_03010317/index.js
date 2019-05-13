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
    var mgridStore = Ext.create('Ext.data.Store', {
        id : 'mgridStore',
        pageSize : 15,
        autoLoad : false,
        fields :['I_ID',
            'V_GUID',
            'V_YEAR',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUTYPECODE',
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ'],
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
    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: false,
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

    //月计划缺陷 PRO_PM_07_DEFECT_SEL_RE_MONTH
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

    var toolPanel=Ext.create("Ext.panel.Panel",{
       id:'toolPanel' ,
        layout:'column',
        frame:true,
        region:'north',
        border:false,
        height:'5%',
        items:[
            {xtype:'combobox',id: 'mnf',allowBlank: false,fieldLabel: '年份',store: myearStore,displayField: 'displayField',valueField: 'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype:'combobox',id: 'myf',allowBlank: false,fieldLabel: '月份',store: monthStore,displayField: 'displayField',valueField: 'valueField',labelWidth: 90, margin: '10 0 5 10'},
            {xtype: 'textfield',id:'jhmc',fieldLabel: '计划名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:205,value:''},
            {xtype: 'button', text: '查询', margin: '10 0 5 10',icon:imgpath + '/search.png',handler:query},
            {xtype: 'button', text: '其他缺陷选择', margin: '10 0 5 10',icon: imgpath +'/add.png', handler:OtherDefselect}
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

    var monthPanel=Ext.create('Ext.panel.Panel',{
        id:'monthPanel',
        layout:'border',
        region:'center',
        frame:true,
        height:'35%',
        border:false,
        title:'月计划审批完成查找',
        items:[mGridPanel]
    });
    //缺陷表格
    var dtoolPanel=Ext.create('Ext.panel.Panel',{
        id:'dtoolPanel',
        layout:'column',
        region:'north',
        frame:true,
        border:false,
        height:'5%',
        defaults:{
            labelAlign:'right'
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
                text : '查询',
                handler : _selectOverhaulApply
            },{
                xtype: 'button',
                text: '选择',
                handler : Select
            }
        ]
    });
    var dGridPanel = Ext.create('Ext.grid.Panel', {
        id : 'dGridPanel',
        // store : gridStore,
        region:'center',
        border: true,
        columnLines: true,
        autoScroll:true,
        selType: 'checkboxmodel',
        columns : [ {
            text : '序号',
            xtype : 'rownumberer',
            width : 50,
            sortable : false
        }
        // ,{
        //     text : '手工消缺',
        //     id : 'sgxq',
        //     xtype : 'templatecolumn',
        //     align : 'center',
        //     width : 100,
        //     tpl : '<a href="#" onClick="OnBtnSxQx()">手工消缺</a>'
        // }
        , {
            text : '单位',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷状态',
            dataIndex : 'V_STATENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷类型',
            dataIndex : 'V_SOURCENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷日期',
            dataIndex : 'D_DEFECTDATE',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTime
        }, {
            text : '缺陷明细',
            dataIndex : 'V_DEFECTLIST',
            align : 'center',
            width : 700,
            renderer : CreateGridColumnTd
        }, {
            text : '设备',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTd
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITE',
            align : 'center',
            width : 300,
            renderer : CreateGridColumnTd
        }, {
            text : '负责人',
            dataIndex : 'V_PERNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '处理意见',
            dataIndex : 'V_IDEA',
            align : 'center',
            renderer : CreateGridColumnTd
        }],
        listeners : {
            itemdblclick : itemclick
        }
        // ,bbar: [{
        //     id: 'page',
        //     xtype: 'pagingtoolbar',
        //     dock: 'bottom',
        //     displayInfo: true,
        //     displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        //     emptyMsg: '没有记录',
        //     store: 'gridStore'
        // },
        // , {
        //     xtype: 'label',
        //     text: '已计划',
        //     style: ' margin: 0px 0px 0px 10px;color:#FFCC00'
        // }, {
        //     xtype: 'label',
        //     text: '已接收',
        //     style: ' margin: 0px 0px 0px 10px;color:#009933'
        // }, {
        //     xtype: 'label',
        //     text: '已反馈',
        //     style: ' margin: 0px 0px 0px 10px;color:#6666FF'
        // }, {
        //     xtype: 'label',
        //     text: '已验收',
        //     style: ' margin: 0px 0px 0px 10px;color:#333300'
        // }, {
        //     xtype: 'label',
        //     text: '遗留缺陷',
        //     style: ' margin: 0px 0px 0px 10px;color:#000000'
        // }, {
        //     xtype: 'label',
        //     text: '工单驳回',
        //     style: ' margin: 0px 0px 0px 10px;color:#000000'
        // },
        //     {
        //     xtype: 'label',
        //     text: '未处理',
        //     style: ' margin: 0px 0px 0px 10px;color:#FF0000'
        // }
        // , {
        //     xtype: 'label',
        //     text: '已下票',
        //     style: ' margin: 0px 0px 0px 10px;color:#FF33CC'
        // }, {
        //     xtype: 'label',
        //     text: '已消缺',
        //     style: ' margin: 0px 0px 0px 10px;color:#000000'
        // }, {
        //     xtype: 'label',
        //     text: '手工消缺',
        //     style: ' margin: 0px 0px 0px 10px;color:#000000'
        // }
        // ]
    });
    var mDefPanel=Ext.create('Ext.panel.Panel',{
        id:'mDefPanel',
        layout:'border',
        region:'south',
        height:'60%',
        frame:true,
        border:false,
        items:[dtoolPanel,dGridPanel]


    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[toolPanel,monthPanel,mDefPanel]
        // items:[monthPanel,mDefPanel]
    });
    loadStore();
    // Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
    //     store.proxy.extraParams = {
    //         V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
    //         X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
    //         V_V_PAGE: Ext.getCmp('page').store.currentPage,
    //         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
    //     }
    // });
});
function loadStore(){
    Ext.getCmp("mnf").select(WeekYear);
    Ext.getCmp("myf").select(WeekMonth);
}
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

function rendererTime(value, metaData){
    return value.split(".")[0];
}
// 月计划表格点击事件
function defPanelLoad(monthGuid){
    selesign=0;
    //缺陷查找下拉条件加载
  Ext.data.StoreManager.lookup("sqxzt").load();
    defsel(monthGuid);

    Ext.getCmp('dGridPanel').reconfigure(Ext.data.StoreManager.lookup('mdefStore'));
    var  chgrid=Ext.getCmp('dGridPanel');
    chgrid.store.reload();
    Ext.getCmp('dGridPanel').getView().refresh();
}
function defsel(monthGuid){
    var MdefStore=Ext.data.StoreManager.lookup('mdefStore');
    MdefStore.proxy.extraParams = {
        V_MONTHGUID:monthGuid,
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: '',//Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: ''//Ext.getCmp('page').store.pageSize

    };
}
//其他缺陷查找
function OtherDefselect(){
    selesign=1;
    //月计划关联缺陷查找
    mdefsel();
    Ext.getCmp('dGridPanel').reconfigure(Ext.data.StoreManager.lookup('gridStore'));
    var  chgrid=Ext.getCmp('dGridPanel');
    chgrid.store.reload();
    Ext.getCmp('dGridPanel').getView().refresh();
}
function mdefsel(){
    var agridStore =Ext.data.StoreManager.lookup('gridStore');
    agridStore.proxy.extraParams = {
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: '',//Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: ''//Ext.getCmp('page').store.pageSize
    };
}
function itemclick(s, record, item, index, e, eOpts) {

    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index1.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}
function OnBtnSxQx() {
    var length = Ext.getCmp('dGridPanel').getSelectionModel().getSelection().length;
    if (length != 1) {
        alert('请选择一条数据进行修改');
    } else {
        var GUID = Ext.getCmp('dGridPanel').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + "page/PM_070201/index.html?V_GUID=" + GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}
function _selectOverhaulApply(){
    if(selesign==0){
        defsel();
    }
    else{
        mdefsel();
    }
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

            }
        });
    }
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
    if(WEEKGUID!=""){
        var defrecord=Ext.getCmp("dGridPanel").getSelectionModel().getSelection();
        if(defrecord.length==0){
            alert('请选择至少一条缺陷记录');
            return false;
        }
        for(var i=0;i<defrecord.length;i++){
            Ext.Ajax.request({
                url:AppUrl+'dxfile/PM_DEFECTTOWEEK_IN',
                type: 'ajax',
                method: 'POST',
                async: false,
                params: {
                    V_V_MONTHGUID:MGUID,
                    V_V_WEEKGUID: WEEKGUID,
                    V_N_DEFECTGUID:defrecord[i].data.V_GUID,
                    V_INPER:Ext.util.Cookies.get("v_personcode"),
                    V_DEFECTSTATE:defrecord[i].data.V_STATECODE
                },
                success: function (resp) {
                    var data = Ext.decode(resp.responseText);//后台返回的值
                    if (data.RET =='SUCCESS') {
                        var owidth = window.document.body.offsetWidth - 200;
                        var oheight = window.document.body.offsetHeight - 100;

                        var ret = window.open(AppUrl + "page/PM_03010318/index.html?MONGUID="+MGUID +'&WEEKGUID='+WEEKGUID+'&WeekYear='+WeekYear+'&WeekMonth='+WeekMonth+'&WSIGN='+0
                            +"&WEEK=" + WEEK
                            +'&startUpTime='+ startUpTime
                            +'&endUpTime='+endUpTime,'','_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
function retClose(){
    window.opener.query();
    window.close;
}