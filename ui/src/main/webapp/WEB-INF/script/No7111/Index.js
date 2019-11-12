// 工作地点数据
var gzpalceStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'gzpalceStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'LL/PRO_BASE_DEPT_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE: '[主体作业区]'
        }
    }
});

// 指标STORE
var zbStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zbStore',
    fields: ['TAG_ID', 'DESC_UNIT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'LL/PRO_RUN7111_TAGLIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

// 设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbxzStore',
    fields: ['EQU_DESC', 'EQU_ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'LL/PRO_RUN7111_EQULIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 20,
    fields: ['EQU_DESC', 'SITE_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'EQU_NAME', 'SITE_DESC', 'DEPARTNAME', 'CHANGEDATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'LL/PRO_RUN7111_USEBJLIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var creatpanel1 = Ext.create('Ext.form.Panel', {
    id: 'creatpanel1',
    style: 'margin:5px 0px 2px 2px',
    region: 'north',
    width: '100%',
    //baseCls: 'my-panel-no-border',
    defaults: {
        style: 'margin:5px 0px 5px 10px',
        labelAlign: 'right'
    },
    layout: {
        type: 'column'
    },
    items: [{
        xtype: 'combo',
        id: 'zyq',
        store: 'gzpalceStore',
        fieldLabel: '作业区 ',
        editable: false,
        readOnly: true,
        style: 'margin:5px 0px 5px 5px',
        labelWidth: 70,
        queryMode: 'local',
        valueField: 'V_DEPTCODE',
        displayField: 'V_DEPTNAME'
    }, {
        xtype: 'combo',
        id: 'xzsb',
        store: 'sbxzStore',
        fieldLabel: '选择设备 ',
        editable: false,
        style: 'margin:5px 0px 5px 5px',
        labelWidth: 70,
        queryMode: 'local',
        valueField: 'EQU_ID',
        displayField: 'EQU_DESC'
    }, {
        xtype: 'button',
        text: '查询',
        icon: imgpath + '/search.png',
        width: 100,
        handler: query,
        style: {
            margin: '5px 0 5px 30px'
        }
    }]
});

var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    selType: 'checkboxmodel',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    autoScroll: true,
    height: 400,
    columns: [{
        text: '录入检查记录 ',
        align: 'center',
        width: 100,
        renderer: function (value, metaData, record) {
            return '<div><a href="javascript:OnClickDeleteLink(\'' + value + '\')">录入</a></div>';
        }
    }, {
        text: '更换日期',
        dataIndex: 'CHANGEDATE',
        align: 'center',
        labelAlign: 'right',
        width: 100,
        renderer: RenderFontLeft
    }, {
        text: '备件唯一标识',
        dataIndex: 'BJ_UNIQUE_CODE',
        align: 'center',
        width: 150
    }, {
        text: '物资编码 ',
        dataIndex: 'MATERIALCODE',
        align: 'center',
        width: 120
    }, {
        text: '物资描述 ',
        dataIndex: 'MATERIALNAME',
        align: 'center',
        width: 150
    }, {
        text: '计量单位 ',
        dataIndex: 'UNIT',
        align: 'center',
        width: 60
    }, {
        text: '当前设备 ',
        dataIndex: 'EQU_NAME',
        align: 'center',
        width: 150
    }, {
        text: '备件安装位置 ',
        dataIndex: 'SITE_DESC',
        align: 'center',
        width: 150
    }, {
        text: '作业区 ',
        dataIndex: 'DEPARTNAME',
        align: 'center',
        width: 100
    }]
});

// 录入窗体
var formPanel = Ext.create('Ext.form.Panel', {
    id: 'formPanel',
    layout: 'column',
    frame: true,
    autoScroll: true,
    defaults: {
        labelAlign: 'right',
        labelWidth: 100,
        inputWidth: 140,
        margin: '4,0,0,0'
    },
    items: [{
        xtype: 'datefield',
        format: 'Y/m/d',
        fieldLabel: '检查时间',
        labelAlign: 'left',
        labelWidth: 80,
        id: 'checkTime',
        altFormats : 'Y-m-d',
        submitFormat : 'Y-m-d',
        name: 'v_v_checktime',
        value: new Date(),
        style: 'margin: 5px 0px 0px 10px'
    }, {
        xtype: 'textfield',
        id: 'jcnr',
        name: 'v_v_checkcount',
        width: 300,
        fieldLabel: '检查内容',
        labelAlign: 'left',
        labelWidth: 80,
        style: 'margin: 5px 0px 0px 10px'
    }, {
        xtype: 'combo',
        id: 'jczb',
        name: 'v_v_tagid',
        store: zbStore,
        width: 300,
        displayField: 'DESC_UNIT',
        valueField: 'TAG_ID',
        fieldLabel: '检查指标',
        labelAlign: 'left',
        labelWidth: 80,
        style: 'margin: 5px 0px 0px 10px'
    }, {
        xtype: 'numberfield',
        id: 'zbz',
        name: 'v_v_tagvalue',
        width: 300,
        fieldLabel: '指标值',
        labelAlign: 'left',
        labelWidth: 80,
        style: 'margin: 5px 0px 0px 10px',
        emptyText: '0',
        decimalPrecision: 2
    }, {
        xtype: 'hidden',
        name: 'v_v_bjcode'
    }, {
        xtype: 'hidden',
        name: 'v_v_usercode'
    }, {
        xtype: 'hidden',
        name: 'v_v_username'
    }, {
        xtype: 'hidden',
        name: 'v_v_siteid'
    }, {
        xtype: 'form',
        layout: 'column',
        baseCls: 'my-panel-no-border',
        frame: true,
        width: '100%',
        items: [{
            xtype: 'filefield',
            id: 'upload',
            name: 'upload',
            width: 300,
            msgTarget: 'side',
            allowBlank: true,
            anchor: '100%',
            buttonText: '浏览....',
            style: ' margin: 5px 0px 0px 10px'
        },
            {
                xtype: 'button',
                width: 60,
                text: '保存记录',
                style: ' margin: 5px 0px 0px 10px',
                handler: _insertBj
            }]
    }]
});

var window = new Ext.Window({
    title: '填写检查内容',
    height: 300,
    width: 400,
    layout: 'fit',
    closeAction: 'hide',
    autoShow: false,
    modal: true,
    id: 'win1',
    listeners: {
        show: {// 窗口加载将窗口数据清空
            fn: function () {
                Ext.getCmp('checkTime').setValue(new Date());
                Ext.getCmp('jcnr').setValue('');
                Ext.getCmp('jczb').clearValue();
                Ext.getCmp('zbz').setValue('0');
                Ext.getCmp('upload').setValue('');
            }
        }
    },
    items: formPanel
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [creatpanel1, grid]
    });
    Ext.data.StoreManager.lookup('gzpalceStore').on('load', function () {
        Ext.getCmp('zyq').store.insert(0, {
            'V_DEPTCODE': '%',
            'V_DEPTNAME': '全部'
        });

        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

        // 默认当前登录用户工作区
        var storeLength = Ext.data.StoreManager.lookup('gzpalceStore').data.length;
        for (var index = 0; index < storeLength; index++) {
            var storeItemData = Ext.data.StoreManager.lookup('gzpalceStore').data.items[index].data;
            if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
                Ext.getCmp("zyq").setValue(Ext.util.Cookies.get('v_deptcode'));
                break;
            }
        }
    });
    Ext.data.StoreManager.lookup('sbxzStore').on('load', function () {
        Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
        // 刷新
        query();
    });

    Ext.data.StoreManager.lookup('gzpalceStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

        // 默认当前登录用户工作区
        var storeLength = Ext.data.StoreManager.lookup('gzpalceStore').data.length;
        for (var index = 0; index < storeLength; index++) {
            var storeItemData = Ext.data.StoreManager.lookup('gzpalceStore').data.items[index].data;
            if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
                Ext.getCmp("zyq").setValue(Ext.util.Cookies.get('v_deptcode'));
                break;
            }
        }

        Ext.data.StoreManager.lookup('sbxzStore').load({
            params: {
                V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('sbxzStore').load({
            params: {
                V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });
});

// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_EQUCODE: Ext.getCmp('xzsb').getValue()
        }
    });
}

function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    value = value.split(' ')[0];
    return value;
}


function OnClickDeleteLink() {
    Ext.data.StoreManager.lookup('zbStore').load({
        params: {
            PID: Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.SITE_ID
        }
    });
    Ext.data.StoreManager.lookup('zbStore').on('load', function () {
        Ext.getCmp('jczb').select(Ext.data.StoreManager.lookup('zbStore').getAt(0));
    });
    Ext.getCmp('win1').show();

}

function _insertBj() {
    var form = Ext.getCmp('formPanel').getForm();
    form.findField('v_v_bjcode').setValue(Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.BJ_UNIQUE_CODE);
    form.findField('v_v_usercode').setValue(Ext.util.Cookies.get('v_personcode'));
    form.findField('v_v_username').setValue(Ext.util.Cookies.get('v_personname2'));
    form.findField('v_v_siteid').setValue(Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.SITE_ID);
    //form.findField('v_v_checktime').setValue(Ext.util.Format.date(Ext.getCmp('checkTime').getValue(), 'Y-m-d'));
    form.isValid();

    form.submit({
        url: AppUrl + 'LL/PRO_RUN7111_ADDLOG',
        submitEmptyText: false,
        waitMsg: '上传中...',
        success: function (form, action) {
            Ext.example.msg('提示信息', '保存成功！');
            Ext.getCmp('win1').hide();
        },
        failure: function (form, action) {
            Ext.example.msg('提示信息', '保存失败！');
        }
    });
}



