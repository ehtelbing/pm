/**
 *create by hrb 2019/7/11
 * 维修查询详情页
 */
var wxGuid="";
if(location.href.split("?")[1]!=undefined){
    wxGuid=Ext.urlDecode(location.href.split("?")[1]).V_GUID;
}

Ext.onReady(function(){

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

    var leftPanel=Ext.create('Ext.panel.Panel',{
        id:'leftPanel',
        region:'west',
        width:'50%',
        autoScroll:true,
        layout: {type:'table',columns:'2'},
        items:[
            {
                xtype: 'textfield',
                id: 'fzPer',
                readOnly: true,
                fieldLabel: '负责人',
                margin: '15 5 5 5',
                labelWidth: 100,
                editable: false,
                labelAlign: 'right'
            },{
                xtype: 'textfield',
                fieldLabel: '项目编码',
                id: 'ProjectCode',
                labelWidth: 100,
                margin: '15 5 5 5',
                readOnly: true,
                editable: false,
                hidden: true
            },
            {
                xtype: 'textfield',
                fieldLabel: '项目名称',
                id: 'ProjectName',
                labelWidth: 100,
                margin: '5 5 5 5'
            }, {
                xtype: 'textfield',
                id: "zyq",
                fieldLabel: '计划作业区',
                margin: '5 5 5 5',
                labelWidth: 100,
                readOnly: true,
                editable: false,
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id:'zy',
                fieldLabel: '专 业',
                margin: '5 5 5 5',
                readOnly: true,
                labelWidth: 100,
                labelAlign: 'right'
            },
            {
                xtype: 'textfield',
                id: 'btime',
                readOnly: true,
                editable: false,
                fieldLabel: '开工时间',
                margin: '5 5 5 5',
                labelWidth: 100,
                labelAlign: 'right',
                value:''
            },
            {
                xtype: 'textfield',
                id: 'etime',
                fieldLabel: '竣工时间',
                margin: '5 5 5 5',
                labelWidth: 100,
                readOnly:true,
                editable: false,
                labelAlign: 'right',
                value: ''
            }
            ,{
                xtype: 'textareafield',
                id: 'qstext',
                name: 'message',
                fieldLabel: '维修工程请示',
                margin: '5 5 5 5',
                position: 'absolute',
                labelWidth: 100,
                width:520,
                height: 520,
                readOnly:true,
                editable: false,
                colspan:2
            }
        ]
    });
    var rightPanel=Ext.create('Ext.grid.Panel',{
        id:'rightPanel',
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
        ],
        height:395,
        width: '100%'
    });
   Ext.create('Ext.container.Viewport',{
       layout:'border',
       items:[leftPanel,rightPanel]
   });
    LoadData();
    _delDetail(wxGuid);
});

function LoadData(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: wxGuid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
                // Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"大修计划编制");
                var Year = resp.list[0].V_YEAR;
                var OrgCode = resp.list[0].V_ORGCODE;
                var OrgName = resp.list[0].V_ORGNAME;
                var DeptCode = resp.list[0].V_DEPTCODE;
                var DeptName=resp.list[0].V_DEPTNAME;
                var fzrPer = resp.list[0].V_SPECIALTYMAN;
                //专业默认值

                Ext.getCmp('zy').setValue(resp.list[0].V_SPECIALTYNAME);
                Ext.getCmp('fzPer').setValue(resp.list[0].V_SPECIALTYNAME);
                Ext.getCmp('ProjectCode').setValue(resp.list[0].V_SPECIALTYNAME);

                Ext.getCmp('ProjectName').setValue(resp.list[0].V_PORJECT_CODE);
                Ext.getCmp('ProjectName').setValue(resp.list[0].V_PORJECT_NAME);
                Ext.getCmp("zyq").setValue(DeptName);
                Ext.getCmp("qstext").setValue(resp.list[0].V_QSTEXT)
                Ext.getCmp('btime').setValue(resp.list[0].V_BDATE.split(" ")[0]);
                Ext.getCmp('etime').setValue(resp.list[0].V_EDATE.split(" ")[0]);

            }
        }
    });
}
//缺陷详情查找
function _delDetail(wxGuid){
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid
        }
    });
}
//查看缺陷附件详情
function OnLookDefect(value, metaDate, record) {
    metaDate.style = "text-align:left;";
    return '<a href="javascript:LookDefect(\'' + value + '\')" >' + record.data.DEFILENUM + '</a>';
}
function LookDefect(guid) {
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight + 100;
    window.open(AppUrl + 'page/DefectPic/index.html?V_V_GUID=' + guid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store) {
    metaDate.style = "text-align:left;";
    return '<div date-qtip="' + value + '" >' + value.toString().substring(0, 10) + '</div>';
}