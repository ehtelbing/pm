package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Created by lxm on 2017/12/11.
 */
@Service
public class ZpfService {
    private static final Logger logger = Logger.getLogger(ZpfService.class.getName());

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

    //厂矿编码
    public HashMap PRO_MM_PLANT() throws SQLException {
        logger.info("begin PRO_MM_PLANT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call NAMM.PRO_MM_PLANT" + "(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_PLANT");
        return result;
    }

    //部门编码
    public HashMap PRO_MM_DEPART(String A_PLANTCODE) throws SQLException {

        logger.info("begin PRO_MM_DEPART");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call NAMM.PRO_MM_DEPART" + "(:A_PLANTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
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
        logger.info("end PRO_MM_DEPART");
        return result;
    }

    //试验地点编号
    public HashMap pro_sy103_loc_able(String plantcode_in, String departcode_in) throws SQLException {

        logger.info("begin pro_sy103_loc_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy103_loc_able" + "(:plantcode_in,:departcode_in,:ret)}");
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("departcode_in", departcode_in);
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
        logger.info("end pro_sy103_loc_able");
        return result;
    }

    //表格数据
    public HashMap pro_sy104_equlist(String plantcode_in, String departcode_in, String loccode_in) throws SQLException {

        logger.info("begin pro_sy104_equlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_equlist" + "(:plantcode_in,:departcode_in,:loccode_in,:ret)}");
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("departcode_in", departcode_in);
            cstmt.setString("loccode_in", loccode_in);
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
        logger.info("end pro_sy104_equlist");
        return result;
    }

    //新增
    public HashMap pro_sy104_addequ(String equcode_in, String equname_in, String plantcode_in, String plantname_in, String departcode_in,
                                    String departname_in, String loccode_in, String locname_in) throws SQLException {

        logger.info("begin pro_sy104_addequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_addequ" + "(:equcode_in,:equname_in,:plantcode_in,:plantname_in,:departcode_in,:departname_in,:loccode_in,:locname_in,:ret,:ret_msg)}");
            cstmt.setString("equcode_in", equcode_in);
            cstmt.setString("equname_in", equname_in);
            cstmt.setString("plantcode_in", plantcode_in);
            cstmt.setString("plantname_in", plantname_in);
            cstmt.setString("departcode_in", departcode_in);
            cstmt.setString("departname_in", departname_in);
            cstmt.setString("loccode_in", loccode_in);
            cstmt.setString("locname_in", locname_in);
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
        logger.info("end pro_sy104_addequ");
        return result;
    }

    //修改
    public HashMap pro_sy104_updateequ(String equcode_in, String equname_in) throws SQLException {

        logger.info("begin pro_sy104_updateequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_updateequ" + "(:equcode_in,:equname_in,:ret)}");
            cstmt.setString("equcode_in", equcode_in);
            cstmt.setString("equname_in", equname_in);
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
        logger.info("end pro_sy104_updateequ");
        return result;
    }

    //删除
    public HashMap pro_sy104_deleteequ(String equcode_in) throws SQLException {

        logger.info("begin pro_sy104_deleteequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_deleteequ" + "(:equcode_in,:ret,:ret_msg)}");
            cstmt.setString("equcode_in", equcode_in);
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
        logger.info("end pro_sy104_deleteequ");
        return result;
    }

    //启用
    public HashMap pro_sy104_startequ(String equcode_in) throws SQLException {

        logger.info("begin pro_sy104_startequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_startequ" + "(:equcode_in,:ret)}");
            cstmt.setString("equcode_in", equcode_in);
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
        logger.info("end pro_sy104_startequ");
        return result;
    }

    //停用
    public HashMap pro_sy104_stopequ(String equcode_in) throws SQLException {

        logger.info("begin pro_sy104_stopequ");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy104_stopequ" + "(:equcode_in,:ret)}");
            cstmt.setString("equcode_in", equcode_in);
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
        logger.info("end pro_sy104_stopequ");
        return result;
    }

    //试验记录状态查询
    public HashMap pro_sy105_recordstatuslist() throws SQLException {

        logger.info("begin pro_sy105_recordstatuslist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_sy105_recordstatuslist" + "(:ret)}");
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
        logger.info("end pro_sy105_recordstatuslist");
        return result;
    }

    //试验人员管理查询
    public HashMap pg_sy106_syuserlist(String a_plantcode, String a_departcode, String a_loc_code) throws SQLException {

        logger.info("begin syuserlist");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.syuserlist" + "(:a_plantcode,:a_departcode,:a_loc_code,:ret)}");
            cstmt.setString("a_plantcode", a_plantcode);
            cstmt.setString("a_departcode", a_departcode);
            cstmt.setString("a_loc_code", a_loc_code);
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
        logger.info("end syuserlist");
        return result;
    }

    //试验人员管理新增
    public HashMap pg_sy106_addsyuser(String a_usercode, String a_username, String a_plantcode, String a_deptcode, String a_loc_code,
                                      String a_sts, String a_plantname, String a_deptname, String a_loc_name) throws SQLException {

        logger.info("begin pg_sy106.addsyuser");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.addsyuser" + "(:a_usercode,:a_username,:a_plantcode,:a_deptcode,:a_loc_code,:a_sts,:a_plantname,:a_deptname,:a_loc_name,:ret,:ret_msg)}");
            cstmt.setString("a_usercode", a_usercode);
            cstmt.setString("a_username", a_username);
            cstmt.setString("a_plantcode", a_plantcode);
            cstmt.setString("a_deptcode", a_deptcode);
            cstmt.setString("a_loc_code", a_loc_code);
            cstmt.setString("a_sts", a_sts);
            cstmt.setString("a_plantname", a_plantname);
            cstmt.setString("a_deptname", a_deptname);
            cstmt.setString("a_loc_name", a_loc_name);
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
        logger.info("end pg_sy106.addsyuser");
        return result;
    }

    //试验人员管理修改
    public HashMap pg_sy106_updatesyuser(String a_usercode, String a_username, String a_plantcode, String a_deptcode, String a_loc_code,
                                         String a_sts, String a_plantname, String a_deptname, String a_loc_name) throws SQLException {

        logger.info("begin pg_sy106.updatesyuser");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.updatesyuser" + "(:a_usercode,:a_username,:a_plantcode,:a_deptcode,:a_loc_code," +
                    ":a_sts,:a_plantname,:a_deptname,:a_loc_name,:ret,:ret_msg)}");
            cstmt.setString("a_usercode", a_usercode);
            cstmt.setString("a_username", a_username);
            cstmt.setString("a_plantcode", a_plantcode);
            cstmt.setString("a_deptcode", a_deptcode);
            cstmt.setString("a_loc_code", a_loc_code);
            cstmt.setString("a_sts", a_sts);
            cstmt.setString("a_plantname", a_plantname);
            cstmt.setString("a_deptname", a_deptname);
            cstmt.setString("a_loc_name", a_loc_name);
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
        logger.info("end pg_sy106.updatesyuser");
        return result;
    }

    //试验人员管理表删除
    public HashMap pg_sy106_deletesyuser(String a_usercode) throws SQLException {

        logger.info("begin pg_sy106.deletesyuser");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.deletesyuser" + "(:a_usercode,:ret,:ret_msg)}");
            cstmt.setString("a_usercode", a_usercode);
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
        logger.info("end pg_sy106.deletesyuser");
        return result;
    }

    //试验人员管理表启用
    public HashMap pg_sy106_startsyuser(String a_usercode) throws SQLException {

        logger.info("begin pg_sy106.startsyuser");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.startsyuser" + "(:a_usercode,:ret,:ret_msg)}");
            cstmt.setString("a_usercode", a_usercode);
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
        logger.info("end pg_sy106.startsyuser");
        return result;
    }

    //试验人员管理表停用
    public HashMap pg_sy106_stopsyuser(String a_usercode) throws SQLException {

        logger.info("begin pg_sy106.stopsyuser");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pg_sy106.stopsyuser" + "(:a_usercode,:ret,:ret_msg)}");
            cstmt.setString("a_usercode", a_usercode);
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
        logger.info("end pg_sy106.stopsyuser");
        return result;
    }

    // 电机类型
    public HashMap pro_dj106_djseries_able() throws SQLException {

        logger.info("begin pro_dj106_djseries_able");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj106_djseries_able" + "(:ret)}");
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
        logger.info("end pro_dj106_djseries_able");
        return result;
    }

    // 检修部门
    public HashMap pro_dj501_menddept_dept(String jxplantcode_in, String usercode_in) throws SQLException {

        logger.info("begin pro_dj501_menddept_dept");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj501_menddept_dept" + "(:jxplantcode_in,:usercode_in,:ret)}");
            cstmt.setString("jxplantcode_in", jxplantcode_in);
            cstmt.setString("usercode_in", usercode_in);
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
        logger.info("end pro_dj501_menddept_dept");
        return result;
    }

    // 检修班组
    public HashMap pro_dj601_menddept_group(String deptcode_in) throws SQLException {

        logger.info("begin pro_dj601_menddept_group");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_dj601_menddept_group" + "(:deptcode_in,:ret)}");
            cstmt.setString("deptcode_in", deptcode_in);
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
        logger.info("end pro_dj601_menddept_group");
        return result;
    }

    //表格数据
    public HashMap PG_DJ604_GETDJMENDTABLE(String A_DATETYPE, Date A_BEGINDATE, Date A_ENDDATE, String A_DJ_SERIES_CLASS, String A_ORDERID,
                                           String A_SENDPLANT, String A_PLANT, String A_DEPT, String A_GROUP) throws SQLException {

        logger.info("BEGIN PG_DJ604.GETDJMENDTABLE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ604.GETDJMENDTABLE" + "(:A_DATETYPE,:A_BEGINDATE,:A_ENDDATE,:A_DJ_SERIES_CLASS,:A_ORDERID," +
                    ":A_SENDPLANT,:A_PLANT,:A_DEPT,:A_GROUP,:RET)}");
            cstmt.setString("A_DATETYPE", A_DATETYPE);
            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_DJ_SERIES_CLASS", A_DJ_SERIES_CLASS);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_SENDPLANT", A_SENDPLANT);
            cstmt.setString("A_PLANT", A_PLANT);
            cstmt.setString("A_DEPT", A_DEPT);
            cstmt.setString("A_GROUP", A_GROUP);
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
        logger.info("end PG_DJ604.GETDJMENDTABLE");
        return result;
    }

    public HashMap PRO_QUERYLUBRECORD(Date X_TIMELOWERLIMIT, Date X_TIMEUPPERLIMIT, String X_DEPTCODE,
                                      String X_EQUTYPECODE, String X_EQUCODE,String X_LUBRICATIONCODE,String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_QUERYLUBRECORD");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_QUERYLUBRECORD" + "(:X_TIMELOWERLIMIT,:X_TIMEUPPERLIMIT,:X_DEPTCODE,:X_EQUTYPECODE,:X_EQUCODE,:X_LUBRICATIONCODE,:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTTYPE,:O_CURSOR)}");
            cstmt.setDate("X_TIMELOWERLIMIT", X_TIMELOWERLIMIT);
            cstmt.setDate("X_TIMEUPPERLIMIT", X_TIMEUPPERLIMIT);
            cstmt.setString("X_DEPTCODE", X_DEPTCODE);
            cstmt.setString("X_EQUTYPECODE", X_EQUTYPECODE);
            cstmt.setString("X_EQUCODE", X_EQUCODE);
            cstmt.setString("X_LUBRICATIONCODE", X_LUBRICATIONCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("O_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("O_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_QUERYLUBRECORD");
        return result;
    }

    //
    public HashMap pro_addlubrecord(String x_deptcode, String x_equcode, String x_setname, String x_lubaddress, String x_lubmode, String x_lubtrademark,
                                    int x_lubcount, int x_oilamount, String x_addorchange, java.util.Date x_operatedate, String x_operateperson, String x_operatereason, int x_unit) throws SQLException {

        logger.info("begin pro_addlubrecord");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date sqlDate1 = new Date(x_operatedate.getTime());
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_addlubrecord" + "(:x_deptcode,:x_equcode,:x_setname,:x_lubaddress,:x_lubmode," +
                    ":x_lubtrademark,:x_lubcount,:x_oilamount,:x_addorchange,:x_operatedate,:x_operateperson,:x_operatereason,:x_unit)}");
            cstmt.setString("x_deptcode", x_deptcode);
            cstmt.setString("x_equcode", x_equcode);
            cstmt.setString("x_setname", x_setname);
            cstmt.setString("x_lubaddress", x_lubaddress);
            cstmt.setString("x_lubmode", x_lubmode);
            cstmt.setString("x_lubtrademark", x_lubtrademark);
            cstmt.setInt("x_lubcount", x_lubcount);
            cstmt.setInt("x_oilamount", x_oilamount);
            cstmt.setString("x_addorchange", x_addorchange);
            cstmt.setDate("x_operatedate", sqlDate1);
            cstmt.setString("x_operateperson", x_operateperson);
            cstmt.setString("x_operatereason", x_operatereason);
            cstmt.setInt("x_unit", x_unit);

            cstmt.execute();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_addlubrecord");
        return result;
    }

    //
    public HashMap droplist_lubmode() throws SQLException {
        logger.info("begin droplist_lubmode");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call droplist_lubmode" + "(:o_cursor)}");
            cstmt.registerOutParameter("o_cursor", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("o_cursor")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end droplist_lubmode");
        return result;
    }

    //
    public HashMap droplist_lubaddtype() throws SQLException {
        logger.info("begin droplist_lubaddtype");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call droplist_lubaddtype" + "(:o_cursor)}");
            cstmt.registerOutParameter("o_cursor", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("o_cursor")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end droplist_lubaddtype");
        return result;
    }

    public HashMap pro_alterlubrecord(String x_setname, String x_lubaddress, String x_lubmode, String x_lubtrademark, int x_lubcount, int x_oilamount,
                                      String x_addorchange, java.util.Date x_operatedate, String x_operateperson, String x_operatereason, int x_unit, String x_lubricationcode) throws SQLException {

        logger.info("begin pro_alterlubrecord");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date sqlDate1 = new Date(x_operatedate.getTime());
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_alterlubrecord" + "(:x_setname,:x_lubaddress,:x_lubmode,:x_lubtrademark,:x_lubcount," +
                    ":x_oilamount,:x_addorchange,:x_operatedate,:x_operateperson,:x_operatereason,:x_unit,:x_lubricationcode)}");
            cstmt.setString("x_setname", x_setname);
            cstmt.setString("x_lubaddress", x_lubaddress);
            cstmt.setString("x_lubmode", x_lubmode);
            cstmt.setString("x_lubtrademark", x_lubtrademark);
            cstmt.setInt("x_lubcount", x_lubcount);

            cstmt.setInt("x_oilamount", x_oilamount);
            cstmt.setString("x_addorchange", x_addorchange);
            cstmt.setDate("x_operatedate", sqlDate1);
            cstmt.setString("x_operateperson", x_operateperson);
            cstmt.setString("x_operatereason", x_operatereason);
            cstmt.setInt("x_unit", x_unit);
            cstmt.setString("x_lubricationcode", x_lubricationcode);

            cstmt.execute();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_alterlubrecord");
        return result;
    }

    public HashMap pro_dellubrecord(String x_lubricationcode) throws SQLException {

        logger.info("begin pro_dellubrecord");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_dellubrecord" + "(:x_lubricationcode)}");
            cstmt.setString("x_lubricationcode", x_lubricationcode);
            cstmt.execute();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dellubrecord");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_OLD_NC(String V_V_PLANTCODE, String V_V_DEPARTCODE, String V_V_MATERIALCODE,
                                      String V_V_MATERIALNAME, String V_V_AMOUNT, String V_V_SOURCECODE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_OLD_NC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_OLD_NC" + "(:V_V_PLANTCODE,:V_V_DEPARTCODE,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_V_AMOUNT,:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
            cstmt.setString("V_V_AMOUNT", V_V_AMOUNT);
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
        logger.info("end PRO_PM_WORKORDER_OLD_NC");
        return result;
    }

    public HashMap PM_WORKORDER_OLD_UPD(String V_V_PERCODE , String V_V_ORDERGUID, String V_V_SHORT_TXT, String
            V_D_START_DATE, String V_D_FINISH_DATE, String V_V_WBS, String V_V_WBS_TXT, String V_V_DEPTCODEREPARIR,
                                         String V_V_TOOL, String V_V_TECHNOLOGY, String V_V_SAFE) throws SQLException {
        logger.info("begin PM_WORKORDER_OLD_UPD");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_OLD_UPD" + "(:V_V_PERCODE," +
                    ":V_V_ORDERGUID,:V_V_SHORT_TXT,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT,:V_V_DEPTCODEREPARIR," +
                    ":V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_OLD_UPD");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_OLD_HI_SEL(String V_BEGINTIME, String V_ENDTIME,
                                           String V_MAT_NO, String V_MAT_DESC, String V_V_SOURCECODE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_OLD_HI_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_OLD_HI_SEL" + "(:V_BEGINTIME,:V_ENDTIME,:V_MAT_NO,:V_MAT_DESC,:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_BEGINTIME", V_BEGINTIME);
            cstmt.setString("V_ENDTIME", V_ENDTIME);
            cstmt.setString("V_MAT_NO", V_MAT_NO);
            cstmt.setString("V_MAT_DESC", V_MAT_DESC);
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
        logger.info("end PRO_PM_WORKORDER_OLD_HI_SEL");
        return result;
    }

    public HashMap PRO_PM_PLAN_WEEK_WORKORDER_GET(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_PLAN_WEEK_WORKORDER_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_WEEK_WORKORDER_GET" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_PLAN_WEEK_WORKORDER_GET");
        return result;
    }
}
