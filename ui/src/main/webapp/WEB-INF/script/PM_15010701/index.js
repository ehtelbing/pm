var V_MENDDEPTNAME = '';
var V_MENDDEPTCODE = '';
var V_MENDDEPTTYPE = '';
var V_SUPERCODE = '';
var V_USERID = '';
var V_USERNAME = '';

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修单位配置Store
    var mendDeptStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'mendDeptStore',
        fields: ['MENDDEPT_NAME', 'MENDDEPT_CODE', 'MENDDATE_TYPE', 'SUPER_CODE', 'USERID', 'USERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ701_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //检修单位人员Store
    var mendMemberStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'mendMemberStore',
        fields: ['MENDDEPT_NAME', 'MENDDEPT_CODE', 'USERID', 'USERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ701_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        title: '<div align="center"> 检修单位配置</div>',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'textfield',
            id: 'mendDept',
            fieldLabel: '检修单位',
            labelWidth: 70,
            width: 220,
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'mendMember',
            fieldLabel: '检修人员',
            labelWidth: 70,
            width: 220,
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png',
            handler: _select
        }, {
            xtype: 'button',
            text: '新增',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/add.png',
            handler: _insert
        }, {
            xtype: 'button',
            text: '查询检修单位人员',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png',
            handler: _showMember
        }]
    });

    //新增单位面板
    var insertPanel = Ext.create('Ext.panel.Panel', {
        id: 'insertPanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'mendDeptName',
                fieldLabel: '检修单位名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 15px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'mendDeptCode',
                fieldLabel: '检修单位编码',
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
                xtype: 'textfield',
                id: 'mendDetpType',
                fieldLabel: '检修单位类型',
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
                xtype: 'textfield',
                id: 'superCode',
                fieldLabel: '上级编码',
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
                xtype: 'textfield',
                id: 'userId',
                fieldLabel: '负责人ID',
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
                xtype: 'textfield',
                id: 'userName',
                fieldLabel: '负责人名',
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
                xtype: 'button',
                text: '确定',
                style: ' margin: 5px 0px 5px 200px',
                handler: _insertDept
            }]
        }]
    });

    //显示面板
    var mendDeptGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'mendDeptGridPanel',
        store: mendDeptStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        columns: [{
            text: '检修单位名称',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            width: 120,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = 'background-color: #FFFF99;text-align:left';
                return value;
            }
        }, {
            text: '检修单位编码',
            dataIndex: 'MENDDEPT_CODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '检修单位类型',
            dataIndex: 'MENDDATE_TYPE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '上级编码',
            dataIndex: 'SUPER_CODE',
            align: 'center',
            width: 180,
            renderer: atright
        }, {
            text: '负责人ID',
            dataIndex: 'USERID',
            align: 'center',
            width: 120,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = 'background-color: #FFFF99;text-align:left';
                return value;
            }
        }, {
            text: '负责人名',
            dataIndex: 'USERNAME',
            align: 'center',
            width: 120,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = 'background-color: #FFFF99;text-align:left';
                return value;
            }
        }, {
            text: '修改',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_update(\'' + record.data.MENDDEPT_NAME + '\',\'' + record.data.MENDDEPT_CODE + '\',\'' + record.data.USERID + '\'' +
                    ',\'' + record.data.USERNAME + '\')">' + '修改' + '</a>';
            }
        }, {
            text: '删除',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_delete(\'' + record.data.MENDDEPT_CODE + '\')">' + '删除' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: mendDeptStore
        }]
    });

    //查询检修人员面板
    var mendMemberPanel = Ext.create('Ext.grid.Panel', {
        id: 'mendMemberPanel',
        store: mendMemberStore,
        // title: '<div align="center"> 检修单位人员</div>',
        width: '100%',
        region: 'sourth',
        border: true,
        columnLines: true,
        columns: [{
            text: '检修单位名称',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '人员',
            dataIndex: 'USERNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '删除',
            align: 'center',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_deleteMember(\'' + record.data.USERID + '\')">' + '删除' + '</a>';
            }
        }]
    });

    //新增单位弹出框容器
    var insertWindow = Ext.create('Ext.window.Window', {
        id: 'insertWindow',
        // title: '<div align="center"> 详细更换历史</div>',
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
            items: [insertPanel]
        }]
    });

    //检修人员弹出框容器
    var mendMemberWindow = Ext.create('Ext.window.Window', {
        id: 'mendMemberWindow',
        title: '<div align="center"> 检修单位人员</div>',
        width: 400,
        height: 300,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'north',
            border: false,
            items: [Ext.create('Ext.panel.Panel', {
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                frame: true,
                items: [{
                    xtype: 'button',
                    text: '新增',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _showInsertMember
                }]
            })]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [mendMemberPanel]
        }]
    });

    //新增人员弹出框容器
    var insertMemberWindow = Ext.create('Ext.window.Window', {
        id: 'insertMemberWindow',
        title: '<div align="center"> 新增检修单位人员</div>',
        width: 350,
        height: 200,
        //  modal: true,
        //  plain: true,
        closable: true,
        closeAction: 'close',
        // model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [Ext.create('Ext.panel.Panel', {
                id: 'insertMemberPanel',
                region: 'north',
                layout: 'vbox',
                frame: true,
                items: [{
                    xtype: 'panel',
                    region: 'north',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'textfield',
                        id: 'memberId',
                        fieldLabel: '人员编码',
                        labelWidth: 80,
                        width: 250,
                        style: ' margin: 15px 5px 0px 10px',
                        labelAlign: 'right'
                    }]
                }, {
                    xtype: 'panel',
                    region: 'north',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'textfield',
                        id: 'memberName',
                        fieldLabel: '人员名称',
                        labelWidth: 80,
                        width: 250,
                        style: ' margin: 15px 5px 0px 10px',
                        labelAlign: 'right'
                    }]
                }, {
                    xtype: 'panel',
                    region: 'north',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'button',
                        text: '确定',
                        style: ' margin: 10px 0px 5px 200px',
                        handler: _insertMember
                    }]
                }]
            })]
        }]
    });

    //整体视图容器
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
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [mendDeptGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    Ext.getBody().unmask();//去除页面笼罩
}

//查询工单列表
function _select() {

    var mendDeptStore = Ext.data.StoreManager.lookup('mendDeptStore');
    mendDeptStore.proxy.extraParams = {
        MENDDEPT_NAME_IN: Ext.getCmp('mendDept').getValue(),
        USERNAME_IN: Ext.getCmp('mendMember').getValue()
    };
    mendDeptStore.load();
}

//新增弹框
function _insert() {
    Ext.getCmp('mendDeptName').reset();
    Ext.getCmp('mendDeptCode').reset();
    Ext.getCmp('mendDetpType').reset();
    Ext.getCmp('superCode').reset();
    Ext.getCmp('userId').reset();
    Ext.getCmp('userName').reset();

    Ext.getCmp('insertWindow').show();
}

//新增检修单位
function _insertDept() {

    V_MENDDEPTNAME = Ext.getCmp('mendDeptName').getValue();
    V_MENDDEPTCODE = Ext.getCmp('mendDeptCode').getValue();
    V_MENDDEPTTYPE = Ext.getCmp('mendDetpType').getValue();
    V_SUPERCODE = Ext.getCmp('superCode').getValue();
    V_USERID = Ext.getCmp('userId').getValue();
    V_USERNAME = Ext.getCmp('userName').getValue();

    if (V_MENDDEPTNAME == '' || V_MENDDEPTCODE == '' || V_MENDDEPTTYPE == '' || V_SUPERCODE == '' || V_USERID == '' || V_USERNAME == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    } else {

        Ext.Ajax.request({
            url: AppUrl + 'ml/PRO_DJ701_INSERT',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_MENDDEPTNAME': V_MENDDEPTNAME,
                'V_MENDDEPTCODE': V_MENDDEPTCODE,
                'V_MENDDEPTTYPE': V_MENDDEPTTYPE,
                'V_SUPERCODE': V_SUPERCODE,
                'V_USERID': V_USERID,
                'V_USERNAME': V_USERNAME
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);

                if (data.RET == "Success") {
                    Ext.Msg.alert('操作信息', '操作成功');
                    Ext.getCmp('insertWindow').close();
                    _select();
                } else {
                    Ext.Msg.alert('操作信息', '操作失败');
                }
            }

        });
    }
}

//修改
function _update(MENDDEPT_NAME, MENDDEPT_CODE, USERID, USERNAME) {
    // var mendDeptStore = Ext.data.StoreManager.lookup('mendDeptStore');
    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ701_UPDATE1',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_MENDDEPTCODE': MENDDEPT_CODE,
            'V_MENDDEPTNAME': MENDDEPT_NAME,
            'V_USERID': USERID,
            'V_USERNAME': USERNAME
        },
        success: function (response, options) {
            var data = Ext.decode(response.responseText);

            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '修改成功');
                _select();
            } else {
                Ext.Msg.alert('操作信息', '修改失败');
            }
        }
    });
}

//删除检修单位
function _delete(V_MENDDEPTCODE) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ701_DELETE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_MENDDEPTCODE': V_MENDDEPTCODE
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '删除成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '删除失败');
            }
        }
    })
}

//检修单位人员弹框
function _showMember() {

    var record = Ext.getCmp("mendDeptGridPanel").getSelectionModel().getSelection();

    if (record != null && record != "") {
        MENDDEPT_CODE = record[0].data.MENDDEPT_CODE;
        _selectMember();
        Ext.getCmp('mendMemberWindow').show();

    } else {
        Ext.Msg.alert("提示", "请选择一条记录");
    }
}

//查询检修人员
function _selectMember() {

    var mendMemberStore = Ext.data.StoreManager.lookup('mendMemberStore');
    mendMemberStore.proxy.extraParams = {
        'V_MENDDEPTCODE': MENDDEPT_CODE
    };
    mendMemberStore.load();
}

//删除检修单位人员
function _deleteMember(USERID) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ701_PERSONDEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_USERID': USERID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '删除成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _selectMember();
            } else {
                Ext.Msg.alert('操作信息', '删除失败');
            }
        }
    })
}

//新增人员弹出框
function _showInsertMember() {
    Ext.getCmp('memberId').reset();
    Ext.getCmp('memberName').reset();

    Ext.getCmp('insertMemberWindow').show();
}

//新增检修单位人员
function _insertMember() {
    V_USERID = Ext.getCmp('memberId').getValue();
    V_USERNAME = Ext.getCmp('memberName').getValue();

    if (V_USERID == '' || V_USERNAME == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'ml/PRO_DJ701_PERINSERT',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_MENDDEPTCODE': MENDDEPT_CODE,
                'V_USERID': V_USERID,
                'V_USERNAME': V_USERNAME
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.RET == "Success") {
                    Ext.Msg.alert('操作信息', '操作成功');
                    Ext.getCmp('insertMemberWindow').close();
                    _selectMember();
                } else {
                    Ext.Msg.alert('操作信息', '操作失败');
                }
            }
        });
    }
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    // return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

/*
 //导出Excel
 function _exportExcel() {
 document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
 '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
 }
 */
