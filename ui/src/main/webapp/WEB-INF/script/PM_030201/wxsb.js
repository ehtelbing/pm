var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
//年份
for (var i =thisYear - 4; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var wxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxlxStore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC','V_ZYJC','V_LX','V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //缺陷明细store
    var qxGridStore=Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'qxGridStore',
        fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
            'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
            'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
            'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG','DEF_SOLVE','BJ_STUFF','PASSNUM','NOPASSNUM'
            ,'DEFILENUM','PASS_STATE','PASS_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PROJECT_DEFECT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['I_ID','V_GUID','V_GUID_UP','V_YEAR','V_MONTH','V_ORGCODE','V_ORGNAME',
            'V_DEPTCODE','V_DEPTNAME','V_PORJECT_CODE','V_PORJECT_NAME','V_SPECIALTY','V_SPECIALTYNAME',
            'V_SPECIALTYMANCODE','V_SPECIALTYMAN','V_WXTYPECODE','V_WXTYPENAME','V_CONTENT','V_MONEYBUDGET',
            'V_REPAIRDEPTCODE','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_INMAN','V_INMANCODE','V_INDATE','V_STATENAME','DEFNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_SP_FINISH',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear(),
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250
        }
            // , {
            //     xtype: 'combo',
            //     id: "zyq",
            //     store: zyqStore,
            //     editable: false,
            //     queryMode: 'local',
            //     fieldLabel: '作业区',
            //     displayField: 'V_DEPTNAME',
            //     valueField: 'V_DEPTCODE',
            //     labelWidth: 80,
            //     width: 250
            // }
            ,{
                xtype: 'combo',
                id: "wxlx",
                store: wxlxStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '维修类型',
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                labelWidth: 80,
                width: 250
            }, {
                xtype: 'combo',
                id: "zy",
                store: zyStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '专业',
                displayField: 'V_ZYMC',
                valueField: 'V_GUID',
                labelWidth: 80,
                width: 250
            }, {
                xtype: 'textfield',
                id: "jxnr",
                editable: false,
                queryMode: 'local',
                fieldLabel: '检修内容',
                labelWidth: 80,
                width: 250
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 0px 10px',
                icon: imgpath + '/search.png',
                listeners: {click: OnButtonQuery}
            },
            {
                xtype: 'button',
                text: '上报维修计划',
                icon: imgpath + '/accordion_expand.png',
                listeners: {click: OnButtonUp}
            }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text:'缺陷详情',width:150,dataIndex:'V_GUID',align:'center',renderer:OperaTion},
            {text: '工程状态', width: 150, dataIndex: 'V_STATENAME', align: 'center',renderer:atleft},
            {text: '工程编码', width: 150, dataIndex: 'V_PORJECT_CODE', align: 'center',renderer:atleft},
            {text: '工程名称', width: 150, dataIndex: 'V_PORJECT_NAME', align: 'center',renderer:atleft},
            {text: '维修类型', width: 150, dataIndex: 'V_WXTYPENAME', align: 'center',renderer:atleft},
            {text: '专业', width: 150, dataIndex: 'V_SPECIALTYNAME', align: 'center',renderer:atleft},
            {text: '维修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center',renderer:atleft},
            {text: '维修费用（万元）', width: 120, dataIndex: 'V_MONEYBUDGET', align: 'center',renderer:atright},
            {text: '开工时间', width: 150, dataIndex: 'V_BDATE', align: 'center',renderer:timelfet},
            {text: '竣工时间', width: 150, dataIndex: 'V_EDATE', align: 'center',renderer:timelfet}],
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

    /*缺陷明细窗口*/
    //缺陷
    var delgrid=Ext.create('Ext.grid.Panel',{
        id:'delgrid',
        region:'center',
        columnLines:true,
        border:false,
        store: qxGridStore,
        autoScroll:true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '附件详情',width: 120, dataIndex: 'V_GUID',align: 'center',renderer:OnLookDefect},
            {text:'解决方案',width:140,dataIndex:'DEF_SOLVE',align:'center',renderer:atleft},
            {text:'备件材料',width:140,dataIndex:'BJ_STUFF',align:'center',renderer:atleft},
            {text: '缺陷code',width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft,hidden:true},
            {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
            {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft,hidden:true},
            {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
            {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}

        ]
        ,
        height:395,
        width: '100%',
        tbar: [
            '缺陷明细'
            ,{ xtype: 'tbfill' }
        ]
    });
    var defDetWin=Ext.create('Ext.window.Window',{
        id:'defDetWin',
        width:560,
        height:450,
        title:'缺陷明细',
        frame:true,
        closeAction:'hide',
        closable:true,
        layout:'border',
        items:[delgrid]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        // Ext.data.StoreManager.lookup('zyqStore').load({
        //     params: {
        //         'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        //         'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        //         'V_V_DEPTCODENEXT': '%',
        //         'V_V_DEPTTYPE': '主体作业区'
        //     }
        // });
        Ext.data.StoreManager.lookup('wxlxStore').load({
            params:{
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        });
    });

    Ext.data.StoreManager.lookup("zyqStore").on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('wxlxStore').load({
            params:{
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        });
    });

    Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
        Ext.getCmp('wxlx').select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
        Ext.data.StoreManager.lookup('zyStore').load()
    });

    Ext.data.StoreManager.lookup('zyStore').on('load',function(){
        Ext.getCmp('zy').store.insert(0, {
            'V_GUID': '%',
            'V_ZYMC': '-全部-'
        });
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        OnButtonQuery();
    });


    Ext.getCmp('ck').on('select',function(){
        // Ext.data.StoreManager.lookup('zyqStore').load({
        //     params: {
        //         'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        //         'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        //         'V_V_DEPTCODENEXT': '%',
        //         'V_V_DEPTTYPE': '主体作业区'
        //     }
        // });
    });

    // Ext.getCmp('zyq').on('select',function(){
    //     OnButtonQuery();
    // })

    Ext.getCmp('wxlx').on('select',function(){
        OnButtonQuery();
    });

    Ext.getCmp('zy').on('select',function(){
        OnButtonQuery();
    });

});

//缺陷详情
function OperaTion(value,metaDate,record,rowIndex,colIndex,store){
    metaDate.style="text-align:center;";
    return '<a href="javascript:_delDetail(\''+value+'\')" >'+record.data.DEFNUM+'</a>';
}

//缺陷详情查找
function _delDetail(wxguid){
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params:{
            V_V_PROJECT_GUID:wxguid
        }
    });
    Ext.getCmp('defDetWin').show();
}

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR =Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = ""; //Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_ZY =  Ext.getCmp('zy').getValue();
    store.proxy.extraParams.V_V_WXLX = Ext.getCmp('wxlx').getValue();
    store.proxy.extraParams.V_V_CONTENT = Ext.getCmp('jxnr').getValue();
    store.proxy.extraParams.V_V_PAGE =Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}



function OnButtonQuery (){
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_ORGCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE:"",//Ext.getCmp('zyq').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue(),
            V_V_WXLX:Ext.getCmp('wxlx').getValue(),
            V_V_CONTENT:Ext.getCmp('jxnr').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function OnButtonOut(){
    document.location.href=AppUrl + 'cjy/YEAREXCEL?V_V_YEAR='+Ext.getCmp('year').getValue()+
        '&V_V_ORGCODE='+Ext.getCmp('ck').getValue()+
        '&V_V_DEPTCODE='+ ""+ //Ext.getCmp('zyq').getValue()+
        '&V_V_ZY='+Ext.getCmp('zy').getValue()+
        '&V_V_WXLX='+Ext.getCmp('wxlx').getValue()+
        '&V_V_CONTENT='+Ext.getCmp('jxnr').getValue();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:right;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}

function OnButtonWorkorder(){
    var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(chodata.length!=1){
        alert('请选择一条数据进行工单生成！');
        return;
    }else{
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/pm_dxgc_orderEdit/dxWorkOrder.html?guid=' +chodata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );
    }
}

//查看缺陷附件详情
function OnLookDefect(value,metaDate,record){
    metaDate.style="text-align:center;";
    return '<a href="javascript:LookDefect(\''+value+'\')" >'+record.data.DEFILENUM+'</a>';
}

function LookDefect(guid){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight + 100;
    window.open(AppUrl + 'page/DefectPic/index.html?V_V_GUID=' + guid , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );
}


function selectGridTurn(){
    OnButtonQuery();
}

function OnButtonUp(){
    var wxGuidArr=[];
    var num=0;
    var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(chodata.length<=0){
        return false;
    }
    for(var i=0;i<chodata.length;i++){
        if(chodata[i].get("V_STATE")=='10'){
            alert('存在计划已上报，请重新选择');
            return false;
        }
    }
    for(var i=0;i<chodata.length;i++){
        wxGuidArr.push(chodata[i].get("V_GUID"));
    }

    Ext.Ajax.request({
        url: AppUrl + 'wxjh/SI_WWQX_Out_Syn_PM0011',
        method: 'POST',
        async: false,
        params: {
            PROJECT_GUID_DATA: wxGuidArr
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.type == 'S') {
                for(var j=0;j<wxGuidArr.length;j++){
                    Ext.Ajax.request({
                        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_STATE_SEND',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: wxGuidArr[j],
                            V_V_STATECODE: '10'
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            if (resp.V_INFO == 'SUCCESS') {
                                ++num;
                            }
                        }
                    });
                }
                if(num==wxGuidArr.length){
                    alert('上报成功！');
                    wxGuidArr.splice(0,wxGuidArr.length);
                    console.log(wxGuidArr);
                    OnButtonQuery();
                }
            }
        }
    });
}