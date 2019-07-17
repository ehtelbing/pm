var userid = Ext.util.Cookies.get("mm.userid");
var x_1=[];
var y_1=[];
var y_2=[];
var y_3=[];
var year=new Date().getFullYear();
var month=new Date().getMonth();
if(month==0){
    year=year-1;
    month=12;
}
Ext.onReady(function() {
    var imagePanel = new Ext.Panel({
        id : 'imagePanel',
        region: 'center',
        html :      '<div id="mainEchart" style="height:177px;width:308px;padding:0px;text-align:center;"></div>',
        frame : false,
        border : false,
        buttonAlign : 'center',
//	    margin : '5 5 2.5 5',
        autoScroll : true,//允许滚动
        // baseCls : 'my-panel-noborder',
        bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
        /*tbar : [ '精密点检数据表'
            , /!*'->',  {
                xtype : 'button',
                margin : '0 10 0 0 ',
                text : '查询',
                icon : imgpath + '/a1.gif',
                handler : load
            }*!/ ]*/
        //开启竖直滚动条，关闭水平滚动条
    });

    Ext.create('Ext.container.Viewport', {
        layout : 'fit',
        items : [imagePanel]
    });

    load();

});

function load() {
    var myChart2 = echarts.init(document.getElementById("mainEchart"));
    // myChart2.setOption(option);
    var owidth = window.document.body.offsetWidth -40;
    var oheight = window.document.body.offsetHeight -30;
    myChart2.on('click', function (params) {
        if(params.componentType == "xAxis"){
            if(params.value=='齐矿'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E9%BD%90%E7%9F%BF', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );
            }else if(params.value=='齐选'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E9%BD%90%E9%80%89', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );
            }else if(params.value=='大球'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E5%A4%A7%E7%90%83', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
            }else if(params.value=='大矿'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E5%A4%A7%E7%9F%BF', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
            }else if(params.value=='眼矿'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E7%9C%BC%E7%9F%BF', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
            }else if(params.value=='鞍千'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E9%9E%8D%E5%8D%83', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
            }else if(params.value=='东烧'){
                window.open('http://10.101.32.102/equSystemWeb_JMDJ/Upload_report/BrowseFiles_all.aspx?Folder=%2fEquSystemWeb_JMDJ%2fUpFiles%2f2019%2f%E4%B8%9C%E7%83%A7', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
            }
        }
    });
    //图

   $.ajax({
        type: "POST",
        url: AppUrl + 'jMDJ/wordTicket',
        data: {V_V_YEAR:year , V_V_MONTH:month},//请求的参数
        success: function(data){
            var list=data.list;
            var falg=0;
            for(var i=0;i<list.length;i++){
                x_1.push(list[i].name);
                y_1.push(list[i].jhn);
                y_2.push(list[i].sjn);
                y_3.push(list[i].rate);
                if(i==list.length-1){
                    falg=1;
                }
            }
            if(falg==1){
                var option = {
                    /*title: {
                        x: 'center',
                        text: '',
                        subtext: '',
                        link: ''
                    },*/
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        data:['计划台数（台）','实际台数（台）','计划执行率'],
                        y:'bottom',
                        itemWidth:10,
                        itemHeight:10,
                        itemGap:4
                    },
                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        x: 40,
                        x2: 40,
                   	        y: 9,
                   	        y2: 55
                        // bottom:'55%'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            // show: false,
//                        	            data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
                            /*axisLabel: {
                                interval:0,//横轴信息全部显示
                                rotate:90,//-30度角倾斜显示
                            },*/
                           triggerEvent: true,
                            axisLabel:{
                                 formatter:function(value){
                                     return value.split("").join("\n")
                                 }
                             },
                            data: x_1
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            show: true
                            // name: '数量'
//
                        },
                        {
                            type: 'value',
                            show: true
                            // name: '数量'
//
                        }
                    ],
                    series: [
                        {
                            name: '计划台数（台）',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                        ];
                                        return '#27727B'//colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: false,
                                        position: 'right',
                                        formatter: '{b}'
//                    	                        	'{b}\n{c}'
                                    }
                                }
                            },
//                    	            data: [12,21,10,4,12,5,6,5,25,23,7],
                            data: y_1
                            // yAxisIndex:0
                        },
                        {
                            name: '实际台数（台）',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                        ];
                                        return '#E87C25'//colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: false,
                                        position: 'right',
                                        formatter: '{b}'
//                    	                        	'{b}\n{c}'
                                    }
                                }
                            },
//                    	            data: [12,21,10,4,12,5,6,5,25,23,7],
                            data: y_2
                            // yAxisIndex:0
                        },
                        {
                            name: '计划执行率(%)',
                            type: 'line',
                            symbol:'none',
                            itemStyle: {
                                normal: {
                                    color:  '#99a78e',
                                    lineStyle:{
                                        color:'#99a78e'
                                    },
                                    label: {
                                        show: false,
                                        position: 'right',
                                        formatter: '{b}'
//                    	                        	'{b}\n{c}'
                                    }
                                }
                            },
//                    	            data: [12,21,10,4,12,5,6,5,25,23,7],
                            data: y_3,
                            yAxisIndex:1
                        }
                    ]
                };
                myChart2.setOption(option);
            }

        }
    });

           /* }
        }
    });*/
}
