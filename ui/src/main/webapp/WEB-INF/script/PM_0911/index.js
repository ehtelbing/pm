var selectID = [];
Ext.onReady(function() {
    Ext.QuickTips.init();
    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : [ 'ID',
            'V_ORDERGUID',
            'V_ORDERID',
            'V_SHORT_TXT',
            'V_EQUIP_NO',
            'V_EQUIP_NAME',
            'V_EQUSITENAME',
            'V_SPARE',
            'V_ORGNAME',
            'V_DEPTNAME',
            'V_PERSONNAME',
            'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR',
            'V_ORDER_TYP_TXT',
            'V_REPAIRCONTENT',
            'V_DEPTCODEREPARIR',
            'OIL_COUNT',
            'RUN_COUNT'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_LIST_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad : true,
        storeId : 'ckStore',
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
            },
            extraParams : {
                V_V_PERSONCODE:   Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:    Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT:    Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:   '[基层单位]'
            }
        }
    });

    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'zyqStore',
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
        border:false,
        layout : 'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items:[
            {
                xtype : 'combo',
                id : "ck",
                store : ckStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '单位名称',
                displayField : 'V_DEPTNAME',
                valueField : 'V_DEPTCODE',
                labelWidth : 80,
                labelAlign : 'right'
            },
            {
                xtype : 'combo',
                id : "zyq",
                store : zyqStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '作业区名称',
                displayField : 'V_DEPTNAME',
                valueField : 'V_DEPTCODE',
                labelWidth : 80,
                labelAlign : 'right'
            },
            {
                xtype : 'combo',
                id : "ztlx",
                fieldLabel : '状态类型',
                editable : false,
                labelWidth : 80,
                labelAlign : 'right',
                queryMode: 'local',
                value:'3',
                store : [ [ '3', '未验收' ], [ '4', '已验收' ] ]
            },{
                xtype : 'textfield',
                id : 'seltext',
                fieldLabel : '检修内容',
                labelAlign : 'right',
                labelWidth : 80,
            },
            {
                xtype : 'button',
                text : '查询',
                icon: imgpath + '/search.png',
                width : 100,
                handler : queryGrid
            },
            {
                xtype : 'button',
                id : 'check',
                text : '验收',
                icon: imgpath + '/grid.png',
                width : 100,
                listeners : {
                    click : FeedCheckButtonClicked
                }
            },
            {
                xtype : 'label',
                html : '<span style="color:red;">注：双击查看单条工单验收</span>',
                width : 170,
                margin:'10px 0px 5px 10px'
            }
        ]
    });
    var grid = Ext.create('Ext.grid.Panel',
        {
            id : 'grid',
            region : 'center',
            columnLines : true,
            store :gridStore,
            autoScroll : true,
            selType : 'checkboxmodel',
            columns : [  {
                xtype : 'rownumberer',
                text : '序号',
                width : 50,
                align : 'center'
            },{
                text : '重点备件',
                width : 80,
                dataIndex : 'RUN_COUNT',
                align : 'center',
                renderer : function(value, metaData, record) {
                    if(value>0){
                        return '<a target="_blank"  href="'+AppUrl+'page/PM_091101/index.html?equid='+record.data.V_EQUIP_NO+'");>更换</a>';
                    }
                    else{
                        return null;
                    }
                }
            },{
                text : '润滑管理',
                width : 80,
                dataIndex : 'OIL_COUNT',
                align : 'center',
                renderer : function(value, metaData, record) {
                    if(value>0){
                        return '<a target="_blank" href="http://10.101.10.46:7001/JMM/page/oil/3_1.jsp?equid='+record.data.V_EQUIP_NO+'&userid='+Ext.util.Cookies.get('v_personcode')+'");>写实</a>';
                    }
                    else{
                        return null;
                    }
                }
            }, /*{
                text : '工单GUID',
                dataIndex : 'V_ORDERGUID',
                hidden : false
            },*/ {
                text : '工单号',
                dataIndex : 'V_ORDERID',
                width : 150,
                align : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '工单描述',
                dataIndex : 'V_SHORT_TXT',
                width : 300,
                align : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '设备名称',
                dataIndex : 'V_EQUIP_NAME',
                width : 200,
                align : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '委托人',
                dataIndex : 'V_PERSONNAME',
                width : 150,
                align : 'center'
            }, {
                text : '委托时间',
                dataIndex : 'D_ENTER_DATE',
                width : 200,
                align : 'center',
                renderer : rendererTime
            }, {
                text : '检修方说明',
                dataIndex : 'V_REPAIRCONTENT',
                width : 150,
                align : 'center',
                renderer : CreateGridColumnTd
            },{
                text : '设备编号',
                dataIndex : 'V_EQUIP_NO',
                hidden : true
            }, {
                text : '设备位置',
                dataIndex : 'V_EQUSITENAME',
                width : 250,
                algin : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '备件消耗',
                dataIndex : 'V_SPARE',
                width : 250,
                align : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '厂矿',
                dataIndex : 'V_ORGNAME',
                width : 150,
                align : 'center'
            }, {
                text : '委托单位',
                dataIndex : 'V_DEPTNAME',
                width : 100,
                algin : 'center'
            }, {
                text : '检修单位',
                dataIndex : 'V_DEPTNAMEREPARIR',
                width : 150,
                align : 'center',
                renderer : CreateGridColumnTd
            }, {
                text : '工单类型描述',
                dataIndex : 'V_ORDER_TYP_TXT',
                width : 100,
                align : 'center',
                renderer : CreateGridColumnTd
            }  ],
            listeners : {
                itemdblclick : itemClick
            },
            bbar : [ {
                xtype : 'pagingtoolbar',
                dock : 'bottom',
                id : 'page',
                displayInfo : true,
                displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg : '没有记录',
                store : gridStore
            } ]
        });
    //厂矿加载监听
    Ext.data.StoreManager.lookup('ckStore').on("load", function() {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.ComponentManager.get("ztlx").select("3");
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyqStore').on("load",function() {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));

    });

    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').removeAll();
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.getCmp('zyq').on('select', function() {
        Ext.ComponentManager.get('sblx').getStore().removeAll();

    });
    Ext.getCmp('ztlx').on("change", function() {
        if (Ext.ComponentManager.get("ztlx").getValue() == '3') {
            Ext.ComponentManager.get('check').show();
        } else if (Ext.ComponentManager.get("ztlx").getValue() == '4') {
            Ext.ComponentManager.get('check').hide();
        }
    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel, grid ]
    });
    queryGrid();
});



function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    var val=value==null?'':value;
    return '<div data-qtip="' + val + '" >' + val + '</div>';
}
function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            'V_V_ORGCODE':Ext.ComponentManager.get('ck').getValue(),
            'V_V_DEPTCODE':Ext.ComponentManager.get('zyq').getValue(),
            'V_V_DEPTCODEREPARIR': Ext.util.Cookies.get('v_personcode'),//'',
            'V_V_STATECODE':Ext.ComponentManager.get('ztlx').getValue(),
            'V_V_SHORT_TXT':Ext.ComponentManager.get('seltext').getValue()
        }
    });
}
//验收
function FeedCheckButtonClicked() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (length !=1) {
        Ext.Msg.alert('操作信息','请选择数据验收工单!');
        return false;
    } else {
        var V_ORDERGUID = selectModel.getSelection()[0].data.V_ORDERGUID;
        var V_ORDERID = selectModel.getSelection()[0].data.V_ORDERID;

        Ext.Ajax.request({
            url:AppUrl+'mm/GetBillMaterialByOrder',
            type:'post',
            async:false,
            params:{
                V_V_ORDERID:V_ORDERID,
                V_V_ORDERGUID:V_ORDERGUID,
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            },
            success:function(response){
                var resp=Ext.decode(response.responseText);
                if(resp.ret=='Success'){
                    //alert("工单创建成功");
                }else{
                    //alert("接口调用失败");
                }
            }
        });
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl +'page/PM_091103/index.html?V_GUID='+V_ORDERGUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}

function itemClick(s, record, item, index, e, eOpts) {
    Ext.Ajax.request({
        url:AppUrl+'mm/GetBillMaterialByOrder',
        type:'post',
        async:false,
        params:{
            V_V_ORDERID:Ext.getStore("gridStore").getAt(index).get("V_ORDERID"),
            V_V_ORDERGUID:Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
        },
        success:function(response){
            var resp=Ext.decode(response.responseText);
            if(resp.ret=='Success'){
                //alert("工单创建成功");
            }else{
                //alert("接口调用失败");
            }
        }
    });
    if (Ext.getCmp("ztlx").getValue() == '3') {//验收明细
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl +'page/PM_091103/index.html?V_GUID='+Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),'','height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    } else {//打印
        /*var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl +'page/PM_090701/index.html?V_ORDERGUID='+Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');*/

        selectID.push(record.data.V_ORDERGUID);
        window.open(AppUrl + "page/No410101/Index.html", selectID,
            "dialogHeight:700px;dialogWidth:1100px");
    }
}
