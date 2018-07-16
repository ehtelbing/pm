package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KxyService {
    private static final Logger logger = Logger.getLogger(KxyService.class.getName());
    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    private List<Map<String, Object>> ResultHash1(ResultSet rs) throws SQLException {

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        ResultSetMetaData rsm = rs.getMetaData();

        while (rs.next()) {
            Map<String, Object> model = new HashMap<String, Object>();
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
                                rs.getString(i) == null ? "" : rs.getString(i).trim());
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }

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

    public Map<String, Object> insertFavoriteMenuList(String A_USERID, List<String> MENUID_LIST) throws SQLException {
        for (String MENUID : MENUID_LIST) {
            insertFavoriteMenu(A_USERID, MENUID);
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
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

    public HashMap PRO_BASE_NEW_MENU_SEL(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE,String V_V_HOME_MENU) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_MENU_FAVORITE" + "(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
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
        logger.info("end PRO_BASE_NEW_MENU_SEL");
        return result;
    }


/*    public List<Map<String, Object>> PRO_BASE_NEW_MENU_SEL(final String IS_V_ROLECODE, final String IS_V_SYSTYPE, final String V_V_DEPTCODE,final String V_V_HOME_MENU) {
        return jdbcTemplate.execute(new CallableStatementCreator() {
            @Override
            public CallableStatement createCallableStatement(Connection con)
                    throws SQLException {
                String sql = "{call PRO_BASE_NEW_MENU_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}";
                CallableStatement statement = con.prepareCall(sql);
                statement.setString("IS_V_ROLECODE", IS_V_ROLECODE);
                statement.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
                statement.setString("V_V_DEPTCODE", V_V_DEPTCODE);
                statement.setString("V_V_HOME_MENU", V_V_HOME_MENU);
                statement.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
                return statement;
            }
        }, new CallableStatementCallback<List<Map<String, Object>>>() {
            @Override
            public List<Map<String, Object>> doInCallableStatement(CallableStatement cs)
                    throws SQLException, DataAccessException {
                cs.execute();

                return ResultHash1((ResultSet) cs.getObject("V_CURSOR"));
            }

        });
    }*/

}