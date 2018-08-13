var V_GUID = "" ;
var V_V_GUID_COPY = '';
var dt = new Date();
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
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var yearsStore = Ext.create("Ext.data.Store", {
        storeId: 'yearsStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var monthsStore = Ext.create("Ext.data.Store", {
        storeId: 'monthsStore',
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
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
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_GUID', 'V_DATE', 'V_ORGCODE',
            'V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_TYPE','V_BEEXAMINED_ORG','V_BEEXAMINED_ORGNAME','V_BEEXAMINED_DEPT'
            ,'V_BEEXAMINED_DEPTNAME','V_BEEXAMINED_CLASS','V_BEEXAMINED_CLASSNAME','V_JCBW','V_CZWT','V_ZGCS','V_KHYJ'
            ,'V_KHFS','V_KKJE','V_BEEXAMINED_TYPE','V_YQZGSJ','V_TBSJ','V_TB_PER','V_TB_PERNAME'
            ,'V_STATE','V_FEEDBACK_GUID','V_FEEDBACK_FLAG','V_FEEDBACK_PER','V_FEEDBACK_PERNAME','V_FEEDBACK_DATA','V_YS_PER'
            ,'V_YS_PERNAME','V_FK_PER','V_FK_PERNAME','V_FK_DATE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_13_EXAMINED_SEL',
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


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'combo',
                id: "xznf",
                store: yearsStore,
                value: new Date().getFullYear(),
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择年份',
                displayField: 'displayField',
                valueField: 'valueField',
                labelWidth: 60,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 180
            },{
                xtype: 'combo',
                id: "yue",
                fieldLabel: '月份',
                store: monthsStore,
                value: new Date().getMonth() + 1,
                editable: false,
                queryMode: 'local',
                labelWidth: 30,
                displayField: 'displayField',
                valueField: 'valueField',
                style: ' margin: 5px 0px 0px 10px',
                labelAlign: 'right',
                width: 110
            }, {
                xtype: 'combo',
                id: "zt",
                store: stateStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '状态',
                displayField: 'displayField',
                valueField: 'valueField',
                value : '%',
                labelWidth: 50,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 200
            }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        items : [ {
            xtype : 'button',
            text : '复制',
            icon:  imgpath + '/add.png',
            style: ' margin: 5px 0px 5px 10px',
            handler : function () {
                _copy();
            }
        }, {
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _selectExamined
        }, {
            xtype : 'button',
            text : '添加',
            icon: imgpath + '/add.png',
            handler : OnButtonAddClicked
        }, {
            xtype : 'button',
            text : '修改',
            icon: imgpath + '/edit.png',
            handler : function ()
            {
                _preUpdateExamined()
            }
        }, {
            xtype : 'button',
            text : '删除',
            icon: imgpath + '/delete.png',
            handler : function ()
            {
                _delete();
            }
        }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
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
            text: '检查时间',
            dataIndex: 'V_DATE',
            align: 'center',
            width : 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            return value.substring(0,10);
                  }
        }, {
            text : '被检查单位',
            dataIndex : 'V_BEEXAMINED_DEPTNAME',
            align : 'center',
            width : 200
        },{
            text : '检查部位',
            dataIndex : 'V_JCBW',
            align : 'center',
            width : 200
        },{
            text : '考核依据',
            dataIndex : 'V_KHYJ',
            align : 'center',
            width : 200
        },{
            text : '存在问题',
            dataIndex : 'V_CZWT',
            align : 'center',
            width : 300
        },{
            text : '考核分数',
            dataIndex : 'V_KHFS',
            align : 'center',
            width : 100
        },{
            text : '扣款金额',
            dataIndex : 'V_KKJE',
            align : 'center',
            width : 100
        },{
            text : '时间',
            dataIndex : 'V_TBSJ',
            align : 'center',
            width : 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }
        },{
            text : '通报人',
            dataIndex : 'V_TB_PERNAME',
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
            items : [ overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
            V_V_STATE:Ext.getCmp('zt').getValue(),
            V_V_DATE: Ext.getCmp('xznf').getValue()+''+Ext.getCmp('yue').getValue(),
            V_V_BEEXAMINED_TYPE:'%',
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
})

function _init()
{


        Ext.getBody().unmask();//去除页面笼罩

}


function _selectExamined() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
        V_V_STATE:Ext.getCmp('zt').getValue(),
        V_V_DATE: Ext.getCmp('xznf').getValue()+''+Ext.getCmp('yue').getValue(),
        V_V_BEEXAMINED_TYPE:'%',
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
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