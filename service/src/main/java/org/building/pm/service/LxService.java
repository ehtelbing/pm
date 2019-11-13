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

@Service
public class LxService {

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

    public HashMap PRO_RUN_CYCLE_ABLE() throws SQLException {

        logger.info("begin PRO_RUN_CYCLE_ABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ABLE" + "(:V_CURSOR)}");
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
        logger.info("end PRO_RUN_CYCLE_ABLE");
        return result;
    }

    public HashMap PRO_RUN7111_EQULIST(String v_v_plantcode, String v_v_deptcode) throws SQLException {

        logger.info("begin PRO_RUN7111_EQULIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_EQULIST" + "(:v_v_plantcode,:v_v_deptcode,:V_CURSOR)}");
            cstmt.setString("v_v_plantcode", v_v_plantcode);
            cstmt.setString("v_v_deptcode", v_v_deptcode);
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

    public HashMap GET_WORK_YEILD_table(String a_plantcode, String a_departcode, String A_EQUID, String A_BEGINDATE, String A_ENDDATE, String A_CYCLE_ID) throws SQLException {

        logger.info("begin GET_WORK_YEILD_table");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_RUN_YEILD.GET_WORK_YEILD_table" + "(:a_plantcode,:a_departcode,:A_EQUID,:A_BEGINDATE,:A_ENDDATE,:A_CYCLE_ID,:RET_SUM,:RET)}");
            cstmt.setString("a_plantcode", a_plantcode);
            cstmt.setString("a_departcode", a_departcode);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
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
        logger.info("end GET_WORK_YEILD_table");
        return result;
    }

    public HashMap PRO_RUN_EQU_BJ_ALERT_ALL(String A_EQUID, String A_CYCLE_ID) throws SQLException {

        logger.info("begin PRO_RUN_EQU_BJ_ALERT_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public HashMap PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE , String V_V_DEPTCODENEXT, String V_V_DEPTTYPE ) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT , :V_V_DEPTTYPE ,:RET)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public HashMap PRO_RUN_BJ_USE_ALL(String A_PLANTCODE, String A_DEPARTCODE , String A_EQUID, String A_BJ_UNIQUE_CODE, String A_BEGINDATE , String A_ENDDATE ) throws SQLException {

        logger.info("begin PRO_RUN_BJ_USE_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_USE_ALL" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID , :A_BJ_UNIQUE_CODE,:A_BEGINDATE,:A_ENDDATE ,:RET)}");
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

    public HashMap PRO_RUN_BJ_CHANGE_LOG_ALL(String A_BJ_UNIQUE_CODE ) throws SQLException {

        logger.info("begin PRO_RUN_BJ_CHANGE_LOG_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public HashMap pro_run7112_checkloglist(String v_v_equcode, String v_v_deptcode , String v_v_plantcode, String v_v_id, String v_v_btime , String v_v_etime ) throws SQLException {

        logger.info("begin pro_run7112_checkloglist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7112_checkloglist" + "(:v_v_equcode,:v_v_deptcode,:v_v_plantcode , :v_v_id,:v_v_btime,:v_v_etime ,:RET)}");
            cstmt.setString("v_v_equcode", v_v_equcode);
            cstmt.setString("v_v_deptcode", v_v_deptcode);
            cstmt.setString("v_v_plantcode", v_v_plantcode);
            cstmt.setString("v_v_id", v_v_id);
            cstmt.setDate("v_v_btime", Date.valueOf(v_v_btime));
            cstmt.setDate("v_v_etime", Date.valueOf(v_v_etime));
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
        logger.info("end pro_run7112_checkloglist");
        return result;
    }

    public HashMap pro_run7112_logpic(String v_v_id ) throws SQLException {

        logger.info("begin pro_run7112_logpic");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7112_logpic" + "(:V_V_ID,:V_RET ,:O_FILE ,:O_FILENAME)}");
            cstmt.setString("V_V_ID", v_v_id);
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("O_FILE", OracleTypes.BLOB);
            cstmt.registerOutParameter("O_FILENAME", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_RET", (String) cstmt.getObject("V_RET"));
            result.put("O_FILE", ((Blob) cstmt.getObject("O_FILE")));
            result.put("O_FILENAME", ((String) cstmt.getObject("O_FILENAME")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7112_logpic");
        return result;
    }

    public HashMap pro_run7116_select(String V_V_DEPARTCODE, String V_V_PLANTCODE , String V_V_BJ_ID, String V_V_BEGIN_DATE, String V_V_END_DATE ) throws SQLException {

        logger.info("begin pro_run7116_select");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7116_select" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID , :V_V_BEGIN_DATE,:V_V_END_DATE ,:RET)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
            cstmt.setDate("V_V_BEGIN_DATE", Date.valueOf(V_V_BEGIN_DATE));
            cstmt.setDate("V_V_END_DATE", Date.valueOf(V_V_END_DATE));
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
        logger.info("end pro_run7116_select");
        return result;
    }

    public HashMap pro_run7117_bjlist(String V_V_DEPARTCODE, String V_V_PLANTCODE ) throws SQLException {

        logger.info("begin pro_run7117_bjlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7117_bjlist" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:RET)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end pro_run7117_bjlist");
        return result;
    }

    public HashMap pro_run7117_bjworklist(String V_V_DEPARTCODE, String V_V_PLANTCODE ,String V_V_BJ_ID) throws SQLException {

        logger.info("begin pro_run7117_bjworklist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7117_bjworklist" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:RET)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
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
        logger.info("end pro_run7117_bjworklist");
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

    public HashMap PRO_RUN7118_WORKTIMELIST(String V_V_SITE_ID) throws SQLException {

        logger.info("begin PRO_RUN7118_WORKTIMELIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7118_WORKTIMELIST" + "(:V_V_SITE_ID,:RET)}");
            cstmt.setString("V_V_SITE_ID", V_V_SITE_ID);

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
        logger.info("end PRO_RUN7118_WORKTIMELIST");
        return result;
    }

    public HashMap PRO_RUN_SITE_BJ_ALL(String IN_EQUID,String IN_PLANT,String IN_DEPART,String IN_STATUS,String IN_BJCODE,String IN_BJDESC) throws SQLException {

        logger.info("begin PRO_RUN_SITE_BJ_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public HashMap pro_run7119_sitevgurl(String V_SITE_id) throws SQLException {

        logger.info("begin pro_run7119_sitevgurl");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7119_sitevgurl" + "(:V_SITE_id,:RET)}");
            cstmt.setString("V_SITE_id", V_SITE_id);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("list", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7119_sitevgurl");
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
            cstmt = conn.prepareCall("{call PRO_RUN7127_SELECTKC" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:RET)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_EQU_ID", V_EQU_ID);

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
        logger.info("end PRO_RUN7127_SELECTKC");
        return result;
    }

    public HashMap PRO_RUN7115_SELECT(String V_V_DEPARTCODE, String V_V_PLANTCODE, String V_V_BJ_ID ,String V_V_USERID) throws SQLException {

        logger.info("begin PRO_RUN7115_SELECT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7115_SELECT" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID, :V_V_USERID,:RET)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
            cstmt.setString("V_V_USERID", V_V_USERID);

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
        logger.info("end PRO_RUN7115_SELECT");
        return result;
    }

    public HashMap pro_run7129_equvgurl(String V_EQU_ID ) throws SQLException {

        logger.info("begin pro_run7129_equvgurl");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7129_equvgurl" + "(:V_EQU_ID,:RET )}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
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
        logger.info("end pro_run7129_equvgurl");
        return result;
    }

    public HashMap pro_run7128_junkmatlist(String D_BEGIN_DATE, String D_END_DATE, String V_PLANTCODE, String V_DEPARTCODE, String V_EQU_ID, String V_MATERIALCODE, String V_MATERIALNAME, String V_STATUS) throws SQLException {

        logger.info("begin pro_run7128_junkmatlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7128_junkmatlist" + "(:D_BEGIN_DATE,:D_END_DATE,:V_PLANTCODE,:V_DEPARTCODE,:V_EQU_ID,:V_MATERIALCODE,:V_MATERIALNAME,:V_STATUS,:OUT_RESULT )}");
            cstmt.setDate("D_BEGIN_DATE", Date.valueOf(D_BEGIN_DATE));
            cstmt.setDate("D_END_DATE", Date.valueOf(D_END_DATE));
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
        logger.info("end pro_run7128_junkmatlist");
        return result;
    }

    public HashMap pro_run7129_junkmat(String V_ID, String V_HANDLE_TYPE, String V_HANDLE_REMARK, String V_HANDLE_USERID, String V_HANDLE_USERNAME) throws SQLException {

        logger.info("begin pro_run7129_junkmat");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7129_junkmat" + "(:V_ID,:V_HANDLE_TYPE,:V_HANDLE_REMARK,:V_HANDLE_USERID,:V_HANDLE_USERNAME,:V_RET )}");
            cstmt.setString("V_ID", V_ID);
            cstmt.setString("V_HANDLE_TYPE", V_HANDLE_TYPE);
            cstmt.setString("V_HANDLE_REMARK", V_HANDLE_REMARK);
            cstmt.setString("V_HANDLE_USERID", V_HANDLE_USERID);
            cstmt.setString("V_HANDLE_USERNAME", V_HANDLE_USERNAME);
            cstmt.registerOutParameter("V_RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7129_junkmat");
        return result;
    }
}
