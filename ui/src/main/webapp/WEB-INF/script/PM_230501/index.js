var V_GUID = '';
var stime = '';
var etime = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;
    (parameters.stime == undefined) ? stime = '' : stime = parameters.stime;
    (parameters.etime == undefined) ? etime = '' : etime = parameters.etime;
}

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_DJ_DATE', 'V_DJ_PERNAME', 'V_CRITERION_CONTENT','V_DJ_STATE','V_DJ_ZQ','V_DJ_NR',{ name: 'TNUM', type: 'number'}],
    groupField: 'V_DJ_STATE',
    groupDir:'DESC',
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PM_06_DJ_DATA_SEL_BYSTATE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var formpanel = Ext.create('Ext.form.Panel', {
    id: 'formpanel',
    width: '100%',
    region: 'north',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 70,
        margin: '0 0px 10px 0',
        width: 214
    },
    layout: 'column',
    bodyPadding: '15px 0 0 0 ',

    items: [
        { id: 'ycnum', xtype: 'displayfield', fieldLabel: '异常' },
        { id: 'zcnum', xtype: 'displayfield', fieldLabel: '正常'}


    ]
});
var Layout = {
    layout : 'border',
    items : [formpanel,
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',

            features : [{
                ftype : 'groupingsummary',
                groupHeaderTpl : '{name}',
                hideGroupedHeader : true,
                enableGroupingMenu : false
            }],

            features : [{
                groupHeaderTpl : ['{name:this.formatName}',
                    {
                        formatName : function(name) {
                        }
                    },'{rows:this.formatRows}',{
                        formatRows:function(data){
                            var state=data[0].raw.V_DJ_STATE=='1'?'异常':'正常'
                            return '状态：'+state;
                        }
                    }],

                ftype : 'groupingsummary'/*,
                 collapsible : false*///不可伸缩

            }],
            columns: [
                /*{ xtype: 'rownumberer', text: '序号', width: 60, align: 'center',renderer : stateStyleNum
                },*/
                {
                    text: '点检时间', align: 'center', width: 150, dataIndex: 'V_DJ_DATE',renderer : stateStyle
                },
                {
                    text: '点检人', align: 'center', width: 150, dataIndex: 'V_DJ_PERNAME',renderer : stateStyle
                },
                {
                    text: '点检内容', align: 'center', width: 150, dataIndex: 'V_CRITERION_CONTENT',renderer : stateStyle
                },
                {
                    text: '是否异常', align: 'center', width: 150, dataIndex: 'V_DJ_STATE',renderer : state
                },
                {
                    text: '点检周期', align: 'center', width: 150, dataIndex: 'V_DJ_ZQ',renderer : stateStyle
                },
                {
                    text: '点检描述', align: 'center', width: 150, dataIndex: 'V_DJ_NR',renderer : stateStyle
                },{
                    text: '条数',
                    dataIndex: 'TNUM',
                    align: 'center',
                    width : 120,
                    hidden:true,
                    summaryType: 'sum',
                    summaryRenderer: function (value, metadata) {
                        metadata.style = 'font-weight: bold;';
                        return '合计 : '+value+'条';
                    },
                    renderer : stateHJStyle

                }
            ]
        }
    ]
};



function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'cjy/PM_06_DJ_DATA_SEL_BYSTATE_NUM',
        params: {
            V_V_GUID : V_GUID,
            V_V_STIME : stime,
            V_V_ETIME : etime
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);

            Ext.getCmp('zcnum').setValue(resp.V_ZCNUM+'条');
            Ext.getCmp('ycnum').setValue(resp.V_YCNUM+'条');
        }
    });
    queryGrid();
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_GUID : V_GUID,
            V_V_STIME : stime,
            V_V_ETIME : etime
        }
    });

}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function state(a,value,metaData){
    if(a == '1'){
        return '<span style = "color:red"> 异常</span>';

    }
    else{
        return '正常';
    }
}

function stateStyle(value,metaData,record){
    if(record.data.V_DJ_STATE=='1'){
        return '<span style = "color:red">'+value+'</span>';

    }
    else{
        return value;
    }
}
function stateStyleNum(value,metaData,record,rowIndex){
    if(record.data.V_DJ_STATE=='1'){
        return '<span style = "color:red">'+rowIndex+'</span>';

    }
    else{
        return rowIndex;
    }
}
function stateHJStyle(){
    return '';
}