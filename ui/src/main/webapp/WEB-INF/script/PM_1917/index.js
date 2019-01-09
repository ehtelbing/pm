var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;

var win = Ext.create('Ext.window.Window', {
    id: 'win',
    width: 400,
    height: 400,
    layout: 'vbox',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {
        margin: '20px 0 0 0px',
        labelAlign: 'right',
        width: 350
    },
    items: [{
        xtype: 'textfield',
        id: 'jxmodelcode',
        fieldLabel: '检修模型编码',
        labelWidth: 100
    }, {
        xtype: 'textfield',
        id: 'jxmodelname',
        fieldLabel: '检修模型名称',
        labelWidth: 100
    }, {
        xtype: 'textarea',
        id: 'remark',
        fieldLabel: '备注',
        labelWidth: 100,
        height: 200
    }],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            btn_save();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('window').hide();
        }
    }]
});

Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
            async: false
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });


    var eTypeStore = Ext.create('Ext.data.Store', {
        id: 'eTypeStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
                deptLoad = true;
                Ext.getCmp('equtype').select(store.first());
                _init();
            }
        }
    });

    var equNameStore = Ext.create('Ext.data.Store', {
        id: 'equNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('equname').select(store.first());
                _init();
            }
        }
    });

    var subequNameStore = Ext.create('Ext.data.Store', {
        id: 'subequNameStore',
        autoLoad: false,
        fields: ['sid', 'text'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                store.insert(0, {text: '全部', sid: '%'});
                Ext.getCmp('subequname').select(store.first());
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 50,
        fields: ['I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER'],
        proxy: {
            url: AppUrl + 'basic/PM_1917_JXMX_DATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeQuery
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        border: false,
        region: 'north',
        layout:'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [
                {
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '单位名称',
                editable: false,
                listeners: {
                    change: function (combo, records) {
                        _selectDept(records);
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                labelWidth: 80,
                fieldLabel: '作业区',
                editable: false,
                listeners: {
                    change: function (combo, records) {
                        Ext.data.StoreManager.lookup('eTypeStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODENEXT: Ext.getCmp('V_V_DEPTCODE').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equtype',
                store: eTypeStore,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '设备类型',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('equNameStore').load({
                            params: {
                                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                                v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                v_v_equtypecode: Ext.getCmp('equtype').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equname',
                store: equNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                labelWidth: 80,
                width:300,
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('subequNameStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                                V_V_EQUCODE: Ext.getCmp('equname').getValue()
                            }
                        });
                    }
                }
            }
       ,{
                xtype: 'combo',
                id: 'subequname',
                store: subequNameStore,
                queryMode: 'local',
                valueField: 'sid',
                displayField: 'text',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '子设备名称',
                labelAlign: 'right',
                editable: false
            }, {
                xtype: 'textfield',
                id: 'jxequipname',
                emptyText: '检修模型名称搜索',
                width: 158,
                margin:'5px 0px 5px 90px'
            }, {
                xtype:'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: function () {
                    query();
                }
            }, {
                xtype:'button',
                text: '添加',
                icon: imgpath + '/add.png',
                handler: function () {
                    btn_add();
                }
            }, {
                xtype:'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                handler: function () {
                    btn_edit()
                }
            }, {
                xtype:'button',
                text: '删除',
                icon: imgpath + '/delete.png',
                handler: function () {
                    btn_del();
                }
            }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        },  {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 260,
            renderer:atleft
        }, {
            text: '工序名称',
            align: 'center',
            width: 150,
            renderer: detail
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 260,
            renderer:atleft
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        items: [topPanel, gridPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [rightPanel]
    });

});

function _init() {
    if (orgLoad && equTypeLoad && deptLoad) {

        Ext.getBody().unmask();
    }
}

function _selectDept(V_V_DEPTCODE) {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.currentPage = 1;
    deptStore.load();
}

function btn_del() {
    var num=0;
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    for(var i=0;i<seldata.length;i++){
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'cjy/PM_1917_JXMX_DATA_DEL',
            params: {
                V_V_JXMX_CODE: seldata[i].data.V_MX_CODE,
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if(resp.V_INFO=='success'){
                    num++;
                }
            }
        });
    }
    if(seldata.length==num){
        alert("删除成功！");
        query();
    }else{
        alert((seldata-num)+"条删除失败");
    }

}

function beforeQuery(store) {
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('V_V_ORGCODE').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('V_V_DEPTCODE').getValue();
    store.proxy.extraParams.V_V_EQUTYPE = Ext.getCmp('equtype').getValue();
    store.proxy.extraParams.V_V_EQUCODE = Ext.getCmp('equname').getValue();
    store.proxy.extraParams.V_V_EQUCHILD_CODE = Ext.getCmp('subequname').getValue();
    store.proxy.extraParams.V_V_JXMX_NAME = Ext.getCmp('jxequipname').getValue();
    store.proxy.extraParams.V_V_PAGE =  Ext.getCmp('gpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('gpage').store.pageSize;
}
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_EQUTYPE: Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('equname').getValue(),
            V_V_EQUCHILD_CODE: Ext.getCmp('subequname').getValue(),
            V_V_JXMX_NAME: Ext.getCmp('jxequipname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
}

function btn_add() {
    Ext.getCmp('jxmodelcode').setReadOnly(false);
    Ext.getCmp('jxmodelcode').setValue('');
    Ext.getCmp('jxmodelname').setValue('');
    Ext.getCmp('remark').setValue('');
    Ext.getCmp('win').setTitle("检修模型添加");
    Ext.getCmp('win').show();
}

function btn_edit() {
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }//修改只能对一条数据进行修改
    Ext.getCmp('jxmodelcode').setValue(seldata[0].data.V_MX_CODE);
    Ext.getCmp('jxmodelcode').setReadOnly(true);
    Ext.getCmp('jxmodelname').setValue(seldata[0].data.V_MX_NAME);
    Ext.getCmp('remark').setValue(seldata[0].data.V_BZ);
    Ext.getCmp('win').setTitle("检修模型修改");
    Ext.getCmp('win').show();
}

function btn_save() {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'basic/PM_1917_JXMX_DATA_SET',
        params: {
            V_V_JXMX_CODE: Ext.getCmp('jxmodelcode').getValue(),
            V_V_JXMX_NAME: Ext.getCmp('jxmodelname').getValue(),
            V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('equname').getValue(),
            V_V_EQUCODE_CHILD: Ext.getCmp('subequname').getValue(),
            V_V_REPAIRMAJOR_CODE: '',
            V_V_BZ: Ext.getCmp('remark').getValue(),
            V_V_HOUR: '',
            V_V_IN_PER: Ext.util.Cookies.get('v_personname2'),
            V_V_IN_DATE: Ext.util.Format.date(new Date(), 'Y-m-d')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            query();
            Ext.getCmp('win').hide();
        }
    });
}

function detail(a, value, metaData) {//
    return '<a href="javascript:ondetail(\'' + metaData.data.V_GX_CODE + '\',\'' + metaData.data.V_EQUCODE + '\',\'' + metaData.data.V_EQUTYPE + '\')">详情</a>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}



function ondetail(a,b,c) {
    var deptcode=Ext.getCmp('V_V_DEPTCODE').getValue()=="%"?"all":Ext.getCmp('V_V_DEPTCODE').getValue()
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191701/index.html?V_MX_CODE=' + a+'&V_EQUCODE='+b+'&V_EQUTYPE='+c+'&V_ORGCODE='+Ext.getCmp('V_V_ORGCODE').getValue()+'&V_DEPTCODE='+deptcode, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}