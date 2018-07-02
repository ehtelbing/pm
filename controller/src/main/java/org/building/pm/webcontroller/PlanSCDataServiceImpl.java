package org.building.pm.webcontroller;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.building.pm.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.jws.WebParam;
import javax.jws.WebService;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebService
public class PlanSCDataServiceImpl implements PlanSCDataService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());
    @Autowired
    private ComboPooledDataSource dataSources;

    public String PlanSCDataSet(String V_V_CKCODE, String V_V_CKNAME, String V_V_ZYQCODE, String V_V_ZYQNAME, String V_V_EQUCODE,
                                String V_V_EQUNAME, String V_V_PLAN_TIME_B, String V_V_PLAN_TIME_E, String V_V_FACT_TIME_B, String V_V_FACT_TIME_E,
                                String V_V_REASON, String V_V_TYPE) {
        String ret = "";

        try {

            ret = PRO_PM_PLAN_SC_DATA_SET(V_V_CKCODE, V_V_CKNAME, V_V_ZYQCODE, V_V_ZYQNAME, V_V_EQUCODE,
                    V_V_EQUNAME, V_V_PLAN_TIME_B, V_V_PLAN_TIME_E, V_V_FACT_TIME_B, V_V_FACT_TIME_E,
                    V_V_REASON, V_V_TYPE);

        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);

        }

        return ret;
    }


    public String PRO_PM_PLAN_SC_DATA_SET(String V_V_CKCODE, String V_V_CKNAME, String V_V_ZYQCODE, String V_V_ZYQNAME, String V_V_EQUCODE,
                                           String V_V_EQUNAME, String V_V_PLAN_TIME_B, String V_V_PLAN_TIME_E, String V_V_FACT_TIME_B, String V_V_FACT_TIME_E,
                                           String V_V_REASON, String V_V_TYPE) throws SQLException  {

        logger.info("begin PRO_PM_PLAN_SC_DATA_SET");
        Connection conn = null;
        CallableStatement cstmt = null;
        String result="";
        try {
            conn = dataSources.getConnection();
            // conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_PLAN_SC_DATA_SET" + "(:V_V_CKCODE,:V_V_CKNAME,:V_V_ZYQCODE,:V_V_ZYQNAME,:V_V_EQUCODE," +
                    ":V_V_EQUNAME,:V_V_PLAN_TIME_B,:V_V_PLAN_TIME_E,:V_V_FACT_TIME_B,:V_V_FACT_TIME_E," +
                    ":V_V_REASON,:V_V_TYPE,:V_INFO)}");
            cstmt.setString("V_V_CKCODE", V_V_CKCODE);
            cstmt.setString("V_V_CKNAME", V_V_CKNAME);
            cstmt.setString("V_V_ZYQCODE", V_V_ZYQCODE);
            cstmt.setString("V_V_ZYQNAME", V_V_ZYQNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);

            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_PLAN_TIME_B", V_V_PLAN_TIME_B);
            cstmt.setString("V_V_PLAN_TIME_E", V_V_PLAN_TIME_E);
            cstmt.setString("V_V_FACT_TIME_B", V_V_FACT_TIME_B);
            cstmt.setString("V_V_FACT_TIME_E", V_V_FACT_TIME_E);
            cstmt.setString("V_V_REASON", V_V_REASON);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result=(String) cstmt.getObject("V_INFO");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PLAN_SC_DATA_SET");
        return result;
    }
}



