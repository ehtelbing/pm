Ext.define('Ext.grid.column.LineBreakColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.linebreakcolumn',
    initComponent: function () {
        var me = this,
            // 定义customerRenderer变量，保存用户配置的renderer
            customerRenderer = me.renderer;
        if (customerRenderer) {
            // 如果用户配置了renderer，则限制性用户配置的renderer，然后执行默认的内容换行renderer
            me.renderer = function (value, metadata, record, rowIndex, columnIndex, store) {
                value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
                value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
                return value;
            };
        }
        me.callParent(arguments);
    },
    defaultRenderer: function (value, metadata, record, rowIndex, columnIndex, store) {
        metadata.style = 'white-space: normal; overflow: visible; word-break: break-all;';
        return value;
    }
});


//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    groupField:'V_DATE',
    groupDir : 'desc',
    fields: ['I_ID','V_USERID','V_INSERTDATE','V_ACTIVE',
        'V_REMARK','V_ACT_TYPE','V_IP','V_MENUNAME','V_URL','V_PERSONNAME','V_DATE','V_TIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cxy/MM_USER_TRENDS_BYNAME_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});
//grid显示
function query() {
    Ext.data.StoreManager.lookup('gridStore').load();
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    layout: 'column',
    frame: true,
    //baseCls: 'my-panel-no-border',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'textfield',
            id: 'search',
            fieldLabel: '搜索',
            margin: '5 0 5 5',
            labelWidth: 30,
            width: 180,
            listeners :{
                specialKey :function(field,e){
                    if (e.getKey() == Ext.EventObject.ENTER) query();
                }
            }
        },{
            xtype: 'button',
            text: '查询',
            margin: '5 0 5 5',
            icon: imgpath + '/search.png',
            handler: query
        },{
            xtype: 'button',
            text: '删除',
            margin: '5 0 5 15',
            icon: imgpath + '/delete1.png',
            handler: OnButtonDelete
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: true,
    columnLines: true,
    store: 'gridStore',
    features:[{
        ftype:'grouping',
        groupHeaderTpl:'{name}',
        startCollapsed:false,
        hideGroupedHeader:false
    }],
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true //只能通过checkbox选择
    },
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '时间', align: 'center', width: 100, dataIndex: 'V_TIME',renderer: rendererTime},
        {text: '页面', align: 'center', width: 230, dataIndex: 'V_MENUNAME'
            }
        // {text: '', align: '', width: 200, dataIndex: 'V_DATE',hidden:true}

    ]
    ,listeners: {
        'cellclick':function(grid,rowIndex,columnIndex,record) {
            if(columnIndex==3){
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                window.open(AppUrlFrame +record.data.V_URL, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
                insertHistory(record.data.V_ACTIVE);
            }else{
                return false;
            }


        }
    }
    // bbar: ["->",
    //     {
    //         id: 'page',
    //         xtype: 'pagingtoolbar',
    //         store: gridStore,
    //         width: '100%',
    //         dock: 'bottom',
    //         displayInfo: true,
    //         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
    //         emptyMsg: '没有记录'
    //     }
    // ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {

        store.proxy.extraParams = {
            V_V_USERID: Ext.util.Cookies.get('v_personcode'),
            V_V_MENUNAME:Ext.getCmp('search').getValue()

        }
    });
    query();

});
function rendererTime(value, metaData) {

    return value.split(":")[0]+':'+value.split(":")[1];
}
//删除
function OnButtonDelete(){
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择只少一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除记录吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'cxy/MM_USER_TRENDS_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: records[i].get('I_ID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.RET == 'SUCCESS') {//成功，会传回true
                                i_err++;
                                if (i_err == records.length) {
                                    query();
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '删除成功!',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR,
                                        fn: function () {
                                            query();
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: resp.RET,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR,
                                    fn: function () {
                                        query();
                                    }
                                });
                            }
                        },
                        failure: function (response) {//访问到后台时执行的方法。
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR,
                                fn: function () {
                                    query();
                                }
                            })
                        }
                    });
                }
            }
        }
    });
}
function insertHistory(active) {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/MM_USER_TRENDS_INS',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'V_V_USERID': Ext.util.Cookies.get('v_personcode'),
            'V_V_ACTIVE': active,
            'V_V_REMARK': '',
            'V_V_ACT_TYPE': '页面访问',
            'V_V_IP': ''
        },
        success: function (response) {
            query();
        }
    });
}