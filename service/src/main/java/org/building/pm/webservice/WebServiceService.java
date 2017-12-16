package org.building.pm.webservice;

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
 * Created by zjh on 2017/6/20.
 */
@Service
public class WebServiceService {
    private static final Logger logger = Logger.getLogger(MobileService.class.getName());

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

    public HashMap PM_WORKORDER_OLD_CREATE(String V_V_ORGSAP,String V_V_DEPTSAP,String V_V_MMCODE, String V_V_MMNAME,
                                            String V_V_NUM,String V_V_REMARK,String V_V_PERCODE) throws SQLException {

        logger.info("begin PM_WORKORDER_OLD_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKORDER_OLD_CREATE" + "(:V_V_ORGSAP,:V_V_DEPTSAP,:V_V_MMCODE," +
                    ":V_V_MMNAME,:V_V_NUM,:V_V_REMARK,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_ORGSAP", V_V_ORGSAP);
            cstmt.setString("V_V_DEPTSAP", V_V_DEPTSAP);
            cstmt.setString("V_V_MMCODE", V_V_MMCODE);
            cstmt.setString("V_V_MMNAME", V_V_MMNAME);
            cstmt.setString("V_V_NUM", V_V_NUM);
            cstmt.setString("V_V_REMARK", V_V_REMARK);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String ret = (String) cstmt.getObject("V_INFO");
            result.put("RET",ret);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_OLD_CREATE");
        return result;
    }




}
