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
public class LcService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<Map<String, Object>> ResultHash(ResultSet rs) throws SQLException {

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (rs != null) {
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
        }
        return result;
    }

    public HashMap selectPlanLockingDate(String V_V_ORGCODE,String V_V_DEPTCODE,String I_I_YEAR,String I_I_MONTH,String I_I_WEEKNUM) throws SQLException {
        logger.info("begin selectPlanLockingDate");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:I_I_YEAR,:I_I_MONTH,:I_I_WEEKNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("I_I_YEAR", I_I_YEAR);
            cstmt.setString("I_I_MONTH", I_I_MONTH);
            cstmt.setString("I_I_WEEKNUM", I_I_WEEKNUM);
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
        logger.info("end selectPlanLockingDate");
        return result;
    }

    public HashMap insertPlanLockingDate(String V_V_ORGCODE, String V_V_DEPTCODE,  String I_I_YEAR, String I_I_MONTH,String I_I_WEEKNUM,String D_DATE_S ,String D_DATE_E) throws SQLException {

        logger.info("begin insertPlanLockingDate");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_INSERT(:V_V_ORGCODE,:V_V_DEPTCODE,:I_I_YEAR,:I_I_MONTH,:I_I_WEEKNUM,:D_DATE_S,:D_DATE_E,:V_INFO)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("I_I_YEAR", I_I_YEAR);
            cstmt.setString("I_I_MONTH", I_I_MONTH);
            cstmt.setString("I_I_WEEKNUM", I_I_WEEKNUM);
            cstmt.setString("D_DATE_S", D_DATE_S);
            cstmt.setString("D_DATE_E", D_DATE_E);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end insertPlanLockingDate");
        return result;
    }

    public HashMap updatePlanLockingDate(String I_I_ID,String V_V_ORGCODE, String V_V_DEPTCODE,  String I_I_YEAR, String I_I_MONTH,String I_I_WEEKNUM,String D_D_DATE_S ,String D_D_DATE_E) throws SQLException {

        logger.info("begin updatePlanLockingDate");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_UPDATE(:I_I_ID,:V_V_ORGCODE,:V_V_DEPTCODE,:I_I_YEAR,:I_I_MONTH,:I_I_WEEKNUM,:D_D_DATE_S,:D_D_DATE_E,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("I_I_YEAR", I_I_YEAR);
            cstmt.setString("I_I_MONTH", I_I_MONTH);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("I_I_WEEKNUM", I_I_WEEKNUM);
            cstmt.setString("D_D_DATE_S", D_D_DATE_S);
            cstmt.setString("D_D_DATE_E", D_D_DATE_E);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end updatePlanLockingDate");
        return result;
    }

    public HashMap loadPlanLockingDate(String I_I_ID) throws SQLException {

        logger.info("begin loadPlanLockingDate");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_LOAD" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end loadPlanLockingDate");
        return result;
    }

    public HashMap deletePlanLockingDate(String I_ID_LIST) throws SQLException {

        logger.info("begin deletePlanLockingDate");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_DELETE" + "(:I_ID_LIST,:V_INFO)}");
            cstmt.setString("I_ID_LIST", I_ID_LIST);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("success",true);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deletePlanLockingDate");
        return result;
    }

    public HashMap planLockingDateBatchUpdate(String I_I_ID,String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {

        logger.info("begin planLockingDateBatchUpdate");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_LOCKING_DATE_W_UPDATES(:I_I_ID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end planLockingDateBatchUpdate");
        return result;
    }

}
