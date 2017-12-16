var equcode = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_EQUCODE == undefined) ? equcode = '' : equcode = parameters.V_EQUCODE;
}

var chartqx = [];
var chartgd = [];

var colors = ['#FF99CC', '#66CCCC', '#CC3399', '#CCFF66', '#99CC33',
    '#666699', '#FF9900'];
Ext.define('Ext.chart.theme.Fancy', {
    extend: 'Ext.chart.theme.Base',

    constructor: function (config) {
        this.callParent([Ext.apply({
            colors: colors
        }, config)]);
    }
});

var panel = Ext.create('Ext.panel.Panel', {
    id: 'panellow',
    width: '100%',
    region: 'north',
    frame: true,
    layout: 'vbox',
    defaults: {
        labelAlign: 'right',
        style: 'margin:3px 0px 2px 5px'
    },
    items: [{
        xtype: 'displayfield',
        id: "bm",
        fieldLabel: '编码',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "mc",
        fieldLabel: '名称',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "lx",
        fieldLabel: '类型',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "wz",
        fieldLabel: '位置',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "bs",
        fieldLabel: '标识',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "zl",
        fieldLabel: '种类',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "gzsj",
        fieldLabel: '购置时间',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "cbzx",
        fieldLabel: '成本中心',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "ggxh",
        fieldLabel: '规格型号',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "dxcc",
        fieldLabel: '大小尺寸',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "zzs",
        fieldLabel: '制造商',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "gzjz",
        fieldLabel: '购置价值',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }, {
        xtype: 'displayfield',
        id: "dxzl",
        fieldLabel: '对象重量',
        labelWidth: 100
        //,
        //labelStyle : 'font-size:large;',
        //fieldStyle : ' font-size:large;'
    }]
});

var qxPie = {
    xtype: 'chart',
    region: 'east',
    autoRender: true,
    id: 'qxPie',
    store: {
        autoLoad: false,
        storeId: 'qxPieStore',
        fields: ['num', 'name', 'text'],
        data: chartqx,
        proxy: {
            type: 'memory',
            render: {
                type: 'json'
            }
        }
    },
    animate: true,
    shadow: true,
    theme: 'Fancy',
    insetPadding: 10,
    height: 150,
    width: 150,
    series: [{
        type: 'pie',
        field: 'num',
        showInLegend: true,
        //title : ['日修改工单'],
        highlight: {
            segment: {
                margin: 20
            }
        },
        tips: {
            width: 140,
            trackMouse: true,
            renderer: function (storeItem, item) {
                this.setTitle(storeItem.get('name') + ":"
                    + storeItem.get('num'));
            }
        },
        label: {
            field: ['name', 'num'],
            display: ['name', 'num'],
            contrast: true,
            font: '8px Arial',
            renderer: function (a, b, c) {
                return c.data.name + ':' + c.data.num + '条';
            }
        },
        renderer: function (sprite, storeItem, barAttr, i, store) {
            barAttr.fill = colors[i % colors.length];
            return barAttr;
        }
    }]
};

var gdPie = {
    xtype: 'chart',
    region: 'east',
    autoRender: true,
    id: 'gdPie',
    store: {
        autoLoad: false,
        storeId: 'gdPieStore',
        fields: ['num', 'name', 'text'],
        data: chartgd,
        proxy: {
            type: 'memory',
            render: {
                type: 'json'
            }
        }
    },
    animate: true,
    shadow: true,
    theme: 'Fancy',
    insetPadding: 10,
    height: 150,
    width: 150,
    series: [{
        type: 'pie',
        field: 'num',
        showInLegend: true,
        //title : ['日修改工单'],
        highlight: {
            segment: {
                margin: 20
            }
        },
        tips: {
            width: 140,
            trackMouse: true,
            renderer: function (storeItem, item) {
                this.setTitle(storeItem.get('name') + ":"
                    + storeItem.get('num'));
            }
        },
        label: {
            field: ['name', 'num'],
            display: ['name', 'num'],
            contrast: true,
            font: '8px Arial',
            renderer: function (a, b, c) {
                return c.data.name + ':' + c.data.num + '条';
            }
        },
        renderer: function (sprite, storeItem, barAttr, i, store) {
            barAttr.fill = colors[i % colors.length];
            return barAttr;
        }
    }]
};

var detpanel = Ext.create('Ext.panel.Panel', {
    id: 'detpanel',
    width: '100%',
    height: 200,
    region: 'north',
    frame: true,
    layout: 'hbox',
    //baseCls: 'my-panel-no-border',
    defaults: {
        labelAlign: 'right',
        style: 'margin:3px 0px 2px 70px'
    },
    items: [{
        xtype: 'panel',
        layout: 'vbox',
        baseCls: 'my-panel-no-border',
        width: '30%',
        items: [{
            xtype: 'displayfield',
            id: "gzl",
            fieldLabel: '故障率',
            labelAlign: 'left',
            labelWidth: 120
        }, {
            xtype: 'displayfield',
            id: "zyl",
            fieldLabel: '作业率:',
            labelAlign: 'left',
            labelWidth: 120
        }, {
            xtype: 'displayfield',
            id: "ljyxsj",
            fieldLabel: '累计运行时间',
            labelAlign: 'left',
            labelWidth: 120
        }, {
            xtype: 'displayfield',
            id: "pjyxsj",
            fieldLabel: '平均运行时间',
            labelAlign: 'left',
            labelWidth: 120
        }]
    }, {
        xtype: 'panel',
        layout: 'vbox',
        baseCls: 'my-panel-no-border',
        width: '35%',
        items: [{
            xtype: 'displayfield',
            id: "ljqx",
            fieldLabel: '累计缺陷',
            labelAlign: 'right',
            labelWidth: 70
        }, qxPie]
    }, {
        xtype: 'panel',
        layout: 'vbox',
        baseCls: 'my-panel-no-border',
        width: '35%',
        items: [{
            xtype: 'displayfield',
            id: "ljgd",
            fieldLabel: '累计工单',
            labelAlign: 'right',
            labelWidth: 70
        }, gdPie]
    }]
});


var timepanel = Ext.create('Ext.panel.Panel', {
    id: 'timepanel',
    width: '100%',
    height: 40,
    region: 'north',
    frame: true,
    layout: 'hbox',
    //baseCls: 'my-panel-no-border',
    defaults: {
        labelAlign: 'right',
        style: 'margin:3px 0px 2px 10px'
    },
    items: [{
        xtype: 'datefield',
        id: 'begintime',
        fieldLabel: '开始时间',
        format: 'Y/m/d',
        editable :false,
        value: new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + 1),
        width: 230
    }, {
        xtype: 'datefield',
        id: 'endtime',
        fieldLabel: '到',
        editable :false,
        labelWidth: 20,
        format: 'Y/m/d',
        value: new Date(),
        width: 160
    }, {
        xtype: 'button',
        text: '查询',
        width: 40,
        handler: query
    }]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel, timepanel, detpanel]
    });

    getDetail();
});

function getDetail() {
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_SAP_PM_EQU_P_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_EQUCODE: equcode
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {
                Ext.getCmp('bm').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('mc').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('lx').setValue(
                    resp.list[0].V_EQUTYPENAME + " "
                    + resp.list[0].V_EQUTYPECODE);
                Ext.getCmp('wz').setValue(resp.list[0].V_EQUSITENAME);
                Ext.getCmp('bs').setValue(resp.list[0].V_EQULEV);
                Ext.getCmp('zl').setValue(resp.list[0].V_EQULEVNAME);
//				Ext.getCmp('gzsj').setValue(
//						Ext.Date.format(new Date(resp.list[0].V_DATE_B),
//								'Y-m-d'));
                Ext.getCmp('gzsj').setValue(resp.list[0].V_DATE_B);
                Ext.getCmp('cbzx').setValue(resp.list[0].V_CASTNAME);
                Ext.getCmp('ggxh').setValue(resp.list[0].V_GGXH);
                Ext.getCmp('dxcc').setValue(resp.list[0].V_SIZE);
                Ext.getCmp('zzs').setValue(resp.list[0].V_ZZS);
                Ext.getCmp('gzjz').setValue(
                    resp.list[0].F_MONEY + " " + resp.list[0].V_MONEYTYPE);
                Ext.getCmp('dxzl')
                    .setValue(
                    resp.list[0].F_WEIGHT + " "
                    + resp.list[0].V_WEIGHTTYPE);

                v_equtypecode = resp.list[0].V_EQUTYPECODE

            }
        }
    });
}

function query() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_HZTJ_RIGHT_SEL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_D_ENTER_DATE_B: Ext.Date.format(new Date(Ext.getCmp('begintime').getValue()), 'Y-m-d'),
            V_D_ENTER_DATE_E: Ext.Date.format(new Date(Ext.getCmp('endtime').getValue()), 'Y-m-d'),
            V_EQU_CODE: equcode
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
                Ext.getCmp('gzl').setValue(resp.list[0].V_GZL);
                Ext.getCmp('zyl').setValue(resp.list[0].V_ZYL);
                Ext.getCmp('ljyxsj').setValue(resp.list[0].V_LJYXSJ);
                Ext.getCmp('pjyxsj').setValue(resp.list[0].V_PJYXSJ);

            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_HZTJ_RIGHT_QX',
        type: 'ajax',
        method: 'POST',
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(new Date(Ext.getCmp('begintime').getValue()), 'Y-m-d'),
            V_D_DEFECTDATE_E: Ext.Date.format(new Date(Ext.getCmp('endtime').getValue()), 'Y-m-d'),
            V_EQU_CODE: equcode
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {
                Ext.getCmp('ljqx').setValue(resp.list[0].F_SUMNUM + '个');
                chartqx = [];
                for (var index = 0; index < resp.list.length; index++) {
                    chartqx.push({
                        num: resp.list[index].F_NUM,
                        name: resp.list[index].V_SOURCENAME
                    });

                }

                Ext.data.StoreManager.lookup('qxPieStore').loadData(chartqx);
            } else {
                Ext.getCmp('ljqx').setValue('0个');
            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_HZTJ_RIGHT_GD',
        type: 'ajax',
        method: 'POST',
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(new Date(Ext.getCmp('begintime').getValue()), 'Y-m-d'),
            V_D_DEFECTDATE_E: Ext.Date.format(new Date(Ext.getCmp('endtime').getValue()), 'Y-m-d'),
            V_EQU_CODE: equcode
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {
                Ext.getCmp('ljgd').setValue(resp.list[0].F_SUMNUM + '张');

                chartgd = [];
                for (var index = 0; index < resp.list.length; index++) {
                    chartgd.push({
                        num: resp.list[index].F_NUM,
                        name: resp.list[index].V_STATENAME
                    });

                }
                Ext.data.StoreManager.lookup('gdPieStore').loadData(chartgd);

            } else {
                Ext.getCmp('ljgd').setValue('0张');
            }
        }
    });
    //
    //Ext.data.StoreManager.lookup('gridjhStore').load({
    //    params : {
    //        parName : [ 'V_D_DEFECTDATE_B', 'V_D_DEFECTDATE_E','V_V_EQUCODE' ],
    //        parType : [ 'da', 'da','s' ],
    //        parVal : [ Ext.Date.format(Ext.getCmp('begintime').getValue(),'Y-m-d'),
    //            Ext.Date.format(Ext.getCmp('endtime').getValue(),'Y-m-d'),
    //            equcode ],
    //        proName : 'PRO_HZTJ_RIGHT_JH',
    //        cursorName : 'V_CURSOR'
    //    }
    //});
    //
    //Ext.data.StoreManager.lookup('gridwlStore').load({
    //    params : {
    //        parName : [ 'V_D_DEFECTDATE_B', 'V_D_DEFECTDATE_E','V_V_EQUCODE' ],
    //        parType : [ 'da', 'da','s' ],
    //        parVal : [ Ext.Date.format(Ext.getCmp('begintime').getValue(),'Y-m-d'),
    //            Ext.Date.format(Ext.getCmp('endtime').getValue(),'Y-m-d'),
    //            equcode ],
    //        proName : 'PRO_HZTJ_RIGHT_WL',
    //        cursorName : 'V_CURSOR'
    //    }
    //});

}