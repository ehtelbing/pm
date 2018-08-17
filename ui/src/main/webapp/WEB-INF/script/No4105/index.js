/*Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath({
    "com.store":"../../com/store",
    "com.view": "../../com/view",
    "com.util": "../../com/util"
});*/

Ext.onReady(function () {

    Ext.QuickTips.init();
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,
        storeId : 'ckstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });


    var treeStore = Ext.create('Ext.data.TreeStore', {
        id : 'treeStore',
        autoLoad: false,
        fields : ['sid', 'text', 'parentid']
    })

    var form = Ext.create('Ext.form.Panel', {

        region: 'north',
        defaults: {
            labelAlign: 'right',
            labelWidth: 60
        },
        frame: true,
        layout: {
            type: 'column'
        },
        items: [

            { id: 'ck', xtype: 'combo', fieldLabel: '厂矿名称', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local', store: ckstore },
            { id: 'zyq', xtype: 'combo', fieldLabel: '作业区', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local', store: zyqstore },
            { id: 'add', xtype: 'button', text: '新增预装件', style: 'margin: 0px 0px 0px 10px' },
            { id: 'del', xtype: 'button', text: '删除预装件', style: 'margin: 0px 0px 0px 10px' },

            //树类型
            {id: 'x_equtypenameH', xtype: 'hidden', value: '' },
            { id: 'x_equtypecoedH', xtype: 'hidden', value: '' },
            { id: 'x_modelnumber', xtype: 'hidden', value: '' },

            { id: 'PtreeID', xtype: 'hidden', value: '' },
            { id: 'treeID', xtype: 'hidden', value: '' }


        ]
    });

    var tree = Ext.create('Ext.tree.Panel', {
        id: 'tree',
        title: '',
        region: "west",
        width: 200,
        border: 0,
        store: treeStore,
        rootVisible: false
    });


    Ext.create('Ext.container.Viewport', {
        split: true, autoScroll: true,
        layout: 'border',
        items: [form, tree,

            { xtype: 'panel', region: 'center', html: '<iframe name="na" id="na" frameborder="0" width="100%" height="100%" src=""/> ' }

        ]
    });
    Ext.data.StoreManager.lookup('ckstore').on("load", function() {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':   Ext.getCmp("ck").getValue(),
                'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE':'[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
    });

    Ext.getCmp("ck").on("select",function() {
        Ext.getCmp('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[主体作业区]'
            }
        });
    });

    Ext.getCmp("zyq").on("change", function () {
        QueryTree();

    })



    tree.on('itemclick', function (view, record, item) {

        if (!record.get('leaf')) {

            Ext.getCmp("x_equtypenameH").setValue(record.data.text);
            Ext.getCmp("x_equtypecoedH").setValue(record.data.sid);



        } else {

            na.location.href = "../../page/No410502/Index.html?x_modelnumber=" + record.data.sid;

            Ext.getCmp("x_equtypenameH").setValue(record.parentNode.data.text);
            Ext.getCmp("x_equtypecoedH").setValue(record.parentNode.data.sid);

            Ext.getCmp("x_modelnumber").setValue(record.data.sid);



            //Ext.getCmp("PtreeID").setValue(record.parentNode.data.id);
            //Ext.getCmp("treeID").setValue(record.data.id);

        }

    });


    Ext.getCmp("del").on("click",function(){

        if(Ext.getCmp("x_modelnumber").getValue()!="" && Ext.getCmp("x_modelnumber").getValue()!=null){

            Ext.Ajax.request({
                url: AppUrl + '/No4120/DELETE_PRELOADWARE',
                method: 'POST',
                async: false,
                params: {
                    X_MODELNUMBER:Ext.getCmp("x_modelnumber").getValue()
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.list == "success") {
                        Ext.Msg.alert("消息","删除成功");
                        window.location.reload();
                       // location.href = APP + "/page/No4105/Index.html";
                    } else {
                       null;

                    }
                  }
            });
        }else{

            Ext.Msg.alert("消息","请选择备件,再进行删除");

        }
    });

    //点击加号加载

    Ext.getCmp("tree").on("beforeload",function(store,operation){
        if(operation.node.data.parentid==-1) {
            Ext.apply(store.proxy.extraParams, {
                    X_DEPTCODE: Ext.getCmp('zyq').getValue(),
                    X_EQUTYPECODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'tree/QUERY_DEPT_EQUTYPE_PRELOADWARE_tree')
        }
    });

    Ext.getCmp("add").on("click", function () {


        if (Ext.getCmp("x_equtypenameH").getValue() != "" && Ext.getCmp("x_equtypecoedH").getValue() != "") {

            na.location.href = "../../page/No410501/Index.html?x_equtypename=" + Ext.getCmp("x_equtypenameH").getValue() +
                "&x_equtypecode=" + Ext.getCmp("x_equtypecoedH").getValue() +
                "&x_deptname=" + Ext.getCmp("zyq").getRawValue() +
                "&x_deptcode=" + Ext.getCmp("zyq").getValue();
        } else {

            Ext.Msg.alert("消息", "请选择设备类型");
        }
    });


});

function QueryTree(){
    Ext.getCmp('tree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'tree/PRO_GET_DEPTEQUTYPE_PER_tree',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_PERSONCODE:Ext.util.Cookies.get("v_personcode"),
            V_V_DEPTCODENEXT:Ext.getCmp("zyq").getValue()
        }
    });
    Ext.getCmp('tree').store.load();
}