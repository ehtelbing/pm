
var tabledate="";
var zyqpanel=Ext.create('Ext.panel.Panel',{
   id:'zyqpanel',
    layout:'column',
    frame:true,
    border:true,
    defaults:{
        style:'padding: 60px 60px 60px 60px'
    },
    padding: '50px 20px 20px 50px',
    width:1917,
    height:650,
    autoScroll:true,
    items:[ ]

});
var zypanel=Ext.create('Ext.panel.Panel',{
    id:'zypanel',
    layout:'column',
    frame:true,
    border:true,
    defaults:{
        style:'padding: 60px 60px 60px 60px'
    },
    padding: '50px 20px 20px 50px',
    width:1917,
    height:650,
    autoScroll:true,
    renderTo: document.body,
    items:[ ]
});
var tabPanel=Ext.create('Ext.tab.Panel',{
    id:'tabPanel',
    frame:true,
    border:false,
    activeTab:0,
    enableTabScroll:true,
    defaults:{
        autoScroll:true
    },
    items:[
        {
            id: 'tab1',
            title: '专业',
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
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        id:'main',
        items:[tabPanel]
    });
    actionO();
});

function actionO(tab){


    var ctable="<table border=\"1\" cellspacing=\"0\" cellpadding=\"50\" style=\"border-collapse:separate; border-spacing:20px;>";
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
                        +"<ul style=\"list-style-type: none;padding: 0px;margin: 0px;\">" +
                        "<li style=\"list-style-type:square;\">"+resp.list[k-1].GUIDNUM+"</li>" +
                        "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_DEPTCODE+"</li>"+
                        "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_DEPTNAME+"</li></ul>"
                        +"</td>";
                    tabledate=tabledate+temp;
                    if(k%6==0){

                        tabledate=tabledate+"</tr>";
                    }
                   k=k+1;
                } tabledate=tabledate+"</table>";
                Ext.getCmp('zyqpanel').body.update(tabledate);
            }
        }

    })
}

function action1(tab){

    var ctable="<table border=\"1\" cellspacing=\"0\" cellpadding=\"50\" style=\"border-collapse:separate; border-spacing:20px;\">";
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
                       temp="<td width=\"200\" align=\"center\" border=\"1\" onclick=\"openEinZy(\'"+resp.list[k-1].V_SPECIALTY+"\',\'"+resp.list[k-1].V_SPECIALTYNAME+"\')\">"
                                +"<ul style=\"list-style-type: none;padding: 0px;margin: 0px;\"><li style=\"list-style-type:square;\">"+resp.list[k-1].GUIDNUM+"</li>" +
                           "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_SPECIALTY+"</li>"+
                           "<li  style=\"list-style-type:square;\">"+resp.list[k-1].V_SPECIALTYNAME+"</li></ul>"
                                +"</td>";
                    ctable=ctable+temp;
                    if(k%6==0){ctable=ctable+"</tr>";}
                    k=k+1;
                }ctable=ctable+"</table>";
                Ext.getCmp('zypanel').body.update(ctable);
            }
        }

    });
}

function openEin(code,name){
    window.open(AppUrl+'page/PM_030212/index.html?ZYQ=' + code , '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');

}
function openEinZy(code,name){

}