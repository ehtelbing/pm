/**
 * Created by zjh on 2017/11/9.
 */
Ext.onReady(function () {
    OnStartProcess();
});

function OnStartProcess(){
    Ext.Ajax.request({
        url :AppUrl + 'Activiti/QueryDbBybusinessKey',
        async:false,
        method : 'post',
        params : {
            businessKey :  "26C6EBB9-E430-4887-8FD5-224997D4746B"
        },
        success : function(response) {
            if (Ext.decode(response.responseText).ret == 'OK') {

            } else if (Ext.decode(response.responseText).error == 'ERROR') {

            }
        }
    });
}