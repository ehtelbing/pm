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
 * Created by Administrator on 17-4-23.
 */
@Service
public class WorkOrderService {
    private static final Logger logger = Logger.getLogger(WorkOrderService.class.getName());

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

    public HashMap PM_WORKORDER_TYPE_SEL(String V_V_SOURCECODE) throws SQLException {

        logger.info("begin PM_WORKORDER_TYPE_SEL");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKORDER_TYPE_SEL(:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
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
        logger.info("end PM_WORKORDER_TYPE_SEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_DEFECT_SAVE(String V_V_PERNAME,String  V_DEFECT_GUID,String  V_V_ORDERGUID,String  V_V_EQUCODE,
                                                String V_V_WORKORDER_TYPE,String V_V_DEPTCODEREPARIR,String V_V_SHORT_TXT,String V_V_WBS,
                                                String V_V_WBS_TXT,String V_D_START_DATE,String V_D_FINISH_DATE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_DEFECT_SAVE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DEFECT_SAVE" + "(:V_V_PERNAME,:V_DEFECT_GUID," +
                    ":V_V_ORDERGUID,:V_V_EQUCODE,:V_V_WORKORDER_TYPE,:V_V_DEPTCODEREPARIR,:V_V_SHORT_TXT,:V_V_WBS,:V_V_WBS_TXT," +
                    ":V_D_START_DATE,:V_D_FINISH_DATE,:V_CURSOR)}");
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_WORKORDER_TYPE", V_V_WORKORDER_TYPE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_DEFECT_SAVE");
        return result;
    }
    public HashMap PM_WORKORDER_FLOW_PER_SEL(String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_GUID,String V_V_FLOWTYPE) throws SQLException {

        logger.info("begin PM_WORKORDER_FLOW_PER_SEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FLOW_PER_SEL(:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_GUID,:V_V_FLOWTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("list", resultList);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_FLOW_PER_SEL");
        return result;
    }

    public HashMap PRO_WO_FLOW_DB_INSERT(String V_V_ORDERID,String V_V_FLOWSTEP,String V_V_STATUS,String V_V_PERCODE,String V_V_FLOWTYPE,String V_V_FLOWCODE,String V_V_FLOWNAME) throws SQLException {

        logger.info("begin PRO_WO_FLOW_DB_INSERT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DB_INSERT" + "(:V_V_ORDERID,:V_V_FLOWSTEP," +
                    ":V_V_STATUS,:V_V_PERCODE,:V_V_FLOWTYPE,:V_V_FLOWCODE,:V_V_FLOWNAME,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
            cstmt.setString("V_V_STATUS", V_V_STATUS);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_FLOWNAME", V_V_FLOWNAME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DB_INSERT");
        return result;
    }

    public HashMap PRO_GET_DEPTEQUTYPE_ADMIN(String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_ADMIN");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_ADMIN" + "(:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_ADMIN");
        return result;
    }
    public HashMap PRO_GET_DEPTEQU_ADMIN(String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_ADMIN");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_ADMIN" + "(:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
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
        logger.info("end PRO_GET_DEPTEQU_ADMIN");
        return result;
    }
    public HashMap PRO_BASE_PERSON_VIEW_ROLE(String V_V_DEPTCODE,String V_V_PERSONCODE,String V_V_ROLE) throws SQLException {
        logger.info("begin PRO_BASE_PERSON_VIEW_ROLE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW_ROLE" + "(:V_V_DEPTCODE,:V_V_PERSONCODE,:V_V_ROLE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ROLE", V_V_ROLE);
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
        logger.info("end PRO_BASE_PERSON_VIEW_ROLE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_STATE_VIEW() throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_STATE_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_STATE_VIEW" + "(:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_STATE_VIEW");
        return result;
    }
    public HashMap PRO_PM_WORKTYPCOUNT_ADMIN(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                             String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_EQUTYPE_CODE,String V_EQU_CODE,
                                             String V_DJ_PERCODE,String V_V_SHORT_TXT,String V_V_BJ_TXT) throws SQLException {
        logger.info("begin PRO_PM_WORKTYPCOUNT_ADMIN");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKTYPCOUNT_ADMIN" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
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
        logger.info("end PRO_PM_WORKTYPCOUNT_ADMIN");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_SELECT_ADMIN(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                                 String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_EQUTYPE_CODE,String V_EQU_CODE,
                                                 String V_DJ_PERCODE,String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SELECT_ADMIN");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_ADMIN" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR," +
                    ":V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT," +
                    ":V_V_BJ_TXT,:V_V_ORDER_TYP,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
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
        //result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SELECT_ADMIN");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_LIST_VIEW2(String V_V_ENTERED_BY,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,
                                               String V_V_STATECODE,String V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_LIST_VIEW2");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LIST_VIEW2(:V_V_ENTERED_BY,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_V_ENTERED_BY", V_V_ENTERED_BY);
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
        logger.info("end PRO_PM_WORKORDER_LIST_VIEW2");
        return result;
    }
    public HashMap PRO_RUN7111_EQULIST(String V_V_PLANTCODE,String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_RUN7111_EQULIST");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_EQULIST(:V_V_PLANTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end PRO_RUN7111_EQULIST");
        return result;
    }
    public HashMap PRO_RUN_BJ_CHANGE_LOG_ALL(String A_BJ_UNIQUE_CODE) throws SQLException {

        logger.info("begin PRO_RUN_BJ_CHANGE_LOG_ALL");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CHANGE_LOG_ALL(:A_BJ_UNIQUE_CODE,:V_CURSOR)}");
            cstmt.setString("A_BJ_UNIQUE_CODE", A_BJ_UNIQUE_CODE);
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
        logger.info("end PRO_RUN_BJ_CHANGE_LOG_ALL");
        return result;
    }
    public HashMap pro_run7113_ordermatlist(String V_DEPT_CODE,String V_EQUIP_CODE,String V_MATERIALCODE,String V_MATERIALNAME) throws SQLException {

        logger.info("begin pro_run7113_ordermatlist");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_ordermatlist(:V_DEPT_CODE,:V_EQUIP_CODE,:V_MATERIALCODE,:V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
            cstmt.setString("V_EQUIP_CODE", V_EQUIP_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
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
        logger.info("end pro_run7113_ordermatlist");
        return result;
    }
    public HashMap pro_run7110_sitesupplylist(String a_id,String a_materialcode,String a_orderid) throws SQLException {

        logger.info("begin pro_run7110_sitesupplylist");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7110_sitesupplylist(:a_id,:a_materialcode,:a_orderid,:V_CURSOR)}");
            cstmt.setString("a_id", a_id);
            cstmt.setString("a_materialcode", a_materialcode);
            cstmt.setString("a_orderid", a_orderid);
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
        logger.info("end pro_run7110_sitesupplylist");
        return result;
    }
    public HashMap pro_run7113_changecancel(String V_I_ID,String V_SITE_ID,String V_EQUIP_NO,String V_USERID,String V_USERNAME,String V_PLANTCODE,String V_DEPARTCODE,String V_CHANGETIME) throws SQLException {

        logger.info("begin pro_run7113_changecancel");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_changecancel(:V_I_ID,:V_SITE_ID,:V_EQUIP_NO,:V_USERID,:V_USERNAME,:V_PLANTCODE,:V_DEPARTCODE,:V_CHANGETIME,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_CHANGETIME", V_CHANGETIME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_changecancel");
        return result;
    }
    public HashMap pg_run7113_getordermatbarcode(String a_orderid,String a_materialcode) throws SQLException {

        logger.info("begin pg_run7113_getordermatbarcode");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_run7113_getordermatbarcode(:a_orderid,:a_materialcode,:V_CURSOR)}");
            cstmt.setString("a_orderid", a_orderid);
            cstmt.setString("a_materialcode", a_materialcode);
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
        logger.info("end pg_run7113_getordermatbarcode");
        return result;
    }
    public HashMap pro_run7113_changeordermat(String A_ID,String SITE_ID,String a_change_amount,String V_EQUIP_NO,
                                              String USERID,String USERNAME,String PLANTCODE,String WORKAREA,String CHANGEDATE,
                                              String V_MATERIALCODE,String a_supplycode,String a_supplyname,String a_uniquecode,
                                              String a_replacedate,String a_faultreason,String A_REASON_REMARK)throws SQLException {

        logger.info("begin pro_run7113_changeordermat");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_run7113_changeordermat(:A_ID,:SITE_ID,:a_change_amount,:V_EQUIP_NO,:USERID,:USERNAME,:PLANTCODE," +
                    ":WORKAREA,:CHANGEDATE,:V_MATERIALCODE,:a_supplycode,:a_supplyname,:a_uniquecode,:a_replacedate,:a_faultreason,:A_REASON_REMARK,:V_INFO)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.setString("SITE_ID", SITE_ID);
            cstmt.setString("a_change_amount", a_change_amount);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("USERID", USERID);
            cstmt.setString("USERNAME", USERNAME);
            cstmt.setString("PLANTCODE", PLANTCODE);
            cstmt.setString("WORKAREA", WORKAREA);
            cstmt.setString("CHANGEDATE", CHANGEDATE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("a_supplycode", a_supplycode);
            cstmt.setString("a_supplyname", a_supplyname);
            cstmt.setString("a_uniquecode", a_uniquecode);
            cstmt.setString("a_replacedate", a_replacedate);
            cstmt.setString("a_faultreason", a_faultreason);
            cstmt.setString("A_REASON_REMARK", A_REASON_REMARK);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7113_changeordermat");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_ET_DEFAULE(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_DEFAULE");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_DEFAULE(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_ET_DEFAULE");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_GET(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GET(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_ET_DEFAULE");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_EDIT(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID,String V_V_SHORT_TXT,
                                         String V_V_FUNC_LOC,String V_V_EQUIP_NO,String V_V_EQUIP_NAME,String V_D_FACT_START_DATE,
                                         String V_D_FACT_FINISH_DATE,String V_V_WBS,String V_V_WBS_TXT,String V_V_DEPTCODEREPARIR,
                                         String V_V_TOOL,String V_V_TECHNOLOGY,String V_V_SAFE,String V_D_DATE_ACP,String V_I_OTHERHOUR,
                                         String V_V_OTHERREASON,String V_V_REPAIRCONTENT, String V_V_REPAIRSIGN,String V_V_REPAIRPERSON,
                                         String V_V_POSTMANSIGN,String V_V_CHECKMANCONTENT,String V_V_CHECKMANSIGN,String V_V_WORKSHOPCONTENT,
                                         String V_V_WORKSHOPSIGN,String V_V_DEPTSIGN)throws SQLException {




        logger.info("begin PRO_PM_WORKORDER_EDIT");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_EDIT(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_SHORT_TXT,:V_V_FUNC_LOC," +
                    ":V_V_EQUIP_NO,:V_V_EQUIP_NAME,:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT,:V_V_DEPTCODEREPARIR," +
                    ":V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_D_DATE_ACP,:V_I_OTHERHOUR,:V_V_OTHERREASON,:V_V_REPAIRCONTENT,:V_V_REPAIRSIGN," +
                    ":V_V_REPAIRPERSON,:V_V_POSTMANSIGN,:V_V_CHECKMANCONTENT,:V_V_CHECKMANSIGN,:V_V_WORKSHOPCONTENT,:V_V_WORKSHOPSIGN," +
                    ":V_V_DEPTSIGN,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_FUNC_LOC", V_V_FUNC_LOC);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_EQUIP_NAME", V_V_EQUIP_NAME);
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
            cstmt.setString("V_D_DATE_ACP", V_D_DATE_ACP);
            cstmt.setString("V_I_OTHERHOUR", V_I_OTHERHOUR);
            cstmt.setString("V_V_OTHERREASON", V_V_OTHERREASON);
            cstmt.setString("V_V_REPAIRCONTENT", V_V_REPAIRCONTENT);
            cstmt.setString("V_V_REPAIRSIGN", V_V_REPAIRSIGN);
            cstmt.setString("V_V_REPAIRPERSON", V_V_REPAIRPERSON);
            cstmt.setString("V_V_POSTMANSIGN", V_V_POSTMANSIGN);
            cstmt.setString("V_V_CHECKMANCONTENT", V_V_CHECKMANCONTENT);
            cstmt.setString("V_V_CHECKMANSIGN", V_V_CHECKMANSIGN);
            cstmt.setString("V_V_WORKSHOPCONTENT", V_V_WORKSHOPCONTENT);
            cstmt.setString("V_V_WORKSHOPSIGN", V_V_WORKSHOPSIGN);
            cstmt.setString("V_V_DEPTSIGN", V_V_DEPTSIGN);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_EDIT");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_YS(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID,String V_V_POSTMANSIGN,
                                       String V_V_CHECKMANCONTENT,String V_V_CHECKMANSIGN,String V_V_WORKSHOPCONTENT,
                                       String V_V_WORKSHOPSIGN,String V_V_DEPTSIGN,String V_V_EQUIP_NO)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_YS");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YS(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_POSTMANSIGN,:V_V_CHECKMANCONTENT,:V_V_CHECKMANSIGN,:V_V_WORKSHOPCONTENT,:V_V_WORKSHOPSIGN,:V_V_DEPTSIGN,:V_V_EQUIP_NO,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_POSTMANSIGN", V_V_POSTMANSIGN);
            cstmt.setString("V_V_CHECKMANCONTENT", V_V_CHECKMANCONTENT);
            cstmt.setString("V_V_CHECKMANSIGN", V_V_CHECKMANSIGN);
            cstmt.setString("V_V_WORKSHOPCONTENT", V_V_WORKSHOPCONTENT);
            cstmt.setString("V_V_WORKSHOPSIGN", V_V_WORKSHOPSIGN);
            cstmt.setString("V_V_DEPTSIGN", V_V_DEPTSIGN);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YS");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_MOD_CREATE(String V_V_ORDERGUID,String V_V_PERSONCODE,String V_V_PERSONNAME,String V_V_MOD_NAME)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_MOD_CREATE");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_MOD_CREATE(:V_V_ORDERGUID,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_MOD_NAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_MOD_NAME", V_V_MOD_NAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_MOD_CREATE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_MODEL_CREATE(String V_V_ORDERGUID,String V_V_PERSONCODE,String V_V_PERSONNAME,String V_V_MOD_NAME)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_MODEL_CREATE");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_MODEL_CREATE(:V_V_ORDERGUID,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_MOD_NAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_MOD_NAME", V_V_MOD_NAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_MODEL_CREATE");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_FK(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID,String V_D_FACT_START_DATE,String V_D_FACT_FINISH_DATE,
                                       String V_I_OTHERHOUR,String V_V_OTHERREASON,String V_V_REPAIRCONTENT,String V_V_REPAIRSIGN,String V_V_REPAIRPERSON,String V_V_TOOL)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_FK");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FK(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE," +
                    ":V_I_OTHERHOUR,:V_V_OTHERREASON,:V_V_REPAIRCONTENT,:V_V_REPAIRSIGN,:V_V_REPAIRPERSON,:V_V_TOOL,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setString("V_I_OTHERHOUR", V_I_OTHERHOUR);
            cstmt.setString("V_V_OTHERREASON", V_V_OTHERREASON);
            cstmt.setString("V_V_REPAIRCONTENT", V_V_REPAIRCONTENT);
            cstmt.setString("V_V_REPAIRSIGN", V_V_REPAIRSIGN);
            cstmt.setString("V_V_REPAIRPERSON", V_V_REPAIRPERSON);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_FK");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_HOURS_VIEW(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_HOURS_VIEW");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_HOURS_VIEW(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_HOURS_VIEW");
        return result;
    }
    //tree
    public List<Map> PRO_ORDER_PERSON_TREE(String IN_ORDER_ID,String IN_WORK_ID,String IN_DEPARTCODE) throws SQLException {

        logger.info("begin PRO_ORDER_PERSON_TREE");

        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_ORDER_PERSON_TREE" + "(:IN_ORDER_ID,:IN_WORK_ID,:IN_DEPARTCODE,:V_CURSOR)}");
            cstmt.setString("IN_ORDER_ID", IN_ORDER_ID);
            cstmt.setString("IN_WORK_ID", IN_WORK_ID);
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            List<Map> list = new ArrayList<Map>();
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

            //根---部门
            if(list.size()>0){
                temp.put("parentid", "");
                temp.put("text", list.get(0).get("V_DEPTNAME"));
                temp.put("expanded", true);
                temp.put("children", GetChildren(list));
                menu.add(temp);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + menu);
        logger.info("end PRO_ORDER_PERSON_TREE");
        return menu;
    }
    private List<Map> GetChildren(List<Map> list) {
        List<Map> menu = new ArrayList<Map>();
        List listarr=new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            if(!listarr.contains(list.get(i).get("V_CLASS_CODE"))){
                listarr.add(list.get(i).get("V_CLASS_CODE"));
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_CLASS_CODE"));
                temp.put("text", list.get(i).get("V_CLASS_NAME"));
                if (IfHasChildNode(list, list.get(i).get("V_CLASS_CODE").toString())) {
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                    temp.put("children",GetSecondChildren(list, list.get(i).get("V_CLASS_CODE").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    private Boolean IfHasChildNode(List<Map> list, String code) {
        for (int i = 0; i < list.size(); i++) {
            if (code.equals(list.get(i).get("V_CLASS_CODE").toString())) {
                return true;
            }
        }
        return false;
    }
    private List<Map> GetSecondChildren(List<Map> list, String code) {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_CLASS_CODE").equals(code)) {
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_PERSONCODE"));
                temp.put("text", list.get(i).get("V_PERSONNAME"));
                temp.put("leaf", true);
                temp.put("craftcode", list.get(i).get("V_CRAFTCODE"));
                temp.put("craftname", list.get(i).get("V_CRAFTNAME"));
                temp.put("expanded", false);
                menu.add(temp);
            }
        }
        return menu;
    }
    public HashMap PRO_PM_WORKORDER_HOURS_SET(String V_I_ID,String V_ORDERGUID,String V_V_PERSONTYPECODE,
                                              String V_V_PERSONTYPENAME,String V_V_PERSONCODE,String V_V_PERSONNAME,String V_I_WORKHOUR,
                                              String V_V_ACTIVITY,String V_D_BEGINTIME,String V_D_ENDTIME)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_HOURS_SET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_HOURS_SET(:V_I_ID,:V_ORDERGUID,:V_V_PERSONTYPECODE," +
                    ":V_V_PERSONTYPENAME,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_I_WORKHOUR,:V_V_ACTIVITY,:V_D_BEGINTIME,:V_D_ENDTIME,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_ORDERGUID", V_ORDERGUID);
            cstmt.setString("V_V_PERSONTYPECODE", V_V_PERSONTYPECODE);
            cstmt.setString("V_V_PERSONTYPENAME", V_V_PERSONTYPENAME);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_I_WORKHOUR", V_I_WORKHOUR);
            cstmt.setString("V_V_ACTIVITY", V_V_ACTIVITY);
            cstmt.setString("V_D_BEGINTIME", V_D_BEGINTIME);
            cstmt.setString("V_D_ENDTIME", V_D_ENDTIME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_HOURS_SET");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_HOURS_DEL(String V_I_ID)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_HOURS_DEL");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_HOURS_DEL(:V_I_ID,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_HOURS_DEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_HOURS_RETURN(String V_V_ORDERGUID)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_HOURS_RETURN");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_HOURS_RETURN(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_HOURS_RETURN");
        return result;
    }
    //tree
    public List<Map> PRO_TOOLLVEHICLE_TREE(String V_TYPE,String V_NAME) throws SQLException {

        logger.info("begin PRO_TOOLLVEHICLE_TREE");
        List<Map> ListTree = new ArrayList<Map>();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_TOOLLVEHICLE_TREE" + "(:V_TYPE,:V_NAME,:V_CURSOR)}");
            cstmt.setString("V_TYPE", V_TYPE);
            cstmt.setString("V_NAME", V_NAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

            //转换集合为树
            ListTree=getChildrenNode(list,"-1");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + ListTree);
        logger.info("end PRO_TOOLLVEHICLE_TREE");
        return ListTree;
    }
    //查询子节点
    @SuppressWarnings("unchecked")
    private List<Map> getChildrenNode(List<Map> list,String parentid){
        List<Map> tempList = new ArrayList<Map>();
        for(int i=0;i<list.size();i++){
            if(list.get(i).get("V_CODEUP").equals(parentid)){
                tempList.add(list.get(i));
            }
        }
        List<Map> ListTree= new ArrayList<Map>();
        for(int i=0;i<tempList.size();i++){
            Map tree = new HashMap();
            tree.put("id", tempList.get(i).get("V_CODE"));
            tree.put("text", tempList.get(i).get("V_NAME"));
            tree.put("parentid", tempList.get(i).get("V_CODEUP"));
            if(getChildrenNode(list,(String)tempList.get(i).get("V_CODE")).size()>0){
                tree.put("children", getChildrenNode(list,(String)tempList.get(i).get("V_CODE")));
                tree.put("expanded", true);
            }else{
                tree.put("leaf", true);
            }
            ListTree.add(tree);
        }
        return ListTree;
    }
    //tree
    public List<Map> PRO_PM_WORKORDER_TOOL_CY(String V_PERCODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_CY");
        List<Map> list = new ArrayList<Map>();
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
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_PM_WORKORDER_TOOL_CY");
        return list;
    }
    public HashMap PRO_CL_DIC_CAR_VIEW(String V_V_FLAG)throws SQLException {

        logger.info("begin PRO_CL_DIC_CAR_VIEW");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_DIC_CAR_VIEW(:V_V_FLAG,:V_CURSOR)}");
            cstmt.setString("V_V_FLAG", V_V_FLAG);
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
        logger.info("end PRO_CL_DIC_CAR_VIEW");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_DROP(String V_V_PERCODE,String V_V_CLOUMSNAME)throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_DROP");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_DROP(:V_V_PERCODE,:V_V_CLOUMSNAME,:V_CURSOR)}");
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
        logger.info("end PRO_CL_WORKORDER_DATA_DROP");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_VIEW(String V_V_ORDERID)throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_VIEW");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_VIEW(:V_V_ORDERID,:V_CURSOR)}");
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
        logger.info("end PRO_CL_WORKORDER_DATA_VIEW");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_TOOL_VIEW(String V_V_ORDERGUID)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_VIEW");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TOOL_VIEW(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_TOOL_VIEW");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_GET(String V_I_ID)throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_GET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_GET(:V_I_ID,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_CL_WORKORDER_DATA_GET");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_SET(String V_V_IP,String V_V_PERCODE,String V_V_ORDERID,String V_V_CARCODE,
                                             String V_D_DATETIME_WITE,String V_V_DD_WITE,String V_V_WP_WITE,String V_V_MEMO,String V_V_LXRDH) throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_SET" + "(:V_V_IP,:V_V_PERCODE,:V_V_ORDERID," +
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
            result.put("V_INFO",(String) cstmt.getString("V_V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_CL_WORKORDER_DATA_SET");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_EDIT(String V_V_IP,String V_V_PERCODE,String V_I_ID,String V_V_CARCODE,
                                              String V_D_DATETIME_WITE,String V_V_DD_WITE,String V_V_WP_WITE,String V_V_MEMO,String V_V_LXRDH) throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_EDIT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_EDIT" + "(:V_V_IP,:V_V_PERCODE,:V_I_ID," +
                    ":V_V_CARCODE,:V_D_DATETIME_WITE,:V_V_DD_WITE,:V_V_WP_WITE,:V_V_MEMO,:V_V_LXRDH,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_D_DATETIME_WITE", V_D_DATETIME_WITE);
            cstmt.setString("V_V_DD_WITE", V_V_DD_WITE);
            cstmt.setString("V_V_WP_WITE", V_V_WP_WITE);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_LXRDH", V_V_LXRDH);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            result.put("V_INFO",(String) cstmt.getString("V_V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_CL_WORKORDER_DATA_EDIT");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_DEL(String V_I_ID)throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_DEL");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_DEL(:V_I_ID,:V_V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String sss = (String) cstmt.getObject("V_V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_CL_WORKORDER_DATA_DEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_TOOL_DEL(String V_I_ID)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_DEL");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TOOL_DEL(:V_I_ID,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_TOOL_DEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_TOOL_SET(String V_I_ID,String V_ORDERGUID,String V_V_TOOLCODE,String V_V_TOOLNAME,
                                             String V_V_USEMAN,String V_D_USETIME,String V_I_HOUR,String V_I_NUMBER,
                                             String V_V_MEMO,String V_V_RETURNMAN,String V_D_RETURNTIME) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TOOL_SET" + "(:V_I_ID,:V_ORDERGUID,:V_V_TOOLCODE," +
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
            conn.commit();
            result.put("V_INFO",(String) cstmt.getString("V_CURSOR"));
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
    public HashMap PRO_PM_WORKORDER_TOOL_RETSTR(String V_V_ORDERGUID)throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_TOOL_RETSTR");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_TOOL_RETSTR(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_TOOL_RETSTR");
        return result;
    }
    public HashMap PRO_CL_WORKORDER_DATA_FKSAVE(String V_V_IP,String V_V_PERCODE,String V_I_ID,String V_D_DATE_CF,String V_D_DD_CF,String V_D_DATE_LK,String V_D_DATE_NEXT_MDD,String V_V_PERCODE_SJ)throws SQLException {

        logger.info("begin PRO_CL_WORKORDER_DATA_FKSAVE");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CL_WORKORDER_DATA_FKSAVE(:V_V_IP,:V_V_PERCODE,:V_I_ID,:V_D_DATE_CF,:V_D_DD_CF,:V_D_DATE_LK,:V_D_DATE_NEXT_MDD,:V_V_PERCODE_SJ,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_D_DATE_CF", V_D_DATE_CF);
            cstmt.setString("V_D_DD_CF", V_D_DD_CF);
            cstmt.setString("V_D_DATE_LK", V_D_DATE_LK);
            cstmt.setString("V_D_DATE_NEXT_MDD", V_D_DATE_NEXT_MDD);
            cstmt.setString("V_V_PERCODE_SJ", V_V_PERCODE_SJ);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String sss = (String) cstmt.getObject("V_V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_CL_WORKORDER_DATA_FKSAVE");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_FK_JIP_VIEW(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_FK_JIP_VIEW");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FK_JIP_VIEW" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            conn.commit();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_FK_JIP_VIEW");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_FK_JIP_SET(String V_V_ORDERGUID,Integer V_I_SPAREID,Integer V_I_NUMBER_JIP) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_FK_JIP_SET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FK_JIP_SET" + "(:V_V_ORDERGUID,:V_I_SPAREID,:V_I_NUMBER_JIP,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setInt("V_I_SPAREID", V_I_SPAREID);
            cstmt.setInt("V_I_NUMBER_JIP", V_I_NUMBER_JIP);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String  sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO",sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_FK_JIP_SET");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_LIST_VIEW(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_V_SHORT_TXT) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_LIST_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LIST_VIEW" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_V_SHORT_TXT,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_LIST_VIEW");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_SP(String V_V_PERSONCODE,String V_V_ORDERGUID,String V_V_STEPNAME,String V_V_MEMO,String V_V_STATECODE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SP");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SP" + "(:V_V_PERSONCODE,:V_V_ORDERGUID,:V_V_STEPNAME,:V_V_MEMO,:V_V_STATECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_STEPNAME", V_V_STEPNAME);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO",sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SP");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_YS_BACK(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_YS_BACK");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YS_BACK" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO",sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YS_BACK");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_DEFECT_CREATE(String V_V_PERNAME,String V_DEFECT_GUID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_DEFECT_CREATE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DEFECT_CREATE" + "(:V_V_PERNAME,:V_DEFECT_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_DEFECT_CREATE");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_EDIT_XD(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID,String V_V_SHORT_TXT,String V_D_START_DATE,String V_D_FINISH_DATE,String V_V_DEPTCODEREPARIR,String V_V_TOOL,String V_V_TECHNOLOGY,String V_V_SAFE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_EDIT_XD");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_EDIT_XD" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_SHORT_TXT,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_DEPTCODEREPARIR,:V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_EDIT_XD");
        return result;
    }
    public HashMap PRO_GET_SAP_PM_EQU_P(String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_GET_SAP_PM_EQU_P");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_SAP_PM_EQU_P" + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end PRO_GET_SAP_PM_EQU_P");
        return result;
    }
    public HashMap PM_14_FAULT_MODEL_SEL(String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PM_14_FAULT_MODEL_SEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_MODEL_SEL" + "(:V_V_EQUTYPECODE,:V_CURSOR)}");
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
        logger.info("end PM_14_FAULT_MODEL_SEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_LIST_PRINT(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_DJ_PERCODE,String V_V_SHORT_TXT) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_LIST_PRINT");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LIST_PRINT" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
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
        logger.info("end PRO_PM_WORKORDER_LIST_PRINT");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_JS(String V_V_PERNAME,String V_V_ORDERGUID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_JS");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_JS" + "(:V_V_PERNAME,:V_V_ORDERGUID,:V_INFO)}");
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_JS");
        return result;
    }
    //tree
    public List<Map> PRO_BASE_DEPT_TREE(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_TREE");
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_DEPT_TREE");
        return list;
    }
    //tree
    public HashMap PRO_GET_DEPTEQUTYPE_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_PER" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }
    //tree
    public HashMap PRO_SAP_EQU_VIEW(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_EQU_VIEW");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
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
    //tree
    public HashMap PRO_PM_07_DEPTEQU_PER_DROP(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEPTEQU_PER_DROP");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            list.add(temp);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEPTEQU_PER_DROP");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_ET_SETWORK(String V_I_ID,String V_NAME,Integer V_VALUE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_SETWORK");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_SETWORK" + "(:V_I_ID,:V_NAME,:V_VALUE,:V_CURSOR)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_NAME", V_NAME);
            cstmt.setInt("V_VALUE", V_VALUE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String  sss = (String) cstmt.getObject("V_CURSOR");
            result.put("V_INFO",sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_ET_SETWORK");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_LISHI(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_LISHI");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LISHI" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_LISHI");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_CHILD_SEL(String V_V_ORDERGUID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_CHILD_SEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_CHILD_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_CHILD_SEL");
        return result;
    }

    public HashMap PM_WORKREPAIRPER_HISTORY_SET(String V_V_DEPTCODE, String V_V_DEPTNAME, String V_V_ROLECODE, String V_V_ROLENAME,String V_V_PERCODE,
                                                String V_V_PERNAME,String V_V_INPER) throws SQLException {

        logger.info("begin PM_WORKREPAIRPER_HISTORY_SET");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKREPAIRPER_HISTORY_SET" + "(:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_ROLECODE,:V_V_ROLENAME,:V_V_PERCODE," +
                    ":V_V_PERNAME,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_ROLENAME", V_V_ROLENAME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            conn.commit();
            String  sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO",sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKREPAIRPER_HISTORY_SET");
        return result;
    }
}
