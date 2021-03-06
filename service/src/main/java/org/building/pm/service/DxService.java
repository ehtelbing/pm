package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 */

@Service
public class DxService {

    private static final Logger logger = Logger.getLogger(DxService.class.getName());

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
    public Map plant_sel(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTCODENEXT,String V_V_DEPTTYPE) throws SQLException {


        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public Map dept_sel(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTCODENEXT,String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public List<Map> PRO_BASE_DEPT_TREE(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_TREE");
        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODE);
        List<Map> result = new ArrayList<Map>();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("ID", rs.getString("V_DEPTCODE"));
                sledata.put("NAME", rs.getString("V_DEPTNAME"));
                sledata.put("I_DEPTID", rs.getDouble("I_DEPTID"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_DEPTCODE_UP", rs.getString("V_DEPTCODE_UP"));
                sledata.put("V_DEPTSMALLNAME", rs.getString("V_DEPTSMALLNAME"));
                sledata.put("V_DEPTFULLNAME", rs.getString("V_DEPTFULLNAME"));
                sledata.put("V_DEPTTYPE", rs.getString("V_DEPTTYPE"));
                sledata.put("I_ORDERID", rs.getDouble("I_ORDERID"));
                sledata.put("I_FLAG", rs.getDouble("I_FLAG"));
                sledata.put("V_SAP_DEPT", rs.getString("V_SAP_DEPT"));
                sledata.put("V_SAP_WORK", rs.getString("V_SAP_WORK"));
                sledata.put("V_SAP_JHGC", rs.getString("V_SAP_JHGC"));
                sledata.put("V_SAP_YWFW", rs.getString("V_SAP_YWFW"));
                sledata.put("D_DATE_EDITTIME", rs.getDate("D_DATE_EDITTIME"));
                sledata.put("V_EDIT_GUID", rs.getString("V_EDIT_GUID"));
//                sledata.put("V_CLASS_FLAG", rs.getString("V_CLASS_FLAG"));
                result.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_TREE");
        return result;
    }

    public List<Map> PRO_GET_DEPTEQUTYPE_WXPER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODENEXT);
        List<Map> result = new ArrayList<Map>();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_WXPER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }

    public Map PMDX_ITEMS_TYPE_SEL() throws SQLException {

        logger.info("begin PMDX_ITEMS_TYPE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PMDX_ITEMS_TYPE_SEL(:V_CURSOR)}");
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
        logger.info("end PMDX_ITEMS_TYPE_SEL");
        return result;
    }


    public Map PMDX_ITEMS_SEL(String V_V_YEAR,String V_V_PARTCODE,String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PMDX_ITEMS_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PMDX_ITEMS_SEL(:V_V_YEAR,:V_V_PARTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_PARTCODE", V_V_PARTCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PMDX_ITEMS_SEL");
        return result;
    }

    public List<Map> PMDX_ITEM_FILE_INSERT(String V_V_GUID, String V_V_FILEGUID, String V_V_FILENAME, FileInputStream V_V_FILEBLOB, String V_V_FILEPER ,String V_V_FILEDATE) throws SQLException {
        logger.info("begin PMDX_ITEM_FILE_INSERT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEM_FILE_INSERT" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILEPER,:V_V_FILEDATE,:V_INFO) } ");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBinaryStream("V_V_FILEBLOB", V_V_FILEBLOB);
            cstmt.setString("V_V_FILEPER", V_V_FILEPER);
            cstmt.setString("V_V_FILEDATE", V_V_FILEDATE);
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
        logger.info("end PMDX_ITEM_FILE_INSERT");
        return result;
    }

    public List<Map> PMDX_ITEMS_EDIT(String V_I_ID,String V_V_EQUCODE,String V_V_ITEMTYPE ,String V_V_ITEM_CODE,
                                     String V_V_ITEM_CODEUP,String V_V_ITEM_MEMO,String V_D_DATE_B,
                                     String V_D_DATE_E,String V_D_DATE_IN,String V_V_PERCODE,String V_I_YEAR,
                                     String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ITEM_NAME,
                                     String V_V_ITEM_NAMEUP) throws SQLException {
        logger.info("begin PMDX_ITEMS_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEMS_EDIT" + "(:V_I_ID,:V_V_EQUCODE,:V_V_ITEMTYPE,:V_V_ITEM_CODE," +
                    ":V_V_ITEM_CODEUP,:V_V_ITEM_MEMO,:V_D_DATE_B,:V_D_DATE_E,:V_D_DATE_IN,:V_V_PERCODE,:V_I_YEAR," +
                    ":V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ITEM_NAME,:V_V_ITEM_NAMEUP,:V_INFO)}");

            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ITEMTYPE", V_V_ITEMTYPE);
            cstmt.setString("V_V_ITEM_CODE", V_V_ITEM_CODE);
            cstmt.setString("V_V_ITEM_CODEUP", V_V_ITEM_CODEUP);
            cstmt.setString("V_V_ITEM_MEMO", V_V_ITEM_MEMO);
            cstmt.setString("V_D_DATE_B", V_D_DATE_B);
            cstmt.setString("V_D_DATE_E", V_D_DATE_E);
            cstmt.setString("V_D_DATE_IN", V_D_DATE_IN);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ITEM_NAME", V_V_ITEM_NAME);
            cstmt.setString("V_V_ITEM_NAMEUP", V_V_ITEM_NAMEUP);
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
        logger.info("end PMDX_ITEMS_EDIT");
        return result;
    }

    public Map PRO_GET_DEPTEQU_WXPER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQU_WXPER");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_WXPER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_GET_DEPTEQU_WXPER");
        return result;
    }

    public Map PMDX_ITEM_FILE_SEL(String V_V_GUID) throws SQLException {


        logger.info("begin PMDX_ITEM_FILE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEM_FILE_SEL(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PMDX_ITEM_FILE_SEL");
        return result;
    }

    public List<Map> PMDX_ITEM_FILE_DEL(String V_V_FILEGUID) throws SQLException {
        logger.info("begin PMDX_ITEM_FILE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEM_FILE_DEL" + "(:V_V_FILEGUID,:V_INFO)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
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
        logger.info("end PMDX_ITEM_FILE_DEL");
        return result;
    }

    public List<Map> PMDX_ITEM_FILE_GET(String V_V_FILEGUID) throws SQLException {
        logger.info("begin PMDX_ITEM_FILE_GET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEM_FILE_GET" + "(:V_V_FILEGUID,:V_INFO,:V_FILEBLOB)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FILEBLOB", OracleTypes.BLOB);
            cstmt.execute();

            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            sledata.put("V_FILEBLOB", (Blob) cstmt.getObject("V_FILEBLOB"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PMDX_ITEM_FILE_GET");
        return result;
    }

    public List<Map> PRO_BASE_POSTTOPERSON_GET(String V_V_PERSONCODE,String V_V_POSTCODE) throws SQLException {
        logger.info("begin PRO_BASE_POSTTOPERSON_GET");
        List<Map> result = new ArrayList<Map>();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_POSTTOPERSON_GET(:V_V_PERSONCODE,:V_V_POSTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_BASE_POSTTOPERSON_GET");
        return result;
    }

    public  List<String> PRO_BASE_DEPTTOSAPCSAT_VIEW(String V_V_DEPTCODE,String V_V_CBZX) throws SQLException {
        logger.info("begin PMDX_ITEM_FILE_DEL");
        List<String> result = new ArrayList<String>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PMDX_ITEM_FILE_DEL" + "(:V_V_DEPTCODE,:V_V_CBZX,:V_CURSOR)}");

            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.add((String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PMDX_ITEM_FILE_DEL");
        return result;
    }

    public List<Map> PRO_BASE_POST_TREE(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_POST_TREE");
        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODE);
        List<Map> result = new ArrayList<Map>();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_POSTID", rs.getDouble("I_POSTID"));
                sledata.put("V_POSTCODE", rs.getString("V_POSTCODE"));
                sledata.put("V_POSTNAME", rs.getString("V_POSTNAME"));
                sledata.put("V_POSTMEMO", rs.getString("V_POSTMEMO"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_POSTCODE_UP", rs.getString("V_POSTCODE_UP"));
                sledata.put("D_DATE_EDITTIME", rs.getDate("D_DATE_EDITTIME"));
                sledata.put("V_EDIT_GUID", rs.getString("V_EDIT_GUID"));
                result.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_BASE_POST_TREE");
        return result;
    }
    public Map PRO_PM_EQUREPAIRPLAN_TREE_GET(String V_V_GUID,String V_BY1,String V_BY2,String V_BY3) throws SQLException {
        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_GET");
        Map result = new HashMap();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_GET(:V_V_GUID,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_GET");
        return result;
    }
    public Map PRO_PM_EQUREPAIRPLAN_YG_VIEW(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_EQUREPAIRPLAN_YG_VIEW");
        Map result = new HashMap();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_YG_VIEW(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO",  cstmt.getObject("V_INFO"));
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
    public Map PRO_PM_EQUREPAIRPLAN_WL_VIEW(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_EQUREPAIRPLAN_WL_VIEW");
        Map result = new HashMap();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_WL_VIEW(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO",  cstmt.getObject("V_INFO"));
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
    public Map PRO_PM_EQUREPAIRPLAN_JJ_VIEW(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_EQUREPAIRPLAN_JJ_VIEW");
        Map result = new HashMap();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_JJ_VIEW(:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO",  cstmt.getObject("V_INFO"));
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

    public Map PRO_MONTH_WEEK_DEFECT_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_MONTH_WEEK_DEFECT_SEL");
        Map result = new HashMap();
        CallableStatement cstmt = null;
        Connection conn = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MONTH_WEEK_DEFECT_SEL(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_MONTH_WEEK_DEFECT_SEL");
        return result;
    }
}
