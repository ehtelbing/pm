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

/**
 * Created by lxm on 2017/8/5.
 */
@Service
public class LxmService {
    private static final Logger logger = Logger.getLogger(LxmService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

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

    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_GET(String V_V_GUID,String V_BY1,String V_BY2,String V_BY3) throws SQLException {
//        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_GET" + "(:V_V_GUID,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_DJY_VIEW");
        return result;
    }
    // out varchar
    public HashMap PRO_PM_EQUREPAIRPLAN_WL_SET(String V_I_ID, String V_V_GUID, String V_V_WL_CODE, String V_V_WL_NAME,String V_V_JLDW,String V_V_NUM,String V_V_GGXH,String V_V_DJ) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_WL_SET" + "(:V_I_ID,:V_V_GUID,:V_V_WL_CODE,:V_V_WL_NAME,:V_V_JLDW,:V_V_NUM,:V_V_GGXH,:V_V_DJ,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_WL_CODE", V_V_WL_CODE);
            cstmt.setString("V_V_WL_NAME", V_V_WL_NAME);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_DJ", V_V_DJ);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_WL_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_YG_SET(String V_I_ID, String V_V_GUID, String V_V_GZ, String V_V_NUM,String V_V_TIME,String V_V_MEMO,String V_V_CODE,String V_V_DE) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_YG_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_YG_SET" + "(:V_I_ID,:V_V_GUID,:V_V_GZ,:V_V_NUM,:V_V_TIME,:V_V_MEMO,:V_V_CODE,:V_V_DE,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_GZ", V_V_GZ);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_CODE", V_V_CODE);
            cstmt.setString("V_V_DE", V_V_DE);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_YG_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_JJ_SET(String V_I_ID, String V_V_GUID, String V_V_JJ_CODE, String V_V_JJ_NAME,String V_V_JLDW,String V_V_NUM) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_JJ_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            //  conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_JJ_SET" + "(:V_I_ID,:V_V_GUID,:V_V_JJ_CODE,:V_V_JJ_NAME,:V_V_JLDW,:V_V_NUM,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
            cstmt.setString("V_V_JJ_NAME", V_V_JJ_NAME);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_NUM", V_V_NUM);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_JJ_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_YG_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_YG_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_YG_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_YG_DEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_WL_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            //   conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_WL_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_WL_DEL");
        return result;
    }
    // out varchar out cursor
    public HashMap PRO_PM_EQUREPAIRPLAN_WL_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_WL_VIEW" + "(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_WL_VIEW");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_YG_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_YG_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_YG_VIEW" + "(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_YG_VIEW");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_JJ_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_JJ_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_JJ_VIEW" + "(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_JJ_VIEW");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_JJ_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_JJ_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            //   conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_JJ_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_JJ_DEL");
        return result;
    }
    public HashMap PRO_PM_04_PROJECT_DATA_ITEM_G(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_04_PROJECT_DATA_ITEM_G");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_04_PROJECT_DATA_ITEM_G" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_04_PROJECT_DATA_ITEM_G");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_GETGS(String V_V_PROJECTCODE_GS) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_GETGS");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_GETGS" + "(:V_V_PROJECTCODE_GS,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTCODE_GS", V_V_PROJECTCODE_GS);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_GETGS");
        return result;
    }
    public HashMap PRO_BASE_DEPT_VIEW_PER(String V_DEPTCODE, String V_DEPTTYPE, String V_V_PERSON) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_PER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_PER" + "(:V_DEPTCODE,:V_DEPTTYPE,:V_V_PERSON,:V_CURSOR)}");
            cstmt.setString("IS_V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("IS_V_DEPTTYPE", V_DEPTTYPE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
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
        logger.info("end PRO_BASE_DEPT_VIEW_PER");
        return result;
    }
    public HashMap PM_04_PROJECT_MAJOR_SEL() throws SQLException {

        logger.info("begin PM_04_PROJECT_MAJOR_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_MAJOR_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_04_PROJECT_MAJOR_SEL");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_SEL(String V_V_PERCODE, String V_V_YEAR, String V_V_MONTH,
                                                 String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_SPECIALTY,
                                                 String V_V_EQUNAME, String V_V_PROJECT_CODE, String V_V_PROJECT_NAME,
                                                 String V_V_CONTENT, String V_BY1, String V_BY2,
                                                 String V_BY3) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_SEL" + "(:V_V_PERCODE,:V_V_YEAR,:V_V_MONTH," +
                    ":V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_EQUNAME,:V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_CONTENT," +
                    ":V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_SEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_TOWORK_C(String V_V_IP,String V_V_PERCODE,String V_V_PERNAME,String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TOWORK_C");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TOWORK_C" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TOWORK_C");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TOWORK_U(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_ORDERGUID,String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TOWORK_U" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TOWORK_U");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_TJ(String V_V_GUID_FXJH,String V_BY1,String V_BY2,String V_BY3) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_TJ");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_TJ" + "(:V_V_GUID_FXJH,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_BY1", V_BY1);
            cstmt.setString("V_BY2", V_BY2);
            cstmt.setString("V_BY3", V_BY3);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_TJ");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_NR_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_NR_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NR_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_NR_DEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_NR_SET(String V_I_ID,String V_V_GUID,String V_V_MEMO) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_NR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NR_SET" + "(:V_I_ID,:V_V_GUID,:V_V_MEMO,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_NR_SET");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_NR_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_NR_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NR_VIEW" + "(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_NR_VIEW");
        return result;
    }
    public HashMap pro_pm_basedic_zy(String V_V_PLAN) throws SQLException {

        logger.info("begin pro_pm_basedic_zy");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_pm_basedic_zy" + "(:V_V_PLAN,:V_CURSOR)}");
            cstmt.setString("V_V_PLAN", V_V_PLAN);
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
        logger.info("end pro_pm_basedic_zy");
        return result;
    }
    public HashMap PM_03_PLAN_CREATE_WORKORDERBEF(String V_V_GUID) throws SQLException {

        logger.info("begin PM_03_PLAN_CREATE_WORKORDERBEF");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CREATE_WORKORDERBEF" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PM_03_PLAN_CREATE_WORKORDERBEF");
        return result;
    }

    public HashMap PM_03_PLAN_CREATE_WORKORDER(String V_V_GUID,String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_03_PLAN_CREATE_WORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CREATE_WORKORDER" + "(:V_V_GUID,:V_V_PERCODE,:V_INFO,:V_V_ORDERGUID,:V_V_SOURCECODE,:V_V_EQUTYPE,:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_CREATE_WORKORDER");
        return result;
    }
    public HashMap PM_03_PLAN_WEEK_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,
                                       String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ZY,
                                       String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_FLOWTYPE,String V_V_STATE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_SEL" + "(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK," +
                    ":V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_FLOWTYPE,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
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
        logger.info("end PM_03_PLAN_WEEK_SEL");
        return result;
    }
}
