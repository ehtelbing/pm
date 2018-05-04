var EQU_CODE;//选中树就提取设备编码
var V_NEXT_SETP = '';
var V_V_SPECIALTY = '';
var V_STEPCODE = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_ORDERGUID = '';
var taskId='';
//var ProcessInstanceId = '';//解析URL参数
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
    //(parameters.ProcessInstanceId == undefined) ? ProcessInstanceId = '' : ProcessInstanceId = parameters.ProcessInstanceId;

}

Ext.onReady(function () {

    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'nextSprStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_REPAIRCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_FLOWTYPE: 'JmDJ',
                V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_SPECIALTY: V_V_SPECIALTY,
                V_V_WHERE: '通过'
            }
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                Ext.getCmp('nextPer').select(store.first());

            }

        }
    });


    //厂矿精密点检的数据集
    var jmdjStore = Ext.create('Ext.data.Store', {
        storeId: 'jmdjStore',
        autoLoad: false,
        fields: ['V_GUID', 'BUSINESSKEY', 'V_EQU_NAME', 'V_GNWZ', 'V_JCFS', 'V_JCZQ', 'V_ZD', 'V_DJ', 'V_TS',
            'V_DL', 'V_RX', 'V_CSWZSL', 'V_CSDSL', 'V_EQU_CODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/PM_06_JMDJ_BY_BUSINESSKEY_SEL',
            async: true,
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

    //页面上的保存，接收，获取模板，关闭的按钮
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        title: '<div align="center">厂矿精密点检主管接收</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'nextPer',
                labelAlign: 'right',
                fieldLabel: '下一步接收人',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 80,
                value: '',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                store: nextSprStore,
                queryMode: 'local'
            },
            {id: 'spyj', xtype: 'textfield', fieldLabel: '审批意见', labelWidth: 60, style: ' margin: 5px 0px 0px 5px', labelAlign: 'right'},
            {xtype: 'button', text: '确认通过', style: ' margin: 5px 0px 0px 5px', icon: imgpath + '/saved.png', handler: _agree}
        ]
    });

    //已录入信息表
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        title: '已录入信息',
        store: jmdjStore,
        frame: true,
        autoScroll: true,
        layout: 'fit',
        rowLines: true,
        columnLines: true,
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备名称', dataIndex: 'V_EQU_NAME', flex: 1},
            {text: '功能位置', dataIndex: 'V_GNWZ', flex: 1},
            {text: '检测方式', dataIndex: 'V_JCFS', flex: 1},
            {text: '检测周期', dataIndex: 'V_JCZQ', flex: 1},
            {
                text: '检测内容', dataIndex: '', flex: 5,
                columns: [
                    {
                        text: '振动', dataIndex: 'V_ZD', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_ZD == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电机', dataIndex: 'V_DJ', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DJ == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'/>";
                            }
                        }
                    }, {
                        text: '探伤', dataIndex: 'V_TS', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_TS == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电缆', dataIndex: 'V_DL', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DL == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '热像', dataIndex: 'V_RX', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_RX == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'/>";
                            }
                        }
                    }]
            },
            {text: '测试位置数量', dataIndex: 'V_CSWZSL', flex: 1},
            {text: '测试点数量', dataIndex: 'V_CSDSL', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jmdjStore'
        }]
    });

    var gridPanel4 = Ext.create('Ext.panel.Panel', {
        id: 'gridPanel4',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', height: '100%', layout: 'fit', items: [gridPanel1]}]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                north: 4,
                east: 2,
                south: 1,
                west: 3
            }
        },
        defaults: {
            border: false
        },
        items: [
            {region: 'north', items: [buttonPanel]},

            {region: 'center', width: '100%', layout: 'fit', items: [gridPanel4]}]
    });

    _selectJmdj();
    _selectTaskId();


});

function _selectTaskId() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: V_ORDERGUID,
            userCode: Ext.util.Cookies.get('v_personcode')

        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            taskId = data.taskId;
            V_STEPCODE = data.TaskDefinitionKey;

        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })
}

//同意的函数
function _agree() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: ['lcjs', "flow_yj",'shtgtime'],
            parVal: ['lcjs',spyj,Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s') ],
            processKey: $.url().param("ProcessDefinitionKey"),
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: 'lcjs',
            V_STEPNAME: '流程结束',
            V_IDEA: '通过',
            V_NEXTPER:'lcjs',
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_06/PRO_PM_06_ACTIVITI_FLOW_AGREE',
                    method: 'POST',
                    async: false,
                    params: {
                        'V_V_ORDERID': V_ORDERGUID,
                        'V_V_PROCESS_NAMESPACE': 'JmDJ',
                        'V_V_PROCESS_CODE': $.url().param("ProcessDefinitionKey"),
                        'V_V_STEPCODE': V_STEPCODE,
                        'V_V_STEPNEXT_CODE': 'lcjs'
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        if (resp.V_INFO == 'success') {
                            window.opener.QueryTabY();
                            window.opener.QuerySum();
                            window.opener.QueryGrid();
                            window.close();

                        }
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '任务提交失败');
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


//查询厂矿精密点检
function _selectJmdj() {
    var jmdjStore = Ext.data.StoreManager.lookup('jmdjStore');
    jmdjStore.proxy.extraParams.V_V_BUSINESSKEY = V_ORDERGUID;
    jmdjStore.currentPage = 1;
    jmdjStore.load();
}





