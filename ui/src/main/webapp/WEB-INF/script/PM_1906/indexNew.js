var updCarGuid;//传给机具更新的编码
var updDriverGuid;//传给司机更新的编码
var insDriverGuid;//点击机具获取的guid
var V_V_FILEGUID='';//图片的guid
var index = 0;
var picguidbegin;
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

    //查询图片的数据集
    var imageStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'imageStore',
        fields: ['V_GUID', 'V_FILEGUID', 'V_FILENAME', 'V_FILEBLOB', 'V_FILETYPECODE', 'V_PLANT',
            'V_DEPT', 'V_TIME','V_PERSON','V_REMARK'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'zs/BASE_FILE_IMAGE_TABLE',
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


    var jjsytimageStore = Ext.create('Ext.data.Store', { //安全措预案数据集
        id: 'jjsytimageStore',
        autoLoad: false,
        fields: ['V_GUID', 'V_FILENAME', 'V_FILEGUID', 'V_FILEBLOB', 'V_TIME', 'V_PERSON'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_FILE_CHAKAN_SEL',//存储过程调用
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    //作业区
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
                Ext.getCmp('zyq').select(zyqStore.getAt(0));
            }
        }
    });

    //左上机具store
    var carStore = Ext.create('Ext.data.Store', {
        id: 'carStore',
        autoLoad: false,
        loading: false,
        pageSize: 15,
        fields: ['V_GUID', 'V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_CARINDATE', 'V_DE', 'V_FLAG'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_SEL',
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

    //空表格store
    var zuoshangStore = Ext.create('Ext.data.Store', {
        storeId: 'zuoshangStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [['M'], ['S'], ['P'],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']
        ]
    });

    //司机详情
    var driverStore = Ext.create('Ext.data.Store', {
        storeId: 'driverStore',
        autoLoad: false,
        loading: false,
        pageSize: 15,
        fields: ['V_GUID', 'V_CAR_GUID', 'V_DRIVER_NAME', 'V_WORK_DATE', 'V_DRIVER_DE'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_DRIVER_SEL',
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

    var CCDetailStore = Ext.create('Ext.data.Store', {//出车明细数据集
        storeId: 'CCDetailStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_CAR_GUID', 'V_DRIVER_GUID', 'V_BEGIN_TIME', 'V_END_TIME', 'V_PLACE', 'V_USE', 'V_STATUS', 'V_USE_TIME'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_DRIVEOUT_DETAIL_SEL',
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

    //机具使用明细
    var carUseDetailStore = Ext.create('Ext.data.Store', {

        storeId: 'carUseDetailStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'V_DE', 'V_BEGIN_TIME', 'V_END_TIME', 'V_PLACE', 'SUB_TIME', 'V_USE', 'V_DRIVER_NAME'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_CAR_USE_DETAIL_SEL',
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

    //维修信息
    var repairInfoStore = Ext.create('Ext.data.Store', {
        storeId: 'repairInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'D_FACT_START_DATE', 'V_SHORT_TXT', 'V_ORDERGUID', 'V_ORDERID'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_CAR_REP_DETAIL_SEL',
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

    //获取工种数据集
    var gzStore = Ext.create('Ext.data.Store', {
        id: 'gzStore',
        autoLoad: false,
        fields: ['V_JXGX_CODE', 'V_PERCODE_DE', 'V_PERNAME_DE',
            'V_PERTYPE_DE', 'V_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'CarManage/BASE_GZ_BY_GDGUID_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //工具
    var gjStore = Ext.create('Ext.data.Store', {
        storeId: 'gjStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['V_JXGX_CODE', 'V_GJ_CODE', 'V_GJ_NAME', 'V_GJ_TYPE'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_GJ_BY_GDGUID_SEL',
            type: 'ajax',
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

    //机具
    var jjStore = Ext.create('Ext.data.Store', {
        storeId: 'jjStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['V_JXGX_CODE', 'V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_JJ_BY_GDGUID_SEL',
            type: 'ajax',
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

    //物料
    var wlStore = Ext.create('Ext.data.Store', {
        storeId: 'wlStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['V_JXGX_CODE', 'V_WLCODE', 'V_WLSM', 'V_GGXH', 'V_JLDW', 'V_USE_NUM', 'V_PRICE'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_WL_BY_GDGUID_SEL',
            type: 'ajax',
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

    //设备树
    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE']
    });

    //关联设备表格
    var sbbgStore = Ext.create('Ext.data.Store', {
        storeId: 'sbbgStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_LINK_TIME', 'V_LINK_PERSON'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_BYCODE_SEL',
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

    //机具报废审批
    var jjbfspStore = Ext.create('Ext.data.Store', {
        storeId: 'jjbfspStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //顶部查询面板
    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        title: '<div align="center">机具管理</div>',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [{
            xtype: 'textfield',
            id: 'CAR_CODE_',
            fieldLabel: '机具编码',
            labelWidth: 70,
            style: 'margin:5px 0px 5px 0px'
        },
            {
                xtype: 'textfield',
                id: 'CAR_NAME_',
                fieldLabel: '机具名称',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 0px'
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                width: 60,
                handler: _preSelectCarStore
            },
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', width: 60, handler: _insertCar},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _updateCar}]
    });

    //左上机具表格
    var carPanel = Ext.create('Ext.grid.Panel', {
        id: 'carPanel',
        store: carStore,
        frame: true,
        border: false,
        columnLines: true,
        //selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', style: 'text-align: center;', width: 100},
            {text: '机具名称', dataIndex: 'V_CARNAME', style: 'text-align: center;', width: 100},
            {text: '机具类型', dataIndex: 'V_CARTYPE', style: 'text-align: center;', width: 100},
            {text: '机具归属', dataIndex: 'V_CARGUISUO', style: 'text-align: center;', width: 100},
            {
                text: '机具入厂时间', dataIndex: 'V_CARINDATE', style: 'text-align: center;', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = carStore.find('V_CARINDATE', value);
                    if (index != -1) {
                        return carStore.getAt(index).get('V_CARINDATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '机具定额', dataIndex: 'V_DE', style: 'text-align: center;', width: 100},
            {text: '机具状态', dataIndex: 'V_FLAG', style: 'text-align: center;', width: 100},
            {
                text: '删除', dataIndex: '', style: 'text-align: center;', width: 50,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteCar()'>删除</a></span>";
                }
            }, {
                text: '报废', dataIndex: '', style: 'text-align: center;', width: 50,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_disableCar()'>报废</a></span>";
                }
            }],
        listeners: {//itemclick监听查询司机详情，机具使用明细，机具维修明细，关联设备，机具报废明细的操作
            itemclick: function (panel, record, item, index, e, eOpts) {
                _selectDriver(record.data.V_GUID);
                _selectCarUseDetail(record.data.V_GUID);
                _selectRepairInfo(record.data.V_GUID);
                _selectCarDestroy(record.data.V_GUID);
                _preViewImage(record.data.V_GUID);
            }
        },
        bbar: [{//汽车数据集的分页
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'carStore'
        }]
    });

    //机具示意图  新增，上一页和下一页的按钮
    var jjsytButtonPanel = Ext.create('Ext.form.Panel', {
        id: 'jjsytButtonPanel',
        frame: false,
        // border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'center', labelWidth: 200, inputWidth: 160, style: 'margin:5px 10px 5px 10px'},
        items: [
            {
                xtype: 'button',
                text: '新增',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/add.png',
                handler: _insertImage
            },
            {
                xtype: 'button',
                text: '上一页',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/accordion_collapse.png',
                handler: _last
            }, {
                xtype: 'button',
                text: '下一页',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/accordion_expand.png',
                handler: _next
            }]
    });

    //图片上传和浏览的相关按钮
    var insertImageButtonPanel = Ext.create('Ext.form.Panel', {
        id: 'insertImageButtonPanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'filefield',
                id: 'V_V_FILEBLOBJJSYT',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                buttonText: '浏览'
            },
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _upLoadJJSYT},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteJJSYT},
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
    var insImagePanel = Ext.create("Ext.form.Panel", {
        id: 'insImagePanel',
        editable: false,
        frame: true,
        border: false,
        region: 'center',
        items: [
            {
                xtype: 'box',
                id: 'browseImage',
                autoEl: {//
                    width:300 ,
                    height:300 ,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                   // style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]

    });

    //上传后显示的表格部分
    var insertImageGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'insertImageGridPanel',
        store: 'imageStore',
        columnLines: true,
        border: 'false',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '图片名称', dataIndex: 'V_FILENAME', style: 'text-align: center;', flex: 1},
            {
                text: '上传时间', dataIndex: 'V_TIME', style: 'text-align: center;', width: 230,
                renderer: function (value) {//渲染
                    var index = imageStore.find('V_TIME', value);
                    if (index != -1) {
                        return imageStore.getAt(index).get('V_TIME').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '上传人', dataIndex: 'V_PERSON', style: 'text-align: center;', flex: 1},
            {
                text: '删除', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_deleteJJSYT(\'' + record.data.V_FILEGUID + '\')">' + '删除' + '</a>';
                }
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'imageStore'
        }]
    });

    //新增图片弹窗的布局
    var insertImagePanel = Ext.create('Ext.panel.Panel', {
        id: 'insertImagePanel',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [
            {region: 'north', items: [insertImageButtonPanel]},
            {region: 'center', layout: 'fit', items: [insImagePanel]},
            {region: 'south', layout: 'fit',height:'40%', items: [insertImageGridPanel]}]
    });

    //新增图片的弹窗
    var _insertImageWindow = Ext.create('Ext.window.Window', {
        id: '_insertImageWindow',
        width: 800,
        height: 800,
        layout: 'border',
        title: '新增图片',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [
            {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [insertImagePanel]
            }
        ]
    });
    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        frame: true,
        border: false,
        region: 'center',
        title: '机具示意图',
        items: [
            {region: 'north', items: [jjsytButtonPanel]},
            {
                xtype: 'box',
                id: 'browseImage',
                autoEl: {//
                    width: window.screen.width / 2 - 110,
                    height: window.screen.height / 2 + 38,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]

    });


    var button1 = Ext.create('Ext.Panel', {
        id: 'button1',
        layout: 'column',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [{
            xtype: 'button',
            text: '添加',
            icon: imgpath + '/add.png',
            width: 60,
            handler: _insertDriver
        },
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _updateDriver},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', width: 60, handler: _deleteDriver}]
    });

    //司机详情
    var driverPanel = Ext.create("Ext.grid.Panel", {
        id: 'driverPanel',
        store: 'driverStore',
        columnLines: true,
        frame: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', align: 'center', flex: 1},
            {
                text: '上岗时间', dataIndex: 'V_WORK_DATE', align: 'center', width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = driverStore.find('V_WORK_DATE', value);
                    if (index != -1) {
                        return driverStore.getAt(index).get('V_WORK_DATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '司机定额', dataIndex: 'V_DRIVER_DE', align: 'center', flex: 1},
            {
                text: '出车明细', dataIndex: '', align: 'center', flex: 1,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_carUseDetail()'>查看</a></span>";
                }
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'driverStore'
        }]
    });

    var sjxqPanel = Ext.create('Ext.panel.Panel', {
        title: '司机详情',
        region: 'center',
        layout: 'border',
        border: false,
        frame: true,
        width: 250,
        items: [{region: 'north', items: [button1]}, {region: 'center', layout: 'fit', items: [driverPanel]}]

    });

    var jjsymxPanel = Ext.create("Ext.grid.Panel", {
        id: 'jjsymxPanel',
        title: '机具使用明细',
        columnLines: true,
        region: 'center',
        store: 'carUseDetailStore',
        //baseCls: 'my-panel-no-border',
        border: false,
        frame: true,
        //selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', flex: 1},
            {
                text: '使用开始时间', dataIndex: 'V_BEGIN_TIME', align: 'center', width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = carUseDetailStore.find('V_BEGIN_TIME', value);
                    if (index != -1) {
                        return carUseDetailStore.getAt(index).get('V_BEGIN_TIME').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '使用地点', dataIndex: 'V_PLACE', align: 'center', flex: 1},
            {text: '使用台时(小时)', dataIndex: 'SUB_TIME', align: 'center', width: 150},
            {text: '机具定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', align: 'center', flex: 1},
            {text: '用途', dataIndex: 'V_USE', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'carUseDetailStore'
        }]
    });

    var repairInfoPanel = Ext.create('Ext.grid.Panel', {
        id: 'repairInfoPanel',
        title: '维修信息',
        region: 'center',
        columnLines: true,
        store: repairInfoStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', flex: 1},
            {
                text: '维修时间', dataIndex: 'D_FACT_START_DATE', align: 'center', width: 180,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = repairInfoStore.find('D_FACT_START_DATE', value);
                    if (index != -1) {
                        return repairInfoStore.getAt(index).get('D_FACT_START_DATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '维修明细', dataIndex: 'V_SHORT_TXT', align: 'center', flex: 1},
            {text: '维修工单号', dataIndex: 'V_ORDERID', align: 'center', flex: 1}],
        listeners: {//itemclick监听查询相关工种，工具，机具，物料
            itemclick: function (panel, record) {
                _selectGz(record.get('V_ORDERGUID'));
                _selectGj(record.get('V_ORDERGUID'));
                _selectJj(record.get('V_ORDERGUID'));
                _selectWl(record.get('V_ORDERGUID'));
            }
        },
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'repairInfoStore'
        }]
    });

    var gzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gzPanel',
        title: '工种',
        region: 'center',
        columnLines: true,
        store: gzStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gzStore'
        }]
    });

    var gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel',
        title: '工具',
        region: 'center',
        columnLines: true,
        store: gjStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具名称', dataIndex: 'V_GJ_NAME', align: 'center', flex: 1},
            {text: '工具类型', dataIndex: 'V_GJ_TYPE', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid6page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gjStore'
        }]
    });

    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
        title: '机具',
        region: 'center',
        columnLines: true,
        store: jjStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jjStore'
        }]
    });

    var wlPanel = Ext.create('Ext.grid.Panel', {
        id: 'wlPanel',
        title: '物料',
        region: 'center',
        columnLines: true,
        store: wlStore,
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'V_WLCODE', align: 'center', flex: 1},
            {text: '物料描述', dataIndex: 'V_WLSM', align: 'center', flex: 1},
            {text: '规格型号', dataIndex: 'V_GGXH', align: 'center', flex: 1},
            {text: '计量单位', dataIndex: 'V_JLDW', align: 'center', flex: 1},
            {text: '使用数量', dataIndex: 'V_USE_NUM', align: 'center', flex: 1},
            {text: '单价', dataIndex: 'V_PRICE', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid8page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'wlStore'
        }]
    });

    var tab2 = Ext.create('Ext.tab.Panel', {
        id: 'tab2',
        title: '机具维修明细',
        frame: true,
        items: [repairInfoPanel, gzPanel, gjPanel, jjPanel, wlPanel]
    });

    //关联设备下拉框
    var Panel4 = Ext.create('Ext.Panel', {
        id: 'Panel4',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 50, inputWidth: 140, style: 'margin:5px 0px 5px 20px'},
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckStore,//根节点数据集，厂矿数据集
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            //emptyText: '全部',
            labelWidth: 35,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                change: function (combo, records) {
                    _selectDept();
                }

            }
        }, {
            xtype: 'combo',
            id: 'zyq',
            store: zyqStore,//作业区数据集
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            //emptyText: '全部',
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                change: function (combo, records) {
                    _queryTree();
                }
            }
        }]
    });

    //关联设备类型树
    var sblxTree = Ext.create('Ext.tree.Panel', {
        id: 'sblxTree',
        title: '设备类型树',
        region: 'west',
        width: '30%',
        rootVisible: false,
        autoScroll: true,
        store: treeStore,
        listeners: {
            itemclick: TreeChecked
        }
    });

    //关联设备信息
    var sbxxPanel = Ext.create('Ext.form.Panel', {
        id: 'sbxxPanel',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 200, style: 'margin:5px 0px 5px 0px'},
        items: [{
            xtype: 'textfield',
            id: 'rsbbm',
            style: 'margin:20px 0px 5px 0px',
            fieldLabel: '设备编码:',
            maxLength: 60,
            allowBlank: false
        },
            {xtype: 'textfield', id: 'rsbmc', fieldLabel: '设备名称:', maxLength: 60},
            {xtype: 'textfield', id: 'rsblxbm', fieldLabel: '设备类型编号:', maxLength: 60},
            {xtype: 'textfield', id: "rsblxwz", fieldLabel: '设备类型位置', maxLength: 60},
            {xtype: 'textfield', id: 'rwzbm', fieldLabel: '位置编码:', maxLength: 60},
            {xtype: 'textfield', id: 'rwzmc', fieldLabel: '位置名称:', maxLength: 60},
            {xtype: 'textfield', id: 'rsblx', fieldLabel: '设备类型:', maxLength: 60},
            {xtype: 'textfield', id: 'rsbzl', fieldLabel: '设备种类:', maxLength: 60},
            {xtype: 'textfield', id: 'rbs', fieldLabel: 'ABC标识:', maxLength: 60},
            {xtype: 'textfield', id: 'rksrq', fieldLabel: '开始日期:', maxLength: 60},
            {xtype: 'textfield', id: 'rjsrq', fieldLabel: '结束日期:', maxLength: 60},
            {xtype: 'textfield', id: 'rcbzx', fieldLabel: '成本中心:', maxLength: 60},
            {xtype: 'textfield', id: 'rggxh', fieldLabel: '规格型号:', maxLength: 60},
            {xtype: 'textfield', id: 'rdxcc', fieldLabel: '大小/尺寸:', maxLength: 60},
            {xtype: 'textfield', id: 'rzczzs', fieldLabel: '资产制造商:', maxLength: 60},
            {xtype: 'textfield', id: 'rgzjz', fieldLabel: '购置价值:', maxLength: 60},
            {xtype: 'textfield', id: 'rdxzl', fieldLabel: '对象重量:', maxLength: 60}]
    });

    //关联设备表格
    var sbbgPanel = Ext.create('Ext.grid.Panel', {
        id: 'sbbgPanel',
        //region: 'center',
        columnLines: true,
        store: sbbgStore,
        //autoScroll: false,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备编码', dataIndex: 'V_EQUCODE', align: 'center', width: 150},
            {text: '设备名称', dataIndex: 'V_EQUNAME', align: 'center', width: 150},
            {text: '功能位置', dataIndex: 'V_EQUSITE', align: 'center', width: 160},
            {
                text: '关联时间', dataIndex: 'V_LINK_TIME', align: 'center', width: 180,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = sbbgStore.find('V_LINK_TIME', value);
                    if (index != -1) {
                        return sbbgStore.getAt(index).get('V_LINK_TIME').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '关联人', dataIndex: 'V_LINK_PERSON', align: 'center', width: 100},
            {
                text: '取消关联', dataIndex: '', style: 'text-align: center;', width: 100,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteLink()'>取消关联</a></span>";
                }
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'sbbgStore'
        }]
    });

    //关联设备
    var glsbPanel = Ext.create('Ext.Panel', {
        id: 'glsbPanel',
        title: '关联设备',
        //layout : 'border',
        layout: {
            type: 'border',
            regionWeights: {
                west: 2,
                north: 3,
                south: 1,
                east: 4
            }
        },
        items: [
            {
                region: 'east',
                width: '50%',
                layout: 'fit',
                items: [sbbgPanel]
            },
            {
                region: 'north',
                layout: 'fit',
                items: [Panel4]
            }, {
                region: 'west',
                width: '20%',
                layout: 'fit',
                items: [sblxTree]
            }, {
                region: 'center',
                layout: 'fit',
                items: [sbxxPanel]
            }]
    });

    //机具报废明细form
    var jjbfFormPanel = Ext.create('Ext.form.Panel', {
        id: 'jjbfFormPanel',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 40px'},
        items: [{xtype: 'textfield', id: 'jjbm_', fieldLabel: '机具编码:', maxLength: 60},
            {xtype: 'textfield', id: 'jjmc_', fieldLabel: '机具名称:', maxLength: 60},
            {xtype: 'textfield', id: 'jjcgsj_', fieldLabel: '机具采购时间:', maxLength: 60},
            {xtype: 'textfield', id: "jjcgfy_", fieldLabel: '机具采购费用', maxLength: 60},
            {xtype: 'textfield', id: 'jjssjg_', fieldLabel: '机具所属机构:', maxLength: 60},
            {xtype: 'textfield', id: 'jjsysc_', fieldLabel: '机具使用时长:', maxLength: 60},
            {xtype: 'textareafield', id: 'jjbfyy_', fieldLabel: '机具报废原因:', maxLength: 60}]
    });

    //机具报废审批
    var jjbfspPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjbfspPanel',
        title: "机具报废审批流程",
        columnLines: true,
        store: zuoshangStore,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '审批步骤', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '审批时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '审批意见', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid10page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var chakancar = Ext.create('Ext.window.Window', {
        id: 'chakancar',
        width: 850,
        height: 500,
        title: '出车明细',
        modal: true,//弹出窗口时后面背景不可编辑
        closeAction: 'hide',
        layout: 'fit',
        closable: true,
        items: [Ext.create("Ext.grid.Panel", {
            store: 'CCDetailStore',
            columnLines: true,
            columns: [
                {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
                {
                    text: '出车开始时间', dataIndex: 'V_BEGIN_TIME', align: 'center', width: 180,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                        var index = CCDetailStore.find('V_BEGIN_TIME', value);
                        if (index != -1) {
                            return CCDetailStore.getAt(index).get('V_BEGIN_TIME').substring(0, 19);
                        }
                        return null;
                    }
                },
                {
                    text: '出车结束时间', dataIndex: 'V_END_TIME', align: 'center', width: 180,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                        var index = CCDetailStore.find('V_END_TIME', value);
                        if (index != -1) {
                            return CCDetailStore.getAt(index).get('V_END_TIME').substring(0, 19);
                        }
                        return null;
                    }
                },
                {text: '地点', dataIndex: 'V_PLACE', align: 'center', flex: 1},
                {text: '用途', dataIndex: 'V_USE', align: 'center', flex: 1},
                {text: '车辆状态', dataIndex: 'V_STATUS', align: 'center', flex: 1},
                {text: '使用台时', dataIndex: 'V_USE_TIME', align: 'center', flex: 1}
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'CCDetailStore',
                width: '100%'
            }]
        })]
    });


    //机具报废明细
    var jjbfmxPanel = Ext.create('Ext.Panel', {
        id: 'jjbfmxPanel',
        title: '机具报废明细',
        layout: 'border',
        items: [{
            region: 'west',
            width: '50%',
            layout: 'fit',
            items: [jjbfFormPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [jjbfspPanel]
        }]
    });

    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',//相关司机详情，机具使用明细，机具维修明细，关联设备，机具报废明细
        frame: true,
        items: [sjxqPanel, jjsymxPanel, tab2, glsbPanel, jjbfmxPanel]
    });

    var leftPanel = Ext.create('Ext.Panel', {
        id: 'leftPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            layout: 'fit',
            height: '40%',
            border: false,
            items: [carPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [viewImagePanel]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: 1,
                north: 2,
                south: -1,
                east: -2
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'west',
            width: '40%',
            layout: 'fit',
            border: false,
            items: [leftPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [tab1]
        }]
    });


    Ext.getCmp("sblxTree").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_EQU_TREE')
        } else if (operation.node.data.parentid == -2) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE: '%',
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });

    Ext.data.StoreManager.lookup('ckStore').on("load", function (store, records) {
        Ext.getCmp('ck').select(store.first());
    });
    _preSelectCarStore();
    _selectImage();
});

insertCarPanel = Ext.create('Ext.form.Panel', {
    id: 'insertCarPanel',
    border: false,
    baseCls: 'my-panel-no-border',
    frame: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'WIN_CAR_CODE_', fieldLabel: '机具编码', allowBlank: false},
        {xtype: 'textfield', id: 'WIN_CAR_NAME_', fieldLabel: '机具名称', allowBlank: false},
        {xtype: 'textfield', id: 'WIN_CAR_TYPE_', fieldLabel: '机具类型', allowBlank: false},
        {xtype: 'textfield', id: 'WIN_GS_', fieldLabel: '机具归属', allowBlank: false},
        {
            xtype: 'combo',
            id: 'WIN_FLAG_',
            fieldLabel: '机具状态',
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['在用', '在用'], ['停用', '停用']],
            queryMode: 'local',
            value: '在用',
            editable: false,
            allowBlank: false
        }, {
            xtype: 'datefield',//日期录入
            id: 'WIN_CAR_INDATE_',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            allowBlank: false,
            fieldLabel: '机具入厂时间'
        },
        {xtype: 'textfield', id: 'WIN_DE_', fieldLabel: '机具定额', allowBlank: false}
    ]
});

var insertCarWindow = Ext.create('Ext.window.Window', {
    id: 'insertCarWindow',
    width: 330,
    height: 400,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [insertCarPanel]
        }
    ],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            _insertCarSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('insertCarWindow').hide();
        }
    }]
});


var updateCarWindow = Ext.create('Ext.window.Window', {//修改机具的窗口
    id: 'updateCarWindow',
    width: 330,
    height: 400,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'WIN2_CAR_CODE_', fieldLabel: '机具编码'},
        {xtype: 'textfield', id: 'WIN2_CAR_NAME_', fieldLabel: '机具名称'},
        {xtype: 'textfield', id: 'WIN2_CAR_TYPE_', fieldLabel: '机具类型'},
        {xtype: 'textfield', id: 'WIN2_GS_', fieldLabel: '机具归属'},
        {
            xtype: 'combo',
            id: 'WIN2_FLAG_',
            fieldLabel: '机具状态',
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['在用', '在用'], ['停用', '停用']],
            queryMode: 'local',
            value: '在用',
            editable: false

        }, {
            xtype: 'datefield',//日期录入
            id: 'WIN2_CAR_INDATE_',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '机具入厂时间'
        },
        {xtype: 'numberfield', id: 'WIN2_DE_', fieldLabel: '机具定额'}],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            _updateCarSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('updateCarWindow').hide();
        }
    }]
});

var insertDriverPanel = Ext.create('Ext.form.Panel', {
    id: 'insertDriverPanel',
    border: false,
    baseCls: 'my-panel-no-border',
    frame: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'INS_DRIVER_GUID', fieldLabel: '司机编码', allowBlank: false},
        {xtype: 'textfield', id: 'INS_CAR_GUID', fieldLabel: '机具编码', allowBlank: false},
        {xtype: 'textfield', id: 'INS_DRIVER_NAME', fieldLabel: '司机姓名', allowBlank: false},
        {
            xtype: 'datefield',
            id: 'INS_WORK_DATE',
            fieldLabel: '上岗时间',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s'
            , allowBlank: false
        },
        {xtype: 'textfield', id: 'INS_DRIVER_DE', fieldLabel: '司机定额', allowBlank: false}
    ]
});

var insertDriverWindow = Ext.create('Ext.window.Window', {
    id: 'insertDriverWindow',
    width: 300,
    height: 200,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [insertDriverPanel]
        }
    ],
    buttons: [{
        xtype: 'button', text: '保存', width: 40, handler: function () {
            _insertDriverSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('insertDriverWindow').hide();
        }
    }]
});

var updateDriverWindow = Ext.create('Ext.window.Window', {
    id: 'updateDriverWindow',
    width: 300,
    height: 200,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 160, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'UPD_DRIVER_NAME', fieldLabel: '司机姓名'},
        {
            xtype: 'datefield',
            id: 'UPD_WORK_DATE',
            fieldLabel: '上岗时间',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s'
        },
        {xtype: 'textfield', id: 'UPD_DRIVER_DE', fieldLabel: '司机定额'}],
    buttons: [{
        xtype: 'button', text: '保存', width: 40, handler: function () {
            _updateDriverSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('updateDriverWindow').hide();
        }
    }]
});

function _preSelectCarStore() {//查询机具的方法
    /*Ext.data.StoreManager.lookup('carStore').load({
        params: {
            V_V_CARCODE: Ext.getCmp('CAR_CODE_').getValue(),
            V_V_CARNAME: Ext.getCmp('CAR_NAME_').getValue()
        }
    });*/
    var carStore = Ext.data.StoreManager.lookup('carStore');
    carStore.proxy.extraParams.V_V_CARCODE = Ext.getCmp('CAR_CODE_').getValue();
    carStore.proxy.extraParams.V_V_CARNAME = Ext.getCmp('CAR_NAME_').getValue();
    carStore.currentPage = 1;
    carStore.load();
}

function _insertCar() {
    Ext.getCmp('WIN_CAR_CODE_').setValue(Ext.data.IdGenerator.get('uuid').generate()).hide();
    Ext.getCmp('WIN_CAR_NAME_').setValue('');
    Ext.getCmp('WIN_CAR_TYPE_').setValue('');
    Ext.getCmp('WIN_GS_').setValue('');
    Ext.getCmp('WIN_CAR_INDATE_').setValue('');
    Ext.getCmp('WIN_DE_').setValue('');
    Ext.getCmp('insertCarWindow').show();
}

function _updateCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.alert("提示", '请选择一条数据进行修改！', Ext.MessageBox.WARNING);
        return;
    } else if (records.length > 1) {
        Ext.MessageBox.alert("提示", '一次只能修改一条数据！', Ext.MessageBox.WARNING);
        return;
    }
    updCarGuid = records[0].data.V_GUID;
    Ext.getCmp('WIN2_CAR_CODE_').setValue(records[0].data.V_CARCODE);
    Ext.getCmp('WIN2_CAR_NAME_').setValue(records[0].data.V_CARNAME);
    Ext.getCmp('WIN2_CAR_TYPE_').setValue(records[0].data.V_CARTYPE);
    Ext.getCmp('WIN2_GS_').setValue(records[0].data.V_CARGUISUO);
    Ext.getCmp('WIN2_FLAG_').setValue(records[0].data.V_FLAG);
    //将时间截取
    Ext.getCmp('WIN2_CAR_INDATE_').setValue((records[0].data.V_CARINDATE).substring(0, 19));
    Ext.getCmp('WIN2_DE_').setValue(records[0].data.V_DE);
    Ext.getCmp('updateCarWindow').show();

}


function _insertCarSave() {
    var form = Ext.getCmp('insertCarPanel').getForm();
    var flag = form.isValid();//校验数据
    if (flag) {
        Ext.Ajax.request({
            url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_INS',
            method: 'POST',
            async: false,
            params: {
                V_V_CARCODE: Ext.getCmp('WIN_CAR_CODE_').getValue(),
                V_V_CARNAME: Ext.getCmp('WIN_CAR_NAME_').getValue(),
                V_V_CARTYPE: Ext.getCmp('WIN_CAR_TYPE_').getValue(),
                V_V_CARGUISUO: Ext.getCmp('WIN_GS_').getValue(),
                V_V_CARINDATE: Ext.Date.format(Ext.getCmp('WIN_CAR_INDATE_').getValue(), 'Y-m-d'),
                V_V_FLAG: Ext.getCmp('WIN_FLAG_').getValue(),
                V_V_CARINFO: '',
                V_V_DE: Ext.getCmp('WIN_DE_').getValue()
            },
            success: function (resp) {
                var data = Ext.decode(resp.responseText);
                if (data.INFO == 'SUCCESS') {
                    Ext.getCmp('insertCarWindow').hide();
                    Ext.Msg.alert("信息", "成功！");
                    _preSelectCarStore();
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    } else {
        Ext.MessageBox.alert("提示", '请填入必录项')
    }

}


function _updateCarSave() {
    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否编辑',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_UPD',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: updCarGuid,
                        V_V_CARCODE: Ext.getCmp('WIN2_CAR_CODE_').getValue(),
                        V_V_CARNAME: Ext.getCmp('WIN2_CAR_NAME_').getValue(),
                        V_V_CARTYPE: Ext.getCmp('WIN2_CAR_TYPE_').getValue(),
                        V_V_CARGUISUO: Ext.getCmp('WIN2_GS_').getValue(),
                        V_V_CARINDATE: Ext.Date.format(Ext.getCmp('WIN2_CAR_INDATE_').getValue(), 'Y-m-d'),
                        V_V_FLAG: Ext.getCmp('WIN2_FLAG_').getValue(),
                        V_V_CARINFO: '',
                        V_V_DE: Ext.getCmp('WIN2_DE_').getValue()
                    },
                    success: function (resp) {
                        var data = Ext.decode(resp.responseText);
                        if (data.INFO == 'SUCCESS') {
                            Ext.getCmp('updateCarWindow').hide();
                            Ext.Msg.alert("信息", "成功！");
                            _preSelectCarStore();
                        } else {
                            Ext.Msg.alert("信息", "失败！");
                        }
                    }
                });
            } else {
                Ext.MessageBox.hide();
            }
        }
    });

}

function _deleteCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert("操作信息", '请选择一条数据进行修改！', Ext.MessageBox.WARNING);
        return;
    }
    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[0].data.V_GUID
                        },
                        success: function (resp) {
                            var data = Ext.decode(resp.responseText);
                            if (data.INFO == 'success') {
                                Ext.Msg.alert("信息", "成功！");
                                _preSelectCarStore();
                            } else {
                                Ext.Msg.alert("信息", "失败！");
                            }
                        }
                    });
                }
            } else {
                Ext.MessageBox.hide();
            }
        }
    });
}

function _disableCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_DIS',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: records[0].data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'success') {
                Ext.Msg.alert("信息", "成功！");
                _preSelectCarStore();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _selectDriver(V_GUID) {
    insDriverGuid = V_GUID;
    var driverStore = Ext.data.StoreManager.lookup('driverStore');
    driverStore.proxy.extraParams.V_V_GUID = V_GUID;
    driverStore.currentPage = 1;
    driverStore.load();
}

function _insertDriver() {
    Ext.getCmp('INS_DRIVER_GUID').setValue(Ext.data.IdGenerator.get('uuid').generate()).hide();
    Ext.getCmp('INS_CAR_GUID').setValue(insDriverGuid).hide();
    if (Ext.getCmp('INS_CAR_GUID').getValue() == '') {
        Ext.MessageBox.alert("提示", '请选择相应的机具进行添加');
        return false;
    }
    Ext.getCmp('INS_DRIVER_NAME').setValue('');
    Ext.getCmp('INS_WORK_DATE').setValue('');
    Ext.getCmp('INS_DRIVER_DE').setValue('');

    Ext.getCmp('insertDriverWindow').show();
}

function _insertDriverSave() {
    var form = Ext.getCmp('insertDriverPanel').getForm();
    var flag = form.isValid();//校验数据

    if (flag) {
        Ext.Ajax.request({
            url: AppUrl + 'CarManage/BASE_DRIVER_INS',
            method: 'POST',
            async: false,
            params: {
                V_V_DRIVER_GUID: Ext.getCmp('INS_DRIVER_GUID').getValue(),
                V_V_CAR_GUID: Ext.getCmp('INS_CAR_GUID').getValue(),
                V_V_DRIVER_NAME: Ext.getCmp('INS_DRIVER_NAME').getValue(),
                V_V_WORK_DATE: Ext.Date.format(Ext.getCmp('INS_WORK_DATE').getValue(), 'Y-m-d'),
                V_V_DRIVER_DE: Ext.getCmp('INS_DRIVER_DE').getValue()
            },
            success: function (resp) {
                var data = Ext.decode(resp.responseText);
                if (data.INFO == 'SUCCESS') {
                    Ext.getCmp('insertDriverWindow').hide();
                    Ext.Msg.alert("信息", "成功！");
                    var driverStore = Ext.data.StoreManager.lookup('driverStore');
                    driverStore.currentPage = 1;
                    driverStore.load();
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    } else {
        Ext.MessageBox.alert("提示", '请填入必录项')
    }

}

function _updateDriver() {//修改司机详情
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.alert("提示", '请选择一条数据进行修改！', Ext.MessageBox.WARNING);
        return;
    } else if (records.length > 1) {
        Ext.MessageBox.alert("提示", '一次只能修改一条数据！', Ext.MessageBox.WARNING);
        return;
    }
    updDriverGuid = records[0].data.V_GUID;
    Ext.getCmp('UPD_DRIVER_NAME').setValue(records[0].data.V_DRIVER_NAME);
    Ext.getCmp('UPD_WORK_DATE').setValue((records[0].data.V_WORK_DATE).substring(0, 19));
    Ext.getCmp('UPD_DRIVER_DE').setValue(records[0].data.V_DRIVER_DE);
    Ext.getCmp('updateDriverWindow').show();
}

function _updateDriverSave() {
    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否编辑',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'CarManage/BASE_DRIVER_UPD',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: updDriverGuid,
                        V_V_DRIVER_NAME: Ext.getCmp('UPD_DRIVER_NAME').getValue(),
                        V_V_WORK_DATE: Ext.Date.format(Ext.getCmp('INS_WORK_DATE').getValue(), 'Y-m-d'),
                        V_V_DRIVER_DE: Ext.getCmp('UPD_DRIVER_DE').getValue()
                    },
                    success: function (resp) {
                        var data = Ext.decode(resp.responseText);
                        if (data.INFO == 'SUCCESS') {
                            Ext.getCmp('updateDriverWindow').hide();
                            Ext.Msg.alert("信息", "成功！");
                            var driverStore = Ext.data.StoreManager.lookup('driverStore');
                            driverStore.currentPage = 1;
                            driverStore.load();
                        } else {
                            Ext.Msg.alert("信息", "失败！");
                        }
                    }
                });
            } else {
                Ext.MessageBox.hide();
            }
        }
    });
}

function _deleteDriver() {
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.alert("操作信息", '请选择一条数据进行修改！', Ext.MessageBox.WARNING);
        return;
    }
    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'zs/BASE_AQCS_DEL ',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_AQCS_CODE: records[i].data.V_AQCS_CODE
                        },
                        success: function (resp) {
                            var data = Ext.decode(resp.responseText);
                            if (data.INFO == 'SUCCESS') {
                                Ext.getCmp('_editAqcsWindow').hide();
                                Ext.Msg.alert("信息", "成功！");
                                _queryAqcs();
                            } else {
                                Ext.Msg.alert("信息", "失败！");
                            }
                        }
                    });
                }
            } else {
                Ext.MessageBox.hide();
            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_DRIVER_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: records[0].data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'success') {
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _selectCarUseDetail(V_GUID) {
    var carUseDetailStore = Ext.data.StoreManager.lookup('carUseDetailStore');
    carUseDetailStore.proxy.extraParams.V_V_GUID = V_GUID;
    carUseDetailStore.currentPage = 1;
    carUseDetailStore.load();
}

function _selectRepairInfo(V_GUID) {
    var repairInfoStore = Ext.data.StoreManager.lookup('repairInfoStore');
    repairInfoStore.proxy.extraParams.V_V_CAR_GUID = V_GUID;
    repairInfoStore.currentPage = 1;
    repairInfoStore.load();
}

function TreeChecked(TreeChecked) {
    _queryEquDetail();
    _queryEquLink();
}

function _queryEquDetail() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params: {
            V_V_EQUCODE: records[0].data.sid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 0) {
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

function _selectCarDestroy(V_GUID) {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_BYGUID_SEL',
        method: 'POST',
        params: {
            V_V_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            var sub_date = resp.list[0].SUB_DATE + "小时";
            if (resp.list.length != 0) {
                Ext.getCmp('jjbm_').setValue(resp.list[0].V_CARCODE);//机具编码
                Ext.getCmp('jjmc_').setValue(resp.list[0].V_CARNAME);//机具名称
                Ext.getCmp('jjcgsj_').setValue(resp.list[0].V_CARINDATE.substring(0, 19));//机具采购时间
                Ext.getCmp('jjcgfy_').setValue(resp.list[0].V_PRICE);//机具采购费用
                Ext.getCmp('jjssjg_').setValue(resp.list[0].V_CARGUISUO);//机具所属机构
                Ext.getCmp('jjsysc_').setValue(sub_date);//机具使用时长
                Ext.getCmp('jjbfyy_').setValue(resp.list[0].V_REASON);//机具报废原因
            }
        }
    });
}

function _queryEquLink() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    var sbbgStore = Ext.data.StoreManager.lookup('sbbgStore');
    sbbgStore.proxy.extraParams.V_V_EQUCODE = records[0].data.sid;
    sbbgStore.currentPage = 1;
    sbbgStore.load();
}

function _selectDept() {//动态加载子数据集（作业区的数据集）
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('ck').getValue();
    zyqStore.load();
}

//树查询
function _queryTree() {
    Ext.getCmp('sblxTree').store.setProxy({
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
            V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
        }
    });
    Ext.getCmp('sblxTree').store.load();
}

function _deleteLink() {
    var records = Ext.getCmp('sbbgPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_LINKDEL',
        method: 'POST',
        async: false,
        params: {
            V_V_EQUCODE: records[0].data.V_EQUCODE
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _preViewImage(V_GUID) {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': V_GUID,
        'V_V_FILEGUID': ''
    };
    imageStore.load();
    index = 0;
    if (imageStore.getCount() != 0) {//在点击机具表格时查询机具示意图，并判断选中的这一条数据是否有图片的guid，并将图片的guid取出来
        V_V_FILEGUID = imageStore.getAt(0).get('V_FILEGUID');
        var url = AppUrl + 'CarManage/BASE_FILE_IMAGE_SEL?V_V_GUID=' + V_GUID + '&V_V_FILEGUID='+V_V_FILEGUID;
        Ext.getCmp("browseImage").getEl().dom.src = url;
        picguidbegin = V_V_FILEGUID;//用于判断是否是当前第一页的全局变量
    }
}


function _carUseDetail() {//查看的弹出窗口
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    var CCDetailStore = Ext.data.StoreManager.lookup('CCDetailStore');
    CCDetailStore.proxy.extraParams.V_V_GUID = records[0].data.V_GUID;
    CCDetailStore.currentPage = 1;
    CCDetailStore.load();
    Ext.getCmp('chakancar').show();

}
function _selectGz(V_ORDERGUID) {
    Ext.getCmp('tab2').setActiveTab(1);
    var gzStore = Ext.data.StoreManager.lookup('gzStore');
    gzStore.proxy.extraParams.V_V_ORDERGUID = V_ORDERGUID;
    gzStore.currentPage = 1;
    gzStore.load();

}
function _selectGj(V_ORDERGUID) {
    var gjStore = Ext.data.StoreManager.lookup('gjStore');
    gjStore.proxy.extraParams.V_V_ORDERGUID = V_ORDERGUID;
    gjStore.currentPage = 1;
    gjStore.load();
}

function _selectJj(V_ORDERGUID) {
    var jjStore = Ext.data.StoreManager.lookup('jjStore');
    jjStore.proxy.extraParams.V_V_ORDERGUID = V_ORDERGUID;
    jjStore.currentPage = 1;
    jjStore.load();
}

function _selectWl(V_ORDERGUID) {
    var wlStore = Ext.data.StoreManager.lookup('wlStore');
    wlStore.proxy.extraParams.V_V_ORDERGUID = V_ORDERGUID;
    wlStore.currentPage = 1;
    wlStore.load();
}

//上传机具示意图函数
function _upLoadJJSYT() {

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOBJJSYT').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB;
    var insertImageButtonPanel = Ext.getCmp('insertImageButtonPanel');
    Ext.getCmp('V_V_GUIDJJSYT').setValue(insDriverGuid);
    Ext.getCmp('V_V_FILENAMEJJSYT').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOBJJSYT').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODEJJSYT').setValue('JJSYT');
    Ext.getCmp('V_V_PLANTJJSYT').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_V_DEPTJJSYT').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('V_V_TIMEJJSYT').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
    Ext.getCmp('V_V_PERSONJJSYT').setValue(Ext.util.Cookies.get('v_personcode'));
    Ext.getCmp('V_V_REMARKJJSYT').setValue('');
    insertImageButtonPanel.submit({
        url: AppUrl + 'zs/BASE_FILE_IMAGE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (form, action) {
            var data = action.result;
            V_V_FILEGUID=data.FILE_GUID;//图片的guid
            Ext.Msg.alert("信息", "成功！");
            _preViewImage1(insDriverGuid,V_V_FILEGUID);
            _selectImage();
        },
        failure: function (resp) {
            Ext.Msg.alert("信息", "失败！");
        }
    });

}

function _preViewImage1(V_GUID,V_V_FILEGUID) {
    //V_GUID=insDriverGuid;//图片上传成功后，查询图片
    var url = AppUrl + 'CarManage/BASE_FILE_IMAGE_SEL?V_V_GUID=' + V_GUID +'&V_V_FILEGUID='+V_V_FILEGUID;
    Ext.getCmp("browseImage").getEl().dom.src = url;
}

//删除机具示意图
function _deleteJJSYT() {
    var records = Ext.getCmp('insertImageGridPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.alert("操作信息", '请选择至少一条数据进行删除！', Ext.MessageBox.WARNING);
        return false;
    }

    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'zs/BASE_FILE_IMAGE_DEL ',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[i].data.V_FILEGUID
                        },
                        success: function (resp) {
                            var data = Ext.decode(resp.responseText);
                            if (data.INFO == 'SUCCESS') {
                                _selectImage();
                                Ext.Msg.alert("信息", "成功！");
                            } else {
                                Ext.Msg.alert("信息", "失败！");
                            }
                        }
                    });
                }
            } else {
                Ext.MessageBox.hide();
            }
        }
    });
}

//新增图片的弹窗
function _insertImage(){
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择机具!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    Ext.getCmp('_insertImageWindow').show();
}

//查询新增图片
function _selectImage() {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': insDriverGuid,
        'V_V_FILEGUID': V_V_FILEGUID
    };
    imageStore.load();
}

//上一页
function _last(){
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择机具!',
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
        var url = AppUrl + 'CarManage/BASE_FILE_IMAGE_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') ;

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }
}

//下一页
function _next(){


    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择机具!',
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
        var url = AppUrl + 'CarManage/BASE_FILE_IMAGE_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') ;

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }
}

