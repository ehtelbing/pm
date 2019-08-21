var V_V_GUID = "";
if (location.href.split('?')[1] != undefined) {
    V_V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_V_GUID;
}
Ext.onReady(function () {

    Ext.QuickTips.init();
    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['FILE_CODE', 'FILE_NAME', 'FILE_TYPE', 'INSERT_DATE', 'INSERT_PERSON', 'V_PERSONNAME', 'FILESIZE', 'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url : AppUrl +'PM_07/DEFECT_UPFILE_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }, extraParams: {
                V_GUID: V_V_GUID
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        columns: [{text: '文件名', dataIndex: 'FILE_NAME', align: 'center', width: 200, renderer: down},
            {text: '上传时间', dataIndex: 'INSERT_DATE', align: 'center', width: 200, renderer: atleft},
            {text: '上传人', dataIndex: 'V_PERSONNAME', align: 'center', width: 160, renderer: atleft}]
    })

    /*
        var panel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            width: '100%',
            height: '100%',
            html: '<object id="NTKOATTACH_OCX" classid="clsid:A99B0DE5-282B-472c-A0C7-53E8182CD474" codebase="resources/nfmctlnewclsid.cab#version=4,0,1,2" width="100%" height="100%" viewastext> <param name="MaxUploadSize" value="100000000"> <param name="ViewType" value="0"> <param name="IsPermitAddDelFiles" value="-1"> <param name="DelFileField" value="DELATTNAME"><param name="ProductCaption" value="鞍钢集团矿业公司"><param name="ProductKey" value="3B7B35322DB10F06BDF7D7938BBC1A51F51C7C30"><span style="color: red">不能装载附件管理控件。请在检查浏览器的选项中检查浏览器的安全设置。</span></object>'
        });*/

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [grid]
    });

    //OnPageLoad();
});

function OnPageLoad() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_SELECT',
        method: 'POST',
        async: false,
        params: {
            V_GUID: V_V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    NTKOATTACH_OCX.AddServerFile(AppUrl + 'PM_07/DEFECT_UPFILE_DOWN_NTKO?V_V_FILECODE=' + resp.list[i].FILE_CODE, resp.list[i].FILE_NAME, resp.list[i].FILESIZE, resp.list[i].INSERT_DATE);
                }
            }
        }
    });
}

function down(value, metaData, record) {
    return '<div>'+record.data.FILE_NAME+'</div>'+'  '+'<a href="javascript:writeIn(\'' + record.data.FILE_CODE + '\')" >下载</a>';
}

function writeIn(fileid) {
    location.href = AppUrl + 'defect/DEFECT_FILE_DOWN?V_V_FILEGUID=' + fileid;
}

function atleft(value, metaData) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}