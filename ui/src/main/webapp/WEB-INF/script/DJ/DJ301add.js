 
var key_code= '';
if(location.href.split('?')[1]!=null){ 
	key_code = Ext.urlDecode(location.href.split('?')[1]).key_code;
}
 
Ext.onReady(function() {
        
    var plantStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'plantStore',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    }
    });

	var deptStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'deptStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE':   Ext.util.Cookies.get('v_orgCode'),
				'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
				'V_V_DEPTTYPE':'[主体作业区]'
			}
		}
	});
    
     var savePlantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'savePlantStore',
		 fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
					'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
					'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
					'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
					'V_V_DEPTTYPE': '基层单位'
				}
			}
	});	
	
	var typeStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'typeStore',
			fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'DJ/pro_dj108_byqseries_able',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				}
			}
	});
	
	 
	
	var runStateStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'runStateStore',
			fields : [ 'WORK_STATUS', 'WORK_STATUS_DESC' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'DJ/pro_dj201_workstatus',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				}
			}
	});	
	
	var list1 = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		region : 'center',frame:true,bodyPadding:5,
		layout:{type:'table',columns:5},
		defaults:{labelAlign:'right',labelWidth:80},
		items : [

			{id:'BYQ_UNIQUE_CODE', xtype: 'textfield',fieldLabel: '变压器唯一编号',labelWidth:100},
			{id:'BYQ_NAME', xtype: 'textfield',fieldLabel: '变压器名称'},
			{id:'SUPPLY_CODE', xtype: 'textfield',fieldLabel: '厂家编码'},
			{id:'BYQ_V', xtype: 'textfield',fieldLabel: '额定电压'},
			{id:'QSZL', xtype: 'textfield',fieldLabel: '器身重量'},


			{id : 'BYQ_SERIES', xtype : 'combobox', fieldLabel : '系列分类',editable :false, store:typeStore,labelWidth:100,
				displayField: 'BYQ_SERIES_CLASS_DESC', valueField: 'BYQ_SERIES_CLASS', queryMode: 'local', labelAlign :'right'
			},
			{id:'BYQ_TYPE', xtype: 'textfield',fieldLabel: '变压器型号'},
			{id:'SUPPLY_NAME', xtype: 'textfield',fieldLabel: '厂家名称'},
			{id:'BYQ_A', xtype: 'textfield',fieldLabel: '额定电流'},
			{id:'YZ', xtype: 'textfield',fieldLabel: '油重'},


			{id : 'plant', xtype : 'combobox', fieldLabel : '所属厂矿',editable :false,labelWidth:100,
				queryMode: 'local',labelAlign :'right',displayField: 'DEPARTNAME', valueField: 'DEPARTCODE',
				store:plantStore
			},
			{id : 'dept', xtype : 'combobox', fieldLabel : '所属部门',editable :false,
				displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local', labelAlign :'right',store:deptStore
			},
			{id:'PRODUCE_DATE', xtype: 'datefield',fieldLabel: '出厂日期',editable :false,format:'Y-m-d',value:new Date()},
			{id:'LJZBH', xtype: 'textfield',fieldLabel: '连接组标号'},
			{id:'ZZ', xtype: 'textfield',fieldLabel: '总重'},


			{id : 'save_plant', xtype : 'combobox', fieldLabel : '存放单位',store:savePlantStore,editable:false,labelWidth:100,
				displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local'},
			{id:'DJ_LOC', xtype: 'textfield',fieldLabel: '存放位置'},
			{id:'BYQ_VOL', xtype: 'textfield',fieldLabel: '容量'},
			{id:'ZKDY', xtype: 'textfield',fieldLabel: '阻抗电压'},
			{id:'KZSH', xtype: 'textfield',fieldLabel: '空载损耗'},


			{id:'LQFS', xtype: 'textfield',fieldLabel: '冷却方式',labelWidth:100},
			{id:'SYTJ', xtype: 'textfield',fieldLabel: '使用条件'},
			{id:'DLSH', xtype: 'textfield',fieldLabel: '短路损耗'},
			{id:'KZDL', xtype: 'textfield',fieldLabel: '空载电流'},
			{id : 'WORK_STATUS', xtype : 'combobox', fieldLabel : '运行状态',editable :false,
				displayField: 'WORK_STATUS_DESC', valueField: 'WORK_STATUS', queryMode: 'local', labelAlign :'right',
				store:runStateStore
			},

			{id:'REMARK', xtype: 'textarea',fieldLabel: '备注',colspan: 5,width:725,labelWidth:100},

			{xtype:'button',text:'保存修改',id:'save',margin:'0px 0px 0px 105px'}
		]
	});
	
 

	 
		
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ list1 ]
	});


	Ext.getStore('deptStore').on("load", function() {
		Ext.getCmp('dept').select(deptStore.getAt(0));
	});
	 
	savePlantStore.on('load',function(){
		   savePlantStore.sort('DEPARTCODE','ASC');
		   Ext.getCmp('save_plant').select(savePlantStore.getAt(0)); 
		   runStateStore.load();
	});

	runStateStore.on('load',function(){
		    
		   runStateStore.sort('WORK_STATUS','ASC');
		   Ext.getCmp('WORK_STATUS').select(runStateStore.getAt(0)); 
		   
		   typeStore.load();
	});
	
	typeStore.on('load',function(){

		   typeStore.sort('BYQ_SERIES_CLASS','ASC');
		   
		   Ext.getCmp('BYQ_SERIES').select(typeStore.getAt(0)); 
		   
		   queryContent();
	});
	 
	
	
	function queryContent(){
		        
			    plantStore.insert(0,{DEPARTCODE:Ext.util.Cookies.get('v_orgCode'),DEPARTNAME:Ext.util.Cookies.get('v_orgname2')});
			    Ext.getCmp('plant').select(plantStore.getAt(0));
			    
			    //getDeptList();
	}
	
	
	Ext.getCmp('save').on('click',saveContent);
	function saveContent(){
		
		    if(Ext.getCmp('BYQ_UNIQUE_CODE').getValue()==""){  Ext.example.msg('操作信息', "变压器唯一编号 不能为空"); return false;}
		    if(Ext.getCmp('BYQ_NAME').getValue()==""){  Ext.example.msg('操作信息', "变压器名称  不能为空"); return false;}
		    if(Ext.getCmp('SUPPLY_CODE').getValue()==""){  Ext.example.msg('操作信息', "厂家编码  不能为空"); return false;}
		    if(Ext.getCmp('BYQ_V').getValue()==""){  Ext.example.msg('操作信息', "额定电压  不能为空"); return false;}
		    if(Ext.getCmp('QSZL').getValue()==""){  Ext.example.msg('操作信息', "器身重量  不能为空"); return false;}
		    if(Ext.getCmp('BYQ_TYPE').getValue()==""){  Ext.example.msg('操作信息', "变压器型号   不能为空"); return false;}
		    if(Ext.getCmp('SUPPLY_NAME').getValue()==""){  Ext.example.msg('操作信息', "厂家名称    不能为空"); return false;}
		    
		    if(Ext.getCmp('DJ_LOC').getValue()==""){  Ext.example.msg('操作信息', "存放位置   不能为空"); return false;}
		    
		    /*if(Ext.getCmp('BYQ_A').getValue()==""){  Ext.example.msg('操作信息', "额定电流   不能为空"); return false;}
		    if(Ext.getCmp('YZ').getValue()==""){  Ext.example.msg('操作信息', "油重  不能为空"); return false;}
		    if(Ext.getCmp('LJZBH').getValue()==""){  Ext.example.msg('操作信息', "连接组标号   不能为空"); return false;}
		    if(Ext.getCmp('ZZ').getValue()==""){  Ext.example.msg('操作信息', "总重   不能为空"); return false;}
		    if(Ext.getCmp('BYQ_VOL').getValue()==""){  Ext.example.msg('操作信息', "容量   不能为空"); return false;}
		    if(Ext.getCmp('ZKDY').getValue()==""){  Ext.example.msg('操作信息', "阻抗电压   不能为空"); return false;}
		    if(Ext.getCmp('KZSH').getValue()==""){  Ext.example.msg('操作信息', "空载损耗   不能为空"); return false;}
		    if(Ext.getCmp('LQFS').getValue()==""){  Ext.example.msg('操作信息', "冷却方式   不能为空"); return false;}
		    if(Ext.getCmp('SYTJ').getValue()==""){  Ext.example.msg('操作信息', "使用条件   不能为空"); return false;}
		    if(Ext.getCmp('DLSH').getValue()==""){  Ext.example.msg('操作信息', "短路损耗   不能为空"); return false;}
		    if(Ext.getCmp('KZDL').getValue()==""){  Ext.example.msg('操作信息', "空载电流   不能为空"); return false;}*/
		Ext.Ajax
			.request({
				url: AppUrl + 'DJ/pro_dj301_addbyqmain',
				method : 'POST',
				async : false,
				params : {
					BYQ_UNIQUE_CODE_in:Ext.getCmp('BYQ_UNIQUE_CODE').getValue(),// key
					BYQ_NAME_in:Ext.getCmp('BYQ_NAME').getValue(),// 电机名称
					SUPPLY_CODE_in:Ext.getCmp('SUPPLY_CODE').getValue(),// 电机型号
					BYQ_V_in:Ext.getCmp('BYQ_V').getValue(),// 电机系列分类
					QSZL_in:Ext.getCmp('QSZL').getValue(),// 容量

					BYQ_SERIES_in:Ext.getCmp('BYQ_SERIES').getValue(),// 电压
					BYQ_SERIES_NAME_in:Ext.getCmp('BYQ_SERIES').getRawValue(),// 槽数
					BYQ_TYPE_in:Ext.getCmp('BYQ_TYPE').getValue(),// 导线规格
					SUPPLY_NAME_in:Ext.getCmp('SUPPLY_NAME').getValue(),// 重量
					BYQ_A_in:Ext.getCmp('BYQ_A').getValue(),// 定子槽数

					YZ_in:Ext.getCmp('YZ').getValue(),// 转子槽数
					PLANTCODE_in:Ext.getCmp('plant').getValue(),// 所属厂矿
					PLANTNAME_in:Ext.getCmp('plant').getRawValue(),// 所属厂矿名
					DEPARTCODE_in:Ext.getCmp('dept').getValue(),// 所属部门
					DEPARTNAME_in:Ext.getCmp('dept').getRawValue(),// 所属部门名

					PRODUCE_DATE_in:Ext.util.Format.date(Ext.getCmp('PRODUCE_DATE').getValue(), 'Y-m-d'),// 生产时间
					LJZBH_in:Ext.getCmp('LJZBH').getValue(),// 定子电压
					ZZ_in:Ext.getCmp('ZZ').getValue(),// 定子电流
					LOC_PLANTCODE_in:Ext.getCmp('save_plant').getValue(),// 存放单位
					LOC_PLANTNAME_in:Ext.getCmp('save_plant').getRawValue(),// 存放单位名

					DJ_LOC_in:Ext.getCmp('DJ_LOC').getValue(),// 存放位置
					BYQ_VOL_in:Ext.getCmp('BYQ_VOL').getValue(),// 转子电压
					ZKDY_in:Ext.getCmp('ZKDY').getValue(),// 转子电流
					KZSH_in:Ext.getCmp('KZSH').getValue(),// 功率因数
					LQFS_in:Ext.getCmp('LQFS').getValue(),// 额定转数

			        SYTJ_in:Ext.getCmp('SYTJ').getValue(),// 绝缘等级
					DLSH_in:Ext.getCmp('DLSH').getValue(),// 生产厂家编码
					KZDL_in:Ext.getCmp('KZDL').getValue(),// 生产厂家名称
					WORK_STATUS_in:Ext.getCmp('WORK_STATUS').getValue(),// 运行状态
					REMARK_in:Ext.getCmp('REMARK').getValue(),// 备注

					USERCODE_in:Ext.util.Cookies.get('v_personcode'),
					USERNAME_in:Ext.util.Cookies.get('v_personname2')
				},
				success : function(resp) {
					var resp = Ext.JSON.decode(resp.responseText);
					if (resp.ret == 'Success') {
						alert("操作成功!");
						window.close();
						window.opener.query();
					} else {
						alert("操作失败!");
					}
				}
			});
		   /*Ext.Ajax.request({
		   	
				url : APP + '/ModelChange',
				method : 'POST',
				async : false,
				params : {
					parName : ['BYQ_UNIQUE_CODE_in', 'BYQ_NAME_in','SUPPLY_CODE_in', 'BYQ_V_in','QSZL_in',
                               'BYQ_SERIES_in', 'BYQ_SERIES_NAME_in','BYQ_TYPE_in', 'SUPPLY_NAME_in',
							   'BYQ_A_in', 'YZ_in','PLANTCODE_in', 'PLANTNAME_in','DEPARTCODE_in', 'DEPARTNAME_in',
                               'PRODUCE_DATE_in', 'LJZBH_in', 'ZZ_in','LOC_PLANTCODE_in', 'LOC_PLANTNAME_in',
                               'DJ_LOC_in', 'BYQ_VOL_in', 'ZKDY_in','KZSH_in','LQFS_in', 'SYTJ_in',
                               'DLSH_in', 'KZDL_in', 'WORK_STATUS_in','REMARK_in','USERCODE_in', 'USERNAME_in'
								],
					parType : ['s','s','s','s','s','s','s','s','s','s',
					           's','s','s','s','s','s','s','s','s','s',
                               's','s','s','s','s','s','s','s','s','s','s','s'
                    ],
					parVal : [
						Ext.getCmp('BYQ_UNIQUE_CODE').getValue(),
						Ext.getCmp('BYQ_NAME').getValue(),
						Ext.getCmp('SUPPLY_CODE').getValue(),
						Ext.getCmp('BYQ_V').getValue(),
						Ext.getCmp('QSZL').getValue(),
                            
                            Ext.getCmp('BYQ_SERIES').getValue(),
                            Ext.getCmp('BYQ_SERIES').getRawValue(),
                            Ext.getCmp('BYQ_TYPE').getValue(),
                            Ext.getCmp('SUPPLY_NAME').getValue(),
                            Ext.getCmp('BYQ_A').getValue(),

                            Ext.getCmp('YZ').getValue(),
                            Ext.getCmp('plant').getValue(),
                            Ext.getCmp('plant').getRawValue(),
                            Ext.getCmp('dept').getValue(),
                            Ext.getCmp('dept').getRawValue(),
                            
                            Ext.util.Format.date(Ext.getCmp('PRODUCE_DATE').getValue(),'Y-m-d') ,
                            Ext.getCmp('LJZBH').getValue(),
                            Ext.getCmp('ZZ').getValue(),
                            Ext.getCmp('save_plant').getValue(),
                            Ext.getCmp('save_plant').getRawValue(),
                            
                            Ext.getCmp('DJ_LOC').getValue(),
                            Ext.getCmp('BYQ_VOL').getValue(),
                            Ext.getCmp('ZKDY').getValue(),
                            Ext.getCmp('KZSH').getValue(),
							Ext.getCmp('LQFS').getValue(),

							Ext.getCmp('SYTJ').getValue(),
							Ext.getCmp('DLSH').getValue(),
							Ext.getCmp('KZDL').getValue(),
							Ext.getCmp('WORK_STATUS').getValue(),
							Ext.getCmp('REMARK').getValue(),
							
							Ext.util.Cookies.get("mm.userid"),
							Ext.util.Cookies.get("mm.username")
                    ],
					proName : 'pro_dj301_addbyqmain', 
					returnStr : [ 'RET' ],
					returnStrType : [ 's' ]
				},
				success : function(response) {

					var resp = Ext.decode(response.responseText);

					if(resp[0]=="Success"){
					    Ext.example.msg("提示",'执行成功');
					    queryContent();
					      window.close();
	                      window.returnValue = "success";
					}else{
					    Ext.example.msg("提示",'执行失败');
					}
				}
			})*/
	}
	
	
	function getDeptList(){

		if(Ext.util.Cookies.get('v_deptcode').substring(4,6)=="01"){
			Ext.Ajax.request({
				url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				method : 'POST',
				async: false,
				params : {
					'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
					'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
					'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
					'V_V_DEPTTYPE':'[主体作业区]'
				},
				success : function(response) {

					var resp = Ext.decode(response.responseText);

					Ext.Array.each(resp.list , function(name, index, countriesItSelf) {
						deptStore.insert(index,{DEPARTCODE:name.V_DEPTCODE,DEPARTNAME:name.V_DEPTNAME});
					});
					deptStore.sort('DEPARTCODE','ASC');
					Ext.getCmp('dept').select(deptStore.getAt(0));
				}
			});
		}else{
			deptStore.insert(0,{DEPARTCODE:Ext.util.Cookies.get('v_deptcode'),DEPARTNAME:Ext.util.Cookies.get('v_deptname2')});
		}
		Ext.getCmp('dept').select(deptStore.getAt(0));
	}
	 
})
