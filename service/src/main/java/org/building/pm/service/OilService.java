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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by zjh on 2019-12-17.
 */

@Service
public class OilService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    private List<Map<String, Object>> ResultHash(ResultSet rs) throws SQLException {

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (rs != null) {
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
        }


        return result;
    }

    private List<String> getColumnName(ResultSet rs) throws SQLException {
        List<String> columnList = new ArrayList<>();
        if (rs != null) {
            ResultSetMetaData rsm = rs.getMetaData();
            int colNum = rsm.getColumnCount();
            for (int i = 1; i <= colNum; i++) {
                System.out.println(rsm.getColumnName(i));
                if (!"RN".equals(rsm.getColumnName(i))) {
                    columnList.add(rsm.getColumnName(i));
                }
            }
        }

        return columnList;
    }

    public HashMap selectProductLine(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXNAME) throws SQLException {
        logger.info("begin selectProductLine");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_CX_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXNAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXNAME", V_V_CXNAME);
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
        logger.info("end selectProductLine");
        return result;
    }

    public HashMap selectEquipType(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXCODE) throws SQLException {
        logger.info("begin selectEquipType");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_CXEQUTYPE_SEL(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
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
        logger.info("end selectEquipType");
        return result;
    }

    //OIL0002设备型号和润滑标准查询
    public HashMap selectStandardInfoEquType(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin selectStandardInfoEquType");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_EQUTYPE(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end selectStandardInfoEquType");
        return result;
    }

    //OIL0002查询 润滑标准历史表格
    public HashMap selectStandardInfoHis(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_GGXH) throws SQLException {

        logger.info("begin selectStandardInfoHis");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_HIS(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_GGXH,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
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
        logger.info("end selectStandardInfoHis");
        return result;
    }

    //OIL0002查询 当前设备
    public HashMap selectStardArdInfoGet(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_GGXH, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectStardArdInfoGet");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_GET(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_GGXH,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectStardArdInfoGet");
        return result;
    }

    //庄玉凯 新写的查询设备类型
    public HashMap GET_DEPTEQUTYPE_NEW_ZYK(String V_V_PERSONCODE, String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin GET_DEPTEQUTYPE_NEW_ZYK");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call GET_DEPTEQUTYPE_NEW_ZYK" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
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
        logger.info("end GET_DEPTEQUTYPE_NEW_ZYK");
        return result;
    }

    //庄玉凯新写的根据设备型号查询上级
    public HashMap OIL_ORG_DEPT_EQUTYPE_GET(String V_V_GGXH) throws SQLException {
        logger.info("begin OIL_ORG_DEPT_EQUTYPE_GET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_ORG_DEPT_EQUTYPE_GET" + "(:V_V_GGXH,:V_CURSOR)}");
            cstmt.setString("V_V_GGXH", V_V_GGXH);
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
        logger.info("end OIL_ORG_DEPT_EQUTYPE_GET");
        return result;
    }

    public HashMap selectStandardInfo(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXCODE, String V_V_EQUTYPECODE ,String V_V_GGXH , String V_V_PAGE , String V_V_PAGESIZE ) throws SQLException {
        logger.info("begin selectStandardInfo");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_SEL_PART(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_EQUTYPECODE,:V_V_GGXH,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectStandardInfo");
        return result;
    }

    public HashMap selectStandardInfoFact(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXCODE, String V_V_EQUTYPECODE, String V_V_PLANTIME, String V_V_EQUCODE, String V_V_EQUNAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectStandardInfoYdj");
        String V_V_PLANTIME_NEW = V_V_PLANTIME.substring(0,10);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_FACT_INFO_GET(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_EQUTYPECODE,:V_V_PLANTIME,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_PLANTIME", V_V_PLANTIME_NEW);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectStandardInfoYdj");
        return result;
    }

    public HashMap setLubricationStandard(String V_V_GUID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE,String V_V_CXCODE,String V_V_CXNAME ,String V_V_EQUTYPENAME, String V_V_EQUTYPECODE,String V_V_BZ_CODE,String V_V_BA_NAME,String V_V_JSDX,String V_V_GGXH, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setLubricationStandard");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_SET(:V_V_GUID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_CXNAME,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_BZ_CODE,:V_V_BA_NAME,:V_V_JSDX,:V_V_GGXH,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_CXNAME", V_V_CXNAME);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_BZ_CODE", V_V_BZ_CODE);
            cstmt.setString("V_V_BA_NAME", V_V_BA_NAME);
            cstmt.setString("V_V_JSDX", V_V_JSDX);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end setLubricationStandard");
        return result;
    }

    public HashMap deleteAttachmentType(String V_V_GUID) throws SQLException {

        logger.info("begin deleteAttachmentType");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteAttachmentType");
        return result;
    }

    public HashMap deleteGrease(String V_V_GUID,String I_I_ID) throws SQLException {

        logger.info("begin deleteGrease");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YZ_INFO_DEL" + "(:V_V_GUID,:I_I_ID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteGrease");
        return result;
    }

    public HashMap deleteUseOil(String V_V_GUID,String I_I_ID) throws SQLException {

        logger.info("begin deleteUseOil");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YY_INFO_DEL" + "(:V_V_GUID,:I_I_ID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteUseOil");
        return result;
    }

    public HashMap loadLubricationStandard(String V_V_GUID) throws SQLException {

        logger.info("begin loadLubricationStandard");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_NODE_GET" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end loadLubricationStandard");
        return result;
    }

    public HashMap selectGrease(String V_V_GUID) throws SQLException {

        logger.info("begin selectGrease");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_YZ_GET" + "(:V_V_GUID,:V_CURSOR)}");
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
        logger.info("end selectGrease");
        return result;
    }

    public HashMap selectUseOil(String V_V_GUID,String V_V_YZ_ID) throws SQLException {

        logger.info("begin selectUseOil");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_YY_GET" + "(:V_V_GUID,:V_V_YZ_ID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YZ_ID", V_V_YZ_ID);
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
        logger.info("end selectUseOil");
        return result;
    }

    public HashMap loadOilStandardInfo(String V_V_GUID, String I_I_ID) throws SQLException {
        logger.info("begin loadOilStandardInfo");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_NODE_ALL_GET(:V_V_GUID,:I_I_ID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end loadOilStandardInfo");
        return result;
    }

    public HashMap setOilStandardInfo(String I_I_ID,String V_V_GUID,String V_V_PARTNAME, Double N_V_OIL_NUM,String V_V_LOC_CODE,String V_V_LOC_NAME,String V_V_OIL_SEASON,String V_V_OILTYPE,String V_V_OIL_SIGN,String V_V_OIL_MAT_CODE,String V_V_OIL_MAT_NAME,String V_V_OIL_WAY,String V_V_OIL_PD, String V_V_OIL_NUM,String V_V_OIL_ZQMS,String V_V_OIL_ZQUNIT,String V_V_OIL_ZQSZ,String V_V_ZXR,String V_V_PERSONCODE) throws SQLException {
        logger.info("begin setOilStandardInfo");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_M_SET(:V_V_GUID,:V_V_PARTNAME,:N_V_OIL_NUM,:V_V_LOC_CODE,:V_V_LOC_NAME,:V_V_OIL_SEASON,:V_V_OILTYPE,:V_V_OIL_SIGN,:V_V_OIL_MAT_CODE,:V_V_OIL_MAT_NAME,:I_I_ID,:V_V_OIL_WAY,:V_V_OIL_NUM,:V_V_OIL_ZQMS,:V_V_OIL_PD,:V_V_OIL_ZQUNIT,:V_V_OIL_ZQSZ,:V_V_ZXR,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PARTNAME", V_V_PARTNAME);
            cstmt.setDouble("N_V_OIL_NUM", N_V_OIL_NUM);
            cstmt.setString("V_V_LOC_CODE", V_V_LOC_CODE);
            cstmt.setString("V_V_LOC_NAME", V_V_LOC_NAME);
            cstmt.setString("V_V_OIL_SEASON", V_V_OIL_SEASON);
            cstmt.setString("V_V_OILTYPE", V_V_OILTYPE);
            cstmt.setString("V_V_OIL_SIGN", V_V_OIL_SIGN);
            cstmt.setString("V_V_OIL_MAT_CODE", V_V_OIL_MAT_CODE);
            cstmt.setString("V_V_OIL_MAT_NAME", V_V_OIL_MAT_NAME);
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_OIL_WAY", V_V_OIL_WAY);
            cstmt.setString("V_V_OIL_NUM", V_V_OIL_NUM);
            cstmt.setString("V_V_OIL_ZQMS", V_V_OIL_ZQMS);
            cstmt.setString("V_V_OIL_PD", V_V_OIL_PD);
            cstmt.setString("V_V_OIL_ZQUNIT", V_V_OIL_ZQUNIT);
            cstmt.setString("V_V_OIL_ZQSZ", V_V_OIL_ZQSZ);
            cstmt.setString("V_V_ZXR", V_V_ZXR);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end setOilStandardInfo");
        return result;
    }

    //查询某个润滑标准（用油）
    public Map<String, Object> loadStaYy(String I_I_ID) throws SQLException {

        logger.info("begin loadStaYy");

        Map<String, Object> result = new HashMap();
        List<Map<String, Object>> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YY_NODE_GET" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadStaYy");

        if (list.size() == 1) {
            return list.get(0);
        }
        else {
            return null;
        }
    }

    //润滑标准新增修改（用油）
    public HashMap yyInfoSet(String I_I_ID, String V_V_GUID, String V_V_YZ_ID, String v_v_oil_way, String v_v_oil_num, String v_v_oil_zqms, String v_v_oil_pd, String v_v_oil_zqunit, String v_v_oil_zqsz,String v_v_zxr, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin yyInfoSet");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YY_INFO_SET(:I_I_ID,:V_V_GUID,:V_V_YZ_ID,:v_v_oil_way,:v_v_oil_num,:v_v_oil_zqms,:v_v_oil_pd,:v_v_oil_zqunit,:v_v_oil_zqsz,:v_v_zxr,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YZ_ID", V_V_YZ_ID);
            cstmt.setString("v_v_oil_way", v_v_oil_way);
            cstmt.setString("v_v_oil_num", v_v_oil_num);
            cstmt.setString("v_v_oil_zqms", v_v_oil_zqms);
            cstmt.setString("v_v_oil_pd", v_v_oil_pd);
            cstmt.setString("v_v_oil_zqunit", v_v_oil_zqunit);
            cstmt.setString("v_v_oil_zqsz", v_v_oil_zqsz);
            cstmt.setString("v_v_zxr", v_v_zxr);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end yyInfoSet");
        return result;
    }

    //查询某个润滑标准（油脂）
    public Map<String, Object> loadStaYz(String I_I_ID) throws SQLException {

        logger.info("begin loadStaYz");

        Map<String, Object> result = new HashMap();
        List<Map<String, Object>> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YZ_NODE_GET" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadStaYz");

        if (list.size() == 1) {
            return list.get(0);
        }
        else {
            return null;
        }
    }

    //润滑标准新增修改（油脂）
    public HashMap yzInfoSet(String I_I_ID, String V_V_GUID, String V_V_PARTNAME, String N_V_OIL_NUM, String V_V_LOC_CODE, String V_V_LOC_NAME, String v_v_oil_season, String v_v_oiltype, String v_v_oil_sign, String v_v_oil_mat_code, String v_v_oil_mat_name, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin yzInfoSet");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_YZ_INFO_SET(:I_I_ID,:V_V_GUID,:V_V_PARTNAME,:N_V_OIL_NUM,:V_V_LOC_CODE,:V_V_LOC_NAME,:v_v_oil_season,:v_v_oiltype,:v_v_oil_sign,:v_v_oil_mat_code,:v_v_oil_mat_name,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_PARTNAME", V_V_PARTNAME);
            cstmt.setString("N_V_OIL_NUM", N_V_OIL_NUM);
            cstmt.setString("V_V_LOC_CODE", V_V_LOC_CODE);
            cstmt.setString("V_V_LOC_NAME", V_V_LOC_NAME);
            cstmt.setString("v_v_oil_season", v_v_oil_season);
            cstmt.setString("v_v_oiltype", v_v_oiltype);
            cstmt.setString("v_v_oil_sign", v_v_oil_sign);
            cstmt.setString("v_v_oil_mat_code", v_v_oil_mat_code);
            cstmt.setString("v_v_oil_mat_name", v_v_oil_mat_name);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end yzInfoSet");
        return result;
    }

    //OIL000201查询
    public HashMap selectStardArdInfo(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_GGXH, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectStardArdInfo");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_EQUGGXH_SEL(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_GGXH,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectStardArdInfo");
        return result;
    }

    //OIL000201新增规格型号
    public HashMap insertGgxh(String V_V_GUID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME,
                              String V_V_DEPTCODE, String V_V_CXCODE, String V_V_CXNAME, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE,
                              String V_V_BZ_CODE, String V_V_BZ_NAME, String V_V_JSDX, String V_V_GGXH, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin insertGgxh");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_SET(:V_V_GUID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_CXNAME,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_BZ_CODE,:V_V_BZ_NAME,:V_V_JSDX,:V_V_GGXH,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_CXNAME", V_V_CXNAME);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_BZ_CODE", V_V_BZ_CODE);
            cstmt.setString("V_V_BZ_NAME", V_V_BZ_NAME);
            cstmt.setString("V_V_JSDX", V_V_JSDX);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end insertGgxh");
        return result;
    }

    //OIL000201查询 新增设备的查询
    public HashMap selectInsertEquip(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectInsertEquip");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_EQU_SEL(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectInsertEquip");
        return result;
    }

    //OIL000201新增设备
    public HashMap setOilStandardEqu(String V_V_GUID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME,
                                     String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE, String V_V_GGXH,  String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setOilStandardEqu");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_EQU_SET(:V_V_GUID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_GGXH,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end setOilStandardEqu");
        return result;
    }

    //OIL000201删除设备
    public HashMap deleteEquGgxh(String I_I_ID) throws SQLException {

        logger.info("begin deleteEquGgxh");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_INFO_EQUGGXH_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteEquGgxh");
        return result;
    }

    //OIL0005查询
    public HashMap selectStandardFactInfo(String V_V_PERSONCODE, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXCODE, String V_V_EQUTYPECODE, String V_V_PLANTIME, String V_V_EQUCODE, String V_V_EQUNAME, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectStandardFactInfo");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_FACT_INFO_GET(:V_V_PERSONCODE,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_EQUTYPECODE,:V_V_PLANTIME,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_PLANTIME", V_V_PLANTIME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectStandardFactInfo");
        return result;
    }

    public HashMap setStandardFactInfo(String I_I_ID, String V_V_P_GUID, String V_V_FACT_TIME, String V_V_FACT_OIL_NUM, String V_V_FACT_OIL_SIGN, String V_V_ZXR,
                                     String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setStandardFactInfo");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call OIL_STANDARD_FACT_M_SET(:I_I_ID,:V_V_P_GUID,:V_V_FACT_TIME,:V_V_FACT_OIL_NUM,:V_V_FACT_OIL_SIGN,:V_V_ZXR,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_P_GUID", V_V_P_GUID);
            cstmt.setString("V_V_FACT_TIME", V_V_FACT_TIME);
            cstmt.setString("V_V_FACT_OIL_NUM", V_V_FACT_OIL_NUM);
            cstmt.setString("V_V_FACT_OIL_SIGN", V_V_FACT_OIL_SIGN);
            cstmt.setString("V_V_ZXR", V_V_ZXR);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end setStandardFactInfo");
        return result;
    }

    public HashMap loadStandardFactInfo(String V_V_PERSONCODE,String V_V_GUID, String I_I_ID) throws SQLException {
        logger.info("begin loadStandardFactInfo");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call OIL_STANDARD_FACT_INFO_ID_GET(:V_V_PERSONCODE,:V_V_GUID,:I_I_ID,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end loadStandardFactInfo");
        return result;
    }
}
