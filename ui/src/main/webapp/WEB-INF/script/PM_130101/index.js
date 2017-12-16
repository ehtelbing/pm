var V_V_GUID = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;
}

var examined;
var examinedLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_GET',
        type : 'ajax',
        method : 'POST',
        params : {
            'V_V_GUID' : V_V_GUID
        },
        callback : function(options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.RET == 'success') {
                    examined = data.list;
                }
            }
            examinedLoad = true;
            _init();
        }
    });

    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        region: 'north',
        width: '100%',
        border: false,
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_DATE',
                editable: false,
                readOnly: true,
                fieldLabel: '检查日期',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_ORGNAME',
                editable: false,
                readOnly: true,
                fieldLabel: '考核单位',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_BEEXAMINED_ORGNAME',
                editable: false,
                readOnly: true,
                fieldLabel: '被考核单位',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_BEEXAMINED_DEPTNAME',
                editable: false,
                readOnly: true,
                fieldLabel: '被考核部门',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_BEEXAMINED_CLASSNAME',
                editable: false,
                readOnly: true,
                fieldLabel: '被考核班组',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_JCBW',
                editable: false,
                readOnly: true,
                fieldLabel: '检查部位',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_CZWT',
                xtype: 'textarea',
                fieldLabel: '存在问题',
                readOnly: true,
                labelWidth: 90,
                width: 700,
                height: 50,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_ZGCS',
                xtype: 'textarea',
                fieldLabel: '整改措施',
                readOnly: true,
                labelWidth: 90,
                width: 700,
                height: 50,
                style: ' margin: -30px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_KHYJ',
                xtype: 'textarea',
                fieldLabel: '考核依据',
                readOnly: true,
                labelWidth: 90,
                width: 700,
                height: 50,
                style: ' margin: -30px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            margin: '-35px 0px 0px 5px',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_KHFS',
                editable: false,
                readOnly: true,
                fieldLabel: '考核分数',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_KKJE',
                editable: false,
                readOnly: true,
                fieldLabel: '扣款金额',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_BEEXAMINED_TYPE',
                editable: false,
                readOnly: true,
                fieldLabel: '考核类别',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_YQZGSJ',
                editable: false,
                readOnly: true,
                fieldLabel: '要求整改时间',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_TBSJ',
                editable: false,
                readOnly: true,
                fieldLabel: '通报时间',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_TB_PER',
                editable: false,
                readOnly: true,
                fieldLabel: '通报人',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_FEEDBACK_FLAG',
                editable: false,
                readOnly: true,
                fieldLabel: '是否已经整改',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_FEEDBACK_PER',
                editable: false,
                readOnly: true,
                fieldLabel: '整改负责人',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_YS_PER',
                editable: false,
                readOnly: true,
                fieldLabel: '验收人',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_FEEDBACK_DATA',
                editable: false,
                readOnly: true,
                fieldLabel: '整改日期',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_FK_PER',
                editable: false,
                readOnly: true,
                fieldLabel: '反馈人',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_FK_DATE',
                editable: false,
                readOnly: true,
                fieldLabel: '反馈时间',
                labelWidth: 90,
                width: 230,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
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
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [inputPanel]
        }]
    });

    _init();
});

function _init() {
    if (examinedLoad) {
        if (examined == null) {
            Ext.MessageBox.show({
                title : '错误',
                msg : '信息加载失败',
                buttons : Ext.MessageBox.OK,
                icon : Ext.MessageBox.ERROR
            });
            return;
        }
        Ext.getCmp('V_DATE').setValue(examined[0].V_DATE.substring(0,10));
        Ext.getCmp('V_ORGNAME').setValue(examined[0].V_ORGNAME);
        Ext.getCmp('V_BEEXAMINED_ORGNAME').setValue(examined[0].V_BEEXAMINED_ORGNAME);
        Ext.getCmp('V_BEEXAMINED_DEPTNAME').setValue(examined[0].V_BEEXAMINED_DEPTNAME);
        Ext.getCmp('V_BEEXAMINED_CLASSNAME').setValue(examined[0].V_BEEXAMINED_CLASSNAME);
        Ext.getCmp('V_JCBW').setValue(examined[0].V_JCBW);
        Ext.getCmp('V_CZWT').setValue(examined[0].V_CZWT);
        Ext.getCmp('V_ZGCS').setValue(examined[0].V_ZGCS);
        Ext.getCmp('V_KHYJ').setValue(examined[0].V_KHYJ);
        Ext.getCmp('V_KHFS').setValue(examined[0].V_KHFS);
        Ext.getCmp('V_KKJE').setValue(examined[0].V_KKJE);
        Ext.getCmp('V_BEEXAMINED_TYPE').setValue(examined[0].V_BEEXAMINED_TYPE);
        Ext.getCmp('V_YQZGSJ').setValue(examined[0].V_YQZGSJ.substring(0,10));
        Ext.getCmp('V_TBSJ').setValue(examined[0].V_TBSJ.substring(0,10));
        Ext.getCmp('V_TB_PER').setValue(examined[0].V_TB_PER);
        if(examined[0].V_FEEDBACK_FLAG == 0){
            Ext.getCmp('V_FEEDBACK_FLAG').setValue('未整改');
        }else{
            Ext.getCmp('V_FEEDBACK_FLAG').setValue('已整改');
        }
        Ext.getCmp('V_FEEDBACK_PER').setValue(examined[0].V_FEEDBACK_PER);
        Ext.getCmp('V_YS_PER').setValue(examined[0].V_YS_PER);
        Ext.getCmp('V_FEEDBACK_DATA').setValue(examined[0].V_FEEDBACK_DATA.substring(0,10));
        Ext.getCmp('V_FK_PER').setValue(examined[0].V_FK_PER);
        Ext.getCmp('V_FK_DATE').setValue(examined[0].V_FK_DATE.substring(0,10));


        Ext.getBody().unmask();
    }
}