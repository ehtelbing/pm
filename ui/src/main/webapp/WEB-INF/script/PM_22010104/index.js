var today = new Date();
var mingtian = new Date();
var fzload = true;
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_FLOW_CODE = '';
mingtian.setDate(mingtian.getDate() + 1)
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

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
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
var PICGUID1 ;
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
        fields: ['I_ID', 'V_GUID', 'V_PICGUID', 'V_PICMOME','V_PICPOSTFIX'],
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
        id: 'spqzstore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERID', 'V_DBGUID', 'V_FLOWSTEP', 'I_STATUS',
            'V_PERCODE', 'V_IDEA', 'V_DATE', 'D_DATE', 'V_TS',
            'V_FLOWTYPE', 'V_FLOWCODE', 'V_FLOWNAME', 'V_URL', 'V_FLOWSTEPCODE', 'V_ORDER',
            'V_DATE_B', 'V_PERSONNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_WO_FLOW_DATA_SPVIEW',
            // url: 'PRO_WO_FLOW_DATA_SPVIEW',
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
                zyqstoreload = true;
                _init();

                Ext.ComponentManager.get('sbtype').getStore().removeAll();
                ssbtype.load({
                    params: {
                        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
                    }
                });
            }
        }
    });

    var spstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'spstore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME','V_V_FLOW_STEPNAME','V_V_NEXT_SETP'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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
            extraParams: {
            }
        }),
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
        fields: ['V_DATETIME', 'V_DATE','V_TIME', 'V_YEAR', 'V_MONTH'],
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
        proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
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

    var monthStore=Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField','valueField'],
        data: months,
        proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
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
            'V_REPAIRDEPT_GS', 'F_MONEY_GS', 'D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN','V_EQUTYPE','V_EQUCODE','V_SPR'],
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

    var grid1Store=Ext.create('Ext.data.Store',{
        id : 'grid1Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'V_EQUTYPETXCODE','V_EQUTYPETXNAME','V_EQUTYPETXVALUE'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TXVAL_SELECT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid1Store
        }
    });

    var grid2Store=Ext.create('Ext.data.Store',{
        id : 'grid2Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'I_ID','V_EQUCODE','V_SPCODE','V_SPNAME',
            'V_SPTYPE','V_SPCODE_OLD','V_NUMBER','V_MEMO'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'pm_19/PRO_SAP_EQU_BOM_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid2Store
        }
    });

    var grid3Store=Ext.create('Ext.data.Store',{
        id : 'grid3Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'I_ID','V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME','V_SOURCETABLE',
            'V_SOURCEREMARK','V_SOURCEID','D_DEFECTDATE','D_INDATE','V_PERCODE',
            'V_PERNAME','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME',
            'V_EQUCODE','V_EQUNAME','V_EQUSITE','V_EQUSITENAME','V_EQUTYPECODE',
            'V_EQUTYPENAME','V_IDEA','V_STATECODE','V_STATENAME','V_STATECOLOR','V_GUID'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'pm_19/PRO_PM_DEFECT_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid3Store
        }
    });

    var grid4Store=Ext.create('Ext.data.Store',{
        id : 'grid4Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'I_ID','V_ORDERGUID','V_ORDERID','V_ORDER_TYP','V_ORDER_TYP_TXT',
            'V_FUNC_LOC','V_EQUSITENAME','V_EQUIP_NO','V_EQUIP_NAME','V_PLANT',
            'V_IWERK','D_START_DATE','D_FINISH_DATE','D_FACT_START_DATE','D_FACT_FINISH_DATE',
            'V_ACT_TYPE','V_PLANNER','V_WORK_CTR','V_SHORT_TXT','V_GSBER','V_GSBER_TXT',
            'V_WORK_AREA','V_WBS','V_WBS_TXT','V_ENTERED_BY','V_PERSONNAME','D_ENTER_DATE',
            'V_SYSTEM_STATUS','V_SYSNAME','V_ORGCODE','V_ORGNAME','V_DEPTCODE',
            'V_DEPTNAME','V_DEPTCODEREPARIR','V_DEPTNAMEREPARIR','V_DEFECTGUID','V_STATECODE',
            'V_STATENAME','V_SPARE','V_TOOL','V_TECHNOLOGY','V_SAFE','D_DATE_FK','D_DATE_ACP',
            'I_OTHERHOUR','V_OTHERREASON','V_REPAIRCONTENT','V_REPAIRSIGN','V_REPAIRPERSON',
            'V_POSTMANSIGN','V_CHECKMANCONTENT','V_CHECKMANSIGN','V_WORKSHOPCONTENT','V_WORKSHOPSIGN',
            'V_DEPTSIGN','V_SEND_STATE'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl+ 'pm_19/PRO_SAP_WORKORDER_SELECT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid4Store
        }
    });

    var grid5Store=Ext.create('Ext.data.Store',{
        id : 'grid5Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'BJ_UNIQUE_CODE','ALERT_VALUE','OFFSET','ACT_ALERT_VALUE','SUM_YEILD',
            'MATERIALCODE','MATERIALNAME','UNIT','SITE_DESC','NEWOROLD','CHANGEDATE',
            'BJ_STATUS','CYCLE_DESC'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'pm_19/PRO_RUN_EQU_BJ_ALERT_ALL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid5Store
        }
    });
    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var filegridPanel = Ext.create("Ext.panel.Panel", {
        id: 'filegridPanel',
        editable: false,
        region: 'center',
        autoScroll:true,
        height:150,
        html:"<div id='yulan'></div>",
        width: 450,
        border: 0,
        style: ' margin: 5px 0px 0px 0px;border:0',
        columnLines: true
    });

    var panel2 = Ext.create('Ext.Panel', {
        id : 'panel2',
        layout: 'column',
        defaults : {
            style : 'margin:2px',
            xtype: 'button'
        },
        items : [ {
            xtype: 'button',
            text: '暂时保存',
            icon: imgpath + '/filesave.png',
            handler: zssave,
            style: 'margin: 5px 0px 0px 2px'
        }, {
            xtype: 'button',
            text: '关闭',
            icon: imgpath + '/cross.png',
            handler: _close,
            style: 'margin: 5px 0px 0px 2px'
        }, {
            id: 'sp',
            xtype: 'combo',
            store: spstore,
            fieldLabel: '下一步审批人',
            labelWidth: 80,
            queryMode: 'local',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            style: ' margin: 5px 0px 0px 2px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '保存提交',
            icon: imgpath + '/filesave.png',
            handler: save,
            style: 'margin: 5px 0px 0px 2px'
        }]
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
                text: '审批步骤',
                dataIndex: 'V_FLOWSTEP',
                flex: 2,
                align: 'center'
            }, {
                text: '审批人',
                dataIndex: 'V_PERSONNAME',
                flex: 1,
                align: 'center'
            }, {
                text: '审批意见',
                dataIndex: 'V_IDEA',
                flex: 3,
                align: 'center'
            }, {
                text: '审批时间',
                dataIndex: 'V_DATE',
                flex: 1,
                align: 'center'
            }

        ]
    });


    var upload = Ext.create('Ext.form.Panel', {
        border:0,
        layout : 'column',
        width:500,
        defaults : { labelAlign : 'right'  },
        //参数
        baseParams:{
            V_V_GUID:V_GUID,
            V_V_PICMOME:Ext.data.IdGenerator.get('uuid').generate()
        },
        items: [
            {  xtype: 'filefield', name: 'file', id:'file', fieldLabel: '上传',
                labelWidth: 100, width:350,  size:20, msgTarget: 'side', allowBlank: false, buttonText: '选择...'
            },{ xtype: 'button', text: '上传', width: 60, style: ' border:1px solid #bebebe;', margin: '0 0 0 10',
                handler: function(){
                    var form = this.up('form').getForm();
                    form.submit({
                        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_PIC_SET',
                        method : 'POST',
                        waitMsg: '上传中...',
                        success: function (fp, o) {
                            Ext.Msg.alert('成功', '上传成功');
                            _preViewImage();
                        },
                        failure: function(form, action) { Ext.Msg.alert('提示信息', '上传失败'); }
                    });
                }
            }
        ]
    })

    var panel3 = Ext.create('Ext.form.FormPanel', {
        id : 'panel3',
        //title : '<fmt:message key="inputPanel" />',
        header : false,
        autoScroll:true,
        frame : true,
        layout : 'vbox',
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '2,0,0,0'
        },
        items : [ {
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            border:false,
            frame: true,
            baseCls: 'my-panel-no-border',
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
                    select: function (field, newValue, oldValue) {
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

            } ]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'sqtime',
                store:timeStore,
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
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'xmname',
                xtype: 'textfield',
                fieldLabel: '项目名称',
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'sbtype',
                xtype: 'combo',
                store: ssbtype,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 100,
                labelAlign: 'right',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                id: 'sbname',
                xtype: 'combo',
                store: ssbname,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 100,
                labelAlign: 'right',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
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
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
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
                value: today.getMonth()+1,
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
                width: 170,
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
                width: 70,
                displayField: 'displayField',
                valueField: 'valueField',
                value: today.getMonth()+1,
                store: monthStore,
                queryMode: 'local'
            }  ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [  {
                id: 'gczgs',
                xtype: 'textfield',
                fieldLabel: '工程总概算(万元)',
                editable: false,
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                labelWidth: 100,
                queryMode: 'local',
                allowBlank : false,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'gczys',
                xtype: 'textfield',
                fieldLabel: '工程总预算(万元)',
                editable: false,
                labelWidth: 100,
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                queryMode: 'local',
                allowBlank : false,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [  {
                id: 'sfww',
                xtype: 'combo',
                store: sfwaiweiStore,
                fieldLabel: '是否外委',
                editable: false,
                labelWidth: 100,
                value:0,
                displayField: 'NAME',
                valueField: 'VALUE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        if(Ext.getCmp('sfww').getValue() == 1 ){
                            Ext.getCmp('jxdw').setEditable(true);
                        }else{
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
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [   {
                id: 'sftsqiangxiu',
                xtype: 'combo',
                store: sftsqiangxiuStore,
                fieldLabel: '是否特殊抢修 ',
                editable: false,
                labelWidth: 100,
                value:0,
                displayField: 'NAME',
                valueField: 'VALUE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            border:0,
            items: [
                upload
                /*{
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '缺陷图片',
                labelWidth: 100,
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                labelAlign: 'right',
                inputWidth: 317,
                style: ' margin: 5px 0px 0px 0px',
                buttonText: '选择',
                allowBlank: false,
                regex: /^.*\.(jpg|png)$/i,//正则表达式，用来检验文件格式
                regexText: '请选择jgp/png图片格式！'
            } , {
                id: 'insertFilesFj',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 5px',
                handler: _upLoad
            }*/, {
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
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [  {
                //border:0,
                style: ' margin: 5px 0px 0px 50px',
                items: filegridPanel

            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                id: 'cqfa',
                xtype: 'textarea',
                fieldLabel: '采取方案 ',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                labelAlign: 'right'
            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                id: 'qxsmjfy',
                xtype: 'textarea',
                fieldLabel: '缺陷说明',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //fieldStyle:'background-color: #FFEBCD; background-image: none;',
                //baseCls: 'margin-bottom',
                readOnly:true,
                style: ' margin: 5px 0px 0px 0px',
                width: 470,
                labelAlign: 'right'
            },{
                xtype: 'button',
                text: '+',
                height:65,
                style: 'margin: 5px 5px 5px 5px',
                handler: qxSelect
                //style: 'margin: 5px 0px 10px 0px'
            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                id: 'mxxz',
                xtype: 'textarea',
                fieldLabel: '模型选择 ',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //fieldStyle:'background-color: #FFEBCD; background-image: none;',
                //baseCls: 'margin-bottom',
                readOnly:true,
                style: ' margin: 5px 0px 0px 0px',
                width: 470,
                labelAlign: 'right'
            },{
                xtype: 'button',
                text: '+',
                height:65,
                style: 'margin: 5px 5px 5px 5px',
                handler: mxSelect
                //style: 'margin: 5px 0px 10px 0px'
            }]
        }]
    });

    var centerpanel=Ext.create('Ext.panel.Panel',{
        id:'centerpanel',
        region:'center',
        layout:'border',
        //frame: true,
        //baseCls: 'my-panel-no-border',
        //width:'80%',
        items:[{xtype:'panel', region:'west',minWidth:330,layout:'hbox',frame:true,title:'设备明细',
            items:[{xtype:'panel', minWidth:330, layout:'vbox',baseCls: 'my-panel-no-border',
                items:[
                    {xtype:'textfield',id:'rsbbm',fieldLabel:'设备编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsbmc',fieldLabel:'设备名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblxbm',fieldLabel:'设备类型编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblxwz',fieldLabel:'设备类型位置',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rwzbm',fieldLabel:'位置编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rwzmc',fieldLabel:'位置名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblx',fieldLabel:'设备类型',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsbzl',fieldLabel:'设备种类',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rbs',fieldLabel:'ABC标识',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rksrq',fieldLabel:'开始日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rjsrq',fieldLabel:'结束日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rcbzx',fieldLabel:'成本中心',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rggxh',fieldLabel:'规格型号',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rdxcc',fieldLabel:'大小/尺寸',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rzczzs',fieldLabel:'资产制造商',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rgzjz',fieldLabel:'购置价值',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rdxzl',fieldLabel:'对象重量',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true}]}]},
            {xtype:'panel',region:'center',layout:'vbox',frame:true,baseCls: 'my-panel-no-border',autoScroll: true,
                items:[{xtype:'panel',frame:true,layout:'hbox',width:'100%',baseCls: 'my-panel-no-border',
                    items:[{xtype:'grid',id:'grid1',width:'50%',store:grid1Store,columnLines: true,autoScroll: true,region:'center',title:'设备特性列表',height:200,
                        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
                            { text: '特性名称', width: 150, dataIndex: 'V_EQUTYPETXNAME', align: 'center', renderer: atleft },
                            { text: '特性值', width: 150, dataIndex: 'V_EQUTYPETXVALUE', align: 'center', renderer: atleft }],
                        bbar: [{
                            id:'grid1page',
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: true,
                            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                            emptyMsg: '没有记录',
                            store: 'grid1Store'
                        }]},
                        {xtype:'grid',id:'grid2',width:'50%',store:grid2Store,columnLines: true,autoScroll: true,region:'center',title:'设备备件清单',height:200,
                            columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
                                { text: '备件编码', width: 150, dataIndex: 'V_SPCODE', align: 'center', renderer: atleft },
                                { text: '备件名称', width: 150, dataIndex: 'V_SPNAME', align: 'center', renderer: atleft },
                                { text: '数量', width: 80, dataIndex: 'V_NUMBER', align: 'center', renderer: atleft },
                                { text: '备注', width: 150, dataIndex: 'V_MEMO', align: 'center', renderer: atleft }],
                            bbar: [{
                                id:'grid2page',
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                displayInfo: true,
                                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                                emptyMsg: '没有记录',
                                store: 'grid2Store'
                            }]}]},
                    {xtype:'grid',id:'grid3',width:'100%',store:grid3Store,columnLines: true,autoScroll: true,region:'center',title:'缺陷列表',height:200,
                        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
                            { text: '发现日期', width: 150, dataIndex: 'D_DEFECTDATE', align: 'center', renderer: atleft },
                            { text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft },
                            { text: '状态', width: 150, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft },
                            { text: '发现人', width: 150, dataIndex: 'V_PERNAME', align: 'center', renderer: atleft },
                            { text: '缺陷来源', width: 150, dataIndex: 'V_SOURCENAME', align: 'center', renderer: atleft }],
                        bbar: [{
                            id:'grid3page',
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: true,
                            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                            emptyMsg: '没有记录',
                            store: 'grid3Store'
                        }]},
                    {xtype:'grid',id:'grid4',width:'100%',store:grid4Store,columnLines: true,autoScroll: true,region:'center',title:'检修工单列表',height:200,
                        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
                            { text: '工单日期', width: 150, dataIndex: 'D_ENTER_DATE', align: 'center', renderer: atleft },
                            { text: '工单内容', width: 300, dataIndex: 'V_SHORT_TXT', align: 'center', renderer: atleft },
                            { text: '检修单位', width: 150, dataIndex: 'V_DEPTNAMEREPARIR', align: 'center', renderer: atleft },
                            { text: '状态', width: 150, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft },
                            { text: '制单人', width: 150, dataIndex: 'V_PERSONNAME', align: 'center', renderer: atleft },
                            { text: '工单类型', width: 150, dataIndex: 'V_ORDER_TYP_TXT', align: 'center', renderer: atleft }],
                        bbar: [{
                            id:'grid4page',
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: true,
                            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                            emptyMsg: '没有记录',
                            store: 'grid4Store'
                        }]},
                    {xtype:'grid',id:'grid5',width:'100%',store:grid5Store,columnLines: true,autoScroll: true,region:'center',title:'设备运行台账',height:200,
                        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
                            { text: '设备位置', width: 150, dataIndex: 'SITE_DESC', align: 'center', renderer: atleft },
                            { text: '备件唯一标识', width: 300, dataIndex: 'BJ_UNIQUE_CODE', align: 'center', renderer: atleft },
                            { text: '物资编码', width: 150, dataIndex: 'MATERIALCODE', align: 'center', renderer: atleft },
                            { text: '物资描述', width: 150, dataIndex: 'MATERIALNAME', align: 'center', renderer: atleft },
                            { text: '计量单位', width: 150, dataIndex: 'UNIT', align: 'center', renderer: atleft },
                            { text: '更换时间', width: 150, dataIndex: 'CHANGEDATE', align: 'center', renderer: atleft },
                            { text: '作业量', width: 150, dataIndex: 'SUM_YEILD', align: 'center', renderer: atleft },
                            { text: '周期类型', width: 150, dataIndex: 'CYCLE_DESC', align: 'center', renderer: atleft },
                            { text: '报警值', width: 150, dataIndex: 'ALERT_VALUE', align: 'center', renderer: atleft },
                            { text: '预警偏移量', width: 150, dataIndex: 'OFFSET', align: 'center', renderer: atleft },
                            { text: '备件状态', width: 150, dataIndex: 'BJ_STATUS', align: 'center', renderer: atleft }],
                        bbar: [{
                            id:'grid5page',
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: true,
                            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                            emptyMsg: '没有记录',
                            store: 'grid5Store'
                        }]}]}]
    });

    Ext.create('Ext.container.Viewport', {
        id: "viewport",
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
            items : [ panel2 ]
        }, {
            region : 'west',
            layout : 'fit',
            border : false,
            items : [ panel3 ]
        } , {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ centerpanel ]
        }]
    });


    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
     );

     });*/
    _ck_zyqload();
    //_spload();
    zyq_jxdwload();



    _preViewImage();//初始加载图片

    Ext.ComponentManager.get("zyq").on("change", function () {
        Ext.ComponentManager.get('sbtype').getStore().removeAll();
        ssbtype.load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
            }
        });
    });

    ssbtype.on("load", function () {
        //Ext.getCmp("sbtype").select(ssbtype.findRecord('V_EQUTYPENAME', '全部'));
        //Ext.getCmp("sbtype").select(ssbtype.getAt(0));
        ssbname.load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sbtype').getValue()

            }
        });


    });

    Ext.getCmp("sbtype").on("change", function () {
        Ext.ComponentManager.get('sbname').getStore().removeAll();
        ssbname.load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sbtype').getValue()
            }
        });
    });

    ssbname.on("load", function () {
        Ext.getCmp("sbname").select(ssbname.getAt(0));
        QueryList();
        QueryGrid1();
        QueryGrid2();
        QueryGrid3();
        QueryGrid4();
        QueryGrid5();
    });

    Ext.getCmp("sbname").on("change", function () {
        QueryList();
        QueryGrid1();
        QueryGrid2();
        QueryGrid3();
        QueryGrid4();
        QueryGrid5();
    });

    _init();
    getReturnQX();
    getReturnMX();
})
function beforeGrid1Store(store){
    store.proxy.extraParams.V_V_EQUCODE =Ext.getCmp('sbname').getValue();
    store.proxy.extraParams.V_V_EQUTYPECODE = Ext.getCmp('sbtype').getValue();
}

function beforeGrid2Store(store){
    store.proxy.extraParams.V_V_EQUCODE = Ext.getCmp('sbname').getValue();
}

function beforeGrid3Store(store){
    store.proxy.extraParams.V_D_DEFECTDATE_B = '1999-1-1';
    store.proxy.extraParams.V_D_DEFECTDATE_E='2099-1-1';
    store.proxy.extraParams.V_V_DEPTCODE='%';
    store.proxy.extraParams.V_V_EQUTYPECODE='%';
    store.proxy.extraParams.V_V_EQUCODE=Ext.getCmp('sbname').getValue();
    store.proxy.extraParams.V_V_STATECODE='%';
    store.proxy.extraParams.V_V_SOURCECODE='%';
    store.proxy.extraParams.V_V_DEFECTLIST='%';
}

function beforeGrid4Store(store){
    store.proxy.extraParams.V_D_ENTER_DATE_B ='1999-1-1';
    store.proxy.extraParams.V_D_ENTER_DATE_E = '2099-1-1';
    store.proxy.extraParams.V_V_ORGCODE = '%';
    store.proxy.extraParams.V_V_DEPTCODE = '%';
    store.proxy.extraParams.V_V_DEPTCODEREPARIR = '';
    store.proxy.extraParams.V_V_STATECODE = '%';
    store.proxy.extraParams.V_EQUTYPE_CODE = '%';
    store.proxy.extraParams.V_EQU_CODE = Ext.getCmp('sbname').getValue();
    store.proxy.extraParams.V_DJ_PERCODE = '%';
    store.proxy.extraParams.V_V_SHORT_TXT = '%';
    store.proxy.extraParams.V_V_BJ_TXT = '%';
    store.proxy.extraParams.V_V_ORDER_TYP = '%';
}

function beforeGrid5Store(store){
    store.proxy.extraParams.A_EQUID = Ext.getCmp('sbname').getValue();
    store.proxy.extraParams.A_CYCLE_ID = '%';
}
function _init(){
    if(ckstoreload && zyqstoreload && zystoreload && fzload)
    {
        ckstoreload = false;
        zyqstoreload = false;
        zystoreload = false;



        var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
        zyfzrenstore.proxy.extraParams = {
            V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
            V_V_POSTCODE : '0101020104',
            V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
        };
        //matGroupSecondStore.currentPage = 1;
        zyfzrenstore.load();

        /*Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='###'>删除</a></span> </td > <td align='center'> <span><a href='###'>删除</a></span></td> <td align='center'> <span><a href='####'>删除</a></span></td> <td></td> </tr> </table> </div>"
         );*/

        var spstore = Ext.data.StoreManager.lookup('spstore');
        spstore.proxy.extraParams = {
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_REPAIRCODE: '',
            V_V_FLOWTYPE: 'Project',
            V_V_FLOW_STEP: 'start',
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
            V_V_WHERE: ''

        };
        spstore.load();


        var gridStore = Ext.data.StoreManager.lookup('gridStore');
        gridStore.proxy.extraParams = {
            V_V_IP: "",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_GUID: V_GUID

        };
        //matGroupThirdStore.currentPage = 1;

        gridStore.load();
        //alert(1.5);
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
       // console.log(gridStore.getAt(0).get('V_REPAIRDEPT'));
        Ext.getCmp('jxdw').setValue(gridStore.getAt(0).get('V_REPAIRDEPT'));
        Ext.getCmp('sftsqiangxiu').setValue(gridStore.getAt(0).get('I_RUSHTO'));
        Ext.getCmp('qxsmjfy').setValue(gridStore.getAt(0).get('V_DEFECT'));
        Ext.getCmp('cqfa').setValue(gridStore.getAt(0).get('V_MEASURE'));

        Ext.getCmp('sbtype').setValue(gridStore.getAt(0).get('V_EQUTYPE'));
        Ext.getCmp('sbname').setValue(gridStore.getAt(0).get('V_EQUCODE'));
        Ext.getCmp('sp').setValue(gridStore.getAt(0).get('V_SPR'));
        V_FLOW_CODE =gridStore.getAt(0).get('V_PROJECTCODE');
        var imagestore = Ext.data.StoreManager.lookup('imagestore');
        imagestore.proxy.extraParams = {
            V_V_GUID: V_GUID
        };

        imagestore.load();


        var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
        spqzstore.proxy.extraParams = {
            V_V_DBGUID : V_GUID
        };
        //alert(1.9);
        spqzstore.load();
        //alert(2.0);


        fzload = false;



        Ext.getBody().unmask();




    }


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
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _ck_zyfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
        V_V_POSTCODE : '0101020104',
        V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();

}

function _ck_zyqfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
        V_V_POSTCODE : '0101020104',
        V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();

}

function zyq_jxdwload() {
    var jxdwstore = Ext.data.StoreManager.lookup('jxdwstore');
    jxdwstore.proxy.extraParams = {
        V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwstore.load();

}

function _jhyear(){
    Ext.getCmp('jhyear').setValue(Ext.getCmp('year').getValue());
}

function _jhmonth(){
    Ext.getCmp('jhmonth').setValue(Ext.getCmp('month').getValue());
}

function _spload(){
    var spstore = Ext.data.StoreManager.lookup('spstore');
    spstore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'Project',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''

    };
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
    imagestore.load();

    picguidbegin = V_PICGUID1;

    var tmpl = "";
    for(var i=0;i<imagestore.getCount();i++){

        tmpl+= "<td style='text-align: center; vertical-align: middle; padding-top:10px;'> <img src='"+AppUrl + 'PM_22/getPic?filePath='+ V_GUID+"" +
            "&pic="+imagestore.getAt(i).get('V_PICGUID')+
            "&suffix="+imagestore.getAt(i).get('V_PICPOSTFIX')+"' width='120px' height='100px' />" +
            "<br> <a href='javascript:void(0);' onclick=\"_delete('"+imagestore.getAt(i).get('V_PICGUID')+"','"+imagestore.getAt(i).get('V_PICPOSTFIX')+"')\">删除</a></td> ";
    }
    $("#yulan").html("<table  width='300' border='0'><tr> " + tmpl + "</tr> </table>");

}



function _delete(id,suffix)
{
    if(id == null || id == "")
    {
        Ext.Msg.alert('提示信息', '请选择一张图片');
    }else{
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
                            V_V_PICGUID : id,
                            suffix:suffix
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                Ext.Msg.alert('提示信息', '删除成功');
                                V_PICGUID1="";
                                V_PICGUID2="";
                                V_PICGUID3="";
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


function zssave()
{
    if (Ext.getCmp('gczgs').getValue() =="" || Ext.getCmp('gczgs').getValue() == 0) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入工程总概算',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('xmname').getValue() =="") {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入项目名称',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('gczys').getValue() =="" || Ext.getCmp('gczys').getValue() == 0) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入工程总预算',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    if(Ext.getCmp('sfww').getValue() == '%' || Ext.getCmp('sftsqiangxiu').getValue() == '%'){
        Ext.Msg.alert('提示信息', '请选择是否外委抢修');
        return;
    }
    if(Ext.getCmp('sfww').getValue() == 1 || Ext.getCmp('sfww').getValue() == '是'){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_SET_NEW',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_IP : "",
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
                V_V_GUID : V_GUID,
                V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
                V_V_DEPTNAME : Ext.getCmp('zyq').getRawValue(),
                V_V_PROJECTNAME : Ext.getCmp('xmname').getValue(),
                V_V_PLANDATE : Ext.getCmp('year').getValue()+"/"+Ext.getCmp('month').getValue(),
                V_V_SPECIALTY :Ext.getCmp('zy').getValue(),
                V_V_SPECIALTYNAME :Ext.getCmp('zy').getRawValue(),
                V_V_SPECIALTYMANCODE : Ext.getCmp('zyfzren').getValue(),
                V_V_SPECIALTYMAN :Ext.getCmp('zyfzren').getRawValue(),
                V_F_MONEYUP : Ext.getCmp('gczgs').getValue(),
                V_F_MONEYBUDGET : Ext.getCmp('gczys').getValue(),
                V_V_REPAIRDEPTTYPE : "是",
                V_V_REPAIRDEPTCODE : "",
                V_V_REPAIRDEPT : Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT : Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE : Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO : Ext.getCmp('sftsqiangxiu').getRawValue(),
                V_V_PROJECTCODE_GS : "",
                V_V_REPAIRDEPT_GS : "",
                V_F_MONEY_GS : "",
                V_D_INDATE_GS : "",
                V_I_YEAR_PLAN : Ext.getCmp('jhyear').getValue(),
                V_I_MONTH_PLAN : Ext.getCmp('jhmonth').getValue(),
                V_V_EQUTYPE : Ext.getCmp('sbtype').getValue(),
                V_V_EQUCODE : Ext.getCmp('sbname').getValue(),
                V_V_SPR : Ext.getCmp('sp').getValue()

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

    if(Ext.getCmp('sfww').getValue() == 0 || Ext.getCmp('sfww').getValue() == '否'){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_SET_NEW',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_IP : "",
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
                V_V_GUID : V_GUID,
                V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
                V_V_DEPTNAME : Ext.getCmp('zyq').getRawValue(),
                V_V_PROJECTNAME : Ext.getCmp('xmname').getValue(),
                V_V_PLANDATE : Ext.getCmp('year').getValue()+"/"+Ext.getCmp('month').getValue(),
                V_V_SPECIALTY :Ext.getCmp('zy').getValue(),
                V_V_SPECIALTYNAME :Ext.getCmp('zy').getRawValue(),
                V_V_SPECIALTYMANCODE : Ext.getCmp('zyfzren').getValue(),
                V_V_SPECIALTYMAN :Ext.getCmp('zyfzren').getRawValue(),
                V_F_MONEYUP : Ext.getCmp('gczgs').getValue(),
                V_F_MONEYBUDGET : Ext.getCmp('gczys').getValue(),
                V_V_REPAIRDEPTTYPE : "否",
                V_V_REPAIRDEPTCODE : Ext.getCmp('jxdw').getValue(),
                V_V_REPAIRDEPT : Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT : Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE : Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO : Ext.getCmp('sftsqiangxiu').getRawValue(),
                V_V_PROJECTCODE_GS : "",
                V_V_REPAIRDEPT_GS : "",
                V_F_MONEY_GS : "",
                V_D_INDATE_GS : "",
                V_I_YEAR_PLAN : Ext.getCmp('jhyear').getValue(),
                V_I_MONTH_PLAN : Ext.getCmp('jhmonth').getValue(),

                V_V_EQUTYPE : Ext.getCmp('sbtype').getValue(),
                V_V_EQUCODE : Ext.getCmp('sbname').getValue(),
                V_V_SPR : Ext.getCmp('sp').getValue()
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


function save()
{
    if (!saveload) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请先执行暂时保存',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SEND',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_IP : "",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE : Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
            V_V_GUID : V_GUID,
            V_I_STATE : "sbzyz",
            V_V_FLAG : '审批中',
            V_V_NEXTSPR :Ext.getCmp('sp').getValue(),

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                Ext.Ajax.request({
                    url: AppUrl + 'Activiti/StratProcess',
                    async: false,
                    method: 'post',
                    params: {
                        parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj","flow_type"],
                        parVal: [Ext.util.Cookies.get('v_personcode'), V_GUID, Ext.getCmp('sp').getValue(), "请审批!", Ext.getCmp('xmname').getValue(), V_FLOW_CODE, "请审批！","Project"],
                        processKey: processKey,
                        businessKey: V_GUID,
                        V_STEPCODE: 'Start',
                        V_STEPNAME: V_STEPNAME,
                        V_IDEA: '请审批！',
                        V_NEXTPER: Ext.getCmp('sp').getValue(),
                        V_INPER: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (response) {
                        if (Ext.decode(response.responseText).ret == 'OK') {
                            var owidth = window.document.body.offsetWidth ;
                            var oheight = window.document.body.offsetHeight;
                            window.opener.queryGrid();
                            window.open(AppUrl + 'page/PM_22010102/index.html?V_GUID=' + V_GUID  + '&V_PICGUID1='+ V_PICGUID1 + '&V_PICGUID2='+ V_PICGUID2 + '&V_PICGUID3=' + V_PICGUID3 + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
                            _close();
                        } else if (Ext.decode(response.responseText).error == 'ERROR') {
                            Ext.Msg.alert('提示', '该流程发起失败！');
                        }
                    }
                });

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

function _qxsp()
{
    if (!saveload) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请先执行暂时保存',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SP',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_IP :"",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE : Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
            V_V_GUID: V_GUID,
            V_V_FLAG :'编辑',
            V_V_NEXTSPR : Ext.getCmp('sp').getValue(),
            V_V_SP : '同意',
            V_V_YJ : Ext.getCmp('yj').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                Ext.MessageBox.alert('提示', '取消审批成功', callBack);
                function callBack(id) {
                    // alert('单击的按钮id是：'+id);
                    //_spupdate();
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

function _close()
{
    window.close();
}

function qxSelect(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_22010106/index.html?V_GUID='+V_GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');

}

function getReturnQX(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYPRO',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_PROJECT_GUID: V_GUID,
            V_V_FLAG : '0'
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);//后台返回的值

            var resdata='';
            for(var i=0;i<resp.list.length;i++){
                if(i==0){
                    resdata=resp.list[i].V_DEFECTLIST;
                }else{
                    resdata+=','+resp.list[i].V_DEFECTLIST;
                }
            }
            Ext.getCmp('qxsmjfy').setValue(resdata);
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
function mxSelect(){
    if(Ext.getCmp('sbtype').getValue()=='%'){
        alert("请选择设备类型");
        return;
    }
    if(Ext.getCmp('sbname').getValue()=='%'){
        alert("请选择设备名称");
        return;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_22010105/index.html?V_GUID=' + V_GUID + '&V_ORGCODE=' +
        Ext.getCmp('ck').getValue() + '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue() + '&V_EQUTYPE=' + Ext.getCmp('sbtype').getValue() + '&V_EQUCODE=' +
        Ext.getCmp('sbname').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');

}
function getReturnMX(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SEL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_PROJECT_GUID: V_GUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);//后台返回的值

            var resdata='';
            for(var i=0;i<resp.list.length;i++){
                if(i==0){
                    resdata=resp.list[i].V_MX_NAME;
                }else{
                    resdata+=','+resp.list[i].V_MX_NAME;
                }
            }
            Ext.getCmp('mxxz').setValue(resdata);
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

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}

function QueryList(){
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params:{
            V_V_EQUCODE:Ext.getCmp("sbname").getValue()
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.list.length!=0){
                Ext.getCmp('rsbbm').setValue(resp.list[0].V_EQUCODE);//设备编码
                Ext.getCmp('rsbmc').setValue(resp.list[0].V_EQUNAME);//设备名称
                Ext.getCmp('rsblxbm').setValue(resp.list[0].V_EQUTYPECODE);//设备类型编码
                Ext.getCmp('rsblxwz').setValue(resp.list[0].V_EQUTYPENAME);//设备类型位置
                Ext.getCmp('rwzbm').setValue(resp.list[0].V_EQUSITE);//位置编码
                Ext.getCmp('rwzmc').setValue(resp.list[0].V_EQUSITENAME);//位置名称
                Ext.getCmp('rsblx').setValue(resp.list[0].V_EQUTYPENAME);//设备类型
                Ext.getCmp('rsbzl').setValue(resp.list[0].V_EQULEVNAME);//设备种类
                Ext.getCmp('rbs').setValue(resp.list[0].V_ABC);//ABC标识
                Ext.getCmp('rksrq').setValue(resp.list[0].V_DATE_B);//开始日期
                Ext.getCmp('rjsrq').setValue(resp.list[0].V_DATE_E);//结束日期
                Ext.getCmp('rcbzx').setValue(resp.list[0].V_CASTNAME);//成本中心
                Ext.getCmp('rggxh').setValue(resp.list[0].V_GGXH);//规格型号
                Ext.getCmp('rdxcc').setValue(resp.list[0].V_SIZE);//大小/尺寸
                Ext.getCmp('rzczzs').setValue(resp.list[0].V_ZZS);//资产制造商
                Ext.getCmp('rgzjz').setValue(resp.list[0].F_MONEY);//购置价值
                Ext.getCmp('rdxzl').setValue(resp.list[0].F_WEIGHT);//对象重量
            }
        }
    });
}

function QueryGrid1(){
    Ext.data.StoreManager.lookup('grid1Store').load({
        params:{
            V_V_EQUCODE:Ext.getCmp("sbname").getValue(),
            V_V_EQUTYPECODE:Ext.getCmp("sbtype").getValue()
        }
    });
}
function QueryGrid2(){
    Ext.data.StoreManager.lookup('grid2Store').load({
        params:{
            V_V_EQUCODE:Ext.getCmp("sbname").getValue()
        }
    });
}
function QueryGrid3(){
    Ext.data.StoreManager.lookup('grid3Store').load({
        params:{
            V_D_DEFECTDATE_B:'1999-1-1',
            V_D_DEFECTDATE_E:'2099-1-1',
            V_V_DEPTCODE:'%',
            V_V_EQUTYPECODE:'%',
            V_V_EQUCODE:Ext.getCmp("sbname").getValue(),
            V_V_STATECODE:'%',
            V_V_SOURCECODE:'%',
            V_V_DEFECTLIST:'%'
        }
    });
}
function QueryGrid4(){
    Ext.data.StoreManager.lookup('grid4Store').load({
        params:{
            V_D_ENTER_DATE_B:'1999-1-1',
            V_D_ENTER_DATE_E:'2099-1-1',
            V_V_ORGCODE:'%',
            V_V_DEPTCODE:'%',
            V_V_DEPTCODEREPARIR:'',
            V_V_STATECODE:'%',
            V_EQUTYPE_CODE:'%',
            V_EQU_CODE:Ext.getCmp("sbname").getValue(),
            V_DJ_PERCODE:'%',
            V_V_SHORT_TXT:'%',
            V_V_BJ_TXT:'%',
            V_V_ORDER_TYP:'%'
        }
    });
}
function QueryGrid5(){
    Ext.data.StoreManager.lookup('grid5Store').load({
        params:{
            A_EQUID:Ext.getCmp("sbname").getValue(),
            A_CYCLE_ID:'%'
        }
    });
}
