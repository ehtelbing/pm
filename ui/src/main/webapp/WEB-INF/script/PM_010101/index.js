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

function _preInsertCrinterion(){
    var owidth = window.document.body.offsetWidth - 500;
    var oheight = window.document.body.offsetHeight - 50;
    window.open(AppUrl + 'page/PM_06010101/index.html?V_EQUTYPECODE=' + Ext.getCmp('equtype').getValue() + '&V_EQUTYPENAME='
        + Ext.getCmp('equtype').getRawValue() + '&V_V_DEPTCODE=' + Ext.getCmp('V_V_DEPTCODE').getSubmitValue() + '&random=' + Math.random()+'&V_V_ORGCODE='+ Ext.getCmp('V_V_ORGCODE').getSubmitValue()+'&V_V_EQUNAME='+Ext.getCmp('equname').getSubmitValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

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

    var owidth = window.document.body.offsetWidth - 100;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_06010102/index.html?V_V_CRITERION_CODE=' + records[0].get('V_CRITERION_CODE'), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,scrollbars=yes,resizable=yes');
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