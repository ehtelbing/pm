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

}
