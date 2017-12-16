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
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_14Service {
    private static final Logger logger = Logger.getLogger(PM_14Service.class.getName());

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

    public HashMap PM_09_WORKORDER_LIST_REPAIR(String V_V_PERSONCODE,String  V_V_ORGCODE,String  V_V_DEPTCODE,String  V_V_DEPTCODEREPARIR,
                                               String V_V_STATECODE,String  V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PM_09_WORKORDER_LIST_REPAIR");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_09_WORKORDER_LIST_REPAIR" + "(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
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
        logger.info("end PM_09_WORKORDER_LIST_REPAIR");
        return result;
    }

    public HashMap PM_09_REPAIRDEPT_TODEPT(String V_REPAIRDEPTCODE,String  V_PERSONCODE) throws SQLException {

        logger.info("begin PM_09_REPAIRDEPT_TODEPT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_09_REPAIRDEPT_TODEPT" + "(:V_REPAIRDEPTCODE,:V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_REPAIRDEPTCODE", V_REPAIRDEPTCODE);
            cstmt.setString("V_PERSONCODE", V_PERSONCODE);
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
        logger.info("end PM_09_WORKORDER_LIST_REPAIR");
        return result;
    }

    public HashMap PM_09_WORKORDER_GET(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PM_09_WORKORDER_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_09_WORKORDER_GET" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PM_09_WORKORDER_GET");
        return result;
    }

    public HashMap PM_09_WORKORDER_JS_REPAIRDEPT(String V_V_PERNAME,String  V_DEFECT_GUID) throws SQLException {

        logger.info("begin PM_09_WORKORDER_JS_REPAIRDEPT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_09_WORKORDER_JS_REPAIRDEPT" + "(:V_V_PERNAME,:V_V_FZ_PER,:V_CURSOR)}");
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_09_WORKORDER_JS_REPAIRDEPT");
        return result;
    }

    public HashMap PM_09_WORKORDER_SP(String V_V_PERSONCODE,String  V_V_ORDERGUID,String V_V_STEPNAME,
                                      String V_V_MEMO,String V_V_STATECODE) throws SQLException {

        logger.info("begin PM_09_WORKORDER_SP");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_09_WORKORDER_SP" + "(:V_V_PERSONCODE,:V_V_ORDERGUID,:V_V_STEPNAME," +
                    ":V_V_MEMO,:V_V_STATECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_STEPNAME", V_V_STEPNAME);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_09_WORKORDER_SP");
        return result;
    }

    public HashMap PM_14_FAULT_TYPE_ITEM_SEL() throws SQLException {

        logger.info("begin PM_14_FAULT_TYPE_ITEM_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_TYPE_ITEM_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_14_FAULT_TYPE_ITEM_SEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_PER_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,
                                                 String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,
                                                 String V_V_FAULT_YY,String V_V_PERSON) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_PER_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_PER_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_PERSON,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_PER_SEL");
        return result;
    }

    public HashMap PRO_BASE_FILE_SEL(String V_V_GUID,String V_V_FILETYPECODE) throws SQLException {

        logger.info("begin PRO_BASE_FILE_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_SEL" + "(:V_V_GUID,:V_V_FILETYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
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
        logger.info("end PRO_BASE_FILE_SEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_MODEL(String V_V_EQUTYPECODE,String  V_V_GUID,String  V_V_NAME,String  V_V_PROCESS,
                                               String V_V_WORKING, String V_V_CONTENT,String V_V_SPARE,
                                               String V_V_VEHICLE,String V_V_TOOL,String V_V_HOUR,String V_V_MEMO,
                                               String V_V_CONTENT1) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_MODEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_MODEL" + "(:V_V_EQUTYPECODE,:V_V_GUID,:V_V_NAME," +
                    ":V_V_PROCESS,:V_V_WORKING,:V_V_CONTENT,:V_V_SPARE,:V_V_VEHICLE,:V_V_TOOL,:V_V_HOUR,:V_V_MEMO," +
                    ":V_V_CONTENT1,:V_INFO)}");
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_NAME", V_V_NAME);
            cstmt.setString("V_V_PROCESS", V_V_PROCESS);
            cstmt.setString("V_V_WORKING", V_V_WORKING);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_SPARE", V_V_SPARE);
            cstmt.setString("V_V_VEHICLE", V_V_VEHICLE);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_CONTENT1", V_V_CONTENT1);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_MODEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_FEEDBACK(String V_V_PERCODE,String  V_V_IP,String  V_V_GUID,String  V_V_FEEDBACK) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_FEEDBACK");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_FEEDBACK" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID," +
                    ":V_V_FEEDBACK,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FEEDBACK", V_V_FEEDBACK);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_FEEDBACK");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_DEL(String V_V_PERCODE,String  V_V_IP,String  V_V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_DEL" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID," +
                    ":V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_DEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_SEND(String V_V_PERCODE,String  V_V_IP,String  V_V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_SEND");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEND" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID," +
                    ":V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SEND");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_SET(String V_V_GUID,String  V_V_ORGCODE,String  V_V_DEPTCODE,String  V_V_EQUTYPE,String  V_V_EQUCODE,
                                             String V_V_EQUCHILD_CODE,String  V_V_FAULT_GUID,String  V_V_FAULT_TYPE,String  V_V_FAULT_YY,
                                             String V_V_FAULT_XX,String  V_V_JJBF, String V_V_FAULT_LEVEL, String V_V_PER_CLASS,String V_V_JJ,
                                             String V_V_WL,String V_V_PART,String V_V_MATERIAL,String V_V_TIME,String V_V_FILE_GUID,String V_V_INTIME,
                                             String V_V_PERCODE,String V_V_IP) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE,:V_V_FAULT_YY," +
                    ":V_V_FAULT_XX,:V_V_JJBF,:V_V_FAULT_LEVEL,:V_V_PER_CLASS,:V_V_JJ,:V_V_WL,:V_V_PART,:V_V_MATERIAL," +
                    ":V_V_TIME,:V_V_FILE_GUID,:V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FAULT_XX", V_V_FAULT_XX);
            cstmt.setString("V_V_JJBF", V_V_JJBF);
            cstmt.setString("V_V_FAULT_LEVEL", V_V_FAULT_LEVEL);
            cstmt.setString("V_V_PER_CLASS", V_V_PER_CLASS);
            cstmt.setString("V_V_JJ", V_V_JJ);
            cstmt.setString("V_V_WL", V_V_WL);
            cstmt.setString("V_V_PART", V_V_PART);
            cstmt.setString("V_V_MATERIAL", V_V_MATERIAL);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_FILE_GUID", V_V_FILE_GUID);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SET");
        return result;
    }

    public HashMap PRO_BASE_FILE_DEL(String  V_V_GUID) throws SQLException {

        logger.info("begin PRO_BASE_FILE_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_FILE_DEL");
        return result;
    }

    public HashMap PRO_BASE_FILE_ADD(String V_V_GUID, String V_V_FILENAME, InputStream V_V_FILEBLOB, String V_V_FILETYPECODE, String V_V_PLANT, String V_V_DEPT, String V_V_PERSON, String V_V_REMARK) throws SQLException {

        logger.info("begin PRO_BASE_FILE_ADD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_ADD" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_FILEBLOB",V_V_FILEBLOB);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_FILE_ADD");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_SET1(String V_V_GUID,String  V_V_PERCODE,String  V_V_IP,String  V_V_PER_CLASS,
                                              String  V_V_JJ, String V_V_TIME,String  V_V_WL,String  V_V_BZ) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_SET1");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SET1" + "(:V_V_GUID,:V_V_PERCODE,:V_V_IP," +
                    ":V_V_PER_CLASS,:V_V_JJ,:V_V_TIME,:V_V_WL,:V_V_BZ,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PER_CLASS", V_V_PER_CLASS);
            cstmt.setString("V_V_JJ", V_V_JJ);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_WL", V_V_WL);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SET1");
        return result;
    }

    public HashMap PRO_CLASS_M_QUERY(String IN_DEPARTCODE,String IN_CLASSNAME) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_M_QUERY" + "(:IN_DEPARTCODE,:IN_CLASSNAME,:V_CURSOR)}");
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
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
        logger.info("end PRO_CLASS_M_QUERY");
        return result;
    }
    //事故故障字典PM_1403理的增加接口
    public List<Map> PM_14_FAULT_ITEM_SET(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,String V_V_FAULT_YY,String V_V_BZ,String V_V_PERCODE,String V_V_IP) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_BZ,:V_V_PERCODE,:V_V_IP,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("V_INFO");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_SET");
        return result;
    }

    //pm_1407zsbmc
    public HashMap PRO_SAP_EQU_VIEW(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_VIEW");
        //logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + ",V_V_DEPTCODE:" + V_V_DEPTCODE + ",V_V_DEPTNEXTCODE:" + V_V_DEPTNEXTCODE + ",V_V_EQUTYPECODE:" + V_V_EQUTYPECODE + ",V_V_EQUCODE:" + V_V_EQUCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_SAP_EQU_VIEW");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_SEL (String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                         String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                         String V_V_FAULT_YY) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_SEL");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
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
        logger.info("end PM_14_FAULT_ITEM_SEL");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DEL(String V_V_PERCODE,String  V_V_IP,String  V_V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DEL" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID," +
                    ":V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DEL");
        return result;
    }

    //==========================================关键机具=========================================
    //车辆
    public HashMap PM_14_CL_DIC_CAR_VIEW(String V_V_FLAG) throws SQLException {

        logger.info("begin PM_14_CL_DIC_CAR_VIEW");
        logger.debug("params:V_V_FLAG:" + V_V_FLAG);


        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_CL_DIC_CAR_VIEW (:V_V_FLAG,:V_CURSOR)}");
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_CARCODE", rs.getString("V_CARCODE"));
                sledata.put("V_CARTEXT", rs.getString("V_CARTEXT"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_CL_DIC_CAR_VIEW");
        return result;
    }
    //等候地点
    public HashMap PM_14_CL_WORKORDER_DATA_DROP(String V_V_PERCODE,String V_V_CLOUMSNAME) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY");
        logger.debug("params:V_V_PERCODE:"+V_V_PERCODE+",V_V_CLOUMSNAME:" + V_V_CLOUMSNAME);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_CL_WORKORDER_DATA_DROP" + "(:V_V_PERCODE,:V_V_CLOUMSNAME,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_CLOUMSNAME", V_V_CLOUMSNAME);
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
        logger.info("end PM_14_CL_WORKORDER_DATA_DROP");
        return result;
    }
    //添加
    public HashMap PM_14_CL_WORKORDER_DATA_SET(String V_V_IP,String V_V_PERCODE,String V_V_ORDERID,String V_V_CARCODE,
                                               String V_D_DATETIME_WITE,String V_V_DD_WITE,String V_V_WP_WITE,String V_V_MEMO,String V_V_LXRDH) throws SQLException {

        logger.info("begin PM_14_CL_WORKORDER_DATA_SET");
        //  logger.debug("params:V_V_PERCODE:"+V_V_PERCODE+",V_V_CLOUMSNAME:" + V_V_CLOUMSNAME);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_CL_WORKORDER_DATA_SET" + "(:V_V_IP,:V_V_PERCODE,:V_V_ORDERID," +
                    ":V_V_CARCODE,:V_D_DATETIME_WITE,:V_V_DD_WITE,:V_V_WP_WITE,:V_V_MEMO,:V_V_LXRDH,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_D_DATETIME_WITE", V_D_DATETIME_WITE);
            cstmt.setString("V_V_DD_WITE", V_V_DD_WITE);
            cstmt.setString("V_V_WP_WITE", V_V_WP_WITE);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_LXRDH", V_V_LXRDH);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            result.put("RET",(String) cstmt.getString("V_V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_CL_WORKORDER_DATA_SET");
        return result;
    }
    //表格1
    public HashMap PM_14_CL_WORKORDER_DATA_VIEW(String V_V_ORDERID) throws SQLException {

        logger.info("begin PM_14_CL_WORKORDER_DATA_VIEW");
        logger.debug("params:V_V_ORDERID:"+V_V_ORDERID);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_CL_WORKORDER_DATA_VIEW" + "(:V_V_ORDERID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
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
        logger.info("end PM_14_CL_WORKORDER_DATA_VIEW");
        return result;
    }
    //删除
    public HashMap PM_14_CL_WORKORDER_DATA_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PM_14_CL_WORKORDER_DATA_DEL");
        //  logger.debug("params:V_V_PERCODE:"+V_V_PERCODE+",V_V_CLOUMSNAME:" + V_V_CLOUMSNAME);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_CL_WORKORDER_DATA_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_CL_WORKORDER_DATA_DEL");
        return result;
    }
    //确定
    public HashMap PM_14_WORKORDER_TOOL_SET(String V_I_ID,String V_ORDERGUID,String V_V_TOOLCODE,String V_V_TOOLNAME,
                                            String V_V_USEMAN,String V_D_USETIME,String V_I_HOUR,String V_I_NUMBER,
                                            String V_V_MEMO,String V_V_RETURNMAN,String V_D_RETURNTIME) throws SQLException {

        logger.info("begin PM_14_WORKORDER_TOOL_SET");
        //  logger.debug("params:V_V_PERCODE:"+V_V_PERCODE+",V_V_CLOUMSNAME:" + V_V_CLOUMSNAME);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_WORKORDER_TOOL_SET" + "(:V_I_ID,:V_ORDERGUID,:V_V_TOOLCODE," +
                    ":V_V_TOOLNAME,:V_V_USEMAN,:V_D_USETIME,:V_I_HOUR,:V_I_NUMBER,:V_V_MEMO,:V_V_RETURNMAN,:V_D_RETURNTIME,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_ORDERGUID", V_ORDERGUID);
            cstmt.setString("V_V_TOOLCODE", V_V_TOOLCODE);
            cstmt.setString("V_V_TOOLNAME", V_V_TOOLNAME);
            cstmt.setString("V_V_USEMAN", V_V_USEMAN);
            cstmt.setString("V_D_USETIME", V_D_USETIME);
            cstmt.setString("V_I_HOUR", V_I_HOUR);
            cstmt.setString("V_I_NUMBER", V_I_NUMBER);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_RETURNMAN", V_V_RETURNMAN);
            cstmt.setString("V_D_RETURNTIME", V_D_RETURNTIME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET",(String) cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_WORKORDER_TOOL_SET");
        return result;
    }
    //表格2
    public HashMap PM_14_WORKORDER_TOOL_VIEW(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PM_14_WORKORDER_TOOL_VIEW");
        logger.debug("params:V_V_ORDERGUID:"+V_V_ORDERGUID);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_WORKORDER_TOOL_VIEW" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PM_14_WORKORDER_TOOL_VIEW");
        return result;
    }
    //表格2删除
    public HashMap PM_14_WORKORDER_TOOL_DEL(String V_I_ID) throws SQLException {

        logger.info("begin PM_14_WORKORDER_TOOL_DEL");
        //  logger.debug("params:V_V_PERCODE:"+V_V_PERCODE+",V_V_CLOUMSNAME:" + V_V_CLOUMSNAME);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_WORKORDER_TOOL_DEL" + "(:V_I_ID,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_WORKORDER_TOOL_DEL");
        return result;
    }
    //tree
    public List<Map> PM_14_TOOLLVEHICLE_TREE(String V_TYPE,String V_NAME) throws SQLException {

        logger.info("begin PM_14_TOOLLVEHICLE_TREE");
        logger.debug("params:V_TYPE:"+V_TYPE+",V_NAME:"+V_NAME);

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_TOOLLVEHICLE_TREE" + "(:V_TYPE,:V_NAME,:V_CURSOR)}");
            cstmt.setString("V_TYPE", V_TYPE);
            cstmt.setString("V_NAME", V_NAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map temp = new HashMap();
                temp.put("id", rs.getString("V_CODE"));
                temp.put("text", rs.getString("V_NAME"));
                temp.put("parentid", rs.getString("V_CODEUP"));
                temp.put("leaf", true);
                temp.put("expanded", false);
                result.add(temp);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_TOOLLVEHICLE_TREE");
        return result;
    }
    //
    public HashMap PM_14_WORKORDER_TOOL_RETSTR(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PM_14_WORKORDER_TOOL_RETSTR");
        logger.debug("params:V_V_ORDERGUID:"+V_V_ORDERGUID);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_WORKORDER_TOOL_RETSTR" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_WORKORDER_TOOL_RETSTR");
        return result;
    }
    //常用项目加载
    public List<Map> PRO_PM_WORKORDER_TOOL_CY(String V_PERCODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_CY");
        logger.debug("params:V_PERCODE:"+V_PERCODE);

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TOOL_CY" + "(:V_PERCODE,:V_CURSOR)}");
            cstmt.setString("V_PERCODE", V_PERCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map temp = new HashMap();
                temp.put("id", rs.getString("V_TOOLCODE"));
                temp.put("text", rs.getString("V_TOOLNAME"));
                temp.put("leaf", true);
                temp.put("expanded", false);
                result.add(temp);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_TOOL_CY");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                             String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                             String V_V_FAULT_YY, String V_V_FINDTIME_B, String V_V_FINDTIME_E) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_SEL");
        logger.debug("params:V_V_ORGCODE:" + V_V_ORGCODE + ",V_V_DEPTCODE:" + V_V_DEPTCODE + ",V_V_EQUTYPE:" + V_V_EQUTYPE +
                ",V_V_EQUCODE:" + V_V_EQUCODE + ",V_V_EQUCHILD_CODE:" + V_V_EQUCHILD_CODE + ",V_V_FAULT_TYPE:" + V_V_FAULT_TYPE +
                ",V_V_FAULT_YY:" + V_V_FAULT_YY + ",V_V_FINDTIME_B:" + V_V_FINDTIME_B + ",V_V_FINDTIME_E:" + V_V_FINDTIME_E);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME_B,:V_V_FINDTIME_E,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FINDTIME_B", V_V_FINDTIME_B);
            cstmt.setString("V_V_FINDTIME_E", V_V_FINDTIME_E);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_SEL");
        return result;
    }

    public HashMap PRO_CLASS_M_QUERY_P(String IN_CLASSCODE) throws SQLException {
        logger.info("begin PRO_CLASS_M_QUERY_P");
        logger.debug("params:IN_CLASSCODE:" + IN_CLASSCODE);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_M_QUERY_P" + "(:IN_CLASSCODE,:RET)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
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
        logger.info("end PRO_CLASS_M_QUERY_P");
        return result;
    }

    //选择按钮
    public HashMap PM_14_FAULT_PER_CLASS_SET(String V_V_GUID,String V_V_CLASSCODE,String V_V_PERCODE ) throws SQLException {

        logger.info("begin PM_14_FAULT_PER_CLASS_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_PER_CLASS_SET" + "(:V_V_GUID,:V_V_CLASSCODE,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_CLASSCODE", V_V_CLASSCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_PER_CLASS_SET");
        return result;
    }


    public HashMap PM_14_FAULT_ITEM_DATA_SET(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE,
                                             String V_V_EQUCHILD_CODE, String V_V_FAULT_GUID, String V_V_FAULT_TYPE, String V_V_FAULT_YY,
                                             String V_V_FAULT_XX, String V_V_JJBF, String V_V_FAULT_LEVEL,
                                             String V_V_FINDTIME, String V_V_FILE_GUID, String V_V_INTIME,
                                             String V_V_PERCODE, String V_V_IP) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME," +
                    ":V_V_FAULT_XX,:V_V_FAULT_LEVEL,:V_V_JJBF," +
                    ":V_V_FILE_GUID,:V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FAULT_XX", V_V_FAULT_XX);
            cstmt.setString("V_V_JJBF", V_V_JJBF);
            cstmt.setString("V_V_FAULT_LEVEL", V_V_FAULT_LEVEL);
            cstmt.setString("V_V_FINDTIME", V_V_FINDTIME);
            cstmt.setString("V_V_FILE_GUID", V_V_FILE_GUID);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SET");
        return result;
    }

    public HashMap PRO_WORKORDER_CARSEL(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_WORKORDER_CARSEL");
        logger.debug("params:V_V_ORDERGUID:"+V_V_ORDERGUID);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_CARSEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_WORKORDER_CARSEL");
        return result;
    }

    public Map PRO_PM_07_DEFECT_MANY_EDIT(String V_V_GUID,String V_V_PERCODE,String V_V_DEFECTLIST,String V_V_DEPTCODE,String V_V_EQUCODE,
                                          String V_V_EQUCHILDCODE,String V_V_IDEA, String V_V_LEVEL) throws SQLException {
        logger.info("begin PRO_PM_07_DEFECT_MANY_EDIT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_MANY_EDIT" + "(:V_V_GUID,:V_V_PERCODE,:V_V_DEFECTLIST,:V_V_DEPTCODE,:V_V_EQUCODE," +
                    ":V_V_EQUCHILDCODE,:V_V_IDEA,:V_V_LEVEL,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);

            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_LEVEL", V_V_LEVEL);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_MANY_EDIT");
        return result;
    }

    public Map PRO_PM_07_DEFECT_DEL(String V_V_GUID,String V_V_PERCODE) throws SQLException {
        logger.info("begin PRO_PM_07_DEFECT_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_DEL" + "(:V_V_GUID,:V_V_PERCODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_DEL");
        return result;
    }
}
