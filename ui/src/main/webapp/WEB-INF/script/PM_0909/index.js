Ext.onReady(function() {
        Ext.QuickTips.init();
        var selPlantstore = Ext.create('Ext.data.Store', {
            autoLoad : true,
            storeId : 'selPlantstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                // url: '/No4101/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                },
                extraParams : {
                    V_V_PERSONCODE:   Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE:    Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTCODENEXT:    Ext.util.Cookies.get('v_deptcode'),
                    V_V_DEPTTYPE:   '[基层单位]'
                }
            }
        });

        var selSectionstore = Ext.create('Ext.data.Store', {
            autoLoad : false,
            storeId : 'selSectionstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                }
            }
        });

        var panel = Ext.create('Ext.panel.Panel', {
                id : 'panellow',
                region : 'north',
                layout : 'column',
                defaults : {
                    style : 'margin:5px 0px 5px 5px',
                    labelAlign : 'right'
                },
                border:false,
                frame:true,
                items : [
                            {xtype: 'datefield',
                                id:'startTime',
                                format : 'Y-m-d',
                                fieldLabel: '时间段选择',
                                editable: false,
                                labelAlign: 'right',
                                labelWidth:80,
                                value:''
                            }, {xtype: 'datefield',
                                id:'endTime',
                                format : 'Y-m-d',
                                fieldLabel: '至',
                                editable: false,
                                labelAlign: 'right',
                                labelWidth:80
                            },
                            {
                                xtype : 'combo',
                                id : "selPlant",
                                store : selPlantstore,
                                editable : false,
                                queryMode : 'local',
                                fieldLabel : '单位名称',
                                displayField : 'V_DEPTNAME',
                                valueField : 'V_DEPTCODE',
                                labelWidth:80,
                                labelAlign : 'right'
                            },
                            {
                                xtype : 'combo',
                                id : "selSection",
                                store : selSectionstore,
                                editable : false,
                                queryMode : 'local',
                                fieldLabel : '作业区名称',
                                displayField : 'V_DEPTNAME',
                                valueField : 'V_DEPTCODE',
                                labelWidth:80,
                                labelAlign : 'right'
                            },
                            {
                                xtype : 'combo',
                                id : "selStatus",
                                fieldLabel : '状态类型',
                                editable : false,
                                labelWidth:80,
                                labelAlign : 'right',
                                store : [ [ '1', '全部' ],
                                    [ '3', '已打印' ] ]
                            }, {
                                xtype : 'combo',
                                id : "sblx",
                                fieldLabel : '设备类型',
                                editable : false,
                                labelWidth:80,
                                labelAlign : 'right'
                            },
                           {
                                xtype : 'combo',
                                id : "sbmc",
                                fieldLabel : '设备名称',
                                editable : false,
                                labelWidth:80,
                                labelAlign : 'right'
                            } ,
                            {
                                xtype : 'combo',
                                id : "djy",
                                fieldLabel : '点检员',
                                editable : false,
                                labelWidth : 80,
                                labelAlign : 'right'
                            },
                            {
                                xtype : 'textfield',
                                id : 'seltext',
                                emptyText : '按工单描述模糊查询',
                                labelAlign : 'right',
                                width : 158,
                                margin:'5px 0px 5px 90px'
                            }, {
                                xtype : 'textfield',
                                id : 'text2',
                                emptyText : '按使用物料模糊查询',
                                labelAlign : 'right',
                                width : 158,
                                margin:'5px 0px 5px 90px'
                            },
                            {
                                xtype : 'button',
                                text : '查询',
                                icon: imgpath + '/search.png',
                                width : 100,
                                handler : function() {
                                    Ext.data.StoreManager .lookup('gridStore') .load(
                                        {
                                            params : {
                                                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                                                V_V_ORGCODE :  Ext.getCmp('selPlant').getValue(),
                                                V_V_DEPTCODE :  Ext.getCmp('selSection').getValue(),
                                                V_V_DEPTCODEREPARIR : '99060315',//Ext.util.Cookies.get('v_deptcode'),
                                                V_V_STATECODE : Ext.getCmp("selStatus").getValue(),
                                                V_V_SHORT_TXT :   Ext.getCmp("seltext").getValue()
                                            }
                                        })
                                }
                            },
                            {
                                xtype : 'button',
                                id : 'excel',
                                text : '导出EXCEL',
                                icon: imgpath + '/grid.png',
                                width : 100,
                                listeners : {
                                    click : OnButtonCreateBillClicked
                                }
                            }
                        ]
            });
        var grid = Ext.create('Ext.grid.Panel',
            {
                id : 'grid',
                region : 'center',
                columnLines : true,
                width : '100%',
                store : {
                    id : 'gridStore',
                    autoLoad : false,
                    fields : [ 'ID', 'V_ORDERGUID', 'V_ORDERID',
                        'V_SHORT_TXT', 'V_EQUIP_NO',
                        'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE',
                        'V_ORGNAME', 'V_DEPTNAME', 'V_PERSONNAME',
                        'D_ENTER_DATE', 'V_DEPTNAMEREPARIR','V_ORDER_TYP_TXT' ],
                    proxy : {
                        type : 'ajax',
                        async : false,
                        url : AppUrl + 'PM_09/PM_09_WORKORDER_LIST_REPAIR',
                        // url: '/No4101/PRO_PM_WORKORDER_LIST_VIEW',
                        actionMethods : {
                            read : 'POST'
                        },
                        reader : {
                            type : 'json',
                            root : 'list'
                        }
                    }
                },
                autoScroll : true,
                selType : 'checkboxmodel',
                height : 400,
                columns : [ {
                    xtype : 'rownumberer',
                    text : '序号',
                    width : 50,
                    align : 'center'
                }, {
                    text : '工单GUID',
                    dataIndex : 'V_ORDERGUID',
                    hidden : true,
                    renderer : CreateGridColumnTd
                }, {
                    text : '工单号',
                    dataIndex : 'V_ORDERID',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '工单描述',
                    dataIndex : 'V_SHORT_TXT',
                    renderer : CreateGridColumnTd,
                    width : 300,
                    align : 'center'
                }, {
                    text : '设备编号',
                    dataIndex : 'V_EQUIP_NO',
                    hidden : true,
                    renderer : CreateGridColumnTd
                }, {
                    text : '设备名称',
                    dataIndex : 'V_EQUIP_NAME',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '设备位置',
                    dataIndex : 'V_EQUSITENAME',
                    width : 250,
                    algin : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '备件消耗',
                    dataIndex : 'V_SPARE',
                    width : 300,
                    align : 'center',
                    renderer : CreateGridColumnTd
                },{
                    text : '委托单位',
                    dataIndex : 'V_DEPTNAME',
                    width : 100,
                    algin : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '委托人',
                    dataIndex : 'V_PERSONNAME',
                    width : 100,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '委托时间',
                    dataIndex : 'D_ENTER_DATE',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '检修单位',
                    dataIndex : 'V_DEPTNAMEREPARIR',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                } ],
                listeners : {
                    itemdblclick : itemClick
                }
            });

    Ext.data.StoreManager.lookup('selPlantstore').on("load", function() {
        Ext.getCmp("selPlant").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));
        //Ext.ComponentManager.get("selStatus").select("1");
        Ext.data.StoreManager.lookup('selSectionstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('selPlant').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.getCmp('selPlant').on('select', function () {
        Ext.data.StoreManager.lookup('selSectionstore').removeAll();
        Ext.data.StoreManager.lookup('selSectionstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('selPlant').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
        Ext.data.StoreManager.lookup('selSectionstore').on("load",function() {
            Ext.getCmp("selSection").select(
                Ext.data.StoreManager.lookup('selSectionstore')
                    .getAt(0));

        });

        Ext.getCmp('selPlant').on(
            "change",
            function() {
                Ext.data.StoreManager.lookup('selSectionstore')
                    .removeAll();
                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params : {
                            'V_REPAIRDEPTCODE': Ext.util.Cookies.get('v_deptcode'),
                            'V_PERSONCODE':  Ext.util.Cookies.get('v_personcode')
                        }
                    });
            });

        Ext.getCmp('selStatus').on("change",function() {});

        Ext.getCmp('selSection').on("change",function() {
            Ext.data.StoreManager.lookup('gridStore').load({
                params : {
                    V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                    V_V_ORGCODE :  Ext.getCmp('selPlant').getValue(),
                    V_V_DEPTCODE :  Ext.getCmp('selSection').getValue(),
                    V_V_DEPTCODEREPARIR : Ext.util.Cookies.get('v_deptcode'),
                    V_V_STATECODE : Ext.getCmp("selStatus").getValue(),
                    V_V_SHORT_TXT :   Ext.getCmp("seltext").getValue()
                }
            });
        });

        Ext.create('Ext.container.Viewport', {
            id : "id",
            layout : 'border',
            items : [ panel, grid ]
        });
    });

function MoreAcceptBill() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (id == ' 0') {
        Ext.example.msg('操作信息', '{0}', '请选择数据接收工单');
        return;
    } else {
        var selectedRecord = Ext.getCmp("grid").getSelectionModel()
            .getSelection();
        var selectID = [];
        Ext.Array.each(selectedRecord, function(V_ORDERGUID, index) {
            selectID.splice(index, 0, V_ORDERGUID.data.V_ORDERGUID);
        });
        var i_err = 0;
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            Ext.Ajax.request({
                url : AppUrl + '/ModelChange',
                method : 'post',
                async:false,
                params : {
                    parName : [ 'V_V_PERSONCODE', 'V_V_ORDERGUID' ],
                    parType : [ 's', 's' ],
                    parVal : [ Ext.util.Cookies.get('v_personcode'),
                        selectModel.getSelection()[i].data.V_ORDERGUID ],
                    proName : 'PRO_PM_WORKORDER_JS_REPAIRDEPT',
                    returnStr : 'V_CURSOR',
                    returnStrType : [ 's' ]
                },
                success : function(resp) {
                    if (resp[0] == '成功') {
                        Ext.example.msg('操作信息', '{0}', '工单接收失败');
                        i_err++;
                    }
                }

            });
        }
        if (i_err == 0) {
            Ext.example.msg('操作信息', '{0}', '工单接收成功');
        }
        Ext.data.StoreManager.lookup('gridStore')
            .load(
            {
                params : {
                    V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                    V_V_ORGCODE :  Ext.getCmp('selPlant').getValue(),
                    V_V_DEPTCODE :  Ext.getCmp('selSection').getValue(),
                    V_V_DEPTCODEREPARIR : Ext.util.Cookies.get('v_deptcode'),
                    V_V_STATECODE : Ext.getCmp("selStatus").getValue(),
                    V_V_SHORT_TXT :   Ext.getCmp("seltext").getValue()
                }
            });
    }
}

function itemClick(s, record, item, index, e, eOpts) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_090801/index.html?V_YEARPLAN_GUID=0'+ "&year="+ Ext.getCmp("year").getValue()+"&V_ORGCODE="+V_ORGCODE + "&V_DEPTCODE="
    + Ext.getCmp("ck").getValue() + "&V_DEPTNEXTCODE="+ V_DEPTNEXTCODE+'&V_STATUSCODE=0' , '','height=600px,width=1200px,top=50px,left=100px,resizable=yes');

    var returnValue=window.showModalDialog(AppUrl + "/No412001/Index_aq.html?V_GUID="+record.data.V_ORDERGUID+'&personname='+Ext.util.Cookies.get('v_personname2') ,
        "", "dialogHeight:700px;dialogWidth:1100px");
}

function GetBillMatByOrder( s_orderid,s_orderguid){

    Ext.Ajax.request({
        url:AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        async : false,
        method : 'POST',
        params : {
            parName : [ 'orderid','V_V_ORDERGUID' ],
            parType : [  's', 's' ],
            parVal : [s_orderid,s_orderguid
            ]
        },
        failure :function(){},
        success : function(ret) {

        }
    });
}
function OnButtonCreateBillClicked() {
    if(Ext.getCmp('selStatus').getValue()=="2"){}else{ MoreAcceptBill();}


    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (id == 0) {
        Ext.example.msg('操作信息', '{0}', '请选择数据打印工单');
        return;
    } else {
        var selectedRecord = Ext.getCmp("grid").getSelectionModel()
            .getSelection();
        var selectID = [];
        Ext.Array.each(selectedRecord, function(V_ORDERGUID, index) {
            GetBillMatByOrder(V_ORDERGUID.data.V_ORDERI,V_ORDERGUID.data.V_ORDERGUID);
            selectID.splice(index, 0, V_ORDERGUID.data.V_ORDERGUID);
        });
        window.showModalDialog(AppUrl + "/No410101/Index.html", selectID,
            "dialogHeight:700px;dialogWidth:1100px");

    }
}

function QueryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params : {
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_ORGCODE :  Ext.getCmp('selPlant').getValue(),
            V_V_DEPTCODE :  Ext.getCmp('selSection').getValue(),
            V_V_DEPTCODEREPARIR : Ext.util.Cookies.get('v_deptcode'),
            V_V_STATECODE : Ext.getCmp("selStatus").getValue(),
            V_V_SHORT_TXT :   Ext.getCmp("seltext").getValue()
        }
    });
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}