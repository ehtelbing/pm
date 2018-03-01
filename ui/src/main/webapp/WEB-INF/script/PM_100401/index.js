Ext.onReady(function () {
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,
        storeId : 'ckstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME','V_SAP_JHGC' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'lxm/PRO_BASE_DEPT_VIEW_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                'V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_DEPTTYPE':  '基层单位',
                'V_V_PERSON':  Ext.util.Cookies.get('v_personcode')
            }
        }
    });


    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME','V_SAP_DEPT'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'lxm/PRO_BASE_DEPT_VIEW_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var kfstore=Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'kfstore',
        fields : [ 'ID', 'STORE_DESC' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'oldR/Query_OldRepair_Room',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var gridStore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'gridStore',
        fields : [ 'KCID', 'MATERIALCODE','MATERIALNAME','UNIT','AMOUNT','STORENAME','UPDATEDATE','MATERILETALON','DEPARTCODE','DEPARTNAME','PLANTCODE','PLANTNAME','BARCODE'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'oldR/Query_OldRepair',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var panel=Ext.create('Ext.panel.Panel',{
        frame:true,
        region:'north',
        layout : 'column',
        width : '100%',
        height:30,
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        items:[{xtype : 'combo',id : "ck", store : ckstore, editable : false,queryMode : 'local',fieldLabel : '厂矿', displayField : 'V_DEPTNAME', valueField : 'V_DEPTCODE', labelWidth : 70,style : ' margin: 5px 0px 0px 10px', labelAlign : 'right' },
            {xtype : 'combo',id : "zyq", store : zyqstore, editable : false,queryMode : 'local',fieldLabel : '作业区', displayField : 'V_DEPTNAME', valueField : 'V_DEPTCODE', labelWidth : 70,style : ' margin: 5px 0px 0px 10px', labelAlign : 'right' },
            {xtype : 'combo',id : "kf", store : kfstore, editable : false,queryMode : 'local',fieldLabel : '库房', displayField : 'STORE_DESC', valueField : 'ID', labelWidth : 70,style : ' margin: 5px 0px 0px 10px', labelAlign : 'right' },
            {xtype:'textfield',fieldLabel:'旧件编码',id:'oldcode',labelWidth : 70,style : ' margin: 5px 0px 0px 10px', labelAlign : 'right'},
            {xtype:'textfield',fieldLabel:'旧件名称',id:'oldname',labelWidth : 70,style : ' margin: 5px 0px 0px 10px', labelAlign : 'right'}]
    });

    var panelButton=Ext.create('Ext.panel.Panel',{
        frame:true,
        region:'north',
        layout : 'column',
        width : '100%',
        height:35,
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        items:[
            {xtype : 'button', icon : '../../images/gif/search.png',text : '查询',style : ' margin: 5px 0px 5px 50px', width : 80,listeners: {click: QueryGrid}},
            {xtype : 'button', icon : '../../images/gif/search.png',text : '生成修旧工单',style : ' margin: 5px 5px 0px 10px', width : 110,listeners: {click: createOrder}},
            {xtype : 'button', icon : '../../images/gif/search.png',text : '导出Excel',style : ' margin: 5px 0px 5px 10px', width : 90,listeners: {click: OnButtonExcelClicked}}]
    });
    var grid= Ext.create('Ext.grid.Panel', {
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        height:'90%',
        store : gridStore,
        autoScroll : true,
        //baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        style : ' margin: 5px 0px 5px 5px',
        columns : [{xtype : 'rownumberer',width : 30,sortable : false},
            {text : '库存ID',dataIndex : 'KCID', align : 'center'},
            {text : '旧件编码',dataIndex : 'MATERIALCODE', align : 'center'},
            {text : '旧件名称',dataIndex : 'MATERIALNAME', align : 'center'},
            {text : '计量单位',dataIndex : 'UNIT', align : 'center'},
            {text : '库存数量',dataIndex : 'AMOUNT', align : 'center'},
            {text : '库房描述',dataIndex : 'STORENAME', align : 'center'},
            {text : '修改时间',dataIndex : 'UPDATEDATE', align : 'center'}
        ]/*,
        bbar : [ {
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            id : 'page',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : 'gridStore'
        } ]*/
    });

    Ext.create('Ext.container.Viewport', {
        split: true, autoScroll: true,
        layout: 'border',
        items: [panel,panelButton,grid]
    });

    Ext.data.StoreManager.lookup("ckstore").on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup("ckstore").getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
          params:{
              'V_DEPTCODE': Ext.getCmp('ck').getValue(),
              'V_DEPTTYPE':  '主体作业区',
              'V_V_PERSON':  Ext.util.Cookies.get('v_personcode')
          }
        })
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup("zyqstore").getAt(0));
        Ext.data.StoreManager.lookup('kfstore').load({
            params:{
                'V_SAP_PLANTCODE': Ext.getCmp('ck').valueModels[0].data.V_SAP_JHGC,
                'V_SAP_DEPARTCODE':Ext.getCmp('zyq').valueModels[0].data.V_SAP_DEPT
            }
        })
    });

    Ext.data.StoreManager.lookup('kfstore').on('load',function(){
        Ext.getCmp('kf').select(Ext.data.StoreManager.lookup("kfstore").getAt(0));
    });

    Ext.getCmp('ck').on('select',function(){
        Ext.data.StoreManager.lookup('zyqstore').load({
            params:{
                'V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_DEPTTYPE':  '主体作业区',
                'V_V_PERSON':  Ext.util.Cookies.get('v_personcode')
            }
        })
    });

    Ext.getCmp('zyq').on('select',function(){
        Ext.data.StoreManager.lookup('kfstore').load({
            params:{
                'V_SAP_PLANTCODE': Ext.getCmp('ck').valueModels[0].data.V_SAP_JHGC,
                'V_SAP_DEPARTCODE':Ext.getCmp('zyq').valueModels[0].data.V_SAP_DEPT
            }
        })
    })


    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_SAP_PLANTCODE : Ext.getCmp('ck').valueModels[0].data.V_SAP_JHGC,
            V_SAP_DEPARTCODE : Ext.getCmp('zyq').valueModels[0].data.V_SAP_DEPT,
            V_STOREID :Ext.getCmp('kf').getValue(),
            V_MAT_NO :Ext.getCmp('oldcode').getValue(),
            V_MAT_DESC :Ext.getCmp('oldname').getValue()
        }
    });

});

function QueryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        V_SAP_PLANTCODE : Ext.getCmp('ck').valueModels[0].data.V_SAP_JHGC,
        V_SAP_DEPARTCODE : Ext.getCmp('zyq').valueModels[0].data.V_SAP_DEPT,
        V_STOREID :Ext.getCmp('kf').getValue(),
        V_MAT_NO :Ext.getCmp('oldcode').getValue(),
        V_MAT_DESC :Ext.getCmp('oldname').getValue()
    })
}


function OnButtonExcelClicked(){
    document.location.href=AppUrl + 'oldR/Query_OldRepair_EXCEL?V_SAP_PLANTCODE='+Ext.getCmp('ck').valueModels[0].data.V_SAP_JHGC+
        '&V_SAP_DEPARTCODE='+Ext.getCmp('zyq').valueModels[0].data.V_SAP_DEPT+
        '&V_STOREID='+encodeURI(Ext.getCmp('kf').getValue())+
        '&V_MAT_NO='+encodeURI(Ext.getCmp('oldcode').getValue())+
        '&V_MAT_DESC='+Ext.getCmp('oldname').getValue();
}

function createOrder(){
    var record = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (record.length != 1) {
        alert('请选择一条记录');
        return;
    }

    window.open(AppUrl + "page/PM_100402/index.html?MATERIALCODE=" + record[0].data.MATERIALCODE
        + "&MATERIALNAME=" + record[0].data.MATERIALNAME
    + "&KCID=" + record[0].data.KCID ,
        "", "dialogHeight:700px;dialogWidth:1100px");
}