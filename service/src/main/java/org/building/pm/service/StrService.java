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

/**
 * Created by STR on 2017/12/13.
 */
@Service
public class StrService {
    private static final Logger logger = Logger.getLogger(StrService.class.getName());

    @Autowired
    private ComboPooledDataSource dataSources;

    public HashMap PRO_PM_EQUREPAIRPLAN_TOWORK_C1(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TOWORK_C1");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TOWORK_C1" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_TOWORK_C1");
        return result;
    }


    /**
     * 厂矿大修分解编制 双击详情弹窗  指定行 工单详情
     *
     * @param V_V_ORDERGUID
     * @return
     * @throws SQLException
     */
    public HashMap PRO_PM_WORKORDER_BY_ORDERGUID(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_BY_ORDERGUID");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_BY_ORDERGUID" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TOWORK_C1");
        return result;
    }

    /**
     * 厂矿大修分解编制  创建或修改子项 触发事件
     * @param V_V_PERCODE
     * @param V_V_PERNAME
     * @param V_V_GUID
     * @param V_V_GUID_P
     * @param V_V_GUID_FXJH
     * @param V_V_COLUMN
     * @param V_V_VALUE
     * @return
     * @throws SQLException
     */
    public HashMap PM_EQUREPAIRPLAN_TREE_INSERT_Z(String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID, String V_V_GUID_P, String V_V_GUID_FXJH, String V_V_COLUMN, String V_V_VALUE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EQUREPAIRPLAN_TREE_INSERT_Z" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_GUID_P,:V_V_GUID_FXJH,:V_V_COLUMN,:V_V_VALUE,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_GUID_P", V_V_GUID_P);
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_V_COLUMN", V_V_COLUMN);
            cstmt.setString("V_V_VALUE", V_V_VALUE);
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
        logger.info("end PM_EQUREPAIRPLAN_TREE_INSERT_Z");
        return result;
    }


    /**
     * 工具方法: 将jdbc返回的cursor 遍历封装为 List 类型
     * this is a util function :
     * used for putting the cursor of the result of JdbcTemplate into a List to return the controller.
     *
     * @param rs
     * @return list
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
