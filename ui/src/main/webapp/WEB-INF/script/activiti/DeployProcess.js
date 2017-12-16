Ext.onReady(function () {

    var	form = Ext.create('Ext.form.Panel', {

        title: '流程发布',
        width: 500,
        height:140,
        bodyPadding: 10,
        frame: true,
        defaults:{
            labelWidth:80
        },
        items: [
            {
                xtype: 'textfield',
                name: 'deployName',
                fieldLabel: '发布名称',
                allowBlank: false
            },
            {
                xtype: 'filefield',
                name: 'processFile',
                id: 'processFile',
                fieldLabel: '流程文件名',
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择文件...'
            }],

        buttons: [{
            text: '发布',
            handler: function() {
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url:AppUrl + 'Activiti/ModelDeployProcess',
                        waitMsg: '请等待...',
                        success: function(fp, o) {

                        },
                        failure: function(form, action) {
                            if(action.result.ret=="部署流程成功"){
                                Ext.Msg.alert("消息","发布成功");
                            }
                        }
                    });
                }
            }
        }]
    });

    Ext.create('Ext.container.Viewport', {

        layout: 'auto',

        items: [form  ]

    })


})