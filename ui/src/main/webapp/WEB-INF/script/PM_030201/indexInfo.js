var Guid = "";

var cmItems = [];
var ganttdata = [];
var vStart = '';
var vEnd = '';
var stime = '';
var etime = '';

//初始化时间参数
var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));

if (Ext.urlDecode(location.href.split('?')[1]) != null) {
    Guid = Ext.urlDecode(location.href.split('?')[1]).V_GUID == null ? "" : Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function () {
    Ext.QuickTips.init();

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['V_YEARGUID', 'V_CXCODE', 'V_CXNAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUFLAG', 'V_COUNT',
            'V_JHTJSJ', 'V_JHJGSJ', 'V_JHGQ', 'V_GUID', 'V_ZYMC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_YEAR_PLAN_C_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var npanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'vbox',
        frame: true,
        width: '100%',
        items: [
            {
                xtype: 'textfield',
                id: 'njhName',
                fieldLabel: '年计划名称',
                style: ' margin: 5px 0px 0px 5px',
                width: 600,
                readOnly: true
            },
            {
                xtype: 'textareafield',
                id: 'njhnr',
                fieldLabel: '年计划内容',
                style: ' margin: 5px 0px 10px 5px',
                width: 600,
                readOnly: true,
                height: 60
            }]
    });

    var cgrid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        height: 400,
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '产线', width: 160, dataIndex: 'V_CXNAME', align: 'center', renderer: atleft},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
            {text: '专业', width: 100, dataIndex: 'V_ZYMC', align: 'center', renderer: atleft},
            {text: '检修内容', width: 200, dataIndex: 'V_COUNT', align: 'center', renderer: atleft},
            {text: '计划开工时间', width: 140, dataIndex: 'V_JHTJSJ', align: 'center', renderer: atleft},
            {text: '计划竣工时间', width: 140, dataIndex: 'V_JHJGSJ', align: 'center', renderer: atleft},
            {text: '计划工期', width: 120, dataIndex: 'V_JHGQ', align: 'center', renderer: atleft}]
    })

    var rpanel = Ext.create('Ext.panel.Panel', {
        id: 'rpanel',
        region: 'east',
        layout: 'border',
        frame: true,
        width: '50%',
        height: '100%',
        items: []
    })

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [npanel, cgrid, rpanel]
    });

    OnPageLoad();
    QueryEquGrid();
});

function OnPageLoad() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_06/PRO_PLAN_YEAR_SEL_BYGUID',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: Guid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
                if (resp.list.length > 0) {
                    Ext.getCmp('njhName').setValue(resp.list[0].V_YEARNAME);
                    Ext.getCmp('njhnr').setValue(resp.list[0].V_COUNT);
                }
            }
        }
    });
}

function QueryEquGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_GUID: Guid
        }
    })

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
                V_V_GUID: Guid
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

function atleft(value, metaData) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
