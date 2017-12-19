var A_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
var DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var A_USERID = Ext.util.Cookies.get("v_personcode");

var A_DEPARTCODE = '';
var A_ITYPE = '';
var A_STORE_DESC = '';
var A_MATERIALCODE = '';
var A_MATERIALNAME = '';
var A_ETALON = '';
var A_LOC_DESC = '';

var deptStoreLoad = false;
var matTypeStoreLoad = false;

var power = '';
if (location.href.split('?')[1] != undefined) {
    power = Ext.urlDecode(location.href.split('?')[1]).power;
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //部门Store
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': A_PLANTCODE,
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {

                Ext.getCmp('bm').setValue(DEPTCODE);
                deptStoreLoad = true;
                _init();
            }
        }

    });

    //物资分类Store
    var matTypeStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'matTypeStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_MM_ITYPE',
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
            load: function (store, records) {
                store.insert(0, {
                    'CODE': '%',
                    'NAME': '全部'
                });
                matTypeStoreLoad = true;
                Ext.getCmp('wzfl').select(store.first());
                _init();
            }
        }
    });


    //查询库存Store
    var selectWZStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'selectWZStore',
        pageSize: 100,
        fields: ['MATERIALCODE', 'KCID', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'AMOUNT', 'F_MONEY', 'KY_AMOUNT', 'F_KYMONEY', 'I_TYPE',
            'STORE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETKC',//PG_DJ1002.GETKC
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        frame: true,
        //baseCls : 'my-panel-noborder',
        layout: 'vbox',
        width: '100%',
        style: 'margin:5px 0px 5px 5px',
        items: [{
            xtype: 'panel',
            frame: true,
            width: "100%",
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'combo',
                id: 'bm',
                fieldLabel: '部门',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width: 220,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                store: deptStore
            }, {
                xtype: 'combo',
                id: 'wzfl',
                fieldLabel: '物资分类',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width: 220,
                queryMode: 'local',
                valueField: 'CODE',
                displayField: 'NAME',
                store: matTypeStore
            }, {
                xtype: 'textfield',
                id: 'kfms',
                fieldLabel: '库房描述',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'textfield',
                id: 'wzbh',
                fieldLabel: '物资编号',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'wzmc',
                fieldLabel: '物资名称',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'gg',
                fieldLabel: '规格',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'textfield',
                id: 'cfwz',
                fieldLabel: '存放位置',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 25px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '导出Excel',
                style: 'margin:5px 0px 5px 10px',
                handler: _exportExcel,
                icon: imgpath + '/excel.gif'
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            // baseCls: 'my-panel-noborder',
            id: 'update_panel',
            hidden: true,
            items: [{
                xtype: 'textfield',
                id: 'xgkf',
                fieldLabel: '修改库房',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '确认修改',
                style: 'margin:5px 0px 5px 25px',
                icon: imgpath + '/saved.png',
                handler: _update
            }]
        }]
    });

// 显示面板
    var gridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'gridPanel',
        columnLines: true,
        autoScroll: true,
        store: selectWZStore,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [
            {
                text: '序号',
                xtype: 'rownumberer',
                width: 40,
                align: 'center'
            }, {
                text: '物资编号',
                align: 'center',
                dataIndex: 'MATERIALCODE',
                width: 120,
                renderer: atright
            },
            {
                text: '物资名称',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 120,
                renderer: atleft
            },
            {
                text: '规格',
                align: 'center',
                dataIndex: 'ETALON',
                width: 80,
                renderer: atleft
            },
            {
                text: '单位',
                align: 'center',
                dataIndex: 'UNIT',
                width: 80,
                renderer: atleft
            },
            {
                text: '单价',
                align: 'center',
                dataIndex: 'F_PRICE',
                width: 80,
                renderer: _summary
            }, {
                text: '入库数量',
                align: 'center',
                dataIndex: 'AMOUNT',
                width: 80,
                renderer: atright
            }, {
                text: '金额',
                align: 'center',
                dataIndex: 'F_MONEY',
                width: 120,
                renderer: _summary
            }, {
                text: '剩余数量',
                align: 'center',
                dataIndex: 'KY_AMOUNT',
                width: 80,
                renderer: atright
            }, {
                text: '剩余金额',
                align: 'center',
                dataIndex: 'F_KYMONEY',
                width: 120,
                renderer: _summary
            }, {
                text: '物资分类',
                align: 'center',
                dataIndex: 'I_TYPE',
                width: 80,
                renderer: atleft
            }, {
                text: '库房描述',
                align: 'center',
                dataIndex: 'STORE_DESC',
                width: 80,
                renderer: atleft
            }, {
                text: '消耗明细',
                align: 'center',
                dataIndex: 'KCID',
                width: 80,
                renderer: function (value, metadata, record) {
                    if (record.data.MATERIALCODE == '') {
                        return '';
                    } else {
                        return '<a href="#" onclick="_checkDetail(\'' + record.data.KCID + '\')">' + '查看' + '</a>';
                    }
                }
            }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: selectWZStore
        }]
    });

//整体视图容器
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (deptStoreLoad && matTypeStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
        if (power == 'update') {
            Ext.getCmp('update_panel').show();
        }
        _select();
    }
}

//查询库存
function _select() {

    A_DEPARTCODE = Ext.getCmp('bm').getValue();
    A_ITYPE = Ext.getCmp('wzfl').getValue();
    A_STORE_DESC = Ext.getCmp('kfms').getValue();
    A_MATERIALCODE = Ext.getCmp('wzbh').getValue();
    A_MATERIALNAME = Ext.getCmp('wzmc').getValue();
    A_ETALON = Ext.getCmp('gg').getValue();
    A_LOC_DESC = Ext.getCmp('cfwz').getValue();

    var selectWZStore = Ext.data.StoreManager.lookup('selectWZStore');
    selectWZStore.proxy.extraParams = {
        'A_PLANTCODE': A_PLANTCODE,
        'A_DEPARTCODE': A_DEPARTCODE,
        'A_ITYPE': A_ITYPE,
        'A_STORE_DESC': A_STORE_DESC,
        'A_MATERIALCODE': A_MATERIALCODE,
        'A_MATERIALNAME': A_MATERIALNAME,
        'A_ETALON': A_ETALON,
        'A_LOC_DESC': A_LOC_DESC,
        'A_USERID': A_USERID
    };
    selectWZStore.load();
}

//修改库房
function _update() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if ((records.length == 0 )) {
        Ext.Msg.alert('提示', '请至少选择一条数据！');// 提示
        return;
    }
    if (Ext.getCmp('xgkf').getValue() == '') {
        Ext.Msg.alert('提示', '请填写新的库房描述！');// 提示
        return;
    }
    var A_ID_LIST = new Array();

    if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
            A_ID_LIST.push(records[i].get('KCID'));
        }
        Ext.Ajax.request({
            url: AppUrl + 'ml/SETSTOREDESC',//PG_DJ1002.SETSTOREDESC
            type: 'ajax',
            method: 'POST',
            async: false,
            params: {
                'A_ID': A_ID_LIST,
                'A_NEW_STOREDESC': Ext.getCmp('xgkf').getValue()
            },

            success: function (response, options) {
                var data = Ext.decode(response.responseText);

                if (data.RET == "Success") {
                    _select();
                } else {
                    Ext.Msg.alert('操作信息', '操作失败');
                }
            }
        });
    }
}

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/GETKC_EXCEL?A_PLANTCODE=' + A_PLANTCODE +
    '&A_DEPARTCODE=' + encodeURI(encodeURI(A_DEPARTCODE)) + '&A_ITYPE=' + encodeURI(encodeURI(A_ITYPE)) +
    '&A_STORE_DESC=' + A_STORE_DESC + '&A_MATERIALCODE=' + A_MATERIALCODE + '&A_MATERIALNAME=' + A_MATERIALNAME +
    '&A_ETALON=' + A_ETALON + '&A_LOC_DESC=' + A_LOC_DESC + '&A_USERID=' + A_USERID;
}

//查看消耗明细
function _checkDetail(KCID) {
    var owidth = window.document.body.offsetWidth - 300;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_1501100201/index.html?KCID=' + KCID, '', 'height=' + oheight + ',width=' + owidth + ',top=150px,left=200px,resizable=yes');
}

/*//货币符号
 function _money(value, metadata) {
 metadata.style = "text-align:right";
 return Ext.util.Format.usMoney(value);
 }*/

//数字格式
function _summary(value, metadata) {
    metadata.style = "text-align:right";
    return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
