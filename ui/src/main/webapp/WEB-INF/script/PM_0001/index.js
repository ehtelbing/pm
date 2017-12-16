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
		  {xtype:'displayfield',fieldLabel:'岗位点检',margin:'5 0 5 10'},
	        {xtype:'displayfield',fieldLabel:'专业点检',margin:'5 0 5 10'}
	 ]
	 }
	 
	
	
	 ]
 });

 var centerPStore = Ext.create('Ext.data.Store',{
	 fields:['index1','index2','index3'],
	 data:[
	 {'index1':'齐矿','index2':5,'index3':41},{'index1':'鞍千','index2':10,'index3':52}
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
		{text:'岗位点检',align:'center',dataIndex:'index2'},
		{text:'专业点检',align:'center',dataIndex:'index3'},
	
	 
	 ]
	 
 });
//------------------
Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[topP,centerP]
	});
});