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
public class PM_07Service {
    private static final Logger logger = Logger.getLogger(PM_07Service.class.getName());

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

    public HashMap PRO_PM_WORKORDER_DEFECT_SAVE(String V_V_PERNAME,String  V_DEFECT_GUID,String  V_V_ORDERGUID,String  V_V_SHORT_TXT,
                                                String V_D_START_DATE,String V_D_FINISH_DATE,String V_V_WBS,String V_V_WBS_TXT,
                                                String V_V_DEPTCODEREPARIR) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_DEFECT_SAVE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_DEFECT_SAVE" + "(:V_V_PERNAME,:V_V_FZ_PER," +
                    ":V_V_ORDERGUID,:V_V_SHORT_TXT,:V_D_START_DATE,:V_D_FINISH_DATE,:V_V_WBS,:V_V_WBS_TXT," +
                    ":V_V_DEPTCODEREPARIR,:V_CURSOR)}");
            cstmt.setString("V_V_PERNAME", V_V_PERNAME);
            cstmt.setString("V_DEFECT_GUID", V_DEFECT_GUID);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_D_START_DATE", V_D_START_DATE);
            cstmt.setString("V_D_FINISH_DATE", V_D_FINISH_DATE);
            cstmt.setString("V_V_WBS", V_V_WBS);
            cstmt.setString("V_V_WBS_TXT", V_V_WBS_TXT);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DATA_SET");
        return result;
    }

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

    public HashMap PRO_PM_07_GET_DEPTEQU_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_GET_DEPTEQU_PER");
//      logger.debug("params:V_V_DEPTCODE:" );

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_GET_DEPTEQU_PER" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_07_GET_DEPTEQU_PER");
        return result;
    }

    /*子设备*/
    public Map PRO_PM_07_SAP_EQU_GET(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,
                                     String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_07_SAP_EQU_GET");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_SAP_EQU_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
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
        logger.info("end PRO_PM_07_SAP_EQU_GET");
        return result;
    }

    /*缺陷来源*/
    public HashMap PRO_PM_07_DEFECT_SOURCE_VIEW() throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_SOURCE_VIEW");
//      logger.debug("params:V_V_DEPTCODE:" );

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SOURCE_VIEW" + "(:V_CURSOR)}");
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
        logger.info("end PRO_PM_07_DEFECT_SOURCE_VIEW");
        return result;
    }

    /*缺陷等级*/
    public HashMap PRO_PM_07_DEFECT_LEVEL_SEL() throws SQLException {

        logger.info("begin PRO_PM_07_DEFECT_LEVEL_SEL");
//      logger.debug("params:V_V_DEPTCODE:" );

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_LEVEL_SEL" + "(:V_CURSOR)}");
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
        logger.info("end PRO_PM_07_DEFECT_LEVEL_SEL");
        return result;
    }

    /*保存过程*/
    public List<Map> PRO_PM_07_PP_DEFECT_SET(String V_I_ID,String V_V_EQUCODE,String V_V_EQUTYPE,
                                             String V_V_CHILDEQUCODE,
                                             String V_D_DEFECTDATE,String V_D_INDATE,String V_V_DESCRIPTION,
                                             String V_V_SUGGESTION,String V_V_PERSONCODE,String V_V_PERSONNAME,
                                             String V_V_DEPTCODE,String V_V_SOURCECODE,String V_V_LEVEL) throws SQLException {
//        logger.info("begin PRO_PM_07_PP_DEFECT_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_PP_DEFECT_SET" + "(:V_I_ID,:V_V_EQUCODE,:V_V_EQUTYPE," +
                    ":V_V_CHILDEQUCODE,:V_D_DEFECTDATE,:V_D_INDATE,:V_V_DESCRIPTION," +
                    ":V_V_SUGGESTION,:V_V_PERSONCODE,:V_V_PERSONNAME,:V_V_DEPTCODE,:V_V_SOURCECODE,:V_V_LEVEL,:RET)}");
            cstmt.setString("V_I_ID", V_I_ID);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_CHILDEQUCODE", V_V_CHILDEQUCODE);
            cstmt.setString("V_D_DEFECTDATE", V_D_DEFECTDATE);
            cstmt.setString("V_D_INDATE", V_D_INDATE);
            cstmt.setString("V_V_DESCRIPTION", V_V_DESCRIPTION);
            cstmt.setString("V_V_SUGGESTION", V_V_SUGGESTION);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PERSONNAME", V_V_PERSONNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_LEVEL", V_V_LEVEL);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
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
        logger.info("end PRO_PM_07_PP_DEFECT_SET");
        return result;
    }
    /*保存过程*/
    public Map PRO_PM_07_DEFECT_SET(String V_V_GUID,String V_V_PERCODE,String V_V_DEFECTLIST,String V_V_SOURCECODE,
                                    String V_V_SOURCEID,String V_D_DEFECTDATE,String V_V_DEPTCODE,String V_V_EQUCODE,
                                    String V_V_EQUCHILDCODE,String V_V_IDEA, String V_V_LEVEL) throws SQLException {
        logger.info("begin PRO_PM_07_DEFECT_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEFECT_SET" + "(:V_V_GUID,:V_V_PERCODE,:V_V_DEFECTLIST,:V_V_SOURCECODE," +
                    ":V_V_SOURCEID,:V_D_DEFECTDATE,:V_V_DEPTCODE,:V_V_EQUCODE,:V_V_EQUCHILDCODE,:V_V_IDEA,:V_V_LEVEL,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_SOURCEID", V_V_SOURCEID);
            cstmt.setString("V_D_DEFECTDATE", V_D_DEFECTDATE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILDCODE", V_V_EQUCHILDCODE);
            cstmt.setString("V_V_IDEA", V_V_IDEA);
            cstmt.setString("V_V_LEVEL", V_V_LEVEL);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEFECT_SET");
        return result;
    }
//2018-09-27
public Map DEFECT_UPFILE_INSERT(String V_GUID, String V_FILENAME, InputStream V_BLOB, String V_TYPE,
                                String V_PLANT, String V_DEPT, String V_PERSONCODE) throws SQLException {
    logger.info("begin DEFECT_UPFILE_INSERT");
    Map result = new HashMap();
    Connection conn = null;
    CallableStatement cstmt = null;
    try {
        conn = dataSources.getConnection();
        conn.setAutoCommit(true);
        cstmt = conn.prepareCall("{call DEFECT_UPFILE_INSERT" + "(:V_GUID,:V_FILENAME,:V_BLOB,:V_TYPE," +
                ":V_PLANT,:V_DEPT,:V_PERSONCODE,:RET)}");
        cstmt.setString("V_GUID", V_GUID);
        cstmt.setString("V_FILENAME", V_FILENAME);
        cstmt.setBlob("V_BLOB", V_BLOB);
        cstmt.setString("V_TYPE", V_TYPE);
        cstmt.setString("V_PLANT", V_PLANT);
        cstmt.setString("V_DEPT", V_DEPT);
        cstmt.setString("V_PERSONCODE", V_PERSONCODE);

        cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
        cstmt.execute();
        result.put("list", (String) cstmt.getObject("RET"));
    } catch (SQLException e) {
        logger.error(e);
    } finally {
        cstmt.close();
        conn.close();
    }
    logger.debug("result:" + result);
    logger.info("end DEFECT_UPFILE_INSERT");
    return result;
}
//--查看
    public Map DEFECT_UPFILE_SELECT(String V_GUID) throws SQLException {
        logger.info("begin DEFECT_UPFILE_SELECT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call DEFECT_UPFILE_SELECT" + "(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash ((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DEFECT_UPFILE_SELECT");
        return result;
    }
//--删除
    public Map DEFECT_UPFILE_DELETE(String V_FILECODE) throws SQLException {
        logger.info("begin DEFECT_UPFILE_DELETE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call DEFECT_UPFILE_DELETE" + "(:V_FILECODE,:RET)}");
            cstmt.setString("V_FILECODE", V_FILECODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DEFECT_UPFILE_DELETE");
        return result;
    }
}
