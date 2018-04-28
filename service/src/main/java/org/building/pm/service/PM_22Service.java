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
 * Created by zjh on 2017/1/22.
 */

@Service
public class PM_22Service {
    private static final Logger logger = Logger.getLogger(PM_22Service.class.getName());

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

    public HashMap PRO_PM_EQUREPAIRPLAN_EDITVIEW(String V_V_IP,String V_V_PERCODE,String V_D_INDATE_B,
                                                 String V_D_INDATE_E,String V_V_SPECIALTY,String V_V_DEFECT) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_EDITVIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_EDITVIEW" + "(:V_V_IP,:V_V_PERCODE,:V_D_INDATE_B," +
                    ":V_D_INDATE_E,:V_V_SPECIALTY,:V_V_DEFECT,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setDate("V_D_INDATE_B", Date.valueOf(V_D_INDATE_B));
            cstmt.setDate("V_D_INDATE_E", Date.valueOf(V_D_INDATE_E));
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //111
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_EDITVIEW");
        return result;
    }

    public Map PRO_BASE_SPECIALTYTOPERSON_SEL(String V_V_SPECIALTYCODE,String V_V_POSTCODE,String V_V_DEPTCODE) throws SQLException {


        logger.info("begin PRO_BASE_SPECIALTYTOPERSON_SEL");
        logger.debug("params:V_V_SPECIALTYCODE:" + V_V_SPECIALTYCODE + "params:V_V_POSTCODE:" + V_V_POSTCODE+ "params:V_V_DEPTCODE:" + V_V_DEPTCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTYTOPERSON_SEL(:V_V_SPECIALTYCODE,:V_V_POSTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_SPECIALTYCODE", V_V_SPECIALTYCODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
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
        logger.info("end PRO_BASE_SPECIALTYTOPERSON_SEL");
        return result;
    }

    public Map PRO_PM_EQUREPAIRPLAN_NEXTPER(String V_V_IP,String V_V_PERCODE,String V_V_PERNAME,
                                            String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_SPECIALTY,String V_V_GUID,String V_I_STATE) throws SQLException {


        logger.info("begin PRO_PM_EQUREPAIRPLAN_NEXTPER");
        logger.debug("params:V_V_IP:" + V_V_IP + "params:V_V_PERCODE:" + V_V_PERCODE+ "params:V_V_PERNAME:" + V_V_PERNAME+ "params:V_V_ORGCODE:" + V_V_ORGCODE
                + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_SPECIALTY:" + V_V_SPECIALTY+ "params:V_V_GUID:" + V_V_GUID+ "params:V_I_STATE:" + V_I_STATE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NEXTPER(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_GUID,:V_I_STATE,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_I_STATE", V_I_STATE);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            System.out.println("rs+++++++++++++++++++++++++++++++++++++++++++++"+rs);
            if(rs!=null) {
                result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_NEXTPER");
        return result;
    }

    public HashMap PM_RET_DATETIME() throws SQLException {

        logger.info("begin PM_RET_DATETIME");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_RET_DATETIME" + "(:V_CURSOR)}");
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
        logger.info("end PM_RET_DATETIME");
        return result;
    }

    public Map PM_REPAIRDEPT_SEL(String V_V_DEPTCODE) throws SQLException {


        logger.info("begin PM_REPAIRDEPT_SEL");
        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIRDEPT_SEL(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PM_REPAIRDEPT_SEL");
        return result;
    }

    /*public HashMap PRO_PM_EQUREPAIRPLAN_NEXTPER(String V_V_IP,String V_V_PERCODE,String V_V_PERNAME,
                                                 String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_SPECIALTY,String V_V_GUID,String V_I_STATE) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_NEXTPER");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_NEXTPER" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME," +
                    ":V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_GUID,:V_I_STATE,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_I_STATE", V_I_STATE);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_NEXTPER");
        return result;
    }*/

    /*public HashMap PRO_PM_EQUREPAIRPLAN_CREATE(String V_V_IP,String  V_V_PERCODE,String  V_V_PERNAME,String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_CREATE" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID" +
                    ":V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            System.out.println(cstmt.getString("V_V_INFO")+"+++++++++++++++++++++++++++");
            System.out.println(ResultHash((ResultSet) cstmt.getObject("V_CURSOR"))+"+++++++++++++++++++++++++++");
            result.put("INFO_RET", cstmt.getString("V_V_INFO"));
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_CREATE");
        return result;
    }*/

    public HashMap PRO_PM_EQUREPAIRPLAN_CREATE(String V_V_IP,String  V_V_PERCODE,String  V_V_PERNAME,String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_CREATE" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_V_INFO"));

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_CREATE");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_PIC_SET(String V_V_GUID, String V_V_PICMOME,String V_V_PICPOSTFIX) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_PIC_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_PIC_SET" + "(:V_V_GUID,:V_V_PICMOME,:V_V_PICPOSTFIX,:V_V_PICGUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PICMOME", V_V_PICMOME);
            cstmt.setString("V_V_PICPOSTFIX", V_V_PICPOSTFIX);
            cstmt.registerOutParameter("V_V_PICGUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("V_V_PICGUID", cstmt.getString("V_V_PICGUID"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_PIC_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_PIC_VIEW (String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_PIC_VIEW");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_PIC_VIEW(:V_V_GUID,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_V_INFO"));

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_PIC_VIEW");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_PIC_DEL(String V_V_GUID,String  V_V_PICGUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_PIC_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_PIC_DEL" + "(:V_V_GUID,:V_V_PICGUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PICGUID", V_V_PICGUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_PIC_DEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_DEL(String V_V_IP,String V_V_PERCODE,String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_DEL" + "(:V_V_IP,:V_V_PERCODE,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_DEL");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_SP(String V_V_IP,String V_V_PERCODE,String V_V_PERNAME,String V_V_ORGCODE,String  V_V_DEPTCODE,
                                           String V_V_GUID,String V_V_FLAG,String V_V_NEXTSPR,String V_V_SP,String V_V_YJ) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_SP");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_SP" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_GUID,:V_V_FLAG,:V_V_NEXTSPR,:V_V_SP,:V_V_YJ,:V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_NEXTSPR", V_V_NEXTSPR);
            cstmt.setString("V_V_SP", V_V_SP);
            cstmt.setString("V_V_YJ", V_V_YJ);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_SP");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_TOFXJH(String V_V_IP,String V_V_PERCODE,String V_V_GUID,String V_V_PROJECTCODE_GS,String V_V_REPAIRDEPT_GS,
                                               String V_F_MONEY_GS,String V_D_INDATE_GS) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TOFXJH");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TOFXJH" + "(:V_V_IP,:V_V_PERCODE,:V_V_GUID,:V_V_PROJECTCODE_GS,:V_V_REPAIRDEPT_GS,:V_F_MONEY_GS,:V_D_INDATE_GS,:V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PROJECTCODE_GS", V_V_PROJECTCODE_GS);
            cstmt.setString("V_V_REPAIRDEPT_GS", V_V_REPAIRDEPT_GS);
            cstmt.setString("V_F_MONEY_GS", V_F_MONEY_GS);
            cstmt.setDate("V_D_INDATE_GS", Date.valueOf(V_D_INDATE_GS));
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TOFXJH");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_SET(String V_V_IP,String V_V_PERCODE, String V_V_PERNAME,String V_V_GUID,String V_V_DEPTCODE,String V_V_DEPTNAME,String V_V_PROJECTNAME,String V_V_PLANDATE,String V_V_SPECIALTY,String V_V_SPECIALTYNAME,String V_V_SPECIALTYMANCODE
            ,String V_V_SPECIALTYMAN,Double V_F_MONEYUP,Double V_F_MONEYBUDGET,String V_V_REPAIRDEPTTYPE,String V_V_REPAIRDEPTCODE,String V_V_REPAIRDEPT,String V_V_DEFECT,String V_V_MEASURE,String V_I_RUSHTO,String V_V_PROJECTCODE_GS,String V_V_REPAIRDEPT_GS,
                                            String V_F_MONEY_GS,String V_D_INDATE_GS,String V_I_YEAR_PLAN,String V_I_MONTH_PLAN) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_SET" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_PROJECTNAME,:V_V_PLANDATE,:V_V_SPECIALTY,:V_V_SPECIALTYNAME,:V_V_SPECIALTYMANCODE,:V_V_SPECIALTYMAN,:V_F_MONEYUP,:V_F_MONEYBUDGET,:V_V_REPAIRDEPTTYPE,:V_V_REPAIRDEPTCODE,:V_V_REPAIRDEPT,:V_V_DEFECT,:V_V_MEASURE,:V_I_RUSHTO,:V_V_PROJECTCODE_GS,:V_V_REPAIRDEPT_GS,:V_F_MONEY_GS,:V_D_INDATE_GS,:V_I_YEAR_PLAN,:V_I_MONTH_PLAN,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_PROJECTNAME", V_V_PROJECTNAME);
            cstmt.setString("V_V_PLANDATE", V_V_PLANDATE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_SPECIALTYNAME", V_V_SPECIALTYNAME);
            cstmt.setString("V_V_SPECIALTYMANCODE", V_V_SPECIALTYMANCODE);
            cstmt.setString("V_V_SPECIALTYMAN", V_V_SPECIALTYMAN);
            cstmt.setDouble("V_F_MONEYUP", V_F_MONEYUP);
            cstmt.setDouble("V_F_MONEYBUDGET", V_F_MONEYBUDGET);
            cstmt.setString("V_V_REPAIRDEPTTYPE", V_V_REPAIRDEPTTYPE);
            cstmt.setString("V_V_REPAIRDEPTCODE", V_V_REPAIRDEPTCODE);
            cstmt.setString("V_V_REPAIRDEPT", V_V_REPAIRDEPT);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_MEASURE", V_V_MEASURE);
            cstmt.setString("V_I_RUSHTO", V_I_RUSHTO);
            cstmt.setString("V_V_PROJECTCODE_GS", V_V_PROJECTCODE_GS);
            cstmt.setString("V_V_REPAIRDEPT_GS", V_V_REPAIRDEPT_GS);
            cstmt.setString("V_F_MONEY_GS", V_F_MONEY_GS);
            cstmt.setString("V_D_INDATE_GS", V_D_INDATE_GS);
            cstmt.setString("V_I_YEAR_PLAN", V_I_YEAR_PLAN);
            cstmt.setString("V_I_MONTH_PLAN", V_I_MONTH_PLAN);
            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_SET");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_SEND(String V_V_IP,String V_V_PERCODE, String V_V_PERNAME,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_GUID,String V_I_STATE,String V_V_FLAG,String V_V_NEXTSPR) throws SQLException {
//        logger.info("begin PRO_PM_EQUREPAIRPLAN_SEND");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_SEND" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_GUID,:V_I_STATE,:V_V_FLAG,:V_V_NEXTSPR,:V_V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_I_STATE", V_I_STATE);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_NEXTSPR", V_V_NEXTSPR);
            cstmt.registerOutParameter("V_V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_SEND");
        return result;
    }

    public HashMap PRO_WO_FLOW_DATA_SPVIEW(String V_V_DBGUID) throws SQLException {

        logger.info("begin PRO_WO_FLOW_DATA_SPVIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DATA_SPVIEW" + "(:V_V_DBGUID,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_V_INFO"));

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DATA_SPVIEW");
        return result;
    }

    public HashMap PRO_PM_EQUREPAIRPLAN_VIEW(String V_V_IP,String V_V_PERCODE,String V_V_ORGCODE,String V_V_DEPTCODE,String
            V_D_INDATE_B,String V_D_INDATE_E,String V_V_SPECIALTY,String V_V_DEFECT,String V_V_FLAG) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_VIEW" + "(:V_V_IP,:V_V_PERCODE,:V_V_ORGCODE," +
                    ":V_V_DEPTCODE,:V_D_INDATE_B,:V_D_INDATE_E,:V_V_SPECIALTY,:V_V_DEFECT,:V_V_FLAG,:V_V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setDate("V_D_INDATE_B", Date.valueOf(V_D_INDATE_B));
            cstmt.setDate("V_D_INDATE_E", Date.valueOf(V_D_INDATE_E));
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_DEFECT", V_V_DEFECT);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.registerOutParameter("V_V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //111
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_VIEW");
        return result;
    }

    public HashMap PRO_PM_04_PROJECT_DATA_ITEM_V(String V_V_YEAR,String V_V_MONTH,String V_V_PERCODE,String V_V_ORGCODE,String V_V_SPECIALTY,
                                                 String V_V_PROJECT_CODE,String V_V_PROJECT_NAME,String V_V_CONTENT,String V_V_BY1,String V_V_BY2) throws SQLException {

        logger.info("begin PRO_PM_04_PROJECT_DATA_ITEM_V");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_04_PROJECT_DATA_ITEM_V" + "(:V_V_YEAR,:V_V_MONTH,:V_V_PERCODE,:V_V_ORGCODE," +
                    ":V_V_SPECIALTY,:V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_CONTENT,:V_V_BY1,:V_V_BY2,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_BY1", V_V_BY1);
            cstmt.setString("V_V_BY2", V_V_BY2);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //111
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_04_PROJECT_DATA_ITEM_V");
        return result;
    }

    public HashMap PRO_PM_04_PROJECT_DATA_ITEM_N(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_SPECIALTY,
                                                 String V_V_PROJECT_CODE,String V_V_PROJECT_NAME,String V_V_CONTENT,String V_V_BY1,String V_V_BY2) throws SQLException {

        logger.info("begin PRO_PM_04_PROJECT_DATA_ITEM_N");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_04_PROJECT_DATA_ITEM_N" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE," +
                    ":V_V_SPECIALTY,:V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_CONTENT,:V_V_BY1,:V_V_BY2,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_BY1", V_V_BY1);
            cstmt.setString("V_V_BY2", V_V_BY2);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //111
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_04_PROJECT_DATA_ITEM_N");
        return result;
    }



    public HashMap PRO_SAP_EQU_GET_C(String V_V_PERSONCODE,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_GET_C");
        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + ",V_V_ORGCODE:" + V_V_ORGCODE + ",V_V_DEPTCODE:" + V_V_DEPTCODE + ",V_V_EQUTYPECODE:" + V_V_EQUTYPECODE + ",V_V_EQUCODE:" + V_V_EQUCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_GET_C" + "(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_SAP_EQU_GET_C");
        return result;
    }

    public HashMap PRO_PM_DEFECT_GC_SET(String V_V_GUID_GC,String V_V_PERCODE,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE,String V_V_EQUCHILDCODE,String V_V_REPAIRMAJOR_CODE,String V_V_SOURCECODE,String V_V_PERNAME_FX,String V_V_SOURCE_GRADE
            ,String V_D_DEFECTDATE,String V_V_DEFECTLIST,String V_V_IDEA,String V_V_ISTODIC) throws SQLException {
//        logger.info("begin PRO_PM_DEFECT_GC_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_GC_SET" + "(:V_V_GUID_GC,:V_V_PERCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_EQUCHILDCODE,:V_V_REPAIRMAJOR_CODE,:V_V_SOURCECODE,:V_V_PERNAME_FX,:V_V_SOURCE_GRADE,:V_D_DEFECTDATE,:V_V_DEFECTLIST,:V_V_IDEA,:V_V_ISTODIC,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_GC", V_V_GUID_GC);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_PERNAME_FX", V_V_PERNAME_FX);
            cstmt.setString("V_V_SOURCE_GRADE", V_V_SOURCE_GRADE);
            cstmt.setString("V_D_DEFECTDATE", V_D_DEFECTDATE);
            //cstmt.setDate("V_D_DEFECTDATE", Date.valueOf(V_D_DEFECTDATE));
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_ISTODIC", V_V_ISTODIC);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_GC_SET");
        return result;
    }

    public HashMap PRO_PM_DEFECT_GC_TOWORK(String V_V_PERCODE,String V_V_GUID_GC, String V_V_GUID_QX) throws SQLException {
//        logger.info("begin PRO_PM_DEFECT_GC_TOWORK");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_GC_TOWORK" + "(:V_V_PERCODE,:V_V_GUID_GC,:V_V_GUID_QX,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_GUID_GC", V_V_GUID_GC);
            cstmt.setString("V_V_GUID_QX", V_V_GUID_QX);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_GC_TOWORK");
        return result;
    }

    public HashMap PRO_PM_DEFECT_DESCRIPTION_SEL(String V_V_ORGCODE,String V_V_EQUTYPECODE,String V_V_DEFECTLIST) throws SQLException {

        logger.info("begin PRO_PM_DEFECT_DESCRIPTION_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_DESCRIPTION_SEL" + "(:V_V_ORGCODE,:V_V_EQUTYPECODE,:V_V_DEFECTLIST,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_ORGCODE);
            cstmt.setString("V_V_PERCODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_ORGCODE", V_V_DEFECTLIST);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //111
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_DESCRIPTION_SEL");
        return result;
    }

    //类型
    public HashMap PM_04_PROJECT_TYPE_DROP() throws SQLException {

        logger.info("begin PM_04_PROJECT_TYPE_DROP");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_TYPE_DROP(:V_CURSOR)}");
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
        logger.info("end PM_04_PROJECT_TYPE_DROP");
        return result;
    }

    public HashMap PRO_PM_DEFECT_GC_SEL(String V_V_GUID_GC) throws SQLException {
        logger.info("begin PRO_PM_DEFECT_GC_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_GC_SEL" + "(:V_V_GUID_GC,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_GC", V_V_GUID_GC);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_DEFECT_GC_SEL");
        return result;
    }


}
