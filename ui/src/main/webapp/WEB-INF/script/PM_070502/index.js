
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_DESCRIPTION', 'V_SUGGESTION', 'I_ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_DEFECTDESCRIPTION_L',
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
        { xtype: 'gridpanel', title: '异常现象及建议选择窗口',  region: 'center', plugins: [{ptype: 'cellediting', clicksToEdit: 1}], columnLines: true, id: 'grid', store: 'gridStore',
            listeners: { itemdblclick: gridDblClick},
            features: [{ ftype: 'summary' }],
            columns: [
                { xtype: 'rownumberer', text: '序号', width: 35, align: 'center'
                },
                { text: '异常现象', align: 'center', width: 330, dataIndex: 'V_DESCRIPTION', renderer: renderFont },
                { text: '建议', align: 'center', width: 320, dataIndex: 'V_SUGGESTION', renderer: renderFont }
            ],
            bbar: ['->',
                { xtype: 'panel', baseCls: 'my-panel-no-border', layout: 'column',
                    items: [
                        { xtype: 'button', text: '选择', icon: imgpath + '/saved.png', handler: selectRecord,  style: { margin: '5px 0px 5px 0px'}},
                        { xtype: 'button', text: '取消', handler: QX, icon: imgpath + '/tree_dnd_no.png',  style: { margin: '5px 10px 5px 10px'}}
                    ]
                }
            ]
        }
    ]
};


function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    if(location.href.split('?')[1] != undefined){
        queryGrid();
    }
}

function Create_OBJ(ycxx,jy){
    this.description= ycxx;
    this.suggestion= jy;
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_EQUCODE : Ext.urlDecode(location.href.split('?')[1]).equcode
        }
    });
}

function gridDblClick( me, record, item, index, e, eOpts){
    var asd = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
    var aobj = new Create_OBJ(record.data.V_DESCRIPTION , record.data.V_SUGGESTION);
    window.opener.getReturnValue(aobj);
    window.close();
}

function selectRecord(){
    var asd = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
    var aobj = new Create_OBJ(asd.V_DESCRIPTION , asd.V_SUGGESTION);
    window.opener.getReturnValue(aobj);
    window.close();
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}

function QX(){
    window.close();
}
Ext.onReady(onPageLoaded);
