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

    Ext.data.StoreManager.lookup('cxStore').on('load', function () {
        Ext.data.StoreManager.lookup('cxStore').insert(0, {
            V_CXNAME: '--全部--',
            V_CXCODE: '%'
        });
        Ext.getCmp('cx').select(Ext.data.StoreManager.lookup('cxStore').getAt(0));
    })

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

//查询按钮
function OnButtonQuery(){
    Ext.getCmp('rpanel').body.update('<div id=\'ganttDiv\'><table id=\'ganttTable\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'><tr id=\'trBigDate\' class=\'trBigDate\'></tr><tr id=\'trDate\' class=\'trDate\'></tr></table></div>');
    Ext.Ajax.request({
        url : AppUrl + 'hp/PRO_YEAR_PLAN_SEL_GANTT',
        async : false,
        params : {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_CXCODE: Ext.getCmp('cx').getValue()
        },
        callback : function(options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                let resDateList = data.list;
                CreateGanttTime(resDateList);
                CreateGanttData(resDateList);

            } else {
                Ext.MessageBox.alert('错误', '服务器错误', Ext.MessageBox.ERROR);
            }
        }
    });
}

//创建甘特图时间
function CreateGanttTime(resDateList){
    let tableStartDate = null;
    let tableEndDate = null;
    for (let i = 0; i < resDateList.length; i++) {
        if (i == 0) {
            tableStartDate = new Date(resDateList[i].startDate);
            tableEndDate = new Date(resDateList[i].endDate);
        }
        else {
            if (tableStartDate.getTime() > (new Date(resDateList[i].startDate)).getTime()) {
                tableStartDate = new Date(resDateList[i].startDate);
            }
            if (tableEndDate.getTime() < (new Date(resDateList[i].endDate)).getTime()) {
                tableEndDate = new Date(resDateList[i].endDate);
            }
        }
    }
    console.log(tableStartDate);
    console.log(tableEndDate);

    let startDate = tableStartDate;
    let endDate = tableEndDate;

    //给全局赋值
    let temp = new Date(startDate);
    temp.setDate(1);
    this.tableStartDate = temp;
    //----赋值结束
    let dayArr = [];
    let intervalMonth = endDate.getFullYear() * 12 + endDate.getMonth() - (startDate.getFullYear() * 12 + startDate.getMonth());
    let tempDate = new Date();
    let forEachDate = startDate;
    let daySum = 0;
    for (let i = 0; i < intervalMonth + 1; i++) {
        tempDate.setMonth(forEachDate.getMonth() + 1);
        tempDate.setDate(0);
        let monthDay = tempDate.getDate();
        dayArr.push({
            year: forEachDate.getFullYear(),
            month: (forEachDate.getMonth() + 1) > 9 ? (forEachDate.getMonth() + 1) : '0' + (forEachDate.getMonth() + 1),
            monthDay: monthDay
        });
        forEachDate = new Date(forEachDate.getFullYear(), forEachDate.getMonth() + 1, 1);
        daySum += monthDay
    }
    for (let i = 0; i < dayArr.length; i++) {
        $('#trBigDate').append('<th colspan="' + dayArr[i].monthDay + '">' + dayArr[i].year + '-' + dayArr[i].month + '</th>');
        for (let j = 0; j < dayArr[i].monthDay; j++) {
            $('#trDate').append('<td>' + (j + 1) + '</td>');
        }
    }
    this.tableTdSum = daySum;
}

//创建甘特图数据
function CreateGanttData(resDateList) {

    let tempHtmlContent = ''; //临时存储html 内容用的, 直接用append 方法 会造成tr闭标签 提前生成
    for (let i = 0; i < resDateList.length; i++) {
        let tempList = resDateList[i].list;
        tempHtmlContent = '<tr class="trContent">';
        for (let j = 0; j < tempList.length; j++) {
            //开始距离table左边框格数
            let leftNoStartDay = parseInt((new Date(tempList[j].V_JHTJSJ).getTime() - this.tableStartDate.getTime()) / (1000 * 60 * 60 * 24));
            //结束距离开始格数
            let intervalDate = parseInt((new Date(tempList[j].V_JHJGSJ).getTime() - (new Date(tempList[j].V_JHTJSJ)).getTime()) / (1000 * 60 * 60 * 24)) + 1;
            let tempIndex = null;
            if(j == 0){
                tempIndex = 0;
            }else{
                tempIndex = parseInt((new Date(tempList[j -1].V_JHJGSJ).getTime() - this.tableStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            }
            for (let k = tempIndex; k < this.tableTdSum; k++) {
                if(k == 0) {
                    tempHtmlContent += '<td><div class = "trTitleDiv"><div class="trTitleInnerDiv">' + tempList[j].V_CXNAME +'</div></div></td>';
                }else if (k < leftNoStartDay) {
                    tempHtmlContent += '<td>&nbsp;</td>';
                } else if (k == leftNoStartDay) {
                    tempHtmlContent += '<td colspan="' + (intervalDate) + '"><div class="trContentDiv"><span class="tooltip tooltip-turnleft"><span class="tooltip-item">' + tempList[j].V_COUNT + '</span><span class="tooltip-content">' + tempList[j].V_COUNT + '</span></span></div></td>';
                }else if ((k >= (intervalDate + leftNoStartDay)) && j == tempList.length - 1) {
                    tempHtmlContent += '<td>&nbsp;</td>';
                }
            }

        }
        $(tempHtmlContent).appendTo('#ganttTable');
    }

}