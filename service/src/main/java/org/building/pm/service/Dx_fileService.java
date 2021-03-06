package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.session.SqlSessionException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.Callable;


@Service
public class Dx_fileService {
    private static final Logger logger = Logger.getLogger(Dx_fileService.class.getName());

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

    public HashMap PM_EDUNOTOWORKORDER(String V_EDUCODE) throws SQLException {
        logger.info("begin PM_EDUNOTOWORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EDUNOTOWORKORDER(:V_EDUCODE,:RET)}");
            cstmt.setString("V_EDUCODE", V_EDUCODE);
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
        logger.info("end PM_EDUNOTOWORKORDER");
        return result;
    }

    //--附件类型
    public HashMap FILETYPE_GETLIST(String SIGN) throws SQLException {
        logger.info("begin FILETYPE_GETLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call FILETYPE_GETLIST(:SIGN,:RET)}");
            cstmt.setString("SIGN", SIGN);
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
        logger.info("end FILETYPE_GETLIST");
        return result;
    }

    public Map PM_03_PLAN_PROJECT_FILE_SEL2(String V_V_GUID, String V_V_FILEGUID, String V_V_FILENAME, String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_PROJECT_FILE_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_FILE_SEL2" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_TYPE,:V_COUNT,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("V_COUNT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_COUNT", (String) cstmt.getObject("V_COUNT"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_PROJECT_FILE_SEL2");
        return result;
    }

    /*检修模型添加附件*/
    public Map PM_MODEL_FILE_ADD(String V_V_FILENAME, InputStream V_V_BLOB, String V_V_FILETYPE, String V_V_MODE_GUID, String V_V_INPERCODE, String V_V_INPERNAME, String V_V_TYPE)
            throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_ADD");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_ADD" + "(:V_V_FILENAME,:V_V_BLOB,:V_V_FILETYPE,:V_V_MODE_GUID,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_TYPE,:RET)}");
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_BLOB", V_V_BLOB);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_MODEL_FILE_ADD");
        return result;
    }

    /*检修模型附件下载*/
    public Map PM_MODEL_FILE_DOWN(String V_V_FILEGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_DOWN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_DOWN" + "(:V_V_FILEGUID,:V_V_BLOB,:RET)}");
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_V_BLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);

            cstmt.execute();
            result.put("V_V_BLOB", (Blob) cstmt.getObject("V_V_BLOB"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MODEL_FILE_DOWN");
        return result;
    }

    /*检修模型附件查询*/
    public HashMap PM_MODEL_FILE_SEL(String V_V_MODE_GUID, String V_V_TYPE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_SEL" + "(:V_V_MODE_GUID,:V_V_TYPE,:RET)}");
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_MODEL_FILE_SEL");
        return result;
    }

    /*检修模型附件删除*/
    public HashMap PM_MODEL_FILE_DEL(String V_V_FILEGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_DEL" + "(:V_V_FILEGUID,:RET)}");
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
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
        logger.info("end PM_MODEL_FILE_DEL");
        return result;
    }

    /*检修模型附件写入大修附件*/
    public HashMap PM_MODEL_FILE_INSERT_DXF(String V_V_GUID, String V_V_FILEGUID, String V_V_FILENAME, String V_V_INPERCODE, String V_V_INPERNAME, String V_V_TYPE, String V_V_FILETYPE, String V_V_MODE_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_INSERT_DXF");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_INSERT_DXF" + "(:V_V_GUID,:V_V_FILEGUID,: V_V_FILENAME,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_TYPE,:V_V_FILETYPE,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
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
        logger.info("end PM_MODEL_FILE_INSERT_DXF");
        return result;
    }

    public HashMap PM_MODEL_FILE_DEL_DXF(String V_V_GUID, String V_V_MODE_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_DEL_DXF");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_DEL_DXF" + "(:V_V_GUID,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
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
        logger.info("end PM_MODEL_FILE_DEL_DXF");
        return result;
    }

    //   大修查询模型附件
    public HashMap PM_MODEL_FILE_SEL_DXF(String V_V_GUID, String V_V_MODE_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_SEL_DXF");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_SEL_DXF" + "(:V_V_GUID,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
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
        logger.info("end PM_MODEL_FILE_SEL_DXF");
        return result;
    }

    /*--2018-11-07 岗位点检 */
    public HashMap BASE_INSPECT_DAY_SELECT(String V_EQUCODE, String V_PERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_DAY_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_DAY_SELECT" + "(:V_EQUCODE,:V_PERCODE,:RET)}");
            cstmt.setString(V_EQUCODE, V_EQUCODE);
            cstmt.setString("V_PERCODE", V_PERCODE);
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
        logger.info("end BASE_INSPECT_DAY_SELECT");
        return result;
    }

    public HashMap BASE_INSPECT_DAY_INSERT(String V_MAINGUID, String V_EQUCODE, String V_EQUNAME, String V_INSPECT_UNIT_CODE, String V_INSPECT_UNIT, String V_INSPECT_CONTENT,
                                           String V_INSPECT_STANDARD, String V_UUID, String V_PERCODE, String V_PERNAME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_DAY_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_DAY_INSERT" + "(:V_MAINGUID,:V_EQUCODE,:V_EQUNAME,:V_INSPECT_UNIT_CODE,:V_INSPECT_UNIT,:V_INSPECT_CONTENT,:V_INSPECT_STANDARD,:V_UUID,:V_PERCODE,:V_PERNAME,:RET)}");
            cstmt.setString(V_MAINGUID, V_MAINGUID);
            cstmt.setString(V_EQUCODE, V_EQUCODE);
            cstmt.setString("V_EQUNAME", V_EQUNAME);
            cstmt.setString(V_INSPECT_UNIT_CODE, V_INSPECT_UNIT_CODE);
            cstmt.setString("V_INSPECT_UNIT", V_INSPECT_UNIT);
            cstmt.setString(V_INSPECT_CONTENT, V_INSPECT_CONTENT);
            cstmt.setString("V_INSPECT_STANDARD", V_INSPECT_STANDARD);
            cstmt.setString(V_UUID, V_UUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString(V_PERNAME, V_PERNAME);
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
        logger.info("end BASE_INSPECT_DAY_INSERT");
        return result;
    }

    public HashMap BASE_INSPECT_DAY_UPDATE(String V_MAINGUID, String V_PERCODE, String V_UUID, String V_STATE_SIGN) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_DAY_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_DAY_UPDATE" + "(:V_MAINGUID,:V_PERCODE,:V_UUID,:V_STATE_SIGN,:RET)}");
            cstmt.setString("V_MAINGUID", V_MAINGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_UUID", V_UUID);
            cstmt.setString("V_STATE_SIGN", V_STATE_SIGN);

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
        logger.info("end BASE_INSPECT_DAY_UPDATE");
        return result;
    }

    public HashMap BASE_INSPECT_GETCLASS(String V_PERCODE, String DEPTCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_GETCLASS");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_GETCLASS" + "(:V_PERCODE,:DEPTCODE,:LOGINCLASS,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("DEPTCODE", DEPTCODE);

            cstmt.registerOutParameter("LOGINCLASS", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("LOGINCLASS", (String) cstmt.getObject("LOGINCLASS"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_GETCLASS");
        return result;
    }

    public HashMap BASE_INSPECT_GETNEXTPERSON(String SAP_WORK) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_GETNEXTPERSON");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_GETNEXTPERSON" + "(:SAP_WORK,:RET)}");
            cstmt.setString("SAP_WORK", SAP_WORK);
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
        logger.info("end BASE_INSPECT_GETNEXTPERSON");
        return result;
    }

    public HashMap BASE_INSPECT_WRITE_INSERT(String V_MAINGUID, String V_INPERCODE, String V_NEXTPRECODE, String V_INCLASS,
                                             String V_NEXTCLASS, String V_NCLASSNAME, String V_INSPECT_RESULTE, String V_REQUESTION, String V_EQUESTION,
                                             String V_OTHER_QIUEST) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_WRITE_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_WRITE_INSERT" + "(:V_MAINGUID,:V_INPERCODE,:V_NEXTPRECODE,:V_INCLASS,:V_NEXTCLASS,:V_NCLASSNAME,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:V_CHGUID,:RET)}");
            cstmt.setString("V_MAINGUID", V_MAINGUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_NEXTPRECODE", V_NEXTPRECODE);
            cstmt.setString("V_INCLASS", V_INCLASS);
            cstmt.setString("V_NEXTCLASS", V_NEXTCLASS);
            cstmt.setString("V_NCLASSNAME", V_NCLASSNAME);
            cstmt.setString("V_INSPECT_RESULTE", V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION", V_REQUESTION);
            cstmt.setString("V_EQUESTION", V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST", V_OTHER_QIUEST);

            cstmt.registerOutParameter("V_CHGUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CHGUID", (String) cstmt.getObject("V_CHGUID"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_WRITE_INSERT");
        return result;
    }

    public HashMap BASE_INSPECT_WRITE_UPDATE(String V_MAINGUID, String V_CHILDGUID, String V_PERCODE, String V_NEXT_CLASS,
                                             String V_NEXTPERCODE, String V_INSPECT_RESULTE, String V_REQUESTION, String V_EQUESTION, String V_OTHER_QIUEST) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_WRITE_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_WRITE_UPDATE" + "(:V_MAINGUID,:V_CHILDGUID,:V_PERCODE,:V_NEXT_CLASS,:V_NEXTPERCODE,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:RET)}");
            cstmt.setString("V_MAINGUID", V_MAINGUID);
            cstmt.setString("V_CHILDGUID", V_CHILDGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_NEXT_CLASS", V_NEXT_CLASS);
            cstmt.setString("V_NEXTPERCODE", V_NEXTPERCODE);
            cstmt.setString("V_INSPECT_RESULTE", V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION", V_REQUESTION);
            cstmt.setString("V_EQUESTION", V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST", V_OTHER_QIUEST);

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
        logger.info("end BASE_INSPECT_WRITE_UPDATE");
        return result;
    }

    public HashMap BASE_INSPECT_WRITE_SELECT(String V_MAINGUID, String V_CHILDGUID, String V_PERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_WRITE_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_WRITE_SELECT" + "(:V_MAINGUID,:V_CHILDGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_MAINGUID", V_MAINGUID);
            cstmt.setString("V_CHILDGUID", V_CHILDGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_WRITE_SELECT");
        return result;
    }

    //-------首页日检数量
    public HashMap BASE_INSPECT_WRITE_SELNUM(String V_PERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_WRITE_SELNUM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_WRITE_SELNUM" + "(:V_PERCODE,:NUM,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);

            cstmt.registerOutParameter("NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("NUM", (String) cstmt.getObject("NUM"));
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_WRITE_SELNUM");
        return result;
    }

    //---待办日检明细
    public HashMap BASE_INSPECT_SELTODOS(String V_CHILDGUID, String V_PERSON) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_SELTODOS");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_SELTODOS" + "(:V_CHILDGUID,:V_PERSON,:RET)}");
            cstmt.setString("V_CHILDGUID", V_CHILDGUID);
            cstmt.setString(V_PERSON, V_PERSON);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_SELTODOS");
        return result;
    }

    public HashMap BASE_INSPECT_WRITE_INSERT2(String V_MAINGUID, String V_CHILDGUID, String V_INPERCODE, String V_NEXTPRECODE, String V_INCLASS,
                                              String V_NEXTCLASS, String V_NCLASSNAME, String V_INSPECT_RESULTE, String V_REQUESTION, String V_EQUESTION,
                                              String V_OTHER_QIUEST) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_INSPECT_WRITE_INSERT2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_INSPECT_WRITE_INSERT2" + "(:V_MAINGUID,:V_CHILDGUID,:V_INPERCODE,:V_NEXTPRECODE,:V_INCLASS,:V_NEXTCLASS,:V_NCLASSNAME,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:V_CHGUID,:RET)}");
            cstmt.setString("V_MAINGUID", V_MAINGUID);
            cstmt.setString("V_CHILDGUID", V_CHILDGUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_NEXTPRECODE", V_NEXTPRECODE);
            cstmt.setString("V_INCLASS", V_INCLASS);
            cstmt.setString("V_NEXTCLASS", V_NEXTCLASS);
            cstmt.setString("V_NCLASSNAME", V_NCLASSNAME);
            cstmt.setString("V_INSPECT_RESULTE", V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION", V_REQUESTION);
            cstmt.setString("V_EQUESTION", V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST", V_OTHER_QIUEST);

            cstmt.registerOutParameter("V_CHGUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CHGUID", (String) cstmt.getObject("V_CHGUID"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_INSPECT_WRITE_INSERT2");
        return result;
    }

    //----周计划上报设备部
    public List<Map> PRO_PM_03_PLAN_WEEK_SEND2(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE,
                                               String V_V_FLOWCODE, String V_V_PLANTYPE,
                                               String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SEND2");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SEND2(:V_V_WEEKPLAN_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_SEND2");
        return result;
    }

    // plan report to find next person  week/month
    public HashMap PM_ACTIVITI_PROCESS_PER_SELSBB(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_REPAIRCODE, String V_V_FLOWTYPE, String V_V_FLOW_STEP, String V_V_PERCODE, String V_V_SPECIALTY, String V_V_WHERE) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_PER_SELSBB");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_PER_SELSBB" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_PROCESS_CODE,:V_V_WHERE,:V_CURSOR)}");
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
        logger.info("end PM_ACTIVITI_PROCESS_PER_SELSBB");
        return result;
    }

    //  plan report to sbb select date
    public HashMap PRO_PM_03_PLAN_WEEK_VIEWSBB(String V_V_YEAR, String V_V_MONTH, String V_V_WEEK, String V_V_ORGCODE, String V_V_DEPTCODE,
                                               String V_V_ZY, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_CONTENT, String V_V_STATE,
                                               String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_VIEWSBB");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_VIEWSBB(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_VIEWSBB");
        return result;
    }

    // 上报设备部周计划数据添加
    public List<Map> PRO_PM_03_PLAN_WEEK_SENDSBB(String V_V_GUID, String V_UPSBBPER) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SENDSBB");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SENDSBB(:V_V_GUID,:V_UPSBBPER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_UPSBBPER", V_UPSBBPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_SENDSBB");
        return result;
    }

    // SBB办理绑定周计划数据
    public HashMap PRO_PM_03_PLAN_WEEK_GET2(String V_V_WEEKPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GET2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GET2" + "(:V_V_WEEKPLAN_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_03_PLAN_WEEK_GET2");
        return result;
    }

    // 设备部管理业查询待办和已办数据
    public HashMap PM_03_PLAN_WEEK_SEL2(String V_V_YEAR, String V_V_MONTH, String V_V_WEEK,
                                        String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY,
                                        String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_CONTENT, String V_V_FLOWTYPE, String V_V_STATE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_SEL2");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK," +
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
        logger.info("end PM_03_PLAN_WEEK_SEL2");
        return result;
    }

    // month report to sbb data
    public HashMap PM_03_MONTH_PLAN_BYPER_SEL2(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_ZY, String V_V_CONTENT, String V_V_STATECODE, String V_V_PEROCDE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_BYPER_SEL2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_BYPER_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_BYPER_SEL2");
        return result;
    }

    // month report to sbb data view   PM_03_MONTH_PLAN_SEL2
    public HashMap PM_03_MONTH_PLAN_SEL2(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_ZY, String V_V_CONTENT, String V_V_STATECODE, String V_V_PEROCDE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_SEL2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_SEL2");
        return result;
    }

    //  SBB 月计划办理获取数据
    public HashMap PRO_PM_03_PLAN_MONTH_GET2(String V_V_MONTHPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_GET2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_GET2" + "(:V_V_MONTHPLAN_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_03_PLAN_MONTH_GET2");
        return result;
    }

    // 从新发起工单数据填报按钮
    public HashMap INSERT_RESTARTPROC() throws SQLException {
        logger.info("begin INSERT_RESTARTPROC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call INSERT_RESTARTPROC" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end INSERT_RESTARTPROC");
        return result;
    }

    // 备件使用情况查询
    public HashMap PRO_SPARE_SELECT2(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_EQUTYPE_CODE, String V_EQU_CODE, String V_V_SPARE) throws SQLException {
        logger.info("begin PRO_SPARE_SELECT2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SPARE_SELECT2(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_V_SPARE,:V_TOPNAME,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_V_SPARE", V_V_SPARE);
            cstmt.registerOutParameter("V_TOPNAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_TOPNAME"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SPARE_SELECT2");
        return result;
    }

    // 备件使用情况工单明细查询
    public HashMap PRO_SPARE_SELECT_WORKORDER(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_DEPTCODE, String V_V_DEPTNEXTCODE, String V_EQUTYPE_CODE, String V_EQU_CODE, String V_V_SPARE, String V_V_SAPRECODE) throws SQLException {
        logger.info("begin PRO_SPARE_SELECT_WORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SPARE_SELECT_WORKORDER(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_V_SPARE,:V_V_SAPRECODE,:V_TOPNAME,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_V_SPARE", V_V_SPARE);
            cstmt.setString("V_V_SAPRECODE", V_V_SAPRECODE);
            cstmt.registerOutParameter("V_TOPNAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_TOPNAME"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SPARE_SELECT_WORKORDER");
        return result;
    }

    public Map PRO_YEAR_PROJECT_MXUSE_SEL2(String V_V_PROJECTGUID, String V_V_TYPE, String V_SDATE, String V_EDATE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_MXUSE_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_MXUSE_SEL2" + "(:V_V_PROJECTGUID,:V_V_TYPE,:V_SDATE,:V_EDATE,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_MXUSE_SEL2");
        return result;
    }

    // 大修缺陷明细
    public Map PRO_YEAR_PROJECT_DEFECT_SEL(String V_V_PROJECTGUID, String V_SDATE, String V_EDATE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_DEFECT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_DEFECT_SEL(:V_V_PROJECTGUID,:V_SDATE,:V_EDATE,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_DEFECT_SEL");
        return result;
    }

    // 大修关联工单明细
    public Map PRO_YEAR_PROJECT_WORKORDER_SEL(String V_V_PROJECTGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_WORKORDER_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_WORKORDER_SEL(:V_V_PROJECTGUID,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_WORKORDER_SEL");
        return result;
    }

    // 周计划按人员查询作业区全部
    public HashMap PRO_PM_03_PLAN_WEEK_VIEW2(String V_V_YEAR, String V_V_MONTH, String V_V_WEEK, String V_V_ORGCODE, String V_V_DEPTCODE,
                                             String V_V_ZY, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_CONTENT, String V_V_STATE,
                                             String V_V_PERSONCODE, String V_V_DEPTTYPE, String V_V_INPER, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_VIEW2(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PERSONCODE,:V_V_DEPTTYPE,:V_V_INPER,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.setString("V_V_INPER", V_V_INPER);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_VIEW2");
        return result;
    }

    // 设备部驳回修改
    public Map PRO_PM_03_PLAN_WEEK_NSETSBB(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_WEEK,
                                           String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                           String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE,
                                           String V_V_JHMX_GUID, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER
            , String V_V_PDC/*,String V_V_SGDATE*/, String V_V_GYYQ, String V_V_CHANGPDC,/*String V_V_JXRESON,*/String V_V_JXHOUR, String V_V_JJHOUR,
            /*String V_V_JHHOUR,*/String V_V_TELNAME, String V_V_TELNUMB, String V_V_PDGG, String V_V_THICKNESS, String V_V_REASON, String V_V_EVERTIME
            , String V_V_FLAG, String V_V_RDEPATCODE, String V_V_RDEPATNAME, String V_V_SGWAY, String V_V_SGWAYNAME, String V_V_OPERANAME
    ) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_NSETSBB");
        Map result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_NSETSBB" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_OTHERPLAN_GUID,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER," +
                    ":V_V_PDC,/*:V_V_SGDATE,*/:V_V_GYYQ,:V_V_CHANGPDC,/*:V_V_JXRESON,*/:V_V_JXHOUR,:V_V_JJHOUR,/*:V_V_JHHOUR,*/:V_V_TELNAME,:V_V_TELNUMB,:V_V_PDGG," +
                    ":V_V_THICKNESS,:V_V_REASON,:V_V_EVERTIME,:V_V_FLAG,:V_V_RDEPATCODE,:V_V_RDEPATNAME,:V_V_SGWAY,:V_V_SGWAYNAME,:V_V_OPERANAME,:V_INFO)}");
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

            cstmt.setString("V_V_PDC", V_V_PDC);
            cstmt.setString("V_V_GYYQ", V_V_GYYQ);
            cstmt.setString("V_V_CHANGPDC", V_V_CHANGPDC);
            cstmt.setString("V_V_JXHOUR", V_V_JXHOUR);
            cstmt.setString("V_V_JJHOUR", V_V_JJHOUR);
            cstmt.setString("V_V_TELNAME", V_V_TELNAME);
            cstmt.setString("V_V_TELNUMB", V_V_TELNUMB);
            cstmt.setString("V_V_PDGG", V_V_PDGG);

            cstmt.setString("V_V_THICKNESS", V_V_THICKNESS);
            cstmt.setString("V_V_REASON", V_V_REASON);
            cstmt.setString("V_V_EVERTIME", V_V_EVERTIME);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_RDEPATCODE", V_V_RDEPATCODE);
            cstmt.setString("V_V_RDEPATNAME", V_V_RDEPATNAME);
            cstmt.setString("V_V_SGWAY", V_V_SGWAY);
            cstmt.setString("V_V_SGWAYNAME", V_V_SGWAYNAME);
            cstmt.setString("V_V_OPERANAME", V_V_OPERANAME);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_NSETSBB");
        return result;
    }

    // 修改上报设备部审批状态
    public HashMap PRO_PLAN_WEEK_SET_STASBB(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PLAN_WEEK_SET_STASBB");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PLAN_WEEK_SET_STASBB" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

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
        logger.info("end PRO_PLAN_WEEK_SET_STASBB");
        return result;
    }

    //设备部月计划驳回修改
    public Map PRO_PM_03_PLAN_MONTH_SETSBB(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                           String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE, String V_V_CONTENT,
                                           String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE, String V_V_JHMX_GUID,
                                           String V_V_HOUR, String V_V_BZ, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER,
                                           String V_V_SGWAY, String V_V_SGWAYNAME, String V_V_FLAG, String V_V_OPERANAME) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_SETSBB");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_SETSBB" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_FLV_V_OTHERPLAN_GUIDOWCODE,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER," +
                    ":V_V_SGWAY,:V_V_SGWAYNAME,:V_V_FLAG,:V_V_OPERANAME,:V_INFO)}");
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
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);
            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
            cstmt.setString("V_V_EXPECT_AGE", V_V_EXPECT_AGE);
            cstmt.setString("V_V_REPAIR_PER", V_V_REPAIR_PER);

            cstmt.setString("V_V_SGWAY", V_V_SGWAY);
            cstmt.setString("V_V_SGWAYNAME", V_V_SGWAYNAME);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_OPERANAME", V_V_OPERANAME);

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
        logger.info("end PRO_PM_03_PLAN_MONTH_SETSBB");
        return result;
    }

    // 月计划上报设备部修改状态
    public HashMap PRO_PLAN_MONTH_SET_STATESBB(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PLAN_MONTH_SET_STATESBB");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PLAN_MONTH_SET_STATESBB" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

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
        logger.info("end PRO_PLAN_MONTH_SET_STATESBB");
        return result;
    }

    // 大修生成工单查询
    public HashMap PM_PROJECT_WORKORDER_CREATE(String V_V_PROJECT_GUID, String V_V_INPERCODE) throws SQLException {

        logger.info("begin PM_PROJECT_WORKORDER_CREATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_WORKORDER_CREATE" + "(:V_V_PROJECT_GUID,:V_V_INPERCODE,:V_CURSOR)}");

            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);

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
        logger.info("end PM_PROJECT_WORKORDER_CREATE");
        return result;
    }

    public HashMap PM_1917_JXMX_DATA_SEL_WORKDESC(String V_V_MX_CODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_1917_JXMX_DATA_SEL_WORKDESC");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_DATA_SEL_WORKDESC(:V_V_MX_CODE,:RET)}");
            cstmt.setString("V_V_MX_CODE", V_V_MX_CODE);
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
        logger.info("end PM_1917_JXMX_DATA_SEL_WORKDESC");
        return result;
    }

    public HashMap PRO_YEAR_PROJECT_SEL_WORK(String DX_GUID, String STARTTIME, String ENDTIME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_SEL_WORK");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_SEL_WORK(:DX_GUID,:STARTTIME,:ENDTIME,:V_NUM,:RET)}");
            cstmt.setString("DX_GUID", DX_GUID);
            cstmt.setString("STARTTIME", STARTTIME);
            cstmt.setString("ENDTIME", ENDTIME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_SEL_WORK");
        return result;
    }

    //大修工单施工方-所有工单相关检修单位
    public HashMap PRO_YEAR_PROJECT_REDEPT_SEL(String V_V_PROJECTGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_REDEPT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_REDEPT_SEL(:V_V_PROJECTGUID,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);

            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_REDEPT_SEL");
        return result;
    }

    // 大修检修单位
    public HashMap PM_03_PLAN_REPAIR_DEPT_SEL2(String V_V_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_REPAIR_DEPT_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_REPAIR_DEPT_SEL2(:V_V_GUID,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_REPAIR_DEPT_SEL2");
        return result;
    }

    // 大修检修查询工单
    public HashMap PRO_YEAR_PROJECT_SEL_WORKGUID(String DX_GUID, String STARTTIME, String ENDTIME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_SEL_WORKGUID");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_SEL_WORKGUID(:DX_GUID,:STARTTIME,:ENDTIME,:RET)}");
            cstmt.setString("DX_GUID", DX_GUID);
            cstmt.setString("STARTTIME", STARTTIME);
            cstmt.setString("ENDTIME", ENDTIME);
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
        logger.info("end PRO_YEAR_PROJECT_SEL_WORKGUID");
        return result;
    }

    // 月计划厂矿执行率统计
    public HashMap PM_03_MONTH_PLAN_CKSTAT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_MONTH_PLAN_CKSTAT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_CKSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_03_MONTH_PLAN_CKSTAT_SEL");
        return result;
    }

    // 周计划厂矿执行率统计
    public HashMap PM_03_WEEK_PLAN_CKSTAT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_WEEK, String V_V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_WEEK_PLAN_CKSTAT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_WEEK_PLAN_CKSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_03_WEEK_PLAN_CKSTAT_SEL");
        return result;
    }

    // 月计划作业区执行率统计
    public HashMap PM_03_MONTH_PLAN_ZYQSTAT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_MONTH_PLAN_ZYQSTAT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_ZYQSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_03_MONTH_PLAN_ZYQSTAT_SEL");
        return result;
    }

    // 周计划作业区执行率统计
    public HashMap PM_03_WEEK_PLAN_ZYQSTAT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_WEEK, String V_V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_WEEK_PLAN_ZYQSTAT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_WEEK_PLAN_ZYQSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_03_WEEK_PLAN_ZYQSTAT_SEL");
        return result;
    }

    // 工单执行率
    public Map PRO_PM_DEPT_SORT(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_V_ORGCODE) throws  SQLException {
        logger.info("begin PRO_PM_DEPT_SORT");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEPT_SORT(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

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
        logger.info("end PRO_PM_DEPT_SORT");
        return result;
    }

    public HashMap PRO_PM_ORG_SORT(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_ORG_SORT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_ORG_SORT(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
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
        logger.info("end PRO_PM_DEPT_SORT");
        return result;
    }

    public HashMap PRO_03_PLAN_YEAR_GET(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZYCODE, String V_V_CXCODE,
                                        String V_V_YEARNAME, String V_V_PERNAME, String V_V_PERCODE, String V_V_PAGE, String V_V_PAGESIZE) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_03_PLAN_YEAR_GET");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_03_PLAN_YEAR_GET(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZYCODE,:V_V_CXCODE,:V_V_YEARNAME,:V_V_PERNAME,:V_V_PERCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZYCODE", V_V_ZYCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_YEARNAME", V_V_YEARNAME);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PRO_03_PLAN_YEAR_GET");
        return result;
    }

    public HashMap PRO_YEAR_TO_MONTH_GETY_BYM(String V_V_MONTHGUID) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_TO_MONTH_GETY_BYM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_YEAR_TO_MONTH_GETY_BYM(:V_V_MONTHGUID,:V_CURSOR)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
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
        logger.info("end PRO_YEAR_TO_MONTH_GETY_BYM");
        return result;
    }

    // 计划模型修改
    public HashMap PM_1921_PLAN_MX_DATA_UPDATE(String V_V_MX_CODE, String V_V_PERNUM, String V_V_LIFELONG) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_1921_PLAN_MX_DATA_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_MX_DATA_UPDATE(:V_V_MX_CODE,:V_V_PERNUM,:V_V_LIFELONG,:RET)}");
            cstmt.setString("V_V_MX_CODE", V_V_MX_CODE);
            cstmt.setString("V_V_PERNUM", V_V_PERNUM);
            cstmt.setString("V_V_LIFELONG", V_V_LIFELONG);

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
        logger.info("end PM_1921_PLAN_MX_DATA_UPDATE");
        return result;
    }

    //-年计划检修类别下拉列表
    public HashMap PM_YEAR_REPARI_SELECT() throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_YEAR_REPARI_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_YEAR_REPARI_SELECT(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_YEAR_REPARI_SELECT");
        return result;
    }

    // 年计划-计划模型选择
    public HashMap PM_PLAN_YEAR_GETMX_INSERT(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_REPAIRTYPE, String V_V_PLANTYPE, String V_V_PERCODE, String V_V_YEAR, String V_V_MONTH, String V_V_SUNTIME) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_GETMX_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_GETMX_INSERT(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRTYPE,:V_V_PLANTYPE,:V_V_PERCODE,:V_V_YEAR,:V_V_MONTH,:V_V_SUNTIME,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRTYPE", V_V_REPAIRTYPE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_SUNTIME", V_V_SUNTIME);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_GETMX_INSERT");
        return result;
    }

    // 年计划查询
    public HashMap PM_PLAN_YEAR_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_SEL");
        return result;
    }

    public HashMap PM_PLAN_YEAR_SEL_N(String v_v_year, String v_v_orgcode, String v_v_deptcode, String v_v_percode, String v_v_zy) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_N");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL_N(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:RET)}");
            cstmt.setString("V_V_YEAR", v_v_year);
            cstmt.setString("V_V_ORGCODE", v_v_orgcode);
            cstmt.setString("V_V_DEPTCODE", v_v_deptcode);
            cstmt.setString("V_V_PERCODE", v_v_percode);
            cstmt.setString("V_V_ZY", v_v_zy);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_SEL");
        return result;
    }

    // 年计划单条数据返回
    public HashMap PM_PLAN_YEAR_GETONE_SEL(String V_GUID) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_GETONE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_GETONE_SEL(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_GETONE_SEL");
        return result;
    }

    //- 年计划添加和修改
    public HashMap PM_PLAN_YEAR_INSERT(String V_GUID, String V_ORGCODE, String V_ORGNAME, String V_DEPTCODE, String V_DEPTNAME,
                                       String V_ZYCODE, String V_ZYNAME, String V_EQUCODE, String V_EQUTYPE, String V_REPAIRCONTENT,
                                       String V_PLANHOUR, String V_REPAIRTYPE, String V_REPAIRTYPENAME, String V_INPERCODE, String V_INPERNAME,
                                       String V_REMARK, String V_V_YEAR, String V_V_MONTH, String V_TGTIME, String V_JGTIME, String V_WXTYPECODE, String V_WXTYPENAME,
                                       String V_PTYPECODE, String V_PTYPENAME, String V_OLD_FLAG, String V_REDEPTCODE, String V_REDEPTNAME,
                                       String V_PLANDAY, String V_FZPERCODE, String V_FZPERNAME, String V_SGTYPECODE, String V_SGTYPENAME, String V_SCLBCODE, String V_SCLBNAME, String V_PRO_NAME) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_INSERT(:V_GUID,:V_ORGCODE,:V_ORGNAME,:V_DEPTCODE,:V_DEPTNAME," +
                    ":V_ZYCODE,:V_ZYNAME,:V_EQUCODE,:V_EQUTYPE,:V_REPAIRCONTENT," +
                    ":V_PLANHOUR,:V_REPAIRTYPE,:V_REPAIRTYPENAME,:V_INPERCODE,:V_INPERNAME," +
                    ":V_REMARK,:V_V_YEAR,:V_V_MONTH,:V_TGTIME,:V_JGTIME,:V_WXTYPECODE,:V_WXTYPENAME," +
                    ":V_PTYPECODE,:V_PTYPENAME," +
                    ":V_OLD_FLAG,:V_REDEPTCODE,:V_REDEPTNAME,:V_PLANDAY,:V_FZPERCODE,:V_FZPERNAME,:V_SGTYPECODE," +
                    ":V_SGTYPENAME,:V_SCLBCODE,:V_SCLBNAME,:V_PRO_NAME,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("V_DEPTNAME", V_DEPTNAME);
            cstmt.setString("V_ZYCODE", V_ZYCODE);
            cstmt.setString("V_ZYNAME", V_ZYNAME);
            cstmt.setString("V_EQUCODE", V_EQUCODE);
            cstmt.setString("V_EQUTYPE", V_EQUTYPE);
            cstmt.setString("V_REPAIRCONTENT", V_REPAIRCONTENT);
            cstmt.setString("V_PLANHOUR", V_PLANHOUR);
            cstmt.setString("V_REPAIRTYPE", V_REPAIRTYPE);
            cstmt.setString("V_REPAIRTYPENAME", V_REPAIRTYPENAME);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.setString("V_REMARK", V_REMARK);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);

            cstmt.setString("V_TGTIME", V_TGTIME);
            cstmt.setString("V_JGTIME", V_JGTIME);
            cstmt.setString("V_WXTYPECODE", V_WXTYPECODE);
            cstmt.setString("V_WXTYPENAME", V_WXTYPENAME);
            cstmt.setString("V_PTYPECODE", V_PTYPECODE);
            cstmt.setString("V_PTYPENAME", V_PTYPENAME);
            cstmt.setString("V_OLD_FLAG", V_OLD_FLAG);
            cstmt.setString("V_REDEPTCODE", V_REDEPTCODE);
            cstmt.setString("V_REDEPTNAME", V_REDEPTNAME);
            cstmt.setString("V_PLANDAY", V_PLANDAY);
            cstmt.setString("V_FZPERCODE", V_FZPERCODE);
            cstmt.setString("V_FZPERNAME", V_FZPERNAME);
            cstmt.setString("V_SGTYPECODE", V_SGTYPECODE);
            cstmt.setString("V_SGTYPENAME", V_SGTYPENAME);
            cstmt.setString("V_SCLBCODE", V_SCLBCODE);
            cstmt.setString("V_SCLBNAME", V_SCLBNAME);
            cstmt.setString("V_PRO_NAME", V_PRO_NAME);


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
        logger.info("end PM_PLAN_YEAR_INSERT");
        return result;
    }
    // 年计划删除

    public HashMap PM_PLAN_YEAR_DEL(String V_GUID) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_DEL(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

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
        logger.info("end PM_PLAN_YEAR_DEL");
        return result;
    }

    // 年计划上报
    public List<Map> PRO_PM_03_PLAN_YEAR_SEND(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE,
                                              String V_V_FLOWCODE, String V_V_PLANTYPE,
                                              String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_YEAR_SEND");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SEND(:V_V_WEEKPLAN_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_SEND");
        return result;
    }

    // 周月计划-工序调取
    public HashMap BASE_OPERATION_SEL(String V_PERCODE, String V_DPPTCODE, String V_ORGCODE, String V_FLAG) throws SQLException {
        List<Map> list = new ArrayList<>();
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_OPERATION_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_OPERATION_SEL(:V_PERCODE,:V_DPPTCODE,:V_ORGCODE,:V_FLAG,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_DPPTCODE", V_DPPTCODE);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_FLAG", V_FLAG);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_OPERATION_SEL");
        return result;
    }

    //- 年计划创建guid
    public HashMap PM_PLAN_YEAR_GET_NEWGUID(String V_GUID, String V_INPERCODE, String V_INPERNAME) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_GET_NEWGUID");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_GET_NEWGUID(:V_GUID,:V_INPERCODE ,:V_INPERNAME,:RET )}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);


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
        logger.info("end PM_PLAN_YEAR_GET_NEWGUID");
        return result;
    }

    //年计划关联模型添加
    public HashMap PM_PLAN_YEAR_RE_JXMOD_IN(String V_GUID, String V_EQUCODE, String V_MODCODE, String V_MODNAME, String V_MODBBH, String V_MODBZ) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_IN(:V_GUID,:V_EQUCODE,:V_MODCODE,:V_MODNAME,:V_MODBBH,:V_MODBZ,:RET )}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_EQUCODE", V_EQUCODE);
            cstmt.setString("V_MODCODE", V_MODCODE);
            cstmt.setString("V_MODNAME", V_MODNAME);
            cstmt.setString("V_MODBBH", V_MODBBH);
            cstmt.setString("V_MODBZ", V_MODBZ);

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
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_IN");
        return result;
    }

    // 年计划查询相关物料、机具等信息
    public Map PRO_YEAR_PLAN_MXUSE_SEL(String V_V_YEARGUID, String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PLAN_MXUSE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_MXUSE_SEL" + "(:V_V_YEARGUID,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_YEARGUID", V_V_YEARGUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PRO_YEAR_PLAN_MXUSE_SEL");
        return result;
    }

    // 年计划缺陷添加
    public HashMap PM_PLAN_YEAR_RE_DEFECT_IN(String V_GUID, String V_DEFECTCODE, String V_EQUCODE, String V_EQUNAME, String V_DEFECT_TYPE, String V_DEFECT_CONTENT, String V_DEFECT_DATE) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_IN(:V_GUID,:V_DEFECTCODE,:V_EQUCODE,:V_EQUNAME,:V_DEFECT_TYPE,:V_DEFECT_CONTENT,:V_DEFECT_DATE,:RET )}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_DEFECTCODE", V_DEFECTCODE);
            cstmt.setString("V_EQUCODE", V_EQUCODE);
            cstmt.setString("V_EQUNAME", V_EQUNAME);
            cstmt.setString("V_DEFECT_TYPE", V_DEFECT_TYPE);
            cstmt.setString("V_DEFECT_CONTENT", V_DEFECT_CONTENT);
            cstmt.setString("V_DEFECT_DATE", V_DEFECT_DATE);

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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_IN");
        return result;
    }

    //年计划缺陷查询
    public Map PM_PLAN_YEAR_RE_DEFECT_SEL(String V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_SEL" + "(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_SEL");
        return result;
    }

    //年计划模型查询
    public Map PM_PLAN_YEAR_RE_JXMOD_SEL(String V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_SEL" + "(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

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
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_SEL");
        return result;
    }

    //年计划缺陷删除
    public Map PM_PLAN_YEAR_RE_DEFECT_DEL(String V_GUID, String V_DEFECTCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_DEL" + "(:V_GUID,:V_DEFECTCODE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_DEFECTCODE", V_DEFECTCODE);

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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_DEL");
        return result;
    }

    //年计划模型删除
    public Map PM_PLAN_YEAR_RE_JXMOD_DEL(String V_GUID, String V_MODCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_DEL" + "(:V_GUID,:V_MODCODE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_MODCODE", V_MODCODE);

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
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_DEL");
        return result;
    }

    //大修作业区查看上报数量
    public Map PRO_PM_YEAR_GROUPEBY_DEPT() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_YEAR_GROUPEBY_DEPT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_YEAR_GROUPEBY_DEPT" + "(:RET)}");

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
        logger.info("end PRO_PM_YEAR_GROUPEBY_DEPT");
        return result;
    }

    //大修专业查看上报数量
    public Map PRO_PM_YEAR_GROUPEBY_ZY() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_YEAR_GROUPEBY_ZY");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_YEAR_GROUPEBY_ZY" + "(:RET)}");

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
        logger.info("end PRO_PM_YEAR_GROUPEBY_ZY");
        return result;
    }

    //-月计划统计表1查询
    public Map PRO_MONTH_EQU_STATIS_IN_SEL(String V_EOS_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE,
                                           String V_ORGNAME, String V_INPERCODE, String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MONTH_EQU_STATIS_IN_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MONTH_EQU_STATIS_IN_SEL" + "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_EOS_GUID", V_EOS_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", (String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MONTH_EQU_STATIS_IN_SEL");
        return result;
    }

    //-月计划统计表1-add
    public Map PRO_MONTH_EQU_STATIS_IN_IN(String V_EOS_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE, String V_ORGNAME, String V_EFPLAN, String V_EFHOUR, String V_EFACTUAL,
                                          String V_CPLAN, String V_CSNUM, String V_CCNUM, String V_CACT, String V_CUSEPLAN, String V_CUSEACTUAL, String V_DXPFPLAN, String V_DXPFACTUAL,
                                          String V_DXPFRATE, String V_DXTPLAN, String V_DXTACT, String V_DXTRATE, String V_COPTPLAN, String V_COPTACT, String V_XKOPTPLAN,
                                          String V_XKOPTACT, String V_SJSPLAN, String V_SJSACT, String V_QTSPLAN, String V_QTSACT, String V_INERTDATE, String V_INPERCODE,
                                          String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MONTH_EQU_STATIS_IN_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MONTH_EQU_STATIS_IN_IN" +
                    "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_EFPLAN,:V_EFHOUR,:V_EFACTUAL,:V_CPLAN,:V_CSNUM,:V_CCNUM,:V_CACT,:V_CUSEPLAN,:V_CUSEACTUAL," +
                    ":V_DXPFPLAN,:V_DXPFACTUAL,:V_DXPFRATE,:V_DXTPLAN,:V_DXTACT,:V_DXTRATE,:V_COPTPLAN,:V_COPTACT,:V_XKOPTPLAN,:V_XKOPTACT,:V_SJSPLAN,:V_SJSACT," +
                    ":V_QTSPLAN,:V_QTSACT,:V_INERTDATE,:V_INPERCODE,:V_INPERNAME,:RET)}");
            cstmt.setString("V_EOS_GUID", V_EOS_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_EFPLAN", V_EFPLAN);
            cstmt.setString("V_EFHOUR", V_EFHOUR);
            cstmt.setString("V_EFACTUAL", V_EFACTUAL);
            cstmt.setString("V_CPLAN", V_CPLAN);
            cstmt.setString("V_CSNUM", V_CSNUM);
            cstmt.setString("V_CCNUM", V_CCNUM);
            cstmt.setString("V_CACT", V_CACT);
            cstmt.setString("V_CUSEPLAN", V_CUSEPLAN);
            cstmt.setString("V_CUSEACTUAL", V_CUSEACTUAL);

            cstmt.setString("V_DXPFPLAN", V_DXPFPLAN);
            cstmt.setString("V_DXPFACTUAL", V_DXPFACTUAL);
            cstmt.setString("V_DXPFRATE", V_DXPFRATE);
            cstmt.setString("V_DXTPLAN", V_DXTPLAN);
            cstmt.setString("V_DXTACT", V_DXTACT);
            cstmt.setString("V_DXTRATE", V_DXTRATE);
            cstmt.setString("V_COPTPLAN", V_COPTPLAN);
            cstmt.setString("V_COPTACT", V_COPTACT);
            cstmt.setString("V_XKOPTPLAN", V_XKOPTPLAN);
            cstmt.setString("V_XKOPTACT", V_XKOPTACT);
            cstmt.setString("V_SJSPLAN", V_SJSPLAN);
            cstmt.setString("V_SJSACT", V_SJSACT);
            cstmt.setString("V_QTSPLAN", V_QTSPLAN);
            cstmt.setString("V_QTSACT", V_QTSACT);
            cstmt.setString("V_INERTDATE", V_INERTDATE);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);

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
        logger.info("end PRO_MONTH_EQU_STATIS_IN_IN");
        return result;
    }

    // MONTH SEL TABLE2
    public Map PM_MONTH_EQU_ORG_STATIS2_SEL(String V_EOS_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE,
                                            String V_ORGNAME, String V_INPERCODE, String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS2_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS2_SEL" + "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_EOS_GUID", V_EOS_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", (String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MONTH_EQU_ORG_STATIS2_SEL");
        return result;
    }

    // MONTH IN TABLE2
    public Map PM_MONTH_EQU_ORG_STATIS2_IN(String V_MAIN_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE, String V_ORGNAME, String V_PERCODE,
                                           String V_PERNAME, String V_DQ_PLAN, String V_DQ_HNUM, String V_DQ_CNUM, String V_DQ_ACT, String V_DL_PLAN,
                                           String V_DL_ACTUAL, String V_GD_PLAN, String V_GD_ACT, String V_DX_FPLAN, String V_DX_FACT,
                                           String V_DX_FRATE, String V_DX_TPLAN, String V_DX_TACT, String V_DX_TRATE, String V_REMARK) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS2_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS2_IN" +
                    "(:V_MAIN_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_PERCODE,:V_PERNAME,:V_DQ_PLAN,:V_DQ_HNUM,:V_DQ_CNUM,:V_DQ_ACT,:V_DL_PLAN," +
                    ":V_DL_ACTUAL,:V_GD_PLAN,:V_GD_ACT,:V_DX_FPLAN,:V_DX_FACT,:V_DX_FRATE,:V_DX_TPLAN,:V_DX_TACT,:V_DX_TRATE,:V_REMARK,:RET)}");
            cstmt.setString("V_MAIN_GUID", V_MAIN_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);
            cstmt.setString("V_DQ_PLAN", V_DQ_PLAN);
            cstmt.setString("V_DQ_HNUM", V_DQ_HNUM);
            cstmt.setString("V_DQ_CNUM", V_DQ_CNUM);
            cstmt.setString("V_DQ_ACT", V_DQ_ACT);
            cstmt.setString("V_DL_PLAN", V_DL_PLAN);

            cstmt.setString("V_DL_ACTUAL", V_DL_ACTUAL);
            cstmt.setString("V_GD_PLAN", V_GD_PLAN);
            cstmt.setString("V_GD_ACT", V_GD_ACT);
            cstmt.setString("V_DX_FPLAN", V_DX_FPLAN);
            cstmt.setString("V_DX_FACT", V_DX_FACT);
            cstmt.setString("V_DX_FRATE", V_DX_FRATE);
            cstmt.setString("V_DX_TPLAN", V_DX_TPLAN);
            cstmt.setString("V_DX_TACT", V_DX_TACT);
            cstmt.setString("V_DX_TRATE", V_DX_TRATE);
            cstmt.setString("V_REMARK", V_REMARK);

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
        logger.info("end PM_MONTH_EQU_ORG_STATIS2_IN");
        return result;
    }

    // MONTH SEL TABLE3
    public Map PM_MONTH_EQU_ORG_STATIS3_SEL(String V_V_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE,
                                            String V_ORGNAME, String V_INPERCODE, String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS3_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS3_SEL" + "(:V_V_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM", (String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MONTH_EQU_ORG_STATIS3_SEL");
        return result;
    }

    // MONTH IN TABLE3
    public Map PM_MONTH_EQU_ORG_STATIS3_IN(String V_MAIN_GUID, String V_YEAR, String V_MONTH, String V_ORGCODE, String V_ORGNAME,
                                           String V_INPERCODE, String V_INPERNAME, String V_PRO_Q_PLAN, String V_PRO_Q_ACT, String V_RAMARK) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS3_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS3_IN" +
                    "(:V_MAIN_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_PRO_Q_PLAN,:V_PRO_Q_ACT,:V_RAMARK,:RET)}");
            cstmt.setString("V_MAIN_GUID", V_MAIN_GUID);
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);

            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.setString("V_PRO_Q_PLAN", V_PRO_Q_PLAN);
            cstmt.setString("V_PRO_Q_ACT", V_PRO_Q_ACT);
            cstmt.setString("V_RAMARK", V_RAMARK);


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
        logger.info("end PM_MONTH_EQU_ORG_STATIS3_IN");
        return result;
    }

    //设备部月计划设备开和标准数据计划月报表统计
    public Map PM_MONTH_EQU_ORGCODE_SEL(String V_YEAR, String V_MONTH, String V_ORGCODE, String V_PERCODE, String V_SIGN) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORGCODE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORGCODE_SEL(:V_YEAR,:V_MONTH,:V_ORGCODE,:V_PERCODE,:V_SIGN,:RET)}");
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_MONTH", V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_SIGN", V_SIGN);
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
        logger.info("end PM_MONTH_EQU_ORGCODE_SEL");
        return result;
    }

    // MONTH 分解状态修改
    public Map PM_03_PLAN_MONTH_SIGN_UPDT(String V_V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_MONTH_SIGN_UPDT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_MONTH_SIGN_UPDT" +
                    "(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);


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
        logger.info("end PM_03_PLAN_MONTH_SIGN_UPDT");
        return result;
    }

    //月计划、年计划找周计划详情  PM_03_PLAN_MONTH_SEL_WEEKVIEW
    public Map PM_03_PLAN_MONTH_SEL_WEEKVIEW(String V_OTHERGRID, String V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_MONTH_SEL_WEEKVIEW");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_MONTH_SEL_WEEKVIEW(:V_OTHERGRID,:V_TYPE,:RET)}");
            cstmt.setString("V_OTHERGRID", V_OTHERGRID);
            cstmt.setString("V_TYPE", V_TYPE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PM_03_PLAN_MONTH_SEL_WEEKVIEW");
        return result;
    }

    //预装件备件信息修改
    public Map PRO_PRELOADWARECOMPONENT_SET(String V_V_MODELNUMBER, String V_V_SPCODE, String N_N_NUMBER, String V_V_SIZE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PRELOADWARECOMPONENT_SET");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PRELOADWARECOMPONENT_SET(:V_V_MODELNUMBER,:V_V_SPCODE,:N_N_NUMBER,:V_V_SIZE,:RET)}");
            cstmt.setString("V_V_MODELNUMBER", V_V_MODELNUMBER);
            cstmt.setString("V_V_SPCODE", V_V_SPCODE);
            cstmt.setString("N_N_NUMBER", N_N_NUMBER);
            cstmt.setString("V_V_SIZE", V_V_SIZE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PRO_PRELOADWARECOMPONENT_SET");
        return result;
    }

    //缺陷厂矿tab-bypersoncode
    public Map PRO_SELECT_ORG_BYPERCODE(String V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_SELECT_ORG_BYPERCODE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SELECT_ORG_BYPERCODE(:V_PERCODE,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PRO_SELECT_ORG_BYPERCODE");
        return result;
    }

    //根据厂矿查看对应每月缺陷数量
    public Map PM_07_DEFECT_STAT(String V_YEAR, String V_CKCODE, String V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_07_DEFECT_STAT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_07_DEFECT_STAT(:V_YEAR,:V_CKCODE,:V_PERCODE,:RET)}");
            cstmt.setString("V_YEAR", V_YEAR);
            cstmt.setString("V_CKCODE", V_CKCODE);
            cstmt.setString("V_PERCODE", V_PERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PM_07_DEFECT_STAT");
        return result;
    }

    public Map PM_07_DEFECT_STAT_N(String V_V_YEAR, String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_07_DEFECT_STAT_N");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_07_DEFECT_STAT_N(:V_V_YEAR,:V_V_PERCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);

            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PM_07_DEFECT_STAT_N");
        return result;
    }

    //sbb导入week_plan  设备部周计划管理页面
    public HashMap PRO_PM_03_PLAN_WEEK_IMPORT(String V_V_SBBGUID, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_HOUR, String V_LOCKPER, String V_LOCKPERNAME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_03_PLAN_WEEK_IMPORT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_IMPORT(:V_V_SBBGUID,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_HOUR,:V_LOCKPER,:V_LOCKPERNAME,:RET)}");
            cstmt.setString("V_V_SBBGUID", V_V_SBBGUID);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_LOCKPER", V_LOCKPER);
            cstmt.setString("V_LOCKPERNAME", V_LOCKPERNAME);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_IMPORT");
        return result;
    }

    //周月计划添加模型
    public HashMap PM_1921_PLAN_IN_MX_SET(String V_V_MX_NAME, String V_V_ORGCODE, String V_V_DEPTCODE,
                                          String V_V_SPECIALTY, String V_V_MENO, String V_V_INPER,
                                          String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_CONTEXT,
                                          String V_V_JXMX_CODE, String V_V_PERNUM, String V_V_LIFELONG,
                                          String V_V_MAIN_DEFECT, String V_V_SGWAY) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_1921_PLAN_IN_MX_SET");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_IN_MX_SET(:V_V_MX_NAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_MENO,:V_V_INPER," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTEXT,:V_V_JXMX_CODE,:V_V_PERNUM,:V_V_LIFELONG,:V_V_MAIN_DEFECT,:V_V_SGWAY,:RET)}");
            cstmt.setString("V_V_MX_NAME", V_V_MX_NAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_MENO", V_V_MENO);
            cstmt.setString("V_V_INPER", V_V_INPER);

            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTEXT", V_V_CONTEXT);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_PERNUM", V_V_PERNUM);
            cstmt.setString("V_V_LIFELONG", V_V_LIFELONG);

            cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
            cstmt.setString("V_V_SGWAY", V_V_SGWAY);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PM_1921_PLAN_IN_MX_SET");
        return result;
    }

    // 事故统计分析
    public HashMap PM_14_FAULT_ITEM_DATA_STAT(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                              String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                              String V_V_FAULT_YY, String V_STAR_DATE, String V_END_DATE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_14_FAULT_ITEM_DATA_STAT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_STAT(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE," +
                    ":V_V_FAULT_YY,:V_STAR_DATE,:V_END_DATE,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);

            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);

            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_STAR_DATE", V_STAR_DATE);
            cstmt.setString("V_END_DATE", V_END_DATE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_STAT");
        return result;
    }

    // 事故、故障月-设备类型统计
    public HashMap PM_14_FAULT_ITEM_STAT_NUM(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERSONCODE, String V_V_EQUTYPE
            , String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE, String V_V_FAULT_YY, String V_V_YEAR, String V_V_MONTH) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_14_FAULT_ITEM_STAT_NUM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_STAT_NUM(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERSONCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE," +
                    ":V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_YEAR,:V_V_MONTH,:MON_NUM,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);

            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);

            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_YEAR", V_V_YEAR);

            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.registerOutParameter("MON_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("NUM", cstmt.getString("MON_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end PM_14_FAULT_ITEM_STAT_NUM");
        }
        return result;
    }

    //年计划流程结束状态修改
    public HashMap PM_PLAN_YEAR_STATE_UPDATE(String V_GUID, String V_STATE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_STATE_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_STATE_UPDATE(:V_V_GUID,:V_V_STATE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_STATE", V_STATE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end PM_PLAN_YEAR_STATE_UPDATE");
        }
        return result;
    }

    //年计划流程驳回数据修改
    public HashMap PM_PLAN_YEAR_UPDATE(String V_GUID, String V_V_YEAR, String V_V_MONTH, String V_ORGCODE,
                                       String V_ORGNAME, String V_DEPTCODE, String V_DEPTNAME, String V_EQUTYPE
            , String V_EQUCODE, String V_ZYCODE, String V_ZYMANE, String V_CONTENT, String V_TGDATE, String V_JGDATE
            , String V_HOUR, String V_BZ, String V_INPERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_UPDATE(:V_GUID,:V_V_YEAR,:V_V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_DEPTCODE,:V_DEPTNAME,:V_EQUTYPE,:V_EQUCODE" +
                    ",:V_ZYCODE,:V_ZYMANE,:V_CONTENT,:V_TGDATE,:V_JGDATE,:V_HOUR,:V_BZ,:V_INPERCODE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("V_DEPTNAME", V_DEPTNAME);
            cstmt.setString("V_EQUTYPE", V_EQUTYPE);
            cstmt.setString("V_EQUCODE", V_EQUCODE);
            cstmt.setString("V_ZYCODE", V_ZYCODE);
            cstmt.setString("V_ZYMANE", V_ZYMANE);
            cstmt.setString("V_CONTENT", V_CONTENT);
            cstmt.setString("V_TGDATE", V_TGDATE);
            cstmt.setString("V_JGDATE", V_JGDATE);
            cstmt.setString("V_HOUR", V_HOUR);
            cstmt.setString("V_BZ", V_BZ);
            cstmt.setString("V_INPERCODE", V_INPERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end PM_PLAN_YEAR_UPDATE");
        }
        return result;
    }

    ////年计划放行计划查询
    public HashMap PM_PLAN_YEAR_SEL_FX(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY,
                                       String V_SDATE, String V_EDATE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_FX");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL_FX(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:V_SDATE,:V_EDATE,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end PM_PLAN_YEAR_SEL_FX");
        }
        return result;
    }

    //年计划大修查询
    public HashMap PRO_PM_03_PLAN_PROJECT_BYFX(String V_PRONAME, String V_ZY, String V_V_YEAR) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_03_PLAN_PROJECT_BYFX");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_BYFX(:V_PRONAME,:V_ZY,:V_V_YEAR,:RET)}");
            cstmt.setString("V_PRONAME", V_PRONAME);
            cstmt.setString("V_ZY", V_ZY);
            cstmt.setString("V_V_YEAR", V_V_YEAR);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end PRO_PM_03_PLAN_PROJECT_BYFX");
        }
        return result;
    }

    //年计划大修写入关联表
    public HashMap YEAR_TO_PROGUID_FX_INSERT(String V_YEARGUID, String V_PROGUID, String V_INPERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_PROGUID_FX_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_PROGUID_FX_INSERT(:V_YEARGUID,:V_PROGUID,:V_INPERCODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            logger.debug("result" + result);
            logger.info("end YEAR_TO_PROGUID_FX_INSERT");
        }
        return result;
    }

    //- 年计划分解创建guid
    public HashMap PM_PLAN_YEAR_GET_FJGUID(String V_GUID, String V_INPERCODE, String V_INPERNAME, String V_UPGUID) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_GET_FJGUID");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_GET_FJGUID(:V_GUID,:V_INPERCODE ,:V_INPERNAME,:V_UPGUID,:RET )}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.setString("V_UPGUID", V_UPGUID);

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
        logger.info("end PM_PLAN_YEAR_GET_FJGUID");
        return result;
    }

    //- 年计划添加和修改
    public HashMap PM_PLAN_YEAR_INSERT_FJ(String V_GUID, String V_ORGCODE, String V_ORGNAME, String V_DEPTCODE, String V_DEPTNAME,
                                          String V_ZYCODE, String V_ZYNAME, String V_EQUCODE, String V_EQUTYPE, String V_REPAIRCONTENT,
                                          String V_PLANHOUR, String V_REPAIRTYPE, String V_REPAIRTYPENAME, String V_INPERCODE, String V_INPERNAME,
                                          String V_REMARK, String V_V_YEAR, String V_V_MONTH, String V_TGTIME, String V_JGTIME, String V_WXTYPECODE, String V_WXTYPENAME,
                                          String V_PTYPECODE, String V_PTYPENAME, String V_OLD_FLAG, String V_REDEPTCODE, String V_REDEPTNAME,
                                          String V_PLANDAY, String V_FZPERCODE, String V_FZPERNAME, String V_SGTYPECODE, String V_SGTYPENAME, String V_SCLBCODE, String V_SCLBNAME, String V_PRO_NAME) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_INSERT_FJ");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_INSERT_FJ(:V_GUID,:V_ORGCODE,:V_ORGNAME,:V_DEPTCODE,:V_DEPTNAME," +
                    ":V_ZYCODE,:V_ZYNAME,:V_EQUCODE,:V_EQUTYPE,:V_REPAIRCONTENT," +
                    ":V_PLANHOUR,:V_REPAIRTYPE,:V_REPAIRTYPENAME,:V_INPERCODE,:V_INPERNAME," +
                    ":V_REMARK,:V_V_YEAR,:V_V_MONTH,:V_TGTIME,:V_JGTIME,:V_WXTYPECODE,:V_WXTYPENAME," +
                    ":V_PTYPECODE,:V_PTYPENAME," +
                    ":V_OLD_FLAG,:V_REDEPTCODE,:V_REDEPTNAME,:V_PLANDAY,:V_FZPERCODE,:V_FZPERNAME,:V_SGTYPECODE," +
                    ":V_SGTYPENAME,:V_SCLBCODE,:V_SCLBNAME,:V_PRO_NAME,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_ORGCODE", V_ORGCODE);
            cstmt.setString("V_ORGNAME", V_ORGNAME);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("V_DEPTNAME", V_DEPTNAME);
            cstmt.setString("V_ZYCODE", V_ZYCODE);
            cstmt.setString("V_ZYNAME", V_ZYNAME);
            cstmt.setString("V_EQUCODE", V_EQUCODE);
            cstmt.setString("V_EQUTYPE", V_EQUTYPE);
            cstmt.setString("V_REPAIRCONTENT", V_REPAIRCONTENT);
            cstmt.setString("V_PLANHOUR", V_PLANHOUR);
            cstmt.setString("V_REPAIRTYPE", V_REPAIRTYPE);
            cstmt.setString("V_REPAIRTYPENAME", V_REPAIRTYPENAME);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.setString("V_REMARK", V_REMARK);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);

            cstmt.setString("V_TGTIME", V_TGTIME);
            cstmt.setString("V_JGTIME", V_JGTIME);
            cstmt.setString("V_WXTYPECODE", V_WXTYPECODE);
            cstmt.setString("V_WXTYPENAME", V_WXTYPENAME);
            cstmt.setString("V_PTYPECODE", V_PTYPECODE);
            cstmt.setString("V_PTYPENAME", V_PTYPENAME);
            cstmt.setString("V_OLD_FLAG", V_OLD_FLAG);
            cstmt.setString("V_REDEPTCODE", V_REDEPTCODE);
            cstmt.setString("V_REDEPTNAME", V_REDEPTNAME);
            cstmt.setString("V_PLANDAY", V_PLANDAY);
            cstmt.setString("V_FZPERCODE", V_FZPERCODE);
            cstmt.setString("V_FZPERNAME", V_FZPERNAME);
            cstmt.setString("V_SGTYPECODE", V_SGTYPECODE);
            cstmt.setString("V_SGTYPENAME", V_SGTYPENAME);
            cstmt.setString("V_SCLBCODE", V_SCLBCODE);
            cstmt.setString("V_SCLBNAME", V_SCLBNAME);
            cstmt.setString("V_PRO_NAME", V_PRO_NAME);


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
        logger.info("end PM_PLAN_YEAR_INSERT_FJ");
        return result;
    }

    // 缺陷处理方式
    public HashMap DEFECT_PROCESS_WAY_SEL(String V_DEPTCODE, String V_PERCODE) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_PROCESS_WAY_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_PROCESS_WAY_SEL(:V_DEPTCODE,:V_PERCODE,:RET )}");
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("V_PERCODE", V_PERCODE);

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
        logger.info("end DEFECT_PROCESS_WAY_SEL");
        return result;
    }

    //维修计划无设备查缺陷
    public HashMap PRO_PM_DEFECT_SPECIL_SEL() throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_DEFECT_SPECIL_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_SPECIL_SEL(:RET )}");

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
        logger.info("end PRO_PM_DEFECT_SPECIL_SEL");
        return result;
    }

    // 大修从年计划选择查询
    public HashMap PM_PLAN_YEAR_SEL_BYWX(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY, String V_V_STATE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_BYWX");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL_BYWX(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:V_V_STATE,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_SEL_BYWX");
        return result;
    }

    //大修放行计划查询
    public HashMap PM_03_PLAN_YEAR_FX_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY,
                                          String V_SDATE, String V_EDATE, String V_V_SPECIALTY, String V_V_DEFECT, String V_V_FLAG) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_YEAR_FX_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_FX_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:V_SDATE,:V_EDATE,:V_V_SPECIALTY,:V_V_DEFECT,:V_V_FLAG,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
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
        logger.info("end PM_03_PLAN_YEAR_FX_SEL");
        return result;
    }

    // 根据放行编码插叙放行数据
    public HashMap MAINTAIN_RELEASE_POSTBACK_SEL(String FX_GUID, String V_SIGN) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_RELEASE_POSTBACK_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MAINTAIN_RELEASE_POSTBACK_SEL(:FX_GUID,:V_SIGN,:RET)}");
            cstmt.setString("FX_GUID", FX_GUID);
            cstmt.setString("V_SIGN", V_SIGN);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
            logger.debug("result:" + result);
            logger.info("end MAINTAIN_RELEASE_POSTBACK_SEL");
        }
        return result;
    }

    //维修放行关联表写入
    public HashMap OVERHAUL_BY_MAINTAINRELEASE_IN(String V_FXGUID, String V_YEARGUID, String V_PERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin OVERHAUL_BY_MAINTAINRELEASE_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OVERHAUL_BY_MAINTAINRELEASE_IN(:V_FXGUID,:V_YEARGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_FXGUID", V_FXGUID);
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
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
        logger.info("end MAINTAIN_RELEASE_POSTBACK_SEL");
        return result;
    }

    //维修-计划选择删除原有缺陷
    public HashMap PM_03_PLAN_YEAR_DEF_DEL(String V_V_PROJCET_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_YEAR_DEF_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_DEF_DEL(:V_V_PROJCET_GUID,:V_INFO)}");
            cstmt.setString("V_V_PROJCET_GUID", V_V_PROJCET_GUID);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_DEF_DEL");
        return result;
    }

    //计划添加-删除原有大修设备
    public HashMap PM_03_PLAN_YEAR_EQU_BY_DEL(String V_V_PLANGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_YEAR_EQU_BY_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_EQU_BY_DEL(:V_V_PLANGUID,:V_INFO)}");
            cstmt.setString("V_V_PLANGUID", V_V_PLANGUID);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_EQU_BY_DEL");
        return result;
    }

    //计划添加-删除原有大修模型
    public HashMap PM_03_PLAN_YEAR_MOD_DEL(String V_V_PROJECT_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_YEAR_MOD_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_MOD_DEL(:V_V_PROJECT_GUID,:V_INFO)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_MOD_DEL");
        return result;
    }

    //维修计划修旧缺陷查询
    public Map PM_03_PROJECT_DEFECT_SEL_O(String V_V_PROJECT_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PROJECT_DEFECT_SEL_O" + "(:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
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
        logger.info("end PM_03_PROJECT_DEFECT_SEL_O");
        return result;
    }

    //放行-维修计划缺陷查询
    public Map PRO_BY_MAINTAIN_SEL_DEFECT(String V_FXGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_BY_MAINTAIN_SEL_DEFECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BY_MAINTAIN_SEL_DEFECT" + "(:V_FXGUID,:RET)}");
            cstmt.setString("V_FXGUID", V_FXGUID);
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
        logger.info("end PRO_BY_MAINTAIN_SEL_DEFECT");
        return result;
    }

    //放行-缺陷写入
    public Map MAINTAIN_BY_DEFECT_INSERT(String V_FXGUID, String V_DEFECTGUID, String V_INPER, String V_DEPT, String V_ORDCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_BY_DEFECT_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call MAINTAIN_BY_DEFECT_INSERT" + "(:V_FXGUID,:V_DEFECTGUID,:V_INPER,:V_DEPT,:V_ORDCODE,:RET)}");
            cstmt.setString("V_FXGUID", V_FXGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.setString("V_DEPT", V_DEPT);
            cstmt.setString("V_ORDCODE", V_ORDCODE);

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
        logger.info("end MAINTAIN_BY_DEFECT_INSERT");
        return result;
    }

    // 分解放行计划创建guid
    public HashMap PM_MAINTAIN_GET_FJGUID(String V_GUID, String V_INPERCODE, String V_INPERNAME, String V_UPGUID) throws Exception, SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MAINTAIN_GET_FJGUID");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MAINTAIN_GET_FJGUID(:V_GUID,:V_INPERCODE ,:V_INPERNAME,:V_UPGUID,:RET )}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INPERNAME", V_INPERNAME);
            cstmt.setString("V_UPGUID", V_UPGUID);

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
        logger.info("end PM_MAINTAIN_GET_FJGUID");
        return result;
    }

    //获取放行计划数据
    public Map PRO_MAINTAIN_REL_POST_GETONE_DATA(String V_FXGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MAINTAIN_REL_POST_GETONE_DATA");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_MAINTAIN_REL_POST_GETONE_DATA" + "(:V_FXGUID,:RET)}");
            cstmt.setString("V_FXGUID", V_FXGUID);
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
        logger.info("end PRO_MAINTAIN_REL_POST_GETONE_DATA");
        return result;
    }

    //放行计划子计划写入
    public HashMap MAINTAIN_RELEASE_POSTBACK_IN(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                                String V_V_DEPTCODE, String PROJECTCODE, String PROJECTNAME, String WBSCODE, String WBSNAME,
                                                String V_V_CONTENT, String V_V_MONEY, String REPAIR_DEPTCODE, String REPAIR_DEPTNAME, String V_V_FZR,
                                                String V_STARTDATE, String V_ENDDATE, String IN_PERCODE, String PROJECT_GUID, String V_UPGUID,
                                                String V_V_GUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_RELEASE_POSTBACK_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MAINTAIN_RELEASE_POSTBACK_IN(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:PROJECTCODE,:PROJECTNAME," +
                    ":WBSCODE,:WBSNAME,:V_V_CONTENT,:V_V_MONEY,:REPAIR_DEPTCODE,:REPAIR_DEPTNAME,:V_V_FZR,:V_STARTDATE,:V_ENDDATE,:IN_PERCODE," +
                    ":PROJECT_GUID,:V_UPGUID,:V_V_GUID,:RET)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("PROJECTCODE", PROJECTCODE);
            cstmt.setString("PROJECTNAME", PROJECTNAME);

            cstmt.setString("WBSCODE", WBSCODE);
            cstmt.setString("WBSNAME", WBSNAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_MONEY", V_V_MONEY);
            cstmt.setString("REPAIR_DEPTCODE", REPAIR_DEPTCODE);
            cstmt.setString("REPAIR_DEPTNAME", REPAIR_DEPTNAME);

            cstmt.setString("V_V_FZR", V_V_FZR);
            cstmt.setString("V_STARTDATE", V_STARTDATE);
            cstmt.setString("V_ENDDATE", V_ENDDATE);
            cstmt.setString("IN_PERCODE", IN_PERCODE);
            cstmt.setString("PROJECT_GUID", PROJECT_GUID);
            cstmt.setString("V_UPGUID", V_UPGUID);

            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end MAINTAIN_RELEASE_POSTBACK_IN");
        return result;
    }

    //放行sap作业区
    public Map PRO_BASE_DEPT_SAP_SEL(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_BASE_DEPT_SAP_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_SAP_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:RET)}");
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
        logger.info("end PRO_BASE_DEPT_SAP_SEL");
        return result;
    }

    //维修计划查询缺陷
    public Map PM_DEFECTTOFX_SELBYPRO(String V_V_PROJECT_GUID, String V_V_FLAG) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECTTOFX_SELBYPRO");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOFX_SELBYPRO" + "(:V_V_PROJECT_GUID,:V_V_FLAG,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_FLAG", V_V_FLAG);

            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECTTOFX_SELBYPRO");
        return result;
    }

//    //放行创建工单
//    public Map PRO_PM_WORKORDER_FX_CREATE(String V_V_PERCODE, String V_V_PERNAME, String V_FX_GUID) throws SQLException {
//        Map result = new HashMap();
//        Connection conn = null;
//        CallableStatement cstmt = null;
//        try {
//            logger.info("begin PRO_PM_WORKORDER_FX_CREATE");
//            conn = dataSources.getConnection();
//            conn.setAutoCommit(false);
//            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FX_CREATE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_FX_GUID,:V_CURSOR)}");
//            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
//            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
//            cstmt.setString("V_FX_GUID", V_FX_GUID);
//
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
//            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//        } catch (SQLException e) {
//            logger.error(e);
//        } finally {
//            cstmt.close();
//            conn.close();
//        }
//        logger.debug("result:" + result);
//        logger.info("end PRO_PM_WORKORDER_FX_CREATE");
//        return result;
//    }

    //缺陷解决方案写入
    public Map DEFECT_BY_MAINTAINPLAN_IN(String V_PROGUID, String V_DEFECTGUID, String V_INPERCODE,
                                         String V_INDEPT, String V_INORG, String V_DEF_SOLVE, String V_BJ_STUFF, String V_EQUCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAINPLAN_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAINPLAN_IN" + "(:V_PROGUID,:V_DEFECTGUID,:V_INPERCODE,:V_INDEPT,:V_INORG,:V_DEF_SOLVE,:V_BJ_STUFF,:V_EQUCODE,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);

            cstmt.setString("V_INDEPT", V_INDEPT);
            cstmt.setString("V_INORG", V_INORG);

            cstmt.setString("V_DEF_SOLVE", V_DEF_SOLVE);
            cstmt.setString("V_BJ_STUFF", V_BJ_STUFF);
            cstmt.setString("V_EQUCODE", V_EQUCODE);

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
        logger.info("end DEFECT_BY_MAINTAINPLAN_IN");
        return result;
    }

    //维修计划缺陷解决方案表删除
    public Map DEFECT_BY_MAINTAINPLAN_EQU_DEL(String V_DEFGUID, String V_PROGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAINPLAN_EQU_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAINPLAN_EQU_DEL" + "(:V_DEFGUID,:V_PROGUID,:RET)}");
            cstmt.setString("V_DEFGUID", V_DEFGUID);
            cstmt.setString("V_PROGUID", V_PROGUID);

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
        logger.info("end DEFECT_BY_MAINTAINPLAN_EQU_DEL");
        return result;
    }

    //维修计划缺陷解决方案表删除--无设备
    public Map DEFECT_BY_MAINTAINPLAN_UNEQU_DEL(String V_DEFGUID, String V_PROGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAINPLAN_UNEQU_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAINPLAN_UNEQU_DEL" + "(:V_DEFGUID,:V_PROGUID,:RET)}");
            cstmt.setString("V_DEFGUID", V_DEFGUID);
            cstmt.setString("V_PROGUID", V_PROGUID);

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
        logger.info("end DEFECT_BY_MAINTAINPLAN_UNEQU_DEL");
        return result;
    }

    //维修计划保存，缺陷日志写入
    public Map PM_DEFECT_LOG_BY_PRO(String V_PERCODE, String V_PERNAME, String V_PROGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_LOG_BY_PRO");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_BY_PRO" + "(:V_PERCODE,:V_PERNAME,:V_PROGUID,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);
            cstmt.setString("V_PROGUID", V_PROGUID);

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
        logger.info("end PM_DEFECT_LOG_BY_PRO");
        return result;
    }

    //计划添加维修计划删除原有缺陷方案
    public Map DEFECT_BY_MAINTAINPLAN_DEL(String V_PROGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAINPLAN_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAINPLAN_DEL" + "(:V_PROGUID,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);

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
        logger.info("end DEFECT_BY_MAINTAINPLAN_DEL");
        return result;
    }

    //维修计划-新缺陷日志
    public Map PM_DEFECT_LOG_FROMPRO_IN(String V_GUID, String V_PERCODE, String V_DEPTCODE,
                                        String V_ORG, String V_PASS_STAT, String V_DEFECTGUID,
                                        String V_DEF_TYPE, String V_DEF_LIST, String V_DEF_DATE,
                                        String V_BJ, String V_SOLVE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_LOG_FROMPRO_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_FROMPRO_IN" + "(:V_GUID,:V_PERCODE,:V_DEPTCODE," +
                    ":V_ORG,:V_PASS_STAT,:V_DEFECTGUID," +
                    ":V_DEF_TYPE,:V_DEF_LIST,:V_DEF_DATE,:V_BJ,:V_SOLVE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);

            cstmt.setString("V_ORG", V_ORG);
            cstmt.setString("V_PASS_STAT", V_PASS_STAT);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);

            cstmt.setString("V_DEF_TYPE", V_DEF_TYPE);
            cstmt.setString("V_DEF_LIST", V_DEF_LIST);
            cstmt.setString("V_DEF_DATE", V_DEF_DATE);

            cstmt.setString("V_BJ", V_BJ);
            cstmt.setString("V_SOLVE", V_SOLVE);

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
        logger.info("end PM_DEFECT_LOG_FROMPRO_IN");
        return result;
    }

    // 年计划待办查找
    public HashMap PM_PLAN_YEAR_GET(String V_V_GUID) throws SQLException {
        logger.info("begin PM_PLAN_YEAR_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_GET" + "(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PM_PLAN_YEAR_GET");
        return result;
    }

    //维修计划待办查找
    public HashMap PRO_PM_03_PLAN_PROJECT_GET(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_PROJECT_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_GET" + "(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_03_PLAN_PROJECT_GET");
        return result;
    }
    //审批页缺陷待办

    public HashMap PM_03_PROJECT_DEFECT_SEL_ALL(String V_V_PROJECT_GUID) throws SQLException {
        logger.info("begin PM_03_PROJECT_DEFECT_SEL_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PROJECT_DEFECT_SEL_ALL" + "(:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
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
        logger.info("end PM_03_PROJECT_DEFECT_SEL_ALL");
        return result;
    }

    //维修计划缺陷审批详情
    public HashMap PM_DEFECT_LOG_FROMPRO_NEW_SEL(String V_PROGUID, String V_DEFECTGUID) throws SQLException {
        logger.info("begin PM_DEFECT_LOG_FROMPRO_NEW_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_FROMPRO_NEW_SEL" + "(:V_PROGUID,:V_DEFECTGUID,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
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
        logger.info("end PM_DEFECT_LOG_FROMPRO_NEW_SEL");
        return result;
    }

    //维修计划流程结束-修改缺陷状态
    public HashMap PM_DEFECT_LOG_FROMPRO_LCJS(String V_PROGUID) throws SQLException {
        logger.info("begin PM_DEFECT_LOG_FROMPRO_LCJS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_FROMPRO_LCJS" + "(:V_PROGUID,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);

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
        logger.info("end PM_DEFECT_LOG_FROMPRO_LCJS");
        return result;
    }

    //维修计划关联缺陷日志
    public HashMap PROJECT_BY_DEFECT_LOG_IN(String V_PROGUID, String V_DEFECTGUID, String V_PERCODE,
                                            String V_DEPT, String V_ORG, String V_STATE) throws SQLException {
        logger.info("begin PROJECT_BY_DEFECT_LOG_IN");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PROJECT_BY_DEFECT_LOG_IN" + "(:V_PROGUID,:V_DEFECTGUID,:V_PERCODE,:V_DEPT," +
                    ":V_ORG,:V_STATE,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_DEPT", V_DEPT);
            cstmt.setString("V_ORG", V_ORG);
            cstmt.setString("V_STATE", V_STATE);
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
        logger.info("end PROJECT_BY_DEFECT_LOG_IN");
        return result;
    }

    // 工单物料日志明细
    public HashMap PM_WORKORDER_SPARE_LOG_IN(String ID, String ORDERGUID, String FETCHORDERGUID,
                                             String ACTIVITY, String MATERIALCODE, String MATERIALNAME,
                                             String SPEC, String UNIT, String I_F_UNITPRICE,
                                             String I_I_PLANAMOUNT, String I_F_PLANMONEY, String I_I_ACTUALAMOUNT,
                                             String I_F_ACTUALMONEY, String I_V_TYPE, String I_V_MEMO,
                                             String I_V_SUBTYPE, String I_V_STATUS, String I_I_ABANDONEDAMOUNT,
                                             String I_I_RECLAIMEDAMOUNT, String I_I_FIXEDAMOUNT, String I_V_ID,
                                             String KC_ID, String MAT_STATE, String INPERCODE,
                                             String INDEPT, String INORG) throws SQLException {
        logger.info("begin PM_WORKORDER_SPARE_LOG_IN");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKORDER_SPARE_LOG_IN" + "(:ID,:ORDERGUID,:FETCHORDERGUID,:ACTIVITY,:MATERIALCODE,:MATERIALNAME," +
                    ":SPEC,:UNIT,:I_F_UNITPRICE,:I_I_PLANAMOUNT,:I_F_PLANMONEY,:I_I_ACTUALAMOUNT,:I_F_ACTUALMONEY,:I_V_TYPE,:I_V_MEMO,:I_V_SUBTYPE," +
                    ":I_V_STATUS,:I_I_ABANDONEDAMOUNT,:I_I_RECLAIMEDAMOUNT,:I_I_FIXEDAMOUNT,:I_V_ID,:KC_ID,:MAT_STATE,:INPERCODE,:INDEPT,:INORG,:RET)}");
            cstmt.setString("ID", ID);
            cstmt.setString("ORDERGUID", ORDERGUID);
            cstmt.setString("FETCHORDERGUID", FETCHORDERGUID);
            cstmt.setString("ACTIVITY", ACTIVITY);
            cstmt.setString("MATERIALCODE", MATERIALCODE);
            cstmt.setString("MATERIALNAME", MATERIALNAME);

            cstmt.setString("SPEC", SPEC);
            cstmt.setString("UNIT", UNIT);
            cstmt.setString("I_F_UNITPRICE", I_F_UNITPRICE);
            cstmt.setString("I_I_PLANAMOUNT", I_I_PLANAMOUNT);
            cstmt.setString("I_F_PLANMONEY", I_F_PLANMONEY);
            cstmt.setString("I_I_ACTUALAMOUNT", I_I_ACTUALAMOUNT);

            cstmt.setString("I_F_ACTUALMONEY", I_F_ACTUALMONEY);
            cstmt.setString("I_V_TYPE", I_V_TYPE);
            cstmt.setString("I_V_MEMO", I_V_MEMO);
            cstmt.setString("I_V_SUBTYPE", I_V_SUBTYPE);
            cstmt.setString("I_V_STATUS", I_V_STATUS);
            cstmt.setString("I_I_ABANDONEDAMOUNT", I_I_ABANDONEDAMOUNT);

            cstmt.setString("I_I_RECLAIMEDAMOUNT", I_I_RECLAIMEDAMOUNT);
            cstmt.setString("I_I_FIXEDAMOUNT", I_I_FIXEDAMOUNT);
            cstmt.setString("I_V_ID", I_V_ID);
            cstmt.setString("KC_ID", KC_ID);
            cstmt.setString("MAT_STATE", MAT_STATE);
            cstmt.setString("INPERCODE", INPERCODE);

            cstmt.setString("INDEPT", INDEPT);
            cstmt.setString("INORG", INORG);
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
        logger.info("end PROJECT_BY_DEFECT_LOG_IN");
        return result;
    }

    //工单，删除物料写入日志
    public Map PM_WORKORDER_SPARE_SEL_INLOG(String V_I_ID, String V_INPERCODE, String V_INDEPT,
                                            String V_ORG) throws SQLException {
        logger.info("begin PM_WORKORDER_SPARE_SEL_INLOG");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKORDER_SPARE_SEL_INLOG" + "(:V_I_ID,:V_INPERCODE,:V_INDEPT,:V_ORG,:RET)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);
            cstmt.setString("V_INDEPT", V_INDEPT);
            cstmt.setString("V_ORG", V_ORG);

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
        logger.info("end PM_WORKORDER_SPARE_SEL_INLOG");
        return result;
    }

    //工单查找第一步审批人
    public Map PM_ACTIVITI_STEP_LOG_SEL(String V_GUID, String V_PRO_GUID, String V_BEFORE_STEP) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_ACTIVITI_STEP_LOG_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_STEP_LOG_SEL(:V_GUID,:V_PRO_GUID,:V_BEFORE_STEP,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_PRO_GUID", V_PRO_GUID);
            cstmt.setString("V_BEFORE_STEP", V_BEFORE_STEP);
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
        logger.info("end PM_ACTIVITI_STEP_LOG_SEL");
        return result;
    }

    //设备编码查找设备类型
    public Map PRO_SAP_EQU_P_SEL_TYPEC(String V_V_EQUCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_SAP_EQU_P_SEL_TYPEC");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_P_SEL_TYPEC(:V_V_EQUCODE,:V_V_EQUTYPE)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_V_EQUTYPE", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_V_EQUTYPE", (String) cstmt.getObject("V_V_EQUTYPE"));
        } catch (SQLException E) {
            logger.error(E);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_P_SEL_TYPEC");
        return result;
    }

    //工单物料改变写入
    public Map PRO_WORKORDER_MAT_CHANGE_IN(String V_WORKGUID, String V_SIGN) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_WORKORDER_MAT_CHANGE_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_MAT_CHANGE_IN(:V_WORKGUID,:V_SIGN,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);
            cstmt.setString("V_SIGN", V_SIGN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException E) {
            logger.error(E);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WORKORDER_MAT_CHANGE_IN");
        return result;
    }

    //工单物料是否改变查询
    public Map PRO_MAT_CHANGE_SIGN_SEL(String V_WORKGUID, String V_SIGN) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MAT_CHANGE_SIGN_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_MAT_CHANGE_SIGN_SEL(:V_WORKGUID,:V_SIGN,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);
            cstmt.setString("V_SIGN", V_SIGN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException E) {
            logger.error(E);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MAT_CHANGE_SIGN_SEL");
        return result;
    }

    //工单物料状态修改
    public Map PRO_WORKORDER_MAT_CHANGE_UPD(String V_WORKGUID, String V_SIGN) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_WORKORDER_MAT_CHANGE_UPD");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_MAT_CHANGE_UPD(:V_WORKGUID,:V_SIGN,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);
            cstmt.setString("V_SIGN", V_SIGN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException E) {
            logger.error(E);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WORKORDER_MAT_CHANGE_UPD");
        return result;
    }

    //工单生成新的 缺陷，原数据生成
    public Map PRO_PM_DEFECT_AUTO_NEW_IN(String V_DEFECTGUID, String V_PERCODE, String V_PERNAME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_DEFECT_AUTO_NEW_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_AUTO_NEW_IN(:V_DEFECTGUID,:V_PERCODE,:V_PERNAME,:RET)}");
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException E) {
            logger.error(E);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_AUTO_NEW_IN");
        return result;
    }

    //放行挂链页面放行计划查询
    public HashMap MAINTAIN_RELEASE_BY_DEFECT_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY,
                                                  String V_SDATE, String V_EDATE, String V_V_SPECIALTY, String V_V_DEFECT, String V_V_FLAG) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_RELEASE_BY_DEFECT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MAINTAIN_RELEASE_BY_DEFECT_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:V_SDATE,:V_EDATE,:V_V_SPECIALTY,:V_V_DEFECT,:V_V_FLAG,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
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
        logger.info("end MAINTAIN_RELEASE_BY_DEFECT_SEL");
        return result;
    }

    //查询已关联放行计划的缺陷
    public Map DEFECT_BY_MAINTAINPLAN_SEL(String V_PROGUID, String V_PERCODE, String V_DEPTCODE, String V_DATE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAINPLAN_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAINPLAN_SEL(:V_PROGUID,:V_PERCODE,:V_DEPTCODE,:V_DATE,:FXNUM,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("V_DATE", V_DATE);
            cstmt.registerOutParameter("FXNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("FXNUM", (String) cstmt.getString("FXNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DEFECT_BY_MAINTAINPLAN_SEL");
        return result;
    }

    //维修计划审批完成且未上报查询
    public Map PRO_PROPLAN_SP_FINISH_SELECT(String V_SBSIGN, String V_SCODE, String V_PERCODE, String V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PROPLAN_SP_FINISH_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PROPLAN_SP_FINISH_SELECT(:V_SBSIGN,:V_SCODE,:V_PERCODE,:V_ORGCODE,:RET)}");
            cstmt.setString("V_SBSIGN", V_SBSIGN);
            cstmt.setString("V_SCODE", V_SCODE);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_ORGCODE", V_ORGCODE);

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
        logger.info("end PRO_PROPLAN_SP_FINISH_SELECT");
        return result;
    }

    //维修计划查找缺陷
    public Map PM_DEFECT_BY_PROPASS_SEL(String V_V_PROGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_BY_PROPASS_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_BY_PROPASS_SEL(:V_V_PROGUID,:RET)}");
            cstmt.setString("V_V_PROGUID", V_V_PROGUID);

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
        logger.info("end PM_DEFECT_BY_PROPASS_SEL");
        return result;
    }


    //缺陷跟踪明细写入
    public Map PRO_PM_07_DEFECT_LOG_SET(String V_V_GUID, String V_V_LOGREMARK, String V_V_FINISHCODE, String V_V_KEY) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_07_DEFECT_LOG_SET");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_LOG_SET(:V_V_GUID,:V_V_LOGREMARK,:V_V_FINISHCODE,:V_V_KEY,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_LOGREMARK", V_V_LOGREMARK);
            cstmt.setString("V_V_FINISHCODE", V_V_FINISHCODE);
            cstmt.setString("V_V_KEY", V_V_KEY);

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
        logger.info("end PRO_PM_07_DEFECT_LOG_SET");
        return result;
    }

    //月计划选择年计划查询
    public HashMap PM_PLAN_YEAR_BASIC_TO_MON_SEL(String V_V_YEAR) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_BASIC_TO_MON_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_BASIC_TO_MON_SEL(:V_V_YEAR,:RET)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);

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
        logger.info("end PM_PLAN_YEAR_BASIC_TO_MON_SEL");
        return result;
    }

    //月计划填报-查询年计划单条数据
    public HashMap PM_PLAN_YEAR_BASIC_TOMON_GETONE(String V_YEAEGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_BASIC_TOMON_GETONE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_BASIC_TOMON_GETONE(:V_YEAEGUID,:RET)}");
            cstmt.setString("V_YEAEGUID", V_YEAEGUID);

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
        logger.info("end PM_PLAN_YEAR_BASIC_TOMON_GETONE");
        return result;
    }

    //月计划创建guid
    public HashMap PM_03_PLAN_MONTH_CREATE(String V_PERCODE, String V_V_ORGCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_MONTH_CREATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_MONTH_CREATE(:V_PERCODE,:V_V_ORGCODE,:RET)}");
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_MONTH_CREATE");
        return result;
    }

    //月计划缺陷关联写入
    public HashMap YEAR_TO_MONTH_IN(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PERCODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_MONTH_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_IN(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_IN");
        return result;
    }

    //年计划无缺陷时月计划缺陷内容查找
    public HashMap YEAR_TO_MONTH_SEL(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PER_CODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_MONTH_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_SEL(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PER_CODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PER_CODE", V_PER_CODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_SEL");
        return result;
    }

    //月计划保存-无缺陷年计划修改状态
    public HashMap YEAR_TO_MONTH_UPDATE(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PER_CODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_MONTH_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_UPDATE(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PER_CODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PER_CODE", V_PER_CODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_UPDATE");
        return result;
    }

    //月计划删除-无缺陷年计划修改状态
    public HashMap YEAR_TO_MONTH_DEL(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PER_CODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_MONTH_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_DEL(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PER_CODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PER_CODE", V_PER_CODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_DEL");
        return result;
    }

    //维修计划审批完成-上报页查询
    public HashMap PRO_PM_03_PLAN_YEAR_SP_FINISH(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_SP_FINISH");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SP_FINISH" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SP_FINISH");
        return result;
    }

    //根据工单编码查找放行唯一码
    public HashMap MAINTAIN_TO_WORKORDER_NUM_SEL(String V_WORKGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_TO_WORKORDER_NUM_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MAINTAIN_TO_WORKORDER_NUM_SEL(:V_WORKGUID,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end MAINTAIN_TO_WORKORDER_NUM_SEL");
        return result;
    }

    //月计划修改页-日志记录
    public HashMap YEAR_TO_MONTH_UPDATE2(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PER_CODE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin YEAR_TO_MONTH_UPDATE2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_UPDATE2(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PER_CODE,:RET)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PER_CODE", V_PER_CODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_UPDATE2");
        return result;
    }

    // 年计划审批完成查询
    public HashMap PM_PLAN_YEAR_SEL_SPFINISH(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PERCODE, String V_V_ZY) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_SPFINISH");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL_SPFINISH(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:RET)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_SEL_SPFINISH");
        return result;
    }

    //    维修计划查询
    public HashMap PRO_PM_03_PLAN_YEAR_VIEW_TB(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW_TB");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW_TB" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW_TB");
        return result;
    }

    //维修计划批量上报-缺陷日志状态修改
    public Map PM_DEFECT_LOG_FROMPRO_PLIN(String V_WXGUID, String V_PERCODE, String V_DEPTCODE,
                                          String V_ORG, String V_PASS_STAT, String V_DEFECTGUID,
                                          String V_DEF_TYPE, String V_DEF_LIST, String V_DEF_DATE,
                                          String V_BJ, String V_SOLVE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_LOG_FROMPRO_PLIN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_FROMPRO_PLIN" + "(:V_WXGUID,:V_PERCODE,:V_DEPTCODE," +
                    ":V_ORG,:V_PASS_STAT,:V_DEFECTGUID," +
                    ":V_DEF_TYPE,:V_DEF_LIST,:V_DEF_DATE,:V_BJ,:V_SOLVE,:RET)}");
            cstmt.setString("V_WXGUID", V_WXGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);

            cstmt.setString("V_ORG", V_ORG);
            cstmt.setString("V_PASS_STAT", V_PASS_STAT);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);

            cstmt.setString("V_DEF_TYPE", V_DEF_TYPE);
            cstmt.setString("V_DEF_LIST", V_DEF_LIST);
            cstmt.setString("V_DEF_DATE", V_DEF_DATE);

            cstmt.setString("V_BJ", V_BJ);
            cstmt.setString("V_SOLVE", V_SOLVE);

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
        logger.info("end PM_DEFECT_LOG_FROMPRO_PLIN");
        return result;
    }

    //    查找周计划填报页未处理缺陷
    public Map PRO_PM_07_DEFECT_SELECT(String V_V_STATECODE,
                                       String X_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SELECT");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SELECT(:V_V_STATECODE,:X_PERSONCODE,:V_V_PAGE," +
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
        logger.info("end PRO_PM_07_DEFECT_SELECT");
        return result;
    }

    //查月计划关联缺陷
    public Map PRO_PM_07_DEFECT_SEL_RE_MONTH(String V_MONTHGUID, String V_V_STATECODE,
                                             String X_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SEL_RE_MONTH");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SEL_RE_MONTH(:V_MONTHGUID,:V_V_STATECODE,:X_PERSONCODE,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
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
        logger.info("end PRO_PM_07_DEFECT_SEL_RE_MONTH");
        return result;
    }

    //    周计划guid创建
    public Map PM_03_PLAN_WEEK_CREATE(String V_V_MONTHGUID, String V_V_DEFECTGUID,
                                      String V_V_ORGCODE, String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_CREATE");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_CREATE(:V_V_MONTHGUID,:V_V_DEFECTGUID,:V_V_ORGCODE,:V_V_PERCODE," +
                    ":RET)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_03_PLAN_WEEK_CREATE");
        return result;
    }

    //    周计划缺陷关联写入
    public Map PM_DEFECTTOWEEK_IN(String V_V_MONTHGUID, String V_V_WEEKGUID, String V_N_DEFECTGUID,
                                  String V_INPER, String V_DEFECTSTATE) throws SQLException {

        logger.info("begin PM_DEFECTTOWEEK_IN");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWEEK_IN(:V_V_MONTHGUID,:V_V_WEEKGUID,:V_N_DEFECTGUID,:V_INPER,:V_DEFECTSTATE," +
                    ":RET)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("V_N_DEFECTGUID", V_N_DEFECTGUID);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.setString("V_DEFECTSTATE", V_DEFECTSTATE);
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
        logger.info("end PM_DEFECTTOWEEK_IN");
        return result;
    }

    //查询月计划填入周计划数据
    public Map PM_03_PLAN_WEEK_GETONE(String MONGUID, String WEEKGUID) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_GETONE");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_GETONE(:MONGUID,:WEEKGUID,:RET)}");
            cstmt.setString("MONGUID", MONGUID);
            cstmt.setString("WEEKGUID", WEEKGUID);

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
        logger.info("end PM_03_PLAN_WEEK_GETONE");
        return result;
    }

    //修改周计划缺陷状态  PM_DEFECT_RE_WEEK_UPDATE
    public Map PM_DEFECT_RE_WEEK_UPDATE(String WEEK_GUID, String MONTH_GUID, String V_INPERCODE) throws SQLException {

        logger.info("begin PM_DEFECT_RE_WEEK_UPDATE");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_RE_WEEK_UPDATE(:WEEK_GUID,:MONTH_GUID,:V_INPERCODE," +
                    ":RET)}");
            cstmt.setString("WEEK_GUID", WEEK_GUID);
            cstmt.setString("MONTH_GUID", MONTH_GUID);
            cstmt.setString("V_INPERCODE", V_INPERCODE);

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
        logger.info("end PM_DEFECT_RE_WEEK_UPDATE");
        return result;
    }

    //    周计划添加页面月计划查询
    public Map PM_03_PLAN_SEL_TOWEEK(String V_V_YEAR, String V_V_QUARTER, String V_V_MONTH, String V_V_PLANTYPE, String V_V_ORGCODE,
                                     String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_ZY, String V_V_CONTENT,
                                     String V_V_PEROCDE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_PLAN_SEL_TOWEEK");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_SEL_TOWEEK" + "(:V_V_YEAR,:V_V_QUARTER,:V_V_MONTH,:V_V_PLANTYPE,:V_V_ORGCODE," +
                    ":V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");

            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);

            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_SEL_TOWEEK");
        return result;
    }

    //缺陷system标识查询
    public Map PM_DEFECT_SYSTEM_SIGN_SEL(String DEFECTGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_SYSTEM_SIGN_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_SYSTEM_SIGN_SEL(:DEFECTGUID,:RET)}");
            cstmt.setString("DEFECTGUID", DEFECTGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECT_SYSTEM_SIGN_SEL");
        return result;
    }

    //工单验收费用添加
    public Map PRO_PM_WORKORDER_MONEY_UPDATE(String V_WORKORDER, String V_V_MONEY) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_WORKORDER_MONEY_UPDATE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_MONEY_UPDATE(:V_WORKORDER,:V_V_MONEY,:RET)}");
            cstmt.setString("V_WORKORDER", V_WORKORDER);
            cstmt.setString("V_V_MONEY", V_V_MONEY);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_MONEY_UPDATE");
        return result;
    }

    //维修计划缺陷审批状态表格，缺陷删除
    public Map PM_DEFECT_LOG_FROMPRO_DEL(String V_PROGUID, String V_DEFECTGUID) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_LOG_FROMPRO_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_LOG_FROMPRO_DEL(:V_PROGUID,:V_DEFECTGUID,:RET)}");
            cstmt.setString("V_PROGUID", V_PROGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECT_LOG_FROMPRO_DEL");
        return result;
    }

    //月计划设备关联其他缺陷查找
    public Map PRO_PM_07_DEFECT_SELECT_EQU(String V_V_STATECODE,
                                           String X_PERSONCODE, String V_V_EQUCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SELECT_EQU");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SELECT_EQU(:V_V_STATECODE,:X_PERSONCODE,:V_V_EQUCODE,:V_V_PAGE," +
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
        logger.info("end PRO_PM_07_DEFECT_SELECT_EQU");
        return result;
    }

    //    生成周计划的月计划关联缺陷标记
    public Map YEAR_TO_MONTH_CH_WEEK_SIGN(String V_WEEKGUID) throws SQLException {

        logger.info("begin YEAR_TO_MONTH_CH_WEEK_SIGN");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_CH_WEEK_SIGN(:V_WEEKGUID,:RET)}");
            cstmt.setString("V_WEEKGUID", V_WEEKGUID);

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
        logger.info("end YEAR_TO_MONTH_CH_WEEK_SIGN");
        return result;
    }

    //工单附件上传
    public Map WORK_FILE_INSERT(String V_WORKGUID, String V_FILEGUID, String V_FILENAME, InputStream V_FILEBLOB, String V_FILETYPE,
                                String V_INTIME, String V_INPER, String V_REMARK, String V_BLANK, String V_FROMPAGE) throws SQLException {
        logger.info("begin WORK_FILE_INSERT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WORK_FILE_INSERT" + "(:V_WORKGUID,:V_FILEGUID,:V_FILENAME,:V_FILEBLOB,:V_FILETYPE," +
                    ":V_INTIME,:V_INPER,:V_REMARK,:V_BLANK,:V_FROMPAGE,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);
            cstmt.setString("V_FILEGUID", V_FILEGUID);
            cstmt.setString("V_FILENAME", V_FILENAME);
            cstmt.setBlob("V_FILEBLOB", V_FILEBLOB);
            cstmt.setString("V_FILETYPE", V_FILETYPE);
            cstmt.setString("V_INTIME", V_INTIME);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.setString("V_REMARK", V_REMARK);

            cstmt.setString("V_BLANK", V_BLANK);
            cstmt.setString("V_FROMPAGE", V_FROMPAGE);

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
        logger.info("end WORK_FILE_INSERT");
        return result;
    }

    //工单附件查找
    public Map WORK_FILE_SELECT(String V_WOEKGUID, String V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin WORK_FILE_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WORK_FILE_SELECT(:V_WOEKGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_WOEKGUID", V_WOEKGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);

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
        logger.info("end WORK_FILE_SELECT");
        return result;
    }

    //工单附件删除 WORK_FILE_DEL
    public Map WORK_FILE_DEL(String V_WORKGUID, String V_FILEGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin WORK_FILE_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WORK_FILE_DEL(:V_WORKGUID,:V_FILEGUID,:RET)}");
            cstmt.setString("V_WORKGUID", V_WORKGUID);
            cstmt.setString("V_FILEGUID", V_FILEGUID);

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
        logger.info("end WORK_FILE_DEL");
        return result;
    }

    //工单附件下载
    public Map WORK_FILE_DOWN(String V_FILEGUID) throws SQLException {
        logger.info("begin WORK_FILE_DOWN");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WORK_FILE_DOWN" + "(:V_FILECODE,:V_FILEBLOB,:V_FILENAME,:V_FILETYPECODE,:V_INFO)}");
            cstmt.setString("V_FILEGUID", V_FILEGUID);
            cstmt.registerOutParameter("V_FILEBLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_FILENAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FILETYPECODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.put("V_FILETYPECODE", (String) cstmt.getObject("V_FILETYPECODE"));
            result.put("V_FILENAME", (String) cstmt.getObject("V_FILENAME"));
            result.put("V_FILEBLOB", cstmt.getBlob("V_FILEBLOB"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end WORK_FILE_DOWN");
        return result;
    }

    //维修简版查询
    public Map PRO_PM_03_PLAN_YEAR_VIEW_E(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY,
                                          String V_V_QSTEXT, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW_E");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW_E" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_QSTEXT," +
                    ":V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);

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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW_E");
        return result;
    }

    //维修计划简版缺陷解决方案返回值
    public Map DEFECT_BY_MAINTAIN_JJFA_SEL(String V_DEFGUID, String V_PRO_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin DEFECT_BY_MAINTAIN_JJFA_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DEFECT_BY_MAINTAIN_JJFA_SEL" + "(:V_DEFGUID,:V_PRO_GUID,:V_V_DEPTCODE,:V_V_ZY,:V_V_QSTEXT)}");
            cstmt.setString("V_DEFGUID", V_DEFGUID);
            cstmt.setString("V_PRO_GUID", V_PRO_GUID);

            cstmt.registerOutParameter("JJFA", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("BJCL", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("JJFA", (String) cstmt.getObject("JJFA"));
            result.put("BJCL", (String) cstmt.getObject("BJCL"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException ex) {
            logger.info(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DEFECT_BY_MAINTAIN_JJFA_SEL");
        return result;
    }

    //简版维修计划保存
    public Map PRO_PM_03_PLAN_YEAR_SAVE(String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_ORGNAME, String V_V_DEPTCODE, String V_V_DEPTNAME, String V_V_PORJECT_CODE, String V_V_PORJECT_NAME, String V_V_SPECIALTY,
                                        String V_V_SPECIALTYNAME, String V_V_SPECIALTYMANCODE, String V_V_SPECIALTYMAN, String V_V_WXTYPECODE, String V_V_WXTYPENAME, String V_V_CONTENT,
                                        String V_V_MONEYBUDGET, String V_V_REPAIRDEPTCODE, String V_V_BDATE, String V_V_EDATE, String V_V_INMAN, String V_V_INMANCODE,
                                        String V_V_JHLB, String V_V_SCLB, String V_V_CPZL, String V_V_CPGX, String V_V_SGFS, String V_V_SFXJ, String V_V_ZBFS,
                                        String V_V_SZ, String V_V_GUID_UP, String V_V_WBS, String V_V_WBS_TXT, String V_V_SUMTIME, String V_V_SUMDATE, String V_V_SPECIALTY_ZX,
                                        String V_V_SPECIALTY_ZXNAME, String V_V_BJF, String V_V_CLF, String V_V_SGF, String V_V_QSTEXT, String V_V_WXCLASS) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_03_PLAN_YEAR_SAVE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SAVE" + "(:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_ORGNAME,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_PORJECT_CODE,:V_V_PORJECT_NAME,:V_V_SPECIALTY,:V_V_SPECIALTYNAME,:V_V_SPECIALTYMANCODE" +
                    ",:V_V_SPECIALTYMAN,:V_V_WXTYPECODE,:V_V_WXTYPENAME,:V_V_CONTENT,:V_V_MONEYBUDGET,:V_V_REPAIRDEPTCODE,:V_V_BDATE,:V_V_EDATE,:V_V_INMAN,:V_V_INMANCODE" +
                    ",:V_V_JHLB,:V_V_SCLB,:V_V_CPZL,:V_V_CPGX,:V_V_SGFS,:V_V_SFXJ,:V_V_ZBFS,:V_V_SZ,:V_V_GUID_UP,:V_V_WBS,:V_V_WBS_TXT,:V_V_SUMTIME,:V_V_SUMDATE,:V_V_SPECIALTY_ZX,:V_V_SPECIALTY_ZXNAME," +
                    ":V_V_BJF,:V_V_CLF,:V_V_SGF,:V_V_QSTEXT,:V_V_WXCLASS,:V_INFO,:V_V_PROCODE)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_PORJECT_CODE", V_V_PORJECT_CODE);
            cstmt.setString("V_V_PORJECT_NAME", V_V_PORJECT_NAME);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_SPECIALTYNAME", V_V_SPECIALTYNAME);
            cstmt.setString("V_V_SPECIALTYMANCODE", V_V_SPECIALTYMANCODE);
            cstmt.setString("V_V_SPECIALTYMAN", V_V_SPECIALTYMAN);
            cstmt.setString("V_V_WXTYPECODE", V_V_WXTYPECODE);
            cstmt.setString("V_V_WXTYPENAME", V_V_WXTYPENAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_MONEYBUDGET", V_V_MONEYBUDGET);
            cstmt.setString("V_V_REPAIRDEPTCODE", V_V_REPAIRDEPTCODE);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_INMAN", V_V_INMAN);
            cstmt.setString("V_V_INMANCODE", V_V_INMANCODE);
            cstmt.setString("V_V_JHLB", V_V_JHLB);
            cstmt.setString("V_V_SCLB", V_V_SCLB);
            cstmt.setString("V_V_CPZL", V_V_CPZL);
            cstmt.setString("V_V_CPGX", V_V_CPGX);
            cstmt.setString("V_V_SGFS", V_V_SGFS);
            cstmt.setString("V_V_SFXJ", V_V_SFXJ);
            cstmt.setString("V_V_ZBFS", V_V_ZBFS);
            cstmt.setString("V_V_SZ", V_V_SZ);
            cstmt.setString("V_V_GUID_UP", V_V_GUID_UP);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_SUMTIME", V_V_SUMTIME);
            cstmt.setString("V_V_SUMDATE", V_V_SUMDATE);
            cstmt.setString("V_V_SPECIALTY_ZX", V_V_SPECIALTY_ZX);
            cstmt.setString("V_V_SPECIALTY_ZXNAME", V_V_SPECIALTY_ZXNAME);
            cstmt.setString("V_V_BJF", V_V_BJF);
            cstmt.setString("V_V_CLF", V_V_CLF);
            cstmt.setString("V_V_SGF", V_V_SGF);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);
            cstmt.setString("V_V_WXCLASS", V_V_WXCLASS);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_PROCODE", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.put("V_V_PROCODE", (String) cstmt.getObject("V_V_PROCODE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_SAVE");
        return result;
    }

    //简版维修计划待办查找
    public HashMap PRO_PM_03_PLAN_PROJECT_NGET(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_PROJECT_NGET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_NGET" + "(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_03_PLAN_PROJECT_NGET");
        return result;
    }

    //    简版维修计划导出查找
    public Map PRO_PM_03_PLAN_YEAR_VIEW_ED(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY,
                                           String V_V_QSTEXT) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW_ED");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW_ED" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_QSTEXT," +
                    ":V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);

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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW_ED");
        return result;
    }

    //    维修计划状态修改
    public Map PM_03_PLAN_PROJECT_STAT_SET(String V_V_GUID, String V_V_STATE) throws SQLException {

        logger.info("begin PM_03_PLAN_PROJECT_STAT_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_STAT_SET" + "(:V_V_GUID,:V_V_STATE,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATE", V_V_STATE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
//            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_PROJECT_STAT_SET");
        return result;
    }

    //月计划查找缺陷添加缺陷  PRO_PM_07_DEFECT_SEL_RE_MONTH2
    public Map PRO_PM_07_DEFECT_SEL_RE_MONTH2(String V_MONTHGUID) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SEL_RE_MONTH2");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SEL_RE_MONTH2" + "(:V_MONTHGUID,:V_CURSOR)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);

//            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
//            String sunm = (String) cstmt.getObject("RET");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
//            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_SEL_RE_MONTH2");
        return result;
    }

    //    工单查询  缺陷详情
    public Map PRO_PM_DEFECT_SEL_FROM_WORK(String V_WORK_GUID) throws SQLException {

        logger.info("begin PRO_PM_DEFECT_SEL_FROM_WORK");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_SEL_FROM_WORK" + "(:V_WORK_GUID,:RET)}");
            cstmt.setString("V_WORK_GUID", V_WORK_GUID);

//            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
//            String sunm = (String) cstmt.getObject("RET");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
//            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_SEL_FROM_WORK");
        return result;
    }

    //    工单查询  缺陷详情
    public Map PRO_PM_SELECT_SEL_FROM_WORK(String V_WORK_GUID) throws SQLException {

        logger.info("begin PRO_PM_SELECT_SEL_FROM_WORK");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_SELECT_SEL_FROM_WORK" + "(:V_WORK_GUID,:RET)}");
            cstmt.setString("V_WORK_GUID", V_WORK_GUID);

//            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
//            String sunm = (String) cstmt.getObject("RET");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
//            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_SELECT_SEL_FROM_WORK");
        return result;
    }

    //缺陷查找工单
    public Map PRO_PM_WORKORDER_SEL_FROM_DEL(String V_DEL_GUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SEL_FROM_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SEL_FROM_DEL" + "(:V_DEL_GUID,:RET)}");
            cstmt.setString("V_DEL_GUID", V_DEL_GUID);

//            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
//            String sunm = (String) cstmt.getObject("RET");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
//            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SEL_FROM_DEL");
        return result;
    }

    //放行计划查找缺陷
    public Map MAINTAIN_BY_DEFECT_SEL(String V_FX_GUID) throws SQLException {
        logger.info("begin MAINTAIN_BY_DEFECT_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MAINTAIN_BY_DEFECT_SEL" + "(:V_FX_GUID,:RET)}");
            cstmt.setString("V_FX_GUID", V_FX_GUID);

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
        logger.info("end MAINTAIN_BY_DEFECT_SEL");
        return result;
    }

    //缺陷写入工单查询
    public Map PRO_PM_WORKORDER_FX_CREATE(String V_V_ORG_CODE, String V_PERCODE, String V_FXGUID, String V_V_DEFECTLIST) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_FX_CREATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FX_CREATE" + "(:V_V_ORG_CODE,:V_PERCODE,:V_FXGUID,:V_V_DEFECTLIST,:V_CURSOR)}");
            cstmt.setString("V_V_ORG_CODE", V_V_ORG_CODE);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_FXGUID", V_FXGUID);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);

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
        logger.info("end PRO_PM_WORKORDER_FX_CREATE");
        return result;
    }

    //工单查找缺陷
    public HashMap PM_DEFECT_SEL_TO_WORK(String V_V_WORKORDER_GUID, String V_V_FLAG) throws SQLException {

        logger.info("begin PM_DEFECT_SEL_TO_WORK");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_SEL_TO_WORK(:V_V_WORKORDER_GUID,:V_V_FLAG,:V_CURSOR)}");
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
        logger.info("end PM_DEFECT_SEL_TO_WORK");
        return result;
    }

    //周计划--备件查找
    public HashMap PRO_DEFECT_PART_DATA_SEL_N(String V_V_TYPE, String V_V_INPER,
                                              String V_V_STATE, String V_V_PAGE, String V_V_PAGESIZE
    ) throws SQLException {

        logger.info("begin PRO_DEFECT_PART_DATA_SEL_N");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DEFECT_PART_DATA_SEL_N(:V_V_TYPE,:V_V_INPER," +
                    ":V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_INPER", V_V_INPER);

            cstmt.setString("V_V_STATE", V_V_STATE);
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
        logger.info("end PRO_DEFECT_PART_DATA_SEL_N");
        return result;
    }

    //周计划生成工单webcode判断
    public HashMap PM_03_PLAN_WBS_COMPARE(String V_V_GUID) throws SQLException {

        logger.info("begin PM_03_PLAN_WBS_COMPARE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WBS_COMPARE(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_WBS_COMPARE");
        return result;
    }

    //周计划关联缺陷
    public HashMap PM_DEFECTTOWEEK_SEL(String V_WEEKGUID) throws SQLException {

        logger.info("begin PM_DEFECTTOWEEK_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWEEK_SEL(:V_WEEKGUID,:RET)}");
            cstmt.setString("V_WEEKGUID", V_WEEKGUID);

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
        logger.info("end PM_DEFECTTOWEEK_SEL");
        return result;
    }

    //周计划关联缺陷删除 PM_DEFECTTOWEEK_DEL
    public HashMap PM_DEFECTTOWEEK_DEL(String V_V_WEEKGUID, String DEF_GUID,String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_DEFECTTOWEEK_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWEEK_DEL(:V_V_WEEKGUID,:DEF_GUID,:V_V_PERCODE,:RET)}");
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("DEF_GUID", DEF_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECTTOWEEK_DEL");
        return result;
    }

    //周计划关联月计划写入-修改
    public HashMap PM_03_PLAN_WEEK_UPDATE(String V_V_MONTHGUID, String V_V_DEFECTGUID, String V_WEEKGUID) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_UPDATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_UPDATE(:V_V_MONTHGUID,:V_V_DEFECTGUID,:V_WEEKGUID,:RET)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_WEEKGUID", V_WEEKGUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_WEEK_UPDATE");
        return result;
    }

    //清除未保存 的周计划关联缺陷 PM_DEFECTTOWEEK_DELALL_OLD
    public HashMap PM_DEFECTTOWEEK_DELALL_OLD(String V_V_MONTHGUID, String V_V_WEEKGUID, String V_INPER, String V_DEFECTSTATE) throws SQLException {

        logger.info("begin PM_DEFECTTOWEEK_DELALL_OLD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWEEK_DELALL_OLD(:V_V_MONTHGUID,:V_V_WEEKGUID,:V_INPER,:V_DEFECTSTATE,:RET)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.setString("V_DEFECTSTATE", V_DEFECTSTATE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECTTOWEEK_DELALL_OLD");
        return result;
    }

    //查找未关联月计划的周计划关联缺陷
    public HashMap PM_03_PLAN_WEEK_GET_DEF(String WEEKGUID) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_GET_DEF");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_GET_DEF(:WEEKGUID,:RET)}");
            cstmt.setString("WEEKGUID", WEEKGUID);

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
        logger.info("end PM_03_PLAN_WEEK_GET_DEF");
        return result;
    }

    //修改周计划表格中主要缺陷
    public HashMap PRO_PLAN_WEEK_MAINDEF_UPDATE(String WEEK_GUID) throws SQLException {

        logger.info("begin PRO_PLAN_WEEK_MAINDEF_UPDATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PLAN_WEEK_MAINDEF_UPDATE(:WEEK_GUID,:RET)}");
            cstmt.setString("WEEK_GUID", WEEK_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("RET");
            result.put("RET", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PLAN_WEEK_MAINDEF_UPDATE");
        return result;
    }

    //缺陷保存过程-状态手动添加
    public Map PRO_PM_07_DEFECT_SET_STAT(String V_V_GUID, String V_V_PERCODE, String V_V_PERNAME, String V_V_INPERCODE, String V_V_INPERNAME, String V_V_DEFECTLIST, String V_V_SOURCECODE,
                                         String V_V_SOURCEID, String V_D_DEFECTDATE, String V_V_DEPTCODE, String V_V_EQUCODE,
                                         String V_V_EQUCHILDCODE, String V_V_IDEA, String V_V_LEVEL, String V_V_PROWAY, String V_STATE) throws SQLException {
        logger.info("begin PRO_PM_07_DEFECT_SET_STAT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SET_STAT" + "(:V_V_GUID,:V_V_PERCODE,:V_V_PERNAME,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_DEFECTLIST,:V_V_SOURCECODE," +
                    ":V_V_SOURCEID,:V_D_DEFECTDATE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_EQUCHILDCODE,:V_V_IDEA,:V_V_LEVEL,:V_V_PROWAY,:V_STATE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_SOURCEID", V_V_SOURCEID);
            cstmt.setString("V_D_DEFECTDATE", V_D_DEFECTDATE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_LEVEL", V_V_LEVEL);
            cstmt.setString("V_V_PROWAY", V_V_PROWAY);
            cstmt.setString("V_STATE", V_STATE);
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
        logger.info("end PRO_PM_07_DEFECT_SET_STAT");
        return result;
    }

    //年计划缺陷查询
    public Map PM_PLAN_YEAR_RE_DEFECT_SEL2(String V_V_QXLX, String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_SEL2" + "(:V_V_QXLX,:V_V_PERCODE,:RET)}");
            cstmt.setString("V_V_QXLX", V_V_QXLX);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_SEL2");
        return result;
    }

    public Map PM_DEFECTTOWORKORDER_DELDM(String V_V_MONTHGUID, String V_V_DEFECTGUID,String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECTTOWORKORDER_DELDM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_DELDM" + "(:V_V_MONTHGUID,:V_V_DEFECTGUID,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_DEFECTTOWORKORDER_DELDM");
        return result;
    }

    public Map PM_DEFECTTOWORKORDER_SETDM(String V_V_DEFECTGUID, String V_V_MONTHGUID,String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECTTOWORKORDER_SETDM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SETDM" + "(:V_V_DEFECTGUID,:V_V_MONTHGUID,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_DEFECTTOWORKORDER_SETDM");
        return result;
    }

    public Map PM_DEFECTTOWORKORDER_SETDW(String V_V_DEFECTGUID, String V_V_WEEKGUID,String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECTTOWORKORDER_SETDW");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SETDW" + "(:V_V_DEFECTGUID,:V_V_WEEKGUID,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_DEFECTTOWORKORDER_SETDW");
        return result;
    }

    public Map PM_DEFECTTOWORKORDER_SETMW(String V_V_DEFECTGUID,String V_V_MONTHGUID, String V_V_WEEKGUID,String V_V_PERCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECTTOWORKORDER_SETMW");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWORKORDER_SETMW" + "(:V_V_DEFECTGUID,:V_V_MONTHGUID,:V_V_WEEKGUID,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_MONTHGUID", V_V_MONTHGUID);
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_DEFECTTOWORKORDER_SETMW");
        return result;
    }

    //放行生成工单缺陷表写入
    public Map MAINTAIN_BY_DEFECT_INSERT_TOWORK(String V_FXGUID, String V_DEFECTGUID, String V_INPER, String V_DEPT, String V_ORDCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin MAINTAIN_BY_DEFECT_INSERT_TOWORK");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call MAINTAIN_BY_DEFECT_INSERT_TOWORK" + "(:V_FXGUID,:V_DEFECTGUID,:V_INPER,:V_DEPT,:V_ORDCODE,:RET)}");
            cstmt.setString("V_FXGUID", V_FXGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.setString("V_DEPT", V_DEPT);
            cstmt.setString("V_ORDCODE", V_ORDCODE);

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
        logger.info("end MAINTAIN_BY_DEFECT_INSERT_TOWORK");
        return result;
    }

    //放行计划上报人调取
    public Map PM_WX_SBTABLE_SELECT(String V_ORG, String V_DEPT, String V_PER, String TEMP_1, String TEMP_2) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_WX_SBTABLE_SELECT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WX_SBTABLE_SELECT(:V_ORG,:V_DEPT,:V_PER,:TEMP_1,:TEMP_2,:V_INFO,:RET)}");
            cstmt.setString("V_ORG", V_ORG);
            cstmt.setString("V_DEPT", V_DEPT);
            cstmt.setString("V_PER", V_PER);
            cstmt.setString("TEMP_1", TEMP_1);
            cstmt.setString("TEMP_2", TEMP_2);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            String V_V_INFO = (String) cstmt.getString("V_INFO");
            result.put("V_INFO", V_V_INFO);
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WX_SBTABLE_SELECT");
        return result;
    }

    //是否为备件生成维修缺陷判别
    public Map PM_03_PLAN_YEAR_EQU_SELNUM(String V_V_PROGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_YEAR_EQU_SELNUM");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_EQU_SELNUM(:V_V_PROGUID,:RET)}");
            cstmt.setString("V_V_PROGUID", V_V_PROGUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
//            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            String RET = (String) cstmt.getString("RET");
            result.put("RET", RET);
//            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_EQU_SELNUM");
        return result;
    }

    //维修查看所有类别关联缺陷详情列表
    public Map PM_03_PROJECT_DEFECT_SEL_Q(String V_V_PROJECT_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PROJECT_DEFECT_SEL_Q" + "(:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
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
        logger.info("end PM_03_PROJECT_DEFECT_SEL_Q");
        return result;
    }

    //   月计划删除缺陷修改 PRO_PM_DEL_MONTH_RE_DEF
    public Map PRO_PM_DEL_MONTH_RE_DEF(String V_V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_DEL_MONTH_RE_DEF");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEL_MONTH_RE_DEF(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getString("RET");
            result.put("RET", RET);

        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEL_MONTH_RE_DEF");
        return result;
    }

    //工单验收-缺陷关联工单 PM_DEFECT_RE_WORK_INSERT
    public Map PM_DEFECT_RE_WORK_INSERT(String V_V_WGUID, String V_DEFGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_DEFECT_RE_WORK_INSERT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_DEFECT_RE_WORK_INSERT(:V_V_WGUID,:V_DEFGUID,:RET)}");
            cstmt.setString("V_V_WGUID", V_V_WGUID);
            cstmt.setString("V_DEFGUID", V_DEFGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getString("RET");
            result.put("RET", RET);
        } catch (SQLException ex) {
            logger.error(ex);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_DEFECT_RE_WORK_INSERT");
        return result;
    }

    //周计划-按月计划设备查找其他缺陷
    public Map PRO_PM_07_DEFECT_SELECT_N(String V_V_STATECODE,
                                         String X_PERSONCODE, String V_V_EQUCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SELECT_N");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SELECT_N(:V_V_STATECODE,:X_PERSONCODE,:V_V_EQUCODE,:V_V_PAGE," +
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
        logger.info("end PRO_PM_07_DEFECT_SELECT_N");
        return result;
    }

    //月计划已选择缺陷查看
    public Map YEAR_TO_MONTH_LIST(String V_MONTHGUID, String V_PERCODE) throws SQLException {
        logger.info("begin YEAR_TO_MONTH_LIST");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_LIST(:V_MONTHGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_PERCODE", V_PERCODE);

//            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
//            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_LIST");
        return result;
    }

    //月计划缺陷关联删除
    public Map YEAR_TO_MONTH_SDEL(String V_MONTH_GUID, String V_DEF_GUID) throws SQLException {
        logger.info("begin YEAR_TO_MONTH_SDEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_SDEL(:V_MONTH_GUID,:V_DEF_GUID," +
                    ":RET)}");
            cstmt.setString("V_MONTH_GUID", V_MONTH_GUID);
            cstmt.setString("V_DEF_GUID", V_DEF_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
//            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_SDEL");
        return result;
    }

    //
    public Map MONTH_ADDDEF_EQUCODE_SEL(String V_MONTHGUID) throws SQLException {
        logger.info("begin MONTH_ADDDEF_EQUCODE_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MONTH_ADDDEF_EQUCODE_SEL(:V_MONTHGUID," +
                    ":RET)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);

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
        logger.info("end MONTH_ADDDEF_EQUCODE_SEL");
        return result;
    }

    public Map PM_MONTH_DEL_CHVALUE(String V_MONTHGUID) throws SQLException {
        logger.info("begin PM_MONTH_DEL_CHVALUE");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MONTH_DEL_CHVALUE(:V_MONTHGUID,:RET)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);

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
        logger.info("end PM_MONTH_DEL_CHVALUE");
        return result;
    }

    //PM_MONTH_OTHERDEL_STATCH
    public Map PM_MONTH_OTHERDEL_STATCH(String V_MONTHGUID) throws SQLException {
        logger.info("begin PM_MONTH_OTHERDEL_STATCH");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MONTH_OTHERDEL_STATCH(:V_MONTHGUID,:RET)}");
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);

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
        logger.info("end PM_MONTH_OTHERDEL_STATCH");
        return result;
    }

    //周计划删除状态修改
    public Map PM_DEFECTTOWEEK_DEL_ALL(String V_V_WEEKGUID, String V_INPER) throws SQLException {
        logger.info("begin PM_DEFECTTOWEEK_DEL_ALL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECTTOWEEK_DEL_ALL(:V_V_WEEKGUID,:V_INPER,:RET)}");
            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);
            cstmt.setString("V_INPER", V_INPER);

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
        logger.info("end PM_DEFECTTOWEEK_DEL_ALL");
        return result;
    }

    //月计划其他缺陷添加设备返回值
    public Map YEAR_TO_MONTH_SDEF_EQU(String V_YEARGUID, String V_MONTHGUID, String V_DEFECTGUID, String V_PER_CODE) throws SQLException {
        logger.info("begin YEAR_TO_MONTH_SDEF_EQU");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call YEAR_TO_MONTH_SDEF_EQU(:V_YEARGUID,:V_MONTHGUID,:V_DEFECTGUID,:V_PER_CODE,:EQU_CODE,:EQU_TYPE)}");
            cstmt.setString("V_YEARGUID", V_YEARGUID);
            cstmt.setString("V_MONTHGUID", V_MONTHGUID);
            cstmt.setString("V_DEFECTGUID", V_DEFECTGUID);
            cstmt.setString("V_PER_CODE", V_PER_CODE);
            cstmt.registerOutParameter("EQU_CODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("EQU_TYPE", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("EQU_CODE", (String) cstmt.getObject("EQU_CODE"));
            result.put("EQU_TYPE", (String) cstmt.getObject("EQU_TYPE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end YEAR_TO_MONTH_SDEF_EQU");
        return result;
    }

    //缺陷统计（设备部）
    public Map PRO_PM_07_DEF_SBBTJ_VIEW(String V_NF, String V_YF) throws SQLException {
        logger.info("begin PRO_PM_07_DEF_SBBTJ_VIEW");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEF_SBBTJ_VIEW(:V_NF,:V_YF,:RET)}");
            cstmt.setString("V_NF", V_NF);
            cstmt.setString("V_YF", V_YF);
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
        logger.info("end PRO_PM_07_DEF_SBBTJ_VIEW");
        return result;
    }

    //工单类型判别
    public Map PRO_MAINTAIN_BY_DEF_SELSIGN(String V_WORKORDER) throws SQLException {
        logger.info("begin PRO_MAINTAIN_BY_DEF_SELSIGN");
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_MAINTAIN_BY_DEF_SELSIGN(:V_WORKORDER,:RET)}");
            cstmt.setString("V_WORKORDER", V_WORKORDER);
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
        logger.info("end PRO_MAINTAIN_BY_DEF_SELSIGN");
        return result;
    }

    //维修计划备件查询
    public Map PRO_PM_DEFECT_SPECIL_SEL2(String V_DEPT_CODE) throws SQLException {
        logger.info("begin PRO_PM_DEFECT_SPECIL_SEL2");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_SPECIL_SEL2(:V_DEPT_CODE,:RET)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
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
        logger.info("end PRO_PM_DEFECT_SPECIL_SEL2");
        return result;
    }

    //工单接收、返回下一步人员查找
    public Map WORKCTR_TO_PERCODE_SEL(String V_V_REPAIRCODE, String V_V_EQUCODE) throws SQLException {
        logger.info("begin WORKCTR_TO_PERCODE_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call WORKCTR_TO_PERCODE_SEL(:V_V_REPAIRCODE,:V_V_EQUCODE,:RET)}");
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end WORKCTR_TO_PERCODE_SEL");
        return result;
    }

    //生产写实状态修改
    public Map PP_INFORMATION_STAT_UPDT(String V_ID, String V_STATE, String V_DEFCODE) throws SQLException {
        logger.info("begin PP_INFORMATION_STAT_UPDT");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PP_INFORMATION_STAT_UPDT(:V_ID,:V_STATE,:V_DEFCODE,:RET)}");
            cstmt.setString("V_ID", V_ID);
            cstmt.setString("V_STATE", V_STATE);
            cstmt.setString("V_DEFCODE", V_DEFCODE);
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
        logger.info("end PP_INFORMATION_STAT_UPDT");
        return result;
    }

    //生产写实完成处理
    public Map PP_INFORMATION_FINISH_IN(String V_ID, String V_PERCODE, String V_PERNAME, String V_REMARK) throws SQLException {
        logger.info("begin PP_INFORMATION_FINISH_IN");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PP_INFORMATION_FINISH_IN(:V_ID,:V_PERCODE,:V_PERNAME,:V_REMARK,:RET)}");
            cstmt.setString("V_ID", V_ID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);
            cstmt.setString("V_REMARK", V_REMARK);
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
        logger.info("end PP_INFORMATION_FINISH_IN");
        return result;
    }

    //缺陷处理导出查询
    public Map PRO_PM_07_DEFECT_EXPEXCEL(String V_V_STATECODE,
                                         String X_PERSONCODE, String PUT_PERNAME, String V_SIGN) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_EXPEXCEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_EXPEXCEL(:V_V_STATECODE,:X_PERSONCODE,:PUT_PERNAME,:V_SIGN,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.setString("PUT_PERNAME", PUT_PERNAME);
            cstmt.setString("V_SIGN", V_SIGN);
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
        logger.info("end PRO_PM_07_DEFECT_EXPEXCEL");
        return result;
    }

    /*外围计划删除写入*/
    public Map PM_PLAN_PROJECT_LOG_IN(String V_V_GUID,
                                      String V_PERCODE, String V_V_PERNAME, String V_OPINION) throws SQLException {

        logger.info("begin PM_PLAN_PROJECT_LOG_IN");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_PROJECT_LOG_IN(:V_V_GUID,:V_PERCODE,:V_V_PERNAME,:V_OPINION,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_OPINION", V_OPINION);
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
        logger.info("end PM_PLAN_PROJECT_LOG_IN");
        return result;
    }

    /*月计划删除写入*/
    public Map PM_PLAN_MONTH_LOG_IN(String V_V_GUID,
                                    String V_PERCODE, String V_PERNAME, String V_OPERATION) throws SQLException {

        logger.info("begin PM_PLAN_MONTH_LOG_IN");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_MONTH_LOG_IN(:V_V_GUID,:V_PERCODE,:V_PERNAME,:V_OPERATION,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);
            cstmt.setString("V_OPERATION", V_OPERATION);
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
        logger.info("end PM_PLAN_MONTH_LOG_IN");
        return result;
    }

    /*周计划删除写入*/
    public Map PM_PLAN_WEEK_LOG_IN(String V_V_GUID,
                                   String V_PERCODE, String V_PERNAME, String V_OPERATION) throws SQLException {

        logger.info("begin PM_PLAN_WEEK_LOG_IN");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_WEEK_LOG_IN(:V_V_GUID,:V_PERCODE,:V_PERNAME,:V_OPERATION,:RET)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.setString("V_PERNAME", V_PERNAME);
            cstmt.setString("V_OPERATION", V_OPERATION);
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
        logger.info("end PM_PLAN_WEEK_LOG_IN");
        return result;
    }

    //缺陷跟踪负责人
    public Map PRO_DEFECT_PER_VIEW_SEL(String V_V_DEPT, String V_V_EQUTYPE, String V_V_EQU) throws SQLException {

        logger.info("begin PRO_DEFECT_PER_VIEW_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DEFECT_PER_VIEW_SEL(:V_V_DEPT,:V_V_EQUTYPE,:V_V_EQU,:V_V_SNUM,:RET)}");
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQU", V_V_EQU);

            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DEFECT_PER_VIEW_SEL");
        return result;
    }

    //工单接收-厂矿下拉列表
    public Map PRO_BASE_ORG_FROMW_SEL(String WORKORDER) throws SQLException {

        logger.info("begin PRO_BASE_ORG_FROMW_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_ORG_FROMW_SEL(:WORKORDER,:RET)}");
            cstmt.setString("WORKORDER", WORKORDER);

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
        logger.info("end PRO_BASE_ORG_FROMW_SEL");
        return result;
    }

    //工单接收-检修单位下拉列表
    public Map PRO_BASE_DEPT_FROMW_SEL(String WORKORDER) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_FROMW_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_FROMW_SEL(:WORKORDER,:RET)}");
            cstmt.setString("WORKORDER", WORKORDER);

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
        logger.info("end PRO_BASE_DEPT_FROMW_SEL");
        return result;
    }

    //维修计划状态下拉
    public Map PM_03_PLAN_YEAR_STATE_SEL() throws SQLException {
        logger.info("begin PM_03_PLAN_YEAR_STATE_SEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_STATE_SEL(:RET)}");

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
        logger.info("end PM_03_PLAN_YEAR_STATE_SEL");
        return result;
    }

    //维修简版查询_N
    public Map PRO_PM_03_PLAN_YEAR_VIEW_Q(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_STATE,
                                          String V_V_QSTEXT, String V_V_INMANCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        //String V_V_INMAN ,
        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW_Q");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW_Q" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_STATE,:V_V_QSTEXT," +
                    ":V_V_INMANCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            //V_V_INMANCODE,:
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);
            cstmt.setString("V_V_INMANCODE", V_V_INMANCODE);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW_Q");
        return result;
    }

    //物料编辑作业区下拉列表
    public Map PRO_PM_WORK_MAT_DEPT_SEL(String V_V_ORDERGUID, String V_V_DEPTCODEREP, String V_V_GXID) throws SQLException {

        logger.info("begin PRO_PM_WORK_MAT_DEPT_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORK_MAT_DEPT_SEL" + "(:V_V_ORDERGUID,:V_V_DEPTCODEREP,:V_V_GXID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_DEPTCODEREP", V_V_DEPTCODEREP);
            cstmt.setString("V_V_GXID", V_V_GXID);

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
        logger.info("end PRO_PM_WORK_MAT_DEPT_SEL");
        return result;
    }

    // 工作中心保存
    public List<Map> PRO_PM_WORKORDER_ET_SET_N(Double V_I_ID, String V_V_ORDERGUID, String V_V_DESCRIPTION,
                                               String V_I_WORK_ACTIVITY, String V_I_DURATION_NORMAL, String V_V_WORK_CENTER,
                                               String V_I_ACTUAL_TIME, String V_I_NUMBER_OF_PEOPLE, String V_V_ID, String V_V_GUID,
                                               String V_V_JXBZ, String V_V_JXBZ_VALUE_DOWN, String V_V_JXBZ_VALUE_UP, String V_V_CENT_DEPT) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_ET_SET_N");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_SET_N" + "(:V_I_ID,:V_V_ORDERGUID,:V_V_DESCRIPTION," +
                    ":V_I_WORK_ACTIVITY,:V_I_DURATION_NORMAL,:V_V_WORK_CENTER,:V_I_ACTUAL_TIME,:V_I_NUMBER_OF_PEOPLE," +
                    ":V_V_ID,:V_V_GUID,:V_V_JXBZ,:V_V_JXBZ_VALUE_DOWN,:V_V_JXBZ_VALUE_UP,:V_V_CENT_DEPT)}");


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
            cstmt.setString("V_V_CENT_DEPT", V_V_CENT_DEPT);
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
        logger.info("end PRO_PM_WORKORDER_ET_SET_N");
        return result;
    }

    //new 工序下拉
    public Map PRO_PM_WORKORDER_ET_ACT_N(String V_V_ORDERGUID, String V_V_STEP) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_ET_ACT_N");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_ACT_N" + "(:V_V_ORDERGUID,:V_V_STEP,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_STEP", V_V_STEP);

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
        logger.info("end PRO_PM_WORKORDER_ET_ACT_N");
        return result;
    }

    //物料编辑-厂矿
    public Map PRO_PM_WORK_MAT_ORG_SEL(String V_V_ORDERGUID, String V_V_GXID, String V_V_STEP) throws SQLException {
        logger.info("begin PRO_PM_WORK_MAT_ORG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORK_MAT_ORG_SEL" + "(:V_V_ORDERGUID,:V_V_GXID,:V_V_STEP,:V_MSG,:RET)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_GXID", V_V_GXID);
            cstmt.setString("V_V_STEP", V_V_STEP);

            cstmt.registerOutParameter("V_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_MSG"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORK_MAT_ORG_SEL");
        return result;
    }

    //物料编辑-作业区
    public Map PRO_PM_WORK_MAT_DEPT_SEL(String V_V_ORDERGUID, String V_V_GXID, String V_V_STEP, String V_V_ORG) throws SQLException {
        logger.info("begin PRO_PM_WORK_MAT_DEPT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORK_MAT_DEPT_SEL" + "(:V_V_ORDERGUID,:V_V_GXID,:V_V_STEP,:V_V_ORG,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_GXID", V_V_GXID);
            cstmt.setString("V_V_STEP", V_V_STEP);
            cstmt.setString("V_V_ORG", V_V_ORG);

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
        logger.info("end PRO_PM_WORK_MAT_DEPT_SEL");
        return result;
    }

    //工序物料查询
    public Map PRO_PM_WORKORDER_SPARE_V_N(String V_V_ORDERGUID, String V_V_V_ACTIVITY) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_V_N");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_V_N" + "(:V_V_ORDERGUID,:V_V_V_ACTIVITY,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_V_ACTIVITY", V_V_V_ACTIVITY);

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
        logger.info("end PRO_PM_WORKORDER_SPARE_V_N");
        return result;
    }


    public Map PM_WEEK_PLAN_CHECK_M(String V_V_WEEKGUID) throws SQLException {
        logger.info("begin PM_WEEK_PLAN_CHECK_M");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WEEK_PLAN_CHECK_M" + "(:V_V_WEEKGUID,:V_INFO)}");

            cstmt.setString("V_V_WEEKGUID", V_V_WEEKGUID);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WEEK_PLAN_CHECK_M");
        return result;
    }

    public Map PRO_PM_06_PLAN_DXGC_SAVE(String V_V_YEAR, String V_V_ORGCODE, String V_V_ORGNAME, String  V_V_DEPTCODE, String  V_V_DEPTNAME, String  V_V_TYPECODE, String  V_V_TYPEDESC, String  V_V_BASECODE, String  V_V_QSTEXT) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_SAVE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_SAVE" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_ORGNAME,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_TYPECODE,:V_V_TYPEDESC,:V_V_BASECODE,:V_V_QSTEXT,:V_INFO)}");

            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_TYPECODE", V_V_TYPECODE);
            cstmt.setString("V_V_TYPEDESC", V_V_TYPEDESC);
            cstmt.setString("V_V_BASECODE", V_V_BASECODE);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_06_PLAN_DXGC_SAVE");
        return result;

    }

    public Map PRO_PM_06_PLAN_DXGC_VIEW_Q(String  V_V_YEAR, String  V_V_ORGCODE, String  V_V_DEPTCODE, String  V_V_TYPECODE, String  V_V_BASECODE) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_VIEW_Q");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_VIEW_Q" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_TYPECODE,:V_V_BASECODE,:V_CURSOR)}");

            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_TYPECODE", V_V_TYPECODE);
            cstmt.setString("V_V_BASECODE", V_V_BASECODE);
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
        logger.info("end PRO_PM_06_PLAN_DXGC_VIEW_Q");
        return result;

    }

    public Map PRO_PM_06_PLAN_DXGC_VIEW_Q_SYS(Date X_TIMELOWERLIMIT, Date X_TIMEUPPERLIMIT, String  V_V_YEAR, String  V_V_ORGCODE, String  V_V_DEPTCODE, String  V_V_TYPECODE, String  V_V_BASECODE) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_VIEW_Q");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_VIEW_Q_SYS" + "(:X_TIMELOWERLIMIT,:X_TIMEUPPERLIMIT,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_TYPECODE,:V_V_BASECODE,:V_CURSOR)}");

            cstmt.setDate("X_TIMELOWERLIMIT", X_TIMELOWERLIMIT);
            cstmt.setDate("X_TIMEUPPERLIMIT", X_TIMEUPPERLIMIT);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_TYPECODE", V_V_TYPECODE);
            cstmt.setString("V_V_BASECODE", V_V_BASECODE);
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
        logger.info("end PRO_PM_06_PLAN_DXGC_VIEW_Q_SYS");
        return result;

    }

    public Map PRO_PM_06_PLAN_DXGC_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_DEL" + "(:V_V_GUID,:V_INFO)}");


            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("V_INFO",cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_06_PLAN_DXGC_DEL");
        return result;
    }

    public Map PM_06_PLAN_DXGC_EQU_SELNUM(String V_V_GUID) throws SQLException {
        logger.info("begin PM_06_PLAN_DXGC_EQU_SELNUM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_PLAN_DXGC_EQU_SELNUM" + "(:V_V_GUID)}");
            
            cstmt.setString("V_V_GUID", V_V_GUID);
//            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
//            result.put("V_INFO",cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_PLAN_DXGC_EQU_SELNUM");
        return result;
    }

    public Map PRO_PM_06_PLAN_DXGC_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_SEL" + "(:V_V_GUID,:V_CURSOR)}");


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
        logger.info("end PRO_PM_06_PLAN_DXGC_SEL");
        return result;
    }

    public Map PRO_PM_06_PLAN_DXGC_UPDATE(String  V_V_GUID, String  V_V_YEAR, String  V_V_ORGCODE, String V_V_ORGNAME, String  V_V_DEPTCODE, String  V_V_DEPTNAME, String  V_V_TYPECODE, String  V_V_TYPEDESC, String  V_V_BASECODE, String  V_V_QSTEXT) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_DXGC_UPDATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_DXGC_UPDATE" + "(:V_V_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_ORGNAME,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_TYPECODE,:V_V_TYPEDESC,:V_V_BASECODE,:V_V_QSTEXT,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_TYPECODE", V_V_TYPECODE);
            cstmt.setString("V_V_TYPEDESC", V_V_TYPEDESC);
            cstmt.setString("V_V_BASECODE", V_V_BASECODE);
            cstmt.setString("V_V_QSTEXT", V_V_QSTEXT);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_06_PLAN_DXGC_UPDATE");
        return result;

    }
}

