/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var V_ORDERGUID = '';
if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}
//车辆
var clstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'clstore',
	fields : ['V_CARCODE', 'V_CARTEXT'],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_14/PM_14_CL_DIC_CAR_VIEW',
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
		url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
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
		url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
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
		url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
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

var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
    fields: ['V_TOOLCODE', 'V_TOOLNAME', 'I_NUMBER', 'I_HOUR', 'V_MEMO', 'I_ID'],
    proxy: {
        type: 'ajax',
		url : AppUrl + 'PM_14/PM_14_WORKORDER_TOOL_VIEW',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
			V_V_ORDERGUID:V_ORDERGUID
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
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
		url : AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
		reader: {
			type: 'json',
			root: 'list'
		},
        extraParams: {
			V_V_ORDERID:V_ORDERGUID
        }
    }
});

var PageLayout = {
    xtype: 'panel',
    layout: 'border',
    items: [
                  		  
                                        		  {

                                        	            xtype: 'gridpanel',
                                        	            id: 'gridtop',
                                        	            region: 'north',
                                        	            height:400,
                                        	            store: gridtopStore,
                                        	          //  plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })],
                                        	            columns: [
                                        	                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },
                                        	                { text: '车牌号', dataIndex: 'V_CARCODE', align: 'center', width: 150 },
                                        	                { text: '等候时间', dataIndex: 'D_DATETIME_WITE', align: 'center', width: 160 },
                                        	                { text: '等候地点', dataIndex: 'V_DD_WITE', align: 'center', width: 200,renderer:QT },
                                        	                { text: '物品', dataIndex: 'V_WP_WITE', align: 'center', width: 150},
                                        	                { text: '备注', dataIndex: 'V_MEMO', align: 'center', width: 240,renderer:QT  }, 
                                        	                { text: '联系人和电话', dataIndex: 'V_LXRDH', align: 'center', width: 200,renderer:QT  }, 
                                        	                {
                                        	                    xtype: 'actioncolumn', width: 50, text: '删除', listeners: { click: OnClickDeletetop },
                                        	                    items: [{ icon: imgpath +'/delete1.png', text: '删除', tooltip: '删除'}]
                                        	                }
                                        	            ], dockedItems: [
                                        	                               {
                xtype: 'panel',  width: '100%',layout: 'vbox',
                items: [
                    {
                        xtype: 'panel', layout: 'hbox', border: false,
                        items: [
     {id:'cl',xtype:'combo',fieldLabel:'车 辆',labelAlign:'right',
	labelWidth:100,width:280,style : ' margin: 5px 0px 5px 0px',editable:false,
	  store:clstore,valueField:'V_CARCODE',displayField:'V_CARTEXT' 
		  },
          {
              id: 'add', xtype: 'button', text: '添加', icon: imgpath + '/add.png',
              style : ' margin: 5px 0px 5px 20px',width: 80, handler: tianjia
          }
                                ]
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
                    	  store:dhstore,valueField:'V_DROP',displayField:'V_DROP' , fieldStyle:'background-color:#ffffcc;background-image:none;'},
                    		   {id:'yswp',xtype:'combo',fieldLabel:'运输物品',labelAlign:'right',
                              	labelWidth:100,width:360,style : ' margin: 15px 0px 5px 0px',editable:true,
                              	  store:yswpstore,valueField:'V_DROP',displayField:'V_DROP',fieldStyle:'background-color:#ffffcc;background-image:none;' },
                              		{ id: 'bz', xtype: 'textfield', fieldLabel: '备 注', labelAlign: 'right', 
                              			  style: 'margin:15px 0px 5px 0px', labelWidth: 100, width: 360 ,fieldStyle:'background-color:#ffffcc;background-image:none;'},
                             {id:'lxrdh',xtype:'combo',fieldLabel:'联系人和电话',labelAlign:'right',
                              labelWidth:100,width:360,style : ' margin: 15px 0px 15px 0px',editable:true,fieldStyle:'background-color:#ffffcc;background-image:none;',
                               store:lxrstore,valueField:'V_DROP',displayField:'V_DROP' }
                              			  ]}        
                                        	                         ]
                                        	        },
//
//                ]
//
//            },
        {
            xtype: 'panel', region: 'west', width: 200,
            items: [
                {
                    xtype: 'panel', layout: 'hbox', border: false,
                    items: [{ xtype: 'radiofield', boxLabel: '工具', name: 'TV', id: 'toolRadio', checked: true, listeners: { change: OnToolRadioChanged} }, { xtype: 'radiofield', boxLabel: '车辆', name: 'TV', id: 'carRadio', listeners: { change: OnVechRadioChanged} }, { xtype: 'radiofield', boxLabel: '常用项目', name: 'TV', id: 'proRadio', listeners: { change: OnProjectRadioChanged}}]
                }, {
                    xtype: 'treepanel',
                    id: 'treeToolMe',
                    rootVisible: false,
                    border: false,
                    autoScroll: true,
                    listeners: { itemclick: OnClickTreeCheck },
                    store: Ext.create('Ext.data.TreeStore', {
                        id: 'treestore',
                       // fields: ['id', 'text', 'parentid','leaf'],
                        autoLoad: true,
                        autoDestroy:true,
                        proxy: {
                            type: 'ajax',
                            async: false,
							url :  AppUrl + 'PM_14/PM_14_TOOLLVEHICLE_TREE',
							actionMethods: {
								read: 'POST'
							},
							reader: {
								type: 'json',
								root: 'list'
							},
                            extraParams: {
								V_TYPE:'工具',
								V_NAME:'%',

		                        //id:'V_CODE',      //返回树的id
		                        //text:'V_NAME',   //返回树的文本
		                        //parentid:'V_CODEUP',   //父节点列名(pid)
		                        //rootId:''
                            }
                        },
                        root: {
                            text:'root',
                            expanded: true
                        }

                    })

                }
            ]

        }, {

            xtype: 'gridpanel',
            id: 'grid',
            region: 'center',
            store: gridStore,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })],
            columns: [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },
                { text: '机具编码', dataIndex: 'V_TOOLCODE', align: 'center', width: 120 },
                { text: '机具名称', dataIndex: 'V_TOOLNAME', align: 'center', width: 160 },
                { text: '数量', dataIndex: 'I_NUMBER', align: 'center', width: 40, field: { id: 'sl', xtype: 'numberfield', minValue: 0} },
                { text: '使用时间', dataIndex: 'I_HOUR', align: 'center', width: 80, field: { id: 'sysj', xtype: 'numberfield', minValue: 0} },
                { text: '备注', dataIndex: 'V_MEMO', align: 'center', width: 240, field: { id: 'bz', xtype: 'textfield'} }, 
                {
                    xtype: 'actioncolumn', width: 50, text: '删除', listeners: { click: OnClickDeleteIcon },
                    items: [{ icon: imgpath + '/delete1.png', text: '删除', tooltip: '删除'}]
                }
            ], dockedItems: [
                { xtype: 'panel', region: 'north', layout: 'column',
                    items: [
                        { xtype: 'button', text: '确定完成',icon:'../../Themes/gif/saved.png' ,style:'margin:0 0 0 20px', width: 100, listeners: { click: OnClickFinButton}}
                    ]
                }
            ]
        }
    ]

}


clstore.on("load", function() {
	Ext.getCmp("cl").select(clstore.getAt(0));
});
//dhstore.on("load", function() {
//	Ext.getCmp("dhdd").select(dhstore.getAt(0));
//});
//yswpstore.on("load", function() {
//	Ext.getCmp("yswp").select(yswpstore.getAt(0));
//});
//lxrstore.on("load", function() {
//	Ext.getCmp("lxrdh").select(lxrstore.getAt(0));
//});
        function OnToolRadioChanged(rr, newValue, oldValue, eOpts) {
            if (rr.checked == true) {
				Ext.data.StoreManager.get('treestore').proxy.url=AppUrl + 'PM_14/PM_14_TOOLLVEHICLE_TREE';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE = '工具';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.V_NAME =  '%';

                Ext.data.StoreManager.get('treestore').proxy.extraParams.id = 'V_CODE';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.text = 'V_NAME';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.parentid = 'V_CODEUP';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.rootId = '';

                Ext.getCmp('treeToolMe').getStore().load();
            } else { }
        }

        function OnVechRadioChanged(rr, newValue, oldValue, eOpts) {
            if (rr.checked == true) {
				Ext.data.StoreManager.get('treestore').proxy.url=AppUrl + 'PM_14/PM_14_TOOLLVEHICLE_TREE';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE = '车辆';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.V_NAME =  '%';

                Ext.data.StoreManager.get('treestore').proxy.extraParams.id = 'V_CODE';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.text = 'V_NAME';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.parentid = 'V_CODEUP';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.rootId = '';

                Ext.getCmp('treeToolMe').getStore().load();
            } else { }
        }
        
        
        Ext.data.StoreManager.get('treestore').on("load",function(store, node, records, successful){
        	
        	if(Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE == '工具'){
	        	
          		 Ext.Array.each(records, function (name, index) { 
   	        		 name.data.parentid = "-1";
   	        	 })
   	        	 
          	}else if(Ext.data.StoreManager.get('treestore').proxy.extraParams.V_TYPE == '车辆'){
          	}else{
          		 
          	}
        })

        function OnProjectRadioChanged(rr, newValue, oldValue, eOpts) {
        	 
            if (rr.checked == true) {
            	
                Ext.data.StoreManager.get('treestore').proxy.extraParams.V_PERCODE =Ext.util.Cookies.get("v_personcode");

                Ext.data.StoreManager.get('treestore').proxy.url=AppUrl + 'PM_14/PRO_PM_WORKORDER_TOOL_CY';

                Ext.data.StoreManager.get('treestore').proxy.extraParams.id = 'V_TOOLCODE';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.text = 'V_TOOLNAME';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.parentid = 'V_USEMAN';
                Ext.data.StoreManager.get('treestore').proxy.extraParams.rootId = 'noFilter';
               
                Ext.getCmp('treeToolMe').getStore().load();
                
 
            } else { }
        }

var useDate = '';
var d = new Date();
var month  = d.getMonth()+1;
useDate = d.getFullYear()+'-'+month+'-'+d.getDate();

function OnClickTreeCheck(aa, record, item, index, e, eOpts) {
    if (record.data.leaf == true) {
        Ext.Ajax.request({
			 url :  AppUrl + 'PM_14/PM_14_WORKORDER_TOOL_SET',
             method: 'POST',
             async:false,
             params: {
				 V_I_ID:'-1',
				 V_ORDERGUID:V_ORDERGUID,
				 V_V_TOOLCODE:record.data.id,
				 V_V_TOOLNAME:record.data.text,
				 V_V_USEMAN:Ext.util.Cookies.get("v_personname2"),
				 V_D_USETIME:useDate,
				 V_I_HOUR:'1',
				 V_I_NUMBER:'1',
				 V_V_MEMO:'',
				 V_V_RETURNMAN:'',
				 V_D_RETURNTIME:useDate
            }, success: function (response) {
                //Ext.example.msg('操作信息', '{0}', Ext.JSON.decode(response.responseText));
                Ext.ComponentManager.get('grid').getStore().load();
            }
        });
    }
}


function OnClickFinButton(){
    var aa = Ext.data.StoreManager.get('gridStore');
	var retdata = [];
    if (aa.data.length > 0) {
        var ModifyRecord = Ext.data.StoreManager.get('gridStore').getModifiedRecords();
        if (ModifyRecord.length > 0) {
            for (var i = 0; i < ModifyRecord.length; i++) {
                Ext.Ajax.request({
					url :  AppUrl + 'PM_14/PM_14_WORKORDER_TOOL_SET',
                    method: 'POST',
                    async : false,
                    params: {
						V_I_ID:ModifyRecord[i].data.I_ID,
						V_ORDERGUID:V_ORDERGUID,
						V_V_TOOLCODE:'',
						V_V_TOOLNAME:'',
						V_V_USEMAN:Ext.util.Cookies.get('v_personname2'),
						V_D_USETIME:useDate,
						V_I_HOUR:ModifyRecord[i].data.I_HOUR,
						V_I_NUMBER:ModifyRecord[i].data.I_NUMBER,
						V_V_MEMO:ModifyRecord[i].data.V_MEMO,
						V_V_RETURNMAN:'',
						V_D_RETURNTIME:useDate
                    }, success: function (response) {
						retdata.push(ModifyRecord[i].data.V_TOOLNAME);
                    }
                });
            }
        }
		Ext.Ajax.request({
			url :  AppUrl + 'PM_14/PM_14_WORKORDER_TOOL_RETSTR',
			method: 'POST',
			async: false,
			params: {
				V_V_ORDERGUID:V_ORDERGUID
			}, success: function (response) {
				//Ext.example.msg('操作信息', '{0}', Ext.JSON.decode(response.responseText).RET);
				//window.top.parent.returnValue = 'refresh';
				// window.opener=null;
				//window.open('','_self');
				window.opener.getReturnGJJJ(retdata);
				window.close();
			}
		});
    }
}


function OnClickDeleteIcon(grid, rowIndex, colIndex) {
    Ext.Msg.confirm('警告', '您确定要删除该信息?', function (button) {
        if (button != 'yes') {
            return;
        } else {
            Ext.Ajax.request({
				url :  AppUrl + 'PM_14/PM_14_WORKORDER_TOOL_DEL',
                method: 'POST',
                async: false,
                params: {
					V_I_ID:Ext.data.StoreManager.get('gridStore').data.getAt(colIndex).raw.I_ID
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    Ext.example.msg('操作信息', '{0}', resp.RET);
                }
            });
            Ext.ComponentManager.get('grid').getStore().load();
        }
    });
}

function OnClickDeletetop(grid, rowIndex, colIndex) {
    Ext.Msg.confirm('警告', '您确定要删除该信息?', function (button) {
        if (button != 'yes') {
            return;
        } else {
            Ext.Ajax.request({
				url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DEL',
                method: 'POST',
                async: false,
                params: {
					V_I_ID:Ext.data.StoreManager.get('gridtopStore').data.getAt(colIndex).raw.I_ID
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                   // Ext.example.msg('操作信息', '{0}', resp);
                    if(resp.RET=='成功')
                    	Ext.Msg.alert("操作信息","删除成功");
                }
            });
            Ext.ComponentManager.get('gridtop').getStore().load();
        }
    });
}
function tianjia(){
	if(Ext.ComponentManager.get('dhdd').getValue()==''||Ext.ComponentManager.get('dhdd').getValue()==null)
		{Ext.Msg.alert("操作信息","等候地点不能为空");}
	else if(Ext.ComponentManager.get('yswp').getValue()==''||Ext.ComponentManager.get('yswp').getValue()==null)
	{Ext.Msg.alert("操作信息","运输物品不能为空");}
	else if(Ext.ComponentManager.get('lxrdh').getValue()==''||Ext.ComponentManager.get('lxrdh').getValue()==null)
	{Ext.Msg.alert("操作信息","联系人和电话不能为空");}
	else {var shi = Ext.ComponentManager.get("shi").getValue();
	if (shi < 10) {
		shi = '0' + shi;
	}
	var fen = Ext.ComponentManager.get("fen").getValue();
	if (fen < 10) {
		fen = '0' + fen;
	}
	 Ext.Ajax.request({
		 url : AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_SET',
         method: 'POST',
         async: false,
         params: {
			 V_V_IP:getIP(),
			 V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
			 V_V_ORDERID:V_ORDERGUID,
			 V_V_CARCODE:Ext.ComponentManager.get('cl').getValue(),
			 V_D_DATETIME_WITE:Ext.Date.format(Ext.ComponentManager.get("dhtime").getValue(), 'Y-m-d')+ " " + shi + ":" + fen + ':' + "00",
			 V_V_DD_WITE: Ext.ComponentManager.get('dhdd').getValue(),
			 V_V_WP_WITE:Ext.ComponentManager.get('yswp').getValue(),
			 V_V_MEMO:Ext.ComponentManager.get('bz').getValue(),
			 V_V_LXRDH:Ext.ComponentManager.get('lxrdh').getValue()
         },
         success: function (response) {
             var resp = Ext.JSON.decode(response.responseText);
            // Ext.example.msg('操作信息', '{0}', resp);
             if(resp.RET=='success')
             	Ext.Msg.alert("操作信息","添加成功");
             Ext.ComponentManager.get('gridtop').getStore().load();
         }
     });}
	
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



Ext.onReady(function () {
	Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', PageLayout);
});

function QT(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}