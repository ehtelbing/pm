var i = 0;
var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
var User = function(){

    this.init = function(){

        //模拟上传excel
        $("#uploadEventBtn").unbind("click").bind("click",function(){
            $("#uploadEventFile").click();
        });
        $("#uploadEventFile").bind("change",function(){
            $("#uploadEventPath").attr("value",$("#uploadEventFile").val());
        });

    };
    //点击上传按钮
    this.uploadBtn = function(){
        var uploadEventFile = $("#uploadEventFile").val();
        if(uploadEventFile == ''){
            alert("请选择excel,再上传");
        }else if(uploadEventFile.lastIndexOf(".xls")<0){//可判断以.xls和.xlsx结尾的excel
            alert("只能上传Excel文件");
        }else{
            var url = AppUrl +  'excel/upload';
            var formData = new FormData($('form')[0]);
            user.sendAjaxRequest(url,'POST',formData);
        }
    };

    this.sendAjaxRequest = function(url,type,data){
        $.ajax({
            url : url,
            type : type,
            data : data,
            success : function(useList) {
                for(i = 0; i< useList.length;i++){
                    Ext.Ajax.request({
                        url: AppUrl + 'mwd/PM_04_PROJECT_DATA_ITEM_SET',
                        type: 'ajax',
                        method: 'POST',
                        params:{
                            'V_V_ORGCODE':useList[i].v_ORGCODE,
                            'V_V_DEPTCODE':useList[i].v_DEPTCODE,
                            'V_V_TYPE_CODE':useList[i].v_TYPE_CODE,
                            'V_V_MAJOR_CODE':useList[i].v_MAJOR_CODE,
                            'V_V_PROJECT_CODE':useList[i].v_PROJECT_CODE,
                            'V_V_PROJECT_NAME':useList[i].v_PROJECT_NAME,
                            'V_V_WBS_CODE':useList[i].v_WBS_CODE,
                            'V_V_WBS_NAME':useList[i].v_WBS_NAME,
                            'V_V_CONTENT':useList[i].v_CONTENT,
                            'V_V_BUDGET_MONEY':useList[i].v_BUDGET_MONEY,
                            'V_V_REPAIR_DEPT':useList[i].v_REPAIR_DEPT,
                            'V_V_FZR':useList[i].v_FZR,
                            'V_V_DATE_B':useList[i].v_DATE_B,
                            'V_V_DATE_E':useList[i].v_DATE_E,
                            'V_V_BZ':useList[i].v_BZ,
                            'V_V_FLOW_STATE':useList[i].v_FLOW_STATE,
                            'V_V_INPER':useList[i].v_INPER,
                            'V_V_INTIEM':useList[i].v_INTIEM,
                            'V_V_FALG':useList[i].v_FALG,
                            'V_V_YEAR':useList[i].v_YEAR,
                            'V_V_MONTH':useList[i].v_MONTH,
                            'V_V_GUID':V_V_GUID
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);
                            if (data.success) {
                                if (data.V_INFO == 'SUCCESS') {
                                    //alert(data.V_INFO );

                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: data.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        }
                    })
                }
                window.close();
            },
            error : function() {
                alert( "excel上传失败");
            },
            cache : false,
            contentType : false,
            processData : false
        });
    };
};


var user;
$(function(){
    user = new User();
    user.init();
});