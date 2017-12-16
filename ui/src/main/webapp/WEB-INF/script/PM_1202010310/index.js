var imgid = '';
Ext.onReady(function() {
	// 作业区
	var gzpalceStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'gzpalceStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				IS_V_DEPTTYPE: '[主体作业区]'
			}
		}
	});
	// 设备选择STORE
	var sbxzStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'sbxzStore',
		fields : [ 'EQU_DESC', 'EQU_ID' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

	// 周期类型
	var fzrStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'fzrStore',
		fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_12/PRO_RUN_CYCLE_ABLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

	/**gridStore1*/
	var gridStore1 = Ext.create('Ext.data.Store', {
			id : 'gridStore1',
			autoLoad : false,
			fields : ['KC_ID', 'MATERIALCODE', 'MATERIALNAME', 'UNIT',
			'ELATON', 'F_PRICE','KCAMOUNT', 'KC_MONEY', 'PLANTCODE','PLANTNAME','DEPARTCODE',
			'DEPARTNAME','STOREID','STORENAME','INSERTDATE'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'PM_12/PRO_RUN7127_SELECTKC',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				}
			}
		});
		
	/**gridStore2*/
	var gridStore2 = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'gridStore2',
	fields : [ 'BJ_DESC', 'BJ_UNIQUECODE', 'ALERT_CONTEXT', 'ALERT_STATUS',
			'HANDLE_CONTEXT', 'ALERT_ID', 'HANDLE_USERNAME', 'HANDLE_DATE',
			'INSERTDATE', 'EQU_DESC', 'USERNAME', 'STATUS', 'SITE_DESC',
			'UPDATEPERSON', 'MEND_DEPART', 'MEND_PERSON', 'REMARK',
			'HANDLE_USERID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7115_SELECT',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	   }
    });	
	/**gridStore3*/
    var gridStore3 = Ext.create("Ext.data.Store", {
		id : 'gridStore3',
		autoLoad : false,
		fields : [ 'CHANGEDATE', 'BJ_UNIQUE_CODE',
				'MATERIALCODE', 'MATERIALNAME',
				'UNIT', 'BJ_STATUS', 'EQU_NAME',
				'SITE_DESC', 'DEPARTNAME',
				'SUPPLY_CODE', 'SUPPLY_NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_12/PRO_RUN_BJ_USE_ALL',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		}
    })
    var store1 = Ext.create('Ext.data.JsonStore', {
		fields : [ 'name', '报警值', '作业量' ]

	});

	var chart = Ext.create('Ext.chart.Chart', {
		style : 'background:#fff',
		animate : true,
		shadow : true,
		store : store1,
		region : 'center',
		legend : {
			position : 'right'
		},
		axes : [ {
			/** x轴 */
			type : 'Numeric',
			position : 'bottom',
			fields : [ '报警值', '作业量' ],
			minimum : 0,
			label : {
				renderer : Ext.util.Format.numberRenderer('0,0')
			},
			grid : true,
			title : '作业量'
		},

		{
			/** 左侧分类 - y轴 */
			type : 'Category',
			position : 'left',
			fields : [ 'name' ],
			title : ''
		} ],
		series : [ {
			type : 'bar',
			axis : 'bottom',
			xField : 'name',
			yField : [ '报警值', '作业量' ]
		} ]
	});
	
	var creatpanel1 = Ext.create('Ext.form.Panel', {
		id : 'creatpanel1',
		style : 'margin:5px 0px 2px 2px',
		region : 'north',
		width : '100%',
		//baseCls : 'my-panel-no-border',
		defaults : {
			style : 'margin:5px 0px 5px 10px',
			labelAlign : 'right'
		},
		layout : {
			type : 'vbox'
		},
		items : [ {
			xtype : 'panel',
			region : 'center',
			layout : 'column',
			baseCls : 'my-panel-no-border',
			defaults : {
				labelAlign : 'right',
				labelWidth : 50
			},
			items : [ {
				xtype : 'combo',
				id : 'zyq',
				store : gzpalceStore,
				fieldLabel : '作业区 ',
				editable : false,
				style : 'margin:5px 0px',
				queryMode : 'local',
				valueField : 'V_DEPTCODE',
				displayField : 'V_DEPTNAME'
			}, {
				xtype : 'combo',
				id : 'xzsb',
				store : sbxzStore,
				fieldLabel : '设备 ',
				editable : false,
				style : 'margin:5px 0px',
				queryMode : 'local',
				valueField : 'EQU_ID',
				displayField : 'EQU_DESC',
				labelWidth : 45
			}, {
				xtype : 'combo',
				id : 'fzr',
				store : 'fzrStore',
				fieldLabel : '周期类型 ',
				editable : false,
				style : 'margin:5px  0px 5px 5px',
				queryMode : 'local',
				valueField : 'CYCLE_ID',
				displayField : 'CYCLE_DESC',
				labelWidth : 65
			}, {
				id:'query',
				xtype : 'button',
				text : '查询',
				icon : imgpath + '/search.png',
				width : 60,
				style : {
					margin : '5px 0px 10px 10px'
				}
			},
			
			{
				id:'equQuery',
				xtype : 'button',
				text : '在用备件VG监控',
				icon : imgpath + '/gears.png',
				width : 120,
				style : {
					margin : '5px 0px 10px 10px'
				}
			}

			]
		} ]
	});

	
	/**grid1*/
	var grid1 = Ext.create("Ext.grid.Panel", {
			title:'设备在库备件统计',
			id : 'grid1',
			columnLines : true,
			columnWidth: 0.34,
			width : '100%',
			store : gridStore1,
			autoScroll : true,
			columns : [
					 { text : '物料号',dataIndex : 'MATERIALCODE',align : 'center',flex:1}, 
					 { text : '物料描述 ', dataIndex : 'MATERIALNAME', align : 'center', flex:1},  
					 { text : '库存数量 ', dataIndex : 'KCAMOUNT', align : 'center', flex:1}
					 ]
		 });
	/**grid2*/	 
	var grid2 = Ext.create("Ext.grid.Panel", {
			title:'报警信息统计',
			id : 'grid2',
			region : 'center',
			columnLines : true,
			store : gridStore2,
			autoScroll : true,
			columns : [  
				 { text : '备件安装位置 ', dataIndex : 'SITE_DESC', align : 'center', flex:1 }, 
				 { text : '备件描述 ', dataIndex : 'BJ_DESC', align : 'center', flex:1 }, 
				 { text : '报警内容 ', dataIndex : 'ALERT_CONTEXT', align : 'center', flex:1 } 
			 ]
		});
    /**grid3*/
	var grid3 = Ext.create('Ext.grid.Panel', {
		    title:'备件安装位置更换时间统计',
			id : 'grid3',
			region : 'center',
			columnLines : true,
			store : gridStore3,
			autoScroll : true,
			columns : [{text : '备件安装位置', flex:1, dataIndex : 'SITE_DESC',align : 'center'},
					   {text : '设备描述', flex:1, dataIndex : 'EQU_NAME', align : 'center'},
					   {text : '更换时间', flex:1, dataIndex : 'CHANGEDATE', align : 'center'}
				]
			});
    
    
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel1,
		          chart,
		{
			region : 'south',
			layout : {
				type : 'column'
			},
			defaults:{
			     columnWidth: 0.33,height:200
			},
			items : [grid1,grid2,grid3]
		}
		
		]
	});

	/** 作业区 - 事件 */
	gzpalceStore.on('load',
			function() {
				/*gzpalceStore.insert(0, {
					'V_DEPTCODE' : '%',
					'V_DEPTNAME' : '全部'
				});*/
				gzpalceStore.sort('V_DEPTCODE', 'ASC');
				Ext.getCmp('zyq').select(gzpalceStore.getAt(0));
				// 默认当前登录用户工作区
				var storeDataList = gzpalceStore.data;
				var storeLength = storeDataList.length;
				for ( var index = 0; index < storeLength; index++) {
					var storeItemData = storeDataList.items[index].data;
					if (storeItemData.V_DEPTCODE == Ext.util.Cookies
							.get('v_deptcode')) {
						Ext.getCmp("zyq").setValue(
								Ext.util.Cookies.get('v_deptcode'));
						break;
					}
				}

				/** 设备加载 */
				Ext.data.StoreManager.lookup('sbxzStore').load({
					params : {
						V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
						V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
					}
				});
			});

	/** 设备 - 事件 */
	sbxzStore.on('load', function() {
		/*sbxzStore.insert(0, {
			'EQU_ID' : '%',
			'EQU_DESC' : '全部'
		});*/
		sbxzStore.sort('EQU_ID', 'ASC');
		Ext.getCmp('xzsb').select(sbxzStore.getAt(0));

		query1();
		query2();
		query3();
		queryChart();
	});
	/** 周期类型 - 事件 */
	Ext.data.StoreManager.lookup('fzrStore').on('load', function() {
		/*Ext.getCmp('fzr').store.insert(0, {
			'CYCLE_ID' : '%',
			'CYCLE_DESC' : '全部'
		});*/
		Ext.getCmp('fzr').store.sort('CYCLE_ID', 'ASC');
		Ext.getCmp('fzr').select(fzrStore.getAt(0));
	});

	/** 作业区 -> 设备 联动 */
	Ext.getCmp('zyq').on('select', function() {
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});

	function queryChart() {
		Ext.Ajax.request({
			async : false,
			url : AppUrl + 'PM_12/PRO_RUN_EQU_BJ_ALERT_ALL',
			method : 'POST',
			params : {
				A_EQUID:Ext.getCmp('xzsb').getValue(),
				A_CYCLE_ID:	Ext.getCmp('fzr').getValue()
			},
			success : function(response, options) {
				var resp = Ext.JSON.decode(response.responseText);
				var data = [];
				Ext.Array.each(resp.list,
						function(name, index, countriesItSelf) {
							data.push({
								name : name.SITE_DESC,
								报警值 : name.ALERT_VALUE,
								作业量 : name.SUM_YEILD
							})
						});
				store1.loadData(data);
			}
		});
	}
	
	Ext.getCmp('query').on('click',function(){
	
		queryChart();
		query1();
		query2();
		query3();
	});		
			
	Ext.getCmp('equQuery').on('click',function(){
		Ext.Ajax.request({
			url : AppUrl + 'PM_12/PRO_RUN7129_EQUVGURL',
			method : 'POST',
			async : false,
			params : {
				V_EQU_ID:Ext.getCmp('xzsb').getValue()
			},
			success : function(response) {
				var resp = Ext.JSON.decode(response.responseText);
				if(resp.RET!=""){
				    window.open(resp.RET,'', "dialogWidth:800px;dialogHeight:520px");
				}else{
				   Ext.Msg.alert('操作信息','没有找到相应VG监控');
				}
			}
		});
	});	
			
	function query1(){
		Ext.data.StoreManager.get('gridStore1').load({
			params : {
				V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_DEPARTCODE:Ext.getCmp('zyq').getValue(),
				V_EQU_ID: Ext.getCmp('xzsb').getValue()
			}
		});
	}
	
	function query2() {
		Ext.data.StoreManager.lookup('gridStore2').load({
			params : {
				V_V_DEPARTCODE:Ext.getCmp('zyq').getValue(),
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_BJ_ID:Ext.getCmp('xzsb').getValue(),
				V_V_USERID:Ext.getCmp('fzr').getValue()
			}
		});
	}
	
	function query3(){
		var date = new Date();
		var year = date.getFullYear();
		var month = (date.getMonth());
		var day = date.getDate();
		
		Ext.data.StoreManager.lookup('gridStore3').load({
			params : {
				A_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				A_DEPARTCODE:Ext.getCmp('zyq').getValue(),
				A_EQUID:Ext.getCmp('xzsb').getValue(),
				A_BJ_UNIQUE_CODE:'',
				A_BEGINDATE:Ext.Date.format(new Date(year,1,1), 'Y-m-d'),
				A_ENDDATE:Ext.Date.format(new Date(), 'Y-m-d')
			}
		})
	}
});

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}

function findcode(a, record, item, index, e, eOpts) {
	imgid = record.raw.LOGID;
}
