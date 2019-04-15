if (location.href.split('?')[1] != undefined) {
    V_V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

var gridStore =Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : false,
    fields : ['V_ORGCODE', 'V_DEPTNAME', 'V_EQUIP_NAME', 'V_EQUIP_NO',
        'V_EQUSITENAME','V_ORDER_TYP_TXT','V_ORDERID','V_DEPTCODEREPAIR',
        'V_SHORT_TXT','V_PERSONNAME','D_ENTER_DATE','V_WBS','V_WBS_TXT',
        'D_START_DATE','D_FINISH_DATE'
    ],
    proxy : {
        type : 'ajax',
        url: AppUrl + 'cxy/PRO_PM_WORKORDER_FAULT_OVER_SEL',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});
var grid = Ext.create('Ext.grid.Panel', {
    id : 'grid',
    region : 'center',
    store : gridStore,
    columnLines : true,
    // selType: 'checkboxmodel',
    // plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
    //     clicksToEdit : 1
    // }) ],

		columns : [{
            text : '工单类型',
            dataIndex : 'V_ORDER_TYP_TXT',
            align : 'center',
            width : 100
        }, {
            text : '工单号',
            dataIndex : 'V_ORDERID',
            align : 'center',
            width : 100
        }, {
            text : '工单描述',
            dataIndex : 'V_SHORT_TXT',
            align : 'center',
            width : 100
        }, {
            text : '厂矿',
            dataIndex : 'V_ORGCODE',
            align : 'center',
            width : 150
        },  {
            text : '作业区',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 150
        }, {
			text : '设备编号',
			dataIndex : 'V_EQUIP_NO',
			align : 'center',
			width : 150
		}, {
			text : '设备名称',
			dataIndex : 'V_EQUIP_NAME',
			align : 'center',
			width : 200
		}, {
			text : '设备位置',
			dataIndex : 'V_EQUSITENAME',
			align : 'center',
			width : 200
		}, {
			text : '检修单位',
			dataIndex : 'V_DEPTCODEREPAIR',
			align : 'center',
			width : 200
		}, {
            text : 'WBS编码',
            dataIndex : 'V_WBS',
            align : 'center',
            width : 200
        }, {
            text : '项目名称',
            dataIndex : 'V_WBS_TXT',
            align : 'center',
            width : 200
        }, {
            text : '创建人',
            dataIndex : 'V_PERSONNAME',
            align : 'center',
            width : 80
        }, {
            text : '创建时间',
            dataIndex : 'D_ENTER_DATE',
            align : 'center',
            width : 150
        }, {
            text : '计划开始时间',
            dataIndex : 'D_START_DATE',
            align : 'center',
            width : 150
        }, {
            text : '计划完成时间',
            dataIndex : 'D_FINISH_DATE',
            align : 'center',
            width : 150
        }
	]

	});



Ext.onReady(function() {
    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'fit',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [grid ]
    });

    _selectGridPanel();

});
function _selectGridPanel() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        'V_V_FAULTCODE': V_V_GUID
    };
    gridStore.load();
}
