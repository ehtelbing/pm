//var recordid = '144d0537-a37d-17f1-e050-007f01007fd8';
var recordid = '';
if (location.href.split('?')[1] != undefined) {
    recordid = Ext.urlDecode(location.href.split('?')[1]).recordid;
}

// -------------------基础信息----------------\\
/*var baseInfoStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'baseInfoStore',
    fields : [ 'RECORD_ID', 'RECORD_DATE', 'SY_DATE', 'RECORD_USERID',
        'RECORD_USERNAME', 'DEPARTCODE', 'DEPARTNAME', 'PLANTCODE',
        'PLANTNAME', 'SY_LOC_CODE', 'SY_LOC_DESC', 'SY_EQU_ID',
        'SY_EQU_NAME', 'SY_WEATHER', 'SY_TEMP', 'SY_URL', 'SY_REASON',
        'SY_VERDICT', 'SY_RESP_USERID', 'SY_RESP_USERNAME',
        'SY_EXA_USERID', 'SY_EXA_USERNAME', 'RECORD_STATUS', 'ITEM_CODE',
        'ITEM_NAME', 'ITEMTYPE', 'ITEMTYPE_DESC', 'SUBMIT_DATE',
        'SUBMIT_USERID', 'SUBMIT_USERNAME', 'UP_TEMP', 'BYQ_CODE',
        'BYQ_PLANT', 'BYQ_DATE', 'BYQ_VOL', 'BYQ_TYPE', 'BYQ_HZ', 'BYQ_V',
        'BYQ_JX', 'BYQ_TGXS', 'BYQ_OUT_CHECK', 'BYQ_OUT_CHECKUSER'

    ],
    proxy : {
        type : 'ajax',
        url : APP + '/ModelSelect',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            parName : [ 'recordcode_in' ],
            parType : [ 's' ],
            parVal : [ recordid ],
            proName : 'pro_sy201001_onedetail',
            cursorName : 'ret'
        }
    }
});*/

var baseInfoStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'baseInfoStore',
    fields : [ 'RECORD_ID', 'RECORD_DATE', 'SY_DATE', 'RECORD_USERID',
        'RECORD_USERNAME', 'DEPARTCODE', 'DEPARTNAME', 'PLANTCODE',
        'PLANTNAME', 'SY_LOC_CODE', 'SY_LOC_DESC', 'SY_EQU_ID',
        'SY_EQU_NAME', 'SY_WEATHER', 'SY_TEMP', 'SY_URL', 'SY_REASON',
        'SY_VERDICT', 'SY_RESP_USERID', 'SY_RESP_USERNAME',
        'SY_EXA_USERID', 'SY_EXA_USERNAME', 'RECORD_STATUS', 'ITEM_CODE',
        'ITEM_NAME', 'ITEMTYPE', 'ITEMTYPE_DESC', 'SUBMIT_DATE',
        'SUBMIT_USERID', 'SUBMIT_USERNAME', 'UP_TEMP', 'BYQ_CODE',
        'BYQ_PLANT', 'BYQ_DATE', 'BYQ_VOL', 'BYQ_TYPE', 'BYQ_HZ', 'BYQ_V',
        'BYQ_JX', 'BYQ_TGXS', 'BYQ_OUT_CHECK', 'BYQ_OUT_CHECKUSER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_onedetail',
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

// -------------------直流试验----------------\\

var DCTestStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'DCTestStore',
    fields : [ 'ID', 'RECORD_ID', 'YQXS', 'YQBH', 'AB_1', 'BC_1', 'CA_1',
        'PER_1', 'AB_X1', 'BC_X1', 'CA_X1', 'PER_X1', 'AB_2', 'BC_2',
        'CA_2', 'PER_2', 'AB_3', 'BC_3', 'CA_3', 'PER_3', 'AB_4', 'BC_4',
        'CA_4', 'PER_4', 'AB_5', 'BC_5', 'CA_5', 'PER_5', 'OP_USER',
        'RECORD_USER', 'JX_USER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_twodetail',
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

// -------------------漏泄电流----------------\\
var leakageCurrentStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'leakageCurrentStore',
    fields : [ 'ID', 'RECORD_ID', 'V_H', 'A_H', 'V_L', 'A_L', 'YQXS', 'YQBH',
        'OP_USER', 'RECORD_USER', 'JX_USER'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_threedetail',
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

// -------------------电阻试验----------------\\
var hinderTestStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'hinderTestStore',
    fields : [ 'ID', 'RECORD_ID', 'YQXS', 'YQBH', 'OP_USER',
        'RECORD_USER', 'JX_USER', 'HV_15', 'HV_60', 'HV_PER',
        'LV_15', 'LV_60', 'LV_PER' ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_fourdetail',
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

// -------------------工频试验----------------\\
var rateTestStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'rateTestStore',
    fields : [ 'ID', 'RECORD_ID', 'YQXS', 'YQBH', 'OP_USER', 'RECORD_USER',
        'JX_USER', 'HV_V', 'HV_A', 'HV_TIME', 'LV_V', 'LV_A', 'LV_TIME' ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_fivedetail',
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

// -------------------介损数据----------------\\

var damageDataStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'damageDataStore',
    fields : [ 'ID', 'RECORD_ID', 'YQXS', 'YQBH', 'OP_USER', 'RECORD_USER',
        'JX_USER', 'HV1_V', 'HV1_N', 'HV1_P', 'HV1_R3', 'HV1_TG',
        'HV1_TGBZ', 'LV2_V', 'LV2_N', 'LV2_P', 'LV2_R3', 'LV2_TG',
        'LV2_TGBZ', 'HV3_V', 'HV3_N', 'HV3_P', 'HV3_R3', 'HV3_TG',
        'HV3_TGBZ' ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_sixdetail',
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


// -------------------变压比----------------\\
var voltageRateStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'voltageRateStore',
    fields : [ 'ID', 'RECORD_ID', 'YQXS', 'YQBH', 'OP_USER', 'RECORD_USER',
        'JX_USER', 'ZBCL', 'WC_AB_1', 'WC_AB_2', 'WC_AB_3', 'WC_AB_4',
        'WC_AB_5', 'WC_BC_1', 'WC_BC_2', 'WC_BC_3', 'WC_BC_4', 'WC_BC_5',
        'WC_CA_1', 'WC_CA_2', 'WC_CA_3', 'WC_CA_4', 'WC_CA_5', 'CLB_AB_1',
        'CLB_AB_2', 'CLB_AB_3', 'CLB_AB_4', 'CLB_AB_5', 'CLB_BC_1',
        'CLB_BC_2', 'CLB_BC_3', 'CLB_BC_4', 'CLB_BC_5', 'CLB_CA_1',
        'CLB_CA_2', 'CLB_CA_3', 'CLB_CA_4', 'CLB_CA_5', 'HVC_AB_1',
        'HVC_AB_2', 'HVC_AB_3', 'HVC_AB_4', 'HVC_AB_5', 'LVC_AB_1',
        'LVC_AB_2', 'LVC_AB_3', 'LVC_AB_4', 'LVC_AB_5' ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/pro_sy201001_sevendetail',
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


Ext.onReady(function() {
    baseInfoStore.on('load', function(me) {
        load();
    });
    DCTestStore.on('load', function(me) {
        load();
    });
    hinderTestStore.on('load', function(me) {
        load();
    });
    rateTestStore.on('load', function(me) {
        load();
    });
    damageDataStore.on('load', function(me) {
        load();
    });
    voltageRateStore.on('load', function(me) {
        load();
    });
    leakageCurrentStore.on('load', function(me) {
        load();
    });
    //printPreview();
    //load();
})

function load() {
    // -----------------------基础信息-------------------- \\
    if (baseInfoStore.data.getAt(0) == null || baseInfoStore.data.getAt(0) == '') {
    } else {
        Ext.fly('szdd').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_LOC_DESC;
        //var re = /\s*\s*00:00:00\/;
        //var nameList = names.split(re);
        Ext.fly('syrq').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_DATE.split(' ')[0];
        Ext.fly('tq').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_WEATHER;
        Ext.fly('qw').dom.innerHTML = baseInfoStore.data.getAt(0).data.SY_TEMP;
        Ext.fly('scyw').dom.innerHTML = baseInfoStore.data.getAt(0).data.UP_TEMP;
        Ext.fly('byqh').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_CODE;
        Ext.fly('zzc').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_PLANT;
        Ext.fly('zzrq').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_DATE;
        Ext.fly('rl').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_VOL;
        Ext.fly('xs').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_TYPE;
        Ext.fly('pl').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_HZ;
        // Ext.fly('pl1').dom.innerHTML =
        // baseInfoStore.data.getAt(0).data.BYQ_V;
        Ext.fly('eddy').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_V;
        Ext.fly('jxfs').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_JX;
        Ext.fly('tgxs').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_TGXS;
        Ext.fly('wbjc').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_OUT_CHECK;
        Ext.fly('jcr').dom.innerHTML = baseInfoStore.data.getAt(0).data.BYQ_OUT_CHECKUSER;
    }

    // -----------------------电流试验--------------------\\
    if (DCTestStore.data.getAt(0) == null || DCTestStore.data.getAt(0) == ''
        || leakageCurrentStore.data.getAt(0) == null
        || leakageCurrentStore.data.getAt(0) == '') {
    } else {
        // Ext.fly('lxdlsy').dom.innerHTML =
        // DCTestStore.data.getAt(0).data.SY_LOC_DESC;
        Ext.fly('lxsyyqxs').dom.innerHTML = DCTestStore.data.getAt(0).data.YQXS;
        Ext.fly('lxsylxdlbh').dom.innerHTML = DCTestStore.data.getAt(0).data.YQBH;
        Ext.fly('AB1').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_1;
        Ext.fly('BC1').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_1;
        Ext.fly('CA1').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_1;
        Ext.fly('PER1').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_1;
        Ext.fly('ABX1').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_X1;
        Ext.fly('BCX2').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_X1;
        Ext.fly('CAX3').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_X1;
        Ext.fly('PERX1').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_X1;
        Ext.fly('AB2').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_2;
        Ext.fly('BC2').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_2;
        Ext.fly('CA2').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_2;
        Ext.fly('PER2').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_2;
        Ext.fly('AB3').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_3;
        Ext.fly('BC3').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_3;
        Ext.fly('CA3').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_3;
        Ext.fly('PER3').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_3;
        Ext.fly('AB4').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_4;
        Ext.fly('BC4').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_4;
        Ext.fly('CA4').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_4;
        Ext.fly('PER4').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_4;
        Ext.fly('AB5').dom.innerHTML = DCTestStore.data.getAt(0).data.AB_5;
        Ext.fly('BC5').dom.innerHTML = DCTestStore.data.getAt(0).data.BC_5;
        Ext.fly('CA5').dom.innerHTML = DCTestStore.data.getAt(0).data.CA_5;
        Ext.fly('PER5').dom.innerHTML = DCTestStore.data.getAt(0).data.PER_5;
        Ext.fly('zlczr').dom.innerHTML = DCTestStore.data.getAt(0).data.OP_USER;
        Ext.fly('zljxr').dom.innerHTML = DCTestStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('zljlr').dom.innerHTML = DCTestStore.data.getAt(0).data.JX_USER;

        Ext.fly('VH').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.V_H;
        Ext.fly('VL').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.V_L;
        Ext.fly('AH').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.A_H;
        Ext.fly('AL').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.A_L;
        Ext.fly('lxyqxs').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.YQXS;
        Ext.fly('lxyqbh').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.YQBH;
        Ext.fly('lxczr').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.OP_USER;
        Ext.fly('lxjxr').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('lxjlr').dom.innerHTML = leakageCurrentStore.data.getAt(0).data.JX_USER;
    }

    // ------------------------绝缘电阻试验----------------------\\

    if (hinderTestStore.data.getAt(0) == null
        || hinderTestStore.data.getAt(0) == '') {
    } else {
        Ext.fly('dzsyyqxs').dom.innerHTML = hinderTestStore.data.getAt(0).data.YQXS;
        Ext.fly('dzsyyqbh').dom.innerHTML = hinderTestStore.data.getAt(0).data.YQBH;
        Ext.fly('hv15').dom.innerHTML = hinderTestStore.data.getAt(0).data.HV_15;
        Ext.fly('hv60').dom.innerHTML = hinderTestStore.data.getAt(0).data.HV_60;
        Ext.fly('hvper').dom.innerHTML = hinderTestStore.data.getAt(0).data.HV_PER;
        Ext.fly('lv15').dom.innerHTML = hinderTestStore.data.getAt(0).data.LV_15;
        Ext.fly('lv60').dom.innerHTML = hinderTestStore.data.getAt(0).data.LV_60;
        Ext.fly('lvper').dom.innerHTML = hinderTestStore.data.getAt(0).data.LV_PER;
        Ext.fly('jysyczr').dom.innerHTML = hinderTestStore.data.getAt(0).data.OP_USER;
        Ext.fly('jysyjxr').dom.innerHTML = hinderTestStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('jysyjlr').dom.innerHTML = hinderTestStore.data.getAt(0).data.JX_USER;
    }

    // ------------------------工频耐压试验----------------------\\

    if (rateTestStore.data.getAt(0) == null
        || rateTestStore.data.getAt(0) == '') {
    } else {
        Ext.fly('gpnysyyqxs').dom.innerHTML = rateTestStore.data.getAt(0).data.YQXS;
        Ext.fly('gpnysyyqbh').dom.innerHTML = rateTestStore.data.getAt(0).data.YQBH;
        Ext.fly('hvV').dom.innerHTML = rateTestStore.data.getAt(0).data.HV_V;
        Ext.fly('hvA').dom.innerHTML = rateTestStore.data.getAt(0).data.HV_A;
        Ext.fly('hvtime').dom.innerHTML = rateTestStore.data.getAt(0).data.HV_TIME;
        Ext.fly('lvV').dom.innerHTML = rateTestStore.data.getAt(0).data.LV_V;
        Ext.fly('lvA').dom.innerHTML = rateTestStore.data.getAt(0).data.LV_A;
        Ext.fly('lvtime').dom.innerHTML = rateTestStore.data.getAt(0).data.LV_TIME;
        Ext.fly('nysyczr').dom.innerHTML = rateTestStore.data.getAt(0).data.OP_USER;
        Ext.fly('nysyjxr').dom.innerHTML = rateTestStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('nysyjlr').dom.innerHTML = rateTestStore.data.getAt(0).data.JX_USER;
    }

    // ------------------------介损测量----------------------\\

    if (damageDataStore.data.getAt(0) == null
        || damageDataStore.data.getAt(0) == '') {
    } else {
        Ext.fly('jsclyqxs').dom.innerHTML = damageDataStore.data.getAt(0).data.YQXS;
        Ext.fly('jsclyqbh').dom.innerHTML = damageDataStore.data.getAt(0).data.YQBH;
        Ext.fly('hv1v').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_V;
        Ext.fly('hv1n').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_N;
        Ext.fly('hv1p').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_P;
        Ext.fly('hv1r3').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_R3;
        Ext.fly('hv1tg').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_TG;
        Ext.fly('hv1tgbz').dom.innerHTML = damageDataStore.data.getAt(0).data.HV1_TGBZ;
        Ext.fly('lv2v').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_V;
        Ext.fly('lv2n').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_N;
        Ext.fly('lv2p').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_P;
        Ext.fly('lv2r3').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_R3;
        Ext.fly('lv2tg').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_TG;
        Ext.fly('lv2tgbz').dom.innerHTML = damageDataStore.data.getAt(0).data.LV2_TGBZ;
        Ext.fly('hv3v').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_V;
        Ext.fly('hv3n').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_N;
        Ext.fly('hv3p').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_P;
        Ext.fly('hv3r3').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_R3;
        Ext.fly('hv3tg').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_TG;
        Ext.fly('hv3tgbz').dom.innerHTML = damageDataStore.data.getAt(0).data.HV3_TGBZ;
        Ext.fly('jsclczr').dom.innerHTML = damageDataStore.data.getAt(0).data.OP_USER;
        Ext.fly('jscljxr').dom.innerHTML = damageDataStore.data.getAt(0).data.RECORD_USER;
        Ext.fly('jscljlr').dom.innerHTML = damageDataStore.data.getAt(0).data.JX_USER;
    }

    // ------------------------变压比测量----------------------\\

    if (voltageRateStore.data.getAt(0) == null
        || voltageRateStore.data.getAt(0) == '') {
    } else {
        // Ext.fly('"bybcl"').dom.innerHTML =
        // damageDataStore.data.getAt(0).data.YQXS;
        Ext.fly('bybclyqxh').dom.innerHTML = voltageRateStore.data.getAt(0).data.YQXS;
        Ext.fly('bybclbh').dom.innerHTML = voltageRateStore.data.getAt(0).data.YQBH;
        Ext.fly('wcab1').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_AB_1;
        Ext.fly('wcab2').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_AB_2;
        Ext.fly('wcab3').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_AB_3;
        Ext.fly('wcab4').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_AB_4;
        Ext.fly('wcab5').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_AB_5;
        Ext.fly('wcbc1').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_BC_1;
        Ext.fly('wcbc2').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_BC_2;
        Ext.fly('wcbc3').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_BC_3;
        Ext.fly('wcbc4').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_BC_4;
        Ext.fly('wcbc5').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_BC_5;
        Ext.fly('wcca1').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_CA_1;
        Ext.fly('wcca2').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_CA_2;
        Ext.fly('wcca3').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_CA_3;
        Ext.fly('wcca4').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_CA_4;
        Ext.fly('wcca5').dom.innerHTML = voltageRateStore.data.getAt(0).data.WC_CA_5;
        Ext.fly('clbab1').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_AB_1;
        Ext.fly('clbab2').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_AB_2;
        Ext.fly('clbab3').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_AB_3;
        Ext.fly('clbab4').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_AB_4;
        Ext.fly('clbab5').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_AB_5;
        Ext.fly('clbbc1').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_BC_1;
        Ext.fly('clbbc2').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_BC_2;
        Ext.fly('clbbc3').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_BC_3;
        Ext.fly('clbbc4').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_BC_4;
        Ext.fly('clbbc5').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_BC_5;
        Ext.fly('clbca1').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_CA_1;
        Ext.fly('clbca2').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_CA_2;
        Ext.fly('clbca3').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_CA_3;
        Ext.fly('clbca4').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_CA_4;
        Ext.fly('clbca5').dom.innerHTML = voltageRateStore.data.getAt(0).data.CLB_CA_5;
        Ext.fly('hvcab1').dom.innerHTML = voltageRateStore.data.getAt(0).data.HVC_AB_1;
        Ext.fly('hvcab2').dom.innerHTML = voltageRateStore.data.getAt(0).data.HVC_AB_2;
        Ext.fly('hvcab3').dom.innerHTML = voltageRateStore.data.getAt(0).data.HVC_AB_3;
        Ext.fly('hvcab4').dom.innerHTML = voltageRateStore.data.getAt(0).data.HVC_AB_4;
        Ext.fly('hvcab5').dom.innerHTML = voltageRateStore.data.getAt(0).data.HVC_AB_5;
        Ext.fly('lvcab1').dom.innerHTML = voltageRateStore.data.getAt(0).data.LVC_AB_1;
        Ext.fly('lvcab2').dom.innerHTML = voltageRateStore.data.getAt(0).data.LVC_AB_2;
        Ext.fly('lvcab3').dom.innerHTML = voltageRateStore.data.getAt(0).data.LVC_AB_3;
        Ext.fly('lvcab4').dom.innerHTML = voltageRateStore.data.getAt(0).data.LVC_AB_4;
        Ext.fly('lvcab5').dom.innerHTML = voltageRateStore.data.getAt(0).data.LVC_AB_5;
        //	Ext.fly('bybczr').dom.innerHTML = voltageRateStore.data.getAt(0).data.OP_USER;
        //	Ext.fly('bybjxr').dom.innerHTML = voltageRateStore.data.getAt(0).data.RECORD_USER;
        //	Ext.fly('bybjlr').dom.innerHTML = voltageRateStore.data.getAt(0).data.JX_USER;
    }
}
function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP'), document
            .getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190",
            "", "");

        LODOP.PRINT_INIT("gongdan");
        var strBodyStyle = "<style>"
            + document.getElementById('stylePrint').innerHTML + "</style>";

        LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');

        var strFormHtml = strBodyStyle
            + document.getElementById('main').innerHTML;
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