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
        fields:['ID','V_GUID','V_FILEGUID','V_FILENAME','V_INPERCODE','V_INPERNAME','V_TYPE','V_INTIME','V_FILETYPE','FNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl+'dxfile/PM_03_PLAN_PROJECT_FILE_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var ftypeStore=Ext.create('Ext.data.Store',{
        id:'ftypeStore',
        autoLoad:false,
        fields:['ID','FNAME','FTYPE'],
        proxy:{
            type:'ajax',
            url:AppUrl+'dxfile/FILETYPE_GETLIST',
            actionMethods:{
                read:'POST'
            },
            reader:{
                type:'json',
                root:'list'
            }
        }
    });
    Ext.data.StoreManager.lookup('ftypeStore').load({
        params:{
            SIGN:'Y'
        }
    });
    Ext.data.StoreManager.lookup('ftypeStore').on('load',function(){
        Ext.ComponentManager.get('f_type').store.insert(0,{
            'ID':'%',
            'FNAME':'全部'
        });
        Ext.getCmp('f_type').select(Ext.data.StoreManager.lookup('ftypeStore').data.getAt(0));
    });
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
            items : [{xtype:'combobox',
                id:'f_type',
                store:ftypeStore,
                fieldLabel:'附件类型',
                valueField:'ID',
                displayField:'FNAME',
                width:260,
                labelAlign:'right',
                queryMode:'local',
                editable:false,
                style : ' margin: 5px 2px 5px 5px',
                listeners:{
                    select:function(){
                        gridload();
                    }
                }
            },
                {
                    xtype : 'filefield',
                    id : 'upload',
                    name : 'upload',
                    fieldLabel : '文件上传',
                    labelAlign:'right',
                    labelWidth:80,
                    width : 300,
                    msgTarget : 'side',
                    allowBlank : true,
                    anchor : '100%',
                    buttonText : '浏览....',
                    style : ' margin: 5px 0px 5px 3px'
                }, {
                    xtype : 'button',
                    width : 60,
                    text : '上传',
                    style : ' margin: 5px 0px 0px 10px',
                    handler : function () {
                        var formpanel = Ext.getCmp('formpanel');
                        if(Ext.getCmp('f_type').getValue()=="%"){
                            { Ext.Msg.alert('提示信息','请选择上传附件类型'); return}
                        }
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
                                    V_V_TYPE:Ext.getCmp('f_type').getValue()  //type
                                },
                                success: function (response) {
                                    gridload();
                                }
                            });
                        }
                    }
                },{
                    xtype:'label',
                    text:'附件数量:',
                    id:'bq',
                    width:80,
                    style:'margin:8px 5px 5px 0px;text-align:right;'
                },{xtype:'label',
                    id:'fjsl',
                    width:30,
                    style:'margin:9px 2px 5px 5px'}]
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
            {text:'上传时间',dataIndex:'V_INTIME', align:'center', width:170,renderer:function(value, metaData, record, rowIdx, colIdx, store, view){
                    return value.toString().substring(0,10);
                }},
            {text:'附件类型',dataIndex:'FNAME',align:'center',width:100}
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
            V_V_TYPE:Ext.getCmp('f_type').getValue() //type
        }
    });
    Ext.data.StoreManager.lookup('gridStore').on('load',function(store, records, success, eOpts){
        Ext.getCmp('fjsl').setText(store.getProxy().getReader().rawData.V_COUNT);
    });
}