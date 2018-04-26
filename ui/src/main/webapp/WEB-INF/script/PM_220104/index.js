var today = new Date();
var mingtian = new Date();
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_PERSONCODE = '';
var V_STEPCODE = '';
var taskId = '';
var LODOP = "";
mingtian.setDate(mingtian.getDate() + 1);
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
var V_GUID ="123132";
var V_PICGUID1 ="232312";
var V_PICGUID2 ="2222";
var V_PICGUID3 ="123312";
var ProcessInstanceId = '';
var V_ORDERGUID = "";



if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
    (parameters.ProcessInstanceId == undefined) ? ProcessInstanceId = '' : ProcessInstanceId = parameters.ProcessInstanceId;
    V_GUID = V_ORDERGUID;

}

var ckstoreload = false;
var zyqstoreload = false;
var zystoreload = false;
var index01 = 2;
var index02 = 1;
var index03 = 0;

//var picguidbegin = V_PICGUID1;
var picguidbegin = "";
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

    var spstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'spstore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_NEXTPER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sp').select(store.first());
            }
        }
    });


    var filegridPanel = Ext.create("Ext.panel.Panel", {
        id: 'filegridPanel',
        editable: false,
        region: 'center',
        // height: 200,
        html: "<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> </td> <td align='center'> </td> <td></td> </tr> </table> </div>",//width: 400,
        style: ' margin: 5px 0px 0px 0px',
        columnLines: true

    });

    var filegridPanel2 = Ext.create("Ext.grid.Panel", {
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

    var panel2 = Ext.create('Ext.Panel', {
        id : 'panel2',
        layout: 'column',
        defaults : {
            style : 'margin:2px',
            xtype: 'button'
        },
        items : [{
            xtype: 'textfield',
            id:'yj',
            editable: false,
            fieldLabel: '意见:',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            labelWidth: 30,
            queryMode: 'local',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 200
            //readOnly : true,
        },{
            xtype: 'button',
            text: '确认通过',
            icon: imgpath + '/saved.png',
            handler: _tongyi,
            style: 'margin: 5px 5px 5px 5px'
        },{
            xtype: 'button',
            text: '驳回',
            icon: imgpath + '/cross.png',
            handler: _butongyi,
            style: 'margin: 5px 5px 5px 5px'
        },{
            xtype: 'button',
            text: '打印预览',
            icon: imgpath + '/preview.png',
            handler: _printPreview,
            style: 'margin: 5px 5px 5px 5px'
        }, {
            xtype: 'button',
            text: '关闭',
            icon: imgpath + '/cross.png',
            handler: _close,
            style: 'margin: 5px 5px 5px 5px'
        } ]
    });

    var panel3 = Ext.create('Ext.form.FormPanel', {
        id : 'panel3',
        //title : '<fmt:message key="inputPanel" />',
        header : false,
        frame : true,
        layout : 'vbox',
        baseCls: 'my-panel-no-border',
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

            }]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
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
            } ]
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
            } ]
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
                value: '%',
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
            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [  {
                id: 'sftsqiangxiu',
                readOnly : true,
                xtype: 'textfield',
                //store: sftsqiangxiuStore,
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
            }]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [ {
                region : 'center',
                layout : 'fit',
                // height: 80,
                // width:580,
                border : false,
                items : [ filegridPanel ]
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
                fieldLabel: '缺陷说明及费用 ',
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
        }/*,{
         xtype: 'panel',
         region: 'center',
         layout: 'column',
         frame: true,
         baseCls: 'my-panel-no-border',
         items: [  {
         region : 'center',
         layout : 'fit',
         height: 80,
         width:580,
         border : false,
         items : [ grid ]
         }]
         }*/]
    });


    var rightPanel = Ext.create('Ext.Panel', {
        id : 'rightPanel',
        layout : 'border',
        border : false,
        items : [ {
            region : 'west',
            border : false,
            items : [ panel3 ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ grid ]
        } ]
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


    /* Ext.create('Ext.Viewport', {
     layout: 'border',
     frame: true,
     title: 'Ext Layout Browser',
     renderTo: Ext.getBody(),
     width: 500,
     items: [{
     layout: 'border',
     id: 'id',
     region: 'center',
     border: false,
     split: true,
     margins: '2 0 0 0',
     items: [panel2, panel3, grid]
     }]
     });*/

    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> <span></td> <td align='center'> </td> <td></td> </tr> </table> </div>"
     );

     });*/

    _init();
})

function _init() {

    //console.log(V_GUID);
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_IP: "",
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
        V_V_GUID: V_GUID

    };
    //matGroupThirdStore.currentPage = 1;

    gridStore.load();
    V_PERSONCODE = gridStore.getAt(0).get('V_INMANCODE');
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

    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    imagestore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };

    imagestore.load();


    index01 = imagestore.getCount() - 1;
    index02 = imagestore.getCount() - 2;
    index03 = imagestore.getCount() - 3;

    if(imagestore.getCount()==1){
        V_PICGUID1 = imagestore.getAt(0).get('V_PICGUID');
        picguidbegin = V_PICGUID1;
    }
    if(imagestore.getCount()==2){
        V_PICGUID1 = imagestore.getAt(1).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(0).get('V_PICGUID');

    }
    if(imagestore.getCount()>=3)
    {
        V_PICGUID1 = imagestore.getAt(index01).get('V_PICGUID');
        V_PICGUID2 = imagestore.getAt(index02).get('V_PICGUID');
        V_PICGUID3 = imagestore.getAt(index03).get('V_PICGUID');

    }
    picguidbegin = V_PICGUID1;
    //alert(1.8);

    Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> </td> <td align='center'> </td> <td></td> </tr> </table> </div>"
    );

    var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
    spqzstore.proxy.extraParams = {
        instanceId: ProcessInstanceId
    };
    spqzstore.currentPage = 1;
    spqzstore.load();
    //alert(2.0);
    _selectTaskId();




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
            Ext.getBody().unmask();//去除页面笼罩

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

function _preViewImage() {
    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    imagestore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };
    //matGroupSecondStore.currentPage = 1;
    imagestore.load();
    //console.log(imagestore)
    //console.log("imagestore.getCount()" + imagestore.getCount())

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


    //console.log("index01=" + index01);
    //console.log("index02=" + index02);
    //console.log("index03=" + index03);

    Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> </td> <td align='center'> </td> <td></td> </tr> </table> </div>"
    );
}
function _last() {
    index01++;
    index02++;
    index03++;
    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    //console.log(V_PICGUID1);
    //console.log(picguidbegin);
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
        // console.log("退V_PICGUID1=" + V_PICGUID1);
        //console.log("退V_PICGUID2=" + V_PICGUID2);
        // console.log("退V_PICGUID3=" + V_PICGUID3);
        Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> </td> <td align='center'> </td> <td></td> </tr> </table> </div>"
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
        // console.log("V_PICGUID1=" + V_PICGUID1);
        // console.log("V_PICGUID2=" + V_PICGUID2);
        //console.log("V_PICGUID3=" + V_PICGUID3);


        /* if(V_PICGUID3 == PICGUID1)
         {
         Ext.Msg.alert('提示信息', '已经是最后一张');
         return;
         }*/
        /*Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='###'>删除</a></span> </td > <td align='center'> <span><a href='###'>删除</a></span></td> <td align='center'> <span><a href='####'>删除</a></span></td> <td></td> </tr> </table> </div>"
         );*/
        Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID1 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID2 + ".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/" + V_GUID + "/thumb_" + V_PICGUID3 + ".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'>  </td > <td align='center'> </td> <td align='center'> </td> <td></td> </tr> </table> </div>"
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



function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}




function _close() {
    window.close();
}

function _printPreview() {
    //var records = Ext.getCmp('formPanel').getSelectionModel().getSelection();
    // var target = _target();



    if (_initPlugin()) {
        // window.showModalDialog('viewPrint' + target + '.do?FORM_ID_=' + records[0].get('FORM_ID_') + '&action=print&processInstanceId=' + records[0].get('PROCESS_INSTANCE_ID_') + '&random=' + Math.random(), window, 'resizable=yes; dialogWidth=0px; dialogHeight=0px');
        window.showModalDialog(AppUrl + "/page/PM_22010401/index.html?action=printPreview&V_GUID="+ V_GUID +"&V_PICGUID1="+ V_PICGUID1 +"&V_PICGUID2="+ V_PICGUID2 +"&V_PICGUID3="+ V_PICGUID3 +"&random="+Math.random(), "", "dialogHeight:900px;dialogWidth:1100px");
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
        Ext.Msg.alert('操作信息', '请安装打印控件');
        //_printInstall();
        return false;
    }
    return true;
}

function _printInstall() {
    location.href = "../../resources/install_lodop32.exe";
}

function _tongyi()
{
    var spyj = '';
    if (Ext.getCmp('yj').getValue() == '' || Ext.getCmp('yj').getValue() == null) {
        spyj = '通过';
    } else {
        spyj = Ext.getCmp('yj').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: ['lcjs', "flow_yj",'shtgtime'],
            parVal: ['lcjs',spyj,Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s') ],
            processKey :$.url().param("ProcessDefinitionKey"),
            businessKey : $.url().param("V_ORDERGUID"),
            V_STEPCODE : 'lcjs',
            V_STEPNAME : '流程结束',
            V_IDEA : '通过',
            V_NEXTPER : 'lcjs',
            V_INPER : Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                /*var gridStore = Ext.data.StoreManager.lookup('gridStore');
                Ext.Ajax.request({
                    url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SP',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_IP :"",
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
                        V_V_ORGCODE : gridStore.getAt(0).get('V_ORGCODE'),
                        V_V_DEPTCODE : gridStore.getAt(0).get('V_DEPTCODE'),
                        V_V_GUID: V_GUID,
                        V_V_FLAG :'审批中',
                        V_V_NEXTSPR : Ext.getCmp('sp').getValue(),
                        V_V_SP : '同意',
                        V_V_YJ : Ext.getCmp('yj').getValue()

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
                window.close();
                window.opener.OnPageLoad();



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

function _butongyi()
{
    var spyj = '';
    if (Ext.getCmp('yj').getValue() == '' || Ext.getCmp('yj').getValue() == null) {
        spyj = '审批驳回';
    } else {
        spyj = Ext.getCmp('yj').getValue();
    }
    var Assignee='';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/InstanceState',
        method: 'POST',
        async: false,
        params: {
            instanceId: ProcessInstanceId
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Assignee=resp.list[0].Assignee;
        }
    });
    if(Assignee!=''){
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '不通过',
            parName: ['fqrxg', "flow_yj"],
            parVal: [V_PERSONCODE, spyj],
            processKey: $.url().param("ProcessDefinitionKey"),
            businessKey: V_ORDERGUID,
            V_STEPCODE: 'fqrxg',
            V_STEPNAME: '发起人修改',
            V_IDEA: '不通过',
            V_NEXTPER: V_PERSONCODE,
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                var gridStore = Ext.data.StoreManager.lookup('gridStore');
                Ext.Ajax.request({
                    url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SPNO',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_IP :"",
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
                        V_V_ORGCODE : gridStore.getAt(0).get('V_ORGCODE'),
                        V_V_DEPTCODE : gridStore.getAt(0).get('V_DEPTCODE'),
                        V_V_GUID: V_GUID,
                        V_V_FLAG :'审批驳回',
                        V_V_NEXTSPR :V_PERSONCODE,
                        V_V_SP : '不同意',
                        V_V_YJ : Ext.getCmp('yj').getValue()

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
    }else{
        alert("发起人信息错误，无法驳回");
    }


}

function _spupdate()
{
    var owidth = window.document.body.offsetWidth ;
    var oheight = window.document.body.offsetHeight ;
    window.open(AppUrl + 'page/PM_22010103/index.html?V_GUID=' + V_GUID  + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );

}