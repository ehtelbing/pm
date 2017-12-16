function getDeptList(deptStore){
 
	//var departtype = Ext.util.Cookies.get("mm.departtype");
	/*if(departtype=="厂矿机关"){
	
		Ext.Ajax.request({
			url : APP + '/orgModelSelect',
			method : 'POST',
			async: false,
			params : {
				parName : ['A_PLANTCODE'],
				parType : ['s'],
				parVal : [ Ext.util.Cookies.get("mm.plantcode")],
				proName : 'PRO_MM_DEPART',
				cursorName : 'RET'
			},
			success : function(response) {
				
				var resp = Ext.decode(response.responseText);
				
				deptStore.insert(0,{DEPARTCODE:'%',DEPARTNAME:'全部'});
				Ext.Array.each(resp.list , function(name, index, countriesItSelf) {
				    deptStore.insert(index,{DEPARTCODE:name.DEPARTCODE,DEPARTNAME:name.DEPARTNAME});
				});
				deptStore.sort('DEPARTCODE','ASC');
			}
		});
	}else{
	      deptStore.insert(0,{DEPARTCODE:Ext.util.Cookies.get("mm.departcode"),DEPARTNAME:Ext.util.Cookies.get("mm.departname")});
	}*/

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

				//deptStore.insert(0,{DEPARTCODE:'%',DEPARTNAME:'全部'});
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
	
	
    function expExcel(){
		var plantCode=Ext.getCmp('plant').getValue()=='%'?'0':Ext.getCmp('plant').getValue();
		var deptCode=Ext.getCmp('dept').getValue()=='%'?'0':Ext.getCmp('dept').getValue();
		var type_in=Ext.getCmp('type').getValue()=='%'?'0':Ext.getCmp('type').getValue();
		var save_code=Ext.getCmp('save_plant').getValue()=='%'?'0':Ext.getCmp('save_plant').getValue();
		var run_state=Ext.getCmp('run_state').getValue()=='%'?'0':Ext.getCmp('run_state').getValue();

		document.location.href=AppUrl + 'DJ/DJ301EXCEL?plantCode='+plantCode+
			'&deptCode='+deptCode+
			'&type_in='+type_in+
			'&save_code='+save_code+
			'&save_location='+Ext.getCmp("save_location").getValue()+
			'&run_state='+run_state+
			'&generator_name='+Ext.getCmp("generator_name").getValue()+
			'&generator_code='+Ext.getCmp("generator_code").getValue()+
			'&generator_Version='+Ext.getCmp("generator_Version").getValue();
		/*var tableName = [ "序号", "电机唯一编号", "变压器名称", "变压器型号", "系列分类", "容量", "所属厂矿名",
			                  "所属部门名", "存放单位名", "存放位置", "运行状态"];
		var tableKey = [ 'BYQ_UNIQUE_CODE', 'BYQ_NAME', 'BYQ_TYPE','BYQ_SERIES', 'BYQ_VOL', 
		                 'PLANTNAME', 'DEPARTNAME','LOC_PLANTNAME', 'DJ_LOC', 'WORK_STATUS'];
		   
		var parName = ['plantCode','deptCode','type_in','save_code','save_location','run_state','generator_name','generator_code','generator_Version'];
		var parType = ['s','s','s','s','s','s','s','s','s'];
		var parVal = [ 
					            Ext.getCmp('plant').getValue(),
					            Ext.getCmp('dept').getValue(),
					            Ext.getCmp('type').getValue(),
					            Ext.getCmp('save_plant').getValue(),
					            Ext.getCmp('save_location').getValue()==""?'null':Ext.getCmp('save_location').getValue(),
					            Ext.getCmp('run_state').getValue(),
					            Ext.getCmp('generator_name').getValue()==""?'null':Ext.getCmp('generator_name').getValue(),
					            Ext.getCmp('generator_code').getValue()==""?'null':Ext.getCmp('generator_code').getValue(),
					            Ext.getCmp('generator_Version').getValue()==""?'null':Ext.getCmp('generator_Version').getValue()
					]/!*[
	            Ext.getCmp("year").getValue(),
	            Ext.getCmp("month").getValue(),
	            Ext.getCmp("plant").getValue(),
	            Ext.getCmp("bjfl").getValue(),
	            Ext.getCmp("bjbm").getValue()==''?'null':Ext.getCmp("bjbm").getValue(),
	            Ext.getCmp("bjmc").getValue()==''?'null':Ext.getCmp("bjmc").getValue(),
	            Ext.getCmp("state").getValue()
		          ]*!/;
		
		var proName = 'pro_dj301_byqmainlist';
		var cursorName = 'v_cursor';
		var returnStr = [];
		var returnStrType = [];
	    var returnStrName = [];
		 
	    
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "title", "变压器设备查询");*/
		
    }