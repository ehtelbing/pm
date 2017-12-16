var V_V_JXGX_CODE = null;
var V_ORGCODE=null;
var V_DEPTCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}


var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_KFNAME', 'V_WLCODE', 'V_WLSM','V_GGXH', 'V_JLDW', 'V_PRICE', 'V_USE_NUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_JXGX_CODE:V_V_JXGX_CODE
        }
    }
});

var KCStore = Ext.create('Ext.data.Store', {
    id: 'KCStore',
    autoLoad: false,
    fields: ['VCH_SPAREPART_CODE', 'VCH_SPAREPART_NAME', 'VCH_TYPE', 'VCH_UNIT', 'PRICE', 'VCH_FROMNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'mm/GetDepartKC_storeid',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            SAP_PLANTCODE:V_ORGCODE,
            SAP_DEPARTCODE:V_DEPTCODE,
            V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
        }
    }
});
//库房
var kfSectionStore = Ext.create('Ext.data.Store', {
    id: 'kfSectionStore',
    autoLoad: true,
    fields: ['store_id', 'store_desc'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'mm/GetStoreList',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            SAP_PLANTCODE:V_ORGCODE,
            SAP_DEPARTCODE:V_DEPTCODE,
            V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
        }
    }
});
var Layout01 = {
    layout : 'border',
    region:'north',
    height:'50%',
    items : [
        {
            xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true,
            defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {
                    xtype: 'button',
                    text: '删除',
                    icon: imgpath + '/delete.png',
                    style: 'margin:5px 0 5px 10px',
                    listeners: {
                        click: OnClickDeleteButton
                    }
                },
                {
                    xtype: 'button',
                    text: '添加完成',
                    icon: imgpath + '/saved.png',
                    style: 'margin:5px 0 5px 10px',
                    listeners: {
                        click: OnClickAddFinishButton
                    }
                }
            ]
        },
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                listeners: {
                    edit: OnChangePlanAmount
                }
            })],
            columns: [
                {
                    xtype: 'rownumberer',
                    text: '序号',
                    align: 'center',
                    width: 40
                }, {
                    text: '库房名称',
                    dataIndex: 'V_KFNAME',
                    align: 'center'
                }, {
                    text: '物料编码',
                    dataIndex: 'V_WLCODE',
                    align: 'center'
                }, {
                    text: '物料描述',
                    dataIndex: 'V_WLSM',
                    align: 'center'
                }, {
                    text: '规格型号',
                    dataIndex: 'V_GGXH',
                    align: 'center'
                }, {
                    text: '计量单位',
                    dataIndex: 'V_JLDW',
                    align: 'center'
                }, {
                    text: '单价',
                    dataIndex: 'V_PRICE',
                    align: 'center',
                    //renderer: AddRight
                }, {
                    text: '使用数量',
                    dataIndex: 'V_USE_NUM',
                    align: 'center',
                    renderer: AtEdit,
                    editor: {xtype: 'numberfield'}
                }
            ]
        }
    ]
};
var Layout02 = {
    title: '库存',
    region:'center',
    items:[
    {xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true, defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
        items: [
            {
                xtype: 'combo',
                id: 'kfSection',
                fieldLabel: '库房',
                editable: false,
                store: kfSectionStore,
                labelAlign: 'right',
                labelWidth: 60, // queryMode: 'local',
                displayField: 'store_desc',
                valueField: 'store_id',
                style: 'margin:5px 0px 5px 10px',
                queryMode: 'local'
            },{
                xtype: 'textfield',
                id: 'KCmatCode',
                emptyText: '按物料编码搜索',
                width: 158,
                style: 'margin:5px 0px 5px 75px',
            }, {
                xtype: 'textfield',
                id: 'KCmatName',
                emptyText: '按物料名称搜索',
                width: 158,
                style: 'margin:5px 0px 5px 75px',
            },{
                xtype: 'textfield',
                id: 'KWMName',
                emptyText: '按库位码搜索',
                width: 158,
                hidden: true,
                style: 'margin:5px 0px 5px 75px',
            }, {
                xtype: 'textfield',
                id: 'ggxh',
                emptyText: '按规格型号搜索',
                width: 158,
                style: 'margin:5px 0px 5px 75px',
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 10px',
                listeners: {
                    click: OnClickSelectButton
                }
            }
        ]
    },
    { xtype: 'gridpanel', region: 'center', id: 'gridKC2', autoScroll: true, columnLines: true, store: KCStore,
        listeners: {
            itemclick: OnClickKCGrid
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            width: 40
        }, {
            text: '库房名称',
            dataIndex: 'VCH_FROMNAME',
            align: 'center'
        }, {
            text: '物料编码',
            dataIndex: 'VCH_SPAREPART_CODE',
            align: 'center'
        }, {
            text: '物料描述',
            dataIndex: 'VCH_SPAREPART_NAME',
            align: 'center'
        }, {
            text: '规格型号',
            dataIndex: 'VCH_TYPE',
            align: 'center'
        }, {
            text: '计量单位',
            dataIndex: 'VCH_UNIT',
            align: 'center'
        }, {
            text: '单价',
            dataIndex: 'PRICE',
            align: 'center'
        }
        ]
    }
   ]
};
var Layout = {
    layout : 'border',
    items:[Layout01,Layout02]
}

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.get('kfSectionStore').on('load', function () {
        Ext.getCmp('kfSection').select(kfSectionStore.getAt(0));
    });
}

Ext.onReady(onPageLoaded);

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}

function OnClickSelectButton(){
    Ext.data.StoreManager.lookup('KCStore').load({
        params: {
            number: '1000',
            code: Ext.getCmp('KCmatCode').getValue(),
            name: Ext.getCmp('KCmatName').getValue(),
            sap_plantcode: '6005',//V_ORGCODE,
            sap_departcode:'60050002',//V_DEPTCODE,
            storeplace: Ext.getCmp('KWMName').getValue(),
            i_from_id: Ext.getCmp('kfSection').getValue(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        }
    });
}
function OnClickKCGrid(pp, record, item, index, e, eOpts) {
    var kfName = record.data.VCH_FROMNAME;
    var matCode = record.data.VCH_SPAREPART_CODE;
    var matDesc = record.data.VCH_SPAREPART_NAME;
    var matType = record.data.VCH_TYPE;
    var matUnit = record.data.VCH_UNIT;
    var matPrice = record.data.PRICE;
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE:V_V_JXGX_CODE,
            V_V_KFNAME:kfName,
            V_V_WLCODE:matCode,
            V_V_WLSM:matDesc,
            V_V_GGXH: matType,
            V_V_JLDW: matUnit,
            V_V_PRICE:matPrice,
            V_V_NUM:'0'
        },
        success: function (response) {
            Ext.getCmp('grid').getStore().load();
        }
    });
}
//删除
function OnClickDeleteButton() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }
    Ext.Msg .confirm("警告","确定要删除吗？",function (button) {
        if (button != "yes") {
            return false;
        }
        for (var i = 0; i < seldata.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_DEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE: V_V_JXGX_CODE,
                    V_V_WLCODE: seldata[i].data.V_WLCODE
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    Ext.MessageBox.alert('操作信息', '删除成功', resp.V_INFO);
                }
            });
        }
        Ext.ComponentManager.get('grid').getStore().load();
    });
}
function OnChangePlanAmount(editor, e, eOpts) {
    var num = e.record.data.V_USE_NUM;
    var matCode =e.record.data.V_WLCODE;
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_USENUM_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE:V_V_JXGX_CODE,
            V_V_WLCODE:matCode,
            V_V_NUM:num
        },
        success: function (response) {
            Ext.getCmp('grid').getStore().load();
        }
    });
}
function OnClickAddFinishButton() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var retdata = [];
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'basic/PM_1917_JXGX_WL_DATA_SET',
            params: {
                V_V_JXGX_CODE: V_V_JXGX_CODE,
                V_V_KFNAME: seldata[i].data.V_KFNAME,
                V_V_WLCODE:seldata[i].data.V_WLCODE,
                V_V_WLSM:seldata[i].data.V_WLSM,
                V_V_GGXH:seldata[i].data.V_GGXH,
                V_V_JLDW:seldata[i].data.V_JLDW,
                V_V_PRICE:seldata[i].data.V_PRICE,
                V_V_NUM:seldata[i].data.V_USE_NUM
            },
            success: function (response) {
                retdata.push(seldata[i].data.V_WLSM);
            }
        });
    }
    window.opener.getReturnWL(retdata);
    window.close();
}