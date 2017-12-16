var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var A_EQUTYPE = '';
var A_PLANTCODE = '';
var A_DEPARTCODE = '';
var A_EQUIP_ID = '';
var A_EQUIP_NAME = '';
var A_INST_EQUIP_ID = '';
var A_MAT_NO = '';
var A_USERID = '';
var A_EQUIP_ID_LIST = new Array();


var ckStoreLoad = false;
var sbTypeStoreLoad = false;
var selectCheckerStoreLoad = false;
var CheckerStoreLoad = false;


Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //厂矿
    var ckStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
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
                ckStoreLoad = true;
                Ext.getCmp('V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    //部门名称
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            async: false
        },
        listeners: {
            load: function (store, records) {
                deptStoreLoad = true;
                Ext.getCmp('V_DEPTNAME').select(store.first());
                _init();
            }
        }
    });

    //设备类型Store
    var sbTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sbTypeStore',
        fields: ['TYPE_CODE', 'TYPE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/GETEQUTYPELIST_ABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                sbTypeStoreLoad = true;
                Ext.getCmp('TYPE_DESC').select(store.first());
                Ext.getCmp('SET_TYPE_DESC').select(store.first());
                _init();
            }
        }
    });

    //设备Store
    var sbStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbStore',
        pageSize: 100,
        fields: ['INST_EQUIP_ID', 'INST_EQUIP_NAME', 'EQUIP_NO', 'EQUIP_DESC', 'TYPE_CODE', 'TYPE_DESC', 'PLANTCODE',
            'PLANTNAME', 'DEPARTNAME', 'INST_EQUIP_REMARK', 'INST_EQUIP_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETINSTEQULIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    //主机规范Store
    var equRuleStore = Ext.create("Ext.data.Store", {
            autoLoad: false,
            storeId: 'equRuleStore',
            fields: ['EQUIP_NO', 'EQUIP_DESC'],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'ml/GET_EQULIST',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list'
                }

            }
        })
        ;

//选择人员Store
    var selectCheckerStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'selectCheckerStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/BASE_PERSON_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                selectCheckerStoreLoad = true;
                Ext.getCmp('SET_V_PERSONCODE').setValue(store.getAt(1).get('V_PERSONCODE'));
                _init();
            }
        }
    });

//点检员Store
    var CheckerStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'CheckerStore',
        fields: ['USERID', 'USERNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/GETEQUPERSON',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                CheckerStoreLoad = true;
                _init();
            }
        }
    });

//菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        /*  defaults: {
         style: 'margin:5px 0px 5px 5px',
         labelAlign: 'right'
         },*/
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_DEPTCODE',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '厂矿名称',
                labelWidth: 70,
                width: 220,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDeptName();
                    }
                }
            }, {
                id: 'V_DEPTNAME',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '部门名称',
                labelWidth: 70,
                width: 220,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'TYPE_DESC',
                xtype: 'combo',
                store: sbTypeStore,
                fieldLabel: '设备类型',
                labelWidth: 70,
                width: 220,
                displayField: 'TYPE_DESC',
                valueField: 'TYPE_CODE',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        Ext.getCmp('SET_TYPE_DESC').setValue(Ext.getCmp('TYPE_DESC').getValue())
                    }
                }
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_EQUIP_ID',
                fieldLabel: '设备编码',
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_EQUIP_NAME',
                fieldLabel: '设备名称',
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询设备',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectEqu
            }, {
                xtype: 'button',
                text: '导出Excel',
                handler: _exportExcel,
                width: 90,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'
            }]
        }]
    })

//按钮面板
    var buttonPanel = Ext.create('Ext.form.Panel', {
        id: 'buttonPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            id: 'setOil',
            xtype: 'button',
            text: '批量设置设备的润滑规范',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/edit.png',
            handler: _setRule
        }]
    });

//显示面板
    var sbGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'sbGridPanel',
        store: sbStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '设备编码',
            id: 'INST_EQUIP_ID',
            dataIndex: 'INST_EQUIP_ID',
            align: 'center',
            width: 180,
            flex: 2,
            renderer: atleft
        }, {
            text: '设备名称',
            dataIndex: 'INST_EQUIP_NAME',
            align: 'center',
            width: 150,
            flex: 1.5,
            renderer: atleft
        }, {
            text: '润滑规范型号',
            dataIndex: 'EQUIP_DESC',
            align: 'center',
            width: 150,
            flex: 1.5,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return value + '<a href="#" onclick="_setRule(\'' + record.data.INST_EQUIP_ID + '\')">' + '(设置)' + '</a>';
            }
        }, {
            text: '所属厂矿',
            dataIndex: 'PLANTNAME',
            align: 'center',
            width: 120,
            flex: 1.5,
            renderer: atleft
        }, {
            text: '所属部门',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            width: 120,
            flex: 1.5,
            renderer: atleft
        }, {
            text: '负责点检员',
            align: 'center',
            width: 80,
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_check(\'' + record.data.INST_EQUIP_ID + '\')">' + '设置' + '</a>';
            }

        }, {
            text: '备注',
            dataIndex: 'INST_EQUIP_REMARK',
            align: 'center',
            width: 120,
            flex: 1.5,
            renderer: atleft
        }, {
            text: '部位信息',
            align: 'center',
            width: 120,
            flex: 1.5,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_partInfo(\'' + record.data.EQUIP_NO + '\')">' + '部位信息' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: sbStore
        }]
    });

//设置润滑规范grid
    var setRuleGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'setRuleGridPanel',
        store: equRuleStore,
        width: 300,
        region: 'sourth',
        border: false,
        columnLines: true,

        columns: [{
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_setMainRule(\'' + record.data.EQUIP_NO + '\')">' + '设置' + '</a>';
            }
        }, {
            text: '主机规范编码',
            store: equRuleStore,
            id: 'EQUIP_NO',
            dataIndex: 'EQUIP_NO',
            align: 'center',
            width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '主机名称',
            store: equRuleStore,
            id: 'EQUIP_DESC',
            dataIndex: 'EQUIP_DESC',
            align: 'center',
            width: 120,
            flex: 1,
            renderer: atleft
        }]
    });

//设置设备润滑规范panel
    var selectTypePanel = Ext.create('Ext.form.Panel', {
        id: 'selectTypePanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'combo',
            id: 'SET_TYPE_DESC',
            store: sbTypeStore,
            fieldLabel: '设备类型',
            labelWidth: 70,
            width: 220,
            displayField: 'TYPE_DESC',
            valueField: 'TYPE_CODE',
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right',
            listeners: {
                load: function (field, newValue, oldValue) {
                    _selectRule
                }
            }
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 5px 5px',
            icon: imgpath + '/search.png',
            handler: _selectRule,
            listeners: {}
        }]
    });

//设置润滑规范弹出框
    var setRuleWindow = Ext.create('Ext.window.Window', {
        id: 'setRuleWindow',
        title: '<div align="center">设置设备润滑规范</div>',
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
            items: [selectTypePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [setRuleGridPanel]
        }]

    });

//设置点检员grid
    var setCheckerGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'setCheckerGridPanel',
        store: CheckerStore,
        width: 300,
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '用户名',
            id: 'U_USERID',
            store: CheckerStore,
            dataIndex: 'USERID',
            align: 'center',
            width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '姓名',
            store: CheckerStore,
            dataIndex: 'USERNAME',
            align: 'center',
            width: 120,
            flex: 1,
            renderer: atleft
        }]
    });

//设置点检员panel
    var setCheckerPanel = Ext.create('Ext.form.Panel', {
        id: 'setCheckerPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'combo',
            id: 'SET_V_PERSONCODE',
            store: selectCheckerStore,
            fieldLabel: '选择人员',
            labelWidth: 70,
            width: 220,
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '保存',
            style: ' margin: 5px 0px 5px 5px',
            icon: imgpath + '/saved.png',
            handler: _save
        }, {
            xtype: 'button',
            text: '删除',
            style: ' margin: 5px 0px 5px 5px',
            icon: imgpath + '/delete.png',
            handler: _delete
        }]
    });


//设置点检员弹出框
    var setCheckerWindow = Ext.create('Ext.window.Window', {
        id: 'setCheckerWindow',
        title: '<div align="center">设置设备润滑规范</div>',
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
            items: [setCheckerPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [setCheckerGridPanel]
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
            items: [tablePanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [sbGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (ckStoreLoad && sbTypeStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查询部门名称
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_DEPTCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };
    deptStore.currentPage = 1;
    deptStore.load();
};

//查找设备
function _selectEqu() {

    var sbStore = Ext.data.StoreManager.lookup('sbStore');

    A_EQUTYPE = Ext.getCmp('TYPE_DESC').getValue();
    A_PLANTCODE = Ext.getCmp('V_DEPTCODE').getValue();
    A_DEPARTCODE = Ext.getCmp('V_DEPTNAME').getValue();
    A_EQUIP_ID = Ext.getCmp('A_EQUIP_ID').getValue();
    A_EQUIP_NAME = Ext.getCmp('A_EQUIP_NAME').getValue();

    sbStore.proxy.extraParams = {
        A_EQUTYPE: A_EQUTYPE,
        A_PLANTCODE: A_PLANTCODE,
        A_DEPARTCODE: A_DEPARTCODE,
        A_EQUIP_ID: A_EQUIP_ID,
        A_EQUIP_NAME: A_EQUIP_NAME
    };
    sbStore.load();
};

//弹出设置设备润滑规范框
function _setRule(INST_EQUIP_ID) {
    A_EQUIP_ID_LIST = new Array();

    if (INST_EQUIP_ID.id == 'setOil') {
        var records = Ext.getCmp('sbGridPanel').getSelectionModel().getSelection();
        if (records.length == 0) {
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择一条数据',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        for (var i = 0; i < records.length; i++) {
            A_EQUIP_ID_LIST.push(records[i].get('INST_EQUIP_ID'));
        }

    } else {
        A_EQUIP_ID_LIST = INST_EQUIP_ID;
    }

    A_EQUTYPE = Ext.getCmp('SET_TYPE_DESC').getValue();
    _selectRule(A_EQUTYPE);

    Ext.getCmp('setRuleWindow').show();
    /*
     if (records.length == 1) {
     A_INST_EQUIP_ID = INST_EQUIP_ID;
     } else {
     for (var i = 0; i < records.length; i++) {
     A_EQUIP_ID_LIST.push(records[i].get('INST_EQUIP_ID'));
     }
     }*/
    //_selectRule(A_EQUTYPE);

    //Ext.getCmp('setRuleWindow').show();
}

//获取主机规范设置
function _selectRule(A_EQUTYPE) {
    A_EQUTYPE = Ext.getCmp('SET_TYPE_DESC').getValue();
    var equRuleStore = Ext.data.StoreManager.lookup('equRuleStore');

    equRuleStore.proxy.extraParams = {
        A_EQUTYPE: A_EQUTYPE
    };
    equRuleStore.load();
}

//设置主机规范
function _setMainRule(EQUIP_NO) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/SETEQU_NO',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUIP_ID: A_EQUIP_ID_LIST,
            A_EQUIP_NO: EQUIP_NO
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectEqu();
                Ext.getCmp('setRuleWindow').close();
                Ext.Msg.alert('操作信息', data.RET_MSG);//提示信息
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET_MSG,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }

        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
};

//设置点检员弹窗
function _check(INST_EQUIP_ID) {
    A_EQUIP_ID = INST_EQUIP_ID;
    _selectChecker();
    Ext.getCmp('setCheckerWindow').show();
};

//设置点检员
function _selectChecker() {
    var CheckerStore = Ext.data.StoreManager.lookup('CheckerStore');
    CheckerStore.proxy.extraParams = {
        A_EQUIP_ID: A_EQUIP_ID
    };
    CheckerStore.load();
};

//保存点检员
function _save() {

    A_USERID = Ext.getCmp('SET_V_PERSONCODE').getValue();

    if (A_USERID == '%') {
        Ext.Msg.alert('操作信息', '操作失败');//提示信息
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'ml/ADDEQUPERSON',
            type: 'ajax',
            method: 'POST',
            params: {
                A_EQUIP_ID: A_EQUIP_ID,
                A_USERID: A_USERID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                //  alert(data.RET_MSG);
                if (data.RET == 'Success') {
                    _selectChecker();
                    Ext.Msg.alert('操作信息', data.RET_MSG);//提示信息
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET_MSG,

                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }

            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET_MSG,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }
};

//删除点检员
function _delete() {

    var records = Ext.getCmp('setCheckerGridPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var A_USERID_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        A_USERID_LIST.push(records[i].get('USERID'));
        console.log(A_USERID_LIST);
    }

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'ml/DELETEEQUPERSON',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        A_EQUIP_ID: A_EQUIP_ID,
                        A_USERID: A_USERID_LIST
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.RET == 'Success') {//成功，会传回true
                            for (var i = 0; i < records.length; i++) {
                                Ext.data.StoreManager.lookup('CheckerStore').remove(records[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
                            }
                            _selectChecker();
                            //top.banner.Ext.example.msg('操作信息', '操作成功');//提示信息
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.RET_MSG,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    },
                    failure: function (response) {//访问到后台时执行的方法。
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }

                })
            }
        }
    });
}

//跳转部位信息页面
function _partInfo(EQUIP_NO) {
    var owidth = window.document.body.offsetWidth - 300;
    var oheight = window.document.body.offsetHeight - 200;
    var ret = window.open(AppUrl + 'page/PM_10010201/index.html?EQUIP_NO=' + EQUIP_NO, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/GETINSTEQULIST_EXCEL?A_EQUTYPE=' + encodeURI(encodeURI(A_EQUTYPE)) +
    '&A_PLANTCODE=' + A_PLANTCODE + '&A_DEPARTCODE=' + encodeURI(encodeURI(A_DEPARTCODE)) +
    '&A_EQUIP_ID=' + encodeURI(encodeURI(A_EQUIP_ID)) + '&A_EQUIP_NAME=' + encodeURI(encodeURI(A_EQUIP_NAME));
}
