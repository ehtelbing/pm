package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class FileLoadService {
    private static final Logger logger = Logger.getLogger(FileLoadService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    public HashMap pro_run7111_addlog(String v_v_bjcode, String v_v_checktime,String v_v_checkcount,
                                      FileInputStream v_v_file, String v_v_filename,
                                      String v_v_usercode,String v_v_username,
                                      String tagid,String siteid,
                                      String tagdesc) throws SQLException {
        logger.info("begin pro_run7111_addlog");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call pro_run7111_addlog" + "(:v_v_bjcode,:v_v_checktime,:v_v_checkcount," +
                    ":v_v_file,:v_v_filename,:v_v_usercode,:v_v_username,:tagid,:siteid,:tagdesc,:ret)}");
            cstmt.setString("v_v_bjcode", v_v_bjcode);
            cstmt.setString("v_v_checktime", v_v_checktime);
            cstmt.setString("v_v_checkcount", v_v_checkcount);
            cstmt.setBinaryStream("v_v_file", v_v_file);
            cstmt.setString("v_v_filename", v_v_filename);
            cstmt.setString("v_v_usercode", v_v_usercode);
            cstmt.setString("v_v_username", v_v_username);
            cstmt.setString("tagid", tagid);
            cstmt.setString("siteid", siteid);
            cstmt.setString("tagdesc", tagdesc);
            cstmt.registerOutParameter("ret", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String)cstmt.getObject("ret"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_run7111_addlog");
        return result;
    }
}
