
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
Ext.define('Ext.grid.column.LineBreakColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.linebreakcolumn',
    initComponent: function() {
        var me = this,
        // 定义customerRenderer变量，保存用户配置的renderer
            customerRenderer = me.renderer;
        if(customerRenderer) {
            // 如果用户配置了renderer，则限制性用户配置的renderer，然后执行默认的内容换行renderer
            me.renderer = function(value, metadata, record, rowIndex, columnIndex, store) {
                value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
                value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
                return value;
            };
        }
        me.callParent(arguments);
    },
    defaultRenderer: function(value, metadata, record, rowIndex, columnIndex, store) {
        metadata.style = 'white-space: normal; overflow: visible; word-break: break-all;';
        return value;
    }
});
Ext.onReady(function () {
    Ext.QuickTips.init();
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];

    //从2013循环开始年到当前年的下一年
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
            }
        }
    });

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
            }
        }
    });

    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
            }
        }
    });

    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
            'V_ORGCODE',                          //厂矿
            'V_ORGNAME',
            'V_DEPTCODE',                         //作业区
            'V_DEPTNAME',
            'V_EQUTYPECODE',                     //设备类型
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME',
            'V_FLOWNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_VIEW',
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

    var panel = Ext.create('Ext.Panel', {
        id :'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: { style : 'margin:5px 0px 5px 5px',labelAlign: 'right'},
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear(),
            labelWidth: 70,
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _ck_zyqload();
                    // _zyq_jxdw();
                    _zyq_zy();
                    _zyq_sblx();
                    _zyq_sbmc();
                }
            }
        }, {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            listeners: {
                select: function (field, newValue, oldValue) {
                    // _zyq_jxdw();
                    _zyq_zy();
                    _zyq_sblx();
                    _zyq_sbmc();
                }
            }
        }, {
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '专业',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            labelWidth: 70
        },{
            xtype: 'combo',
            id: "sblx",
            store: sblxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备类型',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            labelWidth: 70,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _zyq_sbmc();
                }
            }
        },{
            xtype: 'combo',
            id: "sbmc",
            store: sbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备名称',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            labelWidth: 70
        },{
            xtype: 'textfield',
            id: "jxnr",
            //store: sbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '检修内容',
            // displayField: 'V_EQUNAME',
            //valueField: 'V_EQUCODE',
            labelWidth: 70
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQueryClicked}
        },{
            xtype: 'button',
            text: 'Excel导出',
            listeners: {click: OnButtonExcelClicked}
        }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        columns: [{xtype: 'rownumberer', text: '序号', width : 50,align:'center'},
            {text: '计划状态', width : 70, dataIndex: 'V_STATENAME', align: 'center'/*, renderer: atleft*/},
            {text: '设备名称', width : 140, dataIndex: 'V_EQUNAME', align: 'center'},
            //{text: '设备编号',flex: 1, dataIndex: 'V_EQUCODE', align: 'center', renderer: atleft},
            {text: '专业',  width : 70, dataIndex: 'V_REPAIRMAJOR_CODE', align: 'center'},
            //{text: '工程项目', flex: 1, dataIndex: 'V_TEL', align: 'center', renderer: atleft},
            {xtype: 'linebreakcolumn',text: '检修内容', width : 250, dataIndex: 'V_CONTENT', align: 'center'},
            //{text: '计划内容', flex: 1, dataIndex: 'V_TEL', align: 'center', renderer: atleft},
            //{text: '检修模型描述', flex: 1, dataIndex: 'V_EQUTYPENAME', align: 'center', renderer: detail},
            {text: '计划停工时间', width:170,dataIndex: 'V_STARTTIME', align: 'center',
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gridStore.find('V_STARTTIME', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_STARTTIME').substring(0,19);
                    }
                    return null;
                }},
            {text: '计划竣工时间',  width:170,dataIndex: 'V_ENDTIME', align: 'center',
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gridStore.find('V_ENDTIME', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_ENDTIME').substring(0,19);
                    }
                    return null;
                }},
            {text: '计划工期(小时)', width : 80,  dataIndex: 'V_HOUR', align: 'center'},
            {text: '厂矿',  width : 140, dataIndex: 'V_DEPTNAME', align: 'center'},
            {text: '车间名称', width : 100, dataIndex: 'V_ORGNAME', align: 'center'},
            {text: '录入人',  width : 50,  dataIndex: 'INPERNAME', align: 'center'},
            {text: '录入时间',  width : 160,dataIndex: 'V_INDATE', align: 'center',
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gridStore.find('V_INDATE', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_INDATE').substring(0,19);
                    }
                    return null;
                }},
            {text: '流程步骤', align: 'center',width : 140,dataIndex: 'V_FLOWNAME'}],
        bbar: [{
            id: 'page',
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

    //表格右键菜单
    var contextmenu = new Ext.menu.Menu({
        id:'theContextMenu',
        items:[{
            text:'查看详情',
            handler:function(){
                Ext.Msg.alert("系统提示","测试");
            }
        }]
    });

    grid.on("itemcontextmenu",function(view,record,item,index,e){
        e.preventDefault();
        contextmenu.showAt(e.getXY());
    });
});


function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_REPAIRMAJOR_CODE: '%',
            V_V_PLANTYPE: 'YEAR'
        }
    });
}

function beforeloadStore(store) {
    store.proxy.extraParams.parName = ['V_V_PERSONCODE', 'V_I_YEAR', 'V_V_DEPTCODE', 'V_V_DEPTNEXTCODE'];
    store.proxy.extraParams.parType = ['s', 's', 's', 's'];
    store.proxy.extraParams.parVal = [Ext.util.Cookies.get('v_personcode'), Ext.getCmp('year').getValue(),
        Ext.getCmp('ck').getValue(), Ext.getCmp('zyq').getValue()];
    store.proxy.extraParams.proName = 'PRO_PM_PLAN_YEAR_DJY_VIEW';
    store.proxy.extraParams.cursorName = 'V_CURSOR';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnButtonAddClicked() {
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_030209/index.html?V_YEARPLAN_GUID=0'
        + "&YEAR=" + Ext.getCmp("year").getValue()
        + "&V_ORGCODE=" + Ext.getCmp("ck").getValue()
        + "&V_DEPTCODE=" + Ext.getCmp("zyq").getValue(), '', 'height=796px,width=593px,top=50px,left=100px,resizable=yes');

}

function OnButtonEditClicked() {
    var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;

    if (length != '1') {
        Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
    } else {
        var V_V_GUID = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID;
        var update = 'update';
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_030209/index.html?V_V_GUID=' + V_V_GUID+'&UPDATE=' +update+'&YEAR='+ Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_YEAR , '', 'height=796px,width=593px,top=50px,left=100px,resizable=yes');
    }
}

function OnButtonDelClicked() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    V_GUID = records[0].get('V_GUID');

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_DEL',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_GUID: V_GUID
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.success) {//成功，会传回true

                            OnButtonQueryClicked();

                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.message,
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

function OnButtonUpClicked() {


    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    V_GUID = records[0].get('V_GUID');


    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_SEND',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_GUID,
            V_V_ORGCODE: records[0].get('V_ORGCODE'),
            V_V_DEPTCODE: records[0].get('V_DEPTCODE'),
            V_V_FLOWCODE: records[0].get('V_FLOWCODE'),
            V_V_PLANTYPE: "YEAR",
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true

                OnButtonQueryClicked();

            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
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

function detail(a, value, metaData) {
    return '<a href="javascript:ondetail(\'' + metaData.data.V_JXMX_CODE + '\')">' + a + '</a>';
}

function ondetail(a) {
    var V_JXGX_CODE = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_JXGX_CODE;
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_030211/index.html?V_JXMX_CODE=' + a + '&V_JXGX_CODE=' + V_JXGX_CODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function OnButtonQueryClicked()
{
    var string ='2017-08-01 05:00:00.0';
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_YEAR :Ext.getCmp('year').getValue(),
        V_V_PLANTYPE :'YEAR',
        V_V_ORGCODE:Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
        V_V_EQUTYPE :Ext.getCmp('sblx').getValue(),
        V_V_EQUCODE : Ext.getCmp('sbmc').getValue(),
        V_V_ZY :Ext.getCmp('zy').getValue(),
        V_V_CONTENT :Ext.getCmp('jxnr').getValue(),
        V_V_STATECODE :"%",
        V_V_PEROCDE :Ext.util.Cookies.get('v_personcode')
        /* V_V_PAGE: Ext.getCmp('page').store.currentPage,
         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,*/

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _zyq_jxdw() {

    var jxdwStore = Ext.data.StoreManager.lookup('jxdwStore');
    jxdwStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwStore.load();


}

function _zyq_zy() {
    var zyStore = Ext.data.StoreManager.lookup('zyStore');
    zyStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyStore.load();
}

function _ck_zyqload() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqStore.load();

}

function _zyq_sblx() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore.load();
}

function _zyq_sbmc() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore.load();
}

function OnButtonExcelClicked() {

    var ss = '%';
    document.location.href = AppUrl + 'hp/PM_03_EXCEL?V_V_YEAR=' + Ext.ComponentManager.get("year").getValue()
        + '&V_V_PLANTYPE=' + 'YEAR'
        + '&V_V_ORGCODE=' + Ext.ComponentManager.get("ck").getValue()
        + '&V_V_DEPTCODE=' + Ext.ComponentManager.get("zyq").getValue()
        + '&V_V_EQUTYPE=' + Ext.ComponentManager.get("sblx").getValue()
        + '&V_V_EQUCODE=' + Ext.ComponentManager.get("sbmc").getValue()
        + '&V_V_ZY=' + Ext.ComponentManager.get("zy").getValue()
        + '&V_V_CONTENT=' + Ext.ComponentManager.get("jxnr").getValue()
        + '&V_V_STATECODE=' + encodeURI('%')
        + '&V_V_PEROCDE=' + Ext.util.Cookies.get('v_personcode');



}
