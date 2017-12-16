var test1 ='';
var test2 ='';
var test3 ='';
var test4 ='';
if (location.href.split('?')[1] != undefined) {
	var orderid = Ext.urlDecode(location.href.split('?')[1]).orderid;
}
Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :true,
		storeId : 'gridStore',
		fields : ['FILE_NAME','UPLOAD_DATE','FILEID'],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},extraParams:{
				parName : ['a_orderid'],
				parType : ['s'],
				parVal:[orderid],
				proName : 'pg_dj605.filelist',
				cursorName : 'ret'
			}
		}
	});
	var grid = Ext.create('Ext.grid.Panel',{
				id : 'grid',title:'文件列表',
				columnLines : true,x:5,y:520,
				autoScroll : true,
				store : gridStore,
				columns : [
				           {text : '文件名',dataIndex : 'FILE_NAME',align : 'center',width : 100},
				           {text : '上传时间',dataIndex : 'UPLOAD_DATE',align : 'center',width : 100},
				           {text : '下载',dataIndex : 'FILEID',align : 'center',width : 60,renderer:down},
				           {text : '删除',dataIndex : 'FILEID',align : 'center',width : 60,renderer:del}]
	});
	var dialog = Ext.create('Ext.form.Panel', {
        id: 'dialog', title: '录入',frame:true,	region:'center',id:'form1',
        layout: {type:'absolute'},autoScroll:true,
        defaults: { labelAlign: 'right', labelWidth: 90},
        items:[{xtype:'displayfield',id:'code',fieldLabel:'工  单  号',x:5,y:5,value:orderid},
               {xtype:'datefield',fieldLabel:'试验日期',x:5,y:35,format:'Y-m-d',value:new Date(),id:'syrq'},
               {xtype : 'button',text : '保存',labelWidth : 70,style : 'margin-left:5px',icon: imgpath +'/a1.gif',handler:onSave,x:240,y:35},
               {xtype:'fieldset',title:'半成品试验',x:5,y:70,width:600,
            	   items:[ {xtype: 'radiogroup',vertical: true,width:200,id:'rag1',
                	           items: [ { boxLabel: '通过', name: 'rb1', inputValue: '1',id:'ra1' },
                                        { boxLabel: '未通过 ', name: 'rb1', inputValue: '2',id:'ra2'}]
                          },{xtype:'textareafield',fieldLabel:'试验说明',width:570,height:50,labelAlign: 'right', labelWidth: 70,id:'area1'}]},
               {xtype:'fieldset',title:'转子半成品试验',x:5,y:175,width:600,
            	   items:[ {xtype: 'radiogroup',vertical: true,width:200,id:'rag2',
                	           items: [ { boxLabel: '通过', name: 'rb2', inputValue: '1',id:'ra3' },
                                        { boxLabel: '未通过 ', name: 'rb2', inputValue: '2',id:'ra4'}]
                          },{xtype:'textareafield',fieldLabel:'试验说明',width:570,height:50,labelAlign: 'right', labelWidth: 70,id:'area2'}]},
               {xtype:'fieldset',title:'定子半成品试验',x:5,y:280,width:600,
            	   items:[ {xtype: 'radiogroup',vertical: true,width:200,id:'rag3',
                	           items: [ { boxLabel: '通过', name: 'rb3', inputValue: '1',id:'ra5' },
                                        { boxLabel: '未通过 ', name: 'rb3', inputValue: '2',id:'ra6'}]
                          },{xtype:'textareafield',fieldLabel:'试验说明',width:570,height:50,labelAlign: 'right', labelWidth: 70,id:'area3'}]},
               {xtype:'fieldset',title:'成品试验',x:5,y:385,width:600,
            	   items:[ {xtype: 'radiogroup',vertical: true,width:200,id:'rag4',
                	           items: [ { boxLabel: '通过', name: 'rb4', inputValue: '1',id:'ra7' },
                                        { boxLabel: '未通过 ', name: 'rb4', inputValue: '2',id:'ra8'}]
                          },{xtype:'textareafield',fieldLabel:'试验说明',width:570,height:50,labelAlign: 'right', labelWidth: 70,id:'area4'}]},
              {xtype : 'filefield',name : 'file',id : 'file',fieldLabel : '附件上传',msgTarget : 'side',msgTarget : 'side',buttonText : '浏览...',width:500,x:5,y:490},
              {xtype : 'button',text : '上 传',labelWidth : 70,style : 'margin-left:5px',x:510,y:490,handler:upfile},
              grid			
              ]
        
	});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [dialog]
	});
	Bind();
});
function Bind(){
	Ext.Ajax.request({
		url : APP + '/ModelSelect',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_orderid' ],
			parType : [ 's' ],
			parVal : [ orderid ],
			proName : 'pg_dj605.ordersydetail',
			cursorName : 'ret'
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if(resp.list[0].BCSY_RESULT=='通过'){
				Ext.getCmp("ra1").setValue(true);
			}else{
				Ext.getCmp("ra2").setValue(true);
			}
			if(resp.list[0].ZBCSY_RESULT=='通过'){
				Ext.getCmp("ra3").setValue(true);
			}else{
				Ext.getCmp("ra4").setValue(true);
			}
			if(resp.list[0].DBCSY_RESULT=='通过'){
				Ext.getCmp("ra5").setValue(true);
			}else{
				Ext.getCmp("ra6").setValue(true);
			}
			if(resp.list[0].CSY_RESULT=='通过'){
				Ext.getCmp("ra7").setValue(true);
			}else{
				Ext.getCmp("ra8").setValue(true);
			}
		    Ext.getCmp("syrq").setValue(resp.list[0].SY_DATE);
			Ext.getCmp("area1").setValue(resp.list[0].BCSY_RESULT_DESC);
			Ext.getCmp("area2").setValue(resp.list[0].ZBCSY_RESULT_DESC);
			Ext.getCmp("area3").setValue(resp.list[0].DBCSY_RESULT_DESC);
			Ext.getCmp("area4").setValue(resp.list[0].CSY_RESULT_DESC);
		}
	});
}
function upfile(){
	if(Ext.getCmp("file").getValue()==""){alert("请选择文件");return false;}
	var form = Ext.getCmp("form1");
	if (form.isValid()) {
		form.submit({
			url : APP + '/UploadFile',
			method : 'POST',
			params:{
				orderid:orderid,
				user:Ext.util.Cookies.get("mm.userid")
			}
		});
	}
refresh();
}
function refresh(){
	Ext.data.StoreManager.lookup('gridStore').load();
}




function down(value, metaData, record, rowIdx,colIdx, store, view) {
	return '<a href="javascript:void(0)" onclick="writeIn('+rowIdx+')">下载</a>';
}
function writeIn(rowIdx){
	gobalfileid=Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
	location.href = APP + '/downfile34301?fileid='+ gobalfileid;	
}




function del(value, metaData, record, rowIdx,colIdx, store, view) {
	return '<a href="javascript:void(0)" onclick="filedelete('+rowIdx+')">删除</a>';
}
function filedelete(rowIdx){
	gobalfileid=Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_fileid' ],
			parType : [ 's' ],
			parVal : [gobalfileid],
			proName : 'pg_dj605.filedelete',
			returnStr : [ 'ret_msg','ret'],
			returnStrType : [ 's','s' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
				Ext.data.StoreManager.lookup('gridStore').load();
			} else {
				Ext.example.msg('提示', "操作失败");
			}
		}
	});
}
function onSave(){
	test1 = Ext.getCmp('ra1').checked;
	test2 = Ext.getCmp('ra3').checked;
	test3 = Ext.getCmp('ra5').checked;
	test4 = Ext.getCmp('ra7').checked;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		async : false,
		params : {
			parName : [ 'a_orderid',          
                        'a_bcsy_result', 
                        'a_bcsy_result_desc', // varchar2, --半成品试验结果说明
                        'a_zbcsy_result',     // varchar2, --转子半成品试验结果
                        'a_zbcsy_result_desc', //varchar2, --转子半成品试验结果说明
                        'a_dbcsy_result',     // varchar2, --定子半成品试验结果
                        'a_dbcsy_result_desc',// varchar2, --定子半成品试验结果说明
                        'a_csy_result',       // varchar2, --成品试验结果
                        'a_csy_result_desc',   //varchar2, --成品试验救国说明
                        'a_userid',            //varchar2, --用户Id
                        'a_username',         // varchar2, --用户姓名 
                        'a_sy_date'],
			parType : [ 's', 's', 's','s','s', 's', 's','s','s', 's', 's','da' ],
			parVal : [ orderid,
			           test1 ==true?'通过':'未通过',
			           Ext.getCmp('area1').getValue(),
			           test2 ==true?'通过':'未通过',
			           Ext.getCmp('area2').getValue(),
			           test3 ==true?'通过':'未通过',
			           Ext.getCmp('area3').getValue(),
			           test4 ==true?'通过':'未通过',
			           Ext.getCmp('area4').getValue(),
					Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"),
					Ext.Date.format(Ext.getCmp('syrq').getValue(), 'Y-m-d')],
			proName : 'pg_dj605.saveordersy',
			returnStr : [ 'ret_msg','ret' ],
			returnStrType : [ 's','s' ]
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
				refresh();
			} else {
				Ext.example.msg('提示', "操作失败");
				
			}
		}
	})
	}