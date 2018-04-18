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

    public HashMap BASE_FILE_IMAGE_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        System.out.println(V_V_GUID);
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_SEL" + "(:V_V_GUID,:V_NAME,:V_FILE)}");
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
        logger.info("end BASE_FILE_IMAGE_SEL");
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

    public HashMap PRO_PM_19_TOOLTYPE_SEL(String V_V_TOOLNAME, String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_PM_19_TOOLTYPE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_TOOLTYPE_SEL" + "(:V_V_TOOLNAME,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_TOOLNAME", V_V_TOOLNAME);
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
        logger.info("end PRO_PM_19_TOOLTYPE_SEL");
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
            cstmt = conn.prepareCall("{call BASE_JXBZ_BY_GXCODE_INS" + "(:V_V_JXGX_CODE,:V_V_JSYQ_CODE,:V_V_JSYQ_NAME,:V_CURSOR)}");
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
}