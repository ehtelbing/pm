// JavaScript Document

//-----------------
var thisDate = new Date();
var thisYear = thisDate.getFullYear();
var thisMonth = thisDate.getMonth()+1;
 var topP = Ext.create('Ext.form.Panel',{
	 //title:'topP',
	 region:'north',
	 height:50,
	 frame:true,
	 items:[
	 {layout:'column',frame:true,border:false,baseCls:'my-panel-no-border',defaults:{xtype:'combo',labelAlign:'right',editable:false,margin:'10 5 5 5',},items:[
		  {xtype:'displayfield',fieldLabel:'库存查询',margin:'10px 0 5 -10px'}
	 ]
	 }
	 
	
	
	 ]
 });

 var centerPStore = Ext.create('Ext.data.Store',{
	 fields:['index1','index2','index3','index4'],
	 data:[
	 {'index1':'齐矿','index2':10,'index3':30,'index4':50},{'index1':'鞍千','index2':20,'index3':50,'index4':80}
	 ]
 });
 
 
 
 var centerP = Ext.create('Ext.grid.Panel',{
	 border:false,//
	 //baseCls:'my-panel-no-border',
	 //title:'详细信息',
	 region:'center',
	 store:centerPStore,
	 features:[{ftype:'summary'}],
	 columns:[
	    {text:'厂矿',align:'center',dataIndex:'index1'},
		{text:'库存预警',align:'center',dataIndex:'index2'}
	 ]
	 
 });
//------------------
Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[topP,centerP]
	});
});