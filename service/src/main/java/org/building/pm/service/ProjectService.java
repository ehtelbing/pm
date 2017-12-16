package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class ProjectService {
    private static final Logger logger = Logger.getLogger(ProjectService.class.getName());

    @Autowired
    private ComboPooledDataSource dataSources;
    //结果集
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
    //厂矿
    public HashMap PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {

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

    //类型
    public HashMap PM_04_PROJECT_TYPE_SEL() throws SQLException {

        logger.info("begin PM_04_PROJECT_TYPE_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_TYPE_SEL(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_TYPE_CODE", rs.getString("V_TYPE_CODE"));
                sledata.put("V_TYPE_NAME", rs.getString("V_TYPE_NAME"));
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
        logger.info("end PM_04_PROJECT_TYPE_SEL");
        return result;
    }
    //专业
    public HashMap PM_04_PROJECT_MAJOR_SEL() throws SQLException {

        logger.info("begin PM_04_PROJECT_MAJOR_SEL");
        logger.debug("params:null");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_MAJOR_SEL(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_MAJOR_CODE", rs.getString("V_MAJOR_CODE"));
                sledata.put("V_MAJOR_NAME", rs.getString("V_MAJOR_NAME"));
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
        logger.info("end PM_04_PROJECT_MAJOR_SEL");
        return result;
    }
    //查询
    public HashMap PM_04_PROJECT_DATA_ITEM_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_TYPE_CODE,String V_V_MAJOR_CODE,String V_V_TEXT,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_04_PROJECT_DATA_ITEM_SEL");
        logger.debug("params:V_V_YEAR:"+V_V_YEAR+",V_V_ORGCODE:"+V_V_ORGCODE+",V_V_TYPE_CODE:"+V_V_TYPE_CODE+",V_V_MAJOR_CODE:"+V_V_MAJOR_CODE+",:V_V_TEXT:"+V_V_TEXT);

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        String sum="";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_DATA_ITEM_SEL(:V_V_YEAR,:V_V_ORGCODE,:V_V_TYPE_CODE,:V_V_MAJOR_CODE,:V_V_TEXT,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_TYPE_CODE", V_V_TYPE_CODE);
            cstmt.setString("V_V_MAJOR_CODE", V_V_MAJOR_CODE);
            cstmt.setString("V_V_TEXT", V_V_TEXT);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            //ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            sum=cstmt.getObject("V_SUMNUM").toString();
           /* while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("I_ID", rs.getString("I_ID"));
                sledata.put("V_ORGCODE", rs.getString("V_ORGCODE"));
                sledata.put("V_ORGNAME", rs.getString("V_ORGNAME"));
                sledata.put("V_DEPTCODE", rs.getString("V_DEPTCODE"));
                sledata.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                sledata.put("V_TYPE_CODE", rs.getString("V_TYPE_CODE"));
                sledata.put("V_TYPE_NAME", rs.getString("V_TYPE_NAME"));
                sledata.put("V_MAJOR_CODE", rs.getString("V_MAJOR_CODE"));
                sledata.put("V_MAJOR_NAME", rs.getString("V_MAJOR_NAME"));
                sledata.put("V_PROJECT_CODE", rs.getString("V_PROJECT_CODE"));
                sledata.put("V_PROJECT_NAME", rs.getString("V_PROJECT_NAME"));
                sledata.put("V_WBS_CODE", rs.getString("V_WBS_CODE"));
                sledata.put("V_WBS_NAME", rs.getString("V_WBS_NAME"));
                sledata.put("V_CONTENT", rs.getString("V_CONTENT"));
                sledata.put("V_BUDGET_MONEY", rs.getString("V_BUDGET_MONEY"));
                sledata.put("V_REPAIR_DEPTCODE", rs.getString("V_REPAIR_DEPTCODE"));
                sledata.put("V_REPAIR_DEPTNAME", rs.getString("V_REPAIR_DEPTNAME"));
                sledata.put("V_FZRCODE", rs.getString("V_FZRCODE"));
                sledata.put("V_FZRNAME", rs.getString("V_FZRNAME"));
                sledata.put("V_DATE_B", rs.getString("V_DATE_B"));
                sledata.put("V_DATE_E", rs.getString("V_DATE_E"));
                sledata.put("V_BZ", rs.getString("V_BZ"));
                sledata.put("V_FLOW_STATE", rs.getString("V_FLOW_STATE"));
                sledata.put("V_INPERCODE", rs.getString("V_INPERCODE"));
                sledata.put("V_INPERNAME", rs.getString("V_INPERNAME"));
                sledata.put("V_INTIEM", rs.getString("V_INTIEM"));
                resultList.add(sledata);
            }*/
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("total",sum);
        //result.put("list", resultList);
        logger.debug("result:" + result);
        logger.info("end PM_04_PROJECT_DATA_ITEM_SEL");
        return result;
    }

    public HashMap PM_04_PROJECT_PARENT_CHILDSEL(String V_V_PROJECT_CODE,String V_V_WBSCODE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_04_PROJECT_PARENT_CHILDSEL");
        logger.debug("params:V_V_PROJECT_CODE:"+V_V_PROJECT_CODE+",V_V_WBSCODE:"+V_V_WBSCODE);

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        String sum="";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_PARENT_CHILDSEL(:V_V_PROJECT_CODE,:V_V_WBSCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_WBSCODE", V_V_WBSCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            sum=cstmt.getObject("V_V_SNUM").toString();


            result.put("total",sum);
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_04_PROJECT_PARENT_CHILDSEL");
        return result;
    }

    public List<Map> PM_04_PROJECT_DATA_ITEM_SAVE(String V_V_FUNTYPE,
                                                  String V_V_ORGCODE,
                                                  String V_V_TYPE_CODE,
                                                  String V_V_MAJOR_CODE,
                                                  String V_V_PROJECT_CODE,

                                                  String V_V_PROJECT_NAME,
                                                  String V_V_WBS_CODE,
                                                  String V_V_WBS_NAME,
                                                  String V_V_CONTENT,
                                                  String V_V_BUDGET_MONEY,

                                                  String V_V_REPAIR_DEPT,
                                                  String V_V_FZR,
                                                  String V_V_DATE_B,
                                                  String V_V_DATE_E,
                                                  String V_V_BZ,

                                                  String V_V_FLOW_STATE,
                                                  String V_V_INPER,
                                                  String V_V_INTIEM,
                                                  String V_V_YEAR) throws SQLException {
        logger.info("begin PM_04_PROJECT_DATA_ITEM_SAVE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_DATA_ITEM_SAVE" +
                    "(:V_V_FUNTYPE,:V_V_ORGCODE,:V_V_TYPE_CODE,:V_V_MAJOR_CODE,:V_V_PROJECT_CODE," +
                    ":V_V_PROJECT_NAME,:V_V_WBS_CODE,:V_V_WBS_NAME,:V_V_CONTENT,:V_V_BUDGET_MONEY," +
                    ":V_V_REPAIR_DEPT,:V_V_FZR,:V_V_DATE_B,:V_V_DATE_E,:V_V_BZ," +
                    ":V_V_FLOW_STATE,:V_V_INPER,:V_V_INTIEM,:V_V_YEAR,:V_INFO)}");

            cstmt.setString("V_V_FUNTYPE", V_V_FUNTYPE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_TYPE_CODE", V_V_TYPE_CODE);
            cstmt.setString("V_V_MAJOR_CODE", V_V_MAJOR_CODE);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);

            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_WBS_CODE", V_V_WBS_CODE);
            cstmt.setString("V_V_WBS_NAME", V_V_WBS_NAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_BUDGET_MONEY", V_V_BUDGET_MONEY);

            cstmt.setString("V_V_REPAIR_DEPT", V_V_REPAIR_DEPT);
            cstmt.setString("V_V_FZR", V_V_FZR);
            cstmt.setString("V_V_DATE_B", V_V_DATE_B);
            cstmt.setString("V_V_DATE_E", V_V_DATE_E);
            cstmt.setString("V_V_BZ", V_V_BZ);

            cstmt.setString("V_V_FLOW_STATE", V_V_FLOW_STATE);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_INTIEM", V_V_INTIEM);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
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
        logger.info("end PM_04_PROJECT_DATA_ITEM_SAVE");
        return result;
    }

    public List<Map> PM_04_PROJECT_DATA_ITEM_DEL(String V_V_PROJECTCODE,String V_V_WBSCODE) throws SQLException {
        logger.info("begin PM_04_PROJECT_DATA_ITEM_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_DATA_ITEM_DEL(:V_V_PROJECTCODE,:V_V_WBSCODE,:V_INFO)}");

            cstmt.setString("V_V_PROJECTCODE", V_V_PROJECTCODE);
            cstmt.setString("V_V_WBSCODE", V_V_WBSCODE);
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
        logger.info("end PM_04_PROJECT_DATA_ITEM_DEL");
        return result;
    }

    public HashMap PRO_PM_WORKORDER_DD_CREATE(String V_V_PERCODE,String V_V_PERNAME,String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_SOURCECODE) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_DD_CREATE");

        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DD_CREATE(:V_V_PERCODE,:V_V_PERNAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SOURCECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_PM_WORKORDER_DD_CREATE");
        return result;
    }
}
