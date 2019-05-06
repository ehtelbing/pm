
var YEARGUID="";
var date=new Date();
var years=[];
var MainMONTH="";
var MainYEAR="";
var monthGuid="";
if(location.href.split("?")[1]!=undefined){
    MainMONTH=Ext.urlDecode(location.href.split('?')[1]).MainMONTH;
    MainYEAR=Ext.urlDecode(location.href.split('?')[1]).MainYEAR;
}
for(var i=0;i<date.getFullYear()+3;i++){
    years.push({id:i,value:i});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    fields:['id','value'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function(){
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['ID_GUID','V_YEAR','V_MONTH','ORGCODE','ORGNAME','DEPTCODE','DEPTNAME',
            'ZYCODE','ZYNAME','EQUCODE','EQUTYPE','V_EQUNAME','V_EQUTYPENAME','SGTYPECODE','SGTYPENAME'
            ,'REPAIRCONTENT','QXCONTEXT','REMARK','PLANTJMONTH','PLANJGMONTH','PLANHOUR','REDEPTCODE','REDEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_PLAN_YEAR_BASIC_TO_MON_SEL',
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
    //年计划不含缺陷，缺陷查找
    var qxAddStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'qxAddStore',
        fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
            'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
            'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
            'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var npanel=Ext.create('Ext.panel.Panel',{
        id:'npanel',
        layout:'column',
        region:'north',
        height:50,
        frame:true,
        border:false,
        items:[
            {xtype:'combo',
                id: 'year',
                fieldLabel:'年份',
                editable: false,
                margin: '5 0 0 5',
                labelWidth: 80,
                labelAlign:'right',
                width: 150,
                displayField: 'value',
                valueField: 'id',
                value: date.getFullYear(),
                store: yearStore,
                queryMode: 'local',
                listeners:{
                change:function(){
                    selFinishYear();
                },
                    select:function(){
                        selFinishYear();
                    }
                }
            },
            {
                xtype:'button',
                id:'selBtn',
                margin: '7 0 0 10',
                text:'查询',
                handler:selFinishYear
            },
            {
                xtype:'button',
                id:'saveBtn',
                margin: '7 0 0 10',
                text:'确定返回',
                handler:saveMonth
            }
        ]
    });

    var cpanel=Ext.create('Ext.grid.Panel',{
        id:'cpanel',
        columnLines:true,
        region: 'center',
        border: true,
        store:gridStore,
        selModel:{
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns:[
            {text: '年份', align: 'center', width: 100, dataIndex: 'V_YEAR'},
            {text: '月份', align: 'center', width: 150, dataIndex: 'V_MONTH'},
            {text: '计划厂矿', align: 'center', width: 100, dataIndex: 'ORGNAME'},
            {text: '作业区', align: 'center', width: 90, dataIndex: 'DEPTNAME'},
            {text: '专业', align: 'center', width: 60, dataIndex: 'ZYNAME'},
            {text: '设备类型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
            {text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'},
            {text: '主要缺陷', align: 'center', width: 200, dataIndex: 'QXCONTEXT'},
            {text: '施工方式', align: 'center', width: 100, dataIndex: 'SGTYPENAME'},
            {text: '检修内容', align: 'center', width: 100, dataIndex: 'REPAIRCONTENT'},
            {text: '检修单位', align: 'center', width: 100, dataIndex: 'REDEPTNAME'},
            {text: '计划停工时间', align: 'center', width: 100, dataIndex: 'PLANTJMONTH',renderer:timeTurn},
            {text: '计划竣工时间', align: 'center', width: 150, dataIndex: 'PLANJGMONTH',renderer:timeTurn},
            {text: '合计时间', align: 'center', width: 100, dataIndex: 'PLANHOUR'},
            {text: '备注', align: 'center', width: 280, dataIndex: 'REMARK'}
            // {text: '预计寿命', align: 'center', width: 100, dataIndex: ''},
            // {text: '维修人数', align: 'center', width: 100, dataIndex: ''},
            // {text: '施工是否落实', align: 'center', width: 150, dataIndex: ''},
            // {text: '工序', align: 'center', width: 100, dataIndex: ''},
        ]
        ,listeners:{
            itemclick:function(store,record){
               YEARGUID= record.get('ID_GUID');
            }
        }
    });
    var tjqxpanel = Ext.create("Ext.toolbar.Toolbar", {
        id:'tjqxpanel',
        frame: true,
        border:false,
        width: '100%',
        bodyCls:'border_wid',
        items: [{
            xtype: 'button',
            text: '确认返回',
            // bodyStyle: 'float:center;',
            // iconCls: 'buy-button',
            icon:dxImgPath+'/back.png',
            listeners: {click: SaveQx}
        },
            {
                xtype: 'button',
                text: '关闭',
                // bodyStyle: 'float:center;',
                // iconCls: 'buy-button',
                icon:dxImgPath+'/close.png',
                listeners: {click: winQxClose}
            }]
    });

    var tjqxgrid = Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'qxAdd',
        store: qxAddStore,
        split: true,
        width: '100%',
        margin: '0px',
        columnLines: true,
        border: true,
        selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text:'设备code',width:140,dataIndex:'V_EQUCODE',hidden:true},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},

            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center'},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center'},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center'}
        ],
        tbar:[tjqxpanel]
    });
    var btnAdd_tjqx = Ext.create('Ext.window.Window', {
        id: 'btnAdd_tjqx',
        width: 850,
        height: 400,
        title: '缺陷选择',
        modal: true,
        frame: true,
        closeAction: 'hide',
        closable: true,
        layout: 'border',
        items: [tjqxgrid]
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[npanel,cpanel]
    });
    selFinishYear();
});

function selFinishYear(){
    Ext.data.StoreManager.lookup("gridStore").load({
        params:{
            V_V_YEAR:Ext.getCmp("year").getValue()
        }
    });
}
function timeTurn(value,metaData,recode,store){
    metaData.style="text-align:center";
    var val=value.toString().substring(0,10);
    return '<div>'+val+'</div>';
}
function saveMonth(){
    var record=Ext.getCmp("cpanel").getSelectionModel().getSelection();
    if(record.length<=0){
        alert('请选择一条年计划');
        return false;
    }
    // Ext.getCmp("monthDate").show();
    //创建月计划
    var planCk=record[0].get("ORGCODE");

    if(record[0].get("QXCONTEXT")==""){
        Ext.data.StoreManager.lookup('qxAddStore').load({
            params: {
                V_V_DEPTCODE: record[0].get('DEPTCODE'),
                V_V_EQUCODE: record[0].get('EQUCODE'),
                V_V_STATECODE: '10'
            }
        });
        //
        Ext.Ajax.request({
            url:AppUrl+'dxfile/PM_03_PLAN_MONTH_CREATE',
            method: 'POST',
            async:false,
            params:{
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_ORGCODE:planCk
            },
            success: function (ret) {
                var resp = Ext.decode(ret.responseText);
                if (resp.RET !=undefined) {
                    monthGuid=resp.RET;
                    Ext.getCmp("btnAdd_tjqx").show();
                }
            }
        });

    }else{
        var owidth = window.screen.availWidth-300;
        var oheight =  window.screen.availHeight - 500;
        var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
            +'&MainYEAR='+MainYEAR+'&monthGuid='+'0', '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
    }

}
function confirmBtn(){
    var record=Ext.getCmp("cpanel").getSelectionModel().getSelection();
    if(record.length<=0){
        alert('请选择一条年计划');
        return false;
    }
}
function query(){
    window.opener.query();
    window.close();
}

//关闭缺陷win
function winQxClose() {
    Ext.getCmp('btnAdd_tjqx').hide();
}
//保存缺陷月计划关联
function SaveQx(){
    var snum=0;
    var qxDdefect = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    for(var i=0;i<qxDdefect.length;i++){
      Ext.Ajax.request({
          url:AppUrl+'dxfile/YEAR_TO_MONTH_IN',
          method:'POST',
          async:false,
          params:{
              V_YEARGUID:YEARGUID,
              V_MONTHGUID:monthGuid,
              V_DEFECTGUID:qxDdefect[i].data.V_GUID,
              V_PERCODE:Ext.util.Cookies.get('v_personcode')
          },
          success:function(response){
              var resp = Ext.decode(response.responseText);
              if (resp.RET =="SUCCESS") {
                  snum++;
              }
          }
      });
    }
    if(snum==qxDdefect.length){
        var owidth = window.screen.availWidth-300;
        var oheight =  window.screen.availHeight - 500;
        var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
            +'&MainYEAR='+MainYEAR+'&monthGuid='+monthGuid, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
    }

}