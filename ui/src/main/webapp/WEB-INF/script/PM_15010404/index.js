
var PRESONNAME = Ext.util.Cookies.get('v_personname2');
var PERSONCODE = Ext.util.Cookies.get('v_personcode');

var DEPARTCODE_IN = '';
var DJCODE_IN = '';
var DJNAME_IN = '';
var CONTEXT_IN = '';
var BEGINDATE_IN = '';
var ENDDATE_IN = '';
var TOPLANTCODE_IN = '';
var CONFIRM_FLAG_IN = '0';
var ckStoreLoad=false;
var deptStoreLoad=false;

var type= '';
if(location.href.split('?')[1]!=null){
    type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {

                ckStoreLoad = true;
                Ext.getCmp('ckname').select(store.first());
                _init();
            }
        }

    });

    //部门Store
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',

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

                deptStoreLoad = true;
                Ext.getCmp('deptname').select(store.first());
                _init();
            }
        }

    });

    //工单申请Store
    var applylistStore = Ext.create("Ext.data.Store", {

        autoLoad: false,
        pageSize: 200,
        storeId: 'applylistStore',
        fields: ['APPLY_ID', 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'MEND_CONTEXT', 'INSERT_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE',
            'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ401_APPLYLIST',
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

    //工单查询Store
    var gdCheckStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gdCheckStore',
        pageSize: 200,
        fields: ['APPLY_ID', 'ORDERID', 'MENDDEPT_NAME', 'DJ_NAME', 'DJ_UQ_CODE', 'MEND_CONTEXT', 'INSERT_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE', 'REMARK', 'REC_PLANT', 'REC_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ402_APPLYLIST',
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
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ckname',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 80,
                width: 250,
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
            },{
                id: 'deptname',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '部门',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            },  {
                xtype: 'textfield',
                id: 'PRESONNAME',
                fieldLabel: '录入人',
                value: Ext.util.Cookies.get('v_personname2'),
                readOnly: true,
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
                text: '查询',
                style: ' margin: 5px 0px 5px 50px',
                icon: imgpath + '/search.png',
                handler: _selectList
            }, {
                xtype: 'button',
                text: '提交',
                style: ' margin: 5px 0px 5px 40px',
                icon: imgpath + '/saved.png',
                handler: _submitList
            }, {
                xtype: 'displayfield',
                value: "<lable style='color:red'>(*申请提交后将由部门负责人进行确认)</lable>",
                style: ' margin: 5px 0px 5px 10px'
            }, {
                xtype: 'button',
                text: '录入',
                style: ' margin: 5px 0px 5px 40px',
                icon: imgpath + '/edit.png',
                handler: _insert
            }]
        }]
    });


//显示面板
    var supplyListGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'supplyListGridPanel',
        store: applylistStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '检修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '计划开始时间',
            dataIndex: 'PLAN_BEGINDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '计划完成时间',
            dataIndex: 'PLAN_ENDDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '修改',
            //  dataIndex: 'ALERT_VALUE',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_updateList(\'' + record.data.APPLY_ID + '\')">' + '修改' + '</a>';
            }
        }, {
            text: '删除',
            //  dataIndex: 'OFFSET',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_deleteList(\'' + record.data.APPLY_ID + '\')">' + '删除' + '</a>';
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
            store: applylistStore
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
            items: [supplyListGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (ckStoreLoad&&deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
};

//查询作业区
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ckname').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'

    };
    deptStore.load();
};

//查询工单列表
function _selectList() {

    PLANTCODE_IN = Ext.getCmp('ckname').getValue();
    DEPARTCODE_IN = Ext.getCmp('deptname').getValue();
    USERCODE_IN = PERSONCODE;

    var applylistStore = Ext.data.StoreManager.lookup('applylistStore');
    applylistStore.proxy.extraParams = {
        PLANTCODE_IN: PLANTCODE_IN,
        DEPARTCODE_IN: DEPARTCODE_IN,
        USERCODE_IN: USERCODE_IN
    };
    applylistStore.load();
};

//提交工单列表
function _submitList() {
    var records = Ext.getCmp('supplyListGridPanel').getSelectionModel().getSelection();


    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    Ext.Msg.show({
        title: '提示',
        msg: '确定要提交码?',
        buttons: Ext.Msg.OKCANCEL,
        icon: Ext.Msg.OKCANCEL,

        fn: function (button) {
            if (button == "ok") {
                Ext.Array.each(records, function (name, index) {
                    APPLYID_IN = name.data.APPLY_ID;
                    Ext.Ajax.request({
                        url: AppUrl + 'ml/PRO_DJ401_SUBMITAPPLY',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            APPLYID_IN: APPLYID_IN
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (records.length - 1 == index) {

                                if (data.RET=='Success') {//成功，会传回true
                                    Ext.Msg.alert('操作信息', '提交成功');//提示信息
                                    _selectList();
                                } else {
                                    Ext.MessageBox.show({
                                        title: '错误',
                                        msg: '提交失败',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
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
                });
            }
        }
    })
};

//录入工单
function _insert() {
    var returnVal = window.showModalDialog(AppUrl + 'page/PM_1501040101/index.html?PLANTCODE='+Ext.getCmp('ckname').getValue()+'&PLANTNAME='+Ext.getCmp('ckname').getDisplayValue()+'&DEPTNAME='+Ext.getCmp('deptname').getDisplayValue()+'&DEPTCODE='+ Ext.getCmp('deptname').getValue()+'&confirm_flag_in=1', window, "dialogWidth=1200px;dialogHeight=550px");
    //?ORGCODE='+ORGCODE+',&ORGNAME='+ORGNAME+',&DEPTNAME='+DEPTNAME+',&DEPTCODE='+DEPTCODE+',&PRESONNAME='+PRESONNAME+',&PERSONCODE='+PERSONCODE
    if (returnVal != null) {
        Ext.Msg.alert('操作信息', '保存成功！');//提示信息
        _selectList();
    }
};

//修改工单
function _updateList(APPLY_ID) {
    var returnVal = window.showModalDialog(AppUrl + 'page/PM_1501040102/index.html?apply_id=' + APPLY_ID, window, "dialogWidth=1200px;dialogHeight=550px");
    if (returnVal != null) {
        _selectList();
    }
};

//删除工单
function _deleteList(APPLY_ID) {
    APPLYID_IN = APPLY_ID;
    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ401_DELETEAPPLY',
        type: 'ajax',
        method: 'POST',
        params: {
            APPLYID_IN: APPLYID_IN
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                //  Ext.data.StoreManager.lookup('applylistStore').remove();//把这条数据，从页面数据集中移除，现实动态更新页面

                _selectList();
                //top.banner.Ext.example.msg('操作信息', '操作成功');//提示信息
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '操作失败',
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
function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
     return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
   // return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};


//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_DJ402_APPLYLIST_EXCEL?PLANTCODE_IN=' +  encodeURI(encodeURI(ORGCODE)) +
    '&DEPARTCODE_IN=' + encodeURI(encodeURI(DEPARTCODE_IN)) + '&DJCODE_IN=' + DJCODE_IN + '&DJNAME_IN=' + DJNAME_IN +
    '&CONTEXT_IN=' + CONTEXT_IN + '&BEGINDATE_IN=' + BEGINDATE_IN + '&ENDDATE_IN=' + ENDDATE_IN + '&TOPLANTCODE_IN=' + encodeURI(encodeURI(TOPLANTCODE_IN)) +
    '&CONFIRM_FLAG_IN=' + CONFIRM_FLAG_IN;
}

