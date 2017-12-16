var initLoad = true;
var ckStoreLoad = false;
var V_GUID = "" ;
var V_V_GUID_COPY = '';
var dt = new Date();
var date = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if(i<10)
    {
        months.push({displayField: '0'+i, valueField: '0'+i});
    }else{
        months.push({displayField: i, valueField: i});
    }

}


var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
var STATEDATA = [{ displayField: '全部', valueField: '%' },{ displayField: '已整改', valueField: '已整改' },{ displayField: '未整改', valueField: '未整改' }
    ,{ displayField: '未反馈', valueField: '未反馈' }];
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
        proxy:{
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
            extraParams: {
                IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
               Ext.getCmp('ck').select(Ext.util.Cookies.get('v_orgCode'));
                ckStoreLoad = true;
                _init();
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
                Ext.getCmp('zyq').select(store.first());
            }
        }
    });

    var stateStore = Ext.create("Ext.data.Store", {
        storeId: 'stateStore',
        fields: ['displayField', 'valueField'],
        data: STATEDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['CONSUME_ID','BILLCODE', 'ORDERID', 'INST_EQUIP_CODE', 'INST_EQUIP_NAME', 'OIL_MAT_NO', 'OIL_MAT_DESC', 'OIL_UNIT', 'OIL_AMOUNT', 'OIL_PRICE', 'OIL_REMARK'],
        proxy: {
            url: AppUrl + 'hp/GET_WAITOILCONSUMELIST',
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
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'combo',
            id: 'nf',
            fieldLabel: '年份',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            displayField: 'displayField',
            valueField: 'valueField',
            value: date.getFullYear(),
            store: yearStore,
            labelAlign: 'right',
            queryMode: 'local'
        },
            {
                xtype: 'combo',
                id: 'yf',
                fieldLabel: '月份',
                editable: false,
                margin: '5 0 5 5',
                labelAlign: 'right',
                labelWidth: 80,
                width: 250,
                displayField: 'displayField',
                valueField: 'valueField',
                value: date.getMonth() + 1,
                store: monthStore,
                queryMode: 'local'
            },{
            xtype: 'combo',
            id: 'ck',
            store: ckstore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '厂矿名称',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            },
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbtype();
                }
            }
        },{
            id: 'fxjh',
            xtype: 'textfield',
            fieldLabel: '放行计划',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'gc',
            xtype: 'textfield',
            fieldLabel: '工程',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px',
            width : 70
        },
        items : [{
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _selectWaitoilconsumelist
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id : 'gridPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '放行计划',
            dataIndex: 'ORDERID',
            align: 'center',
            width : 120/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            return value.substring(0,10);
                  }*/
        }, {
            text : '工程名称',
            dataIndex : 'BILLCODE',
            align : 'center',
            width : 200
        },{
            text : '工作内容',
            dataIndex : 'INST_EQUIP_CODE',
            align : 'center',
            width : 200
        },{
            text : '机具配备',
            dataIndex : 'INST_EQUIP_NAME',
            align : 'center',
            width : 200
        },{
            text : '工时',
            dataIndex : 'OIL_MAT_NO',
            align : 'center',
            width : 300
        },{
            text : '总工时',
            dataIndex : 'OIL_MAT_DESC',
            align : 'center',
            width : 100
        },{
            text : '计量单位',
            dataIndex : 'OIL_UNIT',
            align : 'center',
            width : 100
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
            items : [ editPanel ]
        }, {
            region : 'north',
            border : false,
            items : [ buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ gridPanel ]
        } ]
    });

    _init()
})

function _init()
{
        if(ckStoreLoad && initLoad)
        {
            initLoad = false;
            if(Ext.util.Cookies.get('v_deptcode').substring(4,6) == '01'){
                var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
                zyqstore.proxy.extraParams = {
                    IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    IS_V_DEPTTYPE: '[主体作业区]'
                };
                //matGroupSecondStore.currentPage = 1;
                zyqstore.load();
            }else{
                var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
                zyqstore.proxy.extraParams = {
                    IS_V_DEPTCODE:  Ext.util.Cookies.get('v_deptcode'),
                    IS_V_DEPTTYPE: '[主体作业区]'
                };
                //matGroupSecondStore.currentPage = 1;
                zyqstore.load();
            }
            Ext.getBody().unmask();//去除页面笼罩
        }
}

function _selectWaitoilconsumelist() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        A_PLANTCODE:  Ext.getCmp('ck').getValue(),
        A_DEPARTCODE: Ext.getCmp('zyq').getValue(),
        A_EQUIP_ID:  Ext.getCmp('sbtype').getValue(),
        A_ORDERID:Ext.getCmp('jxgd').getValue(),
        A_BILLCODE : Ext.getCmp('ckd').getValue(),
        A_MAT_DESC : Ext.getCmp('wzmc').getValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function realistic(CONSUME_ID,INST_EQUIP_CODE)
{
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_10030101/index.html?CONSUME_ID='+CONSUME_ID + '&INST_EQUIP_CODE='+ INST_EQUIP_CODE, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}

function dailyRemarks(CONSUME_ID,INST_EQUIP_CODE)
{
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_10030102/index.html?CONSUME_ID='+CONSUME_ID+ '&INST_EQUIP_CODE='+ INST_EQUIP_CODE, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
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

function OnButtonAddClicked() {
    var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_130201/index.html?V_V_GUID='+V_V_GUID, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

}

function _preUpdateExamined() {
    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要修改的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    var V_V_GUID = records[0].get('V_GUID');
    var owidth = 730;
    var oheight = 700;
    var ret = window.open(AppUrl + 'page/PM_130202/index.html?V_V_GUID='+V_V_GUID, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

}

function _copy()
{
    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要复制的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    V_V_GUID_COPY = Ext.data.IdGenerator.get('uuid').generate();

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID_COPY,
            V_V_DATE: records[0].get('V_DATE').substring(0,10),
            V_V_BEEXAMINED_DEPT: records[0].get('V_BEEXAMINED_DEPT'),
            V_V_BEEXAMINED_CLASS: records[0].get('V_BEEXAMINED_CLASS'),
            V_V_JCBW: records[0].get('V_JCBW'),
            V_V_CZWT: records[0].get('V_CZWT'),
            V_V_ZGCS: records[0].get('V_ZGCS'),
            V_V_KHYJ: records[0].get('V_KHYJ'),
            V_V_KHFS: records[0].get('V_KHFS'),
            V_V_KKJE: records[0].get('V_KKJE'),
            V_V_DEPTCODE: records[0].get('V_DEPTCODE'),
            V_V_TYPE :  records[0].get('V_TYPE'),
            V_V_BEEXAMINED_TYPE: records[0].get('V_BEEXAMINED_TYPE'),
            V_V_YQZGSJ: records[0].get('V_YQZGSJ').substring(0,10),
            V_V_TBSJ: records[0].get('V_TBSJ').substring(0,10),
            V_V_TB_PER: records[0].get('V_TB_PER'),
            V_V_STATE:records[0].get('V_STATE')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='成功') {//成功，会传回true
                    Ext.MessageBox.alert('提示', '操作成功', callBack);
                    function callBack(id)
                    {
                        _selectExamined();
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

function _delete() {
    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择要删除的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    };


    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err=0;
                for(var i=0;i<records.length;i++){
                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PM_13_EXAMINED_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_GUID: records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                i_err++;
                                if(i_err==records.length){
                                    for (var j = 0; j < records.length; j++) {
                                        Ext.data.StoreManager.lookup('gridStore').remove(records[j]);//把这条数据，从页面数据集中移除，现实动态更新页面
                                    }
                                }
                                //top.banner.Ext.example.msg('操作信息', '操作成功');//提示信息
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
        }
    });

}