
function spanfun(grid,row,col,type,num){

    var tds="";
    switch (type) {
        case 'row':
            tds = Ext.get(grid.view.getNode(row)).query('td');
            Ext.get(tds[col]).set({rowspan: num});
            Ext.get(Ext.get(tds[col])).setStyle({'vertical-align': 'middle'});
            for (i = row + 1; i < row + num; i++) {
                Ext.get(Ext.get(grid.view.getNode(i)).query('td')[col]).destroy();
            }
            break;
        case 'col':
            tds = Ext.get(grid.view.getNode(row)).query('td');
            Ext.get(tds[col]).set({colspan: num});
            Ext.get(Ext.get(tds[col])).setStyle({'vertical-align': 'middle'});
            for (i = row + 1; i < row + num; i++) {
                Ext.get(tds[col+1]).destroy();
            }
            break;
    }
}

(function(){
    //设置命名空间
    var CodeSTD = window.CodeSTD || {};

    window.CodeSTD = CodeSTD;

    /**
     * 创建Form表单
     * @author hrb
     * @param config Object
     *  <p>url:form的Action，提交的后台地址</p>
     *  <p>method:使用POST还是GET提交表单</p>
     *  <p>params:参数 K-V</p>
     * @return Form
     */
    CodeSTD.form = function(config){
        config = config || {};

        var url = config.url,
            method = config.method || 'GET',
            params = config.params || {};

        var form = document.createElement('form');
        form.action = url;
        form.method = method;
        form.target = "_blank";

        for(var param in params){
            var value = params[param],
                input = document.createElement('input');

            input.type = 'hidden';
            input.name = param;
            input.value = value;

            form.appendChild(input);
        }

        return form;
    }


})()
