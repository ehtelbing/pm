package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by admin on 2017/10/31.
 */
@Service
public class DJService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

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


    public HashMap pro_dj101_selectmendcontext() throws SQLException {

        logger.info("begin pro_dj101_selectmendcontext");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_selectmendcontext(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_selectmendcontext");
        return result;
    }

    public HashMap pro_dj101_addmendcontext(String contenr_code_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj101_addmendcontext");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_addmendcontext" + "(:contenr_code_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("contenr_code_in", contenr_code_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_addmendcontext");
        return result;
    }

    public HashMap pro_dj101_stopmendcontext(String contenr_code_in) throws SQLException {

        logger.info("begin pro_dj101_stopmendcontext");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_stopmendcontext" + "(:contenr_code_in,:ret)}");
            cstmt.setString("contenr_code_in", contenr_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_stopmendcontext");
        return result;
    }

    public HashMap pro_dj101_startmendcontext(String contenr_code_in) throws SQLException {

        logger.info("begin pro_dj101_startmendcontext");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_startmendcontext" + "(:contenr_code_in,:ret)}");
            cstmt.setString("contenr_code_in", contenr_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_startmendcontext");
        return result;
    }

    public HashMap pro_dj101_deletemendcontext(String contenr_code_in) throws SQLException {

        logger.info("begin pro_dj101_deletemendcontext");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_deletemendcontext" + "(:contenr_code_in,:ret,:ret_msg)}");
            cstmt.setString("contenr_code_in", contenr_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_deletemendcontext");
        return result;
    }

    public HashMap pro_dj102_selectmendtype() throws SQLException {

        logger.info("begin pro_dj102_selectmendtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_selectmendtype(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_selectmendtype");
        return result;
    }

    public HashMap pro_dj102_addmendtype(String type_code_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj102_addmendtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_addmendtype" + "(:type_code_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_addmendtype");
        return result;
    }

    public HashMap pro_dj102_stopmendtype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj102_stopmendtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_stopmendtype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_stopmendtype");
        return result;
    }

    public HashMap pro_dj102_startmendtype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj102_startmendtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_startmendtype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_startmendtype");
        return result;
    }

    public HashMap pro_dj102_deletemendtype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj102_deletemendtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_deletemendtype" + "(:type_code_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_deletemendtype");
        return result;
    }

    public HashMap pro_dj103_selectgstype() throws SQLException {

        logger.info("begin pro_dj103_selectgstype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_selectgstype(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_selectgstype");
        return result;
    }

    public HashMap pro_dj103_addgstype(String type_code_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj103_addgstype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_addgstype" + "(:type_code_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_addgstype");
        return result;
    }

    public HashMap pro_dj103_stopgstype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj103_stopgstype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_stopgstype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_stopgstype");
        return result;
    }

    public HashMap pro_dj103_startgstype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj103_startgstype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_startgstype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_startgstype");
        return result;
    }

    public HashMap pro_dj103_deletegstype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj103_deletegstype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_deletegstype" + "(:type_code_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_deletegstype");
        return result;
    }

    public HashMap pro_dj104_selectmoneyclass() throws SQLException {

        logger.info("begin pro_dj104_selectmoneyclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_selectmoneyclass(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_selectmoneyclass");
        return result;
    }

    public HashMap pro_dj104_addmoneyclass(String type_code_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj104_addmoneyclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_addmoneyclass" + "(:type_code_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_addmoneyclass");
        return result;
    }

    public HashMap pro_dj104_stopmoneyclass(String type_code_in) throws SQLException {

        logger.info("begin pro_dj104_stopmoneyclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_stopmoneyclass" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_stopmoneyclass");
        return result;
    }

    public HashMap pro_dj104_startmoneyclass(String type_code_in) throws SQLException {

        logger.info("begin pro_dj104_startmoneyclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_startmoneyclass" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_startmoneyclass");
        return result;
    }

    public HashMap pro_dj104_deletemoneyclass(String type_code_in) throws SQLException {

        logger.info("begin pro_dj104_deletemoneyclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_deletemoneyclass" + "(:type_code_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_deletemoneyclass");
        return result;
    }

    public HashMap pro_dj104_moneyclass_able() throws SQLException {

        logger.info("begin pro_dj104_moneyclass_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj104_moneyclass_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj104_moneyclass_able");
        return result;
    }

    public HashMap pro_dj105_selectmoneytype() throws SQLException {

        logger.info("begin pro_dj105_selectmoneytype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_selectmoneytype(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_selectmoneytype");
        return result;
    }

    public HashMap pro_dj105_addmoneytype(String type_code_in, String describe_in, String class_code_in) throws SQLException {

        logger.info("begin pro_dj105_addmoneytype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_addmoneytype" + "(:type_code_in,:describe_in,:class_code_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.setString("class_code_in", class_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_addmoneytype");
        return result;
    }

    public HashMap pro_dj105_stopmoneytype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj105_stopmoneytype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_stopmoneytype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_stopmoneytype");
        return result;
    }

    public HashMap pro_dj105_startmoneytype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj105_startmoneytype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_startmoneytype" + "(:type_code_in,:ret)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_startmoneytype");
        return result;
    }

    public HashMap pro_dj105_deletemoneytype(String type_code_in) throws SQLException {

        logger.info("begin pro_dj105_deletemoneytype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_deletemoneytype" + "(:type_code_in,:ret,:ret_msg)}");
            cstmt.setString("type_code_in", type_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_deletemoneytype");
        return result;
    }

    public HashMap pro_dj106_selectdjseries() throws SQLException {

        logger.info("begin pro_dj106_selectdjseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_selectdjseries(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_selectdjseries");
        return result;
    }

    public HashMap pro_dj106_adddjseries(String series_type_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj106_adddjseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_adddjseries" + "(:series_type_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("series_type_in", series_type_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_adddjseries");
        return result;
    }

    public HashMap pro_dj106_stopdjseries(String series_class_in) throws SQLException {

        logger.info("begin pro_dj106_stopdjseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_stopdjseries" + "(:series_class_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_stopdjseries");
        return result;
    }

    public HashMap pro_dj106_startdjseries(String series_class_in) throws SQLException {

        logger.info("begin pro_dj106_startdjseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_startdjseries" + "(:series_class_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_startdjseries");
        return result;
    }

    public HashMap pro_dj106_deletedjseries(String series_class_in) throws SQLException {

        logger.info("begin pro_dj106_deletedjseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_deletedjseries" + "(:series_class_in,:ret,:ret_msg)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_deletedjseries");
        return result;
    }

    public HashMap pro_dj106_djseries_able() throws SQLException {

        logger.info("begin pro_dj106_djseries_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_djseries_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj106_djseries_able");
        return result;
    }

    public HashMap pro_dj107_selectdjtype(String series_class_in) throws SQLException {

        logger.info("begin pro_dj107_selectdjtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_selectdjtype(:series_class_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_selectdjtype");
        return result;
    }

    public HashMap pro_dj107_adddjtype(String dj_type_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj107_adddjtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_adddjtype" + "(:dj_type_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_adddjtype");
        return result;
    }

    public HashMap pro_dj107_stopdjtype(String dj_type_in) throws SQLException {

        logger.info("begin pro_dj107_stopdjtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_stopdjtype" + "(:dj_type_in,:ret)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_stopdjtype");
        return result;
    }

    public HashMap pro_dj107_startdjtype(String dj_type_in) throws SQLException {

        logger.info("begin pro_dj107_startdjtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_startdjtype" + "(:dj_type_in,:ret)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_startdjtype");
        return result;
    }

    public HashMap pro_dj107_deletedjtype(String dj_type_in) throws SQLException {

        logger.info("begin pro_dj107_deletedjtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_deletedjtype" + "(:dj_type_in,:ret,:ret_msg)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_deletedjtype");
        return result;
    }

    public HashMap pro_dj108_selectbyqseries() throws SQLException {

        logger.info("begin pro_dj108_selectbyqseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_selectbyqseries(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_selectbyqseries");
        return result;
    }

    public HashMap pro_dj108_addbyqseries(String dj_type_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj108_addbyqseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_addbyqseries" + "(:dj_type_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_addbyqseries");
        return result;
    }

    public HashMap pro_dj108_stopbyqseries(String byq_series_class_in) throws SQLException {

        logger.info("begin pro_dj108_stopbyqseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_stopbyqseries" + "(:byq_series_class_in,:ret)}");
            cstmt.setString("byq_series_class_in", byq_series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_stopbyqseries");
        return result;
    }

    public HashMap pro_dj108_startbyqseries(String byq_series_class_in) throws SQLException {

        logger.info("begin pro_dj108_startbyqseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_startbyqseries" + "(:byq_series_class_in,:ret)}");
            cstmt.setString("byq_series_class_in", byq_series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_startbyqseries");
        return result;
    }

    public HashMap pro_dj108_deletebyqseries(String byq_series_class_in) throws SQLException {

        logger.info("begin pro_dj108_deletebyqseries");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_deletebyqseries" + "(:byq_series_class_in,:ret,:ret_msg)}");
            cstmt.setString("byq_series_class_in", byq_series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_deletebyqseries");
        return result;
    }

    public HashMap pro_dj108_byqseries_able() throws SQLException {

        logger.info("begin pro_dj108_byqseries_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj108_byqseries_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj108_byqseries_able");
        return result;
    }

    public HashMap pro_dj109_selectbyqtype(String series_class_in) throws SQLException {

        logger.info("begin pro_dj109_selectbyqtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_selectbyqtype(:series_class_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_selectbyqtype");
        return result;
    }

    public HashMap pro_dj109_addbyqtype(String BYQ_type_in, String describe_in) throws SQLException {

        logger.info("begin pro_dj109_addbyqtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_addbyqtype" + "(:BYQ_type_in,:describe_in,:ret,:ret_msg)}");
            cstmt.setString("BYQ_type_in", BYQ_type_in);
            cstmt.setString("describe_in", describe_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_addbyqtype");
        return result;
    }

    public HashMap pro_dj109_stopbyqtype(String byq_type_in) throws SQLException {

        logger.info("begin pro_dj109_stopbyqtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_stopbyqtype" + "(:byq_type_in,:ret)}");
            cstmt.setString("byq_type_in", byq_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_stopbyqtype");
        return result;
    }

    public HashMap pro_dj109_startbyqtype(String byq_type_in) throws SQLException {

        logger.info("begin pro_dj109_startbyqtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_startbyqtype" + "(:byq_type_in,:ret)}");
            cstmt.setString("byq_type_in", byq_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_startbyqtype");
        return result;
    }

    public HashMap pro_dj109_deletebyqtype(String byq_type_in) throws SQLException {

        logger.info("begin pro_dj109_deletebyqtype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_deletebyqtype" + "(:byq_type_in,:ret,:ret_msg)}");
            cstmt.setString("byq_type_in", byq_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_deletebyqtype");
        return result;
    }

    public HashMap pro_dj102_mendtype_able() throws SQLException {

        logger.info("begin pro_dj102_mendtype_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj102_mendtype_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj102_mendtype_able");
        return result;
    }

    public HashMap pro_dj109_byqtype_able(String byq_type_in) throws SQLException {

        logger.info("begin pro_dj109_byqtype_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj109_byqtype_able" + "(:byq_type_in,:ret)}");
            cstmt.setString("byq_type_in", byq_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj109_byqtype_able");
        return result;
    }

    public HashMap pro_dj110_selectbyqmendprice(String byq_series_in, String byq_type_in, String mendtype_in) throws SQLException {

        logger.info("begin pro_dj110_selectbyqmendprice");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj110_selectbyqmendprice" + "(:byq_series_in,:byq_type_in,:mendtype_in,:ret)}");
            cstmt.setString("byq_series_in", byq_series_in);
            cstmt.setString("byq_type_in", byq_type_in);
            cstmt.setString("mendtype_in", mendtype_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj110_selectbyqmendprice");
        return result;
    }


    public HashMap pro_dj110_addbyqmendprice(String BYQ_SERIES_in, String BYQ_TYPE_in, String MENDTYPE_in, String BYQ_VOL_in, String BYQ_XS_in,
                                             String BYQ_V_in, String F_PRICE_in, String REMARK_in) throws SQLException {

        logger.info("begin pro_dj110_addbyqmendprice");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj110_addbyqmendprice" + "(:BYQ_SERIES_in,:BYQ_TYPE_in,:MENDTYPE_in,:BYQ_VOL_in,:BYQ_XS_in," +
                    ":BYQ_V_in,:F_PRICE_in,:REMARK_in,:ret,:ret_msg)}");
            cstmt.setString("BYQ_SERIES_in", BYQ_SERIES_in);
            cstmt.setString("BYQ_TYPE_in", BYQ_TYPE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("BYQ_VOL_in", BYQ_VOL_in);
            cstmt.setString("BYQ_XS_in", BYQ_XS_in);
            cstmt.setString("BYQ_V_in", BYQ_V_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj110_addbyqmendprice");
        return result;
    }

    public HashMap pro_dj110_deletebyqmendprice(String id_in) throws SQLException {

        logger.info("begin pro_dj110_deletebyqmendprice");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj110_deletebyqmendprice" + "(:id_in,:ret,:ret_msg)}");
            cstmt.setString("id_in", id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj110_deletebyqmendprice");
        return result;
    }

    public HashMap pro_dj110_updatebyqmendprice(String ID_in, String BYQ_SERIES_in, String BYQ_TYPE_in, String MENDTYPE_in, String BYQ_VOL_in, String BYQ_XS_in,
                                                String BYQ_V_in, String F_PRICE_in, String REMARK_in) throws SQLException {

        logger.info("begin pro_dj110_updatebyqmendprice");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj110_updatebyqmendprice" + "(:ID_in,:BYQ_SERIES_in,:BYQ_TYPE_in,:MENDTYPE_in,:BYQ_VOL_in,:BYQ_XS_in," +
                    ":BYQ_V_in,:F_PRICE_in,:REMARK_in,:ret,:ret_msg)}");
            cstmt.setString("ID_in", ID_in);
            cstmt.setString("BYQ_SERIES_in", BYQ_SERIES_in);
            cstmt.setString("BYQ_TYPE_in", BYQ_TYPE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("BYQ_VOL_in", BYQ_VOL_in);
            cstmt.setString("BYQ_XS_in", BYQ_XS_in);
            cstmt.setString("BYQ_V_in", BYQ_V_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj110_updatebyqmendprice");
        return result;
    }


    public HashMap pro_dj101_mendcontext_able() throws SQLException {

        logger.info("begin pro_dj101_mendcontext_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj101_mendcontext_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj101_mendcontext_able");
        return result;
    }

    public HashMap pro_dj107_djtype_able(String dj_type_in) throws SQLException {

        logger.info("begin pro_dj107_djtype_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj107_djtype_able" + "(:dj_type_in,:ret)}");
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj107_djtype_able");
        return result;
    }

    public HashMap pro_dj111_selectdjmendprice_m(String series_class_in, String dj_type_in, String mendcontext_code_in) throws SQLException {

        logger.info("begin pro_dj111_selectdjmendprice_m");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj111_selectdjmendprice_m" + "(:series_class_in,:dj_type_in,:mendcontext_code_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.setString("mendcontext_code_in", mendcontext_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj111_selectdjmendprice_m");
        return result;
    }

    public HashMap pro_dj111_adddjmendprice_m(String DJ_TYPE_in, String DJ_VOL_in, String MENDCONTEXT_CODE_in, String F_PRICE_in, String REMARK_in, String SERIES_CLASS_in) throws SQLException {

        logger.info("begin pro_dj111_adddjmendprice_m");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj111_adddjmendprice_m" + "(:DJ_TYPE_in,:DJ_VOL_in,:MENDCONTEXT_CODE_in," +
                    ":F_PRICE_in,:REMARK_in,:SERIES_CLASS_in,:ret,:ret_msg)}");
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("MENDCONTEXT_CODE_in", MENDCONTEXT_CODE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj111_adddjmendprice_m");
        return result;
    }

    public HashMap pro_dj111_deletedjmendprice_m(String id_in) throws SQLException {

        logger.info("begin pro_dj111_deletedjmendprice_m");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj111_deletedjmendprice_m" + "(:id_in,:ret,:ret_msg)}");
            cstmt.setString("id_in", id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj111_deletedjmendprice_m");
        return result;
    }

    public HashMap pro_dj111_updatebyqmendprice_m(String ID_in, String DJ_TYPE_in, String DJ_VOL_in, String MENDCONTEXT_CODE_in, String F_PRICE_in, String REMARK_in, String SERIES_CLASS_in) throws SQLException {

        logger.info("begin pro_dj111_updatebyqmendprice_m");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj111_updatebyqmendprice_m" + "(:ID_in,:DJ_TYPE_in,:DJ_VOL_in,:MENDCONTEXT_CODE_in," +
                    ":F_PRICE_in,:REMARK_in,:SERIES_CLASS_in,:ret,:ret_msg)}");
            cstmt.setString("ID_in", ID_in);
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("MENDCONTEXT_CODE_in", MENDCONTEXT_CODE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj111_updatebyqmendprice_m");
        return result;
    }

    public HashMap pro_dj112_selectdjmendprice_jx(String series_class_in, String dj_type_in, String mendtype_in) throws SQLException {

        logger.info("begin pro_dj112_selectdjmendprice_jx");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj112_selectdjmendprice_jx" + "(:series_class_in,:dj_type_in,:mendtype_in,:ret)}");
            cstmt.setString("series_class_in", series_class_in);
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.setString("mendtype_in", mendtype_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj112_selectdjmendprice_jx");
        return result;
    }

    public HashMap pro_dj112_adddjmendprice_jx(String DJ_TYPE_in, String MENDTYPE_in, String F_PRICE_in, String DJ_VOL_in, String DJ_SX_in,
                                               String DJ_CS_in, String DJ_DZ_CS_in, String DJ_ZZ_CS_in, String SERIES_CLASS_in, String REMARK_in) throws SQLException {

        logger.info("begin pro_dj112_adddjmendprice_jx");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj112_adddjmendprice_jx" + "(:DJ_TYPE_in,:MENDTYPE_in,:F_PRICE_in,:DJ_VOL_in,:DJ_SX_in," +
                    ":DJ_CS_in,:DJ_DZ_CS_in,:DJ_ZZ_CS_in,:SERIES_CLASS_in,:REMARK_in,:ret,:ret_msg)}");
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("DJ_SX_in", DJ_SX_in);
            cstmt.setString("DJ_CS_in", DJ_CS_in);
            cstmt.setString("DJ_DZ_CS_in", DJ_DZ_CS_in);
            cstmt.setString("DJ_ZZ_CS_in", DJ_ZZ_CS_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.setString("REMARK_in", REMARK_in);

            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj112_adddjmendprice_jx");
        return result;
    }

    public HashMap pro_dj112_deletedjmendprice_jx(String id_in) throws SQLException {

        logger.info("begin pro_dj112_deletedjmendprice_jx");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj112_deletedjmendprice_jx" + "(:id_in,:ret,:ret_msg)}");
            cstmt.setString("id_in", id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj112_deletedjmendprice_jx");
        return result;
    }

    public HashMap pro_dj112_updatedjmendprice_jx(String ID_in, String DJ_TYPE_in, String MENDTYPE_in, String F_PRICE_in, String DJ_VOL_in, String DJ_SX_in,
                                                  String DJ_CS_in, String DJ_DZ_CS_in, String DJ_ZZ_CS_in, String SERIES_CLASS_in, String REMARK_in) throws SQLException {

        logger.info("begin pro_dj112_updatedjmendprice_jx");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj112_updatedjmendprice_jx" + "(:ID_in,:DJ_TYPE_in,:MENDTYPE_in,:F_PRICE_in,:DJ_VOL_in,:DJ_SX_in," +
                    ":DJ_CS_in,:DJ_DZ_CS_in,:DJ_ZZ_CS_in,:SERIES_CLASS_in,:REMARK_in,:ret,:ret_msg)}");
            cstmt.setString("ID_in", ID_in);
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("DJ_SX_in", DJ_SX_in);
            cstmt.setString("DJ_CS_in", DJ_CS_in);
            cstmt.setString("DJ_DZ_CS_in", DJ_DZ_CS_in);
            cstmt.setString("DJ_ZZ_CS_in", DJ_ZZ_CS_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj112_updatedjmendprice_jx");
        return result;
    }

    public HashMap pro_dj105_moneytype_able(String money_class_in) throws SQLException {

        logger.info("begin pro_dj105_moneytype_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj105_moneytype_able" + "(:money_class_in,:ret)}");
            cstmt.setString("money_class_in", money_class_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj105_moneytype_able");
        return result;
    }

    public HashMap pro_dj113_selectdjmendprice_p(String money_type_in, String projtype_desc_in, String mendtype_in) throws SQLException {

        logger.info("begin pro_dj113_selectdjmendprice_p");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj113_selectdjmendprice_p" + "(:money_type_in,:projtype_desc_in,:mendtype_in,:ret)}");
            cstmt.setString("money_type_in", money_type_in);
            cstmt.setString("projtype_desc_in", projtype_desc_in);
            cstmt.setString("mendtype_in", mendtype_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj113_selectdjmendprice_p");
        return result;
    }

    public HashMap pro_dj113_adddjmendprice_p(String PROJTYPE_DESC_id, String REMARK_in, String MONEY_TYPE_in, String F_PRICE_in, String MENDTYPE_in) throws SQLException {

        logger.info("begin pro_dj113_adddjmendprice_p");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj113_adddjmendprice_p" + "(:PROJTYPE_DESC_id,:REMARK_in,:MONEY_TYPE_in,:F_PRICE_in,:MENDTYPE_in," +
                    ":ret,:ret_msg)}");
            cstmt.setString("PROJTYPE_DESC_id", PROJTYPE_DESC_id);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.setString("MONEY_TYPE_in", MONEY_TYPE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);

            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj113_adddjmendprice_p");
        return result;
    }

    public HashMap pro_dj113_deletedjmendprice_p(String projtype_id_in) throws SQLException {

        logger.info("begin pro_dj113_deletedjmendprice_p");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj113_deletedjmendprice_p" + "(:projtype_id_in,:ret,:ret_msg)}");
            cstmt.setString("projtype_id_in", projtype_id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj113_deletedjmendprice_p");
        return result;
    }

    public HashMap pro_dj113_updatedjmendprice_p(String PROJTYPE_ID_in, String PROJTYPE_DESC_in, String REMARK_in, String MONEY_TYPE_in, String F_PRICE_in, String MENDTYPE_in) throws SQLException {

        logger.info("begin pro_dj113_updatedjmendprice_p");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj113_updatedjmendprice_p" + "(:PROJTYPE_ID_in,:PROJTYPE_DESC_in,:REMARK_in,:MONEY_TYPE_in,:F_PRICE_in,:MENDTYPE_in," +
                    ":ret,:ret_msg)}");
            cstmt.setString("PROJTYPE_ID_in", PROJTYPE_ID_in);
            cstmt.setString("PROJTYPE_DESC_in", PROJTYPE_DESC_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.setString("MONEY_TYPE_in", MONEY_TYPE_in);
            cstmt.setString("F_PRICE_in", F_PRICE_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj113_updatedjmendprice_p");
        return result;
    }

    public HashMap pro_dj103_gstype_able() throws SQLException {

        logger.info("begin pro_dj103_gstype_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj103_gstype_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj103_gstype_able");
        return result;
    }

    public HashMap pro_dj115_setclass_able() throws SQLException {

        logger.info("begin pro_dj115_setclass_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_setclass_able(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_setclass_able");
        return result;
    }

    public HashMap pro_dj114_selectdjdingecost(String money_type_in, String mendtype_in, String gs_type_in,
                                               String set_id_in, String series_class_in, String dj_type_in) throws SQLException {

        logger.info("begin pro_dj114_selectdjdingecost");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj114_selectdjdingecost" + "(:money_type_in,:mendtype_in,:gs_type_in," +
                    ":set_id_in,:series_class_in,:dj_type_in,:ret)}");
            cstmt.setString("money_type_in", money_type_in);
            cstmt.setString("mendtype_in", mendtype_in);
            cstmt.setString("gs_type_in", gs_type_in);
            cstmt.setString("set_id_in", set_id_in);
            cstmt.setString("series_class_in", series_class_in);
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj114_selectdjdingecost");
        return result;
    }

    public HashMap pro_dj114_adddjdingecost(String DJ_TYPE_CODE_in, String DJ_TYPE_in, String DJ_VOL_in, String DJ_V_in, String DJ_CS_in,
                                            String DJ_DXTYPE_in, String DJ_WEIGHT_in, String MENDTYPE_in, String GS_TYPE_in, String GS_PRICE_in,
                                            String MONEY_TYPE_in, String MOENY_PRICE_in, String SERIES_CLASS_in, String SET_ID_in) throws SQLException {

        logger.info("begin pro_dj114_adddjdingecost");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj114_adddjdingecost" + "(:DJ_TYPE_CODE_in,:DJ_TYPE_in,:DJ_VOL_in,:DJ_V_in,:DJ_CS_in," +
                    ":DJ_DXTYPE_in,:DJ_WEIGHT_in,:MENDTYPE_in,:GS_TYPE_in,:GS_PRICE_in," +
                    ":MONEY_TYPE_in,:MOENY_PRICE_in,:SERIES_CLASS_in,:SET_ID_in,:ret,:ret_msg)}");
            cstmt.setString("DJ_TYPE_CODE_in", DJ_TYPE_CODE_in);
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("DJ_V_in", DJ_V_in);
            cstmt.setString("DJ_CS_in", DJ_CS_in);

            cstmt.setString("DJ_DXTYPE_in", DJ_DXTYPE_in);
            cstmt.setString("DJ_WEIGHT_in", DJ_WEIGHT_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("GS_TYPE_in", GS_TYPE_in);
            cstmt.setString("GS_PRICE_in", GS_PRICE_in);

            cstmt.setString("MONEY_TYPE_in", MONEY_TYPE_in);
            cstmt.setString("MOENY_PRICE_in", MOENY_PRICE_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.setString("SET_ID_in", SET_ID_in);

            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj114_adddjdingecost");
        return result;
    }

    public HashMap pro_dj114_deletedingecost(String id_in) throws SQLException {

        logger.info("begin pro_dj114_deletedingecost");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj114_deletedingecost" + "(:id_in,:ret,:ret_msg)}");
            cstmt.setString("id_in", id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj114_deletedingecost");
        return result;
    }

    public HashMap pro_dj114_updatedjdingecost(String ID_in, String DJ_TYPE_CODE_in, String DJ_TYPE_in, String DJ_VOL_in, String DJ_V_in, String DJ_CS_in,
                                               String DJ_DXTYPE_in, String DJ_WEIGHT_in, String MENDTYPE_in, String GS_TYPE_in, String GS_PRICE_in,
                                               String MONEY_TYPE_in, String MOENY_PRICE_in, String SERIES_CLASS_in, String SET_ID_in) throws SQLException {

        logger.info("begin pro_dj114_updatedjdingecost");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj114_updatedjdingecost" + "(:ID_in,:DJ_TYPE_CODE_in,:DJ_TYPE_in,:DJ_VOL_in,:DJ_V_in,:DJ_CS_in," +
                    ":DJ_DXTYPE_in,:DJ_WEIGHT_in,:MENDTYPE_in,:GS_TYPE_in,:GS_PRICE_in," +
                    ":MONEY_TYPE_in,:MOENY_PRICE_in,:SERIES_CLASS_in,:SET_ID_in,:ret,:ret_msg)}");
            cstmt.setString("ID_in", ID_in);
            cstmt.setString("DJ_TYPE_CODE_in", DJ_TYPE_CODE_in);
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);
            cstmt.setString("DJ_V_in", DJ_V_in);
            cstmt.setString("DJ_CS_in", DJ_CS_in);

            cstmt.setString("DJ_DXTYPE_in", DJ_DXTYPE_in);
            cstmt.setString("DJ_WEIGHT_in", DJ_WEIGHT_in);
            cstmt.setString("MENDTYPE_in", MENDTYPE_in);
            cstmt.setString("GS_TYPE_in", GS_TYPE_in);
            cstmt.setString("GS_PRICE_in", GS_PRICE_in);

            cstmt.setString("MONEY_TYPE_in", MONEY_TYPE_in);
            cstmt.setString("MOENY_PRICE_in", MOENY_PRICE_in);
            cstmt.setString("SERIES_CLASS_in", SERIES_CLASS_in);
            cstmt.setString("SET_ID_in", SET_ID_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj114_updatedjdingecost");
        return result;
    }

    public HashMap pro_dj115_selectsetclass() throws SQLException {

        logger.info("begin pro_dj115_selectsetclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_selectsetclass(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_selectsetclass");
        return result;
    }

    public HashMap pro_dj115_addsetclass(String SET_ID_in, String SET_DESC_in) throws SQLException {

        logger.info("begin pro_dj115_addsetclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_addsetclass" + "(:SET_ID_in,:SET_DESC_in,:ret,:ret_msg)}");
            cstmt.setString("SET_ID_in", SET_ID_in);
            cstmt.setString("SET_DESC_in", SET_DESC_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_addsetclass");
        return result;
    }

    public HashMap pro_dj115_deletesetclass(String set_id_in) throws SQLException {

        logger.info("begin pro_dj115_deletesetclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_deletesetclass" + "(:set_id_in,:ret,:ret_msg)}");
            cstmt.setString("set_id_in", set_id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_deletesetclass");
        return result;
    }

    public HashMap pro_dj115_startsetclass(String set_status_in) throws SQLException {

        logger.info("begin pro_dj115_startsetclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_startsetclass" + "(:set_status_in,:ret)}");
            cstmt.setString("set_status_in", set_status_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_startsetclass");
        return result;
    }

    public HashMap pro_dj115_stopsetclass(String set_status_in) throws SQLException {

        logger.info("begin pro_dj115_stopsetclass");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj115_stopsetclass" + "(:set_status_in,:ret)}");
            cstmt.setString("set_status_in", set_status_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj115_stopsetclass");
        return result;
    }

    public HashMap pro_dj201_workstatus() throws SQLException {

        logger.info("begin pro_dj201_workstatus");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_workstatus(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_workstatus");
        return result;
    }

    public HashMap pro_dj201_djmainlist(String plantcode_in,String departcode_in, String dj_series_class_in,String loc_plantcode_in,
                                        String dj_loc_in, String work_status_in, String dj_name_in,
                                        String dj_unique_code_in, String dj_code_in,String dj_type_in, String dj_vol_in) throws SQLException {

        logger.info("begin pro_dj201_djmainlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_djmainlist" + "(:plantcode_in,:departcode_in,:dj_series_class_in,:loc_plantcode_in," +
                    ":dj_loc_in,:work_status_in,:dj_name_in,:dj_unique_code_in,:dj_code_in,:dj_type_in,:dj_vol_in,:ret)}");
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("departcode_in", departcode_in);
            cstmt.setString("dj_series_class_in", dj_series_class_in);
            cstmt.setString("loc_plantcode_in", loc_plantcode_in);
            cstmt.setString("dj_loc_in", dj_loc_in);
            cstmt.setString("work_status_in", work_status_in);
            cstmt.setString("dj_name_in", dj_name_in);
            cstmt.setString("dj_unique_code_in", dj_unique_code_in);
            cstmt.setString("dj_code_in", dj_code_in);
            cstmt.setString("dj_type_in", dj_type_in);
            cstmt.setString("dj_vol_in", dj_vol_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_djmainlist");
        return result;
    }

    public HashMap pro_dj201_djmaindetail(String dj_unique_code_in) throws SQLException {

        logger.info("begin pro_dj201_djmaindetail");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_djmaindetail" + "(:dj_unique_code_in,:ret)}");
            cstmt.setString("dj_unique_code_in", dj_unique_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_djmaindetail");
        return result;
    }

    public HashMap pro_dj201_adddjmain(String DJ_UNIQUE_CODE_in, String DJ_NAME_in, String DJ_TYPE_in, String DJ_SERIES_CLASS_in, String DJ_VOL_in,
                                       String DJ_V_in, String DJ_CS_in, String DJ_DXTYPE_in, String DJ_WEIGHT_in, String DJ_CS_DZ_in,
                                       String DJ_CS_ZZ_in, String WORK_STATUS_in, String PLANTCODE_in, String PLANTNAME_in, String DEPARTCODE_in,
                                       String DEPARTNAME_in, String LOC_PLANTCODE_in, String LOC_PLANTNAME_in, String DJ_LOC_in, String REMARK_in,
                                       Date INSERTDATE_in, String DZ_V_in, String DZ_A_in, String ZZ_V_in, String ZZ_A_in,
                                       String W_YINSHU_in, String EDZS_in, String JXFS_in, String JYDJ_in, String SUPPLY_CODE_in,
                                       String SUPPLY_NAME_in, Date PRODUCE_DATE_in, String USERID_IN, String USERNAME_IN, String djcode_in,
                                       Date bx_date_in, String loc_departcode_in, String loc_departname_in) throws SQLException {

        logger.info("begin pro_dj201_adddjmain");
        java.sql.Date sql_INSERTDATE_in = new java.sql.Date(INSERTDATE_in.getTime());
        java.sql.Date sql_PRODUCE_DATE_in = new java.sql.Date(PRODUCE_DATE_in.getTime());
        java.sql.Date sql_bx_date_in = new java.sql.Date(bx_date_in.getTime());
       /* String dateString = "2012-12-06 ";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd ");
        java.util.Date da_INSERTDATE_in = sdf.parse(dateString);
        Date da_PRODUCE_DATE_in = sdf.parse(PRODUCE_DATE_in);
        Date da_bx_date_in = sdf.parse(bx_date_in);*/

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_adddjmain" + "(:DJ_UNIQUE_CODE_in,:DJ_NAME_in,:DJ_TYPE_in,:DJ_SERIES_CLASS_in,:DJ_VOL_in," +
                    ":DJ_V_in,:DJ_CS_in,:DJ_DXTYPE_in,:DJ_WEIGHT_in,:DJ_CS_DZ_in," +
                    ":DJ_CS_ZZ_in,:WORK_STATUS_in,:PLANTCODE_in,:PLANTNAME_in,:DEPARTCODE_in," +
                    ":DEPARTNAME_in,:LOC_PLANTCODE_in,:LOC_PLANTNAME_in,:DJ_LOC_in,:REMARK_in," +
                    ":INSERTDATE_in,:DZ_V_in,:DZ_A_in,:ZZ_V_in,:ZZ_A_in," +
                    ":W_YINSHU_in,:EDZS_in,:JXFS_in,:JYDJ_in,:SUPPLY_CODE_in," +
                    ":SUPPLY_NAME_in,:PRODUCE_DATE_in,:USERID_IN,:USERNAME_IN,:djcode_in," +
                    ":bx_date_in,:loc_departcode_in,:loc_departname_in,:ret,:ret_msg)}");
            cstmt.setString("DJ_UNIQUE_CODE_in", DJ_UNIQUE_CODE_in);
            cstmt.setString("DJ_NAME_in", DJ_NAME_in);
            cstmt.setString("DJ_TYPE_in", DJ_TYPE_in);
            cstmt.setString("DJ_SERIES_CLASS_in", DJ_SERIES_CLASS_in);
            cstmt.setString("DJ_VOL_in", DJ_VOL_in);

            cstmt.setString("DJ_V_in", DJ_V_in);
            cstmt.setString("DJ_CS_in", DJ_CS_in);
            cstmt.setString("DJ_DXTYPE_in", DJ_DXTYPE_in);
            cstmt.setString("DJ_WEIGHT_in", DJ_WEIGHT_in);
            cstmt.setString("DJ_CS_DZ_in", DJ_CS_DZ_in);

            cstmt.setString("DJ_CS_ZZ_in", DJ_CS_ZZ_in);
            cstmt.setString("WORK_STATUS_in", WORK_STATUS_in);
            cstmt.setString("PLANTCODE_in", PLANTCODE_in);
            cstmt.setString("PLANTNAME_in", PLANTNAME_in);
            cstmt.setString("DEPARTCODE_in", DEPARTCODE_in);

            cstmt.setString("DEPARTNAME_in", DEPARTNAME_in);
            cstmt.setString("LOC_PLANTCODE_in", LOC_PLANTCODE_in);
            cstmt.setString("LOC_PLANTNAME_in", LOC_PLANTNAME_in);
            cstmt.setString("DJ_LOC_in", DJ_LOC_in);
            cstmt.setString("REMARK_in", REMARK_in);

            cstmt.setDate("INSERTDATE_in", sql_INSERTDATE_in);
            cstmt.setString("DZ_V_in", DZ_V_in);
            cstmt.setString("DZ_A_in", DZ_A_in);
            cstmt.setString("ZZ_V_in", ZZ_V_in);
            cstmt.setString("ZZ_A_in", ZZ_A_in);

            cstmt.setString("W_YINSHU_in", W_YINSHU_in);
            cstmt.setString("EDZS_in", EDZS_in);
            cstmt.setString("JXFS_in", JXFS_in);
            cstmt.setString("JYDJ_in", JYDJ_in);
            cstmt.setString("SUPPLY_CODE_in", SUPPLY_CODE_in);

            cstmt.setString("SUPPLY_NAME_in", SUPPLY_NAME_in);
            cstmt.setDate("PRODUCE_DATE_in", sql_PRODUCE_DATE_in);
            cstmt.setString("USERID_IN", USERID_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("djcode_in", djcode_in);

            cstmt.setDate("bx_date_in", sql_bx_date_in);
            cstmt.setString("loc_departcode_in", loc_departcode_in);
            cstmt.setString("loc_departname_in", loc_departname_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_adddjmain");
        return result;
    }

    public HashMap pro_dj201_updateworkstatus(String dj_unique_code_in,String WORK_STATUS_in,String OP_USERID_in,String OP_USERNAME_in,String REMARK_in) throws SQLException {

        logger.info("begin pro_dj201_updateworkstatus");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_updateworkstatus" + "(:dj_unique_code_in,:WORK_STATUS_in,:OP_USERID_in,:OP_USERNAME_in,:REMARK_in,:ret,:ret_msg)}");
            cstmt.setString("dj_unique_code_in", dj_unique_code_in);
            cstmt.setString("WORK_STATUS_in", WORK_STATUS_in);
            cstmt.setString("OP_USERID_in", OP_USERID_in);
            cstmt.setString("OP_USERNAME_in", OP_USERNAME_in);
            cstmt.setString("REMARK_in", REMARK_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            String ret_msg = (String) cstmt.getObject("ret_msg");
            result.put("ret", ret);
            result.put("ret_msg", ret_msg);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_updateworkstatus");
        return result;
    }

    public HashMap pro_dj201_djoplog(String dj_unique_code_in) throws SQLException {

        logger.info("begin pro_dj201_djoplog");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_djoplog" + "(:dj_unique_code_in,:ret)}");
            cstmt.setString("dj_unique_code_in", dj_unique_code_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_djoplog");
        return result;
    }

    public HashMap pro_dj201_djmendrecord(String a_dj_unique_code) throws SQLException {

        logger.info("begin pro_dj201_djmendrecord");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj201_djmendrecord" + "(:a_dj_unique_code,:ret)}");
            cstmt.setString("a_dj_unique_code", a_dj_unique_code);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj201_djmendrecord");
        return result;
    }

    public HashMap pro_dj301_byqmainlist(String plantCode,String deptCode,String type_in,String save_code,String save_location,
                                         String run_state,String generator_name,String generator_code,String generator_Version) throws SQLException {

        logger.info("begin pro_dj301_byqmainlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_byqmainlist" + "(:plantCode,:deptCode,:type_in,:save_code,:save_location," +
                    ":run_state,:generator_name,:a_dj_unique_code,:generator_Version,:ret)}");
            cstmt.setString("plantCode", plantCode);
            cstmt.setString("deptCode", deptCode);
            cstmt.setString("type_in", type_in);
            cstmt.setString("save_code", save_code);
            cstmt.setString("save_location", save_location);
            cstmt.setString("run_state", run_state);
            cstmt.setString("generator_name", generator_name);
            cstmt.setString("generator_code", generator_code);
            cstmt.setString("generator_Version", generator_Version);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_byqmainlist");
        return result;
    }

    public HashMap pro_dj301_updateworkstatus(String key_code,String run_state,String user_code,String user_name,String edit_explain) throws SQLException {

        logger.info("begin pro_dj301_updateworkstatus");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_updateworkstatus" + "(:key_code,:run_state,:user_code,:user_name,:edit_explain,:ret)}");
            cstmt.setString("key_code", key_code);
            cstmt.setString("run_state", run_state);
            cstmt.setString("user_code", user_code);
            cstmt.setString("user_name", user_name);
            cstmt.setString("edit_explain", edit_explain);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_updateworkstatus");
        return result;
    }

    public HashMap pro_dj301_addbyqmain(String BYQ_UNIQUE_CODE_in, String BYQ_NAME_in, String SUPPLY_CODE_in, String BYQ_V_in, String QSZL_in,
                                        String BYQ_SERIES_in, String BYQ_SERIES_NAME_in, String BYQ_TYPE_in, String SUPPLY_NAME_in, String BYQ_A_in,
                                        String YZ_in, String PLANTCODE_in, String PLANTNAME_in, String DEPARTCODE_in,String DEPARTNAME_in,
                                        String PRODUCE_DATE_in, String LJZBH_in, String ZZ_in,  String LOC_PLANTCODE_in, String LOC_PLANTNAME_in,
                                        String DJ_LOC_in, String BYQ_VOL_in, String ZKDY_in,String KZSH_in, String LQFS_in,
                                        String SYTJ_in, String DLSH_in,String KZDL_in,  String WORK_STATUS_in, String REMARK_in,
                                        String USERCODE_in, String USERNAME_in) throws SQLException {

        logger.info("begin pro_dj301_addbyqmain");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_addbyqmain" + "(:BYQ_UNIQUE_CODE_in,:BYQ_NAME_in,:SUPPLY_CODE_in,:BYQ_V_in,:QSZL_in," +
                    ":BYQ_SERIES_in,:BYQ_SERIES_NAME_in,:BYQ_TYPE_in,:SUPPLY_NAME_in,:BYQ_A_in," +
                    ":YZ_in,:PLANTCODE_in,:PLANTNAME_in,:DEPARTCODE_in,:DEPARTNAME_in," +
                    ":PRODUCE_DATE_in,:LJZBH_in,:ZZ_in,:LOC_PLANTCODE_in,:LOC_PLANTNAME_in," +
                    ":DJ_LOC_in,:BYQ_VOL_in,:ZKDY_in,:KZSH_in,:LQFS_in," +
                    ":SYTJ_in,:DLSH_in,:KZDL_in,:WORK_STATUS_in,:REMARK_in," +
                    ":USERCODE_in,:USERNAME_in,:ret)}");

            cstmt.setString("BYQ_UNIQUE_CODE_in", BYQ_UNIQUE_CODE_in);
            cstmt.setString("BYQ_NAME_in", BYQ_NAME_in);
            cstmt.setString("SUPPLY_CODE_in", SUPPLY_CODE_in);
            cstmt.setString("BYQ_V_in", BYQ_V_in);
            cstmt.setString("QSZL_in", QSZL_in);

            cstmt.setString("BYQ_SERIES_in", BYQ_SERIES_in);
            cstmt.setString("BYQ_SERIES_NAME_in", BYQ_SERIES_NAME_in);
            cstmt.setString("BYQ_TYPE_in", BYQ_TYPE_in);
            cstmt.setString("SUPPLY_NAME_in", SUPPLY_NAME_in);
            cstmt.setString("BYQ_A_in", BYQ_A_in);

            cstmt.setString("YZ_in", YZ_in);
            cstmt.setString("PLANTCODE_in", PLANTCODE_in);
            cstmt.setString("PLANTNAME_in", PLANTNAME_in);
            cstmt.setString("DEPARTCODE_in", DEPARTCODE_in);
            cstmt.setString("DEPARTNAME_in", DEPARTNAME_in);

            cstmt.setString("PRODUCE_DATE_in", PRODUCE_DATE_in);
            cstmt.setString("LJZBH_in", LJZBH_in);
            cstmt.setString("ZZ_in", ZZ_in);
            cstmt.setString("LOC_PLANTCODE_in", LOC_PLANTCODE_in);
            cstmt.setString("LOC_PLANTNAME_in", LOC_PLANTNAME_in);

            cstmt.setString("DJ_LOC_in", DJ_LOC_in);
            cstmt.setString("BYQ_VOL_in", BYQ_VOL_in);
            cstmt.setString("ZKDY_in", ZKDY_in);
            cstmt.setString("KZSH_in", KZSH_in);
            cstmt.setString("LQFS_in", LQFS_in);

            cstmt.setString("SYTJ_in", SYTJ_in);
            cstmt.setString("DLSH_in", DLSH_in);
            cstmt.setString("KZDL_in", KZDL_in);
            cstmt.setString("WORK_STATUS_in", WORK_STATUS_in);
            cstmt.setString("REMARK_in", REMARK_in);

            cstmt.setString("USERCODE_in", USERCODE_in);
            cstmt.setString("USERNAME_in", USERNAME_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_addbyqmain");
        return result;
    }

    public HashMap pro_dj301_byqoplog(String key_code) throws SQLException {

        logger.info("begin pro_dj301_byqoplog");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_byqoplog" + "(:key_code,:ret)}");
            cstmt.setString("key_code", key_code);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_byqoplog");
        return result;
    }

    public HashMap pro_dj301_byqmaindetail(String key_code) throws SQLException {

        logger.info("begin pro_dj301_byqmaindetail");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_byqmaindetail" + "(:key_code,:ret)}");
            cstmt.setString("key_code", key_code);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_byqmaindetail");
        return result;
    }

    public HashMap pro_dj301_updatebyqmain(String BYQ_UNIQUE_CODE_in, String BYQ_NAME_in, String SUPPLY_CODE_in, String BYQ_V_in, String QSZL_in,
                                           String BYQ_SERIES_in, String BYQ_SERIES_NAME_in, String BYQ_TYPE_in, String SUPPLY_NAME_in, String BYQ_A_in,
                                           String YZ_in, String PLANTCODE_in, String PLANTNAME_in, String DEPARTCODE_in,String DEPARTNAME_in,
                                           String PRODUCE_DATE_in, String LJZBH_in, String ZZ_in,  String LOC_PLANTCODE_in, String LOC_PLANTNAME_in,
                                           String DJ_LOC_in, String BYQ_VOL_in, String ZKDY_in,String KZSH_in, String LQFS_in,
                                           String SYTJ_in, String DLSH_in,String KZDL_in,  String WORK_STATUS_in, String REMARK_in,
                                           String USERCODE_in, String USERNAME_in) throws SQLException {

        logger.info("begin pro_dj301_updatebyqmain");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj301_updatebyqmain" + "(:BYQ_UNIQUE_CODE_in,:BYQ_NAME_in,:SUPPLY_CODE_in,:BYQ_V_in,:QSZL_in," +
                    ":BYQ_SERIES_in,:BYQ_SERIES_NAME_in,:BYQ_TYPE_in,:SUPPLY_NAME_in,:BYQ_A_in," +
                    ":YZ_in,:PLANTCODE_in,:PLANTNAME_in,:DEPARTCODE_in,:DEPARTNAME_in," +
                    ":PRODUCE_DATE_in,:LJZBH_in,:ZZ_in,:LOC_PLANTCODE_in,:LOC_PLANTNAME_in," +
                    ":DJ_LOC_in,:BYQ_VOL_in,:ZKDY_in,:KZSH_in,:LQFS_in," +
                    ":SYTJ_in,:DLSH_in,:KZDL_in,:WORK_STATUS_in,:REMARK_in," +
                    ":USERCODE_in,:USERNAME_in,:ret)}");

            cstmt.setString("BYQ_UNIQUE_CODE_in", BYQ_UNIQUE_CODE_in);
            cstmt.setString("BYQ_NAME_in", BYQ_NAME_in);
            cstmt.setString("SUPPLY_CODE_in", SUPPLY_CODE_in);
            cstmt.setString("BYQ_V_in", BYQ_V_in);
            cstmt.setString("QSZL_in", QSZL_in);

            cstmt.setString("BYQ_SERIES_in", BYQ_SERIES_in);
            cstmt.setString("BYQ_SERIES_NAME_in", BYQ_SERIES_NAME_in);
            cstmt.setString("BYQ_TYPE_in", BYQ_TYPE_in);
            cstmt.setString("SUPPLY_NAME_in", SUPPLY_NAME_in);
            cstmt.setString("BYQ_A_in", BYQ_A_in);

            cstmt.setString("YZ_in", YZ_in);
            cstmt.setString("PLANTCODE_in", PLANTCODE_in);
            cstmt.setString("PLANTNAME_in", PLANTNAME_in);
            cstmt.setString("DEPARTCODE_in", DEPARTCODE_in);
            cstmt.setString("DEPARTNAME_in", DEPARTNAME_in);

            cstmt.setString("PRODUCE_DATE_in", PRODUCE_DATE_in);
            cstmt.setString("LJZBH_in", LJZBH_in);
            cstmt.setString("ZZ_in", ZZ_in);
            cstmt.setString("LOC_PLANTCODE_in", LOC_PLANTCODE_in);
            cstmt.setString("LOC_PLANTNAME_in", LOC_PLANTNAME_in);

            cstmt.setString("DJ_LOC_in", DJ_LOC_in);
            cstmt.setString("BYQ_VOL_in", BYQ_VOL_in);
            cstmt.setString("ZKDY_in", ZKDY_in);
            cstmt.setString("KZSH_in", KZSH_in);
            cstmt.setString("LQFS_in", LQFS_in);

            cstmt.setString("SYTJ_in", SYTJ_in);
            cstmt.setString("DLSH_in", DLSH_in);
            cstmt.setString("KZDL_in", KZDL_in);
            cstmt.setString("WORK_STATUS_in", WORK_STATUS_in);
            cstmt.setString("REMARK_in", REMARK_in);

            cstmt.setString("USERCODE_in", USERCODE_in);
            cstmt.setString("USERNAME_in", USERNAME_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj301_updatebyqmain");
        return result;
    }

    public HashMap pro_dj401_applylist(String plantcode_in,String departcode_in,String usercode_in) throws SQLException {

        logger.info("begin pro_dj401_applylist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_applylist" + "(:plantcode_in,:departcode_in,:usercode_in,:ret)}");
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("departcode_in", departcode_in);
            cstmt.setString("usercode_in", usercode_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_applylist");
        return result;
    }

    public HashMap pro_dj401_submitapply(String applyid_in) throws SQLException {

        logger.info("begin pro_dj401_submitapply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_submitapply" + "(:applyid_in,:ret)}");

            cstmt.setString("applyid_in", applyid_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_submitapply");
        return result;
    }

    public HashMap pro_dj401_deleteapply(String applyid_in) throws SQLException {

        logger.info("begin pro_dj401_deleteapply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_deleteapply" + "(:applyid_in,:ret)}");

            cstmt.setString("applyid_in", applyid_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_deleteapply");
        return result;
    }

    public HashMap pro_dj401_mendplant() throws SQLException {

        logger.info("begin pro_dj401_mendplant");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_mendplant" + "(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_mendplant");
        return result;
    }

    public HashMap pro_mm_itype() throws SQLException {

        logger.info("begin pro_mm_itype");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_mm_itype" + "(:ret)}");
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_mm_itype");
        return result;
    }

    public HashMap pro_dj401_getapplyorderid(String a_plantcode) throws SQLException {

        logger.info("begin pro_dj401_getapplyorderid");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_dj401.getapplyorderid" + "(:a_plantcode,:ret)}");

            cstmt.setString("a_plantcode", a_plantcode);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_getapplyorderid");
        return result;
    }

    public HashMap pro_dj401_applymatlist(String applyid_in) throws SQLException {

        logger.info("begin pro_dj401_applymatlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_applymatlist" + "(:applyid_in,:ret)}");
            cstmt.setString("applyid_in", applyid_in);
            cstmt.registerOutParameter("ret", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("ret")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_applymatlist");
        return result;
    }

    public HashMap pro_dj401_applysave(String applyid_in, String plantcode_in, String plantname_in, String departcode_in, String departname_in,
                                       String usercode_in, String username_in, String billcode_in, String dj_uq_code_in, String djname_in,
                                       String context_in, Date begindate_in, Date enddate_in, String v_plantcodejs, String remark_in,
                                       String djcode_in, String confirm_flag_in, String mend_type_in) throws SQLException {

        logger.info("begin pro_dj401_applysave");
        java.sql.Date sql_begindate_in = new java.sql.Date(begindate_in.getTime());
        java.sql.Date sql_enddate_in = new java.sql.Date(enddate_in.getTime());

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_applysave" + "(:applyid_in,:plantcode_in,:plantname_in,:departcode_in,:departname_in," +
                    ":usercode_in,:username_in,:billcode_in,:dj_uq_code_in,:djname_in," +
                    ":context_in,:begindate_in,:enddate_in,:v_plantcodejs,:remark_in," +
                    ":djcode_in,:confirm_flag_in,:mend_type_in,:ret)}");
            cstmt.setString("applyid_in", applyid_in);
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("plantname_in", plantname_in);
            cstmt.setString("departcode_in", departcode_in);
            cstmt.setString("departname_in", departname_in);

            cstmt.setString("usercode_in", usercode_in);
            cstmt.setString("username_in", username_in);
            cstmt.setString("billcode_in", billcode_in);
            cstmt.setString("dj_uq_code_in", dj_uq_code_in);
            cstmt.setString("djname_in", djname_in);

            cstmt.setString("context_in", context_in);
            cstmt.setDate("begindate_in", sql_begindate_in);
            cstmt.setDate("enddate_in", sql_enddate_in);
            cstmt.setString("v_plantcodejs", v_plantcodejs);
            cstmt.setString("remark_in", remark_in);

            cstmt.setString("djcode_in", djcode_in);
            cstmt.setString("confirm_flag_in", confirm_flag_in);
            cstmt.setString("mend_type_in", mend_type_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_applysave");
        return result;
    }

    public HashMap pro_dj401_deleteapplymat(String id_in) throws SQLException {

        logger.info("begin pro_dj401_deleteapplymat");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_deleteapplymat" + "(:id_in,:ret)}");

            cstmt.setString("id_in", id_in);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_deleteapplymat");
        return result;
    }


    public HashMap pro_dj401_addapplymat(String matcode_in,String matname_in,String etalon_in,String matcl_in,String unit_in,
                                         String fprice_in,String amount_in,String kcid_in,String applyid_in) throws SQLException {

        logger.info("begin pro_dj401_addapplymat");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj401_addapplymat" + "(:matcode_in,:matname_in,:etalon_in,:matcl_in,:unit_in," +
                    ":fprice_in,:amount_in,:kcid_in,:applyid_in,:ret)}");

            cstmt.setString("matcode_in", matcode_in);
            cstmt.setString("matname_in", matname_in);
            cstmt.setString("etalon_in", etalon_in);
            cstmt.setString("matcl_in", matcl_in);
            cstmt.setString("unit_in", unit_in);

            cstmt.setString("fprice_in", fprice_in);
            cstmt.setString("amount_in", amount_in);
            cstmt.setString("kcid_in", kcid_in);
            cstmt.setString("applyid_in", applyid_in);

            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("ret");
            result.put("ret", ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj401_addapplymat");
        return result;
    }

}
