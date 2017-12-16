Ext.define('com.data.Manage', {

    allDelete: function () {


    },
    /**
    * 数据模型改变(添加,修改,删除)
    * @param params(String{}) 参数对象(包含一组参数)
    * @param type(String) 业务处理的类型(add、delete、update)
    * @param reload(function)  传入一个方法名,用来重新加载数据(一般传查询的方法名)
    * @param window(Object) 弹出窗口的对象名称(在添加与修改时用来关闭窗口,删除时不用传)
    * @return 返回当前对象的处理方法(成功或失败)
    *   
    */
    modelChange: function (params, type, reload, window) {

        var obj = Ext.Ajax.request({

            url: APP + '/ModelChange',
            method: 'POST',
            params: params,
            success: function (response, options) {

                if (type != null) {

                    switch (type) {
                        case 'add': Ext.Msg.alert("提示", "添加成功"); break;
                        case 'delete': Ext.Msg.alert("提示", "删除成功"); break;
                        case 'update': Ext.Msg.alert("提示", "修改成功"); break;
                        case 'save': Ext.Msg.alert("提示", "保存成功"); break;

                        default: Ext.Msg.alert("提示", "处理成功"); break;
                    }
                }
                if (reload != null) { reload(); }
                if (window != null) { window.hide(); }
            }
        });

        return obj;
    }


})