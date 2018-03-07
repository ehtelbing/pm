var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;
var zyStoreload = false;
var dt = new Date();
var thisYear = dt.getFullYear();
var  tomorrowYear = dt.getFullYear() + 1;
var years = [];
for (var i = 2012; i <= tomorrowYear; i++)
    years.push({
        displayField : i,
        valueField : i
    });
var V_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}
var stateData=[{ displayField:'全部', valueField:'%'},{ displayField:'编辑', valueField:'编辑'},{ displayField:'审批中', valueField:'审批中'},{ displayField:'审批通过', valueField:'审批通过'},{ displayField:'审批驳回', valueField:'审批驳回'}];

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {

    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sqxzt',
        fields: ['I_ID',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCETABLE',
            'V_SOURCEREMARK',
            'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {

            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('qxzt').select('defct01');
                zyStoreload = true;
                _init();
                _selectOverhaulApply();
            }
        }
    });





    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_07_DEFECT_VIEW_NEW',
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

    var grid6Store=Ext.create('Ext.data.Store',{
        id : 'grid6Store',
        pageSize : 20,
        autoLoad : false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYPRO',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid6Store
        }
    });
    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        region : 'north',
        header : false,
        frame : true,
        layout : 'column',
        style: 'background-color:#FFFFFF',
        baseCls: 'my-panel-no-border',
        defaults : {
            labelAlign : 'right',
            //labelWidth : 100,
            //inputWidth : 240,
            margin : '4,0,0,0'
        },
        items : [ {
            id: 'qxzt',
            xtype: 'combo',
            store: sqxzt,
            editable: false,
            fieldLabel: '缺陷类型',
            labelWidth:70,
            width: 180,
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        },{
            xtype : 'button',
            text : '查询',
            handler : _selectOverhaulApply
        },{
            xtype: 'button',
            text: '选择',
            handler : Select
        } ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        store : gridStore,
        title:'缺陷选择',
        frame : true,
        border: false,
        columnLines: true,
        region : 'west',
        width:'50%',
        /*selModel : {
         selType : 'checkboxmodel',
         mode : 'SINGLE'
         },*/
        selType: 'checkboxmodel',
        columns : [ {
            text : '序号',
            xtype : 'rownumberer',
            width : 40,
            sortable : false
        },{
            text : '单位',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, /*{
            text : '缺陷状态',
            dataIndex : 'V_STATENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        },*/ {
            text : '缺陷类型',
            dataIndex : 'V_SOURCENAME',
            align : 'center',
            width : 80,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷日期',
            dataIndex : 'D_DEFECTDATE',
            align : 'center',
            width : 150,
            renderer : CreateGridColumnTime
        }, {
            text : '缺陷明细',
            dataIndex : 'V_DEFECTLIST',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTd
        }, {
            text : '设备',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 150,
            renderer : CreateGridColumnTd
        }/*, {
            text : '设备位置',
            dataIndex : 'V_EQUSITE',
            align : 'center',
            width : 300,
            renderer : CreateGridColumnTd
        }, {
            text : '负责人',
            dataIndex : 'V_PERNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '处理意见',
            dataIndex : 'V_IDEA',
            align : 'center',
            renderer : CreateGridColumnTd
        }*/],
        listeners : {
            itemclick : itemclick
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var selectPanel = Ext.create('Ext.grid.Panel', {
        id : 'selectPanel',
        autoScroll : true,
        store : grid6Store,
        region:'center',
        //frame : true,
        width:'100%',
        //height:'80%',
        border: false,
        columnLines: true,
        selType: 'checkboxmodel',
        columns : [ {
            text : '序号',
            xtype : 'rownumberer',
            width : 40,
            sortable : false
        },{
            text : '单位',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 120
        }, {
            text : '缺陷类型',
            dataIndex : 'V_SOURCENAME',
            align : 'center',
            width : 80
        }, {
            text : '缺陷日期',
            dataIndex : 'D_DEFECTDATE',
            align : 'center',
            width : 150
        }, {
            text : '缺陷明细',
            dataIndex : 'V_DEFECTLIST',
            align : 'center',
            width : 200
        }, {
            text : '设备',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 150
        }]
    });

    var centerpanel=Ext.create('Ext.panel.Panel',{
        id:'centerpanel',
        region:'east',
        layout:'border',
        width:'50%',
        //autoScroll : true,
        items:[{xtype:'panel', region:'west',width:'100%',layout:'border',frame:true,title:'已选择',autoScroll : true,
            items:[{xtype:'panel', width:'100%', region:'north',layout:'hbox',frame:true,//baseCls: 'my-panel-no-border',
                items:[
                    {
                        xtype: 'button',
                        text: '删除',
                        icon: imgpath + '/delete.png',
                        handler: _delete,
                        style: 'margin: 5px 0px 0px 10px'
                    }]},selectPanel
            ]}

            ]
    });

    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        autoScroll : true,
        items : [ inputPanel,overhaulApplyPanel,centerpanel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
            X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
    // _selectOverhaulApply();
})

function _init() {
    if(zyStoreload)
    {
        zyStoreload = false;
        QueryGrid6();
        Ext.getBody().unmask();//去除页面笼罩
    }
}
function beforeGrid6Store(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_FLAG = '0';
}

function _selectOverhaulApply() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}



function OnBtnSxQx() {
    var length = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection().length;
    if (length != 1) {
        alert('请选择一条数据进行修改');
    } else {
        var GUID = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + "page/PM_070201/index.html?V_GUID=" + GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}
function createWorkorder(){

    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    for (i = 0; i < records.length; i++) {

        console.log("V_GUID="+records[i].data.V_GUID);
        console.log("V_EQUTYPECODE="+records[i].data.V_EQUTYPECODE);
        console.log("V_SOURCECODE="+records[i].data.V_SOURCECODE);
        if(records[i].data.V_STATECODE=='10'){
            var param="";
            try {
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                if(url_guid!=undefined){
                    param="&&url_guid="+url_guid;
                }else{
                    param="";
                }
                var ret = window.open(AppUrl+'page/PM_090201/index.html?V_GUID='
                    + records[i].data.V_GUID + '&V_EQUTYPECODE='+records[i].data.V_EQUTYPECODE+"&V_SOURCECODE="+records[i].data.V_SOURCECODE+param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            } catch (e) {
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                if(url_guid!=undefined){
                    param="&&url_guid="+url_guid;
                }else{
                    param="";
                }
                var ret = window.open(AppUrl+'page/PM_090201/index.html?V_GUID='
                    + records[i].data.V_GUID+"&V_SOURCECODE="+records[i].data.V_SOURCECODE + ''+param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            }
        }else{
            Ext.MessageBox.alert('操作信息', '该缺陷已下票，请重新选择！');
            return;
        }
    }




}

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    var time=value.split('.')[0];
    return time;
}


function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}

function ReadGD(value, metaData) {
    if (Ext.getCmp('tabid').getValue() == 'defct01') {

        Ext.getCmp('gdh').show();
        return '<div><a href="javascript:OnClickGD(\'' + value + '\')">' + value + '</a></div>';
    } else {
        Ext.getCmp('gdh').hide();
    }
}

function Select(){
    /*var seldata = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
    if (seldata.length==0) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }

    for (var j = 0; j < seldata.length; j++) {
        if(seldata[0].data.V_EQUNAME!=seldata[j].data.V_EQUNAME){
            alert("请选择同一设备缺陷");
            return;

        }

    }
    var num = 0;
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_DELBYPRO',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {

                for (var i = 0; i < seldata.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_DEFECT_GUID: seldata[i].data.V_GUID,
                            V_V_PROJECT_GUID: V_GUID
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            if (resp.V_INFO == 'success') {
                                num++;
                            }

                        }
                    });
                }
            }else{
                alert("子数据清除错误");
            }

        }
    });

    if (num == seldata.length) {*/
        window.opener.getReturnQX();
        window.close();
   /* } else {
        alert("缺陷添加错误");
    }
*/




}
function closeSelf(){
    window.close();
    window.opener.query();
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function _delete(){
    var seldata = Ext.getCmp('selectPanel').getSelectionModel().getSelection();
     if (seldata.length==0) {
     Ext.Msg.alert('操作提示','请至少选择一条数据！');
     return false;
     }
     var num = 0;

    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_DELBYPD',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECT_GUID: seldata[i].data.V_GUID,
                V_V_PROJECT_GUID: V_GUID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == 'success') {
                    num++;
                }

            }
        });
    }


    if (num == seldata.length) {
        QueryGrid6();
    } else {
        alert("删除失败");
    }
}
function QueryGrid6(){
    Ext.data.StoreManager.lookup('grid6Store').load({
        params:{
            V_V_PROJECT_GUID:V_GUID,
            V_V_FLAG:'0'
        }
    });


}
function itemclick(s, record, item, index, e, eOpts) {
    if(Ext.getStore("gridStore").data.length!=0){
        if(Ext.getStore("gridStore").getAt(0).get("V_EQUNAME")!=Ext.getStore("gridStore").getAt(index).get("V_EQUNAME")){
            alert("请选择同一设备缺陷");
            return;
        }
    }

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
        method: 'POST',
        async: false,
        params: {
            V_V_DEFECT_GUID: record.data.V_GUID,
            V_V_PROJECT_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {
                QueryGrid6();
            }

        }
    });
}