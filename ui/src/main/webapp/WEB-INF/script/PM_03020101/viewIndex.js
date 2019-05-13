var wxGuid="";
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
var itemsPerpage=50;
var fjDefect="";

if(Ext.urlDecode(location.href.split('?')[1])!=null){
    wxGuid=Ext.urlDecode(location.href.split('?')[1]).wxGuid==null?"":Ext.urlDecode(location.href.split('?')[1]).wxGuid;
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
//厂矿计划数据加载
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
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
    },
    listeners:{
        load:function(store, records, success, eOpts){
            OrgCode = store.getAt(0).data.V_DEPTCODE;
            OrgName=store.getAt(0).data.V_DEPTNAME;
            Ext.getCmp('ck').select(store.first());
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
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE','V_EQUSITENAME'],
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
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE','V_EQUSITENAME'],
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
var fzPerStore=  Ext.create("Ext.data.Store", {
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
        },
        extraParams: {}
    },
    listeners: {
        load: function (store, records, success, eOpts) {
            if( store.getAt(0)==undefined){
                Ext.getCmp('fzPer').select(''); return;
            }else{
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                Ext.getCmp('fzPer').select(store.first());
            }

        }

    }
});
//     Ext.create('Ext.data.Store', {
//     autoLoad: false,
//     storeId: 'fzPerStore',
//     fields: ['V_PERSONCODE', 'V_PERSONNAME'],
//     proxy: {
//         type: 'ajax',
//         async: false,
//         url: AppUrl + 'PM_22/PRO_BASE_SPECIALTYTOPERSON_SEL',
//         actionMethods: {
//             read: 'POST'
//         },
//         reader: {
//             type: 'json',
//             root: 'list'
//         }
//     }
// });
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
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG','DEF_SOLVE','BJ_STUFF','PASSNUM','NOPASSNUM'
        ,'DEFILENUM','PASS_STATE','PASS_STATENAME'],
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
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE','V_EQUSITENAME'],
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
//不含设备的缺陷查找
var dqxgridStore2=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'dqxgridStore2',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME','V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_DEPTCODE', 'V_EQUNAME','V_EQUCODE', 'V_IDEA', 'V_STATECODE',
        'V_GUID', 'V_EQUSITE', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE', 'V_INPERCODE', 'V_INPERNAME',
        'V_EQUTYPECODE', 'V_ORGCODE', 'V_HOUR', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_FLAG',
        'V_PROC_WAY'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PRO_PM_DEFECT_SPECIL_SEL',
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
});
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
});
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
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
        },
        extraParams:{
            V_V_GUID:wxGuid,
            V_V_FILEGUID:'',
            V_V_FILENAME:'',
            V_V_TYPE:'' //type
        }
    }
});

Ext.data.StoreManager.lookup('gridStore').on('load',function(store, records, success, eOpts){
    Ext.getCmp('fjsl').setText(store.getProxy().getReader().rawData.V_COUNT);
});

var yearStore=Ext.create('Ext.data.Store', {
    id:'yearStore',
    autoLoad: false,
    fields: ['ID_GUID', 'ORGCODE','ORGNAME','DEPTCODE','DEPTNAME','ZYCODE','ZYNAME','EQUCODE','V_EQUNAME','EQUTYPE',
        'V_EQUTYPENAME','REPAIRCONTENT','PLANHOUR','REPAIRTYPE','REPAIRTYPENAME','INPERCODE','INPERNAME','INDATE',
        'STATE','STATENAME','REMARK','V_FLOWCODE','V_FLOWTYPE','MXCODE','PLANTYPE','V_YEAR', 'V_MONTH',
        'PLANTJMONTH','PLANJGMONTH','WXTYPECODE','WXTYPENAME','PTYPECODE','PTYPENAME','PLANDAY','REDEPTCODE','REDEPTNAME',
        'FZPERCODE','FZPERNAME','SGTYPECODE','SGTYPENAME','SCLBCODE','SCLBNAME','PRO_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_SEL_SPFINISH',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET'
        }
        // ,
        // extraParams:{
        //     V_V_ORGCODE:  Ext.getCmp('zyq').getValue().toString().substring(0,4),
        //     V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        //     V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        //     V_V_ZY: ''
        // }
    }
});
var fileview=Ext.create("Ext.data.Store", {
    autoLoad: false,
    id: 'fileview',
    fields: ['FILE_CODE', 'FILE_NAME', 'FILE_TYPE', 'INSERT_DATE', 'INSERT_PERSON'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/DEFECT_UPFILE_SELECT',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            V_GUID: fjDefect
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    id:'northPanel',
    titleAlign:'center',
    // height:60,
    // bodyStyle:'background:#f2f2f2; border-bottom:1px solid #f4f4f4',
    // style:'background-color:rgb(229,236,240)',
    // border:'5px',
    // bodyStyle:'border:3px solid rgb(2,29,132)',
    bodyCls:'border_wid',
    bodyStyle: 'background:rgb(229,236,240);padding:2px;', //padding:10px;
    // padding:'0 0 5 0',
    // margin:'0px',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 5 8' },
        // {
        //     xtype: 'button',
        //     text: '检修模型',
        //     margin: '0 0 5 0',
        //     // iconCls:'Tablegear',
        //     iconCls:'buttonmenu',
        //     icon:dxImgPath + '/jxmx.png',
        //     // icon: imgpath + '/search.png'
        //     handler:btnAdd_jxmx
        // },
        // {
        //     xtype: 'button',
        //     text: '添加设备',
        //     margin: '0 0 5 0',
        //     bodyStyle:'float:right;',
        //     // iconCls:'Tableadd',
        //     iconCls: 'buy-button',
        //     icon:dxImgPath + '/tjsb.png',
        //     handler:btnAdd_jdsb
        // },
        // {
        //     xtype: 'button',
        //     text: '添加缺陷',
        //     margin: '0 0 5 0',
        //     bodyStyle:'float:right;',
        //     // iconCls:'Tableadd',
        //     iconCls: 'buy-button',
        //     icon:dxImgPath + '/tjsb.png',
        //     handler:btnAdd_tjqx
        // },
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 5 8' },
        // {
        //     xtype: 'button',
        //     text: '临时保存',
        //     margin: '0 0 5 0',
        //     // iconCls:'Tablesave',
        //     iconCls: 'buy-button',
        //     icon:dxImgPath + '/lsbc.png',
        //     handler:btnSaveProject
        // },
        //
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 5 8' },
        // {
        //     xtype: 'button',
        //     text: '计划选择',
        //     iconCls: 'buy-button',
        //     // icon:dxImgPath + '/tjsb.png',
        //     icon: imgpath + '/add.png',
        //     listeners: {click: OnButtonPlanAddClicked}
        // },
        /*{
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
        },*/
        // {
        //     xtype: 'button',
        //     text: '附件',
        //     margin: '5 10 5 0',
        //     iconCls:'Tablegear',
        //     iconCls: 'buy-button',
        //     icon:dxImgPath + '/fj.png',
        //     handler:btnAdd_file
        // },
        {xtype:'label',id:'label11',width:55,text:'附件数量'},{xtype:'label',
            id:'fjsl',
            width:30,
            margin: '5 0 5 0'}
        //     ,
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 5 8' },
        // {
        //     xtype: 'button',
        //     id:'startFlow',
        //     text: '上报',
        //     margin: '0 0 5 0',
        //     iconCls: 'buy-button',
        //     icon:dxImgPath + '/wlmx.png',
        //     handler:btnFlowStart
        // }
    ]
});
/*项目信息*/
var LTpanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    width:'100%',
    frame: false,
    border:false,
    layout: 'column',

    defaults: {labelAlign: 'right'},
    // bodyStyle:"background:#f2f2f2",
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
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            margin:'5 5 5 0',
            width: 250
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
            // ,hidden:true
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
var Toolpanel = Ext.create('Ext.grid.Panel', {
    region: 'north',
    // frame: false,
    // border: false,
    // layout: 'column',
    // height:32,
    // width:'100%',
    // margin:'0',
    // // bodyStyle:'border:3px solid rgb(2,29,132)',
    // bodyStyle:'background: #f2f2f2',
    // // bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    // defaults: {labelAlign: 'right'},
    // collapsible: false,
    store:cgridStore,
    border:false,
    // store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft},
        {text: '设备检修历史',dataIndex:'V_EQUCODE',width:160,renderer:machistory}, //dataIndex:'cksbjxmx'
        {text: '固定资产',dataIndex:'gdzc',width:160,renderer:gdzcdetail}
        // {,text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
    ],
    height: 150,
    width: '100%',
    tbar: [
        '相关设备',
        { xtype: 'tbfill' ,style:'background-color:red'},
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            // margin: '5 0 5 0',
            bodyStyle:'float:right;',
            // iconCls:'Magnifierzoomin',
            // icon:APP + '/app/pm/css/images/search.png',
            icon:dxImgPath + '/search.png',
            listeners:{click:LookMoreEqu}
        }
    ]
});
/*设备表格*/
// var centerPanel = Ext.create('Ext.grid.Panel', {
//     region: "north",
//     id:'cgrid',
//     store:cgridStore,
//     split: true,
//     width:'100%',
//     margin:'0px',
//     height:150,
//     columnLines: true,
//     border: true,
//     columns: [
//         {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
//         {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
//         {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
//         {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft},
//         {text: '设备检修历史',dataIndex:'V_EQUCODE',width:160,renderer:machistory}, //dataIndex:'cksbjxmx'
//         {text: '固定资产',dataIndex:'gdzc',width:160,renderer:gdzcdetail},
//         {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
//     ]
// });
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

    // bodyStyle:'background-color:#f2f2f2',
    baseCls:'textareaStyle',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [
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
    // bodyStyle:'background:#f2f2f2 !important;',
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
        },{
            xtype: 'numberfield',
            id:'bjf',
            fieldLabel: '备件费',
            labelWidth: 60,
            width:170,
            margin:'5 5 5 20',
            value:0,
            listeners:{
                change:MoneyChange
            }
        },{
            xtype: 'numberfield',
            id:'clf',
            fieldLabel: '材料费',
            margin:'5 5 5 15',
            labelWidth: 60,
            width:170,
            value:0,
            listeners:{
                change:MoneyChange
            }
        },{
            xtype: 'numberfield',
            id:'sgfy',
            fieldLabel: '施工费用',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            value:0,
            listeners:{
                change:MoneyChange
            }
        },
        {
            xtype: 'textfield',
            id:'tzze',
            fieldLabel: '投资总额',
            margin:'5 5 5 15',
            labelWidth :60,
            width:240,
            readOnly:true
        }, {
            xtype : 'numberfield',
            id:'jhgs',
            fieldLabel : '计划工时',
            margin:'5 5 5 10',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            value:0
        },
        {
            xtype : 'numberfield',
            id:'jhts',
            fieldLabel : '计划天数',
            labelWidth: 60,
            width:170,
            margin:'5 5 5 20',
            labelAlign : 'right',
            value:0
        }
    ]
});
/*查看更多缺陷*/
var TOPGIRDRIGHTTtool = Ext.create('Ext.grid.Panel', {//form
    // region: 'north',
    // frame: false,
    // border: false,
    // layout: 'column',
    // height:32,
    // width:'100%',
    // margin:'0',
    // bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    // defaults: {labelAlign: 'right'},
    // collapsible: false,
    id:'TOPGIRDRIGHTTtool',
    columnLines:true,
    border:false,
    store: qxGridStore,
    autoScroll:true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '缺陷code',width: 140, dataIndex: 'V_GUID', align: 'center',renderer:atleft,hidden:true},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft,hidden:true},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft,hidden:true},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
        {text:'解决方案',width:140,dataIndex:'DEF_SOLVE',align:'center',renderer:atleft
        // ,editor:{
        //         xtype: 'textfield',id: 'defsove',labelAlign: 'right',allowBlank:false
        //     }
            },
        {text:'备件材料',width:140,dataIndex:'BJ_STUFF',align:'center',renderer:atleft
            // ,editor:{
            //     xtype: 'textfield',id: 'bjstuff',labelAlign: 'right',allowBlank:false
            // }
        },
        // {text: '删除',width: 120, dataIndex: 'I_ID',  align: 'center',renderer:DelDefect},
        {text: '上传附件',width: 120, dataIndex: 'DEFILENUM',align: 'center',renderer:upfilefun}
    ],
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        listeners: {
            // beforeedit:function (editor, context, eOpts) {
            //     if(context.record.get('D_MONTH')!=date.getMonth()+1&&context.record.get('D_YEAR')==date.getFullYear()){
            //         alert("非本月数据无法修改");return false;
            //     }
            // },
            edit: OnChangeEleData
        }
    })],
    height:240, //'100%',//132,
    width: '100%',
    tbar: [
        '缺陷明细',
        { xtype: 'tbfill' },
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            // margin: '5 0 5 0',
            bodyStyle:'float:right;',
            icon:dxImgPath + '/search.png',
            // iconCls:'Magnifierzoomin',
            listeners:{click:OnLookMoreDefect}
        }
    ]
});
/*缺陷表格*/
// var TOPGIRDRIGHTtable = Ext.create('Ext.grid.Panel', {
//     id:'qxgrid',
//     store:qxGridStore,
//     region: "center",
//     split: true,
//     width:'100%',
//     margin:'0px',
//     columnLines: true,
//     border: true,
//     columns: [
//         {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
//         {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
//         {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
//         {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
//         {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
//         {text: '删除',width: 120, dataIndex: 'V_GUID', align: 'center',renderer:DelDefect}
//     ]
// });
var TOPGIRDRIGHT = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    layout: 'vbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    // items: [TOPGIRDRIGHTTtool,TOPGIRDRIGHTtable]
    items: [TOPGIRDRIGHTTtool]
});
var ToolpanelD = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHT]
});
/*左上布局*/
var Leftdivtop = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    height:'100%',
    renderTo: Ext.getBody(),
    items: [LTpanel,Toolpanel,ToolpanelB,ToolpanelC,ToolpanelD]
    // [LTpanel,Toolpanel,gcxmwlsgt,ToolpanelB,ToolpanelC,ToolpanelD]
});
//检修模型
// var jxmx1 = Ext.create('Ext.grid.Panel', {
//     id:'mxgrid',
//     region: "center",
//     split: true,
//     width:'100%',
//     margin:'0px',
//     store:mxStore,
//     columnLines: true,
//     border: false,
//     columns: [
//         {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
//         {text: '模型名称',width: 200, dataIndex: 'V_MODEL_NAME', align: 'center',renderer:atleft},
//         {text: '版本号',width: 140, dataIndex: 'V_MODEL_BBH', align: 'center',renderer:atleft},
//         {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
//         {text: '查看明细',renderer:function(value,metaData,record){
//                 return '<a href="#" onclick="MXclick(\'' + record.data.V_MODEL_GUID +','+record.data.V_MODEL_NAME+','+record.data.V_MODEL_BBH+'\')">'+'查看详细'+'</a>'
//             }},
//         {text: '删除',width: 120, dataIndex: 'V_MODEL_GUID', align: 'center',renderer:DelModel}
//     ]
// });
var jxmx2 = Ext.create('Ext.grid.Panel', {
    // frame: false,
    // border: false,
    // layout: 'column',
    // height:32,
    // width:'100%',
    // margin:'0',
    // bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    // defaults: {labelAlign: 'right'},
    // collapsible: false,
    height:'40%',
    store:mxStore,
    columnLines: true,
    region: 'north',
    autoScroll:true,
    // border: false,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MODEL_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 140, dataIndex: 'V_MODEL_BBH', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MODEL_GUID +','+record.data.V_MODEL_NAME+','+record.data.V_MODEL_BBH+'\')">'+'查看详细'+'</a>'
            }},
        {text: '删除',width: 120, dataIndex: 'V_MODEL_GUID',  align: 'center',renderer:DelModel}
    ],
    // height: 300,
    width: '100%',
    tbar: [
        '相关检修模型',
        { xtype: 'tbfill' },
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            // margin: '5 0 5 0',
            bodyStyle:'float:right;',
            // iconCls:'Magnifierzoomin',
            icon:dxImgPath + '/search.png',
            listeners:{click:LookMoreModel}
        }
    ]
});
//物料明细按钮
var wlmxcd = Ext.create('Ext.form.Panel', {
    region: 'north',
    layout: 'column',
    // bodyStyle:'background:#f2f2f2',
    border:false,
    frame:false,
    // style:'top:1px',
    height:40,
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 0 8' },
        {
            xtype: 'button',
            text: '物料明细',
            margin: '0 0 5 0',
            // iconCls:'Tablecolumn'
            icon:dxImgPath + '/wlmx.png'
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 0 8' },
        {
            xtype: 'button',
            text: '作业区库存明细',
            margin: '0 0 5 0',
            // iconCls:'Tablecell'
            icon:dxImgPath + '/zyqkcmx.png'
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'3 8 0 8' },
        {
            xtype: 'button',
            text: '厂矿库存明细',
            margin: '0 0 5 0',
            // iconCls:'Tablelightning'
            icon:dxImgPath + '/ckkcmx.png'
        }/*,
        // { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '其它厂矿库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablesort'

        }*/
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
    border:true,
    columnLines: true,
    style:'top:1px',
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
    // region:'center',
    frame:false,
    border:false,
    region: 'north',
    bodyCls:'borderff',
    width: '100%',
    height:window.innerHeight /2,
    renderTo: Ext.getBody(),
    items: [{
        title: '物料明细',
        id:'tabwl',
        layout:'border',
        border:false,
        // style:'top:1px',
        // items:[wlmxcd,wlmxgird]
        items:[wlmxgird]
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
    }/*, {
        title: '审批流程',
        id:'tabsplc',
        layout:'border',
        items:[flowgird]
        }*/
    ]
});
var qsPanel=Ext.create('Ext.panel.Panel', {
    id:'qsPanel',
    height:'20%',
    // bodyStyle:'border-top:1px solid #d4d4d4 !important',
    renderTo: Ext.getBody(),
    region: 'north',
    layout: 'column',
    width:'100%',
    autoScroll:true,
    baseCls:'textareaStyle',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [
        {
            xtype     : 'textareafield',
            id:'qstext',
            grow      : true,
            name      : 'message',
            fieldLabel: '维修工程请示',
            anchor    : '100%',
            margin:'5 5 5 20',
            labelWidth :50,
            width:750,
            height:150
        }
    ]
});
var Rightdivtop = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:true,
    height:'40%',
    bodyStyle:'border-top:1px solid #d4d4d4 !important',
    renderTo: Ext.getBody(),
    items: [Rightdivbtm]
});
var Rightdivbtm1 = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:false,
    height:"40%",
    title:'维修计划编制设置',
    // bodyStyle:'background:#f2f2f2;',
    renderTo: Ext.getBody(),
    items: []
});
var Leftdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'west',
    width:'57%',
    border:false,
    border:'3px',
    bodyStyle:'border:3px solid rgb(2,29,132)',
    // items: [Leftdivtop,jxmx2,jxmx1],
    // items: [Leftdivtop,jxmx2],
    items: [Leftdivtop],
    renderTo: Ext.getBody()
});
var Rightdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    width:'43%',
    border:false,
    // items: [Rightdivtop,Rightdivbtm1],
    items:[qsPanel,jxmx2,Rightdivtop],
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
    frame:false,
    border:true,
    width:'100%',
    tbar:[{ xtype: 'combo',fieldLabel: '设备类型',store: EquTypeStore,id:'EquType',editable : false,queryMode : 'local',displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE',labelWidth: 75, width:265,margin:'5 5 5 0',labelAlign:'right'},
        {xtype: 'button',text: '查询', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Magnifierzoomin',*/ iconCls: 'buy-button',icon:dxImgPath + '/search.png',listeners:{click:QueryEquGrid}},
        {xtype: 'button',text: '确认返回', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tablesave' ,*/iconCls: 'buy-button',icon:dxImgPath + '/tjsb.png',listeners:{click:winClose}}]
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
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEquTj}
    ]
});
var btnAdd_jdsb = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jdsb',
    width: 1700,
    height: 675,
    title: '大修计划设备添加',
    modal: true,
    frame: true,
    border:false,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [sbPanel,sbGrid,yxsbGrid]
});
//单设备缺陷添加
var tjqxpanel=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    frame:false,
    border:true,
    width:'100%',
    tbar:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tablesave' ,*/iconCls: 'buy-button',icon:dxImgPath + '/back.png',listeners:{click:SaveQx}},
        {xtype: 'button',text: '关闭', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tabledelete' ,*/iconCls: 'buy-button',icon:dxImgPath + '/close.png',listeners:{click:winQxClose}}]
});
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
        {text: '功能位置',width: 260, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft}
    ],listeners:{itemclick:QueryQxByEqu}

});
var tjqxgrid1 = Ext.create('Ext.grid.Panel', {
    id:'tjqxgrid1',
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

var tjqxNequGrid = Ext.create('Ext.grid.Panel', {
    id:'tjqxNequGrid',
    store:dqxgridStore2,
    region: "center",
    split: true,
    width:540,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        // {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
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
//不含设备的添加缺陷弹出窗口
var dbtnAdd_tjqx2 = Ext.create('Ext.window.Window', {
    id: 'dbtnAdd_tjqx2',
    width: 1100,
    height: 600,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [tjqxNequGrid]
});
//检修模型确认返回
var mxpanle=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    // frame:true,
    border: true,
    // bodyCls:'border_wid',
    width:'100%',
    tbar:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tablesave'*/iconCls: 'buy-button',icon:dxImgPath + '/back.png',listeners:{click:SaveMx}},
        {xtype: 'button',text: '关闭', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tabledelete'*/ iconCls: 'buy-button',icon:dxImgPath + '/close.png',listeners:{click:winMxClose}}]
});
//检修模型表单1
var mxAllGrid = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width:'100%',
    // margin:'0px',
    height:280,
    id:'mxAllGrid',
    store:mxAllStore,
    columnLines: true,
    border: false,
    selType:'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MX_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 100, dataIndex: 'V_MXBB_NUM', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MX_CODE +','+record.data.V_MX_NAME+','+record.data.V_MXBB_NUM+'\')">'+'查看详细'+'</a>'
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
    // margin:'0px',
    // height:150,
    columnLines: true,
    border: false,
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
    width:590,
    height:'100%',
    margin:'0px',
    columnLines: true,
    border : true,
    bodyStyle:'border-width: 0 1px 0 0;border-style: solid;border-color: #c0c0c0;',
    frame:false,
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
        //'检修人员',
        {xtype:'label',text:'检修人员',style:'font-weight:bolder;'},
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
        // '检修机具',
        {xtype:'label',text:'检修机具',style:'font-weight:bolder;'},
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
        //'检修工具',
        {xtype:'label',text:'检修工具',style:'font-weight:bolder;'},
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
        //'检修物料',
        {xtype:'label',text:'检修物料',style:'font-weight:bolder;'},
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
    // height:90,
    height:'100%',
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
    height:'100%',
    renderTo: Ext.getBody(),
    // items: [jxaqcstool1,jxaqcsgrid]//
    items:[jxaqcsgrid]
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
    height:'100%',
    margin:'0px',
    // height:170,
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
    height:'100%',
    renderTo: Ext.getBody(),
    //items: [jxjsyqtool1,jxjsyqgrid]//
    items:[jxjsyqgrid]
});
//大修计划右边布局
var dxjhsbright = Ext.create('Ext.panel.Panel', {
    region:'east',
    border:false,
    frame: false,
    width:1100,
    height:'100%',
    renderTo: Ext.getBody(),
    items: [jxgz,jxwl,jxjj,jxjj1]
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
var mxfileStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxfileStore',
    fields: ['V_FILEGUID', 'V_FILENAME', 'V_TYPE', 'FNAME', 'V_INPERCODE', 'V_INPERNAME', 'V_MODE_GUID','V_INTIME'],
    proxy: {
        type: 'ajax',
        async: false,
        url:AppUrl+'dxfile/PM_MODEL_FILE_SEL_DXF',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
// //----附件上传工具
/*var toolbar=Ext.create("Ext.form.Panel",{
    id:'toolbar',
    border:false,
    region:'north',
    frame: true,
    height:45,
    layout: 'column',
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    items:[{xtype:'combobox',id:'fjtype',store:ftypeStore,queryMode:'local',fieldLabel:'附件类型',valueField:'ID',displayField:'FNAME',width:260,labelAlign:'right',labelWidth:80,style:'margin:5px 2px 5px 5px',listeners:{select:function(){querymxfj(mx_code);}}},
        {
            xtype : 'filefield',
            id : 'upload',
            name : 'upload',
            fieldLabel : '文件上传',
            labelAlign:'right',
            width : 300,
            msgTarget : 'side',
            allowBlank : true,
            anchor : '100%',
            buttonText : '浏览....',
            style : ' margin: 5px 0px 5px 8px'
        }, {
            xtype : 'button',
            width : 60,
            text : '上传',
            style : ' margin: 5px 0px 5px 10px',
            handler : function () {
                var toolbarpan = Ext.getCmp('toolbar');
                if(Ext.getCmp('fjtype').getValue()=="%"){
                    { Ext.Msg.alert('提示信息','请选择上传附件类型'); return}
                }
                if(Ext.getCmp('upload').getValue()==''||Ext.getCmp('upload').getValue()==null||Ext.getCmp('upload').getValue()==undefined){
                    Ext.Msg.alert('提示信息', '请选择要的上传文件');
                    return;
                }else{
                    toolbarpan.submit({
                       url: AppUrl + 'dxfile/PM_MODEL_FILE_ADD',
                        async: false,
                        method: 'POST',
                        params : {
                            V_V_MODE_GUID:mx_code,
                            V_V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
                            V_V_INPERNAME:Ext.util.Cookies.get('v_personname2'),
                            V_V_TYPE:Ext.getCmp('fjtype').getValue()
                        },
                        success: function (response) {
                        }
                    });
                    querymxfj(mx_code);
                }
            }
        }, {
            xtype: 'button',
            text: '刷新',
            width : 60,
            style : ' margin: 5px 0px 5px 10px',
            listeners: {click: function(){querymxfj(mx_code);}}
        }, {
            xtype: 'button',
            text: '删除',
            width : 60,
            style : ' margin: 5px 0px 5px 10px',
            listeners: {click: _OnButtonDel}
        }]
});*/
//----附件查询表格
var mxfilegrid=Ext.create('Ext.grid.Panel',{
    id:'mxfilegrid',
    // height:340,
    width:'100%',
    height:'100%',
    region:'center',
    autoScroll:true,
    columnLines: true,
    store:mxfileStore,
    style:'text-align:center;',
    columns:[{xtype: 'rownumberer', text: '序号', width : 50,align:'center'},
        {text:'文件编码',dataIndex:'V_FILEGUID',align:'center',width:50,hidden:true},
        {text:'文件名称',dataIndex:'V_FILENAME',align:'center',width:160},
        {text:'类型名称',dataIndex:'FNAME',align:'center',width:160},
        {text:'上传时间',dataIndex:'V_INTIME', align:'center', width:150,
            renderer:function(value, metaData, record, rowIdx, colIdx, store, view){
                return value.toString().substring(0,10);
            }},
        {text:'附件类型',dataIndex:'FNAME',align:'center',width:100}
        //,{text:'操作',dataIndex:'V_FILEGUID',align:'center',width:150,renderer:operation}
    ]
});
//--------模型附件panel
// var mxfilepanel=Ext.create('Ext.panel.Panel',{
//     id:'mxfilepanel',
//     region:'center',
//     width:'100%',
//     layout:'border',
//     border:false,
//     frame: true,
//     items:[mxfilegrid]
// });
//大修计划检修模型明细窗口tabpanel
var tebpanel=Ext.create('Ext.tab.Panel',{
    id:'tabpanel',
    region:'center',
    border:false,
    frame:false,
    enableTabScroll:true,
    bodyCls:'borderff',
    defaults:{ autoScroll:true},
    items:[{id:'tab1',title:'检修模型明细',layout:'border',frame:false,border:false,items:[gxgrid,dxjhsbright]},
        {id:'tab2',title:'检修技术标准',items:[jxjsyq]},
        { id:'tab3',title:'检修安全措施',items:[jxaqcs]}
        ,{id:'tab4',title:'检修附件明细',items:[mxfilegrid]}]

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
    items:[tebpanel]
});
var filegrid=Ext.create("Ext.grid.Panel", {
    id: 'filegrid',
    region: 'center',
    height: '100%',
    width: '100%',
    columnLines: true,
    store: fileview,
    autoScroll: true,
    margin: '10px 0px 0px 15px',
    //colspan: 3,
    columns: [{
        text:'附件编码',
        hide:true,
        dataIndex:'FILE_CODE'
    },{
        text: '附件名称',
        flex: 0.6,
        width:340,
        id : 'fjname',
        align: 'center',
        dataIndex: "FILE_NAME"
        //renderer: _downloadRander
    }, {
        text: '操作',
        flex: 0.4,
        width:340,
        align: 'center',
        renderer: _delRander
    }]
});
var win=Ext.create('Ext.window.Window',{
    id:'win',
    title:'附件添加窗口',
    closeAction:'hide',
    layout: 'vbox',
    width: 880,
    height: 400,
    modal: true,
    plain: true,
    bodyPadding: 10,
    items: [{
        xtype: 'form',
        id:'uploadFile',
        region: 'north',
        layout: 'hbox',
        fileUpload:true,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: "filefield",
            name: 'V_V_BLOB',
            id: "V_V_BLOB",
            enctype: "multipart/form-data",
            fieldLabel: "上传附件",
            fileUpload: true,
            allowBlank: false,
            labelWidth: 100,
            width: 440,
            labelStyle: 'color:red;font-weight:bold',
            margin: '5px 0px 5px 5px',
            emptyText: '请选择文件',
            buttonText: '浏览',
            invalidText: '文件格式不正确'
        }, {
            id: 'insertFilesFj2',
            xtype: 'button',
            text: '上传',
            style: ' margin: 5px 0px 0px 15px',
            handler: _upLoadFile
        }, {
            xtype: 'hidden',
            name: 'V_GUID',
            id: 'V_GUID'
        }, {
            xtype: 'hidden',
            name: 'V_FILENAME',
            id: 'V_FILENAME'
        },  {
            xtype: 'hidden',
            name: 'V_PLANT',
            id: 'V_PLANT'
        }, {
            xtype: 'hidden',
            name: 'V_DEPT',
            id: 'V_DEPT'
        }, {
            xtype: 'hidden',
            name: 'V_PERSONCODE',
            id: 'V_PERSONCODE'
        }/*, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }*/

        ]
    } ,{
        columnWidth: 1,
        height: 380,
        width: 800,
        items: filegrid
    }],
    closable: true,
    model: true
});
Ext.onReady(function () {
    Ext.QuickTips.init();

    //border布局 最多可将页面划分为5个区域
    //使用Viewport容器 可自适应页面窗口大小
    //一个页面只可有一个viewport
    new Ext.Viewport({
        title: "border layout",
        layout: "border",
        border:false,
        defaults: {
            bodyStyle: "background-color: #FFFFFF;",
            frame: false
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
    });
    var workStore = Ext.create('Ext.data.Store', {
        id : 'workStore',
        pageSize : itemsPerpage,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM','PLANTIME','FACTTIME'],

        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'dxfile/PM_EDUNOTOWORKORDER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total: 'total'
            }
        }
    });
    var workgrid=Ext.create('Ext.grid.Panel',{
        id: 'workgrid',
        columnLines: true,
        width:'100%',
        height:405,
        autoScroll: true,
        region:'center',
        store:workStore,
        columns:[
            {
                xtype : 'rownumberer',
                width : 30,
                sortable : false
            },{
                text : '工单GUID(隐藏)',
                dataIndex:'V_ORDERGUID',
                align : 'center',
                hidden : true
            }, {
                text : '工单号',
                dataIndex:'V_ORDERID',
                width : 100,
                align : 'center'
            },  {
                text : '子工单数量',
                dataIndex:'WORKORDERNUM',
                width : 90,
                align : 'center'
            }, {
                text : '工单描述',
                dataIndex:'V_SHORT_TXT',
                width : 300,
                align : 'left'
            }, {
                text : '设备编号（隐藏）',
                dataIndex:'V_EQUIP_NO',
                align : 'center',
                hidden : true
            }, {
                text : '设备名称',
                dataIndex:'V_EQUIP_NAME',
                width : 100,
                align : 'center'
            }, {
                text : '设备位置',
                dataIndex:'V_EQUSITENAME',
                width : 200,
                align : 'center'
            }, {
                text : '备件消耗',
                dataIndex:'V_SPARE',
                width : 250,
                align : 'center'
            }, {
                text : '委托单位',
                dataIndex:'V_DEPTNAME',
                width : 100,
                align : 'center'
            }, {
                text : '委托人',
                dataIndex:'V_PERSONNAME',
                width : 100,
                align : 'center'
            }, {
                text : '委托时间',
                dataIndex:'D_ENTER_DATE',
                width : 140,
                align : 'center'
            }, {
                text : '检修单位',
                dataIndex:'V_DEPTNAMEREPARIR',
                width : 150,
                align : 'center'
            }, {
                text : '工单类型描述',
                dataIndex:'V_ORDER_TYP_TXT',
                width : 100,
                align : 'center'
            }, {
                text : '工单状态',
                dataIndex:'V_STATENAME',
                width : 65,
                align : 'center'
            } ,{
                text : '计划工时',
                dataIndex:'PLANTIME',
                width : 100,
                align : 'center'
            },{
                text : '实际工时',
                dataIndex:'FACTTIME',
                width : 100,
                align : 'center'
            }],
        bbar : [ {
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            id : 'page',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : workStore
        }
        ]

    });
    ///-----update 2018-10-19
    var workWindow=Ext.create('Ext.window.Window',{
        id:'workWindow',
        closeAction:'hide',
        width:870,
        height:450,
        autoScroll: true,
        title:'设备检修历史',
        items:[workgrid]
    });

    var tbarStyle={
        'background-color':'rgb(45,60,137)',
        "height":"35px"
    };
    if(Ext.get('toolbar-1020')!=null){
        Ext.get('toolbar-1020').setStyle(tbarStyle);
        Ext.get('tbtext-1021').setStyle('color','white');
    }else if(Ext.get('toolbar-1021')!=null){
        Ext.get('toolbar-1021').setStyle(tbarStyle);
        Ext.get('tbtext-1022').setStyle('color','white');
    }else if(Ext.get('toolbar-1022')!=null){
        Ext.get('toolbar-1022').setStyle(tbarStyle);
        Ext.get('tbtext-1023').setStyle('color','white');
    }else if(Ext.get('toolbar-1023')!=null){
        Ext.get('toolbar-1023').setStyle(tbarStyle);
        Ext.get('tbtext-1024').setStyle('color','white');
    }

    if(Ext.get('toolbar-1039')!=null){
        Ext.get('toolbar-1039').setStyle(tbarStyle);
        Ext.get('tbtext-1040').setStyle('color','white');
    }else if(Ext.get('toolbar-1040')!=null){
        Ext.get('toolbar-1040').setStyle(tbarStyle);
        Ext.get('tbtext-1041').setStyle('color','white');
    }else if(Ext.get('toolbar-1041')!=null){
        Ext.get('toolbar-1041').setStyle(tbarStyle);
        Ext.get('tbtext-1042').setStyle('color','white');
    }else if(Ext.get('toolbar-1042')!=null){
        Ext.get('toolbar-1042').setStyle(tbarStyle);
        Ext.get('tbtext-1043').setStyle('color','white');
    }

    if(Ext.get('toolbar-1055')!=null){
        Ext.get('toolbar-1055').setStyle(tbarStyle);
        Ext.get('tbtext-1056').setStyle('color','white');
    }else if(Ext.get('toolbar-1056')!=null){
        Ext.get('toolbar-1056').setStyle(tbarStyle);
        Ext.get('tbtext-1057').setStyle('color','white');
    }else if(Ext.get('toolbar-1057')!=null){
        Ext.get('toolbar-1057').setStyle(tbarStyle);
        Ext.get('tbtext-1058').setStyle('color','white');
    }else if(Ext.get('toolbar-1058')!=null){
        Ext.get('toolbar-1058').setStyle(tbarStyle);
        Ext.get('tbtext-1059').setStyle('color','white');
    }


    var yeartool = Ext.create('Ext.panel.Panel', {
        region:'north',
        layout:'column',
        frame:false,
        border:true,
        width:'100%',
        tbar:[
            // { xtype: 'combo',fieldLabel: '设备类型',store: EquTypeStore,id:'EquType',editable : false,queryMode : 'local',displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE',labelWidth: 75, width:265,margin:'5 5 5 0',labelAlign:'right'},
            {xtype: 'button',text: '查询', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Magnifierzoomin',*/ iconCls: 'buy-button',icon:dxImgPath + '/search.png',listeners:{click:QueryYearGrid}},
            {xtype: 'button',text: '确认返回', margin: '5 5 5 5',/*bodyStyle:'float:right;',iconCls:'Tablesave' ,*/iconCls: 'buy-button',icon:dxImgPath + '/tjsb.png',listeners:{click:YearwinClose}}]
    });
    var yeargrid=Ext.create('Ext.grid.Panel',{
        id:'yeargrid' ,
        region:'center',
        border: false,
        store: 'yearStore',
        selModel : {
            selType : 'rowmodel',
            mode : 'SINGLE'
        },
        columnLines: true,
        columns: [
            {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
            {text: 'yearid', align: 'center', width: 100, dataIndex: 'YEARID',hidden:true},
            {text: 'ID_GUID', align: 'center', width: 100, dataIndex: 'ID_GUID',hidden:true},
            {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATE',hidden:true},
            {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATENAME'},
            {text: '项目名称', align: 'center', width: 100, dataIndex:'PRO_NAME'},
            {text: '年份', align: 'center', width: 70, dataIndex: 'V_YEAR'},
            {text: '计划停机月份', align: 'center', width: 100, dataIndex: 'V_MONTH'},
            {text: '计划状态', align: 'center', width: 100, dataIndex: 'STATENAME'},
            {text: '厂矿', align: 'center', width: 120, dataIndex: 'ORGNAME'},
            {text: '车间名称', align: 'center', width: 150, dataIndex: 'DEPTNAME'},
            {text: '专业', align: 'center', width: 100, dataIndex: 'ZYNAME'},
            {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
            {text: '设备类型名称', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME',hidden:true},
            {text:'检修内容',align:'center',width:150,dataIndex:'REPAIRCONTENT'},

            {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'PLANHOUR'},
            {text: '检修类别', align: 'center', width: 100, dataIndex: 'REPAIRTYPENAME'},

            {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERNAME'},
            {text: '录入人', align: 'center', width: 100, dataIndex: 'INPERCODE',hidden:true},
            {
                text: '录入时间',
                align: 'center',
                width: 150,
                dataIndex: 'INDATE',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            }
        ]
    });


    var yearWindow=Ext.create('Ext.window.Window',{
        id:'yearWindow',
        closeAction:'hide',
        width:870,
        height:450,
        autoScroll: true,
        layout:'border',
        title:'年计划详情',
        items:[yeartool,yeargrid]
    });


});


//加载添加页面
function QueryPageLoad(){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:wxGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.list!=null){
                Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"大修计划编制");
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
                        Ext.getCmp('jhlb').select(resp.list[0].V_JHLB); Ext.getCmp('jhlb').setReadOnly(true);
                    }
                });
                //专业默认值
                Ext.data.StoreManager.lookup('zyStore').on('load',function() {
                    if (resp.list[0].V_SPECIALTY == '') {
                        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
                    } else {
                        Ext.getCmp('zy').select(resp.list[0].V_SPECIALTY);Ext.getCmp('zy').setReadOnly(true);
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
                        Ext.getCmp('sclb').select(resp.list[0].V_SCLB);Ext.getCmp('sclb').setReadOnly(true);
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
                            Ext.getCmp('cpzl').select(resp.list[0].V_CPZL);Ext.getCmp('cpzl').setReadOnly(true);
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
                        var num=0;
                        for(var i=0;i<Ext.data.StoreManager.lookup('cpgxStore').data.items.length;i++){
                            if (resp.list[0].V_CPGX == Ext.data.StoreManager.lookup('cpgxStore').data.items[i].data.V_UID){
                                num++;
                            }
                        }
                        if(num>0){
                            Ext.getCmp('cpgx').select(resp.list[0].V_CPGX);Ext.getCmp('cpgx').setReadOnly(true);
                        }else{
                            Ext.getCmp('cpgx').select(Ext.data.StoreManager.lookup('cpgxStore').getAt(0));
                        }
                    }
                });

                Ext.data.StoreManager.lookup('sgfsStore').on('load',function(){
                    if (resp.list[0].V_SGFS == '') {
                        Ext.getCmp('sgfs').select( Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
                    } else {
                        Ext.getCmp('sgfs').select( resp.list[0].V_SGFS);Ext.getCmp('sgfs').setReadOnly(true);
                    }
                });

                Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
                    if(resp.list[0].V_WXTYPECODE==''){
                        Ext.getCmp('wxlx').select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
                    }else{
                        Ext.getCmp('wxlx').select(resp.list[0].V_WXTYPECODE);Ext.getCmp('wxlx').setReadOnly(true);
                    }
                });
                //加载检修单位
                Ext.data.StoreManager.lookup('repairDeptStore').load({
                    params:{
                        V_V_DEPTCODE:Ext.getCmp('zyq').getValue()//Ext.util.Cookies.get('v_deptcode') //DeptCode
                    }
                });

                //设置检修单位默认值
                RepairDeptSend();

                Ext.getCmp('ProjectCode').setValue(resp.list[0].V_PORJECT_CODE); Ext.getCmp('ProjectCode').setReadOnly(true);
                Ext.getCmp('ProjectName').setValue(resp.list[0].V_PORJECT_NAME); Ext.getCmp('ProjectName').setReadOnly(true);
                Ext.getCmp('content').setValue(resp.list[0].V_CONTENT); Ext.getCmp('content').setReadOnly(true);

                Ext.getCmp('jhgs').setValue(resp.list[0].V_SUMTIME==''?0:resp.list[0].V_SUMTIME); Ext.getCmp('jhgs').setReadOnly(true);
                Ext.getCmp('jhts').setValue(resp.list[0].V_SUMDATE==''?0:resp.list[0].V_SUMDATE); Ext.getCmp('jhts').setReadOnly(true);
                Ext.getCmp("qstext").setValue(resp.list[0].V_QSTEXT);Ext.getCmp('qstext').setReadOnly(true);

                if(resp.list[0].V_BDATE==''){
                    Ext.getCmp('btime').setValue(new Date());
                }else{
                    Ext.getCmp('btime').setValue(resp.list[0].V_BDATE.split(" ")[0]);Ext.getCmp('btime').setReadOnly(true);
                }

                if(resp.list[0].V_EDATE==''){
                    Ext.getCmp('etime').setValue(new Date());
                }else{
                    Ext.getCmp('etime').setValue(resp.list[0].V_EDATE.split(" ")[0]);Ext.getCmp('etime').setReadOnly(true);
                }
                Ext.getCmp('tzze').setValue(resp.list[0].V_MONEYBUDGET==''?'0':resp.list[0].V_MONEYBUDGET);Ext.getCmp('tzze').setReadOnly(true);

                // if(resp.list[0].V_STATE=='99'){
                    // Ext.getCmp('startFlow').show(); Ext.getCmp('startFlow').setReadOnly(true);
                    /*Ext.getCmp('agreeFlow').hide();
                    Ext.getCmp('disAgreeFlow').hide();*/
                // }else{
                //     Ext.getCmp('startFlow').hide();
                    /*  Ext.getCmp('agreeFlow').show();
                      Ext.getCmp('disAgreeFlow').show();*/
                // }

                QueryZYQ();
                QueryDefect();
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
    var nextSprStore = Ext.data.StoreManager.lookup('fzPerStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: OrgCode, //Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'MaintainPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}
//创建工程编码
function CreateProjectCode(){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECTCODE_C',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:wxGuid,
            V_V_YEAR:Year,
            V_V_ORGCODE:OrgCode,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
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
            V_V_PLANGUID:wxGuid
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
        //Ext.getCmp('zyq').select(DeptCode);
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').data.get(0));
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
            V_V_GUID:wxGuid
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
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue()//Ext.util.Cookies.get('v_deptcode')
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
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_EQUTYPECODE:Ext.getCmp('EquType').getValue()
        }
    });
}
//查询已选择的设备
function QueryYxEquGrid(){
    Ext.data.StoreManager.lookup('yxsbGridStore').load({
        params:{
            V_V_PLANGUID:wxGuid
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
            V_V_PLANGUID:wxGuid,
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
function DelEquTj(value, metaData, record) {

    var id = 'sbtj'+value;//metaData.record.V_EQUCODE;
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
                _deleteEqu(record.data.V_EQUCODE);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);


    // return '<a href="#" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')"><img src=\"'+ dxImgPath + '/delete.png\"/>' + '删除' + '</a>';
}
//删除选中设备
function DelEqu(value, metaData, record) {

    var id = 'sb'+value;//metaData.record.V_EQUCODE;
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
                _deleteEqu(record.data.V_EQUCODE);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);

    // return '<input type="button" text="删除" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')">';
    return '<a href="#" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')"><img src=\"'+ dxImgPath + '/delete.png\"/>' + '删除' + '</a>';
}
function _deleteEqu(equcode){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:wxGuid,
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
    window.open(AppUrl + 'page/PM_03020101/vMoreEqu.html?guid=' +wxGuid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选中缺陷
function QueryDefect(){
    Ext.data.StoreManager.lookup('qxGridStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid
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
                    V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
                    V_V_EQUCODE:sequ,
                    V_V_STATECODE:'10'
                }
            });

            Ext.getCmp("btnAdd_tjqx").show();
        }

    }else{
        alert('请选择设备！');
        // QueryQxGrid2();
        // Ext.getCmp("dbtnAdd_tjqx2").show();
    }
}
//查询大修设备用于选择缺陷
function QueryQxEquGrid(){
    Ext.data.StoreManager.lookup('qxEquStore').load({
        params:{
            V_V_PLANGUID:wxGuid
        }
    })
}
//查找维修设备（不关联设备）用于选择缺陷
function QueryQxGrid2(){
    Ext.data.StoreManager.lookup('dqxgridStore2').load();
}
//根据设备查询缺陷
function QueryQxByEqu(a, record){
    Ext.data.StoreManager.lookup('dqxgridStore').load({
        params:{
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_EQUCODE:record.data.V_EQUCODE,
            V_V_STATECODE:'10'
        }
    });
}

//单设备保存缺陷
function SaveQx(){
    var selectedRecord = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    var num=0;

    for(var i=0;i<selectedRecord.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECT_GUID: selectedRecord[i].data.V_GUID,
                V_V_PROJECT_GUID: wxGuid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                num++;
            }
        });
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
                    QueryDefect();
                }else{
                    alert("修改缺陷状态失败");
                }

            }
        });
        //写入缺陷-维修计划日志
        Ext.Ajax.request({
            url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
            method:'POST',
            params:{
                V_PROGUID:wxGuid,
                V_DEFECTGUID:selectedRecord[i].data.V_GUID,
                V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                V_ORG:Ext.util.Cookies.get("v_orgCode"),
                V_STATE:'IN'
            },
            success:function (response){
                var resp=Ext.decode(response.responseText);
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
            V_V_PROJECT_GUID: wxGuid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: record.data.V_GUID,
                        V_V_STATECODE: '50'//已计划

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if(resp.V_INFO=='success'){
                            QueryDefect();
                        }else{
                            alert("修改缺陷状态失败");
                        }

                    }
                });
                //写入缺陷-维修计划日志
                Ext.Ajax.request({
                    url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                    method:'POST',
                    params:{
                        V_PROGUID:wxGuid,
                        V_DEFECTGUID:record.data.V_GUID,
                        V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                        V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                        V_ORG:Ext.util.Cookies.get("v_orgCode"),
                        V_STATE:'IN'
                    },
                    success:function (response){
                        var resp=Ext.decode(response.responseText);
                    }
                });
                // QueryDefect();
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

    var id = 'qx'+value;//metaData.record.id;

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
                _deleteDefect(record.data.V_GUID);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
    // return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}
function _deleteDefect(DefectGuid){
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_DEFGUID:DefectGuid,
            V_PROGUID:wxGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.RET=='SUCCESS'){

            }else{
                alert("方案删除失败");
            }
        }
    });
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:wxGuid,
            V_V_DEFECT_GUID:DefectGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                // QueryDefect();
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: DefectGuid,
                        V_V_STATECODE: '10'//未处理

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if(resp.V_INFO=='success'){
                            QueryDefect();
                        }else{
                            alert("修改缺陷状态失败");
                        }

                    }
                });
                //写入缺陷-维修计划日志
                Ext.Ajax.request({
                    url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                    method:'POST',
                    params:{
                        V_PROGUID:wxGuid,
                        V_DEFECTGUID:DefectGuid,
                        V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                        V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                        V_ORG:Ext.util.Cookies.get("v_orgCode"),
                        V_STATE:'DEL'
                    },
                    success:function (response){
                        var resp=Ext.decode(response.responseText);
                    }
                });
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
    window.open(AppUrl + 'page/PM_03020101/vMoreDefect.html?guid=' +wxGuid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选检修模型
function QueryModel(){
    Ext.data.StoreManager.lookup('mxStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid
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
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
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
                    V_V_PORJECTGUID:wxGuid,
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

            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_MODEL_FILE_SEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_MODE_GUID:selectedRecords[i].data.V_MX_CODE,
                    V_V_TYPE:''
                },
                success: function (resp) {
                    var resp=Ext.JSON.decode(resp.responseText);
                    for(var t=0;t<resp.list.length;t++){
                        Ext.Ajax.request({
                            url:AppUrl+'dxfile/PM_MODEL_FILE_INSERT_DXF',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_GUID:wxGuid,
                                V_V_FILEGUID:resp.list[t].V_FILEGUID,
                                V_V_FILENAME:resp.list[t].V_FILENAME,
                                V_V_INPERCODE:resp.list[t].V_INPERCODE,
                                V_V_INPERNAME:resp.list[t].V_INPERNAME,
                                V_V_TYPE:resp.list[t].V_TYPE,
                                V_V_FILETYPE:resp.list[t].V_FILETYPE,
                                V_V_MODE_GUID: resp.list[t].V_MODE_GUID //selectedRecords[i].data.V_MX_CODE
                            },
                            success: function (resp) {
                                var resp=Ext.decode(resp.responseText);
                            }
                        });
                        var filecode=resp.list[0].V_FILEGUID;
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
    var id = 'jxml'+ value;//metaData.record.ID;
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
                _deleteModel(record.data.V_MODEL_GUID);
            }
        });
    }, 50);
    return Ext.String.format('<div id="{0}"></div>', id);
    // return '<a href="#" onclick="_deleteModel(\'' + record.data.V_MODEL_GUID + '\')">' + '删除' + '</a>';

}
function _deleteModel(ModelGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:wxGuid,
            V_V_MODEL_GUID:ModelGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_MODEL_FILE_DEL_DXF',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID:wxGuid,
                        V_V_MODE_GUID:ModelGuid
                    },
                    success:function(resp){
                        var res=Ext.decode(resp.responseText);
                        if(resp.list=='success'){
                            QueryModel();
                        }

                    }
                });

            }else{
                alert("删除失败");
            }
        }
    });
}
//查看检修模型明细
function MXclick(mxguid){
    var arr=[];
    arr=mxguid.split(',');
    QueryJxgx(arr[0]);
    QueryModFj(wxGuid,arr[0]);
    Ext.getCmp("MXclickW").setTitle('检修模型：'+arr[1]+arr[2]);
    //QueryJxgx(mxguid);
    Ext.getCmp("MXclickW").show();
}

function QueryModFj(acode,bcode){
    Ext.data.StoreManager.lookup("mxfileStore").load({
        params:{
            V_V_GUID:acode,
            V_V_MODE_GUID:bcode
        }
    });
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
    QueryJxjj(record.data.V_JXGX_CODE);
    QueryJxgj(record.data.V_JXGX_CODE);
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
            V_V_PROJECT_GUID:wxGuid,
            V_V_TYPE:'WL'
        }
    });

    Ext.data.StoreManager.lookup('jjAllStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid,
            V_V_TYPE:'JJ'
        }
    });

    Ext.data.StoreManager.lookup('gjAllStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid,
            V_V_TYPE:'GJ'
        }
    });

    Ext.data.StoreManager.lookup('gzAllStore').load({
        params:{
            V_V_PROJECT_GUID:wxGuid,
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
            V_V_PROJECT_GUID:wxGuid,
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
                        V_V_PROJECT_GUID:wxGuid,
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
    if(Ext.data.StoreManager.lookup("qxGridStore").data.items.length<=0){
        alert("缺陷不可以为空");
        return false;
    }
    if(Ext.getCmp('ProjectName').getValue()==""){
        Ext.Msg.alert("消息","项目名称不可以为空");
        return false;
    }
    if(Ext.getCmp("content").getValue()==""){
        Ext.Msg.alert("消息","维修内容不可以为空");
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:wxGuid,
            V_V_YEAR:Year,
            V_V_MONTH:'',
            V_V_ORGCODE:OrgCode,
            V_V_ORGNAME:OrgName,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
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
            V_V_MONEYBUDGET:Ext.getCmp('tzze').getValue(),
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
            V_V_GUID_UP:'-1',
            V_V_WBS:'',
            V_V_WBS_TXT:'',
            V_V_SUMTIME:Ext.getCmp('jhgs').getValue(),
            V_V_SUMDATE:Ext.getCmp('jhts').getValue(),
            V_V_SPECIALTY_ZX:'',
            V_V_SPECIALTY_ZXNAME:'',
            V_V_BJF:Ext.getCmp('bjf').getValue(),
            V_V_CLF:Ext.getCmp('clf').getValue(),
            V_V_SGF:Ext.getCmp('sgfy').getValue(),
            V_V_QSTEXT:Ext.getCmp('qstext').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                // alert('保存成功！');
                //缺陷日志写入-new
                var STAT="IN";
                newDefectLog(STAT);
                //缺陷日志写入-old
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_DEFECT_LOG_BY_PRO',
                    method: 'POST',
                    async: false,
                    params: {
                        V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                        V_PERNAME:decodeURI(Ext.util.Cookies.get('v_personname')),
                        V_PROGUID:wxGuid
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.RET=='SUCCESS'){
                            alert('保存成功！');
                            window.opener.selectGridTurn();
                            window.close();
                        }
                    }
                });
            }
        }
    });
}
function newDefectLog(STAT){
    var records=Ext.data.StoreManager.lookup('qxGridStore').data.items;
    if(records.length>0){
        for(var i=0;i<records.length;i++){
            var retdate= records[i].get('D_DEFECTDATE').split(" ")[0];
            var rethour=records[i].get('D_DEFECTDATE').split(" ")[1];
            var newdate=retdate.split("-")[0]+retdate.split("-")[1]+retdate.split("-")[2]+rethour.split(":")[0]+rethour.split(":")[1]+rethour.split(":")[2];

            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_DEFECT_LOG_FROMPRO_IN',
                method: 'POST',
                async: false,
                params: {
                    V_GUID:wxGuid,
                    V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                    V_DEPTCODE:Ext.util.Cookies.get('v_deptcode'),
                    V_ORG:Ext.util.Cookies.get('v_orgCode'),
                    V_PASS_STAT:STAT,
                    V_DEFECTGUID:records[i].get('V_GUID'),
                    V_DEF_TYPE:records[i].get('V_SOURCECODE'),
                    V_DEF_LIST:records[i].get('V_DEFECTLIST'),
                    V_DEF_DATE:newdate.toString(),//records[i].get('D_DEFECTDATE').toString(),
                    V_BJ:records[i].get('BJ_STUFF'),
                    V_SOLVE:records[i].get('DEF_SOLVE')
                },
                success: function (resp) {
                    var resp=Ext.decode(resp.responseText);
                    if(resp.RET=='SUCCESS'){
                        // alert('保存成功！');
                        // window.opener.selectGridTurn();
                        // window.close();
                    }
                }
            });
        }
    }
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
    if(Ext.data.StoreManager.lookup("qxGridStore").data.items.length<=0){
        alert("缺陷不可以为空");
        return false;
    }
    if(Ext.getCmp('ProjectName').getValue()==""){
        Ext.Msg.alert("消息","项目名称不可以为空");
        return false;
    }
    if(Ext.getCmp("content").getValue()==""){
        Ext.Msg.alert("消息","维修内容不可以为空");
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:wxGuid,
            V_V_YEAR:Year,
            V_V_MONTH:'',
            V_V_ORGCODE:OrgCode,
            V_V_ORGNAME:OrgName,
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
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
            V_V_MONEYBUDGET:Ext.getCmp('tzze').getValue(),
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
            V_V_SPECIALTY_ZXNAME:'',
            V_V_BJF:Ext.getCmp('bjf').getValue(),
            V_V_CLF:Ext.getCmp('clf').getValue(),
            V_V_SGF:Ext.getCmp('sgfy').getValue(),
            V_V_QSTEXT:Ext.getCmp('qstext').getValue()
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){

                //流程发起
                Ext.Ajax.request({
                    url: AppUrl + 'Activiti/StratProcess',
                    async: false,
                    method: 'post',
                    params: {
                        parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                        parVal: [Ext.util.Cookies.get('v_personcode'), wxGuid, Ext.getCmp('fzPer').getValue(), "请审批!", Ext.getCmp('content').getValue(), Ext.getCmp('ProjectCode').getValue(), "请审批！", "MaintainPlan"],
                        processKey: processKey,
                        businessKey: wxGuid,
                        V_STEPCODE: 'Start',
                        V_STEPNAME: V_STEPNAME,
                        V_IDEA: '请审批！',
                        V_NEXTPER: Ext.getCmp('fzPer').getValue(),
                        V_INPER: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (response) {
                        if (Ext.decode(response.responseText).ret == 'OK') {
                            //缺陷日志写入-new
                            var STAT="SB";
                            newDefectLog(STAT);
                            //缺陷日志写入-old
                            Ext.Ajax.request({
                                url: AppUrl + 'dxfile/PM_DEFECT_LOG_BY_PRO',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                                    V_PERNAME:decodeURI(Ext.util.Cookies.get('v_personname')),
                                    V_PROGUID:wxGuid
                                },
                                success: function (resp) {
                                    var resp=Ext.decode(resp.responseText);
                                    if(resp.RET=='SUCCESS'){
                                        // alert('保存成功！');
                                        // window.opener.selectGridTurn();
                                        // window.close();
                                    }
                                }
                            });
                            Ext.Ajax.request({
                                url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_STATE_SEND',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID: wxGuid,
                                    V_V_STATECODE: '1'
                                },
                                success: function (resp) {
                                    var resp = Ext.decode(resp.responseText);
                                    if (resp.V_INFO == 'SUCCESS') {
                                        Ext.Ajax.request({
                                            url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SET',
                                            method: 'POST',
                                            async: false,
                                            params: {
                                                V_V_GUID: wxGuid,
                                                V_V_FLOWCODE: '1',
                                                V_V_FLOWNAME: '上报',
                                                V_V_IDEA: '请审批',
                                                V_V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
                                                V_V_INPERNAME: Ext.util.Cookies.get('v_personname2'),
                                                V_V_NEXTPERCODE: '',
                                                V_V_NEXTPERNAME: ''
                                            },
                                            success: function (resp) {
                                                var resp = Ext.decode(resp.responseText);
                                                if (resp.V_INFO == 'SUCCESS') {
                                                    alert('上报成功！');
                                                    window.opener.selectGridTurn();
                                                    window.close();
                                                }
                                            }
                                        });
                                    }
                                }
                            });

                        } else if (Ext.decode(response.responseText).error == 'ERROR') {
                            Ext.Msg.alert('提示', '该流程发起失败！');
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
            V_V_GUID:wxGuid,
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
            V_V_GUID:wxGuid,
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
            V_V_GUID:wxGuid
        }
    })
}
//查看更多模型
function LookMoreModel(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/vMoreModel.html?guid=' +wxGuid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//附件管理
function btnAdd_file(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/file.html?guid=' +wxGuid +'&type=YEAR&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function MoneyChange(field,newValue,oldValue){

    Ext.getCmp('tzze').setValue(Ext.getCmp('bjf').getValue()-(-Ext.getCmp('clf').getValue())-(-Ext.getCmp('sgfy').getValue()));
}
function machistory(value, metaData, record, rowIndex, colIndex, store){
    metaData.style="text-align:center";
    return '<a href="javascript:macdetail(\''+value+'\')">'+"详细信息"+'</a>'
}
function macdetail(edcode){
//---设备编码查询工单
    Ext.data.StoreManager.lookup('workStore').on('beforeload',function(store, options){
        var new_params = {V_EDUCODE: edcode};
        Ext.apply(store.proxy.extraParams, new_params);
    });
    Ext.data.StoreManager.lookup('workStore').load({params:{ start: 0, limit: itemsPerpage }});
    Ext.getCmp('workWindow').show();

}

function gdzcdetail(value,metaData,record,rowIndex,colIndex,store){
    metaData.style="text-align:center";
    return '<a href="javascript:mgdzcdet(\''+value+'\')">'+"详细信息"+'</a>'
}

function OnButtonPlanAddClicked(){
    // Ext.data.StoreManager.lookup('yearStore').load({
    //     params:{
    //         V_V_ORGCODE: Ext.getCmp('zyq').getValue().toString().substring(0,4),
    //         V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
    //         V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
    //         V_V_ZY: ''
    //     }
    // });
    QueryYearGrid();
    Ext.getCmp('yearWindow').show();
}

//年添加窗口查询
function QueryYearGrid(){
    Ext.data.StoreManager.lookup('yearStore').load({
        params:{
            V_V_ORGCODE: OrgCode, // Ext.getCmp('zyq').getValue().toString().substring(0,4),
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_ZY: '',
            V_V_STATE:'30'
        }
    });
}

function YearwinClose(){
    var numdef=0;
    var nummod=0;
    var record=Ext.getCmp('yeargrid').getSelectionModel().getSelection();
    if(record.length!=1){
        alert('请选择一条记录，且只能选择一条记录。');
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GETONE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_GUID: record[0].get('ID_GUID')
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET.length == 1) {
                var startime=resp.RET[0].PLANTJMONTH;
                var btime=startime.split(" ")[0];
                var endtime=resp.RET[0].PLANJGMONTH;
                var etime=endtime.split(" ")[0];

                // Ext.getCmp('ck').select(resp.RET[0].V_YEAR); //年
                // Ext.getCmp('yf').select(resp.RET[0].V_MONTH);  //月

                OrgCode=resp.RET[0].ORGCODE;  //厂矿编码
                Ext.getCmp('zyq').select(resp.RET[0].DEPTCODE);  //作业区编码
                Ext.getCmp('zy').select(resp.RET[0].ZYCODE);  //专业编码

                // Ext.getCmp('sblx').select(resp.RET[0].EQUTYPE);  //设备类型编码
                // Ext.getCmp('sbmc').select(resp.RET[0].EQUCODE);  //设备名称编码
                // Ext.getCmp('jxtype').select(resp.RET[0].REPAIRTYPE);  //检修类别
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
                // Ext.getCmp('ProjectName').setValue(resp.RET[0].PRO_NAME);  // 项目名称
                Ext.getCmp('btime').setValue(Ext.Date.format(new Date(btime),'Y/m/d')); // 停工时间
                Ext.getCmp('etime').setValue(Ext.Date.format(new Date(etime),'Y/m/d')); // 竣工时间
                //清空原有添加设备
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_EQU_BY_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_PLANGUID:wxGuid
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.RET=='成功'){
                            QueryCGrid();
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });
                //清空原有缺陷方案
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_PROGUID:wxGuid
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.RET=='SUCCESS'){
                            QueryCGrid();
                        }
                        // else{
                        //     alert("方案删除失败");
                        // }
                    }
                });
                //清空原有添加缺陷
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_DEF_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_PROJCET_GUID:wxGuid
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.RET=='成功'){
                            QueryCGrid();
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });
                //清空原有添加模型
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_03_PLAN_YEAR_MOD_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_PROJECT_GUID:wxGuid
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.RET=='成功'){
                            QueryCGrid();
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });

                //查询写入设备
                Ext.Ajax.request({
                    url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_PLANGUID:wxGuid,
                        V_V_EQUTYPECODE:resp.RET[0].EQUTYPE,
                        V_V_EQUCODE:resp.RET[0].EQUCODE
                    },
                    success: function (resp) {
                        var resp=Ext.decode(resp.responseText);
                        if(resp.V_INFO=='成功'){
                            QueryCGrid();
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });
                //--查询写入缺陷
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_GUID: record[0].get('ID_GUID')
                    },
                    success: function (resp) {
                        var respdef=Ext.decode(resp.responseText);
                        if(respdef.list.length!=0){
                            for(var i=0;i<respdef.list.length;i++){
                                Ext.Ajax.request({
                                    url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        V_V_DEFECT_GUID: respdef.list[i].DEFECT_GUID,
                                        V_V_PROJECT_GUID: wxGuid
                                    },
                                    success: function (resp) {
                                        var resp = Ext.decode(resp.responseText);
                                        numdef++;
                                    }
                                });
                                //修改缺陷状态
                                Ext.Ajax.request({
                                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        V_V_GUID: respdef.list[i].DEFECT_GUID,
                                        V_V_STATECODE: '50'//已计划

                                    },
                                    success: function (ret) {
                                        var resp = Ext.decode(ret.responseText);
                                        if(resp.V_INFO=='success'){
                                            // QueryDefect();
                                        }else{
                                            alert("修改缺陷状态失败");
                                        }

                                    }
                                });
                                //写入缺陷-维修计划日志
                                Ext.Ajax.request({
                                    url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                                    method:'POST',
                                    params:{
                                        V_PROGUID:wxGuid,
                                        V_DEFECTGUID:respdef.list[i].DEFECT_GUID,
                                        V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                                        V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                                        V_ORG:Ext.util.Cookies.get("v_orgCode"),
                                        V_STATE:'IN'
                                    },
                                    success:function (response){
                                        var resp=Ext.decode(response.responseText);
                                    }
                                });
                                if(numdef==respdef.list.length) {
                                    QueryDefect();
                                }
                            }
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });
                //--查询返回模型
                Ext.Ajax.request({
                    url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_JXMOD_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_GUID:record[0].get('ID_GUID')
                    },
                    success: function (resp) {
                        var respmode=Ext.decode(resp.responseText);
                        if(respmode.list.length!=0){
                            for(var i=0;i<respmode.list.length;i++){
                                Ext.Ajax.request({
                                    url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_SET',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        V_V_PORJECTGUID:wxGuid,
                                        V_V_MODELGUID:respmode.list[i].JX_MODCODE,
                                        V_V_MODELNAME:respmode.list[i].JX_MODNAME,
                                        V_V_BBH:respmode.list[i].JX_MODBBH,
                                        V_V_BZ:respmode.list[i].JX_MODBZ
                                    },
                                    success: function (resp) {
                                        var respmodin=Ext.decode(resp.responseText);
                                        if(respmodin.V_INFO=='SUCCESS'){
                                            nummod++;
                                        }else{
                                            nummod++;
                                            alert('模型'+respmode[i].data.JX_MODCODE+"添加失败！");
                                        }
                                    }
                                });

                                // Ext.Ajax.request({
                                //     url: AppUrl + 'dxfile/PM_MODEL_FILE_SEL',
                                //     method: 'POST',
                                //     async: false,
                                //     params: {
                                //         V_V_MODE_GUID:selectedRecords[i].data.V_MX_CODE,
                                //         V_V_TYPE:''
                                //     },
                                //     success: function (resp) {
                                //         var resp=Ext.JSON.decode(resp.responseText);
                                //         for(var t=0;t<resp.list.length;t++){
                                //             Ext.Ajax.request({
                                //                 url:AppUrl+'dxfile/PM_MODEL_FILE_INSERT_DXF',
                                //                 method: 'POST',
                                //                 async: false,
                                //                 params: {
                                //                     V_V_GUID:Guid,
                                //                     V_V_FILEGUID:resp.list[t].V_FILEGUID,
                                //                     V_V_FILENAME:resp.list[t].V_FILENAME,
                                //                     V_V_INPERCODE:resp.list[t].V_INPERCODE,
                                //                     V_V_INPERNAME:resp.list[t].V_INPERNAME,
                                //                     V_V_TYPE:resp.list[t].V_TYPE,
                                //                     V_V_FILETYPE:resp.list[t].V_FILETYPE,
                                //                     V_V_MODE_GUID: resp.list[t].V_MODE_GUID //selectedRecords[i].data.V_MX_CODE
                                //                 },
                                //                 success: function (resp) {
                                //                     var resp=Ext.decode(resp.responseText);
                                //                 }
                                //             });
                                //             var filecode=resp.list[0].V_FILEGUID;
                                //         }
                                //
                                //     }
                                // });
                                if(nummod==respmode.list.length){
                                    QueryModel();
                                }
                            }
                        }
                        // else{
                        //     alert("添加失败");
                        // }
                    }
                });

            }
        }
    });
    Ext.getCmp('yearWindow').close();

}
function OnChangeEleData(e){
    console.info(e.context.record);
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/DEFECT_BY_MAINTAINPLAN_IN',
        method: 'POST',
        params: {
            V_PROGUID: wxGuid,
            V_DEFECTGUID: e.context.record.data.V_GUID,
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INDEPT: Ext.util.Cookies.get('v_deptcode'),
            V_INORG: Ext.util.Cookies.get('v_orgCode'),//decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_DEF_SOLVE: e.context.record.data.DEF_SOLVE,
            V_BJ_STUFF: e.context.record.data.BJ_STUFF,
            V_EQUCODE:e.context.record.data.V_EQUCODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "SUCCESS") {
                // alert("添加成功");
            }
        }
    });
}

//缺陷上传附件
function upfilefun(value, metaData, record){
    metaData.style="text-align:center";
    // return '<a href="javascript:upfile(\''+record.data.V_GUID+'\')">'+"数量:"+value+"|"+"上传"+'</a>';
    return '<a >'+"数量:"+value+'</a>';
}
function upfile(value) {
    fjDefect=value;
    Ext.data.StoreManager.lookup('fileview').load();
    Ext.getCmp('win').show();

}

function _upLoadFile() {
    var uploadFile = Ext.getCmp('uploadFile');
    var V_V_BLOB = Ext.getCmp('V_V_BLOB').getSubmitValue();
    var V_V_FILENAME = V_V_BLOB.substring(0, V_V_BLOB.indexOf('.'));

    Ext.getCmp('V_GUID').setValue(fjDefect);
    Ext.getCmp('V_V_BLOB').setValue(V_V_BLOB);
    Ext.getCmp('V_FILENAME').setValue(V_V_FILENAME);
    //  Ext.getCmp('V_TYPE').setValue(V_TYPE);
    Ext.getCmp('V_PLANT').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_DEPT').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));

    //if(uploadFile.form.isValid()){
    if (Ext.getCmp('V_V_BLOB').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }
    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    uploadFile.getForm().submit({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_INSERT',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (form, action) {
            var massage=action.result.message;
            if(massage=="{list=Success}"){
                Ext.Msg.alert('成功', '上传成功');
                filequery(fjDefect);
                QueryDefect();
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    });
    //}

}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.FILE_CODE + '\')">删除</a>';
}

function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'PM_07/DEFECT_UPFILE_DELETE',
        method: 'POST',
        async: false,
        params: {
            V_FILECODE: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.list == 'Success') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(fjDefect);
                QueryDefect();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}

function filequery(fjDefect) {
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_GUID: fjDefect
        }
    });
}