/**
 * Created by LL on 2017/12/15.
 */
var orderid = '';
if (location.href.split('?')[1] != null) {
    orderid = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}

Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['FILEID', 'FILE_NAME', 'UPLOAD_DATE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'LL/FILELIST',
            reader: {
                type: 'json',
                root: 'list'
            },
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'A_ORDERID': orderid
            }
        }
    });

    var panelNorth = Ext.create('Ext.form.Panel', {
        region: 'north',
        frame: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'displayfield',
                fieldLabel: '工单号',
                style: ' margin: 5px 0px 0px 20px',
                id: 'gdh',
                labelAlign: 'left',
                labelWidth: 90,
                value: orderid
            },
            {
                xtype: 'displayfield',
                fieldLabel: '试验日期',
                style: ' margin: 5px 0px 0px 20px',
                id: 'syrq',
                labelAlign: 'left',
                labelWidth: 90
            },
            {
                xtype: 'fieldset',
                title: '半成品试验',
                x: 5,
                y: 280,
                width: 600,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: '试验结果',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'bcpsyjg',
                    labelAlign: 'right',
                    labelWidth: 105
                }, {
                    xtype: 'textareafield',
                    fieldLabel: '试验说明',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'bcpsysm',
                    width: 700,
                    labelAlign: 'right',
                    labelWidth: 105
                }]
            }, {
                xtype: 'fieldset',
                title: '转子半成品试验',
                x: 5,
                y: 280,
                width: 600,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: '试验结果',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'zzbcpsyjg',
                    labelAlign: 'right',
                    labelWidth: 105
                }, {
                    xtype: 'textareafield',
                    fieldLabel: '试验说明',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'zzbcpsysm',
                    width: 700,
                    labelAlign: 'right',
                    labelWidth: 105
                }]
            }, {
                xtype: 'fieldset',
                title: '定子半成品试验',
                x: 5,
                y: 280,
                width: 600,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: '试验结果',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'dzbcpsysyjg',
                    labelAlign: 'right',
                    labelWidth: 105
                }, {
                    xtype: 'textareafield',
                    fieldLabel: '试验说明',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'dzbcpsysysm',
                    width: 700,
                    labelAlign: 'right',
                    labelWidth: 105
                }]
            }, {
                xtype: 'fieldset',
                title: '成品试验',
                x: 5,
                y: 280,
                width: 600,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: '试验结果',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'cpsysyjg',
                    labelAlign: 'right',
                    labelWidth: 105
                }, {
                    xtype: 'textareafield',
                    fieldLabel: '试验说明',
                    style: ' margin: 5px 0px 0px 0px',
                    id: 'cpsysysm',
                    width: 700,
                    labelAlign: 'right',
                    labelWidth: 105
                }]
            }]
    });

    var gridPanel = Ext.create("Ext.grid.Panel", {
        id: 'gridPanel',
        title: '文件列表',
        region: 'center',
        xtype: 'gridpanel',
        columnLines: true,
        autoScroll: true,
        store: gridStore,
        columns: [{
            text: '文件名',
            align: 'center',
            dataIndex: 'FILE_NAME',
            width: 150
        }, {
            text: '上传时间',
            dataIndex: 'UPLOAD_DATE',
            align: 'center',
            width: 150,
            renderer: DateFormat
        }, {
            text: '下载',
            dataIndex: 'FILEID',
            align: 'center',
            width: 100,
            renderer: downloadMore
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [panelNorth]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    Bind();
});

function Bind() {
    Ext.Ajax.request({
        url: AppUrl + 'LL/ORDERSYDETAIL',
        method: 'POST',
        params: {
            'A_ORDERID': orderid
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.list.length > 0) {
                Ext.getCmp('syrq').setValue(data.list[0].SY_DATE);
                Ext.getCmp('bcpsyjg').setValue(data.list[0].BCSY_RESULT);
                Ext.getCmp('bcpsysm').setValue(data.list[0].BCSY_RESULT_DESC);
                Ext.getCmp('zzbcpsyjg').setValue(data.list[0].ZBCSY_RESULT);
                Ext.getCmp('zzbcpsysm').setValue(data.list[0].ZBCSY_RESULT_DESC);
                Ext.getCmp('dzbcpsysyjg').setValue(data.list[0].DBCSY_RESULT);
                Ext.getCmp('dzbcpsysysm').setValue(data.list[0].DBCSY_RESULT_DESC);
                Ext.getCmp('cpsysyjg').setValue(data.list[0].CSY_RESULT);
                Ext.getCmp('cpsysysm').setValue(data.list[0].CSY_RESULT_DESC);
            }
        }
    });
}

function downloadMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='OnDownload(\"" + rowIdx + "\")' style='color:blue'>下载</a>";
}

function OnDownload(rowIdx) {
    var fileId = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
    var fileName = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILE_NAME;
    location.href = AppUrl + "LL/FILEDOWNLOAD?A_FILEID=" + fileId + "&V_V_FILENAME=" + fileName;
}

function DateFormat(value, metaData) {
    if (value == "" || value == null) {
        return "";
    } else {
        return value.split(' ')[0];
    }
}