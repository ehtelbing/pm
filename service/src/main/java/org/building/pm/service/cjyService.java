package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Created by admin on 2017/10/31.
 */
@Service
public class cjyService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

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

    public HashMap PRO_RUN_BJ_ALL(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_ALL(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_BJ_ADD(String A_BJ_ID, String A_BJ_DESC, String A_BJ_TYPE, String A_BJ_UNIT, String A_BJ_REMARK,
                                  String A_PLANTCODE, String A_DEPARTCODE, String A_EQUID, String A_PRE_FLAG) throws SQLException {

        logger.info("begin PRO_RUN_BJ_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_ADD" + "(:A_BJ_ID,:A_BJ_DESC,:A_BJ_TYPE,:A_BJ_UNIT,:A_BJ_REMARK," +
                    ":A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:A_PRE_FLAG,:RET_MSG,:RET)}");
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
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_UPDATE(String A_BJ_ID, String A_BJ_DESC, String A_BJ_TYPE, String A_BJ_UNIT, String A_BJ_REMARK,
                                     String A_PRE_FLAG) throws SQLException {

        logger.info("begin PRO_RUN_BJ_UPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_UPDATE" + "(:A_BJ_ID,:A_BJ_DESC,:A_BJ_TYPE,:A_BJ_UNIT,:A_BJ_REMARK," +
                    ":A_PRE_FLAG,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_BJ_DESC", A_BJ_DESC);
            cstmt.setString("A_BJ_TYPE", A_BJ_TYPE);
            cstmt.setString("A_BJ_UNIT", A_BJ_UNIT);
            cstmt.setString("A_BJ_REMARK", A_BJ_REMARK);

            cstmt.setString("A_PRE_FLAG", A_PRE_FLAG);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_DELETE(String A_BJ_ID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_DELETE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_DELETE" + "(:A_BJ_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_CYCLE_ABLE() throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_ABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ABLE(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_BJ_CYCLE_BASIC_ALL(String A_BJ_ID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_ALL(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_BJ_GETDESC(String A_BJ_ID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_GETDESC");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_GETDESC" + "(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getObject("RET");
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_CYCLE_BASIC_ADD(String A_BJ_ID, String A_CYCLE_ID, String A_CYCLE_VALUE) throws SQLException {

        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_ADD" + "(:A_BJ_ID,:A_CYCLE_ID,:A_CYCLE_VALUE,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("A_CYCLE_VALUE", A_CYCLE_VALUE);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_CYCLE_BASIC_DEL(String A_BJ_ID, String A_CYCLE_ID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_CYCLE_BASIC_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CYCLE_BASIC_DEL" + "(:A_BJ_ID,:A_CYCLE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_MAT_ALL(String A_BJ_ID) throws SQLException {

        logger.info("begin PRO_RUN_BJ_MAT_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_MAT_ALL(:A_BJ_ID,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_BJ_MAT_ADD(String A_BJ_ID, String A_MATERIALCODE, String A_MATERIALNAME, String A_MATERIALETALON, String A_UNIT, String A_PRICE) throws SQLException {

        logger.info("begin PRO_RUN_BJ_MAT_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_BJ_MAT_DEL(String A_BJ_ID, String A_MATERIALCODE) throws SQLException {

        logger.info("begin PRO_RUN_BJ_MAT_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_MAT_DEL" + "(:A_BJ_ID,:A_MATERIALCODE,:RET_MSG,:RET)}");
            cstmt.setString("A_BJ_ID", A_BJ_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap pg_run7134_getbjlist(String a_mat_no, String a_mat_desc) throws SQLException {

        logger.info("begin pg_run7134_getbjlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.getbjlist(:a_mat_no,:a_mat_desc,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);
            cstmt.setString("a_mat_desc", a_mat_desc);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_getbjlist");
        return result;
    }

    public HashMap PRO_RUN_SITE_ADD(String A_SITE_DESC, String A_EQUID, String A_REMARK, String A_USERNAME, String A_MEND_DEPART,
                                    String A_MEND_USERNAME, String A_MEND_USERNAMEID, String A_BJ_ID, String A_BJ_AMOUNT) throws SQLException {

        logger.info("begin PRO_RUN_SITE_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_ADD" + "(:A_SITE_DESC,:A_EQUID,:A_REMARK,:A_USERNAME,:A_MEND_DEPART," +
                    ":A_MEND_USERNAME,:A_MEND_USERNAMEID,:A_BJ_ID,:A_BJ_AMOUNT,:RET_MSG,:RET)}");
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
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_SITE_UPDATE(String A_SITE_ID, String A_SITE_DESC, String A_REMARK, String A_USERNAME, String A_MEND_DEPART,
                                       String A_MEND_USERNAME, String A_MEND_USERNAMEID, String A_BJ_ID, String A_BJ_AMOUNT) throws SQLException {

        logger.info("begin PRO_RUN_SITE_UPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_UPDATE" + "(:A_SITE_ID,:A_SITE_DESC,:A_REMARK,:A_USERNAME,:A_MEND_DEPART," +
                    ":A_MEND_USERNAME,:A_MEND_USERNAMEID,:A_BJ_ID,:A_BJ_AMOUNT,:RET_MSG,:RET)}");

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
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_SITE_ALL(String A_EQU_ID) throws SQLException {

        logger.info("begin PRO_RUN_SITE_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_ALL(:A_EQU_ID,:RET)}");
            cstmt.setString("A_EQU_ID", A_EQU_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_SITE_DELETE(String A_SITE_ID) throws SQLException {

        logger.info("begin PRO_RUN_SITE_DELETE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_DELETE" + "(:A_SITE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_SITE_ID", A_SITE_ID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_EQU_VGURL(String A_EQUID) throws SQLException {

        logger.info("begin PRO_RUN_EQU_VGURL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_VGURL" + "(:A_EQUID,:RET_URL)}");
            cstmt.setString("A_EQUID", A_EQUID);

            cstmt.registerOutParameter("RET_URL", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_URL = (String) cstmt.getObject("RET_URL");
            result.put("RET_URL", RET_URL);
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

    public HashMap PRO_RUN_CYCLE_ALL() throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ALL(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_CYCLE_ADD(String A_CYCLE_DESC, String A_CYCLE_UNIT) throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ADD" + "(:A_CYCLE_DESC,:A_CYCLE_UNIT,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_DESC", A_CYCLE_DESC);
            cstmt.setString("A_CYCLE_UNIT", A_CYCLE_UNIT);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_CYCLE_UPDATE(String A_CYCLE_ID, String A_CYCLE_DESC, String A_CYCLE_UNIT) throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_UPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_UPDATE" + "(:A_CYCLE_ID,:A_CYCLE_DESC,:A_CYCLE_UNIT,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("A_CYCLE_DESC", A_CYCLE_DESC);
            cstmt.setString("A_CYCLE_UNIT", A_CYCLE_UNIT);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_CYCLE_DELETE(String A_CYCLE_ID) throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_DELETE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_DELETE" + "(:A_CYCLE_ID,:RET_MSG,:RET)}");
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap pro_run7121_selectequlist(String v_departcode, String v_plantcode) throws SQLException {

        logger.info("begin pro_run7121_selectequlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_selectequlist(:v_departcode,:v_plantcode,:out_result)}");
            cstmt.setString("v_departcode", v_departcode);
            cstmt.setString("v_plantcode", v_plantcode);
            cstmt.registerOutParameter("out_result", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("out_result")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_selectequlist");
        return result;
    }

    public HashMap pro_run7121_getequlist(String V_EQU_ID) throws SQLException {

        logger.info("begin pro_run7121_getequlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_getequlist(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_getequlist");
        return result;
    }

    public HashMap pro_run7121_addequ(String V_EQU_ID, String V_EQU_DESC, String V_DEPARTCODE, String V_PLANTCODE, String V_USERID,
                                      String V_USERNAME, String V_STATUS, String V_PP_CODE) throws SQLException {

        logger.info("begin pro_run7121_addequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_addequ" + "(:V_EQU_ID,:V_EQU_DESC,:V_DEPARTCODE,:V_PLANTCODE,:V_USERID," +
                    ":V_USERNAME,:V_STATUS,:V_PP_CODE,:OUT_RESULT)}");

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
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_addequ");
        return result;
    }

    public HashMap pro_run7121_updateequ(String V_EQU_ID, String V_EQU_DESC, String V_USERID,
                                         String V_USERNAME, String V_STATUS, String V_PP_CODE) throws SQLException {

        logger.info("begin pro_run7121_updateequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_updateequ" + "(:V_EQU_ID,:V_EQU_DESC,:V_USERID," +
                    ":V_USERNAME,:V_STATUS,:V_PP_CODE,:OUT_RESULT)}");

            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_EQU_DESC", V_EQU_DESC);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.setString("V_PP_CODE", V_PP_CODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_updateequ");
        return result;
    }

    public HashMap pro_run7121_stop(String V_EQU_ID) throws SQLException {

        logger.info("begin pro_run7121_stop");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_stop" + "(:V_EQU_ID,:OUT_RESULT)}");

            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_stop");
        return result;
    }

    public HashMap pro_run7121_startequ(String V_EQU_ID) throws SQLException {

        logger.info("begin pro_run7121_startequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7121_startequ" + "(:V_EQU_ID,:OUT_RESULT)}");

            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7121_startequ");
        return result;
    }

    public HashMap pro_run7122_selectvglist(String V_VG_DESC) throws SQLException {

        logger.info("begin pro_run7122_selectvglist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7122_selectvglist(:V_VG_DESC,:OUT_RESULT)}");
            cstmt.setString("V_VG_DESC", V_VG_DESC);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7122_selectvglist");
        return result;
    }

    public HashMap pro_run7122_addvgurl(String V_VG_DESC, String V_URL) throws SQLException {

        logger.info("begin pro_run7122_addvgurl");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7122_addvgurl" + "(:V_VG_DESC,:V_URL,:OUT_RESULT)}");

            cstmt.setString("V_VG_DESC", V_VG_DESC);
            cstmt.setString("V_URL", V_URL);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7122_addvgurl");
        return result;
    }

    public HashMap pro_run7122_deletevgurl(String V_ID) throws SQLException {

        logger.info("begin pro_run7122_deletevgurl");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7122_deletevgurl" + "(:V_ID,:OUT_RESULT)}");

            cstmt.setString("V_ID", V_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7122_deletevgurl");
        return result;
    }

    public HashMap pro_run7123_selectstlist(String V_SITE_ID) throws SQLException {

        logger.info("begin pro_run7123_selectstlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7123_selectstlist(:V_SITE_ID,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7123_selectstlist");
        return result;
    }

    public HashMap pro_run7123_addst(String V_SITE_ID, String V_TAG_DESC, String V_TAG_UNIT,
                                     String V_STATUS) throws SQLException {

        logger.info("begin pro_run7123_addst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7123_addst" + "(:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT," +
                    ":V_STATUS,:OUT_RESULT)}");

            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_TAG_DESC", V_TAG_DESC);
            cstmt.setString("V_TAG_UNIT", V_TAG_UNIT);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7123_addst");
        return result;
    }

    public HashMap pro_run7123_updatest(String V_TAG_ID, String V_SITE_ID, String V_TAG_DESC, String V_TAG_UNIT,
                                        String V_STATUS) throws SQLException {

        logger.info("begin pro_run7123_updatest");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7123_updatest" + "(:V_TAG_ID,:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT," +
                    ":V_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_TAG_ID", V_TAG_ID);
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_TAG_DESC", V_TAG_DESC);
            cstmt.setString("V_TAG_UNIT", V_TAG_UNIT);
            cstmt.setString("V_STATUS", V_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7123_updatest");
        return result;
    }

    public HashMap pro_run7123_stopst(String V_TAG_ID) throws SQLException {

        logger.info("begin pro_run7123_stopst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7123_stopst" + "(:V_TAG_ID,:OUT_RESULT)}");
            cstmt.setString("V_TAG_ID", V_TAG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7123_stopst");
        return result;
    }

    public HashMap pro_run7123_startst(String V_TAG_ID) throws SQLException {

        logger.info("begin pro_run7123_startst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7123_startst" + "(:V_TAG_ID,:OUT_RESULT)}");
            cstmt.setString("V_TAG_ID", V_TAG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7123_startst");
        return result;
    }

    public HashMap pro_run7124_supplylist(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin pro_run7124_supplylist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_supplylist(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_STATUS,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_SUPPLY_NAME", V_SUPPLY_NAME);
            cstmt.setString("V_SUPPLY_STATUS", V_SUPPLY_STATUS);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_supplylist");
        return result;
    }

    public HashMap pro_run7124_addsupply(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_DESC, String V_SUPPLY_RENAGE, String V_SUPPLY_MANAGER,
                                         String V_LINK_PERSON, String V_LINK_TYPE, String V_LINK_PHONECODE, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin pro_run7124_addsupply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_addsupply" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER," +
                    ":V_LINK_PERSON,:V_LINK_TYPE,:V_LINK_PHONECODE,:V_SUPPLY_STATUS,:OUT_RESULT)}");
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
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_addsupply");
        return result;
    }

    public HashMap pro_run7124_updatesupply(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_DESC, String V_SUPPLY_RENAGE, String V_SUPPLY_MANAGER,
                                            String V_LINK_PERSON, String V_LINK_TYPE, String V_LINK_PHONECODE, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin pro_run7124_updatesupply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_updatesupply" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER," +
                    ":V_LINK_PERSON,:V_LINK_TYPE,:V_LINK_PHONECODE,:V_SUPPLY_STATUS,:OUT_RESULT)}");
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
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_updatesupply");
        return result;
    }

    public HashMap pro_run7124_supplymatlist(String V_SUPPLY_CODE) throws SQLException {

        logger.info("begin pro_run7124_supplymatlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_supplymatlist(:V_SUPPLY_CODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_supplymatlist");
        return result;
    }

    public HashMap pro_run7124_addsupplymat(String v_supply_code, String v_materialcode) throws SQLException {

        logger.info("begin pro_run7124_addsupplymat");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_addsupplymat" + "(:v_supply_code,:v_materialcode,:ret_msg,:ret)}");
            cstmt.setString("v_supply_code", v_supply_code);
            cstmt.setString("v_materialcode", v_materialcode);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret_msg", ret_msg);
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_addsupplymat");
        return result;
    }

    public HashMap pro_run7124_delsupplymat(String V_SUPPLY_CODE, String V_MATERIALCODE) throws SQLException {

        logger.info("begin pro_run7124_delsupplymat");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7124_delsupplymat" + "(:V_SUPPLY_CODE,:V_MATERIALCODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7124_delsupplymat");
        return result;
    }

    public HashMap pro_run7125_equvglist(String V_PLANTCODE, String V_DEPARTCODE) throws SQLException {

        logger.info("begin pro_run7125_equvglist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7125_equvglist(:V_PLANTCODE,:V_DEPARTCODE,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7125_equvglist");
        return result;
    }

    public HashMap pro_run7125_addequvg(String v_equ_id, String v_vg_id) throws SQLException {

        logger.info("begin pro_run7125_addequvg");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7125_addequvg(:v_equ_id,:v_vg_id,:ret_msg,:ret)}");
            cstmt.setString("v_equ_id", v_equ_id);
            cstmt.setString("v_vg_id", v_vg_id);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret_msg", ret_msg);
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7125_addequvg");
        return result;
    }

    public HashMap pro_run7125_delequvg(String V_EQU_ID, String V_VG_ID) throws SQLException {

        logger.info("begin pro_run7125_delequvg");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7125_delequvg(:V_EQU_ID,:V_VG_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7125_delequvg");
        return result;
    }

    public HashMap pro_run7126_sitevglist(String V_EQU_ID) throws SQLException {

        logger.info("begin pro_run7126_sitevglist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7126_sitevglist(:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7126_sitevglist");
        return result;
    }

    public HashMap pro_run7126_addsitevg(String v_site_id, String v_vg_id) throws SQLException {

        logger.info("begin pro_run7126_addsitevg");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7126_addsitevg(:v_site_id,:v_vg_id,:ret_msg,:ret)}");
            cstmt.setString("v_site_id", v_site_id);
            cstmt.setString("v_vg_id", v_vg_id);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret_msg", ret_msg);
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7126_addsitevg");
        return result;
    }

    public HashMap pro_run7126_delsitevg(String V_SITE_ID, String V_VG_ID) throws SQLException {

        logger.info("begin pro_run7126_delsitevg");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7126_delsitevg(:V_SITE_ID,:V_VG_ID,:OUT_RESULT)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.VARCHAR);
            cstmt.execute();
            String OUT_RESULT = (String) cstmt.getObject("OUT_RESULT");
            result.put("OUT_RESULT", OUT_RESULT);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7126_delsitevg");
        return result;
    }

    public HashMap pg_run7134_GETBJLIST(String a_mat_no, String a_mat_desc) throws SQLException {

        logger.info("begin pg_run7134_GETBJLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.getbjlist(:a_mat_no,:a_mat_desc,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);
            cstmt.setString("a_mat_desc", a_mat_desc);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_GETBJLIST");
        return result;
    }

    public HashMap pg_run7134_getsitelist(String a_mat_no) throws SQLException {

        logger.info("begin pg_run7134_getsitelist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.getsitelist(:a_mat_no,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_getsitelist");
        return result;
    }

    public HashMap pg_run7134_getmatlist(String a_mat_no, String a_mat_desc) throws SQLException {

        logger.info("begin pg_run7134_getmatlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.getmatlist(:a_mat_no,:a_mat_desc,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);
            cstmt.setString("a_mat_desc", a_mat_desc);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_getmatlist");
        return result;
    }

    public HashMap pg_run7134_addbj(String a_mat_no, String a_mat_desc, String a_etalon, String a_unit, String a_price) throws SQLException {

        logger.info("begin pg_run7134_addbj");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.addbj" + "(:a_mat_no,:a_mat_desc,:a_etalon,:a_unit,:a_price," +
                    ":ret_msg,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);
            cstmt.setString("a_mat_desc", a_mat_desc);
            cstmt.setString("a_etalon", a_etalon);
            cstmt.setString("a_unit", a_unit);
            cstmt.setString("a_price", a_price);

            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret_msg = (String) cstmt.getObject("ret_msg");
            String ret = (String) cstmt.getObject("ret");
            result.put("ret_msg", ret_msg);
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_addbj");
        return result;
    }

    public HashMap pg_run7134_deletebj(String a_mat_no) throws SQLException {

        logger.info("begin pg_run7134_deletebj");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7134.deletebj" + "(:a_mat_no," +
                    ":ret_msg,:ret)}");
            cstmt.setString("a_mat_no", a_mat_no);

            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret_msg = (String) cstmt.getObject("ret_msg");
            String ret = (String) cstmt.getObject("ret");
            result.put("ret_msg", ret_msg);
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pg_run7134_deletebj");
        return result;
    }

    public HashMap PRO_RUN_YEILD_SELECT_MANAGE(String A_EQUID, java.sql.Date A_WORKDATE, String A_CYCLE_ID) throws SQLException {

        logger.info("begin PRO_RUN_YEILD_SELECT_MANAGE");
        java.sql.Date sql_A_WORKDATE = new java.sql.Date(A_WORKDATE.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_SELECT_MANAGE(:A_EQUID,:A_WORKDATE,:A_CYCLE_ID,:ret)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setDate("A_WORKDATE", sql_A_WORKDATE);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap PRO_RUN_YEILD_INPUT(String A_EQU_ID, String A_CYCLE_ID, Date A_WORKDATE, String A_INSERTVALUE, String A_INSRTPERSON) throws SQLException {

        logger.info("begin PRO_RUN_YEILD_INPUT");
        java.sql.Date sql_A_WORKDATE = new java.sql.Date(A_WORKDATE.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_INPUT" + "(:A_EQU_ID,:A_CYCLE_ID,:A_WORKDATE,:A_INSERTVALUE,:A_INSRTPERSON," +
                    ":RET_MSG,:RET)}");
            cstmt.setString("A_EQU_ID", A_EQU_ID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setDate("A_BJ_TYPE", sql_A_WORKDATE);
            cstmt.setString("A_INSERTVALUE", A_INSERTVALUE);
            cstmt.setString("A_INSRTPERSON", A_INSRTPERSON);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap PRO_RUN_TEILD_DELETE(String A_ID) throws SQLException {

        logger.info("begin PRO_RUN_TEILD_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_TEILD_DELETE" + "(:A_ID," +
                    ":RET_MSG,:RET)}");
            cstmt.setString("A_ID", A_ID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET_MSG = (String) cstmt.getObject("RET_MSG");
            String RET = (String) cstmt.getObject("RET");
            result.put("RET_MSG", RET_MSG);
            result.put("RET", RET);
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

    public HashMap pro_run7111_taglist(String pid) throws SQLException {

        logger.info("begin pro_run7111_taglist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7111_taglist(:pid,:V_CURSOR)}");
            cstmt.setString("pid", pid);
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
        logger.info("end pro_run7111_taglist");
        return result;
    }

    public HashMap pro_run7111_equlist(String v_v_plantcode, String v_v_deptcode) throws SQLException {

        logger.info("begin pro_run7111_equlist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7111_equlist(:v_v_plantcode,:v_v_deptcode,:V_CURSOR)}");
            cstmt.setString("v_v_plantcode", v_v_plantcode);
            cstmt.setString("v_v_deptcode", v_v_deptcode);
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
        logger.info("end pro_run7111_equlist");
        return result;
    }

    public HashMap pro_run7111_usebjlist(String v_v_equcode) throws SQLException {

        logger.info("begin pro_run7111_usebjlist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7111_usebjlist(:v_v_equcode,:V_CURSOR)}");
            cstmt.setString("v_v_equcode", v_v_equcode);
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
        logger.info("end pro_run7111_usebjlist");
        return result;
    }

    public List<Map> pro_run7111_addlog(String v_v_bjcode, Date v_v_checktime, String v_v_checkcount, InputStream v_v_file, String v_v_filename,
                                        String v_v_usercode, String v_v_username, String v_v_tagid, String v_v_siteid, String v_v_tagvalue) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        java.sql.Date sql_v_v_checktime = new java.sql.Date(v_v_checktime.getTime());
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_run7111_addlog" + "(:v_v_bjcode,:v_v_checktime,:v_v_checkcount,:v_v_file,:v_v_filename," +
                    ":v_v_usercode,:v_v_username,:v_v_tagid,:v_v_siteid,:v_v_tagvalue,:ret_msg,:ret)}");

            cstmt.setString("v_v_bjcode", v_v_bjcode);
            cstmt.setDate("v_v_checktime", sql_v_v_checktime);
            cstmt.setString("v_v_checkcount", v_v_checkcount);
            cstmt.setBinaryStream("v_v_file", v_v_file);
            cstmt.setString("v_v_filename", v_v_filename);

            cstmt.setString("v_v_usercode", v_v_usercode);
            cstmt.setString("v_v_username", v_v_username);
            cstmt.setString("v_v_tagid", v_v_tagid);
            cstmt.setString("v_v_siteid", v_v_siteid);
            cstmt.setString("v_v_tagvalue", v_v_tagvalue);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("ret");
            Map sledata = new HashMap();
            sledata.put("ret", sss);
            result.add(sledata);
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

    public HashMap PRO_RUN_SITE_BJ_ALL(String IN_EQUID, String IN_PLANT, String IN_DEPART, String IN_STATUS, String IN_BJCODE, String IN_BJDESC) throws SQLException {

        logger.info("begin PRO_RUN_SITE_BJ_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_ALL(:IN_EQUID,:IN_PLANT,:IN_DEPART,:IN_STATUS,:IN_BJCODE,:IN_BJDESC,:RET)}");
            cstmt.setString("IN_EQUID", IN_EQUID);
            cstmt.setString("IN_PLANT", IN_PLANT);
            cstmt.setString("IN_DEPART", IN_DEPART);
            cstmt.setString("IN_STATUS", IN_STATUS);
            cstmt.setString("IN_BJCODE", IN_BJCODE);
            cstmt.setString("IN_BJDESC", IN_BJDESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
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

    public HashMap pro_run7110_sitesupplylist(String a_id, String a_materialcode, String a_orderid) throws SQLException {

        logger.info("begin pro_run7110_sitesupplylist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7110_sitesupplylist(:a_id,:a_materialcode,:a_orderid,:ret)}");
            cstmt.setString("a_id", a_id);
            cstmt.setString("a_materialcode", a_materialcode);
            cstmt.setString("a_orderid", a_orderid);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7110_sitesupplylist");
        return result;
    }

    public HashMap pro_run7113_ordermatlist(String v_dept_code, String v_equip_code, String v_materialcode, String v_materialname) throws SQLException {

        logger.info("begin pro_run7113_ordermatlist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_ordermatlist(:v_dept_code,:v_equip_code,:v_materialcode,:v_materialname,:out_cursor)}");
            cstmt.setString("v_dept_code", v_dept_code);
            cstmt.setString("v_equip_code", v_equip_code);
            cstmt.setString("v_materialcode", v_materialcode);
            cstmt.setString("v_materialname", v_materialname);
            cstmt.registerOutParameter("out_cursor", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("out_cursor")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_ordermatlist");
        return result;
    }

    public HashMap pro_run7113_ordermatlistq(String V_DEPT_CODE, String V_EQUIP_CODE, String V_MATERIALCODE, String V_MATERIALNAME) throws SQLException {

        logger.info("begin pro_run7113_ordermatlistq");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_ordermatlistq(:V_DEPT_CODE,:V_EQUIP_CODE,:V_MATERIALCODE,:V_MATERIALNAME,:OUT_CURSOR)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
            cstmt.setString("V_EQUIP_CODE", V_EQUIP_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.registerOutParameter("OUT_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("OUT_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_ordermatlistq");
        return result;
    }

    public HashMap pro_run7114_equlist(String V_V_DEPARTCODE, String V_V_PLANTCODE) throws SQLException {

        logger.info("begin pro_run7114_equlist");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7114_equlist(:V_V_DEPARTCODE,:V_V_PLANTCODE,:OUT_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end pro_run7114_equlist");
        return result;
    }

    public HashMap pg_run7113_getordermatbarcode(String a_orderid, String a_materialcode) throws SQLException {

        logger.info("begin pg_run7113_getordermatbarcode");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7113.getordermatbarcode(:a_orderid,:a_materialcode,:ret)}");
            cstmt.setString("a_orderid", a_orderid);
            cstmt.setString("a_materialcode", a_materialcode);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
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

    public HashMap pro_run7113_changeordermat(String A_ID, String SITE_ID, String a_change_amount, String V_EQUIP_NO, String USERID,
                                              String USERNAME, String PLANTCODE, String WORKAREA, Date CHANGEDATE, String V_MATERIALCODE,
                                              String a_supplycode, String a_supplyname, String a_uniquecode, Date a_replacedate, String a_faultreason,
                                              String A_REASON_REMARK) throws SQLException {

        logger.info("begin pro_run7113_changeordermat");
        java.sql.Date sql_CHANGEDATE = new java.sql.Date(CHANGEDATE.getTime());
        java.sql.Date sql_a_replacedate = new java.sql.Date(a_replacedate.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_changeordermat" + "(:A_ID,:SITE_ID,:a_change_amount,:V_EQUIP_NO,:USERID," +
                    ":USERNAME,:PLANTCODE,:WORKAREA,:CHANGEDATE,:V_MATERIALCODE," +
                    ":a_supplycode,:a_supplyname,:a_uniquecode,:a_replacedate,:a_faultreason,:A_REASON_REMARK,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("SITE_ID", SITE_ID);
            cstmt.setString("a_change_amount", a_change_amount);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("USERID", USERID);

            cstmt.setString("USERNAME", USERNAME);
            cstmt.setString("PLANTCODE", PLANTCODE);
            cstmt.setString("WORKAREA", WORKAREA);
            cstmt.setDate("CHANGEDATE", sql_CHANGEDATE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);

            cstmt.setString("a_supplycode", a_supplycode);
            cstmt.setString("a_supplyname", a_supplyname);
            cstmt.setString("a_uniquecode", a_uniquecode);
            cstmt.setDate("a_replacedate", sql_a_replacedate);
            cstmt.setString("a_faultreason", a_faultreason);

            cstmt.setString("A_REASON_REMARK", A_REASON_REMARK);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getObject("RET");
            result.put("RET", RET);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_changeordermat");
        return result;
    }

    public HashMap pro_run7113_changecancel(String V_I_ID, String SITE_ID, String V_EQUIP_NO, String USERID, String USERNAME,
                                            String PLANTCODE, String V_DEPARTCODE, Date CHANGEDATE) throws SQLException {

        logger.info("begin pro_run7113_changecancel");
        java.sql.Date sql_CHANGEDATE = new java.sql.Date(CHANGEDATE.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_changecancel" + "(:V_I_ID,:SITE_ID,:V_EQUIP_NO,:USERID,:USERNAME," +
                    ":PLANTCODE,:V_DEPARTCODE,:V_CHANGETIME,:RET)}");

            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_SITE_ID", SITE_ID);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("V_USERID", USERID);
            cstmt.setString("V_USERNAME", USERNAME);

            cstmt.setString("V_PLANTCODE", PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setDate("V_CHANGETIME", sql_CHANGEDATE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getObject("RET");
            result.put("RET", RET);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_changecancel");
        return result;
    }


    public List<Map> PRO_PM_WORKORDER_ET_SET_NEW(Double V_I_ID, String V_V_ORDERGUID, String V_V_DESCRIPTION,
                                                 String V_I_WORK_ACTIVITY, String V_I_DURATION_NORMAL, String V_V_WORK_CENTER,
                                                 String V_I_ACTUAL_TIME, String V_I_NUMBER_OF_PEOPLE, String V_V_ID, String V_V_GUID,
                                                 String V_V_JXBZ, String V_V_JXBZ_VALUE_DOWN, String V_V_JXBZ_VALUE_UP) throws SQLException {
//        logger.info("begin SG_INF_DATA_ITEM_SAVE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_SET_NEW" + "(:V_I_ID,:V_V_ORDERGUID,:V_V_DESCRIPTION," +
                    ":V_I_WORK_ACTIVITY,:V_I_DURATION_NORMAL,:V_V_WORK_CENTER,:V_I_ACTUAL_TIME,:V_I_NUMBER_OF_PEOPLE," +
                    ":V_V_ID,:V_V_GUID,:V_V_JXBZ,:V_V_JXBZ_VALUE_DOWN,:V_V_JXBZ_VALUE_UP)}");


            cstmt.setDouble("V_I_ID", V_I_ID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_DESCRIPTION", V_V_DESCRIPTION);
            cstmt.setString("V_I_WORK_ACTIVITY", V_I_WORK_ACTIVITY);
            cstmt.setString("V_I_DURATION_NORMAL", V_I_DURATION_NORMAL);
            cstmt.setString("V_V_WORK_CENTER", V_V_WORK_CENTER);
            cstmt.setString("V_I_ACTUAL_TIME", V_I_ACTUAL_TIME);
            cstmt.setString("V_I_NUMBER_OF_PEOPLE", V_I_NUMBER_OF_PEOPLE);
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_JXBZ", V_V_JXBZ);
            cstmt.setString("V_V_JXBZ_VALUE_DOWN", V_V_JXBZ_VALUE_DOWN);
            cstmt.setString("V_V_JXBZ_VALUE_UP", V_V_JXBZ_VALUE_UP);
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
        logger.info("end PRO_PM_WORKORDER_ET_SET_NEW");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_ET_ID_DEL(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_ID_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_ID_DEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);

            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_CURSOR = (String) cstmt.getObject("V_CURSOR");
            result.put("V_CURSOR", V_CURSOR);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_ET_ID_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SPARE_ID_DEL(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SPARE_ID_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_ID_DEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);

            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_CURSOR = (String) cstmt.getObject("V_CURSOR");
            result.put("V_CURSOR", V_CURSOR);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SPARE_ID_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_ET_ID_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_ID_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_ID_VIEW(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_WORKORDER_ET_ID_VIEW");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_YS_WXC(String V_V_PERCODE, String V_V_PERNAME, String V_V_ORDERGUID, String V_V_POSTMANSIGN,
                                           String V_V_CHECKMANCONTENT, String V_V_CHECKMANSIGN, String V_V_WORKSHOPCONTENT,
                                           String V_V_WORKSHOPSIGN, String V_V_DEPTSIGN, String V_V_EQUIP_NO) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_YS_WXC");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YS_WXC(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_POSTMANSIGN,:V_V_CHECKMANCONTENT,:V_V_CHECKMANSIGN,:V_V_WORKSHOPCONTENT,:V_V_WORKSHOPSIGN,:V_V_DEPTSIGN,:V_V_EQUIP_NO,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_POSTMANSIGN", V_V_POSTMANSIGN);
            cstmt.setString("V_V_CHECKMANCONTENT", V_V_CHECKMANCONTENT);
            cstmt.setString("V_V_CHECKMANSIGN", V_V_CHECKMANSIGN);
            cstmt.setString("V_V_WORKSHOPCONTENT", V_V_WORKSHOPCONTENT);
            cstmt.setString("V_V_WORKSHOPSIGN", V_V_WORKSHOPSIGN);
            cstmt.setString("V_V_DEPTSIGN", V_V_DEPTSIGN);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YS_WXC");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_NOPAGE(String V_V_STATECODE, String X_PERSONCODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_NOPAGE");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_NOPAGE(:V_V_STATECODE,:X_PERSONCODE,:V_V_SNUM)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("total", sunm);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_VIEW_NOPAGE");
        return result;
    }

    public HashMap PRO_PM_PLAN_LOCKING_DATE_VIEW(String V_I_YEAR, String V_I_MONTH, String V_I_WEEKNUM, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_V_CONTENT) throws SQLException {

        logger.info("begin PRO_PM_PLAN_LOCKING_DATE_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_DATE_VIEW(:V_I_YEAR,:V_I_MONTH,:V_I_WEEKNUM,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_CONTENT,:V_CURSOR)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_I_WEEKNUM", V_I_WEEKNUM);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);

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
        logger.info("end PRO_PM_PLAN_LOCKING_DATE_VIEW");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SEL(String V_V_WEEK_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SEL(:V_V_WEEK_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_WEEK_GUID", V_V_WEEK_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SEL");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SET(String V_V_DEFECT_GUID, String V_V_WEEK_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SET" + "(:V_V_DEFECT_GUID,:V_V_WEEK_GUID,:V_INFO)}");

            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_WEEK_GUID", V_V_WEEK_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_WEEK_SET_GUID(String V_V_GUID, String V_V_ORGCODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_SET_GUID");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SET_GUID" + "(:V_V_GUID,:V_V_ORGCODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

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
        logger.info("end PRO_PM_03_PLAN_WEEK_SET_GUID");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_WEEK_DEFECT_DEL() throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_DEFECT_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_DEFECT_DEL" + "(:V_INFO)}");


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
        logger.info("end PRO_PM_03_PLAN_WEEK_DEFECT_DEL");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_DEL(String V_V_WEEK_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_DEL" + "(:V_V_WEEK_GUID,:V_INFO)}");

            cstmt.setString("V_V_WEEK_GUID", V_V_WEEK_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_DEL");
        return result;
    }

    public HashMap PRO_PM_DEFECT_LOG_SET(String V_V_GUID, String V_V_LOGREMARK, String V_V_FINISHCODE, String V_V_KEY) throws SQLException {

        logger.info("begin PRO_PM_DEFECT_LOG_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_LOG_SET" + "(:V_V_GUID,:V_V_LOGREMARK,:V_V_FINISHCODE,:V_V_KEY,:V_CURSOR)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_LOGREMARK", V_V_LOGREMARK);
            cstmt.setString("V_V_FINISHCODE", V_V_FINISHCODE);
            cstmt.setString("V_V_KEY", V_V_KEY);

            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_LOG_SET");
        return result;
    }

    public HashMap PRO_PM_DEFECT_STATE_SET(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_DEFECT_STATE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_STATE_SET" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);

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
        logger.info("end PRO_PM_DEFECT_STATE_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_WEEK_SET_STATE(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_SET_STATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SET_STATE" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);

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
        logger.info("end PRO_PM_03_PLAN_WEEK_SET_STATE");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SET_W(String V_V_WORKORDER_GUID, String V_V_WEEK_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SET_W");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SET_W" + "(:V_V_WORKORDER_GUID,:V_V_WEEK_GUID,:V_INFO)}");

            cstmt.setString("V_V_WORKORDER_GUID", V_V_WORKORDER_GUID);
            cstmt.setString("V_V_WEEK_GUID", V_V_WEEK_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SET_W");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SET_F(String V_V_WORKORDER_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SET_F");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SET_F" + "(:V_V_WORKORDER_GUID,:V_INFO)}");

            cstmt.setString("V_V_WORKORDER_GUID", V_V_WORKORDER_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SET_F");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SELBYWORK(String V_V_WORKORDER_GUID, String V_V_FLAG) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SELBYWORK");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SELBYWORK(:V_V_WORKORDER_GUID,:V_V_FLAG,:V_CURSOR)}");
            cstmt.setString("V_V_WORKORDER_GUID", V_V_WORKORDER_GUID);
            cstmt.setString("V_V_FLAG", V_V_FLAG);

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
        logger.info("end PM_DEFECTTOWORKORDER_SELBYWORK");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SET_WD(String V_V_DEFECT_GUID, String V_V_WORKORDER_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SET_WD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SET_WD" + "(:V_V_DEFECT_GUID,:V_V_WORKORDER_GUID,:V_INFO)}");

            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_WORKORDER_GUID", V_V_WORKORDER_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SET_WD");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_DELBYWORK(String V_V_WORKORDER_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_DELBYWORK");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_DELBYWORK" + "(:V_V_WORKORDER_GUID,:V_INFO)}");

            cstmt.setString("V_V_WORKORDER_GUID", V_V_WORKORDER_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_DELBYWORK");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_DEFECT_NC(String V_V_ORGCODE, String V_V_PERNAME, String V_DEFECT_GUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_DEFECT_NC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DEFECT_NC(:V_V_ORGCODE,:V_V_PERNAME,:V_DEFECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);

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
        logger.info("end PRO_PM_WORKORDER_DEFECT_NC");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_DEFECT_PRO(String V_V_ORGCODE, String V_V_PERNAME, String V_DEFECT_GUID, String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_DEFECT_PRO");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DEFECT_PRO(:V_V_ORGCODE,:V_V_PERNAME,:V_DEFECT_GUID,:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PRO_PM_WORKORDER_DEFECT_PRO");
        return result;
    }

    public HashMap PM_03_PLAN_PORJECT_WORKORDER(String V_V_PROJECT_CODE, String V_V_WEEK_GUID, String V_V_ORGCODE, String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_03_PLAN_PORJECT_WORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PORJECT_WORKORDER(:V_V_PROJECT_CODE,:V_V_WEEK_GUID,:V_V_ORGCODE,:V_V_PERCODE,:V_INFO,:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_WEEK_GUID", V_V_WEEK_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);


            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_SOURCECODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

            String V_V_SOURCECODE = (String) cstmt.getObject("V_V_SOURCECODE");
            result.put("V_V_SOURCECODE", V_V_SOURCECODE);

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_PORJECT_WORKORDER");
        return result;
    }

    public Map PRO_PM_03_PLAN_WEEK_NSET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_WEEK,
                                        String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                        String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE,
                                        String V_V_JHMX_GUID, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER
                                        ,String V_V_PDC/*,String V_V_SGDATE*/,String V_V_GYYQ,String V_V_CHANGPDC,/*String V_V_JXRESON,*/String V_V_JXHOUR,String V_V_JJHOUR,
                                         /*String V_V_JHHOUR,*/String V_V_TELNAME,String V_V_TELNUMB,String V_V_PDGG,String V_V_THICKNESS,String V_V_REASON,String V_V_EVERTIME
            ,String V_V_FLAG,String V_V_RDEPATCODE,String V_V_RDEPATNAME,String V_V_SGWAY,String V_V_SGWAYNAME
    ) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_NSET");
        Map result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_NSET" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_OTHERPLAN_GUID,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER,"+
                    ":V_V_PDC,/*:V_V_SGDATE,*/:V_V_GYYQ,:V_V_CHANGPDC,/*:V_V_JXRESON,*/:V_V_JXHOUR,:V_V_JJHOUR,/*:V_V_JHHOUR,*/:V_V_TELNAME,:V_V_TELNUMB,:V_V_PDGG,"+
                    ":V_V_THICKNESS,:V_V_REASON,:V_V_EVERTIME,:V_V_FLAG,:V_V_RDEPATCODE,:V_V_RDEPATNAME,:V_V_SGWAY,:V_V_SGWAYNAME,:V_INFO)}");
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

            //--update 2018-0910
            cstmt.setString("V_V_PDC", V_V_PDC);
//            cstmt.setString("V_V_SGDATE", V_V_SGDATE);
            cstmt.setString("V_V_GYYQ", V_V_GYYQ);
            cstmt.setString("V_V_CHANGPDC", V_V_CHANGPDC);
//            cstmt.setString("V_V_JXRESON", V_V_JXRESON);
            cstmt.setString("V_V_JXHOUR", V_V_JXHOUR);
            cstmt.setString("V_V_JJHOUR", V_V_JJHOUR);
//            cstmt.setString("V_V_JHHOUR", V_V_JHHOUR);
            cstmt.setString("V_V_TELNAME", V_V_TELNAME);
            cstmt.setString("V_V_TELNUMB", V_V_TELNUMB);
            cstmt.setString("V_V_PDGG", V_V_PDGG);

            //--end upate
            //---add 2018-10-26
            cstmt.setString("V_V_THICKNESS",V_V_THICKNESS);
            cstmt.setString("V_V_REASON",V_V_REASON);
            cstmt.setString("V_V_EVERTIME",V_V_EVERTIME);
            //--end add
            //20181113
            cstmt.setString("V_V_FLAG",V_V_FLAG);
            cstmt.setString("V_V_RDEPATCODE",V_V_RDEPATCODE);
            cstmt.setString("V_V_RDEPATNAME",V_V_RDEPATNAME);
            cstmt.setString("V_V_SGWAY",V_V_SGWAY);
            cstmt.setString("V_V_SGWAYNAME",V_V_SGWAYNAME);
           // end
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
        logger.info("end PRO_PM_03_PLAN_WEEK_NSET");
        return result;
    }

    public HashMap PRO_SAP_EQU_VIEW_SEL(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE,
                                        String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_EQUNAME) throws SQLException {

        logger.info("begin PRO_SAP_EQU_VIEW_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE," +
                    ":V_V_EQUCODE,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_SAP_EQU_VIEW_SEL");
        return result;
    }

    public Map login(String userName, String UserPassword, String userIp,String V_OSNAME,String V_BROWN,String V_LOCALHOST,String V_SS) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_LOGIN_NEW");
        logger.debug("params:userName:" + userName + "params:userIp:" + userIp);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_LOGIN_NEW(:V_V_LOGINNAME,:V_V_PASSWORD,:V_V_IP,:V_OSNAME,:V_BROWN,:V_LOCALHOST,:V_SS,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME", userName);
            cstmt.setString("V_V_PASSWORD", UserPassword);
            cstmt.setString("V_V_IP", userIp);
            cstmt.setString("V_OSNAME", V_OSNAME);
            cstmt.setString("V_BROWN", V_BROWN);
            cstmt.setString("V_LOCALHOST", V_LOCALHOST);
            cstmt.setString("V_SS", V_SS);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);


            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_LOGIN_NEW");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_GENERATE_N(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE,
                                                 String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_STIME, String V_V_ETIME,
                                                 String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_GENERATE_N");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_GENERATE_N" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE,:V_V_EQUTYPE,:V_V_EQUCODE," +
                    ":V_V_STIME,:V_V_ETIME," +
                    ":V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_GENERATE_N");
        return result;
    }

    public HashMap PM_06_DJ_DATA_SEL_BYSTATE(String V_V_GUID, String V_V_STIME, String V_V_ETIME) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_SEL_BYSTATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_SEL_BYSTATE" + "(:V_V_GUID,:V_V_STIME,:V_V_ETIME,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
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
        logger.info("end PM_06_DJ_DATA_SEL_BYSTATE");
        return result;
    }

    public HashMap PM_06_DJ_DATA_SEL_BYSTATE_NUM(String V_V_GUID, String V_V_STIME, String V_V_ETIME) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_SEL_BYSTATE_NUM");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_SEL_BYSTATE_NUM" + "(:V_V_GUID,:V_V_STIME,:V_V_ETIME,:V_ZCNUM,:V_YCNUM)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
            cstmt.registerOutParameter("V_ZCNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_YCNUM", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_ZCNUM", (String) cstmt.getObject("V_ZCNUM"));
            result.put("V_YCNUM", (String) cstmt.getObject("V_YCNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_DATA_SEL_BYSTATE_NUM");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_BYDEPT(String V_V_ORGCODE, String V_V_CK_EQUTYPECODE,
                                             String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_STIME, String V_V_ETIME,
                                             String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_BYDEPT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_BYDEPT" + "(:V_V_ORGCODE,:V_V_CK_EQUTYPECODE,:V_V_EQUTYPE,:V_V_EQUCODE," +
                    ":V_V_STIME,:V_V_ETIME," +
                    ":V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_BYDEPT");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_BYROLE(String V_V_STATECODE,
                                            String X_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_BYROLE");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_BYROLE(:V_V_STATECODE,:X_PERSONCODE,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_VIEW_BYROLE");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_BYROLE2(String V_V_STATECODE,
                                            String X_PERSONCODE,String PUT_PERNAME, String V_V_PAGE, String V_V_PAGESIZE,String V_SIGN) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_BYROLE2");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_BYROLE2(:V_V_STATECODE,:X_PERSONCODE,:PUT_PERNAME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_SIGN,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.setString("PUT_PERNAME",PUT_PERNAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.setString("V_SIGN",V_SIGN);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_VIEW_BYROLE2");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_VIEW(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT,  String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
                    ":V_V_CONTENT,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_WXLX", V_V_WXLX);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW");
        return result;
    }

    //---Excel export 2018-09-15  PRO_PM_03_PLAN_YEAR_VIEWALL
    public HashMap PRO_PM_03_PLAN_YEAR_VIEWALL(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEWALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEWALL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
                    ":V_V_CONTENT,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_WXLX", V_V_WXLX);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEWALL");
        return result;
    }

    //--end  up

    public HashMap PM_DEFECTTOWORKORDER_SELBYPRO(String V_V_PROJECT_GUID, String V_V_FLAG, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SELBYPRO");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SELBYPRO(:V_V_PROJECT_GUID,:V_V_FLAG,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");

            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECTTOWORKORDER_SELBYPRO");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_SET_PD(String V_V_DEFECT_GUID, String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_SET_PD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SET_PD" + "(:V_V_DEFECT_GUID,:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_SET_PD");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_DELBYPRO(String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_DELBYPRO");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_DELBYPRO" + "(:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_DELBYPRO");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_SEL(String V_V_PROJECT_GUID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_SEL(:V_V_PROJECT_GUID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PROJECT_DX_MX_SEL");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_SET(String V_V_MX_GUID, String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_SET" + "(:V_V_MX_GUID,:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_MX_GUID", V_V_MX_GUID);
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_PROJECT_DX_MX_SET");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_DEL(String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_DEL" + "(:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_PROJECT_DX_MX_DEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_SET_NEW(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID, String V_V_DEPTCODE, String V_V_DEPTNAME, String V_V_PROJECTNAME, String V_V_PLANDATE, String V_V_SPECIALTY, String V_V_SPECIALTYNAME, String V_V_SPECIALTYMANCODE
            , String V_V_SPECIALTYMAN, Double V_F_MONEYUP, Double V_F_MONEYBUDGET, String V_V_REPAIRDEPTTYPE, String V_V_REPAIRDEPTCODE, String V_V_REPAIRDEPT, String V_V_DEFECT, String V_V_MEASURE, String V_I_RUSHTO, String V_V_PROJECTCODE_GS, String V_V_REPAIRDEPT_GS,
                                                String V_F_MONEY_GS, String V_D_INDATE_GS, String V_I_YEAR_PLAN, String V_I_MONTH_PLAN, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_SPR) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_SET_NEW" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_DEPTCODE," +
                    ":V_V_DEPTNAME,:V_V_PROJECTNAME,:V_V_PLANDATE,:V_V_SPECIALTY,:V_V_SPECIALTYNAME," +
                    ":V_V_SPECIALTYMANCODE,:V_V_SPECIALTYMAN,:V_F_MONEYUP,:V_F_MONEYBUDGET,:V_V_REPAIRDEPTTYPE," +
                    ":V_V_REPAIRDEPTCODE,:V_V_REPAIRDEPT,:V_V_DEFECT,:V_V_MEASURE,:V_I_RUSHTO," +
                    ":V_V_PROJECTCODE_GS,:V_V_REPAIRDEPT_GS,:V_F_MONEY_GS,:V_D_INDATE_GS,:V_I_YEAR_PLAN," +
                    ":V_I_MONTH_PLAN,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_SPR,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_PROJECTNAME", V_V_PROJECTNAME);
            cstmt.setString("V_V_PLANDATE", V_V_PLANDATE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_SPECIALTYNAME", V_V_SPECIALTYNAME);
            cstmt.setString("V_V_SPECIALTYMANCODE", V_V_SPECIALTYMANCODE);
            cstmt.setString("V_V_SPECIALTYMAN", V_V_SPECIALTYMAN);
            cstmt.setDouble("V_F_MONEYUP", V_F_MONEYUP);
            cstmt.setDouble("V_F_MONEYBUDGET", V_F_MONEYBUDGET);
            cstmt.setString("V_V_REPAIRDEPTTYPE", V_V_REPAIRDEPTTYPE);
            cstmt.setString("V_V_REPAIRDEPTCODE", V_V_REPAIRDEPTCODE);
            cstmt.setString("V_V_REPAIRDEPT", V_V_REPAIRDEPT);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_MEASURE", V_V_MEASURE);
            cstmt.setString("V_I_RUSHTO", V_I_RUSHTO);
            cstmt.setString("V_V_PROJECTCODE_GS", V_V_PROJECTCODE_GS);
            cstmt.setString("V_V_REPAIRDEPT_GS", V_V_REPAIRDEPT_GS);
            cstmt.setString("V_F_MONEY_GS", V_F_MONEY_GS);
            cstmt.setString("V_D_INDATE_GS", V_D_INDATE_GS);
            cstmt.setString("V_I_YEAR_PLAN", V_I_YEAR_PLAN);
            cstmt.setString("V_I_MONTH_PLAN", V_I_MONTH_PLAN);

            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SPR", V_V_SPR);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_SET_NEW");
        return result;
    }

    public HashMap PM_DEFECTTOWORKORDER_DELBYPD(String V_V_DEFECT_GUID, String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWORKORDER_DELBYPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_DELBYPD" + "(:V_V_DEFECT_GUID,:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_DEFECTTOWORKORDER_DELBYPD");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_DEL_BYPM(String V_V_MX_GUID, String V_V_PROJECT_GUID) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_DEL_BYPM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_DEL_BYPM" + "(:V_V_MX_GUID,:V_V_PROJECT_GUID,:V_INFO)}");

            cstmt.setString("V_V_MX_GUID", V_V_MX_GUID);
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

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
        logger.info("end PM_PROJECT_DX_MX_DEL_BYPM");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_RG_SEL(String V_V_PROJECT_GUID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_RG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_RG_SEL(:V_V_PROJECT_GUID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PROJECT_DX_MX_RG_SEL");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_JJ_SEL(String V_V_PROJECT_GUID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_JJ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_JJ_SEL(:V_V_PROJECT_GUID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PROJECT_DX_MX_JJ_SEL");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_BJ_SEL(String V_V_PROJECT_GUID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_BJ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_BJ_SEL(:V_V_PROJECT_GUID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PROJECT_DX_MX_BJ_SEL");
        return result;
    }

    public HashMap PM_PROJECT_DX_MX_GJ_SEL(String V_V_PROJECT_GUID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_PROJECT_DX_MX_GJ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_DX_MX_GJ_SEL(:V_V_PROJECT_GUID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PROJECT_DX_MX_GJ_SEL");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_BYEQU(String V_V_STATECODE,
                                           String X_PERSONCODE, String V_V_EQUCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_BYEQU");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_BYEQU(:V_V_STATECODE,:X_PERSONCODE,:V_V_EQUCODE,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_VIEW_BYEQU");
        return result;
    }

    public Map PRO_SAP_EQU_TYPE_TXVAL_SEL_P(String V_V_EQUCODE, String V_V_EQUTYPECODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TXVAL_SEL_P");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TXVAL_SEL_P" + "(:V_V_EQUCODE,:V_V_EQUTYPECODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TXVAL_SEL_P");
        return result;
    }

    public Map PRO_SAP_EQU_BOM_VIEW_P(String V_V_EQUCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_BOM_VIEW_P");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_BOM_VIEW_P" + "(:V_V_EQUCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_BOM_VIEW_P");
        return result;
    }

    public Map PRO_PM_DEFECT_VIEW_P(String V_D_DEFECTDATE_B, String V_D_DEFECTDATE_E, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE,
                                    String V_V_STATECODE, String V_V_SOURCECODE, String V_V_DEFECTLIST, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_PM_DEFECT_VIEW_P");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_VIEW_P" + "(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_STATECODE," +
                    ":V_V_SOURCECODE,:V_V_DEFECTLIST,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_VIEW_P");
        return result;
    }

    public Map PRO_SAP_WORKORDER_SELECT_P(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE,
                                          String V_V_DEPTCODEREPARIR, String V_V_STATECODE, String V_EQUTYPE_CODE, String V_EQU_CODE,
                                          String V_DJ_PERCODE, String V_V_SHORT_TXT, String V_V_BJ_TXT, String V_V_ORDER_TYP,
                                          String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_SAP_WORKORDER_SELECT_P");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_WORKORDER_SELECT_P" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR," +
                    ":V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT,:V_V_ORDER_TYP,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_WORKORDER_SELECT_P");
        return result;
    }

    public Map PRO_RUN_EQU_BJ_ALERT_ALL_P(String A_EQUID, String A_CYCLE_ID, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_RUN_EQU_BJ_ALERT_ALL_P");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_BJ_ALERT_ALL_P" + "(:A_EQUID,:A_CYCLE_ID,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_EQU_BJ_ALERT_ALL_P");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z(String V_V_GUID_FXJH) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z" + "(:V_V_GUID_FXJH,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z(String V_V_GUID_FXJH) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z" + "(:V_V_GUID_FXJH,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z(String V_V_GUID_FXJH) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z" + "(:V_V_GUID_FXJH,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_TRE_GET_Z(String V_V_GUID_FXJH, String V_BY1, String V_BY2, String V_BY3) throws SQLException {
//        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TRE_GET_Z" + "(:V_V_GUID_FXJH,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_BY1", V_BY1);
            cstmt.setString("V_BY2", V_BY2);
            cstmt.setString("V_BY3", V_BY3);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TRE_GET_Z");
        return result;
    }


    public HashMap PRO_BASE_POST_TREE() throws SQLException {
//        logger.info("begin PRO_BASE_POST_TREE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", "-1");
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
        logger.info("end PRO_BASE_POST_TREE");
        return result;
    }

    public List<Map> PostTree() throws SQLException {

        HashMap data = PRO_BASE_POST_TREE();
        List<Map> list = (List) data.get("list");

        List<Map> result = GetSecondTreeChildren(list, "-1");

        return result;
    }

    private List<Map> GetSecondTreeChildren(List<Map> list, String code) {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_POSTCODE_UP").equals(code)) {
                HashMap temp = new HashMap();
                temp.put("id", list.get(i).get("V_POSTCODE"));
                temp.put("text", list.get(i).get("V_POSTNAME"));
                if (GetSecondTreeChildren(list, list.get(i).get("V_POSTCODE").toString()).size() > 0) {
                    temp.put("expanded", false);
                    temp.put("children", GetSecondTreeChildren(list, list.get(i).get("V_POSTCODE").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public Map BASE_PERSON_SEL_BYDEPT(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin BASE_PERSON_SEL_BYDEPT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_PERSON_SEL_BYDEPT" + "(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end BASE_PERSON_SEL_BYDEPT");
        return result;
    }

    public Map PRO_BASE_PERSON_GET_BYDEPT(String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_BASE_PERSON_GET_BYDEPT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_GET_BYDEPT" + "(:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_BASE_PERSON_GET_BYDEPT");
        return result;
    }

    public Map PRO_BASE_POST_GET_BYPER(String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_BASE_POST_GET_BYPER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_GET_BYPER" + "(:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_BASE_POST_GET_BYPER");
        return result;
    }

    public List<HashMap> PRO_BASE_SPECIALTY_TREE_CHECK(String V_V_PERSONCODE, String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_SPECIALTY_TREE_CHECK");
        List<HashMap> result = new ArrayList<HashMap>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTY_TREE_CHECK" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_SPECIALTY_TREE_CHECK");
        return result;
    }

    public Map PRO_BASE_CRAFTTOPER_GETBYPER(String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_BASE_CRAFTTOPER_GETBYPER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_CRAFTTOPER_GETBYPER" + "(:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_BASE_CRAFTTOPER_GETBYPER");
        return result;
    }

    public Map PM_03_PLAN_CHOOSE_SEL_NEW(String V_V_GUID, String V_V_PLANTYPE) throws SQLException {
        logger.info("begin PM_03_PLAN_CHOOSE_SEL_NEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CHOOSE_SEL_NEW" + "(:V_V_GUID,:V_V_PLANTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
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
        logger.info("end PM_03_PLAN_CHOOSE_SEL_NEW");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW(String IS_V_DEPTCODE, String IS_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");
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

    public HashMap PRO_BASE_PERSON_VIEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSON_VIEW");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_WEEK_GET(String V_V_WEEKPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GET" + "(:V_V_WEEKPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_WEEKPLAN_GUID", V_V_WEEKPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_GET");
        return result;
    }

    public HashMap PM_ACTIVITI_PROCESS_PER_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_REPAIRCODE, String V_V_FLOWTYPE, String V_V_FLOW_STEP, String V_V_PERCODE, String V_V_SPECIALTY, String V_V_WHERE) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_PER_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_PER_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_PROCESS_CODE,:V_V_WHERE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_FLOW_STEP", V_V_FLOW_STEP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_WHERE", V_V_WHERE);
            cstmt.registerOutParameter("V_V_PROCESS_CODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_V_PROCESS_CODE"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ACTIVITI_PROCESS_PER_SEL");
        return result;
    }

    public HashMap PRO_ACTIVITI_FLOW_AGREE(String V_V_ORDERID, String V_V_PROCESS_NAMESPACE, String V_V_PROCESS_CODE, String V_V_STEPCODE, String V_V_STEPNEXT_CODE) throws SQLException {
        logger.info("begin PRO_WO_FLOW_AGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_ACTIVITI_FLOW_AGREE" + "(:V_V_ORDERID,:V_V_PROCESS_NAMESPACE,:V_V_PROCESS_CODE,:V_V_STEPCODE,:V_V_STEPNEXT_CODE,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_PROCESS_NAMESPACE", V_V_PROCESS_NAMESPACE);
            cstmt.setString("V_V_PROCESS_CODE", V_V_PROCESS_CODE);
            cstmt.setString("V_V_STEPCODE", V_V_STEPCODE);
            cstmt.setString("V_V_STEPNEXT_CODE", V_V_STEPNEXT_CODE);
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
        logger.info("end PRO_ACTIVITI_FLOW_AGREE");
        return result;
    }


    public HashMap PRO_PM_03_PLAN_MONTH_GET(String V_V_MONTHPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_GET" + "(:V_V_MONTHPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_MONTHPLAN_GUID", V_V_MONTHPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_MONTH_GET");
        return result;
    }

    public Map PRO_PM_1917_JXGX_PER_DATA_VIEW(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_1917_JXGX_PER_DATA_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_1917_JXGX_PER_DATA_VIEW" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_1917_JXGX_PER_DATA_VIEW");
        return result;
    }

    public Map PRO_PM_1917_JXGX_JJ_DATA_VIEW(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_1917_JXGX_JJ_DATA_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_1917_JXGX_JJ_DATA_VIEW" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_1917_JXGX_JJ_DATA_VIEW");
        return result;
    }

    public Map PRO_PM_1917_JXGX_GJ_DATA_VIEW(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_1917_JXGX_GJ_DATA_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_1917_JXGX_GJ_DATA_VIEW" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_1917_JXGX_GJ_DATA_VIEW");
        return result;
    }

    public Map PRO_PM_1917_JXGX_JSYQ_DATA_V(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_1917_JXGX_JSYQ_DATA_V");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_1917_JXGX_JSYQ_DATA_V" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_1917_JXGX_JSYQ_DATA_V");
        return result;
    }

    public Map PRO_PM_1917_JXGX_AQCS_DATA_V(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_1917_JXGX_AQCS_DATA_V");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_1917_JXGX_AQCS_DATA_V" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_1917_JXGX_AQCS_DATA_V");
        return result;
    }

    public List<Map> PM_091104Tree(String ORDER_ID, String WORK_ID, String DEPARTCODE) throws SQLException {
        List<Map> result = GetParentTree(ORDER_ID, WORK_ID, DEPARTCODE);
        return result;
    }

    public List<Map> GetParentTree(String ORDER_ID, String WORK_ID, String DEPARTCODE) throws SQLException {
        logger.info("begin PRO_ORDER_PERSON_TREE");

        List<Map> list = new ArrayList<Map>();
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_ORDER_PERSON_TREE(:IN_ORDER_ID,:IN_WORK_ID,:IN_DEPARTCODE,:RET)}");
            cstmt.setString("IN_ORDER_ID", ORDER_ID);
            cstmt.setString("IN_WORK_ID", WORK_ID);
            cstmt.setString("IN_DEPARTCODE", DEPARTCODE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("RET");
            while (rs.next()) {

                Map temp = new HashMap();
                temp.put("V_CLASS_CODE", rs.getString("V_CLASS_CODE"));
                temp.put("V_CLASS_NAME", rs.getString("V_CLASS_NAME"));
                temp.put("V_PERSONCODE", rs.getString("V_PERSONCODE"));
                temp.put("V_PERSONNAME", rs.getString("V_PERSONNAME"));
                temp.put("V_CRAFTCODE", rs.getString("V_CRAFTCODE"));
                temp.put("V_CRAFTNAME", rs.getString("V_CRAFTNAME"));
                temp.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                list.add(temp);

            }
            if (list.size() > 0) {
                Map temp = new HashMap();
                temp.put("parentid", "");
                temp.put("text", list.get(0).get("V_DEPTNAME"));
                temp.put("expanded", true);
                temp.put("children", GetChildren(list));
                result.add(temp);
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_ORDER_PERSON_TREE");
        return result;
    }

    private List<Map> GetChildren(List<Map> list) {
        List<Map> menu = new ArrayList<Map>();
        List listarr = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            if (!listarr.contains(list.get(i).get("V_CLASS_CODE"))) {
                listarr.add(list.get(i).get("V_CLASS_CODE"));
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_CLASS_CODE"));
                temp.put("text", list.get(i).get("V_CLASS_NAME"));
                temp.put("leaf", true);
                menu.add(temp);
            }
        }
        return menu;
    }

    public HashMap PRO_SAP_PM_EQU_P_UPDATE(String V_V_EQUCODE, String V_V_EQUSITE, String V_V_EQUTYPECODE, String V_V_CBZX) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_P_UPDATE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_UPDATE" + "(:V_V_EQUCODE,:V_V_EQUSITE,:V_V_EQUTYPECODE,:V_V_CBZX,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
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
        logger.info("end PRO_SAP_PM_EQU_P_UPDATE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_ET_OPERA_SET(String V_V_GUID, String V_V_FACT_VALUE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_ET_OPERA_SET");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_OPERA_SET" + "(:V_V_GUID,:V_V_FACT_VALUE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FACT_VALUE", V_V_FACT_VALUE);
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
        logger.info("end PRO_PM_WORKORDER_ET_OPERA_SET");
        return result;
    }

    public HashMap PM_1917_JXMX_DATA_DEL(String V_V_JXMX_CODE) throws SQLException {
        logger.info("begin PM_1917_JXMX_DATA_DEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_DATA_DEL" + "(:V_V_JXMX_CODE,:V_INFO)}");
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
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
        logger.info("end PM_1917_JXMX_DATA_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_GET(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GET(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
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
        logger.info("end PRO_PM_WORKORDER_ET_DEFAULE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SELECT_VIEW(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_DEPTCODEREPARIR,
                                                String V_V_STATECODE, String V_V_ORDER_TYP, String V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SELECT_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_VIEW(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR," +
                    ":V_V_STATECODE,:V_V_ORDER_TYP,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
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
        logger.info("end PRO_PM_WORKORDER_SELECT_VIEW");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_TYP_COUNT(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_DEPTCODEREPARIR,
                                              String V_V_STATECODE, String V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TYP_COUNT");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TYP_COUNT(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR," +
                    ":V_V_STATECODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
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
        logger.info("end PRO_PM_WORKORDER_TYP_COUNT");
        return result;
    }

    public HashMap PRO_AM_SEND_LOG_SET(String V_V_SERVERNAME, String V_V_SENDPASSWORD, String V_V_SEND_PERSON, String V_V_RECEIVE_PERSON, String V_V_TYPE,
                                       String V_I_SEND) throws SQLException {

        logger.info("begin PRO_AM_SEND_LOG_SET");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_AM_SEND_LOG_SET(:V_V_SERVERNAME,:V_V_SENDPASSWORD,:V_V_SEND_PERSON,:V_V_RECEIVE_PERSON,:V_V_TYPE," +
                    ":V_I_SEND,:V_INFO)}");
            cstmt.setString("V_V_SERVERNAME", V_V_SERVERNAME);
            cstmt.setString("V_V_SENDPASSWORD", V_V_SENDPASSWORD);
            cstmt.setString("V_V_SEND_PERSON", V_V_SEND_PERSON);
            cstmt.setString("V_V_RECEIVE_PERSON", V_V_RECEIVE_PERSON);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_I_SEND", V_I_SEND);
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
        logger.info("end PRO_AM_SEND_LOG_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_VIEW(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY,
                                          String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_CONTENT, String V_V_STATE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_VIEW(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_SUMNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_DX_VIEW");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_DEL(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_DEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_DEL(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_DX_DEL");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_GET(String V_V_DX_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_GET");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_GET(:V_V_DX_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_DX_GUID", V_V_DX_GUID);
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
        logger.info("end PRO_PM_03_PLAN_DX_GET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_NSET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                          String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                          String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_NSET");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_NSET(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE," +
                    ":V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_INFO)}");
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
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_DX_NSET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_SEND(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_FLOWCODE, String V_V_PLANTYPE, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_SEND");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_SEND(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_DX_SEND");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_DEFECT_DEL() throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_DEFECT_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_DEFECT_DEL" + "(:V_INFO)}");


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
        logger.info("end PRO_PM_03_PLAN_DX_DEFECT_DEL");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_SET_GUID(String V_V_GUID, String V_V_ORGCODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_SET_GUID");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_SET_GUID" + "(:V_V_GUID,:V_V_ORGCODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

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
        logger.info("end PRO_PM_03_PLAN_DX_SET_GUID");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_SET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                         String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                         String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_SET");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_SET(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE," +
                    ":V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_INFO)}");
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
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_DX_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_DX_SET_STATE(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_DX_SET_STATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_DX_SET_STATE" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);

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
        logger.info("end PRO_PM_03_PLAN_DX_SET_STATE");
        return result;
    }

    public List<Map> OrgAndWorkspaceTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_TREE");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODE)) {
                    temp.put("parentid", list.get(i).get("V_DEPTCODE_UP"));
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", false);
                    if (flagChildren(list, V_V_DEPTCODE)) {
                        temp.put("children", GetDeptChildren1(list, V_V_DEPTCODE));
                    } else {
                        temp.put("leaf", false);
                    }
                    menu.add(temp);
                }

                /*if (flagChildren(list, V_V_DEPTCODE)) {
                    //if (list.get(i).get("V_DEPTCODE_UP").equals("99")) {
                    Map temp = new HashMap();
                    temp.put("parentid", "");
                    temp.put("sid", "");
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", false);
                    temp.put("children", GetDeptChildren1(list, V_V_DEPTCODE));
                    menu.add(temp);
                }*/
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_DEPT_TREE");
        return menu;
    }

    public List<Map> SelDeptTreeToClass(String V_V_SAP_WORK) throws SQLException {
        logger.info("begin PRO_SELDEPTTREE_TO_CLASS");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SELDEPTTREE_TO_CLASS" + "(:V_V_CLASSCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CLASSCODE", V_V_SAP_WORK);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                if (list.get(i).get("V_SAP_WORK").equals(V_V_SAP_WORK)) {
                    temp.put("parentid", "");
                    temp.put("id", list.get(i).get("V_SAP_WORK"));
                    temp.put("text", list.get(i).get("V_SAP_WORKNAME"));
                    temp.put("expanded", false);
                    temp.put("leaf", false);
                    menu.add(temp);
                }
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SELDEPTTREE_TO_CLASS");
        return menu;
    }

    public Map SelPerByClass(String V_V_SAP_WORK) throws SQLException {
        logger.info("begin PRO_SELPERBY_CLASS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SELPERBY_CLASS" + "(:V_V_CLASSCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CLASSCODE", V_V_SAP_WORK);
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
        logger.info("end BASE_PERSON_SEL_BYDEPT");
        return result;
    }


    public List<Map> GetDeptChildren1(List<HashMap> list, String V_V_DEPTCODE) throws SQLException {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                temp.put("leaf", false);
                temp.put("expanded", false);
                if (GetDeptChildren1(list, list.get(i).get("V_DEPTCODE").toString()).size() > 0) {
                    temp.put("children", GetDeptChildren1(list, list.get(i).get("V_DEPTCODE").toString()));
                } else {
                    temp.put("leaf", false);
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public boolean flagChildren(List<HashMap> list, String V_V_DEPTCODE) {
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                flag = true;
            }
        }
        return flag;

    }

    public HashMap PRO_PM_04_PROJECT_DATA_STATIST(String V_D_DATE_B, String V_D_DATE_E) throws SQLException {

        logger.info("begin PRO_PM_04_PROJECT_DATA_STATIST");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_04_PROJECT_DATA_STATIST(:V_D_DATE_B,:V_D_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_D_DATE_B", V_D_DATE_B);
            cstmt.setString("V_D_DATE_E", V_D_DATE_E);
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
        logger.info("end PRO_PM_04_PROJECT_DATA_STATIST");
        return result;
    }

    public List<Map> PRO_PM_EQUREPAIRPLAN_TREE_BYTI(String V_V_GUID_FXJH, String V_D_DATE_B, String V_D_DATE_E) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_BYTI");
        List result = new ArrayList();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_BYTI(:V_V_GUID_FXJH,:V_D_DATE_B,:V_D_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_D_DATE_B", V_D_DATE_B);
            cstmt.setString("V_D_DATE_E", V_D_DATE_E);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_BYTI");
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

    public Map PRO_JMDJ_VIEW_DATA_WORD_ITEM(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGNAME, String V_V_DEPTCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_JMDJ_VIEW_DATA_WORD_ITEM");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_JMDJ_VIEW_DATA_WORD_ITEM(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGNAME,:V_V_DEPTCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_JMDJ_VIEW_DATA_WORD_ITEM");
        return result;
    }

    public HashMap PM_03_PLAN_CREATE_WORKORDERMON(String V_V_GUID) throws SQLException {

        logger.info("begin PM_03_PLAN_CREATE_WORKORDERMON");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CREATE_WORKORDERMON" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_CREATE_WORKORDERMON");
        return result;
    }

    public HashMap PM_03_PLAN_M_CREATE_WORKORDER(String V_V_GUID, String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_03_PLAN_M_CREATE_WORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_M_CREATE_WORKORDER" + "(:V_V_GUID,:V_V_PERCODE,:V_INFO,:V_V_ORDERGUID,:V_V_SOURCECODE,:V_V_EQUTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_ORDERGUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_SOURCECODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_EQUTYPE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("V_V_ORDERGUID", cstmt.getString("V_V_ORDERGUID"));
            result.put("V_V_SOURCECODE", cstmt.getString("V_V_SOURCECODE"));
            result.put("V_V_EQUTYPE", cstmt.getString("V_V_EQUTYPE"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_M_CREATE_WORKORDER");
        return result;
    }

    public HashMap PRO_BASE_ZZMC_VIEW(String V_ZZMC) throws SQLException {

        logger.info("begin PRO_BASE_ZZMC_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_ZZMC_VIEW(:V_ZZMC,:V_CURSOR)}");
            cstmt.setString("V_ZZMC", V_ZZMC);
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
        logger.info("end PRO_BASE_ZZMC_VIEW");
        return result;
    }

    public HashMap PM_1917_JXGX_PER_DATA_SELBYG(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PM_1917_JXGX_PER_DATA_SELBYG");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_SELBYG(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
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
        logger.info("end PM_1917_JXGX_PER_DATA_SELBYG");
        return result;
    }

    public HashMap PM_1917_JXGX_PER_DATA_DEL(String V_V_GUID, String V_V_PERCODE_DE) throws SQLException {

        logger.info("begin PM_1917_JXGX_PER_DATA_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_DEL" + "(:V_V_GUID,:V_V_PERCODE_DE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_PER_DATA_DEL");
        return result;
    }

    public HashMap PM_1917_JXGX_PER_DATA_SET_G(String V_V_GUID, String V_V_PERCODE_DE, String V_V_PERNAME_DE, String V_V_TS, String V_V_DE,
                                               String V_V_PERTYPE_ED, String V_V_PERCODE, String V_V_PERNAME) throws SQLException {

        logger.info("begin PM_1917_JXGX_PER_DATA_SET_G");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_PER_DATA_SET_G" + "(:V_V_GUID,:V_V_PERCODE_DE,:V_V_PERNAME_DE,:V_V_TS,:V_V_DE," +
                    ":V_V_PERTYPE_ED,:V_V_PERCODE,:V_V_PERNAME,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.setString("V_V_PERNAME_DE", V_V_PERNAME_DE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.setString("V_V_DE", V_V_DE);

            cstmt.setString("V_V_PERTYPE_ED", V_V_PERTYPE_ED);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_PER_DATA_SET_G");
        return result;
    }

    public HashMap PM_ACTIVITI_STEP_LOG_SET(String V_V_BUSINESS_GUID, String V_V_PROCESS_GUID, String V_STEPCODE, String V_STEPNAME, String V_IDEA, String V_NEXTPER, String V_INPER) throws SQLException {

        logger.info("begin PM_ACTIVITI_STEP_LOG_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_STEP_LOG_SET" + "(:V_V_BUSINESS_GUID,:V_V_PROCESS_GUID,:V_STEPCODE,:V_STEPNAME,:V_IDEA,:V_NEXTPER,:V_INPER,:V_INFO)}");
            cstmt.setString("V_V_BUSINESS_GUID", V_V_BUSINESS_GUID);
            cstmt.setString("V_V_PROCESS_GUID", V_V_PROCESS_GUID);
            cstmt.setString("V_STEPCODE", V_STEPCODE);
            cstmt.setString("V_STEPNAME", V_STEPNAME);
            cstmt.setString("V_IDEA", V_IDEA);
            cstmt.setString("V_NEXTPER", V_NEXTPER);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ACTIVITI_PROCESS_SET");
        return result;
    }

    public HashMap PRO_ACTIVITI_DELETE(String V_V_BusinessKey, String V_V_FlowType) throws SQLException {

        logger.info("begin PRO_ACTIVITI_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_ACTIVITI_DELETE" + "(:V_V_BusinessKey,:V_V_FlowType,:V_INFO)}");
            cstmt.setString("V_V_BusinessKey", V_V_BusinessKey);
            cstmt.setString("V_V_FlowType", V_V_FlowType);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_ACTIVITI_DELETE");
        return result;
    }

    public List<Map> PRO_PM_03_PLAN_WEEK_GAUNTT_RUN(String v_v_sdate, String v_v_edate, String v_v_orgcode, String v_v_deptcode) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GAUNTT_RUN");

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GAUNTT_RUN(:V_V_SDATE,:V_V_EDATE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_CURSOR)}");
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
                temp.put("V_TYPE", map.get("V_TYPE").toString());
                temp.put("V_ID", map.get("V_ID").toString());
                temp.put("V_ORGCODE", map.get("V_ORGCODE").toString());
                temp.put("V_ORGNAME", map.get("V_ORGNAME").toString());
                temp.put("V_DEPTCODE", map.get("V_DEPTCODE").toString());
                temp.put("V_DEPTNAME", map.get("V_DEPTNAME").toString());
                temp.put("V_EQUCODE", map.get("V_EQUCODE").toString());
                temp.put("V_EQUNAME", map.get("V_EQUNAME").toString());
                temp.put("V_CONTENT", map.get("V_CONTENT").toString());
                temp.put("V_ENDTIME", map.get("V_ENDTIME").toString());
                temp.put("V_STARTTIME", map.get("V_STARTTIME").toString());
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
        logger.info("end PRO_PM_03_PLAN_WEEK_GAUNTT_RUN");
        return result;
    }

    public List<Map> PRO_WEEKPLAN_WORKORDER_GAUNTT(String V_V_SDATE, String V_V_EDATE, String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_WEEKPLAN_WORKORDER_GAUNTT");

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WEEKPLAN_WORKORDER_GAUNTT(:V_V_SDATE,:V_V_EDATE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_SDATE", V_V_SDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                Map map = (Map) list.get(i);
                temp.put("V_YEAR", map.get("V_YEAR").toString());
                temp.put("V_MONTH", map.get("V_MONTH").toString());
                temp.put("V_WEEK", map.get("V_WEEK").toString());
                temp.put("V_ORGCODE", map.get("V_ORGCODE").toString());
                temp.put("V_DEPTCODE", map.get("V_DEPTCODE").toString());
                temp.put("V_EQUTYPECODE", map.get("V_EQUTYPECODE").toString());
                temp.put("V_EQUCODE", map.get("V_EQUCODE").toString());
                temp.put("V_CONTENT", map.get("V_CONTENT").toString());
                temp.put("V_EQUIP_NAME", map.get("V_EQUIP_NAME").toString());
                temp.put("V_ENDTIME", map.get("V_ENDTIME").toString());
                temp.put("V_STARTTIME", map.get("V_STARTTIME").toString());
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
        logger.info("end PRO_WEEKPLAN_WORKORDER_GAUNTT");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SELBYDEFECT(String V_V_DEFECTGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SELBYDEFECT");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELBYDEFECT(:V_V_DEFECTGUID,:V_CURSOR)}");
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
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
        logger.info("end PRO_PM_WORKORDER_SELBYDEFECT");
        return result;
    }
}
