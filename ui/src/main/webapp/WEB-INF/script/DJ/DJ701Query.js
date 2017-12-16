var globalmenddept_code='';
if(location.href.split('?')[1]!=null){ 
	globalmenddept_code = Ext.urlDecode(location.href.split('?')[1]).MENDDEPT_CODE;
}
Ext.onReady(function() {
 
    var gridStore = Ext.create('Ext.data.Store', {	
        storeId: 'gridStore',
        pageSize:100,
        fields : ['MENDDEPT_NAME','USERNAME','USERID'],
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
    var list = Ext.create('Ext.panel.Panel', {
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
		        type: 'hbox'
		        //columns: 1
		      },
		      items:[
		         {xtype:'button',text:'新增',id:'add',listeners : {click : OnAdd},margin:'0px 0px 4px 10px'}
			   ]}
		]
	});
	 var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			width : '100%',
			selType:'checkboxmodel',
			autoScroll : true,
			store :gridStore,
			dufaults:{width:120},
			 plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ],
			columns : [ 
			          
			            
					  { text : '检修单位名称', dataIndex : 'MENDDEPT_NAME',align : 'center',width:150},
					  { text : '人员', dataIndex : 'USERNAME',  align : 'center',width:140}, 
					  {	text : '删除',align : 'center',renderer : LookMore2}
					     
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore'  } 
           ]
		});
		
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ list,grid   ]
	});
	gridStore.on('beforeload', function (store, options) {
   	    var params = {
  	            parName : ['MENDDEPT_CODE'],
				parType : ['s'],
				parVal : [  globalmenddept_code ],
				proName : 'pro_dj701_view',
				cursorName : 'RET'
  	   };
  	   Ext.apply(store.proxy.extraParams, params);
});

gridStore.load();
});

function OnAdd() {
	var dialog = window.showModalDialog(AppUrl + "/DJ/DJ701add2.jsp?MENDDEPT_CODE="
					+globalmenddept_code);
	Ext.data.StoreManager.lookup('gridStore').load();
}
function LookMore2(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<a onclick='delFixContent(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}

function delFixContent(rowIdx){
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.USERID;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'userID_IN' ],
			parType : [ 's' ],
			parVal : [ id ],
			proName : 'pro_dj701_persondel',
			returnStr : [ 'ret' ],
			returnStrType : [ 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.data.StoreManager.lookup('gridStore').load();
				Ext.example.msg('提示', "操作成功");
			} else {
				
				Ext.example.msg('提示', "操作失败");
			}
		}
	});
	
}
