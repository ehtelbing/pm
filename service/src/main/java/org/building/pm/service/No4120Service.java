package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class No4120Service {
    private static final Logger logger = Logger.getLogger(No4120Service.class.getName());

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

    public HashMap PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT,String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public HashMap PRO_PM_REPAIRDEPT_TODEPT(String V_REPAIRDEPTCODE, String V_PERSONCODE) throws SQLException {

        logger.info("begin PRO_PM_REPAIRDEPT_TODEPT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_TODEPT" + "(:V_REPAIRDEPTCODE,:V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_REPAIRDEPTCODE", V_REPAIRDEPTCODE);
            cstmt.setString("V_PERSONCODE", V_PERSONCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_REPAIRDEPT_TODEPT");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_LIST_REPAIR(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_DEPTCODEREPARIR, String V_V_STATECODE, String V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_LIST_REPAIR");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LIST_REPAIR" + "(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_LIST_REPAIR");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_JS_REPAIRDEPT(String V_V_PERSONCODE,String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_JS_REPAIRDEPT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_JS_REPAIRDEPT" + "(:V_V_PERSONCODE,:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_CURSOR");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_JS_REPAIRDEPT");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_LIST_Re_back(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_DEPTCODEREPARIR, String V_V_STATECODE, String V_DJ_PERCODE, String V_V_SHORT_TXT) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_LIST_Re_back");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_LIST_Re_back" + "(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_LIST_Re_back");
        return result;
    }

    public HashMap PRO_BASE_PERSON_VIEW_ROLE(String V_V_DEPTCODE, String V_V_PERSONCODE, String V_V_ROLE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_VIEW_ROLE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW_ROLE" + "(:V_V_DEPTCODE,:V_V_PERSONCODE,:V_V_ROLE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ROLE", V_V_ROLE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_VIEW_ROLE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SP(String V_V_PERSONCODE, String V_V_ORDERGUID, String V_V_STEPNAME, String V_V_MEMO,String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SP");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SP" + "(:V_V_PERSONCODE,:V_V_ORDERGUID,:V_V_STEPNAME,:V_V_MEMO,:V_V_STATECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_STEPNAME", V_V_STEPNAME);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SP");
        return result;
    }

    public HashMap VIEW_PRELOADWARE(String X_MODELNUMBER) throws SQLException {

        logger.info("begin VIEW_PRELOADWARE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call VIEW_PRELOADWARE" + "(:X_MODELNUMBER,:MAIN_CURSOR,:COMPONENT_CURSOR)}");
            cstmt.setString("X_MODELNUMBER", X_MODELNUMBER);
            cstmt.registerOutParameter("MAIN_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("COMPONENT_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("mainlist",
                    ResultHash((ResultSet) cstmt.getObject("MAIN_CURSOR")));
            result.put("comlist",
                    ResultHash((ResultSet) cstmt.getObject("COMPONENT_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end VIEW_PRELOADWARE");
        return result;
    }

    public HashMap DELETE_PRELOADWARE(String X_MODELNUMBER) throws SQLException {

        logger.info("begin DELETE_PRELOADWARE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call DELETE_PRELOADWARE" + "(:X_MODELNUMBER,:V_INFO)}");
            cstmt.setString("X_MODELNUMBER", X_MODELNUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("list",(String)cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETE_PRELOADWARE");
        return result;
    }

//    public HashMap DELETE_PRELOADWARE(String X_MODELNUMBER) throws SQLException {
//
//        logger.info("begin DELETE_PRELOADWARE");
////      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);
//
//        HashMap result = new HashMap();
//        Connection conn = null;
//        CallableStatement cstmt = null;
//        try {
//            conn = dataSources.getConnection();
//            conn.setAutoCommit(false);
//            cstmt = conn.prepareCall("{call DELETE_PRELOADWARE" + "(:X_MODELNUMBER,:V_INFO)}");
//            cstmt.setString("X_MODELNUMBER", X_MODELNUMBER);
//            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
//            cstmt.execute();
//
//            result.put("list",(String)cstmt.getObject("V_INFO"));
//        } catch (SQLException e) {
//            logger.error(e);
//        } finally {
//            cstmt.close();
//            conn.close();
//        }
//        logger.debug("result:" + result);
//        logger.info("end DELETE_PRELOADWARE");
//        return result;
//    }

    public HashMap ADD_PRELOADWARE(String X_MODELNUMBER,String X_MODELNAME,String X_UNIT,String X_TYPE,String X_SETSITE,
                                   String X_MEMO,String X_DRAWING,String X_EQUTYPECODE,String X_DEPTCODE,String X_SPAREPARTS,
                                   String X_YBJCODE) throws SQLException {

        logger.info("begin ADD_PRELOADWARE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call ADD_PRELOADWARE" + "(:X_MODELNUMBER,:X_MODELNAME,:X_UNIT,:X_TYPE,:X_SETSITE," +
                    ":X_MEMO,:X_DRAWING,:X_EQUTYPECODE,:X_DEPTCODE,:X_SPAREPARTS,:X_YBJCODE,:V_INFO)}");
            cstmt.setString("X_MODELNUMBER", X_MODELNUMBER);
            cstmt.setString("X_MODELNAME", X_MODELNAME);
            cstmt.setString("X_UNIT", X_UNIT);
            cstmt.setString("X_TYPE", X_TYPE);
            cstmt.setString("X_SETSITE", X_SETSITE);

            cstmt.setString("X_MEMO", X_MEMO);
            cstmt.setString("X_DRAWING", X_DRAWING);
            cstmt.setString("X_EQUTYPECODE", X_EQUTYPECODE);
            cstmt.setString("X_DEPTCODE", X_DEPTCODE);
            cstmt.setString("X_SPAREPARTS", X_SPAREPARTS);
            cstmt.setString("X_YBJCODE", X_YBJCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("list",(String)cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADD_PRELOADWARE");
        return result;
    }

    public HashMap pro_run7111_addlog(String v_v_bjcode, String v_v_checktime,String v_v_checkcount,
                                      FileInputStream v_v_file, String v_v_filename,
                                      String v_v_usercode,String v_v_username,
                                      String tagid,String siteid,
                                      String tagdesc) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_run7111_addlog" + "(:v_v_bjcode,:v_v_checktime,:v_v_checkcount," +
                    ":v_v_file,:v_v_filename,:v_v_usercode,:v_v_username,:tagid,:siteid,:tagdesc,:ret)}");
            cstmt.setString("v_v_bjcode", v_v_bjcode);
            cstmt.setString("v_v_checktime", v_v_checktime);
            cstmt.setString("v_v_checkcount", v_v_checkcount);
            cstmt.setBinaryStream("v_v_file", v_v_file);
            cstmt.setString("v_v_filename", v_v_filename);
            cstmt.setString("v_v_usercode", v_v_usercode);
            cstmt.setString("v_v_username", v_v_username);
            cstmt.setString("tagid", tagid);
            cstmt.setString("siteid", siteid);
            cstmt.setString("tagdesc", tagdesc);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String)cstmt.getObject("ret"));
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

    public HashMap GEN_PRELOADWARECODEPRO() throws SQLException {

        logger.info("begin GEN_PRELOADWARECODEPRO");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call GEN_PRELOADWARECODEPRO" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("list",(String)cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GEN_PRELOADWARECODEPRO");
        return result;
    }

    public HashMap RRO_BASE_PRELOADWAREMODEL_VIEW(String V_V_DEPTCODE, String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin RRO_BASE_PRELOADWAREMODEL_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call RRO_BASE_PRELOADWAREMODEL_VIEW" + "(:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end RRO_BASE_PRELOADWAREMODEL_VIEW");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_YZJ_CREATE(String V_V_PERCODE, String V_V_PERNAME, String V_V_MODELNUMBER) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_YZJ_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YZJ_CREATE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_MODELNUMBER,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_MODELNUMBER", V_V_MODELNUMBER);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YZJ_CREATE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_YZJ_SAVE(String V_V_PERCODE,String V_V_PERNAME,String V_V_MODELNUMBER,String V_V_ORDERGUID,String V_V_SHORT_TXT,
                                             String V_V_DEPTCODEREPAIR,String V_D_START_DATE,String V_D_FINISH_DATE,String V_V_WBS,String V_V_WBS_TXT,
                                             String V_V_TOOL,String V_V_TECHNOLOGY,String V_V_SAFE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_YZJ_SAVE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YZJ_SAVE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_MODELNUMBER,:V_V_ORDERGUID,:V_V_SHORT_TXT," +
                    ":V_V_DEPTCODEREPAIR,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT," +
                    ":V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_MODELNUMBER", V_V_MODELNUMBER);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);

            cstmt.setString("V_V_DEPTCODEREPAIR", V_V_DEPTCODEREPAIR);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);

            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("list",(String)cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YZJ_SAVE");
        return result;
    }

    public HashMap PRO_PM_PRELOADWARE_VIEW(String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_STATUS) throws SQLException {

        logger.info("begin PRO_PM_PRELOADWARE_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_PRELOADWARE_VIEW" + "(:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_STATUS,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_STATUS", V_V_STATUS);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PRELOADWARE_VIEW");
        return result;
    }

    public HashMap SAP_PM_EQU_P_IMPORT_SEL(String V_V_PERCODE, String V_V_EQUTYPE) throws SQLException {

        logger.info("begin SAP_PM_EQU_P_IMPORT_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_P_IMPORT_SEL" + "(:V_V_PERCODE,:V_V_EQUTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAP_PM_EQU_P_IMPORT_SEL");
        return result;
    }
}
