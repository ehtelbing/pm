 
var type= '';
if(location.href.split('?')[1]!=null){ 
	type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext.onReady(function() {
			/** 负责人 */
	var responsibleStore = Ext.create("Ext.data.Store", {
		autoLoad : false,
		storeId : 'responsibleStore',
		fields : [ 'USERID', 'USERNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	
    var billStateStore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'billStateStore',
		fields : [ 'ORDER_STATUS', 'ORDER_STATUS_DESC' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams :{
			    parName : [],
				parType : [],
				parVal : [],
				proName : 'pro_dj_orderstatus',
				cursorName : 'P_CUR'
			}
		}
	});	
	
	 
	
	
	var checkPlantStore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'checkPlantStore',
		fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams :{
			    parName : ['usercode_in','plantcode_in'],
				parType : ['s','s'],
				parVal : [Ext.util.Cookies.get("mm.userid"),
				          Ext.util.Cookies.get("mm.plantcode")
				],
				proName : 'pro_dj603_menddept',
				cursorName : 'P_CUR'
			}
		}
	});	
	
	
     var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        pageSize:200,
        fields : ['APPLY_DEPART','APPLY_DEPARTNAME','APPLY_ID','APPLY_PLANT','APPLY_PLANTNAME','DJ_NAME','DJ_UQ_CODE',
                  'FLAG','INSERTDATE','INSERT_USERID','INSERT_USERNAME','MEND_CONTEXT','ORDERID','ORDER_FLAG','PLAN_BEGINDATE',
                  'PLAN_ENDDATE','REC_DEPART','REC_FLAG','REC_PLANT','REC_USERID','REC_USERNAME','REMARK','NEXT_STATUS','ORDER_STATUS1','MEND_USERNAME','MENDDEPT_NAME','DJ_VOL','F_MONEY','APPLYORDERID','APPLYPLANTNAME','MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
 
    
    var deptStore = Ext.create("Ext.data.Store", {
		autoLoad : false,
		storeId : 'deptStore',
		fields : [ 'DEPARTCODE','DEPARTNAME'],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/orgModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});	

	var toPlantStore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'toPlantStore',
		fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams :{
			    parName : [],
				parType : [],
				parVal : [],
				proName : 'pro_dj401_mendplant',
				cursorName : 'P_CUR'
			}
		}
	});	
	
	var list1 = Ext.create('Ext.panel.Panel', {
		region : 'north',
		bodyStyle: {background: 'none'},
		border:0,
		defaults : {
			labelAlign:'right',
			labelWidth:60
		},
		items : [{
			frame : true,
			style:'margin-bottom:1px',
		    defaults : {
				labelAlign:'right',
				labelWidth:60
		    },
		    layout: {
		        type: 'table',
		        columns: 3
		    },
		    items:[
		         {id : 'plant', xtype : 'combobox', fieldLabel : '检修单位',store:checkPlantStore,editable:false,displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE', queryMode: 'local'},
				 {id : 'responsible',xtype : 'combobox',fieldLabel : '负责人',editable : false,queryMode : 'local',labelAlign : 'right',displayField : 'USERNAME',valueField : 'USERID',store : responsibleStore},
		         {id:'djcode', xtype: 'textfield',fieldLabel: '电机编号'},
		         {id:'djname', xtype: 'textfield',fieldLabel: '电机名称'},
		         {id:'djvol', xtype: 'textfield',fieldLabel: '电机容量'},
		         {id:'begindate', xtype: 'datefield',fieldLabel: '起始日期',format:'Y-m-d',value:getDate()},
		         {id:'enddate', xtype: 'datefield',fieldLabel: '结束日期',format:'Y-m-d',value:getDate("end")},
		         {id:'billcode', xtype: 'textfield',fieldLabel: '工单号'},
		         {id : 'state', xtype : 'combobox', fieldLabel : '工单状态',store:billStateStore,editable:false,displayField: 'ORDER_STATUS_DESC', valueField: 'ORDER_STATUS', queryMode: 'local'},
		         {colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
		         items:[
		             {xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'button',text:'导出到Excel',id:'excel',margin:'0px 0px 0px 10px',icon:imgpath+'/311.gif'}
		         ]}
		    ]}
		]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		autoScroll : true,
		store :gridStore,
		columns : [ 
		          { text : '详细信息', align : 'center',width:60,
				    renderer:function(value,meta,record){
						return '<a href="javascript:detail(\''+record.data.ORDERID+'\');">详细信息</a>';
					} 
				  },
				  { text : '委修票', align : 'center',width:60,
				    renderer:function(value,meta,record){
						return '<a href="javascript:bill(\''+record.data.ORDERID+'\');">打印</a>';
					} 
				  },
				  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:100,renderer:left},
				  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:80,renderer:ondjdetail}, 
				  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:120,renderer:left}, 
				  { text : '电机容量', dataIndex : 'DJ_VOL', align : 'center',width:80,renderer:left}, 
				  { text : '维修类别', dataIndex : 'MEND_TYPE',  align : 'center',width:80,renderer:left}, 
				  { text : '维修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:200,renderer:left}, 
				  { text : '检修班组', dataIndex : 'MENDDEPT_NAME',  align : 'center',width:110,renderer:left}, 
				  { text : '消耗物资合计', dataIndex : 'F_MONEY', width:100,renderer:format_money}, 
				  { text : '负责人', dataIndex : 'MEND_USERNAME',  align : 'center',width:110,renderer:left}, 
				  { text : '工单状态', dataIndex : 'ORDER_STATUS1',  align : 'center',width:80,renderer:left}, 
				  { text : '下一状态', dataIndex : 'NEXT_STATUS',  align : 'center',width:80,renderer:left},
				  { text : '送修单号', dataIndex : 'APPLYORDERID',  align : 'center',width:100,renderer:left},
				  { text : '送修单位', dataIndex : 'APPLYPLANTNAME',  align : 'center',width:100,renderer:left}
		],
		bbar: ['->',
			{ xtype: 'pagingtoolbar',
		      id:'pagingtoolbar',
	          dock: 'bottom',
	          displayInfo: true,
	          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	          emptyMsg: '没有记录',
	          store: gridStore
			}
		]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [list1, grid]
	});
	 
	 
	
	gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['MENDDEPT_CODE_in','DJ_UQ_CODE_in','DJ_NAME_in','startDate','endDate','ORDERID_in','ORDER_STATUS_in','person_in','dj_vol_in'],
					parType : ['s','s','s','da','da', 's','s', 's','s'],
					parVal : [Ext.getCmp('plant').getValue(),
					          Ext.getCmp('djcode').getValue(),
					          Ext.getCmp('djname').getValue(),
					          Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
					          Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
					          Ext.getCmp('billcode').getValue(),
					          Ext.getCmp('state').getValue(),
						      Ext.getCmp('responsible').getValue(),
						      Ext.getCmp('djvol').getValue()
					],
					proName : 'pro_dj603_selectorderlist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	});
	Ext.getCmp('query').on('click',query);

    checkPlantStore.on('load',function(){
		Ext.getCmp('plant').select(checkPlantStore.getAt(0));
			responsibleStore.load({
				params : {// 负责人与检修班组联动
					parName : [ 'MENDDEPT_CODE_in' ],
					parType : [ 's' ],
					parVal : [ Ext.getCmp('plant').getValue() ],
					proName : 'pro_dj601_person',
					cursorName : 'ret'
				}
			});
	});
     
     
    billStateStore.on('load',function(){
    	billStateStore.insert(0,{'ORDER_STATUS':'%' ,'ORDER_STATUS_DESC': '全部'});
    	billStateStore.sort('ORDER_STATUS','ASC');
    	Ext.getCmp('state').select(billStateStore.getAt(0));
    });
   
	Ext.getCmp('plant').on('change', function() {
		responsibleStore.load({
			params : {// 负责人与检修班组联动
				parName : [ 'MENDDEPT_CODE_in' ],
				parType : [ 's' ],
				parVal : [ Ext.getCmp('plant').getValue() ],
				proName : 'pro_dj601_person',
				cursorName : 'ret'
			}
		});
	});

	responsibleStore.on('load', function() {
        responsibleStore.insert(0,{'USERID':'%','USERNAME':'全部'}); 
		Ext.getCmp('responsible').select(responsibleStore.getAt(0));
	});
    Ext.getCmp('excel').on('click',expExcel);

});
    function expExcel(){
    	
		var tableName = [ '序号', '工单号', '电机编号', '电机名称','维修类别','维修内容', '检修班组', '负责人', '工单状态','下一状态','送修单号','送修单位'];
		var tableKey = [ 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME','MEND_TYPE','MEND_CONTEXT','MENDDEPT_NAME','MEND_USERNAME','ORDER_STATUS','NEXT_STATUS','APPLYORDERID','APPLYPLANTNAME'];
		var parName = ['MENDDEPT_CODE_in','DJ_UQ_CODE_in','DJ_NAME_in','startDate','endDate','ORDERID_in','ORDER_STATUS_in','person_in','dj_vol_in'];
		var parType = ['s','s','s','da','da', 's','s', 's','s'];
		var parVal = [ 
		            Ext.getCmp('plant').getValue()==""?'null':Ext.getCmp('plant').getValue(),
		            Ext.getCmp('djcode').getValue()==""?'null':Ext.getCmp('djcode').getValue(),
		            Ext.getCmp('djname').getValue()==""?'null':Ext.getCmp('djname').getValue(),
		            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
		            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
		            Ext.getCmp('billcode').getValue()==""?'null':Ext.getCmp('billcode').getValue(),
		            Ext.getCmp('state').getValue(),
					Ext.getCmp('responsible').getValue(),
					Ext.getCmp('djvol').getValue()==""?'null':Ext.getCmp('djvol').getValue()
		];
		var proName = 'pro_dj603_selectorderlist';
		var cursorName = 'RET';
		var returnStr = ['null'];
		var returnStrType = ['null'];
	    var returnStrName = ['null'];
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,parVal, proName, returnStr, returnStrType, returnStrName,cursorName, "tital", "检修工单浏览");
    }
    
     function getDate(type) {
		var d = new Date();
		var month = d.getMonth()+1;
		if(month<10){month="0"+month;}
		var date = '';
		if(type==null){
			date =  d.getFullYear()+"-"+month+"-01";
		}else{
			var days = new Date(d.getFullYear(), d.getMonth()+1, 0);
			date = days.getDate(); 
		}
		return date;
	}
	function query(){ 
		Ext.data.StoreManager.lookup('gridStore').load();
	} 
	
	function ondjdetail(value,meta){
		meta.style='text-align:left;';
	    return '<a href="'+APP+'/page/DJ/DJ202_menu.jsp?djcode='+value+'" target="_blank">'+value+'</a>';
	}
	function left(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:left;"; return value;
    }
    function right(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:right;"; return value;
    }
	function format_money(value, metaData, record, rowIndex, colIndex, store)
	{
		 metaData.style = "text-align:right;"; 
		 return Ext.util.Format.usMoney(value);
	}
	function detail(value){
  	     window.open(APP+"/page/DJ/DJ60301.jsp?orderid="+ value, null, "dialogWidth=1200px;dialogHeight=550px");
	}
    function bill(value){
      	window.open(APP+"/page/DJ/DJ60302.jsp?orderid="+value, null, "dialogWidth=1200px;dialogHeight=550px");
    }