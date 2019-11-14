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

var tableStartDate = '';
var tableTdSum = '';
//初始化时间参数

var win;

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
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        }]
    });

    var gpanel = Ext.create('Ext.panel.Panel', {
        id: 'rpanel',
        html: "<div id='ganttDiv'><table id='ganttTable' border='1' cellpadding='0' cellspacing='0'><tr id='trBigDate' class='trBigDate'></tr><tr id='trDate' class='trDate'></tr></table></div>"
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        defaults : {
            border : false
        },
        items : [ {
            region : 'north',
            items : [ panel ]
        }, {
            region : 'center',
            layout : 'fit',
            items : [ gpanel ]
        } ]
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

})

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_CXCODE = Ext.getCmp('cx').getValue();
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}

//查询按钮
function OnButtonQuery(){
    CreateGanttTime();
    CreateGanttData();
}

//创建甘特图时间
function CreateGanttTime(){
    var startDate = new Date('2019-02-04');
    var endDate = new Date('2019-04-22');

    //给全局赋值
    var temp = new Date(startDate);
    temp.setDate(1);
    tableStartDate = temp;
    //----赋值结束
    var dayArr = [];
    var intervalMonth = endDate.getFullYear() * 12 + endDate.getMonth() - (startDate.getFullYear() * 12 + startDate.getMonth());
    var tempDate = new Date();
    var forEachDate = startDate;
    var daySum = 0;
    for (var i = 0; i < intervalMonth + 1; i++) {
        tempDate.setMonth(forEachDate.getMonth() + 1);
        tempDate.setDate(0);
        var monthDay = tempDate.getDate();
        dayArr.push({
            year: forEachDate.getFullYear(),
            month: (forEachDate.getMonth() + 1) > 9 ? (forEachDate.getMonth() + 1) : '0' + (forEachDate.getMonth() + 1),
            monthDay: monthDay
        });
        forEachDate = new Date(forEachDate.getFullYear(), forEachDate.getMonth() + 1, 1);
        daySum += monthDay
    }
    for (var i = 0; i < dayArr.length; i++) {
        $('#trBigDate').append('<th colspan="' + dayArr[i].monthDay + '">' + dayArr[i].year + '-' + dayArr[i].month + '</th>');
        for (var j = 0; j < dayArr[i].monthDay; j++) {
            $('#trDate').append('<td>' + (j + 1) + '</td>');
        }
    }
    tableTdSum = daySum;
}

//创建甘特图数据
function CreateGanttData() {
    var dateList = [{
        startDate: new Date('2019-02-05'),
        endDate: new Date('2019-03-09'),
        name: '项目管理系统',
        children: [{
            startDate: new Date('2019-02-05'),
            endDate: new Date('2019-02-10'),
            name: '项目模块',
        }, {
            startDate: new Date('2019-02-12'),
            endDate: new Date('2019-02-18'),
            name: '日报模块',
        }, {
            startDate: new Date('2019-02-23'),
            endDate: new Date('2019-02-28'),
            name: '周报模块',
        }]
    }, {
        startDate: new Date('2019-02-08'),
        endDate: new Date('2019-03-3'),
        name: '东烧设备管理系统',
        children : []
    }, {
        startDate: new Date('2019-03-15'),
        endDate: new Date('2019-03-29'),
        name: '鞍钢OA公文管理系统',
        children : []
    }, {
        startDate: new Date('2019-03-18'),
        endDate: new Date('2019-04-3'),
        name: '维修计划管理平台',
        children : []
    }, {
        startDate: new Date('2019-02-05'),
        endDate: new Date('2019-02-23'),
        name: '大连尚亨科技投票系统平台',
        children : []
    }, {
        startDate: new Date('2019-03-05'),
        endDate: new Date('2019-03-23'),
        name: '大球技术中心',
        children : []
    }];
    var tempHtmlContent = ''; //临时存储html 内容用的, 直接用append 方法 会造成tr闭标签 提前生成
    for (var j = 0; j < dateList.length; j++) {
        var leftNoStartDay = parseInt((dateList[j].startDate.getTime() - this.tableStartDate.getTime()) / (1000 * 60 * 60 * 24));
        var intervalDate = parseInt((dateList[j].endDate.getTime() - dateList[j].startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        tempHtmlContent = '<tr class="trContent">';
        for (var i = 0; i < this.tableTdSum; i++) {
            if (i < leftNoStartDay) {
                tempHtmlContent += '<td>&nbsp;</td>';
            } else if (i == leftNoStartDay) {
                tempHtmlContent += '<td colspan="' + (intervalDate) + '"><div class="trContentDiv"><span class="tooltip tooltip-turnleft"><span class="tooltip-item">' + dateList[j].name + '</span><span class="tooltip-content">' + dateList[j].name + '</span></span></div></td>';
            } else if (i >= (intervalDate + leftNoStartDay)) {
                tempHtmlContent += '<td>&nbsp;</td>';
            }
        }
        tempHtmlContent += '</tr>';
        //遍历第二层甘特图(临时遍历,暂不做成递归遍历)
        if(dateList[j].children.length > 0){
            for(var c = 0; c < dateList[j].children.length; c++){
                leftNoStartDay = parseInt((dateList[j].children[c].startDate.getTime() - this.tableStartDate.getTime()) / (1000 * 60 * 60 * 24));
                intervalDate = parseInt((dateList[j].children[c].endDate.getTime() - dateList[j].children[c].startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                tempHtmlContent += '<tr class="trContent">';
                for(var i = 0; i < this.tableTdSum; i++){
                    if (i < leftNoStartDay) {
                        tempHtmlContent += '<td>&nbsp;</td>';
                    } else if (i == leftNoStartDay) {
                        tempHtmlContent += '<td colspan="' + (intervalDate) + '"><div class="trContentDivChild"><span class="tooltip tooltip-turnleft"><span class="tooltip-item">' + dateList[j].children[c].name + '</span><span class="tooltip-content">' + dateList[j].children[c].name + '</span></span></div></td>';
                    } else if (i >= (intervalDate + leftNoStartDay)) {
                        tempHtmlContent += '<td>&nbsp;</td>';
                    }
                }
                tempHtmlContent += '</tr>';
            }
        }
        $(tempHtmlContent).appendTo('#ganttTable');
    }

}