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

}
