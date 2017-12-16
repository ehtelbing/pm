var use = [];
use.push({ display:'启用', value: '1'});
use.push({ display:'停用', value: '0'});
var useStore =  Ext.create("Ext.data.Store", {
    fields: ['display', 'value'],
    storeId: 'useStore',
    data: use,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
    

var gridStore = Ext.create("Ext.data.Store", {
	pageSize: 10,
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['DICTID', 'DICT_DESC', 'USEFLAG','USEFLAG_DESC'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_WP_DICT_ALL1',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners:{ beforeload: OnGridStoreBeforeLoad}
});

var Layout = {
    layout: 'border',
    items: [
            	{ xtype: 'panel', title: '维修专业设置', titleAlign: 'left', region: 'north', border: false},
            	{ xtype: 'panel', width: '100%', region: 'north', frame: true,layout: 'column', border: false, 
                  items:[
						{ xtype: 'textfield', fieldLabel: '专业分类ID',style: { margin:'5px 0px 5px 5px'}, id: 'specialID', labelWidth: 90,width:252, labelAlign: 'right'},
					   { xtype: 'textfield', fieldLabel: '专业分类描述',style: { margin:'5px 0px 5px 5px'}, id: 'specialDESC', labelWidth: 90,width:252, labelAlign: 'right'},
					   { xtype: 'combo', fieldLabel: '使用标识',labelWidth: 90, id: 'uses', store: 'useStore', displayField: 'display', valueField: 'value',labelAlign: 'right', style: {margin:'5px 0px 5px 5px'}},
					   { xtype: 'button', text: '添加', width: 70,icon : imgpath + '/add.png',  style: { margin:'5px 0px 5px 5px'}, handler: btnInsert},
					   { xtype: 'button', text: '修改', width: 70, icon : imgpath + '/edit.png', style: { margin:'5px 0px 5px 5px'}, handler: btnModify},
					   { xtype: 'button', text: '查询',width: 70,icon : imgpath + '/search.png',   style: {margin:'5px 0px 5px 5px'}, handler: btnQuery}
                  ]
                 },
                        {
                        	xtype: 'gridpanel', colomnLines: true, id: 'grid', region: 'center', forceFit: true, store: 'gridStore',
                        	columns: [
                        	         { text: '专业分类',  width: 50, dataIndex: 'DICTID', align: 'center'},
                        	         { text: '专业分类描述', dataIndex: 'DICT_DESC', align: 'center'},
                        	         { dataIndex: 'USEFLAG', hidden: true},
                        	         { text: '使用标识', width: '1%',  dataIndex: 'USEFLAG_DESC', align: 'center'},
                        	         { text: '选择', width: '1%', align: 'center', renderer: function(){
                        	        	 return '<input type="button" value="选择" onclick="btnChange()" />';
                        	         }}
                        	         ],
                        	         bbar: [
                                	           '->'
                                	           ,{
                                	              xtype: 'pagingtoolbar',
                                	              dock: 'bottom',
                                	              displayInfo: true,
                                	              store: 'gridStore',
                                	              displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                                	              emptyMsg: '没有记录'
                                	}]
                        }
                 ]

};
    
    
    
function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.getCmp("uses").select(Ext.data.StoreManager.lookup('useStore').getAt(0));
    btnQuery();
}

function btnInsert(){
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_ADD',
	        method: 'POST',
	        params:{
				A_DICTID:Ext.getCmp('specialID').getValue(),
				A_DICT_DESC:Ext.getCmp('specialDESC').getValue(),
				A_USEFLAG:Ext.getCmp('uses').getValue()
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success') {
					Ext.Msg.alert('操作信息','添加成功');
					Ext.getCmp('specialID').setValue(' ');
					Ext.getCmp('specialDESC').setValue(' ');
					btnQuery();
	        	} else{
	        		Ext.Msg.alert('操作信息','添加失败，请确认录入信息是否正确');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
}

function btnModify(){
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_UPDATE',
	        method: 'POST',
	        params:{
				A_DICTID:Ext.getCmp('specialID').getValue(),
				A_DICT_DESC:Ext.getCmp('specialDESC').getValue(),
				A_USEFLAG:Ext.getCmp('uses').getValue()
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success') {
					Ext.Msg.alert('操作信息','修改成功');
					Ext.getCmp('specialID').setValue(' ');
					Ext.getCmp('specialDESC').setValue(' ');
					btnQuery();
	        	}else{
	        		Ext.Msg.alert('操作信息','修改失败，请确认录入信息是否正确');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
}

function btnChange(){
	var asd = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
	Ext.getCmp('specialID').setValue(asd.DICTID);
	Ext.getCmp('specialDESC').setValue(asd.DICT_DESC);
	//Ext.getCmp('uses').setValue(asd.USEFLAG_DESC.substr(1));
	var USEFLAG='0';
	if(asd.USEFLAG_DESC.substr(1)=='启用'){
		USEFLAG='1';
	}
	Ext.getCmp('uses').select(USEFLAG);
}

function btnQuery(){
	Ext.data.StoreManager.get('gridStore').load();
}

function OnGridStoreBeforeLoad(store){}


Ext.onReady(onPageLoaded);
