var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var today = new Date();
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});
var months=[];
for (var i =1; i <=12; i++){
    if(i<10){
        months.push({ displayField: ("0"+""+ i), valueField: i });
    }else{
        months.push({ displayField: i, valueField: i });
    }

}
var V_GUID = "" ;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
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

    var yearStore = Ext.create('Ext.data.Store', {
        id: 'yearStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: Year,
        proxy: {
            type: 'memory',
            render: {
                type: 'json'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
            }
        }
    });

    var monthStore=Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField','valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
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
        fields: ['I_ID', 'V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_TYPE_CODE', 'V_TYPE_NAME', 'V_MAJOR_NAME', 'V_MAJOR_CODE', 'V_PROJECT_CODE',
            'V_PROJECT_NAME', 'V_WBS_CODE','V_WBS_NAME', 'V_CONTENT', 'V_BUDGET_MONEY',
            'V_REPAIR_DEPTCODE', 'V_REPAIR_DEPTNAME', 'V_FZR', 'V_DATE_B', 'V_DATE_E',
            'V_BZ', 'V_FLOW_STATE','V_INPERCODE', 'V_INPERNAME', 'V_INTIEM',
            'V_FALG', 'V_YEAR', 'V_MONTH', 'V_GUID','V_BUILD_DEPT'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_04_PROJECT_DATA_ITEM_N',
            // url: 'PRO_PM_04_PROJECT_DATA_ITEM_V',
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
            xtype: 'combo',
            id: 'jhyear',
            fieldLabel: '计划年月:',
            editable: false,
            style: ' margin: 5px 0px 0px 0px',
            labelWidth: 60,
            width: 150,
            displayField: 'displayField',
            valueField: 'valueField',
            value: today.getFullYear(),
            store: yearStore,
            queryMode: 'local',
            labelAlign: 'right'
        }, /*{
            xtype: 'combo',
            id: 'jhmonth',
            editable: false,
            style: ' margin: 5px 0px 0px 2px',
            //labelWidth: 40,
            width: 80,
            displayField: 'displayField',
            valueField: 'valueField',
            value: today.getMonth()+1,
            store: monthStore,
            queryMode: 'local'
        },*/{
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
            width: 180/*,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _ck_zyqload();
                    // _spload();
                    // zyq_jxdwload();

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
            id: 'gcbm',
            xtype: 'textfield',
            fieldLabel: '工程编码:',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            id: 'gcmc',
            xtype: 'textfield',
            fieldLabel: '工程名称:',
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            id: 'gcnr',
            xtype: 'textfield',
            fieldLabel: '工程内容',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            editable: false,
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
            style: 'margin: 5px 0px 0px 2px'
        }, {
            xtype: 'button',
            text: '确认选择',
            //icon: imgpath + '/add.png',
           handler: _querenxuanze,
            style: 'margin: 5px 0px 0px 2px'
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
            text: '专业',
            dataIndex: 'V_MAJOR_NAME',
            align: 'center',
            flex: 1
        }, {
            text: '工程项目编码',
            dataIndex: 'V_PROJECT_CODE',
            align: 'center',
            flex: 1
        }, {
            text: '工程项目名称',
            dataIndex: 'V_PROJECT_NAME',
            align: 'center',
            flex: 1
        }, {
            text: '年度投资（万元）',
            dataIndex: 'V_BUDGET_MONEY',
            align: 'center',
            flex: 1
        },{
            text: '项目编号',
            dataIndex: 'V_PROJECTCODE',
            align: 'center',
            flex: 1
        },{
            text: '工程主要内容',
            dataIndex: 'V_CONTENT',
            align: 'center',
            flex: 1
        },{
            text: 'WBS',
            dataIndex: 'V_WBS_CODE',
            align: 'center',
            flex: 1
        },{
            text: '开工时间',
            dataIndex: 'V_DATE_B',
            align: 'center',
            flex: 1
        },{
            text: '竣工时间',
            dataIndex: 'V_DATE_E',
            align: 'center',
            flex: 0.5
        },{
            text: '建设单位',
            dataIndex: 'V_REPAIR_DEPTCODE',
            align: 'center',
            flex: 1
        },{
            text: '建设单位工程负责人',
            dataIndex: 'V_FZR',
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
})

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_YEAR :Ext.getCmp("jhyear").getValue(),
        V_V_MONTH :'',//Ext.getCmp("jhmonth").getValue(),
        V_V_ORGCODE : Ext.getCmp("ck").getValue(),
        V_V_SPECIALTY : Ext.getCmp('zy').getValue(),
        V_V_PROJECT_CODE  : Ext.getCmp('gcbm').getValue(),
        V_V_PROJECT_NAME  : Ext.getCmp("gcmc").getValue(),
        V_V_CONTENT  : Ext.getCmp("gcnr").getValue(),
        V_V_BY1 : "",
        V_V_BY2 : ""

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

    var owidth = window.document.body.offsetWidth ;
    var oheight = window.document.body.offsetHeight ;
    window.open(AppUrl + 'page/PM_22010501/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );

}

function _querenxuanze()
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
    console.log(records[0].get('V_BUILD_DEPT'));

    Ext.Ajax.request({
        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_TOFXJH',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_IP :"",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_GUID: V_GUID,
            V_V_PROJECTCODE_GS  :records[0].get('V_PROJECT_CODE'),
            V_V_REPAIRDEPT_GS : records[0].get('V_REPAIR_DEPTCODE'),
            V_F_MONEY_GS :records[0].get('V_BUDGET_MONEY'),
            V_D_INDATE_GS : records[0].get('V_DATE_B').substring(0,10)

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true


                Ext.MessageBox.alert('提示', '关联成功', callBack);
                function callBack(id) {
                    // alert('单击的按钮id是：'+id);
                    //_spupdate();
                    window.opener.shuaxin();
                   //window.parent.shuaxin();
                    window.close();

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
