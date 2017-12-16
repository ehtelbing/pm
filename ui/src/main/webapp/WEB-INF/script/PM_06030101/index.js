/**
 * Created by Administrator on 17-4-3.
 */
//-----西面板及其组件


Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    document.body.style.backgroundColor="#ffffff";
    //-----北面板
    var northPanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        margin: '0 0 20 0',
        items: [
            {xtype: 'button', text: '先择设备', margin: '5', icon: imgpath + '/image_add.png', margin: '10 5 5 20'},
            {xtype: 'button', text: '提交信息', margin: '5', margin: '10 5 5 20', icon: imgpath + '/add.png'}
        ]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        split: true,

        region: 'center',baseCls: 'my-panel-no-border',
        defaults: {baseCls: 'my-panel-no-border'},
        bodyStyle: "background-color:#ffffff;padding:10 0 10 10",
        items: [
            {
                layout: 'column', defaults: {xtype: 'textfield',labelAlign: 'right'},
                items: [
                    {id: 'equcode', fieldLabel: '设备编号名称', margin: '5 0 5 10', width: 250},
                    {id: 'jcfs', fieldLabel: '监测方式', margin: '5 0 5 10', width: 250},
                    {id: 'sbgzms', fieldLabel: '设备(潜在)故障描述', margin: '5 0 5 10', labelWidth : 120, width: 250}
                ]
            },
            {
                layout: 'column', defaults: {xtype: 'textfield', labelAlign: 'right'}, items: [
                {id: 'gzdate', fieldLabel: '发现故障日期', margin: '5 0 5 10', width: 250},
                {id: 'wxgs', fieldLabel: '维修工时', margin: '5 0 5 10', width: 250},
                {id: 'wxrqdate', fieldLabel: '维修日期', margin: '5 0 5 10', labelWidth : 120, width: 250}
            ]
            },
            {
                layout: 'column', defaults: {xtype: 'textfield', labelAlign: 'right'}, items: [
                {id: 'wxnr', fieldLabel: '维修内容', margin: '5 0 5 10', width: 250},
                {id: 'gzbjzt', fieldLabel: '故障部件状态', margin: '5 0 5 10', width: 250},
                {id: 'wxryqz', fieldLabel: '维修人员签字', margin: '5 0 5 10', labelWidth : 120, width: 250}
            ]
            },
            {
                layout: 'column', defaults: {xtype: 'textfield', labelAlign: 'right'}, items: [
                {id: 'wxzgqz', fieldLabel: '维修主管签字', margin: '5 0 5 10', width: 250}
            ]
            }
        ]

    });

    Ext.create('Ext.container.Viewport', {
        //bodyStyle: "background-color:#ffffff;padding:10 0 10 10",
        layout: 'border',
        items: [northPanel, formPanel]

    });
    _init();
});

function _init() {
    if (true) {

        Ext.getBody().unmask();
    }
}

