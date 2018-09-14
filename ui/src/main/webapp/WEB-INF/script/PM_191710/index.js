var equTypeLoad = false;
var deptLoad = false;


var V_JXGX_CODE = null;
var V_ORGCODE = null;
var V_DEPTCODE = null;
var V_EQUTYPE = null;
var V_EQUCODE = null;
var V_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXGX_CODE;
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
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
            'V_IN_PER'],
        proxy: {
            url: AppUrl + 'basic/PM_1917_JXMX_DATA_SEL',//'PM_03/PM_03_JXMX_DATA_SEL',
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
            id: 'gpage',
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
            V_V_JXMX_NAME: Ext.getCmp('jxequipname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
}

function btn_select(){
    /*var result=[];
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
    });*/
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if(seldata.length!=1){
        alert("请选择一条数据");
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',//获取该模型下的工序
        method: 'POST',
        async: false,
        params: {
            V_V_JXMX_CODE :  seldata[0].data.V_MX_CODE//seldata[0].data.V_GX_CODE
        }, success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            Ext.Ajax.request({
                url: AppUrl + 'cjy/PRO_PM_WORKORDER_ET_ID_DEL',//删除该guid下工序
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERGUID:V_GUID
                }, success: function (response) {}

            });
            Ext.Ajax.request({
                url: AppUrl + 'cjy/PRO_PM_WORKORDER_SPARE_ID_DEL',//删除该guid下物料
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERGUID:V_GUID
                }, success: function (response) {}

            });
            for(var i=0;i<resp.list.length;i++){
                Ext.Ajax.request({//添加工序
                    url: AppUrl + 'cjy/PRO_PM_WORKORDER_ET_SET_NEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID :  '-1',
                        V_V_ORDERGUID:V_GUID,
                        V_V_DESCRIPTION:resp.list[i].V_JXGX_NR,
                        V_I_WORK_ACTIVITY:resp.list[i].V_PERTIME,
                        V_I_DURATION_NORMAL:resp.list[i].V_PERNUM,
                        V_V_WORK_CENTER:resp.list[i].V_GZZX_CODE,
                        V_I_ACTUAL_TIME:'0',
                        V_I_NUMBER_OF_PEOPLE: '0',
                        V_V_ID:'',
                        V_V_GUID: resp.list[i].V_JXGX_CODE,
                        V_V_JXBZ:resp.list[i].V_JXBZ,
                        V_V_JXBZ_VALUE_DOWN:resp.list[i].V_JXBZ_VALUE_DOWN,
                        V_V_JXBZ_VALUE_UP:resp.list[i].V_JXBZ_VALUE_UP
                    }, success: function (response) {

                    }
                });
                Ext.Ajax.request({//查找该工序下的物料
                    url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_JXGX_CODE:resp.list[i].V_JXGX_CODE
                    },
                    success: function (response) {
                        var respwl = Ext.JSON.decode(response.responseText);



                        for(var j=0;j<respwl.list.length;j++){

                            var gxcode='';
                            Ext.Ajax.request({
                                url: AppUrl + 'cjy/PRO_PM_WORKORDER_ET_ID_VIEW',//查找对应工序编号
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID:resp.list[i].V_JXGX_CODE
                                }, success: function (response) {
                                    var respgx = Ext.JSON.decode(response.responseText);
                                    gxcode=respgx.list[0].V_ACTIVITY;
                                }

                            });

                            //添加物料
                            Ext.Ajax.request({
                                url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET',
                                // url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_I_ID: '-1',
                                    V_V_ORDERGUID: V_GUID,
                                    V_V_FETCHORDERGUID: '',
                                    V_V_ACTIVITY: gxcode,
                                    V_V_MATERIALCODE: respwl.list[j].V_WLCODE,
                                    V_V_MATERIALNAME: respwl.list[j].V_WLSM,
                                    V_V_SPEC: respwl.list[j].V_GGXH,
                                    V_V_UNIT: respwl.list[j].V_JLDW,
                                    V_F_UNITPRICE: respwl.list[j].V_PRICE==null?0:respwl.list[j].V_PRICE,
                                    V_I_PLANAMOUNT:'1',
                                    V_F_PLANMONEY: '0',
                                    V_I_ACTUALAMOUNT:'0',
                                    V_F_ACTUALMONEY: '0',
                                    V_V_TYPE: V_EQUTYPE,
                                    V_V_MEMO: ' ',
                                    V_V_SUBTYPE: '',
                                    V_V_STATUS: '',
                                    V_I_ABANDONEDAMOUNT: '0',
                                    V_I_RECLAIMEDAMOUNT: '0',
                                    V_I_FIXEDAMOUNT: '0',
                                    V_V_ID: ''
                                },
                                success: function (response) {

                                }
                            });
                        }
                    }
                });



            }
        }
    });

    window.close();
    window.opener.getReturnMX();


}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_MX_CODE + '\')">详情</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191711/index.html?V_MX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}