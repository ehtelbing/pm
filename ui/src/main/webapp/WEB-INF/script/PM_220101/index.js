var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;

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
    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
                /* zyStoreload = true;
                 _init();*/
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 5,
        fields: ['I_ID', 'V_GUID','I_YEAR', 'I_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'D_DATE', 'V_PROJECTCODE',
            'V_PROJECTNAME', 'V_PLANDATE','V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTYMANCODE',
            'V_SPECIALTYMAN', 'F_MONEYUP', 'F_MONEYBUDGET', 'V_REPAIRDEPTTYPE', 'V_REPAIRDEPTCODE',
            'V_REPAIRDEPT', 'V_DEFECT','V_MEASURE', 'V_MONEY', 'V_INMAN',
            'V_INMANCODE', 'D_INDATE', 'I_STATE', 'V_FLAG', 'I_RUSHTO', 'V_PROJECTCODE_GS',
            'V_REPAIRDEPT_GS', 'F_MONEY_GS','D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_EDITVIEW',
            // url: 'PM_14_FAULT_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        })
    });

    var panel2 = Ext.create('Ext.Panel', {
        region: 'north',
        // height:70,
        width: '100%',
        //title: '查询条件',
        frame: true,
        layout: 'column',
        items: [{
            id: 'begintime',
            xtype: 'datefield',
            fieldLabel: '申请日期',
            editable: false,
            format: 'Y-m-d',
            labelWidth: 70,
            queryMode: 'local',
            value: new Date(new Date()-7*24*60*60*1000),
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 200
        }, {
            id: 'endtime',
            xtype: 'datefield',
            fieldLabel: '至',
            editable: false,
            format: 'Y-m-d',
            labelWidth: 20,
            queryMode: 'local',
            value: mingtian,
            editable: false,
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 200/*,
             listeners: {
             change: function (field, newValue, oldValue) {
             _selectSbThird();
             }
             }*/
        }, {
            id: 'zy',
            xtype: 'combo',
            store: zystore,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 40,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            width: 200,
            labelAlign: 'right'
        }, {
            id: 'qxcontent',
            xtype: 'textfield',
            fieldLabel: '缺陷内容',
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            style: ' margin: 5px 0px 0px 0px',
            width: 200,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid,
            style: 'margin: 5px 0px 0px 10px'
        }, {
            xtype: 'button',
            text: '新增申请',
            icon: imgpath + '/add.png',
            handler: _newapplication,
            style: 'margin: 5px 0px 0px 10px'
        }, {
            xtype: 'button',
            text: '继续编辑',
            icon: imgpath + '/edit.png',
             handler: _preUpdateModel,
             style: 'margin: 5px 0px 0px 10px'
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            handler: _delete,
            style: 'margin: 5px 0px 0px 10px'
        }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        //title: '计划模型',
        height: '50%',
        width: '100%',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '申请日期',
            dataIndex: 'D_DATE',
            align: 'center',
            width:200,
            renderer: applicationDate
        }, {
            text: '项目编号',
            dataIndex: 'V_PROJECTCODE',
            align: 'center',
            width:150
        }, {
            text: '项目名称',
            dataIndex: 'V_PROJECTNAME',
            align: 'center',
            width:300
        }, {
            text: '缺陷内容',
            dataIndex: 'V_DEFECT',
            align: 'center',
            width:100
        },{
            text: '计划施工日期',
            dataIndex: 'V_PLANDATE',
            align: 'center',
            width:100
        },{
            text: '专业',
            dataIndex: 'V_SPECIALTY',
            align: 'center',
            width:100
        },{
            text: '工程总概算(万元)',
            dataIndex: 'F_MONEYUP',
            align: 'center',
            width:150
        },{
            text: '工程总预算(万元)',
            dataIndex: 'F_MONEYBUDGET',
            align: 'center',
            width:150
        },{
            text: '是否外委(是/否)',
            dataIndex: 'V_REPAIRDEPTTYPE',
            align: 'center',
            width:150
        },{
            text: '检修单位',
            dataIndex: 'V_REPAIRDEPT',
            align: 'center',
            width:250
        },{
            text: '是否特殊抢修',
            dataIndex: 'I_RUSHTO',
            align: 'center',
            width:100
        },{
            text: '录入人',
            dataIndex: 'V_INMAN',
            align: 'center',
            width:100
        },{
            text: '申请厂矿',
            dataIndex: 'V_ORGNAME',
            align: 'center',
            width:200
        },{
            text: '申请作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width:200
        }]/*,
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }],*/
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid]
    });
})

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_IP :"",
        V_V_PERCODE :Ext.util.Cookies.get('v_personcode') ,
        V_D_INDATE_B : Ext.getCmp("begintime").getSubmitValue(),
        V_D_INDATE_E : Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY : Ext.getCmp('zy').getValue(),
        V_V_DEFECT :Ext.getCmp('qxcontent').getValue(),

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _newapplication() {

    V_GUID = Ext.data.IdGenerator.get('uuid').generate();

    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + 'page/PM_22010101/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    // var matStockLevel = window.showModalDialog(AppUrl + 'page/PM_140701/index.html?IN_DEPARTCODE=' + Ext.getCmp("zyq").getValue() + '&V_V_GUID=' + records[0].get("V_GUID") + '&random=' + Math.random(), window, 'resizable=yes;  dialogWidth=1200px; dialogHeight=1000px');
    /*if (b) {
     _seltctFault();
     alert(b);
     Ext.example.msg('操作信息', '操作成功');

     //  Ext.data.StoreManager.lookup('faultItemStore').add(matStockLevel);
     //_seltctFault();
     }*/

}

function _preUpdateModel() {

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    V_GUID = records[0].get('V_GUID');
    //console.log(V_GUID);


    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_22010104/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    // var matStockLevel = window.showModalDialog(AppUrl + 'page/PM_140701/index.html?IN_DEPARTCODE=' + Ext.getCmp("zyq").getValue() + '&V_V_GUID=' + records[0].get("V_GUID") + '&random=' + Math.random(), window, 'resizable=yes;  dialogWidth=1200px; dialogHeight=1000px');
    /*if (b) {
     _seltctFault();
     alert(b);
     Ext.example.msg('操作信息', '操作成功');

     //  Ext.data.StoreManager.lookup('faultItemStore').add(matStockLevel);
     //_seltctFault();
     }*/

}

function _delete()
{
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    V_GUID = records[0].get('V_GUID');

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗亲？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_DEL',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_IP : "",
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_GUID: V_GUID
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.success) {//成功，会传回true
                            Ext.MessageBox.alert('提示', '删除成功', callBack);
                            function callBack(id) {
                                // alert('单击的按钮id是：'+id);
                                queryGrid();
                            }
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.message,
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
    });
}

function applicationDate(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<div data-qtip="' + value.substring(0,19) + '" style="text-align:center;" >' + value.substring(0,19)
        + '</div>';
}