/**
 * Created by LL on 2017/12/8.
 */
var globalModelCode = "";
var userId = Ext.util.Cookies.get("v_personcode");
var userName = Ext.util.Cookies.get("v_personname2");

Ext.onReady(function () {
    var gridStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore1',
        fields: ['MODEL_CODE', 'MODEL_NAME', 'INSERT_USERID', 'INSERT_USERNAME', 'INSERTDATE', 'USE_FLAG', 'REMARK'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/PRO_DJ802_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore2',
        fields: ['MODEL_ET_ID', 'ET_NO', 'MODEL_CODE', 'ET_CONTEXT', 'PLAN_WORKTIME', 'PLAN_PERSON', 'PRE_ET_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/PRO_DJ802_GXSELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore3',
        fields: ['MODEL_MAT_ID', 'MODEL_CODE', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT', 'F_PRICE', 'PLAN_AMOUNT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/PRO_DJ802_WHSELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var qzgxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'qzgxStore',
        fields: ['MODEL_ET_ID', 'ET_NO'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/PRO_DJ802_GXDROPLIST',
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
                Ext.getCmp('qzgx1').select(store.first());
            }
        }
    });


    var panel = Ext.create('Ext.panel.Panel', {
        //title : '检修模型维护',
        titleAlign: 'left',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            style: ' margin: 5px 0px 10px 10px',
            value: '',
            fieldLabel: '模型名称',
            id: 'mxmc',
            labelWidth: 80
        }, {
            xtype: 'button',
            id: 'search',
            text: '查询',
            style: ' margin: 5px 0px 10px 10px',
            icon: imgpath + '/search.png',
            handler: OnClickSearch
        }, {
            xtype: 'button',
            id: 'toExcel',
            text: '添加一行',
            style: ' margin: 5px 0px 10px 10px',
            icon: imgpath + '/add.png',
            handler: addonedata
        }]
    });

    var grid1 = Ext.create('Ext.grid.Panel', {
        store: 'gridStore1',
        id: 'grid1',
        columnLines: true,
        region: 'center',
        autoScroll: true,
        forceFit: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                'edit': function (editor, e) {
                    e.record.commit();
                }
            }
        })],
        columns: [{
            text: '模型编号',
            align: 'center',
            dataIndex: 'MODEL_CODE',
            id: 'mxbh',
            field: {
                xtype: 'textfield',
                hideTrigger: true
            },
            renderer: atleft
        }, {
            text: '模型名称',
            align: 'center',
            id: 'mxmcg',
            dataIndex: 'MODEL_NAME',
            field: {
                xtype: 'textfield',
                hideTrigger: true
            },
            renderer: atleft
        }, {
            text: '创建人',
            align: 'center',
            id: 'cjr',
            dataIndex: 'INSERT_USERNAME',
            field: {
                xtype: 'textfield',
                hideTrigger: true
            },
            renderer: atleft
        }, {
            text: '创建时间',
            align: 'left',
            id: 'cjsj',
            dataIndex: 'INSERTDATE',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d',
                value: new Date(),
                editable: false
            },
            renderer: dateFormat
        }, {
            text: '使用状态',
            align: 'center',
            dataIndex: 'USE_FLAG',
            id: 'syzt',
            editor: {
                xtype: 'textfield'
            },
            renderer: atleft1
        }, {
            text: '备注',
            align: 'center',
            dataIndex: 'REMARK',
            id: 'bz',
            field: {
                xtype: 'textfield',
                hideTrigger: true
            },
            renderer: atleft

        }, {
            text: '',
            align: 'center',
            renderer: LookMoregx
        }, {
            text: '',
            align: 'center',
            renderer: LookMorewl
        }, {
            text: '',
            align: 'center',
            renderer: Rendersave
        }, {
            text: '',
            align: 'center',
            renderer: Del
        }],
        dockedItems: [panel]
    });

    var window1 = Ext.create('Ext.window.Window', {
        id: 'window1',
        closeAction: 'hide',
        title: '模型工序',
        width: 560,
        height: 350,
        modal: true,
        frame: true,
        layout: 'border',
        forceFit: true,
        items: [{
            xtype: 'panel',
            width: '100%',
            layout: 'hbox',
            frame: true,
            region: 'north',
            items: [{
                xtype: 'button',
                text: '新增',
                icon: imgpath + '/add.png',
                handler: onAdd1
            }]
        }, {
            xtype: 'grid',
            store: 'gridStore2',
            id: 'grid2',
            columnLines: true,
            region: 'center',
            autoScroll: true,
            columns: [{
                text: '工序号',
                id: 'gxh',
                align: 'center',
                width: 100,
                dataIndex: 'ET_NO'
            }, {
                text: '工序内容',
                id: 'gxnr',
                align: 'center',
                width: 100,
                dataIndex: 'ET_CONTEXT'
            }, {
                text: '计划工时',
                align: 'center',
                id: 'jhgs',
                width: 100,
                dataIndex: 'PLAN_WORKTIME'
            }, {
                text: '计划人数',
                align: 'center',
                id: 'jhrs',
                dataIndex: 'PLAN_PERSON',
                width: 100
            }, {
                text: '',
                align: 'center',
                width: 100,
                renderer: Del1
            }]

        }]
    });

    var window2 = Ext.create('Ext.window.Window', {
        id: 'window2',
        closeAction: 'hide',
        title: '模型物料',
        width: 860,
        height: 350,
        modal: true,
        frame: true,
        layout: 'border',
        items: [{
            xtype: 'panel',
            width: '100%',
            layout: 'hbox',
            frame: true,
            region: 'north',
            items: [{
                xtype: 'button',
                text: '新增',
                icon: imgpath + '/add.png',
                handler: onAdd2
            }]
        }, {
            xtype: 'grid',
            store: 'gridStore3',
            id: 'grid3',
            columnLines: true,
            region: 'center',
            autoScroll: true,
            columns: [{
                text: '物料编码',
                id: 'wlbm',
                align: 'center',
                width: 100,
                dataIndex: 'MATERIALCODE'
            }, {
                text: '物料名称',
                id: 'wlmc',
                align: 'center',
                width: 100,
                dataIndex: 'MATERIALNAME'
            }, {
                text: '规格型号',
                align: 'center',
                id: 'ggxh',
                width: 100,
                dataIndex: 'ETALON'
            }, {
                text: '材质',
                align: 'center',
                id: 'cz',
                dataIndex: 'MAT_CL',
                width: 100
            }, {
                text: '单位',
                align: 'center',
                id: 'dw',
                dataIndex: 'UNIT',
                width: 100
            }, {
                text: '单价',
                align: 'center',
                id: 'dj',
                dataIndex: 'F_PRICE',
                width: 100
            }, {
                text: '计划数量',
                align: 'center',
                id: 'jhsl',
                dataIndex: 'PLAN_AMOUNT',
                width: 100
            }, {
                text: '删除',
                align: 'center',
                width: 100,
                renderer: Del2
            }]

        }]
    });

    var panelCenter1 = Ext.create('Ext.panel.Panel', {
        xtype: 'panel',
        region: 'center',
        frame: true,
        layout: {
            type: 'vbox'
        },
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        margin: 1,
        items: [ {
            xtype: 'panel',
            layout: 'vbox',
            frame: true,
            defaults: {
                margin: 5,
                labelAlign: 'left'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: '工序号',
                id: 'gxh1'
            }, {
                xtype: 'textfield',
                fieldLabel: '工序内容',
                id: 'gxnr1'
            }, {
                xtype: 'textfield',
                fieldLabel: '计划工时',
                id: 'jhgs1'
            }, {
                xtype: 'textfield',
                fieldLabel: '计划人数',
                id: 'jhrs1'
            }, {
                xtype: 'combo',
                id: 'qzgx1',
                fieldLabel: '前置工序ID',
                store: qzgxStore,
                queryMode: 'local',
                value: '1',
                editable: false,
                valueField: 'MODEL_ET_ID',
                displayField: 'ET_NO'
            }]
        },{
            xtype: 'panel',
            width: 400,
            layout: {
                type: 'hbox'
            },
            frame: true,
            items: [{
                xtype: 'button',
                text: '确定',
                align:'right',
                icon: imgpath + '/saved.png',
                style: 'margin:30px 0px 0px 200px',
                handler: onAdd
            }]
        }]
    });


    var dialog1 = Ext.create('Ext.window.Window', {
        id: 'dialog1',
        title: '添加模型工序',
        width: 350,
        height: 300,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelCenter1]
        }]
    });

    var panelCenter2 = Ext.create('Ext.panel.Panel', {
        xtype: 'panel',
        region: 'center',
        frame: true,
        layout: {
            type: 'vbox'

        },
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        margin: 1,
        items: [{
            xtype: 'panel',
            layout: 'vbox',
            frame: true,
            defaults: {
                margin: 5,
                labelAlign: 'left'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: '物料编码',
                id: 'wlbm1'
            }, {
                xtype: 'textfield',
                fieldLabel: '物料名称',
                id: 'wlmc1'
            }, {
                xtype: 'textfield',
                fieldLabel: '规格型号',
                id: 'ggxh1'
            }, {
                xtype: 'textfield',
                fieldLabel: '材质',
                id: 'cz1'
            }, {
                xtype: 'textfield',
                fieldLabel: '单位',
                id: 'dw1'
            }, {
                xtype: 'textfield',
                fieldLabel: '单价',
                id: 'dj1'
            }, {
                xtype: 'textfield',
                fieldLabel: '计划数量',
                id: 'jhsl1'
            }]
        },{
            xtype: 'panel',
            width: 400,
            layout: {
                type: 'hbox'
            },
            frame: true,
            items: [{
                xtype: 'button',
                text: '确定',
                align:'right',
                icon: imgpath + '/saved.png',
                style: 'margin:30px 0px 0px 200px',
                handler: onAddWl
            }]
        }]
    });

    var dialog2 = Ext.create('Ext.window.Window', {
        id: 'dialog2',
        title: '添加模型物耗',
        width: 350,
        height: 380,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelCenter2]
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
            items: [grid1]
        }]
    });
});

function OnClickSearch() {
    Ext.data.StoreManager.lookup('gridStore1').load({
        params: {
            'V_MODELNAME': Ext.getCmp('mxmc').getValue()
        }
    });
}

function addonedata() {
    Ext.getStore('gridStore1').insert(Ext.getStore('gridStore1').data.items.length, {});
}

function LookMoregx(value, metaData, record, rowIdx, colIdx, store, view) {
    if (record.data.MODEL_CODE != "") {
        return '<a  href="javascript:OnOpen1()" style="color:blue">模型工序</a>';
    }

}
function LookMorewl(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a  href="javascript:OnOpen2()" style="color:blue">模型物料</a>';

}

function Rendersave(value, metaData, e, rowIndex) {
    metaData.style = 'text-align: center;';
    return "<a href='javascript:savedata(\"" + rowIndex + "\")'>保存</a>";
}

function Del(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='delFixContent(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}

function savedata(rowIdx) {
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_DJ802_INSERT',
        type: 'ajax',
        method: 'post',
        async: false,
        params: {
            'V_MODELCODE': Ext.getStore('gridStore1').getAt(rowIdx).data.MODEL_CODE,
            'V_MODELNAME': Ext.getStore('gridStore1').getAt(rowIdx).data.MODEL_NAME,
            'V_USERID': userId,
            'V_USERNAME': userName,
            'V_INSERTDATE': dateFormat(Ext.getStore('gridStore1').getAt(rowIdx).data.INSERTDATE),
            'V_USERFLAG': Ext.getStore('gridStore1').getAt(rowIdx).data.USE_FLAG == "否" ?  '0' : '1',
            'V_REMARK': Ext.getStore('gridStore1').getAt(rowIdx).data.REMARK
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET == 'Success') {
                OnClickSearch();
            } else {
                Ext.Msg.alert('提示', '操作失败');
            }
        }
    });
}
function delFixContent(rowIdx) {
    var id = Ext.data.StoreManager.lookup('gridStore1').data.getAt(rowIdx).data.MODEL_CODE;
    Ext.Msg.confirm("提示", "确定要删除吗？", function (button) {
        if (button != "yes") {
            return;
        }
        Ext.Ajax.request({
            url: AppUrl + 'LL/PRO_DJ802_DELETE',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'V_MODELCODE': id
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == "Success") {
                    OnClickSearch();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    });
}
function OnOpen1() {
    Ext.getCmp('window1').show();
    var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    globalModelCode = modelcode;
    Ext.data.StoreManager.lookup('gridStore2').load({
        params: {
            'V_MODELCODE': modelcode
        }
    });
}
function Del1(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='delFixContent1(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}
function delFixContent1(rowIdx) {
    var id = Ext.data.StoreManager.lookup('gridStore2').data.getAt(rowIdx).data.MODEL_ET_ID;
    Ext.Msg.confirm("提示", "确定要删除吗？", function (button) {
        if (button != "yes") {
            return;
        }
        Ext.Ajax.request({
            url: AppUrl + 'LL/PRO_DJ802_GXDELETE',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'V_MODELETID': id
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == "Success") {
                    OnClickSearch1();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    });
}
function OnClickSearch1() {
    var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    Ext.data.StoreManager.lookup('gridStore2').load({
        params: {
            'V_MODELCODE': modelcode
        }
    });
}
function onAdd1() {
    Ext.getCmp('dialog1').show();
}
function onAdd() {
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_DJ802_GXINSERT',
        method: 'POST',
        params: {
            'V_ETNO': Ext.getCmp('gxh1').getValue(),
            'V_MODELCODE': globalModelCode,
            'V_ETCONTEXT': Ext.getCmp('gxnr1').getValue(),
            'V_PLANWORKTIME': Ext.getCmp('jhgs1').getValue(),
            'V_PLANPERSON': Ext.getCmp('jhrs1').getValue(),
            'V_PERETID': Ext.getCmp('qzgx1').getValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == "Success") {
                Ext.getCmp('dialog1').close();
                Ext.getCmp('gxh1').reset();
                Ext.getCmp('gxnr1').reset();
                Ext.getCmp('jhgs1').reset();
                Ext.getCmp('jhrs1').reset();
                OnClickSearch1();
            } else {
                Ext.Msg.alert('提示', "操作失败！");
            }
        }
    });
}
function OnOpen2() {
    Ext.getCmp('window2').show();
    var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    globalModelCode = modelcode;
    Ext.data.StoreManager.lookup('gridStore3').load({
        params: {
            'V_MODELCODE': modelcode
        }
    });

}
function Del2(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='delFixContent2(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}
function delFixContent2(rowIdx) {
    var id = Ext.data.StoreManager.lookup('gridStore3').data.getAt(rowIdx).data.MODEL_MAT_ID;
    Ext.Msg.confirm("提示", "确定要删除吗？", function (button) {
        if (button != "yes") {
            return;
        }
        Ext.Ajax.request({
            url: AppUrl + 'LL/PRO_DJ802_WHDELETE',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'V_MODELMATID': id
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == "Success") {
                    OnClickSearch2();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    });
}
function OnClickSearch2() {
    var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    Ext.data.StoreManager.lookup('gridStore3').load({
        params: {
            'V_MODELCODE': modelcode
        }
    });
}
function onAdd2() {
    Ext.getCmp('dialog2').show();
}
function onAddWl() {
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_DJ802_WHINSERT',
        method: 'POST',
        params: {
            'V_MODELCODE': globalModelCode,
            'V_MATERIALCODE': Ext.getCmp('wlbm1').getValue(),
            'V_MATERIALNAME': Ext.getCmp('wlmc1').getValue(),
            'V_ETALON': Ext.getCmp('ggxh1').getValue(),
            'V_MATCL': Ext.getCmp('cz1').getValue(),
            'V_UNIT': Ext.getCmp('dw1').getValue(),
            'V_F_PRICE': Ext.getCmp('dj1').getValue(),
            'V_PLAN_AMOUNT': Ext.getCmp('jhsl1').getValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == "Success") {
                Ext.getCmp('dialog2').close();
                Ext.getCmp('wlbm1').reset();
                Ext.getCmp('wlmc1').reset();
                Ext.getCmp('ggxh1').reset();
                Ext.getCmp('cz1').reset();
                Ext.getCmp('dw1').reset();
                Ext.getCmp('dj1').reset();
                Ext.getCmp('jhsl1').reset();
                OnClickSearch2();
            } else {
                Ext.Msg.alert('提示', "操作失败！");
            }
        }
    });
}
function dateFormat(value, metaData) {
    if (value == "" || value == null) {
        return "";
    } else {
        return Ext.Date.format(new Date(value), 'Y-m-d');
    }

}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

function atleft1(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left";
    if (value == '1')
        return '是';
    else if(value == '是'){
        return '是';
    }
    return '否';
}