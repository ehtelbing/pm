var KCPlantStore = Ext.create('Ext.data.Store', {
    id: 'KCPlantStore',
    autoLoad: true,
    fields: ['V_DEPTNAME', 'V_DEPTCODE', 'V_SAP_DEPT', 'V_SAP_JHGC', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            IS_V_DEPTCODE: Ext.util.Cookies.get("v_orgCode"),
            IS_V_DEPTTYPE: "[基层单位]"
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var KCSectionStore = Ext.create('Ext.data.Store', {
    id: 'KCSectionStore',
    autoLoad: false,
    fields: ['V_DEPTNAME', 'V_DEPTCODE', 'V_SAP_DEPT', 'V_SAP_JHGC', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'lxm/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var kfSectionStore = Ext.create('Ext.data.Store', {
    id: 'kfSectionStore',
    autoLoad: false,
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
        }
    }
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    id:'gridStore',
    fields: ['VCH_SPAREPART_CODE', 'VCH_SPAREPART_NAME',
        'VCH_TYPE', 'VCH_UNIT', 'PRICE', 'ABLECOUNT',
        'VCH_FROMNAME', 'ID'],
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
        }
    }
});

var Layout = {
    layout : 'border',
    items : [
        {
            xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true,/* baseCls: 'my-panel-no-border',*/
            defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {
                    xtype: 'combo',
                    id: 'selKCPlant',
                    fieldLabel: '厂矿',
                    editable: false,
                    store: KCPlantStore,
                    labelAlign: 'right',
                    labelWidth: 30, // queryMode: 'local',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    style: 'margin:5px 0 0 10px',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    id: 'selKCSection',
                    fieldLabel: '作业区',
                    editable: false,
                    store: KCSectionStore,
                    labelAlign: 'right',
                    labelWidth: 60, // queryMode: 'local',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    style: 'margin:5px 0 0 10px',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    id: 'kfSection',
                    fieldLabel: '库房',
                    editable: false,
                    store: kfSectionStore,
                    labelAlign: 'right',
                    labelWidth: 60, // queryMode: 'local',
                    displayField: 'store_desc',
                    valueField: 'store_id',
                    style: 'margin:5px 0 0 10px',
                    queryMode: 'local'
                },  {
                    xtype: 'textfield',
                    id: 'KCmatCode',
                    emptyText: '按物料编码搜索',
                    width: 100,
                    style: 'margin:5px 0 0 10px'
                }, {
                    xtype: 'textfield',
                    id: 'KCmatName',
                    emptyText: '按物料名称搜索',
                    width: 100,
                    style: 'margin:5px 0 0 10px'
                }, {
                    xtype: 'textfield',
                    id: 'KWMName',
                    emptyText: '按库位码搜索',
                    width: 100,
                    hidden: true,
                    style: 'margin:5px 0 0 10px'
                }, {
                    xtype: 'textfield',
                    id: 'ggxh',
                    emptyText: '按规格型号搜索',
                    width: 100,
                    style: 'margin:5px 0 0 10px'
                },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png', style: { margin: ' 5px 0 5px 10px'}},
                { xtype: 'button', text: '选择', handler: select,  icon: imgpath + '/add.png', style: { margin: ' 5px 0 5px 10px'}}
            ]
        },
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',
            columns: [
                {
                    xtype: 'rownumberer',
                    text: '序号',
                    align: 'center',
                    width: 40
                }, {
                    text: '库房名称',
                    dataIndex: 'VCH_FROMNAME',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料编码',
                    dataIndex: 'VCH_SPAREPART_CODE',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料描述',
                    dataIndex: 'VCH_SPAREPART_NAME',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '规格型号',
                    dataIndex: 'VCH_TYPE',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '计量单位',
                    dataIndex: 'VCH_UNIT',
                    align: 'center'
                }, {
                    text: '单价',
                    dataIndex: 'PRICE',
                    align: 'center',
                    renderer: AddRight
                }, {
                    text: '库存数量',
                    dataIndex: 'ABLECOUNT',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '库存ID',
                    dataIndex: 'ID',
                    align: 'center',
                    renderer: AddFloat
                }
            ]
        }
    ]
};


function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.get('KCPlantStore').on('load', function () {
        Ext.getCmp('selKCPlant').select(Ext.data.StoreManager.get('KCPlantStore').getAt(0));
        Ext.data.StoreManager.get('KCSectionStore').load({
                params: {
                    V_DEPTCODE: Ext.util.Cookies.get("v_orgCode"),
                    V_DEPTTYPE: "[主体作业区]",
                    V_V_PERSON: Ext.util.Cookies.get("v_personcode")
                }
            });
    });

    Ext.data.StoreManager.get('KCSectionStore').on('load', function () {
        Ext.getCmp('selKCSection').select(KCSectionStore.getAt(0));
        Ext.data.StoreManager.lookup('kfSectionStore').load(
            {
                params: {
                    SAP_PLANTCODE: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                    SAP_DEPARTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                    V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
                }
            });
    });

    Ext.data.StoreManager.get('kfSectionStore').on('load', function () {
        Ext.getCmp('kfSection').select(kfSectionStore.getAt(0));
    });

    Ext.getCmp('selKCPlant').on('select',function () {
            Ext.data.StoreManager.get('KCSectionStore').load(
                {
                    params: {
                        V_DEPTCODE: Ext.util.Cookies.get("v_orgCode"),
                        V_DEPTTYPE: "[主体作业区]",
                        V_V_PERSON:Ext.util.Cookies.get("v_personcode")
                    }
                });

        });

    Ext.getCmp('selKCSection').on('select',function(){
        Ext.data.StoreManager.lookup('kfSectionStore').load(
            {
                params: {
                    SAP_PLANTCODE: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                    SAP_DEPARTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                    V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
                }
            });
    });
}

function queryGrid(){
    Ext.data.StoreManager.get('gridStore').load({
        params: {
            number: '1000',
            code: Ext.getCmp('KCmatCode').getValue(),
            name: Ext.getCmp('KCmatName').getValue(),
            sap_plantcode: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
            sap_departcode: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
            storeplace: Ext.getCmp('KWMName').getValue(),
            i_from_id: Ext.getCmp('kfSection').getValue(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        }
    });
}

function select(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
    }
    else{
        window.opener.getReturnValue(seldata);
        window.close();
    }
}


function AddFloat(value, metaData, record, rowIndex, colIndex,
                  store, view) {
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function AddRight(value, metaData, record, rowIndex, colIndex,
                  store, view) {
    return '<div style="text-align:right;" data-qtip="' + value
        + '" >' + value + '</div>';
}
Ext.onReady(onPageLoaded);
