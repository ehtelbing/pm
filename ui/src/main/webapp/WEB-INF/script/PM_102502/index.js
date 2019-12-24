
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

    var wpanel=Ext.create('Ext.tree.Panel', {
        id: 'wpanel',
        region: 'west',
        width: 200,
        height:'100%',
        store: equtree,
        rootVisible: false,
        autoScroll: true,
        listeners: {
            itemclick: OnClickTreeItem
        }
    });

    Ext.create('Ext.container.Viewport', {

        layout: 'border',
        items: [tpanel, wpanel]
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
        // // store.insert(0,{V_BAENAME:'全部'});
        // // store.insert(1,{V_BAENAME:'编辑'});
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
        treeReLoad();
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
    QueryTree();
    //  QueryZyFzr();
    updateLoad();
});
function pageLoad() {

    QueryZYQ();
    // QueryZyFzr();
    QueryDefect();
}

function treeReLoad() {
    // var st = Ext.getCmp('sectTree').store;
    var st = Ext.getCmp('wpanel').store;
    st.proxy.extraParams =
        {V_V_PERSONCODE: "aqjf", V_V_DEPTCODENEXT: "99060206"};
    // Ext.getCmp('sectTree').store.load();
    st.load();
}

function QueryTree() {
    // Ext.getCmp('sectTree').store.setProxy({
    Ext.getCmp('wpanel').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'tree/EQU_SELECT_FROM_DEPT_TO_WX',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get("v_personcode"),
            V_V_DEPTCODENEXT: V_DEPTCODE
        }
    });
    // Ext.getCmp('sectTree').store.load();
    Ext.getCmp('wpanel').store.load();
    // QueryZyFzr();
    Ext.getBody().unmask();

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

//创建工程编码
/*function CreateProjectCode(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECTCODE_C',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_ORGCODE:OrgCode,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                Ext.getCmp('ProjectCode').setValue(resp.V_V_PROJECT_OUT);
            }
        }
    });
}*/

//临时保存
function btnSaveProject() {

    Ext.Ajax.request({
        url:AppUrl + 'dxfile/PRO_PM_06_PLAN_DXGC_UPDATE',
        method:'POST',
        async:false,
        params:{
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_ORGCODE: OrgCode,
            V_V_ORGNAME: OrgName,
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_DEPTNAME: Ext.getCmp('zyq').rawValue,
            V_V_TYPECODE: Ext.getCmp('zclb').getValue(),
            V_V_TYPEDESC: Ext.getCmp('zclb').rawValue,
            V_V_BASECODE: Ext.getCmp('state').getValue(),
            V_V_QSTEXT: Ext.getCmp('qstext').getValue()
        }


    }),
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
                    // Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"大修计划编制");
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

//缺陷查看更多
function OnLookMoreDefect() {

}

function Onjjfa(value, metaDate, record, rowIndex, colIndex, store) {
    // return '<a href="javascript:onJjfa(\'' + record.data.V_GUID +'\',\''+record.data.V_EQUCODE+'\')">解决方案</a>';
    // return '<button  onclick="onJjfa(\'' + record.data.V_GUID +'\',\''+record.data.V_EQUCODE+'\')">解决方案</button>';
    var id = 'jjfa' + value;
    Ext.defer(function () {
        Ext.widget('button', {
            icon: dxImgPath + '/accept.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 110,
            text: '解决方案',
            margin: 'padding:10px 50px 10px 10px;',
            handler: function () {
                onJjfa(record.data.V_GUID, record.data.V_EQUCODE);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
}

function Onbjcl(value, metaDate, record, rowIndex, colIndex, store) {
    // return '<a href="javascript:onBjcl(\'' + record.data.V_GUID +'\',\''+record.data.V_EQUCODE+'\')">备件材料</a>';
    var id = 'bjcl' + value;
    Ext.defer(function () {
        Ext.widget('button', {
            icon: dxImgPath + '/accept.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 110,
            text: '备件材料',
            margin: 'padding:10px 50px 10px 10px;',
            handler: function () {
                onBjcl(record.data.V_GUID, record.data.V_EQUCODE);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
}

//缺陷解决编辑
function OnChangeEleData(def_guid) {

    Ext.Ajax.request({
        url: AppUrl + "dxfile/DEFECT_BY_MAINTAIN_JJFA_SEL",
        method: 'POST',
        params: {
            V_DEFGUID: def_guid,//record.data.V_GUID,
            V_PRO_GUID: Guid
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText)
            if (resp.RET == 'SUCCESS') {
                if (Ext.getCmp("jjfa") != undefined) {
                    Ext.getCmp("jjfa").setValue(resp.JJFA);
                }
                if (Ext.getCmp("bjcl") != undefined) {
                    Ext.getCmp("bjcl").setValue(resp.BJCL);
                }
            }
        }
    });
    // return '<a href="javascript:onJjfa(\'' + record.data.V_GUID +','+record.data.V_EQUCODE+'\')">解决方案</a>'+'  '+'|'+'  '+'<a href="javascript:onBjcl(\'' + record.data.V_GUID + ','+record.data.V_EQUCODE+'\')">备件材料</a>';
}

function onJjfa(defectguid, equcode) {
    OnChangeEleData(defectguid);
    Ext.getCmp("JJFAWIN").show();
    DTdefectguid = defectguid;
    DTequcode = equcode;
}

function onBjcl(defectguid, equcode) {
    OnChangeEleData(defectguid);
    Ext.getCmp("BJCLWIN").show();
    DTdefectguid = defectguid;
    DTequcode = equcode;
}

//解决方案+备件材料保存
function saveJB() {
    var v_jjfa = "";
    var v_bjcl = "";
    if (Ext.getCmp("jjfa") != undefined) {
        v_jjfa = Ext.getCmp("jjfa").getValue();
    }
    if (Ext.getCmp("bjcl") != undefined) {
        v_bjcl = Ext.getCmp("bjcl").getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_IN',
        method: 'POST',
        params: {
            V_PROGUID: Guid,
            V_DEFECTGUID: DTdefectguid,//defectguid,//e.context.record.data.V_GUID,
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INDEPT: Ext.util.Cookies.get('v_deptcode'),
            V_INORG: Ext.util.Cookies.get('v_orgCode'),//decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_DEF_SOLVE: v_jjfa,// e.context.record.data.DEF_SOLVE,
            V_BJ_STUFF: v_bjcl,// e.context.record.data.BJ_STUFF,
            V_EQUCODE: DTequcode//equcode//e.context.record.data.V_EQUCODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "SUCCESS") {
                QueryDefect();
                Ext.getCmp("jjfa").setValue("");
                Ext.getCmp("JJFAWIN").close();
                Ext.getCmp("bjcl").setValue("");
                Ext.getCmp("BJCLWIN").close();
                // alert("添加成功");
            }
        }
    });
}

// 设备树点击事件
function OnClickTreeItem(store, record) {

    if (record.data.leaf == true) {
        equcode = record.data.id;
        equname = record.data.text;
        equtype = record.data.V_EQUTYPECODE;
        equstie = record.data.V_EQUSITE;
        QueryQxByEqu(equcode);
        var ret=window.open(AppUrl + 'page/PM_03040101/defect.html?INGUID=' + Guid +
            "&INDEPTCODE=" + Ext.getCmp('zyq').getValue() +
            "&INEQUCODE=" + equcode +
            "&INEQUTYPE="+equtype, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
        // Ext.getCmp("aqadd").show();
    }
}





function upfile(value) {
    fjDefect = value;
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_GUID: fjDefect
        }
    });
    Ext.getCmp('win').show();

}


function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.FILE_CODE + '\')">删除</a>';
}


function filequery(fjDefect) {
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_GUID: fjDefect
        }
    });
}

function QueryQxByEqu(equcode) {
    Ext.data.StoreManager.lookup('dqxgridStore').load({
        params: {
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_EQUCODE: equcode,
            V_V_STATECODE: '10'
        }
    });
}

//查询已选中缺陷
function QueryDefect() {
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params: {
            V_V_PROJECT_GUID: Guid
        }
    });
}