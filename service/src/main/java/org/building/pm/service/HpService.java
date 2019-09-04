package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.axis.client.Call;
import org.apache.axis.encoding.XMLType;
import org.apache.axis.message.SOAPHeaderElement;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.soap.SOAPException;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by zjh on 2017/1/22.
 */

@Service
public class HpService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

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

    public HashMap PRO_PM_03_PLAN_YEAR_SET(String V_V_GUID, String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE
            , String V_V_REPAIRMAJOR_CODE, String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_SUMHOUR
            , String V_V_BZ, String V_V_INPER, String V_V_JHMX_GUID) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SET" + "(:V_V_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_SUMHOUR,:V_V_BZ,:V_V_INPER,:V_V_JHMX_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_SUMHOUR", V_V_SUMHOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            //cstmt.setDate("V_D_DEFECTDATE", Date.valueOf(V_D_DEFECTDATE));
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_VIEW(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT,  String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_03_PLAN_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_GET" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_03_PLAN_YEAR_GET");
        return result;
    }

    //年计划删除单行数据
    public HashMap PRO_PM_03_PLAN_YEAR_DEL(String V_V_YEARPLAN_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_DEL" + "(:V_V_YEARPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_YEARPLAN_GUID", V_V_YEARPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_DEL");
        return result;
    }

    //季度计划删除单行数据
    public HashMap PRO_PM_03_PLAN_QUARTER_DEL(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_QUARTER_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_DEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_DEL");
        return result;
    }

    //年度上报
    public HashMap PRO_PM_03_PLAN_YEAR_SEND(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE,
                                            String V_V_FLOWCODE, String V_V_PLANTYPE, String V_V_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SEND");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SEND" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SEND");
        return result;
    }

    public Map PM_03_PLAN_AGREE(String V_V_GUID, String V_V_PLANTYPE, String V_V_IDEA, String V_V_INPER) throws SQLException {
        logger.info("begin PM_03_PLAN_AGREE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_AGREE" + "(:V_V_GUID,:V_V_PLANTYPE,:V_V_IDEA,:V_V_INPER,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_AGREE");
        return result;
    }

    public Map PM_03_PLAN_DISAGREE(String V_V_GUID, String V_V_PLANTYPE, String V_V_IDEA, String V_V_INPER) throws SQLException {
        logger.info("begin PM_03_PLAN_DISAGREE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_DISAGREE" + "(:V_V_GUID,:V_V_PLANTYPE,:V_V_IDEA,:V_V_INPER,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_DISAGREE");
        return result;
    }


    public HashMap PM_03_QUARTER_PLAN_SEL(String V_V_YEAR, String V_V_QUARTER, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_ZY,
                                          String V_V_CONTENT, String V_V_STATECODE, String V_V_PEROCDE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_03_QUARTER_PLAN_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_QUARTER_PLAN_SEL" + "(:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
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
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_QUARTER_PLAN_SEL");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_QUARTER_SET(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_QUARTER, String V_V_ORGCODE, String V_V_DEPTCODE, String
            V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE, String V_V_CONTENT, String V_V_STARTTIME
            , String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE, String V_V_JHMX_GUID, String V_V_HOUR, String V_V_BZ) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_QUARTER_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_SET" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_OTHERPLAN_GUID,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            //cstmt.setDate("V_D_DEFECTDATE", Date.valueOf(V_D_DEFECTDATE));
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);
            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_SET");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_QUARTER_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_QUARTER_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_GET" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_GET");
        return result;
    }

    //年度上报
    public HashMap PRO_PM_03_PLAN_QUARTER_SEND(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE,
                                               String V_V_FLOWCODE, String V_V_PLANTYPE, String V_V_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_QUARTER_SEND");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_SEND" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_SEND");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE,
                                               String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_PERSONCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DATA_SEL");
        return result;
    }

   /* public InputStream PM_06_EXCEL_NEW_METHOD(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE,
                                              String V_V_EQUTYPE, String V_V_EQUCODE,String V_V_PERSONCODE,String  V_V_PAGE,String V_V_PAGESIZE,HttpServletRequest request) {
        NPOIFSFileSystem fs = null;
        Workbook workbook = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            File file = new File(this.getClass().getResource("hp001.xls").getFile());
            FileInputStream inputStream = new FileInputStream(file);
            fs = new NPOIFSFileSystem(inputStream);
            workbook = (Workbook) new HSSFWorkbook(fs.getRoot(), true);

            Sheet sheet = workbook.getSheetAt(0);
            HashMap data = PM_06_DJ_CRITERION_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE,
                    V_V_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);
            List<Map<String, Object>> b019List = (List) data.get("list");


            Map<String, Object> b019;

            for (int i = 0; i < b019List.size(); i++) {
                b019 = b019List.get(i);
                Row row = sheet.createRow(i + 2);

                row.createCell(0).setCellValue(i+1);

                if (b019.get("V_CRITERION_ITEM") != null) {
                    String V_GD_NAME = b019.get("V_CRITERION_ITEM").toString();
                    row.createCell(1).setCellValue(V_GD_NAME);
                }

                if (b019.get("V_CRITERION_CONTENT") != null) {
                    String AA = b019.get("V_CRITERION_CONTENT").toString();
                    row.createCell(2).setCellValue(AA);
                }

                if (b019.get("V_CRITERION_CR") != null) {
                    String BB = b019.get("V_CRITERION_CR").toString();
                    row.createCell(3).setCellValue(BB);
                }

                if (b019.get("V_CRITERION_CYCLE") != null) {
                    String CC = b019.get("V_CRITERION_CYCLE").toString();
                    row.createCell(4).setCellValue(CC);
                }

                if (b019.get("V_CRITERION_CYCLETYPE") != null) {
                    String DD = b019.get("V_CRITERION_CYCLETYPE").toString();
                    row.createCell(5).setCellValue(DD);
                }

                if (b019.get("V_CK_FUNCTION1") != null) {
                    String EE = b019.get("V_CK_FUNCTION1").toString();
                    row.createCell(6).setCellValue(EE);
                }

                if (b019.get("V_CK_FUNCTION2") != null) {
                    String FF = b019.get("V_CK_FUNCTION2").toString();
                    row.createCell(7).setCellValue(FF);
                }

                if (b019.get("V_CK_FUNCTION3") != null) {
                    String GG = b019.get("V_CK_FUNCTION3").toString();
                    row.createCell(8).setCellValue(GG);
                }

                if (b019.get("V_CK_FUNCTION4") != null) {
                    String V_CK_FUNCTION4 = b019.get("V_CK_FUNCTION4").toString();
                    row.createCell(9).setCellValue(V_CK_FUNCTION4);
                }

                if (b019.get("V_CK_FUNCTION5") != null) {
                    String V_CK_FUNCTION5 = b019.get("V_CK_FUNCTION5").toString();
                    row.createCell(10).setCellValue(V_CK_FUNCTION5);
                }

                if (b019.get("V_CK_FUNCTION6") != null) {
                    String V_CK_FUNCTION6 = b019.get("V_CK_FUNCTION6").toString();
                    row.createCell(11).setCellValue(V_CK_FUNCTION6);
                }

                if (b019.get("V_CK_FUNCTION7") != null) {
                    String V_CK_FUNCTION7 = b019.get("V_CK_FUNCTION7").toString();
                    row.createCell(12).setCellValue(V_CK_FUNCTION7);
                }

                if (b019.get("V_CK_FUNCTION7") != null) {
                    String V_CK_FUNCTION7 = b019.get("V_CK_FUNCTION7").toString();
                    row.createCell(13).setCellValue(V_CK_FUNCTION7);
                }

                if (b019.get("V_CK_FUNCTION8") != null) {
                    String V_CK_FUNCTION8 = b019.get("V_CK_FUNCTION8").toString();
                    row.createCell(14).setCellValue(V_CK_FUNCTION8);
                }

                if (b019.get("V_CK_EQUTYPECODE") != null) {
                    String V_CK_EQUTYPECODE = b019.get("V_CK_EQUTYPECODE").toString();
                    row.createCell(15).setCellValue(V_CK_EQUTYPECODE);
                }

            }

            workbook.write(baos);
            baos.flush();
            byte[] bytes = baos.toByteArray();

            return new ByteArrayInputStream(bytes, 0, bytes.length);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                fs.close();
                baos.close();
            } catch (IOException e) {

            }
        }
    }*/

    public HashMap PRO_BASE_PERSONROLE_VIEW_NEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSONROLE_VIEW_NEW");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_VIEW_NEW(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSONROLE_VIEW_NEW");
        return result;
    }

    public HashMap PRO_BASE_MODULE_SEL() throws SQLException {

        logger.info("begin PRO_BASE_MODULE_SEL");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_MODULE_SEL(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_MODULE_SEL");
        return result;
    }

    public Map PRO_BASE_MODULE_SET(String V_V_MODULEID, String V_V_MODULECODE, String V_V_MODULENAME) throws SQLException {
        logger.info("begin PRO_BASE_MODULE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_MODULE_SET" + "(:V_V_MODULEID,:V_V_MODULECODE,:V_V_MODULENAME,:V_CURSOR)}");
            cstmt.setString("V_V_MODULEID", V_V_MODULEID);
            cstmt.setString("V_V_MODULECODE", V_V_MODULECODE);
            cstmt.setString("V_V_MODULENAME", V_V_MODULENAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_MODULE_SET");
        return result;
    }

    public Map PRO_BASE_MODULE_DEL(String V_V_MODULEID) throws SQLException {
        logger.info("begin PRO_BASE_MODULE_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_MODULE_DEL" + "(:V_V_MODULEID,:V_INFO)}");
            cstmt.setString("V_V_MODULEID", V_V_MODULEID);
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
        logger.info("end PRO_BASE_MODULE_DEL");
        return result;
    }

    public List<HashMap> NewModuleRoleTree(String V_V_MODULECODE) throws SQLException {
        logger.info("begin NewModuleRoleTree");
        List<HashMap> list = PRO_BASE_MODULE_MENU_SEL(V_V_MODULECODE);
        List<HashMap> menu = GetRoleChildren(list, "-1");
        logger.debug("result:" + menu);
        logger.info("end NewModuleRoleTree");
        return menu;
    }

    private List<HashMap> PRO_BASE_MODULE_MENU_SEL(String V_V_MODULECODE) throws SQLException {
        logger.info("begin PRO_BASE_MODULE_MENU_SEL");
        List<HashMap> list = null;
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_MODULE_MENU_SEL" + "(:V_V_MODULECODE,:V_CURSOR)}");
            cstmt.setString("V_V_MODULECODE", V_V_MODULECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_MODULE_MENU_SEL");
        return list;
    }

    private List<HashMap> GetRoleChildren(List<HashMap> list, String V_V_MENUCODE) {
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_MENUCODE_UP").equals(V_V_MENUCODE)) {
                HashMap temp = new HashMap();
                temp.put("id", list.get(i).get("V_MENUCODE").toString());
                temp.put("text", list.get(i).get("V_MENUNAME").toString());
                temp.put("parentid", V_V_MENUCODE);
                if (GetRoleChildren(list, list.get(i).get("V_MENUCODE").toString()).size() > 0) {
                    temp.put("expanded", true);
                    temp.put("children", GetRoleChildren(list, list.get(i).get("V_MENUCODE").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public List<HashMap> NewModuleMenuTree(String V_V_MODULECODE) throws SQLException {
        logger.info("begin NewMenuTree");
        //获取list1基础菜单，list2角色菜单
        List<HashMap> list1 = PRO_BASE_MENU_VIEW("%");
        List<HashMap> list2 = PRO_BASE_MODULE_MENU_SEL(V_V_MODULECODE);
        List<HashMap> menu = GetMenuChildren(list1, list2, "-1");
        logger.info("end NewMenuTree");
        return menu;
    }

    public List<HashMap> GetMenuChildren(List<HashMap> list1, List<HashMap> list2, String V_V_MENUCODE) {
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list1.size(); i++) {
            if (list1.get(i).get("V_MENUCODE_UP").equals(V_V_MENUCODE)) {
                HashMap temp = new HashMap();
                temp.put("id", list1.get(i).get("V_MENUCODE").toString());
                temp.put("text", list1.get(i).get("V_MENUNAME").toString());
                temp.put("parentid", V_V_MENUCODE);
                temp.put("checked", false);
                for (int j = 0; j < list2.size(); j++) {
                    if (list1.get(i).get("V_MENUCODE").toString().equals(list2.get(j).get("V_MENUCODE").toString())) {
                        temp.put("checked", true);
                    }
                }
                if (GetMenuChildren(list1, list2, list1.get(i).get("V_MENUCODE").toString()).size() > 0) {
                    temp.put("expanded", true);
                    temp.put("children", GetMenuChildren(list1, list2, list1.get(i).get("V_MENUCODE").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    private List<HashMap> PRO_BASE_MENU_VIEW(String V_V_MENUCODE) throws SQLException {
        logger.info("begin PRO_BASE_MENU_VIEW");
        List<HashMap> list = null;
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_MENU_VIEW" + "(:V_V_MENUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_MENU_VIEW");
        return list;
    }


    public List<Map> PRO_BASE_MODULETOMENU_SET(String V_V_FLAG, String V_V_MODULECODE, String V_V_MENUCODE) throws SQLException {
//        logger.info("begin PRO_BASE_MODULETOMENU_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_MODULETOMENU_SET" + "(:V_V_FLAG,:V_V_MODULECODE,:V_V_MENUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_MODULECODE", V_V_MODULECODE);
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            sledata.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_MODULETOMENU_SET");
        return result;
    }

    public HashMap PRO_BASE_CRAFTTOPERSON_SET(String V_V_FLAG, String V_V_WORKCODE, String V_V_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_BASE_CRAFTTOPERSON_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_CRAFTTOPERSON_SET" + "(:V_V_FLAG,:V_V_WORKCODE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_WORKCODE", V_V_WORKCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_BASE_CRAFTTOPERSON_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_SELMAX(String V_V_GUID_FXJH, String V_V_ROWNUMBER, String STATE) throws SQLException {
//        logger.info("begin PRO_PM_EQUREPAIRPLAN_SELMAX");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_SELMAX" + "(:V_V_GUID_FXJH,:V_V_ROWNUMBER,:STATE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_V_ROWNUMBER", V_V_ROWNUMBER);
            cstmt.setString("STATE", STATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            String maxvalue = (String) cstmt.getObject("V_CURSOR");
            result.put("maxvalue", maxvalue);

            // result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_SELMAX");
        return result;
    }


    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_SET(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID, String V_V_ORGCODE,
                                                 String V_V_DEPTCODE, String V_V_YEAR, String V_V_MONTH, String V_V_PROJECT_CODE, String V_V_PROJECT_NAME,
                                                 String V_V_PLAN_MONEY, String V_V_CONTENT, String V_V_DATE_DESIGN, String V_V_DATE_INVITE, String V_V_DATE_B,
                                                 String V_V_DATE_E, String V_V_BUDGET_MONEY, String V_V_PROGRESS, String V_V_BUILD_NAMAGER, String V_V_BULID_PERSON,
                                                 String V_V_DIRECT_PERSON, String V_V_EQUCODE, String V_V_EQUNAME, String V_V_SPECIALTY, String V_V_BUILD_DEPT,
                                                 String V_V_GUID_P, String V_V_PROJECT_CODE_P, String V_V_PROJECT_NAME_P, String V_V_GUID_FXJH, String V_V_PROJECT_CODE_FXJH,
                                                 String V_V_PROJECT_NAME_FXJH, String V_V_SGYC, String V_V_AQDC, Double V_V_ROWNUMBER, Double V_V_P_ROWNUMBER) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_SET" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_YEAR,:V_V_MONTH," +
                    ":V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_PLAN_MONEY,:V_V_CONTENT,:V_V_DATE_DESIGN,:V_V_DATE_INVITE,:V_V_DATE_B,:V_V_DATE_E,:V_V_BUDGET_MONEY,:V_V_PROGRESS,:V_V_BUILD_NAMAGER,:V_V_BULID_PERSON,:V_V_DIRECT_PERSON,:V_V_EQUCODE," +
                    ":V_V_EQUNAME,:V_V_SPECIALTY,:V_V_BUILD_DEPT,:V_V_GUID_P,:V_V_PROJECT_CODE_P,:V_V_PROJECT_NAME_P,:V_V_GUID_FXJH,:V_V_PROJECT_CODE_FXJH,:V_V_PROJECT_NAME_FXJH,:V_V_SGYC,:V_V_AQDC,:V_V_ROWNUMBER,:V_V_P_ROWNUMBER,:V_INFO,:V_V_GUID_T)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_PLAN_MONEY", V_V_PLAN_MONEY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_DATE_DESIGN", V_V_DATE_DESIGN);
            cstmt.setString("V_V_DATE_INVITE", V_V_DATE_INVITE);
            cstmt.setString("V_V_DATE_B", V_V_DATE_B);
            cstmt.setString("V_V_DATE_E", V_V_DATE_E);
            cstmt.setString("V_V_BUDGET_MONEY", V_V_BUDGET_MONEY);
            cstmt.setString("V_V_PROGRESS", V_V_PROGRESS);
            cstmt.setString("V_V_BUILD_NAMAGER", V_V_BUILD_NAMAGER);
            cstmt.setString("V_V_BULID_PERSON", V_V_BULID_PERSON);
            cstmt.setString("V_V_DIRECT_PERSON", V_V_DIRECT_PERSON);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_BUILD_DEPT", V_V_BUILD_DEPT);
            cstmt.setString("V_V_GUID_P", V_V_GUID_P);
            cstmt.setString("V_V_PROJECT_CODE_P", V_V_PROJECT_CODE_P);
            cstmt.setString("V_V_PROJECT_NAME_P", V_V_PROJECT_NAME_P);
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_V_PROJECT_CODE_FXJH", V_V_PROJECT_CODE_FXJH);
            cstmt.setString("V_V_PROJECT_NAME_FXJH", V_V_PROJECT_NAME_FXJH);
            cstmt.setString("V_V_SGYC", V_V_SGYC);
            cstmt.setString("V_V_AQDC", V_V_AQDC);
            cstmt.setDouble("V_V_ROWNUMBER", V_V_ROWNUMBER);
            cstmt.setDouble("V_V_P_ROWNUMBER", V_V_P_ROWNUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_GUID_T", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
            result.put("guid",
                    (String) cstmt.getObject("V_V_GUID_T"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_SET");
        return result;
    }

    public Map PRO_PM_07_DEFECT_SOURCE_NEW(String V_V_STATECODE, String X_PERSONCODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SOURCE_NEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SOURCE_NEW(:V_V_STATECODE,:X_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("X_PERSONCODE", X_PERSONCODE);
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
        logger.info("end PRO_PM_07_DEFECT_SOURCE_NEW");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_NEW(String V_V_STATECODE,
                                         String X_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_NEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_NEW(:V_V_STATECODE,:X_PERSONCODE,:V_V_PAGE," +
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
        logger.info("end PRO_PM_07_DEFECT_VIEW_NEW");
        return result;
    }

    public Map PRO_PM_07_DEFECT_VIEW_NEW_N(String V_V_STATECODE,
                                         String X_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_VIEW_NEW_N");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_VIEW_NEW_N(:V_V_STATECODE,:X_PERSONCODE,:V_V_PAGE," +
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
        logger.info("end PRO_PM_07_DEFECT_VIEW_NEW_N");
        return result;
    }

    public HashMap PRO_PM_OVERHARLAPPLY_SEL(String V_V_YEAR, String V_V_PERCODE, String V_V_SPECIALTY, String V_V_FLAG,
                                            String V_V_DEFECT, String V_V_PROJECTNAME, Integer V_I_PAGE, Integer V_I_PAGENUMBER) throws SQLException {

        logger.info("begin PRO_PM_OVERHARLAPPLY_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_OVERHARLAPPLY_SEL" + "(:V_V_YEAR,:V_V_PERCODE,:V_V_SPECIALTY," +
                    ":V_V_FLAG,:V_V_DEFECT,:V_V_PROJECTNAME,:V_I_PAGE,:V_I_PAGENUMBER,:V_V_SNUM,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_PROJECTNAME", V_V_PROJECTNAME);
            cstmt.setInt("V_I_PAGE", V_I_PAGE);
            cstmt.setInt("V_I_PAGENUMBER", V_I_PAGENUMBER);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("RET", cstmt.getString("V_V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_OVERHARLAPPLY_SEL");
        return result;
    }

    public Map PRO_PM_09_REPAIROLD_SEL(String V_V_ORGCODE,
                                       String V_V_DEPTCODE, String V_V_MMNAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_09_REPAIROLD_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_09_REPAIROLD_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_MMNAME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_MMNAME", V_V_MMNAME);
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
        logger.info("end PRO_PM_09_REPAIROLD_SEL");
        return result;
    }

    public HashMap PM_WORKORDER_OLD_EDIT(String V_V_GUID) throws SQLException {

        logger.info("begin PM_WORKORDER_OLD_EDIT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_OLD_EDIT" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PM_WORKORDER_OLD_EDIT");
        return result;
    }

    public HashMap PM_WORKORDER_OLD_SAVE(String V_V_PERCODE, String V_V_PERNAME, String V_V_ORDERGUID, String V_V_SHORT_TXT, String
            V_D_START_DATE, String V_D_FINISH_DATE, String V_V_WBS, String V_V_WBS_TXT, String V_V_DEPTCODEREPARIR,
                                         String V_V_TOOL, String V_V_TECHNOLOGY, String V_V_SAFE) throws SQLException {

        logger.info("begin PM_WORKORDER_OLD_SAVE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_OLD_SAVE" + "(:V_V_PERCODE,:V_V_PERNAME," +
                    ":V_V_ORDERGUID,:V_V_SHORT_TXT,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT,:V_V_DEPTCODEREPARIR," +
                    ":V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
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
        logger.info("end PM_WORKORDER_OLD_SAVE");
        return result;
    }

    public Map PM_13_EXAMINED_SEL(String V_V_ORGCODE,String V_V_STATE,String V_V_DATE,String V_V_BEEXAMINED_TYPE,String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_SEL(:V_V_ORGCODE,:V_V_STATE,:V_V_DATE,:V_V_BEEXAMINED_TYPE,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_DATE", V_V_DATE);
            cstmt.setString("V_V_BEEXAMINED_TYPE", V_V_BEEXAMINED_TYPE);
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
        logger.info("end PM_13_EXAMINED_SEL");
        return result;
    }

    public Map PM_13_EXAMINED_FK_SEL(String V_V_ORGCODE,String V_V_STATE,String V_V_DATE,String V_V_BEEXAMINED_TYPE,String V_V_TYPE,String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_FK_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_FK_SEL(:V_V_ORGCODE,:V_V_STATE,:V_V_DATE,:V_V_BEEXAMINED_TYPE,:V_V_TYPE,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_DATE", V_V_DATE);
            cstmt.setString("V_V_BEEXAMINED_TYPE", V_V_BEEXAMINED_TYPE);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_13_EXAMINED_FK_SEL");
        return result;
    }

    public Map PM_13_EXAMINED_TG_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_DATE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_TG_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_TG_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DATE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DATE", V_V_DATE);
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
        logger.info("end PM_13_EXAMINED_TG_SEL");
        return result;
    }

    public Map PRO_BASE_POST_DJY() throws SQLException {

        logger.info("begin PRO_BASE_POST_DJY");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_POST_DJY(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_POST_DJY");
        return result;
    }

    public Map BASE_PER_POST_SEL(String V_V_DEPTCODE,String V_V_POSTNAME) throws SQLException {

        logger.info("begin BASE_PER_POST_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_PER_POST_SEL(:V_V_DEPTCODE,:V_V_POSTNAME,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_POSTNAME", V_V_POSTNAME);
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
        logger.info("end BASE_PER_POST_SEL");
        return result;
    }

    public Map PM_13_EXAMINED_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_13_EXAMINED_GET");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_GET(:V_V_GUID," +
                    ":V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("RET","success");

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PM_13_EXAMINED_GET");
        return result;
    }

    public HashMap PM_13_EXAMINED_DEL(String  V_V_GUID) throws SQLException {

        logger.info("begin PM_13_EXAMINED_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_DEL" + "(:V_V_GUID," +
                    ":V_INFO)}");
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
        logger.info("end PM_13_EXAMINED_DEL");
        return result;
    }

    public HashMap PM_ACTIVITI_PROCESS_DEL(String  V_V_GUID) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_DEL" + "(:V_V_GUID," +
                    ":V_INFO)}");
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
        logger.info("end PM_ACTIVITI_PROCESS_DEL");
        return result;
    }

    public HashMap PM_13_EXAMINED_CLASS(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_CLASS");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_CLASS" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PM_13_EXAMINED_CLASS");
        return result;
    }

    public HashMap PM_FLOW_TYPE_SEL() throws SQLException {

        logger.info("begin PM_FLOW_TYPE_SEL");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_FLOW_TYPE_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_13_EXAMINED_CLASS");
        return result;
    }

    public HashMap BASE_PERSON_SEL() throws SQLException {

        logger.info("begin PM_FLOW_TYPE_SEL");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_PERSON_SEL" + "(:V_CURSOR)}");
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
        logger.info("end BASE_PERSON_SEL");
        return result;
    }

    public HashMap PM_EQU_REPAIR_FLOW_MENU_SEL(String V_V_PROCESS_KEY,String V_V_FLOW_STEP,String V_V_BUSINESSGUID) throws SQLException {

        logger.info("begin PM_EQU_REPAIR_FLOW_MENU_SEL");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EQU_REPAIR_FLOW_MENU_SEL" + "(:V_V_PROCESS_KEY,:V_V_FLOW_STEP,:V_V_BUSINESSGUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROCESS_KEY", V_V_PROCESS_KEY);
            cstmt.setString("V_V_FLOW_STEP", V_V_FLOW_STEP);
            cstmt.setString("V_V_BUSINESSGUID", V_V_BUSINESSGUID);
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
        logger.info("end PM_EQU_REPAIR_FLOW_MENU_SEL");
        return result;
    }

    public HashMap PM_13_EXAMINED_SET(String V_V_GUID,String V_V_DATE,String V_V_BEEXAMINED_DEPT,String V_V_JCBW,String V_V_CZWT,String V_V_ZGCS,
                                      String V_V_KHYJ,String V_V_KHFS,String V_V_KKJE,String V_V_DEPTCODE
            ,String V_V_TYPE,String V_V_BEEXAMINED_TYPE,String V_V_YQZGSJ,String V_V_TBSJ, String V_V_TB_PER ,String V_V_STATE,String V_V_JX_PER) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_SET" + "(:V_V_GUID,:V_V_DATE,:V_V_BEEXAMINED_DEPT,:V_V_JCBW,:V_V_CZWT,:V_V_ZGCS,:V_V_KHYJ,:V_V_KHFS,:V_V_KKJE,:V_V_DEPTCODE,:V_V_TYPE,:V_V_BEEXAMINED_TYPE,:V_V_YQZGSJ,:V_V_TBSJ,:V_V_TB_PER,:V_V_STATE,:V_V_JX_PER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DATE", V_V_DATE);
            cstmt.setString("V_V_BEEXAMINED_DEPT", V_V_BEEXAMINED_DEPT);
            cstmt.setString("V_V_JCBW", V_V_JCBW);
            cstmt.setString("V_V_CZWT", V_V_CZWT);
            cstmt.setString("V_V_ZGCS", V_V_ZGCS);
            cstmt.setString("V_V_KHYJ", V_V_KHYJ);
            cstmt.setString("V_V_KHFS", V_V_KHFS);
            cstmt.setString("V_V_KKJE", V_V_KKJE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_BEEXAMINED_TYPE", V_V_BEEXAMINED_TYPE);
            //cstmt.setDate("V_D_DEFECTDATE", Date.valueOf(V_D_DEFECTDATE));
            cstmt.setString("V_V_YQZGSJ", V_V_YQZGSJ);
            cstmt.setString("V_V_TBSJ", V_V_TBSJ);
            cstmt.setString("V_V_TB_PER", V_V_TB_PER);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_JX_PER", V_V_JX_PER);
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
        logger.info("end PM_13_EXAMINED_SET");
        return result;
    }

    public HashMap PM_WORKORDER_DEL(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PM_WORKORDER_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_DEL" + "(:V_V_ORDERGUID,:V_INFO)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
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
        logger.info("end PM_WORKORDER_DEL");
        return result;
    }

    public HashMap PM_13_EXAMINED_FK_SET(String V_V_GUID,String V_V_FEEDBACK_GUID,String V_V_FEEDBACK_FLAG,String V_V_FEEDBACK_PER,String V_V_YS_PER,String V_V_FEEDBACK_DATA,String V_V_FK_PER,String V_V_FK_DATE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_FK_SET" + "(:V_V_GUID,:V_V_FEEDBACK_GUID,:V_V_FEEDBACK_FLAG,:V_V_FEEDBACK_PER,:V_V_YS_PER,:V_V_FEEDBACK_DATA,:V_V_FK_PER,:V_V_FK_DATE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FEEDBACK_GUID", V_V_FEEDBACK_GUID);
            cstmt.setString("V_V_FEEDBACK_FLAG", V_V_FEEDBACK_FLAG);
            cstmt.setString("V_V_FEEDBACK_PER", V_V_FEEDBACK_PER);
            cstmt.setString("V_V_YS_PER", V_V_YS_PER);
            cstmt.setString("V_V_FEEDBACK_DATA", V_V_FEEDBACK_DATA);
            cstmt.setString("V_V_FK_PER", V_V_FK_PER);
            cstmt.setString("V_V_FK_DATE", V_V_FK_DATE);
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
        logger.info("end PM_13_EXAMINED_FK_SET");
        return result;
    }

    public Map PM_23_WORKORDER_SEL(String V_V_ORGCODE,String V_V_EQUIP_NO,String V_V_BEGINTIME,String V_V_ENDTIME,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_23_WORKORDER_SEL(:V_V_ORGCODE,:V_V_EQUIP_NO,:V_V_BEGINTIME,:V_V_ENDTIME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_BEGINTIME", V_V_BEGINTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
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
        logger.info("end PM_23_WORKORDER_SEL");
        return result;
    }

    public Map PM_23_SPAREPARTSORDER_SEL(String V_V_ORGCODE,String V_V_EQUIP_NO,String V_V_BEGINTIME,String V_V_ENDTIME,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_23_SPAREPARTSORDER_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_23_SPAREPARTSORDER_SEL(:V_V_ORGCODE,:V_V_EQUIP_NO,:V_V_BEGINTIME,:V_V_ENDTIME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_BEGINTIME", V_V_BEGINTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
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
        logger.info("end PM_23_SPAREPARTSORDER_SEL");
        return result;
    }

    public Map PM_23_CHECKACCOUNT_SEL(String V_V_ORGCODE,String V_V_EQUIP_NO,String V_V_BEGINTIME,String V_V_ENDTIME,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_23_CHECKACCOUNT_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_23_CHECKACCOUNT_SEL(:V_V_ORGCODE,:V_V_EQUIP_NO,:V_V_BEGINTIME,:V_V_ENDTIME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_BEGINTIME", V_V_BEGINTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
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
        logger.info("end PM_23_CHECKACCOUNT_SEL");
        return result;
    }

    public Map PM_23_FAULTACCOUNT_SEL(String V_V_ORGCODE,String V_V_EQUIP_NO,String V_V_BEGINTIME,String V_V_ENDTIME,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_23_CHECKACCOUNT_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_23_FAULTACCOUNT_SEL(:V_V_ORGCODE,:V_V_EQUIP_NO,:V_V_BEGINTIME,:V_V_ENDTIME,:V_V_PAGE," +
                    ":V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_BEGINTIME", V_V_BEGINTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
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
        logger.info("end PM_23_FAULTACCOUNT_SEL");
        return result;
    }

    //获取待处理润滑物资表数据
    public HashMap GET_WAITOILCONSUMELIST(String A_PLANTCODE,String A_DEPARTCODE,String A_EQUIP_ID,String A_ORDERID,String A_BILLCODE,String A_MAT_DESC) throws SQLException {

        logger.info("begin GET_WAITOILCONSUMELIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL31.GET_WAITOILCONSUMELIST" + "(:A_PLANTCODE,:A_DEPARTCODE," +
                    ":A_EQUIP_ID,:A_ORDERID,:A_BILLCODE,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_BILLCODE", A_BILLCODE);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
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
        logger.info("end GET_PROJ_BUDGET_ITEM_TABLE");
        return result;
    }

    //获取待处理润滑物资表数据
    public HashMap GET_OILCONSUMELIST(String A_PLANTCODE,String A_DEPARTCODE,String A_EQUTYPE,String A_EQUIP_ID,String A_ORDERID,String A_BILLCODE,String A_BEGINDATE,String A_ENDDATE,String A_MAT_NO,String A_MAT_DESC) throws SQLException {

        logger.info("begin GET_OILCONSUMELIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL32.GET_OILCONSUMELIST" + "(:A_PLANTCODE,:A_DEPARTCODE," +
                    ":A_EQUTYPE,:A_EQUIP_ID,:A_ORDERID,:A_BILLCODE,:A_BEGINDATE,:A_ENDDATE,:A_MAT_NO,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_BILLCODE", A_BILLCODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
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
        logger.info("end GET_OILCONSUMELIST");
        return result;
    }

    //获取待处理润滑物资表数据
    public HashMap GET_PARTCONSUMELIST(String A_CONSUME_ID) throws SQLException {

        logger.info("begin GET_PARTCONSUMELIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL31.GET_PARTCONSUMELIST" + "(:A_CONSUME_ID,:RET)}");
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
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
        logger.info("end GET_PARTCONSUMELIST");
        return result;
    }

    //获取日常加注数据
    public HashMap GET_DAYPARTCONSUMELIST(String A_CONSUME_ID) throws SQLException {

        logger.info("begin GET_DAYPARTCONSUMELIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL31.GET_DAYPARTCONSUMELIST" + "(:A_CONSUME_ID,:RET)}");
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
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
        logger.info("end GET_DAYPARTCONSUMELIST");
        return result;
    }

    public HashMap SAVEPARTCONSUME(String A_DETAIL_ID,String A_CONSUME_ID,String A_EQUIP_ID,String A_PART_NO,String A_USEAMOUNT,String A_OIL_DATE,String A_APPROVE,String A_USERID) throws SQLException {
        logger.info("begin SAVEPARTCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL31.SAVEPARTCONSUME" + "(:A_DETAIL_ID,:A_CONSUME_ID,:A_EQUIP_ID,:A_PART_NO,:A_USEAMOUNT,:A_OIL_DATE,:A_APPROVE,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_DETAIL_ID", A_DETAIL_ID);
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_USEAMOUNT", A_USEAMOUNT);
            cstmt.setDate("A_OIL_DATE", Date.valueOf(A_OIL_DATE));
            cstmt.setString("A_APPROVE", A_APPROVE);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVEPARTCONSUME");
        return result;
    }

    public HashMap DAYSAVEPARTCONSUME(String A_DETAIL_ID,String A_CONSUME_ID,String A_EQUIP_ID,String A_PART_NO,String A_USEAMOUNT,String A_BEGIN_DATE,String A_END_DATE,String A_APPROVE,String A_USERID) throws SQLException {
        logger.info("begin DAYSAVEPARTCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL31.DAYSAVEPARTCONSUME" + "(:A_DETAIL_ID,:A_CONSUME_ID,:A_EQUIP_ID,:A_PART_NO,:A_USEAMOUNT,:A_BEGIN_DATE,:A_END_DATE,:A_APPROVE,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_DETAIL_ID", A_DETAIL_ID);
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_USEAMOUNT", A_USEAMOUNT);
            cstmt.setDate("A_BEGIN_DATE", Date.valueOf(A_BEGIN_DATE));
            cstmt.setDate("A_END_DATE", Date.valueOf(A_END_DATE));
            cstmt.setString("A_APPROVE", A_APPROVE);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DAYSAVEPARTCONSUME");
        return result;
    }

    public HashMap SUBMITPARTCONSUME(String A_CONSUME_ID,String A_OIL_REMARK,String A_USERID) throws SQLException {
        logger.info("begin SUBMITPARTCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL31.SUBMITPARTCONSUME" + "(:A_CONSUME_ID,:A_OIL_REMARK,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
            cstmt.setString("A_OIL_REMARK", A_OIL_REMARK);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SUBMITPARTCONSUME");
        return result;
    }

    public HashMap INSERTPARTAVG(String A_CONSUME_ID,String A_USERID) throws SQLException {
        logger.info("begin INSERTPARTAVG");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL31.INSERTPARTAVG" + "(:A_CONSUME_ID,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end INSERTPARTAVG");
        return result;
    }

    public HashMap INSERTPARTMAIN(String A_CONSUME_ID,String A_USERID) throws SQLException {
        logger.info("begin INSERTPARTMAIN");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL31.INSERTPARTMAIN" + "(:A_CONSUME_ID,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_CONSUME_ID", A_CONSUME_ID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end INSERTPARTMAIN");
        return result;
    }

    public Map PM_ACTIVITI_PROCESS_SEL(String V_V_FLOWTYPE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_13_EXAMINED_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_SEL" + "(:V_V_FLOWTYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
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
        logger.info("end PM_ACTIVITI_PROCESS_SEL");
        return result;
    }

    public HashMap PM_ACTIVITI_PROCESS_SET(String V_V_ACTIVITI_CODE,String V_V_ACTIVITI_NAME,String V_V_FLOW_TYPE,String V_V_INPER_CODE,String V_V_INPER_NAME, InputStream V_V_ACTIVITI_IMG,String V_V_GUID) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_SET" + "(:V_V_ACTIVITI_CODE,:V_V_ACTIVITI_NAME,:V_V_FLOW_TYPE,:V_V_INPER_CODE,:V_V_INPER_NAME,:V_V_ACTIVITI_IMG,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_ACTIVITI_CODE", V_V_ACTIVITI_CODE);
            cstmt.setString("V_V_ACTIVITI_NAME", V_V_ACTIVITI_NAME);
            cstmt.setString("V_V_FLOW_TYPE", V_V_FLOW_TYPE);
            cstmt.setString("V_V_INPER_CODE", V_V_INPER_CODE);
            cstmt.setString("V_V_INPER_NAME", V_V_INPER_NAME);
            cstmt.setBlob("V_V_ACTIVITI_IMG", V_V_ACTIVITI_IMG);
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
        logger.info("end PM_ACTIVITI_PROCESS_SET");
        return result;
    }

    public HashMap PM_ACTIVITI_PROCESS_UPDATE(String V_V_ACTIVITI_CODE,String V_V_ACTIVITI_NAME,String V_V_FLOW_TYPE,String V_V_INPER_CODE,String V_V_INPER_NAME, String V_V_GUID) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_SET");

        String blobStr = "blob";
        ByteArrayInputStream stream = new ByteArrayInputStream(blobStr.getBytes());

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_SET" + "(:V_V_ACTIVITI_CODE,:V_V_ACTIVITI_NAME,:V_V_FLOW_TYPE,:V_V_INPER_CODE,:V_V_INPER_NAME,:V_V_ACTIVITI_IMG,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_ACTIVITI_CODE", V_V_ACTIVITI_CODE);
            cstmt.setString("V_V_ACTIVITI_NAME", V_V_ACTIVITI_NAME);
            cstmt.setString("V_V_FLOW_TYPE", V_V_FLOW_TYPE);
            cstmt.setString("V_V_INPER_CODE", V_V_INPER_CODE);
            cstmt.setString("V_V_INPER_NAME", V_V_INPER_NAME);
            cstmt.setBlob("V_V_ACTIVITI_IMG",stream);
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
        logger.info("end PM_ACTIVITI_PROCESS_SET");
        return result;
    }

    //获取图片过程
    public HashMap PM_ACTIVITI_PROCESS_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_GET" + "(:V_V_GUID,:V_ACTIVITI_IMG,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_ACTIVITI_IMG", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_ACTIVITI_IMG", (Blob) cstmt.getObject("V_ACTIVITI_IMG"));
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ACTIVITI_PROCESS_GET");
        return result;
    }

    //工单创建审批人
    public HashMap PM_ACTIVITI_PROCESS_PER_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE,String V_V_FLOW_STEP,String V_V_PERCODE,String V_V_SPECIALTY,String V_V_WHERE) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_PER_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_PER_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_WHERE,:V_V_PROCESS_CODE,:V_CURSOR)}");
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
        logger.info("end PM_ACTIVITI_PROCESS_PER_SEL");
        return result;
    }

    public HashMap POR_WORKORDER_REPER_SEL(String V_V_WORKORDERGUID,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE,String V_V_FLOW_STEP,String V_V_PERCODE,String V_V_SPECIALTY,String V_V_WHERE) throws SQLException {

        logger.info("begin POR_WORKORDER_REPER_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call POR_WORKORDER_REPER_SEL" + "(:V_V_WORKORDERGUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_WHERE,:V_V_PROCESS_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_WORKORDERGUID", V_V_WORKORDERGUID);
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
        logger.info("end POR_WORKORDER_REPER_SEL");
        return result;
    }


    public List<Map> PRO_WX_ORDER_BOOKED(String V_V_ORDERGUID,String V_V_YQTIME,String V_V_YQYY) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOKED");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_BOOKED" + "(:V_V_ORDERGUID,:V_V_YQTIME,:V_V_YQYY,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_YQTIME", V_V_YQTIME);
            cstmt.setString("V_V_YQYY", V_V_YQYY);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_WX_ORDER_BOOKED");
        return result;
    }

    public HashMap PRO_ACTIVITI_FLOW_AGREE(String V_V_ORDERID,String V_V_PROCESS_NAMESPACE,String V_V_PROCESS_CODE,String V_V_STEPCODE,String V_V_STEPNEXT_CODE) throws SQLException {
        logger.info("begin PRO_WO_FLOW_AGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_ACTIVITI_FLOW_AGREE" + "(:V_V_ORDERID,:V_V_PROCESS_NAMESPACE,:V_V_PROCESS_CODE,:V_V_STEPCODE,:V_V_STEPNEXT_CODE,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_PROCESS_NAMESPACE", V_V_PROCESS_NAMESPACE);
            cstmt.setString("V_V_PROCESS_CODE", V_V_PROCESS_CODE);
            cstmt.setString("V_V_STEPCODE", V_V_STEPCODE);
            cstmt.setString("V_V_STEPNEXT_CODE", V_V_STEPNEXT_CODE);
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
        logger.info("end PRO_ACTIVITI_FLOW_AGREE");
        return result;
    }

    //PM_03010201,月,选择计划查询
    public HashMap PM_03_MONTH_PLAN_BYPER_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_ZY,String V_V_CONTENT,String V_V_STATECODE,String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_BYPER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_BYPER_SEL" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
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
            result.put("total",cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_BYPER_SEL");
        return result;
    }

    //PM_03010201,月计划报表，作废
    public Map<String,Object> PM_03_PLAN_MONTH_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_DEL");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_DEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_MONTH_DEL");
        return result;
    }
    //PM_03010201,月计划报表，删除
    public Map<String,Object> PRO_PM_03_PLAN_MONTH_DELDATA(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_DELDATA");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_DELDATA" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_MONTH_DELDATA");
        return result;
    }
    public Map<String,Object> PRO_PM_WORKORDER_GX_DEL(String I_I_ID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_GX_DEL");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GX_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end PRO_PM_WORKORDER_GX_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_GX_VIEW(String V_V_ORDERGUID, String V_V_ACTIVITY) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GX_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GX_VIEW" + "(:V_V_ORDERGUID,:V_V_ACTIVITY,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_ACTIVITY", V_V_ACTIVITY);
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
        logger.info("end PRO_PM_WORKORDER_GX_VIEW");
        return result;
    }

    public HashMap PRO_BASE_PERSON_DE_SEL() throws SQLException {

        logger.info("begin PRO_BASE_PERSON_DE_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
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

    public HashMap PRO_PM_WORKORDER_GX_SET(String V_V_ORDERGUID,String V_V_ACTIVITY,String V_V_PERCODE,String V_V_PERNAME) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GX_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GX_SET" + "(:V_V_ORDERGUID,:V_V_ACTIVITY,:V_V_PERCODE,:V_V_PERNAME,:V_INFO)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_ACTIVITY", V_V_ACTIVITY);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
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
        logger.info("end PRO_PM_WORKORDER_GX_SET");
        return result;
    }

    public HashMap PRO_PW_WORKORDER_GX_TS_SET(String I_I_ID,String V_V_TS) throws SQLException {

        logger.info("begin PRO_PW_WORKORDER_GX_TS_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PW_WORKORDER_GX_TS_SET" + "(:I_I_ID,:V_V_TS,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_TS", V_V_TS);
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
        logger.info("end PRO_PW_WORKORDER_GX_TS_SET");
        return result;
    }

    public List<Map> PRO_PM_19_WORKDE_DEL(String I_I_ID,String V_V_CRAFTCODE) throws SQLException {
//        logger.info("begin PRO_PM_19_WORKDE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_DEL" + "(:I_I_ID,:V_V_CRAFTCODE,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_CRAFTCODE", V_V_CRAFTCODE);
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
        logger.info("end PRO_PM_19_WORKDE_DEL");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW(String IS_V_DEPTCODE, String IS_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");
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

    public HashMap PRO_BASE_PERSON_VIEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_VIEW");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSON_VIEW");
        return result;
    }

    public HashMap PRO_BASE_CRAFTTOPERSON_GET(String V_V_PERSONCODE,String V_V_WORKCODE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_BYPER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_CRAFTTOPERSON_GET" + "(:V_V_PERSONCODE,:V_V_WORKCODE,:V_V_SNUM)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_WORKCODE", V_V_WORKCODE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_V_SNUM",cstmt.getString("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_CRAFTTOPERSON_GET");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_NOGENERATE(String V_V_ORGCODE, String V_V_DEPTCODE,  String V_V_CK_EQUTYPECODE,
                                                 String V_V_EQUTYPE, String V_V_EQUCODE,String  V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_NOGENERATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_NOGENERATE" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total",sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_NOGENERATE");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_GENERATE(String V_V_ORGCODE, String V_V_DEPTCODE,  String V_V_CK_EQUTYPECODE,
                                               String V_V_EQUTYPE, String V_V_EQUCODE,String  V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_GENERATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_GENERATE" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total",sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_GENERATE");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_ZQSJ_SEL() throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_ZQSJ_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_ZQSJ_SEL" + "(:V_SUMNUM,:V_CURSOR)}");
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
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
        logger.info("end PM_06_DJ_CRITERION_ZQSJ_SEL");
        return result;
    }


    public HashMap PM_06_DJ_CRITERION_JST_SET(String V_V_SERVERNAME, String V_V_SENDPASSWORD, String V_V_SEND_PERSON,
                                              String V_V_RECEIVE_PERSON, String V_V_SUBJECT, String V_V_BODY
            , Integer V_I_FINISH, String V_D_IN_DATE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_JST_SET" + "(:V_V_SERVERNAME,:V_V_SENDPASSWORD,:V_V_SEND_PERSON,:V_V_RECEIVE_PERSON,:V_V_SUBJECT,:V_V_BODY,:V_I_FINISH,:V_D_IN_DATE,:V_INFO)}");
            cstmt.setString("V_V_SERVERNAME", V_V_SERVERNAME);
            cstmt.setString("V_V_SENDPASSWORD", V_V_SENDPASSWORD);
            cstmt.setString("V_V_SEND_PERSON", V_V_SEND_PERSON);
            cstmt.setString("V_V_RECEIVE_PERSON", V_V_RECEIVE_PERSON);
            cstmt.setString("V_V_SUBJECT", V_V_SUBJECT);
            cstmt.setString("V_V_BODY", V_V_BODY);
            cstmt.setInt("V_I_FINISH", V_I_FINISH);
            cstmt.setString("V_D_IN_DATE", V_D_IN_DATE);
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
        logger.info("end PM_06_DJ_CRITERION_JST_SET");
        return result;
    }

    public HashMap PM_AM_SEND_SEL() throws SQLException {

        logger.info("begin PM_AM_SEND_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_AM_SEND_SEL" + "(:V_SUMNUM,:V_CURSOR)}");
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_SUMNUM");

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total",sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_AM_SEND_SEL");
        return result;
    }

    public String AMToMessIFCheck(String xele, String url) throws Exception {

        try {
            String endpointURL = "http://10.101.10.13/NewsPlat/AMToMess.asmx"; //引用WebService地址
            org.apache.axis.client.Service service = new org.apache.axis.client.Service();
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(endpointURL));
            call.setSOAPActionURI("http://hoteamsoft.org/AMToMessIFCheck");
            call.setOperationName(new QName( "http://hoteamsoft.org/T","AMToMessIFCheck" ));
            call.addParameter("xele", XMLType.XSD_STRING, ParameterMode.IN);
            call.addParameter("url", XMLType.XSD_STRING, ParameterMode.IN);

            SOAPHeaderElement soapHeaderElement = new SOAPHeaderElement(
                    "http://hoteamsoft.org/T", "MySoapHeader");
            soapHeaderElement.setNamespaceURI("http://hoteamsoft.org/T");
            try {
                soapHeaderElement.addChildElement("UserName").setValue("AKTIVOLI"); //业务系统用户名
                soapHeaderElement.addChildElement("PassWord").setValue("AK_TIVOLI"); //业务系统密码
            } catch (SOAPException e) {
                e.printStackTrace();
            }
            call.addHeader(soapHeaderElement);

            call.setReturnType(XMLType.XSD_STRING);

            String ret = (String) call.invoke(new Object[] { xele, url });//xele为主体发送参数（详见“业务系统发送信息服务模板参数说明”）;url为推送到终端并能访问业务系统的链接地址。
            return ret;
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    public HashMap PM_13_EXAMINED_COMPANY_SET(String V_V_GUID,String V_V_DATE,String V_V_BEEXAMINED_ORG,String V_V_BEEXAMINED_DEPT,String V_V_JCBW,String V_V_CZWT,String V_V_ZGCS,
                                              String V_V_KHYJ,String V_V_KHFS,String V_V_KKJE,String V_V_DEPTCODE
            ,String V_V_TYPE,String V_V_BEEXAMINED_TYPE,String V_V_YQZGSJ,String V_V_TBSJ, String V_V_TB_PER ,String V_V_STATE,String V_V_JX_PER) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_13_EXAMINED_COMPANY_SET" + "(:V_V_GUID,:V_V_DATE,:V_V_BEEXAMINED_ORG,:V_V_BEEXAMINED_DEPT,:V_V_JCBW,:V_V_CZWT,:V_V_ZGCS,:V_V_KHYJ,:V_V_KHFS,:V_V_KKJE,:V_V_DEPTCODE,:V_V_TYPE,:V_V_BEEXAMINED_TYPE,:V_V_YQZGSJ,:V_V_TBSJ,:V_V_TB_PER,:V_V_STATE,:V_V_JX_PER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DATE", V_V_DATE);
            cstmt.setString("V_V_BEEXAMINED_ORG", V_V_BEEXAMINED_ORG);
            cstmt.setString("V_V_BEEXAMINED_DEPT", V_V_BEEXAMINED_DEPT);
            cstmt.setString("V_V_JCBW", V_V_JCBW);
            cstmt.setString("V_V_CZWT", V_V_CZWT);
            cstmt.setString("V_V_ZGCS", V_V_ZGCS);
            cstmt.setString("V_V_KHYJ", V_V_KHYJ);
            cstmt.setString("V_V_KHFS", V_V_KHFS);
            cstmt.setString("V_V_KKJE", V_V_KKJE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_BEEXAMINED_TYPE", V_V_BEEXAMINED_TYPE);
            //cstmt.setDate("V_D_DEFECTDATE", Date.valueOf(V_D_DEFECTDATE));
            cstmt.setString("V_V_YQZGSJ", V_V_YQZGSJ);
            cstmt.setString("V_V_TBSJ", V_V_TBSJ);
            cstmt.setString("V_V_TB_PER", V_V_TB_PER);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_JX_PER", V_V_JX_PER);
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
        logger.info("end PM_13_EXAMINED_COMPANY_SET");
        return result;
    }

    public Map PRO_PM_EQUREPAIRPLAN_NEXTPERN(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_SPECIALTY,String V_V_GUID,String
            V_I_STATE,String V_V_FLOWTYPE,String V_V_FLOW_STEP) throws SQLException {


        logger.info("begin PRO_PM_EQUREPAIRPLAN_NEXTPERN");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NEXTPERN(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_GUID,:V_I_STATE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PROCESS_CODE,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_I_STATE", V_I_STATE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_FLOW_STEP", V_V_FLOW_STEP);
            cstmt.registerOutParameter("V_V_PROCESS_CODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_V_PROCESS_CODE"));
            result.put("V_V_INFO", cstmt.getString("V_V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_NEXTPERN");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_SETN(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_CK_EQUTYPECODE,String V_V_EQUTYPE,
                                           String V_V_EQUCODE,String V_V_CRITERION_CODE, String V_V_CRITERION_ITEM,String  V_V_CRITERION_CONTENT,
                                           String V_V_CRITERION_CR,String V_V_CRITERION_CYCLE,String  V_V_CRITERION_CYCLETYPE,String V_V_EQU_STATE1,String V_V_EQU_STATE2,
                                           String V_V_CK_FUNCTION1, String V_V_CK_FUNCTION2, String V_V_CK_FUNCTION3, String V_V_CK_FUNCTION4,
                                           String V_V_CK_FUNCTION5,String  V_V_CK_FUNCTION6,String  V_V_CK_FUNCTION7,String  V_V_CK_FUNCTION8,
                                           String V_I_ORDER,String V_V_PLAN_STATE,String  V_I_FLAG, String V_V_CKTYPE,String  V_I_WEIGHT,
                                           String V_I_YJ,String  V_V_INPER) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_SETN");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_SETN" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CRITERION_CODE,:V_V_CRITERION_ITEM,:V_V_CRITERION_CONTENT,:V_V_CRITERION_CR," +
                    ":V_V_CRITERION_CYCLE,:V_V_CRITERION_CYCLETYPE,:V_V_EQU_STATE1,:V_V_EQU_STATE2,:V_V_CK_FUNCTION1,:V_V_CK_FUNCTION2,:V_V_CK_FUNCTION3," +
                    ":V_V_CK_FUNCTION4,:V_V_CK_FUNCTION5,:V_V_CK_FUNCTION6,:V_V_CK_FUNCTION7,:V_V_CK_FUNCTION8,:V_I_ORDER,:V_V_PLAN_STATE,:V_I_FLAG," +
                    ":V_V_CKTYPE,:V_I_WEIGHT,:V_I_YJ,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_CRITERION_ITEM", V_V_CRITERION_ITEM);
            cstmt.setString("V_V_CRITERION_CONTENT", V_V_CRITERION_CONTENT);
            cstmt.setString("V_V_CRITERION_CR", V_V_CRITERION_CR);
            cstmt.setString("V_V_CRITERION_CYCLE", V_V_CRITERION_CYCLE);
            cstmt.setString("V_V_CRITERION_CYCLETYPE", V_V_CRITERION_CYCLETYPE);
            cstmt.setString("V_V_EQU_STATE1", V_V_EQU_STATE1);
            cstmt.setString("V_V_EQU_STATE2", V_V_EQU_STATE2);
            cstmt.setString("V_V_CK_FUNCTION1", V_V_CK_FUNCTION1);
            cstmt.setString("V_V_CK_FUNCTION2", V_V_CK_FUNCTION2);
            cstmt.setString("V_V_CK_FUNCTION3", V_V_CK_FUNCTION3);
            cstmt.setString("V_V_CK_FUNCTION4", V_V_CK_FUNCTION4);
            cstmt.setString("V_V_CK_FUNCTION5", V_V_CK_FUNCTION5);
            cstmt.setString("V_V_CK_FUNCTION6", V_V_CK_FUNCTION6);
            cstmt.setString("V_V_CK_FUNCTION7", V_V_CK_FUNCTION7);
            cstmt.setString("V_V_CK_FUNCTION8", V_V_CK_FUNCTION8);
            cstmt.setString("V_I_ORDER", V_I_ORDER);
            cstmt.setString("V_V_PLAN_STATE", V_V_PLAN_STATE);
            cstmt.setString("V_I_FLAG", V_I_FLAG);
            cstmt.setString("V_V_CKTYPE", V_V_CKTYPE);
            cstmt.setString("V_I_WEIGHT", V_I_WEIGHT);
            cstmt.setString("V_I_YJ", V_I_YJ);
            cstmt.setString("V_V_INPER", V_V_INPER);
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
        logger.info("end PM_06_DJ_CRITERION_SETN");
        return result;
    }

    public Map pro_sy201001_onedetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_onedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_onedetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_onedetail");
        return result;
    }

    public Map pro_sy201001_twodetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_twodetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_twodetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_twodetail");
        return result;
    }

    public Map pro_sy201001_threedetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_threedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_threedetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_threedetail");
        return result;
    }

    public Map pro_sy201001_fourdetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_fourdetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_fourdetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_fourdetail");
        return result;
    }

    public Map pro_sy201001_fivedetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_fivedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_fivedetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_fivedetail");
        return result;
    }

    public Map pro_sy201001_sixdetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_sixdetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_sixdetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_sixdetail");
        return result;
    }

    public Map pro_sy201001_sevendetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201001_sevendetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201001_sevendetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201001_sevendetail");
        return result;
    }

    public Map pro_sy201002_onedetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201002_onedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201002_onedetail(:recordcode_in,:ret)}");
            cstmt.setString("recordcode_in", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201002_onedetail");
        return result;
    }

    public Map pro_sy201002_twodetail(String v_record_id) throws SQLException {

        logger.info("begin pro_sy201002_twodetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201002_twodetail(:v_record_id,:ret)}");
            cstmt.setString("v_record_id", v_record_id);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201002_twodetail");
        return result;
    }

    public Map pro_sy201002_threedetail(String v_record_id) throws SQLException {

        logger.info("begin pro_sy201002_threedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201002_threedetail(:v_record_id,:ret)}");
            cstmt.setString("v_record_id", v_record_id);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201002_threedetail");
        return result;
    }

    public Map pro_sy201002_fourdetail(String v_record_id) throws SQLException {

        logger.info("begin pro_sy201002_fourdetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201002_fourdetail(:v_record_id,:ret)}");
            cstmt.setString("v_record_id", v_record_id);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201002_fourdetail");
        return result;
    }

    public Map pro_sy201003_onedetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201003_onedetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201003_onedetail(:recordcode_in,:ret)}");
            cstmt.setString("v_record_id", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201003_onedetail");
        return result;
    }

    public Map pro_sy201003_twodetail(String recordcode_in) throws SQLException {

        logger.info("begin pro_sy201003_twodetail");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy201003_twodetail(:recordcode_in,:ret)}");
            cstmt.setString("v_record_id", recordcode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end pro_sy201003_twodetail");
        return result;
    }

    public HashMap PM_06_DJ_DATA_TIMER_SET(String V_V_CRITERION_CODE,String V_V_TIMER_GUID, String V_V_DJPER,String V_V_DJ_TYPE,String V_V_PLAN_TIME) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_TIMER_SET" + "(:V_V_CRITERION_CODE,:V_V_TIMER_GUID,:V_V_DJPER,:V_V_DJ_TYPE,:V_V_PLAN_TIME,:V_INFO)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_TIMER_GUID", V_V_TIMER_GUID);
            cstmt.setString("V_V_DJPER", V_V_DJPER);
            cstmt.setString("V_V_DJ_TYPE", V_V_DJ_TYPE);
            cstmt.setString("V_V_PLAN_TIME", V_V_PLAN_TIME);
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
        logger.info("end PM_06_DJ_DATA_TIMER_SET");
        return result;
    }

    public Map PM_06_DJ_DATA_TIMER_SEL(String V_V_DJPER) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_TIMER_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_TIMER_SEL(:V_V_DJPER,:V_CURSOR)}");
            cstmt.setString("V_V_DJPER", V_V_DJPER);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("success", "true");

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_DATA_TIMER_SEL");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DSDATA_SEL() throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DSDATA_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DSDATA_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_06_DJ_CRITERION_DSDATA_SEL");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DBDATA_SEL(String V_V_TIMER_GUID, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DBDATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DBDATA_SEL" + "(:V_V_TIMER_GUID,:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_TIMER_GUID", V_V_TIMER_GUID);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PM_06_DJ_CRITERION_DBDATA_SEL");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DATA_SETN(String V_V_CRITERION_CODE,String V_V_FZ_PER,String V_V_PLAN_STATE,
                                                String V_V_PLAN_TIME,String V_V_PLAN_PER,String V_V_DJ_TYPE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DATA_SETN");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DATA_SETN" + "(:V_V_CRITERION_CODE,:V_V_FZ_PER," +
                    ":V_V_PLAN_STATE,:V_V_PLAN_TIME,:V_V_PLAN_PER,:V_V_DJ_TYPE,:V_INFO)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_FZ_PER", V_V_FZ_PER);
            cstmt.setString("V_V_PLAN_STATE", V_V_PLAN_STATE);
            cstmt.setString("V_V_PLAN_TIME", V_V_PLAN_TIME);
            cstmt.setString("V_V_PLAN_PER", V_V_PLAN_PER);
            cstmt.setString("V_V_DJ_TYPE", V_V_DJ_TYPE);
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
        logger.info("end PM_06_DJ_CRITERION_DATA_SETN");
        return result;
    }

    public HashMap PM_06_DJ_DATA_UPSET(String V_V_GUID,String V_V_DJ_STATE,String V_V_DJ_DATE,String V_V_DJ_PER,String V_V_DJ_NR,String V_V_DJ_TYPE,String V_V_TIMER_GUID) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_UPSET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_UPSET" + "(:V_V_GUID,:V_V_DJ_STATE,:V_V_DJ_DATE,:V_V_DJ_PER," +
                    ":V_V_DJ_NR,:V_V_DJ_TYPE,:V_V_TIMER_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DJ_STATE", V_V_DJ_STATE);
            cstmt.setString("V_V_DJ_DATE", V_V_DJ_DATE);
            cstmt.setString("V_V_DJ_PER", V_V_DJ_PER);
            cstmt.setString("V_V_DJ_NR", V_V_DJ_NR);
            cstmt.setString("V_V_DJ_TYPE", V_V_DJ_TYPE);
            cstmt.setString("V_V_TIMER_GUID", V_V_TIMER_GUID);
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
        logger.info("end PM_06_DJ_DATA_UPSET");
        return result;
    }


    public HashMap PM_1917_JXGX_JJ_DATA_SET(String V_V_JXGX_CODE,String V_V_JJ_CODE,String V_V_TS,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PM_1917_JXGX_JJ_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_JJ_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_JJ_CODE,:V_V_TS,:V_V_EQUCODE," +
                    ":V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
            cstmt.setString("V_V_TS", V_V_TS);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PM_1917_JXGX_JJ_DATA_SET");
        return result;
    }

    public HashMap PM_1917_JXGX_JJ_DATA_DEL(String  V_V_JXGX_CODE,String V_V_JJ_CODE) throws SQLException {

        logger.info("begin PM_1917_JXGX_JJ_DATA_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_JJ_DATA_DEL" + "(:V_V_JXGX_CODE," +
                    ":V_V_JJ_CODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
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
        logger.info("end PM_1917_JXGX_JJ_DATA_DEL");
        return result;
    }

    public HashMap PM_1917_JXMX_JJ_TS_SET(String V_V_JXGX_CODE,String V_V_JJ_CODE,String V_V_TS) throws SQLException {

        logger.info("begin PM_1917_JXGX_JJ_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_JJ_TS_SET" + "(:V_V_JXGX_CODE,:V_V_JJ_CODE,:V_V_TS," +
                    ":V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JJ_CODE", V_V_JJ_CODE);
            cstmt.setString("V_V_TS", V_V_TS);
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
        logger.info("end PM_1917_JXMX_JJ_TS_SET");
        return result;
    }

    public Map PRO_SAP_EQU_BOM_VIEWN(String V_V_EQUCODE,String V_V_SPNAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_BOM_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_BOM_VIEWN" + "(:V_V_EQUCODE,:V_V_SPNAME,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SPNAME", V_V_SPNAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_BOM_VIEWN");
        return result;
    }

    public HashMap PM_06_DJ_DATA_TIMER_MAXTIME(String V_CRITERION_CODE) throws SQLException {
        logger.info("begin PM_06_DJ_DATA_TIMER_MAXTIME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_TIMER_MAXTIME" + "(:V_CRITERION_CODE,:V_INFO)}");
            cstmt.setString("V_CRITERION_CODE", V_CRITERION_CODE);
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
        logger.info("end PM_06_DJ_DATA_TIMER_MAXTIME");
        return result;
    }


    //工单创建审批人
    public HashMap PM_ACTIVITI_PROCESS_PER_SEL2(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE,String V_V_FLOW_STEP,String V_V_PERCODE,String V_V_SPECIALTY,String V_V_WHERE) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_PER_SEL2");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_PER_SEL2" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_PROCESS_CODE,:V_V_WHERE,:V_CURSOR)}");
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
        logger.info("end PM_ACTIVITI_PROCESS_PER_SEL2");
        return result;
    }

}
