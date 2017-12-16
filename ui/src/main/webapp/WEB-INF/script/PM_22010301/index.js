var LODOP;
var trList = new Array();
var trExtList = new Array();
var trTestList = new Array();
var trTestList2 = new Array();
var src1;
var src2;
var src3;
var test123
var a;
var b;
var action = 'printPreview';
var V_PICGUID1;
var V_PICGUID2;
var V_PICGUID3;
var ckvalue;
var zyqvalue;
var sqrqvalue;
var xmbhvalue;
var xmmcvalue;
var zyvalue;
var sbsfzrvalue;
var jhsgrqvalue;
var jhnyvalue;
var gczgsvalue;
var gczysvalue;
var sfwwvalue;
var jxdwvalue;
var sftsqxvalue;
var qxsmjfyvalue;
var cqfavalue;
var spbzvalue;
var sprvalue;
var spyjvalue;
var spsjvalue;





var today = new Date();

var mingtian = new Date();

mingtian.setDate(mingtian.getDate() + 1);
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
    (parameters.V_PICGUID1 == undefined) ? V_PICGUID1 = '' : V_PICGUID1 = parameters.V_PICGUID1;
    (parameters.V_PICGUID2 == undefined) ? V_PICGUID2 = '' : V_PICGUID2 = parameters.V_PICGUID2;
    (parameters.V_PICGUID3 == undefined) ? V_PICGUID3 = '' : V_PICGUID3 = parameters.V_PICGUID3;


}

var ckstoreload = false;
var zyqstoreload = false;
var zystoreload = false;
var index01 = 2;
var index02 = 1;
var index03 = 0;
var PICGUID1;
var picguidbegin = V_PICGUID1;
var saveload = false;

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    //alert(ckvalue);
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'I_YEAR', 'I_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'D_DATE', 'V_PROJECTCODE',
            'V_PROJECTNAME', 'V_PLANDATE', 'V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTYMANCODE', 'V_SPECIALTYMAN',
            'F_MONEYUP', 'F_MONEYBUDGET', 'V_REPAIRDEPTTYPE', 'V_REPAIRDEPTCODE', 'V_REPAIRDEPT',
            'V_DEFECT', 'V_MEASURE', 'V_MONEY', 'V_INMAN', 'V_INMANCODE',
            'D_INDATE', 'I_STATE', 'V_FLAG', 'I_RUSHTO', 'V_PROJECTCODE_GS',
            'V_REPAIRDEPT_GS', 'F_MONEY_GS', 'D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_EQUREPAIRPLAN_CREATE',
            // url: 'PRO_PM_EQUREPAIRPLAN_CREATE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    var spqzstore = Ext.create('Ext.data.Store', {
        id: 'spqzstore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERID', 'V_DBGUID', 'V_FLOWSTEP', 'I_STATUS',
            'V_PERCODE', 'V_IDEA', 'V_DATE', 'D_DATE', 'V_TS',
            'V_FLOWTYPE', 'V_FLOWCODE', 'V_FLOWNAME', 'V_URL', 'V_FLOWSTEPCODE', 'V_ORDER',
            'V_DATE_B', 'V_PERSONNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_WO_FLOW_DATA_SPVIEW',
            // url: 'PRO_WO_FLOW_DATA_SPVIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    var printPanel = Ext.create('Ext.Panel', {
        id: 'printPanel',
        border: true,
        height: 1000,
        items: [{
            xtype: 'panel',
            region: 'center',
            border: true,
            // html : "<iframe id='printFrame' name='printFrame' frameborder=\"0\" width='100%' height=\"100%\" src=\"resource/printTemplate/FAInsertTemplate.html\"></iframe>"
            html: "<iframe id='printFrame' name='printFrame' frameborder=\"0\" width='100%' height=900 src=\"../../page/PM_2201010202/index.html\"></iframe>"
        }
        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'center',
            //layout: 'fit',
            border: true,
            items: [ printPanel]
        }]
    });

    //_init();
});

function _init(){
    switch (action) {
        case 'print':
            _print();
            window.close();
            break;
        case 'printPreview':
            _printPreview();
            //window.close();
            break;
        /* case 'saveAsEmfFile':
         _saveAsEmfFile();
         window.close();
         break;*/

    }
}

function _print() {
    if (navigator.appVersion.indexOf("MSIE") >= 0) {
        if (_initPlugin()) {
            _initPrint();
            // alert(3);
            LODOP.PRINT();
            // alert(4);




        } else {
            window.close();
        }
    } else {
        Ext.Msg.alert('提示信息', '请使用IE8浏览器打印!');
    }
}




function _printPreview() {
    if (navigator.appVersion.indexOf("MSIE") >= 0) {
        if (_initPlugin()) {
            _initValue();
            _initPrint();
           LODOP.PREVIEW();
            window.close();
        } else {
            window.close();
        }
    } else {
        Ext.Msg.alert('提示信息', '请使用IE8浏览器打印!');
    }
}


function _initPlugin() {
    try {
        LODOP = document.getElementById('LODOP');

        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
        LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
        LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1);
        LODOP.SET_SHOW_MODE('SHOW_SCALEBAR', 1);
    } catch (err) {
        return false;
    }

    return true;
}

function _initPrint() {
    //alert(1);
    //alert(ckvalue);
    //alert(sqrqvalue);

    var printFrame = window.document.getElementById('printFrame').contentWindow;
    var first = $(printFrame.document).find("#first");
    var second = $(printFrame.document).find("#second");
    var third = $(printFrame.document).find("#third");
    var fourth = $(printFrame.document).find("#fourth");


    var sqrqhtml = $(printFrame.document).find("#sqrqhtml");
    var xmbhhtml = $(printFrame.document).find("#xmbhhtml");
    var xmmchtml = $(printFrame.document).find("#xmmchtml");
    var zyhtml = $(printFrame.document).find("#zyhtml");
    var sbszyfzrhtml = $(printFrame.document).find("#sbszyfzrhtml");
    var jhsgrqhtml = $(printFrame.document).find("#jhsgrqhtml");
    var jhnyhtml = $(printFrame.document).find("#jhnyhtml");
    var gczgshtml = $(printFrame.document).find("#gczgshtml");
    var gczyshtml = $(printFrame.document).find("#gczyshtml");
    var sfwwhtml = $(printFrame.document).find("#sfwwhtml");
    var jxdwhtml = $(printFrame.document).find("#jxdwhtml");
    var sftsqxhtml = $(printFrame.document).find("#sftsqxhtml");

    //$("#sqrqhtml").val("你需要赋的值");
    //$("one").eq(1).find("td").eq(1).addClass('red').html('0');
    //first.color("red")

    /*for (var i = 0; i < 1; i++) {
        var tr = '<tr>';
        tr += '<td id="img1"><img src='\'+ src1 +'width='260px' height='200px' /></td>';
        tr += '<td width="300" align="left">' + ckvalue + '</td>';
        tr += '<th width="170" align="right">' + '作业区：' + '</th>';
        tr += '<td width="300" align="left">' + zyqvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '申请日期：：' + '</th>';
        tr += '<td id="sqrqhtml">' + sqrqvalue + '</td>';
        tr += '<th align="right">' + '项目编号：' + '</th>';
        tr += '<td id="xmbhhtml">' + xmbhvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '项目名称：' + '</th>';
        tr += '<td id="xmmchtml" colspan="3">' + xmmcvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '专业：' + '</th>';
        tr += '<td id="zyhtml">' + zyvalue + '</td>';
        tr += '<th align="right">' + '设备室专业负责人：' + '</th>';
        tr += '<td id="sbszyfzrhtml">' + sbsfzrvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '计划施工日期：' + '</th>';
        tr += '<td id="jhsgrqhtml">' + jhsgrqvalue + '</td>';
        tr += '<th align="right">' + '计划年月：' + '</th>';
        tr += '<td id="jhnyhtml">' + jhnyvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '工程总概算（万元）：' + '</th>';
        tr += '<td id="gczgshtml">' + gczgsvalue + '</td>';
        tr += '<th align="right">' + '工程总预算（万元）：' + '</th>';
        tr += '<td id="gczyshtml">' + gczysvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '是否外委：' + '</th>';
        tr += '<td id="sfwwhtml">' + sfwwvalue + '</td>';
        tr += '<th align="right">' + '检修单位：' + '</th>';
        tr += '<td id="jxdwhtml">' + jxdwvalue + '</td></tr><tr>';

        tr += '<th align="right">' + '是否特殊抢修：' + '</th>';
        tr += '<td id="sftsqxhtml" colspan="3">' + sftsqxvalue + '</td></tr>';

        //tr += '</tr>';

        trList[i] = tr;
    }*/
    $(printFrame.document).find("#ckhtml").html(ckvalue);
    $(printFrame.document).find("#zyqhtml").html(zyqvalue);
    $(printFrame.document).find("#sqrqhtml").html(sqrqvalue);
    $(printFrame.document).find("#xmbhhtml").html(xmbhvalue);
    $(printFrame.document).find("#xmmchtml").html(xmmcvalue);
    $(printFrame.document).find("#zyhtml").html(zyvalue);
    $(printFrame.document).find("#sbszyfzrhtml").html(sbsfzrvalue);
    $(printFrame.document).find("#jhsgrqhtml").html(jhsgrqvalue);
    $(printFrame.document).find("#jhnyhtml").html(jhnyvalue);
    $(printFrame.document).find("#gczgshtml").html(gczgsvalue);
    $(printFrame.document).find("#gczyshtml").html(gczysvalue);
    $(printFrame.document).find("#sfwwhtml").html(sfwwvalue);
    $(printFrame.document).find("#jxdwhtml").html(jxdwvalue);
    $(printFrame.document).find("#sftsqxhtml").html(sftsqxvalue);

   // console.log($(printFrame.document).find("#img1").src);
   // $("#img1").src=src1;
    $(printFrame.document).find("#img1").attr('src',src1);
    $(printFrame.document).find("#img2").attr('src',src2);
    $(printFrame.document).find("#img3").attr('src',src3);

    $(printFrame.document).find("#qxsmjfyhtml").html(qxsmjfyvalue);
    $(printFrame.document).find("#cqfahtml").html(cqfavalue);
    $(printFrame.document).find("#spbzhtml").html(spbzvalue);
    $(printFrame.document).find("#sprhtml").html(sprvalue);
    $(printFrame.document).find("#spyjhtml").html(spyjvalue);
    $(printFrame.document).find("#spsjhtml").html(spsjvalue);

    LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", printFrame.document.getElementsByTagName('html')[0].outerHTML);
}

function _initValue(){
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_IP: "",
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
        V_V_GUID: V_GUID

    };

    gridStore.load();
    ckvalue = gridStore.getAt(0).get('V_ORGNAME');
    zyqvalue = gridStore.getAt(0).get('V_DEPTNAME');
    sqrqvalue = gridStore.getAt(0).get('D_DATE').substring(0,11);
    xmbhvalue = gridStore.getAt(0).get('V_PROJECTCODE');
    xmmcvalue = gridStore.getAt(0).get('V_PROJECTNAME');
    zyvalue = gridStore.getAt(0).get('V_SPECIALTYNAME');
    sbsfzrvalue = gridStore.getAt(0).get('V_SPECIALTYMAN');
    jhsgrqvalue = gridStore.getAt(0).get('V_PLANDATE');
    jhnyvalue = gridStore.getAt(0).get('I_YEAR_PLAN')+'/'+ gridStore.getAt(0).get('I_MONTH_PLAN');

    gczgsvalue = gridStore.getAt(0).get('F_MONEYUP');
    gczysvalue = gridStore.getAt(0).get('F_MONEYBUDGET');
    sfwwvalue =  gridStore.getAt(0).get('V_REPAIRDEPTTYPE');
    jxdwvalue = gridStore.getAt(0).get('V_REPAIRDEPT');
    sftsqxvalue = gridStore.getAt(0).get('I_RUSHTO');
    qxsmjfyvalue = gridStore.getAt(0).get('V_DEFECT');
    cqfavalue = gridStore.getAt(0).get('V_MEASURE');

    var spqzstore = Ext.data.StoreManager.lookup('spqzstore');
    spqzstore.proxy.extraParams = {
        V_V_DBGUID : V_GUID
    };

    spqzstore.load();

    spbzvalue = spqzstore.getAt(0).get('V_FLOWSTEP');
    sprvalue = spqzstore.getAt(0).get('V_PERSONNAME');
    spyjvalue = spqzstore.getAt(0).get('V_IDEA');
    spsjvalue = spqzstore.getAt(0).get('V_DATE');


    src1 = '../../images/pm_dxgc_wwjx/' + V_GUID + '/thumb_' + V_PICGUID1 + '.jpg';
    src2 = '../../images/pm_dxgc_wwjx/' + V_GUID + '/thumb_' + V_PICGUID2 + '.jpg';
    src3 = '../../images/pm_dxgc_wwjx/' + V_GUID + '/thumb_' + V_PICGUID3 + '.jpg';
}

   