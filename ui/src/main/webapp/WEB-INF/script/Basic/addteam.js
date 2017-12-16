var seldata;
var seledit = 0;
var slecode;
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE: '[基层单位]'
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
        url: AppUrl + 'zdh/plant_sel',
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
    pageSize: 100,
    fields: ['V_CLASS_CODE', 'V_CLASS_NAME', 'V_DEPTNAME', 'V_SAP_WORKNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/team_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var sgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sgridStore',
    pageSize: 100,
    fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_CLASS_NAME', 'V_ROLECODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/teambasedetail_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var agridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'agridStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var workCenterStore = Ext.create('Ext.data.Store', {
    id: 'workCenterStore',
    autoLoad: false,
    fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/workCenter_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var creatpanel = Ext.create('Ext.form.Panel', {
    id: 'creatpanel',
    style: 'margin:5px 0px 2px 2px',
    region: 'north',
    width: '100%',
    baseCls: 'my-panel-no-border',
    defaults: {
        labelAlign: 'right'
    },
    layout: {
        type: 'vbox'
    },
    items: [
        {
            xtype: 'panel',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-noborder',
            width: '100%',
            items: [{
                xtype: 'combo',
                id: 'ck',
                store: 'ckStore',
                labelAlign: 'right',
                fieldLabel: '厂矿 ',
                editable: false,
                style: 'margin:10px 0px 5px 10px',
                labelWidth: 80,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('zyqStore').load({
                            params: {
                                IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                                IS_V_DEPTTYPE: '[主体作业区]'
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'zyq',
                store: 'zyqStore',
                labelAlign: 'right',
                fieldLabel: '作业区 ',
                editable: false,
                style: 'margin:10px 0px 5px 10px',
                labelWidth: 80,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('workCenterStore').load({
                            params: {
                                V_V_DEPTREPAIRCODE: Ext.getCmp('zyq').getValue()
                            }
                        });
                        query();
                    }
                }
            }, {
                xtype: 'textfield',
                id: 'bzmc',
                fieldLabel: '班组名称',
                labelWidth: 80,
                labelAlign: 'right',
                emptyText: '请输入班组名称',
                style: ' margin: 10px 0px 5px 10px'
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                width: 70,
                handler: query,
                style: ' margin: 10px 0px 5px 10px'
            }]
        },
        {
            xtype: 'panel',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-noborder',
            width: '100%',
            items: [{
                xtype: 'button',
                text: '新增',
                icon: imgpath + '/add.png',
                width: 70,
                handler: add_btn,
                style: ' margin: 5px 0px 10px 50px'
            }, {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                width: 70,
                handler: edit_btn,
                style: ' margin: 5px 0px 10px 20px'
            }, {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete1.png',
                width: 70,
                handler: del_btn,
                style: ' margin: 5px 0px 10px 20px'
            }]
        }]
});
var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    autoScroll: true,
    selModel: {      //复选框
        selType: 'checkboxmodel'
    },
    columns: [{
        text: '班组编号 ',
        dataIndex: 'V_CLASS_CODE',
        align: 'center',
        width: 350,
        hidden : true
    }, {
        text: '班组名称',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        labelAlign: 'right',
        width: 220
    }, {
        text: '工作中心',
        dataIndex: 'V_SAP_WORKNAME',
        align: 'center',
        width: 350
    }, {
        text: '作业区',
        dataIndex: 'V_DEPTNAME',
        align: 'center',
        width: 150
    }, {
        text: '人员',
        align: 'center',
        width: 100,
        renderer: function (value, metaData, record,
                            rowIdx, colIdx, store, view) {
            return '<a href=javascript:tosee(\'' + rowIdx + '\');>查看</a>';
        }
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }]
});
var sgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'sgrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: sgridStore,
    autoScroll: true,
    height: '100%',
    columns: [{
        text: '序号',
        align: 'center',
        xtype: 'rownumberer',
        width: 50
    }, {
        text: '人员编号 ',
        dataIndex: 'V_PERSONCODE',
        align: 'center',
        width: 150
    }, {
        text: '人员名称',
        dataIndex: 'V_PERSONNAME',
        align: 'center',
        width: 100
    }, {
        text: '是否组长',
        dataIndex: 'V_ROLECODE',
        align: 'center',
        width: 100,
        renderer: function (value) {
            if (value == '11') {
                return '是';
            } else return '否';
        }
    }, {
        text: '所在班组',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        flex: 1
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'sgridStore'
    }, {
        xtype: 'button',
        text: '关闭',
        icon: imgpath + '/delete.png',
        width: 65,
        handler: close_btn
    }]
});
var agrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'agrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: agridStore,
    autoScroll: true,
    height: '100%',
    columns: [{
        text: '人员编号 ',
        dataIndex: 'V_PERSONCODE',
        align: 'center',
        width: '45%'
    }, {
        text: '人员名称',
        dataIndex: 'V_PERSONNAME',
        align: 'center',
        labelAlign: 'right',
        width: '45%'
    }, {
        align: 'center',
        width: '10%',
        text: '删除',
        xtype: 'templatecolumn',
        tpl: '<a style="cursor:pointer"><img src="'
        + imgpath + '/delete1.png"></a>',
        listeners: {
            "click": todel
        }
    }],
    dockedItems: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-noborder',
        width: '100%',
        items: [{
            xtype: 'textfield', //输入框
            id: 'addmzmc',
            fieldLabel: '班组名称',
            labelWidth: 80,
            labelAlign: 'right',
            style: ' margin: 5px 0px 5px 0px',
            emptyText: '请输入班组名称'
        }, {
            xtype: 'combo',
            id: 'addgzzx',
            store: 'workCenterStore',
            labelAlign: 'right',
            fieldLabel: '工作中心 ',
            editable: false,
            labelWidth: 80,
            style: ' margin: 5px 0px 5px 0px',
            queryMode: 'local',
            valueField: 'V_SAP_WORK',
            displayField: 'V_SAP_WORKNAME'
        }, {
            xtype: 'button',
            text: '人员查找',
            icon: imgpath + '/search.png',
            width: 90,
            handler: p_query,
            style: ' margin: 5px 0px 5px 10px'
        }]
    }],
    bbar: ['->', {
        xtype: 'button',
        text: '确认并返回',
        icon: imgpath + '/add.png',
        width: 110,
        handler: saved_btn
    }, {
        xtype: 'button',
        text: '关闭',
        icon: imgpath + '/delete.png',
        width: 65,
        handler: aclose_btn
    }]
});
var seewin = Ext.create('Ext.window.Window', {
    id: 'seewin',
    width: 665,
    height: 400,
    layout: 'fit',//自定义
    frame: true,
    title: '班组人员查看',
    closeAction: 'hide',
    closable: true,
    items: [sgrid]
});


var addwin = Ext.create('Ext.window.Window', {
    id: 'addwin',
    width: 600,
    height: 400,
    layout: 'fit',//自定义
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [agrid]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [creatpanel, grid]
    });

    workCenterStore.on('load', function () {
        workCenterStore.insert(0, {'V_SAP_WORK': '', 'V_SAP_WORKNAME': '无'});
        Ext.getCmp('addgzzx').select(workCenterStore.getAt(0));
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        if(Ext.util.Cookies.get('v_deptcode') != '99170104'){
            Ext.getCmp('zyq').setValue(Ext.util.Cookies.get('v_deptcode'));
        }
        else{
            Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        }
    });
});
// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params: {
                IN_DEPARTCODE: Ext.getCmp('zyq').getValue(),
                IN_CLASSNAME: Ext.getCmp('bzmc').getValue()
            }
        });
}
function tosee(rowIdx) {
    seldata = Ext.getCmp('grid').store.data.items[rowIdx].data.V_CLASS_CODE;
    Ext.data.StoreManager.lookup('sgridStore').load(
        {
            params: {
                IN_CLASSCODE: seldata
            }
        });
    Ext.getCmp('seewin').show();
}
function close_btn() {
    Ext.getCmp('seewin').hide();
}
function aclose_btn() {
    Ext.getCmp('addwin').hide();
}
function add_btn() {
    agridStore.removeAll();
    Ext.getCmp('addmzmc').setValue('');
    Ext.getCmp('addgzzx').setValue('');
    Ext.getCmp('addwin').setTitle('新增班组');
    Ext.getCmp('addwin').show();
    seledit = 0;
}
function p_query() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length == 0){
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/Basic/addperson1.html?depart=' + Ext.getCmp('zyq').getValue() + '&classcode=', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
    else{
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/Basic/addperson1.html?depart=' + Ext.getCmp('zyq').getValue() + '&classcode='+seldata[0].data.V_CLASS_CODE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

    }
}

function getPersonReturnValue(retdata) {
    if (retdata != undefined) {
        for (var i = 0; i < retdata.length; i++) {
            if (agridStore.findExact('V_PERSONCODE', retdata[i].data.V_PERSONCODE) == -1) {
                agridStore.add(retdata[i].data);
            }
        }
    }
}

function saved_btn() {
    if (Ext.getCmp('addmzmc').getValue() == '') {
        alert('请填写班组名称！');
        return false;
    }
    var arr = [];
    for (var i = 0; i < agridStore.data.items.length; i++) {
        arr.push(agridStore.data.items[i].data.V_PERSONCODE);
    }
    if (seledit == 0) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'zdh/teambase_save',
            params: {
                IN_DEPARTCODE: Ext.getCmp('zyq').getValue(),
                IN_CLASSNAME: Ext.getCmp('addmzmc').getValue(),
                IN_WORKCODE: Ext.getCmp('addgzzx').getValue(),
                IN_PERSONCODE: arr.toString()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp[0] == 'SUCCESS') {
                    alert('新增成功！');
                }
            }
        });
    } else if (seledit == 1) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'zdh/teambase_edit',
            params: {
                IN_CLASSCODE: slecode,
                IN_DEPARTCODE: Ext.getCmp('zyq').getValue(),
                IN_CLASSNAME: Ext.getCmp('addmzmc').getValue(),
                IN_WORKCODE: Ext.getCmp('addgzzx').getValue(),
                IN_PERSONCODE: arr.toString()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp[0] == 'SUCCESS') {
                    alert('修改成功！');
                }
            }
        });
    }
    query();
    Ext.getCmp('addwin').hide();
}
function edit_btn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    agridStore.removeAll();
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamedit_sel',
        params: {
            IN_CLASSCODE : seldata[0].data.V_CLASS_CODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.getCmp('addmzmc').setValue(resp.list[0].V_CLASS_NAME);
            Ext.getCmp('addgzzx').setValue(resp.list[0].V_SAP_WORK);
        }
    });
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teambasedetail_sel',
        params: {
            IN_CLASSCODE : seldata[0].data.V_CLASS_CODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.data.StoreManager.lookup('agridStore').loadData(resp.list);
        }
    });
    seledit = 1;
    slecode = seldata[0].data.V_CLASS_CODE;
    Ext.getCmp('addwin').setTitle('修改班组');
    Ext.getCmp('addwin').show();
}
function del_btn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }
    var dflag = 0;
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'zdh/team_del',
            params: {
                IN_CLASSCODE : seldata[i].data.V_CLASS_CODE
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp[0] != 'SUCCESS') {
                    dflag = dflag + 1;
                }
            }
        });
    }
    if (dflag == 0) {
        alert('删除成功！');
    }
    query();
}
function todel(view, item, colIndex, rowIndex, e) {
    agridStore.remove(agridStore.data.items[colIndex]);
}