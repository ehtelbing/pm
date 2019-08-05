var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
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
var bxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bxStore',
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
    fields: ['D_DATE', 'I_ID', 'V_CLASS', 'V_CLASSTYPE', 'V_DEPT', 'V_INFORMATION', 'V_PERSONNAME', 'V_TYPE','STATE','DEFCODE'],
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
var Layout = {
    layout: 'border',
    items: [ {
        xtype: 'panel',
        border: false,
        title: '信息查询',
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
            id: 'bx',
            store: 'bxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
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
            id: 'stardate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'datefield',
            fieldLabel: '终止日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'enddate',
            format: 'Y年m月d日',
            value: new Date()
        },
            {
            xtype: 'button',
            text: '查询',
            handler: queryGrid,
            icon: imgpath + '/search.png',
            style: {
                margin: ' 5px 0 5px 40px'
            }
        }, {
            xtype: 'button',
            text: '导出Excel',
            handler: OnButtonExcelClicked,
            icon: imgpath + '/001.gif'
        }, {
            xtype: 'button',
            text: '转成缺陷',
            handler: OnButtonToDefect,
            icon: imgpath + '/001.gif'
        }, {
            xtype: 'button',
            text: '完成处理',
            handler: OnButtonFinish,
            icon: imgpath + '/001.gif'
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
            xtype: 'rownumberer',
            text: '序号',
            width: 35,
            align: 'center'
        }, {
            text:'状态',
            align:'center',
            width:70,
            dataIndex:'STATE'
        },{
            text: '日期',
            align: 'center',
            width: 110,
            dataIndex: 'D_DATE',
            renderer: renderDate,
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '合计'
            }
        }, {
            text: '班型',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASSTYPE',
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '数量  : ' + value + '条'
            }
        }, {
            text: '班组',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASS'
        }, {
            text: '录入人',
            align: 'center',
            width: 90,
            dataIndex: 'V_PERSONNAME',
            renderer: renderFont
        }, {
            text: '内容',
            align: 'center',
            width: 230,
            dataIndex: 'V_INFORMATION',
            renderer: renderFont
        }, {
            text: '信息类型',
            align: 'center',
            width: 100,
            dataIndex: 'V_TYPE'
        }, {
            text: '所属部门',
            align: 'center',
            width: 150,
            dataIndex: 'V_DEPT',
            renderer: renderFont
        }, {
            text: '缺陷详情',
            align: 'center',
            width: 150,
            dataIndex: 'DEFCODE',
            renderer:turnToPage
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
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
    Ext.data.StoreManager.lookup('bxStore').on('load', function () {
        Ext.data.StoreManager.lookup('bxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('bx').select(Ext.data.StoreManager.lookup('bxStore').getAt(0));
    });
    setTimeout('queryGrid()', 1000 * 1);
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPT: Ext.getCmp('bmmc').getValue(),
            V_V_TYPE: Ext.getCmp('lx').getValue(),
            V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
            V_D_FROMDATE: Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y/m/d'),
            V_D_TODATE: Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y/m/d')
        }
    });
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

function renderMoney(value, metaData) {
    metaData.style = 'text-align: right';
    if (value != '' && value != null) {
        return Ext.util.Format.number(value, '0.00');
    } else {
        return value;
    }
}

function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.getCmp('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bx').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d'));
}

Ext.onReady(onPageLoaded);

function OnButtonToDefect(){
    var I_ID="";
    var records=Ext.getCmp("grid").getSelectionModel().getSelection();
    if(records.length!=1){
        alert("请选择一条数据进行操作");
        return false;
    }
    else{
        I_ID=records[0].get("I_ID");
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/No680102/createDef.html?I_ID=' + I_ID,
            '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}

//完场处理
function OnButtonFinish(){
      Ext.getCmp("finishWin").show();
}
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
function turnToPage(value, metaData, record, rowIdx, colIdx, store, view){
    if(value==""){
        return '<a href="javascript:defclick(\'' + value + '\')">' + "" + '</a>';
    }else{
        return '<a href="javascript:defclick(\'' + value + '\')">' + "缺陷详情" + '</a>';
    }

}
function defclick(value) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index1.html?v_guid="
        +value, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}