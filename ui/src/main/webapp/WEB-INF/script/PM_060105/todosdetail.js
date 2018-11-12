
var childguid="";
var mainguid="";
var new_childguid="";
var in_classid="";
if (location.href.split('?')[1] != undefined) {
    if (Ext.urlDecode(location.href.split('?')[1]) != null) {
        childguid = Ext.urlDecode(location.href.split('?')[1]).a_childguid;
    }
}
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['MAINGUID', 'CHILDGUID','EQUCODE','EQUNAME','INSPECT_UNIT_CODE','INSPECT_UNIT',
        'INSPECT_CONTENT','INSPECT_STANDARD','STATE_N_SIGN','IN_PERCODE','IN_PERCODE','IN_PERNAME',
        'IN_DATE','UUID','IN_CLASS','IN_CLASSNAME','E_INSPECT_RESULTE','C_REQUESTION','L_EQUESTION','OTHER_QIUEST'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/BASE_INSPECT_SELTODOS',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET',
            total: 'total'
        }
    }
});

var workCenterStore = Ext.create('Ext.data.Store', {
    id: 'workCenterStore',
    autoLoad: false,
    fields: ['V_SAP_WORK', 'V_SAP_WORKNAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'dxfile/BASE_INSPECT_GETCLASS',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var workperStore= Ext.create('Ext.data.Store', {
    id: 'workperStore',
    autoLoad: false,
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'dxfile/BASE_INSPECT_GETNEXTPERSON',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    layout: 'column',
    defaults: {labelAlign: 'right'},
    items: [
        { xtype:'datefield',id: 'day',fieldLabel: '上报日期',labelAlign: 'right',labelWidth: 55,width: 191,
            value:nowdate(),emptyText:nowdate(),format:"Ymd",labelStyle: 'font-weight:bold',style: ' margin: 5px 5px 5px 5px',editable:false,readOnly:true},
        {xtype: "textfield", id: "inclass", fieldLabel: "交班班组",labelAlign: 'right',labelWidth: 55,width: 200, allowBlank: false,style: 'margin:5px 5px 5px 5px',readOnly:true},
        {xtype: "textfield", id: "inper", fieldLabel: "交班人",labelAlign: 'right',labelWidth: 55,width: 200, allowBlank: false,style: 'margin: 5px 5px 5px 5px',readOnly:true,
            value:decodeURI(Ext.util.Cookies.get('v_personname'))}
        ,{ xtype: "combobox", id: "jbclass", fieldLabel: "接班班组", labelAlign: 'right',labelWidth: 55,width: 200,labelStyle:'font-weight:bold',
            store:workCenterStore,displayField: "V_SAP_WORKNAME",valueField: "V_SAP_WORK",style: ' margin: 5px 5px 5px 5px',listConfig:{
                minWidth:450,queryMode : 'local'
            }},
        { xtype: "combobox", id: "jbper", fieldLabel: "接班人", labelAlign: 'right',labelWidth: 55,width: 200,labelStyle:'font-weight:bold',
            store:workperStore,displayField: "V_PERSONNAME",valueField: "V_PERSONCODE",style: ' margin: 5px 5px 5px 5px',queryMode : 'local'},
        {
            xtype:'button',text:'提交',margin:'5 0 5 5',icon:imgpath + '/add.png',
            handler: function () { submitTable(); }
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: gridStore,
    columnLines: true,
    //selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text:'数据编码', align: 'center', width: 100, dataIndex: 'UUID',hidden:true},
        {text: '设备编码', align: 'center', width: 100, dataIndex: 'EQUCODE',hidden:true},
        {text: '设备名称', align: 'center', width: 120, dataIndex: 'EQUNAME'},
        {text: '点检部位编码', align: 'center', width: 100, dataIndex: 'INSPECT_UNIT_CODE',hidden:true},
        {text: '点检部位', align: 'center', width: 150, dataIndex: 'INSPECT_UNIT'},
        {text: '点检内容', align: 'center', width: 100, dataIndex: 'INSPECT_CONTENT'},
        {text: '点检标准', align: 'center', width: 150, dataIndex: 'INSPECT_STANDARD'},
        {text: '正常/异常',align:'center',width: 160,dataIndex: 'STATE_N_SIGN'}
    ]
});

Ext.onReady(function() {


    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_CHILDGUID:childguid,
            V_PERSON:Ext.util.Cookies.get('v_personcode')
        }
    });
    Ext.data.StoreManager.lookup('gridStore').on('load', function () {
        mainguid=Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].MAINGUID;
        in_classid=Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].NEXT_CLASS;
        Ext.getCmp('inclass').setValue(Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].NEXT_CLASSNAME);
        Ext.getCmp('sbdjjg').setValue(Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].E_INSPECT_RESULTE);
        Ext.getCmp('bbjxwt').setValue(Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].C_REQUESTION);
        Ext.getCmp('ubzsm').setValue(Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].L_EQUESTION);
        Ext.getCmp('qtwt').setValue(Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET[0].OTHER_QIUEST);
    });

    //----接班班组
    Ext.data.StoreManager.lookup('workCenterStore').load({
        params: {
            V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            DEPTCODE:Ext.util.Cookies.get('v_deptcode')
        }
    });
    //----接班班组改时
    Ext.data.StoreManager.lookup('workCenterStore').on('load', function () {
        Ext.getCmp('jbclass').select(Ext.data.StoreManager.lookup('workCenterStore').getAt(0));

        if(Ext.data.StoreManager.lookup('workCenterStore').getProxy().getReader().rawData.LOGINCLASS!=null){
           // Ext.getCmp('inclass').setValue(Ext.data.StoreManager.lookup('workCenterStore').getProxy().getReader().rawData.LOGINCLASS);
        }else{
            Ext.getCmp('inclass').setValue('无');
        }
    });

    //----接班人
    Ext.getCmp('jbclass').on('select', function () {
        Ext.data.StoreManager.lookup('workperStore').load({
            params: {
                SAP_WORK:Ext.getCmp('jbclass').getValue()
            }
        });
    });
    Ext.data.StoreManager.lookup('workperStore').on('load', function () {
        Ext.getCmp('jbper').select(Ext.data.StoreManager.lookup('workperStore').getAt(0));
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });

    var cpanel=Ext.create('Ext.panel.Panel', {
        id:'cpanel',
        frame:true,
        border:false,
        region:'center',
        width:1090,
        height:520,
        items:[{ xtype: "textareafield", id: "sbdjjg", fieldLabel: "设备点检结果 ",labelWidth:70,width:650, allowBlank: false,grow:true,anchor:'100%',maxLength:'500',minLength:2,preventScrollbars:true,style: ' margin: 20px 3px 2px 30px',growMin:60},
            { xtype: "textareafield", id: "bbjxwt", fieldLabel: "本班检修问题",labelWidth:70,width:650,  allowBlank: false,grow:true,anchor:'100%',maxLength:'500',minLength:2,preventScrollbars:true,style: ' margin: 20px 3px 2px 30px',growMin:60},
            { xtype: "textareafield", id: "ubzsm", fieldLabel: "遗留设备问题", labelWidth:70,width:650, allowBlank: false,grow:true,anchor:'100%',maxLength:'500',minLength:2,preventScrollbars:true,style: ' margin: 20px 3px 2px 30px',growMin:60},
            { xtype: "textareafield", id: "qtwt", fieldLabel: "其他问题", labelWidth:70,width:650, allowBlank: false,grow:true,anchor:'100%',maxLength:'500',minLength:2,preventScrollbars:true,style: ' margin: 20px 3px 2px 30px',growMin:60}
        ]
    });
    var panelwin=Ext.create('Ext.panel.Panel', {
        id:'panelwin',
        frame:true,
        border:false,
        width:1090,
        height:590,
        //autoScroll: true,
        items:[cpanel]
    });
    var window=Ext.create('Ext.window.Window',{
        id:'window',
        title:'岗位点检记录',
        frame:true,
        border:false,
        width:1090,
        height:590,
        layout:'fit',
        closeAction:'hide',
        // autoScroll: true,
        items:[panelwin],
        buttons: [
            {
                xtype: "button",
                text: "确定",
                id: "btn1",
                handler:function(){
                    addNextper();
                }
            },
            {
                xtype: "button", id: "btn2", text: "取消", handler: function () {
                    this.up("window").close();
                }
            }]
    });
});
function submitTable(){
    Ext.getCmp('window').show();
}

function addNextper(){
    if(Ext.getCmp('jbclass').getValue()==""&&Ext.getCmp('jbper').getValue()==""&&Ext.getCmp('jbclass').getValue()==null&&Ext.getCmp('jbper').getValue()==null){
        Ext.Msg.alert('消息',"请先选择接收班级，接收人"); return ;
    }
    if(new_childguid==""){
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_INSERT2',
            method: 'POST',
            async: false,
            params: {
                V_MAINGUID:mainguid,
                V_CHILDGUID:childguid,
                V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
                V_NEXTPRECODE :Ext.getCmp('jbper').getValue(),
                V_INCLASS: Ext.getCmp('inclass').getValue()=="无"?"":in_classid, //Ext.getCmp('inclass').getValue(),
                V_NEXTCLASS: Ext.getCmp('jbclass').getValue(),
                V_NCLASSNAME:Ext.getCmp('jbclass').getDisplayValue(),
                V_INSPECT_RESULTE:Ext.getCmp('sbdjjg').getValue(),
                V_REQUESTION:Ext.getCmp('bbjxwt').getValue(),
                V_EQUESTION:Ext.getCmp('ubzsm').getValue(),
                V_OTHER_QIUEST:Ext.getCmp('qtwt').getValue()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET=='SUCCESS') {
                    new_childguid=resp.V_CHGUID;
                    Ext.getCmp('window').close();
                    //  Ext.getCmp('window').show();
                }
            }
        });
    }
    else{
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_UPDATE',
            method: 'POST',
            async: false,
            params: {
                V_MAINGUID:mainguid,
                V_CHILDGUID:new_childguid,
                V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                // V_NEXTPERCODE :Ext.getCmp('jbper').getValue(),
                // V_NEXT_CLASS: Ext.getCmp('inclass').getValue()=="无"?"":Ext.getCmp('inclass').getValue(),
                V_NEXT_CLASS: Ext.getCmp('jbclass').getValue(),
                // V_NCLASSNAME:Ext.getCmp('jbclass').getDisplayValue(),
                V_NEXTPERCODE :Ext.getCmp('jbper').getValue(),
                V_INSPECT_RESULTE:Ext.getCmp('sbdjjg').getValue(),
                V_REQUESTION:Ext.getCmp('bbjxwt').getValue(),
                V_EQUESTION:Ext.getCmp('ubzsm').getValue(),
                V_OTHER_QIUEST:Ext.getCmp('qtwt').getValue()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET=='SUCCESS') {
                    Ext.getCmp('window').close();
                }
            }
        });
    }

}

function nowdate(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth();
    var day=date.getDate();
    if(month<10){ month='0'+month;}
    if(day<10){day='0'+day;}
    var nowday=year+''+month+''+day;
    return nowday;
}