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
 * Created by Administrator on 2018/3/28.
 */
@Service
public class CarManageService {
    private static final Logger logger = Logger.getLogger(CarManageService.class.getName());

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

    public HashMap BASE_EXAMINE_CAR_SEL(String V_V_CARCODE, String V_V_CARNAME) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_SEL" + "(:V_V_CARCODE,:V_V_CARNAME,:V_CURSOR)}");
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
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
        logger.info("end BASE_EXAMINE_CAR_SEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_INS(String V_V_CARCODE,String V_V_CARNAME,String V_V_CARTYPE,String V_V_CARGUISUO,String V_V_CARINDATE,String V_V_FLAG,String V_V_CARINFO,String V_V_DE) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_INS" + "(:V_V_CARCODE,:V_V_CARNAME,:V_V_CARTYPE,:V_V_CARGUISUO,:V_V_CARINDATE,:V_V_FLAG,:V_V_CARINFO,:V_V_DE,:V_INFO)}");
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
            cstmt.setString("V_V_CARTYPE", V_V_CARTYPE);
            cstmt.setString("V_V_CARGUISUO", V_V_CARGUISUO);
            cstmt.setString("V_V_CARINDATE", V_V_CARINDATE);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_CARINFO", V_V_CARINFO);
            cstmt.setString("V_V_DE", V_V_DE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_EXAMINE_CAR_INS");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_UPD(String V_V_GUID,String V_V_CARCODE,String V_V_CARNAME,String V_V_CARTYPE,String V_V_CARGUISUO,String V_V_CARINDATE,String V_V_FLAG,String V_V_CARINFO,String V_V_DE) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_UPD" + "(:V_V_GUID,:V_V_CARCODE,:V_V_CARNAME,:V_V_CARTYPE,:V_V_CARGUISUO,:V_V_CARINDATE,:V_V_FLAG,:V_V_CARINFO,:V_V_DE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
            cstmt.setString("V_V_CARTYPE", V_V_CARTYPE);
            cstmt.setString("V_V_CARGUISUO", V_V_CARGUISUO);
            cstmt.setString("V_V_CARINDATE", V_V_CARINDATE);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_CARINFO", V_V_CARINFO);
            cstmt.setString("V_V_DE", V_V_DE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_EXAMINE_CAR_UPD");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_EXAMINE_CAR_DEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_DIS(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_DIS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_DIS" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_EXAMINE_CAR_DIS");
        return result;
    }

    public HashMap BASE_DRIVER_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_DRIVER_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_DRIVER_SEL" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end BASE_DRIVER_SEL");
        return result;
    }

    public HashMap BASE_DRIVER_INS(String V_V_CAR_GUID,String V_V_DRIVER_NAME, String V_V_WORK_DATE,String  V_V_DRIVER_DE) throws SQLException {
        logger.info("begin BASE_DRIVER_INS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_DRIVER_INS" + "(:V_V_CAR_GUID,:V_V_DRIVER_NAME,:V_V_WORK_DATE,:V_V_DRIVER_DE,:V_INFO)}");
            cstmt.setString("V_V_CAR_GUID", V_V_CAR_GUID);
            cstmt.setString("V_V_DRIVER_NAME", V_V_DRIVER_NAME);
            cstmt.setString("V_V_WORK_DATE", V_V_WORK_DATE);
            cstmt.setString("V_V_DRIVER_DE", V_V_DRIVER_DE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_DRIVER_INS");
        return result;
    }

    public HashMap BASE_DRIVER_UPD(String V_V_GUID,String V_V_DRIVER_NAME, String V_V_WORK_DATE,String  V_V_DRIVER_DE) throws SQLException {
        logger.info("begin BASE_DRIVER_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_DRIVER_UPD" + "(:V_V_GUID,:V_V_DRIVER_NAME,:V_V_WORK_DATE,:V_V_DRIVER_DE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DRIVER_NAME", V_V_DRIVER_NAME);
            cstmt.setString("V_V_WORK_DATE", V_V_WORK_DATE);
            cstmt.setString("V_V_DRIVER_DE", V_V_DRIVER_DE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_DRIVER_UPD");
        return result;
    }

    public HashMap BASE_DRIVER_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_DRIVER_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_DRIVER_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_DRIVER_DEL");
        return result;
    }

    public HashMap BASE_CAR_USE_DETAIL_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_CAR_USE_DETAIL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_CAR_USE_DETAIL_SEL" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end BASE_CAR_USE_DETAIL_SEL");
        return result;
    }

    public HashMap BASE_CAR_REP_DETAIL_SEL(String V_V_CAR_GUID) throws SQLException {
        logger.info("begin BASE_CAR_REP_DETAIL_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_CAR_REP_DETAIL_SEL" + "(:V_V_CAR_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_CAR_GUID", V_V_CAR_GUID);
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
        logger.info("end BASE_CAR_REP_DETAIL_SEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_BYCODE_SEL(String V_V_EQUCODE) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_BYCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_BYCODE_SEL" + "(:V_V_EQUCODE,:V_CURSOR)}");
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
        logger.info("end BASE_EXAMINE_CAR_BYCODE_SEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_LINKDEL(String V_V_EQUCODE) throws SQLException {
        logger.info("begin BASE_DRIVER_UPD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_LINKDEL" + "(:V_V_EQUCODE,:V_INFO)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_EXAMINE_CAR_LINKDEL");
        return result;
    }

    public HashMap BASE_EXAMINE_CAR_BYGUID_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_EXAMINE_CAR_BYGUID_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_EXAMINE_CAR_BYGUID_SEL" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end BASE_EXAMINE_CAR_BYGUID_SEL");
        return result;
    }

    public Map BASE_FILE_IMAGE_SEL(String V_V_GUID) throws SQLException {
        logger.info("begin BASE_FILE_IMAGE_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call BASE_FILE_IMAGE_SEL" + "(:V_V_GUID,:V_NAME,:V_IMAGE)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_NAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_IMAGE", OracleTypes.BLOB);

            cstmt.execute();
            result.put("O_FILENAME", (String) cstmt.getObject("V_NAME"));
            result.put("O_FILE", cstmt.getBlob("V_IMAGE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_FILE_IMAGE_SEL");
        return result;
    }
}
