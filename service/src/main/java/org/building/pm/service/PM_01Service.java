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


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_01Service {
    private static final Logger logger = Logger.getLogger(PM_01Service.class.getName());

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

    public HashMap PRO_HZTJ_RIGHT_SEL(String V_D_ENTER_DATE_B, String V_D_ENTER_DATE_E, String V_EQU_CODE) throws SQLException {

        logger.info("begin PRO_HZTJ_RIGHT_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_HZTJ_RIGHT_SEL" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_EQU_CODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
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
        logger.info("end PRO_HZTJ_RIGHT_SEL");
        return result;
    }

    public HashMap PRO_HZTJ_RIGHT_QX(String V_D_DEFECTDATE_B, String V_D_DEFECTDATE_E, String V_EQU_CODE) throws SQLException {

        logger.info("begin PRO_HZTJ_RIGHT_QX");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_HZTJ_RIGHT_QX" + "(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_EQU_CODE,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
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
        logger.info("end PRO_HZTJ_RIGHT_QX");
        return result;
    }

    public HashMap PRO_HZTJ_RIGHT_GD(String V_D_DEFECTDATE_B, String V_D_DEFECTDATE_E, String V_EQU_CODE) throws SQLException {

        logger.info("begin PRO_HZTJ_RIGHT_GD");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_HZTJ_RIGHT_GD" + "(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_EQU_CODE,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
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
        logger.info("end PRO_HZTJ_RIGHT_GD");
        return result;
    }
    public HashMap PRO_BASE_DEPT_VIEW_PER(String V_DEPTCODE, String V_DEPTTYPE, String V_V_PERSON) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_VIEW_PER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_PER" + "(:V_DEPTCODE,:V_DEPTTYPE,:V_V_PERSON,:V_CURSOR)}");
            cstmt.setString("IS_V_DEPTCODE", V_DEPTCODE);
            cstmt.setString("IS_V_DEPTTYPE", V_DEPTTYPE);
            cstmt.setString("V_V_PERSON", V_V_PERSON);
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
        logger.info("end PRO_BASE_DEPT_VIEW_PER");
        return result;
    }

    public HashMap PM_04_PROJECT_MAJOR_SEL() throws SQLException {

        logger.info("begin PM_04_PROJECT_MAJOR_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_04_PROJECT_MAJOR_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_04_PROJECT_MAJOR_SEL");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TREE(String V_V_GUID_FXJH, String V_BY1, String V_BY2, String V_BY3) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE" + "(:V_V_GUID_FXJH,:V_BY1,:V_BY2,:V_BY3,:V_CURSOR)}");
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_BY1", V_BY1);
            cstmt.setString("V_BY2", V_BY2);
            cstmt.setString("V_BY3", V_BY3);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE");
        return result;
    }
    public HashMap PM_RET_DATETIME() throws SQLException {

        logger.info("begin PM_RET_DATETIME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_RET_DATETIME" + "(:V_CURSOR)}");
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
        logger.info("end PM_RET_DATETIME");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_SET(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID, String V_V_ORGCODE,
                                                 String V_V_DEPTCODE, String V_V_YEAR, String V_V_MONTH, String V_V_PROJECT_CODE, String V_V_PROJECT_NAME,
                                                 String V_V_PLAN_MONEY, String V_V_CONTENT, String V_V_DATE_DESIGN, String V_V_DATE_INVITE, String V_V_DATE_B,
                                                 String V_V_DATE_E, String V_V_BUDGET_MONEY, String V_V_PROGRESS, String V_V_BUILD_NAMAGER, String V_V_BULID_PERSON,
                                                 String V_V_DIRECT_PERSON, String V_V_EQUCODE, String V_V_EQUNAME, String V_V_SPECIALTY, String V_V_BUILD_DEPT,
                                                 String V_V_GUID_P, String V_V_PROJECT_CODE_P, String V_V_PROJECT_NAME_P, String V_V_GUID_FXJH, String V_V_PROJECT_CODE_FXJH,
                                                 String V_V_PROJECT_NAME_FXJH,String V_V_SGYC,String V_V_AQDC) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_SET" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_YEAR,:V_V_MONTH," +
                    ":V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_PLAN_MONEY,:V_V_CONTENT,:V_V_DATE_DESIGN,:V_V_DATE_INVITE,:V_V_DATE_B,:V_V_DATE_E,:V_V_BUDGET_MONEY,:V_V_PROGRESS,:V_V_BUILD_NAMAGER,:V_V_BULID_PERSON,:V_V_DIRECT_PERSON,:V_V_EQUCODE," +
                    ":V_V_EQUNAME,:V_V_SPECIALTY,:V_V_BUILD_DEPT,:V_V_GUID_P,:V_V_PROJECT_CODE_P,:V_V_PROJECT_NAME_P,:V_V_GUID_FXJH,:V_V_PROJECT_CODE_FXJH,:V_V_PROJECT_NAME_FXJH,:V_V_SGYC,:V_V_AQDC,:V_INFO,:V_V_GUID_T)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_PLAN_MONEY", V_V_PLAN_MONEY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_DATE_DESIGN", V_V_DATE_DESIGN);
            cstmt.setString("V_V_DATE_INVITE", V_V_DATE_INVITE);
            cstmt.setString("V_V_DATE_B", V_V_DATE_B);
            cstmt.setString("V_V_DATE_E", V_V_DATE_E);
            cstmt.setString("V_V_BUDGET_MONEY", V_V_BUDGET_MONEY);
            cstmt.setString("V_V_PROGRESS", V_V_PROGRESS);
            cstmt.setString("V_V_BUILD_NAMAGER", V_V_BUILD_NAMAGER);
            cstmt.setString("V_V_BULID_PERSON", V_V_BULID_PERSON);
            cstmt.setString("V_V_DIRECT_PERSON", V_V_DIRECT_PERSON);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_BUILD_DEPT", V_V_BUILD_DEPT);
            cstmt.setString("V_V_GUID_P", V_V_GUID_P);
            cstmt.setString("V_V_PROJECT_CODE_P", V_V_PROJECT_CODE_P);
            cstmt.setString("V_V_PROJECT_NAME_P", V_V_PROJECT_NAME_P);
            cstmt.setString("V_V_GUID_FXJH", V_V_GUID_FXJH);
            cstmt.setString("V_V_PROJECT_CODE_FXJH", V_V_PROJECT_CODE_FXJH);
            cstmt.setString("V_V_PROJECT_NAME_FXJH", V_V_PROJECT_NAME_FXJH);
            cstmt.setString("V_V_SGYC", V_V_SGYC);
            cstmt.setString("V_V_AQDC", V_V_AQDC);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_GUID_T", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",
                    (String) cstmt.getObject("V_INFO"));
            result.put("guid",
                    (String) cstmt.getObject("V_V_GUID_T"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_SET");
        return result;
    }
    public HashMap PRO_PM_EQUREPAIRPLAN_TREE_DEL(String V_V_IP, String V_V_PERCODE, String V_V_PERNAME, String V_V_GUID) throws SQLException {

        logger.info("begin PRO_PM_EQUREPAIRPLAN_TREE_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_EQUREPAIRPLAN_TREE_DEL" + "(:V_V_IP,:V_V_PERCODE,:V_V_PERNAME,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PM_EQUREPAIRPLAN_TREE_DEL");
        return result;
    }

}
