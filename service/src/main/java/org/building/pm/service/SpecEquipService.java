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

import java.io.*;
import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.soap.SOAPException;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
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

    private List<Map<String, Object>> ResultHash(ResultSet rs) throws SQLException {

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (rs != null) {
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
        }


        return result;
    }

    private List<String> getColumnName(ResultSet rs) throws SQLException {
        List<String> columnList = new ArrayList<>();
        if (rs != null) {
            ResultSetMetaData rsm = rs.getMetaData();
            int colNum = rsm.getColumnCount();
            for (int i = 1; i <= colNum; i++) {
                System.out.println(rsm.getColumnName(i));
                if (!"RN".equals(rsm.getColumnName(i))) {
                    columnList.add(rsm.getColumnName(i));
                }
            }
        }

        return columnList;
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

    //根据计划申请的主键查询
    public HashMap loadPlanApply(String I_I_ID) throws SQLException {

        logger.info("begin loadPlanApply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_PLAN_NODE_GET" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end loadPlanApply");
        return result;
    }

    //计划申请删除
    public HashMap deletePlanApply(String I_I_ID) throws SQLException {

        logger.info("begin deletePlanApply");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECK_PLAN_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deletePlanApply");
        return result;
    }

    //档案查询
    public HashMap selectArchives(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_OPTYPE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectArchives");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_PERSEL_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_OPTYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_OPTYPE", V_V_OPTYPE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", (String) cstmt.getObject("V_V_SNUM"));
            result.put("columnList", getColumnName((ResultSet) cstmt.getObject("V_CURSOR")));
            System.out.println(cstmt.getObject("V_CURSOR"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectArchives");
        return result;
    }

    //检定实绩的查询
    public HashMap selectCheckResult(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectCheckResult");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_RESULT_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_BDATE,:V_V_EDATE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
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
        logger.info("end selectCheckResult");
        return result;
    }


    //检定实绩(实际检定时间、检测费用)录入
    public HashMap setCheckResult(String I_I_ID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE, String V_V_CHECKTIME, String V_V_CHECKPART, String V_V_CHECKDEPT, String V_V_COST, String I_I_PLANID, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setCheckResult");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECK_RESULT_SET(:I_I_ID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_CHECKTIME,:V_V_CHECKPART,:V_V_CHECKDEPT,:V_V_COST,:I_I_PLANID,:V_V_PERSONCODE,:V_INFO)}");
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
            cstmt.setString("I_I_PLANID", I_I_PLANID);
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
        logger.info("end setCheckResult");
        return result;
    }

    //检定实绩（附件）录入
    public HashMap setCheckResultFiles(String I_I_ID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE, String V_V_CHECKTIME, String V_V_CHECKPART, String V_V_CHECKDEPT, String V_V_REPORTNAME, InputStream B_B_CHECKREPORT, String I_I_PLANID, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setCheckResultFiles");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECK_RESULT_FILES_SET(:I_I_ID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_CHECKTIME,:V_V_CHECKPART,:V_V_CHECKDEPT,:V_V_REPORTNAME,:B_B_CHECKREPORT,:I_I_PLANID,:V_V_PERSONCODE,:V_INFO)}");
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
            cstmt.setString("V_V_REPORTNAME", V_V_REPORTNAME);
            cstmt.setBlob("B_B_CHECKREPORT", B_B_CHECKREPORT);
            cstmt.setString("I_I_PLANID", I_I_PLANID);
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
        logger.info("end setCheckResultFiles");
        return result;
    }

    public HashMap selectCheckCost(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_BDATE, String V_V_EDATE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectCheckCost");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_COST_GET" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_BDATE,:V_V_EDATE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            result.put("list", list);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectCheckCost");
        return result;

    }

    public HashMap selectEquipMoveApply(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_STATUS, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectEquipMoveApply");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_MOVE_GET" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_BDATE,:V_V_EDATE,:V_V_STATUS,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
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
        logger.info("end selectEquipMoveApply");
        return result;

    }

    public HashMap insertEquipMove(String I_I_ID, String V_V_PERSONCODE, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE, String V_V_NEWORGNAME, String V_V_NEWORGCODE, String V_V_NEWDEPTNAME, String V_V_NEWDEPTCODE, String V_V_NEWADD, String V_V_NEWSITE) throws SQLException {

        logger.info("begin insertEquipMove");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_MOVE_SET(:I_I_ID,:V_V_PERSONCODE,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_NEWORGNAME,:V_V_NEWORGCODE,:V_V_NEWDEPTNAME,:V_V_NEWDEPTCODE,:V_V_NEWADD,:V_V_NEWSITE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_NEWORGNAME", V_V_NEWORGNAME);
            cstmt.setString("V_V_NEWORGCODE", V_V_NEWORGCODE);
            cstmt.setString("V_V_NEWDEPTNAME", V_V_NEWDEPTNAME);
            cstmt.setString("V_V_NEWDEPTCODE", V_V_NEWDEPTCODE);
            cstmt.setString("V_V_NEWADD", V_V_NEWADD);
            cstmt.setString("V_V_NEWSITE", V_V_NEWSITE);
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
        logger.info("end insertEquipMove");
        return result;
    }

    public HashMap loadEquipMove(String I_I_ID) throws SQLException {

        logger.info("begin loadEquipMove");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_MOVE_NODE_GET" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end loadEquipMove");
        return result;
    }

    public HashMap deleteEquipMove(String I_I_ID) throws SQLException {

        logger.info("begin deleteEquipMove");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_MOVE_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteEquipMove");
        return result;
    }

    //附件类型查询
    public HashMap selectAttachDic() throws SQLException {

        logger.info("begin selectAttachDic");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_ATTACH_DIC_GET(:V_CURSOR)}");

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
        logger.info("end selectAttachDic");
        return result;
    }

    //附件查询
    public HashMap selectEquFilesAttach(String V_V_ECODE, String V_V_ATTACH_TYPE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectEquFilesAttach");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_ATTACH_GET(:V_V_ECODE,:V_V_ATTACH_TYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ECODE", V_V_ECODE);
            cstmt.setString("V_V_ATTACH_TYPE", V_V_ATTACH_TYPE);
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
        logger.info("end selectEquFilesAttach");
        return result;
    }

    //附件名称查询
    public HashMap selectAttachNode(String V_V_CODE, String V_V_ATTACH_TYPE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectAttachNode");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_ATTACH_NODE_GET(:V_V_CODE,:V_V_ATTACH_TYPE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_CODE", V_V_CODE);
            cstmt.setString("V_V_ATTACH_TYPE", V_V_ATTACH_TYPE);
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
        logger.info("end selectAttachNode");
        return result;
    }

    //报废设备查询
    public HashMap selectEquScrap(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_STATUS, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin selectEquScrap");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_FILES_SCRAP_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_BDATE,:V_V_EDATE,:V_V_STATUS,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
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
        logger.info("end selectEquScrap");
        return result;
    }

    public Map<String, Object> uploadEquFilesAttach(String V_V_ECODE, String V_V_PERSONCODE, String V_V_ATTACH_TYPE, String V_V_REPORTNAME, InputStream B_B_CONTENT) throws SQLException {

        logger.info("begin uploadEquFilesAttach");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_ATTACH_SET(:V_V_ECODE,:V_V_PERSONCODE,:V_V_ATTACH_TYPE,:V_V_REPORTNAME,:B_B_CONTENT,:V_INFO)}");
            cstmt.setString("V_V_ECODE", V_V_ECODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_ATTACH_TYPE", V_V_ATTACH_TYPE);
            cstmt.setString("V_V_REPORTNAME", V_V_REPORTNAME);
            cstmt.setBlob("B_B_CONTENT",B_B_CONTENT);
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
        logger.info("end uploadEquFilesAttach");
        return result;
    }

    //SE0007检定实绩查询的导出附件
    public HashMap loadCheckResultFiles(String I_I_ID) throws SQLException {

        logger.info("begin loadCheckResultFiles");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_RESULT_FILE_GET(:I_I_ID,:B_CHECKREPORT)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("B_CHECKREPORT", OracleTypes.BLOB);
            cstmt.execute();
            result.put("B_CHECKREPORT", ((Blob) cstmt.getObject("B_CHECKREPORT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadCheckResultFiles");
        return result;

    }

    public Map<String, Object> loadEquFilesAttachBlob(String I_I_ID) throws SQLException {
        logger.info("begin loadEquFilesAttachBlob");

        Map<String, Object> result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_FILES_ATTACH_GET(:I_I_ID,:B_CONTENT)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("B_CONTENT", OracleTypes.BLOB);
            cstmt.execute();
            result.put("B_CONTENT", ((Blob) cstmt.getObject("B_CONTENT")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadEquFilesAttachBlob");
        return result;

    }

    public Map<String, Object> deleteEquFilesAttach(String I_I_ID) throws SQLException {
        logger.info("begin deleteEquFilesAttach");

        Map<String, Object> result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_ATTACH_NODE_DEL(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
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
        logger.info("end deleteEquFilesAttach");
        return result;
    }

    //SE0008检定逾期查询
    public HashMap selectCheckOverTime(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE, String V_V_EQUTYPENAME, String V_V_EQUCODE, String V_V_BDATE, String V_V_EDATE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin selectCheckOverTime");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECK_OVERTIME_GET(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_V_EQUCODE,:V_V_BDATE,:V_V_EDATE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_BDATE", V_V_BDATE);
            cstmt.setString("V_V_EDATE", V_V_EDATE);
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
        logger.info("end selectCheckOverTime");
        return result;
    }

    //设备报废新增
    public HashMap setEquScrap(String I_I_ID, String V_V_ORGNAME, String V_V_ORGCODE, String V_V_DEPTNAME, String V_V_DEPTCODE, String V_V_EQUTYPENAME, String V_V_EQUTYPECODE, String V_V_EQUNAME, String V_V_EQUCODE,String V_V_SCRAPREASON, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setEquScrap");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_FILES_SCRAP_SET(:I_I_ID,:V_V_ORGNAME,:V_V_ORGCODE,:V_V_DEPTNAME,:V_V_DEPTCODE,:V_V_EQUTYPENAME,:V_V_EQUTYPECODE,:V_V_EQUNAME,:V_V_EQUCODE,:V_V_SCRAPREASON,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_ORGNAME", V_V_ORGNAME);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTNAME", V_V_DEPTNAME);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SCRAPREASON", V_V_SCRAPREASON);
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
        logger.info("end setEquScrap");
        return result;
    }

    //查询某个报废设备信息
    public Map<String, Object> loadEquScrap(String I_I_ID) throws SQLException {

        logger.info("begin loadEquScrap");

        Map<String, Object> result = new HashMap();
        List<Map<String, Object>> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_EQU_FILES_SCRAP_NODE_GET" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadEquScrap");

        if (list.size() == 1) {
            return list.get(0);
        }
        else {
            return null;
        }
    }

    //删除报废申请
    public HashMap deleteEquipScrap(String I_I_ID) throws SQLException {

        logger.info("begin deleteEquipScrap");


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_EQU_FILES_SCRAP_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteEquipScrap");
        return result;
    }
    //附件类型配置查询
    public HashMap selectAttachmentType( ) throws SQLException {
        logger.info("begin selectAttachmentType");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_ATTACH_DIC_GET" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end selectAttachmentType");
        return result;
    }

    public HashMap setAttachmentType(String I_ID, String V_V_ATTACHNAME, String V_V_EQUTYPE, String I_I_ISUSE, String I_I_ORDERID,String V_V_PERSONCODE) throws SQLException {
        logger.info("begin setAttachmentType");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_ATTACH_DIC_SET(:I_ID,:V_V_ATTACHNAME,:V_V_EQUTYPE,:I_I_ISUSE,:I_I_ORDERID,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_ID", I_ID);
            cstmt.setString("V_V_ATTACHNAME", V_V_ATTACHNAME);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("I_I_ISUSE", I_I_ISUSE);
            cstmt.setString("I_I_ORDERID", I_I_ORDERID);
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
        logger.info("end setAttachmentType");
        return result;
    }

    public HashMap deleteAttachmentType(String I_I_ID) throws SQLException {
        logger.info("begin deleteAttachmentType");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_ATTACH_DIC_DEL" + "(:I_I_ID,:V_INFO)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deleteAttachmentType");
        return result;
    }

    //SE0008逾期原因的set
    public HashMap setCheckOverTime(String I_I_PLANID, String V_V_OVERREASON, String V_V_PERSONCODE) throws SQLException {

        logger.info("begin setCheckOverTime");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECK_OVERTIME_SET(:I_I_PLANID,:V_V_OVERREASON,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("I_I_PLANID", I_I_PLANID);
            cstmt.setString("V_V_OVERREASON", V_V_OVERREASON);
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
        logger.info("end setCheckOverTime");
        return result;
    }

    //SE000801页面默认加载
    public HashMap loadCheckOverRange() throws SQLException {

        logger.info("begin loadCheckOverRange");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call SE_CHECKOVER_RANGE_GET" + "(:V_RET)}");
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_RET", (String) cstmt.getObject("V_RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end loadCheckOverRange");
        return result;
    }

    //SE000801报警周期的保存
    public HashMap setCheckOverRange(Double V_V_OVERDAY) throws SQLException {

        logger.info("begin setCheckOverRange");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call SE_CHECKOVER_RANGE_SET(:V_V_OVERDAY,:V_INFO)}");
            cstmt.setDouble("V_V_OVERDAY", V_V_OVERDAY);
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
        logger.info("end setCheckOverRange");
        return result;
    }
}
