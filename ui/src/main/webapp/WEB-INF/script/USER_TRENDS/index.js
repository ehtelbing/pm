Ext.define('Ext.grid.column.LineBreakColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.linebreakcolumn',
    initComponent: function () {
        var me = this,
            // 定义customerRenderer变量，保存用户配置的renderer
            customerRenderer = me.renderer;
        if (customerRenderer) {
            // 如果用户配置了renderer，则限制性用户配置的renderer，然后执行默认的内容换行renderer
            me.renderer = function (value, metadata, record, rowIndex, columnIndex, store) {
                value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
                value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
                return value;
            };
        }
        me.callParent(arguments);
    },
    defaultRenderer: function (value, metadata, record, rowIndex, columnIndex, store) {
        metadata.style = 'white-space: normal; overflow: visible; word-break: break-all;';
        return value;
    }
});

var x_2 = [];
var y_2 = [];
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    groupField:'V_DATE',
    groupDir : 'desc',
    fields: ['I_ID','V_USERID','V_INSERTDATE','V_ACTIVE',
        'V_REMARK','V_ACT_TYPE','V_IP','V_MENUNAME','V_URL','V_PERSONNAME','V_DATE','V_TIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cxy/MM_USER_TRENDS_BYNAME_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});
//grid显示
function query() {
    Ext.data.StoreManager.lookup('gridStore').load();
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    layout: 'column',
    frame: true,
    //baseCls: 'my-panel-no-border',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'textfield',
            id: 'search',
            fieldLabel: '搜索',
            margin: '5 0 5 5',
            labelWidth: 30,
            width: 180,
            listeners :{
                specialKey :function(field,e){
                    if (e.getKey() == Ext.EventObject.ENTER) query();
                }
            }
        },{
            xtype: 'button',
            text: '查询',
            margin: '5 0 5 5',
            icon: imgpath + '/search.png',
            handler: query
        },{
            xtype: 'button',
            text: '删除',
            margin: '5 0 5 15',
            icon: imgpath + '/delete1.png',
            handler: OnButtonDelete
        }
    ]
});
var imagePanel = new Ext.Panel({
    id : 'imagePanel',
    region: 'center',
    html :      '<div id="mainEchart" style="height:70%;padding:30px;text-align:center;"></div>',
        // 'border:1px solid #ccc;'+ '<div id="mainTable" style="position:relative;text-align:center;padding:10px;">'
        // +'<label for="mainTable"><h1>档案调用次数表</h1></label>'
        // +'<table id="content-table" border="1" style="width:100%;text-align:center;">'
        // + '<tr><th>月份</th><th>调用次数</th></tr>',
    buttonAlign : 'center',
    autoScroll : true,//允许滚动
    bodyStyle : 'overflow-x:hidden; overflow-y:scroll'
    //开启竖直滚动条，关闭水平滚动条
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    // region: 'west',
    border: true,
    columnLines: true,
    store: 'gridStore',
    features:[{
        ftype:'grouping',
        groupHeaderTpl:'{name}',
        startCollapsed:false,
        hideGroupedHeader:false
    }],
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true //只能通过checkbox选择
    },
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '时间', align: 'center', width: 100, dataIndex: 'V_TIME',renderer: rendererTime},
        {text: '页面', align: 'center', width: 230, dataIndex: 'V_MENUNAME'
            }
        // {text: '', align: '', width: 200, dataIndex: 'V_DATE',hidden:true}

    ]
    ,listeners: {
        'cellclick':function(grid,rowIndex,columnIndex,record) {
            if(columnIndex==3){
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                window.open(AppUrlFrame +record.data.V_URL, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
                insertHistory(record.data.V_ACTIVE);
            }else{
                return false;
            }


        }
    }
    // bbar: ["->",
    //     {
    //         id: 'page',
    //         xtype: 'pagingtoolbar',
    //         store: gridStore,
    //         width: '100%',
    //         dock: 'bottom',
    //         displayInfo: true,
    //         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
    //         emptyMsg: '没有记录'
    //     }
    // ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            border: false,
            items: [northPanel]
        }, {
            region: 'west',
            layout: 'fit',
            width: '40%',
            border: false,
            items: [gridPanel]
        }, {
            region: 'center',
            layout: 'border',
            border: false,
            items: [imagePanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {

        store.proxy.extraParams = {
            V_V_USERID: Ext.util.Cookies.get('v_personcode'),
            V_V_MENUNAME:Ext.getCmp('search').getValue()

        }
    });
    query();
    getColumn();
});
function rendererTime(value, metaData) {

    return value.split(":")[0]+':'+value.split(":")[1];
}
//删除
function OnButtonDelete(){
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择只少一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除记录吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'cxy/MM_USER_TRENDS_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: records[i].get('I_ID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.RET == 'SUCCESS') {//成功，会传回true
                                i_err++;
                                if (i_err == records.length) {
                                    query();
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '删除成功!',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR,
                                        fn: function () {
                                            query();
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: resp.RET,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR,
                                    fn: function () {
                                        query();
                                    }
                                });
                            }
                        },
                        failure: function (response) {//访问到后台时执行的方法。
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR,
                                fn: function () {
                                    query();
                                }
                            })
                        }
                    });
                }
            }
        }
    });
}
function insertHistory(active) {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/MM_USER_TRENDS_INS',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'V_V_USERID': Ext.util.Cookies.get('v_personcode'),
            'V_V_ACTIVE': active,
            'V_V_REMARK': '',
            'V_V_ACT_TYPE': '页面访问',
            'V_V_IP': ''
        },
        success: function (response) {
            query();
        }
    });
}
function getColumn() {
var myChart2 = echarts.init(document.getElementById("mainEchart"));
    Ext.Ajax.request({
        url: AppUrl + 'cxy/MM_USER_TRENDS_TABLE_SEL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_USERID: Ext.util.Cookies.get('v_personcode')

        },
        success: function (resps) {
            var resp = Ext.decode(resps.responseText);
            // if (resp.msg == 'success') {

                if (resp.list.length > 0) {
                    for (var i = 0; i < resp.list.length; i++) {
                        y_2.push(resp.list[i].V_MENUNAME);
                        x_2.push(Ext.util.Format.number(parseFloat(resp.list[i].V_NUM),'0'));
                    }
                    var option = {
                        title: {
                            text: '历史统计图',
                            textStyle: {
                                fontSize: 20
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        // legend: {
                        //     data:['2011年']
                        // },
                        toolbox: {
                            feature: {
                                dataView: {show: false, readOnly: false},        // 数据试图是否在控件中显示
                                //magicType: {show: true, type: ['stack', 'tiled']},
                                //restore: {show: true},
                                saveAsImage: {show: false}
                            }
                        },
                        // calculable : true,
                        grid: {
                            top: '10%',
                            left: '1%',
                            right: '6%',
                            bottom: '6%',
                            containLabel: true,
                            show: false                 // 网格边框是否显示，上和右边框
                        },
                        // xAxis : [
                        //     {
                        //         type : 'value',
                        //         boundaryGap : [0, 0.1]
                        //     }
                        // ],
                        yAxis: [{
                            type: 'category',
                            // "axisLine": {
                            //     lineStyle: {
                            //         color: '#000'
                            //     }
                            // },
                            "splitLine": {
                                "show": true
                            },
                            // "axisTick": {
                            //     "show": true
                            // },
                            // "splitArea": {
                            //     "show": true
                            // },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color:'#000000'  //这里用参数代替了
                                }
                            },
                            axisLine:{      　　　　　　　　//坐标轴轴线相关设置。
                                show:true,　　　　　　　　//是否显示坐标轴轴线。
                                textStyle:{
                                    fontSize:14,
                                    color: '#ffffff'
                                },
                                lineStyle:{
                                    width:2 ,  　　　　　　　　//坐标轴线线宽。　
                                    color:'#1e90ff'　　　　　　　　//颜色。

                                }
                            },
                            // axisLine:{      　　　　　　　　//坐标轴轴线相关设置。
                            //     show:true,　　　　　　　　//是否显示坐标轴轴线。
                            //     lineStyle:{
                            //         width:2 ,  　　　　　　　　//坐标轴线线宽。　
                            //         color:'#1e90ff'　　　　　　　　//颜色。
                            //
                            //     }
                            // }
                            data: y_2
                        }],
                        xAxis: [{
                            name: '',
                            type: 'value',
                            splitLine: {                // 网格线 y轴对应的是否显示
                                show: true
                            },
                            "axisTick": {
                                "show": true
                            },
                            "splitArea": {
                                "show": true
                            },
                            axisLabel: {
                                // formatter: '{value}',
                                show: true,
                                textStyle: {
                                    color:'#000000'  //这里用参数代替了
                                }
                            },
                            axisLine:{      　　　　　　　　//坐标轴轴线相关设置。
                                show:true,　　　　　　　　//是否显示坐标轴轴线。
                                textStyle:{
                                    fontSize:14,
                                    color: '#ffffff'
                                },
                                lineStyle:{
                            　　　width:2 ,  　　　　　　　　//坐标轴线线宽。　
                            　　 color:'#1e90ff'　　　　　　　　//颜色。
                            　
                            　　}
                            }
                        }],
                        series: [{
                            name: '',
                            type: 'bar',
                            // itemStyle: {
                            //     normal: {color: '#2ec7c9'}
                            // },
                            data: x_2,
                            itemStyle: {
                                emphasis: {
                                    barBorderRadius: [10, 10, 10, 10]
                                },
                                normal: {
                                    barBorderRadius: [10, 10, 10, 10],
                                    color: '#2ec7c9'
                                }


                            }
                            // markLine: {
                            //     data: [
                            //         {type: 'average', name: '平均值'}
                            //     ]
                            // },


                        }]
                    };
                    myChart2.setOption(option);
            }
            // else {
            //             //     alert('数据有误');
            //             // }
        }
    });
}