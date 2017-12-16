Ext.onReady(function() {
    Ext.QuickTips.init();
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear+1; i++) years.push({ displayField: i, valueField: i });

    var ckStore = Ext.create('Ext.data.Store', {
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
            extraParams:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
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
            }
        }
    });

    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
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
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : ['I_ID', 'V_CODE_YEAR', 'I_YEAR','V_DEPTCODE', 'V_DEPTNAME', 'V_DEPTNEXTCODE', 'V_DEPTNEXTNAME',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE','V_EQUNAME', 'V_REPAIRMAJOR', 'V_CONTENT', 'D_DATETIME_B',
            'D_DATETIME_E','F_HOUR','V_REPAIRDEPTCODE','V_MANNAME','V_TELEPHONE','D_DATE_IN','V_PERSONCODE',
            'V_PERSONNAME','V_STATUS','V_STATUSNAME'],

        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_DJY_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });

    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'north',
        width:'100%',
        frame:true,
        layout:'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items:[{id: 'year', store: Ext.create("Ext.data.Store", {
            fields: ['displayField', 'valueField'],
            data: years,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }), xtype: 'combo', fieldLabel: '年份', value: new Date().getFullYear(), labelWidth: 60, editable: false, displayField: 'displayField', valueField: 'valueField'},
            { xtype: 'combo', id: "ck", store: ckStore, editable: false, queryMode: 'local', fieldLabel: '计划厂矿', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', labelWidth: 60 },
            { xtype: 'combo', id: "zyq", store: zyqStore, editable: false, queryMode: 'local', fieldLabel: '作业区', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', labelWidth: 60},
            {
                id: 'sbtype',
                xtype: 'combo',
                store: ssbtype,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 60,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('ssbname').load({
                            params: {
                                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                                v_v_equtypecode: Ext.getCmp('sbtype').getValue()
                            }
                        });
                    }
                }
            }, {
                id: 'sbname',
                xtype: 'combo',
                store: ssbname,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 60,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },
            {xtype:'button',text:'查询',icon: imgpath +'/search.png',listeners:{click:QueryGrid}}]
    });

    var grid=Ext.create('Ext.grid.Panel',{
        id:'grid',
        region:'center',
        width:'100%',
        columnLines: true,
        store:gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        height: 400,
        columns:[{ xtype: 'rownumberer',text: '序号', width: 40, sortable: false },
            { text: '计划状态', width: 80, dataIndex: 'V_STATUSNAME', align: 'center', renderer: atleft },
            { text: '设备名称', width: 150, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft },
            { text: '设备编号', width: 150, dataIndex: 'V_EQUCODE', align: 'center', renderer: atleft },
            { text: '专业', width: 80, dataIndex: 'V_REPAIRMAJOR', align: 'center', renderer: atleft },
            { text: '工程项目', width: 100, dataIndex: '', align: 'center', renderer: atleft },
            { text: '检修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center', renderer: atleft },
            { text: '检修模型描述', width: 120, dataIndex: '', align: 'center', renderer : detail },
            { text: '计划停机日期', width: 150, dataIndex: 'D_DATETIME_B', align: 'center', renderer: atleft },
            { text: '计划竣工日期', width: 150, dataIndex: 'D_DATETIME_E', align: 'center', renderer: atleft },
            { text: '计划工期(小时)', width: 100, dataIndex: 'F_HOUR', align: 'center', renderer: atleft },
            { text: '厂矿', width: 150, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft },
            { text: '车间名称', width: 110, dataIndex: 'V_DEPTNEXTNAME', align: 'center', renderer: atleft },
            { text: '录入人', width: 80, dataIndex: 'V_PERSONNAME', align: 'center', renderer: atleft },
            { text: '录入时间', width: 150, dataIndex: 'D_DATE_IN', align: 'center', renderer: atleft }],
        bbar: [{
            id:'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                'V_V_PERSONCODE':  Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){

        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('ssbtype').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
        QueryGrid();
    });

    Ext.data.StoreManager.lookup('ssbtype').on('load',function(){
        Ext.getCmp('sbtype').select(Ext.data.StoreManager.lookup('ssbtype').getAt(0));

        Ext.data.StoreManager.lookup('ssbname').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sbtype').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('ssbname').on('load',function(){
        Ext.getCmp('sbname').select(Ext.data.StoreManager.lookup('ssbname').getAt(0));
    });

    Ext.getCmp('year').on('select',function(){
        QueryGrid();
    });
    Ext.getCmp('ck').on('select',function(){
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                'V_V_PERSONCODE':  Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.getCmp('zyq').on('select',function(){
        QueryGrid();
    });

});

function QueryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_I_YEAR : Ext.getCmp('year').getValue(),
            V_V_DEPTCODE : Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE : Ext.getCmp('zyq').getValue()
        }
    });
}

function beforeloadStore(store){
    store.proxy.extraParams.parName = ['V_V_PERSONCODE', 'V_I_YEAR','V_V_DEPTCODE','V_V_DEPTNEXTCODE'];
    store.proxy.extraParams.parType = ['s', 's','s','s'];
    store.proxy.extraParams.parVal = [Ext.util.Cookies.get('v_personcode'),Ext.getCmp('year').getValue(),
        Ext.getCmp('ck').getValue(),Ext.getCmp('zyq').getValue()];
    store.proxy.extraParams.proName = 'PRO_PM_PLAN_YEAR_DJY_VIEW';
    store.proxy.extraParams.cursorName = 'V_CURSOR';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}


function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_JXMX_CODE + '\')">'+a+'</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_030211/index.html?V_JXMX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
