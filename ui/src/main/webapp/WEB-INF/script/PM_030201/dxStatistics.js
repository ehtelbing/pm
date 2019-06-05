

var tabledate="";

var headpanel=Ext.create('Ext.panel.Panel',{
    id:'headpanel',
    region:'north',
    frame:false,
    border:true,
    height:60
    //, renderTo:'headdiv'
    //,bodyStyle:'background-color:#000000;border:1px solid #000',
    // baseCls:'x-panel-header',
    // title:"<header><a href=\""+AppUrl+'page/home/Index.html'+"\" class=\"logo\"> <img src=\""+APP+'/app/pm/images/statis/dxlogo.png'+"\" height=\"30\" align=\'top\' alt=\"Logo\"/> </a></header>"
});
var zyqpanel=Ext.create('Ext.panel.Panel',{
   id:'zyqpanel',
    layout:'column',
    frame:true,
    border:false,
    defaults:{
        style:'padding: 60px 60px 60px 60px'
    },
    padding: '50px 20px 20px 50px',
    width:1917,
    height:850,
    autoScroll:true,
    // bodyStyle:'background-color:#000000;border:1px solid #000',
    // baseCls:'x-panel-header',
    items:[ ]

});
var zypanel=Ext.create('Ext.panel.Panel',{
    id:'zypanel',
    layout:'column',
    frame:true,
    border:false,
    defaults:{
        style:'padding: 60px 60px 60px 60px'
    },
    padding: '50px 20px 20px 50px',
    width:1917,
    height:850,
    // bodyStyle:'background-color:#000000;border:1px solid #000',
    // baseCls:'x-panel-header',
    autoScroll:true,
    // renderTo: document.body,
    items:[ ]
});
var tabPanel=Ext.create('Ext.tab.Panel',{
    id:'tabPanel',
    region:'center',
    // bodyStyle:'background-color:#000000;border:1px solid #000',
    // baseCls:'x-panel',  //
    // renderTo:'tabheaderdiv',
    frame:true,
    border:false,
    activeTab:0,
    enableTabScroll:true,
    defaults:{
        autoScroll:true
    }
    ,
    items:[
        {
            id: 'tab1',
            title: "<div id='cssmenu'><ul><li><i class='fa fa-clock-o'><i>作业区</i></i></li></ul></div>",
            // class:'fa fa-clock-o',
            // renderTo:'cssmenu',
            items: [zyqpanel],
            listeners: { activate: actionO }
        }
        ,{
            id: 'tab2',
            title: '专业',
            items: [zypanel],
            listeners: { activate: action1 }
        }
    ]

});
Ext.onReady(function(){
    // Ext.create('Ext.container.Viewport',{
    //     layout:'border',
    //     id:'main',
    //     frame:true,
    //     border:false,
    //     baseCls:'x-body',
    //     bodyStyle:'background-color:#000000;border:1px solid #000',
    //     // items:[headpanel,tabPanel]
    //     items:[tabPanel]
    // });
    actionO();
    $('#lia1').addClass('active');

    $('#li1').click(function() {
        $('#lia1').addClass('active');
        $('#lia2').removeClass('active');
        actionO();
    });
    $('#li2').click(function() {
        $('#lia2').addClass('active');
        $('#lia1').removeClass('active');
        action1();
    });


});

function actionO(tab){

    $('#cpdiv').empty();
    var ctable="<table border=\"0\" cellspacing=\"0\" cellpadding=\"50\" style=\"border-collapse:separate; border-spacing:20px;>";
    var temp="";
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_PM_YEAR_GROUPEBY_DEPT',
        id:'selProByDept',
        method:'POST',
        async:false,
        params:{}
        ,success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            var length=resp.list.length;
            var rnum=length/6;
            if(length!=0){
                tabledate=ctable+"<tr border=\"1\">";
                for(var k=1;k<=length;){
                    temp="<td width=\"200\" align=\"center\" border=\"1\" onclick=\"openEin(\'"+resp.list[k-1].V_DEPTCODE+"\',\'"+resp.list[k-1].V_DEPTNAME+"\')\">"
                        +"<div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-12\">" +
                        "<div class=\"widget\">" +
                        "<div class=\"widget-header\">" +
                        "<div class=\"title\">"+resp.list[k-1].V_DEPTNAME+"</div>" +
                        "</div>" +
                        "<div class=\"widget-body social-stats\">" +
                        "<div class=\"social-icon twitter-bg\"> 已上报 </div>" +
                        "<div class=\"stats-details\">" +
                        "<h6  class=\"text-success\">上报数量</h6>" +
                        "<h3>"+resp.list[k-1].GUIDNUM+"</h3>" +
                        "<h5>已占用预算/总预算</h5>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                        // +"<ul style=\"list-style-type: none;padding: 0px;margin: 0px;\">" +
                        // "<li style=\"list-style-type:square;\">"+resp.list[k-1].GUIDNUM+"</li>" +
                        // "<li style=\"list-style-type:square;\">"+resp.list[k-1].V_DEPTCODE+"</li>"+
                        // "<li style=\"list-style-type:square;\">"+resp.list[k-1].V_DEPTNAME+"</li></ul>"
                        +"</td>";
                    tabledate=tabledate+temp;
                    if(k%6==0){
                        tabledate=tabledate+"</tr>";
                    }
                   k=k+1;
                } tabledate=tabledate+"</table>";
                $('#cpdiv').append(tabledate);
                // Ext.getCmp('zyqpanel').body.update(tabledate);
            }
        }

    })
}

function action1(tab){

    $('#cpdiv').empty();
    var ctable="<table border=\"0\" cellspacing=\"0\" cellpadding=\"50\" style=\"border-collapse:separate; border-spacing:20px;>";
    var temp="";
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_PM_YEAR_GROUPEBY_ZY',
        id:'selProByZy',
        method:'POST',
        async:false,
        params:{}
        ,success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            var length=resp.list.length;
            var rnum=length/6;
            if(length!=0){
                ctable=ctable+"<tr border=\"1\">";
                for(var k=1;k<=length;){
                       temp="<td  width=\"200\" align=\"center\" border=\"0\" onclick=\"openEinZy(\'"+resp.list[k-1].V_SPECIALTY+"\',\'"+resp.list[k-1].V_SPECIALTYNAME+"\')\">"
                           +"<div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-12\">" +
                           "<div class=\"widget\">" +
                           "<div class=\"widget-header\">" +
                           "<div class=\"title\">"+resp.list[k-1].V_SPECIALTYNAME+"</div>" +
                           "</div>" +
                           "<div class=\"widget-body social-stats\">" +
                           "<div class=\"social-icon twitter-bg\"> 已上报 </div>" +
                           "<div class=\"stats-details\">" +
                           "<h6 class=\"text-success\">上报数量</h6>" +
                           "<h3>"+resp.list[k-1].GUIDNUM+"</h3>" +
                           "<h5>已占用预算/总预算</h5>" +
                           "</div>" +
                           "</div>" +
                           "</div>" +
                           "</div>"
                           // +"<ul style=\"list-style-type: none;padding: 0px;margin: 0px;\"><li style=\"list-style-type:square;\">"+resp.list[k-1].GUIDNUM+"</li>" +
                           // "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_SPECIALTY+"</li>"+
                           // "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_SPECIALTYNAME+"</li></ul>"
                                +"</td>";
                    ctable=ctable+temp;
                    if(k%6==0){ctable=ctable+"</tr>";}
                    k=k+1;
                }ctable=ctable+"</table>";
                $('#cpdiv').append(ctable);
                // Ext.getCmp('zypanel').body.update(ctable);
            }
        }

    });
}

function openEin(code,name){
    window.open(AppUrl+'page/PM_030212/index.html?ZYQ=' + code , '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');

}
function openEinZy(code,name){


}