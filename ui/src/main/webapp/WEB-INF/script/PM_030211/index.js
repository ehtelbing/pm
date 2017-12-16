var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var V_JXMX_CODE = null;
var V_JXGX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_JXMX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXMX_CODE;
    V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXGX_CODE;
}
var orgLoad = false;
var equTypeLoad = false;
var basedicLoad = false;
Ext.onReady(function () {

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        region: 'center',
        frame: true,
        border:false,
        defaults: {
            labelAlign: 'right',
            labelWidth : 100,
            margin : '10px 0 0 0px',
            width : 400
        },
        layout: {
            type: 'table',
            columns: '2'
        },
        items: [{
            xtype: 'textfield',
            id : 'ck',
            fieldLabel: '单位名称',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'zyq',
            fieldLabel: '作业区',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'sblx',
            fieldLabel: '设备类型',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'sbmc',
            fieldLabel: '设备名称',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'mxbm',
            fieldLabel: '模型编码',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'mxmc',
            fieldLabel: '模型名称',
            readOnly : true,
            width : 200
        },{
            xtype: 'textfield',
            id : 'jxcar',
            colspan : 2,
            fieldLabel: '检修机具',
            readOnly : true
        },{
            xtype: 'textfield',
            id : 'jxtool',
            colspan : 2,
            fieldLabel: '检修工具',
            readOnly : true
        },{
            xtype: 'textfield',
            id : 'jxper',
            colspan : 2,
            fieldLabel: '检修定额人员',
            readOnly : true
        },{
            xtype: 'textfield',
            id : '',
            colspan : 2,
            fieldLabel: '检修物料',
            readOnly : true
        },{
            xtype: 'textfield',
            id : 'jxtechnology',
            colspan : 2,
            fieldLabel: '检修技术要求',
            readOnly : true
        },{
            xtype: 'textfield',
            id : 'jxsafe',
            colspan : 2,
            fieldLabel: '检修安全措施',
            readOnly : true
        }]
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
        items: [inputPanel]
    });

    query();
});

function query(){
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PM_03_JXMX_DETAIL_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_JXMX_CODE : V_JXMX_CODE
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('ck').setValue(resp.list[0].V_ORGNAME);
            Ext.getCmp('zyq').setValue(resp.list[0].V_DEPTNAME);
            Ext.getCmp('sblx').setValue(resp.list[0].V_EQUTYPENAME);
            Ext.getCmp('sbmc').setValue(resp.list[0].V_EQUNAME);
            Ext.getCmp('mxbm').setValue(resp.list[0].V_MX_CODE);
            Ext.getCmp('mxmc').setValue(resp.list[0].V_MX_NAME);

            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PM_1917_JXGX_BYCODE_SEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE : V_JXGX_CODE
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    Ext.getCmp('jxcar').setValue(resp.list[0].V_JJ_NAME);
                    Ext.getCmp('jxtool').setValue(resp.list[0].V_GJ_NAME);
                    Ext.getCmp('jxper').setValue(resp.list[0].V_PER_NAME);
                    //    Ext.getCmp('jxmaterial').setValue(resp.list[0].);
                    Ext.getCmp('jxtechnology').setValue(resp.list[0].V_JSQY_NAME);
                    Ext.getCmp('jxsafe').setValue(resp.list[0].V_AQSC_NAME);
                }
            });

        }
    });
}
function _close() {
    window.close();
}


