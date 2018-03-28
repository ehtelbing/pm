Ext.onReady(function () {
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
                'V_V_PERSONCODE':  Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
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
        }
    });

    var criterionStore = Ext.create('Ext.data.Store', {
        storeId: 'criterionStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['V_EQUNAME','V_CRITERION_CODE', 'V_CRITERION_ITEM', 'V_CRITERION_CONTENT', 'V_CRITERION_CR','V_DEPTCODE','V_PLAN_STATE',
            'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_SATAE', 'V_CK_FUNCTION1', 'V_CK_FUNCTION2','V_PLAN_TIME',
            'V_CK_FUNCTION3', 'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7','V_PLAN_PER',
            'V_CK_FUNCTION8', 'D_CKDATE', 'V_CK_EQUTYPECODE','I_FLAG','I_WEIGHT','I_YJ','V_EQU_STATAE1','V_EQU_STATAE2','V_INPERNAME','V_PLAN_PERNAME'],
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

    var postFromDJYStore = Ext.create('Ext.data.Store', {
        storeId: 'postFromDJYStore',
        autoLoad:true,
        fields: ['V_POSTCODE', 'V_POSTNAME'],
        proxy: {
            url: AppUrl + 'hp/PRO_BASE_POST_DJY',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        id : 'topPanel',
        region: 'north',
        layout:'column',
        border:false,
        titleAlign : 'center',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            store: orgStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            labelWidth: 90,
            forceSelection: true,
            fieldLabel: '单位',
            editable: false
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
            editable: false
        },  {
            xtype: 'combo',
            id: 'equtype',
            store: eTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            labelWidth: 90,
            forceSelection: true,
            fieldLabel: '设备类型',
            editable: false
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
            editable: false
        },{
            xtype:'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: function () {
                _seltctCriterion();
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
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel'
        },
        columns: [{
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 200
        },{
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center',
            width : 150
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center',
            width : 150
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center',
            width : 150
        }, {
            text: '点检周期',
            dataIndex: 'V_CRITERION_CYCLE',
            align: 'center',
            width : 80
        }, {
            text: '周期类型',
            dataIndex: 'V_CRITERION_CYCLETYPE',
            align: 'center',
            width : 80
        },{
            text: '设备状态',
            align: 'center',
            columns : [{text: '运行',
                dataIndex: 'V_EQU_STATAE1',
                align: 'center',
                renderer : state,
                width : 80
            },{
                text: '停止',
                dataIndex: 'V_EQU_STATAE2',
                align: 'center',
                renderer : state,
                width : 80
            }]
        },{
            text: '设备状态',
            align: 'center',
            columns : [{
                text: '目视',
                dataIndex: 'V_CK_FUNCTION1',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '手摸',
                dataIndex: 'V_CK_FUNCTION2',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '听音',
                dataIndex: 'V_CK_FUNCTION3',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '打击',
                dataIndex: 'V_CK_FUNCTION4',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '嗅觉',
                dataIndex: 'V_CK_FUNCTION5',
                align: 'center',
                renderer : state,
                width : 80
            },{
                text: '精密',
                dataIndex: 'V_CK_FUNCTION6',
                align: 'center',
                renderer : state,
                width : 80
            },{
                text: '解体',
                dataIndex: 'V_CK_FUNCTION7',
                align: 'center',
                renderer : state,
                width : 80
            }]
        }, {
            text: '计划状态',
            dataIndex: 'V_PLAN_STATE',
            align: 'center',
            renderer : planstate,
            width : 100
        }, {
            text: '生成计划时间',
            dataIndex: 'V_PLAN_TIME',
            align: 'center',
            width : 200
        }, {
            text: '生成计划人',
            dataIndex: 'V_PLAN_PERNAME',
            align: 'center',
            width : 100
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


    Ext.create('Ext.container.Viewport', {
        layout: 'border',//只能边界布局???
        items: [ topPanel, criterionPanel]
    });


    Ext.data.StoreManager.lookup('orgStore').on('load',function(){
        Ext.getCmp('V_V_ORGCODE').select(Ext.data.StoreManager.lookup('orgStore').getAt(0));
        Ext.data.StoreManager.lookup('deptStore').load({
            params:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        })
    });

    Ext.data.StoreManager.lookup('deptStore').on('load',function(){
        Ext.getCmp('V_V_DEPTCODE').select(Ext.data.StoreManager.lookup('deptStore').getAt(0));

        Ext.data.StoreManager.lookup('eTypeStore').load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp('V_V_DEPTCODE').getValue()
            }
        })
    })

    Ext.data.StoreManager.lookup('eTypeStore').on('load',function(){
        Ext.getCmp('equtype').select(Ext.data.StoreManager.lookup('eTypeStore').getAt(0));

        Ext.data.StoreManager.lookup('equNameStore').load({
            params : {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
                v_v_equtypecode: Ext.getCmp('equtype').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('equNameStore').on('load',function(){
        Ext.getCmp('equname').select(Ext.data.StoreManager.lookup('equNameStore').getAt(0));

        _seltctCriterion();
    });

    Ext.getCmp('V_V_ORGCODE').on('select',function(){
        Ext.data.StoreManager.lookup('deptStore').load({
            params:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        })
    });

    Ext.getCmp('V_V_DEPTCODE').on('select',function(){
        Ext.data.StoreManager.lookup('eTypeStore').load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp('V_V_DEPTCODE').getValue()
            }
        })
    });

    Ext.getCmp('equtype').on('select',function(){
        Ext.data.StoreManager.lookup('equNameStore').load({
            params : {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
                v_v_equtypecode: Ext.getCmp('equtype').getValue()
            }
        });
    });

    Ext.getCmp('equname').on('select',function(){
        _seltctCriterion();
    });

    Ext.data.StoreManager.lookup('criterionStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_CK_EQUTYPECODE: '%',
            V_V_EQUTYPE: Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('equname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
});

function _seltctCriterion(){
    Ext.data.StoreManager.lookup('criterionStore').load({
        params:{
            V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_CK_EQUTYPECODE: '%',
            V_V_EQUTYPE: Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('equname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
}

function state(a,value,metaData){
    if(a == '1'){
        return '是';
    }
    else{
        return '否';
    }
}

function planstate(a,metaData,record){
    if(a == '0'){
        return '已生成';
    }
    else{
        metaData.style = "text-align:center;color:red";
        return '未生成';
    }
}
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var V_V_DEPTCODE;
var random;
var V_V_ORGCODE;
var V_V_EQUNAME;
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
function _preInsertCrinterion(){
    var owidth = window.document.body.offsetWidth - 500;
    var oheight = window.document.body.offsetHeight - 50;
    V_EQUTYPECODE= Ext.getCmp('equtype').getValue();
    V_EQUTYPENAME= Ext.getCmp('equtype').getRawValue();
    V_V_DEPTCODE= Ext.getCmp('V_V_DEPTCODE').getSubmitValue();
    random= Math.random();
    V_V_ORGCODE= Ext.getCmp('V_V_ORGCODE').getSubmitValue();
    V_V_EQUNAME= Ext.getCmp('equname').getSubmitValue();
    // window.open(AppUrl + 'page/PM_06010101/index.html?V_EQUTYPECODE=' + Ext.getCmp('equtype').getValue() +
    //     '&V_EQUTYPENAME=' + Ext.getCmp('equtype').getRawValue() + '&V_V_DEPTCODE=' + Ext.getCmp('V_V_DEPTCODE').getSubmitValue() +
    //     '&random=' + Math.random()+'&V_V_ORGCODE='+ Ext.getCmp('V_V_ORGCODE').getSubmitValue()+
    //     '&V_V_EQUNAME='+Ext.getCmp('equname').getSubmitValue(), '',
    //     'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    var jhlxStore = Ext.create('Ext.data.Store', {
        id: 'jhlxStore',
        autoLoad: true,
        fields: ['I_ID', 'V_CKTYPE', 'V_CKTYPENAME', 'I_ORDER'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'basic/PRO_PM_06_CK_TYPE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_CKTYPE': '%'
            }
        }
    });
    var eTypeStore1 = Ext.create('Ext.data.Store', {
        id: 'eTypeStore1',
        autoLoad: true,
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
            },
            extraParams: {
                'V_V_PERSONCODE' : V_V_PERSONCODE,
                'V_V_DEPTCODENEXT' : V_V_DEPTCODE
            }
        }
    });
    var basedicStore = Ext.create('Ext.data.Store', {
        id: 'basedicStore',
        autoLoad: true,
        fields: ['I_BASEID', 'V_EDIT_GUID', 'V_BASENAME', 'D_DATE_EDITTIME', 'V_BASEMEMO', 'V_BASETYPE', 'V_BASECODE', 'I_ORDERID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_BASETYPE': 'PM/WEEKTYPE'
            }
        },
        listeners: {
            load: function (store, records) {
                basedicLoad = true;
                Ext.getCmp('V_V_CRITERION_CYCLETYPE').select(store.first());
                _init();
            }
        }
    });
    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 900,
        height: 500,
        title : '手工消缺',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region:'center',
        layout : 'vbox',
        items: [{
            xtype: 'fieldset',
            height: 450,
            width: 580,
            style: 'margin-left:10px;',
            defaults: {
                frame: true,
                baseCls: 'my-panel-no-border',
                style: 'margin-top:12px'
            },
            items: [{
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{id: 'V_V_CKTYPE',
                    xtype: 'combo',
                    store: jhlxStore,
                    fieldLabel: '点检类型',
                    editable: false,
                    labelWidth: 70,
                    queryMode: 'local',
                    displayField: 'V_CKTYPENAME',
                    valueField: 'V_CKTYPE',
                    labelAlign: 'right'
                }, {
                    xtype: 'combo',
                    id: 'V_V_EQUTYPENAME1',
                    store: eTypeStore1,
                    fieldLabel: '设备类型',
                    editable: false,
                    labelWidth: 70,
                    queryMode: 'local',
                    displayField: 'V_EQUTYPENAME',
                    valueField: 'V_EQUTYPECODE',
                    labelAlign: 'right'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_ITEM',
                    fieldLabel: '点检项目',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CONTENT',
                    fieldLabel: '点检内容',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CR',
                    fieldLabel: '点检标准',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_V_CRITERION_CYCLE',
                    labelWidth: 90,
                    width: 300,
                    nanText: "请输入有效数字",
                    value: 0,
                    minValue:0,
                    fieldLabel: '点检周期',
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    id: 'V_V_CRITERION_CYCLETYPE',
                    store: basedicStore,
                    queryMode: 'local',
                    valueField: 'V_BASECODE',
                    displayField: 'V_BASENAME',
                    forceSelection: true,
                    allowBlank: false,
                    padding: '0px 0px 0px 20px',
                    labelWidth: 90,
                    editable: false,
                    width: 180
                },]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'V_V_EQU_STATE',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 30px 0px 0px'
                },
                layout: 'column',
                //vertical: false,
                items: [{
                    //xtype:'checkbox',
                    fieldLabel:      '设备状态',
                    labelWidth: 90,
                    name:'V_V_EQU_STATE',
                    id: 'V_V_EQU_STATE1',
                    boxLabel: '运行',
                    inputValue: '1'
                }, {
                    id: 'V_V_EQU_STATE2',
                    name:'V_V_EQU_STATE',
                    boxLabel: '停止',
                    inputValue: '1'
                }]
            }, {

                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'V_V_CK_FUNCTION',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION1',
                    fieldLabel: '点检方法',
                    labelWidth: 90,
                    boxLabel: '目视',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION2',
                    boxLabel: '手摸',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION3',
                    boxLabel: '听音',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION4',
                    boxLabel: '打击',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION5',
                    boxLabel: '嗅觉',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION6',
                    boxLabel: '精密',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION7',
                    boxLabel: '解体',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 300
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_I_ORDER',
                    value: 0,
                    allowBlank: false,
                    fieldLabel: '排序',
                    nanText: "请输入有效数字",
                    labelWidth: 90
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq3',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype:'checkboxfield',
                    id: 'V_I_FLAG',
                    fieldLabel: '启用',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_FLAG',
                    checked:true,
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq4',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype:'checkboxfield',
                    id: 'V_I_WEIGHT',
                    fieldLabel: '重点',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_WEIGHT',
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq5',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype:'checkboxfield',
                    id: 'V_I_YJ',
                    fieldLabel: '预警',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_YJ',
                    inputValue: '1'
                }]
            }]
        }],
        buttons : [
            {
                xtype: 'button',
                text: '保存',
                margin: '8 0 5 50',
                style: 'padding-left:10px;padding-right:10px',
                handler: _insertPM06
            }, {
                xtype: 'button',
                text: '取消',
                style: 'margin-left:20px;padding-left:10px;padding-right:10px',
                handler: _close
            }]
    });
    Ext.getCmp('windowEqu').show();
    Ext.data.StoreManager.lookup('jhlxStore').on('load',function(){
        Ext.getCmp('V_V_CKTYPE').select(Ext.data.StoreManager.lookup('jhlxStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('eTypeStore1').on('load',function(){
        Ext.getCmp('V_V_EQUTYPENAME1').select(Ext.data.StoreManager.lookup('eTypeStore1').getAt(0));
    });

    _init();
}
var V_V_CRITERION_CODE;
var criteion;
function _preUpdateCrinterion(){

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
    V_V_CRITERION_CODE= records[0].get('V_CRITERION_CODE');
    var owidth = window.document.body.offsetWidth - 100;
    var oheight = window.document.body.offsetHeight - 100;
    // window.open(AppUrl + 'page/PM_06010102/index.html?V_V_CRITERION_CODE=' + records[0].get('V_CRITERION_CODE'),
    //     '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,scrollbars=yes,resizable=yes');
    var jhlxStore = Ext.create('Ext.data.Store', {
        id: 'jhlxStore',
        autoLoad: true,
        fields: ['I_ID', 'V_CKTYPE', 'V_CKTYPENAME', 'I_ORDER'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'basic/PRO_PM_06_CK_TYPE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_CKTYPE': '%'
            }
        }
    });
    var basedicStore = Ext.create('Ext.data.Store', {
        id: 'basedicStore',
        autoLoad: true,
        fields: ['I_BASEID', 'V_EDIT_GUID', 'V_BASENAME', 'D_DATE_EDITTIME', 'V_BASEMEMO', 'V_BASETYPE', 'V_BASECODE', 'I_ORDERID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_BASETYPE': 'PM/WEEKTYPE'
            }
        },
        listeners: {
            load: function (store, records) {
                basedicLoad = true;
                Ext.getCmp('V_V_CRITERION_CYCLETYPE').select(store.first());
                _init1();
            }
        }
    });

    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 900,
        height: 500,
        title : '手工消缺',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region:'center',
        layout : 'vbox',
        items: [{
            xtype: 'fieldset',
            height: 460,
            width: 580,
            style: 'margin-left:10px;',
            defaults: {
                frame: true,
                baseCls: 'my-panel-no-border',
                style: 'margin-top:12px'
            },
            items: [{
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{id: 'V_V_CKTYPE',
                    xtype: 'combo',
                    store: jhlxStore,
                    fieldLabel: '点检类型',
                    editable: false,
                    labelWidth: 70,
                    queryMode: 'local',
                    displayField: 'V_CKTYPENAME',
                    valueField: 'V_CKTYPE',
                    labelAlign: 'right'
                }, {
                    readOnly: true,
                    id: 'V_V_EQUTYPENAME',
                    fieldLabel: '设备类型',
                    allowBlank: false,
                    labelWidth: 80
                },]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_ITEM',
                    fieldLabel: '点检项目',
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CONTENT',
                    fieldLabel: '点检内容',
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CR',
                    fieldLabel: '点检标准',
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_V_CRITERION_CYCLE',
                    labelWidth: 80,
                    width: 300,
                    nanText: "请输入有效数字",
                    value: 0,
                    minValue:0,
                    fieldLabel: '点检周期',
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    id: 'V_V_CRITERION_CYCLETYPE',
                    store: basedicStore,
                    queryMode: 'local',
                    valueField: 'V_BASECODE',
                    displayField: 'V_BASENAME',
                    forceSelection: true,
                    allowBlank: false,
                    padding: '0px 0px 0px 20px',
                    labelWidth: 80,
                    editable: false,
                    width: 180
                },]
            }, {
                id: 'V_V_EQU_STATE',
                layout: 'hbox',
                defaults: {
                    xtype: 'checkbox',
                    baseCls: 'my-panel-no-border',
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    fieldLabel: '设备状态',
                    labelWidth: 80,
                    name: 'V_V_EQU_STATE',
                    id: 'V_V_EQU_STATE1',
                    boxLabel: '运行',
                    inputValue: '1'
                }, {
                    id: 'V_V_EQU_STATE2',
                    name: 'V_V_EQU_STATE',
                    boxLabel: '停止',
                    inputValue: '1'
                }]
            }, {

                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'V_V_CK_FUNCTION',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION1',
                    fieldLabel: '点检方法',
                    labelWidth: 80,
                    boxLabel: '目视',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION2',
                    boxLabel: '手摸',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION3',
                    boxLabel: '听音',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION4',
                    boxLabel: '打击',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION5',
                    boxLabel: '嗅觉',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION6',
                    boxLabel: '精密',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION7',
                    boxLabel: '解体',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 300
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_I_ORDER',
                    value: 0,
                    allowBlank: false,
                    fieldLabel: '排序',
                    nanText: "请输入有效数字",
                    labelWidth: 80
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq3',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_FLAG',
                    fieldLabel: '启用',
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_FLAG',
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq4',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_WEIGHT',
                    fieldLabel: '重点',
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_WEIGHT',
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq5',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_YJ',
                    fieldLabel: '预警',
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_YJ',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 500
                    //editable:false,
                },
                items: []
            }]
        }],
        buttons : [
            {
                xtype: 'button',
                text: '保存',
                margin: '8 0 5 50',
                style: 'padding-left:10px;padding-right:10px',
                handler: _insertPM07
            }, {
                xtype: 'button',
                text: '取消',
                style: 'margin-left:20px;padding-left:10px;padding-right:10px',
                handler: _close
            }]
    });
    Ext.getCmp('windowEqu').show();
    _init1();
}

function btn_del(){
    var seldata = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }
    Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button != "yes") { return; }
        var dflag = 0;
        var num=0;
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
                    if(resp.RET=='SUCCESS'){
                        num++;
                    }else{
                        alert('删除失败！')
                        num++;
                    }
                }
            });
        }
        if (num==seldata.length){
            _seltctCriterion();
        }
    });
}

function _init() {
    Ext.getBody().unmask();
}

function _insertPM06() {
    if (Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue() == '' || Ext.getCmp('V_I_ORDER').getSubmitValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    var V_V_EQU_STATE1 = Ext.getCmp('V_V_EQU_STATE1').getSubmitValue();
    var V_V_EQU_STATE2 = Ext.getCmp('V_V_EQU_STATE2').getSubmitValue();
    var V_V_CK_FUNCTION1 = Ext.getCmp('V_V_CK_FUNCTION1').getSubmitValue();
    var V_V_CK_FUNCTION2 = Ext.getCmp('V_V_CK_FUNCTION2').getSubmitValue();
    var V_V_CK_FUNCTION3 = Ext.getCmp('V_V_CK_FUNCTION3').getSubmitValue();
    var V_V_CK_FUNCTION4 = Ext.getCmp('V_V_CK_FUNCTION4').getSubmitValue();
    var V_V_CK_FUNCTION5 = Ext.getCmp('V_V_CK_FUNCTION5').getSubmitValue();
    var V_V_CK_FUNCTION6 = Ext.getCmp('V_V_CK_FUNCTION6').getSubmitValue();
    var V_V_CK_FUNCTION7 = Ext.getCmp('V_V_CK_FUNCTION7').getSubmitValue();
    var V_I_FLAG = Ext.getCmp('V_I_FLAG').getSubmitValue();
    var V_I_WEIGHT = Ext.getCmp('V_I_WEIGHT').getSubmitValue();
    var V_I_YJ = Ext.getCmp('V_I_YJ').getSubmitValue();


    if (V_V_EQU_STATE1 == null) {
        V_V_EQU_STATE1 = 0;
    }

    if (V_V_EQU_STATE2 == null) {
        V_V_EQU_STATE2 = 0;
    }

    if (V_V_CK_FUNCTION1 == null) {
        V_V_CK_FUNCTION1 = 0;
    }
    if (V_V_CK_FUNCTION2 == null) {
        V_V_CK_FUNCTION2 = 0;
    }
    if (V_V_CK_FUNCTION3 == null) {
        V_V_CK_FUNCTION3 = 0;
    }
    if (V_V_CK_FUNCTION4 == null) {
        V_V_CK_FUNCTION4 = 0;
    }
    if (V_V_CK_FUNCTION5 == null) {
        V_V_CK_FUNCTION5 = 0;
    }
    if (V_V_CK_FUNCTION6 == null) {
        V_V_CK_FUNCTION6 = 0;
    }
    if (V_V_CK_FUNCTION7 == null) {
        V_V_CK_FUNCTION7 = 0;
    }
    if (V_I_FLAG == null) {
        V_I_FLAG = 0;
    }
    if (V_I_WEIGHT == null) {
        V_I_WEIGHT = 0;
    }
    if (V_I_YJ == null) {
        V_I_YJ = 0;
    }

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_06_DJ_CRITERION_SETN',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_ORGCODE': V_V_ORGCODE,
            'V_V_DEPTCODE': V_V_DEPTCODE,
            'V_V_CK_EQUTYPECODE': '动态设备',
            'V_V_EQUTYPE': Ext.getCmp('V_V_EQUTYPENAME1').getValue(),
            'V_V_EQUCODE': V_V_EQUNAME,
            'V_V_CRITERION_CODE': '',
            'V_V_CRITERION_ITEM': Ext.getCmp('V_V_CRITERION_ITEM').getSubmitValue(),
            'V_V_CRITERION_CONTENT': Ext.getCmp('V_V_CRITERION_CONTENT').getSubmitValue(),
            'V_V_CRITERION_CR': Ext.getCmp('V_V_CRITERION_CR').getSubmitValue(),
            'V_V_CRITERION_CYCLE': Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue(),
            'V_V_CRITERION_CYCLETYPE': Ext.getCmp('V_V_CRITERION_CYCLETYPE').getSubmitValue(),
            'V_V_EQU_STATE1': V_V_EQU_STATE1,
            'V_V_EQU_STATE2': V_V_EQU_STATE2,
            'V_V_CK_FUNCTION1': V_V_CK_FUNCTION1,
            'V_V_CK_FUNCTION2': V_V_CK_FUNCTION2,
            'V_V_CK_FUNCTION3': V_V_CK_FUNCTION3,
            'V_V_CK_FUNCTION4': V_V_CK_FUNCTION4,
            'V_V_CK_FUNCTION5': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION6': V_V_CK_FUNCTION6,
            'V_V_CK_FUNCTION7': V_V_CK_FUNCTION7,
            'V_V_CK_FUNCTION8': '0',
            'V_I_ORDER': Ext.getCmp('V_I_ORDER').getSubmitValue(),
            'V_V_PLAN_STATE': '1',
            'V_I_FLAG': V_I_FLAG,
            'V_V_CKTYPE': Ext.getCmp('V_V_CKTYPE').getValue(),
            'V_I_WEIGHT': V_I_WEIGHT,
            'V_I_YJ': V_I_YJ,
            'V_V_INPER': Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if(data.RET=='success'){
                    _seltctCriterion();
                    _close();
                }else{
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
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

function _close() {
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_010101/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

function _init1() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_CRITERION_CODE': V_V_CRITERION_CODE
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    criteion = data.list[0];
                    Ext.getCmp('V_V_CKTYPE').select(criteion.V_CKTYPE);
                    Ext.getCmp('V_V_EQUTYPENAME').setValue(criteion.V_EQUTYPENAME);
                    Ext.getCmp('V_V_CRITERION_ITEM').setValue(criteion.V_CRITERION_ITEM);
                    Ext.getCmp('V_V_CRITERION_CONTENT').setValue(criteion.V_CRITERION_CONTENT);
                    Ext.getCmp('V_V_CRITERION_CR').setValue(criteion.V_CRITERION_CR);
                    Ext.getCmp('V_V_CRITERION_CYCLE').setValue(criteion.V_CRITERION_CYCLE);
                    Ext.getCmp('V_V_CRITERION_CYCLETYPE').setValue(criteion.V_CRITERION_CYCLETYPE);
                    if (criteion.V_EQU_STATAE1 == 1) {
                        Ext.getCmp('V_V_EQU_STATE1').setValue(true);
                    }
                    if (criteion.V_EQU_STATAE2 == 1) {
                        Ext.getCmp('V_V_EQU_STATE2').setValue(true);
                    }
                    Ext.getCmp('V_V_CK_FUNCTION1').setValue(criteion.V_CK_FUNCTION1);
                    Ext.getCmp('V_V_CK_FUNCTION2').setValue(criteion.V_CK_FUNCTION2);
                    Ext.getCmp('V_V_CK_FUNCTION3').setValue(criteion.V_CK_FUNCTION3);
                    Ext.getCmp('V_V_CK_FUNCTION4').setValue(criteion.V_CK_FUNCTION4);
                    Ext.getCmp('V_V_CK_FUNCTION5').setValue(criteion.V_CK_FUNCTION5);

                    if (criteion.I_FLAG == 1) {
                        Ext.getCmp('V_I_FLAG').setValue(1);
                    }
                    if (criteion.I_WEIGHT == 1) {
                        Ext.getCmp('V_I_WEIGHT').setValue(1);
                    }
                    if (criteion.I_YJ == 1) {
                        Ext.getCmp('V_I_YJ').setValue(1);
                    }
                }
            }
        }
    });

    Ext.getBody().unmask();
}

function _insertPM07() {
    if (Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue() == '' || Ext.getCmp('V_I_ORDER').getSubmitValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    var V_V_EQU_STATE1 = Ext.getCmp('V_V_EQU_STATE1').getSubmitValue();
    var V_V_EQU_STATE2 = Ext.getCmp('V_V_EQU_STATE2').getSubmitValue();
    var V_V_CK_FUNCTION1 = Ext.getCmp('V_V_CK_FUNCTION1').getSubmitValue();
    var V_V_CK_FUNCTION2 = Ext.getCmp('V_V_CK_FUNCTION2').getSubmitValue();
    var V_V_CK_FUNCTION3 = Ext.getCmp('V_V_CK_FUNCTION3').getSubmitValue();
    var V_V_CK_FUNCTION4 = Ext.getCmp('V_V_CK_FUNCTION4').getSubmitValue();
    var V_V_CK_FUNCTION5 = Ext.getCmp('V_V_CK_FUNCTION5').getSubmitValue();
    var V_V_CK_FUNCTION6 = Ext.getCmp('V_V_CK_FUNCTION6').getSubmitValue();
    var V_V_CK_FUNCTION7 = Ext.getCmp('V_V_CK_FUNCTION7').getSubmitValue();
    var V_I_FLAG = Ext.getCmp('V_I_FLAG').getSubmitValue();
    var V_I_WEIGHT = Ext.getCmp('V_I_WEIGHT').getSubmitValue();
    var V_I_YJ = Ext.getCmp('V_I_YJ').getSubmitValue();

    if (V_V_EQU_STATE1 == null) {
        V_V_EQU_STATE1 = 0;
    }

    if (V_V_EQU_STATE2 == null) {
        V_V_EQU_STATE2 = 0;
    }

    if (V_V_CK_FUNCTION1 == null) {
        V_V_CK_FUNCTION1 = 0;
    }
    if (V_V_CK_FUNCTION2 == null) {
        V_V_CK_FUNCTION2 = 0;
    }
    if (V_V_CK_FUNCTION3 == null) {
        V_V_CK_FUNCTION3 = 0;
    }
    if (V_V_CK_FUNCTION4 == null) {
        V_V_CK_FUNCTION4 = 0;
    }
    if (V_V_CK_FUNCTION5 == null) {
        V_V_CK_FUNCTION5 = 0;
    }
    if (V_V_CK_FUNCTION6 == null) {
        V_V_CK_FUNCTION6 = 0;
    }
    if (V_V_CK_FUNCTION7 == null) {
        V_V_CK_FUNCTION7 = 0;
    }
    if (V_I_FLAG == null) {
        V_I_FLAG = 0;
    }
    if (V_I_WEIGHT == null) {
        V_I_WEIGHT = 0;
    }
    if (V_I_YJ == null) {
        V_I_YJ = 0;
    }

    Ext.Ajax.request({
        url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_ORGCODE': criteion.V_ORGCODE,
            'V_V_DEPTCODE': criteion.V_DEPTCODE,
            'V_V_CK_EQUTYPECODE':'动态设备',
            'V_V_EQUTYPE': criteion.V_EQUTYPECODE ,
            'V_V_EQUCODE': criteion.V_EQUCODE,
            'V_V_CRITERION_CODE': V_V_CRITERION_CODE,
            'V_V_CRITERION_ITEM': Ext.getCmp('V_V_CRITERION_ITEM').getSubmitValue(),
            'V_V_CRITERION_CONTENT': Ext.getCmp('V_V_CRITERION_CONTENT').getSubmitValue(),
            'V_V_CRITERION_CR': Ext.getCmp('V_V_CRITERION_CR').getSubmitValue(),
            'V_V_CRITERION_CYCLE': Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue(),
            'V_V_CRITERION_CYCLETYPE': Ext.getCmp('V_V_CRITERION_CYCLETYPE').getSubmitValue(),
            'V_V_EQU_STATE1': V_V_EQU_STATE1,
            'V_V_EQU_STATE2': V_V_EQU_STATE2,
            'V_V_CK_FUNCTION1': V_V_CK_FUNCTION1,
            'V_V_CK_FUNCTION2': V_V_CK_FUNCTION2,
            'V_V_CK_FUNCTION3': V_V_CK_FUNCTION3,
            'V_V_CK_FUNCTION4': V_V_CK_FUNCTION4,
            'V_V_CK_FUNCTION5': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION6': V_V_CK_FUNCTION6,
            'V_V_CK_FUNCTION7': V_V_CK_FUNCTION7,
            'V_V_CK_FUNCTION8': '0',
            'V_I_ORDER': Ext.getCmp('V_I_ORDER').getSubmitValue(),
            'V_I_FLAG': V_I_FLAG,
            'V_V_CKTYPE': Ext.getCmp('V_V_CKTYPE').getValue(),
            'V_I_WEIGHT': V_I_WEIGHT,
            'V_I_YJ': V_I_YJ,
            'V_V_INPER': Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if (data.RET == 'success') {
                _seltctCriterion();
                    _close();
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
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