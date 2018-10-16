package org.building.pm.webservice;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

@Service
public class BudgetService {
    private static final Logger logger = Logger.getLogger(BudgetService.class.getName());
    @Autowired
    private ComboPooledDataSource dataSources;

    public String PM_PLAN_BUDGET_YEAR_SET(String V_V_YEAR, String V_V_YWFW, String V_V_CHARGECODE, String V_V_CHARGENAME, String V_V_MONEY, String V_V_MONEY_ADD) throws SQLException {
        logger.info("begin PM_PLAN_BUDGET_YEAR_SET");
        String ret = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_BUDGET_YEAR_SET(:V_V_YEAR,:V_V_YWFW,:V_V_CHARGECODE,:V_V_CHARGENAME,:V_V_MONEY,:V_V_MONEY_ADD,:V_INFO)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_YWFW", V_V_YWFW);
            cstmt.setString("V_V_CHARGECODE", V_V_CHARGECODE);
            cstmt.setString("V_V_CHARGENAME", V_V_CHARGENAME);
            cstmt.setString("V_V_MONEY", V_V_MONEY);
            cstmt.setString("V_V_MONEY_ADD", V_V_MONEY_ADD);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            ret = (String) cstmt.getObject("V_INFO");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PM_PLAN_BUDGET_YEAR_SET");
        return ret;
    }

}
