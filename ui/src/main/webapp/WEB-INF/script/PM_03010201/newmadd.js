/*月计划添加页面-类周添加*/
var YEARGUID = "";
var date = new Date();
var MainMONTH = "";
var MainYEAR = "";
var monthGuid = "";
var retEquDif = "";
if (location.href.split("?")[1] != undefined) {
    MainMONTH = Ext.urlDecode(location.href.split('?')[1]).MainMONTH;
    MainYEAR = Ext.urlDecode(location.href.split('?')[1]).MainYEAR;
    MainMONTH = Ext.urlDecode(location.href.split('?')[1]).MainMONTH;
}

var defectType="";

var orgcode = Ext.util.Cookies.get("v_orgCode");

Ext.onReady(function () {
    Ext.QuickTips.init();

    //年计划缺陷查找
    var wxqxGridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxqxGridStore',
        fields: ['D_DATE_EDITTIME', 'D_DEFECTDATE', 'D_INDATE', 'I_ID', 'V_BZ', 'V_DEFECTLIST', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EDIT_GUID',
            'V_EQUCHILDCODE', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_FLAG', 'V_GUID',
            'V_HOUR', 'V_IDEA', 'V_INPERCODE', 'V_ORGCODE', 'V_ORGNAME', 'V_PERNAME', 'V_PROC_WAY', 'V_REPAIRMAJOR_CODE', 'V_SOURCECODE', 'V_SOURCEID',
            'V_SOURCENAME', 'V_SOURCEREMARK', 'V_SOURCETABLE', 'V_SOURCE_GRADE', 'V_STATECODE', 'V_STATECOLOR', 'V_STATENAME', 'V_SYSTEM', 'WBSCODE', 'WBSNAME'],
        proxy: {
            type: 'ajax',
            async: false,
                url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //缺陷类型
    var qxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        id: 'qxlxStore',
        fields: ['V_SOURCECODE', 'V_SOURCENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var bjqxlxStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'bjqxlxStore',
        fields: ['I_ID', 'V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_DEFECT_PART_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var cygridStore = Ext.create('Ext.data.Store', {
        id: 'cygridStore',
        autoLoad: false,
        fields: ['V_GUID', 'V_YEARID', 'V_YEAR', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_CXCODE', 'V_CXNAME', 'V_ZY', 'V_ZYMC', 'V_STATE', 'V_DEL',
            'V_INPER', 'V_INPERNAME', 'V_INDATE', 'V_JHTJSJ', 'V_JHJGSJ',
            'V_JHGQ', 'V_COUNT', 'V_EQUCODE', 'V_EQUNAME', 'V_YEARNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_TO_MONTH_GETY_BYM',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //月计划已选缺陷
    var hChoGridStore = Ext.create('Ext.data.Store', {
        id: 'hChoGridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE', 'V_SOURCEID', 'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE',
            'V_PERNAME', 'V_DEPTCODE', 'V_EQUCODE', 'V_IDEA', 'V_STATECODE', 'V_GUID', 'V_EQUSITE', 'D_DATE_EDITTIME',
            'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE', 'V_INPERCODE', 'V_INPERNAME', 'V_EQUTYPECODE', 'V_ORGCODE',
            'V_HOUR', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_FLAG',
            'V_PROC_WAY', 'UP_GUID', 'V_SYSTEM', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTNAME', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME',
            'V_STATENAME', 'V_STATECOLOR'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
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

    //月计划已选缺陷
    var hChoGrid = Ext.create('Ext.grid.Panel', {
        id: 'hChoGrid',
        store: hChoGridStore,
        region: 'center',
        border: true,
        split: true,
        columnLines: true,
        autoScroll: true,
        columns: [
            {text: '序号', xtype: 'rownumberer', width: 50, sortable: false},
            {text: '删除', dataIndex: 'V_GUID', align: 'center', width: 100, renderer: delCorDef},
            {text: '缺陷状态', dataIndex: 'V_STATENAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '缺陷类型', dataIndex: 'V_SOURCENAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '设备', dataIndex: 'V_EQUNAME', align: 'center', width: 200, renderer: CreateGridColumnTd},
            {text: '缺陷日期', dataIndex: 'D_DEFECTDATE', align: 'center', width: 200, renderer: CreateGridColumnTime},
            {text: '缺陷明细', dataIndex: 'V_DEFECTLIST', align: 'center', width: 700, renderer: CreateGridColumnTd},
            {text: '设备位置', dataIndex: 'V_EQUSITE', align: 'center', width: 300, renderer: CreateGridColumnTd},
            {text: '负责人', dataIndex: 'V_PERNAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '处理意见', dataIndex: 'V_IDEA', align: 'center', renderer: CreateGridColumnTd}]
        , tbar: [
            {
                xtype: 'button',
                text: '确定选择',
                handler: turnPage
            }
        ]

    });
    //已选择模块
    var haveChoDef = Ext.create('Ext.panel.Panel', {
        id: 'haveChoDef',
        layout: 'border',
        region: 'center',
        split: true,
        width: '45%',
        border: false,
        title: '已选择缺陷',
        items: [hChoGrid]
    });

    var tab=Ext.create('Ext.tab.Panel',{
       frame:true,
       width:'100%',
       region:'north',
       items:[{title:'缺陷选择',id:'qxxz'},{title:'备件选择',id:'bjxz'}],
        listeners: {
            tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                if(newCard.id=="bjxz"){
                    defectType="bjxz";
                    Ext.getCmp('qxlx').hide();
                    Ext.getCmp('bjqxlx').show();
                }else{
                    defectType="qxxz";
                    Ext.getCmp('qxlx').show();
                    Ext.getCmp('bjqxlx').hide();
                }
            }
        }
    });

    var wxqxpanel = Ext.create("Ext.toolbar.Toolbar", {
        id: 'wxqxpanel',
        frame: true,
        border: false,
        width: '100%',
        bodyCls: 'border_wid',
        items: [{
            id: 'qxlx',
            xtype: 'combo',
            store: qxlxStore,
            editable: false,
            fieldLabel: '缺陷类型',
            labelWidth: 70,
            labelAlign:'right',
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local'
        }, {
            id: 'bjqxlx',
            xtype: 'combo',
            hidden:true,
            store: bjqxlxStore,
            editable: false,
            fieldLabel: '问题备件类型',
            labelWidth: 100,
            labelAlign:'right',
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local'
        },{
            xtype: 'button',
            text: '查询',
            icon: dxImgPath + '/back.png',
            listeners: {click: wxqxLoad}
        }, {
            xtype: 'button',
            text: '确认返回',
            icon: dxImgPath + '/back.png',
            listeners: {click: SaveWxQx}
        }]
    });

    //年获维修计划关联缺陷guid
    var ydefGPanel = Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'qxAdd',
        store: wxqxGridStore,
        split: true,
        width: '100%',
        margin: '0px',
        columnLines: true,
        border: true,
        selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: 'WBS编码', width: 140, dataIndex: 'WBSCODE', align: 'center'},
            {text: 'WBS名称', width: 140, dataIndex: 'WBSNAME', align: 'center'},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center'},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center'},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center'}
        ],
        tbar: [wxqxpanel]
    });
    //年或维修计划关联缺陷面板
    var yPanel = Ext.create('Ext.panel.Panel', {
        id: 'yPanel',
        layout: 'border',
        region: 'east',
        width: '45%',
        split: true,
        border: false,
        title: '问题选择',
        items: [tab,ydefGPanel]
    });

    var topPanel = Ext.create('Ext.panel.Panel', {
        id: 'topPanel',
        layout: 'border',
        region: 'north',
        frame: true,
        split: true,
        height: '45%',
        border: false,
        items: [haveChoDef, yPanel]
    });

    //已选年计划
    var cyGridPanel = Ext.create('Ext.grid.Panel', {
        title: '已关联年计划',
        id: 'cyGridPanel',
        columnLines: true,
        region: 'center',
        border: true,
        store: cygridStore,
        selModel: {
            selType: 'checkboxmodel'
        },
        columns: [
            {text: '年份', align: 'center', width: 100, dataIndex: 'V_YEAR', renderer: atleft},
            {text: '计划厂矿', align: 'center', width: 140, dataIndex: 'V_ORGNAME', renderer: atleft},
            {text: '作业区', align: 'center', width: 140, dataIndex: 'V_DEPTNAME', renderer: atleft},
            {text: '专业', align: 'center', width: 100, dataIndex: 'V_ZYMC', renderer: atleft},
            {text: '产线名称', align: 'center', width: 160, dataIndex: 'V_CXNAME', renderer: atleft},
            {text: '检修内容', align: 'center', width: 200, dataIndex: 'V_COUNT', renderer: atleft},
            {text: '计划停机时间', align: 'center', width: 140, dataIndex: 'V_JHTJSJ', renderer: atleft},
            {text: '计划竣工时间', align: 'center', width: 140, dataIndex: 'V_JHJGSJ', renderer: atleft},
            {text: '计划工期', align: 'center', width: 100, dataIndex: 'V_JHGQ', renderer: atleft}
        ],
        tbar: [{
            xtype: 'button',
            margin: '7 0 0 10',
            text: '查询',
            handler: QueryCyGrid
        }, {
            xtype: 'button',
            margin: '7 0 0 10',
            text: '添加',
            handler: addYear
        }, {
            xtype: 'button',
            margin: '7 0 0 10',
            text: '删除',
            handler: delYear
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topPanel, cyGridPanel]
    });

    Ext.data.StoreManager.lookup('qxlxStore').on('load', function () {
        Ext.getCmp('qxlx').select(Ext.data.StoreManager.lookup('qxlxStore').getAt(0))
        wxqxLoad();
    });

    Ext.data.StoreManager.lookup('bjqxlxStore').on('load',function(){
        Ext.getCmp('bjqxlx').select(Ext.data.StoreManager.lookup('bjqxlxStore').getAt(0))
    })

    Ext.getCmp('qxlx').on('select', function () {
        wxqxLoad();
    })
    newCreatMonth();
});

function addYear() {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_03010201/yearcheck.html?V_GUID=' + monthGuid, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}

function QueryCyGrid() {
    Ext.data.StoreManager.lookup('cygridStore').load({
        params: {
            V_V_MONTHGUID: monthGuid
        }
    })
}0

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function timeTurn(value, metaData, recode, store) {
    metaData.style = "text-align:center";
    var val = value.toString().substring(0, 10);
    return '<div>' + val + '</div>';
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:right";
    return value.split(".")[0];
}

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right";
    var time = value.split('.')[0];
    return time;
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if (value == null) {
        return '<div data-qtip="' + value + '" ></div>';
    }
    else {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}


//月计划guid 创建
        function newCreatMonth() {
        Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_03_PLAN_MONTH_CREATE',
        method: 'POST',
        async: false,
        params: {
            V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_ORGCODE: orgcode
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.RET != undefined) {
                monthGuid = resp.RET;
                ClearOldDel();
                haveChocieS();
                QueryCyGrid();
            }
        }
    });
}

//清除原有未保存缺陷
function ClearOldDel() {
    //修改年计划添加未关联关联缺陷状态
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/YEAR_TO_MONTH_DEL',
        method: 'POST',
        async: false,
        params: {
            V_YEARGUID: '',
            V_MONTHGUID: monthGuid,
            V_DEFECTGUID: '',
            V_PER_CODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);//后台返回的值
            if (resp.RET == 'SUCCESS') {

            }
        }
    });
}

//维修计划无缺陷时缺陷加载
function wxqxLoad() {
    if(defectType=='bjxz'){
        Ext.data.StoreManager.lookup('wxqxGridStore').load({
            params: {
                V_V_QXLX: Ext.getCmp('bjqxlx').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            }
        });
    }else{
        Ext.data.StoreManager.lookup('wxqxGridStore').load({
            params: {
                V_V_QXLX: Ext.getCmp('qxlx').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            }
        });
    }
}

//删除月计划关联年计划
function delYear() {
    var record = Ext.getCmp("cyGridPanel").getSelectionModel().getSelection();
    if (record.length <= 0) {
        alert('请选择一条年计划');
        return false;
    }
    var snum = 0;
    for (var i = 0; i < record.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/YEAR_TO_MONTH_DEL',
            method: 'POST',
            async: false,
            params: {
                V_YEARGUID: record[i].data.V_GUID,
                V_MONTHGUID: monthGuid,
                V_DEFECTGUID: '',
                V_PER_CODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);//后台返回的值
                if (resp.RET == 'SUCCESS') {
                    snum++;
                }
            }
        });
    }
    if (snum == record.length) {
        QueryCyGrid();
    }
}

function query() {
    window.opener.query();
    window.close();
}

//关闭缺陷win
function winQxClose() {
    Ext.getCmp('btnAdd_tjqx').hide();
}

//保存选中缺陷加入月计划关联
function SaveWxQx() {
    var snum = 0;
    var qxDdefect = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    for (var i = 0; i < qxDdefect.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_DEFECTTOWORKORDER_SETDM',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECTGUID: qxDdefect[i].data.V_GUID,
                V_V_MONTHGUID: monthGuid,
                V_V_PERCODE:Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                snum++;
                if (resp.V_INFO != "SUCCESS") {
                    alert(resp.V_INFO)
                }
            }
        });
    }
    if (snum == qxDdefect.length) {
        wxqxLoad();
        haveChocieS();
    }
}


//月计划已选缺陷查找
function haveChocieS() {
    Ext.data.StoreManager.lookup("hChoGridStore").load({
        params: {
            V_V_WEEK_GUID: monthGuid
        }
    })
}

//已选择月计划缺陷删除
function delCorDef(value, metaDate, record) {
    return '<a href="javascript:onDefDel(\'' + value + '\')">删除</a>';
}

function onDefDel(guid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_DEFECTTOWORKORDER_DELDM',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHGUID: monthGuid,
            V_V_DEFECTGUID: guid,
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.V_INFO == 'SUCCESS') {
                haveChocieS();
                wxqxLoad();
            } else {
                alert('删除失败');
            }
        }
    });
}

//已选中关联周计划缺陷删除
function delCorDefect(defGuid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/YEAR_TO_MONTH_SDEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_MONTH_GUID: monthGuid,
            V_DEF_GUID: defGuid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET == 'SUCCESS') {
                haveChocieS();
                // haveChLoad(WEEKGUID);
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


function turnPage() {
    if(Ext.data.StoreManager.lookup('hChoGridStore').data.items.length==0){
        alert('请添加缺陷！')
    }else{
        var gridData=Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data
        var owidth = window.screen.availWidth - 300;
        var oheight = window.screen.availHeight - 500;
        window.open(AppUrl + "page/PM_03010219/monthFromDel.html?monthGuid=" + monthGuid +
            "&V_PLANTYPE=PLAN" +
            "&YEAR=" + MainYEAR +
            "&MONTH=" + MainMONTH +
            "&V_ORGCODE=" + gridData.V_ORGCODE +
            "&V_DEPTCODE=" + gridData.V_DEPTCODE +
            "&V_EQUTYPECODE=" + gridData.V_EQUTYPECODE  +
            "&V_EQUCODE=" + gridData.V_EQUCODE , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }

}

//查找月计划已关联数量
function choequ(equcode) {
    retEquDif = 0;
    var haveDefS = Ext.data.StoreManager.lookup('hChoGridStore').data.items;
    if (haveDefS.length > 0) {
        if (Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUCODE != equcode) {
            alert("当前设备与已选择设备不一致，请从新选择！");
            retEquDif = 1;
            return false;
        }
    }
}

function closeSelf(){
    window.close();
    window.opener.query();
}

/**
 *月计划缺陷直接添加写入 PM_DEFECTTOWORKORDER 表格
 * 月计划关联年计划写入表格 YEAR_TO_MONTH
 */