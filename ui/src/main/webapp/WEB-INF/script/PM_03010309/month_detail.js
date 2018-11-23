
var monthguid="";
if(location.href.split('?')[1]!=undefined){
    monthguid=Ext.urlDecode(location.href.split('?')[1]).monthguid;
}

Ext.onReady(function(){
    var northpanel=Ext.create('Ext.panel.Panel',{
       id:'northpanel',
        region:'north',
        // style:'background-color:#dfe8f6',
        padding:'20 0 20 20',
        frame:true,
        height: 1060,
        width: 560,
        border:0,
        defaults:{
            width: 540,
            style:'background-color:#dfe8f6;padding-body:#dfe8f6;padding-color:#dfe8f6;',
            padding:'5 0 5 10',
            xtype:'panel',
            border:0
        },
        items:[{
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                style:'background-color:#dfe8f6;',
                width: 250,
                readOnly: true
        },
            items:[{
                id: 'year',
                allowBlank: false,
                fieldLabel: '年份',
                labelWidth: 90
            },{
                id: 'month',
                fieldLabel: '月份',
                allowBlank: false,
                labelWidth: 90
            }]
    },{
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                xtype: 'textfield',
                readOnly: true,
                style:'background-color:#dfe8f6;',
                labelAlign: 'right',
                width: 250
            },
            items: [{
                id: 'ck',
                allowBlank: false,
                fieldLabel: '计划厂矿',
                labelWidth: 90
            }, {
                id: 'zyq',
                fieldLabel: '作业区',
                allowBlank: false,
                labelWidth: 90
            }]
        },{
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                xtype: 'textfield',
                readOnly: true,
                style:'background-color:#dfe8f6;',
                labelAlign: 'right',
                width: 250
            },
            items: [{
                id: 'zy',
                allowBlank: false,
                fieldLabel: '专业',
                labelWidth: 90
            }, {
                id: 'sblx',
                fieldLabel: '设备类型',
                allowBlank: false,
                labelWidth: 90
            }]
        },{
           layout:'column',
            bodyStyle:'background:#dfe8f6',
            defaults:{
               xtype:'textfield',
                style:'background-color:#dfe8f6;',
                labelAlign:'right',
                readOnly: true,
                width:250
            },
            items:[{
                id: 'sbmc',
                allowBlank: false,
                fieldLabel: '设备名称',
                labelWidth: 90
            }, {
                id: 'fqr',
                allowBlank: false,
                fieldLabel: '发起人',
                labelWidth: 90
            }]
        },{
            layout: 'hbox',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                labelAlign: 'right',
                style:'background-color:#dfe8f6;',
                width: 250,
                readOnly: true
            },
            items: [{
                xtype: 'textfield',
                id: 'sgfs',
                allowBlank: false,
                fieldLabel: '施工方式',
                labelWidth: 90
            }, {
                xtype:'checkboxfield',
                boxLabel:'施工准备是否已落实',
                margin:'5 0 0 35',
                id : 'iflag',
                inputValue:1,
                uncheckedValue:0
            }]
        },{
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                xtype: 'textfield',
                style:'background-color:#dfe8f6;',
                labelAlign: 'right',
                width: 250,
                readOnly: true
            },
            items: [{
                id: 'fqsj',
                allowBlank: false,
                fieldLabel: '发起时间',
                labelWidth: 90
            }]
        }, {
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults:{
                style:'background-color:#dfe8f6;',
                labelAlign: 'right',
                readOnly: true,
            },
            items: [{
                xtype: 'textarea',
                id: 'jxnr',
                fieldLabel: '检修内容',
                labelWidth: 90,
                width: 500
            }]
        }, {
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults:{
                style:'background-color:#dfe8f6;',
                readOnly: true,
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                id: 'jhtgsj',
                labelAlign: 'right',
                allowBlank: false,
                fieldLabel: '计划停工时间',
                labelWidth: 90,
                width: 250
            }]
        }, {
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults:{
                style:'background-color:#dfe8f6;',
                readOnly: true,
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                id: 'jhjgsj',
                labelAlign: 'right',
                allowBlank: false,
                fieldLabel: '计划竣工时间',
                labelWidth: 90,
                width: 250
            }]
        }, {
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                style:'background-color:#dfe8f6;',
                width: 250,
                readOnly: true
            },
            items: [{
                id: 'jhgshj',
                allowBlank: false,
                fieldLabel: '计划工时合计',
                labelWidth: 90
            }]
        }, {
            layout: 'column',
            bodyStyle:'background:#dfe8f6',
            defaults:{
                style:'background-color:#dfe8f6;',
                readOnly: true,
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textarea',
                id: 'bz',
                fieldLabel: '备注',
                labelWidth: 90,
                width: 500
            }]
        }]
    });
    Ext.create('Ext.container.Viewport',{
       id:'main',
       layout:'border',
        frame:true,
        border:0,
        width: 560,
       items:[northpanel]
    });
   Ext.Ajax.request({
       url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_GET',
       type: 'ajax',
       method: 'POST',
       async: false,
       params: {
           V_V_MONTHPLAN_GUID: monthguid
       },
       success: function (resp) {
           var data = Ext.decode(resp.responseText);//后台返回的值
            var V_V_ORGCODE = data.list[0].V_ORGCODE;
           var V_V_DEPTCODE = data.list[0].V_DEPTCODE;
           var  V_V_SPECIALTY = data.list[0].V_REPAIRMAJOR_CODE;
           var V_PERSONNAME = data.list[0].V_INPERNAME;
           var V_PERSONCODE = data.list[0].V_INPER;
           Ext.getCmp('year').setValue(data.list[0].V_YEAR);
           Ext.getCmp('month').setValue(data.list[0].V_MONTH);
           Ext.getCmp('ck').setValue(data.list[0].V_ORGNAME);
           Ext.getCmp('zyq').setValue(data.list[0].V_DEPTNAME);
           Ext.getCmp('zy').setValue(data.list[0].V_REPAIRMAJOR_CODE);
           Ext.getCmp('sblx').setValue(data.list[0].V_EQUTYPENAME);
           Ext.getCmp('sbmc').setValue(data.list[0].V_EQUNAME);
           Ext.getCmp('fqr').setValue(data.list[0].V_INPERNAME);
           Ext.getCmp('fqsj').setValue(data.list[0].V_INDATE.substring(0, 19));
           Ext.getCmp('jxnr').setValue(data.list[0].V_CONTENT);
           Ext.getCmp('jhtgsj').setValue(data.list[0].V_STARTTIME.substring(0, 19));
           Ext.getCmp('jhjgsj').setValue(data.list[0].V_ENDTIME.substring(0, 19));
           Ext.getCmp('jhgshj').setValue(data.list[0].V_HOUR);
           Ext.getCmp('bz').setValue(data.list[0].V_BZ);
           Ext.getCmp('sgfs').setValue(data.list[0].V_SGWAYNAME);
           Ext.getCmp('iflag').setValue(data.list[0].V_FLAG);
       },
       failure: function (response) {
           Ext.MessageBox.show({
               title: '错误',
               msg: response.responseText,
               buttons: Ext.MessageBox.OK,
               icon: Ext.MessageBox.ERROR
           });
       }
   })
});