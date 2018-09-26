var treeid='';
var treename='';
var countSave=0;
Ext.onReady(function() {
    Ext.QuickTips.init();
    //厂矿
    var ckStore = Ext.create("Ext.data.Store", {
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
            extraParams:{
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[基层单位]'
            }
        }
    });
    //作业区
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
    //设备
    var sbStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'drawingManage/PRO_SAP_PM_EQU_P_BYZYQ',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        timeout: 600000
    });
    var gridStore=Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : ['V_ID','V_MATERIALCODE','V_DRAWINGNAME','V_DRAWINGDESCRIPTION','V_DRAWINGROUTE',
            'V_CREATER','V_CREATTIME','V_EQUID','V_EQUCODE','V_SPCODE','V_SPNAME','V_SPTYPE',
            'V_SPCODE_OLD','V_NUMBER','V_MEMO','D_DATE_EDITTIME','V_EDIT_GUID'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'drawingManage/PRO_BASE_DRAWING_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                totalProperty: 'total'
            }
        }

    });

    //var treeStore= Ext.create("Ext.data.TreeStore", {
    //    storeId : 'treeStore',
    //    autoLoad : false,
    //    fields : ['sid', 'text', 'parentid','V_EQUSITE']
    //});
    //
    //var treepanel=Ext.create('Ext.tree.Panel',{
    //    id:'tree',
    //    region:'west',
    //    width:'20%',
    //    rootVisible : false,
    //    store:treeStore,
    //    autoScroll: true,
    //    listeners:{itemclick:TreeChecked}
    //});

    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'center',
        width:'80',
        layout:'border',
        border:false,
        items:[{xtype:'panel',frame:true,width:'100%',region:'north',layout:'column',
            items:[{ xtype: 'combo', id: 'ck', store: ckStore, fieldLabel: '厂矿', style: ' margin: 5px 0px 5px 5px', labelWidth: 60, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
                { xtype: 'combo', id: 'zyq', store: zyqStore, fieldLabel: '作业区', style: ' margin: 5px 0px 5px 5px', labelWidth: 60, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
                { xtype: 'combo', id: 'sb', store: sbStore, fieldLabel: '设备', style: ' margin: 5px 0px 5px 5px', labelWidth: 60, width: 240,labelAlign: 'right', emptyText:'请选择作业区',editable: false, queryMode: 'local', displayField: 'V_EQUNAME', valueField: 'V_EQUCODE' },
                {xtype:'button',text:'查询', style: ' margin: 5px 0px 5px 5px',icon: imgpath +'/search.png',handler:QueryGrid}
            ]},
            {xtype:'grid',id:'grid', store: gridStore,columnLines : true,autoScroll : true,region:'center',border:false,
                columns:[{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
                    { text: '设备编号', dataIndex: 'V_EQUCODE', width: 120 ,renderer : toleft},
                    { text: '物料编号', dataIndex: 'V_MATERIALCODE', width: 100 ,renderer : toleft},
                    { text: '物料名称', dataIndex: 'V_SPNAME', width: 200 ,renderer : toleft},
                    { text: '物料类型', dataIndex: 'V_SPTYPE', width: 100 ,renderer : toleft},
                    { text: '图纸名称', dataIndex: 'V_DRAWINGNAME', width: 160 ,renderer : toleft},
                    { text: '图纸描述', dataIndex: 'V_DRAWINGDESCRIPTION', width: 160 ,renderer : toleft},
                    { text: '图纸路径', dataIndex: 'V_DRAWINGROUTE', width: 160 ,renderer : toleft}
                ],
                bbar: [{
                    id:'page',
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                    emptyMsg: '没有记录',
                    store: 'gridStore'
                }]
            }]
    });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel]//treepanel,
    });
    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store){
        store.proxy.extraParams={
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE:Ext.getCmp('sb').getValue(),//treeid,
            V_V_EQUNAME:'%'//Ext.getCmp('eququery').getValue()
        }
    });
    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt('0'));
    });
    Ext.getCmp('ck').on('select',function(){
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[主体作业区]'
            }
        });
    });

    Ext.getCmp('zyq').on('select',function(){
        //alert('999');
        Ext.data.StoreManager.lookup('sbStore').load({
            params:{
                V_V_PERSONCODE:'',//Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue()
            }
        });
        Ext.getCmp('sb').select(Ext.data.StoreManager.lookup('sbStore').getAt('0'));
        //QueryTree();
    });

    //Ext.data.StoreManager.lookup('treeStore').on('load',function(){
    //    countSave=1;
    //});
    ////设备树点击加号加载
    //Ext.getCmp("tree").on("beforeload",function(store,operation){
    //    if(operation.node.data.parentid==-1){
    //        Ext.apply(store.proxy.extraParams,{
    //                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
    //                V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
    //                V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
    //                V_V_EQUTYPECODE:'%',
    //                V_V_EQUCODE:operation.node.data.sid
    //            },
    //            store.proxy.url=AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE')
    //    }
    //});
});

function QueryTree(){
    Ext.getCmp('tree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'pm_19/PRO_SAP_PM_EQU_TREE',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:'%',
            V_V_EQUCODE:'%'
        }
    });
    Ext.getCmp('tree').store.load();
}

function TreeChecked(aa, record, item, index, e, eOpts){
    treeid=record.raw.sid;
    treename=record.raw.text;
    QueryGrid();
}

function QueryGrid(){
    var st=Ext.getCmp('sb').getValue();
    if(!Ext.getCmp('sb').getValue()){
        alert("请选择设备");
        return false;
    }
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE:Ext.getCmp('sb').getValue(),//treeid,
            V_V_EQUNAME:'%'//Ext.getCmp('eququery').getValue()
        }
    });
}

function beforeloadGridStore(store){}

function starSave(){
    if(countSave == 0){
        Ext.MessageBox.show({
            title: '正在刷新...',
            progressText: '加载中...',
            width: 300,
            progress: true,
            closable: false
        });

        var f = function(v) {
            return function () {
                if (v == 10) {
                    Ext.MessageBox.hide();
                    starSave();
                } else {
                    var i = v / (10);
                    Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '%');
                }
            };
        };
        for (var i = 1; i <= 10; i++) {
            setTimeout(f(i), i * 50);
        };
    }
}


function toleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnClickDeleteLink() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    window.open(AppUrl+'page/PM_19240108/index.html?V_V_EQUCODE='+records[0].get('V_EQUCODE')+'&V_DATE_B='+records[0].get('V_DATE_B'));
}