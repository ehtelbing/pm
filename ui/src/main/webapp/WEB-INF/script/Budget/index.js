var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
Ext.onReady(function() {
	Ext.QuickTips.init();
	//厂矿
	var ckStore = Ext.create('Ext.data.Store', {
		id: 'ckStore',
		autoLoad: true,
		fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
		proxy: {
			type: 'ajax',
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
		}

	});
	var gridStore=Ext.create('Ext.data.Store', {
		id : 'gridStore',
		pageSize : 15,
		autoLoad : false,
		fields : ['ID',	'V_YWFW','V_ORGCODE','V_ORGNAME','V_CHARGECODE','V_CHARGENAME','V_MONEY','V_MONEY_ADD','V_MOENY_SUM','V_UPDATE','V_YEAR'
		],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'drawingManage/PRO_PM_PLAN_BUDGET_YEAR_SEL',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				totalProperty : 'total'
			}
		}
	});



	var panel=Ext.create('Ext.panel.Panel',{
		id:'panel',
		region:'center',
		width:'80',
		layout:'border',
		border:false,
		items:[{xtype:'panel',frame:true,width:'100%',region:'north',layout:'column',
			items:[
				{xtype : 'combo',queryMode : 'local',id : 'year',editable : false,	value:Ext.Date.format(new Date(),'Y'),store : new Ext.data.ArrayStore({fields : ['year_id','year_name'],data : []}),valueField : 'year_name',displayField : 'year_id',triggerAction : 'all',autoSelect : true,
				 style: 'margin: 5px 0px 5px 5px',labelWidth : 60,fieldLabel : '年份',
					listeners : {
						beforerender :  function(){
							var newyear = '2020';//Ext.Date.format(new Date(),'Y');//这是为了取现在的年份数
							var yearlist = [];
							for(var i = 1990;i<=newyear;i++){
								yearlist.push([i,i]);
							}
							this.store.loadData(yearlist);
						}
					} },
				{ xtype: 'combo', id: 'ck', store: ckStore, fieldLabel: '厂矿', style: ' margin: 5px 0px 5px 5px', labelWidth: 60, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
				{xtype:'button',text:'查询', style: ' margin: 5px 0px 5px 5px',icon: imgpath +'/search.png',handler:QueryGrid}
			]},
			{xtype:'grid',id:'grid', store: gridStore,columnLines : true,autoScroll : true,region:'center',border:false,
				columns:[{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
					{ text: '厂矿名称', dataIndex: 'V_ORGNAME', width: 120 ,renderer : CreateGridColumnTd},
					{ text: '费用科目', dataIndex: 'V_CHARGENAME', width: 100 ,renderer : CreateGridColumnTd},
					{ text: '预算', dataIndex: 'V_MONEY', width: 100 ,renderer : CreateGridColumnTd},
					{ text: '追加预算', dataIndex: 'V_MONEY_ADD', width: 100 ,renderer : CreateGridColumnTd}
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
		items : [panel]
	});
    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store){
		store.proxy.extraParams={
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
			V_V_YEAR:Ext.getCmp('year').getValue()
		}
	});
	Ext.data.StoreManager.lookup('ckStore').on('load',function(){
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

	});
});

function QueryGrid(){
	Ext.getCmp('page').store.currentPage = 1;
	Ext.data.StoreManager.lookup('gridStore').load({
		params:{
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
			V_V_YEAR:Ext.getCmp('year').getValue()
		}
	});
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}
