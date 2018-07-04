package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/12/13.
 */

@Service
public class GanttService {
    private static final Logger logger = Logger.getLogger(GanttService.class.getName());

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

    public List<Map> PRO_PM_EQUREPAIRPLAN_TREE(String V_V_GUID_FXJH, String V_BY1, String V_BY2, String V_BY3) throws SQLException {
        List result = new ArrayList();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE" + "(:V_V_GUID_FXJH,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_BY1", V_BY1);
            cstmt.setString("V_BY2", V_BY2);
            cstmt.setString("V_BY3", V_BY3);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result = CreateTreeData(ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE");
        return result;
    }

    public List<Map> CreateTreeData(List list) {
        List<Map> result = new ArrayList();

        for (int i = 0; i <= list.size(); i++) {
            Map temp = new HashMap();
            if (i < list.size()) {
                Map map = (Map) list.get(i);
                if (map.get("V_GUID_P").toString().equals("")) {
                    temp.put("V_GUID", map.get("V_GUID").toString());
                    temp.put("V_PROJECT_NAME", map.get("V_PROJECT_NAME").toString());
                    temp.put("V_CONTENT", map.get("V_CONTENT").toString());
                    temp.put("V_DATE_B", map.get("V_DATE_B").toString());
                    temp.put("V_DATE_E", map.get("V_DATE_E").toString());
                    temp.put("V_BULID_PERSON", map.get("V_BULID_PERSON").toString());
                    temp.put("V_SPECIALTY", map.get("V_SPECIALTY").toString());
                    temp.put("V_BUILD_DEPT", map.get("V_BUILD_DEPT").toString());
                    temp.put("V_GUID_FXJH", map.get("V_GUID_FXJH").toString());
                    temp.put("V_PROJECT_CODE_FXJH", map.get("V_PROJECT_CODE_FXJH").toString());
                    temp.put("V_PROJECT_CODE_FXJH", map.get("V_PROJECT_CODE_FXJH").toString());
                    temp.put("V_PLAN_MONEY", map.get("V_PLAN_MONEY").toString());
                    temp.put("V_ROWNUMBER", map.get("V_ROWNUMBER").toString());
                    temp.put("V_P_ROWNUMBER", map.get("V_P_ROWNUMBER").toString());
                    temp.put("V_GUID_P", "");
                    temp.put("cls", "empty");
                    if (IfHasMenuChildNode(map.get("V_GUID").toString(), list)) {
                        temp.put("expanded", true);
                        temp.put("children", CreateMenuTree(map.get("V_GUID").toString(), list));
                    } else {
                        temp.put("expanded", false);
                        temp.put("leaf", true);
                    }
                    result.add(temp);
                }
            } else if (i == list.size()) {
                temp.put("V_GUID", "");
                temp.put("V_PROJECT_NAME", "");
                temp.put("V_CONTENT", "");
                temp.put("V_DATE_B", "");
                temp.put("V_DATE_E", "");
                temp.put("V_BULID_PERSON", "");
                temp.put("V_SPECIALTY", "");
                temp.put("V_BUILD_DEPT", "");
                temp.put("V_GUID_FXJH", "");
                temp.put("V_PROJECT_CODE_FXJH", "");
                temp.put("V_PROJECT_CODE_FXJH", "");
                temp.put("V_PLAN_MONEY", "");
                temp.put("V_ROWNUMBER", "");
                temp.put("V_P_ROWNUMBER", "");
                temp.put("cls", "empty");
                temp.put("expanded", false);
                temp.put("leaf", true);
                temp.put("V_GUID_P", "");
                result.add(temp);
            }
        }
        return result;
    }


    public List<Map> CreateMenuTree(String upcode, List list) {
        List result = new ArrayList();

        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            Map temp = new HashMap();
            if (map.get("V_GUID_P").toString().equals(upcode)) {
                temp.put("V_GUID", map.get("V_GUID").toString());
                temp.put("V_PROJECT_NAME", map.get("V_PROJECT_NAME").toString());
                temp.put("V_CONTENT", map.get("V_CONTENT").toString());
                temp.put("V_DATE_B", map.get("V_DATE_B").toString());
                temp.put("V_DATE_E", map.get("V_DATE_E").toString());
                temp.put("V_BULID_PERSON", map.get("V_BULID_PERSON").toString());
                temp.put("V_SPECIALTY", map.get("V_SPECIALTY").toString());
                temp.put("V_BUILD_DEPT", map.get("V_BUILD_DEPT").toString());
                temp.put("V_GUID_FXJH", map.get("V_GUID_FXJH").toString());
                temp.put("V_PROJECT_CODE_FXJH", map.get("V_PROJECT_CODE_FXJH").toString());
                temp.put("V_PROJECT_CODE_FXJH", map.get("V_PROJECT_CODE_FXJH").toString());
                temp.put("V_PLAN_MONEY", map.get("V_PLAN_MONEY").toString());
                temp.put("V_ROWNUMBER", map.get("V_ROWNUMBER").toString());
                temp.put("V_P_ROWNUMBER", map.get("V_P_ROWNUMBER").toString());
                temp.put("V_GUID_P", map.get("V_GUID_P").toString());
                temp.put("cls", "empty");
                if (IfHasMenuChildNode(map.get("V_GUID").toString(), list)) {
                    temp.put("expanded", true);
                    temp.put("children", CreateMenuTree(map.get("V_GUID").toString(), list));
                } else {
                    temp.put("expanded", false);
                    temp.put("leaf", true);
                }
                result.add(temp);
            }
        }
        return result;
    }

    public boolean IfHasMenuChildNode(String upcode, List list) {
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            if (upcode.equals(map.get("V_GUID_P").toString())) {
                flag = true;
            }
        }
        return flag;
    }

    public HashMap PM_EQUREPAIRPLAN_TREE_INSERT(String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID, String V_V_GUID_FXJH, String V_V_ROWNUMBER, String V_V_COLUMN, String V_V_VALUE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EQUREPAIRPLAN_TREE_INSERT" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_GUID_FXJH,:V_V_ROWNUMBER,:V_V_COLUMN,:V_V_VALUE,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_V_ROWNUMBER", V_V_ROWNUMBER);
            cstmt.setString("V_V_COLUMN", V_V_COLUMN);
            cstmt.setString("V_V_VALUE", V_V_VALUE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE");
        return result;
    }

    public List<Map> weekPlanSelTree(String v_v_sdate, String v_v_edate,  String v_v_orgcode, String v_v_deptcode) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GAUNTT");

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GAUNTT(:V_V_SDATE,:V_V_EDATE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_SDATE", v_v_sdate);
            cstmt.setString("V_V_EDATE", v_v_edate);
            cstmt.setString("V_V_ORGCODE", v_v_orgcode);
            cstmt.setString("V_V_DEPTCODE", v_v_deptcode);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                Map map = (Map) list.get(i);
                temp.put("V_GUID", map.get("V_GUID").toString());
                temp.put("V_WEEKID", map.get("V_WEEKID").toString());
                temp.put("V_ORGCODE", map.get("V_ORGCODE").toString());
                temp.put("V_ORGNAME", map.get("V_ORGNAME").toString());
                temp.put("V_DEPTCODE", map.get("V_DEPTCODE").toString());
                temp.put("V_DEPTNAME", map.get("V_DEPTNAME").toString());
                temp.put("V_EQUTYPECODE", map.get("V_EQUTYPECODE").toString());
                temp.put("V_EQUCODE", map.get("V_EQUCODE").toString());
                temp.put("V_EQUNAME", map.get("V_EQUNAME").toString());
                temp.put("V_CONTENT", map.get("V_CONTENT").toString());
                temp.put("V_ENDTIME", map.get("V_ENDTIME").toString());
                temp.put("V_STARTTIME", map.get("V_STARTTIME").toString());
                temp.put("V_FLOWNAME", map.get("V_FLOWNAME").toString());
                temp.put("V_STATENAME", map.get("V_STATENAME").toString());
                temp.put("V_MAIN_DEFECT", map.get("V_MAIN_DEFECT").toString());
                temp.put("V_EXPECT_AGE", map.get("V_EXPECT_AGE").toString());
                temp.put("V_REPAIR_PER", map.get("V_REPAIR_PER").toString());
                temp.put("expanded", false);
                temp.put("leaf", true);
                result.add(temp);
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_GAUNTT");
        return result;
    }
}
