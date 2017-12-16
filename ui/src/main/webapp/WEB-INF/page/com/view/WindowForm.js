
/*窗体表单,主要特点幅度小,可以进一步对窗体特点进行优化*/
Ext.define('com.view.WindowForm', {

    extend: 'Ext.form.Panel',
    alias: ['widget.WindowForm'], 
    layout: 'form',
    //id:'windowForm',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        fieldWidth: 200
    },
    

    frame: true,
    border: 1,

    items: [
       { id: 'ID', xtype: 'hidden'},
       { id: 'RECORDTIME', xtype: 'datefield', fieldLabel: '检查时间', format: 'Y-m-d' },
       { id: 'MONDAY', xtype: 'textfield', fieldLabel: '周一日期', readOnly: true },
       { id: 'SUNDAY', xtype: 'textfield', fieldLabel: '周日日期', readOnly: true },
       { id: 'RECORDPERSON', name: 'RECORDPERSON', xtype: 'textfield', fieldLabel: '检查人' },
       { id: 'RECORDPROBLEM', xtype: 'textfield', fieldLabel: '检查问题' },
       { id: 'HANDLEMEASURE', xtype: 'textfield', fieldLabel: '整改措施' },
       { id: 'HANDLEPERSON', xtype: 'textfield', fieldLabel: '整改负责人' },

       { id: 'ISCHECK', xtype: 'combo', fieldLabel: '是否考核', displayField: 'name',valueField: 'code',store:[["1","是"],["0","否"]]},

       { id: 'CHECKSTANDARD', xtype: 'textfield', fieldLabel: '依据条款' },
       { id: 'CHECKPERSON', xtype: 'textfield', fieldLabel: '被考核人' },
       { id: 'KAOHE', xtype: 'textfield', fieldLabel: '考核金额(元)/分数' }

    // { id: 'saveE', xtype: 'button', text: '保存', layout: 'fit', handler: save },
    // { id: 'cancelE', xtype: 'button', text: '取消', layout: 'fit' }
    ]
})