/*月计划添加页面-类周添加*/
var YEARGUID="";
var date=new Date();
var years=[];
var MainMONTH="";
var MainYEAR="";
var monthGuid="";
var retEquDif="";
var YCK="";
if(location.href.split("?")[1]!=undefined){
    MainMONTH=Ext.urlDecode(location.href.split('?')[1]).MainMONTH;
    MainYEAR=Ext.urlDecode(location.href.split('?')[1]).MainYEAR;
}
for(var i=date.getFullYear();i<date.getFullYear()+2;i++){
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
    //年计划关联缺陷查找
    var ygridStore = Ext.create('Ext.data.Store', {
        id: 'ygridStore',
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
        pageSize: 30,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE','WBSCODE','WBSNAME'],

        proxy: {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'hp/PRO_PM_07_DEFECT_VIEW_NEW',
            url: AppUrl + 'hp/PRO_PM_07_DEFECT_VIEW_NEW_N',
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
    //年计划缺陷查找
    var wxqxGridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxqxGridStore',
        fields: ['YEAR_GUID', 'DEFECT_GUID', 'V_EQUCODE', 'V_EQUNAME', 'V_SOURCENAME', 'V_DEFECTLIST', 'D_DEFECTDATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //年计划查找
    var ygridStore = Ext.create('Ext.data.Store', {
        id: 'ygridStore',
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
    //月计划已选缺陷\
    var hChoGridStore=Ext.create('Ext.data.Store', {
        id: 'hChoGridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE', 'V_SOURCEID', 'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE',
            'V_PERNAME', 'V_DEPTCODE', 'V_EQUCODE', 'V_IDEA', 'V_STATECODE', 'V_GUID', 'V_EQUSITE', 'D_DATE_EDITTIME',
            'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE', 'V_INPERCODE', 'V_INPERNAME', 'V_EQUTYPECODE', 'V_ORGCODE',
            'V_HOUR', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_FLAG',
            'V_PROC_WAY', 'UP_GUID', 'V_SYSTEM', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTNAME', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME',
            'V_STATENAME', 'V_STATECOLOR'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/YEAR_TO_MONTH_LIST',
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
    //缺陷类型
    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sqxzt',
        fields: ['I_ID',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCETABLE',
            'V_SOURCEREMARK',
            'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('qxzt').select('defct01');
                otherdefsel();
            }
        }
    });
    //月计划已选缺陷
    var hChoGrid= Ext.create('Ext.grid.Panel', {
        id : 'hChoGrid',
        store : hChoGridStore,
        region:'center',
        border: true,
        split: true,
        columnLines: true,
        autoScroll:true,
        // selType: 'checkboxmodel',
        columns : [
            {text : '序号',xtype : 'rownumberer',width : 50,sortable : false}
            ,{text : '删除',dataIndex : 'V_GUID',align : 'left',width : 100, renderer : delCorDef},
             // {text : '单位',dataIndex : 'V_DEPTNAME',align : 'left',width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷状态', dataIndex : 'V_STATENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '缺陷类型', dataIndex : 'V_SOURCENAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '设备', dataIndex : 'V_EQUNAME', align : 'left', width : 200, renderer : CreateGridColumnTd},
            {text : '缺陷日期', dataIndex : 'D_DEFECTDATE', align : 'right', width : 200, renderer : CreateGridColumnTime},
            {text : '缺陷明细', dataIndex : 'V_DEFECTLIST', align : 'left', width : 700, renderer : CreateGridColumnTd},
            {text : '设备位置', dataIndex : 'V_EQUSITE', align : 'left', width : 300, renderer : CreateGridColumnTd},
            {text : '负责人', dataIndex : 'V_PERNAME', align : 'left', width : 100, renderer : CreateGridColumnTd},
            {text : '处理意见', dataIndex : 'V_IDEA', align : 'left', renderer : CreateGridColumnTd}]
        ,tbar:[
            {
                xtype:'button',
                text:'确定选择',
                handler:turnPage
            }
        ]

    });
    //已选择模块
    var haveChoDef=Ext.create('Ext.panel.Panel',{
        id:'haveChoDef',
        layout:'border',
        region:'center',
        split: true,
        width:'45%',
        frame:true,
        border:false,
        title:'已选择缺陷',
        items:[hChoGrid]
    });
    var wxqxpanel=Ext.create("Ext.toolbar.Toolbar", {
        id:'wxqxpanel',
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
            listeners: {click: SaveWxQx}
        }
           /* , {
                xtype: 'button',
                text: '关闭',
                // bodyStyle: 'float:center;',
                // iconCls: 'buy-button',
                icon:dxImgPath+'/close.png',
                listeners: {click: winQxClose}
            }*/
           ]
    });
    //年获维修计划关联缺陷guid
    var ydefGPanel= Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'qxAdd',
        store: wxqxGridStore,
        split: true,
        width: '100%',
        margin: '0px',
        columnLines: true,
        border: true,
        selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'right'},
            {text:'设备code',width:140,dataIndex:'V_EQUCODE',hidden:true},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'left'},

            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'left'},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'left'},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'right'}
        ],
        tbar:[wxqxpanel]
    });
    //年或维修计划关联缺陷面板
    var yPanel=Ext.create('Ext.panel.Panel',{
        id:'yPanel',
        layout:'border',
        region:'east',
        width:'45%',
        split: true,
        frame:true,
        border:false,
        title:'计划关联的缺陷',
        // items:[mdGridPanel]
        items:[ydefGPanel]
    });
    var topPanel=Ext.create('Ext.panel.Panel',{
        id:'topPanel',
        layout:'border',
        region:'north',
        frame:true,
        split: true,
        height:'45%',
        border:false,
        // collapsible: true,
        items:[haveChoDef,yPanel]
    });
    //年计划审批完成计划查找
    var yGridPanel=Ext.create('Ext.grid.Panel',{
        id:'yGridPanel',
        columnLines:true,
        region: 'center',
        border: true,
        store:ygridStore,
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
                YCK=record.get("ORGNAME");
            }
        },
        tbar:[
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
    var otherGridPanel=Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'otherGridPanel',
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
        tbar:[ {id: 'qxzt', xtype: 'combo', store: sqxzt, editable: false, fieldLabel: '缺陷类型', labelWidth:70, width: 180,
            displayField: 'V_SOURCENAME', valueField: 'V_SOURCECODE', queryMode: 'local', baseCls: 'margin-bottom'},
            {xtype : 'button', id:'otherdefsel', text : '查询', handler :otherdefsel}// _selectOverhaulApply
            ,{xtype : 'button', id:'addotherdef', text : '缺陷添加', handler :SaveQx}],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'qxAddStore'
        }]
    });
    var tabPanel=Ext.create('Ext.tab.Panel',{
        id:'tabPanel',
        region:'center',
        activeTab:0,
        enableTabScroll:true,
        items:[
            {
                id:'monthid',
                title:'年计划审批完成查找',
                layout:'border',
                border:false,
                frame:true,
                autoScroll:true,
                // items:[mGridPanel,mdGridPanel],
                items:[yGridPanel],
                listeners: { activate: action1 }

            },{
                id:'otherdef',
                title:'其他缺陷',
                border:false,
                frame:true,
                autoScroll:true,
                items:[otherGridPanel],
                listeners: { activate: action2 }
            }

        ]
    });
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[topPanel,tabPanel]
    });
    selFinishYear();
    var orgcode=Ext.util.Cookies.get("v_orgCode");
    newCreatMonth(orgcode);
    //清除原有未保存缺陷
    ClearOldDel();
    //查找已关联缺陷
    haveChocieS();

});
function timeTurn(value,metaData,recode,store){
    metaData.style="text-align:center";
    var val=value.toString().substring(0,10);
    return '<div>'+val+'</div>';
}
function rendererTime(value, metaData){
    metaData.style="text-align:right";
    return value.split(".")[0];
}
function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style="text-align:right";
    var time=value.split('.')[0];
    return time;
}
function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}
//月计划查询
function selFinishYear(){
    Ext.data.StoreManager.lookup("ygridStore").load({
        params:{
            V_V_YEAR:Ext.getCmp("year").getValue()
        }
    });
}
//月计划guid 创建
function newCreatMonth(org){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_03_PLAN_MONTH_CREATE',
        method: 'POST',
        async:false,
        params:{
            V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_ORGCODE:org
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.RET !=undefined) {
                monthGuid=resp.RET;
            }
        }
    });
}
//清除原有未保存缺陷
function ClearOldDel(){
    //修改年计划添加未关联关联缺陷状态
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/YEAR_TO_MONTH_DEL',
        method: 'POST',
        async: false,
        params: {
            V_YEARGUID:'',
            V_MONTHGUID: monthGuid,
            V_DEFECTGUID:'',
            V_PER_CODE:Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);//后台返回的值
            if (resp.RET == 'SUCCESS') {

            }
        }
    });

    //月计划缺陷状态关联删除
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PRO_PM_DEL_MONTH_RE_DEF',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:monthGuid
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);//后台返回的值
            if (resp.RET == 'SUCCESS') {

            }
        }
    });
}

//年计划选择
function saveMonth(){
    var record=Ext.getCmp("yGridPanel").getSelectionModel().getSelection();
    if(record.length<=0){
        alert('请选择一条年计划');
        return false;
    }
    //创建月计划
    var planCk=record[0].get("ORGCODE");
    newCreatMonth(planCk);
    //
    // if(record[0].get("QXCONTEXT")==""){  //年计划中无缺陷判断
        Ext.data.StoreManager.lookup('qxAddStore').load({
            params: {
                V_V_DEPTCODE: record[0].get('DEPTCODE'),
                V_V_EQUCODE: record[0].get('EQUCODE'),
                V_V_STATECODE: '10'
            }
        });
        //年计划中缺陷数据面板加载
        Ext.getCmp('ydefGPanel').reconfigure(Ext.data.StoreManager.lookup('wxqxGridStore'));
        var  chgrid=Ext.getCmp('ydefGPanel');
        chgrid.store.reload();
        Ext.getCmp('ydefGPanel').getView().refresh();
        // Ext.getCmp("btnAdd_tjqx").show();
    // }else{
        // wxqxLoad(YEARGUID);
        //维修计划关联
        // Ext.getCmp('tjqxgrid').reconfigure(Ext.data.StoreManager.lookup('wxqxGridStore'));
        // var  chgrid=Ext.getCmp('tjqxgrid');
        // chgrid.store.reload();
        // Ext.getCmp('tjqxgrid').getView().refresh();

        // Ext.getCmp("qx_win").show();
        // var owidth = window.screen.availWidth-300;
        // var oheight =  window.screen.availHeight - 500;
        // var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
        //     +'&MainYEAR='+MainYEAR+'&monthGuid='+'0', '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
    // }

}
//维修计划查询
function selFinishWX(){

}
//维修计划无缺陷时缺陷加载
function wxqxLoad(YEARGUID){
    Ext.data.StoreManager.lookup('wxqxGridStore').load({
        params: {
            V_WX_GUID: YEARGUID
        }
    });
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
//保存其他缺陷月计划关联
function SaveQx(){
    var org=YCK==""?Ext.util.Cookies.get("v_orgCode"):YCK;
    var defitem=Ext.getCmp("otherGridPanel").getSelectionModel().getSelection();
    if(defitem.length<=0){
        alert("请选择至少一条缺陷"); return false;
    }
    var equdef=defitem[0].data.V_EQUCODE;
    for(var i=0;i<defitem.length;i++){
        if(defitem[i].data.V_EQUCODE!=equdef){
            alert("请选择设备相同的缺陷"); return false;
        }
    }

    choequ(equdef); //判断缺陷
    if(retEquDif==1){
        return false;
    }

   if(YEARGUID==""){
       Ext.Msg.show({
           title: '提示',
           msg: '并未关联年计划，是否关联?',
           buttons: Ext.Msg.OKCANCEL,
           icon: Ext.Msg.OKCANCEL,
           fn: function (button) {
               if (button == "ok") {
                   return false;
               }
               else{

                   if (monthGuid != "") {
                       //其他缺陷关联
                       SaveOtherQx();
                   }
               }

           }
       });
   }
   else{
       //年计划关联缺陷添加
       SaveWxQx();
   }
   /* var snum=0;
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
        haveChocieS();
        /!*var owidth = window.screen.availWidth-300;
        var oheight =  window.screen.availHeight - 500;
        var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
            +'&MainYEAR='+MainYEAR+'&monthGuid='+monthGuid+'&wxqx='+'0', ''
            , 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');*!/
    }*/

}
//保存选中缺陷加入月计划关联
function SaveWxQx(){
    var snum=0;
    var qxDdefect = Ext.getCmp('ydefGPanel').getSelectionModel().getSelection();
    for(var i=0;i<qxDdefect.length;i++){
        Ext.Ajax.request({
            url:AppUrl+'dxfile/YEAR_TO_MONTH_IN',
            method:'POST',
            async:false,
            params:{
                V_YEARGUID:YEARGUID,
                V_MONTHGUID:monthGuid,
                V_DEFECTGUID:qxDdefect[i].data.DEFECT_GUID,
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
        haveChocieS();
        /*var owidth = window.screen.availWidth-300;
        var oheight =  window.screen.availHeight - 500;
        var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
            +'&MainYEAR='+MainYEAR+'&monthGuid='+monthGuid+'&wxqx='+'1', '',
            'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');*/
    }
}
function SaveOtherQx(){
    var othnum=0;
    var defitem=Ext.getCmp("otherGridPanel").getSelectionModel().getSelection();
    if(YEARGUID!=""){
        for(var i=0;i<defitem.length;i++){
            Ext.Ajax.request({
                url:AppUrl+'dxfile/YEAR_TO_MONTH_IN',
                method:'POST',
                async:false,
                params:{
                    V_YEARGUID:YEARGUID,
                    V_MONTHGUID:monthGuid,
                    V_DEFECTGUID:defitem[i].data.V_GUID,
                    V_PERCODE:Ext.util.Cookies.get('v_personcode')
                },
                success:function(response){
                    var resp = Ext.decode(response.responseText);
                    if (resp.RET =="SUCCESS") {
                        othnum++;
                    }
                }
            });
        }
        if(othnum==defitem.length){
            haveChocieS();
        }
    }
    else{
        for (var i = 0; i < defitem.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET',
                method: 'POST',
                async: false,
                params: {
                    V_V_DEFECT_GUID: defitem[i].data.V_GUID,
                    V_V_WEEK_GUID: monthGuid
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.V_INFO == 'success') {
                        othnum++;
                        // haveChocieS();
                    }

                }
            });
        }
        if(othnum==defitem.length){
            haveChocieS();
        }

    }
}
//月计划已选缺陷查找
function haveChocieS(){
    Ext.data.StoreManager.lookup("hChoGridStore").load({
        params:{
            V_MONTHGUID:monthGuid,
            V_PERCODE:Ext.util.Cookies.get('v_personcode')
        }
    })
}
//已选择月计划缺陷删除
function delCorDef(value, metaDate, record, rowIndex, colIndex, store) {

    var id = 'ddef' + value;
    Ext.defer(function () {
        Ext.widget('button', {
            icon: dxImgPath + '/accept.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 110,
            text: '删除',
            margin: 'padding:10px 50px 10px 10px;',
            handler: function () {
                // onJjfa(record.data.V_GUID, record.data.V_EQUCODE);
                delCorDefect(value);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
}
//已选中关联周计划缺陷删除
function delCorDefect(defGuid){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/YEAR_TO_MONTH_SDEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_MONTH_GUID:monthGuid,
            V_DEF_GUID: defGuid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET =='SUCCESS') {
                haveChocieS();
                // haveChLoad(WEEKGUID);
                // turnPage();
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

}
function otherdefsel(){
    var gridStore = Ext.data.StoreManager.lookup('qxAddStore');
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function turnPage(){
    var owidth = window.screen.availWidth-300;
        var oheight =  window.screen.availHeight - 500;
        var ret = window.open(AppUrl + 'page/PM_03010209/index.html?yearGuid='+YEARGUID+'&MainMONTH='+MainMONTH
            +'&MainYEAR='+MainYEAR+'&monthGuid='+monthGuid+'&wxqx='+'1', '',
            'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');
}
function action1(tab) {
    tab.on('activate', function (tab) {

    });
}
function action2(tab){
    tab.on('activate',function(tab){

    });
}
//查找月计划已关联数量
function choequ(equcode){
    retEquDif=0;
    var haveDefS=Ext.data.StoreManager.lookup('hChoGridStore').data.items;
    if(haveDefS.length>0){
        if(Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUCODE!=equcode){
            alert("当前设备与已选择设备不一致，请从新选择！");
            retEquDif=1;
            return false;
        }
    }
}

/**
 *月计划缺陷直接添加写入 PM_DEFECTTOWORKORDER 表格
 * 月计划关联年计划写入表格 YEAR_TO_MONTH
 */