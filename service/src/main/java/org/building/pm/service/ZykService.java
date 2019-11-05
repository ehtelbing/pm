package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ZykService {
    private static final Logger logger = Logger.getLogger(ZykService.class.getName());

    public InputStream stringInputStream(String str) {
        ByteArrayInputStream stream = new ByteArrayInputStream(str.getBytes());
        return stream;
    }

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

    @Autowired
    private ComboPooledDataSource dataSources;

    //计划厂矿和作业区
    public HashMap PRO_BASE_DEPT_VIEW(String V_V_DEPTCODE, String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW" + "(:V_V_DEPTCODE,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_BASE_DEPT_VIEW");
        return result;
    }

    //7121的数据查询
    public HashMap PRO_RUN7121_SELECTEQULIST(String V_DEPARTCODE, String V_PLANTCODE) throws SQLException {

        logger.info("begin PRO_RUN7121_SELECTEQULIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_SELECTEQULIST(:V_DEPARTCODE,:V_PLANTCODE,:OUT_RESULT)}");
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
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
        logger.info("end PRO_RUN7121_SELECTEQULIST");
        return result;
    }

    //7121新增根据设备编号查数据
    public HashMap PRO_RUN7121_GETEQULIST(String V_EQU_ID) throws SQLException {

        logger.info("begin PRO_RUN7121_GETEQULIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_GETEQULIST(:V_EQU_ID,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7121_GETEQULIST");
        return result;
    }

    //7121新增
    public HashMap PRO_RUN7121_ADDEQU(String V_EQU_ID, String V_EQU_DESC, String V_DEPARTCODE, String V_PLANTCODE, String V_USERID,
                                      String V_USERNAME, String V_STATUS, String V_PP_CODE) throws SQLException {

        logger.info("begin PRO_RUN7121_ADDEQU");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_ADDEQU" + "(:V_EQU_ID,:V_EQU_DESC,:V_DEPARTCODE,:V_PLANTCODE,:V_USERID," +
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
        logger.info("end PRO_RUN7121_ADDEQU");
        return result;
    }

    //7121修改
    public HashMap PRO_RUN7121_UPDATEEQU(String V_EQU_ID, String V_EQU_DESC, String V_USERID,
                                         String V_USERNAME, String V_STATUS, String V_PP_CODE) throws SQLException {

        logger.info("begin PRO_RUN7121_UPDATEEQU");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_UPDATEEQU" + "(:V_EQU_ID,:V_EQU_DESC,:V_USERID," +
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
        logger.info("end PRO_RUN7121_UPDATEEQU");
        return result;
    }

    //7121状态停用
    public HashMap PRO_RUN7121_STOP(String V_EQU_ID) throws SQLException {

        logger.info("begin PRO_RUN7121_STOP");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_STOP" + "(:V_EQU_ID,:OUT_RESULT)}");

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
        logger.info("end PRO_RUN7121_STOP");
        return result;
    }

    //7121状态启用
    public HashMap PRO_RUN7121_STARTEQU(String V_EQU_ID) throws SQLException {

        logger.info("begin PRO_RUN7121_STARTEQU");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7121_STARTEQU" + "(:V_EQU_ID,:OUT_RESULT)}");

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
        logger.info("end PRO_RUN7121_STARTEQU");
        return result;
    }

}
