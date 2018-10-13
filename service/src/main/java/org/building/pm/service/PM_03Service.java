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
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_03Service {
    private static final Logger logger = Logger.getLogger(PM_03Service.class.getName());

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

    public Map PRO_PM_03_PLAN_YEAR_CREATE(String V_V_GUID,String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCODE,
                                          String V_V_INPER) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_CREATE" + "(:V_V_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_INPER," +
                    ":V_OUT_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_OUT_GUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_OUT_GUID", (String) cstmt.getObject("V_OUT_GUID"));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_CREATE");
        return result;
    }

    public Map PRO_PM_03_PLAN_PROJECT_CREATE(String V_V_GUID,String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,
                                             String V_V_INPER,String V_V_FLAG,String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_CREATE" + "(:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_INPER,:V_V_TYPE,:V_V_FLAG," +
                    ":V_OUT_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_TYPE",V_V_TYPE);
            cstmt.registerOutParameter("V_OUT_GUID", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_OUT_GUID", (String) cstmt.getObject("V_OUT_GUID"));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_PROJECT_CREATE");
        return result;
    }

    public Map PM_03_PLAN_YEAR_EQU_SET(String V_V_PLANGUID,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_EQU_SET" + "(:V_V_PLANGUID,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_INFO)}");
            cstmt.setString("V_V_PLANGUID", V_V_PLANGUID);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PM_03_PLAN_YEAR_EQU_SET");
        return result;
    }

    public Map PM_03_PLAN_YEAR_EQU_SEL(String V_V_PLANGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_EQU_SEL" + "(:V_V_PLANGUID,:V_CURSOR)}");
            cstmt.setString("V_V_PLANGUID", V_V_PLANGUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_EQU_SEL");
        return result;
    }

    public Map PM_03_PLAN_YEAR_EQU_DEL(String V_V_PLANGUID,String V_V_EQUCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_EQU_DEL" + "(:V_V_PLANGUID,:V_V_EQUCODE,:V_INFO)}");
            cstmt.setString("V_V_PLANGUID", V_V_PLANGUID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PM_03_PLAN_YEAR_EQU_DEL");
        return result;
    }

    public Map PRO_PM_DEFECT_DEPT_SEL_ALL(String V_V_DEPTCODE,String V_V_EQUCODE,String V_V_STATECODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_DEPT_SEL_ALL" + "(:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_STATECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEFECT_DEPT_SEL_ALL");
        return result;
    }

    public Map PM_03_PROJECT_DEFECT_SEL(String V_V_PROJECT_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PROJECT_DEFECT_SEL" + "(:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PROJECT_DEFECT_SEL");
        return result;
    }

    public Map PM_1917_JXMX_SELBY_MOREEQU(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EUQTYPE,String V_V_EQUCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXMX_SELBY_MOREEQU" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EUQTYPE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EUQTYPE", V_V_EUQTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXMX_SELBY_MOREEQU");
        return result;
    }

    public Map PM_03_PLAN_YEAR_MODEL_SEL(String V_V_PROJECT_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_MODEL_SEL" + "(:V_V_PROJECT_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_YEAR_MODEL_SEL");
        return result;
    }

    public Map PRO_YEAR_PROJECT_MXUSE_SEL(String V_V_PROJECTGUID,String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_MXUSE_SEL" + "(:V_V_PROJECTGUID,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PRO_YEAR_PROJECT_MXUSE_SEL");
        return result;
    }

    public Map PRO_PM_03_PLAN_YEAR_SET(String V_V_GUID,String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_ORGNAME,String V_V_DEPTCODE,String V_V_DEPTNAME,String V_V_PORJECT_CODE,String V_V_PORJECT_NAME,String V_V_SPECIALTY,
                                       String V_V_SPECIALTYNAME,String V_V_SPECIALTYMANCODE,String V_V_SPECIALTYMAN,String V_V_WXTYPECODE,String V_V_WXTYPENAME,String V_V_CONTENT,
                                       String V_V_MONEYBUDGET,String V_V_REPAIRDEPTCODE,String V_V_BDATE,String V_V_EDATE,String V_V_INMAN,String V_V_INMANCODE,
                                       String V_V_JHLB,String V_V_SCLB,String V_V_CPZL,String V_V_CPGX,String V_V_SGFS,String V_V_SFXJ,String V_V_ZBFS,
                                       String V_V_SZ,String V_V_GUID_UP,String V_V_WBS,String V_V_WBS_TXT,String V_V_SUMTIME,String V_V_SUMDATE,String V_V_SPECIALTY_ZX,
                                       String V_V_SPECIALTY_ZXNAME,String V_V_BJF,String V_V_CLF,String V_V_SGF)throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SET" + "(:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_ORGNAME,:V_V_DEPTCODE,:V_V_DEPTNAME,:V_V_PORJECT_CODE,:V_V_PORJECT_NAME,:V_V_SPECIALTY,:V_V_SPECIALTYNAME,:V_V_SPECIALTYMANCODE" +
                    ",:V_V_SPECIALTYMAN,:V_V_WXTYPECODE,:V_V_WXTYPENAME,:V_V_CONTENT,:V_V_MONEYBUDGET,:V_V_REPAIRDEPTCODE,:V_V_BDATE,:V_V_EDATE,:V_V_INMAN,:V_V_INMANCODE" +
                    ",:V_V_JHLB,:V_V_SCLB,:V_V_CPZL,:V_V_CPGX,:V_V_SGFS,:V_V_SFXJ,:V_V_ZBFS,:V_V_SZ,:V_V_GUID_UP,:V_V_WBS,:V_V_WBS_TXT,:V_V_SUMTIME,:V_V_SUMDATE,:V_V_SPECIALTY_ZX,:V_V_SPECIALTY_ZXNAME,:V_V_BJF,:V_V_CLF,:V_V_SGF,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_PORJECT_CODE", V_V_PORJECT_CODE);
            cstmt.setString("V_V_PORJECT_NAME", V_V_PORJECT_NAME);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_SPECIALTYNAME", V_V_SPECIALTYNAME);
            cstmt.setString("V_V_SPECIALTYMANCODE", V_V_SPECIALTYMANCODE);
            cstmt.setString("V_V_SPECIALTYMAN", V_V_SPECIALTYMAN);
            cstmt.setString("V_V_WXTYPECODE", V_V_WXTYPECODE);
            cstmt.setString("V_V_WXTYPENAME", V_V_WXTYPENAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_MONEYBUDGET", V_V_MONEYBUDGET);
            cstmt.setString("V_V_REPAIRDEPTCODE", V_V_REPAIRDEPTCODE);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_INMAN", V_V_INMAN);
            cstmt.setString("V_V_INMANCODE", V_V_INMANCODE);
            cstmt.setString("V_V_JHLB", V_V_JHLB);
            cstmt.setString("V_V_SCLB", V_V_SCLB);
            cstmt.setString("V_V_CPZL", V_V_CPZL);
            cstmt.setString("V_V_CPGX", V_V_CPGX);
            cstmt.setString("V_V_SGFS", V_V_SGFS);
            cstmt.setString("V_V_SFXJ", V_V_SFXJ);
            cstmt.setString("V_V_ZBFS", V_V_ZBFS);
            cstmt.setString("V_V_SZ", V_V_SZ);
            cstmt.setString("V_V_GUID_UP", V_V_GUID_UP);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_SUMTIME", V_V_SUMTIME);
            cstmt.setString("V_V_SUMDATE", V_V_SUMDATE);
            cstmt.setString("V_V_SPECIALTY_ZX", V_V_SPECIALTY_ZX);
            cstmt.setString("V_V_SPECIALTY_ZXNAME", V_V_SPECIALTY_ZXNAME);
            cstmt.setString("V_V_BJF", V_V_BJF);
            cstmt.setString("V_V_CLF", V_V_CLF);
            cstmt.setString("V_V_SGF", V_V_SGF);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SET");
        return result;
    }

    public Map PM_03_PLAN_YEAR_MODEL_SET(String V_V_PORJECTGUID, String V_V_MODELGUID, String V_V_MODELNAME, String V_V_BBH, String V_V_BZ) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_MODEL_SET" + "(:V_V_PORJECTGUID,:V_V_MODELGUID,:V_V_MODELNAME,:V_V_BBH,:V_V_BZ,:V_INFO)}");
            cstmt.setString("V_V_PORJECTGUID", V_V_PORJECTGUID);
            cstmt.setString("V_V_MODELGUID", V_V_MODELGUID);
            cstmt.setString("V_V_MODELNAME", V_V_MODELNAME);
            cstmt.setString("V_V_BBH", V_V_BBH);
            cstmt.setString("V_V_BZ", V_V_BZ);
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
        logger.info("end PM_03_PLAN_YEAR_MODEL_SET");
        return result;
    }

    public Map PM_03_PLAN_REPAIR_DEPT_SET(String V_V_GUID, String V_V_REPAIR_DEPTCODE, String V_V_REPAIR_DEPTNAME,String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_REPAIR_DEPT_SET" + "(:V_V_GUID,:V_V_REPAIR_DEPTCODE,:V_V_REPAIR_DEPTNAME,:V_V_TYPE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_REPAIR_DEPTCODE", V_V_REPAIR_DEPTCODE);
            cstmt.setString("V_V_REPAIR_DEPTNAME", V_V_REPAIR_DEPTNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_03_PLAN_REPAIR_DEPT_SET");
        return result;
    }

    public Map PM_03_PLAN_YEAR_MODEL_DEL(String V_V_PROJECT_GUID,String V_V_MODEL_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_MODEL_DEL" + "(:V_V_PROJECT_GUID,:V_V_MODEL_GUID,:V_INFO)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_MODEL_GUID", V_V_MODEL_GUID);
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
        logger.info("end PM_03_PLAN_YEAR_MODEL_DEL");
        return result;
    }

    public Map PM_03_PLAN_YEAR_DEFECT_DEL(String V_V_PROJECT_GUID,String V_V_DEFECT_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_DEFECT_DEL" + "(:V_V_PROJECT_GUID,:V_V_DEFECT_GUID,:V_INFO)}");
            cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
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
        logger.info("end PM_03_PLAN_YEAR_DEFECT_DEL");
        return result;
    }

    public Map PRO_PM_03_PLAN_PROJECTCODE_C(String V_V_GUID,String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_JHLB,String V_V_ZY) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECTCODE_C" + "(:V_V_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_JHLB,:V_V_ZY,:V_V_PROJECT_OUT,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_JHLB", V_V_JHLB);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.registerOutParameter("V_V_PROJECT_OUT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_V_PROJECT_OUT", (String) cstmt.getObject("V_V_PROJECT_OUT"));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_PROJECTCODE_C");
        return result;
    }

    public Map PM_03_PLAN_PROJECT_FILE_SET(String V_V_GUID, String V_V_FILENAME, String V_V_FILETYPE, InputStream V_V_FILE, String V_V_INPERCODE, String V_V_INPERNAME, String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_FILE_SET" + "(:V_V_GUID,:V_V_FILENAME,:V_V_FILETYPE,:V_V_FILE,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_TYPE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setBlob("V_V_FILE", V_V_FILE);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_03_PLAN_PROJECT_FILE_SET");
        return result;
    }

    public Map PM_PROJECT_YEAR_VIEW_SEL(String V_V_YEAR,String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_PROJECT_YEAR_VIEW_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PROJECT_YEAR_VIEW_SEL" + "(:V_V_YEAR,:V_V_PERCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
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
        logger.info("end PM_PROJECT_YEAR_VIEW_SEL");
        return result;
    }


    public Map PRO_PM_03_PROJECT_COPY_BYGUID(String V_V_UPGUID, String V_V_GUID,String V_V_INPER) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PROJECT_COPY_BYGUID" + "(:V_V_UPGUID,:V_V_GUID,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_UPGUID", V_V_UPGUID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_INPER", V_V_INPER);
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
        logger.info("end PRO_PM_03_PROJECT_COPY_BYGUID");
        return result;
    }

    public Map PM_03_PLAN_PROJECT_FILE_SEL(String V_V_GUID,String V_V_FILEGUID,String V_V_FILENAME,String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_FILE_SEL" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_PROJECT_FILE_SEL");
        return result;
    }

    public Map PM_03_PLAN_REPAIR_DEPT_SEL(String V_V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_REPAIR_DEPT_SEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_REPAIR_DEPT_SEL");
        return result;
    }

    public Map PRO_PM_03_PLAN_PROJECT_SEL(String V_V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_SEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_PROJECT_SEL");
        return result;
    }

    public Map PM_PLAN_BUDGET_YEAR_SEL(String V_V_YEAR,String V_V_ORGCODE,String V_V_JHLB) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_BUDGET_YEAR_SEL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_JHLB,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_JHLB", V_V_JHLB);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",   ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_BUDGET_YEAR_SEL");
        return result;
    }

    public Map PM_03_PLAN_JHLB_SEL() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_JHLB_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_JHLB_SEL");
        return result;
    }

    public Map PM_03_PLAN_SCLB_SEL() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_SCLB_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_SCLB_SEL");
        return result;
    }

    public Map PM_03_PLAN_SGFS_SEL() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_SGFS_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_SGFS_SEL");
        return result;
    }

    public Map PM_03_PLAN_ZY_SEL() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_ZY_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_ZY_SEL");
        return result;
    }

    public Map PM_03_PLAN_ZYZX_SEL(String V_V_ZY) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_ZYZX_SEL" + "(:V_V_ZY,:V_CURSOR)}");
            cstmt.setString("V_V_ZY", V_V_ZY);
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
        logger.info("end PM_03_PLAN_ZYZX_SEL");
        return result;
    }

    public Map PRO_PM_03_PLAN_PROJECT_VIEW(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ZY,String V_V_WXLX,String V_V_CONTENT,String V_V_FLAG,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_VIEW" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX,:V_V_CONTENT,:V_V_FLAG,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_WXLX", V_V_WXLX);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_PROJECT_VIEW");
        return result;
    }

    public Map PM_03_PLAN_CPZL_SEL(String V_V_SCLB) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CPZL_SEL" + "(:V_V_SCLB,:V_CURSOR)}");
            cstmt.setString("V_V_SCLB", V_V_SCLB);
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
        logger.info("end PM_03_PLAN_CPZL_SEL");
        return result;
    }

    public Map PM_03_PLAN_GX_SEL(String V_V_CPCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_GX_SEL" + "(:V_V_CPCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CPCODE", V_V_CPCODE);
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
        logger.info("end PM_03_PLAN_GX_SEL");
        return result;
    }

    public List<Map> PRO_PM_03_PLAN_YEAR_SELECT(String V_V_JXGX_CODE_NEW,String V_V_JXGX_CODE_OLD) throws SQLException {
//        logger.info("begin PRO_PM_03_PLAN_YEAR_SELECT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SELECT" + "(:V_V_JXGX_CODE_NEW,:V_V_JXGX_CODE_OLD,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE_NEW", V_V_JXGX_CODE_NEW);
            cstmt.setString("V_V_JXGX_CODE_OLD", V_V_JXGX_CODE_OLD);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SELECT");
        return result;
    }


    public Map PRO_PM_03_PROJECTCODE_M_C(String V_V_YEARGUID,String V_V_GUID,String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_JHLB,String V_V_ZY,String V_V_SGFS,String V_V_FLAG) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PROJECTCODE_M_C" + "(:V_V_YEARGUID,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_JHLB,:V_V_ZY,:V_V_SGFS,:V_V_FLAG,:V_V_PROJECT_OUT,:V_V_WBS,:V_INFO)}");
            cstmt.setString("V_V_YEARGUID", V_V_YEARGUID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_JHLB", V_V_JHLB);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_SGFS", V_V_SGFS);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.registerOutParameter("V_V_PROJECT_OUT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_WBS", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_V_PROJECT_OUT", (String) cstmt.getObject("V_V_PROJECT_OUT"));
            result.put("V_V_WBS", (String) cstmt.getObject("V_V_WBS"));
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PROJECTCODE_M_C");
        return result;
    }

    public Map PM_PLAN_BUDGETANDUSE_YEAR_SEL(String V_V_YEAR,String V_V_ORGCODE) throws SQLException {

        logger.info("begin PM_PLAN_BUDGETANDUSE_YEAR_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_BUDGETANDUSE_YEAR_SEL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_PLAN_BUDGETANDUSE_YEAR_SEL");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_DJY_VIEW(String V_V_INPER,String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_DJY_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_DJY_VIEW" + "(:V_V_INPER,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_DJY_VIEW");
        return result;
    }

    public Map<String, Object> PM_03_PLAN_YEAR_STATE_SEND(String V_V_GUID,String V_V_STATECODE) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_STATE_SEND" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
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
        logger.info("end PM_03_PLAN_YEAR_STATE_SEND");
        return result;
    }

    public Map<String, Object> PM_03_PLAN_YEAR_FLOW_LOG_SET(String V_V_GUID,String V_V_FLOWCODE,String V_V_FLOWNAME,String V_V_IDEA,String V_V_INPERCODE,String V_V_INPERNAME,String V_V_NEXTPERCODE,String V_V_NEXTPERNAME) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_FLOW_LOG_SET" + "(:V_V_GUID,:V_V_FLOWCODE,:V_V_FLOWNAME,:V_V_IDEA,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_NEXTPERCODE,:V_V_NEXTPERNAME,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_FLOWNAME", V_V_FLOWNAME);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_NEXTPERCODE", V_V_NEXTPERCODE);
            cstmt.setString("V_V_NEXTPERNAME", V_V_NEXTPERNAME);
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
        logger.info("end PM_03_PLAN_YEAR_FLOW_LOG_SET");
        return result;
    }

    public Map<String, Object> PM_03_PLAN_YEAR_FLOW_LOG_SEL(String V_V_GUID) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_YEAR_FLOW_LOG_SEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PM_03_PLAN_YEAR_FLOW_LOG_SEL");
        return result;
    }

    public Map<String, Object> PRO_PM_03_PLAN_YEAR_DEL(String V_V_GUID) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_DEL");
        return result;
    }

    public Map<String, Object> PM_03_PLAN_PROJECT_FILE_DEL(String V_V_GUID,String V_V_FILEGUID) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_FILE_DEL" + "(:V_V_GUID,:V_V_FILEGUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
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
        logger.info("end PM_03_PLAN_PROJECT_FILE_DEL");
        return result;
    }


    public Map PRO_PM_03_PLAN_YEAR_SEND(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_FLOWCODE,
                                        String  V_V_PLANTYPE,String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_YEAR_SEND");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SEND" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SEND");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_VIEW(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_ZY, String V_V_WXLX, String V_V_CONTENT,  String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX," +
                    ":V_V_CONTENT,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_WXLX", V_V_WXLX);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW");
        return result;
    }


    public HashMap PRO_PM_03_PLAN_YEAR_VIEW1(String V_V_YEAR,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRMAJOR_CODE,String V_V_FLOWCODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_VIEW1");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_VIEW1" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_REPAIRMAJOR_CODE,:V_V_FLOWCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_VIEW1");
        return result;
    }





    public HashMap PM_03_JXMX_DATA_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,
                                       String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_JXMX_NAME) throws SQLException {

        logger.info("begin PM_03_JXMX_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_JXMX_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_JXMX_NAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE", V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_JXMX_NAME", V_V_JXMX_NAME);
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
        logger.info("end PM_03_JXMX_DATA_SEL");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_YEAR_GET(String V_V_YEARPLAN_GUID) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_YEAR_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_GET" + "(:V_V_YEARPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_YEARPLAN_GUID", V_V_YEARPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_GET");
        return result;
    }

    public HashMap PM_03_JXMX_DETAIL_SEL(String V_V_JXMX_CODE) throws SQLException {

        logger.info("begin PM_03_JXMX_DETAIL_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_JXMX_DETAIL_SEL" + "(:V_V_JXMX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
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
        logger.info("end PM_03_JXMX_DETAIL_SEL");
        return result;
    }
    //PM_03010201,月,选择计划查询
    public HashMap PM_03_MONTH_PLAN_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_ZY,String V_V_CONTENT,String V_V_STATECODE,String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_SEL" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
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
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_SEL");
        return result;
    }
    //---------EXCEL--MONTH-UPDATE2018-0828
    public HashMap PM_03_MONTH_PLAN_SELALL(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_ZY,String V_V_CONTENT,String V_V_STATECODE,String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_SELALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_SELALL" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
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
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_SELALL");
        return result;
    }
    //PM_03010201,月,表格信息加载
    public HashMap PRO_PM_03_PLAN_MONTH_VIEW(String V_V_INPER,String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRMAJOR_CODE,String V_V_PLANTYPE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_MONTH_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_VIEW(:V_V_INPER,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRMAJOR_CODE,:V_V_PLANTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
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
        logger.info("end PRO_PM_03_PLAN_MONTH_VIEW");
        return result;
    }
    //PM_03010201,月,修改时信息绑定
    public HashMap PRO_PM_03_PLAN_MONTH_GET(String V_V_MONTHPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_GET" + "(:V_V_MONTHPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_MONTHPLAN_GUID", V_V_MONTHPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_MONTH_GET");
        return result;
    }
    //PM_03010201,月计划报表，删除
    public Map<String,Object> PRO_PM_03_PLAN_MONTH_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_DEL");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_DEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_MONTH_DEL");
        return result;
    }
    //PM_03010201,月计划报表，上传
    public List<Map> PRO_PM_03_PLAN_MONTH_SEND(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,
                                               String V_V_FLOWCODE, String  V_V_PLANTYPE,
                                               String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_MONTH_SEND");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_SEND(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_MONTH_SEND");
        return result;
    }
    //PM_03010201,检修季度计划,选择计划查询
    public HashMap PM_03_QUARTER_PLAN_SEL(String V_V_PLAN_NAME) throws SQLException {
        logger.info("begin PM_03_QUARTER_PLAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_QUARTER_PLAN_SEL" + "(:V_V_PLAN_NAME,:V_CURSOR)}");
            cstmt.setString("V_V_PLAN_NAME", V_V_PLAN_NAME);
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
        logger.info("end PM_03_QUARTER_PLAN_SEL");
        return result;
    }
    //PM_03010101,季度,表格信息加载
    public HashMap PRO_PM_03_PLAN_QUARTER_VIEW(String V_V_INPER,String V_V_YEAR,String V_V_QUARTER,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRMAJOR_CODE,String V_V_PLANTYPE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_QUARTER_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_VIEW(:V_V_INPER,:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRMAJOR_CODE,:V_V_PLANTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_VIEW");
        return result;
    }
    //PM_03010101,季度检修计划,修改时信息绑定
    public HashMap PRO_PM_03_PLAN_QUARTER_GET(String V_V_QUARTERPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_QUARTER_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_GET" + "(:V_V_QUARTERPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_QUARTERPLAN_GUID", V_V_QUARTERPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_GET");
        return result;
    }
    //PM_03010101,季度检修计划，删除
    public Map<String,Object> PRO_PM_03_PLAN_QUARTER_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_QUARTER_DEL");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_DEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_DEL");
        return result;
    }
    //PM_03010201,季度检修计划，上传
    public Map<String,Object> PRO_PM_03_PLAN_QUARTER_SEND(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,
                                                          String V_V_FLOWCODE, String  V_V_PLANTYPE,
                                                          String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_QUARTER_SEND");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_SEND(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_SEND");
        return result;
    }
    //PM_03010301,周,表格信息加载
    public HashMap PRO_PM_03_PLAN_WEEK_VIEW(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE,String V_V_DEPTCODE,
                                            String V_V_ZY,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_STATE,
                                            String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_VIEW(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_SUMNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_VIEW");
        return result;
    }

    public HashMap PRO_PM_03_PLAN_WEEK_EXCEL(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE,String V_V_DEPTCODE,
                                             String V_V_ZY,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_STATE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_EXCEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_EXCEL(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_EXCEL");
        return result;
    }
    //PM_03010301,周检修计划,选择计划查询
    public HashMap PM_03_WEEK_PLAN_SEL(String V_V_PLAN_NAME,String V_V_TYPE,String V_V_ORGCODE) throws SQLException {
        logger.info("begin PM_03_WEEK_PLAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_WEEK_PLAN_SEL" + "(:V_V_PLAN_NAME,:V_V_TYPE,:V_V_ORGCODE,:V_CURSOR)}");

            cstmt.setString("V_V_PLAN_NAME", V_V_PLAN_NAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
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
        logger.info("end PM_03_WEEK_PLAN_SEL");
        return result;
    }
    //PM_03010301,周检修计划，删除
    public Map<String,Object> PRO_PM_03_PLAN_WEEK_DEL(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_DEL");
        Map<String,Object> result = new HashMap<String,Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_DEL" + "(:V_V_GUID,:V_INFO)}");
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
        logger.info("end PRO_PM_03_PLAN_WEEK_DEL");
        return result;
    }
    //PM_03010301,周检修计划,修改时信息绑定
    public HashMap PRO_PM_03_PLAN_WEEK_GET(String V_V_WEEKPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GET" + "(:V_V_WEEKPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_WEEKPLAN_GUID", V_V_WEEKPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_GET");
        return result;
    }
    //PM_03010301,周检修计划，上传
    public List<Map> PRO_PM_03_PLAN_WEEK_SEND(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,
                                              String V_V_FLOWCODE, String  V_V_PLANTYPE,
                                              String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SEND");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SEND(:V_V_WEEKPLAN_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_SEND");
        return result;
    }
    public HashMap PM_03_MONTH_PLAN_PLANCODE_SEL(String V_V_PLANCODEE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_PLANCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_PLANCODE_SEL" + "(:V_V_PLANCODEE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANCODEE", V_V_PLANCODEE);
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
        logger.info("end PM_03_MONTH_PLAN_PLANCODE_SEL");
        return result;
    }
    public HashMap PM_03_JXMX_DATA_MXCODE_SEL(String V_V_MX_CODE) throws SQLException {
        logger.info("begin PM_03_JXMX_DATA_MXCODE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_JXMX_DATA_MXCODE_SEL" + "(:V_V_MX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_MX_CODE", V_V_MX_CODE);
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
        logger.info("end PM_03_JXMX_DATA_MXCODE_SEL");
        return result;
    }
    public Map PM_03_WEEK_PLAN_GET(String V_V_PLANCODE,String V_V_TYPE) throws SQLException {
        logger.info("begin PM_03_WEEK_PLAN_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_WEEK_PLAN_GET" + "(:V_V_PLANCODE,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PLANCODE", V_V_PLANCODE);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PM_03_WEEK_PLAN_GET");
        return result;
    }
    public Map PRO_PM_03_PLAN_QUARTER_VIEW1(String V_V_YEAR,String V_V_QUARTER,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRMAJOR_CODE,String V_V_FLOWCODE,String V_V_CONTENT) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_QUARTER_VIEW1");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_QUARTER_VIEW1" + "(:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRMAJOR_CODE,:V_V_FLOWCODE,:V_V_CONTENT,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
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
        logger.info("end PRO_PM_03_PLAN_QUARTER_VIEW1");
        return result;
    }
    public Map PRO_PM_PLAN_LOCKING_Q_VIEW(String V_V_YEAR,String V_V_QUARTER,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_CONTENT) throws SQLException {
        logger.info("begin PRO_PM_PLAN_LOCKING_Q_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_Q_VIEW" + "(:V_V_YEAR,:V_V_QUARTER,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CONTENT,:V_D_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.registerOutParameter("V_D_DATE_E", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("V_D_DATE_E",(String) cstmt.getObject("V_D_DATE_E"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_LOCKING_Q_VIEW");
        return result;
    }
    public Map PRO_PM_PLAN_LOCKING_DATE_GET(String V_I_YEAR,String V_I_MONTH,String V_I_WEEKNUM,String V_V_TYPE) throws SQLException {
        logger.info("begin PRO_PM_PLAN_LOCKING_DATE_GET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_DATE_GET" + "(:V_I_YEAR,:V_I_MONTH,:V_I_WEEKNUM,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_I_WEEKNUM", V_I_WEEKNUM);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PRO_PM_PLAN_LOCKING_DATE_GET");
        return result;
    }
    public Map PRO_PM_PLAN_LOCKING_DATE_SET(String V_I_YEAR,String V_I_MONTH,String V_I_WEEKNUM,String V_V_TYPE,String V_D_DATE_E,Integer V_I_LOCK,String V_D_DATE_S) throws SQLException {
        logger.info("begin PRO_PM_PLAN_LOCKING_DATE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_DATE_SET" + "(:V_I_YEAR,:V_I_MONTH,:V_I_WEEKNUM,:V_V_TYPE,:V_D_DATE_E," +
                    ":V_I_LOCK,:V_D_DATE_S,:V_CURSOR)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_I_WEEKNUM", V_I_WEEKNUM);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_D_DATE_E", V_D_DATE_E);
            cstmt.setInt("V_I_LOCK", V_I_LOCK);
            cstmt.setString("V_D_DATE_S", V_D_DATE_S);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_LOCKING_DATE_SET");
        return result;
    }
    public Map PRO_PM_04_PROJECT_DATA_ITEM_V(String V_V_YEAR,String V_V_MONTH,String V_V_PERCODE,String V_V_ORGCODE,String V_V_SPECIALTY,String V_V_PROJECT_CODE,String V_V_PROJECT_NAME,String V_V_CONTENT,String V_V_BY1,String V_V_BY2) throws SQLException {
        logger.info("begin PRO_PM_04_PROJECT_DATA_ITEM_V");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_04_PROJECT_DATA_ITEM_V" + "(:V_V_YEAR,:V_V_MONTH,:V_V_PERCODE,:V_V_ORGCODE,:V_V_SPECIALTY,:V_V_PROJECT_CODE,:V_V_PROJECT_NAME,:V_V_CONTENT,:V_V_BY1,:V_V_BY2,:V_CURSOR)}");
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

    public Map PM_03_PLAN_SEL(String V_V_YEAR, String V_V_QUARTER, String V_V_MONTH, String V_V_PLANTYPE, String V_V_ORGCODE,
                              String V_V_DEPTCODE, String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_ZY,String V_V_CONTENT,
                              String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_PLAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_SEL" + "(:V_V_YEAR,:V_V_QUARTER,:V_V_MONTH,:V_V_PLANTYPE,:V_V_ORGCODE," +
                    ":V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");

            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_QUARTER", V_V_QUARTER);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);

            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
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
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_SEL");
        return result;
    }

    public Map PM_03_PLAN_AGREE(String V_V_GUID, String V_V_PLANTYPE, String V_V_IDEA, String V_V_INPER) throws SQLException {
        logger.info("begin PM_03_PLAN_AGREE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_AGREE" + "(:V_V_GUID,:V_V_PLANTYPE,:V_V_IDEA,:V_V_INPER,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_AGREE");
        return result;
    }

    public Map PM_03_PLAN_DISAGREE(String V_V_GUID, String V_V_PLANTYPE, String V_V_IDEA, String V_V_INPER) throws SQLException {
        logger.info("begin PM_03_PLAN_DISAGREE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_DISAGREE" + "(:V_V_GUID,:V_V_PLANTYPE,:V_V_IDEA,:V_V_INPER,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("ret", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_DISAGREE");
        return result;
    }

    public Map PM_03_PLAN_STATE_SEL() throws SQLException {
        logger.info("begin PM_03_PLAN_STATE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_STATE_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PM_03_PLAN_STATE_SEL");
        return result;
    }

    public Map PM_03_PLAN_CHOOSE_SEL(String V_V_GUID, String V_V_PLANTYPE) throws SQLException {
        logger.info("begin PM_03_PLAN_CHOOSE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_CHOOSE_SEL" + "(:V_V_GUID,:V_V_PLANTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
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
        logger.info("end PM_03_PLAN_CHOOSE_SEL");
        return result;
    }
    public Map PRO_BASE_DEPT_VIEW_ROLE_PLAN(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE_PLAN");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE_PLAN" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
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
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE_PLAN");
        return result;
    }
    public Map PRO_PM_PLAN_LOCKING_M_VIEW(String V_I_YEAR,String V_I_MONTH,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_CONTENT) throws SQLException {
        logger.info("begin PRO_PM_PLAN_LOCKING_M_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_M_VIEW" + "(:V_I_YEAR,:V_I_MONTH,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_CONTENT,:V_D_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.registerOutParameter("V_D_DATE_E", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_D_DATE_E",(String) cstmt.getObject("V_D_DATE_E"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_LOCKING_M_VIEW");
        return result;
    }
    public Map PRO_PM_PLAN_LOCKING_W_VIEW(String V_I_YEAR,String V_I_MONTH,String V_I_WEEKNUM,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_CONTENT) throws SQLException {
        logger.info("begin PRO_PM_PLAN_LOCKING_W_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_LOCKING_W_VIEW" + "(:V_I_YEAR,:V_I_MONTH,:V_I_WEEKNUM,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_CONTENT,:V_D_DATE_E,:V_CURSOR)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_I_WEEKNUM", V_I_WEEKNUM);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.registerOutParameter("V_D_DATE_E", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_D_DATE_E",(String) cstmt.getObject("V_D_DATE_E"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_LOCKING_W_VIEW");
        return result;
    }


    public Map PRO_PLAN_LOCK_DATE_HOMENOW(String V_I_YEAR,String V_I_MONTH,String V_I_WEEKNUM) throws SQLException {
        logger.info("begin PRO_PLAN_LOCK_DATE_HOMENOW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PLAN_LOCK_DATE_HOMENOW" + "(:V_I_YEAR,:V_I_MONTH,:V_I_WEEKNUM,:V_Y_DATE,:V_Q_DATE,:V_M_DATE,:V_W_DATE)}");
            cstmt.setString("V_I_YEAR", V_I_YEAR);
            cstmt.setString("V_I_MONTH", V_I_MONTH);
            cstmt.setString("V_I_WEEKNUM", V_I_WEEKNUM);
            cstmt.registerOutParameter("V_Y_DATE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_Q_DATE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_M_DATE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_W_DATE", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_Y_DATE",(String) cstmt.getObject("V_Y_DATE"));
            result.put("V_Q_DATE",(String) cstmt.getObject("V_Q_DATE"));
            result.put("V_M_DATE",(String) cstmt.getObject("V_M_DATE"));
            result.put("V_W_DATE",(String) cstmt.getObject("V_W_DATE"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PLAN_LOCK_DATE_HOMENOW");
        return result;
    }
    public Map PM_03_PLAN_REPAIR_DEPT_DEL(String V_V_GUID,String V_V_REPAIR_DEPTCODE)throws SQLException{
        logger.info("begin PM_03_PLAN_REPAIR_DEPT_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_REPAIR_DEPT_DEL" + "(:V_V_GUID,:V_V_REPAIR_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_REPAIR_DEPTCODE", V_V_REPAIR_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_REPAIR_DEPT_DEL");
        return result;
    }
    public Map PRO_PM_03_PLAN_PROJECT_VIEW2(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ZY,String V_V_WXLX,String V_V_CONTENT,String V_V_FLAG) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_PROJECT_VIEW2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_WXLX,:V_V_CONTENT,:V_V_FLAG,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_WXLX", V_V_WXLX);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            String sunm = (String) cstmt.getObject("V_V_SNUM");
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", sunm);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_PROJECT_VIEW2");
        return result;
    }
}
