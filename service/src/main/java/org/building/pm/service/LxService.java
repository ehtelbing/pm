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
}
