/**
 * Created by zjh on 2017/12/13.
 */

var guid = '';
var V_PROJECT_NAME = '';
var V_PROJECT_CODE = '';

var cmItems = [];
var ganttdata = [];

var vStart = '';
var vEnd = '';
var zigener="";

var insertData = [{
    'V_BUILD_DEPT': '', 'V_BULID_PERSON': '', 'V_CONTENT': '', 'V_DATE_B': '', 'V_DATE_E': '', 'V_GUID': '',
    'V_GUID_FXJH': '', 'V_PROJECT_CODE_FXJH': '', 'V_PROJECT_NAME': '', 'V_SPECIALTY': '', 'V_PLAN_MONEY': ''
}];

var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    guid = parameters.guid == undefined ? '' : parameters.guid;
    V_PROJECT_NAME = parameters.V_PROJECT_NAME == undefined ? '' : parameters.V_PROJECT_NAME;
    V_PROJECT_CODE = parameters.V_PROJECT_CODE == undefined ? '' : parameters.V_PROJECT_CODE;
}

Ext.onReady(function () {

    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields: ['V_BUILD_DEPT', 'V_BULID_PERSON', 'V_CONTENT', 'V_DATE_B', 'V_DATE_E', 'V_GUID',
            'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME', 'V_SPECIALTY', 'V_PLAN_MONEY','V_GUID_P'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json'
            },
            extraParams : {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            }
        }
    });

    var grid = Ext.create('Ext.tree.Panel', {
        id: 'grid',
        store: treeStore,
        region: 'west',
        width: '30%',
        height: '50%',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        rowLines: true,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                edit: OnChangePlanAmount
            }
        })],
        columns: [{xtype: 'rownumberer', width: 30, sortable: false},
            {
                xtype: 'treecolumn',
                text: '工程名称',
                dataIndex: 'V_PROJECT_NAME',
                width: 180,
                field: {xtype: 'textfield',},
                align: 'center'
            },
            {text: '工程开始时间', dataIndex: 'V_DATE_B', width: 160, align: 'center'},
            {text: '工程结束时间', dataIndex: 'V_DATE_E', width: 160, align: 'center'},
            {text: '工程总费用', dataIndex: 'V_PLAN_MONEY', width: 120, field: {xtype: 'numberfield'}, align: 'center'}]
    });

    var ganttpanel = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel',
        width: "70%",
        height: "50%",
        region: 'center',
        frame: true,
        layout: 'border',
        baseCls:'my-panel-noborder',
        items: []
    });

    //表格右键菜单
    var contextmenu = new Ext.menu.Menu({
        id: 'theContextMenu',
        frame: true,
        items: [{text: '查看详情'},
            {text: '上移工程项目', listeners: {click: OnBtnUp}},
            {text: '下移工程项目',listeners:{click:OnBtnDown}},
            {text: '删除工程项目',listeners:{click:OnBtnDel}}]
    });

    grid.on("itemcontextmenu", function (view, record, item, index, e) {
        e.preventDefault();
        contextmenu.showAt(e.getXY());
    });


    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [grid, ganttpanel]
    });
    QueryGanttData();

})

function OnBtnDel(){
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_PM_EQUREPAIRPLAN_TREE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_IP: GetIP().ip,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
            V_V_GUID: Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == 'success') {
                history.go(0);
            }
        }
    });

}

function OnBtnUp() {
    var griddata=Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
}

function OnBtnDown(){

}

function OnChangePlanAmount(editor, e, eOpts) {
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID_FXJH: guid,
            V_V_ROWNUMBER: -1,
            STATE: '主项'
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                zhugener = Math.floor(data.maxvalue)-(-1);
                ProjectInsert(e.record.raw.V_GUID,e.field,e.value);
            }
        }
    })
}

function ProjectInsert(uuid,fields,values){
    if (uuid==''){
        uuid='-1';
    }

    Ext.Ajax.request({
        url: AppUrl + 'gantt/PM_EQUREPAIRPLAN_TREE_INSERT',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_GUID: uuid,
            V_V_GUID_FXJH: guid,
            V_V_ROWNUMBER:zhugener,
            V_V_COLUMN:fields,
            V_V_VALUE: values
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=="Success"){
                QueryTreePanel()
            }
        }
    });
}

function QueryTreePanel(){

    /*Ext.getCmp('grid').store.load();
    QueryGanttData();*/
    history.go(0);
}

function EditDate(value, metaData, record) {
    if (value == null) {
        if (record.raw.V_DATE_B != null) {
            value = record.raw.V_DATE_B;
        }
    }

    return Ext.util.Format.format(value, 'Y-m-d');
}

function QueryGanttData() {
    ganttdata = [];
    Ext.Ajax.request({
        url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE_GANTT',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID_FXJH: guid,
            V_BY1: "",
            V_BY2: "",
            V_BY3: ""
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            ganttdata = resp.list;
            CreateGantt();
        }
    });
}

function CreateGantt() {
    cmItems = [];
    var starttime = '';
    var endtime = '';
    for (var i = 0; i < ganttdata.length; i++) {
        if (i == 0) {
            starttime = ganttdata[0].V_DATE_B;
            endtime = ganttdata[0].V_DATE_E;
        } else {
            if (ganttdata[i].V_DATE_B < starttime) {
                starttime = ganttdata[i].V_DATE_B;
            }
            if (ganttdata[i].V_DATE_E > endtime) {
                endtime = ganttdata[i].V_DATE_E;
            }
        }
    }
    vStart = new Date(starttime);
    vEnd = new Date(endtime);
    var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
    var dateItems = [];
    var vmonth = vTmpDate.getMonth();
    var vTmpMonth;

    while (vTmpDate < vEnd) {
        vTmpMonth = vTmpDate.getMonth();
        var vzm = '';
        if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) {

            vzm = 'color:#CCCCCC';
        }

        if (vTmpMonth == vmonth) {
            dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
        }
        else {
            var vyear = vTmpDate.getFullYear();
            if (vmonth == 11) {
                vyear -= 1;
            }
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
        width: 0, dataIndex: 'mycolor',
        renderer: IndexShow
    });

    var ganttStore = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore',
        fields: ['I_ID', 'V_ORGCODE', 'V_DEPTCODE', 'V_YEAR', 'V_MONTH', 'V_GUID',
            'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_PLAN_MONEY', 'V_CONTENT', 'V_DATE_DESIGN',
            'V_DATE_INVITE', 'V_DATE_B', 'V_DATE_E', 'V_BUDGET_MONEY', 'V_PROGRESS', 'V_BUILD_NAMAGER',
            'V_BULID_PERSON', 'V_DIRECT_PERSON', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUNAME',
            'V_SPECIALTY', 'V_BUILD_DEPT', 'V_GUID_P', 'V_PROJECT_CODE_P',
            'V_PROJECT_NAME_P', 'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME_FXJH',
            'D_DATE_INPUT', 'V_PERCODE_INPUT', 'V_PERNAME_INPUT'],
        data: ganttdata,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    ganttgrid = Ext.create('Ext.grid.Panel', {
        id: 'ganttgrid',
        store: ganttStore,
        region: 'center',
        columnLines: true,
        columns: cmItems,
        renderTo: Ext.getBody()
    });
    Ext.getCmp('ganttpanel').add(ganttgrid);
}

function IndexShow(value, metaData, record) {
    var startd = new Date(record.data.V_DATE_B);
    var endd = new Date(record.data.V_DATE_E);
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

        var dif = startd.getTime() - vStart.getTime();
        var vleft = (dif / (86400 * 1000)) * 40;
        dif = endd.getTime() - startd.getTime();
        var vwidth = (dif / (86400 * 1000)) * 40;
        var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:A6FFA6;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
            '结束时间：' + record.data.V_DATE_E + '<br>';
        var cont = record.data.V_CONTENT.split(',');
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

        var dif = startd.getTime() - vStart.getTime();
        var vleft = (dif / (86400 * 1000)) * 40;
        dif = endd.getTime() - startd.getTime();
        var vwidth = (dif / (86400 * 1000)) * 40;
        var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color: #CC3333;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div  class="sch-event-inner">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
            '结束时间：' + record.data.V_DATE_E + '<br>';
        var cont = record.data.V_CONTENT.split(',');
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
        var dif = startd.getTime() - vStart.getTime();
        var vleft = (dif / (86400 * 1000)) * 40;
        dif = today.getTime() - startd.getTime();
        var vwidth1 = (dif / (86400 * 1000)) * 40;
        dif = endd.getTime() - today.getTime();
        var vwidth2 = (dif / (86400 * 1000)) * 40;
        dif = endd.getTime() - startd.getTime();
        var vwidth = (dif / (86400 * 1000)) * 40;

        var bfb = Math.round(((vwidth1 / vwidth) * 100), 0);
        var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;" class = "sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:21px;margin:0px;background-color:#99CC66;" class = "sch-event">' + ' 完成度' + bfb + '%</div><div class="sch-event-inner" style="float:right;width:' + vwidth2.toString() + 'px;height:21px;border:0px;margin:0px;background-color: #CC3333;">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
            '结束时间：' + record.data.V_DATE_E + '<br>';
        var cont = record.data.V_CONTENT.split(',');
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