var V_V_EQUCODE='';
var V_DATE_B='';
var V_D_ALTERTIME=''
if(location.href.split('?')[1]!=null&&location.href.split('?')[1]!=''){
	V_V_EQUCODE=Ext.urlDecode(location.href.split('?')[1]).V_V_EQUCODE;
	V_DATE_B=Ext.urlDecode(location.href.split('?')[1]).V_D_ALTERTIME;
	V_D_ALTERTIME=Ext.Date.parse('V_DATE_B', 'Ymd');
	V_D_ALTERTIME=Ext.util.Format.date(V_D_ALTERTIME,'Y-m-d');
}
Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		id: 'gridStore',
		pageSize: 15,
		autoLoad: false,
		fields:['V_EQUCODE','V_FILENAME','V_FILEURL','D_ALTERTIME','N_IS_MAINPHOTO','D_DATE_EDITTIME','V_EDIT_GUID','V_FILETYPE'],
		proxy: {
			type: 'ajax',
			url: AppUrl+'sxd/SEL_SAP_PM_EQU_FILE',
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json',
				root: 'list'
			}
		}
	})

	var panel = Ext.create('Ext.Panel', {
		id :'panel',
		region: 'north',
		width: '100%',
		frame: true,
		layout: 'column',
		defaults : {
			style : 'margin:5px 0px 5px 5px',
			labelAlign : 'right'
		},
		items: [{
			xtype : 'form',
			id:'formpanel',
			layout : 'column',
			baseCls : 'my-panel-no-border',
			frame : true,
			width : '100%',
			items : [{
				xtype : 'filefield',
				id : 'upload',
				name : 'upload',
				fieldLabel : '上传文件',
				width : 300,
				msgTarget : 'side',
				allowBlank : true,
				anchor : '100%',
				buttonText : '浏览....',
				style : ' margin: 5px 0px 5px 10px'
			}, {
				xtype: 'textfield',
				id: 'filetype',
				labelAlign : 'right',
				style : ' margin: 5px 0px 5px 10px',
				queryMode: 'local',
				fieldLabel: '资料类型',
				labelWidth: 100
			}, {
				xtype : 'button',
				width : 60,
				text : '保存记录',
				style : ' margin: 5px 0px 0px 10px',
				handler : function () {
					var formpanel = Ext.getCmp('formpanel');
					if(Ext.getCmp('upload').getValue()==''||Ext.getCmp('upload').getValue()==null||Ext.getCmp('upload').getValue()==undefined){
						Ext.Msg.alert('提示信息', '请选择要的上传文件');
						return;
					}else if(Ext.getCmp('filetype').getValue()==''||Ext.getCmp('filetype').getValue()==null||Ext.getCmp('filetype').getValue()==undefined){
						Ext.Msg.alert('提示信息', '请填写资料类型');
						return;
					}else{
						formpanel.submit({
							url: AppUrl + 'sxd/UPLOAD',
							async: false,
							method: 'POST',
							params : {
								V_V_EQUCODE:V_V_EQUCODE,
								V_D_ALTERTIME:V_D_ALTERTIME,
								V_N_IS_MAINPHOTO:0,
								V_FILETYPE:Ext.getCmp('filetype').getValue()
							},
							success: function (response) {
								var data = Ext.decode(response.responseText);
								Ext.Msg.alert('提示信息', '保存成功');
								Ext.getCmp('filetype').setValue('');
							}
						});
						//gridload();
					}
				}
			}]
		}, {
			xtype: 'button',
			text: '刷新',
			width : 60,
			style : ' margin: 10px 0px 10px 10px',
			listeners: {click: gridload}
		}, {
			xtype: 'button',
			text: '删除',
			width : 60,
			style : ' margin: 10px 0px 10px 10px',
			listeners: {click: OnButtonDelClicked}
		}]
	});

	var grid = Ext.create('Ext.grid.Panel', {
		id: 'grid',
		region: 'center',
		width: '100%',
		pageSize: 5,
		columnLines: true,
		store: gridStore,
		autoScroll: true,
		selType: 'checkboxmodel',
		style: 'text-align:center',
		height: 400,
		selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
			selType: 'checkboxmodel',
			mode: 'SIMPLE'
		},
		columns: [{xtype: 'rownumberer', text: '序号', width : 50,align:'center'},
			{text:'设备编码', dataIndex:'V_EQUCODE', align:'center', width:180},
			{text:'文件名称', dataIndex:'V_FILENAME', align:'center', width:180},
			{text:'上传时间',dataIndex:'D_DATE_EDITTIME', align:'center', width:170},
			{text:'资料类型',dataIndex:'V_FILETYPE', align:'center', width:130},
			{text:'附件地址',dataIndex:'V_FILEURL', hidden:true}
		]
	});

	Ext.create('Ext.container.Viewport', {
		id: "id",
		layout: 'border',
		items: [panel,grid]
	});

	gridload();
});

function OnButtonDelClicked() {
	var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
	if (records.length == 0) {//判断是否选中数据
		Ext.MessageBox.show({
			title: '提示',
			msg: '请选择一条数据',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	Ext.MessageBox.show({
		title: '确认',
		msg: '您确定要删除吗？',
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESION,
		fn: function (btn) {
			if (btn == 'yes') {
				var i_err=0;
				for(var i=0;i<records.length;i++){
					Ext.Ajax.request({
						url: AppUrl + 'sxd/DEL_SAP_PM_EQU_FILE',
						type: 'ajax',
						method: 'POST',
						params: {
							V_FILEURL : records[i].get('V_FILEURL'),
							V_V_FILENAME : records[i].get('V_FILENAME')
						},
						success: function (response) {
							var data = Ext.decode(response.responseText);//后台返回的值
							if (data.V_CURSOR=='Success') {//成功，会传回true
								i_err++;
								if(i_err==records.length){
									Ext.Msg.alert('提示信息','删除成功');
									gridload();
								}
							} else {
								Ext.MessageBox.show({
									title: '错误',
									msg: data.V_CURSOR,
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.ERROR,
									fn:function () {
										gridload();
									}
								});
							}
						},
						failure: function (response) {//访问到后台时执行的方法。
							Ext.MessageBox.show({
								title: '错误',
								msg: response.responseText,
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.ERROR,
								fn:function () {
									gridload();
								}
							})
						}
					})
				}
			}
		}
	});
}

function gridload(){
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_V_EQUCODE:V_V_EQUCODE
		}
	});
}