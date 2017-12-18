var test1 = '';
var test2 = '';
var test3 = '';
var test4 = '';
if (location.href.split('?')[1] != undefined) {
    var ORDERID = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}
var gridStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['FILE_NAME', 'UPLOAD_DATE', 'FILEID'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'LL/FILELIST',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                A_ORDERID: ORDERID
            }
        },
        listeners: {
            load: function (store, records) {
                gridStoreLoad = true;
                _init();
            }
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        title: '文件列表',
        columnLines: true,
        autoScroll: true,
        store: gridStore,
        columns: [{
            text: '文件名',
            dataIndex: 'FILE_NAME',
            align: 'center',
            width: 120
        }, {
            text: '上传时间',
            dataIndex: 'UPLOAD_DATE',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return value.split(' ')[0];
            }
        }, {
            text: '下载',
            dataIndex: 'FILEID',
            align: 'center',
            width: 60,
            renderer: down
        }, {
            text: '删除',
            dataIndex: 'FILEID',
            align: 'center',
            width: 60,
            renderer: del
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        title: '录入',
        frame: true,
        region: 'center',
        layout: {
            type: 'absolute'
        },
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 90
        },
        items: [{
            xtype: 'displayfield',
            id: 'code',
            fieldLabel: '工单号',
            x: 5,
            y: 5,
            value: ORDERID
        }, {
            xtype: 'datefield',
            fieldLabel: '试验日期',
            x: 5,
            y: 35,
            format: 'Y-m-d',
            value: new Date(),
            id: 'syrq'
        }, {
            xtype: 'button',
            text: '保存',
            labelWidth: 70,
            style: 'margin-left:5px',
            icon: imgpath + '/filesave.png',
            handler: _onSave,
            x: 240,
            y: 35
        }, {
            xtype: 'fieldset',
            title: '半成品试验',
            x: 5,
            y: 70,
            width: 600,
            items: [{
                xtype: 'radiogroup',
                vertical: true,
                width: 200,
                id: 'rag1',
                items: [{
                    boxLabel: '通过',
                    name: 'rb1',
                    inputValue: '1',
                    id: 'ra1'
                }, {
                    boxLabel: '未通过 ',
                    name: 'rb1',
                    inputValue: '2',
                    id: 'ra2'
                }]
            }, {
                xtype: 'textareafield',
                fieldLabel: '试验说明',
                width: 570,
                height: 50,
                labelAlign: 'right',
                labelWidth: 70,
                id: 'area1'
            }]
        }, {
            xtype: 'fieldset',
            title: '转子半成品试验',
            x: 5,
            y: 175,
            width: 600,
            items: [{
                xtype: 'radiogroup',
                vertical: true,
                width: 200,
                id: 'rag2',
                items: [{
                    boxLabel: '通过',
                    name: 'rb2',
                    inputValue: '1',
                    id: 'ra3'
                }, {
                    boxLabel: '未通过 ',
                    name: 'rb2',
                    inputValue: '2',
                    id: 'ra4'
                }]
            }, {
                xtype: 'textareafield',
                fieldLabel: '试验说明',
                width: 570,
                height: 50,
                labelAlign: 'right',
                labelWidth: 70,
                id: 'area2'
            }]
        }, {
            xtype: 'fieldset',
            title: '定子半成品试验',
            x: 5,
            y: 280,
            width: 600,
            items: [{
                xtype: 'radiogroup',
                vertical: true,
                width: 200,
                id: 'rag3',
                items: [{
                    boxLabel: '通过',
                    name: 'rb3',
                    inputValue: '1',
                    id: 'ra5'
                }, {
                    boxLabel: '未通过 ',
                    name: 'rb3',
                    inputValue: '2',
                    id: 'ra6'
                }]
            }, {
                xtype: 'textareafield',
                fieldLabel: '试验说明',
                width: 570,
                height: 50,
                labelAlign: 'right',
                labelWidth: 70,
                id: 'area3'
            }]
        }, {
            xtype: 'fieldset',
            title: '成品试验',
            x: 5,
            y: 385,
            width: 600,
            items: [{
                xtype: 'radiogroup',
                vertical: true,
                width: 200,
                id: 'rag4',
                items: [{
                    boxLabel: '通过',
                    name: 'rb4',
                    inputValue: '1',
                    id: 'ra7'
                }, {
                    boxLabel: '未通过 ',
                    name: 'rb4',
                    inputValue: '2',
                    id: 'ra8'
                }]
            }, {
                xtype: 'textareafield',
                fieldLabel: '试验说明',
                width: 570,
                height: 50,
                labelAlign: 'right',
                labelWidth: 70,
                id: 'area4'
            }]
        }, {
            xtype: 'filefield',
            name: 'A_FILE',
            id: 'A_FILE',
            fieldLabel: '附件上传',
            msgTarget: 'side',
            buttonText: '浏览...',
            width: 500,
            x: 5,
            y: 495
        }, {
            xtype: 'button',
            text: '上 传',
            labelWidth: 70,
            style: 'margin-left:0px',
            x: 510,
            y: 495,
            handler: _upFile
        }, {
            xtype: 'hidden',
            name: 'A_ORDERID',
            id: 'A_ORDERID'
        }, {
            xtype: 'hidden',
            name: 'A_FILENAME',
            id: 'A_FILENAME'
        }, {
            xtype: 'hidden',
            name: 'A_FILE_EXTEND',
            id: 'A_FILE_EXTEND'
        }, {
            xtype: 'hidden',
            name: 'A_USERNAME',
            id: 'A_USERNAME'
        }]

    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            border: false,
            items: [formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    _init();
});

//初始化
function _init() {
    if (gridStoreLoad) {

        _bind();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _bind() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/ORDERSYDETAIL',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            'A_ORDERID': ORDERID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET[0].BCSY_RESULT == '通过') {
                Ext.getCmp("ra1").setValue(true);
            } else {
                Ext.getCmp("ra2").setValue(true);
            }
            if (resp.RET[0].ZBCSY_RESULT == '通过') {
                Ext.getCmp("ra3").setValue(true);
            } else {
                Ext.getCmp("ra4").setValue(true);
            }
            if (resp.RET[0].DBCSY_RESULT == '通过') {
                Ext.getCmp("ra5").setValue(true);
            } else {
                Ext.getCmp("ra6").setValue(true);
            }
            if (resp.RET[0].CSY_RESULT == '通过') {
                Ext.getCmp("ra7").setValue(true);
            } else {
                Ext.getCmp("ra8").setValue(true);
            }
            Ext.getCmp("syrq").setValue(resp.RET[0].SY_DATE);
            Ext.getCmp("area1").setValue(resp.RET[0].BCSY_RESULT_DESC);
            Ext.getCmp("area2").setValue(resp.RET[0].ZBCSY_RESULT_DESC);
            Ext.getCmp("area3").setValue(resp.RET[0].DBCSY_RESULT_DESC);
            Ext.getCmp("area4").setValue(resp.RET[0].CSY_RESULT_DESC);
        }
    });
}
function _upFile() {

    if (Ext.getCmp("A_FILE").getValue() == "") {
        alert("请选择文件");
        return false;
    }

    var form = Ext.getCmp("formPanel");

    var A_FILE = Ext.getCmp('A_FILE').getSubmitValue();
    var A_FILENAME = A_FILE.split('.')[0];
    var A_FILE_EXTEND = A_FILE.split('.')[1];

    var formPanel = Ext.getCmp('formPanel');
    Ext.getCmp('A_ORDERID').setValue(ORDERID);
    Ext.getCmp('A_FILENAME').setValue(A_FILENAME);
    Ext.getCmp('A_FILE_EXTEND').setValue(A_FILE_EXTEND);
    Ext.getCmp('A_FILE').setValue(A_FILE);
    Ext.getCmp('A_USERNAME').setValue(Ext.util.Cookies.get('v_personname2'));
    formPanel.submit({
        url: AppUrl + 'mwd/FILEUPDATE',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            refresh();
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '上传失败');
        }
    });
}

function refresh() {
    Ext.data.StoreManager.lookup('gridStore').load();
}

function down(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a href="javascript:void(0)" onclick="writeIn(' + rowIdx + ')">下载</a>';
}

function writeIn(rowIdx) {
    var FILEID = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
    var FILE_NAME = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILE_NAME;
    window.open(AppUrl + 'LL/FILEDOWNLOAD?A_FILEID=' + FILEID + '&V_V_FILENAME=' + FILE_NAME, '_blank', 'width=40,height=30,resizable=yes,scrollbars=yes');
}

function del(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a href="javascript:void(0)" onclick="_deleteFile(' + rowIdx + ')">删除</a>';
}

function _deleteFile(rowIdx) {
    var A_FILEID = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
    Ext.Ajax.request({
        url: AppUrl + 'mwd/FILEDELETE',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            'A_FILEID': A_FILEID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "Success") {
                Ext.Msg.alert('提示信息', '删除成功');
                Ext.data.StoreManager.lookup('gridStore').load();
            } else {
                Ext.Msg.alert('提示信息', '删除失败');
            }
        }
    });
}

function _onSave() {
    test1 = Ext.getCmp('ra1').checked;
    test2 = Ext.getCmp('ra3').checked;
    test3 = Ext.getCmp('ra5').checked;
    test4 = Ext.getCmp('ra7').checked;

    Ext.Ajax.request({
        url: AppUrl + 'mwd/SAVEORDERSY',
        async: false,
        method: 'POST',
        params: {
            'A_ORDERID': ORDERID,
            'A_BCSY_RESULT': test1 == true ? '通过' : '未通过',
            'A_BCSY_RESULT_DESC': Ext.getCmp('area1').getValue(),// varchar2, --半成品试验结果说明
            'A_ZBCSY_RESULT': test2 == true ? '通过' : '未通过',// varchar2, --转子半成品试验结果
            'A_ZBCSY_RESULT_DESC': Ext.getCmp('area2').getValue(),//varchar2, --转子半成品试验结果说明
            'A_DBCSY_RESULT': test3 == true ? '通过' : '未通过',// varchar2, --定子半成品试验结果
            'A_DBCSY_RESULT_DESC': Ext.getCmp('area3').getValue(),// varchar2, --定子半成品试验结果说明
            'A_CSY_RESULT': test4 == true ? '通过' : '未通过',// varchar2, --成品试验结果
            'A_CSY_RESULT_DESC': Ext.getCmp('area4').getValue(),//varchar2, --成品试验救国说明
            'A_USERID': Ext.util.Cookies.get('v_personcode'), //varchar2, --用户Id
            'A_USERNAME': Ext.util.Cookies.get('v_personname2'),// varchar2, --用户姓名
            'A_SY_DATE': Ext.Date.format(Ext.getCmp('syrq').getValue(), 'Y-m-d')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "Success") {
                Ext.Msg.alert('提示信息', '操作成功');
                refresh();
            } else {
                Ext.Msg.alert('提示信息', '操作失败');
            }
        }
    })
}