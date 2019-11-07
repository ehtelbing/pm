/** ****************变量及数据集******************* */
var CREATE_WINDOW_TITLE = '新增设置';
QuerySelSectionsMsg = "请选择作业区";

var win;
var returnValue;

var selPlantstore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'selPlantstore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Zyk/PRO_BASE_DEPT_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTTYPE: '[基层单位]'
        }
    }
});

var selSectionstore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'selSectionstore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'Zyk/PRO_BASE_DEPT_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : false,
    fields : [ 'SITE_ID', 'SITE_DESC', 'VG_ID', 'VG_DESC', 'VG_URL' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'Zyk/PRO_RUN7126_SITEVGLIST',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
        }
    }
});

/** ****************页面布局******************* */

var queryPanel = Ext.create('Ext.panel.Panel', {
    id : 'queryPanel',
    width : '100%',
    region : 'north',
    frame : true,
    layout : 'column',
    items : [ {
        xtype : 'combo',
        id : "selPlant",
        store : selPlantstore,
        editable : false,
        queryMode : 'local',
        fieldLabel : '厂矿',
        displayField : 'V_DEPTNAME',
        valueField : 'V_DEPTCODE',
        labelWidth : 70,
        style : ' margin: 5px 0px 0px 10px',
        labelAlign : 'right'
    }, {
        xtype : 'combo',
        id : "selSection",
        store : selSectionstore,
        editable : false,
        queryMode : 'local',
        fieldLabel : '作业区',
        displayField : 'V_DEPTNAME',
        valueField : 'V_DEPTCODE',
        labelWidth : 60,
        style : ' margin: 5px 0px 5px 10px',
        labelAlign : 'right'
    }, {
        id : 'xzsb',
        xtype : 'textfield',
        fieldLabel : '选择设备',
        readOnly : true,
        labelWidth : 60,
        style : ' margin: 5px 0px 5px 10px',
        listeners : {
            focus : function() {
                var DEPTCODE = null;

                if(Ext.getCmp('selSection').getValue() == "%"){
                    Ext.example.msg('操作信息', QuerySelSectionsMsg);
                    return;
                }else{
                    DEPTCODE = Ext.getCmp('selSection').getValue();
                }
                returnValue = null;
                win = Ext.create('Ext.window.Window', {
                    title : '搜索设备',
                    modal : true,
                    autoShow : true,
                    maximized : false,
                    maximizable : true,
                    width : 1000,
                    height : document.documentElement.clientHeight * 0.8,
                    html : '<iframe src=' + AppUrl + 'page/No410601/Index.html?DEPTCODE=' + DEPTCODE + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
                    listeners : {
                        close : function(panel, eOpts) {
                            if (returnValue != "" && returnValue != null) {
                                Ext.ComponentManager.get('xzsb').setValue(returnValue[0].data.V_EQUNAME);
                                Ext.ComponentManager.get('equcode').setValue(returnValue[0].data.V_EQUCODE);
                            }
                        }
                    }
                });
            }
        }
    }, {
        xtype : 'hidden',
        id : 'equcode'
    }, {
        xtype : 'button',
        text : '查询',
        icon : imgpath + '/search.png',
        width : 80,
        style : ' margin: 5px 0px 0px 10px',
        handler : function() {
            if (Ext.ComponentManager.get('xzsb').getValue() == "") {
                Ext.example.msg('操作信息', '{0}', '请点击选择设备进行查询');
            } else {
                query();
            }
        }
    } ]
});

var buttonPanel = Ext.create('Ext.panel.Panel', {
    id : 'buttonPanel',
    width : '100%',
    region : 'north',
    frame : true,
    layout : 'column',
    items : [ {
        id : 'insert',
        xtype : 'button',
        text : '新增',
        icon : imgpath + '/add.png',
        width : 80,
        style : ' margin: 5px 0px 5px 10px',
        listeners : {
            click : function() {
                Ext.getCmp('operateWindow').show();
                Ext.getCmp('operateWindow').setTitle(CREATE_WINDOW_TITLE);
                Ext.ComponentManager.get('operateType').setValue('create');
            }
        }
    } ]
});

var grid = Ext.create('Ext.grid.Panel', {
    id : 'grid',
    region : 'center',
    columnLines : true,
    width : '100%',
    store : gridStore,
    autoScroll : true,
    selType : 'checkboxmodel',
    height : 400,
    columns : [ {
        xtype : 'rownumberer',
        text : '序号',
        width : 35,
        sortable : false
    }, {
        text : '备件安装位置ID',
        width : 200,
        dataIndex : 'SITE_ID',
        align : 'center',
        renderer : atleft
    }, {
        text : '备件安装位置描述',
        width : 200,
        dataIndex : 'SITE_DESC',
        align : 'center',
        renderer : atleft
    }, {
        text : 'VG图ID',
        width : 200,
        dataIndex : 'VG_ID',
        align : 'center',
        renderer : atleft
    }, {
        text : 'VG图描述',
        width : 200,
        dataIndex : 'VG_DESC',
        align : 'center',
        renderer : atleft
    }, {
        text : 'VG图连接',
        width : 200,
        dataIndex : 'VG_URL',
        align : 'center',
        renderer : atleft
    }, {
        text : '删除',
        width : 100,
        align : 'center',
        renderer : deleteRender
    } ]
});

var operateWindowPanel = Ext.create('Ext.panel.Panel', {
    frame : true,
    layout : {
        type : 'table',
        columns : 1
    },
    defaults : {
        bodyStyle : 'padding:20px'
    },
    items : [ {
        xtype : 'textfield',
        fieldLabel : '备件安装位置ID',
        id : 'siteId',
        labelAlign : 'left',
        style : ' margin: 5px 0px 5px 10px',
        labelWidth : 100,
        width : 260
    }, {
        xtype : 'textfield',
        fieldLabel : 'VG图ID',
        id : 'vgId',
        labelAlign : 'left',
        style : ' margin: 5px 0px 5px 10px',
        labelWidth : 100,
        width : 260
    }, {
        xtype : 'hidden',
        id : 'operateType'
    } ],
    buttons : [ {
        text : '保存',
        handler : saveClick
    }, {
        text : '关闭',
        handler : function() {
            Ext.getCmp('operateWindow').hide();
        }
    } ]
});

var operateWindow = Ext.create('Ext.window.Window', {
    width : 400,
    height : 180,
    layout : 'fit',
    id : 'operateWindow',
    closeAction : 'hide',
    closable : true,
    listeners : {
        show : {// 窗口加载将窗口数据清空
            fn : function() {
                Ext.ComponentManager.get('siteId').setValue('');
                Ext.ComponentManager.get('vgId').setValue('');
            }
        }
    },
    items : [ operateWindowPanel ]

});

/**
 * 整体布局
 */
var Layout = {
    id : "id",
    layout : 'border',
    items : [ queryPanel, buttonPanel, grid ]
};

Ext.onReady(onPageLoaded);

/** ****************执行方法******************* */

/**
 * 初始加载页面
 */
function onPageLoaded() {
    // 显示整体布局
    Ext.create('Ext.container.Viewport', Layout);

    Ext.data.StoreManager.lookup('selPlantstore').on("load", function() {
        Ext.getCmp("selPlant").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));

        Ext.data.StoreManager.lookup('selSectionstore').load({
            params : {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });
    Ext.data.StoreManager.lookup('selSectionstore').on("load", function() {
        Ext.getCmp("selSection").select(Ext.data.StoreManager.lookup('selSectionstore').getAt(0));
    });
    Ext.getCmp('selPlant').on("change", function() {
        Ext.data.StoreManager.lookup('selSectionstore').removeAll();
        Ext.data.StoreManager.lookup('selSectionstore').load({
            params : {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

};

function query() {

    Ext.data.StoreManager.lookup('gridStore').load({
        params : {
            V_EQU_ID: Ext.getCmp('equcode').getValue()
        }
    });

}

function saveClick() {
    var siteId = Ext.getCmp('siteId').getValue();
    var vgId = Ext.getCmp('vgId').getValue();
    if (siteId == "" || siteId == null || vgId == "" || vgId == null) {
        Ext.example.msg('操作信息', '请填写设备编号和VG图ID');
    } else {
        if (!checkSize(siteId, 80)) {
            Ext.example.msg('操作信息', '设备编号不能超过80个字符');
        } else if (!checkSize(vgId, 36)) {
            Ext.example.msg('操作信息', 'VG图ID不能超过36个字符');
        } else {
            if (Ext.ComponentManager.get('operateType').getValue() == 'create') {
                create();
            } else if (Ext.ComponentManager.get('operateType').getValue() == 'modify') {
                modify();
            }
        }
    }
}

function create() {
    Ext.Ajax.request({
        url: AppUrl + 'Zyk/PRO_RUN7126_ADDSITEVG_NEW',
        method : 'POST',
        params : {
            V_SITE_ID: Ext.getCmp('siteId').getValue(),
            V_VG_ID: Ext.getCmp('vgId').getValue()
        },
        success : function(resp) {
            resp = Ext.decode(resp.responseText);
            if(resp.RET =="备件安装位置ID或VG图ID不存在"){
                Ext.example.msg('操作信息','{0}','备件安装位置ID或VG图ID不存在');
            }else if(resp.RET =="该位置和VG图已关联"){
                Ext.example.msg('操作信息','{0}','该位置和VG图已关联');
            }else if(resp.RET =="Success"){
                Ext.example.msg('操作信息','{0}','添加成功');
                Ext.getCmp('operateWindow').hide();
                query();
            }else {
                Ext.example.msg('操作信息','{0}','发生未知异常');
            }

        }
    });
}

function deleteRecord(siteId, vgId) {
    Ext.Ajax.request({
        url: AppUrl + 'Zyk/PRO_RUN7126_DELSITEVG',
        async: false,
        method: 'POST',
        params: {
            V_SITE_ID: siteId,
            V_VG_ID: vgId
        },
        success : function(resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.OUT_RESULT == 'success') {
                query();
            }
        }
    });
}

function checkSize(item, size) {
    var flag = true;
    if (item.length > size) {
        flag = false;
    }
    return flag;
}

function deleteRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<a href="javascript:deleteRecord(\'' + record.data.SITE_ID + '\',\'' + record.data.VG_ID + '\')">删除</a>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}