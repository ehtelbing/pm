var Guid="";
var Year='';
var OrgCode='';
var OrgName='';
var DeptCode='';
var JhlbCode='';
var WxlxCode='';
var repairDept='';
var fzrPer='';
var qxEqu='';
var cmItems=[];
var dateItems=[];
var ganttdata=[];

var startd = '0';
var endd = '0';
var gmxGuid='';
var allTime=0;


if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

//计划类别
var jhlbStore = Ext.create("Ext.data.Store", {
    storeId: 'jhlbStore',
    fields: ['V_UID', 'V_XH','V_LBMC','V_BZ','V_BS','V_DLHS','V_FYLX','V_XWLX','V_LBJC'],
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
    fields: ['V_UID', 'V_XH','V_SCLB','V_BZ'],
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
//产品种类
var cpzlStore = Ext.create("Ext.data.Store", {
    storeId: 'cpzlStore',
    fields: ['V_UID', 'V_XH','V_CPZL','V_LBBM','V_BZ'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_CPZL_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//工序
var cpgxStore = Ext.create("Ext.data.Store", {
    storeId: 'cpgxStore',
    fields: ['V_UID', 'V_XH','V_GXMC','V_BZ'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_GX_SEL',
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
    fields: ['ID', 'V_BH','V_SGFS','V_LX'],
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

var wlAllStore = Ext.create("Ext.data.Store", {
    storeId: 'wlAllStore',
    fields: ['V_GGXH', 'V_JLDW','V_JXGX_CODE','V_JXGX_NAME','V_KFNAME','V_PRICE','V_USE_NUM','V_WLCODE','V_WLSM'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jjAllStore = Ext.create("Ext.data.Store", {
    storeId: 'jjAllStore',
    fields: ['V_JJ_CODE', 'V_JJ_DE','V_JJ_NAME','V_JJ_TS','V_JJ_TYPE','V_JXGX_CODE','V_JXGX_NAME'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gjAllStore = Ext.create("Ext.data.Store", {
    storeId: 'gjAllStore',
    fields: ['V_GJ_CODE', 'V_GJ_NAME','V_GJ_TYPE','V_JXGX_CODE','V_JXGX_NAME'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var aqcsAllStore = Ext.create("Ext.data.Store", {
    storeId: 'aqcsAllStore',
    fields: ['V_AQCS_BBH', 'V_AQCS_CODE','V_AQCS_DETAIL','V_AQCS_NAME','V_AQ_ZYSX','V_JXGX_CODE','V_JXGX_NAME'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jsyqAllStore = Ext.create("Ext.data.Store", {
    storeId: 'jsyqAllStore',
    fields: ['displayField', 'valueField'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gzAllStore = Ext.create("Ext.data.Store", {
    storeId: 'gzAllStore',
    fields: ['V_DE', 'V_JXGX_CODE','V_JXGX_NAME','V_PERCODE','V_PERCODE_DE','V_PERNAME_DE','V_PERNUM','V_PERTYPE_DE','V_TS','V_PERNAME'],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var zyqStore = Ext.create("Ext.data.Store", {
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
            IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
        }
    }
});
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'zyStore',
    fields: ['V_GUID', 'V_ZYMC','V_ZYJC','V_LX','V_ORDER'],
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
var EquTypeStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'EquTypeStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
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
    fields: ['V_EQUCODE', 'V_EQUNAME','V_EQUSITE','V_EQUSITENAME'],
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
var yxsbGridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'yxsbGridStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
    'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
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
var cgridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'cgridStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
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
var repairDeptStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'repairDeptStore',
    fields: ['V_DEPTCODE','V_DEPTNAME','V_DEPTREPAIRCODE','V_DEPTREPAIRNAME',
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
var fzPerStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'fzPerStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_22/PRO_BASE_SPECIALTYTOPERSON_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var qxAddStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxAddStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
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
var qxGridStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxGridStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PROJECT_DEFECT_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var qxEquStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxEquStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
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
var dqxgridStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'dqxgridStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
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
var mxAllStore=Ext.create('Ext.data.Store', {
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
var mxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxStore',
    fields: ['ID', 'V_PROJECT_GUID', 'V_MODEL_GUID', 'V_MODEL_NAME', 'V_MODEL_BBH','V_BZ'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_MODEL_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var jxgxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE','V_JXGX_NR','V_ORDER',
        'V_PERNUM','V_PERTIME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP','V_JJ_NAME','V_GJ_NAME','V_GZ_NAME','V_WL_NAME',
        'V_WORK_NAME','V_AQCS_NAME','V_JSYQ_NAME'],
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
var gxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE','V_JXGX_NR','V_ORDER',
        'V_PERNUM','V_PERTIME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP','V_JJ_NAME','V_GJ_NAME','V_GZ_NAME','V_WL_NAME',
        'V_WORK_NAME','V_AQCS_NAME','V_JSYQ_NAME'],
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
var jxgzStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgzStore',
    fields: ['V_JXGX_CODE', 'V_PERCODE_DE', 'V_PERNAME_DE', 'V_TS', 'V_DE','V_PERTYPE_DE','V_PERCODE',
        'V_PERNAME','I_ID','V_PERNUM'],
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
var jxwlStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxwlStore',
    fields: ['V_JXGX_CODE', 'V_KFNAME', 'V_WLCODE', 'V_WLSM', 'V_GGXH','V_JLDW','V_PRICE',
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
})
var jxjjStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxjjStore',
    fields: ['V_JXGX_CODE' ,'V_JJ_CODE' ,'V_JJ_NAME' ,'V_JJ_TYPE' , 'V_JJ_TS' ,'V_JJ_DE'],
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
})
var jxgjStore=Ext.create('Ext.data.Store', {
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
})
var jxaqcsStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxaqcsStore',
    fields: ['V_JXGX_CODE', 'V_AQCS_CODE', 'V_AQCS_NAME', 'V_AQCS_BBH', 'V_AQ_ZYSX','V_AQCS_DETAIL','V_LINK_TIME',
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
})
var jxjsyqStore=Ext.create('Ext.data.Store', {
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
})
var flowStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'flowStore',
    fields: ['V_PROJECTGUID', 'V_FLOWCODE', 'V_FLOWNAME', 'V_IDEA', 'V_INPERCODE', 'V_INPERNAME', 'V_NEXTPERCODE',
        'V_NEXTPERNAME', 'V_INTIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})
var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    id:'northPanel',
    titleAlign:'center',
    height:60,
    bodyStyle:'background:#f2f2f2; border-bottom:1px solid #f4f4f4',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '检修模型',
            margin: '5 0 5 0',
            iconCls:'Tablegear',
            handler:btnAdd_jxmx
        },
        {
            xtype: 'button',
            text: '添加设备',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:btnAdd_jdsb
        },
        {
            xtype: 'button',
            text: '添加缺陷',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:btnAdd_tjqx
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '临时保存',
            margin: '5 0 5 0',
            iconCls:'Tablesave',
            handler:btnSaveProject
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            id:'startFlow',
            text: '上报',
            margin: '5 0 5 0',
            iconCls:'Report',
            handler:btnFlowStart
        },
        {
            xtype: 'button',
            id:'agreeFlow',
            text: '审批通过',
            margin: '5 0 5 0',
            iconCls:'Report',
            handler:btnFlowAgree
        },
        {
            xtype: 'button',
            id:'disAgreeFlow',
            text: '审批驳回',
            margin: '5 0 5 0',
            iconCls:'Report',
            handler:btnFlowDisAgree
        },{
            xtype: 'button',
            text: '附件',
            margin: '5 0 5 0',
            iconCls:'Tablegear',
            handler:btnAdd_file
        }
    ]
});
/*项目信息*/
var LTpanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    width:'100%',
    frame: false,
    border:true,
    layout: 'column',
    defaults: {labelAlign: 'right'},
    bodyStyle:"background:#f2f2f2",
    collapsible: false,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '项目编码',
            id:'ProjectCode',
            labelWidth: 60,
            width:250,
            margin:'5 5 5 15',
            readOnly:true
        },
        {
            xtype: 'textfield',
            fieldLabel: '项目名称',
            id:'ProjectName',
            labelWidth: 60,
            width:250,
            margin:'5 5 5 0'
        },
        {
            xtype : 'combo',
            id : "zyq",
            store: zyqStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '计划作业区',
            margin:'5 5 5 0',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth :80,
            width:250,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "wxlx",
            store: wxlxStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '维修类型',
            margin:'5 5 5 0',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            labelWidth :60,
            width:250,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "zy",
            store: zyStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '专 业',
            margin:'5 5 5 0',
            displayField: 'V_ZYMC',
            valueField: 'V_GUID',
            width:265,
            labelWidth :75,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "jhlb",
            store: jhlbStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '计划类别',
            margin:'5 5 5 0',
            displayField: 'V_LBMC',
            valueField: 'V_UID',
            width:250,
            labelWidth :60,
            labelAlign : 'right'
        }, {
            xtype : 'combo',
            id : "sclb",
            store: sclbStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '生产类别',
            margin:'5 5 5 0',
            displayField: 'V_SCLB',
            valueField: 'V_UID',
            labelWidth :80,
            width:250,
            labelAlign : 'right'
        }, {
            xtype : 'combo',
            id : "cpzl",
            store: cpzlStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '产品种类',
            margin:'5 5 5 0',
            displayField: 'V_CPZL',
            valueField: 'V_UID',
            labelWidth :60,
            width:250,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "cpgx",
            store: cpgxStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '工 序',
            margin:'5 5 5 0',
            displayField: 'V_GXMC',
            valueField: 'V_UID',
            width:265,
            labelWidth :75,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "sgfs",
            store: sgfsStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '施工方式',
            margin:'5 5 5 0',
            displayField: 'V_SGFS',
            valueField: 'V_BH',
            width:250,
            labelWidth :60,
            labelAlign : 'right'
        }, {
            xtype : 'combo',
            id : "sfxj",
            store: [[0,'是'],[1,'否']],
            editable : false,
            queryMode : 'local',
            value:0,
            fieldLabel : '是否修旧',
            margin:'5 5 5 0',
            labelWidth :80,
            width:250,
            labelAlign : 'right'
        }
    ]
});
/*查看更多设备*/
var Toolpanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8',},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin',listeners:{click:LookMoreEqu}
        }
    ]
});
/*设备表格*/
var centerPanel = Ext.create('Ext.grid.Panel', {
    region: "north",
    id:'cgrid',
    store:cgridStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft},
        {text: '查看设备检修明细',dataIndex:'cksbjxmx',width:160},
        {text: '固定资产',dataIndex:'gdzc',width:160},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
    ]
});
var gcxmwlsgt = Ext.create('Ext.panel.Panel', {
    region: 'center',
    width: '100%',
    frame: false,
    border: false,
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [centerPanel]
});
/*维修内容*/
var ToolpanelB  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:85,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2 !important;',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        {
            xtype     : 'textareafield',
            id:'content',
            grow      : true,
            name      : 'message',
            fieldLabel: '维修内容',
            anchor    : '100%',
            margin:'5 5 5 20',
            labelWidth :60,
            width:1000,
            height:70
        }
    ]
});
/*检修信息*/
var ToolpanelC  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:70,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2 !important;',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [
        {
            xtype : 'datefield',
            id:'btime',
            editable : false,
            fieldLabel : '开工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            format:'Y/m/d',
            value:new Date()
        },
        {
            xtype : 'datefield',
            id:'etime',
            editable : false,
            fieldLabel : '竣工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            format:'Y/m/d',
            value:new Date()
        },
        {
            xtype : 'combo',
            id:'repairDept',
            store:repairDeptStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '检修单位',
            displayField: 'V_DEPTREPAIRNAME',
            valueField: 'V_DEPTREPAIRCODE',
            margin:'5 5 5 15',
            labelWidth :60,
            width:240,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id:'fzPer',
            store:fzPerStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '负责人',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            margin:'5 5 5 10',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype: 'numberfield',
            id:'jhfy',
            fieldLabel: '计划费用',
            labelWidth: 60,
            width:170,
            margin:'5 5 5 20',
            value:0
        }, {
            xtype : 'numberfield',
            id:'jhgs',
            fieldLabel : '计划工时',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            value:0
        },
        {
            xtype : 'numberfield',
            id:'jhts',
            fieldLabel : '计划天数',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            value:0
        }
    ]
});
/*查看更多缺陷*/
var TOPGIRDRIGHTTtool = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '缺陷明细',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin',
            listeners:{click:OnLookMoreDefect}
        }
    ]
});
/*缺陷表格*/
var TOPGIRDRIGHTtable = Ext.create('Ext.grid.Panel', {
    id:'qxgrid',
    store:qxGridStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
        {text: '删除',width: 120,  align: 'center',renderer:DelDefect}
    ]
});
var TOPGIRDRIGHT = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    layout: 'vbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHTTtool,TOPGIRDRIGHTtable]
})
var ToolpanelD = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHT]
})
/*左上布局*/
var Leftdivtop = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    height:550,
    renderTo: Ext.getBody(),
    items: [LTpanel,Toolpanel,gcxmwlsgt,ToolpanelB,ToolpanelC,ToolpanelD]
});
//检修模型
var jxmx1 = Ext.create('Ext.grid.Panel', {
    id:'mxgrid',
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    store:mxStore,
    columnLines: true,
    border: false,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MODEL_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 140, dataIndex: 'V_MODEL_BBH', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MODEL_GUID + '\')">'+'查看详细'+'</a>'
            }},
        {text: '删除',width: 120,  align: 'center',renderer:DelModel}
    ]
});
var jxmx2 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修模型',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin',listeners:{click:LookMoreModel}
        },
    ]
});
//物料明细按钮
var wlmxcd = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    bodyStyle:'background:#f2f2f2',
    height:32,
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '物料明细',
            margin: '5 0 5 0',
            iconCls:'Tablecolumn'
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '作业区库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablecell'

        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '厂矿库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablelightning'

        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '其它厂矿库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablesort'

        }
    ]
});
//大修计划所需物料明细（右侧物料）
var wlmxgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'wlAll',
    autoScroll: true,
    store:wlAllStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '物料编码',width: 140, dataIndex: 'V_WLCODE', align: 'center',renderer:atleft},
        {text: '物料描述',width: 300, dataIndex: 'V_WLSM', align: 'center',renderer:atleft},
        {text: '规格型号',width: 140, dataIndex: 'V_GGXH', align: 'center',renderer:atleft},
        {text: '计划单价',width: 100, dataIndex: 'V_PRICE', align: 'center',renderer:atright},
        {text: '使用数量',width: 80, dataIndex: 'V_USE_NUM', align: 'center',renderer:atright}
    ]
});
var jjmxgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'jjAll',
    store:jjAllStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '机具名称',width: 140, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
        {text: '机具类型',width: 140, dataIndex: 'V_JJ_TYPE', align: 'center',renderer:atleft},
        {text: '使用台时',width: 140, dataIndex: 'V_JJ_TS', align: 'center',renderer:atleft},
        {text: '定额',width: 100, dataIndex: 'V_JJ_DE', align: 'center',renderer:atright}
    ]
});
var gjmxgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'gjAll',
    store:gjAllStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工具名称',width: 140, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
        {text: '工具类型',width: 140, dataIndex: 'V_GJ_TYPE', align: 'center',renderer:atleft}
    ]
});
var flowgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'flowgird',
    store:flowStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '流程步骤',width: 140, dataIndex: 'V_FLOWNAME', align: 'center',renderer:atleft},
        {text: '操作人',width: 140, dataIndex: 'V_INPERNAME', align: 'center',renderer:atleft},
        {text: '审批意见',width: 140, dataIndex: 'V_IDEA', align: 'center',renderer:atleft},
        {text: '操作时间',width: 140, dataIndex: 'V_INTIME', align: 'center',renderer:atleft}
    ]
});
var gzmxgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'gzAll',
    store:gzAllStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '人员编码',width: 100, dataIndex: 'V_PERCODE', align: 'center',renderer:atleft},
        {text: '人员姓名',width: 100, dataIndex: 'V_PERNAME', align: 'center',renderer:atleft},
        {text: '工种名称',width: 100, dataIndex: 'V_PERNAME_DE', align: 'center',renderer:atleft},
        {text: '工种类型',width: 100, dataIndex: 'V_PERTYPE_DE', align: 'center',renderer:atleft},
        {text: '定额',width: 100, dataIndex: 'V_DE', align: 'center',renderer:atright},
        {text: '台时',width: 100, dataIndex: 'V_TS', align: 'center',renderer:atleft}
    ]
});
//右侧tab
var Rightdivbtm = Ext.create('Ext.tab.Panel', {
    region:'center',
    border:false,
    height:window.innerHeight /2,
    renderTo: Ext.getBody(),
    items: [{
        title: '物料明细',
        id:'tabwl',
        layout:'border',
        items:[wlmxcd,wlmxgird]
    }, {
        title: '机具',
        id:'tabjj',
        layout:'border',
        items:[jjmxgird]
    },{
        title: '工具',
        id:'tabgj',
        layout:'border',
        items:[gjmxgird]
    },{
        title: '人员',
        id:'tabgz',
        layout:'border',
        items:[gzmxgird]
    }, {
        title: '网络施工图',
        id:'tabwlsgt',
        layout:'border',
        items:[]
    }, {
        title: '审批流程',
        id:'tabsplc',
        layout:'border',
        items:[flowgird]
        }
    ]
});
var Rightdivtop = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:false,
    height:'70%',
    bodyStyle:'border-top:1px solid #d4d4d4 !important',
    renderTo: Ext.getBody(),
    items: [Rightdivbtm]
});
var Rightdivbtm1 = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:true,
    height:"30%",
    title:'维修计划编制设置',
    bodyStyle:'background:#f2f2f2;',
    renderTo: Ext.getBody(),
    items: []
});
var Leftdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'west',
    width:'57%',
    border:false,
    items: [Leftdivtop,jxmx2,jxmx1],
    renderTo: Ext.getBody()
});
var Rightdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    width:'43%',
    border:false,
    items: [Rightdivtop,Rightdivbtm1],
    renderTo: Ext.getBody()
});
var centerPanel = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    border:false,
    items: [Leftdiv,Rightdiv],
    renderTo: Ext.getBody()
});
//添加设备事件
//添加设备
var sbPanel=Ext.create('Ext.panel.Panel',{
   region:'north',
   layout:'column',
   frame:true,
   wdith:'100%',
   items:[{ xtype: 'combo',fieldLabel: '设备类型',store: EquTypeStore,id:'EquType',editable : false,queryMode : 'local',displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE',labelWidth: 75, width:265,margin:'5 5 5 0',labelAlign:'right'},
          {xtype: 'button',text: '查询', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Magnifierzoomin' ,listeners:{click:QueryEquGrid}},
          {xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:winClose}}]
});
var sbGrid = Ext.create('Ext.grid.Panel', {
    id:'sbGrid',
    store:sbGridStore,
    region: "west",
    split: true,
    width:820,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft}
    ],listeners:{
        itemdblclick : importEqu
    }
});
var yxsbGrid = Ext.create('Ext.grid.Panel', {
    id:'yxsbGrid',
    store:yxsbGridStore,
    region: "west",
    split: true,
    width:820,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
    ]
});
var btnAdd_jdsb = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jdsb',
    width: 1700,
    height: 675,
    title: '大修计划设备添加',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [sbPanel,sbGrid,yxsbGrid]
});
//单设备缺陷添加
var tjqxpanel=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    frame:true,
    wdith:'100%',
    items:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:SaveQx}},
            {xtype: 'button',text: '关闭', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tabledelete' ,listeners:{click:winQxClose}}]
})
var tjqxgrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'qxAdd',
    store:qxAddStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}
    ]
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
    items: [tjqxpanel,tjqxgrid]
});
//多设备缺陷添加
var dtjqxgrid = Ext.create('Ext.grid.Panel', {
    split: true,
    id:'qxEqu',
    store:qxEquStore,
    region:'west',
    width:400,
    columnLines: true,
    border:false,
    columns: [
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 260, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft}
    ],listeners:{itemclick:QueryQxByEqu}

});
var tjqxgrid1 = Ext.create('Ext.grid.Panel', {
    id:'dqxgrid',
    store:dqxgridStore,
    region: "center",
    split: true,
    width:540,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}
    ],listeners:{itemclick:OnBtnAddQx}
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
    items: [dtjqxgrid,tjqxgrid1]
});
//检修模型确认返回
var mxpanle=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    frame:true,
    wdith:'100%',
    items:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:SaveMx}},
        {xtype: 'button',text: '关闭', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tabledelete' ,listeners:{click:winMxClose}}]
});
//检修模型表单1
var mxAllGrid = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    id:'mxAllGrid',
    store:mxAllStore,
    columnLines: true,
    border: true,
    selType:'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MX_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 100, dataIndex: 'V_MXBB_NUM', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MX_CODE + '\')">'+'查看详细'+'</a>'
            }}
    ],listeners:{itemclick:QueryGx}
});
//检修模型表单2
var jxgxGrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'jxgxGrid',
    store:jxgxStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称',width: 200, dataIndex: 'V_JXGX_NAME', align: 'center',renderer:atleft},
        {text: '工序内容',width: 200, dataIndex: 'V_JXGX_NR', align: 'center',renderer:atleft},
        {text: '工种',width: 200, dataIndex: 'V_GZ_NAME', align: 'center',renderer:atleft},
        {text: '工具',width: 200, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
        {text: '机具',width: 200, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
        {text: '物料',width: 200, dataIndex: 'V_WL_NAME', align: 'center',renderer:atleft},
        {text: '安全措施',width: 200, dataIndex: 'V_AQCS_NAME', align: 'center',renderer:atleft},
        {text: '技术要求',width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center',renderer:atleft}
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
    items: [mxpanle,mxAllGrid,jxgxGrid]
});
//大修计划检修模型明细
var gxgrid = Ext.create('Ext.grid.Panel', {
    region: 'west',
    id:'gxgrid',
    store:gxStore,
    split: true,
    width:600,
    height:200,
    margin:'0px',
    columnLines: true,
    border: true,
    layout: 'column',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称',width: 200, dataIndex: 'V_JXGX_NAME', align: 'center',renderer:atleft},
        {text: '工序内容',width: 300, dataIndex: 'V_JXGX_NR', align: 'center',renderer:atleft}
    ],listeners:{itemclick:QueryGxMx}
});
//检修人员表单
var jxrytool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修人员',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxgzgrid',
    store:jxgzStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '人员编码',width: 160, dataIndex: 'V_PERCODE', align: 'center',renderer:atleft},
        {text: '人员姓名',width: 160, dataIndex: 'V_PERNAME', align: 'center',renderer:atleft},
        {text: '工种名称',width: 160, dataIndex: 'V_PERNAME_DE', align: 'center',renderer:atleft},
        {text: '工种类型',width: 160, dataIndex: 'V_PERTYPE_DE', align: 'center',renderer:atleft},
        {text: '定额',width: 160, dataIndex: 'V_DE', align: 'center',renderer:atleft},
        {text: '台时',width: 160, dataIndex: 'V_TS', align: 'center',renderer:atleft}
    ]
});
//检修工种
var jxgz = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxrytool1,jxgzgrid]
});
//检修机具表单
var jxjjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修机具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxjjgrid',
    store:jxjjStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '机具名称',width: 160, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
        {text: '机具类型',width: 160, dataIndex: 'V_JJ_TYPE', align: 'center',renderer:atleft},
        {text: '使用台时',width: 160, dataIndex: 'V_JJ_TS', align: 'center',renderer:atright},
        {text: '定额',width: 160, dataIndex: 'V_JJ_DE', align: 'center',renderer:atright}
    ]
});
//检修机具
var jxjj = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjjtool1,jxjjgrid]//
});
//检修工具表单
var jxgjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修工具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxgjgrid',
    store:jxgjStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工具名称',width: 160, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
        {text: '工具类型',width: 160, dataIndex: 'V_GJ_TYPE', align: 'center',renderer:atleft}
    ]
});
//检修工具
var jxjj1 = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxgjtool1,jxgjgrid]//
});
//检修物料表单
var jxwl1tool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修物料',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxwlgrid',
    store:jxwlStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '物料编码',width: 200, dataIndex: 'V_WLCODE', align: 'center',renderer:atleft},
        {text: '物料名称',width: 200, dataIndex: 'V_WLSM', align: 'center',renderer:atleft},
        {text: '规格型号',width: 200, dataIndex: 'V_GGXH', align: 'center',renderer:atleft},
        {text: '单价',width: 200, dataIndex: 'V_PRICE', align: 'center',renderer:atright},
        {text: '数量',width: 200, dataIndex: 'V_USE_NUM', align: 'center',renderer:atright}
    ]
});
//检修物料
var jxwl = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxwl1tool1,jxwlgrid]//
});
//检修安全措施表单
var jxaqcstool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修安全措施',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxaqcsgrid',
    store:jxaqcsStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '安全措施名称',width: 200, dataIndex: 'V_AQCS_NAME', align: 'center',renderer:atleft},
        {text: '安全措施版本号',width: 200, dataIndex: 'V_AQCS_BBH', align: 'center',renderer:atleft}
    ]
});
//检修安全措施
var jxaqcs = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxaqcstool1,jxaqcsgrid]//
});
//检修技术要求表单
var jxjsyqtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修技术要求',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
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
    id:'jxjsyqgrid',
    store:jxjsyqStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:170,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '技术要求名称',width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center',renderer:atleft},
        {text: '零件编号',width: 200, dataIndex: 'V_PART_NUMBER', align: 'center',renderer:atleft},
        {text: '零件名称',width: 200, dataIndex: 'V_PART_NAME', align: 'center',renderer:atleft},
        {text: '零件编码',width: 200, dataIndex: 'V_PART_CODE', align: 'center',renderer:atleft},
        {text: '允许值（上限）',width: 200, dataIndex: 'V_VALUE_UP', align: 'center',renderer:atleft},
        {text: '允许值（下限）',width: 200, dataIndex: 'V_VALUE_DOWN', align: 'center',renderer:atleft},
        {text: '备注',width: 200, dataIndex: 'V_CONTENT', align: 'center',renderer:atleft}
    ]
});
//检修技术要求
var jxjsyq = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjsyqtool1,jxjsyqgrid]//
});
//大修计划右边布局
var dxjhsbright = Ext.create('Ext.panel.Panel', {
    region:'east',
    border:false,
    frame: false,
    width:1100,
    renderTo: Ext.getBody(),
    items: [jxgz,jxwl,jxjj,jxjj1,jxaqcs,jxjsyq]
});
//大修计划检修模型明细
var MXclickW = Ext.create('Ext.window.Window', {
    id: 'MXclickW',
    width: 1700,
    height: 800,
    title: '大修计划检修模型明细',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [gxgrid,dxjhsbright]
});
Ext.onReady(function () {
    Ext.QuickTips.init();
    //border布局 最多可将页面划分为5个区域
    //使用Viewport容器 可自适应页面窗口大小
    //一个页面只可有一个viewport
    new Ext.Viewport({
        title: "border layout",
        layout: "border",
        border:"false",
        defaults: {
            bodyStyle: "background-color: #FFFFFF;",
            frame: true
        },
        items: [northPanel,centerPanel]
    });

    QueryPageLoad();

    Ext.getCmp('zy').on('select',function(){
        CreateProjectCode();
    });

    Ext.getCmp('jhlb').on('select',function(){
        CreateProjectCode();
    });

    Ext.getCmp('sclb').on('select',function(){
        Ext.data.StoreManager.lookup('cpzlStore').load({
            params:{
                V_V_SCLB: Ext.getCmp('sclb').getValue()
            }
        });
    });

    Ext.getCmp('cpzl').on('select',function(){
        Ext.data.StoreManager.lookup('cpgxStore').load({
            params:{
                V_V_SCLB: Ext.getCmp('cpzl').getValue()
            }
        });
    });

    Ext.getCmp('zyq').on('select',function(){
        QueryZyFzr();

        Ext.data.StoreManager.lookup('repairDeptStore').load({
            params:{
                V_V_DEPTCODE:DeptCode
            }
        });
    });

    Ext.getCmp('zy').on('select',function(){
        QueryZyFzr();
    })

});
//加载添加页面
function QueryPageLoad(){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.list!=null){
                Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"年计划编制");
                Year=resp.list[0].V_YEAR;
                OrgCode=resp.list[0].V_ORGCODE;
                OrgName=resp.list[0].V_ORGNAME;
                DeptCode=resp.list[0].V_DEPTCODE;
                fzrPer=resp.list[0].V_SPECIALTYMANCODE;
                //计划类别
                Ext.data.StoreManager.lookup('jhlbStore').on('load',function(){
                    if(resp.list[0].V_JHLB==''){
                        Ext.getCmp('jhlb').select(Ext.data.StoreManager.lookup('jhlbStore').getAt(0));
                    } else{
                        Ext.getCmp('jhlb').select(resp.list[0].V_JHLB);
                    }
                });
                //专业默认值
                Ext.data.StoreManager.lookup('zyStore').on('load',function() {
                    if (resp.list[0].V_SPECIALTY == '') {
                        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
                    } else {
                        Ext.getCmp('zy').select(resp.list[0].V_SPECIALTY);
                    }
                });
                //生产类别
                Ext.data.StoreManager.lookup('sclbStore').on('load',function(){
                    if (resp.list[0].V_SCLB == '') {
                        Ext.getCmp('sclb').select(Ext.data.StoreManager.lookup('sclbStore').getAt(0));
                        Ext.data.StoreManager.lookup('cpzlStore').load({
                            params:{
                                V_V_SCLB: Ext.getCmp('sclb').getValue()
                            }
                        });
                    } else {
                        Ext.getCmp('sclb').select(resp.list[0].V_SCLB);
                        Ext.data.StoreManager.lookup('cpzlStore').load({
                            params:{
                                V_V_SCLB: Ext.getCmp('sclb').getValue()
                            }
                        });
                    }
                });

                Ext.data.StoreManager.lookup('cpzlStore').on('load',function(){
                    if (resp.list[0].V_CPZL == '') {
                        Ext.getCmp('cpzl').select(Ext.data.StoreManager.lookup('cpzlStore').getAt(0));
                        Ext.data.StoreManager.lookup('cpgxStore').load({
                            params:{
                                V_V_CPCODE: Ext.getCmp('cpzl').getValue()
                            }
                        });
                    } else {
                        var num=0;
                        for(var i=0;i<Ext.data.StoreManager.lookup('cpzlStore').data.items.length;i++){
                            if (resp.list[0].V_CPZL == Ext.data.StoreManager.lookup('cpzlStore').data.items[i].data.V_UID){
                                num++;
                            }
                        }
                        if(num>0){
                            Ext.getCmp('cpzl').select(resp.list[0].V_CPZL);
                        }else{
                            Ext.getCmp('cpzl').select(Ext.data.StoreManager.lookup('cpzlStore').getAt(0));
                        }
                        Ext.data.StoreManager.lookup('cpgxStore').load({
                            params:{
                                V_V_CPCODE: Ext.getCmp('cpzl').getValue()
                            }
                        });
                    }
                });

                Ext.data.StoreManager.lookup('cpgxStore').on('load',function(){
                    if (resp.list[0].V_CPGX == '') {
                        Ext.getCmp('cpgx').select( Ext.data.StoreManager.lookup('cpgxStore').getAt(0));
                    } else {
                        Ext.getCmp('cpgx').select( resp.list[0].V_CPGX);
                    }
                });

                Ext.data.StoreManager.lookup('sgfsStore').on('load',function(){
                    if (resp.list[0].V_SGFS == '') {
                        Ext.getCmp('sgfs').select( Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
                    } else {
                        Ext.getCmp('sgfs').select( resp.list[0].V_SGFS);
                    }
                });

                Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
                    if(resp.list[0].V_WXTYPECODE==''){
                        Ext.getCmp('wxlx').select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
                    }else{
                        Ext.getCmp('wxlx').select(resp.list[0].V_WXTYPECODE);
                    }
                });
                //加载检修单位
                Ext.data.StoreManager.lookup('repairDeptStore').load({
                    params:{
                        V_V_DEPTCODE:DeptCode
                    }
                });

                //设置检修单位默认值
                RepairDeptSend();

                Ext.getCmp('ProjectCode').setValue(resp.list[0].V_PORJECT_CODE);
                Ext.getCmp('ProjectName').setValue(resp.list[0].V_PORJECT_NAME);
                Ext.getCmp('content').setValue(resp.list[0].V_CONTENT);

                Ext.getCmp('jhgs').setValue(resp.list[0].V_SUMTIME);
                Ext.getCmp('jhts').setValue(resp.list[0].V_SUMDATE);

                if(resp.list[0].V_BDATE==''){
                    Ext.getCmp('btime').setValue(new Date());
                }else{
                    Ext.getCmp('btime').setValue(resp.list[0].V_BDATE.split(" ")[0]);
                }

                if(resp.list[0].V_EDATE==''){
                    Ext.getCmp('etime').setValue(new Date());
                }else{
                    Ext.getCmp('etime').setValue(resp.list[0].V_EDATE.split(" ")[0]);
                }
                Ext.getCmp('jhfy').setValue(resp.list[0].V_MONEYBUDGET);

                if(resp.list[0].V_MONEYBUDGET=='99'){
                    Ext.getCmp('startFlow').show();
                    Ext.getCmp('agreeFlow').hide();
                    Ext.getCmp('disAgreeFlow').hide();
                }else{
                    Ext.getCmp('startFlow').hide();
                    Ext.getCmp('agreeFlow').show();
                    Ext.getCmp('disAgreeFlow').show();
                }

                QueryZYQ();
                QueryDefect()
                QueryModel();

                QueryMxInfAll();
                QueryGauntt();
                QueryFlow();
            }
        }
    });

    QueryCGrid();
}
//加载专业负责人
function QueryZyFzr(){
    Ext.data.StoreManager.lookup('fzPerStore').load({
        params:{
            V_V_SPECIALTYCODE : Ext.getCmp('zy').rawValue,
            V_V_POSTCODE : '0101020104',
            V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
        }
    });

    Ext.data.StoreManager.lookup('fzPerStore').on('load',function(){
    if(fzrPer==''){
        Ext.getCmp('fzPer').select(Ext.data.StoreManager.lookup('fzPerStore').getAt(0));
    }else{
        Ext.getCmp('fzPer').select(fzrPer);
         }
    });
}
//创建工程编码
function CreateProjectCode(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECTCODE_C',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_ORGCODE:OrgCode,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                Ext.getCmp('ProjectCode').setValue(resp.V_V_PROJECT_OUT);
            }
        }
    });
}
//查询设备
function QueryCGrid(){
    Ext.data.StoreManager.lookup('cgridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//加载作业区下拉
function QueryZYQ(){
    Ext.data.StoreManager.lookup('zyqStore').load({
        params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': OrgCode,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
        Ext.getCmp('zyq').select(DeptCode);
        CreateProjectCode();
        QueryZyFzr();
    })
}
//设置检修单位默认值
function  RepairDeptSend(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_REPAIR_DEPT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.list!=null){
                if(resp.list.length>0){
                    Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
                        Ext.getCmp('repairDept').select(resp.list[0].V_REPAIR_DEPTCODE);
                    });
                }else{
                    Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
                        Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
                    });
                }
            }else{
                Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
                    Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
                });
            }
        }
    });
}
//添加设备
function btnAdd_jdsb(){

    Ext.data.StoreManager.lookup('EquTypeStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue()
        }
    });

    Ext.data.StoreManager.lookup('EquTypeStore').on('load',function(){
        Ext.getCmp('EquType').select( Ext.data.StoreManager.lookup('EquTypeStore').getAt(0));
        QueryEquGrid();
        QueryYxEquGrid();
    });



    Ext.getCmp("btnAdd_jdsb").show();
}
//关闭添加设备win
function winClose(){
    QueryCGrid();
    Ext.getCmp("btnAdd_jdsb").hide();
}
//查询设备
function QueryEquGrid(){
    Ext.data.StoreManager.lookup('sbGridStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:Ext.getCmp('EquType').getValue()
        }
    });
}
//查询已选择的设备
function QueryYxEquGrid(){
    Ext.data.StoreManager.lookup('yxsbGridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//选择设备
function importEqu(a, record, item){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:Guid,
            V_V_EQUTYPECODE:Ext.getCmp("EquType").getValue(),
            V_V_EQUCODE:record.data.V_EQUCODE
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                QueryYxEquGrid();
            }else{
                alert("添加失败");
            }
        }
    });
}
//删除选中设备
function DelEqu(value, metaData, record) {
    return '<a href="#" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')">' + '删除' + '</a>';
}
function _deleteEqu(equcode){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:Guid,
            V_V_EQUCODE:equcode
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                QueryCGrid();
                QueryYxEquGrid();
            }else{
                alert("删除失败");
            }
        }
    });

}
//查看更多设备
function LookMoreEqu(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/MoreEqu.html?guid=' +Guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选中缺陷
function QueryDefect(){
    Ext.data.StoreManager.lookup('qxGridStore').load({
       params:{
           V_V_PROJECT_GUID:Guid
       }
    });
}
//添加缺陷
function btnAdd_tjqx(){
    var num=0;
    var sequ='';
    var equleng=Ext.data.StoreManager.lookup('cgridStore').data.items;
    if(equleng.length>0){

        for(var i=0;i<equleng.length;i++){
            if(i==0){
                sequ=equleng[i].data.V_EQUCODE;
            }else{
                if(sequ.indexOf(equleng[i].data.V_EQUCODE)=='-1'){
                    sequ=sequ+","+equleng[i].data.V_EQUCODE;
                    num++;
                }
            }
        }

        if(num>0){
            QueryQxEquGrid();
            Ext.getCmp("dbtnAdd_tjqx").show();
        }else{

            Ext.data.StoreManager.lookup('qxAddStore').load({
                params:{
                    V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
                    V_V_EQUCODE:sequ,
                    V_V_STATECODE:'10'
                }
            })

            Ext.getCmp("btnAdd_tjqx").show();
        }

    }else{
        alert('请选择设备！');
    }
}
//查询大修设备用于选择缺陷
function QueryQxEquGrid(){
    Ext.data.StoreManager.lookup('qxEquStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//根据设备查询缺陷
function QueryQxByEqu(a, record){
    Ext.data.StoreManager.lookup('dqxgridStore').load({
        params:{
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE:record.data.V_EQUCODE,
            V_V_STATECODE:'10'
        }
    })
}
//单设备保存缺陷
function SaveQx(){
    var selectedRecord = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    var num=0

    for(var i=0;i<selectedRecord.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECT_GUID: selectedRecord[i].data.V_GUID,
                V_V_PROJECT_GUID: Guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                num++;
            }
        });
    }

    if(num==selectedRecord.length){
        winQxClose();
        QueryDefect();
    }

}
//多设备保存缺陷
function OnBtnAddQx(a, record){
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
            if(resp.V_INFO=='SUCCESS'){
                QueryDefect();
            }else{
                alert("添加失败！")
            }
        }
    });
}
//关闭缺陷win
function winQxClose(){
    Ext.getCmp('btnAdd_tjqx').hide();
}
//删除缺陷
function DelDefect(value, metaData, record){
    return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}
function _deleteDefect(DefectGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_DEFECT_GUID:DefectGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryDefect();
            }else{
                alert("删除失败");
            }
        }
    });
}
//查看更多缺陷
function OnLookMoreDefect(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/MoreDefect.html?guid=' +Guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选检修模型
function QueryModel(){
    Ext.data.StoreManager.lookup('mxStore').load({
        params:{
            V_V_PROJECT_GUID:Guid
        }
    })
}
//添加检修模型
function btnAdd_jxmx(){
    QueryMobelAll();
    Ext.getCmp("btnAdd_jxmx").show();
}
//查询该设备类型所有检修模型
function QueryMobelAll(){
    var num=0;
    var sequ='';
    var equleng=Ext.data.StoreManager.lookup('cgridStore').data.items;
    if(equleng.length>0) {

        for (var i = 0; i < equleng.length; i++) {
            if (i == 0) {
                sequ = equleng[i].data.V_EQUCODE;
            } else {
                if (sequ.indexOf(equleng[i].data.V_EQUCODE) == '-1') {
                    sequ = sequ + "," + equleng[i].data.V_EQUCODE;
                }
            }
        }

        Ext.data.StoreManager.lookup('mxAllStore').load({
            params:{
                V_V_ORGCODE:OrgCode,
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPE:'',
                V_V_EQUCODE:sequ
            }
        });
    }else{
        alert('请选择设备！')
    }


}
//添加检修模型
function SaveMx(){
    var selectedRecords=Ext.getCmp('mxAllGrid').getSelectionModel().getSelection();
    if(selectedRecords.length>0){
        var num=0;
        for(var i=0;i<selectedRecords.length;i++){
            Ext.Ajax.request({
                url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_SET',
                method: 'POST',
                async: false,
                params: {
                    V_V_PORJECTGUID:Guid,
                    V_V_MODELGUID:selectedRecords[i].data.V_MX_CODE,
                    V_V_MODELNAME:selectedRecords[i].data.V_MX_NAME,
                    V_V_BBH:selectedRecords[i].data.V_MXBB_NUM,
                    V_V_BZ:selectedRecords[i].data.V_BZ
                },
                success: function (resp) {
                    var resp=Ext.decode(resp.responseText);
                    if(resp.V_INFO=='SUCCESS'){
                        num++;
                    }else{
                        num++;
                        alert('模型'+selectedRecords[i].data.V_MX_NAME+"添加失败！");
                    }
                }
            });

            if(num==selectedRecords.length){
                QueryMxInfAll();
                QueryGauntt();
                winMxClose();
            }
        }

    }else{
        QueryMxInfAll();
        QueryGauntt();
        winMxClose();
    }
}
//关闭检修模型win
function winMxClose(){
    QueryModel();
    Ext.getCmp('btnAdd_jxmx').hide();
}
//删除检修模型
function DelModel(value, metaData, record){
    return '<a href="#" onclick="_deleteModel(\'' + record.data.V_MODEL_GUID + '\')">' + '删除' + '</a>';
}
function _deleteModel(ModelGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_MODEL_GUID:ModelGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryModel();
            }else{
                alert("删除失败");
            }
        }
    });
}
//查看检修模型明细
function MXclick(mxguid){
    QueryJxgx(mxguid);
    Ext.getCmp("MXclickW").show();
}
//查询工序
function QueryGx(a, record){
    Ext.data.StoreManager.lookup('jxgxStore').load({
        params:{
            V_V_JXMX_CODE:record.data.V_MX_CODE
        }
    })
}
function QueryJxgx(mxguid){
    Ext.data.StoreManager.lookup('gxStore').load({
        params:{
            V_V_JXMX_CODE:mxguid
        }
    })
}
//查询工序明细
function QueryGxMx(a, record){
    QueryJxgz(record.data.V_JXGX_CODE);
    QueryJxwl(record.data.V_JXGX_CODE);
    QueryJxaqcs(record.data.V_JXGX_CODE);
    QueryJxjj(record.data.V_JXGX_CODE)
    QueryJxgj(record.data.V_JXGX_CODE)
    QueryJxjsyq(record.data.V_JXGX_CODE)
}
//查询工种
function QueryJxgz(mxguid){
    Ext.data.StoreManager.lookup('jxgzStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询物料
function QueryJxwl(mxguid){
    Ext.data.StoreManager.lookup('jxwlStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询机具
function QueryJxjj(mxguid){
    Ext.data.StoreManager.lookup('jxjjStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询工具
function QueryJxgj(mxguid){
    Ext.data.StoreManager.lookup('jxgjStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询安全措施
function QueryJxaqcs(mxguid){
    Ext.data.StoreManager.lookup('jxaqcsStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询技术要求
function QueryJxjsyq(mxguid){
    Ext.data.StoreManager.lookup('jxjsyqStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询检修模型所需要的所有物料，机具，工具，人员等信息
function QueryMxInfAll(){
   Ext.data.StoreManager.lookup('wlAllStore').load({
      params:{
          V_V_PROJECT_GUID:Guid,
          V_V_TYPE:'WL'
      }
   });

    Ext.data.StoreManager.lookup('jjAllStore').load({
        params:{
            V_V_PROJECT_GUID:Guid,
            V_V_TYPE:'JJ'
        }
    });

    Ext.data.StoreManager.lookup('gjAllStore').load({
        params:{
            V_V_PROJECT_GUID:Guid,
            V_V_TYPE:'GJ'
        }
    });

    Ext.data.StoreManager.lookup('gzAllStore').load({
        params:{
            V_V_PROJECT_GUID:Guid,
            V_V_TYPE:'GZ'
        }
    });


}
//网络施工图
function QueryGauntt(){
    Ext.getCmp('tabwlsgt').removeAll();
    ganttdata=[];
    dateItems=[];
    cmItems=[];
    gmxGuid='';
    startd =0;
    endd=0;
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_TYPE:'GAUNTTTIME'
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.list!=null){
                allTime=resp.list[0].V_PERTIME;
                Ext.Ajax.request({
                    url: AppUrl + '/PM_03/PRO_YEAR_PROJECT_MXUSE_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_PROJECT_GUID:Guid,
                        V_V_TYPE:'GX'
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.list!=null){
                            ganttdata=resp.list;
                            CreateGaunttGrid();
                        }
                    }
                });
            }
        }
    });
}
//创建甘特图表格
function CreateGaunttGrid(){
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
//临时保存
function btnSaveProject(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_MONTH:'',
            V_V_ORGCODE:OrgCode,
            V_V_ORGNAME:OrgName,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_DEPTNAME:Ext.getCmp('zyq').rawValue,
            V_V_PORJECT_CODE:Ext.getCmp('ProjectCode').getValue(),
            V_V_PORJECT_NAME:Ext.getCmp('ProjectName').getValue(),
            V_V_SPECIALTY:Ext.getCmp('zy').getValue(),
            V_V_SPECIALTYNAME:Ext.getCmp('zy').rawValue,
            V_V_SPECIALTYMANCODE:Ext.getCmp('fzPer').getValue(),
            V_V_SPECIALTYMAN:Ext.getCmp('fzPer').rawValue,
            V_V_WXTYPECODE:Ext.getCmp('wxlx').getValue(),
            V_V_WXTYPENAME:Ext.getCmp('wxlx').rawValue,
            V_V_CONTENT:Ext.getCmp('content').getValue(),
            V_V_MONEYBUDGET:Ext.getCmp('jhfy').getValue(),
            V_V_REPAIRDEPTCODE:Ext.getCmp('repairDept').getValue(),
            V_V_BDATE:Ext.Date.format(Ext.getCmp('btime').getValue(),'Y-m-d'),
            V_V_EDATE:Ext.Date.format(Ext.getCmp('etime').getValue(),'Y-m-d'),
            V_V_INMAN:Ext.util.Cookies.get('v_personname2'),
            V_V_INMANCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_SCLB:Ext.getCmp('sclb').getValue(),
            V_V_CPZL:Ext.getCmp('cpzl').getValue(),
            V_V_CPGX:Ext.getCmp('cpgx').getValue(),
            V_V_SGFS:Ext.getCmp('sgfs').getValue(),
            V_V_SFXJ:Ext.getCmp('sfxj').getValue(),

            V_V_ZBFS:'',
            V_V_SZ:'',
            V_V_GUID_UP:'',
            V_V_WBS:'',
            V_V_WBS_TXT:'',
            V_V_SUMTIME:Ext.getCmp('jhgs').getValue(),
            V_V_SUMDATE:Ext.getCmp('jhts').getValue(),
            V_V_SPECIALTY_ZX:'',
            V_V_SPECIALTY_ZXNAME:''
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                alert('保存成功！');
            }
        }
    });
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
//上报
function btnFlowStart(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_YEAR:Year,
            V_V_MONTH:'',
            V_V_ORGCODE:OrgCode,
            V_V_ORGNAME:OrgName,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_DEPTNAME:Ext.getCmp('zyq').rawValue,
            V_V_PORJECT_CODE:Ext.getCmp('ProjectCode').getValue(),
            V_V_PORJECT_NAME:Ext.getCmp('ProjectName').getValue(),
            V_V_SPECIALTY:Ext.getCmp('zy').getValue(),
            V_V_SPECIALTYNAME:Ext.getCmp('zy').rawValue,
            V_V_SPECIALTYMANCODE:Ext.getCmp('fzPer').getValue(),
            V_V_SPECIALTYMAN:Ext.getCmp('fzPer').rawValue,
            V_V_WXTYPECODE:Ext.getCmp('wxlx').getValue(),
            V_V_WXTYPENAME:Ext.getCmp('wxlx').rawValue,
            V_V_CONTENT:Ext.getCmp('content').getValue(),
            V_V_MONEYBUDGET:Ext.getCmp('jhfy').getValue(),
            V_V_REPAIRDEPTCODE:Ext.getCmp('repairDept').getValue(),
            V_V_BDATE:Ext.Date.format(Ext.getCmp('btime').getValue(),'Y-m-d'),
            V_V_EDATE:Ext.Date.format(Ext.getCmp('etime').getValue(),'Y-m-d'),
            V_V_INMAN:Ext.util.Cookies.get('v_personname2'),
            V_V_INMANCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_JHLB:Ext.getCmp('jhlb').getValue(),
            V_V_SCLB:Ext.getCmp('sclb').getValue(),
            V_V_CPZL:Ext.getCmp('cpzl').getValue(),
            V_V_CPGX:Ext.getCmp('cpgx').getValue(),
            V_V_SGFS:Ext.getCmp('sgfs').getValue(),
            V_V_SFXJ:Ext.getCmp('sfxj').getValue(),
            V_V_ZBFS:'',
            V_V_SZ:'',
            V_V_GUID_UP:'',
            V_V_WBS:'',
            V_V_WBS_TXT:'',
            V_V_SUMTIME:Ext.getCmp('jhgs').getValue(),
            V_V_SUMDATE:Ext.getCmp('jhts').getValue(),
            V_V_SPECIALTY_ZX:'',
            V_V_SPECIALTY_ZXNAME:''
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                Ext.Ajax.request({
                    url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_STATE_SEND',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID:Guid,
                        V_V_STATECODE:'1'
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.V_INFO=='SUCCESS'){
                            Ext.Ajax.request({
                                url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SET',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID:Guid,
                                    V_V_FLOWCODE:'1',
                                    V_V_FLOWNAME:'上报',
                                    V_V_IDEA:'请审批',
                                    V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
                                    V_V_INPERNAME:Ext.util.Cookies.get('v_personname2'),
                                    V_V_NEXTPERCODE:'',
                                    V_V_NEXTPERNAME:''
                                },
                                success: function (resp) {
                                    var resp=Ext.decode(resp.responseText);
                                    if(resp.V_INFO=='SUCCESS'){
                                        alert('上报成功！');
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
//审批通过
function btnFlowAgree(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_FLOWCODE:'1',
            V_V_FLOWNAME:'审批通过',
            V_V_IDEA:'请审批',
            V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_INPERNAME:Ext.util.Cookies.get('v_personname2'),
            V_V_NEXTPERCODE:'',
            V_V_NEXTPERNAME:''
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                alert('审批成功！');
            }
        }
    });
}
//审批驳回
function btnFlowDisAgree(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
            V_V_FLOWCODE:'1',
            V_V_FLOWNAME:'审批驳回',
            V_V_IDEA:'请审批',
            V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_INPERNAME:Ext.util.Cookies.get('v_personname2'),
            V_V_NEXTPERCODE:'',
            V_V_NEXTPERNAME:''
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                alert('驳回成功！');
            }
        }
    });
}
function QueryFlow(){
    Ext.data.StoreManager.lookup('flowStore').load({
        params:{
            V_V_GUID:Guid
        }
    })
}
//查看更多模型
function LookMoreModel(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/MoreModel.html?guid=' +Guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//附件管理
function btnAdd_file(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/file.html?guid=' +Guid +'&type=YEAR&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}