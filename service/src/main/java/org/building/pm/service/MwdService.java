package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import oracle.sql.DATE;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Created by zjh on 2017/10/31.
 */

@Service
public class MwdService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

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
                                rs.getString(i) == null ? "" : rs.getString(i).toString().replaceAll("\\n", ""));
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }

    //查询设备主数据图纸
    public HashMap SAP_PM_EQU_FILE_SEL(String V_V_EQUCODE) throws SQLException {

        logger.info("begin SAP_PM_EQU_FILE_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_FILE_SEL" + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end SAP_PM_EQU_FILE_SEL");
        return result;
    }

    //获取工程大类列表
    public HashMap GET_PROJECT_CLASS_LIST() throws SQLException {

        logger.info("begin GET_PROJECT_CLASS_LIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTCLASSLIST" + "(:RET)}");
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
        logger.info("end GET_PROJECT_CLASS_LIST");
        return result;
    }

    //获取工程列表
    public HashMap GET_PROJECT_LIST(String V_CLASS_CODE) throws SQLException {

        logger.info("begin GET_PROJECT_LIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTLIST" + "(:V_CLASS_CODE,:RET)}");
            cstmt.setString("V_CLASS_CODE", V_CLASS_CODE);
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
        logger.info("end GET_PROJECT_LIST");
        return result;
    }

    //获取定额预算费用表
    public HashMap GET_PROJ_BUDGET_ITEM_TABLE(String V_CLASS_CODE, String V_PROJ_CODE, String V_ITEM_CODE,
                                              String V_ITEM_DESC, String V_DINGE_CODE, String V_MACHINE_TYPE,
                                              String V_MACHINE_CODE, String V_MACHINE_DESC) throws SQLException {

        logger.info("begin GET_PROJ_BUDGET_ITEM_TABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJBUDGETITEMTABLE" + "(:V_CLASS_CODE,:V_PROJ_CODE," +
                    ":V_ITEM_CODE,:V_ITEM_DESC,:V_DINGE_CODE,:V_MACHINE_TYPE,:V_MACHINE_CODE,:V_MACHINE_DESC,:RET)}");
            cstmt.setString("V_CLASS_CODE", V_CLASS_CODE);
            cstmt.setString("V_PROJ_CODE", V_PROJ_CODE);
            cstmt.setString("V_ITEM_CODE", V_ITEM_CODE);
            cstmt.setString("V_ITEM_DESC", V_ITEM_DESC);
            cstmt.setString("V_DINGE_CODE", V_DINGE_CODE);
            cstmt.setString("V_MACHINE_TYPE", V_MACHINE_TYPE);
            cstmt.setString("V_MACHINE_CODE", V_MACHINE_CODE);
            cstmt.setString("V_MACHINE_DESC", V_MACHINE_DESC);
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

    //根据定额ID，获取项目预算详细信息
    public HashMap GET_PROJECT_BUDGET_ITEM_MESSAGE(String V_DINGE_ID) throws SQLException {

        logger.info("begin GET_PROJECT_BUDGET_ITEM_MESSAGE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTBUDGETITEMMESSAGE" + "(:V_DINGE_ID,:RET)}");
            cstmt.setString("V_DINGE_ID", V_DINGE_ID);
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
        logger.info("end GET_PROJECT_BUDGET_ITEM_MESSAGE");
        return result;
    }

    //根据定额ID，获取人工预算明细
    public HashMap GET_PROJECT_BUDGET_ITEM_PER_TABLE(String V_DINGE_ID) throws SQLException {

        logger.info("begin GET_PROJECT_BUDGET_ITEM_PER_TABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTBUDGETITEMPERTABLE" + "(:V_DINGE_ID,:RET)}");
            cstmt.setString("V_DINGE_ID", V_DINGE_ID);
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
        logger.info("end GET_PROJECT_BUDGET_ITEM_PER_TABLE");
        return result;
    }

    //根据定额ID，获取机械预算明细
    public HashMap GET_PROJECT_BUDGET_ITEM_JX_TABLE(String V_DINGE_ID) throws SQLException {

        logger.info("begin GET_PROJECT_BUDGET_ITEM_JX_TABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTBUDGETITEMJXTABLE" + "(:V_DINGE_ID,:RET)}");
            cstmt.setString("V_DINGE_ID", V_DINGE_ID);
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
        logger.info("end GET_PROJECT_BUDGET_ITEM_JX_TABLE");
        return result;
    }

    //根据定额ID，获取材料备件费用明细
    public HashMap GET_PROJECT_BUDGET_ITEM_MAT_TABLE(String V_DINGE_ID) throws SQLException {

        logger.info("begin GET_PROJECT_BUDGET_ITEM_MAT_TABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTBUDGETITEMMATTABLE" + "(:V_DINGE_ID,:RET)}");
            cstmt.setString("V_DINGE_ID", V_DINGE_ID);
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
        logger.info("end GET_PROJECT_BUDGET_ITEM_MAT_TABLE");
        return result;
    }

    //获取设备名称
    public HashMap GET_INST_EQU_LIST(String A_EQUTYPE, String A_PLANTCODE, String A_DEPARTCODE, String A_EQUIP_ID, String A_EQUIP_NAME) throws SQLException {

        logger.info("begin GET_INST_EQU_LIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.GETINSTEQULIST" + "(:A_EQUTYPE,:A_PLANTCODE,:A_DEPARTCODE,:A_EQUIP_ID,:A_EQUIP_NAME,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_EQUIP_NAME", A_EQUIP_NAME);
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
        logger.info("end GET_INST_EQU_LIST");
        return result;
    }

    //查询主机设备润滑油脂使用情况
    public HashMap GET_EQU_OIL_CONSUME_TABLE(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUTYPE, String A_EQUIP_ID, String A_BEGINDATE, String A_ENDDATE, String A_MAT_NO, String A_MAT_DESC) throws SQLException {

        logger.info("begin GET_EQU_OIL_CONSUME_TABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_EQUOILCONSUME_TABLE" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUTYPE,:A_EQUIP_ID,:A_BEGINDATE,:A_ENDDATE,:A_MAT_NO,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_BEGINDATE", A_BEGINDATE);
            cstmt.setString("A_ENDDATE", A_ENDDATE);
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
        logger.info("end GET_EQU_OIL_CONSUME_TABLE");
        return result;
    }

    //检修技术标准字典查询
    public HashMap PM_REPAIR_JS_STANDARD_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE, String V_V_EQUCHILDCODE) throws SQLException {

        logger.info("begin PM_REPAIR_JS_STANDARD_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REPAIR_JS_STANDARD_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_EQUCHILDCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIR_JS_STANDARD_SEL");
        return result;
    }

    //根据GUID，获取维修技术标准表数据
    public HashMap PM_REPAIR_JS_STANDARD_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_REPAIR_JS_STANDARD_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REPAIR_JS_STANDARD_GET" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIR_JS_STANDARD_GET");
        return result;
    }

    public HashMap PM_REAPIR_STANDARD_DATA_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_DATA_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_DATA_GET" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REAPIR_STANDARD_DATA_GET");
        return result;
    }

    //选择设备类型列表
    public HashMap GET_EQU_TYPE_LIST_ABLE() throws SQLException {

        logger.info("begin GET_EQU_TYPE_LIST_ABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETEQUTYPELIST_ABLE" + "(:RET)}");
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
        logger.info("end GET_EQU_TYPE_LIST_ABLE");
        return result;
    }

    //获取主机名称
    public HashMap GET_EQU_LIST(String A_EQUTYPE) throws SQLException {

        logger.info("begin GET_EQU_LIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GET_EQULIST" + "(:A_EQUTYPE,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
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
        logger.info("end GET_EQU_LIST");
        return result;
    }

    //获取部位表
    public HashMap GET_PART_LIST(String A_EQUIP_NO, String A_MAT_NO) throws SQLException {

        logger.info("begin GET_PART_LIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETPARTLIST" + "(:A_EQUIP_NO,:A_MAT_NO,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_MAT_NO", A_MAT_NO);
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
        logger.info("end GET_PART_LIST");
        return result;
    }

    //获取部位表
    public HashMap GET_EQU_PART_DRAW(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUTYPE, String A_EQUIP_NO, String A_PART_NO, String A_BEGINDATE, String A_ENDDATE) throws SQLException {

        logger.info("begin GET_EQU_PART_DRAW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_EQUPART_DRAW" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUTYPE,:A_EQUIP_NO,:A_PART_NO,:A_BEGINDATE,:A_ENDDATE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
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
        logger.info("end GET_EQU_PART_DRAW");
        return result;
    }

    //获取按油品单价统计使用情况
    public HashMap GET_OIL_PRICE_DRAW(String A_PLANTCODE, String A_DEPARTCODE, String A_BEGINDATE, String A_ENDDATE) throws SQLException {

        logger.info("begin GET_OIL_PRICE_DRAW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_OILPRICE_DRAW" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_BEGINDATE,:A_ENDDATE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
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
        logger.info("end GET_OIL_PRICE_DRAW");
        return result;
    }

    //获取按作业区统计使用情况
    public HashMap GET_DEPART_DRAW(String A_PLANTCODE, String A_BEGINDATE, String A_ENDDATE) throws SQLException {

        logger.info("begin GET_DEPART_DRAW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_DEPART_DRAW" + "(:A_PLANTCODE,:A_BEGINDATE,:A_ENDDATE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
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
        logger.info("end GET_DEPART_DRAW");
        return result;
    }

    //根据主机编号获取设备主机信息
    public HashMap GET_EQU_DETAIL(String A_EQUIP_NO) throws SQLException {

        logger.info("begin GET_EQU_DETAIL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETEQUDETAIL" + "(:A_EQUIP_NO,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
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
        logger.info("end GET_EQU_DETAIL");
        return result;
    }

    //获取部位详细信息
    public HashMap GET_PART_DETAIL(String A_PART_NO) throws SQLException {

        logger.info("begin GET_PART_DETAIL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETPARTDETAIL" + "(:A_PART_NO,:RET)}");
            cstmt.setString("A_PART_NO", A_PART_NO);
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
        logger.info("end GET_PART_DETAIL");
        return result;
    }

    //获取计算方式
    public HashMap GET_MATH_TYPE() throws SQLException {

        logger.info("begin GET_MATH_TYPE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETMATHTYPE" + "(:RET)}");
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
        logger.info("end GET_MATH_TYPE");
        return result;
    }

    //获取计量单位
    public HashMap GET_MATH_UNIT(String A_CYCLE_TYPE) throws SQLException {

        logger.info("begin GET_MATH_UNIT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETMATHUNIT" + "(:A_CYCLE_TYPE,:RET)}");
            cstmt.setString("A_CYCLE_TYPE", A_CYCLE_TYPE);
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
        logger.info("end GET_MATH_UNIT");
        return result;
    }

    //获取加油单位
    public HashMap GET_UNIT() throws SQLException {

        logger.info("begin GET_UNIT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETUNIT" + "(:RET)}");
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
        logger.info("end GET_UNIT");
        return result;
    }

    //获取原加油周期数据
    public HashMap GET_PART_OIL(String A_PART_NO) throws SQLException {

        logger.info("begin GET_PART_OIL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETPART_OIL" + "(:A_PART_NO,:RET)}");
            cstmt.setString("A_PART_NO", A_PART_NO);
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
        logger.info("end GET_PART_OIL");
        return result;
    }

    //获取部位表格
    public HashMap GET_PART_LIST_SELECT(String A_EQUIP_NO, String A_MAT_NO, String A_MAT_DESC, String A_PART_DESC) throws SQLException {

        logger.info("begin GET_PART_LIST_SELECT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETPARTLIST_SELECT" + "(:A_EQUIP_NO,:A_MAT_NO,:A_MAT_DESC,:A_PART_DESC,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.setString("A_PART_DESC", A_PART_DESC);
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
        logger.info("end GET_PART_LIST_SELECT");
        return result;
    }

    //获取更换情况
    public HashMap PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(String V_SITE_ID, String V_BEGINDATE, String V_ENDDATE) throws SQLException {

        logger.info("begin PRO_RUN_SITE_BJ_CHANGE_LOG_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_CHANGE_LOG_ALL" + "(:V_SITE_ID,:V_BEGINDATE,:V_ENDDATE,:RET)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_BEGINDATE", V_BEGINDATE);
            cstmt.setString("V_ENDDATE", V_ENDDATE);
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
        logger.info("end PRO_RUN_SITE_BJ_CHANGE_LOG_ALL");
        return result;
    }

    //检修厂矿
    public HashMap PRO_DJ501_MENDDEPT_USER(String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ501_MENDDEPT_USER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ501_MENDDEPT_USER" + "(:USERCODE_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ501_MENDDEPT_USER");
        return result;
    }

    //获取指派维修部门
    public HashMap PRO_DJ501_MENDDEPT_DEPT(String JXPLANTCODE_IN, String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ501_MENDDEPT_DEPT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ501_MENDDEPT_DEPT" + "(:JXPLANTCODE_IN,:USERCODE_IN,:RET)}");
            cstmt.setString("JXPLANTCODE_IN", JXPLANTCODE_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ501_MENDDEPT_DEPT");
        return result;
    }

    //查询接收检修申请工单
    public HashMap PRO_DJ501_SELECTAPPLYLIST_USER(String PLANTCODE_IN, String DEPARTCODE_IN, String DJCODE_IN, String DJNAME_IN, String JXPLANTCODE_IN, String RECFLAG_IN, String BEGINDATE_IN, String ENDDATE_IN) throws SQLException {

        logger.info("begin PRO_DJ501_SELECTAPPLYLIST_USER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ501_SELECTAPPLYLIST_USER" + "(:PLANTCODE_IN,:DEPARTCODE_IN,:DJCODE_IN,:DJNAME_IN,:JXPLANTCODE_IN,:RECFLAG_IN,:BEGINDATE_IN,:ENDDATE_IN,:RET)}");
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DJCODE_IN", DJCODE_IN);
            cstmt.setString("DJNAME_IN", DJNAME_IN);
            cstmt.setString("JXPLANTCODE_IN", JXPLANTCODE_IN);
            cstmt.setString("RECFLAG_IN", RECFLAG_IN);
            cstmt.setDate("BEGINDATE_IN", Date.valueOf(BEGINDATE_IN));
            cstmt.setDate("ENDDATE_IN", Date.valueOf(ENDDATE_IN));
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
        logger.info("end PRO_DJ501_SELECTAPPLYLIST_USER");
        return result;
    }

    //创建工单PM_1501060101-获取页面所需数据项
    public HashMap PRO_DJ401_APPLYMES(String APPLYID_IN) throws SQLException {

        logger.info("begin PRO_DJ401_APPLYMES");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYMES" + "(:APPLYID_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);
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
        logger.info("end PRO_DJ401_APPLYMES");
        return result;
    }

    //查询附带物料表
    public HashMap PRO_DJ401_APPLYMATLIST(String APPLYID_IN) throws SQLException {

        logger.info("begin PRO_DJ401_APPLYMATLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYMATLIST" + "(:APPLYID_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);
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
        logger.info("end PRO_DJ401_APPLYMATLIST");
        return result;
    }

    //查询检修单位
    public HashMap PRO_DJ601_MENDDEPT_DEPT_USER(String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_MENDDEPT_DEPT_USER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_MENDDEPT_DEPT_USER" + "(:USERCODE_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ601_MENDDEPT_DEPT_USER");
        return result;
    }

    //查询检修申请
    public HashMap PRO_DJ601_WAITAPPLYLIST(String PLANTCODE_IN, String DJ_UQ_CODE_IN, String DJ_NAME_IN, String ORDERID_IN, String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_WAITAPPLYLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_WAITAPPLYLIST" + "(:PLANTCODE_IN,:DJ_UQ_CODE_IN,:DJ_NAME_IN,:ORDERID_IN,:USERCODE_IN,:RET)}");
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ601_WAITAPPLYLIST");
        return result;
    }

    //查询待下达工单
    public HashMap PRO_DJ601_ORDERLIST_WAIT(String MENDDEPT_CODE_IN, String DJ_UQ_CODE_IN, String DJ_NAME_IN, String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERLIST_WAIT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERLIST_WAIT" + "(:MENDDEPT_CODE_IN,:DJ_UQ_CODE_IN,:DJ_NAME_IN,:USERCODE_IN,:RET)}");
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ601_ORDERLIST_WAIT");
        return result;
    }

    //查询维修标准主表
    public Map PM_REAPIR_STANDARD_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE,
                                           String V_V_EQUCODE, String V_V_REPAIR_NAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_DATA_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_DATA_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_REPAIR_NAME," +
                    ":V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIR_NAME", V_V_REPAIR_NAME);
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
        logger.info("end PM_REAPIR_STANDARD_DATA_SEL");
        return result;
    }

    //通过检修作业标准查询检修工序
    public HashMap PM_REAPIR_STANDARD_GX_SEL(String V_V_REPAIR_GUID) throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_GX_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_GX_SEL" + "(:V_V_REPAIR_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_REPAIR_GUID", V_V_REPAIR_GUID);
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
        logger.info("end PM_REAPIR_STANDARD_GX_SEL");
        return result;
    }



    //查询当前工序
    public HashMap PRO_DJ601_ORDERET(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERET" + "(:ORDERID_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
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
        logger.info("end PRO_DJ601_ORDERET");
        return result;
    }

    //查询所需物料表
    public HashMap PRO_DJ601_ORDERMAT(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERMAT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERMAT" + "(:ORDERID_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
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
        logger.info("end PRO_DJ601_ORDERMAT");
        return result;
    }

    //查询检修班组
    public HashMap PRO_DJ601_MENDDEPT_GROUP(String DEPTCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_MENDDEPT_GROUP");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_MENDDEPT_GROUP" + "(:DEPTCODE_IN,:RET)}");
            cstmt.setString("DEPTCODE_IN", DEPTCODE_IN);
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
        logger.info("end PRO_DJ601_MENDDEPT_GROUP");
        return result;
    }

    //根据检修班组编码，查询负责人
    public HashMap PRO_DJ601_PERSON(String MENDDEPT_CODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_PERSON");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_PERSON" + "(:MENDDEPT_CODE_IN,:RET)}");
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
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
        logger.info("end PRO_DJ601_PERSON");
        return result;
    }

    //查询前置工序
    public HashMap PRO_DJ601_PREORDERET(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_PREORDERET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_PREORDERET" + "(:ORDERID_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
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
        logger.info("end PRO_DJ601_PREORDERET");
        return result;
    }

    //查询检修过程模型表
    public HashMap PRO_DJ601_MODELDROPLIST() throws SQLException {

        logger.info("begin PRO_DJ601_MODELDROPLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_MODELDROPLIST" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_MODELDROPLIST");
        return result;
    }

    //查询模型工序表
    public HashMap PRO_DJ601_MODELET(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ601_MODELET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_MODELET" + "(:V_MODELCODE,:V_CURSOR)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_MODELET");
        return result;
    }

    //查询模型工序表
    public HashMap GETMATKC(String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON) throws SQLException {

        logger.info("begin GETMATKC");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ601.GETMATKC" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
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
        logger.info("end GETMATKC");
        return result;
    }

    //编辑工单PM_1501060102-获取当前工单信息
    public HashMap PRO_DJ601_ORDERMESSAGE(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERMESSAGE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERMESSAGE" + "(:ORDERID_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
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
        logger.info("end PRO_DJ601_ORDERMESSAGE");
        return result;
    }

    //工单过程管理PM_15010602-工单状态
    public HashMap PRO_DJ602_ORDERSTATUSLIST(String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ602_ORDERSTATUSLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ602_ORDERSTATUSLIST" + "(:USERCODE_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ602_ORDERSTATUSLIST");
        return result;
    }

    //工单过程管理PM_15010602-检修单位
    public HashMap PRO_DJ602_MENDDEPT_POWER(String USERCODE_IN, String ORDER_STATUS_IN) throws SQLException {

        logger.info("begin PRO_DJ602_MENDDEPT_POWER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ602_MENDDEPT_POWER" + "(:USERCODE_IN,:ORDER_STATUS_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("ORDER_STATUS_IN", ORDER_STATUS_IN);
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
        logger.info("end PRO_DJ602_MENDDEPT_POWER");
        return result;
    }

    //工单过程管理PM_15010602-查询工单
    public HashMap PRO_DJ602_ORDERLIST_POWER(String ORDER_STATUS_IN, String MENDDEPT_CODE_IN, String ORDERID_IN, String CSY_RESULT_IN) throws SQLException {

        logger.info("begin PRO_DJ602_ORDERLIST_POWER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ602_ORDERLIST_POWER" + "(:ORDER_STATUS_IN,:MENDDEPT_CODE_IN,:ORDERID_IN,:CSY_RESULT_IN,:RET)}");
            cstmt.setString("ORDER_STATUS_IN", ORDER_STATUS_IN);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("CSY_RESULT_IN", CSY_RESULT_IN);
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
        logger.info("end PRO_DJ602_ORDERLIST_POWER");
        return result;
    }

    //工序管理PM_1501060201-查询工序
    public HashMap PRO_DJ602_ETLIST(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ602_ETLIST");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ602_ETLIST" + "(:ORDERID_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
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
        logger.info("end PRO_DJ602_ETLIST");
        return result;
    }

    //试验信息管理PM_15010605-查询工单
    public HashMap GETORDERSY(String A_PLANTCODE, String A_MENDDEPT, String A_ORDERID) throws SQLException {

        logger.info("begin GETORDERSY");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ605.GETORDERSY" + "(:A_PLANTCODE,:A_MENDDEPT,:A_ORDERID,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_MENDDEPT", A_MENDDEPT);
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end GETORDERSY");
        return result;
    }

    //试验信息管理PM_15010605-获取试验详细结果
    public HashMap ORDERSYDETAIL(String A_ORDERID) throws SQLException {

        logger.info("begin ORDERSYDETAIL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ605.ORDERSYDETAIL" + "(:A_ORDERID,:RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end ORDERSYDETAIL");
        return result;
    }

    //新增设备主数据图纸
    public HashMap SAP_PM_EQU_FILE_SET(String V_V_EQUCODE, String V_V_FILENAME, String V_V_FILEURL, String V_V_EDIT_GUID) throws SQLException {

        logger.info("begin SAP_PM_EQU_FILE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_FILE_SET" + "(:V_V_EQUCODE,:V_V_FILENAME,:V_V_FILEURL,:V_V_EDIT_GUID,:V_INFO)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_FILEURL", V_V_FILEURL);
            cstmt.setString("V_V_EDIT_GUID", V_V_EDIT_GUID);
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
        logger.info("end SAP_PM_EQU_FILE_SET");
        return result;
    }

    //检修技术标准字典表编辑
    public HashMap PM_REPAIR_JS_STANDARD_EDIT(String V_V_FLAG,String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE,
                                              String V_V_EQUTYPECODE, String V_V_EQUCHILDCODE, String V_V_BJ_IMG, String V_V_PART_NUMBER,
                                              String V_V_PART_NAME, String V_V_PART_CODE, String V_V_MATERIAL, String V_V_IMGSIZE,
                                              String V_V_IMGGAP, String V_V_VALUE_DOWN,String V_V_VALUE_UP, String V_V_REPLACE_CYC, String V_V_WEIGHT,
                                              String V_V_IMGCODE, String V_V_CONTENT) throws SQLException {

        logger.info("begin PM_REPAIR_JS_STANDARD_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REPAIR_JS_STANDARD_EDIT" + "(:V_V_FLAG,:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCHILDCODE,:V_V_BJ_IMG,:V_V_PART_NUMBER,:V_V_PART_NAME,:V_V_PART_CODE,:V_V_MATERIAL,:V_V_IMGSIZE," +
                    ":V_V_IMGGAP,:V_V_VALUE_DOWN,:V_V_VALUE_UP,:V_V_REPLACE_CYC,:V_V_WEIGHT,:V_V_IMGCODE,:V_V_CONTENT,:V_INFO)}");
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.setString("V_V_BJ_IMG", V_V_BJ_IMG);
            cstmt.setString("V_V_PART_NUMBER", V_V_PART_NUMBER);
            cstmt.setString("V_V_PART_NAME", V_V_PART_NAME);
            cstmt.setString("V_V_PART_CODE", V_V_PART_CODE);
            cstmt.setString("V_V_MATERIAL", V_V_MATERIAL);
            cstmt.setString("V_V_IMGSIZE", V_V_IMGSIZE);
            cstmt.setString("V_V_IMGGAP", V_V_IMGGAP);
            cstmt.setString("V_V_VALUE_DOWN", V_V_VALUE_DOWN);
            cstmt.setString("V_V_VALUE_UP", V_V_VALUE_UP);
            cstmt.setString("V_V_REPLACE_CYC", V_V_REPLACE_CYC);
            cstmt.setString("V_V_WEIGHT", V_V_WEIGHT);
            cstmt.setString("V_V_IMGCODE", V_V_IMGCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
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
        logger.info("end PM_REPAIR_JS_STANDARD_EDIT");
        return result;
    }

    public HashMap PM_REAPIR_STANDARD_GX_SET(String V_V_GXCODE,String V_V_GXNAME, String V_V_CONTENT, String V_V_TIEM, String V_V_WORKTYPE,
                                             String V_V_WORKPER_NUM, String V_V_TOOL,String V_V_AQ,String V_V_XZ_DEPT,String V_V_INPER,
                                             String V_V_INTIME,int V_V_ORDER,String V_V_WORKWAY, String V_V_JSYQ,String V_V_REPAIR_CODE)
            throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_GX_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            //conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_GX_SET" + "(:V_V_GXCODE,:V_V_GXNAME,:V_V_CONTENT," +
                    ":V_V_TIEM,:V_V_WORKTYPE,:V_V_WORKPER_NUM,:V_V_TOOL,:V_V_AQ,:V_V_XZ_DEPT,:V_V_INPER,:V_V_INTIME,:V_V_ORDER," +
                    ":V_V_WORKWAY,:V_V_JSYQ,:V_V_REPAIR_CODE,:V_INFO)}");
            cstmt.setString("V_V_GXCODE", V_V_GXCODE);
            cstmt.setString("V_V_GXNAME", V_V_GXNAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_TIEM", V_V_TIEM);
            cstmt.setString("V_V_WORKTYPE", V_V_WORKTYPE);
            cstmt.setString("V_V_WORKPER_NUM", V_V_WORKPER_NUM);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_AQ", V_V_AQ);
            cstmt.setString("V_V_XZ_DEPT", V_V_XZ_DEPT);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
            cstmt.setInt("V_V_ORDER", V_V_ORDER);
            cstmt.setString("V_V_WORKWAY", V_V_WORKWAY);
            cstmt.setString("V_V_JSYQ", V_V_JSYQ);
            cstmt.setString("V_V_REPAIR_CODE", V_V_REPAIR_CODE);
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
        logger.info("end PM_REAPIR_STANDARD_GX_SET");
        return result;
    }

    public HashMap PM_REAPIR_STANDARD_DATA_SET(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE,String V_V_EQUNAME,String V_V_PROJECT_IMG,
                                               String V_V_WORK_BEFORE,String V_V_WORK_PER,String V_V_WORK_CRAFT,String V_V_WORK_TOOL,
                                               String V_V_WORK_TIME, String V_V_SUM_TIME, String V_V_WORK_AQ, String V_V_WORK_DEPT,String V_V_REPAIR_NAME
    ) throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_DATA_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_DATA_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_PROJECT_IMG," +
                    ":V_V_WORK_BEFORE,:V_V_WORK_PER,:V_V_WORK_CRAFT,:V_V_WORK_TOOL,:V_V_WORK_TIME,:V_V_SUM_TIME,:V_V_WORK_AQ,:V_V_WORK_DEPT,:V_V_REPAIR_NAME," +
                    ":V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_PROJECT_IMG", V_V_PROJECT_IMG);
            cstmt.setString("V_V_WORK_BEFORE", V_V_WORK_BEFORE);
            cstmt.setString("V_V_WORK_PER", V_V_WORK_PER);
            cstmt.setString("V_V_WORK_CRAFT", V_V_WORK_CRAFT);
            cstmt.setString("V_V_WORK_TOOL", V_V_WORK_TOOL);
            cstmt.setString("V_V_WORK_TIME", V_V_WORK_TIME);
            cstmt.setString("V_V_SUM_TIME", V_V_SUM_TIME);
            cstmt.setString("V_V_WORK_AQ", V_V_WORK_AQ);
            cstmt.setString("V_V_WORK_DEPT", V_V_WORK_DEPT);
            cstmt.setString("V_V_REPAIR_NAME", V_V_REPAIR_NAME);
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
        logger.info("end PM_REAPIR_STANDARD_DATA_SET");
        return result;
    }

    //上传过程
    public HashMap PM_REPAIRT_IMG_INSERT(String V_V_GUID, String V_V_FILEGUID, String V_V_FILENAME, String V_V_FILETYPE, InputStream V_V_FILE, String V_V_INPER) throws SQLException {

        logger.info("begin PM_REPAIRT_IMG_INSERT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIRT_IMG_INSERT" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_FILETYPE,:V_V_FILE,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setBlob("V_V_FILE", V_V_FILE);
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
        logger.info("end PM_REPAIRT_IMG_INSERT");
        return result;
    }

    //获取图片过程
    public HashMap PM_REPAIRT_IMG_SEL(String V_V_GUID, String V_V_FILEGUID, String V_V_FILETYPE) throws SQLException {

        logger.info("begin PM_REPAIRT_IMG_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REPAIRT_IMG_SEL" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILETYPE,:V_FILEBLOB,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.registerOutParameter("V_FILEBLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Blob blob = (Blob) cstmt.getObject("V_FILEBLOB");

            result.put("V_FILEBLOB", blob);
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIRT_IMG_SEL");
        return result;
    }

    //新增规范
    public HashMap ADD_EQU(String A_EQUTYPE, String A_EQUIP_NO, String A_EQUIP_NAME, String A_REMARK, String A_EQU_LEVEL) throws SQLException {

        logger.info("begin ADD_EQU");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.ADDEQU" + "(:A_EQUTYPE,:A_EQUIP_NO,:A_EQUIP_NAME,:A_REMARK,:A_EQU_LEVEL,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_EQUIP_NAME", A_EQUIP_NAME);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_EQU_LEVEL", A_EQU_LEVEL);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADD_EQU");
        return result;
    }

    //新增部位
    public HashMap ADD_PART(String A_PART_NO, String A_PART_DESC, String A_EQUIP_NO, String A_WORK_DESC, String A_OIL_TYPE,
                            String A_OIL_ETALON, String A_OIL_QS, String A_PART_REMARK, String A_DESIGN_OIL_CODE, String A_SUMMER_OIL_CODE,
                            String A_WINTER_OIL_CODE, String A_CURRENT_OIL_CODE, String A_USERID, String A_IP, String A_PART_LEVEL) throws SQLException {

        logger.info("begin ADD_PART");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.ADDPART" + "(:A_PART_NO,:A_PART_DESC,:A_EQUIP_NO,:A_WORK_DESC,:A_OIL_TYPE," +
                    ":A_OIL_ETALON,:A_OIL_QS,:A_PART_REMARK,:A_DESIGN_OIL_CODE,:A_SUMMER_OIL_CODE,:A_WINTER_OIL_CODE,:A_CURRENT_OIL_CODE," +
                    ":A_USERID,:A_IP,:A_PART_LEVEL,:RET_MSG,:RET)}");
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_PART_DESC", A_PART_DESC);
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_WORK_DESC", A_WORK_DESC);
            cstmt.setString("A_OIL_TYPE", A_OIL_TYPE);
            cstmt.setString("A_OIL_ETALON", A_OIL_ETALON);
            cstmt.setString("A_OIL_QS", A_OIL_QS);
            cstmt.setString("A_PART_REMARK", A_PART_REMARK);
            cstmt.setString("A_DESIGN_OIL_CODE", A_DESIGN_OIL_CODE);
            cstmt.setString("A_SUMMER_OIL_CODE", A_SUMMER_OIL_CODE);
            cstmt.setString("A_WINTER_OIL_CODE", A_WINTER_OIL_CODE);
            cstmt.setString("A_CURRENT_OIL_CODE", A_CURRENT_OIL_CODE);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_IP", A_IP);
            cstmt.setString("A_PART_LEVEL", A_PART_LEVEL);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADD_PART");
        return result;
    }

    /**
     * 创建工单PM_1501060101-新增工单
     *
     * @param DJ_UQ_CODE_IN      电机编号
     * @param DJ_NAME_IN         电机名称
     * @param APPLY_ID_IN        申请ID
     * @param MEND_CONTEXT_IN    检修内容
     * @param PLAN_BEGINDATE_IN  计划开始时间
     * @param PLAN_ENDDATE_IN    计划结束时间
     * @param MENDDEPT_CODE_IN   检修班组编码
     * @param MEND_USERID_IN     负责人ID
     * @param MEND_USERNAME_IN   负责人名
     * @param INSERT_USERID_IN   录入人ID
     * @param INSERT_USERNAME_IN 录入人名
     * @param ORDERID_IN         工单号
     * @param PLAN_TIME_IN       计划工期
     * @param DJ_TYPE_IN         电机规格型号
     * @param PICCODE_IN         图样
     * @param OP_PERSON_IN       经办人
     * @param PHONE_NUMBER_IN    联系电话
     * @param USE_LOC_IN         使用地点
     * @param REQ_TIME_IN        要求工期
     * @param BUILD_REMARK_IN    施工项目及说明
     * @param CHECK_LOG_IN       检查试验记录：
     * @param DJ_VOL_IN          容量
     * @param DJ_V_IN            电压
     * @param MEND_TYPE_IN       维修类型
     * @return
     * @throws java.sql.SQLException
     */

    public HashMap PRO_DJ601_SAVEORDER(String DJ_UQ_CODE_IN, String DJ_NAME_IN, String APPLY_ID_IN, String MEND_CONTEXT_IN,
                                       java.util.Date PLAN_BEGINDATE_IN, java.util.Date PLAN_ENDDATE_IN, String MENDDEPT_CODE_IN,
                                       String MEND_USERID_IN, String MEND_USERNAME_IN, String INSERT_USERID_IN, String INSERT_USERNAME_IN,
                                       String ORDERID_IN, String PLAN_TIME_IN, String DJ_TYPE_IN, String PICCODE_IN, String OP_PERSON_IN,
                                       String PHONE_NUMBER_IN, String USE_LOC_IN, String REQ_TIME_IN, String BUILD_REMARK_IN,
                                       String CHECK_LOG_IN, String DJ_VOL_IN, String DJ_V_IN, String MEND_TYPE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_SAVEORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        Date sqlDate1 = new Date(PLAN_BEGINDATE_IN.getTime());
        Date sqlDate2 = new Date(PLAN_ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_SAVEORDER" + "(:DJ_UQ_CODE_IN,:DJ_NAME_IN,:APPLY_ID_IN,:MEND_CONTEXT_IN,:PLAN_BEGINDATE_IN," +
                    ":PLAN_ENDDATE_IN,:MENDDEPT_CODE_IN,:MEND_USERID_IN,:MEND_USERNAME_IN,:INSERT_USERID_IN,:INSERT_USERNAME_IN,:ORDERID_IN," +
                    ":PLAN_TIME_IN,:DJ_TYPE_IN,:PICCODE_IN,:OP_PERSON_IN,:PHONE_NUMBER_IN,:USE_LOC_IN,:REQ_TIME_IN,:BUILD_REMARK_IN,:CHECK_LOG_IN," +
                    ":DJ_VOL_IN,:DJ_V_IN,:MEND_TYPE_IN,:RET)}");
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.setString("APPLY_ID_IN", APPLY_ID_IN);
            cstmt.setString("MEND_CONTEXT_IN", MEND_CONTEXT_IN);
            cstmt.setDate("PLAN_BEGINDATE_IN", sqlDate1);
            cstmt.setDate("PLAN_ENDDATE_IN", sqlDate2);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("MEND_USERID_IN", MEND_USERID_IN);
            cstmt.setString("MEND_USERNAME_IN", MEND_USERNAME_IN);
            cstmt.setString("INSERT_USERID_IN", INSERT_USERID_IN);
            cstmt.setString("INSERT_USERNAME_IN", INSERT_USERNAME_IN);
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("PLAN_TIME_IN", PLAN_TIME_IN);
            cstmt.setString("DJ_TYPE_IN", DJ_TYPE_IN);
            cstmt.setString("PICCODE_IN", PICCODE_IN);
            cstmt.setString("OP_PERSON_IN", OP_PERSON_IN);
            cstmt.setString("PHONE_NUMBER_IN", PHONE_NUMBER_IN);
            cstmt.setString("USE_LOC_IN", USE_LOC_IN);
            cstmt.setString("REQ_TIME_IN", REQ_TIME_IN);
            cstmt.setString("BUILD_REMARK_IN", BUILD_REMARK_IN);
            cstmt.setString("CHECK_LOG_IN", CHECK_LOG_IN);
            cstmt.setString("DJ_VOL_IN", DJ_VOL_IN);
            cstmt.setString("DJ_V_IN", DJ_V_IN);
            cstmt.setString("MEND_TYPE_IN", MEND_TYPE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_SAVEORDER");
        return result;
    }

    //新增规范
    public HashMap PRO_DJ601_SAVEORDERET(String ORDERID_IN, Double PLAN_WORKTIME_IN, Double PLAN_PERSON_IN,
                                         String ET_CONTEXT_IN, String PRE_ET_IN, String INSERT_USERID_IN,
                                         String INSERT_USERNAME_IN) throws SQLException {

        logger.info("begin PRO_DJ601_SAVEORDERET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_SAVEORDERET" + "(:ORDERID_IN,:PLAN_WORKTIME_IN,:PLAN_PERSON_IN," +
                    ":ET_CONTEXT_IN,:PRE_ET_IN,:INSERT_USERID_IN,:INSERT_USERNAME_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setDouble("PLAN_WORKTIME_IN", PLAN_WORKTIME_IN);
            cstmt.setDouble("PLAN_PERSON_IN", PLAN_PERSON_IN);
            cstmt.setString("ET_CONTEXT_IN", ET_CONTEXT_IN);
            cstmt.setString("PRE_ET_IN", PRE_ET_IN);
            cstmt.setString("INSERT_USERID_IN", INSERT_USERID_IN);
            cstmt.setString("INSERT_USERNAME_IN", INSERT_USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_SAVEORDERET");
        return result;
    }

    //新增物料
    public HashMap PRO_DJ601_SAVEORDERMAT(String ORDERID_IN, String MATERIALCODE_IN, String MATERIALNAME_IN, String ETALON_IN,
                                          String MAT_CL_IN, Double F_PRICE_IN, Double PLAN_AMOUNT_IN, String USERCODE_IN,
                                          String USERNAME_IN, String KCID_IN, String UNIT_IN) throws SQLException {

        logger.info("begin PRO_DJ601_SAVEORDERMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_SAVEORDERMAT" + "(:ORDERID_IN,:MATERIALCODE_IN,:MATERIALNAME_IN," +
                    ":ETALON_IN,:MAT_CL_IN,:F_PRICE_IN,:PLAN_AMOUNT_IN,:USERCODE_IN,:USERNAME_IN,:KCID_IN,:UNIT_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("MATERIALCODE_IN", MATERIALCODE_IN);
            cstmt.setString("MATERIALNAME_IN", MATERIALNAME_IN);
            cstmt.setString("ETALON_IN", ETALON_IN);
            cstmt.setString("MAT_CL_IN", MAT_CL_IN);
            cstmt.setDouble("F_PRICE_IN", F_PRICE_IN);
            cstmt.setDouble("PLAN_AMOUNT_IN", PLAN_AMOUNT_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("KCID_IN", KCID_IN);
            cstmt.setString("UNIT_IN", UNIT_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_SAVEORDERMAT");
        return result;
    }

    //物料消耗管理PM_1501060202-追加物料-保存
    public HashMap PRO_DJ602_ADDMAT(String ORDERID_IN, String MATERIALCODE_IN, String MATERIALNAME_IN, String ETALON_IN,
                                    String MAT_CL_IN, Double F_PRICE_IN, Double ACT_AMOUNT_IN) throws SQLException {

        logger.info("begin PRO_DJ602_ADDMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ602_ADDMAT" + "(:ORDERID_IN,:MATERIALCODE_IN,:MATERIALNAME_IN,:ETALON_IN," +
                    ":MAT_CL_IN,:F_PRICE_IN,:ACT_AMOUNT_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("MATERIALCODE_IN", MATERIALCODE_IN);
            cstmt.setString("MATERIALNAME_IN", MATERIALNAME_IN);
            cstmt.setString("ETALON_IN", ETALON_IN);
            cstmt.setString("MAT_CL_IN", MAT_CL_IN);
            cstmt.setDouble("F_PRICE_IN", F_PRICE_IN);
            cstmt.setDouble("ACT_AMOUNT_IN", ACT_AMOUNT_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ602_ADDMAT");
        return result;
    }

    //物料消耗管理PM_1501060202-录入实际数量-确认
    public HashMap PRO_DJ602_CONFIRMMAT(String ID_IN, Double ACT_AMOUNT_IN) throws SQLException {

        logger.info("begin PRO_DJ602_CONFIRMMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ602_CONFIRMMAT" + "(:ID_IN,:ACT_AMOUNT_IN,:RET)}");
            cstmt.setString("ID_IN", ID_IN);
            cstmt.setDouble("ACT_AMOUNT_IN", ACT_AMOUNT_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ602_CONFIRMMAT");
        return result;
    }

    //物料消耗管理PM_1501060202-追加物料-保存
    public HashMap SAVEORDERSY(String A_ORDERID, String A_BCSY_RESULT, String A_BCSY_RESULT_DESC, String A_ZBCSY_RESULT,
                               String A_ZBCSY_RESULT_DESC, String A_DBCSY_RESULT, String A_DBCSY_RESULT_DESC,
                               String A_CSY_RESULT, String A_CSY_RESULT_DESC, String A_USERID, String A_USERNAME,
                               java.util.Date A_SY_DATE) throws SQLException {

        logger.info("begin SAVEORDERSY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        Date sqlDate1 = new Date(A_SY_DATE.getTime());

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ605.SAVEORDERSY" + "(:A_ORDERID,:A_BCSY_RESULT,:A_BCSY_RESULT_DESC,:A_ZBCSY_RESULT," +
                    ":A_ZBCSY_RESULT_DESC,:A_DBCSY_RESULT,:A_DBCSY_RESULT_DESC,:A_CSY_RESULT,:A_CSY_RESULT_DESC,:A_USERID," +
                    ":A_USERNAME,:A_SY_DATE,:RET_MSG,:RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_BCSY_RESULT", A_BCSY_RESULT);
            cstmt.setString("A_BCSY_RESULT_DESC", A_BCSY_RESULT_DESC);
            cstmt.setString("A_ZBCSY_RESULT", A_ZBCSY_RESULT);
            cstmt.setString("A_ZBCSY_RESULT_DESC", A_ZBCSY_RESULT_DESC);
            cstmt.setString("A_DBCSY_RESULT", A_DBCSY_RESULT);
            cstmt.setString("A_DBCSY_RESULT_DESC", A_DBCSY_RESULT_DESC);
            cstmt.setString("A_CSY_RESULT", A_CSY_RESULT);
            cstmt.setString("A_CSY_RESULT_DESC", A_CSY_RESULT_DESC);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setDate("A_SY_DATE", sqlDate1);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVEORDERSY");
        return result;
    }

    //录入PM_1501060501-上传
    public HashMap FILEUPDATE(String A_ORDERID, String A_FILENAME, String A_FILE_EXTEND, InputStream A_FILE, String A_USERNAME) throws SQLException {

        logger.info("begin FILEUPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ605.FILEUPDATE" + "(:A_ORDERID,:A_FILENAME,:A_FILE_EXTEND,:A_FILE,:A_USERNAME,:RET_MSG,:RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_FILENAME", A_FILENAME);
            cstmt.setString("A_FILE_EXTEND", A_FILE_EXTEND);
            cstmt.setBlob("A_FILE", A_FILE);
            cstmt.setString("A_USERNAME", A_USERNAME);
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
        logger.info("end FILEUPDATE");
        return result;
    }

    //修改规范
    public HashMap UPDATE_EQU(String A_EQUIP_NO, String A_EQUIP_NAME, String A_EQUTYPE, String A_REMARK, String A_EQU_LEVEL) throws SQLException {

        logger.info("begin UPDATE_EQU");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.UPDATEEQU" + "(:A_EQUIP_NO,:A_EQUIP_NAME,:A_EQUTYPE,:A_REMARK,:A_EQU_LEVEL,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_EQUIP_NAME", A_EQUIP_NAME);
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_EQU_LEVEL", A_EQU_LEVEL);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end UPDATE_EQU");
        return result;
    }

    //修改部位
    public HashMap UPDATE_PART(String A_PART_NO, String A_PART_DESC, String A_EQUIP_NO, String A_WORK_DESC, String A_OIL_TYPE,
                               String A_OIL_ETALON, String A_OIL_QS, String A_PART_REMARK, String A_DESIGN_OIL_CODE, String A_SUMMER_OIL_CODE,
                               String A_WINTER_OIL_CODE, String A_CURRENT_OIL_CODE, String A_USERID, String A_IP, String A_PART_LEVEL) throws SQLException {

        logger.info("begin UPDATE_PART");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.UPDATEPART" + "(:A_PART_NO,:A_PART_DESC,:A_EQUIP_NO,:A_WORK_DESC,:A_OIL_TYPE," +
                    ":A_OIL_ETALON,:A_OIL_QS,:A_PART_REMARK,:A_DESIGN_OIL_CODE,:A_SUMMER_OIL_CODE,:A_WINTER_OIL_CODE,:A_CURRENT_OIL_CODE," +
                    ":A_USERID,:A_IP,:A_PART_LEVEL,:RET_MSG,:RET)}");
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_PART_DESC", A_PART_DESC);
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_WORK_DESC", A_WORK_DESC);
            cstmt.setString("A_OIL_TYPE", A_OIL_TYPE);
            cstmt.setString("A_OIL_ETALON", A_OIL_ETALON);
            cstmt.setString("A_OIL_QS", A_OIL_QS);
            cstmt.setString("A_PART_REMARK", A_PART_REMARK);
            cstmt.setString("A_DESIGN_OIL_CODE", A_DESIGN_OIL_CODE);
            cstmt.setString("A_SUMMER_OIL_CODE", A_SUMMER_OIL_CODE);
            cstmt.setString("A_WINTER_OIL_CODE", A_WINTER_OIL_CODE);
            cstmt.setString("A_CURRENT_OIL_CODE", A_CURRENT_OIL_CODE);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_IP", A_IP);
            cstmt.setString("A_PART_LEVEL", A_PART_LEVEL);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end UPDATE_PART");
        return result;
    }

    //设置加油周期
    public HashMap SET_PART_OIL(String A_EQUIP_NO, String A_PART_NO, String A_CYCLE_TYPE, String A_CYCLE_UNIT, Double A_CYCLE_VALUE, Double A_INSERT_AMOUNT, String A_INSERT_UNIT) throws SQLException {

        logger.info("begin UPDATE_EQU");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.SETPART_OIL" + "(:A_EQUIP_NO,:A_PART_NO,:A_CYCLE_TYPE,:A_CYCLE_UNIT,:A_CYCLE_VALUE,:A_INSERT_AMOUNT,:A_INSERT_UNIT,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_CYCLE_TYPE", A_CYCLE_TYPE);
            cstmt.setString("A_CYCLE_UNIT", A_CYCLE_UNIT);
            cstmt.setDouble("A_CYCLE_VALUE", A_CYCLE_VALUE);
            cstmt.setDouble("A_INSERT_AMOUNT", A_INSERT_AMOUNT);
            cstmt.setString("A_INSERT_UNIT", A_INSERT_UNIT);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end UPDATE_EQU");
        return result;
    }

    //接收检修申请工单
    public HashMap PRO_DJ501_RECAPPLY(String APPLYID_IN, String USERCODE_IN, String USERNAME_IN, String JXCLASSCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ501_RECAPPLY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ501_RECAPPLY" + "(:APPLYID_IN,:USERCODE_IN,:USERNAME_IN,:JXCLASSCODE_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("JXCLASSCODE_IN", JXCLASSCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ501_RECAPPLY");
        return result;
    }

    //设置检修编号
    public HashMap SAVEMENDCODE(String A_APPLYID, String A_MENDCODE) throws SQLException {

        logger.info("begin SAVEMENDCODE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ501.SAVEMENDCODEC" + "(:A_APPLYID,:A_MENDCODE,:RET_MSG,:RET)}");
            cstmt.setString("A_APPLYID", A_APPLYID);
            cstmt.setString("A_MENDCODE", A_MENDCODE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVEMENDCODE");
        return result;
    }

    //下达工单
    public HashMap PRO_DJ601_ORDER_DOWNLOAD(String ORDERID_IN, String USERCODE_IN, String USERNAME_IN) throws SQLException {

        logger.info("begin PRO_DJ601_ORDER_DOWNLOAD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDER_DOWNLOAD" + "(:ORDERID_IN,:USERCODE_IN,:USERNAME_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_ORDER_DOWNLOAD");
        return result;
    }

    /**
     * 编辑工单PM_1501060102-保存工单
     *
     * @param ORDERID_IN         工单号
     * @param MEND_CONTEXT_IN    检修内容
     * @param PLAN_BEGINDATE_IN  计划开始时间
     * @param PLAN_ENDDATE_IN    计划结束时间
     * @param MENDDEPT_CODE_IN   检修班组编码
     * @param INSERT_USERID_IN   录入人ID
     * @param INSERT_USERNAME_IN 录入人名
     * @param PLAN_TIME_IN       计划工期
     * @param DJ_TYPE_IN         电机规格型号
     * @param PICCODE_IN         图样
     * @param OP_PERSON_IN       经办人
     * @param PHONE_NUMBER_IN    联系电话
     * @param USE_LOC_IN         使用地点
     * @param REQ_TIME_IN        要求工期
     * @param BUILD_REMARK_IN    施工项目及说明
     * @param CHECK_LOG_IN       检查试验记录：
     * @param DJ_VOL_IN          容量
     * @param DJ_V_IN            电压
     * @param MEND_TYPE_IN       维修类型
     * @return
     * @throws java.sql.SQLException
     */

    public HashMap PRO_DJ601_UPDATEORDER(String ORDERID_IN, String MEND_CONTEXT_IN, java.util.Date PLAN_BEGINDATE_IN,
                                         java.util.Date PLAN_ENDDATE_IN, String MENDDEPT_CODE_IN, String INSERT_USERID_IN,
                                         String INSERT_USERNAME_IN, String PLAN_TIME_IN, String DJ_TYPE_IN, String PICCODE_IN,
                                         String OP_PERSON_IN, String PHONE_NUMBER_IN, String USE_LOC_IN, String REQ_TIME_IN,
                                         String BUILD_REMARK_IN, String CHECK_LOG_IN, String DJ_VOL_IN, String DJ_V_IN,
                                         String MEND_TYPE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_UPDATEORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        Date sqlDate1 = new Date(PLAN_BEGINDATE_IN.getTime());
        Date sqlDate2 = new Date(PLAN_ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_UPDATEORDER" + "(:ORDERID_IN,:MEND_CONTEXT_IN,:PLAN_BEGINDATE_IN," +
                    ":PLAN_ENDDATE_IN,:MENDDEPT_CODE_IN,:INSERT_USERID_IN,:INSERT_USERNAME_IN,:PLAN_TIME_IN,:DJ_TYPE_IN," +
                    ":PICCODE_IN,:OP_PERSON_IN,:PHONE_NUMBER_IN,:USE_LOC_IN,:REQ_TIME_IN,:BUILD_REMARK_IN,:CHECK_LOG_IN," +
                    ":DJ_VOL_IN,:DJ_V_IN,:MEND_TYPE_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("MEND_CONTEXT_IN", MEND_CONTEXT_IN);
            cstmt.setDate("PLAN_BEGINDATE_IN", sqlDate1);
            cstmt.setDate("PLAN_ENDDATE_IN", sqlDate2);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("INSERT_USERID_IN", INSERT_USERID_IN);
            cstmt.setString("INSERT_USERNAME_IN", INSERT_USERNAME_IN);
            cstmt.setString("PLAN_TIME_IN", PLAN_TIME_IN);
            cstmt.setString("DJ_TYPE_IN", DJ_TYPE_IN);
            cstmt.setString("PICCODE_IN", PICCODE_IN);
            cstmt.setString("OP_PERSON_IN", OP_PERSON_IN);
            cstmt.setString("PHONE_NUMBER_IN", PHONE_NUMBER_IN);
            cstmt.setString("USE_LOC_IN", USE_LOC_IN);
            cstmt.setString("REQ_TIME_IN", REQ_TIME_IN);
            cstmt.setString("BUILD_REMARK_IN", BUILD_REMARK_IN);
            cstmt.setString("CHECK_LOG_IN", CHECK_LOG_IN);
            cstmt.setString("DJ_VOL_IN", DJ_VOL_IN);
            cstmt.setString("DJ_V_IN", DJ_V_IN);
            cstmt.setString("MEND_TYPE_IN", MEND_TYPE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_UPDATEORDER");
        return result;
    }

    //工序管理PM_1501060201-完成工序-确认
    public HashMap PRO_DJ602_FINISHET(String ORDERID_IN, String ET_ID_IN, String ACT_PERSON_IN, String ACT_WORKTIME_IN,
                                      String INSERT_USERID_IN, String INSERT_USERNAME_IN) throws SQLException {

        logger.info("begin PRO_DJ602_FINISHET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ602_FINISHET" + "(:ORDERID_IN,:ET_ID_IN,:ACT_PERSON_IN,:ACT_WORKTIME_IN," +
                    ":INSERT_USERID_IN,:INSERT_USERNAME_IN,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("ET_ID_IN", ET_ID_IN);
            cstmt.setString("ACT_PERSON_IN", ACT_PERSON_IN);
            cstmt.setString("ACT_WORKTIME_IN", ACT_WORKTIME_IN);
            cstmt.setString("INSERT_USERID_IN", INSERT_USERID_IN);
            cstmt.setString("INSERT_USERNAME_IN", INSERT_USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ602_FINISHET");
        return result;
    }

    //工单过程管理PM_15010602-完成工单
    public HashMap PRO_DJ602_OVER(String ORDERID_IN, String USERID_IN, String USERNAME_IN, String REMARK_IN) throws SQLException {

        logger.info("begin PRO_DJ602_OVER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ602_OVER" + "(:ORDERID_IN,:USERID_IN,:USERNAME_IN,:REMARK_IN,:RET_MSG,:RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("USERID_IN", USERID_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("REMARK_IN", REMARK_IN);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ602_OVER");
        return result;
    }

    //工单过程管理PM_15010602-退回到上一步
    public HashMap ROLLBACKTOPRESTEP(String A_ORDERID, String A_USERID, String A_USERNAME) throws SQLException {

        logger.info("begin ROLLBACKTOPRESTEP");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ602.ROLLBACKTOPRESTEP" + "(:A_ORDERID,:A_USERID,:A_USERNAME,:RET_MSG,:RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ROLLBACKTOPRESTEP");
        return result;
    }

    //删除设备主数据图纸
    public HashMap SAP_PM_EQU_FILE_DEL(String V_V_EDIT_GUID) throws SQLException {

        logger.info("begin SAP_PM_EQU_FILE_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_FILE_DEL" + "(:V_V_EDIT_GUID,:V_INFO)}");
            cstmt.setString("V_V_EDIT_GUID", V_V_EDIT_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAP_PM_EQU_FILE_DEL");
        return result;
    }

    //检修技术标准字典表删除
    public HashMap PM_REPAIR_JS_STANDARD_DEL(String V_V_GUID) throws SQLException {

        logger.info("begin PM_REPAIR_JS_STANDARD_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIR_JS_STANDARD_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIR_JS_STANDARD_DEL");
        return result;
    }

    public HashMap PM_REAPIR_STANDARD_DATA_DEL(String V_V_GUID) throws SQLException {

        logger.info("begin PM_REAPIR_STANDARD_DATA_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REAPIR_STANDARD_DATA_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REAPIR_STANDARD_DATA_DEL");
        return result;
    }

    //根据附件GUID删除附件
    public HashMap PM_REPAIRT_IMG_DEL(String V_V_FIELGUID) throws SQLException {

        logger.info("begin PM_REPAIRT_IMG_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIRT_IMG_DEL" + "(:V_V_FIELGUID,:V_INFO)}");
            cstmt.setString("V_V_FIELGUID", V_V_FIELGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIRT_IMG_DEL");
        return result;
    }

    //根据四项标准唯一标识GUID，删除附件
    public HashMap PM_REPAIRT_IMG_GUID_DEL(String V_V_GUID) throws SQLException {

        logger.info("begin PM_REPAIRT_IMG_GUID_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIRT_IMG_GUID_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIRT_IMG_GUID_DEL");
        return result;
    }

    //删除设备规范
    public HashMap DELETE_EQU(String A_EQUIP_NO) throws SQLException {

        logger.info("begin DELETE_EQU");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.DELETEEQU" + "(:A_EQUIP_NO,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
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
        logger.info("end DELETE_EQU");
        return result;
    }

    //删除部位
    public HashMap DELETE_PART(String A_PART_NO, String A_USERID, String A_IP) throws SQLException {

        logger.info("begin DELETE_PART");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL11.DELETEPART" + "(:A_PART_NO,:A_USERID,:A_IP,:RET_MSG,:RET)}");
            cstmt.setString("A_PART_NO", A_PART_NO);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_IP", A_IP);
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
        logger.info("end DELETE_PART");
        return result;
    }

    //删除工序
    public HashMap PRO_DJ601_DELETEET(String ET_ID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_DELETEET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_DELETEET" + "(:ET_ID_IN,:RET)}");
            cstmt.setString("ET_ID_IN", ET_ID_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_DELETEET");
        return result;
    }

    //删除物料
    public HashMap PRO_DJ601_DELETEMAT(String ID_IN) throws SQLException {

        logger.info("begin PRO_DJ601_DELETEMAT");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_DELETEMAT" + "(:ID_IN,:RET)}");
            cstmt.setString("ID_IN", ID_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_DELETEMAT");
        return result;
    }

    //录入PM_1501060501-文件删除
    public HashMap FILEDELETE(String A_FILEID) throws SQLException {

        logger.info("begin FILEDELETE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ605.FILEDELETE" + "(:A_FILEID,:RET_MSG,:RET)}");
            cstmt.setString("A_FILEID", A_FILEID);
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
        logger.info("end FILEDELETE");
        return result;
    }
}
