
var Guid="";
var OrgCode="";
var OrgName="";
var V_DEPTCODE="";
var Year="";
var fjDefect="";
var equcode="";
var equname="";
var equtype="";

if(Ext.urlDecode(location.href.split("?")[1])!=undefined){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
    Year=Ext.urlDecode(location.href.split('?')[1]).year==null?"":Ext.urlDecode(location.href.split('?')[1]).year;
    V_DEPTCODE=Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE==null?"":Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}
Ext.onReady(function(){
    Ext.getBody().mask();
//厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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
        },
        listeners:{
            load:function(store, records, success, eOpts){
                OrgCode = store.getAt(0).data.V_DEPTCODE;
                OrgName=store.getAt(0).data.V_DEPTNAME;
                // Ext.getCmp('ck').select(store.first());
            }
        }
    });
    var zyqStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqStore',
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
    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC','V_ZYJC','V_LX','V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners:{
            load:function(store,records,success,eOpts){
                Ext.getCmp("zy").setValue(store.first());
            }
        }
    });
    var qxGridStore=Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'qxGridStore',
        fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
            'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
            'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
            'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG','DEF_SOLVE','BJ_STUFF','PASSNUM','NOPASSNUM'
            ,'DEFILENUM','PASS_STATE','PASS_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PROJECT_DEFECT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var fzPerStore=Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fzPerStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                if( store.getAt(0)==undefined){
                    Ext.getCmp('fzPer').select(''); return;
                }else{
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('fzPer').select(store.first());
                }

            }

        }
    });
    var fileview=Ext.create("Ext.data.Store", {
        autoLoad: false,
        id: 'fileview',
        fields: ['FILE_CODE', 'FILE_NAME', 'FILE_TYPE', 'INSERT_DATE', 'INSERT_PERSON'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/DEFECT_UPFILE_SELECT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_GUID: fjDefect
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var tpanel=Ext.create('Ext.form.Panel',{
        region: 'north',
        frame: false,
        border: false,
        layout: 'column',
        // height:'10%',
        autoScorll:true,
        id:'tpanel',
        titleAlign:'center',
        defaults: {labelAlign: 'right'},
        collapsible: false,
        tbar: [
            {
                xtype: 'button',
                text: '临时保存',
                margin: '0 0 5 0',
                // iconCls:'Tablesave',
                iconCls: 'buy-button',
                icon:dxImgPath + '/lsbc.png',
                handler:btnSaveProject
            },
            { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 5 8' },
            {
                xtype: 'button',
                id:'startFlow',
                text: '上报',
                margin: '0 0 5 0',
                iconCls: 'buy-button',
                icon:dxImgPath + '/wlmx.png',
                handler:btnFlowStart
            }
            ,
            {
                xtype : 'combo',
                id:'fzPer',
                store:fzPerStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '负责人',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                margin:'5 5 5 10',
                labelWidth :60,
                width:170,
                labelAlign : 'right'
            }
        ]
    });
    var combpanel=Ext.create('Ext.panel.Panel',{
        id:'combpanel',
        region:'north',
        layout:'column',
        // height:'50%',
        autoScroll:true,
        collapsible: true,
        items:[
            {
                xtype: 'textfield',
                fieldLabel: '项目编码',
                id: 'ProjectCode',
                labelWidth: 60,
                width: 250,
                margin: '5 5 5 15',
                readOnly: true,
                hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '项目名称',
            id:'ProjectName',
            labelWidth: 60,
            width:250,
            margin:'5 5 5 15'
        },{
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            margin:'5 5 5 0',
            width: 250,
            hidden:true
        },{
            xtype : 'combo',
            id : "zyq",
            store: zyqStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '计划作业区',
            margin:'5 5 5 0',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth :80,
            width:250,
            labelAlign : 'right'
            // ,hidden:true
        },{
            xtype : 'combo',
            id : "zy",
            store: zyStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '专 业',
            margin:'5 5 5 0',
            displayField: 'V_ZYMC',
            valueField: 'V_GUID',
            width:265,
            labelWidth :75,
            labelAlign : 'right'
        },
            {
                xtype : 'datefield',
                id:'btime',
                editable : false,
                fieldLabel : '开工时间',
                margin:'5 5 5 0',
                labelWidth :60,
                width:170,
                labelAlign : 'right',
                format:'Y/m/d',
                value:new Date()
            },
            {
                xtype : 'datefield',
                id:'etime',
                editable : false,
                fieldLabel : '竣工时间',
                margin:'5 5 5 0',
                labelWidth :60,
                width:170,
                labelAlign : 'right',
                format:'Y/m/d',
                value:new Date()
            }
            ]
    });
    var textpanel=Ext.create('Ext.panel.Panel',{
        id:'textPanel',
        region:'center',
        layout:'border',
        // height:'50%',
        height:155,
        // autoScroll:true,
        collapsible: true,
        items:[{
            xtype     : 'textareafield',
            id:'qstext',
            grow      : true,
            name      : 'message',
            fieldLabel: '维修工程请示',
            anchor    : '100%',
            margin:'5 5 5 20',
            labelWidth :50,
            width:750,
            height:150
        }]
    });
    //填写panel
    var toolpanel=Ext.create('Ext.panel.Panel',{
       id:'toolpanel',
       region:'north',
        layout:'border',
        height:'20%',
       items:[combpanel,textpanel]
    });

    var equtree=Ext.create('Ext.data.TreeStore', {
        id : 'equtree',
        autoLoad : false,
        fields : ['id', 'text', 'parentid','V_EQUSITE','V_EQUSITENAME','V_EQUTYPECODE','V_EQUTYPENAME']
    });

    var delgrid=Ext.create('Ext.grid.Panel',{
        id:'delgrid',
        region:'center',
        columnLines:true,
        border:false,
        store: qxGridStore,
        autoScroll:true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '删除',width: 120, dataIndex: 'I_ID',  align: 'center',renderer:DelDefect},
            {text: '上传附件',width: 120, dataIndex: 'DEFILENUM',align: 'center',renderer:upfilefun},
            {text: '缺陷code',width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
            {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft,hidden:true},
            {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
            {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
            {text:'解决方案',width:140,dataIndex:'DEF_SOLVE',align:'center',renderer:atleft,
                editor:{
                    xtype: 'textfield',id: 'defsove',labelAlign: 'right',allowBlank:false
                }},
            {text:'备件材料',width:140,dataIndex:'BJ_STUFF',align:'center',renderer:atleft,
                editor:{
                    xtype: 'textfield',id: 'bjstuff',labelAlign: 'right',allowBlank:false
                }
            }

        ],
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                // beforeedit:function (editor, context, eOpts) {
                //     if(context.record.get('D_MONTH')!=date.getMonth()+1&&context.record.get('D_YEAR')==date.getFullYear()){
                //         alert("非本月数据无法修改");return false;
                //     }
                // },
                edit: OnChangeEleData
            }
        })],
        height:395, //'100%',//132,
        // height:'35%',
        width: '100%',
        tbar: [
            '缺陷明细',
            { xtype: 'tbfill' },
            // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
            {
                xtype: 'button',
                text: '查看更多',
                // margin: '5 0 5 0',
                bodyStyle:'float:right;',
                icon:dxImgPath + '/search.png',
                // iconCls:'Magnifierzoomin',
                listeners:{click:OnLookMoreDefect}
            }
        ]
    });

    //选择panel
    var cpanel=Ext.create('Ext.panel.Panel',{
        id:'cpanel',
        region:'center',
        layout:'border',
        items:[{
            xtype : 'treepanel',
            id : 'sectTree',
            region : 'west',
            width : 200,
            store : equtree,
            rootVisible : false,
            autoScroll: true,
            listeners : {
                itemclick : OnClickTreeItem
            }
        },delgrid]
    });

    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[tpanel,toolpanel,cpanel]
    });
    pageLoad();
    QueryTree();

    Ext.getCmp('zy').on('select',function(){
        // CreateProjectCode();
    });
    Ext.getCmp('zyq').on('select',function(){
        QueryZyFzr();
        // var treeS=Ext.data.StoreManager.lookup("equtree");
        // treeS.proxy.extraParams={
        //     V_V_PERSONCODE:Ext.util.Cookies.get("v_personcode"),
        //     V_V_DEPTCODENEXT:V_DEPTCODE
        // };
        // treeS.load();
        // 作业区更改，树重新加载
        treeReLoad();
    });

    //缺陷附件上传
    var filegrid=Ext.create("Ext.grid.Panel", {
        id: 'filegrid',
        region: 'center',
        height: '100%',
        width: '100%',
        columnLines: true,
        store: fileview,
        autoScroll: true,
        margin: '10px 0px 0px 15px',
        //colspan: 3,
        columns: [{
            text:'附件编码',
            hide:true,
            dataIndex:'FILE_CODE'
        },{
            text: '附件名称',
            flex: 0.6,
            width:340,
            id : 'fjname',
            align: 'center',
            dataIndex: "FILE_NAME"
            //renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.4,
            width:340,
            align: 'center',
            renderer: _delRander
        }]
    });
    var win=Ext.create('Ext.window.Window',{
        id:'win',
        title:'附件添加窗口',
        closeAction:'hide',
        layout: 'vbox',
        width: 880,
        height: 400,
        modal: true,
        plain: true,
        bodyPadding: 10,
        items: [{
            xtype: 'form',
            id:'uploadFile',
            region: 'north',
            layout: 'hbox',
            fileUpload:true,
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: "filefield",
                name: 'V_V_BLOB',
                id: "V_V_BLOB",
                enctype: "multipart/form-data",
                fieldLabel: "上传附件",
                fileUpload: true,
                allowBlank: false,
                labelWidth: 100,
                width: 440,
                labelStyle: 'color:red;font-weight:bold',
                margin: '5px 0px 5px 5px',
                emptyText: '请选择文件',
                buttonText: '浏览',
                invalidText: '文件格式不正确'
            }, {
                id: 'insertFilesFj2',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 15px',
                handler: _upLoadFile
            }, {
                xtype: 'hidden',
                name: 'V_GUID',
                id: 'V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_FILENAME',
                id: 'V_FILENAME'
            },  {
                xtype: 'hidden',
                name: 'V_PLANT',
                id: 'V_PLANT'
            }, {
                xtype: 'hidden',
                name: 'V_DEPT',
                id: 'V_DEPT'
            }, {
                xtype: 'hidden',
                name: 'V_PERSONCODE',
                id: 'V_PERSONCODE'
            }/*, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }*/

            ]
        } ,{
            columnWidth: 1,
            height: 380,
            width: 800,
            items: filegrid
        }],
        closable: true,
        model: true
    });
});
function pageLoad(){

    QueryZYQ();
    // QueryZyFzr();
}
function treeReLoad(){
    var st=Ext.getCmp('sectTree').store
    st.proxy.extraParams=
        {V_V_PERSONCODE: "aqjf", V_V_DEPTCODENEXT: "99060206"};
    Ext.getCmp('sectTree').store.load();
}
function QueryTree(){

    Ext.getCmp('sectTree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'tree/EQU_SELECT_FROM_DEPT_TO_WX',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_PERSONCODE:Ext.util.Cookies.get("v_personcode"),
            V_V_DEPTCODENEXT:V_DEPTCODE
        }
    });
    Ext.getCmp('sectTree').store.load();
    Ext.getBody().unmask();
}

//创建工程编码
function CreateProjectCode(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECTCODE_C',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_ORGCODE:OrgCode,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                Ext.getCmp('ProjectCode').setValue(resp.V_V_PROJECT_OUT);
            }
        }
    });
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:center;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}

//加载作业区下拉
function QueryZYQ(){
    Ext.data.StoreManager.lookup('zyqStore').load({
        params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': OrgCode,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
        Ext.getCmp('zyq').select(V_DEPTCODE);
        // Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').data.get(0));
        // CreateProjectCode();
        QueryZyFzr();
    });
}
//加载专业负责人
function QueryZyFzr(){
    var nextSprStore = Ext.data.StoreManager.lookup('fzPerStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: OrgCode, //Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'MaintainPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}
//创建工程编码
function CreateProjectCode(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECTCODE_C',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_ORGCODE:OrgCode,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                Ext.getCmp('ProjectCode').setValue(resp.V_V_PROJECT_OUT);
            }
        }
    });
}

//临时保存
function btnSaveProject(){

}
//上报
function btnFlowStart(){

}
//缺陷查看更多
function OnLookMoreDefect(){

}
//缺陷解决编辑
function OnChangeEleData(){

}
// 设备树点击事件
function OnClickTreeItem(store, record, item, index, e, eOpts){

    if (record.data.leaf == true) {

    }
}
//关闭缺陷win
function winQxClose(){
    Ext.getCmp('btnAdd_tjqx').hide();
}
//删除缺陷
function DelDefect(value, metaData, record){

    var id = 'qx'+value;//metaData.record.id;

    Ext.defer(function () {
        Ext.widget('button', {
            icon:dxImgPath+'/delete.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 55,
            text: '删除',
            margin:'padding:10px 50px 10px 10px;',
            handler: function () {
                _deleteDefect(record.data.V_GUID);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
    // return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}
function _deleteDefect(DefectGuid){
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_DEFGUID:DefectGuid,
            V_PROGUID:Guid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.RET=='SUCCESS'){

            }else{
                alert("方案删除失败");
            }
        }
    });
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_DEFECT_GUID:DefectGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                // QueryDefect();
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: DefectGuid,
                        V_V_STATECODE: '10'//未处理

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if(resp.V_INFO=='success'){
                            QueryDefect();
                        }else{
                            alert("修改缺陷状态失败");
                        }

                    }
                });
                //写入缺陷-维修计划日志
                Ext.Ajax.request({
                    url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                    method:'POST',
                    params:{
                        V_PROGUID:Guid,
                        V_DEFECTGUID:DefectGuid,
                        V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                        V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                        V_ORG:Ext.util.Cookies.get("v_orgCode"),
                        V_STATE:'DEL'
                    },
                    success:function (response){
                        var resp=Ext.decode(response.responseText);
                    }
                });
                //删除维修日志审批表格关联
                Ext.Ajax.request({
                    url:AppUrl+'dxfile/PM_DEFECT_LOG_FROMPRO_DEL',
                    method:'POST',
                    params:{
                        V_PROGUID:Guid,
                        V_DEFECTGUID:DefectGuid
                    },
                    success:function (response){
                        var resp=Ext.decode(response.responseText);
                        if(resp.RET=="SUCCESS"){}
                    }
                });
            }else{
                alert("删除失败");
            }
        }
    });
}
//缺陷上传附件
function upfilefun(value, metaData, record){
    metaData.style="text-align:center";
    return '<a href="javascript:upfile(\''+record.data.V_GUID+'\')">'+"数量:"+value+"|"+"上传"+'</a>'
}
function upfile(value) {
    fjDefect=value;
    Ext.data.StoreManager.lookup('fileview').load();
    Ext.getCmp('win').show();

}

function _upLoadFile() {
    var uploadFile = Ext.getCmp('uploadFile');
    var V_V_BLOB = Ext.getCmp('V_V_BLOB').getSubmitValue();
    var V_V_FILENAME = V_V_BLOB.substring(0, V_V_BLOB.indexOf('.'));

    Ext.getCmp('V_GUID').setValue(fjDefect);
    Ext.getCmp('V_V_BLOB').setValue(V_V_BLOB);
    Ext.getCmp('V_FILENAME').setValue(V_V_FILENAME);
    //  Ext.getCmp('V_TYPE').setValue(V_TYPE);
    Ext.getCmp('V_PLANT').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_DEPT').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));

    //if(uploadFile.form.isValid()){
    if (Ext.getCmp('V_V_BLOB').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }
    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    uploadFile.getForm().submit({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_INSERT',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (form, action) {
            var massage=action.result.message;
            if(massage=="{list=Success}"){
                Ext.Msg.alert('成功', '上传成功');
                filequery(fjDefect);
                QueryDefect();
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    });
    //}

}
function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.FILE_CODE + '\')">删除</a>';
}

function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_DELETE',
        method: 'POST',
        async: false,
        params: {
            V_FILECODE: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.list == 'Success') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(fjDefect);
                QueryDefect();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}

function filequery(fjDefect) {
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_GUID: fjDefect
        }
    });
}
