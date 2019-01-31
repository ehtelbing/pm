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
 * Created by zjh on 2017/1/22.
 */

@Service
public class ZdhService {
    private static final Logger logger = Logger.getLogger(ZdhService.class.getName());

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

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    public Map plant_sel(String IS_V_DEPTCODE,String IS_V_DEPTTYPE) throws SQLException {


        logger.info("begin PRO_BASE_DEPT_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW(:IS_V_DEPTCODE,:IS_V_DEPTTYPE,:V_CURSOR)}");

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

    public Map dept_sel(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTCODENEXT,String V_V_DEPTTYPE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public Map fixdept_sel(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_PM_REPAIRDEPT_VIEW");
//        logger.debug("params:V_V_DEPTCODE:" + V_V_DEPTCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_PM_REPAIRDEPT_VIEW");
        return result;
    }

    public Map orderid_create(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORGCODE,String V_V_DEPTCODE
    ) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_WX_CREATE");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_WX_CREATE(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PRO_PM_WORKORDER_WX_CREATE");
        return result;
    }

    public HashMap PRO_BASE_FILE_SEL(String V_V_GUID,String V_V_FILETYPECODE) throws SQLException {

        logger.info("begin PRO_BASE_FILE_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_SEL" + "(:V_V_GUID,:V_V_FILETYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
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
        logger.info("end PRO_BASE_FILE_SEL");
        return result;
    }

    public Map workcenter_sel(String V_V_DEPTREPAIRCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPTTOSAPWORKCSAT");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPWORKCSAT(:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
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
        logger.info("end PRO_BASE_DEPTTOSAPWORKCSAT");
        return result;
    }

    public List<Map> save_workorder(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORDERGUID,
                                    String V_V_SHORT_TXT,String V_V_FUNC_LOC,String V_V_EQUIP_NO,
                                    String V_V_EQUIP_NAME, String V_D_START_DATE,String V_D_FINISH_DATE,
                                    String V_V_WBS,String V_V_WBS_TXT,String V_V_DEPTCODEREPARIR,
                                    String V_V_TOOL,String V_V_TECHNOLOGY,String V_V_SAFE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_WX_SAVE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDERGUID,:V_V_SHORT_TXT," +
                    ":V_V_FUNC_LOC,:V_V_EQUIP_NO,:V_V_EQUIP_NAME,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT," +
                    ":V_V_DEPTCODEREPARIR,:V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_CURSOR)}");


            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_FUNC_LOC", V_V_FUNC_LOC);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_EQUIP_NAME", V_V_EQUIP_NAME);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_TOOL", V_V_TOOL);
            cstmt.setString("V_V_TECHNOLOGY", V_V_TECHNOLOGY);
            cstmt.setString("V_V_SAFE", V_V_SAFE);
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
        logger.info("end PRO_PM_WORKORDER_WX_SAVE");
        return result;
    }

    public Map select_engineer(String V_V_EQUIPCODE,String V_V_DEPTREPAIRCODE) throws SQLException {

        logger.info("begin PRO_WX_WORKORDER_SELECT_PER");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_SELECT_PER(:V_V_DEPTREPAIRCODE,:V_V_EQUIPCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
            cstmt.setString("V_V_EQUIPCODE", V_V_EQUIPCODE);
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
        logger.info("end PRO_WX_WORKORDER_SELECT_PER");
        return result;
    }

    public Map create_workorder(String V_V_PERCODE,String V_V_PERNAME,
                                String V_V_ORGCODE,String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_WX_CREATE");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_WX_CREATE(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE," +
                    ":V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PRO_PM_WORKORDER_WX_CREATE");
        return result;
    }

    public Map workorderstate_sel() throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_WXSTATE_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_WXSTATE_VIEW(:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_STATE_VIEW");
        return result;
    }

    public Map equipname_sel(String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQU_ADMIN");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_ADMIN(:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_GET_DEPTEQU_ADMIN");
        return result;
    }

    public Map equiptype_sel(String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_ADMIN");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_ADMIN(:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
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
        logger.info("end PRO_GET_DEPTEQUTYPE_ADMIN");
        return result;
    }

    public Map workorder_sel(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,
                             String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,
                             String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,
                             String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_ADMIN" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT," +
                    ":V_V_ORDER_TYP,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        //result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SELECT_ADMIN");
        return result;
    }

    public List<Map> send_manager(String V_V_DEPTREPAIRCODE,String V_V_ORDERGUID,
                                  String V_V_REASON) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_TO_MANAGER" + "(:V_V_DEPTREPAIRCODE,:V_V_ORDERGUID,:V_V_REASON,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_REASON", V_V_REASON);
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
        logger.info("end PRO_WX_WORKORDER_TO_MANAGER");
        return result;
    }

    public Map team_sel(String IN_DEPARTCODE,String IN_CLASSNAME) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_M_QUERY(:IN_DEPARTCODE,:IN_CLASSNAME,:V_CURSOR)}");
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
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
        logger.info("end PRO_CLASS_M_QUERY");
        return result;
    }

    public Map workCenter_sel(String V_V_DEPTREPAIRCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPTTOSAPWORKCSAT");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPWORKCSAT(:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
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
        logger.info("end PRO_BASE_DEPTTOSAPWORKCSAT");
        return result;
    }

    public Map role_sel() throws SQLException {

        logger.info("begin PRO_BASE_PERSONROLE_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_VIEW(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSONROLE_VIEW");
        return result;
    }

    public Map role_new_sel(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSONROLE_NEW_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_NEW_VIEW(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
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
        logger.info("end PRO_BASE_PERSONROLE_NEW_VIEW");
        return result;
    }

    public Map addperson_sel(String IN_DEPTCODE,String IN_ROLECODE,
                             String IN_PERSONCODE,String IN_PERSONNAME,
                             String IN_CLASSCODE,String IN_ORDERGUID) throws SQLException {

        logger.info("begin PRO_CLASS_FIND_WXPERSON");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_FIND_WXPERSON(:IN_DEPTCODE,:IN_ROLECODE," +
                    ":IN_PERSONCODE,:IN_PERSONNAME,:IN_CLASSCODE,:IN_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("IN_DEPTCODE", IN_DEPTCODE);
            cstmt.setString("IN_ROLECODE", IN_ROLECODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.setString("IN_PERSONNAME", IN_PERSONNAME);
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
            cstmt.setString("IN_ORDERGUID", IN_ORDERGUID);
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
        logger.info("end PRO_CLASS_FIND_WXPERSON");
        return result;
    }

    public Map addbaseperson_sel(String IN_DEPTCODE,String IN_ROLECODE,
                                 String IN_PERSONCODE,String IN_PERSONNAME) throws SQLException {

        logger.info("begin PRO_CLASS_FIND_PERSON");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_FIND_PERSON(:IN_DEPTCODE,:IN_ROLECODE," +
                    ":IN_PERSONCODE,:IN_PERSONNAME,:V_CURSOR)}");
            cstmt.setString("IN_DEPTCODE", IN_DEPTCODE);
            cstmt.setString("IN_ROLECODE", IN_ROLECODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.setString("IN_PERSONNAME", IN_PERSONNAME);
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
        logger.info("end PRO_CLASS_FIND_PERSON");
        return result;
    }

    public Map teamdetail_sel(String IN_CLASSCODE,String IN_ORDERGUID) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY_WX");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_M_QUERY_WX(:IN_CLASSCODE,:IN_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
            cstmt.setString("IN_ORDERGUID", IN_ORDERGUID);
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
        logger.info("end PRO_CLASS_M_QUERY_WX");
        return result;
    }

    public Map teamname_sel(String IN_CLASSCODE) throws SQLException {

        logger.info("begin PRO_CLASS_NAME_QUERY_WX");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_NAME_QUERY_WX(:IN_CLASSCODE,:V_CURSOR)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
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
        logger.info("end PRO_CLASS_NAME_QUERY_WX");
        return result;
    }

    public Map teambasedetail_sel(String IN_CLASSCODE) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY_P");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_M_QUERY_P(:IN_CLASSCODE,:V_CURSOR)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
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
        logger.info("end PRO_CLASS_M_QUERY_P");
        return result;
    }

    public List<Map> team_save(String IN_DEPARTCODE,String IN_CLASSNAME,String IN_WORKCODE,
                               String IN_PERSONCODE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_CLASS_ADD_WX" + "(:IN_DEPARTCODE,:IN_CLASSNAME," +
                    ":IN_WORKCODE,:IN_PERSONCODE,:RET)}");
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
            cstmt.setString("IN_WORKCODE", IN_WORKCODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_CLASS_ADD_WX");
        return result;
    }

    public List<Map> teambase_save(String IN_DEPARTCODE,String IN_CLASSNAME,String IN_WORKCODE,
                                   String IN_PERSONCODE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_CLASS_ADD_S" + "(:IN_DEPARTCODE,:IN_CLASSNAME," +
                    ":IN_WORKCODE,:IN_PERSONCODE,:RET)}");
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
            cstmt.setString("IN_WORKCODE", IN_WORKCODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_CLASS_ADD_S");
        return result;
    }

    public List<Map> team_edit(String IN_CLASSCODE,String IN_DEPARTCODE,String IN_CLASSNAME,
                               String IN_WORKCODE,String IN_PERSONCODE,String IN_ORDERGUID) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_CLASS_EDIT_WX" + "(:IN_CLASSCODE,:IN_DEPARTCODE,:IN_CLASSNAME," +
                    ":IN_WORKCODE,:IN_PERSONCODE,:IN_ORDERGUID,:RET)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
            cstmt.setString("IN_WORKCODE", IN_WORKCODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.setString("IN_ORDERGUID", IN_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_CLASS_EDIT_WX");
        return result;
    }

    public List<Map> teambase_edit(String IN_CLASSCODE,String IN_DEPARTCODE,String IN_CLASSNAME,
                                   String IN_WORKCODE,String IN_PERSONCODE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_CLASS_EDIT_S" + "(:IN_CLASSCODE,:IN_DEPARTCODE,:IN_CLASSNAME," +
                    ":IN_WORKCODE,:IN_PERSONCODE,:RET)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
            cstmt.setString("IN_DEPARTCODE", IN_DEPARTCODE);
            cstmt.setString("IN_CLASSNAME", IN_CLASSNAME);
            cstmt.setString("IN_WORKCODE", IN_WORKCODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_CLASS_EDIT_S");
        return result;
    }

    public Map teamedit_sel(String IN_CLASSCODE) throws SQLException {

        logger.info("begin PRO_CLASS_QUERY_EDIT");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_CLASS_QUERY_EDIT(:IN_CLASSCODE,:V_CURSOR)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
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
        logger.info("end PRO_CLASS_QUERY_EDIT");
        return result;
    }


    public List<Map> team_del(String IN_CLASSCODE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_CLASS_DEL_S" + "(:IN_CLASSCODE,:RET)}");
            cstmt.setString("IN_CLASSCODE", IN_CLASSCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_CLASS_DEL_S");
        return result;
    }

    public List<Map> send_team(String V_V_TEAMCODE,String V_V_ORDERGUID) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_TO_TEAM" + "(:V_V_TEAMCODE,:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_TEAMCODE", V_V_TEAMCODE);
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
        logger.info("end PRO_WX_WORKORDER_TO_TEAM");
        return result;
    }

    public Map workorderall_sel(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,
                                String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,
                                String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,
                                String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,
                                String V_V_USERCODE) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_ALL" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT," +
                    ":V_V_ORDER_TYP,:V_V_USERCODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_USERCODE", V_V_USERCODE);
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
        logger.info("end PRO_PM_WORKORDER_SELECT_ALL");
        return result;
    }

    public Map PRO_PM_WORKORDER_ET_ACTIVITY(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_ACTIVITY");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_ACTIVITY(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_ET_ACTIVITY");
        return result;
    }

    public Map PRO_PM_WORKORDER_SPARE_VIEW(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SPARE_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_VIEW(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_SPARE_VIEW");
        return result;
    }

    public   List<Map> PRO_PM_WORKORDER_SPARE_VIEW1(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SPARE_VIEW");

        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_VIEW(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_WORKORDER_SPARE_VIEW");
        return resultList;
    }

    public Map PRO_WORKORDER_SPARE_ZY(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_WORKORDER_SPARE_ZY");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_WX_SPARE_ZY(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_WORKORDER_SPARE_ZY");
        return result;
    }

    public Map PRO_MM_STORE_DIC() throws SQLException {

        logger.info("begin PRO_MM_STORE_DIC");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_MM_STORE_DIC(:V_CURSOR)}");
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
        logger.info("end PRO_MM_STORE_DIC");
        return result;
    }

    public Map PRO_PM_WORKORDER_JIP_VIEW(String V_V_EQUIP_NO,String V_I_FLAG) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_JIP_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_JIP_VIEW(:V_V_EQUIP_NO,:V_I_FLAG,:V_CURSOR)}");
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_I_FLAG",V_I_FLAG);
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
        logger.info("end PRO_PM_WORKORDER_JIP_VIEW");
        return result;
    }

    public Map PRO_BASE_DEPT_SAP_JHGC(String V_V_SAP_JHGC ) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_SAP_JHGC");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_SAP_JHGC(:V_V_SAP_JHGC,:V_CURSOR)}");
            cstmt.setString("V_V_SAP_JHGC",V_V_SAP_JHGC);
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
        logger.info("end PRO_BASE_DEPT_SAP_JHGC");
        return result;
    }

    public Map workorder_membersel(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,
                                   String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,
                                   String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,
                                   String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,
                                   String V_V_USERCODE) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_MEMBER" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT," +
                    ":V_V_ORDER_TYP,:V_V_USERCODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_USERCODE", V_V_USERCODE);
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
        logger.info("end PRO_PM_WORKORDER_SELECT_MEMBER");
        return result;
    }

    public Map PRO_PM_WORKORDER_ET_OPERATIONS(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_OPERATIONS");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_OPERATIONS(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_ET_OPERATIONS");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_ET_SET(Double V_I_ID,String V_V_ORDERGUID,String V_V_DESCRIPTION,
                                             Double V_I_WORK_ACTIVITY,Double V_I_DURATION_NORMAL,String V_V_WORK_CENTER,
                                             Double V_I_ACTUAL_TIME, Double V_I_NUMBER_OF_PEOPLE,String V_V_ID,String V_V_GUID) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_SET" + "(:V_I_ID,:V_V_ORDERGUID,:V_V_DESCRIPTION," +
                    ":V_I_WORK_ACTIVITY,:V_I_DURATION_NORMAL,:V_V_WORK_CENTER,:V_I_ACTUAL_TIME,:V_I_NUMBER_OF_PEOPLE," +
                    ":V_V_ID,:V_V_GUID)}");


            cstmt.setDouble("V_I_ID", V_I_ID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_DESCRIPTION", V_V_DESCRIPTION);
            cstmt.setDouble("V_I_WORK_ACTIVITY", V_I_WORK_ACTIVITY);
            cstmt.setDouble("V_I_DURATION_NORMAL", V_I_DURATION_NORMAL);
            cstmt.setString("V_V_WORK_CENTER", V_V_WORK_CENTER);
            cstmt.setDouble("V_I_ACTUAL_TIME", V_I_ACTUAL_TIME);
            cstmt.setDouble("V_I_NUMBER_OF_PEOPLE", V_I_NUMBER_OF_PEOPLE);
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_ET_SET");
        return result;
    }

    public Map PRO_PM_WORKORDER_ET_GET(Double V_I_ID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_GET");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_GET(:V_I_ID,:V_CURSOR)}");
            cstmt.setDouble("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_WORKORDER_ET_GET");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_ET_DEL(Double V_I_ID,String V_V_ORDERGUID) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_DEL" + "(:V_I_ID,:V_V_ORDERGUID)}");

            cstmt.setDouble("V_I_ID", V_I_ID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_ET_DEL");
        return result;
    }

    public Map PRO_WX_WORKORDER_GET(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_WX_WORKORDER_GET");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_GET(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_WX_WORKORDER_GET");
        return result;
    }

    public Map PRO_BASE_DEPT_TREE(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_TREE");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_DEPT_TREE");
        return result;
    }

    public Map PRO_BASE_CRAFT_QUERY() throws SQLException {

        logger.info("begin PRO_BASE_DEPT_TREE");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_CRAFT_QUERY(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_TREE");
        return result;
    }


    public Map PRO_BASE_PERSON_VIEW(String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_VIEW");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSON_VIEW");
        return result;
    }

    public List<Map> PRO_BASE_PERSON_SET(String V_V_PERSONCODE,String V_V_PERSONNAME,String V_V_LOGINNAME,String V_V_PASSWORD,
                                         String V_V_DEPTCODE,String V_V_ROLECODE,Double V_I_ORDERID,String V_I_CLASS) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_SET" + "(:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_LOGINNAME," +
                    ":V_V_PASSWORD,:V_V_DEPTCODE,:V_V_ROLECODE,:V_I_ORDERID,:V_I_CLASS,:IS_V_ERR)}");

            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_LOGINNAME", V_V_LOGINNAME);
            cstmt.setString("V_V_PASSWORD", V_V_PASSWORD);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setDouble("V_I_ORDERID", V_I_ORDERID);
            cstmt.setString("V_I_CLASS", V_I_CLASS);
            cstmt.registerOutParameter("IS_V_ERR", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("IS_V_ERR");
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
        logger.info("end PRO_BASE_PERSON_SET");
        return result;
    }

    public Map PRO_BASE_PERSON_GET(String V_V_PERSONCODE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_GET");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_GET(:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_BASE_PERSON_GET");
        return result;
    }

    public List<Map> PRO_BASE_PERSON_DEL(String V_V_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_DEL" + "(:V_V_PERSONCODE)}");

            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_DEL");
        return result;
    }

    public List<Map> PRO_PERSON_ADD_CRAFT(String IN_CRAFTCODE,String IN_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PERSON_ADD_CRAFT" + "(:IN_CRAFTCODE,:IN_PERSONCODE,:RET)}");

            cstmt.setString("IN_CRAFTCODE", IN_CRAFTCODE);
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_PERSON_ADD_CRAFT");
        return result;
    }

    public Map PRO_PERSON_QUERY_CRAFT(String IN_PERSON) throws SQLException {

        logger.info("begin PRO_PERSON_QUERY_CRAFT");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PERSON_QUERY_CRAFT(:IN_PERSON,:RET)}");
            cstmt.setString("IN_PERSON", IN_PERSON);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PERSON_QUERY_CRAFT");
        return result;
    }

    public List<Map> PRO_PERSON_DELETE_CRAFT(String IN_PERSONCODE) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PERSON_DELETE_CRAFT" + "(:IN_PERSONCODE,:RET)}");
            cstmt.setString("IN_PERSONCODE", IN_PERSONCODE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_PERSON_DELETE_CRAFT");
        return result;
    }

    public List<Map> PRO_BASE_POSTTOPERSON_SET(String V_V_ORGCODE,String V_V_POSTCODE,String V_V_PERSONCODE,String V_V_TYPE) throws SQLException {
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_POSTTOPERSON_SET" + "(:V_V_ORGCODE,:V_V_POSTCODE,:V_V_PERSONCODE," +
                    ":V_V_TYPE)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_POSTTOPERSON_SET");
        return result;
    }

    public List<Map> order_issued(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_ISSUED" + "(:V_V_ORDERGUID,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_BASE_POSTTOPERSON_SET");
        return result;
    }

    public List<Map> order_accept(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_ACCEPT" + "(:V_V_ORDERGUID,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_WX_ORDER_ACCEPT");
        return result;
    }

    public List<Map> order_finalaccept(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_ET_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_FINAL_ACCEPT" + "(:V_V_ORDERGUID,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
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
        logger.info("end PRO_WX_ORDER_FINAL_ACCEPT");
        return result;
    }

    public List<Map> WX_INF_FILE_SET(String V_V_ORDERGUID,String V_V_MATERIALGUID,String V_V_FILEGUID,String V_V_FILENAME,FileInputStream V_V_FILEBLOB,
                                     String V_V_FILEPER,String V_V_FILETIME) throws SQLException {
        logger.info("begin WX_INF_FILE_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WX_INF_FILE_SET" + "(:V_V_ORDERGUID,:V_V_MATERIALGUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_FILEBLOB," +
                    ":V_V_FILEPER,:V_V_FILETIME,:V_INFO)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALGUID", V_V_MATERIALGUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBinaryStream("V_V_FILEBLOB", V_V_FILEBLOB);
            cstmt.setString("V_V_FILEPER", V_V_FILEPER);
            cstmt.setString("V_V_FILETIME", V_V_FILETIME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
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
        logger.info("end WX_INF_FILE_SET");
        return result;
    }

    public Map WX_INF_FILE_SEL(String V_V_ORDERGUID,String V_V_MATERIALGUID,String V_V_FILENAME) throws SQLException {


        logger.info("begin WX_INF_FILE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WX_INF_FILE_SEL(:V_V_ORDERGUID,:V_V_MATERIALGUID,:V_V_FILENAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALGUID", V_V_MATERIALGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
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
        logger.info("end WX_INF_FILE_SEL");
        return result;
    }

    public List<Map> WX_ORDER_FILE_GET(String V_V_FILEGUID) throws SQLException {
        logger.info("begin WX_ORDER_FILE_GET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WX_ORDER_FILE_GET" + "(:V_V_FILEGUID,:V_INFO,:V_FILEBLOB)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_FILEBLOB", OracleTypes.BLOB);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Blob stream = (Blob) cstmt.getObject("V_FILEBLOB");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            sledata.put("V_FILEBLOB", stream);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end WX_ORDER_FILE_GET");
        return result;
    }

    public List<Map> WX_ORDER_FILE_DEL(String V_V_FILEGUID) throws SQLException {
        logger.info("begin WX_ORDER_FILE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call WX_ORDER_FILE_DEL" + "(:V_V_FILEGUID,:V_INFO)}");

            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
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
        logger.info("end WX_ORDER_FILE_DEL");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SPARE_DEL(String V_I_ID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_DEL" + "(:V_I_ID,:V_CURSOR)}");

            cstmt.setString("V_I_ID", V_I_ID);
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
        logger.info("end PRO_PM_WORKORDER_SPARE_DEL");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SPARE_SET(Double V_I_ID,String V_V_ORDERGUID,String V_V_FETCHORDERGUID,String V_V_ACTIVITY,
                                                String V_V_MATERIALCODE, String V_V_MATERIALNAME,String V_V_SPEC,String V_V_UNIT,
                                                Double V_F_UNITPRICE,Double V_I_PLANAMOUNT,Double V_F_PLANMONEY,Double V_I_ACTUALAMOUNT,
                                                Double V_F_ACTUALMONEY, String V_V_TYPE,String V_V_MEMO,String V_V_SUBTYPE,
                                                String V_V_STATUS,Double V_I_ABANDONEDAMOUNT,Double V_I_RECLAIMEDAMOUNT,Double V_I_FIXEDAMOUNT,
                                                String V_V_ID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_SET" + "(:V_I_ID,:V_V_ORDERGUID,:V_V_FETCHORDERGUID,:V_V_ACTIVITY,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_V_SPEC,:V_V_UNIT,:V_F_UNITPRICE,:V_I_PLANAMOUNT,:V_F_PLANMONEY,:V_I_ACTUALAMOUNT,:V_F_ACTUALMONEY,:V_V_TYPE,:V_V_MEMO,:V_V_SUBTYPE,:V_V_STATUS,:V_I_ABANDONEDAMOUNT,:V_I_RECLAIMEDAMOUNT,:V_I_FIXEDAMOUNT,:V_V_ID)}");

            cstmt.setDouble("V_I_ID", V_I_ID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_FETCHORDERGUID", V_V_FETCHORDERGUID);
            cstmt.setString("V_V_ACTIVITY", V_V_ACTIVITY);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
            cstmt.setString("V_V_SPEC", V_V_SPEC);
            cstmt.setString("V_V_UNIT", V_V_UNIT);
            cstmt.setDouble("V_F_UNITPRICE", V_F_UNITPRICE);
            cstmt.setDouble("V_I_PLANAMOUNT", V_I_PLANAMOUNT);
            cstmt.setDouble("V_F_PLANMONEY", V_F_PLANMONEY);
            cstmt.setDouble("V_I_ACTUALAMOUNT", V_I_ACTUALAMOUNT);
            cstmt.setDouble("V_F_ACTUALMONEY", V_F_ACTUALMONEY);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_SUBTYPE", V_V_SUBTYPE);
            cstmt.setString("V_V_STATUS", V_V_STATUS);
            cstmt.setDouble("V_I_ABANDONEDAMOUNT", V_I_ABANDONEDAMOUNT);
            cstmt.setDouble("V_I_RECLAIMEDAMOUNT", V_I_RECLAIMEDAMOUNT);
            cstmt.setDouble("V_I_FIXEDAMOUNT", V_I_FIXEDAMOUNT);
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SPARE_SET");
        return result;
    }

    public List<Map> PRO_PM_PRELOADWARE_SELECT_SET(String V_I_ID) throws SQLException {
        logger.info("begin PRO_PM_PRELOADWARE_SELECT_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PRELOADWARE_SELECT_SET" + "(:V_I_ID,:V_CURSOR)}");

            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PRELOADWARE_SELECT_SET");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_JIP_SELECT(String V_I_ID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_JIP_SELECT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_JIP_SELECT" + "(:V_I_ID,:V_CURSOR)}");

            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_JIP_SELECT");
        return result;
    }

    public Map PRO_WORKORDER_SPARE_ZY_ITEM(String V_V_ORDERGUID,String V_V_MATERIALCODE) throws SQLException {

        logger.info("begin PRO_WORKORDER_SPARE_ZY_ITEM");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_SPARE_ZY_ITEM(:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
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
        logger.info("end PRO_WORKORDER_SPARE_ZY_ITEM");
        return result;
    }

    public List<Map> PRO_LOG_TEXT_SET(String V_V_LOG,FileInputStream V_V_XML,String V_D_DATE,
                                      String V_V_TYPE,String V_V_MANCODE) throws SQLException {
        logger.info("begin PRO_LOG_TEXT_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_LOG_TEXT_SET_DLC" + "(:V_V_LOG,:V_V_XML,:V_D_DATE,:V_V_TYPE,:V_V_MANCODE)}");

            cstmt.setString("V_V_LOG", V_V_LOG);
            cstmt.setBinaryStream("V_V_XML", V_V_XML);
            cstmt.setString("V_D_DATE", V_D_DATE);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_MANCODE", V_V_MANCODE);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_LOG_TEXT_SET");
        return result;
    }

    public Map PRO_WX_WORKORDER_OTHER_SEL(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_WX_WORKORDER_OTHER_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_OTHER_SEL(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_WX_WORKORDER_OTHER_SEL");
        return result;
    }

    public List<Map> PRO_WX_WORKORDER_OTHER_SAVE(String V_V_ORDERGUID,String D_DATE_ACP, String D_DATE_OVERDUE,
                                                 String V_REASON_OVERDUE,String V_FIX_EXPLAIN) throws SQLException {
        logger.info("begin PRO_WX_WORKORDER_OTHER_SAVE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_OTHER_SAVE" + "(:V_V_ORDERGUID,:D_DATE_ACP," +
                    ":D_DATE_OVERDUE,:V_REASON_OVERDUE,:V_FIX_EXPLAIN,:V_CURSOR)}");

            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("D_DATE_ACP", D_DATE_ACP);
            cstmt.setString("D_DATE_OVERDUE", D_DATE_OVERDUE);
            cstmt.setString("V_REASON_OVERDUE", V_REASON_OVERDUE);
            cstmt.setString("V_FIX_EXPLAIN", V_FIX_EXPLAIN);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WX_WORKORDER_OTHER_SAVE");
        return result;
    }

    public Map workorderbooked_sel(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,
                                   String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,
                                   String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,
                                   String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,
                                   String V_V_USERCODE) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_SELECT_BOOKED");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SELECT_BOOKED" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT," +
                    ":V_V_ORDER_TYP,:V_V_USERCODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
            cstmt.setString("V_V_USERCODE", V_V_USERCODE);
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
        logger.info("end PRO_PM_WORKORDER_SELECT_BOOKED");
        return result;
    }

    public List<Map> order_booked(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOKED");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_BOOKED" + "(:V_V_ORDERGUID,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("RET"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WX_ORDER_BOOKED");
        return result;
    }

    public List<Map> order_book(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_ORDER_BOOK" + "(:V_V_ORDERGUID,:RET)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("RET"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WX_ORDER_BOOK");
        return result;
    }

    public Map pertodept_sel(String V_V_PERCODE) throws SQLException {


        logger.info("begin PRO_WX_DEPT_SEL");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_DEPT_SEL(:V_V_PERCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PRO_WX_DEPT_SEL");
        return result;
    }

    public Map pertoplan_sel(String V_V_DEPTCODE) throws SQLException {


        logger.info("begin PRO_WX_DEPT_SEL");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_PLANT_SEL(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_WX_DEPT_SEL");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_GET(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_GET");

        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_GET(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            resultList.add(sledata);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_WORKORDER_GET");
        return resultList;
    }

    public List<Map> PRO_PM_WORKORDER_ET_OPERATIONS1(String V_V_ORDERGUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_ET_OPERATIONS1");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ET_OPERATIONS(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            resultList.add(sledata);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_WORKORDER_ET_OPERATIONS1");
        return resultList;
    }

    public List<Map> PRO_PM_WORKORDER_SEND_UPDATE(String V_V_ORDERGUID,String V_V_SEND_STATE) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SEND_UPDATE" + "(:V_V_ORDERGUID,:V_V_SEND_STATE,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SEND_STATE", V_V_SEND_STATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();

            Map sledata = new HashMap();
            sledata.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SEND_UPDATE");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SENDSTATE_SEL(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SENDSTATE_SEL" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SENDSTATE_SEL");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SENDSTATE_E(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SENDSTATE_E" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SENDSTATE_E");
        return result;
    }

    public List<Map> PRO_WX_WORKORDER_PERGET(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_WX_ORDER_BOOK");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WX_WORKORDER_PERGET" + "(:V_V_ORDERGUID,:V_INFO)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WX_WORKORDER_PERGET");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SPARE_MM_SET(String V_V_ORDERGUID,String V_V_ORDERID,String BILLCODE,
                                                   String SPAREPART_CODE,String SPAREPART_NAME,String TYPE,
                                                   String UNIT,String PRICE,String NUMBER,String BILLTYPE) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_SPARE_MM_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_MM_SET" + "(:V_V_ORDERGUID,:V_V_ORDERID,:V_BILLCODE," +
                    ":V_VCH_SPAREPART_CODE,:V_VCH_SPAREPART_NAME,:V_VCH_TYPE,:V_VCH_UNIT,:V_PRICE,:V_F_NUMBER,:V_BILLTYPE," +
                    ":V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_BILLCODE", BILLCODE);
            cstmt.setString("V_VCH_SPAREPART_CODE", SPAREPART_CODE);
            cstmt.setString("V_VCH_SPAREPART_NAME", SPAREPART_NAME);
            cstmt.setString("V_VCH_TYPE", TYPE);
            cstmt.setString("V_VCH_UNIT", UNIT);
            cstmt.setDouble("V_PRICE", Double.valueOf(PRICE));
            cstmt.setDouble("V_F_NUMBER", Double.valueOf(NUMBER));
            cstmt.setString("V_BILLTYPE", BILLTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));

            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SPARE_MM_SET");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SPARE_UPDATE(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_SPARE_UPDATE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_UPDATE" + "(:V_V_ORDERGUID,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_SPARE_UPDATE");
        return result;
    }
    public Map PM_1917_JXGX_WL_DATA_SET(String V_V_JXGX_CODE,String V_V_KFNAME,String V_V_WLCODE,
                                        String V_V_WLSM,String V_V_GGXH,String V_V_JLDW,
                                        String V_V_PRICE,String V_V_NUM) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_DATA_SET");
        Map sledata = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_KFNAME,:V_V_WLCODE," +
                    ":V_V_WLSM,:V_V_GGXH,:V_V_JLDW,:V_V_PRICE,:V_V_NUM,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_KFNAME", V_V_KFNAME);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.setString("V_V_WLSM", V_V_WLSM);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_JLDW", V_V_JLDW);
            cstmt.setString("V_V_PRICE", V_V_PRICE);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String)cstmt.getObject("V_INFO");
            sledata.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
//        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_WL_DATA_SET");
        return sledata;
    }

    public HashMap PM_1917_JXGX_WL_DATA_SEL(String V_V_JXGX_CODE) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_DATA_SEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_DATA_SEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PM_1917_JXGX_WL_DATA_SEL");
        return result;
    }
    public Map PM_1917_JXGX_WL_DATA_DEL(String V_V_JXGX_CODE,String V_V_WLCODE) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_DATA_SET");
        Map sledata = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_DATA_DEL" + "(:V_V_JXGX_CODE,:V_V_WLCODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String)cstmt.getObject("V_INFO");
            sledata.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
//        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_WL_DATA_DEL");
        return sledata;
    }
    public Map PM_1917_JXGX_WL_USENUM_SET(String V_V_JXGX_CODE,String V_V_WLCODE,String V_V_NUM) throws SQLException {
        logger.info("begin PM_1917_JXGX_WL_USENUM_SET");
        Map sledata = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_WL_USENUM_SET" + "(:V_V_JXGX_CODE,:V_V_WLCODE,:V_V_NUM,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_WLCODE", V_V_WLCODE);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String)cstmt.getObject("V_INFO");
            sledata.put("V_INFO", sss);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PM_1917_JXGX_WL_USENUM_SET");
        return sledata;
    }
    public HashMap PRO_WO_FLOW_DATA_SEL(String V_V_PERCODE,String V_D_BEGINTIME,String V_D_ENDTIME,String V_V_GDH,String V_V_FLOWTYPE,Integer V_I_PAGE,Integer V_I_PAGENUMBER) throws SQLException {
        logger.info("begin PRO_WO_FLOW_DATA_SEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DATA_SEL" + "(:V_V_PERCODE,:V_D_BEGINTIME,:V_D_ENDTIME,:V_V_GDH,:V_V_FLOWTYPE,:V_I_PAGE,:V_I_PAGENUMBER,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_D_BEGINTIME", V_D_BEGINTIME);
            cstmt.setString("V_D_ENDTIME", V_D_ENDTIME);
            cstmt.setString("V_V_GDH", V_V_GDH);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setInt("V_I_PAGE", V_I_PAGE);
            cstmt.setInt("V_I_PAGENUMBER", V_I_PAGENUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DATA_SEL");
        return result;
    }
    public HashMap PRO_WO_FLOW_DATA_VIEW(String V_V_DBGUID,Integer V_I_PAGE,Integer V_I_PAGENUMBER) throws SQLException {
        logger.info("begin PRO_WO_FLOW_DATA_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_DATA_VIEW" + "(:V_V_DBGUID,:V_I_PAGE,:V_I_PAGENUMBER,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.setInt("V_I_PAGE", V_I_PAGE);
            cstmt.setInt("V_I_PAGENUMBER", V_I_PAGENUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", sss);
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WO_FLOW_DATA_VIEW");
        return result;
    }
    public HashMap PRO_WO_FLOW_AGREE(String V_V_ORDERID,String V_V_DBGUID,String V_V_IDEA,String V_V_FLOWSTEP) throws SQLException {
        logger.info("begin PRO_WO_FLOW_AGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_AGREE" + "(:V_V_ORDERID,:V_V_DBGUID,:V_V_IDEA,:V_V_FLOWSTEP,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
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
        logger.info("end PRO_WO_FLOW_AGREE");
        return result;
    }
    public HashMap PRO_WO_FLOW_EQU_DISAGREE(String V_V_ORDERID,String V_V_DBGUID,String V_V_IDEA,String V_V_FLOWSTEP) throws SQLException {
        logger.info("begin PRO_WO_FLOW_EQU_DISAGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_EQU_DISAGREE" + "(:V_V_ORDERID,:V_V_DBGUID,:V_V_IDEA,:V_V_FLOWSTEP,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
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
        logger.info("end PRO_WO_FLOW_EQU_DISAGREE");
        return result;
    }
    public HashMap PRO_PM_REPAIRDEPT_VIEW(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_PM_REPAIRDEPT_VIEW");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
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
        logger.info("end PRO_PM_REPAIRDEPT_VIEW");
        return result;
    }
    public HashMap PRO_WO_FLOW_EQU_AGREE(String V_V_ORDERID,String V_V_DBGUID,String V_V_IDEA,String V_V_FLOWSTEP,String V_V_REPAIRCODE,String V_V_PERCODE) throws SQLException {
        logger.info("begin PRO_WO_FLOW_EQU_AGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_EQU_AGREE" + "(:V_V_ORDERID,:V_V_DBGUID,:V_V_IDEA,:V_V_FLOWSTEP,:V_V_REPAIRCODE,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PRO_WO_FLOW_EQU_AGREE");
        return result;
    }
    public HashMap PRO_WO_FLOW_EQU_insertdb(String V_V_ORDERID,String V_V_FLOWSTEP,String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_WO_FLOW_EQU_insertdb");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_EQU_insertdb" + "(:V_V_ORDERID,:V_V_FLOWSTEP,:V_V_DEPTCODE,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_WO_FLOW_EQU_insertdb");
        return result;
    }
    public HashMap PRO_BASE_DEPTCLASS(String V_V_DEPTREPAIRCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPTCLASS");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTCLASS" + "(:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
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
        logger.info("end PRO_BASE_DEPTCLASS");
        return result;
    }
    public HashMap PRO_WO_FLOW_EQU_CANCEL(String V_V_ORDERID) throws SQLException {
        logger.info("begin PRO_WO_FLOW_EQU_CANCEL");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WO_FLOW_EQU_CANCEL" + "(:V_V_ORDERID,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
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
        logger.info("end PRO_WO_FLOW_EQU_CANCEL");
        return result;
    }

    public HashMap PRO_WORKORDER_FLOW_CLASS(String V_V_ORDERGUID,String V_V_DBGUID,String V_V_IDEA,String V_V_CLASS) throws SQLException {
        logger.info("begin PRO_WORKORDER_FLOW_CLASS");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_FLOW_CLASS" + "(:V_V_ORDERGUID,:V_V_DBGUID,:V_V_IDEA,:V_V_CLASS,:V_INFO)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_DBGUID", V_V_DBGUID);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_CLASS", V_V_CLASS);
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
        logger.info("end PRO_WORKORDER_FLOW_CLASS");
        return result;
    }

    public List<Map> PRO_PM_WORKORDER_SPARE_SET2(Double V_I_ID,String V_V_ORDERGUID,String V_V_FETCHORDERGUID,String V_V_ACTIVITY,
                                                String V_V_MATERIALCODE, String V_V_MATERIALNAME,String V_V_SPEC,String V_V_UNIT,
                                                Double V_F_UNITPRICE,Double V_I_PLANAMOUNT,Double V_F_PLANMONEY,Double V_I_ACTUALAMOUNT,
                                                Double V_F_ACTUALMONEY, String V_V_TYPE,String V_V_MEMO,String V_V_SUBTYPE,
                                                String V_V_STATUS,Double V_I_ABANDONEDAMOUNT,Double V_I_RECLAIMEDAMOUNT,Double V_I_FIXEDAMOUNT,
                                                String V_V_ID,Double V_KFCOUNT) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_SET2");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_SET2" + "(:V_I_ID,:V_V_ORDERGUID,:V_V_FETCHORDERGUID,:V_V_ACTIVITY,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_V_SPEC,:V_V_UNIT,:V_F_UNITPRICE,:V_I_PLANAMOUNT,:V_F_PLANMONEY,:V_I_ACTUALAMOUNT,:V_F_ACTUALMONEY,:V_V_TYPE,:V_V_MEMO,:V_V_SUBTYPE,:V_V_STATUS,:V_I_ABANDONEDAMOUNT,:V_I_RECLAIMEDAMOUNT,:V_I_FIXEDAMOUNT,:V_V_ID,:V_KFCOUNT,:RET)}");

            cstmt.setDouble("V_I_ID", V_I_ID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_FETCHORDERGUID", V_V_FETCHORDERGUID);
            cstmt.setString("V_V_ACTIVITY", V_V_ACTIVITY);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);
            cstmt.setString("V_V_SPEC", V_V_SPEC);
            cstmt.setString("V_V_UNIT", V_V_UNIT);
            cstmt.setDouble("V_F_UNITPRICE", V_F_UNITPRICE);
            cstmt.setDouble("V_I_PLANAMOUNT", V_I_PLANAMOUNT);
            cstmt.setDouble("V_F_PLANMONEY", V_F_PLANMONEY);
            cstmt.setDouble("V_I_ACTUALAMOUNT", V_I_ACTUALAMOUNT);
            cstmt.setDouble("V_F_ACTUALMONEY", V_F_ACTUALMONEY);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.setString("V_V_SUBTYPE", V_V_SUBTYPE);
            cstmt.setString("V_V_STATUS", V_V_STATUS);
            cstmt.setDouble("V_I_ABANDONEDAMOUNT", V_I_ABANDONEDAMOUNT);
            cstmt.setDouble("V_I_RECLAIMEDAMOUNT", V_I_RECLAIMEDAMOUNT);
            cstmt.setDouble("V_I_FIXEDAMOUNT", V_I_FIXEDAMOUNT);
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.setDouble("V_KFCOUNT", V_KFCOUNT);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("RET");
            Map sledata = new HashMap();
            sledata.put("V_INFO", "SUCCESS");
            sledata.put("RET", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SPARE_SET2");
        return result;
    }
}
