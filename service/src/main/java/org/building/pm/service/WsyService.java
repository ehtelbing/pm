package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class WsyService {
    private static final Logger logger = Logger.getLogger(WsyService.class.getName());
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
                    model.put(rsm.getColumnName(i), rs.getString(i) == null ? "" : rs.getString(i).split("\\.")[0]);
                } else {
                    if (rsm.getColumnType(i) == 2) {
                        if (rs.getString(i) == null) {
                            model.put(rsm.getColumnName(i), "");
                        } else {
                            model.put(rsm.getColumnName(i), rs.getDouble(i));
                        }
                    } else {
                        model.put(rsm.getColumnName(i), rs.getString(i) == null ? "" : rs.getString(i).toString().replaceAll("\\n", ""));
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

    public HashMap PM_1917_JXMX_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_JXMX_NAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_1917_JXMX_DATA_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_JXMX_NAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
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
            result.put("total", cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
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

    public HashMap PM_1917_JXGX_DATA_SEL(String V_V_JXMX_CODE) throws SQLException {
        logger.info("begin PM_1917_JXGX_DATA_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_DATA_SEL" + "(:V_V_JXMX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
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
        logger.info("end PM_1917_JXGX_DATA_SEL");
        return result;
    }

    public HashMap PRO_BASE_PERSON_DE_SEL() throws SQLException {
        logger.info("begin PRO_BASE_PERSON_DE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_DE_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSON_DE_SEL");
        return result;
    }

    public HashMap PRO_PM_19_TOOL_BYCODE_SEL(String V_V_TOOLCODE) throws SQLException {
        logger.info("begin PRO_PM_19_TOOL_BYCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_TOOL_BYCODE_SEL" + "(:V_V_TOOLCODE,:V_CURSOR)}");
            cstmt.setString("V_V_TOOLCODE", V_V_TOOLCODE);
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
        logger.info("end PRO_PM_19_TOOL_BYCODE_SEL");
        return result;
    }

    public HashMap BASE_GJ_BYGX_SEL(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin BASE_GJ_BYGX_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GJ_BYGX_SEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
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
        logger.info("end BASE_GJ_BYGX_SEL");
        return result;
    }

    public HashMap PRO_PM_19_CARDE_GXSEL(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_19_CARDE_GXSEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARDE_GXSEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
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
        logger.info("end PRO_PM_19_CARDE_GXSEL");
        return result;
    }

    public HashMap BASE_JXMX_JJCODE_SEL(String V_V_CAR_CODE) throws SQLException {
        logger.info("begin BASE_JXMX_JJCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_JJCODE_SEL" + "(:V_V_CAR_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_CAR_CODE", V_V_CAR_CODE);
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
        logger.info("end BASE_JXMX_JJCODE_SEL");
        return result;
    }

    public HashMap PRO_PM_19_WORKDE_GXSEL(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PRO_PM_19_CARDE_GXSEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_GXSEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
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
        logger.info("end PRO_PM_19_WORKDE_GXSEL");
        return result;
    }

    public HashMap BASE_AQCS_BY_GXCODE_SEL(String V_V_GX_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_BY_GXCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_BY_GXCODE_SEL" + "(:V_V_GX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_GX_CODE", V_V_GX_CODE);
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
        logger.info("end BASE_AQCS_BY_GXCODE_SEL");
        return result;
    }

    public HashMap BASE_AQCS_AQYA_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_AQYA_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_AQYA_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_AQYA_SEL");
        return result;
    }

    public HashMap BASE_AQCS_FAULT_ITEM_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_FAULT_ITEM_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_FAULT_ITEM_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_FAULT_ITEM_SEL");
        return result;
    }

    public HashMap BASE_AQCS_BYCODE_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_BYCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_BYCODE_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_BYCODE_SEL");
        return result;
    }

    public HashMap BASE_AQCS_ZG_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_ZG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_ZG_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_ZG_SEL");
        return result;
    }

    public HashMap BASE_JXMX_GZ_INS(String V_V_JXGX_CODE, String V_V_PERCODE_DE, String V_V_PERNAME_DE, String V_V_TS, String V_V_DE, String V_V_PERTYPE_DE) throws SQLException {
        logger.info("begin BASE_JXMX_GZ_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_GZ_INS" + "(:V_V_JXGX_CODE,:V_V_PERCODE_DE,:V_V_PERNAME_DE,:V_V_TS,:V_V_DE,:V_V_PERTYPE_DE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.setString("V_V_PERNAME_DE", V_V_PERNAME_DE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.setString("V_V_DE", V_V_DE);
            cstmt.setString("V_V_PERTYPE_DE", V_V_PERTYPE_DE);
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
        logger.info("end BASE_JXMX_GZ_INS");
        return result;
    }

    public HashMap BASE_FILE_CHAKAN_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_CHAKAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_CHAKAN_SEL" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end BASE_FILE_CHAKAN_SEL");
        return result;
    }

    public HashMap BASE_JXBZ_BY_GXCODE_SEL(String V_V_GX_CODE) throws SQLException {
        logger.info("begin BASE_JXBZ_BY_GXCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXBZ_BY_GXCODE_SEL" + "(:V_V_GX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_GX_CODE", V_V_GX_CODE);
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
        logger.info("end BASE_JXBZ_BY_GXCODE_SEL");
        return result;
    }

    public HashMap BASE_JXBZ_GD_SEL(String V_V_JXBZ_GUID) throws SQLException {
        logger.info("begin BASE_JXBZ_GD_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXBZ_GD_SEL" + "(:V_V_JXBZ_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_JXBZ_GUID", V_V_JXBZ_GUID);
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
        logger.info("end BASE_JXBZ_GD_SEL");
        return result;
    }

    public HashMap BASE_JXBZ_QX_SEL(String V_V_GD_GUID) throws SQLException {
        logger.info("begin BASE_JXBZ_QX_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXBZ_QX_SEL" + "(:V_V_GD_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GD_GUID", V_V_GD_GUID);
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
        logger.info("end BASE_JXBZ_QX_SEL");
        return result;
    }

    public HashMap PM_REPAIR_JS_STANDARD_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE, String V_V_EQUCHILDCODE) throws SQLException {
        logger.info("begin PM_REPAIR_JS_STANDARD_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIR_JS_STANDARD_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_EQUCHILDCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
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
        logger.info("end PM_REPAIR_JS_STANDARD_SEL");
        return result;
    }

    public HashMap BASE_JJ_BYJXBZ_SEL(String V_V_JXBZ_GUID) throws SQLException {
        logger.info("begin BASE_JJ_BYJXBZ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JJ_BYJXBZ_SEL" + "(:V_V_JXBZ_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_JXBZ_GUID", V_V_JXBZ_GUID);
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
        logger.info("end BASE_JJ_BYJXBZ_SEL");
        return result;
    }

    public HashMap BASE_GJ_BYJXBZ_SEL(String V_V_JXBZ_GUID) throws SQLException {
        logger.info("begin BASE_GJ_BYJXBZ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GJ_BYJXBZ_SEL" + "(:V_V_JXBZ_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_JXBZ_GUID", V_V_JXBZ_GUID);
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
        logger.info("end BASE_GJ_BYJXBZ_SEL");
        return result;
    }

    public HashMap BASE_GZ_BYJXBZ_SEL(String V_V_JXBZ_GUID) throws SQLException {
        logger.info("begin BASE_GZ_BYJXBZ_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GZ_BYJXBZ_SEL" + "(:V_V_JXBZ_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_JXBZ_GUID", V_V_JXBZ_GUID);
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
        logger.info("end BASE_GZ_BYJXBZ_SEL");
        return result;
    }

    public HashMap BASE_GD_BY_GXGUID_SEL(String V_V_GX_GUID) throws SQLException {
        logger.info("begin BASE_GD_BY_GXGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GD_BY_GXGUID_SEL" + "(:V_V_GX_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GX_GUID", V_V_GX_GUID);
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
        logger.info("end BASE_GD_BY_GXGUID_SEL");
        return result;
    }

    public HashMap BASE_GZ_BY_GDGUID_SEL(String V_V_ORDERGUID) throws SQLException {
        logger.info("begin BASE_GZ_BY_GDGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GZ_BY_GDGUID_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end BASE_GZ_BY_GDGUID_SEL");
        return result;
    }

    public HashMap BASE_GJ_BY_GDGUID_SEL(String V_V_ORDERGUID) throws SQLException {
        logger.info("begin BASE_GJ_BY_GDGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GJ_BY_GDGUID_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end BASE_GJ_BY_GDGUID_SEL");
        return result;
    }

    public HashMap BASE_JJ_BY_GDGUID_SEL(String V_V_ORDERGUID) throws SQLException {
        logger.info("begin BASE_JJ_BY_GDGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JJ_BY_GDGUID_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end BASE_JJ_BY_GDGUID_SEL");
        return result;
    }

    public HashMap PM_1917_JXGX_WL_DATA_SEL(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_DATA_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_DATA_SEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
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
        logger.info("end PM_1917_JXGX_WL_DATA_SEL");
        return result;
    }

    public HashMap BASE_WL_BY_GDGUID_SEL(String V_V_ORDERGUID) throws SQLException {
        logger.info("begin BASE_WL_BY_GDGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_WL_BY_GDGUID_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end BASE_WL_BY_GDGUID_SEL");
        return result;
    }

    public HashMap BASE_JXBZ_BY_GXCODE_INS(String V_V_JXGX_CODE, String V_V_JSYQ_CODE, String V_V_JSYQ_NAME) throws SQLException {
        logger.info("begin BASE_JXBZ_BY_GXCODE_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXBZ_BY_GXCODE_INS" + "(:V_V_JXGX_CODE,:V_V_JSYQ_CODE,:V_V_JSYQ_NAME,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JSYQ_CODE", V_V_JSYQ_CODE);
            cstmt.setString("V_V_JSYQ_NAME", V_V_JSYQ_NAME);
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
        logger.info("end BASE_JXBZ_BY_GXCODE_INS");
        return result;
    }

    public List<HashMap> PRO_SAP_PM_EQU_TREE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_TREE");
        List<HashMap> menu = new ArrayList<HashMap>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_TREE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            menu = GetSapEquChildren(list, "");
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SAP_PM_EQU_TREE");
        return menu;
    }

    private List<HashMap> GetSapEquChildren(List<HashMap> list, String V_EQUCODE) {
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_EQUCODEUP").equals(V_EQUCODE)) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_EQUCODE"));
                temp.put("text", list.get(i).get("V_EQUNAME"));
                temp.put("V_EQUCODEUP", list.get(i).get("V_EQUCODEUP"));
                temp.put("V_EQUTYPECODE", list.get(i).get("V_EQUTYPECODE"));
                temp.put("V_EQUSITENAME", list.get(i).get("V_EQUSITENAME"));
                temp.put("V_EQUSITE", list.get(i).get("V_EQUSITE"));
                temp.put("parentid", "-1");
                temp.put("leaf", true);
                // temp.put("expanded", false);
                menu.add(temp);
            }
        }
        return menu;
    }

    public HashMap BASE_JXMX_DATA_EDIT(String V_V_JXMX_CODE, String V_V_JXMX_NAME, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_EQUCODE_CHILD, String V_V_REPAIRMAJOR_CODE, String V_V_BZ, String V_V_HOUR, String V_V_IN_PER, String V_V_IN_DATE, String V_V_MXBB_NUM) throws SQLException {
        logger.info("begin BASE_JXMX_DATA_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_DATA_EDIT" + "(:V_V_JXMX_CODE, :V_V_JXMX_NAME, :V_V_ORGCODE, :V_V_DEPTCODE, :V_V_EQUTYPECODE, :V_V_EQUCODE, :V_V_EQUCODE_CHILD, :V_V_REPAIRMAJOR_CODE, :V_V_BZ, :V_V_HOUR, :V_V_IN_PER, :V_V_IN_DATE, :V_V_MXBB_NUM, :V_INFO)}");
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
            cstmt.setString("V_V_MXBB_NUM", V_V_MXBB_NUM);
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
        logger.info("end BASE_JXMX_DATA_EDIT");
        return result;
    }

    public HashMap BASE_JXMX_DATA_DEL(String V_V_JXMX_CODE) throws SQLException {
        logger.info("begin BASE_JXMX_DATA_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_DATA_DEL" + "(:V_V_JXMX_CODE, :V_INFO)}");
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
        logger.info("end BASE_JXMX_DATA_DEL");
        return result;
    }

    public HashMap BASE_GX_GZ_DEL(String V_V_JXGX_CODE, String V_V_PERCODE_DE) throws SQLException {
        logger.info("begin BASE_GX_GZ_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_GZ_DEL" + "(:V_V_JXGX_CODE, :V_V_PERCODE_DE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
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
        logger.info("end BASE_GX_GZ_DEL");
        return result;
    }

    public HashMap BASE_GX_WL_DEL(String V_V_JXGX_CODE, String V_V_WLCODE) throws SQLException {
        logger.info("begin BASE_GX_WL_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_WL_DEL" + "(:V_V_JXGX_CODE, :V_V_WLCODE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
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
        logger.info("end BASE_GX_WL_DEL");
        return result;
    }

    public HashMap BASE_GX_JXBZ_DEL(String V_V_JXGX_CODE, String V_V_JSYQ_CODE) throws SQLException {
        logger.info("begin BASE_GX_JXBZ_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_JXBZ_DEL" + "(:V_V_JXGX_CODE, :V_V_JSYQ_CODE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JSYQ_CODE", V_V_JSYQ_CODE);
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
        logger.info("end BASE_GX_JXBZ_DEL");
        return result;
    }

    public HashMap BASE_GX_AQCS_DEL(String V_V_JXGX_CODE, String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_GX_AQCS_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_AQCS_DEL" + "(:V_V_JXGX_CODE, :V_V_AQCS_CODE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_GX_AQCS_DEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_SEL(String V_V_CARCODE, String V_V_CARNAME) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_SEL" + "(:V_V_CARCODE,:V_V_CARNAME,:V_CURSOR)}");
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
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
        logger.info("end BASE_EXAMINE_CAR_SEL");
        return result;
    }

    public HashMap BASE_JXMX_JJ_INS(String V_V_JXGX_CODE, String V_V_JJ_CODE, String V_V_JJ_NAME, String V_V_JJ_TYPE, String V_V_JJ_TS, String V_V_JJ_DE) throws SQLException {
        logger.info("begin BASE_JXMX_JJ_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_JJ_INS" + "(:V_V_JXGX_CODE,:V_V_JJ_CODE,:V_V_JJ_NAME,:V_V_JJ_TYPE,:V_V_JJ_TS,:V_V_JJ_DE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
            cstmt.setString("V_V_JJ_NAME", V_V_JJ_NAME);
            cstmt.setString("V_V_JJ_TYPE", V_V_JJ_TYPE);
            cstmt.setString("V_V_JJ_TS", V_V_JJ_TS);
            cstmt.setString("V_V_JJ_DE", V_V_JJ_DE);
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
        logger.info("end BASE_JXMX_JJ_INS");
        return result;
    }

    public HashMap BASE_JXMX_GJ_INS(String V_V_JXGX_CODE, String V_V_GJ_CODE, String V_V_GJ_NAME, String V_V_GJ_TYPE) throws SQLException {
        logger.info("begin BASE_JXMX_GJ_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_GJ_INS" + "(:V_V_JXGX_CODE,:V_V_GJ_CODE,:V_V_GJ_NAME,:V_V_GJ_TYPE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_GJ_CODE", V_V_GJ_CODE);
            cstmt.setString("V_V_GJ_NAME", V_V_GJ_NAME);
            cstmt.setString("V_V_GJ_TYPE", V_V_GJ_TYPE);
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
        logger.info("end BASE_JXMX_GJ_INS");
        return result;
    }

    public HashMap BASE_JXMX_WL_INS(String V_V_JXGX_CODE, String V_V_WLCODE, String V_V_KFNAME, String V_V_WLSM, String V_V_GGXH, String V_V_JLDW, String V_V_PRICE, String V_V_USE_NUM) throws SQLException {
        logger.info("begin BASE_JXMX_WL_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_WL_INS" + "(:V_V_JXGX_CODE,:V_V_WLCODE,:V_V_KFNAME,:V_V_WLSM,:V_V_GGXH,:V_V_JLDW,:V_V_PRICE,:V_V_USE_NUM,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.setString("V_V_KFNAME", V_V_KFNAME);
            cstmt.setString("V_V_WLSM", V_V_WLSM);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_PRICE", V_V_PRICE);
            cstmt.setString("V_V_USE_NUM", V_V_USE_NUM);
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
        logger.info("end BASE_JXMX_WL_INS");
        return result;
    }

    public HashMap BASE_WORK_TOOL_SEL() throws SQLException {
        logger.info("begin BASE_WORK_TOOL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_WORK_TOOL_SEL" + "(:V_CURSOR)}");
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
        logger.info("end BASE_WORK_TOOL_SEL");
        return result;
    }

    public HashMap BASE_GX_JJ_DEL(String V_V_JXGX_CODE, String V_V_JJ_CODE) throws SQLException {
        logger.info("begin BASE_GX_JJ_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_JJ_DEL" + "(:V_V_JXGX_CODE, :V_V_JJ_CODE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
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
        logger.info("end BASE_GX_JJ_DEL");
        return result;
    }

    public HashMap BASE_GX_GJ_DEL(String V_V_JXGX_CODE, String V_V_GJ_CODE) throws SQLException {
        logger.info("begin BASE_GX_GJ_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_GJ_DEL" + "(:V_V_JXGX_CODE, :V_V_GJ_CODE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_GJ_CODE", V_V_GJ_CODE);
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
        logger.info("end BASE_GX_GJ_DEL");
        return result;
    }

    public HashMap BASE_WL_SEL() throws SQLException {
        logger.info("begin BASE_WL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_WL_SEL" + "(:V_CURSOR)}");
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
        logger.info("end BASE_WL_SEL");
        return result;
    }

    public HashMap BASE_GX_GZ_UPD(String V_V_JXGX_CODE, String V_V_PERCODE_DE, String V_V_TS, String V_V_DE) throws SQLException {
        logger.info("begin BASE_GX_GZ_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_GZ_UPD" + "(:V_V_JXGX_CODE, :V_V_PERCODE_DE, :V_V_TS, :V_V_DE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_PERCODE_DE", V_V_PERCODE_DE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.setString("V_V_DE", V_V_DE);
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
        logger.info("end BASE_GX_GZ_UPD");
        return result;
    }

    public HashMap BASE_GX_JJ_UPD(String V_V_JXGX_CODE, String V_V_JJ_CODE, String V_V_JJ_TS, String V_V_JJ_DE) throws SQLException {
        logger.info("begin BASE_GX_JJ_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_JJ_UPD" + "(:V_V_JXGX_CODE, :V_V_JJ_CODE, :V_V_JJ_TS, :V_V_JJ_DE, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
            cstmt.setString("V_V_JJ_TS", V_V_JJ_TS);
            cstmt.setString("V_V_JJ_DE", V_V_JJ_DE);
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
        logger.info("end BASE_GX_JJ_UPD");
        return result;
    }

    public HashMap BASE_GX_GJ_UPD(String V_V_JXGX_CODE, String V_V_TOOLCODE, String V_V_TOOLTYPE, String V_V_TOOLPLACE, String V_V_TOOLINDATE, String V_V_TOOLSTATUS) throws SQLException {
        logger.info("begin BASE_GX_GJ_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_GJ_UPD" + "(:V_V_JXGX_CODE, :V_V_TOOLCODE, :V_V_TOOLTYPE, :V_V_TOOLPLACE, :V_V_TOOLINDATE, :V_V_TOOLSTATUS, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_TOOLCODE", V_V_TOOLCODE);
            cstmt.setString("V_V_TOOLTYPE", V_V_TOOLTYPE);
            cstmt.setString("V_V_TOOLPLACE", V_V_TOOLPLACE);
            cstmt.setString("V_V_TOOLINDATE", V_V_TOOLINDATE);
            cstmt.setString("V_V_TOOLSTATUS", V_V_TOOLSTATUS);
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
        logger.info("end BASE_GX_GJ_UPD");
        return result;
    }

    public HashMap BASE_GX_WL_UPD(String V_V_JXGX_CODE, String V_V_WLCODE, String V_V_WLSM, String V_V_GGXH, String V_V_JLDW, String V_V_PRICE, String V_V_USE_NUM) throws SQLException {
        logger.info("begin BASE_GX_WL_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GX_WL_UPD" + "(:V_V_JXGX_CODE, :V_V_WLCODE, :V_V_WLSM, :V_V_GGXH, :V_V_JLDW, :V_V_PRICE, :V_V_USE_NUM, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.setString("V_V_WLSM", V_V_WLSM);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_PRICE", V_V_PRICE);
            cstmt.setString("V_V_USE_NUM", V_V_USE_NUM);
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
        logger.info("end BASE_GX_WL_UPD");
        return result;
    }

    public HashMap BASE_AQCS_SEL(String V_V_AQCS_NAME) throws SQLException {
        logger.info("begin BASE_AQCS_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_SEL" + "(:V_V_AQCS_NAME, :V_CURSOR)}");
            cstmt.setString("V_V_AQCS_NAME", V_V_AQCS_NAME);
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
        logger.info("end BASE_AQCS_SEL");
        return result;
    }

    public HashMap BASE_JXMX_AQCS_INS(String V_V_JXGX_CODE, String V_V_AQCS_CODE, String V_V_AQCS_NAME) throws SQLException {
        logger.info("begin BASE_JXMX_AQCS_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JXMX_AQCS_INS" + "(:V_V_JXGX_CODE, :V_V_AQCS_CODE, :V_V_AQCS_NAME, :V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.setString("V_V_AQCS_NAME", V_V_AQCS_NAME);
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
        logger.info("end BASE_JXMX_AQCS_INS");
        return result;
    }

    //附件下载
    public HashMap BASE_FILE_IMAGE_DOWNLOAD(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_DOWNLOAD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_DOWNLOAD" + "(:V_V_GUID, :V_NAME, :V_FILE)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_NAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FILE", OracleTypes.BLOB);
            cstmt.execute();
            result.put("O_FILENAME", (String) cstmt.getObject("V_NAME"));
            result.put("O_FILE", (Blob) cstmt.getBlob("V_FILE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_FILE_IMAGE_DOWNLOAD");
        return result;
    }

    public HashMap BASE_FILE_IMAGE_INS(String V_V_GUID, String V_V_FILENAME, InputStream V_V_FILE, String V_V_FILETYPECODE, String V_V_PLANT, String V_V_DEPT, String V_V_TIME, String V_V_PERSON, String V_V_REMARK) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_INS" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_TIME,:V_V_PERSON,:V_V_REMARK,:O_FILEGUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_FILEBLOB", V_V_FILE);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
            cstmt.registerOutParameter("O_FILEGUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("INFO", cstmt.getString("V_INFO"));
            result.put("FILE_GUID", cstmt.getString("O_FILEGUID"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_FILE_IMAGE_INS");
        return result;
    }

    //附件删除
    public HashMap BASE_FILE_IMAGE_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end BASE_FILE_IMAGE_DEL");
        return result;
    }

    public HashMap BASE_FILE_IMAGE_SEL(String V_V_GUID, String V_V_FILEGUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_SEL" + "(:V_V_GUID, :V_V_FILEGUID, :V_FILE, :V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_FILE", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("O_FILE", (Blob) cstmt.getBlob("V_FILE"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_FILE_IMAGE_SEL");
        return result;
    }

    public HashMap PRO_PM_BASEDIC_LIST(final String IS_V_BASETYPE) throws SQLException {
        logger.info("begin PRO_PM_BASEDIC_LIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_BASEDIC_LIST" + "(:IS_V_BASETYPE,:V_CURSOR)}");
            cstmt.setString("IS_V_BASETYPE", IS_V_BASETYPE);
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
        logger.info("end PRO_PM_BASEDIC_LIST");
        return result;
    }

    public HashMap PM_REALINFOTL_QUERY() throws SQLException {
        logger.info("begin PM_REALINFOTL_QUERY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REALINFOTL_QUERY" + "(:V_CURSOR)}");
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
        logger.info("end PM_REALINFOTL_QUERY");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW(final String IS_V_DEPTCODE, final String IS_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
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

    public HashMap PRO_PP_INFORMATION_SET(final String V_I_ID, final String V_V_DEPT, final String V_V_INFORMATION, final String V_D_DATE, final String V_V_PERSONCODE, final String V_V_PERSONNAME, final String V_V_TYPE, final String V_V_CLASS, final String V_V_CLASSTYPE, final String V_V_NOTIFICATION) throws SQLException {
        logger.info("begin PRO_PP_INFORMATION_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PP_INFORMATION_SET" + "(:V_I_ID,:V_V_DEPT,:V_V_INFORMATION,:V_D_DATE,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_TYPE,:V_V_CLASS,:V_V_CLASSTYPE,:V_V_NOTIFICATION,:V_INFO)}");
            cstmt.setInt("V_I_ID", Integer.parseInt(V_I_ID));
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_INFORMATION", V_V_INFORMATION);
            if (V_D_DATE.equals("")) {
                cstmt.setDate(V_D_DATE, null);
            } else {
                Timestamp time = Timestamp.valueOf(V_D_DATE);
                cstmt.setTimestamp(V_D_DATE, time);
            }
//            cstmt.setDate("V_D_DATE", V_D_DATE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_CLASS", V_V_CLASS);
            cstmt.setString("V_V_CLASSTYPE", V_V_CLASSTYPE);
            cstmt.setString("V_V_NOTIFICATION", V_V_NOTIFICATION);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PP_INFORMATION_SET");
        return result;
    }

    public HashMap PM_REALINFOTL_EDIT(final String V_V_CODE, final String V_V_CONTENT) throws SQLException {
        logger.info("begin PM_REALINFOTL_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REALINFOTL_EDIT" + "(:V_V_CODE,:V_V_CONTENT,:V_INFO)}");
            cstmt.setString("V_V_CODE", V_V_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REALINFOTL_EDIT");
        return result;
    }

    public HashMap PM_REALINFOTL_DEL(final String V_ID) throws SQLException {
        logger.info("begin PM_REALINFOTL_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REALINFOTL_DEL" + "(:V_ID,:V_CURSOR)}");
            cstmt.setString("V_ID", V_ID);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REALINFOTL_DEL");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW_DEPTTYPE(final String V_V_DEPTCODE, final String V_V_DEPTTYPE, final String V_V_PERSON) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_DEPTTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_DEPTTYPE" + "(:V_V_DEPTCODE,:V_V_DEPTTYPE,:V_V_PERSON,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_DEPTTYPE");
        return result;
    }

    public HashMap PRO_PP_INFORMATION_LIST(final String V_V_PERSONCODE, final String V_V_DEPT, final String V_V_TYPE, final String V_V_CLASSTYPE, final String V_D_FROMDATE, final String V_D_TODATE) throws SQLException {
        logger.info("begin PRO_PP_INFORMATION_LIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PP_INFORMATION_LIST" + "(:V_V_PERSONCODE,:V_V_DEPT,:V_V_TYPE,:V_V_CLASSTYPE,:V_D_FROMDATE,:V_D_TODATE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_CLASSTYPE", V_V_CLASSTYPE);
            if (V_D_FROMDATE.equals("")) {
                cstmt.setDate(V_D_FROMDATE, null);
            } else {
                cstmt.setDate(V_D_FROMDATE, java.sql.Date.valueOf(V_D_FROMDATE));
            }
            if (V_D_TODATE.equals("")) {
                cstmt.setDate(V_D_TODATE, null);
            } else {
                cstmt.setDate(V_D_TODATE, java.sql.Date.valueOf(V_D_TODATE));
            }
//            cstmt.setString("V_D_FROMDATE", V_D_FROMDATE);
//            cstmt.setString("V_D_TODATE", V_D_TODATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PP_INFORMATION_LIST");
        return result;
    }

    public HashMap PRO_PM_DEFECT_STATE_VIEW() throws SQLException {
        logger.info("begin PRO_PM_DEFECT_STATE_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_STATE_VIEW" + "(:V_CURSOR)}");
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
        logger.info("end PRO_PM_DEFECT_STATE_VIEW");
        return result;
    }

    public HashMap PRO_PP_INFORMATION_WITHD_LIST3(final String V_V_PERSONCODE, final String V_V_DEPT, final String V_V_TYPE, final String V_V_CLASSTYPE, final String V_V_TYPE_STATE, final String V_D_FROMDATE, final String V_D_TODATE) throws SQLException {
        logger.info("begin PRO_PP_INFORMATION_WITHD_LIST3");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PP_INFORMATION_WITHD_LIST3" + "(:V_V_PERSONCODE,:V_V_DEPT,:V_V_TYPE,:V_V_CLASSTYPE,:V_V_TYPE_STATE,:V_D_FROMDATE,:V_D_TODATE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_CLASSTYPE", V_V_CLASSTYPE);
            cstmt.setString("V_V_TYPE_STATE", V_V_TYPE_STATE);
            if (V_D_FROMDATE.equals("")) {
                cstmt.setDate(V_D_FROMDATE, null);
            } else {
                cstmt.setDate(V_D_FROMDATE, java.sql.Date.valueOf(V_D_FROMDATE));
            }
            if (V_D_TODATE.equals("")) {
                cstmt.setDate(V_D_TODATE, null);
            } else {
                cstmt.setDate(V_D_TODATE, java.sql.Date.valueOf(V_D_TODATE));
            }
//            cstmt.setString("V_D_FROMDATE", V_D_FROMDATE);
//            cstmt.setString("V_D_TODATE", V_D_TODATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PP_INFORMATION_WITHD_LIST3");
        return result;
    }

    public HashMap PRO_PP_INFORMATION_WITHD_LIST2(final String V_V_PERSONCODE, final String V_V_DEPT, final String V_V_TYPE, final String V_V_CLASSTYPE, final String V_D_FROMDATE, final String V_D_TODATE) throws SQLException {
        logger.info("begin PRO_PP_INFORMATION_WITHD_LIST2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PP_INFORMATION_WITHD_LIST2" + "(:V_V_PERSONCODE,:V_V_DEPT,:V_V_TYPE,:V_V_CLASSTYPE,:V_D_FROMDATE,:V_D_TODATE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_CLASSTYPE", V_V_CLASSTYPE);
            if (V_D_FROMDATE.equals("")) {
                cstmt.setDate(V_D_FROMDATE, null);
            } else {
                cstmt.setDate(V_D_FROMDATE, java.sql.Date.valueOf(V_D_FROMDATE));
            }
            if (V_D_TODATE.equals("")) {
                cstmt.setDate(V_D_TODATE, null);
            } else {
                cstmt.setDate(V_D_TODATE, java.sql.Date.valueOf(V_D_TODATE));
            }
//            cstmt.setString("V_D_FROMDATE", V_D_FROMDATE);
//            cstmt.setString("V_D_TODATE", V_D_TODATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PP_INFORMATION_WITHD_LIST2");
        return result;
    }
}