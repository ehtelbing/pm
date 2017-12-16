package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.*;

import java.util.*;
import java.util.Date;


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class QkService {
    private static final Logger logger = Logger.getLogger(QkService.class.getName());

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

    public HashMap PM_EQU_REPAIR_FLOW_PERSEL(String V_V_DEPTCODE, String V_V_ZYCODE) throws SQLException {

        logger.info("begin PM_EQU_REPAIR_FLOW_PERSEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EQU_REPAIR_FLOW_PERSEL" + "(:V_V_DEPTCODE,:V_V_ZYCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZYCODE", V_V_ZYCODE);
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
        logger.info("end PM_EQU_REPAIR_FLOW_PERSEL");
        return result;
    }

    public HashMap PM_EQU_REPAIR_DATA_SET(String V_V_FLOWGUID,String  V_V_ORGCODE,String  V_V_DEPTCODE,String V_V_ITEMCODE,
                                          String V_V_ITEMNAME, String V_V_YEAR,String V_V_MONTH, Date V_V_TIME_B,
                                          Date V_V_TIME_E,String V_V_MAJOR,String V_V_BUDGET_MONEY,String V_V_MONEY,
                                          String V_V_REPAIR_TYPE, String V_V_REPAIR_DEPT,String V_V_REPAIR_STATUS,
                                          String V_V_FILE_GUID,String V_V_EXPLAIN, String V_V_SCHEME,String V_V_FLOW_STATUS,
                                          String V_V_FLOW_STEPCODE, String V_V_INPER,String V_V_INTIME) throws SQLException {

        logger.info("begin PM_EQU_REPAIR_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        java.sql.Date sqlDate1 = new java.sql.Date(V_V_TIME_B.getTime());
        java.sql.Date sqlDate2 = new java.sql.Date(V_V_TIME_E.getTime());

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_EQU_REPAIR_DATA_SET" + "(:V_V_FLOWGUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ITEMCODE," +
                    ":V_V_ITEMNAME,:V_V_YEAR,:V_V_MONTH,:V_V_TIME_B,:V_V_TIME_E,:V_V_MAJOR,:V_V_BUDGET_MONEY,:V_V_MONEY," +
                    ":V_V_REPAIR_TYPE,:V_V_REPAIR_DEPT,:V_V_REPAIR_STATUS,:V_V_FILE_GUID,:V_V_EXPLAIN,:V_V_SCHEME," +
                    ":V_V_FLOW_STATUS,:V_V_FLOW_STEPCODE,:V_V_INPER,:V_V_INTIME,:V_INFO)}");
            cstmt.setString("V_V_FLOWGUID", V_V_FLOWGUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ITEMCODE", V_V_ITEMCODE);
            cstmt.setString("V_V_ITEMNAME", V_V_ITEMNAME);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setDate("V_V_TIME_B", sqlDate1);
            cstmt.setDate("V_V_TIME_E", sqlDate2);
            cstmt.setString("V_V_MAJOR", V_V_MAJOR);
            cstmt.setString("V_V_BUDGET_MONEY", V_V_BUDGET_MONEY);
            cstmt.setString("V_V_MONEY", V_V_MONEY);
            cstmt.setString("V_V_REPAIR_TYPE", V_V_REPAIR_TYPE);
            cstmt.setString("V_V_REPAIR_DEPT", V_V_REPAIR_DEPT);
            cstmt.setString("V_V_REPAIR_STATUS", V_V_REPAIR_STATUS);
            cstmt.setString("V_V_FILE_GUID", V_V_FILE_GUID);
            cstmt.setString("V_V_EXPLAIN", V_V_EXPLAIN);
            cstmt.setString("V_V_SCHEME", V_V_SCHEME);
            cstmt.setString("V_V_FLOW_STATUS", V_V_FLOW_STATUS);
            cstmt.setString("V_V_FLOW_STEPCODE", V_V_FLOW_STEPCODE);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
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
        logger.info("end PM_EQU_REPAIR_DATA_SET");
        return result;
    }

    public List<Map> PRO_BASE_FILE_ADD(String V_V_GUID,String V_V_FILENAME,FileInputStream V_V_FILEBLOB,
                                     String V_V_FILETYPECODE,String V_V_PLANT,String V_V_DEPT,
                                     String V_V_PERSON,String V_V_REMARK) throws SQLException {
        logger.info("begin PRO_BASE_FILE_ADD");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_ADD" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB," +
                    ":V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBinaryStream("V_V_FILEBLOB", V_V_FILEBLOB);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
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
        logger.info("end PRO_BASE_FILE_ADD");
        return result;
    }

    public HashMap PM_EQU_REPAIR_DATA_SEL(String V_V_ORGCODE,String  V_V_DEPTCODE,String V_V_ITEMNAME,String V_V_YEAR,
                                          String V_V_MONTH,String V_V_FLOW_STATUS,String V_V_ZY) throws SQLException {

        logger.info("begin PM_EQU_REPAIR_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EQU_REPAIR_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ITEMNAME," +
                    ":V_V_YEAR,:V_V_MONTH,:V_V_FLOW_STATUS,:V_V_ZY,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ITEMNAME", V_V_ITEMNAME);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_FLOW_STATUS", V_V_FLOW_STATUS);
            cstmt.setString("V_V_ZY", V_V_ZY);
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
        logger.info("end PM_EQU_REPAIR_DATA_SEL");
        return result;
    }

    public List<Map> PRO_BASE_FILE_DOWNLOAD(String V_V_FILEGUID) throws SQLException {
        logger.info("begin PRO_BASE_FILE_DOWNLOAD");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_DOWNLOAD" + "(:V_V_FILEGUID,:V_BLOB,:V_INFO)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_BLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Blob stream = (Blob) cstmt.getObject("V_BLOB");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            sledata.put("V_BLOB", stream);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_FILE_DOWNLOAD");
        return result;
    }

}
