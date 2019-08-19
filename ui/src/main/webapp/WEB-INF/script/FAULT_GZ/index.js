var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_V_GUID = "";
var orgLoad = false;
var zyqload = false;
var orgLoad1 = false;
var orgLoad2 = false;
var equFaultLoad = false;
var equFaultLoad1 = false;
var equFaultLoad2 = false;
var nextSprLoad = false;
var init = true;
var initadd = true;
var code ="";
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var processKey2 = '';
var V_STEPNAME2 = '';
var V_NEXT_SETP2 = '';
var selectID = [];
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
    Ext.getBody().mask('<p>页面载入中...</p>');

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });



    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                zyqload = true;
                _init();
            }
        }
    });
    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
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
            extraParams: {}
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                nextSprLoad = true;
                if( store.getAt(0)==undefined){
                    Ext.getCmp('nextPer').select(''); return;
                }else{
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('nextPer').select(store.first());
                }

            }

        }
    });
    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_GUID', 'V_FAULT_NAME', 'V_DEPTCODE','V_DEPTNAME',
            'V_PROGRAM', 'V_MODE','V_WORK_TYPE','V_PERSON_NUM',
            'V_EQUIP','V_TOOLS','V_MATERIAL','V_SPARE_PART','V_ORGANIZATIONAL',
            'V_PLAN','V_ORGCODE','V_ORGNAME','V_EQUNAME','V_FAULTYNID',
            'V_SPARE_PARTNAME','V_PREVENT','V_STAUTSNAME','V_STAUTS'],
        proxy: {
            url: AppUrl + 'cxy/PM_FAULT_PLAN_SEL',
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



    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px'
        },
        items : [ {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _seltctFault
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: _preUpdateFault
        }, {
            xtype: 'button',
            text: '上报',
            // width: 90,
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        },{
            xtype: 'button',
            text: '打印',
            // width: 90,
            icon: imgpath + '/printer.png',
            handler: OnButtonPrint
        }
        ]
    });

    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        // layout : {
        //     type:'table',
        //     columns:5
        // },
        defaults : {
            labelAlign : 'right',
            // labelWidth : 100,
            // inputWidth : 200,
            margin : '4,0,0,0'
        },
        items : [{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            store: orgStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectDept();
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            width: 250,
           listeners: {
                change: function (field, newValue, oldValue) {
                    // _selecteType();
                _selectNextSprStore();
                }
            }
        },{
            xtype: 'combo',
            id: 'nextPer',
            fieldLabel: '下一步接收人',
            editable: false,
            style: ' margin: 5px 0px 0px 10px',
            labelWidth: 90,
            width: 250,
            value: '',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            store: nextSprStore,
            queryMode: 'local'
        }
            ]
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
        }, {
            text: '状态',
            dataIndex: 'V_STAUTSNAME',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if(value!="未上报") {
                    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + value + '</a>';
                }else{
                    return value;
                }
            }
        },{
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100
        }, {
            text: '事故名称',
            dataIndex: 'V_FAULT_NAME',
            align: 'center',
            width: 100
        }, {
            text: '组织机构',
            dataIndex: 'V_ORGANIZATIONAL',
            align: 'center',
            width: 100
        },{
            text: '联络程序及方式',
            dataIndex: 'V_PROGRAM',
            align: 'center',
            width: 200
        },{
            text: '工种及人数',
            dataIndex: 'V_WORK_TYPE',
            align: 'center',
            width: 200
        },{
            text: '设备及检修机具',
            dataIndex: 'V_TOOLS',
            align: 'center',
            width: 300
        },{
            text: '材料和备件',
            dataIndex: 'V_MATERIAL',
            align: 'center',
            width: 300
        }, {
             text: '抢修方案',
             dataIndex: 'V_PLAN',
             align: 'center',
             width: 200
         }, {
             text: '抢修预防',
             dataIndex: 'V_PREVENT',
             align: 'center',
             width: 200
         }
        ]
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
            items : [inputPanel ,buttonPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ faultItemPanel ]
        } ]
    });

    _init();


});

function _init() {
    if (orgLoad && zyqload ) {
        _seltctFault();
        _selectNextSprStore()
        Ext.getBody().unmask();


    }
}

function _init2() {
    if (orgLoad2 && equFaultLoad2 && init) {
        init = false;
    }
}


function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore.currentPage = 1;
    deptStore.load();
}

// 审批人
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'FaultYn',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: V_V_PERSONCODE,
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}


function _seltctFault() {
    var faultItemStore = Ext.data.StoreManager.lookup('faultItemStore');

    faultItemStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getSubmitValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getSubmitValue()

    };

    // faultItemStore.currentPage = 1;
    faultItemStore.load();
}


function _downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + ',' + metaData.data.V_FILENAME + '\')">' + a + '</a>';
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function onDownload(fileguid) {
    // alert(fileguid)
    var guid = fileguid.substring(0,36);
    var fujianname = fileguid.substring(37 );
    //alert(guid);
    //console.log(Ext.getCmp("V_V_GUID").getValue())
    //alert(fujianname)
    var form = Ext.getCmp('addPanel');



    location.href = AppUrl+"qk/downloadFile?V_V_FILEGUID="+guid+"&V_V_FILENAME="+fujianname;//下载页面弹窗
//123123


}

function onDel(fileguid) {

    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_V_GUID);
                filequery2(V_V_GUID);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}

function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function filequery2(guid) {
    Ext.data.StoreManager.lookup('fileGridStore2').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function _hideFault() {
    Ext.getCmp('addFaultWindow').close();
}

function _hideFault2() {
    Ext.getCmp('updateFaultWindow').close();
}



function _preUpdateFault() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length != 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

   if(records[0].get('V_STAUTS')=='0'){//||records[0].get('V_STAUTS')=='10'
       _updateOpen(records[0].get('V_GUID'));
    }else{
        Ext.MessageBox.show({
            title: '提示',
            msg: '所选预案不能修改',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    }


}

function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}



function _preViewProcess(value) {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetInstanceFromBusinessId',
        methon:'POST',
        async:false,
        params:{
            businessKey: value
        },
        success:function (resp) {
            var res=Ext.decode(resp.responseText);
            if (res.InstanceId != "" && res.InstanceId != null) {
                var owidth = window.screen.availWidth;
                var oheight = window.screen.availHeight - 50;
                window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
                    + res.InstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
            }else{
                Ext.Msg.alert('提示', '没有查到对应流程');
            }
        }
    });

}

function _updateOpen(value) {

    if(Ext.getCmp('V_V_DEPTCODE').getValue()=='%'){
        alert("请选择作业区！")
        return;
    }
    var owidth = window.screen.availWidth-200;
    var oheight = window.screen.availHeight-150;
    window.open(AppUrl + 'page/FAULT_GZ/update.html?V_V_GUID=' + value,'', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes,autoScroll=true');
}

//上报
function OnButtonUp() {

    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请至少选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    Ext.MessageBox.show({
        title: '确认',
        msg: '请确认是否上报！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {

                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    var vguid=records[i].get('V_GUID');
                    var vfaultxx=records[i].get('V_PLAN');
                    var vfaultid=records[i].get('V_FAULTYNID');
                    // Ext.getBody().mask('<p>上报中...请稍候</p>');
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark","flow_code", "flow_yj", "flow_type"],
                            parVal: [V_V_PERSONCODE, vguid, Ext.getCmp('nextPer').getValue(),
                                "请审批!", vfaultxx, vfaultid, "请审批！", "FaultYn"],
                            processKey: processKey,
                            businessKey: vguid,
                            V_STEPCODE: 'Start',
                            V_STEPNAME: V_STEPNAME,
                            V_IDEA: '请审批！',
                            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                            V_INPER: Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            if (Ext.decode(response.responseText).ret == 'OK') {
                                Ext.Ajax.request({
                                    url: AppUrl + 'cxy/PM_FAULT_PLAN_UP',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_PERCODE': V_V_PERSONCODE,
                                        'V_V_GUID': vguid
                                    },
                                    success: function (response) {
                                        var resp = Ext.decode(response.responseText);
                                        if (resp.RET == 'success') {//成功，会传回true
                                            i_err++;
                                            if (i_err == records.length) {
                                                // Ext.getBody().unmask();
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: '上报成功!',
                                                    buttons: Ext.MessageBox.OK,
                                                    fn: function () {
                                                        _seltctFault();
                                                    }
                                                });
                                            }
                                        } else {
                                            // Ext.getBody().unmask();
                                            Ext.MessageBox.show({
                                                title: '错误',
                                                msg: resp.RET,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR,
                                                fn: function () {
                                                    _seltctFault();
                                                }
                                            });
                                        }

                                    },
                                    failure: function (response) {
                                        // Ext.getBody().unmask();
                                        Ext.MessageBox.show({
                                            title: '错误',
                                            msg: response.responseText,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                });

                            } else if (Ext.decode(response.responseText).ret == 'ERROR') {
                                // Ext.getBody().unmask();
                                Ext.Msg.alert('提示', Ext.decode(response.responseText).msg);
                            }
                        }
                    });



                }
            }
        }
    });


}
function OnButtonPrint() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if (records.length > 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '只能选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var owidth = window.screen.availWidth-200;
    var oheight = window.screen.availHeight - 150;
    selectID = [];
    selectID.push(records[0].get('V_GUID'));
    window.open(AppUrl + 'page/FAULT_GZ/print.html', 'selectID', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}