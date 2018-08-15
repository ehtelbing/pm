
var Index = "";
var sidebar = [];
var body = [];
var v_url = "";
var menutype = "";
var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用
var USERID = Ext.util.Cookies.get('v_personcode');
if (location.href.split('?')[1] != undefined) {
	var parameters = Ext.urlDecode(location.href.split('?')[1]);
	(parameters.menutype != undefined) ? menutype = parameters.menutype : 0;
}


Ext.onReady(function () {
	Ext.getBody().mask('加载中');

	var favoriteStore = Ext.create('Ext.data.TreeStore', {
		storeId: 'favoriteStore',
		autoLoad: false,
		loading: false,
		root: {},//保证autoload有效，自动加载或者不自动加载
		pageSize: -1,
		fields: ['I_MENUID', 'V_MENUCODE', 'V_MENUNAME', 'V_MENUCODE_UP', 'V_URL', 'V_ICOURL', 'V_SYSTYPE', 'I_ORDERID', 'V_ROLECODE', 'V_ROLENAME', 'V_FLAG', 'V_HOME_MENU', 'V_DEPTCODE', 'V_OTHER'],
		proxy: {
			url: AppUrl +'Kxy/PRO_BASE_MENU_FAVORITE',
			type: 'ajax',
			async: true,
			actionMethods: {
				read: 'POST'
			},
			extraParams: {},
			reader: {
				type: 'json',
				root: 'children',
				totalProperty: 'total'
			}
		},
		listeners: {
			load: function () {
				setTimeout('_expandFavorite()', 200);
			}
		}
	});

	var buttonPanel = Ext.create('Ext.Panel', {
		id: 'buttonPanel',
		defaults: {
			style: 'margin: 2px;'
		},
		items: [{
			xtype: 'button',
			text: '添加收藏',
			handler: _returnFavorite
		}, {
			xtype: 'button',
			text: '关闭',
			handler: _close
		}]
	});

	var favoritePanel = Ext.create('Ext.tree.Panel', {
		id: 'favoritePanel',
		store: favoriteStore,
		rootVisible: false,
		hideHeaders: false,
		rowLines: true,
		columnLines: true,
		frame: true,
		animate: !Ext.isIE,
		selModel: {
			selType: 'checkboxmodel',
			mode: 'SIMPLE'
		},
		columns: [{
			xtype: 'treecolumn',
			text: '页面名称',
			dataIndex: 'V_MENUNAME',
			style: 'text-align: left;',
			flex: 1
		}]
	});

	Ext.create('Ext.container.Viewport', {
		layout: {
			type: 'border',
			regionWeights: {
				west: -1,
				north: 1,
				south: 1,
				east: -1
			}
		},
		defaults: {
			border: false
		},
		items: [{
			region: 'north',
			items: [buttonPanel]
		}, {
			region: 'center',
			layout: 'fit',
			items: [favoritePanel]
		}]
	});
	_init();

});

function _init() {
	for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
		if (Ext.data.StoreManager.getAt(i).isLoading()) {
			return;
		}
	}
	_selectFavorite();
	Ext.getBody().unmask();
}

function _selectFavorite() {
	var favoriteStore = Ext.data.StoreManager.lookup('favoriteStore');
	favoriteStore.proxy.extraParams = {
		IS_V_ROLECODE: Ext.util.Cookies.get('v_rolecode'),
		IS_V_SYSTYPE: '1',
		V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
		V_V_HOME_MENU: menutype
	};
	favoriteStore.load();
}

function _returnFavorite(){
	var records = Ext.getCmp('favoritePanel').getSelectionModel().getSelection();

	if (records.length == 0) {
		Ext.Msg.alert('提示', '请选择页面');
		return;
	}

	for (var i = 0; i < records.length; i++) {
		if (records[i].data.children.length != 0) {
			Ext.Msg.alert('提示', '请选择具体页面');
			return;
		}
	}
	parent.returnValue = records;
	_close();
}

function _expandFavorite() {
	var rootnode = Ext.getCmp('favoritePanel').getRootNode();
	rootnode.expand();
	if (rootnode.childNodes.length > 0) {
		rootnode.childNodes[0].expand();
	}
}

function _close() {
	parent.win.close();
}