var ckStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE','V_DEPTNAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT :  Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTTYPE: '[基层单位]'
        }
    }
});
var zyqStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE','V_DEPTNAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var lxStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'lxStore',
    fields: ['V_EQUTYPECODE','V_EQUTYPENAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var sbmcStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sbmcStore',
    fields: [ 'V_EQUCODE','V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_PM_07_GET_DEPTEQU_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUSITENAME','V_EQUSITE','V_EQUNAME','V_EQUCODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_GET_DEPTEQU_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var Layout = {
    layout : 'border',
    items : [
        {
            xtype : 'panel',border : false, region : 'north', title:'缺陷录入',layout : 'column', frame: true, defaults: { style: { margin: '5px 0px 5px 5px'}, labelAlign: 'right'},
            items: [
                { xtype: 'combo', fieldLabel: '厂矿', labelWidth: 60, id: 'ck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local' },
                { xtype: 'combo', fieldLabel: '作业区', labelWidth: 60, id: 'zyq', store: 'zyqStore', editable: false, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local' },
                {xtype: 'combo', fieldLabel: '设备类型', labelWidth: 60, id: 'lx', store: 'lxStore', editable: false, displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE', queryMode: 'local' },
                //{xtype: 'combo', fieldLabel: '设备名称', labelWidt h: 60, id: 'sbmc', store: 'sbmcStore', editable: false, displayField: 'V_EQUNAME', valueField: 'V_EQUCODE', queryMode: 'local' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png'}
            ]
        },
        { xtype: 'gridpanel', region: 'center', plugins: [{ptype: 'cellediting', clicksToEdit: 1}], columnLines: true, id: 'grid', store: 'gridStore',
            features: [{ ftype: 'summary' }],
            columns: [
                { xtype: 'rownumberer', text: '序号', width: 35, align: 'center'
                },
                { text: '设备名称', align: 'center', width: 450, dataIndex: 'V_EQUNAME', renderer: renderFont,
                    summaryType: 'count',summaryRenderer: function (value,metadata){metadata.style = 'font-weight: bold;';return '数量  : ' + value + '条'}
                },
                { xtype: 'actioncolumn', width: 70, text: '生成缺陷', align: 'center', items: [{ icon: imgpath + '/grid.png', handler: ModifyARecord}]}
            ]
        }
    ]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);

    Ext.data.StoreManager.lookup('ckStore').on('load', function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));

        Ext.data.StoreManager.lookup('lxStore').load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE : Ext.getCmp("zyq").getValue(),
                V_V_DEPTCODENEXT : Ext.util.Cookies.get('v_deptcode'),
                // V_V_DEPTCODENEXT : Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("lx").getValue()
            }
        });
    });



    Ext.data.StoreManager.lookup('lxStore').on('load', function(){
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
        queryGrid();
    });




    /*Ext.data.StoreManager.lookup('sbmcStore').on('load', function(){
        Ext.getCmp('sbmc').select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));

    });*/


    Ext.getCmp('ck').on('change', function(){
        Ext.data.StoreManager.lookup('zyqStore').removeAll();
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE : Ext.getCmp("ck").getValue(),
                V_V_DEPTCODENEXT : Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE :  '[主体作业区]'
            }
        });
    });

    Ext.getCmp('zyq').on('change', function(){
        Ext.data.StoreManager.lookup('lxStore').removeAll();
        Ext.data.StoreManager.lookup('lxStore').load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp('zyq').getValue()
            }
        });
    });

   /* Ext.getCmp('lx').on('change', function(){
        Ext.data.StoreManager.lookup('sbmcStore').removeAll();
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE : Ext.getCmp('lx').getValue()
                //V_V_EQUTYPECODE : Ext.getCmp("sbmc").getValue(),
            }
        });
    });*/


    //setTimeout('queryGrid()', 1000 * 1);
}

function ModifyARecord(grid, rowIndex, colIndex){
    var equcode = grid.getStore().getAt(rowIndex).data.V_EQUCODE;
    var equname = grid.getStore().getAt(rowIndex).data.V_EQUNAME;
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070501/index.html?deptcode=" + Ext.getCmp('zyq').getValue() + '&equtypecode=' + Ext.getCmp('lx').getValue() + '&equtypename=' + Ext.getCmp('lx').rawValue +  '&equcode=' + equcode + '&equname=' + equname+
    '&orgname='+Ext.getCmp('ck').getRawValue() + '&deptname='+Ext.getCmp('zyq').getRawValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    //if(asd != undefined){
    //    window.top.append('1233211234567', '创建工单', AppUrl + "/No410701/Index_aq.html?V_GUID="+ asd);
    //}
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
            V_V_EQUTYPECODE : Ext.getCmp("lx").getValue()
        }
    });
}


function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
