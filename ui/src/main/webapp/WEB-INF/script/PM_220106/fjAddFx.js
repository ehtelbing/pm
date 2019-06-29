var  fxguid="";
var newguid="";
var orgcode="";
var deptcode="";
var  project_guid="";
if (Ext.urlDecode(location.href.split('?')[1]) != null) {
    fxguid = Ext.urlDecode(location.href.split('?')[1]).fxguid;
    newguid=Ext.urlDecode(location.href.split('?')[1]).newguid;
}
var date = new Date();
//年份
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
Ext.onReady(function(){

    var sapzyqStore=Ext.create("Ext.data.Store",{
        id:'sapzyqStore',
        autoLoad: true,
        fields:['V_SAP_DEPT','V_DEPTNAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_BASE_DEPT_SAP_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'), //Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        }
    });
    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        frame:true,
        border:false,
        layout:'vbox',
        items:[
            {
                layout:'hbox',
                defaults:{labelAlign:'center'},
                baseCls:'my-panel-no-border',
                items:[
                    {xtype:'button',
                        id:'savebtn',
                        text:'保存',
                        style:'margin:15px 0px 5px 90px',
                        handler:saveBtn
                    },
                    {
                        xtype:'button',
                        id:'cancelbtn',
                        text:'取消',
                        style:'margin:15px 0px 5px 20px',
                        handler:cancelBtn
                    }
                ]
            },
            {
                layout:'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items:[
                    {
                        xtype: 'combo',
                        id: 'year',
                        fieldLabel: '年份',
                        editable: false,
                        margin: '5 0 0 15',
                        labelWidth: 90,
                        width: 280,
                        displayField: 'displayField',
                        valueField: 'valueField',
                        store: yearStore,
                        queryMode: 'local'
                    },
                    {
                        xtype: 'combo',
                        id: 'month',
                        fieldLabel: '月份',
                        editable: false,
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        width: 255,
                        displayField: 'displayField',
                        valueField: 'valueField',
                        store: monthStore,
                        queryMode: 'local'
                    }
                ]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'ckbm',
                    fieldLabel: '厂矿SAP名称',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    readOnly:true,
                    width: 280
                },
                    {
                        xtype: 'combo',
                        id: 'zyqbm',
                        fieldLabel: '作业区SAP编码',
                        labelAlign: 'right',
                        allowBlank: false,
                        queryMode: 'local',
                        displayField:'V_DEPTNAME',
                        valueField:'V_SAP_DEPT',
                        store:sapzyqStore,
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        width: 280
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'fxjhbm',
                    fieldLabel: '放行计划编码',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    width: 280
                },
                    {
                        xtype: 'textfield',
                        id: 'fxjhmc',
                        fieldLabel: '放行计划名称',
                        labelAlign: 'right',
                        allowBlank: false,
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        width: 280
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'jxbm',
                    fieldLabel: '检修单位编码',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    width: 280
                },
                    {
                        xtype: 'textfield',
                        id: 'jxmc',
                        fieldLabel: '检修单位名称',
                        labelAlign: 'right',
                        allowBlank: false,
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        width: 280
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'datefield',
                    id: 'tgdate',
                    format: 'Y/m/d',
                    fieldLabel: '计划停工时间',
                    editable: false,
                    labelAlign: 'right',
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    width: 280
                },
                    {
                        xtype: 'datefield',
                        id: 'jgdate',
                        format: 'Y/m/d',
                        fieldLabel: '计划竣工时间',
                        editable: false,
                        labelAlign: 'right',
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        width: 280
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'wbsbm',
                    fieldLabel: 'WBS编码',
                    labelAlign: 'right',
                    allowBlank: true,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    readOnly:true,
                    width: 280,
                    value:''
                },
                    {
                        xtype: 'textfield',
                        id: 'wbsmc',
                        fieldLabel: '维修工程项目名称',
                        labelAlign: 'right',
                        allowBlank: true,
                        margin: '5 15 0 35',
                        labelWidth: 90,
                        readOnly:true,
                        width: 280,
                        value:''
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'gced',
                    fieldLabel: '工程额度',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    width: 280
                },{
                        xtype: 'label',
                        id: 'dw',
                        text:'(万元)',
                        margin: '7 0 0 5',
                        width:65,
                        color:'red'
                    }]
            }
            ,{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'fzrbm',
                    fieldLabel: '负责人编码',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 0 15',
                    labelWidth: 90,
                    width: 280
                }]
            }
            ,{
                xtype: 'textarea',
                id: 'fxnr',
                fieldLabel: '放行计划内容',
                margin: '5 15 10 15',
                labelWidth: 90,
                width: 540,
                height: 80,
                value: ''
            }
        ]
    });
    Ext.create('Ext.container.Viewport',{
        id: "id",
        layout: 'border',
        items: [panel]
    });

    Ext.data.StoreManager.lookup("sapzyqStore").load();
    Ext.getCmp('zyqbm').on('change',function(){
        Ext.data.StoreManager.lookup("sapzyqStore").load();
    });
    Ext.getCmp('zyqbm').on('select',function(){
        Ext.data.StoreManager.lookup("sapzyqStore").load();
    });
    getUpFxData();

});

function getUpFxData(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_MAINTAIN_REL_POST_GETONE_DATA',
        method:'POST',
        async:false,
        params:{
            V_FXGUID:fxguid
        },
        success:function (response){
            var resp=Ext.decode(response.responseText);
            if(resp.list.length!=0){
                project_guid=resp.list[0].V_PORJECT_GUID;
                orgcode=resp.list[0].V_ORGCODE;
                deptcode=resp.list[0].V_DEPTCODE;
                var tgsj=Ext.Date.format(new Date(resp.list[0].V_DATE_B),'Y/m/d');
                var jgsj=Ext.Date.format(new Date(resp.list[0].V_DATE_E),'Y/m/d');
                Ext.getCmp("year").select(resp.list[0].V_YEAR);
                Ext.getCmp("month").select(resp.list[0].V_MONEY);
                Ext.getCmp("ckbm").setValue(resp.list[0].ORGNAME);
                Ext.getCmp("zyqbm").select(resp.list[0].V_DEPTCODE);
                Ext.getCmp("fxjhbm").setValue(resp.list[0].V_PROJECT_CODE);
                Ext.getCmp("fxjhmc").setValue(resp.list[0].V_PROJECT_NAME);
                Ext.getCmp("wbsbm").setValue(resp.list[0].V_WBS_CODE);
                Ext.getCmp("wbsmc").setValue(resp.list[0].V_WBS_NAME);
                Ext.getCmp("fxnr").setValue(resp.list[0].V_CONTENT);
                Ext.getCmp("gced").setValue(resp.list[0].V_MONEY);
                Ext.getCmp("jxbm").setValue(resp.list[0].V_REPAIR_DEPT);
                Ext.getCmp("jxmc").setValue(resp.list[0].V_REPAIR_DEPT_TXT);
                Ext.getCmp("fzrbm").setValue(resp.list[0].V_FZR);
                Ext.getCmp("tgdate").setValue(tgsj);
                Ext.getCmp("jgdate").setValue(jgsj);
            }
        }
});
}
function saveBtn(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/MAINTAIN_RELEASE_POSTBACK_IN',
        method:'POST',
        async: false,
        params:{
            V_V_YEAR:Ext.getCmp("year").getValue(),
            V_V_MONTH:Ext.getCmp("month").getValue(),
            V_V_ORGCODE:orgcode,//Ext.getCmp("ckbm").getValue() ,
            V_V_DEPTCODE:Ext.getCmp("zyqbm").getValue(),
            PROJECTCODE:Ext.getCmp("fxjhbm").getValue(),
            PROJECTNAME:Ext.getCmp("fxjhmc").getValue(),
            WBSCODE:Ext.getCmp("wbsbm").getValue(),
            WBSNAME:Ext.getCmp("wbsmc").getValue(),
            V_V_CONTENT:Ext.getCmp("fxnr").getValue(),
            V_V_MONEY:Ext.getCmp("gced").getValue(),
            REPAIR_DEPTCODE:Ext.getCmp("jxbm").getValue(),
            REPAIR_DEPTNAME:Ext.getCmp("jxmc").getValue(),
            V_V_FZR:Ext.getCmp("fzrbm").getValue(),
            V_STARTDATE:Ext.getCmp("tgdate").getSubmitValue(),
            V_ENDDATE:Ext.getCmp("jgdate").getSubmitValue(),
            IN_PERCODE:Ext.util.Cookies.get('v_personcode'),
            PROJECT_GUID:project_guid,
            V_UPGUID:fxguid,
            V_V_GUID:newguid
        },
        success:function (response){
            var resp=Ext.decode(response.responseText);
            if(resp.RET=="SUCCESS"){
                Ext.Msg.alert("提示","保存成功");
                window.opener.selectGridTurn();
                window.close();
            }
        }
    });
}
function cancelBtn(){
    window.close();
}