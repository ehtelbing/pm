/*Model页面显示元素 - 加载数据*/

//var windowFrom = Ext.create("com.view.WindowForm").show();
//初始化窗体(定义基本参数)
Ext.define('com.view.Window', {
     
    id:'window',
    extend: 'Ext.window.Window',
    alias:['Window'],

    title: "编辑",
    width: 420,
    height: 380,
    layout: 'form',
    //layout: 'fit',
    //maximizable: true,   //是否显示最大化按钮 
    //plain: true,         //可以强制窗体颜色各背景色变的一样 
    modal: true,           //设定为模态窗口，否则底层网页还是可操作的。 

    fieldDefaults: {

        labelWidth: 20
    },
    items: [],

    buttons: [
        { text: '保存',id:'save'},
        { text: '取消', handler: function () { Ext.getCmp("window").hide(); } }],

    closeAction: 'hide',
    model: true

})



