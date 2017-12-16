package org.building.pm.webservice;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/2/27.
 */

@Service
public class MobileService {

    private static final Logger logger = Logger.getLogger(MobileService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    /*
    * �ƶ��˵�¼
    * */
    public Map mobile_login(String userName, String passWord) throws SQLException {
        logger.info("begin PRO_BASE_PERSON_MOBILE_LOGIN");
        logger.debug("params:V_V_LOGINNAME:" + userName + "params:V_V_PASSWORD:" + passWord);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_MOBILE_LOGIN(:V_V_LOGINNAME,:V_V_PASSWORD,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME", userName);
            cstmt.setString("V_V_PASSWORD", passWord);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_PERSONID", rs.getString("I_PERSONID"));
                sledata.put("V_PERSONNAME", rs.getString("V_PERSONNAME"));
                sledata.put("V_LOGINNAME", rs.getString("V_LOGINNAME"));
                sledata.put("V_PASSWORD", rs.getString("V_PASSWORD"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_ROLECODE", rs.getString("V_ROLECODE"));
                sledata.put("V_ROLENAME", rs.getString("V_ROLENAME"));
                sledata.put("V_POSTCODE", rs.getString("V_POSTCODE"));
                sledata.put("V_POSTNAME", rs.getString("V_POSTNAME"));
                sledata.put("V_DEPTSMALLNAME", rs.getString("V_DEPTSMALLNAME"));
                sledata.put("V_DEPTFULLNAME", rs.getString("V_DEPTFULLNAME"));
                sledata.put("V_DEPTTYPE", rs.getString("V_DEPTTYPE"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_CLASS_CODE", rs.getString("V_CLASS_CODE"));
                sledata.put("V_WORKCSS", rs.getString("V_WORKCSS"));

                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_MOBILE_LOGIN");
        return result;
    }

    /*
    * �ƶ��˲˵�
    * */
    public Map mobile_menu(String IS_V_ROLECODE,String IS_V_SYSTYPE,String IS_V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + IS_V_ROLECODE + "params:IS_V_SYSTYPE:" + IS_V_SYSTYPE+ "params:IS_V_MENUCODE_UP:" + IS_V_MENUCODE_UP+ "params:DEPTCODE:" + DEPTCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_NEW_VIEW(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", IS_V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_MENUID", rs.getString("I_MENUID"));
                sledata.put("V_MENUCODE", rs.getString("V_MENUCODE"));
                sledata.put("V_MENUNAME", rs.getString("V_MENUNAME"));
                sledata.put("V_MENUCODE_UP", rs.getString("V_MENUCODE_UP"));
                sledata.put("V_URL", rs.getString("V_URL"));
                sledata.put("V_ICOURL", rs.getString("V_ICOURL"));
                sledata.put("V_SYSTYPE", rs.getString("V_SYSTYPE"));
                sledata.put("I_ORDERID", rs.getString("I_ORDERID"));
                sledata.put("V_ROLECODE", rs.getString("V_ROLECODE"));
                sledata.put("V_ROLENAME", rs.getString("V_ROLENAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));

                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_ROLETOMENU_NEW_VIEW");
        return result;
    }

    public Map mobile_EquSel(String PlantCode, String DeptCode) throws SQLException {
        logger.info("begin POR_MOBILE_EQU_INF_SEL");
        logger.debug("params:V_V_PLANTCODE:" + PlantCode + "params:V_V_DEPTCODE:" + DeptCode);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call POR_MOBILE_EQU_INF_SEL(:V_V_PLANTCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANTCODE", PlantCode);
            cstmt.setString("V_V_DEPTCODE", DeptCode);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_PERSONID", rs.getString("I_PERSONID"));
                sledata.put("V_PERSONNAME", rs.getString("V_PERSONNAME"));
                sledata.put("V_LOGINNAME", rs.getString("V_LOGINNAME"));
                sledata.put("V_PASSWORD", rs.getString("V_PASSWORD"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_ROLECODE", rs.getString("V_ROLECODE"));
                sledata.put("V_ROLENAME", rs.getString("V_ROLENAME"));
                sledata.put("V_POSTCODE", rs.getString("V_POSTCODE"));
                sledata.put("V_POSTNAME", rs.getString("V_POSTNAME"));
                sledata.put("V_DEPTSMALLNAME", rs.getString("V_DEPTSMALLNAME"));
                sledata.put("V_DEPTFULLNAME", rs.getString("V_DEPTFULLNAME"));
                sledata.put("V_DEPTTYPE", rs.getString("V_DEPTTYPE"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_CLASS_CODE", rs.getString("V_CLASS_CODE"));
                sledata.put("V_WORKCSS", rs.getString("V_WORKCSS"));

                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end POR_MOBILE_EQU_INF_SEL");
        return result;
    }

    public Map PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTCODENEXT,String V_V_DEPTTYPE) throws SQLException {

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
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_SAP_DEPT", rs.getString("V_SAP_DEPT"));
                sledata.put("V_SAP_JHGC", rs.getString("V_SAP_JHGC"));
                sledata.put("V_SAP_WORK", rs.getString("V_SAP_WORK"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }

    public Map PRO_GET_DEPTEQUTYPE_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_PER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }

    public Map PRO_GET_DEPTEQU_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQU_PER");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_PER(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQU_PER");
        return result;
    }

    public Map PRO_SAP_EQU_VIEW(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE,
                                String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_EQU_VIEW");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQU_PER");
        return result;
    }

    public Map PM_14_FAULT_TYPE_ITEM_SEL() throws SQLException {

        logger.info("begin PM_14_FAULT_TYPE_ITEM_SEL");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_TYPE_ITEM_SEL(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_TYPECODE", rs.getString("V_TYPECODE"));
                sledata.put("V_TYPENAME", rs.getString("V_TYPENAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_TYPE_ITEM_SEL");
        return result;
    }

    public Map PRO_CLASS_M_QUERY(String IN_DEPARTCODE,String IN_CLASSNAME) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY");
//        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

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
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_CLASS_CODE", rs.getString("V_CLASS_CODE"));
                sledata.put("V_CLASS_NAME", rs.getString("V_CLASS_NAME"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_SAP_WORKNAME", rs.getString("V_SAP_WORKNAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_CLASS_M_QUERY");
        return result;
    }

    public Map PRO_CLASS_M_QUERY_P(String IN_CLASSCODE) throws SQLException {

        logger.info("begin PRO_CLASS_M_QUERY_P");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

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
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_PERSONCODE", rs.getString("V_PERSONCODE"));
                sledata.put("V_PERSONNAME", rs.getString("V_PERSONNAME"));
                sledata.put("V_CLASS_NAME", rs.getString("V_CLASS_NAME"));
                sledata.put("V_ROLECODE", rs.getString("V_ROLECODE"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_CLASS_M_QUERY_P");
        return result;
    }


    public Map PM_14_FAULT_PER_CLASS_SET(String V_V_GUID,String V_V_CLASSCODE,String V_V_PERCODE) throws SQLException {
//        logger.info("begin PM_14_FAULT_PER_CLASS_SET");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_PER_CLASS_SET" + "(:V_V_GUID,:V_V_CLASSCODE," +
                    ":V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_CLASSCODE", V_V_CLASSCODE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_PER_CLASS_SET");
        return result;
    }

    public Map PM_14_FAULT_ITEM_DATA_SEND(String V_V_PERCODE,String V_V_IP,String V_V_GUID) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_DATA_SEND");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEND" + "(:V_V_PERCODE,:V_V_IP," +
                    ":V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SEND");
        return result;
    }

    public Map PRO_PM_19_CARDE_SEL(String V_V_CARNAME) throws SQLException {

        logger.info("begin PRO_PM_19_CARDE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARDE_SEL(:V_V_CARNAME,:V_CURSOR)}");
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getDouble("I_ID"));
                sledata.put("V_CARCODE", rs.getString("V_CARCODE"));
                sledata.put("V_CARNAME", rs.getString("V_CARNAME"));
                sledata.put("V_CARTYPE", rs.getString("V_CARTYPE"));
                sledata.put("V_TIME", rs.getString("V_TIME"));
                sledata.put("V_DE", rs.getString("V_DE"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_CARDE_SEL");
        return result;
    }

    public Map PM_14_FAULT_JJ_SET(String V_V_GUID,String V_V_CARCODE) throws SQLException {
//        logger.info("begin PM_14_FAULT_JJ_SET");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_JJ_SET" + "(:V_V_GUID,:V_V_CARCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_JJ_SET");
        return result;
    }

    public Map PM_14_FAULT_SPARE_ITEM_SEL(String V_V_GUID,String V_V_SPAREPART_CODE) throws SQLException {

        logger.info("begin PM_14_FAULT_SPARE_ITEM_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_SPARE_ITEM_SEL(:V_V_GUID,:V_V_SPAREPART_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPAREPART_CODE", V_V_SPAREPART_CODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_GUID", rs.getString("V_GUID"));
                sledata.put("V_SPAREPART_CODE", rs.getString("V_SPAREPART_CODE"));
                sledata.put("V_SPAREPART_NAME", rs.getString("V_SPAREPART_NAME"));
                sledata.put("V_TYPE", rs.getString("V_TYPE"));
                sledata.put("V_UNIT", rs.getString("V_UNIT"));
                sledata.put("V_PRICE", rs.getString("V_PRICE"));
                sledata.put("V_NUMBER", rs.getString("V_NUMBER"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_SPARE_ITEM_SEL");
        return result;
    }

    public Map PM_14_FAULT_SPARE_ITEM_DEL(String V_V_GUID,String V_V_SPAREPART_CODE) throws SQLException {
//        logger.info("begin PM_14_FAULT_SPARE_ITEM_DEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_SPARE_ITEM_DEL" + "(:V_V_GUID,:V_V_SPAREPART_CODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPAREPART_CODE", V_V_SPAREPART_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_SPARE_ITEM_DEL");
        return result;
    }

    public Map PM_14_FAULT_SPARE_ITEM_SET(String V_V_GUID,String  V_V_SPAREPART_CODE,String V_V_SPAREPART_NAME,
                                  String V_V_TYPE,String V_V_UNIT,String V_V_PRICE,String V_V_NUMBER) throws SQLException {
//        logger.info("begin PM_14_FAULT_SPARE_ITEM_SET");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_SPARE_ITEM_SET" + "(:V_V_GUID,:V_V_SPAREPART_CODE,:V_V_SPAREPART_NAME," +
                    ":V_V_TYPE,:V_V_UNIT,:V_V_PRICE,V_V_NUMBER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPAREPART_CODE", V_V_SPAREPART_CODE);
            cstmt.setString("V_V_SPAREPART_NAME", V_V_SPAREPART_NAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_UNIT", V_V_UNIT);
            cstmt.setString("V_V_PRICE", V_V_PRICE);
            cstmt.setString("V_V_NUMBER", V_V_NUMBER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_SPARE_ITEM_SET");
        return result;
    }

    public Map<String, Object> PM_14_FAULT_ITEM_SEL(String V_V_ORGCODE,String  V_V_DEPTCODE,String V_V_EQUTYPE,
                                                    String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,
                                                    String V_V_FAULT_YY) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getString("I_ID"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUCHILD_CODE", rs.getString("V_EQUCHILD_CODE"));
                sledata.put("V_EQUCHILD_NAME", rs.getString("V_EQUCHILD_NAME"));
                sledata.put("V_TYPECODE", rs.getString("V_TYPECODE"));
                sledata.put("V_TYPENAME", rs.getString("V_TYPENAME"));
                sledata.put("V_FAULT_YY", rs.getString("V_FAULT_YY"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_SEL");
        return result;

    }

    public Map<String, Object> PM_14_FAULT_ITEM_SELBYGUID(String V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_SELBYGUID");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_SELBYGUID(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getString("I_ID"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUCHILD_CODE", rs.getString("V_EQUCHILD_CODE"));
                sledata.put("V_EQUCHILD_NAME", rs.getString("V_EQUCHILD_NAME"));
                sledata.put("V_TYPECODE", rs.getString("V_TYPECODE"));
                sledata.put("V_TYPENAME", rs.getString("V_TYPENAME"));
                sledata.put("V_FAULT_YY", rs.getString("V_FAULT_YY"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_SELBYGUID");
        return result;

    }

    public Map<String, Object> PM_14_FAULT_ITEM_DATA_GET(String V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_GET");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_GET(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getString("I_ID"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUCHILD_CODE", rs.getString("V_EQUCHILD_CODE"));
                sledata.put("V_EQUCHILD_NAME", rs.getString("V_EQUCHILD_NAME"));
                sledata.put("V_TYPECODE", rs.getString("V_TYPECODE"));
                sledata.put("V_TYPENAME", rs.getString("V_TYPENAME"));
                sledata.put("V_FAULT_YY", rs.getString("V_FAULT_YY"));
                sledata.put("V_FAULT_XX", rs.getString("V_FAULT_XX"));
                sledata.put("V_FAULT_LEVEL", rs.getString("V_FAULT_LEVEL"));
                sledata.put("V_JJBF", rs.getString("V_JJBF"));
                sledata.put("V_JJ", rs.getString("V_JJ"));
                sledata.put("V_WL", rs.getString("V_WL"));
                sledata.put("V_PART", rs.getString("V_PART"));
                sledata.put("V_MATERIAL", rs.getString("V_MATERIAL"));
                sledata.put("V_TIME", rs.getString("V_TIME"));
                sledata.put("V_FILE_GUID", rs.getString("V_FILE_GUID"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                sledata.put("V_FZR", rs.getString("V_FZR"));
                sledata.put("V_STATE", rs.getString("V_STATE"));
                sledata.put("V_FEEDBACK", rs.getString("V_FEEDBACK"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
                sledata.put("V_FINDTIME", rs.getString("V_FINDTIME"));
                sledata.put("V_ORDERGUID", rs.getString("V_ORDERGUID"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_GET");
        return result;

    }

    public Map PM_14_FAULT_ITEM_DATA_SEL(String V_V_ORGCODE,String  V_V_DEPTCODE,String V_V_EQUTYPE,
                                         String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,
                                         String V_V_FAULT_YY,String V_V_FINDTIME_B,String V_V_FINDTIME_E) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME_B,:V_V_FINDTIME_E,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FINDTIME_B", V_V_FINDTIME_B);
            cstmt.setString("V_V_FINDTIME_E", V_V_FINDTIME_E);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                sledata.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                sledata.put("V_EQUCODE", rs.getString("V_EQUCODE"));
                sledata.put("V_EQUNAME", rs.getString("V_EQUNAME"));
                sledata.put("V_EQUCHILD_CODE", rs.getString("V_EQUCHILD_CODE"));
                sledata.put("V_FAULT_GUID", rs.getString("V_FAULT_GUID"));
                sledata.put("V_EQUCHILD_NAME", rs.getString("V_EQUCHILD_NAME"));
                sledata.put("V_TYPECODE", rs.getString("V_TYPECODE"));
                sledata.put("V_TYPENAME", rs.getString("V_TYPENAME"));
                sledata.put("V_FAULT_YY", rs.getString("V_FAULT_YY"));
                sledata.put("V_FAULT_XX", rs.getString("V_FAULT_XX"));
                sledata.put("V_FAULT_LEVEL", rs.getString("V_FAULT_LEVEL"));
                sledata.put("V_JJBF", rs.getString("V_JJBF"));
                sledata.put("V_PER_CLASS", rs.getString("V_PER_CLASS"));
                sledata.put("V_JJ", rs.getString("V_JJ"));
                sledata.put("V_WL", rs.getString("V_WL"));
                sledata.put("V_PART", rs.getString("V_PART"));
                sledata.put("V_MATERIAL", rs.getString("V_MATERIAL"));
                sledata.put("V_TIME", rs.getString("V_TIME"));
                sledata.put("V_FILE_GUID", rs.getString("V_FILE_GUID"));
                sledata.put("V_GUID", rs.getString("V_GUID"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SEL");
        return result;
    }


    public Map PM_14_FAULT_ITEM_DATA_SET(String V_V_GUID,String  V_V_ORGCODE,String  V_V_DEPTCODE,String  V_V_EQUTYPE,
                                         String V_V_EQUCODE,String  V_V_EQUCHILD_CODE,String  V_V_FAULT_GUID,
                                         String V_V_FAULT_TYPE,String V_V_FAULT_YY,String V_V_FINDTIME,String V_V_FAULT_XX, String V_V_JJBF,
                                         String V_V_FAULT_LEVEL,String V_V_FILE_GUID,String V_V_INTIME,
                                         String V_V_PERCODE,String V_V_IP) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_DATA_SET");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE," +
                    ":V_V_FAULT_YY,:V_V_FINDTIME,:V_V_FAULT_XX,:V_V_JJBF,:V_V_FAULT_LEVEL,:V_V_FILE_GUID," +
                    ":V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
            cstmt.setString("V_V_FAULT_TYPE", V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY", V_V_FAULT_YY);
            cstmt.setString("V_V_FINDTIME", V_V_FINDTIME);
            cstmt.setString("V_V_FAULT_XX", V_V_FAULT_XX);
            cstmt.setString("V_V_JJBF", V_V_JJBF);
            cstmt.setString("V_V_FAULT_LEVEL", V_V_FAULT_LEVEL);
            cstmt.setString("V_V_FILE_GUID", V_V_FILE_GUID);
            cstmt.setString("V_V_INTIME", V_V_INTIME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SET");
        return result;
    }

    public Map PM_14_FAULT_ITEM_DATA_DEL(String V_V_PERCODE,String  V_V_IP,String  V_V_GUID) throws SQLException {
//        logger.info("begin PM_14_FAULT_ITEM_DATA_DEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_DEL" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_SPARE_ITEM_SET");
        return result;
    }

    public Map PRO_BASE_FILE_SEL(String V_V_GUID,String V_V_SPAREPART_CODE) throws SQLException {

        logger.info("begin PRO_BASE_FILE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_SEL(:V_V_GUID,:V_V_SPAREPART_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPAREPART_CODE", V_V_SPAREPART_CODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_FILENAME", rs.getString("V_FILENAME"));
                sledata.put("V_FILETYPENAME", rs.getString("V_FILETYPENAME"));
                sledata.put("V_PLANT", rs.getString("V_PLANT"));
                sledata.put("V_DEPT", rs.getString("V_DEPT"));
                sledata.put("V_TIME", rs.getString("V_TIME"));
                sledata.put("V_PERSON", rs.getString("V_PERSON"));
                sledata.put("V_REMARK", rs.getString("V_REMARK"));
                sledata.put("V_FILEGUID", rs.getString("V_FILEGUID"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_FILE_SEL");
        return result;
    }

    public List<Map> PRO_BASE_FILE_ADD(String V_V_GUID,String V_V_FILENAME,InputStream inputStream,
                                       String V_V_FILETYPECODE,String V_V_PLANT,String V_V_DEPT,
                                       String V_V_PERSON,String V_V_REMARK) throws SQLException {
        logger.info("begin PRO_BASE_FILE_ADD");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_ADD" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB," +
                    ":V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBinaryStream("V_V_FILEBLOB", inputStream);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
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
        logger.info("end PRO_BASE_FILE_ADD");
        return result;
    }

    public List<Map> PRO_BASE_FILE_DOWNLOAD(String guid,String V_V_FILEGUID) throws SQLException {
        logger.info("begin PRO_BASE_MOBILE_FILE_DOWNLOAD");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_MOBILE_FILE_DOWNLOAD" + "(:V_V_GUID,:V_V_FILEGUID,:V_FILENAME,:V_BLOB,:V_INFO)}");
            cstmt.setString("V_V_GUID", guid);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_FILENAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_BLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String filename = (String) cstmt.getObject("V_FILENAME");
            String ret = (String) cstmt.getObject("V_INFO");
            Blob stream = (Blob) cstmt.getObject("V_BLOB");
            Map sledata = new HashMap();
            sledata.put("FileName", filename);
            sledata.put("V_INFO", ret);
            sledata.put("V_BLOB", stream);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_MOBILE_FILE_DOWNLOAD");
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

    public Map PRO_BASE_FILE_DEL(String V_V_FILEGUID) throws SQLException {
//        logger.info("begin PRO_BASE_FILE_DEL");
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_DEL" + "(:V_V_FILEGUID,:V_INFO)}");
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String sss = (String) cstmt.getObject("V_INFO");
            Map sledata = new HashMap();
            sledata.put("V_INFO", sss);
            resultList.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_FILE_DEL");
        return result;
    }

}
