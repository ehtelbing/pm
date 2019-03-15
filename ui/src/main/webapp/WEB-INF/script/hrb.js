
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

