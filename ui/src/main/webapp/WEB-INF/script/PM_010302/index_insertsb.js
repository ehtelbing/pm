var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_GUID = '';

var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var V_V_EQUNAME = '';
var V_V_FILEGUID = '';
var V_WORK_CRAFT = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_EQUTYPECODE = '';
var V_V_EQUCODE = '';
var V_V_REPAIR_NAME = '';
var V_V_WORKPER_NUM = '';
var V_V_TOOL = '';
var V_V_AQ = '';
var V_V_XZ_DEPT = '';
var V_V_INPER = '';
var V_V_INTIME = '';
var V_V_ORDER = '';
var V_V_JSYQ = '';
var V_V_REPAIR_CODE = V_V_GUID;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_EQUCODE == undefined) ? V_V_EQUCODE = '' : V_V_EQUCODE = parameters.V_V_EQUCODE;
    // (parameters.V_V_EQUNAME == '%25') ? V_V_EQUNAME = '%' : V_V_EQUNAME = parameters.V_V_EQUNAME;
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;//步骤id
}

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    // Ext.getBody().mask('<p>页面载入中...</p>');
    var northpanel = Ext.create('Ext.panel.Panel', {
        id: 'northpanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'button',
                    text: '查询',
                    style: ' margin: 5px 0px 5px 20px',
                    icon: imgpath + '/search.png',
                    handler: _selectBom
                }, {
                    xtype: 'button',
                    text: '选择',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _save
                }

            ]
        }]

    });
    var bomStore = Ext.create('Ext.data.Store', {
        id: 'bomStore',
        autoLoad: false,
        fields: ["I_ID",
            "V_EQUCODE",
            "V_EQUNAME",
            "V_SPCODE",
            "V_SPNAME",
            "V_SPTYPE",
            "V_SPCODE_OLD",
            "V_NUMBER",
            "V_MEMO",
            "D_DATE_EDITTIME",
            "V_EDIT_GUID"],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'cxy/PRO_PM_STANDARD_GX_BOM_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'V_CURSOR'
            }
        }
    });
    var bomGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'bomGridPanel',
        store: bomStore,
        region: 'center',
        // border: false,
        // baseCls: 'my-panel-no-border',
        // style: 'background-color:#FFFFFF',
        columnLines: true,
        selType: 'checkboxmodel',
        plugins:[
            Ext.create('Ext.grid.plugin.CellEditing',{
                clicksToEdit:1 //设置单击单元格编辑
            })
        ],
        columns: [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 40,
                align: 'center'
            },{
                text: '备件编码',
                dataIndex: 'V_SPCODE',
                align: 'center',
                renderer: atleft,
                width: 100
            }, {
                text: '备件名称',
                dataIndex: 'V_SPNAME',
                align: 'center',
                renderer: atleft,
                width: 200
            }, {
                text: '备件类型',
                dataIndex: 'V_SPTYPE',
                align: 'center',
                renderer: atleft,
                width: 80
            }, {
                text: '备件数量',
                dataIndex: 'V_NUMBER',
                align: 'center',
                renderer: atleft,
                width: 80,
                editor:{
                    allowBlank:true
                }
        },{
                text: '设备编码',
                dataIndex: 'V_EQUCODE',
                align: 'center',
                renderer: atleft,
                width: 100
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                renderer: atleft,
                width: 100
        }]

    });

    // Ext.create('Ext.container.Viewport', {
    //     layout: {
    //         type: 'border',
    //         regionWeights: {
    //             west: -1,
    //             north: 1,
    //             south: 1,
    //             east: -1
    //         }
    //     },
    //     items: [{
    //         region: 'center',
    //         border: false,
    //         items: [bomGridPanel]
    //     }]
    // });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            border: false,
            items: [northpanel]
        }, {
            region: 'center',
            layout: 'border',
            width: '60%',
            border: false,
            items: [bomGridPanel]
        }]

    });
    _init();
    _selectBom();
});

function _init() {
    Ext.data.StoreManager.lookup('bomStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:'',
            V_V_REPAIR_CODE: '',
            V_V_EQUTYPE: V_V_EQUCODE
        }
    });
}
function _selectBom() {
    var bomStore = Ext.data.StoreManager.lookup('bomStore');
    bomStore.proxy.extraParams = {
        V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE:'',
        V_V_REPAIR_CODE: '',
        V_V_EQUTYPE: V_V_EQUCODE

    };
    bomStore.load();
}
function _save() {
    var seldata = Ext.getCmp('bomGridPanel').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        Ext.Msg.alert('操作提示', '请选择数据！');
        return false;
    }

    for (var j = 0; j < seldata.length; j++) {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_STANDARD_GX_BOM_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,//标准id
                'V_V_SPCODE': seldata[j].data.V_SPCODE,//备件id
                'V_V_EQUCODE':seldata[j].data.V_EQUCODE,
                'V_V_NUM':seldata[j].data.V_NUMBER,
                'V_V_INPUTER':Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.V_INFO == 'Success') {
                    if(j==seldata.length){
                        window.close();
                        window.opener._selectBom(V_V_GUID);
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.V_INFO,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
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
}
function _close() {
    window.close();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
