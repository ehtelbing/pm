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

    //7122查询
    public HashMap PRO_RUN7122_SELECTVGLIST(String V_VG_DESC) throws SQLException {

        logger.info("begin PRO_RUN7122_SELECTVGLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7122_SELECTVGLIST(:V_VG_DESC,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7122_SELECTVGLIST");
        return result;
    }

    //7122新增
    public HashMap PRO_RUN7122_ADDVGURL(String V_VG_DESC, String V_URL) throws SQLException {

        logger.info("begin PRO_RUN7122_ADDVGURL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7122_ADDVGURL" + "(:V_VG_DESC,:V_URL,:OUT_RESULT)}");

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
        logger.info("end PRO_RUN7122_ADDVGURL");
        return result;
    }

    //7122删除
    public HashMap PRO_RUN7122_DELETEVGURL(String V_ID) throws SQLException {

        logger.info("begin PRO_RUN7122_DELETEVGURL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7122_DELETEVGURL" + "(:V_ID,:OUT_RESULT)}");

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
        logger.info("end PRO_RUN7122_DELETEVGURL");
        return result;
    }

    //7123查询
    public HashMap PRO_RUN7123_SELECTSTLIST(String V_SITE_ID) throws SQLException {

        logger.info("begin pro_run7123_selectstlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7123_SELECTSTLIST(:V_SITE_ID,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7123_SELECTSTLIST");
        return result;
    }

    //7123新增
    public HashMap PRO_RUN7123_ADDST(String V_SITE_ID, String V_TAG_DESC, String V_TAG_UNIT,
                                     String V_STATUS) throws SQLException {

        logger.info("begin pro_run7123_addst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7123_ADDST" + "(:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT," +
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
        logger.info("end PRO_RUN7123_ADDST");
        return result;
    }

    //7123修改
    public HashMap PRO_RUN7123_UPDATEST(String V_TAG_ID, String V_SITE_ID, String V_TAG_DESC, String V_TAG_UNIT,
                                        String V_STATUS) throws SQLException {

        logger.info("begin PRO_RUN7123_UPDATEST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7123_UPDATEST" + "(:V_TAG_ID,:V_SITE_ID,:V_TAG_DESC,:V_TAG_UNIT," +
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
        logger.info("end PRO_RUN7123_UPDATEST");
        return result;
    }

    //7123状态停用
    public HashMap PRO_RUN7123_STOPST(String V_TAG_ID) throws SQLException {

        logger.info("begin pro_run7123_stopst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7123_STOPST" + "(:V_TAG_ID,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7123_STOPST");
        return result;
    }

    //7123状态启用
    public HashMap PRO_RUN7123_STARTST(String V_TAG_ID) throws SQLException {

        logger.info("begin pro_run7123_startst");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7123_STARTST" + "(:V_TAG_ID,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7123_STARTST");
        return result;
    }

    //7124查询
    public HashMap PRO_RUN7124_SUPPLYLIST(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin PRO_RUN7124_SUPPLYLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_SUPPLYLIST(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_STATUS,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7124_SUPPLYLIST");
        return result;
    }

    //7124新增
    public HashMap PRO_RUN7124_ADDSUPPLY(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_DESC, String V_SUPPLY_RENAGE, String V_SUPPLY_MANAGER,
                                         String V_LINK_PERSON, String V_LINK_TYPE, String V_LINK_PHONECODE, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin PRO_RUN7124_ADDSUPPLY");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_ADDSUPPLY" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER," +
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
        logger.info("end PRO_RUN7124_ADDSUPPLY");
        return result;
    }

    //7124修改
    public HashMap PRO_RUN7124_UPDATESUPPLY(String V_SUPPLY_CODE, String V_SUPPLY_NAME, String V_SUPPLY_DESC, String V_SUPPLY_RENAGE, String V_SUPPLY_MANAGER,
                                            String V_LINK_PERSON, String V_LINK_TYPE, String V_LINK_PHONECODE, String V_SUPPLY_STATUS) throws SQLException {

        logger.info("begin PRO_RUN7124_UPDATESUPPLY");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_UPDATESUPPLY" + "(:V_SUPPLY_CODE,:V_SUPPLY_NAME,:V_SUPPLY_DESC,:V_SUPPLY_RENAGE,:V_SUPPLY_MANAGER," +
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
        logger.info("end PRO_RUN7124_UPDATESUPPLY");
        return result;
    }

    //7124状态停用
    public HashMap PRO_RUN7124_STOPST(String SUPPLY_CODE) throws SQLException {

        logger.info("begin PRO_RUN7124_STOPST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_STOPST" + "(:V_SUPPLY_CODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", SUPPLY_CODE);
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
        logger.info("end PRO_RUN7124_STOPST");
        return result;
    }

    //7124状态启用
    public HashMap PRO_RUN7124_STARTST(String SUPPLY_CODE) throws SQLException {

        logger.info("begin PRO_RUN7124_STARTST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_STARTST" + "(:V_SUPPLY_CODE,:OUT_RESULT)}");
            cstmt.setString("V_SUPPLY_CODE", SUPPLY_CODE);
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
        logger.info("end PRO_RUN7124_STARTST");
        return result;
    }

    //712401查询
    public HashMap PRO_RUN7124_SUPPLYMATLIST(String V_SUPPLY_CODE) throws SQLException {

        logger.info("begin PRO_RUN7124_SUPPLYMATLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_SUPPLYMATLIST(:V_SUPPLY_CODE,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7124_SUPPLYMATLIST");
        return result;
    }

    //712401添加
    public HashMap PRO_RUN7124_ADDSUPPLYMAT_NEW(String V_SUPPLY_CODE, String V_MATERIALCODE) throws SQLException {

        logger.info("begin PRO_RUN7124_ADDSUPPLYMAT_NEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_ADDSUPPLYMAT_NEW" + "(:V_SUPPLY_CODE,:V_MATERIALCODE,:RET)}");
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("v_materialcode", V_MATERIALCODE);
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
        logger.info("end PRO_RUN7124_ADDSUPPLYMAT_NEW");
        return result;
    }

    //712401删除
    public HashMap PRO_RUN7124_DELSUPPLYMAT(String V_SUPPLY_CODE, String V_MATERIALCODE) throws SQLException {

        logger.info("begin PRO_RUN7124_DELSUPPLYMAT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7124_DELSUPPLYMAT" + "(:V_SUPPLY_CODE,:V_MATERIALCODE,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7124_DELSUPPLYMAT");
        return result;
    }

    //7125查询
    public HashMap PRO_RUN7125_EQUVGLIST(String V_PLANTCODE, String V_DEPARTCODE) throws SQLException {

        logger.info("begin pro_run7125_equvglist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7125_EQUVGLIST(:V_PLANTCODE,:V_DEPARTCODE,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7125_EQUVGLIST");
        return result;
    }

    //7125新增
    public HashMap PRO_RUN7125_ADDEQUVG_NEW(String V_EQU_ID, String V_VG_ID) throws SQLException {

        logger.info("begin PRO_RUN7125_ADDEQUVG_NEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7125_ADDEQUVG_NEW(:V_EQU_ID,:V_VG_ID,:RET)}");
            cstmt.setString("V_EQU_ID", V_EQU_ID);
            cstmt.setString("V_VG_ID", V_VG_ID);
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
        logger.info("end PRO_RUN7125_ADDEQUVG_NEW");
        return result;
    }

    //7125删除
    public HashMap PRO_RUN7125_DELEQUVG(String V_EQU_ID, String V_VG_ID) throws SQLException {

        logger.info("begin pro_run7125_delequvg");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7125_DELEQUVG(:V_EQU_ID,:V_VG_ID,:OUT_RESULT)}");
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
        logger.info("end PRO_RUN7125_DELEQUVG");
        return result;
    }

}
