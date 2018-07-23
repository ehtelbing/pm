var bmmcStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bmmcStore',
    fields: ['V_DEPTNAME', 'V_DEPTCODE'],
    proxy: {
        type: 'ajax',
        async: false,
        //        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW_DEPTTYPE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTTYPE: '[主体作业区]',
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
//            parName: ['v_v_deptcode', 'v_v_depttype', 'v_v_person'],
//            parType: ['s', 's', 's'],
//            parVal: [Ext.util.Cookies.get('v_deptcode'), '[主体作业区]', Ext.util.Cookies.get('v_personcode')],
//            proName: 'pro_base_dept_view_depttype',
//            cursorName: 'v_cursor'
        }
    }
});
var lxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'lxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        //        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PP_INFORMATION/V_TYPE'
//            parName: ['IS_V_BASETYPE'],
//            parType: ['s'],
//            parVal: ['PP_INFORMATION/V_TYPE'],
//            proName: 'PRO_PM_BASEDIC_LIST',
//            cursorName: 'V_CURSOR'
        }
    }
});
var bxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        //        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASS'
//            parName: ['IS_V_BASETYPE'],
//            parType: ['s'],
//            parVal: ['PM_DIARYDATA/V_CLASS'],
//            proName: 'PRO_PM_BASEDIC_LIST',
//            cursorName: 'V_CURSOR'
        }
    }
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 15,
    fields: ['D_DATE', 'I_ID', 'V_CLASS', 'V_CLASSTYPE', 'V_DEPT', 'V_INFORMATION', 'V_PERSONNAME', 'V_TYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        //        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners: {
        //        beforeload: OnGridStoreBeforeLoad
    }
});
var Layout = {
    layout: 'border',
    items: [{
        xtype: 'panel',
        title: '信息查询',
        region: 'north'
    }, {
        xtype: 'panel',
        border: false,
        region: 'north',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-no-border',
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'combo',
            fieldLabel: '部门名称',
            labelWidth: 60,
            id: 'bmmc',
            store: 'bmmcStore',
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            labelWidth: 60,
            id: 'lx',
            store: 'lxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '班型',
            labelWidth: 60,
            id: 'bx',
            store: 'bxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }]
    }, {
        xtype: 'panel',
        border: false,
        region: 'north',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-no-border',
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'stardate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'datefield',
            fieldLabel: '终止日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'enddate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'button',
            text: '查询',
            handler: queryGrid,
            icon: imgpath + '/search.png',
            style: {
                margin: ' 5px 0 5px 40px'
            }
        }, {
            xtype: 'button',
            text: '导出Excel',
            handler: OnButtonExcelClicked,
            icon: imgpath + '/001.gif'
        }]
    }, {
        xtype: 'gridpanel',
        region: 'center',
        plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1
        }],
        columnLines: true,
        id: 'grid',
        store: 'gridStore',
        features: [{
            ftype: 'summary'
        }],
        columns: [{
            dataIndex: 'B_END',
            hidden: true
        }, {
            xtype: 'rownumberer',
            text: '序号',
            width: 35,
            align: 'center'
        }, {
            text: '日期',
            align: 'center',
            width: 110,
            dataIndex: 'D_DATE',
            renderer: renderDate,
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '合计'
            }
        }, {
            text: '班型',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASS',
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '数量  : ' + value + '条'
            }
        }, {
            text: '班组',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASSTYPE'
        }, {
            text: '录入人',
            align: 'center',
            width: 90,
            dataIndex: 'V_PERSONNAME',
            renderer: renderFont
        }, {
            text: '内容',
            align: 'center',
            width: 230,
            dataIndex: 'V_INFORMATION',
            renderer: renderFont
        }, {
            text: '信息类型',
            align: 'center',
            width: 100,
            dataIndex: 'V_TYPE'
        }, {
            text: '所属部门',
            align: 'center',
            width: 150,
            dataIndex: 'V_DEPT',
            renderer: renderFont
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    }]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('bmmcStore').on('load', function () {
        Ext.data.StoreManager.lookup('bmmcStore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        Ext.getCmp('bmmc').select(Ext.data.StoreManager.lookup('bmmcStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
        Ext.data.StoreManager.lookup('lxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('bxStore').on('load', function () {
        Ext.data.StoreManager.lookup('bxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('bx').select(Ext.data.StoreManager.lookup('bxStore').getAt(0));
    });
    setTimeout('queryGrid()', 1000 * 1);
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPT: Ext.getCmp('bmmc').getValue(),
            V_V_TYPE: Ext.getCmp('lx').getValue(),
            V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
            V_D_FROMDATE: Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d'),
            V_D_TODATE: Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')
//            parName: ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'],
//            parType: ['s', 's', 's', 's', 'da', 'da'],
//            parVal: [Ext.util.Cookies.get('v_personcode'), Ext.getCmp('bmmc').getValue(), Ext.getCmp('lx').getValue(), Ext.getCmp('bx').getValue(), Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d'), Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')],
//            proName: 'pro_pp_information_list',
//            cursorName: 'v_cursor'
        }
    });
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
            guid += "-";
        }
    }
    return guid;
}

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}

function renderDate(value, metaData) {
    if (Ext.Date.format(value, 'Y-m-d') != '' && Ext.Date.format(value, 'Y-m-d') != null) {
        return Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[0] + '年' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[1] + '月' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[2] + '日';
    } else {
        if (value != '' && value != null && value != undefined) {
            return value.substr(0, 10).split('-')[0] + '年' + value.substr(0, 10).split('-')[1] + '月' + value.substr(0, 10).split('-')[2] + '日';
        } else {
            return value;
        }
    }
}

function renderMoney(value, metaData) {
    metaData.style = 'text-align: right';
    if (value != '' && value != null) {
        return Ext.util.Format.number(value, '0.00');
    } else {
        return value;
    }
}

//function OnGridStoreBeforeLoad(store) {
//    store.proxy.extraParams.parName = ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'];
//    store.proxy.extraParams.parType = ['s', 's', 's', 's', 'da', 'da'];
//    store.proxy.extraParams.parVal = [
//        Ext.util.Cookies.get('v_personcode'),
//        Ext.getCmp('bmmc').getValue(),
//        Ext.getCmp('lx').getValue(),
//        Ext.getCmp('bx').getValue(),
//        Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d'),
//        Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')
//    ],
//            store.proxy.extraParams.proName = 'pro_pp_information_list',
//            store.proxy.extraParams.cursorName = 'v_cursor'
//}
function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.getCmp('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bx').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d'));
//    Ext.Ajax.request({
//        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_EXCEL',
//        type: 'ajax',
//        method: 'POST',
//        async: false,
//        params: {
//            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
//            V_V_DEPT: Ext.getCmp('bmmc').getValue(),
//            V_V_TYPE: Ext.getCmp('lx').getValue(),
//            V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
//            V_D_FROMDATE: Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d'),
//            V_D_TODATE: Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')
//        },
//        success: function (response) {
//            var data = Ext.decode(response.responseText);
//            if (data.V_INFO == 'SUCCESS') {
//                Ext.Msg.alert('提示信息', '删除成功');
//                Ext.getCmp('browseImage2').getEl().dom.src = Ext.BLANK_IMAGE_URL;
//                _preViewImage(records[0].data.V_GUID);
//            } else {
//                Ext.MessageBox.show({
//                    title: '错误',
//                    msg: '删除失败',
//                    buttons: Ext.MessageBox.OK,
//                    icon: Ext.MessageBox.ERROR
//                });
//            }
//        },
//        failure: function (response) {
//            Ext.MessageBox.show({
//                title: '错误',
//                msg: response.responseText,
//                buttons: Ext.MessageBox.OK,
//                icon: Ext.MessageBox.ERROR
//            });
//        }
//    });
    //    var tableName = ["日期", "班型", "班组", "录入人", "内容", "信息类型", "所属部门"];
    //    var tableKey = ['D_DATE', 'V_CLASS', 'V_CLASSTYPE', 'V_PERSONNAME', 'V_INFORMATION', 'V_TYPE', 'V_DEPT'];
    //    var parName = ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'];
    //    var parType = ['s', 's', 's', 's', 'da', 'da'];
    //    var parVal = [
    //        Ext.util.Cookies.get('v_personcode'),
    //        Ext.getCmp('bmmc').getValue(),
    //        Ext.getCmp('lx').getValue(),
    //        Ext.getCmp('bx').getValue(),
    //        Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d'),
    //        Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    //    ];
//    var proName = 'pro_pp_information_list';
//    var cursorName = 'v_cursor';
//    var returnStr = ['null'];
//    var returnStrName = ['null'];
//    var returnStrType = ['null'];
//    submitData("ModelExcelTotal", tableName, tableKey, parName, parType, parVal, proName, returnStr, returnStrType, returnStrName, cursorName, "title", "信息查询");
}

Ext.onReady(onPageLoaded);