var today = new Date();
var mingtian = new Date();
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
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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
        proxy: {
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
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
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
            style: 'margin: 5px 5px 5px 5px',
            handler: zssave
            //style: 'margin: 5px 0px 10px 0px'
        }, {
            xtype: 'button',
            text: '关闭',
            icon: imgpath + '/cross.png',
            style: 'margin: 5px 5px 5px 5px',
            handler: _close
            //style: 'margin: 5px 0px 10px 0px'
        }, {
            id: 'sp',
            xtype: 'combo',
            store: spstore,
            fieldLabel: '下一步审批人',
            style: 'margin: 5px 5px 5px 5px',
            labelWidth: 80,
            queryMode: 'local',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '保存提交',
            style: 'margin: 5px 5px 5px 5px',
            icon: imgpath + '/filesave.png',
            handler: save
            //style: 'margin: 5px 0px 10px 0px'
        } ]
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


    var panel3 = Ext.create('Ext.form.Panel', {
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
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 500,
                labelAlign: 'right'
            }  ]
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
            items: [ {
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
                        _spload();
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
            }  ]
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
            items: [ {
                id: 'gczgs',
                xtype: 'textfield',
                fieldLabel: '工程总概算(万元)',
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                editable: false,
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
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
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
            } ]
        },{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [
                upload
            , {
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
                //columnWidth: 1,
                //height: 150,
                //width: '100%',
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
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
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
                fieldLabel: '缺陷说明及费用 ',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                //baseCls: 'margin-bottom',
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
                fieldStyle:'background-color: #FFEBCD; background-image: none;',
                //baseCls: 'margin-bottom',
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

    Ext.create('Ext.container.Viewport', {
        id: "viewport",
        autoScroll:true,
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
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ panel3 ]
        } ]
    });

    _ck_zyqload();
    //_ck_zyqfzrload();
    zyq_jxdwload();
    _init();

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
        Ext.getCmp("sbtype").select(ssbtype.getAt(0));
        ssbname.load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()

            }
        });


    });

    Ext.getCmp("sbtype").on("change", function () {
        Ext.ComponentManager.get('sbname').getStore().removeAll();
        ssbname.load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()
            }
        });
    });

    var flag = 1;
    ssbname.on("load", function () {
        Ext.getCmp("sbname").select(ssbname.getAt(0));
    });

    getReturnQX();
    getReturnMX();
})

function _init(){
    if(ckstoreload && zyqstoreload && zystoreload)
    {
        ckstoreload = false;
        zyqstoreload = false;
        zystoreload = false;
        //数据初始化
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_CREATE',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_IP :"",
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME:Ext.util.Cookies.get('v_personname2'),
                V_V_GUID: V_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    V_FLOW_CODE = data.list[0].V_PROJECTCODE;
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
                    //matGroupSecondStore.currentPage = 1;
                    spstore.load();

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

        var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
        zyfzrenstore.proxy.extraParams = {
            V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
            V_V_POSTCODE : '0101020104',
            V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
        };
        //matGroupSecondStore.currentPage = 1;
        zyfzrenstore.load();

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
    //alert("spload()");
    var spstore = Ext.data.StoreManager.lookup('spstore');
    spstore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'WWJX',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''
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
    imagestore.load();

    picguidbegin = V_PICGUID1;

    var tmpl = "";
    for(var i=0;i<imagestore.getCount();i++){

        tmpl+= "<td style='text-align: center; vertical-align: middle; padding-top:10px;'> <img src='"+AppUrl + 'PM_22/getPic?filePath='+ V_GUID+"" +
                                                                                        "&pic="+imagestore.getAt(i).get('V_PICGUID')+
                                                                                        "&suffix="+imagestore.getAt(i).get('V_PICPOSTFIX')+"' width='120px' height='100px' />" +
               "<br> <a href='javascript:void(0);' onclick=\"_delete('"+imagestore.getAt(i).get('V_PICGUID')+"','"+imagestore.getAt(i).get('V_PICPOSTFIX')+"')\">删除</a></td> ";
    }
    $("#yulan").html("<table  width='300' border='0'><tr> " + tmpl + "</tr> </table>");// bordercolor=\"#555\"

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
    if(Ext.getCmp('sfww').getValue() == 1){
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SET',
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
                V_I_MONTH_PLAN : Ext.getCmp('jhmonth').getValue()
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

    if(Ext.getCmp('sfww').getValue() == 0){
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_SET',
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
                V_I_MONTH_PLAN : Ext.getCmp('jhmonth').getValue()
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
            V_V_NEXTSPR :Ext.getCmp('sp').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj"],
                            parVal: [Ext.util.Cookies.get('v_personcode'), V_GUID, Ext.getCmp('sp').getValue(), "请审批!", Ext.getCmp('xmname').getValue(), V_FLOW_CODE, "请审批！"],
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