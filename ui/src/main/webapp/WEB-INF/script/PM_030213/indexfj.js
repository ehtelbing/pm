
var yearguid="";
Ext.onReady(function () {
//厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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
        // ,
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('ck').select(store.first());
        //     }
        // }
    });
//作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
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
            }
        }
        // ,
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('zyq').select(store.first());
        //     }
        // }
    });

//专业加载
    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC', 'V_ZYJC', 'V_LX', 'V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
        // ,
        // listeners: {
        //     load: function (store, records) {
        //         store.insert(0,{V_GUID:'%',V_ZYMC:'全部'});
        //         Ext.getCmp('zy').select(store.first());
        //         queryGrid();
        //     }
        // }
    });

    var gridStore = Ext.create('Ext.data.TreeStore', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['ID_GUID', 'ORGCODE', 'ORGNAME', 'DEPTCODE', 'DEPTNAME', 'ZYCODE', 'ZYNAME', 'EQUCODE', 'V_EQUNAME', 'EQUTYPE', '',
            'V_EQUTYPENAME', 'REPAIRCONTENT', 'PLANHOUR', 'REPAIRTYPE', 'REPAIRTYPENAME', 'INPERCODE', 'INPERNAME', 'INDATE',
            'STATE', 'V_BASENAME', 'REMARK', 'V_FLOWCODE', 'V_FLOWTYPE', 'MXCODE', 'PLANTYPE', 'V_YEAR', 'V_MONTH',
            'PLANTJMONTH', 'PLANJGMONTH', 'WXTYPECODE', 'WXTYPENAME', 'PTYPECODE', 'PTYPENAME', 'PLANDAY', 'REDEPTCODE', 'REDEPTNAME',
            'FZPERCODE', 'FZPERNAME', 'SGTYPECODE', 'SGTYPENAME', 'SCLBCODE', 'SCLBNAME', 'PRO_NAME', 'YEARID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'tree/PM_PLAN_YEAR_SEL_FJ',
            actionMethods: {
                read: 'POST'
            }
        },
        reader: {
            type: 'json',
            root: 'list'
        }
        , root: {
            text: 'root',
            expanded: true
        }
    });

    var npanel = Ext.create('Ext.panel.Panel', {
        id: 'npanel',
        region: 'north',
        frame: true,
        border: false,
        layout: 'column',
        items: [
            {
                xtype: 'combobox',
                id: 'ck',
                store: ckStore,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 10px 0px 0px 10px',
                labelAlign: 'right',
                width: 250
            },
            {
                xtype: 'combobox',
                id: 'zyq',
                store: zyqStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                labelAlign: 'right',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250,
                style: ' margin: 10px 0px 0px 10px'
            },
            {
                xtype: 'combobox',
                id: 'zy',
                labelAlign: 'right',
                width: 250,
                labelWidth: 80,
                allowBlank: false,
                store: zyStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '专业',
                displayField: 'V_ZYMC',
                style: ' margin: 10px 0px 0px 10px',
                valueField: 'V_GUID'
            }, {
                id: 'begintime',
                xtype: 'datefield',
                fieldLabel: '申请日期',
                format: 'Y/m',
                editable: false,
                labelWidth: 55,
                queryMode: 'local',
                value: new Date(),
                style: ' margin: 10px 0px 0px 10px',
                labelAlign: 'right',
                width: 180
            }, {
                id: 'endtime',
                xtype: 'datefield',
                fieldLabel: '至',
                format: 'Y/m',
                editable: false,
                labelWidth: 55,
                queryMode: 'local',
                value: new Date(),
                //baseCls: 'margin-bottom',
                style: ' margin: 10px 0px 0px 10px',
                labelAlign: 'right',
                width: 180
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: queryGrid,
                style: 'margin: 12px 0px 0px 10px'
            }, {
                xtype: 'button',
                text: '分解',
                icon: imgpath + '/accordion_collapse.png',
                handler: _fenjie,
                style: 'margin: 12px 0px 0px 10px'
            }
        ]
    });
    var cpanel = Ext.create('Ext.tree.Panel', {
        id: 'cpanel',
        store: gridStore,
        border: false,
        split : true,
        stripeRows: true,
        rootVisible: false,
        useArrows: true,
        region: 'center',
        columnLines: true,
        viewConfig:{
            forceFit:true
        },
        columns: [
            {xtype: 'rownumberer', text: '序号', align: 'center', width: 50},
            {text: 'yearid', align: 'center', width: 100, dataIndex: 'YEARID', hidden: true},
            {text: 'ID_GUID', align: 'center', width: 100, dataIndex: 'ID_GUID', hidden: true},
            {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATE', hidden: true},
            {xtype: 'treecolumn', text: '项目名称', align: 'center', width: 100, dataIndex: 'PRO_NAME'},
            // {text: '项目名称', align: 'center', width: 100, dataIndex:'PRO_NAME'},
            {text: '年份', align: 'center', width: 70, dataIndex: 'V_YEAR'},
            {text: '计划停机月份', align: 'center', width: 100, dataIndex: 'V_MONTH'},
            // {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATENAME'},
            {text: '厂矿', align: 'center', width: 120, dataIndex: 'ORGNAME'},
            {text: '车间名称', align: 'center', width: 150, dataIndex: 'DEPTNAME'},
            {text: '专业', align: 'center', width: 100, dataIndex: 'ZYNAME'},
            {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
            {text: '设备类型名称', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME', hidden: true},
            {text: '检修内容', align: 'center', width: 150, dataIndex: 'REPAIRCONTENT'},

            {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'PLANHOUR'},
            {text: '检修类别', align: 'center', width: 100, dataIndex: 'REPAIRTYPENAME'},

            {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERNAME'},
            {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERCODE', hidden: true},
            {
                text: '录入时间',
                align: 'center',
                width: 150,
                dataIndex: 'INDATE',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            }
        ]
        , listeners: {
            itemClick: function (record,node ) {
                yearguid=node.data.ID_GUID;
            }
        }
        });
    init();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [npanel, cpanel]
    });


});

function queryGrid() {
    // Ext.data.StoreManager.lookup('gridStore').proxy.extraParams = {
    //     V_V_ORGCODE: Ext.getCmp('ck').getValue(),
    //     V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
    //     V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
    //     V_V_ZY: Ext.getCmp('zy').getValue(),
    //     V_SDATE: Ext.getCmp('begintime').getSubmitValue(),
    //     V_EDATE: Ext.getCmp('endtime').getSubmitValue(),
    //     V_UPGRID: '-1'
    // }
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_SDATE: Ext.getCmp('begintime').getSubmitValue(),
            V_EDATE: Ext.getCmp('endtime').getSubmitValue(),
            V_UPGRID: '-1'
        }
    })
}


function init() {
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
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
}

function _fenjie() {
    if(yearguid==""){
        alert("请单击选择一条记录");
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GET_FJGUID',
        method: 'POST',
        async: false,
        params: {
            V_GUID: 'fj',
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring()),
            V_UPGUID:yearguid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET != '') {
                // window.open(AppUrl+'page/PM_030212/addYearPlan.html?CK=' + Ext.getCmp("ck").getValue() +
                window.open(AppUrl+'page/PM_030213/fjAddYearPlan.html?CK=' + Ext.getCmp("ck").getValue() +
                    "&ZYQ=" + Ext.getCmp("zyq").getValue()+'&YEARGUID='+resp.RET+'&UPGUID='+yearguid+'&FLAG='+'update', '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes')
            }
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GETONE_SEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_GUID: yearguid
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET != null) {
                V_V_ORGCODE = data.RET[0].ORGCODE;
                V_V_DEPTCODE = data.RET[0].DEPTCODE;
                V_V_SPECIALTY = data.RET[0].ZYCODE;
                V_PERSONNAME = data.RET[0].INPERNAME;
                V_PERSONCODE = data.RET[0].INPERCODE;
                //alert(V_PERSONCODE);
                Ext.getCmp('year').select(data.RET[0].V_YEAR);
                Ext.getCmp('yf').select(data.RET[0].V_MONTH);
                Ext.getCmp('ck').select(data.RET[0].ORGCODE);
                Ext.getCmp('zyq').select(data.RET[0].DEPTCODE);
                Ext.getCmp('zy').select(data.RET[0].ZYCODE);
                Ext.getCmp('sblx').select(data.RET[0].EQUTYPE);
                Ext.getCmp('sbmc').select(data.RET[0].V_EQUCODE);
                Ext.getCmp('fqr').setValue(data.RET[0].INPERNAME);
                Ext.getCmp('fqsj').setValue(data.RET[0].INDATE.substring(0, 19));
                Ext.getCmp('jxnr').setValue(data.RET[0].REPAIRCONTENT);
                Ext.getCmp('jhtgsj').setValue(data.RET[0].PLANTJMONTH.substring(0, 7));

                Ext.getCmp('jhjgsj').setValue(data.RET[0].PLANJGMONTH.substring(0, 7));

                Ext.getCmp('jhgshj').setValue(data.RET[0].PLANHOUR);
                Ext.getCmp('bz').setValue(data.RET[0].REMARK);
                _selectNextPer();
                _selectTaskId();
                Ext.getBody().unmask();
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
}