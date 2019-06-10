var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_ORDERGUID='';

if (location.href.split('?')[1] != undefined) {
    V_V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_ORGCODE;
    V_V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE;
    V_V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_V_ORDERGUID;

}
var today = new Date();
var YEAR = today.getFullYear();
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({name: i, value: i});
Ext.onReady(function () {


    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['name', 'value'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        border: false,
        frame: true,
        defaults : {
            style : 'margin:2px'
        },
        layout : 'column',
        items : [ {
            xtype: 'combo',
            id: 'year',
            store: yearStore,
            queryMode: 'local',
            valueField: 'name',
            displayField: 'value',
            forceSelection: true,
            fieldLabel: '年份',
            value:YEAR,
            editable: false,
            labelWidth: 70,
            width: 200
        },{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _search
        },{
            xtype: 'button',
            text: '选择',
            icon: imgpath + '/saved.png',
            handler: _chose
        }]
    });
    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_TIME', 'V_EQUTYPE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_FAULT_TYPE',
            'V_FAULT_YY', 'V_FAULT_XX', 'V_FAULT_LEVEL', 'V_JJBF', 'V_GUID', 'V_FILE_GUID',
            'V_ORGCODE', 'I_ID', 'V_DEPTNAME', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPECODE',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_FAULT_GUID', 'V_FINDTIME', 'V_PART',
            'V_TYPENAME', 'V_EQUCHILD_NAME','V_FAULT_NAME','V_STATE','V_STATENAME',
            'V_FAULT_PART','V_FAULT_CLGC','V_FAULT_SS','V_FAULT_XZ','V_FAULT_ZGCS','V_FZR_CL',
            'V_FAULTID','V_PROCESSINSTANCEID'],
        proxy: {
            url: AppUrl + 'cxy/PM_WORKORDER_TO_FAULT_SEL',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var faultItemPanel = Ext.create('Ext.grid.Panel', {
        id: 'faultItemPanel',
        store: faultItemStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel'
            // mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 60,
            align: 'center'
        },{
            text: '状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100
            // renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
            //     if(value!="未上报") {
            //         return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_PROCESSINSTANCEID + '\')">' + value + '</a>';
            //     }else{
            //         return value;
            //     }
            // }
        }, {
            text: '发现时间',
            dataIndex: 'V_FINDTIME',
            align: 'center',
            width: 100
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPENAME',
            align: 'center',
            width: 100
            /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
             var index = faultItemStore.find('V_EQUTYPECODE', value);
             if (index != -1) {
             return faultItemStore.getAt(index).get('V_EQUTYPENAME');
             }
             return null;
             }*/
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 100
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100
        }, {
            text: '部件',
            dataIndex: 'V_EQUCHILD_NAME',
            align: 'center',
            width: 180
        }, {
            text: '故障类型',
            dataIndex: 'V_TYPENAME',
            align: 'center',
            width: 100
        }, {
            text: '故障原因',
            dataIndex: 'V_FAULT_YY',
            align: 'center',
            width: 100
        }, {
            text: '故障现象',
            dataIndex: 'V_FAULT_XX',
            align: 'center',
            width: 100
        }, {
            text: '故障等级',
            dataIndex: 'V_FAULT_LEVEL',
            align: 'center',
            width: 100
        }, {
            text: '解决办法',
            dataIndex: 'V_JJBF',
            align: 'center',
            width: 100
        }, {
            text: '故障名称',
            dataIndex: 'V_FAULT_NAME',
            align: 'center',
            width: 100
        }, {
            text: '故障部位',
            dataIndex: 'V_FAULT_PART',
            align: 'center',
            width: 100
        }, {
            text: '处理过程',
            dataIndex: 'V_FAULT_CLGC',
            align: 'center',
            width: 100
        }, {
            text: '损失',
            dataIndex: 'V_FAULT_SS',
            align: 'center',
            width: 100
        }, {
            text: '性质',
            dataIndex: 'V_FAULT_XZ',
            align: 'center',
            width: 100
        }, {
            text: '整改措施',
            dataIndex: 'V_FAULT_ZGCS',
            align: 'center',
            width: 100
        }, {
            text: '对相关负责人的处理',
            dataIndex: 'V_FZR_CL',
            align: 'center',
            width: 100
        }

        ],bbar : [ {
        xtype : 'pagingtoolbar',
        dock : 'bottom',
        id : 'page',
        displayInfo : true,
        displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg : '没有记录',
        store : 'faultItemStore'
    } ]

    });



    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'north',
            border : false,
            items : [buttonPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ faultItemPanel ]
        } ]
    });



    Ext.data.StoreManager.lookup('faultItemStore').on('beforeload',function(store) {
        store.proxy.extraParams.V_V_ORGCODE = V_V_ORGCODE;
        store.proxy.extraParams.V_V_DEPTCODE = V_V_DEPTCODE;
        store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getSubmitValue();
        store.proxy.extraParams.V_V_PAGE= Ext.getCmp('page').store.currentPage;
        store.proxy.extraParams.V_V_PAGESIZE= Ext.getCmp('page').store.pageSize;
    });
    _init();
});



function _init() {

    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('faultItemStore').load();
}
function _search() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('faultItemStore').load();
}
function _chose() {
    var seldata = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
    }
    else{
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_WORKORDER_FAULT_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_FAULT_GUID': seldata[0].data.V_GUID,
                'V_V_WORKORDER_ORDERID': V_V_ORDERGUID,
                'V_V_INPER_CODE': Ext.util.Cookies.get('v_personcode')

            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    // Ext.Msg.alert('成功', '修改成功');
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '关联成功',
                        buttons: Ext.MessageBox.OK
                    });
                    window.opener.QueryGrid();
                    window.close();

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    // window.opener.QueryGrid();
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                // window.opener.QueryGrid();
            }
        });
    }
}