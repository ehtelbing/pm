
var v_guid="";
if(location.href.split('?')[1]!=undefined){
    v_guid=Ext.urlDecode(location.href.split('?')[1]).guid;
}

Ext.onReady(function() {
    //物料store
    var wlAllStore = Ext.create("Ext.data.Store", {
        storeId: 'wlAllStore',
        fields: ['V_GGXH', 'V_JLDW','V_JXGX_CODE','V_JXGX_NAME','V_KFNAME','V_PRICE','V_USE_NUM','V_WLCODE','V_WLSM'],
        autoLoad: false,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_PROJECT_MXUSE_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //-机具store
    var jjAllStore = Ext.create("Ext.data.Store", {
        storeId: 'jjAllStore',
        fields: ['V_JJ_CODE', 'V_JJ_DE','V_JJ_NAME','V_JJ_TS','V_JJ_TYPE','V_JXGX_CODE','V_JXGX_NAME'],
        autoLoad: false,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_PROJECT_MXUSE_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    // 工具store
    var gjAllStore = Ext.create("Ext.data.Store", {
        storeId: 'gjAllStore',
        fields: ['V_GJ_CODE', 'V_GJ_NAME','V_GJ_TYPE','V_JXGX_CODE','V_JXGX_NAME'],
        autoLoad: false,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_PROJECT_MXUSE_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gzAllStore = Ext.create("Ext.data.Store", {
        storeId: 'gzAllStore',
        fields: ['V_DE', 'V_JXGX_CODE','V_JXGX_NAME','V_PERCODE','V_PERCODE_DE','V_PERNAME_DE','V_PERNUM','V_PERTYPE_DE','V_TS','V_PERNAME'],
        autoLoad: false,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_PROJECT_MXUSE_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    // 缺陷
    var defectStore = Ext.create('Ext.data.Store', {
        id: 'defectStore',
        pageSize: 20,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_YEAR_PROJECT_DEFECT_SEL',
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
// 工单
    var workStore = Ext.create('Ext.data.Store', {
        id : 'workStore',
        pageSize : 50,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM','PLANTIME','FACTTIME'],

        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'dxfile/PRO_YEAR_PROJECT_WORKORDER_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total: 'total'
            }
        }
    });
    var westpanel=Ext.create('Ext.panel.Panel',{
        id:'westpanel',
        region:'west',
        layout:'vbox',
        margin:'50px 10px 0px 10px',
        padding:'20 10 195 10',
        defaults:{
            padding:'20px',
            style:' margin:5 5 0 20',
            xtype:'button',
            width:'60',
            height:'240'
        },
        items:[{
            id:'workbtn',
            text:'工单明细'
             ,handler:onWorkBtnClick
        },{
            id:'defectbtn',
            text:'缺陷明细',
            handler:onDefectBtnClick
        },{
            id:'wlbtn',
            text:'物料明细'
            ,handler:onWlBtnClick
        },{
            id:'jjbtn',
            text:'机具明细'
            ,handler:onJjBtnClick
        },{
            id:'gjbtn',
            text:'工具明细'
            ,handler:onGjBtnClick
        },{
            id:'perbtn',
            text:'人员明细'
            ,handler:onPerBtnClick
        }]
    });

    // 显示页面

    //物料
    var wlmxgird = Ext.create('Ext.grid.Panel', {
         region: "center",
        id:'wlmxgird',
        autoScroll: true,
        store:wlAllStore,
        split: true,
        margin:'0px',
        columnLines: true,
        border: true,
        tbar:[
            {xtype:'label',text:'物料数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
              {xtype:'label',id:'wlnum',height:20,width:90,margin:'10 0 0 20'}
            ],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '物料编码',width: 140, dataIndex: 'V_WLCODE', align: 'center',renderer:atleft},
            {text: '物料描述',width: 300, dataIndex: 'V_WLSM', align: 'center',renderer:atleft},
            {text: '规格型号',width: 140, dataIndex: 'V_GGXH', align: 'center',renderer:atleft},
            {text: '计划单价',width: 100, dataIndex: 'V_PRICE', align: 'center',renderer:atright},
            {text: '使用数量',width: 80, dataIndex: 'V_USE_NUM', align: 'center',renderer:atright}
        ]
    });



//机具
    var jjmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'jjmxgird',
        store:jjAllStore,
        split: true,
        width:'100%',
        autoScroll: true,
        margin:'0px',
        columnLines: true,
        border: true,
        tbar:[{xtype:'label',text:'机具数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'jjnum',height:20,width:90,margin:'10 0 0 20'}],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '机具名称',width: 140, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
            {text: '机具类型',width: 140, dataIndex: 'V_JJ_TYPE', align: 'center',renderer:atleft},
            {text: '使用台时',width: 140, dataIndex: 'V_JJ_TS', align: 'center',renderer:atleft},
            {text: '定额',width: 100, dataIndex: 'V_JJ_DE', align: 'center',renderer:atright}
        ]
    });
// 工具
    var gjmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'gjmxgird',
        store:gjAllStore,
        split: true,
        width:'100%',
        autoScroll: true,
        margin:'0px',
        columnLines: true,
        border: true,
        tbar:[{xtype:'label',text:'工具数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'gjnum',text:'',height:20,width:90,margin:'10 0 0 20'}],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工具名称',width: 140, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
            {text: '工具类型',width: 140, dataIndex: 'V_GJ_TYPE', align: 'center',renderer:atleft}
        ]
    });
    // 人员
    var gzmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'gzmxgird',
        store:gzAllStore,
        split: true,
        width:'100%',
        margin:'0px',
        columnLines: true,
        autoScroll: true,
        border: true,
        tbar:[{xtype:'label',text:'台时数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'pernum',text:'',height:20,width:90,margin:'10 0 0 20'}],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '人员编码',width: 100, dataIndex: 'V_PERCODE', align: 'center',renderer:atleft},
            {text: '人员姓名',width: 100, dataIndex: 'V_PERNAME', align: 'center',renderer:atleft},
            {text: '工种名称',width: 100, dataIndex: 'V_PERNAME_DE', align: 'center',renderer:atleft},
            {text: '工种类型',width: 100, dataIndex: 'V_PERTYPE_DE', align: 'center',renderer:atleft},
            {text: '定额',width: 100, dataIndex: 'V_DE', align: 'center',renderer:atright},
            {text: '台时',width: 100, dataIndex: 'V_TS', align: 'center',renderer:atleft}
        ]
    });

    var defectgrid = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'defectgrid',
        columnLines: true,
        width: '100%',
        store: defectStore,
        autoScroll: true,
        height: 400,
        tbar:[{xtype:'label',text:'缺陷数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'defectnum',text:'',height:20,width:90,margin:'10 0 0 20'}],
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {
            text: '缺陷日期',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 200,
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷明细',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 300,
            renderer: CreateGridColumnTd
        }, {
            text: '设备',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 170,
            renderer: CreateGridColumnTd
        }, {
            text: '设备位置',
            dataIndex: 'V_EQUSITE',
            align: 'center',
            width: 250,
            renderer: CreateGridColumnTd
        }, {
            text: '单位',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '负责人',
            dataIndex: 'V_PERNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '处理意见',
            dataIndex: 'V_IDEA',
            align: 'center',
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷来源',
            dataIndex: 'V_SOURCENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }]
    });
    var workgrid = Ext.create('Ext.grid.Panel', {
        xtype : 'gridpanel',
        id : 'workgrid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : workStore,
        autoScroll : true,
        tbar:[{xtype:'label',text:'工单数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'worknum',text:'',height:20,width:90,margin:'10 0 0 20'}],
        columns : [ {
            xtype : 'rownumberer',
            width : 30,
            sortable : false
        },  {
            text : '工单号',
            dataIndex : 'V_ORDERID',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '流程明细',
            dataIndex : 'V_ORDERGUID',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : rendererFlow
        },  {
            text : '子工单数量',
            dataIndex : 'WORKORDERNUM',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : rendererZGD
        }, {
            text : '工单描述',
            dataIndex : 'V_SHORT_TXT',
            width : 300,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        },  {
            text : '设备名称',
            dataIndex : 'V_EQUIP_NAME',
            width : 130,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITENAME',
            width : 220,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '备件消耗',
            dataIndex : 'V_SPARE',
            width : 300,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '委托单位',
            dataIndex : 'V_DEPTNAME',
            width : 150,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '委托人',
            dataIndex : 'V_PERSONNAME',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '委托时间',
            dataIndex : 'D_ENTER_DATE',
            width : 140,
            align : 'center',
            renderer : left,
            renderer : rendererTime
        }, {
            text : '检修单位',
            dataIndex : 'V_DEPTNAMEREPARIR',
            width : 150,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '工单类型描述',
            dataIndex : 'V_ORDER_TYP_TXT',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '工单状态',
            dataIndex : 'V_STATENAME',
            width : 65,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        } ,{
            text : '计划工时',
            dataIndex : 'PLANTIME',
            width : 100,
            align : 'center',
            renderer : left
        },{
            text : '实际工时',
            dataIndex : 'FACTTIME',
            width : 100,
            align : 'center',
            renderer : left
        }]
        // listeners : {
        //     itemdblclick : itemClick
        // },

    });
    var centpanel=Ext.create('Ext.panel.Panel',{
        id:'centpanel',
        region:'center',
        layout:'border',
        frame:true,
        border:false,
        // items:[ wlmxgird ]
        items:[ ]
    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ westpanel,centpanel]
    });
    Ext.data.StoreManager.lookup('wlAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'WL'
        }
    });
    Ext.data.StoreManager.lookup('wlAllStore').on('load',function(){
        Ext.getCmp('wlnum').setText(Ext.data.StoreManager.lookup('wlAllStore').getProxy().getReader().rawData.V_NUM);
    });
    Ext.data.StoreManager.lookup('jjAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'JJ'
        }

    });
    Ext.data.StoreManager.lookup('jjAllStore').on('load',function(){
        Ext.getCmp('jjnum').setText(Ext.data.StoreManager.lookup('jjAllStore').getProxy().getReader().rawData.V_NUM);
    });
    Ext.data.StoreManager.lookup('gjAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'GJ'
        }
    });
    Ext.data.StoreManager.lookup('gjAllStore').on('load',function(){
        Ext.getCmp('gjnum').setText(Ext.data.StoreManager.lookup('gjAllStore').getProxy().getReader().rawData.V_NUM);
    });
    Ext.data.StoreManager.lookup('gzAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'GZ'
        }
    });
    Ext.data.StoreManager.lookup('gzAllStore').on('load',function(){
        Ext.getCmp('pernum').setText(Ext.data.StoreManager.lookup('gzAllStore').getProxy().getReader().rawData.V_NUM);
    });
    Ext.data.StoreManager.lookup("defectStore").load({
        params:{
            V_V_PROJECTGUID:v_guid
        }
    });
    Ext.data.StoreManager.lookup("defectStore").on('load',function(){
        Ext.getCmp('defectnum').setText(Ext.data.StoreManager.lookup('defectStore').getProxy().getReader().rawData.V_NUM);
    });
    Ext.data.StoreManager.lookup("workStore").load({
        params:{
            V_V_PROJECTGUID:v_guid
        }
    });
    Ext.data.StoreManager.lookup("workStore").on('load',function(){
        Ext.getCmp('worknum').setText(Ext.data.StoreManager.lookup('workStore').getProxy().getReader().rawData.V_NUM);
        onWorkBtnClick();
    });

});
// 工单
function onWorkBtnClick(){
   //Ext.getCmp('centpanel').removeAll();
   Ext.getCmp('centpanel').add(Ext.getCmp('workgrid'));
   Ext.getCmp('centpanel').doLayout();
}
// 缺陷
function onDefectBtnClick(){
    //Ext.getCmp('centpanel').removeAll();
    Ext.getCmp('centpanel').add(Ext.getCmp('defectgrid'));
    Ext.getCmp('centpanel').doLayout();
}
// 物料
function onWlBtnClick(){
    //Ext.getCmp('centpanel').removeAll();
    Ext.getCmp('centpanel').add(Ext.getCmp('wlmxgird'));
    Ext.getCmp('centpanel').doLayout();
}
// 机具
function onJjBtnClick(){
    //Ext.getCmp('centpanel').removeAll();
    Ext.getCmp('centpanel').add(Ext.getCmp('jjmxgird'));
    Ext.getCmp('centpanel').doLayout();
}
// 工具
function onGjBtnClick(){
    //Ext.getCmp('centpanel').removeAll();
    Ext.getCmp('centpanel').add(Ext.getCmp('gjmxgird'));
    Ext.getCmp('centpanel').doLayout();
}
// 人员
function onPerBtnClick(){
    //Ext.getCmp('centpanel').removeAll();
    Ext.getCmp('centpanel').add(Ext.getCmp('gzmxgird'));
    Ext.getCmp('centpanel').doLayout();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

// function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
//     metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
//     if(value == null){
//         return '<div data-qtip="' + value + '" ></div>';
//     }
//     else{
//         return '<div data-qtip="' + value + '" >' + value + '</div>';
//     }
//
// }

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    var val=value==null?'':value;
    return '<div data-qtip="' + val + '" >' + val + '</div>';
}
function rendererFlow(a, value, metaData){
    return '<a href="javascript:goToFlow(\'' + metaData.data.V_ORDERGUID + '\')">查看</a>';
}

function goToFlow(V_ORDERGUID){
    var InstanceId='';
    Ext.Ajax.request({
        url : AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        async : false,
        method : 'POST',
        params : {
            businessKey : V_ORDERGUID
        },
        success : function(ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);
            InstanceId=respRoot.InstanceId;
        }
    });
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='+ InstanceId , '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}
function rendererZGD(a, value, metaData){
    return '<a href="javascript:goToZGD(\'' + metaData.data.V_ORDERGUID + '\')">' + a + '</a>';
}


function goToZGD(V_ORDERGUID){
    window.open(AppUrl + "page/No4117/Index.html?V_ORDERGUID="
        + V_ORDERGUID,
        "", "dialogHeight:700px;dialogWidth:1100px");
}
function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}