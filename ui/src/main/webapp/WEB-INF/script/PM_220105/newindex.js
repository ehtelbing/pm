var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var FXGUID="";

Ext.onReady(function(){
    //sap厂矿
    var ckstore=Ext.create("Ext.data.Store",{
        id:'ckstore',
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
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                // _ck_zyqload();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['V_GUID','V_YEAR','V_MONTH','V_ORGCODE','V_DEPTNAME','V_DEPTCODE',
            'V_DEPTNAME','V_PROJECT_CODE','V_PROJECT_NAME','V_WBS_CODE','V_WBS_NAME',
            'V_CONTENT', 'V_MONEY', 'V_REPAIR_DEPT','V_REPAIR_DEPT_TXT','V_FZR',
            'V_DATE_B','V_DATE_E','V_INPER','V_INTIEM','V_PORJECT_GUID','QXCONTEXT',
        'DEFNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/MAINTAIN_RELEASE_BY_DEFECT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
            ,extraParams: {
                FX_GUID:'',
                V_SIGN:'0'
            }
        }
    });

    //放行缺陷关联显示
    var glGridStore=Ext.create('Ext.data.Store',{
        id:'glGridStore',
        autoLoad:false,
        fields:['V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME','V_PROJECT_GUID','V_PORJECT_CODE','V_PORJECT_NAME'
            ,'D_DEFECTDATE','D_INDATE','V_PERCODE','V_PERNAME','V_IDEA','V_PORJECT_CODE','V_PORJECT_NAME',
        'V_LEVELNAME'],
        proxy:{
            type:'ajax',
            async:false,
            url:AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_SEL',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        },
        listeners:{
            load:function(store,data){

            }
        }
    });

    //维修计划审批完成查找
    var wxGridStore=Ext.create('Ext.data.Store',{
        id:'wxGridStore',
        autoLoad:false,
        fields:['V_GUID','V_PORJECT_CODE','V_PORJECT_NAME','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME'
            ,'V_SPECIALTY','V_SPECIALTYNAME','V_WXTYPECODE','V_WXTYPENAME','V_MONEY','V_INMANCODE','V_INMAN',
            'V_WBS','V_WBS_TXT','V_CONTENT'],
        proxy:{
            type:'ajax',
            async:false,
            url:AppUrl + 'dxfile/PRO_PROPLAN_SP_FINISH_SELECT',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        }
    });



    //维修计划关联缺陷查询
    var defGridStore=Ext.create('Ext.data.Store',{
        id:'defGridStore',
        autoLoad:false,
        fields:['V_GUID','V_PROJECT_GUID','V_PORJECT_CODE','V_PORJECT_NAME','V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME'
            ,'D_DEFECTDATE','D_INDATE','V_PERCODE','V_PERNAME','V_IDEA','V_SOURCE_GRADE','V_LEVELNAME'],
        proxy:{
            type:'ajax',
            async:false,
            url:AppUrl + 'dxfile/PM_DEFECT_BY_PROPASS_SEL',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        }
    });
    var npanel=Ext.create('Ext.panel.Panel',{
        id:'npanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 50,
            displayField: 'V_DEPTNAME',
            valueField: 'V_SAP_DEPT',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 200,
            // listeners: {
            //     change: function (field, newValue, oldValue) {
            //         _ck_zyqload();
            //     }
            // },
            listConfig:{
                minWidth:40
            }
        },{
            id: 'begintime',
            xtype: 'datefield',
            fieldLabel: '申请日期',
            format: 'Y/m',
            editable: false,
            labelWidth: 55,
            queryMode: 'local',
            value: new Date(new Date()-7*24*60*60*1000),
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 175
        }, {
            id: 'endtime',
            xtype: 'datefield',
            fieldLabel: '至',
            format: 'Y/m',
            editable: false,
            labelWidth: 20,
            queryMode: 'local',
            value: mingtian,
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            labelAlign: 'right',
            width: 140/*,
             listeners: {
             change: function (field, newValue, oldValue) {
             _selectSbThird();
             }
             }*/
        },{
            id: 'qxcontent',
            xtype: 'textfield',
            fieldLabel: '缺陷内容',
            editable: false,
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: getgrid,
            style: 'margin: 5px 0px 10px 2px'
        }, {
            xtype: 'button',
            text: '关联维修申请',
            //icon: imgpath + '/add.png',
            handler: _fangxingjihua,
            style: 'margin: 5px 0px 10px 2px'
        },{
            xtype: 'button',
            text: '导出excel',
            icon: imgpath + '/excel.gif',
            width: 100,
            style: 'margin: 5px 0px 10px 2px',
            listeners: {
                click: ExcelButton
            }
        }
        ]

    });
    var cpanel=Ext.create('Ext.grid.Panel',{
        id:'cpanel',
        region:'center',
        columnLines:true,
        store: gridStore,
        autoScroll:true,
        columns:[
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text:'放行计划编码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'关联缺陷详情',dataIndex:'DEFNUM',align:'center',width:150,renderer:OpenDefDetail},
            {text:'放行计划编码',dataIndex:'V_PROJECT_CODE',align:'center',width:150},
            {text:'放行计划名称',dataIndex:'V_PROJECT_NAME',align:'center',width:150},
            {text:'放行计划内容',dataIndex:'V_CONTENT',align:'center',width:150},
            // {text:'检修单位编码',dataIndex:'V_REPAIR_DEPT',align:'center',width:150,hidden:true},
            // {text:'检修单位名称',dataIndex:'V_REPAIR_DEPT_TXT',align:'center',width:150},
            {text:'放行建设单位',dataIndex:'V_DEPTNAME',align:'center',width:150},
            {text:'放行计划开工时间',dataIndex:'V_DATE_B',align:'center',width:150,renderer:timeTurn},
            {text:'工程额度(万元）',dataIndex:'V_MONEY',align:'center',width:150},
            {text:'缺陷内容',dataIndex:'QXCONTEXT',align:'center',width:200}
        ],
        listeners:{
            itemclick:function(a,record){
                FXGUID=record.data.V_GUID;
            }
        }
    });

    //关联维修计划-缺陷窗口
    var toolPanel=Ext.create('Ext.panel.Panel',{
        id:'toolPanel',
        layout:'column',
        region:'north',
        heitht:'40%',
        frame:true,
        border:false,
        items:[
            {xtype:'button',text:'确认关联',id:'saveid',style:'margin:5 15 5 15'},
            {xtype:'button',text:'取消',id:'closeid'}
        ]
    });
    var choicePanel=Ext.create('Ext.grid.Panel',{
        id:'choicePanel',
        region:'north',
        columnLines:true,
        store:glGridStore,
        height:'40%',
        autoScroll:true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns:[
            {text:'缺陷唯一码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'V_PROJECT_GUID',dataIndex:'V_PROJECT_GUID',align:'center',width:150,hidden:true},
            {text:'缺陷内容',dataIndex:'V_DEFECTLIST',align:'center',width:150},
            {text:'缺陷等级',dataIndex:'V_LEVELNAME',align:'center',width:150},
            {text:'缺陷来源',dataIndex:'V_SOURCENAME',align:'center',width:150},
            {text:'缺陷日期',dataIndex:'D_DEFECTDATE',align:'center',width:150,renderer:timeTurn},
            {text:'负责人',dataIndex:'V_PERNAME',align:'center',width:200},
            {text:'缺陷录入日期',dataIndex:'D_INDATE',align:'center',width:150,renderer:timeTurn},
            {text:'处理意见',dataIndex:'V_IDEA',align:'center',width:200},
            {text:'关联维修计划编码',dataIndex:'V_PORJECT_CODE',align:'center',width:150},
            {text:'关联维修计划名称',dataIndex:'V_PORJECT_NAME',align:'center',width:150}
        ]
        });



    var wxPanel=Ext.create('Ext.grid.Panel',{
        id:'wxPanel',
        width:'50%',
        region:'west',
        store:wxGridStore,
        autoScroll:true,
        columns:[
            {text:'唯一值',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'申请厂矿编码',dataIndex:'V_ORGCODE',align:'center',width:150},
            {text:'申请厂矿名称',dataIndex:'V_ORGNAME',align:'center',width:150},
            {text:'工程项目编码',dataIndex:'V_PORJECT_CODE',align:'center',width:150},
            {text:'工程项目名称',dataIndex:'V_PORJECT_NAME',align:'center',width:150},
            {text:'申请厂矿编码',dataIndex:'V_ORGCODE',align:'center',width:150},
            {text:'申请厂矿名称',dataIndex:'V_ORGNAME',align:'center',width:150},
            {text:'维修内容',dataIndex:'V_CONTENT',align:'center',width:150}
        ],
        listeners:{
            itemclick:function(e,record){
                defStoreLoad(record.data.V_GUID);
            }
        }
    });
    var defPanel=Ext.create('Ext.grid.Panel',{
        id:'defPanel',
        width:'50%',
        region:'center',
        store:defGridStore,
        autoScroll:true,
        columns:[
            {text:'缺陷唯一码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'V_PROJECT_GUID',dataIndex:'V_PROJECT_GUID',align:'center',width:150,hidden:true},
            {text:'缺陷内容',dataIndex:'V_DEFECTLIST',align:'center',width:150},
            {text:'缺陷等级',dataIndex:'V_LEVELNAME',align:'center',width:150},
            {text:'缺陷来源',dataIndex:'V_SOURCENAME',align:'center',width:150},
            {text:'缺陷日期',dataIndex:'D_DEFECTDATE',align:'center',width:150,renderer:timeTurn},
            {text:'负责人',dataIndex:'V_PERNAME',align:'center',width:200},
            {text:'缺陷录入日期',dataIndex:'D_INDATE',align:'center',width:150,renderer:timeTurn},
            {text:'处理意见',dataIndex:'V_IDEA',align:'center',width:200},
            {text:'关联维修计划编码',dataIndex:'V_PORJECT_CODE',align:'center',width:150},
            {text:'关联维修计划名称',dataIndex:'V_PORJECT_NAME',align:'center',width:150}
        ],
        listeners:{
            itemclick:function(e,record){
                defInMain(record.data.V_GUID);
            }
        }
    });
    var centerPanel=Ext.create('Ext.panel.Panel',{
        id:'centerPanel',
        region:'center',
        layout:'border',
        frame:true,
        height:'50%',
        border:false,
        items:[wxPanel,defPanel]
    });
    var  wxWin=Ext.create('Ext.window.Window',{
        id:'wxWin',
        layout:'border',
        title: '维修计划缺陷添加',
        modal: true,
        frame: true,
        border:false,
        closeAction: 'hide',
        closable: true,
        width:760,
        height:500,
        items:[toolPanel,choicePanel,centerPanel]

    });

    /*查看详情*/
    var DefPanel=Ext.create('Ext.grid.Panel',{
        id:'DefPanel',
        region:'center',
        columnLines:true,
        store:glGridStore,
        height:'40%',
        autoScroll:true,
        // selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
        //     selType: 'checkboxmodel',
        //     mode: 'SIMPLE'
        // },
        columns:[
            {text:'缺陷唯一码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'V_PROJECT_GUID',dataIndex:'V_PROJECT_GUID',align:'center',width:150,hidden:true},
            {text:'缺陷内容',dataIndex:'V_DEFECTLIST',align:'center',width:150},
            {text:'缺陷等级',dataIndex:'V_LEVELNAME',align:'center',width:150},
            {text:'缺陷来源',dataIndex:'V_SOURCENAME',align:'center',width:150},
            {text:'缺陷日期',dataIndex:'D_DEFECTDATE',align:'center',width:150,renderer:timeTurn},
            {text:'负责人',dataIndex:'V_PERNAME',align:'center',width:200},
            {text:'缺陷录入日期',dataIndex:'D_INDATE',align:'center',width:150,renderer:timeTurn},
            {text:'处理意见',dataIndex:'V_IDEA',align:'center',width:200},
            {text:'关联维修计划编码',dataIndex:'V_PORJECT_CODE',align:'center',width:150},
            {text:'关联维修计划名称',dataIndex:'V_PORJECT_NAME',align:'center',width:150}
        ]
    });
    var DefView=Ext.create('Ext.window.Window',{
        id:'DefView',
        layout:'border',
        title: '维修计划缺陷添加',
        modal: true,
        frame: true,
        border:false,
        closeAction: 'hide',
        closable: true,
        width:760,
        height:500,
        items:[DefPanel]
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[npanel,cpanel]
    });
    getgrid();

});
function timeTurn(value,metaData,recode,store){
    metaData.style="text-align:center";
    var val=value.toString().substring(0,10);
    return '<div>'+val+'</div>';
}
//FX计划查找
function getgrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp("ck").getValue(),
        V_V_DEPTCODE: '',// Ext.getCmp("zyq").getValue(),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ZY: '',
        V_SDATE: Ext.getCmp("begintime").getSubmitValue(),
        V_EDATE: Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY: '',//Ext.getCmp('zy').getValue(),
        V_V_DEFECT: Ext.getCmp('qxcontent').getValue(),
        V_V_FLAG: ''
    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}
function _fangxingjihua(){
    if(FXGUID==""){
        Ext.Msg.alert('消息',"请选择一条放行计划");
        return false;
    }
    getGlStore(FXGUID);//放行关联缺陷查找
    // 要关联的维修计划查找
    Ext.data.StoreManager.lookup('wxGridStore').load({
        params:{
            V_SBSIGN:'0',
            V_SCODE:'100',
            V_PERCODE:'',
            V_ORGCODE:''
        }
    });
   Ext.getCmp("wxWin").show();
}
/*  放行关联缺陷查找 */
function getGlStore(FXGUID){
    Ext.data.StoreManager.lookup("glGridStore").load({
        params: {
            V_PROGUID: FXGUID,
            V_PERCODE: '',
            V_DEPTCODE: '',
            V_DATE: ''
        }
    });
}

function defStoreLoad(proguid){

    Ext.data.StoreManager.lookup("defGridStore").load({
        params:{
            V_V_PROGUID:proguid
        }
    });
}
function ExcelButton(){

    // V_V_ORGCODE: Ext.getCmp("ck").getValue(),
    //     V_V_DEPTCODE: '',// Ext.getCmp("zyq").getValue(),
    //     V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
    //     V_V_ZY: '',
    //     V_SDATE: Ext.getCmp("begintime").getSubmitValue(),
    //     V_EDATE: Ext.getCmp("endtime").getSubmitValue(),
    //     V_V_SPECIALTY: '',//Ext.getCmp('zy').getValue(),
    //     V_V_DEFECT: Ext.getCmp('qxcontent').getValue(),
    //     V_V_FLAG: ''
    var V_V_ZY = '0' ;
    var  V_V_DEPTCODE = '0' ;
    var V_V_SPECIALTY = '0' ;
    var V_V_FLAG = '0' ;

    document.location.href = AppUrl + 'dxfile/MAINTAIN_DEFECT_EXCEL?V_V_ORGCODE=' + Ext.getCmp("ck").getValue()
        + '&V_V_DEPTCODE=' + V_V_DEPTCODE
        + '&V_V_PERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_V_ZY=' + V_V_ZY
        + '&V_SDATE=' + Ext.getCmp("begintime").getSubmitValue()
        + '&V_EDATE=' + Ext.getCmp("endtime").getSubmitValue()
        + '&V_V_SPECIALTY=' + V_V_SPECIALTY
        +'&V_V_DEFECT='+Ext.getCmp('qxcontent').getValue()
        + '&V_V_FLAG=' + V_V_FLAG;
}

function OpenDefDetail(value,mateDate,record,column,row,store){
   mateDate.style='align-text:center';
   return '<a href="javascript:onDefDetail(\'' + record.data.V_GUID + '\')">'+value+'</a>';
}
function onDefDetail(fxguid){
    getGlStore(fxguid);
    Ext.getCmp("DefView").show();


}

function defInMain(defguid){
    Ext.Ajax.request({
        url:AppUrl + 'dxfile/MAINTAIN_BY_DEFECT_INSERT',
        method:'POST',
        async: false,
        params: {
            V_FXGUID:FXGUID,
            V_DEFECTGUID:defguid,
            V_INPER:Ext.util.Cookies.get('v_personcode'),
            V_DEPT: Ext.util.Cookies.get('v_deptcode'),
            V_ORDCODE:Ext.util.Cookies.get('v_orgCode')
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.RET=='SUCCESS'){
                getGlStore(FXGUID);
                alert("关联成功");
            }
        }
    });
}