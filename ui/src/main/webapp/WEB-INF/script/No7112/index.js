var departStoreLoad = false;
var I_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    //作业区
    var departStore = Ext.create('Ext.data.Store', {
        storeId: 'departStore',
        autoLoad: true,
        //pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                var falg='0';
                for(var i=0;i<store.getCount();i++){
                    var recored = store.getAt(i);
                    if(recored.get('V_DEPTCODE')==I_DEPTCODE){
                        falg=i;
                        break;
                    }
                }
                Ext.getCmp('V_V_DEPTCODE').select(records[falg]);
                //Ext.getCmp('V_V_DEPTCODE').setValue(I_DEPTCODE);
                departStoreLoad = true;
                _init();
            }
        }
    });

    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['EQU_ID', 'EQU_DESC'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_EQUCODE').select(store.first());
            }
        }
    });

    var checkLogStore = Ext.create('Ext.data.Store', {
        storeId: 'checkLogStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['LOGID', 'BJ_UNIQUE_CODE', 'CHECKDATE', 'CHECK_USERID', 'CHECK_USERNAME', 'CONTEXT', 'INSERPERSONID',
            'INSERTPERSON', 'INSERTDATE', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'BJ_ID', 'SITE_ID', 'BJ_DESC',
            'NEWOROLD', 'SITE_DESC', 'CHANGEDATE', 'ADMIN', 'BJ_STATUS', 'PLANTCODE', 'DEPARTCODE', 'EQU_ID', 'PLANTNAME',
            'DEPARTNAME', 'EQU_NAME', 'DESC_UNIT', 'TAG_VALUE'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN7112_CHECKLOGLIST',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: departStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEqu();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUCODE',
                store: equStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择设备',
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_V_ID',
                fieldLabel: '备件唯一标识',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_V_BTIME',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '起始日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                id: 'V_V_ETIME',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: '结束日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                width: 70,
                handler: _selectCheckLog,
                style: ' margin: 5px 0px 5px 15px',
                icon: imgpath + '/search.png'
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        //title: '<div align="center">定额预算表</div>',
        store: checkLogStore,
        frame: true,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '检查时间',
            dataIndex: 'CHECKDATE',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = "text-align:left;";
                return Ext.util.Format.date(value, "Y-m-d");
            }
        }, {
            text: '检查设备名称',
            dataIndex: 'EQU_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '位置描述',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备件名称',
            dataIndex: 'BJ_DESC',
            align: 'center',
            width: 160,
            renderer: atleft
        }, {
            text: '指标描述',
            dataIndex: 'DESC_UNIT',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '指标值',
            dataIndex: 'TAG_VALUE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '检查内容',
            dataIndex: 'CONTEXT',
            align: 'center',
            summaryType: 'sum',
            width: 120,
            renderer: atleft
        }, {
            text: '检查人',
            dataIndex: 'CHECK_USERNAME',
            align: 'center',
            summaryType: 'sum',
            width: 80,
            renderer: atleft
        }, {
            text: '作业区',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '查看检查图片',
            dataIndex: 'VERSION_STATUS_DESC',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:_openImgicWindow(\'</a><a href="#" onclick="_show(\'' + record.data.LOGID + '\')">' + '查看' + '</a>';
            }
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
            region: 'north',
            border: false,
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: window.screen.width / 2 - 110,
                    height: window.screen.height / 2 + 38,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    var imageWindow = Ext.create('Ext.window.Window', {
        id: 'imageWindow',
        title: '<div align="center">检查图片</div>',
        width: window.screen.width / 2 - 110,
        height: window.screen.height / 2 + 38,
        modal: true,
        closable: true,
        closeAction: 'close',
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [viewImagePanel]
        }]
    });

    _init();
});

function _init() {
    if (departStoreLoad) {

        //_selectProjBudgetItemTable();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectEqu() {
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        'V_V_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue()
    };

    equStore.load();
}

function _selectCheckLog() {

    var checkLogStore = Ext.data.StoreManager.lookup('checkLogStore');
    checkLogStore.proxy.extraParams = {
        V_V_EQUCODE: Ext.getCmp('V_V_EQUCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_ID: Ext.getCmp('V_V_ID').getValue(),
        V_V_BTIME: Ext.getCmp('V_V_BTIME').getSubmitValue(),
        V_V_ETIME: Ext.getCmp('V_V_ETIME').getSubmitValue()
    };
    checkLogStore.load();
}

function _show(LOGID) {
    Ext.getCmp('imageWindow').show();
    _preViewImage(LOGID);
}

function _preViewImage(LOGID) {
    var url = AppUrl + 'PM_12/ImgDownLoad?V_V_ID=' + LOGID;

    Ext.getCmp("browseImage").getEl().dom.src = url;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function _openImgicWindow(V_ZG_GUID) {
    Ext.data.StoreManager.lookup('aqcsfjStore1').load({
        params: {
            V_V_GUID: V_ZG_GUID
        }
    });
    Ext.getCmp('attachWindow').show();
}