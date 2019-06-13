var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME=Ext.util.Cookies.get('v_personname');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var defectguid=guid();
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
var defect="";
var defState="";
if(location.href.split("?")[1]!=undefined){
    defect=Ext.urlDecode(location.href.split("?")[1]).defect;
    defState=Ext.urlDecode(location.href.split("?")[1]).defState;
}

Ext.onReady(function () {
    // Ext.getBody().mask('<p>页面载入中...</p>');

    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
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
        // ,listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('ck').select(store.first());
        //         zyqload();
        //     }
        // }
    });
    var zyqStore = Ext.create('Ext.data.Store', {
        id: 'zyqStore',
        autoLoad: false,
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
            }
        }
        // ,listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('zyq').select(store.first());
        //         sblxload();
        //     }
        // }
    });
//设备类型
    var sblxStore = Ext.create('Ext.data.Store', {
        id: 'sblxStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
        // ,listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('sblx').select(store.second());
        //         sbmcload();
        //     }
        // }
    });
//设备名称
    var sbmcStore = Ext.create('Ext.data.Store', {
        id: 'sbmcStore',
        autoLoad: false,
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
        // ,listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('sbmc').select(store.first());
        //         _selectsubequName1();
        //     }
        // }
    });
    var childEquStore = Ext.create('Ext.data.Store', {
        id: 'childEquStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        })
        // ,listeners: {
        //     load: function (store, records) {
        //         // Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
        //         store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
        //         Ext.getCmp('zsbmc').select(store.first());
        //     }
        // }
    });
//缺陷类型
    var qxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        id: 'qxlxStore',
        fields: ['V_SOURCECODE', 'V_SOURCENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
        , listeners: {
            load: function (store, records) {
                Ext.getCmp('qxlx').select(store.first());
            }
        }
    });
//处理方式
    var clfsStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        id: 'clfsStore',
        fields: ['WAYID', 'WAYNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/DEFECT_PROCESS_WAY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams:{
                V_DEPTCODE:Ext.util.Cookies.get('v_deptcode'),
                V_PERCODE:Ext.util.Cookies.get('v_personcode')
            }
        }
        , listeners: {
            load: function (store, records) {
                Ext.getCmp('clfs').select(store.first());
            }
        }
    });

    var djStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        id: 'djStore',
        fields: ['V_LEVELCODE', 'V_LEVELNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_LEVEL_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
        , listeners: {
            load: function (store, records) {
                Ext.getCmp('qxdj').select(store.first());
            }
        }

    });

    var fileview=Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileview',
        fields: ['FILE_CODE', 'FILE_NAME', 'FILE_TYPE', 'INSERT_DATE', 'INSERT_PERSON'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/DEFECT_UPFILE_SELECT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_GUID: defectguid
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var filegrid=Ext.create("Ext.grid.Panel", {
        id: 'filegrid',
        region: 'center',
        height: '100%',
        width: '100%',
        columnLines: true,
        store: fileview,
        autoScroll: true,
        margin: '10px 0px 0px 15px',
        //colspan: 3,
        columns: [{
            text:'附件编码',
            hide:true,
            dataIndex:'FILE_CODE'
        },{
            text: '附件名称',
            flex: 0.6,
            width:340,
            id : 'fjname',
            align: 'center',
            dataIndex: "FILE_NAME"
            //renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.4,
            width:340,
            align: 'center',
            renderer: _delRander
        }]
    });

    //--UPDATE 2018-09-27
    var win=Ext.create('Ext.window.Window',{
        id:'win',
        title:'附件添加窗口',
        closeAction:'hide',
        layout: 'vbox',
        width: 880,
        height: 400,
        modal: true,
        plain: true,
        bodyPadding: 10,
        items: [{
            xtype: 'form',
            id:'uploadFile',
            region: 'north',
            layout: 'hbox',
            fileUpload:true,
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: "filefield",
                name: 'V_V_BLOB',
                id: "V_V_BLOB",
                enctype: "multipart/form-data",
                fieldLabel: "上传附件",
                fileUpload: true,
                allowBlank: false,
                labelWidth: 100,
                width: 440,
                labelStyle: 'color:red;font-weight:bold',
                margin: '5px 0px 5px 5px',
                emptyText: '请选择文件',
                buttonText: '浏览',
                invalidText: '文件格式不正确'
            }, {
                id: 'insertFilesFj2',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 15px',
                handler: _upLoadFile
            }, {
                xtype: 'hidden',
                name: 'V_GUID',
                id: 'V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_FILENAME',
                id: 'V_FILENAME'
            },  {
                xtype: 'hidden',
                name: 'V_PLANT',
                id: 'V_PLANT'
            }, {
                xtype: 'hidden',
                name: 'V_DEPT',
                id: 'V_DEPT'
            }, {
                xtype: 'hidden',
                name: 'V_PERSONCODE',
                id: 'V_PERSONCODE'
            }/*, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }*/

            ]
        } ,{
            columnWidth: 1,
            height: 380,
            width: 800,
            items: filegrid
        }],
        closable: true,
        model: true
    });

    var panel = Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout: 'vbox',
        frame: true,
        width: '100%',
        items: [

            {xtype:'panel',frame:true,layout:'column',width:255,border:false,
                items:[
                    {xtype: 'button',id:'btn3', text: '上传附件', margin : '0px 0px 0px 15px',handler:upfile},
                    {xtype: 'button',id:'btn1', text: '保存',icon: imgpath +'/add.png', margin : '0px 0px 0px 15px',handler :OnButtonSave}  //,
                ]},
            {
                xtype: 'combo',
                id: 'ck',
                store: ckStore,
                fieldLabel: '计划厂矿',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local'
                , listeners: {
                    change: function () {
                        zyqload();
                    }
                }
            },
            {
                xtype: 'combo',
                id: 'zyq',
                store: zyqStore,
                fieldLabel: '作业区',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local'
                , listeners: {
                    change: function (field, newValue, oldValue) {
                        sblxload();
                    }
                }
            },
            {
                xtype: 'combo',
                id: 'sblx',
                store: sblxStore,
                fieldLabel: '设备类型',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local'
                , listeners: {
                    change: function () {
                        sbmcload();
                    }
                }
            },
            {
                xtype: 'combo',
                id: 'sbmc',
                store: sbmcStore,
                fieldLabel: '设备名称',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local'
                // , listeners: {
                //     change: function () {
                //         _selectsubequName1()
                //     }
                // }
            },
            {
                xtype: 'combo',
                id: 'zsbmc',
                store: childEquStore,
                fieldLabel: '子设备名称',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local'
            },
            {
                xtype: 'combo',
                id: 'qxlx',
                store: qxlxStore,
                fieldLabel: '缺陷类型',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_SOURCENAME',
                valueField: 'V_SOURCECODE',
                queryMode: 'local'
            },
            {
                xtype: 'combo',
                id: 'qxdj',
                store: djStore,
                fieldLabel: '缺陷等级',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'V_LEVELNAME',
                valueField: 'V_LEVELCODE',
                queryMode: 'local'
            },
            {    xtype: 'combo',
                id: 'clfs',
                store:clfsStore,
                fieldLabel: '处理方式',
                labelAlign: 'right',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'WAYNAME',
                valueField: 'WAYID',
                queryMode: 'local'
            }
            ,
            {
                xtype: 'textarea',
                id: 'qxmc',
                fieldLabel: '缺陷明细',
                margin: '5 0 10 5',
                labelAlign: 'right',labelWidth:75,width:255,height:80, value: ''
            },
            {
                xtype: 'textarea',id:'clyj',fieldLabel: '处理意见',margin: '5 0 10 5',labelAlign: 'right',labelWidth:75,width:255,height:80, value: ''
            }
            ,{
                xtype: 'textfield',
                id: 'inper',
                fieldLabel: '录入名字',
                margin: '5 0 10 5',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                value: decodeURI(V_V_PERSONNAME)
            }
            ,
            {
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                fieldLabel: '发现时间',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                baseCls: 'margin-bottom'
            }


        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
//作业区加载数据
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        //加载设备类型
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(1));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        Ext.data.StoreManager.lookup('childEquStore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
            }
        });

    });
    Ext.data.StoreManager.lookup('childEquStore').on('load',function(){
        Ext.getCmp("zsbmc").select(Ext.data.StoreManager.lookup('childEquStore').getAt(0));
            });

    //厂矿改变
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区改变
    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备类型改变
    Ext.getCmp('sblx').on('select', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    Ext.getCmp('sbmc').on('select', function () {
        Ext.data.StoreManager.lookup('childEquStore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
            }
        });
    });
});


function zyqload() {
    Ext.data.StoreManager.lookup('zyqStore').proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };

}

function sblxload() {
    Ext.data.StoreManager.lookup('sblxStore').proxy.extraParams = {
        V_V_PERSONCODE: V_V_PERSONCODE,
        V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
    };

}

function sbmcload() {
    Ext.data.StoreManager.lookup('sbmcStore').proxy.extraParams = {
        v_v_personcode: V_V_PERSONCODE,
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    // Ext.data.StoreManager.lookup('sbmcStore').load({
    //     params: {
    //         v_v_personcode: Ext.util.Cookies.get('v_personcode'),
    //         v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
    //         v_v_equtypecode: Ext.getCmp('sblx').getValue()
    //     }
    // });
}

function _selectsubequName1() {
    Ext.data.StoreManager.lookup('childEquStore').proxy.extraParams = {
        V_V_PERSONCODE: V_V_PERSONCODE,
        V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
        V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
    };

    // if(Ext.getCmp('sbmc').getValue() == '%')
    // {
    //     Ext.data.StoreManager.lookup('childEquStore').proxy.extraParams = {
    //             V_V_PERSONCODE: V_V_PERSONCODE,
    //             V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
    //             V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
    //             V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
    //             V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
    //         };
    //     Ext.data.StoreManager.lookup('childEquStore').on('load',function(){
    //         Ext.ComponentManager.get("zsbmc").store.insert(0,{V_EQUCODE:'%',V_EQUNAME:'全部'});
    //         Ext.ComponentManager.get("zsbmc").select(Ext.data.StoreManager.lookup('childEquStore').getAt(0));
    //     });
    //
    // }
    // if(Ext.getCmp('sbmc').getValue() != '%')
    // {
    //     Ext.data.StoreManager.lookup('childEquStore').proxy.extraParams = {
    //         V_V_PERSONCODE: V_V_PERSONCODE,
    //         V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
    //         V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
    //         V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
    //         V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
    //     };
    //     Ext.data.StoreManager.lookup('childEquStore').on('load',function(){
    //         Ext.ComponentManager.get("zsbmc").select(Ext.data.StoreManager.lookup('childEquStore').getAt(1));
    //     });
    // }

}

//
//保存
function OnButtonSave() {
    if (Ext.getCmp('qxmc').getValue() == null || Ext.getCmp('qxmc').getValue() == '' || Ext.getCmp('qxmc').getValue() == undefined) {
        Ext.Msg.alert('操作信息', '缺陷明细不能为空');
        return;
    }
    if (Ext.getCmp('qxdj').getValue() == null || Ext.getCmp('qxdj').getValue() == '' || Ext.getCmp('qxdj').getValue() == undefined) {
        Ext.Msg.alert('操作信息', '缺陷等级不能为空');
        return;
    }
    if (Ext.getCmp('clyj').getValue() == null || Ext.getCmp('clyj').getValue() == '' || Ext.getCmp('clyj').getValue() == undefined) {
        Ext.Msg.alert('操作信息', '处理意见不能为空');
        return;
    }
    if (Ext.getCmp('sblx').getValue() == '%' || Ext.getCmp('sbmc').getValue() == '%') {
        Ext.Msg.alert('操作信息', '设备类型或设备名称不可以为空');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PRO_PM_07_DEFECT_SET_STAT',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: defectguid,
            V_V_PERCODE:'',//Ext.getCmp('inper').getValue(),
            V_V_PERNAME:Ext.getCmp('inper').getValue(),
            V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_INPERNAME:decodeURI(Ext.util.Cookies.get('v_personcode')),
            V_V_DEFECTLIST: Ext.getCmp('qxmc').getValue(),
            V_V_SOURCECODE: Ext.getCmp('qxlx').getValue(),//'defct01',
            V_V_SOURCEID: '',
            V_D_DEFECTDATE: Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),//Ext.getCmp("begintime").getSubmitValue(),//Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_EQUCHILDCODE: Ext.getCmp('zsbmc').getValue(),
            V_V_IDEA: Ext.getCmp('clyj').getValue(),
            V_V_LEVEL: Ext.getCmp('qxdj').getValue(),
            V_V_PROWAY:Ext.getCmp('clfs').getValue(),
            V_STATE:defState
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == '成功') {
                Ext.Msg.alert('操作信息', '保存成功', function () {
                    // window.location.reload();
                    window.opener.confirmYS();
                    window.close();
                });
            }
        }
    });
}

//取消
function OnButtonCancel() {
    window.close();
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//--update 2018-9-27
function upfile() {
    Ext.data.StoreManager.lookup('fileview').load();
    Ext.getCmp('win').show();
}

function _upLoadFile() {
    var uploadFile = Ext.getCmp('uploadFile');
    var V_V_BLOB = Ext.getCmp('V_V_BLOB').getSubmitValue();
    var V_V_FILENAME = V_V_BLOB.substring(0, V_V_BLOB.indexOf('.'));

    Ext.getCmp('V_GUID').setValue(defectguid);
    Ext.getCmp('V_V_BLOB').setValue(V_V_BLOB);
    Ext.getCmp('V_FILENAME').setValue(V_V_FILENAME);
    //  Ext.getCmp('V_TYPE').setValue(V_TYPE);
    Ext.getCmp('V_PLANT').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_DEPT').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));

    //if(uploadFile.form.isValid()){
    if (Ext.getCmp('V_V_BLOB').getValue() == '') {
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

    uploadFile.getForm().submit({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_INSERT',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (form, action) {
             var massage=action.result.message;
             if(massage=="{list=Success}"){
                 Ext.Msg.alert('成功', '上传成功');
                 filequery(defectguid);
             }
        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    });
    //}

}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.FILE_CODE + '\')">删除</a>';
}

function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_DELETE',
        method: 'POST',
        async: false,
        params: {
            V_FILECODE: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.list == 'Success') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(defectguid);
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

function filequery(defectguid) {
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_GUID: defectguid
        }
    });
}