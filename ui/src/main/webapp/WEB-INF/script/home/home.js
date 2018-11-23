Ext.onReady(function () {

    var northpanel = Ext.create('Ext.panel.Panel', {
        id: 'northpanel',
        width: '100%',
        height:'10%',
        region: 'north',
        frame: true,
        layout: 'hbox',
        items: [
                {
                    xtype: "datefield",
                    editable: false,
                    id: "begintime",
                    fieldLabel: '时间',
                    value: Ext.Date.getFirstDateOfMonth(new Date()),
                    queryMode: "local",
                    labelAlign: 'right',
                    labelWidth: 60,
                    format: 'Y-m-d',
                    style: ' margin: 5px 0px 0px 10px'
                },
                {
                    xtype: "datefield",
                    editable: false,
                    fieldLabel: '至',
                    id: "endtime",
                    value: new Date(),
                    queryMode: "local",
                    labelAlign: 'left',
                    labelWidth: 18,
                    format: 'Y-m-d',
                    style: ' margin: 5px 0px 0px 10px'
                },

                {
                    xtype: 'button',
                    icon: imgpath + '/search.png',
                    text: '查询',
                    style: ' margin: 5px 0px 5px 10px',
                    listeners: {click: OnPageLoad}
                }]
    });

    var centerpanel = Ext.create('Ext.panel.Panel', {
        id: 'centerpanel',
        width: '100%',
        region: 'center',
        height:'45%',
        frame: true,
        layout: 'hbox',
        items: [
            { xtype : 'panel', title:' 个人中心',layout : 'vbox',frame:true,width : '50%',height:'100%',
            defaults : { style : 'margin:5px 0px 0px 5px',labelAlign : 'right'},
            items : [
                {fieldLabel : '待办数量',labelWidth : 80,id : 'db',xtype : 'displayfield', width : 150},
                {fieldLabel : '已办数量',labelWidth : 80,id : 'yb',xtype : 'displayfield', width : 150}
       ]},
            { xtype : 'panel', title:' 缺陷',layout : 'vbox',frame:true,width : '50%',height:'100%',
            defaults : { style : 'margin:5px 0px 0px 5px',labelAlign : 'right'},
            items : [
                {fieldLabel : '未处理缺陷数量',labelWidth : 120,id : 'wclqx',xtype : 'displayfield', width : 150},
                {fieldLabel : '已下票缺陷数量',labelWidth : 120,id : 'yxpqx',xtype : 'displayfield', width : 150},
                {fieldLabel : '已消缺缺陷数量',labelWidth : 120,id : 'yxqqx',xtype : 'displayfield', width : 150},
                {fieldLabel : '手工消缺缺陷数量',labelWidth : 120,id : 'sgxqqx',xtype : 'displayfield', width : 150},
                {fieldLabel : '遗留缺陷数量',labelWidth : 120,id : 'ylqx',xtype : 'displayfield', width : 150}
            ]}]
    });

    var southpanel = Ext.create('Ext.panel.Panel', {
        id: 'southpanel',
        width: '100%',
        height:'45%',
        region: 'south',
        frame: true,
        layout: 'hbox',
        items: [
            { xtype : 'panel',title:' 计划',layout : 'vbox',frame:true,width : '50%',height:'100%',
            defaults : { style : 'margin:5px 0px 0px 5px',labelAlign : 'right'},
            items : [
                {fieldLabel : '年计划数量',labelWidth : 80,id : 'njh',xtype : 'displayfield', width : 150},
                {fieldLabel : '季计划数量',labelWidth : 80,id : 'jjh',xtype : 'displayfield', width : 150},
                {fieldLabel : '月计划数量',labelWidth : 80,id : 'yjh',xtype : 'displayfield', width : 150},
                {fieldLabel : '周计划数量',labelWidth : 80,id : 'zjh',xtype : 'displayfield', width : 150}
            ]},
            { xtype : 'panel',title:' 工单',layout : 'vbox',frame:true,width : '50%',height:'100%',
            defaults : { style : 'margin:5px 0px 0px 5px',labelAlign : 'right'},
            items : [
                {fieldLabel : '创建工单数量',labelWidth : 80,id : 'cjgd',xtype : 'displayfield', width : 150},
                {fieldLabel : '接收工单数量',labelWidth : 80,id : 'jsgd',xtype : 'displayfield', width : 150},
                {fieldLabel : '反馈工单数量',labelWidth : 80,id : 'fkgd',xtype : 'displayfield', width : 150},
                {fieldLabel : '验收工单数量',labelWidth : 80,id : 'ysgd',xtype : 'displayfield', width : 150},
                {fieldLabel : '预留工单数量',labelWidth : 80,id : 'ylgd',xtype : 'displayfield', width : 150}
            ]}]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [northpanel,centerpanel,southpanel]
    });

    OnPageLoad();
    OnCookies();
});


function OnPageLoad() {
    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_DB_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.getCmp('db').setValue(resp.V_DBNUM+'项');
            Ext.getCmp('yb').setValue(resp.V_YBNUM+'项');

        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_DEFECT_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.getCmp('wclqx').setValue(resp.V_WCL_NUM+'项');
            Ext.getCmp('yxpqx').setValue(resp.V_YXP_NUM+'项');
            Ext.getCmp('yxqqx').setValue(resp.V_YCL_NUM+'项');
            Ext.getCmp('sgxqqx').setValue(resp.V_SGXQ_NUM+'项');
            Ext.getCmp('ylqx').setValue(resp.V_YL_NUM+'项');

        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_PLAN_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.getCmp('njh').setValue(resp.V_YEAR_NUM+'项');
            Ext.getCmp('jjh').setValue(resp.V_QUARTER_NUM+'项');
            Ext.getCmp('yjh').setValue(resp.V_MONTH_NUM+'项');
            Ext.getCmp('zjh').setValue(resp.V_WEEK_NUM+'项');

        }
    });
    Ext.Ajax.request({//工单
        url: AppUrl + 'basic/PM_PRO_WORKORDER_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.getCmp('cjgd').setValue(resp.V_CJ_NUM+'项');
            Ext.getCmp('jsgd').setValue(resp.V_JS_NUM+'项');
            Ext.getCmp('fkgd').setValue(resp.V_FK_NUM+'项');
            Ext.getCmp('ysgd').setValue(resp.V_YS_NUM+'项');
            Ext.getCmp('ylgd').setValue(resp.V_YL_NUM+'项');

        }
    });


}
function dealWith(URL, V_ORDERID, V_DBGUID, V_ORDERGUID, V_FLOWSTEP,V_FLOWTYPE) {
    checktabid=parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    if (V_FLOWTYPE=='WORK'){
        window.open(AppUrl +"page"+ URL+"?V_ORDERID="+V_ORDERID+"&V_DBGUID="+V_DBGUID+"&V_ORDERGUID="+V_ORDERGUID+"&V_FLOWSTEP="+V_FLOWSTEP ,
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    }else{
        window.open(AppUrl + "page" + URL + "?V_GUID=" + V_ORDERGUID + '&random=' + Math.random(),
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    }


}
function addEdit(id) {

    Ext.data.StoreManager.lookup('gridWinStore').load({
        params: {
            V_V_ORDERID: id,
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode')
        }
    });
    Ext.getCmp('win').show();
}

function Query() {
    tabIndex=parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    OnPageLoad();
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
    Ext.ComponentManager.get("tabpanel").setActiveTab(tabIndex);
}
function rendererTime(value, metaData) {
    //return Ext.Date.format(value, 'Y-m-d');
    return value.split('.0')[0];
}

function OnCookies() {
    Ext.Ajax.request({
        url: AppUrl + 'info/login_getUrl',
        params: {
            LoginName: Ext.util.Cookies.get('v_personcode')
        }, success: function (respon) {
            var resp = Ext.decode(respon.responseText);
            if (resp.list.length>0) {
                for(var i = 0; i < resp.list.length; i++)
                {
                    var iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    iframe.id = "iframe" + i;
                    document.body.appendChild(iframe);
                    document.getElementById("iframe" + i).src = resp.list[i].V_URL;

                }
            } else {
                msgbox(resp.info);
            }
        }
    });

}