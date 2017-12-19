package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Created by LL on 2017/12/8.
 */
@Service
public class LLService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

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
                                rs.getString(i) == null ? "" : rs.getString(i).toString().replaceAll("\\n", ""));
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }

    public HashMap PRO_DJ801_SELECT(String V_MODELNAME) throws SQLException {

        logger.info("begin PRO_DJ801_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ801_SELECT(:V_MODELNAME,:V_CURSOR)}");
            cstmt.setString("V_MODELNAME", V_MODELNAME);
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
        logger.info("end PRO_DJ801_SELECT");
        return result;
    }

    public HashMap PRO_DJ801_SELECTET(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ801_SELECTET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ801_SELECTET(:V_MODELCODE,:V_CURSOR)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
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
        logger.info("end PRO_DJ801_SELECTET");
        return result;
    }

    public HashMap PRO_DJ801_SELECTMET(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ801_SELECTMET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ801_SELECTMET(:V_MODELCODE,:V_CURSOR)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
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
        logger.info("end PRO_DJ801_SELECTMET");
        return result;
    }

    public HashMap PRO_DJ802_SELECT(String V_MODELNAME) throws SQLException {

        logger.info("begin PRO_DJ802_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_SELECT(:V_MODELNAME,:V_CURSOR)}");
            cstmt.setString("V_MODELNAME", V_MODELNAME);
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
        logger.info("end PRO_DJ802_SELECT");
        return result;
    }

    public HashMap PRO_DJ802_INSERT(String V_MODELCODE, String V_MODELNAME, String V_USERID, String V_USERNAME, java.util.Date V_INSERTDATE, String V_USERFLAG, String V_REMARK) throws SQLException {

        logger.info("begin PRO_DJ802_INSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(V_INSERTDATE.getTime());
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_INSERT(:V_MODELCODE, :V_MODELNAME, :V_USERID, :V_USERNAME, :V_INSERTDATE, :V_USERFLAG, :V_REMARK, :RET)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
            cstmt.setString("V_MODELNAME", V_MODELNAME);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setDate("V_INSERTDATE", SQLDATE1);
            cstmt.setString("V_USERFLAG", V_USERFLAG);
            cstmt.setString("V_REMARK", V_REMARK);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_INSERT");
        return result;
    }

    public HashMap PRO_DJ802_DELETE(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ802_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_DELETE(:V_MODELCODE,:RET)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_DELETE");
        return result;
    }

    public HashMap PRO_DJ802_GXSELECT(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ802_GXSELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_GXSELECT(:V_MODELCODE,:V_CURSOR)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
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
        logger.info("end PRO_DJ802_GXSELECT");
        return result;
    }

    public HashMap PRO_DJ802_GXDELETE(String V_MODELETID) throws SQLException {

        logger.info("begin PRO_DJ802_GXDELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_GXDELETE(:V_MODELETID,:RET)}");
            cstmt.setString("V_MODELETID", V_MODELETID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_GXDELETE");
        return result;
    }


    public HashMap PRO_DJ802_GXDROPLIST() throws SQLException {

        logger.info("begin PRO_DJ802_GXDROPLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_GXDROPLIST(:V_CURSOR)}");
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
        logger.info("end PRO_DJ802_GXDROPLIST");
        return result;
    }


    public HashMap PRO_DJ802_GXINSERT(String V_ETNO, String V_MODELCODE, String V_ETCONTEXT, Double V_PLANWORKTIME, Integer V_PLANPERSON, String V_PERETID) throws SQLException {

        logger.info("begin PRO_DJ802_GXINSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_GXINSERT(:V_ETNO, :V_MODELCODE, :V_ETCONTEXT, :V_PLANWORKTIME, :V_PLANPERSON, :V_PERETID,:RET)}");
            cstmt.setString("V_ETNO", V_ETNO);
            cstmt.setString("V_MODELCODE", V_MODELCODE);
            cstmt.setString("V_ETCONTEXT", V_ETCONTEXT);
            cstmt.setDouble("V_PLANWORKTIME", V_PLANWORKTIME);
            cstmt.setInt("V_PLANPERSON", V_PLANPERSON);
            cstmt.setString("V_PERETID", V_PERETID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_GXINSERT");
        return result;
    }

    public HashMap PRO_DJ802_WHSELECT(String V_MODELCODE) throws SQLException {

        logger.info("begin PRO_DJ802_WHSELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_WHSELECT(:V_MODELCODE,:V_CURSOR)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
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
        logger.info("end PRO_DJ802_WHSELECT");
        return result;
    }

    public HashMap PRO_DJ802_WHDELETE(String V_MODELMATID) throws SQLException {

        logger.info("begin PRO_DJ802_WHDELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_WHDELETE(:V_MODELMATID,:RET)}");
            cstmt.setString("V_MODELMATID", V_MODELMATID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_WHDELETE");
        return result;
    }

    public HashMap PRO_DJ802_WHINSERT(String V_MODELCODE, String V_MATERIALCODE, String V_MATERIALNAME, String V_ETALON, String V_MATCL, String V_UNIT, Double V_F_PRICE, Double V_PLAN_AMOUNT) throws SQLException {

        logger.info("begin PRO_DJ802_WHINSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ802_WHINSERT(:V_MODELCODE, :V_MATERIALCODE, :V_MATERIALNAME, :V_ETALON, :V_MATCL, :V_UNIT, :V_F_PRICE, :V_PLAN_AMOUNT,:RET)}");
            cstmt.setString("V_MODELCODE", V_MODELCODE);
            cstmt.setString("V_MATERIALCODE", V_MATERIALCODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.setString("V_ETALON", V_ETALON);
            cstmt.setString("V_MATCL", V_MATCL);
            cstmt.setString("V_UNIT", V_UNIT);
            cstmt.setDouble("V_F_PRICE", V_F_PRICE);
            cstmt.setDouble("V_PLAN_AMOUNT", V_PLAN_AMOUNT);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ802_WHINSERT");
        return result;
    }

    public HashMap PRO_DJ901_ORDERSTATU_END(String USERCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ901_ORDERSTATU_END");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ901_ORDERSTATU_END(:USERCODE_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
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
        logger.info("end PRO_DJ901_ORDERSTATU_END");
        return result;
    }

    public HashMap PRO_DJ602_MENDDEPT_POWER(String USERCODE_IN, String ORDER_STATUS_IN) throws SQLException {

        logger.info("begin PRO_DJ602_MENDDEPT_POWER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ602_MENDDEPT_POWER(:USERCODE_IN, :ORDER_STATUS_IN, :RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("ORDER_STATUS_IN", ORDER_STATUS_IN);
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
        logger.info("end PRO_DJ602_MENDDEPT_POWER");
        return result;
    }

    public HashMap PRO_DJ901_SELECTORDERLIST(String ORDERID_IN, java.util.Date STARTDATE_IN,java.util.Date ENDDATE_IN ,
                                             String ORDER_STATUS_IN, String MENDDEPT_CODE_IN, String DJ_UQ_CODE_IN, String DJ_NAME) throws SQLException {

        logger.info("begin PRO_DJ901_SELECTORDERLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(STARTDATE_IN.getTime());
        Date SQLDATE2 = new Date(ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ901_SELECTORDERLIST(:ORDERID_IN, :STARTDATE_IN, :ENDDATE_IN , :ORDER_STATUS_IN, :MENDDEPT_CODE_IN, :DJ_UQ_CODE_IN, :DJ_NAME, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setDate("STARTDATE_IN", SQLDATE1);
            cstmt.setDate("ENDDATE_IN", SQLDATE2);
            cstmt.setString("ORDER_STATUS_IN", ORDER_STATUS_IN);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME", DJ_NAME);
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
        logger.info("end PRO_DJ901_SELECTORDERLIST");
        return result;
    }

    public HashMap PRO_DJ901_INPUTCOST(String ORDERID_IN, String COST_ITEM_IN, String COST_MONEY_IN, String INSERT_USERID_IN,String INSERT_USERNAME_IN) throws SQLException {

        logger.info("begin PRO_DJ901_INPUTCOST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ901_INPUTCOST(:ORDERID_IN, :COST_ITEM_IN, :COST_MONEY_IN, :INSERT_USERID_IN, :INSERT_USERNAME_IN, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setString("COST_ITEM_IN", COST_ITEM_IN);
            cstmt.setString("COST_MONEY_IN", COST_MONEY_IN);
            cstmt.setString("INSERT_USERID_IN", INSERT_USERID_IN);
            cstmt.setString("INSERT_USERNAME_IN", INSERT_USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ901_INPUTCOST");
        return result;
    }

    public HashMap PRO_DJ901_DELETECOST(String ID_IN) throws SQLException {

        logger.info("begin PRO_DJ901_DELETECOST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ901_DELETECOST(:ID_IN, :RET)}");
            cstmt.setString("ID_IN", ID_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ901_DELETECOST");
        return result;
    }

    public HashMap PRO_DJ901_COSTLIST(String ORDERID_IN) throws SQLException {

        logger.info("begin PRO_DJ901_COSTLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ901_COSTLIST(:ORDERID_IN, :TOTAL, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.registerOutParameter("TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("TOTAL"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ901_COSTLIST");
        return result;
    }

    public HashMap PRO_DJ603_MENDDEPT(String USERCODE_IN, String PLANTCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ603_MENDDEPT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ603_MENDDEPT(:USERCODE_IN, :PLANTCODE_IN, :RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
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
        logger.info("end PRO_DJ603_MENDDEPT");
        return result;
    }

    public HashMap PRO_DJ902_APPLYPLANTCOST(String ORDERID_IN,  java.util.Date STARTDATE_IN, java.util.Date ENDDATE_IN ,
                                            String MENDDEPT_CODE_IN, String APPLY_PLANT_IN, String DJ_UQ_CODE_IN, String DJ_NAME_IN) throws SQLException {

        logger.info("begin PRO_DJ902_APPLYPLANTCOST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(STARTDATE_IN.getTime());
        Date SQLDATE2 = new Date(ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ902_APPLYPLANTCOST(:ORDERID_IN, :STARTDATE_IN, :ENDDATE_IN, :MENDDEPT_CODE_IN, :APPLY_PLANT_IN, :DJ_UQ_CODE_IN, :DJ_NAME_IN, :TOTAL, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setDate("STARTDATE_IN", SQLDATE1);
            cstmt.setDate("ENDDATE_IN", SQLDATE2);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("APPLY_PLANT_IN", APPLY_PLANT_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.registerOutParameter("TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("TOTAL"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ902_APPLYPLANTCOST");
        return result;
    }

    public HashMap PRO_DJ902_MENDDEPTCOST(String ORDERID_IN,java.util.Date STARTDATE_IN, java.util.Date ENDDATE_IN ,
                                          String MENDDEPT_CODE_IN, String APPLY_PLANT_IN, String DJ_UQ_CODE_IN, String DJ_NAME_IN) throws SQLException {

        logger.info("begin PRO_DJ902_MENDDEPTCOST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(STARTDATE_IN.getTime());
        Date SQLDATE2 = new Date(ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ902_MENDDEPTCOST(:ORDERID_IN, :STARTDATE_IN, :ENDDATE_IN, :MENDDEPT_CODE_IN, :APPLY_PLANT_IN, :DJ_UQ_CODE_IN, :DJ_NAME_IN, :TOTAL, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setDate("STARTDATE_IN", SQLDATE1);
            cstmt.setDate("ENDDATE_IN", SQLDATE2);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("APPLY_PLANT_IN", APPLY_PLANT_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.registerOutParameter("TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("TOTAL"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ902_MENDDEPTCOST");
        return result;
    }

    public HashMap PRO_DJ902_ORDERCOST(String ORDERID_IN,  java.util.Date STARTDATE_IN, java.util.Date ENDDATE_IN ,
                                       String MENDDEPT_CODE_IN, String APPLY_PLANT_IN, String DJ_UQ_CODE_IN, String DJ_NAME_IN) throws SQLException {

        logger.info("begin PRO_DJ902_ORDERCOST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(STARTDATE_IN.getTime());
        Date SQLDATE2 = new Date(ENDDATE_IN.getTime());
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ902_ORDERCOST(:ORDERID_IN, :STARTDATE_IN, :ENDDATE_IN, :MENDDEPT_CODE_IN, :APPLY_PLANT_IN, :DJ_UQ_CODE_IN, :DJ_NAME_IN, :TOTAL, :RET)}");
            cstmt.setString("ORDERID_IN", ORDERID_IN);
            cstmt.setDate("STARTDATE_IN", SQLDATE1);
            cstmt.setDate("ENDDATE_IN", SQLDATE2);
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
            cstmt.setString("APPLY_PLANT_IN", APPLY_PLANT_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.registerOutParameter("TOTAL", OracleTypes.NUMBER);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getObject("TOTAL"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_dj902_ordercost");
        return result;
    }

    public HashMap PRO_MM_ITYPE() throws SQLException {

        logger.info("begin PRO_MM_ITYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_MM_ITYPE( :RET)}");
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
        logger.info("end PRO_MM_ITYPE");
        return result;
    }

    public HashMap GETAPPLYMAT(java.util.Date A_BEGINDATE, java.util.Date A_ENDDATE, String A_ITYPE, String A_NAME) throws SQLException {

        logger.info("begin GETAPPLYMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1=new Date(A_BEGINDATE.getTime());
        Date SQLDATE2=new Date(A_ENDDATE.getTime());

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ1007.GETAPPLYMAT(:A_BEGINDATE, :A_ENDDATE, :A_ITYPE, :A_NAME, :RET)}");
            cstmt.setDate("A_BEGINDATE", SQLDATE1);
            cstmt.setDate("A_ENDDATE", SQLDATE2);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_NAME", A_NAME);
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
        logger.info("end GETAPPLYMAT");
        return result;
    }

    public HashMap SAVEAPPLYMAT(String A_CODE, String A_NAME, String A_ETALON, String A_UNIT, String A_ITYPE, Double A_AMOUNT, java.util.Date A_APPLYDATE,
                                String A_REMARK, String A_GROUPNAME,String A_LYPERSONID, String A_LYPERSON, String A_USERID, String A_USERNAME, String A_KCID) throws SQLException {

        logger.info("begin SAVEAPPLYMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1=new Date(A_APPLYDATE.getTime());

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ1007.SAVEAPPLYMAT(:A_CODE, :A_NAME, :A_ETALON, :A_UNIT, :A_ITYPE, :A_AMOUNT, :A_APPLYDATE, :A_REMARK, :A_GROUPNAME, :A_LYPERSONID, :A_LYPERSON, :A_USERID, :A_USERNAME, :A_KCID, :RET_MSG, :RET)}");
            cstmt.setString("A_CODE", A_CODE);
            cstmt.setString("A_NAME", A_NAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_UNIT", A_UNIT);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setDouble("A_AMOUNT", A_AMOUNT);
            cstmt.setDate("A_APPLYDATE", SQLDATE1);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_GROUPNAME", A_GROUPNAME);
            cstmt.setString("A_LYPERSONID", A_LYPERSONID);
            cstmt.setString("A_LYPERSON", A_LYPERSON);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setString("A_KCID", A_KCID);
            cstmt.registerOutParameter("RET_MSG",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET1",  cstmt.getObject("RET_MSG"));
            result.put("RET2",  cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVEAPPLYMAT");
        return result;
    }

    public HashMap DELETEAPPLYMAT(String A_APPLYID, String A_USERID, String A_USERNAME) throws SQLException {

        logger.info("begin DELETEAPPLYMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ1007.DELETEAPPLYMAT(:A_APPLYID, :A_USERID, :A_USERNAME, :RET_MSG, :RET)}");
            cstmt.setString("A_APPLYID", A_APPLYID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.registerOutParameter("RET_MSG",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET1",  cstmt.getObject("RET_MSG"));
            result.put("RET2",  cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETEAPPLYMAT");
        return result;
    }

    public HashMap GETMATKC(String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON) throws SQLException {

        logger.info("begin GETMATKC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ601.GETMATKC(:A_PLANTCODE, :A_DEPARTCODE, :A_ITYPE, :A_MATERIALCODE, :A_MATERIALNAME, :A_ETALON, :RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
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
        logger.info("end GETMATKC");
        return result;
    }

    public HashMap PRO_DJ601_MENDDEPT_GROUP(String DEPTCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_MENDDEPT_GROUP");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ601_MENDDEPT_GROUP(:DEPTCODE_IN, :RET)}");
            cstmt.setString("DEPTCODE_IN", DEPTCODE_IN);
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
        logger.info("end PRO_DJ601_MENDDEPT_GROUP");
        return result;
    }

    public HashMap PRO_DJ601_PERSON(String MENDDEPT_CODE_IN) throws SQLException {

        logger.info("begin PRO_DJ601_PERSON");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PRO_DJ601_PERSON(:MENDDEPT_CODE_IN, :RET)}");
            cstmt.setString("MENDDEPT_CODE_IN", MENDDEPT_CODE_IN);
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
        logger.info("end PRO_DJ601_PERSON");
        return result;
    }

    public HashMap GETORDERSY( String A_PLANTCODE, String A_MENDDEPT, String A_ORDERID, java.util.Date A_BEGINDATE, java.util.Date A_ENDDATE) throws SQLException {

        logger.info("begin GETORDERSY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date SQLDATE1 = new Date(A_BEGINDATE.getTime());
        Date SQLDATE2 = new Date(A_ENDDATE.getTime());

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ606.GETORDERSY(:A_PLANTCODE, :A_MENDDEPT, :A_ORDERID, :A_BEGINDATE, :A_ENDDATE, :RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_MENDDEPT", A_MENDDEPT);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setDate("A_BEGINDATE", SQLDATE1);
            cstmt.setDate("A_ENDDATE", SQLDATE2);
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
        logger.info("end GETORDERSY");
        return result;
    }

    public HashMap ORDERSYDETAIL( String A_ORDERID) throws SQLException {

        logger.info("begin ORDERSYDETAIL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ605.ORDERSYDETAIL(:A_ORDERID, :RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end ORDERSYDETAIL");
        return result;
    }

    public HashMap FILELIST( String A_ORDERID) throws SQLException {

        logger.info("begin FILELIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            cstmt = conn.prepareCall("{call PG_DJ605.FILELIST(:A_ORDERID, :RET)}");
            cstmt.setString("A_ORDERID", A_ORDERID);
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
        logger.info("end FILELIST");
        return result;
    }


    public List<Map> FILEDOWNLOAD(String A_FILEID) throws SQLException {
        logger.info("begin FILEDOWNLOAD");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ605.FILEDOWNLOAD(:A_FILEID, :RET_FILENAME, :RET_FILE_EXTEND, :RET_FILE)}");
            cstmt.setString("String A_FILEID", A_FILEID);
            cstmt.registerOutParameter("RET_FILENAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_FILE_EXTEND", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_FILE", OracleTypes.BLOB);
            cstmt.execute();
            String RET_FILENAME = (String) cstmt.getObject("RET_FILENAME");
            String RET_FILE_EXTEND = (String) cstmt.getObject("RET_FILE_EXTEND");
            Blob RET_FILE = (Blob) cstmt.getObject("RET_FILE");
            Map sledata = new HashMap();
            sledata.put("RET_FILENAME", RET_FILENAME);
            sledata.put("RET_FILE_EXTEND", RET_FILE_EXTEND);
            sledata.put("V_FILEBLOB", RET_FILE);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end FILEDOWNLOAD");
        return result;
    }

}
