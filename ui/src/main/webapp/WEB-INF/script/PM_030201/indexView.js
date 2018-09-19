$(function () {
    PageLoad();
});

function PageLoad(){
    var rowHtml="";
    $.ajax({
        url: AppUrl + 'PM_03/PM_PROJECT_YEAR_VIEW_SEL',
        type: "post",
        async: false,
        data: {
            V_V_YEAR: '2019',
            V_V_PERCODE: $.cookies.get('v_personcode')
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if(resp.list!=null){
                if(resp.list.length>0){
                    for(var i=0;i<resp.list.length;i++){
                        if( i%6==0) {
                            rowHtml = rowHtml + '<div class="row"> <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"><div class="widget"><div class="widget-header"><div class="title"> ' + resp.list[i].V_ORGNAME +
                                '</div></div><div class="widget-body social-stats">';
                            if (resp.list[i].COMNUM == 0) {
                                rowHtml = rowHtml + '<div class="social-icon gplus-bg">未上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>';
                            } else {
                                rowHtml = rowHtml + '<div class="social-icon twitter-bg"> 已上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>'
                            }
                            rowHtml = rowHtml + resp.list[i].COMNUM + '</h3><h5>' +resp.list[i].USEMONEY/10000+'万元/'+resp.list[i].SUMMONEY/10000+'万元</h5></div></div></div></div>';

                        }else if(i%6==5){
                            rowHtml=rowHtml+'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"><div class="widget"><div class="widget-header"><div class="title"> '+resp.list[i].V_ORGNAME+
                                '</div></div><div class="widget-body social-stats">';
                            if(resp.list[i].COMNUM==0){
                                rowHtml=rowHtml+'<div class="social-icon gplus-bg">未上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>';
                            }else{
                                rowHtml=rowHtml+'<div class="social-icon twitter-bg"> 已上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>'
                            }
                            rowHtml=rowHtml+resp.list[i].COMNUM+ '</h3><h5>'+resp.list[i].USEMONEY/10000+'万元/'+resp.list[i].SUMMONEY/10000+'万元</h5></div></div></div></div></div>';
                        }else {
                            rowHtml=rowHtml+'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"><div class="widget"><div class="widget-header"><div class="title"> '+resp.list[i].V_ORGNAME+
                                '</div></div><div class="widget-body social-stats">';
                            if(resp.list[i].COMNUM==0){
                                rowHtml=rowHtml+'<div class="social-icon gplus-bg">未上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>';
                            }else{
                                rowHtml=rowHtml+'<div class="social-icon twitter-bg"> 已上报</div><div class="stats-details"> <h6 class="text-success">上报数量</h6> <h3>'
                            }
                            rowHtml=rowHtml+resp.list[i].COMNUM+ '</h3><h5>'+resp.list[i].USEMONEY/10000+'万元/'+resp.list[i].SUMMONEY/10000+'万元</h5></div></div></div></div>';
                        }

                        if(resp.list.lenght-1%6==0){
                            rowHtml=rowHtml+'</div>;'
                        }
                    }
                }
                $("#showRow").empty()
                $("#showRow").html(rowHtml);
            }
        }
    });
}
