var ORGCODE = Ext.util.Cookies.get('v_orgCode');
var ORGNAME = Ext.util.Cookies.get('v_orgname2');
var DEPTNAME = Ext.util.Cookies.get('v_deptname2');
var DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var PRESONNAME = Ext.util.Cookies.get('v_personname2');
var PERSONCODE = Ext.util.Cookies.get('v_personcode');

var code = '';
var unicode = '';
var ckStoreLoad = false;
var baseInfoStoreLoad = false;

if (location.href.split('?')[1] != null) {
    var APPLY_ID = Ext.urlDecode(location.href.split('?')[1]).apply_id;

}
Ext.onReady(function () {

    Ext.getBody().mask('<p>正在载入中...</p>');

    //接收厂矿
    var ckStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ401_MENDPLANT',
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
                Ext.getCmp('APPLY_PLANT').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });

    //接收默认数据
    var baseInfoStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'baseInfoStore',
        fields: ['APPLY_ID', 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'DJ_CODE', 'MEND_CONTEXT', 'PLAN_BEGINDATE', 'PLAN_ENDDATE', 'REMARK',
            'REC_PLANT', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ401_APPLYMES',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'APPLYID_IN': APPLY_ID
            }

        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ORDERID').setValue(records[0].data.ORDERID);
                Ext.getCmp('DJ_CODE').setValue(records[0].data.DJ_CODE);
                Ext.getCmp('DJ_NAME').setValue(records[0].data.DJ_NAME);
                Ext.getCmp('DJ_UQ_CODE').setValue(records[0].data.DJ_UQ_CODE);
                Ext.getCmp('MEND_CONTEXT').setValue(records[0].data.MEND_CONTEXT);
                var startD = records[0].data.PLAN_BEGINDATE.split(" ");//起始日期
                Ext.getCmp('PLAN_BEGINDATE').setValue(startD[0]);
                var startT = startD[1].split(":");
                Ext.getCmp('b-hour').setValue(startT[0]);
                Ext.getCmp('b-mm').setValue(startT[1]);
                var endD = records[0].data.PLAN_ENDDATE.split(" ");//结束日期
                Ext.getCmp('PLAN_ENDDATE').setValue(endD[0]);
                var endT = endD[1].split(":");
                Ext.getCmp('e-hour').setValue(endT[0]);
                Ext.getCmp('e-mm').setValue(endT[1]);
                Ext.getCmp('APPLY_PLANT').setValue(records[0].data.REC_PLANT);
                Ext.getCmp('MENDTYPE').setValue(records[0].data.MEND_TYPE);

                //   Ext.getCmp('PLAN_BEGINDATE').setValue(records[0].data.PLAN_BEGINDATE);
                //   Ext.getCmp('PLAN_ENDDATE').setValue(records[0].data.PLAN_ENDDATE);
                Ext.getCmp('REMARK').setValue(records[0].data.REMARK);

                baseInfoStoreLoad = true;
                _init();

            }
        }
    });

    //维修类别Store
    var mendTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'mendTypeStore',
        pageSize: 100,
        fields: ['MENDTYPE', 'MENDTYPE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ102_MENDTYPE_ABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },

            extraParams: {}
        }

    });

    //查找电机Store
    var selectDJStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'selectDJStore',
        pageSize: 100,
        fields: ['DJ_UNIQUE_CODE', 'DJ_NAME', 'DJ_TYPE', 'DJ_SERIES_CLASS',
            'DJ_VOL', 'DJ_V', 'DJ_CS', 'DJ_DXTYPE', 'DJ_WEIGHT', 'DJ_CS_DZ',
            'DJ_CS_ZZ', 'WORK_STATUS', 'PLANTCODE', 'PLANTNAME', 'DEPARTCODE',
            'DEPARTNAME', 'LOC_PLANTCODE', 'LOC_PLANTNAME', 'DJ_LOC', 'REMARK',
            'INSERTDATE', 'DZ_V', 'DZ_A', 'ZZ_V', 'ZZ_A', 'W_YINSHU', 'EDZS',
            'JXFS', 'JYDJ', 'SUPPLY_CODE', 'SUPPLY_NAME', 'PRODUCE_DATE',
            'DJ_CODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ201_DJMAINLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'PLANTCODE_IN': '%',
                'LOC_PLANTCODE_IN': '%',
                'DJ_SERIES_CLASS_IN': '%',
                'DJ_LOC_IN': '%',
                'WORK_STATUS_IN': '%',
                'DJ_NAME_IN': '%',
                'DJ_UNIQUE_CODE_IN': '%',
                'DJ_TYPE_IN': '%',
                'DJ_VOL_IN': '%'

            }
        }
    });

    //附带物料Store
    var fdwlStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'fdwlStore',
        pageSize: 100,
        fields: ['ID', 'APPLY_ID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT', 'AMOUNT',
            'F_PRICE', 'KC_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ401_APPLYMATLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {
                'APPLYID_IN': APPLY_ID
            }

        }
    });

    //条件面板
    var typePanel = Ext.create('Ext.panel.Panel', {
        id: 'typePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'plant',
                xtype: 'textfield',
                fieldLabel: '厂矿',
                readOnly: true,
                value: ORGNAME,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                id: 'dept',
                xtype: 'textfield',
                fieldLabel: '部门',
                readOnly: true,
                value: DEPTNAME,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                id: 'personnel',
                xtype: 'textfield',
                fieldLabel: '录入人',
                readOnly: true,
                value: PRESONNAME,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ORDERID',
                xtype: 'textfield',
                fieldLabel: '工单号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                id: 'DJ_CODE',
                xtype: 'textfield',
                fieldLabel: '电机编号',
                labelWidth: 80,
                width: 190,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '选择',
                width: 55,
                margin: '5px 0px 0px 0px',
                handler: _selectDJ
            }, {
                id: 'DJ_NAME',
                xtype: 'textfield',
                fieldLabel: '电机名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 15px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'DJ_UQ_CODE',
                xtype: 'textfield',
                fieldLabel: '唯一编号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                id: 'MENDTYPE',
                xtype: 'combo',
                store: mendTypeStore,
                editable: false,
                fieldLabel: '维修类别',
                labelWidth: 80,
                width: 190,
                displayField: 'MENDTYPE_DESC',
                valueField: 'MENDTYPE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '详细',
                width: 55,
                style: ' margin: 5px 0px 5px 5px',
                handler: _Detail
            }]
        },
            {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'MEND_CONTEXT',
                    xtype: 'textarea',
                    fieldLabel: '检修内容',
                    colspan: 4,
                    width: 780,
                    labelWidth: 80,

                    style: ' margin: 5px 5px 0px 10px',
                    labelAlign: 'right'
                }]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        width: 350,
                        border: 0,
                        bodyStyle: 'background:none',
                        layout: 'column',
                        items: [{
                            id: 'PLAN_BEGINDATE',
                            xtype: 'datefield',
                            fieldLabel: '计划开始时间',
                            format: 'Y-m-d',
                            labelWidth: 80,
                            width: 190,
                            value: new Date(),
                            style: ' margin: 5px 5px 0px 10px',
                            labelAlign: 'right'
                        },
                            {
                                xtype: 'numberfield',
                                id: 'b-hour',
                                fieldLabel: '',
                                minValue: 0,
                                maxValue: 24,
                                width: 50,
                                value: 00,

                                style: ' margin: 5px 5px 0px 0px'
                            }, {
                                xtype: 'numberfield',
                                id: 'b-mm',
                                fieldLabel: '',
                                minValue: 0,
                                maxValue: 60,
                                width: 50,
                                value: 00,
                                style: ' margin: 5px 5px 0px 0px'
                            }]
                    },

                    {
                        width: 350,
                        border: 0,
                        bodyStyle: 'background:none',
                        layout: 'column',
                        items: [{
                            id: 'PLAN_ENDDATE',
                            xtype: 'datefield',
                            fieldLabel: '计划完成时间',
                            format: 'Y-m-d',
                            labelWidth: 80,
                            width: 190,
                            value: new Date(),

                            style: ' margin: 5px 5px 0px 10px',
                            labelAlign: 'right'
                        },

                            {
                                xtype: 'numberfield',
                                id: 'e-hour',
                                fieldLabel: '',
                                minValue: 0,
                                maxValue: 24,
                                width: 50,
                                value: 00,
                                style: ' margin: 5px 5px 0px 0px'
                            }, {
                                xtype: 'numberfield',
                                id: 'e-mm',
                                fieldLabel: '',
                                minValue: 0,
                                maxValue: 60,
                                width: 50,
                                value: 00,
                                style: ' margin: 5px 5px 0px 0px'
                            }]
                    },

                    {
                        id: 'APPLY_PLANT',
                        xtype: 'combo',
                        store: ckStore,
                        editable: false,
                        fieldLabel: '接收厂矿',
                        labelWidth: 60,
                        width: 220,
                        displayField: 'MENDDEPT_NAME',
                        valueField: 'MENDDEPT_CODE',
                        queryMode: 'local',
                        style: ' margin: 5px 0px 5px 0px',
                        labelAlign: 'right'
                    }]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'REMARK',
                    xtype: 'textarea',
                    fieldLabel: '备注说明',
                    colspan: 4,
                    width: 780,
                    labelWidth: 80,
                    style: ' margin: 5px 5px 0px 10px',
                    labelAlign: 'right'
                }]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [

                    {
                        xtype: 'button',
                        text: '保存工单申请',
                        id: 'save',
                        margin: '5px 0px 5px 95px',
                        icon: imgpath + '/filesave.png',
                        handler: _save
                    }]
            }]
    });

    //选择电机grid
    var selectDJPanel = Ext.create('Ext.grid.Panel', {
        id: 'selectDJPanel',
        //bodyStyle: 'overflow-x:hidden;overflow-y:scroll',
        store: selectDJStore,
        border: false,
        frame: true,
        autoscroll: true,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '选择',
            id: 'select',
            dataIndex: 'DJ_UNIQUE_CODE',
            align: 'center',
            flex: 1.5
        }, {
            text: '电机编号',
            dataIndex: 'DJ_CODE',
            align: 'center',
            flex: 1.5

        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 180,
            flex: 1.5
        }],
        listeners: {
            itemclick: function (store, records) {
                Ext.getCmp('selectWindow').close();
                Ext.getCmp('DJ_CODE').setValue(records.data.DJ_CODE);

                Ext.getCmp('DJ_UQ_CODE').setValue(records.data.DJ_UNIQUE_CODE);
                Ext.getCmp('DJ_NAME').setValue(records.data.DJ_NAME);
            }
        }
    });

    //附带物料列表grid
    var fdwlGrid = Ext.create('Ext.grid.Panel', {
        id: 'fdwlGrid',
        //bodyStyle: 'overflow-x:hidden;overflow-y:scroll',
        title: '<div align="center"> 附带物料表</div>',
        store: fdwlStore,
        border: false,
        frame: true,
        autoscroll: true,
        columnLines: true,
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            align: 'center',
            width: 80
        }, {
            text: '物料编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 130,
            renderer: atright
        },
            {
                text: '物料名称',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 130,
                renderer:atleft
            },
            {
                text: '规格型号',
                dataIndex: 'ETALON',
                align: 'center',
                width: 130,
                renderer: atleft
            },
            {
                text: '材质',
                dataIndex: 'MAT_CL',
                align: 'center',
                width: 130,
                renderer:atleft
            },
            {
                text: '计量单位',
                dataIndex: 'UNIT',
                align: 'center',
                width: 130,
                renderer: atleft
            },
            {
                text: '单价',
                dataIndex: 'F_PRICE',
                align: 'center',
                width: 130,
                renderer: atright
            },
            {
                text: '数量',
                dataIndex: 'AMOUNT',
                align: 'center',
                width: 130,
                renderer: atright
            },
            {
                text: '删除',
                id: 'delete',
                align: 'center',
                width: 80,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href="#" onclick="_delete(\'' + record.data.ID + '\')">' + '删除' + '</a>';
                }
            }

        ],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: fdwlStore
        }]
    });


    //弹出框容器
    var selectWindow = Ext.create('Ext.window.Window', {
        id: 'selectWindow',
        title: '<div align="center"> 选择电机</div>',
        width: 400,
        height: 300,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [selectDJPanel]
        }]
    });


    //整体视图容器
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
            items: [typePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [fdwlGrid]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (ckStoreLoad && baseInfoStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩

    }


}

//选择电机
function _selectDJ() {
    Ext.getCmp('selectWindow').show();
}

//保存工单
function _save() {
    var flag = true;
    if (Ext.getCmp('ORDERID').getValue() == "") {
        Ext.Msg.alert('操作信息', "工单号不能为空");
        flag = false;
    }
    if (Ext.getCmp('DJ_CODE').getValue() == "") {
        Ext.Msg.alert('操作信息', "电机编号不能为空");
        flag = false;
    }
    if (Ext.getCmp('DJ_NAME').getValue() == "") {
        Ext.Msg.alert('操作信息', "电机名称不能为空");
        flag = false;
    }
    if (Ext.getCmp('DJ_UQ_CODE').getValue() == "") {
        Ext.Msg.alert('操作信息', "电机唯一编号不能为空");
        flag = false;
    }
    if (Ext.getCmp('MEND_CONTEXT').getValue() == "" || Ext.getCmp('MEND_CONTEXT').getValue().length < 5) {
        Ext.Msg.alert('操作信息', "检修内容不能为空且不能少于5个字");
        flag = false;
    }
    if (flag) {

        var hour1 = Ext.getCmp('b-hour').getValue();
        if (hour1.length < 2 || hour1 < 10) {
            hour1 = "0" + hour1;
        }

        var mm1 = Ext.getCmp('b-mm').getValue();
        if (mm1.length < 2 || hour1 < 10) {
            mm1 = "0" + mm1;
        }
        var hour2 = Ext.getCmp('e-hour').getValue();
        if (hour2.length < 2 || hour2 < 10) {
            hour2 = "0" + hour2;
        }

        var mm2 = Ext.getCmp('e-mm').getValue();
        if (mm2.length < 2 || hour2 < 10) {
            mm2 = "0" + mm2;
        }

        var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE')
                .getValue(), 'Y-m-d')
            + " " + hour1 + ":" + mm1 + ":00";
        var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE')
                .getValue(), 'Y-m-d')
            + " " + hour2 + ":" + mm2 + ":00";


        Ext.Ajax.request({
            url: AppUrl + 'ml/PRO_DJ401_APPLYUPDATE',
            type: 'ajax',
            method: 'POST',
            params: {
                'APPLYID_IN': APPLY_ID,
                'PLANTCODE_IN': ORGCODE,
                'PLANTNAME_IN': ORGNAME,
                'DEPARTCODE_IN': DEPTCODE,
                'DEPARTNAME_IN': DEPTNAME,
                'USERCODE_IN': PERSONCODE,
                'USERNAME_IN': PRESONNAME,
                'BILLCODE_IN': Ext.getCmp('ORDERID').getValue(),
                'DJ_UQ_CODE_IN': Ext.getCmp('DJ_UQ_CODE').getValue(),
                'DJNAME_IN': Ext.getCmp('DJ_NAME').getValue(),
                'CONTEXT_IN': Ext.getCmp('MEND_CONTEXT').getValue(),
                'BEGINDATE_IN': Ext.util.Format.date(start, 'Y-m-d H:i:s'),
                'ENDDATE_IN': Ext.util.Format.date(end, 'Y-m-d H:i:s'),
                'REMARK_IN': Ext.getCmp('REMARK').getValue(),
                'DJCODE_IN': Ext.getCmp('DJ_CODE').getValue(),
                'MEND_TYPE_IN': Ext.getCmp('MENDTYPE').getValue()

            },

            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET=="Success") {//成功，会传回true
                    //Ext.data.StoreManager.lookup('fdwlStore').remove();//把这条数据，从页面数据集中移除，现实动态更新页面
                    window.returnValue = "success";
                    //window.close();

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: '操作失败',
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
}


//删除附带物料
function _delete(ID) {
    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ401_DELETEAPPLYMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ID_IN': ID
        },

        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                //Ext.data.StoreManager.lookup('fdwlStore').remove();//把这条数据，从页面数据集中移除，现实动态更新页面
                Ext.data.StoreManager.lookup('fdwlStore').load();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '操作失败',
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

function _Detail() {
    var str = window.open(AppUrl + 'page/PM_1501020201/index.html?djcode=' + Ext.getCmp('DJ_UQ_CODE').getValue(), '', "dialogHeight:350px;dialogWidth:900px;minimize:yes;maximize:yes;");
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
