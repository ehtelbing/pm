var gengxin = "";
var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;
var FXGUID="";
var gridList=[];
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    var ckstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckstore',
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
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                _ck_zyqload();
            }
        }
    });

    //     Ext.create("Ext.data.Store", {
    //     autoLoad: true,
    //     storeId: 'ckstore',
    //     fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'zdh/plant_sel',
    //         // url: 'PRO_BASE_DEPT_VIEW_ROLE',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         },
    //         extraParams: {
    //             IS_V_DEPTCODE: "",
    //             IS_V_DEPTTYPE: '[基层单位]'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             Ext.getCmp('ck').select(store.first());
    //             //ckstoreload = true;
    //             //_init();
    //         }
    //     }
    // });

    var zyqstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqstore',
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
        },
        listeners:{
            load:function(store,records){
                Ext.getCmp('zyq').select(store.first());
            }
        }

    });

    //     Ext.create("Ext.data.Store", {
    //     autoLoad: false,
    //     storeId: 'zyqstore',
    //     fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    //     proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'zdh/plant_sel',
    //         // url: 'PRO_BASE_DEPT_VIEW_ROLE',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         },
    //         extraParams: {}
    //     }),
    //     listeners: {
    //         load: function (store, records) {
    //             //alert(0.5);
    //             Ext.getCmp('zyq').select(store.first());
    //         }
    //     }
    // });


    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0,{'V_MAJOR_CODE':'%','V_MAJOR_NAME':'全部'});
                Ext.getCmp('zy').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 5,
        fields: ['ID', 'FX_GUID', 'V_GUID', 'V_GUID_UP', 'V_YEAR','V_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_REPAIR_DEPTCODE', 'V_REPAIR_DEPTNAME', 'V_PORJECT_CODE',
            'V_PORJECT_NAME', 'V_WBS', 'V_WBS_TXT', 'V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTY_ZX', 'V_SPECIALTY_ZXNAME',
            'V_SPECIALTYMANCODE', 'V_SPECIALTYMAN', 'V_WXTYPECODE', 'V_WXTYPENAME', 'V_JHLB', 'V_SCLB', 'V_CPZL',
            'V_CPGX', 'V_SGFS', 'V_ZBFS', 'V_SZ', 'V_SFXJ', 'V_CONTENT', 'V_MONEYBUDGET', 'V_BDATE',
            'V_EDATE', 'V_STATE', 'V_STATENAME', 'V_FLAG', 'V_LEVEL', 'V_INMAN', 'V_INMANCODE', 'V_INDATE', 'V_SUMTIME',
            'V_SUMDATE', 'V_MONEY', 'V_TYPE', 'V_SGMONEY', 'V_BJMONEY', 'V_CLMONEY', 'QXCONTEXT', 'V_PROJECT_CODE',
            'V_PROJECT_NAME', 'fx_money', 'V_DATE_B', 'V_DATE_E'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_FX_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var fxgridStore = Ext.create('Ext.data.Store', {
        id: 'fxgridStore',
        autoLoad: false,
        pageSize: 5,
        fields: ['V_GUID','V_YEAR','V_MONTH','V_ORGCODE','V_DEPTNAME','V_DEPTCODE',
            'V_DEPTNAME','V_PROJECT_CODE','V_PROJECT_NAME','V_WBS_CODE','V_WBS_NAME',
            'V_CONTENT', 'V_MONEY', 'V_REPAIR_DEPT','V_REPAIR_DEPT_TXT','V_FZR',
            'V_DATE_B','V_DATE_E','V_INPER','V_INTIEM','V_PORJECT_GUID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/MAINTAIN_RELEASE_POSTBACK_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var panel2 = Ext.create('Ext.Panel', {
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
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 200,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _ck_zyqload();
                    // _spload();
                    // zyq_jxdwload();

                }
            },
            listConfig:{
                minWidth:40
            }
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 50,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            labelAlign: 'right',
            style: ' margin: 5px 0px 0px 0px',
            width: 200,
            listeners: {
                select: function (field, newValue, oldValue) {
                    //_ck_zyqfzrload();
                    //zyq_jxdwload();
                    //_spload();
                }
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
        }, {
            id: 'zy',
            xtype: 'combo',
            store: zystore,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 30,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 140,
            labelAlign: 'right'
        }, {
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
            handler: queryGrid,
            style: 'margin: 5px 0px 10px 2px'
        }, {
            xtype: 'button',
            text: '关联放行计划',
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

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [ {
            text: '是否关联放行计划',
            dataIndex: 'FX_GUID',
            align: 'center',
            flex: 1,
            renderer:function(value,mateData,record,store){
                if(value==""){
                    return '<a href="javascript:viewFxDetails(\'' + value + '\')">' + "" + '</a>';
                }else{
                    return '<a href="javascript:viewFxDetails(\'' + value + '\')">' + "查看详情" + '</a>';
                }
            }
        }
        // , {
        //     text: '放行建设单位',
        //     dataIndex: 'V_PROJECT_NAME',
        //     align: 'center',
        //     flex: 1
        // }, {
        //     text: '放行计划金额',
        //     dataIndex: 'F_MONEY_GS',
        //     align: 'center',
        //     flex: 1
        // }, {
        //     text: '申请日期',
        //     dataIndex: 'D_DATE',
        //     align: 'center',
        //     flex: 1
        // }
            ,{
                text: '项目唯一值',
                dataIndex: 'V_GUID',
                align: 'center',
                flex: 1,
                hidden:true
            }
        ,{
            text: '项目编号',
            dataIndex: 'V_PORJECT_CODE',
            align: 'center',
            flex: 1
        },{
            text: '项目名称',
            dataIndex: 'V_PORJECT_NAME',
            align: 'center',
            flex: 1
        },{
            text: '缺陷内容',
            dataIndex: 'QXCONTEXT',
            align: 'center',
            flex: 1
        },{
            text: '计划开工日期',
            dataIndex: 'V_BDATE',
            align: 'center',
            flex: 1,
            renderer:timeTurn
        },{
                text: '计划竣工日期',
                dataIndex: 'V_EDATE',
                align: 'center',
                flex: 1
                ,renderer:timeTurn
            },{
            text: '专业',
            dataIndex: 'V_SPECIALTYNAME',
            align: 'center',
            flex: 0.5
        }
        // ,{
        //     text: '工程总概算(万元)',
        //     dataIndex: 'V_MONEYBUDGET',
        //     align: 'center',
        //     flex: 1
        // }
        ,{
            text: '工程总预算(万元)',
            dataIndex: 'V_MONEYBUDGET',
            align: 'center',
            flex: 1
        },{
            text: '检修单位',
            dataIndex: 'V_REPAIR_DEPTNAME',
            align: 'center',
            flex: 0.75
        },
        //     {
        //     text: '是否特殊抢修',
        //     dataIndex: 'I_RUSHTO',
        //     align: 'center',
        //     flex: 1
        // },
        {
            text: '录入人',
            dataIndex: 'V_INMAN',
            align: 'center',
            flex: 1
        },{
            text: '申请厂矿',
            dataIndex: 'V_ORGNAME',
            align: 'center',
            flex: 1
        },{
            text: '申请作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            flex: 1
        }]/*,
         bbar: ['->', {
         xtype: 'pagingtoolbar',
         id: 'gpage',
         dock: 'bottom',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: 'gridStore'
         }],*/
    });

    var fxpanel=Ext.create('Ext.panel.Panel',{
        id:'fxpanel',
        layout:'column',
        region:'north',
        defaults:{
            margin:'10px 0px 5px 10px'
        }
        ,items:[
            {
                xtype:'button',
                id:'saveBtn',
                text:'确认返回',
                icon:dxImgPath + '/tjsb.png',
                /*iconCls: 'buy-button',*/
                handler:saveClick
            },
            {xtype: 'button',text: '关闭',
                icon:dxImgPath + '/close.png',listeners:{click:winQxClose}}
        ]
    });
    var pxgrid=Ext.create('Ext.grid.Panel',{
        id:'pxgrid',
        region:'center',
        columnLines:true,
        store: fxgridStore,
        autoScroll:true,
        columns:[
            {text:'放行计划编码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'放行计划编码',dataIndex:'V_PROJECT_CODE',align:'center',width:150},
            {text:'放行计划名称',dataIndex:'V_PROJECT_NAME',align:'center',width:150},
            {text:'放行计划内容',dataIndex:'V_CONTENT',align:'center',width:150},
            {text:'放行建设单位',dataIndex:'V_DEPTNAME',align:'center',width:150},
            {text:'放行计划开工时间',dataIndex:'V_DATE_B',align:'center',width:150,renderer:timeTurn},
            {text:'工程额度(万元）',dataIndex:'V_MONEY',align:'center',width:150}
        ],
        listeners:{itemclick:function(a,record){
                FXGUID=record.data.V_GUID;
            }}
    });
    var fxwin=Ext.create('Ext.window.Window',{
        id:'fxwin',
        closeAction:'hide',
        layout:'border',
        width:650,
        height:350,
        items:[fxpanel,pxgrid]
    });
    var viewfxgrid=Ext.create('Ext.grid.Panel',{
        id:'viewfxgrid',
        region:'center',
        columnLines:true,
        store: fxgridStore,
        autoScroll:true,
        columns:[
            {text:'放行计划编码',dataIndex:'V_GUID',align:'center',width:150,hidden:true},
            {text:'放行计划编码',dataIndex:'V_PROJECT_CODE',align:'center',width:150},
            {text:'放行计划名称',dataIndex:'V_PROJECT_NAME',align:'center',width:150},
            {text:'放行计划内容',dataIndex:'V_CONTENT',align:'center',width:150},
            {text:'放行建设单位',dataIndex:'V_DEPTNAME',align:'center',width:150},
            {text:'放行计划开工时间',dataIndex:'V_DATE_B',align:'center',width:150,renderer:timeTurn},
            {text:'工程额度(万元）',dataIndex:'V_MONEY',align:'center',width:150}
        ]

    });
    var viewFxWin=Ext.create('Ext.window.Window',{
       id:'viewFxWin' ,
        closeAction:'hide',
        layout:'border',
        width:650,
        height:350,
        items:[viewfxgrid]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid]
    });

    queryGrid();
});


function timeTurn(value,metaData,recode,store){
    metaData.style="text-align:center";
    var val=value.toString().substring(0,10);
    return '<div>'+val+'</div>';
}
function viewFxDetails(value){
    queryFxGrid(value,'1');
    Ext.getCmp('viewFxWin').show();
}
function ExcelButton() {
    var V_V_IP = '';
    var V_V_FLAG = '审批通过';
    var zy="";
    // document.location.href=AppUrl + 'excel/FXJH_EXCEL?V_V_IP='+V_V_IP+
    //     '&V_V_PERCODE='+Ext.util.Cookies.get('v_personcode')
    //    + '&V_V_ORGCODE='+Ext.getCmp("ck").getValue()
    //    + '&V_V_DEPTCODE='+Ext.getCmp("zyq").getValue()
    //    + '&V_D_INDATE_B='+Ext.getCmp("begintime").getSubmitValue()
    //    + '&V_D_INDATE_E='+Ext.getCmp("endtime").getSubmitValue()
    //    + '&V_V_SPECIALTY='+ Ext.getCmp('zy').getValue()
    //    + '&V_V_DEFECT='+ Ext.getCmp('qxcontent').getValue()
    //    + '&V_V_FLAG='+ V_V_FLAG;
    if(Ext.getCmp('zy').getValue()=='%'){
        zy='1';
    }else{
        zy=Ext.getCmp('zy').getValue()
    }
    document.location.href=AppUrl + 'excel/FXGL_EXCEL?V_V_ORGCODE='+ Ext.getCmp("ck").getValue()+
        '&V_V_DEPTCODE='+Ext.getCmp("zyq").getValue()
        + '&V_V_PERCODE='+Ext.util.Cookies.get('v_personcode')
        + '&V_V_ZY='+''
        + '&V_SDATE='+Ext.getCmp("begintime").getSubmitValue()
        + '&V_EDATE='+Ext.getCmp("endtime").getSubmitValue()
        + '&V_V_SPECIALTY='+ zy
        + '&V_V_DEFECT='+  Ext.getCmp('qxcontent').getValue()
        + '&V_V_FLAG='+ '';
}
function queryFxGrid(value,sign){
    var fxgridStore = Ext.data.StoreManager.lookup('fxgridStore');
    fxgridStore.proxy.extraParams = {
        FX_GUID: value,
        V_SIGN:sign
    };
    fxgridStore.load();
}
function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp("ck").getValue(),
        V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ZY: '',
        V_SDATE: Ext.getCmp("begintime").getSubmitValue(),
        V_EDATE: Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_DEFECT: Ext.getCmp('qxcontent').getValue(),
        V_V_FLAG: ''

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _newapplication() {

    V_GUID = Ext.data.IdGenerator.get('uuid').generate();

    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    window.open(AppUrl + 'page/PM_22010101/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    // var matStockLevel = window.showModalDialog(AppUrl + 'page/PM_140701/index.html?IN_DEPARTCODE=' + Ext.getCmp("zyq").getValue() + '&V_V_GUID=' + records[0].get("V_GUID") + '&random=' + Math.random(), window, 'resizable=yes;  dialogWidth=1200px; dialogHeight=1000px');
    /*if (b) {
     _seltctFault();
     alert(b);
     Ext.example.msg('操作信息', '操作成功');

     //  Ext.data.StoreManager.lookup('faultItemStore').add(matStockLevel);
     //_seltctFault();
     }*/

}

function _ck_zyqload() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _fangxingjihua()
{
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    // var fxgrid=records[0].get('FX_GUID');
    var fxgrid;

    if (records.length < 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要关联的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    else {
        for(var i=0;i<records.length;i++){
            fxgrid=records[i].get('FX_GUID');
            if(fxgrid!=""){
                Ext.MessageBox.show({
                    title: '提示',
                    msg: '已有关联的放行计划，不可以重新关联,请重新选择',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        for(var k=0;k<records.length;k++){
        gridList.push(records[k].get('V_GUID'));
        }
        queryFxGrid(fxgrid,'0');
        Ext.getCmp('fxwin').show();
    }
    // V_GUID =  records[0].get('V_GUID');
    //console.log(V_GUID);


    // var owidth = window.document.body.offsetWidth ;
    // var oheight = window.document.body.offsetHeight ;
    // window.open(AppUrl + 'page/PM_22010501/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );


}

function shuaxin()
{
    queryGrid();
}

function saveClick(){
    for(var j=0;j<gridList.length;j++){
        Ext.Ajax.request({
            method:'POST',
            url:AppUrl+'dxfile/OVERHAUL_BY_MAINTAINRELEASE_IN',
            async:false,
            params:{
                V_FXGUID:FXGUID,//fxgridList[j],
                V_YEARGUID:gridList[j],
                V_PERCODE:Ext.util.Cookies.get('v_personcode')
            },
            success:function(response){
                var resp = Ext.decode(response.responseText);
                if (resp.RET == "SUCCESS") {
                    Ext.Msg.alert("操作提示","保存成功");
                    queryGrid();
                } else {
                    Ext.Msg.alert("操作提示","保存失败");
                    queryGrid();
                }
            }
        });
    }
}

function winQxClose(){
    Ext.getCmp('fxwin').close();
    gridList.splice(0,gridList.length);
    console.log(gridList);
}