var guid='';
Ext.onReady(function() {
    Ext.QuickTips.init();
    if (location.href.split('?')[1] != undefined) {
        guid = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    }
    if (guid != "") {
        Ext.Ajax.request({
                url : AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
                method : 'POST',
                params : {
                    V_V_GUID :guid
                },
                success : function(ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    resp = resp.list;
                    Ext.ComponentManager.get("qxly").setText(
                        resp[0].V_SOURCENAME); // 缺陷来源
                    Ext.ComponentManager.get("qxrq").setText(
                        resp[0].D_DEFECTDATE); // 缺陷日期
                    Ext.ComponentManager.get("fzr").setText(
                        resp[0].V_PERNAME); // 负责人
                    Ext.ComponentManager.get("qxmx").setValue(
                        resp[0].V_DEFECTLIST); // 缺陷明细
                    Ext.ComponentManager.get("dw").setText(
                        resp[0].V_DEPTNAME); // 单位
                    Ext.ComponentManager.get("sb").setText(
                        resp[0].V_EQUNAME); // 设备
                    Ext.ComponentManager.get("sbwz").setText(
                        resp[0].V_EQUSITE); // 设备位置
                    Ext.ComponentManager.get("clyj")
                        .setText(resp[0].V_IDEA); // 处理意见
                    Ext.ComponentManager.get("qxzt").setText(
                        resp[0].V_STATENAME); // 缺陷状态
                }
            });
    }

    var form = Ext.create('Ext.form.Panel', {
        id : 'panel',
        layout : 'vbox',
        region : 'center',
        border : false,
        frame:true,
        items : [ {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '5px 5px 0px 5px',
            items : [ {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top_left',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '缺陷来源：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top2',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'qxly'
                } ]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top3',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '缺陷日期：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top4',
                border : false,
                layout : 'fit',
                items : [ {
                    id : 'qxrq',
                    xtype : 'label'
                } ]
            } ]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 5px 0px 5px',
            items : [ {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '负责人：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [ {
                    id : 'fzr',
                    xtype : 'label'
                } ]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '单位：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'dw'
                } ]
            } ]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 5px 0px 5px',
            items : [ {
                xtype : 'panel',
                width : 120,
                height : 70,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '缺陷明细：'
                } ]
            }, {
                xtype : 'panel',
                width : 640,
                height : 70,
                baseCls : 'border_top6',
                border : false,
                items : [ {
                    xtype : 'textareafield',
                    height : 60,
                    width : 580,
                    margin : '5px',
                    id : 'qxmx'
                } ]
            } ]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 5px 0px 5px',
            items : [ {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '设备：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'sb'
                } ]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '设备位置：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'sbwz'
                } ]
            } ]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 5px 5px 5px',
            items : [ {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '处理意见：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'clyj'
                } ]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    text : '缺陷状态：'
                } ]
            }, {
                xtype : 'panel',
                width : 260,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [ {
                    xtype : 'label',
                    id : 'qxzt'
                } ]
            } ]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '5px 5px 0px 5px',
            items : [ {
                xtype : 'button',
                text : '保存',
                style : 'margin:5px 0px 5px 5px',
                icon : imgpath + '/saved.png',
                handler : SaveClick
            }, {
                xtype : 'button',
                text : '取消',
                style : 'margin:5px 0px 5px 5px',
                icon : imgpath + '/error.png',
                handler : BackClick
            } ]
        } ]

    });

    Ext.create('Ext.container.Viewport', {
        layout:'border',
        items : [ form ]
    });
});

function SaveClick() {
    Ext.Ajax.request({
        url : AppUrl + 'qx/PRO_PM_07_DEFECT_EDIT',
        method : 'POST',
        params : {
            V_V_GUID :  guid,
            V_V_PERCODE  :  Ext.util.Cookies.get('v_personcode'),
            V_V_DEFECTLIST : Ext.getCmp('qxmx').getValue()
        },
        success : function(resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.list[0].V_INFO=="成功"){
                window.opener.getReturnValue('yes');
                window.close();
            }else{
                alert(resp.list[0].V_INFO);
            }
        }
    });
}

function BackClick() {
    window.opener.getReturnValue('yes');
    window.close();
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}
