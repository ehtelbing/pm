var mainguid="";
var childguid='';
//计划厂矿
var jhckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'jhckStore',
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
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});



//作业区
var jhzyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jhzyqStore',
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

//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sblxStore',
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
//设备名称
var sbmcStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbmcStore',
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



var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    layout: 'column',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'combo',
            id: 'jhck',
            fieldLabel: '计划厂矿',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: jhckStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'jhzyq',
            fieldLabel: '作业区',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: jhzyqStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sblx',
            fieldLabel: '设备类型',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            store: sblxStore,
            queryMode: 'local',
            listConfig: {
                minWidth: 270
            }
        },
        {
            xtype: 'combo',
            id: 'sbmc',
            fieldLabel: '设备名称',
            editable: false,
            labelAlign: 'right',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            store: sbmcStore,
            queryMode: 'local', listConfig: {
                minWidth: 400
            }
        },
        {
            xtype: 'button', text: '查询', margin: '5 0 5 5', icon: imgpath + '/search.png',
            handler: function () {
                query();
            }
        },
        {
            xtype:'button',text:'提交',margin:'5 0 5 5',icon:imgpath + '/add.png',
            handler: function () { submitTable(); }
        },
        {
            xtype: 'button', text: '修改状态', margin: '5 0 5 5', icon: imgpath + '/err2.png',
            handler: function () {
                allExcept();
            }
        }
    ]
});

var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['EQUCODE', 'EQUNAME','INSPECT_UNIT_CODE','INSPECT_UNIT','INSPECT_CONTENT','UUID',
        'INSPECT_STANDARD','STATE_SIGN','MAINGUID','CHILDGUID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/BASE_INSPECT_DAY_SELECT',
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

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: gridStore,
    columnLines: true,
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text:'数据编码', align: 'center', width: 100, dataIndex: 'UUID',hidden:true},
        {text: '设备编码', align: 'center', width: 100, dataIndex: 'EQUCODE',hidden:true},
        {text: '设备名称', align: 'center', width: 120, dataIndex: 'EQUNAME'},
        {text: '点检部位编码', align: 'center', width: 100, dataIndex: 'INSPECT_UNIT_CODE',hidden:true},
        {text: '点检部位', align: 'center', width: 150, dataIndex: 'INSPECT_UNIT'},
        {text: '点检内容', align: 'center', width: 100, dataIndex: 'INSPECT_CONTENT'},
        {text: '点检标准', align: 'center', width: 150, dataIndex: 'INSPECT_STANDARD'},
        {text:'正常/异常',align:'center',width: 160,dataIndex: 'STATE_SIGN',renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                //metaData.style = "text-align:center";
                if (value=="异常"){ metaData.style = "color:red;font-color:FF3333;text-align:center";}else{metaData.style = "text-align:center";}
                var uuid=store.data.items[rowIndex].get('UUID');
                return '<a href="javascript:change(\'' + uuid+ '\')">' + value + '</a>';
            }}
    ]
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
Ext.onReady(function () {

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });


    //计划厂矿加载监听
    Ext.data.StoreManager.lookup('jhckStore').on('load', function () {
        Ext.getCmp('jhck').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //计划作业区加载监听
    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
        Ext.getCmp('jhzyq').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('jhzyq').getValue()
            }
        });
    });


    //计划厂矿更改时
    Ext.getCmp('jhck').on('select', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });


    //作业区改变
    Ext.getCmp('jhzyq').on('select', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('jhzyq').getValue()
            }
        });

    });



    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
       // Ext.data.StoreManager.lookup('sblxStore').insert(0, {V_EQUTYPENAME: '全部', V_EQUTYPECODE: '%'});
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('jhzyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });

    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
       // Ext.data.StoreManager.lookup('sbmcStore').insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        query();
    });


    Ext.data.StoreManager.lookup('gridStore').on('load',function(store, records, success, eOpts){
        var list=Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.list;
        mainguid=list[0].MAINGUID;
        childguid=list[0].CHILDGUID;
    });



    var npanel=Ext.create('Ext.panel.Panel', {
        id:'npanel',
        frame:true,
        border:false,
        region:'center',
        width:1090,
        height:50,
        layout:'column',
        items:[{ xtype:'datefield',id: 'day',fieldLabel: '上报日期',labelAlign: 'right',labelWidth: 55,width: 191,
            value:nowdate(),emptyText:nowdate(),format:"Ymd",labelStyle: 'font-weight:bold',style: ' margin: 5px 5px 5px 5px',editable:false,readOnly:true},
            {xtype: "textfield", id: "inclass", fieldLabel: "交班班组",labelAlign: 'right',labelWidth: 55,width: 200, allowBlank: false,style: 'margin:5px 5px 5px 5px',readOnly:true},
            {xtype: "textfield", id: "inper", fieldLabel: "交班人",labelAlign: 'right',labelWidth: 55,width: 200, allowBlank: false,style: 'margin: 5px 5px 5px 5px',readOnly:true,
                value:decodeURI(Ext.util.Cookies.get('v_personname'))}
            ,{ xtype: "combobox", id: "jbclass", fieldLabel: "接班班组", labelAlign: 'right',labelWidth: 55,width: 200,labelStyle:'font-weight:bold',
                store:workCenterStore,displayField: "V_SAP_WORKNAME",valueField: "V_SAP_WORK",style: ' margin: 5px 5px 5px 5px',listConfig:{
                    minWidth:450
                }},
            { xtype: "combobox", id: "jbper", fieldLabel: "接班人", labelAlign: 'right',labelWidth: 55,width: 200,labelStyle:'font-weight:bold',
               store:workperStore,displayField: "V_PERSONNAME",valueField: "V_PERSONCODE",style: ' margin: 5px 5px 5px 5px'}
          ]
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
        width:1080,
        height:590,
        autoScroll: true,
        items:[npanel,cpanel]
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
function query(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_EQUCODE:Ext.getCmp('sbmc').getValue(),
            V_PERCODE:Ext.util.Cookies.get('v_personcode')
        }
    });
}

function submitTable(){
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
            Ext.getCmp('inclass').setValue(Ext.data.StoreManager.lookup('workCenterStore').getProxy().getReader().rawData.LOGINCLASS);
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

    if(childguid!=""){
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_SELECT',
            method: 'POST',
            async: false,
            params: {
                V_MAINGUID:mainguid,
                V_CHILDGUID: childguid,
                V_PERCODE :Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                Ext.getCmp('jbclass').setValue(resp.RET[0].NEXT_CLASS);
                Ext.getCmp('jbper').setValue(resp.RET[0].NEXT_PERCODE);
                Ext.getCmp('jbclass').setRawValue(resp.RET[0].NEXT_CLASSNAME);
                Ext.getCmp('jbper').setRawValue(resp.RET[0].NEXT_PERNAME);
                Ext.getCmp('sbdjjg').setValue(resp.RET[0].C_REQUESTION);
                Ext.getCmp('bbjxwt').setValue(resp.RET[0].E_INSPECT_RESULTE);
                Ext.getCmp('ubzsm').setValue(resp.RET[0].L_EQUESTION);
                Ext.getCmp('qtwt').setValue(resp.RET[0].OTHER_QIUEST);
            }
        });
    }
    Ext.getCmp('window').show();
}

function createguid(){
    var a=Math.round(Math.random()*6643);
    var b=Math.round(Math.random()*6983);
    var c=Math.round(Math.random()*6473);
    var d=Math.round(Math.random()*8643);
    var guid=a+'-'+b+'-'+c+'-'+d;
    return guid;
}

function change(value){
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/BASE_INSPECT_DAY_UPDATE',
        method: 'POST',
        async: false,
        params: {
            V_MAINGUID:mainguid,
            V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_UUID:value,//record[i].get('UUID'),
            V_STATE_SIGN:''//$("input[@name=nam]:checked").val()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET=='SUCCESS') {
                query();
                //Ext.getCmp('window').show();

            }
        }
    });
}

function allExcept(){
    var record=Ext.getCmp("gridPanel").getSelectionModel().getSelection();
    var length=record.length;
    for(var i=0;i<length;i++) {
       // var nam="sign"+i;
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/BASE_INSPECT_DAY_UPDATE',
            method: 'POST',
            async: false,
            params: {
                V_MAINGUID:mainguid,
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_UUID:record[i].get('UUID'),
                V_STATE_SIGN:''//$("input[@name=nam]:checked").val()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET=='SUCCESS') {
                    query();
                  //  Ext.getCmp('window').show();

                }
            }
        });
    }
}

function addNextper(){
 if(childguid==""){
     Ext.Ajax.request({
         url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_INSERT',
         method: 'POST',
         async: false,
         params: {
             V_MAINGUID:mainguid,
             V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
             V_NEXTPRECODE :Ext.getCmp('jbper').getValue(),
             V_INCLASS: Ext.getCmp('inclass').getValue()=="无"?"":Ext.getCmp('inclass').getValue(),
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
                 childguid=resp.V_CHGUID;
                 Ext.getCmp('window').close();
                 //  Ext.getCmp('window').show();
             }
         }
     });
 }else{
     Ext.Ajax.request({
         url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_UPDATE',
         method: 'POST',
         async: false,
         params: {
             V_MAINGUID:mainguid,
             V_CHILDGUID:new_childguid,
             V_PERCODE: Ext.util.Cookies.get('v_personcode'),
             V_NEXT_CLASS: Ext.getCmp('jbclass').getValue(),
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