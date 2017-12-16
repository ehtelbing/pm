Ext.onReady(function() {
    if (location.href.split('?')[1] != undefined) {
        var id = Ext.urlDecode(location.href.split('?')[1]).v_guid;
    }
    if (id != "") {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            // url: 'PRO_PM_DEFECT_GET',
            method : 'POST',
            params : {
                //parName : ['V_V_GUID'],
                //parType : ['s'],
                //parVal : [id],
                //proName : 'PRO_PM_DEFECT_GET',
                //cursorName : 'V_CURSOR'
                V_V_GUID: id
            },
            success : function(ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                resp = resp.list;
                Ext.ComponentManager.get("qxly").setText(resp[0].V_SOURCENAME);// 缺陷来源
                Ext.ComponentManager.get("qxrq").setText(resp[0].D_DEFECTDATE);// 缺陷日期
                Ext.ComponentManager.get("fzr").setText(resp[0].V_PERNAME);// 负责人
                Ext.ComponentManager.get("qxmx").setValue(resp[0].V_DEFECTLIST);// 缺陷明细
                Ext.ComponentManager.get("dw").setText(resp[0].V_DEPTNAME);// 单位
                Ext.ComponentManager.get("sb").setText(resp[0].V_EQUNAME);// 设备
                Ext.ComponentManager.get("sbwz").setText(resp[0].V_EQUSITE);// 设备位置
                Ext.ComponentManager.get("clyj").setText(resp[0].V_IDEA);// 处理意见
                Ext.ComponentManager.get("qxzt").setText(resp[0].V_STATENAME);// 缺陷状态
            }
        });
    }
    var form = Ext.create('Ext.form.Panel', {
        id : 'panel',
        layout : 'vbox',
        region : 'center',
        border : false,
        title : '缺陷来源明细',
        titleAlign : 'center',
        frame:true,
        items : [{
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '15px 0px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                baseCls : 'border_top_left',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷来源：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top2',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'qxly',
                    autoEl : {
                        tag : 'a',
                        href : '#'
                    },
                    listeners : {
                        click : {
                            element : 'el',
                            fn : function() {
                                window
                                    .showModalDialog(AppUrl+
                                    "/No210302/Index.html?v_guid="
                                    + id,
                                    "",
                                    "dialogHeight:600px;dialogWidth:700px");
                            }
                        }
                    }
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top3',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷日期：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top4',
                border : false,
                layout : 'fit',
                items : [{
                    id : 'qxrq',
                    xtype : 'label'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            margin : '0px 0px 0px 15px',
            layout : 'hbox',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '负责人：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [{
                    id : 'fzr',
                    xtype : 'label'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '单位：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'dw'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            margin : '0px 0px 0px 15px',
            layout : 'hbox',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 60,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷明细：'
                }]
            }, {
                xtype : 'panel',
                width : 720,
                height : 60,
                baseCls : 'border_top6',
                border : false,
                items : [{
                    xtype : 'textareafield',
                    height : 60,
                    width : 580,
                    id : 'qxmx'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            margin : '0px 0px 0px 15px',
            layout : 'hbox',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '设备：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'sb'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '设备位置：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'sbwz'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            margin : '0px 0px 0px 15px',
            layout : 'hbox',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '处理意见：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top6',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'clyj'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top7',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷状态：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'qxzt'
                }]
            }]
        }],
        buttons : [{
            text : '关闭',
            listeners : {
                click : OnCloseButtonClicked
            }
        }]
    });
    // var panellow = Ext.create("Ext.form.Panel", {
    // region: 'center',
    // })

    Ext.create('Ext.container.Viewport', {
        split : true,
        layout : 'border',
        items : [form]
    });

})

function OnCloseButtonClicked() {
    window.close();
}
