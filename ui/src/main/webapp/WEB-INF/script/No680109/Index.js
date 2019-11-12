var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var states = [];
states.push({id: '全部', value: '%'});
states.push({id: '报警', value: '报警'});
states.push({id: '已转出', value: '已转出'});
states.push({id: '已关闭', value: '已关闭'});
// states.push({id: '0', value: ''});


var stateStore = Ext.create("Ext.data.Store", {
    storeId: 'stateStore',
    fields: ['id', 'value'],
    data: states,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
var bmmcStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bmmcStore',
    fields: ['V_DEPTNAME', 'V_DEPTCODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW_DEPTTYPE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTTYPE: '[主体作业区]',
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        }
    }
});
var Hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        Hours.push({CODE: '0' + i, NAME: i});
    }
    else {
        Hours.push({CODE: i, NAME: i});
    }
}
var HourStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'HourStore',
    fields: ['CODE', 'NAME'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var Minutes = [];
for (i = 0; i < 60; i++) {
    if (i < 10) {
        Minutes.push({CODE: '0' + i, NAME: i});
    }
    else {
        Minutes.push({CODE: i, NAME: i});
    }
}
var MinuteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'MinuteStore',
    fields: ['CODE', 'NAME'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var lxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'lxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PP_INFORMATION/V_TYPE'
        }
    }
});
var bbstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bbstore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'
        }
    }
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 15,
    fields: ['D_DATE', 'I_ID', 'MTYPE', 'V_CLASSTYPE', 'V_DEPT', 'V_EQUIP', 'V_INFORMATION', 'V_PERSON','V_STATE','V_TYPE','YS'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners: {
    }
});
var Hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        Hours.push({CODE: '0' + i, NAME: i});
    }
    else {
        Hours.push({CODE: i, NAME: i});
    }
}
var HourStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'HourStore',
    fields: ['CODE', 'NAME'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var Minutes = [];
for (i = 0; i < 60; i++) {
    if (i < 10) {
        Minutes.push({CODE: '0' + i, NAME: i});
    }
    else {
        Minutes.push({CODE: i, NAME: i});
    }
}
var MinuteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'MinuteStore',
    fields: ['CODE', 'NAME'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var Layout = {
    layout: 'border',
    items: [ {
        xtype: 'panel',
        border: false,
        title: '信息首页',
        titleAlign:'center',
        region: 'north',
        layout: 'column',
        frame: true,
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'combo',
            fieldLabel: '部门名称',
            labelWidth: 60,
            id: 'bmmc',
            store: bmmcStore,
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            labelWidth: 60,
            id: 'lx',
            store: lxStore,
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '班型',
            labelWidth: 60,
            id: 'bb',
            store: 'bbstore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        },{
            xtype: 'combo',
            fieldLabel: '缺陷状态',
            labelWidth: 60,
            id: 'sqxzt',
            store: stateStore,
            editable: false,
            hidden: true,
            displayField: 'V_STATENAME',
            valueField: 'V_STATECODE',
            queryMode: 'local'
        }]
    }, {
        xtype: 'panel',
        border: false,
        region: 'north',
        layout: 'column',
        frame: true,
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'begintime',
            format: 'Y年m月d日',
            value: new Date()
        },{
            xtype: 'combo',
            width: 60,
            editable: false,
            id: 'sHour',
            store: HourStore,
            displayField: 'NAME',
            valueField: 'CODE',
            value: new Date().getHours()
        },
            {xtype: 'label', text: '时', style: {margin: '8px 0px 0px 10px'}},
            {
                xtype: 'combo',
                width: 60,
                id: 'sMinute',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分', style: {margin: '8px 0px 0px 10px'}},  {
            xtype: 'datefield',
            fieldLabel: '终止日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'endtime',
            format: 'Y年m月d日',
            value: new Date()
        },{
                xtype: 'combo',
                width: 60,
                editable: false,
                id: 'eHour',
                store: HourStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getHours()
            },
            {xtype: 'label', text: '时', style: {margin: '8px 0px 0px 10px'}},
            {
                xtype: 'combo',
                width: 60,
                id: 'eMinute',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分', style: {margin: '8px 0px 0px 10px'}},
            {
                xtype: 'button',
                display: 'hidden',
                text: '查 询',
                icon: imgpath + '/search.png',
                handler: function () {
                    queryStore();
                }
            }, {
                xtype: 'button',
                display: 'hidden',
                text: '导 出',
                icon: imgpath + '/311.gif',
                handler: function () {
                    OnButtonExcelClicked();
                }
            }, {
                xtype: 'button',
                display: 'hidden',
                text: '打 印',
                icon: imgpath + '/printer.png',
                handler: function () {
                    ID_list = [];
                    for (var i = 0; i < document.getElementsByName('GridPrint').length; i++) {
                        if (document.getElementsByName('GridPrint')[i].checked) {
                            ID_list.push(document.getElementsByName('GridPrint')[i].id);
                        }
                    }
                    if (ID_list.length > 0) {
                        window.open(AppUrl + "page/No680109/printNew2.html?bmmc=" + Ext.getCmp('bmmc').getRawValue() + "&lx=" + Ext.getCmp('lx').getRawValue()
                            + "&bb=" + Ext.getCmp('bb').getRawValue() + "&begintime=" + Ext.getCmp('begintime').getRawValue()+ " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00"
                            + "&endtime=" + Ext.getCmp('endtime').getRawValue()+ " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue() + ":00", ID_list, "dialogHeight:700px;dialogWidth:1100px");
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '没有要打印的内容',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
            }]
    }, {
        xtype: 'gridpanel',
        region: 'center',
        plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1
        }],
        columnLines: true,
        id: 'grid',
        store: 'gridStore',
        features: [{
            ftype: 'summary'
        }],
        columns: [{
            dataIndex: 'B_END',
            hidden: true
        }, {
            text: 'ID',
            dataIndex: 'I_ID',
            width: 150,
            renderer: left
        }, {
            text: '日期时间',
            dataIndex: 'D_DATE',
            align: 'center',
            renderer: renderRQ,
            width: 150
        },{
            text: '设备名称',
            dataIndex: 'V_EQUIP',
            width: 150,
            renderer: left
        }, {
            text: '内容',
            dataIndex: 'V_INFORMATION',
            flex: 1,
            width: 150,
            renderer: renderBgColor
        }, {
            text: '上报人',
            dataIndex: 'V_PERSON',
            width: 70,
            renderer: renderBgColor
        }, {
            text: '作业区',
            dataIndex: 'V_DEPT',
            width: 120,
            renderer: renderBgColor
        },{
            text: '状态',
            dataIndex: 'V_STATE',
            align: 'center',
            width: 100,
            renderer: renderBgColor
        }, {
            text: '类型',
            dataIndex: 'V_TYPE',
            align: 'center',
            width: 50,
            renderer: renderBgColor
        }, {
            text: '班型',
            dataIndex: 'V_CLASSTYPE',
            align: 'center',
            width: 50,
            renderer: renderBgColor
        }, {
            text: '打印',
            align: 'center',
            width: 50,
            renderer: check
        }],
        bbar: [{
            xtype: 'panel',
            width: '100%',
            frame: true,
            layout: 'column',
            items: [{
                xtype: 'label',
                //xtype: 'displayfield',
                text: '合计',
                style: {margin: '3px 0px 0px 150px'},
                //style: 'margin-left:150px'
            }, {
                xtype: 'displayfield',
                value: '数量：',
                id: 'sum',
                style: 'margin-left:150px'
            }]
        }]
    }]
};

function onPageLoaded() {
    var fpanel=Ext.create('Ext.panel.Panel',{
        id:'fpanel',
        layout:'vbox',
        region:'center',
        items:[
            {xtype:'textfield',id:'inper',fieldLabel:'处理人员',margin:'5 0 10 5',labelAlign:'right',labelWidth:75,width:250,value:decodeURI(V_V_PERSONNAME)},
            {
                xtype     : 'textareafield',
                id:'content',
                labelAlign:'right',
                grow      : true,
                fieldLabel: '内容详情',
                anchor    : '100%',
                margin:'5 0 10 5',
                labelWidth :75,
                width:450,
                height:70
            },
            {xtype:'panel',layout:'column', style:'background-color:#FFFFFF;',
                baseCls: 'my-panel-no-border',
                items:[{xtype:'button',
                    margin:'5 0 10 20',
                    id:'qr',
                    text:'确认',
                    handler:ComnitFinsh},
                    {
                        xtype:'button',
                        margin:'5 0 10 20',
                        id:'qx',
                        text:'取消',
                        handler:WinClose
                    }]
            }

        ]
    });
    var finishWin=Ext.create('Ext.window.Window',{
        id:'finishWin',
        layout:'border',
        width:560,
        height:350,
        frame:true,
        closeAction:'hide',
        closable:true,
        items:[fpanel]
    });
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('bmmcStore').on('load', function () {
        Ext.data.StoreManager.lookup('bmmcStore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        Ext.getCmp('bmmc').select(Ext.data.StoreManager.lookup('bmmcStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
        Ext.data.StoreManager.lookup('lxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('bbstore').on('load', function () {
        Ext.data.StoreManager.lookup('bbstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('bb').select(Ext.data.StoreManager.lookup('bbstore').getAt(0));
    });
    Ext.getCmp('sqxzt').select('%');
    setTimeout('queryStore()', 1000 * 1);
}


function queryStore() {
    if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST3',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPT: Ext.ComponentManager.get('bmmc').getValue(),
                V_V_TYPE: Ext.ComponentManager.get('lx').getValue(),
                V_V_CLASSTYPE: Ext.ComponentManager.get('bb').getValue(),
                V_V_TYPE_STATE: Ext.ComponentManager.get('sqxzt').getValue(),
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00",
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d') + " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue() + ":00"
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.data.StoreManager.lookup('gridStore').loadData(resp.list);
                Ext.ComponentManager.get('sum').setValue('数量：' + Ext.getStore('gridStore').data.items.length);
            }
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPT: Ext.ComponentManager.get('bmmc').getValue(),
                V_V_TYPE: Ext.ComponentManager.get('lx').getValue(),
                V_V_CLASSTYPE: Ext.ComponentManager.get('bb').getValue(),
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00",
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d') + " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue() + ":00"
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.data.StoreManager.lookup('gridStore').loadData(resp.list);
                Ext.ComponentManager.get('sum').setValue('数量：' + Ext.getStore('gridStore').data.items.length);
            }
        });
    }
}
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
            guid += "-";
        }
    }
    return guid;
}

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}

function renderDate(value, metaData) {
    if (Ext.Date.format(value, 'Y-m-d') != '' && Ext.Date.format(value, 'Y-m-d') != null) {
        return Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[0] + '年' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[1] + '月' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[2] + '日';
    } else {
        if (value != '' && value != null && value != undefined) {
            return value.substr(0, 10).split('-')[0] + '年' + value.substr(0, 10).split('-')[1] + '月' + value.substr(0, 10).split('-')[2] + '日';
        } else {
            return value;
        }
    }
}

function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode'))
        + '&V_V_DEPT=' + encodeURI(Ext.getCmp('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue())
        + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bb').getValue()) + '&V_D_FROMDATE='
        + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00") + '&V_D_TODATE='
        + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d') + " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue());
}

Ext.onReady(onPageLoaded);

function ComnitFinsh(){
    var I_ID="";
    var records=Ext.getCmp("grid").getSelectionModel().getSelection();
    if(records.length!=1){
        alert("请选择一条数据进行操作");
        return false;
    }
    else {
        I_ID = records[0].get("I_ID");
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PP_INFORMATION_FINISH_IN',
            method: 'POST',
            async: false,
            params: {
                V_ID:I_ID,
                V_PERCODE:V_V_PERSONCODE,
                V_PERNAME:Ext.getCmp("inper").getValue(),
                V_REMARK:Ext.getCmp("content").getValue()
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.RET != null) {
                    if(resp.RET=='SUCCESS'){
                        alert('处理成功');
                    }
                    else{
                        alert(resp.RET);
                    }
                } else {
                    alert("状态修改失败");
                }
            }
        });
    }
}

function WinClose(){
    Ext.getCmp("finishWin").close();
}

function check(value, metaData, record) {
    return '<input type="checkbox" checked="checked" name="GridPrint" id=' + record.raw.I_ID + '></input>'
}
function renderRQ(v, metaData, record) {
    metaData.style = "color: " + record.data.YS;
    return Ext.Date.format(Ext.Date.parse(v, "Y-m-d H:i:s"), 'Y-m-d H:i');
}


function left(value, metaData, record) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}

function renderBgColor(value, metaData, record) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}