Ext.onReady(function() {
    Ext.QuickTips.init();
    if (location.href.split('?')[1] != undefined) {
        var id = Ext.urlDecode(location.href.split('?')[1]).v_guid;
    }
    if (id != "") {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            // url : 'PRO_PM_DEFECT_GET',
            method : 'POST',
            params : {
                //parName : ['V_V_GUID'],
                //parType : ['s'],
                //parVal : [id],
                //proName : 'PRO_PM_DEFECT_GET',
                //cursorName : 'V_CURSOR'
                V_V_GUID : id
            },
            success : function(ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                resp = resp.list;
                Ext.ComponentManager.get("qxly").setText(resp[0].V_SOURCENAME); // 缺陷来源
                Ext.ComponentManager.get("qxrq").setText(resp[0].D_DEFECTDATE); // 缺陷日期
                Ext.ComponentManager.get("fzr").setText(resp[0].V_PERNAME); // 负责人
                Ext.ComponentManager.get("qxmx").setValue(resp[0].V_DEFECTLIST); // 缺陷明细
                Ext.ComponentManager.get("dw").setText(resp[0].V_DEPTNAME); // 单位
                Ext.ComponentManager.get("sb").setText(resp[0].V_EQUNAME); // 设备
                Ext.ComponentManager.get("sbwz").setText(resp[0].V_EQUSITE); // 设备位置
                Ext.ComponentManager.get("clyj").setText(resp[0].V_IDEA); // 处理意见
                Ext.ComponentManager.get("qxzt").setText(resp[0].V_STATENAME); // 缺陷状态
            }
        });
    }

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : true,
        fields : ['D_DATE', 'V_LOGREMARK', 'V_FINISHNAME'],
        proxy : {
            type : 'ajax',
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_LOG_VIEW',
            // url : '/No210301/PRO_PM_DEFECT_LOG_VIEW',
            actionMethods : {
                read : 'POST'
            },
            extraParams : {
                //parName : ['V_V_GUID'],
                //parType : ['s'],
                //parVal : [Ext.urlDecode(location.href.split('?')[1]).v_guid],
                //proName : 'PRO_PM_DEFECT_LOG_VIEW',
                //cursorName : 'V_CURSOR'
                V_V_GUID : Ext.urlDecode(location.href.split('?')[1]).v_guid
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var form = Ext.create('Ext.form.Panel', {
        id : 'panel',
        layout : 'vbox',
        region : 'north',
        border : false,
        title : '缺陷跟踪明细',
        titleAlign : 'center',
        items : [{
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '5px 5px 0px 5px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 30,
                baseCls : 'border_top_left',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷来源：'
                }]
            }, {
                xtype : 'panel',
                width : 260,
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
                                    .showModalDialog(
                                    AppUrl
                                    + "/No210302/Index.html?v_guid="
                                    + Ext
                                        .fly("v_guid")
                                        .getValue(),
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
                width : 260,
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
            layout : 'hbox',
            margin : '0px 5px 0px 5px',
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
                width : 260,
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
                width : 260,
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
            margin : '0px 5px 0px 5px',
            items : [{
                xtype : 'panel',
                width : 120,
                height : 70,
                baseCls : 'border_top5',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    text : '缺陷明细：'
                }]
            }, {
                xtype : 'panel',
                width : 640,
                height : 70,
                baseCls : 'border_top6',
                border : false,
                items : [{
                    xtype : 'textareafield',
                    height : 60,
                    width : 580,
                    margin : '5px',
                    id : 'qxmx'
                }]
            }]
        }, {
            xtype : 'panel',
            border : false,
            layout : 'hbox',
            margin : '0px 5px 0px 5px',
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
                width : 260,
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
                width : 260,
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
            layout : 'hbox',
            margin : '0px 5px 5px 5px',
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
                width : 260,
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
                width : 260,
                height : 30,
                baseCls : 'border_top8',
                border : false,
                layout : 'fit',
                items : [{
                    xtype : 'label',
                    id : 'qxzt'
                }]
            }]
        }]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id : 'grid',
        store : gridStore,
        autoScroll : true,
        height : 400,
        columns : [{
            xtype : 'rownumberer',
            text : '序号',
            width : '5%',
            align : 'center',
            sortable : false
        }, {
            text : '时间',
            dataIndex : 'D_DATE',
            align : 'center',
            width : '18%',
            renderer : left
        }, {
            text : '处理事件',
            dataIndex : 'V_LOGREMARK',
            align : 'center',
            width : ' 63%',
            renderer : left,
            renderer : function(value, metadata, record,
                                rowIndex, columnIndex, store) {
                metadata.style = "text-align:left";
                return '<div data-qtip="' + value + '" >'
                    + value + '</div>';
            }
        }, {
            text : '处理结果',
            dataIndex : 'V_FINISHNAME',
            align : 'center',
            width : '10%',
            renderer : left
        }]
    });

    Ext.create('Ext.container.Viewport', {
        items : [form, grid]
    });
})

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}
