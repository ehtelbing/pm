var fxguid="";
var newfxguid="";
//年份
var date=new Date();
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}

Ext.onReady(function(){
    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var gridStore = Ext.create('Ext.data.TreeStore', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['FX_GUID', 'V_PROJECT_CODE', 'V_PROJECT_NAME', 'FX_MONEY', 'FX_CONTENT', 'V_WBS_CODE', 'V_WBS_NAME',
            'V_DATE_B', 'V_DATE_E', 'V_REPAIR_DEPT', 'V_REPAIR_DEPT_TXT', 'V_FZR', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'tree/PRO_MAINTAIN_SEL_FJ',
            actionMethods: {
                read: 'POST'
            }
        },
        reader: {
            type: 'json',
            root: 'list'
        }
        , root: {
            text: 'root',
            expanded: true
        }
    });
    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'north',
        layout:'column',
        frame:true,
        border:false,
        items:[
            {
                xtype: 'combo',
                id: 'nf',
                fieldLabel: '年份',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 80,
                width: 250,
                displayField: 'displayField',
                valueField: 'valueField',
                value: new Date().getFullYear(),
                store: yearStore,
                labelAlign: 'right',
                queryMode: 'local'
            }
            ,{
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: queryGrid
                ,style: 'margin: 5px 0px 0px 5px'

            }
            , {
                xtype: 'button',
                text: '分解',
                icon: imgpath + '/accordion_collapse.png',
                handler: _fenjie
                ,hidden:true
                ,style: 'margin: 5px 0px 0px 10px'
            }
            , {
                xtype: 'button',
                text: '生成工单',
                icon: imgpath + '/accordion_collapse.png',
                handler: _workOCreate
                ,style: 'margin: 5px 0px 0px 5px'
            }
        ]
    });
    var grid=Ext.create('Ext.tree.Panel',{
        id:'grid',
        store:gridStore,
        split : true,
        stripeRows: true,
        rootVisible: false,
        useArrows: true,
        region: 'center',
        columnLines: true,
        autoScroll:true,
        viewConfig:{
            forceFit:true
        },
        columns: [
            {xtype: 'rownumberer', text: '序号', align: 'center', width: 50},
            {text: '放行唯一编码', align: 'center', width: 150, dataIndex: 'FX_GUID', hidden: true},
            {text: '工程编码', align:'left',style : {'text-align' : 'center'},  width: 140, dataIndex: 'V_PROJECT_CODE',renderer:atleft,
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '工程名称', align: 'center', width: 150, dataIndex: 'V_PROJECT_NAME',renderer:atleft,
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '年度投资（万元）', align: 'center', width: 150, dataIndex: 'FX_MONEY',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '放行计划主要内容', align:'left',style : {'text-align' : 'center'}, width: 210, dataIndex: 'FX_CONTENT',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: 'WBS编码', align:'left',style : {'text-align' : 'center'},width: 150, dataIndex: 'V_WBS_CODE',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '维修工程项目名称', align:'left',style : {'text-align' : 'center'},  width: 210, dataIndex: 'V_WBS_NAME',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '开工时间', align: 'center', width: 150, dataIndex: 'V_DATE_B',renderer:timeTurn,
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '竣工时间', align: 'center', width: 150, dataIndex: 'V_DATE_E',renderer:timeTurn,
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '建设单位编码', align: 'center', width: 150, dataIndex: 'V_REPAIR_DEPT', hidden: true},
            {text: '建设单位名称', align:'left',style : {'text-align' : 'center'}, width: 210, dataIndex: 'V_REPAIR_DEPT_TXT',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }},
            {text: '建设单位负责人编码', align: 'center', width: 150, dataIndex: 'V_FZR', hidden: true},
            {text: '建设单位负责人', align: 'center', width: 140, dataIndex: 'V_PERSONNAME',
                renderer:function(v){
                    return "<div title='"+v+"'>"+v+"</div>";
                }}
        ]
        , listeners: {
            itemClick: function (record,node ) {
                fxguid=node.data.FX_GUID;
            }
        }
    });

    var qxgridStore=Ext.create('Ext.data.Store',{
        id:'qxgridStore',
        autoLoad:false,
        fields:['V_GUID','V_DEFECTLIST','D_INDATE','V_EQUCODE','V_EQUNAME','V_YPRO_GUID'],
        proxy:{
            type:'ajax',
            async:false,
            url:AppUrl+'dxfile/PRO_BY_MAINTAIN_SEL_DEFECT',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        },
        listeners: {
            load: function (store, records) {
                if(records.length==0){
                    Ext.getCmp("qxWin").close();
                    Ext.Msg.alert("提示","请先关联维修计划");

                }
            }
        }
    });
    var qxpanel=Ext.create('Ext.panel.Panel',{
        id:'qxpanel',
        frame:true,
        border:false,
        region:'north',
        layout:'column',
        items:[{
            xtype:'button',
            text:'确认返回',
            width : 80,
            icon: imgpath + '/add.png',
            handler:turnPage
        }]
    });
    var qxgrid=Ext.create('Ext.grid.Panel',{
        id:'qxgrid',
        store:qxgridStore,
        autoScroll:true,
        region:'center',
        columnLines:true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        //selType : 'checkboxmodel',
        columns:[
            {text: '缺陷guid', width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atCenter},
            {text: '缺陷内容', width: 200, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atCenter},
            {text: '录入时间', width: 200, dataIndex: 'D_INDATE', align: 'center',renderer:timeTurn},
            {text: '设备编码', width: 100, dataIndex: 'V_EQUCODE', align: 'center',renderer:atCenter},
            {text: '设备名称', width: 100, dataIndex: 'V_EQUNAME', align: 'center',renderer:atCenter},
            {text: '维修计划guid', width: 300, dataIndex: 'V_YPRO_GUID', align: 'center',renderer:atCenter}
        ]
        ,tbar: [
            ,{ xtype:'button',
                text:'确认返回',
                width : 80,
                icon: imgpath + '/add.png',
                handler:turnPage}
        ]
        // ,listeners:{
        //     itemclick:qxgridClick()
        // }
    });
    // 关联缺陷窗口
    var qxWin=Ext.create('Ext.window.Window',{
        id:'qxWin',
        layout:'border',
        closeAction:'hide',
        width:560,
        height:450,
        // items:[qxpanel,qxgrid]
        items:[qxgrid]

    });
//生成工单缺陷窗口store
    var qxworkStore=Ext.create('Ext.data.Store',{
        id:'qxworkStore',
        autoLoad:false,
        fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME','V_SOURCEID','D_DEFECTDATE','D_INDATE','V_PERCODE',
            'V_PERNAME','V_DEPTCODE','V_DEPTNAME','V_EQUCODE','V_EQUNAME','V_EQUSITE','V_EQUSITENAME','V_EQUTYPECODE',
            'V_EQUTYPENAME','V_IDEA','V_STATECODE','V_STATENAME','V_GUID','V_EQUSITE','D_DATE_EDITTIME','V_EDIT_GUID',
            'V_SOURCE_GRADE','V_EQUCHILDCODE','V_INPERCODE','V_INPERNAME','V_EQUTYPECODE','V_ORGCODE','V_DEPTNAME',
            'V_HOUR','V_BZ','V_REPAIRMAJOR_CODE','V_PROJECT_CODE','V_PROJECT_NAME','V_FLAG','V_PROC_WAY','UP_GUID','V_SYSTEM'],
        proxy:{
            type:'ajax',
            async:false,
            url:AppUrl + 'dxfile/MAINTAIN_BY_DEFECT_SEL',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        },
        listeners: {
            load: function (store, records) {
                if(records.length==0){
                    // Ext.getCmp("qxworkgrid").close();
                    // Ext.Msg.alert("提示","请先关联维修计划");
                }
            }
        }
    });

    //生成工单缺陷窗口
    var qxworkpanel=Ext.create('Ext.panel.Panel',{
        id:'qxworkpanel',
        frame:true,
        border:false,
        region:'north',
        layout:'column',
        items:[{
            xtype:'button',
            text:'确认返回',
            width : 80,
            icon: imgpath + '/add.png',
            handler:turnCreatWPage
        }]
    });
    var qxworkgrid=Ext.create('Ext.grid.Panel',{
        id:'qxworkgrid',
        store:qxworkStore,
        autoScroll:true,
        region:'center',
        columnLines:true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns:[
            {text: '缺陷guid', width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atCenter},
            {text: '缺陷内容', width: 200, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atCenter},
            {text: '录入时间', width: 200, dataIndex: 'D_INDATE', align: 'center',renderer:timeTurn},
            {text: '设备编码', width: 100, dataIndex: 'V_EQUCODE', align: 'center',renderer:atCenter},
            {text: '设备名称', width: 100, dataIndex: 'V_EQUNAME', align: 'center',renderer:atCenter},
            {text: '维修计划guid', width: 300, dataIndex: 'V_YPRO_GUID', align: 'center',renderer:atCenter}
        ]
        // ,listeners:{
        //     itemclick:qxgridClick()
        // }
    });
    var qxCworkWin=Ext.create('Ext.window.Window',{
        id:'qxCworkWin',
        layout:'border',
        closeAction:'hide',
        width:700,
        height:350,
        items:[qxworkpanel,qxworkgrid]

    });
    Ext.create('Ext.container.Viewport',{
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    queryGrid();
});

function timeTurn(value,metaDate,recode){
    metaDate.style = "text-align:center;";
    var val=value.toString().substr(0,10);
    return val;
}
function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_UPGRID:  '-1'
        }
    });
}

function _fenjie(){
    if(fxguid==""){
        alert("请单击选择一条记录");
        return false;
    }
//放行计划创建
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_MAINTAIN_GET_FJGUID',
        method: 'POST',
        async: false,
        params: {
            V_GUID: 'fj',
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring()),
            V_UPGUID:fxguid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET != '') {
                newfxguid=resp.RET;

                Ext.data.StoreManager.lookup("qxgridStore").load({
                    params:{
                        V_FXGUID:fxguid
                    }
                });
                Ext.getCmp("qxWin").show();
            }
        }
    });

    // window.open(AppUrl+'page/PM_220106/fjAddFx.html?fxguid=' +fxguid, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no')
}

function atleft(value,metaDate,recode){
    metaDate.style="text-align:left";
    return value;
}
function atCenter(value,metaDate,recode){
    metaDate.style="text-align:center";
    return value;
}
// function qxgridClick(view, record, item, index, e, eOpts){
//
// //缺陷-放行关联写入
//     Ext.Ajax.request({
//         url:AppUrl + 'dxfile/MAINTAIN_BY_DEFECT_INSERT',
//         method:'POST',
//         async: false,
//         params: {
//             V_FXGUID:fxguid,
//             V_DEFECTGUID:record.data.V_GUID,
//             V_INPER:Ext.util.Cookies.get('v_personcode'),
//             V_DEPT: Ext.util.Cookies.get('v_deptcode'),
//             V_ORDCODE:Ext.util.Cookies.get('v_orgCode')
//         },
//         success: function (resp) {
//             var resp=Ext.decode(resp.responseText);
//             if(resp.RET=='SUCCESS'){
//
//             }
//         }
//     });
//
// }
function turnPage(){
    var flag=0;
    var records=Ext.getCmp("qxgrid").getSelectionModel().getSelection();
    var num=records.length;
    if(records.length == 0){
        Ext.Msg.alert("提示" ,"请选择至少一条数据");
        return false;
    }

    for(var i=0;i<num;i++){
        //缺陷-放行关联写入
        Ext.Ajax.request({
            url:AppUrl + 'dxfile/MAINTAIN_BY_DEFECT_INSERT',
            method:'POST',
            async: false,
            params: {
                V_FXGUID:newfxguid,
                V_DEFECTGUID:records[i].get('V_GUID'),
                V_INPER:Ext.util.Cookies.get('v_personcode'),
                V_DEPT: Ext.util.Cookies.get('v_deptcode'),
                V_ORDCODE:Ext.util.Cookies.get('v_orgCode')
            },
            success: function (resp) {
                var resp=Ext.decode(resp.responseText);
                if(resp.RET=='SUCCESS'){
                    flag++;
                }
            }
        });
    }
    if(num==flag){
        Ext.getCmp("qxWin").close();
        window.open(AppUrl+'page/PM_220106/fjAddFx.html?fxguid=' +fxguid+'&newguid='+newfxguid, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
    }
}

function selectGridTurn(){
    queryGrid();
}

function _workOCreate(){
    if(fxguid==""){
        alert('请选择一条放行计划');
        return false;
    }
    Ext.data.StoreManager.lookup('qxworkStore').load({
        params:{
            V_FX_GUID: fxguid
        }
    });
    Ext.getCmp("qxCworkWin").show();
    // window.open(AppUrl+'page/PM_220106/fx_workorder.html?fxguid=' +fxguid, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
}

function turnCreatWPage(){
    var flag=0;
    var records=Ext.getCmp("qxworkgrid").getSelectionModel().getSelection();
    var num=records.length;
    if(records.length <=0){
        Ext.Msg.alert("提示" ,"请选择一条数据");
        return false;
    }
    else{

        var D_BE_SJ = records[0].data.D_BE_SJ==undefined?"":records[0].data.D_BE_SJ;
        var D_EN_SJ = records[0].data.D_EN_SJ==undefined?"":records[0].data.D_EN_SJ;
        var V_GUIDList = '';
        for (var j = 0; j < records.length; j++) {
            if (records[0].data.V_EQUNAME != records[j].data.V_EQUNAME) {
                alert("请选择同一设备缺陷");
                return;
            }
            if (j == 0) {
                V_GUIDList = records[j].data.V_GUID;
            } else {
                V_GUIDList += ',' + records[j].data.V_GUID;
            }
        }

        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PRO_PM_WORKORDER_FX_CREATE',
            method: 'POST',
            async: false,
            params: {
                V_V_ORG_CODE: Ext.util.Cookies.get('v_orgCode'),
                V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_FXGUID:fxguid,
                V_V_DEFECTLIST: V_GUIDList
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.list.length > 0) {
                    var V_ORDERGUID = resp.list[0].V_ORDERGUID;
                    var V_EQUTYPECODE = records[0].raw.V_EQUTYPECODE;
                    var V_SOURCECODE = records[0].raw.V_SOURCECODE;
                    var owidth = window.document.body.offsetWidth - 500;
                    var oheight = window.document.body.offsetHeight - 500;
                    Ext.getCmp("qxCworkWin").close();
                    var ret = window.open(AppUrl + 'page/PM_220106/fx_workorder.html?V_GUID=' + V_ORDERGUID +
                        '&V_EQUTYPECODE=' + V_EQUTYPECODE +
                        "&V_SOURCECODE=" + V_SOURCECODE +
                        "&D_BE_SJ=" + D_BE_SJ +
                        "&D_EN_SJ=" + D_EN_SJ, '', 'height=' + 582 + ',width=' + 974 + ',top=10px,left=10px,resizable=yes');

                } else {
                    alert('创建工单失败');
                }

            }
        });
        // window.open(AppUrl+'page/PM_220106/fx_workorder.html?fxguid=' +fxguid, '',
        //     'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
    }

}