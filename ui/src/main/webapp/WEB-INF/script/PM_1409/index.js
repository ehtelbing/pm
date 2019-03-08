var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var indate="";
var endate="";


var cmItems = [];
var ganttdata = [];

var vStart = '';
var vEnd = '';

var stime='';
var etime='';
//厂矿
var orgStore = Ext.create('Ext.data.Store', {
    id: 'orgStore',
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
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('V_V_ORGCODE').select(store.first());
        }
    }
});
//部门
var deptStore = Ext.create('Ext.data.Store', {
    id: 'deptStore',
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
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('V_V_DEPTCODE').select(store.first());
        }
    }
});
//设备类型
var eTypeStore = Ext.create('Ext.data.Store', {
    id: 'eTypeStore',
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
    },
    listeners: {
        load: function (store, records) {
            Ext.getCmp('V_V_EQUTYPE').select(store.first());
        }
    }
});
// 设备名称
var equNameStore = Ext.create('Ext.data.Store', {
    id: 'equNameStore',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
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
            Ext.getCmp('V_EQUNAME').select(store.first());
        }
    }
});

//故障类型
var equFaultStore = Ext.create('Ext.data.Store', {
    id: 'equFaultStore',
    autoLoad: true,
    fields: ['V_TYPECODE', 'V_TYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
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
            store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
            Ext.getCmp('equFaultname').select(store.first());
        }
    }
});

Ext.onReady(function(){

    var ganttPanel=Ext.create('Ext.panel.Panel',{
        id:'ganttPanel',
        region:'center',
        layout:'border',
        frame:true,
        border:false,
        items: []
    });
    var norpanel=Ext.create('Ext.panel.Panel',{
        id:'norpanel',
        region:'north',
        border:false,
        frame:true,
        layout:'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items:[{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            store: orgStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectDept();
                }
            }
        },{
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selecteType();
                }
            }
        },{
            xtype: 'combo',
            id: 'V_V_EQUTYPE',
            store: eTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            forceSelection: true,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectequName();
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_EQUNAME',
            store: equNameStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            forceSelection: true,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            width: 250
        },{
            xtype: 'combo',
            id: 'equFaultname',
            store: equFaultStore,
            queryMode: 'local',
            valueField: 'V_TYPECODE',
            displayField: 'V_TYPENAME',
            forceSelection: true,
            fieldLabel: '故障类型',
            editable: false,
            labelWidth: 70,
            width: 250
        },{
            id: 'begintime',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            fieldLabel: '发现日期',
            labelWidth: 70,
            width: 250,
            baseCls: 'margin-bottom'
        }, {
            id: 'endtime',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value: new Date(),
            fieldLabel: '至',
            labelWidth: 70,
            width: 250,
            baseCls: 'margin-bottom'
        },{
            xtype:'button',
            id:'selBtn',
            text:'查看',
            handler:function(){
                // Ext.getCmp('ganttPanel').removeAll();
                pageFunction.QueryGanttData();
            }
        }]
    });

    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[norpanel,ganttPanel]
    });
    Ext.QuickTips.init();
    _selectDept();
    _selecteType();
    _selectequName();

    pageFunction.QueryGanttData();
});
function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore.currentPage = 1;
    deptStore.load();
}
function _selecteType() {
    var eTypeStore = Ext.data.StoreManager.lookup('eTypeStore');
    eTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()
    };
    eTypeStore.load();
}
function _selectequName() {
    var equNameStore = Ext.data.StoreManager.lookup('equNameStore');
    equNameStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE').getValue()
    };
    equNameStore.load();
}
var pageFunction = {
// 施工图
    CreateGantt:function () {
        cmItems = [];
        indate=Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y/m/d h:i:s');
        endate=Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y/m/d h:i:s');
        vStart = new Date(indate);
        vEnd = new Date(endate);

        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate <= vEnd) {

            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) vzm = 'color:#CCCCCC';

            if (vTmpMonth == vmonth) {

                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) vyear -= 1;
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            }
            vTmpDate = new Date((vTmpDate / 1000 + 86400) * 1000);
        }
        if (vTmpMonth == vmonth) {
            cmItems.push({
                text: vTmpDate.getFullYear().toString() + '年' + (vmonth + 1).toString() + '月',
                columns: dateItems
            });
        }


        cmItems.push({
            text: '',
            width: 0,
            dataIndex: 'MYCOLOR',
            renderer: pageFunction.IndexShow
        });

        var ganttStore = Ext.create("Ext.data.Store", {
            storeId: 'ganttStore',
            fields : [ 'V_GUID', 'V_FAULT_NAME', 'V_EQUCODE', 'V_EQUNAME',
                'V_FAULT_SS', 'V_FINDTIME', 'V_ENDTIME','MYCOLOR'],
            data: ganttdata,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
        cmItems.push({
            text: '事故名称',
            width: 0,
            dataIndex: 'V_FAULT_NAME'
            ,renderer: pageFunction.testShow
        });
        var ganttgrid = Ext.create('Ext.grid.Panel', {
            id: 'ganttgrid',
            store: ganttStore,
            region: 'center',
            height: 400,
            columnLines: true,
            columns: cmItems
        });
        Ext.getCmp('ganttPanel').removeAll();
        Ext.getCmp('ganttPanel').add(ganttgrid);
    },
    QueryGanttData:function (){

        ganttdata = [];
        // 施工图data
        Ext.Ajax.request({
            url : AppUrl + 'dxfile/PM_14_FAULT_ITEM_DATA_STAT',
            method:'POST',
            async:false,
            params:{
                V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                V_V_EQUTYPE: Ext.getCmp('V_V_EQUTYPE').getValue(),
                V_V_EQUCODE: Ext.getCmp('V_EQUNAME').getValue(),
                V_V_EQUCHILD_CODE: '',
                V_V_FAULT_TYPE: Ext.getCmp('equFaultname').getValue(),
                V_V_FAULT_YY: '',
                V_STAR_DATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d'),
                V_END_DATE: Ext.Date.format(Ext.getCmp('endtime').getValue(),'Y-m-d')
            },
            success:function(resp){
                var resp=Ext.decode(resp.responseText);
                ganttdata = resp.list;
                if (ganttdata.length > 0) {
                    pageFunction.CreateGantt();
                }
            }
        });

    },

    IndexShow:function (value, metaData, record) {
        if (record != undefined) {

            if (record.data.V_FINDTIME!= null && record.data.V_ENDTIME!= null) {
                stime = record.data.V_FINDTIME+" 00:00:01";
                etime = record.data.V_ENDTIME+" 23:59:59";

                var startd = new Date(stime.split(".0")[0].replace(/-/g, "/"));
                var endd = new Date(etime.split(".0")[0].replace(/-/g, "/"));
                vStart = Ext.Date.format(new Date(indate), 'Y/m/d h:i:s');
                vEnd = Ext.Date.format(new Date(endate), 'Y/m/d h:i:s');
                if (startd>=new Date(vStart) && endd<=new Date(vEnd)) {
                    var vleft = ((startd.getTime() - new Date(vStart).getTime()) / (86400 * 1000)) ;
                    var vwidth = ((endd.getTime() - startd.getTime()) / (86400 * 1000)) ;
                    var gtt = '<div style="left:' + (vleft * 40).toString() + 'px;height:23.5px;width:' + (vwidth * 40+40).toString() + 'px;background-color:A6FFA6;" class="sch-event"  ><div class="sch-event-inner" ><div data-qtip="' + record.data.V_FAULT_NAME+'/'+record.data.V_EQUNAME+'/'+record.data.V_ENDTIME+record.data.V_FAULT_SS+ '" >' + record.data.V_EQUNAME + '</div></div></div><div class="lxm"  id="' + record.data.V_EQUCODE + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">';

                    var cont = record.data.V_EQUNAME;//设备名称
                    var cont2=record.data.V_ENDTIME;//停机时间
                    var cont3=record.data.V_FAULT_SS;  //设备损失
                    var contt = '内容：';
                    for (var i = 0; i < cont.length; i++) {
                        if (i == 0) {
                            contt = contt + cont[i] +cont2[i]+cont3[i]+ '<br>';
                        } else {
                            contt = contt + cont[i] +cont2[i]+cont3[i]+ '<br>';
                        }
                    }
                    gtt = gtt + contt + '</div>';


                    return gtt;
                }
            }
        }

    },
    testShow:function (value, metaData, record) {
        if (record != undefined) {
            metaData.style = "text-align:left";
            return '<div >' + record.data.V_FAULT_NAME + '</div>';
        }
    }
}