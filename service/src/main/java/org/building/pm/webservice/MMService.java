package org.building.pm.webservice;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.sql.*;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zjh on 2017/6/20.
 */
@Service
public class MMService {
    private static final Logger logger = Logger.getLogger(MobileService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;


    public String PRO_PM_WORKORDER_SPARE_MM_SET(String v_V_ORDERGUID, String v_V_ORDERID, String billcode, String vch_sparepart_code, String vch_sparepart_name, String vch_type, String vch_unit, String price, String f_number, String billType) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_MM_SET");
        String ret="";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_MM_SET(:V_V_ORDERGUID,:V_V_ORDERID,:V_BILLCODE,:V_VCH_SPAREPART_CODE,:V_VCH_SPAREPART_NAME,:V_VCH_TYPE,:V_VCH_UNIT,:V_PRICE,:V_F_NUMBER,:V_BILLTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", v_V_ORDERGUID);
            cstmt.setString("V_V_ORDERID", v_V_ORDERID);
            cstmt.setString("V_BILLCODE", billcode);
            cstmt.setString("V_VCH_SPAREPART_CODE", vch_sparepart_code);
            cstmt.setString("V_VCH_SPAREPART_NAME", vch_sparepart_name);
            cstmt.setString("V_VCH_TYPE", vch_type);
            cstmt.setString("V_VCH_UNIT", vch_unit);
            cstmt.setDouble("V_PRICE", new Double(price));
            cstmt.setDouble("V_F_NUMBER", new Double(f_number));
            cstmt.setString("V_BILLTYPE", billType);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
             ret = (String) cstmt.getObject("V_CURSOR");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_WORKORDER_SPARE_MM_SET");
        return ret;
    }

    public String PRO_PM_WORKORDER_SPARE_UPDATE(String v_v_orderguid) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_UPDATE");
        String ret = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_UPDATE(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", v_v_orderguid);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            ret = (String) cstmt.getObject("V_CURSOR");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_WORKORDER_SPARE_UPDATE");
        return ret;
    }

    public void PRO_LOG_WEB_SET(String V_V_LOG, FileInputStream V_V_XML, String InTime, String V_V_TYPE, String V_V_MANCODE) throws SQLException, ParseException {
        logger.info("begin PRO_LOG_WEB_SET");
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_LOG_WEB_SET(:V_V_LOG,:V_V_XML,:V_D_DATE,:V_V_TYPE,:V_V_MANCODE)}");
            cstmt.setString("V_V_LOG", V_V_LOG);
            cstmt.setBinaryStream("V_V_XML", V_V_XML);
            cstmt.setString("V_D_DATE", InTime);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_V_MANCODE", V_V_MANCODE);
            cstmt.execute();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_LOG_WEB_SET");
    }

}
