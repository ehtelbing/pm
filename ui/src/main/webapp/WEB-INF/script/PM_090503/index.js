var selectID = [];
var V_DEPTCODE='';
$(function() {
    loadPageInfo();
    loadTaskGrid();

    GetBillMatByOrder();
    loadMatList();

    //检修单位树
    var treeStore=Ext.create('Ext.data.TreeStore', {
        id : 'treeStore',
        autoLoad : false,
        fields : ['sid', 'text', 'parentid','deptcode','rolecode']
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME', 'V_ROLECODE', 'V_ROLENAME', 'V_PERCODE',
            'V_PERNAME', 'V_INPER'],
        proxy: {
            url: AppUrl + 'basic/PM_WORK_REPAIRPER_HISTORY_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var win=Ext.create('Ext.window.Window', {
        id: 'win',
        width: 800,
        height: 600,
        title: '检修作业区选择',
        modal: true,
        frame: true,
        closeAction: 'hide',
        closable: true,
        layout: 'border',
        items: [{xtype:'panel',region:'north',frame:true,widtt:'100%',  border : false,layout:'column',
            items:[{xtype:'button', margin: '5px 0px 5px 5px',text:'选择',icon: imgpath + '/add.png',handler: checkPer}]},
            {xtype : 'treepanel', id : 'wtree',region : 'west',title:'检修单位树',width : '50%', store : treeStore,rootVisible : false, autoScroll: true},
            {xtype : 'gridpanel', id : 'cgrid',region : 'center',title:'常用人员',width : '50%', store : gridStore, columnLines: true,  selModel: {
                selType: 'checkboxmodel'
            },columns: [{xtype: 'rownumberer',text: '序号',width: 50,align: 'center' },
                {text: '作业区名称',dataIndex: 'V_DEPTNAME',align: 'center', width: 150 },
                {text: '角色名称',dataIndex: 'V_ROLENAME',align: 'center', width: 150 },
                {text: '人员名称',dataIndex: 'V_PERNAME',align: 'center', width: 150 }]}]
    });

    //设备树点击加号加载
    Ext.getCmp("wtree").on("beforeload",function(store,operation){
        if(operation.node.data.parentid=="dept"){
            Ext.apply(store.proxy.extraParams,{
                    V_V_DEPTCODE : operation.node.data.sid
                },
                store.proxy.url=AppUrl + 'tree/PRO_BASE_PERSONROLE_NEW_VIEW')
            Ext.data.StoreManager.lookup('gridStore').load({
                params: {
                    V_V_DEPTCODE:operation.node.data.sid,
                    V_V_INPER: Ext.util.Cookies.get('v_personcode')
                }
            });
        }else if (operation.node.data.parentid=="role"){
            Ext.apply(store.proxy.extraParams,{
                    V_V_DEPTCODE : operation.node.data.deptcode,
                    V_V_ROLECODE: operation.node.data.sid
                },
                store.proxy.url=AppUrl + 'tree/PM_WORKREPAIR_PERBYROLE_SEL')
        }
    });



});
function loadPageInfo() {
    $.ajax({
        url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.list != "" && resp.list != null) {
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp.list[0].V_EQUSITENAME);
                $("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                V_DEPTCODE=resp.list[0].V_DEPTCODE;
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);

                $("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);

                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                var s1, st1;
                if(resp.list[0].D_ENTER_DATE!=''){
                    s1 = resp.list[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                }else{
                    s1 =new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);

                $("#V_WBS").html(resp.list[0].V_WBS);
                $("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);

                $("#V_TOOL").html(resp.list[0].V_TOOL);
                $("#V_TECHNOLOGY").html(resp.list[0].V_TECHNOLOGY);
                $("#V_SAFE").html(resp.list[0].V_SAFE);

                $("#D_DATE_ACP").html(resp.list[0].D_DATE_ACP);
                $("#V_POSTMANSIGN").html(resp.list[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").html(resp.list[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
                $("#V_WORKSHOPCONTENT").html(resp.list[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").html(resp.list[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").html(resp.list[0].V_DEPTSIGN);

                $("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);

                $("#V_REPAIRSIGN").html(resp.list[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);

                $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
                $("#D_FACT_FINISH_DATE").html(resp.list[0].D_FACT_FINISH_DATE);

            } else {
            }
        }
    });
}

function loadTaskGrid() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID:$("#V_ORDERGUID").val()
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.list != "" && resp.list != null) {
                $("#TtableT tbody").empty();
                if (resp.list.length < 3) {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                        "#TtableT tbody");
                    for ( var i = 0; i < 3 - resp.list.length; i++) {
                        $("#TtableT tbody")
                            .append(
                            "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                        "#TtableT tbody");
                    var tool = document.getElementById('V_TOOL');
                    tool.style.height = 45 * resp.list.length;

                    var tech = document.getElementById('V_TECHNOLOGY');
                    tech.style.height = 45 * resp.list.length;

                    var safe = document.getElementById('V_SAFE');
                    safe.style.height = 45 * resp.list.length;
                }
            } else {
            }
        }
    });
}

function loadMatList() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type : 'post',
        data : {
            V_V_ORDERGUID:$("#V_ORDERGUID").val()
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function(index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
            }
        }
    });
}

function ViewTask() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090902/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function ViewLook() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090903/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function OnClickJJButton() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090904/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function GetBillMatByOrder(){
    Ext.Ajax.request({
        url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_V_ORDERID: $("#V_ORDERID").html(),
            x_personcode : Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {

        }
    });
}

function checkPer(){
    var num=0;
    var seldata = Ext.getCmp('cgrid').getSelectionModel().getSelection();
    if (Ext.getCmp('wtree').getChecked()==0&&seldata.length ==0){
            alert('请选择审批人！');
            return false;
        }else{
            for(var i=0;i<seldata.length;i++) {
                Ext.Ajax.request({
                    url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_AGREE',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_ORDERID: $("#V_ORDERGUID").val(),
                        V_V_DBGUID: $.url().param("V_DBGUID"),
                        V_V_IDEA: $('#spyj').val() == '' ? '通过' : $('#spyj').val(),
                        V_V_FLOWSTEP: $.url().param("V_FLOWSTEP"),
                        V_V_REPAIRCODE: seldata[i].data.V_DEPTCODE,
                        V_V_PERCODE: seldata[i].data.V_PERCODE
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        if (resp.V_INFO == 'success') {
                            num++;
                        }else{
                            num--;
                        }

                        if (num==seldata.length){
                            window.opener.OnSearch();
                            window.close();
                        }
                    }
                });
            }

        for(var i=0;i<Ext.getCmp('wtree').getChecked().length;i++){
            Ext.Ajax.request({
                url: AppUrl + 'WorkOrder/PM_WORKREPAIRPER_HISTORY_SET',
                method: 'POST',
                async: false,
                params: {
                    V_V_DEPTCODE:'',
                    V_V_DEPTNAME:'',
                    V_V_ROLECODE:'',
                    V_V_ROLENAME:'',
                    V_V_PERCODE:Ext.getCmp('wtree').getChecked()[i].data.sid,
                    V_V_PERNAME:Ext.getCmp('wtree').getChecked()[i].data.text,
                    V_V_INPER:Ext.util.Cookies.get('v_personcode')
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                }
            });
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_AGREE',
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERID:$("#V_ORDERGUID").val(),
                    V_V_DBGUID:$.url().param("V_DBGUID"),
                    V_V_IDEA:$('#spyj').val()==''?'通过':$('#spyj').val(),
                    V_V_FLOWSTEP:$.url().param("V_FLOWSTEP"),
                    V_V_REPAIRCODE:Ext.getCmp('wtree').getChecked()[i].data.deptcode,
                    V_V_PERCODE:Ext.getCmp('wtree').getChecked()[i].data.sid
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    if(resp.V_INFO=='success'){
                        num++;
                    }else{
                        num--;
                    }

                    if (num==Ext.getCmp('wtree').getChecked().length){
                        window.opener.OnSearch();
                        window.close();
                    }
                }
            });
        }

    }
}
function QueryPer(rolecdoe){
    Ext.getCmp('wtree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'tree/PRO_PM_REPAIRDEPT_VIEW',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_DEPTCODE : V_DEPTCODE
        }
    });
    Ext.getCmp('wtree').store.load();
    Ext.getCmp('win').show();
}
function Agree() {
    QueryPer('%');
}
function DisAgree() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_DISAGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERID:$("#V_ORDERGUID").val(),
            V_V_DBGUID:$.url().param("V_DBGUID"),
            V_V_IDEA:$('#spyj').val()==''?'驳回':$('#spyj').val(),
            V_V_FLOWSTEP:$.url().param("V_FLOWSTEP")
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.V_INFO=='success'){

                alert('审批成功！')
                window.close();
            }else{
                alert('审批失败');
            }
        }
    });
}