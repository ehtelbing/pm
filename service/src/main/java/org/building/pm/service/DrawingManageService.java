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

/**
 * Created by cxy on 2018/9/11.
 */

@Service
public class DrawingManageService {
    private static final Logger logger = Logger.getLogger(DrawingManageService.class.getName());

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


    public Map PRO_BASE_DRAWING_SEL(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_V_EQUCODE, String V_V_EQUNAME) throws SQLException {
        logger.info("begin PRO_BASE_DRAWING_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DRAWING_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUCODE,:V_V_EQUNAME,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DRAWING_SEL");
        return result;
    }

    public HashMap PRO_SAP_PM_EQU_P_BYZYQ(String V_V_PERSONCODE, String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_SAP_PM_EQU_P_BYZYQ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_BYZYQ" + "(:V_V_PERSONCODE,:V_V_DEPTNEXTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_EQU_P_BYZYQ");
        return result;
    }

    public Map PRO_PM_PLAN_BUDGET_YEAR_SEL(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_YEAR) throws SQLException {
        logger.info("begin PRO_PM_PLAN_BUDGET_YEAR_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_BUDGET_YEAR_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_YEAR,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_BUDGET_YEAR_SEL");
        return result;
    }

    public List<Map> PRO_BASE_NEW_MENU_SEL(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE, String V_V_HOME_MENU) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU");
        List<Map> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            HashMap result = new HashMap();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            List<Map> datalist = (List) result.get("list");
            list = getMenuData((List) result.get("list"));
//            if(datalist.size()>0){
//                for(Map item:datalist){
//                    if (item.get("V_MENUCODE_UP").toString().equals("-1")) {
//                        Map temp = new HashMap();
//                        temp.put("id", item.get("V_MENUCODE").toString());
//                        temp.put("text", item.get("V_MENUNAME").toString());
//                        temp.put("title", item.get("V_MENUNAME").toString());
//                        temp.put("pid", item.get("V_MENUCODE_UP").toString());
//                        temp.put("type", item.get("V_TYPE").toString());
//                        temp.put("flag", item.get("V_FLAG").toString());
//                        temp.put("other", item.get("V_OTHER").toString());
//                        temp.put("cls", "empty");
//                        temp.put("hrefTarget", "Workspace");
//                        if(getChildren(datalist,item.get("V_MENUCODE").toString()).size()<=0){//���ӽڵ�
//                            temp.put("leaf",true);
//                            temp.put("src", item.get("V_URL").toString());
//                            temp.put("href", item.get("V_URL").toString());
//                        }else{//���ӽڵ�
//                            temp.put("leaf",false);
//                            temp.put("expanded",true);
//                            temp.put("children",getChildren(datalist,item.get("V_MENUCODE").toString()));
//                        }
//                        list.add(temp);
//                    }
//
//                }
//
//            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_NEW_MENU");
        return list;
    }


    public List<Object> getMenuData(List<Map<String, Object>> myList) {
        List<Object> result = new ArrayList<Object>();
        Map<String, Object> item = new HashMap<String, Object>();

        for (Map<String, Object> itemTemp : myList) {
            item = new HashMap<String, Object>();
            if (itemTemp.get("V_MENUCODE_UP").toString().equals("-1")) {//item.get("V_MENUCODE_UP").toString().equals("-1")
                item.put("sid", itemTemp.get("V_MENUCODE"));//item.get("V_MENUCODE").toString()
                item.put("text", itemTemp.get("V_MENUNAME"));//item.get("V_MENUNAME").toString()
                Map<String, Object> itemMenu = new HashMap<String, Object>();
                itemMenu.put("xtype", "menu");
                itemMenu.put("items", this.getMenuItems(myList, itemTemp.get("V_MENUCODE").toString()));
                item.put("menu", itemMenu);
                item.put("name", "menu");
                item.put("type", itemTemp.get("V_TYPE").toString());
                item.put("other", itemTemp.get("V_OTHER").toString());
                result.add("-");
                result.add(item);
            }
        }
        result.add("-");
        return result;
    }

    private List<Map<String, Object>> getMenuItems(List<Map<String, Object>> list, String parentNode) {
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        Map<String, Object> item = new HashMap<String, Object>();
        for (Map<String, Object> itemTemp : list) {
            item = new HashMap<String, Object>();
            if (itemTemp.get("V_MENUCODE_UP").equals(parentNode)) {
                if (!this.isLeaf(list, itemTemp.get("V_MENUCODE").toString())) {
                    item.put("sid", itemTemp.get("V_MENUCODE"));
                    item.put("xtype", "menuitem");
                    item.put("text", itemTemp.get("V_MENUNAME"));
                    item.put("src", itemTemp.get("V_URL"));
                    item.put("name", "page");
                    item.put("type", itemTemp.get("V_TYPE").toString());
                    item.put("other", itemTemp.get("V_OTHER").toString());
                } else {
                    item.put("sid", itemTemp.get("V_MENUCODE"));
                    item.put("text", itemTemp.get("V_MENUNAME"));
                    Map<String, Object> itemMenu = new HashMap<String, Object>();
                    itemMenu.put("xtype", "menu");
//                    List<Map<String, Object>> listTemp = new ArrayList<>();
//                    listTemp = list;
                    itemMenu.put("items", this.getMenuItems(list, itemTemp.get("V_MENUCODE").toString()));//listTemp
                    item.put("menu", itemMenu);
                    item.put("name", "menu");
                    item.put("type", itemTemp.get("V_TYPE").toString());
                    item.put("other", itemTemp.get("V_OTHER").toString());
//                    result.add("-");
                }
                result.add(item);
            }
        }

        return result;
    }


    private boolean isLeaf(List<Map<String, Object>> list, String parentNode) {
        for (Map<String, Object> itemTemp : list) {
            if (itemTemp.get("V_MENUCODE_UP").equals(parentNode)) {
                return true;
            }
        }
        return false;
    }


    public List<Map> getTreeData(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_TREE");
        List<Map> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            HashMap result = new HashMap();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            List<Map> datalist = (List) result.get("list");
            if (datalist.size() > 0) {
                for (Map item : datalist) {
                    if (item.get("V_DEPTCODE_UP").toString().equals("-1")) {
                        Map temp = new HashMap();
                        temp.put("id", item.get("V_DEPTCODE").toString());
                        temp.put("text", item.get("V_DEPTNAME").toString());
                        temp.put("title", item.get("V_DEPTNAME").toString());
                        temp.put("pid", item.get("V_DEPTCODE_UP").toString());
                        temp.put("type", item.get("V_DEPTTYPE").toString());
                        temp.put("flag", item.get("I_FLAG").toString());
//                        temp.put("other", item.get("V_OTHER").toString());
                        temp.put("cls", "empty");
                        temp.put("hrefTarget", "Workspace");
                        if (getChildren(datalist, item.get("V_DEPTCODE").toString()).size() <= 0) {//没有叶子节点的
                            temp.put("leaf", true);
//                            temp.put("src", item.get("V_URL").toString());
//                            temp.put("href", item.get("V_URL").toString());
                        } else {//有叶子节点的
                            temp.put("leaf", false);
                            temp.put("expanded", true);
                            temp.put("children", getChildren(datalist, item.get("V_DEPTCODE").toString()));
                        }
                        list.add(temp);
                    }

                }

            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_DEPT_TREE");
        return list;
    }
    public Map PRO_BASE_DEPT_TREE_BY_PCODE(String V_V_DEPT_PCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_TREE_BY_PCODE");
        List<Map> list = new ArrayList<>();
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE_BY_PCODE(:V_V_DEPT_PCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPT_PCODE", V_V_DEPT_PCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
//
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_DEPT_TREE_BY_PCODE");
        return result;
    }
    public List<Map> getChildren(List<Map> list, String parentNode) {
        List<Map> menu = new ArrayList<>();
        for (Map item : list) {
            if (item.get("V_DEPTCODE_UP").equals(parentNode)) {
                Map temp = new HashMap();
                temp.put("id", item.get("V_DEPTCODE").toString());
                temp.put("text", item.get("V_DEPTNAME").toString());
                temp.put("title", item.get("V_DEPTNAME").toString());
                temp.put("pid", item.get("V_DEPTCODE_UP").toString());
                temp.put("type", item.get("V_DEPTTYPE").toString());
                temp.put("flag", item.get("I_FLAG").toString());
//                temp.put("other", item.get("V_OTHER").toString());
                temp.put("cls", "empty");
                temp.put("hrefTarget", "Workspace");
                if (getChildren(list, item.get("V_DEPTCODE").toString()).size() == 0) {//没有叶子节点
                    temp.put("leaf", true);
//                    temp.put("src", item.get("V_URL").toString());
//                    temp.put("href", item.get("V_URL").toString());
                } else {//有叶子节点
                    temp.put("leaf", false);
                    temp.put("expanded", true);
                    temp.put("children", getChildren(list, item.get("V_DEPTCODE").toString()));
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public Map PRO_BASE_DEPT_ADD(String V_V_DEPTCODE,String V_V_DEPTNAME,String V_V_DEPTCODE_UP) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_ADD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_ADD(:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_DEPTCODE_UP,:V_INFO)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE_UP", V_V_DEPTCODE_UP);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",(String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_ADD");
        return result;
    }
    public Map PRO_BASE_DEPT_DEL(String V_V_DEPTID) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_DEL(:V_V_DEPTID,:V_INFO)}");
            cstmt.setInt("V_V_DEPTID", Integer.parseInt(V_V_DEPTID));
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",(String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_DEL");
        return result;
    }
    public Map PRO_BASE_DEPT_UPD(String V_V_DEPTID,String V_V_DEPTCODE,String V_V_DEPTNAME) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_UPD(:V_V_DEPTID,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_INFO)}");
            cstmt.setInt("V_V_DEPTID", Integer.parseInt(V_V_DEPTID));
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
//            cstmt.setString("V_V_DEPTCODE_UP", V_V_DEPTCODE_UP);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",(String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_UPD");
        return result;
    }
    public HashMap PRO_OIL_YEAR_PLAN_AND_APP_SEL(String V_V_YEAR, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_OIL_YEAR_PLAN_AND_APP_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_OIL_YEAR_PLAN_AND_APP_SEL" + "(:V_V_YEAR,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setInt("V_V_YEAR", Integer.parseInt(V_V_YEAR));
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_OIL_YEAR_PLAN_AND_APP_SEL");
        return result;
    }

    public HashMap PRO_OIL_YEAR_PLAN_APPROVAL_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_OIL_YEAR_PLAN_APPROVAL_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_OIL_YEAR_PLAN_APPROVAL_SEL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setInt("V_V_YEAR", Integer.parseInt(V_V_YEAR));
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_OIL_YEAR_PLAN_APPROVAL_SEL");
        return result;
    }

    public HashMap PRO_OIL_YEAR_PLAN_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_OIL_YEAR_PLAN_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_OIL_YEAR_PLAN_SEL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setInt("V_V_YEAR", Integer.parseInt(V_V_YEAR));
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_OIL_YEAR_PLAN_SEL");
        return result;
    }

    public HashMap FIXED_ASSETS_SEL(String V_V_ORG_CODE,String V_V_ASSETS_CODE,String V_V_ASSETS_NAME,String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin FIXED_ASSETS_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call FIXED_ASSETS_SEL" + "(:V_V_ORG_CODE,:V_V_ASSETS_CODE,:V_V_ASSETS_NAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORG_CODE", V_V_ORG_CODE);
            cstmt.setString("V_V_ASSETS_CODE", V_V_ASSETS_CODE);
            cstmt.setString("V_V_ASSETS_NAME", V_V_ASSETS_NAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end FIXED_ASSETS_SEL");
        return result;
    }
}