var A_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
var DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var DEPTNAME = Ext.util.Cookies.get('v_deptname2');

var deptStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //部门tore
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'memory',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',

            reader: {
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_DEPTCODE': DEPTCODE,
                    'V_DEPTNAME': DEPTNAME
                });
                Ext.getCmp('bm').setValue(DEPTCODE);
                deptStoreLoad = true;
                _init();
            }
        }
    });

    //物资查询Store
    var matStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'matStore',
        pageSize: -1,
        fields: ['ORDERID', 'INSERTDATE', 'DJ_VOL', 'DJ_V', 'DJ_NAME', 'DJ_CODE', 'DJ_UQ_CODE', 'DJ_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETCONSUMEBYORDER',//PG_DJ1006.GETCONSUMEBYORDER
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    //消耗待回收Store
    var recStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'recStore',
        pageSize: 100,
        fields: ['DJ_V', 'DJ_VOL', 'ID', 'ORDERID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'PLAN_AMOUNT',
            'F_MONEY', 'INSERTDATE', 'STORE_DESC', 'I_TYPE', 'REC_AMOUNT', 'MENDDEPT_NAME', 'MEND_USERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETORDERMATCONSUME',//PG_DJ1006.GETORDERMATCONSUME
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
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
        items: [{
            xtype: 'panel',
            frame: true,
            width: "100%",
            baseCls: 'my-panel-noborder',
            layout: 'column',
            items: [{
                id: 'beginDate',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),//每月的第一天
                fieldLabel: '起始日期',
                labelWidth: 70,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                id: 'endDate',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '结束日期',
                labelWidth: 70,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'jxdh',
                fieldLabel: '检修单号',
                labelWidth: 70,
                width: 220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'bm',
                fieldLabel: '部门',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 50,
                width: 220,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                store: deptStore
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _select
            }]
        }]
    });

    //回收菜单面板
    var recPanel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        frame: true,
        //baseCls : 'my-panel-noborder',
        title: '<div align="center">回收</div>',
        layout: 'column',
        width: '100%',
        items: [{
            xtype: 'textfield',
            id: 'rjxdh',
            fieldLabel: '检修单号',
            readOnly: true,
            labelWidth: 70,
            width: 240,
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '回收确认',
            style: 'margin:5px 0px 5px 10px',
            handler: _onConfirm,
            icon: imgpath + '/saved.png'
        }]
    });

    // 显示面板
    var gridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'gridPanel',
        store: matStore,
        height: window.screen.height / 3 - 70,
        columnLines: true,
        autoScroll: true,
        selType: 'checkboxmodel',
        columns: [
            {
                text: '检修单号',
                dataIndex: 'ORDERID',
                align: 'center',
                width: 120,
                renderer: atright
            },
            {
                text: '电机编号',
                dataIndex: 'DJ_CODE',
                align: 'center',
                width: 120,
                renderer: atright
            },
            {
                text: '电机名称',
                align: 'center',
                dataIndex: 'DJ_NAME',
                width: 120,
                renderer: atleft
            },
            {
                text: '电机型号',
                align: 'center',
                dataIndex: 'DJ_TYPE',
                width: 120,
                renderer: atleft
            },
            {
                text: '容量',
                align: 'center',
                dataIndex: 'DJ_VOL',
                width: 120,
                renderer: atleft
            },
            {
                text: '电压',
                align: 'center',
                dataIndex: 'DJ_V',
                width: 120,
                renderer: atleft
            }, {
                text: '物料回收',
                align: 'center',
                width: 120,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href="#" onclick="_rec(\'' + record.data.ORDERID + '\')">' + '回收' + '</a>';
                }
            }]/*,
         bbar: [{
         id: 'gpage',
         xtype: 'pagingtoolbar',
         dock: 'bottom',
         width: '100%',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: recStore
         }]*/
    })

// 回收显示面板
    var recGridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'recGridPanel',
        store: recStore,
        columnLines: true,
        autoScroll: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        listeners: {
            'beforeedit': function (editor, e, eOpts) {
                if (e.record.data.MATERIALNAME === '合计') {
                    e.cancel = true; //no permite
                } else {
                    e.cancel = false; //permite
                }

            },
            'edit': function (editor, e) {
                if (recStore.getModifiedRecords().length == 1) {
                    editSave(e.record.data.ID, e.record.data.REC_AMOUNT);
                    e.record.commit();
                }
            }
        },
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
                text: '检修单号',
                dataIndex: 'ORDERID',
                align: 'center',
                width: 120,
                renderer: atright
            },
            {
                text: '电机容量',
                dataIndex: 'DJ_VOL',
                align: 'center',
                width: 120,
                renderer: atleft
            },
            {
                text: '物资名称',
                align: 'center',
                dataIndex: 'MATERIALNAME',
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
                text: '消耗数量',
                align: 'center',
                dataIndex: 'PLAN_AMOUNT',
                width: 80,
                renderer: atright
            }, {
                text: '回收数量',
                align: 'center',
                dataIndex: 'REC_AMOUNT',
                width: 80,
                editor: {
                    xtype: 'numberfield',
                    minValue: 0,
                    allowBlank: false
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if ((record.data.MATERIALNAME != '合计')) {
                        metaData.style = 'background-color: #FFFF99;text-align:right';
                    } else {
                        metaData.style = 'text-align:right';
                    }
                    return value;
                }
            }, {
                text: '检修班组',
                align: 'center',
                dataIndex: 'MENDDEPT_NAME',
                width: 120,
                renderer: atleft
            }, {
                text: '负责人',
                align: 'center',
                dataIndex: 'MEND_USERNAME',
                width: 120,
                renderer: atleft
            }]/*,
         bbar: [{
         id: 'gpage',
         xtype: 'pagingtoolbar',
         dock: 'bottom',
         width: '100%',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: recStore
         }]*/
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
            items: [tablePanel, gridPanel, recPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [recGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
    // _select();
}

//查询消耗待回收工单
function _select() {

    var matStore = Ext.data.StoreManager.lookup('matStore');
    matStore.proxy.extraParams = {
        'A_BEGINDATE': Ext.getCmp('beginDate').getSubmitValue(),
        'A_ENDDATE': Ext.getCmp('endDate').getSubmitValue(),
        'A_ORDERID': Ext.getCmp('jxdh').getSubmitValue(),
        'A_PLANTCODE': A_PLANTCODE,
        'A_DEPARTCODE': DEPTCODE
    };
    matStore.load();
}

//查询物料回收
function _rec(ORDERID) {
    Ext.getCmp('rjxdh').setValue(ORDERID);
    _recSelect();
}

function _recSelect() {
    var recStore = Ext.data.StoreManager.lookup('recStore');
    recStore.proxy.extraParams = {
        'A_ORDERID': Ext.getCmp('rjxdh').getValue()
    };
    recStore.load();
}

//提交修改
function editSave(ID, REC_AMOUNT) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/SAVE_RECAMOUNT',//PG_DJ1006.SAVE_RECAMOUNT
        type: 'ajax',
        method: 'POST',
        params: {
            'A_ID': ID,
            'A_REC_AMOUNT': REC_AMOUNT,
            'A_USERID': Ext.util.Cookies.get("v_personcode"),
            'A_USERNAME': Ext.util.Cookies.get("v_personname2")
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);

            if (data.RET == "Success") {
                _recSelect();
            } else {
                Ext.Msg.alert('操作信息', '修改失败');
            }
        }
    });
}

function _onConfirm() {
    var A_ID_LIST = new Array();
    var records = Ext.getCmp('recGridPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.Msg.alert('提示', '请至少选择一条数据！');// 提示
        return;
    }


    if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
            A_ID_LIST.push(records[i].get('ID'));
            if (records[i].get('ORDERID') == '') {
                Ext.Msg.alert('提示', '请选择有效数据！');// 提示
                return;
            }
        }
        Ext.Ajax.request({
            url: AppUrl + 'ml/CONFIRM_REC',//PG_DJ1006.CONFIRM_REC
            type: 'ajax',
            method: 'POST',
            params: {
                'A_ID': A_ID_LIST,
                'A_USERID': Ext.util.Cookies.get("v_personcode")
            },

            success: function (response, options) {
                var data = Ext.decode(response.responseText);

                if (data.RET == "Success") {
                    _recSelect();
                }
            }
        });
    }
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
