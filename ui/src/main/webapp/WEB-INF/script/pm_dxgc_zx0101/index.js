var today = new Date();
var mingtian = new Date();
mingtian.setDate(mingtian.getDate() + 1)
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}
var v_guid_dx = "";
var V_ORGCODE = 9905;
var v_deptcode = "";
var v_equtypecode = "";
var v_equcode = "";
var v_specialty = "";
var V_EQUTYPENAME = "";
var RETRUNV_GUID = "";
var RETURNV_ORDERGUID = "";


if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.v_guid_dx == undefined) ? v_guid_dx = '' : v_guid_dx = parameters.v_guid_dx;
    (parameters.v_deptcode == undefined) ? v_deptcode = '' : v_deptcode = parameters.v_deptcode;
    (parameters.v_equtypecode == undefined) ? v_equtypecode = '' : v_equtypecode = parameters.v_equtypecode;
    (parameters.v_equcode == undefined) ? v_equcode = '' : v_equcode = parameters.v_equcode;
    (parameters.v_specialty == undefined) ? v_specialty = '' : v_specialty = parameters.v_specialty;
    (parameters.ck == undefined) ? ck = '' : ck = parameters.ck;

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


    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
            }
        }
    });

    var sbtypestore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbtypestore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            // url: 'PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    //设备类型
    var eTypeStore = Ext.create('Ext.data.Store', {
        id: 'eTypeStore',
        autoLoad: true,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODENEXT': v_deptcode
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('equtype').select(store.first());
            }
        }
    });

    //设备名称
    var equNameStore = Ext.create('Ext.data.Store', {
        id: 'equNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('equname').select(store.first());
            }
        }
    });

    //子设备名称
    var subequNameStore = Ext.create('Ext.data.Store', {
        id: 'subequNameStore',
        autoLoad: false,
        fields: ['sid', 'text'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {text: '全部', sid: '%'});
                Ext.getCmp('subequname').select(store.first());
            }
        }
    });

    var qxdjstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'qxdjstore',
        fields: ['V_LEVELCODE', 'V_LEVELNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_LEVEL_SEL',
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
                Ext.getCmp('qxdj').setValue(3);

            }
        }
    });


    var timeStore = Ext.create('Ext.data.Store', {
        id: 'timeStore',
        autoLoad: true,
        fields: ['V_DATETIME', 'V_DATE', 'V_TIME', 'V_YEAR', 'V_MONTH'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PM_RET_DATETIME',
            // url: 'PM_RET_DATETIME',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        })
    });

    var yearStore = Ext.create('Ext.data.Store', {
        id: 'yearStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: Year,
        proxy: {
            type: 'memory',
            render: {
                type: 'json'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
            }
        }
    });

    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var filegridPanel = Ext.create("Ext.panel.Panel", {
        id: 'filegridPanel',
        editable: false,
        region: 'center',
        // height: 200,
        html: "<table border='0' width='500' height='50'><tr> <td> <input id='jyk'type='checkbox' />添加异常现象及建议到常用异常现象及建议库 </td><td> <input type='button' value='从常用异常现象及建议库选择' onclick='_jyk()'</td>  </tr> </table>",//width: 400,
        style: ' margin: 5px 0px 0px 0px',
        columnLines: true
        /*store: fileGridStore,
         autoScroll: true,
         // margin: '10px 0 0 125px',
         //colspan: 3,
         columns: [{
         text: '附件名称',
         flex: 0.7,
         id : 'fjname',
         align: 'center',
         dataIndex: "V_FILENAME"
         // renderer: _downloadRander
         }, {
         text: '操作',
         flex: 0.3,
         align: 'center',
         //renderer: _delRander
         }]*/
    });


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                //baseCls: 'my-panel-no-border',
                margin: '0 0 0 0',
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
                                xtype: 'button',
                                text: '保存并下票',
                                icon: imgpath + '/filesave.png',
                                handler: _save,
                                style: 'margin: 5px 0px 0px 10px'
                            }, {
                                xtype: 'button',
                                text: '取消',
                                icon: imgpath + '/cross.png',
                                handler: _close,
                                style: 'margin: 5px 0px 0px 10px'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'combo',
                            id: 'equtype',
                            store: eTypeStore,
                            queryMode: 'local',
                            valueField: 'V_EQUTYPECODE',
                            displayField: 'V_EQUTYPENAME',
                            labelWidth: 100,
                            width: 282,
                            style: ' margin: 5px 0px 0px 0px',
                            forceSelection: true,
                            fieldLabel: '设备类型',
                            fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                            editable: false,
                            listeners: {
                                change: function () {
                                    Ext.data.StoreManager.lookup('equNameStore').load({
                                        params: {
                                            v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                                            v_v_deptcodenext: v_deptcode,
                                            v_v_equtypecode: Ext.getCmp('equtype').getValue()
                                        }
                                    });
                                }
                            }
                        }, {
                            xtype: 'combo',
                            id: 'equname',
                            store: equNameStore,
                            queryMode: 'local',
                            valueField: 'V_EQUCODE',
                            displayField: 'V_EQUNAME',
                            labelWidth: 100,
                            width: 282,
                            style: ' margin: 5px 0px 0px 0px',
                            forceSelection: true,
                            fieldLabel: '设备名称',
                            fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                            editable: false,
                            listeners: {
                                change: function () {
                                    Ext.data.StoreManager.lookup('subequNameStore').load({
                                        params: {
                                            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                            V_V_DEPTCODE: ck,
                                            V_V_DEPTNEXTCODE: v_deptcode,
                                            V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                                            V_V_EQUCODE: Ext.getCmp('equname').getValue()
                                        }
                                    });
                                }
                            }
                        }
                            /*, {
                             id: 'zsb',
                             xtype: 'combo',
                             store: zsbstore,
                             fieldLabel: '子设备',
                             editable: false,
                             labelWidth: 100,
                             displayField: 'V_EQUNAME',
                             valueField: 'V_EQUCODE',
                             queryMode: 'local',
                             //baseCls: 'margin-bottom',
                             labelAlign: 'right',
                             style: ' margin: 5px 0px 0px 0px',
                             width: 250,
                             fieldStyle: 'background-color:#FFEBCD;background-image:none;'*//*,
                             listeners: {
                             change: function (field, newValue, oldValue) {
                             // _ck_zyqfzrload();
                             // zyq_jxdwload();
                             // _spload();
                             }
                             }*//*

                             }*/]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'combo',
                            id: 'subequname',
                            store: subequNameStore,
                            queryMode: 'local',
                            valueField: 'sid',
                            displayField: 'text',
                            labelWidth: 100,
                            width: 282,
                            style: ' margin: 5px 0px 0px 0px',
                            forceSelection: true,
                            fieldLabel: '子设备',
                            fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                            labelAlign: 'right',
                            editable: false
                        }, {
                            id: 'zy',
                            xtype: 'combo',
                            store: zystore,
                            fieldLabel: '专业',
                            editable: false,
                            labelWidth: 100,
                            displayField: 'V_MAJOR_NAME',
                            valueField: 'V_MAJOR_CODE',
                            queryMode: 'local',
                            //baseCls: 'margin-bottom',
                            style: ' margin: 5px 0px 0px 0px',
                            width: 282,
                            fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                            labelAlign: 'right'/*,
                             listeners: {
                             select: function (field, newValue, oldValue) {
                             _ck_zyfzrload();
                             _spload();
                             }
                             }*/
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'qxdj',
                                xtype: 'combo',
                                store: qxdjstore,
                                fieldLabel: '缺陷等级',
                                editable: false,
                                labelWidth: 100,
                                displayField: 'V_LEVELNAME',
                                valueField: 'V_LEVELCODE',
                                queryMode: 'local',
                                //baseCls: 'margin-bottom',
                                style: ' margin: 5px 0px 0px 0px',
                                width: 282,
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                labelAlign: 'right'/*,
                             listeners: {
                             select: function (field, newValue, oldValue) {
                             _ck_zyfzrload();
                             _spload();
                             }
                             }*/
                            },
                            {
                                id: 'fxsjymd',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                fieldLabel: '发现时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 200,
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }, {
                                xtype: 'timefield',
                                id: 'fxsjhis',
                                format: 'H:i:s',
                                style: 'margin:5px 0px 0px 2px',
                                value: new Date(),
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                labelAlign: 'right',
                                width: 80
                            }]
                    }, , {
                        id: 'fxr',
                        xtype: 'textfield',
                        fieldLabel: '发现人',
                        labelWidth: 100,
                        queryMode: 'local',
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 0px 0px 0px',
                        width: 282,
                        value: Ext.util.Cookies.get('v_personname2'),
                        labelAlign: 'right'
                    }, {
                        id: 'ycxx',
                        xtype: 'textarea',
                        fieldLabel: '异常现象 ',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 0px 0px 0px',
                        width: 562,
                        labelAlign: 'right'
                    }, {
                        id: 'cljy',
                        xtype: 'textarea',
                        fieldLabel: '处理建议 ',
                        fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 0px 0px 0px',
                        width: 562,
                        labelAlign: 'right'
                    }, {
                        //columnWidth: 1,
                        //height: 150,
                        //width: '100%',
                        style: ' margin: 5px 0px 0px 50px',
                        items: filegridPanel

                    }


                ]
            }


        ]
    });


    /* Ext.create('Ext.container.Viewport', {
     id: "viewport",
     // layout: 'border',
     items: [panel2, panel3]
     });*/

    Ext.create('Ext.container.Viewport', {
        id: "viewport",
        layout: 'border',
        items: [editPanel]
    });

    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
     );

     });*/

});

function _savezuizhong() {
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_DEFECT_GC_TOWORK',
            async: false,
            method: 'POST',
            params: {
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_GUID_GC: v_guid_dx,
                V_V_GUID_QX: RETRUNV_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.MessageBox.alert('提示', '保存成功');
                    RETURNV_ORDERGUID = data.list[0].V_ORDERGUID;
                    var owidth = window.document.body.offsetWidth;
                    var oheight = window.document.body.offsetHeight;
                    window.open(AppUrl + 'page/pm_dxgc_orderEdit/index.html?V_GUID=' + RETURNV_ORDERGUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
                    //jykload = false;
                    _close();
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
}

/*function callBack(id) {
 alert(2222);
 // alert('单击的按钮id是：'+id);
 //_spupdate();
 //window.close();
 //!!!!!!!!!!!这里少东西 !!!!!!!!!!!!!!!!!!!!!!!!后台返回工单ID
 RETURNV_ORDERGUID = data.list[0].V_ORDERGUID;
 //console.log(RETURNV_ORDERGUID);
 var owidth = window.document.body.offsetWidth;
 var oheight = window.document.body.offsetHeight;
 window.open(AppUrl + 'page/pm_dxgc_orderEdit/index.html?V_GUID=' + RETURNV_ORDERGUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
 jykload = false;
 _close();
 }*/

function _save() {
    var time1 = Ext.getCmp('fxsjymd').getSubmitValue() + ' ' + Ext.getCmp('fxsjhis').getSubmitValue();


    var checked = $("input[type='checkbox']").is(':checked');

    if (checked) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_DEFECT_GC_SET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_GC: v_guid_dx,
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ORGCODE: ck,
                V_V_DEPTCODE: v_deptcode,
                V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('equname').getValue(),
                V_V_EQUCHILDCODE: Ext.getCmp('subequname').getValue(),
                V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),
                V_V_SOURCECODE: 'defct12',
                V_V_PERNAME_FX: Ext.getCmp('fxr').getValue(),
                V_V_SOURCE_GRADE: Ext.getCmp('qxdj').getValue(),
                V_D_DEFECTDATE: time1,
                V_V_DEFECTLIST: Ext.getCmp('ycxx').getValue(),
                V_V_IDEA: Ext.getCmp('cljy').getValue(),
                V_V_ISTODIC: "是"
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.Msg.alert('提示信息', '成功');
                    if (data.list.length > 0) {
                        RETRUNV_GUID = data.list[0].V_GUID;
                        _savezuizhong();
                    } else {
                        Ext.Msg.alert('提示信息', '没有数据');
                    }
                } else {
                    Ext.Msg.alert('提示信息', '失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'PM_22/PRO_PM_DEFECT_GC_SET',
            async: false,
            method: 'POST',
            params: {
                V_V_GUID_GC: v_guid_dx,
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ORGCODE: ck,
                V_V_DEPTCODE: v_deptcode,
                V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('equname').getValue(),
                V_V_EQUCHILDCODE: Ext.getCmp('subequname').getValue(),
                V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),
                V_V_SOURCECODE: 'defct12',
                V_V_PERNAME_FX: Ext.getCmp('fxr').getValue(),
                V_V_SOURCE_GRADE: Ext.getCmp('qxdj').getValue(),
                V_D_DEFECTDATE: time1,
                V_V_DEFECTLIST: Ext.getCmp('ycxx').getValue(),
                V_V_IDEA: Ext.getCmp('cljy').getValue(),
                V_V_ISTODIC: "否"

            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.Msg.alert('提示信息', '成功');
                    if (data.list.length > 0) {
                        RETRUNV_GUID = data.list[0].V_GUID;
                        _savezuizhong();
                    } else {
                        Ext.Msg.alert('提示信息', '没有数据');
                    }
                } else {
                    Ext.Msg.alert('提示信息', '失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }


}

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_IP: "",
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_D_INDATE_B: Ext.getCmp("begintime").getSubmitValue(),
        V_D_INDATE_E: Ext.getCmp("endtime").getSubmitValue(),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_DEFECT: Ext.getCmp('qxcontent').getValue()

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}


function _close() {
    window.close();
}

function _jyk() {
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + 'page/pm_dxgc_zx010101/index.html?V_ORGCODE=' + ck + '&v_equtypecode=' + v_equtypecode + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');

}

function querySet(V_DEFECTLIST, V_IDEA) {
    Ext.getCmp('ycxx').setValue(V_DEFECTLIST);
    Ext.getCmp('cljy').setValue(V_IDEA);
}
