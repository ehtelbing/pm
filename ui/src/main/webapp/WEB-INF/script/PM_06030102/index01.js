Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    Ext.onReady(function () {
        //panel用到的store，写后台的时候再加每个panel用到的对应正确store
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
        //页面西侧的菜单树
        var treeStore = Ext.create('Ext.data.TreeStore', {
            id: 'treeStore',
            root: {
                expanded: true,
                children: [{
                    text: '设备类型',
                    expanded: true,
                    children: [{
                        text: '设备类型1',
                        expanded: true,
                        children: [{
                            text: '设备名称',
                            leaf: true
                        }]
                    }, {
                        text: '设备类型2',
                        leaf: true
                    }, {
                        text: '设备类型3',
                        leaf: true
                    }]
                }]
            }
        });

        //页面上的保存，接收，获取模板，关闭的按钮
        var buttonPanel = Ext.create('Ext.Panel', {
            id: 'buttonPanel',
            title: '<div align="center">厂矿精密点检主管接收</div>',
            frame: true,
            border: false,
            layout: 'column',
            defaults: {
                width: 60,
                style: 'margin:5px 0px 5px 10px'
            },
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                handler: _save
            }, {
                xtype: 'button',
                text: '接收',
                icon: imgpath + '/add.png',
                handler: _accept
            }, {
                xtype: 'button',
                text: '获取模板',
                icon: imgpath + '/edit.png',
                width: 80,
                handler: _getTemplate
            }, {
                xtype: 'button',
                text: '关闭',
                icon: imgpath + '/delete1.png',
                handler: _close
            }]
        });

        //左上设备类型树
        var sblxTree = Ext.create('Ext.tree.Panel', {
            id: 'sblxTree',
            //title: '设备类型树',
            width: '20%',
            rootVisible: false,
            hideHeaders: true,
            rowLines: false,
            columnLines: false,
            frame: true,
            autoScroll: true,
            store: 'treeStore'
        });

        //设备信息的显示区域
        var formPanel = Ext.create('Ext.form.Panel', {
            id: 'formPanel',
            title: '<div align="center">设备明细</div>',
            layout: 'column',
            frame: true,
            autoScroll: true,
           // style:'margin—top:10px',//尝试更改设备编号与
            defaults: {
                labelAlign: 'right',//文本文字右对齐
                style: 'text-align: center;',
                labelWidth: 100,//文本文字的宽度
                inputWidth: 160,//输入框的宽度
                margin: '8,0,0,0'
            },
            items: [{
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备编号'

            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备名称'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备类型编号'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备类型位置'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '位置编码'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '位置名称'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备类型'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '设备种类'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: 'ABC标识'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '开始日期'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '结束日期'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '成本中心'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '规格型号'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '尺寸/大小'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '资产制造商'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '购置价格'
            }, {
                xtype: 'textfield',
                name: '',
                fieldLabel: '对象重量'
            }]
        });

        //页面的表格panel
        var gridPanel = Ext.create('Ext.grid.Panel', {
            id: 'gridPanel',
            store: gridStore,
            columnLines: true,
            //sm:new Ext.grid.CheckboxSelectionModel({singleSelect:true}),
            frame: true,
            autoScroll: true,
            columns: [{
                xtype: 'rownumberer',
                text: '序号',
                width: 40,
                sortable: false
            }, {
                text: '设备名称',
                dataIndex: 'data_',
                flex: 1
            }, {
                text: '功能位置',
                dataIndex: 'data_',
                flex: 1
            }, {
                text: '检测方式',
                dataIndex: 'data_',
                flex: 1
            }, {
                text: '检测周期',
                dataIndex: 'data_',
                flex: 1
            }, {
                text: '检测内容',
                dataIndex: 'data_',
                flex: 5,

                columns: [{
                    //new Ext.grid.CheckboxSelectionModel({singleSelect:true}),
                    text: '振动',
                    dataIndex: 'data_',
                    flex: 1,
                    renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                        if (record.data.USE_FLAG == 1) {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                        } else {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                        }
                    }
                }, {

                    text: '电机',
                    dataIndex: 'data_',
                    flex: 1,
                    renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                        if (record.data.USE_FLAG == 1) {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                        } else {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                        }
                    }
                }, {

                    text: '探伤',
                    dataIndex: 'data_',
                    flex: 1,
                    renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                        if (record.data.USE_FLAG == 1) {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                        } else {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                        }
                    }
                }, {

                    text: '电缆',
                    dataIndex: 'data_',
                    flex: 1,
                    renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                        if (record.data.USE_FLAG == 1) {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                        } else {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                        }
                    }
                }, {

                    text: '热像',
                    dataIndex: 'data_',
                    flex: 1,
                    renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                        if (record.data.USE_FLAG == 1) {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                        } else {
                            return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                        }
                    }
                }]
            }, {
                text: '测试位置数量',
                dataIndex: 'data_',
                flex: 1
            }]
        });

        Ext.create('Ext.container.Viewport', {
            layout: {
                type: 'border',
                regionWeights: {
                    north: 4,
                    east: 2,
                    south: 1,
                    west: 3
                }
            },
            defaults: {
                border: false
            },
            items: [{
                region: 'north',
                items: [buttonPanel]
            }, {
                region: 'west',
                width: '10%',
                layout: 'fit',
                items: [sblxTree]
            }, {
                region: 'east',
                width: '70%',
                layout: 'fit',
                items: [gridPanel]
            }, {
                region: 'center',
                layout: 'fit',
                items: [formPanel]
            }]
        });
    });

    _init();

});

function _init() {
    if (true) {

        Ext.getBody().unmask();
    }
};

//保存的函数
function _save() {

};
//接收的函数
function _accept() {

};
//获取模板的函数
function _getTemplate() {

};

//关闭的函数
function _close() {

};




