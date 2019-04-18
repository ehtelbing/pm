var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_GUID = "";
var V_V_ORGCODE="";
var V_V_DEPTCODE="";
var V_begintime="";
var V_V_EQUTYPE="";
var V_V_EQUNAME="";
var V_SUB_V_EQUNAME="";
var V_equFaultname="";
var orgLoad1 = false;
var equFaultLoad1 = false;
var init = true;
var initadd = true;
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.begintime == undefined) ? V_begintime = '' : V_begintime = decodeURI(parameters.begintime);
    (parameters.V_V_EQUTYPE == '%25') ? V_V_EQUTYPE = '%' : V_V_EQUTYPE = parameters.V_V_EQUTYPE;
    (parameters.V_EQUNAME == '%25') ? V_V_EQUNAME = '%' : V_V_EQUNAME = parameters.V_EQUNAME;
    (parameters.SUB_V_EQUNAME == '%25') ? V_SUB_V_EQUNAME = '%' : V_SUB_V_EQUNAME = parameters.SUB_V_EQUNAME;
    (parameters.equFaultname == '%25') ? V_equFaultname = '%' : V_equFaultname = parameters.equFaultname;


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
    Ext.getBody().mask('<p>页面载入中...</p>');
    var gridStore =Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME','V_EQUTYPECODE','V_EQUUPCODE'],
        proxy : {
            type : 'ajax',
            url: AppUrl + 'WorkOrder/PRO_SAP_EQU_VIEW',
            actionMethods : {
            	read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });
    var treeStore=Ext.create('Ext.data.TreeStore', {
        id : 'treeStore',
        autoLoad : true,
        autoDestroy : true,
        fields : ['id', 'text', 'parentid','V_EQUSITE','V_EQUSITENAME','choose','V_EQUTYPENAME','V_EQUTYPECODE'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'WorkOrder/PRO_BASE_DEPT_TREE',
            extraParams : {
                V_V_DEPTCODE:V_V_DEPTCODE
            },
            actionMethods : {
                read : 'POST'
            }
        },
        reader : {
            type : 'json',
            root : 'children'
        },
        root : {
            text : 'root',
            expanded : true
            // "checked":false,
        }
    });

    var orgStore1 = Ext.create('Ext.data.Store', {
        id: 'orgStore1',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
        // listeners: {
        //     load: function (store, records) {
        //         orgLoad1 = true;
        //         Ext.getCmp('V_V_ORGCODE1').select(store.first());
        //         // _init();
        //     }
        // }
    });




    var deptStore1 = Ext.create('Ext.data.Store', {
        id: 'deptStore1',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
        })
        // listeners: {
        //     load: function (store, records) {
        //         if (initadd) {
        //             zyqload1=true;
        //         } else {
        //             Ext.getCmp('V_V_DEPTCODE1').select(store.first());
        //         }
        //     }
        // }
    });

    var equFaultStore1 = Ext.create('Ext.data.Store', {
        id: 'equFaultStore1',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                equFaultLoad1 = true;
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('equFaultname1').select(store.first());

                // _init();

            }
        }
    });


    var faultStore1 = Ext.create('Ext.data.Store', {
        id: 'faultStore1',
        autoLoad: false,
        fields: ['V_FAULTCODE', 'V_FAULTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cxy/PRO_BASE_FAULT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('faultLevel1').select(store.first());
            }
        }
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



    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        // layout : {
        //     type:'table',
        //     columns:5
        // },
        defaults : {
            labelAlign : 'right',
            // labelWidth : 100,
            // inputWidth : 200,
            margin : '4,0,0,0'
        },
        items : [
        //     {
        //     xtype: 'combo',
        //     id: 'winnextPer',
        //     fieldLabel: '下一步接收人',
        //     editable: false,
        //     style: ' margin: 10px 0px 0px 10px',
        //     labelWidth: 80,
        //     width: 220,
        //     // value: '',
        //     displayField: 'V_PERSONNAME',
        //     valueField: 'V_PERSONCODE',
        //     store: winnextSprStore,
        //     queryMode: 'local'
        // }, {
        //     id: 'saveandup',
        //     xtype: 'button',
        //     text: '上报',
        //     style: ' margin: 10px 0px 0px 10px',
        //     handler: OnButtonSaveUp
        // },
            {
            id:'saveinsert',
            xtype: 'button',
            text: '保存',
            style: ' margin: 10px 0px 0px 60px',
            icon: imgpath + '/saved.png',
            handler: _saveBtnFault
        }, {
            id:'saveqx',
            xtype: 'button',
            text: '关闭',
            style: ' margin: 10px 0px 0px 10px',
            icon: imgpath + '/cross.png',
            handler: _hideFault
        }

        ]
    });


    var addPanel = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel',
        region: 'center',
        //title: '<div align="center"></div>',
        width: '100%',
        // height: 570,
        baseCls: 'my-panel-no-border',
        bodyPadding: 10,
        fileUpload: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE1',
                store: orgStore1,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 70,
                width: 270,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right'
                // listeners: {
                //     change: function () {
                //         Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                //         initadd = false;
                //         _selectDept1();
                //         /* _selecteType1();
                //          _selectequName1();
                //          _selectsubequName1();*/
                //
                //     }
                // }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE1',
                store: deptStore1,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '作业区',
                editable: false,
                labelWidth: 70,
                width: 270,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right'
                // listeners: {
                //     change: function (field, newValue, oldValue) {
                //         Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                //         initadd = false;
                //         _selecteType1();
                //         /*_selectequName1();
                //          _selectsubequName1();*/
                //
                //     }
                // }
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [

                {

                    xtype: 'textfield',
                    id: 'faultname',
                    fieldLabel: '故障名称',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 270
                },{
                    xtype: 'label',
                    width: 5,
                    text: '*',
                    style: 'color:red',
                    margin : ' margin: 5px 0px 0px 5px'
                },{
                    xtype: 'textfield',
                    id: 'faultpart',
                    fieldLabel: '故障部位',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 270
                }

            ]
        },

            {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'combo',
                id: 'equFaultname1',
                store: equFaultStore1,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                forceSelection: true,
                fieldLabel: '故障类型',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 270
            },{

                xtype: 'combo',
                id: 'faultLevel1',
                store: faultStore1,
                queryMode: 'local',
                valueField: 'V_FAULTCODE',
                displayField: 'V_FAULTNAME',
                forceSelection: true,
                fieldLabel: '故障等级',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
                width: 270
            }


            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'begintime1',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                //submitFormat: 'yyyy-mm-dd',
                value: V_begintime,//new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '发现时间',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 270,
                baseCls: 'margin-bottom'
            },{
                xtype: 'textfield',
                id: 'faultxz',
                fieldLabel: '性质',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
                width: 270
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'faultss',
                fieldLabel: '损失',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                minValue:'0',
                nanText: "请输入有效数字",
                validateOnBlur: false,
                validateOnChange: false,
                hideTrigger: true,
                allowBlank: false,
                width: 240
            },{
                xtype: 'label',
                style: ' margin: 8px 0px 0px 4px',
                text:'万元'
            },{
                xtype: 'label',
                width: 5,
                text: '*',
                style: 'color:red',
                margin : ' margin: 5px 0px 5px 5px'
            }
            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultclgc',
                fieldLabel: '处理过程',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            },{
                xtype: 'label',
                width: 5,
                text: '*',
                style: 'color:red',
                margin : ' margin: 5px 0px 5px 5px'
            }

            ]
        },  {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultRea1',
                fieldLabel: '故障原因',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            },{
                xtype: 'label',
                width: 5,
                text: '*',
                style: 'color:red',
                margin : ' margin: 5px 0px 5px 5px'
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultDesc1',
                fieldLabel: '故障现象',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            },{
                xtype: 'label',
                width: 5,
                text: '*',
                style: 'color:red',
                margin : ' margin: 5px 0px 5px 5px'
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultSol1',
                fieldLabel: '故障解决',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultzgcs',
                fieldLabel: '整改措施',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'fzrcl',
                fieldLabel: '对相关负责人的处理',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        }]
    });


    var filegridPanel = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel',
        region: 'center',
        // height: '100%',
        width: '100%',
        columnLines: true,
        store: fileGridStore,
        autoScroll: true,
        // margin: '20px 0px 0px 2px',
        //colspan: 3,
        columns: [{
            text: '附件名称',
            flex: 0.7,
            id : 'fjname',
            align: 'center',
            dataIndex: "V_FILENAME",
            renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.3,
            align: 'center',
            renderer: _delRander
        }]
    });

    var uploadpanel= Ext.create('Ext.form.FormPanel', {
        // border: false,
        frame: true,
        id: 'uploadpanel',
        region: 'south',
        baseCls: 'my-panel-no-border',
        width: '100%',
        layout: 'vbox',
        // height: 300,
        bodyPadding: 3,
        fileUpload: true,

        items: [
            {
            xtype: 'form',
            id:'uploadForm',
            region: 'north',
            layout: 'hbox',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '故障附件',
                labelWidth: 70,
                labelAlign: 'right',
                inputWidth: 201,
                style: ' margin: 5px 0px 0px -2px',
                buttonText: '选择文件',
                allowBlank: false
            }, {
                id: 'insertFilesFj',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 10px',
                icon: imgpath + '/accordion_collapse.png',
                handler: _upLoadFile
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
            }]},{
            columnWidth: 1,
            height: 225,
            width: 540,
            margin: '10px 0px 0px 0px',
            items: filegridPanel
        }
        ]
    });

    var equGridpanel = Ext.create('Ext.grid.Panel', {
            id : 'equGridpanel',
            region : 'center',
            store : gridStore,
            columnLines : true,
            // selType: 'checkboxmodel',
            // plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
            //     clicksToEdit : 1
            // }) ],
            columns : [
                {
                    text : '删除',
                    // dataIndex : 'NUMBER',
                    align : 'center',
                    width : 80, renderer :_delete

                },
                {
                    text : '设备分类',
                    dataIndex : 'V_EQUTYPENAME',
                    align : 'center',
                    width : 100
                }, {
                    text : '设备编号',
                    dataIndex : 'V_EQUCODE',
                    align : 'center',
                    width : 100
                }, {
                    text : '设备名称',
                    dataIndex : 'V_EQUNAME',
                    align : 'center',
                    width : 100
                }, {
                    text : '设备位置编码',
                    dataIndex : 'V_EQUSITE',
                    align : 'center',
                    width : 100
                }, {
                    text : '设备位置',
                    dataIndex : 'V_EQUSITENAME',
                    align : 'center',
                    width : 200
                }
            ]
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
        items : [
            {
                region : 'north',
                border : false,
                layout : 'fit',
                items : [inputPanel]
            },
            {
                region : 'center',
                border : false,
                layout : 'fit',
                // width : 450,
                items : [equGridpanel]
            },
            {
                xtype : 'treepanel',
                id : 'sectTree',
                region : 'west',
                frame : true,
                // border : false,
                width : 260,
                store : treeStore,
                rootVisible : false,
                listeners : {
                	itemclick : OnClickTreeItem
                }
            },
            {
            region : 'east',
            // border : false,
            frame: true,
            autoScroll:true,
            width : 590,
            items : [ addPanel,uploadpanel]
        }
        ]
    });
//点击加号加载
    Ext.getCmp("sectTree").on("beforeload",function(store,operation){
        if(operation.node.data.parentid==-1){
            Ext.apply(store.proxy.extraParams,{
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODENEXT:operation.node.data.id
                },
                store.proxy.url=AppUrl + 'tree/PRO_GET_DEPTEQUTYPE_PER')
        }else if(operation.node.data.parentid.length==8){
            Ext.apply(store.proxy.extraParams,{
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODENEXT:operation.node.data.parentid,//车间编码
                    V_V_EQUTYPECODE:operation.node.data.id //设备类型编码
                },
                store.proxy.url=AppUrl + 'cxy/PRO_PM_07_DEPTEQU_PER_DROP')//cxy
        }else{
            Ext.apply(store.proxy.extraParams,{

                    V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE:V_V_DEPTCODE.substr(0,4),
                    V_V_DEPTNEXTCODE:V_V_DEPTCODE,
                    V_V_EQUTYPECODE:operation.node.parentNode.data.id, //设备类型编码
                    V_V_EQUCODE:operation.node.data.id//设备编码
                },
                store.proxy.url=AppUrl + 'cxy/PRO_SAP_EQU_VIEW')
        }

    });
    _addFault();
});

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore.currentPage = 1;
    deptStore.load();
}

function _selectDept1() {
    var deptStore1 = Ext.data.StoreManager.lookup('deptStore1');

    deptStore1.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE1').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore1.currentPage = 1;
    deptStore1.load();
}


function _selecteFaultStore1() {
    var faultStore1 = Ext.data.StoreManager.lookup('faultStore1');
    faultStore1.proxy.extraParams = {

    };
    faultStore1.load();
}

function _seltctFault() {
    var faultItemStore = Ext.data.StoreManager.lookup('faultItemStore');

    faultItemStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getSubmitValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getSubmitValue(),
        'V_V_EQUTYPE': Ext.getCmp('V_V_EQUTYPE').getSubmitValue(),
        'V_V_EQUCODE': Ext.getCmp('V_EQUNAME').getSubmitValue(),
        'V_V_EQUCHILD_CODE': Ext.getCmp('SUB_V_EQUNAME').getSubmitValue(),
        'V_V_FAULT_TYPE': Ext.getCmp('equFaultname').getSubmitValue(),
        'V_V_FAULT_YY': Ext.getCmp('faulttext').getSubmitValue(),
        'V_V_FINDTIME_B': Ext.getCmp("begintime").getSubmitValue(),
        'V_V_FINDTIME_E': Ext.getCmp("endtime").getSubmitValue()
    };

    // faultItemStore.currentPage = 1;
    faultItemStore.load();
}


function _addFault() {


    // Ext.getCmp('addPanel').form.reset();
    // Ext.getCmp('uploadForm').form.reset();

    // Ext.getCmp("addFaultWindow").show();
    //Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

    initadd = true;

    orgLoad1 = false;
    equFaultLoad1 = false;

    Ext.data.StoreManager.lookup('orgStore1').on('load', function () {
        Ext.getCmp('V_V_ORGCODE1').select(V_V_ORGCODE);
        _selectDept1();
    });

    Ext.getCmp('V_V_ORGCODE1').on('change', function () {
        _selectDept1();
    });


    Ext.data.StoreManager.lookup('deptStore1').on('load', function () {
        Ext.getCmp('V_V_DEPTCODE1').select(V_V_DEPTCODE);
        Ext.getBody().unmask();
    });

    // Ext.getCmp('V_V_DEPTCODE1').on('change', function () {
    //     _selectNextSprStore2();
    //
    // });
    // Ext.getCmp('begintime1').setValue(V_begintime);

    Ext.data.StoreManager.lookup('equFaultStore1').on('load', function () {
        if (V_equFaultname == '%') {
                Ext.getCmp('equFaultname1').select(Ext.data.StoreManager.lookup('equFaultStore1').getAt(1).get('V_TYPECODE'));


        } else {
                Ext.getCmp('equFaultname1').select(V_equFaultname);
        }
    });
    _selecteFaultStore1();

    filequery(V_V_GUID);
    // Ext.getBody().unmask();//去除页面笼罩


}


function _upLoadFile() {
    var uploadForm = Ext.getCmp('uploadForm');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    //alert(V_V_FILENAME);

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('V_V_ORGCODE1').getSubmitValue());
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('V_V_DEPTCODE1').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());

    if (uploadForm.form.isValid()) {
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

        uploadForm.getForm().submit({
            url: AppUrl + 'cxy/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (form, action) {
                var massage=action.result.message;
                if(massage=="{RET=SUCCESS}"){
                    Ext.Msg.alert('成功', '上传成功');
                    filequery(V_V_GUID);
                }
            },
            failure: function (form, action) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

    }

}

function _downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + ',' + metaData.data.V_FILENAME + '\')">' + a + '</a>';
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function onDownload(fileguid) {
    var guid = fileguid.substring(0,36);
    var fujianname = fileguid.substring(37 );
    // var form = Ext.getCmp('addPanel');
    location.href = AppUrl+"qk/downloadFile?V_V_FILEGUID="+guid+"&V_V_FILENAME="+fujianname;//下载页面弹窗

}

function onDel(fileguid) {

    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_V_GUID);
                filequery2(V_V_GUID);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}

function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function filequery2(guid) {
    Ext.data.StoreManager.lookup('fileGridStore2').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function _hideFault() {
    window.close();
}

function _hideFault2() {
    Ext.getCmp('updateFaultWindow').close();
}

function _saveBtnFault() {
    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    var fileguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }

    var faultguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        faultguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            faultguid += "-";
    }

    var intime = Ext.Date.format(new Date(), 'Y-m-d');

    var htmlText = "请录入<font style=\"font-size:18px;font-weight:bold;color:red\">*</font >必填项!";
    if(Ext.getCmp('faultname').getValue()==''||Ext.getCmp('faultclgc').getValue()==''
        ||Ext.getCmp('faultRea1').getValue()==''||Ext.getCmp('faultDesc1').getValue()==''
        ||Ext.getCmp('faultss').getValue()==''||Ext.getCmp('faultss').getValue()==null){
        Ext.MessageBox.show({
            title: '提示',
            msg: htmlText,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    var records=Ext.getCmp('equGridpanel').getStore().data;
    if(records.length==0){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    if (Ext.getCmp('V_V_ORGCODE1').getValue() != '%' && Ext.getCmp('V_V_DEPTCODE1').getValue() != '%' && Ext.getCmp('equFaultname1').getValue() != '%') {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_SET_NEW',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': Ext.getCmp("V_V_ORGCODE1").getValue(),
                'V_V_DEPTCODE': Ext.getCmp("V_V_DEPTCODE1").getValue(),
                'V_V_EQUTYPE': '',//Ext.getCmp("V_V_EQUTYPE1").getValue(),
                'V_V_EQUCODE': '',//Ext.getCmp("V_EQUNAME1").getValue(),
                'V_V_EQUCHILD_CODE': '',//Ext.getCmp("SUB_V_EQUNAME1").getValue(),
                'V_V_FAULT_GUID': faultguid,
                'V_V_FAULT_TYPE': Ext.getCmp("equFaultname1").getValue(),
                'V_V_FAULT_YY': Ext.getCmp("faultRea1").getValue(),
                'V_V_FINDTIME': Ext.getCmp("begintime1").getSubmitValue(),
                'V_V_FAULT_XX': Ext.getCmp("faultDesc1").getValue(),
                'V_V_JJBF': Ext.getCmp("faultSol1").getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp("faultLevel1").getValue(),
                'V_V_FILE_GUID': fileguid,
                'V_V_INTIME': intime,
                'V_V_PERCODE': V_V_PERSONCODE,
                'V_V_IP': V_V_IP,
                'V_V_FAULT_NAME':Ext.getCmp("faultname").getValue(),
                'V_V_FAULT_PART':Ext.getCmp("faultpart").getValue(),
                'V_V_FAULT_CLGC':Ext.getCmp("faultclgc").getValue(),
                'V_V_FAULT_SS':Ext.getCmp("faultss").getValue(),
                'V_V_FAULT_XZ':Ext.getCmp("faultxz").getValue(),
                'V_V_FAULT_ZGCS':Ext.getCmp("faultzgcs").getValue(),
                'V_V_FZR_CL':Ext.getCmp("fzrcl").getValue()

            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);

                // var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    var i_err = 0;
                    // var records=Ext.getCmp('equGridpanel').getStore().data;
                    for (var i = 0; i < records.length; i++) {
                        Ext.Ajax.request({
                            url: AppUrl + 'cxy/PRO_FAULT_EQUIP_SET',
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                'V_V_FAULTCODE': V_V_GUID,
                                'V_V_EQUTYPECODE': records.items[i].data.V_EQUTYPECODE,
                                'V_V_EQUUPCODE':records.items[i].data.V_EQUUPCODE,
                                'V_V_EQUCODE':records.items[i].data.V_EQUCODE,
                                'V_V_CREATER':V_V_PERSONCODE
                            },
                            success: function (response) {
                                if(response.RET='SUCCESS')
                                    i_err++;
                                if (i_err == records.length) {
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg:  '添加成功',
                                        buttons: Ext.MessageBox.OK
                                    });

                                    window.opener._seltctFault();
                                    window.close();
                                }

                            }
                        });
                    }


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    window.opener._seltctFault();
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                window.opener._seltctFault();
            }
        });
    } else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '下拉选项不能为全部',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        window.opener._seltctFault();
        return;
    }


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


function setValue22(m_strValue) {
    var namevou = m_strValue;

    if (namevou == "111") {


        Ext.MessageBox.show({
            title: '提示',
            msg: '操作成功',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO,
            fn : function() {


                _seltctFault();

            }

        });

    }else{
        Ext.MessageBox.show({
            title: '提示',
            msg: '操作失败',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function _preViewProcess(ProcessInstanceId,value) {

    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}


function addEquip(equInfoModel) {
    var store = Ext.getCmp('equGridpanel').getStore();
    var count = store.getCount();
    // if (count > 10) {
    //     store.remove(store.getAt(count - 1));
    // }

    store.insert(0, equInfoModel);//fi++
}

function OnClickTreeItem(aa, record, item, index, e, eOpts) {
    if (record.data.choose == true) {
        var id=record.data.id;
        var parentid=record.data.parentId;
        var data={};
        if(record.data.leaf == true){
            id=id.substr(0, id.length - 1);
            data.V_EQUUPCODE=parentid;
        }else{
            data.V_EQUUPCODE=id;
        }
        var flag=0;
        var records=Ext.getCmp('equGridpanel').getStore().data;
        for (var i = 0; i < records.length; i++) {
            var temp=records.items[i].data.V_EQUCODE;
            if(temp==id){
                flag=1;
                return false;
            }
        }
        data.V_EQUTYPENAME=record.data.V_EQUTYPENAME;
        data.V_EQUCODE=id;
        data.V_EQUNAME=record.data.text;
        data.V_EQUSITE=record.data.V_EQUSITE;
        data.V_EQUSITENAME=record.data.V_EQUSITENAME;
        data.V_EQUTYPECODE=record.data.V_EQUTYPECODE;
        if(flag==0){
            // if(record.data.leaf == true){
            //     var data = {
            //         'V_EQUTYPENAME' : record.data.V_EQUTYPENAME,
            //         'V_EQUCODE' : id,
            //         'V_EQUNAME' : record.data.text,
            //         'V_EQUSITE' : record.data.V_EQUSITE,
            //         'V_EQUSITENAME' : record.data.V_EQUSITENAME,
            //         'V_EQUTYPECODE' : record.data.V_EQUTYPECODE,
            //         'V_EQUUPCODE':parentid
            //     };
            //     addEquip(data);
            // }else{
            //     var data = {
            //         'V_EQUTYPENAME' : record.data.V_EQUTYPENAME,
            //         'V_EQUCODE' : id,
            //         'V_EQUNAME' : record.data.text,
            //         'V_EQUSITE' : record.data.V_EQUSITE,
            //         'V_EQUSITENAME' : record.data.V_EQUSITENAME,
            //         'V_EQUTYPECODE' : record.data.V_EQUTYPECODE,
            //         'V_EQUUPCODE':id
            //     };
            //     addEquip(data);
            // }
            addEquip(data);
        }
    }
}
function _delete(value, metaData, record, rowIdx,colIdx, store, view) {

    return '<a href="javascript:delFixContent(\'' + rowIdx + '\')">删除</a>';
}
function delFixContent(rowIdx) {
    var store = Ext.getCmp('equGridpanel').getStore();
    var sm = Ext.getCmp('equGridpanel').getSelectionModel().getSelection(); //得到表格的选择模型
    store.remove(sm[0]);

}