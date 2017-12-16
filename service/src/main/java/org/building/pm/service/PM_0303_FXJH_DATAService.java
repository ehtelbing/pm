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
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_0303_FXJH_DATAService {
    private static final Logger logger = Logger.getLogger(PM_0303_FXJH_DATAService.class.getName());

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

    public HashMap PM_03_FXJH_DATA_SEL(String V_V_YEAR_B, String V_V_YEAR_E, String V_V_MONTH_B, String V_V_MONTH_E,
                                       String V_V_PROJECT_NAME, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_BY1, String V_V_BY2) throws SQLException {

        logger.info("begin PM_03_FXJH_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_FXJH_DATA_SEL" + "(:V_V_YEAR_B,:V_V_YEAR_E,:V_V_MONTH_B,:V_V_MONTH_E,:V_V_PROJECT_NAME,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_BY1,:V_V_BY2,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR_B", V_V_YEAR_B);
            cstmt.setString("V_V_YEAR_E", V_V_YEAR_E);
            cstmt.setString("V_V_MONTH_B", V_V_MONTH_B);
            cstmt.setString("V_V_MONTH_E", V_V_MONTH_E);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_BY1", V_V_BY1);
            cstmt.setString("V_V_BY2", V_V_BY2);
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
        logger.info("end PM_03_FXJH_DATA_SEL");
        return result;
    }

}
