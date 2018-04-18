var win;//父窗口对象，由子窗口调用
var ZG_GUID;
Ext.onReady(function () {
   //获取整改工单数据集
    var zggdStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'zggdStore',
        autoLoad: false,
        fields: ['V_ORDERID', 'V_ORDERGUID', 'V_SHORT_TXT', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'V_DEPTNAME',
            'V_ENTERED_BY', 'D_ENTER_DATE', 'V_JX_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GD_BY_ZGGUID_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //获取人工数据集
    var rgStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'rgStore',
        autoLoad: false,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_FUNC_LOC', 'V_ENTERED_BY', 'V_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GZ_BY_ZGGUID_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //获取工具数据集
    var gjStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'gjStore',
        autoLoad: false,
        fields: ['V_GJ_CODE', 'V_GJ_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_GJ_BY_ZGGUID_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //获取机具数据集
    var JjStore = Ext.create('Ext.data.Store', { //安全措施数据集
        id: 'JjStore',
        autoLoad: false,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/BASE_JJ_BY_ZGGUID_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {//参数
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //厂矿store
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
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
        listeners: {
            load: function (store, records) {
                Ext.getCmp('plant').select(ckStore.getAt(0));
            }
        }
    });

    //作业区store
    var zyqStore = Ext.create('Ext.data.Store', {
        id: 'zyqStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        },
        listeners: {//给子集下拉框赋值
            load: function (store, records) {
                Ext.getCmp('dept').select(zyqStore.getAt(0));
            }
        }
    });

    //工种store
    var gzStore = Ext.create('Ext.data.Store', {
        id: 'gzStore',
        autoLoad: false,
        fields: ['V_WORKCODE', 'V_WORKNAME', 'V_WORKTYPE', 'V_DE', 'V_TIME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'Wsy/PRO_BASE_PERSON_DE_SEL',//无条件查询所有工种
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    //工种store1
    var gzStore1 = Ext.create('Ext.data.Store', {
        id: 'gzStore1',
        autoLoad: false,
        loading: false,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_DE', 'V_TS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'Wsy/PRO_PM_19_WORKDE_GXSEL',//传入工序CODE查询工种
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    //工具store
    var gjStore1 = Ext.create('Ext.data.Store', {
        id: 'gjStore1',
        autoLoad: false,
        fields: ['V_TOOLNAME', 'V_TOOLTYPE', 'V_TOOLPLACE', 'V_TOOLINDATE', 'V_TOOLSTATUS'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'Wsy/PRO_PM_19_TOOLTYPE_SEL',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    // //设备类型
    // var sblxStore = Ext.create('Ext.data.Store', {
    //     id: 'sblxStore',
    //     autoLoad: false,
    //     fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    //     proxy: {
    //         type: 'ajax',
    //         url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     }
    // });

    // var eTypeStore = Ext.create('Ext.data.Store', {
    //     id: 'eTypeStore',
    //     autoLoad: false,
    //     fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
    //     proxy: {
    //         type: 'ajax',
    //         url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             deptLoad = true;
    //             Ext.getCmp('equtype').select(store.first());
    //             _init();
    //         }
    //     }
    // });

    //设备树store
    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE']
    });

    //gridStore
    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [[' '], [' '], [' '], [' '], [' ']],//添加五行空白数据
        proxy: {
            url: 'selectZZ.do',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'ZZlist',
                totalProperty: 'total'
            }
        }
    });

    //检修模型store
    var jxmxStore = Ext.create('Ext.data.Store', {
        storeId: 'jxmxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_MX_CODE', 'V_MX_NAME', 'V_MXBB_NUM', 'V_BZ'],
        proxy: {
            url: AppUrl + 'Wsy/PM_1917_JXMX_DATA_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修工序store
    var jxgxStore = Ext.create('Ext.data.Store', {
        storeId: 'jxgxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_JXGX_NR'],
        proxy: {
            url: AppUrl + 'Wsy/PM_1917_JXGX_DATA_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //机具store
    var jjStore = Ext.create('Ext.data.Store', {
        storeId: 'jjStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS', 'V_JJ_DE'],
        proxy: {
            url: AppUrl + 'Wsy/PRO_PM_19_CARDE_GXSEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //机具信息store
    var jjxxStore = Ext.create('Ext.data.Store', {
        storeId: 'jjxxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'V_DE', 'V_CARGUISUO', 'V_USE', 'V_FLAG', 'V_DRIVER_NAME'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXMX_JJCODE_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //安全措施store
    var aqcsStore = Ext.create('Ext.data.Store', {
        storeId: 'aqcsStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_AQCS_CODE', 'V_AQCS_NAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_AQCS_BBH', 'V_AQ_ZYSX', 'V_AQCS_DETAIL', 'V_GX_CODE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_AQCS_BY_GXCODE_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //安全措施预案store
    var aqcsyaStore = Ext.create('Ext.data.Store', {
        storeId: 'aqcsyaStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_AQCS_CODE', 'V_AQYA_CODE', 'V_AQYA_NAME', 'V_AQYA_DETAIL'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_AQCS_AQYA_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //安全事故案例store
    var aqsgalStore = Ext.create('Ext.data.Store', {
        storeId: 'aqsgalStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_FINDTIME', 'V_FAULT_DD', 'V_FAULT_YY', 'V_FAULT_XX', 'V_FILE_GUID'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_AQCS_FAULT_ITEM_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //安全措施整改store
    var aqcszgStore = Ext.create('Ext.data.Store', {
        storeId: 'aqcszgStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_AQCS_CODE','V_ZG_GUID', 'V_ZG_TIME', 'V_ZG_PLACE', 'V_ZG_PERSON', 'V_ZG_DETAIL', 'V_ZG_COST'],
        proxy: {
            url: AppUrl + 'zs/BASE_AQCS_ZG_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'

            }
        }
    });

    //安全措施附件store
    var aqcsfjStore = Ext.create('Ext.data.Store', {
        storeId: 'aqcsfjStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_FILEGUID', 'V_FILENAME', 'V_TIME', 'V_PERSON'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_FILE_CHAKAN_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //安全措施通用附件store
    var aqcsfjStore1 = Ext.create('Ext.data.Store', {
        storeId: 'aqcsfjStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_FILEGUID', 'V_FILENAME', 'V_TIME', 'V_PERSON'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_FILE_CHAKAN_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修技术标准store
    var jxjsbzStore = Ext.create('Ext.data.Store', {
        storeId: 'jxjsbzStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_PART_NUMBER', 'V_PART_NAME', 'V_PART_CODE', 'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE_UP', 'V_VALUE_DOWN', 'V_REPLACE_CYC', 'V_WEIGHT', 'V_IMGCODE', 'V_CONTENT'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXBZ_BY_GXCODE_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });


    //子设备检修技术标准store
    var zsbjxStore = Ext.create('Ext.data.Store', {
        storeId: 'zsbjxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_PART_NUMBER', 'V_PART_NAME', 'V_PART_CODE', 'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE_UP', 'V_VALUE_DOWN', 'V_REPLACE_CYC', 'V_WEIGHT', 'V_IMGCODE', 'V_CONTENT'],
        proxy: {
            url: AppUrl + 'Wsy/PM_REPAIR_JS_STANDARD_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //工单明细store
    var gdmxStore = Ext.create('Ext.data.Store', {
        storeId: 'gdmxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'D_ENTER_DATE', 'V_SHORT_TXT', 'V_ORDER_TYP', 'V_DEPTNAME', 'V_STATECODE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXBZ_GD_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //缺陷明细store
    var qxmxStore = Ext.create('Ext.data.Store', {
        storeId: 'qxmxStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'D_DEFECTDATE', 'V_DEFECTLIST', 'V_IDEA', 'V_STATECODE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXBZ_QX_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修机具store1
    var jxjjStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxjjStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_DE', 'V_JJ_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JJ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修机具store2
    var jxjjStore2 = Ext.create('Ext.data.Store', {
        storeId: 'jxjjStore2',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'V_DE', 'V_CARGUISUO', 'V_USE', 'V_FLAG', 'V_DRIVER_NAME'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JXMX_JJCODE_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修工具store1
    var jxgjStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxgjStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_TOOLCODE', 'V_TOOLNAME', 'V_TOOLTYPE', 'V_TOOLPLACE', 'V_TOOLINDATE', 'V_TOOLSTATUS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GJ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //检修工种store1
    var jxgzStore1 = Ext.create('Ext.data.Store', {
        storeId: 'jxgzStore1',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_DE', 'V_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GZ_BYJXBZ_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });


    //历史工单store
    var lsgdStore = Ext.create('Ext.data.Store', {
        storeId: 'lsgdStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'V_ORDER_TYP_TXT', 'V_SHORT_TXT', 'D_ENTER_DATE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GD_BY_GXGUID_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //历史工单—工种store
    var gdgzStore = Ext.create('Ext.data.Store', {
        storeId: 'gdgzStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_PERCODE_DE', 'V_PERNAME_DE', 'V_PERTYPE_DE', 'V_DE', 'V_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GZ_BY_GDGUID_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //历史工单—工具store
    var gdgjStore = Ext.create('Ext.data.Store', {
        storeId: 'gdgjStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GJ_CODE', 'V_GJ_NAME', 'V_GJ_TYPE'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_GJ_BY_GDGUID_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //历史工单—机具store
    var gdjjStore = Ext.create('Ext.data.Store', {
        storeId: 'gdjjStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_JJ_BY_GDGUID_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //物料store
    var wlStore = Ext.create('Ext.data.Store', {
        storeId: 'wlStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_WLCODE', 'V_KFNAME', 'V_USE_NUM'],
        proxy: {
            url: AppUrl + 'Wsy/PM_1917_JXGX_WL_DATA_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //历史工单—物料store
    var gdwlStore = Ext.create('Ext.data.Store', {
        storeId: 'gdwlStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_WLCODE', 'V_WLSM', 'V_USE_NUM'],
        proxy: {
            url: AppUrl + 'Wsy/BASE_WL_BY_GDGUID_SEL',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    //顶部查询条件(combo, button)
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        title: '<div align="center">检修模型管理</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'plant',
                store: 'ckStore',
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '厂矿',
                emptyText: '全部',
                editable: false,
                labelWidth: 40,
                listeners: {
                    change: function (combo, records) {
                        _selectDept();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'dept',
                store: 'zyqStore',
                style: 'margin:5px 0px 5px 20px',
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '作业区',
                emptyText: '全部',
                editable: false,
                labelWidth: 40,
                listeners: {
                    change: function (combo, records) {
                        _queryTree();
                    }
                }
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 30px',
                width: 60,
                handler: _select
            },
            {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                width: 60,
                handler: _insert
            },
            {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                width: 60,
                handler: _update
            },
            {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete1.png',
                width: 60,
                handler: _delete
            }]
    });

    //设备树treePanel
    var sblxTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'sblxTreePanel',
        //title: '设备类型树',
        region: 'west',
        width: '35%',
        rootVisible: false,
        autoScroll: true,
        store: 'treeStore',
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryjxmx(record.get('sid'));
                _querygj(record.get('sid'));
                _queryzsbjx(record.get('sid'));
            }
        }
    });

    //检修模型gridPanel
    var jxmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'jxmxPanel',
        store: 'jxmxStore',
        frame: true,
        columnLines: true,
        border: false,
        region: 'north',
        height: '50%',
        // selModel: {selType: 'checkboxmodel', mode: 'SINGLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '检修模型编码', dataIndex: 'V_MX_CODE', style: 'text-align: center;', width: 110},
            {text: '检修模型名称', dataIndex: 'V_MX_NAME', style: 'text-align: center;', width: 110},
            {text: '模型版本号', dataIndex: 'V_MXBB_NUM', style: 'text-align: center;', width: 120},
            {text: '备注', dataIndex: 'V_BZ', style: 'text-align: center;', width: 100}],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _preViewImage(record.get('V_MX_CODE'));
                _querygx(record.get('V_MX_CODE'));
            }
        },
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'jxmxPanel_toolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxmxStore',
            width: '100%'
        }]
    });

    //检修工序gridPanel
    var jxgxPanel = Ext.create('Ext.grid.Panel', {
        id: 'jxgxPanel',
        store: 'jxgxStore',
        //baseCls: 'my-panel-no-border',
        columnLines: true,
        border: false,
        frame: true,
        region: 'center',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '检修模型名称', dataIndex: 'V_MX_NAME', style: 'text-align: center;', flex: 1},
            {text: '工序名称', dataIndex: 'V_JXGX_NAME', style: 'text-align: center;', flex: 1},
            {text: '工序内容', dataIndex: 'V_JXGX_NR', style: 'text-align: center;', flex: 1}],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage2',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxgxStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _querygz(record.get('V_JXGX_CODE'));
                _queryjj(record.get('V_JXGX_CODE'));
                _queryaqcs(record.get('V_JXGX_CODE'));
                _queryjxjsbz();
                _querylsgd(record.get('V_JXGX_CODE'));
                _querywl(record.get('V_JXGX_CODE'));
            }
        }
    });

    //左上panel集合
    var zuoshangPanel = Ext.create('Ext.Panel', {
        id: 'zuoshangPanel',
        frame: true,
        border: false,
        layout: {type: 'border', regionWeights: {north: 3, east: 1, south: 1, west: 4}},
        items: [sblxTreePanel, jxmxPanel, jxgxPanel]
    });

    //检修模型网络施工图formPanel
    var jxmxsgtPanel = Ext.create("Ext.form.Panel", {
        id: 'jxmxsgtPanel',
        editable: false,
        frame: true,
        region: 'center',
        title: '检修模型网络施工图',
        items: [{
            layout: 'column',
            defaults: {labelAlign: 'right'},
            items: [{
                xtype: 'box',
                id: 'browseImage',
                autoEl: {
                    width: '100%',
                    height: '100%',
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    //工种选择按钮panel
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        frame: true,
        region: 'north',
        border: false,
        layout: 'column',
        items: [{
            xtype: 'button', text: '选择', width: 60, style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/delete1.png', handler: _selectgz
        }, {
            xtype: 'button', text: '删除', width: 60, style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/delete1.png', handler: _deletegz
        }]
    });

    //工种gridPanel
    var gzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gzPanel1',
        columnLines: true,
        region: 'center',
        frame: true,
        store: 'gzStore1',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'gzPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gzStore1',
            width: '100%'
        }]
    });

    //工种panel集合
    var gzPanel = Ext.create('Ext.Panel', {
        id: 'gzPanel',
        title: '工种',
        baseCls: 'my-panel-no-border',
        // region: 'north',
        // height: '50%',
        frame: true,
        layout: 'border',
        items: [buttonPanel, gzPanel1]
    });

    //机具gridPanel
    var jjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel1',
        columnLines: true,
        store: 'jjStore',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '车辆名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '车辆类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '检修台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1},
            {text: '车辆定额', dataIndex: 'V_JJ_DE', align: 'center', flex: 1}],
        bbar: [{
            id: 'jjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jjStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryjjxx(record.get('V_JJ_CODE'));
            }
        }
    });

    //机具信息gridPanel
    var jjxxPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jjxxPanel1',
        title: '机具信息',
        columnLines: true,
        store: 'jjxxStore',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '机具所属单位', dataIndex: 'V_CARGUISUO', align: 'center', flex: 1},
            {text: '机具用途', dataIndex: 'V_USE', align: 'center', flex: 1},
            {text: '机具状态', dataIndex: 'V_FLAG', align: 'center', flex: 1},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', align: 'center', flex: 1}],
        bbar: [{
            id: 'jjxxPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jjxxStore',
            width: '100%'
        }]
    });

    //机具panel集合
    var jjPanel = Ext.create('Ext.Panel', {
        id: 'jjPanel',
        title: '机具',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        layout: {type: 'border', regionWeights: {north: 3, east: 1, south: 1, west: 4}},
        items: [{
            region: 'north',
            height: '50%',
            layout: 'fit',
            items: [jjPanel1]
        }, {
            region: 'center',
            layout: 'fit',
            items: [jjxxPanel1]
        }]
    });

    //工具gridPanel
    var gjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel1',
        title: '工具',
        columnLines: true,
        store: 'gjStore1',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具名称', dataIndex: 'V_TOOLNAME', align: 'center', width:100},
            {text: '工具类型', dataIndex: 'V_TOOLTYPE', align: 'center', width:100},
            {text: '工具存在地', dataIndex: 'V_TOOLPLACE', align: 'center', width:100},
            {text: '工具入厂时间', dataIndex: 'V_TOOLINDATE', align: 'center', width:288,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gjStore1.find('V_TOOLINDATE', value);
                    if (index != -1) {
                        return gjStore1.getAt(index).get('V_TOOLINDATE').substring(0, 19);
                    }
                    return null;
                }},
            {text: '工具状态', dataIndex: 'V_TOOLSTATUS', align: 'center', width:100}],
        bbar: [{
            id: 'gjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gjStore1',
            width: '100%'
        }]
    });
    //物料表格1gridPanel
    var wlPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'wlPanel1',
        columnLines: true,
        region: 'north',
        height: '40%',
        store: 'wlStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'V_WLCODE', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'V_KFNAME', align: 'center', flex: 1},
            {text: '数量', dataIndex: 'V_USE_NUM', align: 'center', flex: 1},
            {text: '删除', dataIndex: '', align: 'center', flex: 1}],
        bbar: [{
            id: 'wlPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'wlStore',
            width: '100%'
        }]
    });

    //物料库房信息gridPanel
    var wlkfxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'wlkfxxPanel',
        title: '物料库房信息',
        columnLines: true,
        region: 'center',
        store: 'gridStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '库房编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '库房名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '库存量', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '采购单价', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '距上次采购时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '是否提醒库管员生成采购单', dataIndex: 'data_', align: 'center', flex: 2}],
        bbar: [{
            id: 'grid9page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });

    //物料panel
    var wlPanel = Ext.create('Ext.Panel', {
        id: 'wlPanel',
        title: '物料',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: 'border',
        items: [wlPanel1, wlkfxxPanel]
    });

    //安全措施左上gridPanel
    var aqcsPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'aqcsPanel1',
        columnLines: true,
        region: 'north',
        height: '53%',
        store: 'aqcsStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            //{text: '安全措施编码', dataIndex: 'V_AQCS_CODE', align: 'center', flex: 1},
            {text: '安全措施名称', dataIndex: 'V_AQCS_NAME', align: 'center', flex: 1},
            {text: '安全措施版本号', dataIndex: 'V_AQCS_BBH', align: 'center', flex: 1},
            {text: '删除', dataIndex: '', align: 'center', flex: 0.7,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteAqcs()'>删除</a></span>";
                }
            }],
        bbar: [{
            id: 'aqcsPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcsStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryaqcsya(record.get('V_AQCS_CODE'));
                _queryaqsgal(record.get('V_AQCS_CODE'));
                _queryaqcsxq(record.get('V_AQCS_CODE'));
                _queryaqcszg(record.get('V_AQCS_CODE'));
                _queryaqcsfj(record.get('V_AQCS_CODE'));
            }
        }
    });

    //安全措施左下formPanel
    var aqcsPanel2 = Ext.create('Ext.form.Panel', {
        id: 'aqcsPanel2',
        border: false,
        title: '安全措施详情',
        region: 'center',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 50px'},
        items: [//{xtype: 'textfield', id: 'V_AQCS_CODE', name: 'V_AQCS_CODE', fieldLabel: '安全措施编码:', maxLength: 60},
            {xtype: 'textfield', id: 'V_AQCS_NAME', name: 'V_AQCS_NAME', fieldLabel: '安全措施名称:', maxLength: 60},
            {xtype: 'textareafield', id: 'V_AQCS_DETAIL', name: 'V_AQCS_DETAIL', fieldLabel: '安全措施明细:', maxLength: 60},
            {xtype: 'textareafield', id: 'V_AQ_ZYSX', name: "V_AQ_ZYSX", fieldLabel: '安全措施注意事项', maxLength: 60}]
    });

    //安全措施预案gridPanel
    var aqcsyaPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqcsyaPanel',
        columnLines: true,
        title: '安全措施预案',
        store: 'aqcsyaStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
           // {text: '预案编码', dataIndex: 'V_AQYA_CODE', align: 'center', flex: 1},
            {text: '预案名称', dataIndex: 'V_AQYA_NAME', align: 'center', flex: 1},
            {text: '预案详情', dataIndex: 'V_AQYA_DETAIL', align: 'center', flex: 1},
            {
                text: '附件', dataIndex: 'V_AQYA_DETAIL', align: 'center', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_openAttachWindow(\'' + record.data.V_AQYA_CODE + '\')>查看</a>';
                }
            }],
        bbar: [{
            id: 'aqcsyaPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcsyaStore',
            width: '100%'
        }]
    });

    //安全事故案例gridPanel
    var aqsgalPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqsgalPanel',
        columnLines: true,
        title: '安全事故案例',
        store: 'aqsgalStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '事故发生时间', dataIndex: 'V_FINDTIME', align: 'center', flex: 1},
            {text: '事故发生地点', dataIndex: 'V_FAULT_DD', align: 'center', flex: 1},
            {text: '事故影响', dataIndex: 'V_FAULT_YY', align: 'center', flex: 1},
            {text: '事故详情', dataIndex: 'V_FAULT_XX', align: 'center', flex: 1},
            {
                text: '附件', align: 'center', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_openAttachWindow(\'' + record.data.V_FILE_GUID + '\')>查看</a>';
                }
            }],
        bbar: [{
            id: 'aqsgalPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqsgalStore',
            width: '100%'
        }]
    });

    //安全措施整改
    //整改信息gridPanel
    var zgxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgxxPanel',
        store: 'aqcszgStore',
        title: '整改信息',
        columnLines: true,
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '整改时间', dataIndex: 'V_ZG_TIME', align: 'center', flex: 1},
            {text: '整改地点', dataIndex: 'V_ZG_PLACE', align: 'center', flex: 1},
            {text: '整改负责人', dataIndex: 'V_ZG_PERSON', align: 'center', flex: 1},
            {text: '整改方案明细', dataIndex: 'V_ZG_DETAIL', align: 'center', flex: 1},
            {text: '整改费用', dataIndex: 'V_ZG_COST', align: 'center', flex: 1},
            {
                text: '附件', align: 'center', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_openAttachWindow(\'' + record.data.V_ZG_GUID + '\')>查看</a>';
                }
            }],
        listeners: {//itemclick监听查询相关整改工单，人工，工具，机具
            itemclick: function (panel, record) {
                _selectZggd(record.get('V_ZG_GUID'));
                _selectRg(record.get('V_ZG_GUID'));
                _selectGj(record.get('V_ZG_GUID'));
                _selectJj(record.get('V_ZG_GUID'));
            }
        },
        bbar: [{
            id: 'zgxxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcszgStore',
            width: '100%'
        }]
    });

    //安全措施整改-整改审批流程
    var zgsplcPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgsplcPanel',
        store: 'gridStore',
        title: '整改审批流程',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid14page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });

    //安全措施整改—整改进度
    var zgjdPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgjdPanel',
        store: 'gridStore',
        title: '整改进度',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid15page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });

    //安全措施整改—人工
    var rgPanel = Ext.create('Ext.grid.Panel', {
        id: 'rgPanel',
        title: '人工',
        columnLines: true,
        store: 'rgStore',
        //selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'rgStore',
            width: '100%'
        }]
    });

    //安全措施整改—工具
    var aq_gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aq_gjPanel',
        title: '工具',
        columnLines: true,
        store: 'gjStore',
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            //{text: '工具编码', dataIndex: 'V_GJ_CODE', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'V_GJ_NAME', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gjStore',
            width: '100%'
        }]
    });

    //安全措施整改—机具
    var aq_jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aq_jjPanel',
        title: '机具',
        columnLines: true,
        store: 'JjStore',
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'JjStore',
            width: '100%'
        }]
    });
    var zggdPanel = Ext.create('Ext.grid.Panel', {
        id: 'zggdPanel',
        store: 'zggdStore',
        title: '整改工单',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单号', dataIndex: 'V_ORDERGUID', style: 'text-align: center;', width: 80},
            {text: '工单描述', dataIndex: 'V_SHORT_TXT', style: 'text-align: center;', width: 80},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', style: 'text-align: center;', width: 80},
            {text: '设备位置', dataIndex: 'V_FUNC_LOC', style: 'text-align: center;', width: 80},
            {text: '委托人', dataIndex: 'V_ENTERED_BY', style: 'text-align: center;', width: 80},
            {text: '委托单位', dataIndex: 'V_DEPTNAME', style: 'text-align: center;', width: 80},
            {text: '委托时间', dataIndex: 'D_ENTER_DATE', style: 'text-align: center;', width: 80},
            {text: '检修单位', dataIndex: 'V_JX_DEPTNAME', style: 'text-align: center;', width: 80}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'zggdStore',
            width: '100%'
        }]
    });
    //安全措施—安全措施整改tab
    var tab2 = Ext.create('Ext.tab.Panel', {
        id: 'tab2',
        title: '安全措施整改',
        frame: true,
        items: [zgxxPanel, zgsplcPanel, zgjdPanel, rgPanel, aq_gjPanel, aq_jjPanel,zggdPanel]
    });

    //安全措施附件gridPanel
    var aqcsfjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqcsfjPanel',
        columnLines: true,
        title: '安全措施附件',
        store: 'aqcsfjStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'V_FILENAME', align: 'center', flex: 1},
            {text: '上传时间', dataIndex: 'V_TIME', align: 'center', flex: 1},
            {text: '上传人', dataIndex: 'V_PERSON', align: 'center', flex: 1},
            {
                text: '附件下载', align: 'center', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_downloadAttach(\'' + record.data.V_GUID + '\')>下载</a>';//超链接导出
                }
            }],
        bbar: [{
            id: 'aqcsfjPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'aqcsfjStore',
            width: '100%'
        }]
    });

    //安全措施右边tab
    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',
        region: 'east',
        width: '53%',
        //border:'false',
        frame: true,
        items: [aqcsyaPanel, aqsgalPanel, tab2, aqcsfjPanel]
    });

    //安全措施panel
    var aqcsPanel = Ext.create('Ext.Panel', {
        id: 'aqcsPanel',
        title: '安全措施',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [aqcsPanel1, aqcsPanel2, tab1]
    });

    //已选检修技术标准按钮
    var jxjsbzButton = Ext.create('Ext.Panel', {
        id: 'jxjsbzButton',
        frame: true,
        title: '已选检修技术标准',
        region: 'north',
        border: false,
        layout: 'column',
        items: [{
            xtype: 'button', text: '删除', width: 60, style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/delete1.png', handler: _deletejxjsbz
        }]
    });

    //已选检修技术标准gridPanel
    var jxjsbzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxjsbzPanel1',
        columnLines: true,
        region: 'center',
        frame: true,
        store: 'jxjsbzStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '零件编号', dataIndex: 'V_PART_NUMBER', align: 'center', width: 80},
            {text: '零件名称', dataIndex: 'V_PART_NAME', align: 'center', width: 80},
            {text: '零件编码', dataIndex: 'V_PART_CODE', align: 'center', width: 80},
            {text: '材料', dataIndex: 'V_MATERIAL', align: 'center', width: 80},
            {
                text: '维修技术标准', align: 'center', flex: 4,
                columns: [
                    {text: '图面尺寸', dataIndex: 'V_IMGSIZE', align: 'center', flex: 1},
                    {text: '图面间隙', dataIndex: 'V_IMGGAP', align: 'center', flex: 1},
                    {text: '允许值(上限)', dataIndex: 'V_VALUE_UP', align: 'center', flex: 1},
                    {text: '允许值(下限)', dataIndex: 'V_VALUE_DOWN', align: 'center', flex: 1}]
            },
            {text: '更换周期', dataIndex: 'V_REPLACE_CYC', align: 'center', width: 80},
            {text: '重量', dataIndex: 'V_WEIGHT', align: 'center', width: 80},
            {text: '图号', dataIndex: 'V_IMGCODE', align: 'center', width: 80},
            {text: '备注', dataIndex: 'V_CONTENT', align: 'center', width: 80}],
        bbar: [{
            id: 'jxjsbzPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxjsbzStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _querygdmx(record.get('V_GUID'));
                _queryjxjj(record.get('V_GUID'));
                _queryjxgj(record.get('V_GUID'));
                _queryjxgz(record.get('V_GUID'));
            }
        }
    });

    //已选检修技术标准panel(技术要求左上)
    var jxjsbzPanel = Ext.create('Ext.Panel', {
        id: 'jxjsbzPanel',
        baseCls: 'my-panel-no-border',
        region: 'north',
        height: '50%',
        frame: true,
        layout: 'border',
        items: [jxjsbzButton, jxjsbzPanel1]
    });

    //子设备检修技术标准按钮
    var zsbjxButton = Ext.create('Ext.Panel', {
        id: 'zsbjxButton',
        frame: true,
        //baseCls: 'my-panel-no-border',
        region: 'north',
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 80, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'textfield', id: 'zsbmc', name: 'zsbmc', fieldLabel: '子设备名称:', maxLength: 60},
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                width: 60,
                handler: _queryzsb
            },
            {
                xtype: 'button', text: '选择', icon: imgpath + '/add.png', width: 60,
                handler: function () {
                    var records0 = Ext.getCmp('jxgxPanel').getSelectionModel().getSelection();
                    var records1 = Ext.getCmp('zsbjxPanel1').getSelectionModel().getSelection();
                    if (records1[0] == null) {
                        Ext.Msg.alert('操作信息', '请选择一条零件记录');
                    } else if (records0[0] == null) {
                        Ext.Msg.alert('操作信息', '检修工序未选择');
                    }
                    else {
                        Ext.Ajax.request({//加载被修改对象
                            url: AppUrl + 'Wsy/BASE_JXBZ_BY_GXCODE_INS',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_JXGX_CODE: records0[0].data.V_JXGX_CODE,
                                V_V_JSYQ_CODE: records1[0].data.V_GUID,
                                V_V_JSYQ_NAME: records1[0].data.V_PART_NAME
                            },
                            success: function (resp) {
                                var resp = Ext.decode(resp.responseText);
                                if (resp.V_INFO == 'SUCCESS') {
                                    Ext.Msg.alert('操作信息', '添加成功');
                                } else {
                                    Ext.Msg.alert('操作信息', '添加失败');
                                }
                            }
                        });
                        _queryjxjsbz();
                    }
                }
            }]
    });

    //子设备检修技术标准gridPanel
    var zsbjxPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'zsbjxPanel1',
        columnLines: true,
        region: 'center',
        frame: true,
        store: 'zsbjxStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '零件编号', dataIndex: 'V_PART_NUMBER', align: 'center', width: 80},
            {text: '零件名称', dataIndex: 'V_PART_NAME', align: 'center', width: 80},
            {text: '零件编码', dataIndex: 'V_PART_CODE', align: 'center', width: 80},
            {text: '材料', dataIndex: 'V_MATERIAL', align: 'center', width: 80},
            {
                text: '维修技术标准', align: 'center', flex: 4,
                columns: [
                    {text: '图面尺寸', dataIndex: 'V_IMGSIZE', align: 'center', flex: 1},
                    {text: '图面间隙', dataIndex: 'V_IMGGAP', align: 'center', flex: 1},
                    {text: '允许值(上限)', dataIndex: 'V_VALUE_UP', align: 'center', flex: 1},
                    {text: '允许值(下限)', dataIndex: 'V_VALUE_DOWN', align: 'center', flex: 1}]
            },
            {text: '更换周期', dataIndex: 'V_REPLACE_CYC', align: 'center', width: 80},
            {text: '重量', dataIndex: 'V_WEIGHT', align: 'center', width: 80},
            {text: '图号', dataIndex: 'V_IMGCODE', align: 'center', width: 80},
            {text: '备注', dataIndex: 'V_CONTENT', align: 'center', width: 80}],
        bbar: [{
            id: 'zsbjxPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'zsbjxStore',
            width: '100%'
        }]
    });

    //子设备检修技术标准panel（技术要求左下）
    var zsbjxPanel = Ext.create('Ext.Panel', {
        id: 'zsbjxPanel',
        baseCls: 'my-panel-no-border',
        region: 'center',
        frame: true,
        layout: 'border',
        items: [zsbjxButton, zsbjxPanel1]
    });

    //工单明细gridPanel
    var gdmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdmxPanel',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: 'gdmxStore',
        title: '工单明细',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单编号', dataIndex: 'V_ORDERID', align: 'center', width: 150},
            {text: '工单创建日期', dataIndex: 'D_ENTER_DATE', align: 'center', width: 230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gdmxStore.find('D_ENTER_DATE', value);
                    if (index != -1) {
                        return gdmxStore.getAt(index).get('D_ENTER_DATE').substring(0, 19);
                    }
                    return null;
                }},
            {text: '工单检修描述', dataIndex: 'V_SHORT_TXT', align: 'center', width: 150},
            {text: '工单类型', dataIndex: 'V_ORDER_TYP', align: 'center', width: 80},
            {text: '检修单位', dataIndex: 'V_DEPTNAME', align: 'center', width: 230},
            {text: '检修标准值', dataIndex: '', align: 'center', width: 80},
            {text: '工单状态', dataIndex: 'V_STATECODE', align: 'center', width: 80}],
        bbar: [{
            id: 'gdmxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdmxStore',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryqxmx(record.get('V_ORDERGUID'));
            }
        }
    });

    //缺陷明细gridPanel
    var qxmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'qxmxPanel',
        columnLines: true,
        region: 'center',
        store: 'qxmxStore',
        title: '缺陷明细',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '缺陷发现日期', dataIndex: 'D_DEFECTDATE', align: 'center', width:230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = qxmxStore.find('D_DEFECTDATE', value);
                    if (index != -1) {
                        return qxmxStore.getAt(index).get('D_DEFECTDATE').substring(0, 19);
                    }
                    return null;
                }},
            {text: '缺陷明细', dataIndex: 'V_DEFECTLIST', align: 'center', width:150},
            {text: '处理意见', dataIndex: 'V_IDEA', align: 'center', width:150},
            {text: '缺陷状态', dataIndex: 'V_STATECODE', align: 'center', width:150},
            {
                text: '缺陷来源', align: 'center', width:80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<a href=javascript:_openqxlyWindow(\'' + record.data.V_GUID + '\')>查看</a>';//超链接导出
                }
            }],
        bbar: [{
            id: 'qxmxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'qxmxStore',
            width: '100%'
        }]
    });

    //工单、缺陷明细
    var gdqxmxPanel = Ext.create('Ext.Panel', {
        id: 'gdqxmxPanel',
        title: '工单缺陷明细',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [gdmxPanel, qxmxPanel]
    });

    /*//技术要求右边tab—更换历史
    var ghlsPanel = Ext.create('Ext.grid.Panel', {
        id: 'ghlsPanel',
        columnLines: true,
        title: '更换历史',
        //baseCls: 'my-panel-no-border',
        //frame: true,
        store: 'gridStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '更换时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '距上次更换周期', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '更换原因', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid25page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });*/

    //技术要求右边tab—检修工种上面表格
    var jxgzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel1',
        title: '检修工种',
        columnLines: true,
        store: 'jxgzStore1',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'jxgzPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxgzStore1',
            width: '100%'
        }]
    });

    /*//技术要求右边tab—检修工种下面表格
    var jxgzPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel2',
        columnLines: true,
        region: 'center',
        store: 'gridStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种名称', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工种类型', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工种等级', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种定额', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种台时', dataIndex: 'data_', align: 'center', width: 80},
            {text: '人员姓名', dataIndex: 'data_', align: 'center', width: 80},
            {text: '所在工作中心', dataIndex: 'data_', align: 'center', width: 100}],
        bbar: [{
            id: 'grid27page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });*/

    /*//技术要求右边tab—检修工种
    var jxgzPanel = Ext.create('Ext.Panel', {
        id: 'jxgzPanel',
        title: '检修工种',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxgzPanel1, jxgzPanel2]
    });*/

    //技术要求右边tab—检修机具上面gridPanel
    var jxjjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel1',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: 'jxjjStore1',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'V_JJ_DE', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'jxjjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxjjStore1',
            width: '100%'
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _queryjxjjxx(record.get('V_JJ_CODE'));
            }
        }
    });

    //技术要求右边tab—检修机具下面gridPanel
    var jxjjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel2',
        columnLines: true,
        region: 'center',
        store: 'jxjjStore2',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', width: 80},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', width: 80},
            {text: '机具定额', dataIndex: 'V_DE', align: 'center', width: 80},
            {text: '机具所属单位', dataIndex: 'V_CARGUISUO', align: 'center', width: 100},
            {text: '机具用途', dataIndex: 'V_USE', align: 'center', width: 80},
            {text: '机具状态', dataIndex: 'V_FLAG', align: 'center', width: 80},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', align: 'center', width: 80}],
        bbar: [{
            id: 'jxjjPanel2_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxjjStore2',
            width: '100%'
        }]
    });

    //技术要求右边tab—检修机具
    var jxjjPanel = Ext.create('Ext.Panel', {
        id: 'jxjjPanel',
        title: '检修机具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxjjPanel1, jxjjPanel2]
    });

    //技术要求右边tab—检修工具gridPanel
    var jxgjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel1',
        title: '检修工具',
        columnLines: true,
        store: 'jxgjStore1',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具名称', dataIndex: 'V_TOOLNAME', align: 'center', flex: 1},
            {text: '工具类型', dataIndex: 'V_TOOLTYPE', align: 'center', flex: 1},
            {text: '工具存在地', dataIndex: 'V_TOOLPLACE', align: 'center', flex: 1},
            {text: '工具入厂时间', dataIndex: 'V_TOOLINDATE', align: 'center', width:230,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = jxgjStore1.find('V_TOOLINDATE', value);
                    if (index != -1) {
                        return jxgjStore1.getAt(index).get('V_TOOLINDATE').substring(0, 19);
                    }
                    return null;
                }},
            {text: '工具状态', dataIndex: 'V_TOOLSTATUS', align: 'center', flex: 1}],
        bbar: [{
            id: 'jxgjPanel1_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jxgjStore1',
            width: '100%'
        }]
    });

    /*//技术要求右边tab—检修工具下面表格
    var jxgjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel2',
        columnLines: true,
        region: 'center',
        store: 'gridStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工具名称', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工具存在地', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工具入厂时间', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工具状态', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid31page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore',
            width: '100%'
        }]
    });*/

    /* //技术要求右边tab—检修工具
     var jxgjPanel = Ext.create('Ext.Panel', {
         id: 'jxgjPanel',
         title: '检修工具',
         baseCls: 'my-panel-no-border',
         frame: true,
         layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
         items: [jxgjPanel1, jxgjPanel2]
     });*/

    //技术要求右边tab
    var tab3 = Ext.create('Ext.tab.Panel', {
        id: 'tab3',
        title: '检修详情',
        region: 'east',
        width: '50%',
        frame: true,
        items: [gdqxmxPanel, jxgzPanel1, jxjjPanel, jxgjPanel1]
    });

    //技术要求
    var jsyqPanel = Ext.create('Ext.Panel', {
        id: 'jsyqPanel',
        title: '技术要求',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxjsbzPanel, zsbjxPanel, tab3]
    });

    //历史工单—维修信息gridPanel
    var wxxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'wxxxPanel',
        title: '维修信息',
        columnLines: true,
        store: 'lsgdStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单号', dataIndex: 'V_ORDERID', align: 'center', flex: 1},
            {text: '工单类型', dataIndex: 'V_ORDER_TYP_TXT', align: 'center', flex: 1},
            {text: '检修内容', dataIndex: 'V_SHORT_TXT', align: 'center', flex: 1},
            {text: '工单创建时间', dataIndex: 'D_ENTER_DATE', align: 'center', flex: 1},
            {text: '检修单位', dataIndex: 'V_DEPTNAME', align: 'center', flex: 1}],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _querygdgz(record.get('V_ORDERGUID'));
                _querygdgj(record.get('V_ORDERGUID'));
                _querygdjj(record.get('V_ORDERGUID'));
                _querygdwl(record.get('V_ORDERGUID'));
            }
        },
        bbar: [{
            id: 'wxxxPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'lsgdStore',
            width: '100%'
        }]
    });

    //历史工单—工种gridPanel
    var gdgzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdgzPanel',
        title: '工种',
        columnLines: true,
        store: 'gdgzStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'V_PERCODE_DE', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'V_PERNAME_DE', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'V_PERTYPE_DE', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'V_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid33page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdgzStore',
            width: '100%'
        }]
    });

    //历史工单—工具gridPanel
    var gdgjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdgjPanel',
        title: '工具',
        columnLines: true,
        store: 'gdgjStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'V_GJ_CODE', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'V_GJ_NAME', align: 'center', flex: 1},
            {text: '工具类型', dataIndex: 'V_GJ_TYPE', align: 'center', flex: 1}],
        bbar: [{
            id: 'gdgjPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdgjStore',
            width: '100%'
        }]
    });

    //历史工单—机具gridPanel
    var gdjjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdjjPanel',
        title: '机具',
        columnLines: true,
        store: 'gdjjStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_JJ_CODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_JJ_NAME', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'V_JJ_TYPE', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'V_JJ_TS', align: 'center', flex: 1}],
        bbar: [{
            id: 'gdjjPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdjjStore',
            width: '100%'
        }]
    });

    //历史工单—物料
    var gdwlPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdwlPanel',
        title: '物料',
        columnLines: true,
        store: 'gdwlStore',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'V_WLCODE', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'V_WLSM', align: 'center', flex: 1},
            {text: '数量', dataIndex: 'V_USE_NUM', align: 'center', flex: 1},
            {text: '删除', dataIndex: '', align: 'center', flex: 1,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteGdwl()'>删除</a></span>";
                }}],
        bbar: [{
            id: 'gdwlPanel_toolbar',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gdwlStore',
            width: '100%'
        }]
    });

    //历史工单tab
    var tab4 = Ext.create('Ext.tab.Panel', {
        id: 'tab4',
        title: '历史工单',
        frame: true,
        items: [wxxxPanel, gdgzPanel, gdgjPanel, gdjjPanel, gdwlPanel]
    });

    //右边大tab
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        //border:'false',
        frame: true,
        items: [gzPanel, jjPanel, gjPanel1, wlPanel, aqcsPanel, jsyqPanel, tab4]
    });

    //缺陷生命周期弹窗
    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        title: '缺陷生命周期',
        height: 300,
        closeAction: 'hide',
        width: 500,
        modal: true,
        frame: true
    });

    //查看附件弹窗
    var attachWindow = Ext.create('Ext.window.Window', {
        id: 'attachWindow',
        title: '查看附件',
        height: 520,
        closeAction: 'hide',
        width: 860,
        layout: 'fit',
        modal: true,
        frame: true,
        items: [Ext.create("Ext.grid.Panel", {
            id: 'attachPanel',
            store: 'aqcsfjStore1',
            columnLines: true,
            frame: true,
            columns: [
                {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
                {text: '附件名称', dataIndex: 'V_FILENAME', align: 'center', flex: 1},
                {text: '上传时间', dataIndex: 'V_TIME', align: 'center', flex: 1},
                {text: '上传人', dataIndex: 'V_PERSON', align: 'center', flex: 1},
                {
                    text: '下载', align: 'center', flex: 0.7,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<a href=javascript:_downloadAttach(\'' + record.data.V_GUID + '\')>下载</a>';//超链接导出
                    }
                }],
            bbar: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'aqcsfjStore1',
                width: '100%'
            }]
        })],
        buttons: [
            {
                xtype: 'button',
                text: '关闭',
                width: 40,
                handler: function () {
                    attachWindow.close();
                }
            }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {type: 'border', regionWeights: {north: 4, east: 3, south: 2, west: -1}},
        defaults: {border: false},
        items: [
            {region: 'north', items: [inputPanel]},
            {region: 'east', layout: 'fit', width: '60%', items: [tab]},
            {region: 'south', layout: 'fit', height: '40%', items: [jxmxsgtPanel]},
            {region: 'center', layout: 'fit', items: [zuoshangPanel]}]
    });

    //树状结构点击节点展开子项
    Ext.getCmp("sblxTreePanel").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('plant').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('dept').getValue(),
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_EQU_TREE')
        } else if (operation.node.data.parentid == -2) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('plant').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('dept').getValue(),
                    V_V_EQUTYPECODE: '%',
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });
});

//根据厂矿进行作业区联动
function _selectDept() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('plant').getValue();
    zyqStore.load();
}

//根据厂矿作业区查询设备树
function _queryTree() {
    Ext.getCmp('sblxTreePanel').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'CarManage/PRO_GET_DEPTEQUTYPE_PER',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('dept').getValue()
        }
    });
    Ext.getCmp('sblxTreePanel').store.load();
}

//点击设备树item查询检修模型窗口
function _queryjxmx(sid) {
    var jxgxStore = Ext.data.StoreManager.lookup('jxgxStore');
    jxgxStore.removeAll();
    Ext.data.StoreManager.lookup('jxmxStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('plant').getValue(),
            V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
            V_V_EQUTYPE: '%',
            V_V_EQUCODE: sid,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: '%',
            V_V_PAGE: Ext.getCmp('jxmxPanel_toolbar').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('jxmxPanel_toolbar').store.pageSize
        }
    });
}

//点击设备树item查询工具窗口
function _querygj(sid) {
    Ext.data.StoreManager.lookup('gjStore1').load({
        params: {
            V_V_TOOLNAME: '%',
            V_V_EQUCODE: sid
        }
    });
}

//点击设备树item查询子设备检修技术标准
function _queryzsbjx(sid) {
    Ext.getCmp('zsbmc').setValue('');
    Ext.data.StoreManager.lookup('zsbjxStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('plant').getValue(),
            V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
            V_V_EQUCODE: sid,
            V_V_EQUCHILDCODE: '%'
        }
    });
}

//点击子设备名称按钮查询子设备检修技术标准
function _queryzsb() {
    var records = Ext.getCmp('sblxTreePanel').getSelectionModel().getSelection();
    Ext.data.StoreManager.lookup('zsbjxStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('plant').getValue(),
            V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
            V_V_EQUCODE: records[0].data.sid,
            V_V_EQUCHILDCODE: Ext.getCmp('zsbmc').getValue()
        }
    });
}

//点击检修模型item查询工序窗口
function _querygx(V_MX_CODE) {
    Ext.data.StoreManager.lookup('jxgxStore').load({
        params: {
            V_V_JXMX_CODE: V_MX_CODE
        }
    });
}

//点击检修模型item显示网络施工图
function _preViewImage(V_MX_CODE) {
    var url = AppUrl + 'Wsy/BASE_FILE_IMAGE_SEL?V_V_GUID=' + V_MX_CODE;
    Ext.getCmp("browseImage").getEl().dom.src = url;
}

//点击选择按钮查询所有工种
function _selectgz() {
    var records = Ext.getCmp('jxgxPanel').getSelectionModel().getSelection();
    var returnValue = null;
    if (records[0] == null) {
        Ext.Msg.alert('操作信息', '请选择一个工序');
    } else {
        var gzStore = Ext.data.StoreManager.lookup('gzStore');
        gzStore.load();
        gzwindow = Ext.create('Ext.window.Window', {
            title: '选择工种',
            modal: true,
            autoShow: true,
            maximized: false,
            maximizable: false,
            width: 860,
            layout: 'fit',
            height: 520,
            items: [Ext.create("Ext.grid.Panel", {
                id: 'selectgzpanel',
                store: 'gzStore',
                columnLines: true,
                frame: true,
                columns: [
                    {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
                    {text: '工种编码', dataIndex: 'V_WORKCODE', align: 'center', flex: 1},
                    {text: '工种名称', dataIndex: 'V_WORKNAME', align: 'center', flex: 1},
                    {text: '工种类型', dataIndex: 'V_WORKTYPE', align: 'center', flex: 1},
                    {text: '工种定额', dataIndex: 'V_DE', align: 'center', flex: 1},
                    {text: '台时', dataIndex: 'V_TIME', align: 'center', flex: 0.7}],
                bbar: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                    emptyMsg: '没有记录',
                    store: 'gzStore',
                    width: '100%'
                }]
            })],
            buttons: [
                {
                    xtype: 'button',
                    text: '确定',
                    width: 40,
                    handler: function () {
                        var records = Ext.getCmp('selectgzpanel').getSelectionModel().getSelection();
                        if (records[0] == null) {
                            Ext.Msg.alert('操作信息', '请选择一个工种');
                        } else {
                            returnValue = records[0];
                            gzwindow.close();
                        }
                    }
                }, {
                    xtype: 'button',
                    text: '取消',
                    width: 40,
                    handler: function () {
                        gzwindow.close();
                    }
                }],
            listeners: {
                close: function (panel, eOpts) {
                    if (returnValue != null) {
                        Ext.Ajax.request({//加载被修改对象
                            url: AppUrl + 'Wsy/BASE_JXMX_GZ_INS',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_JXGX_CODE: records[0].data.V_JXGX_CODE,
                                V_V_PERCODE_DE: returnValue.data.V_WORKCODE,
                                V_V_PERNAME_DE: returnValue.data.V_WORKNAME,
                                V_V_TS: returnValue.data.V_TIME,
                                V_V_DE: returnValue.data.V_DE,
                                V_V_PERTYPE_DE: returnValue.data.V_WORKTYPE
                            },
                            success: function (resp) {
                                var resp = Ext.decode(resp.responseText);
                                if (resp.V_INFO == 'SUCCESS') {
                                    Ext.Msg.alert('操作信息', '修改成功');
                                } else {
                                    Ext.Msg.alert('操作信息', '修改失败');
                                }
                            }
                        });
                        Ext.data.StoreManager.lookup('gzStore1').load({
                            params: {
                                V_V_JXGX_CODE: records[0].data.V_JXGX_CODE
                            }
                        });
                    }
                }
            }
        });
    }
}

//删除与工序CODE关联的工种
function _deletegz() {
    var records = Ext.getCmp('gzPanel1').getSelectionModel().getSelection();
}

//点击工序item查询工种
function _querygz(V_JXGX_CODE) {
    Ext.data.StoreManager.lookup('gzStore1').load({
        params: {
            V_V_JXGX_CODE: V_JXGX_CODE
        }
    });
}

//点击工序item查询机具
function _queryjj(V_JXGX_CODE) {
    Ext.data.StoreManager.lookup('jjStore').load({
        params: {
            V_V_JXGX_CODE: V_JXGX_CODE
        }
    });
}

//点击工序item查询检修技术标准
function _queryjxjsbz() {
    var records = Ext.getCmp('jxgxPanel').getSelectionModel().getSelection();
    Ext.data.StoreManager.lookup('jxjsbzStore').load({
        params: {
            V_V_GX_CODE: records[0].data.V_JXGX_CODE
        }
    });
}

//点击工序item查询历史工单
function _querylsgd(V_JXGX_CODE) {
    Ext.data.StoreManager.lookup('lsgdStore').load({
        params: {
            V_V_GX_GUID: V_JXGX_CODE
        }
    });
}

//点击工序item查询物料
function _querywl(V_JXGX_CODE) {
    Ext.data.StoreManager.lookup('wlStore').load({
        params: {
            V_V_JXGX_CODE: V_JXGX_CODE
        }
    });
}

//点击工序item查询安全措施
function _queryaqcs(V_JXGX_CODE) {
    Ext.data.StoreManager.lookup('aqcsStore').load({
        params: {
            V_V_GX_CODE: V_JXGX_CODE
        }
    });
}

//点击安全措施item查询安全措施预案
function _queryaqcsya(V_AQCS_CODE) {
    Ext.data.StoreManager.lookup('aqcsyaStore').load({
        params: {
            V_V_AQCS_CODE: V_AQCS_CODE
        }
    });
}

//点击安全措施item查询安全事故案例
function _queryaqsgal(V_AQCS_CODE) {
    Ext.data.StoreManager.lookup('aqsgalStore').load({
        params: {
            V_V_AQCS_CODE: V_AQCS_CODE
        }
    });
}

//点击安全措施item查询安全措施详情
function _queryaqcsxq(V_AQCS_CODE) {
    var aqcsxq
    Ext.Ajax.request({//加载被修改对象
        url: AppUrl + 'Wsy/BASE_AQCS_BYCODE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_AQCS_CODE: V_AQCS_CODE
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            Ext.getCmp('V_AQCS_NAME').setValue(resp.list[0].V_AQCS_NAME);//设备名称
            Ext.getCmp('V_AQCS_DETAIL').setValue(resp.list[0].V_AQCS_DETAIL);//设备类型编码
            Ext.getCmp('V_AQ_ZYSX').setValue(resp.list[0].V_AQ_ZYSX);//设备类型位置
        }
        /* callback: function (options, success, response) {
             if (success) {
                 alert('123');
                 var data = Ext.decode(response.responseText);
                 aqcsxq = data.list;
                 alert(aqcsxq);
             }
         }*/
    });
    /*var form = Ext.getCmp('aqcsPanel2').getForm();
    for (var key in aqcsxq) {//装载被修改数据到页面
        (form.findField(key) != null) ? form.findField(key).setValue(aqcsxq[key]) : 0;
    }
    form.isValid();//校验数据*/
}

//点击安全措施item查询安全事故整改
function _queryaqcszg(V_AQCS_CODE) {
    Ext.data.StoreManager.lookup('aqcszgStore').load({
        params: {
            V_V_AQCS_CODE: V_AQCS_CODE
        }
    });
}

//点击安全措施item查询安全措施附件
function _queryaqcsfj(V_AQCS_CODE) {
    Ext.data.StoreManager.lookup('aqcsfjStore').load({
        params: {
            V_V_GUID: V_AQCS_CODE
        }
    });
}

//点击检修技术标准item查询工单明细
function _querygdmx(V_GUID) {
    Ext.data.StoreManager.lookup('gdmxStore').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修技术标准item查询检修机具
function _queryjxjj(V_GUID) {
    Ext.data.StoreManager.lookup('jxjjStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修机具item查询检修机具信息
function _queryjxjjxx(V_CARCODE) {
    Ext.data.StoreManager.lookup('jxjjStore2').load({
        params: {
            V_V_CAR_CODE: V_CARCODE
        }
    });
}

//点击检修技术标准item查询检修工具
function _queryjxgj(V_GUID) {
    Ext.data.StoreManager.lookup('jxgjStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击检修技术标准item查询检修工种
function _queryjxgz(V_GUID) {
    Ext.data.StoreManager.lookup('jxgzStore1').load({
        params: {
            V_V_JXBZ_GUID: V_GUID
        }
    });
}

//点击历史工单维护信息item查询历史工单工种
function _querygdgz(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('gdgzStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
}

//点击历史工单维护信息item查询历史工单工具
function _querygdgj(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('gdgjStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
}

//点击历史工单维护信息item查询历史工单机具
function _querygdjj(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('gdjjStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
}

//点击历史工单维护信息item查询历史工单物料
function _querygdwl(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('gdwlStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
}

//点击工单明细item查询缺陷明细
function _queryqxmx(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('qxmxStore').load({
        params: {
            V_V_GD_GUID: V_ORDERGUID
        }
    });
}

//点击机具item查询机具信息
function _queryjjxx(V_JJ_CODE) {
    Ext.data.StoreManager.lookup('jjxxStore').load({
        params: {
            V_V_CAR_CODE: V_JJ_CODE
        }
    });
}

function _select() {
    var jsStandardStore = Ext.data.StoreManager.lookup('jsStandardStore');
    jsStandardStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUCODE': Ext.getCmp('V_V_EQUCODE').getValue(),
        'V_V_EQUCHILDCODE': Ext.getCmp('V_V_EQUCHILDCODE').getValue()

    };
    jsStandardStore.load();
}

function _insert() {
}

function _update() {
}

function _delete() {
}

function _deletejxjsbz() {
}

function _open() {
    Ext.getCmp('window').show();
}

//打开附件窗口
function _openAttachWindow(V_ZG_GUID) {
    Ext.data.StoreManager.lookup('aqcsfjStore1').load({
        params: {
            V_V_GUID: V_ZG_GUID
        }
    });
    Ext.getCmp('attachWindow').show();
}

function _save() {
}

function _expand() {
    Ext.getCmp('sblxTreePanel').expandAll();
}

//缺陷来源弹窗
function _openqxlyWindow(V_GUID) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index.html?v_guid="
        + V_GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

//附件下载
function _downloadAttach(V_GUID) {//导出
    var url = AppUrl + 'Wsy/downloadAttachment?V_V_GUID=' + V_GUID;
    location.href = url;
}
function _selectZggd(V_ZG_GUID){

    var zggdStore = Ext.data.StoreManager.lookup('zggdStore');
    zggdStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    zggdStore.currentPage = 1;
    zggdStore.load();
}
function  _selectRg(V_ZG_GUID){
    Ext.getCmp('tab2').setActiveTab(3);
    var rgStore = Ext.data.StoreManager.lookup('rgStore');
    rgStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    rgStore.currentPage = 1;
    rgStore.load();
}
function  _selectGj(V_ZG_GUID){

    var gjStore = Ext.data.StoreManager.lookup('gjStore');
    gjStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    gjStore.currentPage = 1;
    gjStore.load();
}
function  _selectJj(V_ZG_GUID){

    var JjStore = Ext.data.StoreManager.lookup('JjStore');
    JjStore.proxy.extraParams.V_V_ZG_GUID = V_ZG_GUID;
    JjStore.currentPage = 1;
    JjStore.load();
}
function  _deleteAqcs(){

}

function _deleteGdwl(){

}