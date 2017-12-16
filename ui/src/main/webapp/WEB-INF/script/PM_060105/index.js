
$(function () {
    $.ajax({
        type : 'POST',
        url: AppUrl + 'hp/PM_06_DJ_DATA_TIMER_SEL',
        dataType : 'json',
        data : {
            'V_V_DJPER' : Ext.util.Cookies.get('v_personcode')
        },
        success : function(data) {
            if (data.success) {
                var formList = data.list;
                var length = 0;
                var yangshi = "onmouseover=\"this.style.backgroundPosition='left -40px'\"";

                var yangshi2 = "onmouseout=\"this.style.backgroundPosition='left top'\""
                for (var i = 0; i < formList.length; i++) {
                    $('<ul class="tasklist"> <li><span> <input type="button" name="button" id="button" class="btns" value="确认办理" '+yangshi + ' '+ yangshi2 +'onclick="_banli(\''+formList[i].V_TIMER_GUID+'\')"> </span>您有' +formList[i].NUM+ '条代办任务需要办理... <i>' + formList[i].V_TIMER_TIME.substring(0,19)+'</i> </li> </ul>' ).appendTo('#t1');
                }
            } else {
                alert(data.message);
            }
        }
    });
});

function _banli(V_TIMER_GUID){
   /* var w=screen.availWidth-10;
    var h=screen.availHeight-30;
    var objwin = window.open(AppUrl + 'page/PM_060106/index.html?V_TIMER_GUID='+V_TIMER_GUID,"win","fullscreen=yes,toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,width=" + w + ",height=" + h + ",top=0,left=0",true);
   */ var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_060106/index.html?V_TIMER_GUID='+V_TIMER_GUID, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');

}


