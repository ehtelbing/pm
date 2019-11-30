if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_MODEL = Ext.urlDecode(location.href.split('?')[1]).V_MODEL;
}
Ext.onReady(function () {
   var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_GUID', 'V_MODEL_NAME', 'V_ORGCODE', 'V_ORGNAME','V_DEPTCODE',
            'V_DEPTNAME','V_PROGRAM','V_MODE', 'V_WORK_TYPE','V_PERSON_NUM',
            'V_EQUIP','V_TOOLS', 'V_MATERIAL','V_PLAN', 'V_EQUNAME', 'V_PREVENT',
            'V_MODEL_GUID', 'V_STYLE','V_CREATE','V_ORGANIZATIONAL','V_CREATDATE'],
        proxy: {
            url: AppUrl + 'cxy/PM_FAULT_BUG_MODE_SEL',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px'
        },
        items : [ {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _seltctFault
        },{
            xtype: 'button',
            text: '确认',
            // width: 90,
            icon: imgpath + '/saved.png',
            handler: _useModel
        }
        ]
    });


    var faultItemPanel = Ext.create('Ext.grid.Panel', {
        id: 'faultItemPanel',
        store: faultItemStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel'
            // mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 60,
            align: 'center'
        }, {
            text: '组织机构',
            dataIndex: 'V_ORGANIZATIONAL',
            align: 'center',
            width: 100
        },{
            text: '联络程序及方式',
            dataIndex: 'V_PROGRAM',
            align: 'center',
            width: 200
        },{
            text: '工种及人数',
            dataIndex: 'V_WORK_TYPE',
            align: 'center',
            width: 200
        },{
            text: '设备及检修机具',
            dataIndex: 'V_TOOLS',
            align: 'center',
            width: 300
        },{
            text: '材料和备件',
            dataIndex: 'V_MATERIAL',
            align: 'center',
            width: 300
        }, {
             text: '抢修方案',
             dataIndex: 'V_PLAN',
             align: 'center',
             width: 200
         }, {
             text: '抢修预防',
             dataIndex: 'V_PREVENT',
             align: 'center',
             width: 200
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
        items : [ {
            region : 'north',
            border : false,
            items : [buttonPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ faultItemPanel ]
        } ]
    });

    _seltctFault();

});

function _seltctFault() {
    var faultItemStore = Ext.data.StoreManager.lookup('faultItemStore');
    faultItemStore.proxy.extraParams = {
        'V_V_STYLE': V_MODEL
    };
    // faultItemStore.currentPage = 1;
    faultItemStore.load();
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

//生成模型
function _useModel() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if (records.length > 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '只能选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    window.opener._setModelValue(records[0].data.V_ORGANIZATIONAL,records[0].data.V_PROGRAM,records[0].data.V_WORK_TYPE,
        records[0].data.V_TOOLS,records[0].data.V_MATERIAL,
        records[0].data.V_PLAN,records[0].data.V_PREVENT);
    window.close();
}