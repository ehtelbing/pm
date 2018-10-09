package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnewhomeService {
    private static final Logger logger = Logger.getLogger(BasicService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

        int colNum = 0;

        colNum = rsm.getColumnCount();

        while (rs.next()) {
            HashMap model = new HashMap();
            for (int i = 1; i <= rsm.getColumnCount(); i++) {
                if (rsm.getColumnType(i) == 91) {
                    model.put(rsm.getColumnName(i),
                            rs.getString(i) == null ? "" : rs.getString(i)
                                    .split("\\.")[0]);
                } else {
                    if (rsm.getColumnType(i) == 2) {
                        if (rs.getString(i) == null) {
                            model.put(rsm.getColumnName(i), "");
                        } else {
                            model.put(rsm.getColumnName(i), rs.getDouble(i));
                        }
                    } else {
                        model.put(rsm.getColumnName(i),
                                rs.getString(i) == null ? "" : rs.getString(i)
                                        .toString().replaceAll("\\n", ""));
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }

    //===========update2018-10-08  主页返回菜单
    public Map SEL_MENU_HOME(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE, String SING_ID) throws SQLException {

        logger.info("begin SEL_MENU_HOME");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SEL_MENU_HOME(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:SING_ID,:RET)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("SING_ID", SING_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SEL_MENU_HOME");
        return result;
    }


    //--子菜单
    public List<Map> sel_menu_tree_id(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE, String V_V_MENUCODE) throws SQLException {
        List<Map> result = menu_down_id(IS_V_ROLECODE, IS_V_SYSTYPE, V_V_DEPTCODE, V_V_MENUCODE);
        return result;
    }


    public List<Map> menu_down_id(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE, String V_V_MENUCODE) throws SQLException {
        List<Map> listArray = new ArrayList<>();
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin sel_menu_down_id");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call sel_menu_down_id(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_MENUCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            List<Map> datalist = (List) result.get("list");
            if (datalist.size() > 0) {
                for (Map item : datalist) {
                    Map temp = new HashMap();
                    if (item.get("V_MENUCODE").toString().equals(V_V_MENUCODE)) {
                        temp.put("id", item.get("V_MENUCODE").toString());
                        temp.put("text", item.get("V_MENUNAME").toString());
                        temp.put("title", item.get("V_MENUNAME").toString());
                        temp.put("pid", item.get("V_MENUCODE_UP").toString());
                        temp.put("type",item.get("V_TYPE").toString());
                        temp.put("other",item.get("V_OTHER").toString());
                        item.put("flag", item.get("V_FLAG").toString());
                        if (ChildFalgMenu(datalist, item.get("V_MENUCODE").toString())) {
                            temp.put("leaf", false);
                            temp.put("children", create_menu_child_tree(datalist, item.get("V_MENUCODE").toString()));
                        } else {
                            temp.put("src", item.get("V_URL").toString());
                            temp.put("leaf", true);
                        }
                        listArray.add(temp);
                    }
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end sel_menu_down_id");
        return listArray;
    }

    public List<Map> create_menu_child_tree(List<Map> list, String V_V_MENUCODE_UP) {
        List<Map> listArray = new ArrayList<>();
        if (list.size() > 0) {
            for (Map item : list) {
                Map temp = new HashMap();
                if (item.get("V_MENUCODE_UP").toString().equals(V_V_MENUCODE_UP)) {
                    temp.put("id", item.get("V_MENUCODE").toString());
                    temp.put("text", item.get("V_MENUNAME").toString());
                    temp.put("pid", item.get("V_MENUCODE_UP").toString());
                    temp.put("title", item.get("V_MENUNAME").toString());
                    temp.put("type",item.get("V_TYPE").toString());
                    temp.put("other",item.get("V_OTHER").toString());
                    item.put("flag", item.get("V_FLAG").toString());
                    if (ChildFalgMenu(list, item.get("V_MENUCODE").toString())) {
                        temp.put("leaf", false);
                        temp.put("children", create_menu_child_tree(list, item.get("V_MENUCODE").toString()));
                    } else {
                        temp.put("leaf", true);
                        temp.put("src", item.get("V_URL").toString());
                    }
                    listArray.add(temp);
                }
            }
        }
        return listArray;
    }

    public boolean ChildFalgMenu(List<Map> list, String V_V_MENUCODE_UP) {
        if (list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                if (map.get("V_MENUCODE_UP").toString().equals(V_V_MENUCODE_UP)) {
                    return true;
                }
            }
        }
        return false;
    }
}
