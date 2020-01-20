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

Ext.onReady(function(){
    Ext.getBody().mask('<p>页面载入中...</p>');

    var standardInfoStore = Ext.create('Ext.data.Store',{
        storeId : 'standardInfoStore',
        autoLoad : false,
        loading : false,
        pageSize : 20,
        fields : ['V_PLAN_TIME','V_FACT_TIME','V_ORGNAME','V_EQUTYPENAME','V_GGXH','V_EQUCODE','V_EQUNAME','V_GNWZ','V_LOC_NAME','V_PARTNAME','V_OIL_TYPE','V_OIL_SIGN','V_FACT_OIL_SIGN','V_OIL_NUM','V_FACT_OIL_NUM','V_ZXR'],
        proxy : {
            url : AppUrl + 'oil/selectStandardInfoFact',
            async :true,
            type : 'ajax',
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list',
                totalProperty : 'total'
            }
        }
    });

    //厂矿store
    var baseDeptStore = Ext.create('Ext.data.Store', {
        storeId: 'baseDeptStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: 20,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                _init();//自动加载时必须调用
            }
        }
    });

    //作业区store(替换成部门store)
    var baseDept1Store = Ext.create('Ext.data.Store', {
        storeId: 'baseDept1Store',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('DEPT_CODE_').select(store.first());
            }
        }
    });

    //产线store
    var pm03PlanYearCXStore = Ext.create('Ext.data.Store', {
        storeId: 'pm03PlanYearCXStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CXCODE', 'V_CXNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectProductLine',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                store.insert(0, {
                    V_CXCODE : '%',
                    V_CXNAME : '--全部--'
                });
                Ext.getCmp('V_V_CXCODE').select(store.first());
            }
        }
    });

    //设备类型store
    var pm03PlanYearCXEQUStore = Ext.create('Ext.data.Store', {
        storeId: 'pm03PlanYearCXEQUStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectEquipType',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                store.insert(0, {
                    V_EQUTYPECODE : '%',
                    V_EQUTYPENAME : '--全部--'
                });
                Ext.getCmp('V_V_EQUTYPECODE').select(store.first());
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel',{
        id : 'buttonPanel',
        defaults : {
            style : 'margin :2px;'
        },
        items : [{
            xtype : 'button',
            text : '查询',
            handler : _selectStandardInfo
        },{
            xtype : 'button',
            text : '导出',
            handler : _exportStandardInfo
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel',{
        id : 'formPanel',
        layout : 'column',
        frame : true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth: 140,
            margin : '4'
        },
        items : [{
            xtype: 'combo',
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
            store: baseDeptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '选择厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                       _selectDept();
                       _selectProductLine();
                       _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            store: baseDept1Store,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '选择部门',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectProductLine();
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_CXCODE',
            name: 'V_V_CXCODE',
            store: pm03PlanYearCXStore,
            queryMode: 'local',
            valueField: 'V_CXCODE',
            displayField: 'V_CXNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '选择产线',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_EQUTYPECODE',
            name: 'V_V_EQUTYPECODE',
            store: pm03PlanYearCXEQUStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '设备类型'
        },{
            xtype : 'datefield',
            format : 'Y-m-d',
            submitFormat : 'Y-m-d',
            fieldLabel : '计划时间',
            value : new Date(),
            editable: false,
            id : 'V_V_PLANTIME',
            name : 'V_V_PLANTIME'

        },{
            xtype : 'textfield',
            fieldLabel : '设备编码',
            id : 'V_V_EQUCODE',
            name : 'V_V_EQUCODE'
        },{
            xtype : 'textfield',
            fieldLabel : '设备名称',
            id : 'V_V_EQUNAME',
            name : 'V_V_EQUNAME'
        }]
    });

    var standardInfoPanel = Ext.create('Ext.grid.Panel',{
        id : 'standardInfoPanel',
        store : standardInfoStore,
        title: '润滑记录查询',
        frame : true,
        columnLines : true,
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SIMPLE'
        },listeners : {
            'check' : function(){
                if(this.checked){
                    alert(1);//可查询
                }
            }
        },
        columns : [{
            text :'序号',
            xtype : 'rownumberer',
            style : 'text-align: center;',
            width : '100px'
        },{
            text :'计划润滑时间',
            dataIndex : 'V_PLAN_TIME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'实际润滑时间',
            dataIndex : 'V_FACT_TIME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'部门',
            dataIndex : 'V_ORGNAME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'设备类型',
            dataIndex : 'V_EQUTYPENAME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'设备规格',
            dataIndex : 'V_GGXH',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'设备编码',
            dataIndex : 'V_EQUCODE',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'设备名称',
            dataIndex : 'V_EQUNAME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'功能位置',
            dataIndex : 'V_GNWZ',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'给油脂位置',
            dataIndex : 'V_LOC_NAME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'部件名称',
            dataIndex : 'V_PARTNAME',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'润滑方式',
            dataIndex : 'V_OIL_TYPE',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'用油品牌',
            dataIndex : 'V_OIL_SIGN',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'实际用油品牌',
            dataIndex : 'V_FACT_OIL_SIGN',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'用油量(KG)',
            dataIndex : 'V_OIL_NUM',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'实际用油量(KG)',
            dataIndex : 'V_FACT_OIL_NUM',
            style : 'text-align: center;',
            flex : 1
        },{
            text :'执行人',
            dataIndex : 'V_ZXR',
            style : 'text-align: center;',
            flex : 1
        }],
        viewConfig : {
            emptyText : '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: standardInfoStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    Ext.create('Ext.container.Viewport',{
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                east : -1,
                north : 1,
                south : 1
            }
        } ,
        defaults : {
            border : 'false'
        } ,
        items : [{
            region : 'north',
            items : [buttonPanel,formPanel]
        },{
            region : 'center',
            layout : 'fit',
            items : [standardInfoPanel]
        }]
    });

    _init();

});

function _init(){
    Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    _selectProductLine();
    Ext.getCmp('V_V_CXCODE').select(Ext.data.StoreManager.lookup('pm03PlanYearCXStore').first());
    _selectEquipType();

    _selectStandardInfo();//查询加载主表数据
    Ext.getBody().unmask();
}

function _selectStandardInfo(){
    var standardInfoStore = Ext.data.StoreManager.lookup('standardInfoStore');
    standardInfoStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE : Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE : Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXCODE : Ext.getCmp('V_V_CXCODE').getValue(),
        V_V_EQUTYPECODE : Ext.getCmp('V_V_EQUTYPECODE').getValue(),
        V_V_PLANTIME : Ext.getCmp('V_V_PLANTIME').getSubmitValue(),
        V_V_EQUCODE : Ext.getCmp('V_V_EQUCODE').getValue(),
        V_V_EQUNAME : Ext.getCmp('V_V_EQUNAME').getValue()
    };
    standardInfoStore.currentPage = 1;
    standardInfoStore.load();
}

function _exportStandardInfo(){
    var records = Ext.getCmp('standardInfoPanel').getSelectionModel().getSelection();

    var V_V_PERSONCODE_LIST = new Array();
    var V_V_ORGCODE_LIST = new Array();
    var V_V_DEPTCODE_LIST = new Array();
    var V_V_CXCODE_LIST = new Array();
    var V_V_EQUTYPECODE_LIST = new Array();
    var V_V_PLANTIME_LIST = new Array();
    var V_V_EQUCODE_LIST = new Array();
    var V_V_EQUNAME_LIST = new Array();

    for (var i = 0 ;i < records.length ; i++){
        V_V_PERSONCODE_LIST.push(records[i].get('V_V_PERSONCODE'));
        V_V_ORGCODE_LIST.push(records[i].get('V_V_ORGCODE'));
        V_V_DEPTCODE_LIST.push(records[i].get('V_V_DEPTCODE'));
        V_V_CXCODE_LIST.push(records[i].get('V_V_CXCODE'));
        V_V_EQUTYPECODE_LIST.push(records[i].get('V_V_EQUTYPECODE'));
        V_V_PLANTIME_LIST.push(records[i].get('V_V_PLANTIME'));
        V_V_EQUCODE_LIST.push(records[i].get('V_V_EQUCODE'));
        V_V_EQUNAME_LIST.push(records[i].get('V_V_EQUNAME'));
    }

    if(V_V_PERSONCODE_LIST.length > 0){
        document.location.href =AppUrl +  'oil/exportStandardInfo?V_V_PERSONCODE_LIST='+ V_V_PERSONCODE_LIST +'&V_V_ORGCODE_LIST=' + V_V_ORGCODE_LIST +
            '&V_V_DEPTCODE_LIST=' + V_V_DEPTCODE_LIST + '&V_V_CXCODE_LIST=' + V_V_CXCODE_LIST +
            '&V_V_EQUTYPECODE_LIST=' + V_V_EQUTYPECODE_LIST + '&V_V_PLANTIME_LIST=' + V_V_PLANTIME_LIST +
            '&V_V_EQUCODE_LIST=' + V_V_EQUCODE_LIST + '&V_V_EQUNAME_LIST=' + V_V_EQUNAME_LIST + '&page=1&limit=10' ;
    }else {
        document.location.href =AppUrl +  'oil/exportStandardInfo?V_V_PERSONCODE='+ Ext.util.Cookies.get('v_personcode') +'&V_V_ORGCODE=' + Ext.getCmp('FTY_CODE_').getValue() +
            '&V_V_DEPTCODE=' + encodeURI(encodeURI(Ext.getCmp('DEPT_CODE_').getValue())) + '&V_V_CXCODE=' + encodeURI(encodeURI(Ext.getCmp('V_V_CXCODE').getValue())) +
            '&V_V_EQUTYPECODE=' + encodeURI(encodeURI(Ext.getCmp('V_V_EQUTYPECODE').getValue())) + '&V_V_PLANTIME=' + Ext.getCmp('V_V_PLANTIME').getSubmitValue() +
            '&V_V_EQUCODE=' + Ext.getCmp('V_V_EQUCODE').getValue() + '&V_V_EQUNAME=' + Ext.getCmp('V_V_EQUNAME').getValue() + '&page=1&limit=10'  ;
    }

}

function _selectProductLine() {
    var pm03PlanYearCXStore = Ext.data.StoreManager.lookup('pm03PlanYearCXStore');
    pm03PlanYearCXStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXNAME: '%'
    };
    pm03PlanYearCXStore.load();
}
function _selectDept() {
    var baseDept1Store = Ext.data.StoreManager.lookup('baseDept1Store');
    baseDept1Store.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    baseDept1Store.load();
}

function _selectEquipType() {
    var pm03PlanYearCXEQUStore = Ext.data.StoreManager.lookup('pm03PlanYearCXEQUStore');
    pm03PlanYearCXEQUStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE  :Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE :Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXCODE :Ext.getCmp('V_V_CXCODE').getValue()
    };
    pm03PlanYearCXEQUStore.load();
}

