
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
            url: AppUrl + 'hp/PM_06_DJ_CRITERION_NOGENERATE',
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
            xtype:'button',
            text: '生成点检计划',
            icon: imgpath + '/add.png',
            handler: function () {
                var seldata = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();
                if(seldata.length == 0){
                    alert("请至少选择一条数据！");
                }
                else{
                    btn_plan();
                }
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

    var winjhlxStore = Ext.create('Ext.data.Store', {
        id: 'winjhlxStore',
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

    var win = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 400,
        height: 450,
        bodyPadding: 15,
        layout: 'vbox',
        title: '选择岗位',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winjhlx',
            xtype: 'combo',
            store: winjhlxStore,
            fieldLabel: '点检类型',
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            displayField: 'V_CKTYPENAME',
            valueField: 'V_CKTYPE',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right'
        },{
            id: 'wingw',
            xtype: 'combo',
            store: postFromDJYStore,
            fieldLabel: '点检岗位',
            editable: false,
            labelWidth: 70,
            displayField: 'V_POSTNAME',
            valueField: 'V_POSTCODE',
            queryMode: 'local',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                save();
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

    Ext.data.StoreManager.lookup('postFromDJYStore').on('load',function(){
        Ext.getCmp('wingw').select( Ext.data.StoreManager.lookup('postFromDJYStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('winjhlxStore').on('load',function(){
        Ext.getCmp('winjhlx').select(Ext.data.StoreManager.lookup('winjhlxStore').getAt(0));
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

function btn_plan(){
    Ext.getCmp('window').show();
}

function save(){
    var seldata = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();
    if (seldata.length==0){
        alert('请至少选择一条数据，生成点检计划！');
        return ;
    }
    var num=0;
    for(var i=0;i<seldata.length;i++){
        Ext.Ajax.request({
            method : 'POST',
            async : false,
            url : AppUrl + 'basic/PM_06_DJ_CRITERION_SETBYGW',
            params : {
                V_V_DEPTCODE :Ext.getCmp('V_V_DEPTCODE').getValue(),
                V_V_CRITERION_CODE : seldata[i].data.V_CRITERION_CODE,
                V_V_POSTCODE :Ext.getCmp('wingw').getValue(),
                V_V_PLAN_STATE : '0',
                V_V_PLAN_TIME : Ext.util.Format.date(new Date(), 'Y-m-d H:i:s'),
                V_V_PLAN_PER : Ext.util.Cookies.get('v_personcode'),
                V_V_DJ_TYPE:Ext.getCmp('winjhlx').getValue()
            },
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.ret=='success'){
                    num++;
                }else{
                    alert('生成点检计划失败！')
                    num++;
                }
            }
        });
        if(num==seldata.length){
            _seltctCriterion();
            Ext.getCmp('window').hide();
        }
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

function planstate(a,metaData,record){
    if(a == '0'){
        return '已生成';
    }
    else{
        metaData.style = "text-align:center;color:red";
        return '未生成';
    }
}