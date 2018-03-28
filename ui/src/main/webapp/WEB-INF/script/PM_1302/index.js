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
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTNAME2 = Ext.util.Cookies.get('v_deptname2');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var zyqStoreLoad = false;
var initLoad = true;
var KHLBDATA = [{ displayField: '基础工作', valueField: '基础工作' },{ displayField: '现场管理', valueField: '现场管理' },{ displayField: '工艺纪律', valueField: '工艺纪律' }
    ,{ displayField: '设备管理', valueField: '设备管理' },{ displayField: '违章违纪', valueField: '违章违纪' },{ displayField: '安全隐患', valueField: '安全隐患' }
    ,{ displayField: '相关方', valueField: '相关方' }];

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
        baseCls: 'my-panel-no-border',
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
                labelWidth: 100,
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
        defaults : {
            style : 'margin:2px',
            width : 70
        },
        items : [ {
            xtype : 'button',
            text : '复制',
            icon:  imgpath + '/add.png',
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
var V_V_GUID;
function OnButtonAddClicked() {
     V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    var owidth = 593;
    var oheight = 796;
    // var ret = window.open(AppUrl + 'page/PM_130201/index.html?V_V_GUID='+V_V_GUID,
    //     '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
    var bkhdwStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'bkhdwStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
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
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        },
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('bkhdw').select(store.first());
        //         zyqStoreLoad = true;
        //         _init();
        //     }
        // }
    });

    var khlbStore = Ext.create("Ext.data.Store", {
        storeId: 'khlbStore',
        fields: ['displayField', 'valueField'],
        data: KHLBDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 900,
        height: 500,
        title : '添加',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region:'center',
        layout : 'vbox',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                margin: '0 0 0 0',
                //autoScroll : true,
                items: [
                    {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'checkTime',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '检查日期',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            baseCls: 'margin-bottom'
                        }, {
                            xtype: 'combo',
                            id: "bkhdw",
                            store: bkhdwStore,
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '被考核单位',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "jcbw",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '检查部位',
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            allowBlank: false,
                            width: 250
                        },{
                            xtype: 'filefield',
                            id: 'V_V_FILEBLOB',
                            name: 'V_V_FILEBLOB',
                            enctype: "multipart/form-data",
                            fieldLabel: '上传图片',
                            labelWidth: 100,
                            labelAlign: 'right',
                            inputWidth: 245,
                            style: ' margin: 5px 0px 0px 0px',
                            buttonText: '浏览....',
                            allowBlank: false
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_GUID',
                            id: 'V_V_GUID'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_FILENAME',
                            id: 'V_V_FILENAME'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_FILETYPECODE',
                            id: 'V_V_FILETYPECODE'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_PLANT',
                            id: 'V_V_PLANT'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_DEPT',
                            id: 'V_V_DEPT'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_PERSON',
                            id: 'V_V_PERSON'
                        }, {
                            xtype: 'hidden',
                            name: 'V_V_REMARK',
                            id: 'V_V_REMARK'
                        } ]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "czwt",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '存在问题',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 655
                        }]
                    }, {
                        id: 'zgcs',
                        xtype: 'textarea',
                        fieldLabel: '整改措施',
                        //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        allowBlank: false,
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 0px 0px 0px',
                        width: 655,
                        labelAlign: 'right'
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "khyj",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '考核依据',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 655
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "khfs",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '考核分数',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            value : 0,
                            labelAlign: 'right',
                            width: 250
                        },{
                            xtype: 'textfield',
                            id: "kkje",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '扣款金额',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            value : 0,
                            labelAlign: 'right',
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'khbm',
                                xtype: 'textfield',
                                editable: true,
                                fieldLabel: '考核部门',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                value: V_V_DEPTNAME2,
                                readOnly : true,
                                width: 250,
                                baseCls: 'margin-bottom'
                            },{
                                xtype: 'combo',
                                id: "lb",
                                store: khlbStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '类别',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                value : '基础工作',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'yqzgsj',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '要求整改时间',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            baseCls: 'margin-bottom'
                        }]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'tbsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y/m/d',
                                value: new Date(),
                                fieldLabel: '通报时间',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                baseCls: 'margin-bottom'
                            },
                            {
                                id: 'tbr',
                                xtype: 'textfield',
                                readOnly : true,
                                fieldLabel: '通报人',
                                allowBlank: false,
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                baseCls: 'margin-bottom'
                            }]
                    }
                ]
            }


        ],
        buttons : [
            {
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 475px',
                handler: _save
            }, {
                xtype: 'button',
                text: '关闭',
                icon: imgpath + '/cross.png',
                handler: _close,
                style: 'margin: 5px 0px 10px 0px'
            }, {
                xtype: 'button',
                text: '重置',
                icon: imgpath + '/cross.png',
                style: 'margin: 20px 0px 20px 5px',
                handler: function () {
                    _reset();
                }
            }]
    });
    Ext.getCmp('windowEqu').show();
    _init1();

}
function _init1() {
    initLoad = false;
    Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));
    Ext.getBody().unmask();

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

function _save() {
    if (Ext.getCmp('jcbw').getValue() =="" || Ext.getCmp('czwt').getValue() == '' || Ext.getCmp('zgcs').getValue() == '' || Ext.getCmp('khyj').getValue() == ''|| Ext.getCmp('khfs').getValue() == ''|| Ext.getCmp('kkje').getValue() == ''|| Ext.getCmp('khbm').getValue() == '') {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_DATE: Ext.getCmp('checkTime').getSubmitValue(),
            V_V_BEEXAMINED_DEPT: Ext.getCmp('bkhdw').getValue(),
            V_V_JCBW: Ext.getCmp('jcbw').getValue(),
            V_V_CZWT: Ext.getCmp('czwt').getValue(),
            V_V_ZGCS: Ext.getCmp('zgcs').getValue(),
            V_V_KHYJ: Ext.getCmp('khyj').getValue(),
            V_V_KHFS: Ext.getCmp('khfs').getValue(),
            V_V_KKJE: Ext.getCmp('kkje').getValue(),
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_TYPE : 'dept',
            V_V_BEEXAMINED_TYPE: Ext.getCmp('lb').getValue(),
            V_V_YQZGSJ: Ext.getCmp('yqzgsj').getSubmitValue(),
            V_V_TBSJ: Ext.getCmp('tbsj').getSubmitValue(),
            V_V_TB_PER:  Ext.util.Cookies.get('v_personcode'),
            V_V_STATE: '未反馈',
            V_V_JX_PER:''

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='成功') {//成功，会传回true
                if(Ext.getCmp('V_V_FILEBLOB').getValue() != '')
                {
                    _upLoadFile();
                }else{
                    Ext.MessageBox.alert('提示', '操作成功', callBack);
                    function callBack(id) {
                        _selectExamined();
                        _close();
                    }
                }

                //_close();


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

function _close() {
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_1302/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

function _reset()
{
    var bkhdwStore = Ext.data.StoreManager.lookup('bkhdwStore');
    Ext.getCmp('checkTime').setValue(new Date());
    Ext.getCmp('bkhdw').setValue(bkhdwStore.getAt(0).get('V_DEPTCODE'));
    Ext.getCmp('jcbw').setValue('');
    Ext.getCmp('V_V_FILEBLOB').reset();
    Ext.getCmp('czwt').setValue('');
    Ext.getCmp('zgcs').setValue('');
    Ext.getCmp('khyj').setValue('');
    Ext.getCmp('khfs').setValue(0);
    Ext.getCmp('kkje').setValue(0);
    Ext.getCmp('khbm').setValue(V_V_DEPTNAME2);
    Ext.getCmp('lb').setValue('基础工作');
    Ext.getCmp('yqzgsj').setValue(new Date());
    Ext.getCmp('tbsj').setValue(new Date());
    Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));

}

function _upLoadFile() {
    var editPanel = Ext.getCmp('editPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));
    //alert(V_V_FILENAME);

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBJC');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('bkhdw').getSubmitValue().substring(0,4));
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('bkhdw').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());


    if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }

    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    editPanel.getForm().submit({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (ret) {
            Ext.MessageBox.alert('提示', '操作成功', callBack);
            function callBack(id) {
               _selectExamined();
                _close();
            }

        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    })

}