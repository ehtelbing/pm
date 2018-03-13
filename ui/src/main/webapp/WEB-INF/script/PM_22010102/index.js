var today = new Date();
var mingtian = new Date();
var LODOP = "";
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

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
    (parameters.V_PICGUID1 == undefined) ? V_PICGUID1 = '' : V_PICGUID1 = parameters.V_PICGUID1;
    (parameters.V_PICGUID2 == undefined) ? V_PICGUID2 = '' : V_PICGUID2 = parameters.V_PICGUID2;
    (parameters.V_PICGUID3 == undefined) ? V_PICGUID3 = '' : V_PICGUID3 = parameters.V_PICGUID3;
}

var ckstoreload = false;
var zyqstoreload = false;
var zystoreload = false;
var index01 = 2;
var index02 = 1;
var index03 = 0;
var PICGUID1;
var picguidbegin = V_PICGUID1;
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

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'I_YEAR', 'I_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'D_DATE', 'V_PROJECTCODE',
            'V_PROJECTNAME', 'V_PLANDATE', 'V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTYMANCODE', 'V_SPECIALTYMAN',
            'F_MONEYUP', 'F_MONEYBUDGET', 'V_REPAIRDEPTTYPE', 'V_REPAIRDEPTCODE', 'V_REPAIRDEPT',
            'V_DEFECT', 'V_MEASURE', 'V_MONEY', 'V_INMAN', 'V_INMANCODE',
            'D_INDATE', 'I_STATE', 'V_FLAG', 'I_RUSHTO', 'V_PROJECTCODE_GS',
            'V_REPAIRDEPT_GS', 'F_MONEY_GS', 'D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN','V_EQUTYPENAME','V_EQUNAME'],
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

   /* var spqzstore = Ext.create('Ext.data.Store', {
        id: 'spqzstore',
        autoLoad: false,
        fields: ['AssigneeName','Assignee', 'ActivityName', 'EndTime', 'Idea', 'ActivityId', 'ActivityType', 'StartTime', 'Id'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            //url: AppUrl + 'PM_22/PRO_WO_FLOW_DATA_SPVIEW',
            // url: 'PRO_WO_FLOW_DATA_SPVIEW',
            url: AppUrl + 'Activiti/InstanceState',
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
    });*/

    var spqzstore = Ext.create('Ext.data.Store', {
        storeId: 'spqzstore',
        autoLoad: false,
        pageSize: 15,
        fields: ['AssigneeName','Assignee', 'ActivityName', 'EndTime', 'Idea', 'ActivityId', 'ActivityType', 'StartTime', 'Id'],
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

    var grid6Store=Ext.create('Ext.data.Store',{
        id : 'grid6Store',
        pageSize : 20,
        autoLoad : false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYPRO',
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
            beforeload: beforeGrid6Store
        }
    });

    var grid7Store=Ext.create('Ext.data.Store',{
        id : 'grid7Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SEL',
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
            beforeload: beforeGrid7Store
        }
    });


    var gridRGStore=Ext.create('Ext.data.Store',{
        id : 'gridRGStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_PERCODE_DE',
            'V_PERNAME_DE',
            'V_PERTYPE_DE',
            'RGNUM'

        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_RG_SEL',
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
            beforeload: beforeGridRGStore
        }
    });
    var gridJJStore=Ext.create('Ext.data.Store',{
        id : 'gridJJStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_JJ_CODE',
            'V_JJ_NAME',
            'JJNUM',
            'V_JJ_TYPE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_JJ_SEL',
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
            beforeload: beforeGridJJStore
        }
    });
    var gridBJStore=Ext.create('Ext.data.Store',{
        id : 'gridBJStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_WLCODE',
            'V_WLSM',
            'V_JLDW',
            'V_GGXH',
            'BJNUM',
            'BJPRICE'

        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_BJ_SEL',
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
            beforeload: beforeGridBJStore
        }
    });
    var filegridPanel = Ext.create("Ext.panel.Panel", {
        id: 'filegridPanel',
        editable: false,
        region: 'center',
        autoScroll:true,
        height:120,
        html:"<div id='yulan'></div>",
        width: 450,
        border: 0,
        style: ' margin: 5px 0px 0px 0px;border:0',
        columnLines: true
    });

    /*var filegridPanel2 = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel2',
        region: 'center',
        height: 200,
        width: '100%',
        columnLines: true,
        store: spqzstore,
        autoScroll: true,
        // margin: '10px 0 0 125px',
        //colspan: 3,
        columns: [{
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
        }]
    });*/
    var gridPanel = Ext.create('Ext.grid.Panel', {
        id : 'gridPanel',
        store : spqzstore,
        frame : true,
        height:'28%',
        columnLines : true,
        region: 'south',
        autoScroll:true,
        columns : [ {
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
        }]
    });


    var panel2 = Ext.create('Ext.Panel', {
        id : 'panel2',
        layout: 'column',
        defaults : {
            style : 'margin:2px',
            xtype: 'button'
        },
        items : [{
            xtype: 'button',
            text: '打印预览',
            icon: imgpath + '/preview.png',
            handler: _printPreview
            //style: 'margin: 5px 0px 10px 0px'
        }, {
            xtype: 'button',
            text: '关闭',
            icon: imgpath + '/cross.png',
            handler: _close
            //style: 'margin: 5px 0px 10px 0px'
        } ]
    });


    var panel3 = Ext.create('Ext.form.FormPanel', {
        id : 'panel3',
        //title : '<fmt:message key="inputPanel" />',
        header : false,
        frame : true,
        region : 'west',
        layout : 'vbox',
        autoScroll:true,
        height: '80%',
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
                xtype: 'textfield',
                // store: ckstore,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                readOnly : true,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 250
            }, {
                id: 'zyq',
                xtype: 'textfield',
                //store: zyqstore,
                fieldLabel: '作业区',
                readOnly : true,
                editable: false,
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                labelAlign: 'right',
                style: ' margin: 5px 0px 0px 0px',
                width: 250

            } ]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'sqtime',
                //store:timeStore,
                xtype: 'textfield',
                fieldLabel: '申请日期',
                readOnly : true,
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
                readOnly : true,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }  ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                id: 'xmname',
                xtype: 'textfield',
                fieldLabel: '项目名称',
                readOnly : true,
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
                xtype: 'textfield',
                //store: ssbtype,
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
                xtype: 'textfield',
                //store: ssbname,
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
                xtype: 'textfield',
                //store: zystore,
                fieldLabel: '专业',
                readOnly : true,
                editable: false,
                labelWidth: 100,
                displayField: 'V_MAJOR_NAME',
                valueField: 'V_MAJOR_CODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'zyfzren',
                xtype: 'textfield',
                readOnly : true,
                //store: zyfzrenstore,
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
            }  ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [  {
                xtype: 'textfield',
                id: 'year',
                fieldLabel: '计划施工日期:',
                readOnly : true,
                editable: false,
                style: ' margin: 5px 0px 0px 0px',
                labelWidth: 100,
                width: 250,
                displayField: 'displayField',
                valueField: 'valueField',
                //value: today.getFullYear(),
                //store: yearStore,
                queryMode: 'local',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'jhyear',
                fieldLabel: '计划年月:',
                readOnly : true,
                editable: false,
                style: ' margin: 5px 0px 0px 0px',
                labelWidth: 100,
                width: 160,
                displayField: 'displayField',
                valueField: 'valueField',
                // value: today.getFullYear(),
                //store: yearStore,
                queryMode: 'local',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'jhmonth',
                editable: false,
                readOnly : true,
                style: ' margin: 5px 0px 0px 10px',
                //labelWidth: 40,
                width: 80,
                displayField: 'displayField',
                valueField: 'valueField',
                // value: today.getMonth()+1,
                // store: monthStore,
                queryMode: 'local'
            }  ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                id: 'gczgs',
                xtype: 'textfield',
                readOnly : true,
                fieldLabel: '工程总概算(万元)',
                editable: false,
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
                readOnly : true,
                fieldLabel: '工程总预算(万元)',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                allowBlank: false,
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
                xtype: 'textfield',
                readOnly : true,
                //store: sfwaiweiStore,
                fieldLabel: '是否外委',
                editable: false,
                labelWidth: 100,
                value: 1,
                displayField: 'NAME',
                valueField: 'VALUE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 250,
                labelAlign: 'right'
            }, {
                id: 'jxdw',
                xtype: 'textfield',
                //store: jxdwstore,
                readOnly : true,
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
                readOnly : true,
                xtype: 'textfield',
                //store: sftsqiangxiuStore,
                fieldLabel: '是否特殊抢修 ',
                editable: false,
                labelWidth: 100,
                value:1,
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
            items: [  {
                id: 'cqfa',
                xtype: 'textarea',
                fieldLabel: '采取方案 ',
                readOnly : true,
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
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
                fieldLabel: '缺陷说明 ',
                editable: false,
                readOnly : true,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
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
            }]
        }]
    });
    var grid6 = Ext.create('Ext.grid.Panel', {
        id:'grid6',width:'50%',store:grid6Store,columnLines: true,autoScroll: true,region:'center',title:'缺陷列表',height:200,
        columns:[{
            text : '序号',
            xtype : 'rownumberer',
            width : 50,
            sortable : false
        }, {
            text : '单位',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷状态',
            dataIndex : 'V_STATENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷类型',
            dataIndex : 'V_SOURCENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷日期',
            dataIndex : 'D_DEFECTDATE',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTime
        }, {
            text : '缺陷明细',
            dataIndex : 'V_DEFECTLIST',
            align : 'center',
            width : 700,
            renderer : CreateGridColumnTd
        }, {
            text : '设备',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTd
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITE',
            align : 'center',
            width : 300,
            renderer : CreateGridColumnTd
        }, {
            text : '负责人',
            dataIndex : 'V_PERNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '处理意见',
            dataIndex : 'V_IDEA',
            align : 'center',
            renderer : CreateGridColumnTd
        }],
        bbar: [{
            id:'grid6page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'grid6Store'
        }]
    });
    var grid7 = Ext.create('Ext.grid.Panel', {
        id:'grid7',width:'100%',height:'50%',store:grid7Store,columnLines: true,autoScroll: true,region:'center',title:'模型列表',height:200,
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检修模型编码',
            dataIndex: 'V_MX_CODE',
            align: 'center',
            width: 150
        }, {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 150
        },  {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 150
        }],
        bbar: [{
            id:'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'grid7Store'
        }],
        listeners : {
            itemclick : itemclick
        }
    });
    var rgPanel = Ext.create('Ext.grid.Panel', {
        id: 'rgPanel',
        title:'人工',
        store: gridRGStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'north',
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '工种编码',
            dataIndex: 'V_PERCODE_DE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '工种名称',
            dataIndex: 'V_PERNAME_DE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '工种类型',
            dataIndex: 'V_PERTYPE_DE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '台时',
            dataIndex: 'RGNUM',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'rgpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridRGStore'
        }]
    });
    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
        title:'机具',
        store: gridJJStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'center',
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '机具编码',
            dataIndex: 'V_JJ_CODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '机具名称',
            dataIndex: 'V_JJ_NAME',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '机具类型',
            dataIndex: 'V_JJ_TYPE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '台时',
            dataIndex: 'JJNUM',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'jjpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridJJStore'
        }]
    });
    var bjPanel = Ext.create('Ext.grid.Panel', {
        id: 'bjPanel',
        title:'备件',
        store: gridBJStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'south',
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '物料编码',
            dataIndex: 'V_WLCODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '物料描述',
            dataIndex: 'V_WLSM',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'V_GGXH',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'V_JLDW',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '使用数量',
            dataIndex: 'BJNUM',
            align: 'center',
            width: 150, renderer: atright
        }, {
            text: '单价',
            dataIndex: 'BJPRICE',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'bjpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridBJStore'
        }]
    });
    var tab2 = Ext.create('Ext.tab.Panel', {
        id:'tab2',
        title:'已选信息',
        frame:true,
        region : 'center',
        //layout : 'border',
        items: [grid6,grid7,rgPanel,jjPanel,bjPanel
        ]
    });

    var rightPanel = Ext.create('Ext.Panel', {
        id : 'rightPanel',
        layout : 'border',
        border : false,
        items : [ panel3,tab2,gridPanel]
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
            items : [ panel2]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ rightPanel ]
        } ]
    });



    _init();

    _preViewImage();//初始加载图片
    queryRG();
    queryJJ();
    queryBJ();
    getReturnQX();
    getReturnMX();
})

function _init() {


    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_IP: "",
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
        V_V_GUID: V_GUID

    };
    //matGroupThirdStore.currentPage = 1;

    gridStore.load();
    Ext.getCmp('ck').setValue(gridStore.getAt(0).get('V_ORGNAME'));
    Ext.getCmp('zyq').setValue(gridStore.getAt(0).get('V_DEPTNAME'));
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
    Ext.getCmp('jxdw').setValue(gridStore.getAt(0).get('V_REPAIRDEPT'));
    Ext.getCmp('sftsqiangxiu').setValue(gridStore.getAt(0).get('I_RUSHTO'));
    Ext.getCmp('qxsmjfy').setValue(gridStore.getAt(0).get('V_DEFECT'));
    Ext.getCmp('cqfa').setValue(gridStore.getAt(0).get('V_MEASURE'));

    Ext.getCmp('sbtype').setValue(gridStore.getAt(0).get('V_EQUTYPENAME'));
    Ext.getCmp('sbname').setValue(gridStore.getAt(0).get('V_EQUNAME'));

    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    imagestore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };

    imagestore.load();


    index01 = imagestore.getCount() - 1;
    index02 = imagestore.getCount() - 2;
    index03 = imagestore.getCount() - 3;


    var ProcessInstanceId='';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            businessKey: V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if(data.msg == 'Ok'){
                ProcessInstanceId=data.InstanceId;
            }


        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

    _select(ProcessInstanceId);
}

function _select(ProcessInstanceId) {
    var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
    spqzstore.proxy.extraParams = {
        instanceId: ProcessInstanceId
    };
    spqzstore.currentPage = 1;
    spqzstore.load();

}
function beforeGrid6Store(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_FLAG = '0';
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('grid6page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('grid6page').store.pageSize;
}
function beforeGrid7Store(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('grid7page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('grid7page').store.pageSize;

}
function beforeGridRGStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('rgpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('rgpage').store.pageSize;

}
function beforeGridJJStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('jjpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('jjpage').store.pageSize;

}
function beforeGridBJStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('bjpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('bjpage').store.pageSize;

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
            //"<br> <a href='javascript:void(0);' onclick=\"_delete('"+imagestore.getAt(i).get('V_PICGUID')+"','"+imagestore.getAt(i).get('V_PICPOSTFIX')+"')\">删除</a>" +
            "</td> ";
    }
    $("#yulan").html("<table  width='300' border='0'><tr> " + tmpl + "</tr> </table>");

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
    if (Ext.getCmp('sfww').getValue() == 1) {
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
                V_V_REPAIRDEPTTYPE: "1",
                V_V_REPAIRDEPTCODE: "",
                V_V_REPAIRDEPT: Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT: Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE: Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO: Ext.getCmp('sftsqiangxiu').getValue(),
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

    if (Ext.getCmp('sfww').getValue() == 0) {
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
                V_V_REPAIRDEPTTYPE: "0",
                V_V_REPAIRDEPTCODE: Ext.getCmp('jxdw').getValue(),
                V_V_REPAIRDEPT: Ext.getCmp('jxdw').getRawValue(),
                V_V_DEFECT: Ext.getCmp('qxsmjfy').getValue(),
                V_V_MEASURE: Ext.getCmp('cqfa').getValue(),
                V_I_RUSHTO: Ext.getCmp('sftsqiangxiu').getValue(),
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
        url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SEND',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_IP: "",
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_GUID: V_GUID,
            V_I_STATE: "sbzyz",
            V_V_FLAG: '审批中',
            V_V_NEXTSPR: Ext.getCmp('sp').getValue(),

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                Ext.Msg.alert('提示信息', '成功');
                var owidth = window.document.body.offsetWidth - 800;
                var oheight = window.document.body.offsetHeight - 200;
                window.open(AppUrl + 'page/PM_1403/index.html?V_GUID=' + V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
                _close();
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

function _close() {
    window.close();
}

function _printPreview() {
    //var records = Ext.getCmp('formPanel').getSelectionModel().getSelection();
    // var target = _target();



    if (_initPlugin()) {
        // window.showModalDialog('viewPrint' + target + '.do?FORM_ID_=' + records[0].get('FORM_ID_') + '&action=print&processInstanceId=' + records[0].get('PROCESS_INSTANCE_ID_') + '&random=' + Math.random(), window, 'resizable=yes; dialogWidth=0px; dialogHeight=0px');
        window.showModalDialog(AppUrl + "/page/PM_2201010201/index.html?action=printPreview&V_GUID="+ V_GUID +"&V_PICGUID1="+ V_PICGUID1 +"&V_PICGUID2="+ V_PICGUID2 +"&V_PICGUID3="+ V_PICGUID3 +"&random="+Math.random(), "", "dialogHeight:900px;dialogWidth:1100px");
        // var ret = window.open(AppUrl + 'page/PM_140801/index.html?random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
    }

   /* if (/!*_initPlugin()*!/true) {
        // window.showModalDialog('viewPrint' + target + '.do?FORM_ID_=' + records[0].get('FORM_ID_') + '&action=print&processInstanceId=' + records[0].get('PROCESS_INSTANCE_ID_') + '&random=' + Math.random(), window, 'resizable=yes; dialogWidth=0px; dialogHeight=0px');
        window.showModalDialog(AppUrl + "/page/PM_2201010201/index.html?action=printPreview&ckvalue="+ ckvalue +"&zyqvalue="+ zyqvalue +"&sqrqvalue="+ sqrqvalue +"&xmbhvalue="+ xmbhvalue +"&xmmcvalue="+ xmmcvalue +"&zyvalue="+ zyvalue +"&sbsfzrvalue="+ sbsfzrvalue +"&jhsgrqvalue="+ jhsgrqvalue +"&jhnyvalue="+ jhnyvalue +"&gczgsvalue="+ gczgsvalue +"&gczysvalue="+ gczysvalue +"&sfwwvalue="+ sfwwvalue +"&jxdwvalue="+ jxdwvalue +"&sftsqxvalue="+ sftsqxvalue +"&random="+Math.random(), "", "dialogHeight:700px;dialogWidth:1100px");
        // var ret = window.open(AppUrl + 'page/PM_140801/index.html?random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
    }*/
}

function _initPlugin() {
    try {
        LODOP = document.getElementById('LODOP');
        //console.log(LODOP)

        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
        LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
        LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1);
        LODOP.SET_SHOW_MODE('SHOW_SCALEBAR', 1);
    } catch (err) {
        Ext.Msg.alert('操作信息', '请点击页面上出现的安装打印控件按钮安装打印控件');
        _printInstall();
        return false;
    }
    return true;
}

function _printInstall() {
    location.href = "../../resources/install_lodop32.exe";
}

function getReturnQX(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYPRO',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_PROJECT_GUID: V_GUID,
            V_V_FLAG : '0',
            V_V_PAGE:1,
            V_V_PAGESIZE: 999
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
    });
    QueryGrid6();
}
function getReturnMX(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SEL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_PROJECT_GUID: V_GUID,
            V_V_PAGE:1,
            V_V_PAGESIZE: 999
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
    });

    QueryGrid7();
    queryRG();
    queryJJ();
    queryBJ();
}


function QueryGrid6(){
    var gridStore = Ext.data.StoreManager.lookup('grid6Store');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_FLAG:'0',
        V_V_PAGE: Ext.getCmp('grid6page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('grid6page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();

}

function QueryGrid7(){

    var gridStore = Ext.data.StoreManager.lookup('grid7Store');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('grid7page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('grid7page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();

}

function queryRG() {
    var gridStore = Ext.data.StoreManager.lookup('gridRGStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('rgpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('rgpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function queryJJ() {
    var gridStore = Ext.data.StoreManager.lookup('gridJJStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('jjpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('jjpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function queryBJ() {
    var gridStore = Ext.data.StoreManager.lookup('gridBJStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('bjpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('bjpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}
function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left";
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}
function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    var time=value.split('.')[0];
    return time;
}
function itemclick(s, record, item, index, e, eOpts) {
    QueryGrid8(Ext.getStore("grid7Store").getAt(index).get("V_GX_CODE"));
}
function TipRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function detailcar(a,value,metaData){
    return '<a href="javascript:ondetailcar(\'' + metaData.data.V_JXGX_CODE + '\')">'+a+'</a>';
}

function ondetailcar(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170101/index.html?V_JXGX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
function detailper(a,value,metaData){
    return '<a href="javascript:ondetailper(\'' + metaData.data.V_JXGX_CODE + '\')">'+a+'</a>';
}

function ondetailper(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170102/index.html?V_JXGX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
