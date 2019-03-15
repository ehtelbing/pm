var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var num=0;
var listLeng=0;
var date=new Date();

var yearList=[];
for(var i=date.getFullYear()-2;i<=date.getFullYear()+2;i++){
    yearList.push({id:i,name:i});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    autoLoad: true,
    fields:['id','name'],
    data:yearList,
    proxy:{
        type:'memory',
        reader:{type:'json'}
    }
});
var monthList=[];
for( var m=1;m<=12;m++){
    monthList.push({id:'%',name:'全部'});
    monthList.push({id:m,name:m});
}
var monthStore=Ext.create('Ext.data.Store',{
    id:'monthStore',
    autoLoad: true,
    fields:['id','name'],
    data:monthList,
    proxy:{
        type:'memory',
        reader:{type:'json'}
    }
});

//厂矿
var orgStore = Ext.create('Ext.data.Store', {
    id: 'orgStore',
    autoLoad: true,
    fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
            'V_V_PERSONCODE': V_V_PERSONCODE,
            'V_V_DEPTCODE': V_V_DEPTCODE,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('V_V_ORGCODE').select(store.first());
        }
    }
});
//部门
var deptStore = Ext.create('Ext.data.Store', {
    id: 'deptStore',
    autoLoad: false,
    fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
    listeners: {
        load: function (store, records) {
            Ext.getCmp('V_V_DEPTCODE').select(store.first());
        }
    }
});
// gridStore
var gridStore=Ext.create('Ext.data.Store',{
    id:'gridStore',
    autoLoad:false,
    fields:['V_MONTH','EQUTYPECODE','EQUTYPENAME','GUIDNUM','WORKIDNUM'],
    proxy:{
        type:'ajax',
        async:false,
        url:AppUrl+'dxfile/PM_14_FAULT_ITEM_STAT_NUM',
        actionMethods:{
            read:'POST'
        },
        reader:{
            type:'json',
            root:'list'
        }
    }
});
var northpanel=Ext.create("Ext.panel.Panel",{
   id:'northpanel',
    layout:'column',
    region:'north',
    frame:true,
    border:false,
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    items:[
        {
            xtype:'combo',
            id: 'yearid',
            store: yearStore,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            fieldLabel: '年  份',
            editable: false,
            labelWidth: 70,
            value:date.getFullYear(),
            width: 250
        },{
            xtype:'combo',
            id: 'monthid',
            store: monthStore,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            fieldLabel: '月  份',
            editable: false,
            labelWidth: 70,
            value:'%',
            width: 250
        },{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            store: orgStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectDept();
                }
            }
        },
        {
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            width: 250
        },
        {
            xtype:'button',
            id:'btn',
            text:'查询',
            handler:selectData
        }
    ]
});
var gridpanel=Ext.create('Ext.grid.Panel',{
    id:'gridpanel',
    region:'center',
    store:gridStore,
    columnLines:true,
    autoExpandColumn:'pipeInfoName',
    loadMask:true,
    viewConfig:{forceFit:true},
    enableColumnHide:false,
    enableColumnMove:false,
    enableColumnResize:false,
    columns:[
        {header:'月份',dataIndex:'V_MONTH',align: 'center', width: 100},
        {header:'设备类型编码',dataIndex:'EQUTYPECODE',align: 'center', width: 120,hidden:true},
        {header:'设备类型名称',dataIndex:'EQUTYPENAME',align: 'center', width: 150},
        {header:'事故数量(个）',dataIndex:'GUIDNUM',align: 'center', width: 150},
        {header:'已处理数量（个）',dataIndex:'WORKIDNUM',align: 'center', width: 150}
    ]
});
Ext.onReady(function(){
   Ext.create('Ext.container.Viewport',{
      id:'main',
       layout:'border',
       items:[northpanel,gridpanel]
   });

    Ext.data.StoreManager.lookup("gridStore").on('load',function(store, records, success, eOpts){
        num=store.getProxy().getReader().rawData.NUM;
        listLeng=Ext.getStore('gridStore').getProxy().getReader().rawData.list.length
    });
  Ext.getCmp("gridpanel").getStore().on('load',function(){
      var len=listLeng/num;
      for(var j=0;j<=listLeng;j=j+parseInt(num)){
          spanfun(Ext.getCmp("gridpanel"),parseInt(j),0,'row',parseInt(num));
      }
      // spanfun(Ext.getCmp("gridpanel"),0,0,'row',num);
  });

    _selectDept();

});
function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore.currentPage = 1;
    deptStore.load();
}
function selectData(){
    Ext.data.StoreManager.lookup("gridStore").load({
        params:{
            V_V_ORGCODE:Ext.getCmp("V_V_ORGCODE").getValue(),
            V_V_DEPTCODE:Ext.getCmp("V_V_DEPTCODE").getValue(),
            V_V_PERSONCODE:V_V_PERSONCODE,
            V_V_EQUTYPE:'',
            V_V_EQUCODE:'',
            V_V_EQUCHILD_CODE:'',
            V_V_FAULT_TYPE:'',
            V_V_FAULT_YY:'',
            V_V_YEAR:Ext.getCmp("yearid").getValue(),
            V_V_MONTH:Ext.getCmp("monthid").getValue()
        }
    });
}
