package org.building.pm.webservice;

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
 * Created by zjh on 2018/2/12.
 */
@Service
public class OldRepairService {

    private static final Logger logger = Logger.getLogger(OldRepairService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource nammDataSource;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

        int colNum = rsm.getColumnCount();

        while (rs.next()) {
            HashMap model = new HashMap();
            for (int i = 1; i <= rsm.getColumnCount(); i++) {
                if (rsm.getColumnType(i) == 91) {
                    model.put(rsm.getColumnName(i), rs.getString(i) == null ? "" : rs.getString(i).split("\\.")[0]);
                } else {
                    if (rsm.getColumnType(i) == 2) {
                        if (rs.getString(i) == null) {
                            model.put(rsm.getColumnName(i), "");
                        } else {
                            model.put(rsm.getColumnName(i), rs.getDouble(i));
                        }
                    } else {
                        model.put(rsm.getColumnName(i), rs.getString(i) == null ? "" : rs.getString(i).toString().replaceAll("\\n", ""));
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }

    public Map getJunkWaitMendStoreList(String V_V_SAP_PLANTCODE, String V_V_SAP_DEPARTCODE)throws SQLException {
        logger.info("begin GETJUNKWAITMENDSTORELIST");
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = nammDataSource.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_MM_JUNK_INTERFACE.GETJUNKWAITMENDSTORELIST(:V_SAP_PLANTCODE,:V_SAP_DEPARTCODE,:RET)}");
            cstmt.setString("V_SAP_PLANTCODE", V_V_SAP_PLANTCODE);
            cstmt.setString("V_SAP_DEPARTCODE", V_V_SAP_DEPARTCODE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end GETJUNKWAITMENDSTORELIST");
        return result;
    }


    public Map GETWAITMENDKCTABLE(String V_V_SAP_PLANTCODE, String V_V_SAP_DEPARTCODE, String V_STOREID, String V_MAT_NO, String V_MAT_DESC)throws SQLException {
        logger.info("begin GETWAITMENDKCTABLE");
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = nammDataSource.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_MM_JUNK_INTERFACE.GETWAITMENDKCTABLE(:V_SAP_PLANTCODE,:V_SAP_DEPARTCODE,:V_STOREID,:V_MAT_NO,:V_MAT_DESC,:RET)}");
            cstmt.setString("V_SAP_PLANTCODE", V_V_SAP_PLANTCODE);
            cstmt.setString("V_SAP_DEPARTCODE", V_V_SAP_DEPARTCODE);
            cstmt.setString("V_STOREID", V_STOREID);
            cstmt.setString("V_MAT_NO", V_MAT_NO);
            cstmt.setString("V_MAT_DESC", V_MAT_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end GETWAITMENDKCTABLE");
        return result;
    }

    public Map PG_MM_JUNK_INTERFACE(String V_USERID, String V_KCID,int F_MEND_AMOUNT,String V_ORDERID) throws SQLException{
        logger.info("begin outputMendForOrder");
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = nammDataSource.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_MM_JUNK_INTERFACE.outputMendForOrder(:V_USERID,:V_KCID,:F_MEND_AMOUNT,:V_ORDERID,:RET_ID,:RET_MSG,:RET)}");
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_KCID", V_KCID);
            cstmt.setInt("F_MEND_AMOUNT", F_MEND_AMOUNT);
            cstmt.setString("V_ORDERID", V_ORDERID);
            cstmt.registerOutParameter("RET_ID", OracleTypes.CURSOR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.CURSOR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end outputMendForOrder");
        return result;
    }

    public HashMap getWaitMendKcTable(String v_sap_plantcode, String v_sap_departcode,
                                      String v_storeid,String v_mat_no,String v_mat_desc) throws SQLException {

        logger.info("begin getWaitMendKcTable");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = nammDataSource.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_mm_junk_interface.getWaitMendKcTable" + "(:v_sap_plantcode,:v_sap_departcode," +
                    ":v_storeid,:v_mat_no,:v_mat_desc,:ret)}");
            cstmt.setString("v_sap_plantcode", v_sap_plantcode);
            cstmt.setString("v_sap_departcode", v_sap_departcode);
            cstmt.setString("v_storeid", v_storeid);
            cstmt.setString("v_mat_no", v_mat_no);
            cstmt.setString("v_mat_desc", v_mat_desc);
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
        logger.info("end getWaitMendKcTable");
        return result;
    }

    public Map outputMendForOrder(String v_userid, String v_kcid,int f_mend_amount,String v_orderid) throws SQLException{
        logger.info("begin outputMendForOrder");
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = nammDataSource.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_MM_JUNK_INTERFACE.outputMendForOrder(:v_userid,:v_kcid,:f_mend_amount,:v_orderid,:ret_id,:ret_msg,:ret)}");
            cstmt.setString("v_userid", v_userid);
            cstmt.setString("v_kcid", v_kcid);
            cstmt.setInt("f_mend_amount", f_mend_amount);
            cstmt.setString("v_orderid", v_orderid);
            cstmt.registerOutParameter("ret_id", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end outputMendForOrder");
        return result;
    }
}
