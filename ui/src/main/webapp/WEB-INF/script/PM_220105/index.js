var gengxin = "";
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
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                //ckstoreload = true;
                //_init();
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
                //alert(0.5);
                Ext.getCmp('zyq').select(store.first());
                //zyqstoreload = true;
                //_init();
            }
        }
    });


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
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_VIEW',
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
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 30,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 180,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _ck_zyqload();
                    // _spload();
                    // zyq_jxdwload();

                }
            }
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 40,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            labelAlign: 'right',
            style: ' margin: 5px 0px 0px 2px',
            width: 190,
            listeners: {
                select: function (field, newValue, oldValue) {
                    //_ck_zyqfzrload();
                    //zyq_jxdwload();
                    //_spload();
                }
            }

        },{
            id: 'begintime',
            xtype: 'datefield',
            fieldLabel: '申请日期',
            format: 'Y-m-d',
            editable: false,
            labelWidth: 55,
            queryMode: 'local',
            value: new Date(new Date()-7*24*60*60*1000),
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 180
        }, {
            id: 'endtime',
            xtype: 'datefield',
            fieldLabel: '至',
            format: 'Y-m-d',
            editable: false,
            labelWidth: 20,
            queryMode: 'local',
            value: mingtian,
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            labelAlign: 'right',
            width: 140/*,
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
            labelWidth: 30,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 140,
            labelAlign: 'right'
        }, {
            id: 'qxcontent',
            xtype: 'textfield',
            fieldLabel: '缺陷内容',
            editable: false,
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid,
            style: 'margin: 5px 0px 10px 2px'
        }, {
            xtype: 'button',
            text: '关联放行计划',
            //icon: imgpath + '/add.png',
            handler: _fangxingjihua,
            style: 'margin: 5px 0px 10px 2px'
        },{
            xtype: 'button',
            text: '导出excel',
            icon: imgpath + '/excel.gif',
            width: 100,
            style: 'margin: 5px 0px 10px 2px',
            listeners: {
                click: ExcelButton
            }
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
        columns: [ {
            text: '放行工程编码',
            dataIndex: 'V_PROJECTCODE_GS',
            align: 'center',
            flex: 1
        }, {
            text: '放行建设单位',
            dataIndex: 'V_REPAIRDEPT_GS',
            align: 'center',
            flex: 1
        }, {
            text: '放行计划金额',
            dataIndex: 'F_MONEY_GS',
            align: 'center',
            flex: 1
        }, {
            text: '申请日期',
            dataIndex: 'D_DATE',
            align: 'center',
            flex: 1
        },{
            text: '项目编号',
            dataIndex: 'V_PROJECTCODE',
            align: 'center',
            flex: 1
        },{
            text: '项目名称',
            dataIndex: 'V_PROJECTNAME',
            align: 'center',
            flex: 1
        },{
            text: '缺陷内容',
            dataIndex: 'V_DEFECT',
            align: 'center',
            flex: 1
        },{
            text: '计划施工日期',
            dataIndex: 'V_PLANDATE',
            align: 'center',
            flex: 1
        },{
            text: '专业',
            dataIndex: 'V_SPECIALTY',
            align: 'center',
            flex: 0.5
        },{
            text: '工程总概算(万元)',
            dataIndex: 'F_MONEYUP',
            align: 'center',
            flex: 1
        },{
            text: '工程总预算(万元)',
            dataIndex: 'F_MONEYBUDGET',
            align: 'center',
            flex: 1
        },{
            text: '检修单位',
            dataIndex: 'V_REPAIRDEPT',
            align: 'center',
            flex: 0.75
        },{
            text: '是否特殊抢修',
            dataIndex: 'I_RUSHTO',
            align: 'center',
            flex: 1
        },{
            text: '录入人',
            dataIndex: 'V_INMAN',
            align: 'center',
            flex: 1
        },{
            text: '申请厂矿',
            dataIndex: 'V_ORGNAME',
            align: 'center',
            flex: 1
        },{
            text: '申请作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            flex: 1
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
});

function ExcelButton() {
    var V_V_IP = '';
    var V_V_FLAG = '审批通过';
    document.location.href=AppUrl + 'excel/FXJH_EXCEL?V_V_IP='+V_V_IP+
        '&V_V_PERCODE='+Ext.util.Cookies.get('v_personcode')
       + '&V_V_ORGCODE='+Ext.getCmp("ck").getValue()
       + '&V_V_DEPTCODE='+Ext.getCmp("zyq").getValue()
       + '&V_D_INDATE_B='+Ext.getCmp("begintime").getSubmitValue()
       + '&V_D_INDATE_E='+Ext.getCmp("endtime").getSubmitValue()
       + '&V_V_SPECIALTY='+ Ext.getCmp('zy').getValue()
       + '&V_V_DEFECT='+ Ext.getCmp('qxcontent').getValue()
       + '&V_V_FLAG='+ V_V_FLAG;
}

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_IP :"",
        V_V_PERCODE :Ext.util.Cookies.get('v_personcode') ,
        V_V_ORGCODE : Ext.getCmp("ck").getValue(),
        V_V_DEPTCODE : Ext.getCmp("zyq").getValue(),
        V_D_INDATE_B : Ext.getCmp("begintime").getSubmitValue(),
        V_D_INDATE_E : Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY : Ext.getCmp('zy').getValue(),
        V_V_DEFECT :Ext.getCmp('qxcontent').getValue(),
        V_V_FLAG : '审批通过'

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _newapplication() {

    V_GUID = Ext.data.IdGenerator.get('uuid').generate();

    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
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

function _ck_zyqload() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _fangxingjihua()
{
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要关联的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    V_GUID =  records[0].get('V_GUID');
    //console.log(V_GUID);

    var owidth = window.document.body.offsetWidth ;
    var oheight = window.document.body.offsetHeight ;
    window.open(AppUrl + 'page/PM_22010501/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );


}

function shuaxin()
{
    queryGrid();
}

