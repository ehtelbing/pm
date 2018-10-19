Ext.onReady(function() {
    Ext.QuickTips.init();

    var fileForm = Ext.create('Ext.form.Panel', {
        id: 'fileForm',
        width:510,
        border:0,
        fileUpload: true,
        //height: 100,
        frame: true,
                    autoHeight: true,
        items: [
            {
                xtype: 'fileuploadfield', id: 'file', emptyText: '维修记录选择文件',width: 500,
                fieldLabel: '选择文件', name: 'file',
                buttonText: '浏览',
                buttonCfg: {
                    iconCls: 'upload-icon'
                }
            }],
        buttons:[
            {
                id: 'select',
                //icon: imgpath + '/arrow_in.png',
                text: '导入',
                width: 50,
                style: {margin: '0px 10px 0 0'},
                handler: function () {
                    gridOperationImp(" AppUrl + \'DL/importWXJL\'");   //导入
                }
            }, {
                text: '取消',
                handler: function() {

                }
            }],
        buttonAlign:'center'

    });


    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'center',
        width:'600',
        height:'500',
        layout:'border',
        frame: true,
        border:false,
        style: {margin: '10px 10px 0 0'},
        items:[fileForm]
    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel]//treepanel,
    });

});
function gridOperationImp(path, fileForm) {

    var fileForm = Ext.getCmp('fileForm');
    var formFile = Ext.getCmp('file').getValue();
    //var type = Ext.getCmp('type').getValue();

    if (fileForm.isValid()) {

        //格式校验
        var strs = formFile.split("\\")[2].split(".");
        if (strs[1].toLowerCase() != "xls" && strs[1].toLowerCase() != "xlsx") {
            Ext.Msg.alert("操作提示：", "请导入Excel文件");
            return;
        }

        console.log(type);



        fileForm.getForm().submit({
            url: AppUrl + 'DL/importWXJL',
            waitMsg: '正在保存...',
            success: function (form, action) {
                var result = Ext.decode(action.response.responseText);
                Ext.Msg.alert(result.message, "");

            },
            failure: function (form, action) {
                var result = Ext.decode(action.response.responseText);
                console.log(result);
                Ext.Msg.alert("错误提示", result.message);
            }
        });
    }

}

