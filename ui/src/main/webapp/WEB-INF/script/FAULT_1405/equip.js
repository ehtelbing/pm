var V_V_GUID='';
var V_V_STATE='';
if (location.href.split('?')[1] != undefined) {
    V_V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    V_V_STATE= Ext.urlDecode(location.href.split('?')[1]).V_STATE;
}

var gridStore =Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : false,
    fields : ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE',
        'V_EQUSITENAME','V_EQUTYPECODE','V_EQUUPCODE','V_EQUUPNAME','V_STUTE','V_NUM'],
    proxy : {
        type : 'ajax',
        url: AppUrl + 'cxy/PRO_FAULT_EQUIP_SEL',
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

		columns : [
			{
			text : '设备分类',
			dataIndex : 'V_EQUTYPENAME',
			align : 'center',
			width : 100
		}, {
                text : '主设备编号',
                dataIndex : 'V_EQUUPCODE',
                align : 'center',
                width : 100
		}, {
                text : '主设备名称',
                dataIndex : 'V_EQUUPNAME',
                align : 'center',
                width : 100
            }, {
			text : '设备编号',
			dataIndex : 'V_EQUCODE',
			align : 'center',
			width : 100
		}, {
			text : '设备名称',
			dataIndex : 'V_EQUNAME',
			align : 'center',
			width : 100
		}, {
			text : '设备位置编码',
			dataIndex : 'V_EQUSITE',
			align : 'center',
			width : 100
		}, {
			text : '设备位置',
			dataIndex : 'V_EQUSITENAME',
			align : 'center',
			width : 200
		},{text: '生成工单',
		   dataIndex : 'V_EQUCODE',
		   align: 'center',
		   width: 100,
		   renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
               // record.
               if(V_V_STATE=='0'||V_V_STATE=='2'){
                   return '<a href="#" onclick="_opengd(\'' + value + '\')">生成工单</a>';
               }else{
                   return '已完结';
               }
		   }
	    },{text : '状态',
                dataIndex : 'V_STUTE',
                align : 'center',
                width : 80
        },{text : '生成工单数量',
                dataIndex : 'V_NUM',
                align : 'center',
                width : 80
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
function _opengd(value){
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + "page/FAULT_1405/workorder.html?V_GUID=" + V_V_GUID+"&V_EQUCODE="+value,
        "", 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
function _flselectGridPanel() {
    _selectGridPanel();
    window.opener._seltctFault();
}