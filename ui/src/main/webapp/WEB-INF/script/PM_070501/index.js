var bxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            IS_V_BASETYPE : 'PM_DIARYDATA/V_CLASSTYPE'
        }
    }
});
var urlCode;

var sbmcStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sbmcStore',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_SAP_EQU_GET',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var zsbStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zsbStore',
    fields: ['V_EQUSITE', 'V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_PM_07_SAP_EQU_GET',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var qxlyStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'qxlyStore',
    fields: ['V_SOURCECODE', 'V_SOURCENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SOURCE_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            IS_V_BASETYPE :  'PM_DIARYDATA/V_CLASS'
        }
    }
});

var qxdjStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'qxdjStore',
    fields: ['V_LEVELCODE', 'V_LEVELNAME'],
    proxy: {
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
    }
});

var bzStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bzStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            IS_V_BASETYPE :  'PM_DIARYDATA/V_CLASS'
        }
    }
});
var Hours = [];
for(i=0; i<24; i++){
    if(i<10){
        Hours.push({ CODE: '0' + i, NAME: i});
    }
    else{
        Hours.push({ CODE: i, NAME: i});
    }
}

var Minutes = [];
for(i=0; i<60; i++){
    if(i<10){
        Minutes.push({ CODE: '0' + i, NAME: i});
    }
    else{
        Minutes.push({ CODE: i, NAME: i});
    }
}

var HourStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'HourStore',
    fields: ['CODE', 'NAME'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: { type: 'json'}
    }
});

var MinuteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'MinuteStore',
    fields: ['CODE', 'NAME'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: { type: 'json'}
    }
});
var centerPanel = Ext.create('Ext.form.Panel', {
    id: 'centerPanel',
    region: 'center',
    layout: 'vbox',
    frame:true,
    //defaults : {
    //    style : 'margin:5px 0px 5px 5px',
    //    labelAlign : 'right'
    //},
    items: [
                {  layout: 'column',border : false, defaults: { labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}},
                    items: [
                        {xtype: 'textfield', fieldLabel: '厂矿', readOnly: true, id: 'ck'},
                        {xtype: 'textfield', fieldLabel: '作业区', readOnly: true, id: 'zyq',style: { margin: '10px 10px 10px 20px'} },
                        {xtype: 'textfield', fieldLabel: '设备类型', readOnly: true, id: 'lx'}
                    ]},
                {layout: 'column', border : false, defaults: { labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}},
                    items: [
                        {xtype: 'combo', fieldLabel: '设备名称', id: 'sbmc', store: 'sbmcStore', editable: false, displayField: 'V_EQUNAME', valueField: 'V_EQUCODE', queryMode: 'local' },
                        {xtype: 'combo', fieldLabel: '子设备名称', id: 'zsb', labelWidth: 70, store: 'zsbStore', editable: false, displayField: 'V_EQUSITENAME', valueField: 'V_EQUSITE', queryMode: 'local' },
                        {xtype: 'combo', fieldLabel: '缺陷来源', id: 'qxly', store: 'qxlyStore', editable: false, displayField: 'V_SOURCENAME', valueField: 'V_SOURCECODE', queryMode: 'local' }
                    ]},
                {layout: 'column', border : false, defaults: { labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}},
                    items: [
                        {xtype: 'datefield', fieldLabel: '发现时间', value: new Date(), format: 'Y年m月d日',  editable: false, id: 'fxsj' },
                        { xtype: 'combo', width: 70, editable: false, id: 'fxHour',  store: HourStore, displayField: 'NAME', valueField: 'CODE', value: new Date().getHours()},
                        { xtype: 'label', text: '时', style: { margin: '14px 0 0 5px'}},
                        { xtype: 'combo', width: 70, id: 'fxMinute', editable: false, store: MinuteStore, displayField: 'NAME', valueField: 'CODE', value: new Date().getMinutes()},
                        { xtype: 'label', text: '分', style: { margin: '14px 0 0 5px'}},
                        {xtype: 'displayfield', fieldLabel: '发现人', id: 'fxr', readOnly: true,  labelAlign: 'right', labelWidth: 60,style: { margin: '10px 10px 10px 14px'}}
                    ]},
                {  layout: 'column', border : false, defaults: { labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}},
                    items: [
                        {xtype: 'datefield', fieldLabel: '录入日期', format: 'Y年m月d日', value: new Date(), editable: false, id: 'lrrq' },
                        { xtype: 'combo', width: 70, editable: false, id: 'sbHour',  store: HourStore, displayField: 'NAME', valueField: 'CODE', value: new Date().getHours()},
                        { xtype: 'label', text: '时', style: { margin: '14px 0 0 5px'}},
                        { xtype: 'combo', width: 70, id: 'sbMinute', editable: false, store: MinuteStore, displayField: 'NAME', valueField: 'CODE', value: new Date().getMinutes()},
                        { xtype: 'label', text: '分', style: { margin: '14px 0 0 5px'}},
                        { xtype: 'displayfield',fieldLabel: '录入人', id: 'lrr', readOnly: true,  labelAlign: 'right', labelWidth: 60, style: {  margin: '10px 10px 10px 14px'}}
                    ]},
                { layout: 'column', border : false, defaults: { labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}},
                    items: [
                        {xtype: 'combo', fieldLabel: '缺陷等级',  id: 'qxdj', store: 'qxdjStore', editable: false, displayField: 'V_LEVELNAME', valueField: 'V_LEVELCODE', queryMode: 'local' }
                    ]},
                {  layout: 'column', border : false,  items: [
                    { xtype: 'textarea',fieldLabel: '异常现象', labelAlign: 'right', labelWidth: 60, style: { margin: '10px 10px 10px 10px'}, height: 150, width: 630, id: 'ycxx'}
                ]},
                { layout: 'column',  border : false, items: [
                    { xtype: 'textfield',fieldLabel: '建议', labelAlign: 'right', labelWidth: 60, style: { margin: '5px 10px 5px 10px'}, width: 630, id: 'jy'}
                ]},
                { layout: 'column', border : false,
                    items: [
                        { xtype: 'checkbox',boxLabel: '添加异常现象及建议到常用异常现象及建议库', labelAlign: 'right', labelWidth: 160, style: { margin: '10px 10px 10px 75px'}, id: 'check1'},
                        { xtype: 'button', text: '从常用异常现象及建议库中选择', style: { margin: '10px 10px 10px 100px'}, icon: imgpath + '/bogus.png', handler: changeBtn}
                    ]},
                {layout: 'column',  border: false, bodyBorder: false, items: [
                    { xtype: 'button', text: '保存并下票', handler: Save,hidden:true, icon: imgpath + '/filesave.png', style: { margin: '10px 10px 10px 492px'}},
                    { xtype: 'button', text: '保存', handler: zhuce, icon: imgpath + '/saved.png', style: { margin: '10px 10px 10px 502px'}},
                    { xtype: 'button', text: '取消', handler: QX, icon: imgpath + '/tree_dnd_no.png',  style: { margin: '10px 10px 10px 10px'}}
                ]}
            ]
});


function onPageLoaded() {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [centerPanel]
    });
    Ext.data.StoreManager.lookup('qxlyStore').on('load', function(){
        Ext.getCmp('qxly').select(Ext.data.StoreManager.lookup('qxlyStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('zsbStore').on('load', function(){
        Ext.getCmp('zsb').select(Ext.data.StoreManager.lookup('zsbStore').getAt(0));
    });


    Ext.getCmp('fxr').setValue(Ext.util.Cookies.get('v_personname2'));

    Ext.getCmp('lrr').setValue(Ext.util.Cookies.get('v_personname2'));

    Ext.data.StoreManager.lookup('qxdjStore').on('load', function(){
        Ext.getCmp('qxdj').select(Ext.data.StoreManager.lookup('qxdjStore').getAt(0));
    });

    if(location.href.split('?')[1] != undefined){
        urlCode = Ext.urlDecode(location.href.split('?')[1]);
        Ext.getCmp('sbmc').setValue(urlCode.equname);
        Ext.getCmp('ck').setValue(urlCode.orgname);
        Ext.getCmp('zyq').setValue(urlCode.deptname);
        Ext.getCmp('lx').setValue(urlCode.equtypename);

        Ext.data.StoreManager.lookup('zsbStore').load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE : Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTNEXTCODE : urlCode.deptcode,
                V_V_EQUTYPECODE : urlCode.equtypecode,
                V_V_EQUCODE : urlCode.equcode
                //parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE', 'V_V_DEPTNEXTCODE', 'V_V_EQUTYPECODE', 'V_V_EQUCODE'],
                //parType: ['s', 's', 's', 's', 's'],
                //parVal : [
                //    Ext.util.Cookies.get('v_personcode'),
                //    Ext.util.Cookies.get('v_deptcode'),
                //    urlCode.deptcode,
                //    urlCode.equtypecode,
                //    urlCode.equcode
                //],
                //proName: 'PRO_SAP_EQU_GET_C ',
                //cursorName: 'V_CURSOR'
            }
        });
    }
}

function changeBtn(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070502/index.html?equcode=" +  urlCode.equcode , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

    //var asd = window.showModalDialog(APP + "/page/No211003/Index.html?equcode=" +  urlCode.equcode  , '', "dialogHeight:500px;dialogWidth:700px");
}

function getReturnValue(asd){
    if(asd != undefined){
        Ext.getCmp('ycxx').setValue(asd.description);
        Ext.getCmp('jy').setValue(asd.suggestion);
    }
}

function zhuce(){
    var aHour;
    var aMinute;

    var bHour;
    var bMinute;

    if(Ext.getCmp('fxHour').getValue() < 10){
        aHour = '0' + Ext.getCmp('fxHour').getValue();
    }
    else{
        aHour = Ext.getCmp('fxHour').getValue();
    }

    if(Ext.getCmp('fxMinute').getValue() < 10){
        aMinute = '0' + Ext.getCmp('fxMinute').getValue();
    }
    else{
        aMinute = Ext.getCmp('fxMinute').getValue();
    }

    if(Ext.getCmp('sbHour').getValue() < 10){
        bHour = '0' + Ext.getCmp('sbHour').getValue();
    }
    else{
        bHour = Ext.getCmp('sbHour').getValue();
    }

    if(Ext.getCmp('sbMinute').getValue() < 10){
        bMinute = '0' + Ext.getCmp('sbMinute').getValue();
    }
    else{
        bMinute = Ext.getCmp('sbMinute').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'PM_07/PRO_PM_07_PP_DEFECT_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_I_ID :  '',                                               //标志符(新增传空)
            V_V_EQUCODE :    urlCode.equcode,                           //设备编码
            V_V_EQUTYPE :   urlCode.equtypecode,                        //设备类型，不能为
            V_V_CHILDEQUCODE :   Ext.getCmp('zsb').getValue(),          //空子设备编码
            V_D_DEFECTDATE :   Ext.Date.format(Ext.getCmp('fxsj').getValue(), 'Y/m/d') + ' ' + aHour + ':' + aMinute + ':' + '01',
            V_D_INDATE :    Ext.Date.format(Ext.getCmp('lrrq').getValue(), 'Y/m/d') + ' ' + bHour + ':' + bMinute + ':' + '01',
            V_V_DESCRIPTION :   Ext.getCmp('ycxx').getValue(),         //缺陷异常现象
            V_V_SUGGESTION :    Ext.getCmp('jy').getValue(),            //处理建议
            V_V_PERSONCODE :    Ext.util.Cookies.get('v_personcode'),   //人员编码
            V_V_PERSONNAME :    Ext.util.Cookies.get('v_personname2'),  //人员姓名
            V_V_DEPTCODE :   urlCode.deptcode,                          //单位编码
            V_V_SOURCECODE: Ext.getCmp('qxly').getValue(),              //缺陷来源
            V_V_LEVEL:  Ext.getCmp('qxdj').getValue()                   //缺陷等级

        },
        success: function(resp){
            resp = Ext.decode(resp.responseText);
            if(resp.list[0].V_INFO != 'Fail'){
                if(Ext.getCmp('check1').getValue()){
                    Ext.Ajax.request({
                        url: AppUrl + 'qx/PRO_PM_07_DEFECTDESCRIBE_SET',
                        type: 'ajax',
                        async: false,
                        method: 'POST',
                        params: {
                            V_I_ID :  '',
                            V_V_EQUCODE :    urlCode.equcode,
                            V_V_DESCRIPTION :   Ext.getCmp('ycxx').getValue(),
                            V_V_SUGGESTION :    Ext.getCmp('jy').getValue(),
                            V_V_PERSONCODE :    Ext.util.Cookies.get('v_personcode'),
                            V_V_PERSONNAME :    Ext.util.Cookies.get('v_personname2'),
                            V_V_DEPTCODE :   urlCode.deptcode
                        },
                        success: function(resp1){
                            resp1 = Ext.decode(resp1.responseText);
                            if(resp1.list[0].V_INFO != 'Fail'){
                                Ext.Msg.alert('操作信息', '添加成功');
                                window.close();
                            }
                        }
                    });
                }
                else{
                    Ext.Msg.alert('操作信息', '添加成功');
                    window.close();
                }
            }
            else{
                Ext.Msg.alert('操作信息', '添加失败');
            }
        }
    });
}

function Save(){
    var aHour;
    var aMinute;

    var bHour;
    var bMinute;

    if(Ext.getCmp('fxHour').getValue() < 10){
        aHour = '0' + Ext.getCmp('fxHour').getValue();
    }
    else{
        aHour = Ext.getCmp('fxHour').getValue();
    }

    if(Ext.getCmp('fxMinute').getValue() < 10){
        aMinute = '0' + Ext.getCmp('fxMinute').getValue();
    }
    else{
        aMinute = Ext.getCmp('fxMinute').getValue();
    }

    if(Ext.getCmp('sbHour').getValue() < 10){
        bHour = '0' + Ext.getCmp('sbHour').getValue();
    }
    else{
        bHour = Ext.getCmp('sbHour').getValue();
    }

    if(Ext.getCmp('sbMinute').getValue() < 10){
        bMinute = '0' + Ext.getCmp('sbMinute').getValue();
    }
    else{
        bMinute = Ext.getCmp('sbMinute').getValue();
    }

    Ext.Ajax.request({
        url: AppUrl + 'qx/PRO_PM_07_PP_DEFECT_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_I_ID :  '',
            V_V_EQUCODE :    urlCode.equcode,
            V_V_EQUTYPE :   urlCode.equtypecode,
            V_V_CHILDEQUCODE :   Ext.getCmp('zsb').getValue(),
            V_V_CLASS :   Ext.getCmp('bz').getValue(),
            V_V_CLASSTYPE :    Ext.getCmp('bx').getValue(),
            V_D_DEFECTDATE :   Ext.Date.format(Ext.getCmp('fxsj').getValue(), 'Y/m/d') + ' ' + aHour + ':' + aMinute + ':' + '01',
            V_D_INDATE :    Ext.Date.format(Ext.getCmp('sbrq').getValue(), 'Y/m/d') + ' ' + bHour + ':' + bMinute + ':' + '01',
            V_V_DESCRIPTION :   Ext.getCmp('ycxx').getValue(),
            V_V_SUGGESTION :    Ext.getCmp('jy').getValue(),
            V_V_PERSONCODE :    Ext.util.Cookies.get('v_personcode'),
            V_V_PERSONNAME :    Ext.util.Cookies.get('v_personname2'),
            V_V_DEPTCODE :   urlCode.deptcode
        },
        success: function(resp){
            resp = Ext.decode(resp.responseText);
            if(resp.list[0].V_INFO != 'Fail'){
                if(Ext.getCmp('check1').getValue()){
                    Ext.Ajax.request({
                        url: AppUrl + 'qx/PRO_PM_07_DEFECTDESCRIBE_SET',
                        type: 'ajax',
                        async: false,
                        method: 'POST',
                        params: {
                            V_I_ID :  '',
                            V_V_EQUCODE :    urlCode.equcode,
                            V_V_DESCRIPTION :   Ext.getCmp('ycxx').getValue(),
                            V_V_SUGGESTION :    Ext.getCmp('jy').getValue(),
                            V_V_PERSONCODE :    Ext.util.Cookies.get('v_personcode'),
                            V_V_PERSONNAME :    Ext.util.Cookies.get('v_personname2'),
                            V_V_DEPTCODE :   urlCode.deptcode
                        },
                        success: function(resp1){
                            resp1 = Ext.decode(resp1.responseText);
                            if(resp.list[0].V_INFO != 'Fail'){
                                Ext.Msg.alert('操作信息', '添加成功');
                                window.returnValue = resp[0];
                                window.close();
                            }
                        }
                    });
                }
                else{
                    Ext.Msg.alert('操作信息', '添加成功');
                    window.returnValue = resp[0];
                    window.close();
                }
            }
            else{
                Ext.Msg.alert('操作信息', '添加失败');
            }
        }
    });
}
function QX(){
    window.close();
}

Ext.onReady(onPageLoaded);
