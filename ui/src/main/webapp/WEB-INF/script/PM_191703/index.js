var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var V_MX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_MX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_MX_CODE;
}
var orgLoad = false;
var equTypeLoad = false;
var basedicLoad = false;
Ext.onReady(function () {

    var teamStore = Ext.create('Ext.data.Store', {
        id: 'teamStore',
        autoLoad: true,
        fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'basic/PRO_BASE_DEPTTOSAPWORKCSAT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_DEPTREPAIRCODE': Ext.util.Cookies.get('v_deptcode')
            }
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
            }
        }
    });


    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        region: 'center',
        padding: '10px 0px 0px 0px',
        //baseCls: 'my-panel-no-border',
        //style: 'background-color:#FFFFFF',
        frame: true,
        border:false,
        defaults: {
            labelAlign: 'right',
            margin : '10px 0 0 10px',
        },
        layout:'vbox',
        items: [
            {
                xtype: 'textfield',
                id : 'jxgxbm',
                fieldLabel: '检修工序编码',
                readOnly : true,
                value : guid(),
                labelWidth:100,
                width : 340
            },
           {
            xtype: 'textfield',
            id : 'jxgxname',
            colspan : 2,
            fieldLabel: '检修工序名称',
            width : 340
        },{
            xtype: 'textfield',
            id : 'jxgxcontent',
           labelWidth:100,
            fieldLabel: '检修工序内容',
            width : 340
        },{
            xtype: 'combo',
            id : 'jxteam',
            labelWidth:100,
            store: teamStore,
            queryMode: 'local',
            valueField: 'V_SAP_WORK',
            displayField: 'V_SAP_WORKNAME',
            fieldLabel: '检修工作中心',
            width : 340,
            editable : false
        },{
            xtype: 'textfield',
            id : 'order',
            labelWidth:100,
            fieldLabel: '排序',
            width : 340
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                    xtype: 'textfield',
                    id : 'jxcar',
                    fieldLabel: '检修机具',
                    labelWidth:100,
                    width:310,
                    readOnly : true
                },{
                    xtype : 'button',
                    text : '+',
                    handler : selectJXCAR,
                    width : 25,
                    margin : '10px 0 0 5px'
                }
            ]
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                    xtype: 'textfield',
                    id : 'jxtool',
                    fieldLabel: '检修工具',
                    labelWidth:100,
                    width:310,
                    readOnly : true
                },{
                    xtype : 'button',
                    text : '+',
                    handler : selectJXTOOL,
                    width : 25,
                    margin : '10px 0 0 5px'
                }
            ]
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                    xtype: 'textfield',
                    id : 'jxper',
                    fieldLabel: '检修定额人员',
                    labelWidth:100,
                    width:310,
                    readOnly : true
                },{
                    xtype : 'button',
                    text : '+',
                    handler : selectJXPER,
                    width : 25,
                    margin : '10px 0 0 5px'
                }
            ]
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                    xtype: 'textfield',
                    id : '',
                    fieldLabel: '检修物料',
                    labelWidth:100,
                    width:310,
                    readOnly : true
                },{
                    xtype : 'button',
                    text : '+',
                    handler : '',
                    width : 25,
                    margin : '10px 0 0 5px'
                }
            ]
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                    xtype: 'textfield',
                    id : '',
                    fieldLabel: '检修技术要求',
                    labelWidth:100,
                    width:310,
                    readOnly : true
                },{
                    xtype : 'button',
                    text : '+',
                    handler : '',
                    width : 25,
                    margin : '10px 0 0 5px'
                }
            ]
        },
        {layout:'column',border:false, defaults: {labelAlign: 'right', margin : '10px 0 0 0px'},
            items:[
                {
                xtype: 'textfield',
                id : '',
                fieldLabel: '检修安全措施',
                labelWidth:100,
                width:310,
                readOnly : true
            },{
                xtype : 'button',
                text : '+',
                handler : '',
                width : 25,
                margin : '10px 0 0 5px'
            }
            ]
        },
        {layout:'column',border:false,
            items:[
                {
                    xtype: 'button',
                    text: '保存',
                    margin: '5px 0px 5px 200px',
                    style: 'padding-left:10px;padding-right:10px',
                    handler: save_btn
                }, {
                    xtype: 'button',
                    text: '取消',
                    margin: '5px 0px 5px 10px',
                    handler: cancel_btn
                }
            ]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [inputPanel]
    });
});


function _close() {
    window.close();
}

function selectJXCAR(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191704/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXCAR(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxcar').setValue(ss);
}

function selectJXTOOL(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191705/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXTOOL(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxtool').setValue(ss);
}

function selectJXPER(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191706/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXPER(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxper').setValue(ss);
}


function save_btn(){
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE : Ext.getCmp('jxgxbm').getValue(),
            V_V_JXGX_NAME : Ext.getCmp('jxgxname').getValue(),
            V_V_JXGX_NR :Ext.getCmp('jxgxcontent').getValue(),
            V_V_GZZX_CODE : Ext.getCmp('jxteam').getValue(),
            V_V_JXMX_CODE : V_MX_CODE,
            V_V_ORDER : Ext.getCmp('order').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            window.opener.queryGrid();
            window.close();
        }
    });
}

function cancel_btn(){
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE : Ext.getCmp('jxgxbm').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            window.close();
        }
    });
}

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}