/**
 * Created by zjh on 2017/11/9.
 */
Ext.onReady(function () {
    OnStartProcess();
});

function OnStartProcess(){
    Ext.Ajax.request({
        url :AppUrl + 'Activiti/StratProcess',
        async:false,
        method : 'post',
        params : {
            parName : ["originator","flow_businesskey","idea"],
            parVal : ['qkcyg',"26C6EBB9-E430-4887-8FD5-224997D4747B","请审批"],
            processKey : 'WorkOrder003',
            businessKey : "26C6EBB9-E430-4887-8FD5-224997D4747B"
        },
        success : function(response) {
            if (Ext.decode(response.responseText).ret == 'OK') {
                Ext.Msg.alert('提示','该流程发起成功！');
            } else if (Ext.decode(response.responseText).error == 'ERROR') {
                Ext.Msg.alert('提示','该流程发起失败！');
            }
        }
    });
}