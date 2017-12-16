
/*页面顶部主表单(可以进行布局与排版,相对WindowForm布局不同,另可进行细致的调整)*/
Ext.define('com.view.Form', {

    id: 'formText',
    extend: 'Ext.form.Panel',

    alias: ['widget.mainForm'], 

    layout: 'column',
    //height:50,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60

    },

    frame: true,
    border: 1,

    items: [
      { id: 'time1s', xtype: 'datefield', format: 'Y-m-d', fieldLabel: '周一日期', value: new Date("2013/4/15") },
           { id: 'time2s', xtype: 'datefield', format: 'Y-m-d', fieldLabel: '周日日期', value: new Date("2013/4/21") }
    ]

})
