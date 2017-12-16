var gridStore=Ext.create('Ext.data.Store',{
	autoLoad: true,
    storeId: 'gridStore',
    fields: ['MENDTYPE_CODE','MENDTYPE_DESC','USEFLAG','USEFLAG_DESC'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_WP_MENDTYPE_ALL1',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{}
    }
});

var panel=Ext.create('Ext.panel.Panel',{
	frame:true,
	width:'100%',
	layout:'column',
	region:'north',
	items:[{xtype:'textfield',fieldLabel:'维修类型',id:'wxlx',labelAlign:'right',labelWidth:90,style:{margin : '5px 0px 5px 5px'}},
	       {xtype:'textfield',fieldLabel:'维修类型描述',id:'wxlxms',labelAlign:'right',labelWidth:90,style:{margin : '5px 0px 5px 5px'}},
	       {xtype:'combo',fieldLabel:'使用状态',id:'syzt',store:[['1','启用'],['0','停用']],labelAlign:'right',labelWidth:90,style:{margin : '5px 0px 5px 5px'},editable:false,value:'1'},
	       {xtype:'button',text:'添加类型',style:{margin : '5px 0px 5px 5px'},icon:imgpath+'/add.png',listeners:{click:OnBtnAdd}},
	       {xtype:'button',text:'修改类型',style:{margin : '5px 0px 5px 5px'},icon:imgpath+'/edit.png',listeners:{click:OnBtnEdit}},
	       {xtype:'button',text:'查询',style:{margin : '5px 0px 5px 5px'},icon:imgpath+'/search.png',listeners:{click:OnBtnQuery}}]
});

var grid=Ext.create('Ext.grid.Panel',{
	id:'grid',
	region:'center',
	columnLines : true,
	width : '100%',
	autoScroll : true,
	store:gridStore,
	height:400,
	columns:[{xtype : 'rownumberer',width : 30,sortable : false},
	         {text : '维修类型',dataIndex : 'MENDTYPE_CODE',align : 'center',renderer:Atleft,width:160},
	         {text : '描述',dataIndex : 'MENDTYPE_DESC',align : 'center',renderer:Atleft,width:160},
	         {text : '使用状态',dataIndex : 'USEFLAG_DESC',align : 'center',renderer:Atleft,width:160},
	         {text : '选择操作',align : 'center',renderer:OnCheck}]
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [panel,grid]
	});
});

function OnBtnQuery(){
	Ext.data.StoreManager.lookup('gridStore').load();
}

function OnBtnAdd(){
	Ext.Ajax.request({
        url: AppUrl+ 'pm_19/PRO_WP_MENDTYPE_ADD',
        async: false,
        method: 'post',
    	params: {
			A_MENDTYPE:Ext.getCmp('wxlx').getValue(),
			A_MENDTYPE_DESC:Ext.getCmp('wxlxms').getValue(),
			A_USEFLAG:Ext.getCmp('syzt').getValue()
    	},
    	success: function (resp) {
    		var resp = Ext.decode(resp.responseText);
    		if(resp.RET=='Success'){
    			OnBtnQuery();
    		}else{
    			Ext.Msg.alert('操作信息','添加失败');
    		}
    	}
	});
}

function OnBtnEdit(){
	Ext.Ajax.request({
        url: AppUrl+ 'pm_19/PRO_WP_MENDTYPE_UPDATE',
        async: false,
        method: 'post',
    	params: {
			A_MENDTYPE:Ext.getCmp('wxlx').getValue(),
			A_MENDTYPE_DESC:Ext.getCmp('wxlxms').getValue(),
			A_USEFLAG:Ext.getCmp('syzt').getValue()
    	},
    	success: function (resp) {
    		var resp = Ext.decode(resp.responseText);
    		if(resp.RET=='Success'){
    			OnBtnQuery();
    		}else{
    			Ext.Msg.alert('操作信息','添加失败');
    		}
    	}
	});
}

function OnCheck(value, metaData,record){
	return '<div><a href="javascript:OnClickCheck()">选择</a></div>';
}

function OnClickCheck(){
	Ext.getCmp('wxlx').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.MENDTYPE_CODE);
	Ext.getCmp('wxlxms').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.MENDTYPE_DESC);
	Ext.getCmp('syzt').select(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.USEFLAG);
}

function Atleft(value, metaData,record){
	metaData.style = 'text-align: left';
	return  value;
}