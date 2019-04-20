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

@Service
public class WxjhService {

    private static final Logger logger = Logger.getLogger(WxjhService.class.getName());
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

    public Map InsertWxProject(String V_V_SYSTEM, String V_V_GUID,String V_V_DEFECT_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PROJECT_CODE, String V_V_PROJECT_NAME,
                               String V_V_WBS_CODE,String V_V_WBS_NAME, String V_V_CONTENT, String V_V_BUDGET_MONEY, String V_V_BILL_CODE, String V_V_PROJECT_STATUS, String V_V_DEFECT_STATUS, String V_V_REPAIR_DEPT,
                               String V_V_REPAIR_DEPT_TXT, String V_V_FZR, String V_V_DATE_B, String V_V_DATE_E, String V_V_INPER, String V_V_INTIEM,String V_V_PORJECT_GUID) throws SQLException {
        logger.info("begin PRO_FXJH_PROJECT_IMPORT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_FXJH_PROJECT_IMPORT" + "(:V_V_SYSTEM,:V_V_GUID,:V_V_DEFECT_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PROJECT_CODE,:V_V_PROJECT_NAME," +
                    ":V_V_WBS_CODE,:V_V_WBS_NAME,:V_V_CONTENT,:V_V_BUDGET_MONEY,:V_V_BILL_CODE,:V_V_PROJECT_STATUS,:V_V_DEFECT_STATUS,:V_V_REPAIR_DEPT,:V_V_REPAIR_DEPT_TXT,:V_V_FZR,:V_V_DATE_B" +
                    ",:V_V_DATE_E,:V_V_INPER,:V_V_INTIEM,:V_V_PORJECT_GUID,:V_INFO)}");
            cstmt.setString("V_V_SYSTEM", V_V_SYSTEM);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PROJECT_CODE", V_V_PROJECT_CODE);
            cstmt.setString("V_V_PROJECT_NAME", V_V_PROJECT_NAME);
            cstmt.setString("V_V_WBS_CODE", V_V_WBS_CODE);
            cstmt.setString("V_V_WBS_NAME", V_V_WBS_NAME);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_BUDGET_MONEY", V_V_BUDGET_MONEY);
            cstmt.setString("V_V_BILL_CODE", V_V_BILL_CODE);
            cstmt.setString("V_V_PROJECT_STATUS", V_V_PROJECT_STATUS);
            cstmt.setString("V_V_DEFECT_STATUS", V_V_DEFECT_STATUS);
            cstmt.setString("V_V_REPAIR_DEPT", V_V_REPAIR_DEPT);
            cstmt.setString("V_V_REPAIR_DEPT_TXT", V_V_REPAIR_DEPT_TXT);
            cstmt.setString("V_V_FZR", V_V_FZR);
            cstmt.setString("V_V_DATE_B", V_V_DATE_B);
            cstmt.setString("V_V_DATE_E", V_V_DATE_E);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_INTIEM", V_V_INTIEM);
            cstmt.setString("V_V_PORJECT_GUID", V_V_PORJECT_GUID);
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
        logger.info("end PRO_FXJH_PROJECT_IMPORT");
        return result;
    }

    public Map WebServiceLog(String V_V_SYSTEM, String V_V_GUID,String V_V_STATE, String V_V_MENO) throws SQLException {
        logger.info("begin BASE_WEBSERVICE_LOG_INERT");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_WEBSERVICE_LOG_INERT" + "(:V_V_SYSTEM,:V_V_GUID,:V_V_STATE,:V_V_MENO,:V_INFO)}");
            cstmt.setString("V_V_SYSTEM", V_V_SYSTEM);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_MENO", V_V_MENO);
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
        logger.info("end BASE_WEBSERVICE_LOG_INERT");
        return result;
    }

    public Map DefectBack(String V_V_DEFECT_GUID, String V_V_BILL_CODE,String V_V_DEFECT_TYPE, String V_V_GUID)throws SQLException {
        logger.info("begin PM_DEFECT_PRODECT_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_DEFECT_PRODECT_DEL" + "(:V_V_DEFECTGUID,:V_V_BILL_CODE,:V_V_DEFECTTYPE,:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_DEFECT_GUID", V_V_DEFECT_GUID);
            cstmt.setString("V_V_BILL_CODE", V_V_BILL_CODE);
            cstmt.setString("V_V_DEFECT_TYPE", V_V_DEFECT_TYPE);
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PM_DEFECT_PRODECT_DEL");
        return result;
    }
}
