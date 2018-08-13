var today = new Date();
var mingtian = new Date();
var fzload = true;
mingtian.setDate(mingtian.getDate() + 1)
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_PERSONCODE = '';
var taskId = '';
var V_ORDERGUID = "";
var ProcessInstanceId = '';
var V_GUID = '';

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
    (parameters.ProcessInstanceId == undefined) ? ProcessInstanceId = '' : ProcessInstanceId = parameters.ProcessInstanceId;
    V_GUID = V_ORDERGUID;
}
var V_PICGUID1 = "";
var V_PICGUID2 = "";
var V_PICGUID3 = "";
var ckstoreload = false;
var zyqstoreload = false;
var zystoreload = false;
var index01 = 2;
var index02 = 1;
var index03 = 0;
var PICGUID1;
var picguidbegin;
var saveload = false;


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

    var imagestore = Ext.create('Ext.data.Store', {
        id: 'imagestore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_PICGUID', 'V_PICMOME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_VIEW',
            // url: 'PRO_PM_EQUREPAIRPLAN_PIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    var spqzstore = Ext.create('Ext.data.Store', {
        storeId: 'spqzstore',
        autoLoad: false,
        pageSize: 15,
        fields: ['AssigneeName', 'Assignee', 'ActivityName', 'EndTime', 'Idea', 'ActivityId', 'ActivityType', 'StartTime', 'Id'],
        proxy: {
            url: AppUrl + 'Activiti/InstanceState',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    //厂矿计划数据加载
    var ckstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckstoreload = true;
                _init();
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
                zystoreload = true;
                _init();
            }
        }
    });

    var zyfzrenstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyfzrenstore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_BASE_SPECIALTYTOPERSON_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                /*V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
                 V_V_POSTCODE : Ext.util.Cookies.get('v_postcode'),
                 V_V_DEPTCODE : Ext.getCmp('zyq').getValue()*/

            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyfzren').select(store.first());
            }
        }
    });

    //作业区加载
    var zyqstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
                zyqstoreload = true;
                _init();
            }
        }
    });

    var spstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'spstore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_FLOW_STEPNAME', 'V_V_NEXT_SETP'],
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
            load: function (store, records) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                Ext.getCmp('sp').select(store.first());
            }
        }
    });

    var jxdwstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'jxdwstore',
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PM_REPAIRDEPT_SEL',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                /* V_V_DEPTCODE : Ext.getCmp('zyq').getValue()*/
            }
        }),
        listeners: {
            load: function (store, records) {
                //alert('jxdw');
                Ext.getCmp('jxdw').select(store.first());
            }
        }
    });

    var timeStore = Ext.create('Ext.data.Store', {
        id: 'timeStore',
        autoLoad: true,
        fields: ['V_DATETIME', 'V_DATE', 'V_TIME', 'V_YEAR', 'V_MONTH'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PM_RET_DATETIME',
            // url: 'PM_RET_DATETIME',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                //Ext.getCmp('sqtime').select(store.first());
                //console.log(store.getAt(0).get('V_MONTH'));
                Ext.getCmp('sqtime').setValue(store.getAt(0).get('V_DATE'));
                Ext.getCmp('year').setValue(store.getAt(0).get('V_YEAR'));
                Ext.getCmp('month').setValue(store.getAt(0).get('V_MONTH'));
                Ext.getCmp('jhyear').setValue(store.getAt(0).get('V_YEAR'));
                Ext.getCmp('jhmonth').setValue(store.getAt(0).get('V_MONTH'));

            }
        }
    });

    var yearStore = Ext.create('Ext.data.Store', {
        id: 'yearStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: Year,
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'memory',
            render: {
                type: 'json'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
            }
        }
    });

    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'memory',
            reader: {type: 'json'}
        })
    });

    var sfwaiweiStore = Ext.create('Ext.data.Store', {
        storeId: 'sfwaiweiStore',
        autoLoad: false,
        fields: ['VALUE', 'NAME'],
        data: [{
            VALUE: 0,
            NAME: '否'
        }, {
            VALUE: 1,
            NAME: '是'
        }, {
            VALUE: '%',
            NAME: '是,否'
        }]
    });

    var sftsqiangxiuStore = Ext.create('Ext.data.Store', {
        storeId: 'sftsqiangxiuStore',
        autoLoad: false,
        fields: ['VALUE', 'NAME'],
        data: [{
            VALUE: 0,
            NAME: '否'
        }, {
            VALUE: 1,
            NAME: '是'
        }, {
            VALUE: '%',
            NAME: '是,否'
        }]
    });

    var fileGridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileGridStore',
        pageSize: 20,
        fields: ['V_V_GUID', 'V_V_FILETYPECODE', 'V_FILEGUID', 'V_FILENAME', 'V_PERSON', 'V_FINDTIME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_BASE_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_V_FILETYPECODE': 'SBGZ'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        })
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'I_YEAR', 'I_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'D_DATE', 'V_PROJECTCODE',
            'V_PROJECTNAME', 'V_PLANDATE', 'V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTYMANCODE', 'V_SPECIALTYMAN',
            'F_MONEYUP', 'F_MONEYBUDGET', 'V_REPAIRDEPTTYPE', 'V_REPAIRDEPTCODE', 'V_REPAIRDEPT',
            'V_DEFECT', 'V_MEASURE', 'V_MONEY', 'V_INMAN', 'V_INMANCODE',
            'D_INDATE', 'I_STATE', 'V_FLAG', 'I_RUSHTO', 'V_PROJECTCODE_GS',
            'V_REPAIRDEPT_GS', 'F_MONEY_GS', 'D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_CREATE',
            // url: 'PRO_PM_EQUREPAIRPLAN_CREATE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    var filegridPanel = Ext.create("Ext.panel.Panel", {
        id: 'filegridPanel',
        editable: false,
        region: 'center',
        // height: 200,
        html: "<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>",//width: 400,
        style: ' margin: 5px 0px 0px 0px',
        columnLines: true
        /*store: fileGridStore,
         autoScroll: true,
         // margin: '10px 0 0 125px',
         //colspan: 3,
         columns: [{
         text: '附件名称',
         flex: 0.7,
         id : 'fjname',
         align: 'center',
         dataIndex: "V_FILENAME"
         // renderer: _downloadRander
         }, {
         text: '操作',
         flex: 0.3,
         align: 'center',
         //renderer: _delRander
         }]*/
    });


    var panel2 = Ext.create('Ext.panel.Panel', {
        id: 'panel2',
        layout: 'column',
        defaults: {
            style: 'margin:2px',
            xtype: 'button'
        },
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'button',
                text: '暂时保存',
                icon: imgpath + '/filesave.png',
                handler: zssave,
                style: 'margin: 5px 5px 5px 5px'
            }, {
                xtype: 'textfield',
                id: 'yj',
                editable: false,
                fieldLabel: '意见:',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                labelWidth: 30,
                queryMode: 'local',
                style: 'margin: 5px 5px 5px 5px',
                labelAlign: 'right',
                width: 140
                //readOnly : true,
            }, {
                id: 'sp',
                xtype: 'combo',
                store: spstore,
                fieldLabel: '下一步审批人',
                labelWidth: 80,
                queryMode: 'local',
                width: 160,
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                style: 'margin: 5px 5px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '保存提交',
                icon: imgpath + '/filesave.png',
                handler: save,
                style: 'margin: 5px 5px 5px 5px'
            }, {
                xtype: 'button',
                text: '作废',
                //icon: imgpath + '/filesave.png',
                handler: _qxsp,
                style: 'margin: 5px 5px 5px 5px'
            }
        ]


    });


    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: spqzstore,
        width: 200,
        height: 200,
        border: false,
        frame: true,
        columnLines: true,
        autoscroll: true,
        //bodyStyle : 'overflow-x:hidden; overflow-y:auto',
        //title: '删除年计划',
        region: 'center',
        //width: '100%',
        columns: [
            {
                text: '流程步骤',
                width: '23%',
                dataIndex: 'ActivityName',
                align: 'center'
            }, {
                text: '操作人',
                width: '23%',
                dataIndex: 'AssigneeName',
                align: 'center'
            }, {
                text: '审批意见',
                width: '24%',
                dataIndex: 'Idea',
                align: 'center'
            }, {
                text: '审批时间',
                width: '30%',
                dataIndex: 'EndTime',
                align: 'center'
            }

        ]
    });

    var panel3 = Ext.create('Ext.form.FormPanel', {
        id: 'panel3',
        region: 'center',
        header: false,
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        height: 5000,
        width: 593,
        //title: '设备维修申请报告单',
        layout: 'border',
        items: [{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            //baseCls: 'my-panel-no-border',
            items: [{
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 250,
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _ck_zyqload();
                        _spload();
                        zyq_jxdwload();

                    }
                }
            }, {
                id: 'zyq',
                xtype: 'combo',
                store: zyqstore,
                fieldLabel: '作业区',
                editable: false,
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                labelAlign: 'right',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _ck_zyqfzrload();
                        zyq_jxdwload();
                        _spload();
                    }
                }

            }, {
                id: 'sqtime',
                store: timeStore,
                xtype: 'combo',
                fieldLabel: '申请日期',
                // format: 'Y-m-d',
                labelWidth: 100,
                queryMode: 'local',
                //dataIndex: 'V_DATE',
                //value: new Date(new Date()-7*24*60*60*1000),
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 250
            }, {
                id: 'xmcode',
                xtype: 'textfield',
                fieldLabel: '项目编号',
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'xmname',
                xtype: 'textfield',
                fieldLabel: '项目名称',
                editable: false,
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
            }, {
                id: 'zy',
                xtype: 'combo',
                store: zystore,
                fieldLabel: '专业',
                editable: false,
                labelWidth: 100,
                displayField: 'V_MAJOR_NAME',
                valueField: 'V_MAJOR_CODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _ck_zyfzrload();
                        // _spload();
                    }
                }
            }, {
                id: 'zyfzren',
                xtype: 'combo',
                store: zyfzrenstore,
                fieldLabel: '设备室专业负责人',
                editable: false,
                labelWidth: 100,
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'year',
                fieldLabel: '计划施工日期:',
                editable: false,
                style: ' margin: 5px 0px 0px 0px',
                labelWidth: 100,
                width: 170,
                displayField: 'displayField',
                valueField: 'valueField',
                value: today.getFullYear(),
                store: yearStore,
                queryMode: 'local',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _jhyear();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'month',
                editable: false,
                style: ' margin: 5px 0px 0px 10px',
                //labelWidth: 40,
                width: 70,
                displayField: 'displayField',
                valueField: 'valueField',
                value: today.getMonth() + 1,
                store: monthStore,
                queryMode: 'local',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _jhmonth();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'jhyear',
                fieldLabel: '计划年月:',
                editable: false,
                style: ' margin: 5px 0px 0px 0px',
                labelWidth: 100,
                width: 160,
                displayField: 'displayField',
                valueField: 'valueField',
                value: today.getFullYear(),
                store: yearStore,
                queryMode: 'local',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'jhmonth',
                editable: false,
                style: ' margin: 5px 0px 0px 10px',
                //labelWidth: 40,
                width: 80,
                displayField: 'displayField',
                valueField: 'valueField',
                value: today.getMonth() + 1,
                store: monthStore,
                queryMode: 'local'
            }, {
                id: 'gczgs',
                xtype: 'textfield',
                fieldLabel: '工程总概算(万元)',
                editable: false,
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                labelWidth: 100,
                queryMode: 'local',
                allowBlank: false,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'gczys',
                xtype: 'textfield',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                fieldLabel: '工程总预算(万元)',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                allowBlank: false,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'sfww',
                xtype: 'combo',
                store: sfwaiweiStore,
                fieldLabel: '是否外委',
                editable: false,
                labelWidth: 100,
                value: '%',
                displayField: 'NAME',
                valueField: 'VALUE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        if (Ext.getCmp('sfww').getValue() == 1) {
                            Ext.getCmp('jxdw').setEditable(true);
                        } else {
                            Ext.getCmp('jxdw').setEditable(false);
                        }
                    }
                }
            }, {
                id: 'jxdw',
                xtype: 'combo',
                store: jxdwstore,
                fieldLabel: '检修单位',
                editable: false,
                labelWidth: 100,
                displayField: 'V_DEPTREPAIRNAME',
                valueField: 'V_DEPTREPAIRCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'sftsqiangxiu',
                xtype: 'combo',
                store: sftsqiangxiuStore,
                fieldLabel: '是否特殊抢修 ',
                editable: false,
                labelWidth: 100,
                value: '%',
                displayField: 'NAME',
                valueField: 'VALUE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '缺陷图片',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                labelWidth: 100,
                labelAlign: 'right',
                inputWidth: 317,
                style: ' margin: 5px 0px 0px 0px',
                buttonText: '选择',
                allowBlank: false,
                regex: /^.*\.(jpg|png)$/i,//正则表达式，用来检验文件格式
                regexText: '请选择jgp/png图片格式！'
            }, {
                id: 'insertFilesFj',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 5px',
                handler: _upLoad
            }, {
                xtype: 'hidden',
                name: 'V_V_GUID',
                id: 'V_V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_PICMOME',
                id: 'V_V_PICMOME'
            }, {
                xtype: 'hidden',
                name: 'V_V_PICGUID',
                id: 'V_V_PICGUID'
            }, {
                //columnWidth: 1,
                /*height: 150,
                 width: '100%',*/
                style: ' margin: 5px 0px 0px 50px',
                items: filegridPanel

            }, {
                id: 'qxsmjfy',
                xtype: 'textarea',
                fieldLabel: '缺陷说明及费用 ',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
            }, {
                id: 'cqfa',
                xtype: 'textarea',
                fieldLabel: '采取方案 ',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
            }/*, {
             //columnWidth: 1,
             *//*height: 150,
             width: '100%',*//*
             style: ' margin: 5px 0px 0px 0px',
             items: [{
             region: 'center',
             layout: 'fit',
             height: 80,
             width: 580,
             border: false,
             items: [grid]
             }]

             }*/]
        }]
    });

    var rightPanel = Ext.create('Ext.Panel', {
        id: 'rightPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'west',
            border: false,
            items: [panel3]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [grid]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id: "viewport",
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
            items: [panel2]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [rightPanel]
        }]
    });
    /*
     Ext.create('Ext.container.Viewport', {
     id: "viewport",
     //layout: 'column',
     items: [panel2, panel3]
     });*/

    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
     );

     });*/

    _init();
});

function _init() {
    if (ckstoreload && zyqstoreload && zystoreload && fzload) {
        fzload = false;
        //数据初始化
        /*Ext.Ajax.request({
         url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_CREATE',
         type: 'ajax',
         method: 'POST',
         params: {
         V_V_IP: "",
         V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
         V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
         V_V_GUID: V_GUID
         },
         success: function (response) {
         var data = Ext.decode(response.responseText);//后台返回的值
         if (data.success) {//成功，会传回true
         //alert(1);


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

         })*/

        var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
        zyfzrenstore.proxy.extraParams = {
            V_V_SPECIALTYCODE: Ext.getCmp('zy').getValue(),
            V_V_POSTCODE: '0101020104',
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
        };
        //matGroupSecondStore.currentPage = 1;
        zyfzrenstore.load();

        /*Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='###'>删除</a></span> </td > <td align='center'> <span><a href='###'>删除</a></span></td> <td align='center'> <span><a href='####'>删除</a></span></td> <td></td> </tr> </table> </div>"
         );*/

        var gridStore = Ext.data.StoreManager.lookup('gridStore');
        gridStore.proxy.extraParams = {
            V_V_IP: "",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_GUID: V_GUID

        };
        //matGroupThirdStore.currentPage = 1;

        gridStore.load();
        Ext.getCmp('ck').setValue(gridStore.getAt(0).get('V_ORGCODE'));
        //console.log(gridStore.getAt(0).get('V_DEPTNAME'));
        Ext.getCmp('zyq').setValue(gridStore.getAt(0).get('V_DEPTCODE'));
        //alert(1);
        Ext.getCmp('sqtime').setValue(gridStore.getAt(0).get('D_DATE'));
        Ext.getCmp('xmcode').setValue(gridStore.getAt(0).get('V_PROJECTCODE'));
        Ext.getCmp('xmname').setValue(gridStore.getAt(0).get('V_PROJECTNAME'));
        Ext.getCmp('zy').setValue(gridStore.getAt(0).get('V_SPECIALTYNAME'));
        Ext.getCmp('zyfzren').setValue(gridStore.getAt(0).get('V_SPECIALTYMAN'));
        Ext.getCmp('year').setValue(gridStore.getAt(0).get('V_PLANDATE'));
        Ext.getCmp('jhyear').setValue(gridStore.getAt(0).get('I_YEAR_PLAN'));
        Ext.getCmp('jhmonth').setValue(gridStore.getAt(0).get('I_MONTH_PLAN'));
        Ext.getCmp('gczgs').setValue(gridStore.getAt(0).get('F_MONEYUP'));
        Ext.getCmp('gczys').setValue(gridStore.getAt(0).get('F_MONEYBUDGET'));
        Ext.getCmp('sfww').setValue(gridStore.getAt(0).get('V_REPAIRDEPTTYPE'));
        //console.log(gridStore.getAt(0).get('V_REPAIRDEPT'));
        Ext.getCmp('jxdw').setValue(gridStore.getAt(0).get('V_REPAIRDEPT'));
        Ext.getCmp('sftsqiangxiu').setValue(gridStore.getAt(0).get('I_RUSHTO'));
        Ext.getCmp('qxsmjfy').setValue(gridStore.getAt(0).get('V_DEFECT'));
        Ext.getCmp('cqfa').setValue(gridStore.getAt(0).get('V_MEASURE'));

        var imagestore = Ext.data.StoreManager.lookup('imagestore');
        imagestore.proxy.extraParams = {
            V_V_GUID: V_GUID
        };

        imagestore.load();

        index01 = imagestore.getCount() - 1;
        index02 = imagestore.getCount() - 2;
        index03 = imagestore.getCount() - 3;

        if (imagestore.getCount() == 1) {
            V_PICGUID1 = imagestore.getAt(0).get('V_PICGUID');
            picguidbegin = V_PICGUID1;
        }
        if (imagestore.getCount() == 2) {
            V_PICGUID1 = imagestore.getAt(1).get('V_PICGUID');
            V_PICGUID2 = imagestore.getAt(0).get('V_PICGUID');

        }
        if (imagestore.getCount() >= 3) {
            V_PICGUID1 = imagestore.getAt(index01).get('V_PICGUID');
            V_PICGUID2 = imagestore.getAt(index02).get('V_PICGUID');
            V_PICGUID3 = imagestore.getAt(index03).get('V_PICGUID');

        }
        picguidbegin = V_PICGUID1;
        //alert(1.8);

        Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
        );

        var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
        spqzstore.proxy.extraParams = {
            instanceId: ProcessInstanceId
        };
        spqzstore.currentPage = 1;
        spqzstore.load();
        //alert(2.0);

        _selectTaskId();
        fzload = false;

        Ext.getBody().unmask();
    }
}

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

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_IP: "",
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_D_INDATE_B: Ext.getCmp("begintime").getSubmitValue(),
        V_D_INDATE_E: Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_DEFECT: Ext.getCmp('qxcontent').getValue()
    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _ck_zyqload() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();
}

function _ck_zyfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE: Ext.getCmp('zy').getValue(),
        V_V_POSTCODE: '0101020104',
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();
}

function _ck_zyqfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE: Ext.getCmp('zy').getValue(),
        V_V_POSTCODE: '0101020104',
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();
}

function zyq_jxdwload() {
    var jxdwstore = Ext.data.StoreManager.lookup('jxdwstore');
    jxdwstore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwstore.load();
}

function _jhyear() {
    Ext.getCmp('jhyear').setValue(Ext.getCmp('year').getValue());
}

function _jhmonth() {
    Ext.getCmp('jhmonth').setValue(Ext.getCmp('month').getValue());
}

function _spload() {
    var spstore = Ext.data.StoreManager.lookup('spstore');
    spstore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'Project',
        V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: '通过'
    };
    //matGroupSecondStore.currentPage = 1;
    spstore.load();
}

function _upLoad() {
    var V_V_PICMOME = Ext.data.IdGenerator.get('uuid').generate();

    var panel3 = Ext.getCmp('panel3');
    Ext.getCmp('V_V_GUID').setValue(V_GUID);
    Ext.getCmp('V_V_PICMOME').setValue(V_V_PICMOME);
    Ext.getCmp('V_V_PICGUID').setValue("");

    panel3.getForm().submit({
        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_SET',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            Ext.Msg.alert('成功', '上传成功');
            _preViewImage();
            // _next1()
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '上传失败');
        }
    });
}

function _preViewImage() {
    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    imagestore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };
    //matGroupSecondStore.currentPage = 1;
    imagestore.load();

    index01 = imagestore.getCount() - 1;
    index02 = imagestore.getCount() - 2;
    index03 = imagestore.getCount() - 3;
    if (imagestore.getCount() == 1) {
        V_PICGUID1 = imagestore.getAt(0).get('V_PICGUID');
        picguidbegin = V_PICGUID1;
    }
    if (imagestore.getCount() == 2) {
        V_PICGUID1 = imagestore.getAt(1).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(0).get('V_PICGUID');
    }
    if (imagestore.getCount() >= 3) {
        V_PICGUID1 = imagestore.getAt(index01).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(index02).get('V_PICGUID');
        V_PICGUID3 = imagestore.getAt(index03).get('V_PICGUID');
    }
    picguidbegin = V_PICGUID1;

    Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
    );
}

function _last() {
    index01++;
    index02++;
    index03++;
    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    if (V_PICGUID1 == picguidbegin) {
        Ext.Msg.alert('提示信息', '已经是第一张');
        index01--;
        index02--;
        index03--;
        return;
    } else {
        V_PICGUID1 = imagestore.getAt(index01).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(index02).get('V_PICGUID');
        V_PICGUID3 = imagestore.getAt(index03).get('V_PICGUID');
        //console.log("退V_PICGUID1="+V_PICGUID1);
        // console.log("退V_PICGUID2="+V_PICGUID2);
        //console.log("退V_PICGUID3="+V_PICGUID3);
        Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
        );
        PICGUID1 = "";
    }
}

function _next() {
    var imagestore = Ext.data.StoreManager.lookup('imagestore');

    if (imagestore.getCount() <= 3) {
        Ext.Msg.alert('提示信息', '已经是最后一张');
    } else {
        index01--;
        index02--;
        index03--;
        if (index03 < 0) {
            Ext.Msg.alert('提示信息', '已经是最后一张');
            index01++;
            index02++;
            index03++;
            return;
        }
        V_PICGUID1 = imagestore.getAt(index01).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(index02).get('V_PICGUID');
        V_PICGUID3 = imagestore.getAt(index03).get('V_PICGUID');
        //console.log("V_PICGUID1="+V_PICGUID1);
        //console.log("V_PICGUID2="+V_PICGUID2);
        // console.log("V_PICGUID3="+V_PICGUID3);


        /* if(V_PICGUID3 == PICGUID1)
         {
         Ext.Msg.alert('提示信息', '已经是最后一张');
         return;
         }*/
        /*Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='###'>删除</a></span> </td > <td align='center'> <span><a href='###'>删除</a></span></td> <td align='center'> <span><a href='####'>删除</a></span></td> <td></td> </tr> </table> </div>"
         );*/
        Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
        );
        // PICGUID1 = V_PICGUID3;
    }
}

/*function _next1()
 {
 var imagestore = Ext.data.StoreManager.lookup('imagestore');


 V_PICGUID1 = imagestore.getAt(2).get('V_PICGUID');

 V_PICGUID2 = imagestore.getAt(1).get('V_PICGUID');
 V_PICGUID3 = imagestore.getAt(0).get('V_PICGUID');
 console.log("V_PICGUID1="+V_PICGUID1);
 console.log("V_PICGUID2="+V_PICGUID2);
 console.log("V_PICGUID3="+V_PICGUID3);

 if(V_PICGUID1 == PICGUID1)
 {
 Ext.Msg.alert('提示信息', '已经是最后一张');
 return;
 }
 Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()' /> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='###'>删除</a></span> </td > <td align='center'> <span><a href='###'>删除</a></span></td> <td align='center'> <span><a href='####'>删除</a></span></td> <td></td> </tr> </table> </div>"
 );
 PICGUID1 = V_PICGUID1;

 }*/

function _delete1() {
    if (V_PICGUID1 == null || V_PICGUID1 == "") {
        Ext.Msg.alert('提示信息', '请选择一张图片');
    } else {
        var imagestore = Ext.data.StoreManager.lookup('imagestore');
        Ext.MessageBox.show({
            title: '确认',
            msg: '您确定要删除吗亲？',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESION,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_GUID: V_GUID,
                            V_V_PICGUID: V_PICGUID1
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                Ext.Msg.alert('提示信息', '删除成功');
                                V_PICGUID1 = "";
                                V_PICGUID2 = "";
                                V_PICGUID3 = "";
                                _preViewImage();
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
}

function _delete2() {
    if (V_PICGUID2 == null || V_PICGUID2 == "") {
        Ext.Msg.alert('提示信息', '请选择一张图片');
    } else {
        var imagestore = Ext.data.StoreManager.lookup('imagestore');
        Ext.MessageBox.show({
            title: '确认',
            msg: '您确定要删除吗亲？',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESION,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_GUID: V_GUID,
                            V_V_PICGUID: V_PICGUID2
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                Ext.Msg.alert('提示信息', '删除成功');
                                V_PICGUID1 = "";
                                V_PICGUID2 = "";
                                V_PICGUID3 = "";
                                _preViewImage();
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
}

function _delete3() {
    if (V_PICGUID3 == null || V_PICGUID3 == "") {
        Ext.Msg.alert('提示信息', '请选择一张图片');
    } else {
        var imagestore = Ext.data.StoreManager.lookup('imagestore');
        Ext.MessageBox.show({
            title: '确认',
            msg: '您确定要删除吗亲？',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESION,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_GUID: V_GUID,
                            V_V_PICGUID: V_PICGUID3
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                Ext.Msg.alert('提示信息', '删除成功');
                                V_PICGUID1 = "";
                                V_PICGUID2 = "";
                                V_PICGUID3 = "";
                                _preViewImage();
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
}

function zssave() {
    if (Ext.getCmp('gczgs').getValue() == "" || Ext.getCmp('gczgs').getValue() == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入工程总概算',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('xmname').getValue() == "") {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入项目名称',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('gczys').getValue() == "" || Ext.getCmp('gczys').getValue() == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入工程总预算',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('sfww').getValue() == '%' || Ext.getCmp('sftsqiangxiu').getValue() == '%') {
        Ext.Msg.alert('提示信息', '请选择是否外委抢修');
        return;
    }
    if (Ext.getCmp('sfww').getValue() == 1 || Ext.getCmp('sfww').getValue() == '是') {
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_IP: "",
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_GUID: V_GUID,
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_DEPTNAME: Ext.getCmp('zyq').getRawValue(),
                V_V_PROJECTNAME: Ext.getCmp('xmname').getValue(),
                V_V_PLANDATE: Ext.getCmp('year').getValue() + "/" + Ext.getCmp('month').getValue(),
                V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
                V_V_SPECIALTYNAME: Ext.getCmp('zy').getRawValue(),
                V_V_SPECIALTYMANCODE: Ext.getCmp('zyfzren').getValue(),
                V_V_SPECIALTYMAN: Ext.getCmp('zyfzren').getRawValue(),
                V_F_MONEYUP: Ext.getCmp('gczgs').getValue(),
                V_F_MONEYBUDGET: Ext.getCmp('gczys').getValue(),
                V_V_REPAIRDEPTTYPE: "是",
                V_V_REPAIRDEPTCODE: "",
                V_V_REPAIRDEPT: Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT: Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE: Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO: Ext.getCmp('sftsqiangxiu').getRawValue(),
                V_V_PROJECTCODE_GS: "",
                V_V_REPAIRDEPT_GS: "",
                V_F_MONEY_GS: "",
                V_D_INDATE_GS: "",
                V_I_YEAR_PLAN: Ext.getCmp('jhyear').getValue(),
                V_I_MONTH_PLAN: Ext.getCmp('jhmonth').getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.Msg.alert('提示信息', '成功');
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

    if (Ext.getCmp('sfww').getValue() == 0 || Ext.getCmp('sfww').getValue() == '否') {
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_IP: "",
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_GUID: V_GUID,
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_DEPTNAME: Ext.getCmp('zyq').getRawValue(),
                V_V_PROJECTNAME: Ext.getCmp('xmname').getValue(),
                V_V_PLANDATE: Ext.getCmp('year').getValue() + "/" + Ext.getCmp('month').getValue(),
                V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
                V_V_SPECIALTYNAME: Ext.getCmp('zy').getRawValue(),
                V_V_SPECIALTYMANCODE: Ext.getCmp('zyfzren').getValue(),
                V_V_SPECIALTYMAN: Ext.getCmp('zyfzren').getRawValue(),
                V_F_MONEYUP: Ext.getCmp('gczgs').getValue(),
                V_F_MONEYBUDGET: Ext.getCmp('gczys').getValue(),
                V_V_REPAIRDEPTTYPE: "否",
                V_V_REPAIRDEPTCODE: Ext.getCmp('jxdw').getValue(),
                V_V_REPAIRDEPT: Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT: Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE: Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO: Ext.getCmp('sftsqiangxiu').getRawValue(),
                V_V_PROJECTCODE_GS: "",
                V_V_REPAIRDEPT_GS: "",
                V_F_MONEY_GS: "",
                V_D_INDATE_GS: "",
                V_I_YEAR_PLAN: Ext.getCmp('jhyear').getValue(),
                V_I_MONTH_PLAN: Ext.getCmp('jhmonth').getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.Msg.alert('提示信息', '成功');
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
    saveload = true;
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

function save() {
    var spyj = '';
    if (Ext.getCmp('yj').getValue() == '' || Ext.getCmp('yj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('yj').getValue();
    }
    if (!saveload) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先执行暂时保存',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('sp').getValue(), spyj],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('sp').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SP',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_IP: "",
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
                        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                        V_V_GUID: V_GUID,
                        V_V_FLAG: '审批中',
                        V_V_NEXTSPR: Ext.getCmp('sp').getValue(),
                        V_V_SP: '同意',
                        V_V_YJ: spyj

                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.success) {//成功，会传回true
                            window.close();
                            window.opener.OnPageLoad();

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

function _qxsp() {
    if (!saveload) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先执行暂时保存',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '不通过',
            parName: ["flow_yj"],
            parVal: ['作废'],
            processKey: processKey,
            businessKey: V_ORDERGUID,
            V_STEPCODE: 'end',
            V_STEPNAME: '作废',
            V_IDEA: '作废',
            V_NEXTPER: '',
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            alert("11");
            Ext.Ajax.request({
                url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SP',
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_IP: "",
                    V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
                    V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_GUID: V_GUID,
                    V_V_FLAG: '编辑',
                    V_V_NEXTSPR: Ext.getCmp('sp').getValue(),
                    V_V_SP: '同意',
                    V_V_YJ: Ext.getCmp('yj').getValue()
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);//后台返回的值
                    if (data.success) {//成功，会传回true
                        window.close();
                        window.opener.OnPageLoad();
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
    window.close();
}