package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zs on 2018/4/8.
 */
@Service
public class ZsService {
    private static final Logger logger = Logger.getLogger(ZpfService.class.getName());

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

    //安全措施的查询
    public HashMap BASE_AQCS_SEL(String V_V_AQCS_NAME) throws SQLException {//安全措施模糊查询
        logger.info("begin BASE_AQCS_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_AQCS_SEL" + "(:V_V_AQCS_NAME,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_NAME", V_V_AQCS_NAME);
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
        logger.info("end BASE_AQCS_SEL");
        return result;
    }

    //安全措施的行查询（安全措施的详细查询有文本描述）
    public HashMap BASE_AQCS_BYCODE_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_BYCODE_SEL");//查询安全措施相关详情的方法
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

    //安全措施的新增和修改的方法
    public HashMap BASE_AQCS_EDIT(String V_V_AQCS_CODE, String V_V_AQCS_NAME, String V_V_AQ_ZYSX, String V_V_AQCS_DETAIL) throws SQLException {
        logger.info("begin BASE_AQCS_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_EDIT" + "(:V_V_AQCS_CODE,:V_V_AQCS_NAME,:V_V_AQ_ZYSX,:V_V_AQCS_DETAIL,:V_INFO)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.setString("V_V_AQCS_NAME", V_V_AQCS_NAME);
            cstmt.setString("V_V_AQ_ZYSX", V_V_AQ_ZYSX);
            cstmt.setString("V_V_AQCS_DETAIL", V_V_AQCS_DETAIL);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_EDIT");
        return result;
    }

    // 安全措施的删除
    public HashMap BASE_AQCS_DEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_DEL" + "(:V_V_AQCS_CODE,:V_INFO)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_DEL");
        return result;
    }

    //安全措施预案查看
    public HashMap BASE_AQCS_AQYA_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_AQYA_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_AQYA_SEL " + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_AQYA_SEL ");
        return result;
    }

    //安全措施预案的新增和修改
    public HashMap BASE_AQCS_AQYA_EDIT(String V_V_AQCS_CODE, String V_V_AQYA_CODE, String V_V_AQYA_NAME, String V_V_AQYA_DETAIL) throws SQLException {
        logger.info("begin BASE_AQCS_AQYA_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_AQYA_EDIT" + "(:V_V_AQCS_CODE,:V_V_AQYA_CODE,:V_V_AQYA_NAME,:V_V_AQYA_DETAIL,:V_INFO)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.setString("V_V_AQYA_CODE", V_V_AQYA_CODE);
            cstmt.setString("V_V_AQYA_NAME", V_V_AQYA_NAME);
            cstmt.setString("V_V_AQYA_DETAIL", V_V_AQYA_DETAIL);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_AQYA_EDIT");
        return result;
    }


    //安全措施预案删除
    public HashMap BASE_AQCS_AQYA_DEL(String V_V_AQYA_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_AQYA_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_AQYA_DEL" + "(:V_V_AQYA_CODE,:V_INFO)}");
            cstmt.setString("V_V_AQYA_CODE", V_V_AQYA_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_AQYA_DEL");
        return result;
    }


    //安全措施预案上传过程
    public HashMap BASE_FILE_IMAGE_INS(String V_V_GUID, String V_V_FILENAME, InputStream V_V_FILE, String V_V_FILETYPECODE, String V_V_PLANT,
                                       String V_V_DEPT, String V_V_TIME, String V_V_PERSON, String V_V_REMARK) throws SQLException {

        logger.info("begin BASE_FILE_IMAGE_INS");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {//
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_INS" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_TIME,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_FILEBLOB", V_V_FILE);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("INFO", cstmt.getString("V_INFO"));
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

    //查询安全措施预案附件列表
    public HashMap BASE_FILE_CHAKAN_SEL(String V_V_GUID) throws SQLException {//安全措施模糊查询
        logger.info("begin BASE_FILE_CHAKAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    //附件下载
    public HashMap BASE_FILE_IMAGE_DOWNLOAD(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_DOWNLOAD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_DOWNLOAD" + "(:V_V_GUID,:V_NAME,:V_FILE)}");
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

    public HashMap BASE_AQCS_FAULT_ITEM_SEL(String V_V_AQCS_CODE) throws SQLException {//安全事故案例查看
        logger.info("begin BASE_AQCS_FAULT_ITEM_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_AQCS_FAULT_ITEM_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_FAULT_ITEM_SEL");
        return result;
    }

    //安全措施整改查看的方法
    public HashMap BASE_AQCS_ZG_SEL(String V_V_AQCS_CODE) throws SQLException {
        logger.info("begin BASE_AQCS_ZG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_AQCS_ZG_SEL" + "(:V_V_AQCS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
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
        logger.info("end BASE_AQCS_ZG_SEL");
        return result;
    }

    //安全措施整改新增和修改的方法
    public HashMap BASE_AQCS_ZG_EDIT(String V_V_AQCS_CODE,String V_V_ZG_GUID,String V_V_ZG_TIME,String V_V_ZG_PLACE,String V_V_ZG_PERSON,String V_V_ZG_DETAIL,String V_V_ZG_COST) throws SQLException {
        logger.info("begin BASE_AQCS_ZG_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_ZG_EDIT" + "(:V_V_AQCS_CODE,:V_V_ZG_GUID,:V_V_ZG_TIME,:V_V_ZG_PLACE,:V_V_ZG_PERSON,:V_V_ZG_DETAIL,:V_V_ZG_COST,:V_INFO)}");
            cstmt.setString("V_V_AQCS_CODE", V_V_AQCS_CODE);
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
            cstmt.setString("V_V_ZG_TIME", V_V_ZG_TIME);
            cstmt.setString("V_V_ZG_PLACE", V_V_ZG_PLACE);
            cstmt.setString("V_V_ZG_PERSON", V_V_ZG_PERSON);
            cstmt.setString("V_V_ZG_DETAIL", V_V_ZG_DETAIL);
            cstmt.setString("V_V_ZG_COST", V_V_ZG_COST);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_ZG_EDIT");
        return result;
    }

    //安全措施整改的删除
    public HashMap BASE_AQCS_ZG_DEL(String V_V_ZG_GUID) throws SQLException {
        logger.info("begin BASE_AQCS_AQYA_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_ZG_DEL" + "(:V_V_ZG_GUID,:V_INFO)}");
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_ZG_DEL");
        return result;
    }

    //安全措施附件的查看，上传都与安全措施预案共用一个

    //传入设备编码查询关联设备信息
    public HashMap BASE_AQCS_BY_EQUCODE_SEL (String V_V_EQUCODE) throws SQLException {
        logger.info("begin BASE_AQCS_BY_EQUCODE_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_BY_EQUCODE_SEL " + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end BASE_AQCS_BY_EQUCODE_SEL ");
        return result;
    }

    //查询整改工单
    public HashMap BASE_GD_BY_ZGGUID_SEL(String V_V_ZG_GUID) throws SQLException {
        logger.info("begin BASE_GD_BY_ZGGUID_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GD_BY_ZGGUID_SEL " + "(:V_V_ZG_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
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
        logger.info("end BASE_GD_BY_ZGGUID_SEL ");
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

            result.put("INFO", cstmt.getString("V_INFO"));
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

    //查询人工
    public HashMap BASE_GZ_BY_ZGGUID_SEL(String V_V_ZG_GUID) throws SQLException {
        logger.info("begin BASE_GZ_BY_ZGGUID_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GZ_BY_ZGGUID_SEL " + "(:V_V_ZG_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
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
        logger.info("end BASE_GZ_BY_ZGGUID_SEL ");
        return result;
    }

    //查询工具
    public HashMap BASE_GJ_BY_ZGGUID_SEL(String V_V_ZG_GUID) throws SQLException {
        logger.info("begin BASE_GJ_BY_ZGGUID_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_GJ_BY_ZGGUID_SEL " + "(:V_V_ZG_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
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
        logger.info("end BASE_GJ_BY_ZGGUID_SEL ");
        return result;
    }

    //查询机具
    public HashMap BASE_JJ_BY_ZGGUID_SEL(String V_V_ZG_GUID) throws SQLException {
        logger.info("begin BASE_JJ_BY_ZGGUID_SEL ");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_JJ_BY_ZGGUID_SEL " + "(:V_V_ZG_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_ZG_GUID", V_V_ZG_GUID);
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
        logger.info("end BASE_JJ_BY_ZGGUID_SEL ");
        return result;
    }


    public HashMap BASE_AQCS_EQU_LINKDEL(String V_V_EQUCODE) throws SQLException {
        logger.info("begin BASE_AQCS_EQU_LINKDEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_AQCS_EQU_LINKDEL" + "(:V_V_EQUCODE,:V_INFO)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_AQCS_EQU_LINKDEL");
        return result;
    }
}