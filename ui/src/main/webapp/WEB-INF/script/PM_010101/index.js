var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;
Ext.onReady(function () {

    var wingridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'wingridStore',
        pageSize: 100,
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/BASE_PER_POST_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var windowgrid = Ext.create("Ext.grid.Panel", {
        xtype: 'gridpanel',
        id: 'windowgrid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: wingridStore,
        autoScroll: true,
        selModel: {      //复选框
            selType: 'checkboxmodel'
        },
        columns: [{
            text: '人员名称',
            dataIndex: 'V_PERSONNAME',
            align: 'center',
            labelAlign: 'right',
            width: 200
        }]

    });

    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 400,
        height: 400,
        layout: 'border',
        title: '人员选择',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [windowgrid],
        buttons: [{
            xtype: 'button',
            text: '确定',
            width: 40,
            handler: function () {
                var seldata = Ext.getCmp('windowgrid').getSelectionModel().getSelection();
                if (seldata.length == 0) {
                    alert("请选择点检人员");
                }
                else {
                    var perstring = "";
                    for (var i = 0; i < seldata.length; i++) {
                        if (i == seldata.length - 1) {
                            perstring += seldata[0].data.V_PERSONCODE;
                        }
                        else {
                            perstring += seldata[0].data.V_PERSONCODE + ',';
                        }
                    }
                    btn_plan(perstring);
                }
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window').hide();
            }
        }]
    });


    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                deptLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    var equTypeStore = Ext.create('Ext.data.Store', {
        id: 'equTypeStore',
        autoLoad: true,
        fields: ['V_CK_EQUTYPECODE', 'V_CK_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PM_06_EQUTYPE_SEL',
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
                equTypeLoad = true;
                Ext.getCmp('V_CK_EQUTYPECODE').select(store.first());
                _init();
            }
        }
    });

    var eTypeStore = Ext.create('Ext.data.Store', {
        id: 'eTypeStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
                deptLoad = true;
                Ext.getCmp('equtype').select(store.first());
                _init();
            }
        }
    });

    var equNameStore = Ext.create('Ext.data.Store', {
        id: 'equNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('equname').select(store.first());
                _init();
            }
        }
    });

    var subequNameStore = Ext.create('Ext.data.Store', {
        id: 'subequNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
                Ext.getCmp('subequname').select(store.first());
                _init();
            }
        }
    });

    var equTreeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'equTreeStore',
        pageSize: -1,
        fields: ['V_EQUTYPENAME', 'V_EQUTYPECODE', 'leaf'],
        proxy: {
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODENEXT': '999999'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var criterionStore = Ext.create('Ext.data.Store', {
        storeId: 'criterionStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['V_CRITERION_CODE', 'V_CRITERION_ITEM', 'V_CRITERION_CONTENT', 'V_CRITERION_CR', 'V_DEPTCODE',
            'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_SATAE', 'V_CK_FUNCTION1', 'V_CK_FUNCTION2',
            'V_CK_FUNCTION3', 'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7',
            'V_CK_FUNCTION8', 'D_CKDATE', 'V_CK_EQUTYPECODE', 'I_FLAG', 'I_WEIGHT', 'I_YJ', 'V_EQU_STATAE1', 'V_EQU_STATAE2','V_EQUNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        id: 'topPanel',
        layout: 'column',
        titleAlign:'center',
        border:false,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [
                {
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '单位',
                editable: false,
                listeners: {
                    change: function (combo, records) {
                        _selectDept(records);
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                labelWidth: 90,
                fieldLabel: '作业区',
                editable: false,
                listeners: {
                    change: function (combo, records) {
                        Ext.data.StoreManager.lookup('eTypeStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODENEXT: Ext.getCmp('V_V_DEPTCODE').getValue()
                            }
                        });

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_CK_EQUTYPECODE',
                store: equTypeStore,
                queryMode: 'local',
                valueField: 'V_CK_EQUTYPECODE',
                displayField: 'V_CK_EQUTYPENAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '点检设备分类',
                editable: false,
                listeners: {
                    change: function () {
                        if (V_EQUTYPECODE != null) {
                        }
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equtype',
                store: eTypeStore,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '设备分类',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('equNameStore').load({
                            params: {
                                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                                v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                v_v_equtypecode: Ext.getCmp('equtype').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equname',
                store: equNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('subequNameStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                                V_V_EQUCODE: Ext.getCmp('equname').getValue()
                            }
                        });
                       /* if (Ext.getCmp('equname').getValue() == '%') {
                            Ext.getCmp('topPanel').setTitle('点检标准设置&nbsp&nbsp<button type="button"; onclick="onbtnclick();style="margin-right:10px">?</button>');
                        }
                        else {
                            Ext.getCmp('topPanel').setTitle(Ext.getCmp('equname').getRawValue() + '点检标准设置&nbsp&nbsp<button type="button" onclick="onbtnclick()">?</button>');
                        }*/

                        Ext.getCmp('equdetail').setValue('<a href="javascript:ondetail(\'' + Ext.getCmp('equname').getValue() + '\')">设备详情</a>');
                    }
                }
            }, {
                xtype: 'combo',
                id: 'subequname',
                store: subequNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '子设备名称',
                editable: false
            }, {
                xtype: 'displayfield',
                labelWidth: 90,
                id: 'equdetail',
                labelAlign: 'right',
                editable: false,
                width: 80,
                labelSeparator: ''
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: function () {
                    _seltctCriterion(V_EQUTYPECODE);
                }
            }, {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                handler: function () {
                    _preInsertCrinterion();
                }
            }, {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                handler: function () {
                    _preUpdateCrinterion();
                }
            }, {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete.png',
                handler: function () {
                    btn_del();
                }
            }]
    });

    var criterionPanel = Ext.create('Ext.grid.Panel', {
        id: 'criterionPanel',
        store: criterionStore,
        pageSize: 15,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50,
            align: 'center'
        },{
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 200
        }, {
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center',
            width: 150
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center',
            width: 200
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center',
            width: 150
        }, {
            text: '点检周期',
            dataIndex: 'V_CRITERION_CYCLE',
            align: 'center',
            width: 100
        }, {
            text: '周期类型',
            dataIndex: 'V_CRITERION_CYCLETYPE',
            align: 'center',
            width: 100
        }, {
            text: '设备状态',
            align: 'center',
            columns: [{
                text: '运行',
                dataIndex: 'V_EQU_STATAE1',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '停止',
                dataIndex: 'V_EQU_STATAE2',
                align: 'center',
                renderer: state,
                width: 80
            }]
        }, {
            text: '点检方法',
            align: 'center',
            columns: [{
                text: '目视',
                dataIndex: 'V_CK_FUNCTION1',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '手摸',
                dataIndex: 'V_CK_FUNCTION2',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '听音',
                dataIndex: 'V_CK_FUNCTION3',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '打击',
                dataIndex: 'V_CK_FUNCTION4',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '嗅觉',
                dataIndex: 'V_CK_FUNCTION5',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '精密',
                dataIndex: 'V_CK_FUNCTION6',
                align: 'center',
                renderer: state,
                width:80
            }, {
                text: '解体',
                dataIndex: 'V_CK_FUNCTION7',
                align: 'center',
                renderer: state,
                width: 80
            }]
        }, {
            text: '启用',
            dataIndex: 'I_FLAG',
            align: 'center',
            renderer: state,
            width: 100
        }, {
            text: '重点',
            dataIndex: 'I_WEIGHT',
            align: 'center',
            renderer: state,
            width: 100
        }, {
            text: '预警',
            dataIndex: 'I_YJ',
            align: 'center',
            renderer: state,
            width: 100
        }, {
            text: '点检设备分类',
            dataIndex: 'V_CK_EQUTYPECODE',
            align: 'center',
            width: 100
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'criterionStore'
        }]

    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        border:false,
        items: [topPanel, criterionPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',//只能边界布局???
        items: [rightPanel]
    });

    Ext.data.StoreManager.lookup('criterionStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_CK_EQUTYPECODE: Ext.getCmp('V_CK_EQUTYPECODE').getValue(),
            V_V_EQUTYPE: Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('equname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
});

function _init() {
    if (orgLoad && equTypeLoad && deptLoad) {

        Ext.getBody().unmask();
    }
}

function _seltctCriterion(V_EQUTYPECODE) {
    var criterionStore = Ext.data.StoreManager.lookup('criterionStore');
    criterionStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_CK_EQUTYPECODE: Ext.getCmp('V_CK_EQUTYPECODE').getValue(),
        V_V_EQUTYPE: Ext.getCmp('equtype').getValue(),
        V_V_EQUCODE: Ext.getCmp('equname').getValue(),
        V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
    };
    criterionStore.load();
}

function _selectDept(V_V_DEPTCODE) {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.load();
}

function _seltctEquTree(V_V_DEPTCODE) {
    var equTreeStore = Ext.data.StoreManager.lookup('equTreeStore');

    equTreeStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': V_V_DEPTCODE
    };
    equTreeStore.load();
}

function _preInsertCrinterion() {

    if( Ext.getCmp('equtype').getValue() == '%')
    {
        Ext.Msg.alert('提示信息', '添加时设备分类不能为全部');

        return ;
    }

    var V_V_CKTYPE = 'defct01';

    var owidth = window.document.body.offsetWidth - 500;
    var oheight = window.document.body.offsetHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_06010101/index.html?V_V_CKTYPE=' + V_V_CKTYPE + '&V_EQUTYPECODE=' + Ext.getCmp('equtype').getValue() + '&V_EQUTYPENAME=' + Ext.getCmp('equtype').getRawValue() + '&V_V_DEPTCODE=' + Ext.getCmp('V_V_DEPTCODE').getSubmitValue() + '&random=' + Math.random()+'&V_V_ORGCODE='+ Ext.getCmp('V_V_ORGCODE').getSubmitValue()+'&V_V_EQUNAME='+Ext.getCmp('equname').getSubmitValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function _preUpdateCrinterion() {

    if( Ext.getCmp('equtype').getValue() == '%')
    {
        Ext.Msg.alert('提示信息', '修改时设备分类不能为全部');

        return ;
    }
    var records = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();

    if (records.length != 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    var owidth = window.document.body.offsetWidth - 100;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_06010102/index.html?V_V_CRITERION_CODE=' + records[0].get('V_CRITERION_CODE') + '&random=' + Math.random()+'&V_V_EQUTYPECODE='+V_EQUTYPECODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,scrollbars=yes,resizable=yes');

}

function btn_del() {
    var seldata = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }
    Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button != "yes") { return; }
        var dflag = 0;
        for (var i = 0; i < seldata.length; i++) {
            Ext.Ajax.request({
                method: 'POST',
                async: false,
                url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_DEL',
                params: {
                    V_V_CRITERION_CODE: seldata[i].data.V_CRITERION_CODE
                },
                success: function (response) {
                    var resp = Ext.decode(response.responseText);
                }
            });
        }
        _seltctCriterion(V_EQUTYPECODE);
    });

}

function btn_plan(ss){
    var seldata = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();
        Ext.Ajax.request({
            method : 'POST',
            async : false,
            url : AppUrl + 'PM_06/PM_06_DJ_CRITERION_DATA_SET',
            params : {
                V_V_CRITERION_CODE : seldata[0].data.V_CRITERION_CODE,
                V_V_FZ_PER : ss
            },
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.RET=='success'){
                    alert("生成计划成功!");
                    Ext.getCmp('window').hide();
                }

            }
        });
}

function runState(a,value,metaData){
    if(a == '1'){
        return '运行';
    }
    else{
        return '停止';
    }
}

function state(a,value,metaData){
    if(a == '1'){
        return '是';
    }
    else{
        return '否';
    }
}

function onbtnclick(){
    alert("点击问号");
}

function winquery(a) {
    Ext.data.StoreManager.lookup('wingridStore').load({
        params: {
            V_V_DEPTCODE: a,
            V_V_POSTCODE: '0101020103'
        }
    });
}

function ondetail(a){
    if(Ext.getCmp('equname').getValue() == '%'){
        alert("请选择设备");
        return false;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_01010101/index.html?V_EQUCODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}