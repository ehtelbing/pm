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
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 */

@Service
public class PM_1921Service {
    private static final Logger logger = Logger.getLogger(PM_1921Service.class.getName());

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

    public HashMap PM_1921_PLAN_MX_DATA_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ZYCODE,
                                            String V_V_MXNAME,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_1921_PLAN_MX_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_MX_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZYCODE," +
                    ":V_V_MXNAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZYCODE", V_V_ZYCODE);
            cstmt.setString("V_V_MXNAME", V_V_MXNAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total",sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1921_PLAN_MX_DATA_SEL");
        return result;
    }

    public HashMap PM_1921_PLAN_EQU_DATA_SEL(String V_V_MXCODE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_1921_PLAN_EQU_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_EQU_DATA_SEL" + "(:V_V_MXCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_MXCODE", V_V_MXCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total",sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1921_PLAN_EQU_DATA_SEL");
        return result;
    }

    public List<Map> PM_1921_PLAN_MX_DATA_SET(String V_V_MX_CODE,String V_V_MX_NAME,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_SPECIALTY,String V_V_MENO,String V_V_INPER) throws SQLException {
//        logger.info("begin PM_1921_PLAN_MX_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_MX_DATA_SET" + "(:V_V_MX_CODE,:V_V_MX_NAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_MENO,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_MX_CODE", V_V_MX_CODE);
            cstmt.setString("V_V_MX_NAME", V_V_MX_NAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_MENO", V_V_MENO);
            cstmt.setString("V_V_INPER", V_V_INPER);
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
        logger.info("end PM_1921_PLAN_MX_DATA_SET");
        return result;
    }

    public List<Map> PM_1921_PLAN_EQU_DATA_SET(String V_V_MX_CODE,String V_V_GUID,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_MENO,String V_V_INPER,String V_V_JXMX_CODE) throws SQLException {
//        logger.info("begin PM_1921_PLAN_EQU_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_EQU_DATA_SET" + "(:V_V_MX_CODE,:V_V_GUID,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_MENO,:V_V_INPER,:V_V_JXMX_CODE,:V_INFO)}");
            cstmt.setString("V_V_MX_CODE", V_V_MX_CODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_MENO", V_V_MENO);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
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
        logger.info("end PM_1921_PLAN_EQU_DATA_SET");
        return result;
    }

    public HashMap PM_1921_PLAN_DATA_DEL(String V_V_TYPE,String  V_V_MXCODE,String  V_V_GUID) throws SQLException {

        logger.info("begin PM_1921_PLAN_DATA_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_DATA_DEL" + "(:V_V_TYPE,:V_V_MXCODE,:V_V_GUID," +
                    ":V_INFO)}");
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_MXCODE", V_V_MXCODE);
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
        logger.info("end PM_1921_PLAN_DATA_DEL");
        return result;
    }

    public List<Map> PM_1921_PLAN_MX_DATA_CHECK(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PLANTYPE, String V_V_PERCODE,
                                                String V_V_YEAR, String V_V_QUARTER, String V_V_MONTH, String V_V_WEEK, String V_V_STIME,
                                                String V_V_ETIME, String V_V_SUNTIME) throws SQLException {
//        logger.info("begin PM_1921_PLAN_MX_DATA_CHECK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1921_PLAN_MX_DATA_CHECK" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PLANTYPE,:V_V_PERCODE," +
                    ":V_V_YEAR,:V_V_QUARTER,:V_V_MONTH,:V_V_WEEK,:V_V_STIME," +
                    ":V_V_ETIME,:V_V_SUNTIME,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
            cstmt.setString("V_V_SUNTIME", V_V_SUNTIME);

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
        logger.info("end PM_1921_PLAN_MX_DATA_CHECK");
        return result;
    }
}
