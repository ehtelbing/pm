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
 * Created by cxy on 2019/1/24.
 */
@Service
public class CxyService {
    private static final Logger logger = Logger.getLogger(CxyService.class.getName());

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

    public HashMap BASE_ROLETOTABLE_SEL(String V_V_DEPTCODE, String V_V_ROLECODE, String V_V_UPCODE) throws SQLException {
//        logger.info("begin BASE_ROLETOTABLE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_ROLETOTABLE_SEL" + "(:V_V_DEPTCODE,:V_V_ROLECODE,:V_V_UPCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_UPCODE", V_V_UPCODE);
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
        logger.info("end BASE_ROLETOTABLE_SEL");
        return result;
    }


    public HashMap PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(String V_V_OTHERPLAN_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_BY_MONTHGUID");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(:V_V_OTHERPLAN_GUID,:V_CURSOR,:V_INFO)}");
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_BY_MONTHGUID");
        return result;
    }


    public HashMap PRO_BASE_FAULT_SEL() throws SQLException {
//        logger.info("begin PRO_BASE_FAULT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FAULT_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_FAULT_SEL");
        return result;
    }

    public HashMap PRO_PM_STANDARD_GX_BOM_SEL(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_REPAIR_CODE,String V_V_EQUTYPE) throws SQLException {

        logger.info("begin PRO_PM_STANDARD_GX_BOM_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_STANDARD_GX_BOM_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_REPAIR_CODE,:V_V_EQUTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIR_CODE", V_V_REPAIR_CODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_CURSOR", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_STANDARD_GX_BOM_SEL");
        return result;
    }

    public HashMap PM_STANDARD_GX_BOM_SET(String V_V_GUID,String V_V_SPCODE,String V_V_EQUCODE,String V_V_NUM,String V_V_INPUTER) throws SQLException {

        logger.info("begin PM_STANDARD_GX_BOM_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_STANDARD_GX_BOM_SET" + "(:V_V_GUID,:V_V_SPCODE,:V_V_EQUCODE,:V_V_NUM,:V_V_INPUTER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPCODE", V_V_SPCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.setString("V_V_INPUTER", V_V_INPUTER);
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
        logger.info("end PM_STANDARD_GX_BOM_SET");
        return result;
    }

    public HashMap SAP_PM_EQU_BOM_FOR_JX_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin SAP_PM_EQU_BOM_FOR_JX_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_BOM_FOR_JX_SEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_CURSOR", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAP_PM_EQU_BOM_FOR_JX_SEL");
        return result;
    }

    //查询维修标准主表BY TYPE
    public Map PRO_STANDARD_DATA_BY_TYPE_SEL(String V_V_EQUTYPE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_STANDARD_DATA_BY_TYPE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_STANDARD_DATA_BY_TYPE_SEL(:V_V_EQUTYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            String V_V_SNUM = (String) cstmt.getObject("V_V_SNUM");
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
            result.put("total", V_V_SNUM);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_STANDARD_DATA_BY_TYPE_SEL");
        return result;
    }

    public HashMap PRO_WORKORDER_STANDARD_SET(String V_V_GUID,String V_V_ORDERID,String V_V_INPUTER) throws SQLException {

        logger.info("begin PRO_WORKORDER_STANDARD_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_STANDARD_SET" + "(:V_V_GUID,:V_V_ORDERID,:V_V_INPUTER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_INPUTER", V_V_INPUTER);
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
        logger.info("end PRO_WORKORDER_STANDARD_SET");
        return result;
    }

    public HashMap PM_1405_FAULT_ITEM_DATA_SET(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE,
                                             String V_V_EQUCHILD_CODE, String V_V_FAULT_GUID, String V_V_FAULT_TYPE, String V_V_FAULT_YY,
                                             String V_V_FINDTIME, String V_V_FAULT_XX,
                                             String V_V_JJBF,String V_V_FAULT_LEVEL, String V_V_FILE_GUID, String V_V_INTIME,
                                             String V_V_PERCODE, String V_V_IP,String V_V_FAULT_NAME,String V_V_FAULT_PART,String V_V_FAULT_CLGC,
                                               String V_V_FAULT_SS,String V_V_FAULT_XZ,String V_V_FAULT_ZGCS,String V_V_FZR_CL) throws SQLException {
        logger.info("begin PM_1405_FAULT_ITEM_DATA_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1405_FAULT_ITEM_DATA_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME," +
                    ":V_V_FAULT_XX,:V_V_JJBF,:V_V_FAULT_LEVEL," +
                    ":V_V_FILE_GUID,:V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_V_FAULT_NAME,:V_V_FAULT_PART,:V_V_FAULT_CLGC," +
                    ":V_V_FAULT_SS,:V_V_FAULT_XZ,:V_V_FAULT_ZGCS,:V_V_FZR_CL,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FINDTIME", V_V_FINDTIME);
            cstmt.setString("V_V_FAULT_XX", V_V_FAULT_XX);
            cstmt.setString("V_V_JJBF", V_V_JJBF);
            cstmt.setString("V_V_FAULT_LEVEL", V_V_FAULT_LEVEL);
            cstmt.setString("V_V_FILE_GUID", V_V_FILE_GUID);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_FAULT_NAME", V_V_FAULT_NAME);
            cstmt.setString("V_V_FAULT_PART", V_V_FAULT_PART);
            cstmt.setString("V_V_FAULT_CLGC", V_V_FAULT_CLGC);
            cstmt.setString("V_V_FAULT_SS", V_V_FAULT_SS);
            cstmt.setString("V_V_FAULT_XZ", V_V_FAULT_XZ);
            cstmt.setString("V_V_FAULT_ZGCS", V_V_FAULT_ZGCS);
            cstmt.setString("V_V_FZR_CL", V_V_FZR_CL);
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
        logger.info("end PM_1405_FAULT_ITEM_DATA_SET");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_SBGZ_CREATE(String V_V_PERCODE, String V_V_PERNAME, String V_V_MODELNUMBER) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SBGZ_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SBGZ_CREATE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_MODELNUMBER,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_MODELNUMBER", V_V_MODELNUMBER);
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
        logger.info("end PRO_PM_WORKORDER_SBGZ_CREATE");
        return result;
    }
}
