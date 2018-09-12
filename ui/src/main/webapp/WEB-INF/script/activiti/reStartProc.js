/**
 * Created by Administrator on 2018/9/5 0005.
 */

Ext.onReady(function() {
    var panel = Ext.create('Ext.panel.Panel', {
        frame: true,
        titleAlign: 'left', //tit 左
        region: 'north', //区域 北
        id: 'panel',
        layout: 'hbox',
        border: true,
        height: 50,
        width: 825,
        plain: true,
        items: [{
            xtype: 'textfield', id: 'flowcode',
            fieldLabel: '工单号',
            labelAlign: 'left',
            labelWidth: 100,
            width: 500,
            labelStyle: 'font-weight:bold',
            style: ' margin: 7px 3px 2px 30px'
            // renderer: function () {
            //     arr = Ext.getCmp('flowcode').getValue().split(";");
            //     size = arr.length;
            // }
        },
            {
                xtype: 'button',
                id: 'btn',
                text: '按钮',
                style: 'margin: 7px 3px 2px 15px',
                handler: reStartPbtn
            },{xtype:'label',
            text:'(工单号用“;”断开)',
            style:'font-color:FF3333 red;font-weight:bold;margin: 9px 3px 2px 8px;'}]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        id: 'main',
        items: [panel]
    });
});
function reStartPbtn() {
    var arr=[];
    arr = Ext.getCmp('flowcode').getValue().split(";");
    var size = arr.length;
    for (var i = 0; i < size; i++) {
        if (arr[i] != "") {

            Ext.Ajax.request({
                url: AppUrl + 'reStart/SELECT_RESTARTP',
                method: 'POST',
                async: false,
                params: {
                    FLOW_CODE: arr[i]
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    for (var j=0;j<resp.list.length;j++) {
                        if (resp.list[j].FLOW_CODE == arr[i]) {
                            Ext.Ajax.request({
                                url: AppUrl + 'Activiti/StratProcess',
                                async: false,
                                method: 'post',
                                params: {
                                    parName: ["originator", "flow_businesskey", resp.list[j].NEXT_SPR, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                    parVal: [resp.list[j].ORIGINATOR, resp.list[j].FLOW_BUSINESSKEY, resp.list[j].NEXT_PERSONCODE, "请审批!", resp.list[j].REMARK, resp.list[j].FLOW_CODE, "请审批！", resp.list[j].FLOW_TYPE],
                                    processKey: resp.list[j].PROCESSKEY,
                                    businessKey: resp.list[j].FLOW_BUSINESSKEY,
                                    V_STEPCODE: 'start',
                                    V_STEPNAME: resp.list[j].NEXT_SPR,
                                    V_IDEA: '请审批！',
                                    V_NEXTPER: resp.list[j].NEXT_PERSONCODE,
                                    V_INPER: resp.list[j].ORIGINATOR
                                },
                                success: function (response) {
                                    var rp = Ext.JSON.decode(response.responseText);
                                    if (rp.ret = "ERROR") {
                                        Ext.Msg.alert("消息", rp.msg);
                                    } else {
                                        Ext.Msg.alert("消息", "流程修改成功");
                                    }
                                }
                            });
                        }
                    }

                }
            });
        }
    }
}