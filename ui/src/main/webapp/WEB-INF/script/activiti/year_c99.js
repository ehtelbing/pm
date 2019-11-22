var Guid = "";
var processKey = "";
var ProcessInstanceId = '';
var taskId = "";
var V_STEPCODE = '';

var cmItems = [];
var ganttdata = [];
var vStart = '';
var vEnd = '';
var stime = '';
var etime = '';

var V_V_PERSONCODE = '';
var V_PERSONNAME = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_SPECIALTY = '';

var V_STEPNAME="";
var V_NEXT_SETP="";

//初始化时间参数
var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));

if (Ext.urlDecode(location.href.split('?')[1]) != null) {
    Guid = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID == null ? "" : Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    processKey = Ext.urlDecode(location.href.split('?')[1]).ProcessDefinitionKey == null ? "" : Ext.urlDecode(location.href.split('?')[1]).ProcessDefinitionKey;
    ProcessInstanceId = Ext.urlDecode(location.href.split('?')[1]).ProcessInstanceId == null ? "" : Ext.urlDecode(location.href.split('?')[1]).ProcessInstanceId;
}

Ext.onReady(function () {
    Ext.QuickTips.init();

    var fzPerStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fzPerStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

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
        items: [{
            xtype: 'panel', frame: true, width: '100%', layout: 'column', baseCls: 'my-panel-no-border',
            items: [{
                id: 'spyj',
                xtype: 'textfield',
                fieldLabel: '审批意见',
                labelWidth: 90,
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right',
                width: 250
            }, {
                xtype: 'combo',
                id: 'nextPer',
                store: fzPerStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '下一步审批人',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                margin: '5 5 5 10',
                labelWidth: 100,
                labelAlign: 'right'
            }, {xtype: 'button', style: 'margin:5px 0px 5px 5px', text: '上报设备部', listeners: {click: OnBtnGo}},
                {xtype: 'button', style: 'margin:5px 0px 5px 5px', text: '流程结束', listeners: {click: OnBtnOver}},
                {xtype: 'button', style: 'margin:5px 0px 5px 5px', text: '驳回', listeners: {click: OnBtnBack}}]
        },
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

    Ext.data.StoreManager.lookup('fzPerStore').on('load', function () {
        Ext.getCmp('nextPer').select(Ext.data.StoreManager.lookup('fzPerStore').getAt(0));
        processKey = Ext.data.StoreManager.lookup('fzPerStore').getProxy().getReader().rawData.RET;
        V_STEPNAME = Ext.data.StoreManager.lookup('fzPerStore').getAt(0).data.V_V_FLOW_STEPNAME;
        V_NEXT_SETP = Ext.data.StoreManager.lookup('fzPerStore').getAt(0).data.V_V_NEXT_SETP;
    })

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
                    V_V_PERSONCODE = resp.list[0].V_INPER;
                    V_PERSONNAME = resp.list[0].V_INPERNAME;
                    V_V_ORGCODE = resp.list[0].V_ORGCODE;
                    V_V_DEPTCODE = resp.list[0].V_DEPTCODE;
                    V_V_SPECIALTY = resp.list[0].V_ZY;
                    Ext.getCmp('njhName').setValue(resp.list[0].V_YEARNAME);
                    Ext.getCmp('njhnr').setValue(resp.list[0].V_COUNT);
                    _selectTaskId();
                }
            }
        }
    });
}

function QueryNextPer() {
    Ext.data.StoreManager.lookup('fzPerStore').load({
        params: {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_REPAIRCODE: '',
            V_V_FLOWTYPE: 'YearPlan',
            V_V_FLOW_STEP: V_STEPCODE,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: V_V_SPECIALTY,
            V_V_WHERE: '上报设备部'
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

function OnBtnGo() {
    Ext.getBody().mask('加载中，请稍后！');
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '上报设备部',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextPer').getValue(), spyj],
            processKey: processKey,
            businessKey: Guid,
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);

            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_06/PRO_PLAN_YEAR_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        'V_V_GUID': Guid,
                        'V_V_STATECODE': '70'
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        Ext.getBody().unmask();
                        if (resp.V_INFO == 'SUCCESS') {
                            window.opener.QueryTabY();
                            window.opener.QuerySum();
                            window.opener.QueryGrid();
                            window.opener.OnPageLoad();
                            window.close();
                        }
                    }
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
}

function OnBtnOver() {
    Ext.getBody().mask('加载中，请稍后！');
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '同意';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '内部结束',
            parName: ['lcjs', "flow_yj", 'shtgtime'],
            parVal: ['lcjs', spyj, Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s')],
            processKey: processKey,
            businessKey: Guid,
            V_STEPCODE: 'lcjs',
            V_STEPNAME: '流程结束',
            V_IDEA: '同意',
            V_NEXTPER: 'lcjs',
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                    method: 'POST',
                    async: false,
                    params: {
                        'V_V_ORDERID': Guid,
                        'V_V_PROCESS_NAMESPACE': 'YearPlan',
                        'V_V_PROCESS_CODE': processKey,
                        'V_V_STEPCODE': V_STEPCODE,
                        'V_V_STEPNEXT_CODE': 'lcjs'
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        Ext.getBody().unmask();
                        if (resp.V_INFO == 'success') {
                            window.opener.QueryTabY();
                            window.opener.QuerySum();
                            window.opener.QueryGrid();
                            window.opener.OnPageLoad();
                            window.close();
                        }
                    }
                });
            } else {
                Ext.getBody().unmask();
                Ext.MessageBox.alert('提示', '任务提交失败');
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })

}

function OnBtnBack() {
    Ext.getBody().mask('加载中，请稍后！');
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批驳回';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    var Assignee = '';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/InstanceState',
        method: 'POST',
        async: false,
        params: {
            instanceId: ProcessInstanceId
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            for (var i = 0; i < resp.list.length; i++) {
                if (resp.list[i].ActivityName == "Start") {
                    Assignee = resp.list[i].Assignee;
                    break;
                }
            }
        }
    });

    if (Assignee != '') {
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskComplete',
            type: 'ajax',
            method: 'POST',
            params: {
                taskId: taskId,
                idea: '不通过',
                parName: ['fqrxg', "flow_yj"],
                parVal: [Assignee, spyj],
                processKey: processKey,
                businessKey: Guid,
                V_STEPCODE: 'fqrxg',
                V_STEPNAME: '发起人修改',
                V_IDEA: '不通过',
                V_NEXTPER: Assignee,
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.ret == '任务提交成功') {
                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                        method: 'POST',
                        async: false,
                        params: {
                            'V_V_ORDERID': Guid,
                            'V_V_PROCESS_NAMESPACE': 'YearPlan',
                            'V_V_PROCESS_CODE': processKey,
                            'V_V_STEPCODE': V_STEPCODE,
                            'V_V_STEPNEXT_CODE': 'fqrxg'
                        },
                        success: function (ret) {
                            var resp = Ext.JSON.decode(ret.responseText);
                            Ext.getBody().unmask();
                            if (resp.V_INFO == 'success') {
                                window.opener.QueryTabY();
                                window.opener.QuerySum();
                                window.opener.QueryGrid();
                                window.opener.OnPageLoad();
                                window.close();
                            }
                        }
                    });
                } else {
                    Ext.getBody().unmask();
                    Ext.MessageBox.alert('提示', '任务提交失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.getBody().unmask();
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    } else {
        alert("发起人信息错误，无法驳回");
    }

}


function _selectTaskId() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: Guid,
            userCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            taskId = data.taskId;
            V_STEPCODE = data.TaskDefinitionKey;
            QueryNextPer();
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })
}

