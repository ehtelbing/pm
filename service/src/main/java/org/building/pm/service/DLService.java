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
import java.util.Map;

/**
 * Created by cxy on 2018/10/18.
 */

@Service
public class DLService {
    private static final Logger logger = Logger.getLogger(DLService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

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


    public String PM_ITWORKORDER_INT(String V_V_ORDERID,String V_V_ORGNAME, String V_V_DEPTNAME,String V_V_USERNAME,
                                  String V_V_ASSET_CODE, String V_V_FAULTS, String V_V_DATE, String V_V_SERVICE_MONEY,
                                  String V_V_PARTS_MONEY,String V_V_ACTIVITY_NAME) throws SQLException {
        logger.info("begin PRO_BASE_DRAWING_SEL");
        String result = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            Float t=Float.parseFloat(V_V_SERVICE_MONEY);
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ITWORKORDER_INT" + "(:V_V_ORDERID,:V_V_ORGNAME,:V_V_DEPTNAME,:V_V_USERNAME," +
                    ":V_V_ASSET_CODE,:V_V_FAULTS,:V_V_DATE,:V_V_SERVICE_MONEY,:V_V_PARTS_MONEY,:V_V_ACTIVITY_NAME,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_USERNAME", V_V_USERNAME);
            cstmt.setString("V_V_ASSET_CODE", V_V_ASSET_CODE);
            cstmt.setString("V_V_FAULTS", V_V_FAULTS);
            cstmt.setString("V_V_DATE", V_V_DATE);
            cstmt.setFloat("V_V_SERVICE_MONEY", Float.parseFloat(V_V_SERVICE_MONEY));
            cstmt.setFloat("V_V_PARTS_MONEY", Float.parseFloat(V_V_PARTS_MONEY));
            cstmt.setString("V_V_ACTIVITY_NAME", V_V_ACTIVITY_NAME);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
//            result.put("V_INFO",(String) cstmt.getObject("V_INFO"));
            result = (String) cstmt.getObject("V_INFO");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ITWORKORDER_INT");
        return result;
    }


}