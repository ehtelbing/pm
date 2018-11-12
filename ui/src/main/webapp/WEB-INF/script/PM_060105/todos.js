
var childguid="";
Ext.onReady(function(){

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_SELNUM',
        method: 'POST',
        async: false,
        params: {
            V_PERCODE:Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);


            var yangshi = "onmouseover=\"this.style.backgroundPosition='left -40px'\"";
            var yangshi2 = "onmouseout=\"this.style.backgroundPosition='left top'\"";
            for (var i = 0; i < resp.NUM; i++) {
                $('<ul class="tasklist"> <li><span> <input type="button" name="button" id="button" ' +
                    'class="btns" value="确认办理" '+yangshi + ' '+ yangshi2 +'onclick="_banli(\''+resp.RET[i].CHILDGUID+'\')"> ' +
                    '</span><i>' +   //您有' +  resp.NUM+ '条代办任务需要办理...
                    resp.RET[i].E_INSPECT_RESULTE.substring(0,19)+'</i> </li> </ul>' ).appendTo('#t1');
            }

        }
    });
});


function _banli(value){
    location.href = AppUrl + 'page/PM_060105/todosdetail.html?a_childguid='+value;
}