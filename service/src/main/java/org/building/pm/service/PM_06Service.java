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


/**
 * Created by Administrator on 17-4-23.
 */
@Service
public class PM_06Service {
    private static final Logger logger = Logger.getLogger(PM_06Service.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

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

    @Autowired
    private ComboPooledDataSource dataSources;

    //��λ���ƹ���
    public HashMap PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_VIEW_ROLE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTCODENEXT,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }


    //�豸������
    public HashMap PRO_GET_DEPTEQUTYPE_PER(String V_V_PERSONCODE, String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_PER" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);

            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }

    //��ѯ����
    public HashMap PM_06_DJ_CRITERION_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE,
                                          String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_SUMNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_VIEW_ROLE");
        return result;
    }


    //����豸�������
    public HashMap PM_06_EQUTYPE_SEL() throws SQLException {

        logger.info("begin PM_06_EQUTYPE_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_EQUTYPE_SEL" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_EQUTYPE_SEL");
        return result;
    }

    //���������������
    public HashMap PRO_PM_BASEDIC_VIEW(String IS_V_BASETYPE) throws SQLException {

        logger.info("begin PRO_PM_BASEDIC_VIEW");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_BASEDIC_VIEW" + "(:IS_V_BASETYPE,:V_CURSOR)}");
            cstmt.setString("IS_V_BASETYPE", IS_V_BASETYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_BASEDIC_VIEW");
        return result;
    }

    //选择设备树过程��������������
    public HashMap pro_get_deptequ_per(String v_v_personcode, String v_v_deptcodenext, String v_v_equtypecode) throws SQLException {

        logger.info("begin pro_get_deptequ_per");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call pro_get_deptequ_per" + "(:v_v_personcode,:v_v_deptcodenext,:v_v_equtypecode,:v_cursor)}");
            cstmt.setString("v_v_personcode", v_v_personcode);
            cstmt.setString("v_v_deptcodenext", v_v_deptcodenext);
            cstmt.setString("v_v_equtypecode", v_v_equtypecode);
            cstmt.registerOutParameter("v_cursor", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("v_cursor")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end pro_get_deptequ_per");
        return result;
    }

    //��ʼ������
    public HashMap PM_06_DJ_CRITERION_GET(String V_V_CRITERION_CODE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_GET" + "(:V_V_CRITERION_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_GET");
        return result;
    }


    //�������׼��
    public HashMap PM_06_DJ_CRITERION_SET(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE, String V_V_EQUTYPE,
                                          String V_V_EQUCODE, String V_V_CRITERION_CODE, String V_V_CRITERION_ITEM, String V_V_CRITERION_CONTENT,
                                          String V_V_CRITERION_CR, String V_V_CRITERION_CYCLE, String V_V_CRITERION_CYCLETYPE, String V_V_EQU_STATE1, String V_V_EQU_STATE2,
                                          String V_V_CK_FUNCTION1, String V_V_CK_FUNCTION2, String V_V_CK_FUNCTION3, String V_V_CK_FUNCTION4,
                                          String V_V_CK_FUNCTION5, String V_V_CK_FUNCTION6, String V_V_CK_FUNCTION7, String V_V_CK_FUNCTION8,
                                          String V_I_ORDER, String V_I_FLAG, String V_V_CKTYPE, String V_I_WEIGHT,
                                          String V_I_YJ, String V_V_INPER) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_SET" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CRITERION_CODE,:V_V_CRITERION_ITEM,:V_V_CRITERION_CONTENT,:V_V_CRITERION_CR," +
                    ":V_V_CRITERION_CYCLE,:V_V_CRITERION_CYCLETYPE,:V_V_EQU_STATE1,:V_V_EQU_STATE2,:V_V_CK_FUNCTION1,:V_V_CK_FUNCTION2,:V_V_CK_FUNCTION3," +
                    ":V_V_CK_FUNCTION4,:V_V_CK_FUNCTION5,:V_V_CK_FUNCTION6,:V_V_CK_FUNCTION7,:V_V_CK_FUNCTION8,:V_I_ORDER,:V_I_FLAG," +
                    ":V_V_CKTYPE,:V_I_WEIGHT,:V_I_YJ,:V_V_INPER,:V_INFO)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_CRITERION_ITEM", V_V_CRITERION_ITEM);
            cstmt.setString("V_V_CRITERION_CONTENT", V_V_CRITERION_CONTENT);
            cstmt.setString("V_V_CRITERION_CR", V_V_CRITERION_CR);
            cstmt.setString("V_V_CRITERION_CYCLE", V_V_CRITERION_CYCLE);
            cstmt.setString("V_V_CRITERION_CYCLETYPE", V_V_CRITERION_CYCLETYPE);
            cstmt.setString("V_V_EQU_STATE1", V_V_EQU_STATE1);
            cstmt.setString("V_V_EQU_STATE2", V_V_EQU_STATE2);
            cstmt.setString("V_V_CK_FUNCTION1", V_V_CK_FUNCTION1);
            cstmt.setString("V_V_CK_FUNCTION2", V_V_CK_FUNCTION2);
            cstmt.setString("V_V_CK_FUNCTION3", V_V_CK_FUNCTION3);
            cstmt.setString("V_V_CK_FUNCTION4", V_V_CK_FUNCTION4);
            cstmt.setString("V_V_CK_FUNCTION5", V_V_CK_FUNCTION5);
            cstmt.setString("V_V_CK_FUNCTION6", V_V_CK_FUNCTION6);
            cstmt.setString("V_V_CK_FUNCTION7", V_V_CK_FUNCTION7);
            cstmt.setString("V_V_CK_FUNCTION8", V_V_CK_FUNCTION8);
            cstmt.setString("V_I_ORDER", V_I_ORDER);
            cstmt.setString("V_I_FLAG", V_I_FLAG);
            cstmt.setString("V_V_CKTYPE", V_V_CKTYPE);
            cstmt.setString("V_I_WEIGHT", V_I_WEIGHT);
            cstmt.setString("V_I_YJ", V_I_YJ);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_EQUTYPE_SEL");
        return result;
    }

    //删除点检标准
    public HashMap PM_06_DJ_CRITERION_DEL(String V_V_CRITERION_CODE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DEL" + "(:V_V_CRITERION_CODE,:V_INFO)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DEL");
        return result;
    }


    //
    public HashMap PM_06_DJ_DATA_CREATE(String V_V_IP, String V_V_PERCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_CKTYPE, String V_I_WEIGHT, String V_I_YJ) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_CREATE");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_CREATE" + "(:V_V_IP,:V_V_PERCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_CKTYPE,:V_I_WEIGHT,:V_I_YJ,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CKTYPE", V_V_CKTYPE);
            cstmt.setString("V_I_WEIGHT", V_I_WEIGHT);
            cstmt.setString("V_I_YJ", V_I_YJ);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_INFO"));

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_DATA_CREATE");
        return result;
    }

    //�
    public HashMap PM_06_DJ_DATA_HISTORY(String V_V_IP, String V_V_PERCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_CKTYPE, String V_V_CRITERION_CODE, String V_I_FLAG) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_HISTORY");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_HISTORY" + "(:V_V_IP,:V_V_PERCODE,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_CKTYPE,:V_V_CRITERION_CODE,:V_I_FLAG,:V_INFO,:V_CURSOR)}");
            cstmt.setString("V_V_IP", V_V_IP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CKTYPE", V_V_CKTYPE);
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_I_FLAG", V_I_FLAG);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_DATA_HISTORY");
        return result;
    }

    //描述保存过程
    public HashMap PM_06_DJ_DATA_SET(String V_V_GUID, String V_V_DJ_STATE, String V_V_DJ_DATE, String V_V_DJ_PER, String V_V_DJ_NR, String V_V_DJ_TYPE) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_SET" + "(:V_V_GUID,:V_V_DJ_STATE,:V_V_DJ_DATE,:V_V_DJ_PER," +
                    ":V_V_DJ_NR,:V_V_DJ_TYPE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_DJ_STATE", V_V_DJ_STATE);
            cstmt.setString("V_V_DJ_DATE", V_V_DJ_DATE);
            cstmt.setString("V_V_DJ_PER", V_V_DJ_PER);
            cstmt.setString("V_V_DJ_NR", V_V_DJ_NR);
            cstmt.setString("V_V_DJ_TYPE", V_V_DJ_TYPE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_DATA_SET");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DATA_SET(String V_V_CRITERION_CODE, String V_V_FZ_PER, String V_V_PLAN_STATE,
                                               String V_V_PLAN_TIME, String V_V_PLAN_PER) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DATA_SET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DATA_SET" + "(:V_V_CRITERION_CODE,:V_V_FZ_PER," +
                    ":V_V_PLAN_STATE,:V_V_PLAN_TIME,:V_V_PLAN_PER,:V_INFO)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_FZ_PER", V_V_FZ_PER);
            cstmt.setString("V_V_PLAN_STATE", V_V_PLAN_STATE);
            cstmt.setString("V_V_PLAN_TIME", V_V_PLAN_TIME);
            cstmt.setString("V_V_PLAN_PER", V_V_PLAN_PER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DATA_SET");
        return result;
    }

    public HashMap PM_06_DJ_CRITERION_DATA_SEL(String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CK_EQUTYPECODE,
                                               String V_V_EQUTYPE, String V_V_EQUCODE, String V_V_PERSONCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DATA_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CK_EQUTYPECODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_PERSONCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CK_EQUTYPECODE", V_V_CK_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.put("total", (String) cstmt.getObject("V_SUMNUM"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DATA_SEL");
        return result;
    }

    public HashMap PM_06_DJ_DATA_SEL(String V_V_GUID, String V_V_STIME, String V_V_ETIME) throws SQLException {

        logger.info("begin PM_06_DJ_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_06_DJ_DATA_SEL" + "(:V_V_GUID,:V_V_STIME,:V_V_ETIME,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STIME", V_V_STIME);
            cstmt.setString("V_V_ETIME", V_V_ETIME);
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
        logger.info("end PM_06_DJ_DATA_SEL");
        return result;
    }

    public HashMap PRO_SAP_PM_EQU_P_GET(String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_SAP_PM_EQU_P_GET");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_GET" + "(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
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
        logger.info("end PRO_SAP_PM_EQU_P_GET");
        return result;
    }

    /*public HashMap PRO_GET_DEPTEQU_PER_DROP(String V_V_PERSONCODE, String  V_V_DEPTCODENEXT, String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQU_PER_DROP");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);

            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQU_PER_DROP");
        return result;
    }*/

    public HashMap PRO_GET_DEPTEQU_PER_DROP(String V_V_PERSONCODE, String V_V_DEPTCODENEXT, String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQU_PER_DROP");
        // logger.debug("params:V_V_PERSONCODE:" + V_V_PERSONCODE + "params:V_V_DEPTCODE:" + V_V_DEPTCODE+ "params:V_V_DEPTCODENEXT:" + V_V_DEPTCODENEXT+ "params:V_V_DEPTTYPE:" + V_V_DEPTTYPE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);

            cstmt.execute();

            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQU_PER_DROP");
        return result;
    }


    public HashMap PM_06_DJ_CRITERION_DATA_DEL(String V_V_CRITERION_CODE, String V_V_PLAN_STATE,
                                               String V_V_PLAN_TIME, String V_V_PLAN_PER) throws SQLException {

        logger.info("begin PM_06_DJ_CRITERION_DATA_DEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);


        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_DJ_CRITERION_DATA_DEL" + "(:V_V_CRITERION_CODE,:V_V_PLAN_STATE,:V_V_PLAN_TIME,:V_V_PLAN_PER,:V_INFO)}");
            cstmt.setString("V_V_CRITERION_CODE", V_V_CRITERION_CODE);
            cstmt.setString("V_V_PLAN_STATE", V_V_PLAN_STATE);
            cstmt.setString("V_V_PLAN_TIME", V_V_PLAN_TIME);
            cstmt.setString("V_V_PLAN_PER", V_V_PLAN_PER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_06_DJ_CRITERION_DATA_DEL");
        return result;
    }

    //精密点检年计划发起查询
    public HashMap PM_06_JMDJ_YEARPLAN_DATA_SEL(String V_V_YEAR, String V_V_INPERCODE, String V_V_INPERNAME) throws SQLException {
        logger.info("begin PM_06_JMDJ_YEARPLAN_DATA_SEL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_06_JMDJ_YEARPLAN_DATA_SEL" + "(:V_V_YEAR,:V_V_INPERCODE,:V_V_INPERNAME,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
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
        logger.info("end PM_06_JMDJ_YEARPLAN_DATA_SEL");
        return result;
    }

    public Map PRO_PM_06_PLAN_JMDJ_SEND(String V_V_GUID, String V_V_FLOWCODE,
                                        String V_V_PLANTYPE, String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_06_PLAN_JMDJ_SEND");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_06_PLAN_JMDJ_SEND" + "(:V_V_GUID," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_06_PLAN_JMDJ_SEND");
        return result;
    }

    public HashMap PRO_PM_06_ACTIVITI_FLOW_AGREE(String V_V_ORDERID, String V_V_PROCESS_NAMESPACE, String V_V_PROCESS_CODE, String V_V_STEPCODE, String V_V_STEPNEXT_CODE) throws SQLException {
        logger.info("begin PRO_PM_06_ACTIVITI_FLOW_AGREE");
        HashMap result = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_06_ACTIVITI_FLOW_AGREE" + "(:V_V_ORDERID,:V_V_PROCESS_NAMESPACE,:V_V_PROCESS_CODE,:V_V_STEPCODE,:V_V_STEPNEXT_CODE,:V_INFO)}");
            cstmt.setString("V_V_ORDERID", V_V_ORDERID);
            cstmt.setString("V_V_PROCESS_NAMESPACE", V_V_PROCESS_NAMESPACE);
            cstmt.setString("V_V_PROCESS_CODE", V_V_PROCESS_CODE);
            cstmt.setString("V_V_STEPCODE", V_V_STEPCODE);
            cstmt.setString("V_V_STEPNEXT_CODE", V_V_STEPNEXT_CODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_06_ACTIVITI_FLOW_AGREE");
        return result;
    }

    public HashMap PRO_PLAN_YEAR_CX_SEL(String v_v_orgcode, String v_v_deptcode, String v_v_cxname) throws SQLException {
        logger.info("begin PRO_PLAN_YEAR_CX_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PLAN_YEAR_CX_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXNAME,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", v_v_orgcode);
            cstmt.setString("V_V_DEPTCODE", v_v_deptcode);
            cstmt.setString("V_V_CXNAME", v_v_cxname);
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
        logger.info("end PRO_PLAN_YEAR_CX_SEL");
        return result;
    }

    public HashMap PRO_YEAR_PLAN_SEL(String V_V_YEAR, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_CXCODE, String V_V_ZYCODE,String V_V_ZTCODE, String V_V_PAGE, String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PRO_YEAR_PLAN_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_SEL" + "(:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_ZYCODE,:V_V_ZTCODE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
            cstmt.setString("V_V_ZYCODE", V_V_ZYCODE);
            cstmt.setString("V_V_ZTCODE", V_V_ZTCODE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_V_SUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PLAN_SEL");
        return result;
    }

    public HashMap PRO_YEAR_CXEQU_SEL(String V_V_CXCODE) throws SQLException {
        logger.info("begin PRO_YEAR_CXEQU_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_CXEQU_SEL" + "(:V_V_CXCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CXCODE", V_V_CXCODE);
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
        logger.info("end PRO_YEAR_CXEQU_SEL");
        return result;
    }

    public HashMap PRO_YEAR_PLAN_C_SAVE(String v_v_guid, String v_v_year, String v_v_orgcode, String v_v_deptcode, String v_v_cxcode, String v_v_equcode,
                                        String v_v_zycode, String v_v_jxnr, String v_v_jhtjsj, String v_v_jhjgsj, String v_v_jhgq, String v_v_percode) throws SQLException {
        logger.info("begin PRO_YEAR_PLAN_C_SAVE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_C_SAVE" + "(:V_V_GUID,:V_V_YEAR,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_CXCODE,:V_V_EQUCODE,:V_V_ZYCODE,:V_V_JXNR,:V_V_JHTJSJ,:V_V_JHJGSJ,:V_V_JHGQ,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", v_v_guid);
            cstmt.setString("V_V_YEAR", v_v_year);
            cstmt.setString("V_V_ORGCODE", v_v_orgcode);
            cstmt.setString("V_V_DEPTCODE", v_v_deptcode);
            cstmt.setString("V_V_CXCODE", v_v_cxcode);
            cstmt.setString("V_V_EQUCODE", v_v_equcode);
            cstmt.setString("V_V_ZYCODE", v_v_zycode);
            cstmt.setString("V_V_JXNR", v_v_jxnr);
            cstmt.setString("V_V_JHTJSJ", v_v_jhtjsj);
            cstmt.setString("V_V_JHJGSJ", v_v_jhjgsj);
            cstmt.setString("V_V_JHGQ", v_v_jhgq);
            cstmt.setString("V_V_PERCODE", v_v_percode);
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
        logger.info("end PRO_YEAR_PLAN_C_SAVE");
        return result;
    }

    public HashMap PRO_YEAR_PLAN_C_SEL(String v_v_guid) throws SQLException {
        logger.info("begin PRO_YEAR_PLAN_C_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_C_SEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", v_v_guid);
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
        logger.info("end PRO_YEAR_PLAN_C_SEL");
        return result;
    }

    public HashMap PRO_YEAR_PLAN_C_TIMESEL(String v_v_guid) throws SQLException {
        logger.info("begin PRO_YEAR_PLAN_C_TIMESEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_C_TIMESEL" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", v_v_guid);
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
        logger.info("end PRO_YEAR_PLAN_C_TIMESEL");
        return result;
    }

    public HashMap PRO_YEAR_PLAN_C_DEL(String v_v_guid) throws SQLException {
        logger.info("begin PRO_YEAR_PLAN_C_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_C_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", v_v_guid);
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
        logger.info("end PRO_YEAR_PLAN_C_DEL");
        return result;
    }

    public HashMap PRO_PLAN_YEAR_DEL(String v_v_guid) throws SQLException {
        logger.info("begin PRO_PLAN_YEAR_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PLAN_YEAR_DEL" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", v_v_guid);
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
        logger.info("end PRO_PLAN_YEAR_DEL");
        return result;
    }

    public HashMap PRO_PLAN_YEAR_STATE_SET(String V_V_GUID, String V_V_STATECODE) throws SQLException {
        logger.info("begin PRO_PLAN_YEAR_STATE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PLAN_YEAR_STATE_SET" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
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
        logger.info("end PRO_PLAN_YEAR_STATE_SET");
        return result;
    }

    public HashMap PRO_PLAN_YEAR_SEL_BYGUID(String V_V_GUID) throws SQLException {
        logger.info("begin PRO_PLAN_YEAR_SEL_BYGUID");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PLAN_YEAR_SEL_BYGUID" + "(:V_V_GUID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PRO_PLAN_YEAR_SEL_BYGUID");
        return result;
    }
}
