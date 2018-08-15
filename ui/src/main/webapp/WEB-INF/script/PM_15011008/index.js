/**
 * Created by LL on 2017/12/13.
 */
var userId = Ext.util.Cookies.get("v_personcode");
var userName = Ext.util.Cookies.get("v_personname2");
var deptCode = Ext.util.Cookies.get("v_deptcode");
var orgcode = Ext.util.Cookies.get("v_orgCode");
var kc_id;
var code;

Ext.onReady(function () {

    var wzflStore = Ext.create('Ext.data.Store', {// 物资分类
        autoLoad: true,
        storeId: 'wzflStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_MM_ITYPE',
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
            load: function (store) {
                store.insert(0, {
                    'CODE': '%',
                    'NAME': '全部'
                });
                Ext.getCmp('wzfl').select(store.first());
            }
        }
    });

    var gridStorekc = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStorekc',
        fields: ['KCID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
            'F_PRICE', 'KY_AMOUNT', 'STORE_DESC', 'NUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/GETMATKC',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    /** 检修班组 */
    var plantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'plantStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ601_MENDDEPT_GROUP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'DEPTCODE_IN': deptCode
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('wbz').select(store.first());
            }
        }
    });

    /** 负责人 */
    var responsibleStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'responsibleStore',
        fields: ['USERID', 'USERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ601_PERSON',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('responsible').select(store.first());
            },
            beforeload: _seekRespLoad
        }
    });

    var typeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'typeStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_MM_ITYPE',
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
            load: function (store) {
                Ext.getCmp('matType').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        fields: ['APPLYID', 'MATERIALNAME', 'ETALON', 'UNIT', 'AMOUNT', 'GROUPNAME', 'REMARK', 'APPLY_DATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/GETAPPLYMAT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        titleAlign: 'left',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            //frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'begindate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '起始日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                editable: false,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'enddate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '结束日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                editable: false,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                xtype: 'combo',
                id: 'wzfl',
                fieldLabel: '物资分类',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 80,
                queryMode: 'local',
                valueField: 'CODE',
                displayField: 'NAME',
                store: wzflStore
            }, {
                xtype: 'textfield',
                id: 'wlmc',
                fieldLabel: '物料名称',
                labelWidth: 80,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            //frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: '查询',
                labelWidth: 80,
                style: 'margin:5px 10px 5px 35px',
                icon: imgpath + '/search.png',
                handler: onSearch
            }, {
                xtype: 'button',
                text: '新增',
                labelWidth: 80,
                style: 'margin:5px 0px 5px 5px',
                icon: imgpath + '/add.png',
                handler: OnAdd
            }, {
                xtype: 'button',
                text: '导出excel',
                labelWidth: 80,
                style: 'margin:5px 0px 5px 5px',
                handler: OnClickOutExcel,
                icon: imgpath + '/excel.gif'
            }, {
                xtype: 'button',
                text: '打印',
                labelWidth: 80,
                style: 'margin:5px 0px 5px 5px',
                handler: OnBtnPrint,
                icon: imgpath + '/printer.png'
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        columnLines: true,
        width: '100%',
        autoScroll: true,
        store: gridStore,
        dufaults: {
            width: 120
        },
        columns: [{
            text: '删除',
            align: 'center',
            width: 60,
            renderer: deleteMore
        }, {
            text: '日期',
            dataIndex: 'APPLY_DATE',
            align: 'center',
            width: 140,
            renderer: atleft1
        }, {
            text: '材料/备件名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 130
        }, {
            text: '规格',
            dataIndex: 'ETALON',
            align: 'center',
            width: 130
        }, {
            text: '单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 110
        }, {
            text: '数量',
            dataIndex: 'AMOUNT',
            align: 'center',
            width: 110
        }, {
            text: '班组',
            dataIndex: 'GROUPNAME',
            align: 'center',
            width: 110
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 110
        }],
        dockedItems: [inputPanel]
    });

    var inputPanel1 = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel1',
        xtype: 'panel',
        region: 'north',
        frame: true,
        layout: {
            type: 'vbox'
        },
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        margin: 1,
        items: [{
            xtype: 'datefield',
            id: 'wdqrq',
            fieldLabel: '日期',
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right',
            labelWidth: 60,
            value: new Date(),
            format: 'Y-m-d',
            editable: false
        }, {
            id: 'wmc',
            xtype: 'textfield',
            style: ' margin: 5px 0px 5px 5px',
            fieldLabel: '名称',
            labelAlign: 'right',
            readOnly: true,
            labelWidth: 60
        }, {
            id: 'wgg',
            xtype: 'textfield',
            style: ' margin: 5px 0px 5px 5px',
            fieldLabel: '规格',
            labelAlign: 'right',
            readOnly: true,
            labelWidth: 60
        }, {
            id: 'wdw',
            xtype: 'textfield',
            style: ' margin: 5px 0px 5px 5px',
            fieldLabel: '单位',
            labelAlign: 'right',
            readOnly: true,
            labelWidth: 60
        }, {
            id: 'wsl',
            xtype: 'numberfield',
            style: ' margin: 5px 0px 5px 5px',
            fieldLabel: '数量',
            labelAlign: 'right',
            labelWidth: 60
        }, {
            id: 'wbz',
            xtype: 'combo',
            fieldLabel: '班组',
            labelWidth: 60,
            editable: false,
            queryMode: 'local',
            labelAlign: 'right',
            style: ' margin: 5px 0px 5px 5px',
            displayField: 'MENDDEPT_NAME',
            valueField: 'MENDDEPT_CODE',
            store: plantStore,
            listeners: {
                change: function (store, newValue, oldValue, eOpts) {
                    if (oldValue == '' || oldValue == null) {
                        Ext.data.StoreManager.lookup('responsibleStore').load();
                    } else {
                        Ext.data.StoreManager.lookup('responsibleStore').load();
                    }
                }
            }
        }, {
            id: 'responsible',
            xtype: 'combo',
            fieldLabel: '负责人',
            editable: false,
            labelWidth: 60,
            queryMode: 'local',
            labelAlign: 'right',
            displayField: 'USERNAME',
            valueField: 'USERID',
            style: ' margin: 5px 0px 5px 5px',
            store: responsibleStore
        }, {
            id: 'wbeiz',
            xtype: 'textfield',
            style: ' margin: 5px 0px 5px 5px',
            fieldLabel: '备注',
            labelAlign: 'right',
            labelWidth: 60
        }]
    });

    var dialog = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '新增',
        width: 350,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [inputPanel1]
        }],
        buttons: [{
            margin: '0px 0px 0px 10px',
            text: '查询库存',
            icon: imgpath + '/search.png',
            handler: _searchStock
        }, {
            text: '保存',
            margin: '0px 0px 0px 10px',
            icon: imgpath + '/add.png',
            handler: _save
        }, {
            text: '取 消',
            icon: imgpath + '/cross.png',
            margin: '0px 0px 0px 10px',
            handler: _delete
        }]
    });

    var listkc = Ext.create('Ext.panel.Panel', {
        region: 'north',
        bodyStyle: {
            background: 'none'
        },
        border: 0,
        defaults: {
            labelAlign: 'right',
            labelWidth: 60
        },
        items: [{
            frame: true,
            style: 'margin-bottom:1px',
            defaults: {
                labelAlign: 'right',
                labelWidth: 80

            },
            layout: {
                type: 'table',
                columns: 3
            },
            items: [{
                id: 'matType',
                xtype: 'combo',
                fieldLabel: '物资分类',
                editable: false,
                store: typeStore,
                displayField: 'CODE',
                valueField: 'NAME',
                queryMode: 'local',
                style: ' margin: 10px 0px 10px 5px',
                labelAlign: 'right'
            }, {
                id: 'matCode',
                xtype: 'textfield',
                fieldLabel: '物料编码',
                style: ' margin: 10px 0px 10px 5px'
            }, {
                id: 'matName',
                xtype: 'textfield',
                style: ' margin: 10px 0px 10px 5px',
                fieldLabel: '物料名称'
            }, {
                id: 'etalon',
                xtype: 'textfield',
                style: ' margin: 10px 0px 10px 5px',
                fieldLabel: '规格型号'
            }, {
                xtype: 'button',
                text: '库存查询',
                style: ' margin: 10px 0px 10px 5px',
                icon: imgpath + '/search.png',
                handler: _seekStock
            }]
        }]
    });

    var gridkc = Ext.create('Ext.grid.Panel', {
        id: 'gridkc',
        region: 'center',
        columnLines: true,
        width: '100%',
        autoScroll: true,
        store: gridStorekc,
        dufaults: {
            width: 120
        },
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        forceFit: true,
        columns: [{
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 150
        }, {
            text: '物资名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 140
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            width: 100
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            flex: 1
        }, {
            text: '当前单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            flex: 1
        }, {
            text: '库存数量',
            dataIndex: 'KY_AMOUNT',
            align: 'center',
            width: 100
        }, {
            text: '库存位置',
            dataIndex: 'STORE_DESC',
            align: 'center',
            width: 100
        }, {
            text: '选择',
            align: 'center',
            width: 60,
            renderer: LookMorexzdj
        }],
        dockedItems: [listkc]
    });

    var dialog2 = Ext.create('Ext.window.Window', {
        id: 'dialog2',
        title: '查询库存',
        width: 1000,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridkc]
        }],
        buttons: [{
            text: '取 消',
            icon: imgpath + '/cross.png',
            margin: '0px 0px 0px 10px',
            handler: _deleteStock
        }]
    });

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
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});

function onSearch() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            'A_BEGINDATE': Ext.Date.format(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
            'A_ENDDATE': Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
            'A_ITYPE': Ext.getCmp('wzfl').getValue(),
            'A_NAME': Ext.getCmp('wlmc').getValue()
        }
    });
}

function OnClickOutExcel() {
    document.location.href = AppUrl + '/LL/No15011008Excel?A_BEGINDATE=' + Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d')
    + '&&A_ENDDATE=' + Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    + '&&A_ITYPE=' + encodeURI(encodeURI(Ext.getCmp('wzfl').getValue()))
    + '&&A_NAME=' + Ext.getCmp('wlmc').getValue()
    + '&&VTITLE=物资申料单管理';
}
function deleteMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='openDelete(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}

function openDelete(rowIdx) {
    var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.APPLYID;
    Ext.Msg.confirm("提示", "确定要删除吗？", function (button) {
        if (button != "yes") {
            return;
        }
        Ext.Ajax.request({
            url: AppUrl + 'LL/DELETEAPPLYMAT',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'A_APPLYID': id,
                'A_USERID': userId,
                'A_USERNAME': userName
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET2 == "Success") {
                    onSearch();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    });
}

function OnAdd() {
    Ext.getCmp('dialog').show();
    kc_id = '';
}

function _searchStock() {
    Ext.getCmp('dialog2').show();
    _seekStock();
}

function _seekStock() {
    Ext.getStore('gridStorekc').load({
        params: {
            'A_PLANTCODE': orgcode,
            'A_DEPARTCODE': deptCode,
            'A_ITYPE': Ext.getCmp('matType').getValue(),
            'A_MATERIALCODE': Ext.getCmp('matCode').getValue(),
            'A_MATERIALNAME': Ext.getCmp('matName').getValue(),
            'A_ETALON': Ext.getCmp('etalon').getValue()
        }
    })

}

function LookMorexzdj(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a  href="javascript:OpenDj(' + rowIdx + ')" >选择</a>';
}

function OpenDj(rowIdx) {
    kc_id = Ext.getStore('gridStorekc').data.items[rowIdx].data.KCID;
    code = Ext.getStore('gridStorekc').data.items[rowIdx].data.MATERIALCODE;
    Ext.getCmp('wmc').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.MATERIALNAME);
    Ext.getCmp('wgg').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.ETALON);
    Ext.getCmp('wdw').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.UNIT);
    Ext.getCmp('wsl').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.KY_AMOUNT);
    _deleteStock();
}
function _seekRespLoad(store) {
    store.proxy.extraParams = {
        'MENDDEPT_CODE_IN': Ext.getCmp('wbz').getValue()
    }
}
function _delete() {
    Ext.getCmp('dialog').hide();
}

function _deleteStock() {
    Ext.getCmp('dialog2').hide();
    Ext.getCmp('matCode').reset();
    Ext.getCmp('matName').reset();
    Ext.getCmp('etalon').reset();
}

function _save() {
    if (kc_id != '') {
        Ext.Ajax.request({
            url: AppUrl + 'LL/SAVEAPPLYMAT',
            method: 'POST',
            params: {
                'A_CODE': code,
                'A_NAME': Ext.getCmp('wmc').getValue(),
                'A_ETALON': Ext.getCmp('wgg').getValue(),
                'A_UNIT': Ext.getCmp('wdw').getValue(),
                'A_ITYPE': Ext.getCmp('matType').getValue(),
                'A_AMOUNT': Ext.getCmp('wsl').getValue(),
                'A_APPLYDATE': Ext.Date.format(Ext.getCmp('wdqrq').getValue(), 'Y-m-d'),
                'A_REMARK': Ext.getCmp('wbeiz').getValue(),
                'A_GROUPNAME': Ext.getCmp('wbz').getRawValue(),
                'A_LYPERSONID': Ext.getCmp('responsible').getValue(),
                'A_LYPERSON': Ext.getCmp('responsible').getRawValue(),
                'A_USERID': userId,
                'A_USERNAME': userName,
                'A_KCID': kc_id
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET2 == "Success") {
                    _delete();
                    kc_id = '';
                    Ext.getCmp('wmc').reset();
                    Ext.getCmp('wgg').reset();
                    Ext.getCmp('wdw').reset();
                    Ext.getCmp('wsl').reset();
                    Ext.getCmp('wbeiz').reset();
                    onSearch();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    } else {
        Ext.Msg.alert("提示", '请在库存中选择要申领的物资，不可手工添加');
    }
}

function OnBtnPrint() {
    window.open(AppUrl + "page/PM_1501100801/index" + '.html?begindate=' + Ext.Date.format(Ext.getCmp('begindate').getValue(), 'Y-m-d').toString()
        + '&enddate=' + Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d').toString()
        + '&itype=' + Ext.getCmp('wzfl').getValue().replace('%', '@')
        + '&name=' + Ext.getCmp('wlmc').getValue(),
        "", "dialogHeight:700px;dialogWidth:1100px");

}

function atleft1(value, metaData) {
    if (value == "" || value == null) {
        return "";
    } else {
        var year = value.substring(0, 4);
        var month = value.substring(4, 6);
        var day = value.substring(6, 8);
        var newDate =  year + '-' + month + '-' + day;
        return newDate;
    }

}
