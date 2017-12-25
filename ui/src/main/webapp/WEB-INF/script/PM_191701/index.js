var V_MX_CODE = null;
var V_ORGCODE=null;
var V_DEPTCODE=null;
var V_EQUCODE=null;
var V_EQUTYPE=null;
var V_GX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_MX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_MX_CODE;

    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE;
}


var flag = "";
var teamStore = Ext.create('Ext.data.Store', {
    id: 'teamStore',
    autoLoad: true,
    fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'basic/PRO_BASE_DEPTTOSAPWORKCSAT',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_DEPTREPAIRCODE': Ext.util.Cookies.get('v_deptcode')
        }
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('jxteam').select(store.first());
        }
    }
});
var wlGridStore=Ext.create('Ext.data.Store',{
    id : 'wlGridStore',
    pageSize : 15,
    autoLoad : false,
    fields : [ 'I_ID', 'V_EQUCODE','V_SPCODE','V_SPNAME','V_SPTYPE','V_SPCODE_OLD','V_NUMBER','V_MEMO'],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'hp/PRO_SAP_EQU_BOM_VIEWN',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }/*,
    listeners: {
        beforeload: beforewlGridStore
    }*/
});

var wlQueryGridStore=Ext.create('Ext.data.Store',{
    id : 'wlQueryGridStore',
    pageSize : 15,
    autoLoad : false,
    fields : [ 'V_JXGX_CODE',
        'V_KFNAME',
        'V_WLCODE',
        'V_WLSM',
        'V_GGXH',
        'V_JLDW',
        'V_PRICE',
        'V_USE_NUM'
    ],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
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
var inputPanel = Ext.create('Ext.form.Panel', {
    id: 'inputPanel',
    region: 'north',
    padding: '10px 0px 0px 0px',
    baseCls: 'my-panel-no-border',
    //style: 'background-color:#FFFFFF',
    frame: true,
    //border:false,
    defaults: {
        labelAlign: 'right',
        labelWidth: 120,
        margin: '10px 0 0 10px',
        width: 300
    },
    layout: {
        type: 'table',
        columns: '2'
    },
    items: [{
        xtype: 'textfield',
        id: 'jxgxbm',
        colspan: 2,
        fieldLabel: '检修工序编码',
        readOnly: true,
        hidden: true,
        width: 340
    }, {
        xtype: 'textfield',
        id: 'jxgxname',
        colspan: 2,
        fieldLabel: '检修工序名称',
        width: 340
    }, {
        xtype: 'textfield',
        id: 'jxgxcontent',
        colspan: 2,
        fieldLabel: '检修工序内容',
        width: 340
    }, {
        xtype: 'combo',
        id: 'jxteam',
        colspan: 2,
        store: teamStore,
        queryMode: 'local',
        valueField: 'V_SAP_WORK',
        displayField: 'V_SAP_WORKNAME',
        fieldLabel: '检修工作中心',
        width: 340,
        editable: false
    }, {
        xtype: 'numberfield',
        id: 'jxedrs',
        colspan: 2,
        fieldLabel: '检修额定人数',
        width: 340
    },
        {
            xtype: 'numberfield',
            id: 'jxedsj',
            colspan: 2,
            fieldLabel: '检修额定时间',
            width: 340
        }, {
            xtype: 'textfield',
            id: 'order',
            colspan: 2,
            fieldLabel: '排序',
            width: 340
        }, {
            xtype: 'textfield',
            id: 'jxcar',
            fieldLabel: '检修车辆',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            handler: selectJXCAR,
            width: 25
        }, {
            xtype: 'textfield',
            id: 'jxtool',
            fieldLabel: '检修工具',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            handler: selectJXTOOL,
            width: 25
        }, {
            xtype: 'textfield',
            id: 'jxper',
            fieldLabel: '检修工种',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            handler: selectJXPER,
            width: 25
        }, {
            xtype: 'textfield',
            id: 'jxmaterial',
            fieldLabel: '检修物料',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            handler: selectWL,
            width: 25
        }, {
            xtype: 'textfield',
            id: 'jxtechnology',
            fieldLabel: '检修技术要求',
            hidden:true,
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            hidden:true,
            handler: selectJXTECHNOLOGY,
            width: 25
        },{
            xtype: 'textfield',
            id: 'jxtechnologybz',
            fieldLabel: '检修技术标准',
            readOnly: true
        }, {
            xtype: 'textfield',
            id: 'jxtechnologybzd',
            hidden:true,
            fieldLabel: '检修技术标准下',
            readOnly: true
        }, {
            xtype: 'textfield',
            id: 'jxtechnologybzu',
            hidden:true,
            fieldLabel: '检修技术标准上',
            readOnly: true
        }, {
            xtype: 'textfield',
            id: 'jxtecbzguid',
            hidden:true,
            fieldLabel: '检修技术标准guid',
            readOnly: true
        },{
            xtype: 'button',
            text: '+',
            handler: selectJXTECHNOLOGYBZ,
            width: 25
        }, {
            xtype: 'textfield',
            id: 'jxsafe',
            fieldLabel: '检修安全措施',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            handler: selectJXSAFE,
            width: 25
        }]
});

var win = Ext.create('Ext.window.Window', {
    id: 'win',
    width: 450,
    height: 550,
    layout: 'vbox',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [inputPanel],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            save_btn();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            cancel_btn();
        }
    }]
});

var WLwinbuttonPanel = Ext.create('Ext.panel.Panel', {
    id: 'WLwinbuttonPanel',
    region: 'north',
    layout:'column',
    height: 30,
    frame: true,
    //autoScroll : true,
    baseCls: 'my-panel-no-border',
    items: [{
        xtype: 'button',
        text: '查询',
        margin: '5 5 5 5',
        icon: imgpath + '/search.png',
        handler: function () {
            loadWLgrid();
        }
    },
        {
            xtype: 'textfield',
            id: 'WLwinbjmc',
            fieldLabel: '备件名称',
            labelAlign : 'right',
            margin: '5 5 5 5',
            labelWidth: 70,
            allowBlank: true,
            width: 250
        } ]
});

var WLwin = Ext.create('Ext.window.Window', {
    id: 'WLwin',
    width: 920,
    height: 500,
    layout: 'vbox',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    autoScroll : true,
    items: [WLwinbuttonPanel,{xtype:'gridpanel',id:'wlGridPanel',selType : 'checkboxmodel',width:'100%',columnLines: true,store:wlGridStore,autoScroll: true,region:'center',
        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
            { text: '备件编码', width: 200, dataIndex: 'V_SPCODE', align: 'center', renderer: atleft },
            { text: '备件名称', width: 260, dataIndex: 'V_SPNAME', align: 'center', renderer: atleft },
            { text: '数量', width: 80, dataIndex: 'V_NUMBER', align: 'center', renderer: atleft },
            { text: '备注', width: 260, dataIndex: 'V_MEMO', align: 'center', renderer: atleft }]
        }],
    buttons: [{
        xtype: 'button',
        text: '选择',
        width: 40,
        handler: function () {
            saveWL_btn();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            cancelWL_btn();
        }
    }]
});

var WLQuerywin = Ext.create('Ext.window.Window', {
    id: 'WLQuerywin',
    width: 750,
    height: 500,
    layout: 'vbox',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    autoScroll : true,
    items: [{xtype:'gridpanel',id:'wlQueryGridPanel',
        width:'100%',columnLines: true,store:wlQueryGridStore,autoScroll: true,region:'center',
        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
            { text: '备件编码', width: 200, dataIndex: 'V_WLCODE', align: 'center', renderer: atleft },
            { text: '备件名称', width: 260, dataIndex: 'V_WLSM', align: 'center', renderer: atleft },
            { text: '数量', width: 80, dataIndex: 'V_USE_NUM', align: 'center', renderer: atleft }]
    }],
    buttons: [ {
        xtype: 'button',
        text: '关闭',
        width: 40,
        handler: function () {
            cancelWLQ_btn();
        }
    }]
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_NAME', 'V_JXGX_NR', 'V_WORK_NAME', 'V_GJ_NAME', 'V_JJ_NAME',
        'V_GZ_NAME',  'V_AQCS_NAME', 'V_JSYQ_NAME', 'V_JXGX_CODE', 'V_ORDER', 'V_GZZX_CODE','V_PERNUM','V_PERTIME',
    'V_WL_NAME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            border: false,
            region: 'north',
            layout: 'column',
            frame: true,
            defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {
                    xtype: 'button',
                    text: '从检修工序字典中选择',
                    handler: addbtn,
                    icon: imgpath + '/add.png',
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: '查询',
                    handler: queryGrid,
                    icon: imgpath + '/search.png'
                },
                {
                    xtype: 'button',
                    text: '添加检修工序',
                    handler: addbtn,
                    icon: imgpath + '/add.png'
                },
                {
                    xtype: 'button',
                    text: '修改检修工序',
                    handler: editbtn,
                    icon: imgpath + '/edit.png'
                },
                {
                    xtype: 'button',
                    text: '删除',
                    handler: delbtn,
                    icon: imgpath + '/delete.png'
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            selType: 'checkboxmodel',
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                /*{
                    text: '检修模型编码', align: 'center', width: 150, dataIndex: 'V_MX_CODE'
                },*/
                {
                    text: '检修模型名称', align: 'center', width: 150, dataIndex: 'V_MX_NAME'
                },
                {
                    text: '检修工序名称', align: 'center', width: 150, dataIndex: 'V_JXGX_NAME'
                },
                {
                    text: '工作中心', align: 'center', width: 220, dataIndex: 'V_WORK_NAME', renderer: TipRender
                },
                {
                    text: '检修额定人数', align: 'center', width: 120, dataIndex: 'V_PERNUM'
                },
                {
                    text: '检修额定时间', align: 'center', width: 120, dataIndex: 'V_PERTIME'
                },
                {
                    text: '检修工序内容', align: 'center', width: 150, dataIndex: 'V_JXGX_NR'
                },
                {
                    text: '检修车辆', align: 'center', width: 150, dataIndex: 'V_JJ_NAME',
                    renderer: detailcar
                },
                {
                    text: '检修工具', align: 'center', width: 150, dataIndex: 'V_GJ_NAME'
                },
                {
                    text: '检修工种', align: 'center', width: 80, dataIndex: 'V_GZ_NAME',
                    renderer: detailper
                },

                {
                    text: '物料详情', align: 'center', width: 250, dataIndex: 'V_WL_NAME',
                    renderer: rendererWL
                },
                {
                    text: '技术要求', align: 'center', width: 150, dataIndex: 'V_JSYQ_NAME',hidden:true
                },
                {
                    text: '安全措施', align: 'center', width: 150, dataIndex: 'V_AQCS_NAME'
                },
                {
                    text: ' 允许值(下限)', align: 'center', width: 150, dataIndex: 'V_JXBZ_VALUE_DOWN'
                },
                {
                    text: ' 允许值（上限）', align: 'center', width: 150, dataIndex: 'V_JXBZ_VALUE_UP'
                }
            ]
        }
    ]

};


function onPageLoaded() {
    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('teamStore').on('load', function () {
        Ext.getCmp('jxteam').select(Ext.data.StoreManager.
            lookup('teamStore').getAt(0));
    });
    queryGrid();

    Ext.getCmp('win').on("close", function () {
        if (flag == 1) {
            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE: Ext.getCmp('jxgxbm').getValue()
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                }
            });
        }
    });
}

/*function beforewlGridStore(store){
    store.proxy.extraParams.V_V_EQUCODE = V_EQUCODE;
}*/
function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXMX_CODE: V_MX_CODE
        }
    });
}

function addbtn() {
    Ext.getCmp('jxgxbm').setValue(guid());
    Ext.getCmp('jxgxname').setValue('');
    Ext.getCmp('jxgxcontent').setValue('');
    Ext.getCmp('order').setValue('');
    Ext.getCmp('jxcar').setValue('');
    Ext.getCmp('jxtool').setValue('');
    Ext.getCmp('jxper').setValue('');
    Ext.getCmp('jxmaterial').setValue('');
    Ext.getCmp('jxtechnology').setValue('');
    Ext.getCmp('jxsafe').setValue('');
    Ext.getCmp('jxedrs').setValue('0');
    Ext.getCmp('jxedsj').setValue('0');
    flag = 1;
    Ext.getCmp('win').show();

}

function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }

    Ext.getCmp('jxgxbm').setValue(seldata[0].data.V_JXGX_CODE);
    Ext.getCmp('jxgxname').setValue(seldata[0].data.V_JXGX_NAME);
    Ext.getCmp('jxgxcontent').setValue(seldata[0].data.V_JXGX_NR);
    Ext.getCmp('jxteam').setValue(seldata[0].data.V_GZZX_CODE);
    Ext.getCmp('order').setValue(seldata[0].data.V_ORDER);
    Ext.getCmp('jxtechnologybz').setValue(seldata[0].data.V_JXBZ_VALUE_DOWN+'~'+seldata[0].data.V_JXBZ_VALUE_UP);
    Ext.getCmp('jxtechnologybzd').setValue(seldata[0].data.V_JXBZ_VALUE_DOWN);
    Ext.getCmp('jxtechnologybzu').setValue(seldata[0].data.V_JXBZ_VALUE_UP);
    Ext.getCmp('jxtecbzguid').setValue(seldata[0].data.V_JXBZ);

    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_BYCODE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE: seldata[0].data.V_JXGX_CODE
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('jxcar').setValue(resp.list[0].V_JJ_NAME);
            Ext.getCmp('jxtool').setValue(resp.list[0].V_GJ_NAME);
            Ext.getCmp('jxper').setValue(resp.list[0].V_PER_NAME);
            Ext.getCmp('jxmaterial').setValue(resp.list[0].V_WL_NAME);
            Ext.getCmp('jxtechnology').setValue(resp.list[0].V_JSQY_NAME);
            Ext.getCmp('jxsafe').setValue(resp.list[0].V_AQSC_NAME);
        }
    });
    flag = 0;
    Ext.getCmp('win').show();

}

function delbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_JXGX_CODE: seldata[i].data.V_JXGX_CODE
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
            }
        });
    }
    queryGrid();
}

function save() {
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_PM_19_TOOLTYPE_EDIT',
        method: 'POST',
        async: false,
        params: {
            V_V_TOOLCODE: Ext.getCmp('wintoolcode').getValue(),
            V_V_TOOLNAME: Ext.getCmp('wintoolname').getValue(),
            V_V_TOOLTYPE: Ext.getCmp('wintooltype').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('win').hide();
            queryGrid();
        }
    });
}

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function detailcar(a, value, metaData) {
    return '<a href="javascript:ondetailcar(\'' + metaData.data.V_JXGX_CODE + '\')">' + a + '</a>';
}

function ondetailcar(a) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170101/index.html?V_JXGX_CODE=' + a, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}

function detailper(a, value, metaData) {
    return '<a href="javascript:ondetailper(\'' + metaData.data.V_JXGX_CODE + '\')">' + a + '</a>';
}

function ondetailper(a) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170102/index.html?V_JXGX_CODE=' + a, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function save_btn() {
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SETNEW',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE: Ext.getCmp('jxgxbm').getValue(),
            V_V_JXGX_NAME: Ext.getCmp('jxgxname').getValue(),
            V_V_JXGX_NR: Ext.getCmp('jxgxcontent').getValue(),
            V_V_GZZX_CODE: Ext.getCmp('jxteam').getValue(),
            V_V_JXMX_CODE: V_MX_CODE,
            V_V_ORDER: Ext.getCmp('order').getValue(),
            V_V_PERNUM: Ext.getCmp('jxedrs').getValue(),
            V_V_PERTIME: Ext.getCmp('jxedsj').getValue(),
            V_V_JXBZ: Ext.getCmp('jxtecbzguid').getValue(),
            V_V_JXBZ_VALUE_DOWN: Ext.getCmp('jxtechnologybzd').getValue(),
            V_V_JXBZ_VALUE_UP: Ext.getCmp('jxtechnologybzu').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('win').hide();
            queryGrid();
        }
    });
}

function cancel_btn() {
    if (flag == 1) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_JXGX_CODE: Ext.getCmp('jxgxbm').getValue()
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                Ext.getCmp('win').hide();
                queryGrid();
            }
        });
    } else {
        Ext.getCmp('win').hide();
    }

}
function selectJXCAR() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191704/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue()+'&V_EQUCODE='+V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXCAR(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxcar').setValue(ss);
}

function selectJXTOOL() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191705/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue()+'&V_EQUCODE='+V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXTOOL(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxtool').setValue(ss);
}

function selectJXPER() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191706/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXPER(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxper').setValue(ss);
}


function selectJXTECHNOLOGY() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191708/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue()+'&V_EQUCODE='+V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXTECHNOLOGY(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxtechnology').setValue(ss);
}

function selectJXTECHNOLOGYBZ() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191713/index.html?V_V_DEPTCODE=' + V_DEPTCODE
        +'&V_V_EQUTYPE='+V_EQUTYPE
        +'&V_V_ORGCODE='+V_ORGCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
function getReturnJSBZ(guid,valued,valueu){
    Ext.getCmp('jxtechnologybz').setValue(valued+'~'+valueu);
    Ext.getCmp('jxtechnologybzd').setValue(valued);
    Ext.getCmp('jxtechnologybzu').setValue(valueu);
    Ext.getCmp('jxtecbzguid').setValue(guid);


}
function selectJXSAFE() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191709/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue()+'&V_EQUCODE='+V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXSAFE(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxsafe').setValue(ss);
}

function TipRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function rendererWL(a,value, metaData, record, rowIndex, colIndex, store){
    return '<a href="javascript:goToWL(\'' + metaData.data.V_JXGX_CODE + '\')">'+a/*record.raw.V_WL_NAME*/+'</a>';
}
function loadWLgrid(){
    Ext.data.StoreManager.lookup('wlGridStore').load({
        params:{
            V_V_EQUCODE:V_EQUCODE,
            V_V_SPNAME:Ext.getCmp('WLwinbjmc').getValue()
        }
    });
}
function loadWLQgrid(V_JXGX_CODE){
    Ext.data.StoreManager.lookup('wlQueryGridStore').load({
        params:{
            V_V_JXGX_CODE:V_JXGX_CODE
        }
    });
}
function goToWL(V_JXGX_CODE){
    loadWLQgrid(V_JXGX_CODE);
    Ext.getCmp('WLQuerywin').show();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}
function saveWL_btn() {
    var seldata = Ext.getCmp('wlGridPanel').getSelectionModel().getSelection();
    var retdata = [];
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SET',
            method: 'POST',
            async: false,
            params: {
                V_V_JXGX_CODE:Ext.getCmp('jxgxbm').getValue(),
                V_V_KFNAME:'',
                V_V_WLCODE:seldata[i].data.V_SPCODE,
                V_V_WLSM:seldata[i].data.V_SPNAME,
                V_V_GGXH: '',
                V_V_JLDW: '',
                V_V_PRICE:'',
                V_V_NUM:seldata[i].data.V_NUMBER
            },
            success: function (response) {
            }
        });
        retdata.push(seldata[i].data.V_SPNAME);
    }
    Ext.getCmp('jxmaterial').setValue(retdata.toString());
    Ext.getCmp('WLwin').hide();
}

function cancelWL_btn() {
        Ext.getCmp('WLwin').hide();
}
function cancelWLQ_btn() {
    Ext.getCmp('WLQuerywin').hide();
}
function selectWL() {
    loadWLgrid();
    Ext.getCmp('WLwin').show();
    /*var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191707/index.html?V_V_JXGX_CODE=' + Ext.getCmp('jxgxbm').getValue()+'&V_ORGCODE='+V_ORGCODE+'&V_DEPTCODE='+V_DEPTCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');*/
}
function getReturnWL(data) {
    Ext.getCmp('jxmaterial').setValue(data.toString());
}
