
var CKCODE=""
if(location.href.split('?')!=undefined){
    CKCODE=Ext.urlDecode(location.href.split('?')[1]).CKCODE;
}
var sign=0;
var list=[ ];
var cpanel=Ext.create('Ext.panel.Panel',{
    id:'cpanel',
    region:'center',
    frame:true,
    border:false,
    layout:'vbox',
    padding:'10px 0px 5px 20px',

    // defaultStyle:{
    //   margin:'5px 0 2px 100px'
    // },
    items:[
        // {
        // xtype:'panel',
        // id:'p1',
        // width: 450,
        // height:50,
        // layout:'column',
        // items:[
            {
            xtype: 'textfield',
            id: 'equsitecode',
            fieldLabel: '设备位置编码',
            labelAlign: 'right',
            labelWidth: 150,
            width: 250,
            style: 'padding:5px 0px 2px 5px'
        },
        // {
        //    xtype:'button',
        //     id:'selBtn',
        //     width:60,
        //     text:'查询',
        //     style:'padding:5px 10px 2px 100px',
        //     handler:selEquSiteList
        // },
    //     ]
    // },{
    //         xtype:'panel',
    //         id:'p2',
    //         width: 450,
    //         height:50,
    //         layout:'column',
    //         items:[
        {
            xtype: 'textfield',
            id: 'equsitename',
            fieldLabel: '设备位置名称',
            labelAlign: 'right',
            labelWidth: 150,
            width: 250,
            style: 'padding:5px 0px 2px 5px'
        }
            // ,{
            //     xtype:'button',
            //     id:'selBtn2',
            //     width:60,
            //     text:'查询',
            //     style:'padding:5px 10px 2px 100px',
            //     handler:selEquSiteList
            // }
    //         ]
    // }
        , {
            xtype: 'panel',
            id: 'p1',
            width: 450,
            height: 30,
            bodyStyle: 'background:#dfe8f6;padding-color:#dfe8f6;',
            border: false,
            margin:'5px 0 2px 75px',
            layout: 'column',
            items: [
                {
                    xtype: 'button',
                    id: 'selBtn2',
                    width: 100,
                    text: '查询',
                    style: 'padding:5px 10px 2px 10px',
                    handler: selEquSiteList
                },
                {
                    xtype: 'button',
                    id: 'saveBtn',
                    width: 100,
                    text: '保存/修改',
                    style: 'padding:5px 10px 2px 10px',
                    handler: saveEquSiteList
                }, {
                    xtype: 'button',
                    id: 'returnBtn',
                    width: 100,
                    text: '确认返回',
                    style: 'padding:5px 10px 2px 10px',
                    handler: retEquSiteList
                }
            ]
    //     ]
    //
    }]
});


Ext.onReady(function(){

    var windowP=Ext.create('Ext.panel.Panel',{
        id:'windowP',
        region:'center',
        layout:'border',
        // width: 434,
        // height: 238,
        items:[cpanel]
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        width: 434,
        height: 238,
        // items:[windowP]
        items:[cpanel]
    });

});
//查找
function selEquSiteList(){
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_EQU_SITE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE: CKCODE,
            V_V_EQUSITE: Ext.getCmp('equsitecode').getValue(),
            V_V_EQUSITENAME: Ext.getCmp('equsitename').getValue()
        },
        success:function(response){
            var resp=Ext.decode(response.responseText);
            if(resp.list.length!=0){
                if(sign==1){
                    Ext.getCmp('equsitecode').setValue(resp.list[0].V_EQUSITE);
                    Ext.getCmp('equsitename').setValue(resp.list[0].V_EQUSITENAME);
                    sign=0;
                    alert('该名称或编码已存在');
                }
                else{
                    Ext.getCmp('equsitecode').setValue(resp.list[0].V_EQUSITE);
                    Ext.getCmp('equsitename').setValue(resp.list[0].V_EQUSITENAME);
                    sign=0;
                }

            }
            else{
                sign=2;
            }
        }
        }
    )
}
//修改保存
function saveEquSiteList(){
    if (Ext.getCmp('equsitecode').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置编码不能为空！');
        sign=0;
        return false;
    }
    if (Ext.getCmp('equsitename').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置名称不能为空！');
        sign=0;
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_EQU_SITE_SET',
        method: 'POST',
        params: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_EQUSITE: Ext.getCmp('equsitecode').getValue(),
            V_V_EQUSITENAME: Ext.getCmp('equsitename').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_CURSOR == '成功') {
                Ext.MessageBox.alert('提示信息', '保存成功！');
                selEquSiteList();
                sign=0;
            } else {
                Ext.MessageBox.alert('提示信息', '保存失败！');
                sign=0;
            }
        }
    });
}

function retEquSiteList(){

    sign=1;
    if(sign==1){
        selEquSiteList();
    }
    if (Ext.getCmp('equsitecode').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置编码不能为空！');
        return false;
    }
    if (Ext.getCmp('equsitename').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置名称不能为空！');
        return false;
    }

   if(sign==2){
       Ext.MessageBox.show({
           title:'提示',
           msg: '此设备位置不存在，是否需要添加',
           buttons: Ext.MessageBox.YESNO,
           fn: function(btn){
               if(btn=="yes"){
                   saveEquSiteList();
                   list.push(Ext.getCmp('equsitecode').getValue());
                   list.push(Ext.getCmp('equsitename').getValue());
                   window.opener.getReturnEquSite(list);
                   window.close();
               }
               if(btn=="no"){
                   this.close();
                   return false;
               }
           }
       });
   }else if(sign==0){
       list.push(Ext.getCmp('equsitecode').getValue());
       list.push(Ext.getCmp('equsitename').getValue());
       window.opener.getReturnEquSite(list);
       window.close();
   }


}