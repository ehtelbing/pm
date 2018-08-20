package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_12Service {
    private static final Logger logger = Logger.getLogger(PM_12Service.class.getName());

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

    public HashMap PRO_BASE_DEPT_VIEW(String IS_V_DEPTCODE,String IS_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW" + "(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("IS_V_DEPTCODE", IS_V_DEPTCODE);
            cstmt.setString("IS_V_DEPTTYPE", IS_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW");
        return result;
    }
    public HashMap PRO_RUN_BJ_ALL(String A_PLANTCODE,String A_DEPARTCODE,String A_EQUID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_ALL" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUID", A_EQUID);
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
        logger.info("end PRO_RUN_BJ_ALL");
        return result;
    }

    public Map PRO_RUN_BJ_ADD(String A_BJ_ID,String A_BJ_DESC,String A_BJ_TYPE,String A_BJ_UNIT,String A_BJ_REMARK,String A_PLANTCODE,String A_DEPARTCODE,String A_EQUID,String A_PRE_FLAG) throws SQLException {
        logger.info("begin PRO_RUN_BJ_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_ADD" + "(:A_BJ_ID,:A_BJ_DESC,:A_BJ_TYPE,:A_BJ_UNIT,:A_BJ_REMARK,:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:A_PRE_FLAG,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_BJ_DESC", A_BJ_DESC);
            cstmt.setString("A_BJ_TYPE", A_BJ_TYPE);
            cstmt.setString("A_BJ_UNIT", A_BJ_UNIT);
            cstmt.setString("A_BJ_REMARK", A_BJ_REMARK);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_PRE_FLAG", A_PRE_FLAG);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_ADD");
        return result;
    }
    public Map PRO_RUN_BJ_UPDATE(String A_BJ_ID,String A_BJ_DESC,String A_BJ_TYPE,String A_BJ_UNIT,String A_BJ_REMARK,String A_PRE_FLAG) throws SQLException {
        logger.info("begin PRO_RUN_BJ_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_UPDATE" + "(:A_BJ_ID,:A_BJ_DESC,:A_BJ_TYPE,:A_BJ_UNIT,:A_BJ_REMARK,:A_PRE_FLAG,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_BJ_DESC", A_BJ_DESC);
            cstmt.setString("A_BJ_TYPE", A_BJ_TYPE);
            cstmt.setString("A_BJ_UNIT", A_BJ_UNIT);
            cstmt.setString("A_BJ_REMARK", A_BJ_REMARK);
            cstmt.setString("A_PRE_FLAG", A_PRE_FLAG);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_UPDATE");
        return result;
    }
    public Map PRO_RUN_BJ_DELETE(String A_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN_BJ_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_DELETE" + "(:A_BJ_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_DELETE");
        return result;
    }
    public Map PRO_RUN_CYCLE_ABLE() throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_ABLE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ABLE" + "(:RET)}");
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
        logger.info("end PRO_RUN_CYCLE_ABLE");
        return result;
    }
    public Map PRO_RUN_BJ_CYCLE_BASIC_ALL(String A_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_ALL" + "(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
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
        logger.info("end PRO_RUN_BJ_CYCLE_BASIC_ALL");
        return result;
    }
    public Map PRO_RUN_BJ_CYCLE_BASIC_ADD(String A_BJ_ID,String A_CYCLE_ID,String A_CYCLE_VALUE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_ADD" + "(:A_BJ_ID,:A_CYCLE_ID,:A_CYCLE_VALUE,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("A_CYCLE_VALUE", A_CYCLE_VALUE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_CYCLE_BASIC_ADD");
        return result;
    }
    public Map PRO_RUN_BJ_CYCLE_BASIC_DEL(String A_BJ_ID,String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_DEL" + "(:A_BJ_ID,:A_CYCLE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_CYCLE_BASIC_DEL");
        return result;
    }
    public Map PRO_RUN_BJ_GETDESC(String A_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN_BJ_GETDESC");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_GETDESC" + "(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_GETDESC");
        return result;
    }
    public Map PRO_RUN_BJ_MAT_ALL(String A_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN_BJ_MAT_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_MAT_ALL" + "(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
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
        logger.info("end PRO_RUN_BJ_MAT_ALL");
        return result;
    }
    public Map PRO_RUN_BJ_MAT_ADD(String A_BJ_ID,String A_MATERIALCODE,String A_MATERIALNAME,String A_MATERIALETALON,String A_UNIT,String A_PRICE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_MAT_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_MAT_ADD" + "(:A_BJ_ID,:A_MATERIALCODE,:A_MATERIALNAME,:A_MATERIALETALON,:A_UNIT,:A_PRICE,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_MATERIALETALON", A_MATERIALETALON);
            cstmt.setString("A_UNIT", A_UNIT);
            cstmt.setString("A_PRICE", A_PRICE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_MAT_ADD");
        return result;
    }
    public Map PRO_RUN_BJ_MAT_DEL(String A_BJ_ID,String A_MATERIALCODE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_MAT_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_MAT_DEL" + "(:A_BJ_ID,:A_MATERIALCODE,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_MAT_DEL");
        return result;
    }
    public Map PRO_RUN_SITE_ALL(String A_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN_SITE_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_ALL" + "(:A_EQU_ID,:RET)}");
            cstmt.setString("A_EQU_ID", A_EQU_ID);
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
        logger.info("end PRO_RUN_SITE_ALL");
        return result;
    }
    public Map PRO_RUN_SITE_ADD(String A_SITE_DESC,String A_EQUID,String A_REMARK,String A_USERNAME,
                                String A_MEND_DEPART,String A_MEND_USERNAME,String A_MEND_USERNAMEID,
                                String A_BJ_ID,String A_BJ_AMOUNT) throws SQLException {
        logger.info("begin PRO_RUN_SITE_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_ADD" + "(:A_SITE_DESC,:A_EQUID,:A_REMARK,:A_USERNAME,:A_MEND_DEPART,:A_MEND_USERNAME,:A_MEND_USERNAMEID,:A_BJ_ID,:A_BJ_AMOUNT,:RET_MSG,:RET)}");
            cstmt.setString("A_SITE_DESC", A_SITE_DESC);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setString("A_MEND_DEPART", A_MEND_DEPART);
            cstmt.setString("A_MEND_USERNAME", A_MEND_USERNAME);
            cstmt.setString("A_MEND_USERNAMEID", A_MEND_USERNAMEID);
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_BJ_AMOUNT", A_BJ_AMOUNT);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_SITE_ADD");
        return result;
    }
    public Map PRO_RUN_SITE_UPDATE(String A_SITE_ID,String A_SITE_DESC,String A_REMARK,String A_USERNAME,
                                   String A_MEND_DEPART,String A_MEND_USERNAME,String A_MEND_USERNAMEID,
                                   String A_BJ_ID,String A_BJ_AMOUNT) throws SQLException {
        logger.info("begin PRO_RUN_SITE_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_UPDATE" + "(:A_SITE_ID,:A_SITE_DESC,:A_REMARK,:A_USERNAME,:A_MEND_DEPART,:A_MEND_USERNAME,:A_MEND_USERNAMEID,:A_BJ_ID,:A_BJ_AMOUNT,:RET_MSG,:RET)}");
            cstmt.setString("A_SITE_ID", A_SITE_ID);
            cstmt.setString("A_SITE_DESC", A_SITE_DESC);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setString("A_MEND_DEPART", A_MEND_DEPART);
            cstmt.setString("A_MEND_USERNAME", A_MEND_USERNAME);
            cstmt.setString("A_MEND_USERNAMEID", A_MEND_USERNAMEID);
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_BJ_AMOUNT", A_BJ_AMOUNT);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_SITE_UPDATE");
        return result;
    }
    public Map PRO_RUN_SITE_DELETE(String A_SITE_ID) throws SQLException {
        logger.info("begin PRO_RUN_SITE_DELETE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_DELETE" + "(:A_SITE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_SITE_ID", A_SITE_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_SITE_DELETE");
        return result;
    }
    public Map PRO_RUN_EQU_VGURL(String A_EQUID) throws SQLException {
        logger.info("begin PRO_RUN_EQU_VGURL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_VGURL" + "(:A_EQUID,:RET_URL)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.registerOutParameter("RET_URL", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_URL", (String) cstmt.getObject("RET_URL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_EQU_VGURL");
        return result;
    }
    public Map PRO_RUN_CYCLE_ALL() throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ALL" + "(:RET)}");
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
        logger.info("end PRO_RUN_CYCLE_ALL");
        return result;
    }
    public Map PRO_RUN_CYCLE_ADD(String A_CYCLE_DESC,String A_CYCLE_UNIT) throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ADD" + "(:A_CYCLE_DESC,:A_CYCLE_UNIT,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_DESC", A_CYCLE_DESC);
            cstmt.setString("A_CYCLE_UNIT", A_CYCLE_UNIT);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_CYCLE_ADD");
        return result;
    }
    public Map PRO_RUN_CYCLE_UPDATE(String A_CYCLE_ID,String A_CYCLE_DESC,String A_CYCLE_UNIT) throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_UPDATE" + "(:A_CYCLE_ID,:A_CYCLE_DESC,:A_CYCLE_UNIT,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("A_CYCLE_DESC", A_CYCLE_DESC);
            cstmt.setString("A_CYCLE_UNIT", A_CYCLE_UNIT);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_CYCLE_UPDATE");
        return result;
    }
    public Map PRO_RUN_CYCLE_DELETE(String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_DELETE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_DELETE" + "(:A_CYCLE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_CYCLE_DELETE");
        return result;
    }
    public Map PRO_RUN7121_SELECTEQULIST(String V_DEPARTCODE,String V_PLANTCODE) throws SQLException {
        logger.info("begin PRO_RUN7121_SELECTEQULIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_SELECTEQULIST" + "(:V_DEPARTCODE,:V_PLANTCODE,:OUT_RESULT)}");
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_SELECTEQULIST");
        return result;
    }
    public Map PRO_RUN7121_GETEQULIST(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7121_GETEQULIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_GETEQULIST" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_GETEQULIST");
        return result;
    }
    public Map PRO_RUN7121_ADDEQU(String V_EQU_ID,String V_EQU_DESC,String V_DEPARTCODE,String V_PLANTCODE,String V_USERID,String V_USERNAME,String V_STATUS,String V_PP_CODE) throws SQLException {
        logger.info("begin PRO_RUN7121_GETEQULIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_ADDEQU" + "(:V_EQU_ID,:V_EQU_DESC,:V_DEPARTCODE,:V_PLANTCODE,:V_USERID,:V_USERNAME,:V_STATUS,:V_PP_CODE,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_EQU_DESC", V_EQU_DESC);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.setString("V_PP_CODE", V_PP_CODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_ADDEQU");
        return result;
    }
    public Map PRO_RUN7121_UPDATEEQU(String V_EQU_ID,String V_EQU_DESC,String V_USERID,String V_USERNAME,String V_STATUS,String V_PP_CODE) throws SQLException {
        logger.info("begin PRO_RUN7121_UPDATEEQU");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_UPDATEEQU" + "(:V_EQU_ID,:V_EQU_DESC,:V_USERID,:V_USERNAME,:V_STATUS,:V_PP_CODE,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_EQU_DESC", V_EQU_DESC);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.setString("V_PP_CODE", V_PP_CODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_UPDATEEQU");
        return result;
    }
    public Map PRO_RUN7121_STOP(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7121_STOP");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_STOP" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_STOP");
        return result;
    }
    public Map PRO_RUN7121_STARTEQU(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7121_STARTEQU");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7121_STARTEQU" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7121_STARTEQU");
        return result;
    }
    public Map PRO_RUN7122_SELECTVGLIST(String V_VG_DESC) throws SQLException {
        logger.info("begin PRO_RUN7121_STARTEQU");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7122_SELECTVGLIST" + "(:V_VG_DESC,:OUT_RESULT)}");
            cstmt.setString("V_VG_DESC", V_VG_DESC);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7122_SELECTVGLIST");
        return result;
    }
    public Map PRO_RUN7122_ADDVGURL(String V_VG_DESC,String V_URL) throws SQLException {
        logger.info("begin PRO_RUN7122_ADDVGURL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7122_ADDVGURL" + "(:V_VG_DESC,:V_URL,:OUT_RESULT)}");
            cstmt.setString("V_VG_DESC", V_VG_DESC);
            cstmt.setString("V_URL", V_URL);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7122_ADDVGURL");
        return result;
    }
    public Map PRO_RUN7122_DELETEVGURL(String V_ID) throws SQLException {
        logger.info("begin PRO_RUN7122_DELETEVGURL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7122_DELETEVGURL" + "(:V_ID,:OUT_RESULT)}");
            cstmt.setString("V_ID", V_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7122_DELETEVGURL");
        return result;
    }
    public Map PRO_RUN7123_SELECTSTLIST(String V_SITE_ID) throws SQLException {
        logger.info("begin PRO_RUN7123_SELECTSTLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7123_SELECTSTLIST" + "(:V_SITE_ID,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7123_SELECTSTLIST");
        return result;
    }
    public Map PRO_RUN7123_ADDST(String V_SITE_ID,String V_TAG_DESC,String V_TAG_UNIT,String V_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7123_ADDST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7123_ADDST" + "(:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT,:V_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_TAG_DESC", V_TAG_DESC);
            cstmt.setString("V_TAG_UNIT", V_TAG_UNIT);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7123_ADDST");
        return result;
    }
    public Map PRO_RUN7123_UPDATEST(String V_TAG_ID,String V_SITE_ID,String V_TAG_DESC,String V_TAG_UNIT,String V_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7123_UPDATEST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7123_UPDATEST" + "(:V_TAG_ID,:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT,:V_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_TAG_ID", V_TAG_ID);
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_TAG_DESC", V_TAG_DESC);
            cstmt.setString("V_TAG_UNIT", V_TAG_UNIT);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7123_UPDATEST");
        return result;
    }
    public Map PRO_RUN7123_STOPST(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7123_STOPST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7123_STOPST" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7123_STOPST");
        return result;
    }
    public Map PRO_RUN7123_STARTST(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7123_STARTST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7123_STARTST" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7123_STARTST");
        return result;
    }
    public Map PRO_RUN7124_SUPPLYLIST(String V_SUPPLY_CODE,String V_SUPPLY_NAME,String V_SUPPLY_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7124_SUPPLYLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_SUPPLYLIST" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_SUPPLY_NAME", V_SUPPLY_NAME);
            cstmt.setString("V_SUPPLY_STATUS", V_SUPPLY_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_SUPPLYLIST");
        return result;
    }
    public Map PRO_RUN7124_ADDSUPPLY(String V_SUPPLY_CODE,String V_SUPPLY_NAME,String V_SUPPLY_DESC,String V_SUPPLY_RENAGE,String V_SUPPLY_MANAGER,String V_LINK_PERSON,String V_LINK_TYPE,String V_LINK_PHONECODE,String V_SUPPLY_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7124_ADDSUPPLY");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_ADDSUPPLY" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER,:V_LINK_PERSON,:V_LINK_TYPE,:V_LINK_PHONECODE,:V_SUPPLY_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_SUPPLY_NAME", V_SUPPLY_NAME);
            cstmt.setString("V_SUPPLY_DESC", V_SUPPLY_DESC);
            cstmt.setString("V_SUPPLY_RENAGE", V_SUPPLY_RENAGE);
            cstmt.setString("V_SUPPLY_MANAGER", V_SUPPLY_MANAGER);
            cstmt.setString("V_LINK_PERSON", V_LINK_PERSON);
            cstmt.setString("V_LINK_TYPE", V_LINK_TYPE);
            cstmt.setString("V_LINK_PHONECODE", V_LINK_PHONECODE);
            cstmt.setString("V_SUPPLY_STATUS", V_SUPPLY_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_ADDSUPPLY");
        return result;
    }
    public Map PRO_RUN7124_UPDATESUPPLY(String V_SUPPLY_CODE,String V_SUPPLY_NAME,String V_SUPPLY_DESC,String V_SUPPLY_RENAGE,String V_SUPPLY_MANAGER,String V_LINK_PERSON,String V_LINK_TYPE,String V_LINK_PHONECODE,String V_SUPPLY_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7124_UPDATESUPPLY");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_UPDATESUPPLY" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER,:V_LINK_PERSON,:V_LINK_TYPE,:V_LINK_PHONECODE,:V_SUPPLY_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_SUPPLY_NAME", V_SUPPLY_NAME);
            cstmt.setString("V_SUPPLY_DESC", V_SUPPLY_DESC);
            cstmt.setString("V_SUPPLY_RENAGE", V_SUPPLY_RENAGE);
            cstmt.setString("V_SUPPLY_MANAGER", V_SUPPLY_MANAGER);
            cstmt.setString("V_LINK_PERSON", V_LINK_PERSON);
            cstmt.setString("V_LINK_TYPE", V_LINK_TYPE);
            cstmt.setString("V_LINK_PHONECODE", V_LINK_PHONECODE);
            cstmt.setString("V_SUPPLY_STATUS", V_SUPPLY_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_UPDATESUPPLY");
        return result;
    }
    public Map PRO_RUN7124_SUPPLYMATLIST(String V_SUPPLY_CODE) throws SQLException {
        logger.info("begin PRO_RUN7124_SUPPLYMATLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_SUPPLYMATLIST" + "(:V_SUPPLY_CODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_SUPPLYMATLIST");
        return result;
    }
    public Map PRO_RUN7124_ADDSUPPLYMAT(String V_SUPPLY_CODE,String V_MATERIALCODE) throws SQLException {
        logger.info("begin PRO_RUN7124_ADDSUPPLYMAT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_ADDSUPPLYMAT" + "(:V_SUPPLY_CODE,:V_MATERIALCODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_ADDSUPPLYMAT");
        return result;
    }
    public Map PRO_RUN7124_DELSUPPLYMAT(String V_SUPPLY_CODE,String V_MATERIALCODE) throws SQLException {
        logger.info("begin PRO_RUN7124_DELSUPPLYMAT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7124_DELSUPPLYMAT" + "(:V_SUPPLY_CODE,:V_MATERIALCODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7124_DELSUPPLYMAT");
        return result;
    }
    public Map PRO_RUN7125_EQUVGLIST(String V_PLANTCODE,String V_DEPARTCODE) throws SQLException {
        logger.info("begin PRO_RUN7125_EQUVGLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7125_EQUVGLIST" + "(:V_PLANTCODE,:V_DEPARTCODE,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7125_EQUVGLIST");
        return result;
    }
    public Map PRO_RUN7125_ADDEQUVG(String V_EQU_ID,String V_VG_IDL) throws SQLException {
        logger.info("begin PRO_RUN7125_ADDEQUVG");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7125_ADDEQUVG" + "(:V_EQU_ID,:V_VG_IDL,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_VG_IDL", V_VG_IDL);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7125_ADDEQUVG");
        return result;
    }
    public Map PRO_RUN7125_DELEQUVG(String V_EQU_ID,String V_VG_ID) throws SQLException {
        logger.info("begin PRO_RUN7125_DELEQUVG");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7125_DELEQUVG" + "(:V_EQU_ID,:V_VG_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7125_DELEQUVG");
        return result;
    }
    public Map PRO_RUN7126_SITEVGLIST(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7126_SITEVGLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7126_SITEVGLIST" + "(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7126_SITEVGLIST");
        return result;
    }
    public Map PRO_RUN7126_ADDSITEVG(String V_SITE_ID,String V_VG_ID) throws SQLException {
        logger.info("begin PRO_RUN7126_ADDSITEVG");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7126_ADDSITEVG" + "(:V_SITE_ID,:V_VG_ID,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7126_ADDSITEVG");
        return result;
    }
    public Map PRO_RUN7126_DELSITEVG(String V_SITE_ID,String V_VG_ID) throws SQLException {
        logger.info("begin PRO_RUN7126_DELSITEVG");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7126_DELSITEVG" + "(:V_SITE_ID,:V_VG_ID,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("OUT_RESULT", (String) cstmt.getObject("OUT_RESULT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7126_DELSITEVG");
        return result;
    }
    public Map PRO_RUN_YEILD_SELECT_MANAGE(String A_EQUID,String A_WORKDATE,String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_YEILD_SELECT_MANAGE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_SELECT_MANAGE" + "(:A_EQUID,:A_WORKDATE,:A_CYCLE_ID,:OUT_RESULT)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_WORKDATE", A_WORKDATE);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_YEILD_SELECT_MANAGE");
        return result;
    }
    public Map PRO_RUN_YEILD_INPUT(String A_EQU_ID,String A_CYCLE_ID,String A_WORKDATE,String A_INSERTVALUE,String A_INSRTPERSON) throws SQLException {
        logger.info("begin PRO_RUN_YEILD_INPUT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_INPUT" + "(:A_EQU_ID,:A_CYCLE_ID,:A_WORKDATE,:A_INSERTVALUE,:A_INSRTPERSON,:RET_MSG,:RET)}");
            cstmt.setString("A_EQU_ID", A_EQU_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("A_WORKDATE", A_WORKDATE);
            cstmt.setString("A_INSERTVALUE", A_INSERTVALUE);
            cstmt.setString("A_INSRTPERSON", A_INSRTPERSON);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_YEILD_INPUT");
        return result;
    }
    public Map PRO_RUN_TEILD_DELETE(String A_ID) throws SQLException {
        logger.info("begin PRO_RUN_TEILD_DELETE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_TEILD_DELETE" + "(:A_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_TEILD_DELETE");
        return result;
    }
    public Map PRO_RUN7111_EQULIST(String V_V_PLANTCODE,String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_RUN7111_EQULIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7111_EQULIST" + "(:V_V_PLANTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end PRO_RUN7111_EQULIST");
        return result;
    }
    public Map PRO_RUN7111_USEBJLIST(String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_RUN7111_USEBJLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7111_USEBJLIST" + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end PRO_RUN7111_USEBJLIST");
        return result;
    }
    public Map PRO_RUN7111_TAGLIST(String PID) throws SQLException {
        logger.info("begin PRO_RUN7111_TAGLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7111_TAGLIST" + "(:PID,:V_CURSOR)}");
            cstmt.setString("PID", PID);
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
        logger.info("end PRO_RUN7111_TAGLIST");
        return result;
    }
    public HashMap pro_run7111_addlog(String v_v_bjcode, String v_v_checktime,String v_v_checkcount,
                                      FileInputStream v_v_file, String v_v_filename,
                                      String v_v_usercode,String v_v_username,
                                      String tagid,String siteid,
                                      String tagdesc) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_run7111_addlog" + "(:v_v_bjcode,:v_v_checktime,:v_v_checkcount," +
                    ":v_v_file,:v_v_filename,:v_v_usercode,:v_v_username,:tagid,:siteid,:tagdesc,:ret)}");
            cstmt.setString("v_v_bjcode", v_v_bjcode);
            cstmt.setString("v_v_checktime", v_v_checktime);
            cstmt.setString("v_v_checkcount", v_v_checkcount);
            cstmt.setBinaryStream("v_v_file", v_v_file);
            cstmt.setString("v_v_filename", v_v_filename);
            cstmt.setString("v_v_usercode", v_v_usercode);
            cstmt.setString("v_v_username", v_v_username);
            cstmt.setString("tagid", tagid);
            cstmt.setString("siteid", siteid);
            cstmt.setString("tagdesc", tagdesc);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String)cstmt.getObject("ret"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7111_addlog");
        return result;
    }
    public Map PRO_RUN7113_ORDERMATLIST(String V_DEPT_CODE,String V_EQUIP_CODE,String V_MATERIALCODE,String V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_RUN7113_ORDERMATLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7113_ORDERMATLIST" + "(:V_DEPT_CODE,:V_EQUIP_CODE,:V_MATERIALCODE,:V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
            cstmt.setString("V_EQUIP_CODE", V_EQUIP_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
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
        logger.info("end PRO_RUN7113_ORDERMATLIST");
        return result;
    }
    public Map PRO_RUN7110_SITESUPPLYLIST(String A_ID,String A_MATERIALCODE,String A_ORDERID) throws SQLException {
        logger.info("begin PRO_RUN7110_SITESUPPLYLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7110_SITESUPPLYLIST" + "(:A_ID,:A_MATERIALCODE,:A_ORDERID,:RET)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end PRO_RUN7110_SITESUPPLYLIST");
        return result;
    }
    public Map PRO_RUN_SITE_BJ_ALL(String IN_EQUID,String IN_PLANT,String IN_DEPART,String IN_STATUS,String IN_BJCODE,String IN_BJDESC) throws SQLException {
        logger.info("begin PRO_RUN_SITE_BJ_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_ALL" + "(:IN_EQUID,:IN_PLANT,:IN_DEPART,:IN_STATUS,:IN_BJCODE,:IN_BJDESC,:RET)}");
            cstmt.setString("IN_EQUID", IN_EQUID);
            cstmt.setString("IN_PLANT", IN_PLANT);
            cstmt.setString("IN_DEPART", IN_DEPART);
            cstmt.setString("IN_STATUS", IN_STATUS);
            cstmt.setString("IN_BJCODE", IN_BJCODE);
            cstmt.setString("IN_BJDESC", IN_BJDESC);
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
        logger.info("end PRO_RUN_SITE_BJ_ALL");
        return result;
    }
    public Map pg_run7113_getordermatbarcode(String a_orderid,String a_materialcode) throws SQLException {
        logger.info("begin pg_run7113_getordermatbarcode");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pg_run7113_getordermatbarcode" + "(:a_orderid,:a_materialcode,:V_CURSOR)}");
            cstmt.setString("a_orderid", a_orderid);
            cstmt.setString("a_materialcode", a_materialcode);
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
        logger.info("end pg_run7113_getordermatbarcode");
        return result;
    }
    public HashMap PRO_RUN7113_CHANGEORDERMAT(String A_ID,String SITE_ID,String V_EQUIP_NO,
                                              String USERID,String USERNAME,String PLANTCODE,String WORKAREA,String CHANGEDATE,
                                              String V_MATERIALCODE,String a_supplycode,String a_supplyname,String a_uniquecode,
                                              String a_replacedate,String a_faultreason,String A_REASON_REMARK)throws SQLException {

        logger.info("begin PRO_RUN7113_CHANGEORDERMAT");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_CHANGEORDERMAT(:A_ID,:SITE_ID,:V_EQUIP_NO,:USERID,:USERNAME,:PLANTCODE," +
                    ":WORKAREA,:CHANGEDATE,:V_MATERIALCODE,:a_supplycode,:a_supplyname,:a_uniquecode,:a_replacedate,:a_faultreason,:A_REASON_REMARK,:RET)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.setString("SITE_ID", SITE_ID);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("USERID", USERID);
            cstmt.setString("USERNAME", USERNAME);
            cstmt.setString("PLANTCODE", PLANTCODE);
            cstmt.setString("WORKAREA", WORKAREA);
            cstmt.setString("CHANGEDATE", CHANGEDATE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("a_supplycode", a_supplycode);
            cstmt.setString("a_supplyname", a_supplyname);
            cstmt.setString("a_uniquecode", a_uniquecode);
            cstmt.setString("a_replacedate", a_replacedate);
            cstmt.setString("a_faultreason", a_faultreason);
            cstmt.setString("A_REASON_REMARK", A_REASON_REMARK);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7113_CHANGEORDERMAT");
        return result;
    }
    public Map PRO_RUN7113_CHANGECANCEL(String V_I_ID,String V_SITE_ID,String V_EQUIP_NO,String V_USERID,String V_USERNAME,String V_PLANTCODE,String V_DEPARTCODE,String V_CHANGETIME) throws SQLException {
        logger.info("begin PRO_RUN7113_CHANGECANCEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7113_CHANGECANCEL" + "(:V_I_ID,:V_SITE_ID,:V_EQUIP_NO,:V_USERID,:V_USERNAME,:V_PLANTCODE,:V_DEPARTCODE,:V_CHANGETIME,:RET)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_CHANGETIME", V_CHANGETIME);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7113_CHANGECANCEL");
        return result;
    }
    public Map PRO_RUN7132_ORDERMATLIST(String V_D_FACT_START_DATE,String V_D_FACT_FINISH_DATE,String V_V_PLANT,String V_V_DEPTCODE,String V_V_EQUIP_NO,String V_V_ORDERGUID,String V_V_MATERIALCODE,String V_V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_RUN7132_ORDERMATLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7132_ORDERMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
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
        logger.info("end PRO_RUN7132_ORDERMATLIST");
        return result;
    }
    public Map PRO_NO7132_DEPARTMATLIST(String V_D_FACT_START_DATE,String V_D_FACT_FINISH_DATE,String V_V_PLANT,String V_V_DEPTCODE,String V_V_EQUIP_NO,String V_V_ORDERGUID,String V_V_MATERIALCODE,String V_V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_NO7132_DEPARTMATLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_NO7132_DEPARTMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
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
        logger.info("end PRO_NO7132_DEPARTMATLIST");
        return result;
    }
    public Map PRO_RUN7114_EQULIST(String V_V_DEPARTCODE,String V_V_PLANTCODE) throws SQLException {
        logger.info("begin PRO_RUN7114_EQULIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7114_EQULIST" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end PRO_RUN7114_EQULIST");
        return result;
    }
    public Map PRO_RUN7115_PERSONLIST(String V_V_DEPARTCODE,String V_V_PLANTCODE,String V_V_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN7115_PERSONLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7115_PERSONLIST" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
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
        logger.info("end PRO_RUN7115_PERSONLIST");
        return result;
    }
    public Map PRO_RUN7115_SELECT(String V_V_DEPARTCODE,String V_V_PLANTCODE,String V_V_BJ_ID,String V_V_USERID) throws SQLException {
        logger.info("begin PRO_RUN7115_SELECT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7115_SELECT" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_V_USERID,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
            cstmt.setString("V_V_USERID", V_V_USERID);
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
        logger.info("end PRO_RUN7115_SELECT");
        return result;
    }
    public Map PRO_RUN7115_HANDLEALERT(String V_V_ID,String V_V_ALERT_CONTEXT,String V_V_HANDLE_USERID,String V_V_HANDLE_USERNAME) throws SQLException {
        logger.info("begin PRO_RUN7115_HANDLEALERT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7115_HANDLEALERT" + "(:V_V_ID,:V_V_ALERT_CONTEXT,:V_V_HANDLE_USERID,:V_V_HANDLE_USERNAME,:V_CURSOR)}");
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_ALERT_CONTEXT", V_V_ALERT_CONTEXT);
            cstmt.setString("V_V_HANDLE_USERID", V_V_HANDLE_USERID);
            cstmt.setString("V_V_HANDLE_USERNAME", V_V_HANDLE_USERNAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7115_HANDLEALERT");
        return result;
    }
    public Map PRO_RUN7127_SELECTKC(String V_PLANTCODE,String V_DEPARTCODE,String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7127_SELECTKC");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7127_SELECTKC" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7127_SELECTKC");
        return result;
    }
    public Map PRO_RUN7128_JUNKMATLIST(String D_BEGIN_DATE,String D_END_DATE,String V_PLANTCODE,String V_DEPARTCODE,String V_EQU_ID,String V_MATERIALCODE,String V_MATERIALNAME,String V_STATUS) throws SQLException {
        logger.info("begin PRO_RUN7128_JUNKMATLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7128_JUNKMATLIST" + "(:D_BEGIN_DATE,:D_END_DATE,:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:V_MATERIALCODE,:V_MATERIALNAME,:V_STATUS,:OUT_RESULT)}");
            cstmt.setString("D_BEGIN_DATE", D_BEGIN_DATE);
            cstmt.setString("D_END_DATE", D_END_DATE);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7128_JUNKMATLIST");
        return result;
    }
    public Map PRO_RUN7129_JUNKMAT(String V_ID, String V_HANDLE_TYPE,String  V_HANDLE_REMARK,String  V_HANDLE_USERID,String V_HANDLE_USERNAME) throws SQLException {
        logger.info("begin PRO_RUN7129_JUNKMAT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7129_JUNKMAT" + "(:V_ID,:V_HANDLE_TYPE,:V_HANDLE_REMARK,:V_HANDLE_USERID,:V_HANDLE_USERNAME,:V_RET)}");
            cstmt.setString("V_ID", V_ID);
            cstmt.setString("V_HANDLE_TYPE", V_HANDLE_TYPE);
            cstmt.setString("V_HANDLE_REMARK", V_HANDLE_REMARK);
            cstmt.setString("V_HANDLE_USERID", V_HANDLE_USERID);
            cstmt.setString("V_HANDLE_USERNAME", V_HANDLE_USERNAME);
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_RET", (String) cstmt.getObject("V_RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7129_JUNKMAT");
        return result;
    }
    public Map PRO_RUN_YEILD_SELECT(String A_EQUID,String  A_BEGINDATE,String  A_ENDDATE,String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_YEILD_SELECT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_SELECT" + "(:A_EQUID,:A_BEGINDATE,:A_ENDDATE,:A_CYCLE_ID,:RET_SUM,:RET)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_BEGINDATE", A_BEGINDATE);
            cstmt.setString("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET_SUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET_SUM", (String) cstmt.getObject("RET_SUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_YEILD_SELECT");
        return result;
    }
    public Map PRO_RUN_EQU_BJ_ALERT_ALL(String A_EQUID,String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_EQU_BJ_ALERT_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_BJ_ALERT_ALL" + "(:A_EQUID,:A_CYCLE_ID,:RET)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
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
        logger.info("end PRO_RUN_EQU_BJ_ALERT_ALL");
        return result;
    }
    public Map PRO_RUN_BJ_USE_ALL(String A_PLANTCODE,String A_DEPARTCODE,String A_EQUID,String A_BJ_UNIQUE_CODE,String A_BEGINDATE,String A_ENDDATE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_USE_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_USE_ALL" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:A_BJ_UNIQUE_CODE,:A_BEGINDATE,:A_ENDDATE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_BJ_UNIQUE_CODE", A_BJ_UNIQUE_CODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
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
        logger.info("end PRO_RUN_BJ_USE_ALL");
        return result;
    }
    public Map PRO_RUN_BJ_CHANGE_LOG_ALL(String A_BJ_UNIQUE_CODE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_CHANGE_LOG_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CHANGE_LOG_ALL" + "(:A_BJ_UNIQUE_CODE,:RET)}");
            cstmt.setString("A_BJ_UNIQUE_CODE", A_BJ_UNIQUE_CODE);
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
        logger.info("end PRO_RUN_BJ_CHANGE_LOG_ALL");
        return result;
    }
    public Map PRO_RUN7112_CHECKLOGLIST(String V_V_EQUCODE,String V_V_DEPTCODE,String V_V_PLANTCODE,String V_V_ID,String V_V_BTIME,String V_V_ETIME) throws SQLException {
        logger.info("begin PRO_RUN7112_CHECKLOGLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7112_CHECKLOGLIST" + "(:V_V_EQUCODE,:V_V_DEPTCODE,:V_V_PLANTCODE,:V_V_ID,:V_V_BTIME,:V_V_ETIME,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setDate("V_V_BTIME", Date.valueOf(V_V_BTIME));
            cstmt.setDate("V_V_ETIME", Date.valueOf(V_V_ETIME));
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
        logger.info("end PRO_RUN7112_CHECKLOGLIST");
        return result;
    }
    public Map PRO_RUN7112_LOGPIC(String V_V_ID) throws SQLException {
        logger.info("begin PRO_RUN7112_LOGPIC");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7112_LOGPIC" + "(:V_V_ID,:V_RET,:O_FILE,:O_FILENAME)}");
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("O_FILE", OracleTypes.BLOB);
            cstmt.registerOutParameter("O_FILENAME", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_RET", (String) cstmt.getObject("V_RET"));
            result.put("O_FILENAME", (String) cstmt.getObject("O_FILENAME"));
            result.put("O_FILE", (Blob)cstmt.getObject("O_FILE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7112_LOGPIC");
        return result;
    }
    public Map PRO_RUN7116_SELECT(String V_V_DEPARTCODE,String V_V_PLANTCODE,String V_V_BJ_ID,String V_V_BEGIN_DATE,String V_V_END_DATE) throws SQLException {
        logger.info("begin PRO_RUN7116_SELECT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7116_SELECT" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_V_BEGIN_DATE,:V_V_END_DATE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
            cstmt.setString("V_V_BEGIN_DATE", V_V_BEGIN_DATE);
            cstmt.setString("V_V_END_DATE", V_V_END_DATE);
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
        logger.info("end PRO_RUN7116_SELECT");
        return result;
    }
    public Map PRO_RUN7117_BJLIST(String V_V_DEPARTCODE,String V_V_PLANTCODE) throws SQLException {
        logger.info("begin PRO_RUN7117_BJLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7117_BJLIST" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end PRO_RUN7117_BJLIST");
        return result;
    }
    public Map PRO_RUN7117_BJWORKLIST(String V_V_DEPARTCODE,String V_V_PLANTCODE,String V_V_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN7117_BJWORKLIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7117_BJWORKLIST" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
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
        logger.info("end PRO_RUN7117_BJWORKLIST");
        return result;
    }
    public Map PRO_RUN7118_WORKTIMELIST(String V_V_SITE_ID) throws SQLException {
        logger.info("begin PRO_RUN7118_WORKTIMELIST");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7118_WORKTIMELIST" + "(:V_V_SITE_ID,:V_CURSOR)}");
            cstmt.setString("V_V_SITE_ID", V_V_SITE_ID);
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
        logger.info("end PRO_RUN7118_WORKTIMELIST");
        return result;
    }
    public Map PRO_RUN7119_SITEVGURL(String V_SITE_ID) throws SQLException {
        logger.info("begin PRO_RUN7119_SITEVGURL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7119_SITEVGURL" + "(:V_SITE_ID,:RET)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7119_SITEVGURL");
        return result;
    }
    public Map PRO_RUN7129_EQUVGURL(String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7129_EQUVGURL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7129_EQUVGURL" + "(:V_EQU_ID,:RET)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7129_EQUVGURL");
        return result;
    }
    public Map PRO_RUN7130_SELECTBJTIME(String V_PLANTCODE,String V_DEPARTCODE,String V_SUPPLY_CODE,String V_MATERIALNAME,String D_BEGIN_DATE,String D_END_DATE,String V_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN7130_SELECTBJTIME");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7130_SELECTBJTIME" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_SUPPLY_CODE,:V_MATERIALNAME,:D_BEGIN_DATE,:D_END_DATE,:V_CYCLE_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.setString("D_BEGIN_DATE", D_BEGIN_DATE);
            cstmt.setString("D_END_DATE", D_END_DATE);
            cstmt.setString("V_CYCLE_ID", V_CYCLE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7130_SELECTBJTIME");
        return result;
    }
    public Map PRO_RUN7131_SUPPLYBJAVG(String V_PLANTCODE,String V_DEPARTCODE,String V_EQU_ID,String V_SITE_ID,String V_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN7131_SUPPLYBJAVG");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7131_SUPPLYBJAVG" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:V_SITE_ID,:V_CYCLE_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_CYCLE_ID", V_CYCLE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7131_SUPPLYBJAVG");
        return result;
    }
}
