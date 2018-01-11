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
            text: '审批步骤',
            id: 'spbz',
            flex: 1,
            align: 'center',
            dataIndex: "V_FLOWSTEP",
            // renderer: _downloadRander
        }, {
            text: '审批人',
            id: 'spr',
            flex: 1,
            align: 'center',
            dataIndex: "V_PERSONNAME",
            // renderer: _downloadRander
        }, {
            text: '审批意见',
            id: 'spyj',
            flex: 3,
            align: 'center',
            dataIndex: "V_IDEA",
            // renderer: _downloadRander
        }, {
            text: '审批时间',
            id: 'spsj',
            flex: 1,
            align: 'center',
            dataIndex: "V_DATE"
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
                border:0,
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
            region : 'north',
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



    _init();

    _preViewImage();//初始加载图片
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

    var imagestore = Ext.data.StoreManager.lookup('imagestore');
    imagestore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };

    imagestore.load();


    index01 = imagestore.getCount() - 1;
    index02 = imagestore.getCount() - 2;
    index03 = imagestore.getCount() - 3;

    var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
    spqzstore.proxy.extraParams = {
        V_V_DBGUID : V_GUID
    };

    spqzstore.load();


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

        tmpl+= "<td style='text-align: center'> <img src='"+AppUrl + 'PM_22/getPic?filePath='+ V_GUID+"" +
            "&pic="+imagestore.getAt(i).get('V_PICGUID')+
            "&suffix="+imagestore.getAt(i).get('V_PICPOSTFIX')+"' width='120px' height='100px' />" +
            //"<br> <a href='javascript:void(0);' onclick=\"_delete('"+imagestore.getAt(i).get('V_PICGUID')+"','"+imagestore.getAt(i).get('V_PICPOSTFIX')+"')\">删除</a>" +
            "</td> ";
    }
    $("#yulan").html("<table  width='300' bordercolor=\"#555\"><tr> " + tmpl + "</tr> </table>");

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