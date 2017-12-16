var initLoad = true;
var ckStoreLoad = false;
var V_GUID = "";
var V_V_GUID_COPY = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: '0' + i, valueField: '0' + i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}
var CONSUME_ID = '';
var INST_EQUIP_CODE = '';

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.CONSUME_ID == undefined) ? CONSUME_ID = '' : CONSUME_ID = parameters.CONSUME_ID;
    (parameters.INST_EQUIP_CODE == undefined) ? INST_EQUIP_CODE = '' : INST_EQUIP_CODE = parameters.INST_EQUIP_CODE;
}

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


    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['DETAIL_ID', 'PART_NO', 'PART_DESC', 'OIL_UNIT', 'OILING_DATE', 'USE_AMOUNT', 'APPROVE','OIL_BEGINDATE','OIL_ENDDATE','OIL_TYPE'],
        proxy: {
            url: AppUrl + 'hp/GET_PARTCONSUMELIST',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }
    });


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        title: '写实操作',
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'xsqksm',
            queryMode: 'local',
            fieldLabel: '写实情况说明',
            labelWidth: 100,
            width: 500,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin:5px',
            width: 100
        },
        items: [{
            xtype: 'button',
            text: '提交写实数据',
            //icon: imgpath + '/search.png',
            handler: _submitRealisticDate
        }, {
            xtype: 'button',
            text: '平均分配',
           // icon: imgpath + '/search.png',
            handler: _averagedistribution
        }, {
            xtype: 'button',
            text: '按规范分配',
           // icon: imgpath + '/search.png',
            handler: _normativeDistribution

        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
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
            text: '部位编码',
            dataIndex: 'PART_NO',
            align: 'center',
            width: 120/*,
             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
             return value.substring(0,10);
             }*/
        }, {
            text: '部位名称',
            dataIndex: 'PART_DESC',
            align: 'center',
            width: 200
        }, {
            text: '计量单位',
            dataIndex: 'OIL_UNIT',
            align: 'center',
            width: 200
        }, {
            text: '消耗数量',
            dataIndex: 'USE_AMOUNT',
            align: 'center',
            width: 200,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: '写实日期',
            dataIndex: 'OIL_BEGINDATE',
            align: 'center',
            width: 300,
            field : {
                xtype : 'datefield'
            },
            renderer:Ext.util.Format.dateRenderer('Y-m-d'),
            editor:new Ext.form.DateField({format:'Y-m-d'})
        }, {
            text: '上次油品情况评价',
            dataIndex: 'APPROVE',
            align: 'center',
            width: 100,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: '操作',
            dataIndex: 'OIL_UNIT',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_save(\'' + record.data.DETAIL_ID + '\',\'' + record.data.PART_NO + '\',\'' + record.data.USE_AMOUNT + '\',\'' + record.data.OIL_BEGINDATE + '\',\'' + record.data.APPROVE + '\')">' + '保存' + '</a>';
            }
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
            items: [editPanel]
        }, {
            region: 'north',
            border: false,
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    _init()
})

function _init() {
    if(initLoad)
    {
        initLoad = false;
        var gridStore = Ext.data.StoreManager.lookup('gridStore');
        gridStore.proxy.extraParams = {
            'A_CONSUME_ID': CONSUME_ID
        };
        gridStore.load();
    }



    Ext.getBody().unmask();//去除页面笼罩
}

function _save(DETAIL_ID,PART_NO,USE_AMOUNT,OIL_BEGINDATE,APPROVE)
{

    Ext.Ajax.request({
        url: AppUrl + 'hp/SAVEPARTCONSUME',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_DETAIL_ID': DETAIL_ID,
            'A_CONSUME_ID': CONSUME_ID,
            'A_EQUIP_ID': INST_EQUIP_CODE,
            'A_PART_NO': PART_NO,
            'A_USEAMOUNT': USE_AMOUNT,
            'A_OIL_DATE': Ext.Date.format(new Date(OIL_BEGINDATE), 'Y-m-d'),
            'A_APPROVE': APPROVE,
            'A_USERID': Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                Ext.MessageBox.alert('提示',data.RET_MSG );




            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })

}

function _submitRealisticDate(){
    Ext.Ajax.request({
        url: AppUrl + 'hp/SUBMITPARTCONSUME',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_CONSUME_ID': CONSUME_ID,
            'A_OIL_REMARK': Ext.getCmp('xsqksm').getValue(),
            'A_USERID': Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                Ext.MessageBox.alert('提示', data.RET_MSG, callBack);
                function callBack(id) {
                    window.opener._selectWaitoilconsumelist();
                    _close();
                }



            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}

function _averagedistribution(){
    Ext.Ajax.request({
        url: AppUrl + 'hp/INSERTPARTAVG',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_CONSUME_ID': CONSUME_ID,
            'A_USERID': Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                Ext.MessageBox.alert('提示', '操作成功', callBack);
                function callBack(id) {
                    var gridStore = Ext.data.StoreManager.lookup('gridStore');
                    gridStore.proxy.extraParams = {
                        'A_CONSUME_ID': CONSUME_ID
                    };
                    gridStore.load();
                }



            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}

function _normativeDistribution(){
    Ext.Ajax.request({
        url: AppUrl + 'hp/INSERTPARTMAIN',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_CONSUME_ID': CONSUME_ID,
            'A_USERID': Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                Ext.MessageBox.alert('提示', '操作成功', callBack);
                function callBack(id) {
                    var gridStore = Ext.data.StoreManager.lookup('gridStore');
                    gridStore.proxy.extraParams = {
                        'A_CONSUME_ID': CONSUME_ID
                    };
                    gridStore.load();
                }



            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}









