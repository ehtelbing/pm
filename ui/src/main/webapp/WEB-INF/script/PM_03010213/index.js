var V_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}
var V_PLANTYPE = '';
var date = new Date();


var editPanel = Ext.create('Ext.form.Panel', {
    id: 'editPanel',
    region: 'center',
    layout: 'border',
    frame: true,
    border: false,
    width: '100%',
    baseCls: 'my-panel-no-border',
    items: [
        {
            xtype: 'panel',
            layout: 'vbox',
            region: 'center',
            defaults: {labelAlign: 'right'},
            frame: true,
            border: false,
            //baseCls: 'my-panel-no-border',
            margin: '0 0 0 0',
            autoScroll: true,
            items: [ {
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'idea',
                    fieldLabel: '审批意见',
                    margin: '10 0 5 65',
                    labelWidth: 80,
                    width: 250
                },
                    {xtype: 'button', text: '同意', margin: '10 0 10 10', icon: imgpath + '/saved.png', handler: agree},
                    {
                        xtype: 'button',
                        text: '驳回',
                        margin: '10 0 10 10',
                        icon: imgpath + '/cross.png',
                        handler: disagree
                    }
                ]
            },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'year',
                            fieldLabel: '年份',
                            margin: '20 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'month',
                            fieldLabel: '月份',
                            margin: '20 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            readOnly: true
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ck',
                            fieldLabel: '计划厂矿',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'zyq',
                            fieldLabel: '作业区',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            readOnly: true
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'zy',
                            fieldLabel: '专业',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'sblx',
                            fieldLabel: '设备类型',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'sbmc',
                    fieldLabel: '设备名称',
                    editable: false,
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    readOnly: true
                },
                {layout: 'hbox',
                    defaults: {labelAlign: 'right',readOnly:true},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items:[
                        {
                            xtype: 'textfield',
                            id: 'sgfs',
                            allowBlank: false,
                            fieldLabel: '施工方式',
                            labelWidth: 80,
                            width:280
                        },
                        {
                            xtype:'checkboxfield',
                            boxLabel:'施工准备是否已落实',
                            id : 'iflag',
                            inputValue:1,
                            uncheckedValue:0,
                            margin: '5 0 5 30'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'jxnr',
                    fieldLabel: '检修内容',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 540,
                    readOnly: true
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhtgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划停工时间',
                            editable: false,
                            labelAlign: 'right',
                            readOnly: true,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280
                        },
                        {
                            xtype: 'textfield',
                            id: 'jhtghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'jhtgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            readOnly: true
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'jhjgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划竣工时间',
                            editable: false,
                            labelAlign: 'right',
                            readOnly: true,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280
                        },
                        {
                            xtype: 'textfield',
                            id: 'jhjghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: 'jhjgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            value: '0'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'jhgshj',
                    fieldLabel: '计划工时合计',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    readOnly: true
                },
                {
                    xtype: 'textarea',
                    id: 'bz',
                    fieldLabel: '备注',
                    margin: '5 0 10 5',
                    labelWidth: 80,
                    width: 540,
                    height: 80,
                    readOnly: true
                }
            ]
        }
    ]
});
function pageLoadInfo() {


    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHPLAN_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length == 1) {
                var V_FLOWCODE = resp.list[0].V_FLOWCODE;        //流动编码
                var V_YEARPLAN_CODE = resp.list[0].V_YEARPLAN_CODE; //年计划编码
                var V_QUARTERPLAN_CODE = resp.list[0].V_QUARTERPLAN_CODE;//季度计划编码
                var V_YEAR_PLANNAME = resp.list[0].V_YEAR_PLANNAME;        //年计划名称
                var V_QUARTER_PLANNAME = resp.list[0].V_QUARTER_PLANNAME;   //计划计划名称
                var V_HOUR = resp.list[0].V_HOUR;
                var V_BZ = resp.list[0].V_BZ;
                var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;        //专业编码
                var V_EQUTYPECODE = resp.list[0].V_EQUTYPENAME;        //设备类型编码
                var V_EQUCODE = resp.list[0].V_EQUNAME;        //设备名称编码
                var V_CONTENT = resp.list[0].V_CONTENT;        //检修内容
                var V_JXMX_NAME = resp.list[0].V_MX_NAME;      //检修模型名称
                var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];

                Ext.getCmp('year').setValue(resp.list[0].V_YEAR); //年
                Ext.getCmp('month').setValue(resp.list[0].V_MONTH);  //月
                Ext.getCmp('ck').setValue(resp.list[0].V_ORGNAME);  //厂矿编码
                Ext.getCmp('zyq').setValue(resp.list[0].V_DEPTNAME);  //作业区编码
                Ext.getCmp('zy').setValue(V_REPAIRMAJOR_CODE);  //专业编码
                Ext.getCmp('sblx').setValue(V_EQUTYPECODE);  //设备类型编码
                Ext.getCmp('sbmc').setValue(V_EQUCODE);  //设备名称编码
                Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                Ext.getCmp('jhtghour').setValue(V_STARTTIME_HOUR);  //停工时间小时
                Ext.getCmp('jhtgminute').setValue(V_STARTTIME_MINUTE);  //停工时间分钟
                Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                Ext.getCmp('jhjghour').setValue(V_ENDTIME_HOUR);  //竣工时间小时
                Ext.getCmp('jhjgminute').setValue(V_ENDTIME_MINUTE);  //竣工时间分钟
                Ext.getCmp('jhgshj').setValue(V_HOUR);  //竣工时间分钟
                Ext.getCmp('bz').setValue(V_BZ);  //竣工时间分钟

                //2018-11-21
                Ext.getCmp('sgfs').setValue(data.list[0].V_SGWAYNAME);
                Ext.getCmp('iflag').setValue(data.list[0].V_FLAG);
                V_PLANTYPE = resp.list[0].V_FLOWTYPE;
            }
        }
    });

}
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });
    pageLoadInfo();

});

function agree() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PM_03_PLAN_AGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUID,
            V_V_PLANTYPE: V_PLANTYPE,
            V_V_IDEA: Ext.getCmp('idea').getValue()==''?'同意':Ext.getCmp('idea').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.ret == '成功') {
                alert("成功");
                window.close();
                window.opener.OnPageLoad();
                window.opener.QueryGrid();
            } else {
                alert("失败");
            }

        }
    });
}
function disagree() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PM_03_PLAN_DISAGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUID,
            V_V_PLANTYPE: V_PLANTYPE,
            V_V_IDEA: Ext.getCmp('idea').getValue()==''?'驳回':Ext.getCmp('idea').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.ret == '成功') {
                alert("成功");
                window.close();
                window.opener.OnPageLoad();
                window.opener.QueryGrid();
            } else {
                alert("失败");
            }


        }
    });
}
