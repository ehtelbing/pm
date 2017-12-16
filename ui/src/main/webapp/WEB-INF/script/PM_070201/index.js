Ext.onReady(function() {
    bind();
    var form = Ext.create('Ext.form.Panel', {
        id : 'panel',
        region:'center',
        layout : 'vbox',
        height : 440,
        title : '手工消缺',
        titleAlign : 'center',
        frame:true,
        items : [{
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '15px 15px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                layout : 'fit',
                baseCls : 'border_top_left',
                items : [{
                    xtype : 'label',
                    text : '缺陷来源：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                layout : 'fit',
                layout : 'fit',
                baseCls : 'border_top2',
                border : false,
                items : [{
                    xtype : 'label',
                    id : 'qxly'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                layout : 'fit',
                border : false,
                baseCls : 'border_top3',
                items : [{
                    xtype : 'label',
                    text : '缺陷日期：'
                }]
            }, {
                xtype : 'panel',
                border : false,
                baseCls : 'border_top4',
                width : 300,
                height : 30,
                layout : 'fit',
                items : [{
                    id : 'qxrq',
                    xtype : 'label'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 15px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top5',
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
                layout : 'fit',
                baseCls : 'border_top7',
                border : false,
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
            layout : 'hbox',
            margin : '0px 0px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 120,
                border : false,
                baseCls : 'border_top5',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷明细：'
                }]
            }, {
                xtype : 'panel',
                border : false,
                baseCls : 'border_top6',
                width : 720,
                height : 120,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    height : 110,
                    width : 680,
                    id : 'qxmx'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 0px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                baseCls : 'border_top5',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '设备：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                border : false,
                baseCls : 'border_top6',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'sb'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                baseCls : 'border_top7',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '设备位置：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                border : false,
                baseCls : 'border_top8',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'sbwz'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 0px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                baseCls : 'border_top5',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '处理意见：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                border : false,
                baseCls : 'border_top6',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'clyj'
                }]
            }, {
                xtype : 'panel',
                width : 120,
                height : 30,
                border : false,
                baseCls : 'border_top7',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷状态：'
                }]
            }, {
                xtype : 'panel',
                width : 300,
                height : 30,
                border : false,
                baseCls : 'border_top8',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'qxzt'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 0px 0px 15px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 120,
                border : false,
                baseCls : 'border_top5',
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '消缺原因：'
                },{xtype:'label',text:'*',style:'color:red'},]
            }, {
                xtype : 'panel',
                width : 720,
                height : 120,
                border : false,
                baseCls : 'border_top6',
                items : [{
                    xtype : 'textareafield',
                    height : 110,
                    width : 680,
                    id : 'xqyy'
                }]
            }]
        }],
        buttons : [{
            text : '确定',
            width : 70,
            listeners : {
                click : OnSaveButtonClicked
            }
        }, {
            text : '返回',
            width : 70,
            listeners : {
                click : OnBackButtonClicked
            }
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout:'border',
        items : [form]
    });
})

function OnBackButtonClicked() {
    window.close();
}
function bind() {
    if (location.href.split('?')[1] != undefined) {
        var id = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    }
    if (id != "") {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            // url: '/NO210201/PRO_PM_DEFECT_GET',
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

                Ext.ComponentManager.get("qxly")
                    .setText(resp[0].V_SOURCENAME);// 缺陷来源
                Ext.ComponentManager.get("qxrq")
                    .setText(resp[0].D_DEFECTDATE);// 缺陷日期
                Ext.ComponentManager.get("fzr")
                    .setText(resp[0].V_PERNAME);// 负责人
                Ext.ComponentManager.get("qxmx")
                    .setText(resp[0].V_DEFECTLIST);// 缺陷明细
                Ext.ComponentManager.get("dw")
                    .setText(resp[0].V_DEPTNAME);// 单位
                Ext.ComponentManager.get("sb")
                    .setText(resp[0].V_EQUNAME);// 设备
                Ext.ComponentManager.get("sbwz")
                    .setText(resp[0].V_EQUSITE);// 设备位置
                Ext.ComponentManager.get("clyj")
                    .setText(resp[0].V_IDEA);// 处理意见
                Ext.ComponentManager.get("qxzt")
                    .setText(resp[0].V_STATENAME);// 缺陷状态

            }
        });
    }
}

function OnSaveButtonClicked() {
    var id = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    if (Ext.ComponentManager.get("xqyy").getValue() != '') {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_SET_XQ',
            // url : '/NO210201/PRO_PM_DEFECT_SET_XQ',
            params : {

                //parName : ['V_V_GUID', 'V_V_PERCODE','V_V_XQYY'],
                //parType : ['s', 's','s'],
                //parVal : [id, Ext.util.Cookies.get("v_personcode"), Ext.getCmp('xqyy').getValue()],
                //proName : 'PRO_PM_DEFECT_SET_XQ',
                //returnStr : ['V_CURSOR'],
                //returnStrType : ['s']
                V_V_GUID : id,
                V_V_PERCODE : Ext.util.Cookies.get("v_personcode"),
                V_V_XQYY : Ext.getCmp('xqyy').getValue()
            },
            success : function(resp) {
                var resp = Ext.JSON.decode(resp.responseText);
                if (resp.list[0].V_INFO == "成功") {
                    alert("保存成功");
                    //window.opener.getReturnValue("yes");
                    window.close();
                    window.opener._selectOverhaulApply();
                } else {
                    Ext.Msg.alert('提示', '保存失败');
                }
            },
            failure : function() {
                Ext.Msg.alert('提示', '保存失败');
            }

        });
    } else {
        Ext.Msg.alert('提示', '录入内容不能为空，请重新输入!');
    }
}