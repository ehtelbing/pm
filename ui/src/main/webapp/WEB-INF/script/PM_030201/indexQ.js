var dt = new Date();
var thisYear = dt.getFullYear();
var thisMonth = dt.getMonth() + 1;
var thisDate = dt.getDate();
var years = [];
var processKey = "";
var V_STEPNAME = "";
var V_NEXT_SETP = "";
var yearguid = '';

var cmItems = [];
var ganttdata = [];
var vStart = '';
var vEnd = '';
var stime = '';
var etime = '';
//初始化时间参数
var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));

//年份
for (var i = 2018; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    /* Ext.getBody().mask('<p>页面加载中...</p>');*/

    //厂矿计划数据加载
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
    });

    var cxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'cxStore',
        fields: ['V_ORGCODE', 'V_DEPTCODE', 'V_CXCODE', 'V_CXNAME', 'V_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PLAN_YEAR_CX_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
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
    });

    var ztStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ztStore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['V_GUID', 'V_YEARID', 'V_YEAR', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_CXCODE', 'V_CXNAME',
            'V_ZY', 'V_STATE', 'V_DEL', 'V_INPER', 'V_INPERNAME', 'V_INDATE',
            'V_JHTJSJ', 'V_JHJGSJ', 'V_JHGQ', 'V_COUNT', 'V_EQUCODE', 'V_EQUNAME', 'V_BASENAME', 'V_ZYMC','V_YEARNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_YEAR_PLAN_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear() + 1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80
        }, {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80
        }, {
            xtype: 'combo',
            id: "cx",
            store: cxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '产线名称',
            displayField: 'V_CXNAME',
            valueField: 'V_CXCODE',
            labelWidth: 80
        }, {
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '专业',
            displayField: 'V_ZYMC',
            valueField: 'V_GUID',
            labelWidth: 80
        }, {
            xtype: 'combo',
            id: "zt",
            store: ztStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '状态',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            labelWidth: 80
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        }, {
            xtype: 'button',
            text: '编辑',
            icon: imgpath + '/edit.png',
            listeners: {click: OnButtonEdit}
        }, {
            xtype: 'button',
            text: '导出',
            icon: imgpath + '/accordion_collapse.png',
            listeners: {click: OnButtonOut}
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            /*{text: '年计划编号', width: 100, dataIndex: 'V_YEARID', align: 'center', renderer: atleft},*/
            {text: '产线', width: 160, dataIndex: 'V_CXNAME', align: 'center', renderer: atleft},
            {text: '年计划名称', width: 140, dataIndex: 'V_YEARNAME', align: 'center', renderer: atleft},
            {text: '检修内容', width: 200, dataIndex: 'V_COUNT', align: 'center', renderer: atleft},
            {text: '计划开工时间', width: 140, dataIndex: 'V_JHTJSJ', align: 'center', renderer: atleft},
            //  {text: '计划竣工时间', width: 140, dataIndex: 'V_JHJGSJ', align: 'center', renderer: atleft},
            {text: '计划工期', width: 120, dataIndex: 'V_JHGQ', align: 'center', renderer: atleft},
            {text: '专业', width: 100, dataIndex: 'V_ZYMC', align: 'center', renderer: atleft},
            {text: '状态', width: 100, dataIndex: 'V_BASENAME', align: 'center', renderer: lookFlow}],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }], listeners: {
            itemClick: OnGridClick}
    });

    var gpanel = Ext.create('Ext.panel.Panel', {
        id: 'rpanel',
        region: 'south',
        layout: 'border',
        width: '100%',
        height: '30%',
         items: []

    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid, gpanel]
    });

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

    Ext.data.StoreManager.lookup("zyqStore").on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('cxStore').load({
            params: {
                'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('zyq').getValue(),
                'V_V_CXNAME': '%'
            }
        });
    });

    Ext.data.StoreManager.lookup('cxStore').on('load', function () {
        Ext.data.StoreManager.lookup('cxStore').insert(0, {
            V_CXNAME: '--全部--',
            V_CXCODE: '%'
        });
        Ext.getCmp('cx').select(Ext.data.StoreManager.lookup('cxStore').getAt(0));
        Ext.data.StoreManager.lookup('zyStore').load();
    })

    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.data.StoreManager.lookup('zyStore').insert(0, {
            V_ZYMC: '--全部--',
            V_GUID: '%'
        });
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        Ext.data.StoreManager.lookup('ztStore').load({
            params: {
                IS_V_BASETYPE: 'YEARPLAN/STATE'
            }
        });
    });

    Ext.data.StoreManager.lookup('ztStore').on('load', function () {
        Ext.data.StoreManager.lookup('ztStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('zt').select(Ext.data.StoreManager.lookup('ztStore').getAt(0));
        OnButtonQuery();
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

    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('cxStore').load({
            params: {
                'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('zyq').getValue(),
                'V_V_CXNAME': '%'
            }
        });
    });

    Ext.getCmp('cx').on('select', function () {
        OnButtonQuery();
    });

    Ext.getCmp('zy').on('select', function () {
        OnButtonQuery();
    });

    Ext.getCmp('zt').on('select', function () {
        OnButtonQuery();
    });

    Ext.data.StoreManager.lookup('gridStore').on('load', function () {
        yearguid = Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_GUID;
        OnShow();
    });

});

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_CXCODE = Ext.getCmp('cx').getValue();
    store.proxy.extraParams.V_V_ZYCODE = Ext.getCmp('zy').getValue();
    store.proxy.extraParams.V_V_ZTCODE = Ext.getCmp('zt').getValue();
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnButtonQuery() {
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_CXCODE: Ext.getCmp('cx').getValue(),
            V_V_ZYCODE: Ext.getCmp('zy').getValue(),
            V_V_ZTCODE: Ext.getCmp('zt').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function OnButtonEdit() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    } else {
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/PM_03020101/indexe.html?guid=' + seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}

function OnShow(){
    Ext.getCmp('rpanel').removeAll();
    pageFunction.QueryGanttData();
}

function OnGridClick(s, record) {
    yearguid = record.data.V_GUID;
    Ext.getCmp('rpanel').removeAll();
    pageFunction.QueryGanttData();
}

var pageFunction = {
    /**
     * 甘特图动态渲染
     */
    CreateGantt: function () {
        cmItems = [];
        var starttime = '';
        var endtime = '';
        for (var i = 0; i < ganttdata.length; i++) {
            if (i == 0) {
                starttime = new Date(ganttdata[0].V_JHTJSJ.split(".0")[0].replace(/-/g, "/"));
                endtime = new Date(ganttdata[0].V_JHJGSJ.split(".0")[0].replace(/-/g, "/"));
            } else {
                if (new Date(ganttdata[i].V_JHTJSJ.split(".0")[0].replace(/-/g, "/")) < starttime) {
                    starttime = new Date(ganttdata[i].V_JHTJSJ.split(".0")[0].replace(/-/g, "/"));
                }
                if (new Date(ganttdata[i].V_JHJGSJ.split(".0")[0].replace(/-/g, "/")) > endtime) {
                    endtime = new Date(ganttdata[i].V_JHJGSJ.split(".0")[0].replace(/-/g, "/"));
                }
            }
        }
        vStart = starttime;
        vEnd = endtime;
        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;
        while (vTmpDate <= vEnd) {
            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) {
                vzm = 'color:#CCCCCC';
            }
            if (vTmpMonth == vmonth) {
                dateItems.push({
                    text: vTmpDate.getDate().toString(),
                    style: vzm,
                    width: 40
                });
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) {
                    vyear -= 1;
                }
                cmItems.push({
                    text: vyear.toString() + '年' + (vmonth + 1).toString() + '月',
                    columns: dateItems
                });
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({
                    text: vTmpDate.getDate().toString(),
                    style: vzm,
                    width: 40
                });
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
            fields: ['V_YEARGUID', 'V_CXCODE', 'V_CXNAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUFLAG', 'V_COUNT',
                'V_JHTJSJ', 'V_JHJGSJ', 'V_JHGQ', 'V_GUID', 'V_ZYMC'],
            data: ganttdata,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
        var ganttgrid = Ext.create('Ext.grid.Panel', {
            id: 'ganttgrid',
            store: ganttStore,
            region: 'center',
            height: 400,
            columnLines: true,
            columns: cmItems
        });
        Ext.getCmp('rpanel').add(ganttgrid);
    },
    QueryGanttData: function () {
        ganttdata = [];
        Ext.Ajax.request({
            url: AppUrl + 'PM_06/PRO_YEAR_PLAN_C_SEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: yearguid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                ganttdata = resp.list;
                if (resp.list.length > 0) {
                    pageFunction.CreateGantt();
                }
            }
        });
    },
    /**构造显示结构*/
    IndexShow: function (value, metaData, record) {

        stime = record.data.V_JHTJSJ;
        etime = record.data.V_JHJGSJ;
        var startd = new Date(stime.split(".0")[0].replace(/-/g, "/"));
        var endd = new Date(etime.split(".0")[0].replace(/-/g, "/"));
        if (startd < vStart) {
            startd = new Date(vStart);
        }
        if (startd > vEnd) {
            startd = new Date(vEnd);
        }
        if (endd < vStart) {
            endd = new Date(vStart);
        }
        if (endd > vEnd) {
            endd = new Date(vEnd);
        }
        if (endd < startd) {
            endd = new Date(startd);
        }
        if (endd <= today) {
            var vleft = ((startd.getTime() - vStart.getTime()) / (86400 * 1000)) * 40;
            var vwidth = ((endd.getTime() - startd.getTime()) / (86400 * 1000)) * 40;
            if (Ext.Date.getLastDateOfMonth(startd).getDate() == startd.getDate()) {
                vwidth = vwidth + 40;
            }
            if (endd.getDate() == 1) {
                vwidth = vwidth + 40;
            }
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:27px;width:' + vwidth.toString() + 'px;background-color:A6FFA6;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_EQUNAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + stime.split('.0')[0] + '<br>' + '结束时间：' + etime.split('.0')[0] + '<br>';
            var cont = record.data.V_COUNT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
        if (today <= startd) {
            var vleft = ((startd.getTime() - vStart.getTime()) / (86400 * 1000)) * 40;
            var vwidth = ((endd.getTime() - startd.getTime()) / (86400 * 1000)) * 40 + 40;
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:27px;width:' + vwidth.toString() + 'px;background-color: #CC3333;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div  class="sch-event-inner">' + record.data.V_EQUNAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + stime.split('.0')[0] + '<br>' + '结束时间：' + etime.split('.0')[0] + '<br>';
            var cont = record.data.V_COUNT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
        if (startd < today && today < endd) {
            var nowtime2 = Ext.Date.format(new Date(), 'Y-m-d 00:00:00')
            var vleft = vleft = ((startd.getTime() - vStart.getTime()) / (86400 * 1000)) * 40;
            var vwidth1 = ((today.getTime() - startd.getTime()) / (86400 * 1000)) * 40;
            var vwidth2 = ((endd.getTime() - today.getTime()) / (86400 * 1000)) * 40 + 40;
            var vwidth = ((endd.getTime() - startd.getTime()) / (86400 * 1000)) * 40;
            if (Ext.Date.format(Ext.Date.getLastDateOfMonth(startd), 'Y-m-d') == Ext.Date.format(startd, 'Y-m-d')) {
                vwidth = vwidth + 40;
                vwidth1 = vwidth1 + 40;
            }
            if (endd.getDate() == 1) {
                vwidth = vwidth + 40;
                vwidth2 = vwidth2 + 40;
            }
            var bfb = Math.round(((vwidth1 / vwidth) * 100), 0);
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:27px;width:' + vwidth.toString() + 'px;" class = "sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:27px;margin:0px;background-color:#99CC66;" class = "sch-event">' + ' 完成度' + bfb + '%</div><div class="sch-event-inner" style="float:right;width:' + vwidth2.toString() + 'px;height:27px;border:0px;margin:0px;background-color: #CC3333;">' + record.data.V_EQUNAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + stime.split('.0')[0] + '<br>' + '结束时间：'
                + etime.split('.0')[0] + '<br>';
            var cont = record.data.V_COUNT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
    }
};

function a1(id) {
    var oson = document.getElementById(id);
    with (oson) {
        oson.style.display = "block";
        oson.style.left = (window.event.clientX - 450) + 'px';
        oson.style.top = (window.event.clientY - 138) + 'px';
        oson.style.background = 'white';
    }
}

function a2(id) {
    document.getElementById(id).style.display = 'none';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function timelfet(value, metaDate, record, rowIndex, colIndex, store) {
    metaDate.style = "text-align:right;";
    return '<div date-qtip="' + value + '" >' + value.toString().substring(0, 10) + '</div>';
}

function OnButtonOut() {
    var V_V_ORGCODE=Ext.getCmp('ck').getValue() == "%" ? "all" : Ext.getCmp('ck').getValue();
    var V_V_DEPTCODE=Ext.getCmp('zyq').getValue() == "%" ? "all" : Ext.getCmp('zyq').getValue();
    var V_V_CX=Ext.getCmp('cx').getValue() == "%" ? "all" : Ext.getCmp('cx').getValue();
    var V_V_ZY=Ext.getCmp('zy').getValue() == "%" ? "all" : Ext.getCmp('zy').getValue();
    var V_V_STATECODE=Ext.getCmp('zt').getValue() == "%" ? "all" : Ext.getCmp('zt').getValue();
    document.location.href = AppUrl + 'excel/YearPlan_Excel?V_V_YEAR='+ Ext.getCmp('year').getValue() + '&V_V_ORGCODE=' + V_V_ORGCODE + '&V_V_DEPTCODE=' +V_V_DEPTCODE + '&V_V_CX=' +V_V_CX + '&V_V_ZY=' + V_V_ZY + '&V_V_STATECODE=' + V_V_STATECODE;
}

function lookFlow(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + value + '</a>';
}

function _preViewProcess(businessKey) {
    var ProcessInstanceId = '';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            businessKey: businessKey
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.msg == 'Ok') {
                ProcessInstanceId = data.InstanceId;
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

    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}