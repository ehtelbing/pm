var Guid="";
var deptcode="";
var equcode="";
var equtype="";

if(Ext.urlDecode(location.href.split("")[1])!=undefined)
{
    Guid=Ext.urlDecode(location.href.split("?")[1]).INGUID;
    deptcode=Ext.urlDecode(location.href.split("?")[1]).INDEPTCODE;
    equcode=Ext.urlDecode(location.href.split("?")[1]).INEQUCODE;
    equtype=Ext.urlDecode(location.href.split("?")[1]).INEQUTYPE;
}

Ext.onReady(function(){
    Ext.QuickTips.init();
    //缺陷查找
    var dqxgridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'dqxgridStore',
        fields: ['I_ID',
            'V_DEFECTLIST',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCETABLE',
            'V_SOURCEREMARK',
            'V_SOURCEID',
            'D_DEFECTDATE',
            'D_INDATE',
            'V_PERCODE',
            'V_PERNAME',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_EQUSITE',
            'V_EQUSITENAME',
            'V_EQUTYPECODE',
            'V_EQUTYPENAME',
            'V_IDEA',
            'V_STATECODE',
            'V_STATENAME',
            'V_STATECOLOR',
            'V_GUID',
            'V_EQUSITE1',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_SOURCE_GRADE',
            'V_EQUCHILDCODE',
            'V_INPERCODE',
            'V_INPERNAME',
            'V_BZ',
            'V_REPAIRMAJOR_CODE',
            'V_HOUR',
            'V_FLAG',
            'V_SYSTEM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams:{
                V_V_DEPTCODE: deptcode,//Ext.util.Cookies.get('v_deptcode')
                V_V_EQUCODE: equcode,
                V_V_STATECODE: '10'
            }
        }
    });
    var defpanel=Ext.create('Ext.grid.Panel', {
        id: 'defpanel',
        store: dqxgridStore,
        region: "center",
       // split: true,
        width: 540,
        selModel: {
            selType: 'checkboxmodel',
        },
        columnLines: true,
        border: true,
        columns: [
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center', renderer: atleft},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center', renderer: atleft},
            {text:'处理意见',width:150,dataIndex:'V_IDEA',align:'center',renderer:atleft}
        ],
        tbar:[{

            xtype:'button',
            text:'确认返回',
            handler:OnBtnAddQx
        }]
        // , listeners: {itemclick: OnBtnAddQx(a,record)
        //
        //     }
    });
    Ext.create('Ext.container.Viewport',{

        layout:'border',
        items:[defpanel]
    })
});


//设备保存缺陷
function OnBtnAddQx() {
    var record=Ext.getCmp("defpanel").getSelectionModel().getSelection();

    //添加设备关联
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID: Guid,
            V_V_EQUTYPECODE: equtype,
            V_V_EQUCODE: equcode
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == '成功') {

            }
        }
    });
    for(var i=0;i<record.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECT_GUID: record[i].data.V_GUID,
                V_V_PROJECT_GUID: Guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == 'SUCCESS') {
                    //写入缺陷-维修计划日志
                    Ext.Ajax.request({
                        url: AppUrl + 'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                        method: 'POST',
                        params: {
                            V_PROGUID: Guid,
                            V_DEFECTGUID: record[i].data.V_GUID,
                            V_PERCODE: Ext.util.Cookies.get("v_personcode"),
                            V_DEPT: Ext.util.Cookies.get("v_deptcode"),
                            V_ORG: Ext.util.Cookies.get("v_orgCode"),
                            V_STATE: 'IN'
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);
                        }
                    });
                    //写入解决方案
                    if(record[i].data.V_IDEA!=''){
                        Ext.Ajax.request({
                            url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_IN',
                            method: 'POST',
                            params: {
                                V_PROGUID: Guid,
                                V_DEFECTGUID: record[i].data.V_GUID,//defectguid,//e.context.record.data.V_GUID,
                                V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
                                V_INDEPT: Ext.util.Cookies.get('v_deptcode'),
                                V_INORG: Ext.util.Cookies.get('v_orgCode'),//decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
                                V_DEF_SOLVE: record[i].data.V_IDEA,// e.context.record.data.DEF_SOLVE,
                                V_BJ_STUFF: '',// e.context.record.data.BJ_STUFF,
                                V_EQUCODE: record[i].data.V_EQUCODE//equcode//e.context.record.data.V_EQUCODE
                            },
                            success: function (response) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.RET == "SUCCESS") {

                                } else {
                                    alert("解决方案写入失败");
                                }
                            }
                        });
                    }
                    //修改缺陷状态
                    Ext.Ajax.request({
                        url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID:record[i].data.V_GUID,
                            V_V_STATECODE: '50'//已计划

                        },
                        success: function (ret) {
                            var resp = Ext.decode(ret.responseText);
                            if (resp.V_INFO == 'success') {
                                window.opener.QueryDefect();
                                window.close();

                            } else {
                                alert("修改缺陷状态失败");
                            }

                        }
                    });


                    // QueryDefect();
                } else {
                    alert("添加失败！")
                }
            }
        });
    }

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}