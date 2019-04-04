
var fzrPer = '';
// var qxEqu = '';
var cmItems = [];
var dateItems = [];
var ganttdata = [];

var startd = '0';
var endd = '0';
var gmxGuid = '';
var allTime = 0;
var itemsPerpage = 50;

var getck = "";
var getzyq = "";
var yearguid = "";
var flag="";

var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';

var yearstate="";
var yearid="";
var YEARUPGUID="";
if (Ext.urlDecode(location.href.split('?')[1]) != null) {
    getck = Ext.urlDecode(location.href.split('?')[1]).CK;
    getzyq = Ext.urlDecode(location.href.split('?')[1]).ZYQ;
    yearguid = Ext.urlDecode(location.href.split('?')[1]).YEARGUID;
    flag=Ext.urlDecode(location.href.split('?')[1]).FLAG;
    YEARUPGUID=Ext.urlDecode(location.href.split('?')[1]).UPGUID;
}
var date = new Date();
//--年
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//计划类别
var jhlbStore = Ext.create("Ext.data.Store", {
    storeId: 'jhlbStore',
    fields: ['V_UID', 'V_XH', 'V_LBMC', 'V_BZ', 'V_BS', 'V_DLHS', 'V_FYLX', 'V_XWLX', 'V_LBJC'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_JHLB_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//生产类别
var sclbStore = Ext.create("Ext.data.Store", {
    storeId: 'sclbStore',
    fields: ['V_UID', 'V_XH', 'V_SCLB', 'V_BZ'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_SCLB_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//施工方式
var sgfsStore = Ext.create("Ext.data.Store", {
    storeId: 'sgfsStore',
    fields: ['ID', 'V_BH', 'V_SGFS', 'V_LX'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_SGFS_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
// 厂矿
var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//作业区
var zyqStore =  Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sblxStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备名称
var sbmcStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbmcStore',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/pro_get_deptequ_per',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//维修类型
var wxlxStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'wxlxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PM_DX/REPAIRTYPE'
        }
    }
});
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'zyStore',
    fields: ['V_GUID', 'V_ZYMC', 'V_ZYJC', 'V_LX', 'V_ORDER'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//根据作业区，人员，专业查询所有设备
var sbGridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbGridStore',
    fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//检修单位
var repairDeptStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'repairDeptStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME', 'V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME',
        'I_ORDERID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/fixdept_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
// 负责人
var fzPerStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'fzPerStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
    // ,
    // listeners: {
    //     load: function (store, records, success, eOpts) {
    //         if( store.getAt(0)==undefined){
    //             Ext.getCmp('fzPer').select(''); return;
    //         }else{
    //             processKey = store.getProxy().getReader().rawData.RET;
    //             V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
    //             V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
    //             Ext.getCmp('fzPer').select(store.first());
    //         }
    //
    //     }
    //
    // }
});
var fileStore = Ext.create('Ext.data.Store', {
    id: 'fileStore',
    autoLoad: false,
    fields:['ID','V_GUID','V_FILEGUID','V_FILENAME','V_INPERCODE','V_INPERNAME','V_TYPE','V_INTIME','V_FILETYPE','FNAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl+'dxfile/PM_03_PLAN_PROJECT_FILE_SEL2',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//检修类别
var jxtypestore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'jxtypestore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_YEAR_REPARI_SELECT',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET'
        }
    }
});
var qxAddStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxAddStore',
    fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var qxGridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxGridStore',
    fields: ['YEAR_GUID', 'DEFECT_GUID','EQUCODE', 'EQUNAME', 'DEFECT_TYPE', 'DEFECT_CONTENT','DEFECT_DATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var qxEquStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxEquStore',
    fields: ['V_PLANGUID', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE',
        'V_EQUNAME', 'V_EQUSITECODE', 'V_EQUSITE', 'V_SAP_EQUCODE', 'V_SIZE', 'V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_EQU_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var dqxgridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'dqxgridStore',
    fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var mxAllStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxAllStore',
    fields: ['I_ID', 'V_BZ', 'V_DEPTCODE', 'V_EQUCODE', 'V_EQUCODE_CHILD', 'V_EQUTYPE', 'V_GX_CODE',
        'V_HOUR', 'V_IN_DATE', 'V_IN_PER', 'V_MXBB_NUM', 'V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_REPAIRMAJOR_CODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_1917_JXMX_SELBY_MOREEQU',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var mxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxStore',
    fields: ['YEAR_GUID', 'EQU_CODE', 'JX_MODCODE', 'JX_MODNAME', 'JX_MODBBH', 'JX_MODBZ','REMARK'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_JXMOD_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxgxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE', 'V_JXGX_NR', 'V_ORDER',
        'V_PERNUM', 'V_PERTIME', 'V_JXBZ', 'V_JXBZ_VALUE_DOWN', 'V_JXBZ_VALUE_UP', 'V_JJ_NAME', 'V_GJ_NAME', 'V_GZ_NAME', 'V_WL_NAME',
        'V_WORK_NAME', 'V_AQCS_NAME', 'V_JSYQ_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE', 'V_JXGX_NR', 'V_ORDER',
        'V_PERNUM', 'V_PERTIME', 'V_JXBZ', 'V_JXBZ_VALUE_DOWN', 'V_JXBZ_VALUE_UP', 'V_JJ_NAME', 'V_GJ_NAME', 'V_GZ_NAME', 'V_WL_NAME',
        'V_WORK_NAME', 'V_AQCS_NAME', 'V_JSYQ_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxgzStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgzStore',
    fields: ['V_JXGX_CODE', 'V_PERCODE_DE', 'V_PERNAME_DE', 'V_TS', 'V_DE', 'V_PERTYPE_DE', 'V_PERCODE',
        'V_PERNAME', 'I_ID', 'V_PERNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_WORKDE_GXSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxwlStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxwlStore',
    fields: ['V_JXGX_CODE', 'V_KFNAME', 'V_WLCODE', 'V_WLSM', 'V_GGXH', 'V_JLDW', 'V_PRICE',
        'V_USE_NUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxjjStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxjjStore',
    fields: ['V_JXGX_CODE', 'V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS', 'V_JJ_DE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_JJ_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxgjStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgjStore',
    fields: ['V_JXGX_CODE', 'V_GJ_CODE', 'V_GJ_NAME', 'V_GJ_TYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_GJ_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxaqcsStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxaqcsStore',
    fields: ['V_JXGX_CODE', 'V_AQCS_CODE', 'V_AQCS_NAME', 'V_AQCS_BBH', 'V_AQ_ZYSX', 'V_AQCS_DETAIL', 'V_LINK_TIME',
        'V_LINK_PERSON'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_AQCS_DATA_V',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxjsyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxjsyqStore',
    fields: ['V_JXGX_CODE', 'V_JSYQ_CODE', 'V_JSYQ_NAME', 'V_BJ_IMG', 'V_PART_NUMBER', 'V_PART_NAME', 'V_PART_CODE',
        'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE_DOWN', 'V_VALUE_UP', 'V_REPLACE_CYC', 'V_WEIGHT', 'V_IMGCODE', 'V_CONTENT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_JSYQ_DATA_V',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
    fields: ['ID', 'V_GUID', 'V_FILEGUID', 'V_FILENAME', 'V_INPERCODE', 'V_INPERNAME', 'V_TYPE', 'V_INTIME', 'V_FILETYPE', 'FNAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'dxfile/PM_03_PLAN_PROJECT_FILE_SEL2',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_GUID: yearguid,
            V_V_FILEGUID: '',
            V_V_FILENAME: '',
            V_V_TYPE: '' //type
        }
    }
});

var northPanel = Ext.create('Ext.form.Panel', {
    region:'north',
    frame: false,
    border: false,
    layout: 'column',
    id: 'northPanel',
    titleAlign: 'center',
    height: 40,
    width:'100%',
    bodyCls:'border_wid',
    bodyStyle: 'background:rgb(229,236,240);padding:2px;',
    defaults: {labelAlign: 'center'},
    collapsible: false,
    tbar: [
        {
            xtype: 'button',
            text: '检修模型',
            margin: '0 0 5 0',
            icon: dxImgPath+'/jxmx.png',
            iconCls: 'buy-button',
            handler: btnAdd_jxmx
        },
        {xtype: 'tbseparator', bodyCls:'border_wid',margin: '0 8 5 8'},
        {
            xtype: 'button',
            text: '添加缺陷',
            margin: '0 0 5 0',
            bodyStyle: 'float:right;',
            iconCls: 'buy-button',
            icon: dxImgPath+'/tjsb.png',
            handler: btnAdd_tjqx
        },
        {xtype: 'tbseparator',  bodyCls:'border_wid', margin: '0 8 5 8'},
        {
            xtype: 'button',
            text: '临时保存',
            margin: '0 0 5 0',
            iconCls: 'buy-button',
            icon: dxImgPath+'/lsbc.png',
            handler: OnButtonSaveClick //btnSaveProject
        }
        ,
        {xtype: 'tbseparator',  bodyCls:'border_wid', margin: '8 8 5 8'},
        {
            xtype: 'button',
            text: '附件',
            margin: '0 0 5 0',
            // iconCls:'Tablegear',
            iconCls: 'buy-button',
            icon:dxImgPath + '/fj.png',
            handler: btnAdd_file
        },
        {xtype: 'tbseparator',  bodyCls:'border_wid', margin: '8 8 5 8'},
        {xtype: 'label', id: 'label11', width: 55, text: '附件数量',margin: '5 0 5 0'}, {
            xtype: 'label',
            id: 'fjsl',
            width: 30,
            margin: '0 0 5 0'
        },{xtype: 'tbseparator',  bodyCls:'border_wid', margin: '8 8 5 8'}
        ,{
            xtype: 'button',
            id: 'startFlow',
            text: '上报',
            margin: '0 0 5 0',
            // iconCls: 'Report',
            iconCls: 'buy-button',
            icon: imgpath + '/accordion_collapse.png',
            handler: btnFlowStart
        }
    ]
});
/*项目信息*/
var LTpanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    width: '100%',
    height:'27%',
    frame: false,
    border: false,
    layout: 'column',
    title:'项目信息',
    autoScroll:true,
    defaults: {labelAlign: 'right', margin: '15 10 10 10'},
    // bodyStyle:'border-top:3px solid rgb(2,29,132);',//border-bottom:3px solid rgb(2,29,132)',
    bodyCls:'borderff',
    // bodyStyle: "background:#f2f2f2",
    collapsible: false,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '项目名称',
            id: 'ProjectName',
            labelWidth: 80,
            width: 250
            // ,margin: '5 5 5 0'
        },{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '单位名称',
            editable: false,
            labelWidth: 80,
            width: 250,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            // margin: '5 5 5 0',
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划作业区',
            // margin: '5 5 5 0',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: "wxlx",
            store: wxlxStore,
            editable: true,
            queryMode: 'local',
            fieldLabel: '维修类型',
            // margin: '5 5 5 0',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            labelWidth: 80,
            width: 250,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: true,
            queryMode: 'local',
            fieldLabel: '专 业',
            // margin: '5 5 5 0',
            displayField: 'V_ZYMC',
            valueField: 'V_GUID',
            width: 250,
            labelWidth: 80,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: "jhlb",
            store: jhlbStore,
            editable: true,
            queryMode: 'local',
            fieldLabel: '计划类别',
            // margin: '5 5 5 0',
            displayField: 'V_LBMC',
            valueField: 'V_UID',
            width: 250,
            labelWidth: 80,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: "sclb",
            store: sclbStore,
            editable: true,
            queryMode: 'local',
            fieldLabel: '生产类别',
            // margin: '5 5 5 0',
            displayField: 'V_SCLB',
            valueField: 'V_UID',
            labelWidth: 80,
            width: 250,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: "sgfs",
            store: sgfsStore,
            editable: true,
            queryMode: 'local',
            fieldLabel: '施工方式',
            // margin: '5 5 5 0',
            displayField: 'V_SGFS',
            valueField: 'V_BH',
            width: 250,
            labelWidth: 80,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: 'jxtype',
            fieldLabel: '检修类别',
            editable: true,
            // style : 'margin:5px 0px 5px 5px',
            labelWidth: 80,
            width: 250,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            value: '',
            store: jxtypestore,
            queryMode: 'local'
        },{
            xtype: 'combo',
            id: "sfxj",
            store: [[0, '是'], [1, '否']],
            editable: true,
            queryMode: 'local',
            value: 0,
            fieldLabel: '是否修旧',
            // margin: '5 5 5 0',
            labelWidth: 80,
            width: 250,
            labelAlign: 'right'
        }
    ]
});


/*检修内容*/
var ToolpanelB = Ext.create('Ext.form.Panel', {
    region: 'south',
    frame: false,
    border: false,
    layout: 'column',
    width: '100%',
    height:'50%',
    autoScroll:true,
    renderTo: Ext.getBody(),
    title:'检修内容',
    // bodyStyle: 'background:#f2f2f2 !important;',
    // bodyStyle:'border-bottom:3px solid rgb(2,29,132)',//border-top:3px solid rgb(2,29,132);
    bodyCls:'borderff',
    defaults: {labelAlign: 'right', margin: '15 10 10 10'},
    collapsible: false,
    items: [
        {
            xtype: 'textareafield',
            baseCls:'textareaStyle',
            id: 'content',
            grow: true,
            name: 'message',
            fieldLabel: '检修内容',
            anchor: '100%',
            // margin: '3 3 3 20',
            labelWidth: 60,
            width: 850,
            height: 160
        }
    ]
});
/*检修信息*/
var ToolpanelC = Ext.create('Ext.form.Panel', {
    region: 'center',
    frame: false,
    border: false,
    layout: 'column',
    height: '23%',
    autoScroll:true,
    width: '100%',
    renderTo: Ext.getBody(),
    title:'检修信息',
    // bodyStyle:'border-left:3px solid rgb(2,29,132);border-right:3px solid rgb(2,29,132)',
    // bodyCls:'borderff',
    defaults: {labelAlign: 'right', margin: '15 10 10 10'},
    collapsible: false,
    items: [
        {
            xtype: 'combo',
            id: 'repairDept',
            store: repairDeptStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '检修单位',
            displayField: 'V_DEPTREPAIRNAME',
            valueField: 'V_DEPTREPAIRCODE',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: 'fzPer',
            store: fzPerStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '负责人',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: 'nf',
            fieldLabel: '年份',
            editable: false,
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 160,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: yearStore,
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'yf',
            fieldLabel: '月份',
            editable: false,
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 160,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: monthStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sblx',
            fieldLabel: '设备类型',
            editable: false,
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            value: '',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            store: sblxStore,
            queryMode: 'local',
            listConfig: {
                minWidth: 400
            }
        },
        {
            xtype: 'combo',
            id: 'sbmc',
            fieldLabel: '设备名称',
            editable: false,
            labelAlign: 'right',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            matchFieldWidth: false,
            value: '',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            store: sbmcStore,
            queryMode: 'local',
            listConfig: {
                minWidth: 400
            }
        },{
            xtype: 'numberfield',
            id: 'jhgs',
            fieldLabel: '计划工时',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 160,
            labelAlign: 'right',
            value: 0,
            minValue:0
        },

        {
            xtype: 'numberfield',
            id: 'jhts',
            fieldLabel: '计划天数',
            labelWidth: 60,
            width: 160,
            // margin: '5 5 5 10',
            labelAlign: 'right',
            value: 0,
            minValue:0
        } ,
        {
            xtype: 'datefield',
            id: 'btime',
            editable: false,
            fieldLabel: '开工时间',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            labelAlign: 'right',
            format: 'Y/m',
            value: new Date()
        },
        {
            xtype: 'datefield',
            id: 'etime',
            editable: false,
            fieldLabel: '竣工时间',
            // margin: '5 5 5 10',
            labelWidth: 60,
            width: 230,
            labelAlign: 'right',
            format: 'Y/m',
            value: new Date()
        }
    ]
});
/*查看更多缺陷*/
var TOPGIRDRIGHTTtool = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    // bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: { bodyCls:'borderff',style:'background-color:rgb(229,236,240)',labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '缺陷明细',
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal'},
        // { xtype: 'tbfill' ,style:'background-color:red'},
        {
            xtype: 'button',
            text: '查看更多',
            bodyStyle:'float:right;',
            icon:dxImgPath+'/search.png',
            handler: OnLookMoreDefect
        }
    ]
});
/*缺陷表格*/
var TOPGIRDRIGHTtable = Ext.create('Ext.grid.Panel', {
    id: 'qxgrid',
    store: qxGridStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    columnLines: true,
    border: false,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text:'缺陷guid',width:100,dataIndex:'DEFECT_GUID',align:'center',hidden:true},
        {text: '设备名称', width: 140, dataIndex: 'EQUNAME', align: 'center', renderer: atleft},
        {text: '缺陷类型', width: 120, dataIndex: 'DEFECT_TYPE', align: 'center', renderer: atleft},
        {text: '缺陷内容', width: 300, dataIndex: 'DEFECT_CONTENT', align: 'center', renderer: atleft},
        {text: '缺陷日期', width: 140, dataIndex: 'DEFECT_DATE', align: 'center', renderer: atleft},
        {text: '删除', width: 100, align: 'center',maxWidth:100, renderer: DelDefect}
    ]
});
var TOPGIRDRIGHT = Ext.create('Ext.panel.Panel', {
    border:true,
    frame: false,
    bodyStyle:'border-right:3px solid rgb(2,29,132);border-top:3px solid rgb(2,29,132);border-bottom:3px solid rgb(2,29,132);',//border-left:3px solid rgb(2,29,132);
    bodyCls:'borderff',
    height:'50%',
    layout:'border',
    id:'TOPGIRDRIGHT',
    region: 'center',
    width: '100%',
    renderTo: Ext.getBody(),
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHTTtool, TOPGIRDRIGHTtable]
});
var ToolpanelD = Ext.create('Ext.panel.Panel', {
    region: 'center',
    width: '100%',
    frame: false,
    border: false,
    // bodyStyle:'border-left:3px solid rgb(2,29,132);border-right:3px solid rgb(2,29,132)',
    // layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHT]
});
/*左上布局*/
// var ToolpanelA=Ext.create('Ext.panel.Panel',{
//     id:'ToolpanelA',
//     frame:false,
//     border:true,
//     region:'center',
//     bodyStyle:'border-top:3px solid rgb(2,29,132);border-bottom:3px solid rgb(2,29,132)',
//     bodyCls:'borderff',
//     height: '100%',
//     width:'50%',
//     renderTo: Ext.getBody(),
//     layout:'border',
//     padding: '35 20 35 20',
//     defaults: {labelAlign: 'right', margin: '10 10 10 10'},
//     items:[
//         /*项目信息*/
//         {
//             xtype: 'textfield',
//             fieldLabel: '项目名称',
//             id: 'ProjectName',
//             labelWidth: 80,
//             width: 250
//             // margin: '5 5 5 0'
//         },{
//             id: 'ck',
//             xtype: 'combo',
//             store: ckstore,
//             fieldLabel: '单位名称',
//             // editable: false,
//             labelWidth: 80,
//             width: 250,
//             displayField: 'V_DEPTNAME',
//             valueField: 'V_DEPTCODE',
//             queryMode: 'local',
//             // margin: '5 5 5 0',
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: "zyq",
//             store: zyqStore,
//             // editable: false,
//             queryMode: 'local',
//             fieldLabel: '计划作业区',
//             // margin: '5 5 5 0',
//             displayField: 'V_DEPTNAME',
//             valueField: 'V_DEPTCODE',
//             labelWidth: 80,
//             width: 250,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: "wxlx",
//             store: wxlxStore,
//             // editable: false,
//             queryMode: 'local',
//             fieldLabel: '维修类型',
//             // margin: '5 5 5 0',
//             displayField: 'V_BASENAME',
//             valueField: 'V_BASECODE',
//             labelWidth: 80,
//             width: 250,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: "zy",
//             store: zyStore,
//             // editable: false,
//             queryMode: 'local',
//             fieldLabel: '专 业',
//             // margin: '5 5 5 0',
//             displayField: 'V_ZYMC',
//             valueField: 'V_GUID',
//             width: 250,
//             labelWidth: 80,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: "jhlb",
//             store: jhlbStore,
//             // editable: false,
//             queryMode: 'local',
//             fieldLabel: '计划类别',
//             // margin: '5 5 5 0',
//             displayField: 'V_LBMC',
//             valueField: 'V_UID',
//             width: 250,
//             labelWidth: 80,
//             labelAlign: 'right'
//         }, {
//             xtype: 'combo',
//             id: "sclb",
//             store: sclbStore,
//             editable: false,
//             queryMode: 'local',
//             fieldLabel: '生产类别',
//             // margin: '5 5 5 0',
//             displayField: 'V_SCLB',
//             valueField: 'V_UID',
//             labelWidth: 80,
//             width: 250,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: "sgfs",
//             store: sgfsStore,
//             editable: false,
//             queryMode: 'local',
//             fieldLabel: '施工方式',
//             // margin: '5 5 5 0',
//             displayField: 'V_SGFS',
//             valueField: 'V_BH',
//             width: 250,
//             labelWidth: 80,
//             labelAlign: 'right'
//         }, {
//             xtype: 'combo',
//             id: 'jxtype',
//             fieldLabel: '检修类别',
//             editable: false,
//             // style : 'margin:5px 0px 5px 5px',
//             labelWidth: 80,
//             width: 250,
//             displayField: 'V_BASENAME',
//             valueField: 'V_BASECODE',
//             value: '',
//             store: jxtypestore,
//             queryMode: 'local'
//         },{
//             xtype: 'combo',
//             id: "sfxj",
//             store: [[0, '是'], [1, '否']],
//             editable: false,
//             queryMode: 'local',
//             value: 0,
//             fieldLabel: '是否修旧',
//             // margin: '5 5 5 0',
//             labelWidth: 80,
//             width: 250,
//             labelAlign: 'right'
//         }
//         ,/*检修信息*/
//         {
//             xtype: 'combo',
//             id: 'repairDept',
//             store: repairDeptStore,
//             editable: false,
//             queryMode: 'local',
//             fieldLabel: '检修单位',
//             displayField: 'V_DEPTREPAIRNAME',
//             valueField: 'V_DEPTREPAIRCODE',
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 230,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: 'fzPer',
//             store: fzPerStore,
//             editable: false,
//             queryMode: 'local',
//             fieldLabel: '负责人',
//             displayField: 'V_PERSONNAME',
//             valueField: 'V_PERSONCODE',
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 230,
//             labelAlign: 'right'
//         },
//         {
//             xtype: 'combo',
//             id: 'nf',
//             fieldLabel: '年份',
//             editable: false,
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 160,
//             displayField: 'displayField',
//             valueField: 'valueField',
//             value: '',
//             store: yearStore,
//             queryMode: 'local'
//         }, {
//             xtype: 'combo',
//             id: 'yf',
//             fieldLabel: '月份',
//             editable: false,
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 160,
//             displayField: 'displayField',
//             valueField: 'valueField',
//             value: '',
//             store: monthStore,
//             queryMode: 'local'
//         },
//         {
//             xtype: 'combo',
//             id: 'sblx',
//             fieldLabel: '设备类型',
//             editable: false,
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 230,
//             value: '',
//             displayField: 'V_EQUTYPENAME',
//             valueField: 'V_EQUTYPECODE',
//             store: sblxStore,
//             queryMode: 'local',
//             listConfig: {
//                 minWidth: 400
//             }
//         },
//         {
//             xtype: 'combo',
//             id: 'sbmc',
//             fieldLabel: '设备名称',
//             editable: false,
//             labelAlign: 'right',
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 230,
//             matchFieldWidth: false,
//             value: '',
//             displayField: 'V_EQUNAME',
//             valueField: 'V_EQUCODE',
//             store: sbmcStore,
//             queryMode: 'local',
//             listConfig: {
//                 minWidth: 400
//             }
//         },
//         {
//             xtype: 'numberfield',
//             id: 'jhgs',
//             fieldLabel: '计划工时',
//             margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 160,
//             labelAlign: 'right',
//             value: 0,
//             minValue:0
//         },
//         {
//             xtype: 'numberfield',
//             id: 'jhts',
//             fieldLabel: '计划天数',
//             labelWidth: 60,
//             width: 160,
//             // margin: '5 5 5 10',
//             labelAlign: 'right',
//             value: 0,
//             minValue:0
//         } ,
//         {
//             xtype: 'datefield',
//             id: 'btime',
//             editable: false,
//             fieldLabel: '开工时间',
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 160,
//             labelAlign: 'right',
//             format: 'Y/m/d',
//             value: new Date()
//         },
//         {
//             xtype: 'datefield',
//             id: 'etime',
//             editable: false,
//             fieldLabel: '竣工时间',
//             // margin: '5 5 5 10',
//             labelWidth: 60,
//             width: 160,
//             labelAlign: 'right',
//             format: 'Y/m/d',
//             value: new Date()
//         }
//         ,
//         /*检修内容*/
//         {
//             xtype: 'textareafield',
//             baseCls:'textareaStyle',
//             id: 'content',
//             grow: true,
//             name: 'message',
//             fieldLabel: '检修内容',
//             anchor: '100%',
//             // margin: '3 3 3 20',
//             labelWidth: 60,
//             width: 850,
//             height: 160
//         }
//
//     ]
// });
/*左上布局*/
var Leftdivtop = Ext.create('Ext.panel.Panel', {
    id:'Leftdivtop',
    layout:'border',
    region: 'west',
    border: true,
    frame: false,
    height: '100%',
    width:'50%',
    renderTo: Ext.getBody(),
    // bodyStyle:'border-left:3px solid rgb(2,29,132);border-right:3px solid rgb(2,29,132)',
    bodyStyle:'border-left:3px solid rgb(2,29,132);border-right:3px solid rgb(2,29,132);border-top:3px solid rgb(2,29,132);border-bottom:3px solid rgb(2,29,132)',
    bodyCls:'borderff',
    // items: [LTpanel, ToolpanelB, ToolpanelC, ToolpanelD]
    items: [LTpanel, ToolpanelC, ToolpanelB]
    // items:[ToolpanelA]
});
var jxmxtab=Ext.create("Ext.toolbar.Toolbar", {
    id: 'dtoolbar',
    border: true,
    height: 27,
    width: 1090,
    items:['相关检修模型',
        {xtype: 'tbfill',style:'background-color:red'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle: 'float:right;',
            icon:dxImgPath+'/search.png',
            listeners: {click: LookMoreModel}
        }]
});
//检修模型
var jxmx1 = Ext.create('Ext.grid.Panel', {
    id: 'mxgrid',
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    store: mxStore,
    columnLines: true,
    border: false,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称', width: 200, dataIndex: 'JX_MODCODE', align: 'center', renderer: atleft,hidden:true},
        {text: '模型名称', width: 200, dataIndex: 'JX_MODNAME', align: 'center', renderer: atleft},
        {text: '版本号', width: 140, dataIndex: 'JX_MODBBH', align: 'center', renderer: atleft},
        {text: '备注', width: 300, dataIndex: 'JX_MODBZ', align: 'center', renderer: atleft},
        {
            text: '查看明细', renderer: function (value, metaData, record) {
                return '<a href="#" onclick="MXclick(\'' + record.data.JX_MODCODE + ',' + record.data.JX_MODNAME + ',' + record.data.JX_MODBBH + '\')">' + '查看详细' + '</a>'
            }
        },
        {text: '删除', width: 100,maxWidth:100, align: 'center', renderer: DelModel}
    ]

});
var jxmx2 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background-color:rgb(229,236,240);background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '相关检修模型',
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal'},
        {
            xtype: 'button',
            text: '查看更多',
            bodyStyle: 'float:right;',
            // iconCls: 'Magnifierzoomin',
            icon:dxImgPath+'/search.png',
            listeners: {click: LookMoreModel}
        }
    ]
});
var jxmxCom=Ext.create('Ext.panel.Panel',{
    id:'jxmxCom',
    region:'north',
    frame:false,
    border:true,
    bodyStyle:'border-right:3px solid rgb(2,29,132);border-top:3px solid rgb(2,29,132);',//border-left:3px solid rgb(2,29,132);
    bodyCls:'borderff',
    height:'50%',
    width:'100%',
    layout:'border',
    items:[jxmx2,jxmx1]
});
//物料明细按钮
var wlmxcd = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    bodyStyle: 'background:#f2f2f2',
    height: 32,
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}
    ]
});

var rightDiv=Ext.create('Ext.panel.Panel',{
    id:'rightDiv',
    region:'center',
    layout:'border',
    width:'50%',
    border:false,
    items:[jxmxCom,TOPGIRDRIGHT]
});
// var Leftdiv = Ext.create('Ext.panel.Panel', {
//     layout: 'border',
//     // region: 'west',
//     region:'center',
//     width: '50%',
//     border: false,
//     // bodyStyle:'border:3px solid rgb(2,29,132)',
//     heitht:'100%',
//     items: [Leftdivtop,rightDiv],
//     renderTo: Ext.getBody()
// });
var centerPanel = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region: 'center',
    border: false,
    width:'100%',
    // items: [Leftdiv, Rightdiv],
    // items:[Leftdiv],
    items: [Leftdivtop,rightDiv],
    // items: [ToolpanelA,rightDiv],
    renderTo: Ext.getBody()
});

//单设备缺陷添加
var tjqxpanel = Ext.create("Ext.toolbar.Toolbar", {
    id:'tjqxpanel',
    frame: true,
    border:false,
    width: '100%',
    // height:30,
    // bodyCls:'borderff',
    bodyCls:'border_wid',
    items: [{
        xtype: 'button',
        text: '确认返回',
        // margin: '2 5 2 5',
        bodyStyle: 'float:center;',
        // iconCls: 'Tablesave',
        iconCls: 'buy-button',
        icon:dxImgPath+'/back.png',
        listeners: {click: SaveQx}
    },
        {
            xtype: 'button',
            text: '关闭',
            // margin: '2 5 2 5',
            bodyStyle: 'float:center;',
            iconCls: 'buy-button',
            icon:dxImgPath+'/close.png',
            // iconCls: 'Tabledelete',
            listeners: {click: winQxClose}
        }]
});
//     Ext.create('Ext.panel.Panel', {
//     region: 'north',
//     layout: 'column',
//     frame: false,
//     border:true,
//     wdith: '100%',
//     bodyCls:'border_wid',
//     items: [{
//         xtype: 'button',
//         text: '确认返回',
//         margin: '5 5 5 5',
//         bodyStyle: 'float:center;',
//         // iconCls: 'Tablesave',
//         iconCls: 'buy-button',
//         icon:dxImgPath+'/back.png',
//         listeners: {click: SaveQx}
//     },
//         {
//             xtype: 'button',
//             text: '关闭',
//             margin: '5 5 5 5',
//             bodyStyle: 'float:center;',
//             iconCls: 'buy-button',
//             icon:dxImgPath+'/close.png',
//             // iconCls: 'Tabledelete',
//             listeners: {click: winQxClose}
//         }]
// });
var tjqxgrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id: 'qxAdd',
    store: qxAddStore,
    split: true,
    width: '100%',
    margin: '0px',
    columnLines: true,
    border: true,
    selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text:'设备code',width:140,dataIndex:'V_EQUCODE',hidden:true},
        {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
        {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center', renderer: atleft},
        {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft},
        {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center', renderer: atleft}
    ],
    tbar:[tjqxpanel]
});
var btnAdd_tjqx = Ext.create('Ext.window.Window', {
    id: 'btnAdd_tjqx',
    width: 850,
    height: 400,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    // items: [tjqxpanel, tjqxgrid]
    items: [tjqxgrid]
});
//多设备缺陷添加
var dtjqxgrid = Ext.create('Ext.grid.Panel', {
    split: true,
    id: 'qxEqu',
    store: qxEquStore,
    region: 'west',
    width: 400,
    columnLines: true,
    border: false,
    columns: [
        {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
        {text: '功能位置', width: 260, dataIndex: 'V_EQUSITENAME', align: 'center', renderer: atleft}
    ], listeners: {itemclick: QueryQxByEqu}

});
var tjqxgrid1 = Ext.create('Ext.grid.Panel', {
    id: 'dqxgrid',
    store: dqxgridStore,
    region: "center",
    split: true,
    width: 540,
    margin: '0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
        {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center', renderer: atleft},
        {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft},
        {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center', renderer: atleft}
    ], listeners: {itemclick: OnBtnAddQx}
});
var dbtnAdd_tjqx = Ext.create('Ext.window.Window', {
    id: 'dbtnAdd_tjqx',
    width: 1100,
    height: 600,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [dtjqxgrid, tjqxgrid1]
});
//检修模型确认返回
var mxpanle = Ext.create("Ext.toolbar.Toolbar", {
    id:'mxpanle',
    frame: true,
    border:false,
    width: '100%',
    bodyCls:'border_wid',
    items: [{
        xtype: 'button',
        text: '确认返回',
        // margin: '2 5 2 5',
        bodyStyle: 'float:center;',
        iconCls: 'buy-button',
        icon:dxImgPath+'/back.png',
        listeners: {click: SaveMx}
    },
        {
            xtype: 'button',
            text: '关闭',
            bodyStyle: 'float:center;',
            iconCls: 'buy-button',
            icon:dxImgPath+'/close.png',
            listeners: {click: winMxClose}
        }]
});
// Ext.create('Ext.panel.Panel', {
// region: 'north',
// layout: 'column',
// frame: false,
// border:false,
// wdith: '100%',
// items: [{
//     xtype: 'button',
//     text: '确认返回',
//     margin: '5 5 5 5',
//     bodyStyle: 'float:center;',
//     // iconCls: 'Tablesave',
//     listeners: {click: SaveMx}
// },
//     {
//         xtype: 'button',
//         text: '关闭',
//         margin: '5 5 5 5',
//         bodyStyle: 'float:center;',
//         // iconCls: 'Tabledelete',
//         listeners: {click: winMxClose}
//     }]
// });
//检修模型表单1
var mxAllGrid = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width: '100%',
    margin: '0px',
    height: 150,
    id: 'mxAllGrid',
    store: mxAllStore,
    columnLines: true,
    border: false,
    selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称', width: 200, dataIndex: 'V_MX_NAME', align: 'center', renderer: atleft},
        {text: '模型编码', width: 200, dataIndex: 'V_MX_CODE', align: 'center', renderer: atleft,hidden:true},
        {text: '版本号', width: 100, dataIndex: 'V_MXBB_NUM', align: 'center', renderer: atleft},
        {text: '备注', width: 300, dataIndex: 'V_BZ', align: 'center', renderer: atleft},
        {
            text: '查看明细', renderer: function (value, metaData, record) {
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MX_CODE + ',' + record.data.V_MX_NAME + ',' + record.data.V_MXBB_NUM + '\')">' + '查看详细' + '</a>'
            }
        }
    ],
    tbar:[mxpanle],
    listeners: {itemclick: QueryGx}
});
//检修模型表单2
var jxgxGrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id: 'jxgxGrid',
    store: jxgxStore,
    split: true,
    width: '100%',
    margin: '0px',
    height: 150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称', width: 200, dataIndex: 'V_JXGX_NAME', align: 'center', renderer: atleft},
        {text: '工序内容', width: 200, dataIndex: 'V_JXGX_NR', align: 'center', renderer: atleft},
        {text: '工种', width: 200, dataIndex: 'V_GZ_NAME', align: 'center', renderer: atleft},
        {text: '工具', width: 200, dataIndex: 'V_GJ_NAME', align: 'center', renderer: atleft},
        {text: '机具', width: 200, dataIndex: 'V_JJ_NAME', align: 'center', renderer: atleft},
        {text: '物料', width: 200, dataIndex: 'V_WL_NAME', align: 'center', renderer: atleft},
        {text: '安全措施', width: 200, dataIndex: 'V_AQCS_NAME', align: 'center', renderer: atleft},
        {text: '技术要求', width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center', renderer: atleft}
    ]
});
//检修模型弹出窗口
var btnAdd_jxmx = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jxmx',
    width: 1000,
    height: 600,
    title: '检修模型',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    // items: [mxpanle, mxAllGrid, jxgxGrid]
    items: [mxAllGrid, jxgxGrid]
});
//大修计划检修模型明细

var gxgrid = Ext.create('Ext.grid.Panel', {
    region: 'west',
    id: 'gxgrid',
    store: gxStore,
    split: true,
    width: 600,
    height: 200,
    margin: '0px',
    columnLines: true,
    border: true,
    layout: 'column',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称', width: 200, dataIndex: 'V_JXGX_NAME', align: 'center', renderer: atleft},
        {text: '工序内容', width: 300, dataIndex: 'V_JXGX_NR', align: 'center', renderer: atleft}
    ], listeners: {itemclick: QueryGxMx}
});
//检修人员表单
var jxrytool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        //'检修人员',
        {xtype: 'label', text: '检修人员', style: 'font-weight:bolder;'},
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        }*/
    ]
});
//检修人员表格
var jxgzgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxgzgrid',
    store: jxgzStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '人员编码', width: 160, dataIndex: 'V_PERCODE', align: 'center', renderer: atleft},
        {text: '人员姓名', width: 160, dataIndex: 'V_PERNAME', align: 'center', renderer: atleft},
        {text: '工种名称', width: 160, dataIndex: 'V_PERNAME_DE', align: 'center', renderer: atleft},
        {text: '工种类型', width: 160, dataIndex: 'V_PERTYPE_DE', align: 'center', renderer: atleft},
        {text: '定额', width: 160, dataIndex: 'V_DE', align: 'center', renderer: atleft},
        {text: '台时', width: 160, dataIndex: 'V_TS', align: 'center', renderer: atleft}
    ]
});
//检修工种
var jxgz = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    items: [jxrytool1, jxgzgrid]
});
//检修机具表单
var jxjjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        // '检修机具',
        {xtype: 'label', text: '检修机具', style: 'font-weight:bolder;'},
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修机具表格
var jxjjgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxjjgrid',
    store: jxjjStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '机具名称', width: 160, dataIndex: 'V_JJ_NAME', align: 'center', renderer: atleft},
        {text: '机具类型', width: 160, dataIndex: 'V_JJ_TYPE', align: 'center', renderer: atleft},
        {text: '使用台时', width: 160, dataIndex: 'V_JJ_TS', align: 'center', renderer: atright},
        {text: '定额', width: 160, dataIndex: 'V_JJ_DE', align: 'center', renderer: atright}
    ]
});
//检修机具
var jxjj = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    items: [jxjjtool1, jxjjgrid]//
});
//检修工具表单
var jxgjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        //'检修工具',
        {xtype: 'label', text: '检修工具', style: 'font-weight:bolder;'},
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修工具表格
var jxgjgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxgjgrid',
    store: jxgjStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工具名称', width: 160, dataIndex: 'V_GJ_NAME', align: 'center', renderer: atleft},
        {text: '工具类型', width: 160, dataIndex: 'V_GJ_TYPE', align: 'center', renderer: atleft}
    ]
});
//检修工具
var jxjj1 = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    items: [jxgjtool1, jxgjgrid]//
});
//检修物料表单
var jxwl1tool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        //'检修物料',
        {xtype: 'label', text: '检修物料', style: 'font-weight:bolder;'},
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修物料表格
var jxwlgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxwlgrid',
    store: jxwlStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '物料编码', width: 200, dataIndex: 'V_WLCODE', align: 'center', renderer: atleft},
        {text: '物料名称', width: 200, dataIndex: 'V_WLSM', align: 'center', renderer: atleft},
        {text: '规格型号', width: 200, dataIndex: 'V_GGXH', align: 'center', renderer: atleft},
        {text: '单价', width: 200, dataIndex: 'V_PRICE', align: 'center', renderer: atright},
        {text: '数量', width: 200, dataIndex: 'V_USE_NUM', align: 'center', renderer: atright}
    ]
});
//检修物料
var jxwl = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    items: [jxwl1tool1, jxwlgrid]//
});
//检修安全措施表单
var jxaqcstool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修安全措施',
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修安全措施表格
var jxaqcsgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxaqcsgrid',
    store: jxaqcsStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '安全措施名称', width: 200, dataIndex: 'V_AQCS_NAME', align: 'center', renderer: atleft},
        {text: '安全措施版本号', width: 200, dataIndex: 'V_AQCS_BBH', align: 'center', renderer: atleft}
    ]
});
//检修安全措施
var jxaqcs = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    // items: [jxaqcstool1,jxaqcsgrid]//
    items: [jxaqcsgrid]
});
//检修技术要求表单
var jxjsyqtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height: 32,
    width: '100%',
    margin: '0',
    bodyStyle: 'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修技术要求',
        {xtype: 'tbfill'},
        {xtype: 'tbseparator', baseCls: 'x-toolbar-separator-horizontal', margin: '8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修技术要求表格
var jxjsyqgrid = Ext.create('Ext.grid.Panel', {
    id: 'jxjsyqgrid',
    store: jxjsyqStore,
    region: "center",
    split: true,
    width: '100%',
    margin: '0px',
    height: 170,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '技术要求名称', width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center', renderer: atleft},
        {text: '零件编号', width: 200, dataIndex: 'V_PART_NUMBER', align: 'center', renderer: atleft},
        {text: '零件名称', width: 200, dataIndex: 'V_PART_NAME', align: 'center', renderer: atleft},
        {text: '零件编码', width: 200, dataIndex: 'V_PART_CODE', align: 'center', renderer: atleft},
        {text: '允许值（上限）', width: 200, dataIndex: 'V_VALUE_UP', align: 'center', renderer: atleft},
        {text: '允许值（下限）', width: 200, dataIndex: 'V_VALUE_DOWN', align: 'center', renderer: atleft},
        {text: '备注', width: 200, dataIndex: 'V_CONTENT', align: 'center', renderer: atleft}
    ]
});
//检修技术要求
var jxjsyq = Ext.create('Ext.panel.Panel', {
    region: 'north',
    border: false,
    frame: false,
    width: '100%',
    renderTo: Ext.getBody(),
    //items: [jxjsyqtool1,jxjsyqgrid]//
    items: [jxjsyqgrid]
});
//大修计划右边布局
var dxjhsbright = Ext.create('Ext.panel.Panel', {
    region: 'east',
    border: false,
    frame: false,
    width: 1100,
    renderTo: Ext.getBody(),
    items: [jxgz, jxwl, jxjj, jxjj1]
});
// //----------模型附件类型查询
// var ftypeStore=Ext.create('Ext.data.Store',{
//     id:'ftypeStore',
//     autoLoad:false,
//     fields:['ID','FNAME','FTYPE'],
//     proxy:{
//         type:'ajax',
//         url:AppUrl+'dxfile/FILETYPE_GETLIST',
//         actionMethods:{
//             read:'POST'
//         },
//         reader:{
//             type:'json',
//             root:'list'
//         }
//     }
// });
// Ext.data.StoreManager.lookup('ftypeStore').load({
//     params:{
//         SIGN:'M'
//     }
// });
// Ext.data.StoreManager.lookup('ftypeStore').on('load',function(){
//     Ext.ComponentManager.get('fjtype').store.insert(0,{
//         'ID':'%',
//         'FNAME':'全部'
//     });
//     Ext.getCmp('fjtype').select(Ext.data.StoreManager.lookup('ftypeStore').data.getAt(0));
// });
var mxfileStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxfileStore',
    fields: ['V_FILEGUID', 'V_FILENAME', 'V_TYPE', 'FNAME', 'V_INPERCODE', 'V_INPERNAME', 'V_MODE_GUID', 'V_INTIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MODEL_FILE_SEL_DXF',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//----附件查询表格
var mxfilegrid = Ext.create('Ext.grid.Panel', {
    id: 'mxfilegrid',
    height: 340,
    width: '100%',
    region: 'center',
    autoScroll: true,
    columnLines: true,
    store: mxfileStore,
    style: 'text-align:center;',
    columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '文件编码', dataIndex: 'V_FILEGUID', align: 'center', width: 50, hidden: true},
        {text: '文件名称', dataIndex: 'V_FILENAME', align: 'center', width: 160},
        {text: '类型名称', dataIndex: 'FNAME', align: 'center', width: 160},
        {
            text: '上传时间', dataIndex: 'V_INTIME', align: 'center', width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return value.toString().substring(0, 10);
            }
        },
        {text: '附件类型', dataIndex: 'FNAME', align: 'center', width: 100}
        //,{text:'操作',dataIndex:'V_FILEGUID',align:'center',width:150,renderer:operation}
    ]
});

//大修计划检修模型明细窗口tabpanel
var tebpanel = Ext.create('Ext.tab.Panel', {
    id: 'tabpanel',
    region: 'center',
    enableTabScroll: true,
    defaults: {autoScroll: true},
    items: [{id: 'tab1', title: '检修模型明细', layout: 'border', frame: false, border: false, items: [gxgrid, dxjhsbright]},
        {id: 'tab2', title: '检修技术标准', items: [jxjsyq]},
        {id: 'tab3', title: '检修安全措施', items: [jxaqcs]}
        , {id: 'tab4', title: '检修附件明细', items: [mxfilegrid]}]

});
//大修计划检修模型明细
var MXclickW = Ext.create('Ext.window.Window', {
    id: 'MXclickW',
    width: 1700,
    height: 800,
    title: '大修计划检修模型明细',
    modal: true,
    frame: false,
    border:false,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    // items: [gxgrid,dxjhsbright]
    items: [tebpanel]
});
var fsf = Ext.widget({
    xtype: 'form',
    bodyCls:'border_wid',
    id: 'fieldSetForm',
    border:false,
    // title: date.getFullYear()+'年鞍千有限责任公司年计划编制',
    title: date.getFullYear()+'年--计划编制',
    titleAlign:'center'

});
Ext.onReady(function () {
    Ext.QuickTips.init();
    //border布局 最多可将页面划分为5个区域
    //使用Viewport容器 可自适应页面窗口大小
    //一个页面只可有一个viewport
    new Ext.Viewport({
        title: "border layout",
        layout: "border",
        border: "false",
        items: [{
            xtype:'panel',
            region: 'north',
            border:false,
            padding:'0 0 2 0',
            width:35,
            height:37,
            style:'background-color:rgb(229,236,240)',
            items:[fsf]
        },northPanel, centerPanel]
    });

    QueryPageLoad();

    var tbarStyle={
        'background-color':'rgb(45,60,137)',
        "height":"35px"
    };
    if(Ext.get('toolbar-1050')==null){
        Ext.get('toolbar-1051').setStyle(tbarStyle);
        Ext.get('tbtext-1052').setStyle('color','white');
    }else
    if(Ext.get('toolbar-1051')==null){
        Ext.get('toolbar-1052').setStyle(tbarStyle);
        Ext.get('tbtext-1053').setStyle('color','white');
    }else
    if(Ext.get('toolbar-1052')==null){
        Ext.get('toolbar-1053').setStyle(tbarStyle);
        Ext.get('tbtext-1054').setStyle('color','white');
    }else{
        Ext.get('toolbar-1050').setStyle(tbarStyle);
        Ext.get('tbtext-1051').setStyle('color','white');
    }

    if(Ext.get('toolbar-1022')==null){
        Ext.get('toolbar-1023').setStyle(tbarStyle);
        Ext.get('tbtext-1024').setStyle('color','white');
    }else if(Ext.get('toolbar-1023')==null){
        Ext.get('toolbar-1024').setStyle(tbarStyle);
        Ext.get('tbtext-1025').setStyle('color','white');
    }else if(Ext.get('toolbar-1024')==null){
        Ext.get('toolbar-1025').setStyle(tbarStyle);
        Ext.get('tbtext-1026').setStyle('color','white');
    }else if(Ext.get('toolbar-1025')==null){
        Ext.get('toolbar-1026').setStyle(tbarStyle);
        Ext.get('tbtext-1027').setStyle('color','white');
    }else{
        Ext.get('toolbar-1022').setStyle(tbarStyle);
        Ext.get('tbtext-1023').setStyle('color','white');
    }





    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {

        Ext.data.StoreManager.lookup('repairDeptStore').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
        Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
    });

    //检修类型
    Ext.data.StoreManager.lookup('jxtypestore').load();
    var workStore = Ext.create('Ext.data.Store', {
        id: 'workStore',
        pageSize: itemsPerpage,
        autoLoad: false,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME', 'WORKORDERNUM', 'PLANTIME', 'FACTTIME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_EDUNOTOWORKORDER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });
    var workgrid = Ext.create('Ext.grid.Panel', {
        id: 'workgrid',
        columnLines: true,
        width: '100%',
        height: 405,
        autoScroll: true,
        region: 'center',
        store: workStore,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            }, {
                text: '工单GUID(隐藏)',
                dataIndex: 'V_ORDERGUID',
                align: 'center',
                hidden: true
            }, {
                text: '工单号',
                dataIndex: 'V_ORDERID',
                width: 100,
                align: 'center'
            }, {
                text: '子工单数量',
                dataIndex: 'WORKORDERNUM',
                width: 90,
                align: 'center'
            }, {
                text: '工单描述',
                dataIndex: 'V_SHORT_TXT',
                width: 300,
                align: 'left'
            }, {
                text: '设备编号（隐藏）',
                dataIndex: 'V_EQUIP_NO',
                align: 'center',
                hidden: true
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUIP_NAME',
                width: 100,
                align: 'center'
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITENAME',
                width: 200,
                align: 'center'
            }, {
                text: '备件消耗',
                dataIndex: 'V_SPARE',
                width: 250,
                align: 'center'
            }, {
                text: '委托单位',
                dataIndex: 'V_DEPTNAME',
                width: 100,
                align: 'center'
            }, {
                text: '委托人',
                dataIndex: 'V_PERSONNAME',
                width: 100,
                align: 'center'
            }, {
                text: '委托时间',
                dataIndex: 'D_ENTER_DATE',
                width: 140,
                align: 'center'
            }, {
                text: '检修单位',
                dataIndex: 'V_DEPTNAMEREPARIR',
                width: 150,
                align: 'center'
            }, {
                text: '工单类型描述',
                dataIndex: 'V_ORDER_TYP_TXT',
                width: 100,
                align: 'center'
            }, {
                text: '工单状态',
                dataIndex: 'V_STATENAME',
                width: 65,
                align: 'center'
            }, {
                text: '计划工时',
                dataIndex: 'PLANTIME',
                width: 100,
                align: 'center'
            }, {
                text: '实际工时',
                dataIndex: 'FACTTIME',
                width: 100,
                align: 'center'
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            id: 'page',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: workStore
        }
        ]

    });
    ///-----update 2018-10-19
    var workWindow = Ext.create('Ext.window.Window', {
        id: 'workWindow',
        closeAction: 'hide',
        width: 870,
        height: 450,
        autoScroll: true,
        title: '设备检修历史',
        items: [workgrid]
    });
});

//加载添加页面
function QueryPageLoad() {

    QueryDefect();
    QueryModel();
    // QueryMxInfAll();//模型物料详情
    // QueryGauntt();//网络施工图

    // QueryCGrid();
    // 厂矿
    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
            Ext.data.StoreManager.lookup('fzPerStore').load({
                params:{
                    V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_REPAIRCODE: '',
                    V_V_FLOWTYPE: 'YearPlan',
                    V_V_FLOW_STEP: 'start',
                    V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_SPECIALTY: '',
                    V_V_WHERE: ''
                }
            });
    });
    Ext.data.StoreManager.lookup('sblxStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
        }
    });
    Ext.data.StoreManager.lookup('repairDeptStore').load({
        params: {
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
        }
    });
    // Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
    //         Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(1));
    // });
    Ext.data.StoreManager.lookup('sbmcStore').load({
        params: {
            v_v_personcode: Ext.util.Cookies.get('v_personcode'),
            v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
            v_v_equtypecode: Ext.getCmp('sblx').getValue()
        }
    });
    //设备名称加载监听
    // Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
    //     if (flag == 'new') {
    //         Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(1));
    //     }
    // });
    if (flag == 'new') {
        Ext.getCmp('ck').select(getck);
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(1));
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(1));
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(1));
        Ext.getCmp('nf').select(date.getFullYear());
        Ext.getCmp('yf').select(date.getMonth() + 1);
        Ext.getCmp("jhlb").select(Ext.data.StoreManager.lookup('jhlbStore').getAt(0));
        Ext.getCmp("sclb").select(Ext.data.StoreManager.lookup('sclbStore').getAt(0));
        Ext.getCmp("sgfs").select(Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
        Ext.getCmp("wxlx").select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
        Ext.getCmp("wxlx").select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
        Ext.getCmp("jxtype").select(Ext.data.StoreManager.lookup('jxtypestore').getAt(0));
        Ext.getCmp("jxtype").select(Ext.data.StoreManager.lookup('jxtypestore').getAt(0));
        Ext.getCmp('fzPer').select(Ext.data.StoreManager.lookup('fzPerStore').getAt(0));
    }
    if(flag=='update'){
        getYearDate();
    }

    //专业加载监听
    // Ext.data.StoreManager.lookup('zyStore').on('load', function () {
    //     if (flag == 'new') {
    //         Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    //     }
    // });
    //计划类型
    Ext.data.StoreManager.lookup('jhlbStore').on('load', function () {
            Ext.getCmp("jhlb").select(Ext.data.StoreManager.lookup('jhlbStore').getAt(0));
    });

    //生产类别
    Ext.data.StoreManager.lookup('sclbStore').on('load', function () {
        if (flag == 'new') {
            Ext.getCmp("sclb").select(Ext.data.StoreManager.lookup('sclbStore').getAt(0));
        }
    });
    //施工方式
    Ext.data.StoreManager.lookup('sgfsStore').on('load', function () {
        if (flag == 'new') {
            Ext.getCmp("sgfs").select(Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
        }
    });
    //维修类型
    Ext.data.StoreManager.lookup('wxlxStore').on('load', function () {
        if (flag == 'new') {
            Ext.getCmp("wxlx").select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
        }
    });

    Ext.data.StoreManager.lookup('jxtypestore').on('load', function () {
        if (flag == 'new') {
            Ext.getCmp("jxtype").select(Ext.data.StoreManager.lookup('jxtypestore').getAt(0));
        }
    });


    Ext.data.StoreManager.lookup('fzPerStore').on('load',function(){
        if (flag == 'new') {
            Ext.getCmp('fzPer').select(Ext.data.StoreManager.lookup('fzPerStore').getAt(0));
        }
        if(Ext.data.StoreManager.lookup('fzPerStore').getAt(0)==undefined){
            Ext.getCmp('fzPer').select(''); return;
        }else{
            processKey = Ext.data.StoreManager.lookup('fzPerStore').getProxy().getReader().rawData.RET;
            V_STEPNAME = Ext.data.StoreManager.lookup('fzPerStore').getAt(0).data.V_V_FLOW_STEPNAME;
            V_NEXT_SETP = Ext.data.StoreManager.lookup('fzPerStore').getAt(0).data.V_V_NEXT_SETP;
            Ext.getCmp('fzPer').select(Ext.data.StoreManager.lookup('fzPerStore').first());
        }
    });
    Ext.data.StoreManager.lookup('fileStore').load({
        params : {
            V_V_GUID:yearguid,
            V_V_FILEGUID:'',
            V_V_FILENAME:'',
            V_V_TYPE:'%' //type
        }
    });
    Ext.data.StoreManager.lookup('fileStore').on('load',function(store, records, success, eOpts){
        Ext.getCmp('fjsl').setText(store.getProxy().getReader().rawData.V_COUNT);
    });

}
// 审批人
// function _selectNextSprStore() {
//     var nextSprStore = Ext.data.StoreManager.lookup('fzPerStore');
//     nextSprStore.proxy.extraParams = {
//         V_V_ORGCODE: Ext.getCmp('ck').getValue(),
//         V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
//         V_V_REPAIRCODE: '',
//         V_V_FLOWTYPE: 'YearPlan',
//         V_V_FLOW_STEP: 'start',
//         V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
//         V_V_SPECIALTY: '',
//         V_V_WHERE: ''
//
//     };
//     nextSprStore.currentPage = 1;
//     nextSprStore.load();
// }


//查询已选中缺陷
function QueryDefect() {
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params: {
            V_GUID: yearguid
        }
    });
}

//添加缺陷
function btnAdd_tjqx() {

    if(Ext.getCmp('sbmc').getValue()!=''||Ext.getCmp('sbmc').getValue()!='%')
    {
        Ext.data.StoreManager.lookup('qxAddStore').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
                V_V_STATECODE: '10'
            }
        });

        Ext.getCmp("btnAdd_tjqx").show();

    } else {
        alert('请选择设备！');
    }
}

//查询大修设备用于选择缺陷
function QueryQxEquGrid() {
    Ext.data.StoreManager.lookup('qxEquStore').load({
        params: {
            V_V_PLANGUID: Guid
        }
    })
}

//根据设备查询缺陷
function QueryQxByEqu(a, record) {
    Ext.data.StoreManager.lookup('dqxgridStore').load({
        params: {
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE: record.data.V_EQUCODE,
            V_V_STATECODE: '10'
        }
    })
}

//单设备保存缺陷
function SaveQx() {
    var selectedRecord = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    var num = 0;

    for (var i = 0; i < selectedRecord.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_IN',
            method: 'POST',
            async: false,
            params: {
                V_GUID:yearguid,
                V_DEFECTCODE: selectedRecord[i].data.V_GUID,
                V_EQUCODE: selectedRecord[i].data.V_EQUCODE,
                V_EQUNAME:selectedRecord[i].data.V_EQUNAME,
                V_DEFECT_TYPE:selectedRecord[i].data.V_SOURCENAME,
                V_DEFECT_CONTENT:selectedRecord[i].data.V_DEFECTLIST,
                V_DEFECT_DATE:selectedRecord[i].data.D_DEFECTDATE
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: selectedRecord[i].data.V_GUID,
                        V_V_STATECODE: '50'//已计划

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if(resp.V_INFO=='success'){
                            num++;
                        }else{
                            alert("修改缺陷状态失败");
                        }

                    }
                });
                // num++;
            }
        });
    }

    if (num == selectedRecord.length) {
        winQxClose();
        QueryDefect();
    }

}

//多设备保存缺陷
function OnBtnAddQx(a, record) {
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
        method: 'POST',
        async: false,
        params: {
            V_V_DEFECT_GUID: record.data.V_GUID,
            V_V_PROJECT_GUID: Guid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'SUCCESS') {
                QueryDefect();
            } else {
                alert("添加失败！")
            }
        }
    });
}

//关闭缺陷win
function winQxClose() {
    Ext.getCmp('btnAdd_tjqx').hide();
}

//删除缺陷
function DelDefect(value, metaData, record) {

    var id = metaData.record.id;

    Ext.defer(function () {
        Ext.widget('button', {
            icon:dxImgPath+'/delete.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 55,
            margin:'padding:10px 50px 10px 10px;',
            text: '删除',
            handler: function () {
                _deleteDefect(record.data.DEFECT_GUID);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
    // return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}
//删除年计划中缺陷
function _deleteDefect(DefectGuid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_GUID: yearguid,
            V_DEFECTCODE: DefectGuid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID:DefectGuid,
                        V_V_STATECODE: '10'//未处理

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if (resp.V_INFO == 'success') {
                            QueryDefect();
                        } else {
                            alert("修改缺陷状态失败");
                        }

                    }
                });
                // QueryDefect();
            } else {
                alert("删除失败");
            }
        }
    });
}

//查看更多缺陷
function OnLookMoreDefect() {
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_030212/moreYDefect.html?guid=' + yearguid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
}

//查询已选检修模型
function QueryModel() {
    Ext.data.StoreManager.lookup('mxStore').load({
        params: {
            V_GUID: yearguid
        }
    })
}

//添加检修模型
function btnAdd_jxmx() {
    QueryMobelAll();
    // Ext.getCmp("btnAdd_jxmx").show();
}

//查询该设备类型所有检修模型
function QueryMobelAll() {

    if (Ext.getCmp('sbmc').getValue()!="") {

        Ext.data.StoreManager.lookup('mxAllStore').load({
            params: {
                V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPE: '',
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
            }
        });
        Ext.getCmp("btnAdd_jxmx").show();

    } else {
        alert('请选择设备！');
        return ;
    }


}

//添加检修模型
function SaveMx() {
    var selectedRecords = Ext.getCmp('mxAllGrid').getSelectionModel().getSelection();
    if (selectedRecords.length > 0) {
        var num = 0;
        for (var i = 0; i < selectedRecords.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_JXMOD_IN',
                method: 'POST',
                async: false,
                params: {
                    V_GUID: yearguid,
                    V_EQUCODE: Ext.getCmp('sbmc').getValue(),
                    V_MODCODE:selectedRecords[i].data.V_MX_CODE,
                    V_MODNAME:selectedRecords[i].data.V_MX_NAME,
                    V_MODBBH:selectedRecords[i].data.V_MXBB_NUM,
                    V_MODBZ:selectedRecords[i].data.V_BZ
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.RET == 'SUCCESS') {
                        num++;
                    } else {
                        num++;
                        alert('模型' + selectedRecords[i].data.V_MX_NAME + "添加失败！");
                    }
                }
            });

            if (num == selectedRecords.length) {
                QueryMxInfAll();
                QueryGauntt();
                winMxClose();
            }

        }

    } else {
        QueryMxInfAll();
        QueryGauntt();
        winMxClose();
    }
}

//关闭检修模型win
function winMxClose() {
    QueryModel();
    Ext.getCmp('btnAdd_jxmx').hide();
}

//删除检修模型
function DelModel(value, metaData, record) {
    var id = metaData.record.id;

    Ext.defer(function () {
        Ext.widget('button', {
            icon:dxImgPath+'/delete.png',
            renderTo: id,
            //value: value / 100,
            height: 25,
            width: 55,
            text: '删除',
            margin:'padding:10px 50px 10px 10px;',
            handler: function () {
                _deleteModel(record.data.JX_MODCODE);//, record.data.JX_MODNAME,record.data.JX_MODBBH);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
    // return '<a href="#" onclick="_deleteModel(\'' + record.data.V_MODEL_GUID + '\')">' + '删除' + '</a>';
}

function _deleteModel(ModelGuid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_JXMOD_DEL',
        method: 'POST',
        async: false,
        params: {
            V_GUID: yearguid,
            V_MODCODE: ModelGuid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                QueryModel();
                // Ext.Ajax.request({
                //     url: AppUrl + 'dxfile/PM_MODEL_FILE_DEL_DXF',
                //     method: 'POST',
                //     async: false,
                //     params: {
                //         V_V_GUID: Guid,
                //         V_V_MODE_GUID: ModelGuid
                //     },
                //     success: function (resp) {
                //         var res = Ext.decode(resp.responseText);
                //         if (resp.list == 'success') {
                //             QueryModel();
                //         }
                //
                //     }
                // });

            } else {
                alert("删除失败");
            }
        }
    });
}

//查看检修模型明细
function MXclick(mxguid) {
    var arr = [];
    arr = mxguid.split(',');
    QueryJxgx(arr[0]);
    // QueryModFj(Guid, arr[0]);
    Ext.getCmp("MXclickW").setTitle('检修模型：' + arr[1] + arr[2]);
    //QueryJxgx(mxguid);
    Ext.getCmp("MXclickW").show();
}

function QueryModFj(acode, bcode) {
    Ext.data.StoreManager.lookup("mxfileStore").load({
        params: {
            V_V_GUID: acode,
            V_V_MODE_GUID: bcode
        }
    });
}

//查询工序
function QueryGx(a, record) {
    Ext.data.StoreManager.lookup('jxgxStore').load({
        params: {
            V_V_JXMX_CODE: record.data.V_MX_CODE
        }
    })
}

function QueryJxgx(mxguid) {
    Ext.data.StoreManager.lookup('gxStore').load({
        params: {
            V_V_JXMX_CODE: mxguid
        }
    })
}

//查询工序明细
function QueryGxMx(a, record) {
    QueryJxgz(record.data.V_JXGX_CODE);
    QueryJxwl(record.data.V_JXGX_CODE);
    QueryJxaqcs(record.data.V_JXGX_CODE);
    QueryJxjj(record.data.V_JXGX_CODE);
    QueryJxgj(record.data.V_JXGX_CODE);
    QueryJxjsyq(record.data.V_JXGX_CODE)
}

//查询工种
function QueryJxgz(mxguid) {
    Ext.data.StoreManager.lookup('jxgzStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询物料
function QueryJxwl(mxguid) {
    Ext.data.StoreManager.lookup('jxwlStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询机具
function QueryJxjj(mxguid) {
    Ext.data.StoreManager.lookup('jxjjStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询工具
function QueryJxgj(mxguid) {
    Ext.data.StoreManager.lookup('jxgjStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询安全措施
function QueryJxaqcs(mxguid) {
    Ext.data.StoreManager.lookup('jxaqcsStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询技术要求
function QueryJxjsyq(mxguid) {
    Ext.data.StoreManager.lookup('jxjsyqStore').load({
        params: {
            V_V_JXGX_CODE: mxguid
        }
    })
}

//查询检修模型所需要的所有物料，机具，工具，人员等信息
function QueryMxInfAll() {
    Ext.data.StoreManager.lookup('wlAllStore').load({
        params: {
            V_V_YEARGUID: yearguid,
            V_V_TYPE: 'WL'
        }
    });

    Ext.data.StoreManager.lookup('jjAllStore').load({
        params: {
            V_V_YEARGUID: yearguid,
            V_V_TYPE: 'JJ'
        }
    });

    Ext.data.StoreManager.lookup('gjAllStore').load({
        params: {
            V_V_YEARGUID: yearguid,
            V_V_TYPE: 'GJ'
        }
    });

    Ext.data.StoreManager.lookup('gzAllStore').load({
        params: {
            V_V_YEARGUID: yearguid,
            V_V_TYPE: 'GZ'
        }
    });


}

//网络施工图
function QueryGauntt() {
    Ext.getCmp('tabwlsgt').removeAll();
    ganttdata = [];
    dateItems = [];
    cmItems = [];
    gmxGuid = '';
    startd = 0;
    endd = 0;
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PRO_YEAR_PLAN_MXUSE_SEL',
        // url: AppUrl + '/PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_YEARGUID: yearguid,
            V_V_TYPE: 'GAUNTTTIME'
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
                allTime = resp.list[0].V_PERTIME;
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PRO_YEAR_PLAN_MXUSE_SEL',
                    // url: AppUrl + '/PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_YEARGUID: yearguid,
                        V_V_TYPE: 'GX'
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if (resp.list != null) {
                            ganttdata = resp.list;
                            CreateGaunttGrid();
                        }
                    }
                });
            }
        }
    });
}

//创建甘特图表格
function CreateGaunttGrid() {
    var vzm = 'color:#000000';
    for (var j = 1; j <= allTime; j++) {
        dateItems.push({
            text: j,
            style: vzm,
            width: 40
        });
    }

    cmItems.push({
        text: '台时',
        columns: dateItems
    });

    cmItems.push({
        text: '',
        width: 0,
        dataIndex: 'MYCOLOR',
        renderer: IndexShow
    });

    var ganttStore = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore',
        fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_JXGX_NR', 'V_GZZX_CODE', 'V_PERTIME', 'MYCOLOR', 'VSTART', 'VEND'],
        data: ganttdata,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ganttGrid = Ext.create('Ext.grid.Panel', {
        id: 'ganttGrid',
        store: ganttStore,
        region: 'center',
        columnLines: true,
        columns: cmItems
    });

    Ext.getCmp('tabwlsgt').add(ganttGrid);
}



function IndexShow(value, metaData, record) {
    if (gmxGuid == '') {
        startd = 0;
        endd = record.data.V_PERTIME;
        gmxGuid = record.data.V_JXMX_CODE;
    } else {
        if (gmxGuid == record.data.V_JXMX_CODE) {
            startd = endd;
            endd = endd - (-record.data.V_PERTIME);
        } else {
            startd = 0;
            endd = record.data.V_PERTIME;
            gmxGuid = record.data.V_JXMX_CODE;
        }
    }
    var vleft = startd;
    var vwidth = endd - startd;
    if (record.data.V_JXGX_NAME != null && record.data.V_JXGX_CODE != null) {
        var gtt = '<div style="left:' + (vleft * 40).toString() + 'px;height:21px;width:' + (vwidth * 40).toString() + 'px;background-color:A6FFA6;" class="sch-event"  ><div class="sch-event-inner" >' + record.data.V_JXGX_NAME + '</div></div><div class="lxm"  id="' + record.data.V_JXGX_CODE + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">';

        var cont = record.data.V_JXGX_NAME;
        var contt = '内容：';
        for (var i = 0; i < cont.length; i++) {
            if (i == 0) {
                contt = contt + cont[i] + '<br>';
            } else {
                contt = contt + cont[i] + '<br>';
            }
        }
        gtt = gtt + contt + '</div>';
        return gtt;
    }
}




//查看更多模型
function LookMoreModel() {
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_030212/moreYearModel.html?guid=' + yearguid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
}

//附件管理
function btnAdd_file() {
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_030212/yearFile.html?guid=' + yearguid + '&type=YEAR&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no');
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function MoneyChange(field, newValue, oldValue) {

    Ext.getCmp('tzze').setValue(Ext.getCmp('bjf').getValue() - (-Ext.getCmp('clf').getValue()) - (-Ext.getCmp('sgfy').getValue()));
}

function machistory(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center";
    return '<a href="javascript:macdetail(\'' + value + '\')">' + "详细信息" + '</a>'
}

function macdetail(edcode) {
//---设备编码查询工单
    Ext.data.StoreManager.lookup('workStore').on('beforeload', function (store, options) {
        var new_params = {V_EDUCODE: edcode};
        Ext.apply(store.proxy.extraParams, new_params);
    });
    Ext.data.StoreManager.lookup('workStore').load({params: {start: 0, limit: itemsPerpage}});
    Ext.getCmp('workWindow').show();

}

function gdzcdetail(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center";
    return '<a href="javascript:mgdzcdet(\'' + value + '\')">' + "详细信息" + '</a>'
}
//查找编辑返回数据
function getYearDate() {

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GETONE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_GUID: YEARUPGUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET.length == 1) {
                var startime=resp.RET[0].PLANTJMONTH;
                var btime=startime.split(" ")[0];
                var endtime=resp.RET[0].PLANJGMONTH;
                var etime=endtime.split(" ")[0];

                Ext.getCmp('nf').select(resp.RET[0].V_YEAR); //年
                Ext.getCmp('yf').select(resp.RET[0].V_MONTH);  //月

                Ext.getCmp('ck').select(resp.RET[0].ORGCODE);  //厂矿编码
                Ext.getCmp('zyq').select(resp.RET[0].DEPTCODE);  //作业区编码
                Ext.getCmp('zy').select(resp.RET[0].ZYCODE);  //专业编码
                Ext.getCmp('sblx').select(resp.RET[0].EQUTYPE);  //设备类型编码
                Ext.getCmp('sbmc').select(resp.RET[0].EQUCODE);  //设备名称编码
                Ext.getCmp('jxtype').select(resp.RET[0].REPAIRTYPE);  //检修类别
                Ext.getCmp('content').setValue(resp.RET[0].REPAIRCONTENT);  //检修内容

                Ext.getCmp('jhgs').setValue(resp.RET[0].PLANHOUR);  //计划小时数
                // Ext.getCmp('bz').setValue(resp.RET[0].REMARK);  //备注

                Ext.getCmp('wxlx').select(resp.RET[0].WXTYPECODE); // 维修类型
                Ext.getCmp('jhlb').select(resp.RET[0].PTYPECODE);   // 计划类别
                Ext.getCmp('sfxj').select(resp.RET[0].OLD_FLAG);  //修旧标识
                Ext.getCmp('repairDept').select(resp.RET[0].REDEPTCODE);  //检修单位
                Ext.getCmp('jhts').setValue(resp.RET[0].PLANDAY);  //计划天数
                Ext.getCmp('fzPer').select(resp.RET[0].FZPERCODE); // 负责人编码
                Ext.getCmp('sgfs').select(resp.RET[0].SGTYPECODE);  //施工方式

                Ext.getCmp('sclb').setValue(resp.RET[0].SCLBCODE); //生产类别
                Ext.getCmp('ProjectName').setValue(resp.RET[0].PRO_NAME);  // 项目名称
                Ext.getCmp('btime').setValue(Ext.Date.format(new Date(btime),'Y/m')); // 停工时间
                Ext.getCmp('etime').setValue(Ext.Date.format(new Date(etime),'Y/m')); // 竣工时间
                yearstate=resp.RET[0].STATE; //计划状态
                yearid=resp.RET[0].YEARID;// 年计划单号

            }
        }
    });
    Ext.data.StoreManager.lookup('fzPerStore').load({
        params:{
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_REPAIRCODE: '',
            V_V_FLOWTYPE: 'YearPlan',
            V_V_FLOW_STEP: 'start',
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '',
            V_V_WHERE: ''
        }
    });
}
//保存计划
function OnButtonSaveClick() {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_INSERT_FJ',
        method: 'POST',
        async: false,
        params: {
            V_GUID:     yearguid, //唯一guid
            V_ORGCODE: Ext.getCmp('ck').getValue(),//厂矿code
            V_ORGNAME: Ext.getCmp('ck').getDisplayValue(), //
            V_DEPTCODE: Ext.getCmp('zyq').getValue(), //作业区
            V_DEPTNAME: Ext.getCmp('zyq').getDisplayValue(),
            V_ZYCODE: Ext.getCmp('zy').getValue(), //专业编码
            V_ZYNAME: Ext.getCmp('zy').getDisplayValue(),
            V_EQUCODE: Ext.getCmp('sbmc').getValue(), //设备编码
            V_EQUTYPE: Ext.getCmp('sblx').getValue(), //设备类型
            V_REPAIRCONTENT: Ext.getCmp('content').getValue(), //维修内容
            V_PLANHOUR: Ext.getCmp('jhgs').getValue(), //计划小时
            V_REPAIRTYPE: Ext.getCmp('jxtype').getValue(),  //检修类别
            V_REPAIRTYPENAME: Ext.getCmp('jxtype').getDisplayValue(), //检修类别
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'), //录入人code
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring()), //
            V_REMARK:'',// Ext.getCmp('bz').getValue(),  //备注
            V_V_YEAR: Ext.getCmp('nf').getValue(), // 年
            V_V_MONTH: Ext.getCmp('yf').getValue(), //月

            V_TGTIME:Ext.Date.format(new Date(Ext.getCmp('btime').getValue()),'Y/m/d'), // 竣工时间
            V_JGTIME:Ext.Date.format(new Date(Ext.getCmp('etime').getValue()),'Y/m/d'), // 停工时间
            V_WXTYPECODE:Ext.getCmp('wxlx').getValue(), // 维修类型
            V_WXTYPENAME:Ext.getCmp('wxlx').getDisplayValue(), //维系类别名称
            V_PTYPECODE:Ext.getCmp('jhlb').getValue(), // 计划类别
            V_PTYPENAME:Ext.getCmp('jhlb').getDisplayValue(), //
            V_OLD_FLAG:Ext.getCmp('sfxj').getValue(), //修旧标识
            V_REDEPTCODE:Ext.getCmp('repairDept').getValue(), //检修单位
            V_REDEPTNAME:Ext.getCmp('repairDept').getDisplayValue(), //
            V_PLANDAY:Ext.getCmp('jhts').getValue(), //计划天数
            V_FZPERCODE:Ext.getCmp('fzPer').getValue(), // 负责人编码
            V_FZPERNAME:Ext.getCmp('fzPer').getDisplayValue(), //

            V_SGTYPECODE:Ext.getCmp('sgfs').getValue(), //施工方式
            V_SGTYPENAME:Ext.getCmp('sgfs').getDisplayValue(), //
            V_SCLBCODE:Ext.getCmp('sclb').getValue(), //生产类别
            V_SCLBNAME:Ext.getCmp('sclb').getDisplayValue(), //
            V_PRO_NAME:Ext.getCmp('ProjectName').getValue() // 项目名称
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                if (flag == 'new') {
                    alert('保存成功');
                    window.close();
                    window.opener.OnButtonQuery();
                    return;
                }

                else {
                    alert('修改成功');
                    window.close();
                    window.opener.OnButtonQuery();
                }
            }
        }
    });

}
function SaveYearClick(){
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_INSERT',
        method: 'POST',
        async: false,
        params: {
            V_GUID:     yearguid, //唯一guid
            V_ORGCODE: Ext.getCmp('ck').getValue(),//厂矿code
            V_ORGNAME: Ext.getCmp('ck').getDisplayValue(), //
            V_DEPTCODE: Ext.getCmp('zyq').getValue(), //作业区
            V_DEPTNAME: Ext.getCmp('zyq').getDisplayValue(),
            V_ZYCODE: Ext.getCmp('zy').getValue(), //专业编码
            V_ZYNAME: Ext.getCmp('zy').getDisplayValue(),
            V_EQUCODE: Ext.getCmp('sbmc').getValue(), //设备编码
            V_EQUTYPE: Ext.getCmp('sblx').getValue(), //设备类型
            V_REPAIRCONTENT: Ext.getCmp('content').getValue(), //维修内容
            V_PLANHOUR: Ext.getCmp('jhgs').getValue(), //计划小时
            V_REPAIRTYPE: Ext.getCmp('jxtype').getValue(),  //检修类别
            V_REPAIRTYPENAME: Ext.getCmp('jxtype').getDisplayValue(), //检修类别
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'), //录入人code
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring()), //
            V_REMARK:'',// Ext.getCmp('bz').getValue(),  //备注
            V_V_YEAR: Ext.getCmp('nf').getValue(), // 年
            V_V_MONTH: Ext.getCmp('yf').getValue(), //月

            V_TGTIME:Ext.Date.format(new Date(Ext.getCmp('btime').getValue()),'Y/m/d'), // 竣工时间
            V_JGTIME:Ext.Date.format(new Date(Ext.getCmp('etime').getValue()),'Y/m/d'), // 停工时间
            V_WXTYPECODE:Ext.getCmp('wxlx').getValue(), // 维修类型
            V_WXTYPENAME:Ext.getCmp('wxlx').getDisplayValue(), //维系类别名称
            V_PTYPECODE:Ext.getCmp('jhlb').getValue(), // 计划类别
            V_PTYPENAME:Ext.getCmp('jhlb').getDisplayValue(), //
            V_OLD_FLAG:Ext.getCmp('sfxj').getValue(), //修旧标识
            V_REDEPTCODE:Ext.getCmp('repairDept').getValue(), //检修单位
            V_REDEPTNAME:Ext.getCmp('repairDept').getDisplayValue(), //
            V_PLANDAY:Ext.getCmp('jhts').getValue(), //计划天数
            V_FZPERCODE:Ext.getCmp('fzPer').getValue(), // 负责人编码
            V_FZPERNAME:Ext.getCmp('fzPer').getDisplayValue(), //

            V_SGTYPECODE:Ext.getCmp('sgfs').getValue(), //施工方式
            V_SGTYPENAME:Ext.getCmp('sgfs').getDisplayValue(), //
            V_SCLBCODE:Ext.getCmp('sclb').getValue(), //生产类别
            V_SCLBNAME:Ext.getCmp('sclb').getDisplayValue(), //
            V_PRO_NAME:Ext.getCmp('ProjectName').getValue() // 项目名称
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                if (flag == 'new') {
                    alert('保存成功');
                }
                else {
                    alert('修改成功');
                }
            }
        }
    });
}
function btnFlowStart(){

    SaveYearClick();
    getYearDate();
    if(yearstate==""&&flag == 'new'){
        FlowStart();
    }else if(yearstate=="10"||yearstate=="99"||yearstate=="100"){
        FlowStart();
    }
    else{
        return alert('此计划状态补不可为空');
    }
}

function FlowStart(){
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/StratProcess',
        async: false,
        method: 'post',
        params: {
            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
            parVal: [Ext.util.Cookies.get('v_personcode'), yearguid, Ext.getCmp('fzPer').getValue(), "请审批!", Ext.getCmp('content').getValue(),yearid, "请审批！","YearPlan"],
            processKey: processKey,
            businessKey: yearguid,
            V_STEPCODE: 'Start',
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('fzPer').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            if (Ext.decode(response.responseText).ret == 'OK') {

                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_SEND',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: yearguid,
                        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                        V_V_FLOWCODE: '上报',
                        V_V_PLANTYPE: 'YEAR',
                        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText).list[0];
                        if (resp.V_INFO == 'Success') {
                            alert("上报成功！");
                            this.window.close();
                        } else {
                            Ext.Msg.alert('提示', '上报失败！');
                        }
                    }
                });

            } else if (Ext.decode(response.responseText).error == 'ERROR') {
                Ext.Msg.alert('提示', '该流程发起失败！');
            }
        }
    });
}