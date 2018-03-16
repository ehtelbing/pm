

Ext.onReady(function () {

    var grid1 = Ext.create('Ext.grid.Panel', {
        id: 'grid1',
        border: false,
        columnLines: true,
        columns: [
            {
                text: '工具编码', align: 'center'
            },
            {
                text: '工具名称', align: 'center'
            },
            {
                text: '使用时间', align: 'center'
            },
            {
                text: '使用地点', align: 'center'
            },
            {
                text: '使用台时', align: 'center'
            },
            {
                text: '用途', align: 'center'
            }
        ]
    });
    var grid2 = Ext.create('Ext.grid.Panel', {
        id: 'grid2',
        border: false,
        columnLines: true,
        columns: [
            {
                text: '工具编码', align: 'center'
            },
            {
                text: '工具名称', align: 'center'
            },
            {
                text: '维修时间', align: 'center'
            },
            {
                text: '维修内容', align: 'center'
            },
            {
                text: '维修工单号', align: 'center'
            }
        ]
    });

    var grid3 = Ext.create('Ext.grid.Panel', {
        id: 'grid3',
        border: false,
        columnLines: true,
        columns: [
            {
                text: '设备编码', align: 'center'
            },
            {
                text: '设备名称', align: 'center'
            },
            {
                text: '功能位置', align: 'center'
            },
            {
                text: '关联时间', align: 'center'
            },
            {
                text: '关联人', align: 'center'
            },
            {
                text: '取消关联', align: 'center'
            }
        ]
    });

    var grid4 = Ext.create('Ext.grid.Panel', {
        id: 'grid4',
        border: false,
        title:'机具报废审批流程',
        columnLines: true,
        columns: [
            {
                text: '审批步骤', align: 'center'
            },
            {
                text: '审批时间', align: 'center'
            },
            {
                text: '审批意见', align: 'center'
            }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        frame: true,
        region: 'north',
        defaults: {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout: 'column',
        items: [{xtype: 'combo', id: 'gjbm', queryMode: 'local', fieldLabel: '工具编码', editable: false, labelWidth: 80},
            {xtype: 'combo', id: 'gjmc', queryMode: 'local', fieldLabel: '工具名称', editable: false, labelWidth: 80},
            {xtype: 'button', text: '查询', icon: imgpath + '/search.png', style: {margin: ' 5px 0 5px 10px'}},
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', style: {margin: ' 5px 0 5px 10px'}},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete.png', style: {margin: ' 5px 0 5px 10px'}},
            {xtype: 'button', text: '报废', icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}}
        ]
    });

    var pan = Ext.create('Ext.Panel', {
        id: 'pan',
        frame: true,
        region: 'north',
        defaults: {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout: 'column',
        items: [{xtype: 'combo', id: 'ck', queryMode: 'local', fieldLabel: '厂矿', editable: false, labelWidth: 80},
            {xtype: 'combo', id: 'zyq', queryMode: 'local', fieldLabel: '作业区', editable: false, labelWidth: 80}]
    });

    var pan2 = Ext.create('Ext.Panel', {
        id: 'pan2',
        frame: true,
        defaults: {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout: {
            type:'table',
            columns: 3
        },
        items: [
            {xtype: 'textfield', id: 'gjbm1', queryMode: 'local', fieldLabel: '工具编码', editable: false, labelWidth: 80},
            {xtype: 'textfield', id: 'gjmc1', queryMode: 'local', fieldLabel: '工具名称', editable: false, labelWidth: 80},
            {xtype: 'textfield', id: 'gjcg1', queryMode: 'local', fieldLabel: '工具采购日期', editable: false, labelWidth: 80},
            {xtype: 'textfield', id: 'gjcgfy1', queryMode: 'local', fieldLabel: '工具采购费用', editable: false, labelWidth: 80},
            {xtype: 'textfield', id: 'gjkf1', queryMode: 'local', fieldLabel: '工具所在库房', editable: false, labelWidth: 80},
            {xtype: 'textfield', id: 'gjsc1', queryMode: 'local', fieldLabel: '工具使用时长', editable: false, labelWidth: 80},
            {xtype: 'textarea', id: 'gjsc2', queryMode: 'local', fieldLabel: '工具报废原因', editable: false, labelWidth: 80}
            ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        height: window.screen.height / 2 - 120,
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [
            {
                xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
            },
            {
                text: '工具编码', align: 'center', width: 100
            },
            {
                text: '工具名称', align: 'center', width: 100
            },
            {
                text: '工具类型', align: 'center', width: 100
            },
            {
                text: '工具所在地', align: 'center', width: 100
            },
            {
                text: '工具采购日期', align: 'center', width: 100
            },
            {
                text: '工具状态', align: 'center', width: 100
            }
        ]
    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: window.screen.width / 2 ,
                    height: window.screen.height / 2,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    var tab =  Ext.create("Ext.tab.Panel", {
        id:'tab',
        region: 'center',
        border: false,
        items:[
            {id: 'tab1', title: '维修信息'},
            {id: 'tab2', title: '工种'},
            {id: 'tab3', title: '工具'},
            {id: 'tab4', title: '机具'},
            {id: 'tab5', title: '物料'}
            ]
    });

    var tree1=Ext.create('Ext.tree.Panel', {

        root:{
            id:"root",
            border:true,
            expanded: true,
            text:"设备类型",
            children:[{
                text:'设备类型1',
                children:[{
                    text:"设备名称1",
                    checked:true,
                    leaf:true
                }]
            },
                {
                    text:'设备类型2',
                    children:[{
                        text:"设备名称2",
                        checked:true,
                        leaf:true
                    }]
                },{
                    text:'设备类型3',
                    children:[{
                        text:"设备名称3",
                        checked:true,
                        leaf:true
                    }]
                }
            ]
        }
    });



    var pan3 = Ext.create('Ext.Panel', {
        id: 'pan3',
        frame: true,
        title:'设备信息',
        region: 'center',
        defaults: {
            style: ' margin: 5px 0px 5px 10px'
        },
        layout: {
            type:'table',
            columns: 3
        },
        items: [
            {xtype: 'textfield', id: 'sbbm1', queryMode: 'local', fieldLabel: '设备编码',  labelWidth: 80},
            {xtype: 'textfield', id: 'sbmc1', queryMode: 'local', fieldLabel: '设备名称',  labelWidth: 80},
            {xtype: 'textfield', id: 'sblxbm', queryMode: 'local', fieldLabel: '设备类型编码', labelWidth: 80},
            {xtype: 'textfield', id: 'sblxwz', queryMode: 'local', fieldLabel: '设备类型位置',  labelWidth: 80},
            {xtype: 'textfield', id: 'wzbm', queryMode: 'local', fieldLabel: '位置编码',  labelWidth: 80},
            {xtype: 'textfield', id: 'wzmc', queryMode: 'local', fieldLabel: '位置名称',  labelWidth: 80},
            {xtype: 'textfield', id: 'sblx', queryMode: 'local', fieldLabel: '设备类型',  labelWidth: 80},
            {xtype: 'textfield', id: 'sbzl', queryMode: 'local', fieldLabel: '设备种类',  labelWidth: 80},
            {xtype: 'textfield', id: 'abcbs', queryMode: 'local', fieldLabel: 'ABC标识',  labelWidth: 80},
            {xtype: 'textfield', id: 'ksrq', queryMode: 'local', fieldLabel: '开始日期',  labelWidth: 80},
            {xtype: 'textfield', id: 'jsrq', queryMode: 'local', fieldLabel: '结束日期',  labelWidth: 80},
            {xtype: 'textfield', id: 'cbzx', queryMode: 'local', fieldLabel: '成本中心',  labelWidth: 80},
            {xtype: 'textfield', id: 'ggxh', queryMode: 'local', fieldLabel: '规格型号',  labelWidth: 80},
            {xtype: 'textfield', id: 'dx', queryMode: 'local', fieldLabel: '大小/尺寸',  labelWidth: 80},
            {xtype: 'textfield', id: 'zczzs', queryMode: 'local', fieldLabel: '资产制造商',  labelWidth: 80},
            {xtype: 'textfield', id: 'gzjz', queryMode: 'local', fieldLabel: '购置价值',  labelWidth: 80},
            {xtype: 'textfield', id: 'dxzl', queryMode: 'local', fieldLabel: '对象重量',  labelWidth: 80},
            {xtype: 'textfield', id: 'yz', queryMode: 'local', fieldLabel: '原值',  labelWidth: 80},
            {xtype: 'textfield', id: 'zj', queryMode: 'local', fieldLabel: '折旧',  labelWidth: 80},
            {xtype: 'textfield', id: 'jxfy', queryMode: 'local', fieldLabel: '检修费用',  labelWidth: 80}
        ]
    });
    var tabPanel = Ext.create("Ext.tab.Panel", {
        id:'tabPanel',
        region: 'center',
        border: false,
        items:[
            {
                id: 'tabId1',
                title: '工具使用明细',
                items: [grid1]
            },
            {id: 'tabId2', title: '工具维修明细',items:[tab,grid2] },
            {id: 'tabId3', title: '关联设备',items:[pan,tree1,pan3,grid3]},
            {id: 'tabId4', title: '关联设备工具报废明细',items:[pan2,grid4]}
            ]
    });

    var leftPanel = Ext.create('Ext.Panel', {
        id: 'leftPanel',
        layout: 'border',
        width:'50%',
        region: 'west',
        border: false,
        items: [{
            region: 'north',
            border: false,
            items: [grid]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [viewImagePanel]
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [buttonPanel,leftPanel,tabPanel]

    });


});

