var type=0;
var selectedRecord='';
Ext.onReady(function() {
        
	function left(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:left;"; return value;
    }
    function right(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:right;"; return value;
    }
    
    
     var gridStore = Ext.create('Ext.data.Store', {
     	autoLoad:true,
        storeId: 'gridStore',
        pageSize:200,
        fields: ['MENDDEPT_NAME', 'MENDDEPT_CODE','MENDDATE_TYPE','SUPER_CODE','USERID','USERNAME'],
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
    
  
	 
	var list1 = Ext.create('Ext.panel.Panel', {
		region : 'north',
		bodyStyle: {background: 'none'},
		border:0,
		defaults : {
			labelAlign:'right',
			labelWidth:60
		},
		items : [ 
		     {frame : true,style:'margin-bottom:1px',
		      defaults : {
					labelAlign:'right',
					labelWidth:60
		      },
		      layout: {
		        type: 'table',
		        columns: 5
		      },
		      items:[
		         {id : 'mendDept', xtype : 'textfield', fieldLabel : '检修单位'},
		         {id : 'mendPerson', xtype : 'textfield', fieldLabel : '检修人员'},
			     {xtype:'button',text:'查询',id:'query',listeners : {click : OnClickSearch},margin:'0px 0px 4px 10px'},
			     {xtype:'button',text:'新增',id:'add',listeners : {click : OnAdd},margin:'0px 0px 4px 10px'},
			     {xtype:'button',text:'查询检修单位人员',id:'queryPerson',listeners : {click : OnClickSearch2},margin:'0px 0px 4px 10px'}
				   
		     ] }
		]
	});
 
	 var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			selType : 'checkboxmodel',
			width : '100%',
			title:'检修单位配置',
			autoScroll : true,
			store :gridStore,
			dufaults:{width:120},
			plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit : 1})],
			//listeners:{"edit":edit}
				// ,
			columns : [ 
					  
					  { text : '检修单位名称', id:'menddept_name',dataIndex : 'MENDDEPT_NAME',  align : 'center',width:130}, 
					  { text : '检修单位编码',id:'menddept_code', dataIndex : 'MENDDEPT_CODE', align : 'center',width:130}, 
					  { text : '检修单位类型', dataIndex : 'MENDDATE_TYPE', align : 'center',width:130}, 
					  { text : '上级编码', dataIndex : 'SUPER_CODE', align : 'center',width:180}, 
					  { text : '负责人ID', dataIndex : 'USERID', align : 'center',width:120}, 
					  { text : '负责人名', dataIndex : 'USERNAME', align : 'center',width:180},
					  {	text : '修改',align : 'center',renderer : LookMore/*,handler : function() {OnUpdate();}*/},
					  {	text : '删除',align : 'center',renderer : LookMore2}
					  
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
			         id:'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore'  } 
           ]
			
		});
		
		
    
	
		
	var rightPanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'border',
		frame : true,
		autoScroll : true,
		items : [ list1,grid] 
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ rightPanel ]
	});
	

		
		
		OnClickSearch();
	
});

var window1 = Ext.create('Ext.window.Window', {
	id : 'window1',
	title : '修改',
	width : 350,
	height : 300,
	plain : true,
	modal : true,
	layout : {
		type : 'vbox',
		//columns : 1,
		baseCls : 'my-panel-noborder'
	},
	defaults : {
		labelWidth : 90,
		labelAlign : 'right',
	},
	items : [
	         {
	        	 xtype : 'textfield',
	        	 id : 'wmenddept_name2',
	        	 fieldLabel : '检修单位名称'
	        },{
	        	xtype : 'textfield',
	        	id : 'wuserID2',
	        	fieldLabel : '负责人ID'
	        },{
	        	xtype : 'textfield',
	        	id : 'wusername2',
	        	fieldLabel : '负责人名'
	        }],
	        buttons:[{xtype : 'button',text :'修改',listeners : {click : OnSave}
	        } ],
	closeAction : 'hide',
	model : true

});
function OnSave()
{
	
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		async : false,
		params : {
			parName : [ 'MENDDEPT_CODE','MENDDEPT_NAME','USERID','USERNAME' ],
			parType : [ 's', 's', 's','s' ],
			parVal : [ selectedRecord[0].data.MENDDEPT_CODE,
			           Ext.getCmp('wmenddept_name2').getValue(),
			           Ext.getCmp('wuserID2').getValue(),
			           Ext.getCmp('wusername2').getValue()],
					//Ext.util.Cookies.get("mm.userid"),
					//Ext.util.Cookies.get("mm.username") ],
			proName : 'pro_dj701_update1',
			returnStr : [ 'RET' ],
			returnStrType : [ 's' ]
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
				window1.hide();
				 OnClickSearch();
			} else {
				Ext.example.msg('提示', "操作失败");
				
			}
		}
	});
	}
function OnConfirm(){
	Ext.getCmp('window1').show();
	selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	Ext.getCmp('wmenddept_name2').setValue(selectedRecord[0].data.MENDDEPT_NAME);
	Ext.getCmp('wuserID2').setValue(selectedRecord[0].data.USERID);
	Ext.getCmp('wusername2').setValue(selectedRecord[0].data.USERNAME);
	
}
function OnUpdate(){
	var selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	if (selectedRecord != null && selectedRecord != "") {
		if (selectedRecord.length == 1) {
			Ext.getCmp('window1').show();
			Ext.getCmp('menddept_name').setValue(selectedRecord[0].data.MENDDEPT_NAME);
			Ext.util.Cookies.get("mm.userid");
			Ext.util.Cookies.get("mm.username");

		} else {
			Ext.Msg.alert("提示", "只能选择一条记录修改");
		}
	} else {
		Ext.Msg.alert("提示", "至少选择一条记录");
	}
}

function OnClickSearch(){
	Ext.data.StoreManager.lookup('gridStore').setProxy(
			{
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
				extraParams : {
					parName : [ 'MENDDEPT_NAME','USERNAME' ],
					parType : ['s','s'],
					parVal : [
					          Ext.getCmp('mendDept').getValue(),
					          Ext.getCmp('mendPerson').getValue()// ,
					          // Ext.util.Cookies.get("mm.username")
					          
							 ],
					proName : 'pro_dj701_select',
					cursorName : 'RET'
				}
			});

			Ext.data.StoreManager.lookup('gridStore').load();
}
function OnAdd() {
	var dialog = window.showModalDialog(AppUrl + "/DJ/DJ701add.jsp", null,
			"dialogHeight:500px;dialogWidth:650px");
	 OnClickSearch();
}


function OnClickSearch2() {
	var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectedRecord != null && selectedRecord != "") {
		if (selectedRecord.length == 1) {
			var dialog = window.showModalDialog(AppUrl + "/DJ/DJ701query.jsp?MENDDEPT_CODE="
					+selectedRecord[0].data.MENDDEPT_CODE);
		}else {
			Ext.Msg.alert("提示", "只能选择一条记录");
		}
	}else {
		Ext.Msg.alert("提示", "至少选择一条记录");
	}
	
}

function LookMore2(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<a onclick='delFixContent(\"" + rowIdx.toString() + "\")' style='color:blue'>删除</a>";
}
function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	//return "<a href='#' >修改</a>";
	
	
	return '<a  onclick="OnConfirm()" style="color:blue">修改</a>';
	//return "<a onclick='OnConfirm(\"" + rowIdx.toString() + "\")' style='color:blue'>修改</a>";
}

function delFixContent(rowIdx){
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.MENDDEPT_CODE;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'menddept_code_IN' ],
			parType : [ 's' ],
			parVal : [ id ],
			proName : 'pro_dj701_delete',
			returnStr : [ 'ret' ],
			returnStrType : [ 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
			} else {
				Ext.example.msg('提示', "操作失败");
			}
		}
	});
	OnClickSearch();
}





