package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 */

@Service
public class SgService {
    private static final Logger logger = Logger.getLogger(SgService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    public Map PRO_BASE_DEPT_SEL(String V_V_DEPTCODE,String V_V_DEPTNAME,String V_V_DEPTTYPE) throws SQLException {


        logger.info("begin PRO_BASE_DEPT_SEL");
        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODE + "params:V_V_DEPTNAME:" + V_V_DEPTNAME+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_SEL(:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_SEL");
        return result;
    }

    public Map PM_14_SG_INF_TYPE_SEL() throws SQLException {


        logger.info("begin PM_14_SG_INF_TYPE_SEL");
        logger.debug("");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_SG_INF_TYPE_SEL(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_SG_INF_TYPE_SEL");
        return result;
    }

    public Map SG_INF_REASON_SEL() throws SQLException {


        logger.info("begin SG_INF_REASON_SEL");
        logger.debug("");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_REASON_SEL(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end SG_INF_REASON_SEL");
        return result;
    }

    public Map SG_INF_DATA_ITEM_SEL(String V_V_SG_NAME,String V_V_SG_STIME,String V_V_SG_ETIME,
                                    String V_V_SG_DEPT,String V_V_SG_TYPE,String V_V_SG_YY) throws SQLException {


        logger.info("begin SG_INF_DATA_ITEM_SEL");
        logger.debug("params:V_V_SG_NAME:" + V_V_SG_NAME + "params:V_V_SG_STIME:" + V_V_SG_STIME+
                "params:V_V_SG_ETIME:" + V_V_SG_ETIME+"params:V_V_SG_DEPT:" + V_V_SG_DEPT+
                "params:V_V_SG_TYPE:" + V_V_SG_TYPE+"params:V_V_SG_YY:" + V_V_SG_YY);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_DATA_ITEM_SEL(:V_V_SG_NAME,:V_V_SG_STIME,:V_V_SG_ETIME," +
                    ":V_V_SG_DEPT,:V_V_SG_TYPE,:V_V_SG_YY,:V_CURSOR)}");
            cstmt.setString("V_V_SG_NAME", V_V_SG_NAME);
            cstmt.setString("V_V_SG_STIME", V_V_SG_STIME);
            cstmt.setString("V_V_SG_ETIME", V_V_SG_ETIME);
            cstmt.setString("V_V_SG_DEPT", V_V_SG_DEPT);
            cstmt.setString("V_V_SG_TYPE", V_V_SG_TYPE);
            cstmt.setString("V_V_SG_YY", V_V_SG_YY);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end SG_INF_DATA_ITEM_SEL");
        return result;
    }

    public List<Map> SG_INF_DATA_ITEM_SAVE(String V_V_ID,String V_V_GUID,String V_V_SG_NAME,String V_V_SG_TIME,
                                           String V_V_SG_DEPTCODE,String V_V_SG_PLACE,String V_V_SG_TYPECODE,
                                           String V_V_SG_PER,String V_V_SG_EQUCODE,String V_V_SG_YY,String V_V_SG_JG) throws SQLException {
        logger.info("begin SG_INF_DATA_ITEM_SAVE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_DATA_ITEM_SAVE" + "(:V_V_ID,:V_V_GUID,:V_V_SG_NAME,:V_V_SG_TIME," +
                    ":V_V_SG_DEPTCODE,:V_V_SG_PLACE,:V_V_SG_TYPECODE,:V_V_SG_PER,:V_V_SG_EQUCODE,:V_V_SG_YY,:V_V_SG_JG," +
                    ":V_INFO)}");

            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SG_NAME", V_V_SG_NAME);
            cstmt.setString("V_V_SG_TIME", V_V_SG_TIME);
            cstmt.setString("V_V_SG_DEPTCODE", V_V_SG_DEPTCODE);
            cstmt.setString("V_V_SG_PLACE", V_V_SG_PLACE);
            cstmt.setString("V_V_SG_TYPECODE", V_V_SG_TYPECODE);
            cstmt.setString("V_V_SG_PER", V_V_SG_PER);
            cstmt.setString("V_V_SG_EQUCODE", V_V_SG_EQUCODE);
            cstmt.setString("V_V_SG_YY", V_V_SG_YY);
            cstmt.setString("V_V_SG_JG", V_V_SG_JG);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_INF_DATA_ITEM_SAVE");
        return result;
    }

    public Map SG_INF_DATA_ITEM_SELBYGUID(String V_V_GUID) throws SQLException {


        logger.info("begin SG_INF_DATA_ITEM_SELBYGUID");
        logger.debug("params:V_V_GUID:" + V_V_GUID);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_DATA_ITEM_SELBYGUID(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end SG_INF_DATA_ITEM_SELBYGUID");
        return result;
    }

    public List<Map> SG_JX_INF_ITEM_EDIT(String V_V_ID,String V_V_GUID,String V_V_STIME,String V_V_ETIME,
                                         String V_V_ORG,String V_V_HJ,String V_V_BZ) throws SQLException {
        logger.info("begin SG_JX_INF_ITEM_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_JX_INF_ITEM_EDIT" + "(:V_V_ID,:V_V_GUID,:V_V_STIME,:V_V_ETIME," +
                    ":V_V_ORG,:V_V_HJ,:V_V_BZ,:V_INFO)}");

            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
            cstmt.setString("V_V_ORG", V_V_ORG);
            cstmt.setString("V_V_HJ", V_V_HJ);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_JX_INF_ITEM_EDIT");
        return result;
    }

    public List<Map> SG_INF_DATA_ITEM_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin SG_INF_DATA_ITEM_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_DATA_ITEM_DEL" + "(:V_V_GUID,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_INF_DATA_ITEM_DEL");
        return result;
    }

    public List<Map> SG_KH_INF_ITEM_EDIT(String V_V_ID,String V_V_GUID,String V_V_ORG,String V_V_ZB,
                                         String V_V_PER,String V_V_TK,String V_V_BZ) throws SQLException {
        logger.info("begin SG_KH_INF_ITEM_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_KH_INF_ITEM_EDIT" + "(:V_V_ID,:V_V_GUID,:V_V_ORG,:V_V_ZB," +
                    ":V_V_PER,:V_V_TK,:V_V_BZ,:V_INFO)}");

            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORG", V_V_ORG);
            cstmt.setString("V_V_ZB", V_V_ZB);
            cstmt.setString("V_V_PER", V_V_PER);
            cstmt.setString("V_V_TK", V_V_TK);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_KH_INF_ITEM_EDIT");
        return result;
    }

    public List<Map> SG_YX_INF_ITEM_EDIT(String V_V_ID,String V_V_GUID,String V_V_XFFY,String V_V_JCFY,
                                         String V_V_QTSS,String V_V_SSHJ,String V_V_YYSJ,String V_V_INF,
                                         String V_V_ZGCS) throws SQLException {
        logger.info("begin SG_YX_INF_ITEM_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_YX_INF_ITEM_EDIT" + "(:V_V_ID,:V_V_GUID,:V_V_XFFY,:V_V_JCFY," +
                    ":V_V_QTSS,:V_V_SSHJ,:V_V_YYSJ,:V_V_INF,:V_V_ZGCS,:V_INFO)}");

            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_XFFY", V_V_XFFY);
            cstmt.setString("V_V_JCFY", V_V_JCFY);
            cstmt.setString("V_V_QTSS", V_V_QTSS);
            cstmt.setString("V_V_SSHJ", V_V_SSHJ);
            cstmt.setString("V_V_YYSJ", V_V_YYSJ);
            cstmt.setString("V_V_INF", V_V_INF);
            cstmt.setString("V_V_ZGCS", V_V_ZGCS);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_YX_INF_ITEM_EDIT");
        return result;
    }

    public List<Map> SG_INF_FILE_SET(String V_V_GUID,String V_V_FILEGUID,String V_V_FILENAME,FileInputStream V_V_FILEBLOB,
                                     String V_V_FILETYPE,String V_V_FILEPER,String V_V_FILETIME) throws SQLException {
        logger.info("begin SG_INF_FILE_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_FILE_SET" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_FILEBLOB," +
                    ":V_V_FILETYPE,:V_V_FILEPER,:V_V_FILETIME,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBinaryStream("V_V_FILEBLOB", V_V_FILEBLOB);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setString("V_V_FILEPER", V_V_FILEPER);
            cstmt.setString("V_V_FILETIME", V_V_FILETIME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_INF_FILE_SET");
        return result;
    }

    public Map SG_INF_FILE_SEL(String V_V_GUID,String V_V_FILETYPE) throws SQLException {


        logger.info("begin SG_INF_FILE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_FILE_SEL(:V_V_GUID,:V_V_FILETYPE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end SG_INF_FILE_SEL");
        return result;
    }

    public List<Map> SG_INF_FILE_DEL(String V_V_FILEGUID) throws SQLException {
        logger.info("begin SG_INF_FILE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_FILE_DEL" + "(:V_V_FILEGUID,:V_INFO)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_INF_FILE_DEL");
        return result;
    }

    public List<Map> SG_INF_FILE_GET(String V_V_FILEGUID) throws SQLException {
        logger.info("begin SG_INF_FILE_GET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SG_INF_FILE_GET" + "(:V_V_FILEGUID,:V_INFO,:V_FILEBLOB)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FILEBLOB", OracleTypes.BLOB);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Blob stream = (Blob) cstmt.getObject("V_FILEBLOB");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            sledata.put("V_FILEBLOB", stream);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SG_INF_FILE_GET");
        return result;
    }



    public Map PRO_PM_03_PLAN_YEAR_VIEW1(String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRMAJOR_CODE,String V_V_FLOWCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW1");
        logger.debug("params:V_V_YEAR:" + V_V_YEAR + "params:V_V_ORGCODE:" + V_V_ORGCODE+
                "params:V_V_DEPTCODE:" + V_V_DEPTCODE+"params:V_V_REPAIRMAJOR_CODE:" + V_V_REPAIRMAJOR_CODE+
                "params:V_V_FLOWCODE:" + V_V_FLOWCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW1(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_REPAIRMAJOR_CODE,:V_V_FLOWCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW1");
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







}
