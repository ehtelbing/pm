package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class FolwService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

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
    public List<Map> OrgAndPersonTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin OrgAndPersonTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                if ((String.valueOf(list.get(i).get("V_DEPTCODE"))).length() == 2) {
                    String str = String.valueOf(list.get(i).get("V_DEPTCODE"));
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", true);
                    temp.put("children", GetDEPTChildren(list, str));
                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end OrgAndPersonTree");
        return result;
    }

    public List<Map> GetDEPTChildren(List<HashMap> list, String str) throws SQLException {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (((String)(list.get(i).get("V_DEPTCODE"))).indexOf(str)!=-1 && (String.valueOf(list.get(i).get("V_DEPTCODE"))).length() == 4) {
                String strdeptcode = String.valueOf(list.get(i).get("V_DEPTCODE"));
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                if (GetPersonChildrenCK(list, strdeptcode).size() < 0) {
                    // temp.put("children",  GetPersonChildrenCK(list,strdeptcode));
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                } else {
                    temp.put("children", GetPersonChildrenCK(list,strdeptcode));
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public List<Map> GetPersonChildrenCK(List<HashMap> list, String strdeptcode) throws SQLException {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (((String)(list.get(i).get("V_DEPTCODE"))).indexOf(strdeptcode)!=-1 && (String.valueOf(list.get(i).get("V_DEPTCODE"))).length() == 8) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                temp.put("leaf", true);
                temp.put("expanded", false);
                menu.add(temp);
            }
        }
        return menu;
    }

    public List<Map> DepartAndEquTypeTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin OrgAndPersonTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODE)) {
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTREPAIRCODE"));
                    temp.put("text", list.get(i).get("V_DEPTREPAIRNAME"));
                    temp.put("leaf", true);
                    temp.put("checked", false);

                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end OrgAndPersonTree");
        return result;
    }

    public Map PRO_PM_ACTIVITI_DESC_SEL() throws SQLException {
        logger.info("begin PRO_PM_ACTIVITI_DESC_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_ACTIVITI_DESC_SEL" + "(:V_CURSOR)}");

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
        logger.info("end PRO_PM_ACTIVITI_DESC_SEL");
        return result;
    }

    public Map PRO_PM_ACTIVITI_DESC_REPAIRSEL(String V_V_ORGCODE,String V_V_DEPTCODE, String V_V_REPAIRCODE) throws SQLException {
/*        logger.info("begin PRO_PM_ACTIVITI_DESC_REPAIRSEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_ACTIVITI_DESC_REPAIRSEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
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
        logger.info("end PRO_PM_ACTIVITI_DESC_REPAIRSEL");
        return result;*/


            logger.info("begin PRO_PM_ACTIVITI_DESC_REPAIRSEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

            Map<String, Object> result = new HashMap<String, Object>();
            List<Map> resultList = new ArrayList<Map>();
            Connection conn = null;
            CallableStatement cstmt = null;
            try {
                conn = dataSources.getConnection();
                conn.setAutoCommit(false);
                cstmt = conn.prepareCall("{call PRO_PM_ACTIVITI_DESC_REPAIRSEL(:V_V_STATECODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_CURSOR)}");
                cstmt.setString("V_V_ORGCODE", V_V_DEPTCODE.substring(0,4));
                cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
                cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
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
            logger.info("end PRO_PM_ACTIVITI_DESC_REPAIRSEL");
            return result;




        /*logger.info("begin PRO_PM_ACTIVITI_DESC_REPAIRSEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_ACTIVITI_DESC_REPAIRSEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_DEPTCODE.substring(0,4));
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
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
        logger.info("end PRO_PM_ACTIVITI_DESC_REPAIRSEL");
        return result;*/

    }

    public  Map PM_ACTIVITI_ORG_PROCESS_SET(String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE,String V_V_PROCESS_CODE,String V_V_CHECK)throws SQLException{
        logger.info("begin PM_ACTIVITI_ORG_PROCESS_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_ORG_PROCESS_SET" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE," +
                    ":V_V_FLOWTYPE,:V_V_PROCESS_CODE,:V_V_CHECK,:V_INFO)}");
            cstmt.setString("V_V_ORGCODE", V_V_DEPTCODE.substring(0,4));
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_PROCESS_CODE", V_V_PROCESS_CODE);
            cstmt.setString("V_V_CHECK", V_V_CHECK);
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
        logger.info("end PM_ACTIVITI_ORG_PROCESS_SET");
        return result;
    }
}
