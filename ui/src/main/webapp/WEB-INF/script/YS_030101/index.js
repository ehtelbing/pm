/**
 * Created by LL on 2017/11/27.
 */

Ext.onReady(function () {
    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['V_YEAR', 'V_TOTAL_A_PROJECT'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHART_PROJECT_ORG_SEL',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    var projectDrawChart = Ext.create('Ext.chart.Chart', {
        id: 'projectDrawChart',
        store: gridStore,
        //title: '全年大修工程对比情况',
        frame: true,
        animate: true,
        shadow: true,
        width:window.screen.width/3,
        height:window.screen.height/2,
        axes: [{
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'left',//numeric轴放在图表左侧
            fields: ['V_TOTAL_A_PROJECT'],
            title: '大修工程全年总费用（元）',
            label: {
                renderer: Ext.util.Format.numberRenderer('0.00')
            },
            grid: true,//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            minimum: 0
        }, {
            type: 'Category',//Category轴来显示数据节点的名字
            position: 'bottom',//category轴放在图表下部
            fields: ['V_YEAR'],
            title: '各年度大修工程情况对比分析表',
            minimum: 1
        }],
        series: [{
            type: 'column',//显示图形类型- line：则线图；column：柱形图；radar：雷达图
            axis: 'left',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            //style: {width: 60},//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 150,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.value[0] + '年: ' + item.value[1]+'元'/*Ext.util.Format.numberRenderer(item.value[1])*/);
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                field: 'V_TOTAL_A_PROJECT',//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0.00'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#333'
            },
            xField: 'V_YEAR',
            yField: 'V_TOTAL_A_PROJECT'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        layout:'column',
        region: 'north',
        width: '100%',
        items: [{
            id: 'A_BEGINDATE',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            fieldLabel: '起始日期',
            labelWidth: 80,
            width: 220,
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right'
        }, {
            id: 'A_ENDDATE',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value: new Date(),
            fieldLabel: '结束日期',
            labelWidth: 80,
            width: 220,
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            align: 'center',
            handler: _seek,
            width: 80,
            style: ' margin: 5px 5px 5px 30px',
            icon: imgpath + '/search.png'
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
            items: [buttonPanel]
        },{
            region: 'center',
            //layout: 'fit',
            border: false,
            items: [projectDrawChart]
        }]
    });

});

function _seek(){
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        'V_YEAR_BEGIN': Ext.getCmp('A_BEGINDATE').getSubmitValue().split('-')[0],
        'V_YEAR_END': Ext.getCmp('A_ENDDATE').getSubmitValue().split('-')[0]

    };
    gridStore.load();
}