var V_V_JXGX_CODE = null;
var V_ORDERGUID = null;
var V_EQUCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}

var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_FLAG', 'V_CARINFO','V_EQUCODE','V_EQUNAME','V_EQUSITE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridXXStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridXXStore',
    fields: ['I_ID',
        'V_ORDERID',
        'V_CARCODE',
        'D_DATETIME_WITE',
        'V_DD_WITE',
        'V_WP_WITE',
        'V_MEMO',
        'D_DATE_CF',
        'D_DD_CF',
        'D_DATE_LK',
        'D_DATE_NEXT_MDD',
        'V_PERCODE_INPUT',
        'V_PERCODE_SJ',
        'V_LXRDH',
        'V_CARNAME',
        'V_CARTYPE',
        'V_CARGUISUO',
        'V_FLAG',
        'V_FLAG'

    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PRO_WORKORDER_CARSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            border: false,
            region: 'north',
            layout: 'column',
            frame: true,
            //height:'5%',
            defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {xtype: 'textfield', fieldLabel: '车辆名称', labelWidth: 90, id: 'carname'},
                {
                    xtype: 'button',
                    text: '查询',
                    handler: queryGrid,
                    icon: imgpath + '/search.png',
                    style: {margin: ' 5px 0 5px 10px'}
                },
                {
                    xtype: 'button', text: '选择', handler: function () {
                    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
                    if (seldata.length == 0) {
                        alert('请选择一条数据！');
                    }else{
                        addDetailInfo();
                        /*Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){
                                select();
                            }
                        })*/
                    }
                }, icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}
                },{
                    xtype: 'button',
                    text: '确定',
                    handler: select,
                    icon: imgpath + '/search.png',
                    style: {margin: ' 5px 0 5px 10px'}
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            height:'35%',

            selType: 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            listeners: {
                //itemclick: OnClickGrid
                //itemdblclick: OnClickGrid
            },
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '车辆编码', align: 'center', width: 150, dataIndex: 'V_CARCODE'
                },
                {
                    text: '车辆名称', align: 'center', width: 150, dataIndex: 'V_CARNAME'
                },
                {
                    text: '车辆类型', align: 'center', width: 150, dataIndex: 'V_CARTYPE'
                },
                {
                    text: '车辆归属', align: 'center', width: 150, dataIndex: 'V_CARGUISUO'
                },
                {
                    text: '车辆状态', align: 'center', width: 150, dataIndex: 'V_FLAG'
                },
                {
                    text: '车辆信息', align: 'center', width: 150, dataIndex: 'V_CARINFO'
                },
                {
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_TIME', renderer: AtEdit,
                    editor:{xtype: 'numberfield'},hidden:true
                },
                {
                    text: '设备编码', align: 'center', width: 150, dataIndex: 'V_EQUCODE'
                },
                {
                    text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'
                },
                {
                    text: '功能位置', align: 'center', width: 150, dataIndex: 'V_EQUSITE'
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'south', columnLines: true, id: 'gridXX', store: 'gridXXStore',
            selType: 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            height:'60%',
            title:'已选择',
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '车辆编码', align: 'center', width: 150, dataIndex: 'V_CARCODE'
                },
                {
                    text: '车辆名称', align: 'center', width: 150, dataIndex: 'V_CARNAME'
                },
                {
                    text: '车辆类型', align: 'center', width: 150, dataIndex: 'V_CARTYPE'
                },
                {
                    text: '车辆归属', align: 'center', width: 150, dataIndex: 'V_CARGUISUO'
                },
                {
                    text: '车辆状态', align: 'center', width: 150, dataIndex: 'V_FLAG'
                },
                {
                    text: '车辆信息', align: 'center', width: 150, dataIndex: 'V_CARINFO'
                },
                {
                    text: '等候时间', align: 'center', width: 150, dataIndex: 'D_DATETIME_WITE'
                },
                {
                    text: '等候地点', align: 'center', width: 150, dataIndex: 'V_DD_WITE'
                },
                {
                    text: '运输物品', align: 'center', width: 150, dataIndex: 'V_WP_WITE'
                },
                {
                    text: '备注', align: 'center', width: 150, dataIndex: 'V_MEMO'
                },
                {
                    text: '联系人电话', align: 'center', width: 150, dataIndex: 'V_LXRDH'
                },
                {
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_TIME', renderer: AtEdit,
                    editor:{xtype: 'numberfield'},hidden:true
                }
            ]
        }
    ]
};

function select() {
    var seldata = Ext.getCmp('gridXX').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请在已选择中选择数据进行操作！');
        return false;
    }
    /*Ext.Msg.confirm("提示", "确定要选择？", function (button) {
        if(button == 'yes'){*/
            //addDetailInfo();
           // var count=Ext.getCmp('gridXX').getStore().getCount();
            //var seldata = Ext.getCmp('gridXX').getStore();
            var retdata = [];
            for (var i = 0; i < seldata.length; i++) {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'basic/PM_1917_JXMX_JJ_CHANGE',
                    params: {
                        V_V_JXGX_CODE: V_V_JXGX_CODE,
                        V_V_JJCODE: seldata[i].data.V_CARCODE,
                        V_V_TS: seldata[i].data.V_TIME
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);
                        if(i ==  seldata.length-1){
                            retdata.push(seldata[i].data.V_CARNAME);
                        }
                        else{
                            retdata.push(seldata[i].data.V_CARNAME+',');
                        }
                    }
                });
            }
            window.opener.getReturnJXCAR(retdata);
            window.close();
        /*}else{

        }
    })*/

}
//等候地点
var dhstore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'dhstore',
    fields : ['V_DROP', 'V_DROP'],
    proxy : {
        type : 'ajax',
        async : false,
        url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_CLOUMSNAME:'v_dd_wite'
        }
    }
});
//运输物品
var yswpstore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'yswpstore',
    fields : ['V_DROP', 'V_DROP'],
    proxy : {
        type : 'ajax',
        async : false,
        url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_CLOUMSNAME:'v_wp_wite'
        }
    }
});

//联系人和电话
var lxrstore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'lxrstore',
    fields : ['V_DROP', 'V_DROP'],
    proxy : {
        type : 'ajax',
        async : false,
        url :  AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_DROP',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_CLOUMSNAME:'V_LXRDH'
        }
    }
});
var window = Ext.create('Ext.window.Window', {
    id: 'window',
    width: 450,
    height: 280,
    layout: 'vbox',
    title: '添加详细信息',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{id:'cl',
        xtype:'combo',
        fieldLabel:'车 辆',
        labelAlign:'right',
        labelWidth:100,
        width:360,
        style : ' margin: 10px 0px 5px 0px',
        editable:false,
        //store:clstore,
        valueField:'V_CARCODE',
        displayField:'V_CARTEXT',
        hidden:true
    }, {xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'mu-panel-no-border',
        items: [{
            id : 'dhtime',
            xtype : 'datefield',
            editable : false,
            format : 'Y/m/d',
            value : new Date(),//new Date().getHours()
            fieldLabel : '等候时间',
            labelWidth : 100,
            labelAlign:'right',
            width:220,
            style : ' margin: 15px 0px 5px 0px',
            baseCls : 'margin-bottom'
        },
            {
                xtype : 'numberfield',
                id : 'shi',
                width : 60,
                value : new Date().getHours(),
                minValue:0,
                maxValue:59,
                selectOnFocus : true,
                labelAlign : 'right',
                style : 'margin: 15px 0px 5px 10px'
            },
            {
                xtype : 'numberfield',
                id : 'fen',
                width : 60,
                value : new Date().getMinutes(),
                minValue:0,
                maxValue:59,
                selectOnFocus : true,
                labelAlign : 'right',
                style : 'margin: 15px 0px 5px 10px'
            }]
    },
        {id:'dhdd',
            xtype:'combo',
            fieldLabel:'等候地点',
            labelAlign:'right',
            labelWidth:100,
            width:360,
            style : ' margin: 15px 0px 5px 0px',
            editable:true,
            store:dhstore,
            valueField:'V_DROP',
            displayField:'V_DROP' ,
            fieldStyle:'background-color:#ffffcc;background-image:none;',
            queryMode: 'local'
        }, {id:'yswp',
            xtype:'combo',
            fieldLabel:'运输物品',
            labelAlign:'right',
            labelWidth:100,
            width:360,
            style : ' margin: 15px 0px 5px 0px',
            editable:true,
            store:yswpstore,
            valueField:'V_DROP',
            displayField:'V_DROP',
            fieldStyle:'background-color:#ffffcc;background-image:none;',
            queryMode: 'local'
         }, { id: 'bz',
            xtype: 'textfield',
            fieldLabel: '备 注',
            labelAlign: 'right',
            style: 'margin:15px 0px 5px 0px',
            labelWidth: 100,
            width: 360 ,
            fieldStyle:'background-color:#ffffcc;background-image:none;'
        }, {id:'lxrdh',
            xtype:'combo',
            fieldLabel:'联系人和电话',
             labelAlign:'right',
            labelWidth:100,
             width:360,
            style : ' margin: 15px 0px 15px 0px',
            editable:true,
            fieldStyle:'background-color:#ffffcc;background-image:none;',
            store:lxrstore,
            valueField:'V_DROP',
            displayField:'V_DROP',
            queryMode: 'local'
        }
    ],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            detailInfoSave();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('window').hide();
        }
    }]
});

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
    QueryXXGrid();
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_CARNAME: Ext.getCmp('carname').getValue(),
            V_V_EQUCODE:V_EQUCODE
        }
    });
}

function addbtn() {
    Ext.getCmp('wincarcode').setValue('');
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('');
    Ext.getCmp('wintime').setValue('');
    Ext.getCmp('winde').setValue('');
    selid = "";
    Ext.getCmp('window').show();
}

function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    selid = seldata[0].data.I_ID;
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
    Ext.getCmp('wintime').setValue(seldata[0].data.V_TIME);
    Ext.getCmp('winde').setValue(seldata[0].data.V_DE);
    Ext.getCmp('window').show();

}

function delbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_PM_19_CARDE_DEL',
            method: 'POST',
            async: false,
            params: {
                I_I_ID: seldata[i].data.I_ID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);

            }
        });
    }
    queryGrid();

}

function save() {
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_PM_19_CARDE_EDIT',
        method: 'POST',
        async: false,
        params: {
            I_I_ID: selid,
            V_V_CARCODE: Ext.getCmp('wincarcode').getValue(),
            V_V_CARNAME: Ext.getCmp('wincarname').getValue(),
            V_V_CARTYPE: Ext.getCmp('wincartype').getValue(),
            V_V_TIME: Ext.getCmp('wintime').getValue(),
            V_V_DE: Ext.getCmp('winde').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('window').hide();
            queryGrid();
        }
    });
}


function getReturnValue(seldata) {
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
}

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}
function addDetailInfo() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length ==0) {
        alert('请至少选择一条数据进行添加！');
        return false;
    }
    Ext.getCmp('dhtime').setValue(new Date());
    Ext.getCmp('shi').setValue(new Date().getHours());
    Ext.getCmp('fen').setValue(new Date().getMinutes());
    Ext.getCmp('dhdd').setValue();
    Ext.getCmp('yswp').setValue();
    Ext.getCmp('bz').setValue();
    Ext.getCmp('lxrdh').setValue();
    Ext.getCmp('window').show();
}
function getIP(){
    var redata='';
    Ext.Ajax.request({
        method : 'POST',
        async : false,
        url : AppUrl + 'PM_14/GetIP',
        params : {},
        success : function(response){
            var resp = Ext.decode(response.responseText);
            redata=resp.IP.split("/")[1];
        }
    });
    return redata;
}

function detailInfoSave(){
    /*if(Ext.ComponentManager.get('dhdd').getValue()==''||Ext.ComponentManager.get('dhdd').getValue()==null){
        Ext.Msg.alert("操作信息","等候地点不能为空");
        return false;
    }
    if(Ext.ComponentManager.get('yswp').getValue()==''||Ext.ComponentManager.get('yswp').getValue()==null){
        Ext.Msg.alert("操作信息","运输物品不能为空");
        return false;
    }
    if(Ext.ComponentManager.get('lxrdh').getValue()==''||Ext.ComponentManager.get('lxrdh').getValue()==null){
        Ext.Msg.alert("操作信息","联系人和电话不能为空");
        return false;
    }*/
    var shi = Ext.ComponentManager.get("shi").getValue();
    if (shi < 10) {
        shi = '0' + shi;
    }
    var fen = Ext.ComponentManager.get("fen").getValue();
    if (fen < 10) {
        fen = '0' + fen;
    }
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var V_CARCODE='';
    for(var i=0;i< seldata.length;i++){
        V_CARCODE=V_CARCODE+seldata[i].data.V_CARCODE+',';
    }
    V_CARCODE=V_CARCODE.substring(0,V_CARCODE.length-1);
    Ext.Ajax.request({
        url : AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_IP:getIP(),
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_ORDERID:V_ORDERGUID,
            V_V_CARCODE:V_CARCODE,//Ext.ComponentManager.get('cl').getValue(),
            V_D_DATETIME_WITE:Ext.Date.format(Ext.ComponentManager.get("dhtime").getValue(), 'Y-m-d')+ " " + shi + ":" + fen + ':' + "00",
            V_V_DD_WITE: Ext.ComponentManager.get('dhdd').getValue(),
            V_V_WP_WITE:Ext.ComponentManager.get('yswp').getValue(),
            V_V_MEMO:Ext.ComponentManager.get('bz').getValue(),
            V_V_LXRDH:Ext.ComponentManager.get('lxrdh').getValue()
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            // Ext.example.msg('操作信息', '{0}', resp);
            if(resp.RET=='success'){
                //Ext.Msg.alert("操作信息","添加成功");
                Ext.getCmp('window').hide();
                QueryXXGrid();
            }
        }
    });

}
function QueryXXGrid(){
    Ext.data.StoreManager.lookup('gridXXStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
}