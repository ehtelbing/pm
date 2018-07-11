package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class KxyService {
    private static final Logger logger = Logger.getLogger(KxyService.class.getName());
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

    @Autowired
    private ComboPooledDataSource dataSources;

    public HashMap userFavoriteMenu(String A_USERID) throws SQLException {
        logger.info("begin PM_MENU_FAVORITE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MENU_FAVORITE" + "(:A_USERID,:RET)}");
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MENU_FAVORITE");
        return result;
    }

    public HashMap insertFavoriteMenu(String A_USERID,String A_MENUID) throws SQLException {
        logger.info("begin PM_MENU_FAVORITE_ADD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MENU_FAVORITE_ADD" + "(:A_USERID,:A_MENUID,:RET)}");
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_MENUID", A_MENUID);
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
        logger.info("end PM_MENU_FAVORITE_ADD");
        return result;
    }

    public HashMap deleteFavoriteMenu(String A_USERID,String A_MENUID) throws SQLException {
        logger.info("begin PM_MENU_FAVORITE_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MENU_FAVORITE_DELETE" + "(:A_USERID,:A_MENUID,:RET)}");
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_MENUID", A_MENUID);
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
        logger.info("end PM_MENU_FAVORITE_DELETE");
        return result;
    }

    public HashMap setHomeMenu(String A_USERID,String A_MENUID) throws SQLException {
        logger.info("begin PM_MENU_SETHOME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MENU_SETHOME" + "(:A_USERID,:A_MENUID,:RET)}");
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_MENUID", A_MENUID);
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
        logger.info("end PM_MENU_SETHOME");
        return result;
    }

    public HashMap getHomeMenu(String A_USERID) throws SQLException {
        logger.info("begin PM_MENU_GETHOME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MENU_GETHOME" + "(:A_USERID,:RET)}");
            cstmt.setString("A_USERID", A_USERID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MENU_GETHOME");
        return result;
    }




}