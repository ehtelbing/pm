
/*维修计划简版添加页面new*/
var Guid = "";
var processKey = "";
var V_STEPNAME = "";
var V_NEXT_SETP = "";
var OrgCode = Ext.util.Cookies.get('v_orgCode');//"";
var OrgName = decodeURI(Ext.util.Cookies.get("v_orgname"));
var V_DEPTCODE = "";
var V_ZCCODE = "";
var Year = "";
var fjDefect = "";
var equcode = "";
var equname = "";
var equtype = "";
var equstie = "";
var DTdefectguid = "";
var DTequcode = "";
var SIGN = "";
var DeptCode = "";
var ZCLB = "";
var LB = "";
var QSTEXT = "";
if (Ext.urlDecode(location.href.split("?")[1]) != undefined) {
    Guid = Ext.urlDecode(location.href.split('?')[1]).guid == null ? "" : Ext.urlDecode(location.href.split('?')[1]).guid;
    Year = Ext.urlDecode(location.href.split('?')[1]).year == null ? "" : Ext.urlDecode(location.href.split('?')[1]).year;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE == null ? "" : Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    SIGN = Ext.urlDecode(location.href.split('?')[1]).sign == null ? "" : Ext.urlDecode(location.href.split('?')[1]).sign;
}
Ext.onReady(function(){
    //Ext.getBody().mask();
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


    var zyqStore = Ext.create("Ext.data.Store", {
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
            }
        }
    });

    var zclbStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zclbStore',
        fields: ['V_TYPECODE','V_TYPEDESC'],
        // fields: ['V_STATECODE', 'V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_TYPEDESC_SEL',
            // url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_STATE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var equtree = Ext.create('Ext.data.TreeStore', {
        id: 'equtree',
        autoLoad: false,
        fields: ['id', 'text', 'parentid', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME']
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
                'IS_V_BASETYPE': 'DX/TYPE'
            }
        }
    });


    var tpanel=Ext.create('Ext.panel.Panel', {
        region: 'north',
        frame: true,
        layout: {type:'table',columns:'4'},
        id: 'tpanel',
        width:'100%',
        height:'100%',
        titleAlign: 'center',
        defaults: {labelAlign: 'right'},
        items: [
            {
                xtype: 'combo',
                id: 'ck',
                store: ckStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂  矿',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                margin: '5 5 5 5',
                labelWidth: 80,
                labelAlign: 'right'
            },
            {
                xtype: 'combo',
                id: "zyq",
                store: zyqStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                margin: '5 5 5 5',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                labelAlign: 'right'
            },{
                xtype: 'combo',
                editable: false,
                queryMode: 'local',
                fieldLabel: '总成类别',
                id:'zclb',
                store:zclbStore,
                displayField: 'V_TYPEDESC',
                valueField: 'V_TYPECODE',
                labelWidth: 80,
                margin: '5 5 5 5'
            },
            {
                xtype: 'combo',
                editable: false,
                queryMode: 'local',
                fieldLabel: '类  别',
                id: 'state',
                store:stateStore,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                labelWidth: 80,
                margin: '5 5 5 5'
            },
            {
                xtype: 'textareafield',
                id: 'qstext',
                name: 'message',
                fieldLabel: '维修内容',
                margin: '30 5 5 5',
                position: 'absolute',
                labelWidth: 80,
                width:520,
                height: 90,
                colspan:2
            },
            {xtype:'panel',frame:true,width:'100%',layout:'column',  baseCls: 'my-panel-no-border',
                items:[{
                    xtype: 'button',
                    text: '临时保存',
                    margin: '65 5 5 5',
                    iconCls: 'buy-button',
                    icon: dxImgPath + '/lsbc.png',
                    handler: btnSaveProject
                }]}
        ]
    });



    Ext.create('Ext.container.Viewport', {

        layout: 'border',
        items: [tpanel]
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

    Ext.data.StoreManager.lookup('zclbStore').on('load', function () {
        //Ext.data.StoreManager.lookup('zclbStore').insert(0,{V_GUID:'%', V_ZYMC:'全部'});
        Ext.getCmp('zclb').select(Ext.data.StoreManager.lookup('zclbStore').getAt(0));
        // OnButtonQuery();

    });
    Ext.data.StoreManager.lookup('stateStore').on('load',function(store,records){
        //store.insert(0,{V_BASENAME:'全部',V_BASECODE:'%'});
        // store.insert(1,{V_BASENAME:'编辑'});
        //Ext.data.StoreManager.lookup('stateStore').insert(0,{V_GUID:'%', V_ZYMC:'全部'});
        Ext.getCmp('state').select(Ext.data.StoreManager.lookup("stateStore").getAt(0));

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

        // var treeS=Ext.data.StoreManager.lookup("equtree");
        // treeS.proxy.extraParams={
        //     V_V_PERSONCODE:Ext.util.Cookies.get("v_personcode"),
        //     V_V_DEPTCODENEXT:V_DEPTCODE
        // };
        // treeS.load();
        // 作业区更改，树重新加载
        QueryZyFzr();
    });

    Ext.getCmp('state').on('select',function(){
        // Ext.data.StoreManager.lookup('stateStore').load({
        //     params: {
        //         'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        //         'V_V_DEPTCODE': Ext.getCmp('state').getValue()
        //     }
        // });
        OnButtonQuery();
    });

    pageLoad();


});
function pageLoad() {

}





function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function timelfet(value, metaDate, record, rowIndex, colIndex, store) {
    metaDate.style = "text-align:center;";
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


//临时保存
function btnSaveProject() {
    Ext.Ajax.request({
        url:AppUrl + 'dxfile/PRO_PM_06_PLAN_DXGC_SAVE',
        method:'POST',
        async:false,
        params:{
            V_V_YEAR:Year,
            V_V_ORGCODE: OrgCode,
            V_V_ORGNAME: OrgName,
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_DEPTNAME: Ext.getCmp('zyq').rawValue,
            V_V_TYPECODE: Ext.getCmp('zclb').getValue(),
            V_V_TYPEDESC: Ext.getCmp('zclb').rawValue,
            V_V_BASECODE: Ext.getCmp('state').getValue(),
            V_V_QSTEXT: Ext.getCmp('qstext').getValue()
        },
        // success: function (resp) {
        //     var resp = Ext.decode(resp.responseText);
        //     if (resp.V_INFO == '成功') {
        //          alert('保存成功！');
        //         //缺陷日志写入-new
        //         var STAT = "IN";
        //         newDefectLog(STAT);
        //         //缺陷日志写入-old
        //
        //     }
        // }

    })
    alert('保存成功！');
    window.opener.selectGridTurn();
    window.close();
}



function updateLoad() {
    if (SIGN == "UPDATE") {
        Ext.Ajax.request({
            url: AppUrl + '/dxfile/PRO_PM_06_PLAN_DXGC_SEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: Guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.list != null) {
                    Guid = resp.list[0].V_GUID;// Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"大修计划编制");
                    Year = resp.list[0].V_YEAR;
                    OrgCode = resp.list[0].V_ORGCODE;
                    OrgName = resp.list[0].V_ORGNAME;
                    DeptCode = resp.list[0].V_DEPTCODE;


                    Ext.getCmp("state").setValue(resp.list[0].V_TYPE);
                    Ext.getCmp("qstext").setValue(resp.list[0].V_COUNT);



                }
            }
        });
    }
}

