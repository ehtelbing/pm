
Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    var yearStore = Ext.create('Ext.data.Store', {
        storeId: 'yearStore',
        autoLoad: false,
        fields: ['V_I_YEAR'],
        data: [{
            V_I_YEAR: '2014'
        }]
    });

    var fileStore = Ext.create('Ext.data.Store', {
        storeId : 'fileStore',
        autoLoad : false,
        fields : [ 'fileName', 'fileSize', 'KSDate', 'JSDate','fileImage'],
        data: [{
            fileImage:'../../images/gif/folder.gif',
            fileName: '大球',
            fileSize: '34k',
            KSDate: '2013-3-6',
            JSDate: '2013-3-7',
        }]
    });

    var northP  = Ext.create('Ext.form.Panel',{
        region:'north',
        height:60,
        defaults:{frame:true,baseCls:'my-panel-no-border',style:'margin-top:12px',},
        frame:true,
        items:[
            {layout:'column',defaults:{xtype:'combo',labelAlign:'right',  labelWidth: 60,editable:false,},items:[
                {
                    xtype: 'combo',
                    id: 'V_I_YEAR',
                    store: yearStore,
                    queryMode: 'local',
                    valueField: 'V_I_YEAR',
                    displayField: 'V_I_YEAR',
                    forceSelection: true,
                    fieldLabel: '选择日期',
                    labelWidth: 60
                }, {
                    xtype : 'filefield',
                    id : 'processDefinitionXml',
                    name : 'processDefinitionXml',
                    fieldLabel : '上传文件',
                    labelWidth: 80,
                    inputWidth : 150,
                    buttonText : '上传',
                    allowBlank : false
                }, {
                    xtype: 'button',
                    icon: imgpath + '/folder.gif',
                    style:'margin-left:10px;padding-left:10px;padding-right:10px',
                    text: '新建文件夹',
                    handler: ''
                }, {
                    xtype: 'button',
                    icon: imgpath + '/delete.png',
                    style:'margin-left:10px;padding-left:10px;padding-right:10px',
                    text: '删除文件夹',
                    handler: ''
                }
            ]}
        ],
    });

    var filePanel = Ext.create('Ext.grid.Panel', {
        border: false,//baseCls:'my-panel-no-border',
        //title:'详细信息',
        region: 'center',
        store: fileStore,
        columnLines: true,
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SIMGLE'
        },
        columns : [  {
            align:'center', width : 50, dataIndex: 'fileImage',

            renderer:function(value){
                return "<img src=" + value +">";

                return value;
            }

        }, {
            dataIndex : 'fileName',
            flex : 1
        }, {

            dataIndex : 'fileSize',
            flex : 1
        }, {

            dataIndex : 'KSDate',
            flex : 1
        }, {

            dataIndex : 'KSDate',
            flex : 1
            //width : 120
        } ]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northP,filePanel]
    });
    _init();
});

function _init() {
    if (true) {


        Ext.getBody().unmask();
    }
}

