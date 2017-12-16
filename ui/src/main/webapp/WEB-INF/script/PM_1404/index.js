var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
//var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_V_GUID = V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();;
var orgLoad = false;
var orgLoad1 = false;
var orgLoad2 = false;
var equFaultLoad = false;
var equFaultLoad1 = false;
var equFaultLoad2 = false;
var init = true;
var initadd = true;
var V_V_ORGCODE = "";
var V_V_DEPTCODE = "";
var V_V_EQUTYPE = "";
var V_V_EQUCODE = "";
var V_V_EQUCHILD_CODE = "";
var V_V_FAULT_TYPE = "";
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '%' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_EQUTYPE == '%25') ? V_V_EQUTYPE = '%' : V_V_EQUTYPE = parameters.V_V_EQUTYPE;
    (parameters.V_V_EQUCODE == '%25') ? V_V_EQUCODE = '%' : V_V_EQUCODE = parameters.V_V_EQUCODE;
    (parameters.V_V_EQUCHILD_CODE == '%25') ? V_V_EQUCHILD_CODE = '%' : V_V_EQUCHILD_CODE = parameters.V_V_EQUCHILD_CODE;
    (parameters.V_V_FAULT_TYPE == '%25') ? V_V_FAULT_TYPE = '%' : V_V_FAULT_TYPE = parameters.V_V_FAULT_TYPE;
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

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['I_ID', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_EQUCHILD_NAME', 'V_TYPECODE', 'V_TYPENAME', 'V_FAULT_YY', 'V_BZ', 'V_GUID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var orgStore1 = Ext.create('Ext.data.Store', {
    id: 'orgStore1',
    autoLoad: true,
    fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': V_V_PERSONCODE,
            'V_V_DEPTCODE': V_V_DEPTCODE,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    },
    listeners: {
        load: function (store, records) {
            orgLoad1 = true;
            //  Ext.getCmp('V_V_ORGCODE1').select(store.first());
            // _init();
        }
    }
});

var deptStore1 = Ext.create('Ext.data.Store', {
    id: 'deptStore1',
    autoLoad: false,
    fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }),
    listeners: {
        load: function (store, records) {
            if (initadd) {

            } else {
                //  Ext.getCmp('V_V_DEPTCODE1').select(store.first());
            }
        }
    }
});

var eTypeStore1 = Ext.create('Ext.data.Store', {
    id: 'eTypeStore1',
    autoLoad: false,
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }),
    listeners: {
        load: function (store, records) {
            if (initadd) {

            } else {
                //  Ext.getCmp('V_V_EQUTYPE1').select(store.first());
            }

        }
    }
});

var equNameStore1 = Ext.create('Ext.data.Store', {
    id: 'equNameStore1',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }),
    listeners: {
        load: function (store, records) {
            if (initadd) {

            } else {
                //  Ext.getCmp('V_EQUNAME1').select(store.last());
            }


        }
    }
});

var subequNameStore1 = Ext.create('Ext.data.Store', {
    id: 'subequNameStore1',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }),
    listeners: {
        load: function (store, records) {
            if (initadd) {

            } else {
                //   Ext.getCmp('SUB_V_EQUNAME1').select(store.first());
            }

            //store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});

        }
    }
});

var equFaultStore1 = Ext.create('Ext.data.Store', {
    id: 'equFaultStore1',
    autoLoad: true,
    fields: ['V_TYPECODE', 'V_TYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners: {
        load: function (store, records) {
            equFaultLoad1 = true;
            /* store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
             Ext.getCmp('equFaultname1').select(store.first());
             _init();*/

        }
    }
});


var fileGridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'fileGridStore',
    pageSize: 20,
    fields: ['V_V_GUID', 'V_V_FILETYPECODE', 'V_FILEGUID', 'V_FILENAME', 'V_PERSON', 'V_FINDTIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PRO_BASE_FILE_SEL',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            'V_V_FILETYPECODE': 'SBGZ'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var addPanel = Ext.create('Ext.form.FormPanel', {
    border: false,
    frame: true,
    id: 'addPanel',
    region: 'center',
    //title: '<div align="center"></div>',
    width: '100%',
    height: 300,
    bodyPadding: 10,
    fileUpload: true,
    items: [{
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'displayfield',
            id: 'V_V_ORGCODE1',
            store: orgStore1,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 80,
            width: 230,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            listeners: {
                select: function () {
                    initadd = false;
                    /* _selectDept1();
                     _selecteType1();
                     _selectequName1();
                     _selectsubequName1();*/

                }
            }
        }, {
            xtype: 'displayfield',
            id: 'V_V_DEPTCODE1',
            store: deptStore1,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 80,
            width: 230,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    initadd = false;
                    /*_selecteType1();
                     _selectequName1();
                     _selectsubequName1();*/

                }
            }
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'displayfield',
            id: 'V_V_EQUTYPE1',
            store: eTypeStore1,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            forceSelection: true,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 80,
            width: 230,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    initadd = false;
                    /* _selectequName1();
                     _selectsubequName1();*/

                }
            }
        }, {
            xtype: 'displayfield',
            id: 'V_EQUNAME1',
            store: equNameStore1,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            forceSelection: true,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 230,
            listeners: {
                select: function (field, newValue, oldValue) {
                    initadd = false;
                    /* _selectsubequName1();*/

                }
            }
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'displayfield',
            id: 'SUB_V_EQUNAME1',
            store: subequNameStore1,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            forceSelection: true,
            fieldLabel: '子设备名称',
            editable: false,
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 230
        }, {
            xtype: 'displayfield',
            id: 'equFaultname1',
            store: equFaultStore1,
            queryMode: 'local',
            valueField: 'V_TYPECODE',
            displayField: 'V_TYPENAME',
            forceSelection: true,
            fieldLabel: '故障类型',
            editable: false,
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 230
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            id: 'begintime1',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            // submitFormat: 'yyyy-mm-dd',
            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            fieldLabel: '发现时间',
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 450,
            baseCls: 'margin-bottom'
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'faultRea1',
            fieldLabel: '故障原因',
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 450
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'faultDesc1',
            fieldLabel: '故障现象',
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 450
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'faultLevel1',
            fieldLabel: '故障等级',
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 450
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'faultSol1',
            fieldLabel: '故障解决',
            labelWidth: 80,
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 450
        }

        ]
    }, {
        xtype: 'panel',
        region: 'north',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'filefield',
            id: 'V_V_FILEBLOB',
            name: 'V_V_FILEBLOB',
            enctype: "multipart/form-data",
            fieldLabel: '故障附件',
            labelWidth: 80,
            labelAlign: 'right',
            inputWidth: 262,
            style: ' margin: 5px 0px 0px -8px',
            buttonText: '选择文件',
            allowBlank: true
        }, {
            id: 'insertFilesFj',
            xtype: 'button',
            text: '上传',
            style: ' margin: 5px 0px 0px 5px',
            handler: _upLoadFile
        }, {
            xtype: 'hidden',
            name: 'V_V_GUID',
            id: 'V_V_GUID'
        }, {
            xtype: 'hidden',
            name: 'V_V_FILENAME',
            id: 'V_V_FILENAME'
        }, {
            xtype: 'hidden',
            name: 'V_V_FILETYPECODE',
            id: 'V_V_FILETYPECODE'
        }, {
            xtype: 'hidden',
            name: 'V_V_PLANT',
            id: 'V_V_PLANT'
        }, {
            xtype: 'hidden',
            name: 'V_V_DEPT',
            id: 'V_V_DEPT'
        }, {
            xtype: 'hidden',
            name: 'V_V_PERSON',
            id: 'V_V_PERSON'
        }, {
            xtype: 'hidden',
            name: 'V_V_REMARK',
            id: 'V_V_REMARK'
        }

        ]
    }]
});

var filegridPanel = Ext.create("Ext.grid.Panel", {
    id: 'filegridPanel',
    region: 'center',
    height: 200,
    width: '100%',
    columnLines: true,
    store: fileGridStore,
    autoScroll: true,
    // margin: '10px 0 0 125px',
    //colspan: 3,
    columns: [{
        text: '附件名称',
        id: 'V_V_FILENAME1',
        flex: 0.7,
        align: 'center',
        dataIndex: "V_FILENAME",
        renderer: _downloadRander
    }, {
        text: '操作',
        flex: 0.3,
        align: 'center',
        renderer: _delRander
    }]
});
//123123
var addFaultWindow = Ext.create('Ext.window.Window', {
    id: 'addFaultWindow',
    title: "",
    layout: 'column',
    width: 600,
    height: 550,
    modal: true,
    plain: true,
    bodyPadding: 15,
    items: [{
        columnWidth: 1,
        items: addPanel,
        height: 300,
        width: 600
    }, {
        columnWidth: 1,
        height: 150,
        width: '100%',
        items: filegridPanel
    }],
    buttons: [{
        text: '保存',
        handler: _saveBtnFault,
        width: 50
    }, {
        text: '取消',
        handler: _hideFault,
        width: 50
    }],
    closable: true,
    closeAction: 'close',
    model: true
});

var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            border: false,
            region: 'north',
            layout: 'column',
            defaults: {
                style: {margin: '5px 0px 5px 10px'},
                labelAlign: 'right'
            },
            frame:true,
            items: [
                {id: 'V_FAULT_YY', xtype: 'textfield', fieldLabel: '故障原因', labelWidth: 60},
                {
                    xtype: 'button',
                    text: '查询',
                    handler: select,
                    style: {margin: ' 5px 0 5px 10px'}
                },
                {
                    xtype: 'button',
                    text: '选择',
                    handler: choose,
                    style: {margin: ' 5px 0 5px 10px'}
                }
            ]
        },
        {
            xtype: 'gridpanel',
            region: 'center',
            columnLines: true,
            id: 'grid',
            store: 'gridStore',
            selType: 'checkboxmodel',
            columns: [
                {
                    xtype: 'rownumberer',flex: 0.25, text: '序号'/*, width: 60*/, align: 'center'
                },
                {
                    text: '设备类型', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_EQUTYPENAME'
                },
                {
                    text: '设备名称', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_EQUNAME'
                },
                {
                    text: '部件', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_EQUCHILD_NAME'
                },
                {
                    text: '故障类型', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_TYPENAME'
                },
                {
                    text: '故障原因', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_FAULT_YY'
                },
                {
                    text: '备注', flex: 1, align: 'center'/*, width: 150*/, dataIndex: 'V_BZ'
                }
            ]
        }
    ]
};

function _downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + ',' + metaData.data.V_FILENAME + '\')">' + a + '</a>';
}

function onDownload(fileguid) {
    //alert(fileguid)
    var guid = fileguid.substring(0,36);
    var fujianname = fileguid.substring(37 );
    //alert(guid);
    //console.log(Ext.getCmp("V_V_GUID").getValue())
    //alert(fujianname)
    var form = Ext.getCmp('addPanel');
    location.href = AppUrl+"qk/downloadFile?V_V_FILEGUID="+guid+"&V_V_FILENAME="+fujianname;



}
function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
}

function select() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_EQUTYPE: V_V_EQUTYPE,
            V_V_EQUCODE: V_V_EQUCODE,
            V_V_EQUCHILD_CODE: V_V_EQUCHILD_CODE,
            V_V_FAULT_TYPE: V_V_FAULT_TYPE,
            V_V_FAULT_YY: Ext.getCmp('V_FAULT_YY').getValue()
        }
    });
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function _hideFault() {
    Ext.getCmp('addFaultWindow').close();
}

function onDel(fileguid) {

    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_V_GUID);
                filequery2(V_V_GUID);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}

function _saveBtnFault() {
    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    var fileguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }

    var faultguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        faultguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            faultguid += "-";
    }

    var intime = Ext.Date.format(new Date(), 'Y-m-d');


    if (!_validate(Ext.getCmp('addPanel'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('V_V_ORGCODE1').getValue() != '%' && Ext.getCmp('V_V_DEPTCODE1').getValue() != '%' && Ext.getCmp('V_V_EQUTYPE1').getValue() != '%' && Ext.getCmp('V_EQUNAME1').getValue() != '%' && Ext.getCmp('SUB_V_EQUNAME1').getValue() != '%' && Ext.getCmp('equFaultname1').getValue() != '%') {
        var records = Ext.getCmp('grid').getSelectionModel().getSelection();

        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': records[0].get('V_ORGCODE'),
                'V_V_DEPTCODE': records[0].get('V_DEPTCODE'),
                'V_V_EQUTYPE': records[0].get('V_EQUTYPECODE'),
                'V_V_EQUCODE': records[0].get('V_EQUCODE'),
                'V_V_EQUCHILD_CODE': records[0].get('V_EQUCHILD_CODE'),
                'V_V_FAULT_GUID': faultguid,
                'V_V_FAULT_TYPE': records[0].get('V_TYPECODE'),
                'V_V_FAULT_YY': Ext.getCmp("faultRea1").getValue(),
                'V_V_FINDTIME': Ext.getCmp("begintime1").getSubmitValue(),
                'V_V_FAULT_XX': Ext.getCmp("faultDesc1").getValue(),
                'V_V_JJBF': Ext.getCmp("faultSol1").getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp("faultLevel1").getValue(),
                'V_V_FILE_GUID': fileguid,
                'V_V_INTIME': intime,
                'V_V_PERCODE': V_V_PERSONCODE,
                'V_V_IP': V_V_IP
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);

                // var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    //Ext.Msg.alert('成功', '添加成功');
                    Ext.getCmp("addFaultWindow").close();
                    /* Ext.getCmp("faultRea1").reset();
                     Ext.getCmp("faultDesc1").reset();
                     Ext.getCmp("faultSol1").reset();
                     Ext.getCmp("faultLevel1").reset();
                     Ext.getCmp("filegridPanel").removeAll();*/
                    //_seltctFault();


                    window.opener.setValue22("111");
                    window.close();


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
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
    } else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '下拉选项不能为全部',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }


}

function _upLoadFile() {
    var addPanel = Ext.getCmp('addPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    //alert(V_V_GUID)
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('V_V_ORGCODE1').getSubmitValue());
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('V_V_DEPTCODE1').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());

    if (addPanel.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
            Ext.Msg.alert('错误', '请选择你要上传的文件');
            return;
        }

        Ext.MessageBox.show({
            title: '请等待',
            msg: '文件正在上传...',
            progressText: '',
            width: 300,
            progress: true,
            closable: false,
            animEl: 'loding'

        });

        addPanel.getForm().submit({
            url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                filequery(V_V_GUID);

            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

    }

}

function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function choose() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    window.returnValue = records[0].data;

    /*  V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();*/

    initadd = true;

    orgLoad1 = false;
    equFaultLoad1 = false;

    Ext.getCmp('V_V_ORGCODE1').setValue(records[0].get('V_ORGNAME'));
    Ext.getCmp('V_V_DEPTCODE1').setValue(records[0].get('V_DEPTNAME'));
    Ext.getCmp('V_V_EQUTYPE1').setValue(records[0].get('V_EQUTYPENAME'));
    Ext.getCmp('V_EQUNAME1').setValue(records[0].get('V_EQUNAME'));
    Ext.getCmp('SUB_V_EQUNAME1').setValue(records[0].get('V_EQUCHILD_NAME'));
    Ext.getCmp('equFaultname1').setValue(records[0].get('V_TYPENAME'));
    Ext.getCmp('begintime1').setValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    Ext.getCmp('faultRea1').setValue(records[0].data.V_FAULT_YY);
    //Ext.getCmp('faultDesc1').setValue(records[0].data.V_FAULT_XX);
    //Ext.getCmp('faultLevel1').setValue(records[0].data.V_FAULT_LEVEL);
    //Ext.getCmp('faultSol1').setValue(records[0].data.V_JJBF);
    /*var deptStore1 = Ext.data.StoreManager.lookup('deptStore1');
     deptStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE1').getValue(),
     'V_V_DEPTCODENEXT': '%',
     'V_V_DEPTTYPE': '[主体作业区]'
     };
     deptStore1.load();

     Ext.getCmp('V_V_ORGCODE1').setValue(Ext.getCmp('V_V_ORGCODE').getValue());
     Ext.getCmp('V_V_DEPTCODE1').setValue(Ext.getCmp('V_V_DEPTCODE').getValue());

     var eTypeStore1 = Ext.data.StoreManager.lookup('eTypeStore1');
     eTypeStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue()


     };
     eTypeStore1.load();

     if ((Ext.getCmp('V_V_EQUTYPE').getValue()) == '%') {
     Ext.getCmp('V_V_EQUTYPE1').select(eTypeStore1.getAt(1).get('V_EQUTYPECODE'));
     } else {
     Ext.getCmp('V_V_EQUTYPE1').setValue(Ext.getCmp('V_V_EQUTYPE').getValue());//给设备类型设置默认值
     }

     var equNameStore1 = Ext.data.StoreManager.lookup('equNameStore1');
     equNameStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue(),
     'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE1').getValue()

     };
     equNameStore1.load();

     if ((Ext.getCmp('V_EQUNAME').getValue()) == '%') {
     Ext.getCmp('V_EQUNAME1').select(equNameStore1.getAt(1).get('V_EQUCODE'));
     } else {
     Ext.getCmp('V_EQUNAME1').setValue(Ext.getCmp('V_EQUNAME').getValue());//给设备类型设置默认值
     }

     var subequNameStore1 = Ext.data.StoreManager.lookup('subequNameStore1');
     subequNameStore1.proxy.extraParams = {
     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE1').getValue(),
     'V_V_DEPTNEXTCODE': Ext.getCmp('V_V_DEPTCODE1').getValue(),
     'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE1').getValue(),
     'V_V_EQUCODE': Ext.getCmp('V_EQUNAME1').getValue()

     };
     subequNameStore1.load();
     if ((Ext.getCmp('SUB_V_EQUNAME').getValue()) == '%') {
     Ext.getCmp('SUB_V_EQUNAME1').select(subequNameStore1.getAt(1).get('V_EQUCODE'));
     } else {
     Ext.getCmp('SUB_V_EQUNAME1').setValue(Ext.getCmp('SUB_V_EQUNAME').getValue());
     }


     Ext.getCmp('equFaultname1').setValue(Ext.getCmp('equFaultname').getValue());*/


    Ext.getCmp("addFaultWindow").show();


    // window.close();
}

function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}

Ext.onReady(onPageLoaded);


