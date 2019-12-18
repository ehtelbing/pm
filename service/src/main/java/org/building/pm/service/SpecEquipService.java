package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.axis.client.Call;
import org.apache.axis.encoding.XMLType;
import org.apache.axis.message.SOAPHeaderElement;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.soap.SOAPException;
import java.io.*;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.*;


/**
 * Created by zjh on 2019-12-17.
 */

@Service
public class SpecEquipService {
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

    private List<Map<String, Object>> ResultHash2(ResultSet rs) throws SQLException {

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        ResultSetMetaData rsm = rs.getMetaData();

        int colNum = 0;

        colNum = rsm.getColumnCount();

        while (rs.next()) {
            Map<String, Object> model = new HashMap<>();
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

    //计划申请查询
    public HashMap selectPlanApply(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_STATUS, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectPlanApply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_PLAN_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_BDATE,:V_V_EDATE,:V_V_STATUS,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.setString("V_V_STATUS", V_V_STATUS);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectPlanApply");
        return result;
    }

    //计划申请新增
    public HashMap insertPlanApply(String I_I_ID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE, String V_V_CHECKTIME, String V_V_CHECKPART, String V_V_CHECKDEPT, String V_V_COST, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin insertPlanApply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECK_PLAN_SET(:I_I_ID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_CHECKTIME,:V_V_CHECKPART,:V_V_CHECKDEPT,:V_V_COST,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CHECKTIME", V_V_CHECKTIME);
            cstmt.setString("V_V_CHECKPART", V_V_CHECKPART);
            cstmt.setString("V_V_CHECKDEPT", V_V_CHECKDEPT);
            cstmt.setString("V_V_COST", V_V_COST);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            String V_INFO = (String) cstmt.getObject("V_INFO");
            result.put("V_INFO", V_INFO);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end insertPlanApply");
        return result;
    }

    public InputStream excelPlanApply(List<String> I_I_ID_LIST, String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_STATUS, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException, FileNotFoundException {
       // FileInputStream inputStream = new FileInputStream(new File(this.getClass().getResource("/../../../../resources/planApply.xls").getFile()));

        //System.out.println(inputStream);
        System.out.println(this.getClass().getResource("/"));
        return null;
    }

}
