
var v_guid="";
var indate="";
var endate="";


var cmItems = [];
var ganttdata = [];

var vStart = '';
var vEnd = '';

var stime='';
var etime='';
if(location.href.split('?')[1]!=undefined){
    v_guid=Ext.urlDecode(location.href.split('?')[1]).guid;
    indate=Ext.urlDecode(location.href.split('?')[1]).indate;
    endate=Ext.urlDecode(location.href.split('?')[1]).endate;
}

Ext.onReady(function() {
    //物料store
    var wlAllStore = Ext.create("Ext.data.Store", {
        storeId: 'wlAllStore',
        fields: ['V_ORDERGUID', 'V_ACTIVITY','V_MATERIALCODE','V_MATERIALNAME','I_PLANAMOUNT','F_PLANMONEY','I_OUTNUMBER','F_ACTUALMONEY','V_MEMO'],
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
        fields: ['V_ORDERGUID', 'V_JJ_NAME','V_JJ_TYPE','V_JJ_TS','V_JJ_DE'],
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
        fields: ['V_ORDERGUID', 'V_GJ_CODE','V_GJ_NAME','V_GJ_TYPE'],
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
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE','V_TS','V_DE','V_PERTYPE_DE','V_PERCODE','V_PERNAME'],
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
    // 施工方
    var redeptStore = Ext.create('Ext.data.Store', {
        id: 'redeptStore',
        pageSize: 20,
        autoLoad: false,
        fields: ['DEPARTCODE', 'DEPARTNAME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_03_PLAN_REPAIR_DEPT_SEL2',
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
   var whStore=Ext.create('Ext.data.Store',{
      id:'whStore',
      autoLoad:false,
      fields:['V_ORDERGUID','billcode','vch_sparepart_code','vch_sparepart_name','vch_type','vch_type','price','f_number','BillType'],
       proxy:{
          type:'ajax',
           async:false,
           url:AppUrl+'dxfile/PRO_YEAR_PROJECT_SEL_WH',
           actionMethods:{
              read:'POST'
           },
           reader:{
              type:'json'
              // root:'ret'
           }
       }
   });
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
            url : AppUrl + 'dxfile/PRO_YEAR_PROJECT_SEL_WORK',
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

    var nothpanel=Ext.create('Ext.panel.Panel',{
        id:'nothpanel',
        region:'north',
        layout:'vbox',
        padding:'2 630 2 680',
        items:[{
            xtype:'button',
            id:'creatWork',
            text:'生成工单',
            handler:OnButtonWorkorder,
            // style:'background-color:#dfe8f6',
            // padding:'2px 630px 2px 630px',
            // margin:'2px 630px 2px 630px',
            style:'background-color:#dfe8f6;border-color:#dfe8f6',
            width:60
        }]
    });
    var westpanel=Ext.create('Ext.panel.Panel',{
        id:'westpanel',
        region:'west',
        layout:'vbox',
        margin:'50px 10px 0px 10px',
        padding:'20 10 293 10',
        defaults:{
            padding:'20px',
            style:' margin:5 5 0 20',
            xtype:'button',
            width:'60',
            height:'240'
        },
        items:[{
            id:'sgtbtn',
            text:'工程施工图'
            ,handler:onSgtBtnClick
        },{
            id:'workbtn',
            text:'工 单 明 细'
            ,handler:onWorkBtnClick
        },{
            id:'whbtn',
            text:'物 耗 明 细',
            handler:onWhBtnClick
        },{
            id:'defectbtn',
            text:'物 资 计 划'
            ,width:'60',
            handler:onWzjhBtnClick
        },{
            id:'qxjbtn',
            text:'缺陷集明细'
            ,width:'60'
            ,handler:onQxjBtnClick
        },{
            id:'sgfbtn',
            text:'施工方明细'
            ,width:'60'
            ,handler:onSgfBtnClick
        },{
            id:'gjbtn',
            text:'结 算 明 细'
            ,width:'60'
            ,handler:onHtBtnClick
        }
        ]
    });

    // 显示页面



    var centpanel=Ext.create('Ext.panel.Panel',{
        id:'centpanel',
        region:'center',
        layout:'border',
        frame:true,
        border:false,
        items:[ ]
    });

    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ nothpanel,westpanel,centpanel]
    });

    onSgfBtnClick();
    onQxjBtnClick();
    onWzjhBtnClick();
     pageFunction.QueryGanttData();
});

var pageFunction = {
// 施工图
    CreateGantt:function () {
        cmItems = [];
        vStart = new Date(indate);
        vEnd = new Date(endate);

        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate <= vEnd) {

            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) vzm = 'color:#CCCCCC';

            if (vTmpMonth == vmonth) {

                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) vyear -= 1;
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            }
            vTmpDate = new Date((vTmpDate / 1000 + 86400) * 1000);
        }
        if (vTmpMonth == vmonth) {
            cmItems.push({
                text: vTmpDate.getFullYear().toString() + '年' + (vmonth + 1).toString() + '月',
                columns: dateItems
            });
        }

        cmItems.push({
            text: '',
            width: 0,
            dataIndex: 'MYCOLOR',
            renderer: pageFunction.IndexShow
        });


        var ganttStore = Ext.create("Ext.data.Store", {
            storeId: 'ganttStore',
            fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
                'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
                'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
                'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM','PLANTIME','FACTTIME','D_FACT_START_DATE','D_FACT_FINISH_DATE'],
            data: ganttdata,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        var ganttgrid = Ext.create('Ext.grid.Panel', {
            id: 'ganttgrid',
            store: ganttStore,
            region: 'center',
            height: 400,
            columnLines: true,
            columns: cmItems
        });
        Ext.getCmp('centpanel').add(ganttgrid);
    },
    QueryGanttData:function (){

    ganttdata = [];
    // 施工图data
    Ext.Ajax.request({
        url : AppUrl + 'dxfile/PRO_YEAR_PROJECT_SEL_WORK',
        method:'POST',
        async:false,
        params:{
            DX_GUID:v_guid,
            STARTTIME:indate,
            ENDTIME:endate
        },
        success:function(resp){
            var resp=Ext.decode(resp.responseText);
            if(resp.list.length!=0) {
                ganttdata=resp.list;
                pageFunction.CreateGantt();
            }
        }
    });

},

    IndexShow:function (value, metaData, record) {
        if (record != undefined) {

            if (record.data.D_FACT_START_DATE!= null && record.data.D_FACT_FINISH_DATE!= null) {
                stime = record.data.D_FACT_START_DATE;
                etime = record.data.D_FACT_FINISH_DATE;

                var startd = new Date(stime.split(".0")[0].replace(/-/g, "/"));
                var endd = new Date(etime.split(".0")[0].replace(/-/g, "/"));
                vStart = Ext.Date.format(new Date(indate), 'Y/m/d h:i:s');
                vEnd = Ext.Date.format(new Date(endate), 'Y/m/d h:i:s');
                // if (startd < vStart) {
                //     startd = new Date(vStart);
                // }
                // if (startd > vEnd) {
                //     startd = new Date(vEnd);
                // }
                // if (endd < vStart) {
                //     endd = new Date(vStart);
                // }
                // if (endd > vEnd) {
                //     endd = new Date(vEnd);
                // }
                // if (endd < startd) {
                //     endd = new Date(startd);
                // }
                if (startd>=new Date(vStart) && endd<=new Date(vEnd)) {
                    var vleft = ((startd.getTime() - new Date(vStart).getTime()) / (86400 * 1000)) ;
                    var vwidth = ((endd.getTime() - startd.getTime()) / (86400 * 1000)) ;
                    var gtt = '<div style="left:' + (vleft * 40).toString() + 'px;height:23.5px;width:' + (vwidth * 40+40).toString() + 'px;background-color:A6FFA6;" class="sch-event"  ><div class="sch-event-inner" ><div data-qtip="' + record.data.V_ORDERID+ '" >' + record.data.V_ORDERID + '</div></div></div><div class="lxm"  id="' + record.data.V_ORDERID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">';

                    var cont = record.data.V_ORDERID;
                    var contt = '内容：';
                    for (var i = 0; i < cont.length; i++) {
                        if (i == 0) {
                            contt = contt + cont[i] + '<br>';
                        } else {
                            contt = contt + cont[i] + '<br>';
                        }
                    }
                    gtt = gtt + contt + '</div>';


                    return gtt;
                }
            }
        }

    }
}

function onSgtBtnClick(){
    Ext.getCmp('centpanel').removeAll();
    pageFunction.QueryGanttData();
}
// 工单查询
function onWorkBtnClick(){
    Ext.getCmp('centpanel').removeAll();
    var workgrid = Ext.create('Ext.grid.Panel', {
        xtype: 'gridpanel',
        id: 'workgrid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: Ext.getStore('workStore'),
        autoScroll: true,
        tbar: [{
            xtype: 'label',
            text: '工单数量',
            height: 20,
            width: 90,
            margin: '20 0 0 50',
            labelStyle: "text-align: right;"
        },
            {xtype: 'label', id: 'worknum', text: '', height: 20, width: 90, margin: '10 0 0 20'}],
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, {
            text: '工单号',
            dataIndex: 'V_ORDERID',
            width: 100,
            align: 'center',
            renderer: left
        }, {
            text: '流程明细',
            dataIndex: 'V_ORDERGUID',
            width: 100,
            align: 'center',
            renderer: left,
            renderer: rendererFlow
        }, {
            text: '子工单数量',
            dataIndex: 'WORKORDERNUM',
            width: 100,
            align: 'center',
            renderer: left,
            renderer: rendererZGD
        }, {
            text: '工单描述',
            dataIndex: 'V_SHORT_TXT',
            width: 300,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUIP_NAME',
            width: 130,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '设备位置',
            dataIndex: 'V_EQUSITENAME',
            width: 220,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '备件消耗',
            dataIndex: 'V_SPARE',
            width: 300,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '委托单位',
            dataIndex: 'V_DEPTNAME',
            width: 150,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '委托人',
            dataIndex: 'V_PERSONNAME',
            width: 100,
            align: 'center',
            renderer: left
        }, {
            text: '委托时间',
            dataIndex: 'D_ENTER_DATE',
            width: 140,
            align: 'center',
            renderer: left,
            renderer: rendererTime
        }, {
            text: '检修单位',
            dataIndex: 'V_DEPTNAMEREPARIR',
            width: 150,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '工单类型描述',
            dataIndex: 'V_ORDER_TYP_TXT',
            width: 100,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '工单状态',
            dataIndex: 'V_STATENAME',
            width: 65,
            align: 'center',
            renderer: left,
            renderer: CreateGridColumnTd
        }, {
            text: '计划工时',
            dataIndex: 'PLANTIME',
            width: 100,
            align: 'center',
            renderer: left
        }, {
            text: '实际工时',
            dataIndex: 'FACTTIME',
            width: 100,
            align: 'center',
            renderer: left
        }]
    });
    Ext.data.StoreManager.lookup('workStore').load({
        params:{
            DX_GUID:v_guid,
            STARTTIME:indate,
            ENDTIME:endate
        }
    });
    Ext.data.StoreManager.lookup('workStore').on('load',function(){
        Ext.getCmp('worknum').setText(Ext.data.StoreManager.lookup('workStore').getProxy().getReader().rawData.V_NUM);
    });

    Ext.getCmp('centpanel').add(Ext.getCmp('workgrid'));
    Ext.getCmp('centpanel').doLayout();
}

// 物耗
function onWhBtnClick(){
    Ext.getCmp('centpanel').removeAll();
    var whgrid=Ext.create('Ext.grid.Panel',{
        region: "center",
        id:'whgird',
        autoScroll: true,
        store:Ext.getStore('whStore'),
        split: true,
        margin:'0px',
        columnLines: true,
        border: true,
        // tbar:[
        //     {xtype:'label',text:'物料数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
        //     {xtype:'label',id:'whnum',height:20,width:90,margin:'10 0 0 20'}
        // ],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工单号',width: 140, dataIndex: 'V_ORDERGUID', align: 'center',renderer:atleft},
            {text: '物料编码',width: 140, dataIndex: 'V_MATERIALCODE', align: 'center',renderer:atleft},
            {text: '物料描述',width: 300, dataIndex: 'V_MATERIALNAME', align: 'center',renderer:atleft},
            {text: '规格型号',width: 140, dataIndex: 'V_UNIT', align: 'center',renderer:atleft},
            {text: '计量单位',width: 100, dataIndex: 'I_PLANAMOUNT', align: 'center',renderer:atright},
            {text: '单价',width: 80, dataIndex: 'F_PLANMONEY', align: 'center',renderer:atright},
            {text: '数量',width: 100, dataIndex: 'I_OUTNUMBER', align: 'center',renderer:atright},
            {text: '单据类型',width: 80, dataIndex: 'F_ACTUALMONEY', align: 'center',renderer:atright},
            {text: '单据号',width: 300, dataIndex: 'V_ACTIVITY', align: 'center',renderer:atleft}

        ]
    });
    Ext.data.StoreManager.lookup('whStore').load({
        params:{
            V_V_GUID:v_guid,
            STARTTIME:indate,
            ENDTIME:endate
        }
    });
    Ext.getCmp('centpanel').add(Ext.getCmp('whgrid'));
    Ext.getCmp('centpanel').doLayout();
}

// 物资计划
function onWzjhBtnClick(){
    Ext.getCmp('centpanel').removeAll();

    //物料
    var wlmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'wlmxgird',
        autoScroll: true,
        store:Ext.getStore('wlAllStore'),
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
            {text: '工单号',width: 140, dataIndex: 'V_ORDERGUID', align: 'center',renderer:atleft},
            {text: '工序',width: 300, dataIndex: 'V_ACTIVITY', align: 'center',renderer:atleft},
            {text: '物料编码',width: 140, dataIndex: 'V_MATERIALCODE', align: 'center',renderer:atleft},
            {text: '物料描述',width: 300, dataIndex: 'V_MATERIALNAME', align: 'center',renderer:atleft},
            {text: '单位',width: 140, dataIndex: 'V_UNIT', align: 'center',renderer:atleft},
            {text: '计划数量',width: 100, dataIndex: 'I_PLANAMOUNT', align: 'center',renderer:atright},
            {text: '计划金额',width: 80, dataIndex: 'F_PLANMONEY', align: 'center',renderer:atright},
            {text: '实际数量',width: 100, dataIndex: 'I_OUTNUMBER', align: 'center',renderer:atright},
            {text: '实际金额',width: 80, dataIndex: 'F_ACTUALMONEY', align: 'center',renderer:atright}
        ]
    });


//机具
    var jjmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'jjmxgird',
        store:Ext.getStore('jjAllStore'),
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
            {text:'工单号',width: 140, dataIndex: 'V_ORDERGUID', align: 'center',renderer:atleft},
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
        store:Ext.getStore('gjAllStore'),
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
            {text: '工单号',width: 140, dataIndex: 'V_ORDERGUID', align: 'center',renderer:atleft},
            {text: '工具名称',width: 140, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
            {text: '工具类型',width: 140, dataIndex: 'V_GJ_TYPE', align: 'center',renderer:atleft}
        ]
    });
    // 人员
    var gzmxgird = Ext.create('Ext.grid.Panel', {
        region: "center",
        id:'gzmxgird',
        store:Ext.getStore('gzAllStore'),
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
    var wlmxtab=Ext.create('Ext.tab.Panel', {
        id:'wlmxtab',
        region: "center",
        border: true,
        autoScroll: true,
        split: true,
        margin:'0px',
        items: [{
            title: '物料明细',
            id:'tabwl',
            layout:'border',
            items:wlmxgird///[Ext.getCmp('wlmxgird')]
        }, {
            title: '机具',
            id:'tabjj',
            layout:'border',
            items:jjmxgird//[Ext.getCmp('jjmxgird')]
        },{
            title: '工具',
            id:'tabgj',
            layout:'border',
            items:gjmxgird//[Ext.getCmp('gzmxgird')]
        },{
            title: '人员',
            id:'tabgz',
            layout:'border',
            items:gzmxgird//[Ext.getCmp('gzmxgird')]
        }]
    });
    // 物料store
    Ext.data.StoreManager.lookup('wlAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'WL',
            V_SDATE:indate,
            V_EDATE:endate
        }
    });

    Ext.data.StoreManager.lookup('wlAllStore').on('load',function(){
        Ext.getCmp('wlnum').setText(Ext.data.StoreManager.lookup('wlAllStore').getProxy().getReader().rawData.V_NUM);
    });
    //机具 store
    Ext.data.StoreManager.lookup('jjAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'JJ',
            V_SDATE:indate,
            V_EDATE:endate
        }
    });

    Ext.data.StoreManager.lookup('jjAllStore').on('load',function(){
        Ext.getCmp('jjnum').setText(Ext.data.StoreManager.lookup('jjAllStore').getProxy().getReader().rawData.V_NUM);
    });
    //工具 store
    Ext.data.StoreManager.lookup('gjAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'GJ',
            V_SDATE:indate,
            V_EDATE:endate
        }
    });
    Ext.data.StoreManager.lookup('gjAllStore').on('load',function(){
        Ext.getCmp('gjnum').setText(Ext.data.StoreManager.lookup('gjAllStore').getProxy().getReader().rawData.V_NUM);
    });
    // 人员 store
    Ext.data.StoreManager.lookup('gzAllStore').load({
        params:{
            V_V_PROJECT_GUID:v_guid,
            V_V_TYPE:'GZ',
            V_SDATE:indate,
            V_EDATE:endate
        }
    });
    Ext.data.StoreManager.lookup('gzAllStore').on('load',function(){
        Ext.getCmp('pernum').setText(Ext.data.StoreManager.lookup('gzAllStore').getProxy().getReader().rawData.V_NUM);
    });


    Ext.getCmp('centpanel').add(Ext.getCmp('wlmxtab'));
    Ext.getCmp('centpanel').doLayout();
}
// 缺陷集
function onQxjBtnClick(){

   Ext.getCmp('centpanel').removeAll();
    var defectgrid = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'defectgrid',
        columnLines: true,
        width: '100%',
        store: Ext.getStore('defectStore'),
        autoScroll: true,
        height: 400,
        margin:'0px',
        tbar:[
            {xtype:'label',text:'缺陷数量',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'defectnum',text:'',height:20,width:90,margin:'10 0 0 20'}
        ],
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
    Ext.data.StoreManager.lookup("defectStore").load({
        params:{
            V_V_PROJECTGUID:v_guid,
            V_SDATE:indate,
            V_EDATE:endate
        }
    });
    Ext.data.StoreManager.lookup("defectStore").on('load',function(){
        Ext.getCmp('defectnum').setText(Ext.data.StoreManager.lookup("defectStore").getProxy().getReader().rawData.V_NUM);
    });
    Ext.getCmp('centpanel').add(Ext.getCmp('defectgrid'));
    Ext.getCmp('centpanel').doLayout();
}
// 施工方
function onSgfBtnClick(){
    Ext.getCmp('centpanel').removeAll();

    var redeptgrid = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'redeptgrid',
        columnLines: true,
        width: '100%',
        store: Ext.getStore('redeptStore'),
        autoScroll: true,
        height: 400,
        margin:'0px',
        tbar:[
            {xtype:'label',text:'施工方总数量：',height:20,width:90,margin:'20 0 0 50',labelStyle: "text-align: right;"},
            {xtype:'label',id:'redeptnum',text:'',height:20,width:90,margin:'10 0 0 20'}
        ],
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            { text: '施工单位编码',dataIndex: 'DEPARTCODE',align: 'center',width: 200,renderer: CreateGridColumnTd
            }, {text: '施工单位名称',dataIndex: 'DEPARTNAME',align: 'center',width: 300,renderer: CreateGridColumnTd
            }]
    });


    Ext.data.StoreManager.lookup("redeptStore").load({
        params:{
            V_V_GUID:v_guid
        }
    });
    Ext.data.StoreManager.lookup("redeptStore").on('load',function(){
        Ext.getCmp('redeptnum').setText(Ext.data.StoreManager.lookup("redeptStore").getProxy().getReader().rawData.V_NUM);
    });
    Ext.getCmp('centpanel').add(Ext.getCmp('redeptgrid'));
    Ext.getCmp('centpanel').doLayout();
}
// 合同
function onHtBtnClick(){
   // Ext.getCmp('centpanel').removeAll();
   //  Ext.getCmp('centpanel').add(Ext.getCmp('gjmxgird'));
   //  Ext.getCmp('centpanel').doLayout();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

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

function OnButtonWorkorder(){  //生成工单
                               // var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
                               //  if(chodata.length!=1){
                               //      alert('请选择一条数据进行工单生成！');
                               //      return;
                               //  }else{
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/pm_dxgc_orderEdit/dxWorkOrder.html?guid=' +v_guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    // window.open(AppUrl + 'page/pm_dxgc_orderEdit/index.html?guid=' +chodata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    // }
}

function a1(id) {
    var oson = document.getElementById(id);
    with (oson) {
        oson.style.display = "block";
        oson.style.left = (window.event.clientX - 450) + 'px';
        oson.style.top = (window.event.clientY - 138) + 'px';
        oson.style.background = 'white';
    }

}

function a2(id) {
    document.getElementById(id).style.display = 'none';

}