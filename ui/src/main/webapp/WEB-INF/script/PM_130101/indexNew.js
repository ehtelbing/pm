var globalTree = null;
var X_EQUTYPECODE_ = '';
var X_EQUCODE_ = '';
Ext.onReady(function () {

    var dt = new Date();
    date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    hours_ = dt.getHours();
    minutes_ = dt.getMinutes();
    if (dt.getHours() < 10) {
        hours_ = '0' + (dt.getHours());
    } else {
        hours_ = dt.getHours();
    }
    if (dt.getMinutes() < 10) {
        minutes_ = '0' + (dt.getMinutes());
    } else {
        minutes_ = dt.getMinutes();
    }
    get_hours_ = hours_ + '时';
    get_minutes_ = minutes_ + '分';


    //加油量数据集
    var jylStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'jylStore',
        fields: [
            'V_BASECODE', 'V_BASENAME'
        ],
        proxy: {
            type: 'ajax',
            actionMethods: {read: 'POST'},
            url: AppUrl + 'zs/DROPLIST_FUELQUANTITY',
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('i_unit').select(store.first());
            }
        }
    });


    //设备树
    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE']
    });

    var droplist_lubaddtype = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'droplist_lubaddtype',
        fields: [
            'V_BASECODE', 'V_BASENAME'
        ],
        proxy: {
            type: 'ajax',
            actionMethods: {read: 'POST'},
            url: AppUrl + 'zpf/droplist_lubaddtype',
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('v_addorchange').select(store.first());
                Ext.getCmp('v_addorchange2').select(store.first());
            }
        }
    });

    var droplist_lubmode = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'droplist_lubmode',
        fields: [
            'V_BASECODE', 'V_BASENAME'
        ],
        proxy: {
            type: 'ajax',
            actionMethods: {read: 'POST'},
            //url: 'droplist_lubmode',
            url: AppUrl + 'zpf/droplist_lubmode',
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('x_lubmode').select(store.first());
                Ext.getCmp('x_lubmode2').select(store.first());
            }
        }
    });
    var gridZZMCStore = Ext.create('Ext.data.Store', {
        id: 'gridZZMCStore',
        autoLoad: true,
        fields: ['V_ZZMCCODE', 'V_ZZMCNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'cjy/PRO_BASE_ZZMC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_ZZMC:''
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var panel = {
        xtype: "panel", region: "center", width: '100%', layout: {"type": "border"},
        items: [
            {
                xtype: "panel", region: "center",
                layout: {type: "border"},
                //store: GetPlantname(),
                items: [
                    {
                        xtype: "treepanel",
                        id: 'treepanel',
                        region: "west",
                        width: 200,
                        rootVisible: false,
                        store: treeStore,
                        listeners: {
                            itemclick: OnClick
                        }
                    },
                    {
                        xtype: "panel", region: "center", layout: {type: "border"}, width: '100%', autoScroll: true,
                        items: [
                            {
                                xtype: "panel", region: "north", frame: true,
                                layout: {"type": "column"},
                                items: [
                                    {id: 'x_equtypename1', xtype: 'hiddenfield', fieldLabel: '设备名称', hideLabel: true},
                                    {id: 'v_deptcode1', xtype: 'hiddenfield', fieldLabel: '部门编码', hideLabel: true},
                                    {id: 'v_equtypecode1', xtype: 'hiddenfield', fieldLabel: '设备类型编码', hideLabel: true},
                                    {
                                        xtype: "button",
                                        text: "添加",
                                        icon: imgpath + '/add.png',
                                        margin: '5px 0 5px 5px',
                                        handler: function () {
                                            if (globalTree == null) {
                                                Ext.Msg.alert('操作信息', '请选择设备位置');
                                            } else {
                                                Ext.getCmp('x_equname').setValue(Ext.getCmp('x_equtypename1').getValue());
                                                Ext.getCmp('v_deptcode').setValue(Ext.getCmp('v_deptcode1').getValue());//v_equtypecode
                                                Ext.getCmp('x_equcode').setValue(Ext.getCmp('v_equtypecode1').getValue());
                                                Ext.getCmp('dialogadd').show();

                                                Ext.getCmp('v_setname').reset();
                                                Ext.getCmp('v_lubaddress').reset();
                                                Ext.data.StoreManager.lookup('droplist_lubmode').load();
                                                Ext.getCmp('v_lubtrademark').reset();
                                                Ext.getCmp('f_lubcount').reset();
                                                Ext.getCmp('f_oilamount').reset();
                                                Ext.getCmp('i_unit').reset();
                                                Ext.data.StoreManager.lookup('droplist_lubaddtype').load();
                                                Ext.data.StoreManager.lookup('jylStore').load();
                                                Ext.getCmp('v_operateperson').reset();
                                                Ext.getCmp('d_operatedate').reset();
                                                Ext.getCmp('xiaoshi').setValue(get_hours_);
                                                Ext.getCmp('fenzhong').setValue(get_minutes_);
                                                Ext.getCmp('v_operatereason').reset();
                                            }
                                        }
                                    },
                                    {
                                        xtype: "button",
                                        text: "修改",
                                        margin: '5px 0 5px 5px',
                                        icon: imgpath + '/edit.png',
                                        handler: function () {
                                            Ext.getCmp('x_equname2').setValue(Ext.getCmp('x_equtypename1').getValue());
                                            Ext.getCmp('v_deptcode2').setValue(Ext.getCmp('v_deptcode1').getValue());//v_equtypecode
                                            Ext.getCmp('x_equcode2').setValue(Ext.getCmp('v_equtypecode1').getValue());
                                            //Ext.getCmp('dialogedit').show();

                                            var selectModel = Ext.getCmp('gridpanel').getSelectionModel();
                                            var id = Ext.getCmp('gridpanel').getSelectionModel().getSelection().length;
                                            if (id == ' 0') {
                                                Ext.Msg.alert('操作信息', '请选择需要修改的数据');
                                                return;

                                            }

                                            if (selectModel.hasSelection()) {
                                                var selected = selectModel.getSelection()[0].data;
                                                Ext.Ajax.request({
                                                    url: AppUrl + 'zpf/PRO_QUERYLUBRECORD',
                                                    method: 'POST',
                                                    async: false,
                                                    params: {
                                                        X_TIMELOWERLIMIT: '1900-1-1',
                                                        X_TIMEUPPERLIMIT: '2200-1-1',
                                                        X_DEPTCODE: selected.V_DEPTCODE,
                                                        X_EQUTYPECODE: selected.V_EQUTYPECODE,
                                                        X_EQUCODE: selected.V_EQUCODE,
                                                        X_LUBRICATIONCODE: selected.V_LUBRICATIONCODE,
                                                        V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                                                        V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
                                                        V_V_DEPTTYPE:'主体作业区'
                                                    },
                                                    success: function (response) {
                                                        var respRoot = Ext.JSON.decode(response.responseText);

                                                        resp = respRoot.list;
                                                        Ext.getCmp('x_equname2').setValue(resp[0].V_EQUNAME);
                                                        Ext.getCmp('v_setname2').setValue(resp[0].V_SETNAME);
                                                        Ext.getCmp('v_lubaddress2').setValue(resp[0].V_LUBADDRESS);
                                                        Ext.getCmp('x_lubmode2').setValue(resp[0].V_LUBMODE);
                                                        Ext.getCmp('v_lubtrademark2').setValue(resp[0].V_LUBTRADEMARK);
                                                        Ext.getCmp('f_lubcount2').setValue(resp[0].F_LUBCOUNT);
                                                        Ext.getCmp('f_oilamount2').setValue(resp[0].F_OILAMOUNT);
                                                        //---update 2018-08-30
                                                        for(var i=0;i<Ext.getStore('jylStore').data.length;i++){
                                                            if(resp[0].I_UNIT==Ext.getStore('jylStore').data.getAt(i).data.V_BASENAME){
                                                                Ext.getCmp('i_unit2').setValue(Ext.getStore('jylStore').getAt(i));
                                                            }
                                                        }
                                                        //Ext.getCmp('i_unit2').setValue(resp[0].I_UNIT);
                                                        //---end up
                                                        Ext.getCmp('v_addorchange2').setValue(resp[0].V_ADDORCHANGE);
                                                        Ext.getCmp('v_operateperson2').setValue(resp[0].V_OPERATEPERSON);

                                                        var D_OPERATEDATE = (resp[0].D_OPERATEDATE).split(".");

                                                        D_OPERATEDATE[0] = D_OPERATEDATE[0].replace('-', '/').replace("-", "/");
                                                        var xiaoshi2 = ((resp[0].D_OPERATEDATE).substring(11, 13)) + '时';
                                                        var fenzhong2 = ((resp[0].D_OPERATEDATE).substring(14, 16)) + '分';


                                                        Ext.getCmp('d_operatedate2').setValue(new Date(D_OPERATEDATE[0]));
                                                        Ext.getCmp('xiaoshi2').setValue(xiaoshi2);
                                                        Ext.getCmp('fenzhong2').setValue(fenzhong2);
                                                        Ext.getCmp('v_operatereason2').setValue(resp[0].V_OPERATEREASON);
                                                        Ext.getCmp('v_lubricationcode').setValue(resp[0].V_LUBRICATIONCODE);

                                                    },
                                                    failure: function () {
                                                        Ext.MessageBox.alert('操作信息', '操作失败.');
                                                    }
                                                });
                                                Ext.getCmp('dialogedit').show();
                                            }
                                        }
                                    },
                                    {
                                        xtype: "button",
                                        text: "删除",
                                        margin: '5px 0 5px 5px',
                                        icon: imgpath + '/delete1.png',
                                        handler: function () {
                                            var selectModel = Ext.getCmp('gridpanel').getSelectionModel();
                                            var id = Ext.getCmp('gridpanel').getSelectionModel().getSelection().length;
                                            if (id == ' 0') {
                                                Ext.Msg.alert('操作信息', '请选择需要删除的数据');
                                                return;

                                            }
                                            else if (selectModel.hasSelection()) {
                                                Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                                                    if (button != "yes") {
                                                        return;
                                                    }
                                                    var selected = selectModel.getSelection()[0].data;
                                                    Ext.Ajax.request({
                                                        url: AppUrl + 'zpf/pro_dellubrecord',
                                                        method: 'POST',
                                                        async: false,
                                                        params: {
                                                            x_lubricationcode: selected.V_LUBRICATIONCODE
                                                        },
                                                        success: function (response) {
                                                            Ext.Msg.alert('操作信息', '删除成功');
                                                            query();
                                                            return;
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                region: "center",
                                id: "gridpanel",
                                xtype: "gridpanel",
                                columnLines: true,
                                height: 500,
                                width: '100%',
                                autoScroll: true,
                                scroll: true,
                                overflowY: 'scroll',
                                columns: [
                                    Ext.create('Ext.grid.RowNumberer', {width: 30}),
                                    //{ text: '', width: 30, dataIndex: 'XUHAO', align: 'center' },
                                    {text: '设备名称', width: 150, dataIndex: 'V_EQUNAME', align: 'center'},
                                    {text: '装置名称', width: 150, dataIndex: 'V_SETNAME', align: 'center'},
                                    {text: '给油脂场所', width: 150, dataIndex: 'V_LUBADDRESS', align: 'center'},
                                    {text: '润滑方式', width: 150, dataIndex: 'V_LUBMODE', align: 'center'},
                                    {text: '润滑牌号', width: 150, dataIndex: 'V_LUBTRADEMARK', align: 'center'},
                                    {text: '润滑点数', width: 150, dataIndex: 'F_LUBCOUNT', align: 'center'},
                                    {text: '加油量', width: 150, dataIndex: 'F_OILAMOUNT', align: 'center'},
                                    {text: '单位', width: 150, dataIndex: 'I_UNIT', align: 'center'},
                                    {
                                        text: '加油时间', width: 160, dataIndex: 'D_OPERATEDATE', align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                                            var index = store.find('D_OPERATEDATE', value);
                                            if (index != -1) {
                                                return store.getAt(index).get('D_OPERATEDATE').substring(0, 19);
                                            }
                                            return null;
                                        }
                                    },
                                    {text: '加油人员', width: 100, dataIndex: 'V_OPERATEPERSON', align: 'center'},
                                    {text: '加油原因', width: 150, dataIndex: 'V_OPERATEREASON', align: 'center'},
                                   /* {text: '类型', width: 100, dataIndex: 'V_ADDORCHANGE', align: 'center'},*/
                                    {width: 0, dataIndex: 'V_LUBRICATIONCODE', align: 'center'},
                                    {width: 0, dataIndex: 'V_DEPTCODE', align: 'center'},
                                    {width: 0, dataIndex: 'V_EQUTYPECODE', align: 'center'},
                                    {width: 0, dataIndex: 'V_EQUCODE', align: 'center'}
                                ],
                                bbar: [{
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true,
                                    displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                                    emptyMsg: '没有记录'
                                    //store: 'sbbgStore'
                                }],
                                store: {
                                    //autoLoad: true,
                                    storeId: 'gridStore',
                                    pageSize: 20,
                                    autoLoad: false,
                                    loading: false,
                                    fields: ['V_EQUNAME', 'V_SETNAME', 'V_LUBADDRESS', 'V_LUBMODE', 'V_LUBTRADEMARK', 'F_LUBCOUNT',
                                        'F_OILAMOUNT', 'I_UNIT', 'D_OPERATEDATE', 'V_OPERATEPERSON', 'V_OPERATEREASON', 'V_LUBRICATIONCODE',
                                        'V_DEPTCODE', 'V_EQUTYPECODE', 'V_EQUCODE'],
                                    proxy: {
                                        type: 'ajax',
                                        async: true,
                                        url: AppUrl + 'zpf/PRO_QUERYLUBRECORD',
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        extraParams: {},
                                        reader: {
                                            type: 'json',
                                            root: 'list',
                                            total: 'total'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var windowAdd = Ext.create('Ext.window.Window', {
        id: 'dialogadd', title: '添加', autoShow: false, height: 360, closeAction: 'hide', width: 580, modal: true,
        layout: {type: 'column', columns: 5},
        defaults: {labelAlign: 'right', labelWidth: 80, width: 230, style: 'margin:12px 0px 0px 0px'},
        items: [
            {id: 'v_deptcode', xtype: 'hiddenfield', fieldLabel: '部门编码', hideLabel: true},
            {id: 'x_equcode', xtype: 'hiddenfield', fieldLabel: '设备类型编码', hideLabel: true},
            {id: 'x_equname', xtype: 'textfield', fieldStyle: 'background:#e7e7e7', fieldLabel: '设备位置', readOnly: true},
            {id: 'v_setname', xtype: 'textfield', fieldLabel: '装置名称'},{
                xtype : 'button',
                text : '+',
                handler : selectZZMC,
                width : 25,
                margin:'10px 10px 0px 10px'
            },
            {id: 'v_lubaddress', xtype: 'textfield', fieldLabel: '给油脂场所'},
            {
                id: 'x_lubmode',
                xtype: 'combo',
                editable: false,
                store: droplist_lubmode,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                fieldLabel: '润滑方式',
                queryMode: 'local'
            },
            {id: 'v_lubtrademark', xtype: 'textfield', fieldLabel: '润滑牌号'},
            {id: 'f_lubcount', xtype: 'textfield', fieldLabel: '润滑点数'},
            {id: 'f_oilamount', xtype: 'textfield', fieldLabel: '加油量', width: 168},
            //{ id: 'i_unit', xtype: 'combo', editable: false, width: 60, style: 'margin:12px 0px 0px 2px' },
            {
                id: 'i_unit',
                xtype: 'combo',
                editable: false,
                width: 60,
                style: 'margin:12px 0px 0px 2px',
                store: jylStore,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE'
            },

            {
                id: 'v_addorchange',
                xtype: 'combo',
                editable: false,
                store: droplist_lubaddtype,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                fieldLabel: '加油类型',
                queryMode: 'local'
            },
            {id: 'v_operateperson', xtype: 'textfield', fieldLabel: '加油人员'},
            {id: 'd_operatedate', xtype: 'datefield', fieldLabel: '加油时间', value: date, width: 200},
            {
                id: 'xiaoshi', xtype: 'combo', editable: false, width: 65,
                store: {
                    storeId: 'xiaoshi', fields: ['code', 'text'],
                    data: [
                        {code: "item0", text: "00时"}, {code: "item1", text: "01时"}, {code: "item2", text: "02时"}, {
                            code: "item3",
                            text: "3时"
                        }, {code: "item4", text: "04时"}, {code: "5item", text: "05时"}, {
                            code: "item6",
                            text: "06时"
                        }, {code: "item7", text: "07时"}, {code: "item8", text: "08时"}, {
                            code: "item9",
                            text: "09时"
                        }, {code: "item10", text: "10时"},
                        {code: "item11", text: "11时"}, {code: "item12", text: "12时"}, {
                            code: "item13",
                            text: "13时"
                        }, {code: "item14", text: "14时"}, {code: "item15", text: "15时"}, {
                            code: "item16",
                            text: "16时"
                        }, {code: "item17", text: "17时"}, {code: "item18", text: "18时"}, {
                            code: "item19",
                            text: "19时"
                        }, {code: "item20", text: "20时"},
                        {code: "item21", text: "21时"}, {code: "item22", text: "22时"}, {
                            code: "item23",
                            text: "23时"
                        }
                    ]
                }
            },
            {
                id: 'fenzhong', xtype: 'combo', editable: false, width: 65,
                store: {
                    storeId: 'fenzhong', fields: ['code', 'text'],
                    data: [
                        {code: "item0", text: "00分"}, {code: "item1", text: "01分"}, {code: "item2", text: "02分"}, {
                            code: "item3",
                            text: "03分"
                        }, {code: "item4", text: "04分"}, {code: "5item", text: "05分"}, {
                            code: "item6",
                            text: "06分"
                        }, {code: "item7", text: "07分"}, {code: "item8", text: "08分"}, {
                            code: "item9",
                            text: "09分"
                        }, {code: "item10", text: "10分"},
                        {code: "item11", text: "11分"}, {code: "item12", text: "12分"}, {
                            code: "item13",
                            text: "13分"
                        }, {code: "item14", text: "14分"}, {code: "item15", text: "15分"}, {
                            code: "item16",
                            text: "16分"
                        }, {code: "item17", text: "17分"}, {code: "item18", text: "18分"}, {
                            code: "item19",
                            text: "19分"
                        }, {code: "item20", text: "20分"},
                        {code: "item21", text: "21分"}, {code: "item22", text: "22分"}, {
                            code: "item23",
                            text: "23分"
                        }, {code: "item24", text: "24分"}, {code: "item25", text: "25分"}, {
                            code: "item26",
                            text: "26分"
                        }, {code: "item27", text: "27分"}, {code: "item28", text: "28分"}, {
                            code: "item29",
                            text: "29分"
                        }, {code: "item30", text: "30分"},
                        {code: "item31", text: "31分"}, {code: "item32", text: "32分"}, {
                            code: "item33",
                            text: "33分"
                        }, {code: "item34", text: "34分"}, {code: "item35", text: "35分"}, {
                            code: "item36",
                            text: "36分"
                        }, {code: "item37", text: "37分"}, {code: "item38", text: "38分"}, {
                            code: "item39",
                            text: "39分"
                        }, {code: "item40", text: "40分"},
                        {code: "item41", text: "41分"}, {code: "item42", text: "42分"}, {
                            code: "item43",
                            text: "43分"
                        }, {code: "item44", text: "44分"}, {code: "item45", text: "45分"}, {
                            code: "item46",
                            text: "46分"
                        }, {code: "item47", text: "47分"}, {code: "item48", text: "48分"}, {
                            code: "item49",
                            text: "49分"
                        }, {code: "item50", text: "50分"},
                        {code: "item51", text: "51分"}, {code: "item52", text: "52分"}, {
                            code: "item53",
                            text: "53分"
                        }, {code: "item54", text: "54分"}, {code: "item55", text: "55分"}, {
                            code: "item56",
                            text: "56分"
                        }, {code: "item57", text: "57分"}, {code: "item58", text: "58分"}, {
                            code: "item59",
                            text: "59分"
                        }
                    ]
                }
            },
            {id: 'v_operatereason', xtype: 'textarea', fieldLabel: '加油原因', width: 460}
        ],
        buttons: [{
            text: '保存',
            handler: function () {
                if (Ext.getCmp('v_setname').value == '') {
                    Ext.Msg.alert('操作信息', '请输入装置名称');
                    return false;
                } else if (Ext.getCmp('v_lubaddress').value == '') {
                    Ext.Msg.alert('操作信息', '请输入油脂场所');
                    return false;
                } /*else if (Ext.getCmp('f_lubcount').value == '') {
                    Ext.Msg.alert('操作信息', '请输入润滑点数');
                    return false;
                }*/ else if (Ext.getCmp('f_oilamount').value == '') {
                    Ext.Msg.alert('操作信息', '请输入加油量');
                    return false;
                } else if (Ext.getCmp('i_unit').getValue() == null) {
                    Ext.Msg.alert('操作信息', '请输入加油量计量单位');
                    return false;
                } else if (Ext.getCmp('d_operatedate').getValue() == null || Ext.getCmp('xiaoshi').getValue() == null || Ext.getCmp('fenzhong').getValue() == null) {
                    Ext.Msg.alert('操作信息', '请输入加油时间');
                    return false;
                }
                else {
                    var day = Ext.Date.format(Ext.getCmp('d_operatedate').value, 'Y-m-d');
                    var hour = (Ext.getCmp('xiaoshi').value).substring(0, 2);
                    var min = (Ext.getCmp('fenzhong').value).substring(0, 2);
                    var time = day + ' ' + hour + ':' + min + ':' + '00';
                    Ext.Ajax.request({
                        url: AppUrl + 'zpf/pro_addlubrecord',
                        method: 'POST',
                        async: false,
                        params: {
                            x_deptcode: Ext.getCmp('v_deptcode').value,
                            x_equcode: Ext.getCmp('x_equcode').value,
                            x_setname: Ext.getCmp('v_setname').value,
                            x_lubaddress: Ext.getCmp('v_lubaddress').value,
                            x_lubmode: Ext.getCmp('x_lubmode').value,
                            x_lubtrademark: Ext.getCmp('v_lubtrademark').value,
                            x_lubcount: Ext.getCmp('f_lubcount').value==''?'0':Ext.getCmp('f_lubcount').value,
                            x_oilamount: Ext.getCmp('f_oilamount').value,
                            x_addorchange: Ext.getCmp('v_addorchange').value,
                            x_operatedate: time,
                            x_operateperson: Ext.getCmp('v_operateperson').value,
                            x_operatereason: Ext.getCmp('v_operatereason').value,
                            x_unit: Ext.getCmp('i_unit').value
                        },
                        success: function (response) {

                            var resp = Ext.JSON.decode(response.responseText);

                            Ext.MessageBox.alert('操作信息', '操作成功.', function () {

                                Ext.getCmp('dialogadd').hide();

                                query();

                            });

                        }
                    });
                }
            }
        }, {
            text: '取消',
            handler: function () {
                windowAdd.hide();
            }
        }, {
            text: '重置',
            handler: function () {
                Ext.getCmp('v_setname').reset();
                Ext.getCmp('v_lubaddress').reset();
                Ext.getCmp('x_lubmode').reset();
                Ext.getCmp('v_lubtrademark').reset();
                Ext.getCmp('f_lubcount').reset();
                Ext.getCmp('f_oilamount').reset();
                Ext.getCmp('i_unit').reset();
                Ext.getCmp('v_addorchange').reset();
                Ext.getCmp('v_operateperson').reset();
                Ext.getCmp('d_operatedate').reset();
                Ext.getCmp('xiaoshi').reset();
                Ext.getCmp('fenzhong').reset();
                Ext.getCmp('v_operatereason').reset();
            }
        }]
    })

    var windowEdit = Ext.create('Ext.window.Window', {
        id: 'dialogedit', title: '修改', autoShow: false, height: 360, closeAction: 'hide', width: 580, modal: true,
        layout: {type: 'column', columns: 5},
        defaults: {labelAlign: 'right', labelWidth: 80, width: 230, style: 'margin:12px 0px 0px 0px'},
        items: [
            {id: 'v_deptcode2', xtype: 'hiddenfield', fieldLabel: '部门编码', hideLabel: true},

            {id: 'x_equcode2', xtype: 'hiddenfield', fieldLabel: '设备类型编码', hideLabel: true},
            {
                id: 'x_equname2',
                xtype: 'textfield',
                fieldLabel: '设备位置',
                fieldStyle: 'background:#e7e7e7',
                readOnly: true
            },
            {id: 'v_setname2', xtype: 'textfield', fieldLabel: '装置名称'},
            {
                xtype : 'button',
                text : '+',
                handler : selectZZMC,
                width : 25,
                margin:'10px 10px 0px 10px'
            },
            {id: 'v_lubaddress2', xtype: 'textfield', fieldLabel: '给油脂场所'},
            {
                id: 'x_lubmode2',
                xtype: 'combo',
                editable: false,
                store: droplist_lubmode,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                fieldLabel: '润滑方式',
                listeners: {
                    select: function (store, field, newValue, oldValue) {
                        // Ext.getCmp('x_lubmode2').select(store.first());
                        Ext.getCmp('x_lubmode2').select(Ext.getStore('droplist_lubmode').first());
                    }
                }
            },
            {id: 'v_lubtrademark2', xtype: 'textfield', fieldLabel: '润滑牌号'},
            {id: 'f_lubcount2', xtype: 'textfield', fieldLabel: '润滑点数'},
            {id: 'f_oilamount2', xtype: 'textfield', fieldLabel: '加油量', width: 168},
            {
                id: 'i_unit2',
                xtype: 'combo',
                editable: true,
                width: 60,
                style: 'margin:12px 0px 0px 2px',
                store: jylStore,//加油量数据集
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE'
            },
            {
                id: 'v_addorchange2',
                xtype: 'combo',
                editable: false,
                store: droplist_lubaddtype,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                fieldLabel: '加油类型',
                queryMode: 'local'
            },
            {id: 'v_operateperson2', xtype: 'textfield', fieldLabel: '加油人员'},
            {id: 'd_operatedate2', xtype: 'datefield', fieldLabel: '加油时间', width: 200},
            {
                id: 'xiaoshi2', xtype: 'combo', editable: false, width: 65,
                store: {
                    storeId: 'xiaoshi', fields: ['code', 'text'],
                    data: [
                        {code: "item0", text: "00时"}, {code: "item1", text: "01时"}, {code: "item2", text: "02时"}, {
                            code: "item3",
                            text: "3时"
                        }, {code: "item4", text: "04时"}, {code: "5item", text: "05时"}, {
                            code: "item6",
                            text: "06时"
                        }, {code: "item7", text: "07时"}, {code: "item8", text: "08时"}, {
                            code: "item9",
                            text: "09时"
                        }, {code: "item10", text: "10时"},
                        {code: "item11", text: "11时"}, {code: "item12", text: "12时"}, {
                            code: "item13",
                            text: "13时"
                        }, {code: "item14", text: "14时"}, {code: "item15", text: "15时"}, {
                            code: "item16",
                            text: "16时"
                        }, {code: "item17", text: "17时"}, {code: "item18", text: "18时"}, {
                            code: "item19",
                            text: "19时"
                        }, {code: "item20", text: "20时"},
                        {code: "item21", text: "21时"}, {code: "item22", text: "22时"}, {
                            code: "item23",
                            text: "23时"
                        }
                    ]
                }
            },
            {
                id: 'fenzhong2', xtype: 'combo', editable: false, width: 65,
                store: {
                    storeId: 'fenzhong2', fields: ['code', 'text'],
                    data: [
                        {code: "item0", text: "00分"}, {code: "item1", text: "01分"}, {code: "item2", text: "02分"}, {
                            code: "item3",
                            text: "03分"
                        }, {code: "item4", text: "04分"}, {code: "5item", text: "05分"}, {
                            code: "item6",
                            text: "06分"
                        }, {code: "item7", text: "07分"}, {code: "item8", text: "08分"}, {
                            code: "item9",
                            text: "09分"
                        }, {code: "item10", text: "10分"},
                        {code: "item11", text: "11分"}, {code: "item12", text: "12分"}, {
                            code: "item13",
                            text: "13分"
                        }, {code: "item14", text: "14分"}, {code: "item15", text: "15分"}, {
                            code: "item16",
                            text: "16分"
                        }, {code: "item17", text: "17分"}, {code: "item18", text: "18分"}, {
                            code: "item19",
                            text: "19分"
                        }, {code: "item20", text: "20分"},
                        {code: "item21", text: "21分"}, {code: "item22", text: "22分"}, {
                            code: "item23",
                            text: "23分"
                        }, {code: "item24", text: "24分"}, {code: "item25", text: "25分"}, {
                            code: "item26",
                            text: "26分"
                        }, {code: "item27", text: "27分"}, {code: "item28", text: "28分"}, {
                            code: "item29",
                            text: "29分"
                        }, {code: "item30", text: "30分"},
                        {code: "item31", text: "31分"}, {code: "item32", text: "32分"}, {
                            code: "item33",
                            text: "33分"
                        }, {code: "item34", text: "34分"}, {code: "item35", text: "35分"}, {
                            code: "item36",
                            text: "36分"
                        }, {code: "item37", text: "37分"}, {code: "item38", text: "38分"}, {
                            code: "item39",
                            text: "39分"
                        }, {code: "item40", text: "40分"},
                        {code: "item41", text: "41分"}, {code: "item42", text: "42分"}, {
                            code: "item43",
                            text: "43分"
                        }, {code: "item44", text: "44分"}, {code: "item45", text: "45分"}, {
                            code: "item46",
                            text: "46分"
                        }, {code: "item47", text: "47分"}, {code: "item48", text: "48分"}, {
                            code: "item49",
                            text: "49分"
                        }, {code: "item50", text: "50分"},
                        {code: "item51", text: "51分"}, {code: "item52", text: "52分"}, {
                            code: "item53",
                            text: "53分"
                        }, {code: "item54", text: "54分"}, {code: "item55", text: "55分"}, {
                            code: "item56",
                            text: "56分"
                        }, {code: "item57", text: "57分"}, {code: "item58", text: "58分"}, {
                            code: "item59",
                            text: "59分"
                        }
                    ]
                }
            },
            {id: 'v_operatereason2', xtype: 'textarea', fieldLabel: '加油原因', width: 460},
            {id: 'v_lubricationcode', xtype: 'hiddenfield', hideLabel: true}
        ],
        buttons: [{
            text: '保存',
            handler: function () {
                var day = Ext.Date.format(Ext.getCmp('d_operatedate2').value, 'Y-m-d');
                var hour = (Ext.getCmp('xiaoshi2').value).substring(0, 2);
                var min = (Ext.getCmp('fenzhong2').value).substring(0, 2);
                var time = day + ' ' + hour + ':' + min + ':' + '00';
                Ext.Ajax.request({
                    url: AppUrl + 'zpf/pro_alterlubrecord',
                    method: 'POST',
                    async: false,
                    params: {
                        x_setname: Ext.getCmp('v_setname2').value,
                        x_lubaddress: Ext.getCmp('v_lubaddress2').value,
                        x_lubmode: Ext.getCmp('x_lubmode2').getValue(),
                        x_lubtrademark: Ext.getCmp('v_lubtrademark2').value,
                        x_lubcount: Ext.getCmp('f_lubcount2').value,
                        x_oilamount: Ext.getCmp('f_oilamount2').value,
                        x_addorchange: Ext.getCmp('v_addorchange2').value,
                        x_operatedate: time,
                        x_operateperson: Ext.getCmp('v_operateperson2').getValue(),
                        x_operatereason: Ext.getCmp('v_operatereason2').value,
                        x_unit: Ext.getCmp('i_unit2').getValue(),
                        x_lubricationcode: Ext.getCmp('v_lubricationcode').value//selected.V_LUBRICATIONCODE
                    },
                    success: function () {
                        Ext.MessageBox.alert('操作信息', '操作成功.', function () {

                            Ext.getCmp('dialogedit').hide();

                            query();

                        });
                    },
                    failure: function () {
                        Ext.MessageBox.alert('操作信息', '操作失败.');
                    }
                });
            }
        }, {
            text: '取消', handler: function () {
                windowEdit.hide();
            }
        }]
    })


    var gridPanelZZMC = Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout: 'border',
        items: [{
            xtype: 'gridpanel',
            id: 'gridZZMC',
            region: 'center',
            store: 'gridZZMCStore',
            columnLines: true,
            multiSelect: true,
            autoScroll: true,
            columns: [
                { text: '装置名称', width: 90, align: 'center', dataIndex: 'V_ZZMCNAME' }
            ]
        }]
    });
    var PanelZZMC = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'hbox',
        items: [{id: 'zzmc', xtype: 'textfield', fieldLabel: '装置名称',width:200,labelWidth: 80,
            margin:'10px 10px 10px 10px'},
            {
                xtype : 'button',
                text : '查询',
                handler : queryZZMC,
                margin:'10px 10px 10px 10px'
            },]
    });
    var window = Ext.create('Ext.window.Window', {
        id: 'windowZZMC',
        title: '装置名称选择',
        autoShow: false,
        height: 360,
        closeAction: 'hide',
        width: 380,
        modal: true,
        layout:'border',
        items: [ PanelZZMC,gridPanelZZMC],
        buttons: [{
            text: '选择',
            handler: function () {
                var zzmc=Ext.getCmp('gridZZMC').getSelectionModel().getSelection()[0].raw.V_ZZMCNAME;
                Ext.getCmp('v_setname').setValue(zzmc);
                Ext.getCmp('v_setname2').setValue(zzmc);
                Ext.getCmp('windowZZMC').hide();

            }
        }, {
            text: '取消',
            handler: function () {
                Ext.getCmp('windowZZMC').hide();
            }
        }]
    })
    Ext.create('Ext.container.Viewport', {
        split: true, autoScroll: true,
        layout: 'border',
        items: [panel]
    });

    Ext.getCmp("v_addorchange2").getStore().on("load", function () {

        Ext.getCmp("v_addorchange2").select(0);
    });

    Ext.getCmp("treepanel").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTNEXTCODE: Ext.util.Cookies.get('v_deptcode'),
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_EQU_TREE')
        } else if (operation.node.data.parentid == -2) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTNEXTCODE: Ext.util.Cookies.get('v_deptcode'),
                    V_V_EQUTYPECODE: operation.node.parentNode.data.sid,
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });
    _queryTree();
});

//树查询
function _queryTree() {
    Ext.getCmp('treepanel').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'CarManage/PRO_GET_DEPTEQUTYPE_PER',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode')
        }
    });
    Ext.getCmp('treepanel').store.load();
}

function query() {
    Ext.ComponentManager.get("gridpanel").getStore().load({
        params: {
            X_TIMELOWERLIMIT: '1900-1-1',
            X_TIMEUPPERLIMIT: '2200-1-1',
            X_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
            X_EQUTYPECODE: X_EQUTYPECODE_,
            X_EQUCODE: X_EQUCODE_,
            X_LUBRICATIONCODE: '',
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTTYPE:'主体作业区'
        }
    });
}

function OnClick(view, record, item, index) {
    var x_equtypename = record.data.text;
    var x_deptcode = Ext.util.Cookies.get('v_deptcode');
    var x_equtypecode = record.data.sid;

    Ext.getCmp('x_equtypename1').setValue(x_equtypename);
    Ext.getCmp('v_deptcode1').setValue(x_deptcode);
    Ext.getCmp('v_equtypecode1').setValue(x_equtypecode);
/*
    if (record.get('leaf')) {
        globalTree = record;
        X_EQUTYPECODE_ = globalTree.parentNode.parentNode.data.sid;
        X_EQUCODE_ = globalTree.data.sid;
        query();
    } else {
        globalTree = null;
    }*/
    if(record.raw.V_EQUTYPECODE==undefined){
        globalTree = null;
    }else if (record.get('leaf')) {
        globalTree = record;
        X_EQUTYPECODE_ = globalTree.parentNode.parentNode.data.sid;
        X_EQUCODE_ = globalTree.data.sid;
        query();
    }else{
        globalTree = record;
        X_EQUTYPECODE_ = record.raw.V_EQUTYPECODE;
        X_EQUCODE_ = globalTree.data.sid;
        query();
    }
}

function selectZZMC(){
    Ext.getCmp('windowZZMC').show()
}

function queryZZMC(){
    Ext.data.StoreManager.lookup('gridZZMCStore').load({
        params : {
            V_ZZMC:Ext.getCmp("zzmc").getValue()
        }
    });
}


