var flag=[];
var bl = [];
var zclbbl = [];
var Guid = "";

var yearList = [];

var date = new Date();

var nowDate = date.getFullYear();

for (var i = nowDate + 1; i >= nowDate - 2; i--) {
    yearList.push({id: i, value: i});
}

var yearStore = Ext.create('Ext.data.Store', {
    id: 'yearStore',
    fields: ['id', 'value'],
    data: yearList,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

var winyearStore = Ext.create('Ext.data.Store', {
    id: 'winyearStore',
    fields: ['id', 'value'],
    data: yearList,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    //Ext.getBody().mask('<p>页面加载中...</p>');
    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });
    var winckStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'winckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });
    var winzyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'winzyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });
    var zclbStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zclbStore',
        fields: ['V_TYPECODE','V_TYPEDESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_TYPEDESC_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var winzclbStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'winzclbStore',
        fields: ['V_TYPECODE','V_TYPEDESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_TYPEDESC_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var stateStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'stateStore',
        fields: ['V_BASECODE','V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'IS_V_BASETYPE': 'DX/TYPE'
            }
        }
    });
    var winstateStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'winstateStore',
        fields: ['V_BASECODE','V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'IS_V_BASETYPE': 'DX/TYPE'
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['V_GUID','V_YEAR','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_ZCCODE','V_ZCNAME',
            'V_JXBMCODE','V_TYPE','V_XH','V_ZXPERCODE','V_ZXPERNAME','V_INDATE','V_OUTDATE','V_STATEDATE','V_ENDDATE',
            'V_COUNT','V_BZ','V_DARTFLAG','V_INPERCODE','V_INPERNAME','V_EDITTIME','V_ORDER','V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_06_PLAN_DXGC_VIEW_Q',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });


    var toolPanel = Ext.create('Ext.panel.Panel', {
        id: 'toolPanel',
        width: '100%',
        layout: 'column',
        frame: true,
        border: false,
        defaults: {margin: '5 5 0 5', labelAlign: 'right'},
        region: 'north',
        items: [
            {
                xtype: 'combo',
                id: 'year',
                store: yearStore,
                value: nowDate,//+1,
                editable: false,
                queryMode: 'local',
                fieldLabel: '年份',
                displayField: 'id',
                valueField: 'value',
                labelWidth: 80
            }, {
                xtype: 'combo',
                id: "ck",
                store: ckStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂  矿',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80
            }
            , {
                xtype: 'combo',
                id: "zyq",
                store: zyqStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80
            }
            , {
                xtype: 'combo',
                id: "zclb",
                store: zclbStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '总成类别',
                displayField: 'V_TYPEDESC',
                valueField: 'V_TYPECODE',
                labelWidth: 80
            },{
                xtype:'combo',
                id:'state',
                store:stateStore,
                editable:false,
                queryMode:'local',
                fieldLabel:'类  别',
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                labelWidth: 80
            },  {
                xtype: 'panel', frame: true, width: '100%', layout: 'column', colspan: 8, baseCls: 'my-panel-noborder',style: 'margin:5px 5px 0 5px',
                items: [
                    {
                        xtype: 'button',
                        text: '查询',
                        style: 'margin:5px 0 5px 50px',
                        icon: imgpath + '/search.png',
                        listeners: {click: OnButtonQuery}
                    }, {
                        xtype: 'button',
                        style: 'margin:5px 0 5px 5px',
                        text: '新增大修工程',
                        icon: imgpath + '/add.png',
                        listeners: {click: OnButtonAdd}
                    },
                    {
                        xtype: 'button',
                        style: 'margin:5px 0 5px 5px',
                        text: '编辑',
                        icon: imgpath + '/edit.png',
                        listeners: {click: OnButtonEdit}
                    },
                    {
                        xtype: 'button',
                        style: 'margin:5px 0 5px 5px',
                        text: '删除大修工程',
                        icon: imgpath + '/delete.png',
                        listeners: {click: OnButtonDel}
                    }
                ]
            }
        ]
    });

    var mainpanel = Ext.create('Ext.grid.Panel', {
        id: 'mainpanel',
        frame: true,
        border: false,
        columnLines: true,
        store: gridStore,
        region: 'center',
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 70, align: 'center'},
            {text: '年份', width: 150, dataIndex: 'V_YEAR', align: 'center'},
            {text: '厂矿', width: 150, dataIndex: 'V_ORGNAME', align: 'center', renderer: atleft},
            {text: '作业区', width: 150, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
            {text: '总成类别', width: 150, dataIndex: 'V_ZCNAME', align: 'center', renderer: atleft},
            {text: '类别', width: 150, dataIndex: 'V_BASENAME', align: 'center', renderer: atleft},
            {text: '检修编号', width: 200, dataIndex: 'V_JXBMCODE', align: 'center', renderer: atleft},
            {text: '主修人', width: 100, dataIndex: 'V_ZXPERNAME', align: 'center', renderer: atleft},
            {text: '维修内容', width: 150, dataIndex: 'V_COUNT', align: 'center', renderer: atleft},
            {text: '入场时间', width: 130, dataIndex: 'V_INDATE', align: 'center', renderer: timelfet},
            {text: '出厂时间', width: 130, dataIndex: 'V_OUTDATE', align: 'center', renderer: timelfet}
        ]
    });

    var win = Ext.create('Ext.window.Window', {
        id: 'win',
        width: 320,
        height: 400,
        layout: 'vbox',
        title: '编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [
            {
                xtype: 'combo',
                id: 'winyear',
                store: winyearStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '年  份',
                displayField: 'id',
                valueField: 'value',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            },
            {
                xtype: 'combo',
                id: 'winck',
                store: winckStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂  矿',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            },
            {
                xtype: 'combo',
                id: "winzyq",
                store: winzyqStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            },
            {
                xtype: 'combo',
                editable: false,
                queryMode: 'local',
                fieldLabel: '总成类别',
                id:'winzclb',
                store:winzclbStore,
                displayField: 'V_TYPEDESC',
                valueField: 'V_TYPECODE',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            },
            {
                xtype: 'combo',
                editable: false,
                queryMode: 'local',
                fieldLabel: '类  别',
                id: 'winstate',
                store:winstateStore,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            },
            {
                xtype: 'textareafield',
                id: 'winqstext',
                name: 'message',
                fieldLabel: '维修内容',
                position: 'absolute',
                width: '300',
                margin: '20px 0 0 0px',
                labelAlign: 'right'
            }
        ],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                save();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('win').hide();
            }
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id: 'main',
        layout: 'border',
        items: [toolPanel, mainpanel]
    });

    Ext.data.StoreManager.lookup('yearStore').on('load',function(store,records){
        Ext.getCmp('year').select(Ext.data.StoreManager.lookup("yearStore").getAt(0));

    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('zclbStore').load({
            params: {
                'V_V_ORGCODE':Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('zclbStore').on('load', function (store,records) {
        Ext.data.StoreManager.lookup('zclbStore').insert(0,{V_TYPEDESC:'全部',V_TYPECODE:'%'});

        Ext.getCmp('zclb').select(Ext.data.StoreManager.lookup('zclbStore').getAt(0));

    });

    Ext.data.StoreManager.lookup('stateStore').on('load',function(){
        Ext.data.StoreManager.lookup('stateStore').insert(0,{V_BASENAME:'全部',V_BASECODE:'%'})
        Ext.getCmp('state').select(Ext.data.StoreManager.lookup('stateStore').getAt(0));
    });





    Ext.getCmp('year').on('select', function () {
        OnButtonQuery();
    });

    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('zclbStore').load({
            params: {
                'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('zyq').getValue(),
                'V_V_DEPTCODENEXT': '%'

            }
        });
        OnButtonQuery();
    });

    Ext.getCmp('zclb').on('select', function () {
        OnButtonQuery();
    });

    // Ext.getCmp('winzclb').on('select', function () {});

    Ext.getCmp('state').on('select',function(){

        OnButtonQuery();
    });

    Ext.getCmp('winstate').on('select',function(){

    });

    if(Ext.getCmp('zclb').getValue() != '%'){

        Ext.getCmp('winzclb').select(Ext.getCmp('zclb').getValue());


    }else{
        //Ext.data.StoreManager.lookup('winzclbStore').on('load',function(){
        Ext.getCmp('winzclb').select(Ext.data.StoreManager.lookup("winzclbStore").getAt(0));
        //});
    }

    Ext.getCmp('winck').on('select', function () {
        if(Ext.getCmp('winck').getValue() != Ext.getCmp('ck').getValue()){
            //Ext.getCmp('winzyq').select(Ext.data.StoreManager.lookup("winzyqStore").getAt(0));
            //Ext.data.StoreManager.lookup("winzyqStore").getAt(0)
            Ext.data.StoreManager.lookup('winzyqStore').getAt(0)
            //Ext.getCmp('winzyq').select(Ext.data.StoreManager.lookup('winzyqStore').getAt(0))
        }

        Ext.data.StoreManager.lookup('winzyqStore').load({

            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });


    });

    Ext.getCmp('winzyq').on('select', function () {
        Ext.data.StoreManager.lookup('winzclbStore').load({
            params: {
                'V_V_ORGCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('winzyq').getValue(),
                'V_V_DEPTCODENEXT': '%'

            }
        });
    });

    Ext.getCmp('winzclb').on('select', function () {});

    pageLoad();
});


function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue(); //Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_TYPECODE = Ext.getCmp('zclb').getValue(); //Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_BASECODE = Ext.getCmp('state').getValue();
    store.proxy.extraParams.V_V_TYPECODE = Ext.getCmp('winzclb').getValue();

}


function OnButtonAdd() {
    flag = 'TY';
    var seldata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
    if (Ext.getCmp("zyq").getValue() == "%") {
        alert('请选择一个作业区');
        return false;
    }else{
        if(Ext.getCmp('zclb').getValue() == '%'){
            alert('请选择一个总成类别');
            return false;
        }
    }

    Ext.getCmp('winyear').setValue();
    Ext.getCmp('winck').setValue();
    Ext.getCmp('winzyq').setValue();
    Ext.getCmp('winzclb').setValue();
    Ext.getCmp('winstate').setValue();
    Ext.getCmp('winqstext').setValue();




    Ext.data.StoreManager.lookup('winckStore').load({
        Params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    });

    Ext.data.StoreManager.lookup('winckStore').on('load',function(){
        Ext.getCmp('winck').select(Ext.getCmp('ck').getValue());
        Ext.data.StoreManager.lookup('winzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('winzyqStore').on('load', function () {
        if(Ext.getCmp('winck').getValue() == Ext.getCmp('ck').getValue()){
            Ext.getCmp('winzyq').select(Ext.getCmp('zyq').getValue());
        }else{
            Ext.getCmp('winzyq').select(Ext.data.StoreManager.lookup('winzyqStore').getAt(0));
        }

        // Ext.getCmp('winzyq').select(Ext.data.StoreManager.lookup('winzyqStore').getAt(0));
        Ext.data.StoreManager.lookup('winzclbStore').load({
            params: {
                'V_V_ORGCODE':Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('winzyq').getValue()
            }
        });
    });


    if(Ext.getCmp('zclb').getValue() != '%'){

        Ext.getCmp('winzclb').select(Ext.getCmp('zclb').getValue());


    }else{
        //Ext.data.StoreManager.lookup('winzclbStore').on('load',function(){
        Ext.getCmp('winzclb').select(Ext.data.StoreManager.lookup("winzclbStore").getAt(0));
        //});
    }


    Ext.getCmp('winyear').select(Ext.getCmp('year').getValue());

    if(Ext.getCmp('state').getValue() == '%'){

        Ext.getCmp('winstate').select(Ext.data.StoreManager.lookup("winstateStore").getAt(0));

    }
    else{
        Ext.getCmp('winstate').select(Ext.getCmp('state').getValue());
    }

    Ext.getCmp('win').show();

}
//编辑
function OnButtonEdit() {

    var seldata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
    if(seldata[0].raw.V_GUID != ' '){
        flag='edit';
    }else{
        flag='TY';

    }
    //非备件查询页面
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }

    Ext.getCmp('winyear').setValue(seldata[0].data.V_YEAR);
    Ext.getCmp('winck').setValue(seldata[0].data.V_ORGCODE);
    Ext.getCmp('winzyq').setValue(seldata[0].data.V_DEPTCODE);
    Ext.getCmp('winzclb').setValue(seldata[0].data.V_ZCCODE);
    Ext.getCmp('winstate').setValue(seldata[0].data.V_TYPE);
    Ext.getCmp('winqstext').setValue(seldata[0].data.V_COUNT);

    Ext.data.StoreManager.lookup('winckStore').load({
        Params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    });

    Ext.data.StoreManager.lookup('winckStore').on('load',function(){
        Ext.getCmp('winck').select(Ext.getCmp('ck').getValue());
        Ext.data.StoreManager.lookup('winzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('winzyqStore').on('load',function(){
        Ext.getCmp('winzyq').select(Ext.getCmp('zyq').getValue());
        Ext.data.StoreManager.lookup('winzclbStore').load({
            params: {
                'V_V_ORGCODE':Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('winzyq').getValue(),
            }
        });
    });

    Ext.getCmp('winzclb').select(Ext.getCmp('winzclb').getValue());

    // Ext.data.StoreManager.lookup('winzclbStore').on('load',function(){
    //     Ext.getCmp('winzclb').select(Ext.getCmp('winzclb').getValue());
    //     // if(Ext.getCmp('zclb').getValue() != '%'){
    //     //     // Ext.data.StoreManager.lookup('winzclbStore').on('load',function(){});
    //     //     Ext.getCmp('winzclb').select(Ext.getCmp('zclb').getValue());
    //     //
    //     // }else{
    //     //     Ext.getCmp('winzclb').select(Ext.data.StoreManager.lookup("winzclbStore").getAt(0));
    //     // }
    // });

    Ext.getCmp('win').show();

}



function save() {
    // var chodata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
    // if (chodata.length <= 0 || chodata.length != '') {
    if (flag == 'TY') {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PRO_PM_06_PLAN_DXGC_SAVE',
            method: 'POST',
            async: false,
            params: {
                V_V_YEAR: Ext.getCmp('winyear').getValue(),
                V_V_ORGCODE: Ext.getCmp('winck').getValue(),
                V_V_ORGNAME: Ext.getCmp('winck').rawValue,
                V_V_DEPTCODE: Ext.getCmp('winzyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
                V_V_DEPTNAME: Ext.getCmp('winzyq').rawValue,
                V_V_TYPECODE: Ext.getCmp('winzclb').getValue(),
                V_V_TYPEDESC: Ext.getCmp('winzclb').rawValue,
                V_V_BASECODE: Ext.getCmp('winstate').getValue(),
                V_V_BASENAME: Ext.getCmp('winstate').rawValue,
                V_V_QSTEXT: Ext.getCmp('winqstext').getValue()
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                alert('保存成功！');
                Ext.getCmp('win').hide();
                OnButtonQuery();
            }
        })

    }else {
        var seldata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
        //var seldata = Ext.data.StoreManager.lookup("gridStore").data.items;
        if (Ext.getCmp('mainpanel').getSelectionModel().getSelection()[0].data.sid != '') {
            Ext.Ajax.request({
                url: AppUrl + '/dxfile/PRO_PM_06_PLAN_DXGC_UPDATE',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID: Ext.getCmp('mainpanel').getSelectionModel().getSelection()[0].data.V_GUID,
                    V_V_YEAR: Ext.getCmp('winyear').getValue(),
                    V_V_ORGCODE: Ext.getCmp('winck').getValue(),
                    V_V_ORGNAME: Ext.getCmp('winck').rawValue,
                    V_V_DEPTCODE: Ext.getCmp('winzyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
                    V_V_DEPTNAME: Ext.getCmp('winzyq').rawValue,
                    V_V_TYPECODE: Ext.getCmp('winzclb').getValue(),
                    V_V_TYPEDESC: Ext.getCmp('winzclb').rawValue,
                    V_V_BASECODE: Ext.getCmp('winstate').getValue(),
                    V_V_BASENAME: Ext.getCmp('winstate').rawValue,
                    V_V_QSTEXT: Ext.getCmp('winqstext').getValue()
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    alert('保存成功！');
                    Ext.getCmp('win').hide();
                    OnButtonQuery();
                }
            });
        }
    }
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function timelfet(value, metaDate, record, rowIndex, colIndex, store) {
    metaDate.style = "text-align:left;";
    return '<div date-qtip="' + value + '" >' + value.toString().substring(0, 10) + '</div>';
}


function pageLoad() {
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

}


//查询
function OnButtonQuery() {

    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_TYPECODE : Ext.getCmp('zclb').getValue(),
            V_V_BASECODE:Ext.getCmp('state').getValue()

        }
    });

}

//删除
function OnButtonDel() {
    var chodata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
    if (chodata.length <= 0) {
        alert('请选择至少一条数据！');
        return;
    } else {
        for (var k = 0; k < chodata.length; k++) {

        }
        Ext.Msg.show({
            title: '提示',
            msg: '是否确认删除该计划?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
            fn: function (button) {
                if (button == "ok") {
                    deleteData();
                }
                else{
                    return false;
                }
            }
        });
    }
}


function deleteData(){
    var chodata = Ext.getCmp('mainpanel').getSelectionModel().getSelection();
    var num = 0;
    for (var j = 0; j < chodata.length; j++) {
        Ext.Ajax.request({
            url: AppUrl + '/dxfile/PRO_PM_06_PLAN_DXGC_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: chodata[j].data.V_GUID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_CURSOR == 'SUCCESS') {
                    num++;
                }else{
                    alert("删除中信息有误");
                    num++;
                }
            }
        });

        if (num == chodata.length) {
            alert("删除成功");
            OnButtonQuery();
        }
    }
}



