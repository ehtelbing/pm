var today = new Date();
var ganttData = [];
var Hours = [];
var newid="";
var date_in="";
for (var i = 0; i <= 23; i++){
    if(i<10){
        Hours.push({displayField: '0'+i, valueField: '0'+i});
    }
    else{
        Hours.push({displayField: i, valueField: i});
    }
}

var Minutes = [];
for (var i = 0; i <= 59; i++){
    if(i<10){
        Minutes.push({displayField: '0'+i, valueField: '0'+i});
    }else{
        Minutes.push({displayField: i, valueField: i});
    }

}

var hoursStore = Ext.create('Ext.data.Store', {
    id: 'hoursStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var minuteStore = Ext.create('Ext.data.Store', {
    id: 'minuteStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var Year = [];
for (var i = 2016; i <= today.getFullYear(); i++)Year.push({displayField: i, valueField: i});

var yearStore = Ext.create('Ext.data.Store', {
    id: 'hoursStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Year,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTNAME', 'V_DEPTCODE'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/plant_sel',
        async: false,
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE: '[基层单位]'
        }
    }
});

var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTNAME', 'V_DEPTCODE'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/plant_sel',
        async: false,
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var lxstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'lxstore',
    fields: ['V_ITEMTYPE_CODE', 'V_ITEMTYPE_NAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'dx/PMDX_ITEMS_TYPE_SEL',
        async: false,
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams : {

        }
    }
});

//var testdata = [{V_SG_TIEM : 1},{V_SG_TIEM : 2},{V_SG_TIEM : 3}];
var wjgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wjgridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_GUID',
        'V_FILE_GUID',
        'V_FILE_NAME',
        'V_FILE_PER',
        'V_FILE_TIME'
    ],
    //data : testdata,
    //proxy : {
    //    type : 'memory',
    //    render : {
    //        type : 'json'
    //    }
    //}
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dx/SG_INF_FILE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_EQUCODE',
        'V_EQUNAME',
        'V_ITEMTYPE',
        'V_ITEMTYPE_NAME',
        'V_ITEM_CODE',
        'V_ITEM_CODEUP',
        'V_ITEM_NAMEUP',
        'V_ITEM_MEMO',
        'D_DATE_B',
        'D_DATE_E',
        'D_DATE_IN',
        'V_PERCODE',
        'V_PERSONNAME',
        'I_YEAR',
        'V_ORGCODE',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_GUID',
        'V_ITEM_NAME'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dx/PMDX_ITEMS_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var panel = Ext.create('Ext.form.Panel', {
    id: 'panel',
    region: 'north',
    width: '100%',
    layout:'column',
    frame:true,
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    items: [
                {
                xtype: 'combo',
                id: 'year',
                store: yearStore,
                fieldLabel: '年份',
                labelAlign: 'right',
                labelWidth: 60,
                displayField: 'displayField',
                valueField: 'valueFiled',
                queryMode: 'local',
                editable: false,
                value: today.getFullYear()
            }, {
                xtype: 'combo',
                id: 'ck',
                store: ckstore,
                fieldLabel: '厂矿',
                labelAlign: 'right',
                labelWidth: 60,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                editable: false,
                listeners : {
                    change : function(){
                        Ext.data.StoreManager.lookup('zyqstore').load({
                            params: {
                                IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                                IS_V_DEPTTYPE: '[主体作业区]'
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'zyq',
                store: zyqstore,
                fieldLabel: '作业区',
                labelAlign: 'right',
                labelWidth: 60,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                editable: false
            }, {
                xtype: 'button',
                text: '刷新',
                icon: imgpath + '/search.png',
                width: 60,
                handler: query
            },{
                xtype: 'button',
                text: '添加项目',
                width: 100,
                icon: imgpath + '/add.png',
                handler: onBtnAdd
            }, {
                xtype: 'button',
                text: '修改项目',
                width: 100,
                icon: imgpath + '/edit.png',
                handler: onBtnEdit
            }, {
                xtype: 'button',
                text: '删除项目',
                width: 100,
                icon: imgpath + '/delete1.png',
                handler: onBtnDel
            }]
        //}]
});


var fjgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'fjgrid',
    region: 'center',
    height: 100,
    width: 295,
    columnLines: true,
    store: wjgridStore,
    autoScroll: true,
    margin: '10px 0 0 125px',
    colspan: 3,
    columns: [{
        text: '附件名称',
        flex: 0.7,
        align: 'center',
        dataIndex : "V_FILE_NAME",
        renderer : downloadRander
    }, {
        text: '操作',
        flex: 0.3,
        align: 'center',
        renderer : delRander
    }]
});

var ganttPanel = Ext.create('Ext.panel.Panel', {

    id: 'ganttPanel',
    title: '甘特图',
    region: 'center'

});

var gantt = new mini.RGantt();
//new RGanttSchedule(gantt);
new RGanttSchedule(gantt);

gantt.setStyle("width:100%;height:100%");
gantt.setColumns([
    { header: '<span style="font-weight:bold;font-size:13px;color:#44474a;">项目名称</span>',
        field: "Name", width: 200, name: "taskname", cellCls: "cellbg",
        renderer: function (e) {
            return '<span style="font-size:12px;color:#000;">' + e.record.Name + '</span>';
        }
    }
]);
//gantt.setReadOnly(true);

var formpanel = Ext.create('Ext.form.Panel', {
    frame: true,
    id: 'formpanel',
    width: '100%',
    region: 'north',
    layout: {
        type: 'table',
        columns: 3
    },
    defaults: {
        labelAlign: 'right',
        width: 400,
        margin: '10px 0 0 20px'
    },
    baseCls : 'my-panel-no-border',
    fileUpload: true,
    items: [{
        xtype: 'textfield',
        id: 'sbmc',
        fieldLabel: '设备名称',
        width: 350,
        editable: false,
        readOnly: true,
        colspan: 2
    },{
        xtype : 'hidden',
        id : 'sbbm'
    },{
        xtype : 'hidden',
        id : 'sbwzbm'
    }, {
        xtype: 'button',
        text: '...',
        width: 30,
        handler: onEquipSel
    }, {
        xtype: 'textfield',
        id: 'sjxmmc',
        fieldLabel: '上级项目名称',
        readOnly : true,
        colspan: 3
    },{
        xtype : 'hidden',
        id : 'sjxmbm'
    },{
        xtype: 'textfield',
        id: 'xmmc',
        fieldLabel: '项目名称',
        colspan: 3
    }, {
        xtype: 'textfield',
        id: 'xmbm',
        fieldLabel: '项目编码',
        colspan: 3
    },{
        xtype: 'combo',
        id: 'xmlx',
        store: lxstore,
        fieldLabel: '项目类型',
        labelAlign: 'right',
        displayField: 'V_ITEMTYPE_NAME',
        valueField: 'V_ITEMTYPE_CODE',
        queryMode: 'local',
        editable: false,
        colspan: 3
    }, {
        xtype: 'datefield',
        id: 'sdate',
        fieldLabel: '开始时间',
        format: 'Y-m-d',
        editable: false,
        value: today,
        width: 300
    }, {
        xtype: 'combo',
        id: 'shour',
        store: hoursStore,
        labelAlign: 'right',
        width: 40,
        value: today.getHours(),
        format: 'H',
        displayField: 'displayField',
        valueField: 'valueField',
        queryMode: 'local',
        editable: false,
        margin: '10px 0 0 10px'
    }, {
        xtype: 'combo',
        id: 'sminute',
        store: minuteStore,
        labelAlign: 'right',
        width: 40,
        value: today.getMinutes(),
        format: 'i',
        displayField: 'displayField',
        valueField: 'valueField',
        queryMode: 'local',
        editable: false,
        margin: '10px 0 0 10px'
    }, {
        xtype: 'datefield',
        id: 'edate',
        fieldLabel: '结束时间',
        value: today,
        editable: false,
        format: 'Y-m-d ',
        width: 300
    }, {
        xtype: 'combo',
        id: 'ehour',
        store: hoursStore,
        labelAlign: 'right',
        width: 40,
        value: today.getHours(),
        format: 'H',
        displayField: 'displayField',
        valueField: 'valueField',
        queryMode: 'local',
        editable: false,
        margin: '10px 0 0 10px'
    }, {
        xtype: 'combo',
        id: 'eminute',
        store: minuteStore,
        labelAlign: 'right',
        width: 40,
        value: today.getMinutes(),
        format: 'i',
        displayField: 'displayField',
        valueField: 'valueField',
        queryMode: 'local',
        editable: false,
        margin: '10px 0 0 10px'
    }, {
        xtype: 'textarea',
        id : 'xmnr',
        fieldLabel: '项目内容',
        colspan: 3
    }, {
        xtype: 'filefield',
        id : 'upload',
        name : 'upload',
        enctype: "multipart/form-dat",
        fieldLabel: '项目附件',
        buttonText: '选择文件',
        colspan: 3
    }, fjgrid,
        {xtype: 'hidden', name: 'V_V_GUID', id: 'V_V_GUID'},
        {xtype: 'hidden', name: 'V_V_FILEGUID', id: 'V_V_FILEGUID'},
        {xtype: 'hidden', name: 'V_V_FILENAME', id: 'V_V_FILENAME'},
        {xtype: 'hidden', name: 'V_V_FILEPER', id: 'V_V_FILEPER'},
        {xtype: 'hidden', name: 'V_V_FILEDATE', id: 'V_V_FILEDATE'}]
});

var window = Ext.create('Ext.window.Window', {
    id: 'window',
    width: 500,
    height: 500,
    layout: 'border',
    title: '添加项目',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [formpanel],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            onBtnSave();
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


Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, ganttPanel]
    });

    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.
            lookup('ckstore').getAt(0));
    });

    //Ext.data.StoreManager.lookup('zyqstore').load({
    //    params: {
    //        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
    //        V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
    //        V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
    //        V_V_DEPTTYPE: '[主体作业区]'
    //    }
    //});

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.
            lookup('zyqstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('lxstore').on('load', function () {
        Ext.getCmp('xmlx').select(Ext.data.StoreManager.
            lookup('lxstore').getAt(0));
    });


});

// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_PARTCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
        }
    });

    gridStore.on('load',function(){
        ganttData = [];
        gridStore.each(function (record) {
            ganttData.push(record.data);
        });
        ganttPanel.add(gantt);
        loadList();
        gantt.zoomIn();
    });

}

// 附件查询
function filequery(guid) {
    Ext.data.StoreManager.lookup('wjgridStore').load({
        params: {
            V_V_GUID : guid
        }
    });
}

//添加项目
function onBtnAdd() {
    if(gridStore.totalCount == 0){
        Ext.getCmp('sjxmbm').setValue('-1');
    }
    else if(gantt.getSelected() == null){
        alert('请选择一个上级项目');
        return false;
    }
    else{
        Ext.getCmp('sjxmmc').setValue(gantt.getSelected().Tasks[0].V_ITEM_NAME);
        Ext.getCmp('sjxmbm').setValue(gantt.getSelected().Tasks[0].V_ITEM_CODE);
    }
    newid = "-1";
    Ext.getCmp('sbmc').setValue('');
    Ext.getCmp('sbbm').setValue('');
    Ext.getCmp('sbwzbm').setValue('');
    Ext.getCmp('xmmc').setValue('');
    Ext.getCmp('xmbm').setValue('');
    Ext.getCmp('xmnr').setValue('');
    Ext.getCmp('upload').setValue('');
    date_in = Ext.util.Format.date(new Date(), 'Y-m-d');
    Ext.getCmp('xmbm').show();
    Ext.getCmp('window').setTitle("添加项目");
    Ext.getCmp('window').show();
}

//修改项目
function onBtnEdit() {
    if(gantt.getSelected() == null){
        alert('请选择一个上级项目');
        return false;
    }
    newid = gantt.getSelected().Tasks[0].I_ID;
    Ext.getCmp('sbmc').setValue(gantt.getSelected().Tasks[0].V_EQUNAME);
    Ext.getCmp('sbbm').setValue(gantt.getSelected().Tasks[0].V_EQUCODE);
    Ext.getCmp('sjxmbm').setValue(gantt.getSelected().Tasks[0].V_ITEM_CODEUP);
    Ext.getCmp('sjxmmc').setValue(gantt.getSelected().Tasks[0].V_ITEM_NAMEUP);
    Ext.getCmp('xmmc').setValue(gantt.getSelected().Tasks[0].V_ITEM_NAME);
    Ext.getCmp('xmbm').setValue(gantt.getSelected().Tasks[0].V_ITEM_CODE);
    Ext.getCmp('sdate').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_B, 'Y-m-d'));
    Ext.getCmp('shour').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_B, 'H'));
    Ext.getCmp('sminute').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_B, 'i'));
    Ext.getCmp('edate').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_E, 'Y-m-d'));
    Ext.getCmp('ehour').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_E, 'H'));
    Ext.getCmp('eminute').setValue(Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_E, 'i'));
    date_in = Ext.util.Format.date(gantt.getSelected().Tasks[0].D_DATE_IN, 'Y-m-d');
    Ext.getCmp('xmnr').setValue(gantt.getSelected().Tasks[0].V_ITEM_MEMO);
    Ext.getCmp('upload').setValue('');
    Ext.getCmp('xmbm').hide();

    filequery(gantt.getSelected().Tasks[0].V_GUID);
    Ext.getCmp('window').setTitle("修改项目");
    Ext.getCmp('window').show();
}

//删除项目
function onBtnDel(){

}

//设备选择
function onEquipSel() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/No410601/Index.html?DEPTCODE=' + Ext.getCmp('zyq').getValue() + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    Ext.getCmp('sbbm').setValue(str[0]);
    Ext.getCmp('sbmc').setValue(str[1]);
    Ext.getCmp('sbwzmc').setValue(str[2]);
}

function loadList() {

    gantt.loading();

    var data = ganttData;
    var groupList = buildGroupList(data);

    $.each(data, function (index, item) {

        start = item.D_DATE_B.replace(/-/g, '/');
        finish = item.D_DATE_E.replace(/-/g, '/');

        groupList = buildNewGroup(groupList, {
            "UID": "node" + (index + 1).toString(),
            "Name": item.V_ITEM_NAME,
            "Duration": 0,
            "Start": new Date(start),
            "Finish": new Date(finish),
            "PercentComplete": 0,

            "I_ID": item.I_ID,
            "V_EQUCODE": item.V_EQUCODE,
            "V_EQUNAME": item.V_EQUNAME,
            "V_ITEMTYPE": item.V_ITEMTYPE,
            "V_ITEMTYPE_NAME": item.V_ITEMTYPE_NAME,
            "V_ITEM_CODE": item.V_ITEM_CODE,
            "V_ITEM_CODEUP": item.V_ITEM_CODEUP,
            "V_ITEM_NAMEUP": item.V_ITEM_NAMEUP,
            "V_ITEM_MEMO": item.V_ITEM_MEMO,
            "D_DATE_B": item.D_DATE_B,
            "D_DATE_E": item.D_DATE_E,
            "D_DATE_IN": item.D_DATE_IN,
            "V_PERCODE": item.V_PERCODE,
            "V_PERSONNAME": item.V_PERSONNAME,
            "I_YEAR": item.I_YEAR,
            "V_ORGCODE": item.V_ORGCODE,
            "V_DEPTCODE": item.V_DEPTCODE,
            "V_DEPTNAME": item.V_DEPTNAME,
            "V_GUID": item.V_GUID,
            "V_ITEM_NAME": item.V_ITEM_NAME
        });
    });
    gantt.loadData(groupList);
    gantt.unmask();
}

function delRander(a, value, metaData) {

    return '<a href="javascript:onDel()">+a+</a>';
}

function onBtnSave(){
    infosave();
    filesave();
}

function infosave(){
    Ext.Ajax.request({
        url: AppUrl + 'dx/PMDX_ITEMS_EDIT',
        method: 'POST',
        async: false,
        params: {
            V_I_ID: newid,
            V_V_EQUCODE: Ext.getCmp('sbbm').getValue(),
            V_V_ITEMTYPE:  Ext.getCmp('xmlx').getValue(),
            V_V_ITEM_CODE: Ext.getCmp('xmbm').getValue(),
            V_V_ITEM_CODEUP: Ext.getCmp('sjxmbm').getValue(),
            V_V_ITEM_MEMO: Ext.getCmp('xmnr').getValue(),
            V_D_DATE_B: Ext.util.Format.date(Ext.getCmp('sdate').getValue(), 'Y-m-d')+' '+Ext.getCmp('shour').getValue()+':'+Ext.getCmp('sminute').getValue()+':00',
            V_D_DATE_E: Ext.util.Format.date(Ext.getCmp('edate').getValue(), 'Y-m-d')+' '+Ext.getCmp('ehour').getValue()+':'+Ext.getCmp('eminute').getValue()+':00',
            V_D_DATE_IN: date_in,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_I_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_GUID: '123456',
            V_V_ITEM_NAME : Ext.getCmp('xmmc').getValue(),
            V_V_ITEM_NAMEUP : Ext.getCmp('sjxmmc').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if(resp.list[0].V_INFO=='Success'){
                query();
                Ext.getCmp('window').hide();
            }
        }
    });
}

function filesave(){
    var guid = gantt.getSelected().Tasks[0].V_GUID;
    var fileguid = "";
    for ( var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }
    var form = Ext.getCmp('formpanel');
    if (Ext.getCmp('upload').getValue() != "") {
        Ext.getCmp('V_V_GUID').setValue(guid);
        Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
        Ext.getCmp('V_V_FILEPER').setValue(Ext.util.Cookies.get('v_personcode'));
        Ext.getCmp('V_V_FILEDATE').setValue(Ext.util.Format.date(today,'Y-m-d'));
        form.submit({
            url: AppUrl + 'dx/uploadFile',
            async: false,
            waitMsg: '上传中...',
            method: 'POST',
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                filequery(guid);
            }
            //failure: function (resp) {
            //    Ext.Msg.alert('提示信息', '上传失败');
            //}
        });
    }
}

function delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILE_GUID + '\')">删除</a>';
}

function downloadRander(a,value,metaData){
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILE_GUID + '\',\'' + metaData.data.V_FILE_NAME + '\')">'+a+'</a>';
}

function onDel(fileguid){
    var guid = gantt.getSelected().Tasks[0].V_GUID;
    Ext.Ajax.request({
        url: AppUrl + 'dx/PMDX_ITEM_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID : fileguid
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            filequery(guid);
        }
    });
}

function onDownload(fileguid,filename){
    var form = Ext.getCmp('formpanel');
    Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
    Ext.getCmp('V_V_FILENAME').setValue(filename);
    form.submit({
        url: AppUrl + 'dx/downloadFile',
        async: false,
        //waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}

function buildGroupList(data){
    var upVal="null";
    var groupList = [];
    $.each(data,function(index, item) {
        var groupObj = {
            "UID": "group"+(index+1).toString(),
            "Name": item.V_ITEM_NAME,
            "Tasks":[]
        };
        if(upVal=="null"){
            groupList.push(groupObj);
            upVal = item.V_ITEM_NAME;
        }else{
            if(item.V_ITEM_NAME==upVal){
            }else{
                groupList.push(groupObj);
                upVal = item.V_ITEM_NAME;
            }
        }
    });
    return groupList;
}

function buildNewGroup(groupList,valObj){
    $.each(groupList,function(index, item) {
        if(item.Name==valObj.Name){
            var arr = item.Tasks;

            valObj.ParentTaskUID = (item.UID).toString();
            arr.push(valObj);

            item.Tasks = arr;
        }
    });
    return groupList;
}