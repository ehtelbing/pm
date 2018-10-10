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

//import org.building.common.procedure.ProcedureService;

/**
 * Created by zjh on 2017/1/19.
 */

@Service
public class InfoService {

    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

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

    public Map login(String userName, String userIp) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_LOGIN");
        logger.debug("params:userName:" + userName + "params:userIp:" + userIp);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_LOGIN(:V_V_LOGINNAME,:V_V_IP,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME", userName);
            cstmt.setString("V_V_IP", userIp);
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
        logger.info("end PRO_BASE_PERSON_LOGIN");
        return result;
    }

    public String log_text(String userIp) throws SQLException {

        logger.info("begin pro_pm680198_userid");
        logger.debug("params:userIp:" + userIp);

        String result = "";

        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_pm680198_userid(:V_V_IP,:ret)}");
            cstmt.setString("V_V_IP", userIp);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            result = (String) cstmt.getObject("ret");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_pm680198_userid");
        return result;
    }

    public Map login_dddl(String LoginName, String LoginType) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_LOGIN_DDDL");
        logger.debug("params:userName:" + LoginName + "params:LoginType:" + LoginType);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_LOGIN_DDDL(:V_V_LOGINNAME_OTHER,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME_OTHER", LoginName);
            cstmt.setString("V_V_TYPE", LoginType);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_LOGIN_DDDL");
        return result;
    }


    public List PRO_GO(String V_V_PERSONCODE, String V_V_ORDERID) throws SQLException {

        logger.info("begin PRO_GO");
        logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_ORDERID:" + V_V_ORDERID);

        List resultList = new ArrayList();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GO(:V_V_PERSONCODE,:V_V_ORDERID,:V_JG,:V_URL)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.registerOutParameter("V_JG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_URL", OracleTypes.VARCHAR);
            cstmt.execute();
            resultList.add(cstmt.getObject("V_JG"));
            resultList.add(cstmt.getObject("V_URL"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_GO");
        return resultList;
    }


    public String login_xst(String LoginName, String V_V_TYPE) throws SQLException {

        logger.info("begin PRO_BASE_PERSON_DDDL_GETURL");
        logger.debug("params:V_V_LOGINNAME:" + LoginName + "params:V_V_TYPE:" + V_V_TYPE);

        String result = "";

        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_DDDL_GETURL(:V_V_LOGINNAME,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME", LoginName);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result = (String) cstmt.getObject("V_CURSOR");

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_DDDL_GETURL");
        return result;
    }

    public Map login_getUrl(String LoginName) throws SQLException {

        logger.info("begin PRO_BASE_DDDL_GETURL");
        logger.debug("params:V_V_LOGINNAME:" + LoginName);

        Map<String, Object> result = new HashMap<String, Object>();

        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DDDL_GETURL(:V_V_LOGINNAME,:V_V_info,:V_CURSOR)}");
            cstmt.setString("V_V_LOGINNAME", LoginName);
            cstmt.registerOutParameter("V_V_info", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("info", (String) cstmt.getObject("V_V_info"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DDDL_GETURL");
        return result;
    }

}
