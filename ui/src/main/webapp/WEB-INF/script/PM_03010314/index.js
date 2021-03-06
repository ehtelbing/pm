Ext.onReady(function() {
	Ext.QuickTips.init();
	var dt = new Date();
	var newweek = Ext.Date.getWeekOfYear(dt);
	var thisYear = dt.getFullYear();
	var years = [];
	for ( var i = 2012; i <= thisYear+1; i++)
		years.push({
			displayField : i,
			valueField : i
		});
	var months = [];
	for ( var i = 1; i <= 12; i++)
		months.push({
			displayField : i,
			valueField : i
		});
	var weeks = [];
	for ( var w = 1; w <= 5; w++)
		weeks.push({
			displayField : w,
			valueField : w
		});

	var ckStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'ckStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE: '[基层单位]'
			}
		}
	});
	
	var zyqStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'zyqStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_03/PRO_BASE_DEPT_VIEW_ROLE_PLAN',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	
	var gridStore=Ext.create('Ext.data.Store',{
		pageSize : 15,
		 id: 'gridStore',
         autoLoad: false,
         fields: [
			 'V_STATE_LOCK',
			 'D_DATE_LOCK',
			 'V_GUID',
			 'V_YEAR',
			 'V_MONTH',
			 'V_WEEK',
			 'V_ORGCODE',
			 'V_ORGNAME',
			 'V_DEPTCODE',
			 'V_DEPTNAME',
			 'V_EQUTYPECODE',
			 'V_EQUTYPENAME',
			 'V_EQUCODE',
			 'V_EQUNAME',
			 'V_REPAIRMAJOR_CODE',
			 'V_CONTENT',
			 'V_ENDTIME',
			 'V_STARTTIME',
			 'V_HOUR',
			 'V_REPAIRDEPT_CODE',
			 'V_REPAIRDEPT_NAME',
			 'V_MANNAME',
			 'V_TEL',
			'V_INDATE',
			 'V_INPER',
			 'V_INPERNAME',
			 'V_FLOWCODE',
			 'V_FLOWORDER',
			 'V_FLOWTYPE',
			 'V_ORDER',
			 'V_BZ',
			 'V_JHMX_GUID',
			 'V_OTHERPLAN_GUID',
			 'V_OTHERPLAN_TYPE',
			 'V_WEEKID',
			 'V_STATE',
			 'V_WORKORDER_GUID',
			 'V_DEFECT_GUID',
			 'V_WORKFLAG'
		 ],
         proxy: {
             type: 'ajax',
             async: false,
             url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_W_VIEW',
             actionMethods: {
                 read: 'POST'
             },
             reader: {
                 type: 'json',
                 root: 'list',
                 total: 'total'
             }
         }
	});

	var panel = Ext.create('Ext.panel.Panel', {
		id : 'panel',
		region : 'north',
		layout : 'column',
		frame : true,
		items : [ {
				id : 'year',
				store : Ext.create("Ext.data.Store", {
					fields : [ 'displayField', 'valueField' ],
					data : years,
					proxy : {
						type : 'memory',
						reader : {
							type : 'json'
						}
					}
				}),
				fieldLabel : '计划周',
				labelAlign : 'right',
				xtype : 'combo',
				value : new Date().getFullYear(),
				style : ' margin: 5px 0px 5px 5px',
				labelWidth : 80,
				width : 230,
				editable : false,
				displayField : 'displayField',
				valueField : 'valueField'
			}, {
				id : 'month',
				store : Ext.create("Ext.data.Store", {
					fields : [ 'displayField', 'valueField' ],
					data : months,
					proxy : {
						type : 'memory',
						reader : {
							type : 'json'
						}
					}
				}),
				xtype : 'combo',
				fieldLabel : '年',
				labelAlign : 'left',
				style : ' margin: 5px 0px 5px 5px',
				labelWidth : 80,
				width : 230,
				value : (new Date().getMonth() + 1),
				editable : false,
				displayField : 'displayField',
				valueField : 'valueField'
			}, {
				xtype : 'combo',
				id : 'week',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'displayField', 'valueField' ],
					data : weeks,
					proxy : {
						type : 'memory',
						reader : {
							type : 'json'
						}
					}
				}),
				xtype : 'combo',
				fieldLabel : '月',
				labelAlign : 'left',
				style : ' margin: 5px 0px 5px 5px',
				labelWidth : 80,
				width : 230,
				value : '1',
				editable : false,
				displayField : 'displayField',
				valueField : 'valueField'
			}, {
				xtype : 'label',
				text : '周',
				style : ' margin: 10px 0px 5px 5px'
			}, {
				xtype : 'combo',
				id : "ck",
				store : ckStore,
				editable : false,
				queryMode : 'local',
				fieldLabel : '计划厂矿',
				displayField : 'V_DEPTNAME',
				valueField : 'V_DEPTCODE',
				style : ' margin: 5px 0px 5px 5px',
				labelWidth : 80,
				width : 230,
				labelAlign : 'right'
			}, {
				xtype : 'combo',
				id : "zyq",
				store : zyqStore,
				editable : false,
				queryMode : 'local',
				fieldLabel : '作业区',
				displayField : 'V_DEPTNAME',
				valueField : 'V_DEPTCODE',
				style : ' margin: 5px 0px 5px 5px',
				labelWidth : 80,
				width : 230,
				labelAlign : 'right'
			},
			{
				xtype: 'panel', frame: true, width: '100%', layout: 'column', colspan: 5, baseCls: 'my-panel-noborder',style: 'margin:5px 5px 0 25px',
				items: [
			{
				xtype : 'textfield',
				id : 'seltext',
				fieldLabel : '检修内容',
				margin:'0px 5px 5px 0px',
				labelWidth : 60,
				width : 210,
				labelAlign : 'right'
			}, {
				xtype : 'button',
				text : '查询',
				icon : imgpath+'/search.png',
				width : 60,
				margin:'0px 5px 5px 5px',
				handler:function(){
					queryGrid();
				}
			}, {
				xtype : 'button',
				text : '导出Excel',
				icon : imgpath+'/grid.png',
				margin:'0px 5px 5px 5px',
				listeners:{click:OnButtonExcelClicked}
			}, {
				xtype : 'displayfield',
				fieldLabel : '截止时间',
				id : 'endtime',
				margin:'0px 5px 5px 5px',
				labelAlign:'right',
				labelWidth : 60,
				width : 210
			}, {
				xtype : 'button',
				text : '设置',
				icon : imgpath+'/cog.png',
				margin:'0px 5px 5px 5px',
				listeners:{click:OnButtonSetupClicked}
			}
			]}
			]
	});

	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		store:gridStore,
		columnLines : true,
		autoScroll : true,
		selType : 'checkboxmodel',
		height : 400,
		columns : [ {xtype : 'rownumberer',width : 30,sortable : false},
		            {text : '超时步骤',width : 150,dataIndex : 'V_STATE_LOCK',align : 'center',renderer : atleft},
		            {text : '上报时间',width : 150,dataIndex : 'D_DATE_LOCK',align : 'center',renderer : atleft,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		            {text : '计划单位',width : 150,dataIndex : 'V_DEPTNAME',align : 'center',renderer : atleft} ,
		            {text : '设备名称',width : 150,dataIndex : 'V_EQUNAME',align : 'center',renderer : atleft} ,
		            {text : '检修内容',width : 300,dataIndex : 'V_CONTENT',align : 'center',renderer : atleft} ,
		            {text : '计划开工时间',width : 150,dataIndex : 'V_STARTTIME',align : 'center',renderer : atleft,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		            {text : '计划竣工时间',width : 150,dataIndex : 'V_ENDTIME',align : 'center',renderer : atleft,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		            {text : '计划工时(小时)',width : 150,dataIndex : 'V_HOUR',align : 'center',renderer : atleft} ,
		            {text : '施工单位',width : 150,dataIndex : 'V_REPAIRDEPT_NAME',align : 'center',renderer : atleft} ,
		            {text : '检修负责人',width : 150,dataIndex : 'V_MANNAME',align : 'center',renderer : atleft}]
	});

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});
	
	Ext.data.StoreManager.lookup('ckStore').on('load',function(){
		Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
		Ext.data.StoreManager.lookup('zyqStore').load({
        	params:{
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
				V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE:'[主体作业区]'
            }
        });
	});
	
	Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
		Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		queryGrid();
	});
	
	Ext.getCmp('ck').on('select',function(){
		Ext.data.StoreManager.lookup('zyqStore').load({
        	params:{
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
				V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE:'[主体作业区]'
            }
        });
	});
	
	Ext.getCmp('zyq').on('select',function(){
		queryGrid();
	});
	
	Ext.getCmp('year').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('month').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('week').on('select',function(){
		queryGrid();
	});
	
	Ext.data.StoreManager.lookup('gridStore').on('load',function(){
		var time=Ext.data.StoreManager.get('gridStore').proxy.reader.rawData.V_D_DATE_E;
		Ext.getCmp('endtime').setValue(time);
	});
	
});

function queryGrid(){
	Ext.data.StoreManager.lookup('gridStore').load({
		params:{
			V_I_YEAR:Ext.getCmp('year').getValue(),
			V_I_MONTH:Ext.getCmp('month').getValue(),
			V_I_WEEKNUM:Ext.getCmp('week').getValue(),
			V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
			V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
			V_V_CONTENT:Ext.getCmp('seltext').getValue()
        }
	});
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	 metaData.style = "text-align:left;";
	    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnButtonExcelClicked(){
	document.location.href=AppUrl + 'excel/WSDGL_EXCEL?V_I_YEAR='+Ext.getCmp('year').getValue()+
	'&V_I_MONTH='+Ext.getCmp('month').getValue()+
	'&V_I_WEEKNUM='+Ext.getCmp('week').getValue()+
	'&V_V_DEPTCODE='+encodeURI(Ext.getCmp('ck').getValue())+
	'&V_V_DEPTNEXTCODE='+encodeURI(Ext.getCmp('zyq').getValue())+
	'&V_V_CONTENT='+Ext.getCmp('seltext').getValue();
}

function OnButtonSetupClicked(){
    var year=Ext.getCmp('year').getValue();
    var month=Ext.getCmp('month').getValue();
    var week=Ext.getCmp('week').getValue();
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_GET',
        method: 'POST',
        params:{
            V_I_YEAR:year,
            V_I_MONTH:month,
            V_I_WEEKNUM:week,
            V_V_TYPE:'W',
            V_V_DEPTCODE:Ext.getCmp('ck').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.list.length==0){
                var date=new Date();
                var nowMonth=date.getMonth()+1;
                var nowtime=date.getFullYear()+'/'+nowMonth+'/'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                Ext.Ajax.request({
                    url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_SET',
                    method: 'POST',
                    async: false,
                    params:{
                        'V_I_YEAR':year,
                        'V_I_MONTH':month,
                        'V_I_WEEKNUM':week,
                        'V_V_TYPE':'W',
                        'V_D_DATE_E':Ext.Date.format(new Date(nowtime),'Y/m/d h:i:s'),
                        'V_I_LOCK':'1',
                        'V_D_DATE_S':Ext.Date.format(new Date(nowtime),'Y/m/d h:i:s'),
                        'V_V_ORGCODE':Ext.getCmp('ck').getValue()
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if(resp.V_INFO=='成功'){
                            window.open(AppUrl + 'page/PM_0301011001/index.html?V_YEAR='+year+'&V_MONTH='+ month+'&V_WEEK='+week+'&V_TYPE=W'+'&V_ORGCODE='+Ext.getCmp('ck').getValue(),'', "dialogWidth=460px;dialogHeight=280px");
                        }
                        // else{
                        //     Ext.Msg.alert('操作信息', '保存失败');
                        // }
                    }
                });
            }
            else {
                window.open(AppUrl + 'page/PM_0301011001/index.html?V_YEAR='+year+'&V_MONTH='+ month+'&V_WEEK='+week+'&V_TYPE=W'+'&V_ORGCODE='+Ext.getCmp('ck').getValue(),'', "dialogWidth=460px;dialogHeight=280px");
			}
        }
    });


}