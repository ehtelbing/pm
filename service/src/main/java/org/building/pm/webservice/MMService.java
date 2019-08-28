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


    public String PRO_PM_WORKORDER_SPARE_MM_SET(String v_V_ORDERGUID, String v_V_ORDERID, String billcode, String vch_sparepart_code, String vch_sparepart_name, String vch_type, String vch_unit, String price, String f_number, String billType,String univalent) throws SQLException {
        logger.info("begin PRO_PM_WORKORDER_SPARE_MM_SET");
        String ret = "";
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_MM_SET(:V_V_ORDERGUID,:V_V_ORDERID,:V_BILLCODE,:V_VCH_SPAREPART_CODE,:V_VCH_SPAREPART_NAME,:V_VCH_TYPE,:V_VCH_UNIT,:V_PRICE,:V_F_NUMBER,:V_BILLTYPE,:V_UNIVALENT,:V_CURSOR)}");
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
            cstmt.setString("V_UNIVALENT",univalent);
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

    public List<String> PRO_PM_WORKORDER_YS_YZJ(String V_V_ORDERGUID) throws SQLException {
//        logger.info("begin PRO_PM_WORKORDER_YS_YZJ");
        List<String> result = new ArrayList<String>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_YS_YZJ" + "(:V_V_ORDERGUID,:V_BILLCODE," +
                    ":V_SAP_DEPARTCODE,:V_MATERIALCODE,:V_MATERIALNAME,:V_VCH_TYPE,:V_UNIT,:V_AMOUNT,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.registerOutParameter("V_BILLCODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_SAP_DEPARTCODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_MATERIALCODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_MATERIALNAME", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_VCH_TYPE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_UNIT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_AMOUNT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_BILLCODE = (String) cstmt.getObject("V_BILLCODE");
            String V_SAP_DEPARTCODE = (String) cstmt.getObject("V_SAP_DEPARTCODE");
            String V_MATERIALCODE = (String) cstmt.getObject("V_MATERIALCODE");
            String V_MATERIALNAME = (String) cstmt.getObject("V_MATERIALNAME");
            String V_VCH_TYPE = (String) cstmt.getObject("V_VCH_TYPE");
            String V_UNIT = (String) cstmt.getObject("V_UNIT");
            String V_AMOUNT = (String) cstmt.getObject("V_AMOUNT");
            String V_CURSOR = (String) cstmt.getObject("V_CURSOR");
            result.add(0, V_BILLCODE);
            result.add(1, V_SAP_DEPARTCODE);
            result.add(2, V_MATERIALCODE);
            result.add(3, V_MATERIALNAME);
            result.add(4, V_VCH_TYPE);
            result.add(5, V_UNIT);
            result.add(6, V_AMOUNT);
            result.add(7, V_CURSOR);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_YS_YZJ");
        return result;
    }


}
