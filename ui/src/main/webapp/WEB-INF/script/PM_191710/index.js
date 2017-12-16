var equTypeLoad = false;
var deptLoad = false;


var V_JXGX_CODE = null;
var V_ORGCODE = null;
var V_DEPTCODE = null;
var V_EQUTYPE = null;
var V_EQUCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXGX_CODE;
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}

Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
     //   pageSize : 100,
        fields: ['I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER',
            'V_JXGX_NAME',
            'V_JXGX_CODE',
            'V_JXGX_NR'],
        proxy: {
            url: AppUrl + 'PM_03/PM_03_JXMX_DATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        border: false,
        region: 'north',
        items: [{
            layout: 'column',
            border: false,
            frame: true,
            defaults: {
                xtype: 'button',
                labelAlign: 'right',
                margin: '5px 0px 5px 10px',
                width: 200
            },
            items: [ {
                xtype: 'textfield',
                id: 'jxequipname',
                fieldLabel: '检修模型名称',
                emptyText: '缺陷明细模糊搜索',
                width: 240,
                margin: '5 0 5 20px'
            }, {
                text: '查询',
                width : 60,
                icon: imgpath + '/search.png',
                handler: function () {
                    query();
                }
            }, {
                text: '选择',
                width : 60,
                icon: imgpath + '/add.png',
                handler: function () {
                    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
                    if (seldata.length != 1) {
                        alert('请选择一条数据！');
                    }else{
                        Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){
                                btn_select();
                            }
                        })
                    }
                }
            }]
        }]

    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检修模型编码',
            dataIndex: 'V_MX_CODE',
            align: 'center',
            width: 150
        }, {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 150
        }, {
            text: '工序名称',
            align: 'center',
            width: 150,
            renderer : detail
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 150
        }
        ],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            pageSize:100,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]

    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border:false,
        items: [topPanel,gridPanel]
    });

});


function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: V_ORGCODE,
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_EQUTYPE: V_EQUTYPE,
            V_V_EQUCODE: V_EQUCODE,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: Ext.getCmp('jxequipname').getValue()
        }
    });
}

function btn_select(){
    var result=[];
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_BYCODE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE: seldata[0].data.V_JXGX_CODE
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.list.length!=0){
                result.push(resp.list[0].V_JJ_NAME);
                result.push(resp.list[0].V_GJ_NAME);
                result.push(resp.list[0].V_PER_NAME);
                result.push(resp.list[0].V_WL_NAME);
                result.push(resp.list[0].V_JSQY_NAME);
                result.push(resp.list[0].V_AQSC_NAME);
            }
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_SELECT',
        method: 'POST',
        async: false,
        params: {
            V_V_JXGX_CODE_NEW: V_JXGX_CODE,
            V_V_JXGX_CODE_OLD: seldata[0].data.V_JXGX_CODE
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            result.push(seldata[0].data.V_JXGX_NR);
            result.push(seldata[0].data.V_MX_NAME);
            window.opener.getReturnMX(result);
            window.close();
        }
    });
}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_GX_CODE + '\')">详情</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191711/index.html?V_MX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}