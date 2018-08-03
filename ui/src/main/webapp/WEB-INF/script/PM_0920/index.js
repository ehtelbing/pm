var mingtian = new Date();
mingtian.setDate(mingtian.getDate() + 1);
var V_GUID = "";
var zyqStoreload = false;
var ckStoreLoad = false;
var kfStoreload = false;
var dt = new Date();
var thisYear = dt.getFullYear();
var tomorrowYear = dt.getFullYear() + 1;
var years = [];
for (var i = 2012; i <= tomorrowYear; i++)
    years.push({
        displayField: i,
        valueField: i
    });
if (location.href.split('?')[1] != undefined) {
    var url_guid = Ext.urlDecode(location.href.split('?')[1]).v_guid_dx;
}
var stateData = [{displayField: '全部', valueField: '%'}, {displayField: '编辑', valueField: '编辑'}, {
    displayField: '审批中',
    valueField: '审批中'
}, {displayField: '审批通过', valueField: '审批通过'}, {displayField: '审批驳回', valueField: '审批驳回'}];

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {

   Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
                zyqStoreload = true;
                _init();
            }
        }
    });

    //库房store
    var kfstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'kfstore',
        fields: ['ID', 'STORE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'oldR/getJunkWaitMendStoreList',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('kf').select(store.first());
                kfStoreload = true;
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['PLANTNAME', 'DEPARTNAME', 'PLANTCODE', 'DEPARTCODE','MATERIALCODE',
            'MATERIALNAME', 'AMOUNT', 'UNIT', 'KCID','STORENAME', 'UPDATEDATE', 'MATERILETALON'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'oldR/getWaitMendKcTable',
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

    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        header: false,
        frame: true,
        layout: 'column',
        defaults: {
            labelAlign: 'right',
            labelWidth: 60,
            inputWidth: 150,
            margin: '5 0 5 0'
        },
        items: [{
            id: 'ck',
            xtype: 'combo',
            labelWidth: 40,
            store: ckstore,
            fieldLabel: '厂矿',
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectSbSecond();
                    //_selectKF();
                }
            }
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectKF();
                }
            }
        }, {
            id: 'kf',
            xtype: 'combo',
            store: kfstore,
            fieldLabel: '库房',
            editable: false,
            displayField: 'STORE_DESC',
            valueField: 'ID',
            queryMode: 'local'
        }, {
            id: 'jjbm',
            xtype: 'textfield',
            fieldLabel: '旧件编码',
            margin: '5 0 0 20',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }, {
            id: 'jjms',
            xtype: 'textfield',
            fieldLabel: '旧件描述',
            margin: '5 0 0 20',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            margin: '5 0 5 15',
            width: 80
        },
        items: [{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _selectOverhaulApply
        }, {
            xtype: 'button',
            text: '生成工单',
            icon: imgpath + '/accordion_collapse.png',
            handler: createWorkorder
        }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'overhaulApplyPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '厂矿名称',
            dataIndex: 'PLANTNAME',
            align: 'center',
            flex: 1
        }, {
            text: '作业区名称',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            flex: 1
        }, {
            text: '旧件名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            flex: 1
        }, {
            text: '旧件编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            flex: 1
        }, {
            text: '库存数量',
            dataIndex: 'AMOUNT',
            align: 'center',
            flex: 1
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
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
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [overhaulApplyPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
          /*  V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_MMNAME: Ext.getCmp('jjms').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize*/
            v_sap_plantcode: Ext.getCmp('ck').getValue(),
            v_sap_departcode: Ext.getCmp('zyq').getValue(),
            v_storeid: Ext.getCmp('kf').getValue(),
            v_mat_no: Ext.getCmp('jjbm').getValue(),
            v_mat_desc: Ext.getCmp('jjms').getValue()
        }
    });

    _init()
})

function _init() {
    if (zyqStoreload && ckStoreLoad && kfStoreload) {
        zyqStoreload = false;
        ckStoreLoad = false;
        kfStoreload = false;
        Ext.getBody().unmask();//去除页面笼罩
    }
}


function _selectOverhaulApply() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        /*   V_V_ORGCODE : Ext.getCmp('ck').getValue(),
         V_V_DEPTCODE : Ext.getCmp('zyq').getValue(),
         V_V_MMNAME : Ext.getCmp('jjms').getValue(),
         V_V_PAGE: Ext.getCmp('page').store.currentPage,
         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize*/
        v_sap_plantcode: Ext.getCmp('ck').getValue(),
        v_sap_departcode: Ext.getCmp('zyq').getValue(),
        v_storeid: Ext.getCmp('kf').getValue(),
        v_mat_no: Ext.getCmp('jjbm').getValue(),
        v_mat_desc: Ext.getCmp('jjms').getValue()

    };
    gridStore.currentPage = 1;
    gridStore.load();
}


function createWorkorder() {

    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if (records[0].data.AMOUNT > 0) {
        Ext.Ajax.request({
            url: AppUrl + 'zpf/PRO_PM_WORKORDER_OLD_NC',
            method: 'POST',
            async: false,
            params: {
                //V_V_KCID:records[i].data.KCID ,
                V_V_PLANTCODE:records[0].data.PLANTCODE ,
                V_V_DEPARTCODE:records[0].data.DEPARTCODE ,
                V_V_MATERIALCODE:records[0].data.MATERIALCODE ,
                V_V_MATERIALNAME:records[0].data.MATERIALNAME ,
                V_V_AMOUNT:records[0].data.AMOUNT,
                V_V_SOURCECODE:'defct11'
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                var owidth = 1100;
                var oheight = 700;
                if (resp.list.length>0) {
                    var V_ORDERGUID=resp.list[0].V_ORDERGUID;
                    Ext.Ajax.request({
                        url: AppUrl + 'oldR/outputMendForOrder',
                        method: 'POST',
                        async: false,
                        params: {
                            v_userid:Ext.util.Cookies.get('v_personcode') ,
                            v_kcid:records[0].data.KCID ,
                            f_mend_amount:records[0].data.AMOUNT ,
                            v_orderid:V_ORDERGUID
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            if(resp.list == 'Success'){
                                var ret = window.open(AppUrl + 'page/PM_092001/index.html?V_GUID='
                                + V_ORDERGUID+'', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                            }
                        }
                    });
                }

            }
        });
    }else {
        Ext.MessageBox.alert('操作信息', '修旧数量为零，无需下票！');
        return;
    }






   /* for (i = 0; i < records.length; i++) {
        if (records[i].data.V_STATECODE == '99') {
            var param = "";
            try {
                var owidth = 1100;
                var oheight = 700;
                if (url_guid != undefined) {
                    param = "&&url_guid=" + url_guid;
                } else {
                    param = "";
                }
                var ret = window.open(AppUrl + 'page/PM_092001/index.html?V_GUID='
                + records[i].data.V_ORDERGUID + param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            } catch (e) {
                var owidth = window.document.body.offsetWidth - 200;
                var oheight = window.document.body.offsetHeight - 100;
                if (url_guid != undefined) {
                    param = "&&url_guid=" + url_guid;
                } else {
                    param = "";
                }
                var ret = window.open(AppUrl + 'page/PM_092001/index.html?V_GUID='
                + records[i].data.V_ORDERGUID + '' + param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            }
        } else {
            Ext.MessageBox.alert('操作信息', '该缺陷已下票，请重新选择！');
            return;
        }
    }*/


}


function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if (value == null) {
        return '<div data-qtip="' + value + '" ></div>';
    }
    else {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}

function ReadGD(value, metaData) {
    if (Ext.getCmp('tabid').getValue() == 'defct01') {

        Ext.getCmp('gdh').show();
        return '<div><a href="javascript:OnClickGD(\'' + value + '\')">' + value + '</a></div>';
    } else {
        Ext.getCmp('gdh').hide();
    }
}

function itemclick(s, record, item, index, e, eOpts) {
    //window.showModalDialog(AppUrl + "/No210302/Index.html?v_guid="
    //    + Ext.getStore("gridStore").getAt(index).get("V_GUID"), "",
    //    "dialogHeight:600px;dialogWidth:700px");
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index1.html?v_guid="
    + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function _selectSbSecond() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();
}

function _selectKF() {
    var kfstore = Ext.data.StoreManager.lookup('kfstore');
    kfstore.proxy.extraParams = {
        v_sap_plantcode: Ext.getCmp('ck').getValue(),
        v_sap_departcode: Ext.getCmp('zyq').getValue()
        /* v_storeid: Ext.getCmp('kf').getValue(),
         v_mat_no: Ext.getCmp('jjbm').getValue(),
         v_mat_desc: Ext.getCmp('jjms').getValue()*/
    };
    //matGroupSecondStore.currentPage = 1;
    kfstore.load();
}