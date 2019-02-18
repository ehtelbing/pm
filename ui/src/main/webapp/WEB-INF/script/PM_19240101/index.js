var limits = '';
var equCode='';

var CKCODE=""
if(location.href.split('?')!=undefined){
    CKCODE=Ext.urlDecode(location.href.split('?')[1]).DEPTCODE;
}
var sapCastStore = Ext.create('Ext.data.Store',{
	id:'sapCastStore',
	autoLoad: true,
	fields:['V_CBZX','V_CASTNAME'],
	proxy: {
        type: 'ajax',
        url: AppUrl+'pm_19/PRO_SAP_CAST_DROP',
        extraParams:{
			V_V_DEPTCODE:Ext.urlDecode(location.href.split('?')[1]).DEPTNEXTCODE
        },
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }	
});

var equLevStore = Ext.create('Ext.data.Store',{
	id:'equLevStore',
	autoLoad: true,
	fields:['V_EQULEV','V_EQULEVNAME'],
	proxy: {
        type: 'ajax',
        url: AppUrl+'pm_19/PRO_SAP_EQU_LEV_DROP',
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

var ABCStore = Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    data : [
        {"id":"A", "name":"A"},
        {"id":"B", "name":"B"},
        {"id":"C", "name":"C"}
    ]
});

var gridstore = Ext.create('Ext.data.Store',{
	id:'gridstore',
	autoLoad: false,
	fields:['V_EQUTYPETXNAME','V_EQUTYPETXCODE','V_EQUTYPETXVALUE'],
	proxy: {
        type: 'ajax',
        url: AppUrl+'pm_19/PRO_SAP_EQU_TYPE_TXVAL_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }	
});

var centerPanel = {
		xtype:'panel',
		id:'pp',
		region:'center',  
 	    border:false,
 	    autoScroll:true,
 	    width:'100%',
 	    frame:true,
 	    title:'添加设备',
 	   layout:{
		   type:'table',
		   columns:4,
		   width:'100%',
		   heigth:'100%'
	   },
 	    items:[
 	           {xtype:'textfield', fieldLabel:'上级编码', id:'V_EQUCODEUP',labelAlign:'right',colspan:2,style:'margin:20px 0 5px 0',readOnly:true},
 	          {xtype:'textfield', fieldLabel:'上级名称', id:'V_EQUNAMEUP',labelAlign:'right',colspan:2,style:'margin:20px 0 5px 0',readOnly:true},
 	         {xtype:'textfield', fieldLabel:'设备名称', id:'V_EQUNAME',labelAlign:'right',grow: true, allowBlank: false,colspan:3,width:517},{xtype:'label',text:'*',style:'color:red'},
 	         {xtype:'textfield',hidden:true,id:'V_EQUCODE'},
 	        {xtype:'textfield', fieldLabel:'设备位置', id:'V_EQUSITENAME',labelAlign:'right',grow: true, allowBlank: false,colspan:3,width:517},{xtype:'label',text:'*',style:'color:red'},
 	       {xtype:'textfield',hidden:true,id:'V_EQUSITE'},
 	       {xtype:'textfield', fieldLabel:'设备类型', id:'V_EQUTYPENAME',labelAlign:'right',grow: true, allowBlank: false,colspan:3,width:517},{xtype:'label',text:'*',style:'color:red'},
 	      {xtype:'textfield',hidden:true,id:'V_EQUTYPECODE'},
 	      {xtype:'datefield', fieldLabel:'开始日期', id:'V_DATE_B',labelAlign:'right', format:'Ymd',value:new Date()},{xtype:'label',text:'*',style:'color:red'},
 	     {xtype:'datefield', fieldLabel:'结束日期', id:'V_DATE_E',labelAlign:'right', format:'Ymd',value:'99991231'},{xtype:'label',text:'*',style:'color:red'},
 	    {xtype:'combo', fieldLabel:'成本中心', id:'V_CBZX',labelAlign:'right',width:517,colspan:4,store:sapCastStore,editable: false, valueField: 'V_CBZX', queryMode: 'local', displayField: 'V_CASTNAME'},
 	   {xtype:'combo', fieldLabel:'设备种类', id:'equlev',labelAlign:'right',colspan:2,store:equLevStore,editable: false, valueField: 'V_EQULEV', queryMode: 'local', displayField: 'V_EQULEVNAME'},
 	  {xtype:'combo', fieldLabel:'ABC标识', id:'V_ABC',labelAlign:'right',colspan:2,store:ABCStore,editable: false, valueField: 'id', queryMode: 'local', displayField: 'name'},
 	 {xtype:'textfield', fieldLabel:'型号规格', id:'V_GGXH',labelAlign:'right',colspan:2},
 	{xtype:'textfield', fieldLabel:'大小/尺寸', id:'V_SIZE',labelAlign:'right',colspan:2},
 	{xtype:'textfield', fieldLabel:'资产制造商', id:'V_ZZS',labelAlign:'right',colspan:4,width:517},
 	{xtype:'numberfield', fieldLabel:'购置价值', id:'F_MONEY',labelAlign:'right',colspan:2,minValue:0,value:0},
 	{xtype:'textfield', fieldLabel:'货币种类', id:'V_MONEYTYPE',labelAlign:'right',value:'CNY',colspan:2},
 	{xtype:'numberfield', fieldLabel:'对象重量', id:'F_WEIGHT',labelAlign:'right',colspan:2,minValue:0,value:0},
 	{xtype:'textfield', fieldLabel:'重量单位', id:'V_WEIGHTTYPE',labelAlign:'right',value:'T',colspan:2}
 	           ],dockedItems:[
 	                          {xtype:'panel',layout:'column',height:40,frame:true,items:[
{xtype:'button',text:'保存设备信息', icon: imgpath +'/filesave.png',style:'margin:5px 0 5px 100px',listeners:{click:OnClickSaveButton}},
 {xtype:'button',text:'关闭', icon: imgpath +'/undo.png',style:'margin:5px 0 5px 10px', listeners:{click:OnClickCloseButton}}
 	                                                                ]}
 	                          ]
}

var northPanel = {
		xtype:'panel',
		region:'east',
		width:400,
		hidden:true,
		id:'nnArea',
		autoScroll: true,
		title:'设备特性编辑区',
		items:[
		       {xtype:'gridpanel',
		    	   store: gridstore,
			        columnLines: true,
			        width: '100%',
			        height:'100%',
			        id:'gridBJ',
			        plugins : [ Ext.create(
							'Ext.grid.plugin.CellEditing', {
								clicksToEdit : 1
							}) ],
			        autoScroll: true,
			        columns:[
			                 {xtype:'rownumberer', text:'序号',align:'center',width:30},
			                 {text:'特性名称', dataIndex:'V_EQUTYPETXNAME', align:'center', renderer:AlignLeft, flex:2},
			                 {text:'特性值', dataIndex:'V_EQUTYPETXVALUE', align:'center',field : {xtype : 'textfield',minValue :0},renderer:AlignSZ,flex:1}
			                 ],dockedItems:[
			                               {xtype:'panel',frame:true, layout:'column',height:35, items:[
			                                                                      {xtype:'button', text:'添加特性', id:'btnAddTX', icon:imgpath+'/add.png', width:100, style:'margin:2px 0 0 10px', listeners:{click:OnClickAddButton}},
			                                                                      {xtype:'button', text:'保存特性', id:'btnAdd', icon:imgpath+'/filesave.png', width:100, style:'margin:2px 0 0 10px', listeners:{click:OnClickSaveTXButton}},
			                                                                      {xtype:'checkbox', style:'margin:2px 0 0 10px',id:'updateTL'},{xtype:'label',text:'更新同类设备', style:'margin:5px 0 0 10px'}
			                                                                      ]}
			                               ]
			        }
		       ]
};
Ext.onReady(function(){
Ext.QuickTips.init();	
	Ext.create('Ext.container.Viewport',{
		xtype:'panel',
		layout:'border',
		items:[centerPanel,northPanel]
	});
	
	Ext.getCmp('V_EQUCODEUP').setValue(Ext.urlDecode(location.href.split('?')[1]).EQUCODEUP);
	Ext.getCmp('V_EQUNAMEUP').setValue(Ext.urlDecode(location.href.split('?')[1]).EQUNAMEUP);
	if(Ext.urlDecode(location.href.split('?')[1]).EQUCODEUP!=""){
		Ext.getCmp('V_EQUSITENAME').setReadOnly(true);
		limits = 'V_EQUNAME^V_EQUTYPENAME';
	}else{
		limits = 'V_EQUNAME^V_EQUSITENAME^V_EQUTYPENAME';
		Ext.fly('V_EQUSITENAME').on('click',ChoiceEquSite);
	}
	Ext.data.StoreManager.lookup('sapCastStore').on("load",function() {
		Ext.getCmp("V_CBZX").select(Ext.data.StoreManager.lookup('sapCastStore').getAt(0));
	});
	Ext.data.StoreManager.lookup('equLevStore').on("load",function() {
		Ext.getCmp("equlev").select(Ext.data.StoreManager.lookup('equLevStore').getAt(0));
	});
	Ext.getCmp('V_ABC').select('A');
	Ext.fly('V_EQUTYPENAME').on('click',ChoiceEquLev);//,listeners:{focus:ChoiceEquLev}
	Ext.fly('V_EQUTYPENAME').on('change',function(){
		Ext.getCmp('nnArea').setVisible(false);
	});

	Ext.fly('V_EQUSITENAME').on('click',ChoiceEquSite);//,listeners:{focus:ChoiceEquSite}
});

function OnClickSaveButton(){
	if(!ValidateMes(limits)){
		Ext.Msg.alert('操作信息',"请填写必填项后再保存！");
	}else{
		Ext.Ajax.request({
	    	url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_SET',
	        method: 'POST',
	        params: {
				V_V_DEPTCODE:Ext.urlDecode(location.href.split('?')[1]).DEPTCODE,
				V_V_DEPTNEXTCODE:Ext.urlDecode(location.href.split('?')[1]).DEPTNEXTCODE,
				V_V_EQUCODE:'-1',
				V_V_EQULEV:Ext.getCmp('equlev').getValue(),
				V_V_EQUNAME:Ext.getCmp('V_EQUNAME').getValue(),
				V_V_EQUSITE:Ext.getCmp('V_EQUSITE').getValue(),
				V_V_ZZCH:'',
				V_V_EQUTYPECODE:Ext.getCmp('V_EQUTYPECODE').getValue(),
				V_F_MONEY:Ext.getCmp('F_MONEY').getValue(),
				V_V_MONEYTYPE:Ext.getCmp('V_MONEYTYPE').getValue(),
				V_F_WEIGHT:Ext.getCmp('F_WEIGHT').getValue(),
				V_V_WEIGHTTYPE:Ext.getCmp('V_WEIGHTTYPE').getValue(),
				V_V_DATE_B:Ext.Date.format(Ext.getCmp('V_DATE_B').getValue(), 'Ymd').split('-')[0],
				V_V_DATE_E:Ext.Date.format(Ext.getCmp('V_DATE_E').getValue(), 'Ymd').split('-')[0],
				V_V_ZZS:Ext.getCmp('V_ZZS').getValue(),
				V_V_GGXH:Ext.getCmp('V_GGXH').getValue(),
				V_V_ABC:Ext.getCmp('V_ABC').getValue(),
				V_V_SIZE:Ext.getCmp('V_SIZE').getValue(),
				V_V_CBZX:Ext.getCmp('V_CBZX').getValue(),
				V_V_EQUCODEUP:Ext.urlDecode(location.href.split('?')[1]).EQUCODEUP=='-1'?null:Ext.urlDecode(location.href.split('?')[1]).EQUCODEUP
	        },
			success: function (response) {
	        	 var resp = Ext.decode(response.responseText);
	        	 Ext.Msg.alert('操作信息',resp.V_CURSOR);
	        	 if(resp.V_CURSOR=='成功'){
	        		 equCode = resp.V_V_EQUCODENEW;
	        		 Ext.data.StoreManager.lookup('gridstore').load({
	        				params:{
								V_V_EQUCODE:resp.V_V_EQUCODENEW,
								V_V_EQUTYPECODE:Ext.getCmp('V_EQUTYPECODE').getValue()
	        				}
	        			});
	        		 Ext.getCmp('nnArea').setVisible(true);
	        	 }
	        }
	    });
	}
}
//设备类型选择
function ChoiceEquLev(){
	window.open(AppUrl+'page/PM_19240105/index.html', '', 'dialogHeight:500px;dialogWidth:800px');
}
function getReturnEquType(ret){
	if(ret!=null&&ret!=""&&ret!=undefined){
		Ext.getCmp('V_EQUTYPECODE').setValue(ret[0]);
		Ext.getCmp('V_EQUTYPENAME').setValue(ret[1]);
	}
}
//设备位置选择
function ChoiceEquSite(){
	window.open(AppUrl+'page/PM_19240104/newindex.html?CKCODE='+CKCODE, '','dialogHeight:500px;dialogWidth:800px');
}
function getReturnEquSite(ret){
	if(ret!=null&&ret!=""&&ret!=undefined){
		Ext.getCmp('V_EQUSITENAME').setValue(ret[1]);
		Ext.getCmp('V_EQUSITE').setValue(ret[0]);
	}
}
//添加特性
function OnClickAddButton(){
	window.open(AppUrl+'page/PM_19240106/index.html?typecode='+Ext.getCmp('V_EQUTYPECODE').getValue()+'&typename='+Ext.getCmp('V_EQUTYPENAME').getValue()+'&txcode=-1', '', 'dialogHeight:500px;dialogWidth:800px');
}
function SecondGrid(){
	Ext.data.StoreManager.lookup('gridstore').load({
		params:{
			V_V_EQUCODE:equCode,
			V_V_EQUTYPECODE:Ext.getCmp('V_EQUTYPECODE').getValue()
		}
	});
}
//保存特性
function OnClickSaveTXButton(){
	Ext.getCmp('gridBJ').getPlugin().completeEdit();
	var err = 0;
	var errMsg = '';
	for(var i=0;i<Ext.data.StoreManager.get('gridstore').data.items.length;i++){
		Ext.Ajax.request({
			url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TXVAL_SET',
	        method: 'POST',
	        params: {
				V_V_EQUCODE: equCode,
				V_V_EQUTYPECODE:Ext.getCmp('V_EQUTYPECODE').getValue(),
				V_V_EQUTYPETXCODE:Ext.data.StoreManager.get('gridstore').data.items[i].raw.V_EQUTYPETXCODE,
				V_V_EQUTYPETXVALUE:Ext.data.StoreManager.get('gridstore').data.items[i].data.V_EQUTYPETXVALUE,
				V_UPDATEALL:Ext.getCmp('updateTL').getValue()
	        },
			success: function (response) {
	        	 if(Ext.decode(response.responseText).V_CURSOR=="成功"){
				 }else{
					 err++;
					 errMsg=Ext.decode(response.responseText).V_CURSOR;
				 }
	        }
		});
	}
	if(err>0){
		Ext.Msg.alert('提示信息',errMsg);
	}else{
		Ext.Msg.alert('操作信息',"保存成功！");
	}
}
//关闭
function OnClickCloseButton(){
	if (window.top.frames['Workspace192401'] == null) {
		window.close();
		window.top.CloseWorkItem('19240101');
	} else {
		window.top.frames['Workspace192401'].QueryGrid();
		window.top.frames['Workspace192401'].QueryTree();
		window.top.CloseWorkItem('19240101');
	}
}

function AlignLeft(value, metaData){
	return '<div style="text-align:left;">'+value+'</div>';
}

function AlignSZ(value, metaData,record){
	if(value==null){
		return '<div style="text-align:left;">'+record.raw.V_EQUTYPETXVALUE+'</div>';
	}else{
		return '<div style="text-align:left;">'+value+'</div>';
	}
}

ValidateMes = function(id){
	for(var i=0;i<id.split('^').length;i++){
		if(Ext.getCmp(id.split('^')[i]).getValue()==''){
			return false;
		}
	}
	return true;
}
