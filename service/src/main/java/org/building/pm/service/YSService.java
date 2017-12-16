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

/**
 * Created by LL on 2017/10/31.
 */
@Service
public class YSService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

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

    public HashMap ys_report_charge_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_DEPTCODE) throws SQLException {

        logger.info("begin ys_report_charge_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_sel(:V_I_YEAR, :V_I_MONTH, :V_DEPTCODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
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
        logger.info("end ys_report_charge_sel");
        return result;
    }

    public HashMap ys_report_charge_dept_sel(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin ys_report_charge_dept_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_dept_sel(:V_I_YEAR, :V_I_MONTH,:V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
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
        logger.info("end ys_report_charge_dept_sel");
        return result;
    }

    public HashMap ys_report_charge_ck_sel() throws SQLException {

        logger.info("begin ys_report_charge_ck_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_ck_sel(:V_CURSOR)}");
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
        logger.info("end ys_report_charge_ck_sel");
        return result;
    }

    public HashMap ys_report_charge_cost_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_CHARGECODE) throws SQLException {

        logger.info("begin ys_report_charge_cost_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_cost_sel(:V_I_YEAR, :V_I_MONTH, :V_CHARGECODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_CHARGECODE", V_CHARGECODE);
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
        logger.info("end ys_report_charge_cost_sel");
        return result;
    }

    public HashMap ys_charge_workorder_sel(String V_V_ORDERID) throws SQLException {

        logger.info("begin ys_charge_workorder_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_charge_workorder_sel(:V_V_ORDERID, :V_CURSOR)}");
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
        logger.info("end ys_charge_workorder_sel");
        return result;
    }

    public HashMap ys_charge_workorder_day_sel(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE, String V_V_DEPTCODE,String V_EQUTYPE_CODE,
                                               String V_EQU_CODE, String V_DJ_PERCODE) throws SQLException {

        logger.info("begin ys_charge_workorder_day_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_charge_workorder_day_sel(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
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
        logger.info("end ys_charge_workorder_day_sel");
        return result;
    }

    public HashMap ys_charge_workorder_month_sel(String V_D_ENTER_YEAR,String V_D_ENTER_MONTH,String V_V_ORGCODE, String V_V_DEPTCODE,String V_EQUTYPE_CODE,
                                                 String V_EQU_CODE, String V_DJ_PERCODE) throws SQLException {

        logger.info("begin ys_charge_workorder_month_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_charge_workorder_month_sel(:V_D_ENTER_YEAR, :V_D_ENTER_MONTH, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_YEAR", V_D_ENTER_YEAR);
            cstmt.setString("V_D_ENTER_MONTH", V_D_ENTER_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
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
        logger.info("end ys_charge_workorder_month_sel");
        return result;
    }

    public HashMap ys_charge_workorder_year_sel(String V_D_ENTER_YEAR,String V_V_ORGCODE, String V_V_DEPTCODE,String V_EQUTYPE_CODE,
                                                 String V_EQU_CODE, String V_DJ_PERCODE) throws SQLException {

        logger.info("begin ys_charge_workorder_year_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_charge_workorder_year_sel(:V_D_ENTER_YEAR, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_YEAR", V_D_ENTER_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
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
        logger.info("end ys_charge_workorder_year_sel");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_SET(String V_I_IP,String V_USERCODE, String V_USERNAME,String V_V_ORDERID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_SET(:V_I_IP, :V_USERCODE, :V_USERNAME, :V_V_ORDERID, :V_INFO)}");
            cstmt.setString("V_I_IP", V_I_IP);
            cstmt.setString("V_USERCODE", V_USERCODE);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET",  cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_SET");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_N_SEL(String V_V_ORDERID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_N_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_N_SEL(:V_V_ORDERID, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_N_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_MAT_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_MAT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_MAT_SEL(:V_V_CHARGE_ID, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_MAT_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_PER_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_PER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_PER_SEL(:V_V_CHARGE_ID, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_PER_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_TOOL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_TOOL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_TOOL_SEL(:V_V_CHARGE_ID, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_TOOL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_CON_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                               String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_CON_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_CON_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_CON_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_BILL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_BILL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_BILL_SEL(:V_V_CHARGE_ID, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_BILL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_CON_SET(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_CON_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_CON_SET(:V_V_CHARGE_ID, :V_INFO)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
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
        logger.info("end YS_CHARGE_WORKORDER_CON_SET");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_PAY_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                               String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_PAY_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_PAY_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_PAY_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_PAY_SET(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_PAY_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_PAY_SET(:V_V_CHARGE_ID, :V_INFO)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
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
        logger.info("end YS_CHARGE_WORKORDER_PAY_SET");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_DAY_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                               String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_DAY_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_DAY_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :V_SQLERRM, :V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("V_SQLERRM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_SQLERRM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_DAY_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_ORG_SEL(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_ORG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_ORG_SEL(:V_I_YEAR, :V_I_MONTH,:V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
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
        logger.info("end YS_CHARGE_WORKORDER_ORG_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_DEPT_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_DEPT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_DEPT_SEL(:V_I_YEAR, :V_I_MONTH, :V_V_ORGCODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
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
        logger.info("end YS_CHARGE_WORKORDER_DEPT_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_DETAIL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_DETAIL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_DETAIL_SEL(:V_I_YEAR, :V_I_MONTH, :V_V_ORGCODE, :V_V_DEPTCODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
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
        logger.info("end YS_CHARGE_WORKORDER_DETAIL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_ORG_D_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_ORG_D_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_ORG_D_SEL(:V_I_YEAR, :V_I_MONTH, :V_V_ORGCODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
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
        logger.info("end YS_CHARGE_WORKORDER_ORG_D_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_SEL(String V_V_YEAR, String V_V_MONTH,String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_SEL(:V_V_YEAR, :V_V_MONTH, :V_V_ORGCODE, :V_V_DEPTCODE, :V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end YS_CHARGE_PROJECT_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_DETAIL_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_DETAIL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_DETAIL_SEL(:V_V_GUID, :V_CURSOR)}");
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
        logger.info("end YS_CHARGE_PROJECT_DETAIL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_W_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_W_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_W_SEL(:V_V_GUID, :V_CURSOR)}");
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
        logger.info("end YS_CHARGE_PROJECT_W_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH,String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_TOTAL_SEL(:V_V_YEAR, :V_V_MONTH, :V_V_ORGCODE, :V_V_DEPTCODE, :SUM_PLAN_MONEY, :SUM_BUGET_MONEY, :SUM_PAID, :SUM_UNPAID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("SUM_PLAN_MONEY", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_BUGET_MONEY",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_UNPAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_PLAN_MONEY"));
            result.put("RET2",cstmt.getString("SUM_BUGET_MONEY"));
            result.put("RET3",cstmt.getString("SUM_PAID"));
            result.put("RET4",cstmt.getString("SUM_UNPAID"));
            result.put("RET5",cstmt.getString("SUM_P_MAT"));
            result.put("RET6",cstmt.getString("SUM_A_MAT"));
            result.put("RET7",cstmt.getString("SUM_PER"));
            result.put("RET8",cstmt.getString("SUM_TOOL"));
            result.put("RET9",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET10",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_PROJECT_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_D_TOTAL_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_D_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_D_TOTAL_SEL(:V_V_GUID, :SUM_PLAN_MONEY, :SUM_BUGET_MONEY, :SUM_PAID, :SUM_UNPAID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("SUM_PLAN_MONEY", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_BUGET_MONEY",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_UNPAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE",OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_PLAN_MONEY"));
            result.put("RET2",cstmt.getString("SUM_BUGET_MONEY"));
            result.put("RET3",cstmt.getString("SUM_PAID"));
            result.put("RET4",cstmt.getString("SUM_UNPAID"));
            result.put("RET5",cstmt.getString("SUM_P_MAT"));
            result.put("RET6",cstmt.getString("SUM_A_MAT"));
            result.put("RET7",cstmt.getString("SUM_PER"));
            result.put("RET8",cstmt.getString("SUM_TOOL"));
            result.put("RET9",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET10",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_PROJECT_D_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_W_TOTAL_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_W_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_W_TOTAL_SEL(:V_V_GUID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_PROJECT_W_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_BILL_TOTAL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_W_BILL_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_BILL_TOTAL_SEL(:V_V_CHARGE_ID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE",OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_BILL_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_MAT_TOTAL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_W_MAT_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_MAT_TOTAL_SEL(:V_V_CHARGE_ID, :SUM_P_MAT, :SUM_A_MAT)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("SUM_P_MAT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_MAT_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_PER_TOTAL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_W_PER_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_PER_TOTAL_SEL(:V_V_CHARGE_ID, :SUM_PER)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_PER"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_PER_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_TOOL_TOTAL_SEL(String V_V_CHARGE_ID) throws SQLException {

        logger.info("begin YS_CHARGE_W_TOOL_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_TOOL_TOTAL_SEL(:V_V_CHARGE_ID,  :SUM_TOOL)}");
            cstmt.setString("V_V_CHARGE_ID", V_V_CHARGE_ID);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_TOOL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_TOOL_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_CON_TOTAL_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                               String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_W_CON_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_CON_TOTAL_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_CON_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_PAY_TOTAL_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                             String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_W_PAY_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_PAY_TOTAL_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_PAY_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_DAY_TOTAL_SEL(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                             String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_STATE_BILL) throws SQLException {

        logger.info("begin YS_CHARGE_W_DAY_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_DAY_TOTAL_SEL(:V_D_ENTER_DATE_B, :V_D_ENTER_DATE_E, :V_V_ORGCODE, :V_V_DEPTCODE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_DJ_PERCODE, :V_V_STATE_BILL, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_EQUTYPE_CODE",V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE",V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE",V_DJ_PERCODE);
            cstmt.setString("V_V_STATE_BILL",V_V_STATE_BILL);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_DAY_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_ORG_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin YS_CHARGE_W_ORG_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_ORG_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_ORG_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_DEPT_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHARGE_W_DEPT_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_DEPT_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_V_ORGCODE, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH",V_I_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_DEPT_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_W_DEPT_D_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE) throws SQLException {

        logger.info("begin YS_CHARGE_W_DEPT_D_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_W_DEPT_D_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_V_ORGCODE, :V_V_DEPTCODE, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH",V_I_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_W_DEPT_D_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_WORKORDER_TOTAL_SEL(String V_V_ORDERID) throws SQLException {

        logger.info("begin YS_CHARGE_WORKORDER_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_WORKORDER_TOTAL_SEL(:V_V_ORDERID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_ORDERID",V_V_ORDERID);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_P_MAT"));
            result.put("RET2",cstmt.getString("SUM_A_MAT"));
            result.put("RET3",cstmt.getString("SUM_PER"));
            result.put("RET4",cstmt.getString("SUM_TOOL"));
            result.put("RET5",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET6",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_WORKORDER_TOTAL_SEL");
        return result;
    }

    public HashMap YS_REPORT_CHARGE_ORG_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin YS_REPORT_CHARGE_ORG_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_CHARGE_ORG_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_CHARGE_ORG_TOTAL_SEL");
        return result;
    }

    public HashMap YS_REPORT_CHARGE_C_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_CHARGECODE) throws SQLException {

        logger.info("begin YS_REPORT_CHARGE_C_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_CHARGE_C_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_CHARGECODE, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_CHARGECODE",V_CHARGECODE);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_CHARGE_C_TOTAL_SEL");
        return result;
    }


    public HashMap YS_REPORT_C_DEPT_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_DEPTCODE) throws SQLException {

        logger.info("begin YS_REPORT_C_DEPT_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_C_DEPT_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_DEPTCODE, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_DEPTCODE",V_DEPTCODE);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_C_DEPT_TOTAL_SEL");
        return result;
    }

    public HashMap YS_REPORT_C_OTHERD_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin YS_REPORT_C_OTHERD_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_C_OTHERD_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_C_OTHERD_TOTAL_SEL");
        return result;
    }

    public HashMap YS_REPORT_CHARGE_C_O_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_CHARGECODE) throws SQLException {

        logger.info("begin YS_REPORT_CHARGE_C_O_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_CHARGE_C_O_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_CHARGECODE, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_CHARGECODE",V_CHARGECODE);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_CHARGE_C_O_TOTAL_SEL");
        return result;
    }

    public HashMap YS_REPORT_C_OTHER_TOTAL_SEL(Integer V_I_YEAR, Integer V_I_MONTH, String V_DEPTCODE) throws SQLException {

        logger.info("begin YS_REPORT_C_OTHER_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_REPORT_C_OTHER_TOTAL_SEL(:V_I_YEAR, :V_I_MONTH, :V_DEPTCODE, :SUM_MONEY_PRI_YEAR, :SUM_MONEY_BUD_YEAR, :SUM_MONEY_BUD, :SUM_MONEY_FACT, :SUM_MONEY_MARGIN, :SUM_MONEY_BUD_TOTAL, :SUM_MONEY_YEAR, :SUM_MONEY_MARGIN_TOTAL)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_DEPTCODE",V_DEPTCODE);
            cstmt.registerOutParameter("SUM_MONEY_PRI_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_YEAR",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_FACT", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_BUD_TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_YEAR", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_MONEY_MARGIN_TOTAL", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_MONEY_PRI_YEAR"));
            result.put("RET2",cstmt.getString("SUM_MONEY_BUD_YEAR"));
            result.put("RET3",cstmt.getString("SUM_MONEY_BUD"));
            result.put("RET4",cstmt.getString("SUM_MONEY_FACT"));
            result.put("RET5",cstmt.getString("SUM_MONEY_MARGIN"));
            result.put("RET6",cstmt.getString("SUM_MONEY_BUD_TOTAL"));
            result.put("RET7",cstmt.getString("SUM_MONEY_YEAR"));
            result.put("RET8",cstmt.getString("SUM_MONEY_MARGIN_TOTAL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_REPORT_C_OTHER_TOTAL_SEL");
        return result;
    }

    public HashMap ys_report_charge_otherDept_sel(Integer V_I_YEAR, Integer V_I_MONTH) throws SQLException {

        logger.info("begin ys_report_charge_otherDept_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_otherDept_sel(:V_I_YEAR, :V_I_MONTH,:V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
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
        logger.info("end ys_report_charge_otherDept_sel");
        return result;
    }

    public HashMap ys_report_charge_c_otherD_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_CHARGECODE) throws SQLException {

        logger.info("begin ys_report_charge_c_otherD_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_c_otherD_sel(:V_I_YEAR, :V_I_MONTH, :V_CHARGECODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_CHARGECODE", V_CHARGECODE);
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
        logger.info("end ys_report_charge_c_otherD_sel");
        return result;
    }

    public HashMap ys_report_charge_otherD_sel(Integer V_I_YEAR, Integer V_I_MONTH, String V_DEPTCODE) throws SQLException {

        logger.info("begin ys_report_charge_otherD_sel");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call ys_report_charge_otherD_sel(:V_I_YEAR, :V_I_MONTH, :V_DEPTCODE, :V_CURSOR)}");
            cstmt.setInt("V_I_YEAR", V_I_YEAR);
            cstmt.setInt("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_DEPTCODE", V_DEPTCODE);
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
        logger.info("end ys_report_charge_otherD_sel");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_ORG_SEL(String V_V_YEAR, String V_V_MONTH) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_ORG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_ORG_SEL(:V_V_YEAR, :V_V_MONTH,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
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
        logger.info("end YS_CHARGE_PROJECT_ORG_SEL");
        return result;
    }

    public HashMap YS_CHARGE_PROJECT_DEPT_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHARGE_PROJECT_DEPT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_PROJECT_DEPT_SEL(:V_V_YEAR, :V_V_MONTH, :V_V_ORGCODE, :V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end YS_CHARGE_PROJECT_DEPT_SEL");
        return result;
    }

    public HashMap YS_CHARGE_P_ORG_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH) throws SQLException {

        logger.info("begin YS_CHARGE_P_ORG_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_P_ORG_TOTAL_SEL(:V_V_YEAR, :V_V_MONTH,  :SUM_PLAN_MONEY, :SUM_BUGET_MONEY, :SUM_PAID, :SUM_UNPAID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.registerOutParameter("SUM_PLAN_MONEY", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_BUGET_MONEY",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_UNPAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_PLAN_MONEY"));
            result.put("RET2",cstmt.getString("SUM_BUGET_MONEY"));
            result.put("RET3",cstmt.getString("SUM_PAID"));
            result.put("RET4",cstmt.getString("SUM_UNPAID"));
            result.put("RET5",cstmt.getString("SUM_P_MAT"));
            result.put("RET6",cstmt.getString("SUM_A_MAT"));
            result.put("RET7",cstmt.getString("SUM_PER"));
            result.put("RET8",cstmt.getString("SUM_TOOL"));
            result.put("RET9",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET10",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_P_ORG_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHARGE_P_DEPT_TOTAL_SEL(String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHARGE_P_DEPT_TOTAL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHARGE_P_DEPT_TOTAL_SEL(:V_V_YEAR, :V_V_MONTH,:V_V_ORGCODE,  :SUM_PLAN_MONEY, :SUM_BUGET_MONEY, :SUM_PAID, :SUM_UNPAID, :SUM_P_MAT, :SUM_A_MAT, :SUM_PER, :SUM_TOOL, :SUM_TOTAL_P_CHARGE, :SUM_TOTAL_A_CHARGE)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.registerOutParameter("SUM_PLAN_MONEY", OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_BUGET_MONEY",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_UNPAID",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_P_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_A_MAT",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_PER",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOOL",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_P_CHARGE",OracleTypes.NUMBER);
            cstmt.registerOutParameter("SUM_TOTAL_A_CHARGE", OracleTypes.NUMBER);
            cstmt.execute();
            result.put("RET","success");
            result.put("RET1",cstmt.getString("SUM_PLAN_MONEY"));
            result.put("RET2",cstmt.getString("SUM_BUGET_MONEY"));
            result.put("RET3",cstmt.getString("SUM_PAID"));
            result.put("RET4",cstmt.getString("SUM_UNPAID"));
            result.put("RET5",cstmt.getString("SUM_P_MAT"));
            result.put("RET6",cstmt.getString("SUM_A_MAT"));
            result.put("RET7",cstmt.getString("SUM_PER"));
            result.put("RET8",cstmt.getString("SUM_TOOL"));
            result.put("RET9",cstmt.getString("SUM_TOTAL_P_CHARGE"));
            result.put("RET10",cstmt.getString("SUM_TOTAL_A_CHARGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end YS_CHARGE_P_DEPT_TOTAL_SEL");
        return result;
    }

    public HashMap YS_CHART_PROJECT_ORG_SEL(String V_YEAR_BEGIN, String V_YEAR_END) throws SQLException {

        logger.info("begin YS_CHART_PROJECT_ORG_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHART_PROJECT_ORG_SEL(:V_YEAR_BEGIN, :V_YEAR_END,:V_CURSOR)}");
            cstmt.setString("V_YEAR_BEGIN", V_YEAR_BEGIN);
            cstmt.setString("V_YEAR_END", V_YEAR_END);
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
        logger.info("end YS_CHART_PROJECT_ORG_SEL");
        return result;
    }

    public HashMap YS_CHART_PROJECT_YEAR_SEL(String V_V_YEAR) throws SQLException {

        logger.info("begin YS_CHART_PROJECT_YEAR_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHART_PROJECT_YEAR_SEL(:V_V_YEAR,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
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
        logger.info("end YS_CHART_PROJECT_YEAR_SEL");
        return result;
    }

    public HashMap YS_CHART_PROJECT_ORG_S_SEL(String V_V_YEAR) throws SQLException {

        logger.info("begin YS_CHART_PROJECT_ORG_S_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHART_PROJECT_ORG_S_SEL(:V_V_YEAR,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
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
        logger.info("end YS_CHART_PROJECT_ORG_S_SEL");
        return result;
    }

    public HashMap YS_CHART_PROJECT_DEPT_SEL(String V_V_YEAR, String V_V_ORGCODE) throws SQLException {

        logger.info("begin YS_CHART_PROJECT_DEPT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHART_PROJECT_DEPT_SEL(:V_V_YEAR, :V_V_ORGCODE, :V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end YS_CHART_PROJECT_DEPT_SEL");
        return result;
    }

    public HashMap YS_CHART_PROJECT_EQU_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCDE,String V_EQUTYPE_CODE,String V_EQU_CODE) throws SQLException {

        logger.info("begin YS_CHART_PROJECT_EQU_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call YS_CHART_PROJECT_EQU_SEL(:V_V_YEAR, :V_V_ORGCODE, :V_V_DEPTCDE, :V_EQUTYPE_CODE, :V_EQU_CODE, :V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCDE", V_V_DEPTCDE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
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
        logger.info("end YS_CHART_PROJECT_EQU_SEL");
        return result;
    }

}
