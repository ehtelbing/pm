var plantcode = Ext.util.Cookies.get("mm.plantcode");
var plant = Ext.util.Cookies.get("mm.plantname");
var departtype = Ext.util.Cookies.get("mm.departtype");
var departcode = Ext.util.Cookies.get("mm.departcode");
var departname = Ext.util.Cookies.get("mm.departname");
var userid = Ext.util.Cookies.get("mm.userid");
var username = Ext.util.Cookies.get("mm.username");
var departdata = [];
var djcode = "";
var isedit = "";
if (location.href.split('?')[1] != undefined) {
	djcode = Ext.urlDecode(location.href.split('?')[1]).djcode;// 点击唯一编号
}
Ext.onReady(function() {
	var plantStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'plantStore',
		fields : [ 'ID', 'NAME' ],
		data : [ {
			"ID" : Ext.util.Cookies.get('v_orgCode'),
			"NAME" : Ext.util.Cookies.get('v_orgname2')
		} ]
	});
	var departStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'departStore',
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
	var typeStore = Ext.create('Ext.data.Store', {
		storeId : 'typeStore',
		fields : [ 'SERIES_CLASS', 'SERIES_CLASS_DESC' ],
		autoLoad : false,
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj106_djseries_able',
			extraParams : {
			},
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var djxhStore = Ext.create('Ext.data.Store', {
		storeId : 'djxhStore',
		fields : [ 'DJ_TYPE' ],
		autoLoad : false,
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj107_djtype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var cfplantStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'cfplantStore',
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
				'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
				'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
				'V_V_DEPTTYPE': '基层单位'
			}
		}
	});
	var cfdepartStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'cfdepartStore',
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
			}
		}
	});
	
	var yxstatusStore = Ext.create('Ext.data.Store', {
		storeId : 'yxstatusStore',
		fields : [ 'WORK_STATUS', 'WORK_STATUS_DESC' ],
		autoLoad : false,
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj201_workstatus',
			extraParams : {
			},
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var panel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		frame : true,
		bodyPadding : 5,
		layout : {
			type : 'table',
			columns :4
		},
		defaults : {
			labelAlign : 'right',
			labelWidth : 80
		},
		items : [ {
			xtype : 'textfield',
			id : 'djbhh',
			fieldLabel : '电机编号',
			selectOnFocus : true,
			labelWidth : 80
		}, {
			xtype : 'textfield',
			id : 'eqname',
			fieldLabel : '电机名称',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'rl',
			fieldLabel : '容  量',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'dzdy',
			fieldLabel : '定子电压',
			selectOnFocus : true
		},

		{
			xtype : 'textfield',
			id : 'jydj',
			fieldLabel : '绝缘等级',
			selectOnFocus : true
		}, {
			xtype : 'combo',
			id : "type",
			store : typeStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '系列分类',
			displayField : 'SERIES_CLASS_DESC',
			valueField : 'SERIES_CLASS',
			labelWidth : 80
		}, {
			xtype : 'textfield',
			id : 'djxh',
			fieldLabel : '电机型号',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'dy',
			fieldLabel : '电  压',
			selectOnFocus : true
		},

		{
			xtype : 'textfield',
			id : 'dzdl',
			fieldLabel : '定子电流',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'cjbm',
			fieldLabel : '厂家编码',
			selectOnFocus : true
		}, {
			xtype : 'combo',
			id : "plant",
			store : plantStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '所属厂矿',
			displayField : 'NAME',
			valueField : 'ID',
			labelWidth : 80
		}, {
			xtype : 'combo',
			id : "depart",
			store : departStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '所属部门',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE'
		},

		{
			xtype : 'textfield',
			id : 'cs',
			fieldLabel : '槽  数',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'zzdy',
			fieldLabel : '转子电压',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'cjmc',
			fieldLabel : '厂家名称',
			selectOnFocus : true
		}, {
			xtype : 'combo',
			id : "cfplant",
			store : cfplantStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '存放单位',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			labelWidth : 80
		}, {
			xtype : 'combo',
			id : "cfdepart",
			store : cfdepartStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '存放部门',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			labelWidth : 80
		},

		{
			xtype : 'textfield',
			id : 'cfwz',
			fieldLabel : '存放位置',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'dxgg',
			fieldLabel : '导线规格',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'zzdl',
			fieldLabel : '转子电流',
			selectOnFocus : true
		}, {
			xtype : 'datefield',
			id : 'scrq',
			editable : false,
			fieldLabel : '生产日期',
			selectOnFocus : true,
			format : 'Y-m-d',
			value : new Date()
		}, {
			xtype : 'datefield',
			id : 'bxq',
			editable : false,
			fieldLabel : '保修期至',
			selectOnFocus : true,
			format : 'Y-m-d',
			value : new Date()
		},

		{
			xtype : 'textfield',
			id : 'dzcs',
			fieldLabel : '定子槽数',
			selectOnFocus : true,
			labelWidth : 80
		}, {
			xtype : 'textfield',
			id : 'zzcs',
			fieldLabel : '转子槽数',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'zl',
			fieldLabel : '重量',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'glys',
			fieldLabel : '功率因数',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'jxfs',
			fieldLabel : '接线方式',
			selectOnFocus : true
		}, {
			xtype : 'combo',
			id : "yxstatus",
			store : yxstatusStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '运行状态',
			displayField : 'WORK_STATUS_DESC',
			valueField : 'WORK_STATUS',
			labelWidth : 80
		}, {
			xtype : 'textfield',
			id : 'edzs',
			fieldLabel : '额定转数',
			selectOnFocus : true
		}, {
			xtype : 'textfield',
			id : 'key',
			fieldLabel : '电机唯一编号',
			selectOnFocus : true,
			labelWidth : 80,
			colspan : 3
		}, {
			xtype : 'textareafield',
			id : 'memo',
			fieldLabel : '备  注',
			selectOnFocus : true,
			colspan : 4,
			labelWidth : 80,
			width : 940,
			height : 50
			
		}, {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-no-border',
			colspan : 5,
			layout : 'column',
			items : [ {
				xtype : 'button',
				text : '保 存',
				style : ' margin: 0px 0px 0px 85px',
				//icon : imgpath + '/save.png',
				handler : btnbc,
				id : 'btnbc'
			} ]
		} ]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ panel ]
	});

	Ext.getCmp("plant").select(plantStore.getAt(0));
//	if (departtype == "厂矿机关") {
		Ext.getStore("departStore").setProxy({
			type : 'ajax',
			url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			extraParams : {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE':   Ext.util.Cookies.get('v_orgCode'),
				'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
				'V_V_DEPTTYPE':'[主体作业区]'
			},
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		});
//	}
//	else {
//		departdata.push({
//			"DEPARTCODE" : departcode,
//			"DEPARTNAME" : departname
//		});
//	}
	Ext.getStore('departStore').load();
	Ext.getCmp('depart').select(departStore.getAt(0));
	Ext.getStore('departStore').on("load", function() {
		Ext.getCmp('depart').select(departStore.getAt(0));
	});

	typeStore.load();
	Ext.getStore('typeStore').on("load", function() {
		Ext.getCmp('type').select(typeStore.getAt(0));
		Ext.getStore('djxhStore').load({
			params : {
				dj_type_in:Ext.getCmp('type').getValue()
			}
		});
	});
	Ext.getCmp('type').on("change", function() {
		Ext.getStore('djxhStore').load({
			params : {
				dj_type_in:Ext.getCmp('type').getValue()
			}
		});
	});
	cfplantStore.on("load", function() {
		Ext.getCmp('cfplant').select(cfplantStore.getAt(0));
		Ext.getStore('yxstatusStore').load();

		Ext.data.StoreManager.lookup('cfdepartStore').load({
			params : {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:   Ext.getCmp('cfplant').getValue(),
				V_V_DEPTCODENEXT:  Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE:'[主体作业区]'
			}
		});
	});
	Ext.getCmp('cfplant').on("change", function() {
		Ext.data.StoreManager.lookup('cfdepartStore').load({
			params : {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:   Ext.getCmp('cfplant').getValue(),
				V_V_DEPTCODENEXT:  Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE:'[主体作业区]'
			}
		});
	});

	Ext.getStore('cfdepartStore').on("load", function() {
		Ext.getCmp('cfdepart').select(cfdepartStore.getAt(0));
	});
	Ext.getStore('yxstatusStore').on("load", function() {
		Ext.getCmp('yxstatus').select(yxstatusStore.getAt(0));
		if (djcode != "") {
			Bind_data();
		}
	});
	if (djcode != "") {
		Ext.getCmp("btnbc").setText("保存修改");
	}
});
function Bind_data() {
	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj201_djmaindetail',
		method : 'POST',
		async : false,
		params : {
			dj_unique_code_in:djcode
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp.list.length > 0) {
				Ext.getCmp('key').setReadOnly('readOnly');
				Ext.getCmp('key').setValue(resp.list[0].DJ_UNIQUE_CODE);// key
				Ext.getCmp('eqname').setValue(resp.list[0].DJ_NAME);// 电机名称
				Ext.getCmp('djxh').setValue(resp.list[0].DJ_TYPE);// 电机型号
				Ext.getCmp('type').setValue(resp.list[0].DJ_SERIES_CLASS);// 电机系列分类
				Ext.getCmp('rl').setValue(resp.list[0].DJ_VOL);// 容量
				Ext.getCmp('dy').setValue(resp.list[0].DJ_V);// 电压
				Ext.getCmp('cs').setValue(resp.list[0].DJ_CS);// 槽数
				Ext.getCmp('dxgg').setValue(resp.list[0].DJ_DXTYPE);// 导线规格
				Ext.getCmp('zl').setValue(resp.list[0].DJ_WEIGHT);// 重量
				Ext.getCmp('dzcs').setValue(resp.list[0].DJ_CS_DZ);// 定子槽数
				Ext.getCmp('zzcs').setValue(resp.list[0].DJ_CS_ZZ);// 转子槽数
				Ext.getCmp('yxstatus').select(resp.list[0].WORK_STATUS);// 运行状态
				Ext.getCmp('plant').select(resp.list[0].PLANTCODE);// 所属厂矿
				Ext.getCmp('depart').select(
						Ext.String.trim(resp.list[0].DEPARTCODE));// 所属部门
				Ext.getCmp('cfplant').select(resp.list[0].LOC_PLANTCODE);// 存放单位
				Ext.getCmp('cfdepart').select(resp.list[0].LOC_DEPARTCODE);// 存放单位
				Ext.getCmp('cfwz').setValue(resp.list[0].DJ_LOC);// 存放位置
				Ext.getCmp('memo').setValue(resp.list[0].REMARK);// 备注
				Ext.getCmp('dzdy').setValue(resp.list[0].DZ_V);// 定子电压
				Ext.getCmp('dzdl').setValue(resp.list[0].DZ_A);// 定子电流
				Ext.getCmp('zzdy').setValue(resp.list[0].ZZ_V);// 转子电压
				Ext.getCmp('zzdl').setValue(resp.list[0].ZZ_A);// 转子电流
				Ext.getCmp('glys').setValue(resp.list[0].W_YINSHU);// 功率因数
				Ext.getCmp('edzs').setValue(resp.list[0].EDZS);// 额定转数
				Ext.getCmp('jxfs').setValue(resp.list[0].JXFS);// 接线方式
				Ext.getCmp('jydj').setValue(resp.list[0].JYDJ);// 绝缘等级
				Ext.getCmp('cjbm').setValue(resp.list[0].SUPPLY_CODE);// 生产厂家编码
				Ext.getCmp('cjmc').setValue(resp.list[0].SUPPLY_NAME);// 生产厂家名称
				Ext.getCmp('scrq').setValue(
						resp.list[0].PRODUCE_DATE.split(' ')[0]);// 生产时间
				Ext.getCmp('djbhh').setValue(resp.list[0].DJ_CODE);// 电机编号，后来新增的
				Ext.getCmp('bxq').setValue(
						resp.list[0].BX_DATE.split(' ')[0]);
			}
		}
	});
}
function btnbc() {// 保存和保存修改调用的过程，新增了一个电机编码参数
	if (Ext.getCmp('key').getValue() == "") {
		Ext.Msg.alert("提示", "电机唯一编码不能为空");
		return false;
	}
	Ext.Ajax
			.request({
			url: AppUrl + 'DJ/pro_dj201_adddjmain',
				method : 'POST',
				async : false,
				params : {
					DJ_UNIQUE_CODE_in:Ext.getCmp('key').getValue(),// key
					DJ_NAME_in:Ext.getCmp('eqname').getValue(),// 电机名称
					DJ_TYPE_in:Ext.getCmp('djxh').getValue(),// 电机型号
					DJ_SERIES_CLASS_in:Ext.getCmp('type').getValue(),// 电机系列分类
					DJ_VOL_in:Ext.getCmp('rl').getValue(),// 容量

					DJ_V_in:Ext.getCmp('dy').getValue(),// 电压
					DJ_CS_in:Ext.getCmp('cs').getValue(),// 槽数
					DJ_DXTYPE_in:Ext.getCmp('dxgg').getValue(),// 导线规格
					DJ_WEIGHT_in:Ext.getCmp('zl').getValue(),// 重量
					DJ_CS_DZ_in:Ext.getCmp('dzcs').getValue(),// 定子槽数

					DJ_CS_ZZ_in:Ext.getCmp('zzcs').getValue(),// 转子槽数
					WORK_STATUS_in:Ext.getCmp('yxstatus').getValue(),// 运行状态
					PLANTCODE_in:Ext.getCmp('plant').getValue(),// 所属厂矿
					PLANTNAME_in:Ext.getCmp('plant').getRawValue(),// 所属厂矿名
					DEPARTCODE_in:Ext.getCmp('depart').getValue(),// 所属部门

					DEPARTNAME_in:Ext.getCmp('depart').getRawValue(),// 所属部门名
					LOC_PLANTCODE_in:Ext.getCmp('cfplant').getValue(),// 存放单位
					LOC_PLANTNAME_in:Ext.getCmp('cfplant').getRawValue(),// 存放单位名
					DJ_LOC_in:Ext.getCmp('cfwz').getValue(),// 存放位置
					REMARK_in:Ext.getCmp('memo').getValue(),// 备注

					/*INSERTDATE_in:Ext.Date.format(new Date().getFullYear() + "-"
						+ (new Date().getMonth() + 1) + "-"
						+ new Date().getDate(), 'Y-m-d'),*/
					INSERTDATE_in:Ext.util.Format.date(new Date().getFullYear()+ "-"+ (new Date().getMonth() + 1) + "-"+ new Date().getDate(), 'Y-m-d'),
					// 录入日期
					DZ_V_in:Ext.getCmp('dzdy').getValue(),// 定子电压
					DZ_A_in:Ext.getCmp('dzdl').getValue(),// 定子电流
					ZZ_V_in:Ext.getCmp('zzdy').getValue(),// 转子电压
					ZZ_A_in:Ext.getCmp('zzdl').getValue(),// 转子电流

					W_YINSHU_in:Ext.getCmp('glys').getValue(),// 功率因数
					EDZS_in:Ext.getCmp('edzs').getValue(),// 额定转数
					JXFS_in:Ext.getCmp('jxfs').getValue(),// 接线方式
					JYDJ_in:Ext.getCmp('jydj').getValue(),// 绝缘等级
					SUPPLY_CODE_in:Ext.getCmp('cjbm').getValue(),// 生产厂家编码

					SUPPLY_NAME_in:Ext.getCmp('cjmc').getValue(),// 生产厂家名称
					PRODUCE_DATE_in:Ext.util.Format.date(Ext.getCmp('scrq').getValue(), 'Y-m-d'),// 生产时间
					USERID_IN:userid,
					USERNAME_IN:username,
					djcode_in:Ext.getCmp('djbhh').getValue(), // 新增的点击编号参数

					bx_date_in:Ext.util.Format.date(Ext.getCmp('bxq').getValue(), 'Y-m-d'),
					loc_departcode_in:Ext.getCmp('cfdepart').getValue(),
					loc_departname_in:Ext.getCmp('cfdepart').getRawValue()
				},
				success : function(resp) {
					var resp = Ext.JSON.decode(resp.responseText);
					if (resp.ret == 'Success') {
						alert("操作成功!");
						window.close();
						window.opener.Bind();
					} else {
						alert("操作失败!");
					}
				}
			});
}
function date(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value.substr(0, 10);
}