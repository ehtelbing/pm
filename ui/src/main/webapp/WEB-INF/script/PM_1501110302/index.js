var recordid = '';
if (location.href.split('?')[1] != undefined) {
    recordid = Ext.urlDecode(location.href.split('?')[1]).recordid;
}
//基础信息页
var baseInfoStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'baseInfoStore',
    fields : [ 'SY_LOC_DESC',
        'SY_LOC_CODE',
        'SY_EQU_ID',
        'SY_EQU_NAME',
        'SY_DATE',
        'SY_WEATHER',
        'SY_TEMP',
        'DZ_CODE',
        'DZ_MAKE',
        'DZ_TYPE',
        'DZ_KV',
        'DZ_A',
        'DZ_OUTDATE',
        'SY_RESP_USERNAME',
        'SY_EXA_USERNAME',
        'SY_REASON',
        'SY_VERDICT',
        'RECORD_ID'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201002_onedetail',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            recordcode_in : recordid
        }
    }
});


//第二页
var TwoStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'TwoStore',
    fields : [ 'RECORD_ID',
        'ID',
        'YQXS',
        'YQBH',
        'A1',
        'A2',
        'B1',
        'B2',
        'C1',
        'C2',
        'A3',
        'B3',
        'C3',
        'OP_USER',
        'RECORD_USER',
        'JX_USER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201002_twodetail',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            v_record_id : recordid
        }
    }
});

//第三页
var ThreeStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'ThreeStore',
    fields : [ 'ID',
        'RECORD_ID',
        'YQXS',
        'YQBH',
        'A_DS',
        'B_DS',
        'C_DS',
        'A_BL',
        'B_BL',
        'C_BL',
        'A_SCZ',
        'B_SCZ',
        'C_SCZ',
        'OP_USER',
        'RECORD_USER',
        'JX_USER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201002_threedetail',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            v_record_id : recordid
        }
    }
});

//第四页
var FourStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'FourStore',
    fields : [ 'ID',
        'RECORD_ID',
        'YQXS',
        'YQBH',
        'HZ_V',
        'HZ_A',
        'HZ_T',
        'FZ_V',
        'FZ_A',
        'FZ_T',
        'XJ_V',
        'XJ_A',
        'XJ_T',
        'OP_USER',
        'RECORD_USER',
        'JX_USER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201002_fourdetail',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            v_record_id : recordid
        }
    }
});

Ext.onReady(function() {
    baseInfoStore.on('load', function(me) {
        TwoStore.load();
    });
    TwoStore.on('load', function(me) {
        ThreeStore.load();
    });
    ThreeStore.on('load', function(me) {
        FourStore.load();
    });
    FourStore.on('load', function(me) {
        load();
    });
})
function load() {
    // -----------------------基础信息--------------------
    if (baseInfoStore.data.getAt(0) == null || baseInfoStore.data.getAt(0) == '') {
    } else {
        Ext.fly('szdd').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_LOC_DESC;
        Ext.fly('syss').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_DATE.split(' ')[0];
        Ext.fly('sstq').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_WEATHER;
        Ext.fly('ssqw').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_TEMP;
        Ext.fly('dzbh').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_CODE;
        Ext.fly('dzzzc').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_MAKE;
        Ext.fly('dzxs').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_TYPE;
        Ext.fly('eddy').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_KV;
        Ext.fly('eddl').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_A;
        Ext.fly('cc').dom.innerHTML = baseInfoStore.data.getAt(0).data.DZ_OUTDATE.split(' ')[0];
        Ext.fly('syyy').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_REASON;
        Ext.fly('syjl').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_VERDICT;
        Ext.fly('syfzr').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_RESP_USERNAME;
        Ext.fly('sysh').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_EXA_USERNAME;
    }



    if (TwoStore.data.getAt(0) == null || TwoStore.data.getAt(0) == '') {
    } else {
        Ext.fly('jydzsyyqxs').dom.innerHTML = TwoStore.data.getAt(0).data.YQXS;
        Ext.fly('jydzsybh').dom.innerHTML = TwoStore.data.getAt(0).data.YQBH;
        Ext.fly('a1').dom.innerHTML = TwoStore.data.getAt(0).data.A1;
        Ext.fly('a2').dom.innerHTML = TwoStore.data.getAt(0).data.A2;
        Ext.fly('b1').dom.innerHTML = TwoStore.data.getAt(0).data.B1;
        Ext.fly('b2').dom.innerHTML = TwoStore.data.getAt(0).data.B2;
        Ext.fly('c1').dom.innerHTML = TwoStore.data.getAt(0).data.C1;
        Ext.fly('c2').dom.innerHTML = TwoStore.data.getAt(0).data.C2;
        Ext.fly('a3').dom.innerHTML = TwoStore.data.getAt(0).data.A3;
        Ext.fly('b3').dom.innerHTML = TwoStore.data.getAt(0).data.B3;
        Ext.fly('c3').dom.innerHTML = TwoStore.data.getAt(0).data.C3;
        Ext.fly('jydzjlr').dom.innerHTML = TwoStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('jydzczr').dom.innerHTML = TwoStore.data.getAt(0).data.OP_USER;
        Ext.fly('jydzjxr').dom.innerHTML = TwoStore.data.getAt(0).data.JX_USER;
    }



    if (ThreeStore.data.getAt(0) == null || ThreeStore.data.getAt(0) == '') {
    } else {
        Ext.fly('jcdysyyqxs').dom.innerHTML = ThreeStore.data.getAt(0).data.YQXS;
        Ext.fly('jcdysybh').dom.innerHTML = ThreeStore.data.getAt(0).data.YQBH;
        Ext.fly('a_ds').dom.innerHTML = ThreeStore.data.getAt(0).data.A_DS;
        Ext.fly('b_ds').dom.innerHTML = ThreeStore.data.getAt(0).data.B_DS;
        Ext.fly('c_ds').dom.innerHTML = ThreeStore.data.getAt(0).data.C_DS;
        Ext.fly('a_bl').dom.innerHTML = ThreeStore.data.getAt(0).data.A_BL;
        Ext.fly('b_bl').dom.innerHTML = ThreeStore.data.getAt(0).data.B_BL;
        Ext.fly('c_bl').dom.innerHTML = ThreeStore.data.getAt(0).data.C_BL;
        Ext.fly('a_scz').dom.innerHTML = ThreeStore.data.getAt(0).data.A_SCZ;
        Ext.fly('b_scz').dom.innerHTML = ThreeStore.data.getAt(0).data.B_SCZ;
        Ext.fly('c_scz').dom.innerHTML = ThreeStore.data.getAt(0).data.C_SCZ;
        Ext.fly('jcdzcz').dom.innerHTML = ThreeStore.data.getAt(0).data.OP_USER;
        Ext.fly('jcdzlx').dom.innerHTML = ThreeStore.data.getAt(0).data.JX_USER;
        Ext.fly('jcdzjl').dom.innerHTML = ThreeStore.data.getAt(0).data.RECORD_USER;
    }
    if (FourStore.data.getAt(0) == null || FourStore.data.getAt(0) == '') {
    } else {
        Ext.fly('gcnysyyqxs').dom.innerHTML = FourStore.data.getAt(0).data.YQXS;
        Ext.fly('gcnysybh').dom.innerHTML = FourStore.data.getAt(0).data.YQBH;
        Ext.fly('hz_v').dom.innerHTML = FourStore.data.getAt(0).data.HZ_V;
        Ext.fly('hz_a').dom.innerHTML = FourStore.data.getAt(0).data.HZ_A;
        Ext.fly('hz_t').dom.innerHTML = FourStore.data.getAt(0).data.HZ_T;
        Ext.fly('fz_v').dom.innerHTML = FourStore.data.getAt(0).data.FZ_V;
        Ext.fly('fz_a').dom.innerHTML = FourStore.data.getAt(0).data.FZ_A;
        Ext.fly('fz_t').dom.innerHTML = FourStore.data.getAt(0).data.FZ_T;
        Ext.fly('xj_v').dom.innerHTML = FourStore.data.getAt(0).data.XJ_V;
        Ext.fly('xj_a').dom.innerHTML = FourStore.data.getAt(0).data.XJ_A;
        Ext.fly('xj_t').dom.innerHTML = FourStore.data.getAt(0).data.XJ_T;
        Ext.fly('gcnycz').dom.innerHTML = FourStore.data.getAt(0).data.OP_USER;
        Ext.fly('gznyjx').dom.innerHTML = FourStore.data.getAt(0).data.JX_USER;
        Ext.fly('gznyjl').dom.innerHTML = FourStore.data.getAt(0).data.RECORD_USER;
    }
}

function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP'), document
            .getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190","", "");
        LODOP.PRINT_INIT("gongdan");
        var strBodyStyle = "<style>" + document.getElementById('stylePrint').innerHTML + "</style>";

        LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');

        var strFormHtml = strBodyStyle + document.getElementById('main').innerHTML;
        LODOP.ADD_PRINT_HTM("5", "5", "100%", "100%", strFormHtml);
        LODOP.NewPage();
    } catch (e) {
        document.getElementById('exception').style.display = 'block';
    }
}

function dataPrint() {
    try {
        DefaultPrintSettings();
        LODOP.PRINT();
    } catch (e) {
        document.getElementById('exception').style.display = 'block';
    }
}
function printPreview() {
    try {
        DefaultPrintSettings();
        LODOP.PREVIEW();
    } catch (e) {
        document.getElementById('exception').style.display = 'block';
    }
}

