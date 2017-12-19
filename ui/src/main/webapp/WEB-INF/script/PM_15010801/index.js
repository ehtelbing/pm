/**
 * Created by LL on 2017/12/8.
 */

Ext.onReady(function () {

    var gridStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore1',
        fields: ['MODEL_CODE', 'MODEL_NAME', 'INSERT_USERID', 'INSERT_USERNAME', 'INSERTDATE', 'USE_FLAG', 'REMARK'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/PRO_DJ801_SELECT',
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
            url: AppUrl + 'LL/PRO_DJ801_SELECTET',
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
            url: AppUrl + 'LL/PRO_DJ801_SELECTMET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }

        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        //title: '检修模型信息查询',
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
            id: 'v_modelname',
            labelWidth: 80
        }, {
            xtype: 'button',
            id: 'search',
            text: '查询',
            width: '60',
            icon: imgpath + '/search.png',
            style: ' margin: 5px 0px 10px 10px',
            listeners: {
                click: OnClickSearch
            }
        }, {
            xtype: 'button',
            id: 'toExcel',
            text: '导出Excel',
            width: '100',
            icon: imgpath + '/excel.gif',
            style: ' margin: 5px 0px 10px 10px',
            listeners: {
                click: OnClickOutExcel
            }
        }]
    });

    var grid1 = Ext.create('Ext.grid.Panel', {
        store: gridStore1,
        id: 'grid1',
        columnLines: true,
        region: 'center',
        autoScroll: true,
        selType: 'checkboxmodel',
        selModel: {
            showHeaderCheckbox: false
        },
        columns: [{
            text: '模型名称',
            align: 'center',
            width: 100,
            dataIndex: 'MODEL_NAME',
            renderer:atleft
        }, {
            text: '创建人ID',
            align: 'center',
            width: 100,
            dataIndex: 'INSERT_USERID',
            renderer:atleft
        }, {
            text: '创建人名称',
            align: 'center',
            width: 100,
            dataIndex: 'INSERT_USERNAME',
            renderer:atleft
        }, {
            text: '创建时间',
            align: 'center',
            dataIndex: 'INSERTDATE',
            width: 200,
            renderer:atleft1
        }, {
            text: '备注',
            align: 'center',
            dataIndex: 'REMARK',
            width: 150,
            renderer:atleft
        }, {
            text: '模型工序',
            align: 'center',
            renderer: LookMore
        }, {
            text: '模型物料',
            align: 'center',
            renderer: LookMore2
        }],
        dockedItems: [panel]
    });

    var window1 = Ext.create('Ext.window.Window', {
        id: 'window1',
        closeAction: 'hide',
        title: '模型工序',
        width: 590,
        height: 350,
        modal: true,
        frame: true,
        layout: 'fit',
        forceFit:true,
        items: [{
            xtype: 'panel',
            frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'border',
            items: [{
                xtype: 'grid',
                store: 'gridStore2',
                id: 'grid2',
                columnLines: true,
                region: 'center',
                autoScroll: true,
                selType: 'checkboxmodel',
                selModel: {
                    showHeaderCheckbox: false
                },
                columns: [{
                    text: '工序号',
                    id: 'gxh',
                    align: 'center',
                    width: 100,
                    dataIndex: 'ET_NO',
                    renderer:atleft
                }, {
                    text: '工序内容',
                    id: 'gxnr',
                    align: 'center',
                    width: 100,
                    dataIndex: 'ET_CONTEXT',
                    renderer:atleft
                }, {
                    text: '计划工时',
                    align: 'center',
                    id: 'jhgs',
                    width: 100,
                    dataIndex: 'PLAN_WORKTIME',
                    renderer:right
                }, {
                    text: '计划人数',
                    align: 'center',
                    id: 'jhrs',
                    dataIndex: 'PLAN_PERSON',
                    width: 100,
                    renderer:right
                }, {
                    text: '前置工序号',
                    align: 'center',
                    id: 'qzgx',
                    dataIndex: 'PRE_ET_ID',
                    width: 150,
                    renderer:atleft
                }]
            }]
        }]
    });

    var window2 = Ext.create('Ext.window.Window', {
        id: 'window2',
        closeAction: 'hide',
        title: '模型物料',
        width: 880,
        height: 350,
        modal: true,
        frame: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'border',
            items: [{
                xtype: 'grid',
                store: 'gridStore3',
                id: 'grid3',
                columnLines: true,
                region: 'center',
                autoScroll: true,
                selType: 'checkboxmodel',
                selModel: {
                    showHeaderCheckbox: false
                },
                columns: [{
                    text: '物料编码',
                    id: 'wlbm',
                    align: 'center',
                    width: 100,
                    dataIndex: 'MATERIALCODE',
                    renderer:atleft
                }, {
                    text: '物料名称',
                    id: 'wlmc',
                    align: 'center',
                    width: 100,
                    dataIndex: 'MATERIALNAME',
                    renderer:atleft
                }, {
                    text: '规格型号',
                    id: 'ggxh',
                    align: 'center',
                    width: 100,
                    dataIndex: 'ETALON',
                    renderer:atleft
                }, {
                    text: '材质',
                    id: 'cz',
                    align: 'center',
                    dataIndex: 'MAT_CL',
                    width: 100,
                    renderer:atleft
                }, {
                    text: '单位',
                    id: 'dw',
                    align: 'center',
                    dataIndex: 'UNIT',
                    width: 150,
                    renderer:atleft
                }, {
                    text: '单价',
                    id: 'dj',
                    align: 'center',
                    dataIndex: 'F_PRICE',
                    width: 150,
                    renderer:right
                }, {
                    text: '计划数量',
                    id: 'jhsl',
                    align: 'center',
                    dataIndex: 'PLAN_AMOUNT',
                    width: 150,
                    renderer:right
                }]
            }]
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
            'V_MODELNAME':Ext.getCmp('v_modelname').getValue()
        }
    });
}


function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a  onclick="OnOpen1()" style="color:blue">模型工序</a>';

}
function LookMore2(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a  onclick="OnOpen2()" style="color:blue">模型物料</a>';

}
function OnOpen1() {
    var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    Ext.getCmp('window1').show();

    Ext.data.StoreManager.lookup('gridStore2').load({
        params: {
            'V_MODELCODE':modelcode
        }
    });
}
function OnOpen2() {
   var  selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
    var modelcode = selectedRecord[0].data.MODEL_CODE;
    Ext.getCmp('window2').show();

    Ext.data.StoreManager.lookup('gridStore3').load({
        params: {
            'V_MODELCODE':modelcode
        }
    });
}
function OnClickOutExcel() {
    document.location.href=AppUrl + '/LL/No15010801Excel?V_MODELNAME='+Ext.getCmp('v_modelname').getValue()+'&&VTITLE=检修模型信息查询表';
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function atleft1(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value.split(' ')[0];
}