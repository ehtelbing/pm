

var getyearguid="";
if(location.href.split('?')[1]==undefined){
    getyearguid=Ext.urlDecode(location.href.split('?')[1]).yearguid ;
    }

    Ext.onReady(function(){
       var centerPanel=Ext.create('Ext.panel.Panel',{
          id:'centerPanel',
          frame:true,
           region:'center',
          border:0,
          padding:'30 0 30 30',
          defaults:{
              xtype:'panel',
              style:'background-color:#dfe8f6;padding-body:#dfe8f6;padding-color:#dfe8f6;',
              width:540,
              padding:'10 0 0 25',
              border:0
          },
           items:[{
              layout:'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
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
               }]
           },{
              layout:'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
                   xtype: 'textfield',
                   labelAlign: 'right',
                   style:'background-color:#dfe8f6;',
                   readOnly: true,
                   width: 250
               }, items: [{
                   id: 'ck',
                   allowBlank: false,
                   fieldLabel: '计划厂矿',
                   labelWidth: 90
               }, {
                   readOnly: true,
                   id: 'zyq',
                   fieldLabel: '作业区',
                   allowBlank: false,
                   labelWidth: 90
               }]
           },{
               layout: 'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults: {
                   xtype: 'textfield',
                   labelAlign: 'right',
                   width: 250,
                   readOnly: true,
                   style:'bacgound-color:#dfe8f6;'
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
           }, {
               layout: 'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults: {
                   xtype: 'textfield',
                   labelAlign: 'right',
                   width: 250,
                   readOnly: true,
                   style:'bacgound-color:#dfe8f6;'
               },
               items: [{
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
           }, {
               layout: 'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults: {
                   xtype: 'textfield',
                   labelAlign: 'right',
                   style:'bacgound-color:#dfe8f6;',
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
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
                   style:'bacgound-color:#dfe8f6;',
                   readOnly: true
               },
               items: [{
                   xtype: 'textarea',
                   id: 'jxnr',
                   fieldLabel: '检修内容',
                   labelAlign: 'right',
                   labelWidth: 90,
                   width: 500
               }]
           }, {
               layout: 'column',
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
                   style:'bacgound-color:#dfe8f6;',
                   readOnly: true
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
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
                   style:'bacgound-color:#dfe8f6;',
                   readOnly: true
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
               bodyStyle:'background-color:#dfe8f6;',
               defaults: {
                   xtype: 'textfield',
                   style:'bacgound-color:#dfe8f6;',
                   labelAlign: 'right',
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
               bodyStyle:'background-color:#dfe8f6;',
               defaults:{
                   style:'bacgound-color:#dfe8f6;',
                   readOnly: true
               },
               items: [{
                   xtype: 'textarea',
                   id: 'bz',
                   fieldLabel: '备注',
                   labelAlign: 'right',
                   labelWidth: 90,
                   width: 500
               }]
           }
           ]
       });
        Ext.create('Ext.container.Viewport',{
            id:'main',
            layout:'border',
            frame:true,
            border:0,
            items:[centerPanel]
        });
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID: getyearguid
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.list != null) {
                    V_V_ORGCODE = data.list[0].V_ORGCODE;
                    V_V_DEPTCODE = data.list[0].V_DEPTCODE;
                    V_V_SPECIALTY = data.list[0].V_REPAIRMAJOR_CODE;
                    V_PERSONNAME = data.list[0].V_INPERNAME;
                    V_PERSONCODE = data.list[0].V_INPER;
                    //alert(V_PERSONCODE);
                    Ext.getCmp('year').setValue(data.list[0].V_YEAR);
                    Ext.getCmp('ck').setValue(data.list[0].V_ORGNAME);
                    Ext.getCmp('zyq').setValue(data.list[0].V_DEPTNAME);
                    Ext.getCmp('zy').setValue(data.list[0].V_REPAIRMAJOR_CODE);
                    Ext.getCmp('sblx').setValue(data.list[0].V_EQUTYPENAME);
                    Ext.getCmp('sbmc').setValue(data.list[0].V_EQUNAME);
                    Ext.getCmp('fqr').setValue(data.list[0].INPERNAME);
                    Ext.getCmp('fqsj').setValue(data.list[0].V_INDATE.substring(0, 19));
                    Ext.getCmp('jxnr').setValue(data.list[0].V_CONTENT);
                    Ext.getCmp('jhtgsj').setValue(data.list[0].V_STARTTIME.substring(0, 19));
                    Ext.getCmp('jhjgsj').setValue(data.list[0].V_ENDTIME.substring(0, 19));
                    Ext.getCmp('jhgshj').setValue(data.list[0].V_HOUR);
                    Ext.getCmp('bz').setValue(data.list[0].V_BZ);
                    _selectNextPer();
                    _selectTaskId();
                    Ext.getBody().unmask();
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });

    });
