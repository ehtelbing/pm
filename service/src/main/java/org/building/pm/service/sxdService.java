package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/10/31.
 */
@Service
public class sxdService {
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
                            rs.getString(i) == null ? "" : rs.getString(i).split("\\.")[0]);
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

    public HashMap PRO_BASE_DEPT_VIEW(String IS_V_DEPTCODE, String IS_V_DEPTTYPE) throws SQLException {
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

    public HashMap PRO_RUN7111_EQULIST(String V_V_PLANTCODE, String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_RUN7111_EQULIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_EQULIST(:V_V_PLANTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
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

    public HashMap PRO_RUN7127_SELECTKC(String V_PLANTCODE, String V_DEPARTCODE, String V_EQU_ID) throws SQLException {
        logger.info("begin PRO_RUN7127_SELECTKC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7127_SELECTKC" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
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
        logger.info("end PRO_RUN7127_SELECTKC");
        return result;
    }

    public HashMap PRO_RUN7128_JUNKMATLIST(String D_BEGIN_DATE, String D_END_DATE, String V_PLANTCODE, String V_DEPARTCODE, String V_EQU_ID, String V_MATERIALCODE, String V_MATERIALNAME, String V_STATUS) throws SQLException, ParseException {
        logger.info("begin PRO_RUN7128_JUNKMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7128_JUNKMATLIST" + "(:D_BEGIN_DATE,:D_END_DATE,:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:V_MATERIALCODE, :V_MATERIALNAME, :V_STATUS,:OUT_RESULT)}");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date begin_date_util = sdf.parse(D_BEGIN_DATE);
            java.util.Date end_date_util = sdf.parse(D_END_DATE);
            java.sql.Date begin_date_sql = new java.sql.Date(begin_date_util.getTime());
            java.sql.Date end_date_sql = new java.sql.Date(end_date_util.getTime());
            cstmt.setDate("D_BEGIN_DATE", begin_date_sql);
            cstmt.setDate("D_END_DATE", end_date_sql);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.setString("V_STATUS", V_STATUS);
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
        logger.info("end PRO_RUN7128_JUNKMATLIST");
        return result;
    }

    public Map<String, Object> PRO_RUN7129_JUNKMAT(String V_ID, String V_HANDLE_TYPE, String V_HANDLE_REMARK, String V_HANDLE_USERID, String V_HANDLE_USERNAME) throws SQLException {
        logger.info("begin PRO_RUN7129_JUNKMAT");
        Map<String, Object> result = new HashMap<String, Object>();
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

    public HashMap PRO_RUN7115_PERSONLIST(String V_V_DEPARTCODE, String V_V_PLANTCODE, String V_V_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN7115_PERSONLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public HashMap PRO_RUN7115_SELECT(String V_V_DEPARTCODE, String V_V_PLANTCODE, String V_V_BJ_ID, String V_V_USERID) throws SQLException {
        logger.info("begin PRO_RUN7115_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public Map<String, Object> PRO_RUN7115_HANDLEALERT(String V_V_ID, String V_V_ALERT_CONTEXT, String V_V_HANDLE_USERID, String V_V_HANDLE_USERNAME) throws SQLException {
        logger.info("begin PRO_RUN7115_HANDLEALERT");
        Map<String, Object> result = new HashMap<String, Object>();
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

    public HashMap PRO_RUN7111_TAGLIST(String PID) throws SQLException {

        logger.info("begin PRO_RUN7111_TAGLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_TAGLIST(:PID,:V_CURSOR)}");
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

    public HashMap PRO_RUN7111_USEBJLIST(String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_RUN7111_USEBJLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_USEBJLIST(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_RUN7111_USEBJLIST");
        return result;
    }

    public List<Map> PRO_RUN7111_ADDLOG(String V_V_BJCODE, Date V_V_CHECKTIME, String V_V_CHECKCOUNT, InputStream V_V_FILE, String V_V_FILENAME,
                                        String V_V_USERCODE, String V_V_USERNAME, String V_V_TAGID, String V_V_SITEID, float V_V_TAGVALUE) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        java.sql.Date SQL_V_V_CHECKTIME = new java.sql.Date(V_V_CHECKTIME.getTime());
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN7111_ADDLOG" + "(:V_V_BJCODE,:V_V_CHECKTIME,:V_V_CHECKCOUNT,:V_V_FILE,:V_V_FILENAME," +
                    ":V_V_USERCODE,:V_V_USERNAME,:V_V_TAGID,:V_V_SITEID,:V_V_TAGVALUE,:RET_MSG,:RET)}");
            cstmt.setString("V_V_BJCODE", V_V_BJCODE);
            cstmt.setDate("V_V_CHECKTIME", SQL_V_V_CHECKTIME);
            cstmt.setString("V_V_CHECKCOUNT", V_V_CHECKCOUNT);
            cstmt.setBinaryStream("V_V_FILE", V_V_FILE);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_USERCODE", V_V_USERCODE);
            cstmt.setString("V_V_USERNAME", V_V_USERNAME);
            cstmt.setString("V_V_TAGID", V_V_TAGID);
            cstmt.setString("V_V_SITEID", V_V_SITEID);
            cstmt.setFloat("V_V_TAGVALUE", V_V_TAGVALUE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_RUN7111_ADDLOG");
        return result;
    }

    public HashMap PRO_RUN7113_ORDERMATLIST(String V_DEPT_CODE, String V_EQUIP_CODE, String V_MATERIALCODE, String V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_RUN7113_ORDERMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_ORDERMATLIST" + "(:V_DEPT_CODE,:V_EQUIP_CODE,:V_MATERIALCODE,:V_MATERIALNAME,:OUT_CURSOR)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
            cstmt.setString("V_EQUIP_CODE", V_EQUIP_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.registerOutParameter("OUT_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_CURSOR")));
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

    public HashMap PRO_RUN7113_CHANGEORDERMAT(String A_ID, String SITE_ID, String A_CHANGE_AMOUNT, String V_EQUIP_NO, String USERID,
                                              String USERNAME, String PLANTCODE, String WORKAREA, Date CHANGEDATE, String V_MATERIALCODE,
                                              String A_SUPPLYCODE, String A_SUPPLYNAME, String A_UNIQUECODE, Date A_REPLACEDATE, String A_FAULTREASON,
                                              String A_REASON_REMARK) throws SQLException {

        logger.info("begin PRO_RUN7113_CHANGEORDERMAT");
        java.sql.Date SQL_CHANGEDATE = new java.sql.Date(CHANGEDATE.getTime());
        java.sql.Date SQL_A_REPLACEDATE = new java.sql.Date(A_REPLACEDATE.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_CHANGEORDERMAT" + "(:A_ID,:SITE_ID,:A_CHANGE_AMOUNT,:V_EQUIP_NO,:USERID," +
                    ":USERNAME,:PLANTCODE,:WORKAREA,:CHANGEDATE,:V_MATERIALCODE," +
                    ":A_SUPPLYCODE,:A_SUPPLYNAME,:A_UNIQUECODE,:A_REPLACEDATE,:A_FAULTREASON,:A_REASON_REMARK,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("SITE_ID", SITE_ID);
            cstmt.setString("A_CHANGE_AMOUNT", A_CHANGE_AMOUNT);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("USERID", USERID);
            cstmt.setString("USERNAME", USERNAME);
            cstmt.setString("PLANTCODE", PLANTCODE);
            cstmt.setString("WORKAREA", WORKAREA);
            cstmt.setDate("CHANGEDATE", SQL_CHANGEDATE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("A_SUPPLYCODE", A_SUPPLYCODE);
            cstmt.setString("A_SUPPLYNAME", A_SUPPLYNAME);
            cstmt.setString("A_UNIQUECODE", A_UNIQUECODE);
            cstmt.setDate("A_REPLACEDATE", SQL_A_REPLACEDATE);
            cstmt.setString("A_FAULTREASON", A_FAULTREASON);
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
        logger.info("end PRO_RUN7113_CHANGEORDERMAT");
        return result;
    }

    public HashMap PRO_RUN7113_CHANGECANCEL(String V_I_ID, String SITE_ID, String V_EQUIP_NO, String USERID, String USERNAME,
                                            String PLANTCODE, String V_DEPARTCODE, Date CHANGEDATE) throws SQLException {

        logger.info("begin PRO_RUN7113_CHANGECANCEL");
        java.sql.Date sql_CHANGEDATE = new java.sql.Date(CHANGEDATE.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_CHANGECANCEL" + "(:V_I_ID,:SITE_ID,:V_EQUIP_NO,:USERID,:USERNAME," +
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
        logger.info("end PRO_RUN7113_CHANGECANCEL");
        return result;
    }

    public HashMap PRO_RUN7110_SITESUPPLYLIST(String A_ID, String A_MATERIALCODE, String A_ORDERID) throws SQLException {

        logger.info("begin PRO_RUN7110_SITESUPPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7110_SITESUPPLYLIST(:A_ID,:A_MATERIALCODE,:A_ORDERID,:RET)}");
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

    public HashMap PG_RUN7113_GETORDERMATBARCODE(String A_ORDERID, String A_MATERIALCODE) throws SQLException {

        logger.info("begin PG_RUN7113_GETORDERMATBARCODE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_RUN7113.GETORDERMATBARCODE(:A_ORDERID,:A_MATERIALCODE,:RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
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
        logger.info("end PG_RUN7113_GETORDERMATBARCODE");
        return result;
    }

    public HashMap PRO_SAP_PM_EQU_FILE(String V_V_EQUCODE, String V_V_FILENAME, String V_V_FILEURL, String V_D_ALTERTIME, int V_N_IS_MAINPHOTO, String V_V_FILETYPE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_FILE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_FILE" + "(:V_V_EQUCODE,:V_V_FILENAME,:V_V_FILEURL,:V_D_ALTERTIME,:V_N_IS_MAINPHOTO,:V_V_FILETYPE,:RET)}");

            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_FILEURL", V_V_FILEURL);
            cstmt.setString("V_D_ALTERTIME", V_D_ALTERTIME);
            cstmt.setInt("V_N_IS_MAINPHOTO", V_N_IS_MAINPHOTO);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);

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
        logger.info("end PRO_SAP_PM_EQU_FILE");
        return result;
    }

    public HashMap SEL_SAP_PM_EQU_FILE(String V_V_EQUCODE) throws SQLException {
        logger.info("begin SEL_SAP_PM_EQU_FILE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SEL_SAP_PM_EQU_FILE" + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end PRO_SAP_PM_EQU_FILE");
        return result;
    }

    public HashMap DEL_SAP_PM_EQU_FILE(String V_V_FILENAME) throws SQLException {
        logger.info("begin DEL_SAP_PM_EQU_FILE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEL_SAP_PM_EQU_FILE" + "(:V_V_FILENAME,:RET)}");
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
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
        logger.info("end PRO_SAP_PM_EQU_FILE");
        return result;
    }

    public Map PRO_SAP_PM_EQU_P_COPY(String V_V_DEPTCODE, String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_P_COPY");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_COPY" + "(:V_V_DEPTCODE,:V_V_EQUCODE,:V_CURSOR,:V_V_EQUCODENEW)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_EQUCODENEW", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
            result.put("V_V_EQUCODENEW", (String) cstmt.getObject("V_V_EQUCODENEW"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_EQU_P_COPY");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW_ROLE_TREE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List<HashMap> list = GetSapChildEquChildren(ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("list", list);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    private List<HashMap> GetSapChildEquChildren(List<HashMap> list) {
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            HashMap temp = new HashMap();
            temp.put("sid", list.get(i).get("V_DEPTCODE"));
            temp.put("text", list.get(i).get("V_DEPTNAME"));
            temp.put("expanded", false);
            temp.put("leaf", true);
            menu.add(temp);
        }
        return menu;
    }

    public HashMap PRO_BASE_DEPT_WORKORDER_DEFECT(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_WORKORDER_DEFECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_WORKORDER_DEFECT(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_DEPT_WORKORDER_DEFECT");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SEL(String V_V_DEPTCODE, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SEL(:V_V_DEPTCODE,:V_V_STATECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
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
        logger.info("end PRO_PM_WORKORDER_SEL");
        return result;
    }

    public HashMap PRO_PM_DEFECT_SEL(String V_V_DEPTCODE, String V_V_STATENAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_DEFECT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_SEL(:V_V_DEPTCODE,:V_V_STATENAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_STATENAME", V_V_STATENAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getObject("V_V_SNUM").toString());
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_SEL");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public HashMap PRO_GET_DEPTEQUTYPE_PER(String V_V_PERSONCODE, String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_PER" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
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
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }

    public HashMap PRO_GET_DEPTEQU_PER_DROP(String V_V_PERSONCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQU_PER_DROP");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_GET_DEPTEQU_PER_DROP");
        return result;
    }

    public HashMap PRO_SAP_EQU_VIEW(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
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

    public HashMap PM_14_FAULT_TYPE_ITEM_SEL() throws SQLException {
        logger.info("begin PM_14_FAULT_TYPE_ITEM_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_TYPE_ITEM_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_14_FAULT_TYPE_ITEM_SEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                             String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                             String V_V_FAULT_YY, String V_V_FINDTIME_B, String V_V_FINDTIME_E) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME_B,:V_V_FINDTIME_E,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FINDTIME_B", V_V_FINDTIME_B);
            cstmt.setString("V_V_FINDTIME_E", V_V_FINDTIME_E);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_SEL");
        return result;
    }

    public HashMap PRO_BASE_FILE_ADD(String V_V_GUID, String V_V_FILENAME, InputStream V_V_FILEBLOB, String V_V_FILETYPECODE, String V_V_PLANT, String V_V_DEPT, String V_V_PERSON, String V_V_REMARK) throws SQLException {

        logger.info("begin PRO_BASE_FILE_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_ADD" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_FILEBLOB", V_V_FILEBLOB);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
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
        logger.info("end PRO_BASE_FILE_ADD");
        return result;
    }

    public HashMap PRO_BASE_FILE_SEL(String V_V_GUID,String V_V_FILETYPECODE) throws SQLException {
        logger.info("begin PRO_BASE_FILE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_SEL" + "(:V_V_GUID,:V_V_FILETYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
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
        logger.info("end PRO_BASE_FILE_SEL");
        return result;
    }

    public HashMap PRO_BASE_FILE_DEL(String  V_V_GUID) throws SQLException {
        logger.info("begin PRO_BASE_FILE_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_BASE_FILE_DEL");
        return result;
    }
}