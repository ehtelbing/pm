var guid='';
var type='';
if(location.href.split('?')[1]!=null&&location.href.split('?')[1]!=''){
    guid=Ext.urlDecode(location.href.split('?')[1]).guid;
    type=Ext.urlDecode(location.href.split('?')[1]).type;
}
Ext.onReady(function() {
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields:['ID','V_GUID','V_FILEGUID','V_FILENAME','V_INPERCODE','V_INPERNAME','V_TYPE','V_INTIME','V_FILETYPE'],
        proxy: {
            type: 'ajax',
            url: AppUrl+'PM_03/PM_03_PLAN_PROJECT_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    })

    var panel = Ext.create('Ext.Panel', {
        id :'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items: [{
            xtype : 'form',
            id:'formpanel',
            layout : 'column',
            baseCls : 'my-panel-no-border',
            frame : true,
            width : '100%',
            items : [{
                xtype : 'filefield',
                id : 'upload',
                name : 'upload',
                fieldLabel : '文件上传',
                labelAlign:'right',
                width : 300,
                msgTarget : 'side',
                allowBlank : true,
                anchor : '100%',
                buttonText : '浏览....',
                style : ' margin: 5px 0px 5px 10px'
            }, {
                xtype : 'button',
                width : 60,
                text : '上传',
                style : ' margin: 5px 0px 0px 10px',
                handler : function () {
                    var formpanel = Ext.getCmp('formpanel');
                    if(Ext.getCmp('upload').getValue()==''||Ext.getCmp('upload').getValue()==null||Ext.getCmp('upload').getValue()==undefined){
                        Ext.Msg.alert('提示信息', '请选择要的上传文件');
                        return;
                    }else{
                        formpanel.submit({
                            url: AppUrl + 'PM_03/PM_03_PLAN_PROJECT_FILE_SET',
                            async: false,
                            method: 'POST',
                            params : {
                                V_V_GUID:guid,
                                V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
                                V_V_INPERNAME:Ext.util.Cookies.get('v_personname2'),
                                V_V_TYPE:type
                            },
                            success: function (response) {
                                gridload();
                            }
                        });
                    }
                }
            }]
        }, {
            xtype: 'button',
            text: '刷新',
            width : 60,
            style : ' margin: 10px 0px 10px 10px',
            listeners: {click: gridload}
        }, {
            xtype: 'button',
            text: '删除',
            width : 60,
            style : ' margin: 10px 0px 10px 10px',
            listeners: {click: OnButtonDelClicked}
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width : 50,align:'center'},
            {text:'文件名称', dataIndex:'V_FILENAME', align:'center', width:260},
            {text:'上传时间',dataIndex:'V_INTIME', align:'center', width:170}
        ]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,grid]
    });

    gridload();
});

function OnButtonDelClicked() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err=0;
                for(var i=0;i<records.length;i++){
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_03/PM_03_PLAN_PROJECT_FILE_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_GUID : records[i].get('V_GUID'),
                            V_V_FILEGUID : records[i].get('V_FILEGUID')
                        },
                        success: function (response) {
                            i_err++;
                            if(i_err==records.length){
                                gridload();
                            }
                        }
                    })
                }
            }
        }
    });
}

function gridload(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params : {
            V_V_GUID:guid,
            V_V_FILEGUID:'',
            V_V_FILENAME:'',
            V_V_TYPE:type
        }
    });
}