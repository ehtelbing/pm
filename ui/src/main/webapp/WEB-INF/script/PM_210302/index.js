/**
 * Created by Administrator on 2018/9/3 0003.
 */
/**
 * Created by Administrator on 2018/8/31 0031.
 */
var ProcessInstanceId = '';
var BusinessKey = '';
var flowtype = '';
var msg = [];
var activityIdP="";
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.ProcessInstanceId == ProcessInstanceId) ? ProcessInstanceId = "" : ProcessInstanceId = parameters.ProcessInstanceId;
    (parameters.BusinessKey == BusinessKey) ? BusinessKey = "" : BusinessKey = parameters.BusinessKey;
    (parameters.flowtype == flowtype) ? flowtype = "" : flowtype = parameters.flowtype;

}


Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        fields: ['height', 'id', 'name', 'running', 'width', 'x', 'y'],
        proxy: {
            url: AppUrl + 'Activiti/getActivityList',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        region: 'north',
        width: '50%',
        height: '50%',
        columnLines: true,
        columns: [{
            text: '流程步骤编码',
            dataIndex: 'id',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }, {
            text: '流程步骤名称',
            dataIndex: 'name',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }, {
            text: '运行状态',
            width: 120,
            dataIndex: 'running',
            align: 'center',
            renderer: function (value, metaData, record) {
                var val;
                if (value) {
                    val = '<div style="text-align:left;" data-qtip="运行" >运行 </div>';
                } else {
                    val = '<div style="text-align:left;" data-qtip="等待" >等待 </div>';
                }
                return val;
            }
        }, {
            text: '操作',
            dataIndex: 'V_ORDERID',
            width: 155,
            align: 'center',
            renderer: function (value, metaData, record) {
                if (record.data.running) {
                    return '<a href=javascript:perManage(\'' + record.data.id + '\')>' + '审批人' + '</a>';

                } else {
                    return '<a href=javascript:_activiti(\'' + record.data.id + '\')>' + '激活' + '</a>';
                }
            }
        }]
    });

    var imgPanel = Ext.create('Ext.panel.Panel', {
        id: 'imgPanel',
        width: '100%',
        region: 'center',
        frame: true,
        html: '<iframe src="" id="browseImage" width="100%" height="100%"></iframe>'
    });


    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [gridPanel, imgPanel]
    });

    _select();
    queryProcessCode();

    var gridStoreP = Ext.create('Ext.data.Store', {
        fields: ['ActivityId', 'ActivityName', 'ActivityType', 'Assignee', 'AssigneeName', 'EndTime', 'Id', 'StartTime', 'post'],
        autoLoad: false,
        id: 'gridStoreP',
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            url: AppUrl + 'cjy/getNextPerson'
        }
    });

    var sgrid = Ext.create('Ext.grid.Panel', {
        id: 'sgrid',
        region: 'center',
        width: '100%',
        store: gridStoreP,
        autoScroll: true,
        columns: [Ext.create('Ext.grid.RowNumberer', {header: '序号', width: 50, align: 'center', sortable: true}),
            {header: '审批人编码', dataIndex: 'Assignee', sortable: true, align: 'center', width: 200},
            {header: '审批人姓名', dataIndex: 'AssigneeName', sortable: true, align: 'center', width: 200},
            {
                header: '操作',
                dataIndex: 'ActivityId',
                sortable: true,
                align: 'center',
                width: 60,
                renderer: function (value, metaData, record) {
                    return '<a href=javascript:changPerson(\'' + value + '\')>' + '审批人' + '</a>';
                }
            }
        ]
    });
    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 520,
        height: 357,
        x: 750,
        y: 30,
        closeAction: 'hide',
        items: [sgrid]
    });

});


function _select() {

    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            instanceId: ProcessInstanceId
        }
    });
    _preViewImage();
}

function queryProcessCode() {
    msg = [];
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/getProcessAndOrgdept',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_BUSINESSKEY: BusinessKey,
            V_V_ACTIVITI_TYPE: flowtype
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            msg = resp.list;
        }
    })
}

function _preViewImage() {
    Ext.fly('browseImage').dom.src = AppUrl + 'Activiti/DisplayChart?InstanceId=' + ProcessInstanceId;
}


function AddLeft(value) {
    return '<div style="text-align:left;" data-qtip="' + value
        + '" >' + value + '</div>';
}

/*
 * 激活流程步骤
 **/
function _activiti(activityId, assignee) {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/activateActivityCancelCurrent',
        type: 'ajax',
        method: 'POST',
        params: {
            businesskey: BusinessKey,
            flowtype: flowtype,
            instanceId: ProcessInstanceId,
            activityId: activityId,
            flowStep: activityId,
            assignees: "lcjs"
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.flag) {
                _select();
            }
        }
    })
}

/*
 * 根据businesskey查询流程信息
 * */
function getActivitiMsg() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: BusinessKey
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
        }
    });
}

function perManage(activityId) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    activityIdP=activityId;
    QueryPerGrid();
    Ext.getCmp("window").show();
}

function QueryPerGrid(){
    Ext.data.StoreManager.lookup('gridStoreP').load({
        params:{
            businessKey: BusinessKey,
            ActivitiId: activityIdP
        }
    });
}

//function perManage(activityId){
function changPerson(value) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/activiti/PerManage.html?OrgCode='
        + msg[0].V_ORGCODE + '&BusinessKey=' + BusinessKey + '&ActivitiId=' + value, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
