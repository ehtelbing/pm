//var V_YEARPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_YEARPLAN_GUID;
var YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
var V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
var V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
var months = [];
var hours = [];
var minutes = [];
var V_PLANTYPE = '';
var UPDATELOAD;


//var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

var today = new Date();

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = "" : V_GUID = parameters.V_GUID;

}


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
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
            'V_ORGCODE',                          //厂矿
            'V_ORGNAME',
            'V_DEPTCODE',                         //作业区
            'V_DEPTNAME',
            'V_EQUTYPECODE',                     //设备类型
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME'],
        proxy:  Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        })
    });





    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
               // baseCls: 'my-panel-no-border',
                margin: '0 0 0 20',
                //autoScroll : true,
                items: [
                    {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'idea',
                                fieldLabel: '审批意见',
                                margin: '10 0 5 65',
                                labelWidth: 80,
                                width: 250
                            },
                            {
                                xtype: 'button',
                                text: '同意',
                                margin: '10 0 10 10',
                                icon: imgpath + '/saved.png',
                                handler: agree
                            },
                            {
                                xtype: 'button',
                                text: '驳回',
                                margin: '10 350 10 10',
                                icon: imgpath + '/cross.png',
                                handler: disagree
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'year',
                            store: yearStore,
                            xtype: 'textfield',
                            readOnly:true,
                            fieldLabel: '年份',
                            style: 'margin: 5px 0px 0px 0px',
                            //value: YEAR,
                            labelWidth: 100,
                            labelAlign: 'right',
                            editable: false,
                            width: 250,
                            displayField: 'displayField',
                            valueField: 'valueField'
                        },{
                            xtype: 'textfield',
                            readOnly:true,
                            id: "ck",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '计划厂矿',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                              {
                                xtype: 'textfield',
                                readOnly:true,
                                id: "zyq",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '作业区',
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width :250
                            },{
                                xtype: 'textfield',
                                readOnly:true,
                                id: "zy",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '专业',
                                displayField: 'V_BASENAME',
                                valueField: 'V_SPECIALTYCODE',
                                labelWidth: 100,
                                width:250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    },{
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                             {
                                xtype: 'textfield',
                                readOnly:true,
                                id: "sblx",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备类型',
                                displayField: 'V_EQUTYPENAME',
                                valueField: 'V_EQUTYPECODE',
                                labelWidth: 100,
                                width:250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            },{
                                xtype: 'textfield',
                                readOnly:true,
                                id: "sbmc",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备名称',
                                displayField: 'V_EQUNAME',
                                valueField: 'V_EQUCODE',
                                labelWidth: 100,
                                width:250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    },  {
                        id: 'jxnr',
                        xtype: 'textarea',
                        readOnly:true,
                        fieldLabel: '检修内容',
                        //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        allowBlank: false,
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 1000px 0px 0px',
                        width: 500,
                        labelAlign: 'right'
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhtgsj',
                                xtype: 'textfield',
                                readOnly:true,
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                fieldLabel: '计划停工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }, {
                                xtype: 'textfield',
                                readOnly:true,
                                id: "tghour",
                                editable: false,
                                fieldLabel: '小时',
                                queryMode: 'local',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width:160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            } ,{
                                xtype: 'textfield',
                                readOnly:true,
                                id: "tgminute",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width:90,
                                style: ' margin: 5px 300px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhjgsj',
                                xtype: 'textfield',
                                readOnly:true,
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                fieldLabel: '计划竣工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }, {
                                xtype: 'textfield',
                                readOnly:true,
                                id: "jghour",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '小时',
                                // value:00,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width:160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }, {
                                xtype: 'textfield',
                                readOnly:true,
                                id: "jgminute",
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width:90,
                                style: ' margin: 5px 250px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhgshj',
                                xtype: 'textfield',
                                readOnly:true,
                                editable: true,
                                fieldLabel: '计划工时合计',
                                labelWidth: 100,
                                style: ' margin: 5px 1000px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'bz',
                                xtype: 'textarea',
                                readOnly:true,
                                fieldLabel: '备注 ',
                                // fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                                editable: false,
                                labelWidth: 100,
                                queryMode: 'local',
                                //baseCls: 'margin-bottom',
                                style: ' margin: 5px 0px 0px 0px',
                                width: 500,
                                labelAlign: 'right'
                            }]
                    }

                ]
            }


        ]
    });




    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });

    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
     );

     });*/

    _init();
})

function _init() {


    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };
    //matGroupSecondStore.currentPage = 1;
    gridStore.load();


    //console.log(gridStore.getAt(0).get('V_STARTTIME').substring(11,19));
    Ext.getCmp('year').setValue(gridStore.getAt(0).get('V_YEAR'));
    Ext.getCmp('ck').setValue(gridStore.getAt(0).get('V_ORGNAME'));
    Ext.getCmp('zyq').setValue(gridStore.getAt(0).get('V_DEPTNAME'));
    Ext.getCmp('zy').setValue(gridStore.getAt(0).get('V_REPAIRMAJOR_CODE'));
    Ext.getCmp('sblx').setValue(gridStore.getAt(0).get('V_EQUTYPENAME'));
    Ext.getCmp('sbmc').setValue(gridStore.getAt(0).get('V_EQUNAME'));
    Ext.getCmp('jxnr').setValue(gridStore.getAt(0).get('V_CONTENT'));
    Ext.getCmp('jhtgsj').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(0,10));
    Ext.getCmp('tghour').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(11,13));
    Ext.getCmp('tgminute').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(14,16));
    Ext.getCmp('jhjgsj').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(0,10));
    Ext.getCmp('jghour').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(11,13));
    Ext.getCmp('jgminute').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(14,16));
    Ext.getCmp('jhgshj').setValue(gridStore.getAt(0).get('V_HOUR'));
    Ext.getCmp('bz').setValue(gridStore.getAt(0).get('V_BZ'));

    V_PLANTYPE = gridStore.getAt(0).get('V_FLOWTYPE');



}









function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}




function _close() {
    window.close();
}





function _onBtnmxxz()
{
    var owidth = window.document.body.offsetWidth ;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + 'page/PM_03010212/index.html?&random=' + Math.random(), '', 'height=600PX,width=1200px,top=10px,left=10px,resizable=yes' );

}






function agree() {
    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_03_PLAN_AGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUID,
            V_V_PLANTYPE: V_PLANTYPE,
            V_V_IDEA: Ext.getCmp('idea').getValue()==''?'同意':Ext.getCmp('idea').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.ret == '成功') {
                Ext.MessageBox.alert('提示', '同意成功', callBack);
                function callBack(id) {
                    window.close();
                    window.opener.OnPageLoad();
                    window.opener.QueryGrid();
                }
            } else {
                Ext.Msg.alert('提示信息', '失败');
            }

        }
    });
}
function disagree() {
    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_03_PLAN_DISAGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUID,
            V_V_PLANTYPE: V_PLANTYPE,
            V_V_IDEA: Ext.getCmp('idea').getValue()==''?'驳回':Ext.getCmp('idea').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.ret == '成功') {
                Ext.MessageBox.alert('提示', '驳回成功', callBack);
                function callBack(id) {
                    window.close();
                    window.opener.OnPageLoad();
                    window.opener.QueryGrid();
                }
            } else {
                Ext.Msg.alert('提示信息', '驳回失败');
            }


        }
    });
}