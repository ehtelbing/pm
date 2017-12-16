/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}
var selflag;
var xgid='';
var tcid='';
//车辆
var clstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'clstore',
	fields : ['V_CARCODE', 'V_CARTEXT'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'WorkOrder/PRO_CL_DIC_CAR_VIEW',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_V_FLAG:'在用'
		}
	}
});

//等候地点
var dhstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'dhstore',
	fields : ['V_DROP', 'V_DROP'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_DROP',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_CLOUMSNAME:'v_dd_wite'
		}
	}
});


//运输物品
var yswpstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'yswpstore',
	fields : ['V_DROP', 'V_DROP'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_DROP',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_CLOUMSNAME:'v_wp_wite'
		}
	}
});

//联系人和电话
var lxrstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'lxrstore',
	fields : ['V_DROP', 'V_DROP'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_DROP',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_CLOUMSNAME:'V_LXRDH'
		}
	}
});

//
Ext.create('Ext.window.Window', {
	width : 550,
	height : 320,
	//title : '编辑',
	layout : 'fit',
id: 'tianjiaWin', closeAction: 'hide',modal: true,
 //items:[{xtype:'textareafield',id:'dcjfx'}],
	items : [ {
		xtype : 'panel',
		defaults : {
			baseCls : 'my-panel-no-border'
		},
		width : '100%',
		layout : 'vbox',
		//frame : true,
		//style : ' margin: 5px 0px 0px 10px',
		items : [ 

     {id:'cl',xtype:'combo',fieldLabel:'车 辆',labelAlign:'right',
	labelWidth:100,width:280,style : ' margin: 5px 0px 5px 0px',editable:false,
	  store:clstore,valueField:'V_CARCODE',displayField:'V_CARTEXT',queryMode: 'local'
		  },
                               
                    {
                        xtype: 'panel', layout: 'hbox', border: false,
                        items: [
                                {
                					id : 'dhtime',
                					xtype : 'datefield',
                					editable : false,
                					format : 'Y/m/d',
                					value : new Date(),//new Date().getHours()
                					fieldLabel : '等候时间',
                					labelWidth : 100,
                					labelAlign:'right',
                					width:220,
                					 style : ' margin: 15px 0px 5px 0px',
                					baseCls : 'margin-bottom'
                				},
                				{
									xtype : 'numberfield',
									id : 'shi',
									width : 60,
									value : new Date().getHours()+1,
									selectOnFocus : true,
									labelAlign : 'right',
									style : 'margin: 15px 0px 5px 10px'
								},
								{
									xtype : 'numberfield',
									id : 'fen',
									width : 60,
									value : 0,
									selectOnFocus : true,
									labelAlign : 'right',
									style : 'margin: 15px 0px 5px 10px'
								}
                                ]
                    },
                    {id:'dhdd',xtype:'combo',fieldLabel:'等候地点',labelAlign:'right',
                    	labelWidth:100,width:360,style : ' margin: 15px 0px 5px 0px',editable:true,
                    	  store:dhstore,valueField:'V_DROP',displayField:'V_DROP',queryMode: 'local'},
                    		   {id:'yswp',xtype:'combo',fieldLabel:'运输物品',labelAlign:'right',
                              	labelWidth:100,width:360,style : ' margin: 15px 0px 5px 0px',editable:true,
                              	  store:yswpstore,valueField:'V_DROP',displayField:'V_DROP',queryMode: 'local'},
                              		{ id: 'bz', xtype: 'textfield', fieldLabel: '备 注', labelAlign: 'right', 
                              			  style: 'margin:15px 0px 5px 0px', labelWidth: 100, width: 360 },
                             {id:'lxrdh',xtype:'combo',fieldLabel:'联系人和电话',labelAlign:'right',
                              labelWidth:100,width:360,style : ' margin: 15px 0px 15px 5px',editable:true,
                               store:lxrstore,valueField:'V_DROP',displayField:'V_DROP',queryMode: 'local'}
		]
	}],
	buttons : [ {
		text : '确 定',
		icon : imgpath + '/saved.png',
		handler : bjqd
	}, {
		text : '取 消',
		icon : imgpath + '/cross.gif',
		handler : function() {
			Ext.getCmp('tianjiaWin').hide();
		}
	} ]
});



var gridtopStore = Ext.create('Ext.data.Store', {
    id: 'gridtopStore',
    autoLoad: true,
    fields: ['I_ID',	
             'V_ORDERID',	
             'V_CARCODE',	
             'D_DATETIME_WITE',	
             'V_DD_WITE',	
             'V_WP_WITE',	
             'V_MEMO',	
             'D_DATE_CF',
             'D_DD_CF',	
             'D_DATE_LK',	
             'D_DATE_NEXT_MDD',	
             'V_PERCODE_INPUT',	
             'V_PERCODE_SJ',	
             'V_LXRDH'	
],
    proxy: {
        type: 'ajax',
		url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
			V_V_ORDERID:V_ORDERGUID
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	autoLoad : true,
	fields : [ 'V_TOOLCODE', 'V_TOOLNAME', 'I_NUMBER', 'I_HOUR', 'V_MEMO',
			'I_ID' ],
	proxy : {
		type : 'ajax',
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_VIEW',
		actionMethods : {
			read : 'POST'
		},
		extraParams : {
			V_V_ORDERGUID:V_ORDERGUID
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});


//双击弹出列表
Ext.create('Ext.window.Window', {
	width : 800,
	height : 500,
	//title : '编辑',
	layout : 'fit',
	id: 'lbWin',
	closeAction: 'hide',
	modal: true,
	items : [{xtype:'gridpanel',	
			id:'gridlb',
		   //	title:'选择工作班人员',
			region:'center',
			columnLines : true,
			//selType: 'checkboxmodel',
			width : '100%',
			autoScroll : true,
			store:gridtopStore,
			height:400,
			plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit : 1
			}) ],
			columns:[
			{
				text : '出发时间',
				width : 150,
				dataIndex : 'D_DATE_CF',
				align : 'center',
				field : {
					id : 'cfsj',
					xtype : 'textfield'
				}
			}, {
				text : '出发地点',
				width : 100,
				dataIndex : 'D_DD_CF',
				align : 'center',
				renderer:QT,
				field : {
					id : 'cfdd',
					xtype : 'textfield'
				}
			}, {
				text : '离开时间',
				width : 150,
				dataIndex : 'D_DATE_LK',
				align : 'center',
				field : {
					id : 'lksj',
					xtype : 'textfield'
				}
			}, {
				text : '到达下一目的地时间',
				width : 150,
				dataIndex : 'D_DATE_NEXT_MDD',
				align : 'center',
				field : {
					id : 'ddxyg',
					xtype : 'textfield'
				}
			}, {
				text : '司机',
				width : 150,
				dataIndex : 'V_PERCODE_SJ',
				align : 'center',
				field : {
					id : 'sj',
					xtype : 'textfield'
				}
			},
			{ text : '保 存',width:150,align : 'center',
				renderer : function(value, metaData, record, rowIdx, colIdx, store, view){
					return '<div><a href="javascript:baocun(\''+ rowIdx + '\')">保 存</a></div>';
				}
			}
			]
	}],
	buttons : [ {
		text : '确 定',
		icon : imgpath + '/saved.png',
		handler : bjqd
	}, {
		text : '取 消',
		icon : imgpath + '/cross.gif',
		handler : function() {
			Ext.getCmp('lbWin').hide();
		}
	} ]
});
var PageLayout = {
	xtype : 'panel',
	layout : 'border',
	region:'center',
	border:false,
	items : [
	   	  {xtype:'panel', region: 'north', layout:'border',height:400,border:false,
			  items:[{
	            xtype: 'grid',
	            id: 'gridtop',
				region:'center',
	            columnLines : true,
	            store: gridtopStore,
				border:false,
	          //  plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })],
	            columns: [
	                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },
	                { text: '车牌号', dataIndex: 'V_CARCODE', align: 'center', width: 150 },
	                { text: '等候时间', dataIndex: 'D_DATETIME_WITE', align: 'center', width: 160,renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	                { text: '等候地点', dataIndex: 'V_DD_WITE', align: 'center', width: 200,renderer:QT },
	                { text: '物品', dataIndex: 'V_WP_WITE', align: 'center', width: 150},
	                { text: '备注', dataIndex: 'V_MEMO', align: 'center', width: 240,renderer:QT  }, 
	                { text: '联系人和电话', dataIndex: 'V_LXRDH', align: 'center', width: 200,renderer:QT  }, 
	                {
	                    xtype: 'actioncolumn', width: 50, text: '修改',  align: 'center',listeners: { click: OnClickEdittop },
	                    items: [{ icon: '../../Themes/gif/edit.png', text: '修改', tooltip: '修改'}]
	                },
	                {
	                    xtype: 'actioncolumn', width: 50, text: '删除',  align: 'center',listeners: { click: OnClickDeletetop },
	                    items: [{ icon: '../../Themes/gif/delete1.png', text: '删除', tooltip: '删除'}]
	                }
	            ],
			listeners:{
					'itemdblclick' : function(self, record, item, index, e, eOpts) {
						interit(self, record, item, index, e, eOpts);
					}
			}
	},
	{xtype: 'panel',region:'north', width: '100%',layout: 'column',margion:'5px',frame:true,
		  items: [{
			  id: 'add', xtype: 'button', text: '添加', icon: '../../Themes/gif/add.png',
			  style : ' margin: 5px 0px 5px 20px',width: 80, handler: tianjia
		  }]
	  }
	]},
	{xtype:'hidden',id:'treeid'},{xtype:'hidden',id:'treetext'},{
		xtype : 'panel',
		region : 'west',
		width : 200,
		//border:false,
		items : [ {
			xtype : 'panel',
			layout : 'hbox',
			border : false,
			items : [ {
				xtype : 'radiofield',
				boxLabel : '工具',
				name : 'TV',
				id : 'toolRadio',
				checked : true,
				listeners : {
					change : OnToolRadioChanged
				}
			}, {
				xtype : 'radiofield',
				boxLabel : '车辆',
				name : 'TV',
				id : 'carRadio',
				listeners : {
					change : OnVechRadioChanged
				}
			}, {
				xtype : 'radiofield',
				boxLabel : '常用项目',
				name : 'TV',
				id : 'proRadio',
				listeners : {
					change : OnProjectRadioChanged
				}
			} ]
		}, {
			xtype : 'treepanel',
			id : 'treeToolMe',
			rootVisible : false,
			border : false,
			autoScroll : true,
			listeners : {
				itemclick : OnClickTreeCheck
			},
			store : Ext.create('Ext.data.TreeStore', {
				id : 'treestore',
				fields : [ 'id', 'text', 'parentid' ],
				autoLoad : true,
				autoDestroy : true,
				proxy : {
					type : 'ajax',
					async : false,
					url: AppUrl + 'WorkOrder/PRO_TOOLLVEHICLE_TREE',
					extraParams : {
						V_TYPE:'工具',
						V_NAME:'%'
					},
					actionMethods : {
						read : 'POST'
					}
				},
				reader : {
					type : 'json',
					root : 'children'
				},
				root : {
					text : 'root',
					expanded : true
				}
			})

		} ]

	}, {xtype:'panel',region:'center',layout:'border',border:false,
			items:[
				{
				xtype : 'panel',
				region : 'north',
				layout : 'column',
				margion:'5px',
				frame:true,
				border:false,
				items : [ {
					xtype : 'button',
					text : '确定完成',
					icon : '../../Themes/gif/saved.png',
					style : 'margin:5px 0 5px 20px',
					width : 100,
					listeners : {
						click : OnClickFinButton
					}
				} ]
			},
				{
					xtype : 'gridpanel',
					id : 'grid',
					region : 'center',
					store : gridStore,
					plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					}) ],
					border:false,
					columns : [ {
						text : '序号',
						xtype : 'rownumberer',
						align : 'center',
						width : 40
					}, {
						text : '机具编码',
						dataIndex : 'V_TOOLCODE',
						align : 'center',
						width : 120
					}, {
						text : '机具名称',
						dataIndex : 'V_TOOLNAME',
						align : 'center',
						width : 160
					}, {
						text : '数量',
						dataIndex : 'I_NUMBER',
						align : 'center',
						width : 40,
						field : {
							id : 'sl',
							xtype : 'numberfield',
							minValue : 0
						}
					}, {
						text : '使用时间',
						dataIndex : 'I_HOUR',
						align : 'center',
						width : 80,
						field : {
							id : 'sysj',
							xtype : 'numberfield',
							minValue : 0
						}
					}, {
						text : '备注',
						dataIndex : 'V_MEMO',
						align : 'center',
						width : 240,
						field : {
							id : 'beizhu',
							xtype : 'textfield'
						}
					}, {
						xtype : 'actioncolumn',
						width : 50,
						text : '删除',
						listeners : {
							click : OnClickDeleteIcon
						},
						items : [ {
							icon : '../../Themes/gif/delete1.png',
							text : '删除',
							tooltip : '删除'
						} ]
					} ]
				}
		]}
	]}

clstore.on("load", function() {
	Ext.getCmp("cl").select(clstore.getAt(0));
});
function OnToolRadioChanged(rr, newValue, oldValue, eOpts) {
    if (rr.checked == true) {
		Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE = '工具';
		Ext.data.StoreManager.get('treestore').proxy.extraParams.V_NAME = '%';
		Ext.data.StoreManager.get('treestore').proxy.url =AppUrl + 'WorkOrder/PRO_TOOLLVEHICLE_TREE';
        Ext.getCmp('treeToolMe').getStore().load();
    } else { }
}

function OnVechRadioChanged(rr, newValue, oldValue, eOpts) {
    if (rr.checked == true) {
		Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE = '车辆';
		Ext.data.StoreManager.get('treestore').proxy.extraParams.V_NAME = '%';
		Ext.data.StoreManager.get('treestore').proxy.url =AppUrl + 'WorkOrder/PRO_TOOLLVEHICLE_TREE';
        Ext.getCmp('treeToolMe').getStore().load();
    } else { }
}


Ext.data.StoreManager.get('treestore').on("load",function(store, node, records, successful){
	
	if(Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE== '工具'){
    	
  		 Ext.Array.each(records, function (name, index) { 
       		 name.data.parentid = "-1";
       	 })
       	 
  	}else if(Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE== '车辆'){
  	}else{
  		 
  	}
})

function OnProjectRadioChanged(rr, newValue, oldValue, eOpts) {
    if (rr.checked == true) {
        Ext.data.StoreManager.get('treestore').proxy.extraParams.V_PERCODE =Ext.util.Cookies.get("v_personcode");
        Ext.data.StoreManager.get('treestore').proxy.url =AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_CY';
        Ext.getCmp('treeToolMe').getStore().load();
    } else { }
}

var useDate = '';
var d = new Date();
var month  = d.getMonth()+1;
useDate = d.getFullYear() + "-" + dateFomate(month) + "-" + dateFomate(d.getDate()) ;

function dateFomate(val){
	if(parseInt(val) <=9){
		return "0"+val;
	}
	return val;
}

function OnClickTreeCheck(aa, record, item, index, e, eOpts) {
	if (record.data.leaf == true ) {
		Ext.Ajax.request({
			 url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_SET',
			 method: 'POST',
			 async:false,
			 params: {
				 'V_I_ID':'-1',
				 'V_ORDERGUID': Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
				 'V_V_TOOLCODE':record.data.id,
				 'V_V_TOOLNAME':record.data.text,
				 'V_V_USEMAN':Ext.util.Cookies.get("v_personname2"),
				 'V_D_USETIME':useDate,
				 'V_I_HOUR':'1',
				 'V_I_NUMBER':'1',
				 'V_V_MEMO':'',
				 'V_V_RETURNMAN':'',
				 'V_D_RETURNTIME':useDate
			},
			success: function (response) {
				Ext.ComponentManager.get('grid').getStore().load();
			}
		});
	}
}

function OnClickFinButton(){
	var aa = Ext.data.StoreManager.get('gridStore');
	if (aa.data.length > 0) {
		var ModifyRecord = Ext.data.StoreManager.get('gridStore').getModifiedRecords();
		if (ModifyRecord.length > 0) {
			for (var i = 0; i < ModifyRecord.length; i++) {
				Ext.Ajax.request({
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_SET',
					method: 'POST',
					async : false,
					params: {
						'V_I_ID':Ext.getCmp("grid").getStore().getAt(i).get('I_ID'),
						'V_ORDERGUID':Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
						'V_V_TOOLCODE': '',
						'V_V_TOOLNAME': '',
						'V_V_USEMAN': Ext.util.Cookies.get("v_personname2"),
						'V_D_USETIME':useDate,
						'V_I_HOUR':Ext.getCmp("grid").getStore().getAt(i).get('I_HOUR'),
						'V_I_NUMBER':Ext.getCmp("grid").getStore().getAt(i).get('I_NUMBER'),
						'V_V_MEMO':Ext.getCmp("grid").getStore().getAt(i).get('V_MEMO'),
						'V_V_RETURNMAN':'',
						'V_D_RETURNTIME':useDate
					},
					success: function (response) {

					}
				});
			}
		}
	}
	Ext.Ajax.request({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_RETSTR',
		method: 'POST',
		async: false,
		params: {
			V_V_ORDERGUID:Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID
		},
		success: function (response) {
			var resp = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("操作信息","确定完成成功");
			window.opener.getReturnGJJJ(resp.V_INFO);
			window.close();
		}
	});
}



//function OnChangeMemo(aa, newValue, oldValue, eOpts) {
//Ext.Ajax.request({
//url:  APP + '/ModelChange',
//method: 'POST',
//async: false,
//params: {
//	 parName:['V_I_ID','V_ORDERGUID','V_V_TOOLCODE','V_V_TOOLNAME','V_V_USEMAN','V_D_USETIME','V_I_HOUR','V_I_NUMBER','V_V_MEMO','V_V_RETURNMAN','V_D_RETURNTIME'],
//	 parType:['i','s','s','s','s','s','s','s','s','s','s'],
//	 parVal:['-1',
//	         Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
//	          record.data.id,
//	          record.data.text,
//	          Ext.util.Cookies.get('v_personname2'),
//	          useDate,
//              '1','1',
//	          '','',
//	          useDate],
//
//	 proName:'PRO_PM_WORKORDER_TOOL_SET',
//
//	 returnStr:['V_CURSOR'],
//	 returnStrType:['s']
//}, success: function (response) {
//
//    Ext.example.msg('操作信息', '{0}', Ext.JSON.decode(response.responseText));
//    Ext.ComponentManager.get('grid').getStore().load();
//}
//});
//}

function OnClickDeleteIcon(grid, rowIndex, colIndex) {
Ext.Msg.confirm('警告', '您确定要删除该信息?', function (button) {
if (button != 'yes') {
    return;
} else {
    Ext.Ajax.request({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_DEL',
        method: 'POST',
        async: false,
        params: {
			V_I_ID:Ext.data.StoreManager.get('gridStore').data.getAt(colIndex).raw.I_ID
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            Ext.example.msg('操作信息', '{0}', resp);
        }
    });

    Ext.ComponentManager.get('grid').getStore().load();
}
});
}

Ext.onReady(function () {
	Ext.QuickTips.init();
	//Ext.create('Ext.container.Viewport', PageLayout);
	Ext.create('Ext.container.Viewport', {
		id: "id",
		layout: 'border',
		items: [PageLayout]
	});
});

function QT(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}

function OnClickDeletetop(grid, rowIndex, colIndex) {
    Ext.Msg.confirm('警告', '您确定要删除该信息?', function (button) {
        if (button != 'yes') {
            return;
        } else {
            Ext.Ajax.request({
				url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_DEL',
                method: 'POST',
                async: false,
                params: {
					V_I_ID:Ext.data.StoreManager.get('gridtopStore').data.getAt(colIndex).raw.I_ID
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                   // Ext.example.msg('操作信息', '{0}', resp);
                    if(resp.V_INFO=='success')
                    	Ext.Msg.alert("操作信息","删除成功");
                }
            });

            Ext.ComponentManager.get('gridtop').getStore().load();
        }
    });
}

//修改列表数据
function OnClickEdittop(grid, rowIndex, colIndex) {
	
	clearfiled();
	Ext.getCmp('tianjiaWin').setTitle('修改');
	selflag = 1;
	Ext.Ajax.request({
		 url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_GET',
	     method: 'POST',
	     async: false,
	     params: {
			 V_I_ID:Ext.data.StoreManager.get('gridtopStore').data.getAt(colIndex).raw.I_ID
	     },
		success : function(resp) {
			var sledata = Ext.decode(resp.responseText).list[0];
			Ext.getCmp('cl').select(sledata.V_CARCODE);
			Ext.getCmp('dhtime').setValue(sledata.D_DATETIME_WITE.split(' ')[0]);
			Ext.getCmp('shi').setValue(sledata.D_DATETIME_WITE.split(' ')[1].split(':')[0]);
			Ext.getCmp('fen').setValue(sledata.D_DATETIME_WITE.split(' ')[1].split(':')[1]);
			Ext.getCmp('dhdd').setValue(sledata.V_DD_WITE);
			Ext.getCmp('yswp').setValue(sledata.V_WP_WITE);
			Ext.getCmp('bz').setValue(sledata.V_MEMO);
			Ext.getCmp('lxrdh').setValue(sledata.V_LXRDH);
			//ckcode=sledata.plantCode;
			xgid=sledata.I_ID;
			Ext.getCmp('tianjiaWin').show();
		}
	});
}


function tianjia() {
	Ext.getCmp('tianjiaWin').setTitle('新增');
	clearfiled(); 
	Ext.getCmp('tianjiaWin').show();
	selflag = 0;
}

function bjqd() {
	if(selflag=='0'){
		if(Ext.ComponentManager.get('dhdd').getValue()==''||Ext.ComponentManager.get('dhdd').getValue()==null){
			Ext.Msg.alert("操作信息","等候地点不能为空");
		}else if(Ext.ComponentManager.get('yswp').getValue()==''||Ext.ComponentManager.get('yswp').getValue()==null){
			Ext.Msg.alert("操作信息","运输物品不能为空");
		}else if(Ext.ComponentManager.get('lxrdh').getValue()==''||Ext.ComponentManager.get('lxrdh').getValue()==null){
			Ext.Msg.alert("操作信息","联系人和电话不能为空");
		}else {
			var shi = Ext.ComponentManager.get("shi").getValue();
			if (shi < 10) {
				shi = '0' + shi;
			}
			var fen = Ext.ComponentManager.get("fen").getValue();
			if (fen < 10) {
				fen = '0' + fen;
			}
			 Ext.Ajax.request({
				 url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_SET',
				 method: 'POST',
				 async: false,
				 params: {
					 'V_V_IP':getIP(),
					 'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
					 'V_V_ORDERID':V_ORDERGUID,
					 'V_V_CARCODE': Ext.ComponentManager.get('cl').getValue(),
					 'V_D_DATETIME_WITE':Ext.Date.format(Ext.ComponentManager.get("dhtime").getValue(), 'Y-m-d')+ " " + shi + ":" + fen + ':' + "00",
					 'V_V_DD_WITE': Ext.ComponentManager.get('dhdd').getValue(),
					 'V_V_WP_WITE':Ext.ComponentManager.get('yswp').getValue(),
					 'V_V_MEMO':Ext.ComponentManager.get('bz').getValue(),
					 'V_V_LXRDH':Ext.ComponentManager.get('lxrdh').getValue()
				 },
				 success: function (response) {
					 var resp = Ext.JSON.decode(response.responseText);
					// Ext.example.msg('操作信息', '{0}', resp);
					 if(resp.V_INFO=='success')
						Ext.Msg.alert("操作信息","添加成功");
					 Ext.ComponentManager.get('gridtop').getStore().load();
					 Ext.getCmp('tianjiaWin').hide();
				 }
			 });
		}
	}else{
		if(Ext.ComponentManager.get('dhdd').getValue()==''||Ext.ComponentManager.get('dhdd').getValue()==null){
			Ext.Msg.alert("操作信息","等候地点不能为空");
		}else if(Ext.ComponentManager.get('yswp').getValue()==''||Ext.ComponentManager.get('yswp').getValue()==null){
			Ext.Msg.alert("操作信息","运输物品不能为空");
		}else if(Ext.ComponentManager.get('lxrdh').getValue()==''||Ext.ComponentManager.get('lxrdh').getValue()==null){
			Ext.Msg.alert("操作信息","联系人和电话不能为空");
		}else{
			var shi = Ext.ComponentManager.get("shi").getValue();
			if (shi < 10) {
				shi = '0' + shi;
			}
			var fen = Ext.ComponentManager.get("fen").getValue();
			if (fen < 10) {
				fen = '0' + fen;
			}
			 Ext.Ajax.request({
				 url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_EDIT',
				 method: 'POST',
				 async: false,
				 params: {
					 'V_V_IP':getIP(),
					 'V_V_PERCODE':Ext.util.Cookies.get('v_personcode'),
					 'V_I_ID':xgid,
					 'V_V_CARCODE': Ext.ComponentManager.get('cl').getValue(),
					 'V_D_DATETIME_WITE':Ext.Date.format(Ext.ComponentManager.get("dhtime").getValue(), 'Y-m-d')+ " " + shi + ":" + fen + ':' + "00",
					 'V_V_DD_WITE':Ext.ComponentManager.get('dhdd').getValue(),
					 'V_V_WP_WITE':Ext.ComponentManager.get('yswp').getValue(),
					 'V_V_MEMO':Ext.ComponentManager.get('bz').getValue(),
					 'V_V_LXRDH':Ext.ComponentManager.get('lxrdh').getValue()
				 },
				 success: function (response) {
					 var resp = Ext.JSON.decode(response.responseText);
					// Ext.example.msg('操作信息', '{0}', resp);
					 if(resp.V_INFO=='success')
						Ext.Msg.alert("操作信息","修改成功");
					 Ext.ComponentManager.get('gridtop').getStore().load();
					 Ext.getCmp('tianjiaWin').hide();
				 }
			 });
		}
	}
}


//清除数据
function clearfiled() {
	Ext.getCmp('dhtime').setValue(new Date());
	Ext.getCmp('shi').setValue('11');
	Ext.getCmp('fen').setValue('0');
	Ext.getCmp('dhdd').setValue('');
	Ext.getCmp('yswp').setValue('');
	Ext.getCmp('bz').setValue('');
	Ext.getCmp('lxrdh').setValue('');
}

function getIP(){
	var redata;
	Ext.Ajax.request({
		method : 'POST',
		async : false,
		url : AppUrl + 'PM_14/GetIP',
		params : {},
		success : function(response){
			var resp = Ext.decode(response.responseText);
			redata=resp.IP.split("/")[1];
		}
	});
	return redata;
}
function interit(self, record,item, index, e, eOpts){
   tcid=record.data.I_ID;
   Ext.getCmp('lbWin').show();
	
}

function baocun(rowIdx){
	 Ext.Ajax.request({
		    url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_FKSAVE',
		     method: 'POST',
		     async: false,
		     params: {
				 'V_V_IP':getIP(),
				 'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
				 'V_I_ID':xgid,
				 'V_D_DATE_CF':Ext.data.StoreManager.lookup('gridtopStore').getAt(rowIdx).get('D_DATE_CF'),
				 'V_D_DD_CF':Ext.data.StoreManager.lookup('gridtopStore').getAt(rowIdx).get('D_DD_CF'),
				 'V_D_DATE_LK':Ext.data.StoreManager.lookup('gridtopStore').getAt(rowIdx).get('D_DATE_LK'),
				 'V_D_DATE_NEXT_MDD':Ext.data.StoreManager.lookup('gridtopStore').getAt(rowIdx).get('D_DATE_NEXT_MDD'),
				 'V_V_PERCODE_SJ':Ext.data.StoreManager.lookup('gridtopStore').getAt(rowIdx).get('V_PERCODE_SJ')
		     },
		     success: function (response) {
		         var resp = Ext.JSON.decode(response.responseText);
		         if(resp.V_INFO=='success')
		         	Ext.Msg.alert("操作信息","保存成功");
		         Ext.ComponentManager.get('gridlb').getStore().load();
		     }
		 });
}