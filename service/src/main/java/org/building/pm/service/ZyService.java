package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ZyService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {//遍历游标

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

    public HashMap PRO_RUN7111_EQULIST(String V_V_PLANTCODE, String V_V_DEPTCODE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN7111_EQULIST");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7111_EQULIST" + "(:V_V_PLANTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
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
        logger.info("end PRO_RUN7111_EQULIST");
        return result;
    }

    public HashMap PRO_BASE_DEPT_VIEW(String IS_V_DEPTCODE, String IS_V_DEPTTYPE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_BASE_DEPT_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW" + "(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("IS_V_DEPTCODE", IS_V_DEPTCODE);
            cstmt.setString("IS_V_DEPTTYPE", IS_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW");
        return result;
    }

    public HashMap PRO_RUN_SITE_BJ_ALL(String IN_EQUID, String IN_PLANT, String IN_DEPART, String IN_STATUS, String IN_BJCODE, String IN_BJDESC) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN_SITE_BJ_ALL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_ALL" + "(:IN_EQUID,:IN_PLANT,:IN_DEPART,:IN_STATUS,:IN_BJCODE,:IN_BJDESC,:V_CURSOR)}");
            cstmt.setString("IN_EQUID", IN_EQUID);
            cstmt.setString("IN_PLANT", IN_PLANT);
            cstmt.setString("IN_DEPART", IN_DEPART);
            cstmt.setString("IN_STATUS", IN_STATUS);
            cstmt.setString("IN_BJCODE", IN_BJCODE);
            cstmt.setString("IN_BJDESC", IN_BJDESC);
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
        logger.info("end PRO_RUN_SITE_BJ_ALL");
        return result;
    }

    public HashMap PRO_RUN7110_SITESUPPLYLIST(String A_ID, String A_MATERIALCODE, String A_ORDERID) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN7110_SITESUPPLYLIST");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7110_SITESUPPLYLIST" + "(:A_ID,:A_MATERIALCODE,:A_ORDERID,:V_CURSOR)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end PRO_RUN7110_SITESUPPLYLIST");
        return result;
    }

    public HashMap PRO_RUN7113_ORDERMATLIST(String V_DEPT_CODE, String V_EQUIP_CODE, String V_MATERIALCODE, String V_MATERIALNAME) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN7113_ORDERMATLIST");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_ORDERMATLIST" + "(:V_DEPT_CODE,:V_EQUIP_CODE,:V_MATERIALCODE,:V_MATERIALNAME,:OUT_CURSOR)}");
            cstmt.setString("V_DEPT_CODE", V_DEPT_CODE);
            cstmt.setString("V_EQUIP_CODE", V_EQUIP_CODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.registerOutParameter("OUT_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7113_ORDERMATLIST");
        return result;
    }

    public HashMap PG_RUN7113_GETORDERMATBARCODE(String A_ORDERID, String A_MATERIALCODE) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PG_RUN7113_GETORDERMATBARCODE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_RUN7113_GETORDERMATBARCODE" + "(:A_ORDERID,:A_MATERIALCODE,:V_CURSOR)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
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
        logger.info("end PG_RUN7113_GETORDERMATBARCODE");
        return result;
    }

    public List<Map> pro_run7111_addlog(String v_v_bjcode, String v_v_checktime, String v_v_checkcount, InputStream v_v_file, String v_v_filename,
                                        String v_v_usercode, String v_v_username, String v_v_tagid, String v_v_siteid, String v_v_tagvalue) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_run7111_addlog" + "(:v_v_bjcode,:v_v_checktime,:v_v_checkcount,:v_v_file,:v_v_filename," +
                    ":v_v_usercode,:v_v_username,:v_v_tagid,:v_v_siteid,:v_v_tagvalue,:ret_msg,:ret)}");

            cstmt.setString("v_v_bjcode", v_v_bjcode);
            cstmt.setDate("v_v_checktime", Date.valueOf(v_v_checktime));
            cstmt.setString("v_v_checkcount", v_v_checkcount);
            cstmt.setBinaryStream("v_v_file", v_v_file);
            cstmt.setString("v_v_filename", v_v_filename);

            cstmt.setString("v_v_usercode", v_v_usercode);
            cstmt.setString("v_v_username", v_v_username);
            cstmt.setString("v_v_tagid", v_v_tagid);
            cstmt.setString("v_v_siteid", v_v_siteid);
            cstmt.setString("v_v_tagvalue", v_v_tagvalue);
            cstmt.registerOutParameter("ret_msg", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("ret");
            Map sledata = new HashMap();
            sledata.put("ret", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7111_addlog");
        return result;
    }

    public HashMap PRO_RUN7113_CHANGEORDERMAT(String A_ID, String SITE_ID, String a_change_amount, String V_EQUIP_NO, String USERID,
                                              String USERNAME, String PLANTCODE, String WORKAREA, String CHANGEDATE, String V_MATERIALCODE,
                                              String a_supplycode, String a_supplyname, String a_uniquecode, String a_replacedate, String a_faultreason,
                                              String A_REASON_REMARK) throws SQLException {

        logger.info("begin PRO_RUN7113_CHANGEORDERMAT");
        //java.sql.Date sql_CHANGEDATE = new java.sql.Date(CHANGEDATE.getTime());
        //java.sql.Date sql_a_replacedate = new java.sql.Date(a_replacedate.getTime());
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7113_CHANGEORDERMAT" + "(:A_ID,:SITE_ID,:a_change_amount,:V_EQUIP_NO,:USERID," +
                    ":USERNAME,:PLANTCODE,:WORKAREA,:CHANGEDATE,:V_MATERIALCODE," +
                    ":a_supplycode,:a_supplyname,:a_uniquecode,:a_replacedate,:a_faultreason,:A_REASON_REMARK,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("SITE_ID", SITE_ID);
            cstmt.setString("a_change_amount", a_change_amount);
            cstmt.setString("V_EQUIP_NO", V_EQUIP_NO);
            cstmt.setString("USERID", USERID);

            cstmt.setString("USERNAME", USERNAME);
            cstmt.setString("PLANTCODE", PLANTCODE);
            cstmt.setString("WORKAREA", WORKAREA);
            //cstmt.setDate("CHANGEDATE", sql_CHANGEDATE);//cstmt.setDate("v_v_checktime", Date.valueOf(v_v_checktime));
            cstmt.setDate("CHANGEDATE", Date.valueOf(CHANGEDATE));
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);

            cstmt.setString("a_supplycode", a_supplycode);
            cstmt.setString("a_supplyname", a_supplyname);
            cstmt.setString("a_uniquecode", a_uniquecode);
           // cstmt.setDate("a_replacedate", sql_a_replacedate);
            cstmt.setDate("a_replacedate", Date.valueOf(a_replacedate));
            cstmt.setString("a_faultreason", a_faultreason);

            cstmt.setString("A_REASON_REMARK", A_REASON_REMARK);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String RET = (String) cstmt.getObject("RET");
            result.put("RET", RET);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7113_CHANGEORDERMAT");
        return result;
    }

    public HashMap PRO_RUN_CYCLE_ABLE() throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN_CYCLE_ABLE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ABLE" + "(:RET)}");
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
        logger.info("end PRO_RUN_CYCLE_ABLE");
        return result;
    }

    public HashMap PRO_RUN7130_SELECTBJTIME(String V_PLANTCODE, String V_DEPARTCODE,String V_SUPPLY_CODE, String V_MATERIALNAME,String D_BEGIN_DATE, String D_END_DATE,String V_CYCLE_ID) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN7130_SELECTBJTIME");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7130_SELECTBJTIME" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_SUPPLY_CODE,:V_MATERIALNAME,:D_BEGIN_DATE,:D_END_DATE,:V_CYCLE_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            //cstmt.setString("D_BEGIN_DATE", D_BEGIN_DATE);//cstmt.setDate("CHANGEDATE", Date.valueOf(CHANGEDATE));
            cstmt.setDate("D_BEGIN_DATE", Date.valueOf(D_BEGIN_DATE));
            //cstmt.setString("D_END_DATE", D_END_DATE);
            cstmt.setDate("D_END_DATE", Date.valueOf(D_END_DATE));
            cstmt.setString("V_CYCLE_ID", V_CYCLE_ID);
            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7130_SELECTBJTIME");
        return result;
    }

    public HashMap PRO_RUN7132_ORDERMATLIST(String V_D_FACT_START_DATE, String V_D_FACT_FINISH_DATE,String V_V_PLANT, String V_V_DEPTCODE,String V_V_EQUIP_NO, String V_V_ORDERGUID,String V_V_MATERIALCODE, String V_V_MATERIALNAME) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_RUN7132_ORDERMATLIST");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7132_ORDERMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            //cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);// cstmt.setDate("D_BEGIN_DATE", Date.valueOf(D_BEGIN_DATE));
            cstmt.setDate("V_D_FACT_START_DATE", Date.valueOf(V_D_FACT_START_DATE));
            //cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setDate("V_D_FACT_FINISH_DATE", Date.valueOf(V_D_FACT_FINISH_DATE));
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
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
        logger.info("end PRO_RUN7132_ORDERMATLIST");
        return result;
    }

    public HashMap PRO_NO7132_DEPARTMATLIST(String V_D_FACT_START_DATE, String V_D_FACT_FINISH_DATE,String V_V_PLANT, String V_V_DEPTCODE,String V_V_EQUIP_NO, String V_V_ORDERGUID,String V_V_MATERIALCODE, String V_V_MATERIALNAME) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SET");
        logger.info("begin PRO_NO7132_DEPARTMATLIST");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_NO7132_DEPARTMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);// cstmt.setDate("D_BEGIN_DATE", Date.valueOf(D_BEGIN_DATE));
            //cstmt.setDate("V_D_FACT_START_DATE", Date.valueOf(V_D_FACT_START_DATE));
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            //cstmt.setDate("V_D_FACT_FINISH_DATE", Date.valueOf(V_D_FACT_FINISH_DATE));
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
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
        logger.info("end PRO_NO7132_DEPARTMATLIST");
        return result;
    }


}
