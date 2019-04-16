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

/**
 * Created by cxy on 2019/1/24.
 */
@Service
public class CxyService {
    private static final Logger logger = Logger.getLogger(CxyService.class.getName());

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

    public HashMap BASE_ROLETOTABLE_SEL(String V_V_DEPTCODE, String V_V_ROLECODE, String V_V_UPCODE) throws SQLException {
//        logger.info("begin BASE_ROLETOTABLE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_ROLETOTABLE_SEL" + "(:V_V_DEPTCODE,:V_V_ROLECODE,:V_V_UPCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_UPCODE", V_V_UPCODE);
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
        logger.info("end BASE_ROLETOTABLE_SEL");
        return result;
    }


    public HashMap PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(String V_V_OTHERPLAN_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_BY_MONTHGUID");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(:V_V_OTHERPLAN_GUID,:V_CURSOR,:V_INFO)}");
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_BY_MONTHGUID");
        return result;
    }


    public HashMap PRO_BASE_FAULT_SEL() throws SQLException {
//        logger.info("begin PRO_BASE_FAULT_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_FAULT_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_FAULT_SEL");
        return result;
    }

    public HashMap PRO_PM_STANDARD_GX_BOM_SEL(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_REPAIR_CODE,String V_V_EQUTYPE) throws SQLException {

        logger.info("begin PRO_PM_STANDARD_GX_BOM_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_STANDARD_GX_BOM_SEL" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_REPAIR_CODE,:V_V_EQUTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIR_CODE", V_V_REPAIR_CODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_CURSOR", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_STANDARD_GX_BOM_SEL");
        return result;
    }

    public HashMap PM_STANDARD_GX_BOM_SET(String V_V_GUID,String V_V_SPCODE,String V_V_EQUCODE,String V_V_NUM,String V_V_INPUTER) throws SQLException {

        logger.info("begin PM_STANDARD_GX_BOM_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_STANDARD_GX_BOM_SET" + "(:V_V_GUID,:V_V_SPCODE,:V_V_EQUCODE,:V_V_NUM,:V_V_INPUTER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_SPCODE", V_V_SPCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.setString("V_V_INPUTER", V_V_INPUTER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_STANDARD_GX_BOM_SET");
        return result;
    }

    public HashMap SAP_PM_EQU_BOM_FOR_JX_SEL(String V_V_GUID) throws SQLException {

        logger.info("begin SAP_PM_EQU_BOM_FOR_JX_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SAP_PM_EQU_BOM_FOR_JX_SEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("V_CURSOR", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAP_PM_EQU_BOM_FOR_JX_SEL");
        return result;
    }

    //查询维修标准主表BY TYPE
    public Map PRO_STANDARD_DATA_BY_TYPE_SEL(String V_V_EQUTYPE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_STANDARD_DATA_BY_TYPE_SEL");

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_STANDARD_DATA_BY_TYPE_SEL(:V_V_EQUTYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            String V_V_SNUM = (String) cstmt.getObject("V_V_SNUM");
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
            result.put("total", V_V_SNUM);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }

        logger.debug("result:" + result);
        logger.info("end PRO_STANDARD_DATA_BY_TYPE_SEL");
        return result;
    }

    public HashMap PRO_WORKORDER_STANDARD_SET(String V_V_GUID,String V_V_ORDERID,String V_V_INPUTER) throws SQLException {

        logger.info("begin PRO_WORKORDER_STANDARD_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_WORKORDER_STANDARD_SET" + "(:V_V_GUID,:V_V_ORDERID,:V_V_INPUTER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_INPUTER", V_V_INPUTER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WORKORDER_STANDARD_SET");
        return result;
    }

    public HashMap PM_1405_FAULT_ITEM_DATA_SET_NEW(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE,
                                             String V_V_EQUCHILD_CODE, String V_V_FAULT_GUID, String V_V_FAULT_TYPE, String V_V_FAULT_YY,
                                             String V_V_FINDTIME, String V_V_FAULT_XX,
                                             String V_V_JJBF,String V_V_FAULT_LEVEL, String V_V_FILE_GUID, String V_V_INTIME,
                                             String V_V_PERCODE, String V_V_IP,String V_V_FAULT_NAME,String V_V_FAULT_PART,String V_V_FAULT_CLGC,
                                               String V_V_FAULT_SS,String V_V_FAULT_XZ,String V_V_FAULT_ZGCS,String V_V_FZR_CL) throws SQLException {
        logger.info("begin PM_1405_FAULT_ITEM_DATA_SET_NEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1405_FAULT_ITEM_DATA_SET_NEW" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME," +
                    ":V_V_FAULT_XX,:V_V_JJBF,:V_V_FAULT_LEVEL," +
                    ":V_V_FILE_GUID,:V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_V_FAULT_NAME,:V_V_FAULT_PART,:V_V_FAULT_CLGC," +
                    ":V_V_FAULT_SS,:V_V_FAULT_XZ,:V_V_FAULT_ZGCS,:V_V_FZR_CL,:V_INFO,:FAULTID)}");
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
            cstmt.setString("V_V_FAULT_NAME", V_V_FAULT_NAME);
            cstmt.setString("V_V_FAULT_PART", V_V_FAULT_PART);
            cstmt.setString("V_V_FAULT_CLGC", V_V_FAULT_CLGC);
            cstmt.setString("V_V_FAULT_SS", V_V_FAULT_SS);
            cstmt.setString("V_V_FAULT_XZ", V_V_FAULT_XZ);
            cstmt.setString("V_V_FAULT_ZGCS", V_V_FAULT_ZGCS);
            cstmt.setString("V_V_FZR_CL", V_V_FZR_CL);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("FAULTID", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("FAULTID", cstmt.getString("FAULTID"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1405_FAULT_ITEM_DATA_SET_NEW");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_SBGZ_CREATE(String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SBGZ_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SBGZ_CREATE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_WORKORDER_SBGZ_CREATE");
        return result;
    }
    public HashMap MM_USER_TRENDS_INS(String V_V_USERID, String V_V_ACTIVE, String V_V_REMARK, String V_V_ACT_TYPE, String V_V_IP) throws SQLException {
        logger.info("begin MM_USER_TRENDS_INS");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call MM_USER_TRENDS_INS" + "(:V_V_USERID,:V_V_ACTIVE,:V_V_REMARK," +
                    ":V_V_ACT_TYPE,:V_V_IP,:V_INFO)}");
            cstmt.setString("V_V_USERID", V_V_USERID);
            cstmt.setString("V_V_ACTIVE", V_V_ACTIVE);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
            cstmt.setString("V_V_ACT_TYPE", V_V_ACT_TYPE);
            cstmt.setString("V_V_IP", V_V_IP);
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
        logger.info("end MM_USER_TRENDS_INS");
        return result;
    }

    public HashMap MM_USER_TRENDS_SEL(String V_V_USERID) throws SQLException {

        logger.info("begin MM_USER_TRENDS_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MM_USER_TRENDS_SEL" + "(:V_V_USERID,:V_CURSOR)}");
            cstmt.setString("V_V_USERID", V_V_USERID);
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
        logger.info("end MM_USER_TRENDS_SEL");
        return result;
    }
//    String[] str=new String[100];
//    int k=0;
    public List<Map> PRO_BASE_NEW_MENU_BYNAME_SELTree(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE,String V_V_HOME_MENU,String V_V_MENUNAME) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU_BYNAME_SEL");
        List<Map> list=new ArrayList<>();
        List<Map> mylist=new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_BYNAME_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_V_MENUNAME,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
            cstmt.setString("V_V_MENUNAME", V_V_MENUNAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            HashMap result = new HashMap();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            List<Map> datalist = (List) result.get("list");

            if(datalist.size()>0){
                for(Map item:datalist){
                    if (item.get("V_MENUCODE_UP").toString().equals("-1")) {
                        Map temp = new HashMap();
                        temp.put("id", item.get("V_MENUCODE").toString());
                        temp.put("text", item.get("V_MENUNAME").toString());
                        temp.put("title", item.get("V_MENUNAME").toString());
                        temp.put("pid", item.get("V_MENUCODE_UP").toString());
                        temp.put("type", item.get("V_TYPE").toString());
                        temp.put("flag", item.get("V_FLAG").toString());
                        temp.put("other", item.get("V_OTHER").toString());
                        temp.put("cls", "empty");
                        temp.put("expanded", true);
                        temp.put("hrefTarget", "Workspace");
                        if(getChildren(datalist,item.get("V_MENUCODE").toString()).size()<=0){//无子节点
                            temp.put("leaf",true);
                            temp.put("src", item.get("V_URL").toString());
                            temp.put("href", item.get("V_URL").toString());
                        }else{//有子节点
                            temp.put("leaf",false);
                            temp.put("children",getChildren(datalist,item.get("V_MENUCODE").toString()));
                        }
                        list.add(temp);
                    }

                }

            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_NEW_MENU_BYNAME_SEL");
        return list;
    }
    public List<Map> getChildren(List<Map> list,String parentNode) {
        List<Map> menu=new ArrayList<>();
        for(Map item:list){
            if(item.get("V_MENUCODE_UP").equals(parentNode)){
                Map temp=new HashMap();
                temp.put("id", item.get("V_MENUCODE").toString());
                temp.put("text", item.get("V_MENUNAME").toString());
                temp.put("title", item.get("V_MENUNAME").toString());
                temp.put("pid", item.get("V_MENUCODE_UP").toString());
                temp.put("type", item.get("V_TYPE").toString());
                temp.put("flag", item.get("V_FLAG").toString());
                temp.put("other", item.get("V_OTHER").toString());
                temp.put("cls", "empty");
                temp.put("expanded", true);
                temp.put("hrefTarget", "Workspace");
                if(getChildren(list,item.get("V_MENUCODE").toString()).size()==0){//无子节点
                    temp.put("leaf",true);
                    temp.put("src", item.get("V_URL").toString());
                    temp.put("href", item.get("V_URL").toString());
                }else{//有子节点
                    temp.put("leaf",false);
                    temp.put("children",getChildren(list,item.get("V_MENUCODE").toString()));
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public HashMap MM_USER_TRENDS_BYNAME_SEL(String V_V_USERID,String V_V_MENUNAME) throws SQLException {

        logger.info("begin MM_USER_TRENDS_BYNAME_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MM_USER_TRENDS_BYNAME_SEL" + "(:V_V_USERID,:V_V_MENUNAME,:V_CURSOR)}");
            cstmt.setString("V_V_USERID", V_V_USERID);
            cstmt.setString("V_V_MENUNAME", V_V_MENUNAME);
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
        logger.info("end MM_USER_TRENDS_BYNAME_SEL");
        return result;
    }
    public HashMap MM_USER_TRENDS_DEL(String V_I_ID) throws SQLException {
        logger.info("begin MM_USER_TRENDS_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call MM_USER_TRENDS_DEL" + "(:V_I_ID,:V_INFO)}");
            cstmt.setString("V_I_ID", V_I_ID);

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
        logger.info("end MM_USER_TRENDS_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_FAULT_SAVE(String V_V_PERCODE,String V_V_PERNAME,String V_V_GUID,String V_V_ORDERGUID,String V_V_SHORT_TXT,
                                             String V_V_DEPTCODEREPAIR,String V_D_START_DATE,String V_D_FINISH_DATE,String V_V_WBS,String V_V_WBS_TXT,
                                             String V_V_TOOL,String V_V_TECHNOLOGY,String V_V_SAFE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_FAULT_SAVE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FAULT_SAVE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_ORDERGUID,:V_V_SHORT_TXT," +
                    ":V_V_DEPTCODEREPAIR,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT," +
                    ":V_V_TOOL,:V_V_TECHNOLOGY,:V_V_SAFE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
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

    public HashMap PM_14_FAULT_ITEM_DATA_UP(String V_V_PERCODE,String V_V_IP,String V_V_GUID) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_UP");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_UP" + "(:V_V_PERCODE,:V_V_IP,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_IP", V_V_IP);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_UP");
        return result;
    }

    public HashMap MM_USER_TRENDS_TABLE_SEL(String V_V_USERID) throws SQLException {

        logger.info("begin MM_USER_TRENDS_TABLE_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call MM_USER_TRENDS_TABLE_SEL" + "(:V_V_USERID,:V_CURSOR)}");
            cstmt.setString("V_V_USERID", V_V_USERID);
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
        logger.info("end MM_USER_TRENDS_TABLE_SEL");
        return result;
    }
    public HashMap PRO_FAULT_ITEM_DATA_GET(String V_V_FAULT_GUID) throws SQLException {

        logger.info("begin PRO_FAULT_ITEM_DATA_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_FAULT_ITEM_DATA_GET" + "(:V_V_FAULT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
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
        logger.info("end PRO_FAULT_ITEM_DATA_GET");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_INSTANCEID_SET(String V_V_GUID,String V_V_INSTANCEID) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_INSTANCEID_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_INSTANCEID_SET" + "(:V_V_GUID,:V_V_INSTANCEID,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_INSTANCEID", V_V_INSTANCEID);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_INSTANCEID_SET");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_GET(String V_V_GUID) throws SQLException {

        logger.info("begin PM_14_FAULT_ITEM_DATA_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_GET" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PM_14_FAULT_ITEM_DATA_GET");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_STATE_UPDATE(String V_V_PERCODE,String V_V_GUID,String V_V_STATE,String V_DEFECT_STATE) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_STATE_UPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_STATE_UPDATE" + "(:V_V_PERCODE,:V_V_GUID,:V_V_STATE,:V_DEFECT_STATE,:RET)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_DEFECT_STATE", V_DEFECT_STATE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_STATE_UPDATE");
        return result;
    }

    public HashMap PM_1405_FAULT_ITEM_DATA_UPDATE(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE,
                                               String V_V_EQUCHILD_CODE, String V_V_FAULT_GUID, String V_V_FAULT_TYPE, String V_V_FAULT_YY,
                                               String V_V_FINDTIME, String V_V_FAULT_XX,
                                               String V_V_JJBF,String V_V_FAULT_LEVEL, String V_V_FILE_GUID, String V_V_INTIME,
                                               String V_V_PERCODE, String V_V_IP,String V_V_FAULT_NAME,String V_V_FAULT_PART,String V_V_FAULT_CLGC,
                                               String V_V_FAULT_SS,String V_V_FAULT_XZ,String V_V_FAULT_ZGCS,String V_V_FZR_CL) throws SQLException {
        logger.info("begin PM_1405_FAULT_ITEM_DATA_UPDATE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1405_FAULT_ITEM_DATA_UPDATE" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_GUID,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME," +
                    ":V_V_FAULT_XX,:V_V_JJBF,:V_V_FAULT_LEVEL," +
                    ":V_V_FILE_GUID,:V_V_INTIME,:V_V_PERCODE,:V_V_IP,:V_V_FAULT_NAME,:V_V_FAULT_PART,:V_V_FAULT_CLGC," +
                    ":V_V_FAULT_SS,:V_V_FAULT_XZ,:V_V_FAULT_ZGCS,:V_V_FZR_CL,:V_INFO)}");
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
            cstmt.setString("V_V_FAULT_NAME", V_V_FAULT_NAME);
            cstmt.setString("V_V_FAULT_PART", V_V_FAULT_PART);
            cstmt.setString("V_V_FAULT_CLGC", V_V_FAULT_CLGC);
            cstmt.setString("V_V_FAULT_SS", V_V_FAULT_SS);
            cstmt.setString("V_V_FAULT_XZ", V_V_FAULT_XZ);
            cstmt.setString("V_V_FAULT_ZGCS", V_V_FAULT_ZGCS);
            cstmt.setString("V_V_FZR_CL", V_V_FZR_CL);
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
        logger.info("end PM_1405_FAULT_ITEM_DATA_UPDATE");
        return result;
    }
    public HashMap PRO_BASE_FILE_ADD(String V_V_GUID, String V_V_FILENAME, InputStream V_V_FILEBLOB, String V_V_FILETYPECODE, String V_V_PLANT, String V_V_DEPT, String V_V_PERSON, String V_V_REMARK) throws SQLException {

        logger.info("begin PRO_BASE_FILE_ADD");
        System.out.println("service");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_FILE_ADD" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILEBLOB,:V_V_FILETYPECODE,:V_V_PLANT,:V_V_DEPT,:V_V_PERSON,:V_V_REMARK,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_FILEBLOB",V_V_FILEBLOB);
            cstmt.setString("V_V_FILETYPECODE", V_V_FILETYPECODE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPT", V_V_DEPT);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
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
        logger.info("end PRO_BASE_FILE_ADD");
        System.out.println("service");

        return result;
    }

    public List<Map> PRO_BASE_NEW_MENU_SELNEW(String IS_V_ROLECODE, String IS_V_PID) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU_SELNEW");
        List<Map> list=new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_SELNEW(:IS_V_ROLECODE,:IS_V_PID,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_PID", IS_V_PID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            HashMap result = new HashMap();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            List<Map> datalist = (List) result.get("list");

            if(datalist.size()>0){
                for(Map item:datalist){
                    if (item.get("V_MENUCODE_UP").toString().equals("-1")) {
                        Map temp = new HashMap();
                        temp.put("id", item.get("V_MENUCODE").toString());
                        temp.put("text", item.get("V_MENUNAME").toString());
                        temp.put("title", item.get("V_MENUNAME").toString());
                        temp.put("pid", item.get("V_MENUCODE_UP").toString());
                        temp.put("type", item.get("V_TYPE").toString());
                        temp.put("flag", item.get("V_FLAG").toString());
                        temp.put("other", item.get("V_OTHER").toString());
                        temp.put("cls", "empty");
                        temp.put("expanded", false);
                        temp.put("hrefTarget", "Workspace");
                        if(getChildren(datalist,item.get("V_MENUCODE").toString()).size()<=0){//无子节点
                            temp.put("leaf",true);
                            temp.put("src", item.get("V_URL").toString());
                            temp.put("href", item.get("V_URL").toString());
                        }else{//有子节点
                            temp.put("leaf",false);
                            temp.put("children",getChildren(datalist,item.get("V_MENUCODE").toString()));
                        }
                        list.add(temp);
                    }

                }

            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_NEW_MENU_SELNEW");
        return list;
    }

    public HashMap PM_WORKORDER_TO_FAULT_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_WORKORDER_TO_FAULT_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKORDER_TO_FAULT_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_V_SNUM"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_TO_FAULT_SEL");
        return result;
    }

    public HashMap PM_WORKORDER_FAULT_SET(String V_V_FAULT_GUID,String V_V_WORKORDER_ORDERID,String V_V_INPER_CODE) throws SQLException {
        logger.info("begin PM_WORKORDER_FAULT_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FAULT_SET" + "(:V_V_FAULT_GUID,:V_V_WORKORDER_ORDERID,:V_V_INPER_CODE,:V_INFO)}");

            cstmt.setString("V_V_FAULT_GUID", V_V_FAULT_GUID);
            cstmt.setString("V_V_WORKORDER_ORDERID", V_V_WORKORDER_ORDERID);
            cstmt.setString("V_V_INPER_CODE", V_V_INPER_CODE);
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
        logger.info("end PM_WORKORDER_FAULT_SET");
        return result;
    }

    public HashMap PRO_PM_07_DEPTEQU_PER_DROP(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEPTEQU_PER_DROP");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUCODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUCODE"));
                    temp.put("text", rs.getString("V_EQUNAME"));
//                    temp.put("leaf", true);
                    temp.put("expanded", false);
//                    temp.put("checked", false);
                    temp.put("choose", true);
                    temp.put("parentid",V_V_EQUTYPECODE);
                    temp.put("treeid",rs.getString("V_EQUCODE"));
                    temp.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                    temp.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                    temp.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                    temp.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                    temp.put("id", rs.getString("V_EQUCODE"));
                    temp.put("text", rs.getString("V_EQUNAME"));
                    list.add(temp);


                }

            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEPTEQU_PER_DROP");
        return result;
    }
    //tree
    public HashMap PRO_SAP_EQU_VIEW(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_EQU_VIEW");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
//            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUCODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUCODE")+"F");
                    temp.put("text", rs.getString("V_EQUNAME"));
                    temp.put("leaf", true);
//                    temp.put("checked", false);
                    temp.put("choose", true);
                    temp.put("parentid",V_V_EQUTYPECODE);
                    temp.put("treeid",rs.getString("V_EQUCODE")+"F");
                    temp.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                    temp.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                    temp.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                    temp.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));

                    list.add(temp);
                }

            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_VIEW");
        return result;
    }

    public HashMap PRO_FAULT_EQUIP_SET(String V_V_FAULTCODE,String V_V_EQUTYPECODE,String V_V_EQUUPCODE,String V_V_EQUCODE,String V_V_CREATER) throws SQLException {
        logger.info("begin PRO_FAULT_EQUIP_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_FAULT_EQUIP_SET" + "(:V_V_FAULTCODE,:V_V_EQUTYPECODE,:V_V_EQUUPCODE,:V_V_EQUCODE,:V_V_CREATER,:V_INFO)}");

            cstmt.setString("V_V_FAULTCODE", V_V_FAULTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUUPCODE", V_V_EQUUPCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CREATER", V_V_CREATER);
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
        logger.info("end PRO_FAULT_EQUIP_SET");
        return result;
    }
    public HashMap PM_14_FAULT_ITEM_DATA_SEL_NEW(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                             String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                             String V_V_FAULT_YY, String V_V_FINDTIME_B, String V_V_FINDTIME_E) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_SEL_NEW");
        logger.debug("params:V_V_ORGCODE:" + V_V_ORGCODE + ",V_V_DEPTCODE:" + V_V_DEPTCODE + ",V_V_EQUTYPE:" + V_V_EQUTYPE +
                ",V_V_EQUCODE:" + V_V_EQUCODE + ",V_V_EQUCHILD_CODE:" + V_V_EQUCHILD_CODE + ",V_V_FAULT_TYPE:" + V_V_FAULT_TYPE +
                ",V_V_FAULT_YY:" + V_V_FAULT_YY + ",V_V_FINDTIME_B:" + V_V_FINDTIME_B + ",V_V_FINDTIME_E:" + V_V_FINDTIME_E);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_SEL_NEW" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME_B,:V_V_FINDTIME_E,:V_CURSOR)}");
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
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_SEL_NEW");
        return result;
    }

    public HashMap PRO_FAULT_EQUIP_SEL(String V_V_FAULTCODE) throws SQLException {

        logger.info("begin PRO_FAULT_EQUIP_SEL");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_FAULT_EQUIP_SEL" + "(:V_V_FAULTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_FAULTCODE", V_V_FAULTCODE);
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
        logger.info("end PRO_FAULT_EQUIP_SEL");
        return result;
    }

    public HashMap PRO_FAULT_EQUIP_DEL(String V_V_FAULTCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_FAULT_EQUIP_DEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_FAULT_EQUIP_DEL" + "(:V_V_FAULTCODE,:V_V_EQUCODE,:V_INFO)}");
            cstmt.setString("V_V_FAULTCODE", V_V_FAULTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_FAULT_EQUIP_DEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_SBGZ_CREATE_NEW(String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SBGZ_CREATE_NEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SBGZ_CREATE_NEW" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_PM_WORKORDER_SBGZ_CREATE_NEW");
        return result;
    }

    public HashMap PRO_FAULT_EQUIP_OVER(String V_V_FAULTCODE) throws SQLException {

        logger.info("begin PRO_FAULT_EQUIP_OVER");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_FAULT_EQUIP_OVER" + "(:V_V_FAULTCODE,:V_INFO)}");
            cstmt.setString("V_V_FAULTCODE", V_V_FAULTCODE);
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
        logger.info("end PRO_FAULT_EQUIP_OVER");
        return result;
    }

    public HashMap PM_14_FAULT_ITEM_DATA_OVER_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPE,
                                                 String V_V_EQUCODE, String V_V_EQUCHILD_CODE, String V_V_FAULT_TYPE,
                                                 String V_V_FAULT_YY, String V_V_FINDTIME_B, String V_V_FINDTIME_E) throws SQLException {
        logger.info("begin PM_14_FAULT_ITEM_DATA_OVER_SEL");
        logger.debug("params:V_V_ORGCODE:" + V_V_ORGCODE + ",V_V_DEPTCODE:" + V_V_DEPTCODE + ",V_V_EQUTYPE:" + V_V_EQUTYPE +
                ",V_V_EQUCODE:" + V_V_EQUCODE + ",V_V_EQUCHILD_CODE:" + V_V_EQUCHILD_CODE + ",V_V_FAULT_TYPE:" + V_V_FAULT_TYPE +
                ",V_V_FAULT_YY:" + V_V_FAULT_YY + ",V_V_FINDTIME_B:" + V_V_FINDTIME_B + ",V_V_FINDTIME_E:" + V_V_FINDTIME_E);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_OVER_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_FINDTIME_B,:V_V_FINDTIME_E,:V_CURSOR)}");
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
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_14_FAULT_ITEM_DATA_OVER_SEL");
        return result;
    }
    public HashMap PRO_PM_WORKORDER_FAULT_OVER_SEL(String V_V_FAULTCODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_FAULT_OVER_SEL");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_FAULT_OVER_SEL" + "(:V_V_FAULTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_FAULTCODE", V_V_FAULTCODE);
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
        logger.info("end PRO_PM_WORKORDER_FAULT_OVER_SEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_F_SAVE(String V_V_PERCODE,String V_V_PERNAME,String V_V_EQUCODE,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_WORKORDER_TYPE,
                                           String V_V_ORDERGUID,String V_V_SHORT_TXT,String V_V_DEPTCODEREPAIR,String V_D_START_DATE,
                                           String V_D_FINISH_DATE,String V_V_WBS,String V_V_WBS_TXT) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_F_SAVE");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_F_SAVE" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_EQUCODE,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_WORKORDER_TYPE,:V_V_ORDERGUID,:V_V_SHORT_TXT,:V_V_DEPTCODEREPAIR,:V_D_START_DATE,:V_D_FINISH_DATE," +
                    ":V_V_WBS,:V_V_WBS_TXT,:V_INFO)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_WORKORDER_TYPE", V_V_WORKORDER_TYPE);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_DEPTCODEREPAIR", V_V_DEPTCODEREPAIR);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
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
        logger.info("end PRO_PM_WORKORDER_F_SAVE");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_SBGZ_CREATE_2(String V_V_PERCODE, String V_V_PERNAME, String V_V_ORDER_GUID) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SBGZ_CREATE_2");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SBGZ_CREATE_2" + "(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORDER_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORDER_GUID", V_V_ORDER_GUID);
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
        logger.info("end PRO_PM_WORKORDER_SBGZ_CREATE_2");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_ONLY(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,
                                                 String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_EQUTYPE_CODE,String V_EQU_CODE,
                                                 String V_DJ_PERCODE,String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_ONLY");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_ONLY" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR," +
                    ":V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT," +
                    ":V_V_BJ_TXT,:V_V_ORDER_TYP,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
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
        logger.info("end PRO_PM_WORKORDER_ONLY");
        return result;
    }
    public HashMap PM_GET_WORKORDER_BY_FAULT(String V_GUID) throws SQLException {
        logger.info("begin PM_GET_WORKORDER_BY_FAULT");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_GET_WORKORDER_BY_FAULT" + "(:V_GUID,:V_CURSOR)}");
            cstmt.setString("V_GUID", V_GUID);
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
        logger.info("end PM_GET_WORKORDER_BY_FAULT");
        return result;
    }
}
