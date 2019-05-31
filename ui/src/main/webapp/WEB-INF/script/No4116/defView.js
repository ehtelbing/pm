

var workguid="";
if(Ext.urlDecode(location.href.split("?")[1])!=undefined){
    workguid=Ext.urlDecode(location.href.split('?')[1]).V_GUID==null?"":Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function(){

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['I_ID',
            'V_DEFECTLIST',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCEID',
            'D_DEFECTDATE',
            'D_INDATE',
            'V_PERCODE',
            'V_PERNAME',
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
            'V_GUID',
            'V_EQUSITE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_SOURCE_GRADE',
            'V_EQUCHILDCODE',
            'V_INPERCODE',
            'V_INPERNAME',
            'V_EQUTYPECODE',
            'V_ORGCODE',
            'V_DEPTNAME',
            'V_HOUR',
            'V_BZ',
            'V_REPAIRMAJOR_CODE',
            'V_PROJECT_CODE',
            'V_PROJECT_NAME',
            'V_FLAG',
            'V_PROC_WAY',
            'UP_GUID',
            'V_SYSTEM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_DEFECT_SEL_FROM_WORK',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams:{
                V_WORK_GUID:workguid
            }
        }
    });


    var gridPanel=Ext.create('Ext.grid.Panel',{
       id:'gridPanel',
       frame:true,
       border:false,
       columnLines:true,
       store:gridStore,
       region:'center',
       // selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
       //     selType: 'checkboxmodel',
       //     mode: 'SIMPLE'
       // },
       columns: [
           {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
           {text: '缺陷日期', width: 140, dataIndex: 'D_INDATE', align: 'center', renderer: timelfet},
           {text: '缺陷明细', width: 250, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft},
           {text: '设备名称', width: 120, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
           {text: '设备位置', width: 200, dataIndex: 'V_EQUSITE', align: 'center', renderer: atleft},
           {text: '单位', width: 120, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
           {text: '负责人', width: 120, dataIndex: 'V_PERNAME', align: 'center', renderer: atleft},
           {text: '处理意见', width: 150, dataIndex: 'V_IDEA', align: 'center', renderer: atleft},
           {text:'缺陷来源',width:90,dataIndex:'V_SOURCENAME',align:'center',renderer:atleft}
       ]
        /*,
       bbar: [{
           id: 'page',
           xtype: 'pagingtoolbar',
           dock: 'bottom',
           displayInfo: true,
           displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
           emptyMsg: '没有记录',
           store: 'gridStore'
       }]*/
   });
   Ext.create('Ext.container.Viewport',{
       id:'main',
       layout:'border',
       items:[gridPanel]
       });
});

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:center;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}