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
 * Created by zjh on 2017/1/22.
 */

@Service
public class BasicService {
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

    public Map PRO_BASE_PERSONROLE_VIEW_NEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSONROLE_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_VIEW_NEW(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_BASE_PERSONROLE_VIEW_NEW");
        return result;
    }

    public List<Map> PRO_BASE_PERSONROLE_SET_NEW(String V_V_ROLECODE, String V_V_ROLENAME, String V_V_ROLEMEMO,
                                                 String V_V_ROLETYPE, Double V_I_ORDERID, String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_BASE_PERSONROLE_SET_NEW");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_SET_NEW" + "(:V_V_ROLECODE,:V_V_ROLENAME," +
                    ":V_V_ROLEMEMO,:V_V_ROLETYPE,:V_I_ORDERID,:V_V_DEPTCODE,:RET)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_ROLENAME", V_V_ROLENAME);
            cstmt.setString("V_V_ROLEMEMO", V_V_ROLEMEMO);
            cstmt.setString("V_V_ROLETYPE", V_V_ROLETYPE);
            cstmt.setDouble("V_I_ORDERID", V_I_ORDERID);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSONROLE_SET_NEW");
        return result;
    }

    public List<Map> PRO_BASE_PERSONROLE_DEL_NEW(String V_V_ROLECODE, String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_BASE_PERSONROLE_DEL_NEW");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_DEL_NEW" + "(:V_V_ROLECODE,:V_V_DEPTCODE,:V_RET)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_RET");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSONROLE_DEL_NEW");
        return result;
    }

    public List<Map> PRO_BASE_ROLETOMENU_SET(String V_V_ROLECODE, String V_V_MENUCODE, String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_BASE_ROLETOMENU_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_SET" + "(:V_V_ROLECODE,:V_V_MENUCODE,:V_V_DEPTCODE)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_ROLETOMENU_SET");
        return result;
    }

    public List<Map> PRO_BASE_ROLETOMENU_DEL(String V_V_ROLECODE, String V_V_MENUCODE, String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_BASE_ROLETOMENU_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_DEL" + "(:V_V_ROLECODE,:V_V_MENUCODE,:V_V_DEPTCODE)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_ROLETOMENU_DEL");
        return result;
    }

    public HashMap PRO_SAP_PM_EQU_P_GET(String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_PM_EQU_P_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_GET" + "(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_SAP_PM_EQU_P_GET");
        return result;
    }

    public HashMap PM_1917_JXMX_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                         String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_JXMX_NAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_1917_JXMX_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_JXMX_NAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_JXMX_NAME", V_V_JXMX_NAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXMX_DATA_SEL");
        return result;
    }

    public List<Map> PM_1917_JXMX_DATA_SET(String V_V_JXMX_CODE, String V_V_JXMX_NAME, String V_V_ORGCODE, String V_V_DEPTCODE,
                                           String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_EQUCODE_CHILD, String V_V_REPAIRMAJOR_CODE,
                                           String V_V_BZ, String V_V_HOUR, String V_V_IN_PER, String V_V_IN_DATE) throws SQLException {
//        logger.info("begin PM_1917_JXMX_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_DATA_SET" + "(:V_V_JXMX_CODE,:V_V_JXMX_NAME,:V_V_ORGCODE," +
                    ":V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_EQUCODE_CHILD,:V_V_REPAIRMAJOR_CODE,:V_V_BZ,:V_V_HOUR,:V_V_IN_PER,:V_V_IN_DATE," +
                    ":V_INFO)}");
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_JXMX_NAME", V_V_JXMX_NAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCODE_CHILD", V_V_EQUCODE_CHILD);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_IN_PER", V_V_IN_PER);
            cstmt.setString("V_V_IN_DATE", V_V_IN_DATE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXMX_DATA_SET");
        return result;
    }

    public List<Map> PM_1917_JXMX_JJ_CHANGE(String V_V_JXGX_CODE, String V_V_JJCODE, String V_V_TS) throws SQLException {
//        logger.info("begin PM_1917_JXMX_JJ_CHANGE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_JJ_CHANGE" + "(:V_V_JXGX_CODE,:V_V_JJCODE,:V_V_TS,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJCODE", V_V_JJCODE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXMX_JJ_CHANGE");
        return result;
    }

    public List<Map> PM_1917_JXGX_GJ_DATA_SET(String V_V_JXGX_CODE, String V_V_GJ_CODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_GJ_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_GJ_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_GJ_CODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_GJ_CODE", V_V_GJ_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_GJ_DATA_SET");
        return result;
    }

    public List<Map> PM_1917_JXGX_PER_DATA_SET(String V_V_JXGX_CODE, String V_V_PERCODE_DE, String V_V_TS) throws SQLException {
//        logger.info("begin PM_1917_JXGX_PER_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_PERCODE_DE,:V_V_TS,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_PER_DATA_SET");
        return result;
    }

    public List<Map> PM_1917_JXGX_PER_DATA_SET_N(String V_V_JXGX_CODE, String V_V_PERCODE_DE, String V_V_TS, String V_V_PERNUM) throws SQLException {
//        logger.info("begin PM_1917_JXGX_PER_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_SET_N" + "(:V_V_JXGX_CODE,:V_V_PERCODE_DE,:V_V_TS,:V_V_PERNUM,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.setString("V_V_PERNUM", V_V_PERNUM);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_PER_DATA_SET_N");
        return result;
    }

    public HashMap PRO_BASE_DEPTTOSAPWORKCSAT(String V_V_DEPTREPAIRCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPTTOSAPWORKCSAT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPWORKCSAT" + "(:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
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
        logger.info("end PRO_BASE_DEPTTOSAPWORKCSAT");
        return result;
    }

    public List<Map> PM_1917_JXGX_AQCS_DATA_SET(String V_V_JXGX_CODE, String V_V_AQCS_CODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_AQCS_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_AQCS_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_AQCS_CODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_AQCS_DATA_SET");
        return result;
    }

    public List<Map> PM_1917_JXGX_JSYQ_DATA_SET(String V_V_JXGX_CODE, String V_V_JSYQ_CODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_JSYQ_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_JSYQ_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_JSYQ_CODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JSYQ_CODE", V_V_JSYQ_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_JSYQ_DATA_SET");
        return result;
    }

    public HashMap PRO_SAP_EQU_VIEW(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE,
                                    String V_V_EQUTYPECODE, String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_EQU_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE," +
                    ":V_V_EQUCODE,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_SAP_EQU_VIEW");
        return result;
    }

    public HashMap PRO_BASE_SPECIALTY_DEPT_SPECIN(String V_V_PERSONCODE, String V_V_DEPTNEXTCODE) throws SQLException {

        logger.info("begin PRO_BASE_SPECIALTY_DEPT_SPECIN");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTY_DEPT_SPECIN" + "(:V_V_PERSONCODE,:V_V_DEPTNEXTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
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
        logger.info("end PRO_BASE_SPECIALTY_DEPT_SPECIN");
        return result;
    }


    //��ѯ���޵�λ
    public HashMap PRO_PM_REPAIRDEPT_VIEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_PM_REPAIRDEPT_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            //cstmt.setString("V_V_DEPTCODE", V_V_DEPTNAME);
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
        logger.info("end PRO_PM_REPAIRDEPT_VIEW");
        return result;
    }


    //��ѯ״̬����
    public List<Map> PM_03_FLOWCODE_SEL(String V_V_PLANTYPE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERSONCODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_JSYQ_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_FLOWCODE_SEL" + "(:V_V_PLANTYPE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_FLOWCODE_SEL");
        return result;
    }


    //��ѯ״̬����
    public List<Map> PRO_PM_03_PLAN_YEAR_SET(String V_V_INPER, String V_V_YEARPLAN_GUID, String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                             String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_FLOWCODE, String V_V_JXGX_CODE, String V_V_JXMX_CODE, String V_V_JXBZ_CODE, String V_V_REPAIRDEPT_CODE
    ) throws SQLException {
//        logger.info("begin PM_1917_JXGX_JSYQ_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SET" + "(:V_V_INPER,:V_V_YEARPLAN_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_FLOWCODE,:V_V_JXGX_CODE,:V_V_JXMX_CODE,:V_V_JXBZ_CODE,:V_V_REPAIRDEPT_CODE,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_YEARPLAN_GUID", V_V_YEARPLAN_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_JXBZ_CODE", V_V_JXBZ_CODE);
            cstmt.setString("V_V_REPAIRDEPT_CODE", V_V_REPAIRDEPT_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_SET");
        return result;
    }

    //月检修计划保存
    public Map PRO_PM_03_PLAN_MONTH_SET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                        String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE, String V_V_CONTENT,
                                        String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE, String V_V_JHMX_GUID,
                                        String V_V_HOUR, String V_V_BZ, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_SET" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_FLV_V_OTHERPLAN_GUIDOWCODE,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);

            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);
            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
            cstmt.setString("V_V_EXPECT_AGE", V_V_EXPECT_AGE);
            cstmt.setString("V_V_REPAIR_PER", V_V_REPAIR_PER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_MONTH_SET");
        return result;
    }

    //季度检修计划保存
    public Map PRO_PM_03_PLAN_QUARTER_SET(String V_V_INPER, String V_V_QUARTERPLAN_GUID, String V_V_YEAR, String V_V_QUARTER, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                          String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_FLOWCODE, String V_V_JXGX_CODE, String V_V_JXMX_CODE, String V_V_JXBZ_CODE, String V_V_REPAIRDEPT_CODE,
                                          String V_V_YEARPLAN_CODE, String V_V_HOUR, String V_V_BZ) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_QUARTER_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_SET" + "(:V_V_INPER,:V_V_QUARTERPLAN_GUID,:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_FLOWCODE,:V_V_JXGX_CODE,:V_V_JXMX_CODE,:V_V_JXBZ_CODE,:V_V_REPAIRDEPT_CODE,:V_V_YEARPLAN_CODE,:V_V_HOUR,:V_V_BZ,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_QUARTERPLAN_GUID", V_V_QUARTERPLAN_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_JXBZ_CODE", V_V_JXBZ_CODE);
            cstmt.setString("V_V_REPAIRDEPT_CODE", V_V_REPAIRDEPT_CODE);
            cstmt.setString("V_V_YEARPLAN_CODE", V_V_YEARPLAN_CODE);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_SET");
        return result;
    }

    //周检修计划保存
    public Map PRO_PM_03_PLAN_WEEK_SET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_WEEK,
                                       String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                       String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE,
                                       String V_V_JHMX_GUID, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID,String V_V_MAIN_DEFECT,String V_V_EXPECT_AGE,String V_V_REPAIR_PER) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SET");
        Map result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SET" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_OTHERPLAN_GUID,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);

            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);

            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);

            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
            cstmt.setString("V_V_EXPECT_AGE", V_V_EXPECT_AGE);
            cstmt.setString("V_V_REPAIR_PER", V_V_REPAIR_PER);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_SET");
        return result;
    }

    public HashMap PRO_FLOW_TYPE_PERNUM_SEL(String V_V_PERCODE, String V_D_BEGINTIME, String V_D_ENDTIME) throws SQLException {
        logger.info("begin PRO_FLOW_TYPE_PERNUM_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_FLOW_TYPE_PERNUM_SEL" + "(:V_V_PERCODE,:V_D_BEGINTIME,:V_D_ENDTIME,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_D_BEGINTIME", V_D_BEGINTIME);
            cstmt.setString("V_D_ENDTIME", V_D_ENDTIME);
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
        logger.info("end PRO_FLOW_TYPE_PERNUM_SEL");
        return result;
    }


    public HashMap PRO_WO_FLOW_DATA_SEL(String V_V_PERCODE, String V_D_BEGINTIME, String V_D_ENDTIME, String V_V_GDH, String V_V_FLOWTYPE, Integer V_I_PAGE, Integer V_I_PAGENUMBER) throws SQLException {
        logger.info("begin PRO_WO_FLOW_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DATA_SEL" + "(:V_V_PERCODE,:V_D_BEGINTIME,:V_D_ENDTIME,:V_V_GDH,:V_V_FLOWTYPE,:V_I_PAGE,:V_I_PAGENUMBER,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_D_BEGINTIME", V_D_BEGINTIME);
            cstmt.setString("V_D_ENDTIME", V_D_ENDTIME);
            cstmt.setString("V_V_GDH", V_V_GDH);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setInt("V_I_PAGE", V_I_PAGE);
            cstmt.setInt("V_I_PAGENUMBER", V_I_PAGENUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getObject("V_INFO").toString());
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            // result.put("RET", cstmt.getString("V_INFO"));
            //result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DATA_SEL");
        return result;
    }

    public Map PM_1917_JXGX_WL_DATA_SET(String V_V_JXGX_CODE, String V_V_KFNAME, String V_V_WLCODE, String V_V_WLSM, String V_V_GGXH, String V_V_JLDW, String V_V_PRICE, String V_V_NUM) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_DATA_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_KFNAME,:V_V_WLCODE,:V_V_WLSM,:V_V_GGXH,:V_V_JLDW,:V_V_PRICE,:V_V_NUM,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_KFNAME", V_V_KFNAME);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.setString("V_V_WLSM", V_V_WLSM);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_PRICE", V_V_PRICE);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_WL_DATA_SET");
        return result;
    }

    public HashMap PRO_WO_FLOW_DATA_DETAIL_SEL(String V_V_ORDERID, String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_WO_FLOW_DATA_DETAIL_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DATA_DETAIL_SEL" + "(:V_V_ORDERID,:V_V_DEPTCODE,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getObject("V_INFO"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DATA_DETAIL_SEL");
        return result;
    }

    public Map PRO_HOME_FLOW_NUM_SEL(String V_V_PERCODE, String V_D_STARTDATE, String V_D_ENDDTTE) throws SQLException {
        logger.info("begin PRO_HOME_FLOW_NUM_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_HOME_FLOW_NUM_SEL" + "(:V_V_PERCODE,:V_D_STARTDATE,:V_D_ENDDTTE,:V_DB_NUM,:V_YB_NUM)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_D_STARTDATE", V_D_STARTDATE);
            cstmt.setString("V_D_ENDDTTE", V_D_ENDDTTE);
            cstmt.registerOutParameter("V_DB_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YB_NUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_DB_NUM", (String) cstmt.getObject("V_DB_NUM"));
            result.put("V_YB_NUM", (String) cstmt.getObject("V_YB_NUM"));
            ;
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_HOME_FLOW_NUM_SEL");
        return result;
    }

    public Map PM_PRO_DB_PERSONNUM_SEL(String V_V_SDATE, String V_V_EDATE, String V_V_PERSON) throws SQLException {
        logger.info("begin PM_PRO_DB_PERSONNUM_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PRO_DB_PERSONNUM_SEL" + "(:V_V_SDATE,:V_V_EDATE,:V_V_PERSON,:V_DBNUM,:V_YBNUM)}");
            cstmt.setString("V_V_SDATE", V_V_SDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.registerOutParameter("V_DBNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YBNUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_DBNUM", (String) cstmt.getObject("V_DBNUM"));
            result.put("V_YBNUM", (String) cstmt.getObject("V_YBNUM"));
            ;
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PRO_DB_PERSONNUM_SEL");
        return result;
    }

    public Map PM_PRO_DEFECT_PERSONNUM_SEL(String V_V_SDATE, String V_V_EDATE, String V_V_PERSON) throws SQLException {
        logger.info("begin PM_PRO_DEFECT_PERSONNUM_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PRO_DEFECT_PERSONNUM_SEL" + "(:V_V_SDATE,:V_V_EDATE,:V_V_PERSON,:V_WCL_NUM,:V_YXP_NUM,:V_YCL_NUM,:V_SGXQ_NUM,:V_YL_NUM)}");
            cstmt.setString("V_V_SDATE", V_V_SDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.registerOutParameter("V_WCL_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YXP_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YCL_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_SGXQ_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YL_NUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_WCL_NUM", (String) cstmt.getObject("V_WCL_NUM"));
            result.put("V_YXP_NUM", (String) cstmt.getObject("V_YXP_NUM"));
            result.put("V_YCL_NUM", (String) cstmt.getObject("V_YCL_NUM"));
            result.put("V_SGXQ_NUM", (String) cstmt.getObject("V_SGXQ_NUM"));
            result.put("V_YL_NUM", (String) cstmt.getObject("V_YL_NUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PRO_DEFECT_PERSONNUM_SEL");
        return result;
    }

    public Map PM_PRO_PLAN_PERSONNUM_SEL(String V_V_SDATE, String V_V_EDATE, String V_V_PERSON) throws SQLException {
        logger.info("begin PM_PRO_PLAN_PERSONNUM_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PRO_PLAN_PERSONNUM_SEL" + "(:V_V_SDATE,:V_V_EDATE,:V_V_PERSON,:V_YEAR_NUM,:V_QUARTER_NUM,:V_MONTH_NUM,:V_WEEK_NUM)}");
            cstmt.setString("V_V_SDATE", V_V_SDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.registerOutParameter("V_YEAR_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_QUARTER_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_MONTH_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_WEEK_NUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_YEAR_NUM", (String) cstmt.getObject("V_YEAR_NUM"));
            result.put("V_QUARTER_NUM", (String) cstmt.getObject("V_QUARTER_NUM"));
            result.put("V_MONTH_NUM", (String) cstmt.getObject("V_MONTH_NUM"));
            result.put("V_WEEK_NUM", (String) cstmt.getObject("V_WEEK_NUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PRO_PLAN_PERSONNUM_SEL");
        return result;
    }

    public Map PM_PRO_WORKORDER_PERSONNUM_SEL(String V_V_SDATE, String V_V_EDATE, String V_V_PERSON) throws SQLException {
        logger.info("begin PM_PRO_WORKORDER_PERSONNUM_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PRO_WORKORDER_PERSONNUM_SEL" + "(:V_V_SDATE,:V_V_EDATE,:V_V_PERSON,:V_CJ_NUM,:V_JS_NUM,:V_FK_NUM,:V_YS_NUM,:V_YL_NUM)}");
            cstmt.setString("V_V_SDATE", V_V_SDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.registerOutParameter("V_CJ_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_JS_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FK_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YS_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YL_NUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CJ_NUM", (String) cstmt.getObject("V_CJ_NUM"));
            result.put("V_JS_NUM", (String) cstmt.getObject("V_JS_NUM"));
            result.put("V_FK_NUM", (String) cstmt.getObject("V_FK_NUM"));
            result.put("V_YS_NUM", (String) cstmt.getObject("V_YS_NUM"));
            result.put("V_YL_NUM", (String) cstmt.getObject("V_YL_NUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PRO_WORKORDER_PERSONNUM_SEL");
        return result;
    }


    public HashMap PRO_BASE_DEPT_VIEW_ADMIN(String IS_V_DEPTCODE, String IS_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ADMIN");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ADMIN" + "(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", IS_V_DEPTCODE);
            cstmt.setString("V_V_ORGCODE", IS_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ADMIN");
        return result;
    }

    public HashMap PM_WORK_FLOW_PERBYROLE_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ROLECODE, String V_V_PERNAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_WORK_FLOW_PERBYROLE_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORK_FLOW_PERBYROLE_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ROLECODE,:V_V_PERNAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("total", cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ADMIN");
        return result;
    }

    public HashMap PM_WORK_FLOW_PERBYROLE_SET(String V_V_GUID, String V_V_ROLECODE, String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_WORK_FLOW_PERBYROLE_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORK_FLOW_PERBYROLE_SET" + "(:V_V_GUID,:V_V_ROLECODE,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORK_FLOW_PERBYROLE_SET");
        return result;
    }

    public HashMap PM_WORK_REPAIRPER_HISTORY_SEL(String V_V_DEPTCODE, String V_V_INPER) throws SQLException {

        logger.info("begin PM_WORK_REPAIRPER_HISTORY_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORK_REPAIRPER_HISTORY_SEL" + "(:V_V_DEPTCODE,:V_V_INPER,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_INPER", V_V_INPER);
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
        logger.info("end PM_WORK_REPAIRPER_HISTORY_SEL");
        return result;
    }

    public HashMap PRO_BASE_NEW_MENU_SEL(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE, String V_V_HOME_MENU) throws SQLException {

        logger.info("begin PRO_BASE_NEW_MENU_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
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
        logger.info("end PRO_BASE_NEW_MENU_SEL");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_SETBYGW(String V_V_DEPTCODE, String V_V_CRITERION_CODE, String V_V_POSTCODE, String V_V_PLAN_STATE, String V_V_PLAN_TIME, String V_V_PLAN_PER, String V_V_DJ_TYPE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_SETBYGW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_SETBYGW(:V_V_DEPTCODE,:V_V_CRITERION_CODE,:V_V_POSTCODE,:V_V_PLAN_STATE,:V_V_PLAN_TIME,:V_V_PLAN_PER,:V_V_DJ_TYPE,:V_INFO)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
            cstmt.setString("V_V_PLAN_STATE", V_V_PLAN_STATE);
            cstmt.setString("V_V_PLAN_TIME", V_V_PLAN_TIME);
            cstmt.setString("V_V_PLAN_PER", V_V_PLAN_PER);
            cstmt.setString("V_V_DJ_TYPE", V_V_DJ_TYPE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_SETBYGW");
        return result;
    }

    public HashMap PRO_PM_06_CK_TYPE_VIEW(String V_V_CKTYPE) throws SQLException {

        logger.info("begin PRO_PM_06_CK_TYPE_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_CK_TYPE_VIEW(:V_V_CKTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_CKTYPE", V_V_CKTYPE);
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
        logger.info("end PRO_BASE_NEW_MENU_SEL");
        return result;
    }

    public HashMap PM_06_DJ_DATA_SEL_ALL(String V_V_CRITERION_CODE, String V_V_STIME, String V_V_ETIME) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_SEL_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_SEL_ALL(:V_V_CRITERION_CODE,:V_V_STIME,:V_V_ETIME,:V_CURSOR)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
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
        logger.info("end PM_06_DJ_DATA_SEL_ALL");
        return result;
    }

    public List<Map> PRO_BASE_POST_TREE(String V_V_DEPTCDODE) throws SQLException {

        logger.info("begin PRO_BASE_POST_TREE");

        List result = new ArrayList();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCDODE);
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
        logger.info("end PRO_BASE_POST_TREE");
        return result;
    }

    public List<Map> CreateTreeData(List list) {
        List<Map> result = new ArrayList();

        for (int i = 0; i <= list.size(); i++) {
            Map temp = new HashMap();
            if (i < list.size()) {
                Map map = (Map) list.get(i);
                if (map.get("V_POSTCODE_UP").toString().equals("-1")) {
                    temp.put("I_POSTID", map.get("I_POSTID").toString());
                    temp.put("V_POSTCODE", map.get("V_POSTCODE").toString());
                    temp.put("V_POSTNAME", map.get("V_POSTNAME").toString());
                    temp.put("V_POSTMEMO", map.get("V_POSTMEMO").toString());
                    temp.put("V_POSTCODE_UP", map.get("V_POSTCODE_UP").toString());
                    temp.put("cls", "empty");
                    if (IfHasMenuChildNode(map.get("V_POSTCODE").toString(), list)) {
                        temp.put("expanded", true);
                        temp.put("children", CreateMenuTree(map.get("V_POSTCODE").toString(), list));
                    } else {
                        temp.put("expanded", false);
                        temp.put("leaf", true);
                    }
                    result.add(temp);
                }
            }
        }
        return result;
    }

    public boolean IfHasMenuChildNode(String upcode, List list) {
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            if (upcode.equals(map.get("V_POSTCODE_UP").toString())) {
                flag = true;
            }
        }
        return flag;
    }

    public List<Map> CreateMenuTree(String upcode, List list) {
        List result = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            Map temp = new HashMap();
            if (map.get("V_POSTCODE_UP").toString().equals(upcode)) {
                temp.put("I_POSTID", map.get("I_POSTID").toString());
                temp.put("V_POSTCODE", map.get("V_POSTCODE").toString());
                temp.put("V_POSTNAME", map.get("V_POSTNAME").toString());
                temp.put("V_POSTMEMO", map.get("V_POSTMEMO").toString());
                temp.put("V_POSTCODE_UP", map.get("V_POSTCODE_UP").toString());
                temp.put("cls", "empty");
                if (IfHasMenuChildNode(map.get("V_POSTCODE").toString(), list)) {
                    temp.put("expanded", true);
                    temp.put("children", CreateMenuTree(map.get("V_POSTCODE").toString(), list));
                } else {
                    temp.put("expanded", false);
                    temp.put("leaf", true);
                }
                result.add(temp);
            }
        }
        return result;
    }


    public HashMap PRO_BASE_POST_SET(String V_V_UPCODE, String V_V_POSTCODE, String V_V_POSTNAME) throws SQLException {

        logger.info("begin PRO_BASE_POST_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_SET(:V_V_UPCODE,:V_V_POSTCODE,:V_V_POSTNAME,:V_INFO)}");
            cstmt.setString("V_V_UPCODE", V_V_UPCODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
            cstmt.setString("V_V_POSTNAME", V_V_POSTNAME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_POST_SET");
        return result;
    }


    public HashMap PRO_BASE_POST_DEL(String V_V_POSTCODE) throws SQLException {

        logger.info("begin PRO_BASE_POST_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_DEL(:V_V_POSTCODE,:V_INFO)}");
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_POST_DEL");
        return result;
    }


    public HashMap PM_1917_JXGX_PER_DATA_SELALL(String V_V_JXGX_CODE, String V_V_WORKNAME) throws SQLException {

        logger.info("begin PM_1917_JXGX_PER_DATA_SELALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_SELALL(:V_V_JXGX_CODE,:V_V_WORKNAME,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WORKNAME", V_V_WORKNAME);
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
        logger.info("end PM_1917_JXGX_PER_DATA_SELALL");
        return result;
    }


    public HashMap PRO_PM_WORKORDER_GETBYID(String V_V_ORDERID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GETBYID");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GETBYID(:V_V_ORDERID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
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
        logger.info("end PRO_PM_WORKORDER_GETBYID");
        return result;
    }

    public String BASE_PRO_JST_CODESEL(String percode) throws SQLException {

        logger.info("begin BASE_PRO_JST_CODESEL");

        String result = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_PRO_JST_CODESEL(:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", percode);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result = cstmt.getObject("V_INFO").toString();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_PRO_JST_CODESEL");
        return result;
    }

}
