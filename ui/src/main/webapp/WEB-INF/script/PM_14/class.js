var V_DEPTCODE = "";
var V_GUID = "";
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

var seldata;
var seledit = 0;
var slecode;
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 100,
    fields: ['V_CLASS_CODE', 'V_CLASS_NAME', 'V_DEPTNAME', 'V_SAP_WORKNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + 'pm_14/PRO_CLASS_M_QUERY',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var sgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sgridStore',
    pageSize: 100,
    fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_CLASS_NAME', 'V_ROLECODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var agridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'agridStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var creatpanel = Ext.create('Ext.form.Panel', {
    id: 'creatpanel',
    style: 'margin:5px 0px 2px 2px',
    region: 'north',
    width: '100%',
    baseCls: 'my-panel-no-border',
    defaults: {
        labelAlign: 'right'
    },
    layout: {
        type: 'vbox'
    },
    items: [
        {
            xtype: 'panel',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-noborder',
            width: '100%',
            items: [{
                xtype: 'textfield',
                id: 'bzmc',
                fieldLabel: '班组名称',
                labelWidth: 80,
                labelAlign: 'right',
                emptyText: '请输入班组名称',
                style: ' margin: 10px 0px 5px 10px'
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                width: 70,
                handler: query,
                style: ' margin: 10px 0px 5px 10px'
            }, {
                xtype: 'button',
                text: '选择',
                icon: imgpath + '/cog.png',
                width: 70,
                handler: select,
                style: ' margin: 10px 0px 5px 10px'
            }]
        }]
});
var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    autoScroll: true,
    selModel: {      //复选框
        selType: 'checkboxmodel'
    },
    columns: [{
        text: '班组编号 ',
        dataIndex: 'V_CLASS_CODE',
        align: 'center',
        width: 350
    }, {
        text: '班组名称',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        labelAlign: 'right',
        width: 220
    }, {
        text: '工作中心',
        dataIndex: 'V_SAP_WORKNAME',
        align: 'center',
        width: 350
    }, {
        text: '作业区',
        dataIndex: 'V_DEPTNAME',
        align: 'center',
        width: 150
    }, {
        text: '人员',
        align: 'center',
        width: 100,
        renderer: function (value, metaData, record,
                            rowIdx, colIdx, store, view) {
            return '<a href=javascript:tosee(\'' + rowIdx + '\');>查看</a>';
        }
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }]
});

var sgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'sgrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: sgridStore,
    autoScroll: true,
    height: '100%',
    columns: [{
        text: '序号',
        align: 'center',
        xtype: 'rownumberer',
        width: 50
    }, {
        text: '人员编号 ',
        dataIndex: 'V_PERSONCODE',
        align: 'center',
        width: 150
    }, {
        text: '人员名称',
        dataIndex: 'V_PERSONNAME',
        align: 'center',
        width: 100
    }, {
        text: '是否组长',
        dataIndex: 'V_ROLECODE',
        align: 'center',
        width: 100,
        renderer: function (value) {
            if (value == '11') {
                return '是';
            } else return '否';
        }
    }, {
        text: '所在班组',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        flex: 1
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'sgridStore'
    }, {
        xtype: 'button',
        text: '关闭',
        icon: imgpath + '/delete.png',
        width: 65,
        handler: close_btn
    }]
});
var seewin = Ext.create('Ext.window.Window', {
    id: 'seewin',
    width: 665,
    height: 400,
    layout: 'fit',//自定义
    frame: true,
    title: '班组人员查看',
    closeAction: 'hide',
    closable: true,
    items: [sgrid]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [creatpanel, grid]
    });
    query();
});
// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params: {
                parName: ['IN_DEPARTCODE', 'IN_CLASSNAME'],
                parType: ['s', 's'],
                parVal: [V_DEPTCODE,
                    Ext.getCmp("bzmc").getValue()],
                proName: 'PRO_CLASS_M_QUERY',
                cursorName: 'RET'
            }
        });
}

function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length != 1){
        alert("请选择一个班组");
        return false;
    }
    var arr =[];
    Ext.Ajax.request({
        url: APP + '/ModelChange',
        params: {
            parName: ['V_V_GUID',
                'V_V_CLASSCODE',
                'V_V_PERCODE'
            ],
            parType: ['s', 's','s'],
            parVal: [
                V_GUID,
                seldata[0].data.V_CLASS_CODE,
                 '%'
            ],
            proName: ['PM_14_FAULT_PER_CLASS_SET'],
            returnStr: ["V_INFO"],
            returnStrType: ["s"]
        }, success: function (resp) {
            Ext.Ajax.request({
                url: APP + '/ModelChange',
                params: {
                    parName: ['V_V_PERCODE',
                        'V_V_IP',
                        'V_V_GUID'
                    ],
                    parType: ['s', 's','s'],
                    parVal: [
                        Ext.util.Cookies.get('v_personcode'),
                        Ext.fly('localIp').getValue(),
                        V_GUID
                    ],
                    proName: ['PM_14_FAULT_ITEM_DATA_SEND'],
                    returnStr: ["V_INFO"],
                    returnStrType: ["s"]
                },
                success: function (resp){
                    arr.push(seldata[0].data.V_CLASS_CODE);
                    arr.push(seldata[0].data.V_CLASS_NAME);
                    window.opener.getTeamReturnValue(arr);
                    window.close();
                }
            });
        }
    });

}
function tosee(rowIdx) {
    seldata = Ext.getCmp('grid').store.data.items[rowIdx].data.V_CLASS_CODE;
    Ext.data.StoreManager.lookup('sgridStore').load(
        {
            params: {
                parName: ['IN_CLASSCODE'],
                parType: ['s'],
                parVal: [
                    seldata],
                proName: 'PRO_CLASS_M_QUERY_P',
                cursorName: 'V_CURSOR'
            }
        });
    Ext.getCmp('seewin').show();
}

function close_btn() {
    Ext.getCmp('seewin').hide();
}
function todel(view, item, colIndex, rowIndex, e) {
    agridStore.remove(agridStore.data.items[colIndex]);
}

