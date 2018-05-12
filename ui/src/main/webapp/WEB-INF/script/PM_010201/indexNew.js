var V_V_FILEGUID = '';
var picguidbegin;
var index = 0;
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

    //厂矿store
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('plant').select(ckStore.getAt(0));
            }
        }
    });

    //作业区store
    var zyqStore = Ext.create('Ext.data.Store', {
        id: 'zyqStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        },
        listeners: {//给子集下拉框赋值
            load: function (store, records) {
                Ext.getCmp('dept').select(zyqStore.getAt(0));
            }
        }
    });

    //设备树store
    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE', 'V_EQUTYPECODE', 'V_EQUCODEUP']
    });

    //子设备检修技术标准store
    var zsbjxStore = Ext.create('Ext.data.Store', {
        storeId: 'zsbjxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['I_ID', 'V_GUID', 'V_EQUCODE', 'V_EQUNAME', 'V_BJ_IMG', 'V_PART_NUMBER', 'V_PART_NAME',
            'V_PART_CODE', 'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE', 'V_REPLACE_CYC', 'V_WEIGHT',
            'V_IMGCODE', 'V_CONTENT', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUCHILDCODE',
            'V_EQUCHILDNAME', 'V_EQUTYPECODE', 'V_VALUE_DOWN', 'V_VALUE_UP'],
        proxy: {
            url: AppUrl + 'Wsy/PM_REPAIR_JS_STANDARD_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });


    //工单明细store
    var gdmxStore = Ext.create('Ext.data.Store', {
        storeId: 'gdmxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'D_ENTER_DATE', 'V_SHORT_TXT', 'V_ORDER_TYP', 'V_DEPTNAME', 'V_STATECODE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXBZ_GD_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //panel用到的store，写后台的时候再加每个panel用到的对应正确store
    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [[' '], [' '], [' '], [' '], [' ']],//添加五行空白数据
        proxy: {
            url: 'selectZZ.do',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'ZZlist',
                totalProperty: 'total'
            }
        }
    });

    //缺陷明细store
    var qxmxStore = Ext.create('Ext.data.Store', {
        storeId: 'qxmxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'D_DEFECTDATE', 'V_DEFECTLIST', 'V_IDEA', 'V_STATECODE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXBZ_QX_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修工种store1
    var jxgzStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxgzStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_DE', 'V_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GZ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修机具store1
    var jxjjStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxjjStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_DE', 'V_JJ_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JJ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修机具store2
    var jxjjStore2 = Ext.create('Ext.data.Store', {
        storeId: 'jxjjStore2',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'V_DE', 'V_CARGUISUO', 'V_USE', 'V_FLAG', 'V_DRIVER_NAME'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXMX_JJCODE_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修工具store1
    var jxgjStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxgjStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_TOOLCODE', 'V_TOOLNAME', 'V_TOOLTYPE', 'V_TOOLPLACE', 'V_TOOLINDATE', 'V_TOOLSTATUS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GJ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    var imageStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'imageStore',
        fields: ['I_ID', 'V_FILENAME', 'V_FILETYPE', 'V_INPER', 'V_INPERNAME', 'V_INTIME', 'V_GUID', 'V_FILEGUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PM_REPAIRT_IMG_TABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {}
        })
    });

    //顶部查询条件
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        title: '<div align="center">检修技术标准管理</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            style: 'margin:5px 0px 5px 10px'
        },
        items: [
            {
                xtype: 'combo',
                id: 'plant',
                store: 'ckStore',
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '厂矿',
                emptyText: '全部',
                editable: false,
                labelWidth: 40,
                listeners: {
                    change: function (combo, records) {
                        _selectDept();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'dept',
                store: 'zyqStore',
                style: 'margin:5px 0px 5px 20px',
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '作业区',
                emptyText: '全部',
                editable: false,
                labelWidth: 40,
                listeners: {
                    change: function (combo, records) {
                        _queryTree();
                    }
                }
            }, {
                xtype: 'textfield',
                id: 'zsbmc',
                fieldLabel: '子设备名称',
                labelWidth: 70
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 30px',
                width: 60,
                handler: _queryzsb
            },
            {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                width: 60,
                handler: _insert
            },
            {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                width: 60,
                handler: _update
            },
            {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete1.png',
                width: 60,
                handler: _delete
            }]
    });


    //设备树treePanel
    var sblxTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'sblxTreePanel',
        //title: '设备类型树',
        region: 'west',
        width: '25%',
        rootVisible: false,
        autoScroll: true,
        store: 'treeStore',
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryzsbjx(record.get('sid'));
            }
        }
    });

    //设备检修技术标准gridPanel
    var zsbjxPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'zsbjxPanel1',
        columnLines: true,
        frame: true,
        store: 'zsbjxStore',
        region: 'center',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {
                text: '零件编号',
                dataIndex: 'V_PART_NUMBER',
                align: 'center',
                width: 80
            },
            {
                text: '零件名称',
                dataIndex: 'V_PART_NAME',
                align: 'center',
                width: 80
            },
            {
                text: '零件编码',
                dataIndex: 'V_PART_CODE',
                align: 'center',
                width: 80
            },
            {text: '材料', dataIndex: 'V_MATERIAL', align: 'center', width: 80},
            {
                text: '维修技术标准', align: 'center', flex: 4,
                columns: [
                    {
                        text: '图面尺寸',
                        dataIndex: 'V_IMGSIZE',
                        align: 'center',
                        flex: 1
                    },
                    {
                        text: '图面间隙',
                        dataIndex: 'V_IMGGAP',
                        align: 'center',
                        flex: 1
                    },
                    {
                        text: '允许值(上限)',
                        dataIndex: 'V_VALUE_UP',
                        align: 'center',
                        flex: 1
                    },
                    {
                        text: '允许值(下限)',
                        dataIndex: 'V_VALUE_DOWN',
                        align: 'center',
                        flex: 1
                    }]
            },
            {
                text: '更换周期',
                dataIndex: 'V_REPLACE_CYC',
                align: 'center',
                width: 80
            },
            {text: '重量', dataIndex: 'V_WEIGHT', align: 'center', width: 80},
            {text: '图号', dataIndex: 'V_IMGCODE', align: 'center', width: 80},
            {text: '备注', dataIndex: 'V_CONTENT', align: 'center', width: 150}],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                //_preViewImage(record.get('V_GUID'));
                _querygdmx(record.get('V_GUID'));
                _queryjxgz(record.get('V_GUID'));
                _queryjxjj(record.get('V_GUID'));
                _queryjxgj(record.get('V_GUID'));
                _preViewImage(record.data.V_GUID);
            }
        },
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'zsbjxStore',
            width: '100%'
        }]
    });

    //左上
    var zuoshangPanel = Ext.create('Ext.Panel', {
        id: 'zuoshangPanel',
        frame: true,
        border: false,
        layout: {
            type: 'border',
            regionWeights: {north: 3, east: 1, south: 1, west: 4}
        },
        items: [sblxTreePanel, zsbjxPanel1]
    });

    var jxmxsytButtonPanel = Ext.create('Ext.form.Panel', {
        id: 'jxmxsytButtonPanel',
        frame: true,
        // border: false,
        //baseCls: 'my-panel-no-border',
        layout: 'column',
        region: 'north',
        defaults: {labelAlign: 'center', labelWidth: 200, inputWidth: 160, style: 'margin:5px 10px 5px 10px'},
        items: [{
            xtype: 'button',
            text: '上一页',
            icon: imgpath + '/accordion_collapse.png',
            handler: _last
        }, {
            xtype: 'button',
            text: '下一页',
            icon: imgpath + '/accordion_expand.png',
            handler: _next
        },
            //{xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteJJSYT},
            {xtype: 'hidden', id: 'V_V_GUIDJJSYT', name: 'V_V_GUID'},
            {xtype: 'hidden', id: 'V_V_FILENAMEJJSYT', name: 'V_V_FILENAME'},
            {xtype: 'hidden', id: 'V_V_FILETYPECODEJJSYT', name: 'V_V_FILETYPECODE'},
            {xtype: 'hidden', id: 'V_V_PLANTJJSYT', name: 'V_V_PLANT'},
            {xtype: 'hidden', id: 'V_V_DEPTJJSYT', name: 'V_V_DEPT'},
            {xtype: 'hidden', id: 'V_V_TIMEJJSYT', name: 'V_V_TIME'},
            {xtype: 'hidden', id: 'V_V_PERSONJJSYT', name: 'V_V_PERSON'},
            {xtype: 'hidden', id: 'V_V_REMARKJJSYT', name: 'V_V_REMARK'}
        ]
    });

    //部件简图formPanel
    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'box',
                    id: 'browseImage',
                    autoEl: {
                        width: '100%',
                        height: '100%',
                        tag: 'input',
                        type: 'image',
                        src: Ext.BLANK_IMAGE_URL,
                        style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                        id: 'imageBrowse',
                        name: 'imageBrowse'
                    }
                }]
        }]
    });

    //机具报废明细
    var bjjtPanel = Ext.create('Ext.Panel', {
        id: 'bjjtPanel',
        title: '部件简图',
        layout: 'border',
        items: [jxmxsytButtonPanel, viewImagePanel]
    });

    //工单明细gridPanel
    var gdmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdmxPanel',
        columnLines: true,
        title: '工单明细',
        store: 'gdmxStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单编号', dataIndex: 'V_ORDERID', align: 'center', width: 150},
            {
                text: '工单创建日期',
                dataIndex: 'D_ENTER_DATE',
                align: 'center',
                width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gdmxStore.find('D_ENTER_DATE', value);
                    if (index != -1) {
                        return gdmxStore.getAt(index).get('D_ENTER_DATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {
                text: '工单检修描述',
                dataIndex: 'V_SHORT_TXT',
                align: 'center',
                width: 100
            },
            {
                text: '工单类型',
                dataIndex: 'V_ORDER_TYP',
                align: 'center',
                width: 100
            },
            {
                text: '检修单位',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 230
            },
            {text: '检修标准值', dataIndex: '', align: 'center', width: 100},
            {
                text: '工单状态',
                dataIndex: 'V_STATECODE',
                align: 'center',
                width: 100
            }],
        bbar: [{
            id: 'gdmxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdmxStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryqxmx(record.get('V_ORDERGUID'));
            }
        }
    });

    //缺陷明细gridPanel
    var qxmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'qxmxPanel',
        columnLines: true,
        title: '缺陷明细',
        //baseCls: 'my-panel-no-border',
        //frame: true,
        store: 'qxmxStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {
                text: '缺陷发现日期',
                dataIndex: 'D_DEFECTDATE',
                align: 'center',
                width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = qxmxStore.find('D_DEFECTDATE', value);
                    if (index != -1) {
                        return qxmxStore.getAt(index).get('D_DEFECTDATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {
                text: '缺陷明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 100
            },
            {text: '处理意见', dataIndex: 'V_IDEA', align: 'center', width: 100},
            {
                text: '缺陷状态',
                dataIndex: 'V_STATECODE',
                align: 'center',
                width: 100
            },
            {
                text: '缺陷来源', align: 'center', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_openqxlyWindow(\'' + record.data.V_GUID + '\')>查看</a>';//超链接导出
                }
            }],
        bbar: [{
            id: 'qxmxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'qxmxStore',
            width: '100%'
        }]
    });

    //检修工种上面gridPanel
    var jxgzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel1',
        title: '检修工种',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: 'jxgzStore1',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxgzStore1',
            width: '100%'
        }]
    });

    //检修机具上面gridPanel
    var jxjjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel1',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: 'jxjjStore1',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'V_JJ_DE', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'jxjjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxjjStore1',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryjxjjxx(record.get('V_JJ_CODE'));
            }
        }
    });

    //检修机具下面gridPanel
    var jxjjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel2',
        columnLines: true,
        region: 'center',
        store: 'jxjjStore2',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {
                text: '机具所属单位',
                dataIndex: 'V_CARGUISUO',
                align: 'center',
                flex: 1
            },
            {text: '机具用途', dataIndex: 'V_USE', align: 'center', flex: 1},
            {text: '机具状态', dataIndex: 'V_FLAG', align: 'center', flex: 1},
            {
                text: '司机姓名',
                dataIndex: 'V_DRIVER_NAME',
                align: 'center',
                flex: 1
            }],
        bbar: [{
            id: 'jxjjPanel2_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxjjStore2',
            width: '100%'
        }]
    });

    //检修机具
    var jxjjPanel = Ext.create('Ext.Panel', {
        id: 'jxjjPanel',
        title: '检修机具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {
            type: 'border',
            regionWeights: {north: 3, east: 4, south: 1, west: 1}
        },
        items: [jxjjPanel1, jxjjPanel2]
    });

    //检修工具gridPanel
    var jxgjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel1',
        title: '检修工具',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: 'jxgjStore1',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具名称', dataIndex: 'V_TOOLNAME', align: 'center', flex: 1},
            {text: '工具类型', dataIndex: 'V_TOOLTYPE', align: 'center', flex: 1},
            {text: '工具存在地', dataIndex: 'V_TOOLPLACE', align: 'center', flex: 1},
            {
                text: '工具入厂时间',
                dataIndex: 'V_TOOLINDATE',
                align: 'center',
                width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = jxgjStore1.find('V_TOOLINDATE', value);
                    if (index != -1) {
                        return jxgjStore1.getAt(index).get('V_TOOLINDATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {
                text: '工具状态',
                dataIndex: 'V_TOOLSTATUS',
                align: 'center',
                flex: 1
            }],
        bbar: [{
            id: 'jxgjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxgjStore1',
            width: '100%'
        }]
    });

    //右边大tab
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        title: '检修详情',
        frame: true,
        items: [gdmxPanel, qxmxPanel, jxgzPanel1, jxjjPanel, jxgjPanel1]
    });

    //缺陷生命周期弹窗
    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        title: '缺陷生命周期',
        height: 300,
        closeAction: 'hide',
        width: 500,
        modal: true,
        frame: true
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {north: 4, east: 3, south: 2, west: -1}
        },
        defaults: {border: false},
        items: [
            {region: 'north', items: [inputPanel]},
            {region: 'east', layout: 'fit', width: '50%', items: [tab]},
            {region: 'south', layout: 'fit', height: '50%', items: [bjjtPanel]},
            {region: 'center', layout: 'fit', items: [zuoshangPanel]}]
    });

    Ext.getCmp("sblxTreePanel").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('plant').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('dept').getValue(),
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'Wsy/PRO_SAP_PM_EQU_TREE')
        }
    });
});

//根据厂矿进行作业区联动
function _selectDept() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('plant').getValue();
    zyqStore.load();
}

//树查询
function _queryTree() {
    Ext.getCmp('sblxTreePanel').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'CarManage/PRO_GET_DEPTEQUTYPE_PER',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('dept').getValue()
        }
    });
    Ext.getCmp('sblxTreePanel').store.load();
}

//点击设备树item查询子设备检修技术标准
function _queryzsbjx(sid) {
    Ext.getCmp('zsbmc').setValue('');
    Ext.data.StoreManager.lookup('zsbjxStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('plant').getValue(),
            V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
            V_V_EQUCODE: sid,
            V_V_EQUCHILDCODE: '%'
        }
    });
}

//点击子设备名称按钮查询子设备检修技术标准
function _queryzsb() {
    var records = Ext.getCmp('sblxTreePanel').getSelectionModel().getSelection();
    Ext.data.StoreManager.lookup('zsbjxStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('plant').getValue(),
            V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
            V_V_EQUCODE: records[0].data.sid,
            V_V_EQUCHILDCODE: Ext.getCmp('zsbmc').getValue()
        }
    });
}

//点击检修技术标准item显示部件简图
function _preViewImage(V_V_GUID) {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': V_V_GUID,
        'V_V_FILEGUID': '',
        'V_V_FILETYPE': '检修技术标准'
    };
    imageStore.load();

    index = 0;
    if (imageStore.getCount() != 0) {
        V_V_FILEGUID = imageStore.getAt(0).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(0).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;
        picguidbegin = V_V_FILEGUID;
    } else {
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI('JSBZ'));

        Ext.getCmp("browseImage").getEl().dom.src = url;
    }

    // var url = AppUrl + 'Wsy/BASE_FILE_IMAGE_SEL?V_V_GUID=' + V_GUID;
    // Ext.getCmp("browseImage").getEl().dom.src = url;
}

//点击检修技术标准item查询工单明细
function _querygdmx(V_GUID) {
    Ext.data.StoreManager.lookup('gdmxStore').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击工单明细item查询缺陷明细
function _queryqxmx(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('qxmxStore').load({
        params: {
            V_V_GD_GUID: V_ORDERGUID
        }
    });
}

//点击检修技术标准item查询检修工种
function _queryjxgz(V_GUID) {
    Ext.data.StoreManager.lookup('jxgzStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修技术标准item查询检修机具
function _queryjxjj(V_GUID) {
    Ext.data.StoreManager.lookup('jxjjStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修技术标准item查询检修工具
function _queryjxgj(V_GUID) {
    Ext.data.StoreManager.lookup('jxgjStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修机具item查询检修机具信息
function _queryjxjjxx(V_CARCODE) {
    Ext.data.StoreManager.lookup('jxjjStore2').load({
        params: {
            V_V_CAR_CODE: V_CARCODE
        }
    });
}

//缺陷来源弹窗
function _openqxlyWindow(V_GUID) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index.html?v_guid="
    + V_GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function _insert() {
    var selectedNode = null;
    selectedNode = Ext.getCmp('sblxTreePanel').getSelectionModel().selected.items[0];  //获取当前节点
    //alert(selectedNode.data.leaf);
    if(selectedNode == null){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备！',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    if (selectedNode.data.leaf) {
        var selectedParentNode = selectedNode.parentNode;   //获取该节点的父节点
        //alert(records[0].data.sid);
        /* alert(selectedNode.data.sid);
         alert(selectedParentNode.data.sid)*///父节点的CODE(EQUTYPECODE)
        var V_V_PLANTCODE = Ext.getCmp('plant').getSubmitValue();
        var V_V_DEPTCODE = Ext.getCmp('dept').getSubmitValue();
        var V_V_EQUTYPECODE = selectedParentNode.data.sid;
        var V_V_EQUCODE = selectedNode.data.sid;
        var V_V_EQUCHILDCODE = Ext.getCmp('zsbmc').getValue();
        if (V_V_DEPTCODE == '%') {
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择作业区',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        if (V_V_EQUTYPECODE == '%') {
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择设备',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        if (V_V_EQUCODE == '%') {
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择设备',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
    }
    else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    window.open(AppUrl + 'page/PM_01020101/index.html?V_V_PLANTCODE=' + V_V_PLANTCODE + '&V_V_DEPTCODE=' + V_V_DEPTCODE + '&V_V_EQUTYPECODE=' + V_V_EQUTYPECODE + '&V_V_EQUCODE=' + V_V_EQUCODE + '&V_V_EQUCHILDCODE=' + V_V_EQUCHILDCODE, '_blank', 'width=900,height=700,resizable=yes,scrollbars=yes');
}

function _update() {
    var records = Ext.getCmp('zsbjxPanel1').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择技术标准!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    window.open(AppUrl + 'page/PM_01020102/index.html?V_V_PLANTCODE=' + records[0].get('V_ORGCODE') + '&V_V_DEPTCODE=' + records[0].get('V_DEPTCODE') + '&V_V_EQUTYPECODE=' + records[0].get('V_EQUTYPECODE') + '&V_V_EQUCODE=' + records[0].get('V_EQUCODE') + '&V_V_GUID=' + records[0].get('V_GUID'), '_blank', 'width=900,height=700,resizable=yes,scrollbars=yes');
}

function _delete() {
    var records = Ext.getCmp('zsbjxPanel1').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIR_JS_STANDARD_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': records[0].get('V_GUID')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {
                _queryzsb();
                Ext.Msg.alert('提示信息', '删除成功');
                _deleteFile(records[0].get('V_GUID'));
                _preViewImage();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
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

function _deleteFile(V_V_GUID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIRT_IMG_GUID_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_V_GUID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {

            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除附件失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
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

function _open() {
    Ext.getCmp('window').show();
}

function _save() {
}

function _last() {

    var records = Ext.getCmp('zsbjxPanel1').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择维修技术标准!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    if (V_V_FILEGUID == picguidbegin) {
        Ext.Msg.alert('提示信息', '已经是第一张');
        return;

    } else {
        if (index == 0) {
            Ext.Msg.alert('提示信息', '已经到第一张');
            return;
        }
        index--;
        V_V_FILEGUID = imageStore.getAt(index).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(index).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }
}

function _next() {

    var records = Ext.getCmp('zsbjxPanel1').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择维修技术标准!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');

    if (imageStore.getCount() <= 1) {
        Ext.Msg.alert('提示信息', '已经是最后一张');
        return;
    } else {
        if (index == imageStore.getCount() - 1) {
            Ext.Msg.alert('提示信息', '已经到最后一张');
            return;
        }
        index++;
        V_V_FILEGUID = imageStore.getAt(index).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(index).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }
}
