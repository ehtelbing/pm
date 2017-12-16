var homemenu=["WX",//维修计划
    "DQ",//点检管理（缺陷）
    "DG",//定修管理
    "ZX",//专项管理
    "BJ",//备件使用全过程管理
    "NY",//能源管理
    "RH",//润滑管理
    "GD",//固定资产管理
    "JH",//计划及执行情况综合查询
    "DD",//点检定修综合查询
    "WL",//物料消耗综合查询
    "JJ",//技经指标及标准/台账查询
    "CO"]; //预算
var linkset=[];
$(function () {
    loadPageInfo();

});
function OnGoMenu(menutype){
    location.href = "../../page/home/Index.html?menutype="+menutype;
}
function loadPageInfo() {
    for(var i=0;i<homemenu.length;i++){
        $.ajax({
            url: AppUrl + 'basic/PRO_BASE_NEW_MENU_SEL',
            type: 'post',
            async: false,
            data: {
                IS_V_ROLECODE : Ext.util.Cookies.get('v_rolecode'),
                IS_V_SYSTYPE:'1',
                V_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
                V_V_HOME_MENU:homemenu[i]
            },
            dataType: "json",
            traditional: true,
            success: function (resp) {

                linkset[i]=resp.list.length>0?'':null;
                for(var j=0;j<resp.list.length;j++){
                    linkset[i]+='<div class="menuitems"><a href="#" onclick="OnGoMenu()">'+resp.list[j].V_MENUNAME+'</a></div>';
                }
            }
        });
    }

}
/*var linkset=new Array()

 linkset[0]='<div class="menuitems"><a href="#">外委维修计划</a></div>'
 linkset[0]+='<div class="menuitems"><a href="#">年检修计划</a></div>'
 linkset[0]+='<div class="menuitems"><a href="#">月检修计划</a></div>'
 linkset[0]+='<div class="menuitems"><a href="#">周检修计划</a></div>'

 linkset[1]='<div class="menuitems"><a href="#">点检模型</a></div>'
 linkset[1]+='<div class="menuitems"><a href="#">点检管理</a></div>'
 linkset[1]+='<div class="menuitems"><a href="#">缺陷管理</a></div>'
 linkset[1]+='<div class="menuitems"><a href="#">缺陷处理</a></div>'

 linkset[2]='<div class="menuitems"><a href="#">工单管理</a></div>'
 linkset[2]+='<div class="menuitems"><a href="#">大修管理</a></div>'
 linkset[2]+='<div class="menuitems"><a href="#">机具管理</a></div>'
 linkset[2]+='<div class="menuitems"><a href="#">检修模型</a></div>'
 linkset[2]+='<div class="menuitems"><a href="#">检修协力生产写实</a></div>'

 linkset[3]='<div class="menuitems"><a href="#">自动化备件管理</a></div>'
 linkset[3]+='<div class="menuitems"><a href="#">电机管理</a></div>'
 linkset[3]+='<div class="menuitems"><a href="#">润滑管理</a></div>'
 linkset[3]+='<div class="menuitems"><a href="#">设备检查</a></div>'

 linkset[4]='<div class="menuitems"><a href="#">外委维修计划执行查询</a></div>'
 linkset[4]+='<div class="menuitems"><a href="#">年检修计划执行查询</a></div>'
 linkset[4]+='<div class="menuitems"><a href="#">月检修计划执行查询</a></div>'
 linkset[4]+='<div class="menuitems"><a href="#">周检修计划执行查询</a></div>'

 linkset[5]='<div class="menuitems"><a href="#">点检执行查询</a></div>'
 linkset[5]+='<div class="menuitems"><a href="#">工单综合查询</a></div>'
 linkset[5]+='<div class="menuitems"><a href="#">大修分解工单查询</a></div>'

 linkset[6]='<div class="menuitems"><a href="#">单几台物料消耗查询</a></div>'
 linkset[6]+='<div class="menuitems"><a href="#">厂矿/作业区物料消耗查询</a></div>'
 linkset[6]+='<div class="menuitems"><a href="#">同类设备维修消耗查询</a></div>'

 linkset[7]='<div class="menuitems"><a href="#">四大标准</a></div>'
 linkset[7]+='<div class="menuitems"><a href="#">六大台帐</a></div>'
 linkset[7]+='<div class="menuitems"><a href="#">其他标准及台帐</a></div>'*/

var ie4=document.all&&navigator.userAgent.indexOf("Opera")==-1
var ns6=document.getElementById&&!document.all
var ns4=document.layers
function showmenu(e,which){
    if (!document.all&&!document.getElementById&&!document.layers)
        return
    clearhidemenu()
    menuobj=ie4? document.all.popmenu : ns6? document.getElementById("popmenu") : ns4? document.popmenu : ""
    menuobj.thestyle=(ie4||ns6)? menuobj.style : menuobj
    if (ie4||ns6)
        menuobj.innerHTML=which
    else{
        menuobj.document.write('<layer name=gui bgColor=#E6E6E6 width=165 onmouseover="clearhidemenu()" onmouseout="hidemenu()">'+which+'</layer>')
        menuobj.document.close()
    }
    menuobj.contentwidth=(ie4||ns6)? menuobj.offsetWidth : menuobj.document.gui.document.width
    menuobj.contentheight=(ie4||ns6)? menuobj.offsetHeight : menuobj.document.gui.document.height
    eventX=ie4? event.clientX : ns6? e.clientX : e.x
    eventY=ie4? event.clientY : ns6? e.clientY : e.y
//Find out how close the mouse is to the corner of the window
    var rightedge=ie4? document.body.clientWidth-eventX : window.innerWidth-eventX
    var bottomedge=ie4? document.body.clientHeight-eventY : window.innerHeight-eventY
//if the horizontal distance isn't enough to accomodate the width of the context menu
    if (rightedge<menuobj.contentwidth)
//move the horizontal position of the menu to the left by it's width
        menuobj.thestyle.left=ie4? document.body.scrollLeft+eventX-menuobj.contentwidth : ns6? window.pageXOffset+eventX-menuobj.contentwidth : eventX-menuobj.contentwidth
    else
//position the horizontal position of the menu where the mouse was clicked
        menuobj.thestyle.left=ie4? document.body.scrollLeft+eventX : ns6? window.pageXOffset+eventX : eventX
//same concept with the vertical position
    if (bottomedge<menuobj.contentheight)
        menuobj.thestyle.top=ie4? document.body.scrollTop+eventY-menuobj.contentheight : ns6? window.pageYOffset+eventY-menuobj.contentheight : eventY-menuobj.contentheight
    else
        menuobj.thestyle.top=ie4? document.body.scrollTop+event.clientY : ns6? window.pageYOffset+eventY : eventY
    menuobj.thestyle.visibility="visible"
    return false
}
function contains_ns6(a, b) {
//Determines if 1 element in contained in another- by Brainjar.com
    while (b.parentNode)
        if ((b = b.parentNode) == a)
            return true;
    return false;
}
function hidemenu(){
    if (window.menuobj)
        menuobj.thestyle.visibility=(ie4||ns6)? "hidden" : "hide"
}
function dynamichide(e){
    if (ie4&&!menuobj.contains(e.toElement))
        hidemenu()
    else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
        hidemenu()
}
function delayhidemenu(){
    if (ie4||ns6||ns4)
        delayhide=setTimeout("hidemenu()",500)
}
function clearhidemenu(){
    if (window.delayhide)
        clearTimeout(delayhide)
}
function highlightmenu(e,state){
    if (document.all)
        source_el=event.srcElement
    else if (document.getElementById)
        source_el=e.target
    if (source_el.className=="menuitems"){
        source_el.id=(state=="on")? "mouseoverstyle" : ""
    }
    else{
        while(source_el.id!="popmenu"){
            source_el=document.getElementById? source_el.parentNode : source_el.parentElement
            if (source_el.className=="menuitems"){
                source_el.id=(state=="on")? "mouseoverstyle" : ""
            }
        }
    }
}
if (ie4||ns6)
    document.onclick=hidemenu// JavaScript Document