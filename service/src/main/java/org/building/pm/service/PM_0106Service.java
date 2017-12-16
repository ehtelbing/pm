package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by STR on 2017/11/27.
 */
@Service
public class PM_0106Service {

    private static final Logger logger = Logger.getLogger(PM_0106Service.class.getName());

    @Autowired
    private ComboPooledDataSource dataSources;

    /**
     * 主表格
     *
     * @param V_V_ORGCODE
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws SQLException
     */
    public HashMap PRO_PM_0106_JX_MAIN_LEDGER(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE,Integer V_START,Integer V_LIMIT) throws SQLException {

        logger.info("begin PRO_PM_0106_JX_MAIN_LEDGER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_0106_JX_MAIN_LEDGER" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_START,:V_LIMIT,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setInt("V_START", V_START);
            cstmt.setInt("V_LIMIT", V_LIMIT);
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
        logger.info("end PRO_PM_0106_JX_MAIN_LEDGER");
        return result;
    }

    /**
     * 大修 tab
     *
     * @param V_V_ORGCODE
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws SQLException
     */
    public HashMap PRO_PM_0106_OVERHUAL_LEDGER(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUCODE,Integer V_START,Integer V_LIMIT) throws SQLException {

        logger.info("begin PRO_PM_0106_OVERHUAL_LEDGER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_0106_OVERHUAL_LEDGER" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_START,:V_LIMIT,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setInt("V_START", V_START);
            cstmt.setInt("V_LIMIT", V_LIMIT);
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
        logger.info("end PRO_PM_0106_OVERHUAL_LEDGER");
        return result;
    }

    /**
     * 日修 tab
     *
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws SQLException
     */
    public HashMap PRO_PM_0106_WORKORDER_LEDGER(String V_V_DEPTCODE, String V_V_EQUCODE,Integer V_START,Integer V_LIMIT ) throws SQLException {

        logger.info("begin PRO_PM_0106_WORKORDER_LEDGER");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_0106_WORKORDER_LEDGER" + "(:V_V_DEPTCODE,:V_V_EQUCODE,:V_START,:V_LIMIT,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setInt("V_START", V_START);
            cstmt.setInt("V_LIMIT", V_LIMIT);
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
        logger.info("end PRO_PM_0106_WORKORDER_LEDGER");
        return result;
    }

    /**
     * 大修详细
     *
     * @param V_V_GUID
     * @return
     * @throws SQLException
     */
    public HashMap PRO_PM_0106_OVERHUAL_DETAIL(String V_V_GUID,Integer V_START,Integer V_LIMIT) throws SQLException {

        logger.info("begin PRO_PM_0106_OVERHUAL_DETAIL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_0106_OVERHUAL_DETAIL" + "(:V_V_GUID,:V_START,:V_LIMIT)}");
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
        logger.info("end PRO_PM_0106_OVERHUAL_DETAIL");
        return result;
    }

    /**
     * 修改原值
     * @param V_V_COLUMN
     * @param V_V_VALUE
     * @param V_I_ID
     * @return
     * @throws SQLException
     */
    public String PRO_PM_0106_MODIFY_MAIN(String V_V_COLUMN, String V_V_VALUE, String V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_0106_MODIFY_MAIN");

        String result = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_0106_MODIFY_MAIN" + "(:V_I_ID,:V_V_COLUMN,:V_V_VALUE,:RET_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_COLUMN", V_V_COLUMN);
            cstmt.setString("V_V_VALUE", V_V_VALUE);
            cstmt.registerOutParameter("RET_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result = cstmt.getString("RET_INFO");
        } catch (Exception e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_0106_MODIFY_MAIN");
        return result;
    }

    /**
     * 遍历工具
     *
     * @param rs
     * @return
     * @throws SQLException
     */
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

}
