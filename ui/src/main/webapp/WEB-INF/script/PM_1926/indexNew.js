var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPT = Ext.util.Cookies.get('v_deptcode');
var V_V_PLANT = Ext.util.Cookies.get('v_orgCode');
var V_V_PERSON = Ext.util.Cookies.get('v_personcode');


var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
var V_V_FILEGUID = '';
var AQCS_CODE_;//用于取得安全措施编码的值
var AQYA_CODE_FILE;//用于取得安全预案编码的值
var AQSG_CODE_FILE;//用于取得安全事故编码的值
var ZG_CODE_FILE;  //用于取得安全整改编码的值
var ZG_GUID;//用于查询整改工单
Ext.onReady(function () {

    var aqcsStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'aqcsStore',
        autoLoad: false,
        fields: ['V_AQCS_CODE', 'V_AQCS_NAME', 'V_AQ_ZYSX', 'V_AQCS_DETAIL'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_AQCS_SEL',
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

    var aqcs_ya_Store = Ext.create('Ext.data.Store', { //安全措预案数据集
        id: 'aqcs_ya_Store',
        autoLoad: false,
        fields: ['V_AQCS_CODE', 'V_AQYA_CODE', 'V_AQYA_NAME', 'V_AQYA_DETAIL'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_AQCS_AQYA_SEL',
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

    //获取附件的数据集
    var yafjStore = Ext.create('Ext.data.Store', { //安全措预案数据集
        id: 'yafjStore',
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
    //安全事故案例数据集
    var aqSgAlStore = Ext.create('Ext.data.Store', {
        id: 'aqSgAlStore',
        autoLoad: false,//'V_FILE_GUID'为安全事故编码
        fields: ['V_FINDTIME', 'V_FAULT_DD', 'V_FAULT_YY', 'V_FAULT_XX', 'V_FILE_GUID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_AQCS_FAULT_ITEM_SEL',//存储过程调用
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
    //安全措施整改数据集
    var aqCsZgStore = Ext.create('Ext.data.Store', { //安全措预案数据集
        id: 'aqCsZgStore',
        autoLoad: false,
        fields: ['V_AQCS_CODE', 'V_ZG_GUID', 'V_ZG_TIME', 'V_ZG_PLACE', 'V_ZG_PERSON', 'V_ZG_DETAIL', 'V_ZG_COST'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_AQCS_ZG_SEL',//存储过程调用
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
    //获取整改工单数据集
    var zggdStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'zggdStore',
        autoLoad: false,
        fields: ['V_ORDERID', 'V_ORDERGUID', 'V_SHORT_TXT', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'V_DEPTNAME',
            'V_ENTERED_BY', 'D_ENTER_DATE', 'V_JX_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GD_BY_ZGGUID_SEL',
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
    //获取人工数据集
    var rgStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'rgStore',
        autoLoad: false,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_FUNC_LOC', 'V_ENTERED_BY', 'V_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GZ_BY_ZGGUID_SEL',
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
    //获取工具数据集
    var gjStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'gjStore',
        autoLoad: false,
        fields: ['V_GJ_CODE', 'V_GJ_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GJ_BY_ZGGUID_SEL',
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
    //获取机具数据集
    var jjStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'jjStore',
        autoLoad: false,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_JJ_BY_ZGGUID_SEL',
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
        }/*,
         listeners: {//给下拉框默认赋值
         load: function (store, records) {
         Ext.getCmp('ck').select(ckStore.getAt(0));
         }
         }*/
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

    //关联设备表格
    var sbbgStore = Ext.create('Ext.data.Store', {
        storeId: 'sbbgStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_LINK_TIME', 'V_LINK_PERSON'],
        proxy: {
            url: AppUrl + 'zs/BASE_AQCS_BY_EQUCODE_SEL',
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
        data: [['M'], ['S'], ['P'], [' '], [' ']]
    });

//顶部查询条件
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        title: '<div align="center">安全措施管理</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: []
    });

//左上button
    var buttonPanel1 = Ext.create('Ext.Panel', {
        id: 'buttonPanel1',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',//?????
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'textfield',
                id: 'JJMC',
                emptyText: '安全措施模糊查询',
                style: 'margin:5px 0px 5px 20px'
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 30px',
                width: 60,
                handler: _queryAqcs
            },
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _addAqcs},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _updateAqcs},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAqcs}]
    });

    //左上表格
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        store: aqcsStore,
        //baseCls: 'my-panel-no-border',
        columnLines: true,
        border: false,
        //frame: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
           // {text: '安全措施编码', dataIndex: 'V_AQCS_CODE', style: 'text-align: center;', flex: 1},
            {
                text: '安全措施名称', dataIndex: 'V_AQCS_NAME', style: 'text-align: center;', flex: 1
            }],
        listeners: {//itemclick监听查询相关安全措施详情
            itemclick: function (panel, record) {
                _selectAqcsDetail(record.get('V_AQCS_CODE'));
                _selectAqcs_ya(record.get('V_AQCS_CODE'));
                _queryAqSgAl(record.get('V_AQCS_CODE'));
                _queryAqCsZg(record.get('V_AQCS_CODE'));
                _queryAqCsFile(record.get('V_AQCS_CODE'));
            }
        },
        bbar: [{
            id: 'grid1page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcsStore'
        }]
    });
    //添加安全措施的弹窗，用于添加和修改的实现
    var _editAqcsWindow = Ext.create('Ext.window.Window', {
        id: '_editAqcsWindow',
        width: 320,
        height: 200,
        layout: 'vbox',
        title: '编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
        items: [
            {xtype: 'textfield', id: 'WIN_AQCS_CODE1', fieldLabel: '安全措施编码', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQCS_NAME', fieldLabel: '安全措施名称', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQ_ZYSX', fieldLabel: '安全注意事项', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQCS_DETAIL', fieldLabel: '安全措施明细', width: '300'}],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                _editAqcsSave();
            }
        }, {
            xtype: 'button', text: '取消', width: 40, handler: function () {
                Ext.getCmp('_editAqcsWindow').hide();
            }
        }]
    });
    //左上的布局
    var zuoshangPanel = Ext.create('Ext.Panel', {
        id: 'zuoshangPanel',
        layout: 'border',
        frame: true,
        border: false,
        items: [{
            region: 'north',
            layout: 'fit',
            items: [buttonPanel1]
        }, {
            region: 'center',
            layout: 'fit',
            items: [gridPanel1]
        }]
    });
//左下
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        border: false,
        //layout:'vbox',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 50px'},
        //defaults: {labelAlign: 'right', autoWidth: true},
        items: [{xtype: 'textfield', id: 'AQCS_CODE', fieldLabel: '安全措施编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'AQCS_NAME', fieldLabel: '安全措施名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', id: 'AQ_ZYSX', fieldLabel: '安全措施明细:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', id: "AQCS_DETAIL", fieldLabel: '安全措施注意事项', maxLength: 60, allowBlank: false}
        ]
    });

    //安全措施预案button1
    var buttonPanel2 = Ext.create('Ext.Panel', {
        id: 'buttonPanel2',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _addAqcs_Ya},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _updateAqcs_Ya},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAqcs_Ya}]
    });

    //安全措施预案表格1     附件查看的位置
    var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        store: 'aqcs_ya_Store',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
          //  {text: '预案编码', dataIndex: 'V_AQYA_CODE', style: 'text-align: center;', flex: 1},
            {text: '预案名称', dataIndex: 'V_AQYA_NAME', style: 'text-align: center;', flex: 1},
            {text: '预案详情', dataIndex: 'V_AQYA_DETAIL', style: 'text-align: center;', flex: 1},
            {
                text: '附件', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_queryFile(\'' + record.data.V_AQYA_CODE + '\')">' + '详情' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid2page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcs_ya_Store'
        }]
    });
    //添加和修改安全措施预案的弹窗
    var _editAqcs_Ya_Window = Ext.create('Ext.window.Window', {//安全预案
        id: '_editAqcs_Ya_Window',
        width: 320,
        height: 200,
        layout: 'vbox',
        title: '编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
        items: [
            {xtype: 'textfield', id: 'WIN_AQCS_CODE', fieldLabel: '安全措施编码', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQYA_CODE', fieldLabel: '预案编码', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQYA_NAME', fieldLabel: '预案名称', width: '300'},
            {xtype: 'textfield', id: 'WIN_AQYA_DETAIL', fieldLabel: '预案详情', width: '300'}],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                _editAqcs_YaSave();
            }
        }, {
            xtype: 'button', text: '取消', width: 40, handler: function () {
                Ext.getCmp('_editAqcs_Ya_Window').hide();
            }
        }]
    });
    //安全措施预案button2
    var buttonPanel3 = Ext.create('Ext.form.Panel', {
        id: 'buttonPanel3',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                buttonText: '浏览'
            },
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _upLoadFj},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteFj},
            {xtype: 'hidden', id: 'V_V_GUID', name: 'V_V_GUID'},
            {xtype: 'hidden', id: 'V_V_FILENAME', name: 'V_V_FILENAME'},
            {xtype: 'hidden', id: 'V_V_FILETYPECODE', name: 'V_V_FILETYPECODE'},
            {xtype: 'hidden', id: 'V_V_PLANT', name: 'V_V_PLANT'},
            {xtype: 'hidden', id: 'V_V_DEPT', name: 'V_V_DEPT'},
            {xtype: 'hidden', id: 'V_V_TIME', name: 'V_V_TIME'},
            {xtype: 'hidden', id: 'V_V_PERSON', name: 'V_V_PERSON'},
            {xtype: 'hidden', id: 'V_V_REMARK', name: 'V_V_REMARK'}
        ]
    });
    //安全措施预案表格2  附件的表格
    var gridPanel3 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel3',
        store: 'yafjStore',
        columnLines: true,
        border: 'false',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'V_FILENAME', style: 'text-align: center;', flex: 1},
            {text: '上传时间', dataIndex: 'V_TIME', style: 'text-align: center;', flex: 1},
            {text: '上传人', dataIndex: 'V_PERSON', style: 'text-align: center;', flex: 1},
            {
                text: '下载', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_downloadAttach(\'' + record.data.V_FILEGUID + '\')">' + '下载' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'yafjStore'
        }]
    });
    //安全措施预案附件布局
    var aqcsyaPanel2 = Ext.create('Ext.panel.Panel', {
        id: 'aqcsyaPanel2',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [buttonPanel3]}, {region: 'center', layout: 'fit', items: [gridPanel3]}]
    });
    //安全预案附件详情窗口
    var _aqYaFjWindow = Ext.create('Ext.window.Window', {
        id: '_aqYaFjWindow',
        width: 450,
        height: 500,
        layout: 'border',
        title: '附件详情',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [
            {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [aqcsyaPanel2]
            }
        ]
    });

    //安全措施预案
    var aqcsyaPanel1 = Ext.create('Ext.panel.Panel', {
        id: 'aqcsyaPanel1',
        title: '安全措施预案',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [buttonPanel2]}, {region: 'center', layout: 'fit', items: [gridPanel2]}]
    });


    //安全事故案例表格
    var aqsgalPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqsgalPanel',
        store: 'aqSgAlStore',
        title: '安全事故案例',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        frame: 'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '事故发生时间', dataIndex: 'V_FINDTIME', style: 'text-align: center;', flex: 1},
            {text: '事故发生地点', dataIndex: 'V_FAULT_DD', style: 'text-align: center;', flex: 1},
            {text: '事故影响', dataIndex: 'V_FAULT_YY', style: 'text-align: center;', flex: 1},
            {text: '事故详情', dataIndex: 'V_FAULT_XX', style: 'text-align: center;', flex: 1},
            {
                text: '附件', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_queryFileAqsg(\'' + record.data.V_FILE_GUID + '\')">' + '详情' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid4page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqSgAlStore'
        }]
    });
    //安全事故附件的浏览等按钮，相当于安全措施buttonPanel3   上传方法_upLoadAQSGFj
    var aqsgfjButtonPanel = Ext.create('Ext.form.Panel', {
        id: 'aqsgfjButtonPanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'filefield',
                id: 'V_V_FILEBLOBAQSG',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                buttonText: '浏览'
            },
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _upLoadAQSGFj},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAQSGFj},
            {xtype: 'hidden', id: 'V_V_GUIDAQSG', name: 'V_V_GUID'},
            {xtype: 'hidden', id: 'V_V_FILENAMEAQSG', name: 'V_V_FILENAME'},
            {xtype: 'hidden', id: 'V_V_FILETYPECODEAQSG', name: 'V_V_FILETYPECODE'},
            {xtype: 'hidden', id: 'V_V_PLANTAQSG', name: 'V_V_PLANT'},
            {xtype: 'hidden', id: 'V_V_DEPTAQSG', name: 'V_V_DEPT'},
            {xtype: 'hidden', id: 'V_V_TIMEAQSG', name: 'V_V_TIME'},
            {xtype: 'hidden', id: 'V_V_PERSONAQSG', name: 'V_V_PERSON'},
            {xtype: 'hidden', id: 'V_V_REMARKAQSG', name: 'V_V_REMARK'}
        ]
    });
    //安全事故附件的表格，相当于安全措施gridPanel3
    var aqsgfjGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqsgfjGridPanel',
        store: 'yafjStore',
        columnLines: true,
        border: 'false',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'V_FILENAME', style: 'text-align: center;', flex: 1},
            {text: '上传时间', dataIndex: 'V_TIME', style: 'text-align: center;', flex: 1},
            {text: '上传人', dataIndex: 'V_PERSON', style: 'text-align: center;', flex: 1},
            {
                text: '下载', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_downloadAcsg(\'' + record.data.V_FILEGUID + '\')">' + '下载' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'yafjStore'
        }]
    });
    //安全事故点击详情时弹窗的布局  相当于aqcsyaPanel2
    var aqsgfjPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqsgfjPanel',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [aqsgfjButtonPanel]}, {
            region: 'center',
            layout: 'fit',
            items: [aqsgfjGridPanel]
        }]
    });
    //安全事故附件详情窗口
    var _aqsgWindow = Ext.create('Ext.window.Window', {
        id: '_aqsgWindow',
        width: 450,
        height: 500,
        layout: 'border',
        title: '附件详情',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [
            {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [aqsgfjPanel]
            }
        ]
    });


    //安全措施整改button1
    var buttonPanel4 = Ext.create('Ext.Panel', {
        id: 'buttonPanel4',
        frame: true,
        border: false,
        // baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _addAqCsZg},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _updateAqCsZg},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAqCsZg}]
    });
    //添加安全措施预案的弹窗
    var _editAqCsZgWindow = Ext.create('Ext.window.Window', {//安全预案
        id: '_editAqCsZgWindow',
        width: 350,
        height: 450,
        layout: 'vbox',
        title: '编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
        items: [
           // {xtype: 'textfield', id: 'WIN_AQCS_CODE', fieldLabel: '安全措施编码', width: '300'},
           {xtype: 'textfield', id: 'WIN_ZG_GUID', fieldLabel: '整改GUID', width: '300'},
            {
                xtype: 'datefield',
                id: 'WIN_ZG_TIME',
                format: 'Y-m-d H:i:s',
                submitFormat: 'Y-m-d H:i:s',
                fieldLabel: '整改时间',
                width: '300'
            },
            {xtype: 'textfield', id: 'WIN_ZG_PLACE', fieldLabel: '整改地点', width: '300'},
            {xtype: 'textfield', id: 'WIN_ZG_PERSON', fieldLabel: '整改负责人', width: '300'},
            {xtype: 'textfield', id: 'WIN_ZG_DETAIL', fieldLabel: '整改方案明细', width: '300'},
            {xtype: 'textfield', id: 'WIN_ZG_COST', fieldLabel: '整改费用', width: '300'}],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                _editAqCsZgSave();
            }
        }, {
            xtype: 'button', text: '取消', width: 40, handler: function () {
                Ext.getCmp('_editAqCsZgWindow').hide();
            }
        }]
    });

    //整改详细信息---调整页面布局新增的表格
    var zgdetailPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgdetailPanel',
        store: 'aqCsZgStore',
        // title: '整改工单',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            //{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '整改时间', dataIndex: 'V_ZG_TIME', style: 'text-align: center;', flex: 1},
            {text: '整改地点', dataIndex: 'V_ZG_PLACE', style: 'text-align: center;', flex: 1},
            {text: '整改负责人', dataIndex: 'V_ZG_PERSON', style: 'text-align: center;', flex: 1},
            {text: '整改方案明细', dataIndex: 'V_ZG_DETAIL', style: 'text-align: center;', flex: 1},
            {text: '整改费用', dataIndex: 'V_ZG_COST', style: 'text-align: center;', flex: 1},
            {
                text: '附件', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_queryAqCsZgFile(\'' + record.data.V_ZG_GUID + '\')">' + '详情' + '</a>';
                }
            }
        ],
        listeners: {//itemclick监听查询相关整改工单，人工，工具，机具
            itemclick: function (panel, record) {
                _selectZggd(record.get('V_ZG_GUID'));
                _selectRg(record.get('V_ZG_GUID'));
                _selectGj(record.get('V_ZG_GUID'));
                _selectJj(record.get('V_ZG_GUID'));
            }
        },
        bbar: [{
            id: 'grid11page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqCsZgStore'
        }]
    });
    //安全措施整改附件的浏览等按钮，相当于安全措施buttonPanel3   上传方法_upLoadAQSGFj
    var aqzgfjButtonPanel = Ext.create('Ext.form.Panel', {
        id: 'aqzgfjButtonPanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'filefield',
                id: 'V_V_FILEBLOBAQZG',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                buttonText: '浏览'
            },
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _upLoadAQZGFj},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAQZGFj},
            {xtype: 'hidden', id: 'V_V_GUIDAQZG', name: 'V_V_GUID'},
            {xtype: 'hidden', id: 'V_V_FILENAMEAQZG', name: 'V_V_FILENAME'},
            {xtype: 'hidden', id: 'V_V_FILETYPECODEAQZG', name: 'V_V_FILETYPECODE'},
            {xtype: 'hidden', id: 'V_V_PLANTAQZG', name: 'V_V_PLANT'},
            {xtype: 'hidden', id: 'V_V_DEPTAQZG', name: 'V_V_DEPT'},
            {xtype: 'hidden', id: 'V_V_TIMEAQZG', name: 'V_V_TIME'},
            {xtype: 'hidden', id: 'V_V_PERSONAQZG', name: 'V_V_PERSON'},
            {xtype: 'hidden', id: 'V_V_REMARKAQZG', name: 'V_V_REMARK'}
        ]
    });
    //安全措施整改附件的表格
    var aqzgfjGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqzgfjGridPanel',
        store: 'yafjStore',
        columnLines: true,
        border: 'false',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'V_FILENAME', style: 'text-align: center;', flex: 1},
            {text: '上传时间', dataIndex: 'V_TIME', style: 'text-align: center;', flex: 1},
            {text: '上传人', dataIndex: 'V_PERSON', style: 'text-align: center;', flex: 1},
            {
                text: '下载', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_downloadAqsgzg(\'' + record.data.V_FILEGUID + '\')">' + '下载' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'yafjStore'
        }]
    });
    //安全事故点击详情时弹窗的布局  相当于aqcsyaPanel2
    var aqzgfjPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqzgfjPanel',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [aqzgfjButtonPanel]}, {
            region: 'center',
            layout: 'fit',
            items: [aqzgfjGridPanel]
        }]
    });
    //安全事故附件详情窗口
    var _aqzgfjWindow = Ext.create('Ext.window.Window', {
        id: '_aqzgfjWindow',
        width: 450,
        height: 500,
        layout: 'border',
        title: '附件详情',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [
            {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [aqzgfjPanel]
            }
        ]
    });
    //安全措施整改页面顶部的小布局
    var top = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        border: false,
        frame: true,
        width: 250,
        items: [{region: 'north', items: [buttonPanel4]}, {region: 'center', layout: 'fit', items: [zgdetailPanel]}]

    });


    //整改审批流程
    var zgsplcPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgsplcPanel',
        store: 'gridStore',
        title: '整改审批流程',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '流程步骤', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '操作人', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '审批意见', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '审批时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid6page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });
    //人工
    var rgPanel = Ext.create('Ext.grid.Panel', {
        id: 'rgPanel',
        title: '人工',
        columnLines: true,
        store: rgStore,
        //selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid8page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'rgStore'
        }]
    });

    //工具
    var gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel',
        title: '工具',
        columnLines: true,
        store: gjStore,
        //selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'V_GJ_CODE', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'V_GJ_NAME', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gjStore'
        }]
    });

    //机具
    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
        title: '机具',
        columnLines: true,
        store: jjStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jjStore'
        }]
    });

    //安全措施整改——整改工单
    var gdxqPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdxqPanel',
        store: 'zggdStore',
        title: '整改工单',
        autoScroll: true,
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'single'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单号', dataIndex: 'V_ORDERGUID', style: 'text-align: center;', width: 80},
            {text: '工单描述', dataIndex: 'V_SHORT_TXT', style: 'text-align: center;', width: 80},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', style: 'text-align: center;', width: 80},
            {text: '设备位置', dataIndex: 'V_FUNC_LOC', style: 'text-align: center;', width: 80},
            {text: '委托人', dataIndex: 'V_ENTERED_BY', style: 'text-align: center;', width: 80},
            {text: '委托单位', dataIndex: 'V_DEPTNAME', style: 'text-align: center;', width: 80},
            {text: '委托时间', dataIndex: 'D_ENTER_DATE', style: 'text-align: center;', width: 80},
            {text: '检修单位', dataIndex: 'V_JX_DEPTNAME', style: 'text-align: center;', width: 80}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'zggdStore'
        }]
    });

    //安全措施整改tab
    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',
        //border:'false',
        frame: true,
         items: [zgsplcPanel, gdxqPanel, rgPanel, jjPanel,gjPanel]
    });

    //调整页面布局是后加的流程图
    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        frame: true,
        border: false,

        title: '流程图',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
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
        }]
    });
    //安全措施整改
    var aqcszgPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqcszgPanel',
        title: '安全措施整改',
        // layout: 'border',
        layout: {type: 'border', regionWeights: {west: -1, north: 1, south: 1, east: -1}},
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [
            {region: 'north', height: '50%', layout: 'fit', items: [top]},
            //{region: 'south', height: '25%', layout: 'fit', items: [gdxqPanel]},
            {region: 'west', width: '50%', layout: 'fit', items: [tab1]},
            {region: 'center', layout: 'fit', items: [viewImagePanel]}
        ]
    });


    //安全措施附件按钮
    var buttonPanel5 = Ext.create('Ext.form.Panel', {
        id: 'buttonPanel5',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'filefield',
                id: 'V_V_FILEBLOB_',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                buttonText: '浏览'
            },
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _upLoadAqCsFj},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _deleteAqCsFj},
            {xtype: 'hidden', id: 'V_V_GUID_', name: 'V_V_GUID'},
            {xtype: 'hidden', id: 'V_V_FILENAME_', name: 'V_V_FILENAME'},
            {xtype: 'hidden', id: 'V_V_FILETYPECODE_', name: 'V_V_FILETYPECODE'},
            {xtype: 'hidden', id: 'V_V_PLANT_', name: 'V_V_PLANT'},
            {xtype: 'hidden', id: 'V_V_DEPT_', name: 'V_V_DEPT'},
            {xtype: 'hidden', id: 'V_V_TIME_', name: 'V_V_TIME'},
            {xtype: 'hidden', id: 'V_V_PERSON_', name: 'V_V_PERSON'},
            {xtype: 'hidden', id: 'V_V_REMARK_', name: 'V_V_REMARK'}
        ]
    });
    //安全措施附件表格
    var gridPanel5 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel5',
        store: 'yafjStore',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'V_FILENAME', style: 'text-align: center;', flex: 1},
            {text: '上传时间', dataIndex: 'V_TIME', style: 'text-align: center;', flex: 1},
            {text: '上传人', dataIndex: 'V_PERSON', style: 'text-align: center;', flex: 1},
            {
                text: '下载', dataIndex: '', style: 'text-align: center;', flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_downloadAqcsfj(\'' + record.data.V_FILEGUID + '\')">' + '下载' + '</a>';
                }
            }],
        bbar: [{
            id: 'grid12page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'yafjStore'
        }]
    });
    //安全措施附件
    var aqcsfjPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqcsfjPanel',
        title: '安全措施附件',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [buttonPanel5]}, {region: 'center', layout: 'fit', items: [gridPanel5]}]
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
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid', 'sid']
        }),
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
            {xtype: 'textfield', id: 'rsbmc', fieldLabel: '设备名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rsblxbm', fieldLabel: '设备类型编号:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: "rsblxwz", fieldLabel: '设备类型位置', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rwzbm', fieldLabel: '位置编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rwzmc', fieldLabel: '位置名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rsblx', fieldLabel: '设备类型:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rsbzl', fieldLabel: '设备种类:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rbs', fieldLabel: 'ABC标识:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rksrq', fieldLabel: '开始日期:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rjsrq', fieldLabel: '结束日期:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rcbzx', fieldLabel: '成本中心:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rggxh', fieldLabel: '规格型号:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rdxcc', fieldLabel: '大小/尺寸:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rzczzs', fieldLabel: '资产制造商:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rgzjz', fieldLabel: '购置价值:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', id: 'rdxzl', fieldLabel: '对象重量:', maxLength: 60, allowBlank: false},]
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
            {text: '设备编码', dataIndex: 'V_EQUCODE', align: 'center', flex: 1},
            {text: '设备名称', dataIndex: 'V_EQUNAME', align: 'center', flex: 1},
            {text: '功能位置', dataIndex: 'V_EQUSITE', align: 'center', flex: 1},
            {text: '关联时间', dataIndex: 'V_LINK_TIME', align: 'center', flex: 1},
            {text: '关联人', dataIndex: 'V_LINK_PERSON', align: 'center', flex: 1},
            {
                text: '取消关联', dataIndex: '', style: 'text-align: center;', width: 80,
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
    //右边大tab的布局
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        //border:'false',
        frame: true,
        items: [aqcsyaPanel1, aqsgalPanel, aqcszgPanel, aqcsfjPanel, glsbPanel]
    });
    Ext.create('Ext.container.Viewport', {
        layout: {type: 'border', regionWeights: {north: 4, east: 3, south: 2, west: -1}},
        defaults: {border: false},
        items: [
            {region: 'north', items: [inputPanel]},
            {region: 'east', layout: 'fit', width: '70%', items: [tab]},
            {region: 'south', layout: 'fit', height: '40%', items: [formPanel]},
            {region: 'center', layout: 'fit', items: [zuoshangPanel]}]
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
        }else if (operation.node.data.parentid == -2) {
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
});

function _queryAqcs() {//左上查询
    var aqcsStore = Ext.data.StoreManager.lookup('aqcsStore');
    aqcsStore.proxy.extraParams.V_V_AQCS_NAME = Ext.getCmp('JJMC').getValue();
    aqcsStore.currentPage = 1;
    aqcsStore.load();
}
function _selectAqcsDetail(V_AQCS_CODE) {//左上列表点击行，可查看相关详情信息
    Ext.Ajax.request({
        url: AppUrl + 'zs/BASE_AQCS_BYCODE_SEL',
        method: 'POST',
        params: {
            V_V_AQCS_CODE: V_AQCS_CODE
        },
        success: function (resp) {
            //var resp = Ext.decode(response.responseText);
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 0) {
                Ext.getCmp('AQCS_CODE').setValue(resp.list[0].V_AQCS_CODE);//安全措施编码
                Ext.getCmp('AQCS_NAME').setValue(resp.list[0].V_AQCS_NAME);//安全措施名称
                Ext.getCmp('AQ_ZYSX').setValue(resp.list[0].V_AQ_ZYSX);//安全注意事项
                Ext.getCmp('AQCS_DETAIL').setValue(resp.list[0].V_AQCS_DETAIL);//安全注意详情
            }
        }
    });
}
function _addAqcs() {//安全措施的新增
    Ext.getCmp('WIN_AQCS_CODE').hide();
    Ext.getCmp('WIN_AQCS_CODE').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('WIN_AQCS_NAME').setValue('');
    Ext.getCmp('WIN_AQ_ZYSX').setValue('');
    Ext.getCmp('WIN_AQCS_DETAIL').setValue('');
    Ext.getCmp('_editAqcsWindow').show();
}
function _updateAqcs() {//安全措施的修改
    var records = Ext.getCmp('gridPanel1').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    Ext.getCmp('WIN_AQCS_CODE').setValue(records[0].data.V_AQCS_CODE);
    Ext.getCmp('WIN_AQCS_CODE').hide();
    Ext.getCmp('WIN_AQCS_NAME').setValue(records[0].data.V_AQCS_NAME);
    Ext.getCmp('WIN_AQ_ZYSX').setValue(records[0].data.V_AQ_ZYSX);
    Ext.getCmp('WIN_AQCS_DETAIL').setValue(records[0].data.V_AQCS_DETAIL);
    Ext.getCmp('_editAqcsWindow').show();

}
function _editAqcsSave() {//新增和修改的保存
    Ext.Ajax.request({
        url: AppUrl + 'zs/BASE_AQCS_EDIT ',
        method: 'POST',
        async: false,
        params: {
            V_V_AQCS_CODE: Ext.getCmp('WIN_AQCS_CODE').getValue(),
            V_V_AQCS_NAME: Ext.getCmp('WIN_AQCS_NAME').getValue(),
            V_V_AQ_ZYSX: Ext.getCmp('WIN_AQ_ZYSX').getValue(),
            V_V_AQCS_DETAIL: Ext.getCmp('WIN_AQCS_DETAIL').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('_editAqcsWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                _queryAqcs();
                Ext.getCmp('AQCS_CODE').setValue('');//安全措施编码
                Ext.getCmp('AQCS_NAME').setValue('');//安全措施名称
                Ext.getCmp('AQ_ZYSX').setValue('');//安全注意事项
                Ext.getCmp('AQCS_DETAIL').setValue('');//安全注意详情
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });

}
function _deleteAqcs() {//安全措施的删除方法
    var records = Ext.getCmp('gridPanel1').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
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
                    Ext.getCmp('AQCS_CODE').setValue('');//安全措施编码
                    Ext.getCmp('AQCS_NAME').setValue('');//安全措施名称
                    Ext.getCmp('AQ_ZYSX').setValue('');//安全注意事项
                    Ext.getCmp('AQCS_DETAIL').setValue('');//安全注意详情
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }
}
function _selectAqcs_ya(V_AQCS_CODE) {//查看安全措施预案的方法
    AQCS_CODE_ = V_AQCS_CODE;
    var aqcs_ya_Store = Ext.data.StoreManager.lookup('aqcs_ya_Store');
    aqcs_ya_Store.proxy.extraParams.V_V_AQCS_CODE = V_AQCS_CODE;
    aqcs_ya_Store.currentPage = 1;
    aqcs_ya_Store.load();

}


function _addAqcs_Ya() {
    Ext.getCmp('WIN_AQCS_CODE').setValue(AQCS_CODE_);
    Ext.getCmp('WIN_AQCS_CODE').hide();
    //  Ext.getCmp('WIN_AQYA_CODE').setReadOnly(true);
    Ext.getCmp('WIN_AQYA_CODE').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('WIN_AQYA_CODE').hide();
    Ext.getCmp('WIN_AQYA_NAME').setValue('');
    Ext.getCmp('WIN_AQYA_DETAIL').setValue('');
    Ext.getCmp('_editAqcs_Ya_Window').show();
}
function _updateAqcs_Ya() {
    var records = Ext.getCmp('gridPanel2').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    Ext.getCmp('WIN_AQCS_CODE').setValue(records[0].data.V_AQCS_CODE);
    Ext.getCmp('WIN_AQCS_CODE').hide();
    Ext.getCmp('WIN_AQYA_CODE').setValue(records[0].data.V_AQYA_CODE);
    Ext.getCmp('WIN_AQYA_CODE').hide();
    Ext.getCmp('WIN_AQYA_NAME').setValue(records[0].data.V_AQYA_NAME);
    Ext.getCmp('WIN_AQYA_DETAIL').setValue(records[0].data.V_AQYA_DETAIL);
    Ext.getCmp('_editAqcs_Ya_Window').show();
}
function _editAqcs_YaSave() {//新增和修改的保存
    Ext.Ajax.request({
        url: AppUrl + 'zs/BASE_AQCS_AQYA_EDIT ',
        method: 'POST',
        async: false,
        params: {
            V_V_AQCS_CODE: Ext.getCmp('WIN_AQCS_CODE').getValue(),
            V_V_AQYA_CODE: Ext.getCmp('WIN_AQYA_CODE').getValue(),
            V_V_AQYA_NAME: Ext.getCmp('WIN_AQYA_NAME').getValue(),
            V_V_AQYA_DETAIL: Ext.getCmp('WIN_AQYA_DETAIL').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('_editAqcs_Ya_Window').hide();
                Ext.Msg.alert("信息", "成功！");
                _selectAqcs_ya(AQCS_CODE_);
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });

}
function _deleteAqcs_Ya() {
    var records = Ext.getCmp('gridPanel2').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'zs/BASE_AQCS_AQYA_DEL ',
            method: 'POST',
            async: false,
            params: {
                V_V_AQYA_CODE: records[i].data.V_AQYA_CODE
            },
            success: function (resp) {
                var data = Ext.decode(resp.responseText);
                if (data.INFO == 'SUCCESS') {
                    Ext.getCmp('_editAqcs_Ya_Window').hide();
                    Ext.Msg.alert("信息", "成功！");
                    _selectAqcs_ya(AQCS_CODE_);
                    Ext.getCmp('AQCS_CODE').setValue('');//安全措施编码
                    Ext.getCmp('AQCS_NAME').setValue('');//安全措施名称
                    Ext.getCmp('AQ_ZYSX').setValue('');//安全注意事项
                    Ext.getCmp('AQCS_DETAIL').setValue('');//安全注意详情
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }
}

//安全预案附件上传
function _upLoadFj() {
    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB;

    var buttonPanel3 = Ext.getCmp('buttonPanel3');
    Ext.getCmp('V_V_GUID').setValue(AQYA_CODE_FILE);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('AQCSYA');
    Ext.getCmp('V_V_PLANT').setValue(V_V_PLANT);
    Ext.getCmp('V_V_DEPT').setValue(V_V_DEPT);
    Ext.getCmp('V_V_TIME').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSON);
    Ext.getCmp('V_V_REMARK').setValue('');
    buttonPanel3.submit({
        url: AppUrl + 'zs/BASE_FILE_IMAGE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (INFO) {
            _queryFile(AQYA_CODE_FILE);
            Ext.Msg.alert("信息", "成功！");
        },
        failure: function (resp) {
            Ext.Msg.alert("信息", "失败！");
        }
    });

}
//查看安全预案附件详情
function _queryFile(V_AQYA_CODE) {
    AQYA_CODE_FILE=V_AQYA_CODE;
    var yafjStore = Ext.data.StoreManager.lookup('yafjStore');
    yafjStore.proxy.extraParams.V_V_GUID = V_AQYA_CODE;
    yafjStore.currentPage = 1;
    yafjStore.load();
    Ext.getCmp('_aqYaFjWindow').show();
}
function _down() {
}
//下载附件
function _downloadAttach(V_FILEGUID) {
    var url = AppUrl + 'zs/downloadAttachment?V_V_GUID=' + V_FILEGUID;
    location.href = url;
}

//查询安全事故案例
function _queryAqSgAl(V_AQCS_CODE) {
    var aqSgAlStore = Ext.data.StoreManager.lookup('aqSgAlStore');
    aqSgAlStore.proxy.extraParams.V_V_AQCS_CODE = V_AQCS_CODE;
    aqSgAlStore.currentPage = 1;
    aqSgAlStore.load();
}
//查看安全事故附件详情
function _queryFileAqsg(V_FILE_GUID) {
    AQSG_CODE_FILE = V_FILE_GUID;
    var yafjStore = Ext.data.StoreManager.lookup('yafjStore');
    yafjStore.proxy.extraParams.V_V_GUID = V_FILE_GUID;
    yafjStore.currentPage = 1;
    yafjStore.load();
    Ext.getCmp('_aqsgWindow').show();

}

//安全事故附件上传
function _upLoadAQSGFj() {
    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOBAQSG').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB;

    var aqsgfjButtonPanel = Ext.getCmp('aqsgfjButtonPanel');
    Ext.getCmp('V_V_GUIDAQSG').setValue(AQSG_CODE_FILE);
    Ext.getCmp('V_V_FILENAMEAQSG').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOBAQSG').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODEAQSG').setValue('AQSG');
    Ext.getCmp('V_V_PLANTAQSG').setValue(V_V_PLANT);
    Ext.getCmp('V_V_DEPTAQSG').setValue(V_V_DEPT);
    Ext.getCmp('V_V_TIMEAQSG').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
    Ext.getCmp('V_V_PERSONAQSG').setValue(V_V_PERSON);
    Ext.getCmp('V_V_REMARKAQSG').setValue('');
    aqsgfjButtonPanel.submit({
        url: AppUrl + 'zs/BASE_FILE_IMAGE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (INFO) {
            _queryFileAqsg(AQSG_CODE_FILE);
            Ext.Msg.alert("信息", "成功！");
        },
        failure: function (resp) {
            Ext.Msg.alert("信息", "失败！");
        }
    });

}


//查询安全措施整改详情
function _queryAqCsZg(V_AQCS_CODE) {
    AQCS_CODE_ = V_AQCS_CODE;
    var aqCsZgStore = Ext.data.StoreManager.lookup('aqCsZgStore');
    aqCsZgStore.proxy.extraParams.V_V_AQCS_CODE = V_AQCS_CODE;
    aqCsZgStore.currentPage = 1;
    aqCsZgStore.load();
}
//添加安全措施整改
function _addAqCsZg() {
    Ext.getCmp('WIN_AQCS_CODE').setValue(AQCS_CODE_);
    Ext.getCmp('WIN_AQCS_CODE').hide();
    Ext.getCmp('WIN_ZG_GUID').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('WIN_ZG_GUID').hide();
    Ext.getCmp('WIN_ZG_TIME').setValue('');
    Ext.getCmp('WIN_ZG_PLACE').setValue('');
    Ext.getCmp('WIN_ZG_PERSON').setValue('');
    Ext.getCmp('WIN_ZG_DETAIL').setValue('');
    Ext.getCmp('WIN_ZG_COST').setValue('');
    Ext.getCmp('_editAqCsZgWindow').show();

}
//修改安全措施整改
function _updateAqCsZg() {
    var records = Ext.getCmp('zgdetailPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    Ext.getCmp('WIN_AQCS_CODE').setValue(records[0].data.V_AQCS_CODE);
    Ext.getCmp('WIN_AQCS_CODE').hide();
    Ext.getCmp('WIN_ZG_GUID').setValue(records[0].data.V_ZG_GUID);
    Ext.getCmp('WIN_ZG_GUID').hide();
    Ext.getCmp('WIN_ZG_TIME').setValue((records[0].data.V_ZG_TIME).substring(0, 19));
    Ext.getCmp('WIN_ZG_PLACE').setValue(records[0].data.V_ZG_PLACE);
    Ext.getCmp('WIN_ZG_PERSON').setValue(records[0].data.V_ZG_PERSON);
    Ext.getCmp('WIN_ZG_DETAIL').setValue(records[0].data.V_ZG_DETAIL);
    Ext.getCmp('WIN_ZG_COST').setValue(records[0].data.V_ZG_COST);
    Ext.getCmp('_editAqCsZgWindow').show();

}
//安全措施整改新增和修改的保存
function _editAqCsZgSave() {
    Ext.Ajax.request({
        url: AppUrl + 'zs/BASE_AQCS_ZG_EDIT ',
        method: 'POST',
        async: false,
        params: {
            V_V_AQCS_CODE: Ext.getCmp('WIN_AQCS_CODE').getValue(),
            V_V_ZG_GUID: Ext.getCmp('WIN_ZG_GUID').getValue(),
            V_V_ZG_TIME: Ext.Date.format(Ext.getCmp('WIN_ZG_TIME').getValue(), 'Y-m-d'),
            V_V_ZG_PLACE: Ext.getCmp('WIN_ZG_PLACE').getValue(),
            V_V_ZG_PERSON: Ext.getCmp('WIN_ZG_PERSON').getValue(),
            V_V_ZG_DETAIL: Ext.getCmp('WIN_ZG_DETAIL').getValue(),
            V_V_ZG_COST: Ext.getCmp('WIN_ZG_COST').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('_editAqCsZgWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                _queryAqCsZg(AQCS_CODE_);
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });

}
//删除安全措施整改
function _deleteAqCsZg() {
    var records = Ext.getCmp('zgdetailPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'zs/BASE_AQCS_ZG_DEL ',
            method: 'POST',
            async: false,
            params: {
                V_V_ZG_GUID: records[i].data.V_ZG_GUID
            },
            success: function (resp) {
                var data = Ext.decode(resp.responseText);
                if (data.INFO == 'SUCCESS') {
                    Ext.getCmp('_editAqcsWindow').hide();
                    Ext.Msg.alert("信息", "成功！");
                    _queryAqCsZg(AQCS_CODE_);
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }
}

//查看安全措施整改附件详情
function _queryAqCsZgFile(V_ZG_GUID) {
    ZG_CODE_FILE=V_ZG_GUID;
    var yafjStore = Ext.data.StoreManager.lookup('yafjStore');
    yafjStore.proxy.extraParams.V_V_GUID = V_ZG_GUID;
    yafjStore.currentPage = 1;
    yafjStore.load();
    Ext.getCmp('_aqzgfjWindow').show();
}
//安全措施整改附件上传
function _upLoadAQZGFj() {
    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOBAQZG').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB;

    var aqzgfjButtonPanel = Ext.getCmp('aqzgfjButtonPanel');
    Ext.getCmp('V_V_GUIDAQZG').setValue(ZG_CODE_FILE);
    Ext.getCmp('V_V_FILENAMEAQZG').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOBAQZG').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODEAQZG').setValue('AQCSZG');
    Ext.getCmp('V_V_PLANTAQZG').setValue(V_V_PLANT);
    Ext.getCmp('V_V_DEPTAQZG').setValue(V_V_DEPT);
    Ext.getCmp('V_V_TIMEAQZG').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
    Ext.getCmp('V_V_PERSONAQZG').setValue(V_V_PERSON);
    Ext.getCmp('V_V_REMARKAQZG').setValue('');
    aqzgfjButtonPanel.submit({
        url: AppUrl + 'zs/BASE_FILE_IMAGE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (INFO) {
            _queryAqCsZgFile(ZG_CODE_FILE);
            Ext.Msg.alert("信息", "成功！");
        },
        failure: function (resp) {
            Ext.Msg.alert("信息", "失败！");
        }
    });

}


//查看安全措施附件
function _queryAqCsFile(V_AQCS_CODE) {
    var yafjStore = Ext.data.StoreManager.lookup('yafjStore');
    yafjStore.proxy.extraParams.V_V_GUID = V_AQCS_CODE;
    yafjStore.currentPage = 1;
    yafjStore.load();
}
//安全措施附件上传
function _upLoadAqCsFj() {
    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB_').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB;

    var buttonPanel5 = Ext.getCmp('buttonPanel5');
    Ext.getCmp('V_V_GUID_').setValue(AQCS_CODE_);
    Ext.getCmp('V_V_FILENAME_').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB_').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE_').setValue('AQCS');
    Ext.getCmp('V_V_PLANT_').setValue(V_V_PLANT);
    Ext.getCmp('V_V_DEPT_').setValue(V_V_DEPT);
    Ext.getCmp('V_V_TIME_').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
    Ext.getCmp('V_V_PERSON_').setValue(V_V_PERSON);
    Ext.getCmp('V_V_REMARK_').setValue('');
    buttonPanel5.submit({
        url: AppUrl + 'zs/BASE_FILE_IMAGE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (INFO) {
            _queryAqCsFile(AQCS_CODE_);
            Ext.Msg.alert("信息", "成功！");
        },
        failure: function (resp) {
            Ext.Msg.alert("信息", "失败！");
        }
    });

}


//动态加载子数据集（作业区的数据集）
function _selectDept() {
    //Ext.getCmp('zyq').setValue(null);
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

//取消关联的方法
function _deleteLink() {
    alert("取消关联");
    var records = Ext.getCmp('sbbgPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'zs/BASE_AQCS_EQU_LINKDEL',
        method: 'POST',
        async: false,
        params: {
            V_V_EQUCODE: records[0].data.V_EQUCODE
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.Msg.alert("信息", "成功！");
                var sbbgStore = Ext.data.StoreManager.lookup('sbbgStore');
                sbbgStore.currentPage = 1;
                sbbgStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _add() {
}
function _update() {
}
function _delete() {
}

function _save() {
}
function _queryEquDetail() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", "请选择一个设备");
        return false;
    }
    if (records[0].data.sid != '') {
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
}

function _queryEquLink() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    if (records[0].data.sid != '') {
        var sbbgStore = Ext.data.StoreManager.lookup('sbbgStore');
        sbbgStore.proxy.extraParams.V_V_EQUCODE = records[0].data.sid;
        sbbgStore.currentPage = 1;
        sbbgStore.load();
    }
}

function TreeChecked(TreeChecked) {
    _queryEquDetail();
    _queryEquLink();
}

function _downloadAcsg(V_FILEGUID) {
    var url = AppUrl + 'zs/downloadAttachment?V_V_GUID=' + V_FILEGUID;
    location.href = url;
}

function _downloadAqsgzg(V_FILEGUID) {
    var url = AppUrl + 'zs/downloadAttachment?V_V_GUID=' + V_FILEGUID;
    location.href = url;
}

function _downloadAqcsfj(V_FILEGUID) {
    var url = AppUrl + 'zs/downloadAttachment?V_V_GUID=' + V_FILEGUID;
    location.href = url;
}
//查询整改工单的函数
function _selectZggd(V_ZG_GUID) {
    ZG_GUID = V_ZG_GUID;
    var zggdStore = Ext.data.StoreManager.lookup('zggdStore');
    zggdStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    zggdStore.currentPage = 1;
    zggdStore.load();

}

//删除安全预案附件
function _deleteFj() {
    var records = Ext.getCmp('gridPanel3').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
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
                    _queryFile(AQYA_CODE_FILE);
                    Ext.Msg.alert("信息", "成功！");
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }
}

//查询人工函数
function _selectRg(V_ZG_GUID) {
    ZG_GUID = V_ZG_GUID;
    var rgStore = Ext.data.StoreManager.lookup('rgStore');
    rgStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    rgStore.currentPage = 1;
    rgStore.load();

}


//查询工具函数
function _selectGj(V_ZG_GUID) {
    ZG_GUID = V_ZG_GUID;
    var gjStore = Ext.data.StoreManager.lookup('gjStore');
    gjStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    gjStore.currentPage = 1;
    gjStore.load();

}
//查询机具函数
function _selectJj(V_ZG_GUID) {
    ZG_GUID = V_ZG_GUID;
    var jjStore = Ext.data.StoreManager.lookup('jjStore');
    jjStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    jjStore.currentPage = 1;
    jjStore.load();

}

function _deleteAQSGFj(){
    var records = Ext.getCmp('aqsgfjGridPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
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
                    _queryFileAqsg(AQSG_CODE_FILE);
                    Ext.Msg.alert("信息", "成功！");
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }

}


function _deleteAQZGFj(){
    var records = Ext.getCmp('aqzgfjGridPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
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
                    _queryAqCsZgFile(ZG_CODE_FILE);
                    Ext.Msg.alert("信息", "成功！");
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }

}


function _deleteAqCsFj(){
    var records = Ext.getCmp('gridPanel5').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
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
                    _queryAqCsFile(AQCS_CODE_);
                    Ext.Msg.alert("信息", "成功！");
                } else {
                    Ext.Msg.alert("信息", "失败！");
                }
            }
        });
    }

}