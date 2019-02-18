var V_MX_CODETEST
var YEAR = null;
if (location.href.split('?')[1] != undefined) {
    YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
}
var QUARTER = null;
if (location.href.split('?')[1] != undefined) {
    QUARTER = Ext.urlDecode(location.href.split('?')[1]).QUARTER;
}
var MONTH = null;
if (location.href.split('?')[1] != undefined) {
    MONTH = Ext.urlDecode(location.href.split('?')[1]).MONTH;
}
var WEEK = null;
if (location.href.split('?')[1] != undefined) {
    WEEK = Ext.urlDecode(location.href.split('?')[1]).WEEK;
}
var PLANTYPE = null;
if (location.href.split('?')[1] != undefined) {
    PLANTYPE = Ext.urlDecode(location.href.split('?')[1]).PLANTYPE;
}
var startUpTime=null;
if(location.href.split('?')[1]!=undefined){
    if(Ext.urlDecode(location.href.split('?')[1]).startUpTime!=undefined)
    { startUpTime=Ext.urlDecode(location.href.split('?')[1]).startUpTime; }
    else{startUpTime=YEAR+'-'+MONTH+'-'+"1";}
}
var endUpTime=null;
if(location.href.split('?')[1]!=undefined){
    if(Ext.urlDecode(location.href.split('?')[1]).endUpTime!=undefined){
        endUpTime=Ext.urlDecode(location.href.split('?')[1]).endUpTime;
    }
    else{
        endUpTime=YEAR+'-'+MONTH+'-'+"1";
    }

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
//小时
    var hours = [];
    for (var i = 0; i < 24; i++) {
        if (i < 10) {
            i = '0' + i;
        } else {
            i = '' + i;
        }
        hours.push({displayField: i, valueField: i});
    }
    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

//分钟
    var minutes = [];
    for (var i = 0; i < 60; i++) {
        if (i < 10) {
            i = '0' + i;
        } else {
            i = '' + i;
        }
        minutes.push({displayField: i, valueField: i});
    }
    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });


    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
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
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });


    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        })
    });

    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
//施工方式
    var sgfsStore = Ext.create("Ext.data.Store", {
        storeId: 'sgfsStore',
        fields: ['ID', 'V_BH','V_SGFS','V_LX'],
        autoLoad: true,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_SGFS_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    Ext.data.StoreManager.lookup('sgfsStore').on('load',function(){
        Ext.getCmp('sgfs').select( Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 5,
        /* fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
         'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
         'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
         'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID'],*/
        fields: ['I_ID', 'V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_DEPTCODE',
            'V_SPECIALTY', 'V_MENO', 'V_FALG', 'V_INPER', 'V_INDATE'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_SEL',
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

    var gridStore1 = Ext.create('Ext.data.Store', {
        id: 'gridStore1',
        autoLoad: false,
        pageSize: 5,
        fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
            'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
            'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID',
            'V_PERNUM','V_LIFELONG','V_MAIN_DEFECT','V_SGWAY','V_SGWAYNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_1921/PM_1921_PLAN_EQU_DATA_SEL',
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

    var panel2 = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'column',
        title : '模型选择',
        titleAlign : 'center',
        border:false,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '单位名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            id: 'zy',
            xtype: 'combo',
            store: zystore,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 70,
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            queryMode: 'local'
        }, {
            id: 'mxname',
            xtype: 'textfield',
            fieldLabel: '模型名称',
            editable: false,
            labelWidth: 70,
            queryMode: 'local'
        },{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid1
        }, {
            xtype: 'button',
            text: '选择',
            icon: imgpath + '/add.png',
            handler: addModel
        }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        title: '计划模型',
        height: '50%',
        width: '100%',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            flex: 0.25
        }, {
            text: '单位',
            dataIndex: 'V_ORGCODE',
            align: 'center',
            flex: 2,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = ckstore.find('V_DEPTCODE', value);
                if (index != -1) {
                    return ckstore.getAt(index).get('V_DEPTNAME');
                }
                return null;
            }
        }, {
            text: '作业区',
            dataIndex: 'V_ORGCODE',
            align: 'center',
            flex: 3,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = zyqstore.find('V_DEPTCODE', value);
                if (index != -1) {
                    return zyqstore.getAt(index).get('V_DEPTNAME');
                }
                return null;
            }
        }, {
            text: '模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            flex: 2
        }, {
            text: '备注',
            dataIndex: 'V_MENO',
            align: 'center',
            flex: 2
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            listeners : {
                "beforechange" : function(bbar, params){
                    itemClick('');
                }
            }
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                //console.log(record.raw.V_MX_CODE);
                itemClick(record.raw.V_MX_CODE);
            }
        }
    });

    var grid1 = Ext.create('Ext.grid.Panel', {
        id: 'grid1',
        store: gridStore1,
        region: 'south',
        columnLines: true,
        height: '50%',
        width: '100%',
        style: ' margin: auto',
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        title: '检修设备',
        autoScroll: true,
        // plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        //     clicksToEdit: 1
        // })],
        /*selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
         selType: 'checkboxmodel',
         mode: 'SIMPLE'
         },*/
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            flex: 0.25
        }, {
            text: '模型名称',
            dataIndex: 'V_MX_NAME',
            flex: 4,
            align: 'center'
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            flex: 3,
            align: 'center'
        }, {
            text: '检修内容',
            dataIndex: 'V_EQU_MENO',
            flex: 2,
            align: 'center'
        }, {
            text: '维修人数',
            dataIndex: 'V_PERNUM',
            flex: 2,
            align: 'center'
            // editor: {
            //     xtype: 'numberfield',
            //     hideTrigger: true,
            //     minValue: 0
            // }
        }, {
            text: '预期寿命',
            dataIndex: 'V_LIFELONG',
            flex: 2,
            align: 'center'
        }, {
            text: '主要缺陷',
            dataIndex: 'V_MAIN_DEFECT',
            flex: 2,
            align: 'center'
        }, {
            text: '施工方式',
            dataIndex: 'V_SGWAYNAME',
            flex: 2,
            align: 'center'
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage1',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore1'
        }]
    });

    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 600,
        height: 250,
        bodyPadding: 15,
        layout: 'vbox',
        title: '时间编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            layout: 'hbox', defaults: {labelAlign: 'right'},
            //frame: true,
            border: false,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'datefield',
                    id: 'jhtgdate',
                    format: 'Y-m-d',
                    fieldLabel: '计划停工时间',
                    editable: false,
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    value: '',
                    minValue:new Date(startUpTime),
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                            var date22 = new Date(date2);
                            Ext.getCmp('jhjgdate').setMinValue(new Date(Ext.getCmp('jhtgdate').getValue()));

                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            // if(gongshicha2 >= 0)
                            // {
                            //     _gongshiheji();
                            // }else{
                            //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                            //     function callBack(id) {
                            //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                            //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                            //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhgshj').setValue(0);
                            //         return ;
                            //
                            //     }
                            // }


                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'jhtghour',
                    fieldLabel: '小时',
                    editable: false,
                    margin: '5 0 5 5',
                    labelWidth: 55,
                    width: 137,
                    value: '',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    store: hourStore,
                    queryMode: 'local',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }
                            // else{
                            //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                            //     function callBack(id) {
                            //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                            //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                            //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhgshj').setValue(0);
                            //         return ;
                            //
                            //     }
                            // }
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'jhtgminute',
                    fieldLabel: '分钟',
                    editable: false,
                    margin: '5 0 5 5',
                    labelWidth: 30,
                    width: 112,
                    value: '',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    store: minuteStore,
                    queryMode: 'local',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }
                            // else{
                            //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                            //     function callBack(id) {
                            //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                            //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                            //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                            //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                            //         Ext.getCmp('jhgshj').setValue(0);
                            //         return ;
                            //
                            //     }
                            // }
                        }
                    }
                }
            ]
        },
            {
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                //frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'datefield',
                        id: 'jhjgdate',
                        format: 'Y-m-d',
                        fieldLabel: '计划竣工时间',
                        editable: false, labelAlign: 'right',
                        margin: '5 0 5 5',
                        labelWidth: 80,
                        width: 280,
                        value: '',
                        listeners: {
                            select: function (field, newValue, oldValue) {
                                var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                var date11 = new Date(date1);
                                var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                var date22 = new Date(date2);


                                var gongshicha = date22.getTime() - date11.getTime();
                                var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                if(gongshicha2 >= 0)
                                {
                                    _gongshiheji();
                                }
                                // else{
                                //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                //     function callBack(id) {
                                //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhgshj').setValue(0);
                                //         return ;
                                //
                                //     }
                                // }
                            }
                        }
                    }, {
                        xtype: 'combo',
                        id: 'jhjghour',
                        fieldLabel: '小时',
                        editable: false,
                        margin: '5 0 5 5',
                        labelWidth: 55,
                        width: 137,
                        value: '0',
                        displayField: 'displayField',
                        valueField: 'valueField',
                        store: hourStore,
                        queryMode: 'local',
                        listeners: {
                            select: function (field, newValue, oldValue) {
                                var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                var date11 = new Date(date1);
                                var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                var date22 = new Date(date2);


                                var gongshicha = date22.getTime() - date11.getTime();
                                var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                if(gongshicha2 >= 0)
                                {
                                    _gongshiheji();
                                }
                                // else{
                                //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                //     function callBack(id) {
                                //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhgshj').setValue(0);
                                //         return ;
                                //
                                //     }
                                // }
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        id: 'jhjgminute',
                        fieldLabel: '分钟',
                        editable: false,
                        margin: '5 0 5 5',
                        labelWidth: 30,
                        width: 112,
                        value: '0',
                        displayField: 'displayField',
                        valueField: 'valueField',
                        store: minuteStore,
                        queryMode: 'local',
                        listeners: {
                            select: function (field, newValue, oldValue) {
                                var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                var date11 = new Date(date1);
                                var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                var date22 = new Date(date2);


                                var gongshicha = date22.getTime() - date11.getTime();
                                var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                if(gongshicha2 >= 0)
                                {
                                    _gongshiheji();
                                }
                                // else{
                                //     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                //     function callBack(id) {
                                //         Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                //         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                //         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                //         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                //         Ext.getCmp('jhgshj').setValue(0);
                                //         return ;
                                //
                                //     }
                                //
                                // }
                            }
                        }
                    }
                ]
            }, {
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                //frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'jhgshj',
                        fieldLabel: '计划工时合计',
                        labelAlign: 'right',
                        margin: '5 0 5 5',
                        labelWidth: 80,
                        width: 280,
                        value: 0
                    }, {
                        xtype: 'numberfield',
                        id: 'repairper',
                        fieldLabel: '维修人数',
                        labelAlign: 'right',
                        margin: '5 0 0 5',
                        labelWidth: 80,
                        allowNegative:false,
                        width: 255,
                        minValue:0,
                        value: 0
                    }
                    // , {
                    //     xtype : 'combo',
                    //     id : "sgfs",
                    //     store: sgfsStore,
                    //     editable : false,
                    //     queryMode : 'local',
                    //     fieldLabel : '施工方式',
                    //     margin: '5 0 5 5',
                    //     displayField: 'V_SGFS',
                    //     valueField: 'V_BH',
                    //     labelWidth: 80,
                    //     width: 254,
                    //     labelAlign : 'right'
                    // }
                ]
            }, {
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                //frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'numberfield',
                        id: 'expectage',
                        fieldLabel: '预计寿命',
                        labelAlign: 'right',
                        margin: '5 0 5 5',
                        labelWidth: 80,
                        allowNegative:false,
                        width: 250,
                        minValue:0,
                        value: 0
                    },{xtype:'label',
                        id:'xs',
                        margin:'8 0 5 5' ,
                        text:'小时',
                        width:28
                    },{
                        xtype : 'combo',
                        id : "sgfs",
                        store: sgfsStore,
                        editable : false,
                        queryMode : 'local',
                        fieldLabel : '施工方式',
                        margin: '5 0 5 5',
                        displayField: 'V_SGFS',
                        valueField: 'V_BH',
                        labelWidth: 80,
                        width: 250,
                        labelAlign : 'right'
                    }
                ]
            },{
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                //frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'maindefect',
                        fieldLabel: '主要缺陷',
                        labelAlign: 'right',
                        allowBlank:false,
                        margin: '5 0 0 5',
                        labelWidth: 80,
                        width: 250
                    }
                ]
            }],
        buttons: [{
            xtype: 'button',
            text: '确定选择',
            width: 40,
            handler: function () {
                addModelSave();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window').hide();
            }
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid, grid1]
    });
    Ext.getCmp('jhtgdate').setValue(new Date(startUpTime)); 		//编辑窗口计划停工时间默认值
    Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
    Ext.getCmp('jhjgdate').setValue(new Date(startUpTime));       //编辑窗口计划竣工时间默认值
    Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
    if(WEEK=='0'){
        Ext.getCmp('repairper').hide();
        Ext.getCmp('expectage').hide();
        Ext.getCmp('xs').hide();
    }
    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
    });
    //计划厂矿更改时
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });


    //作业区改变
    Ext.getCmp('zyq').on('change', function () {
        Ext.data.StoreManager.lookup('zystore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });


    Ext.data.StoreManager.lookup('zystore').on('load', function () {
        //Ext.data.StoreManager.lookup('zystore').insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zystore').getAt(0));
        queryGrid1();
    });



});

function _selectSbSecond() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}


function addModel() {
    var data = Ext.getCmp('grid1').getSelectionModel().getSelection();
    if (data.length != 1) {
        alert("请选择一条数据操作");
        return false;
    } else {
        // var data1 = Ext.getCmp('grid1').getStore();
        // var v1=0;
        // var v2=0;
        // var v3='';
        // for(var i = 0 ;i< data1.getCount(); i++){
        //     v1 =Number(v1)+Number(data1.getAt(i).get('V_PERNUM'));
        //     v2 =Number(v2)+Number(data1.getAt(i).get('V_LIFELONG'));
        //     v3 =v3+','+data1.getAt(i).get('V_MAIN_DEFECT');
        // }

        Ext.getCmp('repairper').setValue(data[0].data.V_PERNUM);
        Ext.getCmp('expectage').setValue(data[0].data.V_LIFELONG);

        Ext.getCmp('maindefect').setValue(data[0].data.V_MAIN_DEFECT);
        Ext.getCmp('sgfs').setValue(data[0].data.V_SGWAY);
        Ext.getCmp('window').show();
    }
}

function queryGrid1() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_ZYCODE: Ext.getCmp('zy').getValue(),
        V_V_MXNAME: Ext.getCmp('mxname').getValue()/*,
         V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
         // V_V_PAGE: request.getParameter("page") ,
         V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize*/
    };
    //flowDicListStore.currentPage = 1;
    gridStore.currentPage=1;
    gridStore.load();
    itemClick('');
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

function addModelSave() {

    if(Ext.getCmp('jhtgdate').getValue()>Ext.getCmp('jhjgdate').getValue()){
        alert('停工时间不可以大于竣工时间请从新设定'); return;
    }

    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    var jhtgTime = Ext.Date.format(Ext.ComponentManager.get("jhtgdate").getValue(), 'Y-m-d') + " " + jhtghour + ":" + jhtgminute + ':00';
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    var jhjgTime = Ext.Date.format(Ext.ComponentManager.get("jhjgdate").getValue(), 'Y-m-d') + " " + jhjghour + ":" + jhjgminute + ':00';

    if(jhtgTime>jhjgTime){
        alert('停工时间不可以大于竣工时间请从新设定'); return;
    }
    // var data = Ext.getCmp('grid').getSelectionModel().getSelection();
    var ss = Ext.getCmp('grid1').getStore();
    // var personnum=0;
    // for(var i=0;i<ss.getCount();i++){
    //     var num=0;
    //     if(ss.getAt(i).get('V_PERNUM')!=null && ss.getAt(i).get('V_PERNUM')!=''){
    //         num=ss.getAt(i).get('V_PERNUM');
    //
    //     }
    //     personnum=personnum+num;
    // }
    var personnum=Ext.getCmp('repairper').getValue();
    var expectage=Ext.getCmp('expectage').getValue();
    var data = Ext.getCmp('grid1').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_CHECK',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: data[0].raw.V_GUID,//data[0].raw.V_MX_CODE,
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_PLANTYPE: PLANTYPE,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_YEAR: YEAR,
            V_V_QUARTER: QUARTER,
            V_V_MONTH: MONTH,
            V_V_WEEK: WEEK,
            V_V_STIME: jhtgTime,
            V_V_ETIME: jhjgTime,
            V_V_SUNTIME: Ext.getCmp('jhgshj').getValue(),
            V_V_PRENUM:personnum,
            V_V_EXPNUM:expectage,
            V_V_MAIN_DEFECT:Ext.getCmp('maindefect').getValue(),
            V_V_SGWAY:Ext.getCmp('sgfs').getValue(),
            V_V_SGWAYNAME:Ext.getCmp('sgfs').getRawValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.MessageBox.alert('提示', '添加成功');
            window.opener.query();
            window.close();
        }
    });


}


function itemClick(V_MX_CODE) {
    //var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    // alert(records[0].get('V_MX_CODE'));
    V_MX_CODETEST = V_MX_CODE
    var gridStore1 = Ext.data.StoreManager.lookup('gridStore1');
    gridStore1.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_MXCODE: V_MX_CODETEST
    };
    //flowDicListStore.currentPage = 1;
    gridStore1.load();
}


function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
    var date22 = new Date(date2);


    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);

}