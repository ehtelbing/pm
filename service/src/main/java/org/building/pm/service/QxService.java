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
public class QxService {
    private static final Logger logger = Logger.getLogger(QxService.class.getName());

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

    public Map PRO_PM_07_DEPTEQUTYPE_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEPTEQUTYPE_PER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("leaf", true);
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
        logger.info("end PRO_PM_07_DEPTEQUTYPE_PER");
        return result;
    }

    public Map PRO_PM_07_DEPTEQU_PER_DROP(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEPTEQU_PER_DROP");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEPTEQU_PER_DROP(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                sledata.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
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
        logger.info("end PRO_PM_07_DEPTEQU_PER_DROP");
        return result;
    }

    public Map PRO_PM_07_DEFECT_STATE_VIEW() throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_STATE_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_STATE_VIEW(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_STATECODE", rs.getString("V_STATECODE"));
                sledata.put("V_STATENAME", rs.getString("V_STATENAME"));
                sledata.put("V_STATEREMARK", rs.getString("V_STATEREMARK"));
                sledata.put("V_STATECOLOR", rs.getString("V_STATECOLOR"));
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
        logger.info("end PRO_PM_07_DEFECT_STATE_VIEW");
        return result;
    }

    public Map PRO_PM_07_DEFECT_SOURCE_COUNT(String V_D_DEFECTDATE_B,String V_D_DEFECTDATE_E,String V_V_DEPTCODE,
                                             String V_V_EQUTYPECODE,String V_V_EQUCODE,String V_V_STATECODE,
                                             String V_V_DEFECTLIST,String X_PERSONCODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SOURCE_COUNT");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SOURCE_COUNT(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_STATECODE,:V_V_DEFECTLIST,:X_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getDouble("I_ID"));
                sledata.put("V_SOURCECODE", rs.getString("V_SOURCECODE"));
                sledata.put("V_SOURCENAME", rs.getString("V_SOURCENAME"));
                sledata.put("V_SOURCETABLE", rs.getString("V_SOURCETABLE"));
                sledata.put("V_SOURCEREMARK", rs.getString("V_SOURCEREMARK"));
                sledata.put("I_ORDER", rs.getString("I_ORDER"));
                sledata.put("V_COUNT", rs.getDouble("V_COUNT"));
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
        logger.info("end PRO_PM_07_DEFECT_SOURCE_COUNT");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_PER(String V_D_DEFECTDATE_B,String V_D_DEFECTDATE_E,String V_V_DEPTCODE,
                                         String V_V_EQUTYPECODE,String V_V_EQUCODE,String V_V_STATECODE,
                                         String V_V_SOURCECODE,String V_V_DEFECTLIST,String X_PERSONCODE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_PER");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_PER(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_STATECODE,:V_V_SOURCECODE,:V_V_DEFECTLIST,:X_PERSONCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("total", cstmt.getObject("V_V_SNUM").toString());
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getDouble("I_ID"));
                sledata.put("V_DEFECTLIST", rs.getString("V_DEFECTLIST"));
                sledata.put("V_SOURCECODE", rs.getString("V_SOURCECODE"));
                sledata.put("V_SOURCENAME", rs.getString("V_SOURCENAME"));
                sledata.put("V_SOURCETABLE", rs.getString("V_SOURCETABLE"));
                sledata.put("V_SOURCEREMARK", rs.getString("V_SOURCEREMARK"));
                sledata.put("V_SOURCEID", rs.getString("V_SOURCEID"));
                sledata.put("D_DEFECTDATE", rs.getDate("D_DEFECTDATE"));
                sledata.put("D_INDATE", rs.getDate("D_INDATE"));
                sledata.put("V_PERCODE", rs.getString("V_PERCODE"));
                sledata.put("V_PERNAME", rs.getString("V_PERNAME"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                sledata.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_IDEA", rs.getString("V_IDEA"));
                sledata.put("V_STATECODE", rs.getString("V_STATECODE"));
                sledata.put("V_IDEA", rs.getString("V_IDEA"));
                sledata.put("V_STATENA9ME", rs.getString("V_STATENAME"));
                sledata.put("V_STATECOLOR", rs.getString("V_STATECOLOR"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                sledata.put("V_ORDERID", rs.getString("V_ORDERID"));
                sledata.put("V_REPAIRMAJOR_CODE", rs.getString("V_REPAIRMAJOR_CODE"));
                sledata.put("V_HOUR", rs.getString("V_HOUR"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
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
        logger.info("end PRO_PM_07_DEFECT_VIEW_PER");
        return result;
    }

    public Map PRO_PM_07_DEFECT_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_GET");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_GET(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getDouble("I_ID"));
                sledata.put("V_DEFECTLIST", rs.getString("V_DEFECTLIST"));
                sledata.put("V_SOURCECODE", rs.getString("V_SOURCECODE"));
                sledata.put("V_SOURCENAME", rs.getString("V_SOURCENAME"));
                sledata.put("V_SOURCETABLE", rs.getString("V_SOURCETABLE"));
                sledata.put("V_SOURCEREMARK", rs.getString("V_SOURCEREMARK"));
                sledata.put("V_SOURCEID", rs.getString("V_SOURCEID"));
                sledata.put("D_DEFECTDATE", rs.getDate("D_DEFECTDATE"));
                sledata.put("D_INDATE", rs.getDate("D_INDATE"));
                sledata.put("V_PERCODE", rs.getString("V_PERCODE"));
                sledata.put("V_PERNAME", rs.getString("V_PERNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                sledata.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_IDEA", rs.getString("V_IDEA"));
                sledata.put("V_STATECODE", rs.getString("V_STATECODE"));
                sledata.put("V_IDEA", rs.getString("V_IDEA"));
                sledata.put("V_STATENAME", rs.getString("V_STATENAME"));
                sledata.put("V_STATECOLOR", rs.getString("V_STATECOLOR"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                sledata.put("V_REPAIRMAJOR_CODE", rs.getString("V_REPAIRMAJOR_CODE"));
                sledata.put("V_HOUR", rs.getString("V_HOUR"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
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
        logger.info("end PRO_PM_07_DEFECT_GET");
        return result;
    }

    public List<Map> PRO_PM_07_DEFECT_SET_XQ(String V_V_GUID,String V_V_PERCODE,String V_V_XQYY) throws SQLException {
//        logger.info("begin PRO_PM_07_DEFECT_SET_XQ");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SET_XQ" + "(:V_V_GUID,:V_V_MENUCODE,:V_V_XQYY,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_XQYY", V_V_XQYY);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("V_CURSOR");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_SET_XQ");
        return result;
    }

    public Map PRO_PM_07_DEFECT_LOG_VIEW(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_LOG_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_LOG_VIEW(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("D_DATE", rs.getDate("D_DATE"));
                sledata.put("V_LOGREMARK", rs.getString("V_LOGREMARK"));
                sledata.put("V_FINISHNAME", rs.getString("V_FINISHNAME"));
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
        logger.info("end PRO_PM_07_DEFECT_LOG_VIEW");
        return result;
    }

    public Map PRO_PM_07_DEFECT_TJ_VIEW(String V_D_DEFECTDATE_B,String V_D_DEFECTDATE_E,String V_V_DEPTCODE2,
                                        String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE,String V_V_EQUCODE,
                                        String V_V_SOURCECODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_TJ_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_TJ_VIEW(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_V_DEPTCODE2," +
                    ":V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_V_DEPTCODE2", V_V_DEPTCODE2);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_1", rs.getString("V_1"));
                sledata.put("V_2", rs.getString("V_2"));
                sledata.put("上报数量", rs.getString("上报数量"));
                sledata.put("有效数量", rs.getString("有效数量"));
                sledata.put("已处理数量", rs.getString("已处理数量"));
                sledata.put("F_4", rs.getString("F_4"));
                sledata.put("F_5", rs.getString("F_5"));
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
        logger.info("end PRO_PM_07_DEFECT_TJ_VIEW");
        return result;
    }

    public Map PRO_PM_07_DEFECT_SOURCE_VIEW() throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SOURCE_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SOURCE_VIEW(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getDouble("I_ID"));
                sledata.put("V_SOURCECODE", rs.getString("V_SOURCECODE"));
                sledata.put("V_SOURCENAME", rs.getString("V_SOURCENAME"));
                sledata.put("V_SOURCETABLE", rs.getString("V_SOURCETABLE"));
                sledata.put("V_SOURCEREMARK", rs.getString("V_SOURCEREMARK"));
                sledata.put("I_ORDER", rs.getDouble("I_ORDER"));
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
        logger.info("end PRO_PM_07_DEFECT_SOURCE_VIEW");
        return result;
    }

    public Map PRO_PM_07_GET_DEPTEQU_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_GET_DEPTEQU_PER");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_GET_DEPTEQU_PER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                sledata.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
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
        logger.info("end PRO_PM_07_GET_DEPTEQU_PER");
        return result;
    }




    public Map PRO_PM_07_BASEDIC_LIST(String IS_V_BASETYPE) throws SQLException {

        logger.info("begin PRO_PM_07_BASEDIC_LIST");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_BASEDIC_LIST(:IS_V_BASETYPE,:V_CURSOR)}");
            cstmt.setString("IS_V_BASETYPE", IS_V_BASETYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_BASECODE", rs.getString("V_BASECODE"));
                sledata.put("V_BASENAME", rs.getString("V_BASENAME"));
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
        logger.info("end PRO_PM_07_BASEDIC_LIST");
        return result;
    }




    public Map PRO_PM_07_SAP_EQU_GET(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,
                                     String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_07_SAP_EQU_GET");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_SAP_EQU_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQULEV", rs.getString("V_EQULEV"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                sledata.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                sledata.put("V_ZZCH", rs.getString("V_ZZCH"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("F_MONEY", rs.getString("F_MONEY"));
                sledata.put("V_MONEYTYPE", rs.getString("V_MONEYTYPE"));
                sledata.put("F_WEIGHT", rs.getString("F_WEIGHT"));
                sledata.put("V_WEIGHTTYPE", rs.getString("V_WEIGHTTYPE"));
                sledata.put("V_DATE_B", rs.getString("V_DATE_B"));
                sledata.put("V_DATE_E", rs.getString("V_DATE_E"));
                sledata.put("V_ZZS", rs.getString("V_ZZS"));
                sledata.put("V_GGXH", rs.getString("V_GGXH"));
                sledata.put("V_YWFW", rs.getString("V_YWFW"));
                sledata.put("V_ABC", rs.getString("V_ABC"));
                sledata.put("V_SIZE", rs.getString("V_SIZE"));
                sledata.put("V_WHGC", rs.getString("V_WHGC"));
                sledata.put("V_JHWHGC", rs.getString("V_JHWHGC"));
                sledata.put("V_CBZX", rs.getString("V_CBZX"));
                sledata.put("V_GZRQ", rs.getString("V_GZRQ"));
                sledata.put("V_JHZY", rs.getString("V_JHZY"));
                sledata.put("V_SBYDH", rs.getString("V_SBYDH"));
                sledata.put("V_EQUCODEUP", rs.getString("V_EQUCODEUP"));
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
        logger.info("end PRO_PM_07_SAP_EQU_GET");
        return result;
    }

    public List<Map> PRO_PM_07_PP_DEFECT_SET(String V_I_ID,String V_V_EQUCODE,String V_V_EQUTYPE,
                                             String V_V_CHILDEQUCODE,String V_V_CLASS,String V_V_CLASSTYPE,
                                             String V_D_DEFECTDATE,String V_D_INDATE,String V_V_DESCRIPTION,
                                             String V_V_SUGGESTION,String V_V_PERSONCODE,String V_V_PERSONNAME,
                                             String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_PM_07_PP_DEFECT_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_PP_DEFECT_SET" + "(:V_I_ID,:V_V_EQUCODE,:V_V_EQUTYPE," +
                    ":V_V_CHILDEQUCODE,:V_V_CLASS,:V_V_CLASSTYPE,:V_D_DEFECTDATE,:V_D_INDATE,:V_V_DESCRIPTION," +
                    ":V_V_SUGGESTION,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_DEPTCODE,:RET)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_CHILDEQUCODE", V_V_CHILDEQUCODE);
            cstmt.setString("V_V_CLASS", V_V_CLASS);
            cstmt.setString("V_V_CLASSTYPE", V_V_CLASSTYPE);
            cstmt.setString("V_D_DEFECTDATE", V_D_DEFECTDATE);
            cstmt.setString("V_D_INDATE", V_D_INDATE);
            cstmt.setString("V_V_DESCRIPTION", V_V_DESCRIPTION);
            cstmt.setString("V_V_SUGGESTION", V_V_SUGGESTION);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("RET");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_PP_DEFECT_SET");
        return result;
    }

    public List<Map> PRO_PM_07_DEFECTDESCRIBE_SET(String V_I_ID,String V_V_EQUCODE,String V_V_DESCRIPTION,
                                                  String V_V_SUGGESTION,String V_V_PERSONCODE,String V_V_PERSONNAME,
                                                  String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_PM_07_DEFECTDESCRIBE_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECTDESCRIBE_SET" + "(:V_I_ID,:V_V_EQUCODE,:V_V_DESCRIPTION," +
                    ":V_V_SUGGESTION,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_DEPTCODE,:RET)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_DESCRIPTION", V_V_DESCRIPTION);
            cstmt.setString("V_V_SUGGESTION", V_V_SUGGESTION);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("RET");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECTDESCRIBE_SET");
        return result;
    }

    public Map PRO_PM_07_DEFECTDESCRIPTION_L(String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECTDESCRIPTION_L");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECTDESCRIPTION_L(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_DESCRIPTION", rs.getString("V_DESCRIPTION"));
                sledata.put("V_SUGGESTION", rs.getString("V_SUGGESTION"));
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
        logger.info("end PRO_PM_07_DEFECTDESCRIPTION_L");
        return result;
    }

    public List<Map> PRO_PM_07_DEFECT_EDIT(String V_V_GUID,String V_V_PERCODE,String V_V_DEFECTLIST) throws SQLException {
//        logger.info("begin PRO_PM_07_DEFECT_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_EDIT" + "(:V_V_GUID,:V_V_PERCODE,:V_V_DEFECTLIST,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_V_GUID);
            cstmt.setString("V_V_EQUCODE", V_V_PERCODE);
            cstmt.setString("V_V_DESCRIPTION", V_V_DEFECTLIST);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("V_CURSOR");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_EDIT");
        return result;
    }

    public HashMap PRO_PM_07_WORKORDER_DEFECT(String V_V_PERNAME,String V_DEFECT_GUID) throws SQLException {

        logger.info("begin PRO_PM_07_WORKORDER_DEFECT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_WORKORDER_DEFECT" + "(:V_V_PERNAME,:V_DEFECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);
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
        logger.info("end PRO_PM_07_WORKORDER_DEFECT");
        return result;
    }

}
