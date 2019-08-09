/**
 * create by hrb 2019/7/31
 * 生产写实生成缺陷
 * */
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var I_ID="";
var defectguid = guid();
if(location.href.split('?')[1]!= undefined){
    I_ID=Ext.urlDecode(location.href.split('?')[1]).I_ID;
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
Ext.onReady(function(){

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
    });
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
    });
    var sbmcStore = Ext.create('Ext.data.Store', {
        id: 'sbmcStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME','V_EQUSITE','V_EQUSITENAME'],
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
    var childEquStore = Ext.create('Ext.data.Store', {
        id: 'childEquStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
            extraParams: {
                V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
                V_PERCODE: Ext.util.Cookies.get('v_personcode')
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

    var fileview = Ext.create("Ext.data.Store", {
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

    var filegrid = Ext.create("Ext.grid.Panel", {
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
            text: '附件编码',
            hide: true,
            dataIndex: 'FILE_CODE'
        }, {
            text: '附件名称',
            flex: 0.6,
            width: 340,
            id: 'fjname',
            align: 'center',
            dataIndex: "FILE_NAME"
            //renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.4,
            width: 340,
            align: 'center',
            renderer: _delRander
        }]
    });

    //--UPDATE 2018-09-27
    var win = Ext.create('Ext.window.Window', {
        id: 'win',
        title: '附件添加窗口',
        closeAction: 'hide',
        layout: 'vbox',
        width: 880,
        height: 400,
        modal: true,
        plain: true,
        bodyPadding: 10,
        items: [{
            xtype: 'form',
            id: 'uploadFile',
            region: 'north',
            layout: 'hbox',
            fileUpload: true,
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
            }, {
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
        }, {
            columnWidth: 1,
            height: 380,
            width: 800,
            items: filegrid
        }],
        closable: true,
        model: true
    });

    var npanel=Ext.create('Ext.panel.Panel',{
        id:'npanel',
        region:'north',
        layout:{
            type:'table',
            columns:'3'
        },
        items:[
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
            }
        ]
    });
    var equRadio=Ext.create('Ext.form.RadioGroup',{
        id:'equRadio',
        hideLabel : true,
        // vertical: true,
        Horizontal:true,
        layout:'vbox',
        items:[
           /* { boxLabel: 'Item 1',id:'sbmcid',name: 'sbmc', inputValue: '1' },
            { boxLabel: 'Item 2',id:'sbmcid',name: 'sbmc', inputValue: '2', checked: true}*/
        ],
        listeners:{
            change:function(field,newVal,oldVal,eOpts){
                changEquSite(newVal);
                childEquQuery();
            }
        }
    });
    var westPanel=Ext.create('Ext.panel.Panel',{
        id:'westPanel',
        layout:'vbox',
        width:'30%',
        /*frame:true,
        border:false,
        baseCls: 'my-panel-no-border',*/
        region:'west',
        items:[equRadio]
    });
    var equSiteRadio=Ext.create('Ext.form.RadioGroup',{
        id:'equSiteRadio',
        hideLabel : true,
        layout:'vbox',
        items:[],
        listeners:{
            change:function(field,newVal,oldVal,eOpts){
                changEquCode(newVal);
            }
        }
    });
    var centerPanel=Ext.create('Ext.panel.Panel',{
        id:'centerPanel',
        layout:'vbox',
        width:'30%',
        region:'center',
        /*frame:true,
        border:false,
        baseCls: 'my-panel-no-border',*/
        items:[equSiteRadio]
    });
    var equGridPanel=Ext.create('Ext.grid.Panel',{
        id:'equGridPanel',
        region:'center',
        border:'false',
        width:'50%',
        columnLines:true,
        autoScroll:true,
        store: sbmcStore,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns:[
            {text:'设备编码',dataIndex: 'V_EQUCODE',width:200,hidden:true,render:atLeft},
            {text:'设备名称',dataIndex: 'V_EQUNAME',width:200,render:atLeft},
            {text:'设备位置编码',dataIndex: 'V_EQUSITE',width:430,hidden:true,render:atLeft},
            {text:'设备位置',dataIndex: 'V_EQUSITENAME',width:430,render:atLeft}
        ]/*,
        listener:{
            onStoreLoad:function(){
               this.getSelectionModel().selectRange(0,0,true);
                childEquQuery();
            },


        }*/
    });
    var eastPanel=Ext.create('Ext.panel.Panel',{
        id:'eastPanel',
        layout:'vbox',
        width:'50%',
        region:'east',
        items:[
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
            {
                xtype: 'combo',
                id: 'clfs',
                store: clfsStore,
                fieldLabel: '处理方式',
                labelAlign: 'right',
                editable: false,
                hidden:true,
                margin: '5 0 5 5',
                labelWidth: 75,
                width: 255,
                displayField: 'WAYNAME',
                valueField: 'WAYID',
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                id: 'inper',
                fieldLabel: '录入名字',
                margin: '5 0 10 5',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                value: decodeURI(V_V_PERSONNAME)
            },
            {
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                fieldLabel: '发现时间',
                labelAlign: 'right',
                labelWidth: 80,
                width: 255,
                baseCls: 'margin-bottom'
            },
            {
                xtype: 'combo',
                id: 'hour',
                fieldLabel: '小时',
                editable: false,
                margin: '5 0 0 5',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                value: '',
                displayField: 'displayField',
                valueField: 'valueField',
                store: hourStore,
                queryMode: 'local'
            },
            {
                xtype: 'combo',
                id: 'minute',
                fieldLabel: '分钟',
                editable: false,
                margin: '5 0 0 5',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                value: '',
                displayField: 'displayField',
                valueField: 'valueField',
                store: minuteStore,
                queryMode: 'local'
            },
            {
                xtype: 'textarea',
                id: 'qxmc',
                fieldLabel: '缺陷明细',
                margin: '5 0 10 5',
                labelAlign: 'right', labelWidth: 75, width: 255, height: 80, value: ''
            },
            {
                xtype: 'textarea',
                id: 'clyj',
                fieldLabel: '处理意见',
                margin: '5 0 10 5',
                labelAlign: 'right',
                labelWidth: 75,
                width: 255,
                height: 80,
                value: ''
            }

            ,{xtype:'panel',frame:true,width:'100%',layout:'column',baseCls : 'my-panel-noborder',
                items:[{xtype: 'button', id: 'btn3', text: '上传附件', margin: '0px 0px 0px 15px', handler: upfile},
                    {
                        xtype: 'button',
                        id: 'btn1',
                        text: '保存',
                        icon: imgpath + '/add.png',
                        margin: '0px 0px 0px 15px',
                        handler: OnButtonSave
                    }]}
        ]
    });

    var cpanel=Ext.create('Ext.panel.Panel',{
        id:'cpanel',
        region:'center',
        layout:'border',
        // items:[westPanel,cPanel,eastPanel]
        // items:[westPanel,centerPanel,eastPanel]
        items:[equGridPanel,eastPanel]
    });
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[npanel,cpanel]
    });
    Ext.getCmp('hour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('minute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
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
    Ext.data.StoreManager.lookup('sblxStore').on('load', function (store, records) {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });

    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function (store, records) {
        // Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        // Ext.getCmp("mainequsite").setText("主设备位置:"+Ext.data.StoreManager.lookup('sbmcStore').data.items[0].get("V_EQUSITENAME"));

        /*if(records.length>0){
            var redios=[];
            for(var i=0;i<records.length;i++){
                if(i==0){
                    Ext.ComponentManager.get("equRadio").add({
                        checked : true,
                        boxLabel : records[0].get("V_EQUNAME"),
                        name : "sbmc",
                        // width:'300',
                        // labelWidth:'280',
                        inputValue : records[0].get("V_EQUCODE")
                    });
                    Ext.ComponentManager.get("equSiteRadio").add({
                        checked : true,
                        boxLabel : records[0].get("V_EQUSITENAME"),
                        name : "mainequsite",
                        inputValue : records[0].get("V_EQUSITE")
                    });
                }else{
                    Ext.ComponentManager.get("equRadio").add({
                        boxLabel : records[i].get("V_EQUNAME"),
                        name : "sbmc",
                        inputValue : records[i].get("V_EQUCODE")
                    });
                    Ext.ComponentManager.get("equSiteRadio").add({
                        boxLabel : records[i].get("V_EQUSITENAME"),
                        name : "mainequsite",
                        inputValue : records[i].get("V_EQUSITE")
                    });
                }
            }
            Ext.ComponentManager.get("equRadio").doLayout();
            Ext.ComponentManager.get("equSiteRadio").doLayout();
        }*/

       /* Ext.ComponentManager.get("equRadio").add({
            checked : true,
            id:'sbmcid',
            boxLabel : '1',//records.data[0].get("V_EQUNAME"),
            name : "sbmc",
            inputValue :'10'//records.data[0].get("V_EQUCODE")
        });*/
        Ext.getCmp("equGridPanel").getSelectionModel().selectRange(0,0,true);
        childEquQuery();
        // Ext.ComponentManager.get("westPanel").items.add({});
        // Ext.getCmp('cpanel').show();
        // Ext.getCmp('sgrid').getView().refresh()
    });
    Ext.data.StoreManager.lookup('childEquStore').on('load', function (store) {
        store.insert(0,{V_EQUNAME:'全部',V_EQUCODE:'%'});
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
       /* Ext.ComponentManager.get("equRadio").items.removeAll();
        Ext.ComponentManager.get("equRadio").doLayout();

        Ext.ComponentManager.get("equSiteRadio").items.removeAll();
        Ext.ComponentManager.get("equSiteRadio").doLayout();*/
    });
    Ext.getCmp("equGridPanel").getStore().on('load',function(){
        equGridPanel.getSelectionModel().selectRange(0,0,true);
        childEquQuery();
    }) ;
    Ext.getCmp("equGridPanel").getSelectionModel().on('select',function(){
        childEquQuery();
    });
    loadData();

});
function atLeft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value ;
}
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
}
function loadData(){
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_GET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_I_ID:I_ID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            var resp = data.list[0];
            var dateD =resp.D_DATE;
            var day=dateD.split(" ")[0];
            var hour=dateD.split(" ")[1].split(":")[0];
            var min=dateD.split(" ")[1].split(":")[1];
            Ext.getCmp("inper").setValue(resp.V_PERSONNAME);
            Ext.getCmp("qxmc").setValue(resp.V_INFORMATION);
            Ext.getCmp("begintime").setValue(Ext.Date.format(new Date(day),'Y/m/d'));
            Ext.getCmp("hour").setValue(hour);
            Ext.getCmp("minute").setValue(min);
            /*Ext.getCmp('nowtime').setValue(resp.D_DATE);
            Ext.getCmp('bx').select(resp.V_CLASSTYPE);
            Ext.getCmp('bz').select(resp.V_CLASS);
            Ext.getCmp('lx').select(resp.V_TYPE);
            Ext.getCmp('xxnr').setValue(resp.V_INFORMATION);
            Ext.getCmp('zdtz').setValue(resp.V_NOTIFICATION == 'Y' ? true : false);
            var vals = resp.V_DEPT.split('|');
            var objs = Ext.getCmp('xgbm').items.items;
            for (i = 0; i < vals.length; i++) {
                for (j = 0; j < objs.length; j++) {
                    if (objs[j].inputValue == vals[i]) {
                        objs[j].setValue(true);
                        break;
                    }
                }
            }*/
        }
    });
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
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
            var massage = action.result.message;
            if (massage == "{list=Success}") {
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


function OnButtonSave() {
    var gridR=Ext.getCmp('equGridPanel').getSelectionModel().getSelection();
    if(gridR.length!=1){
        Ext.Msg.alert("操作信息","请选择一条数据进行保存");
        return;
    }
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
    if (Ext.getCmp('sblx').getValue() == '%' || gridR[0].get("V_EQUCODE") == '%') {
        Ext.Msg.alert('操作信息', '设备类型或设备名称不可以为空');
        return;
    }
    if (Ext.getCmp('zsbmc').getValue() == '%') {
        Ext.Msg.alert('操作信息', '子设备不可以为全部');
        return;
    }
    var findDate=Ext.getCmp("begintime").getSubmitValue();
    var findTime=findDate+" "+Ext.getCmp("hour").getValue()+":"+Ext.getCmp("minute").getValue()+":"+"00";
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PP_INFORMATION_STAT_UPDT',
        method: 'POST',
        async: false,
        params: {
            V_ID:I_ID,
            V_STATE:'已转出',
            V_DEFCODE:defectguid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
            }else{
                alert("状态修改失败");
            }
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SET_H',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: defectguid,
            V_V_PERCODE: '',//Ext.getCmp('inper').getValue(),
            V_V_PERNAME: Ext.getCmp('inper').getValue(),
            V_V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personcode')),
            V_V_DEFECTLIST: Ext.getCmp('qxmc').getValue(),
            V_V_SOURCECODE: Ext.getCmp('qxlx').getValue(),//'defct01',
            V_V_SOURCEID: '',
            V_D_DEFECTDATE: Ext.util.Format.date(new Date(findTime),'Y/m/d H:m:s'),//Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),//Ext.getCmp("begintime").getSubmitValue(),//Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE: gridR[0].get("V_EQUCODE"),//Ext.getCmp('equRadio').getChecked()[0].inputValue,
            V_V_EQUCHILDCODE: Ext.getCmp('zsbmc').getValue(),
            V_V_IDEA: Ext.getCmp('clyj').getValue(),
            V_V_LEVEL: Ext.getCmp('qxdj').getValue(),
            V_V_PROWAY: Ext.getCmp('clfs').getValue(),
            V_V_HANDSIGN:'1'
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == '成功') {
                Ext.Msg.alert('操作信息', '保存成功', function () {
                    // window.location.reload();
                    window.opener.queryGrid();
                    window.close();
                });
            }
        }
    });
}
function childEquQuery(){
    Ext.data.StoreManager.lookup('childEquStore').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE:Ext.getCmp('equGridPanel').getSelectionModel().getSelection()[0].get("V_EQUCODE")// Ext.getCmp('equRadio').getChecked()[0].inputValue
        }
    });
}
function changEquSite(selValue){
    var records=Ext.data.StoreManager.lookup('sbmcStore').data.items;
    var equsiteCode="";
    if(records.length>0){
        for(var a=0;a<records.length;a++) {
            if (records[a].get("V_EQUCODE")==selValue.sbmc) {
                equsiteCode=records[a].get("V_EQUSITE");
            }
        }
    }
    var equSiteRad=Ext.getCmp("equSiteRadio").getRefItems();
    for(var b=0;b<equSiteRad.length;b++){
        if(equSiteRad[b].inputValue==equsiteCode){
            equSiteRad[b].checked=true;
            equSiteRad[b].setRawValue(true);
        }else{
            equSiteRad[b].checked=false;
            equSiteRad[b].setRawValue(false);
        }
    }
    childEquQuery();
}
function changEquCode(selValue){
    var records=Ext.data.StoreManager.lookup('sbmcStore').data.items;
    var equcode="";
    if(records.length>0){
        for(var a=0;a<records.length;a++) {
            if (records[a].get("V_EQUSITE")==selValue.mainequsite) {
                equcode=records[a].get("V_EQUCODE");
            }
        }
    }
    var equRad=Ext.getCmp("equRadio").getRefItems();
    for(var b=0;b<equRad.length;b++){
        if(equRad[b].inputValue==equcode){
            equRad[b].checked=true;
            equRad[b].setRawValue(true);
        }else{
            equRad[b].checked=false;
            equRad[b].setRawValue(false);
        }
    }
    childEquQuery();
}

